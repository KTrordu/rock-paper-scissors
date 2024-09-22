const choicesEl = document.querySelectorAll(".choices");
const choicesContEl = document.getElementById("choices-container");
const gameStateEl = document.getElementById("game-state");
const scoreDisplayEl = document.getElementById("score-display");

const gameElements = ["rock" , "paper" , "scissors"];

let playerScore = 0;
let computerScore = 0;

renderScore(playerScore, computerScore);

function imageGroupPressed(element) {
    const isImage = element.target.nodeName === 'IMG';

    if (!isImage) {
        return;
    }

    const choice = element.target.id;
    renderGame(choice);

    renderScore(playerScore, computerScore);
};

choicesContEl.addEventListener("click", imageGroupPressed);

function renderGame(choice) {
    const computerChosenElement = chooseElement();

    if (choice == computerChosenElement) {
        renderTie();
        return;
    }

    renderState(chooseWinner(choice, computerChosenElement));
};

function chooseElement() {
    const elementNumber = Math.floor(Math.random() * 3);
    const computerChosenElement = gameElements[elementNumber];

    return computerChosenElement;
};

function chooseWinner(choice, computerChosenElement) {
    switch (choice) {
        case "rock":
            if (computerChosenElement == "scissors") {
                playerScore++;
                return 1;
            } else {computerScore++; return -1;}

        case "paper":
            if (computerChosenElement == "rock") {
                playerScore++;
                return 1;
            } else {computerScore++; return -1;}

        case "scissors":
            if (computerChosenElement == "paper") {
                playerScore++;
                return 1;
            } else {computerScore++; return -1};

        default: return 2;
    };
};

function renderState(result) {
    switch(result) {
        case 1: gameStateEl.textContent = "You won!";
        break;

        case -1: gameStateEl.textContent = "You lost!";
        break;

        case 2: gameStateEl.textContent = "There has been an error.";
        break;
    };
};

function renderTie() {
    gameStateEl.textContent = "Tie!"; 
};

function renderScore(playerScore, computerScore) {
    scoreDisplayEl.innerHTML = `${playerScore} - ${computerScore}`;
};