// const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
// const maxVelocity = 8;
// const cellsHorizontal = 4;
// const cellsVertical = 3;
// const width = Window.innerWidth;
// const height = Window.innerHeight;

// const unitLengthX = width / cellsHorizontal;
// const unitLengthY = height / cellsVertical;

// const engine = Engine.create();

// const { world } = engine;
// engine.world.gravity.y = 0;
// const render = Render.create({
// 	element: document.body,
// 	engine: engine,
// 	options: {
// 		wireframes: true,
// 		width,
// 		height
// 	}
// });
// Render.run(render);
// Runner.run(Runner.create(), engine);

// // Walls
// const walls = [
// 	Bodies.rectangle(width / 2, 0, width, 6, { isStatic: true }),
// 	Bodies.rectangle(width / 2, height, width, 6, { isStatic: true }),
// 	Bodies.rectangle(0, height / 2, 6, height, { isStatic: true }),
// 	Bodies.rectangle(width, height / 2, 6, height, { isStatic: true })
// ];
// World.add(world, walls);

// // Maze generation

// const shuffle = (arr) => {
// 	let counter = arr.length;

// 	while (counter > 0) {
// 		const index = Math.floor(Math.random() * counter);

// 		counter--;

// 		const temp = arr[counter];
// 		arr[counter] = arr[index];
// 		arr[index] = temp;
// 	}

// 	return arr;
// };

// const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));

// const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));

// const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));

// const startRow = Math.floor(Math.random() * cellsVertical);
// const startColumn = Math.floor(Math.random() * cellsHorizontal);

// const stepThroughCell = (row, column) => {
// 	// If i have visted the cell at [row, column], then return
// 	if (grid[row][column]) {
// 		return;
// 	}

// 	// Mark this cell as being visited
// 	grid[row][column] = true;

// 	// Assemble randomly-ordered list of neighbors
// 	const neighbors = shuffle([
// 		[ row - 1, column, 'up' ],
// 		[ row, column + 1, 'right' ],
// 		[ row + 1, column, 'down' ],
// 		[ row, column - 1, 'left' ]
// 	]);
// 	// For each neighbor....
// 	for (let neighbor of neighbors) {
// 		const [ nextRow, nextColumn, direction ] = neighbor;

// 		// See if that neighbor is out of bounds
// 		if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
// 			continue;
// 		}

// 		// If we have visited that neighbor, continue to next neighbor
// 		if (grid[nextRow][nextColumn]) {
// 			continue;
// 		}

// 		// Remove a wall from either horizontals or verticals
// 		if (direction === 'left') {
// 			verticals[row][column - 1] = true;
// 		} else if (direction === 'right') {
// 			verticals[row][column] = true;
// 		} else if (direction === 'up') {
// 			horizontals[row - 1][column] = true;
// 		} else if (direction === 'down') {
// 			horizontals[row][column] = true;
// 		}

// 		stepThroughCell(nextRow, nextColumn);
// 	}
// };

// stepThroughCell(startRow, startColumn);

// horizontals.forEach((row, rowIndex) => {
// 	row.forEach((open, columnIndex) => {
// 		if (open) {
// 			return;
// 		}

// 		const wall = Bodies.rectangle(
// 			columnIndex * unitLengthX + unitLengthX / 2,
// 			rowIndex * unitLengthY + unitLengthY,
// 			unitLengthX,
// 			5,
// 			{
// 				label: 'wall',
// 				isStatic: true
// 			}
// 		);
// 		World.add(world, wall);
// 	});
// });

// verticals.forEach((row, rowIndex) => {
// 	row.forEach((open, columnIndex) => {
// 		if (open) {
// 			return;
// 		}

// 		const wall = Bodies.rectangle(
// 			columnIndex * unitLengthX + unitLengthX,
// 			rowIndex * unitLengthY + unitLengthY / 2,
// 			5,
// 			unitLengthY,
// 			{
// 				label: 'wall',
// 				isStatic: true
// 			}
// 		);
// 		World.add(world, wall);
// 	});
// });

// const goal = Bodies.rectangle(width - unitLengthX / 2, height - unitLengthY / 2, unitLengthX * 0.7, unitLengthY * 0.7, {
// 	isStatic: true,
// 	label: 'goal'
// });
// World.add(world, goal);
// const radius = Math.min(unitLengthX, unitLengthY) / 4;
// const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, radius, {
// 	isStatic: false,
// 	label: 'ball'
// });
// World.add(world, ball);
// document.addEventListener('keydown', (event) => {
// 	const { x, y } = ball.velocity;

// 	if (event.keyCode === 87) {
// 		// Body.setVelocity(ball, { x, y: y - 5 });
// 		Body.setVelocity(ball, { x, y: Math.max(y - 5, -maxVelocity) });
// 	}
// 	if (event.keyCode === 68) {
// 		Body.setVelocity(ball, { x: Math.min(x + 5, maxVelocity), y });
// 	}
// 	if (event.keyCode === 83) {
// 		Body.setVelocity(ball, { x, y: Math.min(y + 5, maxVelocity) });
// 	}
// 	if (event.keyCode === 65) {
// 		Body.setVelocity(ball, { x: Math.max(x - 5, -maxVelocity), y });
// 	}
// });

