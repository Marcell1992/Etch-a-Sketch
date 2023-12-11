document.querySelector('.drawGrid').addEventListener('click', createGrid);
const canvas = document.querySelector('.container');
const axes = document.querySelector('#gridSize');
canvas.addEventListener('mouseover', colorIn);

let color1 = Math.floor(Math.random() * 256);
let color2 = Math.floor(Math.random() * 256);
let color3 = Math.floor(Math.random() * 256);
let allowColoringIn = false;

const colorButtons = document.querySelectorAll('button');
const colorSelections = {
    'rainbow': 1,
    'black': 2,
    'white': 3,
    'red': 4,
    'blue': 5,
    'eraser': 6,
    'negGradient': 7,
    'posGradient': 8,
};

for (const button of colorButtons) {
    button.addEventListener('click', changeLineColor);
}

function changeLineColor(e) {
    colorButtons.forEach(button => { button.style.borderColor = ''; });

    const targetClassList = e.target.classList;
    const colorClassName = Object.keys(colorSelections).find(className => targetClassList.contains(className));

    if (colorClassName) {
        colorSelection = colorSelections[colorClassName];
        this.style.borderColor = 'red';
    }
}


function createGrid() {
    const MIN_GRID_SIZE = 16;
    const MAX_GRID_SIZE = 100;
    ySide = +axes.value;
    colorSelection = 2;

    canvas.innerHTML = '';

    if (ySide > MAX_GRID_SIZE) {
        ySide = MAX_GRID_SIZE;
        axes.value = MAX_GRID_SIZE;
    }
    if (ySide < MIN_GRID_SIZE) {
        ySide = MIN_GRID_SIZE;
        axes.value = MIN_GRID_SIZE;
    }

    for (let i = 1; i <= ySide; i++) {
        const divY = document.createElement('div');
        let yHeight = 1000 / ySide;
        divY.style.height = `${yHeight}px`;
        divY.style.width = '100%';
        divY.style.display = 'flex';
        divY.style.flexDirection = 'row';

        for (let j = 0; j < ySide; j++) {
            const divX = document.createElement('div');
            let xWidth = 1000 / ySide;
            divX.style.height = '100%';
            divX.style.width = `${xWidth}px`;
            divY.appendChild(divX);
        }
        canvas.appendChild(divY);
    }
}

document.addEventListener('mousedown', addMouseMove);
document.addEventListener('mouseup', removeMouseMove);
function removeMouseMove(){
   allowColoringIn = false;
}
function addMouseMove(){
    allowColoringIn = true;
}

function colorIn(e){  
    if (e.target != canvas){
        if (allowColoringIn){
            if (colorSelection === 1){ //Rainbow colors
                e.target.style.backgroundColor = randomColor();
            }else if (colorSelection === 2){ //Black
                e.target.style.backgroundColor = `rgba(0, 0, 0, 0.99)`;
            }else if (colorSelection === 3){ //White
                e.target.style.backgroundColor = `rgba(245, 245, 245, 0.99)`;
            }else if (colorSelection === 4){ //Red
                e.target.style.backgroundColor = `rgba(255, 0, 0, 0.99)`;
            }else if (colorSelection === 5){ //Blue
                e.target.style.backgroundColor = `rgba(0, 0, 255, 0.99)`;
            }else if(colorSelection === 6){ //Eraser
                e.target.style.backgroundColor = `rgba(255, 255, 255, 0.99)`;
                e.target.nextSibling.style.backgroundColor = `rgba(255, 255, 255, 0.99)`;
                e.target.previousSibling.style.backgroundColor = `rgba(255, 255, 255, 0.99)`;
            }else if (colorSelection === 7){
                e.target.style.backgroundColor = darkGradient(e);
            }else if (colorSelection === 8){
                e.target.style.backgroundColor = lightGradient(e);
            }
        }
    }
}

function minMax(value){
    return Math.max(0, Math.min(value, 255));
}

function randomColor(){
    const entry = function(min, max){ 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    color1 = minMax(color1 + entry(-30, 30));
    color2 = minMax(color2 + entry(-30, 30));
    color3 = minMax(color3 + entry(-30, 30));
    return `rgba(${color1}, ${color2}, ${color3}, 0.99)`;
}

function darkGradient(e) {
    return adjustGradient(e, 0.1);
}

function lightGradient(e) {
    return adjustGradient(e, -0.1);
}

function adjustGradient(e, increment) {
    const gradient = window.getComputedStyle(e.target, null).getPropertyValue("background-color")
        .match(/\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);

    if (!gradient) {
        return;
    }

    const alpha = Math.max(0, Math.min(0.99, parseFloat(gradient[4]) + increment));
    return `rgba(${gradient[1]}, ${gradient[2]}, ${gradient[3]}, ${alpha})`;
}