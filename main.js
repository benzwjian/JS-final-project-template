var bgImg = document.createElement("img");
bgImg.src = "images/map.png";

var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

var towerBtnImg = document.createElement("img");
towerBtnImg.src = "images/tower-btn.png";

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var enemy = {
	x: 96,
	y: 480 - 32
}

function draw() {
	ctx.drawImage(bgImg, 0, 0);
	ctx.drawImage(enemyImg, enemy.x, enemy.y);
	ctx.drawImage(towerBtnImg, 640 - 64, 480 - 64, 64, 64);
	if (isBuilding) ctx.drawImage(towerBtnImg, cursor.x, cursor.y, 64, 64);
}

setInterval(draw, 16);

var cursor = {
	x: 0,
	y: 0
}

var isBuilding = false;

$('#game-canvas').on('mousemove', function (event) {
	console.log('x: ' + event.offsetX + ', y: ' + event.offsetY);
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
})
.on('click', function (event) {
	if (cursor.x > 640 - 64 && cursor.y > 480 - 64) {
		isBuilding = !isBuilding;
	}  else {
		isBuilding = false;
	}
});

