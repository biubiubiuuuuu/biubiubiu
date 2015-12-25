// Inputs.
// -------

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
  console.log(colorWrap.style.display)
  if (!colorWrap.style.display || colorWrap.style.display == 'none') {
    colorWrap.style.display = 'block';
  } else {
    colorWrap.style.display = 'none';
  }
}

function sendComment() {
  CM.send({
    "mode": 1,
    "text": textInput.value,
    "stime": 100,
    "size": 55,
    "color": cHex.substr(1, 6)
  });
  // TODO:提交服务器
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

submit.onclick = function() {
  sendComment();
}
