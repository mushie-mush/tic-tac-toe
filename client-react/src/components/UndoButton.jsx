import { useContext } from 'react';
import { GridContext } from '../context/GridContext';
import { loadGame } from '../services/loadGame';

function UndoButton() {
  const { updateGrid } = useContext(GridContext);

  const handleUndoButton = async () => {
    // const response = await saveGame(grid, 'X');
    // console.log(response);
    const gameSessions = JSON.parse(localStorage.getItem('savedGames') || '[]');

    gameSessions.pop();
    const lastGameId = gameSessions.pop();

    if (lastGameId) {
      const loadedGame = await loadGame(lastGameId);
      localStorage.setItem('savedGames', JSON.stringify(gameSessions));
      updateGrid(loadedGame);
    }
  };

  return (
    <button className="button" onClick={handleUndoButton}>
      Undo
    </button>
  );
}
export default UndoButton;
