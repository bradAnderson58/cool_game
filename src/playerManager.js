

const playerManager = (function() {
  let player;

  return {
    initializePlayer: initializePlayer,
    playerInstance: playerInstance,
    movePlayer: movePlayer,
    setPlayerVelocity: setPlayerVelocity,
  }

  function initializePlayer(spritesheet) {
    const greys = PIXI.loader.resources['assets/grey_x2.json'].textures;
    player = new Player(greys['stand_front.png']);
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

})();