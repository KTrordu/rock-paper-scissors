import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {getDatabase,
    ref,
    onValue,
    set
    } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
    databaseURL : 
    "https://rock-paper-scissors-9523b-default-rtdb.europe-west1.firebasedatabase.app/"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const referenceInDB = ref(db, "gameScores");

const choicesContEl = document.getElementById("choices-container");
const gameStateEl = document.getElementById("game-state");
const scoreDisplayEl = document.getElementById("score-display");
const resetButtonEl = document.getElementById("reset-button");
const resetKey = "reset";

const gameElements = ["rock" , "paper" , "scissors"];

onValue(referenceInDB, function (snapshot) {
    const snapshotDoesExist = snapshot.exists();

    if (snapshotDoesExist) {
        const snapshotValue = snapshot.val();
        const gameScores = Object.values(snapshotValue);

        const playerScore = gameScores[1];
        const computerScore = gameScores[0];
        renderScore(playerScore, computerScore);
    }
});

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
resetButtonEl.addEventListener("click", resetGame);

function renderGame(choice) {
    const computerChosenElement = chooseElement();

    if (choice == computerChosenElement) {
        renderTie();
        return;
    }

    renderState(chooseWinner(choice, computerChosenElement));
    updateScores(playerScore, computerScore);
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

        case "reset": gameStateEl.textContent = "";
    };
};

function renderTie() {
    gameStateEl.textContent = "Tie!"; 
};

function renderScore(playerScore, computerScore) {
    scoreDisplayEl.innerHTML = `${playerScore} - ${computerScore}`;
};

function resetGame() {
    playerScore = 0;
    computerScore = 0;

    set(referenceInDB, {
        playerScore: playerScore,
        computerScore: computerScore
    });
    
    renderState(resetKey);
    renderScore(playerScore, computerScore);
};

function updateScores(playerScore, computerScore) {
    set(referenceInDB, {
        playerScore: playerScore,
        computerScore: computerScore
    });
};