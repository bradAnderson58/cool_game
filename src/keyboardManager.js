
var keyboardManager = (function() {
  return {
    keyboard: function(keyCode) {
      let key = {};
      key.code = keyCode;
      key.isDown = false;
      key.isUp = true;
      key.press = undefined;
      key.release = undefined;
      
      key.downHandler = event => {
        console.log(event);
        if (event.keyCode === key.code) {
          console.log('down');
          if (key.isUp && key.press) {
            key.press();
          }
          key.isDown = true;
          key.isUp = false;
          event.preventDefault();
        }
      };

      key.upHandler = event => {
        if (event.keyCode === key.code) {
          console.log('up');
          if (key.isDown && key.release) {
            key.release();
          }
          key.isDown = false;
          key.isUp = true;
          event.preventDefault();
        }
      };

      window.addEventListener('keydown', key.downHandler.bind(key), false);
      window.addEventListener('keyup', key.upHandler.bind(key), false);

      return key;
    }
  }
})();
