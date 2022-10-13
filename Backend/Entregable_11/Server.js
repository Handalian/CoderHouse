/* ---------------------- Modulos ----------------------*/
import express from 'express';
import exphbs from 'express-handlebars';
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';
import { fakeProducts } from './routes/fakeProducts.routes.js';
import routerProducts from './routes/products.routes.js';
import { selectDao } from "./src/utils/config.js";
import { normalizedData, desnormalizedData } from "./src/utils/normalizr.scheme.js"

const daoProducts = await import(`./src/dao/products/ProductsDao${selectDao}.js`);
const productsDB = daoProducts.productsDB
const daoMessage = await import(`./src/dao/messages/MessagesDao${selectDao}.js`);
const messageDB = daoMessage.messageDB
let allMessages = await messageDB.loadMessage()
let allProducts = await productsDB.loadProducts();

/* ---------------------------------------------------------------*/
const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
app.use('/', routerProducts);
app.use('/api/product-test', fakeProducts);

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})

server.on('error', err => console.log(`error en server ${err}`));


/* ---------------------- WebSocket ----------------------*/
io.on('connection', async function (socket) {
    allMessages = await messageDB.loadMessage()
    socket.emit('from-server-message', { allMessages });
    // const normMessage = normalizedData(allMessages)
    // socket.emit('from-server-mensajes', { normMessage });
    // socket.on('from-client-mensaje', async function (normMessage) {
    //     const message = desnormalizedData(normMessage);

    socket.on('from-client-message', async function (message) {
        await messageDB.createMessage(message);
        allMessages = await messageDB.loadMessage();
        io.sockets.emit('from-server-message', { allMessages });
    });

    socket.on('from-client-product', async function (product) {
        const newObjs = JSON.parse(JSON.stringify(await productsDB.createProduct(product)));
        allProducts = await productsDB.loadProducts()
        io.sockets.emit('from-server-product', newObjs);

    })
})
