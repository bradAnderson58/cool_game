
const camera = (function() {
  let camera;

  return {
    followPlayer: followPlayer,
    setStage: setStage,
    addToCamera: addToCamera,
    removeFromCamera: removeFromCamera,
    getInstance: getInstance,
  }

  function followPlayer(player) {
    camera.pivot.copy(player.sprite.position);
  }

  function setStage(app) {
    camera = new PIXI.Container();
    const ui = new PIXI.Container();
    app.stage.addChild(camera);
    app.stage.addChild(ui);
    camera.position.set(app.renderer.screen.width / 2, app.renderer.screen.height / 2);
  }

  function addToCamera(sprite) {
    camera.addChild(sprite);
  }

  function removeFromCamera(sprite) {
    camera.removeChild(sprite);
  }

  function getInstance() {
    return camera;
  }
})();