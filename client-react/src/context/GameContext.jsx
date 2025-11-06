import { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  return (
    <GameContext.Provider
      value={{ gameOver, setGameOver, message, setMessage, error, setError }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
