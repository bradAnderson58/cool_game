let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
console.log(type);
PIXI.utils.sayHello(type);

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

let state = play;

function setup() {
  console.log('loaded');
  const player = playerManager.playerInstance();
  player.setPos(100, 100);
  
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
  
  let crystal = new Item('crystal', darkdimension['little_crystal.png']);
  crystal.setPos(512, 512);
  app.stage.addChild(crystal.sprite);

  app.stage.addChild(player.sprite);

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

  let c = app.stage.getChildByName('crystal');
  if (!c.found && checkCollison(player.sprite, c)) {
    c.found = true;
    c.visible = false;
    playerManager.setPlayerVelocity(0, 0);
    dialogueManager.openDialog("Found crystal");
  }

}

function checkCollison(item1, item2) {
  let hit = false;
  let combinedHalfWidths, combinedHalfHeights, vx, vy;

  // Center points for sprites
  item1.centerX = item1.x + item1.width / 2;
  item1.centerY = item1.y + item1.height / 2;
  item2.centerX = item2.x + item2.width / 2;
  item2.centerY = item2.y + item2.height / 2;

  // half-widths for sprites
  item1.halfWidth = item1.width / 2;
  item1.halfHeight = item1.height / 2;
  item2.halfWidth = item2.width / 2;
  item2.halfHeight = item2.height / 2;

  // calculate distance vector between sprites
  vx = item1.centerX - item2.centerX;
  vy = item1.centerY - item2.centerY;

  // figure out combined halfs - this will be the range they touch in
  combinedHalfWidths = item1.halfWidth + item2.halfWidth;
  combinedHalfHeights = item1.halfHeight + item2.halfHeight;

  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true;
    }
  }
  return hit;
}


