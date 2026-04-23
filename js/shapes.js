let bg_color = 'white';
const palette = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
let x=0, y=0;
const RECT_SIZE = 300;

function setup() {
    createCanvas(windowWidth, windowHeight);
    resizeCanvas(windowWidth, windowHeight);

    // bg_color = random(palette);
    bg_color = palette[0];
    x = random(width);
    y = random(height);
}


function draw() {
    background(bg_color);
    stroke(palette[1]);
    rect(x, y, RECT_SIZE, RECT_SIZE);
    ellipse(200, 200, 100, 100);
    triangle(300, 300, 400, 300, 400, 400);


}

function draw() {    background(bg_color);
    fill((palette));
    stroke(palette[1]);
    stroke(palette[2]);
    rect(x, y, 100, 100);
    x += 1;
    if (x > width) {
        x = -100;
    }
    ellipse(200, 200, 100, 100);
    triangle(300, 300, 400, 300, 400, 400);
}
function mousePressed() {
    bg_color = random(palette);
    x = random(width);
    y = random(height);
}