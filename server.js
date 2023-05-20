
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let visitorCount = 0;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Visitor Count</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
          }
          h1 {
            color: #4CAF50;
          }
        </style>
        <script src="/socket.io/socket.io.js"></script>
        <script>
          const socket = io();

          socket.on('visitor count', (count) => {
            document.getElementById('count').textContent = count;
          });
        </script>
      </head>
      <body>
        <h1>Visitor Count: <span id="count">0</span></h1>
      </body>
    </html>
  `);
});

io.on('connection', (socket) => {
  visitorCount++;
  console.log(`New client connected. Visitor count: ${visitorCount}`);
  console.log(`Student details: Name - Rupam Tiwary, Roll no: 07, Registration no: - 12002950`);

  if (visitorCount % 2 === 1) {
    io.emit('visitor count', visitorCount);
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3004, () => {
  console.log('Server listening on port 3004');
});