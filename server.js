const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join a specific bus tracking room
    socket.on("joinBus", (busNumber) => {
      socket.join(`bus-${busNumber}`);
      console.log(`Socket ${socket.id} joined bus-${busNumber}`);
    });

    // Receive GPS from driver and broadcast to students in the same bus room
    socket.on("updateLocation", (data) => {
      // data: { busNumber, lat, lng, timestamp }
      io.to(`bus-${data.busNumber}`).emit("locationUpdate", data);
      socket.broadcast.emit("adminLocationUpdate", data); // For master dashboard
    });

    // Receive status updates (Delay, Puncture, etc) and broadcast
    socket.on("updateStatus", (data) => {
      // data: { busNumber, type, title, content }
      io.to(`bus-${data.busNumber}`).emit("statusUpdate", data);
    });

    socket.on("globalAnnouncement", (data) => {
      console.log("Global Announcement:", data);
      socket.broadcast.emit("globalAnnouncement", data);
    });

    socket.on("updateCurrentStop", (data) => {
      io.to(`bus-${data.busNumber}`).emit("currentStopUpdate", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});

