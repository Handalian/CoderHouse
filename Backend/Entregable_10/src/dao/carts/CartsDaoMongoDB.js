import { MongoDBContainer } from "../../containers/MongoDBContainer.js";
import { productsDB } from "../products/ProductsDaoMongoDB.js";
class CartsDaoMongoDB extends MongoDBContainer {
  constructor() {
    super("carts", {
      id: { type: Number, required: true },
      timestamp: { type: String, required: true },
      products: { type: [], required: true }
    });
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
    return this.updateObject(id, { "products": newProduct });
  }
  async deleteProduct(idProduct, id) {
    try {
      await this.collection.updateOne({ id: id }, { $pull: { products: { id: idProduct } } })
      return true
    } catch (error) {
      return false;
    }
  }
}

export const cartsDB = new CartsDaoMongoDB();
/*
db.carts.insertMany(
[
  {
    "id": 2,
    "timestamp": "8/31/2022,1:30:33 PM",
    "products": [
      {
        "id": 3,
        "timestamp": "8/31/2022,1:30:33 PM",
        "title": "Television",
        "descripcion": "Pantalla",
        "codigo": "tel_01",
        "price": 300,
        "stock": 20,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/essentials-pack/96/television_tv_screen_display_technology-256.png"
      },
      {
        "id": 1,
        "timestamp": "8/31/2022,1:30:33 PM",
        "title": "Keyboard",
        "descripcion": "Teclado",
        "codigo": "tec_01",
        "price": 200,
        "stock": 10,
        "thumbnail": "https://cdn0.iconfinder.com/data/icons/zondicons/20/keyboard-256.png"
      }
    ]
  },
  {
    "id": 3,
    "timestamp": "9/7/2022, 6:56:46 PM",
    "products": []
  },
  {
    "id": 1,
    "timestamp": "10/9/2022, 10:24:42 PM",
    "products": [
      {
        "id": 3,
        "timestamp": "8/31/2022,1:30:33 PM",
        "title": "Television",
        "descripcion": "Pantalla",
        "codigo": "tel_01",
        "price": 300,
        "stock": 20,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/essentials-pack/96/television_tv_screen_display_technology-256.png"
      }
    ]
  }
])


*/