let font;

function preload() {
    font = loadFont('./TipografiaMonoInk/ABCWhyteMonoInktrap-Regular-Trial.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    clear();

    // Dibujar división vertical en el centro
    stroke(0, 50);
    strokeWeight(0);
    line(width / 2, 0, width / 2, height);

    // Sombra de color que sigue al cursor
    colorMode(HSB, 360, 100, 100);
    let hue = (frameCount * 1.5 + mouseX * 0.35) % 360;
    let shadowColor = color(hue, 100, 100);
    let offsetX = (mouseX - width / 4) * 0.1;
    let offsetY = (mouseY - height / 2) * 0.12;

    let textX = width / 4;
    let textY = height / 2;

    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(50);
    textLeading(60);
    noStroke();

    drawingContext.shadowBlur = 60;
    drawingContext.shadowColor = shadowColor.toString();
    fill(shadowColor);
    text("Nido\nInformativo\npara Migrantes", textX + offsetX, textY + offsetY);

    drawingContext.shadowBlur = 0;
    fill('#9c151b');
    text("Nido\nInformativo\npara Migrantes", textX, textY);
}

// Ajustar el canvas si la ventana se redimensiona
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}