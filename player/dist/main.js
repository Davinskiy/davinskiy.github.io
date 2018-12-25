/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let video_cnt = document.querySelector(\".js-video-cnt\");\n\nfunction playVideo(obj){\n\tlet video = obj.querySelector('video');\n\n\tvideo.play();\n\n\tsetTimeout(() => {\n\t\tvideo.muted = false;\n\t}, 150);\n\n\tvideo.addEventListener(\"timeupdate\", function() {\n\t\tgetMediaProgress(this);\n\t}, false);\n\n\tvideo.addEventListener(\"ended\", function() {\n\t\tthis.currentTime = 0.00;\n\t\tgetClosest(this, 'js-video-cnt').classList.add('play-icon');\n\t}, false);\n}\n\nplayVideo(video_cnt);\n\nfunction getMediaProgress(video){\n\tlet cur_time = video.currentTime;\n\tlet dur = video.duration;\n\n\tlet percent = (cur_time / dur) * 100;\n\n\tlet progress_bar = getClosest(video, 'js-video-cnt').querySelector('.js-video-progress');\n\n\tprogress_bar.style.width = percent + '%';\n}\n\nwindow.videoPause = function(video){\n\tif (video.nodeName != 'VIDEO')\n\t\tvideo = getClosest(video, 'js-video-cnt').querySelector('video');\n\tif(!video.paused){\n\t\tvideo.pause();\n\t\tvideo_cnt.classList.add('play-icon');\n\t}\n}\n\nwindow.videoPlay = function(video){\n\tif (video.nodeName != 'VIDEO')\n\t\tvideo = getClosest(video, 'js-video-cnt').querySelector('video');\n\tif(video.paused){\n\t\tvideo.play();\n\t\tvideo_cnt.classList.remove('play-icon');\n\t}\n}\n\nwindow.videoMute = function(video){\n\tif (video.nodeName != 'VIDEO')\n\t\tvideo = getClosest(video, 'js-video-cnt').querySelector('video');\n\n\tvideo.muted = !video.muted;\n\tvideo_cnt.classList.toggle('mute');\n}\n\nfunction getClosest(el, className) {\n\tlet parent = el.parentElement;\n\n\tif (parent.nodeName == 'BODY') return;\n\tif (hasClass(parent, className)) return parent;\n\n\treturn getClosest(parent, className);\n}\n\nfunction hasClass(element, className) {\n\treturn new RegExp('(\\\\s|^)' + className + '(\\\\s|$)').test(element.className);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });