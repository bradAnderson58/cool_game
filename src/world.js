
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
    loadAssets: loadAssets,
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
    spriteManager.setApp(app);
    playerManager.setApp(app);
    itemManager.setApp(app);
    camera.setStage(app);
  }

  function loadAssets(setupFn, playFn) {
    const loadScope = {
      app: app,
      play: playFn,
    }
    console.log(app);
    PIXI.loader
      .add([
        'assets/grey_x2.json',
        'assets/tf_darkdimension/darkdimension.json',
      ])
      .load(setupFn.bind(loadScope));
  }

})();