import * as React from 'react';
import { FC, useState } from 'react';
import { Socket } from 'socket.io-client';
import sendIcon from '../icons/send.png';

type MessageInputProps = {
  socket: Socket | null;
};

export const MessageInput: FC<MessageInputProps> = ({ socket }) => {
  const [message, setMessage] = useState<string>('');

  return (
    <div className="message-input">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message && socket) {
            socket.emit('chatMessage', message);
          }
          setMessage('');
        }}>
        <input
          type="text"
          placeholder="Enter a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="div-with-icon">
          <img src={sendIcon} alt="send icon" width="20" />
          Send
        </button>
      </form>
    </div>
  );
};
