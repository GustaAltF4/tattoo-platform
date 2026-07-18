import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import GaleriaAlumnos from "@/components/abanico"

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
export default function CursosHome() {
    return (
        <div className=" min-h-screen transition-colors duration-500">
            <style>{`
                .hx { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
            `}</style>

            <section className="px-6 py-14 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* Header */}
                <div className="max-w-6xl">
                    <Badge className="mb-6 text-[#DD0081] border-4 border-[#DD0081] px-5 py-3 rounded-full hx text-sm tracking-widest">
                        Academia Hexagonik
                    </Badge>
                    <h1 className=" text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] mb-6 text-center md:text-left">
                        Domina el arte del <span className="text-[#DD0081] ">Tattoo & Piercing</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-[#888] leading-relaxed font-light md:text-justify text-center">
                        ¡Animate a dar el primer paso! Te acompañamos desde cero para que desarrolles tu propio estilo con profesionales.
                        Elegí tu modalidad: virtual, presencial o híbrida. Convertí tu pasión en una habilidad real.
                    </p>
                </div>

                {/* Grid de Cursos */}
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Curso Profesional de Tattoo",
                            img: "https://images.pexels.com/photos/35658325/pexels-photo-35658325.jpeg?auto=compress&w=800",
                            description: "Aprendé las técnicas profesionales del tatuaje desde cero, combinando teoría y práctica para desarrollar tu estilo y comenzar a crear tus propios trabajos."
                        },
                        {
                            title: "Curso Profesional de Piercings",
                            img: "https://blog.freshtrends.com/wp-content/uploads/2013/01/getting-pierced.jpg?auto=compress&w=800",
                            description: "Formate como perforador profesional aprendiendo técnicas seguras, higiene, materiales y todo lo necesario para iniciarte en el mundo del piercing."
                        }
                    ].map((curso, i) => (
                        <Card key={i} className="group relative h-[450px] border-none overflow-hidden rounded-lg shadow-xl">
                            <img
                                src={curso.img}
                                alt={curso.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />

                            <CardContent className="relative z-10 h-full flex flex-col justify-end p-8">
                                <CardTitle className="hx text-4xl text-white mb-4">
                                    {curso.title}
                                </CardTitle>

                                <p className="text-white/80 mb-6">
                                    {curso.description}
                                </p>

                                <Button
                                    className="w-full cursor-pointer backdrop-blur-md h-14"
                                    onClick={() => window.open(
                                        `https://wa.me/2613861336?text=Hola, queria informacion sobre el ${curso.title}`,
                                        "_blank"
                                    )}
                                >
                                    Inscribirme ahora <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Sección Alumnos */}
                {/* ── Galería de Alumnos (Estilo Abanico) ── */}
                    <h2 className="hx text-6xl font-bold text-center">Nuestras Clases </h2>
                <GaleriaAlumnos images={imgAlumnos} />
                <h2 className="hx text-6xl font-bold text-center">🎉 Alumnos Egresados 🎉</h2>
                <GaleriaAlumnos images={imgAlumnos2} />

                {/* Call to Action */}
                <div className="bg-white dark:bg-secondary p-10 text-center md:text-left md:p-16 rounded-[2rem] border border-black/5 dark:border-[#F0EDE8]/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                    <div className="space-y-2">
                        <h3 className="hx text-3xl font-bold">¿No tienes los materiales?</h3>
                        <p ><strong className=" text-[#DD0081]">¡No te preocupes! No te preocupes te prestamos los materiales si vienes presencial</strong>, o puedes comprar nuestros kits de tatuaje.</p>
                    </div>
                    <Button className="cursor-pointer    px-8 h-14 rounded-lg flex gap-2 "
                    >
                        <a href="/insumos" className="flex items-center gap-2">
                        <Sparkles className="size-4" /> Ver Kits de Tatuaje
                        </a>
                    </Button>
                </div>
            </section>
        </div>
    )
}