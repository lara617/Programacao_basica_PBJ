console.log("Script carregado!");

// Função para realizar scroll suave até uma seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Função de carregamento no botão
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado!");
    
    // Configuração do botão "Saber mais"
    const button = document.getElementById("loading-button");
    
    button.addEventListener("click", () => {
        // Adiciona a classe para manter a cor azul
        button.classList.add('button-active');

        // Scroll suave para a seção de aprendizagem usando scrollIntoView
        document.getElementById('aprendizagem').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Efeito de loading
        button.textContent = "Carregando...";
        button.disabled = true; // Desabilita o botão para evitar múltiplos cliques

        setTimeout(() => {
            button.disabled = false; // Reabilita o botão após 3 segundos
            button.textContent = "Saber mais"; // Redefine o texto do botão
        }, 3000);
    });

    // Scroll suave para links da navbar
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Fechar o modal quando clicar no X
    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
        
        // Retorna para a posição anterior do scroll
        const scrollY = modal.getAttribute('data-scroll');
        window.scrollTo(0, scrollY);
    }

    // Fechar o modal quando clicar fora dele
    window.onclick = function(event) {
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
            
            // Retorna para a posição anterior do scroll
            const scrollY = modal.getAttribute('data-scroll');
            window.scrollTo(0, scrollY);
        }
    }
});

// Função para abrir o modal
function openModal(contentId) {
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById(`modalContent-${contentId}`);
    const modalInner = document.querySelector('.modal-content');
    
    // Limpa o conteúdo anterior
    modalInner.innerHTML = `
        <span class="close">&times;</span>
        ${modalContent.innerHTML}
    `;
    
    modal.style.display = "block";
    modal.setAttribute('data-scroll', window.scrollY);

    // Reativa o botão de fechar
    const closeBtn = modalInner.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = "none";
        const scrollY = modal.getAttribute('data-scroll');
        window.scrollTo(0, parseInt(scrollY));
    }
}

document.querySelectorAll('.hero-button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('button-active');
    });
});
