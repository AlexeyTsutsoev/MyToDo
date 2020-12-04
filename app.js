class Task {
    constructor(value, id = 0) {
        this.value = value;
        this.id = id;
        this.isComplite = false;
    }
}

let toDoList = [];
let container = document.getElementById('Container'); //div, где хранятся все элементы
let buttom = document.getElementById('Ok'); // кнопка подтверждения
let list = document.createElement('ul'); // создание пустого списка
let input = document.getElementById('task'); // строка
let forTasks = document.getElementById('tasks');

function addToArrWithId(value, arr) {
    let task = new Task(value, arr.length);
    arr.push(task);
}

function createLi(index, bool, value) {
    let bin = `<input type="image" id = "bin" src="src/garbage.png" class = "Bin">`;
    let update = `<input type="image" id ="update" src="src/update.png" class = "Bin">`;
    let li = `<li id="${index}" data-is = "${bool}">${value} ${bin} ${update}</li>`
    let container = `<div display = "inline">${li} ${bin} ${update}</div>`
    return li;
}

function deleteTask(elem, arr) {
    arr.splice(elem.id, 1);
    console.log(`удален ${elem}`);
    render(arr);
}

function updateLi(elem, arr) {
    let childs = elem.childNodes;
    console.log(childs);
    let text = childs[elem.id].textContent;
    let input = `<input id="task" type="text" value="${text}">`;
    console.log(childs);
    childs[elem.id].replaceWith(input);
    childs[elem.id].addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            arr[elem.id].value = childs[elem.id].value;
            childs[elem.id].outerHTML = createLi(elem.id, arr[elem.id].isComplite, arr[elem.id].value);
            render(arr);
        }
    });
}

function render(arr) {
    console.log('отрисовка началась');
    forTasks.innerHTML = ''; //удаление старого значения
    list.innerHTML = ''; // удаление старого списка
    forTasks.insertAdjacentHTML('beforeend', '<h3>Ваш список дел: </h3>'); // создание заголовка
    forTasks.insertAdjacentElement('beforeend', list); // вставка списка
    for (let i = 0; i < arr.length; i++) {
        list.insertAdjacentHTML('beforeend', createLi(i, arr[i].isComplite, arr[i].value));
        if (arr[i].isComplite === true) {
            list.childNodes[i].style.setProperty("text-decoration", "line-through");
        }
    }
    if (arr.length === 0) {
        forTasks.innerHTML = '';
    }
    console.log('отрисовка закончена');
}

function listener(value, arr) {
    if (value.length > 0) {
        addToArrWithId(value, arr);
        render(arr);
        console.log(arr);
    } else return;
}

function isComplited(list, arr, id) {
    let childs = list.childNodes;
    console.log(childs);
    console.log(`Первоначальное значение в массиве: ${arr[id].isComplite} и значение в атрибуте: ${childs[id].dataset.is}`);

    if (arr[id].isComplite === false) {
        arr[id].isComplite = true;
        childs[id].setAttribute('data-is', 'true');
        childs[id].style.setProperty("text-decoration", "line-through");
        console.log(`значение в массиве: ${arr[id].isComplite} и значение в атрибуте: ${childs[id].dataset.is}`);
    } else {
        arr[id].isComplite = false;
        childs[id].setAttribute('data-is', 'false');
        childs[id].style.setProperty("text-decoration", "none");
        console.log(`значение в массиве: ${arr[id].isComplite} и значение в атрибуте: ${childs[id].dataset.is}`);
    }
}

//обработчики
buttom.addEventListener('click', (event) => {
    listener(input.value, toDoList)
    input.value = '';
});

input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        listener(input.value, toDoList);
        input.value = '';
    } else if (event.keyCode === 17) { // для теста
        updateLi();
    }
});


list.addEventListener('click', (event) => {
    console.log(`событие на ${event.target}`);
    if (event.target.tagName === 'LI') {
        isComplited(list, toDoList, event.target.id);
    } else if (event.target.id === 'bin') {
        deleteTask(event.target.parentNode, toDoList);
    } else if (event.target.id = 'update') {
        console.log(event.target.parentNode);
        updateLi(event.target.parentNode, toDoList);
    }
});