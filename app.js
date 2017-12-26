
var activePlayer, scores, currentScore, finalScore, gamePlaying; // private attributes

newGame();  // start a new game on loading

// when game is initialized or player press "NEW GAME" button
function newGame(){
	activePlayer = 0;
	scores = [0,0];
	currentScore = 0;
	gamePlaying = true;
	finalScore = document.querySelector(".final-score").value;
	if (!finalScore) finalScore = 100;
	document.getElementById("dice-0").style.display = "none";
	document.getElementById("dice-1").style.display = "none";
	document.getElementById("score-0").innerHTML = 0;
	document.getElementById("score-1").innerHTML = 0;
	document.getElementById("name-0").innerHTML = "Player 1";
	document.getElementById("name-1").innerHTML = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}

// when game is in play mode and player press "ROLL DICE" button
function rollDice(){
	if (gamePlaying){
		var current = document.getElementById("current-" + activePlayer);
		var num1 = Math.floor(Math.random() * 6) + 1;
		var num2 = Math.floor(Math.random() * 6) + 1;
		var dice1 = document.getElementById("dice-0");
		var dice2 = document.getElementById("dice-1");
		dice1.style.display = "block";
		dice2.style.display = "block";
		dice1.src = "dice-" + num1 + ".png";
		dice2.src = "dice-" + num2 + ".png";
		if (num1 == num2) {
			currentScore = 0;
			current.innerHTML = currentScore;
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			switchPlayer();
			return;
		}
		currentScore += num1;
		currentScore += num2;
		current.innerHTML = currentScore;
		return;
	}
}

// when game is in play mode and player press "HOLD" button
function hold(){
	scores[activePlayer] += currentScore;
	currentScore = 0;
	document.getElementById("current-" + activePlayer).innerHTML = currentScore;
	document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer];
	if (scores[activePlayer]>=finalScore){
		document.getElementById("name-" + activePlayer).innerHTML = "WINNER!";
		document.getElementById("name-" + activePlayer).style.color = "Red";
		gamePlaying = false;
	}
	else {
		document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
		switchPlayer();
	}
}

// a private helper function to switch active player
function switchPlayer(){
	activePlayer = (activePlayer + 1) % 2;
	document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
}
