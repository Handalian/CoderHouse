const {Contenedor} = require("./ClassContenedor.js");
const { application } = require('express');
const express = require('express');
const app = express();

app.get("/",(req, res) => {
    res.send("Please enter to /productos or /productoRandom");
});

app.get("/productos",async (req, res) => {
    const objs = new Contenedor('./productos.txt');
    res.json(await objs.getAll());
});

app.get("/productoRandom",async (req, res) => {
    const objs = new Contenedor('./productos.txt');
    len = await objs.getAll();
    random_number = Math.floor(Math.random() * len.length) +1;
    res.json(await objs.getById(random_number));
});

const server = app.listen(8080,()=>{
    console.log('Server running at http://localhost:8080');
})

