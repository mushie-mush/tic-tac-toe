import { useContext } from 'react';
import { GridContext } from '../context/GridContext';
import { GameContext } from '../context/GameContext';
import { getComputerMove } from '../services/getComputerMove';

const HUMAN_PLAYER_MARK = 'X';
const COMPUTER_PLAYER_MARK = 'O';

function Cell({ row, col }) {
  const { grid, updateGrid } = useContext(GridContext);
  const { setMessage, setError, setGameOver, gameOver } =
    useContext(GameContext);

  const handleCellClick = async () => {
    const {
      computerMove,
      isEnd,
      message: responseMessage,
      error: responseError,
    } = await getComputerMove(grid, HUMAN_PLAYER_MARK, [row, col]);
    const newGrid = grid.map((row) => [...row]);

    setError(responseError || null);

    if (responseError) return false;

    setMessage(responseMessage || null);

    newGrid[row][col] = HUMAN_PLAYER_MARK;

    // updateGrid(row, col, HUMAN_PLAYER_MARK);

    if (computerMove)
      newGrid[computerMove[0]][computerMove[1]] = COMPUTER_PLAYER_MARK;
    // updateGrid(computerMove[0], computerMove[1], COMPUTER_PLAYER_MARK);

    updateGrid(newGrid);
    setGameOver(isEnd);
  };

  return (
    <button
      className="cell"
      data-row={row}
      data-col={col}
      onClick={handleCellClick}
      disabled={gameOver}
    >
      {grid[row][col]}
    </button>
  );
}

export default Cell;
