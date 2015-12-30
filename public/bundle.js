/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nemo on 15/12/23.
	 */

	var biu = __webpack_require__(1);
	biu.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// doms
	var biuElement;
	var iHex;
	var iR;
	var iG;
	var iB;
	var iH;
	var iS;
	var iV;
	var openBtn;
	var colorWrap;
	var textInput;
	var submit;
	var emitterText;
	var textWrap;
	var textClose;
	var textWrapUl;
	var textFontsWrap;
	var textFonts;
	var modeBoxes;
	var showTextBtn;
	var overLine;
	var stage;
	var form;

	// color picker
	var cp;

	const defaultCommentConfig = __webpack_require__(2);
	const ColorPicker = __webpack_require__(3);
	const util = __webpack_require__(4);

	__webpack_require__(5);
	__webpack_require__(8);
	__webpack_require__(12);
	__webpack_require__(14);


	window.EventEmitter = __webpack_require__(16);
	window.Protocol = __webpack_require__(17);
	window.protobuf = __webpack_require__(23);

	var pomelo = __webpack_require__(30);


	var Biu = {};

	Biu.init = function () {
	  createDoms();
	  initParams();
	  addEvents();
	  addCommentManager();
	  pomeloInit();

	  cp = new ColorPicker(
	    document.getElementById('color-picker'),
	    function (hex, hsv, rgb) {
	      iHex.value = hex;
	      iR.value = rgb.r;
	      iG.value = rgb.g;
	      iB.value = rgb.b;
	      iH.value = hsv.h;
	      iS.value = hsv.s;
	      iV.value = hsv.v;
	      openBtn.style.background = hex;
	      defaultCommentConfig.color = hex.substr(1, 6);
	    });
	  updateColorPickers('#ffffff');
	};

	Biu.genRoom = function () {
	  return location.host;
	};

	Biu.show = function () {
	  biuElement.style.display = 'block';
	};

	Biu.hide = function () {
	  biuElement.style.display = 'none';
	};

	module.exports = Biu;

	/**
	 * 创建template
	 */
	function createDoms() {
	  const template = __webpack_require__(31);
	  biuElement = createElement(template);
	  document.body.appendChild(biuElement);
	  util.addElementClass(document.body, 'abp');

	  function createElement(string) {
	    var div;
	    div = document.createElement("div");
	    div.innerHTML = string;
	    return div.childNodes[0];
	  }
	}

	/**
	 * dom选择器
	 */
	function initParams() {
	  iHex = document.getElementById('hex');
	  iR = document.getElementById('rgb-r');
	  iG = document.getElementById('rgb-g');
	  iB = document.getElementById('rgb-b');
	  iH = document.getElementById('hsv-h');
	  iS = document.getElementById('hsv-s');
	  iV = document.getElementById('hsv-v');
	  openBtn = document.querySelector('.emitter-color');
	  colorWrap = document.querySelector('.emitter-color-wrap');
	  textInput = document.getElementById('emitter-input');
	  submit = document.getElementById('emitter-submit');
	  emitterText = document.querySelector('.emitter-text-modal');
	  textWrap = document.querySelector('.emitter-text-wrap');
	  textClose = document.querySelector('.emitter-modal-close');
	  textWrapUl = textWrap.getElementsByTagName('ul')[0];
	  textFontsWrap = textWrap.getElementsByClassName('font-wrap')[0];
	  textFonts = textFontsWrap.getElementsByTagName('span');
	  modeBoxes = textWrap.getElementsByClassName('mode-box');
	  showTextBtn = document.querySelector('.emitter-text');
	  overLine = showTextBtn.getElementsByClassName('overline')[0];
	  stage = document.getElementById('biu-comment-stage');
	  form = document.getElementById('emitter-form');

	  stage.style.display = 'block';
	}

	/**
	 * 注册事件
	 */
	function addEvents() {
	  iHex.onchange = function () {
	    updateColorPickers(iHex.value);
	  };

	  iR.onchange = function () {
	    updateColorPickers(ColorPicker.rgb2hex({
	      r: iR.value,
	      g: iG.value,
	      b: iB.value
	    }));
	  }

	  iG.onchange = function () {
	    updateColorPickers(ColorPicker.rgb2hex({
	      r: iR.value,
	      g: iG.value,
	      b: iB.value
	    }));
	  }

	  iB.onchange = function () {
	    updateColorPickers(ColorPicker.rgb2hex({
	      r: iR.value,
	      g: iG.value,
	      b: iB.value
	    }));
	  }

	  iH.onchange = function () {
	    updateColorPickers(ColorPicker.hsv2hex({
	      h: iH.value,
	      s: iS.value,
	      v: iV.value
	    }));
	  }
	  iS.onchange = function () {
	    updateColorPickers(ColorPicker.hsv2hex({
	      h: iH.value,
	      s: iS.value,
	      v: iV.value
	    }));
	  }
	  iV.onchange = function () {
	    updateColorPickers(ColorPicker.hsv2hex({
	      h: iH.value,
	      s: iS.value,
	      v: iV.value
	    }));
	  }

	  //颜色选择器
	  openBtn.onclick = Biu.__toggleBox;

	  //模式选择
	  emitterText.onclick = Biu.__toggleTextBox;

	  //模式选择关闭
	  textClose.onclick = Biu.__closeTextBox;

	  //模式选择,弹幕模式
	  textWrapUl.onclick = function (e) {
	    var target = e.target;
	    if (target.getAttribute('class').indexOf('mode-box') > -1) {
	      Biu.__activeModeBox(target);
	    }
	  };

	  //模式选择,字体选择
	  textFontsWrap.onclick = function (e) {
	    var target = e.target;
	    if (target.getAttribute('class').indexOf('fonts') > -1) {
	      Biu.__activeFont(target);
	    }
	  };

	  showTextBtn.onclick = function () {
	    Biu.__toggleShowComment(overLine);
	  };

	  form.onsubmit = function (e) {
	    e.preventDefault();
	    Biu.__sendComment();
	  }
	}

	/**
	 * 启动弹幕发射器
	 */
	function addCommentManager() {
	  window.CM = new CommentManager(document.getElementById('biu-comment-stage'));
	  CM.init(); // 初始化

	  // 启动播放弹幕（在未启动状态下弹幕不会移动）
	  CM.start();
	}

	function pomeloInit() {
	  var username = Math.random();
	  var room = Biu.genRoom();

	  pomelo.init({
	    host: //'127.0.0.1',
	      'vpca-bpm-family-slardar-1.vm.elenet.me',
	    port: 3010,
	  }, function () {
	    pomelo.request('connector.entryHandler.enter', {username: username, room: room}, function (result) {
	      console.log(result);
	    });

	    pomelo.on('onUserEnter', function (msg) {
	      console.log('onUserEnter', msg);
	      pomelo.request('chat.chatHandler.getMembers', {}, function (result) {
	        console.log(result);
	      })
	    });

	    pomelo.on('onUserLeave', function (msg) {
	      console.log('onUserLeave', msg);
	      pomelo.request('chat.chatHandler.getMembers', {}, function (result) {
	        console.log(result);
	      })
	    });


	    pomelo.on('onComment', function (msg) {
	      console.log('onComment', msg);

	      CM.send(msg);
	    });

	    pomelo.request('chat.chatHandler.getComment', {}, function (result) {
	      console.log(result);
	      CM.load(result);
	      CM.start();

	      CM.time(600)
	    })
	  });
	}

	function updateColorPickers(hex) {
	  cp.setHex(hex);
	}

	/**
	 *
	 * @private
	 */
	Biu.__toggleBox = function () {
	  util.toggle(colorWrap);
	};

	Biu.__toggleTextBox = function () {
	  util.toggle(textWrap);
	};

	Biu.__closeTextBox = function () {
	  textWrap.style.display = 'none';
	};

	Biu.__sendComment = function () {
	  var comment = Object.assign(defaultCommentConfig, {text: textInput.value});
	  console.log(comment);
	  // TODO: 发送至服务器
	  pomelo.notify('chat.chatHandler.comment', comment)
	};
	//设置选中的弹幕模式
	Biu.__activeModeBox = function (ele) {
	  util.removeElementsClass(modeBoxes, 'active');
	  util.addElementClass(ele, 'active');
	  defaultCommentConfig.mode = Number(ele.getAttribute('data-mode'));
	};

	//设置选中的弹幕字体
	Biu.__activeFont = function (ele) {
	  util.removeElementsClass(textFonts, 'active');
	  util.addElementClass(ele, 'active');
	  defaultCommentConfig.size = Number(ele.getAttribute('data-font'));
	};
	/**
	 * 是否显示弹幕 todo:T的切换和弹幕的开关,需要解耦
	 * @param ele
	 * @private
	 */
	Biu.__toggleShowComment = function (ele) {
	  util.toggle(ele);
	  util.toggle(stage);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by Nemo on 15/12/29.
	 */
	module.exports = {
	  "mode": 1,
	  "stime": 0,
	  "size": 36,
	  "dur": 6000,
	  "color": 'ffffff'
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	var type = (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML"),
	  picker, slide, hueOffset = 15,
	  svgNS = 'http://www.w3.org/2000/svg';

	// This HTML snippet is inserted into the innerHTML property of the passed color picker element
	// when the no-hassle call to ColorPicker() is used, i.e. ColorPicker(function(hex, hsv, rgb) { ... });

	var colorpickerHTMLSnippet = [

	  '<div class="picker-wrapper">',
	  '<div class="picker"></div>',
	  '<div class="picker-indicator"></div>',
	  '</div>',
	  '<div class="slide-wrapper">',
	  '<div class="slide"></div>',
	  '<div class="slide-indicator"></div>',
	  '</div>'

	].join('');

	/**
	 * Return mouse position relative to the element el.
	 */
	function mousePosition(evt) {
	  // IE:
	  if (window.event && window.event.contentOverflow !== undefined) {
	    return {
	      x: window.event.offsetX,
	      y: window.event.offsetY
	    };
	  }
	  // Webkit:
	  if (evt.offsetX !== undefined && evt.offsetY !== undefined) {
	    return {
	      x: evt.offsetX,
	      y: evt.offsetY
	    };
	  }
	  // Firefox:
	  var wrapper = evt.target.parentNode.parentNode;
	  return {
	    x: evt.layerX - wrapper.offsetLeft,
	    y: evt.layerY - wrapper.offsetTop
	  };
	}

	/**
	 * Create SVG element.
	 */
	function $(el, attrs, children) {
	  el = document.createElementNS(svgNS, el);
	  for (var key in attrs)
	    el.setAttribute(key, attrs[key]);
	  if (Object.prototype.toString.call(children) != '[object Array]') children = [children];
	  var i = 0,
	    len = (children[0] && children.length) || 0;
	  for (; i < len; i++)
	    el.appendChild(children[i]);
	  return el;
	}

	/**
	 * Create slide and picker markup depending on the supported technology.
	 */
	if (type == 'SVG') {

	  slide = $('svg', {
	    xmlns: 'http://www.w3.org/2000/svg',
	    version: '1.1',
	    width: '100%',
	    height: '100%'
	  }, [
	    $('defs', {},
	      $('linearGradient', {
	        id: 'gradient-hsv',
	        x1: '0%',
	        y1: '100%',
	        x2: '0%',
	        y2: '0%'
	      }, [
	        $('stop', {
	          offset: '0%',
	          'stop-color': '#FF0000',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '13%',
	          'stop-color': '#FF00FF',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '25%',
	          'stop-color': '#8000FF',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '38%',
	          'stop-color': '#0040FF',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '50%',
	          'stop-color': '#00FFFF',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '63%',
	          'stop-color': '#00FF40',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '75%',
	          'stop-color': '#0BED00',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '88%',
	          'stop-color': '#FFFF00',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '100%',
	          'stop-color': '#FF0000',
	          'stop-opacity': '1'
	        })
	      ])
	    ),
	    $('rect', {
	      x: '0',
	      y: '0',
	      width: '100%',
	      height: '100%',
	      fill: 'url(#gradient-hsv)'
	    })
	  ]);

	  picker = $('svg', {
	    xmlns: 'http://www.w3.org/2000/svg',
	    version: '1.1',
	    width: '100%',
	    height: '100%'
	  }, [
	    $('defs', {}, [
	      $('linearGradient', {
	        id: 'gradient-black',
	        x1: '0%',
	        y1: '100%',
	        x2: '0%',
	        y2: '0%'
	      }, [
	        $('stop', {
	          offset: '0%',
	          'stop-color': '#000000',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '100%',
	          'stop-color': '#CC9A81',
	          'stop-opacity': '0'
	        })
	      ]),
	      $('linearGradient', {
	        id: 'gradient-white',
	        x1: '0%',
	        y1: '100%',
	        x2: '100%',
	        y2: '100%'
	      }, [
	        $('stop', {
	          offset: '0%',
	          'stop-color': '#FFFFFF',
	          'stop-opacity': '1'
	        }),
	        $('stop', {
	          offset: '100%',
	          'stop-color': '#CC9A81',
	          'stop-opacity': '0'
	        })
	      ])
	    ]),
	    $('rect', {
	      x: '0',
	      y: '0',
	      width: '100%',
	      height: '100%',
	      fill: 'url(#gradient-white)'
	    }),
	    $('rect', {
	      x: '0',
	      y: '0',
	      width: '100%',
	      height: '100%',
	      fill: 'url(#gradient-black)'
	    })
	  ]);

	} else if (type == 'VML') {
	  slide = [
	    '<DIV style="position: relative; width: 100%; height: 100%">',
	    '<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">',
	    '<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>',
	    '</v:rect>',
	    '</DIV>'
	  ].join('');

	  picker = [
	    '<DIV style="position: relative; width: 100%; height: 100%">',
	    '<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">',
	    '<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',
	    '</v:rect>',
	    '<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">',
	    '<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',
	    '</v:rect>',
	    '</DIV>'
	  ].join('');

	  if (!document.namespaces['v'])
	    document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
	}

	/**
	 * Convert HSV representation to RGB HEX string.
	 * Credits to http://www.raphaeljs.com
	 */
	function hsv2rgb(hsv) {
	  var R, G, B, X, C;
	  var h = (hsv.h % 360) / 60;

	  C = hsv.v * hsv.s;
	  X = C * (1 - Math.abs(h % 2 - 1));
	  R = G = B = hsv.v - C;

	  h = ~~h;
	  R += [C, X, 0, 0, X, C][h];
	  G += [X, C, C, X, 0, 0][h];
	  B += [0, 0, X, C, C, X][h];

	  var r = Math.floor(R * 255);
	  var g = Math.floor(G * 255);
	  var b = Math.floor(B * 255);
	  return {
	    r: r,
	    g: g,
	    b: b,
	    hex: "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
	  };
	}

	/**
	 * Convert RGB representation to HSV.
	 * r, g, b can be either in <0,1> range or <0,255> range.
	 * Credits to http://www.raphaeljs.com
	 */
	function rgb2hsv(rgb) {

	  var r = rgb.r;
	  var g = rgb.g;
	  var b = rgb.b;

	  if (rgb.r > 1 || rgb.g > 1 || rgb.b > 1) {
	    r /= 255;
	    g /= 255;
	    b /= 255;
	  }

	  var H, S, V, C;
	  V = Math.max(r, g, b);
	  C = V - Math.min(r, g, b);
	  H = (C == 0 ? null :
	    V == r ? (g - b) / C + (g < b ? 6 : 0) :
	      V == g ? (b - r) / C + 2 :
	      (r - g) / C + 4);
	  H = (H % 6) * 60;
	  S = C == 0 ? 0 : C / V;
	  return {
	    h: H,
	    s: S,
	    v: V
	  };
	}

	/**
	 * Return click event handler for the slider.
	 * Sets picker background color and calls ctx.callback if provided.
	 */
	function slideListener(ctx, slideElement, pickerElement) {
	  return function (evt) {
	    evt = evt || window.event;
	    var mouse = mousePosition(evt);
	    ctx.h = mouse.y / slideElement.offsetHeight * 360 + hueOffset;
	    var pickerColor = hsv2rgb({
	      h: ctx.h,
	      s: 1,
	      v: 1
	    });
	    var c = hsv2rgb({
	      h: ctx.h,
	      s: ctx.s,
	      v: ctx.v
	    });
	    pickerElement.style.backgroundColor = pickerColor.hex;
	    ctx.callback && ctx.callback(c.hex, {
	      h: ctx.h - hueOffset,
	      s: ctx.s,
	      v: ctx.v
	    }, {
	      r: c.r,
	      g: c.g,
	      b: c.b
	    }, undefined, mouse);
	  }
	};

	/**
	 * Return click event handler for the picker.
	 * Calls ctx.callback if provided.
	 */
	function pickerListener(ctx, pickerElement) {
	  return function (evt) {
	    evt = evt || window.event;
	    var mouse = mousePosition(evt),
	      width = pickerElement.offsetWidth,
	      height = pickerElement.offsetHeight;

	    ctx.s = mouse.x / width;
	    ctx.v = (height - mouse.y) / height;
	    var c = hsv2rgb(ctx);
	    ctx.callback && ctx.callback(c.hex, {
	      h: ctx.h - hueOffset,
	      s: ctx.s,
	      v: ctx.v
	    }, {
	      r: c.r,
	      g: c.g,
	      b: c.b
	    }, mouse);
	  }
	};

	var uniqID = 0;

	/**
	 * ColorPicker.
	 * @param {DOMElement} slideElement HSV slide element.
	 * @param {DOMElement} pickerElement HSV picker element.
	 * @param {Function} callback Called whenever the color is changed provided chosen color in RGB HEX format as the only argument.
	 */
	function ColorPicker(slideElement, pickerElement, callback) {

	  if (!(this instanceof ColorPicker)) return new ColorPicker(slideElement, pickerElement, callback);

	  this.h = 0;
	  this.s = 1;
	  this.v = 1;

	  if (!callback) {
	    // call of the form ColorPicker(element, funtion(hex, hsv, rgb) { ... }), i.e. the no-hassle call.

	    var element = slideElement;
	    element.innerHTML = colorpickerHTMLSnippet;

	    this.slideElement = element.getElementsByClassName('slide')[0];
	    this.pickerElement = element.getElementsByClassName('picker')[0];
	    var slideIndicator = element.getElementsByClassName('slide-indicator')[0];
	    var pickerIndicator = element.getElementsByClassName('picker-indicator')[0];

	    ColorPicker.fixIndicators(slideIndicator, pickerIndicator);

	    this.callback = function (hex, hsv, rgb, pickerCoordinate, slideCoordinate) {

	      ColorPicker.positionIndicators(slideIndicator, pickerIndicator, slideCoordinate, pickerCoordinate);

	      pickerElement(hex, hsv, rgb);
	    };

	  } else {

	    this.callback = callback;
	    this.pickerElement = pickerElement;
	    this.slideElement = slideElement;
	  }

	  if (type == 'SVG') {

	    // Generate uniq IDs for linearGradients so that we don't have the same IDs within one document.
	    // Then reference those gradients in the associated rectangles.

	    var slideClone = slide.cloneNode(true);
	    var pickerClone = picker.cloneNode(true);

	    var hsvGradient = slideClone.getElementById('gradient-hsv');

	    var hsvRect = slideClone.getElementsByTagName('rect')[0];

	    hsvGradient.id = 'gradient-hsv-' + uniqID;
	    hsvRect.setAttribute('fill', 'url(#' + hsvGradient.id + ')');

	    var blackAndWhiteGradients = [pickerClone.getElementById('gradient-black'), pickerClone.getElementById('gradient-white')];
	    var whiteAndBlackRects = pickerClone.getElementsByTagName('rect');

	    blackAndWhiteGradients[0].id = 'gradient-black-' + uniqID;
	    blackAndWhiteGradients[1].id = 'gradient-white-' + uniqID;

	    whiteAndBlackRects[0].setAttribute('fill', 'url(#' + blackAndWhiteGradients[1].id + ')');
	    whiteAndBlackRects[1].setAttribute('fill', 'url(#' + blackAndWhiteGradients[0].id + ')');

	    this.slideElement.appendChild(slideClone);
	    this.pickerElement.appendChild(pickerClone);

	    uniqID++;

	  } else {

	    this.slideElement.innerHTML = slide;
	    this.pickerElement.innerHTML = picker;
	  }

	  addEventListener(this.slideElement, 'click', slideListener(this, this.slideElement, this.pickerElement));
	  addEventListener(this.pickerElement, 'click', pickerListener(this, this.pickerElement));

	  enableDragging(this, this.slideElement, slideListener(this, this.slideElement, this.pickerElement));
	  enableDragging(this, this.pickerElement, pickerListener(this, this.pickerElement));
	};

	function addEventListener(element, event, listener) {

	  if (element.attachEvent) {

	    element.attachEvent('on' + event, listener);

	  } else if (element.addEventListener) {

	    element.addEventListener(event, listener, false);
	  }
	}

	/**
	 * Enable drag&drop color selection.
	 * @param {object} ctx ColorPicker instance.
	 * @param {DOMElement} element HSV slide element or HSV picker element.
	 * @param {Function} listener Function that will be called whenever mouse is dragged over the element with event object as argument.
	 */
	function enableDragging(ctx, element, listener) {

	  var mousedown = false;

	  addEventListener(element, 'mousedown', function (evt) {
	    mousedown = true;
	  });
	  addEventListener(element, 'mouseup', function (evt) {
	    mousedown = false;
	  });
	  addEventListener(element, 'mouseout', function (evt) {
	    mousedown = false;
	  });
	  addEventListener(element, 'mousemove', function (evt) {

	    if (mousedown) {

	      listener(evt);
	    }
	  });
	}


	ColorPicker.hsv2rgb = function (hsv) {
	  var rgbHex = hsv2rgb(hsv);
	  delete rgbHex.hex;
	  return rgbHex;
	};

	ColorPicker.hsv2hex = function (hsv) {
	  return hsv2rgb(hsv).hex;
	};

	ColorPicker.rgb2hsv = rgb2hsv;

	ColorPicker.rgb2hex = function (rgb) {
	  return hsv2rgb(rgb2hsv(rgb)).hex;
	};

	ColorPicker.hex2hsv = function (hex) {
	  return rgb2hsv(ColorPicker.hex2rgb(hex));
	};

	ColorPicker.hex2rgb = function (hex) {
	  return {
	    r: parseInt(hex.substr(1, 2), 16),
	    g: parseInt(hex.substr(3, 2), 16),
	    b: parseInt(hex.substr(5, 2), 16)
	  };
	};

	/**
	 * Sets color of the picker in hsv/rgb/hex format.
	 * @param {object} ctx ColorPicker instance.
	 * @param {object} hsv Object of the form: { h: <hue>, s: <saturation>, v: <value> }.
	 * @param {object} rgb Object of the form: { r: <red>, g: <green>, b: <blue> }.
	 * @param {string} hex String of the form: #RRGGBB.
	 */
	function setColor(ctx, hsv, rgb, hex) {
	  ctx.h = hsv.h % 360;
	  ctx.s = hsv.s;
	  ctx.v = hsv.v;

	  var c = hsv2rgb(ctx);

	  var mouseSlide = {
	    y: (ctx.h * ctx.slideElement.offsetHeight) / 360,
	    x: 0 // not important
	  };

	  var pickerHeight = ctx.pickerElement.offsetHeight;

	  var mousePicker = {
	    x: ctx.s * ctx.pickerElement.offsetWidth,
	    y: pickerHeight - ctx.v * pickerHeight
	  };

	  ctx.pickerElement.style.backgroundColor = hsv2rgb({
	    h: ctx.h,
	    s: 1,
	    v: 1
	  }).hex;
	  ctx.callback && ctx.callback(hex || c.hex, {
	    h: ctx.h,
	    s: ctx.s,
	    v: ctx.v
	  }, rgb || {
	      r: c.r,
	      g: c.g,
	      b: c.b
	    }, mousePicker, mouseSlide);

	  return ctx;
	};

	/**
	 * Sets color of the picker in hsv format.
	 * @param {object} hsv Object of the form: { h: <hue>, s: <saturation>, v: <value> }.
	 */
	ColorPicker.prototype.setHsv = function (hsv) {
	  return setColor(this, hsv);
	};

	/**
	 * Sets color of the picker in rgb format.
	 * @param {object} rgb Object of the form: { r: <red>, g: <green>, b: <blue> }.
	 */
	ColorPicker.prototype.setRgb = function (rgb) {
	  return setColor(this, rgb2hsv(rgb), rgb);
	};

	/**
	 * Sets color of the picker in hex format.
	 * @param {string} hex Hex color format #RRGGBB.
	 */
	ColorPicker.prototype.setHex = function (hex) {
	  return setColor(this, ColorPicker.hex2hsv(hex), undefined, hex);
	};

	/**
	 * Helper to position indicators.
	 * @param {HTMLElement} slideIndicator DOM element representing the indicator of the slide area.
	 * @param {HTMLElement} pickerIndicator DOM element representing the indicator of the picker area.
	 * @param {object} mouseSlide Coordinates of the mouse cursor in the slide area.
	 * @param {object} mousePicker Coordinates of the mouse cursor in the picker area.
	 */
	ColorPicker.positionIndicators = function (slideIndicator, pickerIndicator, mouseSlide, mousePicker) {

	  if (mouseSlide) {
	    slideIndicator.style.top = (mouseSlide.y - slideIndicator.offsetHeight / 2) + 'px';
	  }
	  if (mousePicker) {
	    pickerIndicator.style.top = (mousePicker.y - pickerIndicator.offsetHeight / 2) + 'px';
	    pickerIndicator.style.left = (mousePicker.x - pickerIndicator.offsetWidth / 2) + 'px';
	  }
	};

	/**
	 * Helper to fix indicators - this is recommended (and needed) for dragable color selection (see enabledDragging()).
	 */
	ColorPicker.fixIndicators = function (slideIndicator, pickerIndicator) {

	  pickerIndicator.style.pointerEvents = 'none';
	  slideIndicator.style.pointerEvents = 'none';
	};

	module.exports = ColorPicker;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by Nemo on 15/12/30.
	 */

	exports.toggle = function (ele) {
	  if (!ele.style.display || ele.style.display == 'none') {
	    ele.style.display = 'block';
	  } else {
	    ele.style.display = 'none';
	  }
	};


	exports.removeElementsClass = function (elements, className) {
	  for (var i = 0; i < elements.length; i++) {
	    var el = elements[i];
	    var oldClass = el.getAttribute('class');
	    var newClass = oldClass.replace(className, '');
	    el.setAttribute('class', newClass);
	  }
	};


	exports.addElementClass = function (element, className) {
	  element.setAttribute('class', element.getAttribute('class') + ' ' + className);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6)(__webpack_require__(7))

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript === "function")
			execScript(src);
		else
			eval.call(null, src);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "/**\n * Binary Search Stubs for JS Arrays\n * @license MIT\n * @author Jim Chen\n */\nvar BinArray = (function(){\n\tvar BinArray = {};\n\tBinArray.bsearch = function(arr, what, how){\n\t\tif(arr.length == 0) return 0;\n\t\tif(how(what,arr[0]) < 0) return 0;\n\t\tif(how(what,arr[arr.length - 1]) >=0) return arr.length;\n\t\tvar low =0;\n\t\tvar i = 0;\n\t\tvar count = 0;\n\t\tvar high = arr.length - 1;\n\t\twhile(low<=high){\n\t\t\ti = Math.floor((high + low + 1)/2);\n\t\t\tcount++;\n\t\t\tif(how(what,arr[i-1])>=0 && how(what,arr[i])<0){\n\t\t\t\treturn i;\n\t\t\t}else if(how(what,arr[i-1])<0){\n\t\t\t\thigh = i-1;\n\t\t\t}else if(how(what,arr[i])>=0){\n\t\t\t\tlow = i;\n\t\t\t}else\n\t\t\t\tconsole.error('Program Error');\n\t\t\tif(count > 1500) console.error('Too many run cycles.');\n\t\t}\n\t\treturn -1;\n\t};\n\tBinArray.binsert = function(arr, what, how){\n\t\tvar index = BinArray.bsearch(arr,what,how);\n\t\tarr.splice(index,0,what);\n\t\treturn index;\n\t};\n\treturn BinArray;\n})();\n\nvar __extends = this.__extends || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    __.prototype = b.prototype;\n    d.prototype = new __();\n};\n\nvar CommentSpaceAllocator = (function () {\n    function CommentSpaceAllocator(width, height) {\n        if (typeof width === \"undefined\") { width = 0; }\n        if (typeof height === \"undefined\") { height = 0; }\n        this._pools = [\n            []\n        ];\n        this.avoid = 1;\n        this._width = width;\n        this._height = height;\n    }\n    CommentSpaceAllocator.prototype.willCollide = function (existing, check) {\n        return existing.stime + existing.ttl >= check.stime + check.ttl / 2;\n    };\n\n    CommentSpaceAllocator.prototype.pathCheck = function (y, comment, pool) {\n        var bottom = y + comment.height;\n        var right = comment.right;\n        for (var i = 0; i < pool.length; i++) {\n            if (pool[i].y > bottom || pool[i].bottom < y) {\n                continue;\n            } else if (pool[i].right < comment.x || pool[i].x > right) {\n                if (this.willCollide(pool[i], comment)) {\n                    return false;\n                } else {\n                    continue;\n                }\n            } else {\n                return false;\n            }\n        }\n        return true;\n    };\n\n    CommentSpaceAllocator.prototype.assign = function (comment, cindex) {\n        while (this._pools.length <= cindex) {\n            this._pools.push([]);\n        }\n        var pool = this._pools[cindex];\n        if (pool.length === 0) {\n            comment.cindex = cindex;\n            return 0;\n        } else if (this.pathCheck(0, comment, pool)) {\n            comment.cindex = cindex;\n            return 0;\n        }\n        var y = 0;\n        for (var k = 0; k < pool.length; k++) {\n            y = pool[k].bottom + this.avoid;\n            if (y + comment.height > this._height) {\n                break;\n            }\n            if (this.pathCheck(y, comment, pool)) {\n                comment.cindex = cindex;\n                return y;\n            }\n        }\n\n        return this.assign(comment, cindex + 1);\n    };\n\n    CommentSpaceAllocator.prototype.add = function (comment) {\n        if (comment.height > this._height) {\n            comment.cindex = -2;\n            comment.y = 0;\n        } else {\n            comment.y = this.assign(comment, 0);\n            BinArray.binsert(this._pools[comment.cindex], comment, function (a, b) {\n                if (a.bottom < b.bottom) {\n                    return -1;\n                } else if (a.bottom > b.bottom) {\n                    return 1;\n                } else {\n                    return 0;\n                }\n            });\n        }\n    };\n\n    CommentSpaceAllocator.prototype.remove = function (comment) {\n        if (comment.cindex < 0) {\n            return;\n        }\n        if (comment.cindex >= this._pools.length) {\n            throw new Error(\"cindex out of bounds\");\n        }\n        var index = this._pools[comment.cindex].indexOf(comment);\n        if (index < 0)\n            return;\n        this._pools[comment.cindex].splice(index, 1);\n    };\n\n    CommentSpaceAllocator.prototype.setBounds = function (width, height) {\n        this._width = width;\n        this._height = height;\n    };\n    return CommentSpaceAllocator;\n})();\n\nvar AnchorCommentSpaceAllocator = (function (_super) {\n    __extends(AnchorCommentSpaceAllocator, _super);\n    function AnchorCommentSpaceAllocator() {\n        _super.apply(this, arguments);\n    }\n    AnchorCommentSpaceAllocator.prototype.add = function (comment) {\n        _super.prototype.add.call(this, comment);\n        comment.x = (this._width - comment.width) / 2;\n    };\n\n    AnchorCommentSpaceAllocator.prototype.willCollide = function (a, b) {\n        return true;\n    };\n\n    AnchorCommentSpaceAllocator.prototype.pathCheck = function (y, comment, pool) {\n        var bottom = y + comment.height;\n        for (var i = 0; i < pool.length; i++) {\n            if (pool[i].y > bottom || pool[i].bottom < y) {\n                continue;\n            } else {\n                return false;\n            }\n        }\n        return true;\n    };\n    return AnchorCommentSpaceAllocator;\n})(CommentSpaceAllocator);\n\nvar __extends = this.__extends || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    __.prototype = b.prototype;\n    d.prototype = new __();\n};\nvar CoreComment = (function () {\n    function CoreComment(parent, init) {\n        if (typeof init === \"undefined\") { init = {}; }\n        this.mode = 1;\n        this.stime = 0;\n        this.text = \"\";\n        this.ttl = 4000;\n        this.dur = 4000;\n        this.cindex = -1;\n        this.motion = [];\n        this.movable = true;\n        this._alphaMotion = null;\n        this.absolute = true;\n        this.align = 0;\n        this._alpha = 1;\n        this._size = 25;\n        this._color = 0xffffff;\n        this._border = false;\n        this._shadow = true;\n        this._font = \"\";\n        if (!parent) {\n            throw new Error(\"Comment not bound to comment manager.\");\n        } else {\n            this.parent = parent;\n        }\n        if (init.hasOwnProperty(\"stime\")) {\n            this.stime = init[\"stime\"];\n        }\n        if (init.hasOwnProperty(\"mode\")) {\n            this.mode = init[\"mode\"];\n        } else {\n            this.mode = 1;\n        }\n        if (init.hasOwnProperty(\"dur\")) {\n            this.dur = init[\"dur\"];\n            this.ttl = this.dur;\n        }\n        this.dur *= this.parent.options.global.scale;\n        this.ttl *= this.parent.options.global.scale;\n        if (init.hasOwnProperty(\"text\")) {\n            this.text = init[\"text\"];\n        }\n        if (init.hasOwnProperty(\"motion\")) {\n            this._motionStart = [];\n            this._motionEnd = [];\n            this.motion = init[\"motion\"];\n            var head = 0;\n            for (var i = 0; i < init[\"motion\"].length; i++) {\n                this._motionStart.push(head);\n                var maxDur = 0;\n                for (var k in init[\"motion\"][i]) {\n                    var m = init[\"motion\"][i][k];\n                    maxDur = Math.max(m.dur, maxDur);\n                    if (m.easing === null || m.easing === undefined) {\n                        init[\"motion\"][i][k][\"easing\"] = CoreComment.LINEAR;\n                    }\n                }\n                head += maxDur;\n                this._motionEnd.push(head);\n            }\n            this._curMotion = 0;\n        }\n        if (init.hasOwnProperty(\"color\")) {\n            this._color = init[\"color\"];\n        }\n        if (init.hasOwnProperty(\"size\")) {\n            this._size = init[\"size\"];\n        }\n        if (init.hasOwnProperty(\"border\")) {\n            this._border = init[\"border\"];\n        }\n        if (init.hasOwnProperty(\"opacity\")) {\n            this._alpha = init[\"opacity\"];\n        }\n        if (init.hasOwnProperty(\"alpha\")) {\n            this._alphaMotion = init[\"alpha\"];\n        }\n        if (init.hasOwnProperty(\"font\")) {\n            this._font = init[\"font\"];\n        }\n        if (init.hasOwnProperty(\"x\")) {\n            this._x = init[\"x\"];\n        }\n        if (init.hasOwnProperty(\"y\")) {\n            this._y = init[\"y\"];\n        }\n        if (init.hasOwnProperty(\"shadow\")) {\n            this._shadow = init[\"shadow\"];\n        }\n        if (init.hasOwnProperty(\"position\")) {\n            if (init[\"position\"] === \"relative\") {\n                this.absolute = false;\n                if (this.mode < 7) {\n                    console.warn(\"Using relative position for CSA comment.\");\n                }\n            }\n        }\n    }\n    CoreComment.prototype.init = function (recycle) {\n        if (typeof recycle === \"undefined\") { recycle = null; }\n        if (recycle !== null) {\n            this.dom = recycle.dom;\n        } else {\n            this.dom = document.createElement(\"div\");\n        }\n        this.dom.className = this.parent.options.global.className;\n        this.dom.appendChild(document.createTextNode(this.text));\n        this.dom.textContent = this.text;\n        this.dom.innerText = this.text;\n        this.size = this._size;\n        if (this._color != 0xffffff) {\n            this.color = this._color;\n        }\n        this.shadow = this._shadow;\n        if (this._border) {\n            this.border = this._border;\n        }\n        if (this._font !== \"\") {\n            this.font = this._font;\n        }\n        if (this._x !== undefined) {\n            this.x = this._x;\n        }\n        if (this._y !== undefined) {\n            this.y = this._y;\n        }\n        if (this._alpha !== 1 || this.parent.options.global.opacity < 1) {\n            this.alpha = this._alpha;\n        }\n        if (this.motion.length > 0) {\n            this.animate();\n        }\n    };\n\n    Object.defineProperty(CoreComment.prototype, \"x\", {\n        get: function () {\n            if (this._x === null || this._x === undefined) {\n                if (this.align % 2 === 0) {\n                    this._x = this.dom.offsetLeft;\n                } else {\n                    this._x = this.parent.width - this.dom.offsetLeft - this.width;\n                }\n            }\n            if (!this.absolute) {\n                return this._x / this.parent.width;\n            }\n            return this._x;\n        },\n        set: function (x) {\n            this._x = x;\n            if (!this.absolute) {\n                this._x *= this.parent.width;\n            }\n            if (this.align % 2 === 0) {\n                this.dom.style.left = this._x + \"px\";\n            } else {\n                this.dom.style.right = this._x + \"px\";\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"y\", {\n        get: function () {\n            if (this._y === null || this._y === undefined) {\n                if (this.align < 2) {\n                    this._y = this.dom.offsetTop;\n                } else {\n                    this._y = this.parent.height - this.dom.offsetTop - this.height;\n                }\n            }\n            if (!this.absolute) {\n                return this._y / this.parent.height;\n            }\n            return this._y;\n        },\n        set: function (y) {\n            this._y = y;\n            if (!this.absolute) {\n                this._y *= this.parent.height;\n            }\n            if (this.align < 2) {\n                this.dom.style.top = this._y + \"px\";\n            } else {\n                this.dom.style.bottom = this._y + \"px\";\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"bottom\", {\n        get: function () {\n            return this.y + this.height;\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"right\", {\n        get: function () {\n            return this.x + this.width;\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"width\", {\n        get: function () {\n            if (this._width === null || this._width === undefined) {\n                this._width = this.dom.offsetWidth;\n            }\n            return this._width;\n        },\n        set: function (w) {\n            this._width = w;\n            this.dom.style.width = this._width + \"px\";\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"height\", {\n        get: function () {\n            if (this._height === null || this._height === undefined) {\n                this._height = this.dom.offsetHeight;\n            }\n            return this._height;\n        },\n        set: function (h) {\n            this._height = h;\n            this.dom.style.height = this._height + \"px\";\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"size\", {\n        get: function () {\n            return this._size;\n        },\n        set: function (s) {\n            this._size = s;\n            this.dom.style.fontSize = this._size + \"px\";\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"color\", {\n        get: function () {\n            return this._color;\n        },\n        set: function (c) {\n            this._color = c;\n            var color = c.toString(16);\n            color = color.length >= 6 ? color : new Array(6 - color.length + 1).join(\"0\") + color;\n            this.dom.style.color = \"#\" + color;\n            if (this._color === 0) {\n                this.dom.className = this.parent.options.global.className + \" rshadow\";\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"alpha\", {\n        get: function () {\n            return this._alpha;\n        },\n        set: function (a) {\n            this._alpha = a;\n            this.dom.style.opacity = Math.min(this._alpha, this.parent.options.global.opacity) + \"\";\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"border\", {\n        get: function () {\n            return this._border;\n        },\n        set: function (b) {\n            this._border = b;\n            if (this._border) {\n                this.dom.style.border = \"1px solid #00ffff\";\n            } else {\n                this.dom.style.border = \"none\";\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"shadow\", {\n        get: function () {\n            return this._shadow;\n        },\n        set: function (s) {\n            this._shadow = s;\n            if (!this._shadow) {\n                this.dom.className = this.parent.options.global.className + \" noshadow\";\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    Object.defineProperty(CoreComment.prototype, \"font\", {\n        get: function () {\n            return this._font;\n        },\n        set: function (f) {\n            this._font = f;\n            if (this._font.length > 0) {\n                this.dom.style.fontFamily = this._font;\n            } else {\n                this.dom.style.fontFamily = \"\";\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n\n\n\n\n\n\n\n\n\n\n    CoreComment.prototype.time = function (time) {\n        this.ttl -= time;\n        if (this.ttl < 0) {\n            this.ttl = 0;\n        }\n        if (this.movable) {\n            this.update();\n        }\n        if (this.ttl <= 0) {\n            this.finish();\n        }\n    };\n\n    CoreComment.prototype.update = function () {\n        this.animate();\n    };\n\n    CoreComment.prototype.invalidate = function () {\n        this._x = null;\n        this._y = null;\n        this._width = null;\n        this._height = null;\n    };\n\n    CoreComment.prototype._execMotion = function (currentMotion, time) {\n        for (var prop in currentMotion) {\n            if (currentMotion.hasOwnProperty(prop)) {\n                var m = currentMotion[prop];\n                this[prop] = m.easing(Math.min(Math.max(time - m.delay, 0), m.dur), m.from, m.to - m.from, m.dur);\n            }\n        }\n    };\n\n    CoreComment.prototype.animate = function () {\n        if (this._alphaMotion) {\n            this.alpha = (this.dur - this.ttl) * (this._alphaMotion[\"to\"] - this._alphaMotion[\"from\"]) / this.dur + this._alphaMotion[\"from\"];\n        }\n        if (this.motion.length === 0) {\n            return;\n        }\n        var ttl = Math.max(this.ttl, 0);\n        var time = (this.dur - ttl) - this._motionStart[this._curMotion];\n        this._execMotion(this.motion[this._curMotion], time);\n        if (this.dur - ttl > this._motionEnd[this._curMotion]) {\n            this._curMotion++;\n            if (this._curMotion >= this.motion.length) {\n                this._curMotion = this.motion.length - 1;\n            }\n            return;\n        }\n    };\n\n    CoreComment.prototype.finish = function () {\n        this.parent.finish(this);\n    };\n\n    CoreComment.prototype.toString = function () {\n        return [\"[\", this.stime, \"|\", this.ttl, \"/\", this.dur, \"]\", \"(\", this.mode, \")\", this.text].join(\"\");\n    };\n    CoreComment.LINEAR = function (t, b, c, d) {\n        return t * c / d + b;\n    };\n    return CoreComment;\n})();\n\nvar ScrollComment = (function (_super) {\n    __extends(ScrollComment, _super);\n    function ScrollComment(parent, data) {\n        _super.call(this, parent, data);\n        this.dur *= this.parent.options.scroll.scale;\n        this.ttl *= this.parent.options.scroll.scale;\n    }\n    Object.defineProperty(ScrollComment.prototype, \"alpha\", {\n        set: function (a) {\n            this._alpha = a;\n            this.dom.style.opacity = Math.min(Math.min(this._alpha, this.parent.options.global.opacity), this.parent.options.scroll.opacity) + \"\";\n        },\n        enumerable: true,\n        configurable: true\n    });\n\n    ScrollComment.prototype.init = function (recycle) {\n        if (typeof recycle === \"undefined\") { recycle = null; }\n        _super.prototype.init.call(this, recycle);\n        this.x = this.parent.width;\n        if (this.parent.options.scroll.opacity < 1) {\n            this.alpha = this._alpha;\n        }\n        this.absolute = true;\n    };\n\n    ScrollComment.prototype.update = function () {\n        this.x = (this.ttl / this.dur) * (this.parent.width + this.width) - this.width;\n    };\n    return ScrollComment;\n})(CoreComment);\n\n/** \n * Comment Filters Module Simplified (only supports modifiers & types)\n * @license MIT\n * @author Jim Chen\n */\nfunction CommentFilter(){\n\tthis.modifiers = [];\n\tthis.runtime = null;\n\tthis.allowTypes = {\n\t\t\"1\":true,\n\t\t\"4\":true,\n\t\t\"5\":true,\n\t\t\"6\":true,\n\t\t\"7\":true,\n\t\t\"8\":true,\n\t\t\"17\":true\n\t};\n\tthis.doModify = function(cmt){\n\t\tfor(var k=0;k<this.modifiers.length;k++){\n\t\t\tcmt = this.modifiers[k](cmt);\n\t\t}\n\t\treturn cmt;\n\t};\n\tthis.beforeSend = function(cmt){\n\t\treturn cmt;\n\t}\n\tthis.doValidate = function(cmtData){\n\t\tif(!this.allowTypes[cmtData.mode])\n\t\t\treturn false;\n\t\treturn true;\n\t};\n\tthis.addRule = function(rule){\n\t\t\n\t};\n\tthis.addModifier = function(f){\n\t\tthis.modifiers.push(f);\n\t};\n\tthis.runtimeFilter = function(cmt){\n\t\tif(this.runtime == null)\n\t\t\treturn cmt;\n\t\treturn this.runtime(cmt);\n\t};\n\tthis.setRuntimeFilter = function(f){\n\t\tthis.runtime = f;\n\t}\n}\n\n/*!\n * Comment Core Library CommentManager\n * @license MIT\n * @author Jim Chen\n * \n * Copyright (c) 2014 Jim Chen\n */\nvar CommentManager = (function() {\n\tvar getRotMatrix = function(yrot, zrot) {\n\t\t// Courtesy of @StarBrilliant, re-adapted to look better\n\t\tvar DEG2RAD = Math.PI/180;\n\t\tvar yr = yrot * DEG2RAD;\n\t\tvar zr = zrot * DEG2RAD;\n\t\tvar COS = Math.cos;\n\t\tvar SIN = Math.sin;\n\t\tvar matrix = [\n\t\t\tCOS(yr) * COS(zr)    , COS(yr) * SIN(zr)     , SIN(yr)  , 0,\n\t\t\t(-SIN(zr))           , COS(zr)               , 0        , 0,\n\t\t\t(-SIN(yr) * COS(zr)) , (-SIN(yr) * SIN(zr))  , COS(yr)  , 0,\n\t\t\t0                    , 0                     , 0        , 1\n\t\t];\n\t\t// CSS does not recognize scientific notation (e.g. 1e-6), truncating it.\n\t\tfor(var i = 0; i < matrix.length;i++){\n\t\t\tif(Math.abs(matrix[i]) < 0.000001){\n\t\t\t\tmatrix[i] = 0;\n\t\t\t}\n\t\t}\n\t\treturn \"matrix3d(\" + matrix.join(\",\") + \")\";\n\t};\n\t\n\tfunction CommentManager(stageObject){\n\t\tvar __timer = 0;\n\t\tthis._listeners = {};\n\t\tthis.stage = stageObject;\n\t\tthis.options = {\n\t\t\tglobal:{\n\t\t\t\topacity:1,\n\t\t\t\tscale:1,\n\t\t\t\tclassName:\"cmt\"\n\t\t\t},\n\t\t\tscroll:{\n\t\t\t\topacity:1,\n\t\t\t\tscale:1\n\t\t\t},\n\t\t\tlimit: 0\n\t\t};\n\t\tthis.timeline = [];\n\t\tthis.runline = [];\n\t\tthis.position = 0;\n\t\tthis.limiter = 0;\n\t\tthis.filter = null;\n\t\tthis.csa = {\n\t\t\tscroll: new CommentSpaceAllocator(0,0),\n\t\t\ttop:new AnchorCommentSpaceAllocator(0,0),\n\t\t\tbottom:new AnchorCommentSpaceAllocator(0,0),\n\t\t\treverse:new CommentSpaceAllocator(0,0),\n\t\t\tscrollbtm:new CommentSpaceAllocator(0,0)\n\t\t};\n\t\t/** Precompute the offset width **/\n\t\tthis.width = this.stage.offsetWidth;\n\t\tthis.height = this.stage.offsetHeight;\n\t\tthis.startTimer = function(){\n\t\t\tif(__timer > 0)\n\t\t\t\treturn;\n\t\t\tvar lastTPos = new Date().getTime();\n\t\t\tvar cmMgr = this;\n\t\t\t__timer = window.setInterval(function(){\n\t\t\t\tvar elapsed = new Date().getTime() - lastTPos;\n\t\t\t\tlastTPos = new Date().getTime();\n\t\t\t\tcmMgr.onTimerEvent(elapsed,cmMgr);\n\t\t\t},10);\n\t\t};\n\t\tthis.stopTimer = function(){\n\t\t\twindow.clearInterval(__timer);\n\t\t\t__timer = 0;\n\t\t};\n\t}\n\n\t/** Public **/\n\tCommentManager.prototype.stop = function(){\n\t\tthis.stopTimer();\n\t};\n\n\tCommentManager.prototype.start = function(){\n\t\tthis.startTimer();\n\t};\n\n\tCommentManager.prototype.seek = function(time){\n\t\tthis.position = BinArray.bsearch(this.timeline, time, function(a,b){\n\t\t\tif(a < b.stime) return -1\n\t\t\telse if(a > b.stime) return 1;\n\t\t\telse return 0;\n\t\t});\n\t};\n\n\tCommentManager.prototype.validate = function(cmt){\n\t\tif(cmt == null)\n\t\t\treturn false;\n\t\treturn this.filter.doValidate(cmt);\n\t};\n\n\tCommentManager.prototype.load = function(a){\n\t\tthis.timeline = a;\n\t\tthis.timeline.sort(function(a,b){\n\t\t\tif(a.stime > b.stime) return 2;\n\t\t\telse if(a.stime < b.stime) return -2;\n\t\t\telse{\n\t\t\t\tif(a.date > b.date) return 1;\n\t\t\t\telse if(a.date < b.date) return -1;\n\t\t\t\telse if(a.dbid != null && b.dbid != null){\n\t\t\t\t\tif(a.dbid > b.dbid) return 1;\n\t\t\t\t\telse if(a.dbid < b.dbid) return -1;\n\t\t\t\t\treturn 0;\n\t\t\t\t}else\n\t\t\t\t\treturn 0;\n\t\t\t}\n\t\t});\n\t\tthis.dispatchEvent(\"load\");\n\t};\n\n\tCommentManager.prototype.insert = function(c){\n\t\tvar index = BinArray.binsert(this.timeline, c, function(a,b){\n\t\t\tif(a.stime > b.stime) return 2;\n\t\t\telse if(a.stime < b.stime) return -2;\n\t\t\telse{\n\t\t\t\tif(a.date > b.date) return 1;\n\t\t\t\telse if(a.date < b.date) return -1;\n\t\t\t\telse if(a.dbid != null && b.dbid != null){\n\t\t\t\t\tif(a.dbid > b.dbid) return 1;\n\t\t\t\t\telse if(a.dbid < b.dbid) return -1;\n\t\t\t\t\treturn 0;\n\t\t\t\t}else\n\t\t\t\t\treturn 0;\n\t\t\t}\n\t\t});\n\t\tif(index <= this.position){\n\t\t\tthis.position++;\n\t\t}\n\t\tthis.dispatchEvent(\"insert\");\n\t};\n\n\tCommentManager.prototype.clear = function(){\n\t\twhile(this.runline.length > 0){\n\t\t\tthis.runline[0].finish();\n\t\t}\n\t\tthis.dispatchEvent(\"clear\");\n\t};\n\n\tCommentManager.prototype.setBounds = function(){\n\t\tthis.width = this.stage.offsetWidth;\n\t\tthis.height= this.stage.offsetHeight;\n\t\tthis.dispatchEvent(\"resize\");\n\t\tfor(var comAlloc in this.csa){\n\t\t\tthis.csa[comAlloc].setBounds(this.width,this.height);\n\t\t}\n\t\t// Update 3d perspective\n\t\tthis.stage.style.perspective = this.width * Math.tan(40 * Math.PI/180) / 2 + \"px\";\n\t\tthis.stage.style.webkitPerspective = this.width * Math.tan(40 * Math.PI/180) / 2 + \"px\";\n\t};\n\tCommentManager.prototype.init = function(){\n\t\tthis.setBounds();\n\t\tif(this.filter == null)\n\t\t\tthis.filter = new CommentFilter(); //Only create a filter if none exist\n\t};\n\tCommentManager.prototype.time = function(time){\n\t\ttime = time - 1;\n\t\tif(this.position >= this.timeline.length || Math.abs(this.lastPos - time) >= 2000){\n\t\t\tthis.seek(time);\n\t\t\tthis.lastPos = time;\n\t\t\tif(this.timeline.length <= this.position)\n\t\t\t\treturn;\n\t\t}else{\n\t\t\tthis.lastPos = time;\n\t\t}\n\t\tfor(;this.position < this.timeline.length;this.position++){\n\t\t\tif(this.options.limit > 0 && this.runline.length > this.limiter) break;\n\t\t\tif(this.validate(this.timeline[this.position]) && this.timeline[this.position]['stime']<=time){\n\t\t\t\tthis.send(this.timeline[this.position]);\n\t\t\t}else{\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t};\n\tCommentManager.prototype.rescale = function(){\n\t\n\t};\n\tCommentManager.prototype.send = function(data){\n\t\tif(data.mode === 8){\n\t\t\tconsole.log(data);\n\t\t\tif(this.scripting){\n\t\t\t\tconsole.log(this.scripting.eval(data.code));\n\t\t\t}\n\t\t\treturn;\n\t\t}\n\t\tif(this.filter != null){\n\t\t\tdata = this.filter.doModify(data);\n\t\t\tif(data == null) return;\n\t\t}\n\t\tif(data.mode === 1 || data.mode === 2 || data.mode === 6){\n\t\t\tvar cmt = new ScrollComment(this, data);\n\t\t}else{\n\t\t\tvar cmt = new CoreComment(this, data);\n\t\t}\n\t\tswitch(cmt.mode){\n\t\t\tcase 1:cmt.align = 0;break;\n\t\t\tcase 2:cmt.align = 2;break;\n\t\t\tcase 4:cmt.align = 2;break;\n\t\t\tcase 5:cmt.align = 0;break;\n\t\t\tcase 6:cmt.align = 1;break;\n\t\t}\n\t\tcmt.init();\n\t\tthis.stage.appendChild(cmt.dom);\n\t\tswitch(cmt.mode){\n\t\t\tdefault:\n\t\t\tcase 1:{this.csa.scroll.add(cmt);}break;\n\t\t\tcase 2:{this.csa.scrollbtm.add(cmt);}break;\n\t\t\tcase 4:{this.csa.bottom.add(cmt);}break;\n\t\t\tcase 5:{this.csa.top.add(cmt);}break;\n\t\t\tcase 6:{this.csa.reverse.add(cmt);}break;\n\t\t\tcase 17:\n\t\t\tcase 7:{\n\t\t\t\tif(data.rY !== 0 || data.rZ !== 0){\n\t\t\t\t\t/** TODO: revise when browser manufacturers make up their mind on Transform APIs **/\n\t\t\t\t\tcmt.dom.style.transform = getRotMatrix(data.rY, data.rZ);\n\t\t\t\t\tcmt.dom.style.webkitTransform = getRotMatrix(data.rY, data.rZ);\n\t\t\t\t\tcmt.dom.style.OTransform = getRotMatrix(data.rY, data.rZ);\n\t\t\t\t\tcmt.dom.style.MozTransform = getRotMatrix(data.rY, data.rZ);\n\t\t\t\t\tcmt.dom.style.MSTransform = getRotMatrix(data.rY, data.rZ);\n\t\t\t\t}\n\t\t\t}break;\n\t\t}\n\t\tcmt.y = cmt.y;\n\t\tthis.dispatchEvent(\"enterComment\", cmt);\n\t\tthis.runline.push(cmt);\n\t};\n\tCommentManager.prototype.sendComment = function(data){\n\t\tconsole.log(\"CommentManager.sendComment is deprecated. Please use send instead\");\n\t\tthis.send(data); // Wrapper for Backwards Compatible APIs\n\t};\n\tCommentManager.prototype.finish = function(cmt){\n\t\tthis.dispatchEvent(\"exitComment\", cmt);\n\t\tthis.stage.removeChild(cmt.dom);\n\t\tvar index = this.runline.indexOf(cmt);\n\t\tif(index >= 0){\n\t\t\tthis.runline.splice(index, 1);\n\t\t}\n\t\tswitch(cmt.mode){\n\t\t\tdefault:\n\t\t\tcase 1:{this.csa.scroll.remove(cmt);}break;\n\t\t\tcase 2:{this.csa.scrollbtm.remove(cmt);}break;\n\t\t\tcase 4:{this.csa.bottom.remove(cmt);}break;\n\t\t\tcase 5:{this.csa.top.remove(cmt);}break;\n\t\t\tcase 6:{this.csa.reverse.remove(cmt);}break;\n\t\t\tcase 7:break;\n\t\t}\n\t};\n\tCommentManager.prototype.addEventListener = function(event, listener){\n\t\tif(typeof this._listeners[event] !== \"undefined\"){\n\t\t\tthis._listeners[event].push(listener);\n\t\t}else{\n\t\t\tthis._listeners[event] = [listener];\n\t\t}\n\t};\n\tCommentManager.prototype.dispatchEvent = function(event, data){\n\t\tif(typeof this._listeners[event] !== \"undefined\"){\n\t\t\tfor(var i = 0; i < this._listeners[event].length; i++){\n\t\t\t\ttry{\n\t\t\t\t\tthis._listeners[event][i](data);\n\t\t\t\t}catch(e){\n\t\t\t\t\tconsole.err(e.stack);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\t/** Static Functions **/\n\tCommentManager.prototype.onTimerEvent = function(timePassed,cmObj){\n\t\tfor(var i= 0;i < cmObj.runline.length; i++){\n\t\t\tvar cmt = cmObj.runline[i];\n\t\t\tif(cmt.hold){\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\tcmt.time(timePassed);\n\t\t}\n\t};\n\treturn CommentManager;\n})();\n\n/** \nAcFun Format\nLicensed Under MIT License\n An alternative format comment parser\n**/\nfunction AcfunParser(jsond){\n\tvar list = [];\n\ttry{\n\t\tvar jsondt = JSON.parse(jsond);\n\t}catch(e){\n\t\tconsole.log('Error: Could not parse json list!');\n\t\treturn [];\n\t}\n\tfor(var i=0;i<jsondt.length;i++){\n\t\t//Read each comment and generate a correct comment object\n\t\tvar data = {};\n\t\tvar xc = jsondt[i]['c'].split(',');\n\t\tif(xc.length > 0){\n\t\t\tdata.stime = parseFloat(xc[0]) * 1000;\n\t\t\tdata.color = parseInt(xc[1])\n\t\t\tdata.mode = parseInt(xc[2]);\n\t\t\tdata.size = parseInt(xc[3]);\n\t\t\tdata.hash = xc[4];\n\t\t\tdata.date = parseInt(xc[5]);\n\t\t\tdata.position = \"absolute\";\n\t\t\tif(data.mode != 7){\n\t\t\t\tdata.text = jsondt[i].m.replace(/(\\/n|\\\\n|\\n|\\r\\n|\\\\r)/g,\"\\n\");\n\t\t\t\tdata.text = data.text.replace(/\\r/g,\"\\n\");\n\t\t\t\tdata.text = data.text.replace(/\\s/g,\"\\u00a0\");\n\t\t\t}else{\n\t\t\t\tdata.text = jsondt[i].m;\n\t\t\t}\n\t\t\tif(data.mode == 7){\n\t\t\t\t//High level positioned dm\n\t\t\t\ttry{\n\t\t\t\t\tvar x = JSON.parse(data.text);\n\t\t\t\t}catch(e){\n\t\t\t\t\tconsole.log('[Err] Error parsing internal data for comment');\n\t\t\t\t\tconsole.log('[Dbg] ' + data.text);\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\tdata.position = \"relative\";\n\t\t\t\tdata.text = x.n; /*.replace(/\\r/g,\"\\n\");*/\n\t\t\t\tdata.text = data.text.replace(/\\ /g,\"\\u00a0\");\n\t\t\t\tconsole.log(data.text);\n\t\t\t\tif(x.a != null){\n\t\t\t\t\tdata.opacity = x.a;\n\t\t\t\t}else{\n\t\t\t\t\tdata.opacity = 1;\n\t\t\t\t}\n\t\t\t\tif(x.p != null){\n\t\t\t\t\tdata.x = x.p.x / 1000; // relative position\n\t\t\t\t\tdata.y = x.p.y / 1000;\n\t\t\t\t}else{\n\t\t\t\t\tdata.x = 0;\n\t\t\t\t\tdata.y = 0;\n\t\t\t\t}\n\t\t\t\tdata.shadow = x.b;\n\t\t\t\tdata.dur = 4000;\n\t\t\t\tif(x.l != null)\n\t\t\t\t\tdata.moveDelay = x.l * 1000;\n\t\t\t\tif(x.z != null && x.z.length > 0){\n\t\t\t\t\tdata.movable = true;\n\t\t\t\t\tdata.motion = [];\n\t\t\t\t\tvar moveDuration = 0;\n\t\t\t\t\tvar last = {x:data.x, y:data.y, alpha:data.opacity, color:data.color};\n\t\t\t\t\tfor(var m = 0; m < x.z.length; m++){\n\t\t\t\t\t\tvar dur = x.z[m].l != null ? (x.z[m].l * 1000) : 500;\n\t\t\t\t\t\tmoveDuration += dur;\n\t\t\t\t\t\tvar motion = {\n\t\t\t\t\t\t\tx:{from:last.x, to:x.z[m].x/1000, dur: dur, delay: 0},\n\t\t\t\t\t\t\ty:{from:last.y, to:x.z[m].y/1000, dur: dur, delay: 0}\n\t\t\t\t\t\t};\n\t\t\t\t\t\tlast.x = motion.x.to;\n\t\t\t\t\t\tlast.y = motion.y.to;\n\t\t\t\t\t\tif(x.z[m].t !== last.alpha){\n\t\t\t\t\t\t\tmotion.alpha = {from:last.alpha, to:x.z[m].t, dur: dur, delay: 0};\n\t\t\t\t\t\t\tlast.alpha = motion.alpha.to;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif(x.z[m].c != null && x.z[m].c !== last.color){\n\t\t\t\t\t\t\tmotion.color = {from:last.color, to:x.z[m].c, dur: dur, delay: 0};\n\t\t\t\t\t\t\tlast.color = motion.color.to;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdata.motion.push(motion);\n\t\t\t\t\t}\n\t\t\t\t\tdata.dur = moveDuration + (data.moveDelay ? data.moveDelay : 0);\n\t\t\t\t}\n\t\t\t\tif(x.r != null && x.k != null){\n\t\t\t\t\tdata.rX = x.r;\n\t\t\t\t\tdata.rY = x.k;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t}\n\t\t\tlist.push(data);\n\t\t}\n\t}\n\treturn list;\n}\n\n/** \nBilibili Format\nLicensed Under MIT License\n Takes in an XMLDoc/LooseXMLDoc and parses that into a Generic Comment List\n**/\nfunction BilibiliParser(xmlDoc, text, warn){\t\n\tfunction format(string){\n\t\t//Format the bili output to be json-valid\n\t\treturn string.replace(/\\t/,\"\\\\t\");\t\n\t}\n\t\n\tif(xmlDoc !== null){\n\t\tvar elems = xmlDoc.getElementsByTagName('d');\n\t}else{\n\t\tif(!document || !document.createElement){\n\t\t\t//Maybe we are in a restricted context\n\t\t\treturn [];\n\t\t}\n\t\tif(warn){\n\t\t\tif(!confirm(\"XML Parse Error. \\n Allow tag soup parsing?\\n[WARNING: This is unsafe.]\")){\n\t\t\t\treturn [];\n\t\t\t}\n\t\t}else{\n\t\t\t// clobber some potentially bad things\n\t\t\ttext = text.replace(new RegExp(\"</([^d])\",\"g\"), \"</disabled $1\");\n\t\t\ttext = text.replace(new RegExp(\"</(\\S{2,})\",\"g\"), \"</disabled $1\");\n\t\t\ttext = text.replace(new RegExp(\"<([^d/]\\W*?)\",\"g\"), \"<disabled $1\");\n\t\t\ttext = text.replace(new RegExp(\"<([^/ ]{2,}\\W*?)\",\"g\"), \"<disabled $1\");\n\t\t}\n\t\tvar tmp = document.createElement(\"div\");\n\t\ttmp.innerHTML = text;\n\t\tvar elems = tmp.getElementsByTagName('d');\n\t}\n\t\n\tvar tlist = [];\n\tfor(var i=0;i < elems.length;i++){\n\t\tif(elems[i].getAttribute('p') != null){\n\t\t\tvar opt = elems[i].getAttribute('p').split(',');\n\t\t\tif(!elems[i].childNodes[0])\n\t\t\t  continue;\n\t\t\tvar text = elems[i].childNodes[0].nodeValue;\n\t\t\tvar obj = {};\n\t\t\tobj.stime = Math.round(parseFloat(opt[0])*1000);\n\t\t\tobj.size = parseInt(opt[2]);\n\t\t\tobj.color = parseInt(opt[3]);\n\t\t\tobj.mode = parseInt(opt[1]);\n\t\t\tobj.date = parseInt(opt[4]);\n\t\t\tobj.pool = parseInt(opt[5]);\n\t\t\tobj.position = \"absolute\";\n\t\t\tif(opt[7] != null)\n\t\t\t\tobj.dbid = parseInt(opt[7]);\n\t\t\tobj.hash = opt[6];\n\t\t\tobj.border = false;\n\t\t\tif(obj.mode < 7){\n\t\t\t\tobj.text = text.replace(/(\\/n|\\\\n|\\n|\\r\\n)/g, \"\\n\");\n\t\t\t}else{\n\t\t\t\tif(obj.mode == 7){\n\t\t\t\t\ttry{\n\t\t\t\t\t\tadv = JSON.parse(format(text));\n\t\t\t\t\t\tobj.shadow = true;\n\t\t\t\t\t\tobj.x = parseFloat(adv[0]);\n\t\t\t\t\t\tobj.y = parseFloat(adv[1]);\n\t\t\t\t\t\tif(Math.floor(obj.x) < obj.x || Math.floor(obj.y) < obj.y){\n\t\t\t\t\t\t\tobj.position = \"relative\";\n\t\t\t\t\t\t}\n\t\t\t\t\t\tobj.text = adv[4].replace(/(\\/n|\\\\n|\\n|\\r\\n)/g, \"\\n\");\n\t\t\t\t\t\tobj.rZ = 0;\n\t\t\t\t\t\tobj.rY = 0;\n\t\t\t\t\t\tif(adv.length >= 7){\n\t\t\t\t\t\t\tobj.rZ = parseInt(adv[5], 10);\n\t\t\t\t\t\t\tobj.rY = parseInt(adv[6], 10);\n\t\t\t\t\t\t}\n\t\t\t\t\t\tobj.motion = [];\n\t\t\t\t\t\tobj.movable = false;\n\t\t\t\t\t\tif(adv.length >= 11){\n\t\t\t\t\t\t\tobj.movable = true;\n\t\t\t\t\t\t\tvar singleStepDur = 500;\n\t\t\t\t\t\t\tvar motion = {\n\t\t\t\t\t\t\t\tx:{from: obj.x, to:parseFloat(adv[7]), dur:singleStepDur, delay:0},\n\t\t\t\t\t\t\t\ty:{from: obj.y, to:parseFloat(adv[8]), dur:singleStepDur, delay:0},\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\tif(adv[9] !== ''){\n\t\t\t\t\t\t\t\tsingleStepDur = parseInt(adv[9], 10);\n\t\t\t\t\t\t\t\tmotion.x.dur = singleStepDur;\n\t\t\t\t\t\t\t\tmotion.y.dur = singleStepDur;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif(adv[10] !== ''){\n\t\t\t\t\t\t\t\tmotion.x.delay = parseInt(adv[10], 10);\n\t\t\t\t\t\t\t\tmotion.y.delay = parseInt(adv[10], 10);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif(adv.length > 11){\n\t\t\t\t\t\t\t\tobj.shadow = adv[11];\n\t\t\t\t\t\t\t\tif(obj.shadow === \"true\"){\n\t\t\t\t\t\t\t\t\tobj.shadow = true;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif(obj.shadow === \"false\"){\n\t\t\t\t\t\t\t\t\tobj.shadow = false;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif(adv[12] != null){\n\t\t\t\t\t\t\t\t\tobj.font = adv[12];\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif(adv.length > 14){\n\t\t\t\t\t\t\t\t\t// Support for Bilibili Advanced Paths\n\t\t\t\t\t\t\t\t\tif(obj.position === \"relative\"){\n\t\t\t\t\t\t\t\t\t\tconsole.log(\"Cannot mix relative and absolute positioning\");\n\t\t\t\t\t\t\t\t\t\tobj.position = \"absolute\";\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\tvar path = adv[14];\n\t\t\t\t\t\t\t\t\tvar lastPoint = {x:motion.x.from, y:motion.y.from};\n\t\t\t\t\t\t\t\t\tvar pathMotion = [];\n\t\t\t\t\t\t\t\t\tvar regex = new RegExp(\"([a-zA-Z])\\\\s*(\\\\d+)[, ](\\\\d+)\",\"g\");\n\t\t\t\t\t\t\t\t\tvar counts = path.split(/[a-zA-Z]/).length - 1;\n\t\t\t\t\t\t\t\t\tvar m = regex.exec(path);\n\t\t\t\t\t\t\t\t\twhile(m !== null){\n\t\t\t\t\t\t\t\t\t\tswitch(m[1]){\n\t\t\t\t\t\t\t\t\t\t\tcase \"M\":{\n\t\t\t\t\t\t\t\t\t\t\t\tlastPoint.x = parseInt(m[2],10);\n\t\t\t\t\t\t\t\t\t\t\t\tlastPoint.y = parseInt(m[3],10);\n\t\t\t\t\t\t\t\t\t\t\t}break;\n\t\t\t\t\t\t\t\t\t\t\tcase \"L\":{\n\t\t\t\t\t\t\t\t\t\t\t\tpathMotion.push({\n\t\t\t\t\t\t\t\t\t\t\t\t\t\"x\":{\"from\":lastPoint.x, \"to\":parseInt(m[2],10), \"dur\": singleStepDur / counts, \"delay\": 0},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\"y\":{\"from\":lastPoint.y, \"to\":parseInt(m[3],10), \"dur\": singleStepDur / counts, \"delay\": 0}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\tlastPoint.x = parseInt(m[2],10);\n\t\t\t\t\t\t\t\t\t\t\t\tlastPoint.y = parseInt(m[3],10);\n\t\t\t\t\t\t\t\t\t\t\t}break;\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\tm = regex.exec(path);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\tmotion = null;\n\t\t\t\t\t\t\t\t\tobj.motion = pathMotion;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif(motion !== null){\n\t\t\t\t\t\t\t\tobj.motion.push(motion);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tobj.dur = 2500;\n\t\t\t\t\t\tif(adv[3] < 12){\n\t\t\t\t\t\t\tobj.dur = adv[3] * 1000;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tvar tmp = adv[2].split('-');\n\t\t\t\t\t\tif(tmp != null && tmp.length>1){\n\t\t\t\t\t\t\tvar alphaFrom = parseFloat(tmp[0]);\n\t\t\t\t\t\t\tvar alphaTo = parseFloat(tmp[1]);\n\t\t\t\t\t\t\tobj.opacity = alphaFrom;\n\t\t\t\t\t\t\tif(alphaFrom !== alphaTo){\n\t\t\t\t\t\t\t\tobj.alpha = {from:alphaFrom, to:alphaTo}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}catch(e){\n\t\t\t\t\t\tconsole.log('[Err] Error occurred in JSON parsing');\n\t\t\t\t\t\tconsole.log('[Dbg] ' + text);\n\t\t\t\t\t}\n\t\t\t\t}else if(obj.mode == 8){\n\t\t\t\t\tobj.code = text; //Code comments are special\n\t\t\t\t}\n\t\t\t}\n\t\t\tif(obj.text != null)\n\t\t\t\tobj.text = obj.text.replace(/\\u25a0/g,\"\\u2588\");\n\t\t\ttlist.push(obj);\n\t\t}\n\t}\n\treturn tlist;\n}\n"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".abp{\n  position:relative;\n}\n.abp .container{\n  -webkit-transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);\n          transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);\n  position: absolute;\n  display: block;\n  overflow: hidden;\n  margin: 0;\n  border: 0;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 9999;\n  touch-callout: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.abp .container .cmt{\n  -webkit-transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);\n          transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);\n  -webkit-transform-origin: 0% 0%;\n      -ms-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  position: absolute;\n  padding: 3px 0 0 0;\n  margin: 0;\n  color: #fff;\n  font-family: SimHei, SimSun, Heiti, \"MS Mincho\", \"Meiryo\", \"Microsoft YaHei\", monospace;\n  font-size: 25px;\n  text-decoration: none;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n  -webkit-text-size-adjust: none;\n      -ms-text-size-adjust: none;\n          text-size-adjust: none;\n  line-height: 100%;\n  letter-spacing: 0;\n  word-break: keep-all;\n  white-space: pre;\n\n}\n.abp .container .cmt.noshadow{\n  text-shadow: none;\n}\n.abp .container .cmt.rshadow{\n  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;\n}\n\n/** Aliases for Chinese named fonts because they don't work on *nix **/\n@font-face{\n  font-family: \"\\9ED1\\4F53\";\n  src:local('SimHei');\n}\n\n@font-face{\n  font-family: \"\\5B8B\\4F53\";\n  src:local('SimSun');\n}\n\n@font-face{\n  font-family: \"\\534E\\6587\\6977\\4F53\";\n  src:local('SimKai');\n}\n\n@font-face{\n  font-family: \"\\5E7C\\5706\";\n  src:local('YouYuan');\n}\n\n@font-face{\n  font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n  src:local('Microsoft YaHei');\n}\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./colorpicker.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./colorpicker.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "/* Common stuff */\n.picker-wrapper,\n.slide-wrapper {\n    position: relative;\n    float: left;\n}\n.picker-indicator,\n.slide-indicator {\n    position: absolute;\n    left: 0;\n    top: 0;\n    pointer-events: none;\n}\n.picker,\n.slide {\n    cursor: crosshair;\n    float: left;\n}\n\n/* Default skin */\n\n.cp-default {\n    background-color: gray;\n    padding: 12px;\n    box-shadow: 0 0 40px #000;\n    border-radius: 15px;\n    float: left;\n}\n.cp-default .picker {\n    width: 200px;\n    height: 200px;\n}\n.cp-default .slide {\n    width: 30px;\n    height: 200px;\n}\n.cp-default .slide-wrapper {\n    margin-left: 10px;\n}\n.cp-default .picker-indicator {\n    width: 5px;\n    height: 5px;\n    border: 2px solid darkblue;\n    -moz-border-radius: 4px;\n    -o-border-radius: 4px;\n    -webkit-border-radius: 4px;\n    border-radius: 4px;\n    opacity: .5;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\";\n    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);\n    filter: alpha(opacity=50);\n    background-color: white;\n}\n.cp-default .slide-indicator {\n    width: 100%;\n    height: 10px;\n    left: -4px;\n    opacity: .6;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)\";\n    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n    filter: alpha(opacity=60);\n    border: 4px solid lightblue;\n    -moz-border-radius: 4px;\n    -o-border-radius: 4px;\n    -webkit-border-radius: 4px;\n    border-radius: 4px;\n    background-color: white;\n}\n\n/* io */\n.cp-io {\n  width: 150px;\n  height: 224px;\n  margin-left: 10px;\n  float: left;\n  border: 1px solid #ccc;\n  background: #fff;\n}\n.cp-io ul {\n  padding: 0 10px 0 10px;\n  margin-top: 8px;\n  list-style: none;\n}\n.cp-io ul li {\n  padding-bottom: 5px;\n  margin-bottom: 10px;\n  border-bottom: 1px dashed #ccc;\n}\n.cp-io ul li:last-child {\n  border-bottom: none;\n}\n.cp-io p {\n  margin: 5px 0;\n}\n.cp-io label {\n  width: 30px;\n  display: inline-block;\n}\n.cp-io input {\n  width: 90px;\n}\n", ""]);

	// exports


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./emitter.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./emitter.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "textarea:focus, input:focus {\n  outline: 0;\n}\n\n.abp {\n  width: 100%;\n  min-height: 100%;\n  position: absolute !important;\n  top: 0;\n  left: 0;\n}\n\n#biu-comment-stage {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n}\n\n.emitter {\n  width: 500px;\n  height: 45px;\n  padding: 5px 10px;\n  border: 1px solid #666;\n  border-radius: 5px;\n  position: absolute;\n  bottom: 40px;\n  left: calc(50% - 255px);\n}\n\n.emitter .emitter-color {\n  width: 40px;\n  height: 40px;\n  background: #fff;\n  border: 1px solid #ccc;\n  display: inline-block;\n  cursor: pointer;\n  float: left;\n}\n\n.emitter .emitter-color-wrap {\n  position: absolute;\n  left: 0;\n  bottom: 65px;\n  display: none;\n}\n\n.emitter .emitter-input-wrap {\n  width: 350px;\n  height: 40px;\n  float: left;\n}\n\n.emitter .emitter-input-wrap input {\n  width: calc(100% - 85px);\n  height: 28px;\n  line-height: 40px;\n  padding: 5px 10px;\n  margin-left: 10px;\n  float: left;\n}\n\n.emitter .emitter-input-wrap button {\n  width: 50px;\n  height: 42px;\n  line-height: 40px;\n  border: 1px solid transparent;\n  text-align: center;\n  background-color: #1ab394;\n  border-color: #1ab394;\n  color: #FFF;\n  border-radius: 0 3px 3px 0;\n  font-size: 16px;\n}\n\n.emitter .memitter-input-wrap button:hover {\n  background-color: #18a689;\n  border-color: #18a689;\n  color: #FFFFFF;\n}\n\n.emitter .emitter-text-modal, .emitter .emitter-text {\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n  margin-right: 10px;\n  background: #fff;\n  border: 1px solid #ccc;\n  display: inline-block;\n  cursor: pointer;\n  float: left;\n  font-size: 30px;\n  color: #999;\n  text-align: center;\n}\n\n.emitter .emitter-text-wrap {\n  position: absolute;\n  left: 0;\n  bottom: 65px;\n  display: none;\n}\n\n.emitter .emitter-modal {\n  width: 300px;\n  border: 1px solid #ccc;\n  color: #999;\n  font-size: 14px;\n}\n\n.emitter .emitter-modal-title {\n  line-height: 30px;\n  padding: 0 10px;\n  border-bottom: 1px solid #ccc;\n}\n\n.emitter .emitter-modal-close {\n  float: right;\n  cursor: pointer;\n}\n\n.emitter .emitter-modal-content {\n  padding: 10px;\n}\n\n.emitter .emitter-modal p {\n  margin: 5px 0 10px 0;\n}\n\n.emitter .fonts {\n  margin-right: 10px;\n  cursor: pointer;\n  vertical-align: top;\n}\n\n.emitter .fonts.active {\n  background: #AACEFF;\n}\n\n.emitter .fz-36 {\n  font-size: 36px;\n}\n\n.emitter .fz-45 {\n  font-size: 45px;\n}\n\n.emitter .emitter-modal ul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  display: inline-block;\n}\n\n.emitter .emitter-modal ul li {\n  width: 60px;\n  float: left;\n  margin-right: 13px;\n}\n\n.emitter .emitter-modal li p {\n  font-size: 12px;\n  text-align: center;\n}\n\n.emitter .emitter-modal .mode-box {\n  width: 60px;\n  height: 40px;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n}\n\n.emitter .emitter-modal .mode-box.active, .emitter .emitter-modal .mode-box:hover {\n  border-color: #333;\n}\n\n.emitter .mode-box.active .dashed, .emitter .mode-box:hover .dashed {\n  border-color: #333;\n}\n\n.emitter .mode-box .dashed {\n  width: 30px;\n  height: 0;\n  border-bottom: 2px dashed #ccc;\n  display: inline-block;\n  position: absolute;\n}\n\n.emitter .mode-box .dashed.top-right {\n  top: 10px;\n  right: -30px;\n  animation: left2right 2s linear infinite;\n}\n\n.emitter .mode-box .dashed.bottom-right {\n  bottom: 10px;\n  right: -30px;\n  animation: left2right 2s linear infinite;\n}\n\n.emitter .mode-box .dashed.top {\n  top: 10px;\n  right: 15px;\n}\n\n.emitter .mode-box .dashed.bottom {\n  bottom: 10px;\n  right: 15px;\n}\n\n.emitter .margin-right-0 {\n  margin-right: 0!important;\n}\n\n.emitter .emitter-text {\n  position: relative;\n}\n\n.emitter .overline {\n  width: 58px;\n  height: 0;\n  border-bottom: 2px solid #ccc;\n  display: inline-block;\n  position: absolute;\n  top: 19px;\n  left: -9px;\n  transform: rotate(-45deg);\n  display: none;\n}\n\n@-webkit-keyframes left2right {\n  from {\n    right: -30px;\n  }\n  to {\n    right: 70px;\n  }\n}\n", ""]);

	// exports


/***/ },
/* 16 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {(function (exports, ByteArray, global) {
	  var Protocol = exports;

	  var PKG_HEAD_BYTES = 4;
	  var MSG_FLAG_BYTES = 1;
	  var MSG_ROUTE_CODE_BYTES = 2;
	  var MSG_ID_MAX_BYTES = 5;
	  var MSG_ROUTE_LEN_BYTES = 1;

	  var MSG_ROUTE_CODE_MAX = 0xffff;

	  var MSG_COMPRESS_ROUTE_MASK = 0x1;
	  var MSG_COMPRESS_GZIP_MASK = 0x1;
	  var MSG_COMPRESS_GZIP_ENCODE_MASK = 1 << 4;
	  var MSG_TYPE_MASK = 0x7;

	  var Package = Protocol.Package = {};
	  var Message = Protocol.Message = {};

	  Package.TYPE_HANDSHAKE = 1;
	  Package.TYPE_HANDSHAKE_ACK = 2;
	  Package.TYPE_HEARTBEAT = 3;
	  Package.TYPE_DATA = 4;
	  Package.TYPE_KICK = 5;

	  Message.TYPE_REQUEST = 0;
	  Message.TYPE_NOTIFY = 1;
	  Message.TYPE_RESPONSE = 2;
	  Message.TYPE_PUSH = 3;

	  /**
	   * pomele client encode
	   * id message id;
	   * route message route
	   * msg message body
	   * socketio current support string
	   */
	  Protocol.strencode = function(str) {
	    if(typeof Buffer !== "undefined" && ByteArray === Buffer) {
	      // encoding defaults to 'utf8'
	      return (new Buffer(str));
	    } else {
	      var byteArray = new ByteArray(str.length * 3);
	      var offset = 0;
	      for(var i = 0; i < str.length; i++){
	        var charCode = str.charCodeAt(i);
	        var codes = null;
	        if(charCode <= 0x7f){
	          codes = [charCode];
	        }else if(charCode <= 0x7ff){
	          codes = [0xc0|(charCode>>6), 0x80|(charCode & 0x3f)];
	        }else{
	          codes = [0xe0|(charCode>>12), 0x80|((charCode & 0xfc0)>>6), 0x80|(charCode & 0x3f)];
	        }
	        for(var j = 0; j < codes.length; j++){
	          byteArray[offset] = codes[j];
	          ++offset;
	        }
	      }
	      var _buffer = new ByteArray(offset);
	      copyArray(_buffer, 0, byteArray, 0, offset);
	      return _buffer;
	    }
	  };

	  /**
	   * client decode
	   * msg String data
	   * return Message Object
	   */
	  Protocol.strdecode = function(buffer) {
	    if(typeof Buffer !== "undefined" && ByteArray === Buffer) {
	      // encoding defaults to 'utf8'
	      return buffer.toString();
	    } else {
	      var bytes = new ByteArray(buffer);
	      var array = [];
	      var offset = 0;
	      var charCode = 0;
	      var end = bytes.length;
	      while(offset < end){
	        if(bytes[offset] < 128){
	          charCode = bytes[offset];
	          offset += 1;
	        }else if(bytes[offset] < 224){
	          charCode = ((bytes[offset] & 0x1f)<<6) + (bytes[offset+1] & 0x3f);
	          offset += 2;
	        }else{
	          charCode = ((bytes[offset] & 0x0f)<<12) + ((bytes[offset+1] & 0x3f)<<6) + (bytes[offset+2] & 0x3f);
	          offset += 3;
	        }
	        array.push(charCode);
	      }
	      return String.fromCharCode.apply(null, array);
	    }
	  };

	  /**
	   * Package protocol encode.
	   *
	   * Pomelo package format:
	   * +------+-------------+------------------+
	   * | type | body length |       body       |
	   * +------+-------------+------------------+
	   *
	   * Head: 4bytes
	   *   0: package type,
	   *      1 - handshake,
	   *      2 - handshake ack,
	   *      3 - heartbeat,
	   *      4 - data
	   *      5 - kick
	   *   1 - 3: big-endian body length
	   * Body: body length bytes
	   *
	   * @param  {Number}    type   package type
	   * @param  {ByteArray} body   body content in bytes
	   * @return {ByteArray}        new byte array that contains encode result
	   */
	  Package.encode = function(type, body){
	    var length = body ? body.length : 0;
	    var buffer = new ByteArray(PKG_HEAD_BYTES + length);
	    var index = 0;
	    buffer[index++] = type & 0xff;
	    buffer[index++] = (length >> 16) & 0xff;
	    buffer[index++] = (length >> 8) & 0xff;
	    buffer[index++] = length & 0xff;
	    if(body) {
	      copyArray(buffer, index, body, 0, length);
	    }
	    return buffer;
	  };

	  /**
	   * Package protocol decode.
	   * See encode for package format.
	   *
	   * @param  {ByteArray} buffer byte array containing package content
	   * @return {Object}           {type: package type, buffer: body byte array}
	   */
	  Package.decode = function(buffer){
	    var offset = 0;
	    var bytes = new ByteArray(buffer);
	    var length = 0;
	    var rs = [];
	    while(offset < bytes.length) {
	      var type = bytes[offset++];
	      length = ((bytes[offset++]) << 16 | (bytes[offset++]) << 8 | bytes[offset++]) >>> 0;
	      var body = length ? new ByteArray(length) : null;
	      if(body) {
	        copyArray(body, 0, bytes, offset, length);
	      }
	      offset += length;
	      rs.push({'type': type, 'body': body});
	    }
	    return rs.length === 1 ? rs[0]: rs;
	  };

	  /**
	   * Message protocol encode.
	   *
	   * @param  {Number} id            message id
	   * @param  {Number} type          message type
	   * @param  {Number} compressRoute whether compress route
	   * @param  {Number|String} route  route code or route string
	   * @param  {Buffer} msg           message body bytes
	   * @return {Buffer}               encode result
	   */
	  Message.encode = function(id, type, compressRoute, route, msg, compressGzip){
	    // caculate message max length
	    var idBytes = msgHasId(type) ? caculateMsgIdBytes(id) : 0;
	    var msgLen = MSG_FLAG_BYTES + idBytes;

	    if(msgHasRoute(type)) {
	      if(compressRoute) {
	        if(typeof route !== 'number'){
	          throw new Error('error flag for number route!');
	        }
	        msgLen += MSG_ROUTE_CODE_BYTES;
	      } else {
	        msgLen += MSG_ROUTE_LEN_BYTES;
	        if(route) {
	          route = Protocol.strencode(route);
	          if(route.length>255) {
	            throw new Error('route maxlength is overflow');
	          }
	          msgLen += route.length;
	        }
	      }
	    }

	    if(msg) {
	      msgLen += msg.length;
	    }

	    var buffer = new ByteArray(msgLen);
	    var offset = 0;

	    // add flag
	    offset = encodeMsgFlag(type, compressRoute, buffer, offset, compressGzip);

	    // add message id
	    if(msgHasId(type)) {
	      offset = encodeMsgId(id, buffer, offset);
	    }

	    // add route
	    if(msgHasRoute(type)) {
	      offset = encodeMsgRoute(compressRoute, route, buffer, offset);
	    }

	    // add body
	    if(msg) {
	      offset = encodeMsgBody(msg, buffer, offset);
	    }

	    return buffer;
	  };

	  /**
	   * Message protocol decode.
	   *
	   * @param  {Buffer|Uint8Array} buffer message bytes
	   * @return {Object}            message object
	   */
	  Message.decode = function(buffer) {
	    var bytes =  new ByteArray(buffer);
	    var bytesLen = bytes.length || bytes.byteLength;
	    var offset = 0;
	    var id = 0;
	    var route = null;

	    // parse flag
	    var flag = bytes[offset++];
	    var compressRoute = flag & MSG_COMPRESS_ROUTE_MASK;
	    var type = (flag >> 1) & MSG_TYPE_MASK;
	    var compressGzip = (flag >> 4) & MSG_COMPRESS_GZIP_MASK;

	    // parse id
	    if(msgHasId(type)) {
	      var m = 0;
	      var i = 0;
	      do{
	        m = parseInt(bytes[offset]);
	        id += (m & 0x7f) << (7 * i);
	        offset++;
	        i++;
	      }while(m >= 128);
	    }

	    // parse route
	    if(msgHasRoute(type)) {
	      if(compressRoute) {
	        route = (bytes[offset++]) << 8 | bytes[offset++];
	      } else {
	        var routeLen = bytes[offset++];
	        if(routeLen) {
	          route = new ByteArray(routeLen);
	          copyArray(route, 0, bytes, offset, routeLen);
	          route = Protocol.strdecode(route);
	        } else {
	          route = '';
	        }
	        offset += routeLen;
	      }
	    }

	    // parse body
	    var bodyLen = bytesLen - offset;
	    var body = new ByteArray(bodyLen);

	    copyArray(body, 0, bytes, offset, bodyLen);

	    return {'id': id, 'type': type, 'compressRoute': compressRoute,
	            'route': route, 'body': body, 'compressGzip': compressGzip};
	  };

	  var copyArray = function(dest, doffset, src, soffset, length) {
	    if('function' === typeof src.copy) {
	      // Buffer
	      src.copy(dest, doffset, soffset, soffset + length);
	    } else {
	      // Uint8Array
	      for(var index=0; index<length; index++){
	        dest[doffset++] = src[soffset++];
	      }
	    }
	  };

	  var msgHasId = function(type) {
	    return type === Message.TYPE_REQUEST || type === Message.TYPE_RESPONSE;
	  };

	  var msgHasRoute = function(type) {
	    return type === Message.TYPE_REQUEST || type === Message.TYPE_NOTIFY ||
	           type === Message.TYPE_PUSH;
	  };

	  var caculateMsgIdBytes = function(id) {
	    var len = 0;
	    do {
	      len += 1;
	      id >>= 7;
	    } while(id > 0);
	    return len;
	  };

	  var encodeMsgFlag = function(type, compressRoute, buffer, offset, compressGzip) {
	    if(type !== Message.TYPE_REQUEST && type !== Message.TYPE_NOTIFY &&
	       type !== Message.TYPE_RESPONSE && type !== Message.TYPE_PUSH) {
	      throw new Error('unkonw message type: ' + type);
	    }

	    buffer[offset] = (type << 1) | (compressRoute ? 1 : 0);

	    if(compressGzip) {
	      buffer[offset] = buffer[offset] | MSG_COMPRESS_GZIP_ENCODE_MASK;
	    }

	    return offset + MSG_FLAG_BYTES;
	  };

	  var encodeMsgId = function(id, buffer, offset) {
	    do{
	      var tmp = id % 128;
	      var next = Math.floor(id/128);

	      if(next !== 0){
	        tmp = tmp + 128;
	      }
	      buffer[offset++] = tmp;

	      id = next;
	    } while(id !== 0);

	    return offset;
	  };

	  var encodeMsgRoute = function(compressRoute, route, buffer, offset) {
	    if (compressRoute) {
	      if(route > MSG_ROUTE_CODE_MAX){
	        throw new Error('route number is overflow');
	      }

	      buffer[offset++] = (route >> 8) & 0xff;
	      buffer[offset++] = route & 0xff;
	    } else {
	      if(route) {
	        buffer[offset++] = route.length & 0xff;
	        copyArray(buffer, offset, route, 0, route.length);
	        offset += route.length;
	      } else {
	        buffer[offset++] = 0;
	      }
	    }

	    return offset;
	  };

	  var encodeMsgBody = function(msg, buffer, offset) {
	    copyArray(buffer, offset, msg, 0, msg.length);
	    return offset + msg.length;
	  };

	  module.exports = Protocol;
	  if(typeof(window) != "undefined") {
	    window.Protocol = Protocol;
	  }
	})(typeof(window)=="undefined" ? module.exports : (this.Protocol = {}),typeof(window)=="undefined"  ? Buffer : Uint8Array, this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(20)
	var ieee754 = __webpack_require__(21)
	var isArray = __webpack_require__(22)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 21 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var encoder = __webpack_require__(24);
	var decoder = __webpack_require__(28);
	var parser = __webpack_require__(29);

	var Protobuf = module.exports;

	/**
	 * [encode the given message, return a Buffer represent the message encoded by protobuf]
	 * @param  {[type]} key The key to identify the message type.
	 * @param  {[type]} msg The message body, a js object.
	 * @return {[type]} The binary encode result in a Buffer.
	 */
	Protobuf.encode = function(key, msg){
		return encoder.encode(key, msg);
	};

	Protobuf.encode2Bytes = function(key, msg){
		var buffer = this.encode(key, msg);
		if(!buffer || !buffer.length){
			console.warn('encode msg failed! key : %j, msg : %j', key, msg);
			return null;
		}
		var bytes = new Uint8Array(buffer.length);
		for(var offset = 0; offset < buffer.length; offset++){
			bytes[offset] = buffer.readUInt8(offset);
		}

		return bytes;
	};

	Protobuf.encodeStr = function(key, msg, code){
		code = code || 'base64';
		var buffer = Protobuf.encode(key, msg);
		return !!buffer?buffer.toString(code):buffer;
	};

	Protobuf.decode = function(key, msg){
		return decoder.decode(key, msg);
	};

	Protobuf.decodeStr = function(key, str, code){
		code = code || 'base64';
		var buffer = new Buffer(str, code);

		return !!buffer?Protobuf.decode(key, buffer):buffer;
	};

	Protobuf.parse = function(json){
		return parser.parse(json);
	};

	Protobuf.setEncoderProtos = function(protos){
		encoder.init(protos);
	};

	Protobuf.setDecoderProtos = function(protos){
		decoder.init(protos);
	};

	Protobuf.init = function(opts){
		//On the serverside, use serverProtos to encode messages send to client
		encoder.init(opts.encoderProtos);

		//On the serverside, user clientProtos to decode messages receive from clients
		decoder.init(opts.decoderProtos);

	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var codec = __webpack_require__(25);
	var constant = __webpack_require__(26);
	var util = __webpack_require__(27);

	var Encoder = module.exports;

	Encoder.init = function(protos){
		this.protos = protos || {};
	};

	Encoder.encode = function(route, msg){
		if(!route || !msg){
			console.warn('Route or msg can not be null! route : %j, msg %j', route, msg);
			return null;
		}

		//Get protos from protos map use the route as key
		var protos = this.protos[route];

		//Check msg
		if(!checkMsg(msg, protos)){
			console.warn('check msg failed! msg : %j, proto : %j', msg, protos);
			return null;
		}

		//Set the length of the buffer 2 times bigger to prevent overflow
		var length = Buffer.byteLength(JSON.stringify(msg))*2;

		//Init buffer and offset
		var buffer = new Buffer(length);
		var offset = 0;

		if(!!protos){
			offset = encodeMsg(buffer, offset, protos, msg);
			if(offset > 0){
				return buffer.slice(0, offset);
			}
		}

		return null;
	};

	/**
	 * Check if the msg follow the defination in the protos
	 */
	function checkMsg(msg, protos){
		if(!protos || !msg){
			console.warn('no protos or msg exist! msg : %j, protos : %j', msg, protos);
			return false;
		}

		for(var name in protos){
			var proto = protos[name];

			//All required element must exist
			switch(proto.option){
				case 'required' :
					if(typeof(msg[name]) === 'undefined'){
						console.warn('no property exist for required! name: %j, proto: %j, msg: %j', name, proto, msg);
						return false;
					}
				case 'optional' :
					if(typeof(msg[name]) !== 'undefined'){
						var message = protos.__messages[proto.type] || Encoder.protos['message ' + proto.type];
						if(!!message && !checkMsg(msg[name], message)){
							console.warn('inner proto error! name: %j, proto: %j, msg: %j', name, proto, msg);
							return false;
						}
					}
				break;
				case 'repeated' :
					//Check nest message in repeated elements
					var message = protos.__messages[proto.type] || Encoder.protos['message ' + proto.type];
					if(!!msg[name] && !!message){
						for(var i = 0; i < msg[name].length; i++){
							if(!checkMsg(msg[name][i], message)){
								return false;
							}
						}
					}
				break;
			}
		}

		return true;
	}

	function encodeMsg(buffer, offset, protos, msg){
		for(var name in msg){
			if(!!protos[name]){
				var proto = protos[name];

				switch(proto.option){
					case 'required' :
					case 'optional' :
						offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
						offset = encodeProp(msg[name], proto.type, offset, buffer, protos);
					break;
					case 'repeated' :
						if(!!msg[name] && msg[name].length > 0){
							offset = encodeArray(msg[name], proto, offset, buffer, protos);
						}
					break;
				}
			}
		}

		return offset;
	}

	function encodeProp(value, type, offset, buffer, protos){
		var length = 0;

		switch(type){
			case 'uInt32':
				offset = writeBytes(buffer, offset, codec.encodeUInt32(value));
			break;
			case 'int32' :
			case 'sInt32':
				offset = writeBytes(buffer, offset, codec.encodeSInt32(value));
			break;
			case 'float':
				buffer.writeFloatLE(value, offset);
				offset += 4;
			break;
			case 'double':
				buffer.writeDoubleLE(value, offset);
				offset += 8;
			break;
			case 'string':
				length = Buffer.byteLength(value);

				//Encode length
				offset = writeBytes(buffer, offset, codec.encodeUInt32(length));
				//write string
				buffer.write(value, offset, length);
				offset += length;
			break;
			default :
				var message = protos.__messages[type] || Encoder.protos['message ' + type];
				if(!!message){
					//Use a tmp buffer to build an internal msg
					var tmpBuffer = new Buffer(Buffer.byteLength(JSON.stringify(value))*2);
					length = 0;

					length = encodeMsg(tmpBuffer, length, message, value);
					//Encode length
					offset = writeBytes(buffer, offset, codec.encodeUInt32(length));
					//contact the object
					tmpBuffer.copy(buffer, offset, 0, length);

					offset += length;
				}
			break;
		}

		return offset;
	}

	/**
	 * Encode reapeated properties, simple msg and object are decode differented
	 */
	function encodeArray(array, proto, offset, buffer, protos){
		var i = 0;
		if(util.isSimpleType(proto.type)){
			offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
			offset = writeBytes(buffer, offset, codec.encodeUInt32(array.length));
			for(i = 0; i < array.length; i++){
				offset = encodeProp(array[i], proto.type, offset, buffer);
			}
		}else{
			for(i = 0; i < array.length; i++){
				offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
				offset = encodeProp(array[i], proto.type, offset, buffer, protos);
			}
		}

		return offset;
	}

	function writeBytes(buffer, offset, bytes){
		for(var i = 0; i < bytes.length; i++){
			buffer.writeUInt8(bytes[i], offset);
			offset++;
		}

		return offset;
	}

	function encodeTag(type, tag){
		var value = constant.TYPES[type];

		if(value === undefined) value = 2;

		return codec.encodeUInt32((tag<<3)|value);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ },
/* 25 */
/***/ function(module, exports) {

	var Encoder = module.exports;

	/**
	 * [encode an uInt32, return a array of bytes]
	 * @param  {[integer]} num
	 * @return {[array]}
	 */
	Encoder.encodeUInt32 = function(num){
		var n = parseInt(num);
		if(isNaN(n) || n < 0){
			console.log(n);
			return null;
		}

		var result = [];
		do{
			var tmp = n % 128;
			var next = Math.floor(n/128);

			if(next !== 0){
				tmp = tmp + 128;
			}
			result.push(tmp);
			n = next;
		} while(n !== 0);

		return result;
	};

	/**
	 * [encode a sInt32, return a byte array]
	 * @param  {[sInt32]} num  The sInt32 need to encode
	 * @return {[array]} A byte array represent the integer
	 */
	Encoder.encodeSInt32 = function(num){
		var n = parseInt(num);
		if(isNaN(n)){
			return null;
		}
		n = n<0?(Math.abs(n)*2-1):n*2;

		return Encoder.encodeUInt32(n);
	};

	Encoder.decodeUInt32 = function(bytes){
		var n = 0;

		for(var i = 0; i < bytes.length; i++){
			var m = parseInt(bytes[i]);
			n = n + ((m & 0x7f) * Math.pow(2,(7*i)));
			if(m < 128){
				return n;
			}
		}

		return n;
	};


	Encoder.decodeSInt32 = function(bytes){
		var n = this.decodeUInt32(bytes);
		var flag = ((n%2) === 1)?-1:1;

		n = ((n%2 + n)/2)*flag;

		return n;
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = {
		TYPES : {
			uInt32 : 0,
			sInt32 : 0,
			int32 : 0,
			double : 1,
			string : 2,
			message : 2,
			float : 5
		}
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	var util = module.exports;

	util.isSimpleType = function(type){
		return ( type === 'uInt32' ||
						 type === 'sInt32' ||
						 type === 'int32'  ||
						 type === 'uInt64' ||
						 type === 'sInt64' ||
						 type === 'float'  ||
						 type === 'double');
	};

	util.equal = function(obj0, obj1){
		for(var key in obj0){
			var m = obj0[key];
			var n = obj1[key];

			if(typeof(m) === 'object'){
				if(!util.equal(m, n)){
					return false;
				}
			}else if(m !== n){
				return false;
			}
		}

		return true;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var codec = __webpack_require__(25);
	var util = __webpack_require__(27);

	var Decoder = module.exports;

	var buffer;
	var offset = 0;

	Decoder.init = function(protos){
		this.protos = protos || {};
	};

	Decoder.setProtos = function(protos){
		if(!!protos){
			this.protos = protos;
		}
	};

	Decoder.decode = function(route, buf){
		var protos = this.protos[route];

		buffer = buf;
		offset = 0;

		if(!!protos){
			return decodeMsg({}, protos, buffer.length);
		}

		return null;
	};

	function decodeMsg(msg, protos, length){
		while(offset<length){
			var head = getHead();
			var type = head.type;
			var tag = head.tag;
			var name = protos.__tags[tag];

			switch(protos[name].option){
				case 'optional' :
				case 'required' :
					msg[name] = decodeProp(protos[name].type, protos);
				break;
				case 'repeated' :
					if(!msg[name]){
						msg[name] = [];
					}
					decodeArray(msg[name], protos[name].type, protos);
				break;
			}
		}

		return msg;
	}

	/**
	 * Test if the given msg is finished
	 */
	function isFinish(msg, protos){
		return (!protos.__tags[peekHead().tag]);
	}
	/**
	 * Get property head from protobuf
	 */
	function getHead(){
		var tag = codec.decodeUInt32(getBytes());

		return {
			type : tag&0x7,
			tag	: tag>>3
		};
	}

	/**
	 * Get tag head without move the offset
	 */
	function peekHead(){
		var tag = codec.decodeUInt32(peekBytes());

		return {
			type : tag&0x7,
			tag	: tag>>3
		};
	}

	function decodeProp(type, protos){
		switch(type){
			case 'uInt32':
				return codec.decodeUInt32(getBytes());
			case 'int32' :
			case 'sInt32' :
				return codec.decodeSInt32(getBytes());
			case 'float' :
				var float = buffer.readFloatLE(offset);
				offset += 4;
				return float;
			case 'double' :
				var double = buffer.readDoubleLE(offset);
				offset += 8;
				return double;
			case 'string' :
				var length = codec.decodeUInt32(getBytes());

				var str =  buffer.toString('utf8', offset, offset+length);
				offset += length;

				return str;
			default :
				var message = protos && (protos.__messages[type] || Decoder.protos['message ' + type]);
				if(message){
					var length = codec.decodeUInt32(getBytes());
					var msg = {};
					decodeMsg(msg, message, offset+length);
					return msg;
				}
			break;
		}
	}

	function decodeArray(array, type, protos){
		if(util.isSimpleType(type)){
			var length = codec.decodeUInt32(getBytes());

			for(var i = 0; i < length; i++){
				array.push(decodeProp(type));
			}
		}else{
			array.push(decodeProp(type, protos));
		}
	}

	function getBytes(flag){
		var bytes = [];
		var pos = offset;
		flag = flag || false;

		var b;
		do{
			var b = buffer.readUInt8(pos);
			bytes.push(b);
			pos++;
		}while(b >= 128);

		if(!flag){
			offset = pos;
		}
		return bytes;
	}

	function peekBytes(){
		return getBytes(true);
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	var Parser = module.exports;

	/**
	 * [parse the original protos, give the paresed result can be used by protobuf encode/decode.]
	 * @param  {[Object]} protos Original protos, in a js map.
	 * @return {[Object]} The presed result, a js object represent all the meta data of the given protos.
	 */
	Parser.parse = function(protos){
		var maps = {};
		for(var key in protos){
			maps[key] = parseObject(protos[key]);
		}

		return maps;
	};

	/**
	 * [parse a single protos, return a object represent the result. The method can be invocked recursively.]
	 * @param  {[Object]} obj The origin proto need to parse.
	 * @return {[Object]} The parsed result, a js object.
	 */
	function parseObject(obj){
		var proto = {};
		var nestProtos = {};
		var tags = {};

		for(var name in obj){
			var tag = obj[name];
			var params = name.split(' ');

			switch(params[0]){
				case 'message':
					if(params.length !== 2){
						continue;
					}
					nestProtos[params[1]] = parseObject(tag);
					continue;
				case 'required':
				case 'optional':
				case 'repeated':{
					//params length should be 3 and tag can't be duplicated
					if(params.length !== 3 || !!tags[tag]){
						continue;
					}
					proto[params[2]] = {
						option : params[0],
						type : params[1],
						tag : tag
					};
					tags[tag] = params[2];
				}
			}
		}

		proto.__messages = nestProtos;
		proto.__tags = tags;
		return proto;
	}

/***/ },
/* 30 */
/***/ function(module, exports) {

	(function() {
	  var JS_WS_CLIENT_TYPE = 'js-websocket';
	  var JS_WS_CLIENT_VERSION = '0.0.1';

	  var Protocol = window.Protocol;
	  var protobuf = window.protobuf;
	  var decodeIO_protobuf = window.decodeIO_protobuf;
	  var decodeIO_encoder = null;
	  var decodeIO_decoder = null;
	  var Package = Protocol.Package;
	  var Message = Protocol.Message;
	  var EventEmitter = window.EventEmitter;
	  var rsa = window.rsa;

	  if(typeof(window) != "undefined" && typeof(sys) != 'undefined' && sys.localStorage) {
	    window.localStorage = sys.localStorage;
	  }
	  
	  var RES_OK = 200;
	  var RES_FAIL = 500;
	  var RES_OLD_CLIENT = 501;

	  if (typeof Object.create !== 'function') {
	    Object.create = function (o) {
	      function F() {}
	      F.prototype = o;
	      return new F();
	    };
	  }

	  var root = window;
	  var pomelo = Object.create(EventEmitter.prototype); // object extend from object
	  root.pomelo = pomelo;
	  var socket = null;
	  var reqId = 0;
	  var callbacks = {};
	  var handlers = {};
	  //Map from request id to route
	  var routeMap = {};
	  var dict = {};    // route string to code
	  var abbrs = {};   // code to route string
	  var serverProtos = {};
	  var clientProtos = {};
	  var protoVersion = 0;

	  var heartbeatInterval = 0;
	  var heartbeatTimeout = 0;
	  var nextHeartbeatTimeout = 0;
	  var gapThreshold = 100;   // heartbeat gap threashold
	  var heartbeatId = null;
	  var heartbeatTimeoutId = null;
	  var handshakeCallback = null;

	  var decode = null;
	  var encode = null;

	  var reconnect = false;
	  var reconncetTimer = null;
	  var reconnectUrl = null;
	  var reconnectAttempts = 0;
	  var reconnectionDelay = 5000;
	  var DEFAULT_MAX_RECONNECT_ATTEMPTS = 10;

	  var useCrypto;

	  var handshakeBuffer = {
	    'sys': {
	      type: JS_WS_CLIENT_TYPE,
	      version: JS_WS_CLIENT_VERSION,
	      rsa: {}
	    },
	    'user': {
	    }
	  };

	  var initCallback = null;

	  pomelo.init = function(params, cb) {
	    initCallback = cb;
	    var host = params.host;
	    var port = params.port;

	    encode = params.encode || defaultEncode;
	    decode = params.decode || defaultDecode;

	    var url = 'ws://' + host;
	    if(port) {
	      url +=  ':' + port;
	    }

	    handshakeBuffer.user = params.user;
	    if(params.encrypt) {
	      useCrypto = true;
	      rsa.generate(1024, "10001");
	      var data = {
	        rsa_n: rsa.n.toString(16),
	        rsa_e: rsa.e
	      }
	      handshakeBuffer.sys.rsa = data;
	    }
	    handshakeCallback = params.handshakeCallback;
	    connect(params, url, cb);
	  };

	  var defaultDecode = pomelo.decode = function(data) {
	    //probuff decode
	    var msg = Message.decode(data);

	    if(msg.id > 0){
	      msg.route = routeMap[msg.id];
	      delete routeMap[msg.id];
	      if(!msg.route){
	        return;
	      }
	    }

	    msg.body = deCompose(msg);
	    return msg;
	  };

	  var defaultEncode = pomelo.encode = function(reqId, route, msg) {
	    var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;

	    //compress message by protobuf
	    if(protobuf && clientProtos[route]) {
	      msg = protobuf.encode(route, msg);
	    } else if(decodeIO_encoder && decodeIO_encoder.lookup(route)) {
	      var Builder = decodeIO_encoder.build(route);
	      msg = new Builder(msg).encodeNB();
	    } else {
	      msg = Protocol.strencode(JSON.stringify(msg));
	    }

	    var compressRoute = 0;
	    if(dict && dict[route]) {
	      route = dict[route];
	      compressRoute = 1;
	    }

	    return Message.encode(reqId, type, compressRoute, route, msg);
	  };

	  var connect = function(params, url, cb) {
	    console.log('connect to ' + url);

	    var params = params || {};
	    var maxReconnectAttempts = params.maxReconnectAttempts || DEFAULT_MAX_RECONNECT_ATTEMPTS;
	    reconnectUrl = url;
	    //Add protobuf version
	    if(window.localStorage && window.localStorage.getItem('protos') && protoVersion === 0) {
	      var protos = JSON.parse(window.localStorage.getItem('protos'));

	      protoVersion = protos.version || 0;
	      serverProtos = protos.server || {};
	      clientProtos = protos.client || {};

	      if(!!protobuf) {
	        protobuf.init({encoderProtos: clientProtos, decoderProtos: serverProtos});
	      } 
	      if(!!decodeIO_protobuf) {
	        decodeIO_encoder = decodeIO_protobuf.loadJson(clientProtos);
	        decodeIO_decoder = decodeIO_protobuf.loadJson(serverProtos);
	      }
	    }
	    //Set protoversion
	    handshakeBuffer.sys.protoVersion = protoVersion;

	    var onopen = function(event) {
	      if(!!reconnect) {
	        pomelo.emit('reconnect');
	      }
	      reset();
	      var obj = Package.encode(Package.TYPE_HANDSHAKE, Protocol.strencode(JSON.stringify(handshakeBuffer)));
	      send(obj);
	    };
	    var onmessage = function(event) {
	      processPackage(Package.decode(event.data), cb);
	      // new package arrived, update the heartbeat timeout
	      if(heartbeatTimeout) {
	        nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
	      }
	    };
	    var onerror = function(event) {
	      pomelo.emit('io-error', event);
	      console.error('socket error: ', event);
	    };
	    var onclose = function(event) {
	      pomelo.emit('close',event);
	      pomelo.emit('disconnect', event);
	      console.error('socket close: ', event);
	      if(!!params.reconnect && reconnectAttempts < maxReconnectAttempts) {
	        reconnect = true;
	        reconnectAttempts++;
	        reconncetTimer = setTimeout(function() {
	          connect(params, reconnectUrl, cb);
	        }, reconnectionDelay);
	        reconnectionDelay *= 2;
	      }
	    };
	    socket = new WebSocket(url);
	    socket.binaryType = 'arraybuffer';
	    socket.onopen = onopen;
	    socket.onmessage = onmessage;
	    socket.onerror = onerror;
	    socket.onclose = onclose;
	  };

	  pomelo.disconnect = function() {
	    if(socket) {
	      if(socket.disconnect) socket.disconnect();
	      if(socket.close) socket.close();
	      console.log('disconnect');
	      socket = null;
	    }

	    if(heartbeatId) {
	      clearTimeout(heartbeatId);
	      heartbeatId = null;
	    }
	    if(heartbeatTimeoutId) {
	      clearTimeout(heartbeatTimeoutId);
	      heartbeatTimeoutId = null;
	    }
	  };

	  var reset = function() {
	    reconnect = false;
	    reconnectionDelay = 1000 * 5;
	    reconnectAttempts = 0;
	    clearTimeout(reconncetTimer);
	  };

	  pomelo.request = function(route, msg, cb) {
	    if(arguments.length === 2 && typeof msg === 'function') {
	      cb = msg;
	      msg = {};
	    } else {
	      msg = msg || {};
	    }
	    route = route || msg.route;
	    if(!route) {
	      return;
	    }

	    reqId++;
	    sendMessage(reqId, route, msg);

	    callbacks[reqId] = cb;
	    routeMap[reqId] = route;
	  };

	  pomelo.notify = function(route, msg) {
	    msg = msg || {};
	    sendMessage(0, route, msg);
	  };

	  var sendMessage = function(reqId, route, msg) {
	    if(useCrypto) {
	      msg = JSON.stringify(msg);
	      var sig = rsa.signString(msg, "sha256");
	      msg = JSON.parse(msg);
	      msg['__crypto__'] = sig;
	    }

	    if(encode) {
	      msg = encode(reqId, route, msg);
	    }

	    var packet = Package.encode(Package.TYPE_DATA, msg);
	    send(packet);
	  };

	  var send = function(packet) {
	    if(socket)
	      socket.send(packet.buffer);
	  };

	  var handler = {};

	  var heartbeat = function(data) {
	    if(!heartbeatInterval) {
	      // no heartbeat
	      return;
	    }

	    var obj = Package.encode(Package.TYPE_HEARTBEAT);
	    if(heartbeatTimeoutId) {
	      clearTimeout(heartbeatTimeoutId);
	      heartbeatTimeoutId = null;
	    }

	    if(heartbeatId) {
	      // already in a heartbeat interval
	      return;
	    }
	    heartbeatId = setTimeout(function() {
	      heartbeatId = null;
	      send(obj);

	      nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
	      heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, heartbeatTimeout);
	    }, heartbeatInterval);
	  };

	  var heartbeatTimeoutCb = function() {
	    var gap = nextHeartbeatTimeout - Date.now();
	    if(gap > gapThreshold) {
	      heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, gap);
	    } else {
	      console.error('server heartbeat timeout');
	      pomelo.emit('heartbeat timeout');
	      pomelo.disconnect();
	    }
	  };

	  var handshake = function(data) {
	    data = JSON.parse(Protocol.strdecode(data));
	    if(data.code === RES_OLD_CLIENT) {
	      pomelo.emit('error', 'client version not fullfill');
	      return;
	    }

	    if(data.code !== RES_OK) {
	      pomelo.emit('error', 'handshake fail');
	      return;
	    }

	    handshakeInit(data);

	    var obj = Package.encode(Package.TYPE_HANDSHAKE_ACK);
	    send(obj);
	    if(initCallback) {
	      initCallback(socket);
	    }
	  };

	  var onData = function(data) {
	    var msg = data;
	    if(decode) {
	      msg = decode(msg);
	    }
	    processMessage(pomelo, msg);
	  };

	  var onKick = function(data) {
	    data = JSON.parse(Protocol.strdecode(data));
	    pomelo.emit('onKick', data);
	  };

	  handlers[Package.TYPE_HANDSHAKE] = handshake;
	  handlers[Package.TYPE_HEARTBEAT] = heartbeat;
	  handlers[Package.TYPE_DATA] = onData;
	  handlers[Package.TYPE_KICK] = onKick;

	  var processPackage = function(msgs) {
	    if(Array.isArray(msgs)) {
	      for(var i=0; i<msgs.length; i++) {
	        var msg = msgs[i];
	        handlers[msg.type](msg.body);
	      }
	    } else {
	      handlers[msgs.type](msgs.body);
	    }
	  };

	  var processMessage = function(pomelo, msg) {
	    if(!msg.id) {
	      // server push message
	      pomelo.emit(msg.route, msg.body);
	      return;
	    }

	    //if have a id then find the callback function with the request
	    var cb = callbacks[msg.id];

	    delete callbacks[msg.id];
	    if(typeof cb !== 'function') {
	      return;
	    }

	    cb(msg.body);
	    return;
	  };

	  var processMessageBatch = function(pomelo, msgs) {
	    for(var i=0, l=msgs.length; i<l; i++) {
	      processMessage(pomelo, msgs[i]);
	    }
	  };

	  var deCompose = function(msg) {
	    var route = msg.route;

	    //Decompose route from dict
	    if(msg.compressRoute) {
	      if(!abbrs[route]){
	        return {};
	      }

	      route = msg.route = abbrs[route];
	    }
	    if(protobuf && serverProtos[route]) {
	      return protobuf.decodeStr(route, msg.body);
	    } else if(decodeIO_decoder && decodeIO_decoder.lookup(route)) {
	      return decodeIO_decoder.build(route).decode(msg.body);
	    } else {
	      return JSON.parse(Protocol.strdecode(msg.body));
	    }

	    return msg;
	  };

	  var handshakeInit = function(data) {
	    if(data.sys && data.sys.heartbeat) {
	      heartbeatInterval = data.sys.heartbeat * 1000;   // heartbeat interval
	      heartbeatTimeout = heartbeatInterval * 2;        // max heartbeat timeout
	    } else {
	      heartbeatInterval = 0;
	      heartbeatTimeout = 0;
	    }

	    initData(data);

	    if(typeof handshakeCallback === 'function') {
	      handshakeCallback(data.user);
	    }
	  };

	  //Initilize data used in pomelo client
	  var initData = function(data) {
	    if(!data || !data.sys) {
	      return;
	    }
	    dict = data.sys.dict;
	    var protos = data.sys.protos;

	    //Init compress dict
	    if(dict) {
	      dict = dict;
	      abbrs = {};

	      for(var route in dict) {
	        abbrs[dict[route]] = route;
	      }
	    }

	    //Init protobuf protos
	    if(protos) {
	      protoVersion = protos.version || 0;
	      serverProtos = protos.server || {};
	      clientProtos = protos.client || {};

	        //Save protobuf protos to localStorage
	        window.localStorage.setItem('protos', JSON.stringify(protos));

	        if(!!protobuf) {
	          protobuf.init({encoderProtos: protos.client, decoderProtos: protos.server});
	        }
	        if(!!decodeIO_protobuf) {
	          decodeIO_encoder = decodeIO_protobuf.loadJson(clientProtos);
	          decodeIO_decoder = decodeIO_protobuf.loadJson(serverProtos);
	        }
	      }
	    };

	    module.exports = pomelo;
	  })();


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div>\n  <div id=\"biu-comment-stage\" class=\"container\"></div>\n  <div class=\"emitter\">\n    <div class=\"emitter-text\"> T<span class=\"overline\"></span></div>\n    <div class=\"emitter-text-modal\">M</div>\n    <div class=\"emitter-color\"></div>\n    <div class=\"emitter-text-wrap\">\n      <div class=\"emitter-modal\">\n        <div class=\"emitter-modal-title\"> 模式选择<i class=\"emitter-modal-close\">x</i></div>\n        <div class=\"emitter-modal-content\"><p>弹幕字号</p>\n          <p class=\"font-wrap\"><span class=\"fonts fz-36 active\" title=\"36\" data-font=\"36\">A</span><span\n                  class=\"fonts fz-45\" title=\"45\" data-font=\"45\">A</span></p>\n          <p>弹幕模式</p>\n          <ul>\n            <li><span class=\"mode-box active\" data-mode=\"1\"><i class=\"dashed top-right\"></i></span>\n              <p class=\"text-center\">上端滚动</p></li>\n            <li><span class=\"mode-box\" data-mode=\"2\"><i class=\"dashed bottom-right\"></i></span>\n              <p class=\"text-center\">下端滚动</p></li>\n            <li><span class=\"mode-box\" data-mode=\"5\"><i class=\"dashed top\"></i></span>\n              <p class=\"text-center\">顶部</p></li>\n            <li class=\"margin-right-0\"><span class=\"mode-box\" data-mode=\"4\"><i class=\"dashed bottom\"></i></span>\n              <p class=\"text-center\">底部</p></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <div class=\"emitter-color-wrap\">\n      <div id=\"color-picker\" class=\"cp-default\"></div>\n      <div class=\"cp-io\">\n        <ul>\n          <li><p><label>HEX</label><input id=\"hex\" type=\"text\"></p></li>\n          <li><p><label>R</label><input id=\"rgb-r\" type=\"text\"></p>\n            <p><label>G</label><input id=\"rgb-g\" type=\"text\"></p>\n            <p><label>B</label><input id=\"rgb-b\" type=\"text\"></p></li>\n          <li><p><label>H</label><input id=\"hsv-h\" type=\"text\"></p>\n            <p><label>S</label><input id=\"hsv-s\" type=\"text\"></p>\n            <p><label>V</label><input id=\"hsv-v\" type=\"text\"></p></li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"emitter-input-wrap\">\n      <form id=\"emitter-form\"><input id=\"emitter-input\" type=\"text\">\n        <button id=\"emitter-submit\" type=\"submit\">发送</button>\n      </form>\n    </div>\n  </div>\n</div>";

/***/ }
/******/ ]);