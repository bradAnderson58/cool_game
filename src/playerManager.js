

const playerManager = (() => {
  let player;

  return {
    initializePlayer: initializePlayer,
    playerInstance: playerInstance,
    movePlayer: movePlayer,
    setPlayerVelocity: setPlayerVelocity,
    checkInteractions: checkInteractions,
  }

  function initializePlayer(spritesheet) {
    const greys = PIXI.loader.resources['assets/grey_x2.json'].textures;
    player = new Player(greys['stand_front.png']);
    app.stage.addChild(player.sprite);
    stageUtils.resortStageLayers();
  }

  function playerInstance() {
    if (!player) { 
      initializePlayer();
    }
    return player;
  }

  function movePlayer() {
    player.sprite.x += player.sprite.vx;
    player.sprite.y += player.sprite.vy;
  }

  function setPlayerVelocity(vx, vy) {
    player.setVelocity(vx, vy);
  }

  function checkInteractions() {
    const items = itemManager.getItems();
    return items.find(item => spriteUtils.checkCollison(player.sprite, item.sprite));
  }

})();