document.addEventListener('DOMContentLoaded', function() {
    // Menu hambúrguer
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Tema escuro
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Alternar tema escuro';
    document.querySelector('.main-header .container').appendChild(themeToggle);

    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    });

    // Atalhos de teclado
    document.addEventListener('keydown', function(event) {
        // Tecla '/' para focar na busca
        if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Home para voltar ao topo
        if (event.key === 'Home' && event.ctrlKey) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Accordion
    const accordionButtons = document.querySelectorAll('.accordion-header');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('.icon');
            
            // Fecha outros acordeões
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.previousElementSibling.querySelector('.icon').textContent = '+';
                }
            });

            // Abre/fecha o acordeão clicado
            content.classList.toggle('active');
            icon.textContent = content.classList.contains('active') ? '-' : '+';
        });
    });

    // Checklist
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const progress = document.getElementById('checklistProgress');
    const progressText = document.getElementById('progressText');

    // Carregar estado salvo
    if (checkboxes.length > 0) {
        const savedChecklist = JSON.parse(localStorage.getItem('checklist') || '{}');
        
        checkboxes.forEach(checkbox => {
            const item = checkbox.dataset.item;
            if (savedChecklist[item]) {
                checkbox.checked = true;
            }
        });

        updateProgress();
    }

    // Atualizar progresso
    function updateProgress() {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = (checked / total) * 100;
        
        progress.value = percentage;
        progressText.textContent = `${Math.round(percentage)}%`;

        // Salvar estado
        const checklist = {};
        checkboxes.forEach(checkbox => {
            checklist[checkbox.dataset.item] = checkbox.checked;
        });
        localStorage.setItem('checklist', JSON.stringify(checklist));
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
});
