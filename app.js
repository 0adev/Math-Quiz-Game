const firstSection = document.querySelector(".first-section");
const secondSection = document.querySelector(".second-section");
const thirdSection = document.querySelector(".third-section");
const startButton = document.querySelector("#start-button");
const spinner = document.querySelector("#spinner");
const timeDisplay = document.querySelector(".second-section .time-number");
const clockIcon = document.querySelector("#clock");
const scoreDisplay = document.querySelector(".second-section .score");
const questionDisplay = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const finalScoreDisplay = document.querySelector(".third-section .score span");
const finalTimeDisplay = document.querySelector(".third-section .time span");
const totalCorrectAnswers = document.querySelector(
  ".third-section .total span"
);
const retryButton = document.querySelector("#retry-button");

const quizQuestions = [
  { question: "22 + 16", options: [12, 22, 38, 50], answer: 38, score: 25 },
  { question: "15 x 3", options: [45, 35, 25, 15], answer: 45, score: 20 },
  { question: "9 - 7", options: [2, 4, 8, 0], answer: 2, score: 15 },
  { question: "10 + 5", options: [10, 20, 15, 5], answer: 15, score: 10 },
  { question: "100 ÷ 4", options: [50, 25, 20, 10], answer: 25, score: 30 },
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let correctAnswers = 0;
let timerInterval;

function showSpinner() {
  spinner.style.display = "block";
  spinner.style.animation = "spine 500ms linear infinite both";
}

function hideSpinner() {
  spinner.style.display = "none";
  spinner.style.animation = "none";
}

function startQuiz() {
  showSpinner();
  setTimeout(() => {
    hideSpinner();
    firstSection.style.display = "none";
    secondSection.style.display = "grid";
    clockIcon.style.animation = "none";
    score = 0;
    correctAnswers = 0;
    currentQuestionIndex = 0;
    loadQuiz();
    startTimer();
  }, Math.floor(Math.random() * 3000));
}

function loadQuiz() {
  let currentQuestion = quizQuestions[currentQuestionIndex];
  questionDisplay.innerHTML = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.setAttribute("id", "option");
    button.innerHTML = option;
    button.addEventListener("click", () =>
      checkAnswer(option, currentQuestion.score)
    );

    optionsContainer.appendChild(button);
  });
  scoreDisplay.innerHTML = `Score: ${score}`;
}

function checkAnswer(selectedOption, questionScore) {
  let currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.answer) {
    score += questionScore;
    correctAnswers++;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuiz();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeLeft = 20;
  timeDisplay.innerHTML = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    } else if (timeLeft < 10) {
      clockIcon.style.animation = "vibration 250ms linear infinite";
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  secondSection.style.display = "none";
  thirdSection.style.display = "grid";
  finalScoreDisplay.innerHTML = score;
  finalTimeDisplay.innerHTML = `${60 - timeLeft}s`;
  totalCorrectAnswers.innerHTML = correctAnswers;
}

function retryQuiz() {
  thirdSection.style.display = "none";
  firstSection.style.display = "grid";
}

startButton.addEventListener("click", startQuiz);
retryButton.addEventListener("click", retryQuiz);
