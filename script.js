// Get references to the HTML elements
let elGlobalScorePlayer1 = document.getElementById('globalScorePlayer1');
let elGlobalScorePlayer2 = document.getElementById('globalScorePlayer2');
let elCurrentScorePlayer1 = document.getElementById('currentScorePlayer1');
let elCurrentScorePlayer2 = document.getElementById('currentScorePlayer2');
let diceImg = document.getElementById('diceImg'); // Dice image
let rollDice = document.getElementById('rollDice'); // "Roll Dice" button
let newGame = document.getElementById('newGame'); // "New Game" button
let hold = document.getElementById('hold'); // "Hold" button
let player1 = document.getElementById('player1'); // Player 1 sticker
let player2 = document.getElementById('player2'); // Player 2 sticker
let player1Title = document.getElementById('player1title'); // Player 1 title
let player2Title = document.getElementById('player2title'); // Player 2 title

// References to audio elements and sound toggle button
const rollDiceSound = new Audio("./audio/roulementDeDee.mp3");
const diceOneSound = new Audio("./audio/deeUn.mp3");
const winnerSound = new Audio("./audio/vainqueur.mp3");
const holdSound = new Audio("./audio/conserver.mp3");
const toggleButton = document.getElementById("toggleSoundButton");
let soundIcon = document.getElementById("soundIcon");

// Global variables
let globalScorePlayer1 = 0;
let globalScorePlayer2 = 0;
let score = 0;
let currentPlayer = 1;
let dice;

let player1Name, player2Name;

// Variable to track sound state
var isSoundEnabled = true;

// Function to toggle sound for all audio clips
const toggleSound = () => {
  isSoundEnabled = !isSoundEnabled; // Enable or disable sound
  soundIcon.src = !isSoundEnabled ? './img/volumemute.png' : './img/volumeunmute.png'; // Load appropriate icon based on choice
  soundIcon.alt = !isSoundEnabled ? "Enable Sound" : "Disable Sound"; // Load appropriate alt text based on choice
  if (isSoundEnabled) {
    rollDiceSound.play();
    diceOneSound.play();
    holdSound.play();
  } else {
    rollDiceSound.pause();
    diceOneSound.pause();
    holdSound.pause();
  }
}

// Prompt players to enter their names
function getPlayerNames() {
  let input1 = prompt("Player 1 Name:");
  let input2 = prompt("Player 2 Name:");
  // Check if a name was entered and it's not empty
  if (!input1 || input1.trim() === "") {
    input1 = "Player 1"; // Use a default value if name is not valid
  }
  player1Name = input1.trim();
  player1Title.textContent = player1Name;
  if (!input2 || input2.trim() === "") {
    input2 = "Player 2"; // Use a default value if name is not valid
  }
  player2Name = input2.trim();
  player2Title.textContent = player2Name;
  // Store player names in localStorage
  localStorage.setItem("player1Name", player1Name);
  localStorage.setItem("player2Name", player2Name);
}

// Check if player names were stored previously
const checkPlayerNames = () => {
  player1Name = localStorage.getItem("player1Name"); // Retrieve player 1 name from local storage
  player2Name = localStorage.getItem("player2Name"); // Retrieve player 2 name from local storage

  if (!player1Name || !player2Name) {
    getPlayerNames(); // Prompt players to enter their names if not stored
  } else {
    player1Title.textContent = player1Name;
    player2Title.textContent = player2Name;
  }
};

checkPlayerNames();

// Restore everything, it's a new game!
const restore = () => {
  score = 0;
  elGlobalScorePlayer1.textContent = '0';
  elGlobalScorePlayer2.textContent = '0';
  elCurrentScorePlayer1.textContent = '0';
  elCurrentScorePlayer2.textContent = '0';
  checkPlayerNames();
};

const changeCurrentPlayer = () => {
  score = 0; // Reset the score
  currentPlayer = currentPlayer === 1 ? 2 : 1; // Change the current player

  player1.classList.toggle('currentPlayerSticker');
  player2.classList.toggle('currentPlayerSticker');
  player1Title.classList.toggle('text-secondary');
  player2Title.classList.toggle('text-secondary');
};

// Function to disable rollDice and hold buttons
const disableButtons = () => {
  rollDice.disabled = true;
  hold.disabled = true;
};

// Function to enable rollDice and hold buttons
const enableButtons = () => {
  rollDice.disabled = false;
  hold.disabled = false;
};

// Generate a random number and change the dice image src
const roll = () => {
  dice = Math.floor(Math.random() * 6) + 1;
  diceImg.src = `img/dice${dice}.png`;
};

const rollDiceHandler = () => {
  roll(); // Call the roll function to roll the dice

  if (dice !== 1) {
    if (isSoundEnabled) {
      rollDiceSound.play();
    }

    score += dice;
    currentPlayer === 1 ? elCurrentScorePlayer1.textContent = score : elCurrentScorePlayer2.textContent = score;
    // If the dice is not 1, the player keeps their current score
  } else {
    if (isSoundEnabled) {
      diceOneSound.play();
    }

    // Add the diceOne class to the dice image
    diceImg.classList.add('diceOne');
    disableButtons();
    // Remove the 'diceOne' class
    setTimeout(() => {
      diceImg.classList.remove('diceOne');
      changeCurrentPlayer();
      enableButtons();
    }, 1500);

    score = 0;
  }
};

// Function to display a styled alert and call the restore function
function displayWinnerAlert(winnerName) {
  const alertContent = document.createElement('div');
  alertContent.classList.add('alert');
  alertContent.textContent = `${winnerName} won!`;
  document.body.appendChild(alertContent);
  if (isSoundEnabled) {
    winnerSound.play();
  }
  // Caution: The restore is triggered here, after setTimeout
  setTimeout(() => {
    alertContent.remove();
    restore();
  }, 5000);
}

// Function to check if a player has won and trigger the displayWinnerAlert function
const checkForWinner = () => {
  if (globalScorePlayer1 >= 100 || globalScorePlayer2 >= 100) {
    return true; // Return the name of the winner
  } else {
    return false; // Indicate that no one has won yet
  }
};

// Function to handle the "Hold" button click event
const holdHandler = () => {
  // Add the score to the current player's global score
  currentPlayer === 1 ? (globalScorePlayer1 += score) : (globalScorePlayer2 += score);
  currentPlayer === 1 ? (elGlobalScorePlayer1.textContent = globalScorePlayer1) : (elGlobalScorePlayer2.textContent = globalScorePlayer2);

  if (checkForWinner()) {
    let winnerName = currentPlayer === 1 ? player1Name : player2Name;
    displayWinnerAlert(winnerName);
  } else {
    if (isSoundEnabled) {
      holdSound.play(); // Play the "Hold" sound if sound is enabled and there is no winner yet
    }
    changeCurrentPlayer();
  }
};

// Add an event listener for the click on the sound toggle button
toggleButton.addEventListener("click", function() {
  toggleSound();
});

// New game (call the restore function) on click of the "New Game" button
function newGameHandler() {
  restore();
  getPlayerNames(); // Prompt for player names again
}

rollDice.addEventListener('click', rollDiceHandler);
hold.addEventListener('click', holdHandler);
newGame.addEventListener('click', newGameHandler);
