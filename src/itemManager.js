
const itemManager = (() => {

  return {
    createItem: createItem,
    getItem: getItem,
    getCollidableItems: getCollidableItems,
  };

  function createItem(name, spriteImage, layer=0) {
    const item = new Item(name, spriteImage, layer);
    app.stage.addChild(item.sprite);
    stageUtils.resortStageLayers();
    return item;
  }

  function getItem(itemName) {
    return app.stage.getChildByName(itemName);
  }

  function getCollidableItems() {
    return [getItem('crystal')]
  }
})();