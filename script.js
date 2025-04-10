const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
    constructor(x, y, radius, color) {
        this.x = x, 
        this.y = y,
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
};

const player = new Player((canvas.width/2), (canvas.height/2), 20, 'blue');

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    };

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };
};

const projectiles = [];

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    };

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };
};

const enemies = []

const spawnEnemy = () => {
    setInterval(() => {
        const enemy = new Enemy(100, 100, 30, 'red', {x: 1, y: 1});
        enemies.push(enemy);
    }, 1000);
};

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    projectiles.forEach((projectile) => {
        projectile.update();
    });

    enemies.forEach((enemy) => {
        enemy.update();
    });
};

canvas.addEventListener('click', (event) => {
    const angle = Math.atan2((event.clientY - canvas.height/2), (event.clientX - canvas.width/2));
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };

    const projectile = new Projectile(canvas.width/2, canvas.height/2, 5, 'red', velocity);
    
    projectiles.push(projectile);

});

animate();
spawnEnemy();
