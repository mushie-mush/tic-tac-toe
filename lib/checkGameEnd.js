const validateBoard = require("./validateBoard");

function checkGameEnd(board, player) {
    const result = validateBoard(board, player);

    if (result === 'win') {
        console.log(`${player} wins!`);
        return true;
    }

    if (result === 'tie') {
        console.log('Game is a tie!');
        return true;
    }

    return false;
}

module.exports = checkGameEnd;