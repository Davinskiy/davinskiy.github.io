let conf = {
	ajaxDir : 'ajax/',
	portfoliosMaxItem : 6,
	allPages : {
				"#about" : "Главная",
				"#cooperation" : "Услуги",
				"#portfolios" : "Портфолио",
				// "#reviews" : "Отзывы",
				"#contacts" : "Контакты",
				}
};
let thisPage;
let mainTitle = document.querySelector('title').innerText;

/* menu */
function menuToggle(){
	if (hasClass(document.body, 'show-menu')) {
		Menu.hide();
	} else {
		Menu.show();
	}
}


let Menu = {
	show : function(){
		classEdit(document.body, 'show-menu', 'add');
	},
	hide : function(){
		classEdit(document.body, 'show-menu', 'remove');
	}
};

/* ^^^^^^^^^^^^^
	menu */

function getPage(_this, autodetect){
	let href;
	Menu.hide();

	if (autodetect) {
		href = location.hash;
	}else {
		href = _this.getAttribute('href');
	}

	if (conf.allPages.hasOwnProperty(href) == false) { // существует ли такая страница
		href = '#about';
	}
	let pageName = href.substr(1);

	setLocation(href); // меняем адресную строку
	detectCurrentMenu(); // отмечаем выбранный пункт меню
	setTitle(href); // меняем название (тайтл) страницы

	if (document.querySelector(href)) {
		showPage(href);
		return false;
	}


	loadPage(pageName);
	showPage(href);
}

function detectCurrentMenu(){
	
	let contentItems = document.querySelectorAll(".js-menu-item");
	for (let i = 0; i < contentItems.length; i++) {
		classEdit(contentItems[i], 'active', 'remove');
	}

	classEdit(document.querySelector('.js-menu-item[href="'+ location.hash +'"]'), 'active', 'add');
	
}

function showPage(pageId) {
	let contentItems = document.querySelectorAll(".js-content-item");
	for (let i = 0; i < contentItems.length; i++) {
		contentItems[i].style.display = 'none';
	}
	if (document.querySelector(pageId)) {
		document.querySelector(pageId).style.display = 'block';
	}
}

function loadPage(pageName) {

	Animation.start();

	let req = getXmlHttpRequest();
	req.open('GET', conf.ajaxDir + pageName + '.html', true);
	req.overrideMimeType('text/html');
	req.send();
	
	req.onreadystatechange = function(){
		if (req.readyState != 4 ) return false;
		let content = document.querySelector(".js-content");
		if (hasClass(content, 'empty')) {
			content.innerHTML  = '<div class="content__box-item js-content-item  ' + pageName + '-box" id="' + pageName + '">' + req.responseText + '</div>';
			classEdit(content, 'empty', 'remove');
		} else {
			content.innerHTML += '<div class="content__box-item js-content-item  ' + pageName + '-box" id="' + pageName + '">' + req.responseText + '</div>';
		}

		if (pageName == 'about') {
			let percentItems = document.querySelectorAll(".js-add-percent");
			for (let i = 0; i < percentItems.length; i++) {
				classEdit(percentItems[i], 'active', 'remove');
				let percent = percentItems[i].getAttribute('data-percent');
				percentItems[i].style.width = percent;
				percentItems[i].querySelector(".js-percent-number").innerHTML = percent;
			}

			classEdit(document.querySelector('.js-menu-item[href="'+ location.hash +'"]'), 'active', 'add');
		}
		if (pageName == 'portfolios') {
			Animation.start();

			loadPortfoliosData(); //  загружаем данные портфолио

			fillPortfoliosStarter();
			
			// document.querySelector(".js-portfolios-per-items").innerText = conf.portfoliosMaxItem;


		}
		Animation.stop();

		setTimeout(lazyLoadInit, 300);
	};
}

function fillPortfoliosStarter(){

	if (!allPortfolios.length) {
		setTimeout(fillPortfoliosStarter, 50);
		return false;
	}
	// document.querySelector(".js-portfolios-quantity").innerText = allPortfolios.length;
	
	fillPortfolios();
	Animation.stop();
}

function fillPortfolios(){
	
	if (allPortfolios.length <= 0) {
		return;
	}

	let i = 0;
	while (allPortfolios.length) {
		document.querySelector(".js-portfolios").innerHTML += allPortfolios.shift();
		
		if ((++i) >= conf.portfoliosMaxItem) {
			break;
		}
		
	}

	if (allPortfolios.length <= 0) {
		classEdit(document.body, 'no-portfolios', 'add')
		// document.querySelector(".js-portfolios-btn").style.display = 'none';
	}

	setTimeout(lazyLoadInit, 300);
}

// console.log();

