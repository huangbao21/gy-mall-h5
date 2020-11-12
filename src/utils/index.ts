/* eslint-disable no-unused-expressions  */
/* eslint-disable @typescript-eslint/no-explicit-any  */
export default class Utils {
  static isIOS() {
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return isiOS
  }

  static isWeiXin() {
    const ua = window.navigator.userAgent.toLowerCase();
    const match = ua.match(/MicroMessenger/i);
    if (match === null) return false;

    if (match.includes('micromessenger')) {
      return true;
    }
    return false;
  }

  static forbidDefaultForIOS(): void {
    // 禁用双击缩放
    document.addEventListener("touchstart", function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      function (event) {
        const now = new Date().getTime();
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
  static forbidSlide(): void {
    document.body.addEventListener('touchmove', function (evt) {
      evt.preventDefault()
    }, { passive: false })
  }

  // 动态更改viewport
  static adjustViewport(): void {
    const clientWidth = document.documentElement.clientWidth;
    const viewport = document.querySelector('#viewport');
    const viewportWidth = 375;
    const viewportScale = clientWidth / viewportWidth;
    viewport?.setAttribute("content", `width=${viewportWidth}, initial-scale=${viewportScale}, maximum-scale=${viewportScale}, user-scalable=no,viewport-fit=cover`);
  }

  static setLoginCookie(obj: any) {
    localStorage.token = obj.token;
  }

  static clearLoginCookie() {
    localStorage.token = '';
  }

  static formatTime(format: string, number: number) {
    if (format === undefined) { format = 'H:M:S'; }
    let seconds = number;
    seconds = Math.floor(seconds);
    const hour = Math.floor(seconds / 3600);
    const hourStr = hour < 10 ? ("0" + hour) : hour + '';
    const balance = seconds % 3600;
    const minute = Math.floor(balance / 60);
    const minuteStr = minute < 10 ? ("0" + minute) : minute + '';
    const second = balance % 60;
    const secondStr = second < 10 ? ("0" + second) : second + '';
    if (format.indexOf('H') !== -1) {
      format = format.replace(/H/, hourStr);
    }
    if (format.indexOf('M') !== -1) {
      format = format.replace(/M/, minuteStr);
    }
    if (format.indexOf('S') !== -1) {
      format = format.replace(/S/, secondStr);
    }
    return format;
  }

  static addNumberUnit(num: number) {
    switch (true) {
      case num >= 10000 && num < 100000000:
      {
        const integ = num / 10000;
        return Math.floor(integ * 100) / 100 + '万';
        break;
      }
      case num >= 100000000:
      {
        const integ1 = num / 100000000;
        return Math.floor(integ1 * 100) / 100 + '亿';
        break;
      }
      default:
        return num + '';
        break;
    }
  }
}
