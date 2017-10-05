$('.faq__slick-container').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	speed: 300,
	arrows: true, 
	dots: true,
	adaptiveHeight: false,
	centerMode: false,
	centerPadding: "50px",
	autoplay: true,
	autoplaySpeed: 7000
});

$('.testimonials__slider-box').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	speed: 300,
	arrows: true, 
	dots: false,
	adaptiveHeight: false,
	centerMode: false,
	centerPadding: "50px",
	autoplay: false,
	autoplaySpeed: 7000
});


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


/**
* scrolling to down
**/
$(".js-scroll-to").on("click", function(e){ /* выбор ссылок и привязка событие клика (onclick) */
	e.preventDefault(); /* отмена стандартного поведение у ссылок */
	var href = $(this).attr("href");  /* берем аттрибут href, значение которой является id'шником определенного элемента на странице */
	var to = (href)?($(href).offset().top): 0; /* определяем дистанцию по высоте до этого элемента,
																	если нет такого элемента - впихаем значение 0 (верх страницы)*/
	$("html,body").animate({
			scrollTop: to  /* скроллим (прокручиваем страницу) до этого элемента  */
		}
	);
});




/**
* animated showing numbers
**/
$(function(){
    var show = true;
    var countbox = ".why-we";
    $(window).on("scroll load resize", function(){
 
        if(!show) return false;                   // Отменяем показ анимации, если она уже была выполнена
 
        var w_top = $(window).scrollTop();        // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top;     // Расстояние от блока со счетчиками до верха всего документа
 
        var w_height = $(window).height();        // Высота окна браузера
        var d_height = $(document).height();      // Высота всего документа
 
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
 
        if(w_top + 200 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
            $(".spincrement").spincrement({
                thousandSeparator: "",
                duration: 2000
            });
 
            show = false;
        }
    });
});


/*
* добавление ссылок у видео в аттрибут src
**/

$(function(){
	setTimeout(function(){
		$("iframe").each(function(idItem, el){
			var src = $(el).data("src");
			$(el).attr("src", src);
		});
	}, 1000);
});