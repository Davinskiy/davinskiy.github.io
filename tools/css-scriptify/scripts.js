let app = new Vue({
	el : '#app',
	data : {
		file : 'styles.css',
		file_extention : '.js',
		path : 'css/',
		minified_weight : 0,
		input : '',
		output : '',
		minifies : {},
		properties : [],
		chars : '',
		chars_whitelist : '',
		js_template : "(function(){let c={css_json};let o={obj_json};for(p in o){c=c.split(p).join(o[p])}document.head.appendChild(document.createElement('style')).innerHTML=c})();",
		replace_object : {},
		replace_index : 0,
	},
	watch : {
		input : function(){
			this.updateCodes;
		},
	},
	created : function(){
		this.updateCodes;
	},
	updated : function(){},
	methods : {
		getSize : function(bytes){
			let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes == 0) return '0 Byte';
			let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + sizes[i];
		},

		start : function(css){
			if (!css) return '';


			this.replace_object = {};
			this.replace_index = 0;
			this.chars_whitelist = '';

			// adding chars to whitelist
			for (let i = 0, len = this.chars.length; i < len; i++) {
				if (css.indexOf(this.chars[i]) === -1) {
					this.chars_whitelist += this.chars[i]
				}
			}

			// minifying css
			css = this.getMinifiedCSS(css);

			this.minified_weight = css.length;

			// replacing with ready properties
			css = this.replaceAllProperties(css);

			// units
			css = this.replace(css, '-?(.?[0-9]){2,}[%|cm|em|ex|in|mm|pc|pt|px|vh|vw|vmin]+');

			// RGB colors
			css = this.replace(css, '[#a-f0-9]{3,6}');

			// any words
			css = this.replace(css, '[a-z]*');

			// changing pathes
			css = this.replaceTemplate(css, {
				'../' : ''
			});

			css = this.replaceTemplate(this.js_template, {
				"css_json" : JSON.stringify(css),
				"obj_json" : JSON.stringify(this.objectReverse(this.replace_object)),
			}, '{', '}');

			return css;
		},

		removeComments : function(code){
			// regexp took from: https://www.w3.org/TR/CSS2/grammar.html#scanner
			return code.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '');
		},

		getMinusedPercent : function(before, after){
			if (!before || !after)
				return 0;
			let percent = 100 - ((100 / before) * after);
			return percent.toFixed(2);
		},
		replaceTemplate : function(replaceText, replaceObj, before = '', after = ''){
			for(let text in replaceObj){
				replaceText = replaceText.split(before + text + after).join(replaceObj[text]);;
			}
			return replaceText;
		},
		// removeEmptyStyles : function(css){
		// 	return css.replace(/(?<=})([^{]*{\s*})/g, '');
		// },
		replaceAllProperties : function(css){
			
			for (let i = 0, len = this.properties.length; i < len; i++) {
				let origin = this.properties[i];
				let _replace = this.getSymbol(this.replace_index);

				if (this.isGoodReplace(css, origin, _replace)) {
					css = this.replaceTemplate(css, {
						[origin] : _replace
					});

					this.replace_index++;
					this.replace_object[_replace] = origin;
				}
			}

			return css;
		},

		replace : function(code, re, min_occur){

			let all_occurs = code.match(new RegExp(re, "gi"));

			if (all_occurs) {
				all_occurs = all_occurs.sort(function(a,b){
					return b.length - a.length;
				});
			} else {
				console.error('bad regular expression or just no matches -_-: ', re);
				return code;
			}

			let occurs_counter = {};

			for (let i = 0, len = all_occurs.length; i < len; i++) {
				if (!occurs_counter[all_occurs[i]])
					occurs_counter[all_occurs[i]] = 1;
				else
					occurs_counter[all_occurs[i]]++;
			}

			for(let index in all_occurs){
				let origin = all_occurs[index];
				let _replace = this.getSymbol(this.replace_index);
				if (this.isGoodReplace(code, origin, _replace)) {

					code = this.replaceTemplate(code, {
						[origin] : _replace
					});

					this.replace_object[_replace] = origin;
					this.replace_index++;
				}
				
			}

			return code;
		},

		isGoodReplace : function(code, origin_text, replace_text){

			let json = JSON.stringify({[replace_text] : origin_text});
			let json_len = json.length;
			let occurs_count = code.split(origin_text).length;

			let old_len = origin_text.length * occurs_count;
			let new_len = (replace_text.length * occurs_count) + (json_len - 2 + 1); // не смейся, это просто для наглядности ジ

			return new_len < old_len;
		},

		getSymbol : function(num){
			num = Math.abs(num);

			let chars = this.chars_whitelist;
			let chars_len = this.chars_whitelist.length;

			let symbols = '';
			while(true){
				let index = parseInt(num % chars_len);
				symbols += this.chars_whitelist[index];

				if (num < chars_len)
					break;
				else
					num /= chars_len;
			}

			return (symbols).split('').reverse().join('');
		},

		objectReverse : function(object){
			let object_copy = Object.assign({}, object);
			let keys = Object.keys(object_copy).reverse();
			let new_object = {};

			for (let i = 0, len = keys.length; i < len; i++) {
				let key = keys[i];
				new_object[key] = object_copy[key];
			}
			return new_object;
		},
		getMinifiedCSS : function(css){

			let lines = this.removeComments(css).split('\n');
			let lines_tmp = [];

			for (let i = 0, len = lines.length; i < len; i++) {
				let line = lines[i].trim();
				if (line)
					lines_tmp.push(line);
			}

			css = lines_tmp.join(' ');
			css = this.replaceTemplate(css, this.minifies);
			// css = this.removeEmptyStyles(css);

			return css;
		},
		downloadFile : function() {
			let a = document.createElement('a');
			a.setAttribute('href', 'data:text/js;charset=utf-8,' + encodeURIComponent(this.output));
			a.setAttribute('download', this.file + this.file_extention);

			a.style.display = 'none';
			document.body.appendChild(a);

			a.click();

			document.body.removeChild(a);
		},
	},
	computed : {
		updateCodes : function(){
			this.output = this.start(this.input);
		},
		getInputSize : function(){
			return this.input.length;
		},
		getOutputSize : function(){
			return this.output.length;
		},
	}
});

