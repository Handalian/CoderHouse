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
    async getAll() {
        return await this.loadFiles();
    }
    async createProduct(idProducto, idCarrito) {
        const carts = await this.loadFiles();
        const products = new ContenedorProductos('./productos.json');
        const arrayProducts = await products.getAll()
        const newProducto = arrayProducts.find(product => product.id === idProducto)
        const test = []
        const index = carts.findIndex(cart => cart.id === idCarrito);
        carts[index].productos.push(newProducto);
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2));
            return newProducto;
        } catch (error) {
            throw new Error(`error al guardar: ${error}`);
        }

    }
}


//Exports the class
module.exports.classCart = classCarts;
async function main() {
    const test = new classCarts('./carritos.json');
    var x = await test.loadFiles();
    await test.createProduct(3, 2);
    // console.log(x)
}
// no exports main
if (require.main === module) {
    main();
}



