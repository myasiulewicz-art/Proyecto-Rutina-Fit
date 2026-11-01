# Rutina Fit

App web de entrenamiento para mujeres, construida a partir de las 23 pantallas del diseño de Figma (402 x 874).
HTML, CSS y JavaScript puros: no hay que instalar nada.

Flujo: bienvenida, iniciar sesión, registro, cuenta creada, tus datos (peso, objetivo, fecha de inicio),
días por semana, armar rutina por día, agregar y configurar ejercicios, rutina lista, ciclo,
mis ejercicios, perfil, menú y cierre de sesión.

## Estructura

```
index.html
manifest.webmanifest
css/styles.css
js/app.js
img/            logos (claro, oscuro, completo) e íconos
```

## Publicar en GitHub Pages

1. Subí el CONTENIDO de la carpeta (no la carpeta en sí) a la raíz del repositorio.
   `index.html` tiene que quedar en la raíz. Si ya había archivos con el mismo nombre, reemplazalos.
2. Settings > Pages > Deploy from a branch > main > / (root).
3. Esperá uno o dos minutos y abrí `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Tipografía

Montserrat (500, 600, 700, 800 y cursivas 700 y 800) se carga desde Google Fonts, por lo que necesita internet.
Para usarla sin conexión, descargá los archivos desde fonts.google.com y declaralos con `@font-face` en `css/styles.css`.

## Colores

`#370184` oscuro, `#8941ee` violeta, `#fd34ac` rosa, `#fc8454` naranja, `#ffffff` blanco.
Están al inicio de `css/styles.css`.

## Importante

Los datos (cuentas, rutina, ciclo) se guardan solo en el navegador de cada persona (`localStorage`).
Es un prototipo funcional. Para una app real con cuentas en la nube hay que conectar una base de datos
(por ejemplo Supabase, con el esquema que armamos antes).
