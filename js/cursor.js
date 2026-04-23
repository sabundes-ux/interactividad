let x = 0, y = 0;
let stroke_color = "#000000";
let stroke_weight = 1;
let fill_color = "#FFFFFF";
let size = 50;
let angle = 0; // Ángulo para la órbita
let orbitRadius = 80; // Radio de la órbita
let smallSize = 15; // Tamaño del ellipse menor
let counter = 0; // Contador del 0 al 9

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(60);
}

function draw() {
    background(0, 0);
    
    // Incrementar el ángulo para la rotación
    angle += 0.35;
    
    // Incrementar contador y resetear cuando llegue a 9
    counter = (counter + 1) % 10;
    
    // Generar colores aleatorios para el círculo principal
    let r = random(255);
    let g = random(255);
    let b = random(255);
    
    // Dibujar el círculo principal
    stroke(stroke_color);
    strokeWeight(stroke_weight);
    fill(r, g, b);
    ellipse(mouseX, mouseY, size, size);
    
    // Dibujar el número en el centro del ellipse
    fill(255); // Color blanco para el texto
    textAlign(CENTER, CENTER);
    textSize(20);
    text(counter, mouseX, mouseY);
    
    // Dibujar 4 ellipses orbitando con ángulos separados
    for (let i = 0; i < 4; i++) {
        // Cada ellipse tiene un ángulo diferente (separados por 90 grados)
        let orbitAngle = angle + (i * PI/2);
        
        // Calcular posición del ellipse orbitando alrededor del mouse
        let orbitX = mouseX + cos(orbitAngle) * orbitRadius;
        let orbitY = mouseY + sin(orbitAngle) * orbitRadius;
        
        // Generar colores aleatorios para cada ellipse
        let r2 = sin(orbitAngle) * 127 + 128; // Oscilación de color basada en el ángulo
        let g2 = sin(orbitAngle + PI/2) * 127 + 128; // Oscilación de color basada en el ángulo
        let b2 = sin(orbitAngle + PI) * 127 + 128; // Oscilación de color basada en el ángulo
        
        // Dibujar el ellipse orbitando
        fill(r2, g2, b2);
        ellipse(orbitX, orbitY, smallSize, smallSize);
    }
}

function updateColor() {
    fill_color = map(mouseX, 0, width, 0, 255);
    stroke_color = map(mouseY, 0, height, 0, 255);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}