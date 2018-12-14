
function Player(spriteSheet) {
  this.name = 'player';
  this.setupAnimations(spriteSheet);
  this.setAnimation('notMoving');
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
  },

  setupAnimations: function(sheet) {
    this.animations = {};
    this.animations.moving = new PIXI.extras.AnimatedSprite([sheet['playerfront_01.png'], sheet['playerfront_02.png']]);
    this.animations.notMoving = new PIXI.extras.AnimatedSprite([sheet['player_front.png']]);
  },

  setAnimation: function(animation) {
    this.sprite = this.animations[animation];
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
  }
}