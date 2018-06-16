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

// change the background color
app.renderer.backgroundColor = 0x061639;

// resizing the canvas
//app.renderer.autoResize = true;
//app.renderer.resize(1000, 448);

// auto scale the canvas to the size of the window
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// add the canvas that pixi creates to the html document
document.body.appendChild(app.view);

// another option, use the scaler
//var scale = scaleUtil.scaleToWindow(app.renderer.view);
//console.log(scale);

// loading sprites:
// (add method can also take an array of file names)
//spriteManager.loadStillSprite(
//  'assets/grey_x2.png', {
//    posx: 296,
//    posy: 296,
//  }
//);
//spriteManager.loadStillSprites(['assets/grey_x2.png', 'assets/grey.png']);
//spriteManager.loadTile('assets/grey_x2.png');

PIXI.loader
  .add('assets/grey_x2.json')
  .load(setup);

function setup() {
  console.log('loaded');
  let greys = PIXI.loader.resources['assets/grey_x2.json'].textures;
  let sprite = new PIXI.Sprite(greys['stand_right.png']);
  app.stage.addChild(sprite);
}
