

console.log("script.js carregado com sucesso!");

document.addEventListener('DOMContentLoaded', function() {
    // Configuração dos sons
    const clickSound = new Audio('https://www.soundjay.com/button/button-09.mp3');
    const hoverSound = new Audio('https://www.soundjay.com/button/button-35.mp3');

    // Configuração do modal
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-button');

    const topicosAprendizagem = {
        'componentes': {
            titulo: '💻 Componentes do Computador',
            conteudo: `
                O computador é como um quebra-cabeça gigante, onde cada peça tem uma função especial:<br><br>

                🧠 Processador (CPU):<br>
                • É o cérebro do computador<br>
                • Faz todos os cálculos e decisões<br>
                • Quanto mais rápido, melhor o desempenho<br>
                • Exemplos: Intel Core i5, AMD Ryzen<br><br>

                📝 Memória RAM:<br>
                • É como uma mesa de trabalho<br>
                • Guarda as informações que estamos usando no momento<br>
                • Quanto mais RAM, mais programas podemos usar ao mesmo tempo<br>
                • Medida em GB (Gigabytes)<br><br>

                💾 Disco Rígido (HD/SSD):<br>
                • É como uma biblioteca gigante<br>
                • Guarda todos os arquivos, jogos e programas<br>
                • HD é mais lento mas tem mais espaço<br>
                • SSD é mais rápido mas geralmente menor<br><br>

                🔌 Placa-mãe:<br>
                • É como uma cidade onde todos os componentes moram<br>
                • Conecta todas as peças<br>
                • Controla como as peças se comunicam<br>
                • Tem vários conectores diferentes<br><br>

                🎮 Placa de Vídeo:<br>
                • Responsável por mostrar imagens e vídeos<br>
                • Muito importante para jogos<br>
                • Pode ser integrada ou dedicada<br>
                • Exemplos: NVIDIA GeForce, AMD Radeon<br><br>

                🔋 Fonte de Alimentação:<br>
                • É como o coração do computador<br>
                • Fornece energia para todas as peças<br>
                • Protege os componentes de problemas elétricos<br>
                • Diferentes potências para diferentes necessidades<br><br>

                💨 Coolers e Ventiladores:<br>
                • São como ventiladores que refrescam o computador<br>
                • Evitam que as peças esquentem demais<br>
                • Podem ter luzes coloridas (RGB)<br>
                • Muito importantes para o funcionamento seguro<br><br>

                🖥️ Gabinete:<br>
                • É a casa onde todos os componentes ficam<br>
                • Protege as peças<br>
                • Ajuda na circulação do ar<br>
                • Pode ter diferentes tamanhos e designs<br>
            `
        },
        'algoritmos': {
            titulo: '🔄 Algoritmos: O Passo a Passo da Programação',
            conteudo: `
                Algoritmos são como receitas de bolo para o computador! 🍰<br><br>

                O que é um Algoritmo:<br>
                • É uma sequência de passos para resolver um problema<br>
                • Deve ser claro e preciso<br>
                • Tem início, meio e fim<br>
                • Pode ser repetido várias vezes<br><br>

                Exemplos do Dia a Dia:<br>
                1. Fazer um Sanduíche:<br>
                   - Pegar duas fatias de pão<br>
                   - Passar manteiga<br>
                   - Adicionar queijo<br>
                   - Fechar o sanduíche<br><br>

                2. Escovar os Dentes:<br>
                   - Pegar escova<br>
                   - Colocar pasta<br>
                   - Escovar por 2 minutos<br>
                   - Enxaguar<br><br>

                Na Programação:<br>
                • Usamos algoritmos para tudo<br>
                • Podem ser simples ou complexos<br>
                • Precisam ser eficientes<br>
                • Podem ter decisões (if/else)<br>
                • Podem ter repetições (loops)<br><br>

                Dica: Comece com algoritmos simples e vá aumentando a complexidade!<br>
            `
        },
        'computador': {
            titulo: '🖥️ O que é um Computador: A Máquina Mágica',
            conteudo: `
                O Computador é uma máquina incrível que:<br><br>

                🔢 Processa Informações:<br>
                • Faz cálculos complexos em segundos<br>
                • Organiza dados de forma eficiente<br>
                • Executa milhões de operações por segundo<br>
                • Segue instruções precisas (programas)<br><br>

                📦 Armazenamento:<br>
                • Guarda fotos, vídeos e documentos<br>
                • Organiza arquivos em pastas<br>
                • Mantém informações mesmo desligado<br>
                • Tem diferentes tipos de memória<br><br>

                🎯 Tarefas que Realiza:<br>
                • Navegar na internet<br>
                • Jogar videogames<br>
                • Editar fotos e vídeos<br>
                • Escrever documentos<br>
                • Fazer videoconferências<br>
                • Programar novos softwares<br><br>

                🔍 Curiosidades:<br>
                • Os primeiros computadores ocupavam salas inteiras<br>
                • Hoje temos computadores no bolso (smartphones)<br>
                • Podem ser conectados entre si (internet)<br>
                • Existem supercomputadores que fazem previsão do tempo<br>
            `
        },
        'entrada-saida': {
            titulo: '🔄 Entrada e Saída de Dados: Como o Computador se Comunica',
            conteudo: `
                Como nos comunicamos com o computador? 🤔<br><br>

                📥 Dispositivos de Entrada:<br>
                1. Teclado:<br>
                    • Digite textos e comandos<br>
                    • Teclas de atalho<br>
                    • Diferentes layouts (QWERTY, AZERTY)<br><br>

                2. Mouse:<br>
                    • Controle o cursor<br>
                    • Cliques e rolagem<br>
                    • Mouse gamer com botões extras<br><br>

                3. Outros Dispositivos:<br>
                    • Microfone para voz<br>
                    • Webcam para imagens<br>
                    • Scanner para documentos<br>
                    • Joystick para jogos<br><br>

                📥 Dispositivos de Saída:<br>
                1. Monitor:<br>
                    • Mostra imagens e textos<br>
                    • Diferentes resoluções<br>
                    • Telas touch screen<br><br>

                2. Alto-falantes:<br>
                    • Reproduzem sons e música<br>
                    • Avisos do sistema<br>
                    • Áudio de jogos e vídeos<br><br>

                3. Impressora:<br>
                    • Imprime documentos<br>
                    • Fotos e imagens<br>
                    • Diferentes tecnologias (jato de tinta, laser)<br><br>

                💡 Dica: Quanto melhor a qualidade dos dispositivos de entrada e saída,<br>
                melhor será sua experiência com o computador!<br>
            `
        },
        'funcoes': {
            titulo: '📦 Funções',
            conteudo: `
                Funções são como mini-programas que fazem uma tarefa específica.<br><br>
                
                Exemplo:<br>
                function dizerOla(nome) {<br>
                    return "Olá, " + nome + "!";<br>
                }<br><br>
                
                É como uma máquina que recebe algo e devolve algo transformado!<br>
            `
        },
        'if-else': {
            titulo: '🔀 If/Else (Condições)',
            conteudo: `
                São decisões no código, como escolher um caminho:<br><br>
                
                Se (está chovendo) {<br>
                    Levar guarda-chuva<br>
                } Senão {<br>
                    Não levar guarda-chuva<br>
                }<br><br>
                
                Ajuda o programa a tomar decisões!<br>
            `
        },
        'oop': {
            titulo: '🎯 Orientação a Objetos',
            conteudo: `
                É uma forma de organizar o código pensando em "objetos" do mundo real.<br><br>
                
                Exemplo: Um cachorro<br>
                • Características (atributos): nome, cor, idade<br>
                • Ações (métodos): latir, correr, dormir<br><br>
                
                Ajuda a organizar programas grandes de forma mais fácil!<br>
            `
        }
    }; 

    // Conteúdo para cada botão
    const buttonContent = {
        'button-1': {
            title: '🎮 Modo Jogo',
            text: createGameInterface()
        },
        'button-4': {
            title: '❓ Centro de Ajuda',
            text: createHelpInterface()
        },
        'button-quiz': {
            title: '🎯 Quiz de Programação',
            text: createQuizInterface()
        }
    };

    function createTopicsList(topicos) {
        let html = '<div class="topics-list">';
        html += `
            <button class="close-topics-button" style="display: none;">
                ❌ Fechar Todos os Tópicos
            </button>
        `;
        for (let key in topicos) {
            html += `
                <div class="topic-button" data-topic="${key}">
                    <h3>${topicos[key].titulo}</h3>
                    <div class="topic-content" style="display: none;">
                        <p>${topicos[key].conteudo}</p>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    // Adiciona efeitos sonoros e visuais aos botões
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });

        button.addEventListener('click', (e) => {
            console.log("Botão clicado:", button.className); // Verifica qual botão foi clicado
            const buttonClasses = button.classList;
            let buttonKey = '';
            
            // Identificar qual botão foi clicado
            if (buttonClasses.contains('button-1')) buttonKey = 'button-1';
            else if (buttonClasses.contains('button-4')) buttonKey = 'button-4';
            else if (buttonClasses.contains('button-quiz')) buttonKey = 'button-quiz';

            if (buttonKey && buttonContent[buttonKey]) {
                const modal = document.getElementById('modal');
                const modalTitle = document.getElementById('modal-title');
                const modalText = document.getElementById('modal-text');

                modalTitle.textContent = buttonContent[buttonKey].title;
                modalText.innerHTML = buttonContent[buttonKey].text;
                modal.style.display = 'block';
            } else {
                console.error("Conteúdo do botão não encontrado:", buttonKey);
            }
        });
    });

    // Adiciona evento de clique para os tópicos
    document.addEventListener('click', function(e) {
        if (e.target.closest('.close-topics-button')) {
            // Fecha todos os tópicos
            document.querySelectorAll('.topic-content').forEach(content => {
                content.style.display = 'none';
            });
            document.querySelectorAll('.topic-button').forEach(button => {
                button.classList.remove('active');
            });
            // Esconde o botão de fechar
            e.target.style.display = 'none';
        } else if (e.target.closest('.topic-button')) {
            const topicButton = e.target.closest('.topic-button');
            const content = topicButton.querySelector('.topic-content');
            
            // Fecha outros tópicos abertos
            document.querySelectorAll('.topic-content').forEach(c => {
                if (c !== content) {
                    c.style.display = 'none';
                    c.parentElement.classList.remove('active');
                }
            });

            // Alterna o tópico clicado
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            topicButton.classList.toggle('active');
        }
    });

    // Fechar modal
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Adicionar após a declaração das variáveis iniciais
    const userSystem = {
        currentUser: null,
        
        async init() {
            const loginButton = document.createElement('button');
            loginButton.className = 'button button-login';
            loginButton.innerHTML = `
                <span class="icon">👤</span>
                ${this.currentUser ? 'Perfil' : 'Entrar'}
            `;
            
            document.querySelector('.button-container').prepend(loginButton);
            loginButton.addEventListener('click', () => this.showLoginModal());
            
            // Verificar login salvo
            const savedUserId = localStorage.getItem('currentUserId');
            if (savedUserId) {
                const userData = await db.getUser(savedUserId);
                if (userData) {
                    this.setCurrentUser(userData);
                }
            }
        },
        
        showLoginModal() {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalText = document.getElementById('modal-text');
            
            modalTitle.textContent = 'Login';
            modalText.innerHTML = `
                <div class="login-form">
                    <input type="email" id="login-email" placeholder="Email" required>
                    <input type="password" id="login-password" placeholder="Senha" required>
                    <button onclick="handleLogin()">Entrar</button>
                </div>
            `;
            
            modal.style.display = 'block';
        },
        
        async handleLogin() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                alert('Por favor, preencha todos os campos');
                return;
            }
            
            try {
                // Criar usuário (em um sistema real, você teria autenticação adequada)
                const userData = {
                    id: email,
                    email: email,
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };
                
                await db.saveUser(userData);
                this.setCurrentUser(userData);
                localStorage.setItem('currentUserId', userData.id);
                
                document.getElementById('modal').style.display = 'none';
                alert('Login realizado com sucesso!');
            } catch (error) {
                console.error('Erro no login:', error);
                alert('Erro ao fazer login. Tente novamente.');
            }
        },
        
        setCurrentUser(user) {
            this.currentUser = user;
            const loginButton = document.querySelector('.button-login');
            if (loginButton) {
                loginButton.innerHTML = `
                    <span class="icon">👤</span>
                    ${user.email}
                `;
            }
        }
    };

    // Inicializar o sistema de usuários
    document.addEventListener('DOMContentLoaded', () => {
        userSystem.init().catch(console.error);
    });

    // Adicionar após o sistema de conquistas
    const progressSystem = {
        saveProgress(topicKey) {
            if (!userSystem.currentUser) return;
            
            const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
            if (!progress[userSystem.currentUser]) {
                progress[userSystem.currentUser] = {
                    completedTopics: [],
                    quizScores: [],
                    lastActivity: new Date().toISOString()
                };
            }
            
            if (!progress[userSystem.currentUser].completedTopics.includes(topicKey)) {
                progress[userSystem.currentUser].completedTopics.push(topicKey);
            }
            
            localStorage.setItem('userProgress', JSON.stringify(progress));
            this.updateProgressDisplay();
        },
        
        updateProgressDisplay() {
            if (!userSystem.currentUser) return;
            
            const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
            const userProgress = progress[userSystem.currentUser];
            
            if (userProgress) {
                const progressPercentage = (userProgress.completedTopics.length / Object.keys(topicosAprendizagem).length) * 100;
                
                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.innerHTML = `
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                    <span class="progress-text">${Math.round(progressPercentage)}% Completo</span>
                `;
                
                document.querySelector('.container').insertBefore(
                    progressBar,
                    document.querySelector('.button-container')
                );
            }
        }
    };
});

function createGameInterface() {
    return `
        <div class="game-container">
            <div class="blocks-container">
                <h3>Blocos de Comando</h3>
                <div class="command-blocks">
                    <div class="block" draggable="true" data-command="moveRight">➡️ Mover Direita</div>
                    <div class="block" draggable="true" data-command="moveLeft">⬅️ Mover Esquerda</div>
                    <div class="block" draggable="true" data-command="moveUp">⬆️ Mover Cima</div>
                    <div class="block" draggable="true" data-command="moveDown">⬇️ Mover Baixo</div>
                    <div class="block" draggable="true" data-command="jump">🦘 Pular</div>
                    <div class="block" draggable="true" data-command="rotate">🔄 Girar</div>
                    <div class="block" draggable="true" data-command="repeat">🔄 Repetir 3x</div>
                </div>
            </div>
            
            <div class="program-area">
                <h3>Seu Programa</h3>
                <div class="program-blocks" id="program-blocks"></div>
                <div class="program-controls">
                    <button class="run-button">▶️ Executar</button>
                    <button class="clear-button">🗑️ Limpar</button>
                </div>
            </div>
            
            <div class="game-preview">
                <h3>Visualização</h3>
                <div class="game-stage">
                    <div class="character">🤖</div>
                </div>
            </div>
        </div>
    `;
}

// Adicionar eventos de jogo quando o modal for aberto
document.addEventListener('click', function(e) {
    if (e.target.closest('.button-1')) {
        setTimeout(initializeGame, 100);
    }
});

function initializeGame() {
    const blocks = document.querySelectorAll('.block');
    const programArea = document.querySelector('.program-blocks');
    const runButton = document.querySelector('.run-button');
    const clearButton = document.querySelector('.clear-button');
    const character = document.querySelector('.character');

    // Configurar drag and drop
    blocks.forEach(block => {
        block.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', block.dataset.command);
            block.classList.add('dragging');
        });

        block.addEventListener('dragend', () => {
            block.classList.remove('dragging');
        });
    });

    programArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    programArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const command = e.dataTransfer.getData('text/plain');
        const newBlock = createProgramBlock(command);
        programArea.appendChild(newBlock);
    });

    // Executar programa
    runButton.addEventListener('click', async () => {
        const commands = Array.from(programArea.children).map(block => block.dataset.command);
        runButton.disabled = true;
        await executeCommands(commands, character);
        runButton.disabled = false;
    });

    // Limpar programa
    clearButton.addEventListener('click', () => {
        programArea.innerHTML = '';
        resetCharacter(character);
    });
}

function createProgramBlock(command) {
    const block = document.createElement('div');
    block.className = 'program-block';
    block.dataset.command = command;
    block.innerHTML = document.querySelector(`[data-command="${command}"]`).innerHTML;
    return block;
}

async function executeCommands(commands, character) {
    resetCharacter(character);
    
    for (const command of commands) {
        await executeCommand(command, character);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

function resetCharacter(character) {
    character.style.transform = 'translate(0, 0) rotate(0deg)';
}

async function executeCommand(command, character) {
    // Tocar o som do comando
    if (commandSounds[command]) {
        commandSounds[command].currentTime = 0; // Reinicia o som
        commandSounds[command].play();
    }

    const currentTransform = getComputedStyle(character).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentX = matrix.m41;
    const currentY = matrix.m42;
    const currentRotation = Math.atan2(matrix.m12, matrix.m11) * (180/Math.PI);

    switch (command) {
        case 'moveRight':
            character.style.transform = `translate(${currentX + 50}px, ${currentY}px) rotate(${currentRotation}deg)`;
            break;
        case 'moveLeft':
            character.style.transform = `translate(${currentX - 50}px, ${currentY}px) rotate(${currentRotation}deg)`;
            break;
        case 'moveUp':
            character.style.transform = `translate(${currentX}px, ${currentY - 50}px) rotate(${currentRotation}deg)`;
            break;
        case 'moveDown':
            character.style.transform = `translate(${currentX}px, ${currentY + 50}px) rotate(${currentRotation}deg)`;
            break;
        case 'jump':
            character.style.transform = `translate(${currentX}px, ${currentY - 50}px) rotate(${currentRotation}deg)`;
            await new Promise(resolve => setTimeout(resolve, 250));
            character.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg)`;
            break;
        case 'rotate':
            character.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation + 90}deg)`;
            break;
        case 'repeat':
            for (let i = 0; i < 3; i++) {
                character.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation + 120 * i}deg)`;
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            break;
        case 'wait':
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;
        case 'dance':
            for (let i = 0; i < 4; i++) {
                character.style.transform = `translate(${currentX + (i % 2 ? 20 : -20)}px, ${currentY}px) rotate(${currentRotation + 45 * i}deg)`;
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            character.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg)`;
            break;
        case 'wave':
            character.innerHTML = '👋';
            await new Promise(resolve => setTimeout(resolve, 500));
            character.innerHTML = '🤖';
            break;
        case 'spin':
            character.style.transition = 'transform 1s';
            character.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation + 360}deg)`;
            await new Promise(resolve => setTimeout(resolve, 1000));
            character.style.transition = 'transform 0.5s';
            break;
        case 'shrink':
            character.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg) scale(0.5)`;
            break;
        case 'grow':
            character.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg) scale(1.5)`;
            break;
    }
}

