import { classCarts } from "../src/daos/carritos/ClassCarritoArchivo.js";
//import { classCarts } from "../src/daos/selectDaos.js";
import express from 'express';
export const routerCarrito = express.Router();
const carritoRoute = './src/db/carritos.json'
function statusCheck(res, result, method, route) {
    if (result == null) {
        res.status(404).json({ Error: -2, descripcion: `ruta ${route} metodo ${method} no implementada` });
    }
    else {
        res.json(result);
    }
}
routerCarrito.get("/", async (req, res) => {
    const carts = new classCarts(carritoRoute);
    res.json(await carts.getAll());
});
routerCarrito.post("/", async (req, res) => {
    const carts = new classCarts(carritoRoute);
    res.json(await carts.createCarts());
});

routerCarrito.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const carts = new classCarts(carritoRoute);
    const result = await carts.deleteCarts(id);
    statusCheck(res, result, "delete", `api/carrito/${id}`);
});

routerCarrito.get("/:id/productos", async (req, res) => {
    const id = parseInt(req.params.id);
    const carts = new classCarts(carritoRoute);
    const result = await carts.seeProduct(id);
    statusCheck(res, result, "get", `api/carrito/${id}/productos`);
});
// Problemas con esta funcion, el metodo en la clase funciona pero no por post
routerCarrito.post("/:id/productos", async (req, res) => {
    const id = parseInt(req.params.id);
    const idProducto = req.body.id;
    const carts = new classCarts(carritoRoute);
    await carts.addProduct(idProducto, id)
    res.status(201).json({ msg: 'Agregado!', id: idProducto });

});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    const id = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod);
    const carts = new classCarts(carritoRoute);
    const result = await carts.deleteProduct(idProducto, id);
    statusCheck(res, result, "delete", `api/carrito/${id}/productos/:${id_prod}`);
});

routerCarrito.get('*', function (req, res) {
    res.status(404).json("Forbbiden error");
})



