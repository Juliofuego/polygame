import { quizes } from "./data.js";
import { shuffle } from "./utils.js";

let dialog = document.getElementById("dialog");
dialog.style.display = "none";

export function getQuizes() {
  let coinContainer = document.getElementById("coin-container");

  quizes.forEach((quiz, index) => {
    let coinElement = document.createElement("div");
    coinElement.innerHTML = `$${index + 1}`;
    coinElement.className = "coin";
    coinContainer.appendChild(coinElement);

    coinElement.addEventListener("click", () => {
      dialog.style.display = "flex";
      dialog.innerHTML = `
      <div class="cajita">
        <p class="pregunta">${quiz.pregunta}</p>
        <div class="counter">
          <p>0:20</p>
          <img src="/public/Relo.png" alt="reloj" width="40" height="40" />
        </div>
      </div>
      <div id="responses" class="options">
      </div>
    `;

      let responses = document.getElementById("responses");

      shuffle(quiz.respuestas).forEach((answer) => {
        let answerButton = document.createElement("button");
        answerButton.innerHTML = answer.respuesta;
        answerButton.addEventListener("click", () => {
          if (answer.correcta) {
            coinElement.style.display = "none";
          }
          dialog.close();
        });
        responses.appendChild(answerButton);
      });

      dialog.showModal();
      dialog.onclose = () => {
        dialog.style.display = "none";
        dialog.innerHTML = "";
      };
    });
  });
}
