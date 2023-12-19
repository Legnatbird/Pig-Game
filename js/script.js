const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

let player1 = $(".player--0")
let player2 = $(".player--1")
let current1 = $("#current--0")
let current2 = $("#current--1")
let score1 = $("#score--0")
let score2 = $("#score--1")
var img = $(".dice")
let btn_roll = $(".btn--roll")
let btn_hold = $(".btn--hold")
let btn_new = $(".btn--new")

var currentPlayer = ($(".player--active"))


btn_roll.addEventListener("click", () => {
    var dice = Math.trunc(Math.random() * 6) + 1
    img.src = `img/dice-${dice}.png`
    img.classList.remove("hidden")
    if (dice === 1) {
        if (currentPlayer.classList.contains("player--0")) {
            current1.textContent = 0
            currentPlayer.classList.remove("player--active")
            player2.classList.add("player--active")
            currentPlayer = player2
            dice = 0
        } else if (currentPlayer.classList.contains("player--1")) {
            current2.textContent = 0
            player1.classList.add("player--active")
            currentPlayer.classList.remove("player--active")
            currentPlayer = player1
            dice = 0
        }
    }
    if (currentPlayer.classList.contains("player--0")) {
        var k = current1.textContent
        current1.textContent = Number(k) + dice
    } else {
        var k = current2.textContent
        current2.textContent = Number(k) + dice
    }
})
btn_hold.addEventListener("click", () => {
    if (currentPlayer.classList.contains("player--0")) {
        var p = score1.textContent
        currentPlayer.classList.remove("player--active")
        score1.textContent = Number(p) + Number(current1.textContent)
        if (score1.textContent >= 100) {
            currentPlayer.classList.add("player--winner")
            btn_hold.disabled = true
            btn_roll.disabled = true
        } else {
            player2.classList.add("player--active")
            currentPlayer = player2
            current1.textContent = 0
        }

    } else {
        var q = score2.textContent
        currentPlayer.classList.remove("player--active")
        score2.textContent = Number(q) + Number(current2.textContent)
        if (score2.textContent >= 100) {
            currentPlayer.classList.add("player--winner")
            btn_hold.disabled = true
            btn_roll.disabled = true
        } else {
            player1.classList.add("player--active")
            currentPlayer = player1
            current2.textContent = 0
        }
    }
})
btn_new.addEventListener("click", () => {
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
})