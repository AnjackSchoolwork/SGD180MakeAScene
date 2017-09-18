var player = {
	"x": 0,
	"y": 0,
	"w": 10,
	"h": 10,
	"move_x": 0,
	"move_y": 0
}

/**
 * 
 */
function setup() {
	loadConfig()

	setInterval(function () { mainLoop(document.getElementById("mainCanvas"), getCtx()) }, 10)

	document.addEventListener('keypress', keyPressEvent)
	document.addEventListener('keyup'
	
}

function loadConfig() {
	pMove = {}
	pMove['up'] = "KeyW"
	pMove['down'] = "KeyS"
	pMove['left'] = "KeyA"
	pMove['right'] = "KeyD"
	pMove['jump'] = "Space"
}

function getCtx() {
	mainCanvas = document.getElementById("mainCanvas")
	return mainCanvas.getContext("2d")
}

/**
 * Main game loop.
 *
 * @param {object} canvas	Reference to the canvas being used.
 * @param {object} ctx	Reference to the context of that canvas.
 */
function mainLoop(canvas, ctx) {
	redrawCanvas(canvas, ctx)
}

/**
 * Clears the canvas and redraws all objects at their
 * new positions.
 *
 * @param {object} ctx	Reference to the context of canvas being used.
 */
function redrawCanvas(canvas, ctx) {
	ctx.fillStyle = "#ffffff"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	drawPlayer(ctx)
}

/**
 * Draw a rectangle on the canvas.
 * 
 * @param {object} ctx	Reference to context of canvas being used.
 * @param {integer} x	X-coordinate.
 * @param {integer} y	Y-coordinate.
 * @param {integer} w	Width of rectangle.
 * @param {integer} h	Height of rectangle.
 * @param {color} fill	Fill color or null if no fill.
 */
function makeRect(ctx, x, y, w, h, fill) {
	if (fill != null) {
		ctx.fillStyle = fill
		ctx.fillRect(x, y, w, h)
	}
	else {
		ctx.strokeRect(x, y, w, h)
	}
}

function movePlayer(newCoords) {
	player["x"] += newCoords["x"]
	player["y"] += newCoords["y"]
	console.log(player)
}

function drawPlayer(ctx) {
	makeRect(ctx, player["x"], player["y"], player["w"], player["h"], "#000000")
}

function keyPressEvent(event) {
	var moveAdjust = { "x": 0, "y": 0 }
	moveIncrement = 5;
	if (event.code == pMove["up"]) {
		player["move_y"] -= moveIncrement
	}
	if (event.code == pMove["down"]) {
		player["move_y"] += moveIncrement
	}
	if (event.code == pMove["left"]) {
		player["move_x"] -= moveIncrement
	}
	if (event.code == pMove["right"]) {
		player["move_x"] += moveIncrement
	}
}