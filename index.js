
// Importar los paquetes necesarios
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

// Crear una aplicación de Express
const app = express();

// Crear un servidor HTTP a partir de la aplicación de Express
const server = http.createServer(app);

// Crear un servidor de Socket.io a partir del servidor HTTP
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

// Escuchar conexiones de clientes
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar mensajes del cliente
  socket.on('chat message', (msg) => {
    // Imprimir el mensaje en la consola del servidor
    console.log('Mensaje recibido:', msg);

    // Enviar el mensaje a todos los clientes conectados
    io.emit('chat message', msg);
  });
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

