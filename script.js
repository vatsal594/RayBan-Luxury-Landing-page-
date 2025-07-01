Shery.imageEffect("#back", {
  style: 5,
  config: {
    a: { value: 2, range: [0, 30] },
    b: { value: 0.75, range: [-1, 1] },
    zindex: { value: -9996999, range: [-9999999, 9999999] },
    aspect: { value: 2.08442978686133 },
    ignoreShapeAspect: { value: true },
    shapePosition: { value: { x: 0, y: 0 } },
    shapeScale: { value: { x: 0.5, y: 0.5 } },
    shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
    shapeRadius: { value: 0, range: [0, 2] },
    currentScroll: { value: 0 },
    scrollLerp: { value: 0.07 },
    gooey: { value: true },
    infiniteGooey: { value: true },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: false },
    maskVal: { value: 1, range: [1, 5] },
    scrollType: { value: 0 },
    geoVertex: { range: [1, 64], value: 1 },
    noEffectGooey: { value: false },
    onMouse: { value: 1 },
    noise_speed: { value: 0.76, range: [0, 10] },
    metaball: { value: 0.2, range: [0, 2], _gsap: { id: 3 } },
    discard_threshold: { value: 0.5, range: [0, 1] },
    antialias_threshold: { value: 0, range: [0, 0.1] },
    noise_height: { value: 0.5, range: [0, 2] },
    noise_scale: { value: 13.74, range: [0, 100] },
  },
  gooey: true,
  //   debug: true,
});

var elems = document.querySelectorAll(".elem");

elems.forEach(function (elem) {
  var h1s = elem.querySelectorAll("h1");
  var index = 0;
  var animating = false;
  document.querySelector("#main").addEventListener("click", function () {
    if (!animating) {
      animating = true;
      gsap.to(h1s[index], {
        top: "-=100%",
        ease: Expo.easeInOut,
        duration: 1,
        onComplete: function () {
          gsap.set(this._targets[0], { top: "100%" });
          animating = false;
        },
      });

      index === h1s.length - 1 ? (index = 0) : index++;

      gsap.to(h1s[index], {
        top: "-=100%",
        ease: Expo.easeInOut,
        duration: 1,
      });
    }
  });
});

// Initialize custom cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursorDot = document.createElement("div");
  const cursorOutline = document.createElement("div");
  cursorDot.className = "cursor-dot";
  cursorOutline.className = "cursor-outline";
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  // Position cursor initially
  cursorDot.style.display = "block";
  cursorOutline.style.display = "block";

  let posX = 0,
    posY = 0;
  let mouseX = 0,
    mouseY = 0;

  // Smooth movement with GSAP
  gsap.to(
    {},
    {
      duration: 0.01,
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 5;
        posY += (mouseY - posY) / 5;

        gsap.set(cursorDot, {
          css: {
            left: mouseX,
            top: mouseY,
          },
        });

        gsap.set(cursorOutline, {
          css: {
            left: posX,
            top: posY,
          },
        });
      },
    }
  );

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover effects
  const hoverables = document.querySelectorAll("a, button, [data-hover]");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.style.width = "60px";
      cursorOutline.style.height = "60px";
      cursorOutline.style.backgroundColor = "rgba(225, 25, 49, 0.2)";
    });
    el.addEventListener("mouseleave", () => {
      cursorOutline.style.width = "40px";
      cursorOutline.style.height = "40px";
      cursorOutline.style.backgroundColor = "transparent";
    });
  });

  // Click effect
  document.addEventListener("mousedown", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(0.8)";
    cursorOutline.style.width = "50px";
    cursorOutline.style.height = "50px";
    cursorOutline.style.borderColor = "#ffffff";
  });

  document.addEventListener("mouseup", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    cursorOutline.style.borderColor = "#e11931";
  });
});
