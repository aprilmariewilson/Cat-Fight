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

$(document).ready(function () {
	createBattleField();
	setEnemy();
	// setPlayer('name', 2);
	// selectPlayer();
});

//right modal button click
$(document).on("click", "#right-select", function () {
	if (select < models.length) {
		++select;
		//model display changes by one
	}
});

//left modal button click
$(document).on("click", "#left-select", function () {
	if (select > 1) {
		--select;
		//model display changes by one
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

function setPlayer(playerName, id) {
	//Set player name and the rest of player object by id of player
	this.player.name = playerName;
	$.get("/api/cats/id/" + id, function (data, status) {
		player.hp = data.hp;
		player.atk = data.atk;
		player.def = data.def;
		player.model = data.model;
		console.log(player);
	});
	//Push to deleted models --- shortcut so that the model cannot be used by the computer
	deletedModels.push(id);
}

function setEnemy() {
	var random;
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
		console.log(computer);
	});
}

function selectPlayer() {
	//hide player/com divs
	$(background).empty();

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
	$(statusDiv).css('background-color', 'yellow');

	$(statusText).attr('id', 'status-text');

	$(player_right).css('align-self', 'flex-end');
	$(player_right).css('background-color', 'yellow');
	$(player_right).css('height', '15vh');
	$(player_right).css('width', '10em');

	$(player_left).css('align-self', 'flex-end');
	$(player_left).css('background-color', 'limegreen');
	$(player_left).css('height', '15vh');
	$(player_left).css('width', '10em');

	$(background).css('display', 'flex');
	$(background).css('justify-content', 'space-between');
	$(background).css('height', '40vh');
	$(background).css('background-color', 'red');

	$(battleFrame).css('align-content', 'center');
	$(battleFrame).css('height', 'auto');

	$(statusText).css('align-text', 'center');
	$(statusText).text('Status Text');

	$(background).append(player_left);
	$(background).append(player_right);

	$(statusDiv).append(statusText);

	$(battleFrame).append(statusDiv);
	$(battleFrame).append(background);
	$(battleFrame).append(moves);
}

//Selects a move and executes it perfectly
function movess(amove) {
	switch (amove) {
		case 'punch':
			executeMove(movefunction);
			break;
		case 'roundhouse':
			executeMove(movefunction);
			break;

		case 'flipkick':
			executeMove(movefunction);
			break;

		case 'dead':
			executeMove(movefunction);
			break;

		case 'hit':
			executeMove(movefunction);
			break;
	}
}

function executeMove(amove) {
	if (turn === true) {
		//execute move from moves.js on player
	} else {
		//execute move from enemy
	}
}