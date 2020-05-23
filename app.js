/*
GAME RULES: 🐷

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// 1. VARIABLES
var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var dice;
var gamePlaying; // this is our state variable
var previousDice = 0;
var winningScore;



// 1B. Manipulation Variables
//var scoreshow = document.querySelector("#current-" + activePlayer);
var rollButton = document.querySelector(".btn-roll");
var holdButton = document.querySelector(".btn-hold");
var newButton = document.querySelector(".btn-new");
var diceDisplay = document.querySelector(".dice");
var score1Label = document.getElementById("score-0");
var current1Label = document.getElementById("current-0");
var score2Label = document.getElementById("score-1");
var current2Label = document.getElementById("current-1");
var showCurrentPlayer1 = document.querySelector(".player-0-panel");
var showCurrentPlayer2 = document.querySelector(".player-1-panel");
var scoreInput = document.querySelector("#input_digit");
var scoreInputButton = document.querySelector(".setWinningScore");


initialise();

scoreInputButton.addEventListener("click", function() {
    changeWinningScore();
});


rollButton.addEventListener("click", function() {
    if (gamePlaying) {
            // 1. Random Number
        dice = Math.floor(Math.random() * 6) + 1;
        
        // Erase scores if two 6s are rolled
        if (dice === 6 && previousDice === 6) {
            eraseScore();
            nextPlayer();
        }

        // 2. Display result
        diceDisplay.style.display = "block";    
        diceDisplay.src = "dice-" + dice + ".png"; //dice-1.png, dice-2.png, dice-3.png, etc.

        // 3. Update the roundScore if rolled number != 1
        if (dice !== 1) {
            //Aggregate the dice score to the roundScore variable.
            roundScore += dice;
            // scoreshow.textContent = roundScore;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer();
        }
        // Pourquoi ce code ici ?
        previousDice = dice;
    }
    else {
        previousDice = 0;
    }
});


holdButton.addEventListener("click", function() {
    if (gamePlaying) {
            // 1. Add current score to the gloabl score
        scores[activePlayer] += roundScore;

        // 2. Update the user interface
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        // nextPlayer();

        // 3. Check if the player won the game. (if global score = 100.)
        changeWinningScore();
            
        if (scores[activePlayer] >= winningScore) {
            playerWinner();
            gamePlaying = false;
        }
        
        else {
            nextPlayer();
        }
    }  
});


newButton.addEventListener("click", initialise); 
    



// ================================== FUNCTIONS ==================================

function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        // scoreshow.textContent = roundsScore;
        current1Label.textContent = "0";
        current2Label.textContent = "0";
        
        // show active player.
        showCurrentPlayer1.classList.toggle("active");
        showCurrentPlayer2.classList.toggle("active");
        
        diceDisplay.style.display = "none";
        // diceDisplay.classList.add(".hide");
}

function playerWinner() {
    document.querySelector("#name-" + activePlayer).textContent = "Winner";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    diceDisplay.style.display = "none";
    
    //    diceDisplay.classList.add(".hide");
}

function initialise() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    score1Label.textContent = current1Label.textContent = score2Label.textContent = current2Label.textContent = "0";  
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    diceDisplay.style.display = "none";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    
    document.querySelector(".player-0-panel").classList.add("active");
}

function eraseScore() {
    scores[activePlayer] = 0;
    roundScore = 0;
    
    document.querySelector("#current-" + activePlayer).textContent = "0";
    document.querySelector("#score-" + activePlayer).textContent = "0";
}


function changeWinningScore() {
    if (scoreInput.value) {
        if (scoreInput.value >= 20 && scoreInput.value <= 500) {
            winningScore = scoreInput.value;
//            scoreInput.style.backgroundColor = "cornflowerblue";
        }
        else {
            winningScore = 100;
            alert("Game is too short or too long BRO");
        }
    }
    else {
        winningScore = 100;
    }
}










