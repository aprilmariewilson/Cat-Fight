//Width and height for our canvas
var compcanvasWidth = 64;
var compcanvasHeight = 64;

//the with and height of our spritesheet
var compspriteWidth = 1024;
var compspriteHeight = 1024;

//we are having two rows and 8 cols in the current sprite sheet
var comprows = 1;
var compcols = 16;

//The 0th (first) row is for the right movement
var comptrackRight = 0;

//1st (second) row for the left movement (counting the index from 0)
var comptrackLeft = 1;

//To get the width of a single sprite we divided the width of sprite with the number of cols
//because all the sprites are of equal width and height 
var compwidth = compspriteWidth / compcols;

//Same for the height we divided the height with number of rows 
var compheight = compspriteHeight / comprows;

//Each row contains 8 frame and at start we will display the first frame (assuming the index from 0)
var compcurFrame = 0;

//The total frame is 8 
var compframeCount = 4;

//x and y coordinates to render the sprite 
var compx = 0;
var compy = 0;

//x and y coordinates of the canvas to get the single frame 
var compsrcX = 0;
var compsrcY = 0;

//tracking the movement left and write 
var compleft = true;

//Assuming that at start the character will move right side 
var compright = false;

//Speed of the movement 
var compspeed = 12;

//Getting the canvas 
var compcanvas = document.getElementById('player-right');

//setting width and height of the canvas 
compcanvas.width = compcanvasWidth;
compcanvas.height = compcanvasHeight;

//Establishing a context to the canvas 
var compctx = compcanvas.getContext("2d");

//Creating an Image object for our character 
var compcharacter = new Image();

//Setting the source to the image file 
compcharacter.src = "/assets/spritesheets/cat-5.png";
var compflipped = false;


function compupdateFrame() {

    //Updating the frame index 
    compcurFrame = ++compcurFrame % compframeCount;

    //Calculating the x coordinate for spritesheet 
    compsrcX = compcurFrame * compwidth;
    compctx.clearRect(compx, compy, compwidth, compheight);
}

function compdraw() {

    //Updating the frame 
    compupdateFrame();
    //Drawing the image 

    compctx.drawImage(compcharacter, compsrcX, compsrcY, compwidth, compheight, compx, compy, compwidth, compheight);
}

compflipHorizontal();
setInterval(compdraw, 100);

function companimateCat(animation, endAnimation) {
    var compidle = {
        y: 0,
        frame: 4
    }
    switch (animation) {

        case 'idle':
            compsrcY = compidle.y;
            compframeCount = compidle.frame;
            break;

        case 'kick':
            compcurFrame = 0;
            compsrcY = 192;
            compframeCount = 10;
            setTimeout(() => {
                compsrcY = compidle.y;
                compframeCount = compidle.frame;
            }, 900);
            break;

        case 'gethit':
            compcurFrame = 0;
            compsrcY = 256
            compframeCount = 9;
            setTimeout(() => {
                compsrcY = compidle.y;
                compframeCount = compidle.frame;
            }, 900);
            break;

        case 'walk':
            compcurFrame = 0;
            compsrcY = 64;
            compframeCount = 8;
            break;
    }
}

function compflipHorizontal() {

    if (!flipped) {
        compctx.translate(width, 0);
        compctx.scale(-1, 1);
    } else {
        compctx.translate(width, 0);
        compctx.scale(1, -1);
    }
}