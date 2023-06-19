let elGlobalScorePlayer1 = document.getElementById('globalScorePlayer1');
let elGlobalScorePlayer2 = document.getElementById('globalScorePlayer2');
let elCurrentScorePlayer1 = document.getElementById('currentScorePlayer1');
let elCurrentScorePlayer2 = document.getElementById('currentScorePlayer2');
let diceImg = document.getElementById('diceImg'); // Image du dé
let rollDice = document.getElementById('rollDice'); // Bouton "Lancer le dé"
let newGame = document.getElementById('newGame'); // Bouton "Nouvelle partie"
let hold = document.getElementById('hold'); // Bouton "Conserver"
let player1 = document.getElementById('player1'); // Pour l'autocollant rouge du joueur 1
let player2 = document.getElementById('player2'); // Pour l'autocollant rouge du joueur 2
let player1Title = document.getElementById('player1title'); // Titre "Joueur 1"
let player2Title = document.getElementById('player2title'); // Titre "Joueur 2"

// Références vers les éléments audio et le bouton de bascule du son
const rollDiceSound = new Audio("./audio/roulementDeDee.mp3");
const diceOneSound = new Audio("./audio/un.mp3");
const winnerSound = new Audio ("./audio/winner.mp3");
const toggleButton = document.getElementById("toggleSoundButton");
let soundIcon = document.getElementById("soundIcon");

let globalScorePlayer1 = 0;
let globalScorePlayer2 = 0;
let score = 0;
let currentPlayer = 1;
let dice;

let player1Name, player2Name;

// Variable pour suivre l'état du son
var isSoundEnabled = true;

// Fonction pour activer ou désactiver le son pour toutes les bandes
const toggleSound = () => {
  isSoundEnabled = !isSoundEnabled; // Active ou désactive le son
  soundIcon.src = !isSoundEnabled ? './img/volumemute.png' : './img/volumeunmute.png'; // Charge l'icône appropriée en fonction du choix
  soundIcon.alt = !isSoundEnabled ? "Activer son" : "Désactiver le son"; // Charge le texte alternatif approprié en fonction du choix
  if (isSoundEnabled) {
    rollDiceSound.play();
    diceOneSound.play();
  } else {
    rollDiceSound.pause();
    diceOneSound.pause();
  }
}

// Demandez aux joueurs de saisir un nom
function getPlayerNames() {
  let input1 = prompt("Nom du joueur 1 :");
  let input2 = prompt("Nom du joueur 2 :");
  // Vérifiez si un nom a été saisi et s'il n'est pas vide
  if (!input1 || input1.trim() === "") {
    input1 = "Player 1"; // Utilisez une valeur par défaut si le nom n'est pas valide
  }
  player1Name = input1.trim();
  player1Title.textContent = player1Name;
  if (!input2 || input2.trim() === "") {
    input2 = "Player 2"; // Utilisez une valeur par défaut si le nom n'est pas valide
  }
  player2Name = input2.trim();
  player2Title.textContent = player2Name;
  // Stockez les noms des joueurs dans le localStorage
  localStorage.setItem("player1Name", player1Name);    
  localStorage.setItem("player2Name", player2Name);
}

// Vérifiez si les noms des joueurs ont été stockés précédemment
const checkPlayerNames = () => {
  player1Name = localStorage.getItem("player1Name"); // Récupère le nom du joueur 1 depuis le stockage local
  player2Name = localStorage.getItem("player2Name"); // Récupère le nom du joueur 2 depuis le stockage local

  if (!player1Name || !player2Name) {
    getPlayerNames(); // Demande aux joueurs de saisir leurs noms s'ils ne sont pas stockés
  } else {
    player1Title.textContent = player1Name;
    player2Title.textContent = player2Name;
  }
};

checkPlayerNames();

// Restaurer tout, c'est une nouvelle partie !
const restore = () => {
  score = 0;
  elGlobalScorePlayer1.textContent = '0';  
  elGlobalScorePlayer2.textContent = '0';  
  elCurrentScorePlayer1.textContent = '0';
  elCurrentScorePlayer2.textContent = '0';
  checkPlayerNames();
};

