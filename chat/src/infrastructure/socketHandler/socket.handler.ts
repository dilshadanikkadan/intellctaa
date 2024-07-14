import { config } from "@/_boot/config";
import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { messageSeen } from "../database/mongo/repositories/usesr/messageSeen";

let onlineUsers = new Map<string, string>();
let io: SocketIOServer;
let rooms = {};
const addToOnline = (userId: string, socketId: string) => {
  onlineUsers.set(userId, socketId);
};

const removeFromOnline = (socketId: string) => {
  for (const [userId, userSocketId] of onlineUsers.entries()) {
    if (userSocketId === socketId) {
      onlineUsers.delete(userId);
      break;
    }
  }
};

export const sockerHandler = (server: Server) => {
  if (!io) {
    io = new SocketIOServer(server, {
      cors: {
        origin: config.secrets.front_end_url,
      },
    });
  }

  io.on("connection", (socket: Socket) => {
    socket.on("Newuser_joined", ({ userId }) => {
      addToOnline(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on(
      "send_msg",
      async ({ message, roomId, senderId, typeMessage,description }) => {
        if (rooms[roomId]?.length > 1) {
          io.to(roomId).emit("recieve_msg", {
            message,
            senderId,
            read: true,
            typeMessage,
            description
          });
          console.log("______________________ yes i done that");

          io.to(roomId).emit("messsge_seen", { data: "msg seen" });
          await messageSeen(roomId);
        }
        console.log("______________________");
        console.log(rooms);
      }
    );

    socket.on("join-room", async ({ roomId, id }) => {
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }
      if (!rooms[roomId]?.includes(id)) {
        rooms[roomId].push(id);
        console.log("______________________");
        for (let key in rooms) {
          if (key !== roomId) {
            const index = rooms[key].indexOf(id);
            if (index !== -1) {
              rooms[key].splice(index, 1);
            }
            if (rooms[key].length === 0) {
              delete rooms[key];
            }
          }
        }
        console.log("______________________");

        console.log("Updated rooms:", rooms);
        io.emit("rooms", rooms);
        if (rooms[roomId]?.length > 1) {
          io.to(roomId).emit("messsge_seen", { data: "msg seen" });
          await messageSeen(roomId);
        }
      }
      socket.join(roomId);
      console.log(`User ${id} joined room ${roomId}`);
    });

    socket.on("disconnect", () => {
      removeFromOnline(socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
};
