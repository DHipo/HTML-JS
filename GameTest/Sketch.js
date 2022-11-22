let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let img = new Image();
img.src = "./imgs/background.jpg"
canvas.width = 1600
canvas.height = 900

function drawHealthBars(Obj, side) {
    if (side) {
        let grad = c.createLinearGradient(-Obj.health * 8, 0, canvas.width, 0)
        grad.addColorStop(0.53, 'rgb(0, 0, 0)')
        grad.addColorStop(0.9, 'rgb(24, 163, 13)')

        c.fillStyle = grad
        c.fillRect(canvas.width / 2, 30, Obj.health * 6, 50);

        c.fillStyle = 'rgb(255,255,0)'
        c.font = "20px Arial"
        c.fillText(Obj.health, (canvas.width / 2) + 30, 60, 40)
    } else {

        let grad = c.createLinearGradient(-Obj.health * 8, 0, canvas.width, 0)
        grad.addColorStop(0.4, 'rgb(24, 163, 13)')
        grad.addColorStop(0.79, 'rgb(0, 0, 0)')

        c.fillStyle = grad
        c.fillRect(canvas.width / 2, 30, -Obj.health * 8, 50)

        c.fillStyle = 'rgb(255,255,0)'
        c.font = "20px Arial"
        c.fillText(Obj.health, (canvas.width / 2) - 70, 60, 40)
    }

    c.fillStyle = 'rgb(0, 0, 255)'
    c.fillRect(canvas.width / 2 - 10, 20, 20, 70)
}

let Player = new Sprite({
    position: {
        x: (canvas.width / 2) - 100,
        y: (canvas.height - 5) - 150
    },
    aceleration: {
        x: 0,
        y: 5
    },
    color: {
        sprite: 'rgb(255, 0, 0)',
        attack: 'orange'
    },
    health: 100,
    imageSrc: "./imgs/Player/Walking-left (1).png"
})

let Enemy = new Sprite({
    position: {
        x: (canvas.width / 2) + 50,
        y: (canvas.height - 5) - 150
    },
    aceleration: {
        x: 0,
        y: 5
    },
    color: {
        sprite: 'rgb(0,0, 255)',
        attack: 'yellow'
    },
    health: 100
})

const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },

    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false }
}


let gradient = c.createLinearGradient(0, 0, 0, canvas.height)
gradient.addColorStop(0.1, 'white')
gradient.addColorStop(1, 'black')

function draw() {
    //c.fillStyle = gradient
    //c.fillRect(0,0, canvas.width, canvas.height)
    c.drawImage(img, 0, 0, canvas.width, canvas.height)
    window.requestAnimationFrame(draw)

    Player.update()
    Enemy.update()

    Player.aceleration.x = 0
    Enemy.aceleration.x = 0

    //----Keys pressed---and---No go over out of the screen-----------
    if (keys.d.pressed && Player.position.x + Player.width <= canvas.width && Player.position.x >= 0) Player.aceleration.x += 10;
    if (keys.a.pressed && Player.position.x > 0) Player.aceleration.x -= 10;
    if (Player.position.y < 0) { Player.aceleration.y = 0; Player.position.y = 0 }

    if (keys.ArrowRight.pressed && Enemy.position.x + Enemy.width <= canvas.width && Enemy.position.x >= 0) Enemy.aceleration.x += 10;
    if (keys.ArrowLeft.pressed && Enemy.position.x > 0) Enemy.aceleration.x -= 10;
    if (Enemy.position.y < 0) { Enemy.aceleration.y = 0; Enemy.position.y = 0 }

    if (keys.w.pressed && Player.jump) Player.jumping()
    if (keys.ArrowUp.pressed && Enemy.jump) Enemy.jumping()

    if (getDistance(Player, Enemy) > 100 && Player.attacking) Player.shooting = true;
    //-----------------------------------------------------------------

    //----Collision Check-----------------------------------------------
    if (checkCollision(Player, Enemy) && Player.attacking && Enemy.health > 0 && Player.health > 0) {
        Enemy.health -= 10;
        console.log("Enemy health: " + Enemy.health)
    }

    if (checkCollision(Enemy, Player) && Enemy.attacking && Player.health > 0 && Enemy.health > 0) {
        Player.health -= 10;
        console.log("Player health: " + Player.health)
    }
    //---------------------------------------------------------------

    //---Death message----------------------------------------------
    if (Enemy.health == 0 || Player.health == 0) {
        c.font = "50px Arial"
        c.fillText('DEAD', canvas.width / 2, canvas.height / 2)
    }
    //-------------------------------------------------------------

    //Draw health bars
    c.fillStyle = 'rgb(255, 0, 0)'
    c.fillRect(40, 35, 1200, 40);

    drawHealthBars(Enemy, true)
    drawHealthBars(Player, false)
}

draw()

window.addEventListener('keydown', (event) => {
    //console.log(event.key)
    switch (event.key) {
        //Player
        case 'd': keys.d.pressed = true; Player.direction = true; break;
        case 'a': keys.a.pressed = true; Player.direction = false; break;
        case 'w': keys.w.pressed = true; Player.jump = true; break;
        case ' ': Player.attacking = true; break;

        //Enemy
        case 'ArrowRight': keys.ArrowRight.pressed = true; Enemy.direction = true; break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = true; Enemy.direction = false; break;
        case 'ArrowUp': keys.ArrowUp.pressed = true; Enemy.jump = true; break;
        case 'ArrowDown': Enemy.attacking = true;
    }
})

window.addEventListener('keyup', (event) => {
    //console.log(event)
    switch (event.key) {
        case 'd': keys.d.pressed = false; break;
        case 'a': keys.a.pressed = false; break;
        case 'w': keys.w.pressed = false; break;

        case 'ArrowRight': keys.ArrowRight.pressed = false; break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = false; break;
        case 'ArrowUp': keys.ArrowUp.pressed = false; break;
    }
})

function checkCollision(Obj1, Obj2) {
    if (Obj1.direction) {
        if (Obj1.position.x + Obj1.attackBox.width >= Obj2.position.x &&
            Obj1.position.y + Obj1.attackBox.height >= Obj2.position.y &&
            Obj1.position.x <= Obj2.position.x + Obj2.width &&
            Obj1.position.y <= Obj2.position.y + Obj2.height) {
            return true;
        }
    } else {
        if (Obj1.position.x - (Obj1.attackBox.width - Obj1.width) <= Obj2.position.x + Obj2.width &&
            Obj1.position.y + Obj1.attackBox.height >= Obj2.position.y &&
            Obj1.position.x + Obj1.width >= Obj2.position.x &&
            Obj1.position.y <= Obj2.position.y + Obj2.height) {
            return true;
        }
    }
}

function getDistance(Obj1, Obj2) {
    return ((Obj1.position.x + Obj1.width) - (Obj2.position.x + Obj2.width));
}