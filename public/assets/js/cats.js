$(document).ready(function(){
	// reference to input field where user chooses cat name
	var $newCatName = $("input.new-cat-name");
	// event listener for submitting cat name to create cat
	$(document).on("click", "button.submit", createKitty);
})