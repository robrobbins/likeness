import Subject from './../js/subject.js';

describe('subject base class', function() {

  beforeEach(function() {
    this.subject = new Subject();
  });
  
  it('is constructed without any props', function() {
    expect(this.subject.props).toBeFalsy();
  });
  
  it('will initialize with default props', function() {
    this.subject.initProps();
    expect(this.subject.props).toBeTruthy();
    expect(this.subject.getProp('x')).toBe(0);
    expect(this.subject.getProp('y')).toBe(0);
  });
  
  it('will initialize with passed in props', function() {
    this.subject.initProps({x: 100, y: -100, rotate: 45});
    expect(this.subject.getProp('scale')).toBe(1);
    expect(this.subject.getProp('anchor')).toBe('top/left');
    expect(this.subject.getProp('y')).toBe(-100);
  });
  
  it('is constructed without any metrics', function() {
    expect(this.subject.metrics).toBeFalsy();
  });
  
  it('will init some default metrics', function() {
    this.subject.initMetrics();
    expect(this.subject.metrics).toBeTruthy();
    expect(this.subject.metrics.x).toBe(0);
    expect(this.subject.metrics.height).toBe(null);
  })
});