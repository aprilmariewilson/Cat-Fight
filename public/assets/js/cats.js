// $player1 = $("#player-left");

// // fighting move functions
// var punch = function() {
//   $player1.addClass("punch");
//   setTimeout(function() {
//     $player1.removeClass("punch");
//   }, 150);
// };

// var flipKick = function() {
//   $player1.addClass("flipKick");
//   setTimeout(function() {
//     $player1.removeClass("flipKick");
//   }, 500);
// };

// var roundHouse = function() {
//   $player1.addClass("roundHouse");
//   setTimeout(function() {
//     $player1.removeClass("roundHouse");
//   }, 500);
// };

// var block = function() {
//   $player1.addClass("block");
//   setTimeout(function() {
//     $player1.removeClass("block");
//   }, 250);
// };

// var duck = function() {
//   $player1.addClass("duck");
// };

// var walkLeft = function() {
//   $player1.addClass("walk").css({ marginLeft: "-=10px" });
// };

// var walkRight = function() {
//   $player1.addClass("walk").css({ marginRight: "+=10px" });
// };

// // on-click event functions
// $("#f").click(punch);
// $("#d").click(flipKick);
// $("#s").click(roundHouse);
// $("#v").click(block);
// $("#down").on("mousedown mouseup", function(e) {
//   if (e.type == "mousedown") {
//     duck();
//   } else {
//     $player1.removeClass("duck");
//   }
// });
// $("#left").on("mousedown mouseup", function(e) {
//   if (e.type == "mousedown") {
//     walkLeft();
//   } else {
//     $player1.removeClass("walk");
//   }
// });
// $("#right").on("mousedown mouseup", function(e) {
//   if (e.type == "mousedown") {
//     walkRight();
//   } else {
//     $player1.removeClass("walk");
//   }
// });

// // on keydown event functions
// $(document).on("keydown keyup", function(e) {
//   if (e.type == "keydown") {
//     // f key = punch
//     if (
//       e.keyCode == 70 &&
//       !$player1.hasClass("punch") &&
//       !$player1.hasClass("flipKick") &&
//       !$player1.hasClass("roundHouse") &&
//       !$player1.hasClass("block") &&
//       !$player1.hasClass("duck")
//     ) {
//       punch();
//     }
//     // d key = flipKick
//     if (
//       e.keyCode == 68 &&
//       !$player1.hasClass("punch") &&
//       !$player1.hasClass("flipKick") &&
//       !$player1.hasClass("roundHouse") &&
//       !$player1.hasClass("block") &&
//       !$player1.hasClass("duck")
//     ) {
//       flipKick();
//     }
//     // s key = roundHouse
//     if (
//       e.keyCode == 83 &&
//       !$player1.hasClass("punch") &&
//       !$player1.hasClass("flipKick") &&
//       !$player1.hasClass("roundHouse") &&
//       !$player1.hasClass("block") &&
//       !$player1.hasClass("duck")
//     ) {
//       roundHouse();
//     }
//     // v key = block
//     if (
//       e.keyCode == 83 &&
//       !$player1.hasClass("flipKick") &&
//       !$player1.hasClass("roundHouse") &&
//       !$player1.hasClass("block") &&
//       !$player1.hasClass("duck")
//     ) {
//       block();
//     }
//     // down arrow key = duck
//     if (
//       e.keyCode == 40 &&
//       !$player1.hasClass("flipKick") &&
//       !$player1.hasClass("roundHouse") &&
//       !$player1.hasClass("block") &&
//       !$player1.hasClass("duck")
//     ) {
//       duck();
//     }
//     if (e.keyCode == 37) {
//       walkLeft();
//     }
//     if (e.keyCode == 39) {
//       walkRight();
//     }
//   } else {
//     $player1.removeClass("walk duck");
//   }
//   return false;
// });
