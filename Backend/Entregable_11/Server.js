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
import { fakeProducts } from './src/routes/fakeProducts.routes.js';
import { normalaizer } from './src/utils/normalizer.js';
import util from 'util';
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
app.get('/', async function (req, res) {
    const DB_Productos = JSON.parse(JSON.stringify(await apiProductos.listarAll()));
    res.render('vista', { DB_Productos });
});
app.use('/api/productos-test', fakeProducts);

/* ---------------------- Servidor ----------------------*/
const PORT = 9090;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', err => console.log(`error en server ${err}`));

/* ---------------------- WebSocket ----------------------*/
io.on('connection', async function (socket) {
    const DB_MENSAJES = JSON.parse(JSON.stringify(await apiMensajes.listarAll()));
    const normalizedMSJ = normalaizer(DB_MENSAJES);
    /*   console.log(util.inspect(normalizedMSJ, false, 12, true),
           JSON.stringify(normalizedMSJ).length)*/
    socket.emit('from-server-mensajes', { normalizedMSJ });
    socket.on('from-client-mensaje', async function (mensaje) {
        let fecha = new Date().toLocaleString();
        const mensajeData = { "time": fecha, ...mensaje };
        const newMensaje = await apiMensajes.insertar(mensajeData);
        const DB_MENSAJES = JSON.parse(JSON.stringify(await apiMensajes.listarAll()));
        io.sockets.emit('from-server-mensajes', { DB_MENSAJES });
    });

    socket.on('from-client-product', async function (product) {
        const newObjs = await apiProductos.insertar(product);
        io.sockets.emit('from-server-product', { "id": newObjs, ...product });
    })
})
