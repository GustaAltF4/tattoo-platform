# Guia del proyecto para Codex

Este archivo guarda el contexto principal del proyecto para que futuros chats de Codex entiendan que se esta construyendo, que decisiones ya estan tomadas y que cosas no forman parte del MVP inicial.

## Proyecto

Plataforma web e-learning para cursos online de Tattoo y Piercing.

El objetivo no es crear una plataforma grande tipo Udemy, Hotmart o marketplace de cursos. El objetivo es digitalizar el proceso actual de ensenanza de una unica profesora, con una herramienta propia, simple y enfocada.

La plataforma debe permitir:

- Gestionar alumnos.
- Gestionar cursos.
- Gestionar clases.
- Mostrar contenido teorico.
- Mostrar videos embebidos desde YouTube.
- Ofrecer PDFs descargables desde Supabase Storage.
- Controlar el progreso de cada alumno.
- Bloquear o desbloquear clases segun el avance.
- Permitir que alumnos envien practicas.
- Permitir que la profesora apruebe o pida reentrega.

## Tecnologias

Frontend:

- React.
- Tailwind CSS.
- Shadcn/UI.
- React Router.

Backend:

- Supabase.
- Supabase Authentication.
- Supabase PostgreSQL.
- Supabase Storage.
- Supabase Edge Functions solo si hacen falta mas adelante.

## Modelo de negocio

- Hay una unica profesora.
- Los alumnos pagan el curso por fuera de la plataforma.
- No hay pagos dentro de la plataforma.
- No hay registro publico.
- La inscripcion de alumnos es manual.
- Un administrador crea usuarios en Supabase.
- Un administrador inscribe alumnos en cursos.

Cursos iniciales:

- Curso Profesional de Tattoo.
- Curso Profesional de Piercing.

## Roles

La autenticacion se maneja con Supabase Auth.

Ademas de Supabase Auth, el proyecto usa una tabla propia llamada `usuarios` para guardar datos adicionales y roles.

Roles disponibles:

- `profesor`
- `alumno`

### Admin

El administrador puede:

- Crear alumnos.
- Gestionar usuarios.
- Inscribir alumnos en cursos.
- Crear cursos.
- Editar cursos.
- Publicar u ocultar cursos.
- Crear clases.
- Ordenar clases.
- Cargar enlaces de YouTube.
- Cargar rutas de PDFs alojados en Supabase Storage.

### Profesor

La profesora puede:

- Revisar entregas.
- Aprobar practicas.
- Solicitar reentrega.
- Ver el progreso de alumnos.

### Alumno

El alumno puede:

- Iniciar sesion.
- Ver sus cursos inscriptos.
- Acceder a clases desbloqueadas.
- Ver contenido de clase.
- Ver videos embebidos.
- Descargar PDFs.
- Enviar trabajos practicos cuando una clase lo requiera.

## Base de datos

### Tabla `usuarios`

Representa informacion adicional de usuarios autenticados.

Campos:

- `id`
- `nombre_completo`
- `rol`

Notas:

- `id` deberia relacionarse con el usuario de Supabase Auth.
- El rol define permisos dentro de la app.

### Tabla `cursos`

Representa cada curso disponible.

Campos:

- `id`
- `titulo`
- `descripcion`
- `img_portada_url`
- `publicado`

Ejemplos:

- Curso Profesional de Tattoo.
- Curso Profesional de Piercing.

### Tabla `clases`

Representa cada leccion o clase perteneciente a un curso.

Campos:

- `id`
- `curso_id`
- `titulo`
- `descripcion`
- `contenido`
- `pdf_url`
- `youtube_url`
- `numero_orden`
- `requiere_entrega`

Caracteristicas:

- Cada curso tendra aproximadamente entre 7 y 12 clases.
- Las clases se muestran ordenadas por `numero_orden`.
- Algunas clases son teoricas.
- Algunas clases requieren practica para avanzar.

### Tabla `inscripciones`

Relaciona alumnos con cursos.

Campos:

- `id`
- `alumno_id`
- `curso_id`
- `activo`
- `fecha_inscripcion`

Notas:

- Un alumno puede estar inscripto en uno o mas cursos.
- Si `activo` es falso, el alumno no deberia poder acceder al curso.

### Tabla `progreso_clases`

