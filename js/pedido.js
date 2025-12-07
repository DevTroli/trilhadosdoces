if (!Auth.estaLogado()) {
  alert("⚠️ Faça login para fazer pedidos");
  window.location.href = "login.html";
}

const listaPedido = document.getElementById("listaPedido");
const totalPedido = document.getElementById("totalPedido");
const btnFinalizar = document.getElementById("btnFinalizar");
const mensagemPedido = document.getElementById("mensagemPedido");

let carrinho = [];
let total = 0;

mostrarCarrinhoVazio();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add")) {
    const card = e.target.closest(".card-produto");

    const nomeUnico = card.dataset.nome.replace(/\s+/g, "").toLowerCase();
    const produtoId = `${nomeUnico}_${Date.now()}`;
    const nome = card.dataset.nome;
    const preco = Number(card.dataset.preco);
    const imgSrc = card.dataset.img;

    console.log("🛒 COMPRA:", { produtoId, nome, preco });

    adicionarItem(produtoId, nome, preco, imgSrc);
  }
});

function adicionarItem(produtoId, nome, preco, imgSrc) {
  console.log(`➕ Tentando adicionar: ${nome} (ID: ${produtoId})`);

  const itemExistente = carrinho.find((item) => item.produtoId === produtoId);

  if (itemExistente) {
    itemExistente.quantidade += 1;
    console.log(`📈 Incrementou ${nome} para ${itemExistente.quantidade}`);
  } else {
    const novoItem = {
      produtoId: produtoId,
      nome: nome,
      preco: preco,
      imgSrc: imgSrc,
      quantidade: 1,
    };
    carrinho.push(novoItem);
    console.log(`🆕 Adicionou novo: ${nome}`);
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  if (carrinho.length === 0) {
    mostrarCarrinhoVazio();
    return;
  }

  listaPedido.innerHTML = "";

  total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.classList.add("pedido-item");

    li.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.nome}">
      <div class="pedido-item__info">
        <span class="pedido-item__nome">${item.nome}</span>
        <span class="pedido-item__preco">R$ ${item.preco.toFixed(2).replace(".", ",")} x ${item.quantidade}</span>
      </div>
      <div class="pedido-item__acoes">
        <button class="pedido-item__remover" data-index="${index}">remover</button>
      </div>
    `;

    listaPedido.appendChild(li);
  });

  totalPedido.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

listaPedido.addEventListener("click", (e) => {
  if (e.target.classList.contains("pedido-item__remover")) {
    const index = Number(e.target.dataset.index);
    carrinho.splice(index, 1); // Remove do array
    atualizarCarrinho();
  }
});

btnFinalizar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Adicione itens antes de finalizar.");
    return;
  }

  const usuario = Auth.getUsuarioLogado();

  const pedido = {
    clienteId: usuario.id,
    clienteNome: usuario.nome,
    clienteTelefone: usuario.telefone || "Não informado",
    itens: carrinho,
    total: total,
    tipoPedido: "retirada",
    observacoes: "",
  };

  try {
    const novoPedido = DB.pedidos.create(pedido);

    carrinho = [];
    total = 0;
    atualizarCarrinho();

    mensagemPedido.className = "pedido-msg pedido-msg--sucesso";
    mensagemPedido.textContent = `✅ Pedido #${novoPedido.id} realizado com sucesso!`;

    setTimeout(() => {
      mensagemPedido.textContent = "";
      mensagemPedido.className = "pedido-msg";
    }, 5000);
  } catch (error) {
    mensagemPedido.className = "pedido-msg pedido-msg--erro";
    mensagemPedido.textContent = `❌ Erro: ${error.message}`;
  }
});

function mostrarCarrinhoVazio() {
  listaPedido.innerHTML =
    '<li class="pedido-vazio">Seu carrinho está vazio.</li>';
  total = 0;
  totalPedido.textContent = "R$ 0,00";
}

function limparMensagem() {
  mensagemPedido.textContent = "";
  mensagemPedido.className = "pedido-msg";
}
