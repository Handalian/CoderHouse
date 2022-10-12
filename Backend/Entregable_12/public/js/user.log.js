function userLogout() {
    document.location.href = "/api/user/logout";
}
function userLogin() {
    const inputUserLogin = document.querySelector('#user').value;
    alert(inputUserLogin.value)
    // socket.emit('from-client-userLogin', inputUserLogin);
}