const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be, or not to be, that is the question.",
    "All that glitters is not gold.",
    "The only thing we have to fear is fear itself."
];

let timeLeft = 60;
let interval;
let score = 0;

const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
const scoreElement = document.createElement('p');
const correctSound = document.getElementById('correctSound');
const backgroundMusic = document.getElementById('backgroundMusic');

scoreElement.className = 'score';
scoreElement.textContent = `Score: ${score}`;
document.querySelector('.container').appendChild(scoreElement);

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}s`;
    quoteInput.disabled = false;
    quoteInput.focus();
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    resultElement.textContent = '';
    backgroundMusic.play();
    nextQuote();
    
    interval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            quoteInput.disabled = true;
            startButton.style.display = 'none';
            restartButton.style.display = 'block';
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            resultElement.textContent = `Game Over! You scored ${score} points.`;
        }
    }, 1000);
}

function restartGame() {
    startButton.style.display = 'block';
    restartButton.style.display = 'none';
    resultElement.textContent = '';
    timerElement.textContent = `Time: 60s`;
    quoteInput.value = '';
    quoteDisplay.textContent = '';
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function nextQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = quote;
    quoteInput.value = '';
    quoteInput.focus();

    quoteInput.removeEventListener('input', checkInput); // Remove previous event listener
    quoteInput.addEventListener('input', checkInput); // Add new event listener
}

function checkInput() {
    const quote = quoteDisplay.textContent;
    const input = quoteInput.value;

    if (input === quote) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        correctSound.play();
        nextQuote();
    } else {
        highlightIncorrect(input, quote);
    }
}

// function highlightIncorrect(input, quote) {
//     let correctText = '';
//     let incorrectText = '';
//     let isCorrect = true;

//     for (let i = 0; i < input.length; i++) {
//         if (input[i] === quote[i] && isCorrect) {
//             correctText += input[i];
//         } else {
//             isCorrect = false;
//             incorrectText += input[i];
//         }
//     }

//     const remainingText = quote.substring(input.length);
//     const highlightedText = `<span>${correctText}</span><span class="incorrect">${incorrectText}</span><span>${remainingText}</span>`;

//     quoteDisplay.innerHTML = highlightedText;
// }
