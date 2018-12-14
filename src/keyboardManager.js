
var keyboardManager = (function() {
  const SPEED = 1.5;
  const Keys = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    ENTER: 13,
  }

  const controls = {
    up: mapKey(Keys.W),
    left: mapKey(Keys.A),
    down: mapKey(Keys.S),
    right: mapKey(Keys.D),
  };

  const enter = mapKey(Keys.ENTER);
  enter.press = () => {
    if (dialogueManager.dialogueIsOpen()) {
      dialogueManager.closeDialog();
    } else {
      const interactable = playerManager.checkInteractions();
      if (interactable) {
        interactable.playInteraction();
      } else {
        dialogueManager.openDialog();
      }
    }
  };
  
  controls.left.press = () => {
    if (!dialogueManager.dialogueIsOpen()) {
      playerManager.setPlayerVelocity(-SPEED, 0);
    }
  };
  controls.right.press = () => {
    if (!dialogueManager.dialogueIsOpen()) {
      playerManager.setPlayerVelocity(SPEED, 0);
    }
  };
  controls.up.press = () => {
    if (!dialogueManager.dialogueIsOpen()) {
      playerManager.setPlayerVelocity(0, -SPEED);
    }
  };
  controls.down.press = () => {
    if (!dialogueManager.dialogueIsOpen()) {
      playerManager.setPlayerVelocity(0, SPEED);
    }
  };
      
  Object.keys(controls).forEach(key => {
    let control = controls[key];
    control.release = () => {
      control.isDown = false;
      releaseMovementKey();
    };
  });

  return {
    releaseMovementKey: releaseMovementKey,
  }

  function mapKey(keyCode) {
    const key = {};
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

  function releaseMovementKey() {
    if (controls.up.isDown) {
      controls.up.press();
    } else if (controls.down.isDown) {
      controls.down.press();
    } else if (controls.left.isDown) {
      controls.left.press();
    } else if (controls.right.isDown) {
      controls.right.press();
    } else {
      playerManager.setPlayerVelocity(0, 0);
    }
  }
})();
