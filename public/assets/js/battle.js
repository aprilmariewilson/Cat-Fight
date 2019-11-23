var player = {
	name: '',
	atk: 10,
	maxhp: 150,
	hp: 100,
	def: 5,
	model: 1
}

var computer = {
	id: '',
	name: '',
	atk: 10,
	maxhp: 150,
	hp: 100,
	def: 4,
	model: 1
}

var com, turn, winner;
var score = 0;
var nameArray = ['Sprinkletons', 'Sylvester', 'Mr Bubbles', 'Antonio', 'Azure Cat', 'Leonardo',
	'Michealangelo', 'Donatello', 'Crazy Marie', 'Manny Quinn', 'Karate Kat', 'Ebenezer', 'Ace',
	'Apache', 'Purr Jordan', 'Wrigley', 'Meoweyville Slugger', 'Doc Mauliday', 'Indiana Pounds',
	'Pow', 'Ggrrrio', 'meowrry', 'Mr Meowgi', 'Akira', ' Clawzz', 'Scaredy Cat', 'Bill',
	'Ted', 'Beuhler', 'Mr Beat Down'];
var models = [0, 1, 2, 3, 4]

// var models = ['/assets/spritesheets/cat-0.png', '/assets/spritesheets/cat-1.png', '/assets/spritesheets/cat-2.png', '/assets/spritesheets/cat-3.png', '/assets/spritesheets/cat-4.png',
// '/assets/spritesheets/cat-5.png', '/assets/spritesheets/cat-6.png', '/assets/spritesheets/cat-7.png', '/assets/spritesheets/cat-8.png', '/assets/spritesheets/cat-9.png', '/assets/spritesheets/cat-10.png'];
var select = 3;
var choose = 0;
var background = $('#background');
var player_left = $('#player-left');
var player_right = $('#player-right');
var battleFrame = $('#battle');


//import the other scripts
$.getScript('/assets/spritesheets/player-sprite.js');
$.getScript('/assets/spritesheets/computer-sprite.js');
$.getScript('/assets/js/animations.js');

// game start modal begins here

//select player in modal
function selectPlayer() {
	//hide player/com divs
	$(background).empty();
	// $('.action-btn').hide();

	$('#modal-image').css('width', '200px');
	$('#modal-image').css('height', '20vh');

	//Makes the modal unable to close if you click outside of the box
	$('#exampleModal').modal({
		backdrop: 'static',
	});
}
//right modal button click
$(document).on("click", "#right-select", function () {
	if (select < models.length - 1) {
		++select;
		character.src = '/assets/spritesheets/cat-' + select + '.png';
		document.getElementById("left-svg").style.visibility = "visible";
		//model display changes by one to right
	}
	else if (select = models.length - 1) {
		document.getElementById("right-svg").style.visibility = "hidden";
	}
});

//left modal button click
$(document).on("click", "#left-select", function () {
	if (select > 0) {
		--select;
		//model display changes by one to left
		character.src = '/assets/spritesheets/cat-' + select + '.png';
		document.getElementById("right-svg").style.visibility = "visible";
	} else if (select <= 0) {
		document.getElementById("left-svg").style.visibility = "hidden";
	}
});

//Choose player button - must have name or an alert pops up.
$(document).on("click", "#select-player", function () {
	if ($('#modal-name').val() === '') {
		alert('You must enter a name!');
	} else {
		setPlayer($('#modal-name').val(), 1);
		$('#exampleModal').modal("hide");
	}
});

//game starts modal functionality ends


// "Fight" dropdown menu list items
$(document).on("click", ".move-btn", function (e) {
	e.preventDefault();
	fightMove($(this).attr('value'));

	if (turn) {
		turn = false;
	}
});

//update game with health status and change turns

function updateGame() {
	$('#player-left-health').html('<h3>' + player.name + ': ' + player.hp + ' / ' + player.maxhp + '</h3>');
	$('#player-right-health').html('<h3>' + computer.name + ':  ' + computer.hp + ' / ' + computer.maxhp + '</h3>');
	if (!turn) {
		if (computer.hp > 0 && player.hp > 0) {
			computerMove();
		}
	}

	if (computer.hp < 1 && player.hp < 1) {
		$('#loseModal').modal("show");
		showLoser();

	} else if (computer.hp < 1) {
		setTimeout(() => {
			$('#winModal').modal("show");
			showPlayer();
		}, 3000)
	} else if (player.hp < 1) {
		///create a modal for you losing
		$('#loseModal').modal("show");
		showLoser();
	}
}
//close you lose game modal
$(document).on("click", "#start-again", function () {
	$('#loseModal').modal("hide");
	$('#comp-status-text').text('fight!');
	playerLoses();
});

