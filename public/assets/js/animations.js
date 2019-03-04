// player animations

function animatePlayer(attack) {
    //We use a callback function to determine what happens; this function is defined in the switch statement in fightMove()

    //Start walk right animation
    animateCat('walk');

    $(player_left).animate({ left: '29em' }, 1000, function () {
        //End walk right animation
        animateCat('idle');

        //Along with the attack animation
        
        $('.moves').find('button').attr('id');

        console.log($('button').attr('id'));
        // var move = $("button");
    // console.log(move);
        // if (move == 1){
        //     animateCat('kick');
        // } else if (move == 2){
        //     animateCat('punch');
        // } else if (move == 3){
        //     animateCat('powerShot');
        // } else if (move == 4){
        //     animateCat('flyingKick');
        // } else if (move == 5){
        //     animateCat('uppercut');
        // } else if (move == 6){
        //     animateCat('superUppercut');
        // } else if (move == 7){
        //     animateCat('combo');
        // } else if (move == 8){
        //     animateCat('doubleKick');
        // } else if (move == 9){
        //     animateCat('highKick');
        // } else if (move == 10){
        //     animateCat('doubleAttack');
        // } else {
        //     console.log('error')
        // };

        
        $(player_right).stop().delay(750).animate({ left: '2em' }, 200, function () {
            //attack callback, determines how much hp they lose etc.
            attack();
            //This is where we animate the opponent getting hit
            if(computer.hp < 1) {
                companimateCat('dead');
            } else {
                companimateCat('gethit');
            }
            //This is also where we animate the cat walking back
            flipHorizontal();
            animateCat('walk');

            $(player_left).stop().animate({ left: '0em' }, 1000, function () {

                $(player_right).animate({
                    left: '0em'
                }, 200, function () {
                    //And this is where both player and opponent are back at starting positions
                    flipHorizontal();
                    animateCat('idle');
                });
            });
        });
    });
};


// computer animations

function animateOpponent(attack) {
    //This is the opposite of animatePlayer
    //Start opponent walking left animation here
    companimateCat('walk');

    $(player_right).animate({ left: '-29em' }, 1000, function () {
        //End walk left animation
        companimateCat('idle');
        //This is where we will animate the executed move (opponent)

        companimateCat('kick');
        $(player_left).stop().delay(750).animate({ left: '-2em' }, 200, function () {
            attack();
            //This is where we animate the opponent getting hit (knocked back is functioning)
            if(player.hp < 1) {
                animateCat('dead');
            } else {
                animateCat('gethit');
            }
            compflipHorizontal();
            companimateCat('walk');
            $(player_right).stop().animate({ left: '0em' }, 1000, function () {
                //This is where we animate the player walking right
                $(player_left).animate({
                    left: '0em'
                }, 200, function () {
                    //And this is where both player and opponent are back at starting positions
                    compflipHorizontal();
                    companimateCat('idle');
                });
            });
        });
    });
};
