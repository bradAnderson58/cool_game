

const stageUtils = (() => {

  return {
    resortStageLayers: resortStageLayers,
  }

  function resortStageLayers(stage) {
    stage.children.sort((a, b) => {
      a.layer = a.layer || 0;
      b.layer = b.layer || 0;
      return a.layer - b.layer;
    })
  }

})();