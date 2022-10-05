import knex from 'knex';
import { config } from '../utils/config.js';
import { config as configSQLite } from '../utils/configSQLite.js';
const knexCli = knex(config.db);
const knexCliSQLite = knex(configSQLite.db);

const articulos = [
    { title: 'Keyboard', price: 200, thumbnail: "https://cdn0.iconfinder.com/data/icons/zondicons/20/keyboard-256.png" },
    { title: 'Television', price: 300, thumbnail: "https://cdn1.iconfinder.com/data/icons/essentials-pack/96/television_tv_screen_display_technology-256.png" }
]

knexCli.schema.dropTableIfExists('productos')
    .then(() => {
        knexCli.schema.createTable('productos', table => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.string('price', 50).notNullable();
            table.string('thumbnail', 400).notNullable();
        })
            .then(() => console.log("Tabla creada"))
            .then(async function () {
                await knexCli('productos').insert(articulos)
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
            .finally(() => {
                ;
                knexCli.destroy();
            });
    });

knexCliSQLite.schema.dropTableIfExists('mensajes')
    .then(() => {
        knexCliSQLite.schema.createTable('mensajes', table => {
            table.increments('id').primary();
            table.string('user', 50).notNullable();
            table.string('name', 50).notNullable();
            table.string('surname', 50).notNullable();
            table.string('age', 50).notNullable();
            table.string('alias', 50).notNullable();
            table.string('avatar', 50).notNullable();
            table.string('text', 50).notNullable();
            table.string('time', 50).notNullable();
        })
            .then(() => console.log("Tabla creada"))
            .catch(err => {
                console.log(err);
                throw err;
            })
            .finally(() => {
                ;
                knexCliSQLite.destroy();
            });
    });
