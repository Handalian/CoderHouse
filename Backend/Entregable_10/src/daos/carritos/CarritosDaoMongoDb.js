import ContendeorMongDb from "../../contenedores/carritos/ontendorMongoDb.js";
class CarritosDaoMongoDb extends ContendeorMongoDb {
    constructor() {
        super('carritos', {
            products: { type: [], required: true }
        });
    }
    async guardar(carrito = { products: [] }) {
        return super.guardar(carrito);
    }

}
export default CarritosDaoMongoDb;