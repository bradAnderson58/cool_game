
function Player(spriteSheet) {
  this.name = 'player';
  this.sprite = new PIXI.Sprite(spriteSheet);
  this.sprite.name = 'player';
  this.sprite.layer = 1;
  this.sprite.vx = 0;
  this.sprite.vy = 0;
}

Player.prototype = {
  setPos: function(x, y) {
    this.sprite.position.set(x, y);
  },

  setVelocity: function(vx, vy) {
    this.sprite.vx = vx;
    this.sprite.vy = vy;
  }
}