var spaceCraft, alienShip, spaceCraftImg, alienShipImg, backgroundImg, spaceCraftGroup, alienShipGroup ;

var redLaserX=10;
var redLaser=[];
var score=0;
var greenLaser=[];
var count = 0;
var gamestate="play"

function preload(){

 spaceCraftImg = loadImage("spacecraft1.png");
  alienShipImg = loadImage("spaceship-304073_960_720.png");
  backgroundImg = loadImage("spacebg.jpg");
  alienShipGroup  = new Group();

}


function setup() {
  createCanvas(displayWidth,displayHeight)
  
  spaceCraft = createSprite(displayWidth-1000, displayHeight-500, 50, 50);
  spaceCraft.addImage("spaceCraft",spaceCraftImg);
 spaceCraft.scale=0.3;
 laserLight2()

 
}


function draw() {
  //background("blue");  
  background(backgroundImg);

  if(gamestate === "play"){

  if(keyDown(UP_ARROW)){
    spaceCraft.y -= 5; 
  }
  if(keyDown(DOWN_ARROW)){
  spaceCraft.y += 5
  }
  if(keyDown(LEFT_ARROW)){
  spaceCraft.x -= 5;
  }
  
  if(keyDown(RIGHT_ARROW)){
  spaceCraft.x += 5;
  }

  if(keyDown("space")){
  laserLight2();

    }

  spawnalienShip();
  
 if(spaceCraft.isTouching(redLaser) || score >= 10){
 //spaceCraft.remove();
 //alienShipGroup.remove();
  gamestate="end"
   }

   
   if(alienShipGroup.isTouching(greenLaser)){
    //alienShip.get(k).destory()
    //pos = alienShip.get(k)
    //alienShip.remove()
    // greenLaser.remove();
    score=score+1
     }
  

     if(alienShipGroup.collide(greenLaser)){
        greenLaser.collide(alienShip,alienShipHit)
     }


    
  textSize(50);
  text("score: " + score, 226, 50);


  

 
}
else{
  
  alienShipGroup.destroyEach()
  spaceCraft.remove()
  redLaser.lenght = 0;
  greenLaser.remove()
  
  if(score > 10 ){
    textSize(100);
    text("YOU WIN " + score, width/2, height/2)
    
  }
  else{
      textSize(100);
      text("YOU LOSE " + score, width/2, height/2)
    
  
  }
}
drawSprites();
}

function spawnalienShip(){
  if(frameCount%60===0){
    ay = Math.round(random(100,800))
    ax = Math.round(random(800,1200))
    alienShip = createSprite(ax, ay, 50, 50);
    //alienShip.shapeColor="red"
    alienShip.addImage("alienShip",alienShipImg);
    alienShip.scale=0.1
    alienShipGroup.add(alienShip)
    for(var i = 1 ; i<5 ; i++){
      laserLight()
    }
    //alienShip.debug = true;
    //greenLaser.debug = true;
   // count++; 
  }

  
}

function laserLight(){
  var a=1;
for(var i=0;i<5;i++){
  redLaser[i] = createSprite(ax,ay,50,5) 
  redLaser[i].shapeColor = "red"
  if(frameCount%10===0){
    redLaserX=redLaserX + 0.25
  
  }
  redLaser[i].velocityX=redLaserX*-1
//laser[i].shapeColor = 166+(i*10)
//console.log(redLaserX)

//console.log(a++)
//console.log(laser.x + "," + laser.y)


}

}

function laserLight2(){
  greenLaser = createSprite(spaceCraft.x,spaceCraft.y ,50,5) 
  greenLaser.shapeColor = "green"
 greenLaserX=greenLaser.velocityX = 10

}

function alienShipHit(greenLaser,alienShip){
  alienShipGroup.remove(alienShip)
  greenLaser.destory();
  score=score+1
}
