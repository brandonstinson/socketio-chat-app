import * as React from 'react';
import { FC, useState, useEffect, useRef, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { chatContext } from './App';
import { Chat } from './Chat';
import { MessageInput } from './MessageInput';

export type MessageType = {
  name: string;
  text: string;
  time: Date;
};

export type UserType = {
  id: string;
  name: string;
  room: string;
};

export const Room: FC = () => {
  const ctx = useContext(chatContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const msgEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:5000'));
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', { name: ctx.name, room: ctx.selectedRoom });
      socket.on('message', (message) => {
        setMessages((state) => [...state, message]);
      });
      socket.on('roomUsers', ({ room, users }) => {
        if (room === ctx.selectedRoom) {
          setUsers(users);
        }
      });
    }
  }, [socket, ctx.name, ctx.selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="room-container">
      <Chat messages={messages} users={users} msgEndRef={msgEndRef} />
      <MessageInput socket={socket} />
    </div>
  );
};
