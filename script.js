const drawGrid = document.querySelector('.drawGrid');
const canvas = document.querySelector('.container');
let axes = document.querySelector('#gridSize');
drawGrid.addEventListener('click', createGrid);
let randColors = 2;
const rainbow = document.querySelector('.rainbow').addEventListener('click', () => {randColors = 1;});
const black = document.querySelector('.black').addEventListener('click', () => {randColors = 2;});
const white = document.querySelector('.white').addEventListener('click', () => {randColors = 3;});
const red = document.querySelector('.red').addEventListener('click', () => {randColors = 4;});
const blue = document.querySelector('.blue').addEventListener('click', () => {randColors = 5;});

const incrementArr = [];
for (let increment = -30; increment <= 30; increment += 3){
incrementArr.push(increment);
}

let color1 = Math.floor(Math.random() * 256);
let color2 = Math.floor(Math.random() * 256);
let color3 = Math.floor(Math.random() * 256);

function createGrid() {
    ySide = +axes.value;

    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }

    if (ySide > 100) {
        ySide = 100;
        axes.value = 100;
    }
    if (ySide < 16) {
        ySide = 16;
        axes.value = 16;
    }

    for (let i = 1; i <= ySide; i++) {
        const divY = document.createElement('div');
        let yHeight = 95 / ySide;
        divY.style.height = `${yHeight}vh`;
        divY.style.width = '100%';
        divY.style.display = 'flex';
        divY.style.flexDirection = 'row';

        for (let j = 0; j < ySide; j++) {
            const divX = document.createElement('div');
            let xWidth = 98 / ySide;
            divX.style.height = '100%';
            divX.style.width = `${xWidth}vw`;
            divY.appendChild(divX);
        }
        canvas.appendChild(divY);
    }
    canvas.addEventListener('mousedown', colorIn);
    canvas.addEventListener('mouseup', () => {
        canvas.removeEventListener('mouseover', colorIn);});
   
    function colorIn(e){
        canvas.addEventListener('mouseover', colorIn)
            if (canvas !== e.target){
                
                if (randColors === 1){
                    e.target.style.backgroundColor = randomColor();
                }else if (randColors === 2){
                    e.target.style.backgroundColor = 'black';
                }else if (randColors === 3){
                    e.target.style.backgroundColor = 'white';
                }else if (randColors === 4){
                    e.target.style.backgroundColor = 'red';
                }else {
                    e.target.style.backgroundColor = 'blue';
                }
                
            }
    }
}

function randomColor(){

    const entry = () => Math.floor(Math.random() * 21);

    color1 += incrementArr[entry()];
        if (color1 < 0) color1 = 0;
        else if (color1 > 255) color1 = 255;
    color2 += incrementArr[entry()];
        if (color2 < 0) color2 = 0;
        else if(color2 > 255) color2 = 255
    color3 += incrementArr[entry()];
        if (color3 < 0) color3 = 0;
        else if(color3 > 255) color3 = 255;
    return `rgb(${color1}, ${color2}, ${color3})`;
        }