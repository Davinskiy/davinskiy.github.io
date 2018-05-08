
/* Данные портфолио | Инфо добавляем в начало массива (выводятся на страницу в таком же порядке) */
var portfoliosData = [
	{
		title : "Echo design",
		miniature : "https://davinskiy.bitbucket.io/portfolios/echo-design/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/echo-design/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/echo-design/full-img.jpg",
		show: true
	},
	{
		title : "Dental marketing",
		miniature : "https://davinskiy.bitbucket.io/portfolios/stomotolog-uv/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/stomotolog-uv/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/stomotolog-uv/full-img.jpg",
		show: true
	},
	{
		title : "Лендинг детского магазина",
		miniature : "https://davinskiy.bitbucket.io/portfolios/mamka-landing/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/mamka-landing/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/mamka-landing/full-img.jpg",
		show: true
	},
	{
		title : "Страница-портфолио",
		miniature : "https://davinskiy.bitbucket.io/portfolios/04-portfolio/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/04-portfolio/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/04-portfolio/full-img.jpg",
		show: true
	},
	{
		title : "World Of Tanks",
		miniature : "https://davinskiy.bitbucket.io/portfolios/wot/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/wot/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/wot/full-img.jpg",
		show: true
	},
	{
		title : "Soco Group",
		miniature : "https://davinskiy.bitbucket.io/portfolios/soco.group/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/soco.group/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/soco.group/full-img.jpg",
		show: true
	},
	{
		title : "Инвестиции",
		miniature : "https://davinskiy.bitbucket.io/portfolios/investing/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/investing/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/investing/full-img.jpg",
		show: true
	},
	{
		title : "Florida Builders",
		miniature : "https://davinskiy.bitbucket.io/portfolios/florida-builders/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/florida-builders/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/florida-builders/full-img.jpg",
		show: true
	},
	{
		title : "Mamka Store",
		miniature : "https://davinskiy.bitbucket.io/portfolios/mamka-store/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/mamka-store/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/mamka-store/full-img.jpg",
		show: false
	},
	{
		title : "18+?",
		miniature : "https://davinskiy.bitbucket.io/portfolios/adulthood/full-img.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/adulthood/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/adulthood/full-img.jpg",
		show: false
	},
	{
		title : "Правопоритет",
		miniature : "https://davinskiy.bitbucket.io/portfolios/pravoparitet/mini.jpg",
		desc : "Сайт на тему: юридические услуги для организаций и предпринимателей",
		impress : "[попросили афишировать]",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/pravoparitet/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/pravoparitet/full-img.jpg",
		show: false
	},
	{
		title : "Дизайн интерьера",
		miniature : "https://davinskiy.bitbucket.io/portfolios/interior-design/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/interior-design/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/interior-design/full-img.jpg",
		show: true
	},
	{
		title : "Ремонт и отделка",
		miniature : "https://davinskiy.bitbucket.io/portfolios/planiroom/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/planiroom/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/planiroom/full-img.jpg"
	},
	{
		title : "Ателье мебели",
		miniature : "https://davinskiy.bitbucket.io/portfolios/belcanto/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/belcanto/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/belcanto/full-img.jpg"
	},
	{
		title : "SEOBAKER",
		miniature : "https://davinskiy.bitbucket.io/portfolios/seobaker/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/seobaker/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/seobaker/full-img.jpg"
	},
	{
		title : "Мужское портмоне | Louis Vuitton",
		miniature : "https://davinskiy.bitbucket.io/portfolios/wallets/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/wallets/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/wallets/full-img.jpg"
	},
	{
		title : "Арена недвижимости",
		miniature : "https://davinskiy.bitbucket.io/portfolios/real-estate-arena/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/real-estate-arena/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/real-estate-arena/full-img.jpg"
	},
	{
		title : "Теплоконтакт",
		miniature : "https://davinskiy.bitbucket.io/portfolios/teplokontakt/mini.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/teplokontakt/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/teplokontakt/full-image.jpg"
	},
	{
		title : "Дождевики",
		miniature : "https://davinskiy.bitbucket.io/portfolios/Rainers/miniature.jpg",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/Rainers/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/Rainers/full-img.jpg"
	},
	{
		title : "Авто кредит.Редизайн",
		miniature : "https://davinskiy.bitbucket.io/portfolios/auto-credit.redisign/miniature.jpg ",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/auto-credit.redisign/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/auto-credit.redisign/full-img.jpg"
	},
	{
		title : "Я ем",
		miniature : "https://davinskiy.bitbucket.io/portfolios/I-eat/mini.jpg ",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/I-eat/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/I-eat/full-image.png"
	},
	{
		title : "Балтсервис",
		miniature : "https://davinskiy.bitbucket.io/portfolios/BaltService/mini.jpg ",
		url_to_work : "https://davinskiy.bitbucket.io/portfolios/BaltService/index.html",
		url_to_jpg : "https://davinskiy.bitbucket.io/portfolios/BaltService/full-img.jpg"
	},
	{
		title : 'GPS Мониторинга под ключ',
		miniature : 'https://davinskiy.bitbucket.io/portfolios/GPS-monitoring/miniature.jpg',
		url_to_work : 'https://davinskiy.bitbucket.io/portfolios/GPS-monitoring/index.html',
		url_to_jpg : 'https://davinskiy.bitbucket.io/portfolios/GPS-monitoring/full-image.jpg'
	},
	{
		title : 'Авто кредит',
		miniature : 'https://davinskiy.bitbucket.io/portfolios/auto-credit/miniature.jpg',
		url_to_work : 'https://davinskiy.bitbucket.io/portfolios/auto-credit/index.html',
		url_to_jpg : 'https://davinskiy.bitbucket.io/portfolios/auto-credit/full-image.jpg'
	}
];
