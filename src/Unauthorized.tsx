import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeftDash, ShieldX, ScanFace,UserRoundKey } from "lucide-react";



export  function Unauthorized() {
   
    const navigate = useNavigate();
    return (
        <section className="flex flex-1 flex-col gap-4 p-4 items-center justify-center text-center">
           < ShieldX style={{ width: 100, height: 100 }} />
            <div>
                <h1 className="text-5xl font-semibold">Acceso Denegado</h1>
                <p className="text-muted-foreground text-xl mt-4 max-w-lg">
                    No tienes permiso para acceder a esta pagina.
                    Por favor, verifica tus credenciales y vuelve a intentarlo.
                </p>
                <Button className="mt-4 gap-2 text-3xl font-bold p-6 " 
                onClick={() => navigate("/")}> <ArrowBigLeftDash style={{ width: 30, height: 30 }} />Volver a Inicio</Button>
            </div>
        </section>
    )
}


export  function Unauthenticated() {
    const navigate = useNavigate();
    return (
        <section className="flex flex-1 flex-col gap-4 p-4 items-center justify-center text-center">
           < UserRoundKey style={{ width: 100, height: 100 }} />
            <div>
                <h1 className="text-5xl font-semibold">Acceso Denegado</h1>
                <p className="text-muted-foreground text-xl mt-4 max-w-lg">
                    No estas autenticado para acceder a esta pagina.
                    Por favor, inicia sesion y vuelve a intentarlo.
                </p>
                <Button className="mt-4 gap-2 text-3xl font-bold p-6 " 
                onClick={() => navigate("/login")}> <ScanFace style={{ width: 30, height: 30 }} />Iniciar Sesion</Button>
            </div>
        </section>
    )
}