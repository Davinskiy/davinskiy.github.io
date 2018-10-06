const links_container = document.querySelector('.js-links-container');
const page_template = document.querySelector('.js-page-template').innerHTML;


let all_pages = [];

if (localStorage.getItem('start_pages_list')) {
	all_pages = JSON.parse(localStorage.getItem('start_pages_list'));
}

function pagesUpdate(){
	localStorage.setItem( 'start_pages_list', JSON.stringify(all_pages) );
}

function showModal(modalClass, _this){
	removeClass(document.querySelectorAll('.modals, ' + modalClass), 'hidden');

	if (_this) {
		let page_id = getClosest(_this, 'js-page-item').getAttribute("data-id");
		
		document.querySelector(modalClass + ' .js-field[name=url]').value = all_pages[page_id].url;
		document.querySelector(modalClass + ' .js-field[name=title]').value = all_pages[page_id].title;
		document.querySelector(modalClass + ' .js-field[name=id]').value = page_id;
		
		console.log(page_id);
	}
}

function closeModals(){
	addClass(document.querySelectorAll('.modals, .modals__item'), 'hidden');
	clearFields();
}

function addOrEditPage(type) {
	let page_id, url, title;

	if (type == 'edit') {
		page_id = document.querySelector(".js-edit-page-modal .js-field[name=id]").value;
		url = document.querySelector('.js-edit-page-modal .js-field[name=url]').value;
		title = document.querySelector('.js-edit-page-modal .js-field[name=title]').value;
	} else {
		url = document.querySelector('.js-add-page-modal .js-field[name=url]').value;
		title = document.querySelector('.js-add-page-modal .js-field[name=title]').value;
	}

	if (!validateUrl(url))
		return false;
	

	if (type == 'edit') {
		all_pages[page_id]['url'] = url;
		all_pages[page_id]['title'] = title;
	} else {
		all_pages.push({
			'url' : url,
			'title' : title,
			'visits' : 0,
		});
	}

	showAllPages();
	clearFields();

	pagesUpdate();
	closeModals();
}

function validateUrl(value) {
	return /\w+([\.-]?\w+)*(\.\w{2,3})+/.test(value);
}

function showAllPages(){
	let html = '';

	removeAllPagesFromContainer();

	for (let page in all_pages) {
		_page = all_pages[page];

		html += replaceTemplate(page_template, {
			'url' : _page.url,
			'id' : page,
			'title' : (_page.title)? _page.title : 'Unknown Page',
			'order' : _page.visits * -1,
		});
	}
	links_container.innerHTML += html;
}

window.onload = function(){
	showAllPages();
};

function pageEdit(id){

}

function removeAllPagesFromContainer(){
	let arr = links_container.querySelectorAll(".js-page-item");

	for (let page of arr) {
		if (page) {
			page.remove();
		}
		// console.log(page);
	}
}

function getClosest(el, className) {
	let parent = el.parentElement;

	if (parent.nodeName == 'BODY') return;
	if (hasClass(parent, className)) return parent;

	return getClosest(parent, className);
}

function removePage(){
	let page_id = document.querySelector(".js-edit-page-modal .js-field[name=id]").value;
	
	// remove from array
	all_pages.splice(page_id, 1);

	// console.log(page_id);
	// return false;

	// saving changes
	pagesUpdate();
	
	// showing changes
	showAllPages();

	// closing modal
	closeModals();
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

function clearFields(){
	let all_fields = document.querySelectorAll('.js-field');
	for (let field of all_fields) {
		field.value = '';
	}
}

function getTitleFromURL(field, url){

	if (!field && typeof field != 'object')
		return false;

	let req = getXmlHttpRequest();
	req.open('GET', url, true);
	req.overrideMimeType('text/html');
	req.send();
	
	req.onreadystatechange = function(){
		if (req.readyState != 4 ) return false;
		let html = req.responseText;
		let s1 = '<title>';
		let s2 = '</title>';
		let start_index = html.indexOf(s1) + s1.length;
		let end_index = html.indexOf(s2);

		field.value = html.substring(start_index, end_index);
	};
}

function fillTitle(_this){
	let url = _this.value;
	if (!validateUrl(url)) return false;
	getTitleFromURL(getClosest(_this, 'js-form-box').querySelector('input[name=title]'), url);
	// console.log(_this.value);
}

function pageVisited(id){

	setTimeout(function(){
		all_pages[id].visits += 1;
		pagesUpdate();
		showAllPages();
	}, 100);
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

function addClass(elements, className){
	return editClass(elements, className, 'add');
}

function removeClass(elements, className){
	return editClass(elements, className, 'remove');
}

function hasClass(element, className){
	if (element.getAttribute('class').indexOf(className) === -1)
		return false;
	return true;
}

function toggleClass(elements, className){
	return editClass(elements, className, 'toggle');
}

function editClass(elements, className, type){
	type = type || 'toggle';
	
	if	(!elements.length) {
		elements = [elements];
	}
	
	for ( let i = 0, len = elements.length; i < len; i++ ) {
		let element = elements[i];
		let classList = element.getAttribute('class').split(' ');
		
		
		let change = true;
		
		switch (type) {
			case 'add':
				if ( classList.indexOf(className) === -1 )
					classList.push(className);
				break;
			case 'remove':
				if ( classList.indexOf(className) !== -1 )
					classList.splice(classList.indexOf(className), 1);
				break;
			case 'toggle':
				if ( classList.indexOf(className) === -1 )
					classList.push(className);
				else
					classList.splice(classList.indexOf(className), 1);
				break;
			default:
				change = false;
		}
		
		if (change)
			element.setAttribute('class', classList.join(' '));
	}
	
	return elements;
}


