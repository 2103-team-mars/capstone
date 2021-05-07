const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const io = require('socket.io');
const app = require('./app');

const init = async () => {
  try {
    await db.sync();
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    );
    const webSocket = io(server);
    webSocket.on('connection', (socket) => {
      socket.on('join', (room) => {
        socket.join(room);
      });
      socket.on('send message', (message, room) => {
        socket.to(room).emit('receive', message);
      });
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
