class Task {
    constructor(value, id = 0) {
        this.value = value;
        this.id = id;
        this.isComplite = false;
        this.isEdit = false;
    }
}

//глобальные переменные
let ToDoArr = [];
const container = document.getElementById('tasks'); //контейнер для хранения списка
const button = document.getElementById('Ok'); // кнопка подтверждения
const input = document.getElementById('task'); //строка ввода

//функция обновления массива
function updateToDoArr(value, arr) {
    let task = new Task(value, arr.length);
    arr.push(task);
}

//удаление из массива
function deleteTask(id, arr) {
    arr.splice(id, 1);
}


function createDiv(index, Iscomplite, value) {
    //создание div'a
    let div = document.createElement('div');
    div.setAttribute('id', index);
    div.setAttribute('data-is', Iscomplite);
    div.textContent = value;

    //создание кнопки удаления
    let bin = document.createElement('input');
    bin.setAttribute('type', 'image');
    bin.setAttribute('id', 'bin');
    bin.setAttribute('src', 'src/garbage.png');
    bin.setAttribute('class', 'Bin');

    //создание кнопки редактирования
    let update = document.createElement('input');
    update.setAttribute('type', 'image');
    update.setAttribute('id', 'update');
    update.setAttribute('src', 'src/update.png');
    update.setAttribute('class', 'Bin');

    //добавление кнопок
    div.append(bin);
    div.append(update);

    return div;
}

function createInput(index, value) {
    //создание input
    let input = document.createElement('input');
    input.setAttribute('id', index);
    input.setAttribute('value', value);
    input.setAttribute('type', 'text');

    console.log(input);

    return input;
}

function updateTask(arr, id, value) {
    console.log(`Первоначальное значение в массиве: ${arr[id].isEdit} и значение текста: ${arr[id].value}`);

    if (arr[id].isEdit === false) {
        arr[id].isEdit = true;
    } else {
        arr[id].isEdit = false;
    }
    console.log(`значение в массиве: ${arr[id].isComplite} и значение текста: ${arr[id].value}`);
    arr[id].value = value;
}

//функция перечеркивания
function isComplited(container, arr, id) {
    let childs = container.childNodes;
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


//функция отрисовки элементов
function render(arr) {
    //подготовка
    console.log('отрисовка началась');
    container.innerHTML = ''; // очистка контейнера
    container.insertAdjacentHTML('beforebegin', '');

    if (arr.length !== 0) { //проверка, что есть что отрисовывать
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isEdit === false) {
                container.insertAdjacentElement('beforeend', createDiv(i, arr[i].isComplite, arr[i].value));
                if (arr[i].isComplite === true) {
                    container.childNodes[i].style.setProperty("text-decoration", "line-through");
                }
            } else if (arr[i].isEdit === true) {
                container.insertAdjacentElement('beforeend', createInput(i, arr[i].value));
            }
        }
    }
    console.log('отрисовка закончена');
}

//заготовка для слушателя событий
function listener(value, arr) {
    if (value.length > 0) {
        updateToDoArr(value, arr);
        render(arr);
        console.log(arr);
    } else return;
}


//обработчик на кнопку
button.addEventListener('click', (event) => {
    listener(input.value, ToDoArr)
    input.value = '';
});

//обработчик на инпут
input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        listener(input.value, ToDoArr);
        input.value = '';
    }
});

//обработчик на контейнер
container.addEventListener('click', (event) => {
    console.log(`событие на ${event.target.id}`);
    if (event.target.tagName === 'DIV') {
        isComplited(container, ToDoArr, event.target.id);
    }

    switch (event.target.id) {
        case 'bin':
            deleteTask(event.target.parentNode.id, ToDoArr);
            render(ToDoArr);
            break;
        case 'update':
            updateTask(ToDoArr, event.target.parentNode.id, event.target.parentNode.textContent);
            render(ToDoArr);
            break;
    }
});

container.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        console.log(event.target);
        updateTask(ToDoArr, event.target.id, event.target.value);
        render(ToDoArr);
    }
})