// Código del Gráfico de Burbujas (MODIFICADO)
const resultsBubble = {
  informatica: 80,
  quimica: 60,
  electromecanica: 70,
  civiles: 50,
  electricidad: 75,
  mecanica: 40,
  automotriz: 55,
  electronica: 30
};

const IMAGE_PATHS = {
  civiles:        './Img/cc_c.png',
  electricidad:   './Img/edad_c.png',
  electronica:    './Img/eik_c.png',
  electromecanica:'./Img/emca_c.png',
  informatica:    './Img/info_c.png',
  mecanica:       './Img/indu_c.png',
  automotriz:     './Img/auto_c.png',
  quimica:        './Img/qca_c.png'
};

const canvas = document.getElementById('bubble-chart');
canvas.width = 600;
canvas.height = 300;
canvas.style.border = "2px solid #000";
canvas.style.background = "rgba(255,255,255,0.9)";
canvas.style.marginBottom = "40px";

const ctx = canvas.getContext('2d');

const maxPercentage = Math.max(...Object.values(resultsBubble));
const bubbles = [];
const numBubbles = Object.keys(resultsBubble).length;
const margin = 50;

Object.entries(resultsBubble).forEach(([key, value], index) => {
  let radius = 25 + (value / maxPercentage) * 35;
  let xPos = margin + ((canvas.width - 2 * margin) / (numBubbles - 1 || 1)) * index;
  
  bubbles.push({
    x: xPos,
    y: canvas.height/2,
    radius,
    color: '#' + Math.floor(Math.random()*16777215).toString(16),
    name: key,
    value,
    image: IMAGE_PATHS[key] || null
  });
});

const images = {};
for (let key in IMAGE_PATHS) {
  const img = new Image();
  img.src = IMAGE_PATHS[key];
  images[key] = img;
}

let hoveredBubble = null;
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  hoveredBubble = null;
  bubbles.forEach(b => {
    const dx = mouseX - b.x;
    const dy = mouseY - b.y;
    if (Math.sqrt(dx*dx + dy*dy) < b.radius) {
      hoveredBubble = b;
    }
  });
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  bubbles.forEach(b => {
    let offsetY = 0;
    if (hoveredBubble === b) {
      offsetY = Math.sin(Date.now()/100) * 5;
    }

    ctx.beginPath();
    ctx.arc(b.x, b.y + offsetY, b.radius, 0, Math.PI*2);
    ctx.fillStyle = b.color;
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Dibujar la imagen dentro de la burbuja si existe y está cargada
    if (b.image && images[b.name].complete) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, b.y + offsetY, b.radius, 0, Math.PI*2);
      ctx.clip();
      ctx.drawImage(images[b.name], b.x - b.radius, b.y - b.radius + offsetY, b.radius * 2, b.radius * 2);
      ctx.restore();
    }
    
    // texto hover
    if (hoveredBubble === b) {
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${b.name} (${b.value}%)`, b.x, b.y - b.radius - 10 + offsetY);
    }
  });

  requestAnimationFrame(draw);
}
draw();

// Código del Gráfico de Barras (sin cambios)
const resultsBar = {
  informatica: 80,
  quimica: 60,
  electromecanica: 70,
  civiles: 50,
  electricidad: 75,
  mecanica_automotriz: 40,
  electronica: 30,
  mecanica_general: 90
};

const colors = {
  informatica: "#800020",
  quimica: "#ffffff",
  electromecanica: "#0000ff",
  civiles: "#fffdd0",
  electricidad: "#87ceeb",
  mecanica_automotriz: "#000080",
  electronica: "#808080",
  mecanica_general: "#008000"
};

const chart = document.getElementById('chart');
const labelsContainer = document.getElementById('labels');
const yAxis = document.getElementById('yAxis');

const maxValue = 100;
const chartHeight = 400;

for (let i = 0; i <= maxValue; i += 10) {
  const tick = document.createElement("div");
  tick.textContent = i;
  yAxis.appendChild(tick);
}

Object.entries(resultsBar).forEach(([key, value]) => {
  const bar = document.createElement("div");
  bar.className = "bar";
  bar.style.background = colors[key] || "#666";
  bar.style.height = "0px";
  bar.innerHTML = `<span>${value}%</span>`;
  chart.appendChild(bar);

  setTimeout(() => {
    const barHeight = (value / maxValue) * chartHeight;
    bar.style.height = `${barHeight}px`;
  }, 200);

  const label = document.createElement("div");
  label.className = "label";
  label.textContent = key.replace("_", " ");
  label.style.borderColor = colors[key];
  labelsContainer.appendChild(label);
});

const topSpecialty = Object.entries(resultsBar).sort((a,b) => b[1]-a[1])[0];
document.getElementById("topSpecialty").textContent =
  `Especialidad con mayor frecuencia: ${topSpecialty[0].replace("_", " ")} (${topSpecialty[1]}%)`;