app.$data.chars = '⅟½⅓¼⅕⅙⅐⅛⅑⅒⅔¾⅖⅗⅘⅚⅜⅝⅞∫∬∭∮∯∰∱∲∳∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑−∓∔∕∖∗∘∙√∛∜∝∟∠∡∢∣∤∥∦∧∨∩∪∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅≆≇≈≉≊≋≌≍≎≏≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≠≡≢≣≤≥≦≧≨≩≪≫≬≭≮≯≰≱≲≳≴≵≶≷≸≹≺≻≼≽≾≿⊀⊁⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⊏⊐⊑⊒⊓⊔⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿✕✖✚‰ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅺⅻ⓵⓶⓷⓸⓹⓺⓻⓼⓽⓾➊➋➌➍➎➏➐➑➒➓⓪➀➁➂➃➄➅➆➇➈➉⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳❶❷❸❹❺❻❼❽❾❿⓫⓬⓭⓮⓯⓰⓱⓲⓳⓴ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ$€¥£ƒ₣¢¤฿₠₡₢₤∅❂○◎●◯◕◔◐◑◒◓⊗⊙◍◖◗◉⊚ʘ⊕⊖⊘⊚⊛⊜⊝↪↩←↑→↓↔↕↖↗↘↙↚↛↜↝↞↟↠↡↢↣↤↦↥↧↨↫↬↭↮↯↰↱↲↴↳↵↶↷↸↹↺↻⟲⟳↼↽↾↿⇀⇁⇂⇃⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇏⇎⇑⇓⇐⇒⇔⇕⇖⇗⇘⇙⇳⇚⇛⇜⇝⇞⇟⇠⇡⇢⇣⇤⇥⇦⇨⇩⇪⇧⇫⇬⇭⇮⇯⇰⇱⇲⇴⇵⇶⇷⇸⇹⇺⇻⇼⇽⇾⇿⟰⟱⟴⟵⟶⟷⟸⟹⟽⟾⟺⟻⟼⟿⤀⤁⤅⤂⤃⤄⤆⤇⤈⤉⤊⤋⤌⤍⤎⤏⤐⤑⤒⤓⤔⤕⤖⤗⤘⤙⤚⤛⤜⤝⤞⤟⤠⤡⤢⤣⤤⤥⤦⤧⤨⤩⤪⤭⤮⤯⤰⤱⤲⤳⤻⤸⤾⤿⤺⤼⤽⤴⤵⤶⤷⤹⥀⥁⥂⥃⥄⥅⥆⥇⥈⥉⥒⥓⥔⥕⥖⥗⥘⥙⥚⥛⥜⥝⥞⥟⥠⥡⥢⥣⥤⥥⥦⥧⥨⥩⥪⥫⥬⥭⥮⥯⥰⥱⥲⥳⥴⥵⥶⥷⥸⥹⥺⥻➔➘➙➚➛➜➝➞➟➠➡➢➣➤➥➦➧➨➩➪➫➬➭➮➯➱➲➳➴➵➶➷➸➹➺➻➼➽➾⬀⬁⬂⬃⬄⬅⬆⬇⬈⬉⬊⬋⬌⬍⏎▲▼◀▶⬎⬏⬐⬑☇☈⍃⍄⍇⍈⍐⍗⍌⍓⍍⍔⍏⍖⍅⍆㋛ソッヅツゾシジｯﾂｼﾝ〴ت☺☻☹♈♉♊♋♌♍♎♏♐♑♒♓✽✾✿✥❀❁❃❄❅❆❇❈❉❊✢✣✤❋٭✱✲✳✴✶✷✸✹✺✻✼⁂✪★☆✫✬✭✮✯✰⋆✧✩✵✦♔♕♖♗♘♙♚♛♜♝♞♟☚☛☜☝☞☟✌✉✍✎✏✐✑✒♡♢♣♤♥♦♧♪♫♩♬♭♮♯°ø✁✂✃✄✆☎☏☑✓✔™©®♡ღ❥❤♥❣❢❦❧☩☨☦✙✚✛✜✝✞✠†┿☒☓✕✖✗✘✇☣▲◣◢◥▼△▽⊿◤◥△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◬◭◮❏❐❑❒▀▄□■◙▢▣◘◧◨◩◪◫▤▥▦▧▨▩▱▰▪▫▬▭▮▯◊◈☰☲☱☴☵☶☳☷░▒▓▌█▉▇▆▅▄▃▂Ꭿ凡Ꮨ∀₳ǺǻαάΆẫẮắẰằẳẴẵÄªäÅÀÁÂåãâàáÃᗩᵰℬᏰβ฿ßЂᗷᗸᗹᗽᗾᗿƁƀხ方␢Ꮄ☾ℭℂÇ¢çČċĊĉςĈćĆčḈḉ⊂Ꮸ₡¢ᗫƊĎďĐđð∂₫ȡℯໂ६£Ē℮ēĖėĘěĚęΈêξÊÈ€É∑ẾỀỂỄéèعЄєέεℱ₣ƒ∮ḞḟჶᶂφᏩᎶℊǤǥĜĝĞğĠġĢģפᶃ₲ℍℋℎℌℏዙᏥĤĦħΉ♅廾ЋђḨҺḩ♄ℐℑίιÏΊÎìÌíÍîϊΐĨĩĪīĬĭİįĮᎥჟĴĵᶖɉ₭ᏦЌkќķĶҜҝﻸᶄℒℓĿŀ£ĹĺĻļλ₤ŁłľĽḼḽȴᏝ￡ᏁℳʍᶆḾḿ♍ᗰᙢ爪♏₥ℕηñחÑήŋŊŃńŅņŇňŉȵℵ₦ℴტ٥ΌóόσǿǾΘòÓÒÔôÖöÕõờớọỌợỢøØΌỞỜỚỔổỢŌōℙ℘þÞρᎮᎵ尸Ҏҏᶈ₱☧ᖘקァℚqQᶐǬǭჹℝℜℛ℟ჩᖇřŘŗŖŕŔᶉᏒ尺ᏕṦṧȿى§ŚśšŠşŞŝŜ₰∫$ֆ₸†TtτΐŢţŤťŧŦィ干ṪṫナᎿᏆテ₮∪ᙀŨ⋒ỦỪỬỮỰύϋÙúÚΰùÛûÜửữựЏüừŨũŪūŬŭųŲűŰůŮ✔✓∨√ᏉṼṽᶌ℣ʋ₩ẃẂẁẀẅώωŵŴᏔฬᗯᙡẄѡಎಭᏊᏇผฝพฟχ×✗✘᙭ჯẌẍᶍ⏆ɣᎩᎽẎẏϒɤ￥りℤℨჳ乙ẐẑɀᏃ';
app.$data.minifies = {
			'  ' : ' ',

			' : ' : ':',
			': ' : ':',
			' :' : ':',
			
			' ; ' : ';',
			'; ' : ';',
			' ;' : ';',
			
			' { ' : '{',
			' {' : '{',
			'{ ' : '{',

			' } ' : '}',
			' }' : '}',
			'} ' : '}',

			// ';}' : '}',
			'}' : ';}',
			';;' : ';',
			'}}' : '};}',

			' , ' : ',',
			', ' : ',',
			' ,' : ',',

			'font-weight:bold' : 'font-weight:700',
			'font-weight:normal' : 'font-weight:400',
			
			' 0px' : ' 0',
			',0px' : ',0',
			':0px' : ':0',
			' 0.' : ' .',
			':0.' : ':.',
			',0.' : ',.',

			' ~ ' : '~',
			'~ ' : '~',
			' ~' : '~',

			'#000000' : '#000',
			'#ff0000' : '#f00',
			'#00ff00' : '#0f0',
			'#0000ff' : '#00f',
			'#00ffff' : '#0ff',
			'#ffffff' : '#fff',
			'#ffff00' : '#ff0',
			'#ff00ff' : '#f0f',

			' and (' : ' and(',
		};

