import { FirebaseContainer } from "../../containers/FirebaseContainer.js";

class ProductsFirebase extends FirebaseContainer {
    constructor() {
        super('products');
    }
    async loadProducts() {
        return await this.loadFiles();
    }
    async getProductById(id) {
        return await this.getById(id);
    }
    async createProduct(product) {
        return await this.createObject(product);
    }
    async deleteProduct(id) {
        return await this.deleteById(id);
    }
    async updateProduct(id, product) {
        return await this.updateObject(id, product);
    }

}

export const productsDB = new ProductsFirebase();