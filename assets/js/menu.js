class Produto {
    constructor(id, nome, preco, imgUrl) {
        this.id = id;
        this.nome = nome;
        this.preco = preco
        this.imgUrl = imgUrl;
    }
}

//Arrays

let produtos = [
    new Produto(1, "Mass Effect Trilogy", 249.00, "assets/imagens/1.png"),
    new Produto(2, "Red Dead Redemption", 299.90, "assets/imagens/2.png"),
    new Produto(3, "Ghost of Tsushima", 249.90, "assets/imagens/3.png"),
    new Produto(4, "Sekiro: Shadows Die Twice", 274.00, "assets/imagens/4.png"),
    new Produto(5, "The Witcher 3: Wild Hunt", 129.99, "assets/imagens/5.png"),
    new Produto(6, "Hollow Knight", 46.99, "assets/imagens/6.png"),
]

let carrinho = [];

//Exibir Produtos

const ListaDeProdutos = document.getElementById('lista-produtos');

for (let i = 0; i < produtos.length; i++) {
    const produtoDiv = document.createElement("div");

    produtoDiv.classList.add('produto');

    produtoDiv.innerHTML = `
        <img src="${produtos[i].imgUrl}" alt="${produtos[i].nome}">
        <p>${produtos[i].nome}</p>
        <p>R$ ${produtos[i].preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho(${produtos[i].id})"><span class="material-symbols-outlined">add</span></button>
    `;

    ListaDeProdutos.appendChild(produtoDiv);
}

//Exibir Itens no carrinho

const carrinhoDiv = document.getElementById('carrinho-itens');
const carrinhoMensagem = document.getElementById('carrinho-mensagem');
const carrinhoTotal = document.getElementById('carrinho-total');
const carrinhoFinalizar = document.getElementById('carrinho-finalizar');

function exibirCarrinho() {
    carrinhoDiv.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoMensagem.style.display = 'block';
        carrinhoTotal.innerText = `R$ 0,00`;
        carrinhoFinalizar.disabled = true;
    } else {
        carrinhoMensagem.style.display = 'none';
        carrinhoFinalizar.disabled = false;

        let total = 0;

        for (let i = 0; i < carrinho.length; i++) {
            const itensDiv = document.createElement('div');
            itensDiv.classList.add('itens');

            let subTotal = carrinho[i].preco * carrinho[i].quantidade;
            total += subTotal;

            itensDiv.innerHTML = `
                <div>
                    <p>${carrinho[i].nome}</p>
                    <p>R$ ${carrinho[i].preco} x ${carrinho[i].quantidade}</p>
                </div>
                <div>
                    <button onclick="removerDoCarrinho(${carrinho[i].id})">&times;</button>
                </div>
            `;

            carrinhoDiv.appendChild(itensDiv);

            carrinhoTotal.innerText = `R$ ${total.toFixed(2)}`;
        }
    }
}

// Funções de Adicionar, Remover, buscar e Finalizar

// Adicionar ao carrinho

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const existe = carrinho.find(p => p.id === id);

    if (existe) {
        existe.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    exibirCarrinho();
}

// Remover do carrinho

function removerDoCarrinho(id) {
    const itemNoCarrinho = carrinho.find(p => p.id === id);

    if (itemNoCarrinho.quantidade > 1) {
        itemNoCarrinho.quantidade--;
    } else {
        carrinho.splice(carrinho.indexOf(itemNoCarrinho), 1);
    }

    exibirCarrinho();
}

// Buscar produtos

function buscar() {
    const input = document.getElementById('buscar-input').value.toLowerCase();

    ListaDeProdutos.innerHTML = '';

    const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(input));

    for (let i = 0; i < produtosFiltrados.length; i++) {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add('produto');

        produtoDiv.innerHTML = `
            <img src="${produtosFiltrados[i].imgUrl}" alt="${produtosFiltrados[i].nome}">
            <p>${produtosFiltrados[i].nome}</p>
            <p>R$ ${produtosFiltrados[i].preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produtosFiltrados[i].id})"><span class="material-symbols-outlined">add</span></button>
        `;

        ListaDeProdutos.appendChild(produtoDiv);
    }
}

// Finalizar pedido

const openButton = document.getElementById('carrinho-finalizar');

openButton.addEventListener('click', function () {
    const dialog = document.createElement('dialog')
    dialog.id = 'modal'

    const valorTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const quantidadeTotalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    const listaDeItensHtml = carrinho.map(item => `
                <div class="item-resumo">
                    <p>${item.nome} (${item.quantidade})</p>
                    <p>R$${item.preco * item.quantidade}</p>
                </div>
            `).join('');

    dialog.innerHTML = `
                <header>
                    <div>
                        <h3>Resumo do Pedido</h3>
                    </div>
                    <div>
                        <div>
                            <p>Total</p>
                            <span>R$${valorTotal.toFixed(2)}</span>
                        </div>
                        <div>
                            <p>Itens:</p>
                            <span>${quantidadeTotalItens}</span>
                        </div>
                    </div>
                    <button id="btn-fechar">&times;</button>
                </header>
                <div class="corpo-modal">
                    ${listaDeItensHtml}
                </div>
                <div>
                    <p>Pagamento</p>
                    <div>
                        <p>Total</p>
                        <span>R$${valorTotal.toFixed(2)}</span>
                    </div>
                    <button>Pagar</button>
                </div>
            `;



    document.body.appendChild(dialog);

    dialog.querySelector('#btn-fechar').addEventListener('click', () => {
        dialog.close();
        dialog.remove();
    });

    dialog.showModal();

});

