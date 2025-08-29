// Dados das tecnologias
const tecnologias = [
    {
        id: 1,
        nome: 'HTML',
        categoria: 'frontend',
        descricao: 'HTML é a linguagem de marcação padrão para criar páginas web.',
        pros: [
            'Fácil de aprender',
            'Base fundamental da web',
            'Compatível com todos os navegadores'
        ],
        contras: [
            'Limitado a estruturação',
            'Não possui lógica de programação',
            'Precisa de outras tecnologias para interatividade'
        ],
        nivel: 'Iniciante',
        link: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML'
    },
    {
        id: 2,
        nome: 'CSS',
        categoria: 'frontend',
        descricao: 'CSS é a linguagem usada para estilizar páginas web.',
        pros: [
            'Controle total sobre o visual',
            'Reutilização de estilos',
            'Responsividade'
        ],
        contras: [
            'Complexidade em layouts avançados',
            'Diferentes comportamentos entre navegadores',
            'Curva de aprendizado para recursos avançados'
        ],
        nivel: 'Iniciante a Intermediário',
        link: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS'
    },
    {
        id: 3,
        nome: 'JavaScript',
        categoria: 'frontend',
        descricao: 'JavaScript é a linguagem de programação que permite criar conteúdo dinâmico.',
        pros: [
            'Versátil e poderosa',
            'Grande comunidade',
            'Pode ser usado no frontend e backend'
        ],
        contras: [
            'Complexidade em projetos grandes',
            'Diferentes versões e padrões',
            'Tipagem dinâmica pode causar bugs'
        ],
        nivel: 'Intermediário',
        link: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript'
    },
    {
        id: 4,
        nome: 'Node.js',
        categoria: 'backend',
        descricao: 'Node.js é um ambiente de execução JavaScript server-side.',
        pros: [
            'Usa JavaScript no backend',
            'Grande ecossistema (npm)',
            'Ótimo para APIs e tempo real'
        ],
        contras: [
            'Não ideal para CPU intensivo',
            'Callback hell em código antigo',
            'Curva de aprendizado para async'
        ],
        nivel: 'Intermediário',
        link: 'https://nodejs.org/'
    },
    {
        id: 5,
        nome: 'MySQL',
        categoria: 'database',
        descricao: 'MySQL é um sistema de gerenciamento de banco de dados relacional.',
        pros: [
            'Confiável e estabelecido',
            'Grande comunidade',
            'Fácil de aprender'
        ],
        contras: [
            'Pode ser lento com muitos dados',
            'Limitações na escalabilidade',
            'Recursos enterprise são pagos'
        ],
        nivel: 'Intermediário',
        link: 'https://www.mysql.com/'
    }
];

// Funções
function createTechCard(tech) {
    return `
        <article class="tech-card" data-id="${tech.id}">
            <h3>${tech.nome}</h3>
            <span class="category">${tech.categoria}</span>
            <p>${tech.descricao}</p>
        </article>
    `;
}

function createModalContent(tech) {
    return `
        <h2>${tech.nome}</h2>
        <p class="tech-description">${tech.descricao}</p>
        
        <div class="tech-details">
            <div class="pros-cons">
                <div class="pros">
                    <h3>Vantagens</h3>
                    <ul>
                        ${tech.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="cons">
                    <h3>Desvantagens</h3>
                    <ul>
                        ${tech.contras.map(contra => `<li>${contra}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="tech-meta">
                <p><strong>Nível:</strong> ${tech.nivel}</p>
                <p><strong>Categoria:</strong> ${tech.categoria}</p>
                <a href="${tech.link}" target="_blank" class="btn btn-primary">Documentação</a>
            </div>
        </div>
    `;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const techGrid = document.getElementById('tech-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('tech-search');
    const modal = document.getElementById('tech-modal');
    const modalClose = document.querySelector('.modal-close');

    // Renderizar cards iniciais
    let currentTechs = [...tecnologias];
    renderTechCards(currentTechs);

    // Filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            currentTechs = filter === 'all' 
                ? tecnologias 
                : tecnologias.filter(tech => tech.categoria === filter);

            // Aplica busca atual
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                currentTechs = currentTechs.filter(tech => 
                    tech.nome.toLowerCase().includes(searchTerm) ||
                    tech.descricao.toLowerCase().includes(searchTerm)
                );
            }

            renderTechCards(currentTechs);
        });
    });

    // Busca
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

        currentTechs = tecnologias.filter(tech => {
            const matchesSearch = tech.nome.toLowerCase().includes(searchTerm) ||
                                tech.descricao.toLowerCase().includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || tech.categoria === activeFilter;
            return matchesSearch && matchesFilter;
        });

        renderTechCards(currentTechs);
    });

    // Modal
    techGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.tech-card');
        if (card) {
            const techId = parseInt(card.dataset.id);
            const tech = tecnologias.find(t => t.id === techId);
            if (tech) {
                document.getElementById('modal-body').innerHTML = createModalContent(tech);
                modal.classList.add('active');
            }
        }
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Escape fecha o modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // Função de renderização
    function renderTechCards(techs) {
        techGrid.innerHTML = techs.map(createTechCard).join('');
    }
});
