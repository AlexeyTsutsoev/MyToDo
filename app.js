class Task {
    constructor(value, id = 0) {
        this.value = value;
        this.id = id;
        this.isDone = false;
        this.isEdit = false;
    }
}

//глобальные переменные
let toDoArr = [];
let binArr = [];
const container = document.getElementById('tasks'); //контейнер для хранения списка
const button = document.getElementById('Ok'); // кнопка подтверждения
const inputText = document.getElementById('task'); //строка ввода
const bottom = document.getElementsByClassName('Bottom');


//первичная инициализация
if (localStorage.getItem('toDo')) {
    toDoArr = JSON.parse(localStorage.getItem('toDo'));
    render(toDoArr);
}
if (localStorage.getItem('binArr')) {
    binArr = JSON.parse(localStorage.getItem('binArr'));
}


//функция обновления массива
function updateToDoArr(value, arr) {
    let task = new Task(value, arr.length);
    arr.push(task);
}

//удаление из массива
function deleteTaskAndSendToBin(id, arr, bin) {
    bin.push(arr[id]);
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
    bin.setAttribute('class', 'Icons');

    //создание кнопки редактирования
    let update = document.createElement('input');
    update.setAttribute('type', 'image');
    update.setAttribute('id', 'update');
    update.setAttribute('src', 'src/update.png');
    update.setAttribute('class', 'Icons');

    //добавление кнопок
    div.append(bin);
    div.append(update);

    return div;
}

function createForm(index, value) {
    //создание формы для input
    let form = document.createElement('form');

    //создание input
    let inputText = document.createElement('input');
    inputText.setAttribute('id', index);
    inputText.setAttribute('value', value);
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('maxlength', '30');

    //создание кнопки
    let submit = document.createElement('input');
    submit.setAttribute('type', 'button');
    submit.setAttribute('value', 'подтвердить');

    //сборка формы
    form.append(inputText);
    form.append(submit);

    console.log(form);

    return form;
}

function updateTask(arr, id, value) {
    if (arr[id].isEdit === false) {
        arr[id].isEdit = !arr[id].isEdit;
    } else {
        arr[id].isEdit = !arr[id].isEdit;
    }
    arr[id].value = value;
}

//функция перечеркивания
function isDoned(container, arr, id) {
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
                container.insertAdjacentElement('beforeend', createForm(i, arr[i].value));
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
button.addEventListener('click', () => {
    listener(inputText.value, toDoArr)
    inputText.value = '';
});

//обработчик на инпут
inputText.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        listener(inputText.value, toDoArr);
        inputText.value = '';
    } else if (event.keyCode === 17) {
        console.log(JSON.stringify(toDoArr));
    }
});

//обработчик на контейнер
container.addEventListener('click', (event) => {
    console.log(`событие на ${event.target.id}`);
    if (event.target.tagName === 'DIV') {
        isDoned(container, toDoArr, event.target.id);
    }
    if (event.target.type === 'button') {
        updateTask(toDoArr, event.target.parentNode.firstChild.id, event.target.parentNode.firstChild.value);
        render(toDoArr);
    }

    switch (event.target.id) {
        case 'bin':
            deleteTaskAndSendToBin(event.target.parentNode.id, toDoArr, binArr);
            render(toDoArr);
            break;
        case 'update':
            updateTask(toDoArr, event.target.parentNode.id, event.target.parentNode.textContent);
            render(toDoArr);
            console.log(event.target);
            break;
    }
});

container.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        console.log(event.target);
        updateTask(toDoArr, event.target.id, event.target.value);
        render(toDoArr);
    }
});

bottom[0].addEventListener('click', (event) => {
    switch (event.target.id) {
        case 'bin':
            if (event.target.checked) {
                render(binArr);
            } else render(toDoArr);
            break;
        case 'notDone':
            if (event.target.checked) {
                render(toDoArr.filter(item => !item.isComplite));
            } else render(toDoArr);
            break;
        case 'done':
            if (event.target.checked) {
                render(toDoArr.filter(item => item.isComplite));
            } else render(toDoArr);
    }
});

window.addEventListener('unload', () => {
    localStorage.setItem('toDo', JSON.stringify(toDoArr));
    localStorage.setItem('binArr', JSON.stringify(binArr));
});