export function setCrown(teams) {
  let winningTeam = teams[0];

  teams.forEach((currentTeam) => {
    if (currentTeam.dinero > winningTeam.dinero) {
      winningTeam = currentTeam;
    }
  });

  if (winningTeam.dinero === 50) {
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
        src="/public/corona.png"
        alt="${team.name}"
        height="60"
        width="60"
      />
      `
        : ""
    }
      <img
        class="gallinita"
        src="/public/${team.imagen}"
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
              `<div style="background: #9D4949;" class="calidad" id="rasgo"><p>Perdedores</p></div>`
        }
      </div>
    `;
}

export function renderTeams(teams) {
  let teamContainer = document.getElementById("team-container");
  teamContainer.innerHTML = "";

  teams.forEach((team) => {
    let teamCard = document.createElement("div");
    teamCard.className = "team-card";

    if (team.turno) {
      teamCard.classList.add("turno");
    }

    teamCard.innerHTML = teamCardComponent(team);
    teamContainer.appendChild(teamCard);
  });
}
