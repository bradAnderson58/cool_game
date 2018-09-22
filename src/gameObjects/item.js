
function Item(name, spriteImage) {
  this.name = name;
  this.sprite = new PIXI.Sprite(spriteImage);
  this.sprite.name = name;
}

Item.prototype = {
  setPos: function(x, y) {
    this.sprite.position.set(x, y);
  }
}