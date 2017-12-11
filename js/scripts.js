var conf = {
	ajaxDir : 'ajax/',
	urlHash : '#view=',
	allPages : [
				"contacts",
				"home",
				"portfolios",
				"reviews",
				"services"
				]
};
var header = $(".header");

/* menu toggle button */
function toggleMainMenu(x) {
	x.classList.toggle("change");
	menuShowHide();
}

/* показ/скрытие меню */
function menuShowHide(_duration){

	var menu = $(".js-menu");

	menu.slideToggle(_duration, function(){
		if (menu.is(":not(:visible)")) {
			menu.removeAttr("style");
		}
	});
}

/* закрывает меню */
function menuClose(){
	if ($(".btn-container").hasClass("change")) {
		menuShowHide();
		$(".btn-container").removeClass("change");
	}
}

/***
**** header fixing with cloning an original header
***/

var originHeader = $('.js-nav-bar');
var clonedHeader;
var clonedHeaderHeight;

/*  header cloning */
$(function(){
	clonedHeader = originHeader.clone().addClass("fix-nav");
	$(".nav-bar").append(clonedHeader);
	heightIdentify();
});

/* fixing */
$(window).scroll(function(){
	var docscroll = $(document).scrollTop();

	if(docscroll > originHeader.offset().top + clonedHeaderHeight){
		clonedHeader.addClass("show");
	}else{
		clonedHeader.removeClass("show");
	}

	// если был открыть меню, закрываем его
	menuClose();
});

/* checking height */
function heightIdentify(){
	clonedHeaderHeight = clonedHeader.outerHeight();
}

$(window).on("resize", function(){
	heightIdentify();
});



/* Добавляем проценты в ширину для элементов блока "Skills" (Навыки) */
function addPercents(){
	$(".js-add-percent").each(function(idx, _this){
		$(_this).css({
			width : $(_this).data("percent")
		}, 1000);
		$(_this).parent().find(".js-percent-number").text($(_this).data("percent"));
	});
}


/**
* функция - шаблонизатор. 
*/
function replaceTemplate(replaceText, replaceObj, before = '{{', after = '}}'){
	for(var text in replaceObj){
		replaceText = replaceText.split(before + text + after).join(replaceObj[text]);;
	}
	return replaceText;
}

var portfoliosTpl = '';
var portfolioContainer = $(".js-portfolio-container");
var allPortfolios = new Array();

/* Заполняем секцию портфолио данными */
$(function(){

	$.ajax({
		url: conf.ajaxDir + 'portfolios.tpl.html',             // указываем URL и
		dataType : "html",                     // тип загружаемых данных
		success: function (data, textStatus) { // вешаем свой обработчик на функцию success

			portfoliosTpl = data; // теперь тут находится голый шаблон портфолио

			// заполняем этот заблон данными
			for(var i = 0; i < portfoliosData.length; i++){
				var __tpl = portfoliosTpl;
				if (portfoliosData[i].show === false) {
					continue;
				}

				__tpl = replaceTemplate(__tpl, {
					"title" : portfoliosData[i].title,
					"miniature" : portfoliosData[i].miniature,
					"desc" : portfoliosData[i].desc,
					"impress" : portfoliosData[i].impress,
					"url-to-work" : portfoliosData[i].url_to_work,
					"url-to-jpg" : portfoliosData[i].url_to_jpg
				});

				allPortfolios.push(__tpl);
			}


			// это функция заполняет все данные с портфолио
			// но пока нам это не нужно, потом сделаем
			// showPortfolios();
		}
	});
});


var portStart = 0;
function showPortfolios(cnt){
	cnt = cnt || 6;
	var _html = '';


	for(var i = portStart; i < (portStart+cnt); i++){
		if (allPortfolios[i] == undefined) {
			$(".js-port-btn").addClass("disabled");
			$(".js-port-no-more").addClass("show");
			break;
		}
		_html += allPortfolios[i];
	}
	portStart += cnt;
	if (portStart == cnt) {
		portfolioContainer.html(_html);
	}else 
		portfolioContainer.append(_html);

}


function loadPage(fileName){
	fileName = fileName || '';

	if (!fileName) return false;

	// грузим файл

	$.ajax({
		url: conf.ajaxDir + fileName + '.html',          // указываем URL и
		dataType : "html",                     // тип загружаемых данных
		success: function (data, textStatus) { // вешаем свой обработчик на функцию success
			$(".js-content").append(data);

			stopPreloader();

			switch(fileName){
				case 'home':
					addPercents();
				break;
				case 'portfolios':
					$(".js-port-quatity").text(allPortfolios.length);
					portfolioContainer = $(".js-portfolio-container");
					showPortfolios();
				break;
				case 'reviews':
				setTimeout(function(){
					VK.init({apiId: 6255802, onlyWidgets: true});
					VK.Widgets.Comments("vk_comments", {limit: 10, attach: "*"});
				}, 500);
				break;
			}
		}
	});
}


function getPage(fileName){
	/* скрываем меню, если он был вскроен */
	menuClose();
	
	startPreloader();

	fileName = fileName || '';
	if (!fileName) {return false;}

	var href = '#' + fileName;
	var fileName = href.slice(1);
	
	$(".content__box-item").fadeOut(200);

	if ($(href).length <= 0) {
		loadPage(fileName);
	}else {
		stopPreloader();

		$(href).fadeIn(200);
	}

	// уснатавливаем соответствующую адресную строку
	setLocation(conf.urlHash + fileName);

	$(".js-menu-item").removeClass("active");
	$('a[href*=' + fileName + ']').addClass("active");

}


/* автозагрузка главной страницы */
$(function(){
	var url = location.href;
	var re = new RegExp(conf.urlHash);

	if (re.test(url)) {
		var fileName = url.substring(url.indexOf(conf.urlHash) + conf.urlHash.length,
									(url.indexOf("&") == -1)? url.length: url.indexOf("&")
									);

		if(conf.allPages.indexOf(fileName) < 0)
			fileName = '';
	}

	// грузим контент
	getPage(fileName || "home");
});

/* устанавливет адресную строку */
function setLocation(curLoc){
	try {
		history.pushState(null, null, curLoc);
		return;
	} catch(e) {}
	location.hash = curLoc;
}

function stopPreloader(){
	setTimeout(function(){
		$("body").addClass("animated");
		setTimeout(function(){
			$(".body__preloader").fadeOut();
		}, 200);
	}, 50);
}

function startPreloader(){
	$(".body__preloader").fadeIn();
	$("body").removeClass("animated");
}

/*
* snow bg
*/
var aaSnowConfig = {snowflakes: 100};