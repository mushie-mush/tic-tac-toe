import Board from './Board';
import ResetButton from './ResetButton';
import UndoButton from './UndoButton';

function Game() {
  return (
    <div id="game">
      <Board />
      <ResetButton />
      <UndoButton />
    </div>
  );
}
export default Game;
