let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
console.log(type);
PIXI.utils.sayHello(type);

// TODO: move this creation stuff to its own file?
// create a PIXI application
let app = new PIXI.Application({
  width: 800,         // default: 800
  height: 600,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default false
  resolution: 1,      // default 1
});
spriteManager.setApp(app);

// auto scale the canvas to the size of the window
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// add the canvas that pixi creates to the html document
document.body.appendChild(app.view);

PIXI.loader
  .add([
    'assets/grey_x2.json',
    'assets/tf_darkdimension/darkdimension.json',
  ])
  .load(setup);

// TODO: the main game loop should also be separated out
const state = play;


// TODO: the initialization function should be separate
function setup() {
  console.log('loaded');
  const player = playerManager.playerInstance();
  player.setPos(100, 100);
  
  // TODO: loading level maps will be down the road
  let darkdimension = PIXI.loader.resources['assets/tf_darkdimension/darkdimension.json'].textures;
  for (var i = 0; i <= 5; ++i) {
    let sky = new PIXI.Sprite(darkdimension['night_sky.png']);
    sky.position.set(i*(254), 0);
    app.stage.addChild(sky);
  }
  
  let floor = new PIXI.particles.ParticleContainer();
  for (var x = 0; x < 45; ++x) {
    for (var y = 0; y < 21; ++y) {
      let floor_tile = new PIXI.Sprite(darkdimension['moon_floor_' + randomInt(1,7) + '.png']);
      floor_tile.position.set(x * 32, 128 + (y * 30));
      floor.addChild(floor_tile);
    }
  }
  app.stage.addChild(floor);
  stageUtils.resortStageLayers();
  
  // TODO: need a way to define items declaratively (json, yaml?)
  const crystal = itemManager.createItem('crystal', darkdimension['little_crystal.png']);
  crystal.setPos(512, 512);
  crystal.setInteraction(function() {
    dialogueManager.openDialog("Found crystal");
    itemManager.removeItem(this);
  });
  const plant = itemManager.createItem('plant', darkdimension['little_plant.png']);
  plant.setPos(700, 400);
  //plant.setInteraction(function() {
  //  console.log("Im a bush!");
  //});

  // shapes code
  dialogueManager.initializeDialogue(app);

  app.ticker.add(delta => gameLoop(delta));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameLoop(delta) {
  state(delta);
}

function play(delta) {
  const player = playerManager.playerInstance();
  playerManager.movePlayer();
}


