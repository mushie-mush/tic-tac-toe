import Board from './Board';
import ResetButton from './ResetButton';
import SaveButton from './SaveButton';
import UndoButton from './UndoButton';

function Game() {
  return (
    <div id="game">
      <Board />
      <div className="game-buttons">
        <ResetButton />
        <UndoButton />
        <SaveButton />
      </div>
    </div>
  );
}
export default Game;
