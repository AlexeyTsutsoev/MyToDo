const icon = document.getElementById('darkMode');
const body = document.getElementById('body');

icon.addEventListener('click', (event) => {
    if (event.target.getAttribute('data-mode') === 'light') {
        body.style.backgroundImage = 'url(src/dark_background.jpg)';
        event.target.setAttribute('data-mode', 'dark');
        event.target.style.backgroundColor = 'gray';

    } else if (event.target.getAttribute('data-mode') === 'dark') {
        body.style.backgroundImage = 'url(src/light_background.jpg)';
        event.target.setAttribute('data-mode', 'light');
        event.target.style.backgroundColor = '';
    }
});