Controla el avance del alumno dentro del curso.

Campos:

- `id`
- `alumno_id`
- `clase_id`
- `estado`
- `fecha_actualizacion`

Estados posibles:

- `pendiente`
- `aprobada`
- `reentregar`

Esta tabla determina que clases estan desbloqueadas para cada alumno.

## Gestion de contenido

### Texto

El contenido principal de cada clase se guarda en la columna `contenido`.

Inicialmente se planea usar texto enriquecido o Markdown.

### PDFs

Los materiales descargables se guardan en Supabase Storage.

La base de datos no guarda el archivo, solo la ruta.

Ejemplo:

```txt
materiales/bioseguridad.pdf
```

### Videos

Los videos estan alojados en YouTube.

La tabla `clases` guarda el enlace en `youtube_url`.

La app muestra videos embebidos mediante `iframe`.

## Flujo de aprendizaje

### Acceso al curso

1. El administrador crea la cuenta del alumno.
2. El administrador inscribe al alumno en un curso.
3. El alumno inicia sesion.
4. El alumno accede al contenido disponible.

### Clases teoricas

El alumno puede avanzar libremente entre clases teoricas, siempre que esten desbloqueadas por el flujo del curso.

### Clases practicas

Cuando una clase requiere practica:

1. El alumno realiza el ejercicio.
2. El alumno envia la practica desde la plataforma.
3. La plataforma envia un correo electronico a la profesora.
4. El correo incluye:
   - Nombre del alumno.
   - Clase correspondiente.
   - Imagen o archivo adjunto.
   - Enlaces para aprobar o solicitar reentrega.

## Gestion de entregas en V1

En la V1 no existe una tabla `entregas`.

La plataforma no almacena trabajos practicos en la base de datos.

Las entregas se gestionan unicamente mediante correo electronico.

El sistema solo almacena el resultado de la correccion en `progreso_clases`.

### Correccion

La profesora recibe un correo y puede elegir:

- Aprobar.
- Solicitar reentrega.

Luego el sistema actualiza el estado correspondiente en `progreso_clases`.

## Desbloqueo de clases

El acceso se controla mediante los estados de `progreso_clases`.

Ejemplo:

- Clase 1: `aprobada`.
- Resultado: Clase 2 desbloqueada.

Si una practica queda en estado:

- `pendiente`
- `reentregar`

Entonces la siguiente clase permanece bloqueada.

## Rutas sugeridas

Estas rutas son una guia para el desarrollo. No todas tienen que existir desde el primer momento.

Publicas:

- `/`
- `/login`

Alumno:

- `/mis-cursos`
- `/cursos`
- `/cursos/:cursoId`
- `/cursos/:cursoId/clases/:claseId`
- `/cursos/:cursoId/clases/:claseId/entrega`

Profesor:

- `/profesor`
- `/profesor/alumnos/:alumnoId`
- `/profesor/correcciones/:progresoId/aprobar`
- `/profesor/correcciones/:progresoId/reentregar`

Admin:

- `/admin`
- `/admin/alumnos`
- `/admin/cursos`
- `/admin/cursos/:cursoId/clases`
- `/admin/inscripciones`
- `/admin/materiales`

Sistema:

- `/unauthorized`
- `/recuperar-acceso`

## Futuras mejoras fuera del MVP

No incluir estas funcionalidades en la V1 salvo que el usuario lo pida explicitamente:

- Tabla de entregas.
- Historial completo de correcciones.
- Comentarios del profesor.
- Certificados.
- Notificaciones internas.
- Mensajeria.
- Pagos online.
- Multi-profesor.
- Multi-academia.
- SaaS real.

## Criterios de desarrollo

- Priorizar una app simple, clara y util para una unica profesora.
- No sobredisenar como si fuera una plataforma masiva.
- Mantener flujos manuales cuando el modelo de negocio lo indique.
- No agregar registro publico.
- No agregar pagos internos.
- No crear una tabla `entregas` en la V1.
- Mantener el control de avance en `progreso_clases`.
- Usar Supabase Auth para autenticacion.
- Usar la tabla `usuarios` para roles y datos adicionales.
- Usar Supabase Storage para PDFs.
- Usar YouTube para videos.

## Estetica de la app

- Botones outline
- color por defecto de decoraciones #DD0081
