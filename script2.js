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
            else if (buttonClasses.contains('button-learn')) {
                // Redireciona para index.html ao clicar no botão "Aprender"
                window.location.href = 'index.html';
                return; // Para evitar a execução do código abaixo
            }

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
        e.preventDefault(); // Permite que o contêiner aceite o drop
    });

    programArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const command = e.dataTransfer.getData('text/plain');
        const newBlock = createProgramBlock(command); // Cria um novo bloco
        programArea.appendChild(newBlock); // Adiciona o bloco ao contêiner
    });

    // Executar programa
    runButton.addEventListener('click', async () => {
        const commands = Array.from(programArea.children).map(block => block.dataset.command);
        console.log("Comandos a serem executados:", commands); // Debug: Mostra os comandos
        runButton.disabled = true;
        await executeCommands(commands, character); // Executa todos os comandos
        runButton.disabled = false;
    });

    // Limpar programa
    clearButton.addEventListener('click', () => {
        programArea.innerHTML = '';
        resetCharacter(character);
    });
}

// Função para criar um bloco de programa
function createProgramBlock(command) {
    const block = document.createElement('div');
    block.className = 'program-block'; // Classe para estilização
    block.dataset.command = command; // Armazena o comando no bloco

    // Mapeia os comandos para o texto em português de Portugal
    const commandTexts = {
        moveRight: "Mover para a Direita",
        moveLeft: "Mover para a Esquerda",
        moveUp: "Mover para Cima",
        moveDown: "Mover para Baixo",
        jump: "Pular",
        rotate: "Girar",
        repeat: "Repetir 3x"
    };

    block.textContent = commandTexts[command] || command; // Define o texto do bloco
    block.draggable = false; // Desabilita o arrasto do bloco dentro do contêiner

    // Adiciona um evento para remover o bloco ao clicar
    block.addEventListener('click', () => {
        block.remove(); // Remove o bloco ao clicar
    });

    return block; // Retorna o novo bloco
}

async function executeCommands(commands, character) {
    resetCharacter(character);
    
    for (const command of commands) {
        console.log(`Executando comando: ${command}`); // Debug: Mostra o comando atual
        await executeCommand(command, character); // Executa cada comando
        await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 500ms entre os comandos
    }
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
        // Adicione outros comandos conforme necessário
        default:
            console.error(`Comando desconhecido: ${command}`); // Debug: Comando não reconhecido
    }
}
// Função para criar a interface do quiz
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
let currentQuestionIndex = 0;
let score = 0;
let currentQuizTitle = ''; // Variável global para armazenar o título do quiz atual

// Função para inicializar o quiz
function initializeQuiz() {
    const app = document.getElementById("app");
    app.innerHTML = createQuizInterface();

    document.getElementById("start-quiz").addEventListener("click", startQuiz);
    document.getElementById("next-question").addEventListener("click", showNextQuestion);
    document.getElementById("restart-quiz").addEventListener("click", initializeQuiz);
}

// Função para começar o quiz
function startQuiz(quizTitle) {
    currentQuizTitle = quizTitle; // Armazena o título do quiz atual
    const quiz = quizzes.find(q => q.title === quizTitle);
    if (quiz) {
        currentQuestionIndex = 0; // Reiniciar o índice para o início do quiz
        showQuestion(quiz.questions[currentQuestionIndex]); // Mostrar a primeira pergunta
        const modal = document.getElementById('modal');
        modal.style.display = 'block'; // Exibe o modal
    } else {
        console.error('Quiz não encontrado:', quizTitle);
    }
}

