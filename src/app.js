/**
 * Created by Nemo on 15/12/23.
 */

window.EventEmitter = require('component-emitter');
window.Protocol = require('pomelo-protocol');
window.protobuf = require('pomelo-protobuf');

var pomelo = require('pomelo-jsclient-websocket');

pomelo.init({
  host: '127.0.0.1',
  port: 3010,
}, function () {
  pomelo.request('connector.entryHandler.enter', {username: 'nemo', room: 'javis'}, function (err, result) {
    console.log(err, result);
  });

  pomelo.on('onNewUser', function (msg) {
    console.log(msg);
  })
});

//require('script!comment-core-library/build/CommentCoreLibrary.js');
//require('comment-core-library/build/style.css');
//
//require('./my-page-styles.css')
//
//function $(element) {
//  // 获取 DOM 对象的短写，如果你在用 jQuery 也可以采用类似的方法
//  return document.getElementById(element);
//};
//
//// 在窗体载入完毕后再绑定
//var CM = new CommentManager($('my-comment-stage'));
//CM.init();
//
//// 先启用弹幕播放（之后可以停止）
//CM.start();
//
//window.CM = CM;

