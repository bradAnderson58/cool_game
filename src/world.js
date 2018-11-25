
const world = (function() {
  
  const app = new PIXI.Application({
    width: 800,         // default: 800
    height: 600,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default false
    resolution: 1,      // default 1
  });

  return {
    createWorld: createWorld,
    startGame: startGame,
  }

  function createWorld() {
    // auto scale the canvas to the size of the window
    const renderer = app.renderer;
    renderer.view.style.position = 'absolute';
    renderer.view.style.display = 'block';
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    // add the canvas that pixi creates to the html document
    document.body.appendChild(app.view);

    // hacksy dependency injection
    //spriteManager.setApp(app);
    //playerManager.setApp(app);
    //itemManager.setApp(app);
    //camera.setStage(app);
  }

  function startGame() {
    PIXI.loader
      .add([
        'assets/player_sheet.json',
        'assets/tf_darkdimension/darkdimension.json',
      ])
      .load(setup);
  }

  function setup() {
    let sheet = PIXI.loader.resources['assets/player_sheet.json'].spritesheet;
    console.log(sheet.textures);
    let animation = new PIXI.extras.AnimatedSprite([sheet.textures['playerfront_01.png'], sheet.textures['playerfront_02.png']]);
    animation.animationSpeed = 0.167;
    animation.position.set(100, 100);
    animation.play();
    app.stage.addChild(animation);
    app.ticker.add(delta => play(delta));
    //console.log('loaded');
    //const player = playerManager.playerInstance();
    //player.setPos(100, 100);

    //loaderUtil.loadLevel();

    //dialogueManager.initializeDialogue(app);

    //app.ticker.add(delta => play(delta));
  }

  function play(delta) {
    //const player = playerManager.playerInstance();
    //playerManager.movePlayer();
    //camera.followPlayer(player);
  }

})();