const socket = io();
socket.on('from-server-mensajes', (data) => {
    console.log(data);
    render(data.allMessages);
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

function enviarMensaje() {
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
    socket.emit('from-client-mensaje', message);
};

function enviarProducto() {
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
    socket.emit('from-client-product', product);
};

socket.on('from-server-product', data => {
    renderProduct(data);
});

function renderProduct(data) {
    const productoHTML =
        `<td>${data.id}</td>
        <td>${data.title}</td>
        <td>${data.price}</td>
        <td>
        <img width="30" src="${data.thumbnail}"alt="">
        </td>`;
    const row = document.createElement('tr');
    row.innerHTML = productoHTML;
    document.querySelector('#historial-productos').appendChild(row);
};

