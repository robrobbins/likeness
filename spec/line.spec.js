import Line from './../js/line';

describe('line class', function() {

  beforeEach(function() {
    this.line = new Line({
      x2: 200,
      lineWidth: 10,
      strokeStyle: '#444',
      anchor: 'center'
    });
  });
  
  it('exists', function() {
    expect(this.line).toBeTruthy();
  });
  
  
  it('has correct default and updated props', function() {
    expect(this.line.props).toBeTruthy();
    expect(this.line.props.shape).toBe('line');
    expect(this.line.props.anchor).toBe('center');
    expect(this.line.props.x2).toBe(200);
    expect(this.line.props.y1).toBe(0);
    expect(this.line.props.lineWidth).toBe(10);
    expect(this.line.props.strokeStyle).toBe('#444');
  });
  
  it('has correct initial and updated metrics', function() {
    expect(this.line.metrics).toBeTruthy();

  })
});