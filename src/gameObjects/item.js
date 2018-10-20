
function Item(name, spriteImage, layer=1, isSolid=false) {
  this.name = name;
  this.layer = layer;
  this.sprite = new PIXI.Sprite(spriteImage);
  this.sprite.name = name;
  this.sprite.layer = layer;
  this.isSolid = isSolid;
}

Item.prototype = {
  setPos: function(x, y) {
    this.sprite.position.set(x, y);
  },


  setInteraction: function(interaction) {
    this.interaction = interaction.bind(this);
  },

  playInteraction: function() {
    if (this.interaction) {
      this.interaction();
    } else {
      dialogueManager.toggleDialog();
    }
  },
}