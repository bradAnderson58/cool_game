

const spriteUtils = (() => {

  return {
    checkCollison: checkCollison,
    checkPotentialCollision: checkPotentialCollision,
  }

  function checkCollison(item1, item2) {
    return insideXRange(item1.x, item1.width, item2) &&
           insideYRange(item1.y, item1.height, item2);
  }

  function checkPotentialCollision(player, item, newX, newY) {
    return insideXRange(newX, player.width, item) &&
           insideYRange(newY, player.height, item);
  }

  function insideXRange(xRange, pWidth, item) {
    return ((xRange + pWidth) >= item.x &&
            xRange <= (item.x + item.width));
  }

  function insideYRange(yRange, pHeight, item) {
    return ((yRange + pHeight) >= item.y &&
            yRange <= (item.y + item.height));
  }

})();