/* ---------------------- Modulos ----------------------*/
import express from 'express';
import exphbs from 'express-handlebars';
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';
import { fakeProducts } from './routes/fakeProducts.routes.js';
import routerProducts from './routes/products.routes.js';
/**/
import { selectDao } from "./src/utils/config.js"
const daoProducts = await import(`./src/dao/products/ProductsDao${selectDao}.js`);
const productsDB = daoProducts.productsDB
const daoMessage = await import(`./src/dao/messages/MessagesDao${selectDao}.js`);
const messageDB = daoMessage.messageDB
const allMessages = await messageDB.loadMessage()
console.log(allMessages)
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
app.use('/api/product', routerProducts);
app.use('/api/product-test', fakeProducts);

/* ---------------------- Servidor ----------------------*/
const PORT = 9090;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})

server.on('error', err => console.log(`error en server ${err}`));


/* ---------------------- WebSocket ----------------------*/

io.on('connection', async function (socket) {
    const allMessages = await messageDB.loadMessage()
    console.log(allMessages)
    socket.emit('from-server-mensajes', { allMessages });
    socket.on('from-client-mensaje', async function (message) {
        await messageDB.createMessage(message);
        const allMessages = await messageDB.loadMessage();
        // No funciona ver por que
        io.sockets.emit('from-server-mensajes', { allMessages });
    });
    socket.on('from-client-product', async function (product) {
        const newObjs = await productsDB.createProduct(product);
        // No funciona ver por que
        io.sockets.emit('from-server-product', { "id": newObjs, ...product });
    })
})
