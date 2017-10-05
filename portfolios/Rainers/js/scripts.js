/* menu toggle button */
function toggleMainMenu(x) {
    x.classList.toggle("change");
    menuShowHide();
}

/* показ/скрытие меню */
function menuShowHide(){
	var menu = $(".header__menu");

	menu.slideToggle(200, function(){
		if (menu.is(":not(:visible)")) {
			menu.removeAttr("style");
		}
	});

}

/* вставляем изображения из data данных в BG */
$(".choose__views-element").each(function(k, _this){
	var src = $(_this).data("src");
	$(_this).css({ "background-image" : 'url(' + src + ')' });
});

/* меняем главное изображение при клики на миниатюр */
$(".choose__views-element").on("click", function(){
	var bigImg = $(".choose__view-big-img");
	var _this = $(this);

	if(_this.hasClass("active")) {
		// return false;
	}
	
	$(".choose__views-element").removeClass("active");
	_this.addClass("active");

	bigImg.animate({ opacity : "0" }, {
		duration : 200,
		complete : function(){

			var src = _this.data("src");
			bigImg.attr("src", src);
			
			bigImg.animate({ opacity : "1" }, 200);
		}
	});

	// console.log(src);
});


$(".choose__edition-element").on("click", function(){
	var _this = $(this);
	var selectorName;
	var type;

	if (_this.data("color")) {
		type = "color";
	}else if (_this.data("size")) {
		type = "size";
	}
	selectorName = ".choose__"+ type +"-element";

	$(selectorName).removeClass("active");
	_this.addClass("active");

	// Сохраняем выбор
	$(selectorName + "-input").val(_this.data(type));
});
$(".choose__edition-element.active").trigger("click");



/* читать полностью - кнопка */
$(".js-show-more").on("click", function(){
	var text = $(".company__brand-desc_hidden-text");
	var textToChange = $(".company__brand-read-text");

	if (text.hasClass("hidden")) {
		text.removeClass("hidden");
		$(".company__brand-read-icon").removeClass("fa-caret-down").addClass("fa-caret-up");
		textToChange.text(textToChange.data("replaced-text"));
	}
	else {
		text.addClass("hidden");
		$(".company__brand-read-icon").removeClass("fa-caret-up").addClass("fa-caret-down");
		textToChange.text(textToChange.data("origin-text"));
	}
});


/* 6 блок. Заказать Дождевик. Вперед - Назад. обработка и вывод данных, с анимацией  */
$(".js-form-next, .js-form-prev").on("click", function(e){
	e.preventDefault();
	_this = $(this);

	if (_this.text() == _this.data("replace-text")) {
		$(".order__order-form").submit();
		return false;
	}

	if (_this.hasClass("js-form-prev")) {
		var isPrev = true;
	}

	var thisStep = $(".js-step-item.active");
	if (isPrev) {
		var nextStep = thisStep.prevAll(".js-step-item").eq(0);
	}else {
		var nextStep = thisStep.nextAll(".js-step-item").eq(0);
	}
	var last = nextStep.data("last");
	var first = nextStep.data("first");

	var thisLocation = $(".js-location-item.active");
	if (isPrev) {
		var nextLocation = thisLocation.prevAll(".js-location-item").eq(0);
	}else{
		var nextLocation = thisLocation.nextAll(".js-location-item").eq(0);
	}

	var stepsBox = $(".order__steps-box")
	var prev = $(".js-form-prev").removeClass("inviz");

	/* тут сделать валидацию */

	console.log(nextStep, nextStep.height());


	/* переключение формы на следующий шаг */
	// stepsBox.css({
		// height : thisStep.height() + "px"
	// });
	thisStep.css({
				position : "absolute"
			}).animate({
				left : ((isPrev)? "100%" : "-100%"),
				right : ((isPrev)? "-100%" : "100%"),
			});
	nextStep.css({
				position : "absolute",
				left : ((isPrev)? "-100%" : "100%"),
				right : ((isPrev)? "100%" : "-100%"),
				display : "block"
			}).animate({
				left : "0%",
				right : "0%",
			}, {
				complete : function(){
					thisLocation.removeClass("active");
					nextLocation.addClass("active");

					// stepsBox.css({
						// height : "auto"
					// });

					thisStep.removeClass("active");
					nextStep.addClass("active")
								.css({
									position : "static"
								});
				}
			});

	if (last) {
		_this.text(_this.data("replace-text"));
	}
	if (first) {
		_this.addClass("inviz");
	}
	if (isPrev) {
		$(".js-form-next").text($(".js-form-next").data("origin-text"));
	}
	
	// thisStep.removeClass("active");
});






 /* Fixed header when scroll
    ====================================*/

var introSection = $(".js-intro"),
	header = $(".js-header-fixing");

var introSectionH = introSection.height(),
	headerH = header.innerHeight();

$(document).on("scroll", function() {
	var documentScroll = $(this).scrollTop();

	if(documentScroll > (introSectionH / 2)) {

		header.addClass("header-fixed");
		// $(".header__menu-link").css({ padding : "30px 10px"	});

		$("body").css({
			"paddingTop": headerH
		});
	} else {
		header.removeClass("header-fixed");

		// $(".header__menu-link").removeAttr("style");

		$("body").removeAttr("style");
	}

});




/* Анимации при скролле */
var wow = new WOW(
	{
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       150,          // distance to the element when triggering the animation (default is 0)
		mobile:       true,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
			// the callback is fired every time an animation is started
			// the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null // optional scroll container selector, otherwise use window
	}
);
/* инициализация */
wow.init();



var modals_box = "modal-container";
/**
* opening modal windows
**/
$(".js-modal").on("click", function (e) {
	e.preventDefault();

	$("." + modals_box + ", ." + $(this).data("modal")).fadeToggle();
});

/**
* closing modal windows
**/
$(".modal-close").on("click", function (e) {
	e.preventDefault();

	$("." + modals_box + ", .modal-container__modal-item").fadeToggle();
});
