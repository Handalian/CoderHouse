/* ---------------------- Modulos ----------------------*/
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
/* ---------------------- Instancia Server ----------------------*/
const app = express();

/* ---------------------- Middlewares ----------------------*/
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

//Motor de plantillas
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//base de datos
const DB_Productos = [
    {
        "id": 3,
        "title": "Keyboard",
        "price": 200,
        "thumbnail": "https://cdn0.iconfinder.com/data/icons/zondicons/20/keyboard-256.png"
      },
      {
        "id": 1,
        "title": "Television",
        "price": 300,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/essentials-pack/96/television_tv_screen_display_technology-256.png"
      }
]
/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res)=>{
    res.render('vista', {DB_Productos});
});

app.post('/productos', (req, res)=>{
    const ids = DB_Productos.map(DB_Productos => {
        return DB_Productos.id;
    });
    const max = Math.max(...ids);
    const newId = max + 1;
    const newObjs = {"id": newId,...req.body};
    DB_Productos.push(newObjs);
   res.redirect('/');
});

/* ---------------------- Servidor ----------------------*/
const PORT = 9090;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
server.on('error', err => console.log(`error en server ${err}`));
