const loginForm = document.getElementById('login-form');
const errorMessageDiv = document.getElementById('error-message');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "admin@admin" && password === "admin") {
        errorMessageDiv.style.display = 'none';
        window.location.href = "./carrinho.html";
    } else {
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.innerText = "Email ou senha inválidos.";
    }

});