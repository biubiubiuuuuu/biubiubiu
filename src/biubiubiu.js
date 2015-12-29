;
(function () {
  var __extends = function (child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }

    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  };

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

  var defaultCommentConfig = {
    "mode": 1,
    "stime": 0,
    "size": 18,
    "dur": 4000,
    "color": 'ffffff'
  };

  var Biu = {};

  Biu.init = function () {
    createDoms();
    initParams();
    addEvents();
    addCommentManager();

    cp = ColorPicker(
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
  }

  Biu.show = function() {
    biuElement.style.display = 'block';
  }

  Biu.hide = function() {
    biuElement.style.display = 'none';
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Biu;
  } else {
    window.Biu = Biu;
  }

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

  function addCommentManager() {
    window.CM = new CommentManager(document.getElementById('biu-comment-stage'));
    CM.init(); // 初始化

    // 启动播放弹幕（在未启动状态下弹幕不会移动）
    CM.start();

  }

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

    openBtn.onclick = function () {
      toggleBox();
    };

    emitterText.onclick = function () {
      toggleTextBox();
    }

    textClose.onclick = function () {
      closeTextBox();
    }

    textWrapUl.onclick = function (e) {
      var target = e.target;
      if (target.getAttribute('class').indexOf('mode-box') > -1) {
        activeModeBox(target);
      }
    }

    textFontsWrap.onclick = function (e) {
      var target = e.target;
      if (target.getAttribute('class').indexOf('fonts') > -1) {
        activeFont(target);
      }
    }

    showTextBtn.onclick = function () {
      toggleShowComment(overLine);
    }

    form.onsubmit = function (e) {
      e.preventDefault();
      sendComment();
    }
  }

  function createDoms() {
    var template = '<div><div id="biu-comment-stage" class="container"></div> <div class="emitter"><div class="emitter-text">      T<span class="overline"></span></div><div class="emitter-text-modal">M</div><div class="emitter-color"></div><div class="emitter-text-wrap"><div class="emitter-modal"><div class="emitter-modal-title">          模式选择<i class="emitter-modal-close">x</i></div><div class="emitter-modal-content"><p>弹幕字号</p><p class="font-wrap"><span class="fonts fz-36 active" title="36" data-font="36">A</span><span class="fonts fz-45" title="45" data-font="45">A</span></p><p>弹幕模式</p><ul><li><span class="mode-box active" data-mode="1"><i class="dashed top-right"></i></span><p class="text-center">上端滚动</p></li><li><span class="mode-box" data-mode="2"><i class="dashed bottom-right"></i></span><p class="text-center">下端滚动</p></li><li><span class="mode-box" data-mode="5"><i class="dashed top"></i></span><p class="text-center">顶部</p></li><li class="margin-right-0"><span class="mode-box" data-mode="4"><i class="dashed bottom"></i></span><p class="text-center">底部</p></li></ul></div></div></div><div class="emitter-color-wrap"><div id="color-picker" class="cp-default"></div><div class="cp-io"><ul><li><p><label>HEX</label><input id="hex" type="text"></p></li><li><p><label>R</label><input id="rgb-r" type="text"></p><p><label>G</label><input id="rgb-g" type="text"></p><p><label>B</label><input id="rgb-b" type="text"></p></li><li><p><label>H</label><input id="hsv-h" type="text"></p><p><label>S</label><input id="hsv-s" type="text"></p><p><label>V</label><input id="hsv-v" type="text"></p></li></ul></div></div><div class="emitter-input-wrap"><form id="emitter-form"><input id="emitter-input" type="text"><button id="emitter-submit" type="submit">发送</button></form></div></div></div>';
    biuElement = createElement(template);
    document.body.appendChild(biuElement);
    addElementClass(document.body, 'abp');
  }

  function createElement(string) {
    var div;
    div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
  }

  function updateColorPickers(hex) {
    cp.setHex(hex);
  }

  function toggleBox() {
    toggle(colorWrap);
  }

  function toggleTextBox() {
    toggle(textWrap);
  }

  function closeTextBox() {
    textWrap.style.display = 'none';
  }

  function sendComment() {
    var comment = clone(defaultCommentConfig);
    comment.text = textInput.value;
    console.log(comment);
    CM.send(comment);
    // TODO: 发送至服务器
  }

  function activeModeBox(ele) {
    removeElementsClass(modeBoxes, 'active');
    addElementClass(ele, 'active');
    defaultCommentConfig.mode = Number(ele.getAttribute('data-mode'));
  }

  function activeFont(ele) {
    removeElementsClass(textFonts, 'active');
    addElementClass(ele, 'active');
    defaultCommentConfig.size = Number(ele.getAttribute('data-font'));
  }

  function toggleShowComment(ele) {
    toggle(ele);
    console.log(stage.style.display);
    toggle(stage);
  }

  function addElementClass(element, className) {
    element.setAttribute('class', element.getAttribute('class') + ' ' + className);
  }

  function removeElementsClass(elements, className) {
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var oldClass = el.getAttribute('class');
      var newClass = oldClass.replace(className, '');
      el.setAttribute('class', newClass);
    }
  }

  function toggle(ele) {
    if (!ele.style.display || ele.style.display == 'none') {
      ele.style.display = 'block';
    } else {
      ele.style.display = 'none';
    }
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}).call(this);
