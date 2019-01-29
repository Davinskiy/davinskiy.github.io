
/* Данные портфолио | Инфо добавляем в начало массива (выводятся на страницу в таком же порядке) */

let pDir = 'https://davinskiy.bitbucket.io/portfolios/';

let portfoliosData = [
	{
		title : "Бизнес на путешествиях",
		miniature : pDir + "dnq/mini.jpg",
		url_to_work : pDir + "dnq/index.html",
		url_to_jpg : pDir + "dnq/full-img.jpg",
		site : "https://cruise.dnq.me",
	},
	{
		title : "Центр утилизации каталитических систем",
		miniature : pDir + "catholyzers/mini.jpg",
		url_to_work : pDir + "catholyzers/index.html",
		url_to_jpg : pDir + "catholyzers/full-img.jpg",
		site : "https://lomkatov.ru/",
	},
	{
		title : "Пропуска МКАД ТТК СК",
		miniature : pDir + "mcad-passes_/mini.jpg",
		url_to_work : pDir + "mcad-passes_/index.html",
		url_to_jpg : pDir + "mcad-passes_/full-img.jpg",
		site : "https://propuska-mkad-ttk-sk.ru/",
	},
	{
		title : "Banks Guarantee",
		miniature : pDir + "banks-guarantee/mini.jpg",
		url_to_work : pDir + "banks-guarantee/index.html",
		url_to_jpg : pDir + "banks-guarantee/full-img.jpg",
		site : "http://brvplus.ru/",
	},
	{
		title : "Ключи магической вселенной",
		miniature : pDir + "vratamir/mini.jpg",
		url_to_work : pDir + "vratamir/index.html",
		url_to_jpg : pDir + "vratamir/full-img.jpg",
		site : "http://vratamir.com/lp/ovfree2019/",
	},
	{
		title : "Медицинский Центр АО «Адмиралтейские верфи»",
		miniature : pDir + "verficlinic/mini.jpg",
		url_to_work : pDir + "verficlinic/index.html",
		url_to_jpg : pDir + "verficlinic/full-img.jpg",
		site : "",
	},
	{
		title : "Корпорация знаний",
		miniature : pDir + "test-work-knowledge-corporation/mini.jpg",
		url_to_work : pDir + "test-work-knowledge-corporation/index.html",
		url_to_jpg : pDir + "test-work-knowledge-corporation/full-img.jpg",
		site : "",
	},
	{
		title : "ТехОсмотр онлайн",
		miniature : pDir + "tech-view-circle/mini.png",
		url_to_work : pDir + "tech-view-circle/index.html",
		url_to_jpg : pDir + "tech-view-circle/full-img.png",
		site : "",
	},
	{
		title : "Конструктор для создания креативов",
		miniature : pDir + "legolise/mini.jpg",
		url_to_work : pDir + "legolise/index.html",
		url_to_jpg : pDir + "legolise/full-img.jpg",
		site : "",
	},
	{
		title : "Мисс Урал",
		miniature : pDir + "fashion-land/mini.jpg",
		url_to_work : pDir + "fashion-land/index.html",
		url_to_jpg : pDir + "fashion-land/full-img.jpg",
		site : "",
	},
	{
		title : "Duty Awards",
		miniature : pDir + "duty-awards/mini.jpg",
		url_to_work : pDir + "duty-awards/index.html",
		url_to_jpg : pDir + "duty-awards/full-img.jpg",
		site : "",
	},
	{
		title : "Echo design",
		miniature : pDir + "echo-design/mini.jpg",
		url_to_work : pDir + "echo-design/index.html",
		url_to_jpg : pDir + "echo-design/full-img.jpg",
	},
	{
		title : "Dental marketing",
		miniature : pDir + "stomotolog-uv/mini.jpg",
		url_to_work : pDir + "stomotolog-uv/index.html",
		url_to_jpg : pDir + "stomotolog-uv/full-img.jpg",
	},
	{
		title : "Лендинг детского магазина",
		miniature : pDir + "mamka-landing/mini.jpg",
		url_to_work : pDir + "mamka-landing/index.html",
		url_to_jpg : pDir + "mamka-landing/full-img.jpg",
	},
	{
		title : "Страница-портфолио",
		miniature : pDir + "04-portfolio/mini.jpg",
		url_to_work : pDir + "04-portfolio/index.html",
		url_to_jpg : pDir + "04-portfolio/full-img.jpg",
	},
	{
		title : "World Of Tanks",
		miniature : pDir + "wot/mini.jpg",
		url_to_work : pDir + "wot/index.html",
		url_to_jpg : pDir + "wot/full-img.jpg",
	},
	{
		title : "Soco Group",
		miniature : pDir + "soco.group/mini.jpg",
		url_to_work : pDir + "soco.group/index.html",
		url_to_jpg : pDir + "soco.group/full-img.jpg",
	},
	{
		title : "Инвестиции",
		miniature : pDir + "investing/mini.jpg",
		url_to_work : pDir + "investing/index.html",
		url_to_jpg : pDir + "investing/full-img.jpg",
	},
	{
		title : "Florida Builders",
		miniature : pDir + "florida-builders/mini.jpg",
		url_to_work : pDir + "florida-builders/index.html",
		url_to_jpg : pDir + "florida-builders/full-img.jpg",
	},
	{
		title : "Mamka Store",
		miniature : pDir + "mamka-store/mini.jpg",
		url_to_work : pDir + "mamka-store/index.html",
		url_to_jpg : pDir + "mamka-store/full-img.jpg",
		show: false
	},
	{
		title : "18+?",
		miniature : pDir + "adulthood/full-img.jpg",
		url_to_work : pDir + "adulthood/index.html",
		url_to_jpg : pDir + "adulthood/full-img.jpg",
		show: false
	},
	{
		title : "Правопоритет",
		miniature : pDir + "pravoparitet/mini.jpg",
		desc : "Сайт на тему: юридические услуги для организаций и предпринимателей",
		impress : "[попросили не афишировать]",
		url_to_work : pDir + "pravoparitet/index.html",
		url_to_jpg : pDir + "pravoparitet/full-img.jpg",
		show: false
	},
	{
		title : "Дизайн интерьера",
		miniature : pDir + "interior-design/mini.jpg",
		url_to_work : pDir + "interior-design/index.html",
		url_to_jpg : pDir + "interior-design/full-img.jpg",
	},
	{
		title : "Ремонт и отделка",
		miniature : pDir + "planiroom/mini.jpg",
		url_to_work : pDir + "planiroom/index.html",
		url_to_jpg : pDir + "planiroom/full-img.jpg"
	},
	{
		title : "Ателье мебели",
		miniature : pDir + "belcanto/mini.jpg",
		url_to_work : pDir + "belcanto/index.html",
		url_to_jpg : pDir + "belcanto/full-img.jpg"
	},
	{
		title : "SEOBAKER",
		miniature : pDir + "seobaker/mini.jpg",
		url_to_work : pDir + "seobaker/index.html",
		url_to_jpg : pDir + "seobaker/full-img.jpg"
	},
	{
		title : "Мужское портмоне | Louis Vuitton",
		miniature : pDir + "wallets/mini.jpg",
		url_to_work : pDir + "wallets/index.html",
		url_to_jpg : pDir + "wallets/full-img.jpg"
	},
	{
		title : "Арена недвижимости",
		miniature : pDir + "real-estate-arena/mini.jpg",
		url_to_work : pDir + "real-estate-arena/index.html",
		url_to_jpg : pDir + "real-estate-arena/full-img.jpg"
	},
	{
		title : "Теплоконтакт",
		miniature : pDir + "teplokontakt/mini.jpg",
		url_to_work : pDir + "teplokontakt/index.html",
		url_to_jpg : pDir + "teplokontakt/full-image.jpg"
	},
	{
		title : "Дождевики",
		miniature : pDir + "Rainers/miniature.jpg",
		url_to_work : pDir + "Rainers/index.html",
		url_to_jpg : pDir + "Rainers/full-img.jpg"
	},
	{
		title : "Авто кредит.Редизайн",
		miniature : pDir + "auto-credit.redisign/miniature.jpg ",
		url_to_work : pDir + "auto-credit.redisign/index.html",
		url_to_jpg : pDir + "auto-credit.redisign/full-img.jpg"
	},
	{
		title : "Я ем",
		miniature : pDir + "I-eat/mini.jpg ",
		url_to_work : pDir + "I-eat/index.html",
		url_to_jpg : pDir + "I-eat/full-image.png"
	},
	{
		title : "Балтсервис",
		miniature : pDir + "BaltService/mini.jpg ",
		url_to_work : pDir + "BaltService/index.html",
		url_to_jpg : pDir + "BaltService/full-img.jpg"
	},
	{
		title : 'GPS Мониторинга под ключ',
		miniature : pDir + 'GPS-monitoring/miniature.jpg',
		url_to_work : pDir + 'GPS-monitoring/index.html',
		url_to_jpg : pDir + 'GPS-monitoring/full-image.jpg'
	},
	{
		title : 'Авто кредит',
		miniature : pDir + 'auto-credit/miniature.jpg',
		url_to_work : pDir + 'auto-credit/index.html',
		url_to_jpg : pDir + 'auto-credit/full-image.jpg',
		site: "https://fgk.ua/lp/",
	}
];
