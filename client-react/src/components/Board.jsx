function Board({ grid, gameOver, onCellClick }) {
  return (
    <div id="board">
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              player={cell}
              onClick={onCellClick}
              disabled={gameOver}
            />
          ))}
        </Row>
      ))}
    </div>
  );
}

function Row({ children }) {
  return <div className="row">{children}</div>;
}

function Cell({ row, col, player, onClick, disabled }) {
  return (
    <button
      className="cell"
      data-row={row}
      data-col={col}
      onClick={() => onClick && onClick(row, col)}
      disabled={disabled}
    >
      {player}
    </button>
  );
}

export default Board;