//close you won game modal
$(document).on("click", "#next-game", function () {
	$('#winModal').modal("hide");
	$('#comp-status-text').text('fight!');
	playerWins();
});

//reset game with added player points
function playerWins() {
	setTimeout(() => {
		resetPlayer();
		setEnemy();
		compInterval = setInterval(compdraw, 100);
		companimateCat('idle');
	}, 1500)
}

function playerLoses() {
	setTimeout(() => {
		resetPlayer();
		setEnemy();
		animateCat('idle');
	}, 1500)
}

//computers move
function computerMove() {
	setTimeout(function () {
		opponentMove(1);
	}, 2200);
	setTimeout(function () {
		turn = true;
	}, 2000);
}

//if player wins add health for next battle
function addPoints() {
	player.hp += 75;
	$('#player-left-health').html('<h3>' + player.name + ': ' + player.hp + ' / ' + player.maxhp + '</h3>');
}

function showLoser() {
	character.src = player.model;
	canvas = document.getElementById('player-loss');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = this.canvas.getContext("2d");
};


function showPlayer() {
	$('.win-name').html('<h3>' + player.name + '</h3>')
	character.src = player.model;
	canvas = document.getElementById('player-win');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = this.canvas.getContext("2d");
};
function resetPlayer() {
	addPoints();
	character.src = player.model;
	canvas = document.getElementById('player-left');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");
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

	random = Math.floor(Math.random() * models.length + 1) + 0;
	console.log(models[random])
	var randomIndex = Math.floor(Math.random() * nameArray.length + 1) + 1;

	console.log(randomIndex)
	var newOpponent = nameArray[randomIndex]

	var number = Math.floor(Math.random() * 126) + 25;
	//Gets a cat by id and saves it as the computer object
	$.get('/api/cats/id/' + random, function (data, status) {
		console.log('calling api get in battle');
		computer.name = newOpponent;
		;
		computer.model = data.model;

		computer.maxhp = number;
		computer.hp = number
		$('#player-right-health').html('<h3>' + computer.name + ':  ' + computer.hp + ' / ' + computer.hp + '</h3>');
		compcharacter.src = computer.model;
		console.log(data.model);
	});
}
// }

//Set up the battle scene - most of this can go into style.css later on
function createBattleField() {
	var health = $('<div>');

	$(background).append(player_left);
	$(background).append(player_right);
}

