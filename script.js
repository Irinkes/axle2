/*Функции для генерации случайных чисел в заданных диапазонах */
const getRandomA = (min, max) => {
    var randA = min - 0.5 + Math.random() * (max - min + 1)
    randA = Math.round(randA);
    return randA;
}
const getRandomSum = (min, max) => {
    var randSum = min - 0.5 + Math.random() * (max - min + 1)
    randSum = Math.round(randSum);
    return randSum;
}



/*Переменные для числа A */
let randomA = getRandomA(6,9);
let inputA = document.querySelector('.int-a-input');
let inputAWrap = document.querySelector('.int-a-input-wrapper');

/*Переменные для числа B */
let randomB = getRandomSum(11,14) - randomA;
let inputB = document.querySelector('.int-b-input');
let inputBWrap = document.querySelector('.int-b-input-wrapper');

/*Переменные для суммы чисел A и B*/
let inputSum = document.getElementById('intSumAnswer');



/* Canvas */

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let step = 39; //длина шага на линейке

/*Координаты первой стрелки*/
let startPointA = [0,85]; //начальная точка
let endPointA = [step*randomA, 85]; //конечная точка
let firstCtrlPointA = (step * randomA) / 2; //первая координата контрольной точки (середина отрезка)
let secondCtrlPointA = -50; //вторая координата контрольной точки (высота изгиба стрелки)

/*Координаты второй стрелки*/
let startPointB = [endPointA[0],endPointA[1]];
let endPointB = [(step * randomA) + (step * randomB), 85];
let firstCtrlPointB = ((step * randomA) + ((step * randomA) + (step * randomB))) / 2;
let secondCtrlPointB = 0;


/*Отрисовка стрелки, наконечника и отображение инпута над стрелкой для числа A*/
let drawArrA = (randomA) => {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = '#c44d8d';
    context.moveTo(startPointA[0], startPointA[1]);
    context.quadraticCurveTo(firstCtrlPointA, secondCtrlPointA, endPointA[0], endPointA[1]);
    context.stroke();

    /*кончик стрелки */
    context.beginPath();
    context.moveTo(endPointA[0], endPointA[1]);
    context.lineTo(endPointA[0] -15, 80);
    context.moveTo(endPointA[0], 85);
    context.lineTo(endPointA[0]-5, 72);
    context.stroke();

    /*Отобразить инпут для числа A над первой стрелкой */
    let showInputA = () => {
        inputA.style.display = 'block';
        let inputAShift = inputA.offsetWidth+(inputA.offsetWidth)/2;  //вычисляем сдвиг инпута так, чтобы он находился ровно посередине над дугой
        inputAWrap.style.position = 'absolute';
        inputAWrap.style.left = (firstCtrlPointA+inputAShift)+'px';
        inputAWrap.style.top  = (secondCtrlPointA+25)+'px';
    }
    showInputA();
}

/*Отрисовка стрелки, наконечника и отображение инпута над стрелкой для числа B*/
let drawArrB = (randomA, randomB) => {

    context.beginPath();
    context.moveTo(startPointB[0], startPointB[1]);
    context.quadraticCurveTo(firstCtrlPointB, secondCtrlPointB, endPointB[0], endPointB[1]);
    context.stroke();

    /*кончик стрелки */
    context.beginPath();
    context.moveTo(endPointB[0], endPointB[1]);
    context.lineTo(endPointB[0] - 15, 80);
    context.moveTo(endPointB[0], 85);
    context.lineTo(endPointB[0] - 5, 72);
    context.stroke();

    /*Отобразить инпут для числа B над второй дугой */
    let showInputB = () => {
        inputB.style.display = 'block';
        let inputBShift = inputB.offsetWidth+(inputB.offsetWidth)/2;
        inputBWrap.style.position = 'absolute';
        inputBWrap.style.left = (firstCtrlPointB+inputBShift)+'px';
        inputBWrap.style.top  = (secondCtrlPointB+5)+'px';
    }
    showInputB();
}

/*Инициализация задачи: отображение уравнения, первой стрелки и инпута. Функция добавлена на обработчик события 'DOMContentLoaded', т.е. запускается при загрузкe страницы*/
let init = (randomA) => {
    let intA = document.getElementById('intA');
    intA.textContent = randomA;
    drawArrA(randomA);
    let intB = document.getElementById('intB');
    intB.textContent = randomB;
}



/*Проверка введенных данных в инпут для числа A*/
let checkInputA = () => {
    let intA = document.getElementById('intA');
    if(parseInt(inputA.value) === randomA) {
        intA.classList.remove('wrong-answer');
        inputA.style.display = 'none';
        let correctAnswer = document.createElement('span');
        correctAnswer.innerHTML = inputA.value;
        inputAWrap.appendChild(correctAnswer);
        drawArrB();
     }
    else{
        inputA.style.color='red';
        intA.classList.add('wrong-answer');
    }

}
/*Проверка введенных данных в инпут для числа B*/

let checkInputB = () => {
    let intB = document.getElementById('intB');
    if(parseInt(inputB.value) === randomB) {
        intB.classList.remove('wrong-answer');
        inputB.style.display = 'none';
        let correctAnswer = document.createElement('span');
        correctAnswer.innerHTML = inputB.value;
        inputBWrap.appendChild(correctAnswer);
        document.getElementById('questionMark').style.display = 'none';
        document.getElementById('intSumAnswer').style.display = 'block';
    }
    else{
        inputB.style.color='red';
        intB.classList.add('wrong-answer');
    }
}

/*Проверка введенных данных в инпут для числа A+B*/

let checkInputSum = () => {
    if(parseInt(inputSum.value) === randomA+randomB) {
        inputSum.style.display = 'none';
        let correctAnswer = document.createElement('span');
        correctAnswer.innerHTML = inputSum.value;
        intSum.appendChild(correctAnswer);
    }
    else {
        inputSum.style.color='red';
    }

}

/*обработчики*/
document.addEventListener("DOMContentLoaded", init.bind(null, randomA));
inputA.addEventListener('input', checkInputA);
inputB.addEventListener('input', checkInputB);
inputSum.addEventListener('input', checkInputSum);