// Events.on(engine, 'collisionStart', (event) => {
// 	event.pairs.forEach((collision) => {
// 		const labels = [ 'goal', 'ball' ];
// 		if (labels.includes(collision.bodyA.label) && collision.bodyB.label) {
// 			world.gravity.y = 1;
// 			world.bodies.forEach((body) => {
// 				if (body.label === 'wall') {
// 					Body.setStatic(body, false);
// 				}
// 			});
// 		}
// 	});
// });
const reset = document.querySelector('.restart');
// reset.addEventListener('click', function() {
// 	starter();
// 	stepThroughCell(startRow, startColumn);
// 	shuffle(arr);
// });
run = () => {
	//add hidden class
	document.querySelector('.after').classList.add('hidden');
	ball();
};
reset.addEventListener('click', run);

const maxVelocity = 8;
const cellsHorizontal = 3;
const cellsVertical = 3;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: false,
		width,
		height
	}
});
Render.run(render);
Runner.run(Runner.create(), engine);
// Walls
const walls = [
	Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
	Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
	Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
	Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// Maze generation

const shuffle = (arr) => {
	let counter = arr.length;

	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);

		counter--;

		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}

	return arr;
};

const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
	// If i have visted the cell at [row, column], then return
	if (grid[row][column]) {
		return;
	}

	// Mark this cell as being visited
	grid[row][column] = true;

	// Assemble randomly-ordered list of neighbors
	const neighbors = shuffle([
		[ row - 1, column, 'up' ],
		[ row, column + 1, 'right' ],
		[ row + 1, column, 'down' ],
		[ row, column - 1, 'left' ]
	]);
	// For each neighbor....
	for (let neighbor of neighbors) {
		const [ nextRow, nextColumn, direction ] = neighbor;

		// See if that neighbor is out of bounds
		if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
			continue;
		}

		// If we have visited that neighbor, continue to next neighbor
		if (grid[nextRow][nextColumn]) {
			continue;
		}

		// Remove a wall from either horizontals or verticals
		if (direction === 'left') {
			verticals[row][column - 1] = true;
		} else if (direction === 'right') {
			verticals[row][column] = true;
		} else if (direction === 'up') {
			horizontals[row - 1][column] = true;
		} else if (direction === 'down') {
			horizontals[row][column] = true;
		}

		stepThroughCell(nextRow, nextColumn);
	}
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) {
			return;
		}

		const wall = Bodies.rectangle(
			columnIndex * unitLengthX + unitLengthX / 2,
			rowIndex * unitLengthY + unitLengthY,
			unitLengthX,
			5,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: 'red'
				}
			}
		);
		World.add(world, wall);
	});
});

verticals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) {
			return;
		}

		const wall = Bodies.rectangle(
			columnIndex * unitLengthX + unitLengthX,
			rowIndex * unitLengthY + unitLengthY / 2,
			5,
			unitLengthY,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: 'red'
				}
			}
		);
		World.add(world, wall);
	});
});

// Goal

const goal = Bodies.rectangle(width - unitLengthX / 2, height - unitLengthY / 2, unitLengthX * 0.7, unitLengthY * 0.7, {
	label: 'goal',
	isStatic: true,
	render: {
		fillStyle: 'green'
	}
});
World.add(world, goal);

// Ball
function ballo() {
	const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
	var ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
		label: 'ball',
		render: {
			fillStyle: 'blue'
		}
	});
	World.add(world, ball);

	document.addEventListener('keydown', (event) => {
		const { x, y } = ball.velocity;

		if (event.keyCode === 87) {
			// Body.setVelocity(ball, { x, y: y - 5 });
			Body.setVelocity(ball, { x, y: Math.max(y - 5, -maxVelocity) });
		}
		if (event.keyCode === 68) {
			Body.setVelocity(ball, { x: Math.min(x + 5, maxVelocity), y });
		}
		if (event.keyCode === 83) {
			Body.setVelocity(ball, { x, y: Math.min(y + 5, maxVelocity) });
		}
		if (event.keyCode === 65) {
			Body.setVelocity(ball, { x: Math.max(x - 5, -maxVelocity), y });
		}
	});
}
ballo();
// Win Condition

Events.on(engine, 'collisionStart', (event) => {
	event.pairs.forEach((collision) => {
		const labels = [ 'ball', 'goal' ];

		if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
			document.querySelector('.after').classList.remove('hidden');
			world.gravity.y = 1;
			World.remove(world, ball);
			world.bodies.forEach((body) => {
				if (body.label === 'wall') {
					Body.setStatic(body, false);
				}
			});
		}
	});
});
