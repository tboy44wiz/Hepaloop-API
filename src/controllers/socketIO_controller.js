// socket.emit(@eventName, @args);     // To only the user joining
// socket.broadcast.emit(@eventName, @args);  // To all other users except the user joining.
// io.emit(@eventName, @args);   // To all users in general.


//  Create Socket.IO Connection.
class SocketIOController {
    static socketConnection = (io) => {
        io.on("connection", (socket) => {
            socket.emit("join", `Welcome ${socket.id} to the App.`);
            socket.broadcast.emit("join", `${socket.id} is connected...`);
            console.log(`${socket.id} is connected...`);

            socket.on("connectAndSend", (message) => {
                console.log(message);
                socket.emit("received_message", message);
                socket.broadcast.emit("received_message", message);
            });

            socket.on("send_message", (message) => {
                socket.broadcast.emit("received_message", message);
            });

            //   When User disconnected.
            socket.on("disconnect", () => {
                socket.broadcast.emit("leave", `${socket.id} just disconnected.`);
                console.log(`${socket.id} just disconnected.`);
            });
        })
    };
}

module.exports = SocketIOController;