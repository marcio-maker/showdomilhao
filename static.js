document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const homeScreen = document.getElementById('home-screen');
    const gameScreen = document.getElementById('game-screen');
    const feedbackScreen = document.getElementById('feedback-screen');
    const resultScreen = document.getElementById('result-screen');
    
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    const questionText = document.getElementById('question-text');
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    const optionC = document.getElementById('option-c');
    const optionD = document.getElementById('option-d');
    const options = [optionA, optionB, optionC, optionD];
    
    const currentScore = document.getElementById('current-score');
    const currentQuestion = document.getElementById('current-question');
    const totalQuestions = document.getElementById('total-questions');
    const progressBar = document.getElementById('progress');
    
    const correctFeedback = document.getElementById('correct-feedback');
    const incorrectFeedback = document.getElementById('incorrect-feedback');
    const currentWin = document.getElementById('current-win');
    const correctAnswer = document.getElementById('correct-answer');
    
    const correctCount = document.getElementById('correct-count');
    const totalCount = document.getElementById('total-count');
    const finalScore = document.getElementById('final-score');
    const resultMessage = document.getElementById('result-message');
    const trophyContainer = document.getElementById('trophy-container');
    
    // Variáveis do jogo
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    
    // Valores dos prêmios por pergunta
    const prizes = [1000, 5000, 10000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000];
    
    // Buscar perguntas da API
    function fetchQuestions() {
        // Normalmente buscaríamos as perguntas de uma API, mas vamos usar algumas exemplos para demonstração
        return [
            {
                question: "Qual é a capital do Brasil?",
                options: ["Rio de Janeiro", "Brasília", "São Paulo", "Belo Horizonte"],
                answer: "B"
            },
            {
                question: "Quem pintou a Mona Lisa?",
                options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Monet"],
                answer: "C"
            },
            {
                question: "Qual o maior planeta do sistema solar?",
                options: ["Terra", "Marte", "Júpiter", "Saturno"],
                answer: "C"
            },
            {
                question: "Em que ano ocorreu a independência do Brasil?",
                options: ["1808", "1822", "1889", "1500"],
                answer: "B"
            },
            {
                question: "Qual o elemento químico mais abundante no universo?",
                options: ["Oxigênio", "Carbono", "Hidrogênio", "Hélio"],
                answer: "C"
            },
            {
                question: "Qual animal é conhecido como o rei da selva?",
                options: ["Tigre", "Leão", "Elefante", "Gorila"],
                answer: "B"
            },
            {
                question: "Qual é o maior oceano da Terra?",
                options: ["Atlântico", "Índico", "Ártico", "Pacífico"],
                answer: "D"
            },
            {
                question: "Qual é o menor país do mundo?",
                options: ["Mônaco", "Nauru", "Vaticano", "Liechtenstein"],
                answer: "C"
            },
            {
                question: "Quantos ossos tem o corpo humano adulto?",
                options: ["206", "300", "186", "250"],
                answer: "A"
            },
            {
                question: "Qual é a montanha mais alta do mundo?",
                options: ["Monte Everest", "K2", "Monte Fuji", "Monte Kilimanjaro"],
                answer: "A"
            }
        ];
    }
    
    // Iniciar o jogo
    function startGame() {
        questions = fetchQuestions();
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        
        totalQuestions.textContent = questions.length;
        totalCount.textContent = questions.length;
        currentScore.textContent = score;
        
        homeScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        displayQuestion();
    }
    
    // Mostrar a pergunta atual
    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        
        optionA.textContent = "A) " + question.options[0];
        optionB.textContent = "B) " + question.options[1];
        optionC.textContent = "C) " + question.options[2];
        optionD.textContent = "D) " + question.options[3];
        
        currentQuestion.textContent = currentQuestionIndex + 1;
        
        // Atualizar barra de progresso
        const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = progressPercentage + '%';
        
        // Remover classes das opções
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
            option.disabled = false;
        });
    }
    
    // Verificar resposta
    function checkAnswer(selectedOption) {
        const question = questions[currentQuestionIndex];
        const correctOptionIndex = question.answer.charCodeAt(0) - 65; // Converter A, B, C, D para 0, 1, 2, 3
        const correctOptionElement = options[correctOptionIndex];
        
        // Desabilitar todas as opções após escolher
        options.forEach(option => {
            option.disabled = true;
        });
        
        gameScreen.classList.add('hidden');
        feedbackScreen.classList.remove('hidden');
        
        if (selectedOption.dataset.option === question.answer) {
            // Resposta correta
            selectedOption.classList.add('correct');
            correctFeedback.classList.remove('hidden');
            incorrectFeedback.classList.add('hidden');
            
            score += prizes[currentQuestionIndex];
            currentWin.textContent = prizes[currentQuestionIndex].toLocaleString('pt-BR');
            correctAnswers++;
        } else {
            // Resposta incorreta
            selectedOption.classList.add('incorrect');
            correctOptionElement.classList.add('correct');
            correctFeedback.classList.add('hidden');
            incorrectFeedback.classList.remove('hidden');
            correctAnswer.textContent = question.answer;
        }
        
        currentScore.textContent = score.toLocaleString('pt-BR');
    }
    
    // Ir para próxima pergunta ou finalizar
    function nextQuestion() {
        currentQuestionIndex++;
        
        feedbackScreen.classList.add('hidden');
        
        if (currentQuestionIndex < questions.length) {
            gameScreen.classList.remove('hidden');
            displayQuestion();
        } else {
            showResults();
        }
    }
    
    // Mostrar tela de resultados
    function showResults() {
        resultScreen.classList.remove('hidden');
        correctCount.textContent = correctAnswers;
        finalScore.textContent = score.toLocaleString('pt-BR');
        
        // Definir mensagem com base na pontuação
        if (correctAnswers === questions.length) {
            resultMessage.textContent = "🎉 PARABÉNS! Você é o novo milionário!";
            trophyContainer.classList.remove('hidden');
        } else if (correctAnswers >= questions.length * 0.7) {
            resultMessage.textContent = "👏 Muito bem! Você tem um ótimo conhecimento!";
        } else if (correctAnswers >= questions.length * 0.4) {
            resultMessage.textContent = "🙂 Bom trabalho! Continue praticando.";
        } else {
            resultMessage.textContent = "😢 Não foi dessa vez, mas continue praticando!";
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', startGame);
    
    nextBtn.addEventListener('click', nextQuestion);
    
    restartBtn.addEventListener('click', startGame);
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            checkAnswer(this);
        });
    });
});