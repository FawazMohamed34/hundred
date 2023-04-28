let elglobalScorePlayer1 = document.getElementById('globalScorePlayer1');
let elglobalScorePlayer2 = document.getElementById('globalScorePlayer2');
let elcurrentScorePlayer1 = document.getElementById('currentScorePlayer1');
let elcurrentScorePlayer2 = document.getElementById('currentScorePlayer2');
let diceImg = document.getElementById('diceImg');
let rollDice = document.getElementById('rollDice');
let newGame = document.getElementById('newGame');
let hold = document.getElementById('hold');
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');





var globalScorePlayer1 = 0;
var globalScorePlayer2 = 0 ;
var currentPlayer = 1
var dice
var score = 0

//Restore all it's a new game !
const restare = () => {
  globalScorePlayer1, globalScorePlayer2, score = 0;
  currentPlayer = 1
 elglobalScorePlayer1.textContent = 0;  
 elglobalScorePlayer2.textContent = 0;  
 elcurrentScorePlayer1.textContent = 0;
elcurrentScorePlayer2.textContent = 0;
}

const changeCurrentPlayer = () => {
  score = 0 ; // Restore score
  // Add or remove sticker class 
  if (currentPlayer === 1){
    player1.classList.remove('currentPlayerSticker') 
    player2.classList.add('currentPlayerSticker')
  }else{
    player2.classList.remove('currentPlayerSticker')
    player1.classList.add('currentPlayerSticker')
  }
  currentPlayer = currentPlayer === 1 ? 2 : 1 // Change the current player
}

//One click to rollDice Button
rollDice.addEventListener('click', () => {
  dice =  Math.floor(Math.random() * 6) + 1 // Return a numb from 1 to 6
  diceImg.src = `img/dice${dice}.png`; //Change the img src to good dice
  //When dice != 1
   if (dice !== 1){
    score += dice; //Score = Score + dice
    currentPlayer === 1 ? elcurrentScorePlayer1.textContent = score : elcurrentScorePlayer2.textContent = score  // Add score in html for the current player
  }else { //If dice = 1 reset score and change current player
    score = 0;
    changeCurrentPlayer()
}
},true)

  hold.addEventListener('click', () => {
    currentPlayer === 1 ? globalScorePlayer1 += score : globalScorePlayer2 += score; // globalScore of current Player += score
    currentPlayer === 1 ? elglobalScorePlayer1.textContent = globalScorePlayer1 : elglobalScorePlayer2.textContent = 
    globalScorePlayer2; // Add score to globalScore in html for the current player
    if (globalScorePlayer1 >= 100 || globalScorePlayer2 >= 100){ //If player1 or player2 >= 100 it's finish, restare new Game 
      alert(`Player${currentPlayer} a gagné ! ` )
      restare()
    }else{
      changeCurrentPlayer()
    }

  }, true)


// Start new Game (call restare Function) On Click to Button HOLD
  newGame.addEventListener('click', () => {
restare()
  }, true)




