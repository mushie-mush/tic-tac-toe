// 1. Player should not be able to place the same position twice
// 2. Player should not be able to place outside the board
// 3. Game should end when a player wins or there is a tie
// 4. Display a message when the game ends

// Study Notes:
// Incremental changes
// Single responsibility principle
// - Each function should do one thing and do it well
// Shorten feedback loop

const readline = require('readline');
const validateBoard = require('./validateBoard');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let player = 'O';

function writeUserInput(board, player, row, col) {
  board[row][col] = player;
}

function validateUserInput(board, row, col) {
  if (row < 0 || row > 2) {
    console.log('row should be between 0 and 2');
    return false;
  }

  if (col < 0 || col > 2) {
    console.log('col should be between 0 and 2');
    return false;
  }

  if (board[row][col]) {
    console.log('Position is already filled');
    return false;
  }

  return true;
}

function printBoard(board) {
  console.log(` ${board[0][0]} | ${board[0][1]} | ${board[0][2]} `);
  console.log('--------');
  console.log(` ${board[1][0]} | ${board[1][1]} | ${board[1][2]} `);
  console.log('--------');
  console.log(` ${board[2][0]} | ${board[2][1]} | ${board[2][2]} `);
}

console.log('Welcome to our Tic Tac Toe game!');

function start() {
  printBoard(board);

  rl.question('Enter your move (row and column): ', (answer) => {
    const [row, col] = answer.split(' ').map(Number);
    console.log(`You entered row: ${row}, column: ${col}`);

    if (validateUserInput(board, row, col)) {
      writeUserInput(board, player, row, col);

      if (validateBoard(board, player) === 'win') {
        console.log(`${player} is win`);
        return;
      }

      if (validateBoard(board, player) === 'tie') {
        console.log('Game is tie');
        return;
      }

      player = player === 'O' ? 'X' : 'O';
    }

    start();
  });
}

start();