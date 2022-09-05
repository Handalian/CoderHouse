const fs = require('fs');

class ContenedorProductos {
    constructor(route) {
        this.route = route;
    }
    // Load the data from ruta file
    async loadFiles() {
        try {
            const objs = JSON.parse(await fs.promises.readFile(this.route, "utf-8"), null, 2);
            return objs;
        } catch (error) {
            console.log(error);
        }
    }

    // find the object with the high ID
    // Try to optimize the next two functions
    maxId(objs) {
        let aux = objs[0].id;
        for (let i = 1; i < objs.length; i++) {
            if (objs[i].id > aux) {
                aux = objs[i].id;
            }
        }
        return aux;
    }
    // Find an Id that is doesn't used
    emptyId(objs) {
        let aux;
        const max = this.maxId(objs) + 2;
        for (let number = 1; number < max; number++) {
            aux = 0;
            for (let i = 0; i < objs.length; i++) {
                if (objs[i].id == number) {
                    aux = 1;
                }
            }
            if (aux == 0) {
                return number;
            }
        }
    }
    // Save new object with a free id in the database
    async addNewObj(obj) {
        const objs = await this.loadFiles();
        let newId;
        if (objs.length == 0) {
            newId = 1;
        } else {
            newId = this.emptyId(objs);
        }
        let fecha = new Date().toLocaleString();

        const newObjs = { "id": newId, "timestamp": fecha, ...obj };
        objs.push(newObjs);
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(objs, null, 2));
            return newObjs;
        } catch (error) {
            throw new Error(`error al guardar: ${error}`);
        }

    }

    // Return an object with an specific id
    async getById(number) {
        const objs = await this.loadFiles();
        for (let i = 0; i < objs.length; i++) {
            if (objs[i].id == number) {
                return objs[i];
            }
        }
        return null;
    }
    // return all the objects
    async getAll() {
        return await this.loadFiles();
    }
    // delete an object by its id and save it in the database
    async deleteById(number) {
        let saveVar = false;
        const objs = await this.loadFiles();
        for (let i = 0; i < objs.length; i++) {
            if (objs[i].id == number) {
                objs.splice(i, 1);
                saveVar = true;
                break;
            }
        }
        if (saveVar) {
            try {
                await fs.promises.writeFile(this.route, JSON.stringify(objs, null, 2));
                return `Id borrado: ${number}`;
            } catch (error) {
                throw new Error(`error al guardar: ${error}`);
                return null;
            }
        }
        else {
            return null;
        }
    }
    async update(id, obj) {
        const objs = await this.loadFiles();
        const objsFiltered = objs.filter(e => e.id !== id)
        const newObjs = { "id": id, ...obj };
        objsFiltered.push(newObjs);
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(objsFiltered, null, 2));
            return newObjs;
        } catch (error) {
            throw new Error(`error al guardar: ${error}`);
            return null;
        }
    }
    // delete all dataset
    async deleteAll() {
        const objs = [];
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(objs, null, 2));
        } catch (error) {
            throw new Error(`error al guardar: ${error}`);
        }
    }

}
//Exports the class
module.exports.ContenedorProductos = ContenedorProductos;
// Test de class
async function main() {
    const test = new ContenedorProductos('./productos.json');
    var x = await test.loadFiles();
    console.log(x)
}
// no exports main
if (require.main === module) {
    main();
}

