function validateBoard(board, player) {
  const solutions = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (const condition of solutions) {
    const [a, b, c] = condition;
    if (
      board[a[0]][a[1]] === player &&
      board[a[0]][a[1]] == board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return 'win';
    }
  }

  if (!board.flat().some(position => position === ' ')) {
    return 'tie';
  }

  return false;
}

module.exports = validateBoard;
