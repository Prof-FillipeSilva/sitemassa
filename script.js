const musicas = ["../site/audio/thinking.mp3","../site/audio/capricorn.mp3","../site/audio/vive.mp3", "../site/audio/labelle.mp3", "../site/audio/anjosaulo.mp3","../site/audio/se.mp3","../site/audio/daronome.mp3","../site/audio/oceano.mp3","../site/audio/pequenaflor.mp3","../site/audio/sozinho.mp3", "../site/audio/anjop.mp3"];
let index = 0;
const player = document.getElementById("player");
const source = document.getElementById("source");

// Verificação de senha
function verificarSenha() {
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erro");
  
  if (senha === "caichinhos") {
    document.getElementById("loginScreen").style.display = "none";
    
    const entrada = document.getElementById("entrada");
    entrada.style.display = "block"; // <-- ADICIONA ISSO
    entrada.classList.remove("hidden");
    entrada.classList.add("animate__fadeIn");

  } else {
    erro.innerText = "Senha incorreta! Tente novamente.";
  }
}


// Entrar no conteúdo principal
function entrarSite() {
  document.getElementById("entrada").style.display = "none";
  const main = document.getElementById("mainContent");
  main.classList.remove("hidden");
  main.classList.add("animate__fadeIn");

  const mensagemSection = document.getElementById("mensagem");
  mensagemSection.classList.remove("hidden");
  mensagemSection.classList.add("animate__fadeIn");

  player.play().catch(() => {
    console.log("Autoplay bloqueado.");
  });
}

// Mostrar poemas
function mostrarPoema(n) {
  const p1 = document.getElementById("poema1").style.display = "flex";;
  // const p2 = document.getElementById("poema2");
  p1.classList.add("hidden");
  p2.classList.add("hidden");

  if (n === 1) {
    p1.classList.remove("hidden");
    p1.classList.add("animate__fadeInUp");
  } else {
    p2.classList.remove("hidden");
    p2.classList.add("animate__fadeInUp");
  }
}

// Músicas
function proximaMusica() {
  index = (index + 1) % musicas.length;
  tocarMusica();
}

function musicaAnterior() {
  index = (index - 1 + musicas.length) % musicas.length;
  tocarMusica();
}

function tocarMusica() {
  source.src = musicas[index];
  player.load();
  player.play();
}

// Corações flutuantes
function gerarCoracoes(containerId) {
  const container = document.getElementById(containerId);
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.innerText = "💖";
  container.appendChild(heart);

  setTimeout(() => {
    container.removeChild(heart);
  }, 5000);
}

// Ativa os corações nas duas telas
setInterval(() => gerarCoracoes("hearts-container-login"), 500);
setInterval(() => gerarCoracoes("hearts-container"), 800);

document.getElementById("form-recado").addEventListener("submit", function (e) {
  e.preventDefault();

  const mensagem = e.target.mensagem.value;
  const endpoint = "https://script.google.com/macros/s/AKfycbzXJDF-NrhQMkmckQnxeOiWXv0sO_xZN2FqPA27FcWAZFwLvMNHin6KalyZG0R-kzZ0Rg/exec";

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ mensagem: mensagem })
  })
  .then(response => response.text())
  .then(data => {
        
    e.target.mensagem.value = ""; // limpa o campo
    const confirmacao = document.getElementById("mensagem-enviada");
    confirmacao.style.display = "block";
    setTimeout(() => {
      confirmacao.style.display = "none";
    }, 3000);

    document.getElementById("mensagem-enviada").style.display = "block";
  })
  .catch(error => {
    alert("Erro ao enviar mensagem. Tente novamente.");
  });
});

// Garante que a introdução e o conteúdo principal estejam escondidos ao iniciar
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("entrada").style.display = "none";
  document.getElementById("mainContent").classList.add("hidden");
  document.getElementById("mensagem").classList.add("hidden");
});





