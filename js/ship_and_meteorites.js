let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
// загрузка изображений
bird.src = "img/Ship_and_meteorites/flappy_bird_bird_4.png";
bg.src = "img/Ship_and_meteorites/flappy_bird_bg_2.png";
fg.src = "img/Ship_and_meteorites/flappy_bird_fg_2.png";
pipeUp.src = "img/Ship_and_meteorites/flappy_bird_pipeUp.png";
pipeBottom.src = "img/Ship_and_meteorites/flappy_bird_pipeBottom.png";

// Звуковые файлы
let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let gap = 120;
/*let birdX = 10;
let birdY = 10;*/
// позиция птички

let xPos = 150;
let yPos = 150;

// при нажатии на какую либо кнопку птичка летит в верх
// document.addEventListener("keydown", moveDown);
/*document.addEventListener("keydown", checkKey);

function checkKey(e) {

    // e = e || window.event;

    if (e.keyCode === '38') {
        // up arrow
    }
    else if (e.keyCode === '40') {
        // down arrow
    }
    else if (e.keyCode === '37') {
        // left arrow
    }
    else if (e.keyCode=== '39') {
        // right arrow
    }

}*/
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


/*document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
            break;
        case 38:
            // alert('up');
            break;
        case 39:
            // alert('right');
            break;
        case 40:
            // alert('down');
            break;
    }
};*/

/*function moveUp() {
    yPos -= 25;
    // звук
    // fly.play();
}
function moveDown() {
    yPos += 25;
}*/

//создание блоков
let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

let score = 0;


// let grav = 1.5;

const distanceElements = 1400;
let globalSpeed = 1;

// 1000 - 1
// 800 -  3
// рисуем все объекты в канвосе
function draw() {
    //метод в котором рисуем картинку
    ctx.drawImage(bg, 0, 0 );
    // отрисовываем блоки в цикле.
    for(let i = 0; i < pipe.length; i ++) {
        ctx.drawImage(pipeUp, pipe[i].x - 1000, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x - 1000, pipe[i].y + pipeUp.height + gap);
        //скорость труб
        /*if(score > 0) {
            globalSpeed = 2;
        }
        if(score >= 1) {
            globalSpeed = 2.5;
        }*/
        /*if(score >= 1) {
            globalSpeed = 3;
        }*/

        // const pipeSpeed = pipe[i].x - globalSpeed;
        // let speedOne = pipeSpeed - 1;
        // const speedOne = pipe[i].x = pipeSpeed;


        const speedOne = pipe[i].x--;
        speedOne;
        console.log('первая скорость', speedOne);

        // const speedTwo = pipe[i].x -= 2;
        // pipe[i].x -= 2;

        if(speedOne === distanceElements) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        /*else if (pipe[i].x -= 2) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }*/
        // условия столкновения и блока
        if(xPos + bird.width >= pipe[i].x - 1000
            && xPos <= pipe[i].x - 1000 + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height +
                gap) || yPos + bird.height >= cvs.height - fg.height) {
                    location.reload(); // перезапуск странички
                }
        // колличество очков
        if(pipe[i].x === 1000) {
            score++;
            // звук
            // score_audio.play();
        }
 /*       if(xPos + bird.width >= pipe[i].x - 1000
            && xPos <= pipe[i].x - 1000 + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height)
                || yPos + bird.height >= cvs.height - fg.height) {
            score++;
        }*/

        // -------------
        if(score >= 1) {
            pipe[i].x -= 2;
            // console.log('вторя скорость', pipe[i].x -= 2);
        }
        /*if(score >= 2) {
            pipe[i].x -= 2;
        }*/
    }


    /*ctx.drawImage(pipeUp, 100, 0);
    ctx.drawImage(pipeBottom, 100, 0 + pipeUp.height + gap);*/

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    // ctx.drawImage(fg, 0, 400);
    ctx.drawImage(bird, xPos, yPos);

    // yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}
// если метод загружен, подгружаем картинку
pipeBottom.onload = draw;
