const fs = require('fs');
const ruta = './productos.txt';

const {Contenedor} = require("./ClassContenedor.js");


// testing functions 
async function main(){
    const objs = new Contenedor('./productos.txt');
    console.log(await objs.loadFiles());
    await objs.save({
     "title":"Monitor",
     "price":300,
     "thumbnail": "http://www.google.com/"
    });
    console.log(await objs.getById(6));
    console.log(await objs.getAll());
    await objs.deleteById(2);
    //await objs.deleteAll();
 }

main();
