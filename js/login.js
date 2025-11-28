const EMAIL_1 = "brawlixo123@gmail.com";
const SENHA_1 = "1291392522026";

const EMAIL_2 = "Yohan@Ruiz";
const SENHA_2 = "1291392522007";

const form = document.getElementById("formLogin");
const erro = document.getElementById("loginErro");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    erro.textContent = "Preencha email e senha para continuar.";
    return;
  }

  const loginValido =
    (email === EMAIL_1 && senha === SENHA_1) ||
    (email === EMAIL_2 && senha === SENHA_2);

  if (loginValido) {
    window.location.href = "pedido.html";
  } else {
    erro.textContent = "Dados inválidos. Verifique usuário e senha.";
  }
});
