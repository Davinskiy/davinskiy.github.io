$(function(){
	$(".navbar-toggle-lines").on("click", function(){
		$("#main-navbar-collapse").toggle(150, function(){
			if ($(this).css("display") === "none") {
				$(this).removeAttr("style");
			}
		});
	});


	$(window).on("resize", function(){
		menuChecking();
	})
	menuChecking();


	/* scroll to top */
	$(".js-move-top").on("click", function(){
		$("html, body").animate({ scrollTop: 0 }, 300, "swing");
	});


	/* from 1 window to 2*/
	$(".header__main-banner__arrow-to-down").on("click", function(){
		var to = $(".credit").offset().top;
		$("html, body").animate({ scrollTop: to });
	});

	var menuH = $(".header__menu-logo").innerHeight();
	$("body").css({"margin-top":menuH});




});

function menuChecking(){
	__this_size = $(this).innerWidth();
	if (__this_size < 992)
		$(".header__menu-logo").css({overflow:"visible"});
	else
		$(".header__menu-logo").css({overflow:""});
}