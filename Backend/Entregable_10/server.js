import express from 'express';
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import routerProducts from './routes/products.routes.js';
import routerCarts from './routes/carts.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/* ---------------------- Instacias de sevidor ----------------------*/
const app = express();
/* ---------------------- Middlewares ---------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
/* ---------------------- Rutas ----------------------*/
app.use('/api/product', routerProducts);
app.use('/api/cart', routerCarts);
app.get('*', function (req, res) {
    res.status(404).json("Forbbiden error");
});

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})
server.on('error', error => {
    console.error(`Server error ${error}`);
});
