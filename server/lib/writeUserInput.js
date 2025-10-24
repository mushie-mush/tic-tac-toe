function writeUserInput(board, player, row, col) {
    // const newBoard = [...board.map(row => [...row])];
    const newBoard = structuredClone(board);
    newBoard[row][col] = player;
    return newBoard
}

module.exports = writeUserInput