// Inputs.
// -------
window.CM = new CommentManager(document.getElementById('my-comment-stage'));
CM.init(); // 初始化

// 启动播放弹幕（在未启动状态下弹幕不会移动）
CM.start();
//CM.startTimer();

// 停止播放（停止弹幕移动）
// CM.stop();

// 更新时间轴时间
//CM.time(600);
// CM.time(1000);


window.EventEmitter = require('component-emitter');
window.Protocol = require('pomelo-protocol');
window.protobuf = require('pomelo-protobuf');

var pomelo = require('pomelo-jsclient-websocket');

var username = Math.random();
var room = 'javis';

pomelo.init({
  host:
  //'127.0.0.1',
    'vpca-bpm-family-slardar-1.vm.elenet.me',
  port: 3010,
}, function () {
  pomelo.request('connector.entryHandler.enter', {
    username: username,
    room: room
  }, function (result) {
    console.log(result);
  });

  pomelo.on('onUserEnter', function (msg) {
    console.log('onUserEnter', msg);
    pomelo.request('chat.chatHandler.getMembers', {}, function (result) {
      console.log(result);
    })
  })


  pomelo.on('onUserLeave', function (msg) {
    console.log('onUserLeave', msg);
    pomelo.request('chat.chatHandler.getMembers', {}, function (result) {
      console.log(result);
    })
  })


  pomelo.on('onComment', function (msg) {
    console.log('onComment', msg);

    CM.send(msg);
  });

  pomelo.request('chat.chatHandler.getComment', {}, function (result) {

    CM.load(result);
    CM.start();

    CM.time(600)
  })
});


var iHex = document.getElementById('hex');
var iR = document.getElementById('rgb-r');
var iG = document.getElementById('rgb-g');
var iB = document.getElementById('rgb-b');
var iH = document.getElementById('hsv-h');
var iS = document.getElementById('hsv-s');
var iV = document.getElementById('hsv-v');
var openBtn = document.querySelector('.emitter-color');
var colorWrap = document.querySelector('.emitter-color-wrap');
var textInput = document.getElementById('emitter-input');
var submit = document.getElementById('emitter-submit');
var emitterText = document.querySelector('.emitter-text-modal');
var textWrap = document.querySelector('.emitter-text-wrap');
var textClose = document.querySelector('.emitter-modal-close');
var textWrapUl = textWrap.getElementsByTagName('ul')[0];
var textFontsWrap = textWrap.getElementsByClassName('font-wrap')[0];
var textFonts = textFontsWrap.getElementsByTagName('span');
var modeBoxes = textWrap.getElementsByClassName('mode-box');
var showTextBtn = document.querySelector('.emitter-text');
var overLine = showTextBtn.getElementsByClassName('overline')[0];
var stage = document.getElementById('my-comment-stage');
var form = document.getElementById('emitter-form');

stage.style.display = 'block';

var baseConfig = {
  "mode": 1,
  "stime": 0,
  "size": 18,
  "color": 'ffffff'
};

var cp = ColorPicker(
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
    cHex = hex;
    baseConfig.color = cHex.substr(1, 6);
  });

function updateInputs(hex) {

  var rgb = ColorPicker.hex2rgb(hex);
  var hsv = ColorPicker.hex2hsv(hex);

  iHex.value = hex;

  iR.value = rgb.r;
  iG.value = rgb.g;
  iB.value = rgb.b;

  iH.value = hsv.h.toFixed(2);
  iS.value = hsv.s.toFixed(2);
  iV.value = hsv.v.toFixed(2);
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
  var comment = clone(baseConfig);
  comment.text = textInput.value;
  pomelo.request('chat.chatHandler.comment', comment);
}

function activeModeBox(ele) {
  removeElementsClass(modeBoxes, 'active');
  addElementClass(ele, 'active');
  baseConfig.mode = Number(ele.getAttribute('data-mode'));
}

function activeFont(ele) {
  removeElementsClass(textFonts, 'active');
  addElementClass(ele, 'active');
  baseConfig.size = Number(ele.getAttribute('data-font'));
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

var cHex = '#ffffff';
updateColorPickers(cHex);


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
  sendComment();
  e.preventDefault();
}
