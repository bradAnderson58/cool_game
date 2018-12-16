

const playerManager = (() => {
  const playerAnimations = {
    right: 'moveRight',
    left: 'moveLeft',
    up: 'moveUp',
    down: 'moveDown',
  };
  const playerFacing = {
    right: 'faceRight',
    left: 'faceLeft',
    up: 'faceUp',
    down: 'faceDown',
  }

  let player;
  let app;

  return {
    setApp: setApp,
    initializePlayer: initializePlayer,
    playerInstance: playerInstance,
    movePlayer: movePlayer,
    setDirection: setDirection,
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
      initializePlayer(PIXI.loader.resources['assets/player_sheet.json']);
    }
    return player;
  }

  function movePlayer() {
    checkPlayerAnimations();

    const newX = player.sprite.x + player.sprite.vx;
    const newY = player.sprite.y + player.sprite.vy;

    if (!checkSolidCollisions(newX, newY)) {
      player.sprite.x = newX;
      player.sprite.y = newY;
    }
  }

  function checkPlayerAnimations() {
    const moving = (player.sprite.vx !== 0 || player.sprite.vy !== 0);
    const direction = player.direction;
    const animation = moving ? playerAnimations[direction] : playerFacing[direction];
    
    if (animation !== player.currentAnimation) {
      updatePlayerAnimation(animation);
    }
  }

  function updatePlayerAnimation(animation) {
    const oldSprite = player.setAnimation(animation);
    camera.removeFromCamera(oldSprite);
    camera.addToCamera(player.sprite);
    stageUtils.resortStageLayers();
  }

  function setPlayerVelocity(vx, vy) {
    player.setVelocity(vx, vy);
  }

  function setDirection(direction) {
    player.setDirection(direction);
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