// supabase/functions/responder-entrega/index.ts
import { createClient } from "jsr:@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const ESTADOS_VALIDOS = ["aprobado", "reentregar"]

function respuestaTexto(texto: string, status: number) {
    return new Response(texto, {
        status,
        headers: {
            "Content-Type": "text/plain; charset=UTF-8",
        },
    })
}

Deno.serve(async (req) => {
    try {
        const url = new URL(req.url)
        const alumnoId = url.searchParams.get("alumnoId")
        const claseId = url.searchParams.get("claseId")
        const estado = url.searchParams.get("estado")

        if (!alumnoId || !claseId || !estado || !ESTADOS_VALIDOS.includes(estado)) {
            return respuestaTexto(
                "Link inválido: faltan datos o el estado no es reconocido.",
                400
            )
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        const { error } = await supabase
            .from("progreso_clases")
            .update({
                estado,
                fecha_actualizacion: new Date().toISOString(),
            })
            .eq("alumno_id", alumnoId)
            .eq("clase_id", claseId)

        if (error) {
            console.error("Error actualizando estado:", error)
            return respuestaTexto(
                "Error: no se pudo actualizar el estado de la entrega.",
                500
            )
        }

        const etiquetas: Record<string, string> = {
            aprobado: "Entrega aprobada.",
            reentregar: "Se pidió reentrega de la actividad.",
        }

        return respuestaTexto(
            `${etiquetas[estado]} El alumno va a ver este estado actualizado en la plataforma.`,
            200
        )

    } catch (err) {
        console.error("Error inesperado:", err)
        return respuestaTexto("Ocurrió un error inesperado.", 500)
    }
})