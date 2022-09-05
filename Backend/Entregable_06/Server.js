/* ---------------------- Modulos ----------------------*/
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const fs = require('fs');
/* ---------------------- Instancia Server ----------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
/* ---------------------- Middlewares ----------------------*/
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*---------------------- Motor de plantillas ----------------------*/
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


/*---------------------- Base de datos ----------------------*/
const DB_Productos = [
    {
        "id": 3,
        "title": "Keyboard",
        "price": 200,
        "thumbnail": "https://cdn0.iconfinder.com/data/icons/zondicons/20/keyboard-256.png"
    },
    {
        "id": 1,
        "title": "Television",
        "price": 300,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/essentials-pack/96/television_tv_screen_display_technology-256.png"
    }
]
const DB_MENSAJES = [
    { time: "8/31/2022,1:30:33 PM", author: "Juan", text: "¡Hola! ¿Que tal?" }
]

/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
    res.render('vista', { DB_Productos });
});
/* ---------------------- Servidor ----------------------*/
const PORT = 9090;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', err => console.log(`error en server ${err}`));

/* ---------------------- WebSocket ----------------------*/
io.on('connection', (socket) => {

    console.log(`Nuevo cliente conectado! ${socket.id}`);

    socket.emit('from-server-mensajes', { DB_MENSAJES });
    socket.on('from-client-mensaje', mensaje => {
        let fecha = new Date().toLocaleString();
        const newObjs = { "time": fecha, ...mensaje };
        DB_MENSAJES.push(newObjs);
        io.sockets.emit('from-server-mensajes', { DB_MENSAJES });
    });

    socket.on('from-client-product', product => {
        console.log('aca')
        const ids = DB_Productos.map(DB_Productos => {
            return DB_Productos.id;
        });
        const max = Math.max(...ids);
        const newId = max + 1;
        const newObjs = { "id": newId, ...product };
        DB_Productos.push(newObjs);
        io.sockets.emit('from-server-product', { newObjs });
    })
})