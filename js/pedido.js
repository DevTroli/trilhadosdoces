const listaPedido = document.getElementById("listaPedido");
const totalPedido = document.getElementById("totalPedido");
const btnFinalizar = document.getElementById("btnFinalizar");
const mensagemPedido = document.getElementById("mensagemPedido");

let total = 0;

// estado vazio inicial
mostrarCarrinhoVazio();

/* ADICIONAR PRODUTO BÁSICO */
document.querySelectorAll(".btn-add").forEach((botao) => {
  botao.addEventListener("click", function () {
    const card = this.closest(".card-produto");
    const nome = card.dataset.nome;
    const preco = Number(card.dataset.preco);
    const imgSrc = card.dataset.img;

    adicionarItem(nome, preco, imgSrc);
    somarTotal(preco);
    limparMensagem();
  });
});

function adicionarItem(nome, preco, imgSrc) {
  // se era a mensagem de vazio, limpa
  if (listaPedido.firstElementChild && listaPedido.firstElementChild.classList.contains("pedido-vazio")) {
    listaPedido.innerHTML = "";
  }

  const li = document.createElement("li");
  li.classList.add("pedido-item");

  li.innerHTML = `
    <img src="${imgSrc}" alt="${nome}">
    <div class="pedido-item__info">
      <span class="pedido-item__nome">${nome}</span>
      <span class="pedido-item__preco">R$ ${preco.toFixed(2).replace(".", ",")}</span>
    </div>
    <div class="pedido-item__acoes">
      <button class="pedido-item__remover">remover</button>
    </div>
  `;

  // botão remover: tira o li e atualiza total
  li.querySelector(".pedido-item__remover").addEventListener("click", () => {
    listaPedido.removeChild(li);
    somarTotal(-preco);

    if (listaPedido.children.length === 0) {
      mostrarCarrinhoVazio();
    }
  });

  listaPedido.appendChild(li);
}

/* TOTAL MUITO SIMPLES */
function somarTotal(valor) {
  total += valor;
  if (total < 0) total = 0;
  totalPedido.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

/* MENSAGENS */
function mostrarCarrinhoVazio() {
  const li = document.createElement("li");
  li.classList.add("pedido-vazio");
  li.textContent = "Seu carrinho está vazio.";
  listaPedido.appendChild(li);
}

function limparMensagem() {
  mensagemPedido.textContent = "";
  mensagemPedido.className = "pedido-msg";
}

/* FINALIZAR PEDIDO */
btnFinalizar.addEventListener("click", () => {
  const temItens = Array.from(listaPedido.children).some(
    (li) => !li.classList.contains("pedido-vazio")
  );

  if (!temItens) {
    alert("Seu carrinho está vazio. Adicione itens antes de finalizar.");
    return;
  }

  alert("Pedido finalizado com sucesso!");

  // limpa lista e zera total
  listaPedido.innerHTML = "";
  mostrarCarrinhoVazio();
  total = 0;
  totalPedido.textContent = "R$ 0,00";
});