app.$data.properties = [
			"z-index:auto;",
			"z-index:1;",
			"z-index:2;",
			"z-index:9;",
			"z-index:99;",
			"z-index:999;",
			"z-index:9999;",
			"z-index:99999;",
			"z-index:999999;",
			"z-index:9999999;",
			"z-index:99999999;",
			"z-index:999999999;",
			"z-index:9999999999;",
			"z-index:99999999999;",
			"z-index:999999999999;",
			"z-index:9999999999999;",
			"z-index:99999999999999;",
			"z-index:999999999999999;",
			"z-index:",

			"float:none;",
			"float:left;",
			"float:right;",
			"float:",
			
			"clear:none;",
			"clear:left;",
			"clear:right;",
			"clear:both;",
			"clear:",

			"display:none;",
			"display:block;",
			"display:flex;",
			"display:inline-flex;",
			"display:inline;",
			"display:inline-block;",
			"display:list-item;",
			"display:run-in;",
			"display:compact;",
			"display:table;",
			"display:inline-table;",
			"display:table-caption;",
			"display:table-column;",
			"display:table-column-group;",
			"display:table-header-group;",
			"display:table-footer-group;",
			"display:table-row;",
			"display:table-row-group;",
			"display:table-cell;",
			"display:ruby;",
			"display:ruby-base;",
			"display:ruby-base-group;",
			"display:ruby-text;",
			"display:ruby-text-group;",
			"display:",

			"visibility:visible;",
			"visibility:hidden;",
			"visibility:collapse;",
			"visibility:",

			"overflow:visible;",
			"overflow:hidden;",
			"overflow:scroll;",
			"overflow:auto;",
			"overflow:",

			"zoom:1;",
			"zoom:",

			"clip:auto;",
			"clip:rect",
			"clip:",

			"resize:none;",
			"resize:",

			"cursor:auto;",
			"cursor:default;",
			"cursor:crosshair;",
			"cursor:hand;",
			"cursor:help;",
			"cursor:move;",
			"cursor:pointer;",
			"cursor:text;",
			"cursor:",





			"margin-top:auto;",
			"margin-top:",
			"margin-right:auto;",
			"margin-right:",
			"margin-bottom:auto;",
			"margin-bottom:",
			"margin-left:auto;",
			"margin-left:",

			"margin:auto;",
			"margin:",

			"padding-top:",
			"padding-right:",
			"padding-bottom:",
			"padding-left:",
			"padding:",





			"box-sizing:content-box;",
			"box-sizing:border-box;",
			"box-sizing:",
			
			"box-shadow:none;",
			"box-shadow:inset ",
			"box-shadow:",


			"line-height:1;",
			"line-height:",

			"width:auto;",
			"width:100%;",
			"width:",
			"height:auto;",
			"height:100%;",
			"height:",
			"max-width:none;",
			"max-height:none;",
			"max-width:100%;",
			"max-height:100%;",

			"max-width:",
			"max-height:",
			"min-height:",
			"min-width:",





			"font-weight:normal;",
			"font-weight:bold;",
			"font-weight:bolder;",
			"font-weight:lighter;",
			"font-weight:",

			"font-style:normal;",
			"font-style:italic;",
			"font-style:oblique;",
			"font-style",

			"font-variant:normal;",
			"font-variant:small-caps;",
			"font-variant:",

			"font-size:0;",
			"font-size:",
			"font-size-adjust:none;",
			"font-size-adjust:",
			"font-family:",

			"font-effect:none;",
			"font-effect:engrave;",
			"font-effect:emboss;",
			"font-effect:outline;",
			"font-effect:",
			"font:",




			"vertical-align:top;",
			"vertical-align:super;",
			"vertical-align:text-top;",
			"vertical-align:middle;",
			"vertical-align:baseline;",
			"vertical-align:bottom;",
			"vertical-align:text-bottom;",
			"vertical-align:sub;",
			"vertical-align:",

			"text-align:left;",
			"text-align:center;",
			"text-align:right;",
			"text-align:justify;",
			"text-align:",

			"text-align-last:auto;",
			"text-align-last:left;",
			"text-align-last:center;",
			"text-align-last:right;",
			"text-align-last:",

			"text-decoration:none;",
			"text-decoration:underline;",
			"text-decoration:overline;",
			"text-decoration:line-through;",
			"text-decoration:",

			"text-emphasis:none;",
			"text-emphasis:accent;",
			"text-emphasis:dot;",
			"text-emphasis:circle;",
			"text-emphasis:disc;",
			"text-emphasis:before;",
			"text-emphasis:after;",
			"text-emphasis:",

			"text-height:auto;",
			"text-height:font-size;",
			"text-height:text-size;",
			"text-height:max-size;",
			"text-height:",

			"text-indent:",

			"text-justify:auto;",
			"text-justify:inter-word;",
			"text-justify:inter-ideograph;",
			"text-justify:inter-cluster;",
			"text-justify:distribute;",
			"text-justify:kashida;",
			"text-justify:tibetan;",
			"text-justify:",

			"text-outline:0 0 #000;",
			"text-outline:none;",
			"text-outline:",

			"text-replace:none;",
			"text-replace:",

			"text-transform:none;",
			"text-transform:capitalize;",
			"text-transform:uppercase;",
			"text-transform:lowercase;",
			"text-transform:",

			"text-wrap:normal;",
			"text-wrap:none;",
			"text-wrap:unrestricted;",
			"text-wrap:suppress;",
			"text-wrap:",

			"text-shadow:none;",
			"text-shadow:",

			"letter-spacing:normal;",
			"letter-spacing:",

			"white-space:normal;",
			"white-space:",
			"word-break:normal;",
			"word-break:break-all;",
			"word-break:",
			"word-spacing:",

			"word-wrap:normal;",
			"word-wrap:none",
			"word-wrap:break-word",
			"word-wrap:",

			"background:#000;",
			"background:#fff;",
			"background:url",
			"background:none;",
			"background:",

			"background-color:transparent;",
			"background-color:#fff;",
			"background-color:#000;",
			"background-color:",

			"background-image:url",
			"background-image:none;",
			"background-image:linear-gradient",
			"background-image:",

			"background-repeat:no-repeat;",
			"background-repeat:repeat-x;",
			"background-repeat:repeat-y;",
			"background-repeat:repeat;",
			"background-repeat:space;",
			"background-repeat:round;",
			"background-repeat:",

			"background-attachment:fixed;",
			"background-attachment:scroll;",
			"background-attachment:",

			"background-position-x:",
			"background-position-y:",
			"background-position:",

			"background-break:bounding-box;",
			"background-break:each-box;",
			"background-break:continuous;",
			"background-break:",

			"background-clip:border-box;",
			"background-clip:padding-box;",
			"background-clip:content-box;",
			"background-clip:no-clip;",
			"background-clip:",

			"background-origin:padding-box;",
			"background-origin:border-box;",
			"background-origin:content-box;",
			"background-origin:",

			"background-size:auto;",
			"background-size:contain;",
			"background-size:cover;",
			"background-size:100% 100%;",
			"background-size:100%;",
			"background-size:",


			"color:rgba",
			"color:#000;",
			"color:#fff;",
			"color:",

			"opacity:0;",
			"opacity:1;",
			"opacity:",


			"position:static;",
			"position:absolute;",
			"position:relative;",
			"position:fixed;",
			"position:",


			"content:normal;",
			"content:open-quote;",
			"content:no-open-quote;",
			"content:close-quote;",
			"content:no-close-quote;",
			"content:attr();",
			"content:counter();",
			"content:counters();",
			"content:'';",
			"content:\"\";",
			"content:",

			"quotes:none;",
			"quotes:",

			"counter-increment:",
			"counter-reset:",


			"outline:none;",
			"outline:",
			"outline-offset:",
			"outline-width:",

			"outline-width:thin;",
			"outline-width:medium;",
			"outline-width:thick;",
			"outline-style:none;",
			"outline-style:dotted;",
			"outline-style:dashed;",
			"outline-style:solid;",
			"outline-style:double;",
			"outline-style:groove;",
			"outline-style:ridge;",
			"outline-style:inset;",
			"outline-style:outset;",
			"outline-style:",

			"outline-color:invert;",
			"outline-color:#000;",
			"outline-color:",


			"table-layout:auto;",
			"table-layout:fixed;",
			"table-layout:",

			"caption-side:top;",
			"caption-side:bottom;",
			"caption-side:",

			"empty-cells:show;",
			"empty-cells:hide;",
			"empty-cells:",



			"border:1px solid #000;",
			"border:1px solid #fff;",
			"border:none;",
			"border:",

			"border-break:",

			"border-collapse:collapse;",
			"border-collapse:separate;",
			"border-collapse:",

			"border-color:#000;",
			"border-color:transparent;",
			"border-color:",

			"border-image:url",
			"border-image:none;",

			"border-top-image:url",
			"border-top-image:none;",

			"border-right-image:url",
			"border-right-image:none;",

			"border-bottom-image:url",
			"border-bottom-image:none;",

			"border-left-image:url",
			"border-left-image:none;",

			"border-corner-image:url",
			"border-corner-image:none;",

			"border-corner-image:continue;",
			"border-top-left-image:url",
			"border-top-left-image:none;",

			"border-top-left-image:continue;",
			"border-top-right-image:url",
			"border-top-right-image:none;",

			"border-top-right-image:continue;",
			"border-bottom-right-image:url",
			"border-bottom-right-image:none;",

			"border-bottom-right-image:continue;",
			"border-bottom-left-image:url",
			"border-bottom-left-image:none;",

			"border-bottom-left-image:continue;",
			"border-fit:clip;",
			"border-fit:repeat;",
			"border-fit:scale;",
			"border-fit:stretch;",
			"border-fit:overwrite;",
			"border-fit:overflow;",
			"border-fit:space;",
			"border-fit:",


			"border-length:auto;",
			"border-length:",

			"border-spacing:",

			"border-style:none;",
			"border-style:hidden;",
			"border-style:dotted;",
			"border-style:dashed;",
			"border-style:solid;",
			"border-style:double;",
			"border-style:dot-dash;",
			"border-style:dot-dot-dash;",
			
			"border-style:wave;",
			"border-style:groove;",
			"border-style:ridge;",
			"border-style:inset;",
			"border-style:outset;",
			"border-style:",

			"border-width:",
			"border-top:",
			"border-top:1px solid #000;",
			"border-top:none;",
			"border-top-width:",
			"border-top-style:",
			"border-top-style:none;",
			"border-top-color:#000;",
			"border-top-color:transparent;",
			"border-right:",
			"border-right:1px solid #000;",
			"border-right:none;",
			"border-right-width:",
			"border-right-style:",
			"border-right-style:none;",
			"border-right-color:#000;",
			"border-right-color:transparent;",
			"border-bottom:",
			"border-bottom:1px solid #000;",
			"border-bottom:none;",
			"border-bottom-width:",
			"border-bottom-style:",
			"border-bottom-style:none;",
			"border-bottom-color:#000;",
			"border-bottom-color:transparent;",
			"border-left:",
			"border-left:1px solid #000;",
			"border-left:none;",
			"border-left-width:",
			"border-left-style:",
			"border-left-style:none;",
			"border-left-color:#000;",
			"border-left-color:transparent;",
			"border-radius:",
			"border-top-right-radius:",
			"border-top-left-radius:",
			"border-bottom-right-radius:",
			"border-bottom-left-radius:",



			"list-style:none;",
			"list-style-position:",
			"list-style-position:inside;",
			"list-style-position:outside;",
			"list-style-type:none;",
			"list-style-type:disc;",
			"list-style-type:circle;",
			"list-style-type:square;",
			"list-style-type:decimal;",
			"list-style-type:decimal-leading-zero;",
			"list-style-type:lower-roman;",
			"list-style-type:upper-roman;",
			"list-style-type:",

			"list-style-image:none;",
			"list-style-image:",

			"list-style:",



			"page-break-before:auto;",
			"page-break-before:always;",
			"page-break-before:left;",
			"page-break-before:right;",
			"page-break-before:",

			"page-break-inside:auto;",
			"page-break-inside:avoid;",
			"page-break-inside:",

			"page-break-after:auto;",
			"page-break-after:always;",
			"page-break-after:left;",
			"page-break-after:right;",
			"page-break-after:",

			"orphans:",
			"widows:",



			"align-content:center;",
			"align-content:flex-end;",
			"align-content:flex-start;",
			"align-content:stretch;",
			"align-content:space-around;",
			"align-content:space-between;",
			"align-content:",

			"align-items:baseline;",
			"align-items:center;",
			"align-items:flex-end;",
			"align-items:flex-start;",
			"align-items:stretch;",
			"align-items:",


			"justify-content:center;",
			"justify-content:flex-end;",
			"justify-content:flex-start;",
			"justify-content:space-around;",
			"justify-content:space-between;",
			"justify-content:",





			"animation:",
			"animation-delay:",

			"animation-direction:alternate;",
			"animation-direction:alternate-reverse;",
			"animation-direction:normal;",
			"animation-direction:reverse;",
			"animation-direction:",

			"animation-duration:",
			"animation-fill-mode:both;",
			"animation-fill-mode:backwards;",
			"animation-fill-mode:both;",
			"animation-fill-mode:forwards;",
			"animation-iteration-count:",
			"animation-iteration-count:infinite;",
			"animation-name:",

			"animation-play-state:paused;",
			"animation-play-state:running;",
			"animation-play-state:",

			"animation-timing-function:ease;",
			"animation-timing-function:ease-in;",
			"animation-timing-function:ease-in-out;",
			"animation-timing-function:ease-out;",
			"animation-timing-function:linear;",
			"animation-timing-function:",






			"flex-basis:",
			"flex-direction:column;",
			"flex-direction:column-reverse;",
			"flex-direction:row;",
			"flex-direction:row-reverse;",
			"flex-direction:",

			"flex-flow:",
			"flex-grow:1;",
			"flex-grow:",
			"flex-shrink:",
			"flex-wrap:nowrap;",
			"flex-wrap:wrap;",
			"flex-wrap:wrap-reverse;",
			"flex-wrap:",
			"flex:",





			"transform:rotateX(",
			"transform:rotateY(",
			"transform:rotateZ(",
			"transform:rotate(",
			"transform:scale3d(",
			"transform:scaleX(",
			"transform:scaleY(",
			"transform:scaleZ(",
			"transform:scale(",
			"transform:skewX(",
			"transform:skewY(",
			"transform:translate3d(",
			"transform:translateX(",
			"transform:translateY(",
			"transform:translateZ(",
			"transform:translate(",
			"transform:",

			"transform-origin:",
			"transform-style:preserve-3d;",
			"transform-style:",
			"transition-delay:",
			"transition-duration:",
			"transition-property:",
			"transition-timing-function:",
			"transition:",



			"top:auto;",
			"top:",
			"right:auto;",
			"right:",
			"bottom:auto;",
			"bottom:",
			"left:auto;",
			"left:",

			"top",
			"right",
			"bottom",
			"left",

			"!important;",
			"@media screen and{",
			"@media screen{",
			"@media ",
			"@keyframes ",
			"text-overflow:clip;",
			"text-overflow:ellipsis;",
			"text-overflow:",




			"1111111",
			"2222222",
			"3333333",
			"4444444",
			"5555555",
			"6666666",
			"7777777",
			"8888888",
			"9999999",
			"0000000",

			"auto",
			"none",
			"opacity",
			"center",
			"left",
			"right",

			"transform",

			"sans-serif",
			"-apple-system",
			"BlinkMacSystemFont",
			"segoe ui",
			"avenir next",
			"avenir",
			"helvetica neue",
			"helvetica",
			"ubuntu",
			"roboto",
			"noto",
			"arial",




			":active",
			":any",
			":checked",
			":default",
			":dir(",
			":disabled",
			":empty",
			":enabled",
			":first",
			":first-child",
			":first-of-type",
			":fullscreen",
			":focus",
			":hover",
			":indeterminate",
			":in-range",
			":invalid",
			":lang(",
			":last-child",
			":last-of-type",
			":left",
			":link",
			":not(",
			":nth-child(",
			":nth-last-child(",
			":nth-last-of-type(",
			":nth-of-type(",
			":only-child",
			":only-of-type",
			":optional",
			":out-of-range",
			":read-only",
			":read-write",
			":required",
			":right",
			":root",
			":scope",
			":target",
			":valid",
			":visited",

			":before",
			":after",


			"-webkit-",
			"-moz-",
			"-ms-",
			"-o-",

			"calc(",
			"rgba(",
			"rgb(",

			"255,255,255",
			"255,255,255,",
			"0,0,0",
			"0,0,0,",
		];

