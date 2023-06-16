let elGlobalScorePlayer1 = document.getElementById('globalScorePlayer1');
let elGlobalScorePlayer2 = document.getElementById('globalScorePlayer2');
let elCurrentScorePlayer1 = document.getElementById('currentScorePlayer1');
let elCurrentScorePlayer2 = document.getElementById('currentScorePlayer2');
let diceImg = document.getElementById('diceImg'); //Dice img 
let rollDice = document.getElementById('rollDice'); // RollDice
let newGame = document.getElementById('newGame'); // New Game Button
let hold = document.getElementById('hold');
let player1 = document.getElementById('player1'); //For The  Red Sticker
let player2 = document.getElementById('player2');  //For The  Red Sticker
let player1Title = document.getElementById('player1title" '); // Title "Player 1"
let player2Title = document.getElementById('player2title" '); // Title "Player 1"


var globalScorePlayer1 = 0, 
    globalScorePlayer2 = 0,
    score = 0,
    currentPlayer = 1,
    dice;




//Restore all it's a new game !
const restare = () => {
 elGlobalScorePlayer1.textContent = 0;  
 elGlobalScorePlayer2.textContent = 0;  
 elCurrentScorePlayer1.textContent = 0;
 elCurrentScorePlayer2.textContent = 0;
}

//Restore 
const changeCurrentPlayer = () => {
  score = 0 ; // Restore score
    if (currentPlayer === 1){
       // Add or remove sticker class 
      player1.classList.remove('currentPlayerSticker');
      player2.classList.add('currentPlayerSticker');
      player1title.classList.add('text-secondary');
      player2title.classList.remove('text-secondary');
    }else{
      player2.classList.remove('currentPlayerSticker');
      player1.classList.add('currentPlayerSticker');
      player2title.classList.add('text-secondary');
      player1title.classList.remove('text-secondary');

    }
    currentPlayer = currentPlayer === 1 ? 2 : 1; // Change the current player
}

//One click to rollDice Button
rollDice.addEventListener('click', () => {
  dice =  Math.floor(Math.random() * 6) + 1 // Return a numb from 1 to 6
  diceImg.src = `img/dice${dice}.png`; //Change the img src {dice.value}
  //When dice != 1 score = score + dice 
   if (dice !== 1){
    score += dice; 
    currentPlayer === 1 ? elCurrentScorePlayer1.textContent = score : elCurrentScorePlayer2.textContent = score  // Add score in html for the current player
  }else { //If dice = 1 reset score and change current player
    score = 0;
    changeCurrentPlayer()
}
},true)

  hold.addEventListener('click', () => {
    currentPlayer === 1 ? globalScorePlayer1 += score : globalScorePlayer2 += score; // globalScore of current Player += score
    currentPlayer === 1 ? elGlobalScorePlayer1.textContent = globalScorePlayer1 : elGlobalScorePlayer2.textContent = 
    globalScorePlayer2; // Add score to globalScore in html for the current player
    if (globalScorePlayer1 >= 100 || globalScorePlayer2 >= 100){ //If player1 or player2 >= 100 it's finish, restare new Game 
      alert(`Player ${currentPlayer} a gagné ! ` );
      restare();
    }else{
      changeCurrentPlayer();
    }

  }, true)


// Start new Game (call restare Function) On Click to Button HOLD
  newGame.addEventListener('click', () => {
restare();
  }, true)
