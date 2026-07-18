// supabase/functions/enviar-entrega/index.ts
import { createClient } from "jsr:@supabase/supabase-js@2"
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts"

const GMAIL_USER = Deno.env.get("GMAIL_USER")!
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders })
    }

    let supabase: ReturnType<typeof createClient> | null = null
    let archivosPath: string[] = []

    try {
        const body = await req.json()
        const { claseId, mensaje, alumnoNombre, alumnoEmail, alumnoId } = body
        archivosPath = Array.isArray(body.archivosPath) ? body.archivosPath : []

        if (!claseId || !mensaje || !alumnoId) {
            return new Response(
                JSON.stringify({ error: "Faltan datos requeridos (claseId, mensaje, alumnoId)." }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        // 1. Buscar la clase, el curso y el profesor para obtener su email
        //    (no se guarda nada de esta consulta, solo se lee lo necesario para armar el mail)
        const { data: clase, error: claseError } = await supabase
            .from("clases")
            .select("titulo, cursos(titulo, profesor_id, usuarios(email, nombre_completo))")
            .eq("id", claseId)
            .single()

        if (claseError || !clase) {
            console.error("Error buscando clase:", claseError)
            return new Response(
                JSON.stringify({ error: "No se encontró la clase." }),
                { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        const profesorEmail = clase.cursos?.usuarios?.email
        if (!profesorEmail) {
            return new Response(
                JSON.stringify({ error: "El curso no tiene un profesor con email configurado." }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 2. Asegurar que exista la fila de progreso para este alumno+clase, en estado "pendiente"
        //    (upsert: si ya existe la actualiza, si no la crea)
        const { error: progresoError } = await supabase
            .from("progreso_clases")
            .upsert(
                {
                    alumno_id: alumnoId,
                    clase_id: claseId,
                    estado: "pendiente",
                    fecha_actualizacion: new Date().toISOString(),
                },
                { onConflict: "alumno_id,clase_id" }
            )

        if (progresoError) {
            console.error("Error actualizando progreso_clases:", progresoError)
            return new Response(
                JSON.stringify({ error: "No se pudo registrar el progreso de la entrega." }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 3. Si hay archivos temporales en Storage, descargar cada uno para adjuntarlos al email en base64
        const attachments: { filename: string; content: string; encoding: "base64" }[] = []
        for (const path of archivosPath) {
            const { data: fileBlob, error: downloadError } = await supabase.storage
                .from("entregas-temp")
                .download(path)

            if (downloadError || !fileBlob) {
                console.error("Error descargando archivo temporal:", path, downloadError)
                continue
            }

            const arrayBuffer = await fileBlob.arrayBuffer()
            const base64 = btoa(
                new Uint8Array(arrayBuffer).reduce((acc, byte) => acc + String.fromCharCode(byte), "")
            )
            attachments.push({
                filename: path.split("/").pop() ?? "adjunto",
                content: base64,
                encoding: "base64",
            })
        }

        // 4. Armar los links de acción para que el profesor responda con un clic
        const FUNCTIONS_BASE_URL = `${SUPABASE_URL}/functions/v1/responder-entrega`
        const linkAprobado = `${FUNCTIONS_BASE_URL}?alumnoId=${alumnoId}&claseId=${claseId}&estado=aprobado`
        const linkReentregar = `${FUNCTIONS_BASE_URL}?alumnoId=${alumnoId}&claseId=${claseId}&estado=reentregar`

        // 5. Armar y enviar el email por Gmail SMTP
        const html = `
            <div style="font-family: sans-serif; line-height: 1.5;">
                <h2>Nueva entrega: ${clase.titulo}</h2>
                <p><strong>Curso:</strong> ${clase.cursos?.titulo ?? ""}</p>
                <p><strong>Alumno:</strong> ${alumnoNombre ?? "No especificado"} (${alumnoEmail ?? "sin email"})</p>
                <hr />
                <p><strong>Mensaje:</strong></p>
                <div>${mensaje}</div>
                <hr />
                <p>Marcar esta entrega como:</p>
                <p>
                    <a href="${linkAprobado}" style="display:inline-block;margin-right:8px;padding:10px 16px;background:#16a34a;color:#fff;text-decoration:none;border-radius:6px;">✅ Aprobado</a>
                    <a href="${linkReentregar}" style="display:inline-block;padding:10px 16px;background:#dc2626;color:#fff;text-decoration:none;border-radius:6px;">🔁 Reentregar</a>
                </p>
            </div>
        `

        const client = new SMTPClient({
            connection: {
                hostname: "smtp.gmail.com",
                port: 465,
                tls: true,
                auth: {
                    username: GMAIL_USER,
                    password: GMAIL_APP_PASSWORD,
                },
            },
        })

        try {
            await client.send({
                from: GMAIL_USER,
                to: profesorEmail,
                subject: `Nueva entrega: ${clase.titulo}`,
                html,
                ...(attachments.length > 0 ? { attachments } : {}),
            })
        } finally {
            await client.close()
        }

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )

    } catch (err) {
        console.error("Error inesperado:", err)
        return new Response(
            JSON.stringify({ error: "Error inesperado en el servidor." }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    } finally {
        // Borrar siempre los archivos temporales, hayan salido bien o mal el envío del mail
        if (supabase && archivosPath.length > 0) {
            const { error: removeError } = await supabase.storage
                .from("entregas-temp")
                .remove(archivosPath)
            if (removeError) {
                console.error("Error borrando archivos temporales:", removeError)
            }
        }
    }
})