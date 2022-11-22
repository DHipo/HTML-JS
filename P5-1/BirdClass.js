class Bird{
  constructor(posx, posy){
      this.x = posx
      this.y = posy
      this.stillAlive = false
      this.acceleration = 1.01
    }
  
    Update(time){
      if(this.stillAlive){
        while(time != 0){
          this.y /= this.acceleration
          if(this.y <= 0) this.Death()
          this.acceleration = 1.001
          time--;
        }
        this.y*=this.acceleration
        if(this.y >= height) this.Death()
        this.acceleration+=0.02
        this.ShowUp()
      }else this.Death()
    }
  
    ShowUp(){
      //body
      noStroke()
      fill(255,255,0)
      ellipse(this.x,this.y,60)
  
      //eyes
      noStroke()
      fill(225)
      ellipse(this.x+15,this.y-5,20)
      noStroke()
      fill(0)
      ellipse(this.x+18,this.y-5,10)
    }
  
    Death(){
      this.stillAlive = false
  
      textAlign(CENTER, CENTER)
      
      textSize(50)
      text("DEAD", width/2, height/2)
    }
  }