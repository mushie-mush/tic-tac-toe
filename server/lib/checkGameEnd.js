const validateBoard = require("./validateBoard");

function checkGameEnd(board, player) {
    const result = validateBoard(board, player);

    if (result === 'win') {
        return {
            isEnd: true,
            message: `${player} wins!`
        };
    }

    if (result === 'tie') {
        return {
            isEnd: true,
            message: 'Game is a tie!'
        };
    }

    return {
        isEnd: false
    };
}

module.exports = checkGameEnd;