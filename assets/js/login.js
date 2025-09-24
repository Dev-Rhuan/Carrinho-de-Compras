const loginForm = document.getElementById('login-form');
const MensagemErroDiv = document.getElementById('erro-mensagem');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario === "admin@admin" && senha === "admin") {
        MensagemErroDiv.style.display = 'none';
        window.location.href = "./carrinho.html";
    } else {
        MensagemErroDiv.style.display = 'block';
        MensagemErroDiv.innerText = "Usuario ou senha inválidos.";
    }

});