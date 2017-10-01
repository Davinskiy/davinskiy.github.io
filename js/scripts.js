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


