const { ContenedorProductos } = require("./ClassProductos.js");
const express = require('express');
const routerProductos = express.Router();
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

module.exports = routerProductos;

