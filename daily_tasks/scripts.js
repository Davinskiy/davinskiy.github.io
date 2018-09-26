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
	todayTS = getDateTS() + ((1000 * 60*60 * 24) * 0);

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
		// console.log(all_tasks[i].process.length);

		let last_ts = all_tasks[i].process[0].ts;
		let day = 0;
		

		while ((day++) < 1000) {


			if (last_ts >= todayTS)
				break;

			last_ts = getDateTS(last_ts);
			fillEmptyCell(i, last_ts);
		}
		// console.log('--------------------');
	}
	tasksExport();
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

		for (let o = 0, o_len = task.process.length; o < o_len; o++){
			// console.log(task);

			let tmp = option_template;
			let ts = task.process[o].ts;
			options += replaceTemplate(tmp, {
				'ts' : ts,
				'date' : getFormatDate(ts),
			});
		}

		// console.log('--------------------');

		// подзадачи/цели
		let all_task_items = getSubTasks(i, 0);

		// console.log(all_task_items);


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

function getSubTasks(mainID, dateID){
	let all_task_items = '';
	let process = all_tasks[mainID].process;
	let tasks = all_tasks[mainID].tasks;
	for (let t = 0, t_len = tasks.length; t < t_len; t++){
		let task = tasks[t];

		let state = process[dateID].state[t];
		let comment = process[dateID].comments[t];

		let tmp = task_items_template;
		all_task_items += replaceTemplate(tmp, {
			'id' : t,
			'element-id' : mainID+'-'+t,
			'box_classes' : (state)?'done':'',
			'comment' : (comment)?comment:'',
			'title' : task.title,
			'desc' : nl2br(task.desc),
		});
	}

	return all_task_items;
}


// изменения даты отображение
function changeShowingTasks(_this) {
	let mainTask = getClosest(_this, "js-task-item");
	let mainTaskId = mainTask.getAttribute("data-id");

	let dateIndex = getIndexByTS(all_tasks[mainTaskId].process, _this.value);
	let all_sub_tasks = getSubTasks(mainTaskId, dateIndex);
	
	mainTask.querySelector(".js-sub-task-container").innerHTML = all_sub_tasks;

	// console.log(all_sub_tasks);
}

// Binary Search в деле )
function getIndexByTS(arr, num) {
	let left = 0;
	let right = arr.length;

	let i = 0;

	if	(num > arr[left].ts) return -1;

	while(true) {
		
		if ((i++) > 1000) break;

		let center = parseInt((right + left) / 2);
		
		if(arr[center].ts == num)
			return center;

		if(arr[center].ts < num)
			right = center;

		if(arr[center].ts > num)
			left = center;
		
		if(left == right)
			return -2;

		// console.log(left, center, right);
	}
}

function taskDone(_this) {
	let mainTask = getClosest(_this, "js-task-item");
	let mainTaskId = mainTask.getAttribute("data-id");
	let subTask = getClosest(_this, "js-sub-task-item");
	let subTaskId = subTask.getAttribute("data-id");

	let dateTS = getSelectedDateTS(mainTask);
	let dateIndex = getIndexByTS(all_tasks[mainTaskId].process, dateTS);

	console.log(mainTaskId, subTaskId);

	let state = all_tasks[mainTaskId].process[dateIndex].state[subTaskId] = !all_tasks[mainTaskId].process[dateIndex].state[subTaskId];

	if (state) {
		classEdit(subTask, 'done', 'add');
	} else {
		classEdit(subTask, 'done', 'remove');
	}

	return tasksExport();
}

function addComment(_this) {
	let mainTask = getClosest(_this, "js-task-item");
	let mainTaskId = mainTask.getAttribute("data-id");
	let subTask = getClosest(_this, "js-sub-task-item");
	let subTaskId = subTask.getAttribute("data-id");

	let comment_box = subTask.querySelector(".js-comment");
	let comment_field = subTask.querySelector(".js-comment-field");

	let comment = comment_field.value;

	let dateTS = getSelectedDateTS(mainTask);
	let dateIndex = getIndexByTS(all_tasks[mainTaskId].process, dateTS);

	// let state = all_tasks[mainTaskId].process[dateIndex].state[subTaskId] = !all_tasks[mainTaskId].process[dateIndex].state[subTaskId];
	comment_box.innerHTML = nl2br(comment);

	all_tasks[mainTaskId].process[dateIndex].comments[subTaskId] = comment;

	return tasksExport();
}

function getClosest(el, className) {
	let parent = el.parentElement;

	if (parent.nodeName == 'BODY') return;
	if (hasClass(parent, className)) return parent;

	return getClosest(parent, className);
}

function getSelectedDateTS(el) {
	el = el || '';

	if (!el || el.length <= 0) return;
	return el.querySelector(".js-select-days").value;
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