
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
PIXI.utils.sayHello(type);

world.createWorld();
world.startGame();
