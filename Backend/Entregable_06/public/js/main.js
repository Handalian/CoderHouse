const socket = io();
const fs = require('fs');
socket.on('from-server-mensajes', data => {
    render(data.DB_MENSAJES);
});
function render(mensajes) {
    const cuerpoMensajesHTML = mensajes.map((msj) => {
        return `
        <span style="color:blue;"><b>${msj.author}
        <span style="color:red;"><b> [${msj.time}]:
        <span style="color:green;">${msj.text}</span></span>`;
    }).join('<br>');
    document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
};
function enviarMensaje() {
    const inputUser = document.querySelector('#user');
    const inputContenido = document.querySelector('#contenidoMensaje');
    const mensaje = {
        author: inputUser.value,
        text: inputContenido.value
    }
    socket.emit('from-client-mensaje', mensaje);
};
function enviarProducto() {
    const inputTitle = document.querySelector('#title');
    const inputPrice = document.querySelector('#price');
    const inputThumbnail = document.querySelector('#thumbnail');
    const product = {
        title: inputTitle.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value,
    }
    socket.emit('from-client-product', product);
};

socket.on('from-server-product', data => {
    renderProduct(data.newObjs);
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

