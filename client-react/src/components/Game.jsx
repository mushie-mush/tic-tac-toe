import Board from './Board';
import ResetButton from './ResetButton';
import SaveButton from './SaveButton';
import UndoButton from './UndoButton';

function sendMesage() {
  navigator.serviceWorker.controller.postMessage({
    type: '123',
  });
}

function Game() {
  return (
    <div id="game">
      <Board />
      <div className="game-buttons">
        <ResetButton />
        <UndoButton />
        <SaveButton />
        <button onClick={sendMesage}>broadcast</button>
      </div>
    </div>
  );
}
export default Game;
