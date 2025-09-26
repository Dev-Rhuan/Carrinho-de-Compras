class Produto {
    constructor(id, nome, preco, imgUrl) {
        this.id = id;
        this.nome = nome;
        this.preco = preco
        this.imgUrl = imgUrl;
    }
}

// Arrays

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

const ListaDeProdutosDiv = document.getElementById('lista-produtos');

function exibirProdutos(produtosParaExibir) {

    ListaDeProdutosDiv.innerHTML = '';

    for (let i = 0; i < produtosParaExibir.length; i++) {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add('produto');

        produtoDiv.innerHTML = `
            <img src="${produtosParaExibir[i].imgUrl}" alt="${produtosParaExibir[i].nome}">
            <p>${produtosParaExibir[i].nome}</p>
            <p>R$ ${produtosParaExibir[i].preco.toFixed(2)}</p>
            <button onclick="adicionarProduto(${produtosParaExibir[i].id})"><span class="material-symbols-outlined">add</span></button>
        `;

        ListaDeProdutosDiv.appendChild(produtoDiv);
    }
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
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('itens');

            let subTotal = carrinho[i].preco * carrinho[i].quantidade;
            total += subTotal;

            itemDiv.innerHTML = `
                <div>
                    <p>${carrinho[i].nome}</p>
                    <p>R$ ${carrinho[i].preco.toFixed(2)} x ${carrinho[i].quantidade}</p>
                </div>
                <div>
                    <button onclick="removerProduto(${carrinho[i].id})">&times;</button>
                </div>
            `;

            carrinhoDiv.appendChild(itemDiv);
        }

        carrinhoTotal.innerText = `R$ ${total.toFixed(2)}`;
    }
}

// Funções de Adicionar, Remover, Buscar e Finalizar

// Adicionar ao carrinho

function adicionarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    const produtoExisteNoCarrinho = carrinho.find(p => p.id === id);

    if (produtoExisteNoCarrinho) {
        produtoExisteNoCarrinho.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    exibirCarrinho();
}

// Remover do carrinho

function removerProduto(id) {
    const produtoExistente = carrinho.find(p => p.id === id);

    if (produtoExistente.quantidade > 1) {
        produtoExistente.quantidade--;
    } else {
        carrinho.splice(carrinho.indexOf(produtoExistente), 1);
    }

    exibirCarrinho();
}

// Buscar produtos

function buscarProdutos() {
    const input = document.getElementById('buscar-input').value.toLowerCase();

    const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(input));

    exibirProdutos(produtosFiltrados);
}

// Finalizar pedido

const abrirResumo = document.getElementById('carrinho-finalizar');

abrirResumo.addEventListener('click', function () {
    const dialog = document.createElement('dialog')
    dialog.id = 'modal'

    const valorTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    const resumo = carrinho.map(item => `
        <div class="item-resumo">
            <p>${item.nome} (${item.quantidade})</p>
            <p>R$${item.preco * item.quantidade.toFixed(2)}</p>
        </div>
    `).join('');

    dialog.innerHTML = `
        <header>
            <h3>Resumo do Pedido</h3>
            <button id="btn-fechar">&times;</button>
        </header>
        <div class="corpo-modal">
            ${resumo}
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

    const fecharResumo = document.getElementById('btn-fechar');
    fecharResumo.addEventListener('click', function(){
        dialog.close();
        dialog.remove();
    })

    dialog.showModal();
});

exibirProdutos(produtos);