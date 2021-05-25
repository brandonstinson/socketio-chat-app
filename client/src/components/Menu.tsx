import * as React from 'react';
import { FC, useState, useContext } from 'react';
import { chatContext, SelectedRoomType } from './App';

type MenuProps = {
  rooms: readonly SelectedRoomType[];
};

export const Menu: FC<MenuProps> = ({ rooms }) => {
  const ctx = useContext(chatContext);
  const [room, setRoom] = useState<SelectedRoomType>(rooms[0]);

  return (
    <div className="menu-container">
      <div className="menu">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={ctx.name}
          onChange={(e) => ctx.setNameFn(e.target.value)}
        />
        <label htmlFor="room">Room</label>
        <select
          name="room"
          id="room"
          value={rooms[0] as string}
          onChange={(e) => setRoom(e.target.value as SelectedRoomType)}>
          {rooms.map((room, index) => (
            <option key={index} value={room as string}>
              {room}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (!!ctx.name) ctx.setRoomFn(room);
          }}>
          Enter Room
        </button>
      </div>
    </div>
  );
};
