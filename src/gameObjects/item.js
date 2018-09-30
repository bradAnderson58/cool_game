
function Item(name, spriteImage, layer=1) {
  this.name = name;
  this.layer = layer;
  this.sprite = new PIXI.Sprite(spriteImage);
  this.sprite.name = name;
  this.sprite.layer = layer;
}

Item.prototype = {
  setPos: function(x, y) {
    this.sprite.position.set(x, y);
  }
}