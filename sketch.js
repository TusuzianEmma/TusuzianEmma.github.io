var isGameOver;
var score;

var GRAVITY = 0.5;
var JUMP = -5;

var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;

var player;

var obstacleSprites;
var pointSprites;


function setup() {

    isGameOver = false;
    score = 0;

    createCanvas(700, 500);
    background(169, 228, 219);


    groundSprites = new Group();

    numGroundSprites = width/GROUND_SPRITE_WIDTH+1;

    for (var n = 0; n < numGroundSprites; n++) {
    var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
    groundSprite.shapeColor = color(255, 217, 204);
    groundSprites.add(groundSprite);
    }

    player = createSprite(100, height-75, 70, 70);
    player.shapeColor = color(228, 169, 187);
    obstacleSprites = new Group();
    pointSprites = new Group();
}


function draw() {
    if (isGameOver) {
        background(156, 205, 205);
        fill(255);
        textAlign(CENTER);
        textSize(50);
        textFont('Gloria Hallelujah');
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
        textSize(30);
        text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y + 30);
    } else {
        background(169, 228, 219);

        player.velocity.y = player.velocity.y + GRAVITY;

        if (groundSprites.overlap(player)) {
            player.velocity.y = 0;
            player.position.y = (height-50) - (player.height/2);
        }

        if (keyDown(32)) {
            player.velocity.y = JUMP;
        }

        player.position.x = player.position.x + 5;
        camera.position.x = player.position.x + (width/4);

        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
            groundSprites.add(firstGroundSprite);
        }

        if (random() > 0.98) {
            var obstacle = createSprite(camera.position.x + width, random((height-50)-15), 30, 30);
            obstacle.draw = function() {ellipse(0,0,40)};
            obstacleSprites.add(obstacle);
        }


        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
            removeSprite(firstObstacle);
        }

        obstacleSprites.overlap(player, endGame);

        if (random() > 0.995) {
            var point = createSprite(camera.position.x + width, random((height-70)-15), 50, 50);
            point.draw = function() {fill(255, 255, 153); quad(38, 51, 86, 20, 69, 63, 30, 10)};
            pointSprites.add(point);
        }


        pointSprites.overlap(player, addPoints);
        pointSprites.overlap(player, removeSprite);



        drawSprites();

        score = score + 1;
        fill(255);
        textAlign(CENTER);
        textSize(40);
        textFont('Gloria Hallelujah');
        text(score, camera.position.x, 35);
    }
}


function addPoints() {
    score = score + 100;
}

function removeSprite() {
    removeSprite(point);
}

function endGame() {
    isGameOver = true;
}

function mouseClicked() {
  if (isGameOver) {
    for (var n = 0; n < numGroundSprites; n++) {
      var groundSprite = groundSprites[n];
      groundSprite.position.x = n*50;
    }

    player.position.x = 100;
    player.position.y = height-75;

    obstacleSprites.removeSprites();

    score = 0;
    isGameOver = false;
  }
}
