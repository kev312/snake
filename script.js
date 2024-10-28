const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function drawSnake() {
    ctx.fillStyle = 'blue';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert(`Perdiste Juvenil, Tu record es: ${score}`);
        snake = [{ x: 200, y: 200 }];
        direction = { x: 0, y: 0 };
        score = 0;
        food = getRandomFoodPosition();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

document.getElementById('up').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});

document.getElementById('down').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});

document.getElementById('left').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});

document.getElementById('right').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

food = getRandomFoodPosition();
gameLoop();
