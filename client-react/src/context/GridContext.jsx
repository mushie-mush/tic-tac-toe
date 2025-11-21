import { createContext, useEffect, useState } from 'react';

const GridContext = createContext();

const GridProvider = ({ children }) => {
  const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(' ')));

  const updateGrid = (newGrid) => {
    setGrid(newGrid);
    // setGrid(newGrid.map((r) => [...r]));
    // setGrid((prevGrid) => {
    //   const newGrid = prevGrid.map((r) => [...r]);
    //   // const newGrid = structuredClone(prevGrid);
    //   newGrid[row][col] = mark;
    //   return newGrid;
    // });
  };

  return (
    <GridContext.Provider value={{ grid, updateGrid, setGrid }}>
      {children}
    </GridContext.Provider>
  );
};

export { GridContext, GridProvider };
