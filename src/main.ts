import "./style.css";

const hueSlider = document.querySelector<HTMLInputElement>("#hue")!;
const saturationSlider =
  document.querySelector<HTMLInputElement>("#saturation")!;

function HSVtoRGB(h: number, s: number, v: number) {
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
    r: Math.round(r! * 255),
    g: Math.round(g! * 255),
    b: Math.round(b! * 255),
  };
}

function setColor() {
  const hue = parseInt(hueSlider.value);
  const sat = parseInt(saturationSlider.value);

  const color = HSVtoRGB(hue / 100, sat / 100, 1);
  const hex = `#${color.r.toString(16).padStart(2, "0")}${color.g
    .toString(16)
    .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
  console.log(hex);

  document.querySelector<SVGStopElement>("#stop7")!.style.stopColor = hex;
  document.querySelector<SVGStopElement>("#stop8")!.style.stopColor = hex;
  document.querySelector<SVGStopElement>("#path6")!.style.fill = hex;
}

hueSlider.addEventListener("input", () => {
  setColor();
});

saturationSlider.addEventListener("input", () => {
  setColor();
});
