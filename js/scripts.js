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