//Selects a move and executes it perfectly from animation.js
function fightMove(amove) {
	switch (parseInt(amove)) {
		case 1:
			//Flying kick
			animatePlayer(function () {
				animateCat('kick');
				computer.hp -= 30;
				player.hp -= 10;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 2:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animatePlayer(function () {
				animateCat('punch');
				computer.hp -= 5;
				player.hp -= 1;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 3:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('powerShot');
				computer.hp -= 17;
				player.hp -= 7;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 4:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animatePlayer(function () {
				animateCat('flyingKick');
				computer.hp -= 15;
				player.hp -= 7;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 5:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('uppercut');
				computer.hp -= 10;
				player.hp -= 5;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 6:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animatePlayer(function () {
				animateCat('superUppercut');
				computer.hp -= 20;
				player.hp -= 8;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 7:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('combo');
				computer.hp -= 7;
				player.hp -= 2;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 8:
			//Roundhouse
			//Default to animate opponent to show off dropdown menu option 2
			animatePlayer(function () {
				animateCat('doubleKick');
				computer.hp -= 12;
				player.hp -= 6;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 9:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('highKick');
				computer.hp -= 15;
				player.hp -= 7;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		case 10:
			//Another move/3rd list item
			animatePlayer(function () {
				animateCat('doubleAttack');
				computer.hp -= 25;
				player.hp -= 9;
				if (computer.hp < 0) computer.hp = 0;
				if (player.hp < 0) player.hp = 0;
				turn = false;
				updateGame();
			});
			break;

		default:
			break;

	}
}
//computer fight moves uses animations.js to power cases

function opponentMove(amove) {
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

	var amove = movesArray[Math.floor(Math.random() * 10)];
	switch (parseInt(amove)) {
		case 1:
			//Flying kick
			animateOpponent(function () {
				companimateCat('kick');
				console.log('1');
				player.hp -= 30;
				computer.hp -= 10;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;

		case 2:
			//Roundhouse
			animateOpponent(function () {
				companimateCat('punch');
				var player = {
					name: '',
					atk: 10,
					maxhp: 150,
					hp: 100,
					def: 5,
					model: 1
				}

				var computer = {
					id: '',
					name: '',
					atk: 10,
					maxhp: 150,
					hp: 100,
					def: 4,
					model: 1
				}

				var com, turn, winner;
				var score = 0;
				var nameArray = ['Sprinkletons', 'Sylvester', 'Mr Bubbles', 'Antonio', 'Azure Cat', 'Leonardo',
					'Michealangelo', 'Donatello', 'Crazy Marie', 'Manny Quinn', 'Karate Kat', 'Ebenezer', 'Ace',
					'Apache', 'Purr Jordan', 'Wrigley', 'Meoweyville Slugger', 'Doc Mauliday', 'Indiana Pounds',
					'Pow', 'Ggrrrio', 'meowrry', 'Mr Meowgi', 'Akira', ' Clawzz', 'Scaredy Cat', 'Bill',
					'Ted', 'Beuhler', 'Mr Beat Down'];
				var models = [0, 1, 2, 3, 4]

				// var models = ['/assets/spritesheets/cat-0.png', '/assets/spritesheets/cat-1.png', '/assets/spritesheets/cat-2.png', '/assets/spritesheets/cat-3.png', '/assets/spritesheets/cat-4.png',
				// '/assets/spritesheets/cat-5.png', '/assets/spritesheets/cat-6.png', '/assets/spritesheets/cat-7.png', '/assets/spritesheets/cat-8.png', '/assets/spritesheets/cat-9.png', '/assets/spritesheets/cat-10.png'];
				var select = 3;
				var choose = 0;
				var background = $('#background');
				var player_left = $('#player-left');
				var player_right = $('#player-right');
				var battleFrame = $('#battle');


				//import the other scripts
				$.getScript('/assets/spritesheets/player-sprite.js');
				$.getScript('/assets/spritesheets/computer-sprite.js');
				$.getScript('/assets/js/animations.js');

				// game start modal begins here

				//select player in modal
				function selectPlayer() {
					//hide player/com divs
					$(background).empty();
					// $('.action-btn').hide();

					$('#modal-image').css('width', '200px');
					$('#modal-image').css('height', '20vh');

					//Makes the modal unable to close if you click outside of the box
					$('#exampleModal').modal({
						backdrop: 'static',
					});
				}
				//right modal button click
				$(document).on("click", "#right-select", function () {
					if (select < models.length - 1) {
						++select;
						character.src = '/assets/spritesheets/cat-' + select + '.png';
						document.getElementById("left-svg").style.visibility = "visible";
						//model display changes by one to right
					}
					else if (select = models.length - 1) {
						document.getElementById("right-svg").style.visibility = "hidden";
					}
				});

				//left modal button click
				$(document).on("click", "#left-select", function () {
					if (select > 0) {
						--select;
						//model display changes by one to left
						character.src = '/assets/spritesheets/cat-' + select + '.png';
						document.getElementById("right-svg").style.visibility = "visible";
					} else if (select <= 0) {
						document.getElementById("left-svg").style.visibility = "hidden";
					}
				});

				//Choose player button - must have name or an alert pops up.
				$(document).on("click", "#select-player", function () {
					if ($('#modal-name').val() === '') {
						alert('You must enter a name!');
					} else {
						setPlayer($('#modal-name').val(), 1);
						$('#exampleModal').modal("hide");
					}
				});

				//game starts modal functionality ends


				// "Fight" dropdown menu list items
				$(document).on("click", ".move-btn", function (e) {
					e.preventDefault();
					fightMove($(this).attr('value'));

					if (turn) {
						turn = false;
					}
				});

				//update game with health status and change turns

				function updateGame() {
					$('#player-left-health').html('<h3>' + player.name + ': ' + player.hp + ' / ' + player.maxhp + '</h3>');
					$('#player-right-health').html('<h3>' + computer.name + ':  ' + computer.hp + ' / ' + computer.maxhp + '</h3>');
					if (!turn) {
						if (computer.hp > 0 && player.hp > 0) {
							computerMove();
						}
					}

					if (computer.hp < 1 && player.hp < 1) {
						$('#loseModal').modal("show");
						showLoser();

					} else if (computer.hp < 1) {
						setTimeout(() => {
							$('#winModal').modal("show");
							showPlayer();
						}, 3000)
					} else if (player.hp < 1) {
						///create a modal for you losing
						$('#loseModal').modal("show");
						showLoser();
					}
				}
				//close you lose game modal
				$(document).on("click", "#start-again", function () {
					$('#loseModal').modal("hide");
					$('#comp-status-text').text('fight!');
					playerLoses();
				});

				//close you won game modal
				$(document).on("click", "#next-game", function () {
					$('#winModal').modal("hide");
					$('#comp-status-text').text('fight!');
					playerWins();
				});

				//reset game with added player points
				function playerWins() {
					setTimeout(() => {
						resetPlayer();
						setEnemy();
						compInterval = setInterval(compdraw, 100);
						companimateCat('idle');
					}, 1500)
				}

				function playerLoses() {
					setTimeout(() => {
						resetPlayer();
						setEnemy();
						animateCat('idle');
					}, 1500)
				}

				//computers move
				function computerMove() {
					setTimeout(function () {
						opponentMove(1);
					}, 2200);
					setTimeout(function () {
						turn = true;
					}, 2000);
				}

				//if player wins add health for next battle
				function addPoints() {
					player.hp += 75;
					$('#player-left-health').html('<h3>' + player.name + ': ' + player.hp + ' / ' + player.maxhp + '</h3>');
				}

				function showLoser() {
					character.src = player.model;
					canvas = document.getElementById('player-loss');
					canvas.width = canvasWidth;
					canvas.height = canvasHeight;
					ctx = this.canvas.getContext("2d");
				};


				function showPlayer() {
					$('.win-name').html('<h3>' + player.name + '</h3>')
					character.src = player.model;
					canvas = document.getElementById('player-win');
					canvas.width = canvasWidth;
					canvas.height = canvasHeight;
					ctx = this.canvas.getContext("2d");
				};
				function resetPlayer() {
					addPoints();
					character.src = player.model;
					canvas = document.getElementById('player-left');
					canvas.width = canvasWidth;
					canvas.height = canvasHeight;
					ctx = canvas.getContext("2d");
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

					random = Math.floor(Math.random() * models.length + 1) + 0;
					console.log(models[random])
					var randomIndex = Math.floor(Math.random() * nameArray.length + 1) + 1;

					console.log(randomIndex)
					var newOpponent = nameArray[randomIndex]

					var number = Math.floor(Math.random() * 126) + 25;
					//Gets a cat by id and saves it as the computer object
					$.get('/api/cats/id/' + random, function (data, status) {
						console.log('calling api get in battle');
						computer.name = newOpponent;
						;
						computer.model = data.model;

						computer.maxhp = number;
						computer.hp = number
						$('#player-right-health').html('<h3>' + computer.name + ':  ' + computer.hp + ' / ' + computer.hp + '</h3>');
						compcharacter.src = computer.model;
						console.log(data.model);
					});
				}
				// }

				//Set up the battle scene - most of this can go into style.css later on
				function createBattleField() {
					var health = $('<div>');

					$(background).append(player_left);
					$(background).append(player_right);
				}

				//Selects a move and executes it perfectly from animation.js
				function fightMove(amove) {
					switch (parseInt(amove)) {
						case 1:
							//kick
							animatePlayer(function () {
								animateCat('kick');
								computer.hp -= 30;
								player.hp -= 10;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 2:
							//punch
							animatePlayer(function () {
								animateCat('punch');
								computer.hp -= 5;
								player.hp -= 1;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 3:
							//power shot
							animatePlayer(function () {
								animateCat('powerShot');
								computer.hp -= 17;
								player.hp -= 7;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 4:
							//flying kick
							animatePlayer(function () {
								animateCat('flyingKick');
								computer.hp -= 15;
								player.hp -= 7;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 5:
							//uppercut
							animatePlayer(function () {
								animateCat('uppercut');
								computer.hp -= 10;
								player.hp -= 5;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 6:
							//super uppercut
							animatePlayer(function () {
								animateCat('superUppercut');
								computer.hp -= 20;
								player.hp -= 8;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 7:
							//combo
							animatePlayer(function () {
								animateCat('combo');
								computer.hp -= 7;
								player.hp -= 2;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 8:
							//Double kick
							animatePlayer(function () {
								animateCat('doubleKick');
								computer.hp -= 12;
								player.hp -= 6;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 9:
							//high kick
							animatePlayer(function () {
								animateCat('highKick');
								computer.hp -= 15;
								player.hp -= 7;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						case 10:
							//double attack
							animatePlayer(function () {
								animateCat('doubleAttack');
								computer.hp -= 25;
								player.hp -= 9;
								if (computer.hp < 0) computer.hp = 0;
								if (player.hp < 0) player.hp = 0;
								turn = false;
								updateGame();
							});
							break;

						default:
							break;

					}
				}
				//computer fight moves uses animations.js to power cases

				function opponentMove(amove) {
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

					var amove = movesArray[Math.floor(Math.random() * 10)];
					switch (parseInt(amove)) {
						case 1:
							//opponent kick
							animateOpponent(function () {
								companimateCat('kick');
								console.log('1')
								player.hp -= 30;
								computer.hp -= 10;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;

						case 2:
							//opponent punch
							animateOpponent(function () {
								companimateCat('punch');
								console.log('2')

								player.hp -= 5;
								computer.hp -= 1;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;

						case 3:
							//opponent power shot
							animateOpponent(function () {
								companimateCat('powerShot');
								console.log('3')

								player.hp -= 17;
								computer.hp -= 7;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;

						case 4:
							//opponent flying kick
							animateOpponent(function () {
								companimateCat('flyingKick');
								console.log('4')

								player.hp -= 15;
								computer.hp -= 7;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;

						case 5:
							//opponent uppercut
							animateOpponent(function () {
								companimateCat('uppercut');
								console.log('5')
								player.hp -= 10;
								computer.hp -= 5;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;

						case 6:
							//opponent super uppercut
							animateOpponent(function () {
								companimateCat('superUppercut');
								console.log('6')
								player.hp -= 20;
								computer.hp -= 8;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;

						case 7:
							//opponent combo
							animateOpponent(function () {
								companimateCat('combo');
								console.log('7')
								player.hp -= 7;
								computer.hp -= 2;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;
						case 8:
							//opponent double kick
							animateOpponent(function () {
								companimateCat('doubleKick');
								console.log('8')
								player.hp -= 12;
								computer.hp -= 6;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;

						case 9:
							//Opponent high kick
							animateOpponent(function () {
								companimateCat('highKick');
								console.log('9')
								player.hp -= 15;
								computer.hp -= 7;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;

						case 10:
							//Opponent double attack
							animateOpponent(function () {
								companimateCat('doubleAttack');
								console.log('10')
								player.hp -= 25;
								computer.hp -= 9;
								if (player.hp < 0) player.hp = 0;
								if (computer.hp < 0) computer.hp = 0;
								updateGame();
							});
							break;
						default:
							break;

					}
				}

				//when page loads start modal and game.....

				$(document).ready(function () {
					selectPlayer();
					setEnemy();
					createBattleField();
				});
				player.hp -= 5;
				computer.hp -= 1;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;

		case 3:
			//Another move
			animateOpponent(function () {
				companimateCat('powerShot');
				player.hp -= 17;
				computer.hp -= 7;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;

		case 4:
			//Roundhouse
			animateOpponent(function () {
				companimateCat('flyingKick');
				player.hp -= 15;
				computer.hp -= 7;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;

		case 5:
			//Another move
			animateOpponent(function () {
				companimateCat('uppercut');
				player.hp -= 10;
				computer.hp -= 5;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;

		case 6:
			//Roundhouse
			animateOpponent(function () {
				companimateCat('superUppercut');
				player.hp -= 20;
				computer.hp -= 8;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;

		case 7:
			//Another move
			animateOpponent(function () {
				companimateCat('combo');
				player.hp -= 7;
				computer.hp -= 2;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;
		case 8:
			//Roundhouse
			animateOpponent(function () {
				companimateCat('doubleKick');
				player.hp -= 12;
				computer.hp -= 6;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;

		case 9:
			//Another move
			animateOpponent(function () {
				companimateCat('highKick');
				player.hp -= 15;
				computer.hp -= 7;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;

		case 10:
			//Another move
			animateOpponent(function () {
				companimateCat('doubleAttack');
				player.hp -= 25;
				computer.hp -= 9;
				if (player.hp < 0) player.hp = 0;
				if (computer.hp < 0) computer.hp = 0;
				updateGame();
			});
			break;
		default:
			break;

	}
}

//when page loads start modal and game.....

$(document).ready(function () {
	selectPlayer();
	setEnemy();
	createBattleField();
});