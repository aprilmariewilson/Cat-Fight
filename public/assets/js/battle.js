var player = {
	name: '',
	atk: 10,
	maxhp: 100,
	hp: 100,
	def: 5,
	model: 1
}

var computer = {
	name: '',
	atk: 10,
	maxhp: 100,
	hp: 100,
	def: 4,
	model: 1
}

var com, turn, winner;
var score = 0;
var defeatedOpponents = [];
var models = [0, 1, 2, 3, 4];
var select = 3;
var choose = 0;
var background = $('#background');
var player_left = $('#player-left');
var player_right = $('#player-right');
var battleFrame = $('#battle');

$.getScript('/assets/spritesheets/player-sprite.js');
$.getScript('/assets/spritesheets/computer-sprite.js');
$.getScript('/assets/js/animations.js');

$(document).ready(function () {
	selectPlayer();
	setEnemy();
	createBattleField();
});

//right modal button click
$(document).on("click", "#right-select", function () {
	if (select < models.length - 1) {
		++select;
		character.src = '/assets/spritesheets/cat-' + select + '.png';
		//model display changes by one to right
		console.log(select);
	}
});

//left modal button click
$(document).on("click", "#left-select", function () {
	if (select > 0) {
		--select;
		//model display changes by one to left
		character.src = '/assets/spritesheets/cat-' + select + '.png';
		console.log(select);
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
// $(document).on("click", ".item-li", function () {
// 	if (turn) {
// 		useItem($(this).attr('value'));
// 		turn = false;
// 	}
// });

function updateGame() {
	$('#player-left-health').html('<h3>' + player.name + ': ' + player.hp + ' / ' + player.maxhp + '</h3>');
	$('#player-right-health').html('<h3>' + computer.name + ':  ' + computer.hp + ' / ' + computer.maxhp + '</h3>');
	if (!turn) {
		if (computer.hp > 0) {
			computerMove();
		}
	}

	if (computer.hp < 1 && player.hp < 1) {
		//You both lose.
	} else if (computer.hp < 1) {
		$('#status-text').text('Battle won! Prepare for next opponent');
		setTimeout(() => {
			setEnemy();
			compInterval = setInterval(compdraw, 100);
			companimateCat('idle');
		}, 3000);
	} else if (player.hp < 1) {
		$('#status-text').text("You lose! Refresh to play again");
	}
}

function computerMove() {
	setTimeout(function () {
		opponentMove(1);
	}, 2200);
	setTimeout(function () {
		turn = true;
	}, 2000);
}

function setPlayer(playerName) {
	//Set player name and the rest of player object by id of player
	this.player.name = playerName;
	$.get("/api/cats/id/" + select, function (data, status) {
		player.maxhp = data.hp;
		player.hp = data.hp;
		player.atk = data.atk;
		player.def = data.def;
		player.model = data.model;

		//Push to deleted models --- shortcut so that the model cannot be used by the computer
		defeatedOpponents.push(select);
		$('.action-btn').show();
		turn = true;

		//update player health div
		$('#player-left-health').html('<h3>' + player.name + ': ' + player.hp + ' / ' + player.hp + '</h3>');

		character.src = player.model;

		canvas = document.getElementById('player-left');
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx = canvas.getContext("2d");
	});


}

function setEnemy() {
	var random;

	if (models.length === defeatedOpponents.length) {
		$('#status-text').text('You won the game!');
	} else {

		//loops through as long as length of models < length of defeatedOpponents (all models have been used)
		//Generates a random number and verifies it has not been used && is less than models length
		while (models.length > defeatedOpponents.length) {
			random = Math.floor(Math.random() * models.length + 1) + 1;
			if (!defeatedOpponents.includes(random) && random <= models.length) break;
		}

		//Gets a cat by id and saves it as the computer object
		$.get('/api/cats/id/' + random, function (data, status) {
			computer.name = data.cat_name;
			computer.maxhp = data.hp;
			computer.hp = data.hp;
			computer.atk = data.atk;
			computer.def = data.def;
			computer.model = data.model;
			defeatedOpponents.push(random);

			computer.maxhp = 25;
			computer.hp = 25;
			$('#player-right-health').html('<h3>' + computer.name + ':  ' + computer.hp + ' / ' + computer.hp + '</h3>');
			compcharacter.src = computer.model;
		});

	}


}

function selectPlayer() {
	//hide player/com divs
	$(background).empty();
	$('.action-btn').hide();

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
	var health = $('<div>');


	$(statusDiv).append(statusText);

	$(statusDiv).css('background-color', 'yellow');

	$(statusText).attr('id', 'status-text');

	$(background).append(player_left);
	$(background).append(player_right);

	$(statusDiv).append(statusText);

	$(battleFrame).append(statusDiv);
	$(battleFrame).append(background);
}

//Selects a move and executes it perfectly
function fightMove(amove) {
	switch (parseInt(amove)) {
		case 1:
			//Flying kick
			animatePlayer(function () {
				animateCat('kick');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 2:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animatePlayer(function () {
				animateCat('punch');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 3:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('powerShot');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 4:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animatePlayer(function () {
				animateCat('flyingKick');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 5:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('uppercut');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 6:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animatePlayer(function () {
				animateCat('superUppercut');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 7:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('combo');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 8:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animatePlayer(function () {
				animateCat('doubleKick');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 9:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('highKick');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		case 10:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('doubleAttack');
				// computer.hp -= player.atk;
				// if (computer.hp < 0) computer.hp = 0;
				// turn = false;
				// updateGame();
			});
			break;

		default:
			break;

	}
}

function opponentMove(amove) {
	console.log('you are in the function');
	var movesArray = new Array();
movesArray[0] = "1";
movesArray[1] = "2";
movesArray[2] = "3";
movesArray[3] = "4";
movesArray[4] = "5";
movesArray[5] = "6";
movesArray[6] = "7";
movesArray[7] = "8";
movesArray[8] = "9";
movesArray[9] = "10";

console.log(movesArray);
var amove = movesArray[Math.floor(Math.random()*10)];
console.log('comp generated variable', amove);

	switch (parseInt(amove)) {
		case 1:
			//Flying kick
			animateOpponent(function () {
				companimateCat('kick');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		case 2:
			//Roundhouse
			animateOpponent(function () {
				companimateCat('punch');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		case 3:
			//Another move
			animateOpponent(function () {
				companimateCat('powerShot');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		case 4:
			//Roundhouse
			animateOpponent(function () {
				companimateCat('flyingKick');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		case 5:
			//Another move
			animateOpponent(function () {
				companimateCat('uppercut');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		case 6:
			//Roundhouse
			animateOpponent(function () {
				companimateCat('supperUppercut');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		case 7:
			//Another move
			animateOpponent(function () {
				companimateCat('combo');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;
		case 8:
			//Roundhouse
			animateOpponent(function () {
				companimateCat('doubleKick');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		case 9:
			//Another move
			animateOpponent(function () {
				companimateCat('highKick');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		case 10:
			//Another move
			animateOpponent(function () {
				companimateCat('doubleAttack');
				// player.hp -= computer.atk;
				// if (player.hp < 0) player.hp = 0;
				// updateGame();
			});
			break;

		default:
			break;

	}
}


//Selects item to use
// function useItem(anitem) {
// 	switch (parseInt(amove)) {
// 		case 1:
// 			//Use potion
// 			break;

// 		case 2:
// 			//Another Item
// 			break;

// 		case 3:
// 			//Other Item
// 			break;

// 		default:
// 			break;

// 	}
// }