function setTitle(key){
	let title = conf.allPages[key] + " – " + mainTitle;
	document.querySelector('title').innerText = title;
}



/* устанавливет адресную строку */
function setLocation(curLoc){
	try {
		history.pushState(null, null, curLoc);
		return;
	} catch(e) {}
	location.hash = curLoc;
}

let Animation = {
	start : function(){
		classEdit(document.body, 'content-loaded', 'remove');
	},
	stop : function(){
		classEdit(document.body, 'content-loaded', 'add');
	}
};

/**
* Установка года в футере
*/
let startYear = 2017;
let thisYear = new Date().getFullYear();
document.querySelector('.js-set-year').innerText = (thisYear == startYear)? thisYear : startYear + " - " + thisYear;
/*^^^^^^^^^^^^^^^^^^^^^^^^*/



/* classEdit(selector, 'class-open', 'remove') */
/* classEdit(selector, 'class-open', 'add') */
function classEdit(element, className, actionType) {
	// console.log(typeof element, className, actionType);
	if (!element) return;
	let arr = element.className.split(" ");

	if (actionType == "add") {
		if (arr.indexOf(className) == -1) {
			element.className += " " + className;
		}
	} else if(actionType == "remove"){
		let _arr = '';

		for(let i = 0; i < arr.length; i++){
			if (arr[i] != className)
				_arr += " " + arr[i];
		}
		element.className = _arr.trim();
	}

	return false;
}

function hasClass(element, className) {
	if (!element) return;

	if (element.className.split(" ").indexOf(className) != -1)
		return true;

	return false;
}

function getXmlHttpRequest(){
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch (ee) {
		}
	}
	if (typeof XMLHttpRequest!='undefined') {
		return new XMLHttpRequest();
	}
}


/**
* функция - шаблонизатор. 
*/
function replaceTemplate(replaceText, replaceObj, before = '{{', after = '}}'){
	for(let text in replaceObj){
		replaceText = replaceText.split(before + text + after).join(replaceObj[text]);;
	}
	return replaceText;
}

let portfoliosTpl = '';
// let portfolioContainer = $(".js-portfolio-container");
let allPortfolios = new Array();

/* Заполняем секцию портфолио данными */
function loadPortfoliosData(){

	let req = getXmlHttpRequest();
	req.open('GET', conf.ajaxDir + 'portfolios.tpl.html', true);
	req.overrideMimeType('text/html');
	req.send();
	
	req.onreadystatechange = function(){
		if (req.readyState != 4 ) return false;
		portfoliosTpl = req.responseText; // теперь тут находится голый шаблон портфолио
		
		// заполняем этот заблон данными
		for(let i = 0; i < portfoliosData.length; i++){
			let __tpl = portfoliosTpl;
			if (portfoliosData[i].show === false) {
				continue;
			}

			let site_class = '';
			if (!portfoliosData[i].site) {
				site_class = 'hidden';
			}

			__tpl = replaceTemplate(__tpl, {
				"title" : portfoliosData[i].title,
				"miniature" : portfoliosData[i].miniature,
				// "desc" : portfoliosData[i].desc,
				"site_class" : site_class,
				"site" : portfoliosData[i].site,
				"url-to-work" : portfoliosData[i].url_to_work,
				"url-to-jpg" : portfoliosData[i].url_to_jpg
			});

			allPortfolios.push(__tpl);
		}

	};
}

// перезагрузка контента при навигации истории посещении ( назад - вперед )
window.onhashchange = function(){
	getPage('', true);
};


document.onscroll = lazyLoadInit;
window.onresize = lazyLoadInit;
setInterval(lazyLoadInit, 3000);

function lazyLoadInit(){
	let lazy_images = document.querySelectorAll('img.lazy-img');
	let w_h = window.innerHeight;

	lazy_images.forEach(function(lazy){
		if (w_h > getPositionTop(lazy) && getPositionTop(lazy) > 0) {
			lazy.src = lazy.getAttribute('data-src');
			classEdit(lazy, 'lazy-img', 'remove');
		}
	});

	let lazy_bg_images = document.querySelectorAll('.lazy-bg-img');

	lazy_bg_images.forEach(function(lazy){
		if (w_h > getPositionTop(lazy) && getPositionTop(lazy) > 0) {
			lazy.style.backgroundImage = 'url('+ lazy.getAttribute('data-url') +')';
			classEdit(lazy, 'lazy-bg-img', 'remove');
		}
	});
};

function getPositionTop(el) {
	var yPos = 0;

	while (el) {
		if (el.tagName == "BODY") {
			var yScroll = el.scrollTop || document.documentElement.scrollTop;
			yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	return yPos;
}