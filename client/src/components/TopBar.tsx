import * as React from 'react';
import { FC, useContext } from 'react';
import { chatContext } from './App';
import chatIcon from '../icons/chat.png';

export const TopBar: FC = () => {
  const ctx = useContext(chatContext);
  return (
    <div className={`top-bar ${ctx.selectedRoom ? '' : 'center'}`}>
      <div className="title div-with-icon">
        <img src={chatIcon} alt="chat icon" width="30" />
        Chat App
      </div>
      <div>
        {ctx.selectedRoom === null ? null : (
          <button onClick={() => ctx.setRoomFn(null)}>Leave Room</button>
        )}
      </div>
    </div>
  );
};
