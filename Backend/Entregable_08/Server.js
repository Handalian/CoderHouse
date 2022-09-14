/*
    No anda el renderisado de los productos ni de los mensajes
    No Funciona socket.emit('from-server-mensajes', { mensajes });

*/


/* ---------------------- Modulos ----------------------*/
import express from 'express';
import exphbs from 'express-handlebars';
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';
import { ContenedorSQL } from "./src/container/ContenedorSQL.js";
import { config as configMD } from './src/utils/config.js';
import { config as configSQLite } from './src/utils/configSQLite.js';
/*--------------------------Database------------------------*/
const apiProductos = new ContenedorSQL('Productos', configMD.db);
const apiMensajes = new ContenedorSQL('Mensajes', configSQLite.db);
/* ---------------------------------------------------------------*/
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(path.join(__dirname, 'views'));

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

/* ---------------------- Rutas ----------------------*/
// No renderisa correctamente 
app.get('/', async function (req, res) {
    const DB_Productos = JSON.parse(JSON.stringify(await apiProductos.listarAll()));
    //console.log(productos)
    res.render('vista', { DB_Productos });
});
/* ---------------------- Servidor ----------------------*/
const PORT = 9090;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', err => console.log(`error en server ${err}`));

/* ---------------------- WebSocket ----------------------*/
io.on('connection', async function (socket) {
    const DB_MENSAJES = JSON.parse(JSON.stringify(await apiMensajes.listarAll()));
    // console.log(mensajes);
    // console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('from-server-mensajes', { DB_MENSAJES });
    socket.on('from-client-mensaje', async function (mensaje) {
        console.log(1);
        let fecha = new Date().toLocaleString();
        const mensajeData = { "time": fecha, ...mensaje };
        const newMensaje = await apiMensajes.insertar(mensajeData);
        const DB_MENSAJES = JSON.parse(JSON.stringify(await apiMensajes.listarAll()));
        io.sockets.emit('from-server-mensajes', { DB_MENSAJES });
    });

    socket.on('from-client-product', async function (product) {
        const newObjs = await apiProductos.insertar(product);
        console.log(newObjs);
        io.sockets.emit('from-server-product', { "id": newObjs, ...product });
    })
})