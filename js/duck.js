let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let duck = new Image();
let bg = new Image();
let land = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
// подгружаю изображение
duck.src = "img/duck/duck.png";
bg.src = "img/duck/bg.png";
land.src = "img/duck/land.png";
pipeUp.src = "img/duck/pipe_up.png";
pipeBottom.src = "img/duck/pipe_bottom.png";

// звуковые файлы
let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let gap = 110;
// позиция утки
let xPos = 150;
let yPos = 150;

document.addEventListener("keydown", direction);
function direction() {
    if(event.keyCode === 37 ){
        xPos -=20;
        // fly.play();
    }
    else if(event.keyCode === 38){
        yPos -=20;
        // fly.play();
    }
    else if(event.keyCode === 39){
        xPos +=20;
        // fly.play();
    }
    else if(event.keyCode === 40){
        yPos +=20;
        // fly.play();
    }
}

// создание труб
let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

let score = 0;

function draw() {
    ctx.drawImage(bg, 0, 0);
    for(let i = 0; i < pipe.length; i ++) {
        ctx.drawImage(pipeUp, pipe[i].x , pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        const speedOne = pipe[i].x--;
        // speedOne;
        pipe[i].x--;
        if(speedOne === 350) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        if(xPos + duck.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + duck.height >= pipe[i].y + pipeUp.height +
                gap) || yPos + duck.height >= cvs.height - land.height) {
            location.reload(); // перезапуск странички
        }
        if(pipe[i].x === 5) {
            score++;
        }
        /*if(score >= 1) {
            pipe[i].x -=2;
        }*/
    }
    ctx.drawImage(land, 0, cvs.height - land.height);
    // ctx.drawImage(fg, 0, 400);
    ctx.drawImage(duck, xPos, yPos);

    // yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}
// если метод загружен, подгружаем картинку
pipeBottom.onload = draw;




