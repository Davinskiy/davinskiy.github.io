/* menu toggle button */
function toggleMainMenu(x) {
	x.classList.toggle("change");
	menuShowHide();
}

/* показ/скрытие меню */
function menuShowHide(){

	var menu = $(".menu-box");

	menu.slideToggle(200, function(){
		if (menu.is(":not(:visible)")) {
			menu.removeAttr("style");
		}
	});

}


/* паралакс фона хедера */
function paralaxBG(){

	var scrollTop = $(document).scrollTop();
	var header = $(".header");

	if (header.innerHeight() >= scrollTop) {
		header.css({
			backgroundPosition : "center " +(scrollTop/2)+"px"
		});
	}
}

// function thisPositionOnPage() {
// 	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
// }

$(window).scroll(function(){
	
	/*  https://github.com/hgoebl/mobile-detect.js  */
	var md = new MobileDetect(window.navigator.userAgent);

	/* Проверка устройство - если не телефон и не планшет, то делаем паралакс эффект */
	if (!md.mobile() && !md.tablet()) {
		paralaxBG();
	}
});


/* Плавно меняет цвет фона */
function changeBGColor(target, colorsArr){
	var rndTime = Math.random() * 3;
	var rndTime_forTimeout = Math.floor(rndTime * 1000);

	

	target.css({"background-color" : getRandomFrom(colorsArr),
				"transition" : rndTime + "s"
				});
	setTimeout(function(){
		changeBGColor(target, colorsArr);
	}, rndTime_forTimeout);
}

/* плавное смена фонового цвета */
changeBGColor($(".about-me"), ["#27374E","#252527","#061624","#1C0F10","#1C1201","#070C1E","#000000"]);

function getRandomFrom(arr) {
	return arr[getRndNum(arr.length)];
}

function getRndNum(max) {
	return Math.floor(Math.random() * max);
}



/* Smooth scroll to the pages block
====================================*/

var headerH = $(".header__menu").innerHeight();

$(".js-move-to").on("click", function(e) {
	e.preventDefault();


	if($(".btn-container").hasClass("change")){
		$(".btn-container").removeClass("change");
		menuShowHide();
	}

	var _this = $(this);
	var speed = parseInt(_this.data("move-speed"))  || 800;

	var currentBlock = $(this).attr("href");
	if (currentBlock == '#up') {
		var currentBlockOffset = 0;
	}else {
		var currentBlockOffset = $(currentBlock).offset().top;
	}

	console.log(currentBlockOffset)

	$("html, body").animate({
		scrollTop: currentBlockOffset - (parseInt(headerH))
	}, speed);

});
