
/**
 * The player object.
 */
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

	document.addEventListener('keydown', keyDownEvent)
	document.addEventListener('keyup', keyUpEvent)
	
}

/**
 * Load up default configuration.
 * TODO: Load these values from a file.
 */
function loadConfig() {
	pMove = {}
	pMove['up'] = "KeyW"
	pMove['down'] = "KeyS"
	pMove['left'] = "KeyA"
	pMove['right'] = "KeyD"
	pMove['jump'] = "Space"
	pMove['speed'] = 5
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
	movePlayer()
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

/**
 * Set player coordinates based upon the current movement direction
 * (if any) and speed.
 */
function movePlayer() {
	if (player.move_x != 0) {
		player.x += pMove['speed'] * player.move_x
	}
	if (player.move_y != 0) {
		player.y += pMove['speed'] * player.move_y
	}
}

/**
 * Draws the player avatar at the coordinates and with the dimensions
 * defined in pMove.
 *
 * @param {context} ctx
 */
function drawPlayer(ctx) {
	makeRect(ctx, player["x"], player["y"], player["w"], player["h"], "#000000")
}

/**
 * Sets directional movement (per axis) when key is pressed.
 *
 * @param {any} event
 */
function keyDownEvent(event) {
	if (event.code == pMove["up"]) {
		if (player.move_y > -1)
			player.move_y += -1
	}
	if (event.code == pMove["down"]) {
		if (player.move_y < 1)
			player.move_y += 1
	}
	if (event.code == pMove["left"]) {
		if (player.move_x > -1)
			player.move_x += -1
	}
	if (event.code == pMove["right"]) {
		if (player.move_x < 1)
			player.move_x += 1
	}
}

/**
 * Will reduce direction movement (per axis) when the key is released.
 * TODO: Correct behavior when opposing directions are held down.
 * @param {event} event	- The event info.
 */
function keyUpEvent(event) {
	if (event.code == pMove["down"]) {
		if (player.move_y > -1)
			player.move_y += -1
	}
	if (event.code == pMove["up"]) {
		if (player.move_y < 1)
			player.move_y += 1
	}
	if (event.code == pMove["right"]) {
		if (player.move_x > -1)
			player.move_x += -1
	}
	if (event.code == pMove["left"]) {
		if (player.move_x < 1)
			player.move_x += 1
	}
}