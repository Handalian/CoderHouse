import { faker } from '@faker-js/faker';

export class productoMock {

    constructor(amount) {
        this.amount = amount;
    }

    generateRandomProducts() {
        const randomProducts = [];

        for (let i = 0; i < this.amount; i++) {
            const randomProduct = {
                id: faker.datatype.uuid(),
                title: faker.commerce.product(),
                price: faker.commerce.price(50, 5000, 0, '$'),
                thumbnail: faker.image.imageUrl(400, 600, 'animals', true),
            }
            randomProducts.push(randomProduct);
        }

        return randomProducts;
    }
}