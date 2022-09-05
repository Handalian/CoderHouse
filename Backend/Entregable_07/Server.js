/* ---------------------- Modulos ----------------------*/
const express = require('express');
const morgan = require('morgan');
/*
Funcion post class carito no anda
Implementar middleware para chequeear admin
Crear respond si la ruta esta mal

*/
/* ---------------------- Instacias de sevidor ----------------------*/
const app = express();
/* ---------------------- Rutas ----------------------*/
const routerProductos = require('./src/productos.routes');
const routerCarrito = require('./src/carrito.routes');
/* ---------------------- Middlewares ---------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
/* ---------------------- Rutas ----------------------*/
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});
