let elGlobalScorePlayer1 = document.getElementById('globalScorePlayer1');
let elGlobalScorePlayer2 = document.getElementById('globalScorePlayer2');
let elCurrentScorePlayer1 = document.getElementById('currentScorePlayer1');
let elCurrentScorePlayer2 = document.getElementById('currentScorePlayer2');
let diceImg = document.getElementById('diceImg'); // Dice img 
let rollDice = document.getElementById('rollDice'); // RollDice
let newGame = document.getElementById('newGame'); // New Game Button
let hold = document.getElementById('hold');
let player1 = document.getElementById('player1'); // For The Red Sticker
let player2 = document.getElementById('player2'); // For The Red Sticker
let player1Title = document.getElementById('player1title'); // Title "Player 1"
let player2Title = document.getElementById('player2title'); // Title2 "Player "

  let globalScorePlayer1 = 0, 
  globalScorePlayer2 = 0,
  score = 0,
  currentPlayer = 1,
  dice;

let player1Name,
    player2Name;

  function getPlayerNames() {
    let input1 = prompt("Nom du joueur 1 :");
    let input2 = prompt("Nom du joueur 2 :");
  
  // Vérifier si les noms ont été entrés et ne sont pas vides
  if (!input1 || input1.trim() === "") {
    input1 = "Player 1"; // Utiliser une valeur par défaut si le nom n'est pas valide
  }

  if (!input2 || input2.trim() === "") {
    input2 = "Player 2"; // Utiliser une valeur par défaut si le nom n'est pas valide
  }

  // Valider les noms en utilisant des critères spécifiques
  const nameRegex =/^[A-z0-9\s]{1,30}$/; // Regex pour autoriser les lettres, chiffres et espaces et limiter à 30 caractères
  if (!nameRegex.test(input1)) {
    input1 = "Player 1"; // Utiliser une valeur par défaut si le nom ne respecte pas les critères
  }

  if (!nameRegex.test(input2)) {
    input2 = "Player 2"; // Utiliser une valeur par défaut si le nom ne respecte pas les critères
  }
    player1Name = input1.trim();
    player2Name = input2.trim();
    player1Title.textContent = player1Name;
    player2Title.textContent = player2Name;
  }


getPlayerNames();

// Restore all, it's a new game!
const restore = () => {
  elGlobalScorePlayer1.textContent = '0';  
  elGlobalScorePlayer2.textContent ='0';  
  elCurrentScorePlayer1.textContent ='0';
  elCurrentScorePlayer2.textContent = '0';
  getPlayerNames();
};

const changeCurrentPlayer = () => {
  score = 0; // Restore score
  currentPlayer = currentPlayer === 1 ? 2 : 1; // Change the current player

  player1.classList.toggle('currentPlayerSticker');
  player2.classList.toggle('currentPlayerSticker');
  player1Title.classList.toggle('text-secondary');
  player2Title.classList.toggle('text-secondary');

};

// One click to rollDice Button
const rollDiceHandler = () => {
  dice = Math.floor(Math.random() * 6) + 1; // Return a number from 1 to 6
  diceImg.src = `img/dice${dice}.png`; // Change the img src {dice.value}
  
  // When dice is not equal to 1, add dice value to score
  if (dice !== 1) {
    score += dice; 
    currentPlayer === 1 ? elCurrentScorePlayer1.textContent = score : elCurrentScorePlayer2.textContent = score; // Add score in HTML for the current player
  } else {
    // If dice is 1, reset score and change current player
    score = 0;
    changeCurrentPlayer();
  }
};



const holdHandler = () => {
  // Add score to globalScore of current Player
  currentPlayer === 1 ? (globalScorePlayer1 += score) : (globalScorePlayer2 += score);
  
  // Update globalScore in HTML for the current player
  currentPlayer === 1 ? (elGlobalScorePlayer1.textContent = globalScorePlayer1) : (elGlobalScorePlayer2.textContent = globalScorePlayer2);
  
  if (globalScorePlayer1 >= 100 || globalScorePlayer2 >= 100) {
    let winnerName = currentPlayer === 1 ? player1Name : player2Name;
    const alertContent = document.createElement('div');
    alertContent.classList.add('alert', 'alert-success');
    alertContent.textContent = `(${winnerName}) a gagné!`;
    // Ajouter l'alerte au corps du document
    document.body.appendChild(alertContent);
    setTimeout(() => {
      alertContent.remove();
    }, 6000);
  } else {
    changeCurrentPlayer();
  }
};

// Start new Game (call restore function) On Click to Button NEW GAME
function newGameHandler() {
  restore();
}


rollDice.addEventListener('click', rollDiceHandler);
hold.addEventListener('click', holdHandler);
newGame.addEventListener('click', newGameHandler);

