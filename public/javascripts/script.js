document.addEventListener('DOMContentLoaded', (event) => {
    let count = 0;
    let timerStarted = false; // Flag to check if timer has started
    const counterElement = document.getElementById('counter');
    const incrementButton = document.getElementById('cookiebutton');
    const highScoreElement = document.getElementById('highscore');

    // Display the high score
    const highScore = getCookie('highScore');
    const highScoreName = getCookie('highScoreName');
    if (highScore && highScoreName) {
        highScoreElement.textContent = `High Score: ${highScore} by ${highScoreName}`;
    }

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
    const timer = setInterval(function() {
        count--;
        timeleft.textContent = count;
        if (count === 0) {
            clearInterval(timer);
            const score = parseInt(document.getElementById('counter').textContent, 10);
            let playerName = prompt('Time is up! Enter your name:');
            if (playerName) {
                checkHighScore(score, playerName);
            }
            location.reload();
        }
    }, 1000);
}

function checkHighScore(score, playerName) {
    const highScore = getCookie('highScore');
    if (!highScore || score > parseInt(highScore, 10)) {
        setCookie('highScore', score, 365);
        setCookie('highScoreName', playerName, 365);
        alert(`New high score! ${score} by ${playerName}`);
    } else {
        alert(`Your score is ${score}. High score is still ${highScore} by ${getCookie('highScoreName')}`);
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = `${name}=; Max-Age=-99999999;`;
}
