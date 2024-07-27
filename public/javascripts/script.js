document.addEventListener('DOMContentLoaded', (event) => {
    let count = 0;
    const counterElement = document.getElementById('counter');
    const incrementButton = document.getElementById('cookiebutton');

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