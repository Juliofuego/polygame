import { getQuizes } from "./modules/coin.js";
import { getTeams, setCrown } from "./modules/team-card.js";

let fechaElement = document.getElementById("fecha");
fechaElement.innerHTML = new Date().toLocaleDateString();

let timer = document.getElementById("timer");
let time = 0;

setInterval(() => {
  time++;
  timer.innerHTML = `
    ${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}
  `;
}, 1000);

setCrown();
getQuizes();
getTeams();
