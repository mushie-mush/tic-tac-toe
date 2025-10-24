function validateUserInput(board, row, col) {
    if (row < 0 || row > 2) {
        return ['row should be between 0 and 2']
    }

    if (col < 0 || col > 2) {
        return ['col should be between 0 and 2']
    }

    if (board[row][col].trim()) {
        return ['Position is already filled']
    }

    return [];
}

module.exports = validateUserInput