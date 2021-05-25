import * as React from 'react';
import { FC, createContext, useState } from 'react';
import { TopBar } from './TopBar';
import { Menu } from './Menu';
import { Room } from './Room';

const rooms = [
  'Climbing',
  'Cooking',
  'Gaming',
  'Hiking',
  'Programming',
  'Skydiving',
] as const;

export type SelectedRoomType = typeof rooms[number] | null;

type ContextProps = {
  selectedRoom: SelectedRoomType;
  setRoomFn: (room: SelectedRoomType) => void;
  name: string;
  setNameFn: (name: string) => void;
};

export const chatContext = createContext<ContextProps>({
  selectedRoom: null,
  setRoomFn: () => {},
  name: '',
  setNameFn: () => {},
});

export const App: FC = () => {
  const [name, setName] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomType>(null);

  return (
    <chatContext.Provider
      value={{
        selectedRoom,
        name,
        setRoomFn: setSelectedRoom,
        setNameFn: setName,
      }}>
      <div className="container">
        <TopBar />
        {selectedRoom ? <Room /> : <Menu rooms={rooms} />}
      </div>
    </chatContext.Provider>
  );
};
