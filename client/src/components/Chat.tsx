import * as React from 'react';
import { FC, useContext, MutableRefObject } from 'react';
import formatRelative from 'date-fns/formatRelative';
import { chatContext } from './App';
import { MessageType, UserType } from './Room';
import roomIcon from '../icons/rooms.png';
import peopleIcon from '../icons/people.png';

type ChatProps = {
  messages: MessageType[];
  users: UserType[];
  msgEndRef: MutableRefObject<HTMLDivElement | null>;
};

export const Chat: FC<ChatProps> = ({ messages, users, msgEndRef }) => {
  const ctx = useContext(chatContext);

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="div-with-icon">
          <img src={roomIcon} alt="room icon" width="20" />
          Room
        </div>
        <div className="left-indent">{ctx.selectedRoom}</div>
        <div className="div-with-icon">
          <img src={peopleIcon} alt="people icon" width="20" />
          People
        </div>
        <div className="people left-indent">
          {users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      </div>
      <div className="chat">
        {messages.map(({ name, text, time }, index) => (
          <div className="message" key={index}>
            <div className="details">
              <div className="name">{name}</div>
              <div className="time">{formatRelative(time, Date.now())}</div>
            </div>
            <div className="text">{text}</div>
          </div>
        ))}
        <div ref={msgEndRef} />
      </div>
    </div>
  );
};
