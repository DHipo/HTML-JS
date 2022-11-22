class Wall{
    constructor(posx,posy){
      this.x = posx-10
      this.y = posy-10
      this.sizeX = 40
    }
  
    Update(){
      this.ShowUp()
      this.MoveIt()
    }
  
    MoveIt(){
      this.x-=1;
    }
  
    ShowUp(){
      strokeWeight(3)
      stroke(0)
      fill(255,0,0)
      rect(this.x,this.y-200,this.sizeX,600)
    }
  }
  