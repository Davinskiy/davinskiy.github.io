const view = document.getElementById('view');
const html = document.getElementById("html");
const css = document.getElementById("css");
const js = document.getElementById("js");
const doc_template = getCommentTemplate(document.querySelector(".js-frame-template")).trim();
const main_title = document.getElementsByTagName('title')[0];
const doc_title = document.querySelector('.js-document-title');
const anchor = "#document_json=";

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

		let code_html = editors['html'].getValue();
		let code_css = editors['css'].getValue();
		let code_js = editors['js'].getValue();

		let head_inner = '';
		let body_inner = '';
		
		let title_inner = '';

		let html_attr = '';
		let head_attr = '';
		let body_attr = '';
		

		if (code_html.indexOf('<html') != -1 ) {
			
			head_inner = getStrBettween(code_html, '<head|>', '</head>', true);
			body_inner = getStrBettween(code_html, '<body|>', '</body>', true);
			title_inner = getStrBettween(code_html, '<title|>', '</title>', true);

			html_attr = getStrBettween(code_html, '<html', '>');
			head_attr = getStrBettween(code_html, '<head', '>');
			body_attr = getStrBettween(code_html, '<body', '>');
			
		}

		let title = doc_title.innerText || title_inner;
		setTitle(title);

		let _doc = replaceTemplate(doc_template, {
			'title' : title,
			'html' : ((body_inner)?'':code_html),
			'css' : code_css,
			'js' : code_js,
			
			'html_attr' : html_attr,
			'head_attr' : head_attr,
			'body_attr' : body_attr,

			'head_inner' : head_inner,
			'body_inner' : body_inner,
		});

		view.src = 'javascript:document.write("")';
		setTimeout(function() {
			view.contentDocument.write(_doc);
			copyAttributes(view.contentDocument.documentElement, html_attr);
			copyAttributes(view.contentDocument.head, head_attr);
			copyAttributes(view.contentDocument.body, body_attr);

			// сохраняем документ
			saveDocument();

			is_refreshing = false;
			code_html = code_css = code_js = html_attr = head_attr = body_attr = head_inner = body_inner = '';
		}, 100);


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

function fillFrames(className){
	document.body.classList.remove('frame-min', 'frame-auto', 'frame-full');
	document.body.classList.add(className);
}

function hasClass(obj, className){
	if (obj.classList.value.indexOf(className) !== -1)
		return true;
	return false;
}


let editors = {};
for (let obj of document.querySelectorAll('.js-field-box')) {
	editors[obj.id] = CodeMirror.fromTextArea(obj, {
		mode: obj.getAttribute('data-lang-type'),
		lineNumbers: true,
		theme : 'night',
		lineWrapping : true,
		tabSize : 4,
		indentWithTabs : true,
	});
	editors[obj.id].on('change', editor => {
		showResult();
	});
	emmetCodeMirror(editors[obj.id]);
}

/** копирование аттрибутов из строки в объект **/
function copyAttributes(el, attr_str) {
	if (!attr_str.trim()) return;

	let div_str = '<div ' + attr_str + '></div>';
	let div = document.createElement('div');
		div.innerHTML = div_str;
		div = div.firstChild;

	for (let this_attr of div.attributes) {
		el.setAttribute(this_attr.name, this_attr.value);
	}
}

function getStrBettween(str, s1, s2, is_needed_find) {
	let opens_idx = str.indexOf(s1) + s1.length;

	if (is_needed_find) {
		let _s1 = s1.split('|');
		let s1_1 = _s1[0];
		let s1_2 = _s1[1];

		opens_idx = str.indexOf(s1_2, str.indexOf(s1_1)) + s1_2.length;

	}

	let close_idx = str.indexOf(s2, str.indexOf(s1));
	return str.substring(opens_idx, close_idx);
}

function setTitle(title) {
	if (title.trim())
		main_title.innerText = title + ' – ' + main_title.getAttribute('data-origin-title');
	else
		main_title.innerText = main_title.getAttribute('data-origin-title');

	saveDocument();
}

// сохраняет документ
function saveDocument() {
	let doc_obj = {
		"title" : doc_title.innerText,
		"html" : editors.html.getValue(),
		"css" : editors.css.getValue(),
		"js" : editors.js.getValue(),
	}
	let doc_json = JSON.stringify(doc_obj);
	localStorage.setItem('document_json', doc_json);
	setLocation(anchor + encodeURI(doc_json));
}

function loadDocument(doc_json) {
	let doc_obj = JSON.parse(doc_json);

	doc_title.innerText = doc_obj.title;
	editors.html.setValue(doc_obj.html);
	editors.css.setValue(doc_obj.css);
	editors.js.setValue(doc_obj.js);
}

window.onload = function(){
	if (location.hash) {
		loadDocument(decodeURI(location.hash.substr(anchor.length)));
	} else if (localStorage.getItem('document_json')) {
		loadDocument(localStorage.getItem('document_json'));
	}
};

function setLocation(curLoc){
	try {
		history.pushState(null, null, curLoc);
		return;
	} catch(e) {}
	location.hash = curLoc;
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