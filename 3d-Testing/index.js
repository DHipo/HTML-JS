const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 800

const g = 1.5

const level = [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1]
]

class levels{
    constructor(arr, {colorB, colorW}){
        this.arr = arr
        this.colorB = colorB
        this.colorW = colorW
        this.arrS = {x:arr[0].length, y:arr.length}
        this.size = {x:0, y:0}
    }

    draw(){
        this.size.x = canvas.height / this.arrS.y
        this.size.y = canvas.width / this.arrS.x
        for(let rows = 0; rows < this.arrS.y; rows++){
            for(let columns=0; columns < this.arrS.x; columns++){
                if(this.arr[rows][columns] == 1){
                    cx.fillStyle = this.colorW
                    cx.fillRect(this.size.x * rows, this.size.y * columns, this.size.x, this.size.y)
                }else{
                    cx.fillStyle = this.colorB
                    cx.fillRect(this.size.x * rows, this.size.y * columns, this.size.x, this.size.y)
                }
            }           
        }
    }
}

class rectangle{
    constructor({radio, position}, color, lightSize){
        this.radio = radio
        this.color = color
        this.position = position
        this.aceleration = {x:0, y: 0}
        this.lightSize = lightSize
        this.light = {x:0, y:0}
    }

    draw(){
        cx.fillStyle = this.color
        cx.beginPath()
        cx.arc(this.position.x,this.position.y, this.radio, 0, Math.PI * 2, false)
        cx.fill()
        cx.closePath()
    }

    update(){
        if((this.position.x+this.aceleration.x+this.radio) < canvas.width && (this.position.x+this.aceleration.x-this.radio) >= 0){
            this.position.x += this.aceleration.x
        }

        if((this.position.y+this.aceleration.y+this.radio)< canvas.height && (this.position.y+this.aceleration.y-this.radio) >= 0){
            this.position.y += this.aceleration.y
        }
        
        this.draw()
        this.lightnings()
    }

    lightnings(){
        for(let i = 0; i<= 360; i+=1){
            this.light.x = this.position.x + Math.cos(i) * this.lightSize
            this.light.y = this.position.y + Math.sin(i) * this.lightSize
            cx.beginPath()
            cx.lineTo(this.position.x, this.position.y)
            cx.lineTo(this.light.x, this.light.y)
            cx.closePath()
        
            cx.strokeStyle = 'white'
            cx.stroke()
        }
    }
}

let player = new rectangle({
    radio: 15, 
    position:{
        x:canvas.width/2, 
        y:canvas.height/2
    }},
    'rgb(255,255,255)',
    500
)

let newLevel = new levels(level, {colorB:'grey', colorW: 'orange'})

function background(){
    cx.fillStyle = 'rgb(0,0,0)'
    cx.fillRect(0,0,canvas.width, canvas.height)
}

const update = () => {
    background()
    window.requestAnimationFrame(update)
    newLevel.draw()
    player.update()
    checkCollision(player.light, )
}

update()

window.addEventListener('keydown', (event) =>{
    switch(event.key){
        case 'w': player.aceleration.y = -1; break;
        case 's': player.aceleration.y = 1;break;
        case 'a': player.aceleration.x = -1;break;
        case 'd': player.aceleration.x = 1;break;
    }    
})

window.addEventListener('keyup', (event) =>{
    switch(event.key){
        case 'w': player.aceleration.y = 0; break;
        case 's': player.aceleration.y = 0;break;
        case 'a': player.aceleration.x = 0;break;
        case 'd': player.aceleration.x = 0;break;
    }    
})

function checkCollision(obj1, obj2){
    if(obj1.position.x + obj1.size.x > obj2.position.x + obj2.position.x) console.log(true)
}