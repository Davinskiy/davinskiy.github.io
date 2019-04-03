let all_tasks = [];
let tasks_container = document.querySelector(".js-task-container");
let empty_template = tasks_container.innerHTML;
let task_field = document.querySelector(".js-task-field");
let template = document.querySelector(".js-note-template").innerHTML;

if (localStorage.getItem("all_tasks")) {
	all_tasks = JSON.parse(localStorage.getItem("all_tasks"));
	showTasks(true);
}

function classEdit(element, className, actionType) {

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


// saving
function saveTask(){
	let task = task_field.value;
	all_tasks.unshift({'task' : task, 'done' : false});
	task_field.value = '';

	updateTasks();

	showTasks();
}


// updating
function updateTasks(){
	localStorage.setItem("all_tasks", JSON.stringify(all_tasks));
}

// finishing
function doneTask(_this, id){
	console.log('doning');
	id = id * 1;
	task_item = getTaskContainer(id);

	all_tasks[id].done = !all_tasks[id].done;

	if (hasClass(task_item, 'done')) {
		classEdit(task_item, 'done', 'remove');
	} else {
		classEdit(task_item, 'done', 'add');
	}

	updateTasks();

	return true;
}

// showing
function showTasks(auto){
	let html = '';
	let len = all_tasks.length;

	if (auto && !len) return false;

	for (let i = 0; i < len; i++){
		let task = all_tasks[i];
		let tmp = template;
		html += replaceTemplate(tmp, {
			'id' : i,
			'title' : task['task'],
			'done' : (task['done'])?'done':'',
		});
	}

	if (!len) {
		tasks_container.innerHTML = empty_template;
		classEdit(tasks_container, 'no-task', 'add');
		return false;
	}

	tasks_container.innerHTML = html;
	classEdit(tasks_container, 'no-task', 'remove');
}

// removing
function removeTask(_this, id){
	id = id * 1;
	task_item = getTaskContainer(id);
	all_tasks.splice(id, 1);

	updateTasks();
	showTasks();
}

// getting task item container by id
function getTaskContainer(id){
	return document.querySelector(".js-task-item[data-id='"+ id +"']");
}