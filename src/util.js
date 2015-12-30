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