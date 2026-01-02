// ==================================================
// LOGICA: TELA DE LOGIN (index.html)
// ==================================================

const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar sozinha

        const loginInput = document.getElementById('login').value;
        const senhaInput = document.getElementById('senha').value;

        // --- DEFINA AQUI SEU LOGIN E SENHA CORRETOS ---
        const usuarioCorreto = "davi";
        const senhaCorreta = "25102002";

        if (loginInput === usuarioCorreto && senhaInput === senhaCorreta) {
            
            // Se o usuário não tiver nome salvo ainda, salvamos um padrão
            if (!localStorage.getItem('usuarioNome')) {
                localStorage.setItem('usuarioNome', 'Admin');
            }
            
            // Redireciona para a Home
            window.location.href = 'home.html';
            
        } else {
            // Se errou a senha
            alert('Login ou Senha incorretos!');
            
            // Limpa o campo de senha e foca nele
            document.getElementById('senha').value = '';
            document.getElementById('senha').focus();
        }
    });
}

// ==================================================
// 1. FUNÇÕES GERAIS (Relógio e Senha)
// ==================================================

// Lógica do Relógio (Fuso de Brasília)
function atualizarRelogio() {
    const elementoRelogio = document.getElementById('relogio');
    if (!elementoRelogio) return;
    
    const agora = new Date();
    const opcoes = { 
        timeZone: 'America/Sao_Paulo', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    elementoRelogio.textContent = agora.toLocaleTimeString('pt-BR', opcoes);
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();


// Lógica Mostrar/Esconder Senha (Login/Cadastro)
const btnToggle = document.getElementById('btnToggleSenha');
const inputSenha = document.getElementById('senha');

if (btnToggle && inputSenha) {
    btnToggle.addEventListener('click', () => {
        const tipoAtual = inputSenha.getAttribute('type');
        if (tipoAtual === 'password') {
            inputSenha.setAttribute('type', 'text');
            btnToggle.style.opacity = '1';
        } else {
            inputSenha.setAttribute('type', 'password');
            btnToggle.style.opacity = '0.6';
        }
    });
}


// ==================================================
// 2. FLUXO DE CADASTRO E PERFIL (COM GALERIA)
// ==================================================

// A. Tela de CADASTRO -> Vai para Perfil
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'perfil.html';
    });
}

// B. Tela de PERFIL: Lógica da Galeria
const profileForm = document.querySelector('.profile-form');
const bigPreview = document.getElementById('fotoPreview');
const modalAvatar = document.getElementById('modalAvatar');

// Variável global para guardar a escolha (Começa com op1.jpg)
let avatarEscolhido = "src/op1.jpg"; 

// --- Funções do Modal de Avatar ---

// 1. Abrir Modal
function abrirModalAvatar() {
    if(modalAvatar) {
        modalAvatar.style.display = 'flex';
    }
}

// 2. Fechar Modal
function fecharModalAvatar() {
    if(modalAvatar) {
        modalAvatar.style.display = 'none';
    }
}

// 3. Escolher Avatar (Chamado ao clicar num coração)
function escolherAvatarNaGaleria(caminhoDaFotoReal) {
    // Atualiza a variável
    avatarEscolhido = caminhoDaFotoReal;
    
    // Atualiza o preview grande na tela de perfil
    if (bigPreview) {
        bigPreview.src = avatarEscolhido;
    }
    
    // Fecha o modal
    fecharModalAvatar();
}

// Salvar e Continuar (Botão Continuar)
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Salva Nome
        const nomeUsuario = document.getElementById('nome').value;
        if(nomeUsuario && nomeUsuario.trim() !== "") {
            localStorage.setItem('usuarioNome', nomeUsuario);
        } else {
            localStorage.setItem('usuarioNome', 'VIAJANTE');
        }

        // Salva o caminho do Avatar Escolhido
        if (avatarEscolhido) {
            localStorage.setItem('usuarioFoto', avatarEscolhido);
        }

        // Vai para a Home
        window.location.href = 'home.html';
    });
}


// ==================================================
// 3. CARREGAMENTO DE DADOS (HEADER)
// ==================================================

const avatarDisplayImg = document.getElementById('userAvatarDisplay');
const saudacaoElemento = document.getElementById('saudacaoNome');
const defaultIcon = document.getElementById('defaultIcon');

if (avatarDisplayImg || saudacaoElemento) {
    // Carrega Nome
    const nomeSalvo = localStorage.getItem('usuarioNome');
    if (nomeSalvo && saudacaoElemento) {
        saudacaoElemento.textContent = `OLÁ, ${nomeSalvo.toUpperCase()}!`;
    }

    // Carrega Foto
    const fotoSalva = localStorage.getItem('usuarioFoto');
    if (fotoSalva && avatarDisplayImg) {
        avatarDisplayImg.src = fotoSalva;
        avatarDisplayImg.style.display = 'block';
        if (defaultIcon) defaultIcon.style.display = 'none';
    } else {
        if (avatarDisplayImg) avatarDisplayImg.style.display = 'none';
        if (defaultIcon) defaultIcon.style.display = 'flex';
    }
}


