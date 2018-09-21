const file_input = document.querySelector("input[type=file]");
const img_element = document.querySelector(".js-img");
const list_container = document.querySelector(".js-list-container");
const template = document.querySelector(".js-template").innerHTML;



file_input.addEventListener("change", function(e){
	let images = file_input.files;
	let images_len = images.length;

	if (!images_len)
		return false;

	list_container.innerHTML = '';

	for (let i = 0; i < images_len; i++){
		let img = images[i];

		let name = nameShortiner(img['name'], 50);
		let size = bytesToSize(img['size']);
		let type = img['type'];
		type = (type.slice(type.indexOf('/') + 1)).toUpperCase();

		let reader = new FileReader();

		reader.onload = function(e){
			let tmp = template;

			tmp = replaceTemplate(tmp, {
				'name' : name,
				'id' : i,
				'size' : size,
				'type' : type,
				'img_code' : e.target.result,
			});

			list_container.innerHTML += tmp;
			delete tmp;
		};
		reader.readAsDataURL(img);

		// это ничего не исправит, но для формальности, можно так делать )
		delete name;
		delete size;
		delete type;
		delete reader;
	}

});


function nameShortiner(name, max_len){
	if (!name)
		return false;

	max_len = max_len || 255;
	name_len = name.length;

	type = name.substring(name.lastIndexOf('.') + 1);
	name = name.substring(0, name.lastIndexOf('.'));

	return name.substring(0, max_len) + ((name_len > max_len)?'...':'.') + type;
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

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

function showCode(_this, img_selector, field_selector){

	let img_item = document.querySelector(img_selector);
	let field_item = document.querySelector(field_selector);

	let all_fields = document.querySelectorAll(".js-field-item[value^='data']");

	// очищаем все элементы input, где есть вставка кода
	for (let field of all_fields){
		field.setAttribute("value", '');
	}

	setTimeout(function(){
		field_item.setAttribute("value", img_item.getAttribute("src"));
	}, 50);


	// омг, зачем я это делаю... не смотрите ниже :/
	delete _this;
	delete img_selector;
	delete field_selector;
	delete img_item;
	delete field_item;
	delete all_fields;

	return true;
}