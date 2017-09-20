
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
	//redrawCanvas(canvas, ctx)
	movePlayer()
}

/**
 * Clears the canvas and redraws all objects at their
 * new positions.
 *
 * @param {object} canvas Reference to the canvas being used.
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
		ctx.strokeStyle = "#8A511D"
		ctx.strokeRect(x, y, w, h)
	}
	else {
		ctx.strokeRect(x, y, w, h)
	}
}

/**
 * Generates a tree of specified height.
 *
 * @param {object} ctx
 * @param {integer} x
 * @param {integer} y
 * @param {integer} tree_h
 */
function generateTree(ctx, x, y, tree_h) {
	trunk_height = (tree_h / 7) * 6
	trunk_width = randomOffset(Math.floor(trunk_height / 4), 50)
	canopy_height = randomOffset(Math.floor(trunk_height / 3), 75)
	canopy_width = randomOffset(Math.floor(2 * trunk_width), 20)

	makeTree(ctx, x, y, trunk_width, trunk_height, canopy_width, canopy_height)
}

/**
 * Generates a rectangle group of trees with specified average height.
 * 
 * @param {object} ctx		Reference to the context of the canvas being used.
 * @param {integer} x		X-coordinate of lower-left corner.
 * @param {integer} y		Y-coordinate of lower-left corner.
 * @param {integer} w		Total width of the stand (to the base of the trees)
 * @param {integer} h		Total height of the stand (to the base of the trees)
 * @param {integer} avg_h	Average height of trees in the stand.
 * @param {integer} density	How dense is the tree cover?
 */
function generateTreeStand(ctx, x, y, w, h, avg_h) {
	avg_width = Math.floor(avg_h / 4) * 2
	grid_x_num = Math.floor(w / avg_width)
	grid_y_num = Math.floor(h / avg_width)

	for (var y_int = 0; y_int <= grid_y_num; y_int++) {
		for (var x_int = 0; x_int <= grid_x_num; x_int++) {
			if (Math.floor(Math.random() * 100) % 3 == 0) {
				generateTree(ctx, x + (avg_width * x_int), y + (avg_width * y_int), avg_h)
			}
		}
	}
}

/**
 * Returns an integer within the specified percentage of supplied number.
 * @param {integer} num		Base number for calculation.
 * @param {integer} offset	Max percentage offset allowed from base.
 */
function randomOffset(num, offset) {
	change_amt = Math.floor(Math.random() * offset)
	return num + ((num / 100) * change_amt)
}

/**
 * Draws a simple tree-like shape. Will have a brown trunk and green canopy.
 *
 * @param {object} ctx
 * @param {integer} x			X-coordinate of bottom center of tree (trunk).
 * @param {integer} y			Y-coordinate of bottom center of tree (trunk).
 * @param {integer} trunk_w		Width of the trunk rectangle.
 * @param {integer} trunk_h		Height of the trunk rectangle.
 * @param {integer} canopy_w	Width of the ellipse at the top of the tree.
 * @param {integer} canopy_h	Height of the ellipse at the top of the tree.
 */
function makeTree(ctx, x, y, trunk_w, trunk_h, canopy_w, canopy_h) {
	trunk_x = x - (trunk_w / 2)
	trunk_y = y
	canopy_x = x
	canopy_y = y - trunk_h
	makeRect(ctx, trunk_x, trunk_y, trunk_w, -trunk_h, "brown")
	ctx.beginPath()
	ctx.ellipse(canopy_x, canopy_y, canopy_w, canopy_h, 0, 0, 2 * Math.PI)
	ctx.fillStyle = "#0CE868"
	ctx.fill()
	ctx.strokeStyle = "#09AD4E"
	ctx.stroke()
	ctx.closePath()
}

/**
 * Generates a house with a rectangular body, a square roof, some windows and a chimney.
 * 
 * @param {object} ctx	Reference to the context of the canvas being used.
 * @param {integer} x	X-coordinate of lower-middle point on house.
 * @param {integer} y	Y-coordinate of lower-middle point on house.
 * @param {integer} h	Height of house from the ground to the peak of the roof.
 */
function makeHouse(ctx, x, y, h) {
	box_height = 2 * (h / 3)
	box_width = 3 * (h / 4)
	box_x = x - (box_width / 2)
	box_y = y
	roof_height = (h / 3)
	roof_width = box_width
	roof_x = box_x
	roof_y = box_y - box_height
	door_height = 4 * ((box_height / 2) / 5)
	door_width = door_height / 3
	door_x = box_x + 10
	window_square_height = box_height / 3
	window_square_width = window_square_height
	window_square_x = box_x + box_width - window_square_width - 10
	window_square_y = box_y - window_square_height
	chimney_width = roof_width / 6
	chimney_x = roof_x + roof_width - chimney_width - 10
	chimney_y = y - h

	// Draw the chimney first
	makeRect(ctx, chimney_x, chimney_y, chimney_width, roof_height, "#963311")
	// Draw the main box next
	makeRect(ctx, box_x, box_y, box_width, -box_height, "#023296")
	// Then draw the roof
	ctx.fillStyle = "#D1170D"
	ctx.beginPath()
	ctx.moveTo(roof_x, roof_y)
	ctx.lineTo(roof_x + (roof_width / 2), roof_y - roof_height)
	ctx.lineTo(roof_x+ roof_width, roof_y)
	//ctx.lineTo(roof_x, roof_y)
	ctx.fill()
	ctx.closePath()
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