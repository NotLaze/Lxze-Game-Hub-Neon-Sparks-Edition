// Spark particle background
const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");
let w, h;
let sparks = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Spark {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 2 + 0.5;
    this.alpha = Math.random();
    this.color = `rgba(0,255,255,${this.alpha})`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.003;
    if (this.alpha <= 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < 150; i++) sparks.push(new Spark());

function animate() {
  ctx.clearRect(0, 0, w, h);
  for (let s of sparks) {
    s.update();
    s.draw();
  }
  requestAnimationFrame(animate);
}
animate();
