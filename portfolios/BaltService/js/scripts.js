// $(function(){
	
// });


var conf = {
	icon_open : "fa-plus-square-o",
	icon_close : "fa-minus-square-o",
	modalToggleSpeed : 300
}


$(".header__menu-link").each(function( key, val ) {
	// console.log(key, val);
	if ($(val).siblings('ul').length) {
		$(val).html($(val).html() + '<i class="fa '+ conf.icon_open +' sub-menu-toggle" aria-hidden="true"></i>')
	}
});


/* sub menu toggles */
$(".sub-menu-toggle").on("click", function(e){
	e.preventDefault();
	_this = $(this);
	ul = _this.parent().siblings('ul');

	// /* if it has sub menu, then ... */
	if (ul.length) {
		ul.toggle();

		if (_this.hasClass("fa-plus-square-o")) {
			_this.removeClass(conf.icon_open).addClass(conf.icon_close);
		}else{
			_this.removeClass(conf.icon_close).addClass(conf.icon_open);
		}
	}
});






/* menu toggle */
$(".menu-toggle").on("click", function(){
	var menu__wrapper = $(".header__menu-wrapper");

	moveTo = $(".header__menu-wrapper").innerHeight();

	menu__wrapper.css({transform : "translateY(" + moveTo + "px)", top : "0"}).fadeToggle(100, function(){
		if (!menu__wrapper.is(":visible")) {
			menu__wrapper.removeAttr("style");
		}
	});

	$(window).on("scroll.toggle resize.toggle", function(){
		console.log("scroll.toggle resize.toggle");
		var btn_toggle_container = $(".menu-toggle .btn-container");
		if (!$(".menu-toggle").is(":visible")) {
			menu__wrapper.removeAttr("style");
			$(".header__sub-container").removeAttr("style");
			btn_toggle_container.removeClass("change");

			/* deleting the events */
			// $(window).off("scroll.toggle resize.toggle");

		}else if(btn_toggle_container.hasClass("change")) {
			if(menu__wrapper.is(":visible")){
				menu__wrapper.css({transform : "translateY(" + $(".header__menu-wrapper").innerHeight() + "px)"});
			}
		}
	});

});

/* menu toggle button */
function toggleMainMenu(x) {
    x.classList.toggle("change");
}




/* header fixing */
var header = $(".header__top-info");

// _pos = $(document).scrollTop();
var headerH = header.innerHeight()

$(document).on("scroll", function(){
	var _pos = $(document).scrollTop();
	if (_pos > headerH) {
		$("body").css({
			"margin-top" : headerH + "px"
		});
		header.css({
			position : "fixed",
			backgroundColor : "#fff"
		});
		$(".header__top-info").css({
			height : "60px"
		});
	}else {
		$(".header__top-info").css({
			height : ""
		});
		$("body").removeAttr("style");
		header.css({ position : ""});
		// setTimeout(function(){
	}
});


$(".header__search-field").on("blur", function(e){
	if (e.type = "blur") {
		if ($(this).val().length > 0) {
			$(".header__search-button").css({
				display : "block"
			});

			$(".header__search-label").css({
				display : "none"
			});
		}else {
			$(".header__search-button").css({
				display : ""
			});

			$(".header__search-label").css({
				display : ""
			});
		}
	}
});



/* modal / open*/
$(".modal").on("click", function(e){
	e.preventDefault();

	var this_modal = $(this).data("modal");

	$(".modal-container, ." + this_modal).fadeIn(conf.modalToggleSpeed);

	$("body").css({
		overflow : "hidden",
		"padding-right" : "17px"
	});
});

/* modal / close*/
$(".modal-close, .modal__bg").on("click", function(e){
	e.preventDefault();

	var this_modal = $(this).data("modal");

	$(".modal-container, .modal-container__modal-item").fadeOut(conf.modalToggleSpeed, function(){
		$("body").removeAttr("style");
	});
	
});



/* расцветка пути в меню  */
$(".header__sub-container li").on("mouseenter mouseleave", function(e){
	$(this).children("a").css({
		backgroundColor: "#69a8a4"
	})

	if (e.type == "mouseleave") {
		$(this).children("a").removeAttr("style");
	}
});