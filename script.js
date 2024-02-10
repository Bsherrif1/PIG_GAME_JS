"use strict"

let newGame = document.querySelector(".btn--new");
let rollDice = document.querySelector(".btn--roll");
let hold = document.querySelector(".btn--hold");

let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");


const score0A = document.querySelector("#score--0");
const score1A = document.querySelector("#score--1");
let currentScore0 = document.querySelector("#current--0");
let currentScore1 = document.querySelector("#current--1");

let diceA = document.querySelector(".dice");
let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0A.textContent = 0;
    score1A.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    diceA.classList.add("hidden");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");

};
init();

let switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active")
}

let start = rollDice.addEventListener("click", function () {
    if (playing) {
        // generate random number
        let dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // display dice
        diceA.classList.remove("hidden");
        diceA.src = `dice-${dice}.png`;
        // update score
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
});

let holding = hold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceA.classList.add('hidden')
        } else {
            switchPlayer();
        }
    }
})

newGame.addEventListener("click", init);

