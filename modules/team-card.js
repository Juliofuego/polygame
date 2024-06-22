function setCrown(teams) {
  let winningTeam = teams[0];

  teams.forEach((currentTeam) => {
    if (currentTeam.dinero > winningTeam.dinero) {
      winningTeam.ganando = false;
      winningTeam = currentTeam;
    }
  });

  if (
    teams[0].dinero === teams[1].dinero ||
    teams[0].dinero === teams[2].dinero ||
    teams[1].dinero === teams[2].dinero
  ) {
    winningTeam.ganando = false;
    winningTeam = undefined;
  } else {
    winningTeam.ganando = true;
  }
}

export function teamCardComponent(team) {
  return `
    ${
      team.ganando
        ? `
      <img
        class="corona"
        src="public/corona.png"
        alt="${team.name}"
        height="60"
        width="60"
      />
      `
        : ""
    }
      <img
        class="gallinita"
        src="public/${team.imagen}"
        alt="${team.name}"
        height="90"
        width="90"
      />
      ${
        team.turno
          ? `<p style="color: #ffcc41;" class="team">🪙 Tu turno 🪙</p>`
          : `<p class="team">${team.nombre}</p>`
      }
  
      <div class="varicajas">
       ${
         team.dinero < 0
           ? `<div style="background: #9D4949;" class="billetes" id="billetos">
          <p>Tiene -$<span id="pesos">${Math.abs(team.dinero)}</span></p>
        </div>`
           : `<div class="billetes" id="billetos">
          <p>Tiene $<span id="pesos">${team.dinero}</span></p>
        </div>`
       }
        ${
          team.racha === 0
            ? '<div style="background: #638DEA;" class="calidad" id="rasgo"><p>Normal</p></div>'
            : team.racha >= 1
            ? `<div style="background: #B8A336;" class="calidad" id="rasgo"><p>Racha de ${team.racha}</p></div>`
            : team.racha <= -1 &&
              `<div style="background: #9D4949;" class="calidad" id="rasgo"><p>Ignorantes</p></div>`
        }
      </div>
    `;
}

let teamContainer = document.getElementById("team-container");
let teamCardsComponent = document.createElement("div");
teamCardsComponent.style.display = "flex";
teamCardsComponent.style.gap = "2rem";

teamContainer.appendChild(teamCardsComponent);

export function renderTeams(teams) {
  setCrown(teams);
  teamCardsComponent.innerHTML = "";

  teams.forEach((team) => {
    let teamCard = document.createElement("div");
    teamCard.className = "team-card";

    if (team.turno) {
      teamCard.classList.add("turno");
    }

    teamCard.innerHTML = teamCardComponent(team);
    teamCardsComponent.appendChild(teamCard);
  });
}
