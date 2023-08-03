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
            this.position = {
                x: canvas.width / 2,
                y: canvas.height / 2,
            };
            this.velocity = {
                x: -3 + Math.random() * 6,
                y: -3 + Math.random() * 6,
            };
            this.force = {
                x: 0,
                y: 0,
            };
            this.lastForce = {
                x: 0,
                y: 0
            }
        };
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
        this.limitProp(this.velocity, 3);
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

                const newConsumable = {
                    x: Math.random() * canvas.width,
                    y: 125 + Math.random() * (canvas.height - 250),
                    radius: 10,
                    color: consumable.color,
                    score: consumable.score
                };
                consumables.push(newConsumable);
                // Remove consumed consumable
                consumables.splice(i, 1);
            }
        }
    }

    limitProp(obj, limiter) {

        let oX = obj.x;
        let oY = obj.y;
        obj.x = (oX > limiter) ? limiter : (oX < -limiter) ? -limiter : oX;
        obj.y = (oY > limiter) ? limiter : (oY < -limiter) ? -limiter : oY;
    }


    calculateForce(distance, obj) {
        const maxForce = 0.2;
        const minDistance = 120;
        const bounceFactor = 0.1;
        const forceX = (1/distance) * (this.position.x - obj.position.x) * bounceFactor;
        const forceY = (1/distance) * (this.position.y - obj.position.y) * bounceFactor;
        this.force.x = Math.min(maxForce, Math.max(-maxForce, forceX));
        this.force.y = Math.min(maxForce, Math.max(-maxForce, forceY)); 
    };
    calculateAngletoRotate(obj) {
        let distancetoobj = this.distance(obj);
        if (!(distancetoobj < 150 && distancetoobj > 30)) {
            return;
        }
        let vectorToObj = {
            x: obj.position.x - this.position.x,
            y: obj.position.y - this.position.y,
        }
        //divide it to distance
        //rotate the velocity
        //calculate angle inbetween two vectors
        let velX = this.velocity.x
        let velY = this.velocity.y
        let dotproduct = vectorToObj.x * velX + vectorToObj.y * velY;
        let distance = Math.sqrt(vectorToObj.x * vectorToObj.x + vectorToObj.y * vectorToObj.y)
        let velocitylength = Math.sqrt(velX * velX + velY * velY)
        let angle = Math.acos(dotproduct / (distance * velocitylength))

        //calcute if it should be counterclockwise
        if (angle < 3 * Math.PI / 16|| angle > 3 * Math.PI / 16) {
            this.calculateForce(distancetoobj, obj)
            return

        }
        //
        let vecX = vectorToObj.x;
        let vecY = vectorToObj.y;
        vectorToObj.x = vecX * Math.cos(angle) - vecY * Math.sin(angle);
        vectorToObj.y = vecX * Math.sin(angle) + vecY * Math.cos(angle);
        if (Math.abs(this.velocity.y / this.velocity.x - vectorToObj.y / vectorToObj.x) > 1) {
            angle *= -1
        }

        angle /= distance / Math.hypot(this.velocity.x, this.velocity.y)
        this.velocity.x = velX * Math.cos(angle) - velY * Math.sin(angle);
        this.velocity.y = velX * Math.sin(angle) + velY * Math.cos(angle);
    }

    checkCorners() {
        let cX = this.position.x
        let cY = this.position.y
        this.position.x = cX < 0 ? canvas.width : cX > canvas.width ? 0 : cX
        this.position.y = cY < 0 ? canvas.height : cY > canvas.height ? 0 : cY
    }

    distance(obj) {
        return Math.floor(Math.sqrt((obj.position.x - this.position.x) * (obj.position.x - this.position.x) +
            (obj.position.y - this.position.y) * (obj.position.y - this.position.y)))

    };

    vectorSetZero(v) { v.x = v.y = 0; }

    vectorCheckZero(v) {
        return v.x == 0 && v.y == 0;
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
        this.image = document.createElement('div.circle')

    }
    createCircle(x, y, radius) {
        c.beginPath();
        c.arc(x, y, radius, 0, 2 * Math.PI, false);
        c.fillStyle = 'white';
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
    requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (ship.image == undefined) return
    scoreDiv.innerHTML = `Score : ${score}`;
    ship.draw();
    ship.updatePosition();
    ship.checkCorners();
    circle.draw()
    ship.calculateAngletoRotate(circle);
    ship.applyForce()
    for (let i = 0; i < consumables.length; i++) {
        const consumable = consumables[i];

        c.beginPath();
        c.arc(consumable.x, consumable.y, consumable.radius, 0, Math.PI * 2);
        c.fillStyle = consumable.color;
        c.fill();
    }
    ship.checkCollision()

    // ship.calculateForce(circle)
}
window.addEventListener('mousemove', (e) => {
    circle.updatePosition(e)
});

