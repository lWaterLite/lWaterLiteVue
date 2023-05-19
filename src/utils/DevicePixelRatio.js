class DevicePixelRatio {
  constructor() {
  }

  _getSystem() {
    let agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("windows") >= 0) {
      return true;
    }
  }

  _addHandler(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  }

  _correct() {
    let t = this;
    // 页面devicePixelRatio（设备像素比例）变化后，计算页面body标签zoom修改其大小，来抵消devicePixelRatio带来的变化。
    document.getElementsByTagName("body")[0].style.zoom = 1 / window.devicePixelRatio;
  }

  _watch() {
    let t = this;
    t._addHandler(window, "resize", function() { // 注意这个方法是解决全局有两个window.resize
      // 重新校正
      t._correct()
    })
  }

  init() {
    let t = this;
    if (t._getSystem()) { // 判断设备，目前只在windows系统下校正浏览器缩放比例
      // 初始化页面校正浏览器缩放比例
      t._correct();
      // 开启监听页面缩放
      t._watch();
    }
  }
}

export default DevicePixelRatio;