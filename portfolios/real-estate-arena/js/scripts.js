/* menu toggle button */
function toggleMainMenu(x) {
	x.classList.toggle("change");
	menuShowHide();
}

/* показ/скрытие меню */
function menuShowHide(){

	var menu = $(".js-menu");

	menu.slideToggle(200, function(){
		if (menu.is(":not(:visible)")) {
			menu.removeAttr("style");
		}
	});

}

/* Fixed header when scroll
====================================*/

var header = $(".js-header");
var headerH = Math.max(header.height(), header.innerHeight());

/* при изменение размера экрана, обновляем значение в переменной headerH */
$( window ).resize(function() {
	headerH = Math.max(header.height(), header.innerHeight());

	setPadding();

});

/* добавляем поля верху у боди, чтобы было меню при фиксации не перекривал текс в первом экране... */
function setPadding(){
	$("body").css({
		"paddingTop": headerH
	});
}
setPadding();

/* jqeury form styler */
$(function() {
	setTimeout(function() {
		$('input, select').styler();
	}, 100);
});

/* jqeury form styler - https://github.com/Dimox/jQueryFormStyler*/
$(".js-questionary-form").on("submit", function (e) {

	if (!$(".jq-questionary-agree:checked").length) {
		e.preventDefault();
	}
});


/** Accordion **/
var status_sym = {
	open: "+",
	close: "–"
};
var isProcessing = false;
var speed_time = 400; // скорость анимации акондиона в мс.

$(".js-acord-title").on("click", function(){
	_this = $(this);
	

	if (isProcessing) {
		return false;
	}
	isProcessing = true;

	all_content = $(".js-acord-content");
	all_content.slideUp(speed_time);

	if (!_this.hasClass("current")) {
		$(".js-acord-title").removeClass("current");
		$("#" + _this.data("content-id")).slideDown(speed_time);
		_this.addClass("current");

		$(".js-status").html(status_sym.open);
		_this.find(".js-status").html(status_sym.close);
	}else {
		$(".js-status").html(status_sym.open);
		$(".js-acord-title").removeClass("current");
	}

	setTimeout(function () {
		isProcessing = false;
	}, speed_time);

});


/* поумолчании скрываем блок */
var block_cls = "advantages";
var block_about = $("." + block_cls);
block_about.hide();

$(".js-about-company").on("click", function(e){
	e.preventDefault();
	var _this = $(this);
	
	var icon = _this.find(".fa");
	
	if (block_about.is(":not(:visible)")) {
		icon.removeClass(icon.data("open-icon"));
		icon.addClass(icon.data("close-icon"));

	}else {
		icon.removeClass(icon.data("close-icon"));
		icon.addClass(icon.data("open-icon"));
	}
	block_about.slideToggle();

	/* скроллим до этого место */
	scrollTo(block_about.offset().top);

});


/* доп. обработка событий пунктов меню */

$(".js-move-to").on("click", function(e){
	e.preventDefault();
	var _this = $(this);
	var block_to = $(_this.attr("href"));

	if($(".btn-container").hasClass("change")){
		$(".btn-container").removeClass("change");
		menuShowHide();
	}

	if (block_to.hasClass(block_cls)) {
		if (block_to.is(":not(:visible)")) {
			$(".js-about-company").trigger("click");
		}
	}
	scrollTo(block_to.offset().top);

});


function scrollTo(to, speed){
	// console.log(to);
	speed = speed || 800;
	$("html, body").animate({
		scrollTop: to - headerH
	}, speed);
}


 $(document).on("scroll", function() {
 	var menu_items_li = $(".js-menu li");
 	var menu_items_a = $(".js-menu a");
 	var documentScroll = $(this).scrollTop();

 	// var positions = [];

 	for(var i = 0; i < menu_items_a.length; i++){
 		var item_pos = $(menu_items_a.eq(i).attr("href")).offset().top;
 		// positions.push(item_pos);

 		if ((documentScroll + $( window ).height()) > item_pos) {
 			menu_items_li.removeClass("active");
 			menu_items_li.eq(i).addClass("active");
 		}

 	}
 	

 });