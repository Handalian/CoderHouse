const {Contenedor} = require("./ClassContenedor.js");
const express = require('express');
const routerProductos = express.Router();
const objs = new Contenedor('./src/productos.txt'); 
let DB_Productos = [];

statusCheck = (res,obj) =>{
    if (obj == null){
        res.status(404).json({Error: 'producto no encontrado'});
    }
    else{
        res.redirect('/');
    }   
};
routerProductos.get("/",async (req, res) => {
    DB_Productos = await objs.getAll();
    res.render('vista', {DB_Productos});
});

routerProductos.get("/:id",async (req, res) => {
    const id = parseInt(req.params.id);
    const obj = await objs.getById(id);
    statusCheck(res,obj);

});

routerProductos.post("/",async (req, res) => {
    newObj = await objs.addNewObj(req.body)
    res.redirect('/api/productos');
});

routerProductos.put("/:id",async (req, res) => {
    const id = parseInt(req.params.id);
    newObj = await objs.update(id,req.body)
    DB_Productos = await objs.getAll();
    statusCheck(res,newObj);
});

routerProductos.delete("/:id",async (req, res) => {
    const id = parseInt(req.params.id);
    obj = await objs.deleteById(id);
    DB_Productos = await objs.getAll();
    statusCheck(res,obj);
});

module.exports = routerProductos;

