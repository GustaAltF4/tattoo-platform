import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Mail,
  Phone,
  Loader2,
  CheckCircle2,
  ClipboardList,
  RotateCcw,
  Clock,
  CircleSlash,
  Save,
} from "lucide-react"
import { CertificadoButton } from "./components/CertificadoDoc"

type Alumno = {
  id: string
  nombre_completo: string
  email: string
  tel: string | null
}

type ProgresoClase = {
  clase_id: string
  clase_titulo: string
  orden_numero: number
  estado: "pendiente" | "aprobado" | "reentregar" | null
}

type ClaseConPdf = {
  id: string
  titulo: string
  orden_numero: number
  pdf_url: string | null
}

type AlumnoConProgreso = {
  alumno: Alumno
  progreso: ProgresoClase[]
  aprobadas: number
  total: number
}

type Curso = {
  id: string
  titulo: string
  alumnos: AlumnoConProgreso[]
  clases: ClaseConPdf[]
}

function EstadoBadge({ estado }: { estado: ProgresoClase["estado"] }) {
  switch (estado) {
    case "aprobado":
      return (
        <Badge variant="outline" className="gap-1 border-green-300 text-green-700 dark:border-green-800 dark:text-green-400">
          <CheckCircle2 className="size-3" /> Aprobado
        </Badge>
      )
    case "pendiente":
      return (
        <Badge variant="outline" className="gap-1 border-blue-300 text-blue-700 dark:border-blue-800 dark:text-blue-400">
          <Clock className="size-3" /> Pendiente
        </Badge>
      )
    case "reentregar":
      return (
        <Badge variant="outline" className="gap-1 border-red-300 text-red-700 dark:border-red-800 dark:text-red-400">
          <RotateCcw className="size-3" /> Reentregar
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="gap-1 border-yellow-300 text-yellow-700 dark:border-yellow-800 dark:text-yellow-400">
          <ClipboardList className="size-3" /> Sin entregar
        </Badge>
      )
  }
}

