const ship = document.getElementById("ship");
const meteorite = document.getElementById("meteorite");

document.addEventListener("keydown", function (event) {
    jump();
});

function jump() {
    // classList - метод возращающий псевдомассив содержащий все классы элемента
    if (ship.classList !== "jump") {
        ship.classList.add("jump");
    }
    setTimeout( function () {
        ship.classList.remove("jump")
    }, 300)
}
let isAlive = setInterval (function () {
    let dinoTop = parseInt(window.getComputedStyle(ship).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(meteorite).getPropertyValue("left"));

    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        alert('GAME OVER');
    }
}, 10);


