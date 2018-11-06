const view = document.getElementById('view');
const html = document.getElementById("html");
const css = document.getElementById("css");
const js = document.getElementById("js");
const doc_template = getCommentTemplate(document.querySelector(".js-frame-template"));

let typing_interval = 500; // ms

let is_refreshing = false;
let is_typing = false;
function showResult(){
	
	if (is_refreshing) {
		is_typing = true;
		return null;
	}
	is_refreshing = true;

	setTimeout(function(){
	
		if (is_typing) {
			
			is_typing = false;
			is_refreshing = false;
			
			showResult();

			return null;
		}

		let _html = replaceTemplate(doc_template, {
			'title' : 'Без имени',
			'html' : editors['html'].getValue(),
			'css' : editors['css'].getValue(),
			'js' : editors['js'].getValue(),
		});

		view.src = 'javascript:""';
		view.contentDocument.write(_html);

		is_refreshing = false;
	}, typing_interval);
}

function fillTheBoxes(el){
	let filled_element = document.querySelector('.js-box-item.fill');
	if (filled_element == el) {
		filled_element.classList.toggle('fill');
	} else {
		if (filled_element) {
			filled_element.classList.remove('fill');
		}
		el.classList.add('fill');
	}

	if (document.querySelector('.js-box-item.fill')) {
		document.body.classList.add('box-item-is-filling');
	} else {
		document.body.classList.remove('box-item-is-filling');
	}
}

function fillFrames(type){
	
	document.body.classList.remove('frame-min', 'frame-auto', 'frame-full');

	switch(type){
		case 'min':
			document.body.classList.add('frame-min');
			break;
		case 'full':
			document.body.classList.add('frame-full');
			break;
		case 'auto':
		case 'default':
			document.body.classList.add('frame-auto');
			break;
		default:
			document.body.classList.add('frame-auto');
	}
}

function hasClass(obj, className){
	if (obj.classList.value.indexOf(className) !== -1)
		return true;
	return false;
}


let editors = {};
for (let obj of document.querySelectorAll('.js-field-box')) {
	console.log(obj.getAttribute('data-lang-type'));
	editors[obj.id] = CodeMirror.fromTextArea(obj, {
		mode: obj.getAttribute('data-lang-type'),
		lineNumbers: true,
		theme : 'night',
		lineWrapping : true,
	});
	editors[obj.id].on('change', editor => {
		showResult();
	});
}

/**
* функция - шаблонизатор. 
*/
function replaceTemplate(replaceText, replaceObj, before = '%', after = '%'){
	for(let text in replaceObj){
		replaceText = replaceText.split(before + text + after).join(replaceObj[text]);;
	}
	return replaceText;
}

function getCommentTemplate(el) {
	el = el.firstChild;
	while(el){
		if (el.nodeName == '#comment')
			return el.nodeValue;
		el = el.nextSibling;
	}
	return null;
}