app.$data.input = `@font-face {
	font-family: 'MuseoSans';
	src: url('../fonts/MuseoSansCyrl-300.eot');
	src: local('MuseoSansCyrl-300'),
		url('../fonts/MuseoSansCyrl-300.eot?#iefix') format('embedded-opentype'),
		url('../fonts/MuseoSansCyrl-300.woff') format('woff'),
		url('../fonts/MuseoSansCyrl-300.ttf') format('truetype');
	font-weight: 300;
	font-style: normal;
}

@font-face {
	font-family: 'MuseoSans';
	src: url('../fonts/MuseoSansCyrl-500.eot');
	src: local('MuseoSansCyrl-500'),
		url('../fonts/MuseoSansCyrl-500.eot?#iefix') format('embedded-opentype'),
		url('../fonts/MuseoSansCyrl-500.woff') format('woff'),
		url('../fonts/MuseoSansCyrl-500.ttf') format('truetype');
	font-weight: 500;
	font-style: normal;
}

@font-face {
	font-family: 'MuseoSans';
	src: url('../fonts/MuseoSansCyrl-700.eot');
	src: local('MuseoSansCyrl-700'),
		url('../fonts/MuseoSansCyrl-700.eot?#iefix') format('embedded-opentype'),
		url('../fonts/MuseoSansCyrl-700.woff') format('woff'),
		url('../fonts/MuseoSansCyrl-700.ttf') format('truetype');
	font-weight: 700;
	font-style: normal;
}

@font-face {
	font-family: 'MuseoSans';
	src: url('../fonts/MuseoSansCyrl-900.eot');
	src: local('MuseoSansCyrl-900'),
		url('../fonts/MuseoSansCyrl-900.eot?#iefix') format('embedded-opentype'),
		url('../fonts/MuseoSansCyrl-900.woff') format('woff'),
		url('../fonts/MuseoSansCyrl-900.ttf') format('truetype');
	font-weight: 900;
	font-style: normal;
}`;