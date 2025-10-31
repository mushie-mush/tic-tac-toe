import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Message from './components/Message';

const player = 'X';

function App() {
  const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(' ')));
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const updateGrid = (row, col, mark) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => [...r]);
      newGrid[row][col] = mark;
      return newGrid;
    });
  }

  const getComputerMove = async (board, player, playerMove) => {
    const response = await fetch(`http://localhost:3000/play?board=${JSON.stringify(board)}&player=${player}&move=${encodeURIComponent(JSON.stringify(playerMove))}`);
    return await response.json();
  }

  const handleCellClick = async (row, col) => {
    const { computerMove, isEnd, message: responseMessage, error: responseError } = await getComputerMove(grid, player, [row, col]);

    setError(responseError || null);

    if (responseError) return;

    setMessage(responseMessage || null);

    updateGrid(row, col, player);

    if (computerMove) updateGrid(computerMove[0], computerMove[1], 'O');

    setGameOver(isEnd);
  };

  const handleReset = () => {
    setGrid(Array(3).fill(Array(3).fill(' ')));
    setGameOver(false);
    setMessage(null);
    setError(null);
  };

  return (
    <main>
      {message && <Message>{message}</Message>}
      {error && <Message variant="error">{error}</Message>}
      <div id="game">
        <Board grid={grid} gameOver={gameOver} onCellClick={handleCellClick} />
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>
    </main>
  );
}

export default App;
