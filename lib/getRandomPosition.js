function getRandomPosition(board, random = Math.random) {
    let availableMoves = []

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === ' ') {
                availableMoves.push([row, col])
            }
        }
    }

    const randomIndex = Math.round(random() * (availableMoves.length - 1))

    return availableMoves[randomIndex]
}

module.exports = getRandomPosition