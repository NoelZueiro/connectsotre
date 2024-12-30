/************* NAVIGATION BAR **************/
window.addEventListener("scroll", function () {
  var header = document.querySelector("nav");
  header.classList.toggle("menu-scroll", window.scrollY > 0);
});

// CARROSSEL PRODUTOS EM DESTAQUES
$('.carrossel').slick({
  prevArrow: '.slick-prev-one',
  nextArrow: '.slick-next-one',
  autoplay: true,
  autoplaySpeed: 4000,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      }
    },
    {
      breakpoint: 947,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 424,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
});

// ABRIR MODAL DE LOGIN
$('button').on('click', function () {
  $('#divId').show(); // aparece o div com o formulário
});

// SISTEMA LIGHT AND DARK
const chageThemeBtn = document.querySelector("#chenge-theme");

// Função para alternar entre os modos claro e escuro
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Carregar o tema salvo do usuário
function loadTheme() {
  const darkMode = localStorage.getItem("dark");
  if (darkMode) {
    toggleDarkMode();
  }
}

loadTheme();

chageThemeBtn.addEventListener("change", function () {
  toggleDarkMode();
  // Salvar ou remover o tema escuro
  localStorage.removeItem("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});

// ABRIR MODAL DE CONFIGURAÇÕES
function Mudarestado(el) {
  let display = document.getElementById(el).style.display;
  if (display == "none") {
    document.getElementById(el).style.display = 'block';
  } else {
    document.getElementById(el).style.display = 'none';
  }
}

feather.replace();

// ABRIR O MENU DO CARRINHO
function scrollCart() {
  // Abrir o menu do carrinho
  let cartItem = document.querySelector('.cardCarrinho-container');
  document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
  }
  // Se rolar a página, feche o carrinho
  window.onscroll = () => {
    cartItem.classList.remove('active');
  }
}
scrollCart();

// SISTEMA DE USUÁRIO LOGADO, MOSTRA O NOME DO USUÁRIO OU O ÍCONE DE LOGIN
function loggedinuser() {
  window.addEventListener('load', () => {
    let email = localStorage.getItem('userLogado');
    const userEmailDisplay = document.getElementById('user-email');

    if (email === null) {
      // Usuário não está logado, mostra ícone de login
      userEmailDisplay.innerHTML = `<div class="configs-menu"><a href="login-page.html"><i class="fa-solid fa-user"></i></a></div>`;
    } else {
      // Usuário logado, mostra nome ou ícone
      userEmailDisplay.innerHTML = `<div class="configs-menu"><p>Bem-vindo, ${email}</p><a href="login-page.html" onclick="sair()"><i class="fa-solid fa-sign-out-alt"></i> Sair</a></div>`;
    }
  });
}
loggedinuser();

// FUNÇÃO PARA SAIR DA CONTA
const sair = () => {
  localStorage.removeItem('userLogado');
  window.location.href = '/index.html'; // Redireciona para a página inicial
}

// SE O USUÁRIO ESTIVER LOGADO, MOSTRE A OPÇÃO DE SAIR
$(document).ready(() => {
  let texto = localStorage.getItem('userLogado') ? "<li onclick='sair()'><p> Sair </p></li>" : '';
  $('#li-sair').css({
    width: '100%',
    marginLeft: '10%'
  });
  $('#li-sair').html(texto);
});
