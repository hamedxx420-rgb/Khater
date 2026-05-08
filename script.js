/* ===== YEAR ===== */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


/* ===== ACTIVE NAV ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".site-header nav a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const id = entry.target.getAttribute("id");

    const link = document.querySelector(
      `.site-header nav a[href="#${id}"]`
    );

    if (link) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, {
  rootMargin: "-40% 0px -50% 0px",
  threshold: 0.1,
});

sections.forEach((section) => observer.observe(section));


/* ===== SCROLL ANIMATION ===== */
const elements = document.querySelectorAll(".hidden");

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15,
});

elements.forEach((el) => observer2.observe(el));


/* ===== PARTICLES BACKGROUND ===== */
const canvas = document.getElementById("bgCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let nodes = [];

  for (let i = 0; i < 80; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5),
      dy: (Math.random() - 0.5),
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((node, i) => {
      node.x += node.dx;
      node.y += node.dy;

      ctx.fillStyle = "rgba(32,223,175,0.9)";
      ctx.beginPath();
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        let dx = node.x - nodes[j].x;
        let dy = node.y - nodes[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = "rgba(32,223,175,0.25)";
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.dy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}


/* ===== MOUSE LIGHT ===== */
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});
