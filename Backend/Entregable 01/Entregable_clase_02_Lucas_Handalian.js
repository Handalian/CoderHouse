/*Clase Books */
/*  Se crea esta clase para generar los libros para la clase usuario, ademas
    se le agrega la funcion get nombre a la clase para acceder a la misma dentro
    de una funcion en la clase usuario, getBooksNames.
*/
class Books{
    constructor(name, author){
        this.name = name;
        this.author = author;
    }
    getName = () => this.name;
}
/* Clase usuario*/
/* Se crea el constructor tal como pide la consigna.
    La funcion GetFullName, devuelve el nombre completo del usuario
    La funcion addMascotas permite agregar un string al array mascotas del usuario
    La funcion countMascotas cuenta el largo del array Mascotas del usuario
    La funcion addBook permite agregar una objeto del tipo books a la propiedad libros del usiaro
    La funcion getBooksNames, devuelve el nombre de los objetos books que estan en la propiedad libros del usuario.
*/

class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName = () => `${this.nombre} ${this.apellido}`; 
    addMascotas = (new_pet) => this.mascotas.push(new_pet);
    countMascotas = () => this.mascotas.length;  
    addBook = (new_book) =>this.libros.push(new_book); 
    getBooksNames= () => {
         let books_names = [];
         for (let i = 0; i < this.libros.length; i++) {
              books_names.push(this.libros[i].getName());
         }
        return books_names;
        }
 }


/*Main*/
// Se crean dos objetos de la clase libros
const libro_01 = new Books("Nombre_01","autor_01");
const libro_02 = new Books("Nombre_02","autor_02");
// Se crea un objeto de la clase Usuario
const usuario = new Usuario("Lucas", "Handalian", [libro_01, libro_02],["Dog","Cat"]);

// Se imprime en consola el nombre completo
console.log("Nombre completo: " + usuario.getFullName());
// Se agrega una nueva mascota
usuario.addMascotas("Fish");
// Se imprime en consola la cantidad de mascotas 
console.log("Mascotas: " + usuario.countMascotas());
// Se agrega objeto de la clase books a los libros del usuario
const libro_03 = new Books("Nombre_03","autor_02");
usuario.addBook(libro_03);
// Se imprimen en consola los nombres de los libros
console.log("Nombre de los libros: " + usuario.getBooksNames());
