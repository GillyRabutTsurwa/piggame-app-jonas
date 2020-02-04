var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var dice;
var gamePlaying; 
var previousDice = 0;
var winningScore;



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
        dice = Math.floor(Math.random() * 6) + 1;
        
        if (dice === 6 && previousDice === 6) {
            eraseScore();
            nextPlayer();
        }

        diceDisplay.style.display = "block";    
        diceDisplay.src = "dice-" + dice + ".png"; 

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer();
        }
        previousDice = dice;
    }
    else {
        previousDice = 0;
    }
});


holdButton.addEventListener("click", function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

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
        current1Label.textContent = "0";
        current2Label.textContent = "0";
        
        showCurrentPlayer1.classList.toggle("active");
        showCurrentPlayer2.classList.toggle("active");
        
        diceDisplay.style.display = "none";
}

function playerWinner() {
    document.querySelector("#name-" + activePlayer).textContent = "Winner";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    diceDisplay.style.display = "none";
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










