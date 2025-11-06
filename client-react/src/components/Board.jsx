import { useContext } from 'react';
import Cell from './Cell';
import Row from './Row';
import { GridContext } from '../context/GridContext';

function Board() {
  const { grid } = useContext(GridContext);

  return (
    <div id="board">
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} row={rowIndex} col={colIndex} />
          ))}
        </Row>
      ))}
    </div>
  );
}

export default Board;
