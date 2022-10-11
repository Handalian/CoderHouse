import { faker } from '@faker-js/faker';

export function generarUsuario() {
    return {
        nombre: faker.name.fullName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        imagen: faker.image.avatar()
    }
}
