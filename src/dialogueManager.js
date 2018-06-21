
var dialogueManager = (function() {
  let rectangle = new PIXI.Graphics();
  let message = undefined;


  let halfWidth = window.innerWidth / 2;
  let quarterHeight = window.innerHeight / 4;
  let halfx = halfWidth - (halfWidth / 2);
  let bottomy = (window.innerHeight / 1.5);

  return {
    toggleDialogue: toggleDialogue,
    initializeDialogue: initializeDialogue,
    dialogueOpen: dialogueOpen,
  }

  function toggleDialogue() {
    rectangle.visible = !rectangle.visible;
    message.visible = !message.visible;
    return rectangle.visible;
  }

  function dialogueOpen() {
    return rectangle.visible;
  }

  function initializeDialogue(app) {
    buildRectangle();
    app.stage.addChild(rectangle);

    buildDefaultMessageText();
    app.stage.addChild(message);

    rectangle.visible = false;
    message.visible = false;
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
    message = new PIXI.Text('Nothing to do', style);
    message.anchor.set(0.5, 0.5);
    message.position.set(halfWidth, bottomy + (quarterHeight / 2));
  }
})();