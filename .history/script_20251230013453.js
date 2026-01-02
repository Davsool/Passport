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
// 2. FLUXO DE CADASTRO E PERFIL
// ==================================================

// A. Tela de CADASTRO -> Vai para Perfil
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'perfil.html';
    });
}

// B. Tela de PERFIL: Seleção de Avatar e Salvar
const profileForm = document.querySelector('.profile-form');
const avatarOptions = document.querySelectorAll('.avatar-option');
const bigPreview = document.getElementById('fotoPreview');

// Variável para guardar qual imagem está escolhida (Começa com a op1 por padrão)
let avatarEscolhido = "src/op1.png"; 

// Lógica de Clicar nas Miniaturas (Opções de Avatar)
if (avatarOptions.length > 0) {
    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove a seleção das outras
            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            // Adiciona na clicada
            option.classList.add('selected');
            
            // Pega o caminho da imagem e atualiza
            const novoSrc = option.getAttribute('data-src');
            if (bigPreview) bigPreview.src = novoSrc;
            avatarEscolhido = novoSrc;
        });
    });
}

// Salvar e Continuar
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
        // (Se usarmos upload de arquivo, seria diferente, mas aqui usamos as opções pré-definidas)
        if (avatarEscolhido) {
            localStorage.setItem('usuarioFoto', avatarEscolhido);
        }

        // IMPORTANTE: Do Perfil vamos para a Home
        window.location.href = 'home.html';
    });
}


// ==================================================
// 3. CARREGAMENTO DE DADOS (HEADER)
// ==================================================
// Roda em qualquer tela que tenha o Header (Home, Brasil, etc)

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
        e.preventDefault(); // Evita comportamento de link se houver
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
                // Sucesso!
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

// Funções para abrir/fechar
function abrirDetalhe(idTela) {
    const tela = document.getElementById(idTela);
    if (tela) tela.classList.add('active');
}

function fecharDetalhe(idTela) {
    const tela = document.getElementById(idTela);
    if (tela) tela.classList.remove('active');
}

// Configura os 4 botões da grade
const botoesMenu = document.querySelectorAll('.menu-item');

// Verifica se existem pelo menos 4 botões na tela (Info, Pontos, Album, Culinaria)
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

if (audioRadio && btnMusic) {
    audioRadio.volume = 0.5; // Volume 50%
    
    // Começa visualmente pausado
    btnMusic.classList.add('music-muted');

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
        }
    });
}

// ==================================================
// 8. LÓGICA DO MENU DE USUÁRIO (Dropdown)
// ==================================================

// Seleciona a foto e o menu (o JS procura em qualquer tela)
const avatarContainer = document.querySelector('.avatar-display');
const userMenu = document.getElementById('userMenu');

if (avatarContainer && userMenu) {
    
    // Ao clicar na foto, alterna o menu
    avatarContainer.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique feche o menu imediatamente
        userMenu.classList.toggle('active');
    });

    // Ao clicar em qualquer outro lugar da tela, fecha o menu
    window.addEventListener('click', () => {
        if (userMenu.classList.contains('active')) {
            userMenu.classList.remove('active');
        }
    });
}

// Funções de Navegação do Menu
function irParaPerfil() {
    window.location.href = 'perfil.html';
}

function irParaHome() {
    window.location.href = 'home.html';
}

function sairDoApp() {
    // Opcional: Limpar dados ao sair? 
    // localStorage.clear(); 
    window.location.href = 'index.html';
}

