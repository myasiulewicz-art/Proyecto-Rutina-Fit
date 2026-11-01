# Rutina Fit

Aplicación web de entrenamiento pensada para mujeres. Permite armar una rutina semanal de 1 a 7 días, cargar los ejercicios de cada día, hacer el seguimiento de lo entrenado y registrar los días del ciclo menstrual.

**Autora:** Milagros Yasiulewicz

**Ver la aplicación:** https://myasiulewicz-art.github.io/Proyecto-Rutina-Fit/

> Pensada para verse en el celular. En la computadora se muestra centrada, con el mismo formato.

---

## Qué hace la app

- **Crear una cuenta e iniciar sesión**, con avisos claros cuando algo no coincide. Las cuentas se guardan en la nube, así que se puede entrar desde cualquier dispositivo.
- **Completar los datos personales**: peso, objetivo (tonificar, bajar de peso, ganar fuerza, entre otros) y fecha de inicio en un calendario.
- **Elegir cuántos días entrenar por semana**, de 1 a 7, o marcar cada día de la lista.
- **Armar la rutina día por día**: ver los ejercicios cargados, agregar nuevos desde un catálogo con buscador y filtros por grupo muscular, y configurar series, repeticiones y descanso.
- **Marcar los ejercicios hechos** y ver el progreso del día.
- **Registrar el ciclo** tocando en un calendario los días del período.
- **Ver y editar el perfil**, y cerrar sesión desde el menú.

## Recorrido de pantallas

El diseño se hizo en Figma (iPhone, 402 x 874 px) y la aplicación respeta las 23 pantallas.

| Etapa | Pantallas |
|---|---|
| Ingreso | Bienvenida, Iniciar sesión, Iniciar sesión con error, Registro, Cuenta creada |
| Tus datos | Tus datos, Objetivo, Fecha de inicio |
| Tu rutina | Días por semana, Armar rutina, Ejercicios del día (lunes, miércoles, viernes y sábado), Agregar ejercicio, Configurar ejercicio, Rutina lista |
| Uso diario | Mis ejercicios, Mi ciclo, Ciclo marcado, Perfil |
| Menú | Menú y confirmación de cierre de sesión |

## Identidad visual

**Tipografía:** Montserrat, en sus pesos Medium, Bold y ExtraBold (con cursiva en los títulos).

**Paleta de colores**

| Color | Código | Uso |
|---|---|---|
| Violeta oscuro | `#370184` | Textos, fondos de contraste y botones principales |
| Violeta | `#8941ee` | Botones, selecciones y elementos activos |
| Rosa | `#fd34ac` | Ciclo, avisos de error y barras de avance |
| Naranja | `#fc8454` | Detalles y cierre de sesión |
| Blanco | `#ffffff` | Fondos |

El logotipo tiene tres versiones: completa con la figura (pantalla de bienvenida) y dos solo de texto (violeta claro en la cabecera y violeta oscuro).

## Cómo está hecha

Está programada con HTML, CSS y JavaScript. Para las cuentas y la base de datos usa **Supabase** (PostgreSQL), a través de su librería oficial `supabase-js`, que se carga desde internet. No hay nada que instalar.

```
index.html          estructura de la página
css/styles.css      estilos del diseño
js/app.js           pantallas, funcionamiento y conexión con Supabase
img/                logotipos e íconos
base-de-datos/      script SQL con las tablas y las reglas de seguridad
manifest.webmanifest
BASE-DE-DATOS.md    explicación de la base de datos
```

Se publica con GitHub Pages.

## Base de datos

La base está en Supabase y tiene 6 tablas: `perfiles`, `ejercicios`, `dias_rutina`, `dia_ejercicios`, `ciclo` y `ejercicios_hechos`. Cada usuaria solo puede ver y modificar sus propios datos (reglas de seguridad por fila, *Row Level Security*).

- Explicación de cada tabla y cómo se relacionan: [BASE-DE-DATOS.md](BASE-DE-DATOS.md)
- Script para crearla: [base-de-datos/rutina-fit-supabase.sql](base-de-datos/rutina-fit-supabase.sql)

La clave que aparece en `js/app.js` es la clave *publishable* de Supabase, que es pública por diseño. Lo que protege los datos son las reglas de seguridad de la base, no esa clave.

## Alcance de esta versión

Las cuentas, el perfil, la rutina, el ciclo y los ejercicios hechos se guardan en la nube y se recuperan al iniciar sesión desde cualquier dispositivo.

Pendiente para una próxima versión: recuperar la contraseña desde la app y confirmar el correo electrónico al registrarse.
