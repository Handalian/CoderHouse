import express, { request } from "express";
import { selectDao } from "../src/utils/config.js"
const routerCarts = express.Router();
const daoCarts = await import(`../src/dao/carts/CartsDao${selectDao}.js`);
const cartsDB = daoCarts.cartsDB

routerCarts.get("/", async (req, res) => {
    res.json(await cartsDB.loadCarts());

});

routerCarts.post("/", async (req, res) => {
    const newObj = await cartsDB.createCart(req.body)
    res.status(201).json({ msg: 'Created!', id: newObj.id });
});

routerCarts.get("/:id/products", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await cartsDB.getCartById(id);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({ msg: "Cart with id " + id + " not found" })
    }
});
routerCarts.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await cartsDB.deleteCart(id);
    if (result) {
        res.status(201).json({ msg: `deleted ${id}` });
    } else {
        res.status(404).json({ msg: "Cart with id " + id + " not found" })
    }
});
routerCarts.post("/:id/products", async (req, res) => {
    const id = parseInt(req.params.id);
    const idProduct = req.body.id;
    const result = await cartsDB.addProduct(idProduct, id)
    if (result) {
        res.status(201).json({ msg: `Product ${idProduct} added to ${id} Cart ` });
    } else {
        res.status(404).json({ msg: `Product ${idProduct} or Cart ${id} not found ` })
    }
});

routerCarts.delete("/:id/products/:id_prod", async (req, res) => {
    const id = parseInt(req.params.id);
    const idProduct = parseInt(req.params.id_prod);
    const result = await cartsDB.deleteProduct(idProduct, id);
    if (result) {
        res.status(201).json({ msg: `Product ${idProduct} deleted from ${id} Cart ` });
    } else {
        res.status(404).json({ msg: `Product ${idProduct} or Cart ${id} not found ` })
    }
});


export default routerCarts;