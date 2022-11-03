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

import minimist from 'minimist';

import routerProducts from './routes/products.routes.js';
import routerRandoms from './routes/randoms.routes.js';
import routerUser from './routes/login.routes.js';
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
/*---------------------- passport --------------------*/
/* Descomentar para probar passport*/

// import passport from "passport";
// import { Strategy } from "passport-local";
// const LocalStrategy = Strategy;

// const daoUsers = await import(`./src/dao/users/UsersDao${selectDao}.js`);
// const usersDB = daoUsers.usersDB;
// passport.use(new LocalStrategy(
//     async function (userName, password, done) {
//         const checkUser = await usersDB.findUser(userName);
//         if (checkUser.userName == userName) {
//             return done(null, checkUser);
//         } else {
//             return done(null, false);
//         }
//     }
// ));

// passport.serializeUser((user, done) => {
//     done(null, user.userName);
// });

// // ------> Como lo vuelvo async?
// // passport.deserializeUser((userName, done) => {
// //     const checkUser = await usersDB.findUser(userName);
// //     done(null, checkUser);
// // });

// app.use(passport.initialize());
// app.use(passport.session());


/* Al usarlo salta este Error: Login sessions require session support. Did you forget to use `express-session` middleware? */

/* ----------------------*/
app.use(session({
    cookie: { maxAge: 50000 },
    rolling: true,
    store: MongoStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))

function auth(req, res, next) {
    if (req.session?.user) {
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
// app.post('/api/user/login', passport.authenticate('local', { successRedirect: '/api/products', failureRedirect: '/api/user/logInError' }));
app.use('/api/user', routerUser);
app.use('/api/products', auth, routerProducts);
app.use('/api/randoms', routerRandoms);
app.get('*', function (req, res) {
    res.redirect('/api/user/login');
});

const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};
const { PORT } = minimist(process.argv.slice(2), options);
/* ---------------------- Servidor ----------------------*/
// const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', err => console.log(`error en server ${err}`));


/* ---------------------- WebSocket ----------------------*/
io.on('connection', async function (socket) {
    allMessages = await messageDB.loadMessage()
    socket.emit('from-server-message', { allMessages });

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
