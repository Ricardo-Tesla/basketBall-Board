// Define constants for DOM elements
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resumeButton = document.getElementById("resume-btn");


// Define game state variables
let timerInterval;
let startTime;
let pausedTime = 0;
let periods = 0;
let hfouls = 0;
let vfouls = 0;
let homePoints = 0;
let visitorPoints = 0;

// Functions for timer control
function startTimer() {
    if (!timerInterval) {
        startTime = Date.now() + 240000; // 4 minutes
        timerInterval = setInterval(updateTimer, 1000);
        toggleButtons(true);
    }
    updateDisplay();
}

function resumeTimer() {
    startTime = Date.now() + pausedTime;
    timerInterval = setInterval(updateTimer, 1000);
    toggleButtons(true);
}

// Update pauseTimer function to handle resume button
function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        pausedTime = startTime - Date.now();
        toggleButtons(false);
    } else {
        resumeTimer(); // Call resumeTimer function when the timer is paused
    }
}

function updateTimer() {
    const elapsedTime = startTime - Date.now();
    if (elapsedTime <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.innerText = "00:00";
        toggleButtons(false);
        // Optionally, call a function for timer completion
    } else {
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
        timerDisplay.innerText = formattedTime;
    }
}

function padZero(number) {
    return (number < 10) ? `0${number}` : number;
}

// Event listeners for buttons
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resumeButton.addEventListener("click", resumeTimer);

// Function to toggle button states
function toggleButtons(running) {
    startButton.disabled = running;
    pauseButton.disabled = !running;
}
function period() {
    periods++;
    updateDisplay();
}

function homeFouls() {
    hfouls++;
    updateDisplay();
}

function visitorFouls() {
    vfouls++;
    updateDisplay();
}

function honePointer() {
    homePoints++;
    updateDisplay();
}

function htwoPointer() {
    homePoints += 2;
    updateDisplay();
}

function hthreePointer() {
    homePoints += 3;
    updateDisplay();
}

function vonePointer() {
    visitorPoints++;
    updateDisplay();
}

function vtwoPointer() {
    visitorPoints += 2;
    updateDisplay();
}

function vthreePointer() {
    visitorPoints += 3;
    updateDisplay();
}


function updateDisplay() {
    document.getElementById("period").innerText = periods;
    document.getElementById("home-fouls").innerText = hfouls;
    document.getElementById("visitor-fouls").innerText = vfouls;
    document.getElementById("home-points").innerText = homePoints;
    document.getElementById("visitor-points").innerText = visitorPoints;
}


function reset() { 
    periods = 0;
    vfouls = 0;
    hfouls = 0;
    homePoints = 0;
    visitorPoints = 0;
    updateDisplay();
}
