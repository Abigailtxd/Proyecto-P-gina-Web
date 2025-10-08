// results.js

// --- Áreas y preguntas (misma estructura que tenías) ---

const AREAS = [
  {key:'civiles',icon:'🏗️',name:'Construcciones Civiles',questions:[ /*...7 preguntas...*/ ]},
  {key:'electricidad',icon:'⚡',name:'Electricidad',questions:[ /*...7 preguntas...*/ ]},
  {key:'electronica',icon:'🔌',name:'Electrónica',questions:[ /*...7 preguntas...*/ ]},
  {key:'electromecanica',icon:'⚙️',name:'Electromecánica',questions:[ /*...7 preguntas...*/ ]},
  {key:'informatica',icon:'💻',name:'Informática',questions:[ /*...7 preguntas...*/ ]},
  {key:'mecanica',icon:'🔧',name:'Mecánica General',questions:[ /*...7 preguntas...*/ ]},
  {key:'automotriz',icon:'🚗',name:'Mecánica Automotriz',questions:[ /*...7 preguntas...*/ ]},
  {key:'quimica',icon:'⚗️',name:'Química Industrial',questions:[ /*...7 preguntas...*/ ]}
];

/* ========== Colores ========== */
const COLORS = {
  informatica:"#800020", quimica:"#FFFFFF", electromecanica:"#0000FF",
  civiles:"#FFFDD0", electricidad:"#87CEEB", automotriz:"#000080",
  electronica:"#808080", mecanica:"#008000"
};

/* ========== Aplanar preguntas ========== */
/* Nota: en este snippet por brevedad las preguntas no están expandidas.
   Si estás usando el HTML previo, conserva ALL y TOTAL tal como antes. */
const ALL = AREAS.flatMap((a) => {
  // si el objeto tiene preguntas, mapéalas; si no, genera 7 placeholders
  if(Array.isArray(a.questions) && a.questions.length) return a.questions.map((q,i)=>({text:q,area:a.key,index:i}));
  // fallback (no debería ser necesario si usas la versión completa):
  return Array.from({length:7}).map((_,i)=>({text:`Pregunta ${i+1}`, area:a.key, index:i}));
});
const TOTAL = ALL.length;
let current = -1;
const answers = Array(TOTAL).fill(null);

const IMAGE_PATHS = {
  civiles:       './Img/cc_c.png',
  electricidad:  './Img/edad_c.png',
  electronica:   './Img/eik_c.png',
  electromecanica:'./Img/emca_c.png',
  informatica:   './Img/info_c.png',
  mecanica:      './Img/indu_c.png',
  automotriz:    './Img/auto_c.png',
  quimica:       './Img/qca_c.png'
};


/* Textos que aparecerán debajo de la imagen (en el mismo orden que las imágenes) */
const IMAGE_TEXTS = {
  civiles: 'Construcciones Civiles — Supervisar y planificar obras, cálculos y coordinación de equipos.',
  electricidad: 'Electricidad — Instalación, diagnóstico y trabajo con circuitos y sistemas eléctricos.',
  electronica: 'Electrónica — Montaje y reparación de placas, microcontroladores y dispositivos electrónicos.',
  electromecanica: 'Electromecánica — Mantenimiento e integración entre sistemas eléctricos y mecánicos.',
  informatica: 'Informática — Programación, bases de datos, ciberseguridad y desarrollo de software.',
  mecanica: 'Mecánica General — Fabricación y reparación de piezas, uso de herramientas y precisión mecánica.',
  automotriz: 'Mecánica Automotriz — Diagnóstico y reparación de vehículos, motores y sistemas automotrices.',
  quimica: 'Química Industrial — Procesos químicos, control de calidad y trabajo en laboratorio.'
};
/* ---------- END: MAPEO DE IMAGENES/TEXTOS ---------- */

/* ========== DEMO: rellenar respuestas si no existen (como antes) ========== */
function fillDemoAnswersIfEmpty(){
  const anyAnswered = answers.some(v => v !== null);
  if(!anyAnswered){
    for(let i=0;i<TOTAL;i++) answers[i] = Math.floor(Math.random()*3);
  }
}
fillDemoAnswersIfEmpty();

