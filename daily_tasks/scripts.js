const conf = {
	'minTaskHeadingLen' : 10
};

const additional = document.querySelector(".js-additional");
const additional_container = document.querySelector(".js-additional-container");
const tasks_container = document.querySelector(".js-tasks-container");


// {{{{{{{{{{{templates}}}}}}}}}}}
const additional_template = document.querySelector(".js-additional-template").innerHTML;
const tasks_template = document.querySelector(".js-tasks-template").innerHTML;
const option_template = document.querySelector(".js-option-template").innerHTML;
const task_items_template = document.querySelector(".js-task-items-template").innerHTML;


let all_tasks = [],
	todayTS = getDateTS();

if (localStorage.getItem("all_tasks")) {
	all_tasks = JSON.parse(localStorage.getItem("all_tasks"));
	fillDates();
	showTasks();
}

// структура
let all_tasks2222 = [
	{
		'title' : 'Цель: достич нового уровня по фронту',
		'desc' : 'Описание, если оно есть: Цель: достич нового уровня по фронту',
		'tasks' : [
			{
				'title': 'Написать что-нибудь на JS. Практиковаться в течение 1-ого часа, минимум.',
				'desc': 'Описание, если оно есть: Написать что-нибудь на JS. Практиковаться в течение 1-ого часа, минимум.',
			},
			{
				'title': 'Поработать на вордпрессе в течение 2-х часов.',
				'desc': 'Описание, если оно есть: Поработать на вордпрессе в течение 2-х часов.',
			},
			{
				'title': 'Изучить канвас, написать что-нибудь на нем (игру, приложение и т.д. и т.п.)',
				'desc': 'Описание, если оно есть: Изучить канвас, написать что-нибудь на нем (игру, приложение и т.д. и т.п.)',
			},
		],
		'process' : {
			'22.09.2018' : {
				'state' : [1,0,1],
				'comments' : {
					1 : 'Подтянулся даже 120 раз! :)',
					3 : 'Много есть не смог, но жрал, сколько мог...!',
				}
			},
			'23.09.2018' : {
				'state' : [1,0,1],
				'comments' : {
					1 : 'Подтянулся даже 120 раз! :)',
					3 : 'Много есть не смог, но жрал, сколько мог...!',
				}
			},
			'24.09.2018' : {
				'state' : [1,0,1],
				'comments' : {
					1 : 'Подтянулся даже 120 раз! :)',
					3 : 'Много есть не смог, но жрал, сколько мог...!',
				}
			},
			'25.09.2018' : {
				'state' : [1,0,1],
				'comments' : {
					1 : 'Подтянулся даже 120 раз! :)',
					3 : 'Много есть не смог, но жрал, сколько мог...!',
				}
			},
		}
	},
	{
		'title' : 'Цель: набрать массу, привести себя в тонус',
		'desc' : 'Описание, если оно есть: Цель: набрать массу, привести себя в тонус',
		'tasks' : [
			{
				'title': 'Подтягиваться каждый день по 100 раз.',
				'desc': 'Описание, если оно есть: Подтягиваться каждый день по 100 раз.',
			},
			{
				'title': 'Бегать каждый вечер.',
				'desc': 'Описание, если оно есть: Бегать каждый вечер.',
			},
			{
				'title': 'Хорошо питаться, есть все что попадается под руки.',
				'desc': 'Описание, если оно есть: Хорошо питаться, есть все что попадается под руки.',
			},
			{
				'title': 'Дыхательная гимнастика, смехатерапия, медитативные практики (одно из списка).',
				'desc': 'Описание, если оно есть: Дыхательная гимнастика, смехатерапия, медитативные практики (одно из списка).',
			},
		],
		'process' : {
			'22.09.2018' : {
				'state' : [1,0,1,1],
				'comments' : {
					1 : 'Подтянулся даже 120 раз! :)',
					3 : 'Много есть не смог, но жрал, сколько мог...!',
				}
			},
			'23.09.2018' : {
				'state' : [1,0,1,1],
				'comments' : {
					1 : 'Подтянулся даже 120 раз! :)',
					3 : 'Много есть не смог, но жрал, сколько мог...!',
				}
			},
			'24.09.2018' : {
				'state' : [1,0,1,1],
				'comments' : {
					1 : 'Подтянулся даже 120 раз! :)',
					3 : 'Много есть не смог, но жрал, сколько мог...!',
				}
			},
			'25.09.2018' : {
				'state' : [1,0,1,1],
				'comments' : {
					1 : 'Подтянулся даже 120 раз! :)',
					3 : 'Много есть не смог, но жрал, сколько мог...!',
				}
			},
		}
	},
];



function showAdditionalFields(_this){
	if (_this.value.trim().length < conf.minTaskHeadingLen)
		classEdit(additional, 'hidden', 'add');
	else
		classEdit(additional, 'hidden', 'remove');
}

function addMoreTaskField() {
	let ch_len = additional_container.childElementCount;
	let tmp = additional_template;

	tmp = replaceTemplate(tmp, {
		'id' : ch_len,
	});

	appendChild(additional_container, tmp);

}

