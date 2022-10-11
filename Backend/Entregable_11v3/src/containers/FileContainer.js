import fs from 'fs';
export class FileContainer {
    contructor(route) {
        this.route = route
    }
    async loadFiles() {
        try {
            const objs = JSON.parse(await fs.promises.readFile(this.route, "utf-8"), null, 2);
            return objs;
        } catch (error) {
            console.log(error);
        }
    }

    async _saveFiles(dataArray) {
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(dataArray, null, 2));
            return "Ok";
        } catch (error) {
            throw new Error(`error al guardar: ${error}`);
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
        allObjects.push(newObject);
        await this._saveFiles(allObjects);
        return newObject;
    }
    async deleteById(id) {
        const allObjects = await this.loadFiles();
        const indexObject = allObjects.findIndex((obj) => obj.id === id);
        if (indexObject === -1) return null;
        const deletedObject = allObjects.splice(indexObject, 1)[0];
        await this._saveFiles(allObjects);
        return deletedObject;
    }


    async updateObject(id, object) {
        const allObjects = await this.loadFiles();
        const objsFiltered = allObjects.filter(x => x.id !== id)
        const time = new Date().toLocaleString();
        const newObjs = {
            "id": id,
            "timestamp": time,
            ...object
        };
        objsFiltered.push(newObjs);
        this._saveFiles(objsFiltered);
        return objsFiltered;
    }


    // Return an object with an specific id
    async getById(id) {
        const allObjects = await this.loadFiles();
        const objsFiltered = allObjects.filter(e => e.id == id)[0];
        return objsFiltered;
    }
    async deleteAll() {
        await this._saveFiles([]);
        return true;
    }
}