// ==================================================
// 4. LÓGICA DA HOME (MODAL E VALIDAÇÃO)
// ==================================================

const btnEntrarHome = document.querySelector('.btn-home');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const inputCodigo = document.getElementById('inputCodigo');
const btnValidar = document.getElementById('btnValidarCodigo');

if (btnEntrarHome && modalOverlay) {

    // Abrir Modal
    btnEntrarHome.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.style.display = 'flex';
        inputCodigo.value = '';
        setTimeout(() => inputCodigo.focus(), 100);
    });

    // Fechar Modal
    closeModal.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

    // Máscara numérica
    if (inputCodigo) {
        inputCodigo.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Validar Código -> Vai para BRASIL
    if (btnValidar) {
        btnValidar.addEventListener('click', () => {
            const codigoDigitado = inputCodigo.value;
            
            if (codigoDigitado === '151515') {
                window.location.href = 'brasil.html';
            } else {
                alert('Código incorreto! Tente 151515');
                inputCodigo.value = '';
                inputCodigo.focus();
            }
        });
    }
}


// ==================================================
// 5. LÓGICA DE DETALHES (TELAS DO BRASIL)
// ==================================================

function abrirDetalhe(idTela) {
    const tela = document.getElementById(idTela);
    if (tela) tela.classList.add('active');
}

function fecharDetalhe(idTela) {
    const tela = document.getElementById(idTela);
    if (tela) tela.classList.remove('active');
}

const botoesMenu = document.querySelectorAll('.menu-item');

if (botoesMenu.length >= 4) {
    botoesMenu[0].addEventListener('click', () => abrirDetalhe('screenInfo'));
    botoesMenu[1].addEventListener('click', () => abrirDetalhe('screenPontos'));
    botoesMenu[2].addEventListener('click', () => abrirDetalhe('screenAlbum'));
    botoesMenu[3].addEventListener('click', () => abrirDetalhe('screenCulinaria'));
}

// ==================================================
// 7. LÓGICA DO PLAYER DE RÁDIO (BRASIL)
// ==================================================

const audioRadio = document.getElementById('audioRadio');
const btnMusic = document.getElementById('btnMusic');
const musicIcon = document.getElementById('musicIcon'); // Imagem dentro do botão (se existir)

if (audioRadio && btnMusic) {
    audioRadio.volume = 0.5;
    
    // Estado inicial: Mudo
    btnMusic.classList.add('music-muted');
    btnMusic.classList.remove('music-playing');
    
    // Se tiver imagem dentro (<img>), define src inicial
    if(musicIcon) musicIcon.src = 'src/mute.png';

    btnMusic.addEventListener('click', () => {
        if (audioRadio.paused) {
            // TENTAR TOCAR
            const playPromise = audioRadio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Rádio tocando!");
                    btnMusic.classList.remove('music-muted');
                    btnMusic.classList.add('music-playing');
                    btnMusic.style.opacity = "1";
                    
                    if(musicIcon) musicIcon.src = 'src/volume.png'; // Troca img se existir
                    
                }).catch(error => {
                    console.error("Erro no áudio:", error);
                    alert("A rádio demorou para conectar ou foi bloqueada. Tente recarregar a página.");
                });
            }
        } else {
            // PAUSAR
            audioRadio.pause();
            btnMusic.classList.remove('music-playing');
            btnMusic.classList.add('music-muted');
            btnMusic.style.opacity = "0.6";
            
            if(musicIcon) musicIcon.src = 'src/mute.png'; // Troca img se existir
        }
    });
}

// ==================================================
// 8. LÓGICA DO MENU DE USUÁRIO (Dropdown)
// ==================================================

const avatarContainer = document.querySelector('.avatar-display');
const userMenu = document.getElementById('userMenu');

if (avatarContainer && userMenu) {
    
    // 1. Ao clicar na FOTO -> Alterna o menu
    avatarContainer.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique vá para a janela
        userMenu.classList.toggle('active');
    });

    // 2. Ao clicar NO MENU -> Não fecha
    userMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 3. Ao clicar FORA -> Fecha o menu
    window.addEventListener('click', () => {
        if (userMenu.classList.contains('active')) {
            userMenu.classList.remove('active');
        }
    });
}

function irParaPerfil() {
    window.location.href = 'perfil.html';
}

function irParaHome() {
    window.location.href = 'home.html';
}

function sairDoApp() {
    // Opcional: Limpar dados
    // localStorage.clear(); 
    window.location.href = 'index.html';
}