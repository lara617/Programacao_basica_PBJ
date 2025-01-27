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

// Questões do quiz
const questions = [
    {
        question: "Qual é a saída de: console.log(typeof null)?",
        options: ["object", "null", "undefined", "boolean"],
        answer: "object",
    },
    {
        question: "Qual linguagem é executada no navegador?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript",
    },
    {
        question: "Qual método converte JSON em objeto?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
        answer: "JSON.parse()",
    },
];

let currentQuestionIndex = 0;
let score = 0;

// Função para inicializar o quiz
function initializeQuiz() {
    const app = document.getElementById("app");
    app.innerHTML = createQuizInterface();

    document.getElementById("start-quiz").addEventListener("click", startQuiz);
    document.getElementById("next-question").addEventListener("click", showNextQuestion);
    document.getElementById("restart-quiz").addEventListener("click", initializeQuiz);
}

// Função para começar o quiz
function startQuiz() {
    document.getElementById("start-quiz").style.display = "none";
    document.getElementById("next-question").style.display = "block";
    document.getElementById("total").textContent = questions.length;
    showNextQuestion();
}

// Função para exibir a próxima pergunta
function showNextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.querySelector(".options-container");

    // Limpar opções anteriores
    optionsContainer.innerHTML = "";

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = q


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

// Função para criar a interface de aprendizado
function createLearnInterface() {
    return `
        <div class="learn-container">
            <h2>📚 Tópicos de Aprendizado</h2>
            <p>Atualmente, não há tópicos disponíveis para aprendizado.</p>
        </div>
    `;
}

// Adicionar evento ao botão "Quiz"
document.querySelector('.button-quiz').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    modalTitle.textContent = '🎯 Quiz de Programação';
    modalText.innerHTML = createQuizButtons(); // Cria os botões do quiz
    modal.style.display = 'block'; // Exibe o modal

    console.log("Modal exibido com os botões do quiz."); // Log para depuração
});

// Função para criar os botões do quiz
function createQuizButtons() {
    const buttons = [];
    for (let i = 1; i <= 7; i++) {
        buttons.push(`
            <button class="quiz-button" onclick="startQuiz(${i})">Iniciar Quiz ${i}</button>
        `);
    }
    console.log("Botões do quiz criados:", buttons); // Log para depuração
    return buttons.join(''); // Retorna todos os botões como uma string
}

// Função para iniciar o quiz
function startQuiz(quizNumber) {
    console.log(`Iniciando o Quiz ${quizNumber}`); // Aqui você pode adicionar a lógica para iniciar o quiz
    // Fechar o modal
    document.getElementById('modal').style.display = 'none';
}

// Adicionar evento para fechar o modal
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');

    // Verificar se os elementos existem no DOM
    if (!modal || !closeButton) {
        console.error('Elemento modal ou botão de fechamento não encontrado.');
        return;
    }

    // Adicionar evento ao botão de fechamento
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Exemplo de como abrir o modal (adicione onde for necessário)
    document.querySelector('.button.button-quiz').addEventListener('click', function () {
        modal.style.display = 'block';
    });
});
