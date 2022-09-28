/* ---------------------- Modulos ----------------------*/
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ---------------------- Instacias de sevidor ----------------------*/
const app = express();
/* ---------------------- Rutas ----------------------*/
const selector = 'archivos';

//import { selectDaos } from './src/daos/selectDaos.js';
//console.log(`${selectDaos(selector).routeCarritos}`)
//const routes = await selectDaos(selector);

import { routerProductos } from './routes/productos.routes.js';
import { routerCarrito } from './routes/carrito.routes.js';


/* ---------------------- Middlewares ---------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
/* ---------------------- Rutas ----------------------*/
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.get('*', function (req, res) {
    res.status(404).json("Forbbiden error");
})

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});
