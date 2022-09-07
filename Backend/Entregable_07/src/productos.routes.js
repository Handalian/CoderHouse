const { ContenedorProductos } = require("./ClassProductos.js");
const express = require('express');
//import { config } from "../utils/config.js";
const config = require("../utils/config.js");
const routerProductos = express.Router();

const admin = config.isAdmin;
function onlyAdmin(req, res, next) {
    if (!admin) {
        res.status(403).json({ code: 403, msg: `Forbbiden acces ${req.method} ${req.baseUrl} ${req.url}` });
    } else {
        next();
    }
}

statusCheck = (res, result, method, route) => {
    if (result == null) {
        res.status(404).json({ Error: -2, descripcion: `ruta ${route} metodo ${method} no implementada` });
    }
    else {
        res.json(result);
    }
}
routerProductos.get("/", async (req, res) => {
    const objs = new ContenedorProductos('./src/productos.json');
    res.json(await objs.getAll());

});

routerProductos.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new ContenedorProductos('./src/productos.json');
    const obj = await objs.getById(id);
    statusCheck(res, result, "get", `api/productos/${id}`);

});

routerProductos.post("/", async (req, res) => {
    const objs = new ContenedorProductos('./src/productos.json');
    newObj = await objs.addNewObj(req.body)
    res.status(201).json({ msg: 'Agregado!', id: newObj.id });
});

routerProductos.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new ContenedorProductos('./src/productos.json');
    newObj = await objs.update(id, req.body)
    statusCheck(res, result, "put", `api/productos/${id}`);
});

routerProductos.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new ContenedorProductos('./src/productos.json');
    obj = await objs.deleteById(id);
    statusCheck(res, result, "delete", `api/productos/${id}`);
});

routerProductos.get('*', function (req, res) {
    res.status(404).json("Forbbiden error");
})
module.exports = routerProductos;

