let can = document.querySelector('canvas')
let cx = can.getContext('2d')
let img = document.getElementById('image')

img.style.visibility = 'hidden'

can.width = window.innerWidth - 15
can.height = window.innerHeight - 15

let date = new Date()

const g = 1.5

class Box{
    constructor(p,s,c){
        this.size = s
        this.pos = p
        this.color = c
        this.aceleration = {
            x : 0, 
            y : 0
        }
        this.points = 0
        this.state = false
        this.times = 0
    }

    draw(){
        cx.fillStyle = this.color
        cx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h)
    }

    update(){
        //this.pos.x = this.aceleration.x * g
        //this.pos.y = this.aceleration.y * g
        this.draw()
    }
}

class BoxEnemys{
    constructor(p,s,c,a){
        this.size = s
        this.pos = p
        this.color = c
        this.aceleration = {
            x : a.x, 
            y : a.y
        }
        this.alive = true
    }

    draw(){
        cx.fillStyle = this.color
        cx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h)
        cx.drawImage(img, (this.pos.x + (this.size.w/2))-15, (this.pos.y+ (this.size.h/2))-15, 30,30)
    }

    update(){
        this.pos.x += this.aceleration.x 
        this.pos.y += this.aceleration.y 
        this.draw()
    }
}

let player = new Box({x:10, y:10}, {w:20,h:20}, 'rgb(128,128,128)') 
let arrBox = []

function SetBoxes(cant){
    for(let i =0; i<cant; i++){
        let randompos = {x:Math.floor(Math.random() * (can.width - 20)), y: Math.floor(Math.random() * 40)}
        
        let randomace = {x:(Math.random() * 2)+1, y: Math.random() * 2}
        arrBox.push(new BoxEnemys({x: randompos.x, y: randompos.y},{w:40, h:40}, 'rgb(128,128,128, 255)', {x: 0, y:randomace.y}))
    }
}

function CheckCollision(player, arr){
    for(let i = 0; i < arr.length; i++){
        if(player.pos.x < (arr[i].pos.x + arr[i].size.w) && player.pos.x > arr[i].pos.x && player.pos.y > arr[i].pos.y && player.pos.y < (arr[i].pos.y + arr[i].size.h) || 
            (player.pos.x + player.size.w) < (arr[i].pos.x + arr[i].size.w) && (player.pos.x + player.size.w)> arr[i].pos.x && (player.pos.y + player.size.h) > arr[i].pos.y && (player.pos.y + player.size.h) < (arr[i].pos.y + arr[i].size.h )){
            arr[i].alive = false
            player.points += 6
        }
    }
}
   
let towait = 0
let timeleft = false

function main(){
    cx.fillStyle = 'rgb(128,128,128,128)'
    cx.fillRect(0,0,can.width, can.height)
    cx.font = '15px Arial'
    cx.fillStyle = 'rgb(128,0,0)'
    cx.fillText('Creado para mi bbeta', 90, (can.height)-20)
    window.requestAnimationFrame(main)

    if(player.state && timeleft){
        for(let i = 0; i<arrBox.length; i++){
            const box = arrBox[i]

            if(box.pos.y >= can.height || !box.alive){
                let randomace = {x:0, y: (Math.random() * 3)+2}
                let randompos = {x:Math.floor(Math.random() * (can.width - 20)), y: Math.floor(Math.random() * 40)}
                if(player.points > 30)
                    randomace = {x:0, y: (Math.random() * 3) + 2}
                box.alive = true
                box.pos = randompos
                box.aceleration = randomace
                player.points -= 1
            }

            box.update()
        }

        player.update()

        cx.fillStyle = 'rgb(0,0,0)'
        cx.font = '30px Arial'
        cx.fillText('Puntos: ' + player.points, can.width/2, 100)
        cx.fillText('Tiempo restante: '+ Math.floor((towait - Date.now())/1000), can.width/2, 130)
        CheckCollision(player, arrBox)
        
        if (towait <= Date.now()) {
            timeleft = false
            player.times += 1
            player.state = false
        }
    }else{
        console.log('a')
        cx.font = '40px Arial'
        cx.fillStyle = 'rgb(0,0,0)'
        cx.textAlign = 'center'
        cx.fillText('Apreta la pantalla ', can.width/2, (can.height/2)-40)
        cx.fillText('para jugar amor', can.width/2, can.height/2)
        towait = Date.now() + 30000

        if(player.times >= 1){
            cx.fillStyle = 'rgb(0,0,255)'
            cx.font = '20px Arial'
            cx.fillText('El amor que me tenes es de ' + player.points, can.width/2, (can.height/2)+40)
            if(player.points < 80){
                cx.fillText('Amor esto significa que no me queres mas?', can.width/2, (can.height/2)+80)
            }
            if(player.points > 80 && player.points < 160){
                cx.fillText('Amor si queres corte foa', can.width/2, (can.height/2)+80)
            }
            if(player.points > 160){
                cx.fillText('Amor wtf no sabia que eras tan picante', can.width/2, (can.height/2)+80)
            }
        }

    }
}

SetBoxes(100)
main()

window.addEventListener('pointerdown', (event)=>{
    player.pos.x = event.clientX - 11
    player.pos.y = event.clientY - 11

    if(!player.state) {
        player.state = true
        timeleft = true
    }
})