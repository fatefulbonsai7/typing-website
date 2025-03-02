// DOM elements
const textPrompt = document.getElementById('textPrompt');
const userInput = document.getElementById('userInput');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timeDisplay = document.getElementById('time');
const resetBtn = document.getElementById('resetBtn');
const newTextBtn = document.getElementById('newTextBtn');

// Sample texts for typing practice
const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
    "Learning to type faster can save you hours of time and increase your productivity significantly.",
    "Practice makes perfect. Regular typing exercises can help improve your speed and accuracy.",
    "Good typing skills are essential in today's digital world where most communication happens via keyboards."
];

// Variables for tracking
let startTime;
let timerInterval;
let currentText = sampleTexts[0];
let mistakes = 0;
let isTimerRunning = false;

// Initialize the app
function init() {
    textPrompt.textContent = currentText;
    userInput.value = '';
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timeDisplay.textContent = '0:00';
    mistakes = 0;
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    isTimerRunning = false;
}

// Start the timer
function startTimer() {
    startTime = new Date();
    isTimerRunning = true;
    
    timerInterval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Calculate WPM
        calculateWPM(elapsedTime);
    }, 1000);
}

// Calculate Words Per Minute
function calculateWPM(elapsedTimeInSeconds) {
    if (elapsedTimeInSeconds === 0) return;
    
    // Assuming average word is 5 characters
    const typedCharacters = userInput.value.length;
    const typedWords = typedCharacters / 5;
    const minutes = elapsedTimeInSeconds / 60;
    const wpm = Math.round(typedWords / minutes);
    
    wpmDisplay.textContent = wpm;
}

// Calculate accuracy
function calculateAccuracy() {
    const totalCharacters = userInput.value.length;
    if (totalCharacters === 0) return 100;
    
    const accuracy = Math.round(((totalCharacters - mistakes) / totalCharacters) * 100);
    accuracyDisplay.textContent = `${accuracy}%`;
}

// Check input against prompt text
function checkInput() {
    const promptText = textPrompt.textContent;
    const userText = userInput.value;
    
    let correctChars = 0;
    for (let i = 0; i < userText.length; i++) {
        if (i >= promptText.length || userText[i] !== promptText[i]) {
            if (userText.length > promptText.length && i >= promptText.length) {
                mistakes++;
            } else if (userText[i] !== promptText[i]) {
                mistakes++;
            }
        } else {
            correctChars++;
        }
    }
    
    // Calculate accuracy
    calculateAccuracy();
    
    // Check if completed
    if (userText === promptText) {
        clearInterval(timerInterval);
        userInput.style.backgroundColor = '#e6ffe6'; // Light green
    }
}

// Get a new random text
function getNewText() {
    const prevText = currentText;
    while (currentText === prevText) {
        currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    }
    init();
}

// Event listeners
userInput.addEventListener('input', () => {
    if (!isTimerRunning && userInput.value.length > 0) {
        startTimer();
    }
    checkInput();
});

resetBtn.addEventListener('click', init);
newTextBtn.addEventListener('click', getNewText);

// Initialize on load
init();
