const file_input = document.querySelector("input[type=file]");
const list_container = document.querySelector(".js-list-container");
const icon_preview_template = getCommentTemplate(document.querySelector(".js-prev-template"));

const svg_template = getCommentTemplate(document.querySelector(".js-svg-template"));
const svg_item_template = getCommentTemplate(document.querySelector(".js-svg-icon-item-template"));
const sprite_name = 'sprite.svg';
const sprite_pref = 'i_';


document.querySelector(".js-sprite-name").innerHTML = sprite_name;


file_input.addEventListener("change", function(e){
	let hash_type = document.querySelector("input[name=hash_type]:checked").value;
	let code_type = document.querySelector("input[name=code_type]:checked").value;
	let images = file_input.files;
	let images_len = images.length;

	if (!images_len)
		return false;

	list_container.innerHTML = '';
	svg_template__html = '';
	svg_item_template__html = '';

	for (let i = 0; i < images_len; i++){
		let img = images[i];

		let name = img['name'];
			name = name.substr(0, name.lastIndexOf('.'));

		name = (hash_type == 'name') ? name : sprite_pref + i;

		let size = bytesToSize(img['size']);
		let type = img['type'];
			type = (type.slice(type.indexOf('/') + 1)).toUpperCase();
		let width = 0;
		let height = 0;

		let reader = new FileReader();

		reader.onload = function(e){

			let image = new Image();
			image.src = e.target.result;

			image.onload = function() {
				let prev_tmp = icon_preview_template;
				let svg_item_tmp = (code_type == 'minified')? codeMinified(svg_item_template) : svg_item_template;
				width = this.width;
				height = this.height;

				prev_tmp = replaceTemplate(prev_tmp, {
					'name' : sprite_name + '#' + name,
					'type' : type,
					'size' : size,
					'width' : width,
					'height' : height,
					'img_code' : e.target.result,
				});

				svg_item_tmp = replaceTemplate(svg_item_tmp, {
					'name' : name,
					'width' : width,
					'height' : height,
					'img_code' : e.target.result,
				});
				
				list_container.innerHTML += prev_tmp;
				svg_item_template__html += svg_item_tmp;

				if (images_len - 1 == i) {

					let svg_code = replaceTemplate(svg_template, {
						'icons' : svg_item_template__html,
					}).trim();

					document.querySelector(".js-sprite-to").value = (code_type == 'minified')? codeMinified(svg_code) : svg_code;
					removeClass(document.querySelector(".js-sprite-box"), 'hidden');
				}
			};

		};
		reader.readAsDataURL(img);
	}

});

function codeMinified(code) {
	return replaceTemplate(code, {
		'\n' : '',
		'\t' : '',
	}, '', '');
}

function download() {
	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/svg;charset=utf-8,' + encodeURIComponent(document.querySelector(".js-sprite-to").value));
	element.setAttribute('download', sprite_name);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
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

function bytesToSize(bytes) {
	let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

function getCommentTemplate(el) {
	el = el.firstChild;
	while(el){
		if (el.nodeName == '#comment')
			return el.nodeValue;
		el = el.nextSibling;
	}
	return null;
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
