

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

})();