console.log("Часы запущены");


function getTime() {
    let time = document.getElementById('Time');
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    time.innerHTML = `${hours} : ${minutes} : ${seconds}`;
}

getTime();

setInterval(getTime, 1000);