import express, { request } from "express";
import { selectDao } from "../src/utils/config.js"
const routerProducts = express.Router();
const daoProducts = await import(`../src/dao/products/ProductsDao${selectDao}.js`);
const productsDB = daoProducts.productsDB


routerProducts.get('/', async (req, res) => {
    res.json(await productsDB.loadProducts());
});
routerProducts.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await productsDB.getProductById(id);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({ msg: "Product with id " + id + " not found" })
    }
});
routerProducts.post("/", async (req, res) => {
    const newObj = await productsDB.createProduct(req.body)
    res.status(201).json({ msg: 'Agregado!', id: newObj.id });
});
routerProducts.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await productsDB.deleteProduct(id);
    if (result) {
        res.status(201).json({ msg: `deleted ${id}` });
    } else {
        res.status(404).json({ msg: "Product with id " + id + " not found" })
    }
});
routerProducts.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await productsDB.updateProduct(id, req.body)
    res.status(201).json({ msg: `updated product ${id}` });
});



export default routerProducts;