const changeCurrentPlayer = () => {
  score = 0; // Restaurer le score
  currentPlayer = currentPlayer === 1 ? 2 : 1; // Changer le joueur courant

  player1.classList.toggle('currentPlayerSticker');
  player2.classList.toggle('currentPlayerSticker');
  player1Title.classList.toggle('text-secondary');
  player2Title.classList.toggle('text-secondary');
};

// Fonction pour désactiver les boutons rollDice et hold
const disableButtons = () => {
  rollDice.disabled = true;
  hold.disabled = true;
};

// Fonction pour activer les boutons rollDice et hold
const enableButtons = () => {
  rollDice.disabled = false;
  hold.disabled = false;
};

// Au clic sur le bouton "Lancer le dé"
const rollDiceHandler = () => {
  dice = Math.floor(Math.random() * 6) + 1; // Génère un nombre de 1 à 6
  diceImg.src = `img/dice${dice}.png`; // Changer la source de l'image du dé

  if (dice !== 1) {
    // Lecture du son "roulementDeDee" si le son est activé
    if (isSoundEnabled) {
      rollDiceSound.play();
    }
    score += dice;
    // Ajouter le score dans le HTML pour le joueur en cours
    currentPlayer === 1 ? elCurrentScorePlayer1.textContent = score : elCurrentScorePlayer2.textContent = score;
  } else { // dice === 1 
    // Lecture du son "un.mp3" si le son est activé
    if (isSoundEnabled) {    
      diceOneSound.play();
    }
    // Ajoute la classe 'diceOne' pour faire clignoter l'image
    diceImg.classList.add('diceOne');
    // Désactiver le bouton rollDice pendant l'animation de clignotement
    disableButtons();
    // Supprime la classe 'diceOne' après 1.5 seconde pour arrêter le clignotement
    setTimeout(() => {
      diceImg.classList.remove('diceOne');
      changeCurrentPlayer();
      enableButtons();
    }, 1500);
    score = 0;
  }
};

// Fonction qui affiche une alerte stylisée puis appelle la fonction restore
function displayWinnerAlert(winnerName) {
  const alertContent = document.createElement('div');
  alertContent.classList.add('alert');
  alertContent.textContent = `(${winnerName}) a gagné !`;
  document.body.appendChild(alertContent);
  if (isSoundEnabled) {
    winnerSound.play();
  }
  // Attention, la restauration est déclenchée ici, après setTimeout
  setTimeout(() => {
    alertContent.remove();
    restore();
  }, 5000);
}

// Fonction qui vérifie si un joueur a gagné et déclenche la fonction displayWinnerAlert
const checkForWinner = () => {
  if (globalScorePlayer1 >= 100 || globalScorePlayer2 >= 100) {
    return true; // Retourne le nom du gagnant
  } else {
    return false; // Indique que personne n'a pas encore gagné
  }
};

// Fonction qui écoute le bouton "Conserver"
const holdHandler = () => {
  // Ajoute le score au globalScore du joueur courant
  currentPlayer === 1 ? (globalScorePlayer1 += score) : (globalScorePlayer2 += score);
  currentPlayer === 1 ? (elGlobalScorePlayer1.textContent = globalScorePlayer1) : (elGlobalScorePlayer2.textContent = globalScorePlayer2);
  
  if (checkForWinner()) {
    let winnerName = currentPlayer === 1 ? player1Name : player2Name;
    displayWinnerAlert(winnerName);
  } else {
    changeCurrentPlayer();
  }
};

// Ajoute un gestionnaire d'événement pour le clic sur le bouton de bascule du son
toggleButton.addEventListener("click", function() {
  toggleSound();
});

// Nouvelle partie (appelle la fonction restore) lors du clic sur le bouton "Nouvelle partie"
function newGameHandler() {
  restore();
  getPlayerNames(); // Demande à nouveau les noms des joueurs
}

rollDice.addEventListener('click', rollDiceHandler);
hold.addEventListener('click', holdHandler);
newGame.addEventListener('click', newGameHandler);
