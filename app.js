class Task {
    constructor(value) {
        this.value = value;
        this.isComplited = false;
    }
}


let toDoList = [];
let container = document.getElementById('Container'); //div, где хранятся все элементы
let buttom = document.getElementById('Ok'); // кнопка подтверждения
let list = document.createElement('ul'); // создание пустого списка
let input = document.getElementById('task'); // строка
let forTasks = document.getElementById('tasks');

function addTask() {
    console.log('обработчик сработал');
    let task = `<li>${new Task(input.value).value}</li>`; // получение введенного значения
    if (toDoList.length == 0) { //проверка на то первый ли элемент в массив
        console.log('ToDoList пустой'); // логирование
        forTasks.insertAdjacentHTML('beforeend', '<h3>Ваш список дел: </h3>'); // создание заголовка
        forTasks.insertAdjacentElement('beforeend', list); // вставка списка
    }
    toDoList.push(input.value); // добавление значения в массив
    list.insertAdjacentHTML('beforeend', task); // добавление значения на страницу
    input.value = ''; //очистка строки
}

//обработчики
buttom.addEventListener('click', addTask);
input.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        addTask();
    }
});
list.addEventListener('click', function(event) {
    console.log('сработал обработчик для списка');
    let target = event.target;
    console.log(event.target);
    if (getComputedStyle(target).textDecoration == 'line-through solid rgb(0, 0, 0)') {
        target.style.setProperty("text-decoration", "none");
        console.log('зачеркивание отменено')
    } else {
        target.style.setProperty("text-decoration", "line-through");
        console.log('текст зачеркнут');
    }
})