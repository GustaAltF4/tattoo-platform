import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { supabase } from "@/lib/supabaseClient"
import {
    NotebookPen,
    CheckCircle2,
    ClipboardList,
    FileText,
    Loader2,
    PlayCircle,
    AlertCircle,
    RotateCcw,
    X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import { Skeleton } from "./ui/skeleton"
import { EntregaForm } from "./EntregaForm"
import ReactMarkdown from "react-markdown";
import type { ProtectedOutletContext } from "./protectedRoute"




type EstadoProgreso = "pendiente" | "aprobado" | "reentregar" | null

export function CardClaseView() {
    const { claseId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [contenido, setContenido] = useState("")
    const [pdfUrl, setPdfUrl] = useState("")
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [estadoProgreso, setEstadoProgreso] = useState<EstadoProgreso>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    
    const { rol } = useOutletContext<ProtectedOutletContext>()

    useEffect(() => {
        let isMounted = true

        async function fetchClase() {
            if (!claseId) {
                setErrorMessage("No encontramos el curso seleccionado.")
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            setErrorMessage("")

            const { error, data } = await supabase
                .from("clases")
                .select("titulo, descripcion, contenido, pdf_url, youtube_url")
                .eq("id", claseId)
                .single()

            if (!isMounted) return

            if (error) {
                console.error("Error al obtener la clase:", error)
                setErrorMessage("No se pudo cargar la clase. Intentá de nuevo.")
                setContenido("")
                setPdfUrl("")
                setYoutubeUrl("")
                setIsLoading(false)
                return
            }

            setContenido(data?.contenido ?? "")
            setPdfUrl(data?.pdf_url ?? "")
            setYoutubeUrl(data?.youtube_url ?? "")

            const { data: alumnoid} = await supabase.auth.getUser()

            // Traer el progreso de este alumno para esta clase puntual
            const { data: progresoData, error: progresoError } = await supabase
                .from("progreso_clases")
                .select("estado")
                .eq("alumno_id", alumnoid?.user?.id)
                .eq("clase_id", claseId)
                .maybeSingle()

            if (!isMounted) return

            if (progresoError) {
                console.error("Error al obtener progreso:", progresoError)
            }

            setEstadoProgreso((progresoData?.estado as EstadoProgreso) ?? null)
            setIsLoading(false)
        }

        fetchClase()
        return () => { isMounted = false }
    }, [claseId])

    function handleEntregaExitosa() {
        // Cierra el drawer y refleja el nuevo estado sin esperar otro fetch
        setDrawerOpen(false)
        setEstadoProgreso("pendiente")
    }

    /* ── Loading ─────────────────────────────────────────────────── */
    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-start md:gap-6">
                <div className="flex flex-1 flex-col gap-4">
                    <Skeleton className="h-8 w-2/3 rounded-lg" />
                    <Skeleton className="h-4 w-1/3 rounded-md" />
                    <Skeleton className="mt-2 h-[60vh] w-full rounded-xl" />
                </div>
                <div className="flex w-full flex-col items-center gap-3 md:w-[320px] lg:w-[380px]">
                    <Skeleton className="aspect-[9/16] w-full max-w-[320px] rounded-xl" />
                </div>
                <span className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Loader2 className="size-4 animate-spin" />
                    Cargando clase…
                </span>
            </div>
        )
    }

    /* ── Error ───────────────────────────────────────────────────── */
    if (errorMessage) {
        return (
            <Card className="mx-auto max-w-lg border-destructive/30 bg-destructive/5">
                <CardHeader className="flex flex-row items-start gap-3">
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                    <div>
                        <CardTitle className="text-base">No se pudo cargar la clase</CardTitle>
                        <CardDescription className="mt-1">{errorMessage}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        )
    }

    // El alumno puede entregar si todavía no entregó nada, o si le pidieron reentregar
    const puedeEntregar = estadoProgreso === null || estadoProgreso === "reentregar"

    /* ── Content ─────────────────────────────────────────────────── */
    return (
        <div className="flex flex-col gap-6 px-4 py-6 md:flex-row md:items-start md:gap-8 md:px-6 ">

            {youtubeUrl && (
                <aside className="order-first flex w-full flex-col gap-3 md:order-last md:w-[23%] md:sticky md:top-6 lg:w-[33%]">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground ">
                        <PlayCircle className="size-4 text-[#DD0081]" />
                        <span className="text-[#DD0081]">Video de la clase</span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border-2 border-[#DD0081] bg-card shadow-sm ring-1 ring-border/50">
                        <iframe
                            src={youtubeUrl}
                            className="aspect-[9/16] w-full"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                            title="Video de la clase"
                        />
                    </div>
                </aside>
            )}

            <article className="order-last flex min-w-0 flex-1 flex-col gap-6 md:order-first">

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2 ">
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium text-[#DD0081] border border-[#DD0081]"
                        >
                            <NotebookPen className="size-3" />
                            Clase
                        </Badge>
                        <EstadoProgresoBadge estado={estadoProgreso} />
                    </div>
                    <div className="prose dark:prose-invert max-w-none ">
                        <ReactMarkdown
                         >
                            {contenido || "Sin título"}
                        </ReactMarkdown>
                    </div>
                </div>

                <Separator />

                {/* PDF viewer */}
                {pdfUrl ? (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <FileText className="size-4 text-primary" />
                            <span>Material de la clase</span>
                        </div>

                        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm ring-1 ring-border/50">
                            <iframe
                                src={pdfUrl}
                                className="h-[70vh] w-full"
                                title="Material de la clase"
                            />
                        </div>
                    </div>
                ) : (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                            <FileText className="size-8 opacity-40" />
                            <p className="text-sm">Esta clase no tiene material adjunto.</p>
                        </CardContent>
                    </Card>
                )}

                <Separator />

                {/* Entrega de actividad */}
                <div className="flex flex-col gap-2 ">
                    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right"  > 
                        <DrawerTrigger asChild>
                            {rol === "Prof" ?  (
                                <Button
                                type="button"
                                disabled
                                className="hidden"
                                
                            />
                            ) : (
                                <Button
                                type="button"
                                disabled={!puedeEntregar}
                                className="w-fit"
                            >
                                <ClipboardList className="size-4" />
                                {estadoProgreso === "reentregar" ? "Reentregar actividad" : "Realizar actividad"}
                            </Button>
                            )}
                            
                        </DrawerTrigger>
                        <DrawerContent className="h-full">
                            <DrawerClose asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-4 rounded-full"
                                >
                                    <X className="size-4" />
                                </Button>
                            </DrawerClose>
                            <DrawerHeader>
                                <DrawerTitle>Realizar Actividad</DrawerTitle>
                                <DrawerDescription>
                                    Escribí tu mensaje y adjuntá lo que necesites para esta entrega puedes adjuntar multiples archivos.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="flex-1 overflow-hidden px-4">
                                <EntregaForm onSuccess={handleEntregaExitosa} />
                            </div>
                        </DrawerContent>
                    </Drawer>

                    {!puedeEntregar && (
                        <p className="text-sm text-muted-foreground">
                            {estadoProgreso === "aprobado"
                                ? "Ya aprobaste esta actividad, no podés volver a entregarla."
                                : "Tu entrega está pendiente de corrección por el profesor."}
                        </p>
                    )}
                </div>
            </article>
        </div>
    )
}

function EstadoProgresoBadge({ estado }: { estado: EstadoProgreso }) {
    switch (estado) {
        case "aprobado":
            return (
                <Badge
                    variant="outline"
                    className="rounded-full px-3 py-0.5 text-xs font-medium text-green-600 border-green-300 bg-green-50 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400"
                >
                    <CheckCircle2 className="mr-1 size-3" />
                    Aprobado
                </Badge>
            )
        case "pendiente":
            return (
                <Badge
                    variant="outline"
                    className="rounded-full px-3 py-0.5 text-xs font-medium text-blue-600 border-blue-300 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-400"
                >
                    <Loader2 className="mr-1 size-3 animate-spin" />
                    Pendiente de corregir
                </Badge>
            )
        case "reentregar":
            return (
                <Badge
                    variant="outline"
                    className="rounded-full px-3 py-0.5 text-xs font-medium text-red-600 border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400"
                >
                    <RotateCcw className="mr-1 size-3" />
                    Reentregar
                </Badge>
            )
        default:
            return (
                <Badge
                    variant="outline"
                    className="rounded-full px-3 py-0.5 text-xs font-medium text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400"
                >
                    <ClipboardList className="mr-1 size-3" />
                    Requiere entrega
                </Badge>
            )
    }
}
