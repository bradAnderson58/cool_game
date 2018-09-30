
const itemManager = (() => {
  const items = {};

  return {
    createItem: createItem,
    getItem: getItem,
    getItems: getItems,
    removeItem: removeItem,
    getCollidableItems: getCollidableItems,
  };

  function createItem(name, spriteImage, layer=0) {
    if (items[name]) {
      console.err("WARNING: name " + name + " is not unique for item.  Will be overritten");
    }
    const item = new Item(name, spriteImage, layer);
    items[name] = item;
    app.stage.addChild(item.sprite);
    stageUtils.resortStageLayers();
    return item;
  }

  function getItem(itemName) {
    return items[name];
  }

  function getItems() {
    return Object.values(items);
  }

  function removeItem(item) {
    app.stage.removeChild(item.sprite);
    delete items[item.name];
  }

  function getCollidableItems() {
    return [getItem('crystal')]
  }
})();