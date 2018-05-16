var player = {
	name: '',
	atk: 10,
	hp: 100,
	def: 5,
	model: 1
}

var computer = {
	name: '',
	atk: 10,
	hp: 100,
	def: 4,
	mode: 1
}

var com, turn, winner;
var defeatedOpponents = [];
var models = [1, 2, 3, 4, 5, 6];
var select = 3;
var choose = 0;
var background = $('#background');
var player_left = $('#player-left');
var player_right = $('#player-right');
var battleFrame = $('#battle');

$.getScript('/assets/spritesheets/cat-sprite.js');


$(document).ready(function () {
	createBattleField();

	// setEnemy();
	// setPlayer('name', 2);
	// selectPlayer();
});

//right modal button click
$(document).on("click", "#right-select", function () {
	if (select < models.length) {
		++select;
		//model display changes by one to right
	}
});

//left modal button click
$(document).on("click", "#left-select", function () {
	if (select > 1) {
		--select;
		//model display changes by one to left
	}
});

//Choose player button - must have name or an alert pops up.
$(document).on("click", "#select-player", function () {
	if ($('#modal-name').val() === '') {
		alert('You must enter a name!');
	} else {
		setPlayer($('#modal-name').val(), 1);
		$('#exampleModal').modal("hide");
		$('#status-text').text('fight!');
	}
});

// "Fight" dropdown menu list items
$(document).on("click", ".fight-li", function () {
	fightMove($(this).attr('value'));
	if (turn) {

		turn = false;
	}
});

// "Item" dropdown menu list items
$(document).on("click", ".item-li", function () {
	if (turn) {
		useItem($(this).attr('value'));
		turn = false;
	}
});

function setPlayer(playerName) {
	//Set player name and the rest of player object by id of player
	this.player.name = playerName;
	$.get("/api/cats/id/" + select, function (data, status) {
		player.hp = data.hp;
		player.atk = data.atk;
		player.def = data.def;
		player.model = data.model;

		//Push to deleted models --- shortcut so that the model cannot be used by the computer
		defeatedOpponents.push(select);
		$('.action-btn').show();
	});
	turn = true;

}

function setEnemy() {
	var random;

	if (models.length === defeatedOpponents.length) {
		//trigger win
	}

	//loops through as long as length of models < length of defeatedOpponents (all models have been used)
	//Generates a random number and verifies it has not been used && is less than models length
	while (models.length > defeatedOpponents.length) {
		random = Math.floor(Math.random() * models.length + 1) + 1;
		if (!defeatedOpponents.includes(random) && random <= models.length) break;
	}



	//Gets a cat by id and saves it as the computer object
	$.get('/api/cats/id/' + random, function (data, status) {
		computer.name = data.cat_name;
		computer.hp = data.hp;
		computer.atk = data.atk;
		computer.def = data.def;
		computer.model = data.model;
		defeatedOpponents.push(random);
	});
}

function selectPlayer() {
	//hide player/com divs
	$(background).empty();
	$('.action-btn').hide();
	//Example CSS for placement of image in modal
	$('#modal-image').css('background-color', 'green');
	$('#modal-image').css('width', '200px');
	$('#modal-image').css('height', '20vh');

	//Makes the modal unable to close if you click outside of the box
	$('#exampleModal').modal({
		backdrop: 'static',
	});
}

//Set up the battle scene - most of this can go into style.css later on
function createBattleField() {
	$('#battle').empty();

	var statusDiv = $('<div>');
	var statusText = $('<h2>');
	var moves = $('<p>');

	$(moves).text('key1: move1 key2: move2 key3: move3');
	$(statusDiv).append(statusText);
	/* 
		To do: Transfer all of the jquery css statements into a css file to reduce code length

		background = $('#background');
		player_left = $('#player-left');
		player_right = $('#player-right');
		battleFrame = $('#battle');

		Plus the divs created above this statement.
	*/
	$(statusDiv).css('background-color', 'yellow');

	$(statusText).attr('id', 'status-text');

	$(player_right).css('align-self', 'flex-end');
	$(player_right).css('background-color', 'yellow');
	$(player_right).css('height', '15vh');
	$(player_right).css('width', '10em');

	$(player_left).css('align-self', 'flex-end');

	$(player_left).css('height', '15vh');
	$(player_left).css('width', '10em');

	$(background).css('display', 'flex');
	$(background).css('justify-content', 'space-between');
	$(background).css('height', '40vh');

	$(battleFrame).css('align-content', 'center');
	$(battleFrame).css('height', 'auto');

	$(statusText).css('align-text', 'center');
	$(statusText).text('Status Text');

	// $(background).css('background-image', 'url(/assets/backgrounds/background-1.png');
	$(background).css('background-size', 'contain');

	$(background).append(player_left);
	$(background).append(player_right);

	$(statusDiv).append(statusText);

	$(battleFrame).append(statusDiv);
	$(battleFrame).append(background);
	$(battleFrame).append(moves);
}

//Selects a move and executes it perfectly
function fightMove(amove) {
	switch (parseInt(amove)) {
		case 1:
			//Attack
			animatePlayer(function () {

			});
			break;

		case 2:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animateOpponent(function () {

			});
			break;

		case 3:
			//Another move/3rd list item
			animatePlayer(function () {

			});
			break;

		default:
			break;

	}
}

function opponentMove(amove) {
	switch (parseInt(amove)) {
		case 1:
			//Attack
			animateOpponent(function () {

			});
			break;

		case 2:
			//Roundhouse
			animateOpponent(function () {

			});
			break;

		case 3:
			//Another move
			animateOpponent(function () {

			});
			break;

		default:
			break;

	}
}

function animatePlayer(attack) {
	//We use a callback function to determine what happens; this function is defined in the switch statement in fightMove()


	//Start walk right animation
	animateCat('walk');

	$(player_left).animate({ left: '23em' }, 1000, function () {
		//End walk right animation
		animateCat('idle');
		//This is where we will animate the executed move
		attack();

		//Along with the attack animation
		animateCat('kick');

		$(player_right).stop().delay(750).animate({ left: '2em' }, 200, function () {
			//This is where we animate the opponent getting hit

			//This is also where we animate the cat walking back
			animateCat('walk');

			$(player_left).stop().animate({ left: '0em' }, 1000, function () {
				
				$(player_right).animate({
					left: '0em'
				}, 200, function () {
					//And this is where both player and opponent are back at starting positions
					animateCat('idle');
				});
			}
			)
		}
		)

	});
}

function animateOpponent(attack) {
	//This is the opposite of animatePlayer
	//Start opponent walking left animation here
	$(player_right).animate({ left: '-21em' }, 1000, function () {
		//End walk left animation
		//This is where we will animate the executed move (opponent)
		attack();
		$(player_left).animate({ left: '-2em' }, 200, function () {
			//This is where we animate the opponent getting hit (knocked back is functioning)
			animateCat('gethit');
			$(player_right).animate({ left: '0em' }, 1000, function () {
				//This is where we animate the player walking right
				$(player_left).animate({
					left: '0em'
				}, 200, function () {
					//And this is where both player and opponent are back at starting positions
				});
			}
			)
		}
		)

	});


}

//Selects item to use
function useItem(anitem) {
	switch (parseInt(amove)) {
		case 1:
			//Use potion
			break;

		case 2:
			//Another Item
			break;

		case 3:
			//Other Item
			break;

		default:
			break;

	}
}