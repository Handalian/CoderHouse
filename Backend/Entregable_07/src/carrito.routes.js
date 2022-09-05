const { classCart } = require("./ClassCarrito.js");
const express = require('express');
const routerCarrito = express.Router();
statusCheck = (res, obj) => {
    if (obj == null) {
        res.status(404).json({ Error: 'producto no encontrado' });
    }
    else {
        res.json(obj);
    }
}

routerCarrito.get("/", async (req, res) => {
    const carts = new classCart('./src/carritos.json');
    res.json(await carts.getAll());
});

module.exports = routerCarrito;

