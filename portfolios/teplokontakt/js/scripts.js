/* menu toggle button */
function toggleMainMenu(x) {
    x.classList.toggle("change");
    menuShowHide();
}

/* показ/скрытие меню */
function menuShowHide(sub){
	sub = sub || false;

	var menu = $(".menu--wrapper");

	menu.slideToggle(200, function(){
		if (menu.is(":not(:visible)")) {
			menu.removeAttr("style");
		}
	});

}

/*смена изображении в каталоге товаров */
var bigImg;

$(".goods_item--img-list-item").on("click", function(){
	_this = $(this);
	if (_this.hasClass("active")) { return false;}

	_this.parent().find(".goods_item--img-list-item").removeClass("active");
	_this.addClass("active");


	bigImg = _this.closest(".goods_item--img-box").find(".goods_item--img-big");
	
	bigImg.animate({
		opacity : "0"
	}, {
		complete : function (){
			bigImg.attr("src", _this.find("img").attr("src"));
			bigImg.animate({
				opacity : "1"
			});	
			
		}
	});


	// console.log(bigImg);
});


/* слвйдер сертификации */
$('.js-slick-container').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	speed: 300,
	arrows: true, 
	dots: false,
	adaptiveHeight: false,
	centerMode: true,
	centerPadding: "0",
	autoplay: true,
	autoplaySpeed: 7000,
	responsive : [
		{
			breakpoint: 980,
			settings: {
				slidesToShow: 2,
				variableWidth: true
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				variableWidth: false
			}
		},
	]
});



 /* Fixed header when scroll
====================================*/

var headerH = $(".header--menu").height();

$(document).on("scroll", function() {

	var documentScroll = $(this).scrollTop();

	if(documentScroll > 500) {
		$(".move-up-btn").css({visibility : "visible"});


		$(".header--menu").addClass("fixed");

		$("body").css({
			"paddingTop": headerH
		});
	} else {
		$(".move-up-btn").css({visibility : "hidden"});
		$(".header--menu").removeClass("fixed");
		$("body").removeAttr("style");
	}

});

/* Smooth scroll to the pages block
====================================*/

$(".js-move-to").on("click", function(e) {

	e.preventDefault();

	if($(".btn-container").hasClass("change")){
		$(".btn-container").removeClass("change");
		menuShowHide();
	}

	var _this = $(this);
	var speed = parseInt(_this.data("move-speed"));

	var currentBlock = $(this).attr("href");
	if (currentBlock == '#up') {
		var currentBlockOffset = 0;
	}else {
		var currentBlockOffset = $(currentBlock).offset().top;
	}

	// console.log(currentBlockOffset)

	$("html, body").animate({
		scrollTop: currentBlockOffset - (parseInt(headerH)/2)
	}, speed || 800);

});

/* при нажатии на кнопку "Заказать" в катологе товаров, запоняем названием товара текстковое поле и скроллим до формы... */
$(".js-order-goods").on("click", function () {

	var goodsTitle = $(this).closest(".js-goods-box").find(".js-goods-title").eq(0).text();
	if (goodsTitle) {
		var str = 'Товар "' + goodsTitle + '".\r\n';
		/* заполнение */
		$(".js-textarea").text(str);
	}
	/* скролл */
	$(".js-move-to-order").trigger("click");
});