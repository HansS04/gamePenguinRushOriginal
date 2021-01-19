const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let lyzar = document.getElementById("skier");
let svetla = document.getElementById("lights");

/*objekt pro vykreslení cedule start*/
let legs = {
    y: 50,

    move: function () {
        this.y -= 5;

    },
    paint: function () {
        ctx.fillStyle = "rgb(114, 74, 40)";
        /*vykreslení noh*/
        ctx.fillRect(300, this.y, 20, 200);
        ctx.fillRect(canvas.width - 320, this.y, 20, 200);

    }
}


/*Objekt pro vykreslení cedule start*/
let start = {
    y: 50,
    y2: 80,
    move: function () {
        this.y -= 5;
        this.y2 -= 5;
    },
    paint: function () {

        ctx.font = "20px jumbotron";
        ctx.fillStyle = "red";
        /*vykreslení noh*/
        ctx.fillRect(320, this.y, 560, 50);
        ctx.fillStyle = "black";
        /*vykreslení nápisu čar pomocí jednotlivých čar*/
        ctx.fillText("Start", canvas.width / 2 - 15, this.y2);

    }
}


/*objekt pro vykreslení tučňáka*/
let skier = {
    y: 170,
    x: canvas.width / 2 - 30,
    keys : [],
    speed : 5,
    move: function (){
        if (this.keys['ArrowUp']) {
            if (this.y > this.speed) {
                this.y--;
            }
        }
        
        if (this.keys['ArrowDown']) {
            if (this.y < this.speed) {
                this.y++;
            }
        }

        if (this.keys['ArrowRight']) {
            if (this.x < this.speed) {
                this.x++;
            }
        }
        if (this.keys['ArrowLeft']) {
            if (this.x > -this.speed) {
                this.x--;
            }
        }
        
    },
    paint: function () {

        ctx.drawImage(lyzar, this.x, this.y, 80, 70);

    }
}

let lights = {
    y: 70,
    move: function () {
        this.y -= Trees.speed;
    },
    paint: function () {

        ctx.drawImage(svetla, 300, this.y, 600, 100);
    }
}
/*objekt pro vykreslení stromu*/

class Trees {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 250;
        this.height = 350;
        this.image = new Image();
        this.image.src = 'img/strom.png';
        this.speed = 5;
    }
    move() {
        this.y -= this.speed;
    }
    play() {
        requestAnimationFrame(animate);
    }

    port() {
        this.y = canvas.height + 50;
        if (this.x < 500) {
            this.x = -60;
        } else {
            this.x = 1020;
        }
    }

    draw() {
        let obj = this;
        this.image.onload = function () {
            console.log(obj);
            ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

let arrX = [100, 850, 10, 950, -60, 1020, -60, 1020, -60, 1020, -60, 1020, -60, 1020, -60, 1020, -60, 1020, ];
let arrY = [-10, -10, 70, 70, 180, 180, 290, 290, 400, 400, 510, 510, 630, 630, 750, 750, 850, 850, ];

let tree = []



function create() {
    for (let i = 0; i < arrX.length; i++) {
        tree.push(new Trees(arrX[i], arrY[i]));
    }
}
create();



function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    skier.move();
    skier.paint();
    
    legs.move();
    legs.paint();
    start.move();
    start.paint();
    lights.move();
    lights.paint();
    console.log(tree.length)
    for (let j = 0; j < tree.length; j++) {
        console.log(tree[j]);
        tree[j].move();
        tree[j].draw();
        if (tree[j].y < -180) {
            tree[j].port();
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    drawAll();

}

animate();

/*class Snowmans{
    constructor(){
    x= Math.floor(Math.random() * (canvas.width -200 )) + 50;
    y= canvas.height
}

    draw() {
        let obj = this;
        this.image.onload = function () {
            console.log(obj);
            ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}*/


/*objekt pro vykreslení*/


