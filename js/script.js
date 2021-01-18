// Randomized computer plays Rock, Paper, or Scissors at equal chance.
function computerPlay() {

    // This function returns a random number between min and max (inclusive).
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) +1) + min;
    }

    const randomNumber = getRandomInteger(1, 9999)

    if (randomNumber <= 3333) {
        return "Rock" // RNG resulting in 1-3333 (1/3 chance) results in Rock.;
    } else if (randomNumber >= 5000) {
        return "Paper" // RNG resulting in 5000-9999 (1/2 chance) results in Paper.
    } else {
        return "Scissors" // Needs to be 50/50 for last two because getRandomInteger() runs again.
    } // In other words, (1/2 chance given a 2/3 chance === 1/3 chance.)
}

// Test RNG
function testComputerPlay(numberOfRolls) {

    let numberOfRock = 0
    let numberOfPaper = 0
    let numberOfScissors = 0

    for (i = 0; i < numberOfRolls; i++) {
        if (computerPlay() === "Rock") {
            numberOfRock += 1;
        } else if (computerPlay() === "Paper") {
            numberOfPaper += 1;
        } else {
            numberOfScissors += 1;
        }
    }

    return "Rock: " + numberOfRock + ". Paper:" + numberOfPaper + ". Scissors:" + numberOfScissors + ".";
}

// Initial values and declarations
let playerSelection;
let computerSelection;
let lastRound;
let playerScore = 0;
let computerScore = 0;

// New game.
function newGame() {

    playerScore = 0;
    computerScore = 0;

    const playerScoreboard = document.querySelector("#player-score");
    playerScoreboard.textContent = `Player: ${playerScore}`;

    const computerScoreboard = document.querySelector("#computer-score");
    computerScoreboard.textContent = `Computer: ${computerScore}`;

    const commentary = document.querySelector("#commentary-text");
    commentary.textContent = "Submit your move to start a game. First to 5 points is the winner!"

    gameEnd.textContent = "";
    
    // Button Event Listeners
    // Each click should play a round and update the game state, thus updating the onscreen text.
    const buttons = document.querySelectorAll('.rock-paper-scissors-button');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            playerSelection = button.id;
            computerSelection = computerPlay();
            playRound(playerSelection, computerSelection);
            gameStateCheck(playerScore, computerScore);
        });
    });
}

// Button Event Listeners
// Each click should play a round and update the game state, thus updating the onscreen text.
const buttons = document.querySelectorAll('.rock-paper-scissors-button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        playerSelection = button.id;
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
        gameStateCheck(playerScore, computerScore);
    });
});

//Plays a single round of Rock Paper Scissors.
function playRound(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) { // Tie. Scores do not change.
        lastRound = "It's a tie!";
    } else if (playerSelection === "Rock" && computerSelection === "Paper") { // Computer wins and gains a point.
        computerScore++;
        lastRound = "Paper beats Rock. You lose!";
    } else if (playerSelection === "Rock" && computerSelection === "Scissors") { // Player wins and gains a point.
        playerScore++;
        lastRound = "Rock beats Scissors. You win!";
    } else if (playerSelection === "Paper" && computerSelection === "Scissors") { // Computer wins and gains a point.
        computerScore++;
        lastRound = "Scissors beats Paper. You lose!";
    } else if (playerSelection === "Paper" && computerSelection === "Rock") { // Player wins and gains a point.
        playerScore++;
        lastRound = "Paper beats Rock. You win!";
    } else if (playerSelection === "Scissors" && computerSelection === "Rock") { // Computer wins and gains a point.
        computerScore++;
        lastRound = "Rock beats Scissors. You lose!";
    } else if (playerSelection === "Scissors" && computerSelection === "Paper") { // Player wins and gains a point.
        playerScore++;
        lastRound = "Scissors beats Paper. You win!";
    }
    
}

// Text areas
const playerScoreboard = document.querySelector("#player-score");
playerScoreboard.textContent = `Player: ${playerScore}`;

const computerScoreboard = document.querySelector("#computer-score");
computerScoreboard.textContent = `Computer: ${computerScore}`;

const commentary = document.querySelector("#commentary-text");
commentary.textContent = "Submit your move to start a game. First to 5 points is the winner!"

const gameEnd = document.querySelector("#game-end-text");

// Checks the state of the game and updates the stuff on the screen.
function gameStateCheck(playerScore, computerScore) {
    playerScoreboard.textContent = `Player: ${playerScore}`;
    computerScoreboard.textContent = `Computer: ${computerScore}`;

    if (playerScore <= 5 && computerScore <= 5) {
        commentary.textContent = `You played ${playerSelection}, and Computer played ${computerSelection}. ${lastRound}`
    }

    if (playerScore === 5 || computerScore === 5) {
        if (playerScore === 5) {
            gameEnd.textContent = `You are the first to reach 5 points. You are the winner! Click the button below to start a new game.`;
        }
        if (computerScore === 5) {
            gameEnd.textContent = `Computer was the first to reach 5 points. You lose! Click the button below to start a new game.`;
        }

        const newGameButton = document.createElement('button');
        newGameButton.value = "New Game"
        newGameButton.addEventListener('click', () => {
            newGame();
        });
        gameEnd.appendChild(newGameButton);
    }

}