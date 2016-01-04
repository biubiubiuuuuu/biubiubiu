// doms
var biuElement;
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
const util = require('./util');

require('./jscolor.js');
require('script!comment-core-library/build/CommentCoreLibrary.js');
require('comment-core-library/build/style.css');
require('./emitter.css');


window.EventEmitter = require('component-emitter');
window.Protocol = require('pomelo-protocol');
window.protobuf = require('pomelo-protobuf');

var pomelo = require('pomelo-jsclient-websocket');


var Biu = {};

Biu.init = function () {
  createDoms();
  initParams();
  addEvents();
  addCommentManager();
  pomeloInit();
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
  colorWrap = document.querySelector('.emitter-color-wrap');
  textInput = document.getElementById('emitter-input');
  openBtn = document.getElementById('emitter-color');
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

// jscolor 事件监听机制导致该方法只能挂在window下
window.updateColor = function(picker) {
  defaultCommentConfig.color = picker.toHEXString().substr(1, 6);
}

/**
 *
 * @private
 */
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
