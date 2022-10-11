import { MongoDBContainer } from "../../containers/MongoDBContainer.js";
class ProductsDaoMongoDB extends MongoDBContainer {
  constructor() {
    super("products", {
      id: { type: Number, required: true },
      timestamp: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      code: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      thumbnail: { type: String, required: true }
    });
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
export const productsDB = new ProductsDaoMongoDB();

/*
db.products.insertMany(
[
  {
    "id": 1,
    "timestamp": "8/31/2022,1:30:33 PM",
    "title": "Keyboard",
    "description": "Teclado",
    "codigo": "tec_01",
    "price": 200,
    "stock": 10,
    "thumbnail": "https://cdn0.iconfinder.com/data/icons/zondicons/20/keyboard-256.png"
  },
  {
    "id": 2,
    "timestamp": "8/31/2022,1:30:33 PM",
    "title": "Television",
    "description": "Pantalla",
    "codigo": "tel_01",
    "price": 300,
    "stock": 5,
    "thumbnail": "https://cdn1.iconfinder.com/data/icons/essentials-pack/96/television_tv_screen_display_technology-256.png"
  },
  {
    "id": 3,
    "timestamp": "10/8/2022, 7:54:32 PM",
    "title": "Television",
    "description": "Pantalla",
    "codigo": "tel_01",
    "price": 300,
    "stock": 200,
    "thumbnail": "https://cdn1.iconfinder.com/data/icons/essentials-pack/96/television_tv_screen_display_technology-256.png"
  }
])


*/