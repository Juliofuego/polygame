import { quizes } from "./data.js";

export function getQuizes() {
  let coinContainer = document.getElementById("coin-container");

  quizes.forEach((quiz, index) => {
    let coinElement = document.createElement("div");
    coinElement.innerHTML = `$${index + 1}`;
    coinElement.className = "coin";
    coinContainer.appendChild(coinElement);
  });
}
