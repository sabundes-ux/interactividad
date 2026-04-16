let boton1 = document.getElementById("btn-1");
let boton2 = document.getElementById("btn-2");
let boton3 = document.getElementById("btn-3");

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

boton1.addEventListener("click", function() {
    console.log("Botón 1 presionado");
});

boton1.addEventListener("mouseenter", mouseEnter);
boton1.addEventListener("mouseleave", mouseLeave);

boton2.addEventListener("mouseenter", mouseEnter);
boton2.addEventListener("mouseleave", mouseLeave);

boton3.addEventListener("mouseenter", mouseEnter);
boton3.addEventListener("mouseleave", mouseLeave);

function mouseEnter() {
    this.style.backgroundColor = getRandomColor();
    bgColor(getRandomColor());
}

function mouseLeave() {
    this.style.backgroundColor = "black";
    bgColor("#FFF");
}

function bgColor(color) {
    document.body.style.backgroundColor = color;
}

function mouseLeave() {
    bgColor("#FFF");
}

function bgColor(color) {
    document.body.style.backgroundColor = color;
}