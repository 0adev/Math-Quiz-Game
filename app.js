const startButton = document.getElementById("start-button");
const refreshIcon = document.getElementById("refresh-icon");
const firstSection = document.querySelector(".first-section");
const secondSection = document.querySelector(".second-section");
const thirdSection = document.querySelector(".third-section");
const timeDisplay = document.querySelector(".time-number");
const scoreDisplay = document.querySelector(".score");
const questionDisplay = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const nextButton = document.querySelector(".next-btn");
const finalScoreDisplay = document.querySelector(".score-info .score span");
const finalTimeDisplay = document.querySelector(".score-info .time span");
const totalQuestionsDisplay = document.querySelector(".score-info .total span");
const retryButton = document.querySelector("#retry-btn");
const spinner = document.querySelector("#spinner");

const quizQuestions = [
  { question: "22 + 16", options: [12, 22, 38, 50], answer: 38, score: 10 },
  { question: "15 x 3", options: [45, 35, 25, 15], answer: 45, score: 20 },
  { question: "9 - 7", options: [2, 4, 8, 0], answer: 2, score: 15 },
  { question: "10 + 5", options: [10, 20, 15, 5], answer: 15, score: 25 },
  { question: "100 ÷ 4", options: [50, 25, 20, 10], answer: 25, score: 30 },
];

let currentQuestionIndex = 0;
let score = 0;
let correctAnswer = 0;
let timeLeft = 60;
let timerInterval;
let quizData;

function showSpinner() {
  spinner.style.display = "block";
  spinner.style.animation = "loop 500ms linear infinite both";
}
function hideSpinner() {
  spinner.style.display = "none";
  spinner.style.animation = "block";
}

// Start the quiz
function startQuiz() {
  showSpinner();
  setTimeout(() => {
    hideSpinner();
    firstSection.style.display = "none";
    secondSection.style.display = "grid";
    score = 0;
    currentQuestionIndex = 0;
    correctAnswer = 0;
    startTimer();
    loadQuestion();
  }, Math.floor(Math.random() * 3000)); // generates random numbers of milliseconds between 0 (inclusive) and 3000 (exclusive).
}

// Load the current question
function loadQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionDisplay.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.id = "option";
    button.textContent = option;
    button.addEventListener("click", () =>
      checkAnswer(option, currentQuestion.score)
    );
    optionsContainer.appendChild(button);
  });

  scoreDisplay.textContent = `Score: ${score}`;
}

// Check if the selected answer is correct
function checkAnswer(selectedOption, questionScore) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score += questionScore;
    correctAnswer++;
  }
  nextQuestion();
}

// Move to the next question or end the quiz
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Start the timer
function startTimer() {
  timeLeft = 60;
  timeDisplay.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// End the quiz
function endQuiz() {
  clearInterval(timerInterval);
  secondSection.style.display = "none";
  thirdSection.style.display = "grid";
  finalScoreDisplay.textContent = score;
  finalTimeDisplay.textContent = `${60 - timeLeft}s`;
  totalQuestionsDisplay.textContent = correctAnswer;
}

// Restart the quiz
function retryQuiz() {
  thirdSection.style.display = "none";
  firstSection.style.display = "grid";
}

// Event listeners
startButton.addEventListener("click", startQuiz);
retryButton.addEventListener("click", retryQuiz);
