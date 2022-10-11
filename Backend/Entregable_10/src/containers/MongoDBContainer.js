import mongoose from "mongoose";
import { mongoDBConfig } from '../utils/config.js'

const strConn = `mongodb://${mongoDBConfig.db.host}:${mongoDBConfig.db.port}/${mongoDBConfig.db.dbName}`;
await mongoose.connect(strConn, mongoDBConfig.db.options);
export class MongoDBContainer {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);

    }
    async loadFiles() {
        try {
            const objs = await this.collection.find({}, { __v: 0 }).lean()
            return objs;
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        try {
            const objs = await this.collection.findOne({ id: id }).exec()
            return objs;
        } catch (error) {
            console.log(error);
        }
    }
    async createObject(object) {
        const allObjects = await this.loadFiles();
        const ids = allObjects.map(obj => {
            return obj.id;
        });
        const max = Math.max(...ids);
        const newId = max + 1;
        const fecha = new Date().toLocaleString();
        const newObject = {
            "id": newId,
            "timestamp": fecha,
            ...object
        };
        const newData = new this.collection(newObject);
        newData.save()
        return newObject;
    }
    async deleteById(id) {
        try {
            await this.collection.deleteOne({ id: id });
            return true;
        } catch (error) {
            return null;
        }
    }

    async updateObject(id, object) {
        try {
            await this.collection.findOneAndUpdate({ id: id }, object);
            return true;
        } catch (error) {
            return null;
        }
    }

}
// await mongoose.disconnect();