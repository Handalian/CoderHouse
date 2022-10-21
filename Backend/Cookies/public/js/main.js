// const userSchema = new schema.Entity('user');
// const nameSchema = new schema.Entity('name');
// const ageSchema = new schema.Entity('age');
// const surnameSchema = new schema.Entity('surname');
// const aliasSchema = new schema.Entity('alias');
// const avatarSchema = new schema.Entity('avatar');

// const timeSchema = new schema.Entity('time');
// const textSchema = new schema.Entity('text');

// const authorSchema = new schema.Entity("author", {
//     user: userSchema,
//     name: nameSchema,
//     surname: surnameSchema,
//     age: ageSchema,
//     alias: aliasSchema,
//     avatar: avatarSchema,
// })

// const messageSchema = new schema.Entity("message", {
//     author: authorSchema,
//     timestamp: timeSchema,
//     time: textSchema,
// })

// function normalizedData(data) { return normalize(data, messageSchema); }
// function desnormalizedData(normData) { return denormalize(normData.result, messageSchema, normData.entities) }

const socket = io();
// socket.on('from-server-mensajes', (normData) => {
//     const data = desnormalizedData(normData.allMessages)
//     render(data);
// });
socket.on('from-server-message', (data) => {
    render(data.allMessages);
});
socket.on('from-server-product', data => {
    renderProduct(data);
});

function render(mensajes) {
    const cuerpoMensajesHTML = mensajes.map((msj) => {
        return `
        <span style="color:blue;"><b>${msj.author.user}
        <span style="color:red;"><b> [${msj.timestamp}]:
        <span style="color:green;">${msj.text}</span>
        <img width="30" src="${msj.author.avatar}"alt="">`;
    }).join('<br>');
    document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
};

function sendMessage() {

    const inputUser = document.querySelector('#user');
    const inputName = document.querySelector('#name');
    const inputSurname = document.querySelector('#surname');
    const inputAge = document.querySelector('#age');
    const inputAlias = document.querySelector('#alias');
    const inputAvatar = document.querySelector('#avatar');
    const inputContenido = document.querySelector('#contenidoMensaje');
    const message = {
        author: {
            user: inputUser.value,
            name: inputName.value,
            surname: inputSurname.value,
            age: inputAge.value,
            alias: inputAlias.value,
            avatar: inputAvatar.value,
        },
        text: inputContenido.value
    }
    socket.emit('from-client-message', message);
    // const data = normalizedData(message);
    // socket.emit('from-client-mensaje', data);
};

function renderProduct(data) {
    console.log(data)
    const productHTML =
        `<td>${data.id}</td>
        <td>${data.title}</td>
        <td>${data.price}</td>
        <td>
        <img width="30" src="${data.thumbnail}"alt="">
        </td>`;
    const row = document.createElement('tr');
    row.innerHTML = productHTML;
    document.querySelector('#historial-productos').appendChild(row);
};

function sendProduct() {
    const inputTitle = document.querySelector('#title');
    const inputPrice = document.querySelector('#price');
    const inputThumbnail = document.querySelector('#thumbnail');
    const inputDescription = document.querySelector('#description');
    const inputCode = document.querySelector('#code');
    const inputStock = document.querySelector('#stock');
    const product = {
        title: inputTitle.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value,
        description: inputDescription.value,
        code: inputCode.value,
        stock: inputStock.value,
    }
    // renderProduct(product)
    socket.emit('from-client-product', product);
};
// function userLogin() {
//     const inputUserLogin = document.querySelector('#user').value;
//     // alert(inputUserLogin.value)
//     socket.emit('from-client-userLogin', inputUserLogin);
// }

