/* Rutina Fit — app web (HTML + CSS + JS puros).
   Las cuentas y los datos se guardan en la nube con Supabase (Authentication + base de datos). */
(() => {
  'use strict';

  /* =====================  CONSTANTES  ===================== */
  const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const CORTO = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const OBJETIVOS = ['Tonificar', 'Bajar de peso', 'Ganar fuerza', 'Ganar masa muscular', 'Mejorar mi resistencia', 'Sentirme bien'];
  const DIAS_DEFAULT = { 1: [0], 2: [0, 3], 3: [0, 2, 4], 4: [0, 2, 4, 5], 5: [0, 1, 2, 4, 5], 6: [0, 1, 2, 3, 4, 5], 7: [0, 1, 2, 3, 4, 5, 6] };
  const GRUPOS = ['Todos', 'Piernas', 'Glúteos', 'Abdomen', 'Brazos', 'Espalda', 'Cardio'];

  // id, nombre, grupos, unidad (r = repeticiones, s = segundos), series, valor
  const CAT = [
    ['sentadilla', 'Sentadilla', ['Piernas'], 'r', 4, 12],
    ['sentadilla-sumo', 'Sentadilla sumo', ['Piernas', 'Glúteos'], 'r', 4, 12],
    ['hip-thrust', 'Hip thrust', ['Glúteos'], 'r', 4, 12],
    ['step-up', 'Step up', ['Piernas', 'Glúteos'], 'r', 3, 12],
    ['abdominales-bicicleta', 'Abdominales bicicleta', ['Abdomen'], 'r', 3, 20],
    ['remo-mancuerna', 'Remo con mancuerna', ['Brazos', 'Espalda'], 'r', 4, 12],
    ['puente-gluteos', 'Puente de glúteos', ['Glúteos'], 'r', 4, 15],
    ['zancadas', 'Zancadas', ['Piernas'], 'r', 3, 12],
    ['zancadas-caminando', 'Zancadas caminando', ['Piernas'], 'r', 3, 12],
    ['peso-muerto-rumano', 'Peso muerto rumano', ['Piernas', 'Glúteos'], 'r', 3, 10],
    ['peso-muerto', 'Peso muerto', ['Piernas', 'Espalda'], 'r', 3, 10],
    ['patada-gluteo', 'Patada de glúteo', ['Glúteos'], 'r', 3, 15],
    ['abductores', 'Abductores', ['Glúteos'], 'r', 3, 15],
    ['elevacion-gemelos', 'Elevación de gemelos', ['Piernas'], 'r', 3, 20],
    ['plancha', 'Plancha', ['Abdomen'], 's', 3, 30],
    ['plancha-lateral', 'Plancha lateral', ['Abdomen'], 's', 3, 20],
    ['abdominales-crunch', 'Abdominales crunch', ['Abdomen'], 'r', 3, 15],
    ['elevacion-piernas', 'Elevación de piernas', ['Abdomen'], 'r', 3, 12],
    ['press-hombros', 'Press de hombros', ['Brazos'], 'r', 3, 12],
    ['curl-biceps', 'Curl de bíceps', ['Brazos'], 'r', 3, 12],
    ['triceps-banco', 'Tríceps en banco', ['Brazos'], 'r', 3, 12],
    ['flexiones-rodillas', 'Flexiones con rodillas', ['Brazos'], 'r', 3, 10],
    ['superman', 'Superman', ['Espalda'], 'r', 3, 12],
    ['saltos-tijera', 'Saltos de tijera', ['Cardio'], 's', 3, 40],
    ['rodillas-altas', 'Rodillas altas', ['Cardio'], 's', 3, 30],
  ].map(([id, nombre, grupos, u, s, v]) => ({ id, nombre, grupos, u, s, v }));
  const ex = id => CAT.find(e => e.id === id);
  const etiqueta = g => g.map((x, i) => (i ? x.toLowerCase() : x)).join(' y ');

  const PLANTILLAS = [
    [['sentadilla', 4, 12], ['puente-gluteos', 4, 15], ['zancadas', 3, 12], ['peso-muerto-rumano', 3, 10], ['patada-gluteo', 3, 15], ['plancha', 3, 30]],
    [['hip-thrust', 4, 12], ['step-up', 3, 12], ['sentadilla-sumo', 4, 12], ['abductores', 3, 15], ['abdominales-bicicleta', 3, 20]],
    [['remo-mancuerna', 4, 12], ['press-hombros', 3, 12], ['curl-biceps', 3, 12], ['triceps-banco', 3, 12], ['peso-muerto', 3, 10], ['plancha', 3, 30]],
    [['zancadas-caminando', 3, 12], ['puente-gluteos', 4, 15], ['abdominales-bicicleta', 3, 20], ['plancha-lateral', 3, 20]],
    [['sentadilla-sumo', 4, 12], ['patada-gluteo', 3, 15], ['elevacion-gemelos', 3, 20], ['abductores', 3, 15], ['abdominales-crunch', 3, 15]],
    [['saltos-tijera', 3, 40], ['rodillas-altas', 3, 30], ['flexiones-rodillas', 3, 10], ['superman', 3, 12], ['elevacion-piernas', 3, 12]],
    [['plancha', 3, 30], ['plancha-lateral', 3, 20], ['superman', 3, 12], ['abdominales-crunch', 3, 15]],
  ];
  const plantilla = k => PLANTILLAS[k % PLANTILLAS.length].map(([id, series, v]) => ({ id, series, v, rest: 60 }));

  /* =====================  ÍCONOS (SVG propios)  ===================== */
  const svg = (d, w = 2.4, extra = '') =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const I = {
    back: svg('<path d="M15 4.5 7.5 12l7.5 7.5"/>', 2.8),
    menu: svg('<path d="M3.5 6h17M3.5 12h17M3.5 18h17"/>', 3),
    close: svg('<path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/>', 2.8),
    eye: svg('<path d="M2 12s3.7-7 10-7 10 7 10 7-3.7 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', 2.2),
    eyeOff: svg('<path d="M2 12s3.7-7 10-7 10 7 10 7-3.7 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16"/>', 2.2),
    cal: svg('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/>', 2),
    dumb: svg('<path d="M3 9.5v5M6.5 6.5v11M6.5 12h11M17.5 6.5v11M21 9.5v5"/>', 2.1),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7"/>', 3),
    plus: svg('<path d="M12 5v14M5 12h14"/>', 2.8),
    minus: svg('<path d="M5 12h14"/>', 2.8),
    search: svg('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>', 2.2),
    chev: svg('<path d="M9 4.5l7.5 7.5L9 19.5"/>', 2.6),
    chevL: svg('<path d="M15 4.5 7.5 12l7.5 7.5"/>', 2.6),
    person: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>', 2.2),
    target: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>', 2),
    weight: svg('<path d="M7 9.5h10l2 10.5H5z"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0"/>', 2),
    logout: svg('<path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3"/><path d="M16 8l4 4-4 4M20 12H9"/>', 2.2),
  };

  /* =====================  ESTADO  ===================== */
  // Datos de conexión de Supabase. La clave "publishable" es pública por diseño:
  // lo que protege los datos son las reglas de seguridad (RLS) de la base.
  const SUPABASE_URL = 'https://ukrgvtililjozyzwooie.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_wJfUcKd-pXpmaXJMdwP4yA_ospcOjFf';

  let sb = null;        // cliente de Supabase
  let listo = false;    // true cuando ya se revisó si hay una sesión abierta
  const vacio = () => ({ session: null, uid: null, users: {}, data: {} });
  let db = vacio();     // copia en memoria de los datos de la usuaria; la base de datos es la fuente real
  const D = () => (db.session ? db.data[db.session] : null);
  const U = () => (db.session ? db.users[db.session] : null);
  const newData = () => ({ profile: { peso: '', objetivo: '', inicio: '' }, dias: [], rutina: null, ciclo: {}, hechos: {}, completo: false });

  // Estado de pantalla (no se guarda en ningún lado)
  const ui = {
    loginErr: null, loginVals: { mail: '', pass: '' }, regErr: {}, regVals: { nombre: '', mail: '', pass: '' },
    verPass: false, datosErr: {}, pesoTmp: null,
    objSel: null, fechaSel: null, fechaMes: null, cicloMes: null,
    diasSel: null, rutinaErr: false, filtro: 'Todos', busca: '', cfg: null, tab: null,
  };

  /* =====================  UTILIDADES  ===================== */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const hoy = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const wdow = d => (d.getDay() + 6) % 7;                       // 0 = lunes
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const fmtFecha = s => { if (!s) return ''; const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; };
  const lunesISO = () => { const d = hoy(); d.setDate(d.getDate() - wdow(d)); return iso(d); };
  const proxLunes = () => { const d = hoy(); const w = wdow(d); if (w) d.setDate(d.getDate() + (7 - w)); return d; };
  const emailOk = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const go = p => { if (location.hash === '#/' + p) route(); else location.hash = '#/' + p; };

  const datosOk = () => { const p = D().profile; return !!(p.peso && p.objetivo && p.inicio); };
  const home = () => {
    const d = D();
    if (d.completo && d.rutina) return 'ejercicios';
    if (!datosOk()) return 'datos';
    if (!d.rutina) return 'dias';
    return 'lista';
  };
  const textoInicio = s => { if (!s) return ''; const d = parse(s); return `Empezás el ${DIAS[wdow(d)].toLowerCase()} ${d.getDate()} de ${MESES[d.getMonth()]}`; };
  const nEj = n => `${n} ${n === 1 ? 'ejercicio' : 'ejercicios'}`;
  const resumen = it => { const e = ex(it.id); return it.series + (e.u === 's' ? ` series · ${it.v} segundos` : ` series · ${it.v} repeticiones`); };
  const corto = it => { const e = ex(it.id); return `${it.series} × ${it.v}${e.u === 's' ? ' seg' : ''}`; };

  /* =====================  BASE DE DATOS (Supabase)  ===================== */
  const MSG_RED = 'No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.';
  const esRed = e => !!e && /failed to fetch|networkerror|load failed|network request failed|fetch failed/i.test(String(e.message || e));
  const ver = r => { if (r && r.error) throw r.error; return r ? r.data : null; };   // lanza el error si la consulta falló
  const ocupado = (form, on) => { const b = form && form.querySelector('button[type=submit]'); if (b && b.isConnected) { b.disabled = on; b.setAttribute('aria-busy', on); } };

  let avisoT;
  function aviso(msg) {
    const t = $('#aviso'); if (!t) return;
    t.textContent = msg; t.classList.add('on');
    clearTimeout(avisoT); avisoT = setTimeout(() => t.classList.remove('on'), 4500);
  }

  // Los cambios se guardan de a uno y en orden, sin frenar la pantalla.
  let cola = Promise.resolve();
  function encolar(fn) {
    cola = cola.then(fn).catch(e => {
      console.error(e);
      aviso(esRed(e) ? 'No se pudo guardar: sin conexión.' : 'No se pudo guardar el último cambio. Probá de nuevo.');
    });
    return cola;
  }

  function guardarPerfil() {
    return encolar(async () => {
      const d = D(); if (!d || !db.uid) return;
      const p = d.profile, peso = parseFloat(p.peso);
      ver(await sb.from('perfiles').upsert({
        id: db.uid, nombre: (U() && U().nombre) || null,
        peso: Number.isFinite(peso) ? peso : null,
        objetivo: p.objetivo || null, fecha_inicio: p.inicio || null, rutina_completa: !!d.completo,
      }, { onConflict: 'id' }));
    });
  }

  // Guarda un día de la rutina: lo crea si hace falta y reemplaza sus ejercicios.
  async function sincDia(k) {
    const d = D(); if (!d || !db.uid || !d.rutina || !d.rutina[k]) return;
    const dia = d.rutina[k], semana = d.dias[k];
    const filas = ver(await sb.from('dias_rutina').upsert({ usuaria_id: db.uid, dia_semana: semana }, { onConflict: 'usuaria_id,dia_semana' }).select('id'));
    dia.diaId = filas[0].id;
    ver(await sb.from('dia_ejercicios').delete().eq('dia_id', dia.diaId));
    if (dia.items.length) {
      ver(await sb.from('dia_ejercicios').insert(dia.items.map((it, i) => ({
        dia_id: dia.diaId, ejercicio_id: it.id, series: it.series, valor: it.v, descanso_seg: it.rest, orden: i,
      }))));
    }
  }
  function guardarDia(k) { return encolar(() => sincDia(k)); }
  function guardarRutina() {
    return encolar(async () => {
      const d = D(); if (!d || !db.uid || !d.rutina) return;
      for (let k = 0; k < d.dias.length; k++) await sincDia(k);
      ver(await sb.from('dias_rutina').delete().eq('usuaria_id', db.uid).not('dia_semana', 'in', `(${d.dias.join(',')})`));
    });
  }
  function guardarCiclo(fecha, marcado) {
    return encolar(async () => {
      if (!db.uid) return;
      if (marcado) ver(await sb.from('ciclo').upsert({ usuaria_id: db.uid, fecha }, { onConflict: 'usuaria_id,fecha' }));
      else ver(await sb.from('ciclo').delete().eq('usuaria_id', db.uid).eq('fecha', fecha));
    });
  }
  function guardarHecho(k, ejercicioId, hecho, semana) {
    return encolar(async () => {
      const d = D(), dia = d && d.rutina && d.rutina[k];
      if (!db.uid || !dia || !dia.diaId) return;
      if (hecho) ver(await sb.from('ejercicios_hechos').upsert({ usuaria_id: db.uid, semana, dia_id: dia.diaId, ejercicio_id: ejercicioId }, { onConflict: 'usuaria_id,semana,dia_id,ejercicio_id' }));
      else ver(await sb.from('ejercicios_hechos').delete().eq('usuaria_id', db.uid).eq('semana', semana).eq('dia_id', dia.diaId).eq('ejercicio_id', ejercicioId));
    });
  }

  // Trae de la base todo lo de la usuaria y lo deja en memoria.
  async function cargarTodo(user) {
    const uid = user.id, mail = (user.email || '').toLowerCase();
    const [perf, dias, cicl, hech, cat] = await Promise.all([
      sb.from('perfiles').select('*').eq('id', uid).maybeSingle(),
      sb.from('dias_rutina').select('id, dia_semana, dia_ejercicios(ejercicio_id, series, valor, descanso_seg, orden)').eq('usuaria_id', uid).order('dia_semana'),
      sb.from('ciclo').select('fecha').eq('usuaria_id', uid),
      sb.from('ejercicios_hechos').select('semana, dia_id, ejercicio_id').eq('usuaria_id', uid),
      sb.from('ejercicios').select('*'),
    ]);
    [perf, dias, cicl, hech].forEach(r => { if (r.error) throw r.error; });

    // Catálogo: si la base lo devuelve, se usa ese (en el mismo orden del diseño).
    if (!cat.error && cat.data && cat.data.length) {
      const orden = CAT.map(e => e.id), pos = id => { const i = orden.indexOf(id); return i < 0 ? 999 : i; };
      const nuevo = cat.data.map(e => ({ id: e.id, nombre: e.nombre, grupos: e.grupos || [], u: e.unidad, s: e.series_sug, v: e.valor_sug }));
      nuevo.sort((a, b) => pos(a.id) - pos(b.id));
      CAT.splice(0, CAT.length, ...nuevo);
    }

    const p = perf.data || {};
    const nombre = p.nombre || (user.user_metadata && user.user_metadata.nombre) || '';
    const data = newData();
    data.profile = { peso: p.peso != null ? String(p.peso) : '', objetivo: p.objetivo || '', inicio: p.fecha_inicio || '' };
    data.completo = !!p.rutina_completa;
    const filas = (dias.data || []).slice().sort((a, b) => a.dia_semana - b.dia_semana);
    if (filas.length) {
      data.dias = filas.map(r => r.dia_semana);
      data.rutina = filas.map(r => ({
        diaId: r.id,
        items: (r.dia_ejercicios || []).slice().sort((a, b) => a.orden - b.orden)
          .filter(x => ex(x.ejercicio_id)).map(x => ({ id: x.ejercicio_id, series: x.series, v: x.valor, rest: x.descanso_seg })),
      }));
    }
    (cicl.data || []).forEach(r => { data.ciclo[r.fecha] = true; });
    const idx = {}; filas.forEach((r, k) => { idx[r.id] = k; });
    (hech.data || []).forEach(r => {
      if (idx[r.dia_id] === undefined) return;
      const key = `${r.semana}:${idx[r.dia_id]}`;
      (data.hechos[key] = data.hechos[key] || {})[r.ejercicio_id] = true;
    });
    db = { session: mail, uid, users: { [mail]: { nombre } }, data: { [mail]: data } };
  }

  function limpiarSesion() {
    db = vacio();
    ui.loginVals = { mail: '', pass: '' }; ui.regVals = { nombre: '', mail: '', pass: '' };
    ui.loginErr = null; ui.regErr = {}; ui.tab = null; ui.cicloMes = null; ui.cfg = null; ui.diasSel = null;
  }

  const vCargando = () => `<div class="screen"><div class="body"><div class="center-col"><img class="load-logo" src="img/logo-claro.png" alt="Rutina Fit"><p class="sub c" style="margin-top:18px">Cargando…</p></div></div></div>`;
  const vErrorCarga = red => `<div class="screen"><div class="body"><div class="center-col"><img class="load-logo" src="img/logo-claro.png" alt="Rutina Fit">
      <h1 class="h1 c" style="margin-top:28px;font-size:24px">${red ? 'No pudimos conectarnos' : 'Algo salió mal'}</h1>
      <p class="sub c" style="max-width:300px">${red ? 'Revisá tu conexión a internet e intentá de nuevo.' : 'No pudimos cargar tus datos. Intentá de nuevo.'}</p></div>
      <div class="cta"><button class="btn" data-act="recargar">Reintentar</button>${red ? '' : '<button class="btn outline" data-act="salir-forzado">Cerrar sesión</button>'}</div></div></div>`;

  async function iniciar() {
    $('#view').innerHTML = vCargando();
    let red = false;
    try {
      if (!window.supabase || !window.supabase.createClient) { red = true; throw new Error('Failed to fetch (librería no disponible)'); }
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      sb.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_OUT' && db.session) { limpiarSesion(); go('bienvenida'); } });
      const r = await sb.auth.getSession();
      if (r.error) throw r.error;
      if (r.data.session) await cargarTodo(r.data.session.user);
    } catch (e) {
      console.error(e);
      $('#view').innerHTML = vErrorCarga(red || esRed(e));
      return;
    }
    listo = true;
    route();
  }

  /* =====================  PIEZAS DE INTERFAZ  ===================== */
  const logoHdr = '<span class="hlogo"><img src="img/logo-claro.png" alt="Rutina Fit"></span>';
  function hdr({ back, menu = true } = {}) {
    return `<header class="hdr">${back ? `<button class="ib back" data-go="${back}" aria-label="Volver">${I.back}</button>` : ''}${logoHdr}${menu ? `<button class="ib menu" data-act="menu" aria-label="Abrir menú">${I.menu}</button>` : ''}</header>`;
  }
  const prog = s => `<div class="prog" role="img" aria-label="Progreso del registro">${s.map(x => `<i class="${x}"></i>`).join('')}</div><div class="prog-l"><span>Cuenta</span><span>Tus datos</span><span>Tu rutina</span></div>`;
  const err = m => `<div class="errbox" role="alert"><i>!</i><span>${esc(m)}</span></div>`;
  const eyeBtn = () => `<button type="button" class="eye" data-act="eye" aria-label="${ui.verPass ? 'Ocultar' : 'Mostrar'} contraseña">${ui.verPass ? I.eyeOff : I.eye}</button>`;
  const stepper = (n, s) => {
    const dot = (cls, inner) => `<div class="dot ${cls}">${inner}</div>`;
    return `<div class="steps3">${n.map((t, i) => `<div class="st">${dot(s[i][0], s[i][1])}<p>${t}</p></div>`).join('')}</div>`;
  };

  function calendario({ mes, modo }) {
    const y = mes.getFullYear(), m = mes.getMonth();
    const primero = wdow(new Date(y, m, 1));
    const total = new Date(y, m + 1, 0).getDate();
    const t = hoy(), d = D();
    let cel = '';
    for (let i = 0; i < primero; i++) cel += '<div class="cal-d void"></div>';
    for (let n = 1; n <= total; n++) {
      const f = `${y}-${pad(m + 1)}-${pad(n)}`, fd = new Date(y, m, n);
      const esHoy = fd.getTime() === t.getTime();
      let cls = 'cal-d', inner = n, attr = '';
      if (modo === 'fecha') {
        const pasado = fd < t;
        if (pasado) { cls += ' past'; attr = 'disabled'; }
        else attr = `data-act="fecha-dia" data-f="${f}"`;
        if (esHoy) cls += ' today';
        if (ui.fechaSel === f) cls += ' sel';
      } else {
        attr = `data-act="ciclo-dia" data-f="${f}"`;
        if (esHoy) cls += ' today';
        if (d.ciclo[f]) { cls += ' mark'; inner = I.check; }
      }
      cel += `<button class="${cls}" ${attr} aria-label="${n} de ${MESES[m]}${d.ciclo[f] && modo === 'ciclo' ? ', marcado' : ''}">${inner}</button>`;
    }
    const antDis = modo === 'fecha' && new Date(y, m, 1) <= new Date(t.getFullYear(), t.getMonth(), 1);
    return `<div class="cal">
      <div class="cal-h"><button data-act="mes" data-d="-1" ${antDis ? 'disabled' : ''} aria-label="Mes anterior">${I.chevL}</button><h2>${cap(MESES[m])} ${y}</h2><button data-act="mes" data-d="1" aria-label="Mes siguiente">${I.chev}</button></div>
      <div class="cal-g">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(x => `<div class="cal-w">${x}</div>`).join('')}${cel}</div></div>`;
  }

  /* =====================  VISTAS  ===================== */
  function vBienvenida() {
    return `<div class="welcome">
      <div class="wlogo"><img src="img/logo-completo.png" alt="Rutina Fit"></div>
      <div class="wcard"><h1>Entrená a tu ritmo,<br>en tu día a día.</h1>
        <div class="stack"><button class="btn white" data-go="login">Iniciar sesión</button><button class="btn line-white" data-go="registro">Registrarme</button></div></div></div>`;
  }

  function vLogin() {
    const e = ui.loginErr, v = ui.loginVals;
    let stepsHtml;
    if (e && e.tipo === 'pass') {
      stepsHtml = stepper(['Gmail ingresado', 'Corregí tu contraseña', '¡Listo, a entrenar!'], [['', I.check], ['err', '!'], ['off', '3']]);
    } else if (e && e.tipo === 'mail') {
      stepsHtml = stepper(['Revisá tu Gmail', 'Escribí tu contraseña', '¡Listo, a entrenar!'], [['err', '!'], ['off', '2'], ['off', '3']]);
    } else {
      stepsHtml = stepper(['Ingresá tu Gmail', 'Escribí tu contraseña', '¡Listo, a entrenar!'], [['', '1'], ['', '2'], ['d', '3']]);
    }
    return `<div class="screen">${hdr({ back: 'bienvenida', menu: false })}
      <form class="body" data-form="login" novalidate>
        <div class="title-block"><h1 class="h1">Iniciar sesión</h1><p class="sub">${e ? 'Revisá tus datos y volvé a intentar.' : 'Seguí estos pasos para entrar a tu cuenta.'}</p></div>
        ${stepsHtml}
        <div class="field"><label class="lbl" for="f-mail">Gmail</label>
          <div class="inp ${e && e.tipo === 'mail' ? 'err' : ''}"><input id="f-mail" name="mail" type="email" autocomplete="email" inputmode="email" value="${esc(v.mail)}" placeholder="tucorreo@gmail.com"></div>
          ${e && e.tipo === 'mail' ? err(e.msg) : ''}</div>
        <div class="field"><label class="lbl" for="f-pass">Contraseña</label>
          <div class="inp ${e && e.tipo === 'pass' ? 'err' : ''}"><input id="f-pass" name="pass" type="${ui.verPass ? 'text' : 'password'}" autocomplete="current-password" value="${esc(v.pass)}" placeholder="Tu contraseña">${eyeBtn()}</div>
          ${e && e.tipo === 'pass' ? err(e.msg) : ''}</div>
        <a class="link-r" href="#/olvide" data-act="olvide">¿Olvidaste tu contraseña?</a>
        <div class="cta"><button class="btn" type="submit">Iniciar sesión</button></div>
        <p class="foot">¿Todavía no tenés cuenta? <a href="#/registro">Registrate</a></p>
      </form></div>`;
  }

  function vRegistro() {
    const e = ui.regErr, v = ui.regVals;
    return `<div class="screen">${hdr({ back: 'bienvenida', menu: false })}
      <form class="body" data-form="registro" novalidate>
        ${prog(['v', 'l', 'l'])}
        <div class="title-block"><h1 class="h1">Crear cuenta</h1><p class="sub">Completá estos datos para empezar tu recorrido.</p></div>
        <div class="field"><label class="lbl" for="r-nombre">Nombre completo</label>
          <div class="inp ${e.nombre ? 'err' : ''}"><input id="r-nombre" name="nombre" type="text" autocomplete="name" value="${esc(v.nombre)}" placeholder="Tu nombre y apellido"></div>${e.nombre ? err(e.nombre) : ''}</div>
        <div class="field"><label class="lbl" for="r-mail">Gmail</label>
          <div class="inp ${e.mail ? 'err' : ''}"><input id="r-mail" name="mail" type="email" autocomplete="email" inputmode="email" value="${esc(v.mail)}" placeholder="tucorreo@gmail.com"></div>${e.mail ? err(e.mail) : ''}</div>
        <div class="field"><label class="lbl" for="r-pass">Contraseña</label>
          <div class="inp ${e.pass ? 'err' : ''}"><input id="r-pass" name="pass" type="${ui.verPass ? 'text' : 'password'}" autocomplete="new-password" value="${esc(v.pass)}" placeholder="Tu contraseña">${eyeBtn()}</div>
          ${e.pass ? err(e.pass) : '<p class="hint">Usá al menos 8 caracteres.</p>'}</div>
        <div class="cta"><button class="btn" type="submit">Crear cuenta</button></div>
        <p class="foot">¿Ya tenés cuenta? <a href="#/login">Iniciá sesión</a></p>
      </form></div>`;
  }

  function vCuentaCreada() {
    return `<div class="screen">${hdr({ menu: false })}
      <div class="body">${prog(['d', 'l', 'l'])}
        <div class="center-col"><div class="badge-ok"><b>${I.check}</b></div>
          <h1 class="h1">¡Cuenta creada!</h1><p class="sub c" style="max-width:300px">Ahora completá tus datos para armar una rutina pensada para vos.</p></div>
        <div class="cta"><button class="btn" data-go="datos">Continuar</button></div></div></div>`;
  }

  function vDatos(edit) {
    const p = D().profile, e = ui.datosErr;
    const peso = ui.pesoTmp !== null ? ui.pesoTmp : p.peso;
    const base = edit ? 'editar' : 'datos';
    return `<div class="screen">${hdr({ back: edit ? 'perfil' : null })}
      <form class="body" data-form="datos" data-edit="${edit ? 1 : 0}" novalidate>
        ${edit ? '' : prog(['d', 'v', 'l'])}
        <div class="title-block"><h1 class="h1">${edit ? 'Editar datos' : 'Tus datos'}</h1><p class="sub">Con esto armamos tu rutina y seguimos tu progreso.</p></div>
        <div class="field"><label class="lbl" for="d-peso">Peso en kg</label>
          <div class="inp ${e.peso ? 'err' : ''}"><input id="d-peso" name="peso" type="text" inputmode="decimal" autocomplete="off" value="${esc(peso)}" placeholder="50"><span class="suf">kg</span></div>${e.peso ? err(e.peso) : ''}</div>
        <div class="field"><span class="lbl">Objetivo</span>
          <button type="button" class="inp sel ${e.objetivo ? 'err' : ''}" data-act="ir" data-to="objetivo/${base}"><span class="${p.objetivo ? '' : 'ph'}">${esc(p.objetivo || 'Elegí tu objetivo')}</span><span class="ico-r">${I.chev}</span></button>${e.objetivo ? err(e.objetivo) : ''}</div>
        <div class="field"><span class="lbl">Fecha de inicio</span>
          <button type="button" class="inp sel ${e.inicio ? 'err' : ''}" data-act="ir" data-to="fecha/${base}"><span class="${p.inicio ? '' : 'ph'}">${p.inicio ? fmtFecha(p.inicio) : 'Elegí una fecha'}</span><span class="ico-r">${I.cal}</span></button>${e.inicio ? err(e.inicio) : ''}</div>
        <div class="cta"><button class="btn" type="submit">${edit ? 'Guardar cambios' : 'Continuar'}</button></div>
      </form></div>`;
  }

  function vObjetivo([from]) {
    const back = from === 'editar' ? 'editar' : 'datos';
    if (ui.objSel === null) ui.objSel = D().profile.objetivo;
    return `<div class="screen">${hdr({ back })}
      <div class="body"><div class="title-block"><h1 class="h1">Elegí tu objetivo</h1><p class="sub">Podés cambiarlo cuando quieras desde tu perfil.</p></div>
        <div class="opts" role="radiogroup" aria-label="Objetivo">${OBJETIVOS.map(o => `<button class="opt ${ui.objSel === o ? 'on' : ''}" role="radio" aria-checked="${ui.objSel === o}" data-act="obj" data-v="${esc(o)}"><span>${esc(o)}</span>${ui.objSel === o ? I.check : ''}</button>`).join('')}</div>
        <div class="cta"><button class="btn" data-act="obj-guardar" data-back="${back}">Guardar objetivo</button></div></div></div>`;
  }

  function vFecha([from]) {
    const back = from === 'editar' ? 'editar' : 'datos';
    if (ui.fechaSel === null) ui.fechaSel = D().profile.inicio || iso(proxLunes());
    if (!ui.fechaMes) { const s = parse(ui.fechaSel); ui.fechaMes = new Date(s.getFullYear(), s.getMonth(), 1); }
    return `<div class="screen">${hdr({ back })}
      <div class="body"><div class="title-block"><h1 class="h1">Fecha de inicio</h1><p class="sub">¿Cuándo querés empezar a entrenar?</p></div>
        ${calendario({ mes: ui.fechaMes, modo: 'fecha' })}
        ${ui.fechaSel ? `<div class="banner">${I.cal}<span>${textoInicio(ui.fechaSel)}</span></div>` : ''}
        <div class="cta"><button class="btn" data-act="fecha-ok" data-back="${back}">Confirmar fecha</button></div></div></div>`;
  }

  function vDias() {
    const d = D();
    if (!ui.diasSel) ui.diasSel = d.dias.length ? [...d.dias] : [...DIAS_DEFAULT[4]];
    const sel = ui.diasSel, n = sel.length;
    return `<div class="screen">${hdr({ back: 'datos' })}
      <div class="body">${prog(['d', 'd', 'v'])}
        <div class="title-block" style="margin-top:16px"><h1 class="h1">¿Cuántos días querés entrenar por semana?</h1><p class="sub">Elegí de 1 a 7 días, o tocá cada día de la lista.</p></div>
        <div class="card-l"><div class="top"><b>Días por semana</b><span class="pill-pink">${n} ${n === 1 ? 'día' : 'días'}</span></div>
          <div class="nums">${[1, 2, 3, 4, 5, 6, 7].map(i => `<button class="${i === n ? 'on' : ''}" data-act="dias-n" data-n="${i}" aria-label="${i} ${i === 1 ? 'día' : 'días'}">${i}</button>`).join('')}</div></div>
        <div class="wk-h"><span>TU SEMANA</span><span>ENTRENÓ</span></div>
        <div class="wk">${DIAS.map((nombre, w) => `<button class="${sel.includes(w) ? 'on' : ''}" data-act="dias-t" data-w="${w}" aria-pressed="${sel.includes(w)}"><span>${nombre}</span><em>${sel.includes(w) ? 'SÍ' : 'Descanso'}</em></button>`).join('')}</div>
        <div class="cta"><button class="btn" data-act="dias-ok">Armar mi rutina</button></div></div></div>`;
  }

  function vRutina() {
    const d = D(), listos = d.rutina.filter(r => r.items.length).length, n = d.dias.length;
    return `<div class="screen">${hdr({ back: 'dias' })}
      <div class="body">${prog(['d', 'd', 'd'])}
        <div class="title-block"><h1 class="h1">Armá tu rutina</h1><p class="sub">Tocá un día para ver o cambiar sus ejercicios.</p></div>
        <div class="avance"><span>Avance</span><span>${listos} de ${n} ${n === 1 ? 'día listo' : 'días listos'}</span></div>
        <div class="segs pink">${d.dias.map((_, k) => `<i class="${d.rutina[k].items.length ? 'on' : ''}"></i>`).join('')}</div>
        <div>${d.dias.map((w, k) => `<button class="daycard" data-go="dia/${k}"><span class="c">Día ${k + 1}</span><span><h3>${DIAS[w]}</h3><p>${d.rutina[k].items.length ? `${nEj(d.rutina[k].items.length)} cargados`.replace('ejercicio cargados', 'ejercicio cargado') : 'Sin ejercicios cargados'}</p></span>${I.chev}</button>`).join('')}</div>
        ${ui.rutinaErr ? err('Cargá al menos un ejercicio en cada día para guardar tu rutina.') : ''}
        <div class="cta"><button class="btn" data-act="rutina-ok">Guardar rutina</button></div></div></div>`;
  }

  const tabsHtml = (d, k, ruta) => `<div class="tabs" role="tablist">${d.dias.map((w, i) => `<button role="tab" class="${i === k ? 'on' : ''}" aria-selected="${i === k}" data-go="${ruta}/${i}">${CORTO[w]}</button>`).join('')}</div>`;

  function vDia([kk]) {
    const d = D(), k = Math.min(Math.max(parseInt(kk, 10) || 0, 0), d.dias.length - 1), items = d.rutina[k].items;
    return `<div class="screen">${hdr({ back: 'rutina' })}
      <div class="body">${tabsHtml(d, k, 'dia')}
        <div class="rowhead"><h1 class="h1">${DIAS[d.dias[k]]} · Día ${k + 1}</h1><span>${nEj(items.length)}</span></div>
        <div class="xlist">${items.length ? items.map((it, i) => `<button class="xrow" data-go="config/${k}/${it.id}"><span class="ib2">${I.dumb}</span><span class="tx"><h3>${esc(ex(it.id).nombre)}</h3><p>${resumen(it)}</p></span>${I.chev}</button>`).join('') : '<p class="empty">Todavía no cargaste ejercicios para este día.</p>'}</div>
        <div class="cta"><button class="btn outline" data-go="agregar/${k}">${I.plus}<span>Agregar ejercicio</span></button><button class="btn" data-go="rutina">Guardar día</button></div></div></div>`;
  }

  function listaAgregar(k) {
    const d = D(), items = d.rutina[k].items, q = ui.busca.trim().toLowerCase();
    const l = CAT.filter(e => (ui.filtro === 'Todos' || e.grupos.includes(ui.filtro)) && (!q || e.nombre.toLowerCase().includes(q)));
    if (!l.length) return '<p class="empty">No encontramos ejercicios con ese filtro.</p>';
    return l.map(e => {
      const ya = items.some(it => it.id === e.id);
      return `<button class="xrow" data-go="config/${k}/${e.id}${ya ? '' : '/nuevo'}"><span class="ib2">${I.dumb}</span><span class="tx"><h3>${esc(e.nombre)}</h3><p>${etiqueta(e.grupos)}${ya ? ' · Ya agregado' : ''}</p></span><span class="rc ${ya ? 'in' : 'plus'}">${ya ? I.check : I.plus}</span></button>`;
    }).join('');
  }

  function vAgregar([kk]) {
    const d = D(), k = Math.min(Math.max(parseInt(kk, 10) || 0, 0), d.dias.length - 1);
    return `<div class="screen">${hdr({ back: `dia/${k}` })}
      <div class="body"><div class="title-block"><h1 class="h1">Agregar ejercicio</h1><p class="sub" style="margin-top:4px">Se suma al ${DIAS[d.dias[k]]} · Día ${k + 1}</p></div>
        <div class="search"><div class="inp"><span class="ico-l">${I.search}</span><input type="search" id="buscar" placeholder="Buscar ejercicio" value="${esc(ui.busca)}" aria-label="Buscar ejercicio" autocomplete="off"></div></div>
        <div class="chips" role="tablist">${GRUPOS.map(g => `<button class="chip ${ui.filtro === g ? 'on' : ''}" role="tab" aria-selected="${ui.filtro === g}" data-act="filtro" data-g="${g}">${g}</button>`).join('')}</div>
        <div class="xlist" id="lista-add" style="margin-top:6px">${listaAgregar(k)}</div>
        <div class="cta sticky"><button class="btn" data-go="dia/${k}">Listo</button></div></div></div>`;
  }

  function vConfig([kk, id, nuevo]) {
    const d = D(), k = Math.min(Math.max(parseInt(kk, 10) || 0, 0), d.dias.length - 1), e = ex(id);
    if (!e) return vDia([k]);
    const items = d.rutina[k].items, existente = items.find(it => it.id === id);
    if (!ui.cfg || ui.cfg.k !== k || ui.cfg.id !== id) {
      ui.cfg = existente ? { k, id, series: existente.series, v: existente.v, rest: existente.rest } : { k, id, series: e.s, v: e.v, rest: 60 };
    }
    const c = ui.cfg, esNuevo = !existente;
    const fila = (lab, campo, val) => `<div class="steprow"><b>${lab}</b><div class="ctl"><button class="rnd m" data-act="cfg" data-f="${campo}" data-s="-1" aria-label="Menos ${lab.toLowerCase()}">${I.minus}</button><span class="val" aria-live="polite">${val}</span><button class="rnd p" data-act="cfg" data-f="${campo}" data-s="1" aria-label="Más ${lab.toLowerCase()}">${I.plus}</button></div></div>`;
    return `<div class="screen">${hdr({ back: esNuevo ? `agregar/${k}` : `dia/${k}` })}
      <div class="body"><div class="hero">${I.dumb}</div>
        <div class="title-block" style="margin-top:22px"><h1 class="h1">${esc(e.nombre)}</h1><p class="sub" style="margin-top:4px">${e.grupos[0]} · ${DIAS[d.dias[k]]}, Día ${k + 1}</p></div>
        <div style="margin-top:6px">${fila('Series', 'series', c.series)}${fila(e.u === 's' ? 'Segundos' : 'Repeticiones', 'v', c.v)}${fila('Descanso (seg)', 'rest', c.rest)}</div>
        <div class="cta">${esNuevo ? '' : `<button class="btn outline" data-act="cfg-quitar">Quitar del día</button>`}<button class="btn" data-act="cfg-ok" data-nuevo="${esNuevo ? 1 : 0}">${esNuevo ? `Agregar al día ${k + 1}` : 'Guardar cambios'}</button></div></div></div>`;
  }

  function vListaReal() {
    const d = D(), n = d.dias.length;
    return `<div class="screen">${hdr({ back: 'rutina' })}
      <div class="body">${prog(['d', 'd', 'd'])}
        <div style="text-align:center;margin-top:18px"><div class="badge-ok sm"><b>${I.check}</b></div>
          <h1 class="h1 c" style="margin-top:18px">¡Tu rutina está lista!</h1>
          <p class="sub c" style="max-width:300px;margin:8px auto 0">Entrenás ${n} ${n === 1 ? 'día' : 'días'} por semana. Podés cambiarla cuando quieras.</p></div>
        <div class="sumcard">${d.dias.map((w, k) => `<div><b>${DIAS[w]}</b><span>${nEj(d.rutina[k].items.length)}</span></div>`).join('')}</div>
        ${d.profile.inicio ? `<div class="banner orange">${I.cal}<span>${textoInicio(d.profile.inicio)}</span></div>` : ''}
        <div class="cta"><button class="btn" data-act="lista-ciclo">Continuar registro</button><button class="btn" data-act="lista-ej">Ir a mis ejercicios</button></div></div></div>`;
  }

  function tabInicial(d) {
    const w = wdow(hoy()); let k = d.dias.findIndex(x => x >= w); if (k < 0) k = 0; return k;
  }

  function vEjercicios([kk]) {
    const d = D();
    let k = parseInt(kk, 10);
    if (!(k >= 0 && k < d.dias.length)) k = ui.tab !== null && ui.tab < d.dias.length ? ui.tab : tabInicial(d);
    ui.tab = k;
    const items = d.rutina[k].items, h = d.hechos[`${lunesISO()}:${k}`] || {};
    const hechos = items.filter(it => h[it.id]).length;
    return `<div class="screen">${hdr({})}
      <div class="body"><div class="title-block" style="margin-top:6px"><h1 class="h1">Mis ejercicios</h1><p class="sub" style="margin-top:4px">${DIAS[d.dias[k]]} · Día ${k + 1}</p></div>
        <div style="margin-top:4px">${tabsHtml(d, k, 'ejercicios')}</div>
        <div class="avance" style="margin-top:18px"><span>Progreso de hoy</span><span>${hechos} de ${items.length}</span></div>
        <div class="segs vio">${items.map((_, i) => `<i class="${i < hechos ? 'on' : ''}"></i>`).join('')}</div>
        <div class="xlist">${items.length ? items.map(it => { const ok = !!h[it.id]; return `<button class="xrow" data-act="hecho" data-k="${k}" data-id="${it.id}" aria-pressed="${ok}"><span class="ib2">${I.dumb}</span><span class="tx"><h3>${esc(ex(it.id).nombre)}</h3><p>${corto(it)}${ok ? ' · hecho' : ''}</p></span><span class="rc ${ok ? 'ck' : 'ring'}">${ok ? I.check : ''}</span></button>`; }).join('') : '<p class="empty">Este día no tiene ejercicios cargados.</p>'}</div>
      </div></div>`;
  }

  function vCiclo() {
    const d = D();
    if (!ui.cicloMes) { const t = hoy(); ui.cicloMes = new Date(t.getFullYear(), t.getMonth(), 1); }
    const y = ui.cicloMes.getFullYear(), m = ui.cicloMes.getMonth();
    const n = Object.keys(d.ciclo).filter(f => { const x = parse(f); return x.getFullYear() === y && x.getMonth() === m; }).length;
    return `<div class="screen">${hdr({})}
      <div class="body"><div class="title-block" style="margin-top:6px"><h1 class="h1">Mi ciclo</h1><p class="sub" style="margin-top:4px">Tocá los días en que tuviste tu período.</p></div>
        ${calendario({ mes: ui.cicloMes, modo: 'ciclo' })}
        <div class="legend"><span><i class="p">${I.check}</i>Día de período</span><span><i class="h"></i>Hoy</span></div>
        ${n ? `<div class="banner" style="margin-top:14px">${n} ${n === 1 ? 'día marcado' : 'días marcados'} en ${MESES[m]}</div>` : ''}
        <div class="cta"><button class="btn ${n ? '' : 'soft'}" data-act="ciclo-ok">Guardar y continuar</button></div></div></div>`;
  }

  function vPerfil() {
    const d = D(), u = U(), p = d.profile;
    const fila = (ic, lab, val) => `<div class="inf"><span class="ic">${ic}</span><span><small>${lab}</small><b>${esc(val || '—')}</b></span></div>`;
    return `<div class="screen">${hdr({})}
      <div class="body"><div class="pcard"><div class="av">${I.person}</div><h2>Mi perfil</h2><p>${esc(db.session)}</p></div>
        ${fila(I.target, 'Objetivo', p.objetivo)}${fila(I.weight, 'Peso en kg', p.peso ? p.peso + ' kg' : '')}${fila(I.cal, 'Fecha de inicio', fmtFecha(p.inicio))}
        <div class="cta"><button class="btn" data-go="ejercicios">Comenzar entrenamiento</button><button class="btn outline" data-go="editar">Editar datos</button></div></div></div>`;
  }

  /* =====================  CAPAS (menú y cierre de sesión)  ===================== */
  function abrirMenu(actual) {
    const items = [['perfil', 'Perfil', I.person], ['ejercicios', 'Ejercicios', I.dumb], ['ciclo', 'Ciclo', I.cal]];
    $('#layer').innerHTML = `<div class="veil" role="dialog" aria-modal="true" aria-label="Menú"><div class="wrap"><div class="bg" data-act="menu-x"></div>
      <div class="menu-top">${logoHdr}<button class="ib menu" data-act="menu-x" aria-label="Cerrar menú">${I.close}</button></div>
      <nav class="mpanel">${items.map(([r, t, ic]) => `<button data-act="menu-go" data-r="${r}">${ic}<span>${t}</span></button>`).join('')}<button data-act="logout-ask">${I.logout}<span>Cerrar sesión</span></button></nav></div></div>`;
  }
  function cerrarCapa() { $('#layer').innerHTML = ''; }
  function abrirLogout() {
    $('#layer').innerHTML = `<div class="veil modal" role="dialog" aria-modal="true" aria-label="Cerrar sesión"><div class="wrap"><div class="bg" data-act="logout-no"></div>
      <div class="mbox"><div class="oc">${I.logout}</div><h2>¿Querés cerrar sesión?</h2><p>Vas a volver a la pantalla de inicio. Tu rutina queda guardada.</p>
        <button class="btn dark" data-act="logout-ok">Cerrar sesión</button><button class="btn outline" data-act="logout-no">Cancelar</button></div></div></div>`;
  }

  /* =====================  RUTEO  ===================== */
  const PUBLICAS = ['bienvenida', 'login', 'registro'];
  const NECESITA_RUTINA = ['rutina', 'dia', 'agregar', 'config', 'lista', 'ejercicios'];

  function route() {
    cerrarCapa();
    const h = location.hash.replace(/^#\/?/, '');
    const [name, ...args] = h.split('/');
    const logged = !!db.session && !!D();
    if (db.session && !D()) db.session = null;

    if (!logged) { if (!PUBLICAS.includes(name)) return go('bienvenida'); }
    else {
      if (PUBLICAS.includes(name) || !name) return go(home());
      if (NECESITA_RUTINA.includes(name) && !D().rutina) return go(datosOk() ? 'dias' : 'datos');
    }

    const vistas = {
      bienvenida: vBienvenida, login: vLogin, registro: vRegistro, 'cuenta-creada': vCuentaCreada,
      datos: () => vDatos(false), editar: () => vDatos(true), objetivo: vObjetivo, fecha: vFecha, dias: vDias, rutina: vRutina,
      dia: vDia, agregar: vAgregar, config: vConfig, lista: vListaReal, ejercicios: vEjercicios, ciclo: vCiclo, perfil: vPerfil,
    };
    const fn = vistas[name];
    if (!fn) return go(logged ? home() : 'bienvenida');
    if (name !== 'objetivo') ui.objSel = null;
    if (name !== 'fecha') { ui.fechaSel = null; ui.fechaMes = null; }
    if (name !== 'dias') ui.diasSel = null;
    if (name !== 'agregar' && name !== 'config') { ui.filtro = 'Todos'; ui.busca = ''; }
    if (name !== 'config') ui.cfg = null;
    if (name !== 'datos' && name !== 'editar' && name !== 'objetivo' && name !== 'fecha') { ui.pesoTmp = null; ui.datosErr = {}; }
    if (name !== 'rutina') ui.rutinaErr = false;
    if (name !== 'login') { ui.loginErr = null; }
    if (name !== 'registro') { ui.regErr = {}; }
    if (name !== 'login' && name !== 'registro') ui.verPass = false;

    $('#view').innerHTML = fn(args);
    window.scrollTo(0, 0);
    document.title = 'Rutina Fit';
    ui.actual = name;
  }
  const rerender = () => { const y = window.scrollY; route(); window.scrollTo(0, y); };

  /* =====================  ACCIONES  ===================== */
  function setDias(sel) {
    const d = D(); d.dias = [...sel].sort((a, b) => a - b);
    d.rutina = d.dias.map((_, k) => (d.rutina && d.rutina[k]) || { items: plantilla(k) });
    guardarRutina();
  }
  const limites = { series: [1, 10, 1], v: [1, 300, 1], rest: [0, 300, 5] };

  const acciones = {
    menu() { abrirMenu(ui.actual); },
    'menu-x'() { cerrarCapa(); },
    'menu-go'(el) { const r = el.dataset.r; cerrarCapa(); go(r); },
    'logout-ask'() { abrirLogout(); },
    'logout-no'() { cerrarCapa(); },
    async 'logout-ok'() {
      cerrarCapa();
      await cola;                                   // esperar a que terminen de guardarse los cambios pendientes
      try { await sb.auth.signOut(); } catch (e) { console.error(e); }
      limpiarSesion(); go('bienvenida');
    },
    recargar() { location.reload(); },
    async 'salir-forzado'() { try { await sb.auth.signOut(); } catch (e) { console.error(e); } limpiarSesion(); listo = true; go('bienvenida'); },
    eye() { const f = $('form'); if (f) { const v = {}; new FormData(f).forEach((x, k) => v[k] = x); if (f.dataset.form === 'login') ui.loginVals = { mail: v.mail || '', pass: v.pass || '' }; if (f.dataset.form === 'registro') ui.regVals = { nombre: v.nombre || '', mail: v.mail || '', pass: v.pass || '' }; } ui.verPass = !ui.verPass; rerender(); },
    olvide(el, ev) { ev.preventDefault(); alert('Por ahora la contraseña no se puede recuperar desde la app. Si no la recordás, creá una cuenta nueva con otro Gmail.'); },
    ir(el) { const f = $('form'); if (f && f.dataset.form === 'datos') ui.pesoTmp = new FormData(f).get('peso') || ''; go(el.dataset.to); },
    obj(el) { ui.objSel = el.dataset.v; rerender(); },
    'obj-guardar'(el) { if (!ui.objSel) return; D().profile.objetivo = ui.objSel; guardarPerfil(); ui.objSel = null; go(el.dataset.back); },
    mes(el) {
      const dd = +el.dataset.d, k = ui.actual === 'fecha' ? 'fechaMes' : 'cicloMes';
      const b = ui[k]; ui[k] = new Date(b.getFullYear(), b.getMonth() + dd, 1); rerender();
    },
    'fecha-dia'(el) { ui.fechaSel = el.dataset.f; rerender(); },
    'fecha-ok'(el) { if (!ui.fechaSel) return; D().profile.inicio = ui.fechaSel; guardarPerfil(); ui.fechaSel = null; go(el.dataset.back); },
    'dias-n'(el) { ui.diasSel = [...DIAS_DEFAULT[+el.dataset.n]]; rerender(); },
    'dias-t'(el) {
      const w = +el.dataset.w, s = ui.diasSel;
      if (s.includes(w)) { if (s.length === 1) return; ui.diasSel = s.filter(x => x !== w); } else ui.diasSel = [...s, w].sort((a, b) => a - b);
      rerender();
    },
    'dias-ok'() { setDias(ui.diasSel); go('rutina'); },
    'rutina-ok'() {
      const d = D();
      if (d.rutina.some(r => !r.items.length)) { ui.rutinaErr = true; return rerender(); }
      ui.rutinaErr = false; guardarRutina(); go('lista');
    },
    filtro(el) { ui.filtro = el.dataset.g; rerender(); },
    cfg(el) {
      const f = el.dataset.f, [mn, mx, st] = limites[f], c = ui.cfg;
      const paso = f === 'v' && ex(c.id).u === 's' ? 5 : st;
      c[f] = Math.min(mx, Math.max(mn, c[f] + (+el.dataset.s) * paso)); rerender();
    },
    'cfg-ok'(el) {
      const c = ui.cfg, items = D().rutina[c.k].items, it = items.find(x => x.id === c.id);
      if (it) Object.assign(it, { series: c.series, v: c.v, rest: c.rest }); else items.push({ id: c.id, series: c.series, v: c.v, rest: c.rest });
      const k = c.k; guardarDia(k); ui.cfg = null; go(el.dataset.nuevo === '1' ? `agregar/${k}` : `dia/${k}`);
    },
    'cfg-quitar'() { const c = ui.cfg, r = D().rutina[c.k]; r.items = r.items.filter(x => x.id !== c.id); const k = c.k; guardarDia(k); ui.cfg = null; go(`dia/${k}`); },
    'lista-ciclo'() { go('ciclo'); },
    'lista-ej'() { D().completo = true; guardarPerfil(); go('ejercicios'); },
    'ciclo-dia'(el) { const d = D(), f = el.dataset.f; if (d.ciclo[f]) delete d.ciclo[f]; else d.ciclo[f] = true; guardarCiclo(f, !!d.ciclo[f]); rerender(); },
    'ciclo-ok'() { D().completo = true; guardarPerfil(); go('ejercicios'); },
    hecho(el) {
      const d = D(), semana = lunesISO(), key = `${semana}:${el.dataset.k}`, h = (d.hechos[key] = d.hechos[key] || {});
      if (h[el.dataset.id]) delete h[el.dataset.id]; else h[el.dataset.id] = true;
      guardarHecho(+el.dataset.k, el.dataset.id, !!h[el.dataset.id], semana); rerender();
    },
  };

  document.addEventListener('click', ev => {
    const a = ev.target.closest('[data-act]');
    if (a && acciones[a.dataset.act]) { if (a.tagName !== 'A') ev.preventDefault(); acciones[a.dataset.act](a, ev); return; }
    const g = ev.target.closest('[data-go]');
    if (g) { ev.preventDefault(); go(g.dataset.go); }
  });
  document.addEventListener('keydown', ev => { if (ev.key === 'Escape') cerrarCapa(); });

  document.addEventListener('input', ev => {
    if (ev.target.id === 'buscar') {
      ui.busca = ev.target.value;
      const k = +(location.hash.split('/')[2] || 0);
      $('#lista-add').innerHTML = listaAgregar(k);
    }
  });

  document.addEventListener('submit', async ev => {
    const form = ev.target.closest('[data-form]'); if (!form) return;
    ev.preventDefault();
    const f = Object.fromEntries(new FormData(form)), tipo = form.dataset.form;

    if (tipo === 'registro') {
      const nombre = (f.nombre || '').trim(), mail = (f.mail || '').trim().toLowerCase(), pass = f.pass || '';
      ui.regVals = { nombre: f.nombre || '', mail: f.mail || '', pass };
      const e = {};
      if (!nombre) e.nombre = 'Escribí tu nombre completo.';
      if (!emailOk(mail)) e.mail = 'Ingresá un Gmail válido.';
      if (pass.length < 8) e.pass = 'La contraseña necesita al menos 8 caracteres.';
      ui.regErr = e;
      if (Object.keys(e).length) return rerender();
      ocupado(form, true);
      try {
        const { data, error } = await sb.auth.signUp({ email: mail, password: pass, options: { data: { nombre } } });
        if (error) {
          if (esRed(error)) ui.regErr = { mail: MSG_RED };
          else if (/already|registered|exists/i.test(error.message)) ui.regErr = { mail: 'Ya existe una cuenta con ese Gmail.' };
          else if (/rate|limit|too many/i.test(error.message)) ui.regErr = { mail: 'Hiciste muchos intentos. Esperá unos minutos y probá de nuevo.' };
          else if (/password/i.test(error.message)) ui.regErr = { pass: 'Esa contraseña no es válida. Probá con otra más larga.' };
          else ui.regErr = { mail: 'No pudimos crear la cuenta. Probá de nuevo.' };
          return rerender();
        }
        if (!data.session) { ui.regErr = { mail: 'Te enviamos un mail para confirmar tu cuenta. Confirmalo y después iniciá sesión.' }; return rerender(); }
        await cargarTodo(data.user);
        ui.regVals = { nombre: '', mail: '', pass: '' };
        return go('cuenta-creada');
      } catch (er) {
        console.error(er);
        ui.regErr = { mail: esRed(er) ? MSG_RED : 'No pudimos crear la cuenta. Probá de nuevo.' };
        return rerender();
      } finally { ocupado(form, false); }
    }
    if (tipo === 'login') {
      const mail = (f.mail || '').trim().toLowerCase(), pass = f.pass || '';
      ui.loginVals = { mail: f.mail || '', pass };
      if (!emailOk(mail)) { ui.loginErr = { tipo: 'mail', msg: 'Ingresá un Gmail válido.' }; return rerender(); }
      if (!pass) { ui.loginErr = { tipo: 'pass', msg: 'Escribí tu contraseña.' }; return rerender(); }
      ocupado(form, true);
      try {
        const { data, error } = await sb.auth.signInWithPassword({ email: mail, password: pass });
        if (error) {
          if (esRed(error)) { aviso(MSG_RED); return; }
          ui.loginErr = /confirm/i.test(error.message)
            ? { tipo: 'mail', msg: 'Todavía tenés que confirmar tu Gmail. Revisá tu correo.' }
            : { tipo: 'pass', msg: 'El Gmail o la contraseña no son correctos. Probá de nuevo.' };
          return rerender();
        }
        try { await cargarTodo(data.user); }
        catch (er) { console.error(er); try { await sb.auth.signOut(); } catch (x) { /* nada */ } aviso(esRed(er) ? MSG_RED : 'No pudimos cargar tus datos. Probá de nuevo.'); return; }
        ui.loginErr = null; ui.loginVals = { mail: '', pass: '' };
        return go(home());
      } catch (er) {
        console.error(er); aviso(esRed(er) ? MSG_RED : 'No pudimos iniciar sesión. Probá de nuevo.');
      } finally { ocupado(form, false); }
    }
    if (tipo === 'datos') {
      const edit = form.dataset.edit === '1', p = D().profile, e = {};
      const peso = parseFloat(String(f.peso || '').replace(',', '.'));
      ui.pesoTmp = f.peso || '';
      if (!Number.isFinite(peso) || peso < 30 || peso > 250) e.peso = 'Ingresá un peso válido, entre 30 y 250 kg.';
      if (!p.objetivo) e.objetivo = 'Elegí tu objetivo.';
      if (!p.inicio) e.inicio = 'Elegí una fecha de inicio.';
      ui.datosErr = e;
      if (Object.keys(e).length) return rerender();
      p.peso = String(peso); guardarPerfil();
      ui.pesoTmp = null; ui.datosErr = {};
      return go(edit ? 'perfil' : 'dias');
    }
  });

  window.addEventListener('hashchange', () => { if (listo) route(); });
  iniciar();
})();
