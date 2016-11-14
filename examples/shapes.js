import Likeness from './../js/likeness';
import Poly from './../js/polygon';
import Line from './../js/line'

let like = new Likeness();

like.addToContainer('#container');

// poly ----------
let poly = new Poly({
  points: [[100, 0], [200, 100], [100, 200], [0, 100]],
  lineWidth: 5,
  strokeStyle: '#333E4B',
  fillStyle: '#1C73A8'
});

like.addToCanvas(poly);

// line -----------
let line = new Line({
  x: like.width() / 2,
  y: like.height() / 2,
  x2: 200,
  lineWidth: 10,
  strokeStyle: '#1C73A8',
  anchor: 'center'
});

like.addToCanvas(line);