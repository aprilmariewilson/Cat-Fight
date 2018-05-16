var player, com, turn, winner;
var background = $('#background');
var player_left = $('#player-left');
var player_right = $('#player-right');

console.log(document);
$(document).ready(function () {
	showBattleField();
	selectPlayer();
});

function setPlayers(player1, player2) {
	this.player = player1;
	this.com = player2;
}

function selectPlayer() {
	//hide player/com divs
	$(background).empty();

	var playerSelect = $('<div>');
	$(playerSelect).css('id', 'player-select');
	//show player selector/name
	//scroll through with buttons
}

function showBattleField() {
	$('#battle').empty();

	var statusDiv = $('<div>');
	var statusText = $('<h2>');
	var moves = $('<p>');

	$(statusDiv).append(statusText);
	$(statusText).text('test');

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

function moves(amove) {
	switch (amove) {
		case 'punch':
			executeMove(punch);
			break;
		case 'roundHouse':
			executeMove(roundHouse);
			break;

		case 'flipKick':
			executeMove(flipKick);
			break;

		case 'dead':
			executeMove(moveFunction);
			break;

		case 'hit':
			executeMove(moveFunction);
			break;
		
		case 'duck':
			executeMove(duck);
			break;

		case 'block':
			executeMove(block);
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