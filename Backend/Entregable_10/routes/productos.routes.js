import { classProductos } from "../src/daos/productos/ClassProductosArchivo.js";
//import { classProductos } from "../src/daos/selectDaos.js";
import express from 'express';
import { config } from "../utils/config.js";
export const routerProductos = express.Router();
const productosRoute = './src/db/productos.json'
const admin = config.isAdmin;

function onlyAdmin(req, res, next) {
    if (!admin) {
        res.status(403).json({ code: 403, msg: `Forbbiden acces ${req.method} ${req.baseUrl} ${req.url}` });
    } else {
        next();
    }
}

function statusCheck(res, result, method, route) {
    if (result == null) {
        res.status(404).json({ Error: -2, descripcion: `ruta ${route} metodo ${method} no implementada` });
    }
    else {
        res.json(result);
    }
}
routerProductos.get("/", async (req, res) => {
    const objs = new classProductos(productosRoute);
    res.json(await objs.getAll());
    //res.json(types(classProductos));

});

routerProductos.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new classProductos(productosRoute);
    const result = await objs.getById(id);
    statusCheck(res, result, "get", `api/productos/${id}`);

});

routerProductos.post("/", async (req, res) => {
    const objs = new classProductos(productosRoute);
    newObj = await objs.addNewObj(req.body)
    res.status(201).json({ msg: 'Agregado!', id: newObj.id });
});

routerProductos.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new classProductos(productosRoute);
    result = await objs.update(id, req.body)
    statusCheck(res, result, "put", `api/productos/${id}`);
});

routerProductos.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new classProductos(productosRoute);
    result = await objs.deleteById(id);
    statusCheck(res, result, "delete", `api/productos/${id}`);
});

routerProductos.get('*', function (req, res) {
    res.status(404).json("Forbbiden error");
})


