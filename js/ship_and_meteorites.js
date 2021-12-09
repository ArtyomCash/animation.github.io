let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
// загрузка изображений
bird.src = "img/Ship_and_meteorites/flappy_bird_bird.png";
bg.src = "img/Ship_and_meteorites/flappy_bird_bg.png";
fg.src = "img/Ship_and_meteorites/flappy_bird_fg.png";
pipeUp.src = "img/Ship_and_meteorites/flappy_bird_pipeUp.png";
pipeBottom.src = "img/Ship_and_meteorites/flappy_bird_pipeBottom.png";

// Звуковые файлы
let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let gap = 90;
// при нажатии на какую либо кнопку птичка летит в верх
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

//создание блоков
let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

let score = 0;
// позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.5;

// рисуем все объекты в канвосе
function draw() {
    //метод в котором рисуем картинку
    ctx.drawImage(bg, 0, 0 );
    // отрисовываем блоки в цикле.
    for(let i = 0; i < pipe.length; i ++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x === 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // условия столкновения и блока
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height +
                gap) || yPos + bird.height >= cvs.height - fg.height) {
                    location.reload(); // перезапуск странички
                }
        // колличество очков
        if(pipe[i].x === 5) {
            score++;
            score_audio.play();
        }
    }


    /*ctx.drawImage(pipeUp, 100, 0);
    ctx.drawImage(pipeBottom, 100, 0 + pipeUp.height + gap);*/

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    // ctx.drawImage(fg, 0, 400);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}
// если метод загружен, подгружаем картинку
pipeBottom.onload = draw;
