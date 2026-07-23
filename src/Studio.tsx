import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ArrowRight,
  GraduationCap,
  Images,
  MapPin,
  MessageCircle,
  Play,
  Package,
  Wrench,
} from "lucide-react"

export default function Studio() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hx-visible")
          }
        })
      },
      { threshold: 0.12 }
    )

    revealRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const ref = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <TooltipProvider>
      <div className="relative isolate overflow-x-hidden bg-transparent text-[#1A1A1A] transition-colors duration-500 dark:text-[#F0EDE8]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

          .hx { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
          .hx-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
          .hx-visible { opacity: 1 !important; transform: translateY(0) !important; }
          .hx-card { backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); }
          .hx-lift { transition: transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease; }
          .hx-lift:hover { transform: translateY(-6px); }
          .hx-img { transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s; filter: grayscale(18%); }
          .hx-gallery-item:hover .hx-img { transform: scale(1.08); filter: grayscale(0%); }
          .hx-pink-overlay { position:absolute; inset:0; background:#DD0081; opacity:0; transition:opacity 0.35s; border-radius:inherit; }
          .hx-gallery-item:hover .hx-pink-overlay { opacity: 0.2; }
          @keyframes hxUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
          .a1 { animation: hxUp 0.7s 0.08s cubic-bezier(0.22,1,0.36,1) both; }
          .a2 { animation: hxUp 0.7s 0.18s cubic-bezier(0.22,1,0.36,1) both; }
          .a3 { animation: hxUp 0.7s 0.28s cubic-bezier(0.22,1,0.36,1) both; }
          .a4 { animation: hxUp 0.7s 0.38s cubic-bezier(0.22,1,0.36,1) both; }
          .animate-float { animation: float 5s ease-in-out infinite; }
          .animate-float-delayed { animation: float 5s ease-in-out 2.4s infinite; }
        `}</style>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,rgba(221,0,129,0.14)_0%,transparent_62%)] dark:bg-[radial-gradient(circle_at_top,rgba(221,0,129,0.22)_0%,transparent_62%)]"
        />

        <section className="relative min-h-[500px] overflow-hidden md:min-h-[600px] ">
          <div className="absolute inset-0 z-0">
            <img
              src="img/2.png"
              alt="Hexagonik Tattoo Studio"
              className="w-full h-100 md:h-full object-cover  dark:brightness-[0.6]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/0 to-transparent dark:from-black/30 dark:via-black/0" />
          </div>

          <div className="relative z-10 flex min-h-[500px] w-full items-end px-6 pb-8 pt-10 md:min-h-[600px] md:px-12 md:pb-10">
            <div className="max-w-3xl">
              <Badge className="a1 mb-6 rounded-full border-4 border-[#DD0081]/20 bg-[#DD0081]/5 px-5 py-2 text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#DD0081]/20 dark:border-[#DD0081]/30 dark:bg-[#DD0081]/10 dark:hover:bg-[#DD0081]/30">
                Mendoza | Tattoo Studio
              </Badge>
              <h1 className="hx a2 text-[clamp(4.5rem,14vw,11rem)] leading-[0.85] text-[#1A1A1A] drop-shadow-md transition-colors duration-500 dark:text-[#F0EDE8] dark:drop-shadow-2xl">
                <span className="text-[#DD0081]">HEXA</span>GONIK
              </h1>
              <p className="a3 mt-2 max-w-md text-base font-light leading-relaxed text-slate-600 transition-colors duration-500 dark:text-[#ccc] md:text-lg">
                Donde tus ideas se convierten en obras de arte que llevás para
                siempre.
              </p>
              <div className="a4 mt-8 flex flex-wrap gap-4">
                <Button
                  asChild
                  className="h-14 w-full md:w-auto rounded-md bg-[#DD0081] px-8 text-base text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#c40073] hover:shadow-lg dark:text-white dark:shadow-[0_0_20px_rgba(221,0,129,0.3)] dark:hover:shadow-[0_0_30px_rgba(221,0,129,0.6)]"
                >
                  <a href="#servicios">Ver servicios</a>
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild className="w-full md:w-auto">
                    <Button
                      asChild
                      variant="outline"
                      className="h-14 rounded-md border-black/10 bg-white/50 px-8 text-base text-slate-800 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#DD0081] hover:bg-[#DD0081]/10 hover:text-[#DD0081] dark:border-[#F0EDE8]/20 dark:bg-black/30 dark:text-[#F0EDE8]"
                    >
                      <a
                        href="https://wa.me/2613861336?text=Hola,%20quisiera%20pedir%20un%20turno"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="mr-2 size-5" />
                        Reserva tu turno
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="rounded-md border-none bg-[#DD0081] px-5 py-2 text-white shadow-xl"
                  >
                    <p>Contactanos por WhatsApp</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>
        <section id="servicios" ref={ref} className="hx-reveal px-6 py-24 md:px-12 md:py-32">
          <div className="text-center mb-16 flex flex-col items-center">
            <p className="hx text-[12px] tracking-[0.25em] text-[#DD0081] mb-4 bg-[#DD0081]/10 w-fit px-5 py-1.5 rounded-full animate-float">Lo que hacemos</p>
            <h2 className="hx text-[clamp(3rem,7vw,5.5rem)] leading-[0.9] text-[#1A1A1A] dark:text-[#F0EDE8] transition-colors duration-500">
              Servicios
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {[
              {
                href: "/cursoshome",
                num: "01",
                Icon: GraduationCap,
                name: "Clases",
                desc: "Aprendé a tatuar con artistas especializados. Desde nivel cero hasta técnicas avanzadas.",
                img: "https://images.pexels.com/photos/35658325/pexels-photo-35658325.jpeg?auto=compress&w=600"
              },
              {
                href: "https://docs.google.com/spreadsheets/d/1j5Si4TgRMVpTDGWbwlSMX41CEtHxZhl--wKsAOIygh8/edit?usp=sharing",
                num: "02",
                Icon: Package,
                name: "Insumos",
                desc: "Todo lo que necesitás para tatuar: tintas, agujas, cartuchos y más calidad profesional.",
                img: "https://images.pexels.com/photos/32225192/pexels-photo-32225192.jpeg?auto=compress&w=600",
                target: "_blank"
              },
              {
                href: "/kits",
                num: "03",
                Icon: Wrench,
                name: "Kit de tattoos",
                desc: "Kits completos para empezar o profesionalizar tu setup. Todo en un solo lugar.",
                img: "https://images.pexels.com/photos/10613958/pexels-photo-10613958.jpeg?auto=compress&w=600"
              },
            ].map((s) => (
              <Card
                key={s.href}
                className="group relative h-[500px] border-none overflow-hidden rounded-md cursor-pointer hover:-translate-y-4 transition-all duration-500 shadow-xl"
              >
                {/* Imagen de fondo */}
                <img
                  src={s.img}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-[2px] "
                />

                {/* Overlay para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />

                {/* Contenido */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#DD0081] transition-colors duration-500">
                      <s.Icon className="size-7 text-white" />
                    </div>
                    <Badge variant="outline" className="rounded-sm border-white/20 text-white font-['Bebas_Neue'] text-sm tracking-widest px-4 py-1.5">
                      {s.num}
                    </Badge>
                  </div>

                  <CardTitle className="hx text-4xl text-white tracking-wide mb-4">{s.name}</CardTitle>
                  <CardDescription className="text-base font-light text-gray-200 leading-relaxed mb-8">
                    {s.desc}
                  </CardDescription>

                  <Button
                    asChild

                    className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20  h-14 text-base transition-all duration-300"
                  >
                    <Link to={s.href} className="flex items-center justify-center" target={s.target}>
                      Ver detalles
                      <ArrowRight className="size-5 ml-2 transition-transform duration-500 group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="mx-4 h-px w-auto bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-[#F0EDE8]/10 md:mx-8" />

        <section
          ref={ref}
          className="hx-reveal mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24"
        >
          <div className="space-y-6">
            <p className="hx animate-float w-fit rounded-full bg-[#DD0081]/10 px-5 py-1.5 text-[12px] tracking-[0.25em] text-[#DD0081]">
              El estudio
            </p>
            <h2 className="hx text-[clamp(2.8rem,6vw,5rem)] leading-[0.9]">
              Mas que
              <br />
              un estudio
            </h2>
            <div className="rounded-md border border-black/10 bg-white/65 p-6 text-base leading-relaxed shadow-sm backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-[#111]/70 dark:text-[#e8e8e8]">
              <p>
                Creemos que cada tatuaje tiene una historia, una identidad y un
                significado unico. Nos apasiona el mundo del tattoo en todas sus
                formas, desde disenos oldschool hasta propuestas modernas y
                personalizadas.
              </p>
              <p className="mt-4">
                Con nosotros podés sentirte comodo/a. Venis a tatuarte, a compartir
                tus ideas, a charlar o simplemente a disfrutar de un buen momento.
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-[2rem] bg-[#DD0081]/40 blur-[60px] dark:bg-[#DD0081]/40" />
            <div className="relative aspect-[9/16] w-full max-w-[380px] overflow-hidden rounded-md border border-black/10 bg-white/70 shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#111]/70">
              <Badge className="absolute left-4 top-4 z-20 rounded-full border-none bg-black/40 px-4 py-1.5 text-white backdrop-blur-md">
                <Play className="mr-2 size-3 fill-[#DD0081] text-[#DD0081]" />
                Mas arte
              </Badge>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              >
                <source src="img/video (2).mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <section ref={ref} className="hx-reveal px-4 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {[
                { src: "img/1 (4).webp", cls: "col-span-2 row-span-2 aspect-square md:aspect-auto border-2 border-[#DD0081]" },
                { src: "img/1 (2).webp", cls: "aspect-[2/4]" },
                { src: "img/1 (3).webp", cls: "aspect-[2/4] border-2 border-[#DD0081]" },
                { src: "img/1 (1).webp", cls: "aspect-square" },
                { src: "img/1 (5).png", cls: "aspect-square" },
                { src: "img/1 (4).png", cls: "aspect-[6/3] col-span-2" },
                { src: "img/1 (7).webp", cls: "aspect-square border-2 border-[#DD0081]" },
                { src: "img/1 (6).webp", cls: "aspect-square" },
                { src: "img/1 (6).png", cls: "aspect-[4/5] border-2 border-[#DD0081]" },
                { src: "img/1 (3).png", cls: "aspect-[4/5]" },
                { src: "img/1 (10).webp", cls: "aspect-[5/3] col-span-2 border-2 border-[#DD0081]" },
              ].map((img, i) => (
                <div
                  key={i}
                  className={`hx-gallery-item relative overflow-hidden rounded-md ${img.cls} shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(221,0,129,0.15)] dark:shadow-lg`}
                >
                  <img
                    src={img.src}
                    alt={`Trabajo ${i + 1}`}
                    className="hx-img h-full w-full object-cover"
                  />
                  <div className="hx-pink-overlay" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator className="mx-4 h-px w-auto bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-[#F0EDE8]/10 md:mx-8" />

        <section
          ref={ref}
          className="hx-reveal mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center md:px-8 md:py-24"
        >
          <p className="hx animate-float mb-4 flex w-fit items-center gap-2 rounded-full bg-[#DD0081]/10 px-5 py-1.5 text-[12px] tracking-[0.25em] text-[#DD0081]">
            <MapPin className="size-3" />
            Nuestra casa
          </p>
          <h2 className="hx text-[clamp(2.8rem,6vw,5rem)] leading-[0.9]">
            Ubicacion
          </h2>
          <h4 className="mt-3 border-b border-[#DD0081] text-xl text-[#DD0081]">
            Oficina 106-A, Segundo Piso
          </h4>
          <p className="mt-3 max-w-lg text-base font-light text-slate-500 dark:text-[#888]">
            Te esperamos en el mítico Pasaje San Martin, en pleno corazon de la
            ciudad de Mendoza.
          </p>

          <div className="mt-10 w-full overflow-hidden rounded-md border border-black/10 bg-white/70 shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#111]/70">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.2931413272354!2d-68.84214088875244!3d-32.890416968940706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0910ba839445%3A0x91de337e035112cc!2sHexagonik%20Tatto%20y%20Est%C3%A9tica!5e0!3m2!1ses!2sar!4v1782515405624!5m2!1ses!2sar"
              className="h-[360px] w-full transition-all duration-700 hover:grayscale-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <Separator className="mx-4 h-px w-auto bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-[#F0EDE8]/10 md:mx-8" />

        <section
          ref={ref}
          className="hx-reveal mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-16 text-center md:px-8 md:py-24"
        >
          <Badge className="rounded-full border-none bg-[#DD0081]/10 px-6 py-2 text-[#DD0081]">
            Contactanos
          </Badge>
          <h2 className="hx text-[clamp(2.8rem,6vw,5.5rem)] leading-none">
            Encontranos
            <br />
            en las redes
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="outline"
                  className="h-16 rounded-md border-black/10 bg-white px-10 text-lg text-slate-800 transition-all duration-500 hover:-translate-y-1 hover:border-[#DD0081] hover:bg-[#DD0081] hover:text-white hover:shadow-[0_15px_30px_rgba(221,0,129,0.2)] dark:border-[#F0EDE8]/15 dark:bg-[#111] dark:text-[#F0EDE8] dark:hover:bg-[#DD0081]"
                >
                  <a href="https://instagram.com/hexagonik.tattoo.estetica/" target="_blank" rel="noreferrer">
                    <Images className="mr-3 size-6" />
                    Instagram
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-full border-none bg-[#1A1A1A] px-4 py-2 font-medium text-white dark:bg-[#F0EDE8] dark:text-black">
                Mirá nuestros Últimos trabajos
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="outline"
                  className="h-16 rounded-md border-black/10 bg-white px-10 text-lg text-slate-800 transition-all duration-500 hover:-translate-y-1 hover:border-[#DD0081] hover:bg-[#DD0081] hover:text-white hover:shadow-[0_15px_30px_rgba(221,0,129,0.2)] dark:border-[#F0EDE8]/15 dark:bg-[#111] dark:text-[#F0EDE8] dark:hover:bg-[#DD0081]"
                >
                  <a href="https://wa.me/2613861336" target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-3 size-6" />
                    WhatsApp
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-full border-none bg-[#1A1A1A] px-4 py-2 font-medium text-white dark:bg-[#F0EDE8] dark:text-black">
                Reserva tu turno
              </TooltipContent>
            </Tooltip>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-6 rounded-t-[3rem] border-t border-black/5 bg-slate-200 px-6 py-10 transition-colors duration-500 dark:border-[#F0EDE8]/05 dark:bg-[#050505] md:px-12">
          <span className="hx pl-4 text-3xl tracking-widest">
            <span className="text-[#DD0081]">HEXA</span>GONIK
          </span>
          <span className="rounded-full border border-black/5 bg-white px-6 py-3 text-sm tracking-wider text-slate-600 dark:border-[#F0EDE8]/05 dark:bg-[#111] dark:text-[#666]">
            © 2026 Hexagonik Tattoo Studio
          </span>
        </footer>
      </div>
    </TooltipProvider>
  )
}




