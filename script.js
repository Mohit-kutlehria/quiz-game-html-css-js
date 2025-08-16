let startBtn = document.querySelector('.startBtn');
let infoBox = document.querySelector('.infoBox');
let exitBtn = document.querySelector('.exitBtn');
let continueBtn = document.querySelector('.continueBtn');
let quixBox = document.querySelector('.quiz-box');
let questionText = document.querySelector('.questionText');
let allOptions = document.querySelectorAll('.options');
let nextBtn = document.querySelector('.nextBtn');
let timeLine = document.querySelector('.timeline');
let currentQusetionIndicator = document.querySelector('.currentQuestionIndicator');
let progressBar = document.querySelector('.progressBar');

let currentQusetionIndex = 0;
let userScore = 0;
let timeLineInterval = null;
let progressBarInterval = null;

startBtn.addEventListener('click', () => {
  infoBox.classList.add('activeInfoBox');
});


exitBtn.addEventListener('click', () => {
  infoBox.classList.remove('activeInfoBox');
});

nextBtn.addEventListener('click', () => {
  if (currentQusetionIndex < 9) {
    currentQusetionIndex = currentQusetionIndex + 1;

    handleTiming(15);
    handleProgressBar();

    showQuestion(currentQusetionIndex);
  }
});

continueBtn.addEventListener('click', () => {
  infoBox.classList.remove('activeInfoBox');
  quixBox.classList.add('activeQuizBox');

  showQuestion(currentQusetionIndex);
  handleTiming(15);
  handleProgressBar();
});


const showQuestion = (index) => {
  questionText.innerHTML = '' + questions?.[index].numb + '. ' + questions?.[index].question;

  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].innerText = questions?.[index].options?.[i];
    allOptions[i]?.addEventListener('click', optionClickHandler);
  }

  currentQusetionIndicator.innerText = index + 1;
};


const handleTiming = (time) => {
  clearInterval(timeLineInterval);
  timeLine.innerText = time;
  let timeValue = time;
  timeLineInterval = setInterval(() => {
    timeValue--;

    if (timeValue < 10) {
      timeLine.innerText = '0' + timeValue;
    } else {
      timeLine.innerText = timeValue;
    }

    if (timeValue === 0) {
      clearInterval(timeLineInterval);
    }
  }, 1000);
};



const handleProgressBar = () => {
  clearInterval(progressBarInterval);
  progressBar.style.width = '0%';
  let currentPercentage = 0;
  progressBarInterval = setInterval(() => {
    currentPercentage += 1 / 15;
    progressBar.style.width = currentPercentage + '%';

    if (currentPercentage >= 100) {
      clearInterval(progressBarInterval);
    }
  }, 10);
};


const TickIcon = `<div class="icon tick"><i class="fa-solid fa-check"></i></div>`;
const CrossIcon = `<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>`;


const optionClickHandler = (e) => {
  clearInterval(progressBarInterval);
  clearInterval(timeLineInterval);
  const userAnswer = e.target.innerText;
  const correctAnswer = questions[currentQusetionIndex].answer;

  if (userAnswer === correctAnswer) {
    userScore++;
    e.target.classList.add('correct');
    e.target.insertAdjacentHTML('beforeend', TickIcon);
  } else {
    e.target.classList.add('incorrect');
    e.target.insertAdjacentHTML('beforeend', CrossIcon);
  }

  for (let i = 0; i < allOptions?.length; i++) {
      allOptions[i].classList.add('disabled');

      if(userAnswer !== correctAnswer && allOptions[i].innerText === correctAnswer) {
        allOptions[i].classList.add('correct');
        allOptions[i].insertAdjacentHTML('beforeend', TickIcon);
      }
  }
};