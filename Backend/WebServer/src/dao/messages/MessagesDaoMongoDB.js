import { MongoDBContainer } from "../../containers/MongoDBContainer.js";
class MessageDaoMongoDB extends MongoDBContainer {
  constructor() {
    super("messages", {
      text: { type: String, required: true },
      timestamp: { type: String, required: true },
      author: { type: {}, required: true },
    });
  }
  async loadMessage() {
    return await this.loadFiles();
  }
  async createMessage(message) {
    return await this.createObject(message);
  }

}
export const messageDB = new MessageDaoMongoDB();

/*
db.messages.insertMany([{
  "author": {
    "user": "user1@gmail.com",
    "name": "User",
    "surname": "One",
    "age": 12,
    "alias": "Uone",
    "avatar": "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png"
  },
  "timestamp": "8/31/2022,1:30:33 PM",
  "text": "Hello Users"
}, {
  "author": {
    "user": "user2@gmail.com",
    "name": "User",
    "surname": "Two",
    "age": 12,
    "alias": "Utwo",
    "avatar": "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png"
  },
  "timestamp": "8/31/2022,1:35:33 PM",
  "text": "Hello User One"
}])


*/