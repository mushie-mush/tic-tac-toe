function printBoard(board) {
    console.log(` ${board[0][0]} | ${board[0][1]} | ${board[0][2]} `);
    console.log('---+---+---');
    console.log(` ${board[1][0]} | ${board[1][1]} | ${board[1][2]} `);
    console.log('---+---+---');
    console.log(` ${board[2][0]} | ${board[2][1]} | ${board[2][2]} `);
}

module.exports = printBoard