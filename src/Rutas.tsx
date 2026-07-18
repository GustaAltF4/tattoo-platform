import { Route, Routes } from "react-router-dom";
import App from "./App";
import Clases from "./Clases";
import Cursos from "./Cursos";
import CursosHome from "./CursosHome";
import Clase from "./ClaseIndividual";
import Login from "./Login";
import { ProtectedRoute } from "@/components/protectedRoute";
import Studio from "./Studio";
import { TableProf } from "./PanelProf";
import Insumos from "./Insumos";
import { Unauthorized, Unauthenticated } from "./Unauthorized";
import NotFound from "./NotFound";


export default function Rutas() {
  return (
    <Routes>
      <Route element={<App />}>
        {/* Publicas */}
        <Route path="/" element={<Studio />} />
        <Route path="/cursoshome" element={<CursosHome />} />
        <Route path="/kits" element={<Insumos />} />

        <Route path="/login" element={<Login />} />
        {/* /login: inicio de sesion con Supabase Auth. No deberia haber registro publico. */}
        {/* /contacto: formulario o WhatsApp para consultas. */}
        {/* /tattoo-studio: landing o informacion del estudio. */}

        {/* Alumno */}
        <Route element={<ProtectedRoute allowedRoles={["Alumno", "Prof"]} />}>
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/:cursoId/clases" element={<Clases />} />
          <Route path="/cursos/:cursoId/clases/:claseId" element={<Clase />} />
        </Route>
        {/* /cursos/:cursoId/clases/:claseId: reproductor de video, contenido, PDF y entrega si aplica. */}
        {/* /cursos/:cursoId/clases/:claseId/entrega: formulario para enviar practica por email. */}

        {/* Profesor */}

        <Route element={<ProtectedRoute allowedRoles={["Prof"]} />}>
          <Route path="/panelProf" element={<TableProf />} />
        </Route>
        {/* /profesor: panel para ver practicas pendientes de correccion. */}
        {/* /profesor/alumnos/:alumnoId: seguimiento del progreso de un alumno. */}
        {/* /profesor/correcciones/:progresoId/aprobar: accion para aprobar una practica. */}
        {/* /profesor/correcciones/:progresoId/reentregar: accion para pedir reentrega. */}

        {/* Sistema */}
        {/* /unauthorized: pantalla para usuarios sin permiso para una seccion. */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/Unauthenticated" element={<Unauthenticated />} />

       
        <Route path="*" element={<NotFound />} />
      </Route>
      
    </Routes>
  );
}
