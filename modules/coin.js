import { renderTeams, teamCardComponent } from "./team-card.js";
import { teams } from "./data.js";
import { shuffle } from "./utils.js";

let currentTeam = teams.find((team) => team.turno);
let dialog = document.getElementById("dialog");
// dialog.style.display = "none";

export function generateQuizes(quizes) {
  let coinContainer = document.getElementById("coin-container");
  let bountyElement = document.getElementById("bounty-ammount");

  shuffle(quizes).forEach((quiz, index) => {
    let coinElement = document.createElement("div");
    coinElement.innerHTML = `$${index + 1}`;
    coinElement.className = "coin";
    coinContainer.appendChild(coinElement);

    coinElement.addEventListener("click", () => {
      dialog.style.display = "flex";
      dialog.classList.add("papap");
      dialog.classList.remove("good");
      dialog.innerHTML = `
      <div class="cajita">
        <p class="pregunta">${quiz.pregunta}</p>
        <div class="counter">
          <p id="time-limit"></p>
          <img src="/public/relo.png" alt="reloj" width="40" height="40" />
        </div>
      </div>
      <div id="responses" class="options">
      </div>
    `;

      let timeLimit = 20;
      let timeLimitElement = document.getElementById("time-limit");
      timeLimitElement.innerHTML = timeLimit;

      let interval = setInterval(() => {
        timeLimit--;
        timeLimitElement.innerHTML = timeLimit;
        if (timeLimit === 0) {
          dialog.close();
          currentTeam.dinero -= 5;
          currentTeam.racha = -1;

          currentTeam.turno = false;

          teams[
            teams.indexOf(currentTeam) + 1 < teams.length
              ? teams.indexOf(currentTeam) + 1
              : 0
          ].turno = true;

          currentTeam = teams.find((team) => team.turno);

          renderTeams(teams);
          bountyElement.innerText = parseInt(bountyElement.innerText) + 5;
        }
      }, 1000);

      let responses = document.getElementById("responses");

      shuffle(quiz.respuestas).forEach((answer) => {
        let answerButton = document.createElement("button");
        answerButton.innerHTML = answer.respuesta;
        answerButton.addEventListener("click", () => {
          if (answer.correcta) {
            clearInterval(interval);
            coinElement.style.display = "none";
            dialog.classList.add("good");
            dialog.classList.remove("papap");
            dialog.innerHTML = `
              <p class="good-title">¡Correcto!</p>
              <p class="good-text">¿A qué equipo le quitas 5 billetes?</p>
              <div id="team-cards"></div>
            `;

            let teamCards = document.getElementById("team-cards");
            teamCards.style.marginTop = "4rem";

            teams.forEach((team) => {
              if (team.nombre !== currentTeam.nombre) {
                let teamCard = document.createElement("div");
                teamCard.className = "team-card";
                teamCard.innerHTML = teamCardComponent(team);
                teamCard.style.cursor = "pointer";
                teamCard.addEventListener("click", () => {
                  dialog.close();

                  currentTeam.dinero += 5 + parseInt(bountyElement.innerText);
                  currentTeam.racha += 1;

                  bountyElement.innerText = 0;
                  team.dinero -= 5;

                  currentTeam.turno = false;

                  teams[
                    teams.indexOf(currentTeam) + 1 < teams.length
                      ? teams.indexOf(currentTeam) + 1
                      : 0
                  ].turno = true;

                  currentTeam = teams.find((team) => team.turno);

                  renderTeams(teams);
                });

                teamCards.appendChild(teamCard);
              }
            });
          } else {
            dialog.close();
            currentTeam.dinero -= 5;
            currentTeam.racha = -1;

            currentTeam.turno = false;

            teams[
              teams.indexOf(currentTeam) + 1 < teams.length
                ? teams.indexOf(currentTeam) + 1
                : 0
            ].turno = true;

            currentTeam = teams.find((team) => team.turno);

            if (quiz.pregunta.startsWith("¡Comodín malo!")) {
              coinElement.style.display = "none";
            }

            renderTeams(teams);
            bountyElement.innerText = parseInt(bountyElement.innerText) + 5;
          }
        });
        responses.appendChild(answerButton);
      });

      dialog.onclose = () => {
        clearInterval(interval);
        dialog.style.display = "none";
        dialog.innerHTML = "";
      };

      dialog.showModal();
    });
  });
}