export function TableProf() {
  const { user } = useOutletContext<{ user: any; rol: string | null }>()
  const [cursos, setCursos] = useState<Curso[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  
  const [alumnoNombre, setAlumnoNombre] = useState("")
  const [cursoTitulo, setCursoTitulo] = useState("")

  async function handleDescargarPdf(pdfUrl: string, nombreArchivo: string) {
    try {
      const response = await fetch(pdfUrl)
      if (!response.ok) {
        throw new Error("No se pudo descargar el PDF.")
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const esIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
      const esSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

      if (esIOS && esSafari) {
        const ventana = window.open(url, "_blank", "noopener,noreferrer")

        if (!ventana) {
          window.location.href = url
        }

        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 1000)
        return
      }

      const a = document.createElement("a")
      a.href = url
      a.download = nombreArchivo
      a.rel = "noopener noreferrer"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al descargar el PDF:", error)
    }
  }

  useEffect(() => {
    let isMounted = true

    async function fetchDatos() {
      setIsLoading(true)
      setErrorMessage("")



      try {
        // 1. Obtener el id del profesor desde usuarios
        const { data: profData, error: profError } = await supabase
          .from("usuarios")
          .select("id")
          .eq("id", user.id)
          .single()

        if (profError || !profData) throw new Error("No se pudo obtener el profesor.")

        // 2. Traer todos los cursos del profesor
        const { data: cursosData, error: cursosError } = await supabase
          .from("cursos")
          .select("id, titulo")
          .eq("profesor_id", user.id)

        if (cursosError) throw new Error("No se pudieron cargar los cursos.")
        if (!isMounted) return

        const cursosConAlumnos: Curso[] = []

        for (const curso of cursosData ?? []) {
          // 3. Inscripciones activas de este curso
          const { data: inscripcionesData, error: inscError } = await supabase
            .from("inscripciones")
            .select("alumno_id")
            .eq("curso_id", curso.id)
            .eq("activo", true)

          if (inscError) continue
          if (!isMounted) return

          const alumnoIds = (inscripcionesData ?? []).map((i) => i.alumno_id)

          // 4. Clases del curso
          const { data: clasesData, error: clasesError } = await supabase
            .from("clases")
            .select("id, titulo, orden_numero, pdf_url")
            .eq("curso_id", curso.id)
            .order("orden_numero", { ascending: true })

          if (clasesError) continue
          if (!isMounted) return

          const claseIds = (clasesData ?? []).map((c) => c.id)

          if (alumnoIds.length === 0) {
            cursosConAlumnos.push({
              id: curso.id,
              titulo: curso.titulo,
              alumnos: [],
              clases: (clasesData ?? []).map((clase) => ({
                id: clase.id,
                titulo: clase.titulo,
                orden_numero: clase.orden_numero,
                pdf_url: clase.pdf_url ?? null,
              })),
            })
            continue
          }


          // 4. Datos de los alumnos (nombre, email, tel)
          const { data: alumnosData, error: alumnosError } = await supabase
            .from("usuarios")
            .select("id, nombre_completo, email, tel")
            .in("id", alumnoIds)

          if (alumnosError) continue
          if (!isMounted) return

          // 5. Progreso de todos los alumnos en este curso
          const { data: progresoData, error: progresoError } = await supabase
            .from("progreso_clases")
            .select("alumno_id, clase_id, estado")
            .in("alumno_id", alumnoIds)
            .in("clase_id", claseIds)

          if (progresoError) continue
          if (!isMounted) return


          // 6. Armar estructura por alumno
          const alumnosConProgreso: AlumnoConProgreso[] = (alumnosData ?? []).map((alumno) => {
            const progreso: ProgresoClase[] = (clasesData ?? []).map((clase) => {
              const fila = (progresoData ?? []).find(
                (p) => p.alumno_id === alumno.id && p.clase_id === clase.id
              )
              return {
                clase_id: clase.id,
                clase_titulo: clase.titulo,
                orden_numero: clase.orden_numero,
                estado: fila?.estado ?? null,
              }
            })

            const aprobadas = progreso.filter((p) => p.estado === "aprobado").length

            return {
              alumno: {
                id: alumno.id,
                nombre_completo: alumno.nombre_completo,
                email: alumno.email,
                tel: alumno.tel?.toString() ?? null,
              },
              progreso,
              aprobadas,
              total: clasesData?.length ?? 0,
            }


          })

          cursosConAlumnos.push({
            id: curso.id,
            titulo: curso.titulo,
            alumnos: alumnosConProgreso,
            clases: (clasesData ?? []).map((clase) => ({
              id: clase.id,
              titulo: clase.titulo,
              orden_numero: clase.orden_numero,
              pdf_url: clase.pdf_url ?? null,
            })),
          })

        }

        if (!isMounted) return
        setCursos(cursosConAlumnos)
      } catch (err) {
        console.error(err)
        setErrorMessage("No se pudo cargar el panel del profesor.")
      } finally {
        if (isMounted) setIsLoading(false)

      }
    }


    if (user?.id) fetchDatos()


    return () => { isMounted = false }

  }, [user?.id])

  if (isLoading) {
    return (

      <div className="flex flex-col gap-4 p-4 md:p-6 md:max-w-[100%] ">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-4 w-1/4 rounded-md" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full rounded-md" />
            </CardContent>
          </Card>
        ))}
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Cargando panel...
        </span>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <Card className="border-destructive/30 bg-destructive/5 p-4 md:p-6">
        <CardHeader>
          <CardTitle>Error al cargar</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (cursos.length === 0) {
    return (
      <Card className="p-4 md:p-6 m-4">
        <CardHeader>
          <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-muted">
            <CircleSlash className="size-4" />
          </div>
          <CardTitle>Sin cursos asignados</CardTitle>
          <CardDescription>No tenés cursos asignados como profesor todavía.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (

    <div className="flex flex-col gap-6 p-4 md:p-6 ">
      <Accordion type="multiple" defaultValue={cursos.map((c) => c.id)} className="min-w-0 bg-card">
        {cursos.map((curso) => (
          <AccordionItem key={curso.id} value={curso.id} className="min-w-0 ">
            <AccordionTrigger className="px-5 py-4 hover:no-underline ">
              <div className="text-left">
                <span className="font-bold text-lg text-[#DD0081]">{curso.titulo}</span>
                <p className="text-sm text-muted-foreground">
                  {curso.alumnos.length} alumno{curso.alumnos.length !== 1 ? "s" : ""}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="overflow-hidden p-0">
              {/* Contenedor con overflow-x-auto para evitar desbordes */}
              <div className="overflow-x-auto rounded-lg border border-muted mx-5 mb-5" >
                <Table className="w-full">
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead className="min-w-[150px]">Alumno</TableHead>
                      <TableHead className="text-center">Contacto</TableHead>
                      <TableHead className="text-center">Progreso</TableHead>
                      {curso.alumnos[0]?.progreso.map((p) => (
                        <TableHead key={p.clase_id} className="text-center min-w-[100px]">
                          Clase {p.orden_numero}
                        </TableHead>
                      ))}

                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {curso.alumnos.map(({ alumno, progreso, aprobadas, total }) => (
                      <TableRow key={alumno.id}>
                        <TableCell className="font-medium text-sm">
                          {alumno.nombre_completo}
                          <div className="text-[10px] text-muted-foreground">{alumno.email}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button

                              asChild

                              variant="outline"

                              size="icon"

                              className="rounded-full size-8"

                              title={`Enviar email a ${alumno.nombre_completo}`}

                            >

                              <a href={`mailto:${alumno.email}`}>

                                <Mail className="size-3.5" />

                              </a>

                            </Button>

                            {alumno.tel && (

                              <Button

                                asChild

                                variant="outline"

                                size="icon"

                                className="rounded-full size-8"

                                title={`WhatsApp a ${alumno.nombre_completo}`}

                              >

                                <a

                                  href={`https://wa.me/54${alumno.tel}`}

                                  target="_blank"

                                  rel="noreferrer"

                                >

                                  <Phone className="size-3.5" />

                                </a>

                              </Button>

                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-sm font-bold">
                          {aprobadas}/{total}
                        </TableCell>
                        {progreso.map((p) => (
                          <TableCell key={p.clase_id} className="text-center">
                            <div className="scale-90 origin-center">
                              <EstadoBadge estado={p.estado} />
                            </div>
                          </TableCell>
                        ))}

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Formulario de Certificado */}
      <Card className=" gap-4 mt-8 ">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#DD0081]">Generar certificado Manualmente</CardTitle>
          <CardDescription>Ingresa el nombre del alumno y el curso para generar un certificado. Usalo en caso de que el alumno no tenga acceso a su certificado.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col  gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium px-2 ">Nombre del alumno</label>
              <input
                className="w-full h-10 px-3 border rounded-md mt-2"
                placeholder="Ingresa el Nombre del alumno"
                value={alumnoNombre}
                onChange={(e) => setAlumnoNombre(e.target.value)}
              />
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium px-2  ">Curso</label>
              <input
                className="w-full h-10 px-3 border rounded-md mt-2"
                placeholder="Ingresa el Nombre del curso"
                value={cursoTitulo}
                onChange={(e) => setCursoTitulo(e.target.value)}
              />
            </div>


            <CertificadoButton alumnoNombre={alumnoNombre}
              cursoTitulo={cursoTitulo}

            />
          </form>
        </CardContent>
      </Card>

      <Card className="gap-4 mt-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#DD0081]">Descargar pdf de los cursos</CardTitle>
          <CardDescription>Elegí la clase de la que querés descargar el pdf, si esa clase tiene uno adjunto.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">


            {cursos.map((curso) => {
              const clasesConPdf = curso.clases.filter((clase) => clase.pdf_url)

              return (
                <div key={curso.id} className="rounded-lg border bg-muted/20 p-4">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-[#DD0081]">{curso.titulo}</h3>
                    <p className="text-md text-muted-foreground">
                      {clasesConPdf.length > 0
                        ? `${clasesConPdf.length} clase${clasesConPdf.length !== 1 ? "s" : ""} con PDF adjunto`
                        : "Este curso no tiene PDFs adjuntos por ahora"}
                    </p>
                  </div>

                  {clasesConPdf.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {clasesConPdf.map((clase) => (
                        <div
                          key={clase.id}
                          className="flex items-center justify-between gap-4 rounded-md border bg-card px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {clase.titulo}
                            </p>
                            
                          </div>
                          <Button
                            variant="outline"
                            className="shrink-0 inline-flex h-10 items-center justify-center gap-2 rounded-md text-sm"
                            onClick={() =>
                              clase.pdf_url &&
                              handleDescargarPdf(
                                clase.pdf_url,
                                `Clase ${clase.orden_numero} - ${clase.titulo}.pdf`
                              )
                            }
                          >
                            
                            <Save className="size-4 shrink-0" />
                            <span>Descargar</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                      No hay PDF para descargar en este curso.
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


