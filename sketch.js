let font;
let fontSize = 300;
let textStr = 'flow';
let textX = 20, textY = 500;
let lines = 180;
let maskG;

function preload() {
  font = loadFont('Velvelyne-Light.otf'); 
}

function setup() {
  createCanvas(600, 800);
  colorMode(HSB, 360, 100, 100, 100);

  // Create mask for text area
  maskG = createGraphics(width, height);
  maskG.pixelDensity(1);
  maskG.background(0);
  maskG.noStroke();
  maskG.fill(255);
  maskG.textFont(font);
  maskG.textSize(fontSize);
  maskG.text(textStr, textX, textY);
  maskG.loadPixels();
}

function draw() {
  background(210, 10, 100);

  let spacing = width / (lines - 1);
  for (let i = 0; i < lines; i++) {
    let xoff = i * spacing;
    let h = map(i % 20, 0, 20, 200, 230);
    if (i % 11 === 0) h = 140;
    if (i % 17 === 0) h = 50;
    let s = 60;
    let b = 90;
    let a = 80;

    stroke(h, s, b, a);
    strokeWeight(1);

    let drawing = false;
    beginShape();
    for (let y = 0; y <= height; y += 2) {
      // time offset
      let n = noise(i * 0.1, y * 0.01 + frameCount * 0.01);
      let x = xoff + map(n, 0, 1, -15, 15);

      // mask for text area
      let ix = constrain(floor(x), 0, width - 1);
      let iy = constrain(floor(y), 0, height - 1);
      let maskIndex = 4 * (iy * width + ix);
      let inText = maskG.pixels[maskIndex] > 128;

      if (!inText) {
        if (!drawing) beginShape();
        vertex(x, y);
        drawing = true;
      } else {
        if (drawing) {
          endShape();
          drawing = false;
        }
      }
    }
    if (drawing) endShape();
  }
}
