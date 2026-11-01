# RUTINA FIT:
Aplicación web de entrenamiento pensada para mujeres. Permite armar una rutina semanal de 1 a 7 días, cargar los ejercicios de cada día, hacer el seguimiento de lo entrenado y registrar los días del ciclo menstrual. Pensada únicamente para usarla desde el celular.

**Autora:** Milagros Yasiulewicz

**Materia:** Desarrollo de Aplicaciones Web

**Ver la aplicación:** https://myasiulewicz-art.github.io/NOMBRE-DEL-REPOSITORIO/

## QUÉ HACE LA APP:

**Crear una cuenta e iniciar sesión**, con avisos claros cuando algo no coincide (por ejemplo, una contraseña incorrecta).
**Completar los datos personales**: peso, objetivo (tonificar, bajar de peso, ganar fuerza, entre otros) y fecha de inicio en un calendario.
**Elegir cuántos días entrenar por semana**, de 1 a 7, o marcar cada día de la lista.
**Armar la rutina día por día**: ver los ejercicios cargados, agregar nuevos desde un catálogo con buscador y filtros por grupo muscular, y configurar series, repeticiones y descanso.
**Marcar los ejercicios hechos** y ver el progreso del día.
**Registrar el ciclo** tocando en un calendario los días del período del mes corriente.
**Ver y editar el perfil** y cerrar sesión desde el menú.

## RECORRIDO DE LAS PANTALLAS:
El diseño se hizo en Figma (iPhone 17, 402 x 874 px) y la aplicación contiene 23 pantallas.

**Etapa y Pantallas:**
- Ingreso => Bienvenida, Iniciar sesión, Iniciar sesión con error, Registro, Cuenta creada
- Tus datos => Tus datos, Objetivo, Fecha de inicio
- Tu rutina => Días por semana, Armar rutina, Ejercicios de los días elegidos para entrenar, Agregar ejercicio, Configurar ejercicio, Rutina lista
- Uso diario => Mis ejercicios, Mi ciclo, Ciclo marcado, Perfil 
- Menú => Menú y confirmación de cierre de sesión 

## IDENTIDAD VISUAL:

**Tipografía:** Montserrat, en sus pesos Medium, Bold y ExtraBold (con cursiva en los títulos).

**Paleta de colores**
Color, Código, Uso:

- Violeta oscuro => #370184 => Textos, fondos de contraste y botones principales
- Violeta => #8941ee => Botones, selecciones y elementos activos 
- Rosa => #fd34ac => Ciclo, avisos de error y barras de avance 
- Naranja => #fc8454 => Detalles y cierre de sesión 
- Blanco => #ffffff => Fondos 

El logotipo tiene tres versiones: completa con la figura (pantalla de bienvenida) y dos solo de texto (violeta claro y violeta oscuro).

## CÓMO ESTÁ HECHA:
Está programada con HTML, CSS y JavaScript, sin librerías externas ni instalación.

index.html => estructura de la página
css/styles.css => estilos del diseño
js/app.js => pantallas y funcionamiento
img/ => logotipos e íconos
manifest.webmanifest

Se publica con GitHub Pages.

## ALCANCE DE ESTA VERSIÓN:
Es un prototipo funcional. Las cuentas, la rutina y los datos del ciclo se guardan **solo en el navegador del dispositivo** donde se usa la aplicación. No se envían a ningún servidor, y al borrar los datos del navegador se pierden.

Próximo paso: conectar una base de datos en la nube para que la cuenta y la rutina estén disponibles desde cualquier dispositivo, con protección de los datos del ciclo. El esquema de tablas ya está definido (usuarias, ejercicios, planes, días del plan, ejercicios de cada día y ciclo).
