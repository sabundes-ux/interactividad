let color = 'black';
let stroke_weight = 1;
let coordinates = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    stroke(color);
    strokeWeight(stroke_weight);
    noFill();
beginShape();
    for (let i = 0; i < coordinates.length; i++) {
        let coord = coordinates[i];
        vertex(coord[0], coord[1]);
    }
    endShape();
}

function mousePressed() {
    coordinates.push([mouseX, mouseY]);
}

function mouseDragged() {   
    coordinates.push([mouseX, mouseY]);
}