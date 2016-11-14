/* global document:false */

const CONTEXTPROPS = ['fillStyle', 'font', 'globalAlpha', 
  'globalCompositeOperation', 'lineCap', 'lineJoin', 'lineWidth', 'miterLimit',
  'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'strokeStyle',
  'textAlign', 'textBaseline'];

export default class {
  // ##addToCanvas
  // Given a viewer subject or an Array of them, put them into view.
  // `example` viewer.add(rectangle, {x: ..., y:...})...
  // `param` {object} `subject`. An likeness object to draw.
  // `returns` likeness
  addToCanvas(subject) {
    Array.isArray(subject) ? subject.forEach((s) => { s.draw(this) }) :
      subject.draw(this);
    
    return this;
  }
  
  // ##addToContainer
  // a likeness instance creates and keeps its own internal canvas element.
  // pass in a node|selector-string instructing the instance to place it on an
  // html page here.
  //
  // TODO we could support other methods like insertBefore etc...
  //
  // `param` {node|string} `container`. Dom element or selector that is to
  // house the canvas.
  // `param` {number=} `height'. Optional height to assign to the created 
  // canvas. If omitted we will take the boundingRect width of the container.
  // `param` {number=} `width'. Optional width to assign to the created canvas.
  // If omitted we will take the boundingRect width of the container.
  // `returns` likeness
  addToContainer(container, width, height) {
    // the user could be 'resetting' the container...
    if(container) this.container = container;
    if(typeof this.container === 'string') this.container = document.querySelector(container);
    let bounds;
    // NOTE canvas size cannot be set by css as will result in skewed images
    // thus we'll take the bounding rect of the container here (unless passed)
    // and use our own exposed methods for setting width and height
    if(!height || !width) bounds = this.container.getBoundingClientRect();
    this.height(height || bounds.height);
    this.width(width || bounds.width);
    this.container.appendChild(this.canvas);
    
    return this;
  }
  
  // ##clear
  // Clear the canvas.
  // `returns` likeness
  clear() {
    this.context.clearRect(0, 0, this.width(), this.height());
    return this;
  }
  
  // ##Likeness
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
  }
  
  // ##height
  // `param` {number=} `n`. The height to set the on the canvas (in pixels).
  //  If omitted, method serves as a getter, returning the currently set height.
  // `returns` {object|number} `this` if used as a setter, the height otherwise.
  height(n) {
    if(n) {
      this.canvas.setAttribute('height', n);
      return this;
    }
    
    return this.canvas.getAttribute('height');
  }
  
  // #renderContext
  // `param` {object} `props`. Hash with context prop and/or context method
  // names with their corresponding values (including args if appropriate).
  // typically the props of a subject
  // `param` {function=} `fn`. Optional callback to be called after rendering.
  // this is typically a draw function passed in by a calling subject.
  // `returns` {object} likeness
  renderContext(props, fn) {
    this.context.save();
    
    Object.keys(props).forEach((key) => {
      let val = props[key];
      // is this a contextual prop?
      if(CONTEXTPROPS.indexOf(key) !== -1) this.context[key] = val;
      else if(Array.isArray(val) && typeof this.context[key] === 'function') {
        // allow the calling of a context methods with args...
        this.context[key].apply(this.context, val);
      }
    });
    
    fn && fn.call(undefined, this);
    this.context.restore();
    
    return this;
  }
  
  // ##resizeForHd
  // `param` {number} `dpr`. given a devicePixelRatio (or lookup if falsy)
  // `returns` likeness
  resizeForHd(dpr) {
    // normalize the ratio
    if(dpr) dpr = parseFloat(dpr);
    else dpr = window.devicePixelRatio;
    
    if(dpr > 1) {
      let width = this.width();
      let height = this.height();
      
      this.canvas.setAttribute('style', `width:${width}px;height:${height}px;`);   
      this.canvas.setAttribute('width', width * dpr);
      this.canvas.setAttribute('height', height * dpr);

      this.ctx.scale(dpr, dpr);

      this.canvas.setAttribute('data-resized-for-hd', true);
    }
    
    return this;
  }
  
  // ##toBase64
  // `param` {number} `quality`. In the range of 0 to 100, export quality.
  // Defaults to 100
  // `param` {string} `format`. Canvas supports .png, .jpg, .bmp, .gif, .tiff.
  // Defaults to 'image/png'. If passing yourself be sure to specify the fully
  // qualified type name.
  toBase64(quality=100, format='image/png') {
    // canvas expects the quality as a decimal in range 0..1
    return this.canvas.toDataUrl(format, (quality / 100));
  }
  
  // ##width
  // `param` {number=} `n`. The width to set the on the canvas (in pixels).
  //  If omitted, method serves as a getter, returning the currently set width.
  // `returns` {object|number} `this` if used as a setter, the width otherwise.
  width(n) {
    if(n) {
      this.canvas.setAttribute('width', n);
      return this;
    }
    
    return this.canvas.getAttribute('width');
  }
}