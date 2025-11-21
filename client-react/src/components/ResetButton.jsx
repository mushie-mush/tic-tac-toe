import { useContext } from 'react';
import { GridContext } from '../context/GridContext';
import { GameContext } from '../context/GameContext';

const ResetButton = () => {
  const { setGrid } = useContext(GridContext);
  const { setMessage, setError, setGameOver } = useContext(GameContext);

  const handleReset = () => {
    setGrid(Array(3).fill(Array(3).fill(' ')));
    setGameOver(false);
    setMessage(null);
    setError(null);
  };

  return (
    <button className="button" onClick={handleReset}>
      Reset
    </button>
  );
};

export default ResetButton;
