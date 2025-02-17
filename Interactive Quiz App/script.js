const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Rome", "Madrid", "Berlin"],
        answer: "Paris",
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
    {
        question:
            "Which programming language is known as the language of the web?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: "JavaScript",
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(option);
        optionsElement.appendChild(button);
    });
}

function handleAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    scoreElement.style.display = "block";
    restartButton.style.display = "block";
    scoreElement.textContent = `You scored ${score} out of ${quizData.length}!`;
}

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    questionElement.style.display = "block";
    optionsElement.style.display = "grid";
    scoreElement.style.display = "none";
    restartButton.style.display = "none";
    loadQuestion();
});

loadQuestion();