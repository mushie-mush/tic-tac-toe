// 1. Player should not be able to place the same position twice
// 2. Player should not be able to place outside the board
// 3. Game should end when a player wins or there is a tie
// 4. Display a message when the game ends

// Study Notes:
// Incremental changes
// Single responsibility principle
// - Each function should do one thing and do it well
// Shorten feedback loop

// As a human player, I want to play with a computer player, so that it is more fun.
// Examples:
// When I place a 'O' at (0, 0)
// Then computer player will place a 'X' at (0, 1)

const readline = require("node:readline/promises");
const getRandomPosition = require("./lib/getRandomPosition");
const printBoard = require("./lib/printBoard");
const writeUserInput = require("./lib/writeUserInput");
const validateUserInput = require("./lib/validateUserInput");
const checkGameEnd = require("./lib/checkGameEnd");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];

let computer = "X";
let currentPlayer = "O";

console.log("==============================");
console.log("   Welcome to Tic Tac Toe!");
console.log("==============================");
console.log("You are O, Computer is X");
console.log("Enter your move as: row col");
console.log("");

class Ui {
    constructor(output = console, input = rl) {
        this.output = output;
        this.input = input;
    }

    log(message) {
        this.output.log(message);
    }

    async ask(question) {
        return await this.input.question(question);
    }
}

// class FakeUI {
//   constructor(io = console, rl = rl) {
//     this.messages = p[]
//   }

//   log(message) {
//     this.messages.push(message)
//   }

//   async ask(question) {
//     return new Promise()
//   }
// }

// class WebUI {
//     constructor(io = console, rl = rl) {
//     this.messages = p[]
//   }

//   log(message) {
//     this.messages.push(message)
//   }

//   async ask(question) {
//     return new Promise()
//   }
// }

const ui = new Ui();

async function start() {
    printBoard(board);
    console.log("");

    if (currentPlayer === "O") {
        const answer = await ui.ask("Enter your move (row and column): ");

        const [row, col] = answer.split(" ").map(Number);
        console.log(`You entered row: ${row}, column: ${col}`);

        const errorMessages = validateUserInput(board, row, col);

        if (errorMessages.length === 0) {
            board = writeUserInput(board, currentPlayer, row, col);

            const { isEnd, message } = checkGameEnd(board, currentPlayer);

            if (isEnd) {
                ui.log(message);
                return;
            }
        } else {
            errorMessages.forEach((msg) => ui.log(msg));
        }
    } else {
        const [computerRow, computerCol] = getRandomPosition(board);
        board = writeUserInput(board, computer, computerRow, computerCol);

        console.log("Computer placed at: ", computerRow, computerCol);

        const { isEnd, message } = checkGameEnd(board, computer);

        if (isEnd) {
            ui.log(message);
            return;
        }
    }

    currentPlayer = currentPlayer === "O" ? "X" : "O";
    start();
}

start();
