import { Router } from "express";
import { productoMock } from "../mocks/producto.mock.js";
export const fakeProducts = Router();

fakeProducts.get('/', async function (req, res) {
    const productMocker = new productoMock(5);
    const DB_Productos = productMocker.generateRandomProducts();
    console.log(DB_Productos)
    /*const DB_Productos = [
        {
            "id": 3,
            "title": "Teclado",
            "price": 200,
            "thumbnail": "http://www.google.com/"
        },
        {
            "id": 2,
            "title": "Monitor",
            "price": 300,
            "thumbnail": "http://www.google.com/"
        }];*/
    res.render('vistaOnlyFakeProducts', { DB_Productos });
});
