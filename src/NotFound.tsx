import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeftDash, Ghost } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <section className="flex flex-1 flex-col gap-4 p-4 items-center justify-center text-center">
           < Ghost style={{ width: 100, height: 100 }} />
            <div>
                <h1 className="text-5xl font-semibold">Pagina no encontrada</h1>
                <p className="text-muted-foreground text-xl mt-4 max-w-lg">
                    La pagina que estas buscando no existe o ha sido movida.
                    Por favor, verifica la URL y vuelve a intentarlo.
                </p>
                <Button className="mt-4 gap-2 text-3xl font-bold p-6 " 
                onClick={() => navigate("/")}> <ArrowBigLeftDash style={{ width: 30, height: 30 }} />Volver al inicio</Button>
            </div>
        </section>
    )
}