import { useContext } from 'react';
import { GridContext } from '../context/GridContext';
import { getComputerMove } from '../App';
import { GameContext } from '../context/GameContext';

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

    setError(responseError || null);

    if (responseError) return false;

    setMessage(responseMessage || null);

    updateGrid(row, col, HUMAN_PLAYER_MARK);

    if (computerMove)
      updateGrid(computerMove[0], computerMove[1], COMPUTER_PLAYER_MARK);

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
