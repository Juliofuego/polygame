import { generateQuizes } from "./modules/coin.js";
import { quizes, teams } from "./modules/data.js";
import { renderTeams } from "./modules/team-card.js";

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

renderTeams(teams);

generateQuizes(quizes);

// let dialog = document.getElementById("dialog");

// dialog.showModal();
