document.addEventListener('DOMContentLoaded', async (event) => {
    let count = 0;
    let timerStarted = false; // Flag to check if timer has started
    const counterElement = document.getElementById('counter');
    const incrementButton = document.getElementById('cookiebutton');
    const highScoreElement = document.getElementById('highscore');

    // Display the high score
    await displayHighScore();

    incrementButton.addEventListener('click', () => {
        if (!timerStarted) {
            timer(5); // Start the timer on the first click
            timerStarted = true;
        }
        count++;
        counterElement.textContent = count;
    });
});

function playbutton() {
    window.location.href = "/game";
}

function homebutton() {
    window.location.href = "/";
}

function timer(howmuch) {
    let count = howmuch;
    const timeleft = document.getElementById('timeleft');
    const incrementButton = document.getElementById('cookiebutton');
    const timer = setInterval(function() {
        count--;
        timeleft.textContent = count;
        if (count === 0) {
            clearInterval(timer);
            const score = parseInt(document.getElementById('counter').textContent, 10);
            incrementButton.disabled = true; // Disable the cookie button

            // Prompt user for name
            const playerName = prompt('Time is up! Enter your name to save your score:');
            if (playerName) {
                submitScore(score, playerName);
            } else {
                alert('Please enter your name to save your score.');
                resetGame();
            }
        }
    }, 1000);
}

async function submitScore(score, playerName) {
    await checkHighScore(score, playerName);
    resetGame();
}

async function checkHighScore(score, playerName) {
    const response = await fetch('/highscore');
    const highScoreData = await response.json();
    const highScore = highScoreData.score;
    if (!highScore || score > highScore) {
        await fetch('/highscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ score: score, name: playerName })
        });
        displayHighScore();
    }
}

async function displayHighScore() {
    const response = await fetch('/highscore');
    const highScoreData = await response.json();
    const highScoreElement = document.getElementById('highscore');
    highScoreElement.textContent = `High Score: ${highScoreData.score} by ${highScoreData.name}`;
}

function resetGame() {
    count = 0;
    timerStarted = false;
    document.getElementById('counter').textContent = 0;
    document.getElementById('timeleft').textContent = 5;
    document.getElementById('cookiebutton').disabled = false; // Re-enable the cookie button
    location.reload()
}
