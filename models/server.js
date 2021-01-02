const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');
const Sockets  = require('./sockets');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);

        //Configuraciones socket
        this.io = socketio(this.server, {/* configuraciones */});
    }

    middlewares(){

        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());

    }

    configurarSockets(){

        new Sockets(this.io);

    }

    execute(){

        //Inicializar middlewares
        this.middlewares();

        //Inicializar socket
        this.configurarSockets();

        //Inicializar server
        this.server.listen(this.port, () => {
            console.log(`server corriendo en el puerto ${this.port}`);
        });

    }

}

module.exports = Server;