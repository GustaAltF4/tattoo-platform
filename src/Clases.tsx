import { useParams } from "react-router-dom"
import { CardClases } from "@/components/cardClases"
import { supabase } from "@/lib/supabaseClient"
import { BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function Clases() {
  const { cursoId } = useParams()
  const [nombreCurso, setNombreCurso] = useState("Curso")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function getNombreCurso() {
      if (!cursoId) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      const { data, error } = await supabase
        .from("cursos")
        .select("titulo")
        .eq("id", cursoId)
        .single()

      if (!isMounted) return

      if (error) {
        console.error("Error al obtener el nombre del curso:", error)
        setNombreCurso("Curso")
        toast.error("No pudimos cargar el nombre del curso.")
      } else {
        setNombreCurso(data?.titulo ?? "Curso")
      }

      setIsLoading(false)
    }

    getNombreCurso()

    return () => {
      isMounted = false
    }
  }, [cursoId])

  return (
    <section className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-muted text-[#DD0081] ">
              <BookOpen className="size-5" />
            </div>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#DD0081]">
              {isLoading ? (
                <Skeleton className="h-8 w-56" />
              ) : (
                nombreCurso
              )}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Aquí puedes acceder a las clases disponibles para este curso. Cada clase puede incluir contenido en video, material descargable y, si requiere entrega, una práctica para enviar. ¡Empecemos!
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm md:p-5">
        <CardClases />
      </div>
    </section>
  )
}
