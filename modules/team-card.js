import { teams } from "./data.js";

export function getTeams() {
  let teamContainer = document.getElementById("team-container");

  teams.forEach((team, index) => {
    let teamCard = document.createElement("div");
    teamCard.className = "team-card";

    teamCard.innerHTML = `
      <img
        src="/public/${team.imagen}"
        alt="${team.name}"
        height="90"
        width="90"
      />
      <p class="team">
        ${team.nombre}
      </p>
      <div class="varicajas">
        <div class="billetes" id="billetos">
          <p>Tiene $<span id="pesos">${team.dinero}</span></p>
        </div>
        <div class="calidad" id="rasgo">
          ${
            team.racha === "novato"
              ? '<p style="color: green;">Novato</p>'
              : '<p style="color: red;">Experto</p>'
          }
        </div>
      </div>
    `;
    teamContainer.appendChild(teamCard);
  });
}
