
function Player(spriteResource) {
  this.name = 'player';
  this.direction = Direction.DOWN;
  this.setupAnimations(spriteResource);
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

  setDirection: function(direction) {
    this.direction = direction;
  },

  setupAnimations: function(resource) {
    this.animations = {};
    this.animations.moveRight = new PIXI.extras.AnimatedSprite(this.parseAnimation('playerright', resource));
    this.animations.moveLeft = new PIXI.extras.AnimatedSprite(this.parseAnimation('playerleft', resource));
    this.animations.moveUp = new PIXI.extras.AnimatedSprite(this.parseAnimation('playerback', resource));
    this.animations.moveDown = new PIXI.extras.AnimatedSprite(this.parseAnimation('playerfront', resource));
    
    this.animations.faceRight = new PIXI.extras.AnimatedSprite([resource.textures['player_right.png']]);
    this.animations.faceLeft = new PIXI.extras.AnimatedSprite([resource.textures['player_left.png']]);
    this.animations.faceUp = new PIXI.extras.AnimatedSprite([resource.textures['player_back.png']]);
    this.animations.faceDown = new PIXI.extras.AnimatedSprite([resource.textures['player_front.png']]);
    this.sprite = this.animations.faceDown;
  },

  setAnimation: function(animation) {
    this.currentAnimation = animation;
    
    const oldSprite = this.sprite;
    
    this.sprite = this.animations[animation];
    this.setPos(oldSprite.x, oldSprite.y);
    this.setVelocity(oldSprite.vx, oldSprite.vy);
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();

    return oldSprite;
  },

  parseAnimation: function(animationName, resource) {
    const sheet = resource.textures;
    const animationFrames = resource.data.animations[animationName];
    return animationFrames.map(frame => sheet[frame]);
  }
}


