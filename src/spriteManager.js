
var spriteManager = (function() {
  var app;  // reference to the main application

  return {
    setApp: setApp,
    loadStillSprite: loadStillSprite,
    loadStillSprites: loadStillSprites,
  };

  function setApp(application) {
    app = application;
  }

  // TODO:  issue with loading sprites async
  // "Cannor add resources while the loader is running"
  function loadStillSprite(path, options) {
    PIXI.loader
      .add(path)
      .load(function() {
        addPathToStage(path, options);
      });
  }

  function loadStillSprites(pathArr) {
    PIXI.loader
      .add(pathArr)
      .on('progress', loadProgressHandler)
      .load(function() {
        for (var pathInd in pathArr) {
          addPathToStage(pathArr[pathInd]);
        }
      });
  }

  function loadProgressHandler(loader, resource) {
    console.log('loading: ' + resource.url);
    console.log('progress: ' + loader.progress + '%');
  }

  function addPathToStage(path, options) {
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources[path].texture
    );
    
    sprite.anchor.set(0.5, 0.5);
    if (options) {
      processOptions(sprite, options);
    }
    sprite.rotation = 0.5;

    app.stage.addChild(sprite);
  }

  function processOptions(sprite, options) {
    sprite.x = options.posx || sprite.x;
    sprite.y = options.posy || sprite.y;
    sprite.height = options.height || sprite.height;
    sprite.width = options.width || sprite.width;
    sprite.scale.x = options.scalex || sprite.scale.x;
    sprite.scale.y = options.scaley || sprite.scale.y;
  }

})()