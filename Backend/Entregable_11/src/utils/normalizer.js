import { schema, normalize } from 'normalizr';
const userSchema = new schema.Entity('user');
const nameSchema = new schema.Entity('name');
const ageSchema = new schema.Entity('age');
const surnameSchema = new schema.Entity('surname');
const aliasSchema = new schema.Entity('alias');
const avatarSchema = new schema.Entity('avatar');
const timeSchema = new schema.Entity('time');
const textSchema = new schema.Entity('text');

const mensajeSchema = new schema.Entity('mensaje', {
    user: userSchema,
    name: nameSchema,
    surname: ageSchema,
    age: surnameSchema,
    alias: aliasSchema,
    avatar: avatarSchema,
    time: timeSchema,
    text: textSchema
});

export function normalaizer(mensajeData) {
    return normalize(mensajeData, mensajeSchema)
}
export function denormalizer(normalizedMensaje) {
    return denormalize(normalizedMensaje.result, postSchema, normalizedMensaje.entities)
}
