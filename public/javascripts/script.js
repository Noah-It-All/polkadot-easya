document.addEventListener('DOMContentLoaded', (event) => {
    let count = 0;
    let timerStarted = false; // Flag to check if timer has started
    let timerInterval; // Variable to hold the timer interval ID
    const counterElement = document.getElementById('counter');
    const incrementButton = document.getElementById('cookiebutton');
    const popup = document.getElementById('popup');
    const finalScoreElement = document.getElementById('final-score');
    const playAgainButton = document.getElementById('play-again');
    const timeleft = document.getElementById('timeleft');

    incrementButton.addEventListener('click', () => {
        if (!timerStarted) {
            startTimer(5); // Start the timer on the first click
            timerStarted = true;
        }
        count++;
        counterElement.textContent = count;
    });

    playAgainButton.addEventListener('click', () => {
        // Hide the popup and reset the game
        popup.style.display = 'none';
        count = 0;
        counterElement.textContent = count;
        resetTimer(); // Reset the timer
    });

    function startTimer(duration) {
        let remainingTime = duration;
        timeleft.textContent = remainingTime;
        timerInterval = setInterval(function() {
            remainingTime--;
            timeleft.textContent = remainingTime;
            if (remainingTime === 0) {
                clearInterval(timerInterval);
                finalScoreElement.textContent = counterElement.textContent;
                popup.style.display = 'flex'; // Show the popup
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval); // Clear the existing timer
        timeleft.textContent = '5'; // Reset the timer display to 5 seconds
        timerStarted = false; // Allow the timer to be started again
    }
});

function playbutton() {
    window.location.href = "/game";
}

function homebutton() {
    window.location.href = "/";
}
