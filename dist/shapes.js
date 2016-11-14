/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _likeness = __webpack_require__(1);

	var _likeness2 = _interopRequireDefault(_likeness);

	var _polygon = __webpack_require__(2);

	var _polygon2 = _interopRequireDefault(_polygon);

	var _line = __webpack_require__(5);

	var _line2 = _interopRequireDefault(_line);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var like = new _likeness2.default();

	like.addToContainer('#container');

	// poly ----------
	var poly = new _polygon2.default({
	  points: [[100, 0], [200, 100], [100, 200], [0, 100]],
	  lineWidth: 5,
	  strokeStyle: '#333E4B',
	  fillStyle: '#1C73A8'
	});

	like.addToCanvas(poly);

	// line -----------
	var line = new _line2.default({
	  x: like.width() / 2,
	  y: like.height() / 2,
	  x2: 200,
	  lineWidth: 10,
	  strokeStyle: '#1C73A8',
	  anchor: 'center'
	});

	like.addToCanvas(line);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* global document:false */

	var CONTEXTPROPS = ['fillStyle', 'font', 'globalAlpha', 'globalCompositeOperation', 'lineCap', 'lineJoin', 'lineWidth', 'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'strokeStyle', 'textAlign', 'textBaseline'];

	var _class = function () {
	  _createClass(_class, [{
	    key: 'addToCanvas',

	    // ##addToCanvas
	    // Given a viewer subject or an Array of them, put them into view.
	    // `example` viewer.add(rectangle, {x: ..., y:...})...
	    // `param` {object} `subject`. An likeness object to draw.
	    // `returns` likeness
	    value: function addToCanvas(subject) {
	      var _this = this;

	      Array.isArray(subject) ? subject.forEach(function (s) {
	        s.draw(_this);
	      }) : subject.draw(this);

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

	  }, {
	    key: 'addToContainer',
	    value: function addToContainer(container, width, height) {
	      // the user could be 'resetting' the container...
	      if (container) this.container = container;
	      if (typeof this.container === 'string') this.container = document.querySelector(container);
	      var bounds = void 0;
	      // NOTE canvas size cannot be set by css as will result in skewed images
	      // thus we'll take the bounding rect of the container here (unless passed)
	      // and use our own exposed methods for setting width and height
	      if (!height || !width) bounds = this.container.getBoundingClientRect();
	      this.height(height || bounds.height);
	      this.width(width || bounds.width);
	      this.container.appendChild(this.canvas);

	      return this;
	    }

	    // ##clear
	    // Clear the canvas.
	    // `returns` likeness

	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.context.clearRect(0, 0, this.width(), this.height());
	      return this;
	    }

	    // ##Likeness

	  }]);

	  function _class() {
	    _classCallCheck(this, _class);

	    this.canvas = document.createElement('canvas');
	    this.context = this.canvas.getContext('2d');
	  }

	  // ##height
	  // `param` {number=} `n`. The height to set the on the canvas (in pixels).
	  //  If omitted, method serves as a getter, returning the currently set height.
	  // `returns` {object|number} `this` if used as a setter, the height otherwise.


	  _createClass(_class, [{
	    key: 'height',
	    value: function height(n) {
	      if (n) {
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

	  }, {
	    key: 'renderContext',
	    value: function renderContext(props, fn) {
	      var _this2 = this;

	      this.context.save();

	      Object.keys(props).forEach(function (key) {
	        var val = props[key];
	        // is this a contextual prop?
	        if (CONTEXTPROPS.indexOf(key) !== -1) _this2.context[key] = val;else if (Array.isArray(val) && typeof _this2.context[key] === 'function') {
	          // allow the calling of a context methods with args...
	          _this2.context[key].apply(_this2.context, val);
	        }
	      });

	      fn && fn.call(undefined, this);
	      this.context.restore();

	      return this;
	    }

	    // ##resizeForHd
	    // `param` {number} `dpr`. given a devicePixelRatio (or lookup if falsy)
	    // `returns` likeness

	  }, {
	    key: 'resizeForHd',
	    value: function resizeForHd(dpr) {
	      // normalize the ratio
	      if (dpr) dpr = parseFloat(dpr);else dpr = window.devicePixelRatio;

	      if (dpr > 1) {
	        var width = this.width();
	        var height = this.height();

	        this.canvas.setAttribute('style', 'width:' + width + 'px;height:' + height + 'px;');
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

	  }, {
	    key: 'toBase64',
	    value: function toBase64() {
	      var quality = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
	      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/png';

	      // canvas expects the quality as a decimal in range 0..1
	      return this.canvas.toDataUrl(format, quality / 100);
	    }

	    // ##width
	    // `param` {number=} `n`. The width to set the on the canvas (in pixels).
	    //  If omitted, method serves as a getter, returning the currently set width.
	    // `returns` {object|number} `this` if used as a setter, the width otherwise.

	  }, {
	    key: 'width',
	    value: function width(n) {
	      if (n) {
	        this.canvas.setAttribute('width', n);
	        return this;
	      }

	      return this.canvas.getAttribute('width');
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _subject = __webpack_require__(3);

	var _subject2 = _interopRequireDefault(_subject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// defualt properties shared by all polygon instances
	var PROPS = {
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

	var _class = function (_Subject) {
	  _inherits(_class, _Subject);

	  // ##Polygon
	  function _class(props) {
	    _classCallCheck(this, _class);

	    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	    _this.initMetrics();
	    _this.initProps(Object.assign({}, PROPS));
	    // only call to update if passed to the constructor, indicates an instance
	    // and not a subclass...
	    props && _this.updateProps(props);
	    return _this;
	  }

	  // ##draw
	  // Each subject calls to the likeness instance to render the context props via
	  // `like.renderContext`, passing its own drawing functionality as a callback 
	  // (the contextual render needs to happen first)


	  _createClass(_class, [{
	    key: 'draw',
	    value: function draw(likeness) {
	      var cb = function (like) {
	        var ctx = like.context;
	        var points = this.props.points;

	        this.applyTransforms(ctx);

	        if (points.length) {
	          ctx.beginPath();
	          // TODO determine if a FOR loop outperforms a forEach on this, and
	          // if it has any real impact...
	          points.forEach(function (p) {
	            var type = _subject2.default.idPoint(p);
	            // intentionally not using a switch here for perf consideration.
	            // TODO verify my feelings about this...
	            if (type === 'bezier') ctx.bezierCurveTo.apply(ctx, p);else if (type === 'arc') ctx.arc.apply(ctx, p);else if (type === 'line') ctx.lineTo.apply(ctx, p);
	          });

	          if (this.props.closePath) ctx.closePath();else ctx.moveTo.apply(ctx, points[points.length - 1]);

	          this.props.fillStyle && ctx.fill();

	          if (this.props.lineWidth > 0) ctx.stroke();
	        }
	      }.bind(this);

	      likeness.renderContext(this.props, cb);
	    }

	    // ##getAnchor
	    // extends the super method to add the SWO to the point returned
	    // `see` `Subject.getAnchor`

	  }, {
	    key: 'getAnchor',
	    value: function getAnchor() {
	      var p = _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'getAnchor', this).call(this);
	      // identity check avoids instanceof import wierdness...
	      if (this.props.shape === 'polygon') {
	        var SWO = this.getStrokeWidthOffset();
	        p[0] = p[0] + SWO;
	        p[1] = p[1] + SWO;
	      }
	      return p;
	    }

	    // ##getStrokeWidthOffset

	  }, {
	    key: 'getStrokeWidthOffset',
	    value: function getStrokeWidthOffset() {
	      var SWO = 0;
	      if ("lineWidth" in this.props) SWO = this.props.lineWidth / 2;
	      return SWO;
	    }

	    // ##updateMetrics

	  }, {
	    key: 'updateMetrics',
	    value: function updateMetrics() {
	      var _this2 = this;

	      var bounds = { top: null, right: null, bottom: null, left: null };
	      var SWO = this.getStrokeWidthOffset();
	      var point = {};
	      var anchor = void 0;

	      this.props.points.forEach(function (p) {
	        // TODO use props.shape === 'rectangle'?
	        if (p.length === 2) {
	          point.x = p[0];
	          point.y = p[1];
	        } else if (p.length === 5) {
	          // TODO use ...shape === 'circle'?
	          _this2.metrics.width = _this2.metrics.height = p[2] * 2;
	          point.x = p[0] - p[2];
	          point.y = p[1] - p[2];
	        }

	        // NOTE: negative values such as, `-2 < null`, will evaluate to true
	        // NOTE: how is the || case not always the case here?
	        if (point.x < bounds.left || bounds.left === null) bounds.left = point.x;
	        if (point.y < bounds.top || bounds.top === null) bounds.top = point.y;
	        if (point.x > bounds.right || bounds.right === null) bounds.right = point.x;
	        if (point.y > bounds.bottom || bounds.bottom === null) bounds.bottom = point.y;
	      });

	      this.metrics.x = this.props.x + bounds.left;
	      this.metrics.y = this.props.y + bounds.top;

	      if (this.metrics.width === null && this.metrics.height === null) {
	        this.metrics.width = bounds.right - bounds.left;
	        this.metrics.height = bounds.bottom - bounds.top;
	      }

	      this.metrics.width = (this.metrics.width + SWO * 2) * this.props.scale;
	      this.metrics.height = (this.metrics.height + SWO * 2) * this.props.scale;

	      anchor = this.getAnchor();

	      this.metrics.x = this.metrics.x + anchor[0] - SWO;
	      this.metrics.y = this.metrics.y + anchor[1] - SWO;

	      if (this.props.shape === 'circle') {
	        this.metrics.x = this.metrics.x + this.props.radius;
	        this.metrics.y = this.metrics.y + this.props.radius;
	      }
	    }

	    // ##updateProps

	  }, {
	    key: 'updateProps',
	    value: function updateProps(props) {
	      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'updateProps', this).call(this, props);

	      // post init configs for poly
	      if (this.props.shape === 'polygon') {
	        this.props.translate = [this.props.x, this.props.y];
	        this.props.globalAlpha = this.props.opacity / 100;
	        this.updateMetrics();
	      }
	    }
	  }]);

	  return _class;
	}(_subject2.default);

	exports.default = _class;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _constants = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// common properties to all likeness subjects
	var PROPS = {
	  x: 0,
	  y: 0,
	  anchor: 'top/left',
	  rotate: 0,
	  scale: 1
	};

	// common metrics as well
	var METRICS = {
	  x: 0,
	  y: 0,
	  width: null,
	  height: null
	};

	var _class = function () {
	  function _class() {
	    _classCallCheck(this, _class);
	  }

	  _createClass(_class, [{
	    key: 'applyTransforms',
	    value: function applyTransforms(ctx) {
	      var anchor = this.getAnchor({
	        width: this.metrics.width / this.props.scale,
	        height: this.metrics.height / this.props.scale
	      });

	      ctx.translate.apply(ctx, anchor);

	      if (this.props.rotate) {
	        ctx.translate(-anchor[0], -anchor[1]);
	        ctx.rotate(this.props.rotate * _constants.TORADIANS);
	        ctx.translate(anchor[0], anchor[1]);
	      }

	      if (this.props.scale !== 1) {
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

	  }, {
	    key: 'draw',
	    value: function draw() /*likeness*/{}

	    // ##getAnchor
	    // `param` {object=} `metrics`. modified metrics that match the name of a 
	    // property on `this.metrics`. used this way as not to modify our actual
	    // metrics where we dont want too, only wanting a temporary ref. Optional
	    // `returns` {aray} An [x,y] "point"

	  }, {
	    key: 'getAnchor',
	    value: function getAnchor() {
	      var metrics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var p = [0, 0];
	      var width = metrics.width || this.metrics.width;
	      var height = metrics.height || this.metrics.height;

	      if (this.props.anchor.match(_constants.CENTERENDTEST)) p[0] = -width / 2;else if (this.props.anchor.match(_constants.RIGHTTEST)) p[0] = -width;

	      if (this.props.anchor.match(_constants.CENTERBEGTEST)) p[1] = -height / 2;else if (this.props.anchor.match(_constants.BOTTOMTEST)) p[1] = -height;

	      return p;
	    }
	  }, {
	    key: 'getMetric',
	    value: function getMetric(key) {
	      return this.metrics[key];
	    }
	  }, {
	    key: 'getProp',
	    value: function getProp(key) {
	      return this.props[key];
	    }

	    // ##idPoint
	    // given an item in a points array, return a string value representing what we
	    // think they represent.
	    // `param` {array} `point`
	    // `returns` {string} ["line"|"arc"|"bezier"]
	    // ###static

	  }, {
	    key: 'initMetrics',


	    // ##initMetrics
	    value: function initMetrics() {
	      this.metrics = Object.assign({}, METRICS);
	    }

	    // ##initProps
	    // Takes any passed in props along with this base class definition and 
	    // sets them as the "defaults" for this instance.
	    // NOTE: this is the only place you can establish what props may be updated,
	    // as updateProps will reject keys not already present in `this.props`.
	    // `param` {object=} `props`.
	    // `returns` undefined

	  }, {
	    key: 'initProps',
	    value: function initProps() {
	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      this.props = Object.assign({}, PROPS, props);
	    }

	    // ##updateMetrics
	    // ###virtual

	  }, {
	    key: 'updateMetrics',
	    value: function updateMetrics() {}

	    // ##updateProp
	    // `param` {*} `key`. 
	    // `param` {*} `val`.

	  }, {
	    key: 'updateProp',
	    value: function updateProp(key, val) {
	      // properties are not an optional group, only update represented...
	      if (key in this.props) {
	        var currentVal = this.props[key];
	        // normalize numbers...
	        if (typeof currentVal === 'number') {
	          if (typeof val === 'string') {
	            var result = val.match(_constants.OPERATORTEST);
	            if (result) {
	              val = parseFloat(val.replace(_constants.OPERATORTEST, ''));
	              val = result[1] === '+' ? currentVal + val : currentVal - val;
	            } else val = parseFloat(val); // not a [+-]= operand... 
	          } else if (isNaN(val)) val = currentVal; // guard against borked math...
	        }

	        // only setting like-for-like here...
	        if ((typeof currentVal === 'undefined' ? 'undefined' : _typeof(currentVal)) === (typeof val === 'undefined' ? 'undefined' : _typeof(val))) this.props[key] = val;
	      }
	    }

	    // ##updateProps
	    // overridden in child classes to peform first this, then their own
	    // specialized prop operations after...
	    // `param` {object} `props`.

	  }, {
	    key: 'updateProps',
	    value: function updateProps() {
	      var _this = this;

	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      Object.keys(props).forEach(function (key) {
	        _this.updateProp(key, props[key]);
	      });
	    }
	  }], [{
	    key: 'idPoint',
	    value: function idPoint(point) {
	      var len = point.length;
	      // unsure of future number of entries, going with if as i dont want a
	      // "switch penalty" perf hit in the draw method of subjects.
	      if (len === 2) return 'line';
	      if (len === 5) return 'arc';
	      if (len === 6) return 'bezier';
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var OPERATORTEST = exports.OPERATORTEST = /^([-+])=/;
	var CENTERENDTEST = exports.CENTERENDTEST = /center$/;
	var CENTERBEGTEST = exports.CENTERBEGTEST = /^center/;
	var RIGHTTEST = exports.RIGHTTEST = /right$/;
	var BOTTOMTEST = exports.BOTTOMTEST = /^bottom/;
	var TORADIANS = exports.TORADIANS = Math.PI / 180;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _constants = __webpack_require__(4);

	var _polygon = __webpack_require__(2);

	var _polygon2 = _interopRequireDefault(_polygon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PROPS = {
	  x1: 0,
	  y1: 0,
	  x2: 0,
	  y2: 0,
	  lineWidth: 1,
	  shape: 'line'
	};

	var _class = function (_Poly) {
	  _inherits(_class, _Poly);

	  function _class(props) {
	    _classCallCheck(this, _class);

	    // now handle line class specifics, note to bring in the already set
	    // initial values...
	    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));
	    // don't pass the line classes initial props to super...


	    _this.initProps(Object.assign({}, _this.props, PROPS));
	    props && _this.updateProps(props);
	    return _this;
	  }

	  _createClass(_class, [{
	    key: 'getAnchor',
	    value: function getAnchor() {
	      var metrics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var p = [0, 0];
	      var width = metrics.width || this.metrics.width;
	      var height = metrics.height || this.metrics.height;
	      var lw = this.props.lineWidth;

	      if (this.props.anchor.match(_constants.CENTERENDTEST)) p[0] = -(width / 2 - lw / 2);else if (this.props.anchor.match(_constants.RIGHTTEST)) p[0] = -(width - lw);

	      if (this.props.anchor.match(_constants.CENTERBEGTEST)) p[1] = -(height / 2 - lw / 2);else if (this.props.anchor.match(_constants.BOTTOMTEST)) p[1] = -(height - lw);

	      return p;
	    }
	  }, {
	    key: 'updateProps',
	    value: function updateProps(props) {
	      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'updateProps', this).call(this, props);

	      if (this.props.shape === 'line') {
	        this.props.translate = [this.props.x, this.props.y];
	        this.props.globalAlpha = this.props.opacity / 100;
	        this.props.closePath = false;
	        this.props.points = [[this.props.x1, this.props.y1], [this.props.x2, this.props.y2]];
	        this.updateMetrics();
	      }
	    }
	  }]);

	  return _class;
	}(_polygon2.default);

	exports.default = _class;

/***/ }
/******/ ]);