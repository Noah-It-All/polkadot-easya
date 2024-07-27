document.addEventListener('DOMContentLoaded', (event) => {
    let count = 0;
    const counterElement = document.getElementById('counter');
    const incrementButton = document.getElementById('cookiebutton');
    timer(5)
    incrementButton.addEventListener('click', () => {
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
    const timeleft = document.getElementById('timeleft')
    const timer = setInterval(function() {
      count--;
      console.log(count);
      timeleft.textContent = count;
      if (count === 0) {
        clearInterval(timer);
        alert('Time is up! Your score is ' + document.getElementById('counter').textContent);
        window.location.href = "/";
      }
    }, 1000);
}