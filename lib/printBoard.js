function formatBoard(board) {
    return ` ${board[0][0]} | ${board[0][1]} | ${board[0][2]} \n` +
        '---+---+---\n' +
        ` ${board[1][0]} | ${board[1][1]} | ${board[1][2]} \n` +
        '---+---+---\n' +
        ` ${board[2][0]} | ${board[2][1]} | ${board[2][2]} \n`
}

function printBoard(board, ui = console) {
    ui.log(formatBoard(board))

    // return ` ${board[0][0]} | ${board[0][1]} | ${board[0][2]} \n---+---+---\n ${board[1][0]} | ${board[1][1]} | ${board[1][2]} ---+---+--- ${board[2][0]} | ${board[2][1]} | ${board[2][2]} `
}

module.exports = printBoard