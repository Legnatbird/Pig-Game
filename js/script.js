const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

let player1 = $(".player--0")
let player2 = $(".player--1")
let current1 = $("#current--0")
let current2 = $("#current--1")
let score1 = $("#score--0")
let score2 = $("#score--1")
let img = $(".dice")
let btn_roll = $(".btn--roll")
let btn_hold = $(".btn--hold")
let btn_new = $(".btn--new")

let currentPlayer = ($(".player--active"))

let socket = new WebSocket("ws://localhost:8080/game")
let currentScore;
let action;
let data;
let dice;

socket.onmessage = (event) => {
	let formattedData = event.data.replace(/'/g, '"')
	data = JSON.parse(formattedData)
	switch (data.action) {
		case 0:
			dice = data.roll
			currentScore = data.currentScore

			if (dice != undefined) {
				img.classList.remove("hidden")
				img.src = `img/dice-${dice}.png`
			}

			if (data.player == 1) {
				current1.textContent = currentScore
				current2.textContent = 0
			} else {
				current1.textContent = 0
				current2.textContent = currentScore
			}

			if (dice == 1) {
				if (data.player == 1) {
					current1.textContent = 0
					player1.classList.remove("player--active")
					player2.classList.add("player--active")
					currentPlayer = player2
				} else {
					current2.textContent = 0
					player2.classList.remove("player--active")
					player1.classList.add("player--active")
					currentPlayer = player1
				}
			}
			break
		case 1:
			if (data.player == 1) {
				currentPlayer.classList.remove("player--active")
				score1.textContent = data.player1Score
				if (data.player1Score >= 100) {
					currentPlayer.classList.add("player--winner")
					btn_hold.disabled = true
					btn_roll.disabled = true
				} else {
					player2.classList.add("player--active")
					currentPlayer = player2
					current1.textContent = 0
				}

			} else {
				currentPlayer.classList.remove("player--active")
				score2.textContent = data.player2Score
				if (data.player2Score >= 100) {
					currentPlayer.classList.add("player--winner")
					btn_hold.disabled = true
					btn_roll.disabled = true
				} else {
					player1.classList.add("player--active")
					currentPlayer = player1
					current2.textContent = 0
				}
			}
			break
		case 2:
			current1.textContent = 0
			current2.textContent = 0
			score1.textContent = 0
			score2.textContent = 0
			img.classList.add("hidden")
			currentPlayer.classList.remove("player--winner")
			currentPlayer = player1
			currentPlayer.classList.add("player--active")
			btn_hold.disabled = false
			btn_roll.disabled = false
			break
	}
}

btn_roll.addEventListener("click", () => {
	socket.send("roll")
})

btn_hold.addEventListener("click", () => {
	socket.send("hold")
})

btn_new.addEventListener("click", () => {
	socket.send("reset")
})