import { useContext } from 'react';
import Message from './Message';
import { GameContext } from '../context/GameContext';

function Messages() {
  const { message, error } = useContext(GameContext);
  //   const message = '';
  //   const error = '';

  return (
    <div>
      {message && <Message>{message}</Message>}
      {error && <Message variant="error">{error}</Message>}
    </div>
  );
}
export default Messages;
