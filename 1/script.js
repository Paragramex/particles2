console.log("js connected");

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var ctx = canvas.getContext("2d");


var mouse = {
    x: undefined,
    y: undefined
};


window.addEventListener("mousemove", 
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});


window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});


function randomIntFromRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function Circle(x,y,dx,dy,rad,color, boundaryRight, boundaryLeft) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.boundaryRight = boundaryRight;
    this.boundaryLeft = boundaryLeft;
    var minRad = rad;
    var maxRad = (rad * 2);
    this.color = color;

    
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    
    this.update = function() {

        
        if(this.y + this.rad > window.innerHeight) {
            this.y = 0;
        }
        
        if(this.x > boundaryRight || this.x < boundaryLeft) {
            this.dx = -this.dx;
        }

        
        this.x += this.dx;
        this.y += this.dy;

        
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            
            // Limit circle grow size
            if (this.rad < maxRad) {
                this.rad += 1;   
            }
            
        // Limit circle shrink size  
        
        } else if (this.rad > minRad) {
            this.rad -= 1;
        } else if (this.rad < this.minRad) {
            this.rad += 1;
        }
        
        // Draw Circle
        
        this.draw();
        
    };

}


var circles = [];

function init() {

    
    circles = [];

    
    for (var i = 0; i < 100; i++) {
        var rad = randomIntFromRange(2,4);
        var x = Math.random() * (window.innerWidth - rad * 2);
        var y = Math.random() * (window.innerHeight - rad * 2);
        var dx = 0.2;
        var dy = randomIntFromRange(0.2,0.3);
        var color = "white";
        var boundaryRight = x + rad;
        var boundaryLeft = x - rad;
        console.log(dy);
        circles.push(new Circle(x,y,dx,dy,rad,color,boundaryRight,boundaryLeft));
    }
    

}


function animation() {
        
    requestAnimationFrame(animation);
        
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    
    // Draw the circles
    
    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }
    
}

// Run

animation();
init();