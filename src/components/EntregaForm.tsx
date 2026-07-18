import { useState } from "react"
import { useParams } from "react-router-dom"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import Editor from "./Editor"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabaseClient"
import { X } from "lucide-react"


type EntregaFormProps = {
    onSuccess?: () => void
}

export function EntregaForm({ onSuccess }: EntregaFormProps) {
    const { claseId } = useParams()
    const [mensaje, setMensaje] = useState("")
    const [archivos, setArchivos] = useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!claseId || !mensaje.trim()) {
            toast.error("Escribí un mensaje antes de enviar.")
            return
        }


        setIsSubmitting(true)

        try {

            const { data: userData } = await supabase.auth.getUser()


            const alumnoId = userData?.user?.id

            const { data: alumnoNombreData } = await supabase
                .from("usuarios")
                .select(`nombre_completo`)
                .eq("id", alumnoId)
                .single()

            const alumnoEmail = userData?.user?.email
            const alumnoNombre = alumnoNombreData?.nombre_completo



            // 2. Si hay archivo, subirlo a Storage primero
            let archivosPath: string[] = []
            if (archivos) {
                for (let i = 0; i < archivos.length; i++) {
                    const archivo = archivos[i]

                    const fileExt = archivo.name.split(".").pop()
                    const filePath = `${claseId}/${i}/${Date.now()}-${alumnoId}.${fileExt}`

                    const { error: uploadError } = await supabase.storage
                        .from("entregas-temp")
                        .upload(filePath, archivo)

                    if (uploadError) {
                        console.error("Detalle error de Storage:", uploadError)
                        throw new Error(`No se pudo subir el archivo adjunto: ${uploadError.message}`)
                    }
                    archivosPath.push(filePath)
                }
            }

            // 3. Llamar a la Edge Function que envía el email
            const { data, error } = await supabase.functions.invoke("enviar-entrega", {
                body: {
                    claseId,
                    mensaje,
                    archivosPath,
                    alumnoEmail,
                    alumnoNombre,
                    alumnoId,
                },
            })

            if (error) {
                throw new Error(error.message ?? "No se pudo enviar la entrega.")
            }

            if (data?.error) {
                throw new Error(data.error)
            }

            toast.success("Entrega enviada correctamente.")
            setMensaje("")
            setArchivos([])
            onSuccess?.()
        } catch (err) {
            console.error("Error al enviar entrega:", err)
            toast.error(err instanceof Error ? err.message : "Ocurrió un error inesperado.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
            {/* Zona scrolleable: todo el contenido del form excepto el botón de enviar */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
                <Label htmlFor="entrega">Mensaje:</Label>
                <Editor onChange={setMensaje} />

                <Label htmlFor="archivo">Adjuntos:</Label>
                <Input
                    type="file"
                    id="archivo"
                    name="archivo"
                    onChange={(e) => {
                        if (e.target.files) {
                            setArchivos(Array.from(e.target.files))
                        }
                    }}
                    multiple
                />

                <div className="flex-1 min-h-0 overflow-y-auto ">
                    <div className="space-y-2">
                        {archivos.map((archivo, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 border rounded ml-4 mr-4"
                            >
                                <span className="m-1 flex-1 min-w-0 truncate">{archivo.name}</span>

                                <Button
                                    onClick={() => {
                                        setArchivos(archivos.filter((_, i) => i !== index))
                                    }}
                                    variant="outline"
                                    className="size-7 shrink-0 text-muted-foreground rounded-xs "
                                    type="button"
                                >
                                    <X className="size-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Zona fija: el botón siempre visible, fuera del área que scrollea */}
            <div className="shrink-0 border-t p-4">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="size-4 animate-spin" />
                            Enviando...
                        </span>
                    ) : (
                        "Enviar"
                    )}
                </Button>
            </div>
        </form>
    )
}