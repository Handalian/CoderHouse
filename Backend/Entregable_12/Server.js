/* ---------------------- Modulos ----------------------*/
import express from 'express';
import exphbs from 'express-handlebars';
import session from "express-session";

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import path from 'path';
import { fileURLToPath } from 'url';

import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config();

import routerProducts from './routes/products.routes.js';
import routerLogin from './routes/login.routes.js';
import { selectDao } from "./src/utils/config.js";
const daoProducts = await import(`./src/dao/products/ProductsDao${selectDao}.js`);
const productsDB = daoProducts.productsDB
let allProducts = await productsDB.loadProducts();
const daoMessage = await import(`./src/dao/messages/MessagesDao${selectDao}.js`);
const messageDB = daoMessage.messageDB
let allMessages = await messageDB.loadMessage()

//session persistencia mongo
const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60
})

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

app.use(session({
    store: MongoStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))

function auth(req, res, next) {
    if (req.session?.user && req.session?.admin) {
        return next()
    }
    return res.redirect('/api/user/login');
}

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

app.use('/api/user', routerLogin);
app.use('/api/products', auth, routerProducts);


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
    socket.on('from-client-userLogin', async function (inputUserLogin) {
        console.log(`user web socket ${inputUserLogin}`)
    })
})
