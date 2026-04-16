let a = "hola";
let b = "4";
let c = a + b;
// alert(c)
console.log(c);

function saludar(nombre = "Mundo") {
    alert("Hola, ¿cómo estás?");
}

saludar("Chanchi");
saludar("Bartolomeo");

function sumar(a, b) {
    const resultado = a + b;
    alert("la suma de  " + a + " y " + b + " es: " + resultado);
}

sumar(5, 3);
sumar(10, 20);

function changeColor() {
    // camelCase
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    document.body.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
}

document.addEventListener("click", changeColor);