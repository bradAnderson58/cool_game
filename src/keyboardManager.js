
var keyboardManager = (function() {
  let Keys = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    ENTER: 13,
  }

  let controls = undefined;
  
  return {
    mapPlayer: function(player) {
      controls = {
        up: mapKey(Keys.W),
        left: mapKey(Keys.A),
        down: mapKey(Keys.S),
        right: mapKey(Keys.D),
      };

      enter = mapKey(Keys.ENTER);
      enter.press = () => {
        let showingDialogue = dialogueManager.toggleDialogue();
        if (showingDialogue) {
          player.vx = 0;
          player.vy = 0;
        } else {
          releaseMovementKey(player);
        }
      };

      controls.left.press = () => {
        if (!dialogueManager.dialogueIsOpen()) {
          player.vx = -5;
          player.vy = 0;
        }
      };
      controls.right.press = () => {
        if (!dialogueManager.dialogueIsOpen()) {
          player.vx = 5;
          player.vy = 0;
        }
      };
      controls.up.press = () => {
        if (!dialogueManager.dialogueIsOpen()) {
          player.vx = 0;
          player.vy = -5;
        }
      };
      controls.down.press = () => {
        if (!dialogueManager.dialogueIsOpen()) {
          player.vx = 0;
          player.vy = 5;
        }
      };
      
      Object.keys(controls).forEach(key => {
        let control = controls[key];
        control.release = () => {
          control.isDown = false;
          releaseMovementKey(player);
        };
      });
    }
  }

  function mapKey(keyCode) {
      let key = {};
      key.code = keyCode;
      key.isDown = false;
      key.isUp = true;
      key.press = undefined;
      key.release = undefined;

      key.downHandler = event => {
        keyDown(event, key);
      };

      key.upHandler = event => {
        keyUp(event, key);
      };

      window.addEventListener('keydown', key.downHandler.bind(key), false);
      window.addEventListener('keyup', key.upHandler.bind(key), false);

      return key;
  }

  function keyDown(event, key) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) {
        key.press()
      }
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  }

  function keyUp(event, key) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  }

  function releaseMovementKey(player) {
    if (controls.up.isDown) {
      controls.up.press();
    } else if (controls.down.isDown) {
      controls.down.press();
    } else if (controls.left.isDown) {
      controls.left.press();
    } else if (controls.right.isDown) {
      controls.right.press();
    } else {
      player.vx = 0;
      player.vy = 0;
    }
  }
})();
