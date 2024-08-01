"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockerHandler = void 0;
const config_1 = require("@/_boot/config");
const socket_io_1 = require("socket.io");
const messageSeen_1 = require("../database/mongo/repositories/usesr/messageSeen");
const updateLastMessage_1 = require("../database/mongo/repositories/usesr/updateLastMessage");
const pinMessage_1 = require("../database/mongo/repositories/usesr/pinMessage");
const updateDeleteUnread_1 = require("../database/mongo/repositories/usesr/updateDeleteUnread");
let onlineUsers = new Map();
let io;
let rooms = {};
const addToOnline = (userId, socketId) => {
    onlineUsers.set(userId, socketId);
};
const removeFromOnline = (socketId) => {
    for (const [userId, userSocketId] of onlineUsers.entries()) {
        if (userSocketId === socketId) {
            onlineUsers.delete(userId);
            break;
        }
    }
};
const sockerHandler = (server) => {
    if (!io) {
        io = new socket_io_1.Server(server, {
            cors: {
                origin: config_1.config.secrets.front_end_url,
            },
        });
    }
    io.on("connection", (socket) => {
        socket.on("Newuser_joined", ({ userId }) => {
            addToOnline(userId, socket.id);
            io.emit("onlineUsers", Array.from(onlineUsers.keys()));
        });
        socket.on("send_msg", async ({ message, roomId, senderId, typeMessage, description, partcipants, replyTo, replyMessage, forWard }) => {
            if (rooms[roomId]?.length > 1) {
                console.log("___________room also send aslo send &");
                io.to(roomId).emit("recieve_msg", {
                    message,
                    senderId,
                    roomId,
                    read: true,
                    typeMessage,
                    description,
                    replyTo,
                    replyMessage,
                    forWard
                });
                // console.log("______________________ yes i done that");
                io.to(roomId).emit("messsge_seen", { data: "msg seen" });
                await (0, messageSeen_1.messageSeen)(roomId);
            }
            else {
                for (let member of partcipants ?? []) {
                    console.log("___________onoine users aslo send &");
                    if (onlineUsers.has(member)) {
                        console.log("___________onoine he is", onlineUsers.get(member));
                        let socketId = onlineUsers.get(member);
                        io.to(socketId).emit("recieve_msg", {
                            message,
                            senderId,
                            roomId,
                            read: false,
                            typeMessage,
                            description,
                            forWard
                        });
                    }
                }
            }
            await (0, updateLastMessage_1.updateLastMessage)({
                roomId,
                message,
            });
            // console.log("______________________");
            // console.log(rooms);
        });
        socket.on("callStudent", (data) => {
            let studentIdToCall = onlineUsers.get(data.studentToCall);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log(onlineUsers);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log(studentIdToCall);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            io.to(studentIdToCall).emit("offer", {
                signal: data.signalData,
                fromCall: data.from
            });
        });
        socket.on("endCall", (data) => {
            console.log("End call request received", data);
            let recipientSocketId = onlineUsers.get(data.to);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("endCall", { from: socket.id });
            }
        });
        socket.on("answerCall", (data) => {
            console.log("reched here awsome to see that");
            console.log("data To :" + data.to);
            let studentIdToCall = onlineUsers.get(data.to);
            io.to(studentIdToCall).emit("callAccepted", data.signal);
        });
        socket.on("pin_message", async (data) => {
            console.log("_________________earched here", data);
            await (0, pinMessage_1.pinMessage)(data.messageId);
            io.to(data.roomId).emit("pinned_message", data);
        });
        socket.on("join-room", async ({ roomId, id }) => {
            if (!rooms[roomId]) {
                rooms[roomId] = [];
            }
            if (!rooms[roomId]?.includes(id)) {
                rooms[roomId].push(id);
                // console.log("______________________");
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
                // console.log("______________________");
                console.log("Updated rooms:", rooms);
                io.emit("rooms", rooms);
                if (rooms[roomId]?.length > 1) {
                    io.to(roomId).emit("messsge_seen", { roomId });
                    await (0, messageSeen_1.messageSeen)(roomId);
                }
                await (0, updateDeleteUnread_1.updateUnReadMessage)(roomId);
            }
            socket.join(roomId);
            // console.log(`User ${id} joined room ${roomId}`);
        });
        socket.on("typing", ({ roomId, typerId }) => {
            io.to(roomId).emit("typing_recieve", {
                typerId,
                roomId,
            });
        });
        socket.on("disconnect", () => {
            removeFromOnline(socket.id);
            io.emit("onlineUsers", Array.from(onlineUsers.keys()));
        });
    });
};
exports.sockerHandler = sockerHandler;
