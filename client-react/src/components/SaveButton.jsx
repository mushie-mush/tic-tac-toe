import { useContext } from 'react';
import { GridContext } from '../context/GridContext';
import { saveGame } from '../services/saveGame';

function SaveButton() {
  const { grid } = useContext(GridContext);

  const handleSave = async () => {
    const response = await saveGame(grid, 'X');
  };

  return (
    <button className="button" onClick={handleSave}>
      Save
    </button>
  );
}
export default SaveButton;
