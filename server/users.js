const users = [];

const getCurrentUser = (id) => users.find((user) => user.id === id);

const getAllUsersInRoom = (room) => users.filter((user) => user.room === room);

const joinRoom = (id, name, room) => {
  const user = { id, name, room };
  users.push(user);
  return user;
};

const leaveRoom = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = { getCurrentUser, getAllUsersInRoom, joinRoom, leaveRoom };
