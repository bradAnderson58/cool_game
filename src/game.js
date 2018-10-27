
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
console.log(type);
PIXI.utils.sayHello(type);

world.createWorld();
world.loadAssets(setup, play);

// TODO: the initialization function should be separate
function setup() {
  console.log('loaded');
  const app = this.app;
  const player = playerManager.playerInstance();
  player.setPos(100, 100);
  
  // TODO: loading level maps will be down the road
  let darkdimension = PIXI.loader.resources['assets/tf_darkdimension/darkdimension.json'].textures;
  for (var i = 0; i <= 5; ++i) {
    let sky = new PIXI.Sprite(darkdimension['night_sky.png']);
    sky.position.set(i*(254), 0);
    camera.addToCamera(sky);
    //app.stage.addChild(sky);
  }
  
  let floor = new PIXI.particles.ParticleContainer();
  for (var x = 0; x < 45; ++x) {
    for (var y = 0; y < 21; ++y) {
      let floor_tile = new PIXI.Sprite(darkdimension['moon_floor_' + randomInt(1,7) + '.png']);
      floor_tile.position.set(x * 32, 128 + (y * 30));
      floor.addChild(floor_tile);
    }
  }
  camera.addToCamera(floor);
  //app.stage.addChild(floor);
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

  const rock = itemManager.createItem('rock', darkdimension['floaty_rock.png'], 0, true);
  rock.setPos(200, 200);

  dialogueManager.initializeDialogue(app);

  app.ticker.add(delta => this.play(delta));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play(delta) {
  const player = playerManager.playerInstance();
  playerManager.movePlayer();
  camera.followPlayer(player);
}


