var bgImg = document.createElement("img");
bgImg.src = "images/map.png";

var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

var towerBtnImg = document.createElement("img");
towerBtnImg.src = "images/tower-btn.png";

var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var FPS = 60;

var enemy = {
	x: 96,
	y: 480 - 32,
	speedX: 0,
	speedY: -64 / FPS,
	move: function () {
		this.x += this.speedX;
		this.y += this.speedY;
	}
}

function draw() {
	enemy.move();
	ctx.drawImage(bgImg, 0, 0);
	ctx.drawImage(enemyImg, enemy.x, enemy.y);
	ctx.drawImage(towerBtnImg, 640 - 64, 480 - 64, 64, 64);
	if (isBuilding) ctx.drawImage(towerImg, cursor.x, cursor.y, 32, 32);
	ctx.drawImage(towerImg, tower.x, tower.y, 32, 32);
}

setInterval(draw, 1000 / FPS);

var cursor = {
	x: 0,
	y: 0
}

var tower = {
	x: -64,
	y: -64
}

var isBuilding = false;

$('#game-canvas').on('mousemove', function (event) {
	console.log('x: ' + event.offsetX + ', y: ' + event.offsetY);
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
})
.on('click', function (event) {
	if (cursor.x > 640 - 64 && cursor.y > 480 - 64) {
		isBuilding = true;
	}  else {
		tower.x = Math.floor(cursor.x / 32) * 32;
		tower.y = Math.floor(cursor.y / 32) * 32;
		isBuilding = false;
	}
});

