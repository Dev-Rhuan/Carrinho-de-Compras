function login() {
    const User = "admin";
    const Pass = "admin";

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === User && password === Pass) {
        window.location.href = 'carrinho.html';
    } else {
        alert("Usuario e senha Incorretos!")
    }
}