/* Rutina Fit — app web (HTML + CSS + JS puros).
   Los datos se guardan en el navegador (localStorage). No hay servidor. */
(() => {
  'use strict';

  /* =====================  DATOS BASE  ===================== */
  const EJ = [
    { id: 'sentadilla', nombre: 'Sentadilla', grupo: 'Piernas', emoji: '🦵', nivel: 'Principiante', unidad: 'reps', r: 15,
      desc: 'Ejercicio base para piernas y glúteos.',
      pasos: ['Pies al ancho de los hombros, puntas levemente hacia afuera.', 'Bajá llevando la cadera hacia atrás, como si te sentaras.', 'Mantené la espalda recta y las rodillas alineadas con los pies.', 'Subí empujando con los talones.'] },
    { id: 'zancadas', nombre: 'Zancadas alternas', grupo: 'Piernas', emoji: '🏃‍♀️', nivel: 'Principiante', unidad: 'reps', r: 12,
      desc: 'Trabaja piernas y equilibrio, un lado por vez.',
      pasos: ['Da un paso largo hacia adelante.', 'Bajá hasta que ambas rodillas formen unos 90°.', 'Empujá con el pie de adelante para volver.', 'Alterná las piernas.'] },
    { id: 'sumo', nombre: 'Sentadilla sumo', grupo: 'Piernas', emoji: '🤸‍♀️', nivel: 'Intermedio', unidad: 'reps', r: 12,
      desc: 'Variante con apertura amplia, trabaja aductores y glúteos.',
      pasos: ['Pies bien abiertos, puntas hacia afuera.', 'Bajá con el torso erguido.', 'Rodillas siguiendo la dirección de las puntas.', 'Subí apretando glúteos.'] },
    { id: 'elevacion-gemelos', nombre: 'Elevación de gemelos', grupo: 'Piernas', emoji: '🦶', nivel: 'Principiante', unidad: 'reps', r: 20,
      desc: 'Fortalece los gemelos y mejora la estabilidad del tobillo.',
      pasos: ['De pie, pies al ancho de la cadera.', 'Subí sobre las puntas de los pies.', 'Pausa de un segundo arriba.', 'Bajá lento.'] },
    { id: 'puente-gluteos', nombre: 'Puente de glúteos', grupo: 'Glúteos', emoji: '🍑', nivel: 'Principiante', unidad: 'reps', r: 15,
      desc: 'Activa glúteos y isquiotibiales sin cargar la espalda.',
      pasos: ['Acostada boca arriba, rodillas flexionadas.', 'Apoyá los pies firmes en el piso.', 'Subí la cadera apretando glúteos.', 'Bajá con control.'] },
    { id: 'patada-gluteo', nombre: 'Patada de glúteo', grupo: 'Glúteos', emoji: '🐴', nivel: 'Principiante', unidad: 'reps', r: 15,
      desc: 'En cuatro apoyos, aísla el glúteo.',
      pasos: ['En cuatro apoyos, manos bajo los hombros.', 'Llevá una pierna hacia atrás y arriba.', 'Apretá el glúteo arriba.', 'Volvé sin apoyar la rodilla.'] },
    { id: 'hip-thrust', nombre: 'Hip thrust', grupo: 'Glúteos', emoji: '🔥', nivel: 'Intermedio', unidad: 'reps', r: 12,
      desc: 'Con la espalda apoyada en un banco o sillón firme.',
      pasos: ['Espalda alta apoyada en un banco.', 'Pies firmes, rodillas a 90°.', 'Subí la cadera hasta alinear tronco y muslos.', 'Bajá y repetí.'] },
    { id: 'abduccion', nombre: 'Elevación lateral de pierna', grupo: 'Glúteos', emoji: '↔️', nivel: 'Principiante', unidad: 'reps', r: 15,
      desc: 'Trabaja el glúteo medio, acostada de costado.',
      pasos: ['Acostada de costado, piernas estiradas.', 'Subí la pierna de arriba sin rotar la cadera.', 'Bajá lento.', 'Cambiá de lado.'] },
    { id: 'plancha', nombre: 'Plancha', grupo: 'Abdomen', emoji: '🧘‍♀️', nivel: 'Principiante', unidad: 'seg', r: 30,
      desc: 'Fortalece todo el core.',
      pasos: ['Apoyá antebrazos y puntas de pies.', 'Cuerpo en línea recta, de la cabeza a los talones.', 'Abdomen firme, no hundas la cintura.', 'Respirá con calma.'] },
    { id: 'crunch', nombre: 'Abdominales crunch', grupo: 'Abdomen', emoji: '🔁', nivel: 'Principiante', unidad: 'reps', r: 15,
      desc: 'Trabaja el recto abdominal.',
      pasos: ['Acostada, rodillas flexionadas.', 'Manos detrás de la cabeza sin tirar del cuello.', 'Subí el torso contrayendo el abdomen.', 'Bajá con control.'] },
    { id: 'bicicleta', nombre: 'Bicicleta abdominal', grupo: 'Abdomen', emoji: '🚴‍♀️', nivel: 'Intermedio', unidad: 'reps', r: 20,
      desc: 'Abdominales oblicuos en movimiento.',
      pasos: ['Acostada, manos detrás de la cabeza.', 'Llevá un codo hacia la rodilla contraria.', 'Alterná en forma de pedaleo.', 'Mantené la zona lumbar apoyada.'] },
    { id: 'elevacion-piernas', nombre: 'Elevación de piernas', grupo: 'Abdomen', emoji: '🪜', nivel: 'Intermedio', unidad: 'reps', r: 12,
      desc: 'Abdomen inferior.',
      pasos: ['Acostada, piernas estiradas.', 'Subí las piernas hasta 90°.', 'Bajá sin tocar el piso.', 'Lumbar siempre apoyada.'] },
    { id: 'flexiones-rodillas', nombre: 'Flexiones con rodillas', grupo: 'Brazos', emoji: '💪', nivel: 'Principiante', unidad: 'reps', r: 10,
      desc: 'Pecho, hombros y tríceps con menos carga.',
      pasos: ['Manos bajo los hombros, rodillas apoyadas.', 'Cuerpo en línea desde rodillas a cabeza.', 'Bajá el pecho hacia el piso.', 'Empujá para subir.'] },
    { id: 'triceps-silla', nombre: 'Fondos de tríceps en silla', grupo: 'Brazos', emoji: '🪑', nivel: 'Principiante', unidad: 'reps', r: 12,
      desc: 'Usa una silla firme.',
      pasos: ['Manos en el borde de la silla, cadera adelante.', 'Bajá flexionando los codos hacia atrás.', 'Subí extendiendo los brazos.', 'Hombros lejos de las orejas.'] },
    { id: 'curl-biceps', nombre: 'Curl de bíceps con mancuernas', grupo: 'Brazos', emoji: '🏋️‍♀️', nivel: 'Principiante', unidad: 'reps', r: 12,
      desc: 'Con mancuernas livianas o botellas con agua.',
      pasos: ['De pie, mancuernas a los costados.', 'Flexioná los codos subiendo el peso.', 'Codos pegados al cuerpo.', 'Bajá lento.'] },
    { id: 'press-hombros', nombre: 'Press de hombros', grupo: 'Brazos', emoji: '🙌', nivel: 'Intermedio', unidad: 'reps', r: 10,
      desc: 'Hombros con mancuernas.',
      pasos: ['Mancuernas a la altura de los hombros.', 'Empujá hacia arriba sin arquear la espalda.', 'Extendé sin bloquear los codos.', 'Bajá con control.'] },
    { id: 'remo', nombre: 'Remo con mancuerna', grupo: 'Espalda', emoji: '🚣‍♀️', nivel: 'Intermedio', unidad: 'reps', r: 12,
      desc: 'Trabaja dorsales y la parte media de la espalda.',
      pasos: ['Una mano y rodilla apoyadas en un banco.', 'Espalda paralela al piso.', 'Llevá la mancuerna hacia la cadera.', 'Bajá lento.'] },
    { id: 'superman', nombre: 'Superman', grupo: 'Espalda', emoji: '🦸‍♀️', nivel: 'Principiante', unidad: 'reps', r: 12,
      desc: 'Fortalece la zona lumbar y la espalda baja.',
      pasos: ['Boca abajo, brazos estirados.', 'Subí brazos y piernas a la vez.', 'Pausa de un segundo.', 'Bajá lento.'] },
    { id: 'saltos-tijera', nombre: 'Saltos de tijera', grupo: 'Cardio', emoji: '⭐', nivel: 'Principiante', unidad: 'seg', r: 40,
      desc: 'Cardio simple para entrar en calor.',
      pasos: ['De pie, brazos a los costados.', 'Saltá abriendo piernas y subiendo brazos.', 'Volvé a la posición inicial.', 'Mantené un ritmo constante.'] },
    { id: 'rodillas-altas', nombre: 'Rodillas altas', grupo: 'Cardio', emoji: '🏃', nivel: 'Principiante', unidad: 'seg', r: 30,
      desc: 'Trote en el lugar subiendo las rodillas.',
      pasos: ['Trotá en el lugar.', 'Subí las rodillas a la altura de la cadera.', 'Brazos acompañando el movimiento.', 'Respirá de manera regular.'] },
    { id: 'burpees', nombre: 'Burpees', grupo: 'Cardio', emoji: '⚡', nivel: 'Avanzado', unidad: 'reps', r: 8,
      desc: 'Ejercicio de cuerpo completo, de alta intensidad.',
      pasos: ['De pie, bajá a cuclillas apoyando las manos.', 'Llevá los pies atrás hasta la plancha.', 'Volvé los pies y saltá hacia arriba.', 'Repetí con ritmo.'] },
    { id: 'gato-camello', nombre: 'Gato-camello', grupo: 'Movilidad', emoji: '🐱', nivel: 'Principiante', unidad: 'seg', r: 40,
      desc: 'Moviliza la columna, ideal para el final de la rutina.',
      pasos: ['En cuatro apoyos.', 'Inhalá y bajá el abdomen mirando adelante.', 'Exhalá y redondeá la espalda.', 'Alterná lento.'] },
    { id: 'estiramiento-cadera', nombre: 'Estiramiento de cadera', grupo: 'Movilidad', emoji: '🧎‍♀️', nivel: 'Principiante', unidad: 'seg', r: 30,
      desc: 'Libera la cadera y los flexores.',
      pasos: ['Rodilla apoyada, otro pie adelante.', 'Llevá la cadera suavemente hacia adelante.', 'Sostené respirando.', 'Cambiá de lado.'] },
  ];
  const GRUPOS = ['Piernas', 'Glúteos', 'Abdomen', 'Brazos', 'Espalda', 'Cardio', 'Movilidad'];
  const exById = id => EJ.find(e => e.id === id);

  const DIAS_INFO = [
    'Ideal para empezar o retomar',
    'Constancia suave, buena base',
    'El equilibrio más elegido',
    'Ritmo activo con buena recuperación',
    'Para quienes ya entrenan seguido',
    'Entrenamiento intensivo',
    'Todos los días: incluí movilidad y descanso activo',
  ];
  const DAY_TPL = [
    { n: 'Cuerpo completo', g: ['Piernas', 'Brazos', 'Abdomen', 'Espalda'] },
    { n: 'Piernas y glúteos', g: ['Piernas', 'Glúteos'] },
    { n: 'Tren superior', g: ['Brazos', 'Espalda'] },
    { n: 'Abdomen y cardio', g: ['Abdomen', 'Cardio'] },
    { n: 'Glúteos', g: ['Glúteos', 'Piernas'] },
    { n: 'Cardio', g: ['Cardio', 'Abdomen'] },
    { n: 'Movilidad', g: ['Movilidad'] },
  ];
  const OBJETIVOS = [
    { v: 'Tonificar', em: '✨', t: 'Tonificar', s: 'Definir y fortalecer' },
    { v: 'Bajar de peso', em: '🔥', t: 'Bajar de peso', s: 'Quemar y moverte más' },
    { v: 'Ganar fuerza', em: '💪', t: 'Ganar fuerza', s: 'Más potencia' },
    { v: 'Bienestar', em: '🌸', t: 'Bienestar', s: 'Sentirte bien cada día' },
  ];
  const NIVELES = [
    { v: 'Principiante', em: '🌱', t: 'Principiante', s: 'Recién empiezo' },
    { v: 'Intermedio', em: '🌿', t: 'Intermedio', s: 'Entreno de vez en cuando' },
    { v: 'Avanzado', em: '🌳', t: 'Avanzado', s: 'Entreno con regularidad' },
  ];

  /* =====================  ESTADO Y ALMACENAMIENTO  ===================== */
  const KEY = 'rutinafit:v1';
  const blank = () => ({ users: {}, session: null, data: {} });
  let db = load();
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && parsed.users ? parsed : blank();
    } catch { return blank(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { toast('No se pudo guardar en este navegador'); }
  }
  const me = () => (db.session ? db.data[db.session] : null);
  const user = () => (db.session ? db.users[db.session] : null);

  let ob = { paso: 1, objetivo: null, nivel: null };   // onboarding
  let calMes = new Date(); calMes.setDate(1);           // mes visible del calendario
  let wk = null;                                        // entrenamiento en curso
  let restTimer = null;

  /* =====================  UTILIDADES  ===================== */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hoy = () => iso(new Date());
  const num = (v, min, max, def) => { const n = parseInt(v, 10); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def; };
  const fmtFecha = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }); };
  const inicioSemana = () => { const d = new Date(); const dow = (d.getDay() + 6) % 7; d.setDate(d.getDate() - dow); return iso(d); };

  async function hash(t) {
    try {
      const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
      return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
    } catch { return 'b64:' + btoa(unescape(encodeURIComponent(t))); }
  }

  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400);
  }

  const logo = (cls = '') => `<span class="logo ${cls}">Rutina<b>Fit</b></span>`;
  const ICON = {
    perfil: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
    ejercicios: '<svg viewBox="0 0 24 24"><path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12"/></svg>',
    ciclo: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
    salir: '<svg viewBox="0 0 24 24"><path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M16 8l4 4-4 4M20 12H9"/></svg>',
  };

  /* =====================  LÓGICA DEL PLAN  ===================== */
  function sugerirItems(tpl) {
    const listas = tpl.g.map(g => EJ.filter(e => e.grupo === g));
    const out = []; let i = 0;
    while (out.length < 4 && listas.some(l => i < l.length)) {
      listas.forEach(l => { if (i < l.length && out.length < 4) out.push(l[i]); });
      i++;
    }
    return out.map(e => ({ exId: e.id, series: 3, reps: e.r, rest: 45 }));
  }
  function setDias(n) {
    const d = me();
    const prev = d.plan ? d.plan.days : [];
    const days = [];
    for (let i = 0; i < n; i++) {
      days.push(prev[i] || { name: DAY_TPL[i].n, items: sugerirItems(DAY_TPL[i]) });
    }
    d.plan = { dias: n, days };
    save();
  }
  function siguienteDia() {
    const d = me(); if (!d.plan) return 0;
    const last = d.sesiones[d.sesiones.length - 1];
    return last ? (last.dia + 1) % d.plan.dias : 0;
  }

  /* =====================  NAVEGACIÓN  ===================== */
  const PUBLIC = ['bienvenida', 'login', 'registro'];
  const go = path => { location.hash = '#/' + path; };

  function parseRoute() {
    const h = location.hash.replace(/^#\/?/, '');
    const [name, ...args] = h.split('/');
    return { name: name || '', args };
  }

  function route() {
    stopRest();
    closeSheet();
    const { name, args } = parseRoute();
    const logged = !!db.session && !!me();
    if (db.session && !me()) { db.session = null; save(); }

    if (!logged && !PUBLIC.includes(name)) return go('bienvenida');
    if (logged && PUBLIC.includes(name)) return go(me().onboarded ? 'inicio' : 'onboarding');
    if (logged && !me().onboarded && name !== 'onboarding' && name !== 'dias') return go('onboarding');
    if (!name) return go(logged ? 'inicio' : 'bienvenida');

    const views = {
      bienvenida: vBienvenida, login: vLogin, registro: vRegistro, onboarding: vOnboarding,
      dias: vDias, inicio: vInicio, plan: vPlan, dia: vDia, ejercicios: vEjercicios, ejercicio: vEjercicio,
      entreno: vEntreno, ciclo: vCiclo, perfil: vPerfil, editar: vEditar, progreso: vProgreso,
    };
    const fn = views[name];
    if (!fn) return go(logged ? 'inicio' : 'bienvenida');

    const view = $('#view');
    const res = fn(args);
    view.className = 'view' + (res.bare ? ' bare' : '');
    view.innerHTML = res.html;
    view.scrollTop = 0;
    renderTopbar(name, logged && me().onboarded && name !== 'onboarding');
    if (res.after) res.after();
  }

  function renderTopbar(name, show) {
    const bar = $('#topbar');
    bar.hidden = !show;
    if (!show) { bar.innerHTML = ''; return; }
    const act = n => (name === n || (n === 'ejercicios' && name === 'ejercicio') || (n === 'perfil' && (name === 'editar' || name === 'progreso')) ? 'active' : '');
    bar.innerHTML = `
      <div class="topbar-row">
        <button data-go="inicio" aria-label="Ir al inicio">${logo()}</button>
        <button class="tag" data-go="plan">Mi plan</button>
      </div>
      <nav class="nav" aria-label="Principal">
        <button class="${act('perfil')}" data-go="perfil">${ICON.perfil}Perfil</button>
        <button class="${act('ejercicios')}" data-go="ejercicios">${ICON.ejercicios}Ejercicios</button>
        <button class="${act('ciclo')}" data-go="ciclo">${ICON.ciclo}Ciclo</button>
        <button class="logout" data-action="logout">${ICON.salir}Cerrar sesión</button>
      </nav>`;
  }

  /* =====================  VISTAS  ===================== */
  function vBienvenida() {
    return {
      bare: true,
      html: `<section class="hero">
        <div>${logo('light xl')}</div>
        <div class="grow">
          <h1>Tu rutina, a tu ritmo.</h1>
          <p>Armá tu plan de entrenamiento de 1 a 7 días por semana, cargá tus ejercicios y llevá el registro de tu ciclo en un solo lugar.</p>
          <div class="badge-row"><span class="badge">💪 Entrenamientos</span><span class="badge">📅 Ciclo</span><span class="badge">📈 Progreso</span></div>
        </div>
        <div class="stack">
          <button class="btn btn-primary" data-go="registro">Crear cuenta</button>
          <button class="btn btn-ghost" data-go="login">Ya tengo cuenta</button>
        </div>
      </section>`,
    };
  }

  function vLogin() {
    return {
      bare: true,
      html: `<section class="auth">
        <div class="auth-head">${logo('light')}<h1>¡Hola de nuevo!</h1><p>Ingresá para ver tu rutina.</p></div>
        <div class="auth-body">
          <form class="auth-card" data-form="login" novalidate>
            <label class="field">Email<input type="email" name="email" autocomplete="email" required placeholder="tu@email.com"></label>
            <label class="field">Contraseña<input type="password" name="pass" autocomplete="current-password" required placeholder="••••••"></label>
            <div class="error" id="err" role="alert"></div>
            <button class="btn btn-primary" type="submit">Ingresar</button>
            <p class="center small muted">¿No tenés cuenta? <a class="link" href="#/registro">Registrate</a></p>
          </form>
        </div>
      </section>`,
    };
  }

  function vRegistro() {
    return {
      bare: true,
      html: `<section class="auth">
        <div class="auth-head">${logo('light')}<h1>Creá tu cuenta</h1><p>Es rápido y gratis.</p></div>
        <div class="auth-body">
          <form class="auth-card" data-form="registro" novalidate>
            <label class="field">Nombre<input type="text" name="nombre" autocomplete="given-name" required placeholder="Tu nombre"></label>
            <label class="field">Email<input type="email" name="email" autocomplete="email" required placeholder="tu@email.com"></label>
            <label class="field">Contraseña<input type="password" name="pass" autocomplete="new-password" required minlength="6" placeholder="Mínimo 6 caracteres"></label>
            <label class="field">Repetir contraseña<input type="password" name="pass2" autocomplete="new-password" required placeholder="Repetila"></label>
            <div class="error" id="err" role="alert"></div>
            <button class="btn btn-primary" type="submit">Crear cuenta</button>
            <p class="center small muted">¿Ya tenés cuenta? <a class="link" href="#/login">Ingresá</a></p>
          </form>
        </div>
      </section>`,
    };
  }

  function vOnboarding() {
    const barra = `<div class="steps">${[1, 2, 3].map(i => `<i class="${i <= ob.paso ? 'on' : ''}"></i>`).join('')}</div>`;
    const opts = (lista, key) => `<div class="options">${lista.map(o =>
      `<button class="option ${ob[key] === o.v ? 'sel' : ''}" data-action="ob-pick" data-key="${key}" data-v="${esc(o.v)}"><span class="em">${o.em}</span><span>${o.t}<small>${o.s}</small></span></button>`).join('')}</div>`;
    let body;
    if (ob.paso === 1) {
      body = `<h1 class="page-title">¿Cuál es tu objetivo?</h1><p class="page-sub">Elegí el que más se parezca a lo que buscás.</p>${opts(OBJETIVOS, 'objetivo')}
        <div class="section"><button class="btn btn-primary" data-action="ob-next" ${ob.objetivo ? '' : 'disabled style="opacity:.5"'}>Continuar</button></div>`;
    } else if (ob.paso === 2) {
      body = `<h1 class="page-title">¿Cuál es tu nivel?</h1><p class="page-sub">Así te sugerimos ejercicios acordes.</p>${opts(NIVELES, 'nivel')}
        <div class="section row"><button class="btn btn-outline" data-action="ob-back">Atrás</button><button class="btn btn-primary" data-action="ob-next" ${ob.nivel ? '' : 'disabled style="opacity:.5"'}>Continuar</button></div>`;
    } else {
      body = `<h1 class="page-title">¿Cuántos días entrenás por semana?</h1><p class="page-sub">Elegí de 1 a 7. Después podés cambiarlo cuando quieras.</p>${tablaDias(null)}
        <div class="section"><button class="btn btn-outline" data-action="ob-back">Atrás</button></div>`;
    }
    return { html: `<div class="center" style="margin-bottom:14px">${logo()}</div>${barra}${body}` };
  }

  function tablaDias(actual) {
    return `<table class="dias-table" role="listbox" aria-label="Días de entrenamiento por semana"><tbody>${[1, 2, 3, 4, 5, 6, 7].map(n =>
      `<tr class="${actual === n ? 'sel' : ''}" data-action="pick-dias" data-n="${n}" role="option" tabindex="0" aria-selected="${actual === n}">
        <td><span class="big">${n}</span></td>
        <td><b>${n} ${n === 1 ? 'día' : 'días'} por semana</b><span>${DIAS_INFO[n - 1]}</span></td></tr>`).join('')}</tbody></table>`;
  }

  function vDias() {
    const d = me();
    return {
      html: `<h1 class="page-title">Días de entrenamiento</h1><p class="page-sub">Elegí cuántos días por semana querés entrenar.</p>
        ${tablaDias(d.plan ? d.plan.dias : null)}
        <div class="section"><button class="btn btn-outline" data-go="plan">Volver al plan</button></div>`,
    };
  }

  function vInicio() {
    const d = me(), u = user();
    const idx = siguienteDia();
    const dia = d.plan.days[idx];
    const sem = d.sesiones.filter(s => s.fecha >= inicioSemana()).length;
    return {
      html: `<div class="hello">
          <h1>¡Hola, ${esc(u.nombre)}! 👋</h1>
          <p>${sem >= d.plan.dias ? '¡Cumpliste tu meta semanal!' : 'Tu próximo entrenamiento te espera.'}</p>
          <div class="muted" style="color:#ffd0ec;font-size:.75rem;font-weight:700;letter-spacing:.06em">PRÓXIMO · DÍA ${idx + 1}</div>
          <h2 style="margin:2px 0 12px">${esc(dia.name)}</h2>
          <button class="btn btn-primary" data-go="entreno/${idx}">Empezar entrenamiento</button>
        </div>
        <div class="stats">
          <div class="stat"><b>${sem}/${d.plan.dias}</b><span>esta semana</span></div>
          <div class="stat"><b>${d.sesiones.length}</b><span>entrenos totales</span></div>
          <div class="stat"><b>${dia.items.length}</b><span>ejercicios hoy</span></div>
        </div>
        <div class="section"><h2>Atajos</h2>
          <div class="list">
            <button class="item" data-go="plan"><span class="ico">📋</span><span class="grow"><h3>Mi plan semanal</h3><div class="sub">${d.plan.dias} ${d.plan.dias === 1 ? 'día' : 'días'} por semana</div></span><span class="go">›</span></button>
            <button class="item" data-go="progreso"><span class="ico">📈</span><span class="grow"><h3>Mi progreso</h3><div class="sub">Entrenos y peso</div></span><span class="go">›</span></button>
            <button class="item" data-go="ciclo"><span class="ico">🌸</span><span class="grow"><h3>Mi ciclo</h3><div class="sub">Marcá tus días en el calendario</div></span><span class="go">›</span></button>
          </div></div>`,
    };
  }

  function vPlan() {
    const d = me();
    return {
      html: `<div class="row between"><div><h1 class="page-title">Mi plan semanal</h1><p class="page-sub" style="margin-bottom:0">${d.plan.dias} ${d.plan.dias === 1 ? 'día' : 'días'} por semana</p></div>
          <button class="btn btn-outline btn-sm" data-go="dias">Cambiar</button></div>
        <div class="section list">${d.plan.days.map((day, i) => `
          <button class="item" data-go="dia/${i}">
            <span class="ico num">${i + 1}</span>
            <span class="grow"><h3>${esc(day.name)}</h3><div class="sub">${day.items.length} ${day.items.length === 1 ? 'ejercicio' : 'ejercicios'}</div></span>
            <span class="go">›</span></button>`).join('')}</div>
        <p class="hint" style="margin-top:14px">Tocá un día para cargar o cambiar sus ejercicios.</p>`,
    };
  }

  function vDia([i]) {
    const d = me(); const idx = num(i, 0, 6, 0);
    const day = d.plan.days[idx];
    if (!day) return vPlan();
    const items = day.items.map((it, k) => {
      const e = exById(it.exId); if (!e) return '';
      return `<div class="ex-row">
        <div class="ex-head"><span class="ico">${e.emoji}</span><h3>${esc(e.nombre)}</h3><button class="x-btn" data-action="del-item" data-d="${idx}" data-k="${k}" aria-label="Quitar ${esc(e.nombre)}">✕</button></div>
        <div class="mini-grid">
          <label>Series<input type="number" inputmode="numeric" min="1" max="10" value="${it.series}" data-field="series" data-d="${idx}" data-k="${k}"></label>
          <label>${e.unidad === 'seg' ? 'Segundos' : 'Repeticiones'}<input type="number" inputmode="numeric" min="1" max="200" value="${it.reps}" data-field="reps" data-d="${idx}" data-k="${k}"></label>
          <label>Descanso (s)<input type="number" inputmode="numeric" min="0" max="300" value="${it.rest}" data-field="rest" data-d="${idx}" data-k="${k}"></label>
        </div></div>`;
    }).join('');
    return {
      html: `<button class="link small" data-go="plan">‹ Mi plan</button>
        <div class="muted small" style="margin-top:8px;font-weight:700">DÍA ${idx + 1}</div>
        <input class="name-input" type="text" value="${esc(day.name)}" maxlength="40" data-field="dayname" data-d="${idx}" aria-label="Nombre del día">
        <div class="section">${items || '<div class="empty"><span class="em">🏋️‍♀️</span>Todavía no cargaste ejercicios para este día.</div>'}</div>
        <div class="section list">
          <button class="btn btn-outline" data-action="add-ex" data-d="${idx}">＋ Agregar ejercicio</button>
          <button class="btn btn-primary" data-go="entreno/${idx}" ${day.items.length ? '' : 'disabled style="opacity:.5"'}>Iniciar entrenamiento</button>
        </div>`,
    };
  }

  let filtroGrupo = 'Todos', filtroTxt = '';
  function listaEj(accion) {
    const q = filtroTxt.trim().toLowerCase();
    const l = EJ.filter(e => (filtroGrupo === 'Todos' || e.grupo === filtroGrupo) && (!q || e.nombre.toLowerCase().includes(q)));
    if (!l.length) return '<div class="empty"><span class="em">🔍</span>No encontramos ejercicios con ese filtro.</div>';
    return l.map(e => `<button class="item" ${accion(e)}><span class="ico">${e.emoji}</span><span class="grow"><h3>${esc(e.nombre)}</h3><div class="sub">${e.grupo} · ${e.nivel}</div></span><span class="go">›</span></button>`).join('');
  }
  const chipsGrupo = () => `<div class="chips">${['Todos', ...GRUPOS].map(g => `<button class="chip ${filtroGrupo === g ? 'active' : ''}" data-action="filtro" data-g="${g}">${g}</button>`).join('')}</div>`;

  function vEjercicios() {
    return {
      html: `<h1 class="page-title">Ejercicios</h1><p class="page-sub">Explorá el catálogo y sumalo a tu plan.</p>
        <input type="search" placeholder="Buscar ejercicio…" value="${esc(filtroTxt)}" data-action-input="buscar" aria-label="Buscar ejercicio" style="margin-bottom:10px">
        ${chipsGrupo()}
        <div class="list" id="lista-ej">${listaEj(e => `data-go="ejercicio/${e.id}"`)}</div>`,
    };
  }

  function vEjercicio([id]) {
    const e = exById(id); if (!e) return vEjercicios();
    return {
      html: `<button class="link small" data-go="ejercicios">‹ Ejercicios</button>
        <div class="ex-hero" style="margin-top:10px"><div class="big-emoji">${e.emoji}</div><h1>${esc(e.nombre)}</h1>
          <div style="margin-top:8px"><span class="tag">${e.grupo}</span> <span class="tag">${e.nivel}</span></div></div>
        <div class="card"><p>${esc(e.desc)}</p><p class="small muted" style="margin-top:8px">Sugerido: 3 series × ${e.r} ${e.unidad === 'seg' ? 'segundos' : 'repeticiones'}</p></div>
        <div class="section"><h2>Cómo se hace</h2><div class="card"><ol class="steps-list">${e.pasos.map(p => `<li>${esc(p)}</li>`).join('')}</ol></div></div>
        <div class="section"><button class="btn btn-primary" data-action="add-to-day" data-id="${e.id}">Agregar a un día</button></div>`,
    };
  }

  function vEntreno([i]) {
    const d = me(); const idx = num(i, 0, 6, 0);
    const day = d.plan.days[idx];
    if (!day || !day.items.length) { toast('Ese día no tiene ejercicios'); return vPlan(); }
    if (!wk || wk.dia !== idx) wk = { dia: idx, done: day.items.map(() => 0) };
    return { html: entrenoHTML(day), after: () => { } };
  }
  function entrenoHTML(day) {
    const total = day.items.reduce((a, it) => a + it.series, 0);
    const hechas = wk.done.reduce((a, n) => a + n, 0);
    return `<button class="link small" data-go="dia/${wk.dia}">‹ Salir</button>
      <h1 class="page-title" style="margin-top:8px">${esc(day.name)}</h1>
      <p class="page-sub" style="margin-bottom:0">Tocá cada serie al terminarla. ${hechas}/${total} series</p>
      <div class="progress"><i style="width:${total ? Math.round(hechas / total * 100) : 0}%"></i></div>
      ${day.items.map((it, k) => {
        const e = exById(it.exId); if (!e) return '';
        return `<div class="ex-row"><div class="ex-head"><span class="ico">${e.emoji}</span><h3>${esc(e.nombre)}</h3></div>
          <p class="small muted" style="margin-bottom:10px">${it.series} × ${it.reps} ${e.unidad === 'seg' ? 'seg' : 'reps'} · descanso ${it.rest}s</p>
          <div class="set-row">${Array.from({ length: it.series }, (_, s) => `<button class="set ${s < wk.done[k] ? 'done' : ''}" data-action="set" data-k="${k}" data-s="${s}" aria-label="Serie ${s + 1}">${s < wk.done[k] ? '✓' : s + 1}</button>`).join('')}</div></div>`;
      }).join('')}
      <div class="section" style="padding-bottom:70px"><button class="btn btn-primary" data-action="finish">Terminar entrenamiento</button></div>`;
  }

  function vCiclo() {
    const d = me();
    const y = calMes.getFullYear(), m = calMes.getMonth();
    const offset = (new Date(y, m, 1).getDay() + 6) % 7;
    const n = new Date(y, m + 1, 0).getDate();
    const mes = calMes.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
    let marcados = 0, celdas = '';
    for (let i = 0; i < offset; i++) celdas += '<div class="cal-day empty"></div>';
    for (let day = 1; day <= n; day++) {
      const f = `${y}-${pad(m + 1)}-${pad(day)}`;
      const on = !!d.ciclo[f]; if (on) marcados++;
      celdas += `<button class="cal-day ${on ? 'on' : ''} ${f === hoy() ? 'today' : ''}" data-action="dia-ciclo" data-f="${f}" aria-pressed="${on}" aria-label="${day} de ${mes}${on ? ', marcado' : ''}">${day}</button>`;
    }
    return {
      html: `<h1 class="page-title">Mi ciclo</h1><p class="page-sub">Tocá un día para marcar o desmarcar la menstruación.</p>
        <div class="cal-head"><button class="cal-nav" data-action="mes" data-d="-1" aria-label="Mes anterior">‹</button><h2>${mes}</h2><button class="cal-nav" data-action="mes" data-d="1" aria-label="Mes siguiente">›</button></div>
        <div class="cal-grid">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(x => `<div class="cal-dow">${x}</div>`).join('')}${celdas}</div>
        <div class="legend"><span><i class="dot" style="background:var(--pink)"></i>Menstruación</span><span><i class="dot" style="outline:2px solid var(--p500);background:#fff"></i>Hoy</span></div>
        <div class="card" style="margin-top:16px"><div class="row between"><span class="muted" style="font-weight:600">Días marcados este mes</span><b style="font-size:1.4rem;color:var(--p900)">${marcados}</b></div></div>
        <p class="hint" style="margin-top:12px">🔒 Estos datos se guardan solo en este dispositivo y no se envían a ningún servidor.</p>`,
    };
  }

  function vPerfil() {
    const d = me(), u = user(), p = d.profile;
    return {
      html: `<div class="center"><div class="avatar">${esc((u.nombre || '?')[0].toUpperCase())}</div><h1 class="page-title" style="margin-bottom:0">${esc(u.nombre)}</h1><p class="page-sub">${esc(db.session)}</p></div>
        <div class="card"><div class="kv">
          <span>Objetivo</span><b>${esc(p.objetivo || '—')}</b>
          <span>Nivel</span><b>${esc(p.nivel || '—')}</b>
          <span>Altura</span><b>${p.altura ? p.altura + ' cm' : '—'}</b>
          <span>Peso</span><b>${p.peso ? p.peso + ' kg' : '—'}</b>
          <span>Plan</span><b>${d.plan.dias} ${d.plan.dias === 1 ? 'día' : 'días'} / semana</b></div></div>
        <div class="section list">
          <button class="btn btn-primary" data-go="editar">Editar perfil</button>
          <button class="btn btn-outline" data-go="progreso">Ver mi progreso</button>
          <button class="btn btn-danger" data-action="logout">Cerrar sesión</button>
        </div>`,
    };
  }

  function vEditar() {
    const d = me(), u = user(), p = d.profile;
    const sel = (lista, val) => lista.map(o => `<option ${o.v === val ? 'selected' : ''}>${o.v}</option>`).join('');
    return {
      html: `<button class="link small" data-go="perfil">‹ Perfil</button>
        <h1 class="page-title" style="margin-top:8px">Editar perfil</h1>
        <form class="card list" data-form="editar" novalidate style="gap:14px">
          <label class="field">Nombre<input type="text" name="nombre" value="${esc(u.nombre)}" maxlength="40" required></label>
          <label class="field">Altura (cm)<input type="number" name="altura" inputmode="numeric" min="100" max="230" value="${esc(p.altura || '')}"></label>
          <label class="field">Peso (kg)<input type="number" name="peso" inputmode="decimal" step="0.1" min="30" max="250" value="${esc(p.peso || '')}"></label>
          <label class="field">Objetivo<select name="objetivo">${sel(OBJETIVOS, p.objetivo)}</select></label>
          <label class="field">Nivel<select name="nivel">${sel(NIVELES, p.nivel)}</select></label>
          <div class="error" id="err" role="alert"></div>
          <button class="btn btn-primary" type="submit">Guardar cambios</button>
        </form>`,
    };
  }

  function sparkline(pesos) {
    if (pesos.length < 2) return '';
    const v = pesos.map(p => p.kg), min = Math.min(...v), max = Math.max(...v), r = max - min || 1;
    const pts = v.map((x, i) => `${(i / (v.length - 1) * 296 + 2).toFixed(1)},${(84 - (x - min) / r * 76).toFixed(1)}`).join(' ');
    return `<svg class="spark" viewBox="0 0 300 90" preserveAspectRatio="none" role="img" aria-label="Evolución del peso"><polyline points="${pts}" fill="none" stroke="#8941ee" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function vProgreso() {
    const d = me();
    const sem = d.sesiones.filter(s => s.fecha >= inicioSemana()).length;
    const ult = d.sesiones.slice(-5).reverse();
    const pesos = d.pesos.slice(-12);
    return {
      html: `<button class="link small" data-go="perfil">‹ Perfil</button>
        <h1 class="page-title" style="margin-top:8px">Mi progreso</h1>
        <div class="stats"><div class="stat"><b>${sem}</b><span>esta semana</span></div><div class="stat"><b>${d.sesiones.length}</b><span>entrenos</span></div><div class="stat"><b>${d.pesos.length ? d.pesos[d.pesos.length - 1].kg : '—'}</b><span>kg actual</span></div></div>
        <div class="section"><h2>Últimos entrenamientos</h2>
          ${ult.length ? `<div class="list">${ult.map(s => `<div class="item"><span class="ico">✅</span><span class="grow"><h3>${esc(s.nombre)}</h3><div class="sub">${fmtFecha(s.fecha)} · ${s.hechas}/${s.total} series</div></span></div>`).join('')}</div>` : '<div class="empty"><span class="em">🌱</span>Cuando termines tu primer entrenamiento va a aparecer acá.</div>'}</div>
        <div class="section"><h2>Peso</h2>
          <div class="card">${sparkline(pesos) || '<p class="hint">Cargá al menos dos registros para ver tu evolución.</p>'}
            <form class="row" data-form="peso" style="margin-top:12px" novalidate>
              <input type="number" name="kg" inputmode="decimal" step="0.1" min="30" max="250" placeholder="Peso de hoy (kg)" aria-label="Peso de hoy en kilos">
              <button class="btn btn-dark btn-sm" type="submit">Guardar</button></form></div></div>`,
    };
  }

  /* =====================  MODAL  ===================== */
  function openSheet(title, body) {
    const o = $('#overlay');
    o.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sheet-head"><h2>${esc(title)}</h2><button class="x-btn" data-action="close-sheet" aria-label="Cerrar">✕</button></div><div class="sheet-body">${body}</div></div>`;
    o.hidden = false;
  }
  function closeSheet() { const o = $('#overlay'); o.hidden = true; o.innerHTML = ''; }

  /* =====================  DESCANSO (timer)  ===================== */
  function startRest(sec) {
    stopRest();
    if (!sec) return;
    let left = sec;
    const el = $('#rest'); el.hidden = false;
    const draw = () => { el.innerHTML = `<div><small>Descanso</small><b>${pad(Math.floor(left / 60))}:${pad(left % 60)}</b></div><button class="btn btn-ghost btn-sm" data-action="skip-rest">Saltar</button>`; };
    draw();
    restTimer = setInterval(() => { left--; if (left <= 0) { stopRest(); toast('¡Listo, a la próxima serie! 💪'); } else draw(); }, 1000);
  }
  function stopRest() { clearInterval(restTimer); restTimer = null; const el = $('#rest'); if (el) { el.hidden = true; el.innerHTML = ''; } }

  /* =====================  ACCIONES  ===================== */
  function refreshEntreno() {
    const day = me().plan.days[wk.dia];
    $('#view').innerHTML = entrenoHTML(day);
  }

  const actions = {
    logout() { if (!confirm('¿Cerrar sesión?')) return; db.session = null; save(); wk = null; go('bienvenida'); },
    'ob-pick'(el) { ob[el.dataset.key] = el.dataset.v; route(); },
    'ob-next'() { if ((ob.paso === 1 && !ob.objetivo) || (ob.paso === 2 && !ob.nivel)) return; ob.paso++; route(); },
    'ob-back'() { ob.paso = Math.max(1, ob.paso - 1); route(); },
    'pick-dias'(el) {
      const n = num(el.dataset.n, 1, 7, 3);
      const d = me();
      if (!d.onboarded) {
        d.profile.objetivo = ob.objetivo; d.profile.nivel = ob.nivel;
        setDias(n); d.onboarded = true; save();
        ob = { paso: 1, objetivo: null, nivel: null };
        toast('¡Armamos tu rutina inicial! Podés editarla.');
        return go('inicio');
      }
      if (d.plan && n < d.plan.dias && !confirm(`Vas a pasar a ${n} ${n === 1 ? 'día' : 'días'}. Se quitarán los últimos días del plan. ¿Continuar?`)) return;
      setDias(n); toast(`Plan de ${n} ${n === 1 ? 'día' : 'días'} por semana`); go('plan');
    },
    'del-item'(el) {
      const day = me().plan.days[+el.dataset.d]; day.items.splice(+el.dataset.k, 1); save(); route();
    },
    'add-ex'(el) {
      const di = +el.dataset.d;
      filtroGrupo = 'Todos'; filtroTxt = '';
      openSheet('Agregar ejercicio', sheetEjercicios(di));
    },
    'sheet-add'(el) {
      const day = me().plan.days[+el.dataset.d]; const e = exById(el.dataset.id); if (!e) return;
      day.items.push({ exId: e.id, series: 3, reps: e.r, rest: 45 }); save(); closeSheet(); toast(`${e.nombre} agregado`); route();
    },
    'sheet-filtro'(el) {
      filtroGrupo = el.dataset.g; const di = +el.dataset.d;
      $('.sheet-body').innerHTML = sheetEjercicios(di);
    },
    'close-sheet'() { closeSheet(); },
    filtro(el) { filtroGrupo = el.dataset.g; route(); },
    'add-to-day'(el) {
      const d = me();
      openSheet('¿A qué día lo agregás?', `<div class="list">${d.plan.days.map((day, i) => `<button class="item" data-action="to-day" data-d="${i}" data-id="${el.dataset.id}"><span class="ico num">${i + 1}</span><span class="grow"><h3>${esc(day.name)}</h3><div class="sub">${day.items.length} ejercicios</div></span></button>`).join('')}</div>`);
    },
    'to-day'(el) {
      const e = exById(el.dataset.id); const day = me().plan.days[+el.dataset.d];
      day.items.push({ exId: e.id, series: 3, reps: e.r, rest: 45 }); save(); closeSheet(); toast(`Agregado al Día ${+el.dataset.d + 1}`);
    },
    set(el) {
      const k = +el.dataset.k, s = +el.dataset.s;
      const it = me().plan.days[wk.dia].items[k];
      if (s < wk.done[k]) { wk.done[k] = s; refreshEntreno(); return; }  // deshacer
      wk.done[k] = s + 1; refreshEntreno(); startRest(it.rest);
    },
    'skip-rest'() { stopRest(); },
    finish() {
      const d = me(); const day = d.plan.days[wk.dia];
      const total = day.items.reduce((a, it) => a + it.series, 0);
      const hechas = wk.done.reduce((a, n) => a + n, 0);
      if (!hechas) { toast('Marcá al menos una serie'); return; }
      d.sesiones.push({ fecha: hoy(), dia: wk.dia, nombre: day.name, hechas, total });
      save(); wk = null; stopRest(); toast('¡Entrenamiento guardado! 🎉'); go('progreso');
    },
    mes(el) { calMes = new Date(calMes.getFullYear(), calMes.getMonth() + +el.dataset.d, 1); route(); },
    'dia-ciclo'(el) {
      const d = me(), f = el.dataset.f;
      if (d.ciclo[f]) delete d.ciclo[f]; else d.ciclo[f] = true;
      save(); const y = $('#view').scrollTop; route(); $('#view').scrollTop = y;
    },
  };

  function sheetEjercicios(di) {
    return `<input type="search" placeholder="Buscar…" value="${esc(filtroTxt)}" data-action-input="sheet-buscar" data-d="${di}" aria-label="Buscar ejercicio" style="margin-bottom:10px">
      <div class="chips">${['Todos', ...GRUPOS].map(g => `<button class="chip ${filtroGrupo === g ? 'active' : ''}" data-action="sheet-filtro" data-g="${g}" data-d="${di}">${g}</button>`).join('')}</div>
      <div class="list" id="sheet-lista">${listaEj(e => `data-action="sheet-add" data-d="${di}" data-id="${e.id}"`)}</div>`;
  }

  /* =====================  EVENTOS  ===================== */
  document.addEventListener('click', ev => {
    const a = ev.target.closest('[data-action]');
    if (a && actions[a.dataset.action]) { ev.preventDefault(); actions[a.dataset.action](a); return; }
    const g = ev.target.closest('[data-go]');
    if (g) { ev.preventDefault(); go(g.dataset.go); }
  });

  document.addEventListener('keydown', ev => {
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches('tr[data-action]')) { ev.preventDefault(); actions[ev.target.dataset.action](ev.target); }
    if (ev.key === 'Escape') closeSheet();
  });

  document.addEventListener('input', ev => {
    const t = ev.target;
    const ai = t.dataset.actionInput;
    if (ai === 'buscar') { filtroTxt = t.value; $('#lista-ej').innerHTML = listaEj(e => `data-go="ejercicio/${e.id}"`); }
    if (ai === 'sheet-buscar') { filtroTxt = t.value; $('#sheet-lista').innerHTML = listaEj(e => `data-action="sheet-add" data-d="${t.dataset.d}" data-id="${e.id}"`); }
  });

  document.addEventListener('change', ev => {
    const t = ev.target; const f = t.dataset.field; if (!f) return;
    const d = me(); if (!d) return;
    const day = d.plan.days[+t.dataset.d]; if (!day) return;
    if (f === 'dayname') { day.name = t.value.trim().slice(0, 40) || `Día ${+t.dataset.d + 1}`; t.value = day.name; }
    else {
      const it = day.items[+t.dataset.k]; if (!it) return;
      const lim = { series: [1, 10, 3], reps: [1, 200, 12], rest: [0, 300, 45] }[f];
      it[f] = num(t.value, lim[0], lim[1], lim[2]); t.value = it[f];
    }
    save();
  });

  const setErr = m => { const e = $('#err'); if (e) e.textContent = m; };
  const emailOk = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  document.addEventListener('submit', async ev => {
    const form = ev.target.closest('[data-form]'); if (!form) return;
    ev.preventDefault();
    const fd = Object.fromEntries(new FormData(form));
    const kind = form.dataset.form;

    if (kind === 'registro') {
      const email = (fd.email || '').trim().toLowerCase(), nombre = (fd.nombre || '').trim();
      if (!nombre) return setErr('Escribí tu nombre.');
      if (!emailOk(email)) return setErr('Ingresá un email válido.');
      if ((fd.pass || '').length < 6) return setErr('La contraseña necesita al menos 6 caracteres.');
      if (fd.pass !== fd.pass2) return setErr('Las contraseñas no coinciden.');
      if (db.users[email]) return setErr('Ya existe una cuenta con ese email.');
      db.users[email] = { nombre, pass: await hash(fd.pass) };
      db.data[email] = { onboarded: false, profile: {}, plan: null, ciclo: {}, sesiones: [], pesos: [] };
      db.session = email; save(); ob = { paso: 1, objetivo: null, nivel: null };
      return go('onboarding');
    }
    if (kind === 'login') {
      const email = (fd.email || '').trim().toLowerCase();
      const u = db.users[email];
      if (!u || u.pass !== await hash(fd.pass || '')) return setErr('Email o contraseña incorrectos.');
      db.session = email; save(); return go(db.data[email].onboarded ? 'inicio' : 'onboarding');
    }
    if (kind === 'editar') {
      const nombre = (fd.nombre || '').trim(); if (!nombre) return setErr('El nombre no puede quedar vacío.');
      const d = me(), p = d.profile;
      user().nombre = nombre;
      p.altura = fd.altura ? num(fd.altura, 100, 230, '') : '';
      const peso = parseFloat(String(fd.peso).replace(',', '.'));
      if (Number.isFinite(peso) && peso >= 30 && peso <= 250) {
        if (peso !== p.peso) d.pesos.push({ fecha: hoy(), kg: peso });
        p.peso = peso;
      }
      p.objetivo = fd.objetivo; p.nivel = fd.nivel; save(); toast('Perfil actualizado'); return go('perfil');
    }
    if (kind === 'peso') {
      const kg = parseFloat(String(fd.kg).replace(',', '.'));
      if (!Number.isFinite(kg) || kg < 30 || kg > 250) return toast('Ingresá un peso válido');
      const d = me();
      d.pesos = d.pesos.filter(x => x.fecha !== hoy()); d.pesos.push({ fecha: hoy(), kg }); d.profile.peso = kg;
      save(); toast('Peso guardado'); route();
    }
  });

  window.addEventListener('hashchange', route);
  window.addEventListener('storage', e => { if (e.key === KEY) { db = load(); route(); } });
  route();
})();
