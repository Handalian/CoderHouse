import admin from "firebase-admin";
import { firebaseConfig } from '../utils/config.js'
admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
});
const db = admin.firestore();

export class FirebaseContainer {
    constructor(collection) {
        this.collection = db.collection(collection);

    }
    async loadFiles() {
        const result = []
        const snapshot = await this.collection.get();
        snapshot.forEach(doc => {
            result.push({ id: doc.id, ...doc.data() })
        })
        return result
    }
    async getById(id) {
        try {
            const filter = this.collection.doc(`${id}`);
            const item = await filter.get();
            const reponse = item.data()
            return { id: id, ...reponse };
        } catch (error) {
            return null
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
            "timestamp": fecha,
            ...object
        };
        await this.collection.doc(`${newId}`).set(newObject);
        return { id: newId, ...newObject };
    }

    async deleteById(id) {
        try {
            await this.collection.doc(`${id}`).delete();
            return true;
        } catch (error) {
            return null;
        }
    }

    async updateObject(id, object) {
        try {
            await this.collection.doc(`${id}`).update(object);
            return true;
        } catch (error) {
            return null;
        }
    }
}