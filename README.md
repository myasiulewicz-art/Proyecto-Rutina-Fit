# Rutina Fit 💜

App web de entrenamiento para mujeres: plan de 1 a 7 días por semana, catálogo de ejercicios, entrenamiento con descansos, calendario de ciclo, perfil y progreso.

Hecha con HTML, CSS y JavaScript puros (sin instalar nada). Los datos se guardan en el navegador de cada persona (`localStorage`), no hay servidor.

## Estructura

```
rutina-fit-web/
├── index.html
├── css/styles.css
├── js/app.js
└── README.md
```

## Publicarla en GitHub Pages

1. Entrá a github.com y creá un repositorio nuevo (por ejemplo `rutina-fit`), público.
2. Tocá **uploading an existing file** y arrastrá **el contenido** de la carpeta (`index.html`, `css`, `js`, `README.md`). `index.html` tiene que quedar en la raíz del repositorio.
3. Tocá **Commit changes**.
4. Andá a **Settings → Pages**. En *Build and deployment* elegí **Deploy from a branch**, rama **main** y carpeta **/(root)**. Guardá.
5. Esperá 1 o 2 minutos. Tu página va a estar en `https://TU-USUARIO.github.io/rutina-fit/`.

## Probarla en tu compu

Abrí `index.html` con doble clic. Funciona sin internet.

## Personalizar

- **Colores**: están al inicio de `css/styles.css` (variables `--p900`, `--p500`, `--pink`, `--orange`).
- **Logotipo**: ahora es texto. Para usar tu logo, guardalo en una carpeta `assets/` y en `js/app.js` reemplazá la función `logo()` por una etiqueta `<img src="assets/logo.svg" alt="Rutina Fit">`.
- **Ejercicios**: se agregan en la lista `EJ` al inicio de `js/app.js`.

## Importante

- Esto es un prototipo funcional: las cuentas y los datos viven solo en el dispositivo y navegador donde se crearon. Si se borra el historial del navegador, se pierden.
- Para una app real con cuentas en la nube (y que los datos del ciclo estén protegidos), el siguiente paso es conectar Supabase, como vimos en el esquema de base de datos.
o
