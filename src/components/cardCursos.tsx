import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { ArrowRight, BookOpen, Loader2, LockKeyhole } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import type { ProtectedOutletContext } from "./protectedRoute"


type Cursos = {
  id: string
  titulo: string
  descripcion: string
  img_portada_url: string
  publicado: boolean
}

export function CardCursos() {
  const navigate = useNavigate()
  const [cursos, setCursos] = useState<Cursos[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [inscripciones, setInscripciones] = useState<any[]>([])
  const { rol } = useOutletContext<ProtectedOutletContext>()



  useEffect(() => {
    let isMounted = true

    async function fetchCursos() {
      setIsLoading(true)
      setErrorMessage("")

      const { error, data } = await supabase
        .from("cursos")
        .select("*")
        .eq("publicado", true)
        .order("titulo", { ascending: true })

      if (!isMounted) return

      if (error) {
        setErrorMessage("No pudimos cargar los cursos en este momento.")
        setCursos([])
      } else {
        setCursos(data ?? [])
      }

      const { data: userid } = await supabase.auth.getUser()








      const { error: errorInscripciones, data: dataInscripciones } = await supabase
        .from("inscripciones")
        .select("curso_id")
        .eq("alumno_id", userid?.user?.id)
        .eq("activo", true)


      if (errorInscripciones) {
        setErrorMessage("No pudimos cargar los cursos en este momento.")
        setCursos([])
      }

      setInscripciones(dataInscripciones ?? [])



      if (!isMounted) return

      setIsLoading(false)




    }

    fetchCursos()

    return () => {
      isMounted = false
    }
  }, [])

  function irACLase(cursoid: string) {
    navigate(`/cursos/${cursoid}/clases`)
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2].map((item) => (
          <Card key={item} className="overflow-hidden">

            <CardHeader >
              <Skeleton className="aspect-video w-full" />

            </CardHeader>
            <Skeleton className="h-4 w-2/3 rounded-md ml-4" />
            <CardFooter className="justify-between">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Cargando
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (errorMessage) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle>No se pudieron traer los cursos</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (cursos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-muted">
            <BookOpen className="size-4" />
          </div>
          <CardTitle>Todavia no hay cursos publicados</CardTitle>
          <CardDescription>
            Cuando publiques un curso, va a aparecer automaticamente aca.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }





  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cursos.map((curso) => (
        <Card key={curso.id} className="overflow-hidden pt-0 flex flex-col">
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <img
              src={curso.img_portada_url}
              alt={curso.titulo}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <CardHeader>
            <CardTitle className="line-clamp-2 text-[#DD0081] font-bold text-xl ">{curso.titulo}</CardTitle>
            <CardDescription className="line-clamp-3">
              {curso.descripcion}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Curso publicado
            </p>
          </CardContent>
          <CardFooter className="justify-end mt-auto">
            {(rol === "Prof") || inscripciones.some((inscripcion) => inscripcion.curso_id === curso.id) ? (

              <Button onClick={() => irACLase(curso.id)} type="button"  >
                Ingresar
                <ArrowRight />
              </Button>


            ) : (
              <>
                <p className="text-[0.5rem] font-medium  tracking-wide text-muted-foreground mr-2">
                  Puedes inscribirte para desbloquear
                </p>
                <Button onClick={() => irACLase(curso.id)} type="button" disabled >
                  Ingresar
                  <LockKeyhole />
                </Button>
                
              </>
            )
            }

          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
