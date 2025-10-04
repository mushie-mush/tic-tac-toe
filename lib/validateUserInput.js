function validateUserInput(board, row, col, ui = console) {
    if (row < 0 || row > 2) {
        ui.log('row should be between 0 and 2');
        return false;
    }

    if (col < 0 || col > 2) {
        ui.log('col should be between 0 and 2');
        return false;
    }

    if (board[row][col].trim()) {
        ui.log('Position is already filled');
        return false;
    }

    return true;
}

module.exports = validateUserInput