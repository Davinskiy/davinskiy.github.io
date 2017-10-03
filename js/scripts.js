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


/* Плавно меняет цвет фона */
function changeBGColor(target, colorsArr, time){
	var time = time || 3; // в секундах
	var rndTime = Math.random() * time;
	var rndTime_forTimeout = Math.floor(rndTime * 1000);

	target.css({"background-color" : getRandomFrom(colorsArr),
				"transition" : rndTime + "s"
				});
	setTimeout(function(){
		changeBGColor(target, colorsArr, time);
	}, rndTime_forTimeout);
}

/* плавное смена фонового цвета */
// changeBGColor($(".about-me"), ["#001","#010","#011","#100","#101","#110","#111"], 10);
// changeBGColor($(".about-me"), ["#27374E","#252527","#061624","#1C0F10","#1C1201","#070C1E","#000000"]);

function getRandomFrom(arr) {
	return arr[getRndNum(arr.length)];
}

function getRndNum(max) {
	return Math.floor(Math.random() * max);
}



/* Smooth scroll to the pages block
====================================*/

/*var headerH = $(".header__menu").innerHeight();

$(".js-move-to").on("click", function(e) {
	e.preventDefault();

	var easingType = $(this).data("easing") || "swing";


	if($(".btn-container").hasClass("change")){
		$(".btn-container").removeClass("change");
		menuShowHide();
	}

	var _this = $(this);
	var speed = parseInt(_this.data("move-speed"))  || 800;

	var currentBlock = $(this).attr("href");
	if (currentBlock == '#up') {
		var currentBlockOffset = 0;
	}else {
		var currentBlockOffset = $(currentBlock).offset().top;
	}

	// console.log(headerH)

	$("html, body").animate({
		scrollTop: currentBlockOffset - (parseInt(headerH))
	}, {
		duration : speed,
		easing: easingType
	});

});*/


/* Добавляем проценты в ширину для элементов блока "Skills" (Навыки) */
$(".js-add-percent").each(function(idx, _this){
	$(_this).css({
		width : $(_this).data("percent")
	}, 1000);
});


/* Анимации при скролле */
var wow = new WOW(
	{
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       100,          // distance to the element when triggering the animation (default is 0)
		mobile:       false,       // trigger animations on mobile devices (default is true)
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


/* точки с линиями на фоне */
particlesJS('about_me',
  
  {
    "particles": {
      "number": {
        "value": 150,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": {
        "value": "#099"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1.15,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#099",
        "opacity": 0.5,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

/* тень у блоков при перемешение курсора */
function addShadowForPortfolios() {
	$('.js-okshadow-portfolios').okshadow({
		color: '#999',
		textShadow: false,
		xMax: 5,
		yMax: 5,
		fuzzMin: 25,
		fuzzMax: 25,
	});
}


/* Smooth scrolling - https://github.com/davist11/jQuery-One-Page-Nav */
var headerH = $(".header__menu").innerHeight();
$('.js-menu-container').onePageNav({
	scrollOffset: headerH, /* my own modification. just added "this.options.scrollOffset" code at 207 (205 origin) line */
	currentClass: 'current',
	changeHash: false,
	scrollSpeed: 750,
	scrollThreshold: 0.5,
	filter: '',
	easing: 'swing',
	begin: function() {
		/* если была развернута менюшка, убираем ее */
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


/* плавный скроллинг / не для меню*/
$(".js-move-to").on("click", function(e) {
	e.preventDefault();
	var _this = $(this);

	var currentBlock = $(this).attr("href");
	if (currentBlock == '#up') {
		var currentBlockOffset = 0;
	}else {
		var currentBlockOffset = $(currentBlock).offset().top - (parseInt(headerH));
	}
	$("html, body").animate({
		scrollTop: currentBlockOffset
	}, {
		duration : 500
	});

});



/**
* функция - шаблонизатор. 
*/
function replaceTemplate(replaceText, replaceObj, before = '{{', after = '}}'){
	for(var text in replaceObj){
		replaceText = replaceText.split(before + text + after).join(replaceObj[text]);;
	}
	return replaceText;
}


/* Заполняем секцию портфолио данными */
$(function(){
	var portfolioContainer = $(".js-portfolio-container");
	var tpl = $(".js-portfolio-tpl").html();
	var allHtmlCode = '';

	for(var i = 0; i < portfoliosData.length; i++){
		var __tpl = tpl;

		__tpl = replaceTemplate(__tpl, {
			"title" : portfoliosData[i].title,
			"miniature" : portfoliosData[i].miniature,
			"desc" : portfoliosData[i].desc,
			"impress" : portfoliosData[i].impress,
			"url-to-work" : portfoliosData[i].url_to_work,
			"url-to-jpg" : portfoliosData[i].url_to_jpg
		});

		allHtmlCode += __tpl;
	}

	portfolioContainer.html(allHtmlCode);

	/* активим тени у блоков */
	setTimeout(function() {
		addShadowForPortfolios();
	}, 100);
});