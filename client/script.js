
let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];

const boardElement = document.getElementById("board");
const resetButtonElement = document.getElementById("reset");

function renderBoard(board, boardContainer, isEnd = false) {
    boardContainer.innerHTML = "";
    board.forEach((row, rowIndex) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        row.forEach((cell, colIndex) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.row = rowIndex;
            cellButton.dataset.col = colIndex;
            cellButton.textContent = cell;
            if (cell !== " " || isEnd) {

                cellButton.disabled = true;
            }
            cellButton.addEventListener("click", () => { handleCellClick(rowIndex, colIndex) })
            rowDiv.appendChild(cellButton);
        });
        boardContainer.appendChild(rowDiv);
    });
}

function renderUserMessage(message) {
    const userMessageElement = document.getElementById("message")
    userMessageElement.classList.remove("hidden")
    userMessageElement.textContent = message
    // alert(message)
}

function playMove(board, move, mark) {
    board[move[0]][move[1]] = mark
}

async function computerTurn(board, player, playerMove) {
    const response = await fetch(`http://localhost:3000/play?board=${JSON.stringify(board)}&player=${player}&move=${encodeURIComponent(JSON.stringify(playerMove))}`);
    return await response.json();
}

async function handleCellClick(row, col) {
    const { computerMove, isEnd, message, error } = await computerTurn(board, "X", [row, col]);

    console.log(isEnd);


    if (error) {
        renderUserMessage(error);
        return;
    }

    if (message) {
        renderUserMessage(message)
    }

    if (computerMove) {
        playMove(board, computerMove, "O")
    }

    playMove(board, [row, col], "X")

    renderBoard(board, boardElement, isEnd);
}

function resetGame() {
    window.location.reload();
}

resetButtonElement.addEventListener("click", resetGame);

// Slight coupling between board and cells by placing the event listener on the board.
// boardElement.addEventListener("click", async (event) => {
//     if (event.target.classList.contains("cell")) {
//         const row = event.target.dataset.row;
//         const col = event.target.dataset.col;

// Centralize the validation logic as much as we can.
// One idea is to extract this into a library/package to be shared across services.
// if (board[row][col] !== " ") {
//     renderUserMessage("Cell already occupied!");
//     return;
// }

// const { computerMove, message, error } = await computerTurn(board, "X", [row, col]);

// if (error) {
//     renderUserMessage(error);
//     return;
// }

// if (message) {
//     renderUserMessage(message)
// }

// if (computerMove) {
//     playMove(board, computerMove, "O")
// }

// playMove(board, [row, col], "X")

// renderBoard(board, boardElement);
//     }
// })

// Avoid global variable so that it is easier to refactor functions into different files later
renderBoard(board, boardElement);
