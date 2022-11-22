let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

let newh1 = document.createElement('h1')
//Rectangulos - Cuadrados
//c.fillStyle = 'rgb(255,0,0,0.5)'
//c.fillRect(10,10,300,310)

//Lineas
//Le digo que quiero dibujar
//c.beginPath();
//Muevo el "lapiz" a la pasicion incial stroke
//c.moveTo(20,30);
//c.lineTo(300,100)
//c.lineTo(300,200)
//c.closePath();
//c.strokeStyle = 'red    '
//c.stroke()

//Arc -Circulo
//c.arc(x, y, radio, startAngle(radianes),endAngle(radianes),DrawCounterClockwise(bool))
//c.beginPath()
//c.strokeStyle = 'rgb(0,255,0,0.5)'
//c.arc(300,300, 50, 0, Math.PI * 1, true)
//c.stroke()

//vodi background()
//c.clearRect(0,0,innerWidth, innerHeight)

//Si la funcion va con una Mayuscula al principio estamos hablando de un objeto
function Circle(x, y, dx, dy, rd, time, mass){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rd = rd;
    this.time = time;

    this.draw = function(){
        c.beginPath()
        c.arc(this.x, this.y, this.rd, 0, Math.PI * 2, false)
        c.fillStyle = 'rgb(255,'+time+',0' + time +')'
        c.fill()
        c.closePath()
    }

    this.update = function(){
        if(this.time >= 0){
            if((this.y+60) > innerHeight || (this.y-60) < 0) this.dy = -this.dy;
            if((this.x+60) > innerWidth || (this.x-60) < 0) this.dx = -this.dx;
            
            this.y += this.dy;
            this.x += this.dx;
            
            this.time -= 0.5;
            this.draw()
            this.stillAlive = true;
        } else this.stillAlive = false
    }
}

let cant = Math.random() * 2000;

const circleArr = []
const getCharacterist = function (){
    for(let i = 0; i< cant; i++){
        
        let rd = 20;
        let x = Math.random() * (canvas.width - rd*3) + rd;
        let y = Math.random() * (canvas.height - rd*3) + rd;
        let vy = (Math.random() * 10) - (Math.random() * 5);
        let vx = (Math.random() * 10) - (Math.random() * 5);
        let time = Math.random() * 255;
        let mass = Math.random() * 1;
        
        if(i !== 0){
            for(let j = 0; j < circleArr.length; j++){
                while(collision(x, y, circleArr[j].rd, circleArr[j].x, circleArr[j].y, circleArr[j].rd)){
                    x = Math.random() * (canvas.width - rd*3) + rd;
                    y = Math.random() * (canvas.height - rd*3) + rd;
                }
            }
        }

        circleArr.push(new Circle(x, y, vx, vy, rd, time))
    }
}

function getCant(){
    for(let  i=0; i<circleArr.length; i++){
        if(circleArr[i].stillAlive === false) cant--;
    }
}

//void draw()
function draw(){
    c.clearRect(0,0,innerWidth, innerHeight)
    requestAnimationFrame(draw)

    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }
    
    //CheckCollision(circleArr)

    let checkArr = circleArr.filter((item) => item.stillAlive === true)
    newh1.innerHTML = 'Particules on the screen: ' + checkArr.length
    document.body.appendChild(newh1)
}

addEventListener('keydown',() => {
    
})

function collision (p1x, p1y, r1, p2x, p2y, r2) {
    var a;
    var x;
    var y;

    a = r1 + r2;
    x = p1x - p2x;
    y = p1y - p2y;

    if (a > Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) {
        return true;
    } else {
        return false;
    }
}

function CheckCollision(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 1; j < arr.length; j++){
            if (collision(arr[i].x, arr[i].y, arr[i].rd, arr[j].x, arr[j].y, arr[j].rd)){
                if(arr[i].dx > 0 && arr[i].dy > 0){
                    arr[i].dx = -arr[i].dx;
                    arr[i].dy = -arr[i].dy;
                }
            }
        }
    }
}

function Increse(){
    getCharacterist();
}

getCharacterist();
draw();