/**
 * Created by Nemo on 15/12/19.
 */
require('script!comment-core-library/build/CommentCoreLibrary.js');
require('comment-core-library/build/style.css');

class Danmu {
  construct(element) {
    this.cm = new CommentManager(element);
  }

  start() {
    return this.cm.start();
  }

  stop(){
    return this.stop();
  }

  send(obj) {
    this.cm.send(obj);
  }

  clear() {
    return this.cm.clear();
  }
}