const quizQuestions = [
    {
        pergunta: "Qual componente é considerado o 'cérebro' do computador?",
        opcoes: [
            "Memória RAM",
            "Processador (CPU)",
            "Disco Rígido",
            "Placa de Vídeo"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é um algoritmo?",
        opcoes: [
            "Um tipo de vírus de computador",
            "Uma linguagem de programação",
            "Uma sequência de passos para resolver um problema",
            "Um componente do hardware"
        ],
        resposta: 2
    },
    {
        pergunta: "Qual é um exemplo de dispositivo de entrada?",
        opcoes: [
            "Monitor",
            "Impressora",
            "Alto-falante",
            "Teclado"
        ],
        resposta: 3
    },
    {
        pergunta: "Para que serve uma função em programação?",
        opcoes: [
            "Para deixar o código mais bonito",
            "Para realizar uma tarefa específica e reutilizável",
            "Para criar vírus",
            "Para formatar o computador"
        ],
        resposta: 1
    },
    {
        pergunta: "Em programação, o que faz a estrutura IF/ELSE?",
        opcoes: [
            "Toma decisões baseadas em condições",
            "Apenas repete código",
            "Formata textos",
            "Cria loops infinitos"
        ],
        resposta: 0
    },
    {
        pergunta: "O que é Orientação a Objetos?",
        opcoes: [
            "Uma forma de organizar arquivos no computador",
            "Um tipo de vírus",
            "Uma forma de organizar o código usando objetos do mundo real",
            "Um programa de edição de imagens"
        ],
        resposta: 2
    },
    {
        pergunta: "Para que serve a Memória RAM?",
        opcoes: [
            "Para guardar arquivos permanentemente",
            "Para armazenar dados temporários em uso",
            "Para conectar à internet",
            "Para mostrar imagens na tela"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é um dispositivo de saída?",
        opcoes: [
            "Mouse",
            "Teclado",
            "Microfone",
            "Monitor"
        ],
        resposta: 3
    },
    {
        pergunta: "O que é um loop em programação?",
        opcoes: [
            "Uma forma de repetir código várias vezes",
            "Um erro no programa",
            "Uma forma de salvar dados",
            "Um tipo de variável"
        ],
        resposta: 0
    },
    {
        pergunta: "Qual é a função principal da memória RAM?",
        opcoes: [
            "Armazenar dados permanentemente",
            "Processar cálculos",
            "Armazenar dados temporários durante a execução",
            "Conectar à internet"
        ],
        resposta: 2
    },
    {
        pergunta: "O que significa HTML?",
        opcoes: [
            "High Tech Modern Language",
            "Hyper Text Markup Language",
            "Hard Text Memory Link",
            "Hyper Transfer Machine Language"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é um bug em programação?",
        opcoes: [
            "Um vírus de computador",
            "Um novo recurso",
            "Um erro ou falha no programa",
            "Uma linguagem de programação"
        ],
        resposta: 2
    },
    {
        pergunta: "Para que serve o CSS?",
        opcoes: [
            "Criar animações 3D",
            "Estilizar e formatar páginas web",
            "Processar dados do servidor",
            "Criar bancos de dados"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é uma variável em programação?",
        opcoes: [
            "Um erro no código",
            "Um espaço para armazenar dados",
            "Um tipo de vírus",
            "Uma página da web"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é um array?",
        opcoes: [
            "Um tipo de erro",
            "Uma função matemática",
            "Uma lista ordenada de elementos",
            "Um dispositivo de entrada"
        ],
        resposta: 2
    },
    {
        pergunta: "O que significa 'debuggar' um programa?",
        opcoes: [
            "Criar um novo programa",
            "Encontrar e corrigir erros",
            "Deletar o programa",
            "Adicionar novos recursos"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é um servidor?",
        opcoes: [
            "Um tipo de computador que fornece serviços a outros computadores",
            "Um programa antivírus",
            "Um tipo de teclado",
            "Uma linguagem de programação"
        ],
        resposta: 0
    },
    {
        pergunta: "O que é um banco de dados?",
        opcoes: [
            "Um programa de edição de texto",
            "Uma coleção organizada de informações",
            "Um tipo de vírus",
            "Um dispositivo de hardware"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é um algoritmo de busca?",
        opcoes: [
            "Um programa de antivírus",
            "Uma forma de organizar arquivos",
            "Um método para encontrar informações específicas",
            "Um tipo de hardware"
        ],
        resposta: 2
    },
    {
        pergunta: "O que é programação orientada a objetos?",
        opcoes: [
            "Um tipo de vírus",
            "Uma forma de organizar código usando objetos",
            "Um método de digitar mais rápido",
            "Um tipo de hardware"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é uma API?",
        opcoes: [
            "Um tipo de computador",
            "Um programa de edição de imagens",
            "Uma interface para comunicação entre programas",
            "Um tipo de cabo"
        ],
        resposta: 2
    },
    {
        pergunta: "O que é um firewall?",
        opcoes: [
            "Um programa que protege contra ameaças de rede",
            "Um tipo de processador",
            "Uma linguagem de programação",
            "Um editor de texto"
        ],
        resposta: 0
    },
    {
        pergunta: "O que é o Git?",
        opcoes: [
            "Uma linguagem de programação",
            "Um sistema de controle de versão",
            "Um tipo de banco de dados",
            "Um programa de edição de imagens"
        ],
        resposta: 1
    },
    {
        pergunta: "O que é um compilador?",
        opcoes: [
            "Um programa que traduz código para linguagem de máquina",
            "Um tipo de memória",
            "Um dispositivo de entrada",
            "Uma rede social"
        ],
        resposta: 0
    }
];

function createQuizInterface() {
    return `
        <div class="quiz-container">
            <div class="quiz-header">
                <h2>Quiz de Programação</h2>
                <p class="quiz-score">Pontuação: <span id="score">0</span> de <span id="total">0</span></p>
            </div>
            <div class="quiz-content">
                <div id="question-container">
                    <p class="question-text"></p>
                    <div class="options-container"></div>
                </div>
                <div class="quiz-controls">
                    <button id="start-quiz" class="quiz-button">Começar Quiz</button>
                    <button id="next-question" class="quiz-button" style="display: none;">Próxima Pergunta</button>
                </div>
            </div>
            <div id="quiz-results" style="display: none;">
                <h3>Quiz Finalizado!</h3>
                <p>Sua pontuação final: <span id="final-score">0</span></p>
                <button id="restart-quiz" class="quiz-button">Tentar Novamente</button>
            </div>
        </div>
    `;
}

function initializeQuiz() {
    let currentQuestion = 0;
    let score = 0;
    let questions = [...quizQuestions].sort(() => Math.random() - 0.5);

    const startButton = document.getElementById('start-quiz');
    const nextButton = document.getElementById('next-question');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.querySelector('.options-container');
    const quizResults = document.getElementById('quiz-results');
    const scoreElement = document.getElementById('score');
    const totalElement = document.getElementById('total');
    const finalScoreElement = document.getElementById('final-score');

    totalElement.textContent = questions.length;
    scoreElement.textContent = '0';

    function showQuestion(question) {
        const questionText = questionContainer.querySelector('.question-text');
        questionText.textContent = question.pergunta;
        optionsContainer.innerHTML = '';
        
        question.opcoes.forEach((opcao, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = opcao;
            
            // Adicionar evento de clique para cada opção
            button.addEventListener('click', () => {
                selectAnswer(index);
                // Desabilitar todos os botões após uma escolha
                optionsContainer.querySelectorAll('.option-button').forEach(btn => {
                    btn.disabled = true;
                });
            });
            
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedIndex) {
        const buttons = optionsContainer.querySelectorAll('.option-button');
        const correctIndex = questions[currentQuestion].resposta;

        // Mostrar resposta correta e incorreta
        buttons[correctIndex].classList.add('correct');
        
        if (selectedIndex === correctIndex) {
            score++;
            scoreElement.textContent = score;
        } else {
            buttons[selectedIndex].classList.add('wrong');
        }

        nextButton.style.display = 'block';
    }

    function showResults() {
        questionContainer.style.display = 'none';
        nextButton.style.display = 'none';
        quizResults.style.display = 'block';
        
        // Atualizar pontuação final
        finalScoreElement.textContent = `${score} de ${questions.length}`;
        
        // Atualizar estatísticas e conquistas
        const stats = updateUserStats(score);
        const unlockedAchievements = checkAchievements(stats);
        
        // Atualizar interface de resultados
        quizResults.innerHTML = `
            <div class="quiz-complete">
                <h3>Quiz Finalizado! 🎉</h3>
                <p class="final-score">Sua pontuação: ${score} de ${questions.length}</p>
                
                <div class="stats-update">
                    <h4>Suas Estatísticas:</h4>
                    <p>Total de Pontos: ${stats.totalPoints}</p>
                    <p>Quizzes Completados: ${stats.quizzesCompleted}</p>
                    <p>Melhor Pontuação: ${stats.bestScore}</p>
                </div>

                ${unlockedAchievements.length > 0 ? `
                    <div class="new-achievements">
                        <h4>🏆 Novas Conquistas Desbloqueadas!</h4>
                        ${unlockedAchievements.map(key => `
                            <div class="achievement-notification">
                                <span class="achievement-icon">${achievements[key].title}</span>
                                <p>${achievements[key].description}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <div class="quiz-controls">
                    <button id="restart-quiz" class="quiz-button">Tentar Novamente</button>
                    <button id="view-achievements" class="quiz-button">Ver Todas as Conquistas</button>
                </div>
            </div>
        `;

        // Adicionar eventos aos novos botões
        document.getElementById('restart-quiz').addEventListener('click', restartQuiz);
        document.getElementById('view-achievements').addEventListener('click', showAchievements);
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        questions = [...quizQuestions].sort(() => Math.random() - 0.5);
        scoreElement.textContent = '0';
        questionContainer.style.display = 'block';
        quizResults.style.display = 'none';
        showQuestion(questions[currentQuestion]);
    }

    function showAchievements() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalText = document.getElementById('modal-text');
        
        modalTitle.textContent = '🌟 Suas Conquistas';
        modalText.innerHTML = createAchievementsInterface();
    }

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        showQuestion(questions[currentQuestion]);
    });

    nextButton.addEventListener('click', () => {
        currentQuestion++;
        nextButton.style.display = 'none';

        if (currentQuestion < questions.length) {
            showQuestion(questions[currentQuestion]);
        } else {
            showResults();
        }
    });

    document.getElementById('restart-quiz')?.addEventListener('click', () => {
        // Reiniciar o quiz
        currentQuestion = 0;
        score = 0;
        questions = [...quizQuestions].sort(() => Math.random() - 0.5);
        scoreElement.textContent = '0';
        questionContainer.style.display = 'block';
        quizResults.style.display = 'none';
        startButton.style.display = 'block';
        
        // Limpar quaisquer notificações de conquistas anteriores
        const achievementsUpdate = quizResults.querySelector('.achievements-update');
        if (achievementsUpdate) {
            achievementsUpdate.remove();
        }
    });
}

// Função atualizada para gerenciar estatísticas
function updateUserStats(quizScore) {
    let stats = getUserStats();
    
    // Atualizar estatísticas
    stats.quizzesCompleted = (stats.quizzesCompleted || 0) + 1;
    stats.totalPoints = (stats.totalPoints || 0) + quizScore;
    stats.bestScore = Math.max((stats.bestScore || 0), quizScore);
    
    // Atualizar histórico
    if (!stats.quizHistory) stats.quizHistory = [];
    stats.quizHistory.push({
        date: new Date().toISOString(),
        score: quizScore
    });
    
    // Salvar no localStorage
    localStorage.setItem('userStats', JSON.stringify(stats));
    
    // Atualizar interface de conquistas em tempo real
    updateAchievementsDisplay(stats);
    
    return stats;
}

// Nova função para atualizar display de conquistas
function updateAchievementsDisplay(stats) {
    const achievementsContainer = document.querySelector('.achievements-container');
    if (achievementsContainer) {
        achievementsContainer.innerHTML = createAchievementsInterface();
    }

    // Atualizar o botão de conquistas se estiver visível
    const achievementsButton = document.querySelector('.button-3');
    if (achievementsButton) {
        const tooltip = achievementsButton.getAttribute('data-tooltip');
        achievementsButton.setAttribute('data-tooltip', 
            `${tooltip} (${stats.totalPoints} pontos)`);
    }
}

// Função para verificar conquistas com notificações
function checkAchievements(stats) {
    const previousAchievements = localStorage.getItem('unlockedAchievements') 
        ? JSON.parse(localStorage.getItem('unlockedAchievements')) 
        : [];
    
    const currentAchievements = [];
    
    // Verificar cada conquista
    if (stats.quizzesCompleted >= 1) currentAchievements.push('beginner');
    if (stats.bestScore >= 5) currentAchievements.push('intermediate');
    if (stats.bestScore >= 7) currentAchievements.push('expert');
    if (stats.totalPoints >= 20) currentAchievements.push('master');
    
    // Salvar conquistas atuais
    localStorage.setItem('unlockedAchievements', JSON.stringify(currentAchievements));
    
    // Retornar apenas as novas conquistas
    return currentAchievements.filter(achievement => 
        !previousAchievements.includes(achievement));
}

// Adicionar evento para atualização automática quando o modal for aberto
document.querySelector('.button-3').addEventListener('click', function() {
    setTimeout(() => {
        const stats = getUserStats();
        updateAchievementsDisplay(stats);
    }, 100);
});

// Adicionar sistema de conquistas
const achievements = {
    beginner: {
        title: "🌱 Iniciante",
        requirement: 1,
        description: "Completou seu primeiro quiz!"
    },
    intermediate: {
        title: "⭐ Intermediário",
        requirement: 5,
        description: "Acertou 5 questões em um único quiz!"
    },
    expert: {
        title: "🏆 Especialista",
        requirement: 7,
        description: "Acertou 7 ou mais questões em um único quiz!"
    },
    master: {
        title: "👑 Mestre",
        requirement: 20,
        description: "Acumulou 20 pontos no total!"
    }
};

// Atualizar o buttonContent para o botão de Conquistas
buttonContent['button-3'] = {
    title: '🌟 Suas Conquistas',
    text: createAchievementsInterface()
};

function createAchievementsInterface() {
    const userStats = getUserStats();
    const unlockedAchievements = checkAchievements(userStats);
    
    return `
        <div class="achievements-container">
            <div class="stats-summary">
                <h3>Suas Estatísticas</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Total de Pontos:</span>
                        <span class="stat-value">${userStats.totalPoints}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Quizzes Completados:</span>
                        <span class="stat-value">${userStats.quizzesCompleted}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Melhor Pontuação:</span>
                        <span class="stat-value">${userStats.bestScore}</span>
                    </div>
                </div>
            </div>

            <h3>Suas Conquistas</h3>
            <div class="achievements-grid">
                ${Object.entries(achievements).map(([key, achievement]) => `
                    <div class="achievement-card ${unlockedAchievements.includes(key) ? 'unlocked' : 'locked'}">
                        <div class="achievement-icon">${achievement.title}</div>
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                        ${unlockedAchievements.includes(key) 
                            ? '<span class="achievement-unlocked">✅ Desbloqueado!</span>' 
                            : '<span class="achievement-locked"> Bloqueado</span>'}
                    </div>
                `).join('')}
            </div>

            <div class="quiz-history">
                <h3>Histórico de Quizzes</h3>
                ${userStats.quizHistory && userStats.quizHistory.length > 0 ? `
                    <div class="history-list">
                        ${userStats.quizHistory.map((entry, index) => `
                            <div class="history-entry">
                                <span>Quiz #${index + 1}</span>
                                <span>Pontuação: ${entry.score}</span>
                                <span>${new Date(entry.date).toLocaleDateString()}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p>Nenhum quiz completado ainda.</p>'}
            </div>
        </div>
    `;
}

// Função para obter estatísticas do usuário
function getUserStats() {
    const stats = localStorage.getItem('userStats');
    if (stats) {
        return JSON.parse(stats);
    }
    return {
        totalPoints: 0,
        quizzesCompleted: 0,
        bestScore: 0,
        quizHistory: []
    };
}

// Modificar a função showResults do quiz para atualizar conquistas
function showResults(score, totalQuestions) {
    const stats = updateUserStats(score);
    const unlockedAchievements = checkAchievements(stats);
    
    // Atualizar o modal com os resultados
    const resultsContainer = document.getElementById('quiz-results');
    resultsContainer.innerHTML = `
        <div class="quiz-results">
            <h3>Quiz Finalizado!</h3>
            <p class="final-score">Sua pontuação: ${score} de ${totalQuestions}</p>
            
            ${unlockedAchievements.length > 0 ? `
                <div class="new-achievements">
                    <h4>🎉 Novas Conquistas!</h4>
                    ${unlockedAchievements.map(key => `
                        <div class="achievement-notification">
                            <span class="achievement-icon">${achievements[key].title}</span>
                            <span class="achievement-desc">${achievements[key].description}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="quiz-buttons">
                <button id="restart-quiz" class="quiz-button">Tentar Novamente</button>
                <button id="view-achievements" class="quiz-button">Ver Conquistas</button>
            </div>
        </div>
    `;
}

// Adicionar evento para o botão de ver conquistas
document.addEventListener('click', function(e) {
    if (e.target.id === 'view-achievements') {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalText = document.getElementById('modal-text');
        
        modalTitle.textContent = '🌟 Suas Conquistas';
        modalText.innerHTML = createAchievementsInterface();
    }
});

// Adicionar conteúdo de ajuda ao buttonContent
buttonContent['button-4'] = {
    title: '❓ Centro de Ajuda',
    text: createHelpInterface()
};

function createHelpInterface() {
    return `
        <div class="help-container">
            <div class="help-section">
                <h3>🎮 Como Usar o Modo Jogo</h3>
                <div class="help-content">
                    <p>1. Arraste os blocos de comando para a área de programação</p>
                    <p>2. Organize os blocos na ordem desejada</p>
                    <p>3. Clique em "Executar" para ver o resultado</p>
                    <p>4. Use "Limpar" para recomeçar</p>
                </div>
            </div>

            <div class="help-section">
                <h3>📚 Como Estudar</h3>
                <div class="help-content">
                    <p>1. Acesse o botão "Aprender" para ver todos os tópicos</p>
                    <p>2. Clique em cada tópico para expandir o conteúdo</p>
                    <p>3. Estude o material na ordem apresentada</p>
                    <p>4. Faça anotações dos pontos importantes</p>
                </div>
            </div>

            <div class="help-section">
                <h3>🎯 Como Jogar o Quiz</h3>
                <div class="help-content">
                    <p>1. Clique no botão "Quiz" para começar</p>
                    <p>2. Leia cada pergunta com atenção</p>
                    <p>3. Escolha a resposta que achar correta</p>
                    <p>4. Veja seu resultado ao final</p>
                </div>
            </div>

            <div class="help-section">
                <h3>🌟 Sistema de Conquistas</h3>
                <div class="help-content">
                    <p>• Iniciante: Complete seu primeiro quiz</p>
                    <p>• Intermediário: Acerte 5 questões em um quiz</p>
                    <p>• Especialista: Acerte 7 questões em um quiz</p>
                    <p>• Mestre: Acumule 20 pontos no total</p>
                </div>
            </div>

            <div class="help-section">
                <h3>❓ Perguntas Frequentes</h3>
                <div class="help-accordion">
                    ${createFAQAccordion()}
                </div>
            </div>

            <div class="help-section">
                <h3>📞 Precisa de Mais Ajuda?</h3>
                <div class="help-contact">
                    <button class="contact-button" onclick="showContactForm()">
                        Enviar Mensagem
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createFAQAccordion() {
    const faqs = [
        {
            question: "Como salvo meu progresso?",
            answer: "Seu progresso é salvo automaticamente no navegador. Não precisa fazer nada!"
        },
        {
            question: "Posso refazer os quizzes?",
            answer: "Sim! Você pode refazer os quizzes quantas vezes quiser para melhorar sua pontuação."
        },
        {
            question: "Como ganho conquistas?",
            answer: "Complete quizzes e alcance boas pontuações. Cada conquista tem seus próprios requisitos."
        },
        {
            question: "Perdi minhas conquistas, o que faço?",
            answer: "Suas conquistas ficam salvas no navegador. Se foram perdidas, pode ser necessário limpar o cache."
        }
    ];

    return faqs.map((faq, index) => `
        <div class="faq-item" onclick="toggleFAQ(${index})">
            <div class="faq-question">
                ${faq.question}
                <span class="faq-icon">▼</span>
            </div>
            <div class="faq-answer" id="faq-${index}">
                ${faq.answer}
            </div>
        </div>
    `).join('');
}

function showContactForm() {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <span class="close-button">&times;</span>
        <h2>📨 Envie sua Mensagem</h2>
        <div class="contact-form">
            <input type="text" id="contact-name" placeholder="Seu nome" class="contact-input">
            <input type="email" id="contact-email" placeholder="Seu email" class="contact-input">
            <textarea id="contact-message" placeholder="Sua mensagem" class="contact-input"></textarea>
            <button onclick="sendMessage()" class="contact-submit">Enviar</button>
        </div>
    `;
}

function sendMessage() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (name && email && message) {
        alert('Mensagem enviada com sucesso! Responderemos em breve.');
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function toggleFAQ(index) {
    const answer = document.getElementById(`faq-${index}`);
    const icon = answer.parentElement.querySelector('.faq-icon');
    
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.style.transform = 'rotate(180deg)';
    }
}

// Adicionar ao evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...

    // Adicionar evento para o formulário de contato
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-button')) {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        }
    });
});

// Atualizar o quizSystem
const quizSystem = {
    // ... existing quiz code ...

    async saveQuizResult(score) {
        if (!userSystem.currentUser) return;
        
        try {
            await db.saveScore(userSystem.currentUser.id, score);
            const stats = await this.updateUserStats(score);
            const unlockedAchievements = await achievementSystem.checkAchievements(stats);
            
            for (const achievement of unlockedAchievements) {
                await achievementSystem.unlockAchievement(achievement);
            }
        } catch (error) {
            console.error('Erro ao salvar resultado do quiz:', error);
        }
    }
};

// Inicializar o sistema quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    userSystem.init().catch(console.error);
});

// Função para salvar progresso do quiz
async function saveQuizResult(score) {
    if (!userSystem.currentUser) {
        console.log('Usuário não está logado');
        return;
    }

    try {
        // Salvar pontuação
        await db.saveScore(userSystem.currentUser.id, score);
        
        // Atualizar progresso
        const progress = {
            lastQuizScore: score,
            totalQuizzes: (await db.getProgress(userSystem.currentUser.id))?.totalQuizzes || 0 + 1,
            lastPlayed: new Date().toISOString()
        };
        
        await db.saveProgress(userSystem.currentUser.id, progress);
        
        console.log('Resultado do quiz salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar resultado do quiz:', error);
    }
}

// Função para salvar progresso do jogo
async function saveGameProgress(gameData) {
    if (!userSystem.currentUser) {
        console.log('Usuário não está logado');
        return;
    }

    try {
        const progress = {
            lastGameState: gameData,
            lastPlayed: new Date().toISOString()
        };
        
        await db.saveProgress(userSystem.currentUser.id, progress);
        console.log('Progresso do jogo salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar progresso do jogo:', error);
    }
}

// Função para salvar conquistas
async function saveAchievement(achievementId) {
    if (!userSystem.currentUser) {
        console.log('Usuário não está logado');
        return;
    }

    try {
        const achievement = {
            id: achievementId,
            name: achievements[achievementId].title,
            description: achievements[achievementId].description,
            unlockedAt: new Date().toISOString()
        };
        
        await db.saveAchievement(userSystem.currentUser.id, achievement);
        console.log('Conquista salva com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar conquista:', error);
    }
}

// Atualizar o sistema de usuário
const userSystem = {
    currentUser: null,
    
    async init() {
        const loginButton = document.createElement('button');
        loginButton.className = 'button button-login';
        loginButton.innerHTML = `
            <span class="icon">👤</span>
            ${this.currentUser ? 'Perfil' : 'Entrar'}
        `;
        
        document.querySelector('.button-container').prepend(loginButton);
        loginButton.addEventListener('click', () => this.showLoginModal());
        
        // Verificar login salvo
        const savedUserId = localStorage.getItem('currentUserId');
        if (savedUserId) {
            const userData = await db.getUser(savedUserId);
            if (userData) {
                this.setCurrentUser(userData);
            }
        }
    },
    
    showLoginModal() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalText = document.getElementById('modal-text');
        
        modalTitle.textContent = 'Login';
        modalText.innerHTML = `
            <div class="login-form">
                <input type="email" id="login-email" placeholder="Email" required>
                <input type="password" id="login-password" placeholder="Senha" required>
                <button onclick="handleLogin()">Entrar</button>
            </div>
        `;
        
        modal.style.display = 'block';
    },
    
    async handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            alert('Por favor, preencha todos os campos');
            return;
        }
        
        try {
            // Criar usuário (em um sistema real, você teria autenticação adequada)
            const userData = {
                id: email,
                email: email,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            await db.saveUser(userData);
            this.setCurrentUser(userData);
            localStorage.setItem('currentUserId', userData.id);
            
            document.getElementById('modal').style.display = 'none';
            alert('Login realizado com sucesso!');
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Erro ao fazer login. Tente novamente.');
        }
    },
    
    setCurrentUser(user) {
        this.currentUser = user;
        const loginButton = document.querySelector('.button-login');
        if (loginButton) {
            loginButton.innerHTML = `
                <span class="icon">👤</span>
                ${user.email}
            `;
        }
    }
};

// Atualizar o sistema de quiz
function showQuizResults(score, totalQuestions) {
    saveQuizResult(score).then(() => {
        const resultsContainer = document.getElementById('quiz-results');
        resultsContainer.innerHTML = `
            <h3>Quiz Finalizado!</h3>
            <p>Sua pontuação: ${score} de ${totalQuestions}</p>
            <button onclick="restartQuiz()">Tentar Novamente</button>
        `;
        resultsContainer.style.display = 'block';
    });
}

// Atualizar o sistema de jogo
function handleGameComplete(gameData) {
    saveGameProgress(gameData).then(() => {
        // Verificar conquistas
        checkGameAchievements(gameData);
    });
}

// Adicionar ao evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    await userSystem.init();
    
    // Adicionar manipuladores de eventos globais
    window.handleLogin = userSystem.handleLogin.bind(userSystem);
    window.restartQuiz = restartQuiz;
});