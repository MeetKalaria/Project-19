var rocket,rocketImg
var obstacle,obstaclesGroup
var space
var gameState = "play"
var score = 0

function preload(){
  rocketImg = loadImage("rocket.png")
  obstacleImg = loadImage("fireball.png")
  spaceImg = loadImage("space.png")
}

function setup() {
 createCanvas(600,600)

 space = createSprite(300,300)
 space.addImage(spaceImg)
 space.velocityY = 1

 rocket = createSprite(300,500,50,50)
 rocket.addImage(rocketImg)
 rocket.scale=0.2

 obstaclesGroup = new Group()
 
 score = 0
 
}

function draw() {
 
 background(200)

 if(gameState === "play"){

    if(keyDown("RIGHT")){
        rocket.x = rocket.x+3
    }

    if(keyDown("LEFT")){
        rocket.x = rocket.x-3
    }

    if(space.y>325){
        space.y=300
    }

    spawnObstacles()

    if(obstaclesGroup.isTouching(rocket)){
        rocket.velocityY = 0
        rocket.destroy()
        
        gameState = "end"
    }

    drawSprites()
 }
 
 if(gameState === "end"){

    stroke("blue")
    fill("blue")

    textSize(30)
    text("Game Over",230,250)
 }
}

function spawnObstacles(){
    if(frameCount % 250 === 0){
        var obstacle = createSprite(200,-50)

        obstacle.x = Math.round(random(120,400))
        obstacle.velocityY=5

        obstacle.addImage(obstacleImg)

        rocket.depth = obstacle.depth
        rocket.depth +=1

        obstacle.lifetime = 800

        obstaclesGroup.add(obstacle)
    }
}