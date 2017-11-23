$(".js-input-counter").on("click", function(){
	var _this = $(this);
	var inputElement = _this.parent().find("input");
	var oldVal = parseInt(inputElement.val());

	if (_this.data("type") == "plus") {
		if (oldVal >= inputElement.data("maxVal"))
			return false;
		inputElement.val(oldVal + 1);
	}else {
		if (oldVal <= inputElement.data("minVal"))
			return false;
		inputElement.val(oldVal - 1);
	}

})

function generatePasswords(conf){
	var defaultConfigs = {
		"lowercase" : true,
		"uppercase" : true,
		"numbers" : true,
		"symbols" : true,
		"length" : 8,
		"quantity" : 200
	};
	var conf = conf || 	defaultConfigs;

	var lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var numbers = [1,2,3,4,5,6,7,8,9,0];
	var symbols = ['?', '!', '_', '-'];

	var allCharacters = new Array();
	var allPasses = new Array();

	if (conf.lowercase) {
		allCharacters = allCharacters.concat(lowercase);
	}
	if (conf.uppercase) {
		allCharacters = allCharacters.concat(uppercase);
	}
	if (conf.numbers) {
		allCharacters = allCharacters.concat(numbers);
	}
	if (conf.symbols) {
		allCharacters = allCharacters.concat(symbols);
	}

	for(var count = 0; count < conf.quantity; count++){
		var pwd = '';
		for(var len = 0; len < conf.length; len++){
			pwd += allCharacters[gerRandom(allCharacters.length)];
		}
		allPasses.push(pwd);
	}
	
	return allPasses;
}


function showResult(listArray) {
	var html = "";
	for (i in listArray)
		html += '<li class="gen-pass__list-element">'+ listArray[i] +'</li>';

	$(".js-list-result").html(html);
}


function gerRandom(max) {
	return Math.floor(Math.random() * max);
}

$(".js-genrate-passes").on("click", function(){


	var form = $(this).closest("form");
	var lowercase = form.find("input[name=lowercase]:checked").val();
	var uppercase = form.find("input[name=uppercase]:checked").val();
	var numbers = form.find("input[name=numbers]:checked").val();
	var symbols = form.find("input[name=symbols]:checked").val();
	var length = form.find("input[name=length]").val();
	var quantity = form.find("input[name=quantity]").val();

	// alert(lowercase);

	var userConfigs = {
		'lowercase' : lowercase,
		'uppercase' : uppercase,
		'numbers' : numbers,
		'symbols' : symbols,
		'length' : length,
		'quantity' : quantity
	}

	showResult(generatePasswords(userConfigs));

	if ($(".js-list-box").is(":not(:visible)")) {
		$(".js-list-box").slideDown();
	}
});