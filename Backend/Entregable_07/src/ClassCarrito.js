const fs = require('fs');
const { ContenedorProductos } = require("./ClassProductos.js");
class classCarts {
    constructor(route) {
        this.route = route;
    }
    async loadFiles() {
        try {
            const objs = JSON.parse(await fs.promises.readFile(this.route, "utf-8"), null, 2);
            return objs;
        } catch (error) {
            console.log(error);
        }
    }
    async saveFiles(dataArray) {
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(dataArray, null, 2));
            return "Ok";
        } catch (error) {
            throw new Error(`error al guardar: ${error}`);
        }
    }
    async getAll() {
        return await this.loadFiles();
    }
    async createCarts() {
        const carts = await this.loadFiles();
        const ids = carts.map(carts => {
            return carts.id;
        });
        const max = Math.max(...ids);
        const newId = max + 1;
        const fecha = new Date().toLocaleString();
        const newCarts = { "id": newId, "timestamp": fecha, "prductos": [] };
        carts.push(newCarts);
        await this.saveFiles(carts);
        return `Carrito ${newId} creado`;

    }
    async deleteCarts(idCarrito) {
        const carts = await this.loadFiles();
        const index = carts.findIndex(cart => cart.id === idCarrito);
        let result = null;
        if (index >= 0) {
            carts.splice(index, 1);
            result = "Carrito borrado";
            await this.saveFiles(carts);
        }
        return result;
    }
    async seeProduct(idCarrito) {
        const carts = await this.loadFiles();
        const index = carts.findIndex(cart => cart.id === idCarrito);
        if (index >= 0) {
            return carts[index].productos;
        }
        return null;
    }
    async addProduct(idProducto, idCarrito) {
        const carts = await this.loadFiles();
        const products = new ContenedorProductos('./src/productos.json');
        const arrayProducts = await products.getAll()
        const index = carts.findIndex(cart => cart.id === idCarrito);
        const newProducto = arrayProducts.find(product => product.id === idProducto);
        console.log(newProducto);
        if (index >= 0) {
            carts[index].productos.push(newProducto);
            await this.saveFiles(carts);
            return `Producto ${idProducto} agregado al carrito ${idCarrito}`;
        } else {
            return null;
        }

    }

    async deleteProduct(idProducto, idCarrito) {
        const carts = await this.loadFiles();
        const index = carts.findIndex(cart => cart.id === idCarrito);
        let result = null;
        if (index >= 0) {
            const productIndex = carts[index].productos.findIndex(product => product.id === idProducto);
            if (productIndex >= 0) {
                carts[index].productos.splice(productIndex, 1);
                await this.saveFiles(carts);
                result = `Producto ${idProducto} borrado`;
            }
        }
        return result;

    }
}


//Exports the class
module.exports.classCart = classCarts;
async function main() {
    const test = new classCarts('./carritos.json');
    var x = await test.loadFiles();
    await test.addProduct(1, 2);
    //await test.deleteCarts(3);
    //const a = await test.seeProduct(2);
    //wait test.deleteProduct(1, 2);
    //console.log(a)
    // console.log(x)
}
// no exports main
if (require.main === module) {
    main();
}



