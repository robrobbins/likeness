import {OPERATORTEST, CENTERENDTEST, CENTERBEGTEST, RIGHTTEST, BOTTOMTEST, TORADIANS} from './constants';

// common properties to all likeness subjects
const PROPS = {
  x: 0,
  y: 0,
  anchor: 'top/left',
  rotate: 0,
  scale: 1
};

// common metrics as well
const METRICS = {
  x: 0,
  y: 0,
  width: null,
  height: null
};

export default class {
  applyTransforms(ctx) {
    let anchor = this.getAnchor({
      width: this.metrics.width / this.props.scale,
      height: this.metrics.height / this.props.scale
    });
    
    ctx.translate.apply(ctx, anchor);
    
    if(this.props.rotate) {
      ctx.translate(-anchor[0], -anchor[1]);
      ctx.rotate(this.props.rotate * TORADIANS);
      ctx.translate(anchor[0], anchor[1]);
    }
    
    if(this.props.scale !== 1) {
      ctx.translate(-anchor[0], -anchor[1]);
      ctx.scale(this.props.scale, this.props.scale);
      ctx.translate(anchor[0], anchor[1]);
    }
  }

  // ##draw
  // ###virtual
  // Each Likeness Subject knows how to draw itself onto a given likenes
  // controlled canvas.
  // `param` {object} `likeness`. An instance of the Likeness class
  // `returns` {object} subject.
  draw(/*likeness*/) {}
  
  // ##getAnchor
  // `param` {object=} `metrics`. modified metrics that match the name of a 
  // property on `this.metrics`. used this way as not to modify our actual
  // metrics where we dont want too, only wanting a temporary ref. Optional
  // `returns` {aray} An [x,y] "point"
  getAnchor(metrics={}) {
    let p = [0,0];
    let width = metrics.width || this.metrics.width;
    let height = metrics.height || this.metrics.height;

    if(this.props.anchor.match(CENTERENDTEST)) p[0] = -width / 2;
    else if(this.props.anchor.match(RIGHTTEST)) p[0] = -width;

    if(this.props.anchor.match(CENTERBEGTEST)) p[1] = -height / 2;
    else if(this.props.anchor.match(BOTTOMTEST)) p[1] = -height;

    return p;
  }
  
  getMetric(key) {
    return this.metrics[key];
  }
  
  getProp(key) {
    return this.props[key];
  }
  
  // ##idPoint
  // given an item in a points array, return a string value representing what we
  // think they represent.
  // `param` {array} `point`
  // `returns` {string} ["line"|"arc"|"bezier"]
  // ###static
  static idPoint(point) {
    let len = point.length;
    // unsure of future number of entries, going with if as i dont want a
    // "switch penalty" perf hit in the draw method of subjects.
    if(len === 2) return 'line';
    if(len === 5) return 'arc';
    if(len === 6) return 'bezier';
  }
  
  // ##initMetrics
  initMetrics() {
    this.metrics = Object.assign({}, METRICS);
  }
  
  // ##initProps
  // Takes any passed in props along with this base class definition and 
  // sets them as the "defaults" for this instance.
  // NOTE: this is the only place you can establish what props may be updated,
  // as updateProps will reject keys not already present in `this.props`.
  // `param` {object=} `props`.
  // `returns` undefined
  initProps(props={}) {
    this.props = Object.assign({}, PROPS, props);
  }
  
  // ##updateMetrics
  // ###virtual
  updateMetrics() {}
  
  // ##updateProp
  // `param` {*} `key`. 
  // `param` {*} `val`.
  updateProp(key, val) {
    // properties are not an optional group, only update represented...
    if(key in this.props) {
      let currentVal = this.props[key];
      // normalize numbers...
      if(typeof currentVal === 'number') {
        if(typeof val === 'string') {
          let result = val.match(OPERATORTEST);
          if(result) {
            val = parseFloat(val.replace(OPERATORTEST, ''));
            val = result[1] === '+' ? currentVal + val : currentVal - val;
          } else val = parseFloat(val); // not a [+-]= operand... 
        } else if(isNaN(val)) val = currentVal; // guard against borked math...
      }
      
      // only setting like-for-like here...
      if((typeof currentVal) === (typeof val)) this.props[key] = val;
    }
  }
  
  // ##updateProps
  // overridden in child classes to peform first this, then their own
  // specialized prop operations after...
  // `param` {object} `props`.
  updateProps(props={}) {
    Object.keys(props).forEach((key) => {
      this.updateProp(key, props[key]);
    });
  }
}