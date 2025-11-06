// import { useState } from 'react';
import './App.css';
// import Board from './components/Board';
// import Message from './components/Message';
// import ResetButton from './components/ResetButton';
import { GridProvider } from './context/GridContext';
import { GameProvider } from './context/GameContext';
import Messages from './components/Messages';
import Game from './components/Game';
// import Game from './components/Game';

// const GridProvider = ({ children }) => {
//   const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(' ')));

//   const updateGrid = (row, col, mark) => {
//     setGrid(prevGrid => {
//       const newGrid = prevGrid.map(r => [...r]);
//       // const newGrid = structuredClone(prevGrid);
//       newGrid[row][col] = mark;
//       return newGrid;
//     });
//   }

//   return (
//     <GridContext.Provider value={{ grid, updateGrid, setGrid }}>{children}</GridContext.Provider>
//   )
// }

export const getComputerMove = async (board, player, playerMove) => {
  const response = await fetch(`http://localhost:3000/play?board=${JSON.stringify(board)}&player=${player}&move=${encodeURIComponent(JSON.stringify(playerMove))}`);
  return await response.json();
}

function App() {
  // const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(' ')));
  // const [gameOver, setGameOver] = useState(false);
  // const [message, setMessage] = useState(null);
  // const [error, setError] = useState(null);

  // const handleCellClick = async (row, col) => {
  // const { computerMove, isEnd, message: responseMessage, error: responseError } = await getComputerMove(grid, player, [row, col]);

  // setError(responseError || null);

  // if (responseError) return false;

  // setMessage(responseMessage || null);

  // setGameOver(isEnd);

  // return true

  // const { computerMove, isEnd, message: responseMessage, error: responseError } = await getComputerMove(grid, player, [row, col]);
  // updateGrid(row, col, player);
  // if (computerMove) updateGrid(computerMove[0], computerMove[1], 'O');
  // };

  return (
    <GameProvider>
      <GridProvider>
        <Messages />
        <Game />
      </GridProvider>
    </GameProvider>

  );
}

export default App;
