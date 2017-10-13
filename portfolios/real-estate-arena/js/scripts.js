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
var headerH = header.height();

/* при изменение размера экрана, обновляем значение в переменной headerH */
$( window ).resize(function() {
	headerH = header.height();
});


$(document).on("scroll", function() {
	// headerH = header.height();

	var documentScroll = $(this).scrollTop();

	if(documentScroll > headerH) {

		header.addClass("fixed");

		$("body").css({
			"paddingTop": headerH
		});
	} else {
		$(".move-up-btn").css({visibility : "hidden"});
		header.removeClass("fixed");
		$("body").removeAttr("style");
	}

});

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


/* Smooth scrolling - https://github.com/davist11/jQuery-One-Page-Nav */
$('.js-menu').onePageNav({
	scrollOffset: (headerH > 100)?97:headerH, /* my own modification. just added "this.options.scrollOffset" code at 207 (205 origin) line */
	currentClass: 'active',
	changeHash: false,
	scrollSpeed: 750,
	scrollThreshold: 0.8,
	filter: '',
	easing: 'swing',
	begin: function() {
		console.log(headerH);

		 // если была развернута менюшка, убираем ее 
		if($(".btn-container").hasClass("change")){
			$(".btn-container").removeClass("change");
			menuShowHide();
		}
	},
	end: function() {
		
	},
	scrollChange: function($currentListItem) {
		//I get fired when you enter a section and I pass the list item of the section
		
	}
});

