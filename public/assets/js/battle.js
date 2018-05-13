var player = {
	name: '',
	atk: 10,
	hp: 100,
	def: 5,
	model: 1
}
var com, turn, winner;
var choose = 0;
var background = $('#background');
var player_left = $('#player-left');
var player_right = $('#player-right');

$(document).ready(function () {
	createBattleField();
	selectPlayer();
	//set player to id of sql things
});

//right modal button click
$(document).on("click", "#right-select", function () {

});

//left modal button click
$(document).on("click", "#left-select", function () {

});

//Choose player button - must have name or an alert pops up.
$(document).on("click", "#select-player", function () {
	if ($('#modal-name').val() === '') {
		alert('You must enter a name!');
	} else {
		$('#exampleModal').modal("hide");
		$('#status-text').text('fight!');
	}

});

function setPlayer(name, model) {

}

function selectPlayer() {
	//hide player/com divs
	$(background).empty();

	$('#modal-image').css('background-color', 'green');
	$('#modal-image').css('width', '200px');
	$('#modal-image').css('height', '20vh');

	$('#exampleModal').modal({
		backdrop: 'static',
	});
}

function createBattleField() {
	$('#battle').empty();

	var statusDiv = $('<div>');
	var statusText = $('<h2>');
	var moves = $('<p>');

	$(statusDiv).append(statusText);

	$(statusText).attr('id', 'status-text');

	$(background).css('background-color', 'red');

	$(player_right).css('background-color', 'yellow');
	$(player_right).css('height', '15vh');
	$(player_right).css('width', '10em');

	$(player_left).css('background-color', 'limegreen');
	$(player_left).css('height', '15vh');
	$(player_left).css('width', '10em');

	$(moves).text('key1: move1 key2: move2 key3: move3');

	$(background).css('display', 'flex');
	$(background).css('justify-content', 'space-between');
	$(background).css('height', '40vh');

	$(player_left).css('align-self', 'flex-end');
	$(player_right).css('align-self', 'flex-end');

	$('#battle').css('align-content', 'center');
	$('#battle').css('height', 'auto');
	$(statusText).css('align-text', 'center');
	$(statusText).text('Status Text');

	$(background).append(player_left);
	$(background).append(player_right);

	$(statusDiv).css('background-color', 'yellow');
	$(statusDiv).append(statusText);

	$('#battle').append(statusDiv);
	$('#battle').append(background);

	$('#battle').append(moves);
}

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