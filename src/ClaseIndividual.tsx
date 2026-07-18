import { useParams } from "react-router-dom"
import { CardClaseView } from "@/components/CardClaseView"
import { supabase } from "@/lib/supabaseClient"
import { NotebookPen, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"


export default function Clase() {
  const { claseId } = useParams()
  const [nombreClase, setNombreClase] = useState("Curso")
  const [descripcion, setDescripcion] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function getNombreCurso() {
      if (!claseId) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      const { data, error } = await supabase
        .from("clases")
        .select("titulo, descripcion")
        .eq("id", claseId)
        .single()

      if (!isMounted) return

      if (error) {
        console.error("Error al obtener la clase:", error)
        setNombreClase("Clase")
        setDescripcion("Descripcion")
      } else {
        setNombreClase(data?.titulo ?? "Clase")
        setDescripcion(data?.descripcion ?? "Descripcion")
      }

      setIsLoading(false)
    }

    getNombreCurso()

    return () => {
      isMounted = false
    }
  }, [claseId])

  return (
    <section className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-muted">
              <NotebookPen className="size-5 text-[#DD0081]" />
            </div>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#DD0081]">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  Cargando clase
                </span>
              ) : (
                nombreClase
              )}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  Cargando descripcion
                </span>
              ) : (
                descripcion
              )}


            </p>

            <div className="mt-4  gap-2 text-sm text-primary">
              <div className=" gap-1">
                <span>¿Tienes alguna duda o necesitas contactar al profesor? </span>
                <a className="text-[#DD0081] hover:underline text-[#DD0081]/80 transition-colors duration-200 underline-offset-4" 
                href="https://wa.me/2613861336" target="_blank" rel="noopener noreferrer">
                  👉Toca aqui para contactar al Profe👈
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="rounded-lg border bg-card p-4 shadow-sm md:p-5">
        <CardClaseView />
      </div>
    </section>
  )
}
