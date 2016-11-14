import Subject from './subject.js';

// defualt properties shared by all polygon instances
const PROPS = {
  opacity: 100,
  points: [],
  fillStyle: '#000',
  strokeStyle: '',
  lineWidth: 0,
  lineCap: 'butt',
  lineJoin: 'miter',
  closePath: true,
  shape: 'polygon'
};

export default class extends Subject {
  // ##Polygon
  constructor(props) {
    super();
    this.initMetrics();
    this.initProps(Object.assign({}, PROPS));
    // only call to update if passed to the constructor, indicates an instance
    // and not a subclass...
    props && this.updateProps(props);
  }
  
  // ##draw
  // Each subject calls to the likeness instance to render the context props via
  // `like.renderContext`, passing its own drawing functionality as a callback 
  // (the contextual render needs to happen first)
  draw(likeness) {
    let cb = function(like) {
      let ctx = like.context;
      let points = this.props.points;
    
      this.applyTransforms(ctx);
    
      if(points.length) {
        ctx.beginPath();
        // TODO determine if a FOR loop outperforms a forEach on this, and
        // if it has any real impact...
        points.forEach((p) => {
          let type = Subject.idPoint(p);
          // intentionally not using a switch here for perf consideration.
          // TODO verify my feelings about this...
          if(type === 'bezier') ctx.bezierCurveTo.apply(ctx, p);
          else if(type === 'arc') ctx.arc.apply(ctx, p);
          else if(type === 'line') ctx.lineTo.apply(ctx, p); 
        });
      
        if(this.props.closePath) ctx.closePath();
        else ctx.moveTo.apply(ctx, points[points.length - 1]);
      
        this.props.fillStyle && ctx.fill();
      
        if(this.props.lineWidth > 0) ctx.stroke();
      }
    }.bind(this);
    
    likeness.renderContext(this.props, cb);
  }
  
  // ##getAnchor
  // extends the super method to add the SWO to the point returned
  // `see` `Subject.getAnchor`
  getAnchor() {
    let p = super.getAnchor();
    // identity check avoids instanceof import wierdness...
    if(this.props.shape === 'polygon') {
      let SWO = this.getStrokeWidthOffset();
      p[0] = p[0] + SWO;
      p[1] = p[1] + SWO;
    }
    return p;
  }
  
  // ##getStrokeWidthOffset
  getStrokeWidthOffset() {
    let SWO = 0;
    if("lineWidth" in this.props) SWO = this.props.lineWidth / 2;
    return SWO;
  }
  
  // ##updateMetrics
  updateMetrics() {
    let bounds = {top: null, right: null, bottom: null, left: null};
    let SWO = this.getStrokeWidthOffset();
    let point = {};
    let anchor;
    
    this.props.points.forEach((p) => {
      // TODO use props.shape === 'rectangle'?
      if(p.length === 2) {
        point.x = p[0];
        point.y = p[1];
      } else if(p.length === 5) { // TODO use ...shape === 'circle'?
        this.metrics.width = this.metrics.height = p[2] * 2;
        point.x = p[0] - p[2];
        point.y = p[1] - p[2];
      }
      
      // NOTE: negative values such as, `-2 < null`, will evaluate to true
      // NOTE: how is the || case not always the case here?
      if(point.x < bounds.left || bounds.left === null) bounds.left = point.x;
      if(point.y < bounds.top || bounds.top === null) bounds.top = point.y;
      if(point.x > bounds.right || bounds.right === null) bounds.right = point.x;
      if(point.y > bounds.bottom || bounds.bottom === null) bounds.bottom = point.y;
    });
    
    this.metrics.x = this.props.x + bounds.left;
    this.metrics.y = this.props.y + bounds.top;
    
    if(this.metrics.width === null && this.metrics.height === null) {
      this.metrics.width = bounds.right - bounds.left;
      this.metrics.height = bounds.bottom - bounds.top;
    }
    
    this.metrics.width = (this.metrics.width + SWO * 2) * this.props.scale;
    this.metrics.height = (this.metrics.height + SWO * 2) * this.props.scale;
    
    anchor = this.getAnchor();
    
    this.metrics.x = this.metrics.x + anchor[0] - SWO;
    this.metrics.y = this.metrics.y + anchor[1] - SWO;
    
    if(this.props.shape === 'circle') {
      this.metrics.x = this.metrics.x + this.props.radius;
      this.metrics.y = this.metrics.y + this.props.radius;
    }
  }
  
  // ##updateProps
  updateProps(props) {
    super.updateProps(props);
    
    // post init configs for poly
    if(this.props.shape === 'polygon') {
      this.props.translate = [this.props.x, this.props.y];
      this.props.globalAlpha = this.props.opacity / 100; 
      this.updateMetrics();
    }
  }
}