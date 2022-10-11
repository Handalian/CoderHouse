import { FileContainer } from "../../containers/FileContainer.js";
import { productsDB } from "../products/ProductsDaoFile.js";
const cartsDBRoute = "src/db/carts.json"
class CartsDaoFile extends FileContainer {
    constructor() {
        super();
        this.route = cartsDBRoute;
    }
    async loadCarts() {
        return await this.loadFiles();
    }
    async getCartById(id) {
        return await this.getById(id);
    }
    async createCart() {
        return await this.createObject({ products: [] });
    }
    async deleteCart(id) {
        return await this.deleteById(id);
    }
    async addProduct(idProduct, id) {
        const newProduct = await productsDB.getProductById(idProduct);
        const cart = await this.getCartById(id);
        cart.products.push(newProduct);
        return this.updateObject(id, { "products": cart.products });
    }
    async deleteProduct(idProduct, id) {
        const cart = await this.getCartById(id);
        const productsFiltered = cart.products.filter(x => x.id !== idProduct);
        return this.updateObject(id, { "products": productsFiltered });
    }

}
export const cartsDB = new CartsDaoFile();