import { MongoDBContainer } from "../../containers/MongoDBContainer.js";
class UsersDaoMongoDB extends MongoDBContainer {
  constructor() {
    super("users", {
      id: { type: String, required: false },
      timestamp: { type: String, required: false },
      userName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    });
  }
  async loadUsers() {
    return await this.loadFiles();
  }
  async creatUsers(product) {
    return await this.createObject(product);
  }
  async findUser(userName) {
    const temp = await this.collection.find({ userName: userName }).exec();
    let value = [];
    if (temp === []) {
      return 0;
    } else {
      try {
        value = {
          userName: temp[0].userName,
          email: temp[0].email,
          password: temp[0].password
        }
      } catch { }

      return value
    }


  }

}


export const usersDB = new UsersDaoMongoDB();

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