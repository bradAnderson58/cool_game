
const itemManager = (() => {
  const items = {};
  let app;

  return {
    setApp: setApp,
    createItem: createItem,
    getItem: getItem,
    getItems: getItems,
    getSolidItems: getSolidItems,
    removeItem: removeItem,
  };

  function createItem(name, spriteImage, layer=0, isSolid=false) {
    if (items[name]) {
      console.err("WARNING: name " + name + " is not unique for item.  Will be overritten");
    }
    const item = new Item(name, spriteImage, layer, isSolid);
    items[name] = item;
    camera.addToCamera(item.sprite);
    //app.stage.addChild(item.sprite);
    stageUtils.resortStageLayers();
    return item;
  }

  function getItem(itemName) {
    return items[name];
  }

  function getItems() {
    return Object.values(items);
  }

  function getSolidItems() {
    return Object.values(items).filter(item => item.isSolid);
  }

  function removeItem(item) {
    camera.getInstance().removeChild(item.sprite);
    delete items[item.name];
  }

  function setApp(application) {
    app = application;
  }
})();