/* ========== Cálculo porcentajes ========== */
function computeByArea(){
  const byArea = Object.fromEntries(AREAS.map(a=>[a.key,{name:a.name,icon:a.icon,score:0,max:(a.questions?.length||7)*2}]));
  ALL.forEach((q,i)=> { byArea[q.area].score += (answers[i] || 0); });
  for(const k in byArea) byArea[k].pct = (byArea[k].score / byArea[k].max) * 100;
  return byArea;
}

/* ========== RENDER: imagen superior + texto según área ganadora + barras ========== */
const CHART = document.getElementById('chart');
const TOPDISPLAY = document.getElementById('topDisplay');
const RESTART = document.getElementById('restart');

function renderChart(){
  const byArea = computeByArea();
  const entries = Object.entries(byArea);

  // Determinar el área con mayor porcentaje
  // Si hay empate, se elige la primera que aparezca en entries
  let topEntry = entries.slice().sort((a,b)=> b[1].pct - a[1].pct)[0];
  const topKey = topEntry[0];
  const topData = topEntry[1];

  // --- Renderizamos imagen + texto del Top antes de las barras ---
  // Si el path no existe o no lo cambiaste, aparecerá "imagen rota" — cambialo en IMAGE_PATHS.
  const imgSrc = IMAGE_PATHS[topKey] || '';
  const imgText = IMAGE_TEXTS[topKey] || topData.name;
  TOPDISPLAY.innerHTML = `
    <img src="${imgSrc}" alt="Imagen: ${topData.name}" onerror="this.style.opacity=0.5; this.title='Reemplaza IMAGE_PATHS[${topKey}] con la ruta real';" />
    <div class="top-text">${imgText}</div>
  `;

  // --- Render de las barras (dos filas) ---
  const firstRow = entries.slice(0,4);
  const secondRow = entries.slice(4);

  function createBarHtml(key, data){
    const pct = Math.round(data.pct);
    const pxHeight = pct; // 100% = 100px
    const color = COLORS[key] || "#999";
    const isDarkTextWhite = ["informatica","automotriz","electromecanica"].includes(key);
    const showInside = (pxHeight > 20) || (key === 'quimica'); // quimica siempre dentro
    const insideColor = (key === 'quimica') ? '#000' : (isDarkTextWhite ? '#fff' : '#000');
    const insideHtml = `<div class="pct-inside" style="color:${insideColor};">${pct}%</div>`;
    const topLabel = !showInside ? `<div class="pct-top">${pct}%</div>` : '';
    return `
      <div class="bar-column">
        <div class="bar-vertical" data-key="${key}">
          ${topLabel}
          <div class="bar-fill" style="height: ${pxHeight}px; background:${color};">
            ${insideHtml}
          </div>
        </div>
        <div class="bar-label"><span class="small-icon">${data.icon}</span>${data.name}</div>
      </div>
    `;
  }

  CHART.innerHTML = `
    <div class="chart-row" id="row1">${firstRow.map(([k,a])=>createBarHtml(k,a)).join('')}</div>
    <div class="chart-row" id="row2">${secondRow.map(([k,a])=>createBarHtml(k,a)).join('')}</div>
  `;

  // fuerza 20px entre filas desde script por si acaso
  const r1 = document.getElementById('row1');
  const r2 = document.getElementById('row2');
  if(r1) r1.style.marginBottom = '20px';
  if(r2) r2.style.marginTop = '20px';

  // ajustes post-render para garantizar visibilidad y contraste
  entries.forEach(([k,a]) => {
    const col = CHART.querySelector('.bar-vertical[data-key="'+k+'"]');
    if(!col) return;
    const fill = col.querySelector('.bar-fill');
    if (k === 'quimica' && fill){
      fill.style.color = '#000';
      const textNode = fill.querySelector('.pct-inside');
      if(textNode){
        textNode.style.position = 'absolute';
        textNode.style.bottom = '4px';
        textNode.style.left = '50%';
        textNode.style.transform = 'translateX(-50%)';
      }
    }
    const pctTop = col.querySelector('.pct-top');
    if(pctTop) pctTop.style.color = '#000';
  });

  // (opcional) destacar la barra ganadora con un borde más grueso
  const winnerCol = CHART.querySelector('.bar-vertical[data-key="'+topKey+'"]');
  if(winnerCol) winnerCol.style.boxShadow = '0 6px 14px rgba(0,0,0,0.12)';
}

/* ========== eventos ========== */
RESTART.addEventListener('click', ()=> location.reload());

/* ========== Lanzar renderizado ========== */
renderChart();
