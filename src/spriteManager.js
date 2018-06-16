
var spriteManager = (function() {
  return {
    loadStillSprite: loadStillSprite
  };

  function loadStillSprite(path) {
    PIXI.loader
      .add(path)
      .load(function() {
        let sprite = new PIXI.Sprite(
          PIXI.loader.resources[path].texture
        );
        console.log(sprite);
        app.stage.addChild(sprite);
      });
  }
  
})()