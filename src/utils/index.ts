export default class Utils {
  static isIOS() {
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS
  }
  static forbidDefaultForIOS() {
    // 禁用双击缩放
    document.addEventListener("touchstart", function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    var lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      function (event) {
        var now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );
    // 禁用双指手势操作
    document.addEventListener("gesturestart", function (event) {
      event.preventDefault();
    });
    document.addEventListener('dblclick', function (e) {
      e.preventDefault();
    }, { passive: false });
  }
  // 禁止微信浏览器拖动
  static forbidSlide() {
    document.body.addEventListener('touchmove', function (evt) {
      evt.preventDefault()
    }, { passive: false })
  }
}