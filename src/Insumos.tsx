import {  MonitorCog } from "lucide-react";

export default function Insumos() {
    return (
        <section className="flex flex-1 flex-col gap-4 p-4 md:p-6 items-center justify-center text-center">
            <MonitorCog style={{ width: 100, height: 100 }} className="text-[#DD0081]"/>
            <div>
                <p className="text-sm text-muted-foreground">Hexagonik</p>
                <h1 className="text-5xl font-semibold">Kits de Tattoo</h1>
                <h2 className="text-2xl font-semibold text-[#DD0081]">Proximamente</h2>
                
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    En esta sección podrás encontrar todos los insumos necesarios para tus clases y proyectos. Estamos trabajando para ofrecerte la mejor experiencia posible.
                </p>
                <a href="https://docs.google.com/spreadsheets/d/1j5Si4TgRMVpTDGWbwlSMX41CEtHxZhl--wKsAOIygh8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" 
                className="text-[#DD0081]  hover:underline text-[#DD0081]/80 transition-colors duration-200 underline-offset-4">
                    Por el momento, puedes acceder a la lista de insumos haciendo click aqui.
                </a>
            </div>
            
        </section>
    )
}