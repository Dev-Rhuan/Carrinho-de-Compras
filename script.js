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

// CARRINHO

class Produto {
    constructor (codigo, nome, preco) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco
    }
}

//Array de produto

let produtos = [
    new Produto(1, "Mouse", 220),
    new Produto(2, "Teclado", 280),
    new Produto(3, "MousePad", 70),
    new Produto(4, "Monitor", 950),
    new Produto(5, "Placa-mãe", 850),
    new Produto(6, "Processador", 800),
    new Produto(7, "Placa de video", 1900),
    new Produto(8, "Memoria ram", 350),
    new Produto(9, "SSD", 400),
    new Produto(10, "Gabinete", 320)
]

//Exibir Produtos

let ListaDeProdutos = document.getElementById('lista-produtos');

for (let i = 0; i < produtos.length; i++) {
    let item = document.createElement("div");
    item.classList.add('produto');

    item.innerHTML = `
        <p>${produtos[i].nome}</p>
        <p>R$ ${produtos[i].preco.toFixed(2)}</p>
        <button onclick="adicionar(${produtos[i].codigo})"><span class="material-symbols-outlined">
add
</span></button>
    `;

    ListaDeProdutos.appendChild(item);
}

//Adicionar Produtos ao Carrinho

const cartItemsDiv = document.getElementById('cart-items');
const cartEmptyMessage = document.getElementById('cart-message');
const cartTotalSpan = document.getElementById('cart-total');
const cartButton = document.getElementById('cart-finish')
const cartItemCount = document.getElementById('item-count');

let carrinho = [];

function CarregarCarrinho(){
    cartItemsDiv.innerHTML = '';

    if(carrinho.length === 0){
        cartEmptyMessage.style.display = 'block';
        cartButton.disabled = true;
    } else {
        cartEmptyMessage.style.display = 'none';
        cartButton.disabled = false;

        let total = 0;

        carrinho.forEach(item => {
            const subTotal = item.preco * item.quantidade;
            total += subTotal;

            const itemDiv = document.createElement("div");
            itemDiv.className='items'

            itemDiv.innerHTML =`
                <div>
                    <p>${item.nome}</p>
                    <p>R$ ${item.preco} x ${item.quantidade}</p>
                </div>
                <div>
                    <span>R$ ${subTotal.toFixed(2)}</span>
                    <button onclick="removerDoCarrinho(${item.codigo})">&times;</button>
                </div>
            `;

            cartItemsDiv.appendChild(itemDiv);
        });

        cartTotalSpan.innerHTML = 'R$ ' + total.toFixed(2);

    }
}

function adicionar(codigo) {
    const produtoParaAdicionar = produtos.find(p=> p.codigo === codigo);
    const itemExistente = carrinho.find(p=> p.codigo === codigo);

    

    if (itemExistente) {
        itemExistente.quantidade++;
        
    } else {
        carrinho.push({...produtoParaAdicionar, quantidade:1});
    }

    CarregarCarrinho();
}

function removerDoCarrinho(codigo){
}


