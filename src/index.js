/**
 * Created by Nemo on 15/12/23.
 */

var biu = require('./biubiubiu');
function updateColor(picker) {
  console.log(picker);
  defaultCommentConfig.color = picker.toHEXString.substr(1, 6);
}
biu.init();
