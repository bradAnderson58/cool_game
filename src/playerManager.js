

const playerManager = (() => {
  let player;
  let app;

  return {
    setApp: setApp,
    initializePlayer: initializePlayer,
    playerInstance: playerInstance,
    movePlayer: movePlayer,
    setPlayerVelocity: setPlayerVelocity,
    checkInteractions: checkInteractions,
  }

  function initializePlayer(spriteSheet) {
    player = new Player(spriteSheet);
    camera.addToCamera(player.sprite);
    stageUtils.resortStageLayers();
  }

  function playerInstance() {
    if (!player) { 
      initializePlayer(PIXI.loader.resources['assets/player_sheet.json'].textures);
    }
    return player;
  }

  function movePlayer() {
    const newX = player.sprite.x + player.sprite.vx;
    const newY = player.sprite.y + player.sprite.vy;
    if (!checkSolidCollisions(newX, newY)) {
      player.sprite.x = newX;
      player.sprite.y = newY;
    }
  }

  function setPlayerVelocity(vx, vy) {
    player.setVelocity(vx, vy);
  }

  function checkInteractions() {
    const items = itemManager.getItems();
    return items.find(item => spriteUtils.checkCollison(player.sprite, item.sprite));
  }

  function checkSolidCollisions(newX, newY) {
    const solids = itemManager.getSolidItems();
    return solids.find(item => spriteUtils.checkPotentialCollision(player.sprite, item.sprite, newX, newY));
  }

  function setApp(application) {
    app = application;
  }

})();