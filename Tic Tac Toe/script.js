const boxes = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const resetall = document.querySelector(".reset-all");
const winline = document.querySelector('h2');
const scoreboard = document.querySelector(".scoreboard");
const xScore = document.getElementById('x-score');
const oScore = document.getElementById('o-score');
const drawScore = document.getElementById('draw-score');
let turn = document.querySelector('h3');

let xWins = 0;
let oWins = 0;
let draws = 0;

const win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let player = true;


boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (player) {
            box.textContent = 'X';
            box.style.color = 'rgba(255, 0, 238, 1)';
        }
        else {
            box.textContent = 'O';
            box.style.color = 'rgba(0, 255, 238, 1)';
        }
        box.disabled = true;
        checkWin();
        if (!winline.textContent) {
            player = !player;
            checkturn();
        }

    });
});

function checkturn() {
    if (player) {
        turn.textContent = 'Player X\'s turn';
        turn.style.color = "rgba(255, 0, 162, 1)"
    }
    else {
        turn.textContent = 'Player O\'s turn';
        turn.style.color = "rgba(0, 255, 238, 1)"
    }
}

function checkWin() {
    let winnerfound = false;
    for (let e of win) {
        let [a, b, c] = e;
        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
            winline.textContent = `Player ${boxes[a].textContent} wins!`;
            winline.style.display = 'block';
            winnerfound = true;
            boxes.forEach((box) => box.disabled = true);
            const winner = boxes[a].textContent;
            const winClass = winner === 'X' ? 'win-x' : 'win-o';
            boxes[a].classList.add(winClass);
            boxes[b].classList.add(winClass);
            boxes[c].classList.add(winClass);

            if (winner === 'X') {
                xWins++;
                xScore.textContent = xWins;
            } else {
                oWins++;
                oScore.textContent = oWins;
            }
            return;
        }
    }
    if (!winnerfound) {
        let allFilled = true;
        for (let box of boxes) {
            if (box.innerText === "") allFilled = false;
        }
        if (allFilled) {
            winline.textContent = 'It\'s a draw!';
            draws++;
            drawScore.textContent = draws;
            winline.style.display = 'block';
        }

    }
};

function resetgame(){
 boxes.forEach((box) => {
        box.textContent = '';
        box.disabled = false;
        box.classList.remove("win", "win-x", "win-o");
    });
    winline.textContent = '';
    winline.style.display = 'none';
    player = true;
    checkturn();
}

reset.addEventListener('click', () => {
   resetgame();
});

resetall.addEventListener('click', () => {
    resetgame();
    xWins = 0;
    oWins = 0;
    draws = 0;
    xScore.textContent = xWins;
    oScore.textContent = oWins;
    drawScore.textContent = draws;
})