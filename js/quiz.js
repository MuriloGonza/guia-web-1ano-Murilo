// Questões do Quiz
const questions = [
    {
        id: 1,
        question: 'Qual tag HTML é usada para criar um link?',
        options: [
            '<link>',
            '<a>',
            '<href>',
            '<url>'
        ],
        correct: 1
    },
    {
        id: 2,
        question: 'Qual propriedade CSS é usada para mudar a cor do texto?',
        options: [
            'text-color',
            'font-color',
            'color',
            'text-style'
        ],
        correct: 2
    },
    {
        id: 3,
        question: 'Como declarar uma variável em JavaScript moderno?',
        options: [
            'var nome = "valor"',
            'const nome = "valor"',
            'let nome = "valor"',
            'Todas as anteriores'
        ],
        correct: 3
    },
    {
        id: 4,
        question: 'Qual método é usado para selecionar um elemento pelo ID em JavaScript?',
        options: [
            'document.query(#id)',
            'document.getElementById(id)',
            'document.selectById(id)',
            'document.findElement(#id)'
        ],
        correct: 1
    },
    {
        id: 5,
        question: 'O que significa CSS?',
        options: [
            'Creative Style Sheets',
            'Computer Style Sheets',
            'Cascading Style Sheets',
            'Colorful Style Sheets'
        ],
        correct: 2
    }
];

// Estado do Quiz
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Elementos DOM
const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');

// Renderizar questão atual
function renderQuestion() {
    const question = questions[currentQuestion];
    
    quizArea.innerHTML = `
        <div class="question">
            <h2>Questão ${currentQuestion + 1} de ${questions.length}</h2>
            <p>${question.question}</p>
            
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" data-index="${index}">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="quiz-controls">
            <button class="btn" id="prev-btn" ${currentQuestion === 0 ? 'disabled' : ''}>
                Anterior
            </button>
            <button class="btn btn-primary" id="next-btn" disabled>
                ${currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </button>
        </div>
    `;

    // Event Listeners
    const options = document.querySelectorAll('.option');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove seleção anterior
            options.forEach(opt => opt.classList.remove('selected'));
            // Seleciona nova opção
            option.classList.add('selected');
            selectedAnswer = parseInt(option.dataset.index);
            nextBtn.disabled = false;
        });
    });

    nextBtn.addEventListener('click', () => {
        if (selectedAnswer !== null) {
            // Verifica resposta
            if (selectedAnswer === question.correct) {
                score++;
            }
            
            if (currentQuestion === questions.length - 1) {
                showResults();
            } else {
                currentQuestion++;
                selectedAnswer = null;
                renderQuestion();
            }
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                selectedAnswer = null;
                renderQuestion();
            }
        });
    }
}

// Mostrar resultados
function showResults() {
    const bestScore = Math.max(score, parseInt(localStorage.getItem('quizBestScore') || 0));
    localStorage.setItem('quizBestScore', bestScore);

    quizArea.style.display = 'none';
    resultArea.style.display = 'block';

    const scoreDisplay = resultArea.querySelector('.score');
    const bestScoreDisplay = resultArea.querySelector('.best-score');

    scoreDisplay.textContent = `${score}/${questions.length}`;
    bestScoreDisplay.textContent = `${bestScore}/${questions.length}`;
}

// Reiniciar Quiz
document.getElementById('restart-quiz').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    quizArea.style.display = 'block';
    resultArea.style.display = 'none';
    renderQuestion();
});

// Iniciar Quiz
renderQuestion();
