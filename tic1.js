let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("button");
let turn = "X";
let gameOver = false;

// Winning combinations
const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

// Handle box click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.textContent === "" && !gameOver) {
            box.textContent = turn;
            box.style.pointerEvents = "none";
            checkWinner();
            turn = turn === "X" ? "O" : "X";
        }
    });
});

// Check for winner
function checkWinner() {
    winPatterns.forEach(pattern => {
        let [a, b, c] = pattern;
        if (
            boxes[a].textContent &&
            boxes[a].textContent === boxes[b].textContent &&
            boxes[b].textContent === boxes[c].textContent
        ) {
            gameOver = true;
            highlightWinner(a, b, c);
            alert(`${boxes[a].textContent} wins!`);
        }
    });
}

// Highlight winning boxes
function highlightWinner(a, b, c) {
    [a, b, c].forEach(i => {
        boxes[i].style.backgroundColor = "#06ae2a";
        boxes[i].style.color = "white";
    });
}

// Reset game
resetBtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.textContent = "";
        box.style.pointerEvents = "auto";
        box.style.backgroundColor = "#ffd500";
        box.style.color = "turquoise";

    });
    turn = "X";
    gameOver = false;
});

function checkWinner() {
    let filledBoxes = 0;
    let winnerFound = false;

    winPatterns.forEach(pattern => {
        let [a, b, c] = pattern;
        if (
            boxes[a].textContent &&
            boxes[a].textContent === boxes[b].textContent &&
            boxes[b].textContent === boxes[c].textContent
        ) {
            gameOver = true;
            winnerFound = true;
            highlightWinner(a, b, c);
            alert(`${boxes[a].textContent} wins!`);
        }
    });

    // Count filled boxes
    boxes.forEach(box => {
        if (box.textContent !== "") filledBoxes++;
    });

    // If all boxes are filled and no winner
    if (filledBoxes === 9 && !winnerFound) {
        gameOver = true;
        alert("It's a draw!");
    }
}