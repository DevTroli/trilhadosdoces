const EMAIL_VALIDO_1 = "brawlixo123@gmail.com";
const SENHA_VALIDA_1 = "1291392522026";

const form = document.getElementById("formLogin");
const erro = document.getElementById("loginErro");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    erro.textContent = "Preencha email e senha para continuar.";
    return;
  }

  if (email === EMAIL_VALIDO_1 && senha === SENHA_VALIDA_1) {
    window.location.href = "pedido.html";
  } else {
    erro.textContent = "Dados inválidos. Verifique usuário e senha.";
  }
});

