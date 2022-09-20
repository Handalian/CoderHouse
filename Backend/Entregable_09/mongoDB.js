/*use ecommerce*/
db.createCollection('mensajes')
db.createCollection('productos')
//1
db.mensajes.insertMany([
    {
        "time": "8/31/2022,1:30:33 PM",
        "author": "Juan",
        "text": "¡Hola! ¿Que tal?"
    },
    {
        "time": "9/7/2022, 6:41:25 PM",
        "author": "Pedro",
        "text": "¡Hola Juan! ¿Que tal?"
    },
    {
        "time": "9/7/2022, 7:20:40 PM",
        "author": "Juan",
        "text": "Muy bien, ¿tu?"
    },
    {
        "time": "9/7/2022, 7:22:17 PM",
        "author": "Pedro",
        "text": "Me algro, excelente"
    },
    {
        "time": "9/7/2022, 7:22:42 PM",
        "author": "Roberto",
        "text": "Bueenas"
    },
    {
        "time": "9/7/2022, 7:25:37 PM",
        "author": "Pedro",
        "text": "¿Que contas Roberto?"
    },
    {
        "time": "9/7/2022, 7:30:42 PM",
        "author": "Roberto",
        "text": "Nada nuevo ¿tu Pedro?"
    },
    {
        "time": "9/7/2022, 7:40:37 PM",
        "author": "Pedro",
        "text": "Por ahora nada"
    },
    {
        "time": "9/7/2022, 8:20:40 PM",
        "author": "Juan",
        "text": "No me dejen afuera de la charla"
    },
    {
        "time": "9/7/2022, 9:20:40 PM",
        "author": "Juan",
        "text": "Hola...?"
    }

])
db.productos.insertMany([{
    title: "Mouse",
    price: 120,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/essential-pack/32/21-Mouse-128.png"
},
{
    title: "Keyboard",
    price: 200,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/network-communication-vol1/48/Keybord_typing-128.png"
},
{
    title: "Headphone",
    price: 350,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/communication-02/32/Headphone-128.png"
},
{
    title: "Wireless Keyboard",
    price: 375,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/zondicons/20/keyboard-256.png"
},
{
    title: "Monitor",
    price: 450,
    thumbnail: "https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami17-10-128.png"
},
{
    title: "Television",
    price: 700,
    thumbnail: "https://cdn1.iconfinder.com/data/icons/essentials-pack/96/television_tv_screen_display_technology-256.png"
},
{
    title: "Basic Laptop",
    price: 1500,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/startup-17/32/startup-03-128.png"
},
{
    title: "Laptop",
    price: 2500,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-042_laptop_macbook-128.png"
},
{
    title: "Laptop Gamer",
    price: 3650,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/technology-13/48/tech-color_laptop-128.png"
},
{
    title: "Gamer Kit",
    price: 4500,
    thumbnail: "https://cdn1.iconfinder.com/data/icons/online-meeting-conference-teleconference/266/online-meeting-10-128.png"
}])
//3
db.mensajes.find()
db.productos.find()
//4
db.mensajes.find().count()
db.productos.find().count()
//5a
db.productos.insertOne({
    title: "Wireless mouse",
    price: 220,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_mouse_48px-128.png"
})
//5b
//5b 1 
db.productos.find({ price: { $lte: 1000 } }).sort({ price: 1 })
//5b 2 
db.productos.find({ price: { $gte: 1000, $lte: 3000 } }).sort({ price: 1 })
//5b 3
db.productos.find({ price: { $gt: 3000 } }).sort({ price: 1 })
//5b 4
db.productos.find().sort({ price: 1 }).limit(1).skip(2)
//5c
db.productos.updateMany({}, { $set: { "stock": 100 } })
//5d
db.productos.updateMany({ price: { $gt: 4000 } }, { $set: { "stock": 0 } })
//5e
db.productos.deleteMany({ price: { $lte: 1000 } })
//6
//Creo el Usuario con permisos de lectura
db.createUser({
    user: "pepe",
    pwd: "asd456",
    roles: [
        { role: "read", db: "ecommerce" }
    ]
})
// Correr nuevamente el server en:
//mongod--dbpath "C:\Program Files\MongoDB\Server\6.0\bin" --auth
//mongosh mongodb://127.0.0.1:27017
db.auth("pepe", "asd456")
/* use ecommerce */
// Testeo Usuario
db.productos.deleteMany({}) // ----> No autorizado



