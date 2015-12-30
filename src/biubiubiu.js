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

const defaultCommentConfig = require('./defaultCommentConfig');
const ColorPicker = require('./colorPicker');
const util = require('./util');

require('script!comment-core-library/build/CommentCoreLibrary.js');
require('comment-core-library/build/style.css');
require('./colorpicker.css');
require('./emitter.css');


var Biu = {};

Biu.init = function () {
  createDoms();
  initParams();
  addEvents();
  addCommentManager();

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
  const template = require('html!./template.html');
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
  CM.send(comment);
  // TODO: 发送至服务器
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