function appendChild(element, html){
	let wrapper = document.createElement('p');
	wrapper.innerHTML = html;
	
	setTimeout(function(){
		let children = wrapper.childNodes;

		for (let i = 0, len = children.length; i < len; i++){
			
			let child = children[i];
		
			if (!child || child.nodeType != 1)
				continue;
			element.appendChild(child);

		}
	}, 5);
}

function createTask(_this){
	let title = _this.querySelector(".js-title");
	let desc = _this.querySelector(".js-desc");

	if (title.value.trim().length < conf.minTaskHeadingLen)
		return false;

	let tasks = [];
	let all_additional_items = _this.querySelectorAll(".js-additional-item");

	for (let item of all_additional_items){
		let title = item.querySelector(".js-title").value;
		let desc = item.querySelector(".js-desc").value;

		if (!title.trim())
			continue;
		
		tasks.push({
			'title' : title,
			'desc' : desc,
		});

	}

	if (!tasks.length) {
		modalOpen(".no-tasks-msg");
		return false;
	}


	all_tasks.unshift({
		'title' : title.value,
		'desc' : desc.value,
		'tasks' : tasks,
		'process' : [],
	});

	tasksExport();
	title.value = desc.value = additional_container.innerHTML = '';
	document.querySelector(".js-toggle-creating-box").click();

	fillDates();
	showTasks();
}

function tasksExport() {
	return localStorage.setItem('all_tasks', JSON.stringify(all_tasks));
}

function getDateTS(ts) {
	let today;
	if (ts)
		today = new Date(ts);
	else
		today = new Date();

	return (new Date(today.getFullYear(), today.getMonth(), ( (ts)?today.getDate() + 1: today.getDate() ), 0, 0, 0, 0)).getTime();
}

function getFormatDate(ts) {
	let date = new Date(ts);
	let dd = date.getDate();
	let mm = date.getMonth() + 1; //January is 0!

	let yyyy = date.getFullYear();

	if(dd < 10){
		dd = '0' + dd;
	} 
	if(mm < 10){
		mm = '0' + mm;
	} 
	return dd + '.' + mm + '.' + yyyy;
}

function fillDates() {
	for (let i = 0, len = all_tasks.length; i < len; i++){
		
		if (!all_tasks[i].process.length) {
			fillEmptyCell(i, todayTS);
		}

		let last_ts = all_tasks[i].process[0].ts;
		let day = 0;
		

		while ((day++) < 1000) {

			if (last_ts == todayTS)
				break;

			last_ts = getDateTS(last_ts);
			fillEmptyCell(i, last_ts);
		}
	}
}

function fillEmptyCell(id, ts) {
	ts = ts || todayTS;
	return all_tasks[id].process.unshift(
	{
		'ts' : ts,
		'state' : [],
		'comments' : {}
	});
}

function showTasks() {
	let all_html = '';
	for (let i = 0, len = all_tasks.length; i < len; i++){
		let task = all_tasks[i];

		let tmp = tasks_template;
		let options = '';
		let all_task_items = '';

		for (let o = 0, o_len = task.process.length; o < o_len; o++){

			let tmp = option_template;
			let ts = task.process[o].ts;
			options += replaceTemplate(tmp, {
				'ts' : ts,
				'date' : getFormatDate(ts),
			});
		}

		// подзадачи/цели
		let tasks = task.tasks;
		for (let t = 0, t_len = tasks.length; t < t_len; t++){
			let task = tasks[t];
			// console.log(tasks[t]);

			let tmp = task_items_template;
			all_task_items += replaceTemplate(tmp, {
				'id' : t,
				'title' : task.title,
				'desc' : nl2br(task.desc),
			});
		}


		tmp = replaceTemplate(tmp, {
			'box_classes' : (i == 0)?'show-details':'',
			'title' : task.title,
			'id' : i,
			'desc' : nl2br(task.desc),
			'options' : options,
			'all_sub_tasks' : all_task_items,
		});

		all_html += tmp;
	}
	tasks_container.innerHTML = all_html;
}


/** modal opening **/
function modalOpen(selector){
	classEdit(document.querySelector(".modals"), "show", "add");
	classEdit(document.querySelector(selector), "show", "add");
}

/** modal closing **/
function modalClose(){
	classEdit(document.querySelector(".modals"), "show", "remove");
	classEdit(document.querySelector(".modals__item.show"), "show", "remove");
}

function nl2br( str ) {

	return str.replace(/([^>])\n/g, '$1<br/>');
}

function classEdit(element, className, actionType) {

	let arr = element.className.split(" ");

	if (actionType == "add") {
		if (arr.indexOf(className) == -1) {
			element.className = (element.className + " " + className).trim();
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

function classToggle(element, className) {

	if (!element || !className) 
		return false;

	if (typeof element == 'string') {
		element = document.querySelector(element);
	}

	if (hasClass(element, className))
		classEdit(element, className, 'remove');
	else
		classEdit(element, className, 'add');
}

function hasClass(element, className) {

	if (element.className.split(" ").indexOf(className) != -1)
		return true;

	return false;
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