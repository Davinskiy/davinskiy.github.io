var configs = {
	bgVideoName_index : "https://pixabay.com/ru/videos/download/video-78_source.mp4?attachment",		/* Имя файла относительно от файла index.html */
	bgVideoName_thanks : "https://pixabay.com/ru/videos/download/video-78_source.mp4?attachment" 	/* Имя файла относительно от файла index.html */
};

var wow = new WOW(
	{
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       150,          // distance to the element when triggering the animation (default is 0)
		mobile:       false,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
			// the callback is fired every time an animation is started
			// the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null // optional scroll container selector, otherwise use window
	}
);

$(function(){
	wow.init();
});

$('.testimonials__container-wrapper').slick({
	infinite: false,
	slidesToShow: 3,
	slidesToScroll: 3,
	speed: 300,
	arrows: true, 
	dots: false,
	adaptiveHeight: true,
	centerMode: false,
	centerPadding: "50px",
	autoplay: true,
	autoplaySpeed: 7000, 
	responsive : [
		{
			breakpoint : 920,
			settings: {
				arrows: true,
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint : 767,
			settings: {
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});


/**
*	modal open
*/

var opened_modal;

$(".modal").on("click", function(e){
	e.preventDefault();

	var _this = $(this);

	opened_modal = _this;

	var this_modal = _this.data("modal");
	$(".modal-container, ." + this_modal).css({display: "block"}).animate({opacity : 1});


	/* testimonials / youtube video*/
	if (_this.hasClass("youtube-play")) {
		var video_wrapper = $("." + this_modal + " .videoWrapper iframe");

		var url = _this.data("url");
		var ratio = _this.data("ratio");
		var width = _this.data("width");
		var height = _this.data("height");

		if (ratio) {
			video_wrapper.removeClass("r16x9 r4x3").addClass(_this.data("ratio"));
		}

		if (url) {
			video_wrapper.attr("src", url);
		}
		if (width) {
			alert(width);
			video_wrapper.attr("width", width);
		}
		if (height) {
			video_wrapper.attr("height", height);
		}

		// video_wrapper
	}

});

/**
*	modal close
*/
$(".modal-close, .modal__bg").on("click", function(){



	$(".modal-container").animate({opacity : 0}, {
		complete : function(){
			$(".modal-container, .modal-container__modal-item").css({
				display: "none"
			});
		}
	});

	/* Если был открыть видео отзыв, удаляем ссылку, чтобы не игралась видео на фоне*/
	if (opened_modal.hasClass("youtube-play")) {
		 $("." + opened_modal.data("modal") + " .videoWrapper iframe").removeAttr("src");
	}
});

$(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		/* if mobiles */
		$(".header__banner, .thanks").addClass("bg-image");
	}else {
		/* if not mobiles */
		var video_html_index = "<source src='"+ configs.bgVideoName_index +"'></source>";
		var video_html_thanks = "<source src='"+ configs.bgVideoName_thanks +"'></source>";

		try{
			$(".header__banner__video").html(video_html_index);
		}catch(e){}
		try{
			$(".header__banner__video.thanks__video").html(video_html_thanks);
		}catch(e){}

		

	}

});


if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	fixing_header();
	$(window).on("resize", function(){
		fixing_header();
	});
}

function fixing_header(){
	var header = $(".header__wrapper");
	
	_pos = $(document).scrollTop();
	var headerH = header.innerHeight()
	// var about_working = $(".about-working").offset().top;

	$(document).on("scroll", function(){
		var _pos = $(document).scrollTop();
		if (_pos > headerH) {
			$("body").css({
				"margin-top" : headerH + "px"
			});
			header.css({
				position : "fixed"
			}).addClass("js-fixing");
		}else {
			$("body").removeAttr("style");
			header.css({ position : "static"}).removeClass("js-fixing");
			// setTimeout(function(){
			// }, 200);
		}
	});
}

/* Paralax Effect By Davinskiy :) */
var banner_position = $(".banner__video-wrapper").offset().top;
$(document).on("scroll", function() {
	var _pos = $(document).scrollTop();
	console.log(_pos);

	if (_pos > banner_position) {
		var top = (_pos - banner_position) / 2;
		$(".banner__video-wrapper").css({ transform : "translateY("+(top/2 + 30)+"px)" });
		$(".header__banner-wrapper").css({ transform : "translateY("+top+"px)" });
	}else {
		$(".header__banner-wrapper").css({ transform : "translateY(0px)" });
		$(".banner__video-wrapper").css({ transform : "translateY(0px)" });
	}
});