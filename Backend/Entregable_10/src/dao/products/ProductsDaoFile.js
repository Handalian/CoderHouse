import { FileContainer } from "../../containers/FileContainer.js";
const productsDBRoute = "src/db/products.json"
class ProductsDaoFile extends FileContainer {
    constructor() {
        super();
        this.route = productsDBRoute;
    }
    async loadProducts() {
        return await this.loadFiles();
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

    async getProductById(id) {
        return await this.getById(id);
    }

    async deleteAllProducts() {
        return await this.deleteAll();
    }
}
export const productsDB = new ProductsDaoFile();