import { schema, normalize, denormalize } from "normalizr";

const userSchema = new schema.Entity('user');
const nameSchema = new schema.Entity('name');
const ageSchema = new schema.Entity('age');
const surnameSchema = new schema.Entity('surname');
const aliasSchema = new schema.Entity('alias');
const avatarSchema = new schema.Entity('avatar');

const timeSchema = new schema.Entity('time');
const textSchema = new schema.Entity('text');

const authorSchema = new schema.Entity("author", {
    user: userSchema,
    name: nameSchema,
    surname: surnameSchema,
    age: ageSchema,
    alias: aliasSchema,
    avatar: avatarSchema,
})

const messageSchema = new schema.Entity("message", {
    author: authorSchema,
    timestamp: timeSchema,
    time: textSchema,
})

export function normalizedData(data) { return normalize(data, messageSchema); }
export function desnormalizedData(normData) { return denormalize(normData.result, messageSchema, normData.entities) }