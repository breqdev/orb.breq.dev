const hueSlider = document.querySelector("#hue");
const saturationSlider = document.querySelector("#saturation");

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;

  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

let dirty = false;
let lastUpdate = 0;
let activeColor = "#f4c469";

function setColor() {
  const hue = parseInt(hueSlider.value);
  const sat = parseInt(saturationSlider.value);

  const colorTuple = HSVtoRGB(hue / 100, sat / 100, 1);
  activeColor = `#${colorTuple.r.toString(16).padStart(2, "0")}${colorTuple.g
    .toString(16)
    .padStart(2, "0")}${colorTuple.b.toString(16).padStart(2, "0")}`;

  document.querySelector("#stop7").style.stopColor = activeColor;
  document.querySelector("#stop8").style.stopColor = activeColor;
  document.querySelector("#path6").style.fill = activeColor;
}

fetch("/get")
  .then((r) => r.text())
  .then((initialColor) => {
    document.querySelector("#stop7").style.stopColor = initialColor;
    document.querySelector("#stop8").style.stopColor = initialColor;
    document.querySelector("#path6").style.fill = initialColor;

    hueSlider.addEventListener("input", () => {
      setColor();
      dirty = true;
    });

    saturationSlider.addEventListener("input", () => {
      setColor();
      dirty = true;
    });

    setInterval(() => {
      const now = Date.now();
      if (dirty && now - lastUpdate > 250) {
        const params = new URLSearchParams({ color: activeColor });
        dirty = false;
        lastUpdate = now;
        fetch("/set?" + params.toString(), {
          method: "POST",
        });
      }
    }, 50);
  });