function showQuestion(question) {
    const modalText = document.getElementById('modal-text');
    modalText.innerHTML = ''; // Limpa o conteúdo anterior

    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
        <p>${currentQuestionIndex + 1}. ${question.question}</p>
        ${question.options.map(option => `
            <button class="option-button" onclick="selectAnswer('${option}', '${question.answer}')">${option}</button>
        `).join('')}
        <button id="next-button" class="next-button" style="display: none;" onclick="nextQuestion()">Próxima Pergunta</button>
    `;
    modalText.appendChild(questionElement);
}

function selectAnswer(selectedAnswer, correctAnswer) {
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.disabled = true; // Desabilitar todos os botões de opção
    });

    const nextButton = document.getElementById('next-button');

    if (selectedAnswer === correctAnswer) {
        alert("🎉 Resposta correta! 🎉");
        nextButton.style.display = 'block'; // Exibir o botão "Próxima Pergunta"
    } else {
        alert("😢 Resposta errada. Tente novamente!");
        // Reabilitar os botões de opção para tentar novamente
        optionButtons.forEach(button => {
            button.disabled = false; // Reabilitar os botões de opção
        });
        nextButton.style.display = 'none'; // Esconder o botão "Próxima Pergunta"
    }
}

function nextQuestion() {
    console.log("Próxima pergunta chamada"); // Adicione este log
    currentQuestionIndex++; // Avançar para a próxima pergunta
    const quiz = quizzes.find(q => q.title === currentQuizTitle); // Use a variável global
    if (currentQuestionIndex < quiz.questions.length) {
        showQuestion(quiz.questions[currentQuestionIndex]); // Mostrar a próxima pergunta
    } else {
        alert("👏 Você completou o quiz! 👏");
        const modal = document.getElementById('modal');
        modal.style.display = 'none'; // Esconde o modal após o quiz
    }
}

// Função para criar a interface de aprendizado
function createLearnInterface() {
    return `
        <div class="learn-container">
           
        </div>
    `;
}

// Adicionar evento ao botão "Quiz"
document.querySelector('.button-quiz').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block'; // Exibe o modal
});

// Adicionar evento para fechar o modal
document.querySelector('.close-button').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; // Esconde o modal
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Esconde o modal
    }
});

const quizzes = [
    {
        title: "Componentes",
        questions: [
            {
                question: "Qual é a função da CPU?",
                options: ["Processar dados", "Armazenar dados", "Gerar energia", "Conectar à internet"],
                answer: "Processar dados"
            },
            {
                question: "O que é a RAM?",
                options: ["Memória de acesso aleatório", "Memória de leitura apenas", "Disco rígido", "Placa-mãe"],
                answer: "Memória de acesso aleatório"
            },
            {
                question: "Qual componente é responsável pelo armazenamento permanente?",
                options: ["RAM", "CPU", "HDD/SSD", "Placa de vídeo"],
                answer: "HDD/SSD"
            },
            {
                question: "O que faz a placa-mãe?",
                options: ["Conecta todos os componentes", "Armazena dados", "Processa gráficos", "Fornece energia"],
                answer: "Conecta todos os componentes"
            },
            {
                question: "Qual é a função da fonte de alimentação?",
                options: ["Fornecer energia", "Armazenar dados", "Processar informações", "Conectar dispositivos"],
                answer: "Fornecer energia"
            },
            {
                question: "O que é uma GPU?",
                options: ["Unidade de processamento gráfico", "Unidade de processamento central", "Memória de acesso aleatório", "Dispositivo de armazenamento"],
                answer: "Unidade de processamento gráfico"
            },
            {
                question: "Qual componente é usado para resfriar a CPU?",
                options: ["Ventoinha", "Placa-mãe", "HDD", "SSD"],
                answer: "Ventoinha"
            },
            {
                question: "O que é um disco rígido?",
                options: ["Dispositivo de armazenamento", "Placa de vídeo", "Fonte de alimentação", "Memória RAM"],
                answer: "Dispositivo de armazenamento"
            },
            {
                question: "Qual é a função da memória cache?",
                options: ["Acelerar o acesso aos dados", "Armazenar dados permanentemente", "Conectar dispositivos", "Fornecer energia"],
                answer: "Acelerar o acesso aos dados"
            },
            {
                question: "O que é um barramento?",
                options: ["Caminho de comunicação entre componentes", "Dispositivo de armazenamento", "Placa de vídeo", "Fonte de alimentação"],
                answer: "Caminho de comunicação entre componentes"
            }
        ]
    },
    {
        title: "Computador",
        questions: [
            {
                question: "Qual é a função da fonte de alimentação?",
                options: ["Fornecer energia", "Armazenar dados", "Processar informações", "Conectar dispositivos"],
                answer: "Fornecer energia"
            },
            {
                question: "O que é a placa-mãe?",
                options: ["Conecta todos os componentes", "Armazena dados", "Processa gráficos", "Fornece energia"],
                answer: "Conecta todos os componentes"
            },
            {
                question: "Qual componente é responsável pelo processamento de gráficos?",
                options: ["CPU", "GPU", "RAM", "HDD"],
                answer: "GPU"
            },
            {
                question: "O que é um SSD?",
                options: ["Dispositivo de armazenamento", "Placa de vídeo", "Fonte de alimentação", "Memória RAM"],
                answer: "Dispositivo de armazenamento"
            },
            {
                question: "Qual é a função da memória RAM?",
                options: ["Armazenar dados permanentemente", "Armazenar dados temporariamente", "Processar informações", "Conectar dispositivos"],
                answer: "Armazenar dados temporariamente"
            },
            {
                question: "O que faz a ventoinha em um computador?",
                options: ["Resfriar os componentes", "Armazenar dados", "Processar gráficos", "Fornecer energia"],
                answer: "Resfriar os componentes"
            },
            {
                question: "Qual é a função do disco rígido?",
                options: ["Armazenar dados permanentemente", "Processar informações", "Conectar dispositivos", "Fornecer energia"],
                answer: "Armazenar dados permanentemente"
            },
            {
                question: "O que é um barramento em um computador?",
                options: ["Caminho de comunicação entre componentes", "Dispositivo de armazenamento", "Placa de vídeo", "Fonte de alimentação"],
                answer: "Caminho de comunicação entre componentes"
            },
            {
                question: "Qual componente é responsável pela execução de programas?",
                options: ["CPU", "GPU", "RAM", "SSD"],
                answer: "CPU"
            },
            {
                question: "O que é a BIOS?",
                options: ["Sistema básico de entrada/saída", "Dispositivo de armazenamento", "Placa de vídeo", "Fonte de alimentação"],
                answer: "Sistema básico de entrada/saída"
            }
        ]
    },
    {
        title: "Programação",
        questions: [
            {
                question: "O que é uma variável?",
                options: ["Um tipo de dado", "Um espaço na memória para armazenar dados", "Uma função", "Um comando"],
                answer: "Um espaço na memória para armazenar dados"
            },
            {
                question: "Qual é a função de um loop?",
                options: ["Executar um bloco de código uma vez", "Executar um bloco de código repetidamente", "Definir uma função", "Armazenar dados"],
                answer: "Executar um bloco de código repetidamente"
            },
            {
                question: "O que é uma função?",
                options: ["Um bloco de código que realiza uma tarefa específica", "Uma variável", "Um tipo de dado", "Um comando"],
                answer: "Um bloco de código que realiza uma tarefa específica"
            },
            {
                question: "Qual é a diferença entre uma lista e um dicionário em Python?",
                options: ["Listas são ordenadas, dicionários não", "Dicionários são ordenados, listas não", "Ambos são iguais", "Listas não podem conter tipos diferentes"],
                answer: "Listas são ordenadas, dicionários não"
            },
            {
                question: "O que significa 'debugging'?",
                options: ["Escrever código", "Encontrar e corrigir erros no código", "Compilar código", "Executar código"],
                answer: "Encontrar e corrigir erros no código"
            },
            {
                question: "O que é um algoritmo?",
                options: ["Uma sequência de instruções para resolver um problema", "Um tipo de dado", "Uma função", "Um comando"],
                answer: "Uma sequência de instruções para resolver um problema"
            },
            {
                question: "Qual é a função de um compilador?",
                options: ["Executar código", "Converter código fonte em código de máquina", "Encontrar erros no código", "Armazenar dados"],
                answer: "Converter código fonte em código de máquina"
            },
            {
                question: "O que é uma estrutura de controle?",
                options: ["Uma maneira de organizar dados", "Uma maneira de controlar o fluxo de execução do código", "Um tipo de dado", "Uma função"],
                answer: "Uma maneira de controlar o fluxo de execução do código"
            },
            {
                question: "O que é uma biblioteca em programação?",
                options: ["Um conjunto de funções e rotinas pré-escritas", "Um tipo de dado", "Um comando", "Um algoritmo"],
                answer: "Um conjunto de funções e rotinas pré-escritas"
            },
            {
                question: "O que é uma linguagem de programação?",
                options: ["Um conjunto de regras para escrever código", "Um tipo de dado", "Um comando", "Um algoritmo"],
                answer: "Um conjunto de regras para escrever código"
            }
        ]
    },
    {
        title: "Algoritmos",
        questions: [
            {
                question: "Qual é a função de um algoritmo?",
                options: ["Resolver um problema", "Armazenar dados", "Executar um programa", "Conectar dispositivos"],
                answer: "Resolver um problema"
            },
            {
                question: "O que é um pseudocódigo?",
                options: ["Código executável", "Uma forma de descrever algoritmos em linguagem natural", "Um tipo de dado", "Um comando"],
                answer: "Uma forma de descrever algoritmos em linguagem natural"
            },
            {
                question: "Qual é a estrutura básica de um algoritmo?",
                options: ["Sequência, seleção e repetição", "Entrada, processamento e saída", "Variáveis, funções e loops", "Classes, objetos e métodos"],
                answer: "Entrada, processamento e saída"
            },
            {
                question: "O que é um algoritmo de ordenação?",
                options: ["Um algoritmo que organiza dados", "Um algoritmo que busca dados", "Um algoritmo que armazena dados", "Um algoritmo que processa dados"],
                answer: "Um algoritmo que organiza dados"
            },
            {
                question: "Qual é a diferença entre um algoritmo e um programa?",
                options: ["Um algoritmo é uma sequência de passos, um programa é a implementação", "Um algoritmo é um tipo de dado, um programa é um comando", "Um algoritmo é um código executável, um programa é um pseudocódigo", "Não há diferença"],
                answer: "Um algoritmo é uma sequência de passos, um programa é a implementação"
            },
            {
                question: "O que é um loop em um algoritmo?",
                options: ["Uma repetição de um bloco de código", "Uma condição que deve ser atendida", "Uma variável que armazena dados", "Um tipo de dado"],
                answer: "Uma repetição de um bloco de código"
            },
            {
                question: "Qual é a importância da eficiência em um algoritmo?",
                options: ["Reduz o tempo de execução e o uso de recursos", "Aumenta a complexidade do código", "Não tem importância", "Facilita a leitura do código"],
                answer: "Reduz o tempo de execução e o uso de recursos"
            },
            {
                question: "O que é um algoritmo recursivo?",
                options: ["Um algoritmo que chama a si mesmo", "Um algoritmo que não termina", "Uma função que usa loops", "Um algoritmo que não pode ser implementado"],
                answer: "Um algoritmo que chama a si mesmo"
            },
            {
                question: "Qual é a finalidade de um diagrama de fluxo?",
                options: ["Visualizar a lógica de um algoritmo", "Executar um programa", "Armazenar dados", "Conectar dispositivos"],
                answer: "Visualizar a lógica de um algoritmo"
            },
            {
                question: "O que é um algoritmo de busca?",
                options: ["Um algoritmo que encontra dados em uma estrutura", "Um algoritmo que organiza dados", "Um algoritmo que armazena dados", "Um algoritmo que processa dados"],
                answer: "Um algoritmo que encontra dados em uma estrutura"
            }
        ]
    },
    {
        title: "Funções",
        questions: [
            {
                question: "Qual é a definição de uma função em programação?",
                options: ["Um bloco de código que realiza uma tarefa específica", "Uma variável que armazena dados", "Um tipo de dado", "Um comando"],
                answer: "Um bloco de código que realiza uma tarefa específica"
            },
            {
                question: "Qual é a principal vantagem de usar funções?",
                options: ["Reutilização de código", "Aumento da complexidade", "Redução da legibilidade", "Aumento do tempo de execução"],
                answer: "Reutilização de código"
            },
            {
                question: "O que é um parâmetro em uma função?",
                options: ["Uma variável que recebe um valor de entrada", "Um tipo de dado", "Um comando", "Um bloco de código"],
                answer: "Uma variável que recebe um valor de entrada"
            },
            {
                question: "O que é um valor de retorno em uma função?",
                options: ["O resultado que a função produz", "Um tipo de dado", "Um comando", "Um parâmetro"],
                answer: "O resultado que a função produz"
            },
            {
                question: "Qual é a diferença entre uma função e um método?",
                options: ["Métodos são funções associadas a objetos", "Não há diferença", "Funções não podem ter parâmetros", "Métodos não podem retornar valores"],
                answer: "Métodos são funções associadas a objetos"
            },
            {
                question: "O que significa 'escopo' em relação a funções?",
                options: ["A visibilidade de variáveis dentro de uma função", "O tempo de execução da função", "O número de parâmetros que uma função pode ter", "O tipo de dado que uma função pode retornar"],
                answer: "A visibilidade de variáveis dentro de uma função"
            },
            {
                question: "O que é uma função anônima?",
                options: ["Uma função sem nome", "Uma função que não retorna valores", "Uma função que não aceita parâmetros", "Uma função que não pode ser chamada"],
                answer: "Uma função sem nome"
            },
            {
                question: "O que é uma função recursiva?",
                options: ["Uma função que chama a si mesma", "Uma função que não termina", "Uma função que usa loops", "Uma função que não pode ser implementada"],
                answer: "Uma função que chama a si mesma"
            },
            {
                question: "Qual é a finalidade de uma função de callback?",
                options: ["Executar uma função após outra função ser concluída", "Armazenar dados", "Conectar dispositivos", "Organizar dados"],
                answer: "Executar uma função após outra função ser concluída"
            },
            {
                question: "O que é uma função de ordem superior?",
                options: ["Uma função que aceita outras funções como argumentos", "Uma função que não retorna valores", "Uma função que não pode ser chamada", "Uma função que não aceita parâmetros"],
                answer: "Uma função que aceita outras funções como argumentos"
            }
        ]
    },
    // ... outros quizzes
];