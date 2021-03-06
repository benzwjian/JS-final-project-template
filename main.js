var bgImg = document.createElement("img");
bgImg.src = "images/map.png";

var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

var towerBtnImg = document.createElement("img");
towerBtnImg.src = "images/tower-btn.png";

var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";

var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var clock = 0;
var hp = 100;
var FPS = 60;

function Enemy () {
	this.x = 96;
	this.y = 480 - 32;
	this.speedX = 0;
	this.speedY = -64 / FPS;
	this.pathDes = 0;
	this.hp = 5; //以後會根據等級來決定hp值
	this.move = function () {
		this.x += this.speedX;
		this.y += this.speedY;
		if (isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, 64 / FPS, 64 / FPS)) {

			if (this.pathDes === enemyPath.length - 1) { //判斷是否碰到樹
				this.hp = 0; //enemy的hp變成0
				hp -= 10; //樹的hp減10
			} else {
				this.x = enemyPath[this.pathDes].x;
				this.y = enemyPath[this.pathDes].y;
				this.pathDes++;

				if (this.x > enemyPath[this.pathDes].x) {
					this.speedX = -64 / FPS;
				} else if (this.x < enemyPath[this.pathDes].x) {
					this.speedX = 64 / FPS;
				} else {
					this.speedX = 0;
				}

				if (this.y > enemyPath[this.pathDes].y) {
					this.speedY = -64 / FPS;
				} else if (this.y < enemyPath[this.pathDes].y) {
					this.speedY = 64 / FPS;
				} else {
					this.speedY = 0;
				}
			}
		}
	}
}
var enemies = [];
enemies.push(new Enemy());
/*
var enemy = {
	x: 96,
	y: 480 - 32,
	speedX: 0,
	speedY: -64 / FPS,
	pathDes: 0,
	move: function () {
		this.x += this.speedX;
		this.y += this.speedY;
		if (isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, 64 / FPS, 64 / FPS)) {
			this.x = enemyPath[this.pathDes].x;
			this.y = enemyPath[this.pathDes].y;
			this.pathDes++;

			if (this.x > enemyPath[this.pathDes].x) {
				this.speedX = -64 / FPS;
			} else if (this.x < enemyPath[this.pathDes].x) {
				this.speedX = 64 / FPS;
			} else {
				this.speedX = 0;
			}

			if (this.y > enemyPath[this.pathDes].y) {
				this.speedY = -64 / FPS;
			} else if (this.y < enemyPath[this.pathDes].y) {
				this.speedY = 64 / FPS;
			} else {
				this.speedY = 0;
			}
		}
	}
}
*/
var enemyPath = [
    {x:96, y:64},
    {x:384, y:64},
    {x:384, y:192},
    {x:224, y:192},
    {x:224, y:320},
    {x:544, y:320},
    {x:544, y:96}
];

function draw() {
	ctx.font = "24px Arial";
	ctx.fillStyle = "white"; // or #fff

	clock++;
	if (clock % 80 == 0) {
		var enemy = new Enemy();
		enemies.push(enemy);
	};
	ctx.drawImage(bgImg, 0, 0);
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].hp == 0) {
			enemies.splice(i, 1);
		} else {
			enemies[i].move();
			ctx.drawImage(enemyImg, enemies[i].x, enemies[i].y);
		}
	}
	ctx.drawImage(towerBtnImg, 640 - 64, 480 - 64, 64, 64);
	if (isBuilding) ctx.drawImage(towerImg, cursor.x - 16, cursor.y - 16, 32, 32);
	ctx.drawImage(towerImg, tower.x, tower.y, 32, 32);

	ctx.fillText("HP:"+hp, 16, 32);

	//尋找目標enemy
	tower.searchEnemy();
	if (tower.aimingEnemyId !== null) {
	    var id = tower.aimingEnemyId;
	    ctx.drawImage(crosshairImg, enemies[id].x, enemies[id].y);
	}
}

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
	if (pointX >= targetX 
		&& pointX <= targetX + targetWidth 
		&& pointY >= targetY 
		&& pointY <= targetY + targetHeight
	) {
		return true;
	} else {
		return false;
	}
}

setInterval(draw, 1000 / FPS);

var cursor = {
	x: 0,
	y: 0
}

var tower = {
	x: -64,
	y: -64,
	range: 96,
	aimingEnemyId: null,
	searchEnemy: function () {
		for (var i = 0; i < enemies.length; i++) {
			var distance = Math.sqrt(Math.pow(this.x - enemies[i].x, 2) + Math.pow(this.y - enemies[i].y ,2));
			if (distance < this.range) {
				this.aimingEnemyId = i;
				return;
			}
		}
		//如果enemy都沒有在範圍裡面,會到這行,清除鎖定的目標
		this.aimingEnemyId = null;
	}
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

