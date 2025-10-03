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
const validateBoard = require('./lib/validateBoard');
const getRandomPosition = require('./lib/getRandomPosition');
const printBoard = require('./lib/printBoard');
const writeUserInput = require('./lib/writeUserInput');
const validateUserInput = require('./lib/validateUserInput');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

let computer = 'X'
let currentPlayer = 'O'

console.log('==============================');
console.log('   Welcome to Tic Tac Toe!');
console.log('==============================');
console.log('You are O, Computer is X');
console.log('Enter your move as: row col');
console.log('Example: 0 2');
console.log('');

async function start() {
  printBoard(board);
  console.log('');

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
    }

  } else {
    const [computerRow, computerCol] = getRandomPosition(board)
    writeUserInput(board, computer, computerRow, computerCol)

    console.log('Computer placed at: ', computerRow, computerCol)

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
  start();
}

start()