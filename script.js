
const playerScoreEl = document.getElementById("player-score"),
  playerChoiceEl = document.getElementById("player-choice"),
  computerScoreEl = document.getElementById("computer-score"),
  computerChoiceEl = document.getElementById("computer-choice"),
  resultText = document.getElementById("result-text");

const playerGameIcons = document.querySelectorAll("#player .far"),
    computerGameIcons = document.querySelectorAll("#computer .far");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let computerChoice = "";
let choiceArray = ["rock", "paper", "scissors", "lizard", "spock"];
let chance = "";
let playerScoreNumber = 0, computerScoreNumber = 0;

function select(event) {
  // Using event delegation
  chance = "player";
  const elementId = event.target.id;
  const playerChoice = elementId.split("-")[1];

  // Add selected styling & playerChoice
  if (playerChoice && playerChoice != "choice") {
    displaySelectedChoice(playerChoice, event.target);
    resetSelected(elementId);
    computerRandomChoice();
    updateScore(playerChoice);
  }
}

// Choose selected icon
function displaySelectedChoice(playerChoice, target) {
  const selectedEl = `${playerChoice.charAt(0).toUpperCase()}${playerChoice.slice(1)}`;
  target.classList.add("selected");
  chance === "player" ? (playerChoiceEl.textContent = ` --- ${selectedEl}`) : (computerChoiceEl.textContent = ` --- ${selectedEl}`);
}

// Random computer choice
function computerRandomChoice() {
  chance = "computer";
  computerChoice = "";
  const computerChoiceNumber = Math.floor(Math.random() * 5);
  computerChoice = choiceArray[computerChoiceNumber];
  const target = document.getElementById(`computer-${computerChoice}`);
  displaySelectedChoice(computerChoice, target);
  resetSelected(target.id);
}

// Check results, increase scores, update resultText
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie";
  } else {
    const gameIcon = choices[playerChoice];
    if (gameIcon.defeats.indexOf(computerChoice) > -1) {
      playerScoreNumber++;
      resultText.textContent = "You Won!";
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      computerScoreNumber++;
      resultText.textContent = "You Lost!";
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

function resetAll(){
  // Resetting score
  playerScoreNumber = 0;
  computerScoreNumber = 0;

  // Resetting score elements
  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;

  // Resetting choice elements
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';

  // Resetting result
  resultText.textContent = '';

  document.querySelectorAll('.far').forEach(element => element.classList.remove('selected'));
}

// Reset previously selected icon on making new selection
function resetSelected(elementId) {
  const allGameIcons =
    chance === "player" ? playerGameIcons : computerGameIcons;
  const resetSelectedIcon = Array.from(allGameIcons).find(
    (icon) => icon.classList.contains("selected") && icon.id != elementId
  );
  resetSelectedIcon ? resetSelectedIcon.classList.remove("selected") : false;
}


// Invoking Method on resetting
resetAll();
