import { Router } from "express";
import { productoMock } from "../src/mocks/producto.mock.js";
export const fakeProducts = Router();

fakeProducts.get('/', async function (req, res) {
    const productMocker = new productoMock(5);
    const DB_Productos = productMocker.generateRandomProducts();
    console.log(DB_Productos)
    res.render('vistaOnlyFakeProducts', { DB_Productos });
});
