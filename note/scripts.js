let all_notes = [];
let notes_container = document.querySelector(".js-notes-container");
let notes_quantity = document.querySelector(".js-note-quantity");
let per_page_notes = 3;

if (localStorage.getItem("all_notes")) {
	all_notes = JSON.parse(localStorage.getItem("all_notes"));
	showNotes();
}
	
function showToggle(selector){
	let el = document.querySelector(selector);

	if (hasClass(el, 'hidden')) {
		classEdit(el, 'hidden', 'remove');
	} else {
		classEdit(el, 'hidden', 'add');
	}

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

function addNote(){
	let title = document.getElementById("note_title");
	let content = document.getElementById("note_content");

	let title_val = title.value || 'Untitled note';
	let content_val = content.value;
	let time_stamp = new Date().getTime();

	all_notes.unshift({
		'title' : title_val,
		'content' : content_val,
		'time_stamp' : time_stamp,
	});

	title.value  = '';
	content.value  = '';

	saveNotes();
}

function saveNotes(){
	localStorage.setItem('all_notes', JSON.stringify(all_notes));

	setTimeout(showNotes, 500);
}

function removeNote(id){
	all_notes.splice(id, 1);

	saveNotes();
	
	showNotes();
}

function showNotes(){
	notes_quantity.innerHTML = "You have <span class='notes__list-quantity--bold'>"+ all_notes.length +"</span> note(s).";
	let template = document.querySelector(".js-note-template").innerHTML;
	let tmp = '';

	for (let i = 0, len = all_notes.length; i < len; i++){
		let t = new Date(all_notes[i].time_stamp);
		let m = (t.getMonth() + 1);
		m = (m < 10)? '0' + m: m;
		t = t.getDate() + '.' + m + '.' + t.getFullYear() + ' ' + t.getHours() + ':' + t.getMinutes();// 27.12.1994 12:03

		tmp += replaceTemplate(template, {
			'title' : all_notes[i].title,
			'id' : i,
			'content' : all_notes[i].content,
			'time' : t,
		});
	}
	notes_container.innerHTML = tmp;
	return true;
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