const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const container = document.querySelector('.container')
const btn = document.querySelector('button')
const scoreDiv = document.querySelector('.scoreDiv')
let score = 0;
btn.addEventListener('click', () => {
    container.style.display = "none"
    scoreDiv.style.display = "block"
    createConsumables()
    animate()
})

c.imageSmoothingEnabled = false;
const consumables = [];
function createConsumables() {
    for (let i = 0; i < 12; i++) {
        const consumable = {
            x: Math.random() * canvas.width,
            y: 125 + Math.random() * (canvas.height - 250),
            radius: 10,
            color: 'red',
            score: -4
        };
        consumables.push(consumable);
    }

    for (let i = 0; i < 25; i++) {
        const consumable = {
            x: Math.random() * canvas.width,
            y: 125 + Math.random() * (canvas.height - 250),
            radius: 10,
            color: 'green',
            score: 1
        };
        consumables.push(consumable);
    }
}
class SpaceShip {
    constructor() {
        const image = new Image();
        image.src = './assets/spaceship2.svg';

        image.onload = () => {
            const scale = 1;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = { x: canvas.width / 2, y: canvas.height / 2 };
            this.velocity = getRandomVelocity();
            this.force = { x: 0, y: 0 };
        };

        function getRandomVelocity() {
            const min = -3;
            const max = 3;
            const randomX = min + Math.random() * (max - min);
            const randomY = min + Math.random() * (max - min);
            return { x: randomX, y: randomY };
        }
    }

    draw() {
        if (this.image) {
            c.save();
            c.translate(this.position.x, this.position.y);
            c.rotate(this.calculateAngle());
            c.translate(-this.position.x, -this.position.y);
            c.drawImage(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
            c.restore()
        }
    }
    calculateAngle() {
        return Math.atan2(this.velocity.y, this.velocity.x)
    }

    updatePosition() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    applyForce() {
        this.limitProp(this.velocity, 4);
        this.velocity.x += this.force.x
        this.velocity.y += this.force.y
        this.vectorSetZero(this.force)
    }
    checkCollision() {
        let posX = this.position.x;
        let posY = this.position.y;
        for (let i = 0; i < consumables.length; i++) {
            const consumable = consumables[i];
            // Calculate distance between spaceship and consumable
            const dist = Math.hypot(consumable.x - posX, consumable.y - posY);

            // Check collision
            if (dist < 30) {
                // Update score
                score += consumable.score;

                consumable.x = Math.random() * canvas.width
                consumable.y = 125 + Math.random() * (canvas.height - 250)
            }
        }
    }

    limitProp(obj, limiter) {
        obj.x = (obj.x > limiter) ? limiter : (obj.x < -limiter) ? -limiter : obj.x;
        obj.y = (obj.y > limiter) ? limiter : (obj.y < -limiter) ? -limiter : obj.y;
    }


    calculateForce(distance, obj) {
        const maxForce = 0.2;
        const bounceFactor = 0.1;

        const dx = this.position.x - obj.position.x;
        const dy = this.position.y - obj.position.y;
        const inverseDistance = 1 / distance;

        const forceX = inverseDistance * dx * bounceFactor;
        const forceY = inverseDistance * dy * bounceFactor;

        this.force.x = Math.min(maxForce, Math.max(-maxForce, forceX));
        this.force.y = Math.min(maxForce, Math.max(-maxForce, forceY));
    };
calculateAngletoRotate(obj) {
    let distanceToObj = Math.hypot((obj.position.x - this.position.x), (obj.position.y - this.position.y));

    if (distanceToObj >= 150 || distanceToObj <= 30) {
        return;
    }

    let vectorToObj = {
        x: obj.position.x - this.position.x,
        y: obj.position.y - this.position.y,
    }

    let velX = this.velocity.x;
    let velY = this.velocity.y;

    let angle = Math.atan2(velY, velX) - Math.atan2(vectorToObj.y, vectorToObj.x);
    let angleAbs = Math.abs(angle);

    if (angleAbs < 2 * Math.PI / 8 || angleAbs > 13 * Math.PI / 16) {
        this.calculateForce(distanceToObj, obj);
        return;
    }

    angle /= distanceToObj / Math.hypot(this.velocity.x, this.velocity.y);

    this.velocity.x = velX * Math.cos(angle) - velY * Math.sin(angle);
    this.velocity.y = velX * Math.sin(angle) + velY * Math.cos(angle);
}

    checkCorners() {
        const { x, y } = this.position;
        const { width, height } = canvas;

        this.position.x = x < 0 ? width : x > width ? 0 : x;
        this.position.y = y < 0 ? height : y > height ? 0 : y;
    }

    vectorSetZero(v) {
        v.x = v.y = 0;
    }
}
class Circle {
    constructor() {
        this.width = 10
        this.height = 10
        this.position = {
            x: 0,
            y: 0
        }

    }
    createCircle(x, y, radius) {
        c.fillStyle = 'white';
        c.beginPath();
        c.arc(x, y, radius, 0, 2 * Math.PI, false);
        c.fill();
    }
    updatePosition(e) {
        this.position.x = e.clientX;
        this.position.y = e.clientY;
    }
    draw() {
        this.createCircle(this.position.x, this.position.y, this.width)
    }
}

const ship = new SpaceShip();
const circle = new Circle();
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (ship.image === undefined) return;
    scoreDiv.innerHTML = `Score : ${score}`;
    ship.draw();
    ship.updatePosition();
    ship.checkCorners();
    circle.draw();
    ship.calculateAngletoRotate(circle);
    ship.applyForce();
    consumables.forEach((consumable) => {
        c.beginPath();
        c.arc(consumable.x, consumable.y, consumable.radius, 0, Math.PI * 2);
        c.fillStyle = consumable.color;
        c.fill();
    });
    ship.checkCollision();
}
window.addEventListener('mousemove', (e) => {
    circle.updatePosition(e)
});

