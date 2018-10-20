

const spriteUtils = (() => {

  return {
    checkCollison: checkCollison,
    checkPotentialCollision: checkPotentialCollision,
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

  function checkPotentialCollision(player, item, newX, newY) {
    if (insideXRange(newX, player.width, item)) {
      console.log(player.width);
      console.log(item.width);
    }
    if (insideYRange(newY, player.height, item)) {
      console.log(player.height);
      console.log(item.height);
    }
    return insideXRange(newX, player.width, item) && insideYRange(newY, player.height, item);
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