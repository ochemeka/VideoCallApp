const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  // Send the client their own ID
  socket.emit("me", socket.id);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
    socket.broadcast.emit("callEnded");
  });

  // Handle call initiation
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log(`📞 Calling ${userToCall} from ${from}`);
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  // Handle call answer
  socket.on("answerCall", ({ to, signal }) => {
    console.log(`✅ Answering call to ${to}`);
    io.to(to).emit("callAccepted", signal);
  });
});

server.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));



// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());

// const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');


// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);
//   socket.emit("me", socket.id); // ✅ this sends the ID to the client
// });


//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//     console.log(`Calling ${userToCall} from ${from}`);
//     io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//   });

//   socket.on("answerCall", ({ to, signal }) => {
//     console.log(`Answering call to ${to}`);
//     io.to(to).emit("callAccepted", signal);
//   });
// });

// server.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));

// const app = require("express")();
// const server = require("http").createServer(app)
// const cors = require("cors");

// const io = require("socket.io")(server, {
//     cors: {
//         origin: "*",
//         method:["GET", "POST" ]
//     }
// });
// app.use(cors());

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//     res.send("Server is running");
// });

// io.on('connection', (socket) => {
//     socket.emit('me', socket.id);
//     socket.on('disconect', () =>{
//         socket.broadcast.emit("callended;")
//     });
//     socket.on("calluser", ({ userToCall, signalData, from, name}) => {
//         io.on(userToCall).emit("calluser", { signal : signalData, from, name})
//     });
//     socket.on("answer", (data) => {
//         io.to(data.to).emit("callaccepted", data.signal);
//     });
// });

// server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))