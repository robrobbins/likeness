import Likeness from './../js/likeness.js';

describe('likeness viewer', function() {
  let container = document.createElement('div');
  document.body.appendChild(container);
  container.style.height = '250px';
  container.style.width = '500px';

  beforeEach(function() {
    this.like = new Likeness();
    this.like.addToContainer(container);
  });
  
  it('exists as a constructor', function() {
    expect(Likeness).toBeTruthy();
  });
  
  it('exists as an instance', function() {
    expect(this.like).toBeTruthy();
    expect(this.like instanceof Likeness).toBe(true);
  });
  
  it('has taken the size of the container', function() {
    expect(this.like.width()).toBe('500');
    expect(this.like.height()).toBe('250');
  });
});