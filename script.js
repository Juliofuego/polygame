let money = 51;
let boton = document.getElementById("boton");
let suma = document.getElementById("suma");
let pesos = document.getElementById("pesos");
let billetos = document.getElementById("billetos");

let rasgo = document.getElementById("rasgo");
let novatu = document.getElementById("novatu");
let darracha = document.getElementById("darracha");

function cambiarasgo() {
  rasgo.innerText = "Racha de 1";
  rasgo.style.backgroundColor = "#B8A336";
}
darracha.addEventListener("click", cambiarasgo);

console.dir(boton);
function sumar() {
  money = money + 5;
  pesos.innerText = money;
  billetos.style.backgroundColor = "#FCD015";
}
// function cambiazo() {
//   document.getElementById("pesos").innerText = money;
// }
// boton.addEventListener("click", cambiazo);
suma.addEventListener("click", sumar);
