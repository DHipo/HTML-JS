let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

//Le asigno un size al canvas
canvas.width = 1280
canvas.height = 720

//Creo la gravedad
const g = 0.5

//Clase principal del jugador y el enemigo
class Sprite{
    constructor({position, velocity, direction}, width, height, color){
        this.position = position
        this.velocity = velocity
        this.height = height
        this.width = width
        this.direction
        this.LastKey
        this.attackBox = {
            position: this.position,
            width: 150,
            height: 50
        }
        this.colorS = color.Sprite
        this.colorA = color.Attack
        this.IsAttacking
    }

    draw(){
        //Jugador
        c.fillStyle = this.colorS
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        //Ataque
        if(this.IsAttacking){
            c.fillStyle = this.colorA
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update(){
        this.position.y += this.velocity.y
        this.draw()
        this.Direction()
        if((this.height + this.velocity.y + this.position.y) >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += g
        if((this.width + this.velocity.x + this.position.x) >= canvas.width){
            this.velocity.x = 0
        }else this.position.x += this.velocity.x
    }

    Attack(){
        this.IsAttacking = true
        setTimeout(() => {
            this.IsAttacking = false
        }, 100)
    }

    Direction(){
        if(this.direction){
            c.fillStyle = 'orange'
            c.fillRect(this.position.x + (this.width / 2), this.position.y + (this.height/3), 50, 10)
        }
    }
}

//Creo al Jugador y al enemigo
let Player = new Sprite({position:{x:0, y:0}, velocity:{x: 0, y:5}, direction: false}, 50, 150, {Sprite: 'blue', Attack: 'red'})

let Enemy = new Sprite({position:{x:150, y:200}, velocity:{x: 0, y:2}, direction: true}, 50, 150, {Sprite: 'yellow', Attack: 'orange'})

const keys = {
    a:{pressed: false},
    d:{pressed: false},
    w:{pressed: false},
    ArrowRight:{pressed: false},
    ArrowLeft:{pressed: false},
    ArrowUp:{pressed: false}
}

function CheckCollision(Object1, Object2){
    if(Object1.attackBox.position.x + Object1.attackBox.width >= Object2.position.x && Object1.attackBox.position.x <= Object2.position.x + Object2.width
        && Object1.attackBox.position.y + Object1.attackBox.height >= Object2.position.y && Object1.attackBox.position.y <= Object2.position.y + Object2.height)
        return true
        else return false
}

//Funcion principal
function draw(){
    //Limpio la pantalla cada frame
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    //Llamo devuelta a la funcion
    window.requestAnimationFrame(draw)
    Player.update()
    Enemy.update()

    Player.velocity.x = 0
    Enemy.velocity.x = 0
    //Movimiento del enemigo
    if(keys.ArrowLeft.pressed && Enemy.LastKey === 'ArrowLeft')
        Enemy.velocity.x = -5
    if(keys.ArrowRight.pressed && Enemy.LastKey === 'ArrowRight')
        Enemy.velocity.x = 5

    //Movimiento del jugador
    if(keys.a.pressed && Player.LastKey === 'a')
        Player.velocity.x = -5
    if(keys.d.pressed && Player.LastKey === 'd')
        Player.velocity.x = 5

    //Ataque del jugador
    if(CheckCollision(Player, Enemy) && Player.IsAttacking){
        Player.IsAttacking = false
        console.log('touch')
    }
    if(CheckCollision(Enemy, Player) && Enemy.IsAttacking){
        Enemy.IsAttacking = false
        console.log('touch')
    }
}

draw()

//Controles
window.addEventListener('keydown',(event) =>{
    switch(event.key){
        //Jugador
        case 'd': keys.d.pressed = true; Player.LastKey = 'd'; Player.direction = false;break;
        case 'a': keys.a.pressed = true; Player.LastKey = 'a';Player.direction = true;break;
        case 'w': Player.velocity.y = -10; break;
        case 's': Player.Attack(); break;

        //Enemigo
        case 'ArrowRight': keys.ArrowRight.pressed = true;Enemy.LastKey = 'ArrowRight';break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = true;Enemy.LastKey = 'ArrowLeft';break;
        case 'ArrowUp': Enemy.velocity.y = -10; break;
        case 'ArrowDown': Enemy.Attack(); break;
    }
})

window.addEventListener('keyup',(event) =>{
    switch(event.key){
        case 'd': keys.d.pressed = false;break;
        case 'a': keys.a.pressed = false;break;
        case 'w': Player.velocity.y = 0; break;
        
        case 'ArrowRight': keys.ArrowRight.pressed = false;break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = false;break;
        case 'ArrowUp': Enemy.velocity.y = 0; break;
    }
})