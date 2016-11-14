import {CENTERENDTEST, CENTERBEGTEST, RIGHTTEST, BOTTOMTEST} from './constants';
import Poly from './polygon';

const PROPS = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  lineWidth: 1,
  shape: 'line'
};

export default class extends Poly {
  constructor(props) {
    // don't pass the line classes initial props to super...
    super();
    // now handle line class specifics, note to bring in the already set
    // initial values...
    this.initProps(Object.assign({}, this.props, PROPS));
    props && this.updateProps(props);
  }
  
  getAnchor(metrics={}) {
    let p = [0,0];
    let width = metrics.width || this.metrics.width;
    let height = metrics.height || this.metrics.height;
    let lw = this.props.lineWidth;

    if(this.props.anchor.match(CENTERENDTEST)) p[0] = -(width / 2 - lw / 2);
    else if(this.props.anchor.match(RIGHTTEST)) p[0] = -(width - lw);

    if(this.props.anchor.match(CENTERBEGTEST)) p[1] = -(height / 2 - lw / 2);
    else if(this.props.anchor.match(BOTTOMTEST)) p[1] = -(height - lw);

    return p;
  }
  
  updateProps(props) {
    super.updateProps(props);
    
    if(this.props.shape === 'line') {
      this.props.translate = [this.props.x, this.props.y];
      this.props.globalAlpha = this.props.opacity / 100;
      this.props.closePath = false;
      this.props.points = [[this.props.x1, this.props.y1], [this.props.x2, this.props.y2]];
      this.updateMetrics();
    }
  }
}