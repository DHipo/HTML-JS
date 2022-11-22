const g = 0.8

class Sprite{
    constructor({position, aceleration, color, health, imageSrc}){
        this.position = position
        this.aceleration = aceleration
        this.height = 150
        this.width = 50
        this.color = color
        this.jump = false
        this.attacking = false
        this.attackBox = {
            width: 150,
            height: 50
        } 
        this.health = health
        //false = izq - true = der
        this.direction = false
        this.imageSrc = new Image()
        this.imageSrc.src = imageSrc
        this.shooting = false;
    }

    draw(){
        if(this.health > 0){
            //Sprite
            c.fillStyle = this.color.sprite
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
            //BoxAttack
            if(this.attacking){
                if(this.direction){
                    c.fillStyle = this.color.attack
                    c.fillRect(this.position.x, this.position.y, this.attackBox.width, this.attackBox.height)
                }else{
                    c.fillStyle = this.color.attack
                    c.fillRect(this.position.x, this.position.y, -(this.attackBox.width-this.width ), this.attackBox.height)
                }
            }
        }
    }

    update(){
        this.draw()
        this.attack()
        this.aceleration.y += g

        this.position.x += this.aceleration.x

        if(this.aceleration.y + this.position.y + this.height >= canvas.height){
            this.aceleration.y = 0
        } else this.position.y += this.aceleration.y  
    }

    attack(){
        setTimeout(() => {this.attacking = false}, 50)
    }
    
    jumping(){
        this.jump = false; this.aceleration.y -= 10;
    }

    shooting(){
        
    }
}

class Background{
    constructor({position, size, imageSrc}){
        this.position = position
        this.width = size.x
        this.height = size.y
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Bullet{
    constructor({position, scal}){

    }

    draw(){

    }

    update(){

    }
}