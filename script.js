const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    };

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);;
        ctx.fill();
    };
};

class MovingCircle extends Circle {
    constructor(x, y, radius, color, velocity) {
        super(x, y, radius, color);
        this.velocity = velocity;
    };

    update(ctx) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw(ctx)
    };
};

const player = new Circle(CENTER_X, CENTER_Y, 30, 'blue');
const enemies = [];
const projectiles = [];

function spawnEnemy() {
    setInterval(() => {
        const radius = Math.floor(Math.random() * (30 - 5 + 1)) + 5;;
        const color = 'red';
        let x, y;

        const edge = Math.floor(Math.random() * 4);

        if (edge === 0) {
            x = -radius;
            y = Math.random() * canvas.height;
        } else if (edge === 1) {
            x = canvas.width + radius;
            y = Math.random() * canvas.height;
        } else if (edge === 2) {
            x = Math.random() * canvas.width;
            y = -radius;
        } else {
            x = Math.random() * canvas.width;
            y = canvas.height + radius;
        }

        const angle = Math.atan2(CENTER_Y - y, CENTER_X - x);

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        const enemy = new MovingCircle(x, y, radius, color, velocity);
        enemies.push(enemy);
    }, 1000);
};

canvas.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - CENTER_Y, event.clientX - CENTER_X);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };

    const projectile = new MovingCircle(CENTER_X, CENTER_Y, 10, 'yellow', velocity);
    projectiles.push(projectile);
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);

    enemies.forEach((enemy) => {
        enemy.update(ctx);
    });

    projectiles.forEach((projectile) => {
        projectile.update(ctx);
    })
};

animate();
spawnEnemy();
