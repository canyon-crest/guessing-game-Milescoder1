// 1. Initial Variables & Name Prompt
let playerName = prompt("Please enter your name:");
if (playerName) {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
} else {
    playerName = "Player";
}

let answer;
let range;
let guessCount = 0;
let wins = 0;
let totalGuesses = 0;
let scoresArray = [];
let startTime;
let totalTime = 0;
let fastestTime = Infinity;

// 2. Event Listeners
document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

// 3. Live Clock logic
function time() {
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let day = now.getDate();
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";

    const dateString = `${months[now.getMonth()]} ${day}${suffix}, ${now.getFullYear()} - ${now.toLocaleTimeString()}`;
    document.getElementById("date").textContent = dateString;
    return dateString;
}
setInterval(time, 1000);
time(); // Run immediately

// 4. Core Game Functions
function play() {
    // Determine range
    const radios = document.getElementsByName("level");
    for (let r of radios) {
        if (r.checked) range = parseInt(r.value);
    }

    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    startTime = new Date().getTime();

    document.getElementById("msg").textContent = `Okay ${playerName}, I'm thinking of a number between 1 and ${range}. Guess it!`;
    
    // UI State
    document.getElementById("playBtn").disabled = true;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("guess").value = "";
}

function makeGuess() {
    const userGuess = parseInt(document.getElementById("guess").value);
    if (isNaN(userGuess)) return;

    guessCount++;
    const diff = Math.abs(userGuess - answer);
    let feedback = "";

    // Proximity Hints
    if (diff === 0) {
        feedback = `Correct! Well done, ${playerName}!`;
        endRound(guessCount);
    } else {
        const highLow = userGuess > answer ? "too high" : "too low";
        const proximity = diff <= 2 ? "hot" : diff <= 5 ? "warm" : "cold";
        feedback = `${highLow} and ${proximity}.`;
    }

    document.getElementById("msg").textContent = feedback;
}

function giveUp() {
    document.getElementById("msg").textContent = `The answer was ${answer}. Better luck next time, ${playerName}!`;
    endRound(range);
}

function endRound(score) {
    const endTime = new Date().getTime();
    
    // Update Logic
    updateScore(score);
    updateTimers(endTime);
    
    // UI State
    document.getElementById("playBtn").disabled = false;
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
}

function updateScore(score) {
    if (score < range || (score === range && document.getElementById("msg").textContent.includes("Correct"))) {
        wins++;
        document.getElementById("wins").textContent = wins;
    }

    scoresArray.push(score);
    totalGuesses += score;

    // Average Score
    document.getElementById("avgScore").textContent = (totalGuesses / scoresArray.length).toFixed(2);

    // Leaderboard
    scoresArray.sort((a, b) => a - b);
    const leaderboardItems = document.getElementsByName("leaderboard");
    for (let i = 0; i < 3; i++) {
        leaderboardItems[i].textContent = scoresArray[i] !== undefined ? scoresArray[i] : "--";
    }
}

function updateTimers(endMs) {
    const elapsed = endMs - startTime;
    totalTime += elapsed;

    if (elapsed < fastestTime) {
        fastestTime = elapsed;
        document.getElementById("fastest").textContent = fastestTime;
    }

    const avgTime = totalTime / scoresArray.length;
    document.getElementById("avgTime").textContent = avgTime.toFixed(0);
}