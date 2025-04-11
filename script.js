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

const player = new Player((canvas.width/2), (canvas.height/2), 30, 'blue');

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

const enemies = [];

const spawnEnemy = () => {
    setInterval(() => {
        const radius = 20;

        let x, y
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
            case 0:
                x = -radius;
                y = Math.random() * canvas.height;
                break;
            case 1:
                x = canvas.width + radius;
                y = Math.random() * canvas.height;
                break;
            case 2:
                y = -radius;
                x = Math.random() * canvas.width;
                break;
            case 3:
                y = canvas.height + radius;
                x = Math.random() * canvas.width;
                break;
        };

        const color = 'red';

        const angle = Math.atan2(canvas.height/2 - y, canvas.width/2 - x);
        const velocity = {
            x: Math.cos(angle), 
            y: Math.sin(angle)
        };
        
        const enemy = new Enemy(x, y, radius, color, velocity);
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
