import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import CircularGallery from "@/components/CircularGallery"

const imgAlumnos = [
  "/alumnos/2 (1).jpeg",
  "/alumnos/2 (2).jpeg",
  "/alumnos/2 (3).jpeg",
  "/alumnos/2 (4).jpeg",
  "/alumnos/2 (6).jpeg",
  "/alumnos/2 (7).jpeg",
  "/alumnos/2 (8).jpeg",
  "/alumnos/2 (9).jpeg",
  "/alumnos/2 (5).jpeg",
]

const imgAlumnos2 = [
  "/alumnos/1 (1).jpeg",
  "/alumnos/1 (2).jpeg",
  "/alumnos/1 (3).jpeg",
  "/alumnos/1 (4).jpeg",
  "/alumnos/1 (5).jpeg",
]

const clasesGallery = imgAlumnos.map((image, index) => ({
  image,
  text: `Clase ${index + 1}`,
}))

const egresadosGallery = imgAlumnos2.map((image, index) => ({
  image,
  text: `Egresado ${index + 1}`,
}))

export default function CursosHome() {
  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-500">
      <style>{`
        .hx { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
      `}</style>

      <section className="mx-auto max-w-7xl space-y-24 px-6 py-14 md:px-12">
        <div className="max-w-6xl">
          <Badge className="mb-6 rounded-full border-4 border-[#DD0081] px-5 py-3 hx text-sm tracking-widest text-[#DD0081]">
            Academia Hexagonik
          </Badge>
          <h1 className="mb-6 text-center text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] md:text-left">
            Domina el arte del <span className="text-[#DD0081]">Tattoo & Piercing</span>
          </h1>
          <p className="text-center text-lg font-light leading-relaxed text-primary  md:text-justify">
            Animate a dar el primer paso. Te acompanamos desde cero para que
            desarrolles tu propio estilo con profesionales. Elegi tu modalidad:
            virtual, presencial o hibrida.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Curso Profesional de Tattoo",
              img: "https://images.pexels.com/photos/35658325/pexels-photo-35658325.jpeg?auto=compress&w=800",
              description:
                "Aprendé las técnicas profesionales del tatuaje desde cero, combinando teoría y práctica para desarrollar tu estilo y comenzar a crear tus propios trabajos.",
            },
            {
              title: "Curso Profesional de Piercings",
              img: "https://blog.freshtrends.com/wp-content/uploads/2013/01/getting-pierced.jpg?auto=compress&w=800",
              description:
                "Formate como perforador profesional aprendiendo técnicas seguras, higiene, materiales y todo lo necesario para iniciarte en el mundo del piercing.",
            },
          ].map((curso, i) => (
            <Card key={i} className="group relative h-[450px] overflow-hidden rounded-lg border-none shadow-xl">
              <img
                src={curso.img}
                alt={curso.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />
              <CardContent className="relative z-10 flex h-full flex-col justify-end p-8">
                <CardTitle className="hx mb-4 text-4xl text-white">
                  {curso.title}
                </CardTitle>
                <p className="mb-6 text-white/80">{curso.description}</p>
                <Button
                  className="h-14 w-full cursor-pointer backdrop-blur-md"
                  onClick={() =>
                    window.open(
                      `https://wa.me/2613861336?text=Hola, queria informacion sobre el ${curso.title}`,
                      "_blank"
                    )
                  }
                >
                  Inscribirme ahora <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="space-y-8">
          <div className="text-center">
            <h2 className="hx text-6xl font-bold text-center">Nuestras Clases</h2>
          </div>
          <div className="relative left-1/2 h-[420px] w-screen max-w-none -translate-x-1/2 overflow-hidden md:h-[520px]">
            <CircularGallery
              items={clasesGallery}
              bend={2.5}
              textColor="#DD0081"
              borderRadius={0.06}
              scrollSpeed={1.8}
              scrollEase={0.06}
              showText={false}
            />
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center">
            <h2 className="hx text-6xl font-bold text-center">Alumnos Egresados 🎉</h2>
          
          </div>
          <div className="relative left-1/2 h-[360px] w-screen max-w-none -translate-x-1/2 overflow-hidden md:h-[460px]">
            <CircularGallery
              items={egresadosGallery}
              bend={3}
              textColor="#DD0081"
              borderRadius={0.06}
              scrollSpeed={1.6}
              scrollEase={0.055}
              showText={false}
            />
          </div>
        </section>

        <div className="flex flex-col items-center justify-between gap-8 rounded-lg border border-black/5 bg-white p-10 text-center shadow-xl dark:border-[#F0EDE8]/10 dark:bg-secondary md:flex-row md:p-16 md:text-left">
          <div className="space-y-2">
            <h3 className="hx text-3xl font-bold">No tenes los materiales?</h3>
            <p>
              <strong className="text-[#DD0081]">
                No te preocupes, te prestamos los materiales si venis presencial
              </strong>
              , o podés comprar nuestros kits de tatuaje.
            </p>
          </div>
          <Button className="flex h-14 cursor-pointer gap-2 rounded-lg px-8">
            <a href="/insumos" className="flex items-center gap-2">
              <Sparkles className="size-4" /> Ver Kits de Tatuaje
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
