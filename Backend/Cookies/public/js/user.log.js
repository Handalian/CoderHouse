
function logInUser() {
    const inputUserLogin = document.querySelector('#user').value;
    document.location.href = "/api/user/login?user=" + inputUserLogin;
    // socket.emit('from-client-userLogin', inputUserLogin);
}

function logOutUser() {
    document.location.href = "/api/user/logout";
}

