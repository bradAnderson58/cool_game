var scaleUtil = (function() {

  return {
    scaleToWindow: scaleToWindow
  }

  function scaleToWindow(canvas, backgroundColor) {
    var scaleX, scaleY, scale, center;

    // 1. Scale the canvas to the correct size
    // figure out the scale amount on each axis
    scaleX = window.innerWidth / canvas.offsetWidth;
    scaleY = window.innerHeight / canvas.offsetHeight;

    // scale the canvas based on whichever value is less: x or y
    scale = Math.min(scaleX, scaleY);
    canvas.style.transformOrigin = '0 0';
    canvas.style.transform = 'scale(' + scale + ')';

    // 2. Center the canvas
    // decide whether to center the canvas vertically or horizontally
    // wide canvases should be centered vertically,
    // square or tall canvases should be centered horizontally
    if (canvas.offsetWidth > canvas.offsetHeight) {
      if (canvas.offsetWidth * scale < window.innerWidth) {
        center = 'horizontally';
      } else {
        center = 'vertically';
      }
    } else {
      if (canvas.offsetHeight * scale < window.innerHeight) {
        center = 'vertically';
      } else {
        center = 'horizontally';
      }
    }

    // center horizontally (for square or tall canvases)
    var margin;
    if (center === 'horizontally') {
      margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
      canvas.style.marginTop = 0 + 'px';
      canvas.style.marginBottom = 0 +'px';
      canvas.style.marginLeft = margin + 'px';
      canvas.style.marginRight = margin + 'px';
    }
    // center vertically (for wide canvases)
    if (center === 'vertically') {
      margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
      canvas.style.marginTop = margin + 'px';
      canvas.style.marginBottom = margin + 'px';
      canvas.style.marginLeft = 0 + 'px';
      canvas.style.marginRight = 0 + 'px';
    }

    // 3. Remove any padding from the canvas and body and set the canvas
    //    display style to block
    canvas.style.paddingLeft = 0 + 'px';
    canvas.style.paddingRight = 0 + 'px';
    canvas.style.paddingTop = 0 + 'px';
    canvas.style.paddingBottom = 0 + 'px';
    canvas.style.display = 'block';

    // 4. set the color of the html body background
    document.body.style.backgroundColor = backgroundColor;

    // 5. Return the "scale" value.  This is importnat because you need
    //    this for correct hit testing between pointer and sprites
    return scale;
  }
})()