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

const readline = require('node:readline/promises');
const validateBoard = require('./validateBoard');
const getRandomPosition = require('./getRandomPosition')

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
let computer = 'X'
let currentPlayer = 'O'

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



async function start() {

  console.log(' ')
  printBoard(board);

  if (currentPlayer === 'O') {
    const answer = await rl.question('Enter your move (row and column): ')

    const [row, col] = answer.split(' ').map(Number);
    console.log(`You entered row: ${row}, column: ${col}`);

    if (validateUserInput(board, row, col)) {
      writeUserInput(board, currentPlayer, row, col);

      if (validateBoard(board, currentPlayer) === 'win') {
        console.log(`${currentPlayer} is win`);
        return;
      }

      if (validateBoard(board, currentPlayer) === 'tie') {
        console.log('Game is tie');
        return;
      }
    } else {
      const [computerRow, computerCol] = getRandomPosition(board)
      writeUserInput(board, computer, computerRow, computerCol)

      printBoard(board);
      console.log('computer turn: ', computerRow, computerCol)

      if (validateBoard(board, computer) === 'win') {
        console.log(`${computer} is win`);
        return;
      }

      if (validateBoard(board, computer) === 'tie') {
        console.log('Game is tie');
        return;
      }
    }
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';

  };
  start();
}

start();