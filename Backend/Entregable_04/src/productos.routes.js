const {Contenedor} = require("./ClassContenedor.js");
const express = require('express');
const routerProductos = express.Router();
statusCheck = (res,obj) =>{
    if (obj == null){
        res.status(404).json({Error: 'producto no encontrado'});
    }
    else{
        res.json(obj);
    }   
}
routerProductos.get("/",async (req, res) => {
    const objs = new Contenedor('./src/productos.txt');
    res.json(await objs.getAll());

});

routerProductos.get("/:id",async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new Contenedor('./src/productos.txt');
    const obj = await objs.getById(id);
    statusCheck(res,obj);

});

routerProductos.post("/",async (req, res) => {
    const objs = new Contenedor('./src/productos.txt');
    newObj = await objs.addNewObj(req.body)
    res.status(201).json({msg: 'Agregado!', id: newObj.id});    
});

routerProductos.put("/:id",async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new Contenedor('./src/productos.txt');
    newObj = await objs.update(id,req.body)
    statusCheck(res,obj);
});

routerProductos.delete("/:id",async (req, res) => {
    const id = parseInt(req.params.id);
    const objs = new Contenedor('./src/productos.txt');
    obj = await objs.deleteById(id);
    statusCheck(res,obj);
});

module.exports = routerProductos;

