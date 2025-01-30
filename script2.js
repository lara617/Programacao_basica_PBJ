console.log("script.js carregado com sucesso!");

document.addEventListener('DOMContentLoaded', function() {
    // Obtenção dos elementos do DOM
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const buttonContainer = document.querySelector('.button-container');
    const nextButton = document.getElementById('next-button');

    // Verifica se os elementos foram encontrados
    if (!modal || !modalTitle || !modalText || !closeModalBtn || !buttonContainer || !nextButton) {
        console.error("Um ou mais elementos do modal não foram encontrados. Verifique o HTML.");
        return;
    }

    // Inicializa as variáveis de controle do quiz
    let currentQuizTitle = '';
    let currentQuestionIndex = 0;
    let score = 0;

    // Adiciona a variável quizzes com IDs
    const quizzes = [
        {
            id: "quiz-componentes",
            title: "Componentes",
            questions: [
                {
                    question: "O que é um componente?",
                    options: ["Parte de um sistema", "Um tipo de dado", "Uma função", "Um comando"],
                    answer: "Parte de um sistema"
                },
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
                    question: "Qual é a função da Placa-Mãe?",
                    options: ["Conectar todos os componentes", "Processar dados", "Armazenar dados", "Fornecer energia"],
                    answer: "Conectar todos os componentes"
                },
                {
                    question: "O que faz a Placa Gráfica?",
                    options: ["Processa gráficos", "Armazena dados", "Conecta dispositivos", "Fornece energia"],
                    answer: "Processa gráficos"
                },
                {
                    question: "Qual é a função da Fonte de Alimentação?",
                    options: ["Fornecer energia a todos os componentes", "Armazenar dados", "Processar informações", "Conectar dispositivos"],
                    answer: "Fornecer energia a todos os componentes"
                },
                {
                    question: "O que são Coolers?",
                    options: ["Ventoinhas que resfriam os componentes", "Dispositivos de armazenamento", "Placas de vídeo", "Fontes de alimentação"],
                    answer: "Ventoinhas que resfriam os componentes"
                },
                {
                    question: "Qual é a função do Disco Rígido?",
                    options: ["Armazenar dados permanentemente", "Processar informações", "Conectar dispositivos", "Fornecer energia"],
                    answer: "Armazenar dados permanentemente"
                },
                {
                    question: "O que é um barramento em um computador?",
                    options: ["Caminho de comunicação entre componentes", "Dispositivo de armazenamento", "Placa de vídeo", "Fonte de alimentação"],
                    answer: "Caminho de comunicação entre componentes"
                }
            ]
        },
        {
            id: "quiz-computador",
            title: "Computador",
            questions: [
                {
                    question: "O que é um computador?",
                    options: ["Uma máquina eletrônica", "Um tipo de software", "Um dispositivo de armazenamento", "Um tipo de dado"],
                    answer: "Uma máquina eletrônica"
                },
                {
                    question: "Qual é a função do processador?",
                    options: ["Executar cálculos", "Armazenar dados", "Conectar à internet", "Fornecer energia"],
                    answer: "Executar cálculos"
                },
                {
                    question: "O que é a memória RAM?",
                    options: ["Memória de acesso aleatório", "Memória de leitura apenas", "Disco rígido", "Placa-mãe"],
                    answer: "Memória de acesso aleatório"
                },
                {
                    question: "Qual é a função do sistema operacional?",
                    options: ["Gerenciar hardware e software", "Armazenar dados", "Processar gráficos", "Conectar dispositivos"],
                    answer: "Gerenciar hardware e software"
                },
                {
                    question: "O que é um software?",
                    options: ["Conjunto de instruções que dizem ao computador o que fazer", "Um tipo de hardware", "Um dispositivo de armazenamento", "Um componente do computador"],
                    answer: "Conjunto de instruções que dizem ao computador o que fazer"
                },
                {
                    question: "Qual é a função do monitor?",
                    options: ["Exibir informações", "Armazenar dados", "Processar informações", "Conectar dispositivos"],
                    answer: "Exibir informações"
                },
                {
                    question: "O que é um periférico?",
                    options: ["Acessórios que interagem com o computador", "Componentes internos", "Software", "Dispositivos de armazenamento"],
                    answer: "Acessórios que interagem com o computador"
                },
                {
                    question: "Qual é a função do teclado?",
                    options: ["Inserir dados", "Exibir informações", "Armazenar dados", "Processar informações"],
                    answer: "Inserir dados"
                },
                {
                    question: "O que é um disco rígido?",
                    options: ["Dispositivo de armazenamento permanente", "Placa de vídeo", "Fonte de alimentação", "Memória RAM"],
                    answer: "Dispositivo de armazenamento permanente"
                },
                {
                    question: "Qual é a função da placa-mãe?",
                    options: ["Conectar todos os componentes do computador", "Armazenar dados", "Processar informações", "Fornecer energia"],
                    answer: "Conectar todos os componentes do computador"
                }
            ]
        },
        {
            id: "quiz-programacao",
            title: "Programação",
            questions: [
                {
                    question: "O que é uma variável?",
                    options: ["Um espaço na memória para armazenar dados", "Um tipo de dado", "Uma função", "Um comando"],
                    answer: "Um espaço na memória para armazenar dados"
                },
                {
                    question: "O que é um algoritmo?",
                    options: ["Uma sequência de passos para resolver um problema", "Um tipo de dado", "Uma função", "Um comando"],
                    answer: "Uma sequência de passos para resolver um problema"
                },
                {
                    question: "Qual é a função de um loop?",
                    options: ["Repetir um bloco de código", "Armazenar dados", "Conectar dispositivos", "Processar informações"],
                    answer: "Repetir um bloco de código"
                },
                {
                    question: "O que é uma função?",
                    options: ["Um bloco de código que realiza uma tarefa específica", "Uma variável que armazena dados", "Um tipo de dado", "Um comando"],
                    answer: "Um bloco de código que realiza uma tarefa específica"
                },
                {
                    question: "O que significa 'debugging'?",
                    options: ["Encontrar e corrigir erros no código", "Escrever código", "Executar um programa", "Armazenar dados"],
                    answer: "Encontrar e corrigir erros no código"
                },
                {
                    question: "O que é um compilador?",
                    options: ["Um programa que traduz código fonte para código executável", "Um tipo de dado", "Uma função", "Um comando"],
                    answer: "Um programa que traduz código fonte para código executável"
                },
                {
                    question: "O que é uma linguagem de programação?",
                    options: ["Um conjunto de regras para escrever código", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Um conjunto de regras para escrever código"
                },
                {
                    question: "O que é um sistema operacional?",
                    options: ["Software que gerencia hardware e software", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Software que gerencia hardware e software"
                },
                {
                    question: "O que é um banco de dados?",
                    options: ["Um sistema para armazenar e gerenciar dados", "Um tipo de dado", "Uma função", "Um comando"],
                    answer: "Um sistema para armazenar e gerenciar dados"
                },
                {
                    question: "O que é um framework?",
                    options: ["Um conjunto de ferramentas e bibliotecas para facilitar o desenvolvimento", "Um tipo de dado", "Uma função", "Um comando"],
                    answer: "Um conjunto de ferramentas e bibliotecas para facilitar o desenvolvimento"
                }
            ]
        },
        {
            id: "quiz-algoritmos",
            title: "Algoritmos",
            questions: [
                {
                    question: "O que é um algoritmo?",
                    options: ["Uma sequência de passos para resolver um problema", "Um tipo de dado", "Uma função", "Um comando"],
                    answer: "Uma sequência de passos para resolver um problema"
                },
                {
                    question: "Qual é a função de um algoritmo de ordenação?",
                    options: ["Organizar dados", "Encontrar dados", "Armazenar dados", "Processar dados"],
                    answer: "Organizar dados"
                },
                {
                    question: "O que é um pseudocódigo?",
                    options: ["Uma forma de descrever algoritmos em linguagem natural", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Uma forma de descrever algoritmos em linguagem natural"
                },
                {
                    question: "Qual é a estrutura básica de um algoritmo?",
                    options: ["Entrada, processamento e saída", "Variáveis, funções e loops", "Classes, objetos e métodos", "Sequência, seleção e repetição"],
                    answer: "Entrada, processamento e saída"
                },
                {
                    question: "O que é um algoritmo de busca?",
                    options: ["Um algoritmo que encontra dados em uma estrutura", "Um algoritmo que organiza dados", "Um algoritmo que armazena dados", "Um algoritmo que processa dados"],
                    answer: "Um algoritmo que encontra dados em uma estrutura"
                },
                {
                    question: "Qual é a diferença entre um algoritmo e um programa?",
                    options: ["Um algoritmo é uma sequência de passos, um programa é a implementação", "Um algoritmo é um tipo de dado, um programa é um comando", "Um algoritmo é um código executável, um programa é um pseudocódigo", "Não há diferença"],
                    answer: "Um algoritmo é uma sequência de passos, um programa é a implementação"
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
                    question: "O que é um algoritmo de decisão?",
                    options: ["Um algoritmo que toma decisões com base em condições", "Um algoritmo que organiza dados", "Um algoritmo que armazena dados", "Um algoritmo que processa dados"],
                    answer: "Um algoritmo que toma decisões com base em condições"
                },
                {
                    question: "Qual é a importância da eficiência em um algoritmo?",
                    options: ["Reduz o tempo de execução e o uso de recursos", "Aumenta a complexidade do código", "Não tem importância", "Facilita a leitura do código"],
                    answer: "Reduz o tempo de execução e o uso de recursos"
                }
            ]
        },
        {
            id: "quiz-funcoes",
            title: "Funções",
            questions: [
                {
                    question: "O que é uma função em programação?",
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
        {
            id: "quiz-poo",
            title: "POO",
            questions: [
                {
                    question: "O que é Programação Orientada a Objetos?",
                    options: ["Uma forma de organizar um programa em blocos", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Uma forma de organizar um programa em blocos"
                },
                {
                    question: "O que é uma classe?",
                    options: ["Um modelo para criar objetos", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Um modelo para criar objetos"
                },
                {
                    question: "O que é um objeto?",
                    options: ["Uma instância de uma classe", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Uma instância de uma classe"
                },
                {
                    question: "O que são atributos?",
                    options: ["Características de um objeto", "Métodos de um objeto", "Classes", "Algoritmos"],
                    answer: "Características de um objeto"
                },
                {
                    question: "O que são métodos?",
                    options: ["Ações que um objeto pode realizar", "Características de um objeto", "Classes", "Algoritmos"],
                    answer: "Ações que um objeto pode realizar"
                },
                {
                    question: "O que é herança?",
                    options: ["Quando uma classe herda características de outra classe", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Quando uma classe herda características de outra classe"
                },
                {
                    question: "O que é encapsulamento?",
                    options: ["Ocultar detalhes internos de um objeto", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Ocultar detalhes internos de um objeto"
                },
                {
                    question: "O que é polimorfismo?",
                    options: ["A capacidade de um objeto assumir várias formas", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "A capacidade de um objeto assumir várias formas"
                },
                {
                    question: "O que é um construtor?",
                    options: ["Um método especial para criar objetos", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Um método especial para criar objetos"
                },
                {
                    question: "O que é um destrutor?",
                    options: ["Um método especial para destruir objetos", "Um tipo de dado", "Um comando", "Um algoritmo"],
                    answer: "Um método especial para destruir objetos"
                }
            ]
        },
       
    ];

    console.log("Quizzes disponíveis:", quizzes.map(quiz => quiz.id)); // Para depuração

    // Função para iniciar o quiz
    function startQuiz(quizTitle) {
        console.log("Iniciando quiz:", quizTitle);
        currentQuizTitle = quizTitle;
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    // Função para mostrar a pergunta
    function showQuestion() {
        const quiz = quizzes.find(q => q.id === currentQuizTitle);
        if (!quiz) {
            console.error("Quiz não encontrado:", currentQuizTitle);
            return;
        }

        const question = quiz.questions[currentQuestionIndex];
        if (!question) {
            console.error("Pergunta não encontrada:", currentQuestionIndex);
            return;
        }

        modalText.innerHTML = `
            <div class="question">${question.question}</div>
            <div class="options-container">
                ${question.options.map(option => `
                    <button class="option-button" data-correct-answer="${question.answer}">${option}</button>
                `).join('')}
            </div>
        `;

        nextButton.style.display = 'none';
    }
   
    // Adiciona efeitos sonoros e visuais aos botões
    buttonContainer.addEventListener('mouseenter', (e) => {
        if (e.target.closest('.button')) {
            hoverSound.currentTime = 0;
            hoverSound.play();
        }
    });

    buttonContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.button');
        if (!button) return;

    

        const buttonKey = button.classList[1];
        console.log("Botão clicado:", buttonKey);

        if (buttonKey === 'button-learn') {
            window.location.href = 'index.html';
            return;
        }

        if (buttonKey === 'button-quiz') {
            modalTitle.textContent = "Escolha seu Quiz";
            modalText.innerHTML = generateQuizButtons();
            modal.style.display = 'block';
            console.log("Modal visível:", modal.style.display === 'block'); // Para depuração
            return;
        }

        if (buttonKey === 'button-1') {
            modalTitle.textContent = "Iniciar Jogo";
            modalText.innerHTML = createGameInterface();
            modal.style.display = 'block';
            initializeGame();
            return;
        }

        if (buttonKey === 'button-4') {
            showHelp();
            return;
        }
    });


    // Evento para fechar o modal
    closeModalBtn.addEventListener('click', function() {
        console.log('Função de fechar o modal chamada!');
        modal.style.display = 'none';
    });

    // Evento de clique fora do modal para fechar
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Evento de clique para abrir o modal
    document.getElementById('openModalBtn').addEventListener('click', function() {
        modalTitle.textContent = "Escolha seu Quiz";
        modalText.innerHTML = generateQuizButtons();
        modal.style.display = 'block';
    });

    // Adiciona evento de clique para os botões de resposta
    modalText.addEventListener('click', (e) => {
        console.log("Elemento clicado:", e.target); // Para depuração
        if (e.target.classList.contains('option-button')) {
            const selectedAnswer = e.target.textContent;
            const correctAnswer = e.target.dataset.correctAnswer;
            handleAnswerSelection(selectedAnswer, correctAnswer);
            e.target.classList.add(selectedAnswer === correctAnswer ? 'correct' : 'wrong');
        }
    });

    // Adiciona evento de clique para os botões de quiz
    modalText.addEventListener('click', (e) => {
        console.log("Elemento clicado:", e.target); // Para depuração
        if (e.target.classList.contains('quiz-select')) {
            const selectedQuizId = e.target.id; // Captura o ID do botão
            console.log("Quiz selecionado:", selectedQuizId); // Para depuração
            console.log("ID do botão clicado:", selectedQuizId); // Para depuração

            // Encontra o quiz correspondente pelo ID
            const selectedQuiz = quizzes.find(quiz => quiz.id === selectedQuizId);
            if (selectedQuiz) {
                startQuiz(selectedQuiz.id); // Inicia o quiz com o ID correspondente
                modal.style.display = 'none'; // Fecha o modal
            } else {
                console.error("Quiz não encontrado para o ID:", selectedQuizId);
            }
        }
    });

    // Função para ir para a próxima pergunta
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        const quiz = quizzes.find(q => q.title === currentQuizTitle);

        if (currentQuestionIndex < quiz.questions.length) {
            showQuestion();
        } else {
            alert(`Fim do quiz! Pontuação: ${score}/${quiz.questions.length}`);
            modal.style.display = 'none';
        }
    });

    function handleAnswerSelection(selectedAnswer, correctAnswer) {
        if (selectedAnswer === correctAnswer) {
            score++;
            alert("Resposta correta!");
        } else {
            alert("Resposta incorreta.");
        }
        nextButton.style.display = 'block';
    }

    function generateQuizButtons() {
        return quizzes.map(quiz => `
            <button class="button quiz-select" data-quiz-title="${quiz.title}">Quiz sobre ${quiz.title}</button>
        `).join('');
    }
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
        console.log("Comandos a serem executados:", commands);
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

    const commandTexts = {
        moveRight: "Mover para a Direita",
        moveLeft: "Mover para a Esquerda",
        moveUp: "Mover para Cima",
        moveDown: "Mover para Baixo",
        jump: "Pular",
        rotate: "Girar",
        repeat: "Repetir 3x"
    };

    block.textContent = commandTexts[command] || command;
    block.draggable = false;

    block.addEventListener('click', () => {
        block.remove();
    });

    return block;
}

async function executeCommands(commands, character) {
    resetCharacter(character);
    
    for (const command of commands) {
        console.log(`Executando comando: ${command}`);
        await executeCommand(command, character);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

async function executeCommand(command, character) {
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
        default:
            console.error(`Comando desconhecido: ${command}`);
    }
}

function resetCharacter(character) {
    character.style.transform = 'translate(-50%, -50%)';
}

function showHelp() {
    alert("Aqui estão algumas dicas para jogar o quiz!");
}

