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
        // Scroll suave para a seção de aprendizagem usando scrollIntoView
        document.getElementById('aprendizagem').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Efeito de loading
        button.textContent = "Carregando...";
        button.disabled = true;
        button.style.backgroundColor = "#d4d4d4";
        button.style.color = "#888";

        setTimeout(() => {
            button.textContent = "Saber mais";
            button.disabled = false;
            button.style.backgroundColor = "#ffc107";
            button.style.color = "#000";
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
});
