import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Images, MessageCircle, ArrowRight, GraduationCap, Package, Wrench, Play, MapPin } from "lucide-react"

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
            { threshold: 0.1 }
        )
        revealRefs.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const ref = (el: HTMLElement | null) => {
        if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
    }

    return (
        <TooltipProvider>
            <div className="bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-[#F0EDE8] overflow-x-hidden selection:bg-[#DD0081] selection:text-white transition-colors duration-500">
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                    .hx { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
                    .hx-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
                    .hx-visible { opacity: 1 !important; transform: translateY(0) !important; }
                    .hx-img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s; filter: grayscale(20%); }
                    .hx-gallery-item:hover .hx-img { transform: scale(1.08); filter: grayscale(0%); }
                    .hx-pink-overlay { position:absolute; inset:0; background:#DD0081; opacity:0; transition:opacity 0.4s; border-radius:inherit; }
                    .hx-gallery-item:hover .hx-pink-overlay { opacity: 0.25; }
                    
                    /* Animaciones Custom */
                    @keyframes hxUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
                    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0px); } }
                    
                    .a1 { animation: hxUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
                    .a2 { animation: hxUp 0.7s 0.25s cubic-bezier(0.22,1,0.36,1) both; }
                    .a3 { animation: hxUp 0.7s 0.4s cubic-bezier(0.22,1,0.36,1) both; }
                    .a4 { animation: hxUp 0.7s 0.55s cubic-bezier(0.22,1,0.36,1) both; }
                    .animate-float { animation: float 5s ease-in-out infinite; }
                    .animate-float-delayed { animation: float 5s ease-in-out 2.5s infinite; }
                `}</style>

                {/* ── Hero con imagen estática ── */}
                <section className="relative md:h-screen min-h-[500px] md:min-h-[600px] flex items-end overflow-hidden rounded-b-[3rem] md:rounded-b-[4rem] shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-500">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="img/2.png"
                            alt="Hexagonik Tattoo Studio"
                            className="w-full h-100 md:h-full object-cover opacity-90 dark:opacity-70 "
                        />
                       

                    </div>
                    <div className="relative z-10 px-6 md:mb-0 md:px-12  md:pb-9 w-full">
                        <Badge className="a1 mb-6 bg-[#DD0081]/5 dark:bg-[#DD0081]/10 text-primary border-4 border-[#DD0081]/20 dark:border-[#DD0081]/30 rounded-full hover:bg-[#DD0081]/20 dark:hover:bg-[#DD0081]/30 px-5 py-2 shadow-sm dark:shadow-lg backdrop-blur-sm transition-all duration-300">
                            Mendoza · Tattoo Studio
                        </Badge>
                        <h1 className="hx a2 text-[clamp(4.5rem,14vw,11rem)] leading-[0.85] text-[#1A1A1A] dark:text-[#F0EDE8] drop-shadow-md dark:drop-shadow-2xl transition-colors duration-500">
                            <span className="text-[#DD0081]">HEXA</span>GONIK
                        </h1>
                        <p className="a3 text-base md:text-lg font-light text-slate-600 dark:text-[#ccc] mt-2 max-w-md leading-relaxed transition-colors duration-500">
                            Donde tus ideas se convierten en obras de arte que llevás para siempre.
                        </p>
                        <div className="a4 flex gap-4 mt-8 flex-wrap">
                            <Button
                                asChild
                                className="rounded-lg bg-[#DD0081] hover:bg-[#c40073] text-white dark:text-white px-8 h-14 text-base shadow-md dark:shadow-[0_0_20px_rgba(221,0,129,0.3)] hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(221,0,129,0.6)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <a href="#servicios">Ver servicios</a>
                            </Button>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="rounded-lg border-black/10 dark:border-[#F0EDE8]/20 text-slate-800 dark:text-[#F0EDE8] bg-white/50 dark:bg-black/30 backdrop-blur-md hover:bg-[#DD0081]/10 hover:border-[#DD0081] hover:text-[#DD0081] px-8 h-14 text-base hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <a href="https://wa.me/2613861336?text=Hola,%20quisiera%20pedir%20un%20turno" target="_blank" rel="noreferrer">
                                            <MessageCircle className="size-5 mr-2" />
                                            Reserva tu turno
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="rounded-lg bg-[#DD0081] text-white border-none px-5 py-2 shadow-xl">
                                    <p>Contactanos por WhatsApp</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </section>



                     {/* ── Servicios ── */}
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
                                className="group relative h-[500px] border-none overflow-hidden rounded-[1rem] cursor-pointer hover:-translate-y-4 transition-all duration-500 shadow-xl"
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
                <Separator className="bg-gradient-to-r from-transparent via-black/10 dark:via-[#F0EDE8]/10 to-transparent mx-6 md:mx-12 w-auto h-[1px]" />


                {/* ── Sobre el estudio & Video Vertical ── */}
                <section ref={ref} className="hx-reveal px-6 py-24 md:px-12 md:py-32 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Texto */}
                        <div className="flex-1 space-y-8">
                            <div>
                                <p className="hx text-[12px] tracking-[0.25em] text-[#DD0081] mb-4 bg-[#DD0081]/10 w-fit px-5 py-1.5 rounded-full inline-block animate-float">El estudio</p>
                                <h2 className="hx text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] text-[#1A1A1A] dark:text-[#F0EDE8] transition-colors duration-500">
                                    Más que<br />un estudio
                                </h2>
                            </div>
                            <div className="space-y-5 text-base font-light text-slate-600 dark:text-[#888] leading-relaxed bg-white dark:bg-[#111] p-10 rounded-[1rem] border border-black/5 dark:border-[#F0EDE8]/05 shadow-xl dark:shadow-2xl hover:border-[#DD0081]/20 transition-all duration-500">
                                <p>
                                    Creemos que cada tatuaje tiene una historia, una identidad y un significado único.
                                    Nos apasiona el mundo del tattoo en todas sus formas — desde diseños oldschool hasta
                                    propuestas modernas y personalizadas.
                                </p>
                                <p>
                                    Con nosotros podés sentirte cómodo/a. Venís a tatuarte,
                                    a compartir tus ideas, a charlar, o simplemente a disfrutar de un buen momento.
                                </p>
                            </div>
                        </div>

                        {/* Video Vertical */}
                        <div className="flex-1 w-full flex justify-center lg:justify-end relative group">
                            <div className="absolute inset-0 bg-[#DD0081]/10 dark:bg-[#DD0081]/20 blur-[60px] rounded-[4rem] group-hover:bg-[#DD0081]/20 dark:group-hover:bg-[#DD0081]/30 transition-colors duration-700" />
                            <div className="relative w-full max-w-sm aspect-[9/16] overflow-hidden rounded-[1rem] border-2 border-white dark:border-[#F0EDE8]/10 shadow-2xl animate-float-delayed group-hover:-translate-y-4 transition-transform duration-700">
                                <Badge className="absolute top-4 left-4 z-20 bg-black/40 dark:bg-black/50 backdrop-blur-md text-white border-none rounded-full px-4 py-1.5 flex items-center gap-2">
                                    <Play className="size-3 fill-[#DD0081] text-[#DD0081]" />
                                    Más arte
                                </Badge>
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                >
                                    <source src="img/video (2).mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Galería ── */}
                <section ref={ref} className="hx-reveal px-4 md:px-8 pb-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                        {[
                            { src: "img/1 (4).webp", cls: "col-span-2 row-span-2 aspect-square md:aspect-auto border-2 border-[#DD0081]" },
                            { src: "img/1 (2).webp", cls: "aspect-[2/4]" },
                            { src: "img/1 (3).webp", cls: "aspect-[2/4] border-2 border-[#DD0081]" },
                            { src: "img/1 (1).webp", cls: "aspect-square" },
                            { src: "img/1 (5).png", cls: "aspect-square" },
                            { src: "img/1 (4).png", cls: "aspect-[6/3] col-span-2" },
                            { src: "img/1 (7).webp", cls: "aspect-square border-2 border-[#DD0081]" },
                            { src: "img/1 (6).webp", cls: "aspect-square" },
                            { src: "img/1 (6).png", cls: "aspect-[4/5] border-2 border-[#DD0081] " },
                            { src: "img/1 (3).png", cls: "aspect-[4/5]" },
                            { src: "img/1 (10).webp", cls: "aspect-[5/3] col-span-2 border-2 border-[#DD0081]" },
                        ].map((img, i) => (
                            <div key={i} className={`hx-gallery-item relative overflow-hidden rounded-[1rem] ${img.cls} shadow-md dark:shadow-lg hover:shadow-[0_10px_30px_rgba(221,0,129,0.15)] hover:-translate-y-2 transition-all duration-500`}>
                                <img src={img.src} alt={`Trabajo ${i + 1}`} className="hx-img w-full h-full object-cover" />
                                <div className="hx-pink-overlay" />
                            </div>
                        ))}
                    </div>
                </section>

                <Separator className="bg-gradient-to-r from-transparent via-black/10 dark:via-[#F0EDE8]/10 to-transparent mx-6 md:mx-12 w-auto h-[1px]" />

           
                {/* ── Ubicación (Google Maps) ── */}
                <section ref={ref} className="hx-reveal px-6 py-24 md:px-12 md:py-32 max-w-7xl mx-auto flex flex-col items-center">
                    <div className="text-center mb-12 flex flex-col items-center">
                        <p className="hx text-[12px] tracking-[0.25em] text-[#DD0081] mb-4 bg-[#DD0081]/10 w-fit px-5 py-1.5 rounded-full flex items-center gap-2 animate-float">
                            <MapPin className="size-3" />
                            Nuestra casa
                        </p>
                        <h2 className="hx text-[clamp(3rem,6vw,5.5rem)] leading-[0.9]  mb-2 ">
                            Ubicación
                        </h2>
                        <h4 className="text-xl mb-2  transition-colors text-[#dd0081] duration-500 border-b border-[#dd0081]">
                            Oficina 106-A, Segundo Piso</h4>
                        <p className="text-base font-light text-slate-500 dark:text-[#888] max-w-lg transition-colors duration-500">
                            Te esperamos en el mítico Pasaje San Martín, en pleno corazón de la ciudad de Mendoza.
                        </p>
                    </div>

                    <div className="w-full relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#DD0081]/0 via-[#DD0081]/10 dark:via-[#DD0081]/20 to-[#DD0081]/0 rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative w-full h-[400px] md:h-[300px] rounded-[1rem] overflow-hidden border border-black/10 dark:border-[#F0EDE8]/10 shadow-xl dark:shadow-2xl bg-white dark:bg-[#111]">
                            <iframe

                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.2931413272354!2d-68.84214088875244!3d-32.890416968940706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0910ba839445%3A0x91de337e035112cc!2sHexagonik%20Tatto%20y%20Est%C3%A9tica!5e0!3m2!1ses!2sar!4v1782515405624!5m2!1ses!2sar"
                                className="w-full h-full filter grayscale opacity-70 dark:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>

                <Separator className="bg-gradient-to-r from-transparent via-black/10 dark:via-[#F0EDE8]/10 to-transparent mx-6 md:mx-12 w-auto h-[1px]" />

                {/* ── Redes ── */}
                <section ref={ref} className="hx-reveal px-6 py-28 md:px-12 flex flex-col items-center text-center gap-10 bg-gradient-to-b from-transparent to-slate-100 dark:to-[#0a0a0a] mt-10 transition-colors duration-500">
                    <Badge className="bg-[#DD0081]/10 text-[#DD0081] border-none rounded-full px-6 py-2 hx text-base tracking-[0.25em] animate-float">
                        Contactanos
                    </Badge>
                    <h2 className="hx text-[clamp(3rem,6vw,6rem)] leading-none text-[#1A1A1A] dark:text-[#F0EDE8] transition-colors duration-500">
                        Encontranos<br />en las redes
                    </h2>
                    <div className="flex gap-4 flex-wrap justify-center mt-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full border-black/10 dark:border-[#F0EDE8]/15 text-slate-800 dark:text-[#F0EDE8] bg-white dark:bg-[#111] hover:bg-[#DD0081] dark:hover:bg-[#DD0081] hover:border-[#DD0081] hover:text-white px-10 h-16 text-lg hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(221,0,129,0.2)] transition-all duration-500"
                                >
                                    <a href="https://instagram.com/hexagonik.tattoo.estetica/" target="_blank" rel="noreferrer">
                                        <Images className="size-6 mr-3" />
                                        Instagram
                                    </a>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="rounded-full bg-[#1A1A1A] text-white dark:bg-[#F0EDE8] dark:text-black border-none px-4 py-2 font-medium">
                                Mirá nuestros últimos trabajos
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full border-black/10 dark:border-[#F0EDE8]/15 text-slate-800 dark:text-[#F0EDE8] bg-white dark:bg-[#111] hover:bg-[#DD0081] dark:hover:bg-[#DD0081] hover:border-[#DD0081] hover:text-white px-10 h-16 text-lg hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(221,0,129,0.2)] transition-all duration-500"
                                >
                                    <a href="https://wa.me/2613861336" target="_blank" rel="noreferrer">

                                        <MessageCircle className="size-6 mr-3" />
                                        WhatsApp
                                    </a>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="rounded-full bg-[#1A1A1A] text-white dark:bg-[#F0EDE8] dark:text-black border-none px-4 py-2 font-medium">
                                Reservá tu turno
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </section>

                {/* ── Footer ── */}
                <footer className="px-6 py-10 md:px-12 flex justify-between items-center bg-slate-200 dark:bg-[#050505] flex-wrap gap-6 rounded-t-[3rem] border-t border-black/5 dark:border-[#F0EDE8]/05 transition-colors duration-500">
                    <span className="hx text-3xl tracking-widest pl-4 text-[#1A1A1A] dark:text-[#F0EDE8] transition-colors duration-500">
                        <span className="text-[#DD0081]">HEXA</span>GONIK
                    </span>
                    <span className="text-sm text-slate-600 dark:text-[#666] tracking-wider bg-white dark:bg-[#111] px-6 py-3 rounded-full border border-black/5 dark:border-[#F0EDE8]/05 transition-colors duration-500">
                        © 2026 Hexagonik Tattoo Studio
                    </span>
                </footer>
            </div>
        </TooltipProvider>
    )
}