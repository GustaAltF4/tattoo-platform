import { CardCursos } from "@/components/cardCursos";
import { GraduationCap } from "lucide-react";

export default function Cursos() {
  return (
    <section className="flex flex-1 flex-col gap-8 p-4 md:p-8">
      <header className="rounded-lg border bg-card  p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#DD0081] hidden md:flex">
            <GraduationCap className="h-7 w-7 " />
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Academia
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#DD0081]">
              Cursos 
            </h1>

            <p className="mt-2 text-muted-foreground">
              Explora todos los cursos disponibles y continúa desarrollando tus
              habilidades.
            </p>
          </div>
        </div>
      </header>

      <div>
        <CardCursos />
      </div>
    </section>
  );
}