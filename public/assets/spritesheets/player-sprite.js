//Width and height for our canvas
var canvasWidth = 64;
var canvasHeight = 64;

//the with and height of our spritesheet
var spriteWidth = 1024;
var spriteHeight = 1024;

//we are having two rows and 8 cols in the current sprite sheet
var rows = 1;
var cols = 16;

//The 0th (first) row is for the right movement
var trackRight = 0;

//1st (second) row for the left movement (counting the index from 0)
var trackLeft = 1;

//To get the width of a single sprite we divided the width of sprite with the number of cols
//because all the sprites are of equal width and height 
var width = spriteWidth / cols;

//Same for the height we divided the height with number of rows 
var height = spriteHeight / rows;

//Each row contains 8 frame and at start we will display the first frame (assuming the index from 0)
var curFrame = 0;

//The total frame is 8 
var frameCount = 4;

//x and y coordinates to render the sprite 
var x = 0;
var y = 0;

//x and y coordinates of the canvas to get the single frame 
var srcX = 0;
var srcY = 0;

//tracking the movement left and write 
var left = true;

//Assuming that at start the character will move right side 
var right = false;

//Speed of the movement 
var speed = 12;

//Getting the canvas 
var canvas = document.getElementById('player-left');

//setting width and height of the canvas 
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//Establishing a context to the canvas 
var ctx = canvas.getContext("2d");

//Creating an Image object for our character 
var character = new Image();

//Setting the source to the image file 
character.src = "/assets/spritesheets/cat-3.png";
var flipped = false;


function updateFrame() {

    //Updating the frame index 
    curFrame = ++curFrame % frameCount;

    //Calculating the x coordinate for spritesheet 
    srcX = curFrame * width;
    ctx.clearRect(x, y, width, height);
}

function draw() {

    //Updating the frame 
    updateFrame();
    //Drawing the image 

    ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}

setInterval(draw, 100);

function animateCat(animation, endAnimation) {
    var idle = {
        y: 0,
        frame: 4
    }
    switch (animation) {

        case 'idle':
            srcY = idle.y;
            frameCount = idle.frame;
            break;

        case 'kick':
            curFrame = 0;
            srcY = 192;
            frameCount = 10;
            setTimeout(() => {
                srcY = idle.y;
                frameCount = idle.frame;
            }, 900);
            break;

        case 'gethit':
            curFrame = 0;
            srcY = 256
            frameCount = 9;
            setTimeout(() => {
                srcY = idle.y;
                frameCount = idle.frame;
            }, 900);
            break;

        case 'walk':
            curFrame = 0;
            srcY = 64;
            frameCount = 8;
            break;
    }
}

function flipHorizontal() {

    if(!flipped) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
    } else {
        ctx.translate(width, 0);
        ctx.scale(1, -1);
    }
}