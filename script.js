let canvas;
let context;
let gameLoop;

const boardX = 300;
const boardY = 300;
const paddleH = 10;
const paddleD = boardY - paddleH;
const paddleW = 150;

let paddleX = 150;
let ballX = 150;
let ballY = 150;
let ballDX = Math.floor(Math.random() * -4 * -3 * -2) + 1;
let ballDY = Math.floor(Math.random() * 2 * 3 * 4) + 1;



function drawGameCanvas() {
    canvas = document.getElementById('gameBoard');

    if (canvas.getContext) {
        context = canvas.getContext('2d');
        gameLoop = setInterval(draw, 16);
        window.addEventListener('keydown', keyInput, true);
    }
}

function draw() {



    context.clearRect(0, 0, boardX, boardY);

    // BackgroundTable 
    context.fillStyle = '#ffc947';
    context.beginPath();
    context.rect(0, 0, boardX, boardY);
    context.closePath();
    context.fill();

    // Ball
    context.fillStyle = '#0a1931';
    context.beginPath();
    context.arc(ballX, ballY, 15, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();


    // Paleta 
    context.fillStyle = '#185adb';
    context.beginPath();
    context.rect(paddleX, paddleD, paddleW, paddleH);
    context.closePath();
    context.fill();


    ballX += ballDX;
    ballY += ballDY;


    if (ballX + ballDX > boardX - 15 || ballX + ballDX < 15) {
        ballDX = -ballDX;
    }
    if (ballY + ballDY < 15) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > boardY - 15) {
        if (ballX > paddleX && ballX < paddleX + paddleW) {
            ballDY = -ballDY;
        } else {
            clearInterval(gameLoop);
            alertEndGame();

        }
    }
}

function alertEndGame() {
    const html = document.querySelector('html');
    const boxAlert = document.createElement('div');
    boxAlert.setAttribute('class', 'boxAlert');
    html.appendChild(boxAlert);

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Game Over';
    boxAlert.appendChild(paragraph);

    const buttonCloseAlert = document.createElement('button');
    buttonCloseAlert.textContent = 'x';
    boxAlert.appendChild(buttonCloseAlert);

    buttonCloseAlert.onclick = function () {
        boxAlert.parentNode.removeChild(boxAlert);
    }
}

function keyInput(e) {
    switch (e.keyCode) {
        case 37:
            paddleX -= 20;
            if (paddleX < 0) {
                paddleX = 0;
            }
            break;
        case 39:
            paddleX += 20;
            if (paddleX > boardX - paddleW) {
                paddleX = boardX - paddleW;
            }
            break;
    }
}
drawGameCanvas();