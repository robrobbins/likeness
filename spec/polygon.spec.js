import Poly from './../js/polygon';

describe('polygon class', function() {

  beforeEach(function() {
    this.polygon = new Poly({
      points: [[100, 0], [200, 100], [100, 200], [0, 100]],
      lineWidth: 5,
      strokeStyle: '#333'
    });
  });
  
  it('exists', function() {
    expect(this.polygon).toBeTruthy();
  });
  
  
  it('has correct default and updated props', function() {
    expect(this.polygon.props).toBeTruthy();
    expect(this.polygon.props.scale).toBe(1);
    expect(this.polygon.props.shape).toBe('polygon');
    expect(this.polygon.props.fillStyle).toBe('#000');
    expect(this.polygon.props.strokeStyle).toBe('#333');
    expect(this.polygon.props.points.length).toBe(4);
  });
  
  it('has correct initial and updated metrics', function() {
    expect(this.polygon.metrics).toBeTruthy();
    expect(this.polygon.metrics.x).toBe(0);
    // from the points above ... 200 + 0 + 5
    expect(this.polygon.metrics.width).toBe(205);
    expect(this.polygon.metrics.height).toBe(205);
  })
});