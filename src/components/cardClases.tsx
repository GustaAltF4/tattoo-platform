import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { supabase } from "@/lib/supabaseClient"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Lock,
  Loader2,
  RotateCcw,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { Progress } from "./ui/progress"
import { toast } from "sonner"
import type { ProtectedOutletContext } from "./protectedRoute"
import { CertificadoButton } from "./CertificadoDoc"



type Clase = {
  id: string
  titulo: string
  descripcion: string
  orden_numero: number
  curso_id: string
}

type EstadoProgreso = "pendiente" | "aprobado" | "reentregar"



// Estado derivado para cada clase, combinando si está bloqueada + su progreso
type EstadoClase =
  | "bloqueada"
  | "sin_entregar"   // desbloqueada, sin fila en progreso_clases todavía
  | "pendiente"       // entregó, esperando corrección del profesor
  | "reentregar"
  | "aprobado"

export function CardClases() {
  const navigate = useNavigate()
  const { cursoId } = useParams()
  const outletContext = useOutletContext<ProtectedOutletContext | undefined>()
  const rol = outletContext?.rol ?? null
  const [clases, setClases] = useState<Clase[]>([])
  const [progresoPorClase, setProgresoPorClase] = useState<Record<string, EstadoProgreso>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [retryToken, setRetryToken] = useState(0)
  const [alumnoNombre, setAlumnoNombre] = useState("")
  const [cursoTitulo, setCursoTitulo] = useState("")


  useEffect(() => {
    let isMounted = true

    async function fetchClasesYProgreso() {
      if (!cursoId) {
        const mensaje = "No encontramos el curso seleccionado."
        setErrorMessage(mensaje)
        setIsLoading(false)
        toast.error(mensaje)
        return
      }

      setIsLoading(true)
      setErrorMessage("")

      const { data: clasesData, error: clasesError } = await supabase
        .from("clases")
        .select("id, titulo, descripcion, orden_numero, curso_id")
        .eq("curso_id", cursoId)
        .order("orden_numero", { ascending: true })

      if (!isMounted) return

      if (clasesError) {
        const mensaje = "No pudimos cargar las clases en este momento."
        setErrorMessage(mensaje)
        setClases([])
        setIsLoading(false)
        toast.error(mensaje)
        return
      }

      const { data: cursoData, error: cursoError } = await supabase
        .from("cursos")
        .select("titulo")
        .eq("id", cursoId)
        .single()

      if (!isMounted) return

      if (cursoError) {
        console.error("Error al obtener título del curso:", cursoError)
        toast.error("Cargamos las clases, pero no pudimos leer el título del curso.")
      } else {
        setCursoTitulo(cursoData?.titulo ?? "")

      }

      const idsClases = (clasesData ?? []).map((c) => c.id)

      const { data: alumnoid } = await supabase.auth.getUser()

      // Traer el progreso de ESTE alumno para todas las clases del curso de una sola vez
      const { data: progresoData, error: progresoError } = await supabase
        .from("progreso_clases")
        .select("clase_id, estado")
        .eq("alumno_id", alumnoid.user?.id)
        .in("clase_id", idsClases)

      if (!isMounted) return



      if (progresoError) {
        console.error("Error al obtener progreso:", progresoError)
        toast.error("Cargamos las clases, pero no pudimos leer el progreso.")
      }

      const mapaProgreso: Record<string, EstadoProgreso> = {}
      for (const fila of progresoData ?? []) {
        mapaProgreso[fila.clase_id] = fila.estado as EstadoProgreso
      }

      const { data: alumnoData, error: alumnoError } = await supabase
        .from("usuarios")
        .select("nombre_completo")
        .eq("id", alumnoid.user?.id)
        .single()

      if (!isMounted) return

      if (alumnoError) {
        console.error("Error al obtener nombre del alumno:", alumnoError)
        toast.error("Cargamos las clases, pero no pudimos leer el nombre del alumno.")
      } else {
        setAlumnoNombre(alumnoData?.nombre_completo ?? "")

      }

      setClases(clasesData ?? [])
      setProgresoPorClase(mapaProgreso)
      setIsLoading(false)

    }

    fetchClasesYProgreso()

    return () => {
      isMounted = false
    }

  }, [cursoId, retryToken])

  function calcularEstadoClase(clase: Clase, index: number): EstadoClase {
    // La primera clase siempre está desbloqueada
    if (index === 0) {
      return progresoPorClase[clase.id] ?? "sin_entregar"
    }

    const claseAnterior = clases[index - 1]
    const estadoAnterior = progresoPorClase[claseAnterior.id]

    if (estadoAnterior !== "aprobado") {
      return "bloqueada"
    }

    return progresoPorClase[clase.id] ?? "sin_entregar"
  }


  function irAClase(claseId: string, estado: EstadoClase) {
    if (estado === "bloqueada" && rol !== "Prof") return
    navigate(`/cursos/${cursoId}/clases/${claseId}`)
  }

  const totalClases = clases.length
  const clasesAprobadas = clases.filter((c) => progresoPorClase[c.id] === "aprobado").length
  const porcentajeAvance = totalClases > 0 ? Math.round((clasesAprobadas / totalClases) * 100) : 0

  if (isLoading) {
    return (
      <div className="grid gap-3">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="overflow-hidden">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-3">
                <Skeleton className="size-10 shrink-0 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <Skeleton className="h-7 w-28 rounded-full" />
            </CardHeader>
            <CardFooter className="justify-end pt-0">
              <Skeleton className="h-9 w-28 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (errorMessage) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader className="space-y-2">
          <CardTitle>No se pudieron traer las clases</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button type="button" variant="outline" onClick={() => setRetryToken((value) => value + 1)}>
            Reintentar
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (clases.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-muted">
            <BookOpen className="size-4" />
          </div>
          <CardTitle>Todavia no hay clases publicadas</CardTitle>
          <CardDescription>
            Cuando hayan clases publicadas aparecerán automaticamente.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      <div className="rounded-md border bg-muted/30 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase">{totalClases} clases en este curso</p>
            {rol !== "Prof" && (
              <p className="text-sm text-muted-foreground ">
                {clasesAprobadas} de {totalClases} aprobadas
              </p>
            )}
          </div>

          {rol !== "Prof" && (

            <div className="flex min-w-44 items-center gap-2">
              <Progress
                value={porcentajeAvance}
                max={100}
                className="h-2 border border-[#DD0081] [&>div]:bg-[#DD0081]"
              />
              <span className="w-10 text-right text-sm font-medium">
                {porcentajeAvance}%
              </span>
            </div>
          )}
        </div>
      </div>


      {/* Boton para descargar certificado una vez que el usuario haya aprobado todas las clases del curso.  */}
      {rol !== "Prof" &&
        clasesAprobadas === totalClases &&
        totalClases > 0 &&
        alumnoNombre &&
        cursoTitulo && (
          <Card className=" border-2 border-[#DD0081] bg-muted/10 transition-all duration-300 shadow-[0_0_15px_#DD0081]">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-semibold text-[#DD0081] border-2 border-[#DD0081]">
                  <span className="text-2xl font-bold">🎉</span>
                </div>
                <div>
                  <CardTitle className="line-clamp-2 text-base font-semibold">
                    Finalizaste el curso, ¡felicitaciones!
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    Ahora podés descargar tu certificado del curso. Suerte en tu camino y esperamos verte en otros cursos.
                  </CardDescription>
                  <div className="font-semibold  text-[#DD0081] mt-2">


                    Este usuario será eliminado después de un tiempo. Asegurate de descargar
                    tu certificado antes de que eso ocurra.

                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end">
                <CertificadoButton alumnoNombre={alumnoNombre}           // nombre del usuario logueado
                  cursoTitulo={cursoTitulo}
                />
              </div>
            </CardHeader>
          </Card>
        )}




      {clases.map((clase, index) => {
        const estado = calcularEstadoClase(clase, index)
        const bloqueada = estado === "bloqueada" && rol !== "Prof"



        return (

          <Card
            key={clase.id}
            className={bloqueada ? "opacity-60" : "transition-colors hover:bg-muted/30"}
          >
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-semibold text-[#DD0081] border-2 border-[#DD0081]">
                  {bloqueada ? <Lock className="size-4 " /> : clase.orden_numero}
                </div>
                <div>
                  <CardTitle className="line-clamp-2 text-base font-semibold">
                    {clase.titulo}
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {clase.descripcion}
                  </CardDescription>
                </div>
              </div>

              {rol !== "Prof" && <EstadoBadge estado={estado} />}
            </CardHeader>

            <CardFooter className="justify-end pt-0">
              <Button
                onClick={() => irAClase(clase.id, estado)}
                type="button"
                disabled={bloqueada}
              >
                {bloqueada ? "Bloqueada" : "Ingresar"}
                {!bloqueada && <ArrowRight className="ml-2 size-4" />}
              </Button>
            </CardFooter>
          </Card>
        )
      })}



    </div>
  )
}

function EstadoBadge({ estado }: { estado: EstadoClase }) {
  switch (estado) {
    case "bloqueada":
      return (
        <Badge variant="outline" className="p-3 text-xs gap-1  border-2">
          <Lock className="size-3.5" />
          Bloqueada
        </Badge>
      )
    case "sin_entregar":
      return (
        <Badge variant="outline" className=" gap-1  border-2  p-3 text-xs text-yellow-700">
          <ClipboardList className="size-3.5" />
          Requiere entrega
        </Badge>
      )
    case "pendiente":
      return (
        <Badge variant="outline" className=" gap-1  border-2  p-3 text-xs text-blue-700">
          <Loader2 className="size-3.5 animate-spin" />
          Pendiente de corregir
        </Badge>
      )
    case "reentregar":
      return (
        <Badge variant="outline" className=" gap-1  border-2  p-3 text-xs text-red-700">
          <RotateCcw className="size-3.5" />
          Reentregar
        </Badge>
      )
    case "aprobado":
      return (
        <Badge variant="outline" className=" gap-1 border-2 p-3 text-xs text-green-700">
          <CheckCircle2 className="size-3.5" />
          Aprobado
        </Badge>
      )
  }
}
