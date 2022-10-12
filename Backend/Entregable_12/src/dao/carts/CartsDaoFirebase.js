import { FirebaseContainer } from "../../containers/FirebaseContainer.js";
import { productsDB } from "../products/ProductsDaoFirebase.js";
class CartsFirebase extends FirebaseContainer {
    constructor() {
        super('carts');
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
        const arrayProducts = await this.getById(id);
        return this.updateObject(id, { "products": [arrayProducts.products, newProduct] });
    }
    async deleteProduct(idProduct, id) {
        const arrayProducts = await this.getById(id);
        const objsFiltered = arrayProducts.products.filter(x => x.id !== id)
        return this.updateObject(id, { "products": objsFiltered })
    }
}

export const cartsDB = new CartsFirebase();