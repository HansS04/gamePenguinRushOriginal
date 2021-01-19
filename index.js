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
                //          
    keys : [],  // tlacitka[5,6,7,8,9,10,11,12,a,j,k,78,jk]   


    speed : 5,
    move: function (){
        if (this.keys['KeyW']) {
           
                this.y-=this.speed;
            
        }
        
        if (this.keys['KeyS']) {
           this.y+=this.speed;
        }

        if (this.keys['KeyD']) {
  
                this.x+=this.speed;
            
        }
        if (this.keys['KeyA']) {
       
                this.x-=this.speed;
          
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

class SnowMans {
    constructor(x, y) {
        this.x = Math.floor(Math.random()*(canvas.width -200))+100
        this.y = canvas.height + 50;
        this.image = new Image();
        this.image.src = 'img/snowman.png';
        this.speed = 5;
    }
    move() {
        this.y -= this.speed;
    }
  

    port() {
      //window.setTimeout(function(){ 
        this.x = Math.floor(Math.random()*(canvas.width -150))+100
        this.y = canvas.height + 300;
        
   // }, 2000);
       
    }

    draw() {
        let obj = this;
        this.image.onload = function () {
            console.log(obj);
            ctx.drawImage(obj.image, obj.x, obj.y);
        };
        ctx.drawImage(this.image, this.x, this.y );
    }
}



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
let snowman = []


function create() {
    for (let i = 0; i < arrX.length; i++) {
        tree.push(new Trees(arrX[i], arrY[i]));
    }
}
create();
function createsnowman() {
    setTimeout(function(){ 
        createsnowman();
    }, 300);
    snowman.push(new SnowMans());
}
createsnowman();
let stopky2 = window.setInterval(stopky, -10); 

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
    if (skier.x < 100 || skier.x > canvas.width - 170){
        if (confirm("Váš čas je : " + minuty + " minut " + sekundy + " sekund " + milisekundy + " milisekund ")) {
            skier.y = -100;
            skier.x = 500;
            window.location.reload();
        }
    }



    for (let j = 0; j < snowman.length; j++) {
        console.log(snowman[j]);
        console.log(skier.x);
        snowman[j].move();
        snowman[j].draw();
     
        if(snowman[j].x + 100 > skier.x && snowman[j].x + 80 < skier.x + 140 && snowman[j].y < skier.y && snowman[j].y + 100 > skier.y  ){
            clearInterval(stopky2);
            
            if (confirm("Váš čas je : " + minuty + " minut " + sekundy + " sekund " + milisekundy + " milisekund ")) {
                skier.y = -100;
                skier.x = 500;
                window.location.reload();
            } 
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    drawAll();

}

animate();

var myVar;

function myFunction() {
  myVar = setTimeout(function(){ alert("Hello"); }, 3000);
}

function myStopFunction() {
  clearTimeout(myVar);
}

//stopky
let sekundy = 0;
let milisekundy = 0;
let minuty = 0; 

//funkce pro stopky
function stopky(){
    milisekundy++;

    if(milisekundy === 100){
        milisekundy = 0;
        sekundy ++;

        if(sekundy === 60 ){
            sekundy = 0;
            minuty++;
        }
    }
    //Zobrazí obnovený čas
    document.getElementById("display").innerHTML = minuty + ":" + sekundy + "." + milisekundy;
}


document.body.addEventListener('keydown', function(event) {
    skier.keys[event.code] = true;
  });

  document.body.addEventListener("keyup", function(event) { 
    skier.keys[event.code] = false;
  })
