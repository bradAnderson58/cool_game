
var dialogueManager = (function() {
  const DEFAULT_MESSAGE = 'Nothing to do';
  let rectangle = new PIXI.Graphics();
  let message = undefined;


  let halfWidth = window.innerWidth / 2;
  let quarterHeight = window.innerHeight / 4;
  let halfx = halfWidth - (halfWidth / 2);
  let bottomy = (window.innerHeight / 1.5);

  return {
    toggleDialog: toggleDialog,
    initializeDialogue: initializeDialogue,
    openDialog: openDialog,
    closeDialog: closeDialog,
    dialogueIsOpen: dialogueIsOpen,
  }

  function dialogueIsOpen() {
    return rectangle.visible;
  }

  function toggleDialog() {
    if (rectangle.visible) {
      closeDialog();
    } else {
      openDialog();
    }
    return rectangle.visible;
  }

  function openDialog(msgText) {
    playerManager.setPlayerVelocity(0, 0);
    if (msgText) {
      message.text = msgText;
    } else {
      message.text = DEFAULT_MESSAGE
    }
    rectangle.visible = true;
    message.visible = true;
  }

  function closeDialog() {
    rectangle.visible = false;
    message.visible = false;
    keyboardManager.releaseMovementKey();
  }

  function initializeDialogue(app) {
    buildRectangle();
    app.stage.addChild(rectangle);

    buildDefaultMessageText();
    app.stage.addChild(message);

    closeDialog();
  }

  function buildRectangle() {
    rectangle.beginFill(0x363636);
    rectangle.lineStyle(4, 0xcc527a, 1);
    rectangle.drawRoundedRect(halfx, bottomy, halfWidth, quarterHeight, 10);
    rectangle.endFill();
  }

  function buildDefaultMessageText() {
    let style = new PIXI.TextStyle({
      fontFamily: 'Helvetica',
      fontStyle: 'italic',
      fontSize: 26,
      fill: 'white',
      stroke: '#000000',
      strokeThickness: 2,
    });
    message = new PIXI.Text(DEFAULT_MESSAGE, style);
    message.anchor.set(0.5, 0.5);
    message.position.set(halfWidth, bottomy + (quarterHeight / 2));
  }
})();