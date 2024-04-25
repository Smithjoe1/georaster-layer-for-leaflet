(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("leaflet"));
	else if(typeof define === 'function' && define.amd)
		define(["leaflet"], factory);
	else if(typeof exports === 'object')
		exports["GeoRasterLayer"] = factory(require("leaflet"));
	else
		root["GeoRasterLayer"] = factory(root["L"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__8293__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4053:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license
 *
 * chroma.js - JavaScript library for color conversions
 * 
 * Copyright (c) 2011-2017, Gregor Aisch
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

(function () {
  var Color,
    DEG2RAD,
    LAB_CONSTANTS,
    PI,
    PITHIRD,
    RAD2DEG,
    TWOPI,
    _average_lrgb,
    _guess_formats,
    _guess_formats_sorted,
    _input,
    _interpolators,
    abs,
    atan2,
    _bezier,
    _blend,
    blend_f,
    brewer,
    burn,
    chroma,
    clip_rgb,
    cmyk2rgb,
    colors,
    cos,
    css2rgb,
    darken,
    dodge,
    each,
    floor,
    hcg2rgb,
    hex2rgb,
    hsi2rgb,
    hsl2css,
    hsl2rgb,
    hsv2rgb,
    interpolate,
    interpolate_hsx,
    interpolate_lab,
    interpolate_lrgb,
    interpolate_num,
    interpolate_rgb,
    lab2lch,
    lab2rgb,
    lab_xyz,
    lch2lab,
    lch2rgb,
    lighten,
    limit,
    log,
    luminance_x,
    m,
    max,
    multiply,
    normal,
    num2rgb,
    overlay,
    pow,
    rgb2cmyk,
    rgb2css,
    rgb2hcg,
    rgb2hex,
    rgb2hsi,
    rgb2hsl,
    rgb2hsv,
    rgb2lab,
    rgb2lch,
    rgb2luminance,
    rgb2num,
    rgb2temperature,
    rgb2xyz,
    rgb_xyz,
    rnd,
    root,
    round,
    screen,
    sin,
    sqrt,
    temperature2rgb,
    type,
    unpack,
    w3cx11,
    xyz_lab,
    xyz_rgb,
    slice = [].slice;
  type = function () {
    /*
    for browser-safe type checking+
    ported from jQuery's $.type
     */
    var classToType, len, name, o, ref;
    classToType = {};
    ref = "Boolean Number String Function Array Date RegExp Undefined Null".split(" ");
    for (o = 0, len = ref.length; o < len; o++) {
      name = ref[o];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    return function (obj) {
      var strType;
      strType = Object.prototype.toString.call(obj);
      return classToType[strType] || "object";
    };
  }();
  limit = function limit(x, min, max) {
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1;
    }
    if (x < min) {
      x = min;
    }
    if (x > max) {
      x = max;
    }
    return x;
  };
  unpack = function unpack(args) {
    if (args.length >= 3) {
      return Array.prototype.slice.call(args);
    } else {
      return args[0];
    }
  };
  clip_rgb = function clip_rgb(rgb) {
    var i, o;
    rgb._clipped = false;
    rgb._unclipped = rgb.slice(0);
    for (i = o = 0; o < 3; i = ++o) {
      if (i < 3) {
        if (rgb[i] < 0 || rgb[i] > 255) {
          rgb._clipped = true;
        }
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 255) {
          rgb[i] = 255;
        }
      } else if (i === 3) {
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 1) {
          rgb[i] = 1;
        }
      }
    }
    if (!rgb._clipped) {
      delete rgb._unclipped;
    }
    return rgb;
  };
  PI = Math.PI, round = Math.round, cos = Math.cos, floor = Math.floor, pow = Math.pow, log = Math.log, sin = Math.sin, sqrt = Math.sqrt, atan2 = Math.atan2, max = Math.max, abs = Math.abs;
  TWOPI = PI * 2;
  PITHIRD = PI / 3;
  DEG2RAD = PI / 180;
  RAD2DEG = 180 / PI;
  chroma = function chroma() {
    if (arguments[0] instanceof Color) {
      return arguments[0];
    }
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, arguments, function () {});
  };
  chroma["default"] = chroma;
  _interpolators = [];
  if ( true && module !== null && module.exports != null) {
    module.exports = chroma;
  }
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return chroma;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
  chroma.version = '1.4.1';
  _input = {};
  _guess_formats = [];
  _guess_formats_sorted = false;
  Color = function () {
    function Color() {
      var arg, args, chk, len, len1, me, mode, o, w;
      me = this;
      args = [];
      for (o = 0, len = arguments.length; o < len; o++) {
        arg = arguments[o];
        if (arg != null) {
          args.push(arg);
        }
      }
      if (args.length > 1) {
        mode = args[args.length - 1];
      }
      if (_input[mode] != null) {
        me._rgb = clip_rgb(_input[mode](unpack(args.slice(0, -1))));
      } else {
        if (!_guess_formats_sorted) {
          _guess_formats = _guess_formats.sort(function (a, b) {
            return b.p - a.p;
          });
          _guess_formats_sorted = true;
        }
        for (w = 0, len1 = _guess_formats.length; w < len1; w++) {
          chk = _guess_formats[w];
          mode = chk.test.apply(chk, args);
          if (mode) {
            break;
          }
        }
        if (mode) {
          me._rgb = clip_rgb(_input[mode].apply(_input, args));
        }
      }
      if (me._rgb == null) {
        console.warn('unknown format: ' + args);
      }
      if (me._rgb == null) {
        me._rgb = [0, 0, 0];
      }
      if (me._rgb.length === 3) {
        me._rgb.push(1);
      }
    }
    Color.prototype.toString = function () {
      return this.hex();
    };
    return Color;
  }();
  chroma._input = _input;

  /**
  	ColorBrewer colors for chroma.js
  
  	Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The 
  	Pennsylvania State University.
  
  	Licensed under the Apache License, Version 2.0 (the "License"); 
  	you may not use this file except in compliance with the License.
  	You may obtain a copy of the License at	
  	http://www.apache.org/licenses/LICENSE-2.0
  
  	Unless required by applicable law or agreed to in writing, software distributed
  	under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
  	CONDITIONS OF ANY KIND, either express or implied. See the License for the
  	specific language governing permissions and limitations under the License.
  
      @preserve
   */

  chroma.brewer = brewer = {
    OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
    PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
    BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
    Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
    BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
    YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
    Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
    RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
    Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
    YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
    Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
    GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
    Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
    YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
    PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
    Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
    PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
    Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],
    Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
    RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
    RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
    PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
    PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
    RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
    BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
    RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
    PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],
    Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
    Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
    Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
    Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
    Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
    Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
    Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
    Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
  };
  (function () {
    var key, results;
    results = [];
    for (key in brewer) {
      results.push(brewer[key.toLowerCase()] = brewer[key]);
    }
    return results;
  })();

  /**
  	X11 color names
  
  	http://www.w3.org/TR/css3-color/#svg-color
   */

  w3cx11 = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflower: '#6495ed',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    laserlemon: '#ffff54',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrod: '#fafad2',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    maroon2: '#7f0000',
    maroon3: '#b03060',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    purple2: '#7f007f',
    purple3: '#a020f0',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
  };
  chroma.colors = colors = w3cx11;
  lab2rgb = function lab2rgb() {
    var a, args, b, g, l, r, x, y, z;
    args = unpack(arguments);
    l = args[0], a = args[1], b = args[2];
    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;
    y = LAB_CONSTANTS.Yn * lab_xyz(y);
    x = LAB_CONSTANTS.Xn * lab_xyz(x);
    z = LAB_CONSTANTS.Zn * lab_xyz(z);
    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
    b = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };
  xyz_rgb = function xyz_rgb(r) {
    return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055);
  };
  lab_xyz = function lab_xyz(t) {
    if (t > LAB_CONSTANTS.t1) {
      return t * t * t;
    } else {
      return LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
    }
  };
  LAB_CONSTANTS = {
    Kn: 18,
    Xn: 0.950470,
    Yn: 1,
    Zn: 1.088830,
    t0: 0.137931034,
    t1: 0.206896552,
    t2: 0.12841855,
    t3: 0.008856452
  };
  rgb2lab = function rgb2lab() {
    var b, g, r, ref, ref1, x, y, z;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    ref1 = rgb2xyz(r, g, b), x = ref1[0], y = ref1[1], z = ref1[2];
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  };
  rgb_xyz = function rgb_xyz(r) {
    if ((r /= 255) <= 0.04045) {
      return r / 12.92;
    } else {
      return pow((r + 0.055) / 1.055, 2.4);
    }
  };
  xyz_lab = function xyz_lab(t) {
    if (t > LAB_CONSTANTS.t3) {
      return pow(t, 1 / 3);
    } else {
      return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
    }
  };
  rgb2xyz = function rgb2xyz() {
    var b, g, r, ref, x, y, z;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
    y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS.Yn);
    z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
    return [x, y, z];
  };
  chroma.lab = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['lab']), function () {});
  };
  _input.lab = lab2rgb;
  Color.prototype.lab = function () {
    return rgb2lab(this._rgb);
  };
  _bezier = function bezier(colors) {
    var I, I0, I1, c, lab0, lab1, lab2, lab3, ref, ref1, ref2;
    colors = function () {
      var len, o, results;
      results = [];
      for (o = 0, len = colors.length; o < len; o++) {
        c = colors[o];
        results.push(chroma(c));
      }
      return results;
    }();
    if (colors.length === 2) {
      ref = function () {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      }(), lab0 = ref[0], lab1 = ref[1];
      I = function I(t) {
        var i, lab;
        lab = function () {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push(lab0[i] + t * (lab1[i] - lab0[i]));
          }
          return results;
        }();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 3) {
      ref1 = function () {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      }(), lab0 = ref1[0], lab1 = ref1[1], lab2 = ref1[2];
      I = function I(t) {
        var i, lab;
        lab = function () {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push((1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]);
          }
          return results;
        }();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 4) {
      ref2 = function () {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      }(), lab0 = ref2[0], lab1 = ref2[1], lab2 = ref2[2], lab3 = ref2[3];
      I = function I(t) {
        var i, lab;
        lab = function () {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push((1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]);
          }
          return results;
        }();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 5) {
      I0 = _bezier(colors.slice(0, 3));
      I1 = _bezier(colors.slice(2, 5));
      I = function I(t) {
        if (t < 0.5) {
          return I0(t * 2);
        } else {
          return I1((t - 0.5) * 2);
        }
      };
    }
    return I;
  };
  chroma.bezier = function (colors) {
    var f;
    f = _bezier(colors);
    f.scale = function () {
      return chroma.scale(f);
    };
    return f;
  };
  chroma.cubehelix = function (start, rotations, hue, gamma, lightness) {
    var dh, dl, f;
    if (start == null) {
      start = 300;
    }
    if (rotations == null) {
      rotations = -1.5;
    }
    if (hue == null) {
      hue = 1;
    }
    if (gamma == null) {
      gamma = 1;
    }
    if (lightness == null) {
      lightness = [0, 1];
    }
    dh = 0;
    if (type(lightness) === 'array') {
      dl = lightness[1] - lightness[0];
    } else {
      dl = 0;
      lightness = [lightness, lightness];
    }
    f = function f(fract) {
      var a, amp, b, cos_a, g, h, l, r, sin_a;
      a = TWOPI * ((start + 120) / 360 + rotations * fract);
      l = pow(lightness[0] + dl * fract, gamma);
      h = dh !== 0 ? hue[0] + fract * dh : hue;
      amp = h * l * (1 - l) / 2;
      cos_a = cos(a);
      sin_a = sin(a);
      r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
      g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
      b = l + amp * (+1.97294 * cos_a);
      return chroma(clip_rgb([r * 255, g * 255, b * 255, 1]));
    };
    f.start = function (s) {
      if (s == null) {
        return start;
      }
      start = s;
      return f;
    };
    f.rotations = function (r) {
      if (r == null) {
        return rotations;
      }
      rotations = r;
      return f;
    };
    f.gamma = function (g) {
      if (g == null) {
        return gamma;
      }
      gamma = g;
      return f;
    };
    f.hue = function (h) {
      if (h == null) {
        return hue;
      }
      hue = h;
      if (type(hue) === 'array') {
        dh = hue[1] - hue[0];
        if (dh === 0) {
          hue = hue[1];
        }
      } else {
        dh = 0;
      }
      return f;
    };
    f.lightness = function (h) {
      if (h == null) {
        return lightness;
      }
      if (type(h) === 'array') {
        lightness = h;
        dl = h[1] - h[0];
      } else {
        lightness = [h, h];
        dl = 0;
      }
      return f;
    };
    f.scale = function () {
      return chroma.scale(f);
    };
    f.hue(hue);
    return f;
  };
  chroma.random = function () {
    var code, digits, i, o;
    digits = '0123456789abcdef';
    code = '#';
    for (i = o = 0; o < 6; i = ++o) {
      code += digits.charAt(floor(Math.random() * 16));
    }
    return new Color(code);
  };
  _interpolators = [];
  interpolate = function interpolate(col1, col2, f, m) {
    var interpol, len, o, res;
    if (f == null) {
      f = 0.5;
    }
    if (m == null) {
      m = 'rgb';
    }

    /*
    interpolates between colors
    f = 0 --> me
    f = 1 --> col
     */
    if (type(col1) !== 'object') {
      col1 = chroma(col1);
    }
    if (type(col2) !== 'object') {
      col2 = chroma(col2);
    }
    for (o = 0, len = _interpolators.length; o < len; o++) {
      interpol = _interpolators[o];
      if (m === interpol[0]) {
        res = interpol[1](col1, col2, f, m);
        break;
      }
    }
    if (res == null) {
      throw "color mode " + m + " is not supported";
    }
    return res.alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
  };
  chroma.interpolate = interpolate;
  Color.prototype.interpolate = function (col2, f, m) {
    return interpolate(this, col2, f, m);
  };
  chroma.mix = interpolate;
  Color.prototype.mix = Color.prototype.interpolate;
  _input.rgb = function () {
    var k, ref, results, v;
    ref = unpack(arguments);
    results = [];
    for (k in ref) {
      v = ref[k];
      results.push(v);
    }
    return results;
  };
  chroma.rgb = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['rgb']), function () {});
  };
  Color.prototype.rgb = function (round) {
    if (round == null) {
      round = true;
    }
    if (round) {
      return this._rgb.map(Math.round).slice(0, 3);
    } else {
      return this._rgb.slice(0, 3);
    }
  };
  Color.prototype.rgba = function (round) {
    if (round == null) {
      round = true;
    }
    if (!round) {
      return this._rgb.slice(0);
    }
    return [Math.round(this._rgb[0]), Math.round(this._rgb[1]), Math.round(this._rgb[2]), this._rgb[3]];
  };
  _guess_formats.push({
    p: 3,
    test: function test(n) {
      var a;
      a = unpack(arguments);
      if (type(a) === 'array' && a.length === 3) {
        return 'rgb';
      }
      if (a.length === 4 && type(a[3]) === "number" && a[3] >= 0 && a[3] <= 1) {
        return 'rgb';
      }
    }
  });
  _input.lrgb = _input.rgb;
  interpolate_lrgb = function interpolate_lrgb(col1, col2, f, m) {
    var xyz0, xyz1;
    xyz0 = col1._rgb;
    xyz1 = col2._rgb;
    return new Color(sqrt(pow(xyz0[0], 2) * (1 - f) + pow(xyz1[0], 2) * f), sqrt(pow(xyz0[1], 2) * (1 - f) + pow(xyz1[1], 2) * f), sqrt(pow(xyz0[2], 2) * (1 - f) + pow(xyz1[2], 2) * f), m);
  };
  _average_lrgb = function _average_lrgb(colors) {
    var col, f, len, o, rgb, xyz;
    f = 1 / colors.length;
    xyz = [0, 0, 0, 0];
    for (o = 0, len = colors.length; o < len; o++) {
      col = colors[o];
      rgb = col._rgb;
      xyz[0] += pow(rgb[0], 2) * f;
      xyz[1] += pow(rgb[1], 2) * f;
      xyz[2] += pow(rgb[2], 2) * f;
      xyz[3] += rgb[3] * f;
    }
    xyz[0] = sqrt(xyz[0]);
    xyz[1] = sqrt(xyz[1]);
    xyz[2] = sqrt(xyz[2]);
    if (xyz[3] > 1) {
      xyz[3] = 1;
    }
    return new Color(clip_rgb(xyz));
  };
  _interpolators.push(['lrgb', interpolate_lrgb]);
  chroma.average = function (colors, mode) {
    var A, alpha, c, cnt, dx, dy, first, i, l, len, o, xyz, xyz2;
    if (mode == null) {
      mode = 'rgb';
    }
    l = colors.length;
    colors = colors.map(function (c) {
      return chroma(c);
    });
    first = colors.splice(0, 1)[0];
    if (mode === 'lrgb') {
      return _average_lrgb(colors);
    }
    xyz = first.get(mode);
    cnt = [];
    dx = 0;
    dy = 0;
    for (i in xyz) {
      xyz[i] = xyz[i] || 0;
      cnt.push(isNaN(xyz[i]) ? 0 : 1);
      if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
        A = xyz[i] / 180 * PI;
        dx += cos(A);
        dy += sin(A);
      }
    }
    alpha = first.alpha();
    for (o = 0, len = colors.length; o < len; o++) {
      c = colors[o];
      xyz2 = c.get(mode);
      alpha += c.alpha();
      for (i in xyz) {
        if (!isNaN(xyz2[i])) {
          cnt[i] += 1;
          if (mode.charAt(i) === 'h') {
            A = xyz2[i] / 180 * PI;
            dx += cos(A);
            dy += sin(A);
          } else {
            xyz[i] += xyz2[i];
          }
        }
      }
    }
    for (i in xyz) {
      if (mode.charAt(i) === 'h') {
        A = atan2(dy / cnt[i], dx / cnt[i]) / PI * 180;
        while (A < 0) {
          A += 360;
        }
        while (A >= 360) {
          A -= 360;
        }
        xyz[i] = A;
      } else {
        xyz[i] = xyz[i] / cnt[i];
      }
    }
    return chroma(xyz, mode).alpha(alpha / l);
  };
  hex2rgb = function hex2rgb(hex) {
    var a, b, g, r, rgb, u;
    if (hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      if (hex.length === 4 || hex.length === 7) {
        hex = hex.substr(1);
      }
      if (hex.length === 3) {
        hex = hex.split("");
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      u = parseInt(hex, 16);
      r = u >> 16;
      g = u >> 8 & 0xFF;
      b = u & 0xFF;
      return [r, g, b, 1];
    }
    if (hex.match(/^#?([A-Fa-f0-9]{8})$/)) {
      if (hex.length === 9) {
        hex = hex.substr(1);
      }
      u = parseInt(hex, 16);
      r = u >> 24 & 0xFF;
      g = u >> 16 & 0xFF;
      b = u >> 8 & 0xFF;
      a = round((u & 0xFF) / 0xFF * 100) / 100;
      return [r, g, b, a];
    }
    if (_input.css != null && (rgb = _input.css(hex))) {
      return rgb;
    }
    throw "unknown color: " + hex;
  };
  rgb2hex = function rgb2hex(channels, mode) {
    var a, b, g, hxa, r, str, u;
    if (mode == null) {
      mode = 'auto';
    }
    r = channels[0], g = channels[1], b = channels[2], a = channels[3];
    if (mode === 'auto') {
      mode = a < 1 ? 'rgba' : 'rgb';
    }
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    u = r << 16 | g << 8 | b;
    str = "000000" + u.toString(16);
    str = str.substr(str.length - 6);
    hxa = '0' + round(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    return "#" + function () {
      switch (mode.toLowerCase()) {
        case 'rgba':
          return str + hxa;
        case 'argb':
          return hxa + str;
        default:
          return str;
      }
    }();
  };
  _input.hex = function (h) {
    return hex2rgb(h);
  };
  chroma.hex = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['hex']), function () {});
  };
  Color.prototype.hex = function (mode) {
    if (mode == null) {
      mode = 'auto';
    }
    return rgb2hex(this._rgb, mode);
  };
  _guess_formats.push({
    p: 4,
    test: function test(n) {
      if (arguments.length === 1 && type(n) === "string") {
        return 'hex';
      }
    }
  });
  hsl2rgb = function hsl2rgb() {
    var args, b, c, g, h, i, l, o, r, ref, s, t1, t2, t3;
    args = unpack(arguments);
    h = args[0], s = args[1], l = args[2];
    if (s === 0) {
      r = g = b = l * 255;
    } else {
      t3 = [0, 0, 0];
      c = [0, 0, 0];
      t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      t1 = 2 * l - t2;
      h /= 360;
      t3[0] = h + 1 / 3;
      t3[1] = h;
      t3[2] = h - 1 / 3;
      for (i = o = 0; o <= 2; i = ++o) {
        if (t3[i] < 0) {
          t3[i] += 1;
        }
        if (t3[i] > 1) {
          t3[i] -= 1;
        }
        if (6 * t3[i] < 1) {
          c[i] = t1 + (t2 - t1) * 6 * t3[i];
        } else if (2 * t3[i] < 1) {
          c[i] = t2;
        } else if (3 * t3[i] < 2) {
          c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
        } else {
          c[i] = t1;
        }
      }
      ref = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)], r = ref[0], g = ref[1], b = ref[2];
    }
    if (args.length > 3) {
      return [r, g, b, args[3]];
    } else {
      return [r, g, b];
    }
  };
  rgb2hsl = function rgb2hsl(r, g, b) {
    var h, l, min, ref, s;
    if (r !== void 0 && r.length >= 3) {
      ref = r, r = ref[0], g = ref[1], b = ref[2];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    l = (max + min) / 2;
    if (max === min) {
      s = 0;
      h = Number.NaN;
    } else {
      s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    }
    if (r === max) {
      h = (g - b) / (max - min);
    } else if (g === max) {
      h = 2 + (b - r) / (max - min);
    } else if (b === max) {
      h = 4 + (r - g) / (max - min);
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
    return [h, s, l];
  };
  chroma.hsl = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['hsl']), function () {});
  };
  _input.hsl = hsl2rgb;
  Color.prototype.hsl = function () {
    return rgb2hsl(this._rgb);
  };
  hsv2rgb = function hsv2rgb() {
    var args, b, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, s, t, v;
    args = unpack(arguments);
    h = args[0], s = args[1], v = args[2];
    v *= 255;
    if (s === 0) {
      r = g = b = v;
    } else {
      if (h === 360) {
        h = 0;
      }
      if (h > 360) {
        h -= 360;
      }
      if (h < 0) {
        h += 360;
      }
      h /= 60;
      i = floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
          break;
        case 1:
          ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
          break;
        case 2:
          ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
          break;
        case 3:
          ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
          break;
        case 4:
          ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
          break;
        case 5:
          ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
      }
    }
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };
  rgb2hsv = function rgb2hsv() {
    var b, delta, g, h, min, r, ref, s, v;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    delta = max - min;
    v = max / 255.0;
    if (max === 0) {
      h = Number.NaN;
      s = 0;
    } else {
      s = delta / max;
      if (r === max) {
        h = (g - b) / delta;
      }
      if (g === max) {
        h = 2 + (b - r) / delta;
      }
      if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h *= 60;
      if (h < 0) {
        h += 360;
      }
    }
    return [h, s, v];
  };
  chroma.hsv = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['hsv']), function () {});
  };
  _input.hsv = hsv2rgb;
  Color.prototype.hsv = function () {
    return rgb2hsv(this._rgb);
  };
  num2rgb = function num2rgb(num) {
    var b, g, r;
    if (type(num) === "number" && num >= 0 && num <= 0xFFFFFF) {
      r = num >> 16;
      g = num >> 8 & 0xFF;
      b = num & 0xFF;
      return [r, g, b, 1];
    }
    console.warn("unknown num color: " + num);
    return [0, 0, 0, 1];
  };
  rgb2num = function rgb2num() {
    var b, g, r, ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    return (r << 16) + (g << 8) + b;
  };
  chroma.num = function (num) {
    return new Color(num, 'num');
  };
  Color.prototype.num = function (mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    return rgb2num(this._rgb, mode);
  };
  _input.num = num2rgb;
  _guess_formats.push({
    p: 1,
    test: function test(n) {
      if (arguments.length === 1 && type(n) === "number" && n >= 0 && n <= 0xFFFFFF) {
        return 'num';
      }
    }
  });
  hcg2rgb = function hcg2rgb() {
    var _c, _g, args, b, c, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, t, v;
    args = unpack(arguments);
    h = args[0], c = args[1], _g = args[2];
    c = c / 100;
    g = g / 100 * 255;
    _c = c * 255;
    if (c === 0) {
      r = g = b = _g;
    } else {
      if (h === 360) {
        h = 0;
      }
      if (h > 360) {
        h -= 360;
      }
      if (h < 0) {
        h += 360;
      }
      h /= 60;
      i = floor(h);
      f = h - i;
      p = _g * (1 - c);
      q = p + _c * (1 - f);
      t = p + _c * f;
      v = p + _c;
      switch (i) {
        case 0:
          ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
          break;
        case 1:
          ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
          break;
        case 2:
          ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
          break;
        case 3:
          ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
          break;
        case 4:
          ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
          break;
        case 5:
          ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
      }
    }
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };
  rgb2hcg = function rgb2hcg() {
    var _g, b, c, delta, g, h, min, r, ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    delta = max - min;
    c = delta * 100 / 255;
    _g = min / (255 - delta) * 100;
    if (delta === 0) {
      h = Number.NaN;
    } else {
      if (r === max) {
        h = (g - b) / delta;
      }
      if (g === max) {
        h = 2 + (b - r) / delta;
      }
      if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h *= 60;
      if (h < 0) {
        h += 360;
      }
    }
    return [h, c, _g];
  };
  chroma.hcg = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['hcg']), function () {});
  };
  _input.hcg = hcg2rgb;
  Color.prototype.hcg = function () {
    return rgb2hcg(this._rgb);
  };
  css2rgb = function css2rgb(css) {
    var aa, ab, hsl, i, m, o, rgb, w;
    css = css.toLowerCase();
    if (chroma.colors != null && chroma.colors[css]) {
      return hex2rgb(chroma.colors[css]);
    }
    if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
      rgb = m.slice(1, 4);
      for (i = o = 0; o <= 2; i = ++o) {
        rgb[i] = +rgb[i];
      }
      rgb[3] = 1;
    } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
      rgb = m.slice(1, 5);
      for (i = w = 0; w <= 3; i = ++w) {
        rgb[i] = +rgb[i];
      }
    } else if (m = css.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
      rgb = m.slice(1, 4);
      for (i = aa = 0; aa <= 2; i = ++aa) {
        rgb[i] = round(rgb[i] * 2.55);
      }
      rgb[3] = 1;
    } else if (m = css.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
      rgb = m.slice(1, 5);
      for (i = ab = 0; ab <= 2; i = ++ab) {
        rgb[i] = round(rgb[i] * 2.55);
      }
      rgb[3] = +rgb[3];
    } else if (m = css.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
      hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      rgb = hsl2rgb(hsl);
      rgb[3] = 1;
    } else if (m = css.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
      hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      rgb = hsl2rgb(hsl);
      rgb[3] = +m[4];
    }
    return rgb;
  };
  rgb2css = function rgb2css(rgba) {
    var mode;
    mode = rgba[3] < 1 ? 'rgba' : 'rgb';
    if (mode === 'rgb') {
      return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ')';
    } else if (mode === 'rgba') {
      return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ',' + rgba[3] + ')';
    } else {}
  };
  rnd = function rnd(a) {
    return round(a * 100) / 100;
  };
  hsl2css = function hsl2css(hsl, alpha) {
    var mode;
    mode = alpha < 1 ? 'hsla' : 'hsl';
    hsl[0] = rnd(hsl[0] || 0);
    hsl[1] = rnd(hsl[1] * 100) + '%';
    hsl[2] = rnd(hsl[2] * 100) + '%';
    if (mode === 'hsla') {
      hsl[3] = alpha;
    }
    return mode + '(' + hsl.join(',') + ')';
  };
  _input.css = function (h) {
    return css2rgb(h);
  };
  chroma.css = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['css']), function () {});
  };
  Color.prototype.css = function (mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    if (mode.slice(0, 3) === 'rgb') {
      return rgb2css(this._rgb);
    } else if (mode.slice(0, 3) === 'hsl') {
      return hsl2css(this.hsl(), this.alpha());
    }
  };
  _input.named = function (name) {
    return hex2rgb(w3cx11[name]);
  };
  _guess_formats.push({
    p: 5,
    test: function test(n) {
      if (arguments.length === 1 && w3cx11[n] != null) {
        return 'named';
      }
    }
  });
  Color.prototype.name = function (n) {
    var h, k;
    if (arguments.length) {
      if (w3cx11[n]) {
        this._rgb = hex2rgb(w3cx11[n]);
      }
      this._rgb[3] = 1;
      this;
    }
    h = this.hex('rgb');
    for (k in w3cx11) {
      if (h === w3cx11[k]) {
        return k;
      }
    }
    return h;
  };
  lch2lab = function lch2lab() {
    /*
    Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
    These formulas were invented by David Dalrymple to obtain maximum contrast without going
    out of gamut if the parameters are in the range 0-1.
    
    A saturation multiplier was added by Gregor Aisch
     */
    var c, h, l, ref;
    ref = unpack(arguments), l = ref[0], c = ref[1], h = ref[2];
    h = h * DEG2RAD;
    return [l, cos(h) * c, sin(h) * c];
  };
  lch2rgb = function lch2rgb() {
    var L, a, args, b, c, g, h, l, r, ref, ref1;
    args = unpack(arguments);
    l = args[0], c = args[1], h = args[2];
    ref = lch2lab(l, c, h), L = ref[0], a = ref[1], b = ref[2];
    ref1 = lab2rgb(L, a, b), r = ref1[0], g = ref1[1], b = ref1[2];
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };
  lab2lch = function lab2lch() {
    var a, b, c, h, l, ref;
    ref = unpack(arguments), l = ref[0], a = ref[1], b = ref[2];
    c = sqrt(a * a + b * b);
    h = (atan2(b, a) * RAD2DEG + 360) % 360;
    if (round(c * 10000) === 0) {
      h = Number.NaN;
    }
    return [l, c, h];
  };
  rgb2lch = function rgb2lch() {
    var a, b, g, l, r, ref, ref1;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    ref1 = rgb2lab(r, g, b), l = ref1[0], a = ref1[1], b = ref1[2];
    return lab2lch(l, a, b);
  };
  chroma.lch = function () {
    var args;
    args = unpack(arguments);
    return new Color(args, 'lch');
  };
  chroma.hcl = function () {
    var args;
    args = unpack(arguments);
    return new Color(args, 'hcl');
  };
  _input.lch = lch2rgb;
  _input.hcl = function () {
    var c, h, l, ref;
    ref = unpack(arguments), h = ref[0], c = ref[1], l = ref[2];
    return lch2rgb([l, c, h]);
  };
  Color.prototype.lch = function () {
    return rgb2lch(this._rgb);
  };
  Color.prototype.hcl = function () {
    return rgb2lch(this._rgb).reverse();
  };
  rgb2cmyk = function rgb2cmyk(mode) {
    var b, c, f, g, k, m, r, ref, y;
    if (mode == null) {
      mode = 'rgb';
    }
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = r / 255;
    g = g / 255;
    b = b / 255;
    k = 1 - Math.max(r, Math.max(g, b));
    f = k < 1 ? 1 / (1 - k) : 0;
    c = (1 - r - k) * f;
    m = (1 - g - k) * f;
    y = (1 - b - k) * f;
    return [c, m, y, k];
  };
  cmyk2rgb = function cmyk2rgb() {
    var alpha, args, b, c, g, k, m, r, y;
    args = unpack(arguments);
    c = args[0], m = args[1], y = args[2], k = args[3];
    alpha = args.length > 4 ? args[4] : 1;
    if (k === 1) {
      return [0, 0, 0, alpha];
    }
    r = c >= 1 ? 0 : 255 * (1 - c) * (1 - k);
    g = m >= 1 ? 0 : 255 * (1 - m) * (1 - k);
    b = y >= 1 ? 0 : 255 * (1 - y) * (1 - k);
    return [r, g, b, alpha];
  };
  _input.cmyk = function () {
    return cmyk2rgb(unpack(arguments));
  };
  chroma.cmyk = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['cmyk']), function () {});
  };
  Color.prototype.cmyk = function () {
    return rgb2cmyk(this._rgb);
  };
  _input.gl = function () {
    var i, k, o, rgb, v;
    rgb = function () {
      var ref, results;
      ref = unpack(arguments);
      results = [];
      for (k in ref) {
        v = ref[k];
        results.push(v);
      }
      return results;
    }.apply(this, arguments);
    for (i = o = 0; o <= 2; i = ++o) {
      rgb[i] *= 255;
    }
    return rgb;
  };
  chroma.gl = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['gl']), function () {});
  };
  Color.prototype.gl = function () {
    var rgb;
    rgb = this._rgb;
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
  };
  rgb2luminance = function rgb2luminance(r, g, b) {
    var ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = luminance_x(r);
    g = luminance_x(g);
    b = luminance_x(b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  luminance_x = function luminance_x(x) {
    x /= 255;
    if (x <= 0.03928) {
      return x / 12.92;
    } else {
      return pow((x + 0.055) / 1.055, 2.4);
    }
  };
  interpolate_rgb = function interpolate_rgb(col1, col2, f, m) {
    var xyz0, xyz1;
    xyz0 = col1._rgb;
    xyz1 = col2._rgb;
    return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
  };
  _interpolators.push(['rgb', interpolate_rgb]);
  Color.prototype.luminance = function (lum, mode) {
    var cur_lum, eps, max_iter, rgba, _test;
    if (mode == null) {
      mode = 'rgb';
    }
    if (!arguments.length) {
      return rgb2luminance(this._rgb);
    }
    rgba = this._rgb;
    if (lum === 0) {
      rgba = [0, 0, 0, this._rgb[3]];
    } else if (lum === 1) {
      rgba = [255, 255, 255, this[3]];
    } else {
      cur_lum = rgb2luminance(this._rgb);
      eps = 1e-7;
      max_iter = 20;
      _test = function test(l, h) {
        var lm, m;
        m = l.interpolate(h, 0.5, mode);
        lm = m.luminance();
        if (Math.abs(lum - lm) < eps || !max_iter--) {
          return m;
        }
        if (lm > lum) {
          return _test(l, m);
        }
        return _test(m, h);
      };
      if (cur_lum > lum) {
        rgba = _test(chroma('black'), this).rgba();
      } else {
        rgba = _test(this, chroma('white')).rgba();
      }
    }
    return chroma(rgba).alpha(this.alpha());
  };
  temperature2rgb = function temperature2rgb(kelvin) {
    var b, g, r, temp;
    temp = kelvin / 100;
    if (temp < 66) {
      r = 255;
      g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
      b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
    } else {
      r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
      g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
      b = 255;
    }
    return [r, g, b];
  };
  rgb2temperature = function rgb2temperature() {
    var b, eps, g, maxTemp, minTemp, r, ref, rgb, temp;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    minTemp = 1000;
    maxTemp = 40000;
    eps = 0.4;
    while (maxTemp - minTemp > eps) {
      temp = (maxTemp + minTemp) * 0.5;
      rgb = temperature2rgb(temp);
      if (rgb[2] / rgb[0] >= b / r) {
        maxTemp = temp;
      } else {
        minTemp = temp;
      }
    }
    return round(temp);
  };
  chroma.temperature = chroma.kelvin = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['temperature']), function () {});
  };
  _input.temperature = _input.kelvin = _input.K = temperature2rgb;
  Color.prototype.temperature = function () {
    return rgb2temperature(this._rgb);
  };
  Color.prototype.kelvin = Color.prototype.temperature;
  chroma.contrast = function (a, b) {
    var l1, l2, ref, ref1;
    if ((ref = type(a)) === 'string' || ref === 'number') {
      a = new Color(a);
    }
    if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
      b = new Color(b);
    }
    l1 = a.luminance();
    l2 = b.luminance();
    if (l1 > l2) {
      return (l1 + 0.05) / (l2 + 0.05);
    } else {
      return (l2 + 0.05) / (l1 + 0.05);
    }
  };
  chroma.distance = function (a, b, mode) {
    var d, i, l1, l2, ref, ref1, sum_sq;
    if (mode == null) {
      mode = 'lab';
    }
    if ((ref = type(a)) === 'string' || ref === 'number') {
      a = new Color(a);
    }
    if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
      b = new Color(b);
    }
    l1 = a.get(mode);
    l2 = b.get(mode);
    sum_sq = 0;
    for (i in l1) {
      d = (l1[i] || 0) - (l2[i] || 0);
      sum_sq += d * d;
    }
    return Math.sqrt(sum_sq);
  };
  chroma.deltaE = function (a, b, L, C) {
    var L1, L2, a1, a2, b1, b2, c1, c2, c4, dH2, delA, delB, delC, delL, f, h1, ref, ref1, ref2, ref3, sc, sh, sl, t, v1, v2, v3;
    if (L == null) {
      L = 1;
    }
    if (C == null) {
      C = 1;
    }
    if ((ref = type(a)) === 'string' || ref === 'number') {
      a = new Color(a);
    }
    if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
      b = new Color(b);
    }
    ref2 = a.lab(), L1 = ref2[0], a1 = ref2[1], b1 = ref2[2];
    ref3 = b.lab(), L2 = ref3[0], a2 = ref3[1], b2 = ref3[2];
    c1 = sqrt(a1 * a1 + b1 * b1);
    c2 = sqrt(a2 * a2 + b2 * b2);
    sl = L1 < 16.0 ? 0.511 : 0.040975 * L1 / (1.0 + 0.01765 * L1);
    sc = 0.0638 * c1 / (1.0 + 0.0131 * c1) + 0.638;
    h1 = c1 < 0.000001 ? 0.0 : atan2(b1, a1) * 180.0 / PI;
    while (h1 < 0) {
      h1 += 360;
    }
    while (h1 >= 360) {
      h1 -= 360;
    }
    t = h1 >= 164.0 && h1 <= 345.0 ? 0.56 + abs(0.2 * cos(PI * (h1 + 168.0) / 180.0)) : 0.36 + abs(0.4 * cos(PI * (h1 + 35.0) / 180.0));
    c4 = c1 * c1 * c1 * c1;
    f = sqrt(c4 / (c4 + 1900.0));
    sh = sc * (f * t + 1.0 - f);
    delL = L1 - L2;
    delC = c1 - c2;
    delA = a1 - a2;
    delB = b1 - b2;
    dH2 = delA * delA + delB * delB - delC * delC;
    v1 = delL / (L * sl);
    v2 = delC / (C * sc);
    v3 = sh;
    return sqrt(v1 * v1 + v2 * v2 + dH2 / (v3 * v3));
  };
  Color.prototype.get = function (modechan) {
    var channel, i, me, mode, ref, src;
    me = this;
    ref = modechan.split('.'), mode = ref[0], channel = ref[1];
    src = me[mode]();
    if (channel) {
      i = mode.indexOf(channel);
      if (i > -1) {
        return src[i];
      } else {
        return console.warn('unknown channel ' + channel + ' in mode ' + mode);
      }
    } else {
      return src;
    }
  };
  Color.prototype.set = function (modechan, value) {
    var channel, i, me, mode, ref, src;
    me = this;
    ref = modechan.split('.'), mode = ref[0], channel = ref[1];
    if (channel) {
      src = me[mode]();
      i = mode.indexOf(channel);
      if (i > -1) {
        if (type(value) === 'string') {
          switch (value.charAt(0)) {
            case '+':
              src[i] += +value;
              break;
            case '-':
              src[i] += +value;
              break;
            case '*':
              src[i] *= +value.substr(1);
              break;
            case '/':
              src[i] /= +value.substr(1);
              break;
            default:
              src[i] = +value;
          }
        } else {
          src[i] = value;
        }
      } else {
        console.warn('unknown channel ' + channel + ' in mode ' + mode);
      }
    } else {
      src = value;
    }
    return chroma(src, mode).alpha(me.alpha());
  };
  Color.prototype.clipped = function () {
    return this._rgb._clipped || false;
  };
  Color.prototype.alpha = function (a) {
    if (arguments.length) {
      return chroma.rgb([this._rgb[0], this._rgb[1], this._rgb[2], a]);
    }
    return this._rgb[3];
  };
  Color.prototype.darken = function (amount) {
    var lab, me;
    if (amount == null) {
      amount = 1;
    }
    me = this;
    lab = me.lab();
    lab[0] -= LAB_CONSTANTS.Kn * amount;
    return chroma.lab(lab).alpha(me.alpha());
  };
  Color.prototype.brighten = function (amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.darken(-amount);
  };
  Color.prototype.darker = Color.prototype.darken;
  Color.prototype.brighter = Color.prototype.brighten;
  Color.prototype.saturate = function (amount) {
    var lch, me;
    if (amount == null) {
      amount = 1;
    }
    me = this;
    lch = me.lch();
    lch[1] += amount * LAB_CONSTANTS.Kn;
    if (lch[1] < 0) {
      lch[1] = 0;
    }
    return chroma.lch(lch).alpha(me.alpha());
  };
  Color.prototype.desaturate = function (amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.saturate(-amount);
  };
  Color.prototype.premultiply = function () {
    var a, rgb;
    rgb = this.rgb();
    a = this.alpha();
    return chroma(rgb[0] * a, rgb[1] * a, rgb[2] * a, a);
  };
  _blend = function blend(bottom, top, mode) {
    if (!_blend[mode]) {
      throw 'unknown blend mode ' + mode;
    }
    return _blend[mode](bottom, top);
  };
  blend_f = function blend_f(f) {
    return function (bottom, top) {
      var c0, c1;
      c0 = chroma(top).rgb();
      c1 = chroma(bottom).rgb();
      return chroma(f(c0, c1), 'rgb');
    };
  };
  each = function each(f) {
    return function (c0, c1) {
      var i, o, out;
      out = [];
      for (i = o = 0; o <= 3; i = ++o) {
        out[i] = f(c0[i], c1[i]);
      }
      return out;
    };
  };
  normal = function normal(a, b) {
    return a;
  };
  multiply = function multiply(a, b) {
    return a * b / 255;
  };
  darken = function darken(a, b) {
    if (a > b) {
      return b;
    } else {
      return a;
    }
  };
  lighten = function lighten(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };
  screen = function screen(a, b) {
    return 255 * (1 - (1 - a / 255) * (1 - b / 255));
  };
  overlay = function overlay(a, b) {
    if (b < 128) {
      return 2 * a * b / 255;
    } else {
      return 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    }
  };
  burn = function burn(a, b) {
    return 255 * (1 - (1 - b / 255) / (a / 255));
  };
  dodge = function dodge(a, b) {
    if (a === 255) {
      return 255;
    }
    a = 255 * (b / 255) / (1 - a / 255);
    if (a > 255) {
      return 255;
    } else {
      return a;
    }
  };
  _blend.normal = blend_f(each(normal));
  _blend.multiply = blend_f(each(multiply));
  _blend.screen = blend_f(each(screen));
  _blend.overlay = blend_f(each(overlay));
  _blend.darken = blend_f(each(darken));
  _blend.lighten = blend_f(each(lighten));
  _blend.dodge = blend_f(each(dodge));
  _blend.burn = blend_f(each(burn));
  chroma.blend = _blend;
  chroma.analyze = function (data) {
    var len, o, r, val;
    r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    for (o = 0, len = data.length; o < len; o++) {
      val = data[o];
      if (val != null && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min) {
          r.min = val;
        }
        if (val > r.max) {
          r.max = val;
        }
        r.count += 1;
      }
    }
    r.domain = [r.min, r.max];
    r.limits = function (mode, num) {
      return chroma.limits(r, mode, num);
    };
    return r;
  };
  chroma.scale = function (colors, positions) {
    var _classes, _colorCache, _colors, _correctLightness, _domain, _fixed, _gamma, _max, _min, _mode, _nacol, _out, _padding, _pos, _spread, _useCache, classifyValue, f, getClass, getColor, resetCache, setColors, tmap;
    _mode = 'rgb';
    _nacol = chroma('#ccc');
    _spread = 0;
    _fixed = false;
    _domain = [0, 1];
    _pos = [];
    _padding = [0, 0];
    _classes = false;
    _colors = [];
    _out = false;
    _min = 0;
    _max = 1;
    _correctLightness = false;
    _colorCache = {};
    _useCache = true;
    _gamma = 1;
    setColors = function setColors(colors) {
      var c, col, o, ref, ref1, w;
      if (colors == null) {
        colors = ['#fff', '#000'];
      }
      if (colors != null && type(colors) === 'string' && chroma.brewer != null) {
        colors = chroma.brewer[colors] || chroma.brewer[colors.toLowerCase()] || colors;
      }
      if (type(colors) === 'array') {
        if (colors.length === 1) {
          colors = [colors[0], colors[0]];
        }
        colors = colors.slice(0);
        for (c = o = 0, ref = colors.length - 1; 0 <= ref ? o <= ref : o >= ref; c = 0 <= ref ? ++o : --o) {
          col = colors[c];
          if (type(col) === "string") {
            colors[c] = chroma(col);
          }
        }
        _pos.length = 0;
        for (c = w = 0, ref1 = colors.length - 1; 0 <= ref1 ? w <= ref1 : w >= ref1; c = 0 <= ref1 ? ++w : --w) {
          _pos.push(c / (colors.length - 1));
        }
      }
      resetCache();
      return _colors = colors;
    };
    getClass = function getClass(value) {
      var i, n;
      if (_classes != null) {
        n = _classes.length - 1;
        i = 0;
        while (i < n && value >= _classes[i]) {
          i++;
        }
        return i - 1;
      }
      return 0;
    };
    tmap = function tmap(t) {
      return t;
    };
    classifyValue = function classifyValue(value) {
      var i, maxc, minc, n, val;
      val = value;
      if (_classes.length > 2) {
        n = _classes.length - 1;
        i = getClass(value);
        minc = _classes[0] + (_classes[1] - _classes[0]) * (0 + _spread * 0.5);
        maxc = _classes[n - 1] + (_classes[n] - _classes[n - 1]) * (1 - _spread * 0.5);
        val = _min + (_classes[i] + (_classes[i + 1] - _classes[i]) * 0.5 - minc) / (maxc - minc) * (_max - _min);
      }
      return val;
    };
    getColor = function getColor(val, bypassMap) {
      var c, col, i, k, o, p, ref, t;
      if (bypassMap == null) {
        bypassMap = false;
      }
      if (isNaN(val) || val === null) {
        return _nacol;
      }
      if (!bypassMap) {
        if (_classes && _classes.length > 2) {
          c = getClass(val);
          t = c / (_classes.length - 2);
        } else if (_max !== _min) {
          t = (val - _min) / (_max - _min);
        } else {
          t = 1;
        }
      } else {
        t = val;
      }
      if (!bypassMap) {
        t = tmap(t);
      }
      if (_gamma !== 1) {
        t = pow(t, _gamma);
      }
      t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
      t = Math.min(1, Math.max(0, t));
      k = Math.floor(t * 10000);
      if (_useCache && _colorCache[k]) {
        col = _colorCache[k];
      } else {
        if (type(_colors) === 'array') {
          for (i = o = 0, ref = _pos.length - 1; 0 <= ref ? o <= ref : o >= ref; i = 0 <= ref ? ++o : --o) {
            p = _pos[i];
            if (t <= p) {
              col = _colors[i];
              break;
            }
            if (t >= p && i === _pos.length - 1) {
              col = _colors[i];
              break;
            }
            if (t > p && t < _pos[i + 1]) {
              t = (t - p) / (_pos[i + 1] - p);
              col = chroma.interpolate(_colors[i], _colors[i + 1], t, _mode);
              break;
            }
          }
        } else if (type(_colors) === 'function') {
          col = _colors(t);
        }
        if (_useCache) {
          _colorCache[k] = col;
        }
      }
      return col;
    };
    resetCache = function resetCache() {
      return _colorCache = {};
    };
    setColors(colors);
    f = function f(v) {
      var c;
      c = chroma(getColor(v));
      if (_out && c[_out]) {
        return c[_out]();
      } else {
        return c;
      }
    };
    f.classes = function (classes) {
      var d;
      if (classes != null) {
        if (type(classes) === 'array') {
          _classes = classes;
          _domain = [classes[0], classes[classes.length - 1]];
        } else {
          d = chroma.analyze(_domain);
          if (classes === 0) {
            _classes = [d.min, d.max];
          } else {
            _classes = chroma.limits(d, 'e', classes);
          }
        }
        return f;
      }
      return _classes;
    };
    f.domain = function (domain) {
      var c, d, k, len, o, ref, w;
      if (!arguments.length) {
        return _domain;
      }
      _min = domain[0];
      _max = domain[domain.length - 1];
      _pos = [];
      k = _colors.length;
      if (domain.length === k && _min !== _max) {
        for (o = 0, len = domain.length; o < len; o++) {
          d = domain[o];
          _pos.push((d - _min) / (_max - _min));
        }
      } else {
        for (c = w = 0, ref = k - 1; 0 <= ref ? w <= ref : w >= ref; c = 0 <= ref ? ++w : --w) {
          _pos.push(c / (k - 1));
        }
      }
      _domain = [_min, _max];
      return f;
    };
    f.mode = function (_m) {
      if (!arguments.length) {
        return _mode;
      }
      _mode = _m;
      resetCache();
      return f;
    };
    f.range = function (colors, _pos) {
      setColors(colors, _pos);
      return f;
    };
    f.out = function (_o) {
      _out = _o;
      return f;
    };
    f.spread = function (val) {
      if (!arguments.length) {
        return _spread;
      }
      _spread = val;
      return f;
    };
    f.correctLightness = function (v) {
      if (v == null) {
        v = true;
      }
      _correctLightness = v;
      resetCache();
      if (_correctLightness) {
        tmap = function tmap(t) {
          var L0, L1, L_actual, L_diff, L_ideal, max_iter, pol, t0, t1;
          L0 = getColor(0, true).lab()[0];
          L1 = getColor(1, true).lab()[0];
          pol = L0 > L1;
          L_actual = getColor(t, true).lab()[0];
          L_ideal = L0 + (L1 - L0) * t;
          L_diff = L_actual - L_ideal;
          t0 = 0;
          t1 = 1;
          max_iter = 20;
          while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
            (function () {
              if (pol) {
                L_diff *= -1;
              }
              if (L_diff < 0) {
                t0 = t;
                t += (t1 - t) * 0.5;
              } else {
                t1 = t;
                t += (t0 - t) * 0.5;
              }
              L_actual = getColor(t, true).lab()[0];
              return L_diff = L_actual - L_ideal;
            })();
          }
          return t;
        };
      } else {
        tmap = function tmap(t) {
          return t;
        };
      }
      return f;
    };
    f.padding = function (p) {
      if (p != null) {
        if (type(p) === 'number') {
          p = [p, p];
        }
        _padding = p;
        return f;
      } else {
        return _padding;
      }
    };
    f.colors = function (numColors, out) {
      var dd, dm, i, o, ref, result, results, samples, w;
      if (arguments.length < 2) {
        out = 'hex';
      }
      result = [];
      if (arguments.length === 0) {
        result = _colors.slice(0);
      } else if (numColors === 1) {
        result = [f(0.5)];
      } else if (numColors > 1) {
        dm = _domain[0];
        dd = _domain[1] - dm;
        result = function () {
          results = [];
          for (var o = 0; 0 <= numColors ? o < numColors : o > numColors; 0 <= numColors ? o++ : o--) {
            results.push(o);
          }
          return results;
        }.apply(this).map(function (i) {
          return f(dm + i / (numColors - 1) * dd);
        });
      } else {
        colors = [];
        samples = [];
        if (_classes && _classes.length > 2) {
          for (i = w = 1, ref = _classes.length; 1 <= ref ? w < ref : w > ref; i = 1 <= ref ? ++w : --w) {
            samples.push((_classes[i - 1] + _classes[i]) * 0.5);
          }
        } else {
          samples = _domain;
        }
        result = samples.map(function (v) {
          return f(v);
        });
      }
      if (chroma[out]) {
        result = result.map(function (c) {
          return c[out]();
        });
      }
      return result;
    };
    f.cache = function (c) {
      if (c != null) {
        _useCache = c;
        return f;
      } else {
        return _useCache;
      }
    };
    f.gamma = function (g) {
      if (g != null) {
        _gamma = g;
        return f;
      } else {
        return _gamma;
      }
    };
    f.nodata = function (d) {
      if (d != null) {
        _nacol = chroma(d);
        return f;
      } else {
        return _nacol;
      }
    };
    return f;
  };
  if (chroma.scales == null) {
    chroma.scales = {};
  }
  chroma.scales.cool = function () {
    return chroma.scale([chroma.hsl(180, 1, .9), chroma.hsl(250, .7, .4)]);
  };
  chroma.scales.hot = function () {
    return chroma.scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb');
  };
  chroma.analyze = function (data, key, filter) {
    var add, k, len, o, r, val, visit;
    r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    if (filter == null) {
      filter = function filter() {
        return true;
      };
    }
    add = function add(val) {
      if (val != null && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min) {
          r.min = val;
        }
        if (val > r.max) {
          r.max = val;
        }
        r.count += 1;
      }
    };
    visit = function visit(val, k) {
      if (filter(val, k)) {
        if (key != null && type(key) === 'function') {
          return add(key(val));
        } else if (key != null && type(key) === 'string' || type(key) === 'number') {
          return add(val[key]);
        } else {
          return add(val);
        }
      }
    };
    if (type(data) === 'array') {
      for (o = 0, len = data.length; o < len; o++) {
        val = data[o];
        visit(val);
      }
    } else {
      for (k in data) {
        val = data[k];
        visit(val, k);
      }
    }
    r.domain = [r.min, r.max];
    r.limits = function (mode, num) {
      return chroma.limits(r, mode, num);
    };
    return r;
  };
  chroma.limits = function (data, mode, num) {
    var aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, assignments, best, centroids, cluster, clusterSizes, dist, i, j, kClusters, limits, max_log, min, min_log, mindist, n, nb_iters, newCentroids, o, p, pb, pr, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, repeat, sum, tmpKMeansBreaks, v, value, values, w;
    if (mode == null) {
      mode = 'equal';
    }
    if (num == null) {
      num = 7;
    }
    if (type(data) === 'array') {
      data = chroma.analyze(data);
    }
    min = data.min;
    max = data.max;
    sum = data.sum;
    values = data.values.sort(function (a, b) {
      return a - b;
    });
    if (num === 1) {
      return [min, max];
    }
    limits = [];
    if (mode.substr(0, 1) === 'c') {
      limits.push(min);
      limits.push(max);
    }
    if (mode.substr(0, 1) === 'e') {
      limits.push(min);
      for (i = o = 1, ref = num - 1; 1 <= ref ? o <= ref : o >= ref; i = 1 <= ref ? ++o : --o) {
        limits.push(min + i / num * (max - min));
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'l') {
      if (min <= 0) {
        throw 'Logarithmic scales are only possible for values > 0';
      }
      min_log = Math.LOG10E * log(min);
      max_log = Math.LOG10E * log(max);
      limits.push(min);
      for (i = w = 1, ref1 = num - 1; 1 <= ref1 ? w <= ref1 : w >= ref1; i = 1 <= ref1 ? ++w : --w) {
        limits.push(pow(10, min_log + i / num * (max_log - min_log)));
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'q') {
      limits.push(min);
      for (i = aa = 1, ref2 = num - 1; 1 <= ref2 ? aa <= ref2 : aa >= ref2; i = 1 <= ref2 ? ++aa : --aa) {
        p = (values.length - 1) * i / num;
        pb = floor(p);
        if (pb === p) {
          limits.push(values[pb]);
        } else {
          pr = p - pb;
          limits.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
        }
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'k') {
      /*
      implementation based on
      http://code.google.com/p/figue/source/browse/trunk/figue.js#336
      simplified for 1-d input values
       */
      n = values.length;
      assignments = new Array(n);
      clusterSizes = new Array(num);
      repeat = true;
      nb_iters = 0;
      centroids = null;
      centroids = [];
      centroids.push(min);
      for (i = ab = 1, ref3 = num - 1; 1 <= ref3 ? ab <= ref3 : ab >= ref3; i = 1 <= ref3 ? ++ab : --ab) {
        centroids.push(min + i / num * (max - min));
      }
      centroids.push(max);
      while (repeat) {
        for (j = ac = 0, ref4 = num - 1; 0 <= ref4 ? ac <= ref4 : ac >= ref4; j = 0 <= ref4 ? ++ac : --ac) {
          clusterSizes[j] = 0;
        }
        for (i = ad = 0, ref5 = n - 1; 0 <= ref5 ? ad <= ref5 : ad >= ref5; i = 0 <= ref5 ? ++ad : --ad) {
          value = values[i];
          mindist = Number.MAX_VALUE;
          for (j = ae = 0, ref6 = num - 1; 0 <= ref6 ? ae <= ref6 : ae >= ref6; j = 0 <= ref6 ? ++ae : --ae) {
            dist = abs(centroids[j] - value);
            if (dist < mindist) {
              mindist = dist;
              best = j;
            }
          }
          clusterSizes[best]++;
          assignments[i] = best;
        }
        newCentroids = new Array(num);
        for (j = af = 0, ref7 = num - 1; 0 <= ref7 ? af <= ref7 : af >= ref7; j = 0 <= ref7 ? ++af : --af) {
          newCentroids[j] = null;
        }
        for (i = ag = 0, ref8 = n - 1; 0 <= ref8 ? ag <= ref8 : ag >= ref8; i = 0 <= ref8 ? ++ag : --ag) {
          cluster = assignments[i];
          if (newCentroids[cluster] === null) {
            newCentroids[cluster] = values[i];
          } else {
            newCentroids[cluster] += values[i];
          }
        }
        for (j = ah = 0, ref9 = num - 1; 0 <= ref9 ? ah <= ref9 : ah >= ref9; j = 0 <= ref9 ? ++ah : --ah) {
          newCentroids[j] *= 1 / clusterSizes[j];
        }
        repeat = false;
        for (j = ai = 0, ref10 = num - 1; 0 <= ref10 ? ai <= ref10 : ai >= ref10; j = 0 <= ref10 ? ++ai : --ai) {
          if (newCentroids[j] !== centroids[i]) {
            repeat = true;
            break;
          }
        }
        centroids = newCentroids;
        nb_iters++;
        if (nb_iters > 200) {
          repeat = false;
        }
      }
      kClusters = {};
      for (j = aj = 0, ref11 = num - 1; 0 <= ref11 ? aj <= ref11 : aj >= ref11; j = 0 <= ref11 ? ++aj : --aj) {
        kClusters[j] = [];
      }
      for (i = ak = 0, ref12 = n - 1; 0 <= ref12 ? ak <= ref12 : ak >= ref12; i = 0 <= ref12 ? ++ak : --ak) {
        cluster = assignments[i];
        kClusters[cluster].push(values[i]);
      }
      tmpKMeansBreaks = [];
      for (j = al = 0, ref13 = num - 1; 0 <= ref13 ? al <= ref13 : al >= ref13; j = 0 <= ref13 ? ++al : --al) {
        tmpKMeansBreaks.push(kClusters[j][0]);
        tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
      }
      tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a, b) {
        return a - b;
      });
      limits.push(tmpKMeansBreaks[0]);
      for (i = am = 1, ref14 = tmpKMeansBreaks.length - 1; am <= ref14; i = am += 2) {
        v = tmpKMeansBreaks[i];
        if (!isNaN(v) && limits.indexOf(v) === -1) {
          limits.push(v);
        }
      }
    }
    return limits;
  };
  hsi2rgb = function hsi2rgb(h, s, i) {
    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
     */
    var args, b, g, r;
    args = unpack(arguments);
    h = args[0], s = args[1], i = args[2];
    if (isNaN(h)) {
      h = 0;
    }
    h /= 360;
    if (h < 1 / 3) {
      b = (1 - s) / 3;
      r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      g = 1 - (b + r);
    } else if (h < 2 / 3) {
      h -= 1 / 3;
      r = (1 - s) / 3;
      g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      b = 1 - (r + g);
    } else {
      h -= 2 / 3;
      g = (1 - s) / 3;
      b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      r = 1 - (g + b);
    }
    r = limit(i * r * 3);
    g = limit(i * g * 3);
    b = limit(i * b * 3);
    return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
  };
  rgb2hsi = function rgb2hsi() {
    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
     */
    var b, g, h, i, min, r, ref, s;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    TWOPI = Math.PI * 2;
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    i = (r + g + b) / 3;
    s = 1 - min / i;
    if (s === 0) {
      h = 0;
    } else {
      h = (r - g + (r - b)) / 2;
      h /= Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
      h = Math.acos(h);
      if (b > g) {
        h = TWOPI - h;
      }
      h /= TWOPI;
    }
    return [h * 360, s, i];
  };
  chroma.hsi = function () {
    return function (func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor(),
        result = func.apply(child, args);
      return Object(result) === result ? result : child;
    }(Color, slice.call(arguments).concat(['hsi']), function () {});
  };
  _input.hsi = hsi2rgb;
  Color.prototype.hsi = function () {
    return rgb2hsi(this._rgb);
  };
  interpolate_hsx = function interpolate_hsx(col1, col2, f, m) {
    var dh, hue, hue0, hue1, lbv, lbv0, lbv1, res, sat, sat0, sat1, xyz0, xyz1;
    if (m === 'hsl') {
      xyz0 = col1.hsl();
      xyz1 = col2.hsl();
    } else if (m === 'hsv') {
      xyz0 = col1.hsv();
      xyz1 = col2.hsv();
    } else if (m === 'hcg') {
      xyz0 = col1.hcg();
      xyz1 = col2.hcg();
    } else if (m === 'hsi') {
      xyz0 = col1.hsi();
      xyz1 = col2.hsi();
    } else if (m === 'lch' || m === 'hcl') {
      m = 'hcl';
      xyz0 = col1.hcl();
      xyz1 = col2.hcl();
    }
    if (m.substr(0, 1) === 'h') {
      hue0 = xyz0[0], sat0 = xyz0[1], lbv0 = xyz0[2];
      hue1 = xyz1[0], sat1 = xyz1[1], lbv1 = xyz1[2];
    }
    if (!isNaN(hue0) && !isNaN(hue1)) {
      if (hue1 > hue0 && hue1 - hue0 > 180) {
        dh = hue1 - (hue0 + 360);
      } else if (hue1 < hue0 && hue0 - hue1 > 180) {
        dh = hue1 + 360 - hue0;
      } else {
        dh = hue1 - hue0;
      }
      hue = hue0 + f * dh;
    } else if (!isNaN(hue0)) {
      hue = hue0;
      if ((lbv1 === 1 || lbv1 === 0) && m !== 'hsv') {
        sat = sat0;
      }
    } else if (!isNaN(hue1)) {
      hue = hue1;
      if ((lbv0 === 1 || lbv0 === 0) && m !== 'hsv') {
        sat = sat1;
      }
    } else {
      hue = Number.NaN;
    }
    if (sat == null) {
      sat = sat0 + f * (sat1 - sat0);
    }
    lbv = lbv0 + f * (lbv1 - lbv0);
    return res = chroma[m](hue, sat, lbv);
  };
  _interpolators = _interpolators.concat(function () {
    var len, o, ref, results;
    ref = ['hsv', 'hsl', 'hsi', 'hcl', 'lch', 'hcg'];
    results = [];
    for (o = 0, len = ref.length; o < len; o++) {
      m = ref[o];
      results.push([m, interpolate_hsx]);
    }
    return results;
  }());
  interpolate_num = function interpolate_num(col1, col2, f, m) {
    var n1, n2;
    n1 = col1.num();
    n2 = col2.num();
    return chroma.num(n1 + (n2 - n1) * f, 'num');
  };
  _interpolators.push(['num', interpolate_num]);
  interpolate_lab = function interpolate_lab(col1, col2, f, m) {
    var res, xyz0, xyz1;
    xyz0 = col1.lab();
    xyz1 = col2.lab();
    return res = new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
  };
  _interpolators.push(['lab', interpolate_lab]);
}).call(this);

/***/ }),

/***/ 4903:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getLineFromPoints = __webpack_require__(9567);
var categorizeIntersection = __webpack_require__(74);
var clamp = __webpack_require__(8380);
var couple = __webpack_require__(6243);
var clusterLineSegments = __webpack_require__(6531);
var getEdges = __webpack_require__(7636);
var getIntersectionOfTwoLines = __webpack_require__(4066);
var getPolygons = __webpack_require__(3231);
var mergeRanges = __webpack_require__(7714);
var partition = __webpack_require__(401);
var prepareSnap = __webpack_require__(6945);
var range = __webpack_require__(1166);
module.exports = function calculateCore(_ref) {
  var _ref$debug_level = _ref.debug_level,
    debug_level = _ref$debug_level === void 0 ? 0 : _ref$debug_level,
    raster_bbox = _ref.raster_bbox,
    raster_height = _ref.raster_height,
    raster_width = _ref.raster_width,
    pixel_height = _ref.pixel_height,
    pixel_width = _ref.pixel_width,
    geometry = _ref.geometry,
    per_pixel = _ref.per_pixel,
    per_row_segment = _ref.per_row_segment;
  var _raster_bbox = _slicedToArray(raster_bbox, 4),
    raster_xmin = _raster_bbox[0],
    raster_ymin = _raster_bbox[1],
    raster_xmax = _raster_bbox[2],
    raster_ymax = _raster_bbox[3];

  // iterate through image rows and convert each one to a line
  // running through the middle of the row
  var imageLines = [];
  if (raster_height === 0) return;
  for (var y = 0; y < raster_height; y++) {
    var lat = raster_ymax - pixel_height * y - pixel_height / 2;

    // use that point, plus another point along the same latitude to
    // create a line
    var point0 = [raster_xmin, lat];
    var point1 = [raster_xmin + 1, lat];
    var line = getLineFromPoints(point0, point1);
    imageLines.push(line);
  }
  if (debug_level >= 2) console.log("[dufour-peyton-intersection] imageLines:", imageLines);

  // collapse geometry down to a list of edges
  // necessary for multi-part geometries
  var polygons = getPolygons(geometry);
  var polygonEdges = polygons.map(getEdges);
  polygonEdges.forEach(function (edges) {
    // iterate through the list of polygon vertices, convert them to
    // lines, and compute the intersections with each image row
    var intersectionsByRow = range(raster_height).map(function () {
      return [];
    });
    var numberOfEdges = edges.length;
    for (var i = 0; i < numberOfEdges; i++) {
      // get vertices that make up an edge and convert that to a line
      var edge = edges[i];
      var _edge = _slicedToArray(edge, 2),
        startPoint = _edge[0],
        endPoint = _edge[1];
      var _startPoint = _slicedToArray(startPoint, 2),
        x1 = _startPoint[0],
        y1 = _startPoint[1];
      var _endPoint = _slicedToArray(endPoint, 2),
        x2 = _endPoint[0],
        y2 = _endPoint[1];
      var direction = Math.sign(y2 - y1);
      var horizontal = y1 === y2;
      var vertical = x1 === x2;
      var edgeY = y1;
      var edgeLine = getLineFromPoints(startPoint, endPoint);
      var edgeYMin = Math.min(y1, y2);
      var edgeYMax = Math.max(y1, y2);
      var startLng = void 0,
        startLat = void 0,
        endLat = void 0,
        endLng = void 0;
      if (x1 < x2) {
        var _startPoint2 = _slicedToArray(startPoint, 2);
        startLng = _startPoint2[0];
        startLat = _startPoint2[1];
        var _endPoint2 = _slicedToArray(endPoint, 2);
        endLng = _endPoint2[0];
        endLat = _endPoint2[1];
      } else {
        var _endPoint3 = _slicedToArray(endPoint, 2);
        startLng = _endPoint3[0];
        startLat = _endPoint3[1];
        var _startPoint3 = _slicedToArray(startPoint, 2);
        endLng = _startPoint3[0];
        endLat = _startPoint3[1];
      }
      if (startLng === undefined) throw Error("startLng is " + startLng);

      // find the y values in the image coordinate space
      var imageY1 = Math.round((raster_bbox[3] - 0.5 * pixel_height - startLat) / pixel_height);
      var imageY2 = Math.round((raster_bbox[3] - 0.5 * pixel_height - endLat) / pixel_height);

      // make sure to set the start and end points so that we are
      // incrementing upwards through rows
      var rowStart = void 0,
        rowEnd = void 0;
      if (imageY1 < imageY2) {
        rowStart = imageY1;
        rowEnd = imageY2;
      } else {
        rowStart = imageY2;
        rowEnd = imageY1;
      }
      rowStart = clamp(rowStart, 0, raster_height - 1);
      rowEnd = clamp(rowEnd, 0, raster_height - 1);
      // iterate through image lines within the change in y of
      // the edge line and find all intersections
      for (var j = rowStart; j < rowEnd + 1; j++) {
        var imageLine = imageLines[j];
        if (imageLine === undefined) {
          console.error("j:", j);
          console.error("imageLines:", imageLines);
          throw Error("imageLines");
        }

        // because you know x is zero in ax + by = c, so by = c and b = -1, so -1 * y = c or y = -1 * c
        var imageLineY = -1 * imageLine.c;
        var startsOnLine = y1 === imageLineY;
        var endsOnLine = y2 === imageLineY;
        var endsOffLine = !endsOnLine;
        var xminOnLine = void 0,
          xmaxOnLine = void 0;
        if (horizontal) {
          if (edgeY === imageLineY) {
            xminOnLine = startLng;
            xmaxOnLine = endLng;
          } else {
            continue; // stop running calculations for this horizontal line because it doesn't intersect at all
          }
        } else if (vertical) {
          /* we have to have a seprate section for vertical because of floating point arithmetic probs with get_inter..." */
          if (imageLineY >= edgeYMin && imageLineY <= edgeYMax) {
            xminOnLine = startLng;
            xmaxOnLine = endLng;
          }
        } else if (startsOnLine) {
          // we know that the other end is not on the line because then it would be horizontal
          xminOnLine = xmaxOnLine = x1;
        } else if (endsOnLine) {
          // we know that the other end is not on the line because then it would be horizontal
          xminOnLine = xmaxOnLine = x2;
        } else {
          try {
            xminOnLine = xmaxOnLine = getIntersectionOfTwoLines(edgeLine, imageLine).x;
          } catch (error) {
            throw error;
          }
        }

        // check to see if the intersection point is within the range of
        // the edge line segment. If it is, add the intersection to the
        // list of intersections at the corresponding index for that row
        // in intersectionsByRow
        if (xminOnLine !== undefined && xmaxOnLine !== undefined && (horizontal || xminOnLine >= startLng && xmaxOnLine <= endLng && imageLineY <= edgeYMax && imageLineY >= edgeYMin)) {
          intersectionsByRow[j].push({
            direction: direction,
            index: i,
            edge: edge,
            endsOnLine: endsOnLine,
            endsOffLine: endsOffLine,
            horizontal: horizontal,
            startsOnLine: startsOnLine,
            vertical: vertical,
            xmin: xminOnLine,
            xmax: xmaxOnLine,
            imageLineY: imageLineY
          });
        }
      }
    }
    var half_pixel_width = pixel_width / 2;
    var snap = prepareSnap(raster_xmin, pixel_width);
    intersectionsByRow.forEach(function (segmentsInRow, row_index) {
      if (segmentsInRow.length > 0) {
        var clusters = clusterLineSegments(segmentsInRow, numberOfEdges);
        var categorized = clusters.map(categorizeIntersection);
        var _partition = partition(categorized, function (item) {
            return item.through;
          }),
          _partition2 = _slicedToArray(_partition, 2),
          throughs = _partition2[0],
          nonthroughs = _partition2[1];
        if (throughs.length % 2 === 1) {
          if (debug_level >= 1) console.error("throughs:", JSON.stringify(throughs));
          throw Error("throughs.length for " + row_index + " is odd with " + throughs.length);
        }
        var insides = nonthroughs.map(function (intersection) {
          return [intersection.xmin, intersection.xmax];
        });

        // sorts throughs from left to right in-place
        throughs.sort(function (a, b) {
          return a.xmin - b.xmin;
        });
        var couples = couple(throughs).map(function (couple) {
          var _couple = _slicedToArray(couple, 2),
            left = _couple[0],
            right = _couple[1];
          return [left.xmin, right.xmax];
        });
        insides = insides.concat(couples);

        /*
          This makes sure we don't double count pixels.
          For example, converts `[[0,10],[10,10]]` to `[[0,10]]`
        */
        insides = mergeRanges(insides);
        insides.forEach(function (pair) {
          var _pair = _slicedToArray(pair, 2),
            xmin = _pair[0],
            xmax = _pair[1];
          if (xmax - xmin < half_pixel_width) return;

          // snap [xmin, xmax] in srs to raster coordinates
          var _snap = snap(pair),
            _snap2 = _slicedToArray(_snap, 2),
            left = _snap2[0],
            right = _snap2[1];

          // intersection doesn't take up more than half of a pixel
          if (left === right) return;

          // skip because segment is beyond the right edge of the raster
          if (left > raster_width) return;

          // skip because segment is beyond the left edge of the raster
          if (right <= 0) return;
          var start_column_index = Math.max(left, 0);
          var end_column_index = Math.min(right - 1, raster_width - 1);
          if (per_row_segment) {
            per_row_segment({
              row: row_index,
              columns: [start_column_index, end_column_index]
            });
          }
          if (per_pixel) {
            for (var column_index = start_column_index; column_index <= end_column_index; column_index++) {
              per_pixel({
                row: row_index,
                column: column_index
              });
            }
          }
        });
      }
    });
  });
};

/***/ }),

/***/ 147:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var calculateCallbacks = __webpack_require__(4903);
var checkRows = __webpack_require__(3941);
var mergeConsecutiveRanges = __webpack_require__(9755);
module.exports = function calculate(_ref) {
  var _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    raster_bbox = _ref.raster_bbox,
    raster_height = _ref.raster_height,
    raster_width = _ref.raster_width,
    pixel_height = _ref.pixel_height,
    pixel_width = _ref.pixel_width,
    geometry = _ref.geometry,
    per_pixel = _ref.per_pixel,
    _per_row_segment = _ref.per_row_segment;
  var _raster_bbox = _slicedToArray(raster_bbox, 4),
    xmin = _raster_bbox[0],
    ymin = _raster_bbox[1],
    xmax = _raster_bbox[2],
    ymax = _raster_bbox[3];
  if (pixel_height === undefined || pixel_height === null) pixel_height = (ymax - ymin) / raster_height;
  if (pixel_width === undefined || pixel_width === null) pixel_width = (xmax - xmin) / raster_width;
  var rows = new Array(raster_height);
  calculateCallbacks({
    raster_bbox: raster_bbox,
    raster_height: raster_height,
    raster_width: raster_width,
    pixel_height: pixel_height,
    pixel_width: pixel_width,
    geometry: geometry,
    per_pixel: per_pixel,
    per_row_segment: function per_row_segment(_ref2) {
      var row = _ref2.row,
        columns = _ref2.columns;
      if (!rows[row]) rows[row] = [];
      rows[row].push(columns);
      if (_per_row_segment) _per_row_segment({
        row: row,
        columns: columns
      });
    }
  });
  for (var irow = 0; irow < rows.length; irow++) {
    var ranges = rows[irow];
    if (ranges) {
      // sort from left to right
      ranges.sort(function (a, b) {
        return a === b ? a[1] - b[1] : a[0] - b[0];
      });

      // replace existing row with sorted and merged one
      rows[irow] = mergeConsecutiveRanges(ranges);
    }
  }
  if (debug) checkRows(insides);
  return {
    rows: rows
  };
};

/***/ }),

/***/ 74:
/***/ ((module) => {

module.exports = function categorizeIntersection(segments) {
  try {
    var through, xmin, xmax;
    var n = segments.length;
    var first = segments[0];
    if (n === 1) {
      through = true;
      xmin = first.xmin;
      xmax = first.xmax;
    } /* n > 1 */else {
      var last = segments[n - 1];
      through = first.direction === last.direction;
      xmin = Math.min(first.xmin, last.xmin);
      xmax = Math.max(first.xmax, last.xmax);
    }
    if (xmin === undefined || xmax === undefined || through === undefined || isNaN(xmin) || isNaN(xmax)) {
      throw Error("categorizeIntersection failed with xmin", xmin, "and xmax", xmax);
    }
    return {
      xmin: xmin,
      xmax: xmax,
      through: through
    };
  } catch (error) {
    console.error("[categorizeIntersection] segments:", segments);
    console.error("[categorizeIntersection]", error);
    throw error;
  }
};

/***/ }),

/***/ 3941:
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
module.exports = function checkRanges(rows) {
  rows.forEach(function (ranges, irow) {
    for (var irange = 0; irange < ranges.length; irange++) {
      var range = ranges[irange];
      var _range = _slicedToArray(range, 2),
        start = _range[0],
        end = _range[1];
      if (start > end) {
        console.warn("[dufour-peyton-intersection] uh oh, encountered invalid range", range, "at row index", irow, "with ranges", ranges);
      }
      for (var iother = irange + 1; iother < ranges.length; iother++) {
        if (iother[0] <= end) {
          console.warn("[dufour-peyton-intersection] encountered range problem on row index", irow, ":", ranges);
        }
      }
    }
  });
};

/***/ }),

/***/ 8380:
/***/ ((module) => {

module.exports = function clamp(n, min, max) {
  if (n < min) return min;else if (n > max) return max;
  return n;
};

/***/ }),

/***/ 6531:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cluster = __webpack_require__(5685);
module.exports = function clusterLineSegments(lineSegments, numberOfEdges) {
  var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  try {
    var clusters = cluster(lineSegments, function (s) {
      return s.endsOffLine;
    });
    var numberOfClusters = clusters.length;
    if (numberOfClusters >= 2) {
      var firstCluster = clusters[0];
      var firstSegment = firstCluster[0];
      var lastCluster = clusters[clusters.length - 1];
      var lastSegment = lastCluster[lastCluster.length - 1];
      if (lastSegment.index === numberOfEdges - 1 && firstSegment.index === 0 && lastSegment.endsOnLine) {
        clusters[0] = clusters.pop().concat(firstCluster);
      }
    }
    return clusters;
  } catch (error) {
    console.error("[clusterLineSegments]", error);
  }
};

/***/ }),

/***/ 5685:
/***/ ((module) => {

module.exports = function cluster(items, newClusterTest) {
  try {
    var numberOfItems = items.length;
    var clusters = [];
    var _cluster = [];
    for (var i = 0; i < numberOfItems; i++) {
      var item = items[i];
      _cluster.push(item);
      if (newClusterTest(item)) {
        clusters.push(_cluster);
        _cluster = [];
      }
    }
    if (_cluster.length > 0) clusters.push(_cluster);
    return clusters;
  } catch (error) {
    console.error("[cluster]:", error);
  }
};

/***/ }),

/***/ 6243:
/***/ ((module) => {

// This function takes in an array with an even number of elements and
// returns an array that couples every two consecutive elements;
module.exports = function couple(array) {
  var couples = [];
  var lengthOfArray = array.length;
  for (var i = 0; i < lengthOfArray; i += 2) {
    couples.push([array[i], array[i + 1]]);
  }
  return couples;
};

/***/ }),

/***/ 8810:
/***/ ((module) => {

module.exports = function eachEdge(polygon, callback) {
  polygon.forEach(function (ring) {
    for (var i = 1; i < ring.length; i++) {
      // should reuse previous endPoint as startPoint to save memory
      var startPoint = ring[i - 1];
      var endPoint = ring[i];
      var edgeIndex = i - 1;
      callback([startPoint, endPoint], edgeIndex);
    }
  });
};

/***/ }),

/***/ 1845:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getDepth = __webpack_require__(8861);

// call callback function for each polygon in geojson
module.exports = function eachPolygon(geojson, callback) {
  if (geojson.type === "FeatureCollection") {
    geojson.features.forEach(function (feature) {
      return eachPolygon(feature, callback);
    });
  } else if (geojson.type === "Feature") {
    eachPolygon(geojson.geometry, callback);
  } else if (geojson.type === "Polygon") {
    eachPolygon(geojson.coordinates, callback);
  } else if (geojson.type === "MultiPolygon") {
    geojson.coordinates.forEach(function (polygon) {
      callback(polygon);
    });
  } else if (Array.isArray(geojson)) {
    var depth = getDepth(geojson);
    if (depth === 4) {
      geojson.forEach(function (polygon) {
        callback(polygon);
      });
    } else if (depth === 3) {
      callback(geojson);
    }
  }
};

/***/ }),

/***/ 8968:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var eachPolygon = __webpack_require__(1845);
module.exports = function getBoundingBox(geometry) {
  var xmin, ymin, xmax, ymax;
  eachPolygon(geometry, function (polygon) {
    var ring = polygon[0]; // only want the exterior ring
    var imax = ring.length - 1;
    var i;
    if (xmin === undefined) {
      xmin = xmax = ring[0][0];
      ymin = ymax = ring[0][1];
      i = 1;
    } else {
      i = 0;
    }
    for (; i <= imax; i++) {
      var _ring$i = _slicedToArray(ring[i], 2),
        x = _ring$i[0],
        y = _ring$i[1];
      if (x < xmin) xmin = x;else if (x > xmax) xmax = x;
      if (y < ymin) ymin = y;else if (y > ymax) ymax = y;
    }
  });
  return [xmin, ymin, xmax, ymax];
};

/***/ }),

/***/ 7636:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eachEdge = __webpack_require__(8810);
module.exports = function getEdges(polygon) {
  var edges = [];
  eachEdge(polygon, function (edge) {
    return edges.push(edge);
  });
  return edges;
};

/***/ }),

/***/ 4066:
/***/ ((module) => {

// function to get the point at which two lines intersect
// the input uses the line representations from the
// getLineFromPoints function
module.exports = function getIntersectionOfTwoLines(line1, line2) {
  // calculate the determinant, ad - cb in a square matrix |a b|
  var det = line1.a * line2.b - line2.a * line1.b; /*  |c d| */

  if (det) {
    // this makes sure the lines aren't parallel, if they are, det will equal 0
    var x = (line2.b * line1.c - line1.b * line2.c) / det;
    var y = (line1.a * line2.c - line2.a * line1.c) / det;
    return {
      x: x,
      y: y
    };
  }
};

/***/ }),

/***/ 9567:
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// function to convert two points into a
// representation of a line
module.exports = function getLineFromPoints(startPoint, endPoint) {
  // get a, b, and c from line equation ax + by = c
  var _startPoint = _slicedToArray(startPoint, 2),
    x1 = _startPoint[0],
    y1 = _startPoint[1];
  var _endPoint = _slicedToArray(endPoint, 2),
    x2 = _endPoint[0],
    y2 = _endPoint[1];
  var a = y2 - y1;
  var b = x1 - x2;
  var c = a * x1 + b * y1;

  // return just a b and c since that is all we need
  // to compute the intersection
  return {
    a: a,
    b: b,
    c: c
  };
};

/***/ }),

/***/ 3231:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eachPolygon = __webpack_require__(1845);
module.exports = function getPolygons(geojson) {
  var polygons = [];
  eachPolygon(geojson, function (polygon) {
    return polygons.push(polygon);
  });
  return polygons;
};

/***/ }),

/***/ 9163:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var categorizeIntersection = __webpack_require__(74);
var clamp = __webpack_require__(8380);
var cluster = __webpack_require__(5685);
var clusterLineSegments = __webpack_require__(6531);
var calculate = __webpack_require__(147);
var calculateCore = __webpack_require__(4903);
var couple = __webpack_require__(6243);
var getBoundingBox = __webpack_require__(8968);
var getPolygons = __webpack_require__(3231);
var eachEdge = __webpack_require__(8810);
var getIntersectionOfTwoLines = __webpack_require__(4066);
var getLineFromPoints = __webpack_require__(9567);
var mergeRanges = __webpack_require__(7714);
var partition = __webpack_require__(401);
var prepareSnap = __webpack_require__(6945);
var range = __webpack_require__(1166);
var roundDown = __webpack_require__(8544);
var dufour_peyton_intersection = {
  calculate: calculate,
  calculateCore: calculateCore,
  categorizeIntersection: categorizeIntersection,
  clamp: clamp,
  cluster: cluster,
  clusterLineSegments: clusterLineSegments,
  couple: couple,
  eachEdge: eachEdge,
  getBoundingBox: getBoundingBox,
  getIntersectionOfTwoLines: getIntersectionOfTwoLines,
  getLineFromPoints: getLineFromPoints,
  getPolygons: getPolygons,
  mergeRanges: mergeRanges,
  partition: partition,
  prepareSnap: prepareSnap,
  range: range,
  roundDown: roundDown
};
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return dufour_peyton_intersection;
}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
if (( false ? 0 : _typeof(module)) === "object") module.exports = dufour_peyton_intersection;
if ((typeof self === "undefined" ? "undefined" : _typeof(self)) == "object") self.dufour_peyton_intersection = dufour_peyton_intersection;
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == "object") window.dufour_peyton_intersection = dufour_peyton_intersection;

/***/ }),

/***/ 9755:
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
module.exports = function mergeConsecutiveRanges(ranges) {
  var numberOfRanges = ranges.length;
  if (numberOfRanges > 0) {
    var firstRange = ranges[0];
    var previousEnd = firstRange[1];
    var result = [firstRange];
    for (var i = 1; i < numberOfRanges; i++) {
      var tempRange = ranges[i];
      var _tempRange = _slicedToArray(tempRange, 2),
        start = _tempRange[0],
        end = _tempRange[1];
      if (start <= previousEnd + 1) {
        result[result.length - 1][1] = end;
      } else {
        result.push(tempRange);
      }
      previousEnd = end;
    }
    return result;
  }
};

/***/ }),

/***/ 7714:
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// This function takes in an array of number pairs and combines where there's overlap
module.exports = function mergeRanges(ranges) {
  var numberOfRanges = ranges.length;
  if (numberOfRanges > 0) {
    var firstRange = ranges[0];
    var previousEnd = firstRange[1];
    var result = [firstRange];
    for (var i = 1; i < numberOfRanges; i++) {
      var tempRange = ranges[i];
      var _tempRange = _slicedToArray(tempRange, 2),
        start = _tempRange[0],
        end = _tempRange[1];
      if (start <= previousEnd) {
        result[result.length - 1][1] = end;
      } else {
        result.push(tempRange);
      }
      previousEnd = end;
    }
    return result;
  }
};

/***/ }),

/***/ 401:
/***/ ((module) => {

module.exports = function partition(array, filter) {
  var passed = [];
  var unpassed = [];
  var len = array.length;
  for (var i = 0; i < len; i++) {
    var item = array[i];
    if (filter(item)) passed.push(item);else unpassed.push(item);
  }
  return [passed, unpassed];
};

/***/ }),

/***/ 6945:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var roundDown = __webpack_require__(8544);

/**
 * @name prepareSnap
 * @description snap horizontal range in crs to model space
 * @private
 * @param {Number} raster_xmin
 * @param {Number} pixel_width
 * @return {([Number, Number]) => [Number, Number]}
 */
module.exports = function prepareSnap(raster_xmin, pixel_width) {
  return function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      xmin = _ref2[0],
      xmax = _ref2[1];
    // use roundDown so 1.5 is rounded to 1 not 2
    xmin = roundDown((xmin - raster_xmin) / pixel_width);
    if (xmin === -0) xmin = 0;
    xmax = Math.round((xmax - raster_xmin) / pixel_width);
    if (xmax === -0) xmax = 0;
    return [xmin, xmax];
  };
};

/***/ }),

/***/ 1166:
/***/ ((module) => {

module.exports = function range(count) {
  var result = new Array(count);
  for (var i = 0; i < count; i++) result[i] = i;
  return result;
};

/***/ }),

/***/ 8544:
/***/ ((module) => {

/**
 * @name roundDown
 * @description like Math.round, but numbers in the middle are rounded down not up
 * @param {Number} n
 * @returns {Number} rounded number
 */
module.exports = function roundDown(n) {
  return -1 * Math.round(-1 * n);
};

/***/ }),

/***/ 166:
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// takes in image data array and sets alpha value to 0 for parts outside the mask geometry
function maskImageData(_ref) {
  var data = _ref.data,
    data_bbox = _ref.data_bbox,
    data_height = _ref.data_height,
    data_width = _ref.data_width,
    data_srs = _ref.data_srs,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    geomask = _ref.geomask,
    mask = _ref.mask,
    mask_srs = _ref.mask_srs,
    reproject = _ref.reproject,
    _ref$strategy = _ref.strategy,
    strategy = _ref$strategy === void 0 ? "outside" : _ref$strategy,
    edition = _ref.edition;
  if (!["inside", "outside"].includes(strategy)) {
    throw new Error("[geocanvas] strategy can be either \"inside\" or \"outside\". you provided \"".concat(strategy, "\""));
  }
  var _geomask$strategy = geomask[strategy]({
      raster_bbox: data_bbox,
      raster_height: data_height,
      raster_width: data_width,
      raster_srs: data_srs,
      mask: mask,
      mask_srs: mask_srs,
      reproject: reproject
    }),
    rows = _geomask$strategy.rows;
  rows.forEach(function (ranges, r) {
    if (ranges) {
      var row_offset = r * 4 * data_width;
      ranges.forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          start = _ref3[0],
          end = _ref3[1];
        for (var c = start; c <= end; c++) {
          data[row_offset + c * 4 + 3] = 0; // set alpha to zero
        }
      });
    }
  });
}
function maskCanvas(_ref4) {
  var canvas = _ref4.canvas,
    canvas_bbox = _ref4.canvas_bbox,
    canvas_srs = _ref4.canvas_srs,
    geomask = _ref4.geomask,
    mask = _ref4.mask,
    mask_srs = _ref4.mask_srs,
    reproject = _ref4.reproject,
    _ref4$strategy = _ref4.strategy,
    strategy = _ref4$strategy === void 0 ? "outside" : _ref4$strategy,
    edition = _ref4.edition,
    _ref4$debug = _ref4.debug,
    debug = _ref4$debug === void 0 ? false : _ref4$debug;
  if (debug) console.log("[geocanvas] starting to mask canvas");
  if (!["inside", "outside"].includes(strategy)) {
    throw new Error("[geocanvas] strategy can be either \"inside\" or \"outside\". you provided \"".concat(strategy, "\""));
  }
  var context = canvas.getContext("2d");
  var height = canvas.height,
    width = canvas.width;
  if (debug) console.log("[geocanvas] canvas height is ".concat(height, " pixels"));
  if (debug) console.log("[geocanvas] canvas width is ".concat(width, " pixels"));
  var imageData = context.getImageData(0, 0, width, height);
  maskImageData({
    data: imageData.data,
    data_bbox: canvas_bbox,
    data_height: height,
    data_srs: canvas_srs,
    data_width: width,
    debug: debug,
    geomask: geomask,
    mask: mask,
    mask_srs: mask_srs,
    reproject: reproject,
    strategy: strategy
  });
  if (debug) console.log("[geocanvas] image data after masking:", imageData);
  context.putImageData(imageData, 0, 0);
  if (debug) console.log("[geocanvas] put image data back");
  return canvas;
}
module.exports = {
  maskImageData: maskImageData,
  maskCanvas: maskCanvas
};

/***/ }),

/***/ 5168:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var geomask = __webpack_require__(7097);
var core = __webpack_require__(166);
function maskImageData(options) {
  return core.maskImageData(_objectSpread(_objectSpread({}, options), {}, {
    edition: "full",
    geomask: geomask
  }));
}
function maskCanvas(options) {
  return core.maskCanvas(_objectSpread(_objectSpread({}, options), {}, {
    edition: "full",
    geomask: geomask
  }));
}
var geocanvas = {
  maskImageData: maskImageData,
  maskCanvas: maskCanvas
};
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return geocanvas;
}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
if (( false ? 0 : _typeof(module)) === "object") module.exports = geocanvas;
if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object") self.geocanvas = geocanvas;
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") window.geocanvas = geocanvas;

/***/ }),

/***/ 7097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var lite = __webpack_require__(1694);
var reprojectGeoJSON = __webpack_require__(1425);
function calcMask(_ref) {
  var _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    fname = _ref.fname,
    raster_bbox = _ref.raster_bbox,
    raster_srs = _ref.raster_srs,
    raster_height = _ref.raster_height,
    raster_width = _ref.raster_width,
    pixel_height = _ref.pixel_height,
    pixel_width = _ref.pixel_width,
    mask = _ref.mask,
    mask_srs = _ref.mask_srs;
  if (raster_srs !== mask_srs) {
    mask = reprojectGeoJSON(mask, {
      from: mask_srs,
      to: raster_srs
    });
  }
  return lite[fname]({
    debug: debug,
    raster_bbox: raster_bbox,
    raster_height: raster_height,
    raster_width: raster_width,
    pixel_height: pixel_height,
    pixel_width: pixel_width,
    mask: mask
  });
}
function inside(options) {
  return calcMask(_objectSpread(_objectSpread({}, options), {}, {
    fname: "inside"
  }));
}
function outside(options) {
  return calcMask(_objectSpread(_objectSpread({}, options), {}, {
    fname: "outside"
  }));
}
var geomask = {
  inside: inside,
  outside: outside
};
if (( false ? 0 : _typeof(module)) === "object") module.exports = geomask;

/***/ }),

/***/ 1694:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var dufour_peyton_intersection = __webpack_require__(9163);
var subtract = __webpack_require__(8115);
var divide = __webpack_require__(2170);
var reprojectGeoJSON = __webpack_require__(4136);
var segflip = __webpack_require__(6889);
function checkRows(_ref) {
  var rows = _ref.rows;
  rows.forEach(function (segs, irow) {
    if (segs) {
      segs.forEach(function (_ref2, iseg) {
        var _ref3 = _slicedToArray(_ref2, 2),
          start = _ref3[0],
          end = _ref3[1];
        if (start > end) {
          throw Error("uh oh: invalid segment at row ".concat(irow, ", segment ").concat(iseg));
        }
      });
    }
  });
}
function inside(_ref4) {
  var _ref4$debug = _ref4.debug,
    debug = _ref4$debug === void 0 ? false : _ref4$debug,
    raster_bbox = _ref4.raster_bbox,
    raster_height = _ref4.raster_height,
    raster_width = _ref4.raster_width,
    pixel_height = _ref4.pixel_height,
    pixel_width = _ref4.pixel_width,
    mask = _ref4.mask,
    reproject = _ref4.reproject;
  if (typeof reproject === "function") {
    // reproject geometry to the srs of the raster
    mask = reprojectGeoJSON(mask, {
      in_place: false,
      reproject: reproject
    });
  }
  if (pixel_height === undefined) pixel_height = Number(divide(subtract(raster_bbox[3].toString(), raster_bbox[1].toString()), raster_height.toString()));
  if (pixel_width === undefined) pixel_width = Number(divide(subtract(raster_bbox[2].toString(), raster_bbox[0].toString()), raster_width.toString()));
  var _dufour_peyton_inters = dufour_peyton_intersection.calculate({
      raster_bbox: raster_bbox,
      raster_height: raster_height,
      raster_width: raster_width,
      pixel_height: pixel_height,
      pixel_width: pixel_width,
      geometry: mask
    }),
    rows = _dufour_peyton_inters.rows;
  if (debug) checkRows({
    rows: rows
  });
  return {
    rows: rows
  };
}
function outside(_ref5) {
  var _ref5$debug = _ref5.debug,
    debug = _ref5$debug === void 0 ? false : _ref5$debug,
    raster_bbox = _ref5.raster_bbox,
    raster_height = _ref5.raster_height,
    raster_width = _ref5.raster_width,
    pixel_height = _ref5.pixel_height,
    pixel_width = _ref5.pixel_width,
    mask = _ref5.mask,
    reproject = _ref5.reproject;
  if (typeof reproject === "function") {
    // reproject geometry to the srs of the raster
    mask = reprojectGeoJSON(mask, {
      in_place: false,
      reproject: reproject
    });
  }
  if (pixel_height === undefined) pixel_height = Number(divide(subtract(raster_bbox[3].toString(), raster_bbox[1].toString()), raster_height.toString()));
  if (pixel_width === undefined) pixel_width = Number(divide(subtract(raster_bbox[2].toString(), raster_bbox[0].toString()), raster_width.toString()));

  // calculate inside segments
  var _inside = inside({
      debug: debug,
      raster_bbox: raster_bbox,
      raster_height: raster_height,
      raster_width: raster_width,
      pixel_height: pixel_height,
      pixel_width: pixel_width,
      mask: mask
    }),
    insides = _inside.rows;
  if (debug) checkRows({
    rows: insides
  });
  var last_column_index = raster_width - 1;

  // consider optimizing memory and speed
  // by just returning a reference to a whole row
  // instead of generating a new array every time
  // const whole_row = [0, last_column_index];

  var outsides = [];
  // using for loop instead of map because
  // map skips empty insides/rows
  for (var i = 0; i < insides.length; i++) {
    var segs = insides[i];
    if (!Array.isArray(segs) || segs.length === 0) {
      outsides.push([[0, last_column_index]]);
    } else {
      outsides.push(segflip({
        segments: segs,
        min: 0,
        max: last_column_index,
        debug: false
      }));
    }
  }
  if (debug) checkRows({
    rows: outsides
  });
  return {
    rows: outsides
  };
}
var geomask = {
  inside: inside,
  outside: outside
};
if (( false ? 0 : _typeof(module)) === "object") module.exports = geomask;

/***/ }),

/***/ 8886:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var clean = __webpack_require__(2346);
module.exports = function absolute(n) {
  n = clean(n);
  if (n[0] === "-") return n.substring(1);else return n;
};

/***/ }),

/***/ 3512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var compare_positive = __webpack_require__(3536);
var clean = __webpack_require__(2346);
var long_addition = __webpack_require__(4380);
var long_subtraction = __webpack_require__(5904);
module.exports = function add(a, b) {
  a = clean(a);
  b = clean(b);
  var apos = a[0] !== "-";
  var bpos = b[0] !== "-";
  if (apos && bpos) {
    return long_addition(a, b);
  } else if (!apos && !bpos) {
    return "-" + long_addition(a.substring(1), b.substring(1));
  } else if (!apos && bpos) {
    a = a.substring(1);
    switch (compare_positive(a, b)) {
      case "=":
        return "0";
      case "<":
        return long_subtraction(b, a);
      case ">":
        return "-" + long_subtraction(a, b);
    }
  } else if (apos && !bpos) {
    b = b.substring(1);
    switch (compare_positive(a, b)) {
      case "=":
        return "0";
      case "<":
        return "-" + long_subtraction(b, a);
      case ">":
        return long_subtraction(a, b);
    }
  }
};

/***/ }),

/***/ 2346:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var expand = __webpack_require__(855);
module.exports = function clean(n) {
  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);
  n = expand(n);

  // remove extra zero in front
  // 03938.123 => 3938.123
  n = n.replace(/^0+(?=\d)/, "");

  // remove extra zero at end

  return n;
};

/***/ }),

/***/ 3536:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var clean = __webpack_require__(2346);

// given:
//  - a and b are positive numbers
//  - a and b have been cleaned (i.e. no + or leading zeros)
module.exports = function compare_positive(a, b) {
  var alen = a.length;
  var blen = b.length;
  var aidx = a.indexOf(".");
  var bidx = b.indexOf(".");

  // basically where would the dot be
  // if we add a dot at the end of integers
  // like 123.
  var a_adjusted_dot_index = aidx === -1 ? alen : aidx;
  var b_adjusted_dot_index = bidx === -1 ? blen : bidx;

  // how much you need to shift the second number
  // to line up the decimal with the first
  //        0.12345
  //    12345.0

  var offset = a_adjusted_dot_index - b_adjusted_dot_index;
  var left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
  var right = Math.max(alen - a_adjusted_dot_index, blen - b_adjusted_dot_index);
  var aoffset = offset < 0 ? -1 * offset : 0;
  var boffset = offset <= 0 ? 0 : offset;
  var imax = left + 1 + right - 1; // -1 for zero-index

  var i = 0;
  while (i < imax) {
    var achar = a[i - aoffset] || "0";
    var bchar = b[i - boffset] || "0";
    if (achar !== bchar) {
      if (achar > bchar) return ">";else if (achar < bchar) return "<";
    }
    i++;
  }
  return "=";
};

/***/ }),

/***/ 2170:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var absolute = __webpack_require__(8886);
var clean = __webpack_require__(2346);
var long_division = __webpack_require__(1971);
module.exports = function (dividend, divisor, options) {
  dividend = clean(dividend);
  divisor = clean(divisor);
  var dividend_is_positive = dividend[0] !== "-";
  var divisor_is_positive = divisor[0] !== "-";
  var out_sign = dividend_is_positive !== divisor_is_positive ? "-" : "";
  if (!dividend_is_positive) dividend = absolute(dividend);
  if (!divisor_is_positive) divisor = absolute(divisor);
  return out_sign + long_division(dividend, divisor, options);
};

/***/ }),

/***/ 855:
/***/ ((module) => {

// convert exponential notation to normal string
// not optimized yet and no support for big numbers
module.exports = function expand(n) {
  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);
  var sign = n[0] === "-" ? "-" : "";
  if (sign === "-") n = n.substring(1);
  var index_of_e = n.indexOf("e");

  // number not in exponential notation
  if (index_of_e === -1) return sign + n;
  var index_of_dot = n.indexOf(".");

  // if number doesn't include a period dot
  // then just assume it at the end
  // such that 3e4 has index of dot at 1
  if (index_of_dot === -1) index_of_dot = index_of_e;
  var shift = Number(n.substring(index_of_e + 1));

  // remove old decimal place
  var base = n.substring(0, index_of_e).replace(".", "");

  // normalize shift to start of the string at index zero
  var normshift = index_of_dot + shift;
  var baselen = base.length;
  if (normshift >= baselen) {
    var zct = normshift - baselen;
    var _result = base;
    for (var i = 0; i < zct; i++) _result += "0";
    return sign + _result;
  } else if (normshift < 0) {
    // need to add zeros in decimal places
    result = "0.";
    for (var _i = 0; _i > normshift; _i--) result += "0";
    result += base;
    return sign + result;
  } else {
    // shifting within the base
    return sign + base.substring(0, normshift) + "." + base.substring(normshift);
  }
};

/***/ }),

/***/ 4380:
/***/ ((module) => {

// assumes both numbers are positive integers
module.exports = function long_addition(a, b) {
  // assuming both positive for now

  var alen = a.length;
  var blen = b.length;
  var aidx = a.indexOf(".");
  var bidx = b.indexOf(".");

  // basically where would the dot be
  // if we add a dot at the end of integers
  // like 123.
  var a_adjusted_dot_index = aidx === -1 ? alen : aidx;
  var b_adjusted_dot_index = bidx === -1 ? blen : bidx;

  // how much you need to shift the second number
  // to line up the decimal with the first
  //        0.12345
  //    12345.0

  var offset = a_adjusted_dot_index - b_adjusted_dot_index;
  var left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
  var right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
  var aoffset = offset < 0 ? -1 * offset : 0;
  var boffset = offset <= 0 ? 0 : offset;
  var imax = left + 1 + right - 1; // -1 for zero-index

  var result = "";
  var carried = 0;

  // to the right of the period
  //        0.12345
  //    12345.0
  var i = imax;
  if (right > 0) {
    while (i > imax - right) {
      var achar = a[i - aoffset] || "0";
      var bchar = b[i - boffset] || "0";
      var n = Number(achar) + Number(bchar) + carried;
      if (n >= 10) {
        n -= 10;
        carried = 1;
      } else {
        carried = 0;
      }
      if (result !== "" || n !== 0) {
        result = n + result;
      }
      i--;
    }
    if (result) result = "." + result;
    i--; // substract 1 for dot
  }
  if (left > 0) {
    while (i >= 0) {
      var _achar = a[i - aoffset] || "0";
      var _bchar = b[i - boffset] || "0";
      var _n = Number(_achar) + Number(_bchar) + carried;
      if (_n >= 10) {
        _n -= 10;
        carried = 1;
      } else {
        carried = 0;
      }
      result = _n + result;
      i--;
    }
  }
  if (carried === 1) {
    result = carried + result;
  }
  return result;
};

/***/ }),

/***/ 1971:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var compare_positive = __webpack_require__(3536);
var add = __webpack_require__(3512);
var multiply = __webpack_require__(4047);
var subtract = __webpack_require__(8115);
var round_last_decimal = __webpack_require__(4970);

// given dividend and divisor are positive numberical strings
module.exports = function long_division(dividend, divisor) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$max_decimal_digi = _ref.max_decimal_digits,
    max_decimal_digits = _ref$max_decimal_digi === void 0 ? 100 : _ref$max_decimal_digi,
    _ref$ellipsis = _ref.ellipsis,
    ellipsis = _ref$ellipsis === void 0 ? false : _ref$ellipsis;
  // remove unnecessary starting zeros
  // ex: 0.5 => .5
  if (dividend[0] === "0") dividend = dividend.substring(1);
  if (divisor[0] === "0") divisor = divisor.substring(1);
  var dividend_index_of_dot = dividend.indexOf(".");
  var divisor_index_of_dot = divisor.indexOf(".");
  var adjusted_dividend_index_of_dot = dividend_index_of_dot === -1 ? dividend.length : dividend_index_of_dot;
  var divisor_num_decimal_places = divisor_index_of_dot === -1 ? 0 : divisor.length - 1 - divisor_index_of_dot;

  // whether the result has a repeating decimal
  // e.g. 1/3 is repeating as in "0.333..."
  var repeating = false;

  // remove decimals
  dividend = dividend.replace(/\./, "");
  divisor = divisor.replace(/\./, "");
  var dividend_length = dividend.length;
  var current = "";
  var quotient = "";
  var comparison;
  var offset = -1 * divisor_num_decimal_places;
  var skip = 0;
  for (var i = 0; i < dividend_length; i++) {
    var char = dividend[i];
    current += char;
    comparison = compare_positive(current, divisor);
    if (comparison === ">") {
      // same as const times = Math.floor(current / divisor);
      // but without floating point problems
      var times = 1;
      var product = add(divisor, divisor);
      var passed_product = divisor;
      while (compare_positive(product, current) !== ">") {
        times++;
        passed_product = product;
        product = add(product, divisor);
      }
      times = times.toString();
      if (quotient !== "") {
        for (var _i = times.length; _i <= skip; _i++) quotient += "0";
      }
      quotient += times; // string concatentation

      current = subtract(current, passed_product);
      skip = 0;
    } else if (comparison === "<") {
      if (quotient === "") {
        offset++;
      }
      skip++;

      // outside greater than inside
      continue;
    } else if (comparison === "=") {
      if (quotient !== "") {
        for (var _i2 = 0; _i2 < skip; _i2++) quotient += "0";
      }
      quotient += "1";
      current = "0";
      skip = 0;
    }
  }
  if (current.match(/^0+$/g)) {
    if (comparison === "<") {
      quotient += current.substring(0, current.length - 1);
    }
  } else {
    var previous = {};

    // keep dividing until we have an answer
    // figure out current place of decimal number
    var _idot = adjusted_dividend_index_of_dot - offset;
    var _qlen = quotient.length;
    // add 1 extra for rounding purposes
    var imax = _idot - _qlen + max_decimal_digits + 1;

    // reset skip if just "" so far because don't want to count 0 in 0.
    if (quotient === "") {
      skip = 0;
    }
    for (var _i3 = 0; _i3 < imax; _i3++) {
      current += "0";
      if (ellipsis) {
        if (current in previous) {
          previous[current]++;
          if (previous[current] > 3) {
            quotient += "...";
            repeating = true;
            break;
          }
        } else {
          previous[current] = 1;
        }
      }
      var _comparison = compare_positive(current, divisor);
      if (_comparison === ">") {
        // inside greater than outside

        // how many times the divisor goes into the current
        var _times = 1;
        var _product = add(divisor, divisor);
        var _passed_product = divisor;
        while (compare_positive(_product, current) !== ">") {
          _times++;
          _passed_product = _product;
          _product = add(_product, divisor);
        }
        _times = _times.toString();

        // pad left zeros
        for (var _i4 = _times.length; _i4 <= skip; _i4++) quotient += "0";
        quotient += _times; // string concatentation
        current = subtract(current, _passed_product);
        if (current === "0") {
          break;
        }
        skip = 0;
      } else if (_comparison === "<") {
        // outside greater than inside
        skip++;
        continue;
      } else if (_comparison === "=") {
        // fill in previous with zeros
        for (var _i5 = 0; _i5 < skip; _i5++) quotient += "0";
        quotient += "1";
        skip = 0;
        break;
      }
    }
  }

  // reinsert decimal place

  var idot = adjusted_dividend_index_of_dot - offset;
  var qlen = quotient.length;
  var num_decimals;
  if (idot === qlen) {
    // integer number so don't do anything
    num_decimals = 0;
  } else if (idot < 0) {
    quotient = "0." + "0".repeat(Math.abs(idot)) + quotient;
    num_decimals = qlen - idot; // idot is negative, so adding
  } else if (idot > qlen) {
    // add more zeros to integer
    for (var _i6 = qlen; _i6 < idot; _i6++) quotient += "0";
    num_decimals = 0;
  } else if (idot < qlen) {
    quotient = quotient.substring(0, idot) + "." + quotient.substring(idot);
    num_decimals = qlen - idot;
  } else if (idot === 0) {
    quotient = "0." + quotient;
    num_decimals = qlen;
  }

  // remove zeros from front
  // 03938.123 => 3938.123
  quotient = quotient.replace(/^0+/, "");

  // remove extra zeros from the end
  quotient = quotient.replace(/\.\d+0+$/, "");

  // round if necessary
  if (!repeating) {
    var extra_decimals = num_decimals - max_decimal_digits;
    if (extra_decimals > 0) {
      quotient = round_last_decimal(quotient.substring(0, quotient.length - extra_decimals + 1));
    }
  }
  if (quotient[0] === ".") quotient = "0" + quotient;
  return quotient;
};

/***/ }),

/***/ 686:
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var CHUNK_SIZE = 15;

/**
 *
 * @param {String} a - numerical string larger or equal to b
 * @param {String} b - numerical string smaller or equal to a
 * @returns {String} product - result of multiplying a with b
 */

module.exports = function long_multiplication(a, b) {
  if (a === "0" || b === "0") return "0";
  var top_index_of_dot = a.indexOf(".");
  var bottom_index_of_dot = b.indexOf(".");
  var a_num_decimal_places = top_index_of_dot === -1 ? 0 : a.length - 1 - top_index_of_dot;
  var b_num_decimal_places = bottom_index_of_dot === -1 ? 0 : b.length - 1 - bottom_index_of_dot;
  var out_num_decimal_places = a_num_decimal_places + b_num_decimal_places;

  // remove decimals
  a = a.replace(".", "");
  b = b.replace(".", "");
  var alen = a.length;
  var blen = b.length;
  var chunks = [];
  var i = alen;
  while (i >= 0) {
    var end = i;
    var start = i -= CHUNK_SIZE;
    var str = a.substring(start, end);
    chunks.push([Number(str), str.length]);
  }
  var partial_products = [];
  var partials = [];

  // for each number in multiplier
  var _loop = function _loop() {
    var bstr = b[ireverse];
    var bnum = Number(bstr);
    var carried = 0;
    var partial = "";
    var ichunklast = chunks.length - 1;
    chunks.forEach(function (_ref, c) {
      var _ref2 = _slicedToArray(_ref, 2),
        chunk = _ref2[0],
        chunklen = _ref2[1];
      var subpartial = carried + bnum * chunk;
      var subpartstr = subpartial.toString();
      var subpartcharlen = subpartstr.length;
      if (subpartcharlen > chunklen && c !== ichunklast) {
        var islice = -1 * chunklen;
        partial = subpartstr.slice(islice) + partial;
        carried = Number(subpartstr.slice(0, islice));
      } else {
        var imax = chunklen - subpartcharlen;
        for (var _i3 = 0; _i3 < imax; _i3++) {
          subpartstr = "0" + subpartstr;
        }
        carried = 0;
        partial = subpartstr + partial;
      }
    });

    // add number of zeros at end
    partial += "0".repeat(_i);
    partial_products.push(partial);
    partials.push([Array.from(partial).map(function (char) {
      return Number(char);
    }), partial.length]);
  };
  for (var _i = 0, ireverse = blen - 1; ireverse >= 0; ireverse--, _i++) {
    _loop();
  }

  // back to front, iterate through columns
  // and add partial products together
  var num_partials = partial_products.length;
  var number_of_columns = partials[partials.length - 1][1] + num_partials;
  var result = "";
  var carried = 0;
  for (var icol = 0; icol < number_of_columns; icol++) {
    var sum = carried;
    var pmax = Math.min(icol, num_partials - 1);
    for (var p = 0; p <= pmax; p++) {
      var _partials$p = _slicedToArray(partials[p], 2),
        pnums = _partials$p[0],
        plen = _partials$p[1];
      var _i2 = plen - 1 - icol;
      if (_i2 >= 0) {
        sum += pnums[_i2];
      }
    }
    if (sum >= 10) {
      sum = sum.toString();
      result = sum[sum.length - 1] + result;
      carried = Number(sum.slice(0, -1));
    } else {
      result = sum + result;
      carried = 0;
    }
  }

  // add decimal back in
  if (out_num_decimal_places === 0) {
    // integer
    // remove extra zeros
    result = result.replace(/^0+/, "");
  } else {
    // decimal number
    var idot = result.length - out_num_decimal_places;
    result = result.substring(0, idot) + "." + result.substring(idot);

    // remove zeros from front
    result = result.replace(/^0+/, "");

    // remove extra zeros from the end
    result = result.replace(/\.?0+$/, "");
    if (result[0] === ".") result = "0" + result;
  }
  return result;
};

/***/ }),

/***/ 5904:
/***/ ((module) => {

// const lookup = {};
// const vals = [undefined, 0, 1, 2, 3, 4, 5, 6, 8, 9];
// vals.forEach(top => {
//   lookup[top] = {};
//   vals.forEach(bottom => {
//     lookup[top][bottom] = (top || 0) - (bottom || 0);
//   })
// });

// assumes (1) both a and b are positive numbers
// and (2) a is larger than b
module.exports = function long_subtraction(a, b) {
  var alen = a.length;
  var blen = b.length;
  var aidx = a.indexOf(".");
  var bidx = b.indexOf(".");

  // basically where would the dot be
  // if we add a dot at the end of integers
  // like 123.
  var a_adjusted_dot_index = aidx === -1 ? alen : aidx;
  var b_adjusted_dot_index = bidx === -1 ? blen : bidx;
  // console.log({a_adjusted_dot_index, b_adjusted_dot_index});

  // how much you need to shift the second number
  // to line up the decimal with the first
  //        0.12345
  //    12345.0

  var offset = a_adjusted_dot_index - b_adjusted_dot_index;
  // console.log("offset:", offset);

  var left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
  // console.log("left:", left);

  var right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
  // console.log("right:", right);

  var aoffset = offset < 0 ? -1 * offset : 0;
  var boffset = offset <= 0 ? 0 : offset;
  // console.log({aoffset, boffset});

  var imax = left + 1 + right - 1; // -1 for zero-index
  // console.log({imax});

  var result = "";

  // number of borrowings
  var borrowed = 0;

  // to the right of the period
  //  100.5  6  7
  //    2.2  9  3
  //        (-3 + 10)  4
  var i = imax;
  if (right > 0) {
    while (i > imax - right) {
      // console.log("\n\n", {i});
      var top = a[i - aoffset] || "0";
      var bottom = b[i - boffset] || "0";

      // console.log("pre borrowing", {top, bottom});
      top -= borrowed;
      borrowed = 0;

      // console.log("after borrowing", {top, bottom});
      var n = top - bottom;

      // console.log({n});
      if (n < 0) {
        while (n < 0) {
          borrowed++;
          n += 10;
        }
      } else if (borrowed) {
        borrowed--;
      }
      // console.log({n});
      if (result !== "" || n !== 0) {
        result = n + result;
      }
      i--;
    }
    if (result !== "") {
      result = "." + result;
    }
    i--; // substract 1 for dot
  }

  // console.log({result});

  if (left > 0) {
    while (i > 0) {
      // console.log("\n\n", {i});
      var _top = a[i - aoffset] || "0";
      var _bottom = b[i - boffset] || "0";

      // console.log("pre borrowing", {top, bottom});
      _top -= borrowed;
      borrowed = 0;

      // console.log("after borrowing", {top, bottom});
      var _n = _top - _bottom;

      // console.log({n});
      if (_n < 0) {
        while (_n < 0) {
          borrowed++;
          _n += 10;
        }
      } else if (borrowed) {
        borrowed--;
      }
      // console.log({n});
      result = _n + result;
      i--;
    }

    // console.log({borrowed});
    // special rule for last one
    var achar = a[0 - aoffset] || "0";
    var bchar = b[0 - boffset] || "0";
    var _n2 = Number(achar) - (borrowed > 0 ? 1 : 0) - Number(bchar);
    if (_n2 !== 0) {
      result = _n2 + result;
    }

    // remove any zeros in front like in 0123
    result = result.replace(/^0+/, "");
  }

  // if decimal number add zero
  if (result[0] === ".") result = "0" + result;
  return result;
};

/***/ }),

/***/ 4047:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var absolute = __webpack_require__(8886);
var clean = __webpack_require__(2346);
var compare_positive = __webpack_require__(3536);
var long_multiplication = __webpack_require__(686);
module.exports = function multiply(a, b) {
  a = clean(a);
  b = clean(b);
  var apos = a[0] !== "-";
  var bpos = b[0] !== "-";
  var out_sign = apos !== bpos ? "-" : "";
  a = absolute(a);
  b = absolute(b);
  var comparison = compare_positive(a, b);
  if (comparison === "<") {
    var aold = a;
    var bold = b;
    a = bold;
    b = aold;
  }
  return out_sign + long_multiplication(a, b);
};

/***/ }),

/***/ 4970:
/***/ ((module) => {

// given n is a decimal number
var up = ["5", "6", "7", "8", "9"];
module.exports = function round_last_decimal(n) {
  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);

  //console.log("rounding:", {n});
  var len = n.length;
  //console.log({len});
  var result = "";
  var last_char = n[n.length - 1];
  //console.log({last_char});

  if (up.includes(last_char)) {
    var i;
    for (i = len - 2; i >= 0; i--) {
      var char = n[i];
      //console.log({char});
      // skip over . or -
      if (char === "." || char === "-") continue;
      var nchar = Number(char) + 1;
      //console.log({nchar});

      if (nchar === 10) {
        result = "0" + result;
        // keep rounding up
      } else {
        result = nchar + result;
        break;
      }
    }
    //console.log({i});
    if (i > 0) result = n.substring(0, i) + result;
  } else {
    result = n.substring(0, len - 1);
  }
  if (result[result.length - 1] === ".") result = result.substring(0, result.length - 1);

  // remove trailing zeros in decimal number
  // 0.50 => 0.5
  if (result.indexOf(".") > -1) result = result.replace(/0+$/, "");
  return result;
};

/***/ }),

/***/ 8115:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var clean = __webpack_require__(2346);
var compare_positive = __webpack_require__(3536);
var long_addition = __webpack_require__(4380);
var long_subtraction = __webpack_require__(5904);
module.exports = function subtract(a, b) {
  a = clean(a);
  b = clean(b);
  var a_is_positive = a[0] !== "-";
  var b_is_positive = b[0] !== "-";
  if (a_is_positive) {
    if (b_is_positive) {
      var comparison = compare_positive(a, b);
      if (comparison === ">") {
        return long_subtraction(a, b);
      } else if (comparison === "<") {
        return "-" + long_subtraction(b, a);
      } else {
        return "0";
      }
    } else {
      return long_addition(a, b.substring(1));
    }
  } else if (b_is_positive) {
    return "-" + long_addition(a.substring(1), b);
  } else {
    a = a.substring(1);
    b = b.substring(1);
    var _comparison = compare_positive(a, b);
    if (_comparison === ">") {
      return "-" + long_subtraction(a, b);
    } else if (_comparison === "<") {
      return long_subtraction(b, a);
    } else {
      return "0";
    }
  }
};

/***/ }),

/***/ 8861:
/***/ ((module) => {

module.exports = function getDepth(arr) {
  var isArray = function isArray(arr) {
    return Array.isArray(arr) || arr instanceof Int8Array || arr instanceof Uint8Array || arr instanceof Uint8ClampedArray || arr instanceof Int16Array || arr instanceof Uint16Array || arr instanceof Int32Array || arr instanceof Uint32Array || arr instanceof Float32Array || arr instanceof Float64Array || arr instanceof BigInt64Array || arr instanceof BigUint64Array;
  };
  var depth = 0;
  var part = arr;
  while (isArray(part)) {
    depth++;
    part = part[0];
  }
  return depth;
};

/***/ }),

/***/ 7730:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
!function (t, e) {
  "object" == ( false ? 0 : _typeof(exports)) && "object" == ( false ? 0 : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}("undefined" != typeof self ? self : this, function () {
  return function (t) {
    var e = {};
    function o(r) {
      if (e[r]) return e[r].exports;
      var n = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(n.exports, n, n.exports, o), n.l = !0, n.exports;
    }
    return o.m = t, o.c = e, o.d = function (t, e, r) {
      o.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: r
      });
    }, o.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, o.t = function (t, e) {
      if (1 & e && (t = o(t)), 8 & e) return t;
      if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
      var r = Object.create(null);
      if (o.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var n in t) o.d(r, n, function (e) {
        return t[e];
      }.bind(null, n));
      return r;
    }, o.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return o.d(e, "a", e), e;
    }, o.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, o.p = "", o(o.s = 1);
  }([function (t, e, o) {
    var r = o(5);
    t.exports = function (t, e, o) {
      var n = o && o.debug || !1,
        a = o && o.startIndex || 0;
      n && console.log("starting findTag with", e, " and ", o);
      var i = r(t, "<".concat(e, "[ >]"), a);
      if (n && console.log("start:", i), -1 === i) return;
      var s = i + e.length + r(t.slice(i + e.length), "[ /]" + e + ">", 0) + 1 + e.length + 1;
      if (n && console.log("end:", s), -1 === s) return;
      var C = t.slice(i, s);
      return {
        inner: C.slice(C.indexOf(">") + 1, C.lastIndexOf("<")),
        outer: C,
        start: i,
        end: s
      };
    };
  }, function (t, e, o) {
    var r = o(2),
      n = o(0),
      a = o(6),
      i = o(12).default,
      s = o(7),
      C = o(8),
      E = (C.ARRAY_TYPE, C.EXCLUDED_FORMATS),
      d = C.BYTES_PER_VALUE,
      f = C.DATA_VIEW_READER_NAME,
      D = C.FORMATS,
      c = C.HASHED_FIELDS,
      g = C.NUM_FIELDS,
      l = (C.NUM_HASHED_FIELDS, C.UNSUPPORTED_MSG),
      p = D.ESRI_WKT,
      A = D.GEOSERVER,
      u = D.MAPFILE,
      Q = D.MAPNIK,
      h = D.OGC_GML,
      R = D.OGC_XML,
      G = D.OGC_WKT,
      I = D.POSTGIS,
      x = D.PROJ_4,
      w = D.PROJ_4_JS,
      M = o(9),
      m = new DataView(M),
      B = o(11).hash,
      F = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"];
    function O(t) {
      return function (t) {
        return !(!(t = t.trim()).startsWith("PROJCS[") && !t.startsWith("GEOGCS[")) && F.some(function (e) {
          return t.includes(e);
        });
      }(t) ? t.includes("AUTHORITY") ? G : p : t.includes("gml:ProjectedCRS") || t.includes("gml:GeodeticCRS") || t.includes("gml:GeographicCRS") ? t.includes("gml:srsID") ? R : h : t.startsWith("+proj=") ? x : t.startsWith('proj4.defs("EPSG:') ? w : /^\d{1,6}\=(PROJCS|GEOGCS)/.test(t) ? A : t.startsWith("PROJECTION") && t.endsWith("END") ? u : t.endsWith("</Map>") ? Q : t.startsWith("INSERT") ? I : "SOMETHING ELSE";
    }
    function k(t, e, o) {
      o && console.log("looking up " + e);
      var r = B(t);
      o && console.log("hashed:", r);
      var n = c.indexOf(e) + 1;
      o && console.log("offset:", n);
      for (var a = n * d; a < M.byteLength; a += g * d) {
        if (r === m[f](a, !0)) return m[f](a - n * d, !0);
      }
    }
    function T(t, e) {
      var o = !(!e || !e.debug) && e.debug,
        C = O(t);
      if (o && console.log("dataType:", C), o && console.log("EXCLUDED_FORMATS:", E), E.includes(C.toLowerCase())) throw new Error(l.replace("{}", C));
      if (C === G) {
        var d = i(t);
        if (o && console.log("parsed:", d), d.AUTHORITY) {
          var f = d.AUTHORITY;
          return Number(f.epsg || f.EPSG);
        }
      } else {
        if (C == p) {
          var D = i(t);
          if (o && console.log("parsed:", D), D.name.match(/^WGS_1984_UTM_Zone_\d{1,2}(N|S)$/)) {
            var c = D.name.split("_").pop(),
              g = c.substring(0, c.length - 1),
              M = "N" == c.substr(-1) ? 6 : 7;
            return Number.parseInt("32" + M + g);
          }
          return k(t = s(t), p, !1);
        }
        if (C === h) {
          var m = n(t, "gml:identifier", {
            debug: o
          }).inner;
          return Number(m.replace("urn:ogc:def:crs:EPSG::", ""));
        }
        if (C === R) return Number(r(t, ["gml:srsID", "gml:name"], {
          debug: o
        }).inner);
        if (C === x) {
          if (t.startsWith("+proj=utm")) {
            var B = t.split(" ").find(function (t) {
                return t.startsWith("+zone=");
              }).split("=")[1],
              F = t.includes("+south") ? "7" : "6";
            return Number.parseInt("32" + F + B);
          }
          return k(t, x);
        }
        if (C === w) return Number(t.substring(17, t.indexOf('"', 17)));
        if (C === A) return Number(t.match(/^\d{1,6}/)[0]);
        if (C === u) {
          if (t.includes("init=epsg:")) return Number.parseInt(/("init\=epsg:)(\d{1,10})(")/.exec(t)[2]);
          if (t.includes('"proj=utm"')) {
            var Z = /("zone\=)(\d{1,2})(")/.exec(t)[2],
              H = t.includes('"south"') ? "7" : "6";
            return Number.parseInt("32" + H + Z);
          }
          return k(t, u);
        }
        if (C === Q) {
          var U = n(t, "Map");
          return T(a(U.outer, "srs"));
        }
        if (C === I) return Number(t.substring(t.indexOf("values (") + 8, t.indexOf("EPSG") - 3).trim());
      }
    }
    void 0 !== t.exports && (t.exports = T), "undefined" != typeof window ? window.getEPSGCode = T : "undefined" != typeof self && (self.getEPSGCode = T);
  }, function (t, e, o) {
    var r = o(3);
    t.exports = function (t, e, o) {
      var n = o && o.debug || !1,
        a = r(t, e, {
          debug: n,
          returnOnFirst: !0
        });
      return Array.isArray(a) && 1 === a.length ? a[0] : void 0;
    };
  }, function (t, e, o) {
    var r = o(4);
    t.exports = function (t, e, o) {
      var n = o && o.debug || !1,
        a = o && o.returnOnFirst || !1;
      var i = r(t, e.shift(), {
        debug: n
      });
      n && console.log("first tags are:", i);
      for (var _t = 0; _t < e.length; _t++) {
        var _o = e[_t];
        var s = [];
        var _loop = function _loop() {
            var E = i[C],
              d = r(E.outer, _o, {
                debug: n,
                startIndex: 1
              });
            if (d.length > 0) {
              if (d.forEach(function (t) {
                t.start += E.start, t.end += E.start;
              }), a && _t === e.length - 1) return {
                v: [d[0]]
              };
              s = s.concat(d);
            }
          },
          _ret;
        for (var C = 0; C < i.length; C++) {
          _ret = _loop();
          if (_ret) return _ret.v;
        }
        i = s;
      }
      return i;
    };
  }, function (t, e, o) {
    var r = o(0);
    t.exports = function (t, e, o) {
      var n = [],
        a = o && o.debug || !1;
      var i,
        s = o && o.startIndex || 0;
      for (; i = r(t, e, {
        debug: a,
        startIndex: s
      });) s = i.end, n.push(i);
      return n;
    };
  }, function (t, e) {
    t.exports = function (t, e, o) {
      var r = new RegExp(e).exec(t.slice(o));
      return r ? o + r.index : -1;
    };
  }, function (t, e) {
    t.exports = function (t, e, o) {
      var r = o && o.debug || !1;
      r && console.log("getting " + e + " in " + t);
      var n = "object" == _typeof(t) ? t.outer : t,
        a = "".concat(e, "\\=\"(.*)\"");
      r && console.log("pattern:", a);
      var i = new RegExp(a).exec(n);
      if (i) return i[1];
    };
  }, function (t, e) {
    t.exports = function (t) {
      return t = (t = t.replace('DATUM["D_', 'DATUM["')).replace(/\.\d{16,}/g, function (t) {
        return t.substr(0, 16);
      });
    };
  }, function (t, e) {
    var o = ["esriwkt", "mapfile", "proj4"],
      r = o;
    "undefined" != typeof process && process.env;
    var n = [];
    "undefined" != typeof process && process.env, r.includes("esriwkt") || n.push("esriwkt"), r.includes("mapfile") || n.push("mapfile"), r.includes("proj4") || (n.push("mapnik"), n.push("proj4")), n.sort();
    var a = r.length,
      i = a + 1,
      s = Int16Array;
    t.exports = {
      ARRAY_TYPE: s,
      DATA_VIEW_READER_NAME: "getInt16",
      BYTES_PER_VALUE: 2,
      DEFAULT_HASHED_FIELDS: o,
      EXCLUDED_FORMATS: n,
      FORMATS: {
        ESRI_WKT: "esriwkt",
        GEOSERVER: "geoserver",
        MAPFILE: "mapfile",
        MAPNIK: "mapnik",
        OGC_GML: "gml",
        OGC_XML: "xml",
        OGC_WKT: "wkt",
        POSTGIS: "postgis",
        PROJ_4: "proj4",
        PROJ_4_JS: "js"
      },
      HASHED_FIELDS: r,
      NUM_HASHED_FIELDS: a,
      NUM_FIELDS: i,
      UNSUPPORTED_MSG: "[get-epsg-code] {} format not supported"
    };
  }, function (t, e, o) {
    t.exports = o(10)("5hB9Zw2Ck9AKEi6BFEeSwwYeyJESZ7FwzRzIkWu2inbjG60iVH8SIOAbrSJUfxIg3RvIkRJnsXCuG8iREmexcKwbyJESZ7FwoRvIkRJnsXCBG8iREmexcH8byJESZ7FwfRvIkRJnsXB7G8iREmexcE4byJESZ7FwRxvIkRJnsXDuGhgkWOXZa+waGCTajDtB4xoT3SpAjzjiGhgkTzSewOEaGCRKZmPhfxrIkRJnsXAyGsiRa7aKdgwayJESZ7Fw3RjIkWu2ina1GMiREmexcLIYyJESZ7FwrhjIkRJnsXCnGK0iQLawDT8Ya/fk9/2N9xcXomu2inb+FpLFEmexcDEWuWge+74p2RUVM2u2ina5FcYFB8BIgKoVmWdrtop2lxWj8UbkR8KUFUaxigOljXEVV9hrtop2WxX02UBqIKdYFdLpPqP+wEsVrTwODRGfERXDIWu2inYFFZQfkMavqf0U7Y5rtop2+xRMa2u2inb1FONNkMavqfAUvptrtop26hRVTWu2inbcFO9ja7aKdswU00hrtop2kBSoGGu2inaEFCu4a7aKdn4UGWQSZ7FwcRQya5ObVFJtFLcnYajK4mwUlu9SZ2EkDBS1tB77vimVEwa8a7aKdigTayQLvV6RJxN9Uj0EwEwlEx330FJlo9gSMlWKA6WN1xIE1IoDpY3VEoghMMtAsdQSdfkPY6DQ0hIp/UdOCRPREkI2JY6LiNASYfb64PQnzxJXjwZwY+vOEvylv2jc6M0Suac0DHoVyxI5Ho8027TKEqQT5icELckS5uXkp0DSyBIrA5aP58DHEsGCQhi1L8YSH+pL+UnDxRLz7DEerN3EEsvYqOW9eMMSMZtExBvewhLVJyPbuzfBEmkIeqosYp0SOk5rtop2nBJ6Wmu2inabEg73kMavqZoSvUWQxq+pmRLCiGu2inaYEhEuhJfb3pcSGaJrtop2lhK51JDGr6mVEiPbVH8SIJQStW+YVUS+kxJY5JDGr6mSEteMjjzMC5ESAJmKA6WNkBJgPl6YXQiPEh1jGh+mGY4S5oIo8vskjRKjfGu2inaMEv9mXphdCIsSYTtrtop2ihKDFh77vimJEnaEHvu+KYgSUGtpDzAXhxILJyr5S62GEk55EmexcIUSSlGKA6WNhBK4tyvv7MmDEgAFVZo7WoISDYI+o/7AgRK76Wu2inaAEtfRk3XyR38SUVZjMwRmfhIFWqZBYdh9Ek6qqelfP3wSklsBtXHRehJ2pHS58Yd5EvpRq2JpingS1IcvsssbdxJfx5jSLQl2EgfydjMnkXUSwD8nNs0bdBK4uTAYImBzEsBhqWVaZXISGbKzfru2cRJ6PUEbVjVwEuDvo6I9Ym8SqCycMYD2bhKr2o2s82htEhEtzlztd2wStYGgmDjraxIpPnajK+pqEsnHY4WALmkSUiLBxfB1aBJDT8V2iGtnEipSOPqWOWYSLKF9uYW4ZRKIQp7qT65kElepmlidZmMSXNK3Pf+kYhIV/rysy3xhEgzDigOljWASo/2KA6WNXxIa3WkPMBdeEmoXa7aKdl0SGihQK7PbXBLqGGkPMBdbEo2ICZhVuVoS5E2gSCDZWRJQg2kPMBdYEiYXaQ8wF1cSgWLkTKYsVhJrwZDGr6lVEgvoMrgMP1QSO8DyHQefUxJPBASdstxSEkpQyzU86lESFUI5VfTUUBKtnoePvHpPEgJHiDoJBU4Sh5Nrtop2TBIvKyueY+NLEkslNk0gAEoS9PstKLQxSBIaqzj11LdHEsQzyGKhX0YSkDXrYR8+RRKDADTK569EEm8QNMrnr0MSaVok05fBQhLXpWu2inZBEv8PINMp0kAS4mBBDm06PxLJXdZoD9c+EnrUkMavqT0S6khrtop2PBIYbco8cb47Er8fkMavqToSlnFIN1/tORI0sFTEXNM4EgWdLFwoTTcSaOvK+mbDNhI3jQyy0l81Ejh4a7aKdjQSZbEdQNG8MxL3b2u2inYyEohzGLyyODESDVFrG03gJhLoHFPGJOgkEvwwq06OHSMSPrdWUzpvIhK5qg3fm6IhEp/6yjqM1B8SVlXnfrGeHhJWxTDwKDkdEspN+eA4dRwSuH0S5+DHGRJbL4N6uF0YEgGK0+DjiBYSMF1CIHWrFRJRdB4m0bEUEktHKgzoyxMSO/Nrtop2EhL+y/h8ru8RElKWG2b9UhASjEBrtop2DxIhrljCA/cOElujL4kLrQ0SSeIDk/D6DBIRb9TpaaYLEt0Ma7aKdgkS7xZrtop2CBLi/KT881wHElGoYIbiAQYSAXT0X/sKBRI6r68TV1EEEt3Ya7aKdgMS3q76LyebAhI7JK1OuIMBElOjQGogpwASofZAaiCn/xEGrxtSYG7+EaIrQqRPcP0Rag7JV9zY/BG8fEMFFRj7EZvxcVKZafoRLhlXR5iD+REl4sN0WUv4EWXbaQ8wF84RYc1rtop2yxF4OjTK56+KEZBGEmexcIMRZttrtop2exF7EosUfqF2ETLka7aKdm8RL+Jrtop25BCoPUMZTHLiEFado6I9Yt8QBx71lKwA3hAOWcTDytncEDgKyVIwB9sQjKlZzqSr2hDAxs/Pk/7ZEMWkZR7dxdgQ8r40Xk8V1xB5r8+CRWDWEJdc1mgP19UQ1v00OHoU1BAZUx77vinTENDodrrkJdIQqVge+74p0BDpkE0PHsnPEP9zYtQQkM4Q47mwNV5PzRBxmTYomJHMEHEcDmLfIMsQYnQOYt8gyhDJnH7+kfDJEMOg7stLmccQxrke+74pxRA2tA9z8zfEEN+QzU6AIcEQAsBsFWSDwBCHb4oDpY2+ED7kYtQQkL0QKhZxFA/BvBDcKL6O11K7EBufa7aKdroQKtsrnBBOuRA0unhTII24ECGZHvu+KbcQGE+jUQYxthCT1KNRBjG1EHRuKzFhnrQQ3zKEl9vesxCi9iLPg+SyEOtoluEjzrEQxKDT6rp5sBBNPxrv2qqvEAEuwKS6IK4QW/Kn+y4erRAkOGu2inarEHDyeOzMNKoQf+zqJdafqRBHFSwzfcWnEHXiNm+4iaYQKSvYdMmdpRADKNC3K4SjEFCkMv5d2qIQJc1rtop2oRBM9dpVYumgEPGX3PsXrZ8Qg40jpXbKnhCG5X3wzGKdEJSAe1kahpwQBHPWaA/XmxB8JGvlYtuaEF8ud4WhhJkQc3mKA6WNmBBbMB1vC1+XEJxxwOBCm5YQ+g3V6H+1lRA1oh1QCh6UEH/iaZD0PJMQRNKbtVPAkhAzSfuVTyOREEpsbK9HY5AQvex2XtzYjxCwTJKoI3eOEEOcn3Qa6I0QusRbolpCjBArjZfryMSIEEEsGiDNTIcQQFKakSh7hhAVB0Ba3qCFEKR0zb0Bt4MQT8dg+XrTgRAh/9bpxj6AEOo5dMqBXX8Q9PUMmFUsfhCMESBybS59EAgRiM8ZNnwQ9QYUWqj2exDX/1VK1Ht6EE3mUF0ZiHgQaLKliMZUdxBc6ooDpY12EHKrIirJenUQ/940QT/ydBD/Vpkx3mRzEHUzfez98XIQ/Wf6eb9jcRBMQ2gY1+NwECXOkPloNG8QbYDiHH8CbhANvNZoD9dtENGUd6t2fWwQlu+V6rnGaxCT77mOYiZqEFbzQfSVJWkQNUq3u3tLaBDVCec42XVnEAXXigOljWYQnmVpDzAXZRDyImkPMBdkEJXsrkik4mMQnL6c++4vYhCAWRN2zddhEJGIrBYw5WAQHCljzDnqXxDapzTK569eEIYZa7aKdl0QhKJrtop2XBDROEKGAjFYEGivvmaoMVcQwYPoK2DaVhDqm3BFRJhVEMqSUCX9plQQp3lrtop2UxBLbnhFoM5SELFJs/ow+1AQAvhrtop2TxBilLazs71OEBhDIEt3iU0Q+jtrtop2SxDW5Gu2inZKEDxDa7aKdkkQr19vdNSTSBAL9IIcfORHENhoa7aKdkYQvP6Qxq+pRRCSfFixephEEDuiliDa/kMQKwOQxq+pQhCbsB77vilBEGYdd9ANq0AQPIiKA6WNPxA1BHMiSJU+EBh/Goy82T0QB7o+o/7APBDDDrb9cdo7EK6C+WzYHToQwo5mvJkJORCjm21nk3I4EMfpa7aKdjcQlnBrtop2NhA0gZHbOJg1EILWMU+TbzQQ3ZCQxq+pMxC9nyB0FIwyEBheEac0FzEQBryLcYo5MBBw9UXNKTYvEC1P13lBBi4QmKmZgIMELRBjF2kqH2wrEGDAW2J1YyoQAWpAaiCnKRBrsUBqIKcoEICFQGogpycQaEbC+8kCJhBoBm7SoJslEGQPJvdSkyQQhvWqgS75IxBIkSF8/fMiEE/yfbnr3iEQV9lAaiCnIBBcykBqIKcfEKhRvvzmNRwQT0uZ/i/IGxB6MyYk7+UaEO1xWJAxahkQ2fenOOoXGBCLAh77vinxD1vfa7aKdusPBqZrtop21g+1appwusPVD+shbQrw3dQPZArynqnvzw8q3mtacgLOD1nYa7aKds0P6my+aPsUzA9p3uCMtu/LDyzPbhmaosoPjWObtVPAyQ/Su1iQMWrED3pEkxLq9MIPpZBsr0djwQ88ynM7f47ADxJWD3oZYr8P6hlUfxIgvg/Zx1R/EiC9D9XhIEt3ibwPRBc5tOCYuw8dPnY06cW5DyxAhJfb3rgPmA40yuevtw/0lmu2ina2D5ZWigOljbUPZN2sOcd2tA+Ls2LUEJCzD0f+EmexcLIPOGiPx+kwsA/Ppnt3cbOvDzlBjJMMXq4PgQCJqtu6rQ/Lo3u9Y+KsD2TQaQ8wF6sPv5TWaA/Xqg9OYhq6JPeoDxlFQGogp6cPxVU+o/7Apg9xMD4yslylD0ravqPqRqQP/YIe+74pow+Vwn4x8tSiD/9wDK+yx6EP6FWjUQYxQg+HVpmDCvUxD+ura7aKdvAOivtrtop27Q6mfX4x8tTrDrLH2erVJLcP9JZrtop2EQ+g/5IO6dM0bBvGmpzT2WoIqcp4Vu3/ihXf+K9RKqsVVcDNqcVcbUBqVJ8wk1hZinqzO94rJ8lAcYXgXRHMBPsLFrQiAKNNznRInfU1GeEICGhTMVzXMvhZ22SRwvsAkQg8gQdI/IMQHs2JRqBSTA8eX8tPW6iwDh5q8BtkGSINHnUV52yKkwweB1fwJ9/33R0AQe3gskTcHX5gcuN+kNsdPwp4ynkA2h2NalPGz/XZHc3777S+btgdnYNrD1b01x0CaPnAnzfWHf8r0roXC9UdZoxraBI21B1a7mRjkU7THWvVxx6C+tId0L5kACxC0R0LJNz7KaXQHWc3E7i6tc8dL8HwaHmZzh3p/cAaPmTNHRtHQuA10cwdCsWFJL14yx14L0yaWTrKHZDS10FArskdHRahZoutyB3jpQlId7DHHTxpLiV3WcYdsJugY7C6xR0By/MpKlXEHb4msHLbR8MdVRWkoAPIwh1Ey/ftHdDBHWkC70KAvMAd1nXZnQA0vx0qeV2TgJu+HV6GToPOnL0dVMPSIjJXvB3qrscsywe7HT7nv4WEJ7od7veLl0u4uR1GGwVyYvi4HV24LpyK2LcdnFyA440hth06dRTr8h61HZQQ0kJyqbQdcHzc07rcsx0ngt5IRXGyHWmf4/ts77EdKBYT9XVjsB04dkSnpE+vHYpbzp20Pa4dvoQDKAH/rR1svxFSkL6sHUxGNF53TasdM9YqZxgFqh3Bl6ia/P+pHQB3IDkPF6gdRm0000Napx1BoXdipemmHYpj6G7EMKUdfeWn0O2epB3Y8OeNPuGjHQDTt/+CE6IdTKg4nVpgoR0ZtIZqE1CgHSiL7yMBz58dFK0y8jB9nh2JHyiHCCGdHXk45550H5wdV/We1DOAmx2YJ87l8oeaHVHCdUJhDZkdMVhm/qitmB0M5roP+eOXHZ/ixTZ0iZYdkaNxpqjClR2tinxR9YGUHQxbZLQh4JMdXT4PB2m1kh3iSh4A7HuRHal6JPOvopAdHmvBR6Uejx2YpfVoSQuOHQYcfpZ/o40diyWVFJ7EjB1kySM5J6iLHegX5IWTqood+rYrAtlliR2sTRZh5DCIHYF26WtSLIcdCEeECWfJhh06VeILdSWFHbhJkqn/nIQdqJJeZJ7Mgx0cX4CjREmCHSmqH2bBf4EdQLx5oAu4gB29BaGICBF/HSMZyoGIdX4dNVXar0IzfR1MEbUgGJF8HWxoWloSRnsdi+Ob3bUAeh1mB16jwhB5HVBcbYkRtHgdtNnhwO4Hdx2eVlVMT4x2HTruXcfjc3UdqZAs/T+qdB0m6pE+g61zHSW0vHEX+3IdOaAkAyiucR2BQS1PPStwHfDNUt6Pym8dZZjiMyIXbh3C1uF6TQFtHZ8jv0C6XWwdQxObb4Z5ax1boIWvjz1qHaxr1VD1C2kdUqIZZYUvaB2Wa9ayxcvQHAkou3+Iqc8c2yZN4zOAzhy4R9lx9PLKHD9AcBCvmMkc8NcADq0xyBwguWnkIAXHHLjMfKCmqsYcDewp8gB9xRz6Y5qilfTEHNxiZA53GsMcs+RSci/fwhxkrFansBXBHFTSBcuneMAcGL/QOXnFvxw+mE3Wnhm+HH/aY2atD70cAO9aFZcFvBwUEigx9eG7HJsItFaCdrocBoqL9P7duRxVR/uuQQq4HD1SuQog47cc/4XAdny9thweXDh9l5O1HKNnyVMgXLQcFUO6BLQ4sxxixyfKfZ+yHIbLDLRx+7EcR6ID/XdMsBx+lTriMGSvHEdzr46Z1q4cXf5dsu/nrRzaVaNkTHCsHD6pRl+VV6scnUyEte7WqhwACVSrmJapHJ2cPCPXaqgcBvQ30iqjpxzU6zh6htymHBv1AOOw5qUcWOu16Hg0pBynZWZn3mCjHCmuvmBxoqIcmXTw0IuJoRySJNjQvn2gHCMuXr4VXp8cIA1uC5O1nhyvuusZtM2dHEipcWri+Zwc5/CeZvxTmxx7wo+VKECaHBNMu8kMj5kciMIbA8ApmBx6cB604viXHDGRCq3mipYcBthUMsbblRyNoZntyUCUHEz63JUWWZMcQC8UtB9AkhzNwvCETQqRHHYM42e1wZAcv0EcfwGqjxxjWm0P22+OHByYEVF2xo0c1Rwiq8+KjByDkXeKaaSLHIo8vMVnwYocvXzJDZcXiRwHmuPhTeOIHMagXN6o94ccX/ltGjZWhhy8UpcoS6qFHCC4dw86y4QcZ+mVxI9xgxwZQ31mNQyCHNBkqTyy04EcThGc9iTQgBy73t0ZOZJ/HA4vuasc4n4c3lkfsUXKfRwY7Jeo48N8HJ7jCoepHXscrxRurVO1ehydHfITLMF5HB1V9VBiTngc1es50I90dxx3I5Hb8d92HC76gCAtunUcmCKwmSW9dBwYjaz8eX9zHHZnwQ+HVnIcuwf+UkLzcRzJRv0ASEZwHHfMTOqxiG8c3s134HFEbhw9hUeTlRFtHJQZbPaGgGwcZU6lx7GXaxx5Hn/7jL9qHMg7FxQzmmkcc8xpplv3aBypOy6KU+dnHCuAzmF4NGYcDkZ/YW03ZRwGeDpTHEhkHEyLpfWZt2McIjm3D0X1YhwxFPiEqXZhHCIvfekfu2AcKHXAPof+XxxrgHV3u3deHHDK1fGnmF0cCI2kQzWgXBxOit9Bb5pbHEmYI5LgZVocbEV8qUkOWRzKIPCmzj/mG59nT0/aCdwbDJbYj46U2xt+67Gvq9zYGzW9I2Ue6tcbzE/K68zK1htg+ZQkyp7VG6SSFzx9edQb3pBPGk9B0xtYCUN4OfzSG4zi3gio4dEbjUV6X7tC0BtfGYUg2gXPGyK4SUJSQc4bC50dvv8KzRu1skPhgjzMG6yIlt7Sp8sbHTMC0FJDyhso7pTPAFrJG28fqJ8Axsgb8kCxoQhkxxvWx2kr8ajGGz2NtslvHMUbBUXQKC5EqRtWHdfz4B6oG5Ox/sXfVacb0EUmmN6Mphtt9U1q3cOlG6qJdTzc+qQbc0XXS8a0oxuw2f8dxeuiG+1tJvDEIp4bkYDY4JfEnRvmE6WxRjScGy0lJZVHpZsbRBqnwnOTmhs282xZYdqZG2RQLpBGV5gbX555d/pylxt3d4B4BzaWG2ilnDmlPZUb07jeZnFKlBsxeC51Zi2TG1c2PWxZWJIb/P7iu7T6kRt0L6z8XTJfGxps1/snHl4bNeVqjvxXXRtQXv0g0pFPG6JpLHCGfEgbomkscIZ8MhtKkze7WbkVG/Dg16/IgxQbETHCtT/lExv0Ly7rFQ0NGyindMb9+wwbcu2BVLWaCxvQhn8SaZgKGwyN2g9QkQMb88gLXbeI5xq+AFQNmv7mGoiUwNfZZOUa6i23UfGe5BpMYhXNcofgGo1NT6lU1t8a8LwMGAto3BoznZQOhVHbGtWAOxdYC9Ya9YBxwsob1BrLVWLTboLTGpj+ww5MJM8a7ROL70olzhpirNIDK+3NGu0Ti+9KJcwaYqzSAyvtyxpj8NpNc7jKGui1rhhOv8kaY/DaTXO4yBrota4YTr/HGuQ80KpakcYa9uIwVn0XxRrkPNCqWpHEGvbiMFZ9F8MaiYjC+tQfwhonWguCLs/BGomIwvrUH8AaJ1oLgi7PvxpDI3Nh7bi+GnjhLVhq4r0aQyNzYe24vBp44S1YauK7Gi3yO7BM3Loa0vq/IluZuRot8juwTNy4GtL6vyJbmbcaOfT5knZethoXQbloAo21Gjn0+ZJ2XrQaF0G5aAKNsxrh/D/XuiuyGs5/rTWp0bEa4fw/17orsBrOf601qdGvGpxBbTvMgq4aaCKb96ZLrRqcQW07zIKsGmgim/emS6sazustaW7ZqhrlPO0MNPypGs7rLWlu2aga5TztDDT8pxpTlBVY1wemGrHwJ9+cp6UaU5QVWNcHpBqx8CffnKejGhs6CRF/UqIajrUbUoZ2oRobOgkRf1KgGo61G1KGdp8aerSvCR5EnhrcKJE/j1CdGnq0rwkeRJwa3CiRP49Qmxpn1le/aziaGqQHnOTiY5kaZ9ZXv2s4mBqkB5zk4mOXGsmgQ3wDw5YaoBlduT4tlRrJoEN8A8OUGqAZXbk+LZMaq0JErhpnkhpx2f891LuRGqtCRK4aZ5Aacdn/PdS7jxq/oePbKmmOGrUy80LFI40av6Hj2yppjBq1MvNCxSOLGvXE5v4NJYoa+PQuM8AxiRr1xOb+DSWIGvj0LjPAMYcal797QcWRhhpaTfnFCa6FGpe/e0HFkYQaWk35xQmugxoW8q3HfDiCGuoHdhOiT4EaFvKtx3w4gBrqB3YTok9SGttHeJ5iYFEa3ynag1ZEUBp82QuDF7BDGie0FLygg0IakZBpcDLrQRqQvNUThCBAGnynrQyB1DUacqG0Y04kNBpDoEbH+vozGhPy2Cqm0S8a71RC+ZkjJBpivx4+PEojGqDs3FgLwiIaDmqbc9s5IRp751mOq7EgGrkUGKl7KR8af6HZCoO+HhoB0EfCP08dGq8Y04C4bxwaWneGu8dNGxoO0Okp5AAaGqP1UGKClhka0+a1J7HMGBqAb4ajRasXGi74WB/ZiRYa15BpAYSTFRrh7g98YsQUGk43toho1xMaY4gTXShpEhrG+5bSNhIRGsBXzbvbmRAaSAk+X9JCDxqucW80x0wOGqZHdh7ieA0adYI7U6p/9hm/I5puN4ftGcCy7fWqr+wZZo6wwy5b6xkgiofQXfzqGUeVRestdOkZPhG8Prbu6BlUWaSiy4vnGXlWiO+2TeYZPb/LvnLO5RneTkQemQLkGXoWAAUxuOMZ9aYRXNXS4hktJy1WYA3hGTlpkm2x1eAZnQ2FCnKa3xlXOYUKcpreGbN+30PeX90ZXo8HFkGN3BnmtWheT87bGec++HoImdoZC9d9TmnE2RkdBTsYOMDYGePWnyztvtcZtq917VNz1hlLX3hfU/bVGXm5Q7Y7DdQZp4P5DxuG0xkDUsdBN/HSGeY9C7KBAtEZlQg2oIvu0BkJYuOxerHPGT6M+COk184Zz6slh5UUzRnte6j00DjLGWrqZa8EzMoZAj8u7yViyRm60H3YtB/IGQ2dkmLANMcZJTduUgg4xhkzP2EqX97FGSLdT3K3xMQZdtihH0zowxllzdlkT1/CGVby+Kjxe8EZ7zhmJQ4nwBm+GNpnjFu/Gd3EjJxxbb4ZkjIXShABvRkVw27ZFQO8GX/Blh44OLsZEdr6CPi7uhkZSaJlZ3y5GVo3FZbbE7gZye79iIf1txmwC1bI66C2Gajz88BTM7UZ9nLnV9FYtBljsztIcAKzGSO7t2ZhkrIZOiT13hxgsRmxYkMs1++wGZbwB4GZbq8ZFOwvhd8qrhmhunLDOfatGcYKYNKmM6wZ+QIMLsHMqxlnHSx1yhiqGUR6dTOIoKkZnzLJHj1UqBl1oQLJ4gOnGW2udgcauKYZynTcwjbXpRmUgZdIYlakGXHqWpNX8aMZfLm3H4BUohm2+0B5kuyhGb4AVA2a/qAZiJTA19lknxnqLbdR8Z6eGUxiFc1yh50Zy1Vi026CnBmY/sMOTCSbGbBQAqQBnZoZ3AJhe3AKmRn01aRQxkqYGVewFi4FRJcZ/IsHQZMilhlwSItHSMiVGX6U9Yh2NJQZ9QHco7YXkxkQkQ3/4SiSGa0Zq9fWA5EZYW+3dFTMkBntXEEbXk+PGYf0Z/qCo44Z4+Y1AmxajRmsPvSrqMaMGXVxNS8UD4sZs32FVzknihlVKP6eQxeJGV5olvAGd4gZnirOhRrDhxl2HiL+nV6GGcK3nkjWPYUZH34KxrUshBlPgs1w57+DGYWpYjOU6oIZJiMs6jLzgRkTnhpMtCyAGfy6p0veOX8ZXmiW8AZ3fhmeKs6FGsN9GdA6yr7FP3wZZwQ+YVdUexmwhBf8CMZ6GcSNy0qhQXkZ35M4OAQaeBkS1QY+hXt3GUdWlsCZAXYZnOIzz/g+dBmNhH7lbcZzGQ4wTqTzZ3IZjAPkEAnDcRktVMpoT7dwGQs49OBMeW8Zl/d5u6eAbhkm5QXdO5FtGUuPv9QJN2wZKrkLQZUoaxlQeZuTZ19qGX9F648xG2kZX5tewKRbaBnNIV4/xThnGbmspIRkgWYZUeZsyN6XZRlEcMxZQU1kGQy0dv6fM2MZLk5YpEQBYhmpDXkx9RNhGa8RwLVZ7GAZNDxBujeBXxkOYNKggpdeGUb1r554o10Z4rRb1TdaXBnezOtob2FbGdMxP0/h/1oZCAtmdfBaWRmoE21ugbRYGeBriZin/1cZEmJyU37RVhlQL/ngQ/1VGcQXVdV6BVQZtkpVh2XkUxkSoCkD1XNSGR8KSX6cylEZnylDkuVYUBnd6gQTZpBPGRX/Mvm+6k4Zm8cyVi3zTRmzYRtoZ51MGYm2tpI2CEsZMxpx7IYDShkeiRbXHv5JGeH2xq5TvkgZup738wXoRxn7nQhrPYVGGebGgDSx3kUZXH/wC8t7RBlS3nEaYodDGc+++r5/LUIZslZKe0rnQRnBbQJk8a9AGeiZoHNnET8Zk5Y0AszfPhnOxwRw4x49GdbMFZ4YvzwZW1mdN0MwOxlKLIGAbio6GX8XzWtSTTkZMkCvPOlCOBk+CJpgBvY3GSdTrejM7zYZrN9tvlMwNRkGB+qtWNU0Gafy30SzwzMZQtAhU7D2Mhmw7QXwGyMxGdEdc6wPmzAZutzMaqsxLxnYlLZGmScuGQvRuPizoC0ZwVNgYkB0LBn8bn1x500rGQtgyzinoCoZSjuEywOzKRk6MOkHNCIoGbxBjmA1IycZUkfRS7LRJhlU05xxLsAlGb6sCCTUSCQZooc1o13EIxlQi5XRWaoiGYR6rl7zTiEZg/JEC21cIBlG84iNLLQfGVRBK3jOiR4ZoBGZzDzCHRlpNeeWgTYcGaICd11fVhsZ8+SlOctJGhnEnmBU76IZGV9w9YN3IhgZJsI/CyUUFxkE+XK+8dkWGQWvZrBqJxUZNGcYN9hAFBmSPSxVd7ETGYTbTn+DbxIZVWtxvat3ERlVd2jP/GYQGRiy6V8kNQ8ZuSAu1nhDDhm0NwsHDfINGWzXBALZGgwZijn1dgXhCxlhPqtoo0IKGULMhAmOKwkZNXRRnRo7CBnxouDXhIIHGaWGv74lyAYZK2n9+YVVBRlHjAu+iPoEGZ4ygyscNgMZuhifvY2WAhmSEAUZxHkBGWiI5KdHRAAZELDfQ3Fa/xjmJ77S9CT+GI5PuW4eO/0YNXezCkdR/BgM75KZyxv7GLMWjTX0MfoYy8nawcVg+RiyioDkonH3GPn8dQP3Q/MY5+rvA6lT8hgwfoTpaeTxGHkRGM8odfAYwqSttOgF7xgLP1Ph44vuGFTS6MaiHO0YnWV9rGGt5BiVcYY7MXzjGIb27LmKdOIYn1x+HTZL4RjnEhCB4iHgGEu+ouSN+N8YQ3k0SDnP3hhrhMar5aXaGJVxhjsxfNQYuKBFpYWQ0xjD9FO8F2jSGM/hS67xodEY3N4E5HcF0BgM4fzBurzPGB4G3WRrdM4Ya+ORtiNjzBgNdHLHnnPLGCXaMOJt68oYPkDv/D1jyRiG9q0XDdvIGJ9cbDLdUscY5xIrTazKxhhLvulnfELFGEN5qIJMusQYa4RmnRwywxhjPyW466nCGA9OjWUeHcEYBwlLgO6UwBgAxAqbvgy/GCfPyLWNhL4YIIqH0F38vRhHlUXrLXS8GEBQBAb967sYOAvDIMxjuhhgFoE7nNu5GJkXw4YiH7gY2xkj0/1qrBhXLjgrJU+oGEd0bjXF6qMYynTcwjbXQxgvAGJyGCNCGEhm9NXE+TwYR7ln25u48RdDdXaS19zwF1XCouunie0XuXCLWXOL7BeupG+ludLrF33yQC/kJeoXrsYtaNjc6RcpbRl//XfoF5FxUTcecOcXw3S7jSN25hc8cGcQvOjlF1JHqD50j+QX5CujFId+4xeQG8zhWtPiF+RDkOX7G+EXqzDgZWAH4BeegxgKdfzfFzPbxGyVvN4XQPzrj7CX3RebpPUuxrHcFxiUSFAjhdsXqt1S7zmf2hf2nDiszFzZF1J3ivPqUNgX4uc4LHdU1xfCZhwLxQ/WF9oYs2JX0dUX0oH8Ps361BcnoYSS6XTTF+Uhb2CRltIXB0na1Etp0RcSsOXsphjQF5mWek5Z1c8X9UIsjvspzhfUYKqUB17NF9YnjfqWoswXKDH+e8P+yxd6Om7971rKF8xD334bt8kXaxLKulyAyBe8DDs8idzHFzbNHdhrScYXjDrDeYbPxReymHszcl7EFyadmGV9iMMXHGBybJ5Twhd5sryb/MTBF5hElaIekMAXWD76V5eovxcklrylv/6+F30/fMLTGr0XcmY/EPxwvBdsw0lFZDS7F5qFz3k/lboXJsQsQtpEuRfVZAP/AcG4F6ZiPcD8DLcXJFErAl3OthdsfCvRSO61F+Uh28P9j7QX8912ZzzJsxd58dxs2vmyF7TuUP3o+LEXVfcrQOqGsBcBxf9EA7evF/egqwPkc64Xwm9BZZcwrRdSBLen4UqsF6z2wUb3ZKsXBunL5Qx/qhfRthpTWFCpF8bwyIvlU6gXOGy7Sf8rpxexHZMdJrumF1BwKdF4eaUXPxkcC8UPpBc+XMuk9pCjF21PS5e/zqIXwFWdU0axNBdYQzoEZ8czFxcF2D+LXzIXPtF7hegfMRee3GwXU/MwF9D3Cq95AS8XqWy04SR/LhdedhRf3tUtF6cedNoojCwXvVNoNwA1KxfgFpTRxxYqFwV42H1mRCkXuoE4+yCbKBeSUK6lx5onFxhfjNNC+iYXAnfzucj5JRckfhEYQTYkF7BlcZX6jCMXsdJVYO8NIhe8/sRtHewhF9So0WZBQwIX1jlFhBwp/xZbaJMKo/j4FqWJtc2qdvcW5ZLvnIpc9Rbys7MF+Sz0Fo0DYxg6G/MWp7U8GWsa4hYgawAEli7UFoiMUlHlNtIW68B38VrDzxaeZdY4p2nNFmMCI2RZkMwWVuTTuXGwwRbxNu3MqvxEFk2Nbzru0TUWtB2hUtzLNBbciuGmnWszFs/cXUqnQTIWx3acnmnhMBadZL0UchgvFnIfIux0by4WI5YR0q2GLRbOJ99IAOosFjVGzi45ASsWaKTf8FgNKhbQwkD9BCIpFhPc2/j2mSgWElp2CF7iJxZ5eMCpvVkmFiGocb4YpyUWhAihUtzLJBZ4eOGmnWsjFhjV4aadayIWmiZdSqdBIRbX7M8edtggFm4f0w+Ffx8W5oCEof9TGxYesdUIu6EXFo2IksyS8xYW64eSzJLzFRZxmjhrcHwUFrQRyJ2BoRMWnCQe4UxjEhY+lThrcHwRFprJHuFMYw4W1qCSzJLzDBYOgHVsQ3kLFvOCmaKVhgkW+bbmmwaJBxYqpjeiGJoGFlrZ5q4bDQUWKD43ohiaBBZzGOauGw0DFtKp5q4bDQIW1AI3ohiaARaDOeauGw0AFtkBN6IYmv8VTYf4Cujf/RUWB7q+aJ37FcwSFUCg0fkVyLnH3zGV+BUokaXUM733FXBUOWFZ4twVvkAduo161RV5CVno34PUFa9Er53R5MEV1jECOB52wBXXygvSeIS/FV97MwcQRb4VYRQ8oWpTvRUOlNqnUni8FYOpNDBI7bsV+ZdWgZn3uhVurbAJj2y3FTewHl4a37AV2usMnKejrxX7Mj6baA+uFXyVb5oqe6MVfILGBBD3ohWvxTvBvpWhFeMIsH1rNKAVtTAlOhjTnxU0cHQBATGeFe0GTQIzMJ0VBrknA2QvmxXYAdoExy2aFdQx5LyTV5MVrfimLj19kBVka70UchiPFTNJvEHkGI4Vc/9dw70EiRVHp69RKqtyFSYQqgDHfWoVY/KUWjPzaRWKx73LoH9oFb/FBaA3YGcV9LEZ4SBqYBXhQEPcq7ZdFQXKNTNC7VcV+l1lMrAPVhUQ1Dcj1GdVFeFNOCysOFQV9nmKH1vGUxW3vv7AKUlRFYVTes4ImlAVs87qDlLPFBW10whR+MgNFfFdczokkgsVx+GkOeb9BxXqs6TOJIgGFQlx1s3m8/cUp2Ma+UP88hRUkKQ55v3xFNS3czokku0UnbAATcDj7BRPbnM6JJLrFAV2MUyCT+UUpqO6M4qL5BQtMm3o9ojjFLTnZiJau+IUO3YZ18a44RTCBMyLMrbgFEqTfkCes98U0Eh4egLm2RQyjTRtEwnTFCNZ48avd9IUklQcxDYG0RRmG32CPpvNFLuw/xKoFMkUG/ZVHASbyBTzIlUcBJvEFJgsgm1Iar8Uu/9r0VLdvhRgr5VVL9q9FPgrY1JOIrwUYpBR1dxLuxQp/KdX3xq6FAmU0J3i2LkUP+V6CyEMuBRHY2gelmq3FCa3FVWIQLYULVeVVS/atRQvYvU+I2i0FMoDj2SEzrMUSZmC0YDOshSgecJZS2ixFIdeMhQyj7AUvZubE10ErxQi/iRoy9GuFCCf9T4jaK0UuoJ6CyEMrBQUPcVn4qibFNbzduRc1JoUke1UE4KWmRReLqYetO6YFBkohE3asJcU1SFifABzlhSQG0CrJjWVFOgGIjcbfZIUz9HTbxutixT/1dLjfvuKFKNLRI4D5okUxvjV4S46iBRrbkeMsySHFA/kujY4D4YUtFks4b75hRTWBrw06U1/FNeEtoXXEXsUfEBk01Z+cxQSPH+PuJByFHp0ETY6/2cUw2JbvEh4ZRTgY8rN7clEFPvHIT7ui0MUidbtL/wTQhQjLyGp/YNBFH8GVCL/80AUVqgVd+qFPxR12eFo+A0+FOEFim2G0T0UR70V4vl9PBS8LEhb++07FBlgfMbu7zoUwfKprD3xORQ5WYs8K1M4FPG/JpoWYzcU7dLF7y9BNhQVOc/O6N41FE0peQO6WjQUnJyajkVUMxT6Mu3pqQIyFNwNm9ss2jEU8GJKza+xMBTerZH8czwvFJmGmo5FVAoUHH//Ulj+CRTVhKfrvH4IFACoOn41EAcULMvNEK6hBhRX7mGjJzMFFIIR9DWgxAQUrjSHyBlWAxTZVxpbkucCFAR7ru0LeQEUMJ5BgIQKABRbwdQS/Jv/ExTHfKthHP4TQOoPPtqt/RNrDaLQUz/8E5YwNmPM0PsTwlPJ9UVi+hPtdlyIvvP5Exia8Bo3hfgTRL2Dra8W9xNv4BZAKKj2E5oDqdKhOfUTi8SC+CAK9BMcuRWLmZvzE62tqB0SLfITPqI7sIu+8RPOls9CBFDQE1Z1ZamGrM8TZ21lqYaszhOh/GWphqzNE2/nFZzfKLgTItIiAKNNshO5B4eB7+uxEyyhqQ0YbJoT1zhpK3n0mBN7bhrkaciXE1DgPqvBdZYTInHQDmxM5xKMhGTTVn7aEjxRMBJQNtYSGOXOqy65zBIVdapWi7XAEgL1jK1zmL8SAIVpWNCUvhL+FEUDLpG9EvukIa6LjbwS6CQEBXNwuxLmtOCv0Gy6EuREvFotabkS0cSfsRVMuBLOVHtccki3EszkVwfPRLYShCvYoh2+tRIECbVNerq0EoXmkfjXtrMSBcRtozSzshIJsFD6HJaxEoqNLKV5krASCmsIUNaOrxIOV+umvnGuEo80x1Ebbq0Sa/R/TtjyrBKfjocmcLGrEuVvRsGV4KoSGQpPmS2fqRJNpFdxxV2oEoE+X0ldHKcS2/CrVFKcphIPi7Qs6lqlEkMlvASCGaQSiQZ7n6dIoxK9oIN3PweiEvE6jE/XxaESrb+OgtuHoBLVepdac0afEvw1nzILBZ4SI/GnCqPDMBJgePMVmEMvEogz/O0wAi4Sr+4ExsjALRLo8MNg7e8sEg+szDiFricSsrbInYGh7RGLPM6rLrnsEXZMjK1zmOsRcWxFAy6R6hFcfAQFc3DpEVecvFotaegRQqx7XHJI5xEfvtiiHb7mESB5kfjXtuURpEJQ+hyW5BGl/QhQ1o7jESrHx1EbbuIRy2U5E6dK4RGmLO0SBdPgEW+s60/W6t8RSXOgTzNz3hElxCv91NvdEQCL3/wyZNwR4rnXlG9/2xGeWtXRQJfaEWxCidGeH9kRKOOHDm432BH2yjwOzL/PEU5bqgDHfcoRzJpcUjyTyRGLhzj9mY/IEYTtGlSBcscRRNr3/t5uxhEDx9OpO2vFEcKzr1SYZ8QRuxmSq4BKwxF6Bm5W3kbCETnzSgE7Q8ERMlktWCMmwBHxRQkDgCK/EbAy5a3dHr4RmD5mSSuYvRFZJ0P0iJS8ERkQH5/lkLsR2vj7SUKNuhHePt6gKnC5EZ8nukuHbLgRXxCW9uRotxFkVnlNzEu2ESQ/VfgpSLURiJIN9eXMtBGMQBXNfYuzEaE11GeiurIRpePdPzp5sRGokeUX0jewEaw/7e9q9q8R2aU5+2B2rhHdU0LT9zStEeABSquP86wR9fYJRrUiqxH5pBEeTOGqEf1SGvbkn6kRB38cKelhqBFvriUBgSCnEdbdLdkZ36YRPg01sbGdpREGkoG8ph2kEW7BipQ+3KMR1vCSbNaaohFPZ1EH+8mhEbeWWt+TiKARt89cUjyTnxFvIhpUgXKeEe3706k7a50RpU6Sq4BKnBEkKEoBO0ObEdx6CQOAIpoRma9mSSuYmREagR+f5ZCYEd+v3qAqcJcRYIGW9uRolhElsFX4KUiVEV1Sx7m1JJQRBy17uROtkxGgwHn248SSEUqbLvZBTZER+p+5o+K1kBGkem2jQD6PETmhZTt9WY4RNbZjeE5xjRFDEhd4rPmMEUAnFbV8EYsRToPKtNqZiREvoey5inSIEayIfh02S4cRWMAQgeIhhhEpaqLkjfiFEULQNEg5z4QRiobGq+WldxFg/qdrBeVzEWE4GJ0bp24RXo/q5/ZGaRHy2ldMOCVoEb3iC1ElOGcRC2H7fB5JVxGPOjMNQZZWEfLzkiM+mFURSMJy09aJUhGUUdsVkYVREZAmy0ZnVFARigEqXWRWTxFDlT8pgAFOET5wnT99A00RyaWyC5iuTBHEgBAilbBLEb9bbziSskoRd++EBK5dSRFyyuIaq19IESpe9+bHCkcRJTlW/cQMRhEgFLQTwQ5FEdinyd/duUQRyM0VJM8IQxHTs+VP2npCEYK69zg57kERWTo9IjyaPxH1y3sc/Yc+EbG9BRiBoD0R8f7MLiJBPBEdNt0XgLQ7EQYmxBKV6joRMl3V+/RdORHTo732CZQ4Ef/azt9nBzcRKxLfyMZ6NhEUAsbD27A1ET8516w5JDQRKSm/p05aMxFUYNCQrc0yEYCX4XkLQTERaYfIdCB3MBHDMUR2z1gvEWH1XXu6Ii4RxDrSaaHPLRHpCtsQgr4sEVUh1HzYWSsRqaOh6uJlKhEE3xpGemUpEdpaL8724CgRF+6LNmAhJxF00pEsj6AmES66v/wsgnkQ4OwAWLRdABCZaVji/db/D+8Z6X9DU/4PeM3AnVwC/Q/fNrPJoa74D7SsYOWtRfcPgEe3sNG/8w+d/xrkacjyD2NhrEcVn+cPOLPv4PzV3w/OGDtpSSjeD7gVbWgLlN0PQveeZ83/3A/m70OGE2nbD8G1TAW+3NoPnXtWhGlQ2Q95QWADE8TYD1QHaoK+N9MPsmpbt+xp0g+OMGU2l93RD2r2b7VCUdAPRbx5NO3Exg8W9bz5GyHFD6d/exTqmLoPzcF5irznnQ93OnR282ucD3GO0MoYqpsPLm8srgmSmg8MOcV0KtqYD1BjE5LZS5cP3xb34N/ylQ9VMim6xoCUD+/h8j+TB5MPiZG7xWCOkg/08EbIlJyLD3UGTaEIYIoPwoBNoQhgiA+5hP3cCs+CD9b+6Y+0+YEPIIPpj7T5gA8V/OmPtPluD+AwdmacuG0PKmpTvZDubA8OVeXarUJrD/I/d/jKlmoP1ioJFufqaQ+6FZozAz9oD54ALFEgk2cPguu+bj3nZg9m1lCMWjtQD87/vYja7EgPl7NcdJnaNQ82+mOkIYM0D3/z2XH08jMP52Zr1aDJMg9O2v04S6AtD8GpR5uwlCwP6Ko+O8kXKw8zxIH66FsqD1nFeJoB3ykPgMZwOhliKA+mx2faMuUnD8zIX3pLaCYP88lWGmPrJQ8Zy026fG4kDz/MRVqV8SMPZs08+q10Ig+MzjSaxvchD9fndlnlOw4PRLN7zUA6DA9hhHM3BIALD3RTiJedwwoPXsHYxjawCQ9/dbPlWJsID9vIvaq4nAcPOQYqwXDTBg+pgixd0qsFD2Q9rbFyAQQPP+/TjTZpAQ8e/H3krfgAD2ohMoHNUf8Ot2v3MflO/g6P0MCpvVn9DqlWcb4Yp/wORXMlZ+lK+w7mCs8edtj6DlCz0w+Ff/kOBGb4Cujf+A4Cer2TXk71DnKxbvYeyfQOzpv3gd6/8w79KBmR+d3yDuUIDZrDWvEOpvPZi9Hi6A5l1s69793nDv8Wzr3v3eYOpI/Ove/d5A7CejRz1AvaDgurrRgWm9kO4j2tGBab2A4/JEo1/B/XDkQE5w0TS9YOc/vnDRNL1Q5W6Vgf5tPUDq4wtH6Xb9MOvUtSupMx0g4UX2arv2rRDlwU8fPdYs8Oh987iKG3zg5Xvv9qO93NDtHw1CrgeswONcGO4ksvyA59Ee1b11rHDil7GK97NMUORTk9bEDvxA4MK7AWxtnDDtMcIsFLxMEOS2I9bEDvwA7YZrAWxtm/DmVrIsFLxL0OFQEsjOQCvA6wXAg3Qf+7Dku45eGe+7oOYCMVIFEmuQ7bBqo2dwG4DpNatGNOJLcOZFlGx/r6tg5m/sXu9qe1DgtmeHGRzLQOx+D3oBZGsw7t9AsNvi2yDiQiFtF5wLEOEMyGOW/QsA5I0RsVM1uvDrTlGxUzW64OfU7ZDmZqrQ753fcZmrGsDqa3gr3QhKsOO7+ZhdF+qg6BnEytxSipDunHDpHIIKcORk5LfFJVpg6I+t3f/SulDgnbNo+H8KQOdcrI8jPHow7huVpW352iDn357LmKdKEO6eh+HTZLoA6EKBCB4iGfDm79ouSN+J4OgVk0SDnPnQ7DBcar5aWcDtZhWA+QfJsOda7ZDmZqmg5FCPcZmrGZDimOgr3QhJgOFgCZhdF+lw7C1kytxSiWDkzADpHIIJUOfdfZDmZqlA4pNfcZmrGTDgo4gr3QhJIOkNKZhdF+kQ4fHUytxSiQDlAhDpHIII8O2hQVUGXqjg7V4DaPh/CNDuPpyPIzx4wO8vJaVt+diw4xTOy5inSKDkBVfh02S4kOfq4QgeIhiA5XUaLkjfiHDh3INEg5z4YOE4/Gq+WlhQ7ZBVgPkHyEDotVA+6j+oMOUsyVUU/Rgg4YQye1+qeBDg4KuRimfoAO1YBLfFJVfw7KR93f/St+DpG+cEOpAn0OWDUCp1XZfA5N/JQKALB7DgKU8MWggnoOapd9VGH1eQ4u4PwQ3W14Ds7Yr9RH3XcOJPDcTrZNdg6COZvU1hB1DoieanOZ1XQOoXKnQfB+cw5SZPK8eNFyDt8dmlcWOHEOTTlOKFPscA6qsFkuarlvDlmNTxRR824OxgtX+jPnbQ7EzBqesKlsDiUpP+m8eGsOKxVVM4CVag6vgr302cVpDj9TB/+392gOg1tBjgr+Zw6HwjJLq+BmDkuoPA/WXmUO+wH/1x0KZA4j9sPpGddjDp4GXuj+jmIODHnWP5a7YQ5Yaq1WIhpgDkGxtAaAD18OLBQDDNM6Xg7kQfRqhJldDsgZY0OY0FwOqKmtCCpIWw44yJr5DaNaDn4Ld1XdbFkOE/AhLmpNWA7o551Vu+JXDuxmWhbqvlYOYc8bjj5DVQ64nbNh1sBUDrREsAQVIFMOofcKO9FsUg4YfnBKIZtRDmO/HYWJdFAOSHc3UqFETw7/rSxk6BRODqeBkxqeb00Oom+0y0MCTA6IH/OJ+kNLDp5pPEUQgEoOEvtXTDglSQ7ZYm6jgWBIDi83RKUveEcO45lLfb+MRg4GO2WtJrlFDtvIWEZPI0QOOe864agbQw52Dwib0F5CDoYSg05FrUEOi2B/W+gHQA4Cf3FUirs/DsCdKLKmWz4OE7iblrGaPQ6EnPp30Kc8DpkFXUpf2zsO5Og3BUCmOg4sJ9rLmNM5DgrdP/8KNTgO06NI4LjCNw57HbQ2NW02DiG9+i42XjUOgT71FULwNA5ETLUTdREzDgyIqEYiJDIOPhQko0F3MQ4sx1LqClowDjNecmL3Oy8OHEA5jB8/Lg4GqJl5HE8tDr5uRwXoVywOjR4eMh4YKw4DIf6EpcUqDhfAjfKYuSkOC0fSMzxJKA6iHMMEH8MnDrB3frlq6yYOer0HPytCJQ5Aa7qcXGwkDtHNqwOXaiMO7wub5DX/Ig5f1ymN9rkhDpKp34IWrCAOaDKN8pi5Hw4A4NIzPEkeDsmGDU7MGx0OIc/O7oXMHA6gDvmflLcbDpdZBLTiKxoOLh7hvP2DGQ6HEJiCO+8YDnZQJrZbzBcO8kZsZfzjFg7wT4sLzbwVDtJaHdvIgRQOw4Yq2r9/Ew6h4gSEGlUSDoAyEwn8jBEOWIe/s6iZEA5EXRF+XigPDsNCxBj0MQ4OEA5Yf5MPDQ7YbENMNRIMDmo22XjZcQsOZRTTE7kRCg6WOcx9Ws4JDiBCc78llQgOqqbnRmhwBw5SH4sMRGIGDhy+98hf9QUOE68ERtHkBA5pZ2K9Kb0CDj3jBniDlgEObYaF7puqAA4UZizCve7/DeOtbffvBf4Nlob9AQll/Q1gARlNJb/8DSVmGU0lv/sNILPwTJfo+g3E/vBMl+j5DYWgMQj0F/gNUTCg4uwo9w2Rh61AGn32DXzKUkKsJvUNV2zVFycT9A06gA39il7zDXQqiWG/4/INPk1e6P6O8Q3zdWNDmNDwDdx6tAaAD+8Npqde6P6O7g0nE2NDmNDtDeAp0/07SewN0nAqZkW76w2u2GafpnPqDYNqUJfD1OkNUqBLX7V16A0nMbQGgA/nDQFhxt+5MOYN+6rMyB0S5Q0rsGwEpW3kDaLCZ/s8yOMN+uES6adA4g1KmbKfKdDhDbrC7FosouANBfepIT2S3w3oUEJEz+DeDbMq+dHWxN0NyZ4r3LJB3A1hXfXefYHbDYorKqnYT9oNxgjSe5N32Q03GD/ydjrYDcbDglXindcNRyn21sTA1g2BqV8cp+7VDTTiiG30idQNeRCkyKGN0w2imPes6M7SDSUoMw7C0NENcFoOn3Dr0A3IB3Z905LPDcyUriPevc4NG/cBVG+vzQ3nJ/XyZlDMDceli/JH+ssN3Rz3CZLMyg1RKM3XP2TJDcM2Eal9PMgNtvHr9Gawxw1BqTWDCn7GDW7NtBdOacUNdYSpDegQxA0D3OTfHDPDDfKhwiYjkcIN3qmH0G/fwQ3e2QYUjZ7ADRLMzUGg0L8NOqMdh9bVvg0ycSjGZEi9DVNUQVPlI7wNmGPjSHsuuw31O6uReea6DVog9da7MrkNzQXY7VqhuA2xB5I5ffq3DeXUsYNzRbYNrtEZtI3KtQ1lFFDlYoG0DRgVsDAYR7MN0ArzyrgXsg3OwUfpOrqxDby2uyyXQrANrMD+8wiNrw1b93Zy1eSuDZm7kXHHZa0Ni2xG2V04rA3uaKtr4wCrDadpxHmsoqoNMqkAYQfRqQ0nRFf24ROoDcnGa83ajKcNeU5n7Ccnpg3xr8h9MkqlDbhc93k0saQNwvRtJdWxow2mpHPjZ3eiDUZY9EktvKENu/dPyuE0oA0NhZ9Y3MCfDaF2pDVpo54NspkcbFcxnQ0t8Pg/4KucDUhW777cZpsNJVM36vZmmg2lTZ3ixd6ZDddCa/1ey5gNZADRNel+lw2VoMRXSQWWDTiHFqTIgJUNDWRTGv8ClA0htoZA9QWTDWkwhasF/pINgVrrnQfekQ3J1OsIF9aQDeH+UfsZto8N+ii37RyWjg1Bo7ZYLI6NDVrNHEsubowNuQ/t8LvZiw0agLfk3WSKDQxy3i/NB4kNBV7lMaaTiA1Ja7KfKdCHDaUBsp8p0IYNHyYuLVc2hQ0kC4znK1OEDZ8CrKjvW4MNf7fzifpDgg0Qf1dMOCWBDZIl7FosooANjp9CRM/gfw3DNPOJ+kN9Dayg/kaSnnwND6bsWiyiew3/4UJEz+B6DQTinnNY13kNtCQw1wSueA14UkTraxt3DXcf0hiB0nYNIR1lrSa5dQ0CDA1OzBt0DXWG9wmSzHMNbQ0RqX08cg2fdKQ1aaNxDVEJ+D/gq3ANK31KxK0Lbw34A//Ro5VuDTuFZa0muW0NSKENTswbbA0FW/cJksxrDbpWEal9PGoNQxKkNWmjaQ3eX/g/4KtoDSIYjfKYuWcNsxr5n5S3Zg3hRCa2W8xlDSy24bz9g2QNkJz21sTAYw3pxIht9IliDdm+96zozmENbIoOn3DrYA2/I43ymLlfDYbq+Z+Ut14N17UmtlvMXQ3wvuG8/YNcDa2i9tbEwFsNMxiIbfSJWg3o0fes6M5ZDaszDp9w61gN0gKeOeqWVw0MIOlsHKFWDYEd8+HF71UNL8H+tFhrVA1iEltmXS5TDQL4y9W1ZlINuxcwzD+CUQ2Y2Qbjr+dQDV9DVrDVW08NnCR5muHOTg2X0QFVEMJNDZwr9UZWo0wNzApyYvc7Sw16L3b2tEdKDRchK7v9JEkNzNd29rRHSA2nBiu7/SRHDTNMoVLcy0YN8ozhpp1rRQ15puGmnWtEDYRbXUqnQUMNI6zH37IVQg2FnrRTpC1BDRNMkzoy5UANXpgMzMHKPw2q5IVdULA+DdkKyqODXz0NsdtqTXXaPA1DBSYYx+k7DWERCguKTToNxLFVebGJOQ3Di64PghM4DUFjXyOx2jcNMI6D2ZRlNg2xWlCYm0A1DT4HKRxYBjQNtzXF20OTMw1IaPJYtikyDa2mD7QMSTENxDJxxDRiMA30PraF1xEvDRK/qHLali4NpC5jp7wLLQ0LOfDFoIIsDTLcfVRh9SsN7LxHbN3kKg0oa6i4uDApDYwXEi8o9CgNnyTBbp4jJw06pNWrxqUlDWLJOuGoGyQNwUoIm9BeIw0z0oNORa0iDTPHf1voByENyvxEpS94IA1sLUt9v4weDTZxOYwfPxsNyLj4gv08Gg1CqoirbP0ZDTq9iKts/RgNt0NQYBJaFw2cj/dB0SQWDYIfFk4U8xQNKEt6segGEw1b9nqx6AYSDZniqveWSxENmjP88f1+EA1pJYiAvvEPDUOWGuRpyA4N2YkqnsNvDQ3O0kMRAPQMDVGk5N0xoQsN1XWFqmJOCg3/k7fk3WQJDSSyUvdnjAgNNIGACXvABw1tWBNkPDIGDQ0XIFoq6AUNrq6Eof9TBA17VEHTWMYDDUA9i3S4PQINBf8sZ/5qAQ3K53YIXuIADfcgz1FBq/8MviRbYSBO/gzmRt4fzJ/9DN9Jm5QpvfwM10xYCYba+wzQTxZ+4vf6DMhS0/I/FfkM8HRWsetm+AzpdxQmSIT3DOF60ZqlofYM2X2PDwK/9Qw09FgJhtr0DL1XFn7i9/EMM2cYnRun8AxA03PNRHPvDDJ1n1jcwO4MDhqfWNzA7QxJKJDsyLfsDB9M2SHruOsMcCBcHn656gxC57+c9n3pDLpl/oGHYegM85GrL2Pk5wzOU4EQsxLmDOZvUf4CE+UMgWzGXavV5Aw7i+FqJwbjDEK648ThWuIMtndqEbKT4QzKGfBdgszgDD7Xd6pTBd4M5h2N7knc3QzNTUBHxEjcDAryZ/9WBNsMwVxjaaoP2gxXY3rBlvzZDGdrQzm6c9gMMZYs4c6G1wwM4bOApHHWDKbU3/7mg9UMH8DqKlz61AyEqfVW03DTDLuU5pSwBdIM/ZfxwCd80QxRm/3snfLQDIg4xWTAabsMHFI16mVjugyLwaQ2YOu5DNBPEoNbczB/emSTwCTnuAz15oDPVfsvfyWG+EC5tC5/BJ9x0m4yLX/it+pjI7AsfyHsY/XZLSt//wTcho6rKn8+OVUYQykpfxxSzqn5pih/+mpGO64kJ385n7/MY6Imfxe4OF4ZILcMXQE6nW88JX/D2Z3ere0kf6HyFnBiayN/MHaPARjpIn8HDAiTzWYhf32GgSSC5CB/VBz6tTdiH3/KlnJH7d8ef0AR69iiXR1/F6dkalfbHH+NId37DVm2DGBOTzU5+xt/RqZCfKEmGn+9ILsNVqQZfzObNJ8MIhh/CjGtMMGfF3+AqybCdh0Wf1ZBnlMsmxV/zbsX5eEYFH/295B2lpYTf18+CQhLFBJ/YKeCmQGStQxHjr2BNIMRf1Bg5xmVXxB/AF1gq0rdD3/X4Nk8AFsOf01JUc612A1/JM3KX2pWDH+aNUPxINQLf3C5vILVUQp/Rz01FIrPCX+9pa6lQE0If5QpJzf1yrQMqpMszi4LB392f4y3iZgGf00DBUk/FgV/JId92vSTBH+a7/ZrqREDf3Fzb/1ejwJ/59vojhQNAX8MD2EgyYoAf33B2rF+CP9+jlhTQzSG/n4AC8zU6QOzDJLTmhopk/1+boBjckgi/H7fMtwD/Z/7flHlVZWzHfp+YnzOJmib+X7TLke4HRn4fuTFwEnTlvd+VXg524gU9n7HKrJsPZL1ftfBK/7yD7IMyyjatsrTsQyOXE2qtrqwDC+AgZWlia8M1Rak/K95zH56ZsVPtIyuDOM+NrC18ct+jkWoKUDeyn5LZKcQgJDJfgiDpffBQsh+llGk3gH1x35TcKPFQqfGfuE+oayCWcV+nl2gk8MLxH5bfJ96A77DfuhKnmFEcMJ+pWmcSIQirQyqeCEY6zLBfrlIfyIQdMB+dmd+CVEmv36T5X3wkdi+flpXe9fSir1+Txl6vhI9vH4Vi3mlU++7fgpNd4yTobp+AA92c9RTuX7GgHVaFAa4frtCc0FVuKwM64xvsVfUt36mKFYb4Qm2fpzqVQIhvLV+kaxU6WJutH5XHlLQoiCzfkzgUbfj0rJ+E1JQniOFsX4IFE6FZDewfkShTWyk6a9+d71MU+Wbrn4EmEo6JU6rDG6oAWVcTK1++QYtFLGfrH5ILiz78lGrfrA1K+IyBKp+SI0pyXO2qX6wlCiws2iofkfsJ5f0Gqd+sPMmfjTNpn4Y+yRldX+lfq9SI0y1MaR+F1oiM/bjqgykbJIYYcSjfjXCBQ2BNaJ+nckD9MLnoX4F0QLbA5qgfp0oAcJDTJ9+BTD/qIT+nn6ch/6PxLCdftlo/XYFY5x+bqz7XUUVm34zQPpEhseafsmD+SvGeakMvHgVgav3mX7rF6XUxq2YfoFbpLsGYJd+Fp+jokcSln7bMqGJh8SVfnB2oHDIdpR+NQqfVwkpk37LTZ0+SduSfmCRnCWKjZF+JSWbDMo/qAzJZ+t3QQ+nDKp1wm7YJqYMcHbyGaAHpQxShMgQNx9oflzQgzmJLaQME5ueB842Z36BVq/FgxJmfsK5VGN3S2V+Ax35AGuEZH6km56eX71jfuX+QzxT9mJ+h33o2UgvYX7I4Ix3PGhgfglEMRUwoV9+qsLWsiTaXn7rJXtQGBOjDCCKdf5kTl1+EKyn3BL4XH5RD0x6BjFbfvdH8Rf6aVp+G32Wte6iWX7fljtT4ttYfgPM4PDXFFd+x+WFjstNVn6L/yosv4ZVfq80z8mzv1R+c05zZ6f4ogypCEVtlbpTftWDn/Oh3VJ+mZ1EkZUWUX5ct+kuiU9QfoDsjsx9iE9+RAYzanHBTn5oO9gHZvpNfixVfaVaM0x+y/kiQ05sS37B8sfgQqVKfqgebH423qEMMdV1GF2bSX5CiJgKMMNIfpR9Pagk/Ed+zUviRRg1Rn6m/objDG5Fft/MK4EAp0R+uH/QHvXfQ37xTXW86RhCfiscGlrdUUF+A8+/99GKQH49nWSVxcOgDNSuTA/0sj9+mVeQIb+oPn7SJTW/s+E9fgz02lynGjx+5KZ/+ptTO34edSSYkIw6fvcnyTWExTl+50Zt03j+OH5K+xJxbDc3fkyUtw5gcDZ+r0hcrFSpnwzRyiIGi8o1fgBRssHcVjR+YwVXX9CPM37Gufz8xMgyfslSoZq4ATF+LAdFOKw6MH4uoOrVoHMvfpFUj3OUrC5+9Ag0EYjlLX73odmufB6eDJcn+Pwh4p0MOgHP87j5nAzCzf+egNqbDDrt91hO4QR+fCGGkOg5mgwT5xrZqZEDfsxJA/PSGQJ+3eva66OvAX7ujbHkc0UAftDfiN1E2/994YFf1hRx/n3D0zbP5Qb9fdR1Dsi1nPx95RflwIYy+33Haby5Vsj6fdgLk7InXpkMHUo3I4E1+X0oNA8VET74fTnW5w3h0/d9lLO+BrJp9n0TGZX/gv/1fcDObPhTlfR9PzRD8SMr833t6Rrq9MDyfZqf8eLEVvF9GQXI25Xs8H3Gup/UZYKYDPtghJP1De99i5IcN09i7n04SPMvIPjtfeb9yijwjex9ZGOhIcEj630SGXkakbnqfZF+UBNiT+l9PjQnDDLl6H0aaP4EA3vnfYX31f3TEOZ9Y5Os9qSmlwxfwq2cXvblfTH0KVmOhuR9b2sAUl4c430r9tdKL7LifRfRrkP/R+F901uFPNDd4H2/Nlw1oHPffXvBMy5xCd59OEwKJ0Gf3X0jJ+IfEjXcfeCxuRjiypYMtE998ZYV2305YzV7zKraffbtDHSdQNl9snjjbG3W2H2dU7tlPmzXfVrekl4OAtZ9RblpV9+X1X2JU0BQry3UfVF+F0mAw9N9R/nuQVBZ0n0PJMU6Ie+VDAkGQQGEU9F9ufqwpxY70H2AJYeg5tDPfUdQXpm3Zs59Pss1kof8zX0F9gyLWJLMffxw44MoKMt9w5u7fPm9yn2KxpJ1yVPJfYFBaW6Z6ZQMpYo+lvgvx30tgcKPzczGfT/V30PeX8V9P48qfIumxH3oPPexjc7DfZDqxOeP9sJ9aOgplp42wX0QlvbLoF7AfblDwwGihr992NiuAofwvn1Qv/etaWmTDIeYFI2PR719Taxgo4WYvH2okcmYoce7fQR3Mo699rp9fV17OZ9vuX3ZQuQuu564fTUoTSTXzbd9rQ6Wz7lGtn1sEIzW2sa1fRW+WQzc7pIMTZlEOFcokQwvpxov7j+nfVWt8Dk7mqZ9dh8FBldFpX3Z2GMcVEekffpKeOhv8qF9IqRy09aJkAzwvfElhVeefXcF/BDdbZ19E1mv1EfdnH0k0txOtk2bfVa8m9TWEJp9imXyvHjRmX2FKU8UUfOYfYaWTihT7Jd9HtFX+jPnln31JxqesKmPDP2sxxwbb5V9brBVM4CVlH21gwf/t/eTfQFlMkur4JJ94g3/1x0KkX1FzcPpGdeQfY+QrVYiGo9904Ca+Q2jjn27zPRqhJmNfd3ZWhbqvox90h0hLmpNjgx/4C8sehaLfd3NLGToFIp9V/WzYdbAiX01TAo70WyIfUqftMtDAod9GYM8RRCAhn3vI26jgWCFfbhgS32/jIJ9GeVYRk8jjQwGrV/XQveBfXJUCJvQXoB95sZ/W+gHf320Ryiyplt+fWLN+nfQp319FQw//wo1fH1ByLQ2NW17feVw+i42Xnp9a5b1FULweX0kOqhGIiR4fT08UuoKWowMqoY2ztkOd30q3zmMHz92fbBD/oSlxXV94/xHBehXdH2O+H65autzfTPd0jM8SXJ9yz+6nFxscX2BzN+CFqxwfY08m+Q1/299kPXSMzxJbn1CUM7uhcyLDKeiDMVwJm19q1EEtOIrbH2d82xl/ONrfUEEmII772h9W26LC828ZH2mnSrav3+KDG3/4rsGPmN928ZoF137Yn1LW/TiKjeJDMD6rKhDRlZ9YJ+jEhPGVX1CN8h4ZOtUfSXP7t62EFN9I2gdEEE7Un27dngvXlJRffhndOT9IogM2IPWsawuhwzUmdUv7vJDfTHBCCKXYUJ9noDvHKyXQX1NhwAGCwtAfblG6AAgQYYMKUeY4mcIOn190zB7vV85fY8a8naEUDh9acRAhmlON33zCII8HS02fdFMHpMMRTV9Fxhm0gM6NH3CbQQK33MzfYNOzF0PiDJ9DtyGNdwOhQxhx8Lr0PAxfb2MTJSyQDB9B4m+1SIHL33w3adCWg4ufUWsTmyXES19oAgFAiTeLH27MFqwlVYrfR2QFyEBVip9IZLWEdkUKX0QOqWaRV4ofd32iZ7//YQMelDs9DnZJ30vOC25xLgmffW72SV0OyV9MuTi8Lw9I32VxdVl+poifViXgHHfYyF9wlXZu1STH30GCTJ3pRAefUvp0L5r6IMMWbX0bXYvHH0y46iiz5YbfSBu+zHHCBp9qQ2/3KGIGX1MFdeDKOwYfWANUBEqBRd9dNw+H/IJFn0wrLglH7UVfTg0jevypBR9VRVQpjKUggxPLm3/BRUTfamzAaAwAxF92fxSzHBOEH3zTIIu8K4PfWSLT7Z15A59ufJKIcp6DX15DL3XslMMfcS/JDFGjAt9inDySvDoCn30WsCcl6yBDHX35pCU+gl9ugiNIg9YCH15ay4MNmcHfUWUDGI8sAZ9UQjW0T8sBX0Lgnqp8FUDfcB54Is3ygJ91W5JsPXkAX1pyIpFjFkAfZnYOlC6NIAMdGn5A/GI/3ys2GtPe6D+fB/0nU49DP18kg/OTf93/HykDwBNwOP7fBcrMUyCT/p8aIhzOiSS+Xzbo6Q55v34fE6/1jinafd8odaGOW/Q9nypexidG6d/DJOgXyIj4PV8g9CqAMd99HxZ4DaPh/DzfDI1yPIzx/J8C4paVt+d8XxvxTpQujTwfMiba097oO98go2dTj0M7nw8f85N/3ftfJVVAE3A4+x8TkcxTIJPfgw/TSgJgajrfLQOczokkup8bgCkOeb96Xwo8tY4p2nofDVNhjlv0Od88qUYnRun5nx/rqoAx33lfNIvNo+H8OR8YDjI8jPH43ztQFpW353ifKqZ7LmKdH0MXvHK1bJV4Xw4on4dNkvgfPX6EIHiId98EYSi5I343nwt6zRIOc/dfHeixqvlpXwMfJVrouMCewxR76xTl0p6DF0mTiDI93kMe8rv7PmkeAyabpC5KlJ3DLgSMoZb/518dw5CTTdydgzVpPAdMA51DNl/iIC+8XQMRG4a5GnIcwyMEqxHFZ9yDAQHPqvBdXEMTKvQDmxMcAzDn2JyGCNffGf/MsigwV58Ad8bhhDObwwLRPTVxPluDFPohjlv0G0MytwYnRunbAwSgaoAx31rDGxkNo+H8GoMtAjI8jPHaQzJgTluMJtoDNBsqZpwg2cMWKA5JHjZZgzctUBjmWhkDBc/rw7mQGMM/rZ4nmJgYgwvTamdJMxhDF/j25zlN2AMWJR9d4niXwzkk0FW66leDAA2gWaG8F0MLEKk6zF7XAyxefFYavpbDNwk0nbqb1oMqNneA6LAWQxiFt4DosBwe7xSJaQzLFgMZCTsuYp0VwylqH4dNktWDBR9EIHiIVUMGrZYD5B8VAzhlQPuo/pTDKf3lVFP0VIMblkntfqnUQwm0UP8iiIpe67ULJL2vyh7bcCKTMrcUAyMyAPfshJNDKZgvIVQGUwMDdSNvtRx7Xps7CLsdG/semfkEdKthut625nfSADq6nqfgs4uOQFGDJ1RR9qQZ0UMkhDAsk+DRAxTLf3Z1PlCDARlW6jnAEEM2q4s4b75QAwzBxvDOlw/DAhR7PsSVT4M3pq8NOlNPQyz5I1twEY8DIkuXqaXPzsMXngv3244RHpjHXe2e246DDTC/xdFMTp6V2zKF76TOQwKDNBQHCo5ep+Ja+PT3Dh6JJgosOE7N3q3UoZg7MA2epxE+m6b3DV6w4eZoETYNHpWuDfS7dMzeiY3CKIUjDJ6KaOdh6GOMXpti0O0A6M4DN9VoYnzIjcMtZ9xwsobNgwO+GGkR34bejpK3gkeWhp6o0RmU50RGXoMR+6cHMkYeh8/ggIp5Rd6U+oM1eAVFno+sZanl0YVerIjuDOO8RR6D3BoFWCVE3o7Pusi6rM1DCpPkTZqUzQMTQngtdafMwxxwy81Q+wyDEszO20hWzEMbu2K7I6nMAy1eCUSa/YvDM/qutsQ9C4MnCk7vOK2w3mNW2WI4trCeVa/1zJ2OS0M1hS4rvEPLAw22QjNExuyeQrLwa93risM+xNX6zUmKgzSUNTdRH8pDIRGtKRKLJF59iYqfDczKAzEQANsgjInDE8CaTv2HyYMu4jSRFybJQyW3MuRyjMkDOUc87WW3CMMV1t65c4QIgysspSNk000eeNkfbaMIx4M6QHokrFJHQy5S8XiD1AcDCdlV0a7JhsMxs7pqWf9GgxkOHsNEtQZDNNRDXG+qhgMeQNtWR7NFwzbPRL3cJkWDGzIt5TCZRUM/lJcMhMyFAxgjQDQZf4TDEmpKqnYTxIMHfTSe5N3EQyGZCqp2E8QDDqk0nuTdw8MjNrY7VqhDgwxF9jtWqENDKIOHYWJdAwMBKlwSiGbCwzCtB2FiXQKDBYncEohmwkMrtqkC8FiCAzmOcwsZYpIeKPIh5Zj6Ed46hvQYkDIBwxRbYsMRGIGDOvBiwxEYgUMFZ5n+zzIAwz8tRLpp0ACDFcGZ/s8yAx4oSnA9yEPC3gz4LQWny4KeDZ+qDUdTgl4/yyb3vYCAAzBgRLpp0D/C1mhanOZ1f4LuNZqc5nV/QtQ7Go+llb8C48tFxaivPoLE3QEPNAv+Qvl8xtIHwv4C6RQravL4fcLGf1SgrZU9gtD9K4KtkL1C1JCTQ9HbfQL9uzxhtI/8wvRa7b+xbzyCwJQod5t2vELc+SB5YuE8At2QnAe6YjvC8IcJpwzeO4LPkfbGX5nHncO8DyVkbodd7jXITYubRx3bxS+adFoG3cWYpLUo9npC4CT/ThLoOgLq3CPnPd25wsEniIAo03mCy97tGNOJOULiKhGx/r65AsJutgqptHjC3ryao5RqOILsW788f1+4QtFGIiAvvHgC55HGuRpyN0LjIHH4KhP3AtjF9MC6QHbC2up5q4bDYR2GtpRAtNL2gvG+TeiGJqDdqT6gbgZC9kLwL4vUeQV2AuB3ZziO9nXC5JSJuQO1dYLA3ZFBKYD1QtJGwqn1ZLUC+2B+KGiI9MLUdRb5HrL0gshTAt2QbDRC+hP0BhwP9ALvyKq6U91zwtAIx9GMTfOC0aNAva+SM0LchyvSff9+HX5RQfyXErMCwg5jXr2wMsLJwAB19iCygtvDfCHHynjdYJPm6NxZuJ1FgSk4+qv4XWXQMIUKZngdVmOPRbLPN91mBYB7r+23nUXZaM3cHDddciT7Xyg2dx1RrXWX+RI23UTCb9CJ7jadZu9qtaYn8kLaGx9b30h2XVI3PCTmHHYdfJCyCuii9d1adZ4Rg951nW9OtGKtAHVdXFQS4S05dR1kHQaLkWk03VGrG4bsvfSdWtIFU6gptF1+xct3CvyyAso1858Cp3HCy+6bhbbwMYL8CS/I2g8xQvog0wLxjTEC6nunRhUsMMLbFzLhAYbwgtnFdIiPMnBC+2oPS+LBcALM0Us+dAnvwtu9a/ZEfC+C0tERsf6+r0LjmxD/IoivAv/L8jRQjO7C6gaejIP6LoLA/JPR5fcuQuiNA3yx0+4C493j+k0tLcLxPA096/otgu+AOH3pt21C90jKr+7N7QL96U42M8KswvkM4gPF0CyC4KdXUpf27ELnbk3BUCmsAvAOV1KX9uvCxzfNwVAps90cvr1NRnhzXTdCWzjX3OsCyGcAYQSibF0bJzeMKO4sHTRty+v4cyvdLMwCw+gjqsLWkG5hVITmnS10ErVKIaZdO45i8PSqaULHmYOWSp0pAtouWt4LGKiCy1jmaQ3iaELUY2bTn3foAuo4b5r9XCfC2NeNH6hNit0OXBYXHXjKnR6olkUJPKdC9WR2c+ddJwLx6OGOW/Qmwt8P+Tnui0GdOaOkHiEiQV0dnq/owAAmgshqscTSYqZCwFRQqmtCpgLSc2uI969lwvhYPXyZlCWC7KariPevZUL4rD18mZQlAv2isDjI6CSC4CgGJ0bp5ELwCSqAMd9kAt0RzaPh/CPC7TLyPIzx44L9U9aVt+djQuZQKLkjfiMC1+iNEg5z4sLVFTGq+WligvKT+O4w5OJC+T7FUyDZIgLDET3rWlphwvCsGCjhZiGC+7CyZihx4ULGdUyjr32hAth6Hs5n2+DC4365C67noILuAxNJNfNgQsAIJbPuUZ/C4YGerzTY34LUaouiWWifQvnHFVCU558CwiX/BxYmnsLKhGj912WyXKLD7JRtyvHcvnCjXRhq8VyZ3ZolwsregsXyCyrMTfDctoFPSgxZ8FySLkYS9vmv3K2bPNthWa9ciQgzpAv5rtyktOps9lleQso0sPkCV94C0lMar8OW3cLa8YRmhNXlXIH5Dxze0h1C6XLAr85U3QLka3FRas9cwsvNLF6E3lyC43lp0HwfnELeIlZLmq5cAtZYppXFjhvCz8oP+m8eG4LDpS99NnFbQsxwkGOCv5sCwqjPA/WXmsLwzTWP5a7JXKbmX6TXMEkcrgPBbMsV2oLCz2tCCpIaQvu0AMM0zpoC2jLnVW74gtyDXzajEVwCnJT4F7l19MJcvlf4j1pNwhyn99mlvuaB3LlQ+rujf4GcovDbkcfYmcL8Fp3Vd1sBXJDvcriq/AEcuk8Tjs9VANykLzSk8+3ZgumQzdSoUT0cYQs3uGj//NxUpttxy1F8nHwufyst4plC87SG44+Q/FxvCBHZ5uE8HFbP9ZMJspkC+8QsAQVIGML4vqTGp5vYgut5XFUirthC+r2m5axmmAL3fTay5jTXws8BkjguMKtcdStTuV7614LBni1E3URXQuzyySjQXdcC7GRHjIeGFsL04WZeRxPWgtw2MMEH8NZC4xqjfKYuVgLnscHPytCVwuTgimN9rlWC5I9qwOXalULlLUd28iBVAvx1xF+Xig/ccjCGVpiW1MLdGVYf5MPUguAJHO/JZVRC4ReYr0pvVALViH3yF/1TwswEyzCve5OC/E0BniDlk0Lw0P9AQllTAuaPyvcskFLCzWWP/J2OkgLFBc1gwp+RwtLs8ImI5FGC3haqQ3oEEUL+L0GFI2eRAubXR2H1tVDC/Duq5F55kILV9pBU+UjQQu+YZI5ffpAC+2rGbSNyj8LO+OwMBhHPguw3UfpOro9C8IdkXHHZTwLh7D+8wiNOwsDfqtr4wA6C+3JAGEH0TkL25drzdqMOAs7Rch9Mko3C/OybSXVsTYLmhf0SS28NQuX3Tfq9mY0C9zkxFdJBTMLKuhr/V7LMgvcknLT1okxC+eK/BDdbTAL0iOv1EfdLwube9xOtk0uC49em9TWEC0LHX7yvHjRuG96AfACCTgsCxgJTxRR8ysLWCZOKFPsKgsEV1f6M+cpC98PGp6wqSgL5YtVM4CVJwurIAf/t/cmC8bCMkur4CULNOz/1x0KJAuYncPpGdcjC8o+rVYiGiILBmGa+Q2jIQu0z/RqhJkgC81QWhbqvh8LJBUhLmpNHgvo8Cxk6BQdCw1Ms2HWwBwLfr8KO9FsEG9yWrfldlwPb080LKJXBw5vTOarowIpGwu/eLTLQwINbwtDuS+82wxv5FsaI5lrC2+9dHoWdfsKb4VGos8+hQlvXl8CwxoVCG8mMSp84p4Hb/9Jim+/LgZv2GLrYpy+BW+gNBIcZEgEb3lNcw9B2BoLWYY8RRCAA284qoGb+ooCbxHD4o7XGgFvTp0hE832AG+nH0jMloD/bhLpqb9yEP5ua2vQeDqa/W7VNDFsFyr8bkD+kV/0uftumIC4GLxD+m4DShkMmdMZC9VnbqOBYPlu/8orsB2s+G5WBO7wJGf3bq09sDEqIvZuA54mw1En9W5a1+gDWOL0brE3XpV+5xgLLlRYRk8jFwsdpSiyplsWC74t+nfQpxULCrc//wo1FAtP1bQ2NW3GbmhOqZ0kzMVuJC3bnOU3xG5AJwycp6PDbvwFPptoD8JuGABvmip7wW7U3qGZ7ObAbpC90pitUr9urLcEmG++vm5oljWXMCoTC+l2+i42Xr1uG7l3hdNsvG5NEaiElNgSC0Iw9RVC8BELmY2oRiIkEAsUqVLqCloPCwAb/oSlxQ4LSGZHBehXDQuQcn65ausMC5s20jM8SQsLxEC6nFxsCgv6s9+CFqwJCwPam+Q1/wgLrw7SMzxJSG58jff2D+QHCyfRzu6FzAYL8iAEtOIrBQukD2xl/OMEC52JmII77yFuhJJg95GGIG6v6dxgQaYfbhUepjnPSAMLwBSLC828AguaRSrav38BCx+BBIQaVQALOGO/s6iZ/wrT4xMJ/Iz+ChNAxBj0Mf0KE3VDTDUS/Apemtl42XH7CjGYzH1azvoK8U3TE7kR+Qpj++dGaHD4CpCs5hIbAPcKXvAERtHk9grCjm337wX1Cs1Fhe6bqvQK85nG37kw8wqUs8zIHRLyCpxGbASlbfEKdWipIT2S8AqwQvnR1sTvCoAJ9d59ge4K7/6CVeKd7QqCol8cp+7sCuOFpMihjesKc6kzDsLQ6gr6S3Z905LpCgPXAVRvr+gKcACL8kf65woJZc3XP2TmCm3x6/RmsOUKYYG0F05p5Aq5z4fQb9/jCn4D5N8cM+IK7Z7hdWDX4QqLFsrZtIPgChWCvSBwJd8KZcSHw+q03gq1CF5kywfdCvEZzUGg0NwKdBkoxmRI2wrC6fXWuzLaCgJN40h7LtkK3raxg3NF2ApBYlDlYoHXCgif88q4F9YKkmq7LJdC1QpWvEbZXTjUCqLvdnLV5NMKZj/Eeayi0gpwzVf24RPRCpk1Z+wnJ9AKbE73eTSxzwp633PjZ3fOCtedT8rhNM0K/XQcbFcxzApbdO++3GbLCt0/neLF3soKZl8WpMiAyQpGz9E16X7ICgXF3i/NB8cKSmTlMaaTxgr8xns4aGe2a0nsVjRLZrVrGP3w4dcItGsP+84HATeza2TmeXJMaMUK+a3qfQO5rGt4xKvLxx+ra4VO47/JWKprFkrESJF6qWtFBg+aKHPECtiKmEY2g8MKuGdGD2lNwgrWUMJ+NQTBCnf3UzmbssAKTCylcGjovwogYfenNB5sayZKJT9bOL4KwgeJYprMZWtrBsXa/ou9CpY825lmArwKanEt0TM4uwoMGL6Lmea6CuBMEMNlHLkKtIFi+jJSuAqItrQx/4e3CipdRexkNiVrvlcmG8adtgr+kZcjMWy1CtPG6lr+obQKdG17FWNQBmuaB3KzW6wFa6RZxcczSQRrPTeWb+AgA2vt8Zpr/fwCa1IXeYh+wAFrjYclqittAGuiDgRhDRv/anKjULPmJrMKSaLNTDCGsgod1x+E/buxCq0p68GNVrAKFXAD8wx2rwq/fbA+YmquCpOyAnYvoK0KZ+dUrfzVrAo7HKbkyAurCt3COJ8uuqoKsfeK1vvvnGoJGCwZ5Fybau23hgIOKqkKhSzcDcclqAon023ILdSnCvsHv//6CXxqZuw+1OMRpgrPPBE3xj97aiHgloYwQ3pqResPgz8LpQqIzr+8z0+kCqz7EvSchWBqP4uUXkWzX2rDI8f2wTteao/3GaE8VKMK0ShkK2m7XWpSkjrn6chcaq6EQE8GP1tqaWhKrB0OWmpvhNh5iyhZatFoRL5Ga1hqPzR4XJrZV2ptaeN5Vf9Waonl8aDhY1VqkMvna+neVGqKmSHuriCiCvVVtmI18VNq+q6Fe26IUmrBpML7LDFRagJMcCWC2FBqJlwa/9XtT2r6dy8AT9tOaot8VlwEbU1q9cT2uTFfTGqXz+2YImlLalSRZ3DSPEpqCPvDPPEOoQoYv0cdm59Jak/aQtCB5Ehqb8M526FZR2o4mgQpf+ZGalpK/5VAiUVqdco7ovd7oAo87JlUaNWfCmAZ64s0C54Kg4J8Rpq5nQqor859Z++cCszcILUzJZsK70Wyb5nTmgoTcwSnZgmZCjegVt4yP/Bpbh4EdPadmApczagV/3SXCn42OdBlI5YKo2OLBzFZlQrHkN0+/o6UCur5bvlkPZMKDifBMDBzkgoyVBNo/aiRClW9pCJjV6Bp732FFuBCkAp66vZZL42faQlg4LGYX48KnhdIkfzCjgrCRJrIyfiNCuWtK4Mup4wKCdt9uvvcdmmkIQSEGlV1aakXv7OomXRpvg8TCfyMc2keacQY9DFyae4zQ0w1EnFpex7ZeNlxcGkxC8x9Ws5vaZGG0xO5EW5pmUvnRmhwiwouCNDxyBJtaVbx5hIbAGxpzyAERtHka2lBwW337wVqaXMMhe6bqmlpPPfG37kwaGlwEszIHRJnaWuZbASlbWZpfLapIT2SZWlH/vnR1sRkaS9d9d59gYoKKaU/002+Yml5618cp+5haddBpMihjWBpsoQzDsLQX2nXLXZ905JeaVDWAVRvr11pynCL8kf6XGmWC83XP2RbaS/Q6/RmsFppOUy0F05piQqJHXQ43hNZaYMuh9Bv31hpxCzk3xwzV2nxnc1BoNBWaay6KMZkSFVpuwjhdWDXVGnMvcrZtINTaWa4vSBwJVJp4MOHw+q0UWkM815kywdQaYdP9da7MogK+9z1TE4fT2k8quNIey5OaZt3sYNzRU1prExQ5WKBTGl7W/PKuBdLaRoWuyyXQkppmIdG2V04SWnLxnZy1eRIaRH7HGxXMUdpNc7vvtxmRmkeLJ3ixd6HCmycdmG+KkVpxtwWpMiARGlPp9E16X5CaefQxHmsokFp0EFX9uETQGnTdWfsJyc/aam993k0sT5pg7xz42d3PWkzZE/K4TQ8aZZNUxr/AjtpireGQPUFOmkC8IWrBf45aUrY650H3jhpwhDrCBfWN2kK+VH7GbY2aVPht+0cljVpyxm2WCyONGkTAhxLLm4zaeK07fC72TJpXGHeL80HhQoUybp6fB0xaYuD5TGmkytpq3z01cT5Kmlx3oY5b9ApaWaQGJ0bpyhpLPKqAMd9hApHtePlvhMnaV0eNo+H8CZpJIDI8jPHJWnq4VpW350kad+T7LmKdCNppfV+HTZLImmbpxCB4iEhaQg6ouSN+CBp/240SDnPH2kl9Mar5aUeaRwpWA+QfIMKeqEMUQEKHWkIAwPuo/ocaf83lVFP0Rtp9mwntfqnGmkc8rkYpn4ZaRInS3xSVRhpOKzd3/0rF2kv4XBDqQIWaSUWAqdV2RVpS5uUCgCwggq/1IJrI7YTaYerjNbaxhJpAjFZDNzuEWmMOSp8i6YQaQe/97GNzg9pgkTE54/2DmksGimWnjYNaaef9sugXgxpIiXDAaKGC2nEMK4Ch/CBCvHAq9ZlrIAKJK3UQaii9mjr0mpJfnF/CmngSVzKTvVobghrXBHN9GiWQTpibIPzaB34c3H42PJo51UmWaEn8WgLJGRIy7/waM+ScQOSfO9o23Xhenv37mg43mpJfnHtaOGua1wRzexokhA6YmyDfgqczHLHDUXraDKrc3H42OpocNkmWaEn6WjTz2RIy7/oaHPMcQOSfOdoUUnhenv35mg9tGpJfnHlaH70a1wRzeRoekM6YmyD42inzHNx+NjiaCsEJlmhJ30KzricMk874Whn42RIy7/gaIRDcQOSfN9oq0nhenv3fAoBpcWdkjF7Cj1jtXSK73oKcE/e383leQqjOwdLD9x4CudufWUxiK9oK7qM5vdlrmgP2j8G4rOtaJUB0EoB7qxof8C22Qmfq2iqR64vWbOqaN//OF7WialoAHs4zJmOqGiK5t3ni12naAZI65UuNXcKGlum0HR+o2joJK4jr8eiaFd3wjNXwqFovzGTFElcoGjJ6GeUU8afaDxZUaGcHp5o2l8+GNQDnWhBLcaNMw+caM2K/8gZz3YKTUfPO7Z0m2j4iyhB/O2aaEnhaEflzplohFSvzDxTmGgAGEKZZZeXaLqBYxqQbZZoP9CWplk2lWgnS2zrGIOUaDjyzNox9JNoDwNhj4TnkmgI46yyNcp1CpF6RFbZIJFobdoVOA3CkGjaKW1kjmqPaEInEf5zdI5ocxetcx7oiGjefWJkRWx0CsRmbcEbF4doAzQYSoUUhmgkaeiCDDSFaK9NgbQ7OIRoxmXQlVcRg2gyFa+g6GmCaE2TKGLlKYFoQENuGgXkgGh6wn0UvbR/aFL038vwrX5oIA7MDv6scwr3UpYsXg19aF9/fclt23xoyAwaPEe5emhoxtO/iH95aO8aToAGU3hoIRXdt5NTd2jjouUHMiJ2aOQic1vQzHVo3m6QXJbudGjcpIYY9pByCio/v5egA3NoVMaCmjigcmiRe42c2sZxaGdDFP4p4HBoWXYkmDlKb2iaOXYB3UFuaNz8yWqAOW1oYzQN/T3FbGik92Bm4LxraBRiDjwkF2pomeJJjR+qcQpm/bBumcFpaMH5X0e3w2JoUs4ZK9/9YWhTr9dFr3VgaCZAlmB+7XAKmenZ2du3X2hsd/asWTleaD8ItccpsV1oEplz4vgoXGgUejL9yKBbaOYK8BeYGFpo6OuvMmiQWWj4MW5NNwhYaHUZLGgHgFdoIVHrgtf3VmieOKmdp29vCsvVAkUerlVoywsRS9niVGhI89BlqVpTaMTajoB50lJocRJNm0hKUWju+Qu2GMJQaJoxytDoOU9oFxmI67ixTmiUAEcGhylNaEA4BiFXoW4KEAl3X0BaRGghJmKDYjxtCkP1oMqCUGwKduHKNcVGawpvv4jIfHlqCjRcsTO/b2kK+PjangJmaAq8lQMKRFwIaOa5zTv9CmcKdID04DwaZgo4HR1MfxBlCvy5RrfCBmQK0p270eSyYwqWOuQ8JqliClrXDqhpn2EKMLuDwotLYAr0V6wtzUFfCrj01ZgQOF4KfJH+A1IuXQo1fO/aS+xcCvkYGEaN4lsKvbVBsdDYWgqTmbbL8oRZClc23zY1e1gKG9MIondxVwrwtn68mR1WCrVTpyfcE1UKefDQkh4KVAo9jfn9YQBTCjZ5LwWA4FIKsQP3dyNlUQosjr7qxulQCqBq2k4rzxlnO1b8lRg7GGcv4Bk8vCwXZxChA+3DI08KnVFIt96wTgp8LlYEFS1NClwLZFFLqUwKcKB40QDMSwoRRwppTepKCuZ7/BsWbtxmmVBYfnxr22ZUW6pKPtdJCrqw7s7g8UgKXFeAZi0QRwowjHIZ9pNGCgTBZMzAF0UKpmf2Yww2RAp6nOgW1rlDCk7R2smgPUIKIgbMfGnBQQrErF4Utt9ACpjhUMd/Y31m1Xf94EuxPwptFkJ6Sec+Cg691BGWBT0K4vHGxF+JPAq3Jrh3KQ1TZtQOAKbun1JmR2kgML01UGYRIP+/b5FPZjVQ5ZXFmDsKWM1KD3UrOgotAjzCP685CgE3LnUJMzgK1WsgKNK2Nwp3ErK/H9U2CktHpHLoWDUKH3yWJbLcNArBIii9//ozCpVXGnDIfjIKaYwMI5ICMQo2qCRTqvMwClrVFgZzdy8KfgIJuT37LgqjL/trBn8tCsaYjANTnSwK6sV/th0hKwoO83Fp5qQqCjFcAgEzwykKVYn0s/xGJwp6tudmxsomCpwfeP4T6SUKwUxqsdxsJArleV1kpvAjCgmnTxdvdCIKLBDgrrySTGXgV6CQ440hClA902GGFiAKdWrFFE+aHwqY01asnLgeCrwASF9lPB0K4C07Ei/AHGVuPFRrtBYcCgOXzKl83hsKJ8S+XEViGgpM8bEPD+YZCnAeo8LYaRgKk4c0WiWI7WQam/04S6DsZBm3j5z3dutkRyMiAKNN6mRGP7RjTiTpZHSrRsf6+uhkpKvYKqbR52QTxWqOUajmZBou/PH9fhcKt7QnDe8L5WTwPYiAvvHkZCFzGuRpyBYK2+EZwLiPFQpp76UM21QUCshnDk5isRMKOievyf0TEgqr5lBFmHYQCu2ZhVSJ2w8KIIaATpetDgpTcnpIpn8NCpelrnzJVwwKypGpdtcpCwr9faRw5vsKCkGx16QJ1AkKdJ3SnhemCAqnic2YJXgHCtp1yJI0SgYKFjTjmUhLBQpJIN2TVx0ECnwM2I1l7wMKwD8MwojHAgrzKwe8lpkBCiYYAbalawAKaks16shD/wmdNzDk1hX+CdAjK97k5/0JAxAm2PO5/Ak+zkDfB7v7CXG6O9kWjfoJpKY20yRf+Qnp2WoHRzf4CRvGZQFVCfcJTrJf+2Tb9QkTY3HAoP/0Cdf/bLqv0fMJnJxntL2j8glgOWKuzHXxCRgkfbXgdvAJ3MB3r+5I7wmgXXKp/RruCXZBpt0g8+0JOt6h1y7F7An+epvRPZczYxDWhSKFkDJjLcpsBi7FMWOSplTq1/kwYzehPKdyVy9jYnokixuM6wnUXs8FX2/qCZj7yv9uQekJXJjF+XwT6AkgNb/zi+XnCdgf2vqf5uYJnbzV9K245QlhWdDuvIrkCTY9BCPfYuMJ+9n/HO004gm/dvkW/AbhCZRaLUsf3+AJWfcoRS2x3wkdlCM/O4PeCeEwHTlKVd0JQdWwGAV53Am8X9L+w4iPYtmRldOvodsJNur05ICY2gkdC0i33rDZCdzEZFFLqdgJ/QoKaU3q1wmldO7O4PHWCRtQchn2k9UJkSv2Yww21Ak6ldrJoD3TCa9wXhS239IJWNpCeknn0QnOtcbEX4nQCUSRSg91K88J7PoudQkzzgli1rK/H9XNCQtAliWy3MwJgRsacMh+ywnoTiRTqvPKCTGpCbk9+8kJeD+MA1OdyAnBmXFp5qTHCQgw9LP8RsYJT8Z4/hPpxQmYIF1kpvCoYVYtY0KBbMQJ37bgrrySwwknEcUUT5rCCW6nSF9lPMEJtT3MqXzewAn+l7EPD+a/CUUuNFoliL4JjogZwLiPuwn3xOp9A7m6Cbd+Rg9pTT1hSNevKqPXPGGo3OzBF6A7YUcbmfiop7kJDFNTOZuyMmHEvxPyXqgxYY2lFKoMtzBhtqYUYrvFuAm0vPenNB4vYavBIjK5CC5h1MIj6mcXLWH9wySiFSa3CSqY25lmArYJoHO+i5nmtQlJ3WL6MlK0Cb+4RexkNrMJZyLqWv6h9WDMM+jhbET0YM9VOa4usLIJ3f3NTDCG82A2B0I90PLyYDgplAmSXvFgO0vl1VPKsQlT2bA+YmqwCfxCVK381a8JcR44ny66rgkaiNwNxyWtCZBjv//6CawJwRW/vM9PqwkJcGQrabuqCVAGRx2bn6kJmWDrizQLkGDkR1zsB2KoCeD2zn1n749gWx/voZTwjmCkcXXBJlSnCSeNsm+Z06YJcOdW3jI/pQm3fTnQZSOkCQDY3T7+jqMJR27BMDBzogmOBKQiY1ehCdZeSJH8wqAJHvUrgy6nnwlmT9DxyBKeCXWreOnwL50JNnUl4roSGGCdBoY38tecCV1AoVmAFZsJC9IjT1lBmgmEAfaF4HiZCRfBs2j4RpgJ8TUMNXUmlwmCf1zE3rTkX+7Tqu9PzuNfurTzv52flgldukYSfFeVCdJpL2AZ+pQJN3kEy4xfkwljXm0kuJe0X4YhnXAMOZIJEbb0Nc47kQls5EeY4OGQCfO+G0FQK48J5fHJm4o8jglmbcmA+9uNCWxzC1KHZYwJxIJ48LFfiwn94Ap7IvCKCcV2bnMGIYkJmav9sYfOiAk7UnOmijqHCQ+HAuUK6D9f2H5plNHZPl8fJirlWC09X5NSF15WtTxfmNHsr4i3hgnju5Aji5U7Xw1pputFHjpfcExN5D2BOV9Sk+4yJZk4X8+VlSsc/Ddfxw9k6HNUNl+FR2Y22ZU1X+jEwSIBmDRf7JiHan/TM186lH9rKjcyXygVFE+k84UJuPAfYgtDhAlZl5VWDq+DCS7MJJWPXBtfRF2/Z0l1Gl954gVJSS0ZX9y3SypK5RhfED2RC0udF19zEtbsS1UWX9fnHM5MDYIJAgGz0w8KgQmjpynIEnaACXjctwaTI/leNMy+RM8G+F6XoQQm0L73XssmSgfQdn8JTBFGRRPR8l5OPnsedrrxXnXmS1f6En4JwlSmBmQdfQnmgTVF5Mp8CQqvxINkeHsJL9xSwuUleglSRci26JF5CXZyV/VoP3gJmp/mM+nsdwm9CFwo7Fh2CeE16mZsBnUJEgK9NmAHiF5AlASCzGN0CUXuUuRqeHMJiiHoamYScgm9DX0YcYNxCe/5E8Z79HAJIuaoc4ZlbwlepHqsispuCZGQEFqVO20JxHylB5+sbAkIsDuOm0ZrCTuc0DumtyRekxQX3gq8agluiGXpsChpCYB6Oao9xWgJRBfPV0c2ZwkItGQFUqdmCcxQ+bJcGGUJhDvM62F98F0nMVfJLhHvXUzeJwKyaWQJSNhhmWvuYwkNdfZGdl9iCeJYjM1y+WEJpvUhe3xqXwnj5N/wWA1eCajNQP0EIl0JNuvb+PaZXAnZOrF27FJbCfmuWy554IxdUj33ZjRFi10178ifuJ2KXcalmdg89loJWL6Q0q7dWQk4E1sOmjZYCUjx4NW+xlcJQJ5lneFWVgmJMyoc81VWXd5C60nFd1Vd4eDg8MYvVF3lftWXx+dTXUk4yT7Hn1JdTda+5chXVQkHCuqs6LpRXS9pxj7WJ1BdMwe65dbfT11PIK+M15dMXWPlRRtPi0tdh/B3GhH3Sl2s+6gZ0mJJXTIi2hiUzkhdVi0LGFY6VAnyveUylOJHXREhTAb4fEZdNix+BbroRV1ILa8Ee1RAXTujUI445D9dMRzi8eO6Pl1W5XRVj5FTCXCUpMOKRz1dYGkB5FAEPF2FMpNH+9o7XeoaJaunsTpdaXm3DlOIUgntamRUf6wsXamMxxR8zytdBTqgFa7OKl2QN3oW381RCWtBI+V1ESldUjwpKSC8KF3dOQMqUrsnXRkl3CqDuiZdD562K7W5JV3Y9ElAyHMkXQj8ktNVdiNd/WfbZuF4Il0tbyT6bXshXW6KbZTQjyBdnpG3J1ySUAlW9R5rITkfXZP9ALvplB5dELRJVUupHV0FIJLo2KscXXl923tkrhtdupgkFsbCGl3qn22pU8UZXd8LtzzfxxhdDxMA0GvKF13WGp06LQgWXTos5826Ck8J08vd+xaeTglRop2MDANNCTxWmBK3KkwJuixXo62PSwk3Axc0ovRKCY6y0fhEtUkJ4sORiTkaSAk11VAaL39HCYjmD6sk5EYJIHELMdALRQl0gsrBxnBECceTiVK71UMJXx6F2Gf9lFzDXwED0XFCCbIvRGldYkEJyFufBdsmQAl6zvFcDqY/CT6InUlRFD4J8PrvoIWTPQmibUH4uBI8CVTgk0/skTsJgC3kpTqiOgkyoDb9bSE5CeQSiFShoDgJqMw0QeQONwlaP4aYF442CQyy2O9LDTUJJl9taCitNAnNMb+/WywzCXQEERePqzIJG9djbsIqMQlXY7TEEDswCf41BhxEui8JpghYc3c5LgleIgRguqctCQb1VrfuJiwJ6sIqHPNVKwlTTeUylOIqCU76ZFR/rCkJt4QeayE5KAmyMZ2MDAMnCRu8V6OtjyYJ1jbR+ES1JQl8WVAaL38kCWj1CzHQCyMJDhiJUrvVIgn6s0RpXWIhCWLdZzuajiAJu3yOhnH6HwkC1Vo8OXceCVp0gYcR4x0JCWDzpuQBHAli/xryu20bCQtyKsktCxoJRyr2fvWHGQmUKR3KzfMYCdDh6n+VcBcJHuERy2zcFgkE4KPFD8kVCQcN35/22chak+tjMAlAFAlgC6kjMbLHWk9HbL+rghMJJf71QQd0Egl+/L/FQUwRCdb6iEl8JBAJL/lSzbf8Dwn065/rjb4OCQfiQOL8FQ0JA9qS6JEuDAlaV/c4otILCaRPuDUB8AoJolXlfS5bCQkRotd3r20ICS4O13evbQcJ7Ytt8xeeBgmVwtTkIIw3WiRgCV+vmTJadqDM+fuBBQkxFEM5NRsECZYDHhSt5P5ZSso3Yb1f/VnXrsZGR6X8WTVDVSzS6vtZwSfkEVww+lkfvHP35nX5WaygAt1xu/dZTQYgqIVG9llvjK+NEIz1WWv0+kf0hfRZbR+JLX7L0lnvk3AqnYvRWTzZUy4bY9BZr32r3HU2z1kl/JmRTGj3CDGebv6WkfYI+iQrnsIc8ggaud2yHhHxCK4wp0HwfvAI47lZLmq57wh1MJpXFjjuCCsRP+m8eO0I8HC99NnF7Aj2J0GOCv7rCLo0PA/WXuoICxzWP5a76Qjuza0IKkjoCGjwAwzTOucIvgydVbvi/FjIy9wqIjfmCPOkd1XdbPJYAQgdgOsF5QiLrDdSoUTkCCeMG44+Q+MIzsSwBBUg4ggerpManm/hCDOlRKUveOAIrOE64agb3wgpaYNORa2sWNY1HYDrBd4ISR9xVIq73QgC7JuWsZrcCGFF2suY09sI8chI4LjC2ghssrUTdRHZCGt7JKNBd9gI/3JyYvc71wiy8x4yHhjWCBaGmXkcT9UIzhLDBB/D1AgrV43ymLnTCJ1EBz8rQtII7/Ypjfa50QjNpqsDl2rQCFklHdvIgc8IiDkRfl4ozgjzrFh/kw/NCIz1c78llf1XI/js7BDb/FcChDu+T//7V0EriY+NI/pXgNLYYMxH+VdfXiYyCmzMCB+mYr0pvcsIr2r3yF/1yghJoCzCve7JCLm6BniDlsgIwdb9AQllxwgtyyvcskHGCFMPP/J2OsMIxL41gwp+wgjmBcImI5HBCHcoqQ3oEMAI6icGFI2eeFeO/UZAMjh3V5MG675rFb8IXugdh9bVvgg4kKuReea9CPCzQVPlI7wIPjeSOX36uwjI7Rm0jcq6CH2OsDAYRzxXz/StsTM0uQhW00fpOrq4CAbokXHHZbcIVoz+8wiNHFd0Nr+jAAC2CHGQq2vjABVXsfCJWuZBE1dHPhrFulW1CE7sAGEH0RFXibqajr25D1cfCCv5kM0NV7VVvGNk4QtXTKNMzjj1CVfi8N04DAm0CP2Na83ajAdXJG1eAg5tBVe6uu5s4oADV1AIf9e2lLMIoZbIfTJKsgh59W0l1bGxCEYa9EktvLAIlaA36vZm21b8Wv2qPZraVqazFtx9yq8IYBjEV0kFrgiQwmv9XsusCIhxW50rbrVWOUNU+V1ItFZT7jATFqmzVmvAiJI0ILJWhGtjrO6AsVaeFj/Gp+GwVrfBGuBhQq9W0JNyX3+5qwj/sQXBNqCrVqMqkLSvm6pW9gtCaRyZqVZKFDyjf8uoVp7171fryKdW8dahDFjGplZFuFTBxMOlVpnATvsn9qFWoA+6M4qLoFbz8G3o9oifVkf5ZiJau55Wm9oZ18a4nVbuu8yLMracVkKdfkCes5tWlqV4egLmqQgvO/u8T5moCL1DiqLZ3qcIDmlac+2FpQhwnyKHo66kCL2IwWs4TqMIrOZzOjLoogitizoPGHFMVlwrAHmta0tWe3Y7qHjtoQid6ezdEQugCI1HnqwLpZ8IfKVQewU/ngiATpHtBnydCP2DglXinZwIpph5JU6tEVblRFvZTvwQVsCta6GgyJsIEc6qAMd9mggvNjaPh/CZCJc9yPIzx5gIkTmAj8DolggUdGlCqdCVCG4QRiKg8ZQIEzRKp3x+kwjgkD47LGaOCO/qVDGW/ItV8/f273+UilUUQqW8hZiJVThbO5YFWYhVs/HRb4YZjQibXBU751uMCPNUrBnZeDpVIPIstl+2hAiu1FpXnFKDCIsvo0F7yhZVBL7DmSp1FFVB1KLtiLuCCDRH4FF44oEIT4EzaGDpgAj4mHF4XQF/CDsaF4RiCn4I1YJqMkhFfQgAYDLr9X98CD1YK9F+mnkI/BbJPBvBdQgvAVUUkT10CD+Fqq2y7nMIQXaebhl5cgi0o0ZoeDBxCItWO6F0KnAIKmLpESv6bwgtDI0PHqRuCJ26iIC+8W0IcUIvA4Jk/FPEADdofuzXU+UfbnMGIdZTW/tzpoo61VMEZZAji5XUU3pAlVYOr9NTIqqz0w8K0lOYhbcGkyPRU18vpgZkHdBTqInEg2R4z1PvH8i26JHOUzh65jPp7M1TfxDqZmwGr1NMjC0lhoquUyalnoGAc61T7XYPBYkzrFPGj4BhghyrU4XsLpeUp6pTXwWf842QqVMndk+KGHyoU4D4vw0gPKdT68ExaholplNERKLtIuWlU64NE0oczloIW/kbsH2lWQghImkH/yNYCKGZ9ezflVcIq8E3sMAdVggHy3ieYmBVCG1uqZ0kzFQIGi1kTtTVUwjD7+FdCp5SCOkclV/0XyxTWVurl+JOK1NN/V05A7hRCII85nuKllAISk+A6UijTwjcQL4auOxOCKFYcqJ6X00I5s6om5mdTAgPjz+ptSBLCEpAymyMtEoIv8cAwockSQhSbxy0scVICHa3b3Xhr0cI72aBJHcBRgjmQvbDeJ1FCO8Hi8G0SkQIfFpU1ME+nlI4QPPKSZFDCCn/63RbTJ1SinGi/ACunFJ8f7ZEIHVCCPQWpEwGCEEIoOQtZ2ZMQAiqiHoys9I/CKqMCDAZ1D4IWcW73i2IaVLrcggljSZoUlur8eL9MmdS+zPZoG4/PQi5OGdG3f88CCMSuM1nVTsI4v4ykkp8Ogh3GrDPA/05CPHTGJOgUjgIttjypasgLVIHRDdqoQwsUjRUSrLB0ytSAUle+uGaNwipxCYq+uY2CIKERnYXWDUI3NrNrPM7NAjP7C5ZjwMzCE9d1JxLODIIQWtKza+xMQj4RpvbLNowCGaS7empAi8ILCsIhZAVLgg1xeFdZCbIUTzOrtqfDsdRwzszmvMoxlGsxLhZSEMtCKh08AQhkioIFAGv8hkDKQi18kFWxdkoCLKlDC+wVicI90KC0zSoJAiY8Mt5kFkjCI5S3h6yKVhR0QeJhxLwV1HRnd6hEddWUdEzMrwPviII7BDiAbCxIQjMhv4Bqo4gCGVFfkCptjdRsOw/7QtnNlFzu2tNh+IfCNfmI977gh4IedjIe01PHQhNTm0ZnxscCFDZZVCeSxsI6t8HHc/4GgiE5qjpAKYZCEw96Zq07RgIqDSLZ+WaFwhBOyw0FkgWCNtBzQBH9RUIdUhvzXiiFAg1Qi1lTbETCGUCNRl/ahIIR8seDIn8EQg6PcrN7ckOCPgSHumjpw0I1RfF/VIkDAjITa67wjALCIorsA1tQgoIfmGZy95OCQjgn8BKD64HCO9YLTkfpAYIFSUdMiAUO1BM+o/BGZ06UEG8Hqej4gUIztDu4C+cBAj1nN/ZMAwDCBtpz9IxfAIIQTXAyzPsE1C8k5CwDLIBCGgBscQ0XAAIIa2Bc0Lk/wdHeXJsRFT+B21FYmVFxP0HqdrVp4rb2E/YNJbLXzb8B03cxRQ4i9dPiTOQsAyy1k8qJYTpCKzVT8sWeCIEptRPPbhsWwGg+wf1FvHndI76Bw7rOF72yPkH0ateMuj/+AfqfzDPVIb3B97HZBZDE4RPLWVD9f3tg09p+aKv0gqCTwepAWqmJ4FPQz1gJHpEgE+A0b7eT2F/Tx2BHZkjfn5PWhV8U/ea8weybqSpmzd9TyTRoFc2FfIHRR+45sO58QcUEWcmOenwB6fBemNha+8HOnKOoInt7gfe3XpjYWvtB/E5jqCJ7ewHM+ah3bJv6wdGQrUa2vHqB8Ug8msSvyJPI056efeZIU9f4tG9PHsgT/2RKAKCXB9POSZ/Rsg9Hk/X1dWKDh8dTxRqLM9TABxPUP6DE5nhG0/urdpX38IaTypCMZwlpOkHmTl3VlcCGU/0/ad7JADoB25S/UCcRecHcbsnlcFf5gdF1K1/BqPlBxrtMmpL5uQHTfxPcVsX4wcPMu9lQj7iB0Ozg8Qfw+EH6ecXI/xH4AfFJe9lQj7fB3Lyg8Qfw94HoWIXI/xHqk5DY8EHFN+pTuAeqsWF66hOToqSg/X3p07qRXtBZgTdB8/Sq4HZzNwHG0RLdsHz2wdJtN/UnnjaB3gkczN7/dkHw5UTKGIk1weOC9/jCQLWB7bLBHxNx9UHJqPjvMxj1Ad7sUR/E41ATmkHtKi1Yz9OReHhEbx5Pk6/Z9SuylnTB2DpAIG7ST1OfsTMgUxXPE5X3ZZH1/g7TjD2Xw1imjpO+MfcIw6GOU7R4KbpmSc4TpmyIwBFEzdOcsvsxdC0Nk5L5LWLW1Y1ThO2MqIHQjRO7M78Z5Lj0geB8V/xkpwzTqsr9DoU4TJOhES9AJ+CMU4pV9A+wKowToLZTVVsli9O7KIWG/c3Lk5FJZMxoiMtTq/uXfcuxSxOGrgmvblmK05zOqPTZVIqTt0DbJnw89EHhZM3v/AcKU4038C/qvIoTosYGMqZlSdO4lFx1Ik4Jk44siv69kAlTo/rhATl4yRO5Us9KlLs0Af8z0l4VZsDDlzt5hIbAMwSFXWqVou1NBEpKb+nTlp5EODsAFi0XQ==");
  }, function (t, e, o) {
    "use strict";

    t.exports = function (t) {
      for (var e = "undefined" != typeof window && "function" == typeof window.atob ? window.atob(t) : Buffer.from(t, "base64").toString("binary"), o = new Uint8Array(e.length), r = 0; r < e.length; ++r) o[r] = e.charCodeAt(r);
      return o.buffer;
    };
  }, function (t, e) {
    t.exports = {
      hash: function hash(t) {
        var e,
          o = 0;
        if (0 === (t = (t = t.trim()).replace(/  /g, " ")).length) return o;
        for (t.length, e = 0; e < t.length; e++) o = (o << 5) - o + t.charCodeAt(e), o |= 0;
        return o = Math.round(o / Math.pow(2, 16));
      }
    };
  }, function (t, e, o) {
    "use strict";

    o.r(e);
    var r = function r(t) {
        return new E(t).output();
      },
      n = /\s/,
      a = /[A-Za-z]/,
      i = /[A-Za-z84]/,
      s = /[,\]]/,
      C = /[\d\.E\-\+]/;
    function E(t) {
      if ("string" != typeof t) throw new Error("not a string");
      this.text = t.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = 1;
    }
    function d(t, e, o) {
      Array.isArray(e) && (o.unshift(e), e = null);
      var r = e ? {} : t,
        n = o.reduce(function (t, e) {
          return f(e, t), t;
        }, r);
      e && (t[e] = n);
    }
    function f(t, e) {
      if (Array.isArray(t)) {
        var o,
          r = t.shift();
        if ("PARAMETER" === r && (r = t.shift()), 1 === t.length) return Array.isArray(t[0]) ? (e[r] = {}, void f(t[0], e[r])) : void (e[r] = t[0]);
        if (t.length) {
          if ("TOWGS84" !== r) switch (Array.isArray(r) || (e[r] = {}), r) {
            case "UNIT":
            case "PRIMEM":
            case "VERT_DATUM":
              return e[r] = {
                name: t[0].toLowerCase(),
                convert: t[1]
              }, void (3 === t.length && f(t[2], e[r]));
            case "SPHEROID":
            case "ELLIPSOID":
              return e[r] = {
                name: t[0],
                a: t[1],
                rf: t[2]
              }, void (4 === t.length && f(t[3], e[r]));
            case "PROJECTEDCRS":
            case "PROJCRS":
            case "GEOGCS":
            case "GEOCCS":
            case "PROJCS":
            case "LOCAL_CS":
            case "GEODCRS":
            case "GEODETICCRS":
            case "GEODETICDATUM":
            case "EDATUM":
            case "ENGINEERINGDATUM":
            case "VERT_CS":
            case "VERTCRS":
            case "VERTICALCRS":
            case "COMPD_CS":
            case "COMPOUNDCRS":
            case "ENGINEERINGCRS":
            case "ENGCRS":
            case "FITTED_CS":
            case "LOCAL_DATUM":
            case "DATUM":
              return t[0] = ["name", t[0]], void d(e, r, t);
            default:
              for (o = -1; ++o < t.length;) if (!Array.isArray(t[o])) return f(t, e[r]);
              return d(e, r, t);
          } else e[r] = t;
        } else e[r] = !0;
      } else e[t] = !0;
    }
    E.prototype.readCharicter = function () {
      var t = this.text[this.place++];
      if (4 !== this.state) for (; n.test(t);) {
        if (this.place >= this.text.length) return;
        t = this.text[this.place++];
      }
      switch (this.state) {
        case 1:
          return this.neutral(t);
        case 2:
          return this.keyword(t);
        case 4:
          return this.quoted(t);
        case 5:
          return this.afterquote(t);
        case 3:
          return this.number(t);
        case -1:
          return;
      }
    }, E.prototype.afterquote = function (t) {
      if ('"' === t) return this.word += '"', void (this.state = 4);
      if (s.test(t)) return this.word = this.word.trim(), void this.afterItem(t);
      throw new Error("havn't handled \"" + t + '" in afterquote yet, index ' + this.place);
    }, E.prototype.afterItem = function (t) {
      return "," === t ? (null !== this.word && this.currentObject.push(this.word), this.word = null, void (this.state = 1)) : "]" === t ? (this.level--, null !== this.word && (this.currentObject.push(this.word), this.word = null), this.state = 1, this.currentObject = this.stack.pop(), void (this.currentObject || (this.state = -1))) : void 0;
    }, E.prototype.number = function (t) {
      if (!C.test(t)) {
        if (s.test(t)) return this.word = parseFloat(this.word), void this.afterItem(t);
        throw new Error("havn't handled \"" + t + '" in number yet, index ' + this.place);
      }
      this.word += t;
    }, E.prototype.quoted = function (t) {
      '"' !== t ? this.word += t : this.state = 5;
    }, E.prototype.keyword = function (t) {
      if (i.test(t)) this.word += t;else {
        if ("[" === t) {
          var e = [];
          return e.push(this.word), this.level++, null === this.root ? this.root = e : this.currentObject.push(e), this.stack.push(this.currentObject), this.currentObject = e, void (this.state = 1);
        }
        if (!s.test(t)) throw new Error("havn't handled \"" + t + '" in keyword yet, index ' + this.place);
        this.afterItem(t);
      }
    }, E.prototype.neutral = function (t) {
      if (a.test(t)) return this.word = t, void (this.state = 2);
      if ('"' === t) return this.word = "", void (this.state = 4);
      if (C.test(t)) return this.word = t, void (this.state = 3);
      if (!s.test(t)) throw new Error("havn't handled \"" + t + '" in neutral yet, index ' + this.place);
      this.afterItem(t);
    }, E.prototype.output = function () {
      for (; this.place < this.text.length;) this.readCharicter();
      if (-1 === this.state) return this.root;
      throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
    };
    function D(t) {
      return .017453292519943295 * t;
    }
    e.default = function (t) {
      var e = r(t),
        o = e.shift(),
        n = e.shift();
      e.unshift(["name", n]), e.unshift(["type", o]);
      var a = {};
      return f(e, a), function (t) {
        "GEOGCS" === t.type ? t.projName = "longlat" : "LOCAL_CS" === t.type ? (t.projName = "identity", t.local = !0) : "object" == _typeof(t.PROJECTION) ? t.projName = Object.keys(t.PROJECTION)[0] : t.projName = t.PROJECTION, t.UNIT && (t.units = t.UNIT.name.toLowerCase(), "metre" === t.units && (t.units = "meter"), t.UNIT.convert && ("GEOGCS" === t.type ? t.DATUM && t.DATUM.SPHEROID && (t.to_meter = t.UNIT.convert * t.DATUM.SPHEROID.a) : t.to_meter = t.UNIT.convert));
        var e = t.GEOGCS;
        function o(e) {
          return e * (t.to_meter || 1);
        }
        "GEOGCS" === t.type && (e = t), e && (e.DATUM ? t.datumCode = e.DATUM.name.toLowerCase() : t.datumCode = e.name.toLowerCase(), "d_" === t.datumCode.slice(0, 2) && (t.datumCode = t.datumCode.slice(2)), "new_zealand_geodetic_datum_1949" !== t.datumCode && "new_zealand_1949" !== t.datumCode || (t.datumCode = "nzgd49"), "wgs_1984" === t.datumCode && ("Mercator_Auxiliary_Sphere" === t.PROJECTION && (t.sphere = !0), t.datumCode = "wgs84"), "_ferro" === t.datumCode.slice(-6) && (t.datumCode = t.datumCode.slice(0, -6)), "_jakarta" === t.datumCode.slice(-8) && (t.datumCode = t.datumCode.slice(0, -8)), ~t.datumCode.indexOf("belge") && (t.datumCode = "rnb72"), e.DATUM && e.DATUM.SPHEROID && (t.ellps = e.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), "international" === t.ellps.toLowerCase().slice(0, 13) && (t.ellps = "intl"), t.a = e.DATUM.SPHEROID.a, t.rf = parseFloat(e.DATUM.SPHEROID.rf, 10)), e.DATUM && e.DATUM.TOWGS84 && (t.datum_params = e.DATUM.TOWGS84), ~t.datumCode.indexOf("osgb_1936") && (t.datumCode = "osgb36"), ~t.datumCode.indexOf("osni_1952") && (t.datumCode = "osni52"), (~t.datumCode.indexOf("tm65") || ~t.datumCode.indexOf("geodetic_datum_of_1965")) && (t.datumCode = "ire65"), "ch1903+" === t.datumCode && (t.datumCode = "ch1903"), ~t.datumCode.indexOf("israel") && (t.datumCode = "isr93")), t.b && !isFinite(t.b) && (t.b = t.a), [["standard_parallel_1", "Standard_Parallel_1"], ["standard_parallel_2", "Standard_Parallel_2"], ["false_easting", "False_Easting"], ["false_northing", "False_Northing"], ["central_meridian", "Central_Meridian"], ["latitude_of_origin", "Latitude_Of_Origin"], ["latitude_of_origin", "Central_Parallel"], ["scale_factor", "Scale_Factor"], ["k0", "scale_factor"], ["latitude_of_center", "Latitude_Of_Center"], ["latitude_of_center", "Latitude_of_center"], ["lat0", "latitude_of_center", D], ["longitude_of_center", "Longitude_Of_Center"], ["longitude_of_center", "Longitude_of_center"], ["longc", "longitude_of_center", D], ["x0", "false_easting", o], ["y0", "false_northing", o], ["long0", "central_meridian", D], ["lat0", "latitude_of_origin", D], ["lat0", "standard_parallel_1", D], ["lat1", "standard_parallel_1", D], ["lat2", "standard_parallel_2", D], ["azimuth", "Azimuth"], ["alpha", "azimuth", D], ["srsCode", "name"]].forEach(function (e) {
          return o = t, n = (r = e)[0], a = r[1], void (!(n in o) && a in o && (o[n] = o[a], 3 === r.length && (o[n] = r[2](o[n]))));
          var o, r, n, a;
        }), t.long0 || !t.longc || "Albers_Conic_Equal_Area" !== t.projName && "Lambert_Azimuthal_Equal_Area" !== t.projName || (t.long0 = t.longc), t.lat_ts || !t.lat1 || "Stereographic_South_Pole" !== t.projName && "Polar Stereographic (variant B)" !== t.projName || (t.lat0 = D(t.lat1 > 0 ? 90 : -90), t.lat_ts = t.lat1);
      }(a), a;
    };
  }]);
});

/***/ }),

/***/ 9877:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function addSymbolIterator(obj) {
  try {
    obj[Symbol.iterator] = function () {
      return this;
    };
  } catch (error) {
    // pass
  }
}
function addSymbolIteratorFallback(obj) {
  obj["@@iterator"] = function () {
    return this;
  };
}
function wrapNextFunction(next) {
  var iter = {
    next: next
  };
  addSymbolIterator(iter);
  addSymbolIteratorFallback(iter);
  return iter;
}
function isArray(data) {
  try {
    return data.constructor.name.endsWith("Array");
  } catch (_unused) {
    return false;
  }
}
function hasNext(data) {
  try {
    return typeof data.next === "function";
  } catch (_unused2) {
    return false;
  }
}
function hasIterator(data) {
  try {
    return "@@iterator" in data;
  } catch (_unused3) {
    return false;
  }
}
function hasSymbolIterator(data) {
  try {
    return Symbol.iterator in data.constructor.prototype;
  } catch (_unused4) {
    return false;
  }
}
function isIterator(data) {
  try {
    return Symbol.iterator in data && typeof data.next === "function" && data.propertyIsEnumerable("next") === false;
  } catch (_unused5) {
    return false;
  }
}
function getIterator(data) {
  var iter = data["@@iterator"];
  if (hasNext(iter)) {
    return iter;
  } else if (typeof iter === "function") {
    return iter();
  }
}
function createIterator(data) {
  var i = 0;
  var len = data.length;
  var next = function next() {
    return i++ < len ? {
      value: data[i],
      done: false
    } : {
      done: true
    };
  };
  return wrapNextFunction(next);
}
function getOrCreateIterator(data) {
  if (isIterator(data)) {
    return data;
  } else if (hasSymbolIterator(data)) {
    return data[Symbol.iterator]();
  } else if (hasNext(data)) {
    return wrapNextFunction(data.next);
  } else if (hasIterator(data)) {
    return getIterator(data);
  } else if (typeof data === "string" || isArray(data)) {
    return createIterator(data);
  } else {
    throw "[iter-fun] unable to determine iterator";
  }
}
function zip(iters) {
  // convert input to iters just in case
  iters = iters.map(getOrCreateIterator);
  return wrapNextFunction(function next() {
    var values = iters.map(function (iter) {
      return iter.next();
    });
    // if they are all done, stop
    if (values.every(function (_ref) {
      var done = _ref.done;
      return done;
    })) {
      return {
        done: true
      };
    } else {
      return {
        done: false,
        value: values.map(function (_ref2) {
          var value = _ref2.value;
          return value;
        })
      };
    }
  });
}
if (( false ? 0 : _typeof(module)) === "object") {
  module.exports = {
    addSymbolIterator: addSymbolIterator,
    addSymbolIteratorFallback: addSymbolIteratorFallback,
    isIterator: isIterator,
    isArray: isArray,
    hasNext: hasNext,
    hasSymbolIterator: hasSymbolIterator,
    hasIterator: hasIterator,
    getIterator: getIterator,
    createIterator: createIterator,
    getOrCreateIterator: getOrCreateIterator,
    wrapNextFunction: wrapNextFunction,
    zip: zip
  };
}

/***/ }),

/***/ 2905:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var clean = __webpack_require__(2415);
function absolute(n) {
  n = clean(n);
  if (n[0] === "-") return n.substring(1);else return n;
}
module.exports = absolute;
module.exports["default"] = absolute;

/***/ }),

/***/ 1889:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var compare_positive = __webpack_require__(7487);
var clean = __webpack_require__(2415);
var long_addition = __webpack_require__(3841);
var long_subtraction = __webpack_require__(7755);
function add(a, b) {
  a = clean(a);
  b = clean(b);
  var apos = a[0] !== "-";
  var bpos = b[0] !== "-";
  if (apos && bpos) {
    return long_addition(a, b);
  } else if (!apos && !bpos) {
    return "-" + long_addition(a.substring(1), b.substring(1));
  } else if (!apos && bpos) {
    a = a.substring(1);
    switch (compare_positive(a, b)) {
      case "=":
        return "0";
      case "<":
        return long_subtraction(b, a);
      case ">":
        return "-" + long_subtraction(a, b);
    }
  } else if (apos && !bpos) {
    b = b.substring(1);
    switch (compare_positive(a, b)) {
      case "=":
        return "0";
      case "<":
        return "-" + long_subtraction(b, a);
      case ">":
        return long_subtraction(a, b);
    }
  }
}
module.exports = add;
module.exports["default"] = add;

/***/ }),

/***/ 2415:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var expand = __webpack_require__(5888);
module.exports = function clean(n) {
  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);
  n = expand(n);

  // remove extra zero in front
  // 03938.123 => 3938.123
  n = n.replace(/^0+(?=\d)/, "");

  // remove extra zero at end
  if (n.includes(".")) n = n.replace(/\.?0+$/, "");

  // should improve this, so it identifies zero earlier
  if (n === "") n = "0";
  if (n === "-0") n = "0";
  return n;
};

/***/ }),

/***/ 7487:
/***/ ((module) => {

"use strict";


// given:
//  - a and b are positive numbers
//  - a and b have been cleaned (i.e. no + or leading zeros)
function compare_positive(a, b) {
  var alen = a.length;
  var blen = b.length;
  var aidx = a.indexOf(".");
  var bidx = b.indexOf(".");

  // basically where would the dot be
  // if we add a dot at the end of integers
  // like 123.
  var a_adjusted_dot_index = aidx === -1 ? alen : aidx;
  var b_adjusted_dot_index = bidx === -1 ? blen : bidx;

  // how much you need to shift the second number
  // to line up the decimal with the first
  //        0.12345
  //    12345.0

  var offset = a_adjusted_dot_index - b_adjusted_dot_index;
  var left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
  var right = Math.max(alen - a_adjusted_dot_index, blen - b_adjusted_dot_index);
  var aoffset = offset < 0 ? -1 * offset : 0;
  var boffset = offset <= 0 ? 0 : offset;
  var imax = left + 1 + right - 1; // -1 for zero-index

  var i = 0;
  while (i < imax) {
    var ai = i - aoffset;
    var achar = ai === a_adjusted_dot_index ? "." : a[ai] || "0";
    var bi = i - boffset;
    var bchar = bi === b_adjusted_dot_index ? "." : b[bi] || "0";
    if (achar !== bchar) {
      if (achar > bchar) return ">";else if (achar < bchar) return "<";
    }
    i++;
  }
  return "=";
}
module.exports = compare_positive;
module.exports["default"] = compare_positive;

/***/ }),

/***/ 7131:
/***/ ((module) => {

"use strict";


// Internet Explorer doesn't support Number.MAX_SAFE_INTEGER
// so we just define the constant ourselves
var MAX_SAFE_INTEGER = 9007199254740991;

// the greatest number of digits an integer can have
// and be guaranteed to be stored safely as a floating point.
// subtract 1 because MAX_SAFE_INTEGER isn't all 9's
var MAX_SAFE_INTEGER_LENGTH = MAX_SAFE_INTEGER.toString().length - 1;
module.exports = {
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
  MAX_SAFE_INTEGER_LENGTH: MAX_SAFE_INTEGER_LENGTH
};

/***/ }),

/***/ 4293:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var absolute = __webpack_require__(2905);
var clean = __webpack_require__(2415);
var long_division = __webpack_require__(4306);
function divide(dividend, divisor, options) {
  dividend = clean(dividend);
  divisor = clean(divisor);
  if (divisor === "0") throw new Error("[preciso] division by zero");

  // sometimes dividend can be cleaned to ""
  if (dividend === "" || dividend === "0") return "0";
  var dividend_is_positive = dividend[0] !== "-";
  var divisor_is_positive = divisor[0] !== "-";
  var out_sign = dividend_is_positive !== divisor_is_positive ? "-" : "";
  if (!dividend_is_positive) dividend = absolute(dividend);
  if (!divisor_is_positive) divisor = absolute(divisor);
  return out_sign + long_division(dividend, divisor, options);
}
module.exports = divide;
module.exports["default"] = divide;

/***/ }),

/***/ 5888:
/***/ ((module) => {

"use strict";


// convert exponential notation to normal string
// not optimized yet and no support for big numbers
function expand(n) {
  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);
  var sign = n[0] === "-" ? "-" : "";
  if (sign === "-") n = n.substring(1);
  var index_of_e = n.indexOf("e");

  // number not in exponential notation
  if (index_of_e === -1) return sign + n;
  var index_of_dot = n.indexOf(".");

  // if number doesn't include a period dot
  // then just assume it at the end
  // such that 3e4 has index of dot at 1
  if (index_of_dot === -1) index_of_dot = index_of_e;
  var shift = Number(n.substring(index_of_e + 1));

  // remove old decimal place
  var base = n.substring(0, index_of_e).replace(".", "");

  // normalize shift to start of the string at index zero
  var normshift = index_of_dot + shift;
  var baselen = base.length;
  if (normshift >= baselen) {
    var zct = normshift - baselen;
    var result = base;
    for (var i = 0; i < zct; i++) result += "0";
    return sign + result;
  } else if (normshift < 0) {
    // need to add zeros in decimal places
    var _result = "0.";
    for (var _i = 0; _i > normshift; _i--) _result += "0";
    _result += base;
    return sign + _result;
  } else {
    // shifting within the base
    return sign + base.substring(0, normshift) + "." + base.substring(normshift);
  }
}
module.exports = expand;
module.exports["default"] = expand;

/***/ }),

/***/ 3841:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(7131),
  MAX_SAFE_INTEGER_LENGTH = _require.MAX_SAFE_INTEGER_LENGTH;

// assumes both numbers are positive numbers
function long_addition(a, b) {
  var alen = a.length;
  var blen = b.length;
  var aidx = a.indexOf(".");
  var bidx = b.indexOf(".");

  // basically where would the dot be
  // if we add a dot at the end of integers
  // like 123.
  var a_adjusted_dot_index = aidx === -1 ? alen : aidx;
  var b_adjusted_dot_index = bidx === -1 ? blen : bidx;

  // just use floating point arithmetic for small integers
  if (aidx === -1 && bidx === -1 && alen < MAX_SAFE_INTEGER_LENGTH && blen < MAX_SAFE_INTEGER_LENGTH) {
    return (Number(a) + Number(b)).toFixed();
  }

  // how much you need to shift the second number
  // to line up the decimal with the first
  //        0.12345
  //    12345.0

  var offset = a_adjusted_dot_index - b_adjusted_dot_index;
  var left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
  var right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
  var aoffset = offset < 0 ? -1 * offset : 0;
  var boffset = offset <= 0 ? 0 : offset;
  var imax = left + 1 + right - 1; // -1 for zero-index

  var result = "";
  var carried = 0;

  // to the right of the period
  //        0.12345
  //    12345.0
  var i = imax;
  if (right > 0) {
    while (i > imax - right) {
      var achar = a[i - aoffset] || "0";
      var bchar = b[i - boffset] || "0";
      var n = Number(achar) + Number(bchar) + carried;
      if (n >= 10) {
        n -= 10;
        carried = 1;
      } else {
        carried = 0;
      }
      if (result !== "" || n !== 0) {
        result = n + result;
      }
      i--;
    }
    if (result) result = "." + result;
    i--; // substract 1 for dot
  }
  if (left > 0) {
    while (i >= 0) {
      var _achar = a[i - aoffset] || "0";
      var _bchar = b[i - boffset] || "0";
      var _n = Number(_achar) + Number(_bchar) + carried;
      if (_n >= 10) {
        _n -= 10;
        carried = 1;
      } else {
        carried = 0;
      }
      result = _n + result;
      i--;
    }
  }
  if (carried === 1) {
    result = carried + result;
  }
  if (result[0] === ".") result = "0" + result;
  return result;
}
module.exports = long_addition;
module.exports["default"] = long_addition;

/***/ }),

/***/ 4306:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var compare_positive = __webpack_require__(7487);
var add = __webpack_require__(1889);
var subtract = __webpack_require__(8244);
var round_last_decimal = __webpack_require__(45);

// given dividend and divisor are positive numberical strings
function long_division(dividend, divisor) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$max_decimal_digi = _ref.max_decimal_digits,
    max_decimal_digits = _ref$max_decimal_digi === void 0 ? 100 : _ref$max_decimal_digi,
    _ref$ellipsis = _ref.ellipsis,
    ellipsis = _ref$ellipsis === void 0 ? false : _ref$ellipsis;
  // remove unnecessary starting zeros
  // ex: 0.5 => .5
  if (dividend[0] === "0") dividend = dividend.substring(1);
  if (divisor[0] === "0") divisor = divisor.substring(1);
  var dividend_index_of_dot = dividend.indexOf(".");
  var divisor_index_of_dot = divisor.indexOf(".");
  var adjusted_dividend_index_of_dot = dividend_index_of_dot === -1 ? dividend.length : dividend_index_of_dot;
  var divisor_num_decimal_places = divisor_index_of_dot === -1 ? 0 : divisor.length - 1 - divisor_index_of_dot;

  // whether the result has a repeating decimal
  // e.g. 1/3 is repeating as in "0.333..."
  var repeating = false;

  // remove decimals
  dividend = dividend.replace(/\./, "");
  divisor = divisor.replace(/\./, "");
  var dividend_length = dividend.length;
  var current = "";
  var quotient = "";
  var comparison;
  var offset = -1 * divisor_num_decimal_places;
  var skip = 0;
  for (var i = 0; i < dividend_length; i++) {
    var char = dividend[i];
    current += char;
    comparison = compare_positive(current, divisor);
    if (comparison === ">") {
      // same as const times = Math.floor(current / divisor);
      // but without floating point problems
      var times = 1;
      var product = add(divisor, divisor);
      var passed_product = divisor;
      while (compare_positive(product, current) !== ">") {
        times++;
        passed_product = product;
        product = add(product, divisor);
      }
      times = times.toString();
      if (quotient !== "") {
        for (var _i = times.length; _i <= skip; _i++) quotient += "0";
      }
      quotient += times; // string concatentation

      current = subtract(current, passed_product);
      skip = 0;
    } else if (comparison === "<") {
      if (quotient === "") {
        offset++;
      }
      skip++;

      // outside greater than inside
      continue;
    } else if (comparison === "=") {
      if (quotient !== "") {
        for (var _i2 = 0; _i2 < skip; _i2++) quotient += "0";
      }
      quotient += "1";
      current = "0";
      skip = 0;
    }
  }
  if (current.match(/^0+$/g)) {
    if (comparison === "<") {
      quotient += current.substring(0, current.length - 1);
    }
  } else {
    var previous = {};

    // keep dividing until we have an answer
    // figure out current place of decimal number
    var _idot = adjusted_dividend_index_of_dot - offset;
    var _qlen = quotient.length;
    // add 1 extra for rounding purposes
    var imax = _idot - _qlen + max_decimal_digits + 1;

    // reset skip if just "" so far because don't want to count 0 in 0.
    if (quotient === "") {
      skip = 0;
    }
    for (var _i3 = 0; _i3 < imax; _i3++) {
      current += "0";
      if (ellipsis) {
        if (current in previous) {
          previous[current]++;
          if (previous[current] > 3) {
            quotient += "...";
            repeating = true;
            break;
          }
        } else {
          previous[current] = 1;
        }
      }
      var _comparison = compare_positive(current, divisor);
      if (_comparison === ">") {
        // inside greater than outside

        // how many times the divisor goes into the current
        var _times = 1;
        var _product = add(divisor, divisor);
        var _passed_product = divisor;
        while (compare_positive(_product, current) !== ">") {
          _times++;
          _passed_product = _product;
          _product = add(_product, divisor);
        }
        _times = _times.toString();

        // pad left zeros
        for (var _i4 = _times.length; _i4 <= skip; _i4++) quotient += "0";
        quotient += _times; // string concatentation
        current = subtract(current, _passed_product);
        if (current === "0") {
          break;
        }
        skip = 0;
      } else if (_comparison === "<") {
        // outside greater than inside
        skip++;
        continue;
      } else if (_comparison === "=") {
        // fill in previous with zeros
        for (var _i5 = 0; _i5 < skip; _i5++) quotient += "0";
        quotient += "1";
        skip = 0;
        break;
      }
    }
  }

  // reinsert decimal place

  var idot = adjusted_dividend_index_of_dot - offset;
  var qlen = quotient.length;
  var num_decimals;
  if (idot === qlen) {
    // integer number so don't do anything
    num_decimals = 0;
  } else if (idot < 0) {
    quotient = "0." + "0".repeat(Math.abs(idot)) + quotient;
    num_decimals = qlen - idot; // idot is negative, so adding
  } else if (idot > qlen) {
    // add more zeros to integer
    for (var _i6 = qlen; _i6 < idot; _i6++) quotient += "0";
    num_decimals = 0;
  } else if (idot < qlen) {
    quotient = quotient.substring(0, idot) + "." + quotient.substring(idot);
    num_decimals = qlen - idot;
  } else if (idot === 0) {
    quotient = "0." + quotient;
    num_decimals = qlen;
  }

  // remove zeros from front
  // 03938.123 => 3938.123
  quotient = quotient.replace(/^0+/, "");

  // remove extra zeros from the end
  quotient = quotient.replace(/\.\d+0+$/, "");

  // round if necessary
  if (!repeating) {
    var extra_decimals = num_decimals - max_decimal_digits;
    if (extra_decimals > 0) {
      quotient = round_last_decimal(quotient.substring(0, quotient.length - extra_decimals + 1));
    }
  }
  if (quotient[0] === ".") quotient = "0" + quotient;
  return quotient;
}
module.exports = long_division;
module.exports["default"] = long_division;

/***/ }),

/***/ 3435:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _require = __webpack_require__(7131),
  MAX_SAFE_INTEGER_LENGTH = _require.MAX_SAFE_INTEGER_LENGTH;
var CHUNK_SIZE = 15;

/**
 *
 * @param {String} a - numerical string larger or equal to b
 * @param {String} b - numerical string smaller or equal to a
 * @returns {String} product - result of multiplying a with b
 */

function long_multiplication(a, b) {
  if (a === "0" || b === "0") return "0";
  var top_index_of_dot = a.indexOf(".");
  var bottom_index_of_dot = b.indexOf(".");
  var a_num_integer_places = top_index_of_dot === -1 ? a.length : top_index_of_dot;
  var b_num_integer_places = bottom_index_of_dot === -1 ? b.length : bottom_index_of_dot;
  var max_total_num_integer_places = a_num_integer_places + b_num_integer_places;
  var a_num_decimal_places = top_index_of_dot === -1 ? 0 : a.length - 1 - top_index_of_dot;
  var b_num_decimal_places = bottom_index_of_dot === -1 ? 0 : b.length - 1 - bottom_index_of_dot;
  var out_num_decimal_places = a_num_decimal_places + b_num_decimal_places;
  if (out_num_decimal_places === 0 && max_total_num_integer_places < MAX_SAFE_INTEGER_LENGTH) {
    return (Number(a) * Number(b)).toFixed(0);
  }

  // remove decimals
  var aint = a.replace(".", "");
  var bint = b.replace(".", "");
  var alen = aint.length;
  var blen = bint.length;
  var chunks = [];
  var i = alen;
  while (i >= 0) {
    var end = i;
    var start = i -= CHUNK_SIZE;
    var str = aint.substring(start, end);
    chunks.push([Number(str), str.length]);
  }
  var partial_products = [];
  var partials = [];

  // for each number in multiplier
  var _loop = function _loop() {
    var bstr = bint[ireverse];
    var bnum = Number(bstr);
    var carried = 0;
    var partial = "";
    var ichunklast = chunks.length - 1;
    chunks.forEach(function (_ref, c) {
      var _ref2 = _slicedToArray(_ref, 2),
        chunk = _ref2[0],
        chunklen = _ref2[1];
      var subpartial = carried + bnum * chunk;
      var subpartstr = subpartial.toString();
      var subpartcharlen = subpartstr.length;
      if (subpartcharlen > chunklen && c !== ichunklast) {
        var islice = -1 * chunklen;
        partial = subpartstr.slice(islice) + partial;
        carried = Number(subpartstr.slice(0, islice));
      } else {
        var imax = chunklen - subpartcharlen;
        for (var _i3 = 0; _i3 < imax; _i3++) {
          subpartstr = "0" + subpartstr;
        }
        carried = 0;
        partial = subpartstr + partial;
      }
    });

    // add number of zeros at end
    partial += "0".repeat(_i);
    partial_products.push(partial);
    partials.push([Array.from(partial).map(function (char) {
      return Number(char);
    }), partial.length]);
  };
  for (var _i = 0, ireverse = blen - 1; ireverse >= 0; ireverse--, _i++) {
    _loop();
  }

  // back to front, iterate through columns
  // and add partial products together
  var num_partials = partial_products.length;
  var number_of_columns = partials[partials.length - 1][1] + num_partials;
  var result = "";
  var carried = 0;
  for (var icol = 0; icol < number_of_columns; icol++) {
    var sum = carried;
    var pmax = Math.min(icol, num_partials - 1);
    for (var p = 0; p <= pmax; p++) {
      var _partials$p = _slicedToArray(partials[p], 2),
        pnums = _partials$p[0],
        plen = _partials$p[1];
      var _i2 = plen - 1 - icol;
      if (_i2 >= 0) {
        sum += pnums[_i2];
      }
    }
    if (sum >= 10) {
      sum = sum.toString();
      result = sum[sum.length - 1] + result;
      carried = Number(sum.slice(0, -1));
    } else {
      result = sum + result;
      carried = 0;
    }
  }

  // add decimal back in
  if (out_num_decimal_places === 0) {
    // integer
    // remove extra zeros
    result = result.replace(/^0+/, "");
  } else {
    // decimal number
    var idot = result.length - out_num_decimal_places;
    result = result.substring(0, idot) + "." + result.substring(idot);

    // remove zeros from front
    result = result.replace(/^0+/, "");

    // remove extra zeros from the end
    result = result.replace(/\.?0+$/, "");
    if (result[0] === ".") result = "0" + result;
  }
  return result;
}
module.exports = long_multiplication;
module.exports["default"] = long_multiplication;

/***/ }),

/***/ 7755:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// const lookup = {};
// const vals = [undefined, 0, 1, 2, 3, 4, 5, 6, 8, 9];
// vals.forEach(top => {
//   lookup[top] = {};
//   vals.forEach(bottom => {
//     lookup[top][bottom] = (top || 0) - (bottom || 0);
//   })
// });
var _require = __webpack_require__(7131),
  MAX_SAFE_INTEGER_LENGTH = _require.MAX_SAFE_INTEGER_LENGTH;

// assumes (1) both a and b are positive numbers
// and (2) a is larger than b
function long_subtraction(a, b) {
  var alen = a.length;
  var blen = b.length;
  var aidx = a.indexOf(".");
  var bidx = b.indexOf(".");

  // basically where would the dot be
  // if we add a dot at the end of integers
  // like 123.
  var a_adjusted_dot_index = aidx === -1 ? alen : aidx;
  var b_adjusted_dot_index = bidx === -1 ? blen : bidx;
  // console.log({a_adjusted_dot_index, b_adjusted_dot_index});

  // how much you need to shift the second number
  // to line up the decimal with the first
  //        0.12345
  //    12345.0

  // just use floating point arithmetic for small integers
  if (aidx === -1 && bidx === -1 && alen < MAX_SAFE_INTEGER_LENGTH && blen < MAX_SAFE_INTEGER_LENGTH) {
    return (Number(a) - Number(b)).toFixed();
  }
  var offset = a_adjusted_dot_index - b_adjusted_dot_index;
  // console.log("offset:", offset);

  var left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
  // console.log("left:", left);

  var right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
  // console.log("right:", right);

  var aoffset = offset < 0 ? -1 * offset : 0;
  var boffset = offset <= 0 ? 0 : offset;
  // console.log({aoffset, boffset});

  var imax = left + 1 + right - 1; // -1 for zero-index
  // console.log({imax});

  var result = "";

  // number of borrowings
  var borrowed = 0;

  // to the right of the period
  //  100.5  6  7
  //    2.2  9  3
  //        (-3 + 10)  4
  var i = imax;
  if (right > 0) {
    while (i > imax - right) {
      // console.log("\n\n", {i});
      var top = a[i - aoffset] || "0";
      var bottom = b[i - boffset] || "0";

      // console.log("pre borrowing", {top, bottom});
      top -= borrowed;
      borrowed = 0;

      // console.log("after borrowing", {top, bottom});
      var n = top - bottom;

      // console.log({n});
      if (n < 0) {
        while (n < 0) {
          borrowed++;
          n += 10;
        }
      } else if (borrowed) {
        borrowed--;
      }
      // console.log({n});
      if (result !== "" || n !== 0) {
        result = n + result;
      }
      i--;
    }
    if (result !== "") {
      result = "." + result;
    }
    i--; // substract 1 for dot
  }

  // console.log({result});

  if (left > 0) {
    while (i > 0) {
      // console.log("\n\n", {i});
      var _top = a[i - aoffset] || "0";
      var _bottom = b[i - boffset] || "0";

      // console.log("pre borrowing", {top, bottom});
      _top -= borrowed;
      borrowed = 0;

      // console.log("after borrowing", {top, bottom});
      var _n = _top - _bottom;

      // console.log({n});
      if (_n < 0) {
        while (_n < 0) {
          borrowed++;
          _n += 10;
        }
      } else if (borrowed) {
        borrowed--;
      }
      // console.log({n});
      result = _n + result;
      i--;
    }

    // console.log({borrowed});
    // special rule for last one
    var achar = a[0 - aoffset] || "0";
    var bchar = b[0 - boffset] || "0";
    var _n2 = Number(achar) - (borrowed > 0 ? 1 : 0) - Number(bchar);
    if (_n2 !== 0) {
      result = _n2 + result;
    }

    // remove any zeros in front like in 0123
    result = result.replace(/^0+/, "");
  }

  // if decimal number add zero
  if (result[0] === ".") result = "0" + result;
  return result;
}
module.exports = long_subtraction;
module.exports["default"] = long_subtraction;

/***/ }),

/***/ 6848:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var absolute = __webpack_require__(2905);
var clean = __webpack_require__(2415);
var compare_positive = __webpack_require__(7487);
var long_multiplication = __webpack_require__(3435);
function multiply(a, b) {
  a = clean(a);
  b = clean(b);
  var apos = a[0] !== "-";
  var bpos = b[0] !== "-";
  var out_sign = apos !== bpos ? "-" : "";
  a = absolute(a);
  b = absolute(b);
  var comparison = compare_positive(a, b);
  if (comparison === "<") {
    var aold = a;
    var bold = b;
    a = bold;
    b = aold;
  }
  return out_sign + long_multiplication(a, b);
}
module.exports = multiply;
module.exports["default"] = multiply;

/***/ }),

/***/ 45:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var add = __webpack_require__(1889);
var truncate_decimal = __webpack_require__(6082);

// given n is a positive decimal number
var up = ["5", "6", "7", "8", "9"];
function round_last_decimal(n) {
  // will round up to an integer
  if (n.match(/\.9+$/)) {
    return add(truncate_decimal(n), "1");
  }

  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);

  //console.log("rounding:", {n});
  var len = n.length;
  //console.log({len});
  var result = "";
  var last_char = n[n.length - 1];
  //console.log({last_char});

  if (up.includes(last_char)) {
    var i;
    for (i = len - 2; i >= 0; i--) {
      var char = n[i];
      //console.log({char});
      // skip over . or -
      if (char === "." || char === "-") continue;
      var nchar = Number(char) + 1;
      //console.log({nchar});

      if (nchar === 10) {
        result = "0" + result;
        // keep rounding up
      } else {
        result = nchar + result;
        break;
      }
    }
    //console.log({i});
    if (i > 0) result = n.substring(0, i) + result;
  } else {
    result = n.substring(0, len - 1);
  }
  if (result[result.length - 1] === ".") result = result.substring(0, result.length - 1);

  // remove trailing zeros in decimal number
  // 0.50 => 0.5
  if (result.indexOf(".") > -1) result = result.replace(/0+$/, "");
  return result;
}
module.exports = round_last_decimal;
module.exports["default"] = round_last_decimal;

/***/ }),

/***/ 8244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var clean = __webpack_require__(2415);
var compare_positive = __webpack_require__(7487);
var long_addition = __webpack_require__(3841);
var long_subtraction = __webpack_require__(7755);
function subtract(a, b) {
  a = clean(a);
  b = clean(b);
  var a_is_positive = a[0] !== "-";
  var b_is_positive = b[0] !== "-";
  if (a_is_positive) {
    if (b_is_positive) {
      var comparison = compare_positive(a, b);
      if (comparison === ">") {
        return long_subtraction(a, b);
      } else if (comparison === "<") {
        return "-" + long_subtraction(b, a);
      } else {
        return "0";
      }
    } else {
      return long_addition(a, b.substring(1));
    }
  } else if (b_is_positive) {
    return "-" + long_addition(a.substring(1), b);
  } else {
    a = a.substring(1);
    b = b.substring(1);
    var _comparison = compare_positive(a, b);
    if (_comparison === ">") {
      return "-" + long_subtraction(a, b);
    } else if (_comparison === "<") {
      return long_subtraction(b, a);
    } else {
      return "0";
    }
  }
}
module.exports = subtract;
module.exports["default"] = subtract;

/***/ }),

/***/ 6082:
/***/ ((module) => {

"use strict";


// given n is a decimal number
function truncate_decimal(n) {
  return n.substring(0, n.indexOf("."));
}
module.exports = truncate_decimal;
module.exports["default"] = truncate_decimal;

/***/ }),

/***/ 2467:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var proj4 = __webpack_require__(2678);
var defs = __webpack_require__(6321);
if (_typeof(proj4) === "object" && typeof proj4.defs !== "function" && typeof proj4.default === "function") {
  // probably inside an Angular project
  proj4 = proj4.default;
}
proj4.defs(defs);
if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return proj4;
  }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
if (( false ? 0 : _typeof(module)) === "object") {
  module.exports = proj4;
  module.exports["default"] = proj4;
}

/***/ }),

/***/ 3369:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function merge() {
  var instances = [];
  var isEmpty = function isEmpty(it) {
    return _typeof(it) === "object" && Object.keys(it).length === 0 && JSON.stringify(it) === "{}";
  };
  var add = function add(it) {
    if (!it) return;
    if (Array.isArray(it)) return it.forEach(add);
    if (it.default) it = it.default;
    if (isEmpty(it)) return;
    instances.push(it);
  };
  Array.from(arguments).forEach(add);
  if (instances.length === 0) throw Error("[proj4-merge] merge called with zero instances of proj4");
  var first = instances[0],
    rest = instances.slice(1);
  rest.forEach(function (instance) {
    first.defs(Object.entries(instance.defs));
  });
  return first;
}
if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return merge;
  }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
if (( false ? 0 : _typeof(module)) === "object") {
  module.exports = merge;
  module.exports["default"] = merge;
}

/***/ }),

/***/ 2678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ lib)
});

;// CONCATENATED MODULE: ./node_modules/proj4/lib/global.js
/* harmony default export */ function global(defs) {
  defs('EPSG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs('EPSG:4269', "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
  defs('EPSG:3857', "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
  defs.WGS84 = defs['EPSG:4326'];
  defs['EPSG:3785'] = defs['EPSG:3857']; // maintain backward compat, official code is 3857
  defs.GOOGLE = defs['EPSG:3857'];
  defs['EPSG:900913'] = defs['EPSG:3857'];
  defs['EPSG:102113'] = defs['EPSG:3857'];
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/constants/values.js
var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var PJD_GRIDSHIFT = 3;
var PJD_WGS84 = 4; // WGS84 or equivalent
var PJD_NODATUM = 5; // WGS84 or equivalent
var SRS_WGS84_SEMIMAJOR = 6378137.0; // only used in grid shift transforms
var SRS_WGS84_SEMIMINOR = 6356752.314; // only used in grid shift transforms
var SRS_WGS84_ESQUARED = 0.0066943799901413165; // only used in grid shift transforms
var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
var HALF_PI = Math.PI / 2;
// ellipoid pj_set_ell.c
var SIXTH = 0.1666666666666666667;
/* 1/6 */
var RA4 = 0.04722222222222222222;
/* 17/360 */
var RA6 = 0.02215608465608465608;
var EPSLN = 1.0e-10;
// you'd think you could use Number.EPSILON above but that makes
// Mollweide get into an infinate loop.

var D2R = 0.01745329251994329577;
var R2D = 57.29577951308232088;
var FORTPI = Math.PI / 4;
var TWO_PI = Math.PI * 2;
// SPI is slightly greater than Math.PI, so values that exceed the -180..180
// degree range by a tiny amount don't get wrapped. This prevents points that
// have drifted from their original location along the 180th meridian (due to
// floating point error) from changing their sign.
var SPI = 3.14159265359;
;// CONCATENATED MODULE: ./node_modules/proj4/lib/constants/PrimeMeridian.js
var PrimeMeridian_exports = {};

PrimeMeridian_exports.greenwich = 0.0; //"0dE",
PrimeMeridian_exports.lisbon = -9.131906111111; //"9d07'54.862\"W",
PrimeMeridian_exports.paris = 2.337229166667; //"2d20'14.025\"E",
PrimeMeridian_exports.bogota = -74.080916666667; //"74d04'51.3\"W",
PrimeMeridian_exports.madrid = -3.687938888889; //"3d41'16.58\"W",
PrimeMeridian_exports.rome = 12.452333333333; //"12d27'8.4\"E",
PrimeMeridian_exports.bern = 7.439583333333; //"7d26'22.5\"E",
PrimeMeridian_exports.jakarta = 106.807719444444; //"106d48'27.79\"E",
PrimeMeridian_exports.ferro = -17.666666666667; //"17d40'W",
PrimeMeridian_exports.brussels = 4.367975; //"4d22'4.71\"E",
PrimeMeridian_exports.stockholm = 18.058277777778; //"18d3'29.8\"E",
PrimeMeridian_exports.athens = 23.7163375; //"23d42'58.815\"E",
PrimeMeridian_exports.oslo = 10.722916666667; //"10d43'22.5\"E"
;// CONCATENATED MODULE: ./node_modules/proj4/lib/constants/units.js
/* harmony default export */ const constants_units = ({
  ft: {
    to_meter: 0.3048
  },
  'us-ft': {
    to_meter: 1200 / 3937
  }
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/match.js
var ignoredChar = /[\s_\-\/\(\)]/g;
function match(obj, key) {
  if (obj[key]) {
    return obj[key];
  }
  var keys = Object.keys(obj);
  var lkey = key.toLowerCase().replace(ignoredChar, '');
  var i = -1;
  var testkey, processedKey;
  while (++i < keys.length) {
    testkey = keys[i];
    processedKey = testkey.toLowerCase().replace(ignoredChar, '');
    if (processedKey === lkey) {
      return obj[testkey];
    }
  }
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projString.js




/* harmony default export */ function projString(defData) {
  var self = {};
  var paramObj = defData.split('+').map(function (v) {
    return v.trim();
  }).filter(function (a) {
    return a;
  }).reduce(function (p, a) {
    var split = a.split('=');
    split.push(true);
    p[split[0].toLowerCase()] = split[1];
    return p;
  }, {});
  var paramName, paramVal, paramOutname;
  var params = {
    proj: 'projName',
    datum: 'datumCode',
    rf: function rf(v) {
      self.rf = parseFloat(v);
    },
    lat_0: function lat_0(v) {
      self.lat0 = v * D2R;
    },
    lat_1: function lat_1(v) {
      self.lat1 = v * D2R;
    },
    lat_2: function lat_2(v) {
      self.lat2 = v * D2R;
    },
    lat_ts: function lat_ts(v) {
      self.lat_ts = v * D2R;
    },
    lon_0: function lon_0(v) {
      self.long0 = v * D2R;
    },
    lon_1: function lon_1(v) {
      self.long1 = v * D2R;
    },
    lon_2: function lon_2(v) {
      self.long2 = v * D2R;
    },
    alpha: function alpha(v) {
      self.alpha = parseFloat(v) * D2R;
    },
    gamma: function gamma(v) {
      self.rectified_grid_angle = parseFloat(v);
    },
    lonc: function lonc(v) {
      self.longc = v * D2R;
    },
    x_0: function x_0(v) {
      self.x0 = parseFloat(v);
    },
    y_0: function y_0(v) {
      self.y0 = parseFloat(v);
    },
    k_0: function k_0(v) {
      self.k0 = parseFloat(v);
    },
    k: function k(v) {
      self.k0 = parseFloat(v);
    },
    a: function a(v) {
      self.a = parseFloat(v);
    },
    b: function b(v) {
      self.b = parseFloat(v);
    },
    r: function r(v) {
      self.a = self.b = parseFloat(v);
    },
    r_a: function r_a() {
      self.R_A = true;
    },
    zone: function zone(v) {
      self.zone = parseInt(v, 10);
    },
    south: function south() {
      self.utmSouth = true;
    },
    towgs84: function towgs84(v) {
      self.datum_params = v.split(",").map(function (a) {
        return parseFloat(a);
      });
    },
    to_meter: function to_meter(v) {
      self.to_meter = parseFloat(v);
    },
    units: function units(v) {
      self.units = v;
      var unit = match(constants_units, v);
      if (unit) {
        self.to_meter = unit.to_meter;
      }
    },
    from_greenwich: function from_greenwich(v) {
      self.from_greenwich = v * D2R;
    },
    pm: function pm(v) {
      var pm = match(PrimeMeridian_exports, v);
      self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R;
    },
    nadgrids: function nadgrids(v) {
      if (v === '@null') {
        self.datumCode = 'none';
      } else {
        self.nadgrids = v;
      }
    },
    axis: function axis(v) {
      var legalAxis = "ewnsud";
      if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
        self.axis = v;
      }
    },
    approx: function approx() {
      self.approx = true;
    }
  };
  for (paramName in paramObj) {
    paramVal = paramObj[paramName];
    if (paramName in params) {
      paramOutname = params[paramName];
      if (typeof paramOutname === 'function') {
        paramOutname(paramVal);
      } else {
        self[paramOutname] = paramVal;
      }
    } else {
      self[paramName] = paramVal;
    }
  }
  if (typeof self.datumCode === 'string' && self.datumCode !== "WGS84") {
    self.datumCode = self.datumCode.toLowerCase();
  }
  return self;
}
;// CONCATENATED MODULE: ./node_modules/wkt-parser/parser.js
/* harmony default export */ const parser = (parseString);
var NEUTRAL = 1;
var KEYWORD = 2;
var NUMBER = 3;
var QUOTED = 4;
var AFTERQUOTE = 5;
var ENDED = -1;
var whitespace = /\s/;
var latin = /[A-Za-z]/;
var keyword = /[A-Za-z84_]/;
var endThings = /[,\]]/;
var digets = /[\d\.E\-\+]/;
// const ignoredChar = /[\s_\-\/\(\)]/g;
function Parser(text) {
  if (typeof text !== 'string') {
    throw new Error('not a string');
  }
  this.text = text.trim();
  this.level = 0;
  this.place = 0;
  this.root = null;
  this.stack = [];
  this.currentObject = null;
  this.state = NEUTRAL;
}
Parser.prototype.readCharicter = function () {
  var char = this.text[this.place++];
  if (this.state !== QUOTED) {
    while (whitespace.test(char)) {
      if (this.place >= this.text.length) {
        return;
      }
      char = this.text[this.place++];
    }
  }
  switch (this.state) {
    case NEUTRAL:
      return this.neutral(char);
    case KEYWORD:
      return this.keyword(char);
    case QUOTED:
      return this.quoted(char);
    case AFTERQUOTE:
      return this.afterquote(char);
    case NUMBER:
      return this.number(char);
    case ENDED:
      return;
  }
};
Parser.prototype.afterquote = function (char) {
  if (char === '"') {
    this.word += '"';
    this.state = QUOTED;
    return;
  }
  if (endThings.test(char)) {
    this.word = this.word.trim();
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' + char + '" in afterquote yet, index ' + this.place);
};
Parser.prototype.afterItem = function (char) {
  if (char === ',') {
    if (this.word !== null) {
      this.currentObject.push(this.word);
    }
    this.word = null;
    this.state = NEUTRAL;
    return;
  }
  if (char === ']') {
    this.level--;
    if (this.word !== null) {
      this.currentObject.push(this.word);
      this.word = null;
    }
    this.state = NEUTRAL;
    this.currentObject = this.stack.pop();
    if (!this.currentObject) {
      this.state = ENDED;
    }
    return;
  }
};
Parser.prototype.number = function (char) {
  if (digets.test(char)) {
    this.word += char;
    return;
  }
  if (endThings.test(char)) {
    this.word = parseFloat(this.word);
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' + char + '" in number yet, index ' + this.place);
};
Parser.prototype.quoted = function (char) {
  if (char === '"') {
    this.state = AFTERQUOTE;
    return;
  }
  this.word += char;
  return;
};
Parser.prototype.keyword = function (char) {
  if (keyword.test(char)) {
    this.word += char;
    return;
  }
  if (char === '[') {
    var newObjects = [];
    newObjects.push(this.word);
    this.level++;
    if (this.root === null) {
      this.root = newObjects;
    } else {
      this.currentObject.push(newObjects);
    }
    this.stack.push(this.currentObject);
    this.currentObject = newObjects;
    this.state = NEUTRAL;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' + char + '" in keyword yet, index ' + this.place);
};
Parser.prototype.neutral = function (char) {
  if (latin.test(char)) {
    this.word = char;
    this.state = KEYWORD;
    return;
  }
  if (char === '"') {
    this.word = '';
    this.state = QUOTED;
    return;
  }
  if (digets.test(char)) {
    this.word = char;
    this.state = NUMBER;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' + char + '" in neutral yet, index ' + this.place);
};
Parser.prototype.output = function () {
  while (this.place < this.text.length) {
    this.readCharicter();
  }
  if (this.state === ENDED) {
    return this.root;
  }
  throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
};
function parseString(txt) {
  var parser = new Parser(txt);
  return parser.output();
}
;// CONCATENATED MODULE: ./node_modules/wkt-parser/process.js
function mapit(obj, key, value) {
  if (Array.isArray(key)) {
    value.unshift(key);
    key = null;
  }
  var thing = key ? {} : obj;
  var out = value.reduce(function (newObj, item) {
    sExpr(item, newObj);
    return newObj;
  }, thing);
  if (key) {
    obj[key] = out;
  }
}
function sExpr(v, obj) {
  if (!Array.isArray(v)) {
    obj[v] = true;
    return;
  }
  var key = v.shift();
  if (key === 'PARAMETER') {
    key = v.shift();
  }
  if (v.length === 1) {
    if (Array.isArray(v[0])) {
      obj[key] = {};
      sExpr(v[0], obj[key]);
      return;
    }
    obj[key] = v[0];
    return;
  }
  if (!v.length) {
    obj[key] = true;
    return;
  }
  if (key === 'TOWGS84') {
    obj[key] = v;
    return;
  }
  if (key === 'AXIS') {
    if (!(key in obj)) {
      obj[key] = [];
    }
    obj[key].push(v);
    return;
  }
  if (!Array.isArray(key)) {
    obj[key] = {};
  }
  var i;
  switch (key) {
    case 'UNIT':
    case 'PRIMEM':
    case 'VERT_DATUM':
      obj[key] = {
        name: v[0].toLowerCase(),
        convert: v[1]
      };
      if (v.length === 3) {
        sExpr(v[2], obj[key]);
      }
      return;
    case 'SPHEROID':
    case 'ELLIPSOID':
      obj[key] = {
        name: v[0],
        a: v[1],
        rf: v[2]
      };
      if (v.length === 4) {
        sExpr(v[3], obj[key]);
      }
      return;
    case 'PROJECTEDCRS':
    case 'PROJCRS':
    case 'GEOGCS':
    case 'GEOCCS':
    case 'PROJCS':
    case 'LOCAL_CS':
    case 'GEODCRS':
    case 'GEODETICCRS':
    case 'GEODETICDATUM':
    case 'EDATUM':
    case 'ENGINEERINGDATUM':
    case 'VERT_CS':
    case 'VERTCRS':
    case 'VERTICALCRS':
    case 'COMPD_CS':
    case 'COMPOUNDCRS':
    case 'ENGINEERINGCRS':
    case 'ENGCRS':
    case 'FITTED_CS':
    case 'LOCAL_DATUM':
    case 'DATUM':
      v[0] = ['name', v[0]];
      mapit(obj, key, v);
      return;
    default:
      i = -1;
      while (++i < v.length) {
        if (!Array.isArray(v[i])) {
          return sExpr(v, obj[key]);
        }
      }
      return mapit(obj, key, v);
  }
}
;// CONCATENATED MODULE: ./node_modules/wkt-parser/index.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var wkt_parser_D2R = 0.01745329251994329577;


function rename(obj, params) {
  var outName = params[0];
  var inName = params[1];
  if (!(outName in obj) && inName in obj) {
    obj[outName] = obj[inName];
    if (params.length === 3) {
      obj[outName] = params[2](obj[outName]);
    }
  }
}
function d2r(input) {
  return input * wkt_parser_D2R;
}
function cleanWKT(wkt) {
  if (wkt.type === 'GEOGCS') {
    wkt.projName = 'longlat';
  } else if (wkt.type === 'LOCAL_CS') {
    wkt.projName = 'identity';
    wkt.local = true;
  } else {
    if (_typeof(wkt.PROJECTION) === 'object') {
      wkt.projName = Object.keys(wkt.PROJECTION)[0];
    } else {
      wkt.projName = wkt.PROJECTION;
    }
  }
  if (wkt.AXIS) {
    var axisOrder = '';
    for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
      var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()];
      if (axis[0].indexOf('north') !== -1 || (axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'north') {
        axisOrder += 'n';
      } else if (axis[0].indexOf('south') !== -1 || (axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'south') {
        axisOrder += 's';
      } else if (axis[0].indexOf('east') !== -1 || (axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'east') {
        axisOrder += 'e';
      } else if (axis[0].indexOf('west') !== -1 || (axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'west') {
        axisOrder += 'w';
      }
    }
    if (axisOrder.length === 2) {
      axisOrder += 'u';
    }
    if (axisOrder.length === 3) {
      wkt.axis = axisOrder;
    }
  }
  if (wkt.UNIT) {
    wkt.units = wkt.UNIT.name.toLowerCase();
    if (wkt.units === 'metre') {
      wkt.units = 'meter';
    }
    if (wkt.UNIT.convert) {
      if (wkt.type === 'GEOGCS') {
        if (wkt.DATUM && wkt.DATUM.SPHEROID) {
          wkt.to_meter = wkt.UNIT.convert * wkt.DATUM.SPHEROID.a;
        }
      } else {
        wkt.to_meter = wkt.UNIT.convert;
      }
    }
  }
  var geogcs = wkt.GEOGCS;
  if (wkt.type === 'GEOGCS') {
    geogcs = wkt;
  }
  if (geogcs) {
    //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
    //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
    //}
    if (geogcs.DATUM) {
      wkt.datumCode = geogcs.DATUM.name.toLowerCase();
    } else {
      wkt.datumCode = geogcs.name.toLowerCase();
    }
    if (wkt.datumCode.slice(0, 2) === 'd_') {
      wkt.datumCode = wkt.datumCode.slice(2);
    }
    if (wkt.datumCode === 'new_zealand_geodetic_datum_1949' || wkt.datumCode === 'new_zealand_1949') {
      wkt.datumCode = 'nzgd49';
    }
    if (wkt.datumCode === 'wgs_1984' || wkt.datumCode === 'world_geodetic_system_1984') {
      if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
        wkt.sphere = true;
      }
      wkt.datumCode = 'wgs84';
    }
    if (wkt.datumCode.slice(-6) === '_ferro') {
      wkt.datumCode = wkt.datumCode.slice(0, -6);
    }
    if (wkt.datumCode.slice(-8) === '_jakarta') {
      wkt.datumCode = wkt.datumCode.slice(0, -8);
    }
    if (~wkt.datumCode.indexOf('belge')) {
      wkt.datumCode = 'rnb72';
    }
    if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
      wkt.ellps = geogcs.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\_18/, 'clrk');
      if (wkt.ellps.toLowerCase().slice(0, 13) === 'international') {
        wkt.ellps = 'intl';
      }
      wkt.a = geogcs.DATUM.SPHEROID.a;
      wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
    }
    if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
      wkt.datum_params = geogcs.DATUM.TOWGS84;
    }
    if (~wkt.datumCode.indexOf('osgb_1936')) {
      wkt.datumCode = 'osgb36';
    }
    if (~wkt.datumCode.indexOf('osni_1952')) {
      wkt.datumCode = 'osni52';
    }
    if (~wkt.datumCode.indexOf('tm65') || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {
      wkt.datumCode = 'ire65';
    }
    if (wkt.datumCode === 'ch1903+') {
      wkt.datumCode = 'ch1903';
    }
    if (~wkt.datumCode.indexOf('israel')) {
      wkt.datumCode = 'isr93';
    }
  }
  if (wkt.b && !isFinite(wkt.b)) {
    wkt.b = wkt.a;
  }
  function toMeter(input) {
    var ratio = wkt.to_meter || 1;
    return input * ratio;
  }
  var renamer = function renamer(a) {
    return rename(wkt, a);
  };
  var list = [['standard_parallel_1', 'Standard_Parallel_1'], ['standard_parallel_1', 'Latitude of 1st standard parallel'], ['standard_parallel_2', 'Standard_Parallel_2'], ['standard_parallel_2', 'Latitude of 2nd standard parallel'], ['false_easting', 'False_Easting'], ['false_easting', 'False easting'], ['false-easting', 'Easting at false origin'], ['false_northing', 'False_Northing'], ['false_northing', 'False northing'], ['false_northing', 'Northing at false origin'], ['central_meridian', 'Central_Meridian'], ['central_meridian', 'Longitude of natural origin'], ['central_meridian', 'Longitude of false origin'], ['latitude_of_origin', 'Latitude_Of_Origin'], ['latitude_of_origin', 'Central_Parallel'], ['latitude_of_origin', 'Latitude of natural origin'], ['latitude_of_origin', 'Latitude of false origin'], ['scale_factor', 'Scale_Factor'], ['k0', 'scale_factor'], ['latitude_of_center', 'Latitude_Of_Center'], ['latitude_of_center', 'Latitude_of_center'], ['lat0', 'latitude_of_center', d2r], ['longitude_of_center', 'Longitude_Of_Center'], ['longitude_of_center', 'Longitude_of_center'], ['longc', 'longitude_of_center', d2r], ['x0', 'false_easting', toMeter], ['y0', 'false_northing', toMeter], ['long0', 'central_meridian', d2r], ['lat0', 'latitude_of_origin', d2r], ['lat0', 'standard_parallel_1', d2r], ['lat1', 'standard_parallel_1', d2r], ['lat2', 'standard_parallel_2', d2r], ['azimuth', 'Azimuth'], ['alpha', 'azimuth', d2r], ['srsCode', 'name']];
  list.forEach(renamer);
  if (!wkt.long0 && wkt.longc && (wkt.projName === 'Albers_Conic_Equal_Area' || wkt.projName === 'Lambert_Azimuthal_Equal_Area')) {
    wkt.long0 = wkt.longc;
  }
  if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === 'Stereographic_South_Pole' || wkt.projName === 'Polar Stereographic (variant B)')) {
    wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
    wkt.lat_ts = wkt.lat1;
  } else if (!wkt.lat_ts && wkt.lat0 && wkt.projName === 'Polar_Stereographic') {
    wkt.lat_ts = wkt.lat0;
    wkt.lat0 = d2r(wkt.lat0 > 0 ? 90 : -90);
  }
}
/* harmony default export */ function wkt_parser(wkt) {
  var lisp = parser(wkt);
  var type = lisp.shift();
  var name = lisp.shift();
  lisp.unshift(['name', name]);
  lisp.unshift(['type', type]);
  var obj = {};
  sExpr(lisp, obj);
  cleanWKT(obj);
  return obj;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/defs.js



function defs(name) {
  /*global console*/
  var that = this;
  if (arguments.length === 2) {
    var def = arguments[1];
    if (typeof def === 'string') {
      if (def.charAt(0) === '+') {
        defs[name] = projString(arguments[1]);
      } else {
        defs[name] = wkt_parser(arguments[1]);
      }
    } else {
      defs[name] = def;
    }
  } else if (arguments.length === 1) {
    if (Array.isArray(name)) {
      return name.map(function (v) {
        if (Array.isArray(v)) {
          defs.apply(that, v);
        } else {
          defs(v);
        }
      });
    } else if (typeof name === 'string') {
      if (name in defs) {
        return defs[name];
      }
    } else if ('EPSG' in name) {
      defs['EPSG:' + name.EPSG] = name;
    } else if ('ESRI' in name) {
      defs['ESRI:' + name.ESRI] = name;
    } else if ('IAU2000' in name) {
      defs['IAU2000:' + name.IAU2000] = name;
    } else {
      console.log(name);
    }
    return;
  }
}
global(defs);
/* harmony default export */ const lib_defs = (defs);
;// CONCATENATED MODULE: ./node_modules/proj4/lib/parseCode.js




function testObj(code) {
  return typeof code === 'string';
}
function testDef(code) {
  return code in lib_defs;
}
var codeWords = ['PROJECTEDCRS', 'PROJCRS', 'GEOGCS', 'GEOCCS', 'PROJCS', 'LOCAL_CS', 'GEODCRS', 'GEODETICCRS', 'GEODETICDATUM', 'ENGCRS', 'ENGINEERINGCRS'];
function testWKT(code) {
  return codeWords.some(function (word) {
    return code.indexOf(word) > -1;
  });
}
var codes = ['3857', '900913', '3785', '102113'];
function checkMercator(item) {
  var auth = match(item, 'authority');
  if (!auth) {
    return;
  }
  var code = match(auth, 'epsg');
  return code && codes.indexOf(code) > -1;
}
function checkProjStr(item) {
  var ext = match(item, 'extension');
  if (!ext) {
    return;
  }
  return match(ext, 'proj4');
}
function testProj(code) {
  return code[0] === '+';
}
function parse(code) {
  if (testObj(code)) {
    //check to see if this is a WKT string
    if (testDef(code)) {
      return lib_defs[code];
    }
    if (testWKT(code)) {
      var out = wkt_parser(code);
      // test of spetial case, due to this being a very common and often malformed
      if (checkMercator(out)) {
        return lib_defs['EPSG:3857'];
      }
      var maybeProjStr = checkProjStr(out);
      if (maybeProjStr) {
        return projString(maybeProjStr);
      }
      return out;
    }
    if (testProj(code)) {
      return projString(code);
    }
  } else {
    return code;
  }
}
/* harmony default export */ const parseCode = (parse);
;// CONCATENATED MODULE: ./node_modules/proj4/lib/extend.js
/* harmony default export */ function extend(destination, source) {
  destination = destination || {};
  var value, property;
  if (!source) {
    return destination;
  }
  for (property in source) {
    value = source[property];
    if (value !== undefined) {
      destination[property] = value;
    }
  }
  return destination;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/msfnz.js
/* harmony default export */ function msfnz(eccent, sinphi, cosphi) {
  var con = eccent * sinphi;
  return cosphi / Math.sqrt(1 - con * con);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/sign.js
/* harmony default export */ function sign(x) {
  return x < 0 ? -1 : 1;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/adjust_lon.js


/* harmony default export */ function adjust_lon(x) {
  return Math.abs(x) <= SPI ? x : x - sign(x) * TWO_PI;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/tsfnz.js

/* harmony default export */ function tsfnz(eccent, phi, sinphi) {
  var con = eccent * sinphi;
  var com = 0.5 * eccent;
  con = Math.pow((1 - con) / (1 + con), com);
  return Math.tan(0.5 * (HALF_PI - phi)) / con;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/phi2z.js

/* harmony default export */ function phi2z(eccent, ts) {
  var eccnth = 0.5 * eccent;
  var con, dphi;
  var phi = HALF_PI - 2 * Math.atan(ts);
  for (var i = 0; i <= 15; i++) {
    con = eccent * Math.sin(phi);
    dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi;
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }
  //console.log("phi2z has NoConvergence");
  return -9999;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/merc.js





function init() {
  var con = this.b / this.a;
  this.es = 1 - con * con;
  if (!('x0' in this)) {
    this.x0 = 0;
  }
  if (!('y0' in this)) {
    this.y0 = 0;
  }
  this.e = Math.sqrt(this.es);
  if (this.lat_ts) {
    if (this.sphere) {
      this.k0 = Math.cos(this.lat_ts);
    } else {
      this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  } else {
    if (!this.k0) {
      if (this.k) {
        this.k0 = this.k;
      } else {
        this.k0 = 1;
      }
    }
  }
}

/* Mercator forward equations--mapping lat,long to x,y
  --------------------------------------------------*/

function forward(p) {
  var lon = p.x;
  var lat = p.y;
  // convert to radians
  if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
    return null;
  }
  var x, y;
  if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    return null;
  } else {
    if (this.sphere) {
      x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
      y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
    } else {
      var sinphi = Math.sin(lat);
      var ts = tsfnz(this.e, lat, sinphi);
      x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
      y = this.y0 - this.a * this.k0 * Math.log(ts);
    }
    p.x = x;
    p.y = y;
    return p;
  }
}

/* Mercator inverse equations--mapping x,y to lat/long
  --------------------------------------------------*/
function inverse(p) {
  var x = p.x - this.x0;
  var y = p.y - this.y0;
  var lon, lat;
  if (this.sphere) {
    lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
  } else {
    var ts = Math.exp(-y / (this.a * this.k0));
    lat = phi2z(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  lon = adjust_lon(this.long0 + x / (this.a * this.k0));
  p.x = lon;
  p.y = lat;
  return p;
}
var names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
/* harmony default export */ const merc = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/longlat.js
function longlat_init() {
  //no-op for longlat
}
function identity(pt) {
  return pt;
}


var longlat_names = ["longlat", "identity"];
/* harmony default export */ const longlat = ({
  init: longlat_init,
  forward: identity,
  inverse: identity,
  names: longlat_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections.js


var projs = [merc, longlat];
var projections_names = {};
var projStore = [];
function add(proj, i) {
  var len = projStore.length;
  if (!proj.names) {
    console.log(i);
    return true;
  }
  projStore[len] = proj;
  proj.names.forEach(function (n) {
    projections_names[n.toLowerCase()] = len;
  });
  return this;
}

function get(name) {
  if (!name) {
    return false;
  }
  var n = name.toLowerCase();
  if (typeof projections_names[n] !== 'undefined' && projStore[projections_names[n]]) {
    return projStore[projections_names[n]];
  }
}
function start() {
  projs.forEach(add);
}
/* harmony default export */ const projections = ({
  start: start,
  add: add,
  get: get
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/constants/Ellipsoid.js
var Ellipsoid_exports = {};

Ellipsoid_exports.MERIT = {
  a: 6378137.0,
  rf: 298.257,
  ellipseName: "MERIT 1983"
};
Ellipsoid_exports.SGS85 = {
  a: 6378136.0,
  rf: 298.257,
  ellipseName: "Soviet Geodetic System 85"
};
Ellipsoid_exports.GRS80 = {
  a: 6378137.0,
  rf: 298.257222101,
  ellipseName: "GRS 1980(IUGG, 1980)"
};
Ellipsoid_exports.IAU76 = {
  a: 6378140.0,
  rf: 298.257,
  ellipseName: "IAU 1976"
};
Ellipsoid_exports.airy = {
  a: 6377563.396,
  b: 6356256.910,
  ellipseName: "Airy 1830"
};
Ellipsoid_exports.APL4 = {
  a: 6378137,
  rf: 298.25,
  ellipseName: "Appl. Physics. 1965"
};
Ellipsoid_exports.NWL9D = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "Naval Weapons Lab., 1965"
};
Ellipsoid_exports.mod_airy = {
  a: 6377340.189,
  b: 6356034.446,
  ellipseName: "Modified Airy"
};
Ellipsoid_exports.andrae = {
  a: 6377104.43,
  rf: 300.0,
  ellipseName: "Andrae 1876 (Den., Iclnd.)"
};
Ellipsoid_exports.aust_SA = {
  a: 6378160.0,
  rf: 298.25,
  ellipseName: "Australian Natl & S. Amer. 1969"
};
Ellipsoid_exports.GRS67 = {
  a: 6378160.0,
  rf: 298.2471674270,
  ellipseName: "GRS 67(IUGG 1967)"
};
Ellipsoid_exports.bessel = {
  a: 6377397.155,
  rf: 299.1528128,
  ellipseName: "Bessel 1841"
};
Ellipsoid_exports.bess_nam = {
  a: 6377483.865,
  rf: 299.1528128,
  ellipseName: "Bessel 1841 (Namibia)"
};
Ellipsoid_exports.clrk66 = {
  a: 6378206.4,
  b: 6356583.8,
  ellipseName: "Clarke 1866"
};
Ellipsoid_exports.clrk80 = {
  a: 6378249.145,
  rf: 293.4663,
  ellipseName: "Clarke 1880 mod."
};
Ellipsoid_exports.clrk80ign = {
  a: 6378249.2,
  b: 6356515,
  rf: 293.4660213,
  ellipseName: "Clarke 1880 (IGN)"
};
Ellipsoid_exports.clrk58 = {
  a: 6378293.645208759,
  rf: 294.2606763692654,
  ellipseName: "Clarke 1858"
};
Ellipsoid_exports.CPM = {
  a: 6375738.7,
  rf: 334.29,
  ellipseName: "Comm. des Poids et Mesures 1799"
};
Ellipsoid_exports.delmbr = {
  a: 6376428.0,
  rf: 311.5,
  ellipseName: "Delambre 1810 (Belgium)"
};
Ellipsoid_exports.engelis = {
  a: 6378136.05,
  rf: 298.2566,
  ellipseName: "Engelis 1985"
};
Ellipsoid_exports.evrst30 = {
  a: 6377276.345,
  rf: 300.8017,
  ellipseName: "Everest 1830"
};
Ellipsoid_exports.evrst48 = {
  a: 6377304.063,
  rf: 300.8017,
  ellipseName: "Everest 1948"
};
Ellipsoid_exports.evrst56 = {
  a: 6377301.243,
  rf: 300.8017,
  ellipseName: "Everest 1956"
};
Ellipsoid_exports.evrst69 = {
  a: 6377295.664,
  rf: 300.8017,
  ellipseName: "Everest 1969"
};
Ellipsoid_exports.evrstSS = {
  a: 6377298.556,
  rf: 300.8017,
  ellipseName: "Everest (Sabah & Sarawak)"
};
Ellipsoid_exports.fschr60 = {
  a: 6378166.0,
  rf: 298.3,
  ellipseName: "Fischer (Mercury Datum) 1960"
};
Ellipsoid_exports.fschr60m = {
  a: 6378155.0,
  rf: 298.3,
  ellipseName: "Fischer 1960"
};
Ellipsoid_exports.fschr68 = {
  a: 6378150.0,
  rf: 298.3,
  ellipseName: "Fischer 1968"
};
Ellipsoid_exports.helmert = {
  a: 6378200.0,
  rf: 298.3,
  ellipseName: "Helmert 1906"
};
Ellipsoid_exports.hough = {
  a: 6378270.0,
  rf: 297.0,
  ellipseName: "Hough"
};
Ellipsoid_exports.intl = {
  a: 6378388.0,
  rf: 297.0,
  ellipseName: "International 1909 (Hayford)"
};
Ellipsoid_exports.kaula = {
  a: 6378163.0,
  rf: 298.24,
  ellipseName: "Kaula 1961"
};
Ellipsoid_exports.lerch = {
  a: 6378139.0,
  rf: 298.257,
  ellipseName: "Lerch 1979"
};
Ellipsoid_exports.mprts = {
  a: 6397300.0,
  rf: 191.0,
  ellipseName: "Maupertius 1738"
};
Ellipsoid_exports.new_intl = {
  a: 6378157.5,
  b: 6356772.2,
  ellipseName: "New International 1967"
};
Ellipsoid_exports.plessis = {
  a: 6376523.0,
  rf: 6355863.0,
  ellipseName: "Plessis 1817 (France)"
};
Ellipsoid_exports.krass = {
  a: 6378245.0,
  rf: 298.3,
  ellipseName: "Krassovsky, 1942"
};
Ellipsoid_exports.SEasia = {
  a: 6378155.0,
  b: 6356773.3205,
  ellipseName: "Southeast Asia"
};
Ellipsoid_exports.walbeck = {
  a: 6376896.0,
  b: 6355834.8467,
  ellipseName: "Walbeck"
};
Ellipsoid_exports.WGS60 = {
  a: 6378165.0,
  rf: 298.3,
  ellipseName: "WGS 60"
};
Ellipsoid_exports.WGS66 = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "WGS 66"
};
Ellipsoid_exports.WGS7 = {
  a: 6378135.0,
  rf: 298.26,
  ellipseName: "WGS 72"
};
var WGS84 = Ellipsoid_exports.WGS84 = {
  a: 6378137.0,
  rf: 298.257223563,
  ellipseName: "WGS 84"
};
Ellipsoid_exports.sphere = {
  a: 6370997.0,
  b: 6370997.0,
  ellipseName: "Normal Sphere (r=6370997)"
};
;// CONCATENATED MODULE: ./node_modules/proj4/lib/deriveConstants.js



function eccentricity(a, b, rf, R_A) {
  var a2 = a * a; // used in geocentric
  var b2 = b * b; // used in geocentric
  var es = (a2 - b2) / a2; // e ^ 2
  var e = 0;
  if (R_A) {
    a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
    a2 = a * a;
    es = 0;
  } else {
    e = Math.sqrt(es); // eccentricity
  }
  var ep2 = (a2 - b2) / b2; // used in geocentric
  return {
    es: es,
    e: e,
    ep2: ep2
  };
}
function sphere(a, b, rf, ellps, sphere) {
  if (!a) {
    // do we have an ellipsoid?
    var ellipse = match(Ellipsoid_exports, ellps);
    if (!ellipse) {
      ellipse = WGS84;
    }
    a = ellipse.a;
    b = ellipse.b;
    rf = ellipse.rf;
  }
  if (rf && !b) {
    b = (1.0 - 1.0 / rf) * a;
  }
  if (rf === 0 || Math.abs(a - b) < EPSLN) {
    sphere = true;
    b = a;
  }
  return {
    a: a,
    b: b,
    rf: rf,
    sphere: sphere
  };
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/constants/Datum.js
var Datum_exports = {};

Datum_exports.wgs84 = {
  towgs84: "0,0,0",
  ellipse: "WGS84",
  datumName: "WGS84"
};
Datum_exports.ch1903 = {
  towgs84: "674.374,15.056,405.346",
  ellipse: "bessel",
  datumName: "swiss"
};
Datum_exports.ggrs87 = {
  towgs84: "-199.87,74.79,246.62",
  ellipse: "GRS80",
  datumName: "Greek_Geodetic_Reference_System_1987"
};
Datum_exports.nad83 = {
  towgs84: "0,0,0",
  ellipse: "GRS80",
  datumName: "North_American_Datum_1983"
};
Datum_exports.nad27 = {
  nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
  ellipse: "clrk66",
  datumName: "North_American_Datum_1927"
};
Datum_exports.potsdam = {
  towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
  ellipse: "bessel",
  datumName: "Potsdam Rauenberg 1950 DHDN"
};
Datum_exports.carthage = {
  towgs84: "-263.0,6.0,431.0",
  ellipse: "clark80",
  datumName: "Carthage 1934 Tunisia"
};
Datum_exports.hermannskogel = {
  towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
  ellipse: "bessel",
  datumName: "Hermannskogel"
};
Datum_exports.militargeographische_institut = {
  towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
  ellipse: "bessel",
  datumName: "Militar-Geographische Institut"
};
Datum_exports.osni52 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "airy",
  datumName: "Irish National"
};
Datum_exports.ire65 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "mod_airy",
  datumName: "Ireland 1965"
};
Datum_exports.rassadiran = {
  towgs84: "-133.63,-157.5,-158.62",
  ellipse: "intl",
  datumName: "Rassadiran"
};
Datum_exports.nzgd49 = {
  towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
  ellipse: "intl",
  datumName: "New Zealand Geodetic Datum 1949"
};
Datum_exports.osgb36 = {
  towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
  ellipse: "airy",
  datumName: "Airy 1830"
};
Datum_exports.s_jtsk = {
  towgs84: "589,76,480",
  ellipse: 'bessel',
  datumName: 'S-JTSK (Ferro)'
};
Datum_exports.beduaram = {
  towgs84: '-106,-87,188',
  ellipse: 'clrk80',
  datumName: 'Beduaram'
};
Datum_exports.gunung_segara = {
  towgs84: '-403,684,41',
  ellipse: 'bessel',
  datumName: 'Gunung Segara Jakarta'
};
Datum_exports.rnb72 = {
  towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
  ellipse: "intl",
  datumName: "Reseau National Belge 1972"
};
;// CONCATENATED MODULE: ./node_modules/proj4/lib/datum.js

function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
  var out = {};
  if (datumCode === undefined || datumCode === 'none') {
    out.datum_type = PJD_NODATUM;
  } else {
    out.datum_type = PJD_WGS84;
  }
  if (datum_params) {
    out.datum_params = datum_params.map(parseFloat);
    if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
      out.datum_type = PJD_3PARAM;
    }
    if (out.datum_params.length > 3) {
      if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
        out.datum_type = PJD_7PARAM;
        out.datum_params[3] *= SEC_TO_RAD;
        out.datum_params[4] *= SEC_TO_RAD;
        out.datum_params[5] *= SEC_TO_RAD;
        out.datum_params[6] = out.datum_params[6] / 1000000.0 + 1.0;
      }
    }
  }
  if (nadgrids) {
    out.datum_type = PJD_GRIDSHIFT;
    out.grids = nadgrids;
  }
  out.a = a; //datum object also uses these values
  out.b = b;
  out.es = es;
  out.ep2 = ep2;
  return out;
}
/* harmony default export */ const lib_datum = (datum);
;// CONCATENATED MODULE: ./node_modules/proj4/lib/nadgrid.js
/**
 * Resources for details of NTv2 file formats:
 * - https://web.archive.org/web/20140127204822if_/http://www.mgs.gov.on.ca:80/stdprodconsume/groups/content/@mgs/@iandit/documents/resourcelist/stel02_047447.pdf
 * - http://mimaka.com/help/gs/html/004_NTV2%20Data%20Format.htm
 */

var loadedNadgrids = {};

/**
 * Load a binary NTv2 file (.gsb) to a key that can be used in a proj string like +nadgrids=<key>. Pass the NTv2 file
 * as an ArrayBuffer.
 */
function nadgrid(key, data) {
  var view = new DataView(data);
  var isLittleEndian = detectLittleEndian(view);
  var header = readHeader(view, isLittleEndian);
  var subgrids = readSubgrids(view, header, isLittleEndian);
  var nadgrid = {
    header: header,
    subgrids: subgrids
  };
  loadedNadgrids[key] = nadgrid;
  return nadgrid;
}

/**
 * Given a proj4 value for nadgrids, return an array of loaded grids
 */
function getNadgrids(nadgrids) {
  // Format details: http://proj.maptools.org/gen_parms.html
  if (nadgrids === undefined) {
    return null;
  }
  var grids = nadgrids.split(',');
  return grids.map(parseNadgridString);
}
function parseNadgridString(value) {
  if (value.length === 0) {
    return null;
  }
  var optional = value[0] === '@';
  if (optional) {
    value = value.slice(1);
  }
  if (value === 'null') {
    return {
      name: 'null',
      mandatory: !optional,
      grid: null,
      isNull: true
    };
  }
  return {
    name: value,
    mandatory: !optional,
    grid: loadedNadgrids[value] || null,
    isNull: false
  };
}
function secondsToRadians(seconds) {
  return seconds / 3600 * Math.PI / 180;
}
function detectLittleEndian(view) {
  var nFields = view.getInt32(8, false);
  if (nFields === 11) {
    return false;
  }
  nFields = view.getInt32(8, true);
  if (nFields !== 11) {
    console.warn('Failed to detect nadgrid endian-ness, defaulting to little-endian');
  }
  return true;
}
function readHeader(view, isLittleEndian) {
  return {
    nFields: view.getInt32(8, isLittleEndian),
    nSubgridFields: view.getInt32(24, isLittleEndian),
    nSubgrids: view.getInt32(40, isLittleEndian),
    shiftType: decodeString(view, 56, 56 + 8).trim(),
    fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
    fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
    toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
    toSemiMinorAxis: view.getFloat64(168, isLittleEndian)
  };
}
function decodeString(view, start, end) {
  return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start, end)));
}
function readSubgrids(view, header, isLittleEndian) {
  var gridOffset = 176;
  var grids = [];
  for (var i = 0; i < header.nSubgrids; i++) {
    var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
    var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian);
    var lngColumnCount = Math.round(1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval);
    var latColumnCount = Math.round(1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval);
    // Proj4 operates on radians whereas the coordinates are in seconds in the grid
    grids.push({
      ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
      del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
      lim: [lngColumnCount, latColumnCount],
      count: subHeader.gridNodeCount,
      cvs: mapNodes(nodes)
    });
    gridOffset += 176 + subHeader.gridNodeCount * 16;
  }
  return grids;
}
function mapNodes(nodes) {
  return nodes.map(function (r) {
    return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];
  });
}
function readGridHeader(view, offset, isLittleEndian) {
  return {
    name: decodeString(view, offset + 8, offset + 16).trim(),
    parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
    lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
    upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
    lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
    upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
    latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
    longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
    gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
  };
}
function readGridNodes(view, offset, gridHeader, isLittleEndian) {
  var nodesOffset = offset + 176;
  var gridRecordLength = 16;
  var gridShiftRecords = [];
  for (var i = 0; i < gridHeader.gridNodeCount; i++) {
    var record = {
      latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
      longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian),
      latitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian),
      longitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian)
    };
    gridShiftRecords.push(record);
  }
  return gridShiftRecords;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/Proj.js
function Proj_typeof(o) { "@babel/helpers - typeof"; return Proj_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Proj_typeof(o); }








function Projection(srsCode, callback) {
  if (!(this instanceof Projection)) {
    return new Projection(srsCode);
  }
  callback = callback || function (error) {
    if (error) {
      throw error;
    }
  };
  var json = parseCode(srsCode);
  if (Proj_typeof(json) !== 'object') {
    callback(srsCode);
    return;
  }
  var ourProj = Projection.projections.get(json.projName);
  if (!ourProj) {
    callback(srsCode);
    return;
  }
  if (json.datumCode && json.datumCode !== 'none') {
    var datumDef = match(Datum_exports, json.datumCode);
    if (datumDef) {
      json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(',') : null);
      json.ellps = datumDef.ellipse;
      json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
    }
  }
  json.k0 = json.k0 || 1.0;
  json.axis = json.axis || 'enu';
  json.ellps = json.ellps || 'wgs84';
  json.lat1 = json.lat1 || json.lat0; // Lambert_Conformal_Conic_1SP, for example, needs this

  var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
  var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
  var nadgrids = getNadgrids(json.nadgrids);
  var datumObj = json.datum || lib_datum(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2, nadgrids);
  extend(this, json); // transfer everything over from the projection because we don't know what we'll need
  extend(this, ourProj); // transfer all the methods from the projection

  // copy the 4 things over we calculated in deriveConstants.sphere
  this.a = sphere_.a;
  this.b = sphere_.b;
  this.rf = sphere_.rf;
  this.sphere = sphere_.sphere;

  // copy the 3 things we calculated in deriveConstants.eccentricity
  this.es = ecc.es;
  this.e = ecc.e;
  this.ep2 = ecc.ep2;

  // add in the datum object
  this.datum = datumObj;

  // init the projection
  this.init();

  // legecy callback from back in the day when it went to spatialreference.org
  callback(null, this);
}
Projection.projections = projections;
Projection.projections.start();
/* harmony default export */ const Proj = (Projection);
;// CONCATENATED MODULE: ./node_modules/proj4/lib/datumUtils.js



function compareDatums(source, dest) {
  if (source.datum_type !== dest.datum_type) {
    return false; // false, datums are not equal
  } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.000000000050) {
    // the tolerance for es is to ensure that GRS80 and WGS84
    // are considered identical
    return false;
  } else if (source.datum_type === PJD_3PARAM) {
    return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2];
  } else if (source.datum_type === PJD_7PARAM) {
    return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6];
  } else {
    return true; // datums are equal
  }
} // cs_compare_datums()

/*
 * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
 * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
 * according to the current ellipsoid parameters.
 *
 *    Latitude  : Geodetic latitude in radians                     (input)
 *    Longitude : Geodetic longitude in radians                    (input)
 *    Height    : Geodetic height, in meters                       (input)
 *    X         : Calculated Geocentric X coordinate, in meters    (output)
 *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
 *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
 *
 */
function geodeticToGeocentric(p, es, a) {
  var Longitude = p.x;
  var Latitude = p.y;
  var Height = p.z ? p.z : 0; //Z value not always supplied

  var Rn; /*  Earth radius at location  */
  var Sin_Lat; /*  Math.sin(Latitude)  */
  var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
  var Cos_Lat; /*  Math.cos(Latitude)  */

  /*
   ** Don't blow up if Latitude is just a little out of the value
   ** range as it may just be a rounding issue.  Also removed longitude
   ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
   */
  if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
    Latitude = -HALF_PI;
  } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
    Latitude = HALF_PI;
  } else if (Latitude < -HALF_PI) {
    /* Latitude out of range */
    //..reportError('geocent:lat out of range:' + Latitude);
    return {
      x: -Infinity,
      y: -Infinity,
      z: p.z
    };
  } else if (Latitude > HALF_PI) {
    /* Latitude out of range */
    return {
      x: Infinity,
      y: Infinity,
      z: p.z
    };
  }
  if (Longitude > Math.PI) {
    Longitude -= 2 * Math.PI;
  }
  Sin_Lat = Math.sin(Latitude);
  Cos_Lat = Math.cos(Latitude);
  Sin2_Lat = Sin_Lat * Sin_Lat;
  Rn = a / Math.sqrt(1.0e0 - es * Sin2_Lat);
  return {
    x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
    y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
    z: (Rn * (1 - es) + Height) * Sin_Lat
  };
} // cs_geodetic_to_geocentric()

function geocentricToGeodetic(p, es, a, b) {
  /* local defintions and variables */
  /* end-criterium of loop, accuracy of sin(Latitude) */
  var genau = 1e-12;
  var genau2 = genau * genau;
  var maxiter = 30;
  var P; /* distance between semi-minor axis and location */
  var RR; /* distance between center and location */
  var CT; /* sin of geocentric latitude */
  var ST; /* cos of geocentric latitude */
  var RX;
  var RK;
  var RN; /* Earth radius at location */
  var CPHI0; /* cos of start or old geodetic latitude in iterations */
  var SPHI0; /* sin of start or old geodetic latitude in iterations */
  var CPHI; /* cos of searched geodetic latitude */
  var SPHI; /* sin of searched geodetic latitude */
  var SDPHI; /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
  var iter; /* # of continous iteration, max. 30 is always enough (s.a.) */

  var X = p.x;
  var Y = p.y;
  var Z = p.z ? p.z : 0.0; //Z value not always supplied
  var Longitude;
  var Latitude;
  var Height;
  P = Math.sqrt(X * X + Y * Y);
  RR = Math.sqrt(X * X + Y * Y + Z * Z);

  /*      special cases for latitude and longitude */
  if (P / a < genau) {
    /*  special case, if P=0. (X=0., Y=0.) */
    Longitude = 0.0;

    /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
     *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
    if (RR / a < genau) {
      Latitude = HALF_PI;
      Height = -b;
      return {
        x: p.x,
        y: p.y,
        z: p.z
      };
    }
  } else {
    /*  ellipsoidal (geodetic) longitude
     *  interval: -PI < Longitude <= +PI */
    Longitude = Math.atan2(Y, X);
  }

  /* --------------------------------------------------------------
   * Following iterative algorithm was developped by
   * "Institut for Erdmessung", University of Hannover, July 1988.
   * Internet: www.ife.uni-hannover.de
   * Iterative computation of CPHI,SPHI and Height.
   * Iteration of CPHI and SPHI to 10**-12 radian resp.
   * 2*10**-7 arcsec.
   * --------------------------------------------------------------
   */
  CT = Z / RR;
  ST = P / RR;
  RX = 1.0 / Math.sqrt(1.0 - es * (2.0 - es) * ST * ST);
  CPHI0 = ST * (1.0 - es) * RX;
  SPHI0 = CT * RX;
  iter = 0;

  /* loop to find sin(Latitude) resp. Latitude
   * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
  do {
    iter++;
    RN = a / Math.sqrt(1.0 - es * SPHI0 * SPHI0);

    /*  ellipsoidal (geodetic) height */
    Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - es * SPHI0 * SPHI0);
    RK = es * RN / (RN + Height);
    RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST);
    CPHI = ST * (1.0 - RK) * RX;
    SPHI = CT * RX;
    SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
    CPHI0 = CPHI;
    SPHI0 = SPHI;
  } while (SDPHI * SDPHI > genau2 && iter < maxiter);

  /*      ellipsoidal (geodetic) latitude */
  Latitude = Math.atan(SPHI / Math.abs(CPHI));
  return {
    x: Longitude,
    y: Latitude,
    z: Height
  };
} // cs_geocentric_to_geodetic()

/****************************************************************/
// pj_geocentic_to_wgs84( p )
//  p = point to transform in geocentric coordinates (x,y,z)

/** point object, nothing fancy, just allows values to be
    passed back and forth by reference rather than by value.
    Other point classes may be used as long as they have
    x and y properties, which will get modified in the transform method.
*/
function geocentricToWgs84(p, datum_type, datum_params) {
  if (datum_type === PJD_3PARAM) {
    // if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: p.x + datum_params[0],
      y: p.y + datum_params[1],
      z: p.z + datum_params[2]
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    // if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
      y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
      z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
    };
  }
} // cs_geocentric_to_wgs84

/****************************************************************/
// pj_geocentic_from_wgs84()
//  coordinate system definition,
//  point to transform in geocentric coordinates (x,y,z)
function geocentricFromWgs84(p, datum_type, datum_params) {
  if (datum_type === PJD_3PARAM) {
    //if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: p.x - datum_params[0],
      y: p.y - datum_params[1],
      z: p.z - datum_params[2]
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    var x_tmp = (p.x - Dx_BF) / M_BF;
    var y_tmp = (p.y - Dy_BF) / M_BF;
    var z_tmp = (p.z - Dz_BF) / M_BF;
    //if( x[io] === HUGE_VAL )
    //    continue;

    return {
      x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
      y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
      z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
    };
  } //cs_geocentric_from_wgs84()
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/datum_transform.js



function checkParams(type) {
  return type === PJD_3PARAM || type === PJD_7PARAM;
}
/* harmony default export */ function datum_transform(source, dest, point) {
  // Short cut if the datums are identical.
  if (compareDatums(source, dest)) {
    return point; // in this case, zero is sucess,
    // whereas cs_compare_datums returns 1 to indicate TRUE
    // confusing, should fix this
  }

  // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
  if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
    return point;
  }

  // If this datum requires grid shifts, then apply it to geodetic coordinates.
  var source_a = source.a;
  var source_es = source.es;
  if (source.datum_type === PJD_GRIDSHIFT) {
    var gridShiftCode = applyGridShift(source, false, point);
    if (gridShiftCode !== 0) {
      return undefined;
    }
    source_a = SRS_WGS84_SEMIMAJOR;
    source_es = SRS_WGS84_ESQUARED;
  }
  var dest_a = dest.a;
  var dest_b = dest.b;
  var dest_es = dest.es;
  if (dest.datum_type === PJD_GRIDSHIFT) {
    dest_a = SRS_WGS84_SEMIMAJOR;
    dest_b = SRS_WGS84_SEMIMINOR;
    dest_es = SRS_WGS84_ESQUARED;
  }

  // Do we need to go through geocentric coordinates?
  if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) {
    return point;
  }

  // Convert to geocentric coordinates.
  point = geodeticToGeocentric(point, source_es, source_a);
  // Convert between datums
  if (checkParams(source.datum_type)) {
    point = geocentricToWgs84(point, source.datum_type, source.datum_params);
  }
  if (checkParams(dest.datum_type)) {
    point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
  }
  point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);
  if (dest.datum_type === PJD_GRIDSHIFT) {
    var destGridShiftResult = applyGridShift(dest, true, point);
    if (destGridShiftResult !== 0) {
      return undefined;
    }
  }
  return point;
}
function applyGridShift(source, inverse, point) {
  if (source.grids === null || source.grids.length === 0) {
    console.log('Grid shift grids not found');
    return -1;
  }
  var input = {
    x: -point.x,
    y: point.y
  };
  var output = {
    x: Number.NaN,
    y: Number.NaN
  };
  var onlyMandatoryGrids = false;
  var attemptedGrids = [];
  outer: for (var i = 0; i < source.grids.length; i++) {
    var grid = source.grids[i];
    attemptedGrids.push(grid.name);
    if (grid.isNull) {
      output = input;
      break;
    }
    onlyMandatoryGrids = grid.mandatory;
    if (grid.grid === null) {
      if (grid.mandatory) {
        console.log("Unable to find mandatory grid '" + grid.name + "'");
        return -1;
      }
      continue;
    }
    var subgrids = grid.grid.subgrids;
    for (var j = 0, jj = subgrids.length; j < jj; j++) {
      var subgrid = subgrids[j];
      // skip tables that don't match our point at all
      var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 10000.0;
      var minX = subgrid.ll[0] - epsilon;
      var minY = subgrid.ll[1] - epsilon;
      var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
      var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
      if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) {
        continue;
      }
      output = applySubgridShift(input, inverse, subgrid);
      if (!isNaN(output.x)) {
        break outer;
      }
    }
  }
  if (isNaN(output.x)) {
    console.log("Failed to find a grid shift table for location '" + -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
    return -1;
  }
  point.x = -output.x;
  point.y = output.y;
  return 0;
}
function applySubgridShift(pin, inverse, ct) {
  var val = {
    x: Number.NaN,
    y: Number.NaN
  };
  if (isNaN(pin.x)) {
    return val;
  }
  var tb = {
    x: pin.x,
    y: pin.y
  };
  tb.x -= ct.ll[0];
  tb.y -= ct.ll[1];
  tb.x = adjust_lon(tb.x - Math.PI) + Math.PI;
  var t = nadInterpolate(tb, ct);
  if (inverse) {
    if (isNaN(t.x)) {
      return val;
    }
    t.x = tb.x - t.x;
    t.y = tb.y - t.y;
    var i = 9,
      tol = 1e-12;
    var dif, del;
    do {
      del = nadInterpolate(t, ct);
      if (isNaN(del.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      dif = {
        x: tb.x - (del.x + t.x),
        y: tb.y - (del.y + t.y)
      };
      t.x += dif.x;
      t.y += dif.y;
    } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
    if (i < 0) {
      console.log("Inverse grid shift iterator failed to converge.");
      return val;
    }
    val.x = adjust_lon(t.x + ct.ll[0]);
    val.y = t.y + ct.ll[1];
  } else {
    if (!isNaN(t.x)) {
      val.x = pin.x + t.x;
      val.y = pin.y + t.y;
    }
  }
  return val;
}
function nadInterpolate(pin, ct) {
  var t = {
    x: pin.x / ct.del[0],
    y: pin.y / ct.del[1]
  };
  var indx = {
    x: Math.floor(t.x),
    y: Math.floor(t.y)
  };
  var frct = {
    x: t.x - 1.0 * indx.x,
    y: t.y - 1.0 * indx.y
  };
  var val = {
    x: Number.NaN,
    y: Number.NaN
  };
  var inx;
  if (indx.x < 0 || indx.x >= ct.lim[0]) {
    return val;
  }
  if (indx.y < 0 || indx.y >= ct.lim[1]) {
    return val;
  }
  inx = indx.y * ct.lim[0] + indx.x;
  var f00 = {
    x: ct.cvs[inx][0],
    y: ct.cvs[inx][1]
  };
  inx++;
  var f10 = {
    x: ct.cvs[inx][0],
    y: ct.cvs[inx][1]
  };
  inx += ct.lim[0];
  var f11 = {
    x: ct.cvs[inx][0],
    y: ct.cvs[inx][1]
  };
  inx--;
  var f01 = {
    x: ct.cvs[inx][0],
    y: ct.cvs[inx][1]
  };
  var m11 = frct.x * frct.y,
    m10 = frct.x * (1.0 - frct.y),
    m00 = (1.0 - frct.x) * (1.0 - frct.y),
    m01 = (1.0 - frct.x) * frct.y;
  val.x = m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x;
  val.y = m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y;
  return val;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/adjust_axis.js
/* harmony default export */ function adjust_axis(crs, denorm, point) {
  var xin = point.x,
    yin = point.y,
    zin = point.z || 0.0;
  var v, t, i;
  var out = {};
  for (i = 0; i < 3; i++) {
    if (denorm && i === 2 && point.z === undefined) {
      continue;
    }
    if (i === 0) {
      v = xin;
      if ("ew".indexOf(crs.axis[i]) !== -1) {
        t = 'x';
      } else {
        t = 'y';
      }
    } else if (i === 1) {
      v = yin;
      if ("ns".indexOf(crs.axis[i]) !== -1) {
        t = 'y';
      } else {
        t = 'x';
      }
    } else {
      v = zin;
      t = 'z';
    }
    switch (crs.axis[i]) {
      case 'e':
        out[t] = v;
        break;
      case 'w':
        out[t] = -v;
        break;
      case 'n':
        out[t] = v;
        break;
      case 's':
        out[t] = -v;
        break;
      case 'u':
        if (point[t] !== undefined) {
          out.z = v;
        }
        break;
      case 'd':
        if (point[t] !== undefined) {
          out.z = -v;
        }
        break;
      default:
        //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
        return null;
    }
  }
  return out;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/toPoint.js
/* harmony default export */ function toPoint(array) {
  var out = {
    x: array[0],
    y: array[1]
  };
  if (array.length > 2) {
    out.z = array[2];
  }
  if (array.length > 3) {
    out.m = array[3];
  }
  return out;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/checkSanity.js
/* harmony default export */ function checkSanity(point) {
  checkCoord(point.x);
  checkCoord(point.y);
}
function checkCoord(num) {
  if (typeof Number.isFinite === 'function') {
    if (Number.isFinite(num)) {
      return;
    }
    throw new TypeError('coordinates must be finite numbers');
  }
  if (typeof num !== 'number' || num !== num || !isFinite(num)) {
    throw new TypeError('coordinates must be finite numbers');
  }
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/transform.js






function checkNotWGS(source, dest) {
  return (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM || source.datum.datum_type === PJD_GRIDSHIFT) && dest.datumCode !== 'WGS84' || (dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM || dest.datum.datum_type === PJD_GRIDSHIFT) && source.datumCode !== 'WGS84';
}
function transform(source, dest, point, enforceAxis) {
  var wgs84;
  if (Array.isArray(point)) {
    point = toPoint(point);
  } else {
    // Clone the point object so inputs don't get modified
    point = {
      x: point.x,
      y: point.y,
      z: point.z,
      m: point.m
    };
  }
  var hasZ = point.z !== undefined;
  checkSanity(point);
  // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
  if (source.datum && dest.datum && checkNotWGS(source, dest)) {
    wgs84 = new Proj('WGS84');
    point = transform(source, wgs84, point, enforceAxis);
    source = wgs84;
  }
  // DGR, 2010/11/12
  if (enforceAxis && source.axis !== 'enu') {
    point = adjust_axis(source, false, point);
  }
  // Transform source points to long/lat, if they aren't already.
  if (source.projName === 'longlat') {
    point = {
      x: point.x * D2R,
      y: point.y * D2R,
      z: point.z || 0
    };
  } else {
    if (source.to_meter) {
      point = {
        x: point.x * source.to_meter,
        y: point.y * source.to_meter,
        z: point.z || 0
      };
    }
    point = source.inverse(point); // Convert Cartesian to longlat
    if (!point) {
      return;
    }
  }
  // Adjust for the prime meridian if necessary
  if (source.from_greenwich) {
    point.x += source.from_greenwich;
  }

  // Convert datums if needed, and if possible.
  point = datum_transform(source.datum, dest.datum, point);
  if (!point) {
    return;
  }

  // Adjust for the prime meridian if necessary
  if (dest.from_greenwich) {
    point = {
      x: point.x - dest.from_greenwich,
      y: point.y,
      z: point.z || 0
    };
  }
  if (dest.projName === 'longlat') {
    // convert radians to decimal degrees
    point = {
      x: point.x * R2D,
      y: point.y * R2D,
      z: point.z || 0
    };
  } else {
    // else project
    point = dest.forward(point);
    if (dest.to_meter) {
      point = {
        x: point.x / dest.to_meter,
        y: point.y / dest.to_meter,
        z: point.z || 0
      };
    }
  }

  // DGR, 2010/11/12
  if (enforceAxis && dest.axis !== 'enu') {
    return adjust_axis(dest, true, point);
  }
  if (point && !hasZ) {
    delete point.z;
  }
  return point;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/core.js


var wgs84 = Proj('WGS84');
function transformer(from, to, coords, enforceAxis) {
  var transformedArray, out, keys;
  if (Array.isArray(coords)) {
    transformedArray = transform(from, to, coords, enforceAxis) || {
      x: NaN,
      y: NaN
    };
    if (coords.length > 2) {
      if (typeof from.name !== 'undefined' && from.name === 'geocent' || typeof to.name !== 'undefined' && to.name === 'geocent') {
        if (typeof transformedArray.z === 'number') {
          return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.splice(3));
        } else {
          return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.splice(3));
        }
      } else {
        return [transformedArray.x, transformedArray.y].concat(coords.splice(2));
      }
    } else {
      return [transformedArray.x, transformedArray.y];
    }
  } else {
    out = transform(from, to, coords, enforceAxis);
    keys = Object.keys(coords);
    if (keys.length === 2) {
      return out;
    }
    keys.forEach(function (key) {
      if (typeof from.name !== 'undefined' && from.name === 'geocent' || typeof to.name !== 'undefined' && to.name === 'geocent') {
        if (key === 'x' || key === 'y' || key === 'z') {
          return;
        }
      } else {
        if (key === 'x' || key === 'y') {
          return;
        }
      }
      out[key] = coords[key];
    });
    return out;
  }
}
function checkProj(item) {
  if (item instanceof Proj) {
    return item;
  }
  if (item.oProj) {
    return item.oProj;
  }
  return Proj(item);
}
function proj4(fromProj, toProj, coord) {
  fromProj = checkProj(fromProj);
  var single = false;
  var obj;
  if (typeof toProj === 'undefined') {
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  } else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
    coord = toProj;
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  }
  toProj = checkProj(toProj);
  if (coord) {
    return transformer(fromProj, toProj, coord);
  } else {
    obj = {
      forward: function forward(coords, enforceAxis) {
        return transformer(fromProj, toProj, coords, enforceAxis);
      },
      inverse: function inverse(coords, enforceAxis) {
        return transformer(toProj, fromProj, coords, enforceAxis);
      }
    };
    if (single) {
      obj.oProj = toProj;
    }
    return obj;
  }
}
/* harmony default export */ const core = (proj4);
;// CONCATENATED MODULE: ./node_modules/mgrs/mgrs.js
/**
 * UTM zones are grouped, and assigned to one of a group of 6
 * sets.
 *
 * {int} @private
 */
var NUM_100K_SETS = 6;

/**
 * The column letters (for easting) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

/**
 * The row letters (for northing) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';
var A = 65; // A
var I = 73; // I
var O = 79; // O
var V = 86; // V
var Z = 90; // Z
/* harmony default export */ const mgrs = ({
  forward: mgrs_forward,
  inverse: mgrs_inverse,
  toPoint: mgrs_toPoint
});
/**
 * Conversion of lat/lon to MGRS.
 *
 * @param {object} ll Object literal with lat and lon properties on a
 *     WGS84 ellipsoid.
 * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
 *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
 * @return {string} the MGRS string for the given location and accuracy.
 */
function mgrs_forward(ll, accuracy) {
  accuracy = accuracy || 5; // default accuracy 1m
  return encode(LLtoUTM({
    lat: ll[1],
    lon: ll[0]
  }), accuracy);
}
;

/**
 * Conversion of MGRS to lat/lon.
 *
 * @param {string} mgrs MGRS string.
 * @return {array} An array with left (longitude), bottom (latitude), right
 *     (longitude) and top (latitude) values in WGS84, representing the
 *     bounding box for the provided MGRS reference.
 */
function mgrs_inverse(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
  }
  return [bbox.left, bbox.bottom, bbox.right, bbox.top];
}
;
function mgrs_toPoint(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat];
  }
  return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
}
;
/**
 * Conversion from degrees to radians.
 *
 * @private
 * @param {number} deg the angle in degrees.
 * @return {number} the angle in radians.
 */
function degToRad(deg) {
  return deg * (Math.PI / 180.0);
}

/**
 * Conversion from radians to degrees.
 *
 * @private
 * @param {number} rad the angle in radians.
 * @return {number} the angle in degrees.
 */
function radToDeg(rad) {
  return 180.0 * (rad / Math.PI);
}

/**
 * Converts a set of Longitude and Latitude co-ordinates to UTM
 * using the WGS84 ellipsoid.
 *
 * @private
 * @param {object} ll Object literal with lat and lon properties
 *     representing the WGS84 coordinate to be converted.
 * @return {object} Object literal containing the UTM value with easting,
 *     northing, zoneNumber and zoneLetter properties, and an optional
 *     accuracy property in digits. Returns null if the conversion failed.
 */
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lon;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N, T, C, A, M;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  // (int)
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;

  //Make sure the longitude 180.00 is in Zone 60
  if (Long === 180) {
    ZoneNumber = 60;
  }

  // Special zone for Norway
  if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
    ZoneNumber = 32;
  }

  // Special zones for Svalbard
  if (Lat >= 72.0 && Lat < 84.0) {
    if (Long >= 0.0 && Long < 9.0) {
      ZoneNumber = 31;
    } else if (Long >= 9.0 && Long < 21.0) {
      ZoneNumber = 33;
    } else if (Long >= 21.0 && Long < 33.0) {
      ZoneNumber = 35;
    } else if (Long >= 33.0 && Long < 42.0) {
      ZoneNumber = 37;
    }
  }
  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
  // in middle of
  // zone
  LongOriginRad = degToRad(LongOrigin);
  eccPrimeSquared = eccSquared / (1 - eccSquared);
  N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A = Math.cos(LatRad) * (LongRad - LongOriginRad);
  M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
  var UTMEasting = k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0;
  var UTMNorthing = k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0));
  if (Lat < 0.0) {
    UTMNorthing += 10000000.0; //10000000 meter offset for
    // southern hemisphere
  }
  return {
    northing: Math.round(UTMNorthing),
    easting: Math.round(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}

/**
 * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
 * class where the Zone can be specified as a single string eg."60N" which
 * is then broken down into the ZoneNumber and ZoneLetter.
 *
 * @private
 * @param {object} utm An object literal with northing, easting, zoneNumber
 *     and zoneLetter properties. If an optional accuracy property is
 *     provided (in meters), a bounding box will be returned instead of
 *     latitude and longitude.
 * @return {object} An object literal containing either lat and lon values
 *     (if no accuracy was provided), or top, right, bottom and left values
 *     for the bounding box calculated according to the provided accuracy.
 *     Returns null if the conversion failed.
 */
function UTMtoLL(utm) {
  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  // check the ZoneNummber is valid
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }
  var k0 = 0.9996;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C1, R1, D, M;
  var LongOrigin;
  var mu, phi1Rad;

  // remove 500,000 meter offset for longitude
  var x = UTMEasting - 500000.0;
  var y = UTMNorthing;

  // We must know somehow if we are in the Northern or Southern
  // hemisphere, this is the only time we use the letter So even
  // if the Zone letter isn't exactly correct it should indicate
  // the hemisphere correctly
  if (zoneLetter < 'N') {
    y -= 10000000.0; // remove 10,000,000 meter offset used
    // for southern hemisphere
  }

  // There are 60 zones with zone 1 being at West -180 to -174
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
  // in middle of
  // zone

  eccPrimeSquared = eccSquared / (1 - eccSquared);
  M = y / k0;
  mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu);
  // double phi1 = ProjMath.radToDeg(phi1Rad);

  N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D = x / (N1 * k0);
  var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);
  var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);
  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  } else {
    result = {
      lat: lat,
      lon: lon
    };
  }
  return result;
}

/**
 * Calculates the MGRS letter designator for the given latitude.
 *
 * @private
 * @param {number} lat The latitude in WGS84 to get the letter designator
 *     for.
 * @return {char} The letter designator.
 */
function getLetterDesignator(lat) {
  //This is here as an error flag to show that the Latitude is
  //outside MGRS limits
  var LetterDesignator = 'Z';
  if (84 >= lat && lat >= 72) {
    LetterDesignator = 'X';
  } else if (72 > lat && lat >= 64) {
    LetterDesignator = 'W';
  } else if (64 > lat && lat >= 56) {
    LetterDesignator = 'V';
  } else if (56 > lat && lat >= 48) {
    LetterDesignator = 'U';
  } else if (48 > lat && lat >= 40) {
    LetterDesignator = 'T';
  } else if (40 > lat && lat >= 32) {
    LetterDesignator = 'S';
  } else if (32 > lat && lat >= 24) {
    LetterDesignator = 'R';
  } else if (24 > lat && lat >= 16) {
    LetterDesignator = 'Q';
  } else if (16 > lat && lat >= 8) {
    LetterDesignator = 'P';
  } else if (8 > lat && lat >= 0) {
    LetterDesignator = 'N';
  } else if (0 > lat && lat >= -8) {
    LetterDesignator = 'M';
  } else if (-8 > lat && lat >= -16) {
    LetterDesignator = 'L';
  } else if (-16 > lat && lat >= -24) {
    LetterDesignator = 'K';
  } else if (-24 > lat && lat >= -32) {
    LetterDesignator = 'J';
  } else if (-32 > lat && lat >= -40) {
    LetterDesignator = 'H';
  } else if (-40 > lat && lat >= -48) {
    LetterDesignator = 'G';
  } else if (-48 > lat && lat >= -56) {
    LetterDesignator = 'F';
  } else if (-56 > lat && lat >= -64) {
    LetterDesignator = 'E';
  } else if (-64 > lat && lat >= -72) {
    LetterDesignator = 'D';
  } else if (-72 > lat && lat >= -80) {
    LetterDesignator = 'C';
  }
  return LetterDesignator;
}

/**
 * Encodes a UTM location as MGRS string.
 *
 * @private
 * @param {object} utm An object literal with easting, northing,
 *     zoneLetter, zoneNumber
 * @param {number} accuracy Accuracy in digits (1-5).
 * @return {string} MGRS string for the given UTM location.
 */
function encode(utm, accuracy) {
  // prepend with leading zeroes
  var seasting = "00000" + utm.easting,
    snorthing = "00000" + utm.northing;
  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}

/**
 * Get the two letter 100k designator for a given UTM easting,
 * northing and zone number value.
 *
 * @private
 * @param {number} easting
 * @param {number} northing
 * @param {number} zoneNumber
 * @return the two letter 100k designator for the given UTM location.
 */
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 100000);
  var setRow = Math.floor(northing / 100000) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}

/**
 * Given a UTM zone number, figure out the MGRS 100K set it is in.
 *
 * @private
 * @param {number} i An UTM zone number.
 * @return {number} the 100k set the UTM zone is in.
 */
function get100kSetForZone(i) {
  var setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }
  return setParm;
}

/**
 * Get the two-letter MGRS 100k designator given information
 * translated from the UTM northing, easting and zone number.
 *
 * @private
 * @param {number} column the column index as it relates to the MGRS
 *        100k set spreadsheet, created from the UTM easting.
 *        Values are 1-8.
 * @param {number} row the row index as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM northing value. Values
 *        are from 0-19.
 * @param {number} parm the set block, as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM zone. Values are from
 *        1-60.
 * @return two letter MGRS 100k code.
 */
function getLetter100kID(column, row, parm) {
  // colOrigin and rowOrigin are the letters at the origin of the set
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

  // colInt and rowInt are the letters to build to return
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;
  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }
  if (colInt === I || colOrigin < I && colInt > I || (colInt > I || colOrigin < I) && rollover) {
    colInt++;
  }
  if (colInt === O || colOrigin < O && colInt > O || (colInt > O || colOrigin < O) && rollover) {
    colInt++;
    if (colInt === I) {
      colInt++;
    }
  }
  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }
  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  } else {
    rollover = false;
  }
  if (rowInt === I || rowOrigin < I && rowInt > I || (rowInt > I || rowOrigin < I) && rollover) {
    rowInt++;
  }
  if (rowInt === O || rowOrigin < O && rowInt > O || (rowInt > O || rowOrigin < O) && rollover) {
    rowInt++;
    if (rowInt === I) {
      rowInt++;
    }
  }
  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }
  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}

/**
 * Decode the UTM parameters from a MGRS string.
 *
 * @private
 * @param {string} mgrsString an UPPERCASE coordinate string is expected.
 * @return {object} An object literal with easting, northing, zoneLetter,
 *     zoneNumber and accuracy (in meters) properties.
 */
function decode(mgrsString) {
  if (mgrsString && mgrsString.length === 0) {
    throw "MGRSPoint coverting from nothing";
  }
  var length = mgrsString.length;
  var hunK = null;
  var sb = "";
  var testChar;
  var i = 0;

  // get Zone number
  while (!/[A-Z]/.test(testChar = mgrsString.charAt(i))) {
    if (i >= 2) {
      throw "MGRSPoint bad conversion from: " + mgrsString;
    }
    sb += testChar;
    i++;
  }
  var zoneNumber = parseInt(sb, 10);
  if (i === 0 || i + 3 > length) {
    // A good MGRS string has to be 4-5 digits long,
    // ##AAA/#AAA at least.
    throw "MGRSPoint bad conversion from: " + mgrsString;
  }
  var zoneLetter = mgrsString.charAt(i++);

  // Should we check the zone letter here? Why not.
  if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
    throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString;
  }
  hunK = mgrsString.substring(i, i += 2);
  var set = get100kSetForZone(zoneNumber);
  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);

  // We have a bug where the northing may be 2000000 too low.
  // How
  // do we know when to roll over?

  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2000000;
  }

  // calculate the char index for easting/northing separator
  var remainder = length - i;
  if (remainder % 2 !== 0) {
    throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString;
  }
  var sep = remainder / 2;
  var sepEasting = 0.0;
  var sepNorthing = 0.0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 100000.0 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i, i + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }
  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;
  return {
    easting: easting,
    northing: northing,
    zoneLetter: zoneLetter,
    zoneNumber: zoneNumber,
    accuracy: accuracyBonus
  };
}

/**
 * Given the first letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the easting value that
 * should be added to the other, secondary easting value.
 *
 * @private
 * @param {char} e The first letter from a two-letter MGRS 100´k zone.
 * @param {number} set The MGRS table set for the zone number.
 * @return {number} The easting value for the given letter and set.
 */
function getEastingFromChar(e, set) {
  // colOrigin is the letter at the origin of the set for the
  // column
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 100000.0;
  var rewindMarker = false;
  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw "Bad character: " + e;
      }
      curCol = A;
      rewindMarker = true;
    }
    eastingValue += 100000.0;
  }
  return eastingValue;
}

/**
 * Given the second letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the northing value that
 * should be added to the other, secondary northing value. You have to
 * remember that Northings are determined from the equator, and the vertical
 * cycle of letters mean a 2000000 additional northing meters. This happens
 * approx. every 18 degrees of latitude. This method does *NOT* count any
 * additional northings. You have to figure out how many 2000000 meters need
 * to be added for the zone letter of the MGRS coordinate.
 *
 * @private
 * @param {char} n Second letter of the MGRS 100k zone
 * @param {number} set The MGRS table set number, which is dependent on the
 *     UTM zone number.
 * @return {number} The northing value for the given letter and set.
 */
function getNorthingFromChar(n, set) {
  if (n > 'V') {
    throw "MGRSPoint given invalid Northing " + n;
  }

  // rowOrigin is the letter at the origin of the set for the
  // column
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0.0;
  var rewindMarker = false;
  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    // fixing a bug making whole application hang in this loop
    // when 'n' is a wrong character
    if (curRow > V) {
      if (rewindMarker) {
        // making sure that this loop ends
        throw "Bad character: " + n;
      }
      curRow = A;
      rewindMarker = true;
    }
    northingValue += 100000.0;
  }
  return northingValue;
}

/**
 * The function getMinNorthing returns the minimum northing value of a MGRS
 * zone.
 *
 * Ported from Geotrans' c Lattitude_Band_Value structure table.
 *
 * @private
 * @param {char} zoneLetter The MGRS zone to get the min northing for.
 * @return {number}
 */
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
    case 'C':
      northing = 1100000.0;
      break;
    case 'D':
      northing = 2000000.0;
      break;
    case 'E':
      northing = 2800000.0;
      break;
    case 'F':
      northing = 3700000.0;
      break;
    case 'G':
      northing = 4600000.0;
      break;
    case 'H':
      northing = 5500000.0;
      break;
    case 'J':
      northing = 6400000.0;
      break;
    case 'K':
      northing = 7300000.0;
      break;
    case 'L':
      northing = 8200000.0;
      break;
    case 'M':
      northing = 9100000.0;
      break;
    case 'N':
      northing = 0.0;
      break;
    case 'P':
      northing = 800000.0;
      break;
    case 'Q':
      northing = 1700000.0;
      break;
    case 'R':
      northing = 2600000.0;
      break;
    case 'S':
      northing = 3500000.0;
      break;
    case 'T':
      northing = 4400000.0;
      break;
    case 'U':
      northing = 5300000.0;
      break;
    case 'V':
      northing = 6200000.0;
      break;
    case 'W':
      northing = 7000000.0;
      break;
    case 'X':
      northing = 7900000.0;
      break;
    default:
      northing = -1.0;
  }
  if (northing >= 0.0) {
    return northing;
  } else {
    throw "Invalid zone letter: " + zoneLetter;
  }
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/Point.js
function Point_typeof(o) { "@babel/helpers - typeof"; return Point_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Point_typeof(o); }

function Point(x, y, z) {
  if (!(this instanceof Point)) {
    return new Point(x, y, z);
  }
  if (Array.isArray(x)) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2] || 0.0;
  } else if (Point_typeof(x) === 'object') {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z || 0.0;
  } else if (typeof x === 'string' && typeof y === 'undefined') {
    var coords = x.split(',');
    this.x = parseFloat(coords[0], 10);
    this.y = parseFloat(coords[1], 10);
    this.z = parseFloat(coords[2], 10) || 0.0;
  } else {
    this.x = x;
    this.y = y;
    this.z = z || 0.0;
  }
  console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
}
Point.fromMGRS = function (mgrsStr) {
  return new Point(mgrs_toPoint(mgrsStr));
};
Point.prototype.toMGRS = function (accuracy) {
  return mgrs_forward([this.x, this.y], accuracy);
};
/* harmony default export */ const lib_Point = (Point);
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/pj_enfn.js
var C00 = 1;
var C02 = 0.25;
var C04 = 0.046875;
var C06 = 0.01953125;
var C08 = 0.01068115234375;
var C22 = 0.75;
var C44 = 0.46875;
var C46 = 0.01302083333333333333;
var C48 = 0.00712076822916666666;
var C66 = 0.36458333333333333333;
var C68 = 0.00569661458333333333;
var C88 = 0.3076171875;
/* harmony default export */ function pj_enfn(es) {
  var en = [];
  en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
  en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
  var t = es * es;
  en[2] = t * (C44 - es * (C46 + es * C48));
  t *= es;
  en[3] = t * (C66 - es * C68);
  en[4] = t * es * C88;
  return en;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/pj_mlfn.js
/* harmony default export */ function pj_mlfn(phi, sphi, cphi, en) {
  cphi *= sphi;
  sphi *= sphi;
  return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])));
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/pj_inv_mlfn.js


var MAX_ITER = 20;
/* harmony default export */ function pj_inv_mlfn(arg, es, en) {
  var k = 1 / (1 - es);
  var phi = arg;
  for (var i = MAX_ITER; i; --i) {
    /* rarely goes over 2 iterations */
    var s = Math.sin(phi);
    var t = 1 - es * s * s;
    //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
    //phi -= t * (t * Math.sqrt(t)) * k;
    t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
    phi -= t;
    if (Math.abs(t) < EPSLN) {
      return phi;
    }
  }
  //..reportError("cass:pj_inv_mlfn: Convergence error");
  return phi;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/tmerc.js
// Heavily based on this tmerc projection implementation
// https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/tmerc.js







function tmerc_init() {
  this.x0 = this.x0 !== undefined ? this.x0 : 0;
  this.y0 = this.y0 !== undefined ? this.y0 : 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
  this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;
  if (this.es) {
    this.en = pj_enfn(this.es);
    this.ml0 = pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}

/**
    Transverse Mercator Forward  - long/lat to x/y
    long/lat in radians
  */
function tmerc_forward(p) {
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon(lon - this.long0);
  var con;
  var x, y;
  var sin_phi = Math.sin(lat);
  var cos_phi = Math.cos(lat);
  if (!this.es) {
    var b = cos_phi * Math.sin(delta_lon);
    if (Math.abs(Math.abs(b) - 1) < EPSLN) {
      return 93;
    } else {
      x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
      y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
      b = Math.abs(y);
      if (b >= 1) {
        if (b - 1 > EPSLN) {
          return 93;
        } else {
          y = 0;
        }
      } else {
        y = Math.acos(y);
      }
      if (lat < 0) {
        y = -y;
      }
      y = this.a * this.k0 * (y - this.lat0) + this.y0;
    }
  } else {
    var al = cos_phi * delta_lon;
    var als = Math.pow(al, 2);
    var c = this.ep2 * Math.pow(cos_phi, 2);
    var cs = Math.pow(c, 2);
    var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
    var t = Math.pow(tq, 2);
    var ts = Math.pow(t, 2);
    con = 1 - this.es * Math.pow(sin_phi, 2);
    al = al / Math.sqrt(con);
    var ml = pj_mlfn(lat, sin_phi, cos_phi, this.en);
    x = this.a * (this.k0 * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c + als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) + this.x0;
    y = this.a * (this.k0 * (ml - this.ml0 + sin_phi * delta_lon * al / 2 * (1 + als / 12 * (5 - t + 9 * c + 4 * cs + als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c + als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) + this.y0;
  }
  p.x = x;
  p.y = y;
  return p;
}

/**
    Transverse Mercator Inverse  -  x/y to long/lat
  */
function tmerc_inverse(p) {
  var con, phi;
  var lat, lon;
  var x = (p.x - this.x0) * (1 / this.a);
  var y = (p.y - this.y0) * (1 / this.a);
  if (!this.es) {
    var f = Math.exp(x / this.k0);
    var g = 0.5 * (f - 1 / f);
    var temp = this.lat0 + y / this.k0;
    var h = Math.cos(temp);
    con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
    lat = Math.asin(con);
    if (y < 0) {
      lat = -lat;
    }
    if (g === 0 && h === 0) {
      lon = 0;
    } else {
      lon = adjust_lon(Math.atan2(g, h) + this.long0);
    }
  } else {
    // ellipsoidal form
    con = this.ml0 + y / this.k0;
    phi = pj_inv_mlfn(con, this.es, this.en);
    if (Math.abs(phi) < HALF_PI) {
      var sin_phi = Math.sin(phi);
      var cos_phi = Math.cos(phi);
      var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var t = Math.pow(tan_phi, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      var d = x * Math.sqrt(con) / this.k0;
      var ds = Math.pow(d, 2);
      con = con * tan_phi;
      lat = phi - con * ds / (1 - this.es) * 0.5 * (1 - ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs - ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c - ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));
      lon = adjust_lon(this.long0 + d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c - ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi);
    } else {
      lat = HALF_PI * sign(y);
      lon = 0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var tmerc_names = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
/* harmony default export */ const tmerc = ({
  init: tmerc_init,
  forward: tmerc_forward,
  inverse: tmerc_inverse,
  names: tmerc_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/sinh.js
/* harmony default export */ function sinh(x) {
  var r = Math.exp(x);
  r = (r - 1 / r) / 2;
  return r;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/hypot.js
/* harmony default export */ function hypot(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  var a = Math.max(x, y);
  var b = Math.min(x, y) / (a ? a : 1);
  return a * Math.sqrt(1 + Math.pow(b, 2));
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/log1py.js
/* harmony default export */ function log1py(x) {
  var y = 1 + x;
  var z = y - 1;
  return z === 0 ? x : x * Math.log(y) / z;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/asinhy.js


/* harmony default export */ function asinhy(x) {
  var y = Math.abs(x);
  y = log1py(y * (1 + y / (hypot(1, y) + 1)));
  return x < 0 ? -y : y;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/gatg.js
/* harmony default export */ function gatg(pp, B) {
  var cos_2B = 2 * Math.cos(2 * B);
  var i = pp.length - 1;
  var h1 = pp[i];
  var h2 = 0;
  var h;
  while (--i >= 0) {
    h = -h2 + cos_2B * h1 + pp[i];
    h2 = h1;
    h1 = h;
  }
  return B + h * Math.sin(2 * B);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/clens.js
/* harmony default export */ function clens(pp, arg_r) {
  var r = 2 * Math.cos(arg_r);
  var i = pp.length - 1;
  var hr1 = pp[i];
  var hr2 = 0;
  var hr;
  while (--i >= 0) {
    hr = -hr2 + r * hr1 + pp[i];
    hr2 = hr1;
    hr1 = hr;
  }
  return Math.sin(arg_r) * hr;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/cosh.js
/* harmony default export */ function cosh(x) {
  var r = Math.exp(x);
  r = (r + 1 / r) / 2;
  return r;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/clens_cmplx.js


/* harmony default export */ function clens_cmplx(pp, arg_r, arg_i) {
  var sin_arg_r = Math.sin(arg_r);
  var cos_arg_r = Math.cos(arg_r);
  var sinh_arg_i = sinh(arg_i);
  var cosh_arg_i = cosh(arg_i);
  var r = 2 * cos_arg_r * cosh_arg_i;
  var i = -2 * sin_arg_r * sinh_arg_i;
  var j = pp.length - 1;
  var hr = pp[j];
  var hi1 = 0;
  var hr1 = 0;
  var hi = 0;
  var hr2;
  var hi2;
  while (--j >= 0) {
    hr2 = hr1;
    hi2 = hi1;
    hr1 = hr;
    hi1 = hi;
    hr = -hr2 + r * hr1 - i * hi1 + pp[j];
    hi = -hi2 + i * hr1 + r * hi1;
  }
  r = sin_arg_r * cosh_arg_i;
  i = cos_arg_r * sinh_arg_i;
  return [r * hr - i * hi, r * hi + i * hr];
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/etmerc.js
// Heavily based on this etmerc projection implementation
// https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/etmerc.js









function etmerc_init() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  }
  if (this.approx) {
    // When '+approx' is set, use tmerc instead
    tmerc.init.apply(this);
    this.forward = tmerc.forward;
    this.inverse = tmerc.inverse;
  }
  this.x0 = this.x0 !== undefined ? this.x0 : 0;
  this.y0 = this.y0 !== undefined ? this.y0 : 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
  this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;
  this.cgb = [];
  this.cbg = [];
  this.utg = [];
  this.gtu = [];
  var f = this.es / (1 + Math.sqrt(1 - this.es));
  var n = f / (2 - f);
  var np = n;
  this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))));
  this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));
  np = np * n;
  this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
  this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));
  np = np * n;
  this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
  this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));
  np = np * n;
  this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
  this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)));
  np = np * n;
  this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
  this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));
  np = np * n;
  this.cgb[5] = np * (601676 / 22275);
  this.cbg[5] = np * (444337 / 155925);
  np = Math.pow(n, 2);
  this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));
  this.utg[0] = n * (-0.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
  this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));
  this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
  this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));
  np = np * n;
  this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))));
  this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));
  np = np * n;
  this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
  this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));
  np = np * n;
  this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
  this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));
  np = np * n;
  this.utg[5] = np * (-20648693 / 638668800);
  this.gtu[5] = np * (212378941 / 319334400);
  var Z = gatg(this.cbg, this.lat0);
  this.Zb = -this.Qn * (Z + clens(this.gtu, 2 * Z));
}
function etmerc_forward(p) {
  var Ce = adjust_lon(p.x - this.long0);
  var Cn = p.y;
  Cn = gatg(this.cbg, Cn);
  var sin_Cn = Math.sin(Cn);
  var cos_Cn = Math.cos(Cn);
  var sin_Ce = Math.sin(Ce);
  var cos_Ce = Math.cos(Ce);
  Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
  Ce = Math.atan2(sin_Ce * cos_Cn, hypot(sin_Cn, cos_Cn * cos_Ce));
  Ce = asinhy(Math.tan(Ce));
  var tmp = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce);
  Cn = Cn + tmp[0];
  Ce = Ce + tmp[1];
  var x;
  var y;
  if (Math.abs(Ce) <= 2.623395162778) {
    x = this.a * (this.Qn * Ce) + this.x0;
    y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
  } else {
    x = Infinity;
    y = Infinity;
  }
  p.x = x;
  p.y = y;
  return p;
}
function etmerc_inverse(p) {
  var Ce = (p.x - this.x0) * (1 / this.a);
  var Cn = (p.y - this.y0) * (1 / this.a);
  Cn = (Cn - this.Zb) / this.Qn;
  Ce = Ce / this.Qn;
  var lon;
  var lat;
  if (Math.abs(Ce) <= 2.623395162778) {
    var tmp = clens_cmplx(this.utg, 2 * Cn, 2 * Ce);
    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];
    Ce = Math.atan(sinh(Ce));
    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var sin_Ce = Math.sin(Ce);
    var cos_Ce = Math.cos(Ce);
    Cn = Math.atan2(sin_Cn * cos_Ce, hypot(sin_Ce, cos_Ce * cos_Cn));
    Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);
    lon = adjust_lon(Ce + this.long0);
    lat = gatg(this.cgb, Cn);
  } else {
    lon = Infinity;
    lat = Infinity;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var etmerc_names = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"];
/* harmony default export */ const etmerc = ({
  init: etmerc_init,
  forward: etmerc_forward,
  inverse: etmerc_inverse,
  names: etmerc_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/adjust_zone.js

/* harmony default export */ function adjust_zone(zone, lon) {
  if (zone === undefined) {
    zone = Math.floor((adjust_lon(lon) + Math.PI) * 30 / Math.PI) + 1;
    if (zone < 0) {
      return 0;
    } else if (zone > 60) {
      return 60;
    }
  }
  return zone;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/utm.js


var dependsOn = 'etmerc';

function utm_init() {
  var zone = adjust_zone(this.zone, this.long0);
  if (zone === undefined) {
    throw new Error('unknown utm zone');
  }
  this.lat0 = 0;
  this.long0 = (6 * Math.abs(zone) - 183) * D2R;
  this.x0 = 500000;
  this.y0 = this.utmSouth ? 10000000 : 0;
  this.k0 = 0.9996;
  etmerc.init.apply(this);
  this.forward = etmerc.forward;
  this.inverse = etmerc.inverse;
}
var utm_names = ["Universal Transverse Mercator System", "utm"];
/* harmony default export */ const utm = ({
  init: utm_init,
  names: utm_names,
  dependsOn: dependsOn
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/srat.js
/* harmony default export */ function srat(esinp, exp) {
  return Math.pow((1 - esinp) / (1 + esinp), exp);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/gauss.js

var gauss_MAX_ITER = 20;

function gauss_init() {
  var sphi = Math.sin(this.lat0);
  var cphi = Math.cos(this.lat0);
  cphi *= cphi;
  this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
  this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
  this.phic0 = Math.asin(sphi / this.C);
  this.ratexp = 0.5 * this.C * this.e;
  this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp));
}
function gauss_forward(p) {
  var lon = p.x;
  var lat = p.y;
  p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
  p.x = this.C * lon;
  return p;
}
function gauss_inverse(p) {
  var DEL_TOL = 1e-14;
  var lon = p.x / this.C;
  var lat = p.y;
  var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
  for (var i = gauss_MAX_ITER; i > 0; --i) {
    lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), -0.5 * this.e)) - HALF_PI;
    if (Math.abs(lat - p.y) < DEL_TOL) {
      break;
    }
    p.y = lat;
  }
  /* convergence failed */
  if (!i) {
    return null;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var gauss_names = ["gauss"];
/* harmony default export */ const gauss = ({
  init: gauss_init,
  forward: gauss_forward,
  inverse: gauss_inverse,
  names: gauss_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/sterea.js



function sterea_init() {
  gauss.init.apply(this);
  if (!this.rc) {
    return;
  }
  this.sinc0 = Math.sin(this.phic0);
  this.cosc0 = Math.cos(this.phic0);
  this.R2 = 2 * this.rc;
  if (!this.title) {
    this.title = "Oblique Stereographic Alternative";
  }
}
function sterea_forward(p) {
  var sinc, cosc, cosl, k;
  p.x = adjust_lon(p.x - this.long0);
  gauss.forward.apply(this, [p]);
  sinc = Math.sin(p.y);
  cosc = Math.cos(p.y);
  cosl = Math.cos(p.x);
  k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
  p.x = k * cosc * Math.sin(p.x);
  p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}
function sterea_inverse(p) {
  var sinc, cosc, lon, lat, rho;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  p.x /= this.k0;
  p.y /= this.k0;
  if (rho = hypot(p.x, p.y)) {
    var c = 2 * Math.atan2(rho, this.R2);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
    lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
  } else {
    lat = this.phic0;
    lon = 0;
  }
  p.x = lon;
  p.y = lat;
  gauss.inverse.apply(this, [p]);
  p.x = adjust_lon(p.x + this.long0);
  return p;
}
var sterea_names = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
/* harmony default export */ const sterea = ({
  init: sterea_init,
  forward: sterea_forward,
  inverse: sterea_inverse,
  names: sterea_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/stere.js






function ssfn_(phit, sinphi, eccen) {
  sinphi *= eccen;
  return Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen);
}
function stere_init() {
  // setting default parameters
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.coslat0 = Math.cos(this.lat0);
  this.sinlat0 = Math.sin(this.lat0);
  if (this.sphere) {
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
      this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
    }
  } else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (this.lat0 > 0) {
        //North pole
        //trace('stere:north pole');
        this.con = 1;
      } else {
        //South pole
        //trace('stere:south pole');
        this.con = -1;
      }
    }
    this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && Math.abs(Math.cos(this.lat_ts)) > EPSLN) {
      // When k0 is 1 (default value) and lat_ts is a vaild number and lat0 is at a pole and lat_ts is not at a pole
      // Recalculate k0 using formula 21-35 from p161 of Snyder, 1987
      this.k0 = 0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
    }
    this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0);
    this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
    this.cosX0 = Math.cos(this.X0);
    this.sinX0 = Math.sin(this.X0);
  }
}

// Stereographic forward equations--mapping lat,long to x,y
function stere_forward(p) {
  var lon = p.x;
  var lat = p.y;
  var sinlat = Math.sin(lat);
  var coslat = Math.cos(lat);
  var A, X, sinX, cosX, ts, rh;
  var dlon = adjust_lon(lon - this.long0);
  if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
    //case of the origine point
    //trace('stere:this is the origin point');
    p.x = NaN;
    p.y = NaN;
    return p;
  }
  if (this.sphere) {
    //trace('stere:sphere case');
    A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
    p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
    p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
    return p;
  } else {
    X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
    cosX = Math.cos(X);
    sinX = Math.sin(X);
    if (Math.abs(this.coslat0) <= EPSLN) {
      ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
      rh = 2 * this.a * this.k0 * ts / this.cons;
      p.x = this.x0 + rh * Math.sin(lon - this.long0);
      p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
      //trace(p.toString());
      return p;
    } else if (Math.abs(this.sinlat0) < EPSLN) {
      //Eq
      //trace('stere:equateur');
      A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
      p.y = A * sinX;
    } else {
      //other case
      //trace('stere:normal case');
      A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
      p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
    }
    p.x = A * cosX * Math.sin(dlon) + this.x0;
  }
  //trace(p.toString());
  return p;
}

//* Stereographic inverse equations--mapping x,y to lat/long
function stere_inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat, ts, ce, Chi;
  var rh = Math.sqrt(p.x * p.x + p.y * p.y);
  if (this.sphere) {
    var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
    lon = this.long0;
    lat = this.lat0;
    if (rh <= EPSLN) {
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
    if (Math.abs(this.coslat0) < EPSLN) {
      if (this.lat0 > 0) {
        lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y));
      } else {
        lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
      }
    } else {
      lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
    }
    p.x = lon;
    p.y = lat;
    return p;
  } else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (rh <= EPSLN) {
        lat = this.lat0;
        lon = this.long0;
        p.x = lon;
        p.y = lat;
        //trace(p.toString());
        return p;
      }
      p.x *= this.con;
      p.y *= this.con;
      ts = rh * this.cons / (2 * this.a * this.k0);
      lat = this.con * phi2z(this.e, ts);
      lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, -1 * p.y));
    } else {
      ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
      lon = this.long0;
      if (rh <= EPSLN) {
        Chi = this.X0;
      } else {
        Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
        lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
      }
      lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
    }
  }
  p.x = lon;
  p.y = lat;

  //trace(p.toString());
  return p;
}
var stere_names = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)", "Polar_Stereographic"];
/* harmony default export */ const stere = ({
  init: stere_init,
  forward: stere_forward,
  inverse: stere_inverse,
  names: stere_names,
  ssfn_: ssfn_
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/somerc.js
/*
  references:
    Formules et constantes pour le Calcul pour la
    projection cylindrique conforme à axe oblique et pour la transformation entre
    des systèmes de référence.
    http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
  */

function somerc_init() {
  var phy0 = this.lat0;
  this.lambda0 = this.long0;
  var sinPhy0 = Math.sin(phy0);
  var semiMajorAxis = this.a;
  var invF = this.rf;
  var flattening = 1 / invF;
  var e2 = 2 * flattening - Math.pow(flattening, 2);
  var e = this.e = Math.sqrt(e2);
  this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
  this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
  this.b0 = Math.asin(sinPhy0 / this.alpha);
  var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
  var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
  var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
}
function somerc_forward(p) {
  var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
  var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
  var S = -this.alpha * (Sa1 + Sa2) + this.K;

  // spheric latitude
  var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);

  // spheric longitude
  var I = this.alpha * (p.x - this.lambda0);

  // psoeudo equatorial rotation
  var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));
  var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));
  p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
  p.x = this.R * rotI + this.x0;
  return p;
}
function somerc_inverse(p) {
  var Y = p.x - this.x0;
  var X = p.y - this.y0;
  var rotI = Y / this.R;
  var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);
  var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
  var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));
  var lambda = this.lambda0 + I / this.alpha;
  var S = 0;
  var phy = b;
  var prevPhy = -1000;
  var iteration = 0;
  while (Math.abs(phy - prevPhy) > 0.0000001) {
    if (++iteration > 20) {
      //...reportError("omercFwdInfinity");
      return;
    }
    //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
    S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
    prevPhy = phy;
    phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
  }
  p.x = lambda;
  p.y = phy;
  return p;
}
var somerc_names = ["somerc"];
/* harmony default export */ const somerc = ({
  init: somerc_init,
  forward: somerc_forward,
  inverse: somerc_inverse,
  names: somerc_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/omerc.js
function omerc_typeof(o) { "@babel/helpers - typeof"; return omerc_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, omerc_typeof(o); }




var TOL = 1e-7;
function isTypeA(P) {
  var typeAProjections = ['Hotine_Oblique_Mercator', 'Hotine_Oblique_Mercator_Azimuth_Natural_Origin'];
  var projectionName = omerc_typeof(P.PROJECTION) === "object" ? Object.keys(P.PROJECTION)[0] : P.PROJECTION;
  return 'no_uoff' in P || 'no_off' in P || typeAProjections.indexOf(projectionName) !== -1;
}

/* Initialize the Oblique Mercator  projection
    ------------------------------------------*/
function omerc_init() {
  var con,
    com,
    cosph0,
    D,
    F,
    H,
    L,
    sinph0,
    p,
    J,
    gamma = 0,
    gamma0,
    lamc = 0,
    lam1 = 0,
    lam2 = 0,
    phi1 = 0,
    phi2 = 0,
    alpha_c = 0,
    AB;

  // only Type A uses the no_off or no_uoff property
  // https://github.com/OSGeo/proj.4/issues/104
  this.no_off = isTypeA(this);
  this.no_rot = 'no_rot' in this;
  var alp = false;
  if ("alpha" in this) {
    alp = true;
  }
  var gam = false;
  if ("rectified_grid_angle" in this) {
    gam = true;
  }
  if (alp) {
    alpha_c = this.alpha;
  }
  if (gam) {
    gamma = this.rectified_grid_angle * D2R;
  }
  if (alp || gam) {
    lamc = this.longc;
  } else {
    lam1 = this.long1;
    phi1 = this.lat1;
    lam2 = this.long2;
    phi2 = this.lat2;
    if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL || Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL || Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
      throw new Error();
    }
  }
  var one_es = 1.0 - this.es;
  com = Math.sqrt(one_es);
  if (Math.abs(this.lat0) > EPSLN) {
    sinph0 = Math.sin(this.lat0);
    cosph0 = Math.cos(this.lat0);
    con = 1 - this.es * sinph0 * sinph0;
    this.B = cosph0 * cosph0;
    this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
    this.A = this.B * this.k0 * com / con;
    D = this.B * com / (cosph0 * Math.sqrt(con));
    F = D * D - 1;
    if (F <= 0) {
      F = 0;
    } else {
      F = Math.sqrt(F);
      if (this.lat0 < 0) {
        F = -F;
      }
    }
    this.E = F += D;
    this.E *= Math.pow(tsfnz(this.e, this.lat0, sinph0), this.B);
  } else {
    this.B = 1 / com;
    this.A = this.k0;
    this.E = D = F = 1;
  }
  if (alp || gam) {
    if (alp) {
      gamma0 = Math.asin(Math.sin(alpha_c) / D);
      if (!gam) {
        gamma = alpha_c;
      }
    } else {
      gamma0 = gamma;
      alpha_c = Math.asin(D * Math.sin(gamma0));
    }
    this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
  } else {
    H = Math.pow(tsfnz(this.e, phi1, Math.sin(phi1)), this.B);
    L = Math.pow(tsfnz(this.e, phi2, Math.sin(phi2)), this.B);
    F = this.E / H;
    p = (L - H) / (L + H);
    J = this.E * this.E;
    J = (J - L * H) / (J + L * H);
    con = lam1 - lam2;
    if (con < -Math.pi) {
      lam2 -= TWO_PI;
    } else if (con > Math.pi) {
      lam2 += TWO_PI;
    }
    this.lam0 = adjust_lon(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B);
    gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon(lam1 - this.lam0)) / (F - 1 / F));
    gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
  }
  this.singam = Math.sin(gamma0);
  this.cosgam = Math.cos(gamma0);
  this.sinrot = Math.sin(gamma);
  this.cosrot = Math.cos(gamma);
  this.rB = 1 / this.B;
  this.ArB = this.A * this.rB;
  this.BrA = 1 / this.ArB;
  AB = this.A * this.B;
  if (this.no_off) {
    this.u_0 = 0;
  } else {
    this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
    if (this.lat0 < 0) {
      this.u_0 = -this.u_0;
    }
  }
  F = 0.5 * gamma0;
  this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
  this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
}

/* Oblique Mercator forward equations--mapping lat,long to x,y
    ----------------------------------------------------------*/
function omerc_forward(p) {
  var coords = {};
  var S, T, U, V, W, temp, u, v;
  p.x = p.x - this.lam0;
  if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
    W = this.E / Math.pow(tsfnz(this.e, p.y, Math.sin(p.y)), this.B);
    temp = 1 / W;
    S = 0.5 * (W - temp);
    T = 0.5 * (W + temp);
    V = Math.sin(this.B * p.x);
    U = (S * this.singam - V * this.cosgam) / T;
    if (Math.abs(Math.abs(U) - 1.0) < EPSLN) {
      throw new Error();
    }
    v = 0.5 * this.ArB * Math.log((1 - U) / (1 + U));
    temp = Math.cos(this.B * p.x);
    if (Math.abs(temp) < TOL) {
      u = this.A * p.x;
    } else {
      u = this.ArB * Math.atan2(S * this.cosgam + V * this.singam, temp);
    }
  } else {
    v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
    u = this.ArB * p.y;
  }
  if (this.no_rot) {
    coords.x = u;
    coords.y = v;
  } else {
    u -= this.u_0;
    coords.x = v * this.cosrot + u * this.sinrot;
    coords.y = u * this.cosrot - v * this.sinrot;
  }
  coords.x = this.a * coords.x + this.x0;
  coords.y = this.a * coords.y + this.y0;
  return coords;
}
function omerc_inverse(p) {
  var u, v, Qp, Sp, Tp, Vp, Up;
  var coords = {};
  p.x = (p.x - this.x0) * (1.0 / this.a);
  p.y = (p.y - this.y0) * (1.0 / this.a);
  if (this.no_rot) {
    v = p.y;
    u = p.x;
  } else {
    v = p.x * this.cosrot - p.y * this.sinrot;
    u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
  }
  Qp = Math.exp(-this.BrA * v);
  Sp = 0.5 * (Qp - 1 / Qp);
  Tp = 0.5 * (Qp + 1 / Qp);
  Vp = Math.sin(this.BrA * u);
  Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
  if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
    coords.x = 0;
    coords.y = Up < 0 ? -HALF_PI : HALF_PI;
  } else {
    coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
    coords.y = phi2z(this.e, Math.pow(coords.y, 1 / this.B));
    if (coords.y === Infinity) {
      throw new Error();
    }
    coords.x = -this.rB * Math.atan2(Sp * this.cosgam - Vp * this.singam, Math.cos(this.BrA * u));
  }
  coords.x += this.lam0;
  return coords;
}
var omerc_names = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
/* harmony default export */ const omerc = ({
  init: omerc_init,
  forward: omerc_forward,
  inverse: omerc_inverse,
  names: omerc_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/lcc.js






function lcc_init() {
  //double lat0;                    /* the reference latitude               */
  //double long0;                   /* the reference longitude              */
  //double lat1;                    /* first standard parallel              */
  //double lat2;                    /* second standard parallel             */
  //double r_maj;                   /* major axis                           */
  //double r_min;                   /* minor axis                           */
  //double false_east;              /* x offset in meters                   */
  //double false_north;             /* y offset in meters                   */

  //the above value can be set with proj4.defs
  //example: proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  if (!this.lat2) {
    this.lat2 = this.lat1;
  } //if lat2 is not defined
  if (!this.k0) {
    this.k0 = 1;
  }
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  var temp = this.b / this.a;
  this.e = Math.sqrt(1 - temp * temp);
  var sin1 = Math.sin(this.lat1);
  var cos1 = Math.cos(this.lat1);
  var ms1 = msfnz(this.e, sin1, cos1);
  var ts1 = tsfnz(this.e, this.lat1, sin1);
  var sin2 = Math.sin(this.lat2);
  var cos2 = Math.cos(this.lat2);
  var ms2 = msfnz(this.e, sin2, cos2);
  var ts2 = tsfnz(this.e, this.lat2, sin2);
  var ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0));
  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
  } else {
    this.ns = sin1;
  }
  if (isNaN(this.ns)) {
    this.ns = sin1;
  }
  this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
  this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
  if (!this.title) {
    this.title = "Lambert Conformal Conic";
  }
}

// Lambert Conformal conic forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function lcc_forward(p) {
  var lon = p.x;
  var lat = p.y;

  // singular cases :
  if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
    lat = sign(lat) * (HALF_PI - 2 * EPSLN);
  }
  var con = Math.abs(Math.abs(lat) - HALF_PI);
  var ts, rh1;
  if (con > EPSLN) {
    ts = tsfnz(this.e, lat, Math.sin(lat));
    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
  } else {
    con = lat * this.ns;
    if (con <= 0) {
      return null;
    }
    rh1 = 0;
  }
  var theta = this.ns * adjust_lon(lon - this.long0);
  p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
  p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;
  return p;
}

// Lambert Conformal Conic inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function lcc_inverse(p) {
  var rh1, con, ts;
  var lat, lon;
  var x = (p.x - this.x0) / this.k0;
  var y = this.rh - (p.y - this.y0) / this.k0;
  if (this.ns > 0) {
    rh1 = Math.sqrt(x * x + y * y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(x * x + y * y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * x, con * y);
  }
  if (rh1 !== 0 || this.ns > 0) {
    con = 1 / this.ns;
    ts = Math.pow(rh1 / (this.a * this.f0), con);
    lat = phi2z(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  } else {
    lat = -HALF_PI;
  }
  lon = adjust_lon(theta / this.ns + this.long0);
  p.x = lon;
  p.y = lat;
  return p;
}
var lcc_names = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_1SP", "Lambert_Conformal_Conic_2SP", "lcc", "Lambert Conic Conformal (1SP)", "Lambert Conic Conformal (2SP)"];
/* harmony default export */ const lcc = ({
  init: lcc_init,
  forward: lcc_forward,
  inverse: lcc_inverse,
  names: lcc_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/krovak.js

function krovak_init() {
  this.a = 6377397.155;
  this.es = 0.006674372230614;
  this.e = Math.sqrt(this.es);
  if (!this.lat0) {
    this.lat0 = 0.863937979737193;
  }
  if (!this.long0) {
    this.long0 = 0.7417649320975901 - 0.308341501185665;
  }
  /* if scale not set default to 0.9999 */
  if (!this.k0) {
    this.k0 = 0.9999;
  }
  this.s45 = 0.785398163397448; /* 45 */
  this.s90 = 2 * this.s45;
  this.fi0 = this.lat0;
  this.e2 = this.es;
  this.e = Math.sqrt(this.e2);
  this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
  this.uq = 1.04216856380474;
  this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
  this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
  this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
  this.k1 = this.k0;
  this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
  this.s0 = 1.37008346281555;
  this.n = Math.sin(this.s0);
  this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
  this.ad = this.s90 - this.uq;
}

/* ellipsoid */
/* calculate xy from lat/lon */
/* Constants, identical to inverse transform function */
function krovak_forward(p) {
  var gfi, u, deltav, s, d, eps, ro;
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon(lon - this.long0);
  /* Transformation */
  gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2);
  u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
  deltav = -delta_lon * this.alfa;
  s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
  d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
  eps = this.n * d;
  ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
  p.y = ro * Math.cos(eps) / 1;
  p.x = ro * Math.sin(eps) / 1;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  return p;
}

/* calculate lat/lon from xy */
function krovak_inverse(p) {
  var u, deltav, s, d, eps, ro, fi1;
  var ok;

  /* Transformation */
  /* revert y, x*/
  var tmp = p.x;
  p.x = p.y;
  p.y = tmp;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  ro = Math.sqrt(p.x * p.x + p.y * p.y);
  eps = Math.atan2(p.y, p.x);
  d = eps / Math.sin(this.s0);
  s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
  u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
  deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
  p.x = this.long0 - deltav / this.alfa;
  fi1 = u;
  ok = 0;
  var iter = 0;
  do {
    p.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
    if (Math.abs(fi1 - p.y) < 0.0000000001) {
      ok = 1;
    }
    fi1 = p.y;
    iter += 1;
  } while (ok === 0 && iter < 15);
  if (iter >= 15) {
    return null;
  }
  return p;
}
var krovak_names = ["Krovak", "krovak"];
/* harmony default export */ const krovak = ({
  init: krovak_init,
  forward: krovak_forward,
  inverse: krovak_inverse,
  names: krovak_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/mlfn.js
/* harmony default export */ function mlfn(e0, e1, e2, e3, phi) {
  return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/e0fn.js
/* harmony default export */ function e0fn(x) {
  return 1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x));
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/e1fn.js
/* harmony default export */ function e1fn(x) {
  return 0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x));
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/e2fn.js
/* harmony default export */ function e2fn(x) {
  return 0.05859375 * x * x * (1 + 0.75 * x);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/e3fn.js
/* harmony default export */ function e3fn(x) {
  return x * x * x * (35 / 3072);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/gN.js
/* harmony default export */ function gN(a, e, sinphi) {
  var temp = e * sinphi;
  return a / Math.sqrt(1 - temp * temp);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/adjust_lat.js


/* harmony default export */ function adjust_lat(x) {
  return Math.abs(x) < HALF_PI ? x : x - sign(x) * Math.PI;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/imlfn.js
/* harmony default export */ function imlfn(ml, e0, e1, e2, e3) {
  var phi;
  var dphi;
  phi = ml / e0;
  for (var i = 0; i < 15; i++) {
    dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
  return NaN;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/cass.js










function cass_init() {
  if (!this.sphere) {
    this.e0 = e0fn(this.es);
    this.e1 = e1fn(this.es);
    this.e2 = e2fn(this.es);
    this.e3 = e3fn(this.es);
    this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
  }
}

/* Cassini forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
function cass_forward(p) {
  /* Forward equations
      -----------------*/
  var x, y;
  var lam = p.x;
  var phi = p.y;
  lam = adjust_lon(lam - this.long0);
  if (this.sphere) {
    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
  } else {
    //ellipsoid
    var sinphi = Math.sin(phi);
    var cosphi = Math.cos(phi);
    var nl = gN(this.a, this.e, sinphi);
    var tl = Math.tan(phi) * Math.tan(phi);
    var al = lam * Math.cos(phi);
    var asq = al * al;
    var cl = this.es * cosphi * cosphi / (1 - this.es);
    var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
    x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
    y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);
  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function cass_inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var phi, lam;
  if (this.sphere) {
    var dd = y + this.lat0;
    phi = Math.asin(Math.sin(dd) * Math.cos(x));
    lam = Math.atan2(Math.tan(x), Math.cos(dd));
  } else {
    /* ellipsoid */
    var ml1 = this.ml0 / this.a + y;
    var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
      p.x = this.long0;
      p.y = HALF_PI;
      if (y < 0) {
        p.y *= -1;
      }
      return p;
    }
    var nl1 = gN(this.a, this.e, Math.sin(phi1));
    var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
    var tl1 = Math.pow(Math.tan(phi1), 2);
    var dl = x * this.a / nl1;
    var dsq = dl * dl;
    phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
    lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);
  }
  p.x = adjust_lon(lam + this.long0);
  p.y = adjust_lat(phi);
  return p;
}
var cass_names = ["Cassini", "Cassini_Soldner", "cass"];
/* harmony default export */ const cass = ({
  init: cass_init,
  forward: cass_forward,
  inverse: cass_inverse,
  names: cass_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/qsfnz.js
/* harmony default export */ function qsfnz(eccent, sinphi) {
  var con;
  if (eccent > 1.0e-7) {
    con = eccent * sinphi;
    return (1 - eccent * eccent) * (sinphi / (1 - con * con) - 0.5 / eccent * Math.log((1 - con) / (1 + con)));
  } else {
    return 2 * sinphi;
  }
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/laea.js




/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */

var S_POLE = 1;
var N_POLE = 2;
var EQUIT = 3;
var OBLIQ = 4;

/* Initialize the Lambert Azimuthal Equal Area projection
  ------------------------------------------------------*/
function laea_init() {
  var t = Math.abs(this.lat0);
  if (Math.abs(t - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
  } else if (Math.abs(t) < EPSLN) {
    this.mode = this.EQUIT;
  } else {
    this.mode = this.OBLIQ;
  }
  if (this.es > 0) {
    var sinphi;
    this.qp = qsfnz(this.e, 1);
    this.mmf = 0.5 / (1 - this.es);
    this.apa = authset(this.es);
    switch (this.mode) {
      case this.N_POLE:
        this.dd = 1;
        break;
      case this.S_POLE:
        this.dd = 1;
        break;
      case this.EQUIT:
        this.rq = Math.sqrt(0.5 * this.qp);
        this.dd = 1 / this.rq;
        this.xmf = 1;
        this.ymf = 0.5 * this.qp;
        break;
      case this.OBLIQ:
        this.rq = Math.sqrt(0.5 * this.qp);
        sinphi = Math.sin(this.lat0);
        this.sinb1 = qsfnz(this.e, sinphi) / this.qp;
        this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
        this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
        this.ymf = (this.xmf = this.rq) / this.dd;
        this.xmf *= this.dd;
        break;
    }
  } else {
    if (this.mode === this.OBLIQ) {
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }
  }
}

/* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
function laea_forward(p) {
  /* Forward equations
      -----------------*/
  var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
  var lam = p.x;
  var phi = p.y;
  lam = adjust_lon(lam - this.long0);
  if (this.sphere) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    coslam = Math.cos(lam);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      if (y <= EPSLN) {
        return null;
      }
      y = Math.sqrt(2 / y);
      x = y * cosphi * Math.sin(lam);
      y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        coslam = -coslam;
      }
      if (Math.abs(phi + this.lat0) < EPSLN) {
        return null;
      }
      y = FORTPI - phi * 0.5;
      y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y));
      x = y * Math.sin(lam);
      y *= coslam;
    }
  } else {
    sinb = 0;
    cosb = 0;
    b = 0;
    coslam = Math.cos(lam);
    sinlam = Math.sin(lam);
    sinphi = Math.sin(phi);
    q = qsfnz(this.e, sinphi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinb = q / this.qp;
      cosb = Math.sqrt(1 - sinb * sinb);
    }
    switch (this.mode) {
      case this.OBLIQ:
        b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
        break;
      case this.EQUIT:
        b = 1 + cosb * coslam;
        break;
      case this.N_POLE:
        b = HALF_PI + phi;
        q = this.qp - q;
        break;
      case this.S_POLE:
        b = phi - HALF_PI;
        q = this.qp + q;
        break;
    }
    if (Math.abs(b) < EPSLN) {
      return null;
    }
    switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        b = Math.sqrt(2 / b);
        if (this.mode === this.OBLIQ) {
          y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
        } else {
          y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
        }
        x = this.xmf * b * cosb * sinlam;
        break;
      case this.N_POLE:
      case this.S_POLE:
        if (q >= 0) {
          x = (b = Math.sqrt(q)) * sinlam;
          y = coslam * (this.mode === this.S_POLE ? b : -b);
        } else {
          x = y = 0;
        }
        break;
    }
  }
  p.x = this.a * x + this.x0;
  p.y = this.a * y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function laea_inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var lam, phi, cCe, sCe, q, rho, ab;
  if (this.sphere) {
    var cosz = 0,
      rh,
      sinz = 0;
    rh = Math.sqrt(x * x + y * y);
    phi = rh * 0.5;
    if (phi > 1) {
      return null;
    }
    phi = 2 * Math.asin(phi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinz = Math.sin(phi);
      cosz = Math.cos(phi);
    }
    switch (this.mode) {
      case this.EQUIT:
        phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin(y * sinz / rh);
        x *= sinz;
        y = cosz * rh;
        break;
      case this.OBLIQ:
        phi = Math.abs(rh) <= EPSLN ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
        x *= sinz * this.cosph0;
        y = (cosz - Math.sin(phi) * this.sinph0) * rh;
        break;
      case this.N_POLE:
        y = -y;
        phi = HALF_PI - phi;
        break;
      case this.S_POLE:
        phi -= HALF_PI;
        break;
    }
    lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y);
  } else {
    ab = 0;
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      x /= this.dd;
      y *= this.dd;
      rho = Math.sqrt(x * x + y * y);
      if (rho < EPSLN) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      sCe = 2 * Math.asin(0.5 * rho / this.rq);
      cCe = Math.cos(sCe);
      x *= sCe = Math.sin(sCe);
      if (this.mode === this.OBLIQ) {
        ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
        q = this.qp * ab;
        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
      } else {
        ab = y * sCe / rho;
        q = this.qp * ab;
        y = rho * cCe;
      }
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        y = -y;
      }
      q = x * x + y * y;
      if (!q) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      ab = 1 - q / this.qp;
      if (this.mode === this.S_POLE) {
        ab = -ab;
      }
    }
    lam = Math.atan2(x, y);
    phi = authlat(Math.asin(ab), this.apa);
  }
  p.x = adjust_lon(this.long0 + lam);
  p.y = phi;
  return p;
}

/* determine latitude from authalic latitude */
var P00 = 0.33333333333333333333;
var P01 = 0.17222222222222222222;
var P02 = 0.10257936507936507936;
var P10 = 0.06388888888888888888;
var P11 = 0.06640211640211640211;
var P20 = 0.01641501294219154443;
function authset(es) {
  var t;
  var APA = [];
  APA[0] = es * P00;
  t = es * es;
  APA[0] += t * P01;
  APA[1] = t * P10;
  t *= es;
  APA[0] += t * P02;
  APA[1] += t * P11;
  APA[2] = t * P20;
  return APA;
}
function authlat(beta, APA) {
  var t = beta + beta;
  return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t);
}
var laea_names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
/* harmony default export */ const laea = ({
  init: laea_init,
  forward: laea_forward,
  inverse: laea_inverse,
  names: laea_names,
  S_POLE: S_POLE,
  N_POLE: N_POLE,
  EQUIT: EQUIT,
  OBLIQ: OBLIQ
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/asinz.js
/* harmony default export */ function asinz(x) {
  if (Math.abs(x) > 1) {
    x = x > 1 ? 1 : -1;
  }
  return Math.asin(x);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/aea.js





function aea_init() {
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e3 = Math.sqrt(this.es);
  this.sin_po = Math.sin(this.lat1);
  this.cos_po = Math.cos(this.lat1);
  this.t1 = this.sin_po;
  this.con = this.sin_po;
  this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po);
  this.qs1 = qsfnz(this.e3, this.sin_po);
  this.sin_po = Math.sin(this.lat2);
  this.cos_po = Math.cos(this.lat2);
  this.t2 = this.sin_po;
  this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po);
  this.qs2 = qsfnz(this.e3, this.sin_po);
  this.sin_po = Math.sin(this.lat0);
  this.cos_po = Math.cos(this.lat0);
  this.t3 = this.sin_po;
  this.qs0 = qsfnz(this.e3, this.sin_po);
  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
  } else {
    this.ns0 = this.con;
  }
  this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
  this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
}

/* Albers Conical Equal Area forward equations--mapping lat,long to x,y
  -------------------------------------------------------------------*/
function aea_forward(p) {
  var lon = p.x;
  var lat = p.y;
  this.sin_phi = Math.sin(lat);
  this.cos_phi = Math.cos(lat);
  var qs = qsfnz(this.e3, this.sin_phi);
  var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
  var theta = this.ns0 * adjust_lon(lon - this.long0);
  var x = rh1 * Math.sin(theta) + this.x0;
  var y = this.rh - rh1 * Math.cos(theta) + this.y0;
  p.x = x;
  p.y = y;
  return p;
}
function aea_inverse(p) {
  var rh1, qs, con, theta, lon, lat;
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  if (this.ns0 >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  con = rh1 * this.ns0 / this.a;
  if (this.sphere) {
    lat = Math.asin((this.c - con * con) / (2 * this.ns0));
  } else {
    qs = (this.c - con * con) / this.ns0;
    lat = this.phi1z(this.e3, qs);
  }
  lon = adjust_lon(theta / this.ns0 + this.long0);
  p.x = lon;
  p.y = lat;
  return p;
}

/* Function to compute phi1, the latitude for the inverse of the
   Albers Conical Equal-Area projection.
-------------------------------------------*/
function phi1z(eccent, qs) {
  var sinphi, cosphi, con, com, dphi;
  var phi = asinz(0.5 * qs);
  if (eccent < EPSLN) {
    return phi;
  }
  var eccnts = eccent * eccent;
  for (var i = 1; i <= 25; i++) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    con = eccent * sinphi;
    com = 1 - con * con;
    dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi = phi + dphi;
    if (Math.abs(dphi) <= 1e-7) {
      return phi;
    }
  }
  return null;
}
var aea_names = ["Albers_Conic_Equal_Area", "Albers", "aea"];
/* harmony default export */ const aea = ({
  init: aea_init,
  forward: aea_forward,
  inverse: aea_inverse,
  names: aea_names,
  phi1z: phi1z
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/gnom.js




/*
  reference:
    Wolfram Mathworld "Gnomonic Projection"
    http://mathworld.wolfram.com/GnomonicProjection.html
    Accessed: 12th November 2009
  */
function gnom_init() {
  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
  // Approximation for projecting points to the horizon (infinity)
  this.infinity_dist = 1000 * this.a;
  this.rc = 1;
}

/* Gnomonic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function gnom_forward(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g;
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = adjust_lon(lon - this.long0);
  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);
  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if (g > 0 || Math.abs(g) <= EPSLN) {
    x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
  } else {
    // Point is in the opposing hemisphere and is unprojectable
    // We still need to return a reasonable point, so we project
    // to infinity, on a bearing
    // equivalent to the northern hemisphere equivalent
    // This is a reasonable approximation for short shapes and lines that
    // straddle the horizon.

    x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
    y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p.x = x;
  p.y = y;
  return p;
}
function gnom_inverse(p) {
  var rh; /* Rho */
  var sinc, cosc;
  var c;
  var lon, lat;

  /* Inverse equations
      -----------------*/
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  p.x /= this.k0;
  p.y /= this.k0;
  if (rh = Math.sqrt(p.x * p.x + p.y * p.y)) {
    c = Math.atan2(rh, this.rc);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = asinz(cosc * this.sin_p14 + p.y * sinc * this.cos_p14 / rh);
    lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
    lon = adjust_lon(this.long0 + lon);
  } else {
    lat = this.phic0;
    lon = 0;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var gnom_names = ["gnom"];
/* harmony default export */ const gnom = ({
  init: gnom_init,
  forward: gnom_forward,
  inverse: gnom_inverse,
  names: gnom_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/common/iqsfnz.js

/* harmony default export */ function iqsfnz(eccent, q) {
  var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
  if (Math.abs(Math.abs(q) - temp) < 1.0E-6) {
    if (q < 0) {
      return -1 * HALF_PI;
    } else {
      return HALF_PI;
    }
  }
  //var phi = 0.5* q/(1-eccent*eccent);
  var phi = Math.asin(0.5 * q);
  var dphi;
  var sin_phi;
  var cos_phi;
  var con;
  for (var i = 0; i < 30; i++) {
    sin_phi = Math.sin(phi);
    cos_phi = Math.cos(phi);
    con = eccent * sin_phi;
    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
  return NaN;
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/cea.js





/*
  reference:
    "Cartographic Projection Procedures for the UNIX Environment-
    A User's Manual" by Gerald I. Evenden,
    USGS Open File Report 90-284and Release 4 Interim Reports (2003)
*/
function cea_init() {
  //no-op
  if (!this.sphere) {
    this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
  }
}

/* Cylindrical Equal Area forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
function cea_forward(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y;
  /* Forward equations
      -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  if (this.sphere) {
    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
  } else {
    var qs = qsfnz(this.e, Math.sin(lat));
    x = this.x0 + this.a * this.k0 * dlon;
    y = this.y0 + this.a * qs * 0.5 / this.k0;
  }
  p.x = x;
  p.y = y;
  return p;
}

/* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
function cea_inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat;
  if (this.sphere) {
    lon = adjust_lon(this.long0 + p.x / this.a / Math.cos(this.lat_ts));
    lat = Math.asin(p.y / this.a * Math.cos(this.lat_ts));
  } else {
    lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
    lon = adjust_lon(this.long0 + p.x / (this.a * this.k0));
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var cea_names = ["cea"];
/* harmony default export */ const cea = ({
  init: cea_init,
  forward: cea_forward,
  inverse: cea_inverse,
  names: cea_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/eqc.js


function eqc_init() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Equidistant Cylindrical (Plate Carre)";
  this.rc = Math.cos(this.lat_ts);
}

// forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function eqc_forward(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = adjust_lon(lon - this.long0);
  var dlat = adjust_lat(lat - this.lat0);
  p.x = this.x0 + this.a * dlon * this.rc;
  p.y = this.y0 + this.a * dlat;
  return p;
}

// inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function eqc_inverse(p) {
  var x = p.x;
  var y = p.y;
  p.x = adjust_lon(this.long0 + (x - this.x0) / (this.a * this.rc));
  p.y = adjust_lat(this.lat0 + (y - this.y0) / this.a);
  return p;
}
var eqc_names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
/* harmony default export */ const eqc = ({
  init: eqc_init,
  forward: eqc_forward,
  inverse: eqc_inverse,
  names: eqc_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/poly.js









var poly_MAX_ITER = 20;
function poly_init() {
  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2); // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn(this.es);
  this.e1 = e1fn(this.es);
  this.e2 = e2fn(this.es);
  this.e3 = e3fn(this.es);
  this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); //si que des zeros le calcul ne se fait pas
}

/* Polyconic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function poly_forward(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y, el;
  var dlon = adjust_lon(lon - this.long0);
  el = dlon * Math.sin(lat);
  if (this.sphere) {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.a * this.lat0;
    } else {
      x = this.a * Math.sin(el) / Math.tan(lat);
      y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
    }
  } else {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.ml0;
    } else {
      var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
      x = nl * Math.sin(el);
      y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
    }
  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function poly_inverse(p) {
  var lon, lat, x, y, i;
  var al, bl;
  var phi, dphi;
  x = p.x - this.x0;
  y = p.y - this.y0;
  if (this.sphere) {
    if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
      lon = adjust_lon(x / this.a + this.long0);
      lat = 0;
    } else {
      al = this.lat0 + y / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var tanphi;
      for (i = poly_MAX_ITER; i; --i) {
        tanphi = Math.tan(phi);
        dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
        phi += dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      lon = adjust_lon(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat));
    }
  } else {
    if (Math.abs(y + this.ml0) <= EPSLN) {
      lat = 0;
      lon = adjust_lon(this.long0 + x / this.a);
    } else {
      al = (this.ml0 + y) / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var cl, mln, mlnp, ma;
      var con;
      for (i = poly_MAX_ITER; i; --i) {
        con = this.e * Math.sin(phi);
        cl = Math.sqrt(1 - con * con) * Math.tan(phi);
        mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
        ma = mln / this.a;
        dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
        phi -= dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }

      //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
      cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
      lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var poly_names = ["Polyconic", "poly"];
/* harmony default export */ const poly = ({
  init: poly_init,
  forward: poly_forward,
  inverse: poly_inverse,
  names: poly_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/nzmg.js


/*
  reference
    Department of Land and Survey Technical Circular 1973/32
      http://www.linz.govt.nz/docs/miscellaneous/nz-map-definition.pdf
    OSG Technical Report 4.1
      http://www.linz.govt.nz/docs/miscellaneous/nzmg.pdf
  */

/**
 * iterations: Number of iterations to refine inverse transform.
 *     0 -> km accuracy
 *     1 -> m accuracy -- suitable for most mapping applications
 *     2 -> mm accuracy
 */
var iterations = 1;
function nzmg_init() {
  this.A = [];
  this.A[1] = 0.6399175073;
  this.A[2] = -0.1358797613;
  this.A[3] = 0.063294409;
  this.A[4] = -0.02526853;
  this.A[5] = 0.0117879;
  this.A[6] = -0.0055161;
  this.A[7] = 0.0026906;
  this.A[8] = -0.001333;
  this.A[9] = 0.00067;
  this.A[10] = -0.00034;
  this.B_re = [];
  this.B_im = [];
  this.B_re[1] = 0.7557853228;
  this.B_im[1] = 0;
  this.B_re[2] = 0.249204646;
  this.B_im[2] = 0.003371507;
  this.B_re[3] = -0.001541739;
  this.B_im[3] = 0.041058560;
  this.B_re[4] = -0.10162907;
  this.B_im[4] = 0.01727609;
  this.B_re[5] = -0.26623489;
  this.B_im[5] = -0.36249218;
  this.B_re[6] = -0.6870983;
  this.B_im[6] = -1.1651967;
  this.C_re = [];
  this.C_im = [];
  this.C_re[1] = 1.3231270439;
  this.C_im[1] = 0;
  this.C_re[2] = -0.577245789;
  this.C_im[2] = -0.007809598;
  this.C_re[3] = 0.508307513;
  this.C_im[3] = -0.112208952;
  this.C_re[4] = -0.15094762;
  this.C_im[4] = 0.18200602;
  this.C_re[5] = 1.01418179;
  this.C_im[5] = 1.64497696;
  this.C_re[6] = 1.9660549;
  this.C_im[6] = 2.5127645;
  this.D = [];
  this.D[1] = 1.5627014243;
  this.D[2] = 0.5185406398;
  this.D[3] = -0.03333098;
  this.D[4] = -0.1052906;
  this.D[5] = -0.0368594;
  this.D[6] = 0.007317;
  this.D[7] = 0.01220;
  this.D[8] = 0.00394;
  this.D[9] = -0.0013;
}

/**
    New Zealand Map Grid Forward  - long/lat to x/y
    long/lat in radians
  */
function nzmg_forward(p) {
  var n;
  var lon = p.x;
  var lat = p.y;
  var delta_lat = lat - this.lat0;
  var delta_lon = lon - this.long0;

  // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
  // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
  var d_phi = delta_lat / SEC_TO_RAD * 1E-5;
  var d_lambda = delta_lon;
  var d_phi_n = 1; // d_phi^0

  var d_psi = 0;
  for (n = 1; n <= 10; n++) {
    d_phi_n = d_phi_n * d_phi;
    d_psi = d_psi + this.A[n] * d_phi_n;
  }

  // 2. Calculate theta
  var th_re = d_psi;
  var th_im = d_lambda;

  // 3. Calculate z
  var th_n_re = 1;
  var th_n_im = 0; // theta^0
  var th_n_re1;
  var th_n_im1;
  var z_re = 0;
  var z_im = 0;
  for (n = 1; n <= 6; n++) {
    th_n_re1 = th_n_re * th_re - th_n_im * th_im;
    th_n_im1 = th_n_im * th_re + th_n_re * th_im;
    th_n_re = th_n_re1;
    th_n_im = th_n_im1;
    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
  }

  // 4. Calculate easting and northing
  p.x = z_im * this.a + this.x0;
  p.y = z_re * this.a + this.y0;
  return p;
}

/**
    New Zealand Map Grid Inverse  -  x/y to long/lat
  */
function nzmg_inverse(p) {
  var n;
  var x = p.x;
  var y = p.y;
  var delta_x = x - this.x0;
  var delta_y = y - this.y0;

  // 1. Calculate z
  var z_re = delta_y / this.a;
  var z_im = delta_x / this.a;

  // 2a. Calculate theta - first approximation gives km accuracy
  var z_n_re = 1;
  var z_n_im = 0; // z^0
  var z_n_re1;
  var z_n_im1;
  var th_re = 0;
  var th_im = 0;
  for (n = 1; n <= 6; n++) {
    z_n_re1 = z_n_re * z_re - z_n_im * z_im;
    z_n_im1 = z_n_im * z_re + z_n_re * z_im;
    z_n_re = z_n_re1;
    z_n_im = z_n_im1;
    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
  }

  // 2b. Iterate to refine the accuracy of the calculation
  //        0 iterations gives km accuracy
  //        1 iteration gives m accuracy -- good enough for most mapping applications
  //        2 iterations bives mm accuracy
  for (var i = 0; i < this.iterations; i++) {
    var th_n_re = th_re;
    var th_n_im = th_im;
    var th_n_re1;
    var th_n_im1;
    var num_re = z_re;
    var num_im = z_im;
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }
    th_n_re = 1;
    th_n_im = 0;
    var den_re = this.B_re[1];
    var den_im = this.B_im[1];
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    // Complex division
    var den2 = den_re * den_re + den_im * den_im;
    th_re = (num_re * den_re + num_im * den_im) / den2;
    th_im = (num_im * den_re - num_re * den_im) / den2;
  }

  // 3. Calculate d_phi              ...                                    // and d_lambda
  var d_psi = th_re;
  var d_lambda = th_im;
  var d_psi_n = 1; // d_psi^0

  var d_phi = 0;
  for (n = 1; n <= 9; n++) {
    d_psi_n = d_psi_n * d_psi;
    d_phi = d_phi + this.D[n] * d_psi_n;
  }

  // 4. Calculate latitude and longitude
  // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
  var lat = this.lat0 + d_phi * SEC_TO_RAD * 1E5;
  var lon = this.long0 + d_lambda;
  p.x = lon;
  p.y = lat;
  return p;
}
var nzmg_names = ["New_Zealand_Map_Grid", "nzmg"];
/* harmony default export */ const nzmg = ({
  init: nzmg_init,
  forward: nzmg_forward,
  inverse: nzmg_inverse,
  names: nzmg_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/mill.js


/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */

/* Initialize the Miller Cylindrical projection
  -------------------------------------------*/
function mill_init() {
  //no-op
}

/* Miller Cylindrical forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
function mill_forward(p) {
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  var x = this.x0 + this.a * dlon;
  var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
  p.x = x;
  p.y = y;
  return p;
}

/* Miller Cylindrical inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
function mill_inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon = adjust_lon(this.long0 + p.x / this.a);
  var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);
  p.x = lon;
  p.y = lat;
  return p;
}
var mill_names = ["Miller_Cylindrical", "mill"];
/* harmony default export */ const mill = ({
  init: mill_init,
  forward: mill_forward,
  inverse: mill_inverse,
  names: mill_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/sinu.js



var sinu_MAX_ITER = 20;




function sinu_init() {
  /* Place parameters in static storage for common use
    -------------------------------------------------*/

  if (!this.sphere) {
    this.en = pj_enfn(this.es);
  } else {
    this.n = 1;
    this.m = 0;
    this.es = 0;
    this.C_y = Math.sqrt((this.m + 1) / this.n);
    this.C_x = this.C_y / (this.m + 1);
  }
}

/* Sinusoidal forward equations--mapping lat,long to x,y
  -----------------------------------------------------*/
function sinu_forward(p) {
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
    -----------------*/
  lon = adjust_lon(lon - this.long0);
  if (this.sphere) {
    if (!this.m) {
      lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
    } else {
      var k = this.n * Math.sin(lat);
      for (var i = sinu_MAX_ITER; i; --i) {
        var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
        lat -= V;
        if (Math.abs(V) < EPSLN) {
          break;
        }
      }
    }
    x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
    y = this.a * this.C_y * lat;
  } else {
    var s = Math.sin(lat);
    var c = Math.cos(lat);
    y = this.a * pj_mlfn(lat, s, c, this.en);
    x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
  }
  p.x = x;
  p.y = y;
  return p;
}
function sinu_inverse(p) {
  var lat, temp, lon, s;
  p.x -= this.x0;
  lon = p.x / this.a;
  p.y -= this.y0;
  lat = p.y / this.a;
  if (this.sphere) {
    lat /= this.C_y;
    lon = lon / (this.C_x * (this.m + Math.cos(lat)));
    if (this.m) {
      lat = asinz((this.m * lat + Math.sin(lat)) / this.n);
    } else if (this.n !== 1) {
      lat = asinz(Math.sin(lat) / this.n);
    }
    lon = adjust_lon(lon + this.long0);
    lat = adjust_lat(lat);
  } else {
    lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
    s = Math.abs(lat);
    if (s < HALF_PI) {
      s = Math.sin(lat);
      temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
      //temp = this.long0 + p.x / (this.a * Math.cos(lat));
      lon = adjust_lon(temp);
    } else if (s - EPSLN < HALF_PI) {
      lon = this.long0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var sinu_names = ["Sinusoidal", "sinu"];
/* harmony default export */ const sinu = ({
  init: sinu_init,
  forward: sinu_forward,
  inverse: sinu_inverse,
  names: sinu_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/moll.js

function moll_init() {}

/* Mollweide forward equations--mapping lat,long to x,y
    ----------------------------------------------------*/
function moll_forward(p) {
  /* Forward equations
      -----------------*/
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon(lon - this.long0);
  var theta = lat;
  var con = Math.PI * Math.sin(lat);

  /* Iterate using the Newton-Raphson method to find theta
      -----------------------------------------------------*/
  while (true) {
    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
    theta += delta_theta;
    if (Math.abs(delta_theta) < EPSLN) {
      break;
    }
  }
  theta /= 2;

  /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
       this is done here because of precision problems with "cos(theta)"
       --------------------------------------------------------------------------*/
  if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
    delta_lon = 0;
  }
  var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
  var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;
  p.x = x;
  p.y = y;
  return p;
}
function moll_inverse(p) {
  var theta;
  var arg;

  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  arg = p.y / (1.4142135623731 * this.a);

  /* Because of division by zero problems, 'arg' can not be 1.  Therefore
       a number very close to one is used instead.
       -------------------------------------------------------------------*/
  if (Math.abs(arg) > 0.999999999999) {
    arg = 0.999999999999;
  }
  theta = Math.asin(arg);
  var lon = adjust_lon(this.long0 + p.x / (0.900316316158 * this.a * Math.cos(theta)));
  if (lon < -Math.PI) {
    lon = -Math.PI;
  }
  if (lon > Math.PI) {
    lon = Math.PI;
  }
  arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
  if (Math.abs(arg) > 1) {
    arg = 1;
  }
  var lat = Math.asin(arg);
  p.x = lon;
  p.y = lat;
  return p;
}
var moll_names = ["Mollweide", "moll"];
/* harmony default export */ const moll = ({
  init: moll_init,
  forward: moll_forward,
  inverse: moll_inverse,
  names: moll_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/eqdc.js










function eqdc_init() {
  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.lat2 = this.lat2 || this.lat1;
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn(this.es);
  this.e1 = e1fn(this.es);
  this.e2 = e2fn(this.es);
  this.e3 = e3fn(this.es);
  this.sinphi = Math.sin(this.lat1);
  this.cosphi = Math.cos(this.lat1);
  this.ms1 = msfnz(this.e, this.sinphi, this.cosphi);
  this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);
  if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
    this.ns = this.sinphi;
  } else {
    this.sinphi = Math.sin(this.lat2);
    this.cosphi = Math.cos(this.lat2);
    this.ms2 = msfnz(this.e, this.sinphi, this.cosphi);
    this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
    this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
  }
  this.g = this.ml1 + this.ms1 / this.ns;
  this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
  this.rh = this.a * (this.g - this.ml0);
}

/* Equidistant Conic forward equations--mapping lat,long to x,y
  -----------------------------------------------------------*/
function eqdc_forward(p) {
  var lon = p.x;
  var lat = p.y;
  var rh1;

  /* Forward equations
      -----------------*/
  if (this.sphere) {
    rh1 = this.a * (this.g - lat);
  } else {
    var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
    rh1 = this.a * (this.g - ml);
  }
  var theta = this.ns * adjust_lon(lon - this.long0);
  var x = this.x0 + rh1 * Math.sin(theta);
  var y = this.y0 + this.rh - rh1 * Math.cos(theta);
  p.x = x;
  p.y = y;
  return p;
}

/* Inverse equations
  -----------------*/
function eqdc_inverse(p) {
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  var con, rh1, lat, lon;
  if (this.ns >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  if (this.sphere) {
    lon = adjust_lon(this.long0 + theta / this.ns);
    lat = adjust_lat(this.g - rh1 / this.a);
    p.x = lon;
    p.y = lat;
    return p;
  } else {
    var ml = this.g - rh1 / this.a;
    lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
    lon = adjust_lon(this.long0 + theta / this.ns);
    p.x = lon;
    p.y = lat;
    return p;
  }
}
var eqdc_names = ["Equidistant_Conic", "eqdc"];
/* harmony default export */ const eqdc = ({
  init: eqdc_init,
  forward: eqdc_forward,
  inverse: eqdc_inverse,
  names: eqdc_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/vandg.js




/* Initialize the Van Der Grinten projection
  ----------------------------------------*/
function vandg_init() {
  //this.R = 6370997; //Radius of earth
  this.R = this.a;
}
function vandg_forward(p) {
  var lon = p.x;
  var lat = p.y;

  /* Forward equations
    -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  var x, y;
  if (Math.abs(lat) <= EPSLN) {
    x = this.x0 + this.R * dlon;
    y = this.y0;
  }
  var theta = asinz(2 * Math.abs(lat / Math.PI));
  if (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    x = this.x0;
    if (lat >= 0) {
      y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
    } else {
      y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
    }
    //  return(OK);
  }
  var al = 0.5 * Math.abs(Math.PI / dlon - dlon / Math.PI);
  var asq = al * al;
  var sinth = Math.sin(theta);
  var costh = Math.cos(theta);
  var g = costh / (sinth + costh - 1);
  var gsq = g * g;
  var m = g * (2 / sinth - 1);
  var msq = m * m;
  var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
  if (dlon < 0) {
    con = -con;
  }
  x = this.x0 + con;
  //con = Math.abs(con / (Math.PI * this.R));
  var q = asq + g;
  con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
  if (lat >= 0) {
    //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 + con;
  } else {
    //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 - con;
  }
  p.x = x;
  p.y = y;
  return p;
}

/* Van Der Grinten inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
function vandg_inverse(p) {
  var lon, lat;
  var xx, yy, xys, c1, c2, c3;
  var a1;
  var m1;
  var con;
  var th1;
  var d;

  /* inverse equations
    -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  con = Math.PI * this.R;
  xx = p.x / con;
  yy = p.y / con;
  xys = xx * xx + yy * yy;
  c1 = -Math.abs(yy) * (1 + xys);
  c2 = c1 - 2 * yy * yy + xx * xx;
  c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
  d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
  a1 = (c1 - c2 * c2 / 3 / c3) / c3;
  m1 = 2 * Math.sqrt(-a1 / 3);
  con = 3 * d / a1 / m1;
  if (Math.abs(con) > 1) {
    if (con >= 0) {
      con = 1;
    } else {
      con = -1;
    }
  }
  th1 = Math.acos(con) / 3;
  if (p.y >= 0) {
    lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  } else {
    lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }
  if (Math.abs(xx) < EPSLN) {
    lon = this.long0;
  } else {
    lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var vandg_names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
/* harmony default export */ const vandg = ({
  init: vandg_init,
  forward: vandg_forward,
  inverse: vandg_inverse,
  names: vandg_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/aeqd.js










function aeqd_init() {
  this.sin_p12 = Math.sin(this.lat0);
  this.cos_p12 = Math.cos(this.lat0);
}
function aeqd_forward(p) {
  var lon = p.x;
  var lat = p.y;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var dlon = adjust_lon(lon - this.long0);
  var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5;
  if (this.sphere) {
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North Pole case
      p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
      p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South Pole case
      p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
      p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
      return p;
    } else {
      //default case
      cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
      c = Math.acos(cos_c);
      kp = c ? c / Math.sin(c) : 1;
      p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
      p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
      return p;
    }
  } else {
    e0 = e0fn(this.es);
    e1 = e1fn(this.es);
    e2 = e2fn(this.es);
    e3 = e3fn(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North Pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
      p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South Pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
      p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
      return p;
    } else {
      //Default case
      tanphi = sinphi / cosphi;
      Nl1 = gN(this.a, this.e, this.sin_p12);
      Nl = gN(this.a, this.e, sinphi);
      psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
      Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
      if (Az === 0) {
        s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      } else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
        s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      } else {
        s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
      }
      G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
      H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
      GH = G * H;
      Hs = H * H;
      s2 = s * s;
      s3 = s2 * s;
      s4 = s3 * s;
      s5 = s4 * s;
      c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
      p.x = this.x0 + c * Math.sin(Az);
      p.y = this.y0 + c * Math.cos(Az);
      return p;
    }
  }
}
function aeqd_inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F, sinpsi;
  if (this.sphere) {
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (rh > 2 * HALF_PI * this.a) {
      return;
    }
    z = rh / this.a;
    sinz = Math.sin(z);
    cosz = Math.cos(z);
    lon = this.long0;
    if (Math.abs(rh) <= EPSLN) {
      lat = this.lat0;
    } else {
      lat = asinz(cosz * this.sin_p12 + p.y * sinz * this.cos_p12 / rh);
      con = Math.abs(this.lat0) - HALF_PI;
      if (Math.abs(con) <= EPSLN) {
        if (this.lat0 >= 0) {
          lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y));
        } else {
          lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
        }
      } else {
        /*con = cosz - this.sin_p12 * Math.sin(lat);
        if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
          //no-op, just keep the lon value as is
        } else {
          var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
          lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
        }*/
        lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
      }
    }
    p.x = lon;
    p.y = lat;
    return p;
  } else {
    e0 = e0fn(this.es);
    e1 = e1fn(this.es);
    e2 = e2fn(this.es);
    e3 = e3fn(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = Mlp - rh;
      lat = imlfn(M / this.a, e0, e1, e2, e3);
      lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y));
      p.x = lon;
      p.y = lat;
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = rh - Mlp;
      lat = imlfn(M / this.a, e0, e1, e2, e3);
      lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
      p.x = lon;
      p.y = lat;
      return p;
    } else {
      //default case
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      Az = Math.atan2(p.x, p.y);
      N1 = gN(this.a, this.e, this.sin_p12);
      cosAz = Math.cos(Az);
      tmp = this.e * this.cos_p12 * cosAz;
      A = -tmp * tmp / (1 - this.es);
      B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
      D = rh / N1;
      Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24;
      F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6;
      psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
      lon = adjust_lon(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
      sinpsi = Math.sin(psi);
      lat = Math.atan2((sinpsi - this.es * F * this.sin_p12) * Math.tan(psi), sinpsi * (1 - this.es));
      p.x = lon;
      p.y = lat;
      return p;
    }
  }
}
var aeqd_names = ["Azimuthal_Equidistant", "aeqd"];
/* harmony default export */ const aeqd = ({
  init: aeqd_init,
  forward: aeqd_forward,
  inverse: aeqd_inverse,
  names: aeqd_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/ortho.js



function ortho_init() {
  //double temp;      /* temporary variable    */

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
}

/* Orthographic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function ortho_forward(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g, x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = adjust_lon(lon - this.long0);
  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);
  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if (g > 0 || Math.abs(g) <= EPSLN) {
    x = this.a * ksp * cosphi * Math.sin(dlon);
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p.x = x;
  p.y = y;
  return p;
}
function ortho_inverse(p) {
  var rh; /* height above ellipsoid      */
  var z; /* angle          */
  var sinz, cosz; /* sin of z and cos of z      */
  var con;
  var lon, lat;
  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  rh = Math.sqrt(p.x * p.x + p.y * p.y);
  z = asinz(rh / this.a);
  sinz = Math.sin(z);
  cosz = Math.cos(z);
  lon = this.long0;
  if (Math.abs(rh) <= EPSLN) {
    lat = this.lat0;
    p.x = lon;
    p.y = lat;
    return p;
  }
  lat = asinz(cosz * this.sin_p14 + p.y * sinz * this.cos_p14 / rh);
  con = Math.abs(this.lat0) - HALF_PI;
  if (Math.abs(con) <= EPSLN) {
    if (this.lat0 >= 0) {
      lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y));
    } else {
      lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
  p.x = lon;
  p.y = lat;
  return p;
}
var ortho_names = ["ortho"];
/* harmony default export */ const ortho = ({
  init: ortho_init,
  forward: ortho_forward,
  inverse: ortho_inverse,
  names: ortho_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/qsc.js
// QSC projection rewritten from the original PROJ4
// https://github.com/OSGeo/proj.4/blob/master/src/PJ_qsc.c



/* constants */
var FACE_ENUM = {
  FRONT: 1,
  RIGHT: 2,
  BACK: 3,
  LEFT: 4,
  TOP: 5,
  BOTTOM: 6
};
var AREA_ENUM = {
  AREA_0: 1,
  AREA_1: 2,
  AREA_2: 3,
  AREA_3: 4
};
function qsc_init() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Quadrilateralized Spherical Cube";

  /* Determine the cube face from the center of projection. */
  if (this.lat0 >= HALF_PI - FORTPI / 2.0) {
    this.face = FACE_ENUM.TOP;
  } else if (this.lat0 <= -(HALF_PI - FORTPI / 2.0)) {
    this.face = FACE_ENUM.BOTTOM;
  } else if (Math.abs(this.long0) <= FORTPI) {
    this.face = FACE_ENUM.FRONT;
  } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
    this.face = this.long0 > 0.0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
  } else {
    this.face = FACE_ENUM.BACK;
  }

  /* Fill in useful values for the ellipsoid <-> sphere shift
   * described in [LK12]. */
  if (this.es !== 0) {
    this.one_minus_f = 1 - (this.a - this.b) / this.a;
    this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
  }
}

// QSC forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function qsc_forward(p) {
  var xy = {
    x: 0,
    y: 0
  };
  var lat, lon;
  var theta, phi;
  var t, mu;
  /* nu; */
  var area = {
    value: 0
  };

  // move lon according to projection's lon
  p.x -= this.long0;

  /* Convert the geodetic latitude to a geocentric latitude.
   * This corresponds to the shift from the ellipsoid to the sphere
   * described in [LK12]. */
  if (this.es !== 0) {
    //if (P->es != 0) {
    lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
  } else {
    lat = p.y;
  }

  /* Convert the input lat, lon into theta, phi as used by QSC.
   * This depends on the cube face and the area on it.
   * For the top and bottom face, we can compute theta and phi
   * directly from phi, lam. For the other faces, we must use
   * unit sphere cartesian coordinates as an intermediate step. */
  lon = p.x; //lon = lp.lam;
  if (this.face === FACE_ENUM.TOP) {
    phi = HALF_PI - lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = lon - HALF_PI;
    } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_1;
      theta = lon > 0.0 ? lon - SPI : lon + SPI;
    } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
      area.value = AREA_ENUM.AREA_2;
      theta = lon + HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = HALF_PI + lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = -lon + HALF_PI;
    } else if (lon < FORTPI && lon >= -FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta = -lon;
    } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = -lon - HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon > 0.0 ? -lon + SPI : -lon - SPI;
    }
  } else {
    var q, r, s;
    var sinlat, coslat;
    var sinlon, coslon;
    if (this.face === FACE_ENUM.RIGHT) {
      lon = qsc_shift_lon_origin(lon, +HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lon = qsc_shift_lon_origin(lon, +SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lon = qsc_shift_lon_origin(lon, -HALF_PI);
    }
    sinlat = Math.sin(lat);
    coslat = Math.cos(lat);
    sinlon = Math.sin(lon);
    coslon = Math.cos(lon);
    q = coslat * coslon;
    r = coslat * sinlon;
    s = sinlat;
    if (this.face === FACE_ENUM.FRONT) {
      phi = Math.acos(q);
      theta = qsc_fwd_equat_face_theta(phi, s, r, area);
    } else if (this.face === FACE_ENUM.RIGHT) {
      phi = Math.acos(r);
      theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
    } else if (this.face === FACE_ENUM.BACK) {
      phi = Math.acos(-q);
      theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
    } else if (this.face === FACE_ENUM.LEFT) {
      phi = Math.acos(-r);
      theta = qsc_fwd_equat_face_theta(phi, s, q, area);
    } else {
      /* Impossible */
      phi = theta = 0;
      area.value = AREA_ENUM.AREA_0;
    }
  }

  /* Compute mu and nu for the area of definition.
   * For mu, see Eq. (3-21) in [OL76], but note the typos:
   * compare with Eq. (3-14). For nu, see Eq. (3-38). */
  mu = Math.atan(12 / SPI * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
  t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));

  /* Apply the result to the real area. */
  if (area.value === AREA_ENUM.AREA_1) {
    mu += HALF_PI;
  } else if (area.value === AREA_ENUM.AREA_2) {
    mu += SPI;
  } else if (area.value === AREA_ENUM.AREA_3) {
    mu += 1.5 * SPI;
  }

  /* Now compute x, y from mu and nu */
  xy.x = t * Math.cos(mu);
  xy.y = t * Math.sin(mu);
  xy.x = xy.x * this.a + this.x0;
  xy.y = xy.y * this.a + this.y0;
  p.x = xy.x;
  p.y = xy.y;
  return p;
}

// QSC inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function qsc_inverse(p) {
  var lp = {
    lam: 0,
    phi: 0
  };
  var mu, nu, cosmu, tannu;
  var tantheta, theta, cosphi, phi;
  var t;
  var area = {
    value: 0
  };

  /* de-offset */
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  /* Convert the input x, y to the mu and nu angles as used by QSC.
   * This depends on the area of the cube face. */
  nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
  mu = Math.atan2(p.y, p.x);
  if (p.x >= 0.0 && p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_0;
  } else if (p.y >= 0.0 && p.y >= Math.abs(p.x)) {
    area.value = AREA_ENUM.AREA_1;
    mu -= HALF_PI;
  } else if (p.x < 0.0 && -p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_2;
    mu = mu < 0.0 ? mu + SPI : mu - SPI;
  } else {
    area.value = AREA_ENUM.AREA_3;
    mu += HALF_PI;
  }

  /* Compute phi and theta for the area of definition.
   * The inverse projection is not described in the original paper, but some
   * good hints can be found here (as of 2011-12-14):
   * http://fits.gsfc.nasa.gov/fitsbits/saf.93/saf.9302
   * (search for "Message-Id: <9302181759.AA25477 at fits.cv.nrao.edu>") */
  t = SPI / 12 * Math.tan(mu);
  tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2));
  theta = Math.atan(tantheta);
  cosmu = Math.cos(mu);
  tannu = Math.tan(nu);
  cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
  if (cosphi < -1) {
    cosphi = -1;
  } else if (cosphi > +1) {
    cosphi = +1;
  }

  /* Apply the result to the real area on the cube face.
   * For the top and bottom face, we can compute phi and lam directly.
   * For the other faces, we must use unit sphere cartesian coordinates
   * as an intermediate step. */
  if (this.face === FACE_ENUM.TOP) {
    phi = Math.acos(cosphi);
    lp.phi = HALF_PI - phi;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = theta < 0.0 ? theta + SPI : theta - SPI;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = theta - HALF_PI;
    } else /* area.value == AREA_ENUM.AREA_3 */{
        lp.lam = theta;
      }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = Math.acos(cosphi);
    lp.phi = phi - HALF_PI;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = -theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = -theta;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = -theta - HALF_PI;
    } else /* area.value == AREA_ENUM.AREA_3 */{
        lp.lam = theta < 0.0 ? -theta - SPI : -theta + SPI;
      }
  } else {
    /* Compute phi and lam via cartesian unit sphere coordinates. */
    var q, r, s;
    q = cosphi;
    t = q * q;
    if (t >= 1) {
      s = 0;
    } else {
      s = Math.sqrt(1 - t) * Math.sin(theta);
    }
    t += s * s;
    if (t >= 1) {
      r = 0;
    } else {
      r = Math.sqrt(1 - t);
    }
    /* Rotate q,r,s into the correct area. */
    if (area.value === AREA_ENUM.AREA_1) {
      t = r;
      r = -s;
      s = t;
    } else if (area.value === AREA_ENUM.AREA_2) {
      r = -r;
      s = -s;
    } else if (area.value === AREA_ENUM.AREA_3) {
      t = r;
      r = s;
      s = -t;
    }
    /* Rotate q,r,s into the correct cube face. */
    if (this.face === FACE_ENUM.RIGHT) {
      t = q;
      q = -r;
      r = t;
    } else if (this.face === FACE_ENUM.BACK) {
      q = -q;
      r = -r;
    } else if (this.face === FACE_ENUM.LEFT) {
      t = q;
      q = r;
      r = -t;
    }
    /* Now compute phi and lam from the unit sphere coordinates. */
    lp.phi = Math.acos(-s) - HALF_PI;
    lp.lam = Math.atan2(r, q);
    if (this.face === FACE_ENUM.RIGHT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
    }
  }

  /* Apply the shift from the sphere to the ellipsoid as described
   * in [LK12]. */
  if (this.es !== 0) {
    var invert_sign;
    var tanphi, xa;
    invert_sign = lp.phi < 0 ? 1 : 0;
    tanphi = Math.tan(lp.phi);
    xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
    lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
    if (invert_sign) {
      lp.phi = -lp.phi;
    }
  }
  lp.lam += this.long0;
  p.x = lp.lam;
  p.y = lp.phi;
  return p;
}

/* Helper function for forward projection: compute the theta angle
 * and determine the area number. */
function qsc_fwd_equat_face_theta(phi, y, x, area) {
  var theta;
  if (phi < EPSLN) {
    area.value = AREA_ENUM.AREA_0;
    theta = 0.0;
  } else {
    theta = Math.atan2(y, x);
    if (Math.abs(theta) <= FORTPI) {
      area.value = AREA_ENUM.AREA_0;
    } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta -= HALF_PI;
    } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = theta >= 0.0 ? theta - SPI : theta + SPI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta += HALF_PI;
    }
  }
  return theta;
}

/* Helper function: shift the longitude. */
function qsc_shift_lon_origin(lon, offset) {
  var slon = lon + offset;
  if (slon < -SPI) {
    slon += TWO_PI;
  } else if (slon > +SPI) {
    slon -= TWO_PI;
  }
  return slon;
}
var qsc_names = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
/* harmony default export */ const qsc = ({
  init: qsc_init,
  forward: qsc_forward,
  inverse: qsc_inverse,
  names: qsc_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/robin.js
// Robinson projection
// Based on https://github.com/OSGeo/proj.4/blob/master/src/PJ_robin.c
// Polynomial coeficients from http://article.gmane.org/gmane.comp.gis.proj-4.devel/6039



var COEFS_X = [[1.0000, 2.2199e-17, -7.15515e-05, 3.1103e-06], [0.9986, -0.000482243, -2.4897e-05, -1.3309e-06], [0.9954, -0.00083103, -4.48605e-05, -9.86701e-07], [0.9900, -0.00135364, -5.9661e-05, 3.6777e-06], [0.9822, -0.00167442, -4.49547e-06, -5.72411e-06], [0.9730, -0.00214868, -9.03571e-05, 1.8736e-08], [0.9600, -0.00305085, -9.00761e-05, 1.64917e-06], [0.9427, -0.00382792, -6.53386e-05, -2.6154e-06], [0.9216, -0.00467746, -0.00010457, 4.81243e-06], [0.8962, -0.00536223, -3.23831e-05, -5.43432e-06], [0.8679, -0.00609363, -0.000113898, 3.32484e-06], [0.8350, -0.00698325, -6.40253e-05, 9.34959e-07], [0.7986, -0.00755338, -5.00009e-05, 9.35324e-07], [0.7597, -0.00798324, -3.5971e-05, -2.27626e-06], [0.7186, -0.00851367, -7.01149e-05, -8.6303e-06], [0.6732, -0.00986209, -0.000199569, 1.91974e-05], [0.6213, -0.010418, 8.83923e-05, 6.24051e-06], [0.5722, -0.00906601, 0.000182, 6.24051e-06], [0.5322, -0.00677797, 0.000275608, 6.24051e-06]];
var COEFS_Y = [[-5.20417e-18, 0.0124, 1.21431e-18, -8.45284e-11], [0.0620, 0.0124, -1.26793e-09, 4.22642e-10], [0.1240, 0.0124, 5.07171e-09, -1.60604e-09], [0.1860, 0.0123999, -1.90189e-08, 6.00152e-09], [0.2480, 0.0124002, 7.10039e-08, -2.24e-08], [0.3100, 0.0123992, -2.64997e-07, 8.35986e-08], [0.3720, 0.0124029, 9.88983e-07, -3.11994e-07], [0.4340, 0.0123893, -3.69093e-06, -4.35621e-07], [0.4958, 0.0123198, -1.02252e-05, -3.45523e-07], [0.5571, 0.0121916, -1.54081e-05, -5.82288e-07], [0.6176, 0.0119938, -2.41424e-05, -5.25327e-07], [0.6769, 0.011713, -3.20223e-05, -5.16405e-07], [0.7346, 0.0113541, -3.97684e-05, -6.09052e-07], [0.7903, 0.0109107, -4.89042e-05, -1.04739e-06], [0.8435, 0.0103431, -6.4615e-05, -1.40374e-09], [0.8936, 0.00969686, -6.4636e-05, -8.547e-06], [0.9394, 0.00840947, -0.000192841, -4.2106e-06], [0.9761, 0.00616527, -0.000256, -4.2106e-06], [1.0000, 0.00328947, -0.000319159, -4.2106e-06]];
var FXC = 0.8487;
var FYC = 1.3523;
var C1 = R2D / 5; // rad to 5-degree interval
var RC1 = 1 / C1;
var NODES = 18;
var poly3_val = function poly3_val(coefs, x) {
  return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
};
var poly3_der = function poly3_der(coefs, x) {
  return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
};
function newton_rapshon(f_df, start, max_err, iters) {
  var x = start;
  for (; iters; --iters) {
    var upd = f_df(x);
    x -= upd;
    if (Math.abs(upd) < max_err) {
      break;
    }
  }
  return x;
}
function robin_init() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.long0 = this.long0 || 0;
  this.es = 0;
  this.title = this.title || "Robinson";
}
function robin_forward(ll) {
  var lon = adjust_lon(ll.x - this.long0);
  var dphi = Math.abs(ll.y);
  var i = Math.floor(dphi * C1);
  if (i < 0) {
    i = 0;
  } else if (i >= NODES) {
    i = NODES - 1;
  }
  dphi = R2D * (dphi - RC1 * i);
  var xy = {
    x: poly3_val(COEFS_X[i], dphi) * lon,
    y: poly3_val(COEFS_Y[i], dphi)
  };
  if (ll.y < 0) {
    xy.y = -xy.y;
  }
  xy.x = xy.x * this.a * FXC + this.x0;
  xy.y = xy.y * this.a * FYC + this.y0;
  return xy;
}
function robin_inverse(xy) {
  var ll = {
    x: (xy.x - this.x0) / (this.a * FXC),
    y: Math.abs(xy.y - this.y0) / (this.a * FYC)
  };
  if (ll.y >= 1) {
    // pathologic case
    ll.x /= COEFS_X[NODES][0];
    ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
  } else {
    // find table interval
    var i = Math.floor(ll.y * NODES);
    if (i < 0) {
      i = 0;
    } else if (i >= NODES) {
      i = NODES - 1;
    }
    for (;;) {
      if (COEFS_Y[i][0] > ll.y) {
        --i;
      } else if (COEFS_Y[i + 1][0] <= ll.y) {
        ++i;
      } else {
        break;
      }
    }
    // linear interpolation in 5 degree interval
    var coefs = COEFS_Y[i];
    var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i + 1][0] - coefs[0]);
    // find t so that poly3_val(coefs, t) = ll.y
    t = newton_rapshon(function (x) {
      return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
    }, t, EPSLN, 100);
    ll.x /= poly3_val(COEFS_X[i], t);
    ll.y = (5 * i + t) * D2R;
    if (xy.y < 0) {
      ll.y = -ll.y;
    }
  }
  ll.x = adjust_lon(ll.x + this.long0);
  return ll;
}
var robin_names = ["Robinson", "robin"];
/* harmony default export */ const robin = ({
  init: robin_init,
  forward: robin_forward,
  inverse: robin_inverse,
  names: robin_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/geocent.js

function geocent_init() {
  this.name = 'geocent';
}
function geocent_forward(p) {
  var point = geodeticToGeocentric(p, this.es, this.a);
  return point;
}
function geocent_inverse(p) {
  var point = geocentricToGeodetic(p, this.es, this.a, this.b);
  return point;
}
var geocent_names = ["Geocentric", 'geocentric', "geocent", "Geocent"];
/* harmony default export */ const geocent = ({
  init: geocent_init,
  forward: geocent_forward,
  inverse: geocent_inverse,
  names: geocent_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/tpers.js
var mode = {
  N_POLE: 0,
  S_POLE: 1,
  EQUIT: 2,
  OBLIQ: 3
};


var params = {
  h: {
    def: 100000,
    num: true
  },
  // default is Karman line, no default in PROJ.7
  azi: {
    def: 0,
    num: true,
    degrees: true
  },
  // default is North
  tilt: {
    def: 0,
    num: true,
    degrees: true
  },
  // default is Nadir
  long0: {
    def: 0,
    num: true
  },
  // default is Greenwich, conversion to rad is automatic
  lat0: {
    def: 0,
    num: true
  } // default is Equator, conversion to rad is automatic
};
function tpers_init() {
  Object.keys(params).forEach(function (p) {
    if (typeof this[p] === "undefined") {
      this[p] = params[p].def;
    } else if (params[p].num && isNaN(this[p])) {
      throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
    } else if (params[p].num) {
      this[p] = parseFloat(this[p]);
    }
    if (params[p].degrees) {
      this[p] = this[p] * D2R;
    }
  }.bind(this));
  if (Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
  } else if (Math.abs(this.lat0) < EPSLN) {
    this.mode = mode.EQUIT;
  } else {
    this.mode = mode.OBLIQ;
    this.sinph0 = Math.sin(this.lat0);
    this.cosph0 = Math.cos(this.lat0);
  }
  this.pn1 = this.h / this.a; // Normalize relative to the Earth's radius

  if (this.pn1 <= 0 || this.pn1 > 1e10) {
    throw new Error("Invalid height");
  }
  this.p = 1 + this.pn1;
  this.rp = 1 / this.p;
  this.h1 = 1 / this.pn1;
  this.pfact = (this.p + 1) * this.h1;
  this.es = 0;
  var omega = this.tilt;
  var gamma = this.azi;
  this.cg = Math.cos(gamma);
  this.sg = Math.sin(gamma);
  this.cw = Math.cos(omega);
  this.sw = Math.sin(omega);
}
function tpers_forward(p) {
  p.x -= this.long0;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var coslam = Math.cos(p.x);
  var x, y;
  switch (this.mode) {
    case mode.OBLIQ:
      y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y = cosphi * coslam;
      break;
    case mode.S_POLE:
      y = -sinphi;
      break;
    case mode.N_POLE:
      y = sinphi;
      break;
  }
  y = this.pn1 / (this.p - y);
  x = y * cosphi * Math.sin(p.x);
  switch (this.mode) {
    case mode.OBLIQ:
      y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y *= sinphi;
      break;
    case mode.N_POLE:
      y *= -(cosphi * coslam);
      break;
    case mode.S_POLE:
      y *= cosphi * coslam;
      break;
  }

  // Tilt 
  var yt, ba;
  yt = y * this.cg + x * this.sg;
  ba = 1 / (yt * this.sw * this.h1 + this.cw);
  x = (x * this.cg - y * this.sg) * this.cw * ba;
  y = yt * ba;
  p.x = x * this.a;
  p.y = y * this.a;
  return p;
}
function tpers_inverse(p) {
  p.x /= this.a;
  p.y /= this.a;
  var r = {
    x: p.x,
    y: p.y
  };

  // Un-Tilt
  var bm, bq, yt;
  yt = 1 / (this.pn1 - p.y * this.sw);
  bm = this.pn1 * p.x * yt;
  bq = this.pn1 * p.y * this.cw * yt;
  p.x = bm * this.cg + bq * this.sg;
  p.y = bq * this.cg - bm * this.sg;
  var rh = hypot(p.x, p.y);
  if (Math.abs(rh) < EPSLN) {
    r.x = 0;
    r.y = p.y;
  } else {
    var cosz, sinz;
    sinz = 1 - rh * rh * this.pfact;
    sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
    cosz = Math.sqrt(1 - sinz * sinz);
    switch (this.mode) {
      case mode.OBLIQ:
        r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
        p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
        p.x *= sinz * this.cosph0;
        break;
      case mode.EQUIT:
        r.y = Math.asin(p.y * sinz / rh);
        p.y = cosz * rh;
        p.x *= sinz;
        break;
      case mode.N_POLE:
        r.y = Math.asin(cosz);
        p.y = -p.y;
        break;
      case mode.S_POLE:
        r.y = -Math.asin(cosz);
        break;
    }
    r.x = Math.atan2(p.x, p.y);
  }
  p.x = r.x + this.long0;
  p.y = r.y;
  return p;
}
var tpers_names = ["Tilted_Perspective", "tpers"];
/* harmony default export */ const tpers = ({
  init: tpers_init,
  forward: tpers_forward,
  inverse: tpers_inverse,
  names: tpers_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/geos.js

function geos_init() {
  this.flip_axis = this.sweep === 'x' ? 1 : 0;
  this.h = Number(this.h);
  this.radius_g_1 = this.h / this.a;
  if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
    throw new Error();
  }
  this.radius_g = 1.0 + this.radius_g_1;
  this.C = this.radius_g * this.radius_g - 1.0;
  if (this.es !== 0.0) {
    var one_es = 1.0 - this.es;
    var rone_es = 1 / one_es;
    this.radius_p = Math.sqrt(one_es);
    this.radius_p2 = one_es;
    this.radius_p_inv2 = rone_es;
    this.shape = 'ellipse'; // Use as a condition in the forward and inverse functions.
  } else {
    this.radius_p = 1.0;
    this.radius_p2 = 1.0;
    this.radius_p_inv2 = 1.0;
    this.shape = 'sphere'; // Use as a condition in the forward and inverse functions.
  }
  if (!this.title) {
    this.title = "Geostationary Satellite View";
  }
}
function geos_forward(p) {
  var lon = p.x;
  var lat = p.y;
  var tmp, v_x, v_y, v_z;
  lon = lon - this.long0;
  if (this.shape === 'ellipse') {
    lat = Math.atan(this.radius_p2 * Math.tan(lat));
    var r = this.radius_p / hypot(this.radius_p * Math.cos(lat), Math.sin(lat));
    v_x = r * Math.cos(lon) * Math.cos(lat);
    v_y = r * Math.sin(lon) * Math.cos(lat);
    v_z = r * Math.sin(lat);
    if ((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2 < 0.0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    tmp = this.radius_g - v_x;
    if (this.flip_axis) {
      p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
      p.y = this.radius_g_1 * Math.atan(v_z / tmp);
    } else {
      p.x = this.radius_g_1 * Math.atan(v_y / tmp);
      p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
    }
  } else if (this.shape === 'sphere') {
    tmp = Math.cos(lat);
    v_x = Math.cos(lon) * tmp;
    v_y = Math.sin(lon) * tmp;
    v_z = Math.sin(lat);
    tmp = this.radius_g - v_x;
    if (this.flip_axis) {
      p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
      p.y = this.radius_g_1 * Math.atan(v_z / tmp);
    } else {
      p.x = this.radius_g_1 * Math.atan(v_y / tmp);
      p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
    }
  }
  p.x = p.x * this.a;
  p.y = p.y * this.a;
  return p;
}
function geos_inverse(p) {
  var v_x = -1.0;
  var v_y = 0.0;
  var v_z = 0.0;
  var a, b, det, k;
  p.x = p.x / this.a;
  p.y = p.y / this.a;
  if (this.shape === 'ellipse') {
    if (this.flip_axis) {
      v_z = Math.tan(p.y / this.radius_g_1);
      v_y = Math.tan(p.x / this.radius_g_1) * hypot(1.0, v_z);
    } else {
      v_y = Math.tan(p.x / this.radius_g_1);
      v_z = Math.tan(p.y / this.radius_g_1) * hypot(1.0, v_y);
    }
    var v_zp = v_z / this.radius_p;
    a = v_y * v_y + v_zp * v_zp + v_x * v_x;
    b = 2 * this.radius_g * v_x;
    det = b * b - 4 * a * this.C;
    if (det < 0.0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    k = (-b - Math.sqrt(det)) / (2.0 * a);
    v_x = this.radius_g + k * v_x;
    v_y *= k;
    v_z *= k;
    p.x = Math.atan2(v_y, v_x);
    p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
    p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y));
  } else if (this.shape === 'sphere') {
    if (this.flip_axis) {
      v_z = Math.tan(p.y / this.radius_g_1);
      v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1.0 + v_z * v_z);
    } else {
      v_y = Math.tan(p.x / this.radius_g_1);
      v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1.0 + v_y * v_y);
    }
    a = v_y * v_y + v_z * v_z + v_x * v_x;
    b = 2 * this.radius_g * v_x;
    det = b * b - 4 * a * this.C;
    if (det < 0.0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    k = (-b - Math.sqrt(det)) / (2.0 * a);
    v_x = this.radius_g + k * v_x;
    v_y *= k;
    v_z *= k;
    p.x = Math.atan2(v_y, v_x);
    p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
  }
  p.x = p.x + this.long0;
  return p;
}
var geos_names = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
/* harmony default export */ const geos = ({
  init: geos_init,
  forward: geos_forward,
  inverse: geos_inverse,
  names: geos_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/lib/projections/eqearth.js
/**
 * Copyright 2018 Bernie Jenny, Monash University, Melbourne, Australia.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Equal Earth is a projection inspired by the Robinson projection, but unlike
 * the Robinson projection retains the relative size of areas. The projection
 * was designed in 2018 by Bojan Savric, Tom Patterson and Bernhard Jenny.
 *
 * Publication:
 * Bojan Savric, Tom Patterson & Bernhard Jenny (2018). The Equal Earth map
 * projection, International Journal of Geographical Information Science,
 * DOI: 10.1080/13658816.2018.1504949
 *
 * Code released August 2018
 * Ported to JavaScript and adapted for mapshaper-proj by Matthew Bloch August 2018
 * Modified for proj4js by Andreas Hocevar by Andreas Hocevar March 2024
 */


var A1 = 1.340264,
  A2 = -0.081106,
  A3 = 0.000893,
  A4 = 0.003796,
  M = Math.sqrt(3) / 2.0;
function eqearth_init() {
  this.es = 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
}
function eqearth_forward(p) {
  var lam = adjust_lon(p.x - this.long0);
  var phi = p.y;
  var paramLat = Math.asin(M * Math.sin(phi)),
    paramLatSq = paramLat * paramLat,
    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
  p.x = lam * Math.cos(paramLat) / (M * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
  p.y = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}
function eqearth_inverse(p) {
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  var EPS = 1e-9,
    NITER = 12,
    paramLat = p.y,
    paramLatSq,
    paramLatPow6,
    fy,
    fpy,
    dlat,
    i;
  for (i = 0; i < NITER; ++i) {
    paramLatSq = paramLat * paramLat;
    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
    fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - p.y;
    fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
    paramLat -= dlat = fy / fpy;
    if (Math.abs(dlat) < EPS) {
      break;
    }
  }
  paramLatSq = paramLat * paramLat;
  paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
  p.x = M * p.x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat);
  p.y = Math.asin(Math.sin(paramLat) / M);
  p.x = adjust_lon(p.x + this.long0);
  return p;
}
var eqearth_names = ["eqearth", "Equal Earth", "Equal_Earth"];
/* harmony default export */ const eqearth = ({
  init: eqearth_init,
  forward: eqearth_forward,
  inverse: eqearth_inverse,
  names: eqearth_names
});
;// CONCATENATED MODULE: ./node_modules/proj4/projs.js






























/* harmony default export */ function proj4_projs(proj4) {
  proj4.Proj.projections.add(tmerc);
  proj4.Proj.projections.add(etmerc);
  proj4.Proj.projections.add(utm);
  proj4.Proj.projections.add(sterea);
  proj4.Proj.projections.add(stere);
  proj4.Proj.projections.add(somerc);
  proj4.Proj.projections.add(omerc);
  proj4.Proj.projections.add(lcc);
  proj4.Proj.projections.add(krovak);
  proj4.Proj.projections.add(cass);
  proj4.Proj.projections.add(laea);
  proj4.Proj.projections.add(aea);
  proj4.Proj.projections.add(gnom);
  proj4.Proj.projections.add(cea);
  proj4.Proj.projections.add(eqc);
  proj4.Proj.projections.add(poly);
  proj4.Proj.projections.add(nzmg);
  proj4.Proj.projections.add(mill);
  proj4.Proj.projections.add(sinu);
  proj4.Proj.projections.add(moll);
  proj4.Proj.projections.add(eqdc);
  proj4.Proj.projections.add(vandg);
  proj4.Proj.projections.add(aeqd);
  proj4.Proj.projections.add(ortho);
  proj4.Proj.projections.add(qsc);
  proj4.Proj.projections.add(robin);
  proj4.Proj.projections.add(geocent);
  proj4.Proj.projections.add(tpers);
  proj4.Proj.projections.add(geos);
  proj4.Proj.projections.add(eqearth);
}
;// CONCATENATED MODULE: ./node_modules/proj4/lib/index.js









core.defaultDatum = 'WGS84'; //default datum
core.Proj = Proj;
core.WGS84 = new core.Proj('WGS84');
core.Point = lib_Point;
core.toPoint = toPoint;
core.defs = lib_defs;
core.nadgrid = nadgrid;
core.transform = transform;
core.mgrs = mgrs;
core.version = '__VERSION__';
proj4_projs(core);
/* harmony default export */ const lib = (core);

/***/ }),

/***/ 6321:
/***/ ((module) => {

/* pass 1 */
var A = ' +no_defs',
  B = ' +towgs84=0,0,0,0,0,0,0',
  C = ' +ellps=GRS80',
  D = '+proj=tmerc',
  E = ' +units=m',
  F = ' +towgs84=23.92,-141.27,-80.9,-0,0.35,0.82,-0.12',
  G = ' +towgs84=24.47,-130.89,-81.56,-0,-0,0.13,-0.22',
  H = '+proj=lcc',
  I = '+proj=utm',
  J = ' +units=us-ft',
  K = '+proj=longlat',
  L = ' +lat_0=0',
  M = ' +ellps=krass',
  N = ' +y_0=0',
  O = ' +x_0=500000',
  P = ' +towgs84=0,0,4.5,0,0,0.554,0.2263',
  Q = ' +towgs84=0,0,1.9,0,0,0.814,-0.38',
  R = ' +ellps=intl',
  S = ' +datum=WGS84',
  T = ' +ellps=WGS72',
  U = ' +towgs84=15.8,-154.4,-82.3,0,0,0,0',
  V = ' +k=0.9999',
  W = ' +towgs84=59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993',
  X = ' +datum=NAD27',
  Y = ' +ellps=bessel',
  Z = ' +x_0=609601.2192024384',
  a = ' +x_0=600000',
  b = ' +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84',
  c = ' +ellps=clrk80',
  d = ' +b=6356755.288157528',
  e = ' +x_0=152400.3048006096',
  f = ' +lat_0=36.66666666666666',
  g = ' +towgs84=-146.414,507.337,680.507,0,0,0,0',
  h = ' +x_0=200000',
  i = ' +ellps=clrk66',
  j = ' +ellps=WGS84',
  k = ' +x_0=500000.001016002',
  l = ' +x_0=240000',
  m = ' +lat_0=-90',
  n = ' +towgs84=-87,-98,-121,0,0,0,0',
  o = ' +south',
  p = ' +lat_0=41.66666666666666',
  q = ' +y_0=36000',
  r = ' +towgs84=-117.808,-51.536,137.784,0.303,0.446,0.234,-0.29',
  s = ' +x_0=0',
  t = ' +units=ft',
  u = ' +x_0=400000',
  v = ' +towgs84=-115.854,-99.0583,-152.462,0,0,0,0',
  w = ' +towgs84=-208.406,-109.878,-2.5764,0,0,0,0',
  x = ' +ellps=aust_SA',
  y = ' +lat_0=39.33333333333334',
  z = ' +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232',
  AA = ' +lat_0=37.66666666666666',
  AB = ' +lat_0=36.33333333333334',
  AC = ' +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7',
  AD = ' +y_0=500000.0001016001',
  AE = ' +x_0=200000.0001016002',
  AF = ' +x_0=500000.0001016001',
  AG = ' +x_0=500000.00001016',
  AH = ' +y_0=1000000',
  AI = ' +x_0=300000',
  AJ = ' +lon_0=-120.5',
  AK = ' +lat_0=43.66666666666666',
  AL = ' +lat_0=43.83333333333334',
  AM = ' +lat_1=-68.66666666666667',
  AN = ' +lat_2=-71.33333333333333',
  AO = ' +k=0.999966667',
  AP = ' +k=0.9996',
  AQ = ' +lat_0=38.33333333333334',
  AR = ' +lat_1=73.66666666666667',
  AS = ' +lat_2=70.33333333333333',
  AT = ' +lat_0=72.02500919444445',
  AU = ' +a=6378249.2',
  AV = ' +x_0=1500000',
  AW = ' +lat_ts=-80.23861111111111',
  AX = ' +towgs84=-288,175,-376,0,0,0,0',
  AY = ' +lat_1=41.78333333333333',
  AZ = ' +lat_2=-75.33333333333333',
  Aa = ' +towgs84=278.3,93,474.5,7.889,0.05,-6.61,6.21',
  Ab = ' +x_0=304800',
  Ac = ' +x_0=2000000.0001016',
  Ad = ' +k=0.9999375',
  Ae = ' +y_0=500000',
  Af = ' +towgs84=-209.362,-87.8162,404.62,0.0046,3.4784,0.5805,-1.4547',
  Ag = ' +lon_0=-100.3333333333333',
  Ah = ' +lat_1=-72.66666666666667',
  Ai = ' +lat_1=-76.66666666666667',
  Aj = ' +lat_2=-79.33333333333333',
  Ak = ' +y_0=10000000',
  Al = ' +towgs84=-57,1,-41,0,0,0,0',
  Am = ' +k=0.999941177',
  An = ' +x_0=800000.0000101599',
  Ao = ' +y_0=99999.99998983997',
  Ap = ' +lat_1=38.43333333333333',
  Aq = ' +lat_0=24.33333333333333',
  Ar = ' +towgs84=26,-121,-78,0,0,0,0',
  As = ' +a=6378140',
  At = ' +towgs84=-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496',
  Au = ' +x_0=399999.99998984',
  Av = ' +towgs84=-24,-15,5,0,0,0,0',
  Aw = ' +towgs84=682,-203,480,0,0,0,0',
  Ax = ' +towgs84=-136,-108,-292,0,0,0,0',
  Ay = ' +b=6356075.41314024',
  Az = ' +lat_1=37.96666666666667',
  BA = ' +lat_0=38.83333333333334',
  BB = ' +lat_0=40.16666666666666',
  BC = ' +lat_0=34.33333333333334',
  BD = ' +lat_0=42.83333333333334',
  BE = ' +lon_0=-84.36666666666666',
  BF = ' +x_0=300000.0000000001',
  BG = ' +k=0.999933333',
  BH = ' +lat_1=48.73333333333333',
  BI = ' +lon_0=-111.5',
  BJ = ' +k=0.9999473679999999',
  BK = ' +towgs84=-67.35,3.88,-38.22,0,0,0,0',
  BL = ' +lat_2=73.66666666666667',
  BM = ' +lat_0=75.36440330555556',
  BN = ' +b=6356515',
  BO = ' +towgs84=25,-141,-78.5,-0,0.35,0.736,0',
  BP = '+proj=stere',
  BQ = ' +lat_1=-64.66666666666667',
  BR = ' +lat_2=-67.33333333333333',
  BS = ' +b=6356514.966398753',
  BT = ' +towgs84=295,736,257,0,0,0,0',
  BU = ' +x_0=100000',
  BV = ' +towgs84=-11,851,5,0,0,0,0',
  BW = ' +towgs84=414.1,41.3,603.1,-0.855,2.141,-7.023,0',
  BX = ' +towgs84=-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06',
  BY = ' +lat_0=39.66666666666666',
  BZ = ' +x_0=1000000',
  Ba = ' +lon_0=-105.5',
  Bb = ' +towgs84=482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15',
  Bc = ' +a=6378249.145',
  Bd = ' +x_0=2000000',
  Be = ' +lat_0=45.66666666666666',
  Bf = ' +lat_1=80.33333333333333',
  Bg = ' +lat_0=78.70733752777778',
  Bh = ' +b=6356774.50408554',
  Bi = ' +lon_0=-91.33333333333333',
  Bj = ' +lon_0=-123.3333333333333',
  Bk = ' +towgs84=-168,-60,320,0,0,0,0',
  Bl = ' +lat_0=31',
  Bm = ' +towgs84=0.072,-0.507,-0.245,-0.0183,0.0003,-0.007,-0.0093',
  Bn = ' +x_0=150000',
  Bo = ' +x_0=3500000',
  Bp = ' +towgs84=213.11,9.37,-74.95,0,0,0,0',
  Bq = ' +lat_1=43.66666666666666',
  Br = ' +lat_0=40.33333333333334',
  Bs = ' +towgs84=-148,136,90,0,0,0,0',
  Bt = ' +towgs84=616,97,-251,0,0,0,0',
  Bu = ' +lon_0=-90',
  Bv = ' +x_0=250000',
  Bw = ' +x_0=914401.8288036576',
  Bx = ' +lon_0=-90.33333333333333',
  By = ' +a=6377276.345',
  Bz = ' +b=6356103.038993155',
  CA = ' +lat_0=40.5',
  CB = ' +towgs84=-134,-48,149,0,0,0,0',
  CC = ' +towgs84=25,-141,-78.5,0,0.35,0.736,0',
  CD = ' +lat_1=27.83333333333333',
  CE = ' +lat_2=26.16666666666667',
  CF = ' +lat_2=40.71666666666667',
  CG = ' +lat_2=39.01666666666667',
  CH = ' +lat_2=37.21666666666667',
  CI = ' +lat_1=70.33333333333333',
  CJ = ' +lat_0=68.68747555555557',
  CK = ' +towgs84=-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68',
  CL = ' +y_0=304800.6096012192',
  CM = ' +x_0=699999.9998983998',
  CN = ' +y_0=999999.9998983998',
  CO = ' +y_0=800000',
  CP = ' +k=0.99995',
  CQ = ' +lat_0=34.75',
  CR = ' +lon_0=-81',
  CS = ' +lon_0=-100',
  CT = ' +b=6356098.145120132',
  CU = '+proj=omerc',
  CV = ' +lon_0=-98.5',
  CW = ' +towgs84=-103.746,-9.614,-255.95,0,0,0,0',
  CX = ' +x_0=800000',
  CY = ' +lat_0=37.83333333333334',
  CZ = ' +lat_2=44.33333333333334',
  Ca = ' +lat_2=42.33333333333334',
  Cb = ' +lat_0=29.66666666666667',
  Cc = ' +lat_0=25.66666666666667',
  Cd = ' +lat_0=35.83333333333334',
  Ce = ' +lat_1=83.66666666666667',
  Cf = ' +lat_2=80.33333333333333',
  Cg = ' +lat_0=82.05842488888888',
  Ch = ' +lat_0=38',
  Ci = ' +x_0=2500000',
  Cj = ' +towgs84=-377,681,-50,0,0,0,0',
  Ck = '+proj=cass',
  Cl = ' +y_0=2000000',
  Cm = ' +towgs84=-143,-236,7,0,0,0,0',
  Cn = ' +lon_0=-110.1666666666667',
  Co = ' +lon_0=-111.9166666666667',
  Cp = ' +lon_0=-75.41666666666667',
  Cq = ' +lon_0=-82.16666666666667',
  Cr = ' +lon_0=-84.16666666666667',
  Cs = ' +lon_0=-112.1666666666667',
  Ct = ' +lon_0=-88.83333333333333',
  Cu = ' +lon_0=-104.3333333333333',
  Cv = ' +lon_0=-107.8333333333333',
  Cw = ' +lon_0=-76.58333333333333',
  Cx = ' +lon_0=-78.58333333333333',
  Cy = ' +lon_0=-120.8333333333333',
  Cz = ' +lon_0=-88.33333333333333',
  DA = ' +lon_0=-90.16666666666667',
  DB = ' +lon_0=-85.66666666666667',
  DC = ' +lon_0=-87.08333333333333',
  DD = ' +lon_0=-70.16666666666667',
  DE = ' +lon_0=-93.09999999999999',
  DF = ' +lon_0=-115.5833333333333',
  DG = ' +lon_0=-116.6666666666667',
  DH = ' +lon_0=-118.5833333333333',
  DI = ' +lon_0=-71.66666666666667',
  DJ = ' +lon_0=-105.1666666666667',
  DK = ' +lon_0=-107.3333333333333',
  DL = ' +lon_0=-110.0833333333333',
  DM = ' +lat_0=37.5',
  DN = ' +y_0=700000',
  DO = ' +towgs84=-242.2,-144.9,370.3,0,0,0,0',
  DP = ' +x_0=4500000',
  DQ = ' +y_0=1500000',
  DR = ' +x_0=599999.9999976',
  DS = ' +towgs84=-275.722,94.7824,340.894,-8.001,-4.42,-11.821,1',
  DT = '+proj=aea',
  DU = ' +y_0=-2500000',
  DV = ' +lat_2=38.96666666666667',
  DW = ' +lat_1=41.66666666666666',
  DX = ' +lat_1=39.83333333333334',
  DY = ' +lat_2=38.33333333333334',
  DZ = ' +lat_2=37.06666666666667',
  Da = ' +lat_0=35.33333333333334',
  Db = ' +lat_1=35.46666666666667',
  Dc = ' +lat_2=34.03333333333333',
  Dd = ' +lat_1=33.88333333333333',
  De = ' +lat_2=32.78333333333333',
  Df = ' +lat_0=32.16666666666666',
  Dg = ' +lat_2=37.23333333333333',
  Dh = ' +lat_1=41.86666666666667',
  Di = ' +lat_0=40.83333333333334',
  Dj = ' +lat_2=29.58333333333333',
  Dk = ' +lat_2=41.71666666666667',
  Dl = ' +lat_1=41.03333333333333',
  Dm = ' +lat_2=40.66666666666666',
  Dn = ' +lat_1=36.76666666666667',
  Do = ' +lat_0=33.33333333333334',
  Dp = ' +lat_1=40.96666666666667',
  Dq = ' +lat_2=39.93333333333333',
  Dr = ' +lat_0=31.83333333333333',
  Ds = ' +lat_0=31.66666666666667',
  Dt = ' +lat_0=27.83333333333333',
  Du = ' +lat_2=36.76666666666667',
  Dv = ' +lat_0=45.33333333333334',
  Dw = ' +lat_0=45.16666666666666',
  Dx = ' +lat_1=36.23333333333333',
  Dy = ' +lat_2=34.93333333333333',
  Dz = ' +lat_1=34.76666666666667',
  EA = ' +lat_0=32.66666666666666',
  EB = ' +lat_1=43.26666666666667',
  EC = ' +lat_2=42.06666666666667',
  ED = ' +lat_2=40.61666666666667',
  EE = ' +lat_1=39.78333333333333',
  EF = ' +lat_2=38.71666666666667',
  EG = ' +lat_1=38.56666666666667',
  EH = ' +lat_2=37.26666666666667',
  EI = ' +lat_0=41.08333333333334',
  EJ = ' +lat_0=42.33333333333334',
  EK = ' +y_0=100000',
  EL = ' +b=6356173.508712696',
  EM = ' +y_0=5500000',
  EN = ' +lon_0=105',
  EO = ' +y_0=-5000000',
  EP = ' +k=0.9995000000000001',
  EQ = ' +k=0.9999749999999999',
  ER = ' +towgs84=-160,-6,-302,0,0,0,0',
  ES = ' +towgs84=307,304,-318,0,0,0,0',
  ET = ' +lon_0=-82.5',
  EU = ' +towgs84=70.995,-335.916,262.898,0,0,0,0',
  EV = ' +towgs84=-304.046,-60.576,103.64,0,0,0,0',
  EW = ' +x_0=700000',
  EX = ' +x_0=213360',
  EY = ' +lon_0=-85.75',
  EZ = ' +lon_0=-100.5',
  Ea = ' +lon_0=-77.75',
  Eb = ' +x_0=999999.9999898402',
  Ec = ' +towgs84=-151.99,287.04,-147.45,0,0,0,0',
  Ed = ' +lon_0=129',
  Ee = ' +a=6378293.645208759',
  Ef = ' +b=6356617.987679838',
  Eg = ' +x_0=5500000',
  Eh = ' +lat_1=40.78333333333333',
  Ei = ' +lat_2=39.71666666666667',
  Ej = ' +lat_1=37.93333333333333',
  Ek = ' +lat_2=36.73333333333333',
  El = ' +lat_1=42.68333333333333',
  Em = ' +lat_1=41.48333333333333',
  En = ' +lat_2=41.28333333333333',
  Eo = ' +lat_1=47.08333333333334',
  Ep = ' +lat_2=45.48333333333333',
  Eq = ' +lat_0=44.78333333333333',
  Er = ' +lat_2=44.18333333333333',
  Es = ' +lat_0=43.31666666666667',
  Et = ' +lat_1=36.16666666666666',
  Eu = ' +lat_2=34.33333333333334',
  Ev = ' +lat_2=47.43333333333333',
  Ew = ' +lat_1=47.48333333333333',
  Ex = ' +lat_2=46.18333333333333',
  Ey = ' +lat_2=35.56666666666667',
  Ez = ' +lat_1=35.23333333333333',
  FA = ' +lat_2=33.93333333333333',
  FB = ' +lat_2=40.88333333333333',
  FC = ' +lat_1=34.83333333333334',
  FD = ' +lat_1=36.41666666666666',
  FE = ' +lat_1=36.18333333333333',
  FF = ' +lat_1=33.96666666666667',
  FG = ' +lat_2=32.13333333333333',
  FH = ' +lat_1=31.88333333333333',
  FI = ' +lat_2=30.11666666666667',
  FJ = ' +lat_1=30.28333333333333',
  FK = ' +lat_2=28.38333333333333',
  FL = ' +lat_2=38.03333333333333',
  FM = ' +lat_1=47.33333333333334',
  FN = ' +lat_2=45.83333333333334',
  FO = ' +lat_1=46.76666666666667',
  FP = ' +lat_2=45.56666666666667',
  FQ = ' +lat_1=44.06666666666667',
  FR = ' +lat_2=42.73333333333333',
  FS = ' +lat_1=32.66666666666666',
  FT = ' +lat_2=31.16666666666667',
  FU = ' +lat_1=48.63333333333333',
  FV = ' +lat_2=47.03333333333333',
  FW = ' +lat_2=45.61666666666667',
  FX = ' +lat_1=45.21666666666667',
  FY = ' +lat_2=43.78333333333333',
  FZ = ' +lat_0=39.83333333333334',
  Fa = ' +lat_2=40.43333333333333',
  Fb = ' +lat_1=40.03333333333333',
  Fc = ' +lat_2=38.73333333333333',
  Fd = ' +lat_1=45.68333333333333',
  Fe = ' +lat_2=44.41666666666666',
  Ff = ' +lat_2=42.83333333333334',
  Fg = ' +lat_1=38.88333333333333',
  Fh = ' +lat_2=37.48333333333333',
  Fi = ' +lat_1=37.08333333333334',
  Fj = ' +lat_2=38.66666666666666',
  Fk = ' +lat_0=58',
  Fl = ' +lon_0=-98',
  Fm = ' +lon_0=117',
  Fn = ' +lon_0=135',
  Fo = ' +lat_0=41.5',
  Fp = ' +lat_0=42.5',
  Fq = ' +y_0=3000000',
  Fr = ' +lon_0=123',
  Fs = ' +lat_0=40',
  Ft = ' +lat_0=54',
  Fu = ' +towgs84=-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188',
  Fv = ' +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725',
  Fw = ' +x_0=914401.8289',
  Fx = ' +y_0=304800.6096',
  Fy = ' +lon_0=111',
  Fz = ' +k_0=0.99878641',
  GA = ' +lon_0=-66.43333333333334',
  GB = ' +towgs84=61,-285,-181,0,0,0,0',
  GC = ' +towgs84=-133,-77,-51,0,0,0,0',
  GD = ' +towgs84=-679,669,-48,0,0,0,0',
  GE = ' +lon_0=-71.5',
  GF = ' +lon_0=-78.5',
  GG = ' +lon_0=-93.5',
  GH = ' +lat_0=41.75',
  GI = ' +y_0=249999.9998983998',
  GJ = ' +y_0=999999.9999898402',
  GK = ' +to_meter=1.0000135965',
  GL = ' +a=6377304.063',
  GM = ' +lat_0=36',
  GN = ' +towgs84=-79.9,-158,-168.9,0,0,0,0',
  GO = ' +towgs84=-50.9,-347.6,-231,0,0,0,0',
  GP = ' +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747',
  GQ = ' +towgs84=283,682,231,0,0,0,0',
  GR = ' +towgs84=-206,172,-6,0,0,0,0',
  GS = ' +towgs84=-92,-93,122,0,0,0,0',
  GT = ' +to_meter=0.9143985307444408',
  GU = '+proj=sterea',
  GV = ' +lat_0=21.16666666666667',
  GW = ' +lat_1=18.43333333333333',
  GX = ' +lat_2=18.03333333333333',
  GY = ' +lat_0=17.83333333333333',
  GZ = ' +gamma=323.1301023611111',
  Ga = ' +lon_0=-79.5',
  Gb = ' +y_0=4500000',
  Gc = ' +x_0=31500000',
  Gd = ' +x_0=500000.0001504',
  Ge = ' +b=6356514.96582849',
  Gf = ' +towgs84=674.4,15.1,405.3,0,0,0,0',
  Gg = ' +towgs84=-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.7101',
  Gh = ' +towgs84=589,76,480,0,0,0,0',
  Gi = ' +towgs84=-263,6,431,0,0,0,0',
  Gj = ' +lon_0=15',
  Gk = ' +axis=wsu',
  Gl = ' +lon_0=21',
  Gm = ' +lat_0=30',
  Gn = ' +ellps=helmert',
  Go = ' +a=6377299.151',
  Gp = ' +lon_0=-74.5',
  Gq = ' +b=6356750.304921594',
  Gr = ' +y_0=2000000.0001016',
  Gs = ' +x_0=3500000.0001016',
  Gt = ' +y_0=399999.99998984',
  Gu = ' +x_0=200000.00001016',
  Gv = ' +b=6356098.359005156',
  Gw = ' +x_0=14500000',
  Gx = ' +x_0=29500000',
  Gy = ' +towgs84=-117,-132,-164,0,0,0,0',
  Gz = ' +zone=20',
  HA = ' +lon_0=-122',
  HB = ' +ellps=bess_nam',
  HC = ' +lon_0=-86.15000000000001',
  HD = ' +towgs84=-189,-242,-91,0,0,0,0',
  HE = ' +towgs84=-265,120,-358,0,0,0,0',
  HF = ' +towgs84=-73.472,-51.66,-112.482,0.953,4.6,-2.368,0.586',
  HG = ' +towgs84=-17.51,-108.32,-62.39,0,0,0,0',
  HH = ' +towgs84=-10.18,-350.43,291.37,0,0,0,0',
  HI = ' +towgs84=-190.421,8.532,238.69,0,0,0,0',
  HJ = ' +lon_0=-68.5',
  HK = ' +a=6377299.36559538',
  HL = ' +x_0=79999.99999968',
  HM = ' +x_0=50000.00001504',
  HN = ' +lon_0=0',
  HO = ' +lon_0=27',
  HP = ' +lon_0=75',
  HQ = ' +lon_0=81',
  HR = ' +lon_0=93',
  HS = ' +lon_0=99',
  HT = ' +x_0=900000',
  HU = ' +x_0=13500000',
  HV = ' +x_0=20500000',
  HW = ' +x_0=22500000',
  HX = ' +towgs84=-166,-15,204,0,0,0,0',
  HY = ' +towgs84=-130,110,-13,0,0,0,0',
  HZ = ' +towgs84=-587.8,519.75,145.76,0,0,0,0',
  Ha = ' +lat_2=83.66666666666667',
  Hb = ' +lat_0=85.43711833333333',
  Hc = ' +towgs84=-273.5,110.6,-357.9,0,0,0,0',
  Hd = ' +lon_0=87',
  He = '+proj=laea',
  Hf = ' +towgs84=-403,684,41,0,0,0,0',
  Hg = ' +lon_0=-92.5',
  Hh = ' +y_0=6000000',
  Hi = ' +zone=19',
  Hj = ' +lat_0=29.5',
  Hk = ' +y_0=300000',
  Hl = ' +lat_2=45.5',
  Hm = ' +k=0.999909091',
  Hn = ' +a=6377492.018',
  Ho = ' +b=6356751.689189189',
  Hp = ' +b=6356100.230165384',
  Hq = ' +lon_0=90',
  Hr = ' +lat_0=90',
  Hs = ' +x_0=18500000',
  Ht = ' +x_0=19500000',
  Hu = ' +x_0=15500000',
  Hv = ' +x_0=16500000',
  Hw = ' +x_0=21500000',
  Hx = ' +x_0=23500000',
  Hy = ' +x_0=25500000',
  Hz = ' +x_0=26500000',
  IA = ' +x_0=27500000',
  IB = ' +x_0=28500000',
  IC = ' +zone=18',
  ID = ' +zone=21',
  IE = ' +towgs84=-124.76,53,466.79,0,0,0,0',
  IF = ' +lon_0=-92',
  IG = ' +lon_0=33',
  IH = ' +lon_0=12',
  II = ' +lon_0=24',
  IJ = ' +lat_2=77',
  IK = ' +y_0=200000',
  IL = ' +lon_0=-70.5',
  IM = ' +x_0=7500000',
  IN = ' +y_0=3500000',
  IO = ' +towgs84=31,146,47,0,0,0,0',
  IP = ' +lat_0=45',
  IQ = ' +lat_0=26',
  IR = ' +a=6378160',
  IS = ' +lon_0=-109.5',
  IT = ' +x_0=30500000',
  IU = ' +x_0=32500000',
  IV = ' +lon_0=-85.83333333333333',
  IW = ' +lon_0=-118.3333333333333',
  IX = ' +y_0=0.003048006096012192',
  IY = ' +lat_0=30.5',
  IZ = ' +lat_0=44',
  Ia = ' +lon_0=30',
  Ib = ' +lat_0=47',
  Ic = ' +lat_1=77',
  Id = ' +lat_0=36.16666666666666',
  Ie = ' +lat_0=4.596200416666666',
  If = ' +gamma=53.13010236111111',
  Ig = ' +lon_0=13.33333333333333',
  Ih = ' +lat_0=81.31722600000001',
  Ii = ' +lat_0=73.15574086111111',
  Ij = ' +lat_0=65.10127088888888',
  Ik = ' +zone=17',
  Il = ' +lon_0=132',
  Im = ' +lon_0=114',
  In = ' +towgs84=-143,-90,-294,0,0,0,0',
  Io = ' +zone=22',
  Ip = ' +lat_0=41',
  Iq = ' +lat_0=46.5',
  Ir = ' +lon_0=-118',
  Is = ' +y_0=400000',
  It = ' +x_0=17500000',
  Iu = ' +x_0=33500000',
  Iv = ' +lon_0=-113.75',
  Iw = ' +lon_0=-116.25',
  Ix = ' +lon_0=-115.75',
  Iy = ' +lon_0=-106.25',
  Iz = ' +k=0.999916667',
  JA = ' +k=0.999964286',
  JB = ' +lon_0=-108.75',
  JC = ' +towgs84=-73,-247,227,0,0,0,0',
  JD = ' +towgs84=265.025,384.929,-194.046,0,0,0,0',
  JE = ' +k=0.99998',
  JF = ' +lat_1=40.65',
  JG = ' +lat_1=38.35',
  JH = ' +y_0=2500000',
  JI = ' +y_0=6500000',
  JJ = ' +x_0=39999.99999984',
  JK = ' +towgs84=-61.702,284.488,472.052,0,0,0,0',
  JL = ' +towgs84=-223.237,110.193,36.649,0,0,0,0',
  JM = ' +zone=39',
  JN = ' +zone=32',
  JO = ' +towgs84=-125,53,467,0,0,0,0',
  JP = ' +towgs84=198,881,317,0,0,0,0',
  JQ = ' +towgs84=214,804,268,0,0,0,0',
  JR = ' +towgs84=217,823,299,0,0,0,0',
  JS = ' +lon_0=45',
  JT = ' +lat_1=43',
  JU = '+proj=merc',
  JV = ' +x_0=99999.99998983997',
  JW = ' +x_0=99999.99999960001',
  JX = ' +x_0=2743195.592233322',
  JY = ' +y_0=914398.5307444407',
  JZ = ' +zone=38',
  Ja = ' +zone=28',
  Jb = ' +lon_0=-114',
  Jc = ' +lat_1=45.5',
  Jd = ' +towgs84=-73,46,-86,0,0,0,0',
  Je = ' +towgs84=11,72,-101,0,0,0,0',
  Jf = ' +towgs84=287.58,177.78,-135.41,0,0,0,0',
  Jg = ' +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425',
  Jh = ' +lon_0=-87',
  Ji = ' +lon_0=-99',
  Jj = ' +lon_0=102',
  Jk = ' +lon_0=126',
  Jl = ' +k=0.99999',
  Jm = ' +x_0=50000',
  Jn = ' +lat_2=40',
  Jo = ' +lon_0=-84.25',
  Jp = ' +x_0=11500000',
  Jq = ' +lon_0=-72.75',
  Jr = ' +lon_0=-101.5',
  Js = ' +lon_0=-94.25',
  Jt = ' +x_0=6500000',
  Ju = ' +y_0=5000000',
  Jv = ' +x_0=1700000',
  Jw = ' +towgs84=31.95,300.99,419.19,0,0,0,0',
  Jx = ' +towgs84=-189.681,18.3463,-42.7695,-0.33746,-3.09264,2.53861,0.4598',
  Jy = ' +towgs84=-119.425,-303.659,-11.0006,1.1643,0.174458,1.09626,3.65706',
  Jz = ' +towgs84=982.609,552.753,-540.873,6.68163,-31.6115,-19.8482,16.805',
  KA = ' +zone=29',
  KB = ' +lon_0=9',
  KC = ' +zone=33',
  KD = ' +zone=37',
  KE = ' +no_uoff',
  KF = ' +lon_0=120',
  KG = ' +lon_0=177',
  KH = ' +lon_0=-177',
  KI = ' +lon_0=-158',
  KJ = ' +y_0=250000',
  KK = ' +lon_0=-111',
  KL = ' +x_0=2500000.0001424',
  KM = ' +x_0=1500000.0001464',
  KN = ' +lon_0=-71.60561777777777',
  KO = ' +lon_0=-156.6666666666667',
  KP = ' +lon_0=-160.1666666666667',
  KQ = ' +lat_0=0.1166666666666667',
  KR = ' +towgs84=0,0,0,-0,-0,-0,0',
  KS = ' +lon_0=-117.8333333333333',
  KT = ' +lon_0=-123.1666666666667',
  KU = ' +lon_0=-122.3333333333333',
  KV = ' +lon_0=-119.1666666666667',
  KW = ' +lon_0=-123.0833333333333',
  KX = ' +lon_0=-85.84999999999999',
  KY = ' +lon_0=-87.09999999999999',
  KZ = ' +lon_0=-86.90000000000001',
  Ka = ' +lon_0=-89.24166666666667',
  Kb = ' +lon_0=-92.63333333333334',
  Kc = ' +towgs84=347.103,1078.12,2623.92,-33.8875,70.6773,-9.3943,186.074',
  Kd = ' +towgs84=8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926',
  Ke = ' +towgs84=-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7',
  Kf = ' +towgs84=-0.293,766.95,87.713,0.195704,1.69507,3.47302,-0.039338',
  Kg = ' +towgs84=221.525,152.948,176.768,-2.3847,-1.3896,-0.877,11.4741',
  Kh = ' +towgs84=215.525,149.593,176.229,-3.2624,-1.692,-1.1571,10.4773',
  Ki = ' +zone=35',
  Kj = ' +lat_0=46.95240555555556',
  Kk = ' +alpha=30.28813972222222',
  Kl = ' +lat_1=10.16666666666667',
  Km = ' +lat_0=10.16666666666667',
  Kn = ' +lat_0=18.83333333333333',
  Ko = ' +lat_0=20.33333333333333',
  Kp = ' +lat_0=21.83333333333333',
  Kq = ' +lat_0=21.66666666666667',
  Kr = ' +lat_0=45.30916666666666',
  Ks = ' +lat_1=49.83333333333334',
  Kt = ' +lat_2=51.16666666666666',
  Ku = ' +lonc=-133.6666666666667',
  Kv = ' +alpha=323.1301023611111',
  Kw = ' +lat_1=53.83333333333334',
  Kx = ' +lat_2=51.83333333333334',
  Ky = ' +lat_1=44.66666666666666',
  Kz = ' +lat_0=44.66666666666666',
  LA = ' +lat_1=45.66666666666666',
  LB = ' +lat_0=45.91666666666666',
  LC = ' +lat_0=45.08333333333334',
  LD = ' +lat_0=44.33333333333334',
  LE = ' +lat_0=44.08333333333334',
  LF = ' +lat_1=48.33333333333334',
  LG = ' +lat_0=48.33333333333334',
  LH = ' +lat_0=31.73409694444445',
  LI = ' +lon_0=35.21208055555556',
  LJ = ' +lat_0=44.03611111111111',
  LK = ' +lat_0=4.599047222222222',
  LL = ' +lat_0=40.66666666666666',
  LM = ' +lat_1=49',
  LN = ' +lon_0=39',
  LO = ' +lat_1=37.25',
  LP = ' +lat_1=39.75',
  LQ = ' +lat_2=38.45',
  LR = ' +lat_1=30.75',
  LS = ' +lon_0=-84.5',
  LT = ' +lat_0=33.75',
  LU = ' +x_0=4000000',
  LV = ' +y_0=4000000',
  LW = ' +lon_0=-72.5',
  LX = ' +x_0=5000000',
  LY = ' +x_0=10500000',
  LZ = ' +x_0=12500000',
  La = ' +x_0=24500000',
  Lb = ' +k=0.99999375',
  Lc = ' +x_0=399999.9999984',
  Ld = ' +lon_0=-77',
  Le = ' +lon_0=108',
  Lf = ' +lon_0=171',
  Lg = ' +towgs84=-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925',
  Lh = ' +lon_0=-171',
  Li = ' +lat_0=32.5',
  Lj = ' +lon_0=-117',
  Lk = ' +k=1.000015',
  Ll = ' +k=1.000034',
  Lm = ' +k=1.000031',
  Ln = ' +k=1.000026',
  Lo = ' +ellps=evrstSS',
  Lp = ' +a=6377301.243',
  Lq = ' +towgs84=410.721,55.049,80.746,2.5779,2.3514,0.6664,17.3311',
  Lr = ' +towgs84=72.438,345.918,79.486,1.6045,0.8823,0.5565,1.3746',
  Ls = ' +pm=ferro',
  Lt = ' +lon_0=78',
  Lu = ' +lon_0=10',
  Lv = ' +pm=paris',
  Lw = ' +towgs84=0.055,-0.541,-0.185,0.0183,-0.0003,-0.007,-0.014',
  Lx = ' +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489',
  Ly = ' +towgs84=8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081',
  Lz = ' +towgs84=572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378',
  MA = ' +zone=58',
  MB = ' +zone=23',
  MC = ' +x_0=304800.6096012192',
  MD = ' +y_0=152400.3048006096',
  ME = ' +x_0=800000.0001016001',
  MF = ' +x_0=399999.9998983998',
  MG = ' +x_0=7999999.999968001',
  MH = ' +x_0=5999999.999976001',
  MI = ' +x_0=830000.0001016001',
  MJ = ' +x_0=249999.9998983998',
  MK = ' +x_0=350000.0001016001',
  ML = ' +to_meter=0.3047972654',
  MM = ' +x_0=99999.99989839978',
  MN = ' +y_0=8000000.000010163',
  MO = ' +x_0=699999.9999898402',
  MP = ' +lon_0=-69',
  MQ = ' +lon_0=-86',
  MR = ' +towgs84=-3.2,-5.7,2.8,0,0,0,0',
  MS = ' +x_0=8500000',
  MT = ' +x_0=9500000',
  MU = ' +lat_1=39.45',
  MV = ' +lat_0=44.25',
  MW = ' +lat_1=41.95',
  MX = ' +lat_2=35.25',
  MY = ' +lat_2=34.65',
  MZ = ' +lat_2=44.25',
  Ma = ' +lat_1=47.05',
  Mb = ' +lat_1=40.25',
  Mc = ' +k_0=1.00012',
  Md = ' +lat_0=40.25',
  Me = ' +zone=40',
  Mf = ' +zone=36',
  Mg = ' +zone=51',
  Mh = ' +zone=48',
  Mi = ' +zone=49',
  Mj = ' +lon_0=96',
  Mk = ' +y_0=750000',
  Ml = ' +lat_0=36.5',
  Mm = ' +lon_0=-119',
  Mn = ' +lat_0=33.5',
  Mo = ' +lat_2=41.2',
  Mp = ' +k=0.999995',
  Mq = ' +lat_2=33.3',
  Mr = ' +lat_0=38.5',
  Ms = ' +lon_0=-154',
  Mt = ' +lon_0=-120',
  Mu = ' +x_0=34500000',
  Mv = ' +x_0=35500000',
  Mw = ' +x_0=36500000',
  Mx = ' +x_0=37500000',
  My = ' +x_0=38500000',
  Mz = ' +x_0=39500000',
  NA = ' +x_0=40500000',
  NB = ' +x_0=41500000',
  NC = ' +x_0=43500000',
  ND = ' +x_0=45500000',
  NE = ' +y_0=3999999.99998984',
  NF = ' +y_0=2000000.00001016',
  NG = ' +towgs84=164,138,-189,0,0,0,0',
  NH = ' +towgs84=-186,230,110,0,0,0,0',
  NI = ' +towgs84=-199,32,322,0,0,0,0',
  NJ = ' +to_meter=0.3047997101815088',
  NK = ' +towgs84=-76,-138,67,0,0,0,0',
  NL = ' +towgs84=-43,-163,45,0,0,0,0',
  NM = ' +towgs84=-346,-1,224,0,0,0,0',
  NN = ' +towgs84=210,814,289,0,0,0,0',
  NO = ' +towgs84=-74,-130,42,0,0,0,0',
  NP = ' +zone=15',
  NQ = ' +zone=16',
  NR = ' +zone=34',
  NS = ' +zone=50',
  NT = ' +zone=52',
  NU = ' +lon_0=-62',
  NV = ' +lon_0=-84',
  NW = ' +lon_0=-79',
  NX = ' +lon_0=131',
  NY = ' +lon_0=153',
  NZ = ' +lon_0=165',
  Na = ' +lon_0=-94',
  Nb = ' +lon_0=-54',
  Nc = ' +a=6378300.789',
  Nd = ' +b=6356566.435',
  Ne = ' +y_0=3999999.9998984',
  Nf = ' +y_0=5000000.0001016',
  Ng = ' +x_0=150000.00001464',
  Nh = ' +lat_2=46',
  Ni = ' +lon_0=84',
  Nj = ' +lat_0=43',
  Nk = ' +k_0=0.999625769',
  Nl = ' +towgs84=51,391,-36,0,0,0,0',
  Nm = ' +towgs84=-83,37,124,0,0,0,0',
  Nn = ' +towgs84=-355,21,72,0,0,0,0',
  No = ' +towgs84=-23,259,-9,0,0,0,0',
  Np = ' +towgs84=174.05,-25.49,112.57,-0,-0,0.554,0.2263',
  Nq = ' +zone=59',
  Nr = ' +zone=25',
  Ns = ' +zone=11',
  Nt = ' +zone=12',
  Nu = ' +zone=13',
  Nv = ' +zone=54',
  Nw = ' +zone=14',
  Nx = ' +zone=24',
  Ny = ' +zone=47',
  Nz = ' +lat_2=38.3',
  OA = ' +lat_1=45.7',
  OB = ' +lat_2=42.1',
  OC = ' +x_0=165000',
  OD = ' +lat_2=32.5',
  OE = ' +x_0=609600',
  OF = ' +lat_1=39.2',
  OG = ' +lat_2=47.5',
  OH = ' +lat_1=30.7',
  OI = ' +lat_2=29.3',
  OJ = ' +lat_0=28.5',
  OK = ' +lat_1=41.7',
  OL = ' +lat_1=44.4',
  OM = ' +lat_1=27.5',
  ON = ' +lon_0=-150',
  OO = ' +lat_0=44.5',
  OP = ' +k=1.000027',
  OQ = ' +k=1.000038',
  OR = ' +k=1.000036',
  OS = ' +lon_0=-87.5',
  OT = ' +x_0=3999999.999984',
  OU = ' +x_0=199999.9999992',
  OV = ' +towgs84=16,196,93,0,0,0,0',
  OW = ' +towgs84=-88,4,101,0,0,0,0',
  OX = ' +lat_0=18',
  OY = ' +lat_2=67',
  OZ = ' +lon_0=-96',
  Oa = ' +x_0=80000',
  Ob = ' +lon_0=-82',
  Oc = ' +lon_0=-74',
  Od = ' +lon_0=147',
  Oe = ' +lon_0=150',
  Of = ' +x_0=40000',
  Og = ' +k=1.00002',
  Oh = ' +x_0=42500000',
  Oi = ' +x_0=44500000',
  Oj = ' +lon_0=-85.05',
  Ok = ' +ellps=mod_airy',
  Ol = ' +lat_0=0.1333333333333333',
  Om = ' +lat_1=-60.66666666666666',
  On = ' +lat_2=-63.33333333333334',
  Oo = ' +lon_0=-91.91666666666667',
  Op = ' +y_0=0.003352806705613411',
  Oq = ' +zone=30',
  Or = ' +lon_0=3',
  Os = ' +zone=26',
  Ot = ' +zone=53',
  Ou = ' +lat_0=31.73439361111111',
  Ov = ' +lon_0=35.20451694444445',
  Ow = ' +lon_0=7.439583333333333',
  Ox = ' +lon_0=132.1666666666667',
  Oy = ' +lon_0=134.3333333333333',
  Oz = ' +lon_0=137.1666666666667',
  PA = ' +lon_0=139.8333333333333',
  PB = ' +lon_0=140.8333333333333',
  PC = ' +lon_0=3.192280555555556',
  PD = ' +lat_1=49.50000000000001',
  PE = ' +lat_0=49.50000000000001',
  PF = ' +alpha=53.31582047222222',
  PG = ' +lon_0=10.33333333333333',
  PH = ' +lon_0=16.33333333333333',
  PI = ' +towgs84=-502.862,-247.438,312.724,0,0,0,0',
  PJ = ' +towgs84=-381.788,-57.501,-256.673,0,0,0,0',
  PK = ' +towgs84=-43.685,-179.785,-267.721,0,0,0,0',
  PL = ' +zone=60',
  PM = ' +zone=55',
  PN = ' +lon_0=36',
  PO = ' +lon_0=42',
  PP = ' +lat_1=46',
  PQ = ' +lat_1=44',
  PR = ' +lat_0=42',
  PS = ' +lon_0=51',
  PT = ' +lat_0=33',
  PU = ' +lat_0=52',
  PV = ' +ellps=airy',
  PW = ' +pm=jakarta',
  PX = ' +x_0=2743195.5',
  PY = ' +y_0=-4354009.816',
  PZ = ' +k_0=0.9987864078000001',
  Pa = ' +towgs84=-106.226,166.366,-37.893,0,0,0,0',
  Pb = ' +towgs84=508.088,-191.042,565.223,0,0,0,0',
  Pc = ' +k=0.99996',
  Pd = ' +a=6378135',
  Pe = ' +lon_0=-66',
  Pf = ' +lon_0=141',
  Pg = ' +lon_0=159',
  Ph = ' +k=0.99984',
  Pi = ' +lat_0=-22',
  Pj = ' +lon_0=127.5',
  Pk = ' +x_0=6000000',
  Pl = ' +x_0=3900000',
  Pm = ' +y_0=1300000',
  Pn = ' +lat_0=44.75',
  Po = ' +lat_0=37.75',
  Pp = ' +lat_0=40.55',
  Pq = ' +lon_0=-87.3',
  Pr = ' +lon_0=-86.5',
  Ps = ' +towgs84=195.671,332.517,274.607,0,0,0,0',
  Pt = ' +towgs84=-204.619,140.176,55.226,0,0,0,0',
  Pu = '+proj=somerc',
  Pv = ' +y_0=30480.06096012192',
  Pw = ' +y_0=999999.9999960001',
  Px = ' +x_0=182880.3657607315',
  Py = ' +towgs84=674.374,15.056,405.346,0,0,0,0',
  Pz = ' +towgs84=-133.63,-157.5,-158.62,0,0,0,0',
  QA = ' +towgs84=-0.465,372.095,171.736,0,0,0,0',
  QB = ' +towgs84=-56.263,16.136,-22.856,0,0,0,0',
  QC = ' +towgs84=-241.54,-163.64,396.06,0,0,0,0',
  QD = ' +zone=31',
  QE = ' +zone=10',
  QF = ' +zone=46',
  QG = ' +x_0=304800.6096',
  QH = ' +y_0=152400.3048',
  QI = ' +alpha=337.25556',
  QJ = ' +x_0=2546731.496',
  QK = ' +gamma=337.25556',
  QL = ' +k_0=0.999625544',
  QM = ' +towgs84=335.47,222.58,-230.94,0,0,0,0',
  QN = ' +towgs84=217.037,86.959,23.956,0,0,0,0',
  QO = ' +towgs84=-128.16,-282.42,21.93,0,0,0,0',
  QP = ' +towgs84=103.25,-100.4,-307.19,0,0,0,0',
  QQ = ' +lon_0=31',
  QR = ' +lon_0=18',
  QS = ' +lat_2=36',
  QT = ' +lat_0=29',
  QU = ' +lat_0=35',
  QV = ' +lat_0=34',
  QW = ' +lon_0=63',
  QX = ' +lat_0=37',
  QY = ' +lat_2=65',
  QZ = ' +y_0=-4000000',
  Qa = ' +y_0=914398.5',
  Qb = ' +towgs84=-199.87,74.79,246.62,0,0,0,0',
  Qc = ' +towgs84=-11.64,-348.6,291.98,0,0,0,0',
  Qd = ' +towgs84=-254.1,-5.36,-100.29,0,0,0,0',
  Qe = ' +towgs84=-206.1,-174.7,-87.7,0,0,0,0',
  Qf = ' +towgs84=-770.1,158.4,-498.2,0,0,0,0',
  Qg = ' +towgs84=-146.21,112.63,4.05,0,0,0,0',
  Qh = ' +towgs84=-294.7,-200.1,525.5,0,0,0,0',
  Qi = ' +lat_0=4',
  Qj = ' +a=6378300',
  Qk = ' +lon_0=-63',
  Ql = ' +lon_0=162',
  Qm = ' +lat_ts=90',
  Qn = ' +y_0=600000',
  Qo = ' +x_0=350000',
  Qp = ' +y_0=900000',
  Qq = ' +lat_1=32.5',
  Qr = ' +lon_0=-147',
  Qs = ' +k=1.000043',
  Qt = ' +lat_0=48.5',
  Qu = ' +lat_0=40.9',
  Qv = ' +k=1.000028',
  Qw = ' +k=1.000025',
  Qx = ' +x_0=170251.555',
  Qy = ' +b=6356657.142669561',
  Qz = ' +b=6356094.667915204',
  RA = ' +b=6355862.933255573',
  RB = ' +a=6378249.144808011',
  RC = ' +b=6356514.966204134',
  RD = ' +towgs84=-70.9,-151.8,-41.4,0,0,0,0',
  RE = ' +towgs84=52.17,-71.82,-14.9,0,0,0,0',
  RF = ' +towgs84=283.7,735.9,261.1,0,0,0,0',
  RG = ' +zone=5',
  RH = ' +zone=7',
  RI = ' +lon_0=19',
  RJ = ' +lon_0=25',
  RK = ' +lat_2=45',
  RL = ' +lon_0=57',
  RM = ' +lon_0=69',
  RN = ' +lat_2=39',
  RO = ' +lat_2=35',
  RP = ' +lon_0=28',
  RQ = ' +lon_0=-61.5',
  RR = ' +lon_0=-64.5',
  RS = ' +lon_0=-90.5',
  RT = ' +lon_0=-94.5',
  RU = ' +y_0=2800000',
  RV = ' +x_0=4321000',
  RW = ' +y_0=3210000',
  RX = ' +y_0=14743.5',
  RY = ' +y_0=1999999.999992',
  RZ = ' +y_0=2999999.999988',
  Ra = ' +y_0=50000.00001504',
  Rb = ' +zone=41',
  Rc = ' +zone=42',
  Rd = ' +k=0.994',
  Re = ' +zone=56',
  Rf = ' +lon_0=-67.875',
  Rg = ' +lon_0=-70.375',
  Rh = ' +x_0=609601.22',
  Ri = ' +b=6356889.449',
  Rj = ' +lon_0=-69.125',
  Rk = ' +lon_0=-121.75',
  Rl = ' +lon_0=-121.25',
  Rm = ' +lon_0=-119.75',
  Rn = ' +lon_0=-122.75',
  Ro = ' +zone=6',
  Rp = '+proj=krovak',
  Rq = ' +towgs84=-637,-549,-203,0,0,0,0',
  Rr = ' +towgs84=-20.8,11.3,2.4,0,0,0,0',
  Rs = ' +lon_0=-93',
  Rt = ' +lon_0=127',
  Ru = ' +lon_0=125',
  Rv = ' +k=0.99975',
  Rw = ' +lon_0=136',
  Rx = ' +lon_0=138',
  Ry = ' +lon_0=180',
  Rz = ' +y_0=50000',
  SA = ' +lon_0=-85',
  SB = ' +k=1.00016',
  SC = ' +lon_0=2.7',
  SD = ' +towgs84=27.5,14,186.4,0,0,0,0',
  SE = ' +towgs84=-499,-249,314,0,0,0,0',
  SF = ' +towgs84=-467,-16,-300,0,0,0,0',
  SG = ' +towgs84=-382,-59,-262,0,0,0,0',
  SH = ' +towgs84=253,-132,-127,0,0,0,0',
  SI = ' +towgs84=-963,510,-359,0,0,0,0',
  SJ = ' +towgs84=94,-948,-1262,0,0,0,0',
  SK = ' +zone=1',
  SL = ' +zone=27',
  SM = ' +zone=57',
  SN = ' +pm=oslo',
  SO = ' +zone=43',
  SP = ' +lon_0=23',
  SQ = ' +lon_0=48',
  SR = ' +lon_0=54',
  SS = ' +lat_0=49.5',
  ST = ' +k=0.999912',
  SU = ' +lon_0=-174',
  SV = ' +lon_0=-168',
  SW = ' +lon_0=-170',
  SX = ' +lon_0=-165',
  SY = ' +lat_2=40.5',
  SZ = ' +lon_0=-115',
  Sa = ' +lat_1=29.5',
  Sb = ' +k=1.000045',
  Sc = ' +lat_1=39.5',
  Sd = ' +lat_1=33.3',
  Se = ' +lat_0=33.3',
  Sf = ' +lon_0=-155.5',
  Sg = ' +lon_0=-159.5',
  Sh = ' +y_0=-4480000',
  Si = ' +lon_0=-176.5',
  Sj = ' +lon_0=-89.75',
  Sk = ' +k_0=1.000008',
  Sl = ' +lonc=-124.05',
  Sm = ' +k_0=1.000002',
  Sn = ' +lon_0=-122.5',
  So = ' +lon_0=-98.25',
  Sp = ' +lon_0=-112.5',
  Sq = ' +lon_0=-84.95',
  Sr = ' +lon_0=-86.95',
  Ss = ' +lon_0=-85.45',
  St = ' +lon_0=-87.45',
  Su = ' +lon_0=-87.55',
  Sv = ' +towgs84=-149,128,296,0,0,0,0',
  Sw = ' +towgs84=-425,-169,81,0,0,0,0',
  Sx = ' +towgs84=-104,167,-38,0,0,0,0',
  Sy = ' +towgs84=-106,-87,188,0,0,0,0',
  Sz = ' +towgs84=-289,-124,60,0,0,0,0',
  TA = ' +towgs84=137,248,-430,0,0,0,0',
  TB = ' +towgs84=-13,-348,292,0,0,0,0',
  TC = ' +towgs84=-115,118,426,0,0,0,0',
  TD = ' +towgs84=0,-0.15,0.68,0,0,0,0',
  TE = ' +towgs84=145,-187,103,0,0,0,0',
  TF = ' +towgs84=-134,229,-29,0,0,0,0',
  TG = ' +towgs84=70,207,389.5,0,0,0,0',
  TH = ' +towgs84=-148,51,-291,0,0,0,0',
  TI = ' +towgs84=-255,-15,71,0,0,0,0',
  TJ = ' +towgs84=725,685,536,0,0,0,0',
  TK = ' +towgs84=72,213.7,93,0,0,0,0',
  TL = ' +towgs84=174,359,365,0,0,0,0',
  TM = ' +towgs84=-173,253,27,0,0,0,0',
  TN = ' +towgs84=-203,141,53,0,0,0,0',
  TO = ' +towgs84=186,482,151,0,0,0,0',
  TP = ' +towgs84=162,117,154,0,0,0,0',
  TQ = ' +towgs84=-73,213,296,0,0,0,0',
  TR = ' +towgs84=-130,29,364,0,0,0,0',
  TS = ' +towgs84=-10,375,165,0,0,0,0',
  TT = ' +towgs84=175,-38,113,0,0,0,0',
  TU = ' +to_meter=0.9143984146160287',
  TV = ' +zone=2',
  TW = ' +zone=8',
  TX = ' +zone=9',
  TY = ' +zone=4',
  TZ = ' +towgs84=30,430,368,0,0,0,0',
  Ta = ' +towgs84=185,165,42,0,0,0,0',
  Tb = ' +towgs84=-97,787,86,0,0,0,0',
  Tc = ' +towgs84=639,405,60,0,0,0,0',
  Td = ' +zone=44',
  Te = ' +zone=45',
  Tf = ' +lon_0=-58.5',
  Tg = ' +lon_0=-67.5',
  Th = ' +lon_0=-73.5',
  Ti = ' +lon_0=-76.5',
  Tj = ' +y_0=1200000',
  Tk = ' +lon_0=133.5',
  Tl = ' +x_0=8000000',
  Tm = ' +y_0=8000000',
  Tn = ' +k=0.9998335',
  To = ' +lon_0=-85.5',
  Tp = ' +x_0=7000000',
  Tq = ' +lat_0=43.75',
  Tr = ' +lat_0=43.25',
  Ts = ' +lat_0=45.25',
  Tt = ' +lon_0=-86.3',
  Tu = ' +lat_0=38.15',
  Tv = ' +lat_0=39.15',
  Tw = ' +lat_0=41.25',
  Tx = ' +lat_0=40.65',
  Ty = ' +lat_0=39.25',
  Tz = ' +lat_0=40.35',
  UA = ' +lon_0=-85.8',
  UB = ' +towgs84=9,183,236,0,0,0,0',
  UC = ' +towgs84=-48,55,52,0,0,0,0',
  UD = ' +towgs84=84,274,65,0,0,0,0',
  UE = ' +lon_0=17',
  UF = ' +lat_1=60',
  UG = ' +k=0.9998',
  UH = ' +lon_0=66',
  UI = ' +lon_0=20',
  UJ = ' +lon_0=26',
  UK = ' +lat_0=51',
  UL = ' +lat_1=87',
  UM = ' +lat_1=26',
  UN = ' +lon_0=144',
  UO = ' +lon_0=168',
  UP = ' +lon_0=174',
  UQ = ' +lon_0=-72',
  UR = ' +lon_0=-75',
  US = ' +lon_0=-60',
  UT = ' +lon_0=-39',
  UU = '+proj=poly',
  UV = ' +x_0=219529.584',
  UW = ' +a=6378306.3696',
  UX = ' +lon_0=-61.33333333333334',
  UY = ' +lon_0=-91.86666666666666',
  UZ = ' +lon_0=-8.131906111111112',
  Ua = ' +lon_0=-83.66666666666667',
  Ub = ' +lon_0=-108.4166666666667',
  Uc = ' +lon_0=-108.3333333333333',
  Ud = ' +lon_0=-85.40000000000001',
  Ue = ' +lon_0=-86.65000000000001',
  Uf = ' +lon_0=-86.40000000000001',
  Ug = ' +lon_0=-85.59999999999999',
  Uh = ' +lon_0=-87.15000000000001',
  Ui = ' +lon_0=-86.59999999999999',
  Uj = ' +lon_0=-84.90000000000001',
  Uk = ' +lon_0=-85.65000000000001',
  Ul = ' +lon_0=-87.65000000000001',
  Um = ' +lon_0=-85.34999999999999',
  Un = ' +lon_0=-87.40000000000001',
  Uo = ' +lon_0=-87.34999999999999',
  Up = ' +lon_0=-85.90000000000001',
  Uq = ' +lon_0=-90.62222222222222',
  Ur = ' +lon_0=-91.84999999999999',
  Us = ' +lon_0=-91.15277777777779',
  Ut = ' +lon_0=-91.79722222222222',
  Uu = ' +lon_0=-92.45777777777778',
  Uv = ' +lon_0=-91.29444444444444',
  Uw = ' +lon_0=-90.70833333333334',
  Ux = ' +lon_0=-89.39444444444445',
  Uy = ' +lon_0=-89.42222222222223',
  Uz = ' +lon_0=-88.77500000000001',
  VA = ' +lon_0=-87.27222222222223',
  VB = ' +lon_0=-91.89444444444445',
  VC = ' +lon_0=-91.28888888888889',
  VD = ' +lon_0=-88.14166666666668',
  VE = ' +lon_0=-88.63333333333334',
  VF = ' +lon_0=-89.83888888888889',
  VG = ' +lon_0=-90.16111111111111',
  VH = ' +lon_0=-90.25555555555556',
  VI = ' +lon_0=-90.84429651944444',
  VJ = ' +lon_0=-87.89444444444445',
  VK = ' +lon_0=-91.31666666666666',
  VL = ' +lon_0=-89.03333333333333',
  VM = ' +lon_0=-89.73333333333333',
  VN = ' +lon_0=-87.71111111111111',
  VO = ' +lon_0=-88.41666666666667',
  VP = ' +lon_0=-90.64166666666668',
  VQ = ' +lon_0=-87.90833333333335',
  VR = ' +lon_0=-89.54444444444444',
  VS = ' +lon_0=-92.22777777777777',
  VT = ' +lon_0=-90.48888888888889',
  VU = ' +lon_0=-90.43055555555556',
  VV = ' +lon_0=-89.07222222222222',
  VW = ' +lon_0=-91.06666666666666',
  VX = ' +lon_0=-89.90000000000001',
  VY = ' +lon_0=-91.11666666666666',
  VZ = ' +lon_0=-88.60555555555555',
  Va = ' +lon_0=-90.48333333333333',
  Vb = ' +lon_0=-91.36666666666666',
  Vc = ' +lon_0=-90.78333333333333',
  Vd = ' +lon_0=-89.48888888888889',
  Ve = ' +lon_0=-88.54166666666667',
  Vf = ' +lon_0=-91.78333333333333',
  Vg = ' +lon_0=-88.06388888888888',
  Vh = ' +lon_0=-88.22499999999999',
  Vi = ' +lon_0=-88.81666666666666',
  Vj = ' +y_0=0.004876809753619507',
  Vk = ' +y_0=0.008534417068834137',
  Vl = ' +y_0=0.003962407924815849',
  Vm = ' +y_0=0.005791211582423164',
  Vn = ' +lon_0=-55.68333333333333',
  Vo = ' +to_meter=0.201166195164',
  Vp = ' +lat_0=4.666666666666667',
  Vq = ' +lat_0=6.666666666666667',
  Vr = ' +lon_0=6.166666666666667',
  Vs = ' +lat_0=10.44166666666667',
  Vt = ' +lat_0=22.31213333333334',
  Vu = ' +lon_0=114.1785555555556',
  Vv = ' +lon_0=51.21666666666667',
  Vw = ' +lon_0=11.30827777777778',
  Vx = ' +lon_0=13.55827777777778',
  Vy = ' +lon_0=15.80827777777778',
  Vz = ' +lon_0=18.05827777777778',
  WA = ' +lon_0=20.30827777777778',
  WB = ' +lon_0=22.55827777777778',
  WC = ' +lat_1=27.41666666666667',
  WD = ' +lat_2=34.91666666666666',
  WE = ' +lat_0=31.16666666666667',
  WF = ' +lat_1=59.33333333333334',
  WG = ' +lat_0=57.51755393055556',
  WH = ' +lon_0=4.359215833333333',
  WI = ' +lat_1=61.66666666666666',
  WJ = ' +lat_0=29.02626833333333',
  WK = ' +lat_1=48.66666666666666',
  WL = ' +lat_2=53.66666666666666',
  WM = ' +lon_0=127.0028902777778',
  WN = ' +lon_0=89.84999999999999',
  WO = ' +lon_0=91.56666666666666',
  WP = ' +lon_0=24.83333333333333',
  WQ = ' +lat_2=63.66666666666666',
  WR = ' +lat_0=65.35103930555555',
  WS = ' +lat_1=63.66666666666666',
  WT = ' +lat_2=60.33333333333334',
  WU = ' +lat_0=62.01530688888889',
  WV = ' +lat_1=45.78333333333333',
  WW = ' +lat_0=45.78333333333333',
  WX = ' +lat_0=42.66666666666666',
  WY = ' +lat_0=43.36666666666667',
  WZ = ' +lat_0=45.70611111111111',
  Wa = ' +lat_0=45.13333333333333',
  Wb = ' +lat_1=46.66964837722222',
  Wc = ' +lat_0=46.66964837722222',
  Wd = ' +lat_0=43.48138888888889',
  We = ' +lat_1=45.89871486583333',
  Wf = ' +lat_0=45.89871486583333',
  Wg = ' +lat_0=42.71944444444445',
  Wh = ' +lat_1=44.97785689861112',
  Wi = ' +lat_0=44.97785689861112',
  Wj = ' +lat_1=43.46254664583333',
  Wk = ' +lat_0=43.46254664583333',
  Wl = ' +lon_0=-90.9388888888889',
  Wm = ' +lat_0=41.47222222222222',
  Wn = ' +lat_0=45.88333333333333',
  Wo = ' +lat_0=44.40833333333333',
  Wp = ' +lat_1=44.87228112638889',
  Wq = ' +lat_0=44.87228112638889',
  Wr = ' +lat_0=45.43888888888888',
  Ws = ' +lat_0=44.00555555555555',
  Wt = ' +lat_0=41.41111111111111',
  Wu = ' +lat_1=42.63756227694444',
  Wv = ' +lat_0=42.63756227694444',
  Ww = ' +lat_1=43.80700011777778',
  Wx = ' +lat_0=43.80700011777778',
  Wy = ' +lat_0=42.53888888888888',
  Wz = ' +lat_0=45.43333333333333',
  XA = ' +lat_0=44.25333512777778',
  XB = ' +lat_0=42.21666666666667',
  XC = ' +lat_0=43.26666666666667',
  XD = ' +lat_0=43.45111111111111',
  XE = ' +lat_1=45.15423710527778',
  XF = ' +lat_0=45.15423710527778',
  XG = ' +lat_0=44.84444444444445',
  XH = ' +lat_1=44.90090442361111',
  XI = ' +lat_0=44.90090442361111',
  XJ = ' +lat_0=44.69166666666666',
  XK = ' +lat_0=44.71666666666667',
  XL = ' +lat_1=44.00007392861111',
  XM = ' +lat_0=44.00007392861111',
  XN = ' +lat_0=44.39722222222222',
  XO = ' +lat_1=45.70422377027778',
  XP = ' +lat_0=45.70422377027778',
  XQ = ' +lat_1=44.63614887194444',
  XR = ' +lat_0=44.63614887194444',
  XS = ' +lat_0=44.66111111111111',
  XT = ' +lat_1=44.41682397527777',
  XU = ' +lat_0=44.41682397527777',
  XV = ' +lat_0=44.55555555555555',
  XW = ' +lat_0=41.94444444444444',
  XX = ' +lat_0=43.91944444444444',
  XY = ' +lat_0=42.81944444444445',
  XZ = ' +lat_1=45.90009913138888',
  Xa = ' +lat_0=45.90009913138888',
  Xb = ' +lat_1=45.17782208583333',
  Xc = ' +lat_0=45.17782208583333',
  Xd = ' +lat_0=43.16111111111111',
  Xe = ' +lat_1=43.57503293972223',
  Xf = ' +lat_0=43.57503293972223',
  Xg = ' +lat_1=46.07784409055556',
  Xh = ' +lat_0=46.07784409055556',
  Xi = ' +lat_1=42.66946209694444',
  Xj = ' +lat_0=42.66946209694444',
  Xk = ' +lat_1=45.96121983333334',
  Xl = ' +lat_0=45.96121983333334',
  Xm = ' +lat_0=42.91805555555555',
  Xn = ' +lat_0=42.56944444444445',
  Xo = ' +lat_0=43.42027777777778',
  Xp = ' +lat_1=44.11394404583334',
  Xq = ' +lat_0=44.11394404583334',
  Xr = ' +lat_1=44.36259546944444',
  Xs = ' +lat_0=44.36259546944444',
  Xt = ' +lat_1=44.10000000000001',
  Xu = ' +lat_0=44.10000000000001',
  Xv = ' +lat_1=42.16500000000001',
  Xw = ' +lat_0=42.16500000000001',
  Xx = ' +lat_0=52.15616055555555',
  Xy = ' +lat_2=48.73333333333333',
  Xz = ' +zone=3',
  YA = ' +lat_0=53.5',
  YB = ' +k=0.999923',
  YC = ' +x_0=850000',
  YD = ' +x_0=830000',
  YE = ' +lon_0=16.5',
  YF = ' +x_0=520000',
  YG = ' +lat_2=31.5',
  YH = ' +lon_0=10.5',
  YI = ' +lat_1=44.5',
  YJ = ' +lon_0=-153',
  YK = ' +lon_0=-135',
  YL = ' +x_0=750000',
  YM = ' +lat_0=43.5',
  YN = ' +lon_0=-142',
  YO = ' +lon_0=-146',
  YP = ' +lon_0=-162',
  YQ = ' +lon_0=-166',
  YR = ' +lon_0=-176',
  YS = ' +lat_2=39.5',
  YT = ' +lon_0=-129',
  YU = ' +k_0=1.0002',
  YV = ' +k=1.000023',
  YW = ' +lon_0=-121',
  YX = ' +k=1.000175',
  YY = ' +lat_0=45.5',
  YZ = ' +k=1.000155',
  Ya = ' +lat_2=37.5',
  Yb = ' +lat_1=48.5',
  Yc = ' +k=1.000029',
  Yd = ' +lat_0=39.6',
  Ye = ' +k=1.000013',
  Yf = ' +k=1.000022',
  Yg = ' +lat_0=40.7',
  Yh = ' +lat_0=39.3',
  Yi = ' +lat_0=37.8',
  Yj = ' +lat_0=38.9',
  Yk = ' +lon_0=-5.4',
  Yl = ' +y_0=626907.39',
  Ym = ' +b=6356571.996',
  Yn = ' +a=6377295.664',
  Yo = ' +lon_0=5.38763888888889',
  Yp = ' +y_0=-4600000.00001208',
  Yq = ' +y_0=1889763.779527559',
  Yr = ' +y_0=99999.99999960001',
  Ys = ' +x_0=120091.4401828804',
  Yt = ' +lon_0=72',
  Yu = ' +lat_0=50',
  Yv = ' +lat_1=50',
  Yw = ' +lat_1=35',
  Yx = ' +lon_0=22',
  Yy = ' +lat_1=34',
  Yz = ' +lonc=115',
  ZA = ' +lat_0=-9',
  ZB = ' +lat_0=23',
  ZC = ' +lat_1=85',
  ZD = ' +lat_2=69',
  ZE = ' +lat_1=69',
  ZF = ' +lat_2=61',
  ZG = ' +lon_0=34',
  ZH = ' +lon_0=140.25',
  ZI = ' +lon_0=142.25',
  ZJ = ' +lon_0=144.25',
  ZK = ' +x_0=47500000',
  ZL = ' +y_0=-3000000',
  ZM = ' +pm=2.337208333333333',
  ZN = ' +x_0=7000000.00000248',
  ZO = ' +lon_0=6',
  ZP = ' +k=0.997',
  ZQ = ' +lon_0=106',
  ZR = ' +lon_0=154',
  ZS = ' +lon_0=156',
  ZT = ' +lat_2=-36',
  ZU = ' +lon_0=119',
  ZV = ' +lon_0=121',
  ZW = ' +lon_0=166',
  ZX = ' +a=6371228',
  ZY = ' +b=6371228',
  ZZ = ' +a=6378273',
  Za = ' +lat_0=-44',
  Zb = ' +pm=lisbon',
  Zc = ' +lon_0=-57',
  Zd = ' +lon_0=-56',
  Ze = ' +k=1.00007',
  Zf = ' +lonc=-123',
  Zg = ' +alpha=295',
  Zh = ' +gamma=295',
  Zi = ' +k=1.00011',
  Zj = ' +k=1.00005',
  Zk = ' +k=1.00013',
  Zl = ' +x_0=30000',
  Zm = ' +k=1.00001',
  Zn = ' +k=1.00003',
  Zo = ' +y_0=130000.00001472',
  Zp = ' +x_0=119999.99999952',
  Zq = ' +y_0=-2999999.999988',
  Zr = ' +x_0=-299999.9999988',
  Zs = ' +lat_1=43.0695160375',
  Zt = ' +lat_0=43.0695160375',
  Zu = ' +lat_1=43.3223129275',
  Zv = ' +lat_0=43.3223129275',
  Zw = ' +k=1.0000067',
  Zx = ' +a=6378298.3',
  Zy = ' +lon_0=-66.5',
  Zz = ' +lon_0=129.5',
  aA = ' +lon_0=138.5',
  aB = ' +x_0=2300000',
  aC = ' +x_0=3300000',
  aD = ' +x_0=4300000',
  aE = ' +y_0=7500000',
  aF = ' +lonc=102.25',
  aG = ' +y_0=1166200',
  aH = ' +x_0=3000000',
  aI = ' +lat_1=46.25',
  aJ = ' +ellps=WGS66',
  aK = ' +ellps=GRS67',
  aL = ' +lat_1=34.65',
  aM = ' +y_0=59999.99999976',
  aN = ' +y_0=30000.00001512',
  aO = ' +x_0=59999.99999976',
  aP = ' +x_0=30000.00001512',
  aQ = ' +lat_1=43.200055605',
  aR = ' +lat_0=43.200055605',
  aS = ' +y_0=65379.0134283',
  aT = ' +alpha=323.0257905',
  aU = ' +alpha=53.31580995',
  aV = ' +x_0=10000.0000152';
module.exports = [2000, D + L + NU + EP + u + N + c + E + A, 1, D + L + NU + EP + u + N + c + TI + E + A, 1, D + L + NU + EP + u + N + c + TJ + E + A, 1, D + L + NU + EP + u + N + c + TK + E + A, 1, D + L + NU + EP + u + N + c + TL + E + A, 1, D + L + NU + EP + u + N + c + UB + E + A, 1, D + L + NU + EP + u + N + c + Sv + E + A, 1, D + L + NU + EP + u + N + c + Ps + E + A, 2, D + L + Tf + V + Ab + N + i + E + A, 1, D + L + RQ + V + Ab + N + i + E + A, 1, D + L + RR + V + Ab + N + i + E + A, 1, D + L + Tg + V + Ab + N + i + E + A, 1, D + L + IL + V + Ab + N + i + E + A, 1, D + L + Th + V + Ab + N + i + E + A, 1, D + L + Ti + V + Ab + N + i + E + A, 1, D + L + Ga + V + Ab + N + i + E + A, 1, D + L + Th + V + Ab + N + i + E + A, 1, D + L + Ti + V + Ab + N + i + E + A, 1, D + L + Ga + V + Ab + N + i + E + A, 1, D + L + ET + V + Ab + N + i + E + A, 1, D + L + CR + V + Ab + N + i + E + A, 1, D + L + NV + V + Ab + N + i + E + A, 1, D + L + Jh + V + Ab + N + i + E + A, 1, D + L + Bu + V + Ab + N + i + E + A, 1, D + L + Rs + V + Ab + N + i + E + A, 1, D + L + OZ + V + Ab + N + i + E + A, 1, I + NP + i + E + A, 1, I + NQ + i + E + A, 1, I + Ik + i + E + A, 1, I + IC + i + E + A, 1, I + Ik + i + E + A, 1, I + IC + i + E + A, 1, I + Hi + i + E + A, 1, I + Gz + i + E + A, 1, I + ID + i + E + A, 4, D + Ou + Ov + Zw + UV + Yl + C + UC + E + A, 1, I + Oq + c + JO + E + A, 1, I + Oq + c + IE + E + A, 1, I + KA + c + JO + E + A, 1, I + KA + c + IE + E + A, 1, D + L + EN + ' +k=1' + Hs + N + M + HG + E + A, 1, D + L + Fy + ' +k=1' + Ht + N + M + HG + E + A, 1, D + L + Gj + ' +k=1' + s + N + Gk + j + B + E + A, 1, D + L + UE + ' +k=1' + s + N + Gk + j + B + E + A, 1, D + L + RI + ' +k=1' + s + N + Gk + j + B + E + A, 1, D + L + Gl + ' +k=1' + s + N + Gk + j + B + E + A, 1, D + L + SP + ' +k=1' + s + N + Gk + j + B + E + A, 1, D + L + RJ + ' +k=1' + s + N + Gk + j + B + E + A, 1, D + L + HO + ' +k=1' + s + N + Gk + j + B + E + A, 1, D + L + ' +lon_0=29 +k=1' + s + N + Gk + j + B + E + A, 1, D + L + QQ + ' +k=1' + s + N + Gk + j + B + E + A, 1, D + L + IG + ' +k=1' + s + N + Gk + j + B + E + A, 1, Pu + Kj + Ow + ' +k_0=1 +x_0=2600000' + Tj + Y + Py + E + A, 1, CU + ' +lat_0=27.51882880555555 +lonc=52.60353916666667 +alpha=0.5716611944444444 +k=0.999895934 +x_0=658377.437 +y_0=3044969.194 +gamma=0.5716611944444444' + R + Pz + E + A, 1, I + JZ + R + Gy + E + A, 1, I + JM + R + Gy + E + A, 1, I + Me + R + Gy + E + A, 1, I + Rb + R + Gy + E + A, 1, H + ' +lat_1=40' + Fs + HN + ' +k_0=0.9988085293' + a + Qn + Zx + Qy + ' +pm=madrid' + E + A, 3, Rp + SS + ' +lon_0=42.5' + Kk + V + s + N + Y + Gh + Ls + E + A, 1, Ck + ' +lat_0=11.25217861111111 +lon_0=-60.68600888888889 +x_0=37718.66159325 +y_0=36209.91512952' + Ee + Ef + Vo + A, 1, I + Gz + R + QA + E + A, 1, D + L + KB + V + h + N + R + v + E + A, 1, D + L + ' +lon_0=11' + V + h + N + R + v + E + A, 1, D + L + ' +lon_0=13' + V + h + N + R + v + E + A, 1, D + L + Gj + V + h + N + R + v + E + A, 1, D + L + UE + V + h + N + R + v + E + A, 1, D + L + RI + V + h + N + R + v + E + A, 1, D + L + Gl + V + h + N + R + v + E + A, 1, D + L + SP + V + h + N + R + v + E + A, 1, D + L + RJ + V + h + N + R + v + E + A, 1, I + JN + R + v + E + A, 1, I + KC + R + v + E + A, 1, I + NR + R + v + E + A, 1, I + Ki + R + v + E + A, 1, D + m + MP + ' +k=1' + Ci + N + R + E + A, 1, D + m + MP + ' +k=1' + Ci + N + R + SD + E + A, 1, D + m + MP + ' +k=1' + Ci + N + R + OV + E + A, 1, I + Hi + o + R + OV + E + A, 3, D + L + IH + AP + O + N + R + v + E + A, 1, D + L + ' +lon_0=11' + AP + O + N + AU + BN + Gi + E + A, 1, I + JZ + j + B + E + A, 1, I + JM + j + B + E + A, 3, D + L + ZQ + ' +k=1' + O + N + M + HG + E + A, 1, D + L + ZQ + AP + O + N + T + Q + E + A, 1, I + Ja + R + TM + E + A, 1, D + Ch + Ed + ' +k=1' + h + Ae + Y + E + A, 1, D + Ch + Rt + ' +k=1' + h + Ae + Y + E + A, 1, D + Ch + Ru + ' +k=1' + h + Ae + Y + E + A, 1, Ck + ' +lat_0=25.38236111111111 +lon_0=50.76138888888889' + BU + EK + Gn + E + A, 1, D + L + II + AP + O + N + C + Qb + E + A, 1, H + Kl + Km + KN + ' +k_0=1' + s + ' +y_0=-52684.972' + R + E + A, 1, H + Kl + Km + KN + ' +k_0=1' + h + ' +y_0=147315.028' + R + E + A, 1, H + Kl + Km + KN + ' +k_0=1' + O + ' +y_0=447315.028' + R + E + A, 1, H + Kl + Km + KN + ' +k_0=1 +x_0=-17044 +y_0=-23139.97' + R + E + A, 1, D + ' +lat_0=-36.87972222222222 +lon_0=174.7641666666667' + V + u + CO + C + B + E + A, 1, D + ' +lat_0=-37.76111111111111 +lon_0=176.4661111111111 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-38.62444444444444 +lon_0=177.8855555555556 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-39.65083333333333 +lon_0=176.6736111111111 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-39.13555555555556 +lon_0=174.2277777777778 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-39.51222222222222 +lon_0=175.64 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-40.24194444444444 +lon_0=175.4880555555555 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-40.92527777777777 +lon_0=175.6472222222222 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-41.3011111111111 +lon_0=174.7763888888889 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-40.71472222222223 +lon_0=172.6719444444444 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-41.27444444444444 +lon_0=173.2991666666667 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-41.28972222222222 +lon_0=172.1088888888889 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-41.81055555555555 +lon_0=171.5811111111111 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-42.33361111111111 +lon_0=171.5497222222222 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-42.68888888888888 +lon_0=173.01 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-41.54444444444444 +lon_0=173.8019444444444 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-42.88611111111111 +lon_0=170.9797222222222 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-43.11 +lon_0=170.2608333333333 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-43.97777777777778 +lon_0=168.6061111111111 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-43.59055555555556 +lon_0=172.7269444444445 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-43.74861111111111 +lon_0=171.3605555555555 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-44.40194444444445 +lon_0=171.0572222222222 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-44.735 +lon_0=169.4675 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-45.13277777777778 +lon_0=168.3986111111111 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-45.56361111111111 +lon_0=167.7386111111111 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-45.81611111111111 +lon_0=170.6283333333333 +k=1' + u + CO + C + B + E + A, 1, D + ' +lat_0=-45.86138888888889 +lon_0=170.2825' + Pc + u + CO + C + B + E + A, 1, D + ' +lat_0=-46.6 +lon_0=168.3427777777778 +k=1' + u + CO + C + B + E + A, 1, I + MA + o + C + B + E + A, 1, I + Nq + o + C + B + E + A, 1, I + PL + o + C + B + E + A, 1, D + Vp + ' +lon_0=-1' + Rv + ' +x_0=274319.7391633579' + N + Qj + Ho + NI + NJ + A, 1, D + L + ' +lon_0=-1' + AP + O + N + Qj + Ho + NI + E + A, 1, H + UF + Nh + IZ + HJ + s + N + i + E + A, 16, H + LM + ' +lat_2=44' + Iq + Or + EW + ' +y_0=6600000' + C + B + E + A, 3, D + YA + ' +lon_0=-8 +k=0.99982' + a + Mk + C + B + E + A, 1, I + KA + C + B + E + A, 1, D + Vq + ' +lon_0=-12 +k=1 +x_0=152399.8550907544' + N + Qj + Ho + NJ + A, 1, D + Vq + ' +lon_0=-12 +k=1 +x_0=243839.7681452071 +y_0=182879.8261089053' + Qj + Ho + NJ + A, 1, I + Ja + c + OW + E + A, 1, I + KA + c + OW + E + A, 1, He + IP + CS + s + N + ' +a=6370997 +b=6370997' + E + A, 1, D + L + ' +lon_0=-5' + AP + O + N + c + JO + E + A, 1, D + L + ' +lon_0=-5' + AP + O + N + c + IE + E + A, 4, D + ' +lat_0=49.83333333333334' + Vr + ' +k=1' + Oa + EK + R + Jx + E + A, 3, GU + ' +lat_0=53.00194444444445 +lon_0=21.50277777777778' + UG + ' +x_0=4603000 +y_0=5806000' + M + b + E + A, 1, GU + ' +lat_0=53.58333333333334 +lon_0=17.00833333333333' + UG + ' +x_0=3501000 +y_0=5999000' + M + b + E + A, 1, GU + ' +lat_0=51.67083333333333 +lon_0=16.67222222222222' + UG + ' +x_0=3703000 +y_0=5627000' + M + b + E + A, 1, D + L + ' +lon_0=18.95833333333333 +k=0.999983 +x_0=237000 +y_0=-4700000' + M + b + E + A, 1, D + L + Gj + YB + Eg + N + C + B + E + A, 1, D + L + QR + YB + Jt + N + C + B + E + A, 1, D + L + Gl + YB + IM + N + C + B + E + A, 1, D + L + II + YB + MS + N + C + B + E + A, 1, D + L + RI + ' +k=0.9993' + O + ' +y_0=-5300000' + C + B + E + A, 8, I + Nr + R + Sw + E + A, 1, I + Os + R + Sx + E + A, 1, I + Os + R + TN + E + A, 3, D + L + ' +lon_0=173' + AP + ' +x_0=1600000' + Ak + C + B + E + A, 2, I + TV + o + C + B + E + A, 1, D + L + ' +lon_0=9.5' + CP + h + N + C + B + E + A, 1, D + L + IH + CP + O + N + C + B + E + A, 1, D + L + Gj + ' +k=1' + HT + N + C + B + E + A, 2, GU + Iq + Zy + ST + AI + CO + Pd + Gq + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, H + ' +lat_1=35.25 +lat_2=36.41666666666666 +lat_0=34.66666666666666' + MQ + Z + Pv + X + J + A, 1, H + Az + DV + DM + Jo + O + N + C + B + E + A, 1, D + L + HO + ' +k=1' + MT + N + R + n + E + A, 1, D + L + Ia + ' +k=1' + LY + N + R + n + E + A, 1, D + L + IG + ' +k=1' + Jp + N + R + n + E + A, 1, D + L + PN + ' +k=1' + LZ + N + R + n + E + A, 1, D + L + LN + ' +k=1' + HU + N + R + n + E + A, 1, D + L + PO + ' +k=1' + Gw + N + R + n + E + A, 1, D + L + JS + ' +k=1' + Hu + N + R + n + E + A, 1, D + L + Ia + AP + O + N + C + B + E + A, 2, I + JN + AU + BN + RD + E + A, 1, I + Io + R + NG + E + A, 1, I + MB + R + NG + E + A, 2, I + Hi + Pd + Gq + E + A, 1, I + Gz + Pd + Gq + E + A, 2, D + Bl + Cn + V + EX + N + C + B + t + A, 1, D + Bl + Co + V + EX + N + C + B + t + A, 1, D + Bl + Iv + BG + EX + N + C + B + t + A, 1, H + DW + Jn + y + HA + Ac + AD + C + B + J + A, 1, H + DX + DY + AA + HA + Ac + AD + C + B + J + A, 1, H + Ap + DZ + Ml + AJ + Ac + AD + C + B + J + A, 1, H + LO + QS + Da + Mm + Ac + AD + C + B + J + A, 1, H + Db + Dc + Mn + Ir + Ac + AD + C + B + J + A, 1, H + Dd + De + Df + Iw + Ac + AD + C + B + J + A, 1, H + Eh + Ei + y + Ba + Bw + CL + C + B + J + A, 1, H + LP + LQ + CY + Ba + Bw + CL + C + B + J + A, 1, H + Ap + Dg + f + Ba + Bw + CL + C + B + J + A, 1, H + Dh + Mo + Di + Jq + MC + MD + C + B + J + A, 1, D + Ch + Cp + Mp + AE + N + C + B + J + A, 1, D + Aq + CR + Am + AE + N + C + B + J + A, 1, D + Aq + Ob + Am + AE + N + C + B + J + A, 1, H + LR + Dj + QT + LS + a + N + C + B + J + A, 1, D + Gm + Cq + V + AE + N + C + B + J + A, 1, D + Gm + Cr + V + CM + N + C + B + J + A, 1, D + p + Cs + BJ + AE + N + C + B + J + A, 1, D + p + Jb + BJ + AF + N + C + B + J + A, 1, D + p + Ix + BG + ME + N + C + B + J + A, 3, H + Az + DV + DM + Jo + AF + N + C + B + J + A, 1, H + Ej + Ek + AB + EY + AF + AD + C + B + J + A, 1, H + MU + Nz + AA + Ld + MF + N + C + B + J + A, 1, H + El + Dk + Ip + GE + AE + Mk + C + B + J + A, 1, H + Em + En + Ip + IL + AF + N + C + B + J + A, 1, H + Eo + Ep + Eq + Jh + MG + N + C + B + t + A, 1, H + OA + Er + Es + BE + MH + N + C + B + t + A, 1, H + Bq + OB + Fo + BE + OT + N + C + B + t + A, 1, D + Hj + Ct + CP + BF + N + C + B + J + A, 1, D + Hj + Bx + CP + CM + N + C + B + J + A, 1, H + LM + RK + MV + IS + DR + N + C + B + t + A, 1, D + Bl + Cu + Hm + OC + N + C + B + J + A, 1, D + Bl + Iy + V + AF + N + C + B + J + A, 1, D + Bl + Cv + Iz + MI + N + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, D + Fs + Cw + Ad + MJ + N + C + B + J + A, 1, D + Fs + Cx + Ad + MK + N + C + B + J + A, 1, H + Dl + Dm + BB + Oc + BF + N + C + B + J + A, 1, H + Et + Eu + LT + NW + Z + N + C + B + J + A, 1, H + BH + Ev + Ib + EZ + DR + N + C + B + t + A, 1, H + Ew + Ex + Be + EZ + DR + N + C + B + t + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + J + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + J + A, 1, H + PP + CZ + AK + AJ + KL + N + C + B + t + A, 1, H + PQ + Ca + p + AJ + KM + N + C + B + t + A, 1, H + MW + FB + BB + Ea + a + N + C + B + J + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + J + A, 1, H + FC + OD + Dr + CR + OE + N + C + B + t + A, 1, H + FD + MX + BC + MQ + a + N + C + B + J + A, 1, H + FE + MY + QV + Jr + AE + CN + C + B + J + A, 1, H + FF + FG + Ds + CV + a + Gr + C + B + J + A, 1, H + FH + FI + Cb + Ag + CM + Fq + C + B + J + A, 1, H + FJ + FK + Dt + Ji + a + Ne + C + B + J + A, 1, H + CD + CE + Cc + CV + BF + Nf + C + B + J + A, 1, H + AY + CF + Br + BI + Gd + Pw + C + B + t + A, 1, H + JF + CG + AQ + BI + Gd + RY + C + B + t + A, 1, H + JG + CH + f + BI + Gd + RZ + C + B + t + A, 1, H + OF + FL + AA + GF + Gs + Gr + C + B + J + A, 1, H + Az + Du + AB + GF + Gs + CN + C + B + J + A, 1, H + BH + OG + Ib + Cy + AF + N + C + B + J + A, 1, H + FM + FN + Dv + AJ + AF + N + C + B + J + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + J + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + J + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + J + A, 1, GU + ' +lat_0=47.25' + Qk + ST + EW + Is + Pd + Gq + E + A, 4, D + L + RQ + V + DP + N + Pd + Gq + E + A, 1, D + L + RR + V + Eg + N + Pd + Gq + E + A, 13, D + L + ' +lon_0=109' + AP + O + Ak + Y + Cj + E + A, 1, D + L + ' +lon_0=116' + AP + O + Ak + S + E + A, 1, D + L + Il + AP + O + Ak + S + E + A, 1, D + L + ZO + AP + O + N + S + E + A, 1, I + KC + c + E + A, 1, I + KC + c + E + A, 1, Ck + Vs + UX + ' +x_0=86501.46392052001' + aS + Ee + Ef + JK + ML + A, 1, I + Hi + o + R + Bs + E + A, 1, I + Gz + o + R + Bs + E + A, 1, H + ' +lat_1=9 +lat_2=3 +lat_0=6' + Pe + BZ + AH + R + AX + E + A, 1, H + ' +lat_1=17 +lat_2=33 +lat_0=25.08951' + SQ + s + N + R + Cm + E + A, 1, D + L + HO + ' +k=1' + O + N + R + n + E + A, 1, D + L + Ia + ' +k=1' + O + N + R + n + E + A, 1, D + L + IG + ' +k=1' + O + N + R + n + E + A, 1, D + L + PN + ' +k=1' + O + N + R + n + E + A, 1, D + L + LN + ' +k=1' + O + N + R + n + E + A, 1, D + L + PO + ' +k=1' + O + N + R + n + E + A, 1, D + L + JS + ' +k=1' + O + N + R + n + E + A, 1, D + Vt + Vu + ' +k=1 +x_0=836694.05 +y_0=819069.8' + R + Jg + E + A, 1, D + L + HP + ' +k=1' + HU + N + As + d + E + A, 1, D + L + HQ + ' +k=1' + Gw + N + As + d + E + A, 1, D + L + Hd + ' +k=1' + Hu + N + As + d + E + A, 1, D + L + HR + ' +k=1' + Hv + N + As + d + E + A, 1, D + L + HS + ' +k=1' + It + N + As + d + E + A, 1, D + L + EN + ' +k=1' + Hs + N + As + d + E + A, 1, D + L + Fy + ' +k=1' + Ht + N + As + d + E + A, 1, D + L + Fm + ' +k=1' + HV + N + As + d + E + A, 1, D + L + Fr + ' +k=1' + Hw + N + As + d + E + A, 1, D + L + Ed + ' +k=1' + HW + N + As + d + E + A, 1, D + L + Fn + ' +k=1' + Hx + N + As + d + E + A, 1, D + L + HP + ' +k=1' + O + N + As + d + E + A, 1, D + L + HQ + ' +k=1' + O + N + As + d + E + A, 1, D + L + Hd + ' +k=1' + O + N + As + d + E + A, 1, D + L + HR + ' +k=1' + O + N + As + d + E + A, 1, D + L + HS + ' +k=1' + O + N + As + d + E + A, 1, D + L + EN + ' +k=1' + O + N + As + d + E + A, 1, D + L + Fy + ' +k=1' + O + N + As + d + E + A, 1, D + L + Fm + ' +k=1' + O + N + As + d + E + A, 1, D + L + Fr + ' +k=1' + O + N + As + d + E + A, 1, D + L + Ed + ' +k=1' + O + N + As + d + E + A, 1, D + L + Fn + ' +k=1' + O + N + As + d + E + A, 1, D + L + HP + ' +k=1' + Hy + N + As + d + E + A, 1, D + L + Lt + ' +k=1' + Hz + N + As + d + E + A, 1, D + L + HQ + ' +k=1' + IA + N + As + d + E + A, 1, D + L + Ni + ' +k=1' + IB + N + As + d + E + A, 1, D + L + Hd + ' +k=1' + Gx + N + As + d + E + A, 1, D + L + Hq + ' +k=1' + IT + N + As + d + E + A, 1, D + L + HR + ' +k=1' + Gc + N + As + d + E + A, 1, D + L + Mj + ' +k=1' + IU + N + As + d + E + A, 1, D + L + HS + ' +k=1' + Iu + N + As + d + E + A, 1, D + L + Jj + ' +k=1' + Mu + N + As + d + E + A, 1, D + L + EN + ' +k=1' + Mv + N + As + d + E + A, 1, D + L + Le + ' +k=1' + Mw + N + As + d + E + A, 1, D + L + Fy + ' +k=1' + Mx + N + As + d + E + A, 1, D + L + Im + ' +k=1' + My + N + As + d + E + A, 1, D + L + Fm + ' +k=1' + Mz + N + As + d + E + A, 1, D + L + KF + ' +k=1' + NA + N + As + d + E + A, 1, D + L + Fr + ' +k=1' + NB + N + As + d + E + A, 1, D + L + Jk + ' +k=1' + Oh + N + As + d + E + A, 1, D + L + Ed + ' +k=1' + NC + N + As + d + E + A, 1, D + L + Il + ' +k=1' + Oi + N + As + d + E + A, 1, D + L + Fn + ' +k=1' + ND + N + As + d + E + A, 1, D + L + HP + ' +k=1' + O + N + As + d + E + A, 1, D + L + Lt + ' +k=1' + O + N + As + d + E + A, 1, D + L + HQ + ' +k=1' + O + N + As + d + E + A, 1, D + L + Ni + ' +k=1' + O + N + As + d + E + A, 1, D + L + Hd + ' +k=1' + O + N + As + d + E + A, 1, D + L + Hq + ' +k=1' + O + N + As + d + E + A, 1, D + L + HR + ' +k=1' + O + N + As + d + E + A, 1, D + L + Mj + ' +k=1' + O + N + As + d + E + A, 1, D + L + HS + ' +k=1' + O + N + As + d + E + A, 1, D + L + Jj + ' +k=1' + O + N + As + d + E + A, 1, D + L + EN + ' +k=1' + O + N + As + d + E + A, 1, D + L + Le + ' +k=1' + O + N + As + d + E + A, 1, D + L + Fy + ' +k=1' + O + N + As + d + E + A, 1, D + L + Im + ' +k=1' + O + N + As + d + E + A, 1, D + L + Fm + ' +k=1' + O + N + As + d + E + A, 1, D + L + KF + ' +k=1' + O + N + As + d + E + A, 1, D + L + Fr + ' +k=1' + O + N + As + d + E + A, 1, D + L + Jk + ' +k=1' + O + N + As + d + E + A, 1, D + L + Ed + ' +k=1' + O + N + As + d + E + A, 1, D + L + Il + ' +k=1' + O + N + As + d + E + A, 1, D + L + Fn + ' +k=1' + O + N + As + d + E + A, 1, D + L + Gl + ' +k=1' + AV + N + R + At + E + A, 1, D + L + II + ' +k=1' + Ci + N + R + At + E + A, 1, D + L + HO + ' +k=1' + Bo + N + R + At + E + A, 1, D + L + Ia + ' +k=1' + DP + N + R + At + E + A, 1, D + L + JS + ' +k=1' + MS + N + M + NK + E + A, 1, D + L + PS + ' +k=1' + MT + N + M + NK + E + A, 1, D + L + KB + ' +k=1' + Bo + N + M + Ar + E + A, 1, D + L + IH + ' +k=1' + DP + N + M + Ar + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + M + Ar + E + A, 2, D + L + HP + ' +k=1' + Hy + N + M + U + E + A, 1, D + L + Lt + ' +k=1' + Hz + N + M + U + E + A, 1, D + L + HQ + ' +k=1' + IA + N + M + U + E + A, 1, D + L + Ni + ' +k=1' + IB + N + M + U + E + A, 1, D + L + Hd + ' +k=1' + Gx + N + M + U + E + A, 1, D + L + Hq + ' +k=1' + IT + N + M + U + E + A, 1, D + L + HR + ' +k=1' + Gc + N + M + U + E + A, 1, D + L + Mj + ' +k=1' + IU + N + M + U + E + A, 1, D + L + HS + ' +k=1' + Iu + N + M + U + E + A, 1, D + L + Jj + ' +k=1' + Mu + N + M + U + E + A, 1, D + L + EN + ' +k=1' + Mv + N + M + U + E + A, 1, D + L + Le + ' +k=1' + Mw + N + M + U + E + A, 1, D + L + Fy + ' +k=1' + Mx + N + M + U + E + A, 1, D + L + Im + ' +k=1' + My + N + M + U + E + A, 1, D + L + Fm + ' +k=1' + Mz + N + M + U + E + A, 1, D + L + KF + ' +k=1' + NA + N + M + U + E + A, 1, D + L + Fr + ' +k=1' + NB + N + M + U + E + A, 1, D + L + Jk + ' +k=1' + Oh + N + M + U + E + A, 1, D + L + Ed + ' +k=1' + NC + N + M + U + E + A, 1, D + L + Il + ' +k=1' + Oi + N + M + U + E + A, 1, D + L + Fn + ' +k=1' + ND + N + M + U + E + A, 1, D + L + HP + ' +k=1' + O + N + M + U + E + A, 1, D + L + Lt + ' +k=1' + O + N + M + U + E + A, 1, D + L + HQ + ' +k=1' + O + N + M + U + E + A, 1, D + L + Ni + ' +k=1' + O + N + M + U + E + A, 1, D + L + Hd + ' +k=1' + O + N + M + U + E + A, 1, D + L + Hq + ' +k=1' + O + N + M + U + E + A, 1, D + L + HR + ' +k=1' + O + N + M + U + E + A, 1, D + L + Mj + ' +k=1' + O + N + M + U + E + A, 1, D + L + HS + ' +k=1' + O + N + M + U + E + A, 1, D + L + Jj + ' +k=1' + O + N + M + U + E + A, 1, D + L + EN + ' +k=1' + O + N + M + U + E + A, 1, D + L + Le + ' +k=1' + O + N + M + U + E + A, 1, D + L + Fy + ' +k=1' + O + N + M + U + E + A, 1, D + L + Im + ' +k=1' + O + N + M + U + E + A, 1, D + L + Fm + ' +k=1' + O + N + M + U + E + A, 1, D + L + KF + ' +k=1' + O + N + M + U + E + A, 1, D + L + Fr + ' +k=1' + O + N + M + U + E + A, 1, D + L + Jk + ' +k=1' + O + N + M + U + E + A, 1, D + L + Ed + ' +k=1' + O + N + M + U + E + A, 1, D + L + Il + ' +k=1' + O + N + M + U + E + A, 1, D + L + Fn + ' +k=1' + O + N + M + U + E + A, 1, D + PT + Zz + V + s + N + C + B + E + A, 1, D + PT + NX + V + s + N + C + B + E + A, 1, D + GM + Ox + V + s + N + C + B + E + A, 1, D + PT + Tk + V + s + N + C + B + E + A, 1, D + GM + Oy + V + s + N + C + B + E + A, 1, D + GM + Rw + V + s + N + C + B + E + A, 1, D + GM + Oz + V + s + N + C + B + E + A, 1, D + GM + aA + V + s + N + C + B + E + A, 1, D + GM + PA + V + s + N + C + B + E + A, 1, D + Fs + PB + V + s + N + C + B + E + A, 1, D + IZ + ZH + V + s + N + C + B + E + A, 1, D + IZ + ZI + V + s + N + C + B + E + A, 1, D + IZ + ZJ + V + s + N + C + B + E + A, 1, D + IQ + ' +lon_0=142' + V + s + N + C + B + E + A, 1, D + IQ + Pj + V + s + N + C + B + E + A, 1, D + IQ + ' +lon_0=124' + V + s + N + C + B + E + A, 1, D + IQ + NX + V + s + N + C + B + E + A, 1, D + ' +lat_0=20' + Rw + V + s + N + C + B + E + A, 1, D + IQ + ZR + V + s + N + C + B + E + A, 1, D + L + Gl + ' +k=1' + DP + N + M + E + A, 1, D + L + Gl + ' +k=1' + O + N + M + G + E + A, 1, D + L + HO + ' +k=1' + O + N + M + G + E + A, 1, D + L + IG + ' +k=1' + O + N + M + G + E + A, 1, D + L + LN + ' +k=1' + O + N + M + G + E + A, 1, D + L + JS + ' +k=1' + O + N + M + G + E + A, 1, D + L + PS + ' +k=1' + O + N + M + G + E + A, 1, D + L + RL + ' +k=1' + O + N + M + G + E + A, 1, D + L + QW + ' +k=1' + O + N + M + G + E + A, 1, D + L + RM + ' +k=1' + O + N + M + G + E + A, 1, D + L + HP + ' +k=1' + O + N + M + G + E + A, 1, D + L + HQ + ' +k=1' + O + N + M + G + E + A, 1, D + L + Hd + ' +k=1' + O + N + M + G + E + A, 1, D + L + HR + ' +k=1' + O + N + M + G + E + A, 1, D + L + HS + ' +k=1' + O + N + M + G + E + A, 1, D + L + EN + ' +k=1' + O + N + M + G + E + A, 1, D + L + Fy + ' +k=1' + O + N + M + G + E + A, 1, D + L + Fm + ' +k=1' + O + N + M + G + E + A, 1, D + L + Fr + ' +k=1' + O + N + M + G + E + A, 1, D + L + Ed + ' +k=1' + O + N + M + G + E + A, 1, D + L + Fn + ' +k=1' + O + N + M + G + E + A, 1, D + L + Pf + ' +k=1' + O + N + M + G + E + A, 1, D + L + Od + ' +k=1' + O + N + M + G + E + A, 1, D + L + NY + ' +k=1' + O + N + M + G + E + A, 1, D + L + Pg + ' +k=1' + O + N + M + G + E + A, 1, D + L + NZ + ' +k=1' + O + N + M + G + E + A, 1, D + L + Lf + ' +k=1' + O + N + M + G + E + A, 1, D + L + KG + ' +k=1' + O + N + M + G + E + A, 1, D + L + KH + ' +k=1' + O + N + M + G + E + A, 1, D + L + Lh + ' +k=1' + O + N + M + G + E + A, 3, D + L + Gl + ' +k=1' + O + N + M + F + E + A, 1, D + L + HO + ' +k=1' + O + N + M + F + E + A, 1, D + L + IG + ' +k=1' + O + N + M + F + E + A, 1, D + L + LN + ' +k=1' + O + N + M + F + E + A, 1, D + L + JS + ' +k=1' + O + N + M + F + E + A, 1, D + L + PS + ' +k=1' + O + N + M + F + E + A, 1, D + L + RL + ' +k=1' + O + N + M + F + E + A, 1, D + L + QW + ' +k=1' + O + N + M + F + E + A, 1, D + L + RM + ' +k=1' + O + N + M + F + E + A, 1, D + L + HP + ' +k=1' + O + N + M + F + E + A, 1, D + L + HQ + ' +k=1' + O + N + M + F + E + A, 1, D + L + Hd + ' +k=1' + O + N + M + F + E + A, 1, D + L + HR + ' +k=1' + O + N + M + F + E + A, 1, D + L + HS + ' +k=1' + O + N + M + F + E + A, 1, D + L + EN + ' +k=1' + O + N + M + F + E + A, 1, D + L + Fy + ' +k=1' + O + N + M + F + E + A, 1, D + L + Fm + ' +k=1' + O + N + M + F + E + A, 1, D + L + Fr + ' +k=1' + O + N + M + F + E + A, 1, D + L + Ed + ' +k=1' + O + N + M + F + E + A, 1, D + L + Fn + ' +k=1' + O + N + M + F + E + A, 1, D + L + Pf + ' +k=1' + O + N + M + F + E + A, 1, D + L + Od + ' +k=1' + O + N + M + F + E + A, 1, D + L + NY + ' +k=1' + O + N + M + F + E + A, 1, D + L + Pg + ' +k=1' + O + N + M + F + E + A, 1, D + L + NZ + ' +k=1' + O + N + M + F + E + A, 1, D + L + Lf + ' +k=1' + O + N + M + F + E + A, 1, D + L + KG + ' +k=1' + O + N + M + F + E + A, 1, D + L + KH + ' +k=1' + O + N + M + F + E + A, 1, D + L + Lh + ' +k=1' + O + N + M + F + E + A, 1, D + L + Gl + ' +k=1' + IM + N + M + F + E + A, 1, D + L + II + ' +k=1' + MS + N + M + F + E + A, 1, D + L + HO + ' +k=1' + MT + N + M + F + E + A, 1, D + L + Ia + ' +k=1' + LY + N + M + F + E + A, 1, D + L + IG + ' +k=1' + Jp + N + M + F + E + A, 1, D + L + PN + ' +k=1' + LZ + N + M + F + E + A, 1, D + L + LN + ' +k=1' + HU + N + M + F + E + A, 1, D + L + PO + ' +k=1' + Gw + N + M + F + E + A, 1, D + L + JS + ' +k=1' + Hu + N + M + F + E + A, 1, D + L + SQ + ' +k=1' + Hv + N + M + F + E + A, 1, D + L + PS + ' +k=1' + It + N + M + F + E + A, 1, D + L + SR + ' +k=1' + Hs + N + M + F + E + A, 1, D + L + RL + ' +k=1' + Ht + N + M + F + E + A, 1, D + L + ' +lon_0=60 +k=1' + HV + N + M + F + E + A, 1, D + L + QW + ' +k=1' + Hw + N + M + F + E + A, 1, D + L + UH + ' +k=1' + HW + N + M + F + E + A, 1, D + L + RM + ' +k=1' + Hx + N + M + F + E + A, 1, D + L + Yt + ' +k=1' + La + N + M + F + E + A, 1, D + L + HP + ' +k=1' + Hy + N + M + F + E + A, 1, D + L + Lt + ' +k=1' + Hz + N + M + F + E + A, 1, D + L + HQ + ' +k=1' + IA + N + M + F + E + A, 1, D + L + Ni + ' +k=1' + IB + N + M + F + E + A, 1, D + L + Hd + ' +k=1' + Gx + N + M + F + E + A, 1, D + L + Hq + ' +k=1' + IT + N + M + F + E + A, 1, D + L + HR + ' +k=1' + Gc + N + M + F + E + A, 1, D + L + Mj + ' +k=1' + IU + N + M + F + E + A, 1, D + L + HS + ' +k=1' + Iu + N + M + F + E + A, 2, D + L + Jj + ' +k=1' + Mu + N + M + F + E + A, 1, D + L + EN + ' +k=1' + Mv + N + M + F + E + A, 1, D + L + Le + ' +k=1' + Mw + N + M + F + E + A, 1, D + L + Fy + ' +k=1' + Mx + N + M + F + E + A, 1, D + L + Im + ' +k=1' + My + N + M + F + E + A, 1, D + L + Fm + ' +k=1' + Mz + N + M + F + E + A, 1, D + L + KF + ' +k=1' + NA + N + M + F + E + A, 1, D + L + Fr + ' +k=1' + NB + N + M + F + E + A, 1, D + L + Jk + ' +k=1' + Oh + N + M + F + E + A, 1, D + L + Ed + ' +k=1' + NC + N + M + F + E + A, 1, D + L + Il + ' +k=1' + Oi + N + M + F + E + A, 1, D + L + Fn + ' +k=1' + ND + N + M + F + E + A, 1, D + L + Rx + ' +k=1 +x_0=46500000' + N + M + F + E + A, 1, D + L + Pf + ' +k=1' + ZK + N + M + F + E + A, 1, D + L + UN + ' +k=1 +x_0=48500000' + N + M + F + E + A, 1, D + L + Od + ' +k=1 +x_0=49500000' + N + M + F + E + A, 1, D + L + Oe + ' +k=1 +x_0=50500000' + N + M + F + E + A, 1, D + L + NY + ' +k=1 +x_0=51500000' + N + M + F + E + A, 1, D + L + ZS + ' +k=1 +x_0=52500000' + N + M + F + E + A, 1, D + L + Pg + ' +k=1 +x_0=53500000' + N + M + F + E + A, 1, D + L + Ql + ' +k=1 +x_0=54500000' + N + M + F + E + A, 1, D + L + NZ + ' +k=1 +x_0=55500000' + N + M + F + E + A, 1, D + L + UO + ' +k=1 +x_0=56500000' + N + M + F + E + A, 1, D + L + Lf + ' +k=1 +x_0=57500000' + N + M + F + E + A, 1, D + L + UP + ' +k=1 +x_0=58500000' + N + M + F + E + A, 1, D + L + KG + ' +k=1 +x_0=59500000' + N + M + F + E + A, 2, D + L + KH + ' +k=1 +x_0=61500000' + N + M + F + E + A, 1, D + L + SU + ' +k=1 +x_0=62500000' + N + M + F + E + A, 1, D + L + Lh + ' +k=1 +x_0=63500000' + N + M + F + E + A, 1, D + L + SV + ' +k=1 +x_0=64500000' + N + M + F + E + A, 1, D + L + Gl + ' +k=1' + O + N + M + F + E + A, 1, D + L + II + ' +k=1' + O + N + M + F + E + A, 1, D + L + HO + ' +k=1' + O + N + M + F + E + A, 1, D + L + Ia + ' +k=1' + O + N + M + F + E + A, 1, D + L + IG + ' +k=1' + O + N + M + F + E + A, 1, D + L + PN + ' +k=1' + O + N + M + F + E + A, 1, D + L + LN + ' +k=1' + O + N + M + F + E + A, 1, D + L + PO + ' +k=1' + O + N + M + F + E + A, 1, D + L + JS + ' +k=1' + O + N + M + F + E + A, 1, D + L + SQ + ' +k=1' + O + N + M + F + E + A, 1, D + L + PS + ' +k=1' + O + N + M + F + E + A, 1, D + L + SR + ' +k=1' + O + N + M + F + E + A, 1, D + L + RL + ' +k=1' + O + N + M + F + E + A, 1, D + L + ' +lon_0=60 +k=1' + O + N + M + F + E + A, 1, D + L + QW + ' +k=1' + O + N + M + F + E + A, 1, D + L + UH + ' +k=1' + O + N + M + F + E + A, 1, D + L + RM + ' +k=1' + O + N + M + F + E + A, 1, D + L + Yt + ' +k=1' + O + N + M + F + E + A, 2, D + L + HP + ' +k=1' + O + N + M + F + E + A, 1, D + L + Lt + ' +k=1' + O + N + M + F + E + A, 1, D + L + HQ + ' +k=1' + O + N + M + F + E + A, 1, D + L + Ni + ' +k=1' + O + N + M + F + E + A, 1, D + L + Hd + ' +k=1' + O + N + M + F + E + A, 1, D + L + Hq + ' +k=1' + O + N + M + F + E + A, 1, D + L + HR + ' +k=1' + O + N + M + F + E + A, 1, D + L + Mj + ' +k=1' + O + N + M + F + E + A, 1, D + L + HS + ' +k=1' + O + N + M + F + E + A, 1, D + L + Jj + ' +k=1' + O + N + M + F + E + A, 1, D + L + EN + ' +k=1' + O + N + M + F + E + A, 1, D + L + Le + ' +k=1' + O + N + M + F + E + A, 1, D + L + Fy + ' +k=1' + O + N + M + F + E + A, 1, D + L + Im + ' +k=1' + O + N + M + F + E + A, 1, D + L + Fm + ' +k=1' + O + N + M + F + E + A, 1, D + L + KF + ' +k=1' + O + N + M + F + E + A, 1, D + L + Fr + ' +k=1' + O + N + M + F + E + A, 1, D + L + Jk + ' +k=1' + O + N + M + F + E + A, 1, D + L + Ed + ' +k=1' + O + N + M + F + E + A, 1, D + L + Il + ' +k=1' + O + N + M + F + E + A, 1, D + L + Fn + ' +k=1' + O + N + M + F + E + A, 1, D + L + Rx + ' +k=1' + O + N + M + F + E + A, 1, D + L + Pf + ' +k=1' + O + N + M + F + E + A, 1, D + L + UN + ' +k=1' + O + N + M + F + E + A, 1, D + L + Od + ' +k=1' + O + N + M + F + E + A, 1, D + L + Oe + ' +k=1' + O + N + M + F + E + A, 1, D + L + NY + ' +k=1' + O + N + M + F + E + A, 1, D + L + ZS + ' +k=1' + O + N + M + F + E + A, 1, D + L + Pg + ' +k=1' + O + N + M + F + E + A, 1, D + L + Ql + ' +k=1' + O + N + M + F + E + A, 1, D + L + NZ + ' +k=1' + O + N + M + F + E + A, 1, D + L + UO + ' +k=1' + O + N + M + F + E + A, 1, D + L + Lf + ' +k=1' + O + N + M + F + E + A, 1, D + L + UP + ' +k=1' + O + N + M + F + E + A, 1, D + L + KG + ' +k=1' + O + N + M + F + E + A, 1, D + L + Ry + ' +k=1' + O + N + M + F + E + A, 1, D + L + KH + ' +k=1' + O + N + M + F + E + A, 1, D + L + SU + ' +k=1' + O + N + M + F + E + A, 1, D + L + Lh + ' +k=1' + O + N + M + F + E + A, 1, D + L + SV + ' +k=1' + O + N + M + F + E + A, 1, D + L + Gl + ' +k=1' + IM + N + M + G + E + A, 1, D + L + II + ' +k=1' + MS + N + M + G + E + A, 1, D + L + HO + ' +k=1' + MT + N + M + G + E + A, 1, D + L + Ia + ' +k=1' + LY + N + M + G + E + A, 1, D + L + IG + ' +k=1' + Jp + N + M + G + E + A, 1, D + L + PN + ' +k=1' + LZ + N + M + G + E + A, 1, D + L + LN + ' +k=1' + HU + N + M + G + E + A, 1, D + L + PO + ' +k=1' + Gw + N + M + G + E + A, 1, D + L + JS + ' +k=1' + Hu + N + M + G + E + A, 1, D + L + SQ + ' +k=1' + Hv + N + M + G + E + A, 1, D + L + PS + ' +k=1' + It + N + M + G + E + A, 1, D + L + SR + ' +k=1' + Hs + N + M + G + E + A, 1, D + L + RL + ' +k=1' + Ht + N + M + G + E + A, 1, D + L + ' +lon_0=60 +k=1' + HV + N + M + G + E + A, 1, D + L + QW + ' +k=1' + Hw + N + M + G + E + A, 1, D + L + UH + ' +k=1' + HW + N + M + G + E + A, 1, D + L + RM + ' +k=1' + Hx + N + M + G + E + A, 1, D + L + Yt + ' +k=1' + La + N + M + G + E + A, 1, D + L + HP + ' +k=1' + Hy + N + M + G + E + A, 1, D + L + Lt + ' +k=1' + Hz + N + M + G + E + A, 1, D + L + HQ + ' +k=1' + IA + N + M + G + E + A, 1, D + L + Ni + ' +k=1' + IB + N + M + G + E + A, 1, D + L + Hd + ' +k=1' + Gx + N + M + G + E + A, 1, D + L + Hq + ' +k=1' + IT + N + M + G + E + A, 1, D + L + HR + ' +k=1' + Gc + N + M + G + E + A, 1, D + L + Mj + ' +k=1' + IU + N + M + G + E + A, 1, D + L + HS + ' +k=1' + Iu + N + M + G + E + A, 1, D + L + Jj + ' +k=1' + Mu + N + M + G + E + A, 1, D + L + EN + ' +k=1' + Mv + N + M + G + E + A, 1, D + L + Le + ' +k=1' + Mw + N + M + G + E + A, 1, D + L + Fy + ' +k=1' + Mx + N + M + G + E + A, 1, D + L + Im + ' +k=1' + My + N + M + G + E + A, 1, D + L + Fm + ' +k=1' + Mz + N + M + G + E + A, 1, D + L + KF + ' +k=1' + NA + N + M + G + E + A, 1, D + L + Fr + ' +k=1' + NB + N + M + G + E + A, 1, D + L + Jk + ' +k=1' + Oh + N + M + G + E + A, 1, D + L + Ed + ' +k=1' + NC + N + M + G + E + A, 1, D + L + Il + ' +k=1' + Oi + N + M + G + E + A, 1, D + L + Fn + ' +k=1' + ND + N + M + G + E + A, 1, D + L + Rx + ' +k=1 +x_0=46500000' + N + M + G + E + A, 1, D + L + Pf + ' +k=1' + ZK + N + M + G + E + A, 1, D + L + UN + ' +k=1 +x_0=48500000' + N + M + G + E + A, 1, D + L + Od + ' +k=1 +x_0=49500000' + N + M + G + E + A, 1, D + L + Oe + ' +k=1 +x_0=50500000' + N + M + G + E + A, 1, D + L + NY + ' +k=1 +x_0=51500000' + N + M + G + E + A, 1, D + L + ZS + ' +k=1 +x_0=52500000' + N + M + G + E + A, 1, D + L + Pg + ' +k=1 +x_0=53500000' + N + M + G + E + A, 1, D + L + Ql + ' +k=1 +x_0=54500000' + N + M + G + E + A, 1, D + L + NZ + ' +k=1 +x_0=55500000' + N + M + G + E + A, 1, D + L + UO + ' +k=1 +x_0=56500000' + N + M + G + E + A, 1, D + L + Lf + ' +k=1 +x_0=57500000' + N + M + G + E + A, 1, D + L + UP + ' +k=1 +x_0=58500000' + N + M + G + E + A, 1, D + L + KG + ' +k=1 +x_0=59500000' + N + M + G + E + A, 2, D + L + KH + ' +k=1 +x_0=61500000' + N + M + G + E + A, 1, D + L + SU + ' +k=1 +x_0=62500000' + N + M + G + E + A, 1, D + L + Lh + ' +k=1 +x_0=63500000' + N + M + G + E + A, 1, D + L + SV + ' +k=1 +x_0=64500000' + N + M + G + E + A, 1, D + L + Gl + ' +k=1' + O + N + M + G + E + A, 1, D + L + II + ' +k=1' + O + N + M + G + E + A, 1, D + L + HO + ' +k=1' + O + N + M + G + E + A, 1, D + L + Ia + ' +k=1' + O + N + M + G + E + A, 1, D + L + IG + ' +k=1' + O + N + M + G + E + A, 1, D + L + PN + ' +k=1' + O + N + M + G + E + A, 1, D + L + LN + ' +k=1' + O + N + M + G + E + A, 1, D + L + PO + ' +k=1' + O + N + M + G + E + A, 1, D + L + JS + ' +k=1' + O + N + M + G + E + A, 1, D + L + SQ + ' +k=1' + O + N + M + G + E + A, 1, D + L + PS + ' +k=1' + O + N + M + G + E + A, 1, D + L + SR + ' +k=1' + O + N + M + G + E + A, 1, D + L + RL + ' +k=1' + O + N + M + G + E + A, 1, D + L + ' +lon_0=60 +k=1' + O + N + M + G + E + A, 1, D + L + QW + ' +k=1' + O + N + M + G + E + A, 1, D + L + UH + ' +k=1' + O + N + M + G + E + A, 1, D + L + RM + ' +k=1' + O + N + M + G + E + A, 1, D + L + Yt + ' +k=1' + O + N + M + G + E + A, 1, D + L + HP + ' +k=1' + O + N + M + G + E + A, 1, D + L + Lt + ' +k=1' + O + N + M + G + E + A, 1, D + L + HQ + ' +k=1' + O + N + M + G + E + A, 1, D + L + Ni + ' +k=1' + O + N + M + G + E + A, 1, D + L + Hd + ' +k=1' + O + N + M + G + E + A, 1, D + L + Hq + ' +k=1' + O + N + M + G + E + A, 1, D + L + HR + ' +k=1' + O + N + M + G + E + A, 1, D + L + Mj + ' +k=1' + O + N + M + G + E + A, 1, D + L + HS + ' +k=1' + O + N + M + G + E + A, 1, D + L + Jj + ' +k=1' + O + N + M + G + E + A, 1, D + L + EN + ' +k=1' + O + N + M + G + E + A, 1, D + L + Le + ' +k=1' + O + N + M + G + E + A, 1, D + L + Fy + ' +k=1' + O + N + M + G + E + A, 1, D + L + Im + ' +k=1' + O + N + M + G + E + A, 1, D + L + Fm + ' +k=1' + O + N + M + G + E + A, 1, D + L + KF + ' +k=1' + O + N + M + G + E + A, 1, D + L + Fr + ' +k=1' + O + N + M + G + E + A, 1, D + L + Jk + ' +k=1' + O + N + M + G + E + A, 1, D + L + Ed + ' +k=1' + O + N + M + G + E + A, 1, I + Mf + o + i + HF + E + A, 1, I + KD + o + i + HF + E + A, 1, D + L + Il + ' +k=1' + O + N + M + G + E + A, 1, D + L + Fn + ' +k=1' + O + N + M + G + E + A, 1, D + L + Rx + ' +k=1' + O + N + M + G + E + A, 1, D + L + Pf + ' +k=1' + O + N + M + G + E + A, 1, D + L + UN + ' +k=1' + O + N + M + G + E + A, 1, D + L + Od + ' +k=1' + O + N + M + G + E + A, 1, D + L + Oe + ' +k=1' + O + N + M + G + E + A, 1, D + L + NY + ' +k=1' + O + N + M + G + E + A, 1, D + L + ZS + ' +k=1' + O + N + M + G + E + A, 1, D + L + Pg + ' +k=1' + O + N + M + G + E + A, 1, D + L + Ql + ' +k=1' + O + N + M + G + E + A, 1, D + L + NZ + ' +k=1' + O + N + M + G + E + A, 1, D + L + UO + ' +k=1' + O + N + M + G + E + A, 1, D + L + Lf + ' +k=1' + O + N + M + G + E + A, 1, D + L + UP + ' +k=1' + O + N + M + G + E + A, 1, D + L + KG + ' +k=1' + O + N + M + G + E + A, 1, D + L + Ry + ' +k=1' + O + N + M + G + E + A, 1, D + L + KH + ' +k=1' + O + N + M + G + E + A, 1, D + L + SU + ' +k=1' + O + N + M + G + E + A, 1, D + L + Lh + ' +k=1' + O + N + M + G + E + A, 1, D + L + SV + ' +k=1' + O + N + M + G + E + A, 1, D + IY + IV + Pc + h + N + C + B + E + A, 1, D + Gm + OS + BG + a + N + C + B + E + A, 1, D + Bl + Cn + V + EX + N + C + B + E + A, 1, D + Bl + Co + V + EX + N + C + B + E + A, 1, D + Bl + Iv + BG + EX + N + C + B + E + A, 1, H + Dx + Dy + BC + IF + u + N + C + B + E + A, 1, H + Dz + Mq + EA + IF + u + Is + C + B + E + A, 1, H + DW + Jn + y + HA + Bd + Ae + C + B + E + A, 1, H + DX + DY + AA + HA + Bd + Ae + C + B + E + A, 1, H + Ap + DZ + Ml + AJ + Bd + Ae + C + B + E + A, 1, H + LO + QS + Da + Mm + Bd + Ae + C + B + E + A, 1, H + Db + Dc + Mn + Ir + Bd + Ae + C + B + E + A, 1, H + Dd + De + Df + Iw + Bd + Ae + C + B + E + A, 1, H + Eh + Ei + y + Ba + Fw + Fx + C + B + E + A, 1, H + LP + LQ + CY + Ba + Fw + Fx + C + B + E + A, 1, H + Ap + Dg + f + Ba + Fw + Fx + C + B + E + A, 1, H + Dh + Mo + Di + Jq + QG + QH + C + B + E + A, 1, D + Ch + Cp + Mp + h + N + C + B + E + A, 1, D + Aq + CR + Am + h + N + C + B + E + A, 1, D + Aq + Ob + Am + h + N + C + B + E + A, 1, H + LR + Dj + QT + LS + a + N + C + B + E + A, 1, D + Gm + Cq + V + h + N + C + B + E + A, 1, D + Gm + Cr + V + EW + N + C + B + E + A, 1, D + Kn + Sf + AO + O + N + C + B + E + A, 1, D + Ko + KO + AO + O + N + C + B + E + A, 1, D + GV + KI + Jl + O + N + C + B + E + A, 1, D + Kp + Sg + Jl + O + N + C + B + E + A, 1, D + Kq + KP + ' +k=1' + O + N + C + B + E + A, 1, D + p + Cs + BJ + h + N + C + B + E + A, 1, D + p + Jb + BJ + O + N + C + B + E + A, 1, D + p + Ix + BG + CX + N + C + B + E + A, 1, D + f + Cz + EQ + AI + N + C + B + E + A, 1, D + f + DA + Am + EW + N + C + B + E + A, 1, D + DM + DB + AO + BU + KJ + C + B + E + A, 1, D + DM + DC + AO + HT + KJ + C + B + E + A, 1, H + EB + EC + Fo + GG + AV + AH + C + B + E + A, 1, H + AY + ED + Fs + GG + O + N + C + B + E + A, 1, H + EE + EF + AQ + Fl + u + N + C + B + E + A, 1, H + EG + EH + f + CV + u + Is + C + B + E + A, 1, H + Az + DV + DM + Jo + O + N + C + B + E + A, 1, H + Ej + Ek + AB + EY + O + Ae + C + B + E + A, 1, H + FS + FT + IY + Hg + BZ + N + C + B + E + A, 1, H + OH + OI + OJ + Bi + BZ + N + C + B + E + A, 1, D + AK + HJ + V + AI + N + C + B + E + A, 1, D + BD + DD + AO + HT + N + C + B + E + A, 1, H + MU + Nz + AA + Ld + u + N + C + B + E + A, 1, H + El + Dk + Ip + GE + h + Mk + C + B + E + A, 1, H + Em + En + Ip + IL + O + N + C + B + E + A, 1, H + Eo + Ep + Eq + Jh + Tl + N + C + B + E + A, 1, H + OA + Er + Es + BE + Pk + N + C + B + E + A, 1, H + Bq + OB + Fo + BE + LU + N + C + B + E + A, 1, H + FU + FV + Iq + DE + CX + EK + C + B + E + A, 1, H + Ma + FW + IP + Js + CX + EK + C + B + E + A, 1, H + FX + FY + Nj + Na + CX + EK + C + B + E + A, 1, D + Hj + Ct + CP + AI + N + C + B + E + A, 1, D + Hj + Bx + CP + EW + N + C + B + E + A, 1, D + Cd + RS + BG + Bv + N + C + B + E + A, 1, D + Cd + Hg + BG + O + N + C + B + E + A, 1, D + Id + RT + Am + YC + N + C + B + E + A, 1, H + LM + RK + MV + IS + a + N + C + B + E + A, 1, H + JT + Jn + FZ + CS + O + N + C + B + E + A, 1, D + CQ + DF + V + h + Tm + C + B + E + A, 1, D + CQ + DG + V + O + Hh + C + B + E + A, 1, D + CQ + DH + V + CX + LV + C + B + E + A, 1, D + Fp + DI + AO + AI + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + Bl + Cu + Hm + OC + N + C + B + E + A, 1, D + Bl + Iy + V + O + N + C + B + E + A, 1, D + Bl + Cv + Iz + YD + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + Fs + Cw + Ad + Bv + N + C + B + E + A, 1, D + Fs + Cx + Ad + Qo + N + C + B + E + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + B + E + A, 1, H + BH + Ev + Ib + EZ + a + N + C + B + E + A, 1, H + Ew + Ex + Be + EZ + a + N + C + B + E + A, 1, H + OK + Fa + BY + ET + a + N + C + B + E + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + E + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + E + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + B + E + A, 1, H + PQ + Ca + p + AJ + AV + N + C + B + E + A, 1, D + EI + GE + Lb + BU + N + C + B + E + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + E + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + E + A, 1, H + FD + MX + BC + MQ + a + N + C + B + E + A, 1, H + FE + MY + QV + Jr + h + AH + C + B + E + A, 1, H + FF + FG + Ds + CV + a + Cl + C + B + E + A, 1, H + FH + FI + Cb + Ag + EW + Fq + C + B + E + A, 1, H + FJ + FK + Dt + Ji + a + LV + C + B + E + A, 1, H + CD + CE + Cc + CV + AI + Ju + C + B + E + A, 1, H + AY + CF + Br + BI + O + AH + C + B + E + A, 1, H + JF + CG + AQ + BI + O + Cl + C + B + E + A, 1, H + JG + CH + f + BI + O + Fq + C + B + E + A, 1, D + Fp + LW + JA + O + N + C + B + E + A, 1, H + OF + FL + AA + GF + Bo + Cl + C + B + E + A, 1, H + Az + Du + AB + GF + Bo + AH + C + B + E + A, 1, H + BH + OG + Ib + Cy + O + N + C + B + E + A, 1, H + FM + FN + Dv + AJ + O + N + C + B + E + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + E + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + E + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + E + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + E + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + E + A, 1, D + CA + DJ + Ad + h + N + C + B + E + A, 1, D + CA + DK + Ad + u + EK + C + B + E + A, 1, D + CA + JB + Ad + a + N + C + B + E + A, 1, D + CA + DL + Ad + CX + EK + C + B + E + A, 1, H + GW + GX + GY + GA + h + IK + C + B + E + A, 1, D + Bl + Cn + V + EX + N + C + B + t + A, 1, D + Bl + Co + V + EX + N + C + B + t + A, 1, D + Bl + Iv + BG + EX + N + C + B + t + A, 1, H + DW + Jn + y + HA + Ac + AD + C + B + J + A, 1, H + DX + DY + AA + HA + Ac + AD + C + B + J + A, 1, H + Ap + DZ + Ml + AJ + Ac + AD + C + B + J + A, 1, H + LO + QS + Da + Mm + Ac + AD + C + B + J + A, 1, H + Db + Dc + Mn + Ir + Ac + AD + C + B + J + A, 1, H + Dd + De + Df + Iw + Ac + AD + C + B + J + A, 1, H + Eh + Ei + y + Ba + Bw + CL + C + B + J + A, 1, H + LP + LQ + CY + Ba + Bw + CL + C + B + J + A, 1, H + Ap + Dg + f + Ba + Bw + CL + C + B + J + A, 1, H + Dh + Mo + Di + Jq + MC + MD + C + B + J + A, 1, D + Ch + Cp + Mp + AE + N + C + B + J + A, 1, D + Aq + CR + Am + AE + N + C + B + J + A, 1, D + Aq + Ob + Am + AE + N + C + B + J + A, 1, H + LR + Dj + QT + LS + a + N + C + B + J + A, 1, D + Gm + Cq + V + AE + N + C + B + J + A, 1, D + Gm + Cr + V + CM + N + C + B + J + A, 1, D + p + Cs + BJ + AE + N + C + B + J + A, 1, D + p + Jb + BJ + AF + N + C + B + J + A, 1, D + p + Ix + BG + ME + N + C + B + J + A, 3, H + Az + DV + DM + Jo + AF + N + C + B + J + A, 1, H + Ej + Ek + AB + EY + AF + AD + C + B + J + A, 1, H + MU + Nz + AA + Ld + MF + N + C + B + J + A, 1, H + El + Dk + Ip + GE + AE + Mk + C + B + J + A, 1, H + Em + En + Ip + IL + AF + N + C + B + J + A, 1, H + Eo + Ep + Eq + Jh + MG + N + C + B + t + A, 1, H + OA + Er + Es + BE + MH + N + C + B + t + A, 1, H + Bq + OB + Fo + BE + OT + N + C + B + t + A, 1, D + Hj + Ct + CP + BF + N + C + B + J + A, 1, D + Hj + Bx + CP + CM + N + C + B + J + A, 1, H + LM + RK + MV + IS + DR + N + C + B + t + A, 1, D + Bl + Cu + Hm + OC + N + C + B + J + A, 1, D + Bl + Iy + V + AF + N + C + B + J + A, 1, D + Bl + Cv + Iz + MI + N + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, D + Fs + Cw + Ad + MJ + N + C + B + J + A, 1, D + Fs + Cx + Ad + MK + N + C + B + J + A, 1, H + Dl + Dm + BB + Oc + BF + N + C + B + J + A, 1, H + BH + Ev + Ib + EZ + DR + N + C + B + t + A, 1, H + Ew + Ex + Be + EZ + DR + N + C + B + t + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + J + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + J + A, 1, H + PP + CZ + AK + AJ + KL + N + C + B + t + A, 1, H + PQ + Ca + p + AJ + KM + N + C + B + t + A, 1, H + FD + MX + BC + MQ + a + N + C + B + J + A, 1, H + FE + MY + QV + Jr + AE + CN + C + B + J + A, 1, H + FF + FG + Ds + CV + a + Gr + C + B + J + A, 1, H + FH + FI + Cb + Ag + CM + Fq + C + B + J + A, 1, H + FJ + FK + Dt + Ji + a + Ne + C + B + J + A, 1, H + CD + CE + Cc + CV + BF + Nf + C + B + J + A, 1, H + AY + CF + Br + BI + Gd + Pw + C + B + t + A, 1, H + JF + CG + AQ + BI + Gd + RY + C + B + t + A, 1, H + JG + CH + f + BI + Gd + RZ + C + B + t + A, 1, H + OF + FL + AA + GF + Gs + Gr + C + B + J + A, 1, H + Az + Du + AB + GF + Gs + CN + C + B + J + A, 1, H + BH + OG + Ib + Cy + AF + N + C + B + J + A, 1, H + FM + FN + Dv + AJ + AF + N + C + B + J + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + J + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + J + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + J + A, 1, D + L + ' +lon_0=13' + AP + O + N + AU + BN + Sy + E + A, 1, D + ' +lat_0=24.45' + Vv + Jl + h + Hk + R + Jy + E + A, 1, I + NS + o + Y + Hf + E + A, 2, D + KQ + ' +lon_0=41.53333333333333 +k=1 +x_0=1300000' + N + M + F + E + A, 1, D + KQ + ' +lon_0=44.53333333333333 +k=1' + aB + N + M + F + E + A, 1, D + KQ + ' +lon_0=47.53333333333333 +k=1' + aC + N + M + F + E + A, 1, D + KQ + ' +lon_0=50.53333333333333 +k=1' + aD + N + M + F + E + A, 1, D + Ol + ' +lon_0=50.76666666666667 +k=1' + aB + N + M + F + E + A, 1, D + Ol + ' +lon_0=53.76666666666667 +k=1' + aC + N + M + F + E + A, 1, D + Ol + ' +lon_0=56.76666666666667 +k=1' + aD + N + M + F + E + A, 1, I + Ja + R + SE + E + A, 1, I + Ja + R + Sz + E + A, 2, D + L + Tf + V + Ab + N + C + B + E + A, 1, D + L + RQ + V + Ab + N + C + B + E + A, 1, D + L + RR + V + Ab + N + C + B + E + A, 1, D + L + Tg + V + Ab + N + C + B + E + A, 1, D + L + IL + V + Ab + N + C + B + E + A, 1, D + L + Th + V + Ab + N + C + B + E + A, 1, D + L + Ti + V + Ab + N + C + B + E + A, 1, D + L + Ga + V + Ab + N + C + B + E + A, 1, GU + Iq + Zy + ST + Ci + aE + C + B + E + A, 1, GU + ' +lat_0=47.25' + Qk + ST + u + CO + C + B + E + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 2, DT + ' +lat_1=55' + QY + Yu + Ms + s + N + X + J + A, 1, D + DM + DB + AO + MM + GI + C + B + J + A, 1, D + DM + DC + AO + HT + GI + C + B + J + A, 1, D + DM + DB + AO + MM + GI + C + B + J + A, 1, D + DM + DC + AO + HT + GI + C + B + J + A, 1, I + Gz + R + TA + E + A, 1, I + Gz + R + SF + E + A, 1, I + Io + R + NH + E + A, 1, I + Io + C + B + E + A, 1, I + Gz + R + TO + E + A, 2, I + Me + o + C + B + E + A, 1, I + Ro + o + R + TP + E + A, 1, I + RG + o + R + Lr + E + A, 1, I + RH + o + R + UD + E + A, 2, I + JZ + o + R + SG + E + A, 1, I + MA + o + R + QM + E + A, 6, I + ID + i + TZ + E + A, 1, I + SK + o + R + SH + E + A, 3, H + JT + Hl + GH + AJ + u + N + C + B + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + B + t + A, 1, H + JT + Hl + GH + AJ + u + N + C + B + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + B + t + A, 1, I + MA + o + R + Jf + E + A, 1, I + MA + o + R + TB + E + A, 1, I + MA + o + R + Ke + E + A, 1, I + MA + o + R + HH + E + A, 1, I + JZ + o + R + SI + E + A, 1, JU + ' +lon_0=110' + ZP + Pl + Qp + Y + Hf + E + A, 1, JU + ' +lon_0=110' + ZP + Pl + Qp + Y + Cj + E + A, 1, JU + ' +lon_0=110' + ZP + Pl + Qp + Y + HZ + E + A, 1, D + L + KB + AP + AV + N + R + CK + E + A, 1, D + L + Gj + AP + ' +x_0=2520000' + N + R + CK + E + A, 1, DT + Yv + ' +lat_2=58.5' + IP + ' +lon_0=-126' + BZ + N + C + B + E + A, 1, I + KC + C + B + E + A, 1, D + L + IH + ' +k=1' + Bn + N + C + B + E + A, 1, D + L + ' +lon_0=13.5 +k=1' + Bn + N + C + B + E + A, 1, D + L + Gj + ' +k=1' + Bn + N + C + B + E + A, 1, D + L + YE + ' +k=1' + Bn + N + C + B + E + A, 1, D + L + QR + ' +k=1' + Bn + N + C + B + E + A, 1, D + L + ' +lon_0=14.25 +k=1' + Bn + N + C + B + E + A, 1, D + L + ' +lon_0=15.75 +k=1' + Bn + N + C + B + E + A, 1, D + L + ' +lon_0=17.25 +k=1' + Bn + N + C + B + E + A, 1, D + L + ' +lon_0=18.75 +k=1' + Bn + N + C + B + E + A, 1, D + L + ' +lon_0=20.25 +k=1' + Bn + N + C + B + E + A, 1, D + L + ' +lon_0=21.75 +k=1' + Bn + N + C + B + E + A, 1, D + L + ' +lon_0=23.25 +k=1' + Bn + N + C + B + E + A, 1, D + L + Vw + ' +k=1' + AV + N + Y + BW + E + A, 1, D + L + Vx + ' +k=1' + AV + N + Y + BW + E + A, 1, D + L + Vy + ' +k=1' + AV + N + Y + BW + E + A, 1, D + L + Vz + ' +k=1' + AV + N + Y + BW + E + A, 1, D + L + WA + ' +k=1' + AV + N + Y + BW + E + A, 1, D + L + WB + ' +k=1' + AV + N + Y + BW + E + A, 1, D + L + Vw + ' +k=1' + AV + N + Y + E + A, 1, D + L + Vx + ' +k=1' + AV + N + Y + E + A, 1, D + L + Vy + ' +k=1' + AV + N + Y + E + A, 1, D + L + Vz + ' +k=1' + AV + N + Y + E + A, 1, D + L + WA + ' +k=1' + AV + N + Y + E + A, 1, D + L + WB + ' +k=1' + AV + N + Y + E + A, 1, BP + m + ' +lat_ts=-71' + HN + ' +k=1' + s + N + S + E + A, 1, BP + m + ' +lat_ts=-71 +lon_0=70 +k=1' + Pk + Hh + S + E + A, 1, H + ' +lat_1=-68.5 +lat_2=-74.5 +lat_0=-50 +lon_0=70' + Pk + Hh + S + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, I + Mf + o + j + KR + E + A, 1, I + KD + o + j + KR + E + A, 3, I + Ja + C + B + E + A, 1, I + KA + C + B + E + A, 1, I + Oq + C + B + E + A, 1, I + QD + C + B + E + A, 1, I + JN + C + B + E + A, 1, I + KC + C + B + E + A, 1, I + NR + C + B + E + A, 1, I + Ki + C + B + E + A, 1, I + Mf + C + B + E + A, 1, I + KD + C + B + E + A, 5, I + Os + R + Jd + E + A, 1, I + SL + R + Jd + E + A, 1, I + Ja + R + Jd + E + A, 1, H + ' +lat_1=64.25 +lat_2=65.75 +lat_0=65 +lon_0=-19' + O + Ae + C + B + E + A, 1, D + L + ' +lon_0=-8.5 +k=1' + Jm + ' +y_0=-7800000' + R + Jz + E + A, 1, D + L + II + AP + O + ' +y_0=-6000000' + C + B + E + A, 1, I + MA + o + R + Qc + E + A, 1, I + Ja + R + PI + E + A, 1, I + Os + R + Pt + E + A, 1, I + Os + R + Pa + E + A, 1, I + JN + j + B + E + A, 1, I + KC + j + B + E + A, 1, D + L + ' +lon_0=37' + UG + O + ZL + R + n + E + A, 1, I + Ki + C + B + E + A, 1, Ck + ' +lat_0=52.41864827777778 +lon_0=13.62720366666667' + Of + ' +y_0=10000' + Y + AC + E + A, 1, D + L + Bu + AP + O + ' +y_0=-4500000' + X + E + A, 1, D + L + Bu + AP + YF + Sh + C + B + E + A, 1, D + L + Bu + AP + YF + Sh + C + B + E + A, 1, D + AL + Rf + JE + EW + N + C + B + E + A, 2, D + BD + Rg + JE + AI + N + C + B + E + A, 1, D + AL + Rf + JE + EW + N + C + B + E + A, 2, D + BD + Rg + JE + AI + N + C + B + E + A, 1, CU + Kr + ' +lonc=-86' + QI + AP + QJ + PY + KE + QK + C + B + E + A, 1, CU + Kr + ' +lonc=-86' + QI + AP + QJ + PY + KE + QK + C + B + E + A, 1, H + WC + WD + WE + CS + ' +x_0=914400 +y_0=914400' + X + t + A, 1, H + WC + WD + WE + CS + BZ + AH + C + B + E + A, 1, H + OM + RO + OX + CS + AV + Ju + C + B + E + A, 1, DT + OM + RO + OX + CS + AV + Hh + C + B + E + A, 1, H + OM + RO + OX + CS + AV + Ju + C + B + E + A, 1, DT + OM + RO + OX + CS + AV + Hh + C + B + E + A, 1, DT + ' +lat_1=24' + YG + ' +lat_0=24' + NV + u + N + C + B + E + A, 1, DT + ' +lat_1=24' + YG + ' +lat_0=24' + NV + u + N + C + B + E + A, 1, H + Fi + Fj + AB + EY + AV + AH + C + B + E + A, 1, H + Fi + Fj + AB + EY + AV + CN + C + B + J + A, 1, H + Fi + Fj + AB + EY + AV + AH + C + B + E + A, 1, H + Fi + Fj + AB + EY + AV + CN + C + B + J + A, 1, I + Mg + Y + g + E + A, 1, I + NT + Y + g + E + A, 1, I + Ot + Y + g + E + A, 1, I + Nv + Y + g + E + A, 1, I + PM + Y + g + E + A, 1, I + Mg + C + B + E + A, 1, I + NT + C + B + E + A, 1, I + Ot + C + B + E + A, 1, I + Nv + C + B + E + A, 1, I + PM + C + B + E + A, 1, H + ' +lat_1=-14.26666666666667 +lat_0=-14.26666666666667' + SW + ' +k_0=1' + e + ' +y_0=95169.31165862332' + i + TC + J + A, 4, D + L + Hq + AP + O + N + By + Ay + RF + E + A, 1, H + ' +lat_1=-28' + ZT + ' +lat_0=-32' + Fn + BZ + Cl + C + B + E + A, 1, D + SS + ' +lon_0=-2.416666666666667 +k=0.999997 +x_0=47000' + Rz + C + B + E + A, 1, D + ' +lat_0=49.225 +lon_0=-2.135 +k=0.9999999000000001' + Of + ' +y_0=70000' + C + B + E + A, 1, H + ' +lat_1=-36 +lat_2=-38 +lat_0=-37 +lon_0=145' + Ci + Gb + x + r + E + A, 1, H + ' +lat_1=-36 +lat_2=-38 +lat_0=-37 +lon_0=145' + Ci + JH + C + B + E + A, 1, H + ' +lat_1=-18' + ZT + L + ' +lon_0=134' + s + N + C + B + E + A, 1, D + ' +lat_0=-28' + NY + Jl + Jm + EK + C + B + E + A, 1, D + Ie + ' +lon_0=-80.07750791666666 +k=1' + BZ + AH + C + B + E + A, 1, D + Ie + ' +lon_0=-77.07750791666666 +k=1' + BZ + AH + C + B + E + A, 1, D + Ie + ' +lon_0=-74.07750791666666 +k=1' + BZ + AH + C + B + E + A, 1, D + Ie + ' +lon_0=-71.07750791666666 +k=1' + BZ + AH + C + B + E + A, 1, D + Ie + ' +lon_0=-68.07750791666666 +k=1' + BZ + AH + C + B + E + A, 1, D + L + YH + ' +k=0.999' + BZ + AH + R + Qe + E + A, 1, GU + ' +lat_0=50.625 +lon_0=21.08333333333333' + UG + ' +x_0=4637000 +y_0=5467000' + M + b + E + A, 1, D + L + Fm + CP + O + N + i + BX + E + A, 1, D + L + ZU + CP + O + N + i + BX + E + A, 1, D + L + ZV + CP + O + N + i + BX + E + A, 1, D + L + Fr + CP + O + N + i + BX + E + A, 1, D + L + Ru + CP + O + N + i + BX + E + A, 1, D + L + RI + ' +k=1' + O + N + C + B + E + A, 1, D + L + UI + ' +k=1' + O + N + C + B + E + A, 1, D + L + Gl + ' +k=1' + O + N + C + B + E + A, 1, D + L + Yx + ' +k=1' + O + N + C + B + E + A, 1, D + L + SP + ' +k=1' + O + N + C + B + E + A, 1, D + L + II + ' +k=1' + O + N + C + B + E + A, 1, D + L + RJ + ' +k=1' + O + N + C + B + E + A, 1, D + L + UJ + ' +k=1' + O + N + C + B + E + A, 1, D + L + HO + ' +k=1' + O + N + C + B + E + A, 1, D + L + RP + ' +k=1' + O + N + C + B + E + A, 1, D + L + ' +lon_0=29 +k=1' + O + N + C + B + E + A, 1, D + L + Ia + ' +k=1' + O + N + C + B + E + A, 1, D + L + QQ + ' +k=1' + O + N + C + B + E + A, 2, Ck + ' +lat_0=-18 +lon_0=178 +x_0=109435.392 +y_0=141622.272' + UW + Ym + Nl + ' +to_meter=0.201168' + A, 1, I + PL + o + R + JD + E + A, 1, I + SK + o + R + JD + E + A, 6, I + Mh + By + Ay + JP + E + A, 1, I + Mi + By + Ay + JP + E + A, 3, D + L + ' +lon_0=18.05779 +k=0.99999425 +x_0=100178.1808 +y_0=-6500614.7836' + C + B + E + A, 1, DT + Yv + ' +lat_2=58.5' + IP + ' +lon_0=-126' + BZ + N + C + B + E + A, 1, I + RH + C + B + E + A, 1, I + TW + C + B + E + A, 1, I + TX + C + B + E + A, 1, I + QE + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, H + YI + ' +lat_2=53.5' + L + SA + ' +x_0=930000 +y_0=6430000' + C + B + E + A, 1, H + YI + ' +lat_2=53.5' + L + SA + ' +x_0=930000 +y_0=6430000' + C + B + E + A, 1, H + ' +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5' + ZW + u + Hk + C + B + E + A, 1, I + MA + o + j + QB + E + A, 1, H + ' +lat_1=-22.24469175 +lat_2=-22.29469175 +lat_0=-22.26969175 +lon_0=166.44242575 +x_0=0.66 +y_0=1.02' + R + HH + E + A, 1, H + ' +lat_1=-22.24472222222222 +lat_2=-22.29472222222222 +lat_0=-22.26972222222222 +lon_0=166.4425 +x_0=8.313000000000001 +y_0=-2.354' + R + HH + E + A, 1, CU + Qi + aF + aT + Ph + Of + N + KE + GZ + Yn + Qz + ' +to_meter=20.116756' + A, 1, CU + Qi + aF + aT + Ph + ' +x_0=804670.24' + N + KE + GZ + Yn + Qz + E + A, 1, I + SM + o + C + B + E + A, 1, I + MA + o + C + B + E + A, 1, I + Nq + o + C + B + E + A, 1, I + Nq + o + R + Jf + E + A, 2, DT + ' +lat_1=42.122774 +lat_2=49.01518 +lat_0=45.568977 +lon_0=-84.455955' + BZ + AH + C + B + E + A, 1, DT + ' +lat_1=42.122774 +lat_2=49.01518 +lat_0=45.568977 +lon_0=-83.248627' + BZ + AH + C + B + E + A, 1, D + L + ZQ + AP + O + N + By + Ay + JP + E + A, 1, D + L + UE + ' +k=0.9965000000000001' + BZ + N + R + w + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 1, I + Io + C + B + E + A, 1, I + MB + C + B + E + A, 1, I + Nx + C + B + E + A, 1, I + Nr + C + B + E + A, 1, I + Os + C + B + E + A, 1, I + SL + C + B + E + A, 1, I + Ja + C + B + E + A, 1, I + KA + C + B + E + A, 1, D + L + KB + CP + h + N + R + w + E + A, 1, D + L + ' +lon_0=11' + CP + h + N + R + w + E + A, 1, D + L + ' +lon_0=13' + CP + h + N + R + w + E + A, 1, D + L + Gj + CP + h + N + R + w + E + A, 1, D + L + UE + CP + h + N + R + w + E + A, 1, D + L + RI + CP + h + N + R + w + E + A, 1, D + L + Gl + CP + h + N + R + w + E + A, 1, D + L + SP + CP + h + N + R + w + E + A, 1, D + L + RJ + CP + h + N + R + w + E + A, 1, I + JN + R + w + E + A, 1, H + Qq + Li + JS + PZ + AV + aG + c + QC + E + A, 1, I + KC + R + w + E + A, 1, I + NR + R + w + E + A, 1, I + Ki + R + w + E + A, 1, H + Om + On + m + Pe + s + N + S + E + A, 1, H + Om + On + m + Nb + s + N + S + E + A, 1, H + Om + On + m + ' +lon_0=-42' + s + N + S + E + A, 1, H + BQ + BR + m + SU + s + N + S + E + A, 1, H + BQ + BR + m + Pe + s + N + S + E + A, 1, H + BQ + BR + m + Nb + s + N + S + E + A, 1, H + BQ + BR + m + PO + s + N + S + E + A, 1, H + BQ + BR + m + SR + s + N + S + E + A, 1, H + BQ + BR + m + UH + s + N + S + E + A, 1, H + BQ + BR + m + Lt + s + N + S + E + A, 1, H + BQ + BR + m + Hq + s + N + S + E + A, 1, H + BQ + BR + m + Jj + s + N + S + E + A, 1, H + BQ + BR + m + Im + s + N + S + E + A, 1, H + BQ + BR + m + Jk + s + N + S + E + A, 1, H + BQ + BR + m + Rx + s + N + S + E + A, 1, H + BQ + BR + m + Oe + s + N + S + E + A, 1, H + BQ + BR + m + Ql + s + N + S + E + A, 1, H + AM + AN + m + ' +lon_0=-102' + s + N + S + E + A, 1, H + AM + AN + m + Bu + s + N + S + E + A, 1, H + AM + AN + m + ' +lon_0=-78' + s + N + S + E + A, 1, H + AM + AN + m + Pe + s + N + S + E + A, 1, H + AM + AN + m + ' +lon_0=-18' + s + N + S + E + A, 1, H + AM + AN + m + ' +lon_0=-6' + s + N + S + E + A, 1, H + AM + AN + m + ZO + s + N + S + E + A, 1, H + AM + AN + m + QR + s + N + S + E + A, 1, H + AM + AN + m + Ia + s + N + S + E + A, 1, H + AM + AN + m + PO + s + N + S + E + A, 1, H + AM + AN + m + SR + s + N + S + E + A, 1, H + AM + AN + m + UH + s + N + S + E + A, 1, H + AM + AN + m + Lt + s + N + S + E + A, 1, H + AM + AN + m + Hq + s + N + S + E + A, 1, H + AM + AN + m + Jj + s + N + S + E + A, 1, H + AM + AN + m + Im + s + N + S + E + A, 1, H + AM + AN + m + Jk + s + N + S + E + A, 1, H + AM + AN + m + Rx + s + N + S + E + A, 1, H + AM + AN + m + Oe + s + N + S + E + A, 1, H + AM + AN + m + Ql + s + N + S + E + A, 1, H + AM + AN + m + UP + s + N + S + E + A, 1, H + Ah + AZ + m + YJ + s + N + S + E + A, 1, H + Ah + AZ + m + YK + s + N + S + E + A, 1, H + Ah + AZ + m + Lj + s + N + S + E + A, 1, H + Ah + AZ + m + Ji + s + N + S + E + A, 1, H + Ah + AZ + m + CR + s + N + S + E + A, 1, H + Ah + AZ + m + Qk + s + N + S + E + A, 1, H + Ah + AZ + m + ' +lon_0=-27' + s + N + S + E + A, 1, H + Ah + AZ + m + ' +lon_0=-9' + s + N + S + E + A, 1, H + Ah + AZ + m + KB + s + N + S + E + A, 1, H + Ah + AZ + m + HO + s + N + S + E + A, 1, H + Ah + AZ + m + JS + s + N + S + E + A, 1, H + Ah + AZ + m + QW + s + N + S + E + A, 1, H + Ah + AZ + m + HQ + s + N + S + E + A, 1, H + Ah + AZ + m + HS + s + N + S + E + A, 1, H + Ah + AZ + m + Fm + s + N + S + E + A, 1, H + Ah + AZ + m + Fn + s + N + S + E + A, 1, H + Ah + AZ + m + NY + s + N + S + E + A, 1, H + Ah + AZ + m + Lf + s + N + S + E + A, 1, H + Ai + Aj + m + SV + s + N + S + E + A, 1, H + Ai + Aj + m + ' +lon_0=-144' + s + N + S + E + A, 1, H + Ai + Aj + m + Mt + s + N + S + E + A, 1, H + Ai + Aj + m + OZ + s + N + S + E + A, 1, H + Ai + Aj + m + UQ + s + N + S + E + A, 1, H + Ai + Aj + m + ' +lon_0=-48' + s + N + S + E + A, 1, H + Ai + Aj + m + ' +lon_0=-24' + s + N + S + E + A, 1, H + Ai + Aj + m + HN + s + N + S + E + A, 1, H + Ai + Aj + m + II + s + N + S + E + A, 1, H + Ai + Aj + m + SQ + s + N + S + E + A, 1, H + Ai + Aj + m + Yt + s + N + S + E + A, 1, H + Ai + Aj + m + Mj + s + N + S + E + A, 1, H + Ai + Aj + m + KF + s + N + S + E + A, 1, H + Ai + Aj + m + UN + s + N + S + E + A, 1, H + Ai + Aj + m + UO + s + N + S + E + A, 1, BP + m + AW + SX + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + YK + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + ' +lon_0=-105 +k=1' + s + N + S + E + A, 1, BP + m + AW + UR + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + ' +lon_0=-45 +k=1' + s + N + S + E + A, 1, BP + m + AW + ' +lon_0=-15 +k=1' + s + N + S + E + A, 1, BP + m + AW + Gj + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + JS + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + HP + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + EN + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + Fn + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + NZ + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + ON + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + Bu + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + ' +lon_0=-30 +k=1' + s + N + S + E + A, 1, BP + m + AW + Ia + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + Hq + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + Oe + ' +k=1' + s + N + S + E + A, 1, BP + m + AW + HN + ' +k=1' + s + N + S + E + A, 1, H + Ai + Aj + ' +lat_0=-78' + Ql + s + N + S + E + A, 2, I + RG + o + C + Bm + E + A, 1, I + Ro + o + C + Bm + E + A, 1, I + RH + o + C + Bm + E + A, 1, I + TW + o + C + Bm + E + A, 1, H + WF + ' +lat_2=58' + WG + II + O + ' +y_0=6375000' + C + Lw + E + A, 1, H + WF + ' +lat_2=58' + WG + II + O + ' +y_0=6375000' + C + B + E + A, 1, I + RH + o + R + Lq + E + A, 1, I + RH + o + R + Kc + E + A, 1, I + Ro + o + R + Kg + E + A, 1, I + Ro + o + R + Kh + E + A, 1, I + RG + o + R + QN + E + A, 1, I + JM + j + TD + E + A, 1, H + ' +lat_1=-30.75 +lat_2=-35.75 +lat_0=-33.25' + Od + ' +x_0=9300000' + Gb + C + B + E + A, 1, DT + Yy + SY + L + Mt + s + QZ + X + E + A, 1, DT + Yy + SY + L + Mt + s + QZ + C + B + E + A, 1, DT + Yy + SY + L + Mt + s + QZ + C + B + E + A, 1, I + ID + R + NH + E + A, 1, I + ID + C + B + E + A, 3, D + L + Yx + V + O + Ak + c + E + A, 1, D + L + II + V + O + Ak + c + E + A, 1, D + L + IH + V + O + Ak + c + E + A, 1, D + L + ' +lon_0=14' + V + O + Ak + c + E + A, 1, D + L + ' +lon_0=16' + V + O + Ak + c + E + A, 1, D + L + QR + V + O + Ak + c + E + A, 1, D + L + UI + V + O + Ak + c + E + A, 1, D + L + Yx + V + O + Ak + c + E + A, 1, D + L + II + V + O + Ak + c + E + A, 1, D + L + UJ + V + O + Ak + c + E + A, 1, D + L + RP + V + O + Ak + c + E + A, 1, D + L + Ia + V + O + Ak + c + E + A, 1, GU + ' +lat_0=52.16666666666666 +lon_0=19.16666666666667 +k=0.999714' + O + Ae + M + b + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + M + b + E + A, 1, D + L + QR + ' +k=1' + Jt + N + M + b + E + A, 1, D + L + Gl + ' +k=1' + IM + N + M + b + E + A, 1, D + L + II + ' +k=1' + MS + N + M + b + E + A, 1, D + L + Gj + ' +k=1' + Bo + N + M + b + E + A, 1, D + L + Gl + ' +k=1' + DP + N + M + b + E + A, 1, D + L + HO + ' +k=1' + Eg + N + M + b + E + A, 1, I + Rc + o + R + TE + E + A, 1, H + ' +lat_1=-20.19506944444445 +lat_0=-20.19506944444445 +lon_0=57.52182777777778 +k_0=1' + BZ + AH + c + Qf + E + A, 1, DT + ' +lat_1=55' + QY + Yu + Ms + s + N + C + B + E + A, 1, D + L + IH + V + O + Ak + c + GN + E + A, 1, D + L + ' +lon_0=14' + V + O + Ak + c + GN + E + A, 1, D + L + ' +lon_0=16' + V + O + Ak + c + GN + E + A, 1, I + KC + o + c + GN + E + A, 1, I + Ja + C + B + E + A, 1, I + KA + C + B + E + A, 1, I + Oq + C + B + E + A, 1, D + L + II + UG + O + N + C + B + E + A, 1, H + LM + IJ + ' +lat_0=63.390675' + UY + ' +x_0=6200000' + Fq + C + B + E + A, 1, H + LM + IJ + ' +lat_0=63.390675' + UY + ' +x_0=6200000' + Fq + C + B + E + A, 2, D + ' +lat_0=0.1 +lon_0=21.95 +k=1' + Bv + N + M + F + E + A, 1, D + ' +lat_0=0.1 +lon_0=24.95 +k=1 +x_0=1250000' + N + M + F + E + A, 1, D + ' +lat_0=0.1 +lon_0=27.95 +k=1 +x_0=2250000' + N + M + F + E + A, 1, I + JN + o + R + E + A, 1, I + JN + o + R + E + A, 1, D + Gm + QQ + ' +k=1 +x_0=615000 +y_0=810000' + Gn + Qg + E + A, 3, H + Et + Eu + LT + NW + Rh + N + C + B + E + A, 2, H + FC + OD + Dr + CR + OE + N + C + B + E + A, 1, H + FC + OD + Dr + CR + OE + N + C + B + t + A, 1, H + MW + FB + BB + Ea + a + N + C + B + E + A, 1, H + MW + FB + BB + Ea + a + N + C + B + J + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + E + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + J + A, 2, I + Ja + c + E + A, 1, I + KA + c + E + A, 1, I + Oq + c + E + A, 1, I + Nq + X + E + A, 1, I + PL + X + E + A, 1, I + Nq + C + B + E + A, 1, I + PL + C + B + E + A, 1, I + KA + R + E + A, 1, CU + Qi + aF + ' +alpha=323.0257964666666' + Ph + ' +x_0=804671' + N + KE + GZ + C + E + A, 1, CU + Qi + Yz + aU + Ph + s + N + KE + If + C + E + A, 1, Ck + ' +lat_0=2.121679744444445 +lon_0=103.4279362361111 +x_0=-14810.562 +y_0=8758.32' + C + E + A, 1, Ck + ' +lat_0=2.682347636111111 +lon_0=101.9749050416667 +x_0=3673.785 +y_0=-4240.573' + C + E + A, 1, Ck + ' +lat_0=3.769388088888889 +lon_0=102.3682989833333 +x_0=-7368.228 +y_0=6485.858' + C + E + A, 1, Ck + ' +lat_0=3.68464905 +lon_0=101.3891079138889 +x_0=-34836.161 +y_0=56464.049' + C + E + A, 1, Ck + ' +lat_0=4.9762852 +lon_0=103.070275625 +x_0=19594.245 +y_0=3371.895' + C + E + A, 1, Ck + ' +lat_0=5.421517541666667 +lon_0=100.3443769638889 +x_0=-23.414 +y_0=62.283' + C + E + A, 1, Ck + ' +lat_0=5.964672713888889 +lon_0=100.6363711111111' + s + N + C + E + A, 1, Ck + ' +lat_0=4.859063022222222 +lon_0=100.8154105861111 +x_0=-1.769 +y_0=133454.779' + C + E + A, 1, Ck + ' +lat_0=5.972543658333334 +lon_0=102.2952416694444 +x_0=13227.851 +y_0=8739.894' + C + E + A, 1, D + L + QR + ' +k=1' + O + N + R + At + E + A, 1, D + L + IG + ' +k=1' + Eg + N + R + At + E + A, 1, JU + PS + ' +lat_ts=42' + s + N + M + F + E + A, 1, D + L + Ry + ' +k=1 +x_0=60500000' + N + M + F + E + A, 1, D + L + Ry + ' +k=1 +x_0=60500000' + N + M + G + E + A, 1, I + KD + c + EU + E + A, 1, I + JZ + c + EU + E + A, 1, I + JM + c + EU + E + A, 1, H + Qq + Li + JS + PZ + AV + aG + c + E + A, 1, JU + HN + ' +k=1' + s + N + S + E + A, 1, D + L + KB + ' +k=1' + Bo + N + Y + E + A, 1, D + L + IH + ' +k=1' + DP + N + Y + E + A, 1, D + L + IH + ' +k=1' + DP + N + Y + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + Y + E + A, 1, D + L + SZ + ' +k=0.9992' + O + N + C + B + E + A, 1, D + L + SZ + ' +k=0.9992' + s + N + C + B + E + A, 1, D + L + SZ + ' +k=0.9992' + O + N + C + B + E + A, 1, D + L + SZ + ' +k=0.9992' + s + N + C + B + E + A, 1, H + Et + Eu + LT + NW + Z + N + C + B + J + A, 1, I + Mh + j + Fu + E + A, 1, I + Mi + j + Fu + E + A, 1, Ck + Vt + Vu + ' +x_0=40243.57775604237 +y_0=19069.93351512578' + Ee + Ef + ML + A, 1, He + Hr + HN + s + N + ZX + ZY + E + A, 1, He + m + HN + s + N + ZX + ZY + E + A, 1, '+proj=cea' + HN + ' +lat_ts=30' + s + N + ZX + ZY + E + A, 1, BP + Hr + ' +lat_ts=70 +lon_0=-45 +k=1' + s + N + ZZ + Ri + E + A, 1, BP + m + ' +lat_ts=-70' + HN + ' +k=1' + s + N + ZZ + Ri + E + A, 1, BP + Hr + ' +lat_ts=70 +lon_0=-45 +k=1' + s + N + S + E + A, 1, D + ' +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572' + j + E + A, 1, H + ' +lat_1=18 +lat_2=24 +lat_0=21' + Im + O + Ae + T + Q + E + A, 1, H + LM + Nh + ' +lat_0=47.5' + Ig + u + Is + C + B + E + A, 1, H + EB + EC + Fo + GG + AV + GJ + C + B + J + A, 1, H + AY + ED + Fs + GG + AG + N + C + B + J + A, 1, H + EE + EF + AQ + Fl + Au + N + C + B + J + A, 1, H + EG + EH + f + CV + Au + Gt + C + B + J + A, 1, D + CQ + DF + V + Gu + MN + C + B + J + A, 1, D + CQ + DG + V + AG + Hh + C + B + J + A, 1, D + CQ + DH + V + An + NE + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, H + EB + EC + Fo + GG + AV + GJ + C + B + J + A, 1, H + AY + ED + Fs + GG + AG + N + C + B + J + A, 1, H + EE + EF + AQ + Fl + Au + N + C + B + J + A, 1, H + EG + EH + f + CV + Au + Gt + C + B + J + A, 1, D + CQ + DF + V + Gu + MN + C + B + J + A, 1, D + CQ + DG + V + AG + Hh + C + B + J + A, 1, D + CQ + DH + V + An + NE + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, H + Dx + Dy + BC + IF + Au + N + C + B + J + A, 1, H + Dz + Mq + EA + IF + Au + Gt + C + B + J + A, 1, D + f + Cz + EQ + BF + N + C + B + J + A, 1, D + f + DA + Am + MO + N + C + B + J + A, 1, D + Fp + DI + AO + BF + N + C + B + J + A, 1, D + EI + GE + Lb + JV + N + C + B + J + A, 1, I + JM + c + Gg + E + A, 1, I + Me + c + Gg + E + A, 1, H + Dx + Dy + BC + IF + Au + N + C + B + J + A, 1, H + Dz + Mq + EA + IF + Au + Gt + C + B + J + A, 1, D + f + Cz + EQ + BF + N + C + B + J + A, 1, D + f + DA + Am + MO + N + C + B + J + A, 1, D + Fp + DI + AO + BF + N + C + B + J + A, 1, D + EI + GE + Lb + JV + N + C + B + J + A, 1, H + Ks + Kt + ' +lat_0=50.797815' + WH + ' +x_0=150328 +y_0=166262' + C + B + E + A, 1, H + ' +lat_1=18' + OX + Ld + ' +k_0=1' + YL + ' +y_0=650000' + j + B + E + A, 1, I + Ik + j + B + E + A, 1, I + IC + j + B + E + A, 1, H + FS + FT + IY + Hg + Eb + N + C + B + J + A, 1, H + OH + OI + OJ + Bi + Eb + N + C + B + J + A, 1, H + CD + CE + ' +lat_0=25.5' + Bi + Eb + N + C + B + J + A, 2, H + OL + Ff + EJ + Ag + a + N + C + B + J + A, 1, H + FS + FT + IY + Hg + Eb + N + C + B + J + A, 1, H + OH + OI + OJ + Bi + Eb + N + C + B + J + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + J + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + J + A, 1, D + ' +lat_0=-17 +lon_0=178.75 +k=0.99985' + Bd + LV + T + P + E + A, 1, I + Ja + AU + BN + Nm + E + A, 1, I + KA + AU + BN + Nm + E + A, 1, D + YM + Rj + JE + O + N + C + B + E + A, 1, D + YM + Rj + JE + O + N + C + B + E + A, 1, D + IY + IV + Pc + h + N + C + B + E + A, 1, D + Gm + OS + BG + a + N + C + B + E + A, 1, DT + ' +lat_1=55' + QY + Yu + Ms + s + N + C + B + E + A, 1, CU + ' +lat_0=57' + Ku + Kv + V + LX + EO + KE + GZ + C + B + E + A, 1, D + Ft + YN + V + O + N + C + B + E + A, 1, D + Ft + YO + V + O + N + C + B + E + A, 1, D + Ft + ON + V + O + N + C + B + E + A, 1, D + Ft + Ms + V + O + N + C + B + E + A, 1, D + Ft + KI + V + O + N + C + B + E + A, 1, D + Ft + YP + V + O + N + C + B + E + A, 1, D + Ft + YQ + V + O + N + C + B + E + A, 1, D + Ft + SW + V + O + N + C + B + E + A, 1, H + Kw + Kx + UK + YR + BZ + N + C + B + E + A, 1, D + Bl + Co + V + EX + N + C + B + E + A, 1, D + Bl + Co + V + EX + N + C + B + t + A, 1, D + Bl + Cn + V + EX + N + C + B + E + A, 1, D + Bl + Cn + V + EX + N + C + B + t + A, 1, D + Bl + Iv + BG + EX + N + C + B + E + A, 1, D + Bl + Iv + BG + EX + N + C + B + t + A, 1, H + Dx + Dy + BC + IF + u + N + C + B + E + A, 1, H + Dx + Dy + BC + IF + Au + N + C + B + J + A, 1, H + Dz + Mq + EA + IF + u + Is + C + B + E + A, 1, H + Dz + Mq + EA + IF + Au + Gt + C + B + J + A, 1, DT + Yy + SY + L + Mt + s + QZ + C + B + E + A, 1, H + DW + Jn + y + HA + Bd + Ae + C + B + E + A, 1, H + DW + Jn + y + HA + Ac + AD + C + B + J + A, 1, H + DX + DY + AA + HA + Bd + Ae + C + B + E + A, 1, H + DX + DY + AA + HA + Ac + AD + C + B + J + A, 1, H + Ap + DZ + Ml + AJ + Bd + Ae + C + B + E + A, 1, H + Ap + DZ + Ml + AJ + Ac + AD + C + B + J + A, 1, H + LO + QS + Da + Mm + Bd + Ae + C + B + E + A, 1, H + LO + QS + Da + Mm + Ac + AD + C + B + J + A, 1, H + Db + Dc + Mn + Ir + Bd + Ae + C + B + E + A, 1, H + Db + Dc + Mn + Ir + Ac + AD + C + B + J + A, 1, H + Dd + De + Df + Iw + Bd + Ae + C + B + E + A, 1, H + Dd + De + Df + Iw + Ac + AD + C + B + J + A, 1, H + LP + LQ + CY + Ba + Fw + Fx + C + B + E + A, 1, H + LP + LQ + CY + Ba + Bw + CL + C + B + J + A, 1, H + Eh + Ei + y + Ba + Fw + Fx + C + B + E + A, 1, H + Eh + Ei + y + Ba + Bw + CL + C + B + J + A, 1, H + Ap + Dg + f + Ba + Fw + Fx + C + B + E + A, 1, H + Ap + Dg + f + Ba + Bw + CL + C + B + J + A, 1, H + Dh + Mo + Di + Jq + QG + QH + C + B + E + A, 1, H + Dh + Mo + Di + Jq + MC + MD + C + B + J + A, 1, D + Ch + Cp + Mp + h + N + C + B + E + A, 1, D + Ch + Cp + Mp + AE + N + C + B + J + A, 1, D + Aq + CR + Am + h + N + C + B + E + A, 1, D + Aq + CR + Am + AE + N + C + B + J + A, 1, DT + ' +lat_1=24' + YG + ' +lat_0=24' + NV + u + N + C + B + E + A, 1, H + LR + Dj + QT + LS + a + N + C + B + E + A, 1, H + LR + Dj + QT + LS + a + N + C + B + J + A, 1, D + Aq + Ob + Am + h + N + C + B + E + A, 1, D + Aq + Ob + Am + AE + N + C + B + J + A, 1, D + Gm + Cq + V + h + N + C + B + E + A, 1, D + Gm + Cq + V + AE + N + C + B + J + A, 1, D + Gm + Cr + V + EW + N + C + B + E + A, 1, D + Gm + Cr + V + CM + N + C + B + J + A, 1, D + p + Jb + BJ + O + N + C + B + E + A, 1, D + p + Jb + BJ + AF + N + C + B + J + A, 1, D + p + Cs + BJ + h + N + C + B + E + A, 1, D + p + Cs + BJ + AE + N + C + B + J + A, 1, D + p + Ix + BG + CX + N + C + B + E + A, 1, D + p + Ix + BG + ME + N + C + B + J + A, 1, D + f + Cz + EQ + AI + N + C + B + E + A, 1, D + f + Cz + EQ + BF + N + C + B + J + A, 1, D + f + DA + Am + EW + N + C + B + E + A, 1, D + f + DA + Am + MO + N + C + B + J + A, 1, D + DM + DB + AO + BU + KJ + C + B + E + A, 1, D + DM + DB + AO + MM + GI + C + B + J + A, 1, D + DM + DC + AO + HT + KJ + C + B + E + A, 1, D + DM + DC + AO + HT + GI + C + B + J + A, 1, H + EB + EC + Fo + GG + AV + AH + C + B + E + A, 1, H + EB + EC + Fo + GG + AV + GJ + C + B + J + A, 1, H + AY + ED + Fs + GG + O + N + C + B + E + A, 1, H + AY + ED + Fs + GG + AG + N + C + B + J + A, 1, H + EE + EF + AQ + Fl + u + N + C + B + E + A, 1, H + EE + EF + AQ + Fl + Au + N + C + B + J + A, 1, H + EG + EH + f + CV + u + Is + C + B + E + A, 1, H + EG + EH + f + CV + Au + Gt + C + B + J + A, 1, H + Az + DV + DM + Jo + O + N + C + B + E + A, 1, H + Az + DV + DM + Jo + AF + N + C + B + J + A, 1, H + Fi + Fj + AB + EY + AV + AH + C + B + E + A, 1, H + Fi + Fj + AB + EY + AV + CN + C + B + J + A, 1, H + Ej + Ek + AB + EY + O + Ae + C + B + E + A, 1, H + Ej + Ek + AB + EY + AF + AD + C + B + J + A, 1, H + FS + FT + IY + Hg + BZ + N + C + B + E + A, 1, H + FS + FT + IY + Hg + Eb + N + C + B + J + A, 1, H + OH + OI + OJ + Bi + BZ + N + C + B + E + A, 1, H + OH + OI + OJ + Bi + Eb + N + C + B + J + A, 1, D + YM + Rj + JE + O + N + C + B + E + A, 1, D + AL + Rf + JE + EW + N + C + B + E + A, 1, D + BD + Rg + JE + AI + N + C + B + E + A, 1, D + AK + HJ + V + AI + N + C + B + E + A, 1, D + BD + DD + AO + HT + N + C + B + E + A, 1, H + MU + Nz + AA + Ld + u + N + C + B + E + A, 1, H + AY + CF + Br + BI + AG + GJ + C + B + J + A, 1, D + Kn + Sf + AO + e + N + i + GB + J + A, 1, D + Ko + KO + AO + e + N + i + GB + J + A, 1, D + GV + KI + Jl + e + N + i + GB + J + A, 1, D + Kp + Sg + Jl + e + N + i + GB + J + A, 1, D + Kq + KP + ' +k=1' + e + N + i + GB + J + A, 1, H + JF + CG + AQ + BI + AG + NF + C + B + J + A, 1, H + JG + CH + f + BI + AG + Fq + C + B + J + A, 1, H + AY + CF + Br + BI + AG + GJ + C + B + J + A, 1, H + JF + CG + AQ + BI + AG + NF + C + B + J + A, 1, H + JG + CH + f + BI + AG + Fq + C + B + J + A, 1, He + Hr + Ry + s + N + S + E + A, 1, He + Hr + ON + s + N + S + E + A, 1, He + Hr + CS + s + N + S + E + A, 1, He + Hr + ' +lon_0=-40' + s + N + S + E + A, 1, He + Hr + Lu + s + N + S + E + A, 1, He + Hr + Hq + s + N + S + E + A, 1, DT + ' +lat_1=-18' + ZT + L + Il + s + N + C + B + E + A, 1, DT + WI + ' +lat_2=68 +lat_0=59 +lon_0=-132.5' + O + Ae + C + B + E + A, 1, DT + WI + ' +lat_2=68 +lat_0=59 +lon_0=-132.5' + O + Ae + C + B + E + A, 1, H + ' +lat_1=62 +lat_2=70' + L + ' +lon_0=-112' + s + N + C + B + E + A, 1, H + ' +lat_1=62 +lat_2=70' + L + ' +lon_0=-112' + s + N + C + B + E + A, 1, H + MU + Nz + AA + Ld + MF + N + C + B + J + A, 1, H + Em + En + Ip + IL + O + N + C + B + E + A, 1, H + Em + En + Ip + IL + AF + N + C + B + J + A, 1, H + El + Dk + Ip + GE + h + Mk + C + B + E + A, 1, H + El + Dk + Ip + GE + AE + Mk + C + B + J + A, 1, H + OA + Er + Es + BE + Pk + N + C + B + E + A, 1, H + OA + Er + Es + BE + MH + N + C + B + t + A, 1, H + Eo + Ep + Eq + Jh + Tl + N + C + B + E + A, 1, H + Eo + Ep + Eq + Jh + MG + N + C + B + t + A, 1, CU + Kr + ' +lonc=-86' + QI + AP + QJ + PY + KE + QK + C + B + E + A, 1, H + Bq + OB + Fo + BE + LU + N + C + B + E + A, 1, H + Bq + OB + Fo + BE + OT + N + C + B + t + A, 1, H + Ma + FW + IP + Js + CX + EK + C + B + E + A, 1, H + FU + FV + Iq + DE + CX + EK + C + B + E + A, 1, H + FX + FY + Nj + Na + CX + EK + C + B + E + A, 1, D + Hj + Ct + CP + AI + N + C + B + E + A, 1, D + Hj + Ct + CP + BF + N + C + B + J + A, 1, D + Hj + Bx + CP + EW + N + C + B + E + A, 1, D + Hj + Bx + CP + CM + N + C + B + J + A, 1, D + Cd + Hg + BG + O + N + C + B + E + A, 1, D + Cd + RS + BG + Bv + N + C + B + E + A, 1, D + Id + RT + Am + YC + N + C + B + E + A, 1, H + LM + RK + MV + IS + a + N + C + B + E + A, 1, H + LM + RK + MV + IS + DR + N + C + B + t + A, 1, H + JT + Jn + FZ + CS + O + N + C + B + E + A, 1, D + CQ + DG + V + O + Hh + C + B + E + A, 1, D + CQ + DG + V + AG + Hh + C + B + J + A, 1, D + CQ + DF + V + h + Tm + C + B + E + A, 1, D + CQ + DF + V + Gu + MN + C + B + J + A, 1, D + CQ + DH + V + CX + LV + C + B + E + A, 1, D + CQ + DH + V + An + NE + C + B + J + A, 1, D + Fp + DI + AO + AI + N + C + B + E + A, 1, D + Fp + DI + AO + BF + N + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, D + Bl + Iy + V + O + N + C + B + E + A, 1, D + Bl + Iy + V + AF + N + C + B + J + A, 1, D + Bl + Cu + Hm + OC + N + C + B + E + A, 1, D + Bl + Cu + Hm + OC + N + C + B + J + A, 1, D + Bl + Cv + Iz + YD + N + C + B + E + A, 1, D + Bl + Cv + Iz + MI + N + C + B + J + A, 1, D + Fs + Cw + Ad + Bv + N + C + B + E + A, 1, D + Fs + Cw + Ad + MJ + N + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + B + E + A, 1, H + Dl + Dm + BB + Oc + BF + N + C + B + J + A, 1, D + Fs + Cx + Ad + Qo + N + C + B + E + A, 1, D + Fs + Cx + Ad + MK + N + C + B + J + A, 1, H + Et + Eu + LT + NW + Rh + N + C + B + E + A, 1, H + Et + Eu + LT + NW + Z + N + C + B + J + A, 1, H + BH + Ev + Ib + EZ + a + N + C + B + E + A, 1, H + BH + Ev + Ib + EZ + DR + N + C + B + t + A, 1, H + Ew + Ex + Be + EZ + a + N + C + B + E + A, 1, H + Ew + Ex + Be + EZ + DR + N + C + B + t + A, 1, H + OK + Fa + BY + ET + a + N + C + B + E + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + J + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + E + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + J + A, 1, H + JT + Hl + GH + AJ + u + N + C + B + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + B + t + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + B + E + A, 1, H + PP + CZ + AK + AJ + KL + N + C + B + t + A, 1, H + PQ + Ca + p + AJ + AV + N + C + B + E + A, 1, H + PQ + Ca + p + AJ + KM + N + C + B + t + A, 1, H + MW + FB + BB + Ea + a + N + C + B + E + A, 1, H + MW + FB + BB + Ea + a + N + C + B + J + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + E + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + J + A, 1, D + EI + GE + Lb + BU + N + C + B + E + A, 1, D + EI + GE + Lb + JV + N + C + B + J + A, 1, H + FC + OD + Dr + CR + OE + N + C + B + E + A, 1, H + FC + OD + Dr + CR + OE + N + C + B + t + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + E + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + J + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + E + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + J + A, 1, H + FD + MX + BC + MQ + a + N + C + B + E + A, 1, H + FD + MX + BC + MQ + a + N + C + B + J + A, 1, H + FH + FI + Cb + Ag + EW + Fq + C + B + E + A, 1, H + FH + FI + Cb + Ag + CM + Fq + C + B + J + A, 1, DT + OM + RO + OX + CS + AV + Hh + C + B + E + A, 1, H + OM + RO + OX + CS + AV + Ju + C + B + E + A, 1, H + FE + MY + QV + Jr + h + AH + C + B + E + A, 1, H + FE + MY + QV + Jr + AE + CN + C + B + J + A, 1, H + FF + FG + Ds + CV + a + Cl + C + B + E + A, 1, H + FF + FG + Ds + CV + a + Gr + C + B + J + A, 1, H + CD + CE + Cc + CV + AI + Ju + C + B + E + A, 1, H + CD + CE + Cc + CV + BF + Nf + C + B + J + A, 1, H + FJ + FK + Dt + Ji + a + LV + C + B + E + A, 1, H + FJ + FK + Dt + Ji + a + Ne + C + B + J + A, 1, H + JF + CG + AQ + BI + O + Cl + C + B + E + A, 1, H + JF + CG + AQ + BI + Gd + RY + C + B + t + A, 1, H + JF + CG + AQ + BI + AG + NF + C + B + J + A, 1, H + AY + CF + Br + BI + O + AH + C + B + E + A, 1, H + AY + CF + Br + BI + Gd + Pw + C + B + t + A, 1, H + AY + CF + Br + BI + AG + GJ + C + B + J + A, 1, H + JG + CH + f + BI + O + Fq + C + B + E + A, 1, H + JG + CH + f + BI + Gd + RZ + C + B + t + A, 1, H + JG + CH + f + BI + AG + Fq + C + B + J + A, 1, D + Fp + LW + JA + O + N + C + B + E + A, 1, H + OF + FL + AA + GF + Bo + Cl + C + B + E + A, 1, H + OF + FL + AA + GF + Gs + Gr + C + B + J + A, 1, H + Az + Du + AB + GF + Bo + AH + C + B + E + A, 1, H + Az + Du + AB + GF + Gs + CN + C + B + J + A, 1, H + BH + OG + Ib + Cy + O + N + C + B + E + A, 1, H + BH + OG + Ib + Cy + AF + N + C + B + J + A, 1, H + FM + FN + Dv + AJ + O + N + C + B + E + A, 1, H + FM + FN + Dv + AJ + AF + N + C + B + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + E + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + E + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + E + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + J + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + E + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + J + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + E + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + J + A, 1, D + L + Bu + AP + YF + Sh + C + B + E + A, 1, D + CA + DJ + Ad + h + N + C + B + E + A, 1, D + CA + DK + Ad + u + EK + C + B + E + A, 1, D + CA + JB + Ad + a + N + C + B + E + A, 1, D + CA + DL + Ad + CX + EK + C + B + E + A, 1, I + Nq + C + B + E + A, 1, I + PL + C + B + E + A, 1, I + SK + C + B + E + A, 1, I + TV + C + B + E + A, 1, I + Xz + C + B + E + A, 1, I + TY + C + B + E + A, 1, I + RG + C + B + E + A, 1, I + Ro + C + B + E + A, 1, I + RH + C + B + E + A, 1, I + TW + C + B + E + A, 1, I + TX + C + B + E + A, 1, I + QE + C + B + E + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, D + ' +lat_0=-21.11666666666667 +lon_0=55.53333333333333 +k=1 +x_0=160000' + Rz + R + SJ + E + A, 1, H + OK + Fa + BY + ET + a + N + C + B + J + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + J + A, 1, D + CA + DJ + Ad + Gu + N + C + B + J + A, 1, D + CA + DK + Ad + Au + Ao + C + B + J + A, 1, D + CA + JB + Ad + a + N + C + B + J + A, 1, D + CA + DL + Ad + An + Ao + C + B + J + A, 1, H + OK + Fa + BY + ET + a + N + C + B + J + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + J + A, 1, D + CA + DJ + Ad + Gu + N + C + B + J + A, 1, D + CA + DK + Ad + Au + Ao + C + B + J + A, 1, D + CA + JB + Ad + a + N + C + B + J + A, 1, D + CA + DL + Ad + An + Ao + C + B + J + A, 1, I + QE + C + B + E + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + TY + C + B + E + A, 1, I + RG + C + B + E + A, 2, H + OK + Fa + BY + ET + a + N + C + B + J + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + J + A, 1, D + CA + DJ + Ad + Gu + N + C + B + J + A, 1, D + CA + DK + Ad + Au + Ao + C + B + J + A, 1, D + CA + JB + Ad + a + N + C + B + J + A, 1, D + CA + DL + Ad + An + Ao + C + B + J + A, 1, D + GV + KI + Jl + AG + N + C + B + J + A, 1, D + GV + KI + Jl + AG + N + C + B + J + A, 1, I + Io + C + B + E + A, 1, H + ' +lat_1=-54 +lat_2=-54.75 +lat_0=-55 +lon_0=-37' + s + N + S + E + A, 1, D + ' +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1' + s + N + C + B + E + A, 1, D + Za + Si + ' +k=1' + u + CO + C + B + E + A, 1, D + L + YE + V + O + N + C + B + E + A, 1, H + ' +lat_1=45.91666666666666 +lat_2=43.08333333333334' + L + YE + s + N + C + B + E + A, 1, I + KC + C + B + E + A, 1, I + NR + C + B + E + A, 1, I + Gz + i + TQ + E + A, 1, D + ' +lat_0=32 +lon_0=-64.75 +k=1 +x_0=550000' + EK + j + B + E + A, 1, D + L + KK + V + s + N + X + E + A, 1, D + L + Jb + V + s + N + X + E + A, 1, D + L + Lj + V + s + N + X + E + A, 2, D + L + KK + V + s + N + C + B + E + A, 1, D + L + Jb + V + s + N + C + B + E + A, 1, D + L + Lj + V + s + N + C + B + E + A, 2, D + L + KK + V + s + N + C + B + E + A, 1, D + L + Jb + V + s + N + C + B + E + A, 1, D + L + Lj + V + s + N + C + B + E + A, 2, D + ' +lat_0=-25.06855261111111 +lon_0=-130.1129671111111 +k=1 +x_0=14200 +y_0=15500' + j + B + E + A, 1, I + TX + o + R + Ta + E + A, 4, D + L + ZW + ' +k=1' + Bo + Ak + C + B + E + A, 1, D + L + ' +lon_0=169 +k=1' + Bo + Ak + C + B + E + A, 1, D + L + ' +lon_0=179 +k=1' + Bo + Ak + C + B + E + A, 1, D + L + ' +lon_0=-178 +k=1' + Bo + Ak + C + B + E + A, 2, D + L + Si + ' +k=1' + Bo + Ak + C + B + E + A, 1, D + L + Gj + V + O + EO + C + B + E + A, 1, H + ' +lat_1=23 +lat_2=21.7 +lat_0=22.35' + CR + O + ' +y_0=280296.016' + X + E + A, 1, H + ' +lat_1=21.3 +lat_2=20.13333333333333 +lat_0=20.71666666666667 +lon_0=-76.83333333333333' + O + ' +y_0=229126.939' + X + E + A, 1, H + Yv + Nh + IZ + ' +lon_0=-70' + CX + N + X + E + A, 1, H + Yv + Nh + IZ + ' +lon_0=-70' + CX + N + C + B + E + A, 1, H + Yv + Nh + IZ + ' +lon_0=-70' + CX + N + C + B + E + A, 1, D + L + Mt + V + s + N + X + E + A, 1, D + L + Mt + V + s + N + C + B + E + A, 1, D + L + Mt + V + s + N + C + B + E + A, 10, H + Ks + Kt + ' +lat_0=50.797815' + WH + ' +x_0=649328 +y_0=665262' + C + B + E + A, 2, D + Li + Sj + Tn + O + Pm + C + B + E + A, 1, D + Li + Sj + Tn + O + Pm + C + B + E + A, 1, D + Li + Sj + Tn + O + Pm + C + B + E + A, 3, K + Y + ' +towgs84=595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408' + A, 2, K + x + A, 3, K + C + B + A, 1, D + L + ZU + V + Bv + N + C + B + E + A, 1, D + L + ZV + V + Bv + N + C + B + E + A, 1, D + L + ZU + V + Bv + N + x + E + A, 1, D + L + ZV + V + Bv + N + x + E + A, 1, I + Mg + R + Rq + E + A, 3, JU + Oe + ' +k=1' + s + N + S + E + A, 1, D + L + KB + ' +k=1' + Ci + N + M + b + E + A, 1, D + L + KB + ' +k=1' + Ci + N + M + Ar + E + A, 1, D + L + Gj + ' +k=1' + Bo + N + M + Ar + E + A, 1, D + L + Gl + ' +k=1' + DP + N + M + Ar + E + A, 1, D + L + KB + ' +k=1' + Bo + N + M + b + E + A, 1, D + L + IH + ' +k=1' + DP + N + M + b + E + A, 1, D + L + HO + ' +k=1' + MT + N + M + b + E + A, 1, D + L + Ia + ' +k=1' + LY + N + M + b + E + A, 1, D + L + QR + ' +k=1' + Jt + N + M + Ar + E + A, 3, GU + ' +lat_0=46' + RJ + Rv + O + Ae + M + b + E + A, 1, D + L + ' +lon_0=11.30625 +k=1.000006 +x_0=1500025.141 +y_0=-667.282' + C + B + E + A, 1, D + L + ' +lon_0=13.55626666666667 +k=1.0000058 +x_0=1500044.695 +y_0=-667.13' + C + B + E + A, 1, D + L + ' +lon_0=15.80628452944445 +k=1.00000561024 +x_0=1500064.274 +y_0=-667.711' + C + B + E + A, 1, D + L + ' +lon_0=18.0563 +k=1.0000054 +x_0=1500083.521 +y_0=-668.8440000000001' + C + B + E + A, 1, D + L + ' +lon_0=20.30631666666667 +k=1.0000052 +x_0=1500102.765 +y_0=-670.706' + C + B + E + A, 1, D + L + ' +lon_0=22.55633333333333 +k=1.0000049 +x_0=1500121.846 +y_0=-672.557' + C + B + E + A, 1, H + ' +lat_1=-37.5 +lat_2=-44.5 +lat_0=-41 +lon_0=173' + aH + ' +y_0=7000000' + C + B + E + A, 1, H + Ai + Aj + m + ' +lon_0=157' + O + N + C + B + E + A, 2, D + L + ' +lon_0=18.05787 +k=0.99999506 +x_0=100182.7406 +y_0=-6500620.1207' + C + B + E + A, 3, JU + ' +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0' + N + ' +k=1.0' + E + ' +nadgrids=@null +wktext ' + A, 16, D + L + RI + ' +k=1' + Ht + N + C + B + E + A, 1, D + L + UI + ' +k=1' + HV + N + C + B + E + A, 1, D + L + Gl + ' +k=1' + Hw + N + C + B + E + A, 1, D + L + Yx + ' +k=1' + HW + N + C + B + E + A, 1, D + L + SP + ' +k=1' + Hx + N + C + B + E + A, 1, D + L + II + ' +k=1' + La + N + C + B + E + A, 1, D + L + RJ + ' +k=1' + Hy + N + C + B + E + A, 1, D + L + UJ + ' +k=1' + Hz + N + C + B + E + A, 1, D + L + HO + ' +k=1' + IA + N + C + B + E + A, 1, D + L + RP + ' +k=1' + IB + N + C + B + E + A, 1, D + L + ' +lon_0=29 +k=1' + Gx + N + C + B + E + A, 1, D + L + Ia + ' +k=1' + IT + N + C + B + E + A, 1, D + L + QQ + ' +k=1' + Gc + N + C + B + E + A, 4, K + C + B + A, 1, I + KD + C + B + E + A, 1, I + JZ + C + B + E + A, 1, I + JM + C + B + E + A, 1, D + WJ + ' +lon_0=46.5 +k=0.9994' + CX + N + R + n + E + A, 13, K + Y + Aw + A, 6, D + L + Gj + V + O + EO + Y + Aw + E + A, 8, I + Gz + i + Je + E + A, 22, H + ' +lat_1=41.25 +lat_2=42.75' + PR + Or + Jv + Tj + C + B + E + A, 1, H + ' +lat_1=42.25 +lat_2=43.75' + Nj + Or + Jv + ' +y_0=2200000' + C + B + E + A, 1, H + ' +lat_1=43.25 +lat_2=44.75' + IZ + Or + Jv + ' +y_0=3200000' + C + B + E + A, 1, H + ' +lat_1=44.25 +lat_2=45.75' + IP + Or + Jv + ' +y_0=4200000' + C + B + E + A, 1, H + ' +lat_1=45.25 +lat_2=46.75 +lat_0=46' + Or + Jv + ' +y_0=5200000' + C + B + E + A, 1, H + aI + ' +lat_2=47.75' + Ib + Or + Jv + ' +y_0=6200000' + C + B + E + A, 1, H + ' +lat_1=47.25 +lat_2=48.75 +lat_0=48' + Or + Jv + ' +y_0=7200000' + C + B + E + A, 1, H + ' +lat_1=48.25 +lat_2=49.75 +lat_0=49' + Or + Jv + ' +y_0=8200000' + C + B + E + A, 1, H + ' +lat_1=49.25 +lat_2=50.75' + Yu + Or + Jv + ' +y_0=9200000' + C + B + E + A, 18, H + ' +lat_1=37' + YS + GM + Ga + s + N + C + B + E + A, 1, H + ' +lat_1=37' + YS + GM + Ga + s + N + C + B + E + A, 1, H + ' +lat_1=37' + YS + GM + Ga + s + N + C + B + E + A, 6, BP + m + ' +lat_ts=-70' + HN + ' +k=1' + s + N + S + E + A, 2, H + LM + IJ + ' +lat_0=49 +lon_0=-95' + s + N + C + B + E + A, 1, H + LM + IJ + ' +lat_0=49 +lon_0=-95' + s + N + C + B + E + A, 7, D + ZA + Ia + ' +k=1' + h + Ae + i + CW + E + A, 1, D + ZA + RP + ' +k=1' + h + Ae + i + CW + E + A, 1, D + ZA + UJ + ' +k=1' + h + Ae + i + CW + E + A, 1, D + ZA + II + ' +k=1' + h + Ae + i + CW + E + A, 2, H + GW + GX + GY + GA + e + N + i + Je + J + A, 1, H + GW + GX + GY + GA + e + Pv + i + Je + J + A, 2, JU + ' +lon_0=100 +lat_ts=-41' + s + N + S + E + A, 1, BP + Hr + ' +lat_ts=71' + HN + ' +k=1' + s + N + S + E + A, 1, BP + Hr + ' +lat_ts=75' + HN + ' +k=1' + s + N + S + E + A, 1, D + L + ' +lon_0=55.33333333333334 +k=1' + O + N + S + E + A, 4, K + PV + A, 1, K + Ok + A, 1, K + x + A, 1, K + Y + A, 1, K + Hn + EL + A, 1, K + HB + A, 1, K + Ee + Ef + A, 1, K + i + A, 2, K + Nc + Nd + A, 1, K + AU + BN + A, 1, K + c + A, 1, K + Bc + BS + A, 1, K + AU + ' +b=6356514.996941779' + A, 1, K + By + Ay + A, 1, K + Lo + A, 2, K + GL + Bz + A, 1, K + C + A, 1, K + Gn + A, 1, K + IR + Bh + A, 1, K + R + A, 1, K + C + B + A, 0, K + C + B + A, 1, K + M + A, 1, K + aJ + A, 1, D + L + ' +lon_0=28.4 +k=0.9999400000000001' + h + EO + C + B + E + A, 1, K + ' +a=6376523' + RA + A, 1, K + Zx + Qy + A, 1, K + Qj + Ho + A, 1, K + j + A, 1, K + j + A, 1, K + ' +a=6378136.2 +b=6356751.516927429' + A, 1, K + ' +a=6378136.3 +b=6356751.616592146' + A, 1, K + RB + RC + A, 2, K + aK + A, 1, I + Ki + S + E + A, 1, I + Mf + S + E + A, 3, K + Pd + Gq + A, 1, K + HK + Gv + A, 1, K + T + A, 1, K + Lp + Hp + A, 1, K + Go + CT + A, 1, K + C + B + A, 1, K + ' +a=6371007 +b=6371007' + A, 1, D + L + IH + V + O + Ak + C + B + E + A, 1, D + L + ' +lon_0=14' + V + O + Ak + C + B + E + A, 1, D + L + ' +lon_0=16' + V + O + Ak + C + B + E + A, 1, D + L + QR + V + O + Ak + C + B + E + A, 1, K + ' +a=6370997 +b=6370997' + A, 1, K + ZX + ZY + A, 1, K + ZZ + Ri + A, 2, D + L + UI + V + O + Ak + C + B + E + A, 1, D + L + Yx + V + O + Ak + C + B + E + A, 1, D + L + II + V + O + Ak + C + B + E + A, 1, D + L + UJ + V + O + Ak + C + B + E + A, 1, D + L + RP + V + O + Ak + C + B + E + A, 1, I + KC + o + C + B + E + A, 1, I + NR + o + C + B + E + A, 1, I + Ki + o + C + B + E + A, 8, I + MB + o + R + TF + E + A, 4, K + C + B + A, 6, K + C + B + A, 1, I + SL + C + B + E + A, 1, I + Ja + C + B + E + A, 4, '+proj=eqc +lat_ts=0' + L + HN + s + N + S + E + A, 1, '+proj=eqc +lat_ts=0' + L + HN + s + N + ' +a=6371007 +b=6371007' + E + A, 5, D + L + KB + JE + h + EO + C + B + E + A, 1, D + L + Lu + JE + u + EO + C + B + E + A, 1, D + L + ' +lon_0=11.75' + JE + a + EO + C + B + E + A, 1, D + L + Gj + ' +k=1' + CX + EO + C + B + E + A, 24, K + Y + A, 1, K + C + Qb + A, 1, K + Pd + Gq + A, 1, K + R + At + A, 1, K + Y + BW + A, 3, K + i + HF + A, 1, K + i + A, 1, K + i + A, 1, K + j + KR + A, 1, K + By + Ay + JP + A, 1, K + c + QC + A, 1, K + C + Lw + A, 1, K + c + Gg + A, 1, K + i + GB + A, 1, K + i + A, 1, K + i + A, 1, K + i + A, 1, K + i + Je + A, 2, K + C + UC + A, 1, K + c + JO + A, 1, K + c + IE + A, 1, K + By + Ay + JQ + A, 1, K + Lp + Hp + GQ + A, 1, K + Go + CT + BT + A, 1, K + M + HG + A, 1, K + j + B + A, 1, K + Y + Gf + A, 1, K + Y + Py + A, 1, K + C + B + A, 1, K + C + B + A, 1, K + R + Pz + A, 1, K + R + Gy + A, 1, K + AU + BN + Nm + A, 1, K + Y + Gh + A, 1, K + Ee + Ef + A, 1, K + R + QA + A, 1, K + R + v + A, 1, K + R + A, 1, K + R + SD + A, 1, K + Y + A, 1, K + j + B + A, 1, K + M + NK + A, 1, K + R + TM + A, 1, K + j + B + A, 1, K + C + B + A, 1, K + Qj + Ho + NI + A, 1, K + i + TC + A, 1, K + C + B + A, 1, K + C + B + A, 2, K + C + B + A, 1, K + Qj + Ho + A, 1, K + c + OW + A, 1, K + C + B + A, 2, K + M + Ar + A, 1, K + M + b + A, 1, K + C + B + A, 1, K + R + Jx + A, 1, K + R + Sw + A, 1, K + R + Sx + A, 1, K + R + TN + A, 4, K + PV + Bb + A, 1, K + C + B + A, 1, K + C + B + A, 1, K + M + A, 1, K + R + Qe + A, 1, K + AU + BN + RD + A, 1, K + R + NG + A, 1, K + R + ' +towgs84=105,326,-102.5,0,0,0.814,-0.6' + A, 1, K + R + ' +towgs84=-45,417,-3.5,0,0,0.814,-0.6' + A, 1, K + c + A, 1, K + c + A, 1, K + R + A, 1, K + M + G + A, 1, K + c + HX + A, 1, K + x + r + A, 1, K + x + CB + A, 1, K + R + Cm + A, 1, K + M + NL + A, 1, K + AU + BN + A, 1, K + R + EV + A, 1, K + R + Ec + A, 1, K + Bc + BS + In + A, 1, K + c + ER + A, 1, K + Y + Cj + A, 1, K + c + Jw + A, 1, K + AU + BN + Sy + A, 1, K + M + U + A, 1, K + R + A, 1, K + i + TQ + A, 1, D + L + Lf + AP + k + N + C + B + J + A, 0, D + L + Lf + AP + k + N + C + B + J + A, 1, K + R + ES + A, 1, K + Y + ' +towgs84=-384,664,-48,0,0,0,0' + A, 1, K + c + GO + A, 1, K + R + Bs + A, 1, K + Bc + BS + Ax + A, 1, K + AU + BN + Gi + A, 1, K + R + TF + A, 1, K + R + GR + A, 2, K + AU + BN + HI + A, 2, K + Gn + HY + A, 1, K + R + n + A, 1, K + R + ' +towgs84=-83.11,-97.38,-117.22,0.00569291,-0.0446976,0.0442851,0.1218' + A, 1, K + c + NM + A, 4, K + R + Rq + A, 1, K + aK + RE + A, 1, K + IR + Bh + Av + A, 1, K + By + Ay + JR + A, 1, K + By + Ay + NN + A, 1, K + RB + RC + A, 1, K + i + TG + A, 1, K + HK + Gv + A, 1, K + By + Ay + Tb + A, 1, K + GL + Bz + BV + A, 1, K + c + Qh + A, 1, K + R + Hc + A, 1, K + R + AX + A, 1, K + R + A, 1, K + c + TR + A, 1, K + c + ' +towgs84=-90,40,88,0,0,0,0' + A, 1, K + AU + BN + A, 1, K + i + GC + A, 1, K + R + OV + A, 1, K + R + ' +towgs84=-333,-222,114,0,0,0,0' + A, 1, K + c + ' +towgs84=41,-220,-134,0,0,0,0' + A, 1, K + Y + HZ + A, 1, K + C + B + A, 1, K + R + Qd + A, 2, K + AU + BN + IO + A, 1, K + Y + Tc + A, 1, K + c + GS + A, 2, K + R + CK + A, 1, K + AU + BN + NO + A, 1, K + X + A, 2, K + C + B + A, 1, K + c + DO + A, 1, K + R + TS + A, 1, K + R + W + A, 1, K + Hn + EL + Aa + A, 1, K + R + JL + A, 1, K + AU + BN + Bk + A, 1, K + aJ + A, 1, K + PV + Lx + A, 1, K + PV + A, 1, K + PV + A, 1, K + Y + A, 1, K + Nc + Nd + DS + A, 1, K + AU + BN + TH + A, 1, K + C + B + A, 1, K + M + F + A, 1, K + R + QO + A, 1, K + Gn + A, 2, K + R + A, 1, K + Y + Fv + A, 3, K + R + Nn + A, 1, K + HB + Bt + A, 2, K + Y + A, 2, K + R + HD + A, 1, K + Lo + GD + A, 1, K + Ok + Bb + A, 1, K + Ok + Bb + A, 1, K + Y + g + A, 1, K + Ee + Ef + JK + A, 1, K + Gn + A, 1, K + AU + BN + JC + A, 2, K + Y + A, 1, K + c + Af + A, 1, K + Y + A, 1, K + R + ' +towgs84=-155,171,37,0,0,0,0' + A, 1, K + AU + BN + A, 1, K + R + HE + A, 1, K + Y + z + A, 1, K + R + GP + A, 1, K + Y + AC + A, 1, K + AU + BN + No + A, 1, K + R + QP + A, 2, K + j + MR + A, 1, K + C + Rr + A, 3, K + T + P + A, 2, K + T + Q + A, 2, K + S + A, 64, Ck + ' +lat_0=2.042583333333333 +lon_0=103.5627583333333' + s + N + GL + Bz + BV + E + A, 1, Ck + ' +lat_0=2.712283333333334 +lon_0=101.9411666666667 +x_0=-242.005 +y_0=-948.547' + GL + Bz + BV + E + A, 1, Ck + ' +lat_0=3.710972222222222 +lon_0=102.4361777777778' + s + N + GL + Bz + BV + E + A, 1, Ck + ' +lat_0=3.680344444444444 +lon_0=101.5082444444444 +x_0=-21759.438 +y_0=55960.906' + GL + Bz + BV + E + A, 1, Ck + ' +lat_0=4.946141666666667 +lon_0=102.8952083333333' + s + N + GL + Bz + BV + E + A, 1, Ck + ' +lat_0=5.421325 +lon_0=100.3458694444444' + s + N + GL + Bz + BV + E + A, 1, Ck + ' +lat_0=5.965147222222223 +lon_0=100.6375944444444' + s + N + GL + Bz + BV + E + A, 1, Ck + ' +lat_0=4.859380555555555 +lon_0=100.8167666666667' + s + ' +y_0=133453.669' + GL + Bz + BV + E + A, 1, Ck + ' +lat_0=5.893922222222222 +lon_0=102.1772916666667' + s + N + GL + Bz + BV + E + A, 1, D + L + Lf + AP + k + N + X + J + A, 1, D + L + KG + AP + k + N + X + J + A, 1, D + L + KH + AP + k + N + X + J + A, 1, D + L + Lh + AP + k + N + X + J + A, 1, D + L + SX + AP + k + N + X + J + A, 1, D + L + ' +lon_0=-159' + AP + k + N + X + J + A, 0, D + L + ' +lon_0=-159' + AP + k + N + X + J + A, 1, D + L + YJ + AP + k + N + X + J + A, 1, D + L + Qr + AP + k + N + X + J + A, 1, D + L + ' +lon_0=-141' + AP + k + N + X + J + A, 1, D + L + YK + AP + k + N + X + J + A, 1, D + L + YT + AP + k + N + X + J + A, 1, D + L + ' +lon_0=-123' + AP + k + N + X + J + A, 1, D + L + Lj + AP + k + N + X + J + A, 1, D + L + KK + AP + k + N + X + J + A, 1, D + L + ' +lon_0=-105' + AP + k + N + X + J + A, 1, D + ' +lat_0=13.5 +lon_0=144.75 +k=1' + BU + IK + C + B + E + A, 1, H + ' +lat_1=-6.5 +lat_2=-11.5' + ZA + UJ + O + Ae + i + CW + E + A, 2, D + L + Gl + ' +k=1' + IM + N + M + Ar + E + A, 1, D + L + UR + AP + k + N + X + J + A, 1, D + L + MP + AP + k + N + X + J + A, 1, D + L + KG + AP + k + N + C + B + J + A, 1, D + L + KH + AP + k + N + C + B + J + A, 1, D + L + Lh + AP + k + N + C + B + J + A, 1, D + L + SX + AP + k + N + C + B + J + A, 1, D + L + ' +lon_0=-159' + AP + k + N + C + B + J + A, 1, D + L + YJ + AP + k + N + C + B + J + A, 1, D + L + Qr + AP + k + N + C + B + J + A, 1, D + L + ' +lon_0=-141' + AP + k + N + C + B + J + A, 1, D + L + YK + AP + k + N + C + B + J + A, 1, D + L + YT + AP + k + N + C + B + J + A, 1, D + L + ' +lon_0=-123' + AP + k + N + C + B + J + A, 1, D + L + Lj + AP + k + N + C + B + J + A, 1, D + L + KK + AP + k + N + C + B + J + A, 1, D + L + ' +lon_0=-105' + AP + k + N + C + B + J + A, 1, D + L + II + ' +k=1' + MS + N + M + Ar + E + A, 3, H + GW + GX + GY + GA + h + IK + C + B + E + A, 1, D + L + UR + AP + k + N + C + B + J + A, 1, D + L + MP + AP + k + N + C + B + J + A, 16, H + Dp + Dq + y + Ea + Z + N + X + J + A, 1, H + Dl + Dm + CA + Oc + Z + Pv + X + J + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + J + A, 5, H + ' +lat_1=-18' + ZT + ' +lat_0=-27' + Il + s + N + S + E + A, 1, K + C + B + A, 4, I + ID + C + B + E + A, 3, K + C + B + A, 1, I + JZ + o + C + B + E + A, 4, K + R + PJ + A, 8, K + C + B + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, K + C + A, 1, D + L + HP + ' +k=1' + HU + N + C + E + A, 1, D + L + HQ + ' +k=1' + Gw + N + C + E + A, 1, D + L + Hd + ' +k=1' + Hu + N + C + E + A, 1, D + L + HR + ' +k=1' + Hv + N + C + E + A, 1, D + L + HS + ' +k=1' + It + N + C + E + A, 1, D + L + EN + ' +k=1' + Hs + N + C + E + A, 1, D + L + Fy + ' +k=1' + Ht + N + C + E + A, 1, D + L + Fm + ' +k=1' + HV + N + C + E + A, 1, D + L + Fr + ' +k=1' + Hw + N + C + E + A, 1, D + L + Ed + ' +k=1' + HW + N + C + E + A, 1, D + L + Fn + ' +k=1' + Hx + N + C + E + A, 1, D + L + HP + ' +k=1' + O + N + C + E + A, 1, D + L + HQ + ' +k=1' + O + N + C + E + A, 1, D + L + Hd + ' +k=1' + O + N + C + E + A, 1, D + L + HR + ' +k=1' + O + N + C + E + A, 1, D + L + HS + ' +k=1' + O + N + C + E + A, 1, D + L + EN + ' +k=1' + O + N + C + E + A, 1, D + L + Fy + ' +k=1' + O + N + C + E + A, 1, D + L + Fm + ' +k=1' + O + N + C + E + A, 1, D + L + Fr + ' +k=1' + O + N + C + E + A, 1, D + L + Ed + ' +k=1' + O + N + C + E + A, 1, D + L + Fn + ' +k=1' + O + N + C + E + A, 1, D + L + HP + ' +k=1' + Hy + N + C + E + A, 1, D + L + Lt + ' +k=1' + Hz + N + C + E + A, 1, D + L + HQ + ' +k=1' + IA + N + C + E + A, 1, D + L + Ni + ' +k=1' + IB + N + C + E + A, 1, D + L + Hd + ' +k=1' + Gx + N + C + E + A, 1, D + L + Hq + ' +k=1' + IT + N + C + E + A, 1, D + L + HR + ' +k=1' + Gc + N + C + E + A, 1, D + L + Mj + ' +k=1' + IU + N + C + E + A, 1, D + L + HS + ' +k=1' + Iu + N + C + E + A, 1, D + L + Jj + ' +k=1' + Mu + N + C + E + A, 1, D + L + EN + ' +k=1' + Mv + N + C + E + A, 1, D + L + Le + ' +k=1' + Mw + N + C + E + A, 1, D + L + Fy + ' +k=1' + Mx + N + C + E + A, 1, D + L + Im + ' +k=1' + My + N + C + E + A, 1, D + L + Fm + ' +k=1' + Mz + N + C + E + A, 1, D + L + KF + ' +k=1' + NA + N + C + E + A, 1, D + L + Fr + ' +k=1' + NB + N + C + E + A, 1, D + L + Jk + ' +k=1' + Oh + N + C + E + A, 1, D + L + Ed + ' +k=1' + NC + N + C + E + A, 1, D + L + Il + ' +k=1' + Oi + N + C + E + A, 1, D + L + Fn + ' +k=1' + ND + N + C + E + A, 1, D + L + HP + ' +k=1' + O + N + C + E + A, 1, D + L + Lt + ' +k=1' + O + N + C + E + A, 1, D + L + HQ + ' +k=1' + O + N + C + E + A, 1, D + L + Ni + ' +k=1' + O + N + C + E + A, 1, D + L + Hd + ' +k=1' + O + N + C + E + A, 1, D + L + Hq + ' +k=1' + O + N + C + E + A, 1, D + L + HR + ' +k=1' + O + N + C + E + A, 1, D + L + Mj + ' +k=1' + O + N + C + E + A, 1, D + L + HS + ' +k=1' + O + N + C + E + A, 1, D + L + Jj + ' +k=1' + O + N + C + E + A, 1, D + L + EN + ' +k=1' + O + N + C + E + A, 1, D + L + Le + ' +k=1' + O + N + C + E + A, 1, D + L + Fy + ' +k=1' + O + N + C + E + A, 1, D + L + Im + ' +k=1' + O + N + C + E + A, 1, D + L + Fm + ' +k=1' + O + N + C + E + A, 1, D + L + KF + ' +k=1' + O + N + C + E + A, 1, D + L + Fr + ' +k=1' + O + N + C + E + A, 1, D + L + Jk + ' +k=1' + O + N + C + E + A, 1, D + L + Ed + ' +k=1' + O + N + C + E + A, 1, D + L + Il + ' +k=1' + O + N + C + E + A, 1, D + L + Fn + ' +k=1' + O + N + C + E + A, 1, K + M + A, 3, K + C + B + A, 1, I + Gz + C + B + E + A, 9, D + L + HP + ' +k=1' + HU + N + M + E + A, 1, D + L + HQ + ' +k=1' + Gw + N + M + E + A, 1, D + L + Hd + ' +k=1' + Hu + N + M + E + A, 1, D + L + HR + ' +k=1' + Hv + N + M + E + A, 1, D + L + HS + ' +k=1' + It + N + M + E + A, 1, D + L + EN + ' +k=1' + Hs + N + M + E + A, 1, D + L + Fy + ' +k=1' + Ht + N + M + E + A, 1, D + L + Fm + ' +k=1' + HV + N + M + E + A, 1, D + L + Fr + ' +k=1' + Hw + N + M + E + A, 1, D + L + Ed + ' +k=1' + HW + N + M + E + A, 1, D + L + Fn + ' +k=1' + Hx + N + M + E + A, 1, D + L + HP + ' +k=1' + O + N + M + E + A, 1, D + L + HQ + ' +k=1' + O + N + M + E + A, 1, D + L + Hd + ' +k=1' + O + N + M + E + A, 1, D + L + HR + ' +k=1' + O + N + M + E + A, 1, D + L + HS + ' +k=1' + O + N + M + E + A, 1, D + L + EN + ' +k=1' + O + N + M + E + A, 1, D + L + Fy + ' +k=1' + O + N + M + E + A, 1, D + L + Fm + ' +k=1' + O + N + M + E + A, 1, D + L + Fr + ' +k=1' + O + N + M + E + A, 1, D + L + Ed + ' +k=1' + O + N + M + E + A, 1, D + L + Fn + ' +k=1' + O + N + M + E + A, 11, K + c + A, 1, K + c + TI + A, 1, K + c + TJ + A, 1, K + c + TK + A, 1, K + c + TL + A, 1, K + c + UB + A, 1, K + c + Sv + A, 1, K + c + Ps + A, 1, K + i + A, 1, K + i + A, 1, K + As + d + A, 1, K + R + Jg + A, 1, K + C + B + A, 1, K + Y + Hf + A, 1, K + R + Jy + A, 1, K + R + SE + A, 1, K + R + Sz + A, 1, K + C + B + A, 1, K + x + Al + A, 1, K + C + B + A, 1, K + c + ' +towgs84=-106,-129,165,0,0,0,0' + A, 1, K + R + TA + A, 1, K + R + SF + A, 1, K + R + NH + A, 1, K + C + B + A, 1, K + R + TO + A, 1, K + R + SJ + A, 1, K + C + B + A, 1, K + R + TP + A, 1, K + R + Lr + A, 1, K + R + UD + A, 2, K + R + SG + A, 1, K + R + QM + A, 3, K + R + ' +towgs84=365,194,166,0,0,0,0' + A, 1, K + R + ' +towgs84=325,154,172,0,0,0,0' + A, 1, K + i + TZ + A, 1, K + R + SH + A, 2, K + R + Jf + A, 1, K + R + TB + A, 1, K + R + Ke + A, 1, K + R + HH + A, 2, K + R + SI + A, 1, D + L + KB + AP + IU + N + C + B + E + A, 5, D + L + HP + ' +k=1' + Hy + N + M + E + A, 1, D + L + Lt + ' +k=1' + Hz + N + M + E + A, 1, D + L + HQ + ' +k=1' + IA + N + M + E + A, 1, D + L + Ni + ' +k=1' + IB + N + M + E + A, 1, D + L + Hd + ' +k=1' + Gx + N + M + E + A, 1, K + ' +a=6377019.27 +b=6355762.5391 +towgs84=-28,199,5,0,0,0,0' + A, 1, K + R + Jd + A, 1, K + C + B + A, 1, K + R + Jz + A, 1, K + C + B + A, 1, K + R + Qc + A, 1, K + R + PI + A, 1, K + R + Pt + A, 1, K + R + Pa + A, 1, K + Y + Pb + A, 1, K + j + B + A, 1, K + R + ' +towgs84=-86,-98,-119,0,0,0,0' + A, 1, K + C + B + A, 1, K + j + B + A, 1, K + AU + BN + A, 1, K + R + TT + A, 1, K + R + Np + A, 1, K + C + B + A, 1, K + i + ' +towgs84=-100,-248,259,0,0,0,0' + A, 1, K + M + A, 1, K + M + A, 1, K + M + ' +towgs84=44.585,-131.212,-39.544,0,0,0,0' + A, 1, K + c + ' +towgs84=-80.01,253.26,291.19,0,0,0,0' + A, 1, K + c + ' +towgs84=124.5,-63.5,-281,0,0,0,0' + A, 2, K + By + Ay + RF + A, 1, K + i + BX + A, 1, K + R + ' +towgs84=-133,-321,50,0,0,0,0' + A, 2, K + C + B + A, 1, K + C + Bm + A, 1, K + R + Kc + A, 1, K + R + Lq + A, 1, K + R + Kg + A, 1, K + R + Kh + A, 1, K + R + QN + A, 1, K + j + TD + A, 1, K + j + B + A, 1, K + i + CW + A, 1, K + c + A, 1, K + c + A, 1, K + R + TE + A, 1, K + c + Qf + A, 1, K + c + A, 1, K + c + GN + A, 1, K + C + B + A, 1, K + c + A, 1, K + R + A, 1, K + R + A, 1, K + Gn + Qg + A, 1, K + R + ' +towgs84=114,-116,-333,0,0,0,0' + A, 1, K + x + ' +towgs84=-491,-22,435,0,0,0,0' + A, 1, K + R + ' +towgs84=145,75,-272,0,0,0,0' + A, 1, K + R + ' +towgs84=-320,550,-494,0,0,0,0' + A, 1, K + R + ' +towgs84=124,-234,-25,0,0,0,0' + A, 1, K + R + ' +towgs84=-205,107,53,0,0,0,0' + A, 1, K + c + ' +towgs84=-79,-129,145,0,0,0,0' + A, 1, K + R + ' +towgs84=-127,-769,472,0,0,0,0' + A, 1, K + R + ' +towgs84=-104,-129,239,0,0,0,0' + A, 1, K + R + ' +towgs84=298,-304,-375,0,0,0,0' + A, 1, K + i + ' +towgs84=-2,151,181,0,0,0,0' + A, 1, K + R + ' +towgs84=230,-199,-752,0,0,0,0' + A, 1, K + R + ' +towgs84=211,147,111,0,0,0,0' + A, 1, K + T + P + A, 1, K + R + JD + A, 1, K + R + ' +towgs84=-794,119,-298,0,0,0,0' + A, 1, K + i + Lg + A, 1, K + R + ' +towgs84=208,-435,-229,0,0,0,0' + A, 1, K + R + ' +towgs84=189,-79,-202,0,0,0,0' + A, 1, K + i + Ly + A, 1, K + R + ' +towgs84=403,-81,277,0,0,0,0' + A, 1, K + R + ' +towgs84=-307,-92,127,0,0,0,0' + A, 1, K + R + Ta + A, 1, K + R + ' +towgs84=170,42,84,0,0,0,0' + A, 2, K + ' +a=6378270 +b=6356794.343434343 +towgs84=102,52,-38,0,0,0,0' + A, 1, K + R + ' +towgs84=276,-57,149,0,0,0,0' + A, 1, K + R + ' +towgs84=-632,438,-609,0,0,0,0' + A, 1, K + R + ' +towgs84=647,1777,-1124,0,0,0,0' + A, 1, K + c + ' +towgs84=260,12,-147,0,0,0,0' + A, 1, K + C + B + A, 1, K + Ee + Ef + A, 1, K + R + ' +towgs84=-156,-271,-189,0,0,0,0' + A, 1, K + ' +a=6378136 +b=6356751.361745712 +towgs84=0,0,1.5,-0,-0,0.076,0' + A, 1, K + R + A, 1, K + C + A, 1, K + c + EU + A, 1, K + c + A, 1, K + Y + A, 1, K + Y + A, 1, K + C + B + A, 1, K + UW + Ym + Nl + A, 1, K + C + B + A, 1, K + j + QB + A, 1, K + Yn + Qz + A, 1, K + UW + Ym + Nl + A, 1, K + R + A, 1, K + R + w + A, 1, K + j + B + A, 1, K + j + Fu + A, 1, K + j + A, 1, K + j + B + A, 1, K + C + B + A, 1, K + aJ + A, 1, K + C + B + A, 1, K + j + B + A, 1, K + j + B + A, 1, K + C + B + A, 1, K + C + B + A, 1, D + L + Hq + ' +k=1' + IT + N + M + E + A, 1, D + L + HR + ' +k=1' + Gc + N + M + E + A, 1, D + L + Mj + ' +k=1' + IU + N + M + E + A, 1, D + L + HS + ' +k=1' + Iu + N + M + E + A, 1, D + L + Jj + ' +k=1' + Mu + N + M + E + A, 1, D + L + EN + ' +k=1' + Mv + N + M + E + A, 1, D + L + Le + ' +k=1' + Mw + N + M + E + A, 1, D + L + Fy + ' +k=1' + Mx + N + M + E + A, 1, D + L + Im + ' +k=1' + My + N + M + E + A, 1, D + L + Fm + ' +k=1' + Mz + N + M + E + A, 1, D + L + KF + ' +k=1' + NA + N + M + E + A, 1, D + L + Fr + ' +k=1' + NB + N + M + E + A, 1, D + L + Jk + ' +k=1' + Oh + N + M + E + A, 1, D + L + Ed + ' +k=1' + NC + N + M + E + A, 1, D + L + Il + ' +k=1' + Oi + N + M + E + A, 1, D + L + Fn + ' +k=1' + ND + N + M + E + A, 1, D + L + HP + ' +k=1' + O + N + M + E + A, 1, D + L + Lt + ' +k=1' + O + N + M + E + A, 1, D + L + HQ + ' +k=1' + O + N + M + E + A, 1, D + L + Ni + ' +k=1' + O + N + M + E + A, 1, D + L + Hd + ' +k=1' + O + N + M + E + A, 1, D + L + Hq + ' +k=1' + O + N + M + E + A, 1, D + L + HR + ' +k=1' + O + N + M + E + A, 1, D + L + Mj + ' +k=1' + O + N + M + E + A, 1, D + L + HS + ' +k=1' + O + N + M + E + A, 1, D + L + Jj + ' +k=1' + O + N + M + E + A, 1, D + L + EN + ' +k=1' + O + N + M + E + A, 1, D + L + Le + ' +k=1' + O + N + M + E + A, 1, D + L + Fy + ' +k=1' + O + N + M + E + A, 1, D + L + Im + ' +k=1' + O + N + M + E + A, 1, D + L + Fm + ' +k=1' + O + N + M + E + A, 1, D + L + KF + ' +k=1' + O + N + M + E + A, 1, D + L + Fr + ' +k=1' + O + N + M + E + A, 1, D + L + Jk + ' +k=1' + O + N + M + E + A, 1, D + L + Ed + ' +k=1' + O + N + M + E + A, 1, K + Y + Gf + ' +pm=bern' + A, 1, K + R + ES + ' +pm=bogota' + A, 1, K + R + EV + Zb + A, 1, K + Y + HZ + PW + A, 1, K + Y + Aw + Ls + A, 1, K + R + CK + ' +pm=rome' + A, 1, K + AU + BN + Bk + Lv + A, 1, K + Y + PW + A, 1, K + R + ' +pm=brussels' + A, 1, K + R + HD + Lv + A, 1, K + AU + BN + JC + Lv + A, 1, D + L + Il + ' +k=1' + O + N + M + E + A, 0, D + L + Il + ' +k=1' + O + N + M + E + A, 1, K + Y + Cj + PW + A, 1, K + Y + ' +pm=stockholm' + A, 1, K + Y + ' +pm=athens' + A, 1, K + AU + BN + Gi + Lv + A, 1, K + Hn + EL + Aa + SN + A, 1, K + Y + Gh + Ls + A, 2, K + Y + Hf + PW + A, 1, K + AU + BN + Lv + A, 1, D + L + Fn + ' +k=1' + O + N + M + E + A, 1, K + R + A, 1, K + R + A, 2, H + ' +lat_1=15 +lat_2=16.66666666666667 +lat_0=15.83333333333333 +lon_0=-24 +x_0=161587.83 +y_0=128511.202' + S + E + A, 13, H + WK + WL + UK + YH + s + N + C + B + E + A, 62, K + ' +a=6376523' + RA + ZM + A, 2, K + Zx + Qy + ' +pm=madrid' + A, 1, K + Y + Pb + Zb + A, 109, K + C + B + A, 1, I + Nr + C + B + E + A, 1, I + Os + C + B + E + A, 1, I + Ja + C + B + E + A, 2, D + BY + UZ + ' +k=1' + s + N + R + EV + E + A, 23, BP + Hr + Qm + HN + Rd + Bd + Cl + S + E + A, 1, BP + m + ' +lat_ts=-90' + HN + Rd + Bd + Cl + S + E + A, 6, I + Ki + C + B + E + A, 21, DT + Sa + Hl + ZB + OZ + s + N + X + E + A, 1, DT + Sa + Hl + ZB + OZ + s + N + C + B + E + A, 1, DT + Sa + Hl + ZB + OZ + s + N + C + B + E + A, 1, DT + Sa + Hl + ZB + OZ + s + N + C + B + E + A, 33, D + Fk + ' +lon_0=5.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=6.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=7.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=8.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=9.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + YH + ' +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=11.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=12.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=13.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=14.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=15.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + YE + ' +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=17.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=18.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=19.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=20.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=21.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=22.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=23.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=24.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=25.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=26.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=27.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=28.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=29.5 +k=1' + BU + AH + C + B + E + A, 1, D + Fk + ' +lon_0=30.5 +k=1' + BU + AH + C + B + E + A, 2, K + Y + A, 35, D + Ch + NX + ' +k=1' + h + Ae + Y + E + A, 1, D + Ch + Rt + ' +k=1' + h + ' +y_0=550000' + Y + E + A, 1, D + Ch + Ru + ' +k=1' + h + Ae + Y + E + A, 1, D + Ch + Rt + ' +k=1' + h + Ae + Y + E + A, 1, D + Ch + Ed + ' +k=1' + h + Ae + Y + E + A, 1, D + Ch + NX + ' +k=1' + h + Ae + Y + E + A, 1, D + Ch + ' +lon_0=125.0028902777778 +k=1' + h + Ae + Y + E + A, 1, D + Ch + WM + ' +k=1' + h + Ae + Y + E + A, 1, D + Ch + WM + ' +k=1' + h + ' +y_0=550000' + Y + E + A, 1, D + Ch + ' +lon_0=129.0028902777778 +k=1' + h + Ae + Y + E + A, 1, D + Ch + ' +lon_0=131.0028902777778 +k=1' + h + Ae + Y + E + A, 1, D + Ch + Pj + AP + BZ + Cl + Y + E + A, 1, D + Ch + Pj + AP + BZ + Cl + C + B + E + A, 1, D + Ch + Ru + ' +k=1' + h + Ae + C + B + E + A, 1, D + Ch + Rt + ' +k=1' + h + Ae + C + B + E + A, 1, D + Ch + Rt + ' +k=1' + h + ' +y_0=550000' + C + B + E + A, 1, D + Ch + Ed + ' +k=1' + h + Ae + C + B + E + A, 1, D + Ch + NX + ' +k=1' + h + Ae + C + B + E + A, 1, D + Ch + Ru + ' +k=1' + h + Qn + C + B + E + A, 1, D + Ch + Rt + ' +k=1' + h + Qn + C + B + E + A, 1, D + Ch + Ed + ' +k=1' + h + Qn + C + B + E + A, 1, D + Ch + NX + ' +k=1' + h + Qn + C + B + E + A, 33, Rp + SS + ' +lon_0=42.5' + Kk + V + s + N + Y + Gh + Ls + E + A, 2, D + L + IH + AP + O + Ae + S + E + A, 5, K + Y + Lz + A, 1, K + Y + Lz + Ls + A, 4, K + By + Ay + Kf + A, 1, D + ' +lat_0=7.000480277777778 +lon_0=80.77171111111112 +k=0.9999238418' + h + IK + By + Ay + Tb + E + A, 1, D + ' +lat_0=7.000471527777778 +lon_0=80.77171308333334 +k=0.9999238418' + O + Ae + By + Ay + Kf + E + A, 8, H + WK + WL + UK + YH + s + N + C + B + E + A, 3, K + C + A, 1, CU + Qi + Yz + aU + Ph + s + N + KE + If + C + E + A, 5, K + C + B + A, 1, D + L + HO + ' +k=1' + O + N + C + B + E + A, 1, D + L + Ia + ' +k=1' + O + N + C + B + E + A, 1, D + L + IG + ' +k=1' + O + N + C + B + E + A, 1, D + L + PN + ' +k=1' + O + N + C + B + E + A, 1, D + L + LN + ' +k=1' + O + N + C + B + E + A, 1, D + L + PO + ' +k=1' + O + N + C + B + E + A, 1, D + L + JS + ' +k=1' + O + N + C + B + E + A, 5, K + C + B + A, 2, D + L + Hq + ' +k=1' + Bv + N + C + B + E + A, 3, D + L + HO + ' +k=1' + MT + N + C + B + E + A, 1, D + L + Ia + ' +k=1' + LY + N + C + B + E + A, 1, D + L + IG + ' +k=1' + Jp + N + C + B + E + A, 1, D + L + PN + ' +k=1' + LZ + N + C + B + E + A, 1, D + L + LN + ' +k=1' + HU + N + C + B + E + A, 1, D + L + PO + ' +k=1' + Gw + N + C + B + E + A, 1, D + L + JS + ' +k=1' + Hu + N + C + B + E + A, 17, D + L + ' +lon_0=90.73333333333333 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=89.55 +k=1' + Bv + DU + C + B + E + A, 1, D + L + WN + ' +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=90.03333333333333 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=90.15000000000001 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=91.13333333333334 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=91.23333333333333 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=89.34999999999999 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=91.34999999999999 +k=1' + Bv + DU + C + B + E + A, 1, D + L + WN + ' +k=1' + Bv + DU + C + B + E + A, 1, D + L + WO + ' +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=89.06666666666666 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=90.26666666666667 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=89.55 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=91.75 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=90.5 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=90.16666666666667 +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=90.11666666666666 +k=1' + Bv + DU + C + B + E + A, 1, D + L + WO + ' +k=1' + Bv + DU + C + B + E + A, 1, D + L + ' +lon_0=90.86666666666666 +k=1' + Bv + DU + C + B + E + A, 5, D + L + ' +lon_0=-7 +k=0.999997' + h + ' +y_0=-6000000' + C + B + E + A, 4, H + YI + ' +lat_2=54.5' + L + NV + BZ + N + C + B + E + A, 1, H + YI + ' +lat_2=54.5' + L + NV + BZ + N + C + B + E + A, 3, K + C + B + A, 1, H + ' +lat_1=64.25 +lat_2=65.75 +lat_0=65 +lon_0=-19' + Jv + Hk + C + B + E + A, 4, JU + PC + ZP + Pl + Qp + Y + Hf + PW + E + A, 1, JU + PC + ZP + Pl + Qp + Y + Cj + PW + E + A, 1, JU + PC + ZP + Pl + Qp + Y + HZ + PW + E + A, 6, I + Nr + o + R + Ec + E + A, 3, K + C + B + A, 3, D + m + UQ + ' +k=1' + AV + N + C + B + E + A, 1, D + m + MP + ' +k=1' + Ci + N + C + B + E + A, 1, D + m + Pe + ' +k=1' + Bo + N + C + B + E + A, 1, D + m + Qk + ' +k=1' + DP + N + C + B + E + A, 1, D + m + US + ' +k=1' + Eg + N + C + B + E + A, 1, D + m + Zc + ' +k=1' + Jt + N + C + B + E + A, 1, D + m + Nb + ' +k=1' + IM + N + C + B + E + A, 5, K + C + B + A, 1, I + Gz + o + C + B + E + A, 1, I + Hi + o + C + B + E + A, 1, I + ID + o + C + B + E + A, 3, K + C + B + A, 1, I + Hi + o + C + B + E + A, 1, I + IC + o + C + B + E + A, 3, K + j + B + A, 2, D + L + NV + V + O + N + j + B + E + A, 4, K + C + B + A, 2, K + C + B + A, 8, K + j + B + A, 1, I + ID + o + j + B + E + A, 1, I + Io + o + j + B + E + A, 4, I + IC + o + C + B + E + A, 2, I + Hi + o + C + B + E + A, 4, K + C + B + A, 3, I + Os + o + C + B + E + A, 55, K + i + Bp + A, 5, H + ' +lat_1=10.46666666666667 +lat_0=10.46666666666667 +lon_0=-84.33333333333333 +k_0=0.99995696' + O + ' +y_0=271820.522' + i + Bp + E + A, 1, H + ' +lat_1=9 +lat_0=9' + Ua + ' +k_0=0.99995696' + O + ' +y_0=327987.436' + i + Bp + E + A, 2, H + ' +lat_1=14.9 +lat_0=14.9' + Bx + ' +k_0=0.99989906' + O + ' +y_0=325992.681' + i + Bp + E + A, 1, H + ' +lat_1=13.78333333333333 +lat_0=13.78333333333333 +lon_0=-89 +k_0=0.99996704' + O + ' +y_0=295809.184' + i + Bp + E + A, 1, H + ' +lat_1=13.86666666666667 +lat_0=13.86666666666667' + To + ' +k_0=0.99990314' + O + ' +y_0=359891.816' + i + Bp + E + A, 1, H + ' +lat_1=11.73333333333333 +lat_0=11.73333333333333' + To + ' +k_0=0.9999222800000001' + O + ' +y_0=288876.327' + i + Bp + E + A, 1, I + Ik + x + Al + E + A, 1, K + Ee + Ef + A, 3, K + i + A, 2, H + ' +lat_1=8.416666666666666 +lat_0=8.416666666666666 +lon_0=-80 +k_0=0.99989909' + O + ' +y_0=294865.303' + i + E + A, 3, UU + ' +lat_0=8.25' + CR + ' +x_0=914391.7962 +y_0=999404.7217154861' + i + ' +to_meter=0.9143917962' + A, 7, H + Ai + Aj + ' +lat_0=-78 +lon_0=163' + Tp + Ju + C + B + E + A, 1, H + ' +lat_1=-73.66666666666667' + AZ + ' +lat_0=-74.5' + NZ + LX + Fq + C + B + E + A, 1, H + ' +lat_1=-70.66666666666667 +lat_2=-72.33333333333333 +lat_0=-71.5' + ZW + aH + AH + C + B + E + A, 1, BP + m + ' +lat_ts=-90' + Ry + Rd + LX + AH + C + B + E + A, 7, K + C + B + A, 1, I + Gz + C + B + E + A, 23, Rp + SS + WP + Kk + V + s + N + Y + Gh + E + A, 1, Rp + SS + WP + Kk + V + s + N + Y + Gh + E + A, 4, D + Za + Si + ' +k=1' + Qo + ' +y_0=650000' + R + TT + E + A, 1, D + Za + Si + ' +k=1' + Qo + ' +y_0=650000' + R + Np + E + A, 1, D + L + Or + ' +k=1' + AV + N + Y + AC + E + A, 3, D + L + ' +lon_0=11.5' + AP + AV + EM + S + E + A, 1, K + R + A, 3, K + x + BK + A, 3, UU + L + Nb + LX + Ak + x + BK + E + A, 1, I + ID + o + x + BK + E + A, 2, I + MB + o + x + BK + E + A, 1, I + Nx + o + x + BK + E + A, 1, I + Nr + o + x + BK + E + A, 1, I + ID + o + R + E + A, 1, I + Io + o + R + E + A, 1, I + MB + o + R + E + A, 1, I + Nx + o + R + E + A, 7, K + C + B + A, 4, I + Nv + o + C + B + E + A, 1, I + PM + o + C + B + E + A, 1, I + Re + o + C + B + E + A, 7, H + ' +lat_1=16.81666666666667 +lat_0=16.81666666666667' + Bx + ' +k_0=0.99992226' + O + ' +y_0=292209.579' + i + Bp + E + A, 2, K + M + BO + A, 1, D + L + Gl + ' +k=1' + DP + N + M + BO + E + A, 1, D + L + HO + ' +k=1' + Eg + N + M + BO + E + A, 1, D + L + IG + ' +k=1' + Jt + N + M + BO + E + A, 1, D + L + LN + ' +k=1' + IM + N + M + BO + E + A, 1, D + L + Gl + ' +k=1' + O + N + M + BO + E + A, 1, D + L + HO + ' +k=1' + O + N + M + BO + E + A, 1, D + L + IG + ' +k=1' + O + N + M + BO + E + A, 1, D + L + LN + ' +k=1' + O + N + M + BO + E + A, 19, GU + Iq + Zy + ST + Ab + ' +y_0=304800' + X + t + A, 1, D + ' +lat_0=17.06124194444444 +lon_0=-88.6318575 +k=1 +x_0=66220.02833082761 +y_0=135779.5099885299' + Ee + Ef + ML + A, 4, K + C + B + A, 3, D + L + ' +lon_0=11.33333333333333 +k=1' + BZ + N + C + B + E + A, 27, D + Fo + Ua + ' +k=0.999942857' + e + N + X + J + A, 1, D + Fo + EY + Hm + e + N + X + J + A, 1, D + Fo + ' +lon_0=-88.75' + Hm + e + N + X + J + A, 2, D + L + ZO + AP + O + N + R + n + E + A, 2, I + JZ + o + j + KR + E + A, 2, D + L + KB + ' +k=1' + Ci + N + M + b + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 2, JU + ' +lon_0=-43 +lat_ts=-2' + LX + Ak + C + B + E + A, 2, H + ' +lat_1=52.66666666666666 +lat_2=54.33333333333334 +lat_0=48' + Lu + ' +x_0=815000' + N + R + n + E + A, 1, I + JM + o + C + B + E + A, 2, D + Fp + LW + JA + AG + N + C + B + J + A, 3, D + L + Or + AP + Gc + N + C + B + E + A, 1, D + L + Gj + AP + Iu + N + C + B + E + A, 1, D + L + Or + AP + Gc + N + C + B + E + A, 1, D + L + KB + AP + IU + N + C + B + E + A, 1, D + L + Gj + AP + Iu + N + C + B + E + A, 1, D + Fp + LW + JA + AG + N + C + B + J + A, 1, D + Fp + LW + JA + AG + N + C + B + J + A, 4, D + L + KB + AP + ' +x_0=500053 +y_0=-3999820' + R + CK + E + A, 4, D + L + Gj + ' +k=1' + Bo + N + M + b + E + A, 1, D + L + KB + ' +k=1' + Ci + N + M + Ar + E + A, 1, D + L + Gj + ' +k=1' + Bo + N + M + Ar + E + A, 1, D + L + KB + ' +k=1' + Bo + N + Y + E + A, 1, D + L + IH + ' +k=1' + DP + N + Y + E + A, 1, D + L + IH + ' +k=1' + DP + N + Y + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + Y + E + A, 1, D + L + KB + ' +k=1' + Bo + N + M + b + E + A, 1, D + L + IH + ' +k=1' + DP + N + M + b + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + M + b + E + A, 1, D + L + KB + ' +k=1' + Bo + N + M + Ar + E + A, 1, D + L + IH + ' +k=1' + DP + N + M + Ar + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + M + Ar + E + A, 1, D + L + ZO + ' +k=1' + Ci + N + Y + AC + E + A, 1, D + L + KB + ' +k=1' + Bo + N + Y + AC + E + A, 1, D + L + IH + ' +k=1' + DP + N + Y + AC + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + Y + AC + E + A, 1, D + L + Or + ' +k=1' + AV + N + Y + AC + E + A, 1, K + Y + A, 1, D + L + ZO + ' +k=1' + Ci + N + Y + E + A, 1, D + L + KB + ' +k=1' + Bo + N + Y + E + A, 1, D + L + IH + ' +k=1' + DP + N + Y + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + Y + E + A, 15, I + SK + o + C + B + E + A, 125, D + ' +lat_0=-35.31773627777778 +lon_0=149.0092948305555 +k=1.000086' + h + Qn + x + r + E + A, 11, I + KD + j + B + E + A, 1, I + Me + j + B + E + A, 2, I + Ik + o + C + B + E + A, 3, D + L + IH + AP + O + Ak + S + E + A, 2, D + L + Ia + V + O + Ak + C + B + E + A, 14, I + Io + o + x + BK + E + A, 17, I + IC + o + x + BK + E + A, 1, I + Hi + o + x + BK + E + A, 1, I + Gz + o + x + BK + E + A, 2, I + JZ + o + R + PJ + E + A, 1, UU + L + Nb + LX + Ak + C + B + E + A, 6, K + C + A, 1, D + L + KH + AP + AV + Ju + C + E + A, 3, BP + Hr + ' +lat_ts=70' + Hq + ' +k=1' + s + N + ZZ + Ri + E + A, 31, H + ZC + IJ + Ih + KK + s + N + S + E + A, 1, H + ZC + IJ + Ih + UT + s + N + S + E + A, 1, H + ZC + IJ + Ih + IG + s + N + S + E + A, 1, H + ZC + IJ + Ih + EN + s + N + S + E + A, 1, H + ZC + IJ + Ih + KG + s + N + S + E + A, 1, H + Ic + ZD + Ii + KK + s + N + S + E + A, 1, H + Ic + ZD + Ii + UT + s + N + S + E + A, 1, H + Ic + ZD + Ii + IG + s + N + S + E + A, 1, H + Ic + ZD + Ii + EN + s + N + S + E + A, 1, H + Ic + ZD + Ii + KG + s + N + S + E + A, 1, H + ZE + ZF + Ij + KK + s + N + S + E + A, 1, H + ZE + ZF + Ij + UT + s + N + S + E + A, 1, H + ZE + ZF + Ij + IG + s + N + S + E + A, 1, H + ZE + ZF + Ij + EN + s + N + S + E + A, 1, H + ZE + ZF + Ij + KG + s + N + S + E + A, 1, BP + Hr + Qm + ON + Rd + Bd + Cl + S + E + A, 1, BP + Hr + Qm + CS + Rd + Bd + Cl + S + E + A, 1, BP + Hr + Qm + ' +lon_0=-33' + Rd + Bd + Cl + S + E + A, 1, BP + Hr + Qm + QR + Rd + Bd + Cl + S + E + A, 1, BP + Hr + Qm + EN + Rd + Bd + Cl + S + E + A, 110, H + UL + Ha + Hb + ' +lon_0=-30' + Hy + DQ + C + B + E + A, 1, H + Ce + Cf + Cg + ' +lon_0=-52' + Hs + JH + C + B + E + A, 1, H + Ce + Cf + Cg + ' +lon_0=-12' + HV + JH + C + B + E + A, 1, H + Bf + IJ + Bg + MP + Gx + IN + C + B + E + A, 1, H + Bf + IJ + Bg + UT + Gc + IN + C + B + E + A, 1, H + Bf + IJ + Bg + ' +lon_0=-10' + Iu + IN + C + B + E + A, 1, H + Ic + BL + BM + ' +lon_0=-64' + HV + Gb + C + B + E + A, 1, H + Ic + BL + BM + UT + HW + Gb + C + B + E + A, 1, H + Ic + BL + BM + ' +lon_0=-14' + La + Gb + C + B + E + A, 1, H + AR + AS + AT + NU + NB + EM + C + B + E + A, 1, H + AR + AS + AT + ' +lon_0=-42' + NC + EM + C + B + E + A, 1, H + AR + AS + AT + ' +lon_0=-22' + ND + EM + C + B + E + A, 1, H + CI + OY + CJ + Zd + Hz + JI + C + B + E + A, 1, H + CI + OY + CJ + ' +lon_0=-38' + IB + JI + C + B + E + A, 1, H + CI + OY + CJ + ' +lon_0=-20' + IT + JI + C + B + E + A, 1, H + ' +lat_1=67' + WQ + WR + ' +lon_0=-51' + Jp + aE + C + B + E + A, 1, H + ' +lat_1=67' + WQ + WR + ' +lon_0=-34' + HU + aE + C + B + E + A, 1, H + WS + WT + WU + ' +lon_0=-52' + HV + ' +y_0=8500000' + C + B + E + A, 1, H + WS + WT + WU + ' +lon_0=-37' + HW + ' +y_0=8500000' + C + B + E + A, 1, H + Ce + Cf + Cg + ' +lon_0=16' + HW + JH + C + B + E + A, 1, H + Bf + IJ + Bg + Gl + Jp + IN + C + B + E + A, 1, H + Ic + BL + BM + Lu + Hz + Gb + C + B + E + A, 1, H + Ic + BL + BM + ZG + IB + Gb + C + B + E + A, 1, H + AR + AS + AT + ' +lon_0=14' + Jp + EM + C + B + E + A, 1, H + AR + AS + AT + ZG + HU + EM + C + B + E + A, 1, H + Ce + Cf + Cg + ' +lon_0=53' + La + JH + S + E + A, 1, H + Ce + Cf + Cg + HR + Hz + JH + S + E + A, 1, H + Bf + IJ + Bg + ' +lon_0=52' + HU + IN + S + E + A, 1, H + Bf + IJ + Bg + ' +lon_0=83' + Hu + IN + S + E + A, 1, H + Bf + IJ + Bg + Im + It + IN + S + E + A, 1, H + Bf + IJ + Bg + ' +lon_0=145' + Ht + IN + S + E + A, 1, H + Ic + BL + BM + ' +lon_0=58' + IT + Gb + S + E + A, 1, H + Ic + BL + BM + ' +lon_0=82' + IU + Gb + S + E + A, 1, H + Ic + BL + BM + ZQ + Mu + Gb + S + E + A, 1, H + Ic + BL + BM + ' +lon_0=130' + Mw + Gb + S + E + A, 1, H + Ic + BL + BM + ZR + My + Gb + S + E + A, 1, H + Ic + BL + BM + ' +lon_0=179' + NA + Gb + S + E + A, 1, H + AR + AS + AT + SR + Hu + EM + S + E + A, 1, H + AR + AS + AT + ' +lon_0=74' + It + EM + S + E + A, 1, H + AR + AS + AT + ' +lon_0=95' + Ht + EM + S + E + A, 1, H + AR + AS + AT + ' +lon_0=116' + Hw + EM + S + E + A, 1, H + AR + AS + AT + ' +lon_0=137' + Hx + EM + S + E + A, 1, H + AR + AS + AT + ' +lon_0=158' + Hy + EM + S + E + A, 1, H + AR + AS + AT + ' +lon_0=179' + IA + EM + S + E + A, 1, H + AR + AS + AT + ' +lon_0=-163' + Gx + EM + C + B + E + A, 1, H + AR + AS + AT + Qr + Gc + EM + C + B + E + A, 1, H + CI + OY + CJ + SX + Gw + JI + C + B + E + A, 1, H + CI + OY + CJ + Qr + Hv + JI + C + B + E + A, 1, H + UL + Ha + Hb + Bu + Hx + DQ + C + B + E + A, 1, H + Ce + Cf + Cg + SZ + Gw + JH + C + B + E + A, 1, H + Ce + Cf + Cg + UR + Hv + JH + C + B + E + A, 1, H + Bf + IJ + Bg + YT + Hy + IN + C + B + E + A, 1, H + Bf + IJ + Bg + Ji + IA + IN + C + B + E + A, 1, H + Bf + IJ + Bg + MP + Gx + IN + C + B + E + A, 1, H + Ic + BL + BM + YT + Gw + Gb + C + B + E + A, 1, H + Ic + BL + BM + ' +lon_0=-104' + Hv + Gb + C + B + E + A, 1, H + Ic + BL + BM + NW + Hs + Gb + C + B + E + A, 1, H + AR + AS + AT + ' +lon_0=-131' + Iu + EM + C + B + E + A, 1, H + AR + AS + AT + KK + Mv + EM + C + B + E + A, 1, H + AR + AS + AT + ' +lon_0=-91' + Mx + EM + C + B + E + A, 1, H + AR + AS + AT + ' +lon_0=-71' + Mz + EM + C + B + E + A, 1, H + CI + OY + CJ + ' +lon_0=-132' + Hs + JI + C + B + E + A, 1, H + CI + OY + CJ + ' +lon_0=-113' + HV + JI + C + B + E + A, 1, H + CI + OY + CJ + Na + HW + JI + C + B + E + A, 1, H + CI + OY + CJ + UR + La + JI + C + B + E + A, 1, H + UL + Ha + Hb + Ia + IA + DQ + S + E + A, 1, H + UL + Ha + Hb + Hq + Gx + DQ + S + E + A, 1, H + UL + Ha + Hb + Oe + Gc + DQ + S + E + A, 1, H + UL + Ha + Hb + ON + Hw + DQ + S + E + A, 1, H + Ce + Cf + Cg + ' +lon_0=133' + IB + JH + S + E + A, 1, H + Ce + Cf + Cg + ZW + LY + JH + S + E + A, 1, H + Ce + Cf + Cg + Ms + LZ + JH + S + E + A, 1, H + Bf + IJ + Bg + ' +lon_0=176' + Hw + IN + S + E + A, 1, H + Bf + IJ + Bg + YJ + Hx + IN + S + E + A, 1, H + Ic + BL + BM + ' +lon_0=-155' + LZ + Gb + S + E + A, 1, H + AR + AS + AT + ' +lon_0=-5' + ZK + EM + C + B + E + A, 3, I + Ik + i + Lg + t + A, 1, I + Ik + i + Ly + t + A, 6, K + C + B + A, 69, D + L + Gl + V + O + N + Y + Aw + E + A, 3, K + By + Ay + ' +towgs84=293.17,726.18,245.36,0,0,0,0' + A, 3, I + MB + C + B + E + A, 1, I + Nx + C + B + E + A, 96, H + GW + GX + GY + GA + h + IK + C + E + A, 4, K + j + Kd + A, 1, D + L + IG + CP + h + ' +y_0=-3500000' + j + Kd + E + A, 4, D + L + Gl + V + IM + N + Y + Aw + E + A, 2, K + C + A, 4, K + C + A, 3, K + C + A, 3, I + Nq + C + E + A, 1, I + PL + C + E + A, 1, I + SK + C + E + A, 1, I + TV + C + E + A, 1, I + Xz + C + E + A, 1, I + TY + C + E + A, 1, I + RG + C + E + A, 1, I + Ro + C + E + A, 1, I + RH + C + E + A, 1, I + TW + C + E + A, 1, I + TX + C + E + A, 1, I + QE + C + E + A, 1, I + Ns + C + E + A, 1, I + Nt + C + E + A, 1, I + Nu + C + E + A, 1, I + Nw + C + E + A, 1, I + NP + C + E + A, 1, I + NQ + C + E + A, 1, I + Ik + C + E + A, 1, I + IC + C + E + A, 1, I + Hi + C + E + A, 2, DT + Sa + Hl + ZB + OZ + s + N + C + E + A, 1, H + AR + AS + AT + ' +lon_0=-163' + Gx + EM + C + E + A, 1, H + AR + AS + AT + Qr + Gc + EM + C + E + A, 1, H + CI + OY + CJ + SX + Gw + JI + C + E + A, 1, H + CI + OY + CJ + Qr + Hv + JI + C + E + A, 1, D + IY + IV + Pc + h + N + C + E + A, 1, D + Gm + OS + BG + a + N + C + E + A, 6, H + ' +lat_1=17.5 +lat_2=29.5 +lat_0=12 +lon_0=-102' + Ci + N + C + B + E + A, 3, K + C + B + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, H + ' +lat_1=17.5 +lat_2=29.5 +lat_0=12 +lon_0=-102' + Ci + N + C + B + E + A, 9, D + L + Gl + ' +k=1' + AI + N + M + CC + E + A, 1, D + L + II + ' +k=1' + AI + N + M + CC + E + A, 1, D + L + HO + ' +k=1' + AI + N + M + CC + E + A, 1, D + L + Ia + ' +k=1' + AI + N + M + CC + E + A, 1, D + L + IG + ' +k=1' + AI + N + M + CC + E + A, 1, D + L + PN + ' +k=1' + AI + N + M + CC + E + A, 1, D + L + LN + ' +k=1' + AI + N + M + CC + E + A, 4, H + ' +lat_1=19.33333333333333 +lat_2=19.7 +lat_0=19.33333333333333 +lon_0=-80.56666666666666 +x_0=899160 +y_0=579120' + C + B + t + A, 2, DT + ' +lat_1=55' + QY + Yu + Ms + s + N + C + E + A, 1, CU + ' +lat_0=57' + Ku + Kv + V + LX + EO + KE + GZ + C + E + A, 1, D + Ft + YN + V + O + N + C + E + A, 1, D + Ft + YO + V + O + N + C + E + A, 1, D + Ft + ON + V + O + N + C + E + A, 1, D + Ft + Ms + V + O + N + C + E + A, 1, D + Ft + KI + V + O + N + C + E + A, 1, D + Ft + YP + V + O + N + C + E + A, 1, D + Ft + YQ + V + O + N + C + E + A, 1, D + Ft + SW + V + O + N + C + E + A, 1, H + Kw + Kx + UK + YR + BZ + N + C + E + A, 1, D + Bl + Co + V + EX + N + C + E + A, 1, D + Bl + Co + V + EX + N + C + t + A, 1, D + Bl + Cn + V + EX + N + C + E + A, 1, D + Bl + Cn + V + EX + N + C + t + A, 1, D + Bl + Iv + BG + EX + N + C + E + A, 1, D + Bl + Iv + BG + EX + N + C + t + A, 1, H + Dx + Dy + BC + IF + u + N + C + E + A, 1, H + Dx + Dy + BC + IF + Au + N + C + J + A, 1, H + Dz + Mq + EA + IF + u + Is + C + E + A, 1, H + Dz + Mq + EA + IF + Au + Gt + C + J + A, 1, DT + Yy + SY + L + Mt + s + QZ + C + E + A, 1, H + DW + Jn + y + HA + Bd + Ae + C + E + A, 1, H + DW + Jn + y + HA + Ac + AD + C + J + A, 1, H + DX + DY + AA + HA + Bd + Ae + C + E + A, 1, H + DX + DY + AA + HA + Ac + AD + C + J + A, 1, H + Ap + DZ + Ml + AJ + Bd + Ae + C + E + A, 1, H + Ap + DZ + Ml + AJ + Ac + AD + C + J + A, 1, H + LO + QS + Da + Mm + Bd + Ae + C + E + A, 1, H + LO + QS + Da + Mm + Ac + AD + C + J + A, 1, H + Db + Dc + Mn + Ir + Bd + Ae + C + E + A, 1, H + Db + Dc + Mn + Ir + Ac + AD + C + J + A, 1, H + Dd + De + Df + Iw + Bd + Ae + C + E + A, 1, H + Dd + De + Df + Iw + Ac + AD + C + J + A, 1, H + LP + LQ + CY + Ba + Fw + Fx + C + E + A, 1, H + LP + LQ + CY + Ba + Bw + CL + C + J + A, 1, H + Eh + Ei + y + Ba + Fw + Fx + C + E + A, 1, H + Eh + Ei + y + Ba + Bw + CL + C + J + A, 1, H + Ap + Dg + f + Ba + Fw + Fx + C + E + A, 1, H + Ap + Dg + f + Ba + Bw + CL + C + J + A, 1, H + Dh + Mo + Di + Jq + QG + QH + C + E + A, 1, H + Dh + Mo + Di + Jq + MC + MD + C + J + A, 1, D + Ch + Cp + Mp + h + N + C + E + A, 1, D + Ch + Cp + Mp + AE + N + C + J + A, 1, D + Aq + CR + Am + h + N + C + E + A, 1, D + Aq + CR + Am + AE + N + C + J + A, 1, DT + ' +lat_1=24' + YG + ' +lat_0=24' + NV + u + N + C + E + A, 1, H + LR + Dj + QT + LS + a + N + C + E + A, 1, H + LR + Dj + QT + LS + a + N + C + J + A, 1, D + Aq + Ob + Am + h + N + C + E + A, 1, D + Aq + Ob + Am + AE + N + C + J + A, 1, D + Gm + Cq + V + h + N + C + E + A, 1, D + Gm + Cq + V + AE + N + C + J + A, 1, D + Gm + Cr + V + EW + N + C + E + A, 1, D + Gm + Cr + V + CM + N + C + J + A, 1, D + p + Jb + BJ + O + N + C + E + A, 1, D + p + Jb + BJ + AF + N + C + J + A, 1, D + p + Cs + BJ + h + N + C + E + A, 1, D + p + Cs + BJ + AE + N + C + J + A, 1, D + p + Ix + BG + CX + N + C + E + A, 1, D + p + Ix + BG + ME + N + C + J + A, 1, D + f + Cz + EQ + AI + N + C + E + A, 1, D + f + Cz + EQ + AI + N + C + J + A, 1, D + f + DA + Am + EW + N + C + E + A, 1, D + f + DA + Am + MO + N + C + J + A, 1, D + DM + DB + AO + BU + KJ + C + E + A, 1, D + DM + DB + AO + MM + GI + C + J + A, 1, D + DM + DC + AO + HT + KJ + C + E + A, 1, D + DM + DC + AO + HT + GI + C + J + A, 1, H + EB + EC + Fo + GG + AV + AH + C + E + A, 1, H + EB + EC + Fo + GG + AV + GJ + C + J + A, 1, H + AY + ED + Fs + GG + O + N + C + E + A, 1, H + AY + ED + Fs + GG + AG + N + C + J + A, 1, H + EE + EF + AQ + Fl + u + N + C + E + A, 1, H + EE + EF + AQ + Fl + Au + N + C + J + A, 1, H + EG + EH + f + CV + u + Is + C + E + A, 1, H + EG + EH + f + CV + Au + Gt + C + J + A, 1, H + Az + DV + DM + Jo + O + N + C + E + A, 1, H + Az + DV + DM + Jo + AF + N + C + J + A, 1, H + Fi + Fj + AB + EY + AV + AH + C + E + A, 1, H + Fi + Fj + AB + EY + AV + CN + C + J + A, 1, H + Ej + Ek + AB + EY + O + Ae + C + E + A, 1, H + Ej + Ek + AB + EY + AF + AD + C + J + A, 1, H + FS + FT + IY + Hg + BZ + N + C + E + A, 1, H + FS + FT + IY + Hg + Eb + N + C + J + A, 1, H + OH + OI + OJ + Bi + BZ + N + C + E + A, 1, H + OH + OI + OJ + Bi + Eb + N + C + J + A, 1, D + YM + Rj + JE + O + N + C + E + A, 1, D + AL + Rf + JE + EW + N + C + E + A, 1, D + BD + Rg + JE + AI + N + C + E + A, 1, D + AK + HJ + V + AI + N + C + E + A, 1, D + AK + HJ + V + AI + N + C + J + A, 1, D + BD + DD + AO + HT + N + C + E + A, 1, D + BD + DD + AO + HT + N + C + J + A, 1, H + MU + Nz + AA + Ld + u + N + C + E + A, 1, H + MU + Nz + AA + Ld + MF + N + C + J + A, 1, H + Em + En + Ip + IL + O + N + C + E + A, 1, H + Em + En + Ip + IL + AF + N + C + J + A, 1, H + El + Dk + Ip + GE + h + Mk + C + E + A, 1, H + El + Dk + Ip + GE + AE + Mk + C + J + A, 1, H + OA + Er + Es + BE + Pk + N + C + E + A, 1, H + OA + Er + Es + BE + MH + N + C + t + A, 1, H + Eo + Ep + Eq + Jh + Tl + N + C + E + A, 1, H + Eo + Ep + Eq + Jh + MG + N + C + t + A, 1, CU + Kr + ' +lonc=-86' + QI + AP + QJ + PY + KE + QK + C + E + A, 1, H + Bq + OB + Fo + BE + LU + N + C + E + A, 1, H + Bq + OB + Fo + BE + OT + N + C + t + A, 1, H + Ma + FW + IP + Js + CX + EK + C + E + A, 1, H + Ma + FW + IP + Js + An + Ao + C + J + A, 1, H + FU + FV + Iq + DE + CX + EK + C + E + A, 1, H + FU + FV + Iq + DE + An + Ao + C + J + A, 1, H + FX + FY + Nj + Na + CX + EK + C + E + A, 1, H + FX + FY + Nj + Na + An + Ao + C + J + A, 1, D + Hj + Ct + CP + AI + N + C + E + A, 1, D + Hj + Ct + CP + AI + N + C + J + A, 1, D + Li + Sj + Tn + O + Pm + C + E + A, 1, D + Hj + Bx + CP + EW + N + C + E + A, 1, D + Hj + Bx + CP + CM + N + C + J + A, 1, D + Cd + Hg + BG + O + N + C + E + A, 1, D + Cd + RS + BG + Bv + N + C + E + A, 1, D + Id + RT + Am + YC + N + C + E + A, 1, H + LM + RK + MV + IS + a + N + C + E + A, 1, H + LM + RK + MV + IS + DR + N + C + t + A, 1, H + JT + Jn + FZ + CS + O + N + C + E + A, 2, D + CQ + DG + V + O + Hh + C + E + A, 1, D + CQ + DG + V + AG + Hh + C + J + A, 1, D + CQ + DF + V + h + Tm + C + E + A, 1, D + CQ + DF + V + Gu + MN + C + J + A, 1, D + CQ + DH + V + CX + LV + C + E + A, 1, D + CQ + DH + V + An + NE + C + J + A, 1, D + Fp + DI + AO + AI + N + C + E + A, 1, D + Fp + DI + AO + AI + N + C + J + A, 1, D + BA + Gp + V + Bn + N + C + E + A, 1, D + BA + Gp + V + Bn + N + C + J + A, 1, D + Bl + Iy + V + O + N + C + E + A, 1, D + Bl + Iy + V + AF + N + C + J + A, 1, D + Bl + Cu + Hm + OC + N + C + E + A, 1, D + Bl + Cu + Hm + OC + N + C + J + A, 1, D + Bl + Cv + Iz + YD + N + C + E + A, 1, D + Bl + Cv + Iz + MI + N + C + J + A, 1, D + Fs + Cw + Ad + Bv + N + C + E + A, 1, D + Fs + Cw + Ad + MJ + N + C + J + A, 1, D + BA + Gp + V + Bn + N + C + E + A, 1, D + BA + Gp + V + Bn + N + C + J + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + E + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + J + A, 1, D + Fs + Cx + Ad + Qo + N + C + E + A, 1, D + Fs + Cx + Ad + MK + N + C + J + A, 1, H + Et + Eu + LT + NW + Rh + N + C + E + A, 1, H + Et + Eu + LT + NW + Z + N + C + J + A, 1, H + BH + Ev + Ib + EZ + a + N + C + E + A, 1, H + BH + Ev + Ib + EZ + DR + N + C + t + A, 1, H + Ew + Ex + Be + EZ + a + N + C + E + A, 1, H + Ew + Ex + Be + EZ + DR + N + C + t + A, 1, H + OK + Fa + BY + ET + a + N + C + E + A, 1, H + OK + Fa + BY + ET + a + N + C + J + A, 1, H + Fb + Fc + Ch + ET + a + N + C + E + A, 1, H + Fb + Fc + Ch + ET + a + N + C + J + A, 1, H + Dn + Ey + QU + Fl + a + N + C + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + J + A, 1, H + Ez + FA + Do + Fl + a + N + C + E + A, 1, H + Ez + FA + Do + Fl + a + N + C + J + A, 1, H + JT + Hl + GH + AJ + u + N + C + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + t + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + E + A, 1, H + PP + CZ + AK + AJ + KL + N + C + t + A, 1, H + PQ + Ca + p + AJ + AV + N + C + E + A, 1, H + PQ + Ca + p + AJ + KM + N + C + t + A, 1, H + MW + FB + BB + Ea + a + N + C + E + A, 1, H + MW + FB + BB + Ea + a + N + C + J + A, 1, H + Dp + Dq + y + Ea + a + N + C + E + A, 1, H + Dp + Dq + y + Ea + a + N + C + J + A, 1, H + GW + GX + GY + GA + h + IK + C + E + A, 1, D + EI + GE + Lb + BU + N + C + E + A, 1, D + EI + GE + Lb + JV + N + C + J + A, 1, H + FC + OD + Dr + CR + OE + N + C + E + A, 1, H + FC + OD + Dr + CR + OE + N + C + t + A, 1, H + Fd + Fe + AL + CS + a + N + C + E + A, 1, H + Fd + Fe + AL + CS + a + N + C + J + A, 1, H + OL + Ff + EJ + Ag + a + N + C + E + A, 1, H + OL + Ff + EJ + Ag + a + N + C + J + A, 1, H + FD + MX + BC + MQ + a + N + C + E + A, 1, H + FD + MX + BC + MQ + a + N + C + J + A, 1, H + FH + FI + Cb + Ag + EW + Fq + C + E + A, 1, H + FH + FI + Cb + Ag + CM + Fq + C + J + A, 1, DT + OM + RO + OX + CS + AV + Hh + C + E + A, 1, H + OM + RO + OX + CS + AV + Ju + C + E + A, 1, H + FE + MY + QV + Jr + h + AH + C + E + A, 1, H + FE + MY + QV + Jr + AE + CN + C + J + A, 1, H + FF + FG + Ds + CV + a + Cl + C + E + A, 1, H + FF + FG + Ds + CV + a + Gr + C + J + A, 1, H + CD + CE + Cc + CV + AI + Ju + C + E + A, 1, H + CD + CE + Cc + CV + AI + Nf + C + J + A, 1, H + FJ + FK + Dt + Ji + a + LV + C + E + A, 1, H + FJ + FK + Dt + Ji + a + Ne + C + J + A, 1, D + Fp + LW + JA + O + N + C + E + A, 1, D + Fp + LW + JA + AG + N + C + J + A, 1, H + ' +lat_1=37' + YS + GM + Ga + s + N + C + E + A, 1, H + OF + FL + AA + GF + Bo + Cl + C + E + A, 1, H + OF + FL + AA + GF + Gs + Gr + C + J + A, 1, H + Az + Du + AB + GF + Bo + AH + C + E + A, 1, H + Az + Du + AB + GF + Gs + CN + C + J + A, 1, H + BH + OG + Ib + Cy + O + N + C + E + A, 1, H + BH + OG + Ib + Cy + AF + N + C + J + A, 1, H + FM + FN + Dv + AJ + O + N + C + E + A, 1, H + FM + FN + Dv + AJ + AF + N + C + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + E + A, 1, H + Mb + RN + Mr + Ga + a + N + C + J + A, 1, H + Fg + Fh + QX + CR + a + N + C + E + A, 1, H + Fg + Fh + QX + CR + a + N + C + J + A, 2, H + Jc + MZ + AL + Bu + a + N + C + J + A, 1, H + FO + FP + Dw + Bu + a + N + C + E + A, 1, H + FO + FP + Dw + Bu + a + N + C + J + A, 1, H + FQ + FR + PR + Bu + a + N + C + E + A, 1, H + FQ + FR + PR + Bu + a + N + C + J + A, 1, D + L + Bu + AP + YF + Sh + C + E + A, 1, D + CA + DJ + Ad + h + N + C + E + A, 1, D + CA + DJ + Ad + Gu + N + C + J + A, 1, D + CA + DK + Ad + u + EK + C + E + A, 1, D + CA + DK + Ad + Au + Ao + C + J + A, 1, D + CA + DL + Ad + CX + EK + C + E + A, 1, D + CA + DL + Ad + An + Ao + C + J + A, 1, D + CA + JB + Ad + a + N + C + E + A, 1, D + CA + JB + Ad + a + N + C + J + A, 1, H + JF + CG + AQ + BI + O + Cl + C + E + A, 1, H + AY + CF + Br + BI + O + AH + C + E + A, 1, H + JG + CH + f + BI + O + Fq + C + E + A, 1, H + UF + Nh + IZ + HJ + s + N + C + B + E + A, 1, DT + UF + Nh + IZ + HJ + s + N + C + B + E + A, 1, DT + UF + Nh + IZ + HJ + s + N + C + B + E + A, 1, H + JF + CG + AQ + BI + AG + NF + C + J + A, 1, H + AY + CF + Br + BI + AG + GJ + C + J + A, 1, H + JG + CH + f + BI + AG + Fq + C + J + A, 1, D + Kn + Sf + AO + O + N + C + E + A, 1, D + Ko + KO + AO + O + N + C + E + A, 1, D + GV + KI + Jl + O + N + C + E + A, 1, D + Kp + Sg + Jl + O + N + C + E + A, 1, D + Kq + KP + ' +k=1' + O + N + C + E + A, 1, D + GV + KI + Jl + AG + N + C + J + A, 1, I + TY + C + E + A, 1, I + RG + C + E + A, 1, I + TV + o + C + E + A, 1, D + ' +lat_0=13.5 +lon_0=144.75 +k=1' + BU + IK + C + E + A, 9, D + WJ + ' +lon_0=46.5 +k=0.9994' + CX + N + Bc + Ge + EU + E + A, 22, K + C + A, 1, D + PT + Zz + V + s + N + C + E + A, 1, D + PT + NX + V + s + N + C + E + A, 1, D + GM + Ox + V + s + N + C + E + A, 1, D + PT + Tk + V + s + N + C + E + A, 1, D + GM + Oy + V + s + N + C + E + A, 1, D + GM + Rw + V + s + N + C + E + A, 1, D + GM + Oz + V + s + N + C + E + A, 1, D + GM + aA + V + s + N + C + E + A, 1, D + GM + PA + V + s + N + C + E + A, 1, D + Fs + PB + V + s + N + C + E + A, 1, D + IZ + ZH + V + s + N + C + E + A, 1, D + IZ + ZI + V + s + N + C + E + A, 1, D + IZ + ZJ + V + s + N + C + E + A, 1, D + IQ + ' +lon_0=142' + V + s + N + C + E + A, 1, D + IQ + Pj + V + s + N + C + E + A, 1, D + IQ + ' +lon_0=124' + V + s + N + C + E + A, 1, D + IQ + NX + V + s + N + C + E + A, 1, D + ' +lat_0=20' + Rw + V + s + N + C + E + A, 1, D + IQ + ZR + V + s + N + C + E + A, 1, I + Mg + C + E + A, 1, I + NT + C + E + A, 1, I + Ot + C + E + A, 1, I + Nv + C + E + A, 1, I + PM + C + E + A, 11, D + L + US + AP + O + Ak + j + B + E + A, 3, K + C + B + A, 1, I + JN + C + B + E + A, 1, I + KC + C + B + E + A, 1, I + NR + C + B + E + A, 11, D + L + ' +lon_0=105.625 +k=1.000024' + Jm + Pm + j + B + E + A, 1, D + L + ' +lon_0=105.625 +k=1.00002514' + Jm + Pm + C + B + E + A, 1, D + L + ' +lon_0=96.875 +k=1' + Jm + ' +y_0=1400000' + j + B + E + A, 1, D + L + ' +lon_0=96.875 +k=0.99999387' + Jm + DQ + C + B + E + A, 13, I + QF + o + C + B + E + A, 1, I + Ny + o + C + B + E + A, 1, I + Nq + o + C + B + E + A, 45, K + C + A, 1, D + OO + KS + SB + Of + N + C + E + A, 1, D + OO + KS + SB + JJ + N + C + t + A, 1, D + OO + KS + SB + Of + N + C + E + A, 1, D + OO + KS + SB + JJ + N + C + t + A, 1, D + GH + Rk + ' +k=1.0002' + Oa + N + C + E + A, 1, D + GH + Rk + ' +k=1.0002' + HL + N + C + t + A, 1, D + GH + Rk + ' +k=1.0002' + Oa + N + C + E + A, 1, D + GH + Rk + ' +k=1.0002' + HL + N + C + t + A, 1, H + Ky + Kz + Rl + Mc + Oa + ' +y_0=130000' + C + E + A, 1, H + Ky + Kz + Rl + Mc + HL + Zo + C + t + A, 1, H + Ky + Kz + Rl + Mc + Oa + ' +y_0=130000' + C + E + A, 1, H + Ky + Kz + Rl + Mc + HL + Zo + C + t + A, 1, H + Bq + AK + Rm + YU + ' +x_0=120000 +y_0=60000' + C + E + A, 1, H + Bq + AK + Rm + YU + Zp + aM + C + t + A, 1, H + Bq + AK + Rm + YU + ' +x_0=120000 +y_0=60000' + C + E + A, 1, H + Bq + AK + Rm + YU + Zp + aM + C + t + A, 1, D + Fp + Bj + Ze + Of + N + C + E + A, 1, D + Fp + Bj + Ze + JJ + N + C + t + A, 1, D + Fp + Bj + Ze + Of + N + C + E + A, 1, D + Fp + Bj + Ze + JJ + N + C + t + A, 1, H + LA + Be + AJ + Sk + Bn + ' +y_0=30000' + C + E + A, 1, H + LA + Be + AJ + Sk + Ng + aN + C + t + A, 1, H + LA + Be + AJ + Sk + Bn + ' +y_0=30000' + C + E + A, 1, H + LA + Be + AJ + Sk + Ng + aN + C + t + A, 1, CU + LB + Zf + Zg + ' +k=1' + Tp + ZL + KE + Zh + C + E + A, 1, CU + LB + Zf + Zg + ' +k=1' + ZN + Zq + KE + Zh + C + t + A, 1, CU + LB + Zf + Zg + ' +k=1' + Tp + ZL + KE + Zh + C + E + A, 1, CU + LB + Zf + Zg + ' +k=1' + ZN + Zq + KE + Zh + C + t + A, 1, D + BD + Bj + YV + Jm + N + C + E + A, 1, D + BD + Bj + YV + HM + N + C + t + A, 1, D + BD + Bj + YV + Jm + N + C + E + A, 1, D + BD + Bj + YV + HM + N + C + t + A, 1, D + OO + YW + Zi + Oa + N + C + E + A, 1, D + OO + YW + Zi + HL + N + C + t + A, 1, D + OO + YW + Zi + Oa + N + C + E + A, 1, D + OO + YW + Zi + HL + N + C + t + A, 1, D + Tq + KT + Lk + Jm + N + C + E + A, 1, D + Tq + KT + Lk + HM + N + C + t + A, 1, D + Tq + KT + Lk + Jm + N + C + E + A, 1, D + Tq + KT + Lk + HM + N + C + t + A, 1, D + GH + Bj + Qs + Jm + N + C + E + A, 1, D + GH + Bj + Qs + HM + N + C + t + A, 1, D + GH + Bj + Qs + Jm + N + C + E + A, 1, D + GH + Bj + Qs + HM + N + C + t + A, 1, D + IP + KU + Zj + ' +x_0=10000' + N + C + E + A, 1, D + IP + KU + Zj + aV + N + C + t + A, 1, D + IP + KU + Zj + ' +x_0=10000' + N + C + E + A, 1, D + IP + KU + Zj + aV + N + C + t + A, 1, D + IP + Ir + Zk + Of + N + C + E + A, 1, D + IP + Ir + Zk + JJ + N + C + t + A, 1, D + IP + Ir + Zk + Of + N + C + E + A, 1, D + IP + Ir + Zk + JJ + N + C + t + A, 1, D + Tr + Lj + ' +k=1.0001' + Oa + N + C + E + A, 1, D + Tr + Lj + ' +k=1.0001' + HL + N + C + t + A, 1, D + Tr + Lj + ' +k=1.0001' + Oa + N + C + E + A, 1, D + Tr + Lj + ' +k=1.0001' + HL + N + C + t + A, 1, CU + Pn + Sl + ' +alpha=5 +k=1 +x_0=-300000 +y_0=-4600000' + KE + ' +gamma=5' + C + E + A, 1, CU + Pn + Sl + ' +alpha=5 +k=1' + Zr + Yp + KE + ' +gamma=5' + C + t + A, 1, CU + Pn + Sl + ' +alpha=5 +k=1 +x_0=-300000 +y_0=-4600000' + KE + ' +gamma=5' + C + E + A, 1, CU + Pn + Sl + ' +alpha=5 +k=1' + Zr + Yp + KE + ' +gamma=5' + C + t + A, 1, D + Ts + KV + Sb + ' +x_0=60000' + N + C + E + A, 1, D + Ts + KV + Sb + aO + N + C + t + A, 1, D + Ts + KV + Sb + ' +x_0=60000' + N + C + E + A, 1, D + Ts + KV + Sb + aO + N + C + t + A, 1, D + LC + IW + YX + Zl + N + C + E + A, 1, D + LC + IW + YX + aP + N + C + t + A, 1, D + LC + IW + YX + Zl + N + C + E + A, 1, D + LC + IW + YX + aP + N + C + t + A, 1, H + Jc + YY + Rn + Sm + BU + Rz + C + E + A, 1, H + Jc + YY + Rn + Sm + JW + Ra + C + t + A, 1, H + Jc + YY + Rn + Sm + BU + Rz + C + E + A, 1, H + Jc + YY + Rn + Sm + JW + Ra + C + t + A, 1, D + LD + KW + Zm + Jm + N + C + E + A, 1, D + LD + KW + Zm + HM + N + C + t + A, 1, D + LD + KW + Zm + Jm + N + C + E + A, 1, D + LD + KW + Zm + HM + N + C + t + A, 1, D + LE + Sn + YZ + s + N + C + E + A, 1, D + LE + Sn + YZ + s + N + C + t + A, 1, D + LE + Sn + YZ + s + N + C + E + A, 1, D + LE + Sn + YZ + s + N + C + t + A, 4, H + JT + Hl + GH + AJ + u + N + C + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + t + A, 2, D + L + UI + ' +k=1' + O + N + C + B + E + A, 5, D + L + IH + ' +k=0.9985000000000001' + Tp + N + C + B + E + A, 1, D + L + IH + ' +k=1' + aH + N + C + B + E + A, 3, H + Jc + MZ + AL + Bu + a + N + C + E + A, 1, H + JT + Jn + FZ + CS + AG + N + C + J + A, 1, K + Bc + Ge + ' +towgs84=-24,-203,268,0,0,0,0' + A, 1, K + Bc + Ge + ' +towgs84=-183,-15,273,0,0,0,0' + A, 1, K + R + ' +towgs84=-235,-110,393,0,0,0,0' + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + E + A, 1, H + PP + CZ + AK + AJ + KL + N + C + t + A, 1, H + PQ + Ca + p + AJ + AV + N + C + E + A, 1, H + PQ + Ca + p + AJ + KM + N + C + t + A, 5, K + Bc + Ge + PK + A, 2, K + Bc + Ge + ' +towgs84=-63,176,185,0,0,0,0' + A, 21, I + Me + Bc + Ge + PK + E + A, 7, H + Sc + Ya + GM + So + u + N + C + B + E + A, 1, H + Sc + Ya + GM + So + Au + N + C + B + J + A, 1, H + Sc + Ya + GM + So + u + N + C + E + A, 1, H + Sc + Ya + GM + So + Au + N + C + J + A, 6, He + Hr + HN + s + N + j + B + E + A, 1, He + m + HN + s + N + j + B + E + A, 1, '+proj=cea' + HN + ' +lat_ts=30' + s + N + j + B + E + A, 29, H + ' +lat_1=39 +lat_2=43' + Ip + UI + s + N + C + B + E + A, 21, K + C + A, 1, D + Ou + Ov + Zw + UV + Yl + C + E + A, 6, K + C + A, 1, D + Ou + Ov + Zw + UV + Yl + C + E + A, 14, I + KD + Bc + Ge + DO + E + A, 1, I + JZ + Bc + Ge + DO + E + A, 1, I + JM + Bc + Ge + DO + E + A, 28, K + C + A, 2, K + C + A, 2, K + C + A, 2, K + C + A, 16, H + ' +lat_1=43.2 +lat_0=43.2 +lon_0=-95.25 +k_0=1.000052 +x_0=3505207.010414021 +y_0=2926085.852171705' + C + J + A, 1, H + ' +lat_1=43.16666666666666 +lat_0=43.16666666666666 +lon_0=-92.75 +k_0=1.000043 +x_0=3810007.62001524 +y_0=2987045.974091948' + C + J + A, 1, D + Md + ' +lon_0=-91.2 +k=1.000035 +x_0=4114808.229616459 +y_0=2529845.05969012' + C + J + A, 1, H + ' +lat_1=42.53333333333333 +lat_0=42.53333333333333 +lon_0=-94.83333333333333 +k_0=1.000045 +x_0=4419608.839217679 +y_0=2621285.242570485' + C + J + A, 1, H + ' +lat_1=42.65 +lat_0=42.65 +lon_0=-92.25 +k_0=1.000032 +x_0=4724409.448818898 +y_0=2712725.425450851' + C + J + A, 1, D + Md + ' +lon_0=-95.73333333333333 +k=1.000039 +x_0=5029210.058420117 +y_0=2011684.023368047' + C + J + A, 1, D + Md + ' +lon_0=-94.63333333333334' + Sb + ' +x_0=5334010.668021336 +y_0=2072644.145288291' + C + J + A, 1, D + Md + ' +lon_0=-93.71666666666667 +k=1.000033 +x_0=5638811.277622555 +y_0=2133604.267208535' + C + J + A, 1, D + Md + ' +lon_0=-92.81666666666666' + OP + ' +x_0=5943611.887223775 +y_0=2194564.389128779' + C + J + A, 1, H + ' +lat_1=41.83333333333334 +lat_0=41.83333333333334 +lon_0=-91.66666666666667 +k_0=1.00002 +x_0=6248412.496824994 +y_0=2438404.876809754' + C + J + A, 1, D + Md + ' +lon_0=-90.53333333333333' + OP + ' +x_0=6553213.106426213 +y_0=2316484.632969266' + C + J + A, 1, H + ' +lat_1=40.91666666666666 +lat_0=40.91666666666666 +lon_0=-93.75 +k_0=1.000037 +x_0=6858013.716027432' + Yq + C + J + A, 1, D + Md + Oo + Og + ' +x_0=7162814.325628651 +y_0=1950723.901447803' + C + J + A, 1, D + Md + ' +lon_0=-91.25 +k=1.000018 +x_0=7467614.93522987' + Yq + C + J + A, 3, K + C + A, 1, I + KD + o + C + E + A, 1, I + JZ + o + C + E + A, 1, I + JM + o + C + E + A, 1, I + Me + o + C + E + A, 1, I + Rb + o + C + E + A, 1, I + Rc + o + C + E + A, 1, I + SO + o + C + E + A, 1, I + Td + o + C + E + A, 3, K + C + A, 2, K + C + A, 23, D + Qt + Sp + SB + Bn + N + C + E + A, 1, D + ' +lat_0=48' + Sp + ' +k=1.00019' + BU + N + C + E + A, 1, H + Yb + Qt + KK + ' +k_0=1.000145' + Bn + IK + C + E + A, 1, H + Yb + Qt + ' +lon_0=-108.5' + Mc + h + ' +y_0=150000' + C + E + A, 1, H + LF + LG + Ba + Mc + h + EK + C + E + A, 1, H + LF + LG + Ba + ' +k_0=1.00009' + BU + Rz + C + E + A, 1, D + Pn + ' +lon_0=-107.75 +k=1.000148' + h + N + C + E + A, 1, H + aI + ' +lat_0=46.25 +lon_0=-111.25 +k_0=1.000185' + BU + EK + C + E + A, 1, H + WV + WW + Ub + ' +k_0=1.0001515' + h + Rz + C + E + A, 1, D + WX + Uc + ' +k=1.00024' + BU + N + C + E + A, 1, D + Qt + Sp + SB + Ng + N + C + t + A, 1, D + ' +lat_0=48' + Sp + ' +k=1.00019' + JW + N + C + t + A, 1, H + Yb + Qt + KK + ' +k_0=1.000145' + Ng + ' +y_0=199999.9999992' + C + t + A, 1, H + Yb + Qt + ' +lon_0=-108.5' + Mc + OU + ' +y_0=150000.00001464' + C + t + A, 1, H + LF + LG + Ba + Mc + OU + Yr + C + t + A, 1, H + LF + LG + Ba + ' +k_0=1.00009' + JW + ' +y_0=49999.99971024' + C + t + A, 1, D + Pn + ' +lon_0=-107.75 +k=1.000148' + OU + N + C + t + A, 1, H + aI + ' +lat_0=46.25 +lon_0=-111.25 +k_0=1.000185' + JW + Yr + C + t + A, 1, H + WV + WW + Ub + ' +k_0=1.0001515' + OU + Ra + C + t + A, 1, D + WX + Uc + ' +k=1.00024' + JV + N + C + J + A, 3, D + Po + ' +lon_0=-122.45 +k=1.000007 +x_0=48000 +y_0=24000' + C + E + A, 1, D + Po + ' +lon_0=-122.45 +k=1.000007 +x_0=48000 +y_0=24000' + C + J + A, 1, K + C + A, 3, K + j + A, 3, K + j + A, 3, D + LH + LI + ' +k=1' + Qx + ' +y_0=126867.909' + Nc + Nd + ' +towgs84=-275.7224,94.7824,340.8944,-8.001,-4.42,-11.821,1' + E + A, 115, D + Pp + Sq + Ll + l + q + C + E + A, 1, D + Pp + Sq + Ll + l + q + C + J + A, 1, D + Qu + Oj + Lm + l + q + C + E + A, 1, D + Qu + Oj + Lm + l + q + C + J + A, 1, D + ' +lat_0=39' + KX + Ln + l + q + C + E + A, 1, D + ' +lat_0=39' + KX + Ln + l + q + C + J + A, 1, D + ' +lat_0=40.45' + Pq + Yc + l + q + C + E + A, 1, D + ' +lat_0=40.45' + Pq + Yc + l + q + C + J + A, 1, D + ' +lat_0=40.05' + Ud + OQ + l + q + C + E + A, 1, D + ' +lat_0=40.05' + Ud + OQ + l + q + C + J + A, 1, D + Yd + Pr + OR + l + q + C + E + A, 1, D + Yd + Pr + OR + l + q + C + J + A, 1, D + ' +lat_0=39' + Tt + Zn + l + q + C + E + A, 1, D + ' +lat_0=39' + Tt + Zn + l + q + C + J + A, 1, D + ' +lat_0=40.4' + Ue + Ln + l + q + C + E + A, 1, D + ' +lat_0=40.4' + Ue + Ln + l + q + C + J + A, 1, D + Pp + Uf + Qv + l + q + C + E + A, 1, D + Pp + Uf + Qv + l + q + C + J + A, 1, D + Tu + Ug + ' +k=1.000021' + l + q + C + E + A, 1, D + Tu + Ug + ' +k=1.000021' + l + q + C + J + A, 1, D + Tv + Uh + ' +k=1.000024' + l + q + C + E + A, 1, D + Tv + Uh + ' +k=1.000024' + l + q + C + J + A, 1, D + ' +lat_0=40.15' + Ui + ' +k=1.000032' + l + q + C + E + A, 1, D + ' +lat_0=40.15' + Ui + ' +k=1.000032' + l + q + C + J + A, 1, D + ' +lat_0=38.1' + Pr + Qw + l + q + C + E + A, 1, D + ' +lat_0=38.1' + Pr + Qw + l + q + C + J + A, 1, D + ' +lat_0=38.45' + KY + ' +k=1.000018' + l + q + C + E + A, 1, D + ' +lat_0=38.45' + KY + ' +k=1.000018' + l + q + C + J + A, 1, D + ' +lat_0=38.65' + Uj + Yc + l + q + C + E + A, 1, D + ' +lat_0=38.65' + Uj + Yc + l + q + C + J + A, 1, D + ' +lat_0=39.1' + Uk + OR + l + q + C + E + A, 1, D + ' +lat_0=39.1' + Uk + OR + l + q + C + J + A, 1, D + Tw + Sq + OR + l + q + C + E + A, 1, D + Tw + Sq + OR + l + q + C + J + A, 1, D + ' +lat_0=38.2' + Sr + Og + l + q + C + E + A, 1, D + ' +lat_0=38.2' + Sr + Og + l + q + C + J + A, 1, D + Tx + KX + ' +k=1.000033' + l + q + C + E + A, 1, D + Tx + KX + ' +k=1.000033' + l + q + C + J + A, 1, D + Ty + Oj + OQ + l + q + C + E + A, 1, D + Ty + Oj + OQ + l + q + C + J + A, 1, D + ' +lat_0=39.95' + Pq + Qw + l + q + C + E + A, 1, D + ' +lat_0=39.95' + Pq + Qw + l + q + C + J + A, 1, D + Qu + Tt + Lm + l + q + C + E + A, 1, D + Qu + Tt + Lm + l + q + C + J + A, 1, D + Tu + Ul + Ye + l + q + C + E + A, 1, D + Tu + Ul + Ye + l + q + C + J + A, 1, D + Tz + ' +lon_0=-85.7' + Ll + l + q + C + E + A, 1, D + Tz + ' +lon_0=-85.7' + Ll + l + q + C + J + A, 1, D + ' +lat_0=39.9' + MQ + Ll + l + q + C + E + A, 1, D + ' +lat_0=39.9' + MQ + Ll + l + q + C + J + A, 1, D + ' +lat_0=39.65' + UA + OR + l + q + C + E + A, 1, D + ' +lat_0=39.65' + UA + OR + l + q + C + J + A, 1, D + ' +lat_0=37.95' + HC + OP + l + q + C + E + A, 1, D + ' +lat_0=37.95' + HC + OP + l + q + C + J + A, 1, D + ' +lat_0=39.75' + Ss + Qs + l + q + C + E + A, 1, D + ' +lat_0=39.75' + Ss + Qs + l + q + C + J + A, 1, D + Tz + HC + Lm + l + q + C + E + A, 1, D + Tz + HC + Lm + l + q + C + J + A, 1, D + Tx + To + Ll + l + q + C + E + A, 1, D + Tx + To + Ll + l + q + C + J + A, 1, D + ' +lat_0=38.7 +lon_0=-85.95' + Yf + l + q + C + E + A, 1, D + ' +lat_0=38.7 +lon_0=-85.95' + Yf + l + q + C + J + A, 1, D + Yg + KY + OP + l + q + C + E + A, 1, D + Yg + KY + OP + l + q + C + J + A, 1, D + ' +lat_0=40.3' + SA + OQ + l + q + C + E + A, 1, D + ' +lat_0=40.3' + SA + OQ + l + q + C + J + A, 1, D + ' +lat_0=38.55' + Um + Qv + l + q + C + E + A, 1, D + ' +lat_0=38.55' + Um + Qv + l + q + C + J + A, 1, D + ' +lat_0=38.8' + UA + Qw + l + q + C + E + A, 1, D + ' +lat_0=38.8' + UA + Qw + l + q + C + J + A, 1, D + Yh + HC + Lm + l + q + C + E + A, 1, D + Yh + HC + Lm + l + q + C + J + A, 1, D + ' +lat_0=38.4' + St + Lk + l + q + C + E + A, 1, D + ' +lat_0=38.4' + St + Lk + l + q + C + J + A, 1, D + Tw + Ss + ' +k=1.000037' + l + q + C + E + A, 1, D + Tw + Ss + ' +k=1.000037' + l + q + C + J + A, 1, D + Yg + Un + Ln + l + q + C + E + A, 1, D + Yg + Un + Ln + l + q + C + J + A, 1, D + Qu + ' +lon_0=-86.75' + OP + l + q + C + E + A, 1, D + Qu + ' +lon_0=-86.75' + OP + l + q + C + J + A, 1, D + ' +lat_0=38.95' + Pr + Qv + l + q + C + E + A, 1, D + ' +lat_0=38.95' + Pr + Qv + l + q + C + J + A, 1, D + ' +lat_0=39.45' + Sr + Lm + l + q + C + E + A, 1, D + ' +lat_0=39.45' + Sr + Lm + l + q + C + J + A, 1, D + Tv + KZ + Ln + l + q + C + E + A, 1, D + Tv + KZ + Ln + l + q + C + J + A, 1, D + Yd + Uo + Yf + l + q + C + E + A, 1, D + Yd + Uo + Yf + l + q + C + J + A, 1, D + Yi + ' +lon_0=-86.7' + Og + l + q + C + E + A, 1, D + Yi + ' +lon_0=-86.7' + Og + l + q + C + J + A, 1, D + ' +lat_0=37.85' + Pq + Lk + l + q + C + E + A, 1, D + ' +lat_0=37.85' + Pq + Lk + l + q + C + J + A, 1, D + Po + ' +lon_0=-87.95' + Ye + l + q + C + E + A, 1, D + Po + ' +lon_0=-87.95' + Ye + l + q + C + J + A, 1, D + ' +lat_0=39.7' + Oj + ' +k=1.000044' + l + q + C + E + A, 1, D + ' +lat_0=39.7' + Oj + ' +k=1.000044' + l + q + C + J + A, 1, D + Yj + ' +lon_0=-85.3' + OQ + l + q + C + E + A, 1, D + Yj + ' +lon_0=-85.3' + OQ + l + q + C + J + A, 1, D + Yh + Up + Zn + l + q + C + E + A, 1, D + Yh + Up + Zn + l + q + C + J + A, 1, D + Po + ' +lon_0=-87.05 +k=1.000014' + l + q + C + E + A, 1, D + Po + ' +lon_0=-87.05 +k=1.000014' + l + q + C + J + A, 1, D + Fo + SA + ' +k=1.000041' + l + q + C + E + A, 1, D + Fo + SA + ' +k=1.000041' + l + q + C + J + A, 1, D + Yj + OS + ' +k=1.000017' + l + q + C + E + A, 1, D + Yj + OS + ' +k=1.000017' + l + q + C + J + A, 1, D + ' +lat_0=40.2' + KZ + Ln + l + q + C + E + A, 1, D + ' +lat_0=40.2' + KZ + Ln + l + q + C + J + A, 1, D + Yi + Su + Lk + l + q + C + E + A, 1, D + Yi + Su + Lk + l + q + C + J + A, 1, D + Ty + St + Og + l + q + C + E + A, 1, D + Ty + St + Og + l + q + C + J + A, 1, D + Pp + ' +lon_0=-85.25' + Ll + l + q + C + E + A, 1, D + Pp + ' +lon_0=-85.25' + Ll + l + q + C + J + A, 3, K + C + B + A, 1, I + JM + C + B + E + A, 1, I + Me + C + B + E + A, 1, I + Rb + C + B + E + A, 152, D + WY + Bu + ' +k=1.0000365285 +x_0=147218.6942 +y_0=0.0037' + C + E + A, 1, D + WZ + Uq + ' +k=1.0000495683 +x_0=172821.9461 +y_0=0.0017' + C + E + A, 1, D + Wa + Ur + ' +k=1.0000486665 +x_0=93150 +y_0=0.0029' + C + E + A, 1, H + Wb + Wc + Us + ' +k_0=1.0000331195 +x_0=228600.4575 +y_0=148551.4837' + C + E + A, 1, D + Nj + ' +lon_0=-88' + Og + ' +x_0=31600 +y_0=4600' + C + E + A, 1, D + Wd + Ut + ' +k=1.0000382778 +x_0=175260.3502 +y_0=0.0048' + C + E + A, 1, H + We + Wf + Uu + ' +k_0=1.0000383841 +x_0=64008.1276 +y_0=59445.9043' + C + E + A, 1, D + Wg + ' +lon_0=-88.5 +k=1.0000286569 +x_0=244754.8893 +y_0=0.0049' + C + E + A, 1, H + Wh + Wi + Uv + ' +k_0=1.0000391127 +x_0=60045.72 +y_0=44091.4346' + C + E + A, 1, D + ' +lat_0=43.6' + Uw + ' +k=1.0000463003 +x_0=199949.1989 +y_0=0.0086' + C + E + A, 1, H + Wj + Wk + Ux + ' +k_0=1.00003498 +x_0=169164.3381 +y_0=111569.6134' + C + E + A, 1, H + aQ + aR + Wl + ' +k_0=1.0000349151 +x_0=113690.6274 +y_0=53703.1201' + C + E + A, 1, H + Zs + Zt + Uy + ' +k_0=1.0000384786 +x_0=247193.2944 +y_0=146591.9896' + C + E + A, 1, D + Wm + Uz + ' +k=1.0000346418 +x_0=263347.7263 +y_0=0.0076' + C + E + A, 1, D + ' +lat_0=44.4' + VA + ' +k=1.0000187521 +x_0=158801.1176 +y_0=0.0023' + C + E + A, 1, D + Wn + Oo + ' +k=1.0000385418 +x_0=59131.3183 +y_0=0.0041' + C + E + A, 1, D + Wo + VB + ' +k=1.0000410324 +x_0=51816.104 +y_0=0.003' + C + E + A, 1, H + Wp + Wq + VC + ' +k_0=1.000035079 +x_0=120091.4402 +y_0=91687.92389999999' + C + E + A, 1, D + Wr + VD + ' +k=1.0000552095 +x_0=133502.6683 +y_0=0.0063' + C + E + A, 1, D + Ws + VE + ' +k=1.0000673004 +x_0=275844.5533 +y_0=0.0157' + C + E + A, 1, D + Wt + ' +lon_0=-90.8 +k=1.0000349452 +x_0=242316.4841 +y_0=0.01' + C + E + A, 1, H + Wu + Wv + VF + ' +k_0=1.0000390487 +x_0=170078.7403 +y_0=45830.2947' + C + E + A, 1, H + Ww + Wx + Ka + ' +k_0=1.0000344057 +x_0=150876.3018 +y_0=79170.7795' + C + E + A, 1, D + Wy + VG + ' +k=1.0000394961 +x_0=113081.0261 +y_0=0.0045' + C + E + A, 1, D + Wz + VH + ' +k=1.0000677153 +x_0=220980.4419 +y_0=0.008500000000000001' + C + E + A, 1, D + XA + VI + ' +k=1.0000353 +x_0=27000 +y_0=25000' + C + E + A, 1, D + XB + VJ + ' +k=1.0000260649 +x_0=185928.3728 +y_0=0.0009' + C + E + A, 1, D + XC + Su + ' +k=1.0000233704 +x_0=79857.7614 +y_0=0.0012' + C + E + A, 1, D + XD + VK + ' +k=1.0000319985 +x_0=130454.6598 +y_0=0.0033' + C + E + A, 1, H + XE + XF + VL + ' +k_0=1.0000627024 +x_0=198425.197 +y_0=105279.7829' + C + E + A, 1, D + XG + VM + ' +k=1.0000599003 +x_0=116129.0323 +y_0=0.0058' + C + E + A, 1, H + XH + XI + ' +lon_0=-89.77 +k_0=1.000053289 +x_0=74676.1493 +y_0=55049.2669' + C + E + A, 1, D + XJ + VN + ' +k=1.0000234982 +x_0=238658.8794 +y_0=0.0032' + C + E + A, 1, D + XK + VO + ' +k=1.0000362499 +x_0=105461.0121 +y_0=0.0029' + C + E + A, 1, H + XL + XM + VP + ' +k_0=1.0000434122 +x_0=204521.209 +y_0=121923.9861' + C + E + A, 1, D + XN + VQ + ' +k=1.0000236869 +x_0=182880.3676 +y_0=0.0033' + C + E + A, 1, H + XO + XP + VR + ' +k_0=1.0000686968 +x_0=70104.1401 +y_0=57588.0346' + C + E + A, 1, H + XQ + XR + VS + ' +k_0=1.0000362977 +x_0=167640.3354 +y_0=86033.0876' + C + E + A, 1, D + XS + Kb + ' +k=1.0000433849 +x_0=141732.2823 +y_0=0.0059' + C + E + A, 1, H + XT + XU + ' +lon_0=-89.5 +k_0=1.000039936 +x_0=56388.1128 +y_0=50022.1874' + C + E + A, 1, D + XV + VT + ' +k=1.0000649554 +x_0=227990.8546 +y_0=0.0109' + C + E + A, 1, H + Zu + Zv + VU + ' +k_0=1.0000375653 +x_0=202387.6048 +y_0=134255.4253' + C + E + A, 1, D + XW + VV + ' +k=1.0000337311 +x_0=146304.2926 +y_0=0.0068' + C + E + A, 1, D + XX + VW + ' +k=1.0000495976 +x_0=250546.1013 +y_0=0.0234' + C + E + A, 1, D + XY + VX + ' +k=1.0000373868 +x_0=185623.5716 +y_0=0.0051' + C + E + A, 1, H + XZ + Xa + VY + ' +k_0=1.0000573461 +x_0=216713.2336 +y_0=120734.1631' + C + E + A, 1, D + LJ + VZ + ' +k=1.000032144 +x_0=262433.3253 +y_0=0.009599999999999999' + C + E + A, 1, D + LJ + Kb + ' +k=1.0000381803 +x_0=165506.7302 +y_0=0.0103' + C + E + A, 1, H + Xb + Xc + Va + ' +k_0=1.0000597566 +x_0=187147.5744 +y_0=107746.7522' + C + E + A, 1, D + Xd + Vb + ' +k=1.0000361538 +x_0=256946.9138 +y_0=0.0041' + C + E + A, 1, H + Xe + Xf + Vc + ' +k_0=1.0000408158 +x_0=222504.4451 +y_0=47532.0602' + C + E + A, 1, H + Xg + Xh + Vd + ' +k_0=1.0000730142 +x_0=134417.0689 +y_0=50337.1092' + C + E + A, 1, H + Xi + Xj + Ve + ' +k_0=1.0000367192 +x_0=232562.8651 +y_0=111088.2224' + C + E + A, 1, H + Xk + Xl + Vf + ' +k_0=1.0000475376 +x_0=234086.8682 +y_0=188358.6058' + C + E + A, 1, D + Xm + Vg + ' +k=1.00003738 +x_0=120091.4415 +y_0=0.003' + C + E + A, 1, D + Xn + Vh + ' +k=1.0000346179 +x_0=208788.418 +y_0=0.0034' + C + E + A, 1, D + Xo + Vi + ' +k=1.0000333645 +x_0=185013.9709 +y_0=0.007' + C + E + A, 1, H + Xp + Xq + Ka + ' +k_0=1.0000392096 +x_0=120091.4402 +y_0=45069.7587' + C + E + A, 1, H + Xr + Xs + Bu + ' +k_0=1.0000421209 +x_0=208483.6173 +y_0=134589.754' + C + E + A, 1, D + WY + Bu + ' +k=1.0000365285 +x_0=147218.6941325883 +y_0=0.00365760731521463' + C + J + A, 1, D + WZ + Uq + ' +k=1.0000495683 +x_0=172821.945948692 +y_0=0.001828803657607315' + C + J + A, 1, D + Wa + Ur + ' +k=1.0000486665 +x_0=93150' + IX + C + J + A, 1, H + Wb + Wc + Us + ' +k_0=1.0000331195 +x_0=228600.4575057151 +y_0=148551.4835661671' + C + J + A, 1, D + Nj + ' +lon_0=-88' + Og + ' +x_0=31599.99989839979 +y_0=4599.999898399797' + C + J + A, 1, D + Wd + Ut + ' +k=1.0000382778 +x_0=175260.3502159004' + Vj + C + J + A, 1, H + We + Wf + Uu + ' +k_0=1.0000383841 +x_0=64008.12771145543 +y_0=59445.90419100838' + C + J + A, 1, D + Wg + ' +lon_0=-88.5 +k=1.0000286569 +x_0=244754.8892049784' + Vj + C + J + A, 1, H + Wh + Wi + Uv + ' +k_0=1.0000391127 +x_0=60045.72009144018 +y_0=44091.43449326898' + C + J + A, 1, D + ' +lat_0=43.6' + Uw + ' +k=1.0000463003 +x_0=199949.198983998' + Vk + C + J + A, 1, H + Wj + Wk + Ux + ' +k_0=1.00003498 +x_0=169164.338023876 +y_0=111569.613512827' + C + J + A, 1, H + aQ + aR + Wl + ' +k_0=1.0000349151 +x_0=113690.6273812548 +y_0=53703.12024384048' + C + J + A, 1, H + Zs + Zt + Uy + ' +k_0=1.0000384786 +x_0=247193.2943865888 +y_0=146591.9896367793' + C + J + A, 1, D + Wm + Uz + ' +k=1.0000346418 +x_0=263347.7263906528 +y_0=0.00762001524003048' + C + J + A, 1, D + ' +lat_0=44.4' + VA + ' +k=1.0000187521 +x_0=158801.1176022352 +y_0=0.002438404876809754' + C + J + A, 1, D + Wn + Oo + ' +k=1.0000385418 +x_0=59131.31826263652' + Vl + C + J + A, 1, D + Wo + VB + ' +k=1.0000410324 +x_0=51816.10393700787' + IX + C + J + A, 1, H + Wp + Wq + VC + ' +k_0=1.000035079' + Ys + ' +y_0=91687.92390144781' + C + J + A, 1, D + Wr + VD + ' +k=1.0000552095 +x_0=133502.6682245364 +y_0=0.006400812801625603' + C + J + A, 1, D + Ws + VE + ' +k=1.0000673004 +x_0=275844.5532131065 +y_0=0.0158496316992634' + C + J + A, 1, D + Wt + ' +lon_0=-90.8 +k=1.0000349452 +x_0=242316.484023368 +y_0=0.01005842011684023' + C + J + A, 1, H + Wu + Wv + VF + ' +k_0=1.0000390487 +x_0=170078.7401574803 +y_0=45830.29484378968' + C + J + A, 1, H + Ww + Wx + Ka + ' +k_0=1.0000344057 +x_0=150876.3017526035 +y_0=79170.77937515875' + C + J + A, 1, D + Wy + VG + ' +k=1.0000394961 +x_0=113081.0261620523 +y_0=0.004572009144018288' + C + J + A, 1, D + Wz + VH + ' +k=1.0000677153 +x_0=220980.4419608839' + Vk + C + J + A, 1, D + XA + VI + ' +k=1.0000353 +x_0=27000 +y_0=24999.99989839979' + C + J + A, 1, D + XB + VJ + ' +k=1.0000260649 +x_0=185928.3727711455 +y_0=0.0009144018288036576' + C + J + A, 1, D + XC + Su + ' +k=1.0000233704 +x_0=79857.76154432308 +y_0=0.001219202438404877' + C + J + A, 1, D + XD + VK + ' +k=1.0000319985 +x_0=130454.6596901194' + Op + C + J + A, 1, H + XE + XF + VL + ' +k_0=1.0000627024 +x_0=198425.1968503937 +y_0=105279.7828803657' + C + J + A, 1, D + XG + VM + ' +k=1.0000599003 +x_0=116129.0322580645' + Vm + C + J + A, 1, H + XH + XI + ' +lon_0=-89.77 +k_0=1.000053289 +x_0=74676.1493522987 +y_0=55049.26695453391' + C + J + A, 1, D + XJ + VN + ' +k=1.0000234982 +x_0=238658.8794513589' + IX + C + J + A, 1, D + XK + VO + ' +k=1.0000362499 +x_0=105461.0121412243' + IX + C + J + A, 1, H + XL + XM + VP + ' +k_0=1.0000434122 +x_0=204521.2090424181 +y_0=121923.9861823724' + C + J + A, 1, D + XN + VQ + ' +k=1.0000236869 +x_0=182880.3675895352' + Op + C + J + A, 1, H + XO + XP + VR + ' +k_0=1.0000686968 +x_0=70104.14020828041 +y_0=57588.03474726949' + C + J + A, 1, H + XQ + XR + VS + ' +k_0=1.0000362977 +x_0=167640.3352806706 +y_0=86033.08773177546' + C + J + A, 1, D + XS + Kb + ' +k=1.0000433849 +x_0=141732.2822453645' + Vm + C + J + A, 1, H + XT + XU + ' +lon_0=-89.5 +k_0=1.000039936 +x_0=56388.11277622555 +y_0=50022.1874523749' + C + J + A, 1, D + XV + VT + ' +k=1.0000649554 +x_0=227990.8544577089 +y_0=0.01097282194564389' + C + J + A, 1, H + Zu + Zv + VU + ' +k_0=1.0000375653 +x_0=202387.6047752095 +y_0=134255.4254508509' + C + J + A, 1, D + XW + VV + ' +k=1.0000337311 +x_0=146304.2926085852 +y_0=0.006705613411226822' + C + J + A, 1, D + XX + VW + ' +k=1.0000495976 +x_0=250546.1013970028 +y_0=0.02346964693929388' + C + J + A, 1, D + XY + VX + ' +k=1.0000373868 +x_0=185623.5715519431 +y_0=0.005181610363220727' + C + J + A, 1, H + XZ + Xa + VY + ' +k_0=1.0000573461 +x_0=216713.2337312675 +y_0=120734.1631699263' + C + J + A, 1, D + LJ + VZ + ' +k=1.000032144 +x_0=262433.3251714504 +y_0=0.009448818897637795' + C + J + A, 1, D + LJ + Kb + ' +k=1.0000381803 +x_0=165506.7300990602 +y_0=0.01036322072644145' + C + J + A, 1, H + Xb + Xc + Va + ' +k_0=1.0000597566 +x_0=187147.5742951486 +y_0=107746.7521463043' + C + J + A, 1, D + Xd + Vb + ' +k=1.0000361538 +x_0=256946.9138938278' + Vl + C + J + A, 1, H + Xe + Xf + Vc + ' +k_0=1.0000408158 +x_0=222504.44500889 +y_0=47532.0603505207' + C + J + A, 1, H + Xg + Xh + Vd + ' +k_0=1.0000730142 +x_0=134417.0688341377 +y_0=50337.10927101854' + C + J + A, 1, H + Xi + Xj + Ve + ' +k_0=1.0000367192 +x_0=232562.8651257302 +y_0=111088.2224028448' + C + J + A, 1, H + Xk + Xl + Vf + ' +k_0=1.0000475376 +x_0=234086.8681737363 +y_0=188358.6059436119' + C + J + A, 1, D + Xm + Vg + ' +k=1.00003738 +x_0=120091.4414020828' + IX + C + J + A, 1, D + Xn + Vh + ' +k=1.0000346179 +x_0=208788.4178816358' + Op + C + J + A, 1, D + Xo + Vi + ' +k=1.0000333645 +x_0=185013.9709423419 +y_0=0.007010414020828041' + C + J + A, 1, H + Xp + Xq + Ka + ' +k_0=1.0000392096' + Ys + ' +y_0=45069.7588011176' + C + J + A, 1, H + Xr + Xs + Bu + ' +k_0=1.0000421209 +x_0=208483.6172720346 +y_0=134589.7539243078' + C + J + A, 41, K + C + A, 6, D + L + ' +lon_0=68.51666666666667 +k=1 +x_0=1300000' + RX + C + E + A, 1, D + L + ' +lon_0=71.51666666666667 +k=1' + aB + RX + C + E + A, 1, D + L + ' +lon_0=74.51666666666667 +k=1' + aC + RX + C + E + A, 1, D + L + ' +lon_0=77.51666666666667 +k=1' + aD + RX + C + E + A, 1, D + L + ' +lon_0=80.51666666666667 +k=1 +x_0=5300000' + RX + C + E + A, 12308, D + L + Gl + ' +k=1' + DP + N + M + G + E + A, 1, D + L + HO + ' +k=1' + Eg + N + M + G + E + A, 1, D + L + IG + ' +k=1' + Jt + N + M + G + E + A, 1, D + L + LN + ' +k=1' + IM + N + M + G + E + A, 1, D + L + JS + ' +k=1' + MS + N + M + G + E + A, 1, D + L + PS + ' +k=1' + MT + N + M + G + E + A, 1, D + L + RL + ' +k=1' + LY + N + M + G + E + A, 1, D + L + QW + ' +k=1' + Jp + N + M + G + E + A, 1, D + L + RM + ' +k=1' + LZ + N + M + G + E + A, 1, D + L + HP + ' +k=1' + HU + N + M + G + E + A, 1, D + L + HQ + ' +k=1' + Gw + N + M + G + E + A, 1, D + L + Hd + ' +k=1' + Hu + N + M + G + E + A, 1, D + L + HR + ' +k=1' + Hv + N + M + G + E + A, 1, D + L + HS + ' +k=1' + It + N + M + G + E + A, 1, D + L + EN + ' +k=1' + Hs + N + M + G + E + A, 1, D + L + Fy + ' +k=1' + Ht + N + M + G + E + A, 1, D + L + Fm + ' +k=1' + HV + N + M + G + E + A, 1, D + L + Fr + ' +k=1' + Hw + N + M + G + E + A, 1, D + L + Ed + ' +k=1' + HW + N + M + G + E + A, 1, D + L + Fn + ' +k=1' + Hx + N + M + G + E + A, 1, D + L + Pf + ' +k=1' + La + N + M + G + E + A, 1, D + L + Od + ' +k=1' + Hy + N + M + G + E + A, 1, D + L + NY + ' +k=1' + Hz + N + M + G + E + A, 1, D + L + Pg + ' +k=1' + IA + N + M + G + E + A, 1, D + L + NZ + ' +k=1' + IB + N + M + G + E + A, 1, D + L + Lf + ' +k=1' + Gx + N + M + G + E + A, 1, D + L + KG + ' +k=1' + IT + N + M + G + E + A, 1, D + L + KH + ' +k=1' + Gc + N + M + G + E + A, 1, D + L + Lh + ' +k=1' + IU + N + M + G + E + A, 103, I + Ki + c + HX + E + A, 1, I + Mf + c + HX + E + A, 1, I + KD + c + HX + E + A, 1, I + JZ + c + HX + E + A, 111, I + Mi + o + x + r + E + A, 1, I + NS + o + x + r + E + A, 1, I + Mg + o + x + r + E + A, 1, I + NT + o + x + r + E + A, 1, I + Ot + o + x + r + E + A, 1, I + Nv + o + x + r + E + A, 1, I + PM + o + x + r + E + A, 1, I + Re + o + x + r + E + A, 1, I + SM + o + x + r + E + A, 1, I + MA + o + x + r + E + A, 91, I + Mi + o + x + CB + E + A, 1, I + NS + o + x + CB + E + A, 1, I + Mg + o + x + CB + E + A, 1, I + NT + o + x + CB + E + A, 1, I + Ot + o + x + CB + E + A, 1, I + Nv + o + x + CB + E + A, 1, I + PM + o + x + CB + E + A, 1, I + Re + o + x + CB + E + A, 80, I + Mf + R + Cm + E + A, 1, I + KD + R + Cm + E + A, 1, I + JZ + R + Cm + E + A, 1, I + JM + R + Cm + E + A, 1, I + Me + R + Cm + E + A, 59, I + JM + R + Cm + E + A, 39, I + JZ + M + NL + E + A, 1, I + JM + M + NL + E + A, 251, D + BY + ' +lon_0=1 +k=1' + h + Hk + R + EV + Zb + E + A, 1, D + BY + ' +lon_0=1 +k=1' + s + N + R + EV + Zb + E + A, 31, I + Io + o + R + Ec + E + A, 1, I + MB + o + R + Ec + E + A, 1, I + Nx + o + R + Ec + E + A, 110, I + NR + o + Bc + BS + In + E + A, 1, I + Ki + o + Bc + BS + In + E + A, 1, I + Mf + o + Bc + BS + In + E + A, 99, I + Ki + o + c + ER + E + A, 1, I + Mf + o + c + ER + E + A, 1, I + KD + o + c + ER + E + A, 58, I + Ki + c + ER + E + A, 1, I + Mf + c + ER + E + A, 1, I + KD + c + ER + E + A, 51, I + Mh + o + Y + Cj + E + A, 1, I + Mi + o + Y + Cj + E + A, 1, I + NS + o + Y + Cj + E + A, 141, D + L + NU + EP + u + N + c + Jw + E + A, 1, D + ' +lat_0=13.17638888888889 +lon_0=-59.55972222222222 +k=0.9999986' + Zl + ' +y_0=75000' + c + Jw + E + A, 121, D + L + HP + ' +k=1' + HU + N + M + U + E + A, 1, D + L + HQ + ' +k=1' + Gw + N + M + U + E + A, 1, D + L + Hd + ' +k=1' + Hu + N + M + U + E + A, 1, D + L + HR + ' +k=1' + Hv + N + M + U + E + A, 1, D + L + HS + ' +k=1' + It + N + M + U + E + A, 1, D + L + EN + ' +k=1' + Hs + N + M + U + E + A, 1, D + L + Fy + ' +k=1' + Ht + N + M + U + E + A, 1, D + L + Fm + ' +k=1' + HV + N + M + U + E + A, 1, D + L + Fr + ' +k=1' + Hw + N + M + U + E + A, 1, D + L + Ed + ' +k=1' + HW + N + M + U + E + A, 1, D + L + Fn + ' +k=1' + Hx + N + M + U + E + A, 30, D + L + HP + ' +k=1' + O + N + M + U + E + A, 1, D + L + HQ + ' +k=1' + O + N + M + U + E + A, 1, D + L + Hd + ' +k=1' + O + N + M + U + E + A, 1, D + L + HR + ' +k=1' + O + N + M + U + E + A, 1, D + L + HS + ' +k=1' + O + N + M + U + E + A, 1, D + L + EN + ' +k=1' + O + N + M + U + E + A, 1, D + L + Fy + ' +k=1' + O + N + M + U + E + A, 1, D + L + Fm + ' +k=1' + O + N + M + U + E + A, 1, D + L + Fr + ' +k=1' + O + N + M + U + E + A, 1, D + L + Ed + ' +k=1' + O + N + M + U + E + A, 1, D + L + Fn + ' +k=1' + O + N + M + U + E + A, 37, H + Ks + Kt + Hr + HN + Bn + ' +y_0=5400000' + R + ' +pm=brussels' + E + A, 280, Pu + Kj + HN + ' +k_0=1' + s + N + Y + Gf + ' +pm=bern' + E + A, 1, Pu + Kj + Ow + ' +k_0=1' + a + IK + Y + Gf + E + A, 1, Pu + Kj + Ow + ' +k_0=1' + s + N + Y + Gf + E + A, 36, I + IC + R + ES + E + A, 78, D + LK + ' +lon_0=-77.08091666666667 +k=1' + BZ + AH + R + ES + E + A, 1, D + LK + ' +lon_0=-74.08091666666667 +k=1' + BZ + AH + R + ES + E + A, 1, D + LK + ' +lon_0=-71.08091666666667 +k=1' + BZ + AH + R + ES + E + A, 1, D + LK + ' +lon_0=-68.08091666666667 +k=1' + BZ + AH + R + ES + E + A, 133, I + JN + o + c + GO + E + A, 1, I + KC + o + c + GO + E + A, 58, D + L + ' +lon_0=11.5' + AP + O + Ak + c + GO + E + A, 1, D + L + IH + AP + O + Ak + c + GO + E + A, 79, D + m + UQ + ' +k=1' + AV + N + C + B + E + A, 1, D + m + MP + ' +k=1' + Ci + N + C + B + E + A, 1, D + m + Pe + ' +k=1' + Bo + N + C + B + E + A, 1, D + m + Qk + ' +k=1' + DP + N + C + B + E + A, 1, D + m + US + ' +k=1' + Eg + N + C + B + E + A, 1, D + m + Zc + ' +k=1' + Jt + N + C + B + E + A, 1, D + m + Nb + ' +k=1' + IM + N + C + B + E + A, 4, D + m + UQ + ' +k=1' + AV + N + j + B + E + A, 1, D + m + MP + ' +k=1' + Ci + N + j + B + E + A, 1, D + m + Pe + ' +k=1' + Bo + N + j + B + E + A, 1, D + m + Qk + ' +k=1' + DP + N + j + B + E + A, 1, D + m + US + ' +k=1' + Eg + N + j + B + E + A, 1, D + m + Zc + ' +k=1' + Jt + N + j + B + E + A, 1, D + m + Nb + ' +k=1' + IM + N + j + B + E + A, 4, D + m + UQ + ' +k=1' + AV + N + R + Bs + E + A, 1, D + m + MP + ' +k=1' + Ci + N + R + Bs + E + A, 1, D + m + Pe + ' +k=1' + Bo + N + R + Bs + E + A, 1, D + m + Qk + ' +k=1' + DP + N + R + Bs + E + A, 1, D + m + US + ' +k=1' + Eg + N + R + Bs + E + A, 1, D + m + Zc + ' +k=1' + Jt + N + R + Bs + E + A, 1, D + m + Nb + ' +k=1' + IM + N + R + Bs + E + A, 37, I + NR + o + Bc + BS + Ax + E + A, 1, I + Ki + o + Bc + BS + Ax + E + A, 40, D + L + Gj + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + UE + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + RI + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + Gl + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + SP + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + RJ + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + HO + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + ' +lon_0=29 +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + QQ + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L + IG + ' +k=1' + s + N + Gk + Bc + BS + Ax + E + A, 39, I + JN + AU + BN + Gi + E + A, 59, H + ' +lat_1=36' + GM + ' +lon_0=9.9' + QL + O + Hk + AU + BN + Gi + E + A, 1, H + Sd + Se + ' +lon_0=9.9' + Nk + O + Hk + AU + BN + Gi + E + A, 129, I + ID + o + R + GR + E + A, 1, I + Io + o + R + GR + E + A, 1, I + MB + o + R + GR + E + A, 1, I + Nx + o + R + GR + E + A, 1, I + Nr + o + R + GR + E + A, 175, H + aL + ' +lat_0=34.65 +lon_0=37.35 +k_0=0.9996256' + AI + Hk + AU + BN + HI + E + A, 70, H + aL + ' +lat_0=34.65 +lon_0=37.35 +k_0=0.9996256' + AI + Hk + AU + BN + HI + E + A, 10, GU + ' +lat_0=34.2 +lon_0=39.15 +k=0.9995341' + s + N + AU + BN + HI + E + A, 211, D + Gm + ' +lon_0=35 +k=1' + AI + ' +y_0=1100000' + Gn + HY + E + A, 1, D + Gm + QQ + ' +k=1 +x_0=615000 +y_0=810000' + Gn + HY + E + A, 1, D + Gm + HO + ' +k=1' + EW + IK + Gn + HY + E + A, 1, D + Gm + HO + ' +k=1' + EW + Tj + Gn + HY + E + A, 34, I + Ja + R + n + E + A, 1, I + KA + R + n + E + A, 1, I + Oq + R + n + E + A, 1, I + QD + R + n + E + A, 1, I + JN + R + n + E + A, 1, I + KC + R + n + E + A, 1, I + NR + R + n + E + A, 1, I + Ki + R + n + E + A, 1, I + Mf + R + n + E + A, 1, I + KD + R + n + E + A, 1, I + JZ + R + n + E + A, 52, D + L + HN + AP + O + N + R + n + E + A, 5, D + L + ' +lon_0=5' + AP + O + N + R + n + E + A, 144, I + JM + c + NM + E + A, 1, I + Me + c + NM + E + A, 460, Pu + ' +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000' + IK + aK + RE + E + A, 130, D + L + ' +lon_0=94.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=97.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=100.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=103.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=106.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=109.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=112.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=115.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=118.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=121.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=124.5' + V + h + DQ + j + B + E + A, 1, D + L + Pj + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=130.5' + V + h + DQ + j + B + E + A, 1, D + L + Tk + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=136.5' + V + h + DQ + j + B + E + A, 1, D + L + ' +lon_0=139.5' + V + h + DQ + j + B + E + A, 1, I + QF + IR + Bh + Av + E + A, 1, I + Ny + IR + Bh + Av + E + A, 1, I + Mh + IR + Bh + Av + E + A, 1, I + Mi + IR + Bh + Av + E + A, 1, I + NS + IR + Bh + Av + E + A, 1, I + Mg + IR + Bh + Av + E + A, 1, I + NT + IR + Bh + Av + E + A, 14, I + QF + j + B + E + A, 1, I + Ny + j + B + E + A, 1, I + Mh + j + B + E + A, 1, I + Mi + j + B + E + A, 1, I + NS + j + B + E + A, 1, I + Mg + j + B + E + A, 1, I + NT + j + B + E + A, 5, I + Ny + o + j + B + E + A, 1, I + Mh + o + j + B + E + A, 1, I + Mi + o + j + B + E + A, 1, I + NS + o + j + B + E + A, 1, I + Mg + o + j + B + E + A, 1, I + NT + o + j + B + E + A, 1, I + Ot + o + j + B + E + A, 1, I + Nv + o + j + B + E + A, 3, I + Ny + o + IR + Bh + Av + E + A, 1, I + Mh + o + IR + Bh + Av + E + A, 1, I + Mi + o + IR + Bh + Av + E + A, 1, I + NS + o + IR + Bh + Av + E + A, 1, I + Mg + o + IR + Bh + Av + E + A, 1, I + NT + o + IR + Bh + Av + E + A, 1, I + Ot + o + IR + Bh + Av + E + A, 1, I + Nv + o + IR + Bh + Av + E + A, 52, I + QF + By + Ay + JR + E + A, 1, I + Ny + By + Ay + JR + E + A, 1, I + Mh + By + Ay + JR + E + A, 99, I + Ny + By + Ay + NN + E + A, 1, I + Mh + By + Ay + NN + E + A, 52, H + ' +lat_1=18' + OX + Ld + ' +k_0=1 +x_0=167638.49597 +y_0=121918.90616' + RB + RC + ML + A, 100, H + ' +lat_1=18' + OX + Ld + ' +k_0=1' + Bv + ' +y_0=150000' + i + TG + E + A, 105, I + Te + By + Ay + JQ + E + A, 1, I + QF + By + Ay + JQ + E + A, 5, I + Rb + Lp + Hp + GQ + E + A, 1, I + Rc + Lp + Hp + GQ + E + A, 1, I + SO + Lp + Hp + GQ + E + A, 29, I + Rc + Go + CT + BT + E + A, 1, I + SO + Go + CT + BT + E + A, 1, I + Td + Go + CT + BT + E + A, 1, I + Te + Go + CT + BT + E + A, 1, I + QF + Go + CT + BT + E + A, 1, I + Ny + Go + CT + BT + E + A, 23, H + Sc + ' +lat_0=39.5 +lon_0=68 +k_0=0.99846154 +x_0=2153865.73916853 +y_0=2368292.194628102' + HK + Gv + GT + A, 1, H + Qq + Li + ' +lon_0=68' + Fz + JX + JY + HK + Gv + GT + A, 1, H + UM + IQ + ' +lon_0=74' + Fz + JX + JY + HK + Gv + GT + A, 1, H + ' +lat_1=19 +lat_0=19 +lon_0=80' + Fz + JX + JY + HK + Gv + GT + A, 1, H + ' +lat_1=12 +lat_0=12 +lon_0=80' + Fz + JX + JY + HK + Gv + GT + A, 1, H + UM + IQ + Hq + Fz + ' +x_0=2743185.69 +y_0=914395.23' + By + Ay + JQ + E + A, 1, H + Qq + Li + ' +lon_0=68' + Fz + ' +x_0=2743196.4 +y_0=914398.8' + Lp + Hp + GQ + E + A, 1, H + UM + IQ + ' +lon_0=74' + Fz + ' +x_0=2743196.4 +y_0=914398.8' + Lp + Hp + GQ + E + A, 1, H + Qq + Li + ' +lon_0=68' + Fz + PX + Qa + Go + CT + BT + E + A, 1, H + UM + IQ + ' +lon_0=74' + Fz + PX + Qa + Go + CT + BT + E + A, 1, H + UM + IQ + Hq + Fz + PX + Qa + Go + CT + BT + E + A, 1, H + ' +lat_1=19 +lat_0=19 +lon_0=80' + Fz + PX + Qa + Go + CT + BT + E + A, 1, H + UM + IQ + Hq + Fz + JX + JY + HK + Gv + GT + A, 1, H + ' +lat_1=12 +lat_0=12 +lon_0=80' + Fz + PX + Qa + Go + CT + BT + E + A, 117, Ck + ' +lat_0=1.287646666666667 +lon_0=103.8530022222222' + Zl + ' +y_0=30000' + GL + Bz + BV + E + A, 47, I + Ny + GL + Bz + BV + E + A, 1, I + Mh + GL + Bz + BV + E + A, 52, H + Qq + Li + JS + PZ + AV + aG + c + Qh + E + A, 118, I + IC + R + Hc + E + A, 1, I + Hi + R + Hc + E + A, 1, I + Gz + R + Hc + E + A, 97, I + Ik + R + AX + E + A, 1, I + IC + R + AX + E + A, 1, I + Hi + R + AX + E + A, 1, I + Gz + R + AX + E + A, 1, I + ID + R + AX + E + A, 56, I + Ik + o + R + AX + E + A, 1, I + IC + o + R + AX + E + A, 1, I + Hi + o + R + AX + E + A, 1, I + Gz + o + R + AX + E + A, 1, I + ID + o + R + AX + E + A, 1, I + Io + o + R + AX + E + A, 9, D + ' +lat_0=-6 +lon_0=-80.5 +k=0.99983008 +x_0=222000 +y_0=1426834.743' + R + AX + E + A, 1, D + ' +lat_0=-9.5 +lon_0=-76 +k=0.99932994 +x_0=720000 +y_0=1039979.159' + R + AX + E + A, 1, D + ' +lat_0=-9.5' + IL + ' +k=0.99952992 +x_0=1324000 +y_0=1040084.558' + R + AX + E + A, 107, D + Vp + ' +lon_0=-1' + Rv + ' +x_0=274319.51' + N + c + TR + E + A, 231, I + QD + AU + BN + E + A, 160, D + L + Fm + CP + O + N + i + GC + E + A, 1, D + L + ZU + CP + O + N + i + GC + E + A, 1, D + L + ZV + CP + O + N + i + GC + E + A, 1, D + L + Fr + CP + O + N + i + GC + E + A, 1, D + L + Ru + CP + O + N + i + GC + E + A, 433, I + Ja + C + B + E + A, 1, I + KA + C + B + E + A, 1, I + Oq + C + B + E + A, 1, I + QD + C + B + E + A, 1, I + JN + C + B + E + A, 1, I + KC + C + B + E + A, 1, I + NR + C + B + E + A, 1, I + Ki + C + B + E + A, 1, I + Mf + C + B + E + A, 1, I + KD + C + B + E + A, 47, D + L + II + AP + O + N + C + B + E + A, 48, I + JN + o + R + Qd + E + A, 259, H + Sd + Se + Yk + Nk + O + Hk + AU + BN + IO + E + A, 1, H + ' +lat_1=29.7 +lat_0=29.7' + Yk + ' +k_0=0.9996155960000001' + O + Hk + AU + BN + IO + E + A, 2, H + ' +lat_1=26.1 +lat_0=26.1' + Yk + ' +k_0=0.999616304 +x_0=1200000' + Is + AU + BN + IO + E + A, 1, H + ' +lat_1=22.5 +lat_0=22.5' + Yk + ' +k_0=0.999616437' + AV + Is + AU + BN + IO + E + A, 42, I + KD + Y + Tc + E + A, 94, I + QD + c + GS + E + A, 1, I + JN + c + GS + E + A, 59, D + Qi + ' +lon_0=4.5' + Rv + ' +x_0=230738.26' + N + c + GS + E + A, 1, D + Qi + ' +lon_0=8.5' + Rv + ' +x_0=670553.98' + N + c + GS + E + A, 1, D + Qi + ' +lon_0=12.5' + Rv + ' +x_0=1110369.7' + N + c + GS + E + A, 239, I + JN + AU + BN + NO + E + A, 60, I + JN + o + AU + BN + NO + E + A, 9, I + SK + X + E + A, 1, I + TV + X + E + A, 1, I + Xz + X + E + A, 1, I + TY + X + E + A, 1, I + RG + X + E + A, 1, I + Ro + X + E + A, 1, I + RH + X + E + A, 1, I + TW + X + E + A, 1, I + TX + X + E + A, 1, I + QE + X + E + A, 1, I + Ns + X + E + A, 1, I + Nt + X + E + A, 1, I + Nu + X + E + A, 1, I + Nw + X + E + A, 1, I + NP + X + E + A, 1, I + NQ + X + E + A, 1, I + Ik + X + E + A, 1, I + IC + X + E + A, 1, I + Hi + X + E + A, 1, I + Gz + X + E + A, 1, I + ID + X + E + A, 1, I + Io + X + E + A, 7, D + IY + IV + Pc + e + N + X + J + A, 1, D + Gm + OS + BG + e + N + X + J + A, 1, CU + ' +lat_0=57' + Ku + Kv + V + ' +x_0=5000000.001016002 +y_0=-5000000.001016002' + KE + GZ + X + J + A, 1, D + Ft + YN + V + e + N + X + J + A, 1, D + Ft + YO + V + e + N + X + J + A, 1, D + Ft + ON + V + e + N + X + J + A, 1, D + Ft + Ms + V + e + N + X + J + A, 1, D + Ft + KI + V + e + N + X + J + A, 1, D + Ft + YP + V + ' +x_0=213360.4267208534' + N + X + J + A, 1, D + Ft + YQ + V + e + N + X + J + A, 1, D + Ft + SW + V + Px + N + X + J + A, 1, H + Kw + Kx + UK + YR + Bw + N + X + J + A, 1, H + DW + Jn + y + HA + Z + N + X + J + A, 1, H + DX + DY + AA + HA + Z + N + X + J + A, 1, H + Ap + DZ + Ml + AJ + Z + N + X + J + A, 1, H + LO + QS + Da + Mm + Z + N + X + J + A, 1, H + Db + Dc + Mn + Ir + Z + N + X + J + A, 1, H + Dd + De + Df + Iw + Z + N + X + J + A, 2, D + Bl + Cn + V + e + N + X + J + A, 1, D + Bl + Co + V + e + N + X + J + A, 1, D + Bl + Iv + BG + e + N + X + J + A, 1, H + Dx + Dy + BC + IF + Z + N + X + J + A, 1, H + Dz + Mq + EA + IF + Z + N + X + J + A, 1, H + ' +lat_1=39.71666666666667 +lat_2=40.78333333333333' + y + Ba + Z + N + X + J + A, 1, H + LP + LQ + CY + Ba + Z + N + X + J + A, 1, H + Ap + Dg + f + Ba + Z + N + X + J + A, 1, H + Dh + Mo + Di + Jq + Px + N + X + J + A, 1, D + Ch + Cp + Mp + e + N + X + J + A, 1, D + Aq + CR + Am + e + N + X + J + A, 1, D + Aq + Ob + Am + e + N + X + J + A, 1, H + LR + Dj + QT + LS + Z + N + X + J + A, 6, D + Gm + Cq + V + e + N + X + J + A, 1, D + Gm + Cr + V + e + N + X + J + A, 1, D + p + Cs + BJ + e + N + X + J + A, 1, D + p + Jb + BJ + e + N + X + J + A, 1, D + p + Ix + BG + e + N + X + J + A, 1, D + f + Cz + EQ + e + N + X + J + A, 1, D + f + DA + Am + e + N + X + J + A, 1, D + DM + DB + AO + e + N + X + J + A, 1, D + DM + DC + AO + e + N + X + J + A, 1, H + EB + EC + Fo + GG + Z + N + X + J + A, 1, H + AY + ED + Fs + GG + Z + N + X + J + A, 1, H + EE + EF + AQ + Fl + Z + N + X + J + A, 1, H + EG + EH + f + CV + Z + N + X + J + A, 1, H + Az + DV + DM + Jo + Z + N + X + J + A, 1, H + ' +lat_1=36.73333333333333 +lat_2=37.93333333333333' + AB + EY + Z + N + X + J + A, 1, H + ' +lat_1=31.16666666666667 +lat_2=32.66666666666666 +lat_0=30.66666666666667' + Hg + Z + N + X + J + A, 1, H + ' +lat_1=29.3 +lat_2=30.7 +lat_0=28.66666666666667' + Bi + Z + N + X + J + A, 1, D + AL + HJ + V + e + N + X + J + A, 1, D + BD + DD + AO + e + N + X + J + A, 1, H + ' +lat_1=38.3 +lat_2=39.45' + CY + Ld + ' +x_0=243840.4876809754' + N + X + J + A, 1, H + ' +lat_1=41.71666666666667 +lat_2=42.68333333333333' + Ip + GE + Px + N + X + J + A, 1, H + ' +lat_1=41.28333333333333 +lat_2=41.48333333333333' + Ip + IL + ' +x_0=60960.12192024384' + N + X + J + A, 4, H + ' +lat_1=47.03333333333333 +lat_2=48.63333333333333' + Iq + DE + Z + N + X + J + A, 1, H + ' +lat_1=45.61666666666667 +lat_2=47.05' + IP + Js + Z + N + X + J + A, 1, H + ' +lat_1=43.78333333333333 +lat_2=45.21666666666667' + Nj + Na + Z + N + X + J + A, 1, D + Cb + Ct + Pc + e + N + X + J + A, 1, D + IY + Bx + Am + e + N + X + J + A, 1, D + Cd + RS + BG + e + N + X + J + A, 1, D + Cd + Hg + BG + e + N + X + J + A, 1, D + Id + RT + Am + e + N + X + J + A, 1, H + ' +lat_1=34.41666666666666 +lat_2=33.86666666666667 +lat_0=34.13333333333333' + IW + ' +x_0=1276106.450596901 +y_0=1268253.006858014' + X + J + A, 48, D + AK + HJ + V + BF + N + C + B + J + A, 1, D + BD + DD + AO + HT + N + C + B + J + A, 1, H + FU + FV + Iq + DE + An + Ao + C + B + J + A, 1, H + Ma + FW + IP + Js + An + Ao + C + B + J + A, 1, H + FX + FY + Nj + Na + An + Ao + C + B + J + A, 1, H + JT + Jn + FZ + CS + AG + N + C + B + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + J + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + J + A, 1, D + AK + HJ + V + BF + N + C + B + J + A, 1, D + BD + DD + AO + HT + N + C + B + J + A, 1, H + FU + FV + Iq + DE + An + Ao + C + B + J + A, 1, H + Ma + FW + IP + Js + An + Ao + C + B + J + A, 1, H + FX + FY + Nj + Na + An + Ao + C + B + J + A, 1, H + JT + Jn + FZ + CS + AG + N + C + B + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + J + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + J + A, 1, D + AK + HJ + V + BF + N + C + B + J + A, 1, D + BD + DD + AO + HT + N + C + B + J + A, 1, H + FU + FV + Iq + DE + An + Ao + C + B + J + A, 1, H + Ma + FW + IP + Js + An + Ao + C + B + J + A, 1, H + FX + FY + Nj + Na + An + Ao + C + B + J + A, 1, H + JT + Jn + FZ + CS + AG + N + C + B + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + J + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + J + A, 21, D + L + ET + V + Ab + N + C + B + E + A, 1, D + L + CR + V + Ab + N + C + B + E + A, 1, D + L + NV + V + Ab + N + C + B + E + A, 1, D + L + Jh + V + Ab + N + C + B + E + A, 1, D + L + Bu + V + Ab + N + C + B + E + A, 1, D + L + Rs + V + Ab + N + C + B + E + A, 1, D + L + OZ + V + Ab + N + C + B + E + A, 1, D + L + ' +lon_0=-53' + V + Ab + N + C + B + E + A, 1, D + L + Zd + V + Ab + N + C + B + E + A, 2, I + SK + C + B + E + A, 1, I + TV + C + B + E + A, 1, I + Xz + C + B + E + A, 1, I + TY + C + B + E + A, 1, I + RG + C + B + E + A, 1, I + Ro + C + B + E + A, 1, I + RH + C + B + E + A, 1, I + TW + C + B + E + A, 1, I + TX + C + B + E + A, 1, I + QE + C + B + E + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 1, I + Io + C + B + E + A, 1, I + MB + C + B + E + A, 6, D + IY + IV + Pc + h + N + C + B + E + A, 1, D + Gm + OS + BG + a + N + C + B + E + A, 1, CU + ' +lat_0=57' + Ku + Kv + V + LX + EO + KE + GZ + C + B + E + A, 1, D + Ft + YN + V + O + N + C + B + E + A, 1, D + Ft + YO + V + O + N + C + B + E + A, 1, D + Ft + ON + V + O + N + C + B + E + A, 1, D + Ft + Ms + V + O + N + C + B + E + A, 1, D + Ft + KI + V + O + N + C + B + E + A, 1, D + Ft + YP + V + O + N + C + B + E + A, 1, D + Ft + YQ + V + O + N + C + B + E + A, 1, D + Ft + SW + V + O + N + C + B + E + A, 1, H + Kw + Kx + UK + YR + BZ + N + C + B + E + A, 1, H + DW + Jn + y + HA + Bd + Ae + C + B + E + A, 1, H + DX + DY + AA + HA + Bd + Ae + C + B + E + A, 1, H + Ap + DZ + Ml + AJ + Bd + Ae + C + B + E + A, 1, H + LO + QS + Da + Mm + Bd + Ae + C + B + E + A, 1, H + Db + Dc + Mn + Ir + Bd + Ae + C + B + E + A, 1, H + Dd + De + Df + Iw + Bd + Ae + C + B + E + A, 2, D + Bl + Cn + V + EX + N + C + B + E + A, 1, D + Bl + Co + V + EX + N + C + B + E + A, 1, D + Bl + Iv + BG + EX + N + C + B + E + A, 1, H + Dx + Dy + BC + IF + u + N + C + B + E + A, 1, H + Dz + Mq + EA + IF + u + Is + C + B + E + A, 1, H + Eh + Ei + y + Ba + Fw + Fx + C + B + E + A, 1, H + LP + LQ + CY + Ba + Fw + Fx + C + B + E + A, 1, H + Ap + Dg + f + Ba + Fw + Fx + C + B + E + A, 1, H + Dh + Mo + Di + Jq + QG + QH + C + B + E + A, 1, D + Ch + Cp + Mp + h + N + C + B + E + A, 1, D + Aq + CR + Am + h + N + C + B + E + A, 1, D + Aq + Ob + Am + h + N + C + B + E + A, 1, H + LR + Dj + QT + LS + a + N + C + B + E + A, 1, D + Kn + Sf + AO + O + N + C + B + E + A, 1, D + Ko + KO + AO + O + N + C + B + E + A, 1, D + GV + KI + Jl + O + N + C + B + E + A, 1, D + Kp + Sg + Jl + O + N + C + B + E + A, 1, D + Kq + KP + ' +k=1' + O + N + C + B + E + A, 1, D + Gm + Cq + V + h + N + C + B + E + A, 1, D + Gm + Cr + V + EW + N + C + B + E + A, 1, D + p + Cs + BJ + h + N + C + B + E + A, 1, D + p + Jb + BJ + O + N + C + B + E + A, 1, D + p + Ix + BG + CX + N + C + B + E + A, 1, D + f + Cz + EQ + AI + N + C + B + E + A, 1, D + f + DA + Am + EW + N + C + B + E + A, 1, D + DM + DB + AO + BU + KJ + C + B + E + A, 1, D + DM + DC + AO + HT + KJ + C + B + E + A, 1, H + EB + EC + Fo + GG + AV + AH + C + B + E + A, 1, H + AY + ED + Fs + GG + O + N + C + B + E + A, 1, H + EE + EF + AQ + Fl + u + N + C + B + E + A, 1, H + EG + EH + f + CV + u + Is + C + B + E + A, 2, H + Ej + Ek + AB + EY + O + Ae + C + B + E + A, 1, H + FS + FT + IY + Hg + BZ + N + C + B + E + A, 1, H + OH + OI + OJ + Bi + BZ + N + C + B + E + A, 1, D + AK + HJ + V + AI + N + C + B + E + A, 1, D + BD + DD + AO + HT + N + C + B + E + A, 1, H + MU + Nz + AA + Ld + u + N + C + B + E + A, 1, H + El + Dk + Ip + GE + h + Mk + C + B + E + A, 1, H + Em + En + Ip + IL + O + N + C + B + E + A, 1, H + Eo + Ep + Eq + Jh + Tl + N + C + B + E + A, 1, H + OA + Er + Es + BE + Pk + N + C + B + E + A, 1, H + Bq + OB + Fo + BE + LU + N + C + B + E + A, 1, H + FU + FV + Iq + DE + CX + EK + C + B + E + A, 1, H + Ma + FW + IP + Js + CX + EK + C + B + E + A, 1, H + FX + FY + Nj + Na + CX + EK + C + B + E + A, 1, D + Hj + Ct + CP + AI + N + C + B + E + A, 1, D + Hj + Bx + CP + EW + N + C + B + E + A, 1, D + Cd + RS + BG + Bv + N + C + B + E + A, 1, D + Cd + Hg + BG + O + N + C + B + E + A, 1, D + Id + RT + Am + YC + N + C + B + E + A, 41, I + JM + c + DO + E + A, 1, I + Me + c + DO + E + A, 80, I + Gz + R + TS + E + A, 80, '+proj=nzmg +lat_0=-41 +lon_0=173 +x_0=2510000 +y_0=6023150' + R + W + E + A, 5, D + ' +lat_0=-36.87986527777778 +lon_0=174.7643393611111' + V + AI + DN + R + W + E + A, 1, D + ' +lat_0=-37.76124980555556 +lon_0=176.46619725 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-38.62470277777778 +lon_0=177.8856362777778 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-39.65092930555556 +lon_0=176.6736805277778 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-39.13575830555556 +lon_0=174.22801175 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-39.51247038888889 +lon_0=175.6400368055556 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-40.24194713888889 +lon_0=175.4880996111111 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-40.92553263888889 +lon_0=175.6473496666667 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-41.30131963888888 +lon_0=174.7766231111111 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-40.71475905555556 +lon_0=172.6720465 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-41.27454472222222 +lon_0=173.2993168055555 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-41.28991152777778 +lon_0=172.1090281944444 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-41.81080286111111 +lon_0=171.5812600555556 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-42.33369427777778 +lon_0=171.5497713055556 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-42.68911658333333 +lon_0=173.0101333888889 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-41.54448666666666 +lon_0=173.8020741111111 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-42.88632236111111 +lon_0=170.9799935 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-43.11012813888889 +lon_0=170.2609258333333 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-43.97780288888889 +lon_0=168.606267 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-43.59063758333333 +lon_0=172.7271935833333 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-43.74871155555556 +lon_0=171.3607484722222 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-44.40222036111111 +lon_0=171.0572508333333 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-44.73526797222222 +lon_0=169.4677550833333 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-45.13290258333333 +lon_0=168.3986411944444 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-45.56372616666666 +lon_0=167.7388617777778 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-45.81619661111111 +lon_0=170.6285951666667 +k=1' + AI + DN + R + W + E + A, 1, D + ' +lat_0=-45.86151336111111 +lon_0=170.2825891111111' + Pc + AI + DN + R + W + E + A, 1, D + ' +lat_0=-46.60000961111111 +lon_0=168.342872 +k=1 +x_0=300002.66 +y_0=699999.58' + R + W + E + A, 26, I + MA + o + R + W + E + A, 1, I + Nq + o + R + W + E + A, 1, I + PL + o + R + W + E + A, 31, D + ' +lat_0=-39 +lon_0=175.5 +k=1 +x_0=274319.5243848086 +y_0=365759.3658464114' + R + W + TU + A, 1, D + Za + ' +lon_0=171.5 +k=1 +x_0=457199.2073080143 +y_0=457199.2073080143' + R + W + TU + A, 99, D + Fk + ' +lon_0=-4.666666666666667 +k=1' + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + ' +lon_0=-2.333333333333333 +k=1' + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + HN + ' +k=1' + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + ' +lon_0=2.5 +k=1' + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + Vr + ' +k=1' + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + ' +lon_0=10.16666666666667 +k=1' + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + ' +lon_0=14.16666666666667 +k=1' + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + ' +lon_0=18.33333333333333 +k=1' + s + N + Hn + EL + Aa + SN + E + A, 31, I + KA + R + JL + E + A, 64, D + BY + UZ + ' +k=1 +x_0=180.598 +y_0=-86.98999999999999' + R + JL + E + A, 7, H + PD + PE + ' +lon_0=5.399999999999999 +k_0=0.99950908' + O + Hk + ' +a=6376523' + RA + ZM + E + A, 61, H + PD + PE + HN + ' +k_0=0.999877341' + a + IK + AU + BN + Bk + Lv + E + A, 1, H + ' +lat_1=46.8 +lat_0=46.8' + HN + ' +k_0=0.99987742' + a + IK + AU + BN + Bk + Lv + E + A, 1, H + Xt + Xu + HN + ' +k_0=0.999877499' + a + IK + AU + BN + Bk + Lv + E + A, 1, H + Xv + Xw + HN + ' +k_0=0.99994471 +x_0=234.358 +y_0=185861.369' + AU + BN + Bk + Lv + E + A, 7, H + PD + PE + HN + ' +k_0=0.999877341' + a + Tj + AU + BN + Bk + Lv + E + A, 1, H + ' +lat_1=46.8 +lat_0=46.8' + HN + ' +k_0=0.99987742' + a + ' +y_0=2200000' + AU + BN + Bk + Lv + E + A, 1, H + Xt + Xu + HN + ' +k_0=0.999877499' + a + ' +y_0=3200000' + AU + BN + Bk + Lv + E + A, 1, H + Xv + Xw + HN + ' +k_0=0.99994471 +x_0=234.358 +y_0=4185861.369' + AU + BN + Bk + Lv + E + A, 126, D + ' +lat_0=49 +lon_0=-2 +k=0.9996012717' + u + ' +y_0=-100000' + PV + Lx + E + A, 491, Ck + LH + LI + Qx + ' +y_0=126867.909' + Nc + Nd + DS + E + A, 1, D + LH + LI + ' +k=1' + Qx + ' +y_0=1126867.909' + Nc + Nd + DS + E + A, 1, Ck + LH + LI + Qx + ' +y_0=1126867.909' + Nc + Nd + DS + E + A, 39, I + JN + o + AU + BN + TH + E + A, 116, I + Mh + o + C + B + E + A, 1, I + Mi + o + C + B + E + A, 1, I + NS + o + C + B + E + A, 1, I + Mg + o + C + B + E + A, 1, I + NT + o + C + B + E + A, 1, I + Ot + o + C + B + E + A, 1, I + Nv + o + C + B + E + A, 1, I + PM + o + C + B + E + A, 1, I + Re + o + C + B + E + A, 1, I + SM + o + C + B + E + A, 1, I + MA + o + C + B + E + A, 46, D + L + Gl + ' +k=1' + DP + N + M + F + E + A, 1, D + L + HO + ' +k=1' + Eg + N + M + F + E + A, 1, D + L + IG + ' +k=1' + Jt + N + M + F + E + A, 1, D + L + LN + ' +k=1' + IM + N + M + F + E + A, 1, D + L + JS + ' +k=1' + MS + N + M + F + E + A, 1, D + L + PS + ' +k=1' + MT + N + M + F + E + A, 1, D + L + RL + ' +k=1' + LY + N + M + F + E + A, 1, D + L + QW + ' +k=1' + Jp + N + M + F + E + A, 1, D + L + RM + ' +k=1' + LZ + N + M + F + E + A, 1, D + L + HP + ' +k=1' + HU + N + M + F + E + A, 1, D + L + HQ + ' +k=1' + Gw + N + M + F + E + A, 1, D + L + Hd + ' +k=1' + Hu + N + M + F + E + A, 1, D + L + HR + ' +k=1' + Hv + N + M + F + E + A, 1, D + L + HS + ' +k=1' + It + N + M + F + E + A, 1, D + L + EN + ' +k=1' + Hs + N + M + F + E + A, 1, D + L + Fy + ' +k=1' + Ht + N + M + F + E + A, 1, D + L + Fm + ' +k=1' + HV + N + M + F + E + A, 1, D + L + Fr + ' +k=1' + Hw + N + M + F + E + A, 1, D + L + Ed + ' +k=1' + HW + N + M + F + E + A, 1, D + L + Fn + ' +k=1' + Hx + N + M + F + E + A, 1, D + L + Pf + ' +k=1' + La + N + M + F + E + A, 1, D + L + Od + ' +k=1' + Hy + N + M + F + E + A, 1, D + L + NY + ' +k=1' + Hz + N + M + F + E + A, 1, D + L + Pg + ' +k=1' + IA + N + M + F + E + A, 1, D + L + NZ + ' +k=1' + IB + N + M + F + E + A, 1, D + L + Lf + ' +k=1' + Gx + N + M + F + E + A, 1, D + L + KG + ' +k=1' + IT + N + M + F + E + A, 1, D + L + KH + ' +k=1' + Gc + N + M + F + E + A, 1, D + L + Lh + ' +k=1' + IU + N + M + F + E + A, 168, D + ' +lat_0=24.45' + Vv + Jl + h + Hk + R + QO + E + A, 391, GU + Xx + Yo + ' +k=0.9999079' + s + N + Y + Fv + E + A, 1, GU + Xx + Yo + ' +k=0.9999079 +x_0=155000 +y_0=463000' + Y + Fv + E + A, 109, UU + L + Nb + LX + Ak + x + Al + E + A, 67, I + IC + x + Al + E + A, 1, I + Hi + x + Al + E + A, 1, I + Gz + x + Al + E + A, 1, I + ID + x + Al + E + A, 1, I + Io + x + Al + E + A, 15, I + Ik + o + x + Al + E + A, 1, I + IC + o + x + Al + E + A, 1, I + Hi + o + x + Al + E + A, 1, I + Gz + o + x + Al + E + A, 1, I + ID + o + x + Al + E + A, 1, I + Io + o + x + Al + E + A, 1, I + MB + o + x + Al + E + A, 1, I + Nx + o + x + Al + E + A, 1, I + Nr + o + x + Al + E + A, 25, I + Gz + o + R + Nn + E + A, 1, I + ID + o + R + Nn + E + A, 112, I + KC + o + HB + Bt + E + A, 38, D + Pi + ' +lon_0=11 +k=1' + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + ' +lon_0=13 +k=1' + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + Gj + ' +k=1' + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + UE + ' +k=1' + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + RI + ' +k=1' + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + Gl + ' +k=1' + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + SP + ' +k=1' + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + RJ + ' +k=1' + s + N + Gk + HB + Bt + GK + A, 317, CU + ' +lat_0=-18.9 +lonc=44.10000000000001 +alpha=18.9' + EP + u + CO + ' +gamma=18.9' + R + HD + Lv + E + A, 36, I + JZ + o + R + HD + E + A, 1, I + JM + o + R + HD + E + A, 110, I + Mi + Lo + GD + E + A, 1, I + NS + Lo + GD + E + A, 21, CU + Qi + Yz + PF + Ph + ' +x_0=590476.8714630401 +y_0=442857.653094361' + If + Lo + GD + ' +to_meter=20.11676512155263' + A, 1, CU + Qi + Yz + PF + Ph + ' +x_0=590476.8727431979 +y_0=442857.6545573985' + If + Lo + GD + ' +to_meter=0.3047994715386762' + A, 1, CU + Qi + Yz + PF + Ph + ' +x_0=590476.87 +y_0=442857.65' + If + Lo + GD + E + A, 28, D + YA + ' +lon_0=-8 +k=1' + h + KJ + PV + Bb + E + A, 1, D + YA + ' +lon_0=-8 +k=1.000035' + h + KJ + Ok + Bb + E + A, 1, D + YA + ' +lon_0=-8 +k=1.000035' + h + KJ + Ok + Bb + E + A, 258, D + PT + Zz + V + s + N + Y + g + E + A, 1, D + PT + NX + V + s + N + Y + g + E + A, 1, D + GM + Ox + V + s + N + Y + g + E + A, 1, D + PT + Tk + V + s + N + Y + g + E + A, 1, D + GM + Oy + V + s + N + Y + g + E + A, 1, D + GM + Rw + V + s + N + Y + g + E + A, 1, D + GM + Oz + V + s + N + Y + g + E + A, 1, D + GM + aA + V + s + N + Y + g + E + A, 1, D + GM + PA + V + s + N + Y + g + E + A, 1, D + Fs + PB + V + s + N + Y + g + E + A, 1, D + IZ + ZH + V + s + N + Y + g + E + A, 1, D + IZ + ZI + V + s + N + Y + g + E + A, 1, D + IZ + ZJ + V + s + N + Y + g + E + A, 1, D + IQ + ' +lon_0=142' + V + s + N + Y + g + E + A, 1, D + IQ + Pj + V + s + N + Y + g + E + A, 1, D + IQ + ' +lon_0=124' + V + s + N + Y + g + E + A, 1, D + IQ + NX + V + s + N + Y + g + E + A, 1, D + ' +lat_0=20' + Rw + V + s + N + Y + g + E + A, 1, D + IQ + ZR + V + s + N + Y + g + E + A, 21, Ck + Vs + UX + ' +x_0=86501.46392051999' + aS + Ee + Ef + JK + Vo + A, 139, I + JM + Gn + E + A, 1, I + Me + Gn + E + A, 151, H + ' +lat_1=36' + GM + SC + QL + O + Hk + AU + BN + JC + E + A, 1, H + Sd + Se + SC + Nk + O + Hk + AU + BN + JC + E + A, 1, H + ' +lat_1=36' + GM + SC + QL + O + Hk + AU + BN + E + A, 1, H + Sd + Se + SC + Nk + O + Hk + AU + BN + E + A, 235, I + KA + c + Af + E + A, 1, I + Oq + c + Af + E + A, 1, I + QD + c + Af + E + A, 1, I + JN + c + Af + E + A, 59, H + ' +lat_1=36' + GM + SC + QL + ' +x_0=500135 +y_0=300090' + c + Af + E + A, 1, H + Sd + Se + SC + Nk + ' +x_0=500135 +y_0=300090' + c + Af + E + A, 236, I + Ja + AU + BN + E + A, 93, I + ID + R + HE + E + A, 33, D + L + Nb + AP + O + N + R + HE + E + A, 16, D + L + Vn + AP + O + N + R + HE + E + A, 1, D + L + Vn + V + O + N + R + HE + E + A, 80, D + L + RP + ' +k=1' + s + EO + Y + Aw + Ls + E + A, 1, D + L + QQ + ' +k=1' + s + EO + Y + Aw + Ls + E + A, 1, D + L + ZG + ' +k=1' + s + EO + Y + Aw + Ls + E + A, 1, D + L + PG + ' +k=1' + s + EO + Y + z + E + A, 1, D + L + Ig + ' +k=1' + s + EO + Y + z + E + A, 1, D + L + PH + ' +k=1' + s + EO + Y + z + E + A, 1, D + L + PG + ' +k=1' + Bn + EO + Y + z + E + A, 1, D + L + Ig + ' +k=1 +x_0=450000' + EO + Y + z + E + A, 1, D + L + PH + ' +k=1' + YL + EO + Y + z + E + A, 22, D + L + RP + ' +k=1' + s + N + Y + Aw + Ls + E + A, 1, D + L + QQ + ' +k=1' + s + N + Y + Aw + Ls + E + A, 1, D + L + ZG + ' +k=1' + s + N + Y + Aw + Ls + E + A, 1, D + L + PG + ' +k=1' + Bn + N + Y + z + E + A, 1, D + L + Ig + ' +k=1 +x_0=450000' + N + Y + z + E + A, 1, D + L + PH + ' +k=1' + YL + N + Y + z + E + A, 1, H + LM + Nh + ' +lat_0=47.5' + Ig + u + Is + Y + z + E + A, 1, D + L + RP + ' +k=1' + Bn + N + Y + Aw + Ls + E + A, 1, D + L + QQ + ' +k=1 +x_0=450000' + N + Y + Aw + Ls + E + A, 1, D + L + ZG + ' +k=1' + YL + N + Y + Aw + Ls + E + A, 10, H + Ks + Kt + Hr + ' +lon_0=4.356939722222222 +x_0=150000.01256 +y_0=5400088.4378' + R + GP + E + A, 70, H + ' +lat_1=51.16666723333333 +lat_2=49.8333339' + Hr + ' +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438' + R + GP + E + A, 96, D + L + ZO + ' +k=1' + Ci + N + Y + AC + E + A, 1, D + L + KB + ' +k=1' + Bo + N + Y + AC + E + A, 1, D + L + IH + ' +k=1' + DP + N + Y + AC + E + A, 1, D + L + Gj + ' +k=1' + Eg + N + Y + AC + E + A, 59, I + Ja + AU + BN + No + E + A, 1, I + KA + AU + BN + No + E + A, 71, GU + ' +lat_0=45.9 +lon_0=25.39246588888889 +k=0.9996667' + O + Ae + R + QP + E + A, 238, I + JZ + j + MR + E + A, 1, I + JM + j + MR + E + A, 62, D + L + SQ + ' +k=1' + O + N + C + Rr + E + A, 64, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 1, I + Io + C + B + E + A, 1, I + Ik + o + C + B + E + A, 1, I + IC + o + C + B + E + A, 1, I + Hi + o + C + B + E + A, 1, I + Gz + o + C + B + E + A, 1, I + ID + o + C + B + E + A, 1, I + Io + o + C + B + E + A, 1, I + MB + o + C + B + E + A, 1, I + Nx + o + C + B + E + A, 1, I + Nr + o + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 1, I + Io + C + B + E + A, 1, I + Ik + o + C + B + E + A, 1, I + IC + o + C + B + E + A, 1, I + Hi + o + C + B + E + A, 1, I + Gz + o + C + B + E + A, 1, I + ID + o + C + B + E + A, 1, I + Io + o + C + B + E + A, 1, I + MB + o + C + B + E + A, 1, I + Nx + o + C + B + E + A, 1, I + Nr + o + C + B + E + A, 1, H + ' +lat_1=48.71666666666667 +lat_2=47.85' + Ib + IS + Z + N + X + J + A, 1, H + ' +lat_1=47.88333333333333 +lat_2=46.45 +lat_0=45.83333333333334' + IS + Z + N + X + J + A, 1, H + ' +lat_1=46.4 +lat_2=44.86666666666667' + IZ + IS + Z + N + X + J + A, 2, H + ' +lat_1=41.85 +lat_2=42.81666666666667 +lat_0=41.33333333333334' + CS + Z + N + X + J + A, 1, H + ' +lat_1=40.28333333333333' + Dk + BY + ' +lon_0=-99.5' + Z + N + X + J + A, 1, D + CQ + DF + V + e + N + X + J + A, 1, D + CQ + DG + V + e + N + X + J + A, 1, D + CQ + DH + V + e + N + X + J + A, 1, D + Fp + DI + AO + e + N + X + J + A, 1, D + BA + ' +lon_0=-74.66666666666667' + EQ + Z + N + X + J + A, 1, D + Bl + Cu + Hm + e + N + X + J + A, 1, D + Bl + Iy + V + e + N + X + J + A, 1, D + Bl + Cv + Iz + e + N + X + J + A, 1, D + Fs + ' +lon_0=-74.33333333333333' + AO + e + N + X + J + A, 1, D + Fs + Cw + Ad + e + N + X + J + A, 1, D + Fs + Cx + Ad + e + N + X + J + A, 2, H + ' +lat_1=34.33333333333334 +lat_2=36.16666666666666' + LT + NW + Z + N + X + J + A, 1, H + ' +lat_1=47.43333333333333' + Xy + Ib + EZ + Z + N + X + J + A, 1, H + ' +lat_1=46.18333333333333 +lat_2=47.48333333333333' + Be + EZ + Z + N + X + J + A, 1, H + ' +lat_1=40.43333333333333 +lat_2=41.7' + BY + ET + Z + N + X + J + A, 1, H + ' +lat_1=38.73333333333333 +lat_2=40.03333333333333' + Ch + ET + Z + N + X + J + A, 1, H + ' +lat_1=35.56666666666667' + Du + QU + Fl + Z + N + X + J + A, 1, H + ' +lat_1=33.93333333333333 +lat_2=35.23333333333333' + Do + Fl + Z + N + X + J + A, 1, H + ' +lat_1=44.33333333333334' + Nh + AK + AJ + Z + N + X + J + A, 1, H + ' +lat_1=42.33333333333334 +lat_2=44' + p + AJ + Z + N + X + J + A, 1, H + ' +lat_1=40.88333333333333 +lat_2=41.95' + BB + Ea + Z + N + X + J + A, 2, D + EI + GE + ' +k=0.9999938' + e + N + X + J + A, 1, H + ' +lat_1=33.76666666666667 +lat_2=34.96666666666667' + PT + CR + Z + N + X + J + A, 2, H + ' +lat_1=32.33333333333334 +lat_2=33.66666666666666' + Dr + CR + Z + N + X + J + A, 1, H + ' +lat_1=44.41666666666666 +lat_2=45.68333333333333' + AL + CS + Z + N + X + J + A, 1, H + ' +lat_1=42.83333333333334 +lat_2=44.4' + EJ + Ag + Z + N + X + J + A, 2, H + aL + ' +lat_2=36.18333333333333' + QV + Jr + Z + N + X + J + A, 1, H + ' +lat_1=32.13333333333333 +lat_2=33.96666666666667' + Ds + ' +lon_0=-97.5' + Z + N + X + J + A, 1, H + ' +lat_1=30.11666666666667 +lat_2=31.88333333333333' + Cb + Ag + Z + N + X + J + A, 1, H + ' +lat_1=28.38333333333333 +lat_2=30.28333333333333' + Dt + Ji + Z + N + X + J + A, 1, H + ' +lat_1=26.16666666666667 +lat_2=27.83333333333333' + Cc + CV + Z + N + X + J + A, 1, H + ' +lat_1=40.71666666666667 +lat_2=41.78333333333333' + Br + BI + Z + N + X + J + A, 1, H + ' +lat_1=39.01666666666667 +lat_2=40.65' + AQ + BI + Z + N + X + J + A, 1, H + ' +lat_1=37.21666666666667 +lat_2=38.35' + f + BI + Z + N + X + J + A, 1, D + Fp + LW + JA + e + N + X + J + A, 1, H + ' +lat_1=38.03333333333333 +lat_2=39.2' + AA + GF + Z + N + X + J + A, 1, H + Dn + ' +lat_2=37.96666666666667' + AB + GF + Z + N + X + J + A, 1, H + ' +lat_1=47.5' + Xy + Ib + Cy + Z + N + X + J + A, 1, H + ' +lat_1=45.83333333333334 +lat_2=47.33333333333334' + Dv + AJ + Z + N + X + J + A, 1, H + ' +lat_1=39 +lat_2=40.25' + Mr + Ga + Z + N + X + J + A, 1, H + ' +lat_1=37.48333333333333 +lat_2=38.88333333333333' + QX + CR + Z + N + X + J + A, 1, H + ' +lat_1=45.56666666666667 +lat_2=46.76666666666667' + Dw + Bu + Z + N + X + J + A, 1, H + ' +lat_1=44.25' + Hl + AL + Bu + Z + N + X + J + A, 1, H + ' +lat_1=42.73333333333333 +lat_2=44.06666666666667' + PR + Bu + Z + N + X + J + A, 1, D + LL + DJ + Am + e + N + X + J + A, 1, D + LL + DK + Am + e + N + X + J + A, 1, D + LL + JB + Am + e + N + X + J + A, 1, D + LL + DL + Am + e + N + X + J + A, 6, D + L + Ji + AP + k + N + X + J + A, 1, D + L + Rs + AP + k + N + X + J + A, 1, D + L + Jh + AP + k + N + X + J + A, 1, D + L + CR + AP + k + N + X + J + A, 14, D + L + ' +lon_0=-53' + V + Ab + N + X + E + A, 1, D + L + Zd + V + Ab + N + X + E + A, 1, D + L + Tf + V + Ab + N + X + E + A, 1, D + L + RQ + V + Ab + N + X + E + A, 1, D + L + RR + V + Ab + N + X + E + A, 1, D + L + Tg + V + Ab + N + X + E + A, 12, H + UF + Nh + IZ + HJ + s + N + X + E + A, 1, H + CD + CE + Cc + Bi + Z + N + X + J + A, 1, H + LM + RK + MV + IS + a + N + C + B + E + A, 4, H + JT + Jn + FZ + CS + O + N + C + B + E + A, 3, D + CQ + DF + V + h + Tm + C + B + E + A, 1, D + CQ + DG + V + O + Hh + C + B + E + A, 1, D + CQ + DH + V + CX + LV + C + B + E + A, 1, D + Fp + DI + AO + AI + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + Bl + Cu + Hm + OC + N + C + B + E + A, 1, D + Bl + Iy + V + O + N + C + B + E + A, 1, D + Bl + Cv + Iz + YD + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + Fs + Cw + Ad + Bv + N + C + B + E + A, 1, D + Fs + Cx + Ad + Qo + N + C + B + E + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + B + E + A, 1, H + Et + Eu + LT + NW + Rh + N + C + B + E + A, 1, H + BH + Ev + Ib + EZ + a + N + C + B + E + A, 1, H + Ew + Ex + Be + EZ + a + N + C + B + E + A, 1, H + OK + Fa + BY + ET + a + N + C + B + E + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + E + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + E + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + B + E + A, 1, H + PQ + Ca + p + AJ + AV + N + C + B + E + A, 1, H + MW + FB + BB + Ea + a + N + C + B + E + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + E + A, 1, D + EI + GE + Lb + BU + N + C + B + E + A, 3, H + FC + OD + Dr + CR + OE + N + C + B + E + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + E + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + E + A, 1, H + FD + MX + BC + MQ + a + N + C + B + E + A, 1, H + FE + MY + QV + Jr + h + AH + C + B + E + A, 1, H + FF + FG + Ds + CV + a + Cl + C + B + E + A, 1, H + FH + FI + Cb + Ag + EW + Fq + C + B + E + A, 1, H + FJ + FK + Dt + Ji + a + LV + C + B + E + A, 1, H + CD + CE + Cc + CV + AI + Ju + C + B + E + A, 1, H + AY + CF + Br + BI + O + AH + C + B + E + A, 1, H + JF + CG + AQ + BI + O + Cl + C + B + E + A, 1, H + JG + CH + f + BI + O + Fq + C + B + E + A, 1, D + Fp + LW + JA + O + N + C + B + E + A, 1, H + OF + FL + AA + GF + Bo + Cl + C + B + E + A, 1, H + Az + Du + AB + GF + Bo + AH + C + B + E + A, 1, H + BH + OG + Ib + Cy + O + N + C + B + E + A, 1, H + FM + FN + Dv + AJ + O + N + C + B + E + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + E + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + E + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + E + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + E + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + E + A, 1, D + CA + DJ + Ad + h + N + C + B + E + A, 1, D + CA + DK + Ad + u + EK + C + B + E + A, 1, D + CA + JB + Ad + a + N + C + B + E + A, 1, D + CA + DL + Ad + CX + EK + C + B + E + A, 3, H + GW + GX + GY + GA + h + IK + C + B + E + A, 3, D + L + Ji + AP + k + N + C + B + J + A, 1, D + L + Rs + AP + k + N + C + B + J + A, 1, D + L + Jh + AP + k + N + C + B + J + A, 1, D + L + CR + AP + k + N + C + B + J + A, 14, D + L + ' +lon_0=-53' + V + Ab + N + C + B + E + A, 1, D + L + Zd + V + Ab + N + C + B + E + A, 1, D + L + Tf + V + Ab + N + C + B + E + A, 1, D + L + RQ + V + Ab + N + C + B + E + A, 1, D + L + RR + V + Ab + N + C + B + E + A, 1, D + L + Tg + V + Ab + N + C + B + E + A, 1, D + L + IL + V + Ab + N + C + B + E + A, 1, D + L + Th + V + Ab + N + C + B + E + A, 1, D + L + Ti + V + Ab + N + C + B + E + A, 1, D + L + Ga + V + Ab + N + C + B + E + A, 1, D + L + ET + V + Ab + N + C + B + E + A, 1, D + L + CR + V + Ab + N + C + B + E + A, 1, D + L + NV + V + Ab + N + C + B + E + A, 1, D + L + Jh + V + Ab + N + C + B + E + A, 1, D + L + Bu + V + Ab + N + C + B + E + A, 1, D + L + Rs + V + Ab + N + C + B + E + A, 1, D + L + OZ + V + Ab + N + C + B + E + A, 1, H + UF + Nh + IZ + HJ + s + N + C + B + E + A, 1, H + CD + CE + ' +lat_0=25.5' + Bi + BZ + N + C + B + E + A, 2, I + SK + T + P + E + A, 1, I + TV + T + P + E + A, 1, I + Xz + T + P + E + A, 1, I + TY + T + P + E + A, 1, I + RG + T + P + E + A, 1, I + Ro + T + P + E + A, 1, I + RH + T + P + E + A, 1, I + TW + T + P + E + A, 1, I + TX + T + P + E + A, 1, I + QE + T + P + E + A, 1, I + Ns + T + P + E + A, 1, I + Nt + T + P + E + A, 1, I + Nu + T + P + E + A, 1, I + Nw + T + P + E + A, 1, I + NP + T + P + E + A, 1, I + NQ + T + P + E + A, 1, I + Ik + T + P + E + A, 1, I + IC + T + P + E + A, 1, I + Hi + T + P + E + A, 1, I + Gz + T + P + E + A, 1, I + ID + T + P + E + A, 1, I + Io + T + P + E + A, 1, I + MB + T + P + E + A, 1, I + Nx + T + P + E + A, 1, I + Nr + T + P + E + A, 1, I + Os + T + P + E + A, 1, I + SL + T + P + E + A, 1, I + Ja + T + P + E + A, 1, I + KA + T + P + E + A, 1, I + Oq + T + P + E + A, 1, I + QD + T + P + E + A, 1, I + JN + T + P + E + A, 1, I + KC + T + P + E + A, 1, I + NR + T + P + E + A, 1, I + Ki + T + P + E + A, 1, I + Mf + T + P + E + A, 1, I + KD + T + P + E + A, 1, I + JZ + T + P + E + A, 1, I + JM + T + P + E + A, 1, I + Me + T + P + E + A, 1, I + Rb + T + P + E + A, 1, I + Rc + T + P + E + A, 1, I + SO + T + P + E + A, 1, I + Td + T + P + E + A, 1, I + Te + T + P + E + A, 1, I + QF + T + P + E + A, 1, I + Ny + T + P + E + A, 1, I + Mh + T + P + E + A, 1, I + Mi + T + P + E + A, 1, I + NS + T + P + E + A, 1, I + Mg + T + P + E + A, 1, I + NT + T + P + E + A, 1, I + Ot + T + P + E + A, 1, I + Nv + T + P + E + A, 1, I + PM + T + P + E + A, 1, I + Re + T + P + E + A, 1, I + SM + T + P + E + A, 1, I + MA + T + P + E + A, 1, I + Nq + T + P + E + A, 1, I + PL + T + P + E + A, 41, I + SK + o + T + P + E + A, 1, I + TV + o + T + P + E + A, 1, I + Xz + o + T + P + E + A, 1, I + TY + o + T + P + E + A, 1, I + RG + o + T + P + E + A, 1, I + Ro + o + T + P + E + A, 1, I + RH + o + T + P + E + A, 1, I + TW + o + T + P + E + A, 1, I + TX + o + T + P + E + A, 1, I + QE + o + T + P + E + A, 1, I + Ns + o + T + P + E + A, 1, I + Nt + o + T + P + E + A, 1, I + Nu + o + T + P + E + A, 1, I + Nw + o + T + P + E + A, 1, I + NP + o + T + P + E + A, 1, I + NQ + o + T + P + E + A, 1, I + Ik + o + T + P + E + A, 1, I + IC + o + T + P + E + A, 1, I + Hi + o + T + P + E + A, 1, I + Gz + o + T + P + E + A, 1, I + ID + o + T + P + E + A, 1, I + Io + o + T + P + E + A, 1, I + MB + o + T + P + E + A, 1, I + Nx + o + T + P + E + A, 1, I + Nr + o + T + P + E + A, 1, I + Os + o + T + P + E + A, 1, I + SL + o + T + P + E + A, 1, I + Ja + o + T + P + E + A, 1, I + KA + o + T + P + E + A, 1, I + Oq + o + T + P + E + A, 1, I + QD + o + T + P + E + A, 1, I + JN + o + T + P + E + A, 1, I + KC + o + T + P + E + A, 1, I + NR + o + T + P + E + A, 1, I + Ki + o + T + P + E + A, 1, I + Mf + o + T + P + E + A, 1, I + KD + o + T + P + E + A, 1, I + JZ + o + T + P + E + A, 1, I + JM + o + T + P + E + A, 1, I + Me + o + T + P + E + A, 1, I + Rb + o + T + P + E + A, 1, I + Rc + o + T + P + E + A, 1, I + SO + o + T + P + E + A, 1, I + Td + o + T + P + E + A, 1, I + Te + o + T + P + E + A, 1, I + QF + o + T + P + E + A, 1, I + Ny + o + T + P + E + A, 1, I + Mh + o + T + P + E + A, 1, I + Mi + o + T + P + E + A, 1, I + NS + o + T + P + E + A, 1, I + Mg + o + T + P + E + A, 1, I + NT + o + T + P + E + A, 1, I + Ot + o + T + P + E + A, 1, I + Nv + o + T + P + E + A, 1, I + PM + o + T + P + E + A, 1, I + Re + o + T + P + E + A, 1, I + SM + o + T + P + E + A, 1, I + MA + o + T + P + E + A, 1, I + Nq + o + T + P + E + A, 1, I + PL + o + T + P + E + A, 41, I + SK + T + Q + E + A, 1, I + TV + T + Q + E + A, 1, I + Xz + T + Q + E + A, 1, I + TY + T + Q + E + A, 1, I + RG + T + Q + E + A, 1, I + Ro + T + Q + E + A, 1, I + RH + T + Q + E + A, 1, I + TW + T + Q + E + A, 1, I + TX + T + Q + E + A, 1, I + QE + T + Q + E + A, 1, I + Ns + T + Q + E + A, 1, I + Nt + T + Q + E + A, 1, I + Nu + T + Q + E + A, 1, I + Nw + T + Q + E + A, 1, I + NP + T + Q + E + A, 1, I + NQ + T + Q + E + A, 1, I + Ik + T + Q + E + A, 1, I + IC + T + Q + E + A, 1, I + Hi + T + Q + E + A, 1, I + Gz + T + Q + E + A, 1, I + ID + T + Q + E + A, 1, I + Io + T + Q + E + A, 1, I + MB + T + Q + E + A, 1, I + Nx + T + Q + E + A, 1, I + Nr + T + Q + E + A, 1, I + Os + T + Q + E + A, 1, I + SL + T + Q + E + A, 1, I + Ja + T + Q + E + A, 1, I + KA + T + Q + E + A, 1, I + Oq + T + Q + E + A, 1, I + QD + T + Q + E + A, 1, I + JN + T + Q + E + A, 1, I + KC + T + Q + E + A, 1, I + NR + T + Q + E + A, 1, I + Ki + T + Q + E + A, 1, I + Mf + T + Q + E + A, 1, I + KD + T + Q + E + A, 1, I + JZ + T + Q + E + A, 1, I + JM + T + Q + E + A, 1, I + Me + T + Q + E + A, 1, I + Rb + T + Q + E + A, 1, I + Rc + T + Q + E + A, 1, I + SO + T + Q + E + A, 1, I + Td + T + Q + E + A, 1, I + Te + T + Q + E + A, 1, I + QF + T + Q + E + A, 1, I + Ny + T + Q + E + A, 1, I + Mh + T + Q + E + A, 1, I + Mi + T + Q + E + A, 1, I + NS + T + Q + E + A, 1, I + Mg + T + Q + E + A, 1, I + NT + T + Q + E + A, 1, I + Ot + T + Q + E + A, 1, I + Nv + T + Q + E + A, 1, I + PM + T + Q + E + A, 1, I + Re + T + Q + E + A, 1, I + SM + T + Q + E + A, 1, I + MA + T + Q + E + A, 1, I + Nq + T + Q + E + A, 1, I + PL + T + Q + E + A, 41, I + SK + o + T + Q + E + A, 1, I + TV + o + T + Q + E + A, 1, I + Xz + o + T + Q + E + A, 1, I + TY + o + T + Q + E + A, 1, I + RG + o + T + Q + E + A, 1, I + Ro + o + T + Q + E + A, 1, I + RH + o + T + Q + E + A, 1, I + TW + o + T + Q + E + A, 1, I + TX + o + T + Q + E + A, 1, I + QE + o + T + Q + E + A, 1, I + Ns + o + T + Q + E + A, 1, I + Nt + o + T + Q + E + A, 1, I + Nu + o + T + Q + E + A, 1, I + Nw + o + T + Q + E + A, 1, I + NP + o + T + Q + E + A, 1, I + NQ + o + T + Q + E + A, 1, I + Ik + o + T + Q + E + A, 1, I + IC + o + T + Q + E + A, 1, I + Hi + o + T + Q + E + A, 1, I + Gz + o + T + Q + E + A, 1, I + ID + o + T + Q + E + A, 1, I + Io + o + T + Q + E + A, 1, I + MB + o + T + Q + E + A, 1, I + Nx + o + T + Q + E + A, 1, I + Nr + o + T + Q + E + A, 1, I + Os + o + T + Q + E + A, 1, I + SL + o + T + Q + E + A, 1, I + Ja + o + T + Q + E + A, 1, I + KA + o + T + Q + E + A, 1, I + Oq + o + T + Q + E + A, 1, I + QD + o + T + Q + E + A, 1, I + JN + o + T + Q + E + A, 1, I + KC + o + T + Q + E + A, 1, I + NR + o + T + Q + E + A, 1, I + Ki + o + T + Q + E + A, 1, I + Mf + o + T + Q + E + A, 1, I + KD + o + T + Q + E + A, 1, I + JZ + o + T + Q + E + A, 1, I + JM + o + T + Q + E + A, 1, I + Me + o + T + Q + E + A, 1, I + Rb + o + T + Q + E + A, 1, I + Rc + o + T + Q + E + A, 1, I + SO + o + T + Q + E + A, 1, I + Td + o + T + Q + E + A, 1, I + Te + o + T + Q + E + A, 1, I + QF + o + T + Q + E + A, 1, I + Ny + o + T + Q + E + A, 1, I + Mh + o + T + Q + E + A, 1, I + Mi + o + T + Q + E + A, 1, I + NS + o + T + Q + E + A, 1, I + Mg + o + T + Q + E + A, 1, I + NT + o + T + Q + E + A, 1, I + Ot + o + T + Q + E + A, 1, I + Nv + o + T + Q + E + A, 1, I + PM + o + T + Q + E + A, 1, I + Re + o + T + Q + E + A, 1, I + SM + o + T + Q + E + A, 1, I + MA + o + T + Q + E + A, 1, I + Nq + o + T + Q + E + A, 1, I + PL + o + T + Q + E + A, 41, I + SK + S + E + A, 1, I + TV + S + E + A, 1, I + Xz + S + E + A, 1, I + TY + S + E + A, 1, I + RG + S + E + A, 1, I + Ro + S + E + A, 1, I + RH + S + E + A, 1, I + TW + S + E + A, 1, I + TX + S + E + A, 1, I + QE + S + E + A, 1, I + Ns + S + E + A, 1, I + Nt + S + E + A, 1, I + Nu + S + E + A, 1, I + Nw + S + E + A, 1, I + NP + S + E + A, 1, I + NQ + S + E + A, 1, I + Ik + S + E + A, 1, I + IC + S + E + A, 1, I + Hi + S + E + A, 1, I + Gz + S + E + A, 1, I + ID + S + E + A, 1, I + Io + S + E + A, 1, I + MB + S + E + A, 1, I + Nx + S + E + A, 1, I + Nr + S + E + A, 1, I + Os + S + E + A, 1, I + SL + S + E + A, 1, I + Ja + S + E + A, 1, I + KA + S + E + A, 1, I + Oq + S + E + A, 1, I + QD + S + E + A, 1, I + JN + S + E + A, 1, I + KC + S + E + A, 1, I + NR + S + E + A, 1, I + Ki + S + E + A, 1, I + Mf + S + E + A, 1, I + KD + S + E + A, 1, I + JZ + S + E + A, 1, I + JM + S + E + A, 1, I + Me + S + E + A, 1, I + Rb + S + E + A, 1, I + Rc + S + E + A, 1, I + SO + S + E + A, 1, I + Td + S + E + A, 1, I + Te + S + E + A, 1, I + QF + S + E + A, 1, I + Ny + S + E + A, 1, I + Mh + S + E + A, 1, I + Mi + S + E + A, 1, I + NS + S + E + A, 1, I + Mg + S + E + A, 1, I + NT + S + E + A, 1, I + Ot + S + E + A, 1, I + Nv + S + E + A, 1, I + PM + S + E + A, 1, I + Re + S + E + A, 1, I + SM + S + E + A, 1, I + MA + S + E + A, 1, I + Nq + S + E + A, 1, I + PL + S + E + A, 1, BP + Hr + Qm + HN + Rd + Bd + Cl + S + E + A, 3, D + L + Ji + AP + k + N + S + J + A, 1, D + L + Rs + AP + k + N + S + J + A, 1, D + L + Jh + AP + k + N + S + J + A, 1, D + L + CR + AP + k + N + S + J + A, 34, I + SK + o + S + E + A, 1, I + TV + o + S + E + A, 1, I + Xz + o + S + E + A, 1, I + TY + o + S + E + A, 1, I + RG + o + S + E + A, 1, I + Ro + o + S + E + A, 1, I + RH + o + S + E + A, 1, I + TW + o + S + E + A, 1, I + TX + o + S + E + A, 1, I + QE + o + S + E + A, 1, I + Ns + o + S + E + A, 1, I + Nt + o + S + E + A, 1, I + Nu + o + S + E + A, 1, I + Nw + o + S + E + A, 1, I + NP + o + S + E + A, 1, I + NQ + o + S + E + A, 1, I + Ik + o + S + E + A, 1, I + IC + o + S + E + A, 1, I + Hi + o + S + E + A, 1, I + Gz + o + S + E + A, 1, I + ID + o + S + E + A, 1, I + Io + o + S + E + A, 1, I + MB + o + S + E + A, 1, I + Nx + o + S + E + A, 1, I + Nr + o + S + E + A, 1, I + Os + o + S + E + A, 1, I + SL + o + S + E + A, 1, I + Ja + o + S + E + A, 1, I + KA + o + S + E + A, 1, I + Oq + o + S + E + A, 1, I + QD + o + S + E + A, 1, I + JN + o + S + E + A, 1, I + KC + o + S + E + A, 1, I + NR + o + S + E + A, 1, I + Ki + o + S + E + A, 1, I + Mf + o + S + E + A, 1, I + KD + o + S + E + A, 1, I + JZ + o + S + E + A, 1, I + JM + o + S + E + A, 1, I + Me + o + S + E + A, 1, I + Rb + o + S + E + A, 1, I + Rc + o + S + E + A, 1, I + SO + o + S + E + A, 1, I + Td + o + S + E + A, 1, I + Te + o + S + E + A, 1, I + QF + o + S + E + A, 1, I + Ny + o + S + E + A, 1, I + Mh + o + S + E + A, 1, I + Mi + o + S + E + A, 1, I + NS + o + S + E + A, 1, I + Mg + o + S + E + A, 1, I + NT + o + S + E + A, 1, I + Ot + o + S + E + A, 1, I + Nv + o + S + E + A, 1, I + PM + o + S + E + A, 1, I + Re + o + S + E + A, 1, I + SM + o + S + E + A, 1, I + MA + o + S + E + A, 1, I + Nq + o + S + E + A, 1, I + PL + o + S + E + A, 1, BP + m + ' +lat_ts=-90' + HN + Rd + Bd + Cl + S + E + A, 5, D + L + PN + AP + O + Ak + S + E + A].reduce(function (acc, it, i) {
  if (i % 2 === 0) {
    // v is the addition in EPSG code
    var cur = acc.prev + it;
    var code = "EPSG:" + cur;
    acc.defs.push([code]);
    acc.prev = cur;
  } else {
    // v is the proj4 text
    acc.defs[acc.defs.length - 1].push(it);
  }
  return acc;
}, {
  defs: [],
  prev: 0
}).defs;

/***/ }),

/***/ 97:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// to-do: provide offsets, so evenly distributed when rounding

function _identity(n) {
  return n;
}
function _scale_number(old_min, old_range, new_min, new_range, n) {
  return new_min + new_range * (n - old_min) / old_range;
}
function _scale_and_flip_number(old_min, old_range, new_max, new_range, n) {
  return new_max - new_range * (n - old_min) / old_range;
}
function _scale_and_round_number(old_min, old_range, new_min, new_range, n) {
  return Math.round(new_min + new_range * (n - old_min) / old_range);
}
function _scale_and_flip_and_round_number(old_min, old_range, new_max, new_range, n) {
  return Math.round(new_max - new_range * (n - old_min) / old_range);
}

// assuming not no data
function createScaleFunction(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 2),
    old_min = _ref3[0],
    old_max = _ref3[1];
  var _ref4 = _slicedToArray(_ref2, 2),
    new_min = _ref4[0],
    new_max = _ref4[1];
  var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    flip = _ref5.flip,
    no_range_value = _ref5.no_range_value,
    _ref5$no_range_value_ = _ref5.no_range_value_strategy,
    no_range_value_strategy = _ref5$no_range_value_ === void 0 ? "highest" : _ref5$no_range_value_,
    _ref5$round = _ref5.round,
    round = _ref5$round === void 0 ? false : _ref5$round;
  var old_range = old_max - old_min;
  var new_range = new_max - new_min;
  if (old_range === 0) {
    if (typeof no_range_value === "number") {
      return _identity.bind(null, no_range_value);
    } else if (no_range_value_strategy === "highest") {
      return _identity.bind(null, new_max);
    } else if (no_range_value_strategy === "lowest") {
      return _identity.bind(null, new_min);
    } else if (no_range_value_strategy === "middle") {
      var n = (new_max - new_min) / 2;
      if (round) n = Math.round(n);
      return _identity.bind(null, n);
    }
  }
  if (flip) {
    if (round) {
      return _scale_and_flip_and_round_number.bind(null, old_min, old_range, new_max, new_range);
    } else {
      return _scale_and_flip_number.bind(null, old_min, old_range, new_max, new_range);
    }
  } else {
    if (round) {
      return _scale_and_round_number.bind(null, old_min, old_range, new_min, new_range);
    } else {
      return _scale_number.bind(null, old_min, old_range, new_min, new_range);
    }
  }
}
function _scale(pixel) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }
  return create(rest)(pixel);
}
var quickScale = {
  _identity: _identity,
  _scale: _scale,
  _scale_number: _scale_number,
  _scale_and_flip_number: _scale_and_flip_number,
  _scale_and_round_number: _scale_and_round_number,
  _scale_and_flip_and_round_number: _scale_and_flip_and_round_number,
  createScaleFunction: createScaleFunction
};
if (( false ? 0 : _typeof(__webpack_require__.amdD)) === "object") !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return quickScale;
}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
if (( false ? 0 : _typeof(module)) === "object") module.exports = quickScale;
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") window.quickScale = quickScale;
if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object") self.quickScale = quickScale;

/***/ }),

/***/ 30:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var defineProperty = Object.defineProperty || function (obj, key, desc) {
    obj[key] = desc.value;
  };
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    });
    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  });
  defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  });
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };
  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }
        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }
    var previousPromise;
    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    defineProperty(this, "_invoke", {
      value: enqueue
    });
  }
  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };
  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }
      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }
      context.method = method;
      context.arg = arg;
      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }
          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }
        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
          if (record.arg === ContinueSentinel) {
            continue;
          }
          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method;
    var method = delegate.iterator[methodName];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next mehtod, always terminate the
      // yield* loop.
      context.delegate = null;

      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate.iterator["return"]) {
        // If the delegate iterator has a return method, give it a
        // chance to clean up.
        context.method = "return";
        context.arg = undefined;
        maybeInvokeDelegate(delegate, context);
        if (context.method === "throw") {
          // If maybeInvokeDelegate(context) changed context.method from
          // "return" to "throw", let that override the TypeError below.
          return ContinueSentinel;
        }
      }
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }
    var info = record.arg;
    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }
    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    if (1 in locs) {
      entry.catchLoc = locs[1];
    }
    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }
    this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }
  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }
  exports.keys = function (val) {
    var object = Object(val);
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }
      if (typeof iterable.next === "function") {
        return iterable;
      }
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
            next.value = undefined;
            next.done = true;
            return next;
          };
        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return {
      next: doneResult
    };
  }
  exports.values = values;
  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }
  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);
      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }
      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }
        return !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;
        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }
      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;
      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }
      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }
      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };
      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }
      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;
}(
// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? 0 : _typeof(module)) === "object" ? module.exports : {});
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ 3912:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function reprojectBoundingBoxPluggable(_ref) {
  var bbox = _ref.bbox,
    reproject = _ref.reproject;
  var _bbox = _slicedToArray(bbox, 4),
    xmin = _bbox[0],
    ymin = _bbox[1],
    xmax = _bbox[2],
    ymax = _bbox[3];
  var topleft = reproject([xmin, ymax]);
  var topright = reproject([xmax, ymax]);
  var bottomleft = reproject([xmin, ymin]);
  var bottomright = reproject([xmax, ymin]);
  var corners = [topleft, topright, bottomleft, bottomright];
  var xs = corners.map(function (corner) {
    return corner[0];
  });
  var ys = corners.map(function (corner) {
    return corner[1];
  });
  return [Math.min.apply(Math, _toConsumableArray(xs)), Math.min.apply(Math, _toConsumableArray(ys)), Math.max.apply(Math, _toConsumableArray(xs)), Math.max.apply(Math, _toConsumableArray(ys))];
}
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return reprojectBoundingBoxPluggable;
}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
if (( false ? 0 : _typeof(module)) === "object") {
  module.exports = reprojectBoundingBoxPluggable;
  module.exports["default"] = reprojectBoundingBoxPluggable;
}
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") window.reprojectBoundingBoxPluggable = reprojectBoundingBoxPluggable;
if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object") self.reprojectBoundingBoxPluggable = reprojectBoundingBoxPluggable;

/***/ }),

/***/ 1291:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var merge = __webpack_require__(3369);
var proj4 = __webpack_require__(2467);
var reprojectBoundingBoxPluggable = __webpack_require__(3912);
if (typeof merge !== "function") {
  console.warn("[reproject-bbox] failed to import proj4-merge");
}
function reprojectBoundingBox(_ref) {
  var bbox = _ref.bbox,
    from = _ref.from,
    _proj4 = _ref.proj4,
    to = _ref.to;
  if (typeof from === "number") from = "EPSG:" + from;
  if (typeof to === "number") to = "EPSG:" + to;
  var instances = [_proj4, proj4];
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window.proj4) instances.push(window.proj4);
  if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.proj4) instances.push(self.proj4);
  var proj = merge(instances);
  var fwd = proj(from, to).forward;
  return reprojectBoundingBoxPluggable({
    bbox: bbox,
    reproject: fwd
  });
}
if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return reprojectBoundingBox;
  }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
if (( false ? 0 : _typeof(module)) === "object") {
  module.exports = reprojectBoundingBox;
  module.exports["default"] = reprojectBoundingBox;
}
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
  window.reprojectBoundingBox = reprojectBoundingBox;
}
if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object") {
  self.reprojectBoundingBox = reprojectBoundingBox;
}

/***/ }),

/***/ 7445:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var proj4 = __webpack_require__(2678);
var defs = __webpack_require__(6321);
if (_typeof(proj4) === "object" && typeof proj4.defs !== "function" && typeof proj4.default === "function") {
  // probably inside an Angular project
  proj4 = proj4.default;
}
proj4.defs(defs);
module.exports = proj4;

/***/ }),

/***/ 4136:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var clone = function clone(data) {
  return JSON.parse(JSON.stringify(data));
};
function reprojectGeoJSONPluggable(data, _ref) {
  var _ref$in_place = _ref.in_place,
    in_place = _ref$in_place === void 0 ? false : _ref$in_place,
    reproject = _ref.reproject;
  if (typeof reproject !== "function") {
    throw new Error("[reproject-geojson] you must specify a reproject function");
  }
  if (in_place !== true) data = clone(data);
  if (data.type === "FeatureCollection") {
    data.features = data.features.map(function (feature) {
      return reprojectGeoJSONPluggable(feature, {
        in_place: in_place,
        reproject: reproject
      });
    });
  } else if (data.type === "Feature") {
    data.geometry = reprojectGeoJSONPluggable(data.geometry, {
      in_place: in_place,
      reproject: reproject
    });
  } else if (data.type === "LineString") {
    data.coordinates = data.coordinates.map(function (coord) {
      return reproject(coord);
    });
  } else if (data.type === "MultiLineString") {
    data.coordinates = data.coordinates.map(function (line) {
      return line.map(function (coord) {
        return reproject(coord);
      });
    });
  } else if (data.type === "MultiPoint") {
    data.coordinates = data.coordinates.map(function (point) {
      return reproject(point);
    });
  } else if (data.type === "MultiPolygon") {
    data.coordinates = data.coordinates.map(function (polygon) {
      return polygon.map(function (ring) {
        return ring.map(function (coord) {
          return reproject(coord);
        });
      });
    });
  } else if (data.type === "Point") {
    data.coordinates = reproject(data.coordinates);
  } else if (data.type === "Polygon") {
    data.coordinates = data.coordinates.map(function (ring) {
      return ring.map(function (coord) {
        return reproject(coord);
      });
    });
  }
  return data;
}
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return reprojectGeoJSONPluggable;
}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
if (( false ? 0 : _typeof(module)) === "object") module.exports = reprojectGeoJSONPluggable;
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") window.reprojectGeoJSONPluggable = reprojectGeoJSONPluggable;
if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object") self.reprojectGeoJSONPluggable = reprojectGeoJSONPluggable;

/***/ }),

/***/ 1425:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var proj4 = __webpack_require__(7445);
var reprojectGeoJSONPluggable = __webpack_require__(4136);
function reprojectGeoJSON(data, _ref) {
  var _ref$from = _ref.from,
    _from = _ref$from === void 0 ? "EPSG:4326" : _ref$from,
    _ref$in_place = _ref.in_place,
    in_place = _ref$in_place === void 0 ? false : _ref$in_place,
    _ref$to = _ref.to,
    _to = _ref$to === void 0 ? "EPSG:4326" : _ref$to;
  if (typeof _from === "number" || _from.match(/^\d+$/)) _from = "EPSG:" + _from;
  if (typeof _to === "number" || _to.match(/^\d+$/)) _to = "EPSG:" + _to;
  return reprojectGeoJSONPluggable(data, {
    in_place: in_place,
    reproject: proj4(_from, _to).forward
  });
}
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return reprojectGeoJSON;
}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
if (( false ? 0 : _typeof(module)) === "object") module.exports = reprojectGeoJSON;
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") window.reprojectGeoJSON = reprojectGeoJSON;
if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object") self.reprojectGeoJSON = reprojectGeoJSON;

/***/ }),

/***/ 6889:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// [ [0, 11], [58, 59] ],
// [ [-1, 12], [57, 60] ] // subtract one from start and add one to end
// [ 0, -1, 12, 57, 60, 255 ] // flatten
// [ [0, -1], [12, 57], [60, 255] ] // pair
// [ [12, 57], [60, 255] ] // discard bad like [0, -1]

function segflip(_ref) {
  var segs = _ref.segments,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? -Infinity : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? Infinity : _ref$max,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug;
  if (debug) console.log("[segflip] segs:", segs);
  if (segs === undefined || segs === null || Array.isArray(segs) && segs.length === 0) {
    if (debug) console.log("[segflip] segments are empty so return the whole row flipped");
    return [[min, max]];
  }
  var nums = segs.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      start = _ref3[0],
      end = _ref3[1];
    return [start - 1, end + 1];
  }).flat();
  nums.unshift(min);
  nums.push(max);
  if (debug) console.log("flattened nums:", nums);
  var results = [];
  for (var i = 1; i < nums.length; i += 2) {
    var start = nums[i - 1];
    var end = nums[i];
    if (start > end) continue; // e.g. [0, -1]
    results.push([start, end]);
  }
  return results;
}
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return segflip;
}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
if (( false ? 0 : _typeof(module)) === "object") module.exports = segflip;
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") window.segflip = segflip;
if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object") self.segflip = segflip;

/***/ }),

/***/ 4321:
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
module.exports = function (_ref) {
  var bbox = _ref.bbox,
    container = _ref.container,
    debug = _ref.debug,
    origin = _ref.origin,
    padding = _ref.padding,
    scale = _ref.scale;
  if (debug) console.log("[snap-bbox] starting");
  if (debug) console.log("[snap-bbox] bbox:", bbox);
  if (debug) console.log("[snap-bbox] debug:", debug);
  if (debug) console.log("[snap-bbox] origin:", origin);
  if (debug) console.log("[snap-bbox] padding:", padding);
  if (debug) console.log("[snap-bbox] scale:", scale);
  var _origin = _slicedToArray(origin, 2),
    originX = _origin[0],
    originY = _origin[1];
  if (debug) console.log("[snap-bbox] originX:", originX);
  if (debug) console.log("[snap-bbox] originY:", originY);
  var _ref2 = padding || [0, 0],
    _ref3 = _slicedToArray(_ref2, 2),
    padX = _ref3[0],
    padY = _ref3[1];
  if (debug) console.log("[snap-bbox] padX:", padX);
  if (debug) console.log("[snap-bbox] padY:", padY);
  var _scale = _slicedToArray(scale, 2),
    scale_x = _scale[0],
    scale_y = _scale[1];
  if (debug) console.log("[snap-bbox] scale_x:", scale_x);
  if (debug) console.log("[snap-bbox] scale_y:", scale_y);

  // if sign is -1 then x/y value decreases
  // as grid cell number increases
  var sign_scale_x = Math.sign(scale_x);
  var sign_scale_y = Math.sign(scale_y);
  if (debug) console.log("[snap-bbox] sign_scale_x:", sign_scale_x);
  if (debug) console.log("[snap-bbox] sign_scale_y:", sign_scale_y);
  var _bbox = _slicedToArray(bbox, 4),
    xmin = _bbox[0],
    ymin = _bbox[1],
    xmax = _bbox[2],
    ymax = _bbox[3];
  if (debug) console.log("[snap-bbox] xmin:", xmin);
  if (debug) console.log("[snap-bbox] ymin:", ymin);
  if (debug) console.log("[snap-bbox] xmax:", xmax);
  if (debug) console.log("[snap-bbox] ymax:", ymax);
  var left = (xmin - originX) / scale_x;
  var right = (xmax - originX) / scale_x;
  var top = (ymax - originY) / scale_y;
  var bottom = (ymin - originY) / scale_y;
  if (debug) console.log("[snap-bbox] left:", left);
  if (debug) console.log("[snap-bbox] right:", right);
  if (debug) console.log("[snap-bbox] top:", top);
  if (debug) console.log("[snap-bbox] bottom:", bottom);

  // we're rounding here, so we don't ask for half a pixel
  var left_int = Math.floor(left) - padX;
  var right_int = Math.ceil(right) + padX;

  // top_int is the number of pixels from the top edge of the grid
  // so we want to subtract the padding
  var top_int = Math.floor(top) - padY;

  // bottom_int is the number of pixels from the top edge of the edge
  // so we want to increase the padding
  var bottom_int = Math.ceil(bottom) + padY;
  if (debug) console.log("[snap-bbox] left_int:", left_int);
  if (debug) console.log("[snap-bbox] right_int:", right_int);
  if (debug) console.log("[snap-bbox] top_int:", top_int);
  if (debug) console.log("[snap-bbox] bottom_int:", bottom_int);
  if (container) {
    if (debug) console.log("[snap-bbox] container:", container);
    var min_left = (container[0] - originX) / scale_x;
    var max_right = (container[2] - originX) / scale_x;
    var min_top = (container[3] - originY) / scale_y;
    var max_bottom = (container[1] - originY) / scale_y;
    if (debug) console.log("[snap-bbox] min_left:", min_left);
    if (debug) console.log("[snap-bbox] max_right:", max_right);
    if (debug) console.log("[snap-bbox] min_top:", min_top);
    if (debug) console.log("[snap-bbox] max_bottom:", max_bottom);
    var min_left_int = Math.ceil(min_left);
    var max_right_int = Math.floor(max_right);
    var min_top_int = Math.ceil(min_top);
    var max_bottom_int = Math.floor(max_bottom);
    if (debug) console.log("[snap-bbox] min_left_int:", min_left_int);
    if (debug) console.log("[snap-bbox] max_right_int:", max_right_int);
    if (debug) console.log("[snap-bbox] min_top_int:", min_top_int);
    if (debug) console.log("[snap-bbox] max_bottom_int:", max_bottom_int);
    left_int = Math.max(left_int, min_left_int);
    right_int = Math.min(right_int, max_right_int);
    top_int = Math.max(top_int, min_top_int);
    bottom_int = Math.min(bottom_int, max_bottom_int);
    if (debug) console.log("[snap-bbox] after containment, left_int:", left_int);
    if (debug) console.log("[snap-bbox] after containment, right_int:", right_int);
    if (debug) console.log("[snap-bbox] after containment, top_int:", top_int);
    if (debug) console.log("[snap-bbox] after containment, bottom_int:", bottom_int);
  }

  // need ternary expresssions below because
  // top_int is sometimes -0, which fails
  // some NodeJS strict equality tests with 0
  // however, 0 === -0 evaluates to true in NodeJS
  var bbox_in_grid_cells = [left_int === 0 ? 0 : left_int, bottom_int === 0 ? 0 : bottom_int, right_int === 0 ? 0 : right_int, top_int === 0 ? 0 : top_int];
  if (debug) console.log("[snap-bbox] bbox_in_grid_cells:", bbox_in_grid_cells);
  var bbox_in_coordinate_system = [originX + left_int * scale_x,
  // xmin
  originY + bottom_int * scale_y,
  // ymin
  originX + right_int * scale_x,
  // xmax
  originY + top_int * scale_y // ymax
  ];
  return {
    bbox_in_coordinate_system: bbox_in_coordinate_system,
    bbox_in_grid_cells: bbox_in_grid_cells
  };
};

/***/ }),

/***/ 2152:
/***/ ((module) => {

module.exports = function getHemisphere(projection) {
  var projstr = projection.toString();
  if (projstr.startsWith('326')) {
    return 'N';
  } else if (projstr.startsWith('327')) {
    return 'S';
  }
};

/***/ }),

/***/ 1018:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getZone = __webpack_require__(8530);
var getHemisphere = __webpack_require__(2152);
module.exports = function getProjString(projection) {
  var zone = getZone(projection);
  var hemisphere = getHemisphere(projection);
  return "+proj=utm +zone=".concat(zone).concat(hemisphere === 'S' ? ' +south ' : ' ', "+ellps=WGS84 +datum=WGS84 +units=m +no_defs");
};

/***/ }),

/***/ 8530:
/***/ ((module) => {

module.exports = function getZone(projection) {
  return Number.parseInt(projection.toString().substring(3));
};

/***/ }),

/***/ 8868:
/***/ ((module) => {

module.exports = function isUTM(projection) {
  var projstr = projection.toString();
  return projstr.startsWith('326') || projstr.startsWith('327');
};

/***/ }),

/***/ 2862:
/***/ ((module) => {

module.exports = {
  "1": function _(_ref) {
    var point = _ref.point;
    var parent = this.data;
    var index = point[this.d0v0];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "2": function _(_ref2) {
    var point = _ref2.point;
    var parent = this.data;
    var index = this.m0v0 * point[this.d0v0] + this.m0v1 * point[this.d0v1];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "3": function _(_ref3) {
    var point = _ref3.point;
    var parent = this.data;
    var index = this.m0v0 * point[this.d0v0] + this.m0v1 * point[this.d0v1] + this.m0v2 * point[this.d0v2];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "4": function _(_ref4) {
    var point = _ref4.point;
    var parent = this.data;
    var index = this.m0v0 * point[this.d0v0] + this.m0v1 * point[this.d0v1] + this.m0v2 * point[this.d0v2] + this.m0v3 * point[this.d0v3];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "5": function _(_ref5) {
    var point = _ref5.point;
    var parent = this.data;
    var index = this.m0v0 * point[this.d0v0] + this.m0v1 * point[this.d0v1] + this.m0v2 * point[this.d0v2] + this.m0v3 * point[this.d0v3] + this.m0v4 * point[this.d0v4];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1": function _(_ref6) {
    var point = _ref6.point;
    var parent = this.data[point[this.d0v0]];
    var index = point[this.d1v0];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,2": function _(_ref7) {
    var point = _ref7.point;
    var parent = this.data[point[this.d0v0]];
    var index = this.m1v0 * point[this.d1v0] + this.m1v1 * point[this.d1v1];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,3": function _(_ref8) {
    var point = _ref8.point;
    var parent = this.data[point[this.d0v0]];
    var index = this.m1v0 * point[this.d1v0] + this.m1v1 * point[this.d1v1] + this.m1v2 * point[this.d1v2];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,4": function _(_ref9) {
    var point = _ref9.point;
    var parent = this.data[point[this.d0v0]];
    var index = this.m1v0 * point[this.d1v0] + this.m1v1 * point[this.d1v1] + this.m1v2 * point[this.d1v2] + this.m1v3 * point[this.d1v3];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,5": function _(_ref10) {
    var point = _ref10.point;
    var parent = this.data[point[this.d0v0]];
    var index = this.m1v0 * point[this.d1v0] + this.m1v1 * point[this.d1v1] + this.m1v2 * point[this.d1v2] + this.m1v3 * point[this.d1v3] + this.m1v4 * point[this.d1v4];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1": function _(_ref11) {
    var point = _ref11.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]];
    var index = point[this.d2v0];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,2": function _(_ref12) {
    var point = _ref12.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]];
    var index = this.m2v0 * point[this.d2v0] + this.m2v1 * point[this.d2v1];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,3": function _(_ref13) {
    var point = _ref13.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]];
    var index = this.m2v0 * point[this.d2v0] + this.m2v1 * point[this.d2v1] + this.m2v2 * point[this.d2v2];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,4": function _(_ref14) {
    var point = _ref14.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]];
    var index = this.m2v0 * point[this.d2v0] + this.m2v1 * point[this.d2v1] + this.m2v2 * point[this.d2v2] + this.m2v3 * point[this.d2v3];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,5": function _(_ref15) {
    var point = _ref15.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]];
    var index = this.m2v0 * point[this.d2v0] + this.m2v1 * point[this.d2v1] + this.m2v2 * point[this.d2v2] + this.m2v3 * point[this.d2v3] + this.m2v4 * point[this.d2v4];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,1": function _(_ref16) {
    var point = _ref16.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]];
    var index = point[this.d3v0];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,2": function _(_ref17) {
    var point = _ref17.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]];
    var index = this.m3v0 * point[this.d3v0] + this.m3v1 * point[this.d3v1];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,3": function _(_ref18) {
    var point = _ref18.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]];
    var index = this.m3v0 * point[this.d3v0] + this.m3v1 * point[this.d3v1] + this.m3v2 * point[this.d3v2];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,4": function _(_ref19) {
    var point = _ref19.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]];
    var index = this.m3v0 * point[this.d3v0] + this.m3v1 * point[this.d3v1] + this.m3v2 * point[this.d3v2] + this.m3v3 * point[this.d3v3];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,5": function _(_ref20) {
    var point = _ref20.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]];
    var index = this.m3v0 * point[this.d3v0] + this.m3v1 * point[this.d3v1] + this.m3v2 * point[this.d3v2] + this.m3v3 * point[this.d3v3] + this.m3v4 * point[this.d3v4];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,1,1": function _(_ref21) {
    var point = _ref21.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]];
    var index = point[this.d4v0];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,1,2": function _(_ref22) {
    var point = _ref22.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]];
    var index = this.m4v0 * point[this.d4v0] + this.m4v1 * point[this.d4v1];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,1,3": function _(_ref23) {
    var point = _ref23.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]];
    var index = this.m4v0 * point[this.d4v0] + this.m4v1 * point[this.d4v1] + this.m4v2 * point[this.d4v2];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,1,4": function _(_ref24) {
    var point = _ref24.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]];
    var index = this.m4v0 * point[this.d4v0] + this.m4v1 * point[this.d4v1] + this.m4v2 * point[this.d4v2] + this.m4v3 * point[this.d4v3];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  },
  "1,1,1,1,5": function _(_ref25) {
    var point = _ref25.point;
    var parent = this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]];
    var index = this.m4v0 * point[this.d4v0] + this.m4v1 * point[this.d4v1] + this.m4v2 * point[this.d4v2] + this.m4v3 * point[this.d4v3] + this.m4v4 * point[this.d4v4];
    return {
      parent: parent,
      index: index,
      value: parent[index]
    };
  }
};

/***/ }),

/***/ 2075:
/***/ ((module) => {

module.exports = {
  "1": function _(_ref) {
    var point = _ref.point,
      value = _ref.value;
    this.data[point[this.d0v0]] = value;
  },
  "2": function _(_ref2) {
    var point = _ref2.point,
      value = _ref2.value;
    this.data[this.m0v0 * point[this.d0v0] + this.m0v1 * point[this.d0v1]] = value;
  },
  "3": function _(_ref3) {
    var point = _ref3.point,
      value = _ref3.value;
    this.data[this.m0v0 * point[this.d0v0] + this.m0v1 * point[this.d0v1] + this.m0v2 * point[this.d0v2]] = value;
  },
  "4": function _(_ref4) {
    var point = _ref4.point,
      value = _ref4.value;
    this.data[this.m0v0 * point[this.d0v0] + this.m0v1 * point[this.d0v1] + this.m0v2 * point[this.d0v2] + this.m0v3 * point[this.d0v3]] = value;
  },
  "5": function _(_ref5) {
    var point = _ref5.point,
      value = _ref5.value;
    this.data[this.m0v0 * point[this.d0v0] + this.m0v1 * point[this.d0v1] + this.m0v2 * point[this.d0v2] + this.m0v3 * point[this.d0v3] + this.m0v4 * point[this.d0v4]] = value;
  },
  "1,1": function _(_ref6) {
    var point = _ref6.point,
      value = _ref6.value;
    this.data[point[this.d0v0]][point[this.d1v0]] = value;
  },
  "1,2": function _(_ref7) {
    var point = _ref7.point,
      value = _ref7.value;
    this.data[point[this.d0v0]][this.m1v0 * point[this.d1v0] + this.m1v1 * point[this.d1v1]] = value;
  },
  "1,3": function _(_ref8) {
    var point = _ref8.point,
      value = _ref8.value;
    this.data[point[this.d0v0]][this.m1v0 * point[this.d1v0] + this.m1v1 * point[this.d1v1] + this.m1v2 * point[this.d1v2]] = value;
  },
  "1,4": function _(_ref9) {
    var point = _ref9.point,
      value = _ref9.value;
    this.data[point[this.d0v0]][this.m1v0 * point[this.d1v0] + this.m1v1 * point[this.d1v1] + this.m1v2 * point[this.d1v2] + this.m1v3 * point[this.d1v3]] = value;
  },
  "1,5": function _(_ref10) {
    var point = _ref10.point,
      value = _ref10.value;
    this.data[point[this.d0v0]][this.m1v0 * point[this.d1v0] + this.m1v1 * point[this.d1v1] + this.m1v2 * point[this.d1v2] + this.m1v3 * point[this.d1v3] + this.m1v4 * point[this.d1v4]] = value;
  },
  "1,1,1": function _(_ref11) {
    var point = _ref11.point,
      value = _ref11.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]] = value;
  },
  "1,1,2": function _(_ref12) {
    var point = _ref12.point,
      value = _ref12.value;
    this.data[point[this.d0v0]][point[this.d1v0]][this.m2v0 * point[this.d2v0] + this.m2v1 * point[this.d2v1]] = value;
  },
  "1,1,3": function _(_ref13) {
    var point = _ref13.point,
      value = _ref13.value;
    this.data[point[this.d0v0]][point[this.d1v0]][this.m2v0 * point[this.d2v0] + this.m2v1 * point[this.d2v1] + this.m2v2 * point[this.d2v2]] = value;
  },
  "1,1,4": function _(_ref14) {
    var point = _ref14.point,
      value = _ref14.value;
    this.data[point[this.d0v0]][point[this.d1v0]][this.m2v0 * point[this.d2v0] + this.m2v1 * point[this.d2v1] + this.m2v2 * point[this.d2v2] + this.m2v3 * point[this.d2v3]] = value;
  },
  "1,1,5": function _(_ref15) {
    var point = _ref15.point,
      value = _ref15.value;
    this.data[point[this.d0v0]][point[this.d1v0]][this.m2v0 * point[this.d2v0] + this.m2v1 * point[this.d2v1] + this.m2v2 * point[this.d2v2] + this.m2v3 * point[this.d2v3] + this.m2v4 * point[this.d2v4]] = value;
  },
  "1,1,1,1": function _(_ref16) {
    var point = _ref16.point,
      value = _ref16.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]] = value;
  },
  "1,1,1,2": function _(_ref17) {
    var point = _ref17.point,
      value = _ref17.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][this.m3v0 * point[this.d3v0] + this.m3v1 * point[this.d3v1]] = value;
  },
  "1,1,1,3": function _(_ref18) {
    var point = _ref18.point,
      value = _ref18.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][this.m3v0 * point[this.d3v0] + this.m3v1 * point[this.d3v1] + this.m3v2 * point[this.d3v2]] = value;
  },
  "1,1,1,4": function _(_ref19) {
    var point = _ref19.point,
      value = _ref19.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][this.m3v0 * point[this.d3v0] + this.m3v1 * point[this.d3v1] + this.m3v2 * point[this.d3v2] + this.m3v3 * point[this.d3v3]] = value;
  },
  "1,1,1,5": function _(_ref20) {
    var point = _ref20.point,
      value = _ref20.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][this.m3v0 * point[this.d3v0] + this.m3v1 * point[this.d3v1] + this.m3v2 * point[this.d3v2] + this.m3v3 * point[this.d3v3] + this.m3v4 * point[this.d3v4]] = value;
  },
  "1,1,1,1,1": function _(_ref21) {
    var point = _ref21.point,
      value = _ref21.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]][point[this.d4v0]] = value;
  },
  "1,1,1,1,2": function _(_ref22) {
    var point = _ref22.point,
      value = _ref22.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]][this.m4v0 * point[this.d4v0] + this.m4v1 * point[this.d4v1]] = value;
  },
  "1,1,1,1,3": function _(_ref23) {
    var point = _ref23.point,
      value = _ref23.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]][this.m4v0 * point[this.d4v0] + this.m4v1 * point[this.d4v1] + this.m4v2 * point[this.d4v2]] = value;
  },
  "1,1,1,1,4": function _(_ref24) {
    var point = _ref24.point,
      value = _ref24.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]][this.m4v0 * point[this.d4v0] + this.m4v1 * point[this.d4v1] + this.m4v2 * point[this.d4v2] + this.m4v3 * point[this.d4v3]] = value;
  },
  "1,1,1,1,5": function _(_ref25) {
    var point = _ref25.point,
      value = _ref25.value;
    this.data[point[this.d0v0]][point[this.d1v0]][point[this.d2v0]][point[this.d3v0]][this.m4v0 * point[this.d4v0] + this.m4v1 * point[this.d4v1] + this.m4v2 * point[this.d4v2] + this.m4v3 * point[this.d4v3] + this.m4v4 * point[this.d4v4]] = value;
  }
};

/***/ }),

/***/ 9760:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var layoutCache = {};
var _require = __webpack_require__(9877),
  wrapNextFunction = _require.wrapNextFunction;
var preparedSelectFunctions = __webpack_require__(2862);
var preparedUpdateFunctions = __webpack_require__(2075);
var ARRAY_TYPES = {
  Array: Array,
  Int8Array: Int8Array,
  Uint8Array: Uint8Array,
  Uint8ClampedArray: Uint8ClampedArray,
  Int16Array: Int16Array,
  Uint16Array: Uint16Array,
  Float32Array: Float32Array,
  Float64Array: Float64Array
};
try {
  ARRAY_TYPES.BigInt64Array = BigInt64Array;
  ARRAY_TYPES.BigUint64Array = BigUint64Array;
} catch (error) {
  // pass
}
function parseDimensions(str) {
  var dims = {};
  var re = /[A-Za-z]+/g;
  var arr;
  while ((arr = re.exec(str)) !== null) {
    var _arr = arr,
      _arr2 = _slicedToArray(_arr, 1),
      match = _arr2[0];
    dims[match] = {
      name: match
    };
  }
  return dims;
}
function normalizeLayoutString(str) {
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var i = 0;
  return str.replace(/[A-Za-z]+/g, function () {
    return alphabet[i++];
  });
}
var parseVectors = function parseVectors(str) {
  return str.match(/\[[^\]]+\]/g);
};

// "[row]" to "row"
var removeBraces = function removeBraces(str) {
  return str.startsWith("[") && str.endsWith("]") ? str.substring(1, str.length - 1) : str;
};

// "(row)" to "row"
var removeParentheses = function removeParentheses(str) {
  return str.startsWith("(") && str.endsWith(")") ? str.substring(1, str.length - 1) : str;
};

// sort of like parsing a CSV except instead of " for quotes use (
var matchSequences = function matchSequences(str) {
  return str.match(/(\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/g);
};
var parseSequences = function parseSequences(str) {
  // unwrap [...]
  str = removeBraces(str);

  // unwrap (...)
  str = removeParentheses(str);
  var seqs = matchSequences(str);
  if (seqs.length === 1) {
    return {
      type: "Vector",
      dim: seqs[0]
    };
  } else {
    return {
      type: "Matrix",
      parts: seqs.map(parseSequences)
    };
  }
};
function checkValidity(str) {
  var invalid = str.match(/[^ A-Za-z,\[\]]/g);
  if (invalid) {
    throw new Error("The following invalid characters were used: " + invalid.map(function (c) {
      return "\"".concat(c, "\"");
    }).join(", "));
  } else {
    return true;
  }
}
function parse(str) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      useLayoutCache: true
    },
    _ref$useLayoutCache = _ref.useLayoutCache,
    useLayoutCache = _ref$useLayoutCache === void 0 ? true : _ref$useLayoutCache;
  if (useLayoutCache && str in layoutCache) return layoutCache[str];
  checkValidity(str);
  var vectors = parseVectors(str);
  var dims = vectors.map(parseSequences);
  var result = {
    type: "Layout",
    summary: dims.map(function (it) {
      return it.type === "Matrix" ? it.parts.length : 1;
    }),
    dims: dims
  };
  if (useLayoutCache) layoutCache[str] = result;
  return result;
}
function update(_ref2) {
  var _ref2$useLayoutCache = _ref2.useLayoutCache,
    useLayoutCache = _ref2$useLayoutCache === void 0 ? true : _ref2$useLayoutCache,
    data = _ref2.data,
    layout = _ref2.layout,
    point = _ref2.point,
    _ref2$sizes = _ref2.sizes,
    sizes = _ref2$sizes === void 0 ? {} : _ref2$sizes,
    value = _ref2.value;
  if (typeof layout === "string") layout = parse(layout, {
    useLayoutCache: useLayoutCache
  });
  var _layout = layout,
    dims = _layout.dims;
  for (var idim = 0; idim < dims.length; idim++) {
    var last = idim === dims.length - 1;
    var arr = dims[idim];
    var offset = void 0;
    if (arr.type === "Vector") {
      offset = point[arr.dim];
    } else {
      // arr.type assumed to be "Matrix"
      var parts = arr.parts;
      offset = 0;
      var multiplier = 1;
      for (var i = parts.length - 1; i >= 0; i--) {
        var part = parts[i];
        var dim = part.dim;
        offset += multiplier * point[dim];
        if (i > 0) {
          if (!(dim in sizes)) throw new Error("you cannot calculate the location without knowing the size of the \"".concat(dim, "\" dimension."));
          multiplier *= sizes[dim];
        }
      }
    }
    if (last) {
      data[offset] = value;
    } else {
      data = data[offset];
    }
  }
}
function prepareUpdate(_ref3) {
  var _ref3$useLayoutCache = _ref3.useLayoutCache,
    useLayoutCache = _ref3$useLayoutCache === void 0 ? true : _ref3$useLayoutCache,
    data = _ref3.data,
    layout = _ref3.layout,
    _ref3$sizes = _ref3.sizes,
    sizes = _ref3$sizes === void 0 ? {} : _ref3$sizes;
  if (typeof layout === "string") {
    layout = parse(layout, {
      useLayoutCache: useLayoutCache
    });
  }
  var _layout2 = layout,
    dims = _layout2.dims;
  var numDims = dims.length;
  var multipliers = getMultipliers({
    useLayoutCache: useLayoutCache,
    layout: layout,
    sizes: sizes
  });
  var end = numDims - 1;
  var key = layout.summary.toString();
  if (key in preparedUpdateFunctions) {
    var _this = {
      data: data
    };
    layout.dims.map(function (it, depth) {
      if (it.type === "Vector") {
        _this["d".concat(depth, "v0")] = it.dim;
      } else if (it.type === "Matrix") {
        it.parts.forEach(function (part, ipart) {
          _this["d".concat(depth, "v").concat(ipart)] = part.dim;
          _this["m".concat(depth, "v").concat(ipart)] = multipliers[part.dim];
        });
      }
    });
    return preparedUpdateFunctions[key].bind(_this);
  }
  return function (_ref4) {
    var point = _ref4.point,
      value = _ref4.value;
    var currentData = data;
    for (var idim = 0; idim < numDims; idim++) {
      var last = idim === end;
      var arr = dims[idim];
      var offset = void 0;
      if (arr.type === "Vector") {
        offset = point[arr.dim];
      } else {
        // arr.type assumed to be "Matrix"
        offset = arr.parts.reduce(function (acc, _ref5) {
          var dim = _ref5.dim;
          return acc + multipliers[dim] * point[dim];
        }, 0);
      }
      if (last) {
        currentData[offset] = value;
      } else {
        currentData = currentData[offset];
      }
    }
  };
}
function iterClip(_ref6) {
  var data = _ref6.data,
    layout = _ref6.layout,
    order = _ref6.order,
    _ref6$rect = _ref6.rect,
    rect = _ref6$rect === void 0 ? {} : _ref6$rect,
    _ref6$sizes = _ref6.sizes,
    sizes = _ref6$sizes === void 0 ? {} : _ref6$sizes,
    _ref6$useLayoutCache = _ref6.useLayoutCache,
    useLayoutCache = _ref6$useLayoutCache === void 0 ? true : _ref6$useLayoutCache;
  if (!data) throw new Error("[xdim] must specify data");
  if (!layout) throw new Error("[xdim] must specify layout");
  var points = iterPoints({
    order: order,
    sizes: sizes,
    rect: rect
  });
  return wrapNextFunction(function next() {
    var _points$next = points.next(),
      point = _points$next.value,
      done = _points$next.done;
    if (done) {
      return {
        done: true
      };
    } else {
      var _select = select({
          data: data,
          layout: layout,
          point: point,
          sizes: sizes,
          useLayoutCache: useLayoutCache
        }),
        value = _select.value;
      return {
        done: false,
        value: value
      };
    }
  });
}
function validateRect(_ref7) {
  var _ref7$rect = _ref7.rect,
    rect = _ref7$rect === void 0 ? {} : _ref7$rect;
  if (rect) {
    for (var key in rect) {
      var value = rect[key];
      if (value.length !== 2) throw new Error("[xdim] uh oh. invalid hyper-rectangle");
      var _value = _slicedToArray(value, 2),
        start = _value[0],
        end = _value[1];
      if (start > end) throw new Error("[xdim] uh oh. invalid range for \"".concat(key, "\".  Start of ").concat(start, " can't be greater than end of ").concat(end, "."));
      if (start < 0) throw new Error("[xdim] uh oh. invalid hyper-rectangle with start ".concat(start));
    }
  }
}
function clip(_ref8) {
  var _ref8$useLayoutCache = _ref8.useLayoutCache,
    useLayoutCache = _ref8$useLayoutCache === void 0 ? true : _ref8$useLayoutCache,
    data = _ref8.data,
    layout = _ref8.layout,
    rect = _ref8.rect,
    _ref8$sizes = _ref8.sizes,
    sizes = _ref8$sizes === void 0 ? {} : _ref8$sizes,
    _ref8$flat = _ref8.flat,
    flat = _ref8$flat === void 0 ? false : _ref8$flat,
    _ref8$validate = _ref8.validate,
    validate = _ref8$validate === void 0 ? true : _ref8$validate;
  if (validate) validateRect({
    rect: rect
  });
  if (typeof layout === "string") layout = parse(layout, {
    useLayoutCache: useLayoutCache
  });
  var datas = [data];
  layout.dims.forEach(function (arr) {
    var new_datas = [];
    datas.forEach(function (data) {
      if (arr.type === "Vector") {
        var _rect$arr$dim = _slicedToArray(rect[arr.dim], 2),
          start = _rect$arr$dim[0],
          end = _rect$arr$dim[1];
        new_datas = new_datas.concat(data.slice(start, end + 1));
      } else {
        // only 2 types so must be arr.type === "Matrix"
        var parts = arr.parts;
        var offsets = [0];
        var multiplier = 1;
        var _loop = function _loop() {
          var part = parts[i];
          // assume part.type === "Vector"
          var dim = part.dim;
          var _rect$dim = _slicedToArray(rect[dim], 2),
            start = _rect$dim[0],
            end = _rect$dim[1];
          var new_offsets = [];
          var _loop2 = function _loop2(n) {
            offsets.forEach(function (offset) {
              new_offsets.push(offset + multiplier * n);
            });
          };
          for (var n = start; n <= end; n++) {
            _loop2(n);
          }
          offsets = new_offsets;
          multiplier *= sizes[dim];
        };
        for (var i = parts.length - 1; i >= 0; i--) {
          _loop();
        }
        offsets.forEach(function (offset) {
          new_datas.push(data[offset]);
        });
      }
    });
    datas = new_datas;
  });
  if (flat) {
    return {
      data: datas
    };
  }

  // prepareResult
  var out_sizes = Object.fromEntries(Object.entries(rect).map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
      dim = _ref10[0],
      _ref10$ = _slicedToArray(_ref10[1], 2),
      start = _ref10$[0],
      end = _ref10$[1];
    return [dim, end - start + 1];
  }));
  var _prepareData = prepareData({
      layout: layout,
      sizes: out_sizes
    }),
    out_data = _prepareData.data;
  var max_depth = layout.dims.length;
  var step = function step(arr, depth) {
    if (depth === max_depth) {
      for (var i = 0; i < arr.length; i++) {
        arr[i] = datas.shift();
      }
    } else {
      arr.forEach(function (sub) {
        return step(sub, depth + 1);
      });
    }
  };
  step(out_data, 1);
  return {
    data: out_data
  };
}
function getMultipliers(_ref11) {
  var _ref11$useLayoutCache = _ref11.useLayoutCache,
    useLayoutCache = _ref11$useLayoutCache === void 0 ? true : _ref11$useLayoutCache,
    layout = _ref11.layout,
    sizes = _ref11.sizes;
  if (typeof layout === "string") {
    layout = parse(layout, {
      useLayoutCache: useLayoutCache
    });
  }
  var _layout3 = layout,
    dims = _layout3.dims;
  var numDims = dims.length;
  var multipliers = {};
  for (var idim = 0; idim < numDims; idim++) {
    var arr = dims[idim];
    if (arr.type === "Vector") {
      multipliers[arr.dim] = 1;
    } else {
      // arr.type assumed to be "Matrix"
      var parts = arr.parts;
      var multiplier = 1;
      for (var i = parts.length - 1; i >= 0; i--) {
        var dim = parts[i].dim;
        multipliers[dim] = multiplier;
        multiplier *= sizes[parts[i].dim];
      }
    }
  }
  return multipliers;
}
function prepareSelect(_ref12) {
  var _ref12$useLayoutCache = _ref12.useLayoutCache,
    useLayoutCache = _ref12$useLayoutCache === void 0 ? true : _ref12$useLayoutCache,
    data = _ref12.data,
    layout = _ref12.layout,
    _ref12$sizes = _ref12.sizes,
    sizes = _ref12$sizes === void 0 ? {} : _ref12$sizes;
  if (typeof layout === "string") {
    layout = parse(layout, {
      useLayoutCache: useLayoutCache
    });
  }
  var _layout4 = layout,
    dims = _layout4.dims;
  var numDims = dims.length;
  var multipliers = getMultipliers({
    useLayoutCache: useLayoutCache,
    layout: layout,
    sizes: sizes
  });
  var end = numDims - 1;
  var key = layout.summary.toString();
  if (key in preparedSelectFunctions) {
    var _this = {
      data: data
    };
    layout.dims.map(function (it, depth) {
      if (it.type === "Vector") {
        _this["d".concat(depth, "v0")] = it.dim;
      } else if (it.type === "Matrix") {
        it.parts.forEach(function (part, ipart) {
          _this["d".concat(depth, "v").concat(ipart)] = part.dim;
          _this["m".concat(depth, "v").concat(ipart)] = multipliers[part.dim];
        });
      }
    });
    return preparedSelectFunctions[key].bind(_this);
  }
  return function (_ref13) {
    var point = _ref13.point;
    var currentData = data;
    for (var idim = 0; idim < numDims; idim++) {
      var last = idim === end;
      var arr = dims[idim];
      var offset = void 0;
      if (arr.type === "Vector") {
        offset = point[arr.dim];
      } else {
        // arr.type assumed to be "Matrix"
        offset = arr.parts.reduce(function (acc, _ref14) {
          var dim = _ref14.dim;
          return acc + multipliers[dim] * point[dim];
        }, 0);
      }
      if (last) {
        return {
          index: offset,
          parent: currentData,
          value: currentData[offset]
        };
      } else {
        currentData = currentData[offset];
      }
    }
  };
}
function select(_ref15) {
  var _ref15$useLayoutCache = _ref15.useLayoutCache,
    useLayoutCache = _ref15$useLayoutCache === void 0 ? true : _ref15$useLayoutCache,
    data = _ref15.data,
    layout = _ref15.layout,
    point = _ref15.point,
    _ref15$sizes = _ref15.sizes,
    sizes = _ref15$sizes === void 0 ? {} : _ref15$sizes;
  // converts layout expression to a layout object
  if (typeof layout === "string") {
    layout = parse(layout, {
      useLayoutCache: useLayoutCache
    });
  }
  var parent;
  var index;
  var value = data;
  // dims are arrays
  var _layout5 = layout,
    dims = _layout5.dims;
  var len = dims.length;
  for (var idim = 0; idim < len; idim++) {
    var arr = dims[idim];
    if (arr.type === "Vector") {
      var i = point[arr.dim];
      parent = value;
      index = i;
      value = value[i];
    } else {
      // only 2 types so must be a Matrix
      var parts = arr.parts;
      var offset = 0;
      var multiplier = 1;
      for (var _i = parts.length - 1; _i >= 0; _i--) {
        var part = parts[_i];
        if (part.type === "Vector") {
          var dim = part.dim;
          offset += multiplier * point[dim];
          if (_i > 0) {
            if (!(dim in sizes)) throw new Error("you cannot calculate the location without knowing the size of the \"".concat(dim, "\" dimension."));
            multiplier *= sizes[dim];
          }
        }
      }
      parent = value;
      index = offset;
      value = value[offset];
    }
  }
  return {
    index: index,
    value: value,
    parent: parent
  };
}

// add dimensions to an array until the limit reaches zero
function addDims(_ref16) {
  var arr = _ref16.arr,
    _ref16$fill = _ref16.fill,
    fill = _ref16$fill === void 0 ? undefined : _ref16$fill,
    lens = _ref16.lens,
    arrayTypes = _ref16.arrayTypes;
  // no new dimensions to add
  if (lens.length === 0) return arr;
  var len = lens[0];
  if (lens.length === 1) {
    var lastArrayType = arrayTypes ? arrayTypes[arrayTypes.length - 1] : "Array";
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new ARRAY_TYPES[lastArrayType](len).fill(fill);
    }
  } else {
    for (var _i2 = 0; _i2 < arr.length; _i2++) {
      var sub = new Array(len).fill(fill);
      arr[_i2] = sub;
      addDims({
        arr: sub,
        fill: fill,
        lens: lens.slice(1),
        arrayTypes: arrayTypes
      });
    }
  }
  return arr;
}

// to-do: maybe only call fill if not undefined or default typed array value?
function createMatrix(_ref17) {
  var _ref17$fill = _ref17.fill,
    fill = _ref17$fill === void 0 ? undefined : _ref17$fill,
    shape = _ref17.shape,
    arrayTypes = _ref17.arrayTypes;
  var len = shape[0];
  if (shape.length === 1) {
    if (Array.isArray(arrayTypes) && arrayTypes.length !== 1) throw new Error("[xdim] shape and arrayTypes have different lengths");
    var arrayType = Array.isArray(arrayTypes) ? arrayTypes[0] : "Array";
    return new ARRAY_TYPES[arrayType](len).fill(fill);
  }
  var arr = new Array(len).fill(fill);
  return addDims({
    arr: arr,
    fill: fill,
    lens: shape.slice(1),
    arrayTypes: arrayTypes
  });
}

// generates an in-memory data structure to hold the data
function prepareData(_ref18) {
  var _ref18$fill = _ref18.fill,
    fill = _ref18$fill === void 0 ? undefined : _ref18$fill,
    layout = _ref18.layout,
    _ref18$useLayoutCache = _ref18.useLayoutCache,
    useLayoutCache = _ref18$useLayoutCache === void 0 ? true : _ref18$useLayoutCache,
    sizes = _ref18.sizes,
    arrayTypes = _ref18.arrayTypes;
  if (typeof layout === "string") layout = parse(layout, {
    useLayoutCache: useLayoutCache
  });

  // console.log("layout:", layout);
  var shape = layout.dims.map(function (it) {
    if (it.type === "Vector") {
      return sizes[it.dim];
    } else if (it.type === "Matrix") {
      return it.parts.reduce(function (total, part) {
        if (!(part.dim in sizes)) throw new Error("[xdim] could not find \"".concat(part.dim, "\" in sizes: { ").concat(Object.keys(sizes).join(", "), " }"));
        return total * sizes[part.dim];
      }, 1);
    }
  });
  var data = createMatrix({
    fill: fill,
    shape: shape,
    arrayTypes: arrayTypes
  });
  return {
    data: data,
    shape: shape,
    arrayTypes: arrayTypes
  };
}

// assume positive step
function iterRange(_ref19) {
  var _ref19$start = _ref19.start,
    start = _ref19$start === void 0 ? 0 : _ref19$start,
    _ref19$end = _ref19.end,
    end = _ref19$end === void 0 ? 100 : _ref19$end;
  var i = start - 1;
  end = end + 1;
  return wrapNextFunction(function next() {
    i++;
    if (i === end) {
      return {
        done: true
      };
    } else {
      return {
        done: false,
        value: i
      };
    }
  });
}

// iterate over all the points, saving memory vs array
function iterPoints(_ref20) {
  var order = _ref20.order,
    sizes = _ref20.sizes,
    _ref20$rect = _ref20.rect,
    rect = _ref20$rect === void 0 ? {} : _ref20$rect;
  // names sorted by shortest dimension to longest dimension
  var names = Array.isArray(order) ? order : Object.keys(sizes).sort(function (a, b) {
    return sizes[a] - sizes[b];
  });
  var iters = new Array(names.length);
  var current = {};
  for (var i = 0; i < names.length - 1; i++) {
    var name = names[i];
    var _ref21 = rect[name] || [0, sizes[name] - 1],
      _ref22 = _slicedToArray(_ref21, 2),
      _start = _ref22[0],
      _end = _ref22[1];
    iters[i] = iterRange({
      start: _start + 1,
      end: _end
    });
    current[name] = _start;
  }
  var lastName = names[names.length - 1];
  var _ref23 = rect[lastName] || [0, sizes[lastName] - 1],
    _ref24 = _slicedToArray(_ref23, 2),
    start = _ref24[0],
    end = _ref24[1];
  iters[iters.length - 1] = iterRange({
    start: start,
    end: end
  });
  current[lastName] = start - 1;

  // permutate
  return wrapNextFunction(function next() {
    for (var _i3 = iters.length - 1; _i3 >= 0; _i3--) {
      var _iters$_i3$next = iters[_i3].next(),
        value = _iters$_i3$next.value,
        done = _iters$_i3$next.done;
      if (done) {
        if (_i3 === 0) {
          // we have exhausted all of the permutations
          return {
            done: true
          };
        }
      } else {
        // add iters for the remaining dims
        for (var ii = _i3 + 1; ii < iters.length; ii++) {
          var nameii = names[ii];
          var _ref25 = rect[nameii] || [0, sizes[nameii] - 1],
            _ref26 = _slicedToArray(_ref25, 2),
            _start2 = _ref26[0],
            _end2 = _ref26[1];
          iters[ii] = iterRange({
            start: _start2 + 1,
            end: _end2
          });
          current[nameii] = _start2;
        }
        current[names[_i3]] = value;
        return {
          value: current,
          done: false
        };
      }
    }
  });
}
function transform(_ref27) {
  var data = _ref27.data,
    _ref27$fill = _ref27.fill,
    fill = _ref27$fill === void 0 ? undefined : _ref27$fill,
    from = _ref27.from,
    to = _ref27.to,
    sizes = _ref27.sizes,
    _ref27$useLayoutCache = _ref27.useLayoutCache,
    useLayoutCache = _ref27$useLayoutCache === void 0 ? true : _ref27$useLayoutCache;
  if (typeof from === "string") from = parse(from, {
    useLayoutCache: useLayoutCache
  });
  if (typeof to === "string") to = parse(to, {
    useLayoutCache: useLayoutCache
  });
  var _prepareData2 = prepareData({
      fill: fill,
      layout: to,
      sizes: sizes
    }),
    out_data = _prepareData2.data;
  var update = prepareUpdate({
    useLayoutCache: useLayoutCache,
    data: out_data,
    layout: to,
    sizes: sizes
  });
  var points = iterPoints({
    sizes: sizes
  });
  var _iterator = _createForOfIteratorHelper(points),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      point = _step.value;
      var _select2 = select({
          data: data,
          layout: from,
          point: point,
          sizes: sizes
        }),
        value = _select2.value;

      // insert into new frame
      update({
        point: point,
        value: value
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    data: out_data
  };
}
module.exports = {
  addDims: addDims,
  checkValidity: checkValidity,
  createMatrix: createMatrix,
  iterClip: iterClip,
  iterRange: iterRange,
  iterPoints: iterPoints,
  matchSequences: matchSequences,
  parse: parse,
  parseDimensions: parseDimensions,
  parseSequences: parseSequences,
  parseVectors: parseVectors,
  prepareData: prepareData,
  prepareSelect: prepareSelect,
  prepareUpdate: prepareUpdate,
  removeBraces: removeBraces,
  removeParentheses: removeParentheses,
  select: select,
  transform: transform,
  update: update,
  clip: clip,
  validateRect: validateRect
};

/***/ }),

/***/ 8293:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__8293__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ georaster_layer_for_leaflet)
});

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(30);
// EXTERNAL MODULE: external {"root":"L","commonjs":"leaflet","amd":"leaflet","commonjs2":"leaflet"}
var external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_ = __webpack_require__(8293);
// EXTERNAL MODULE: ./node_modules/chroma-js/chroma.js
var chroma = __webpack_require__(4053);
var chroma_default = /*#__PURE__*/__webpack_require__.n(chroma);
// EXTERNAL MODULE: ./node_modules/geocanvas/src/full.js
var full = __webpack_require__(5168);
var full_default = /*#__PURE__*/__webpack_require__.n(full);
// EXTERNAL MODULE: ./node_modules/xdim/src/xdim.js
var xdim = __webpack_require__(9760);
// EXTERNAL MODULE: ./node_modules/quick-scale/quick-scale.js
var quick_scale = __webpack_require__(97);
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgba/index.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }







function raw_to_rgba_rawToRgba(_ref) {
  var _ref$debug_level = _ref.debug_level,
    debug_level = _ref$debug_level === void 0 ? 0 : _ref$debug_level,
    ranges = _ref.ranges,
    _ref$flip = _ref.flip,
    flip = _ref$flip === void 0 ? false : _ref$flip,
    new_no_data_value = _ref.new_no_data_value,
    no_data_strategy = _ref.no_data_strategy,
    no_range_value = _ref.no_range_value,
    no_range_value_strategy = _ref.no_range_value_strategy,
    old_no_data_value = _ref.old_no_data_value;
  if (debug_level >= 1) console.log("[pixel-utils/raw-to-rgba] ranges:", ranges);
  var nbands = ranges.length;
  var new_range = [0 === new_no_data_value ? 1 : 0, 255 === new_no_data_value ? 254 : 255];
  if (debug_level >= 1) console.log("[pixel-utils/raw-to-rgba] new_range:", new_range);
  var options = {
    no_data_value: new_no_data_value,
    flip: flip,
    no_range_value: no_range_value,
    no_range_value_strategy: no_range_value_strategy,
    round: true
  };
  if (debug_level >= 1) console.log("[pixel-utils/raw-to-rgba] options:", options);
  var scalefns = ranges.slice(0, 3).map(function (rng) {
    return createScaleFunction(rng, new_range, options);
  });
  if (nbands === 1) {
    // @ts-ignore
    return convertSingle.bind(null, old_no_data_value, makeNoDataRGBA(new_no_data_value), scalefns[0]);
  } else if (nbands === 2) {
    if (no_data_strategy === "all") {
      // @ts-ignore
      return convertDoubleAll.bind.apply(convertDoubleAll, [null, old_no_data_value, makeNoDataRGBA(new_no_data_value)].concat(_toConsumableArray(scalefns)));
    } else {
      // @ts-ignore
      return convertDouble.bind.apply(convertDouble, [null, old_no_data_value, new_no_data_value].concat(_toConsumableArray(scalefns)));
    }
  } else if (nbands >= 3) {
    if (no_data_strategy === "all") {
      // @ts-ignore
      return convertMultiAll.bind.apply(convertMultiAll, [null, old_no_data_value, makeNoDataRGBA(new_no_data_value)].concat(_toConsumableArray(scalefns)));
    } else {
      // @ts-ignore
      return convertMulti.bind.apply(convertMulti, [null, old_no_data_value, new_no_data_value].concat(_toConsumableArray(scalefns)));
    }
  }
  throw Error("uh oh");
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/enums.js
var enums_Layout;
(function (Layout) {
  Layout["[band][row][column]"] = "[band][row][column]";
  Layout["[band][row,column]"] = "[band][row,column]";
  Layout["[band,row,column]"] = "[band,row,column]";
  Layout["[row,column,band]"] = "[row,column,band]";
  Layout["[row,column][band]"] = "[row,column][band]";
  Layout["[row][column][band]"] = "[row][column][band]";
  Layout["[row][column,band]"] = "[row][column,band]";
})(enums_Layout || (enums_Layout = {}));
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/select-pixel/index.js








function select_pixel_selectPixel(data, _ref) {
  var depth = _ref.depth,
    height = _ref.height,
    layout = _ref.layout,
    width = _ref.width;
  // console.log("layout:", {layout, data, depth, width});
  switch (layout) {
    case Layout["[band][row][column]"]:
      // @ts-ignore
      return select_b_r_c.bind(null, data, depth);
    case Layout["[band][row,column]"]:
      // @ts-ignore
      return select_b_rc.bind(null, data, depth, width);
    case Layout["[band,row,column]"]:
      // @ts-ignore
      return select_brc.bind(null, data, depth, height, width);
    case Layout["[row,column][band]"]:
      // @ts-ignore
      return select_rc_b.bind(null, data, width);
    case Layout["[row][column][band]"]:
      // @ts-ignore
      return select_r_c_b.bind(null, data);
    case Layout["[row][column,band]"]:
      // @ts-ignore
      return select_r_cb.bind(null, data, depth);
    case Layout["[row,column,band]"]:
      // @ts-ignore
      return select_rcb.bind(null, data, depth, width);
    default:
      throw new Error("[pixel-utils] unknown layout " + layout);
  }
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/fit/index.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || fit_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function fit_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return fit_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return fit_arrayLikeToArray(o, minLen); }
function fit_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



// fit raw bands to 8-bit color space
// while slicing and scaling as necessary
function fit(_ref) {
  var data = _ref.data,
    _ref$debug_level = _ref.debug_level,
    debug_level = _ref$debug_level === void 0 ? 0 : _ref$debug_level,
    depth = _ref.depth,
    _ref$flip = _ref.flip,
    flip = _ref$flip === void 0 ? false : _ref$flip,
    old_no_data_value = _ref.old_no_data_value,
    old_layout = _ref.old_layout,
    _ref$no_data_strategy = _ref.no_data_strategy,
    no_data_strategy = _ref$no_data_strategy === void 0 ? "partial" : _ref$no_data_strategy,
    no_range_value = _ref.no_range_value,
    _ref$no_range_value_s = _ref.no_range_value_strategy,
    no_range_value_strategy = _ref$no_range_value_s === void 0 ? "top" : _ref$no_range_value_s,
    new_layout = _ref.new_layout,
    new_no_data_value = _ref.new_no_data_value,
    height = _ref.height,
    ranges = _ref.ranges,
    width = _ref.width;
  if (!ranges) throw new Error("[expand] can't expand without ranges");
  if (debug_level >= 1) console.log("[stretch] starting fit");
  if (typeof height !== "number") throw new Error("[fit] height must be a number");
  if (typeof width !== "number") throw new Error("[fit] height must be a number");
  if (typeof old_layout !== "string") throw new Error("[fit] old_layout must be a string");
  if (new_layout === undefined) new_layout === "[row,column,band]";
  if (typeof new_layout !== "string") throw new Error("[fit] new_layout must be a string");
  var select = selectPixel(data, {
    depth: depth,
    height: height,
    layout: old_layout,
    width: width
  });
  var out_sizes = {
    band: 4,
    row: height,
    column: width
  };
  var _prepareData = prepareData({
      fill: new_no_data_value,
      layout: new_layout,
      sizes: out_sizes
    }),
    out_data = _prepareData.data;
  var convert = rawToRgba({
    debug_level: debug_level - 1,
    flip: flip,
    ranges: ranges,
    new_no_data_value: new_no_data_value,
    no_data_strategy: no_data_strategy,
    no_range_value: no_range_value,
    no_range_value_strategy: no_range_value_strategy,
    old_no_data_value: old_no_data_value
  });
  var update = prepareUpdate({
    data: out_data,
    layout: new_layout,
    sizes: out_sizes
  });
  for (var row = 0; row < height; row++) {
    for (var column = 0; column < width; column++) {
      var _convert = convert(select(row, column)),
        _convert2 = _slicedToArray(_convert, 4),
        r = _convert2[0],
        g = _convert2[1],
        b = _convert2[2],
        a = _convert2[3];
      update({
        point: {
          band: 0,
          row: row,
          column: column
        },
        value: r
      });
      update({
        point: {
          band: 1,
          row: row,
          column: column
        },
        value: g
      });
      update({
        point: {
          band: 2,
          row: row,
          column: column
        },
        value: b
      });
      update({
        point: {
          band: 3,
          row: row,
          column: column
        },
        value: a
      });
    }
  }
  if (debug_level >= 1) console.log("[pixel-utils/fit] out_data:", out_data);
  return {
    // @ts-ignore
    data: out_data,
    layout: new_layout
  };
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/make-no-data-rgb/index.js
function makeNoDataRGB(noDataValue) {
  // typescript not smart enough to realize all values in the array will be the same
  // @ts-ignore
  return [noDataValue, noDataValue, noDataValue];
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/convert-single.js
function convert_raw_one_band_pixel_to_rgb(noDataValue, noDataPixel, scale, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  var scaled = scale(pixel[0]);
  return [scaled, scaled, scaled];
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/convert-single-str.js
function convert_raw_one_band_pixel_to_rgb_str(noDataValue, noDataPixel, scale, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  var scaled = scale(pixel[0]);
  return "rgb(" + scaled + ", " + scaled + ", " + scaled + ")";
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/convert-double.js
function convert_raw_two_band_pixel_to_rgb(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  return [scaleFunction1(pixel[0]), scaleFunction2(pixel[1]), 0];
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/convert-double-str.js
function convert_raw_two_band_pixel_to_rgb_str(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  return "rgb(" + scaleFunction1(pixel[0]) + ", " + scaleFunction2(pixel[1]) + ", 0)";
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/convert-triple.js
function convert_raw_three_band_pixel_to_rgb(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, scaleFunction3, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  return [scaleFunction1(pixel[0]), scaleFunction2(pixel[1]), scaleFunction3(pixel[2])];
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/convert-triple-str.js
function convert_raw_three_band_pixel_to_rgb_css(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, scaleFunction3, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  return "rgb(" + scaleFunction1(pixel[0]) + ", " + scaleFunction2(pixel[1]) + ", " + scaleFunction3(pixel[2]) + ")";
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/convert-many.js
function convert_many_convert_raw_two_band_pixel_to_rgb(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, scaleFunction3, pixel) {
  pixel = pixel.slice(0, 3);
  if (pixel.includes(noDataValue)) return noDataPixel;
  return [scaleFunction1(pixel[0]), scaleFunction2(pixel[1]), scaleFunction3(pixel[2])];
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/convert-many-str.js
function convert_many_str_convert_raw_two_band_pixel_to_rgb_str(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, scaleFunction3, pixel) {
  pixel = pixel.slice(0, 3);
  if (pixel.includes(noDataValue)) return noDataPixel;
  return "rgb(" + scaleFunction1(pixel[0]) + ", " + scaleFunction2(pixel[1]) + ", " + scaleFunction3(pixel[2]) + ")";
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/rgb-to-str/index.js
function rgb_to_str_slicedToArray(arr, i) { return rgb_to_str_arrayWithHoles(arr) || rgb_to_str_iterableToArrayLimit(arr, i) || rgb_to_str_unsupportedIterableToArray(arr, i) || rgb_to_str_nonIterableRest(); }
function rgb_to_str_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function rgb_to_str_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return rgb_to_str_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return rgb_to_str_arrayLikeToArray(o, minLen); }
function rgb_to_str_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function rgb_to_str_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function rgb_to_str_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// prettier-ignore
function rgbToStr(_ref) {
  var _ref2 = rgb_to_str_slicedToArray(_ref, 3),
    r = _ref2[0],
    g = _ref2[1],
    b = _ref2[2];
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/raw-to-rgb/index.js
function raw_to_rgb_toConsumableArray(arr) { return raw_to_rgb_arrayWithoutHoles(arr) || raw_to_rgb_iterableToArray(arr) || raw_to_rgb_unsupportedIterableToArray(arr) || raw_to_rgb_nonIterableSpread(); }
function raw_to_rgb_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function raw_to_rgb_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return raw_to_rgb_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return raw_to_rgb_arrayLikeToArray(o, minLen); }
function raw_to_rgb_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function raw_to_rgb_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return raw_to_rgb_arrayLikeToArray(arr); }
function raw_to_rgb_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }











function rawToRgb(_ref) {
  var _ref$format = _ref.format,
    format = _ref$format === void 0 ? "array" : _ref$format,
    ranges = _ref.ranges,
    flip = _ref.flip,
    new_no_data_pixel = _ref.new_no_data_pixel,
    new_no_data_value = _ref.new_no_data_value,
    no_range_value = _ref.no_range_value,
    no_range_value_strategy = _ref.no_range_value_strategy,
    old_no_data_value = _ref.old_no_data_value,
    _ref$round = _ref.round,
    round = _ref$round === void 0 ? true : _ref$round;
  var nbands = ranges.length;
  if (new_no_data_pixel && new_no_data_value) {
    throw new Error("[pixel-utils/raw-to-rgb] can't specify both new_no_data_pixel and new_no_data_value");
  }
  if (new_no_data_pixel === undefined || new_no_data_pixel === null) {
    if (new_no_data_value === undefined || new_no_data_value === null) {
      new_no_data_pixel = makeNoDataRGB(null);
    } else {
      new_no_data_pixel = makeNoDataRGB(new_no_data_value);
    }
  }
  if (new_no_data_pixel === undefined) throw new Error("[raw-to-rgb] undefined new_no_data_pixel");
  var new_range = [0 === new_no_data_value ? 1 : 0, 255 === new_no_data_value ? 254 : 255];
  var options = {
    flip: flip,
    no_range_value: no_range_value,
    no_range_value_strategy: no_range_value_strategy,
    round: round
  };
  var scalefns = ranges.slice(0, 3).map(function (rng) {
    return (0,quick_scale.createScaleFunction)(rng, new_range, options);
  });
  if (nbands === 1) {
    if (format === "string") {
      // @ts-ignore
      return convert_raw_one_band_pixel_to_rgb_str.bind.apply(convert_raw_one_band_pixel_to_rgb_str, [null, old_no_data_value, rgbToStr(new_no_data_pixel)].concat(raw_to_rgb_toConsumableArray(scalefns)));
    } else {
      // @ts-ignore
      return convert_raw_one_band_pixel_to_rgb.bind.apply(convert_raw_one_band_pixel_to_rgb, [null, old_no_data_value, new_no_data_pixel].concat(raw_to_rgb_toConsumableArray(scalefns)));
    }
  } else if (nbands === 2) {
    if (format === "string") {
      // @ts-ignore
      return convert_raw_two_band_pixel_to_rgb_str.bind.apply(convert_raw_two_band_pixel_to_rgb_str, [null, old_no_data_value, rgbToStr(new_no_data_pixel)].concat(raw_to_rgb_toConsumableArray(scalefns)));
    } else {
      // @ts-ignore
      return convert_raw_two_band_pixel_to_rgb.bind.apply(convert_raw_two_band_pixel_to_rgb, [null, old_no_data_value, new_no_data_pixel].concat(raw_to_rgb_toConsumableArray(scalefns)));
    }
  } else if (nbands === 3) {
    if (format === "string") {
      // @ts-ignore
      return convert_raw_three_band_pixel_to_rgb_css.bind.apply(convert_raw_three_band_pixel_to_rgb_css, [null, old_no_data_value, rgbToStr(new_no_data_pixel)].concat(raw_to_rgb_toConsumableArray(scalefns)));
    } else {
      // @ts-ignore
      return convert_raw_three_band_pixel_to_rgb.bind.apply(convert_raw_three_band_pixel_to_rgb, [null, old_no_data_value, new_no_data_pixel].concat(raw_to_rgb_toConsumableArray(scalefns)));
    }
  } else if (nbands >= 4) {
    if (format === "string") {
      // @ts-ignore
      return convert_many_str_convert_raw_two_band_pixel_to_rgb_str.bind.apply(convert_many_str_convert_raw_two_band_pixel_to_rgb_str, [null, old_no_data_value, rgbToStr(new_no_data_pixel)].concat(raw_to_rgb_toConsumableArray(scalefns)));
    } else {
      // @ts-ignore
      return convert_many_convert_raw_two_band_pixel_to_rgb.bind.apply(convert_many_convert_raw_two_band_pixel_to_rgb, [null, old_no_data_value, new_no_data_pixel].concat(raw_to_rgb_toConsumableArray(scalefns)));
    }
  } else {
    throw new Error("[pixel-utils/raw-to-rgb] invalid number of bands: " + nbands);
  }
}
;// CONCATENATED MODULE: ./node_modules/pixel-utils/dist/esm/index.js



















// EXTERNAL MODULE: ./node_modules/utm-utils/src/isUTM.js
var isUTM = __webpack_require__(8868);
var isUTM_default = /*#__PURE__*/__webpack_require__.n(isUTM);
// EXTERNAL MODULE: ./node_modules/utm-utils/src/getProjString.js
var getProjString = __webpack_require__(1018);
var getProjString_default = /*#__PURE__*/__webpack_require__.n(getProjString);
// EXTERNAL MODULE: ./node_modules/proj4-fully-loaded/proj4-fully-loaded.js
var proj4_fully_loaded = __webpack_require__(2467);
var proj4_fully_loaded_default = /*#__PURE__*/__webpack_require__.n(proj4_fully_loaded);
// EXTERNAL MODULE: ./node_modules/preciso/add.js
var add = __webpack_require__(1889);
// EXTERNAL MODULE: ./node_modules/preciso/divide.js
var divide = __webpack_require__(4293);
// EXTERNAL MODULE: ./node_modules/preciso/multiply.js
var multiply = __webpack_require__(6848);
// EXTERNAL MODULE: ./node_modules/preciso/subtract.js
var subtract = __webpack_require__(8244);
// EXTERNAL MODULE: ./node_modules/get-epsg-code/dist/get-epsg-code-all.node.min.js
var get_epsg_code_all_node_min = __webpack_require__(7730);
// EXTERNAL MODULE: ./node_modules/reproject-bbox/reproject-bbox.js
var reproject_bbox = __webpack_require__(1291);
;// CONCATENATED MODULE: ./node_modules/geo-extent/dist/geo-extent.mjs


/****
 * TO DO:
 * add support for GeoJSON and need to check projection of GeoJSON
 */







const avg = (a, b) => divide(add(a.toString(), b.toString()), "2");
const isAry = o => Array.isArray(o);
const isDef = o => o !== undefined && o !== null && o !== "";
const isFunc = o => typeof o === "function";

// identifying GeoJSON currently unused
// shouldn't rely on type being provided
// because sometimes the rest could be valid but no type is provided
// const isFeatureCollection = it => isObj(it) && it.type === "FeatureCollection" && hasKey(it, "features");
// const isFeature = it => isObj(it) && it.type === "Feature" && hasKey(it, "geometry");
// const isGeometryCollection = it => isObj(it) && it.type === "GeometryCollection" && hasKey("geometries");
// const isMultiPolygon = it => isObj(it) && it.type === "MultiPolygon" && hasKey(it, "coordinates");
// const isPolygon = it => isObj(it) && it.type === "Polygon" && hasKey(it, "coordinates");
// const isPoint = it => isObj(it) && it.type === "Point" && hasKey(it, "coordinates");
// const isMultiPoint = it => isObj(it) && isObj.type === "MultiPoint" && hasKey(it, "coordinates");

const isObj = o => typeof o === "object";
const isStr = o => typeof o === "string";
const isNum = o => typeof o === "number";
const isBoxStr = o => isStr(o) && !!o.match(/^[-|+]?[\d\.]+(, ?[-|+]?[\d\.]+){3}$/);
const isLeafletLatLngBounds = o => isObj(o) && hasFuncs(o, ["getEast", "getNorth", "getSouth", "getWest"]);
const hasFunc = (o, f) => isObj(o) && isFunc(o[f]);
const hasObj = (o, k) => isObj(o) && isObj(o[k]);
const hasFuncs = (o, fs) => fs.every(f => hasFunc(o, f));
const hasObjs = (o, ks) => ks.every(k => hasObj(o, k));
const hasKey = (o, k) => isObj(o) && o[k] !== undefined && o[k] !== null;
const hasKeys = (o, ks) => ks.every(k => hasKey(o, k));
const allNums = ary => isAry(ary) && ary.every(isNum);
const allStrs = ary => isAry(ary) && ary.every(isStr);
const getConstructor = o => (typeof obj === "object" && typeof obj.constructor === "function") || undefined;
const normalize = srs => {
  if (!srs) return srs;
  if (isStr(srs) && srs.startsWith("EPSG:")) return srs;
  if (isStr(srs) && srs.match(/^\d+$/)) return "EPSG:" + srs;
  else if (isNum(srs)) return "EPSG:" + srs;
  const code = get_epsg_code_all_node_min(srs);
  if (isNum(code)) return "EPSG:" + code;
  return srs;
};

// currently unused
// const getConstructorName = o =>
//   (typeof obj === "object" &&
//     typeof obj.constructor === "function" &&
//     typeof obj.constructor.name === "string" &&
//     obj.constructor.name) ||
//   undefined;

// const forEachCoord = (data, cb) => {
//   if (data.features) data.features.forEach(forEachCoord);
//   else if (data.geometry) forEachCoord(data.geometry);
//   else if (data.coordinates) forEachCoord(data.coordinates);
//   else if (Array.isArray(data) && Array.isArray(data[0])) data.map(forEachCoord);
//   else if (Array.isArray(data) && (data.length === 2 || data.length === 3) && typeof data[0] === "number") {
//     const [x, y, z] = data;
//     cb({ x, y, z });
//   }
// };

// const getExtentOfGeoJSON = geojson => {
//   let xmin, xmax, ymin, ymax;
//   if (geojson.features) {

//   }
// }

class GeoExtent {
  constructor(o, { srs } = {}) {
    this.srs = normalize(srs);

    let xmin, xmax, ymin, ymax;
    let xmin_str, xmax_str, ymin_str, ymax_str;
    if (getConstructor(o) === this.constructor) {
      ({ xmin, xmax, ymin, ymax } = o);
      if (isDef(o.srs)) {
        this.srs = normalize(o.srs);
      }
    }

    if (isBoxStr(o)) o = o.split(/, ?/);

    if (isAry(o) && o.length === 4 && allNums(o)) {
      [xmin, ymin, xmax, ymax] = o;
    } else if (isAry(o) && o.length === 4 && allStrs(o)) {
      [xmin_str, ymin_str, xmax_str, ymax_str] = o;
      [xmin, ymin, xmax, ymax] = o.map(str => Number(str));
    } else if (isAry(o) && o.length === 2 && o.every(isAry) && o.every(o => o.length === 2 && allNums(o))) {
      [[ymin, xmin], [ymax, xmax]] = o;
    } else if (isLeafletLatLngBounds(o)) {
      (xmin = o.getWest()), (xmax = o.getEast()), (ymin = o.getSouth()), (ymax = o.getNorth());
      if (!isDef(this.srs)) this.srs = "EPSG:4326";
    } else if (isAry(o) && o.length === 2 && o.every(it => hasKeys(it, ["x", "y"]))) {
      [{ x: xmin, y: ymin }, { x: xmax, y: ymax }] = o;
    } else if (isObj(o) && hasKeys(o, ["x", "y"]) && isNum(o.x) && isNum(o.y)) {
      // receive a point like { x: 147, y: -18 } because isn't a point
      // really just an extent with zero height and width?
      xmin = xmax = o.x;
      ymin = ymax = o.y;
      if (hasKey(o, "spatialReference") && hasKey(o.spatialReference, "wkid")) {
        if (!isDef(this.srs)) this.srs = normalize(o.spatialReference.wkid);
      }
    } else if (isObj(o) && hasKeys(o, ["xmin", "xmax", "ymin", "ymax"])) {
      ({ xmin, xmax, ymin, ymax } = o);
      const keys = ["srs", "crs", "proj", "projection"];

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const v = o[k];
        const normalized = normalize(v);
        if (normalized) {
          this.srs = normalized;
          break;
        }
      }

      if (!this.srs && isDef(o.srs)) {
        this.srs = o.srs;
      }
    } else if (isAry(o) && o.length === 2 && allNums(o)) {
      // assume [ x , y ]
      xmin = xmax = o[0];
      ymin = ymax = o[1];
    } else if (isObj(o) && hasFuncs(o, ["getCoordinates"])) {
      const xy = o.getCoordinates();
      xmin = xmax = xy[0];
      ymin = ymax = xy[1];
    } else if (isObj(o) && hasKey(o, "bbox") && o.bbox.length === 4 && allNums(o)) {
      // like GeoJSON with bbox property set
      // { type: "Feature", "bbox": [-37, 7, 12, 67 ], "geometry": { "type": "Polygon", "coordinates": [...] } }
      [xmin, ymin, xmax, ymax] = o.bbox;
    } else if (hasObj(o, "_bounds") && isLeafletLatLngBounds(o._bounds)) {
      const { _bounds } = o;
      (xmin = _bounds.getWest()), (xmax = _bounds.getEast()), (ymin = _bounds.getSouth()), (ymax = _bounds.getNorth());
      if (!this.srs) this.srs = "EPSG:4326";
    } else if (isObj(o) && isObj(o._bounds) && hasObjs(o._bounds, ["_southWest", "_northEast"])) {
      ({ lat: ymin, lng: xmin } = o._bounds._southWest);
      ({ lat: ymax, lng: xmax } = o._bounds._northEast);
      if (!isDef(this.srs)) this.srs = "EPSG:4326";
    } else {
      throw new Error("[geo-extent] unknown format");
    }

    this.xmin = xmin;
    this.xmin_str = xmin_str || xmin.toString();
    this.ymin = ymin;
    this.ymin_str = ymin_str || ymin.toString();
    this.xmax = xmax;
    this.xmax_str = xmax_str || xmax.toString();
    this.ymax = ymax;
    this.ymax_str = ymax_str || ymax.toString();

    this.width_str = subtract(this.xmax_str, this.xmin_str);
    this.width = Number(this.width_str);

    this.height_str = subtract(this.ymax_str, this.ymin_str);
    this.height = Number(this.height_str);

    // corners
    this.bottomLeft = { x: xmin, y: ymin };
    this.bottomRight = { x: xmax, y: ymin };
    this.topLeft = { x: xmin, y: ymax };
    this.topRight = { x: xmax, y: ymax };

    this.leafletBounds = [
      [this.ymin, this.xmin],
      [this.ymax, this.xmax]
    ];

    this.area_str = multiply(this.width_str, this.height_str);
    this.area = Number(this.area_str);

    this.perimeter_str = add(multiply(this.width_str, "2"), multiply(this.height_str, "2"));
    this.perimeter = Number(this.perimeter_str);

    this.bbox = [xmin, ymin, xmax, ymax];
    this.bbox_str = [this.xmin_str, this.ymin_str, this.xmax_str, this.ymax_str];

    this.center_str = {
      x: avg(xmin_str || xmin, xmax_str || xmax),
      y: avg(ymin_str || ymin, ymax_str || ymax)
    };
    this.center = { x: Number(this.center_str.x), y: Number(this.center_str.y) };

    this.str = this.bbox_str.join(",");
  }

  _pre(_this, _other) {
    // convert other to an extent instance (if not already)
    _other = new this.constructor(_other);

    if (!isDef(_this.srs) && !isDef(_other.srs)) {
      // assume same/no projection
    } else if (isDef(_this.srs) && !isDef(_other.srs)) {
      // assume other is the same srs as this
      _other = new _this.constructor({ ..._other, srs: _this.srs });
    } else if (!isDef(_this.srs) && isDef(_other.srs)) {
      // assume this' srs is the same as other
      _this = new _this.constructor({ ..._this, srs: _other.srs });
    } else if (isDef(_this.srs) && isDef(_other.srs) && _this.srs !== _other.srs) {
      _other = _other.reproj(_this.srs);
    } else if (isDef(_this.srs) && isDef(_other.srs) && _this.srs === _other.srs) {
      // same projection, so no reprojection necessary
    } else {
      throw "UH OH";
    }
    return [_this, _other];
  }

  clone() {
    return new this.constructor(this);
  }

  contains(other) {
    const [_this, _other] = this._pre(this, other);

    const xContains = _other.xmin >= _this.xmin && _other.xmax <= _this.xmax;
    const yContains = _other.ymin >= _this.ymin && _other.ymax <= _this.ymax;

    return xContains && yContains;
  }

  // should return null if no overlap
  crop(other) {
    other = new this.constructor(other);

    // if really no overlap then return null
    if (this.overlaps(other, { quiet: true }) === false && other.overlaps(this, { quiet: true }) === false) return null;

    // first check if other fully contains this extent
    // in which case, we don't really need to crop
    // and can just return the extent of this
    if (other.contains(this)) return this.clone();

    // check if special case where other crosses 180th meridian
    if (other.srs === "EPSG:4326" && (other.xmin < -180 || other.xmax > 180)) {
      const parts = other.unwrap();

      let cropped = parts.map(it => this.crop(it));

      // filter out any parts that are null (didn't overlap)
      cropped = cropped.filter(Boolean);

      // no overlap
      if (cropped.length === 0) return null;

      let combo = cropped[0];
      for (let i = 1; i < cropped.length; i++) combo = combo.combine(cropped[i]);

      return combo;
    }

    // if both this and other have srs defined reproject
    // otherwise, assume they are the same projection
    let another = isDef(this.srs) && isDef(other.srs) ? other.reproj(this.srs, { quiet: true }) : other.clone();
    if (another) {
      if (!this.overlaps(another)) return null;
      const xmin = Math.max(this.xmin, another.xmin);
      const ymin = Math.max(this.ymin, another.ymin);
      const xmax = Math.min(this.xmax, another.xmax);
      const ymax = Math.min(this.ymax, another.ymax);
      return new this.constructor([xmin, ymin, xmax, ymax], { srs: this.srs });
    }

    // fall back to converting everything to 4326 and cropping there
    const this4326 = isDef(this.srs) ? this.reproj(4326) : this;
    const other4326 = isDef(other.srs) ? other.reproj(4326) : other;
    const [aMinLon, aMinLat, aMaxLon, aMaxLat] = this4326.bbox;
    const [bMinLon, bMinLat, bMaxLon, bMaxLat] = other4326.bbox;

    if (!this4326.overlaps(other4326)) return null;

    const minLon = Math.max(aMinLon, bMinLon);
    const minLat = Math.max(aMinLat, bMinLat);
    const maxLon = Math.min(aMaxLon, bMaxLon);
    const maxLat = Math.min(aMaxLat, bMaxLat);
    return new this.constructor([minLon, minLat, maxLon, maxLat], { srs: 4326 }).reproj(this.srs);
  }

  // add two extents together
  // result is a new extent in the projection of this
  combine(other) {
    if (isDef(this.srs) && isDef(other.srs)) {
      other = other.reproj(this.srs);
    }

    const xmin = Math.min(this.xmin, other.xmin);
    const xmax = Math.max(this.xmax, other.xmax);
    const ymin = Math.min(this.ymin, other.ymin);
    const ymax = Math.max(this.ymax, other.ymax);

    return new this.constructor({ xmin, xmax, ymin, ymax, srs: this.srs });
  }

  equals(other, { digits = 13, strict = true } = { digits: 13, strict: true }) {
    // convert other to GeoExtent if necessary
    other = new this.constructor(other);

    if (isDef(this.srs) && isDef(other.srs)) {
      other = other.reproj(this.srs);
    } else if (strict && isDef(this.srs) !== !isDef(this.srs)) {
      return false;
    }
    const str1 = this.bbox.map(n => n.toFixed(digits)).join(",");
    const str2 = other.bbox.map(n => n.toFixed(digits)).join(",");
    return str1 === str2;
  }

  /*
    shouldn't accept GeoJSON as input because the extent created from a GeoJSON
    might overlap, but the actual polygon wouldn't.
    Or at least make the user have to be explicit about the functionality via
    a flag like overlaps(geojson, { strict: false })
  */
  overlaps(other, { quiet = false } = { quite: false }) {
    try {
      const [_this, _other] = this._pre(this, other);

      const yOverlaps = _other.ymin <= _this.ymax && _other.ymax >= _this.ymin;
      const xOverlaps = _other.xmin <= _this.xmax && _other.xmax >= _this.xmin;

      return xOverlaps && yOverlaps;
    } catch (error) {
      if (quiet) return;
      else throw error;
    }
  }

  reproj(to, { quiet = false } = { quiet: false }) {
    to = normalize(to); // normalize srs

    // don't need to reproject, so just return a clone
    if (isDef(this.srs) && this.srs === normalize(to)) return this.clone();

    if (!isDef(this.srs)) {
      if (quiet) return;
      throw new Error(`[geo-extent] cannot reproject ${this.bbox} without a projection set`);
    }

    // unwrap, reproject pieces, and combine
    if (this.srs === "EPSG:4326" && (this.xmin < -180 || this.xmax > 180)) {
      try {
        const parts = this.unwrap().map(ext => ext.reproj(to));
        let combo = parts[0];
        for (let i = 1; i < parts.length; i++) combo = combo.combine(parts[i]);
        return combo;
      } catch (error) {
        if (quiet) return;
        throw error;
      }
    }

    const reprojected = reproject_bbox({
      bbox: this.bbox,
      from: this.srs,
      to
    });

    if (reprojected.some(isNaN)) {
      if (quiet) return;
      throw new Error(`[geo-extent] failed to reproject ${this.bbox} from ${this.srs} to ${to}`);
    }
    return new GeoExtent(reprojected, { srs: to });
  }

  unwrap() {
    const { xmin, ymin, xmax, ymax, srs } = this;

    // not in 4326, so just return a clone
    if (srs !== "EPSG:4326") return [this.clone()];

    // extent is within the normal extent of the earth, so return clone
    if (xmin > -180 && xmax < 180) return [this.clone()];

    // handle special case where extent overflows xmin and then overlaps itself
    if (xmin < -180 && xmax >= xmin + 360) return [new this.constructor([-180, ymin, 180, ymax], { srs: 4326 })];

    if (xmax > 180 && xmin <= xmax - 360) return [new this.constructor([-180, ymin, 180, ymax], { srs: 4326 })];

    let extents = [];

    // extent overflows left edge of the world
    if (xmin < -180) {
      extents.push(new this.constructor([xmin + 360, ymin, 180, ymax], { srs }));
    }

    // add extent for part between -180 to 180 longitude
    extents.push(new this.constructor([xmin < -180 ? -180 : xmin, ymin, xmax > 180 ? 180 : xmax, ymax], { srs }));

    // extent overflows right edge of the world
    if (this.xmax > 180) {
      extents.push(new this.constructor([-180, ymin, xmax - 360, ymax], { srs }));
    }

    return extents;
  }

  asEsriJSON() {
    return {
      xmin: this.xmin,
      ymin: this.ymin,
      xmax: this.xmax,
      ymax: this.ymax,
      spatialReference: {
        wkid: this.srs
      }
    };
  }

  asGeoJSON() {
    const { xmin, ymin, xmax, ymax } = this.srs === "EPSG:4326" ? this : this.reproj(4326);
    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [xmin, ymax],
            [xmax, ymax],
            [xmax, ymin],
            [xmin, ymin],
            [xmin, ymax]
          ]
        ]
      }
    };
  }

  asObj() {
    const res = {};
    for (let k in this) {
      const v = this[k];
      if (!isFunc(v)) {
        res[k] = v;
      }
    }
    return res;
  }
}

if (typeof define === "function" && define.amd)
  define(function () {
    return GeoExtent;
  });
if (typeof self === "object") self.GeoExtent = GeoExtent;
if (typeof window === "object") window.GeoExtent = GeoExtent;

// EXTERNAL MODULE: ./node_modules/snap-bbox/snap-bbox.js
var snap_bbox = __webpack_require__(4321);
var snap_bbox_default = /*#__PURE__*/__webpack_require__.n(snap_bbox);
;// CONCATENATED MODULE: ./src/georaster-layer-for-leaflet.ts
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function georaster_layer_for_leaflet_slicedToArray(arr, i) { return georaster_layer_for_leaflet_arrayWithHoles(arr) || georaster_layer_for_leaflet_iterableToArrayLimit(arr, i) || georaster_layer_for_leaflet_unsupportedIterableToArray(arr, i) || georaster_layer_for_leaflet_nonIterableRest(); }
function georaster_layer_for_leaflet_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function georaster_layer_for_leaflet_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return georaster_layer_for_leaflet_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return georaster_layer_for_leaflet_arrayLikeToArray(o, minLen); }
function georaster_layer_for_leaflet_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function georaster_layer_for_leaflet_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function georaster_layer_for_leaflet_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* global proj4 */










var EPSG4326 = 4326;
var PROJ4_SUPPORTED_PROJECTIONS = new Set([3785, 3857, 4269, 4326, 900913, 102113]);
var MAX_NORTHING = 1000;
var MAX_EASTING = 1000;
var ORIGIN = [0, 0];
var log = function log(obj) {
  return console.log("[georaster-layer-for-leaflet] ", obj);
};

// figure out if simple CRS
// even if not created with same instance of LeafletJS
var isSimpleCRS = function isSimpleCRS(crs) {
  var _crs$transformation, _crs$transformation2, _crs$transformation3, _crs$transformation4;
  return crs === external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.CRS.Simple || !crs.code && crs.infinite && (crs === null || crs === void 0 || (_crs$transformation = crs.transformation) === null || _crs$transformation === void 0 ? void 0 : _crs$transformation._a) === 1 && (crs === null || crs === void 0 || (_crs$transformation2 = crs.transformation) === null || _crs$transformation2 === void 0 ? void 0 : _crs$transformation2._b) === 0 && (crs === null || crs === void 0 || (_crs$transformation3 = crs.transformation) === null || _crs$transformation3 === void 0 ? void 0 : _crs$transformation3._c) === -1 && (crs === null || crs === void 0 || (_crs$transformation4 = crs.transformation) === null || _crs$transformation4 === void 0 ? void 0 : _crs$transformation4._d) === 0;
};
if (!external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_) console.warn("[georaster-layer-for-leaflet] can't find Leaflet.  If you are loading via <script>, please add the GeoRasterLayer script after the LeafletJS script.");
var zip = function zip(a, b) {
  return a.map(function (it, i) {
    return [it, b[i]];
  });
};
var GeoRasterLayer = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.GridLayer.extend({
  options: {
    updateWhenIdle: true,
    updateWhenZooming: false,
    keepBuffer: 25,
    resolution: Math.pow(2, 5),
    debugLevel: 0,
    caching: true
  },
  cache: {},
  initialize: function initialize(options) {
    var _this = this;
    try {
      if (options.georasters) {
        this.georasters = options.georasters;
      } else if (options.georaster) {
        this.georasters = [options.georaster];
      } else {
        throw new Error("You initialized a GeoRasterLayer without a georaster or georasters value.");
      }
      if (this.sourceType === "url") {
        options.updateWhenIdle = false;
        options.updateWhenZooming = true;
        options.keepBuffer = 16;
      }
      if (options.resampleMethod) {
        this.resampleMethod = options.resampleMethod;
      }

      /*
          Unpacking values for use later.
          We do this in order to increase speed.
      */
      var keys = ["height", "width", "noDataValue", "palette", "pixelHeight", "pixelWidth", "projection", "sourceType", "xmin", "xmax", "ymin", "ymax"];
      if (this.georasters.length > 1) {
        keys.forEach(function (key) {
          if (_this.same(_this.georasters, key)) {
            _this[key] = _this.georasters[0][key];
          } else {
            throw new Error("all GeoRasters must have the same " + key);
          }
        });
      } else if (this.georasters.length === 1) {
        keys.forEach(function (key) {
          _this[key] = _this.georasters[0][key];
        });
      }
      this._cache = {
        innerTile: {},
        tile: {}
      };
      this.extent = new GeoExtent([this.xmin, this.ymin, this.xmax, this.ymax], {
        srs: this.projection
      });

      // used later if simple projection
      this.ratio = this.height / this.width;
      this.debugLevel = options.debugLevel;
      if (this.debugLevel >= 1) log({
        options: options
      });
      if (this.georasters.every(function (georaster) {
        return _typeof(georaster.values) === "object";
      })) {
        this.rasters = this.georasters.reduce(function (result, georaster) {
          // added double-check of values to make typescript linter and compiler happy
          if (georaster.values) {
            result = result.concat(georaster.values);
            return result;
          }
        }, []);
        if (this.debugLevel > 1) console.log("this.rasters:", this.rasters);
      }
      if (options.mask) {
        if (typeof options.mask === "string") {
          this.mask = fetch(options.mask).then(function (r) {
            return r.json();
          });
        } else if (_typeof(options.mask) === "object") {
          this.mask = Promise.resolve(options.mask);
        }

        // default mask srs is the EPSG:4326 projection used by GeoJSON
        this.mask_srs = options.mask_srs || "EPSG:4326";
      }
      this.mask_strategy = options.mask_strategy || "outside";
      this.chroma = (chroma_default());
      this.scale = chroma_default().scale();

      // could probably replace some day with a simple
      // (for let k in options) { this.options[k] = options[k]; }
      // but need to find a way around TypeScript any issues
      external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.Util.setOptions(this, options);

      /*
          Caching the constant tile size, so we don't recalculate everytime we
          create a new tile
      */
      var tileSize = this.getTileSize();
      this.tileHeight = tileSize.y;
      this.tileWidth = tileSize.x;
      if (this.georasters.length >= 4 && !options.pixelValuesToColorFn) {
        throw "you must pass in a pixelValuesToColorFn if you are combining rasters";
      }

      // total number of bands across all georasters
      this.numBands = this.georasters.reduce(function (total, g) {
        return total + g.numberOfRasters;
      }, 0);
      if (this.debugLevel > 1) console.log("this.numBands:", this.numBands);

      // in-case we want to track dynamic/running stats of all pixels fetched
      this.currentStats = {
        mins: new Array(this.numBands),
        maxs: new Array(this.numBands),
        ranges: new Array(this.numBands)
      };

      // using single-band raster as grayscale
      // or mapping 2 or 3 rasters to rgb bands
      if ([1, 2, 3].includes(this.georasters.length) && this.georasters.every(function (g) {
        return g.sourceType === "url";
      }) && this.georasters.every(function (g) {
        return g.numberOfRasters === 1;
      }) && !options.pixelValuesToColorFn) {
        try {
          this.calcStats = true;
          this._dynamic = true;
          this.options.pixelValuesToColorFn = function (values) {
            var haveDataForAllBands = values.every(function (value) {
              return value !== undefined && value !== _this.noDataValue;
            });
            if (haveDataForAllBands) {
              return _this.rawToRgb(values);
            }
          };
        } catch (error) {
          console.error("[georaster-layer-for-leaflet]", error);
        }
      }

      // if you haven't specified a pixelValuesToColorFn
      // and the image is YCbCr, add a function to convert YCbCr
      this.checkIfYCbCr = new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve) {
          var _this$georasters$0$_g, _image$fileDirectory, image;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!_this.options.pixelValuesToColorFn) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return", resolve(true));
              case 2:
                if (!(_this.georasters.length === 1 && _this.georasters[0].numberOfRasters === 3)) {
                  _context.next = 7;
                  break;
                }
                _context.next = 5;
                return (_this$georasters$0$_g = _this.georasters[0]._geotiff) === null || _this$georasters$0$_g === void 0 ? void 0 : _this$georasters$0$_g.getImage();
              case 5:
                image = _context.sent;
                if ((image === null || image === void 0 || (_image$fileDirectory = image.fileDirectory) === null || _image$fileDirectory === void 0 ? void 0 : _image$fileDirectory.PhotometricInterpretation) === 6) {
                  _this.options.pixelValuesToColorFn = function (values) {
                    var r = Math.round(values[0] + 1.402 * (values[2] - 0x80));
                    var g = Math.round(values[0] - 0.34414 * (values[1] - 0x80) - 0.71414 * (values[2] - 0x80));
                    var b = Math.round(values[0] + 1.772 * (values[1] - 0x80));
                    return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
                  };
                }
              case 7:
                return _context.abrupt("return", resolve(true));
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    } catch (error) {
      console.error("ERROR initializing GeoTIFFLayer", error);
    }
  },
  onAdd: function onAdd(map) {
    if (!this.options.maxZoom) {
      // maxZoom is needed to display the tiles in the correct order over the zIndex between the zoom levels
      // https://github.com/Leaflet/Leaflet/blob/2592967aa6bd392db0db9e58dab840054e2aa291/src/layer/tile/GridLayer.js#L375C21-L375C21
      this.options.maxZoom = map.getMaxZoom();
    }
    external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.GridLayer.prototype.onAdd.call(this, map);
  },
  getRasters: function getRasters(options) {
    var _this2 = this;
    var innerTileTopLeftPoint = options.innerTileTopLeftPoint,
      heightOfSampleInScreenPixels = options.heightOfSampleInScreenPixels,
      widthOfSampleInScreenPixels = options.widthOfSampleInScreenPixels,
      zoom = options.zoom,
      numberOfSamplesAcross = options.numberOfSamplesAcross,
      numberOfSamplesDown = options.numberOfSamplesDown,
      ymax = options.ymax,
      xmin = options.xmin;
    if (this.debugLevel >= 1) console.log("starting getRasters with options:", options);

    // called if georaster was constructed from URL and we need to get
    // data separately for each tile
    // aka 'COG mode'

    /*
      This function takes in coordinates in the rendered image inner tile and
      returns the y and x values in the original raster
    */
    var rasterCoordsForTileCoords = function rasterCoordsForTileCoords(h, w) {
      var xInMapPixels = innerTileTopLeftPoint.x + w * widthOfSampleInScreenPixels;
      var yInMapPixels = innerTileTopLeftPoint.y + h * heightOfSampleInScreenPixels;
      var mapPoint = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.point(xInMapPixels, yInMapPixels);
      if (_this2.debugLevel >= 1) log({
        mapPoint: mapPoint
      });
      var _this2$getMap$unproje = _this2.getMap().unproject(mapPoint, zoom),
        lat = _this2$getMap$unproje.lat,
        lng = _this2$getMap$unproje.lng;
      if (_this2.projection === EPSG4326) {
        return {
          y: Math.round((ymax - lat) / _this2.pixelHeight),
          x: Math.round((lng - xmin) / _this2.pixelWidth)
        };
      } else if (_this2.getProjector()) {
        /* source raster doesn't use latitude and longitude,
           so need to reproject point from lat/long to projection of raster
        */
        var _this2$getProjector$i = _this2.getProjector().inverse([lng, lat]),
          _this2$getProjector$i2 = georaster_layer_for_leaflet_slicedToArray(_this2$getProjector$i, 2),
          x = _this2$getProjector$i2[0],
          y = _this2$getProjector$i2[1];
        if (x === Infinity || y === Infinity) {
          if (_this2.debugLevel >= 1) console.error("projector converted", [lng, lat], "to", [x, y]);
        }
        return {
          y: Math.round((ymax - y) / _this2.pixelHeight),
          x: Math.round((x - xmin) / _this2.pixelWidth)
        };
      } else {
        return null;
      }
    };

    // careful not to flip min_y/max_y here
    var topLeft = rasterCoordsForTileCoords(0, 0);
    var bottomRight = rasterCoordsForTileCoords(numberOfSamplesDown, numberOfSamplesAcross);
    var tileHeight = this.tileHeight;
    var tileWidth = this.tileWidth;
    var debugLevel = this.debugLevel;
    var getValuesOptions = {
      bottom: bottomRight === null || bottomRight === void 0 ? void 0 : bottomRight.y,
      height: numberOfSamplesDown,
      left: topLeft === null || topLeft === void 0 ? void 0 : topLeft.x,
      right: bottomRight === null || bottomRight === void 0 ? void 0 : bottomRight.x,
      top: topLeft === null || topLeft === void 0 ? void 0 : topLeft.y,
      width: numberOfSamplesAcross,
      tileHeight: tileHeight,
      tileWidth: tileWidth,
      debugLevel: debugLevel
    };
    if (!Object.values(getValuesOptions).every(function (it) {
      return it !== undefined && isFinite(it);
    })) {
      console.error("getRasters failed because not all values are finite:", getValuesOptions);
    } else {
      // !note: The types need confirmation - SFR 2021-01-20
      return Promise.all(this.georasters.map(function (georaster) {
        return georaster.getValues(_objectSpread(_objectSpread({}, getValuesOptions), {}, {
          resampleMethod: _this2.resampleMethod || "nearest"
        }));
      })).then(function (valuesByGeoRaster) {
        return valuesByGeoRaster.reduce(function (result, values) {
          result = result.concat(values);
          return result;
        }, []);
      });
    }
  },
  createTile: function createTile(coords, done) {
    var _this3 = this;
    /* This tile is the square piece of the Leaflet map that we draw on */
    var tile = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.DomUtil.create("canvas", "leaflet-tile");

    // we do this because sometimes css normalizers will set * to box-sizing: border-box
    tile.style.boxSizing = "content-box";

    // start tile hidden
    tile.style.visibility = "hidden";
    var context = tile.getContext("2d");

    // note that we aren't setting the tile height or width here
    // drawTile dynamically sets the width and padding based on
    // how much the georaster takes up the tile area
    var coordsKey = this._tileCoordsToKey(coords);
    var resolution = this._getResolution(coords.z);
    var key = "".concat(coordsKey, ":").concat(resolution);
    var resampleMethod = this.resampleMethod;
    var doneCb = function doneCb(error, tile) {
      done(error, tile);

      // caching the rendered tile, to skip the calculation for the next time
      if (!error && _this3.options.caching) {
        _this3.cache[key] = tile;
      }
    };
    if (this.options.caching && this.cache[key]) {
      done(undefined, this.cache[key]);
      return this.cache[key];
    } else {
      this.drawTile({
        tile: tile,
        coords: coords,
        context: context,
        done: doneCb,
        resolution: resolution,
        resampleMethod: resampleMethod
      });
    }
    return tile;
  },
  drawTile: function drawTile(_ref2) {
    var _this4 = this;
    var tile = _ref2.tile,
      coords = _ref2.coords,
      context = _ref2.context,
      done = _ref2.done,
      resolution = _ref2.resolution;
    try {
      var _this$debugLevel = this.debugLevel,
        debugLevel = _this$debugLevel === void 0 ? 0 : _this$debugLevel;
      if (debugLevel >= 2) console.log("starting drawTile with", {
        tile: tile,
        coords: coords,
        context: context,
        done: done
      });
      var error;
      var zoom = coords.z;

      // stringified hash of tile coordinates for caching purposes
      var cacheKey = [coords.x, coords.y, coords.z].join(",");
      var debugcacheKey = [coords.x, coords.y, coords.z];
      if (debugLevel >= 2) log({
        cacheKey: cacheKey
      });
      var mapCRS = this.getMapCRS();
      if (debugLevel >= 2) log({
        mapCRS: mapCRS
      });
      var inSimpleCRS = isSimpleCRS(mapCRS);
      if (debugLevel >= 2) log({
        inSimpleCRS: inSimpleCRS
      });

      // Unpacking values for increased speed
      var rasters = this.rasters,
        xmin = this.xmin,
        xmax = this.xmax,
        ymin = this.ymin,
        ymax = this.ymax;
      var rasterHeight = this.height;
      var rasterWidth = this.width;
      var extentOfLayer = new GeoExtent(this.getBounds(), {
        srs: inSimpleCRS ? "simple" : 4326
      });
      if (debugLevel >= 2) log({
        extentOfLayer: extentOfLayer
      });
      var pixelHeight = inSimpleCRS ? extentOfLayer.height / rasterHeight : this.pixelHeight;
      var pixelWidth = inSimpleCRS ? extentOfLayer.width / rasterWidth : this.pixelWidth;
      if (debugLevel >= 2) log({
        pixelHeight: pixelHeight,
        pixelWidth: pixelWidth
      });

      // these values are used, so we don't try to sample outside of the raster
      var xMinOfLayer = this.xMinOfLayer,
        xMaxOfLayer = this.xMaxOfLayer,
        yMinOfLayer = this.yMinOfLayer,
        yMaxOfLayer = this.yMaxOfLayer;
      var boundsOfTile = this._tileCoordsToBounds(coords);
      if (debugLevel >= 2) log({
        boundsOfTile: boundsOfTile
      });
      var code = mapCRS.code;
      if (debugLevel >= 2) log({
        code: code
      });
      var extentOfTile = new GeoExtent(boundsOfTile, {
        srs: inSimpleCRS ? "simple" : 4326
      });
      if (debugLevel >= 2) log({
        extentOfTile: extentOfTile
      });

      //create blue outline around tiles
      if (debugLevel >= 4) {
        if (!this._cache.tile[cacheKey]) {
          if (debugcacheKey[0] % 3 === 0) {
            if (debugcacheKey[1] % 3 === 0) {
              this._cache.tile[cacheKey] = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.rectangle(extentOfTile.leafletBounds, {
                fillOpacity: 0
              }).addTo(this.getMap()).bindTooltip(cacheKey, {
                direction: "center",
                permanent: true
              });
            }
          }
        }
      }
      var extentOfTileInMapCRS = inSimpleCRS ? extentOfTile : extentOfTile.reproj(code);
      if (debugLevel >= 2) log({
        extentOfTileInMapCRS: extentOfTileInMapCRS
      });
      var extentOfInnerTileInMapCRS = extentOfTileInMapCRS.crop(inSimpleCRS ? extentOfLayer : this.extent);
      if (debugLevel >= 2) console.log("[georaster-layer-for-leaflet] extentOfInnerTileInMapCRS", extentOfInnerTileInMapCRS.reproj(inSimpleCRS ? "simple" : 4326));
      if (debugLevel >= 2) log({
        coords: coords,
        extentOfInnerTileInMapCRS: extentOfInnerTileInMapCRS,
        extent: this.extent
      });

      // create blue outline around tiles
      if (debugLevel >= 4) {
        if (!this._cache.innerTile[cacheKey]) {
          if (debugcacheKey[0] % 3 === 0) {
            if (debugcacheKey[1] % 3 === 0) {
              var ext = inSimpleCRS ? extentOfInnerTileInMapCRS : extentOfInnerTileInMapCRS.reproj(4326);
              //this._cache.innerTile[cacheKey] = L.rectangle(ext.leafletBounds, {
              //  color: "#F00",
              //  dashArray: "5, 10",
              //  fillOpacity: 0
              //}).addTo(this.getMap());
            }
          }
        }
      }
      var widthOfScreenPixelInMapCRS = extentOfTileInMapCRS.width / this.tileWidth;
      var heightOfScreenPixelInMapCRS = extentOfTileInMapCRS.height / this.tileHeight;
      if (debugLevel >= 3) log({
        heightOfScreenPixelInMapCRS: heightOfScreenPixelInMapCRS,
        widthOfScreenPixelInMapCRS: widthOfScreenPixelInMapCRS
      });

      // expand tile sampling area to align with raster pixels
      var oldExtentOfInnerTileInRasterCRS = inSimpleCRS ? extentOfInnerTileInMapCRS : extentOfInnerTileInMapCRS.reproj(this.projection);
      var snapped = snap_bbox_default()({
        bbox: oldExtentOfInnerTileInRasterCRS.bbox,
        // pad xmax and ymin of container to tolerate ceil() and floor() in snap()
        container: inSimpleCRS ? [extentOfLayer.xmin, extentOfLayer.ymin - 0.25 * pixelHeight, extentOfLayer.xmax + 0.25 * pixelWidth, extentOfLayer.ymax] : [xmin, ymin - 0.25 * pixelHeight, xmax + 0.25 * pixelWidth, ymax],
        debug: debugLevel >= 2,
        origin: inSimpleCRS ? [extentOfLayer.xmin, extentOfLayer.ymax] : [xmin, ymax],
        scale: [pixelWidth, -pixelHeight] // negative because origin is at ymax
      });
      var extentOfInnerTileInRasterCRS = new GeoExtent(snapped.bbox_in_coordinate_system, {
        srs: inSimpleCRS ? "simple" : this.projection
      });
      var gridbox = snapped.bbox_in_grid_cells;
      var snappedSamplesAcross = Math.abs(gridbox[2] - gridbox[0]);
      var snappedSamplesDown = Math.abs(gridbox[3] - gridbox[1]);
      var rasterPixelsAcross = Math.ceil(oldExtentOfInnerTileInRasterCRS.width / pixelWidth);
      var rasterPixelsDown = Math.ceil(oldExtentOfInnerTileInRasterCRS.height / pixelHeight);
      var layerCropExtent = inSimpleCRS ? extentOfLayer : this.extent;
      var recropTileOrig = oldExtentOfInnerTileInRasterCRS.crop(layerCropExtent); // may be null
      var maxSamplesAcross = 1;
      var maxSamplesDown = 1;
      if (recropTileOrig !== null) {
        var recropTileProj = inSimpleCRS ? recropTileOrig : recropTileOrig.reproj(code);
        var recropTile = recropTileProj.crop(extentOfTileInMapCRS);
        if (recropTile !== null) {
          maxSamplesAcross = Math.ceil(resolution * (recropTile.width / extentOfTileInMapCRS.width));
          maxSamplesDown = Math.ceil(resolution * (recropTile.height / extentOfTileInMapCRS.height));
        }
      }
      var overdrawTileAcross = rasterPixelsAcross < maxSamplesAcross;
      var overdrawTileDown = rasterPixelsDown < maxSamplesDown;

      ///////////////////////////////////////////
      //const numberOfSamplesAcross = overdrawTileAcross ? snappedSamplesAcross : maxSamplesAcross;
      //const numberOfSamplesDown = overdrawTileDown ? snappedSamplesDown : maxSamplesDown;
      //////////////////////////////////////////////

      var numberOfSamplesAcross = maxSamplesAcross;
      var numberOfSamplesDown = maxSamplesDown;
      if (this.resampleMethod == "nearest") {
        var _numberOfSamplesAcross = overdrawTileAcross ? snappedSamplesAcross : maxSamplesAcross;
        var _numberOfSamplesDown = overdrawTileDown ? snappedSamplesDown : maxSamplesDown;
      }
      if (debugLevel >= 3) console.log("[georaster-layer-for-leaflet] extent of inner tile before snapping " + extentOfInnerTileInMapCRS.reproj(inSimpleCRS ? "simple" : 4326).bbox.toString());

      // Reprojecting the bounding box back to the map CRS would expand it
      // (unless the projection is purely scaling and translation),
      // so instead just extend the old map bounding box proportionately.
      {
        var oldrb = new GeoExtent(oldExtentOfInnerTileInRasterCRS.bbox);
        var newrb = new GeoExtent(extentOfInnerTileInRasterCRS.bbox);
        var oldmb = new GeoExtent(extentOfInnerTileInMapCRS.bbox);
        if (oldrb.width !== 0 && oldrb.height !== 0) {
          var n0 = (newrb.xmin - oldrb.xmin) / oldrb.width * oldmb.width;
          var n1 = (newrb.ymin - oldrb.ymin) / oldrb.height * oldmb.height;
          var n2 = (newrb.xmax - oldrb.xmax) / oldrb.width * oldmb.width;
          var n3 = (newrb.ymax - oldrb.ymax) / oldrb.height * oldmb.height;
          if (!overdrawTileAcross) {
            n0 = Math.max(n0, 0);
            n2 = Math.min(n2, 0);
          }
          if (!overdrawTileDown) {
            n1 = Math.max(n1, 0);
            n3 = Math.min(n3, 0);
          }
          var newbox = [oldmb.xmin + n0, oldmb.ymin + n1, oldmb.xmax + n2, oldmb.ymax + n3];
          extentOfInnerTileInMapCRS = new GeoExtent(newbox, {
            srs: extentOfInnerTileInMapCRS.srs
          });
        }
      }

      // create purple outline around raster pixels
      if (debugLevel >= 4) {
        if (debugcacheKey[0] % 3 === 0) {
          if (debugcacheKey[1] % 3 === 0) {
            if (!this._cache.innerTile[cacheKey]) {
              var _ext = inSimpleCRS ? extentOfInnerTileInMapCRS : extentOfInnerTileInMapCRS.reproj(4326);
              this._cache.innerTile[cacheKey] = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.rectangle(_ext.leafletBounds, {
                color: "#FF00D1",
                dashArray: "4, 8",
                weight: 2,
                fillOpacity: 0
              }).addTo(this.getMap()); //debugLayer
            }
          }
        }
      }
      if (debugLevel >= 3) console.log("[georaster-layer-for-leaflet] extent of inner tile after snapping " + extentOfInnerTileInMapCRS.reproj(inSimpleCRS ? "simple" : 4326).bbox.toString());

      // Note that the snapped "inner" tile may extend beyond the original tile,
      // in which case the padding values will be negative.

      // we round here because sometimes there will be slight floating arithmetic issues
      // where the padding is like 0.00000000000001
      var padding = {
        left: Math.round((extentOfInnerTileInMapCRS.xmin - extentOfTileInMapCRS.xmin) / widthOfScreenPixelInMapCRS),
        right: Math.round((extentOfTileInMapCRS.xmax - extentOfInnerTileInMapCRS.xmax) / widthOfScreenPixelInMapCRS),
        top: Math.round((extentOfTileInMapCRS.ymax - extentOfInnerTileInMapCRS.ymax) / heightOfScreenPixelInMapCRS),
        bottom: Math.round((extentOfInnerTileInMapCRS.ymin - extentOfTileInMapCRS.ymin) / heightOfScreenPixelInMapCRS)
      };

      //Add a bit of extra padding if we're resampling tiles so it resamples over the edge
      if (this.resampleMethod != "nearest") {
        // Find the width of a pixel from the source image and add 2x to the buffer
        // 2x has added because the pixel doesnt line up on a tile edge perfectly and I'm too lazy to work it out exactly
        // extra It would probably add around a ((pixels width or height) + tilesize / tilesize) percentage of cpu usage, but better than having to load a giant GEOTIFF file
        var extraPaddingWidth = Math.round(this.tileWidth / rasterPixelsAcross * 2);
        var extraPaddingHeight = Math.round(this.tileHeight / rasterPixelsDown * 2);
        if (debugLevel >= 3) log("extra Padding Width : " + extraPaddingWidth);
        if (debugLevel >= 3) log("extra Padding Height : " + extraPaddingHeight);
        padding = {
          left: padding.left - extraPaddingWidth,
          right: padding.right - extraPaddingWidth,
          top: padding.top - extraPaddingHeight,
          bottom: padding.bottom - extraPaddingHeight
        };
      }
      if (debugLevel >= 3) log({
        padding: padding
      });
      var innerTileHeight = this.tileHeight - padding.top - padding.bottom;
      var innerTileWidth = this.tileWidth - padding.left - padding.right;
      if (debugLevel >= 3) log({
        innerTileHeight: innerTileHeight,
        innerTileWidth: innerTileWidth
      });
      if (debugLevel >= 4) {
        if (debugcacheKey[0] % 3 === 0) {
          if (debugcacheKey[1] % 3 === 0) {
            var xMinOfInnerTileInMapCRS = extentOfTileInMapCRS.xmin + padding.left * widthOfScreenPixelInMapCRS;
            var yMinOfInnerTileInMapCRS = extentOfTileInMapCRS.ymin + padding.bottom * heightOfScreenPixelInMapCRS;
            var xMaxOfInnerTileInMapCRS = extentOfTileInMapCRS.xmax - padding.right * widthOfScreenPixelInMapCRS;
            var yMaxOfInnerTileInMapCRS = extentOfTileInMapCRS.ymax - padding.top * heightOfScreenPixelInMapCRS;
            var InnerTileInMapCRSwithPadding = new GeoExtent([xMinOfInnerTileInMapCRS, yMinOfInnerTileInMapCRS, xMaxOfInnerTileInMapCRS, yMaxOfInnerTileInMapCRS], {
              srs: "EPSG:3857"
            });
            var extInnerTileInMapPadding = inSimpleCRS ? InnerTileInMapCRSwithPadding : InnerTileInMapCRSwithPadding.reproj(4326);

            //add green  extra buffer border to window
            this._cache.innerTile[cacheKey] = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.rectangle(extInnerTileInMapPadding.leafletBounds, {
              color: "#32FF00",
              dashArray: "5, 10",
              fillOpacity: 0
            }).addTo(this.getMap());
          }
        }
      }
      var canvasPadding = {
        left: Math.max(padding.left, 0),
        right: Math.max(padding.right, 0),
        top: Math.max(padding.top, 0),
        bottom: Math.max(padding.bottom, 0)
      };
      var canvasHeight = this.tileHeight - canvasPadding.top - canvasPadding.bottom;
      var canvasWidth = this.tileWidth - canvasPadding.left - canvasPadding.right;

      // set padding and size of canvas tile
      tile.style.paddingTop = canvasPadding.top + "px";
      tile.style.paddingRight = canvasPadding.right + "px";
      tile.style.paddingBottom = canvasPadding.bottom + "px";
      tile.style.paddingLeft = canvasPadding.left + "px";
      tile.height = canvasHeight;
      tile.style.height = canvasHeight + "px";
      tile.width = canvasWidth;
      tile.style.width = canvasWidth + "px";
      if (debugLevel >= 3) console.log("setting tile height to " + canvasHeight + "px");
      if (debugLevel >= 3) console.log("setting tile width to " + canvasWidth + "px");

      // set how large to display each sample in screen pixels
      var heightOfSampleInScreenPixels = innerTileHeight / numberOfSamplesDown;
      var heightOfSampleInScreenPixelsInt = Math.ceil(heightOfSampleInScreenPixels);
      var widthOfSampleInScreenPixels = innerTileWidth / numberOfSamplesAcross;
      var widthOfSampleInScreenPixelsInt = Math.ceil(widthOfSampleInScreenPixels);
      var map = this.getMap();
      var tileSize = this.getTileSize();

      // this converts tile coordinates (how many tiles down and right)
      // to pixels from left and top of tile pane
      var tileNwPoint = coords.scaleBy(tileSize);
      if (debugLevel >= 4) log({
        tileNwPoint: tileNwPoint
      });
      var xLeftOfInnerTile = tileNwPoint.x + padding.left;
      var yTopOfInnerTile = tileNwPoint.y + padding.top;
      var innerTileTopLeftPoint = {
        x: xLeftOfInnerTile,
        y: yTopOfInnerTile
      };
      if (debugLevel >= 4) log({
        innerTileTopLeftPoint: innerTileTopLeftPoint
      });

      // create blue outline around tiles with padding
      if (debugLevel >= 4) {
        //if (!this._cache.tile[cacheKey]) {
        if (debugcacheKey[0] % 3 === 0) {
          if (debugcacheKey[1] % 3 === 0) {
            this._cache.tile[cacheKey] = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.rectangle(oldExtentOfInnerTileInRasterCRS.leafletBounds, {
              fillOpacity: 0,
              color: "#FF0000",
              weight: 1
            }).addTo(this.getMap());
            //.bindTooltip(cacheKey, { direction: "center", permanent: true });
            //}
          }
        }
      }

      // render asynchronously so tiles show up as they finish instead of all at once (which blocks the UI)
      setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var tileRasters, noDataValue, bandIndex, min, max, band, rowIndex, row, columnIndex, value, rawToRgbFn, _loop, _ret, h;
        return _regeneratorRuntime().wrap(function _callee2$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              tileRasters = null;
              if (rasters) {
                _context4.next = 8;
                break;
              }
              _context4.next = 5;
              return _this4.getRasters({
                innerTileTopLeftPoint: innerTileTopLeftPoint,
                heightOfSampleInScreenPixels: heightOfSampleInScreenPixels,
                widthOfSampleInScreenPixels: widthOfSampleInScreenPixels,
                zoom: zoom,
                pixelHeight: pixelHeight,
                pixelWidth: pixelWidth,
                numberOfSamplesAcross: numberOfSamplesAcross,
                numberOfSamplesDown: numberOfSamplesDown,
                ymax: ymax,
                xmin: xmin
              });
            case 5:
              tileRasters = _context4.sent;
              if (tileRasters && _this4.calcStats) {
                noDataValue = _this4.noDataValue;
                for (bandIndex = 0; bandIndex < tileRasters.length; bandIndex++) {
                  min = _this4.currentStats.mins[bandIndex];
                  max = _this4.currentStats.maxs[bandIndex];
                  band = tileRasters[bandIndex];
                  for (rowIndex = 0; rowIndex < band.length; rowIndex++) {
                    row = band[rowIndex];
                    for (columnIndex = 0; columnIndex < row.length; columnIndex++) {
                      value = row[columnIndex];
                      if (value !== noDataValue) {
                        if (min === undefined || value < min) {
                          min = value;
                        }
                        if (max === undefined || value > max) {
                          max = value;
                        }
                      }
                    }
                  }
                  _this4.currentStats.mins[bandIndex] = min;
                  _this4.currentStats.maxs[bandIndex] = max;
                  _this4.currentStats.ranges[bandIndex] = max - min;
                }
              }
              if (_this4._dynamic) {
                try {
                  rawToRgbFn = rawToRgb.default || rawToRgb;
                  _this4.rawToRgb = rawToRgbFn({
                    format: "string",
                    flip: _this4.currentStats.mins.length === 1 ? true : false,
                    ranges: zip(_this4.currentStats.mins, _this4.currentStats.maxs),
                    round: true
                  });
                } catch (error) {
                  console.error(error);
                }
              }
            case 8:
              _context4.next = 10;
              return _this4.checkIfYCbCr;
            case 10:
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(h) {
                var yCenterInMapPixels, latWestPoint, _map$unproject, lat, yInTilePixels, yInRasterPixels, _loop2, _ret2, w;
                return _regeneratorRuntime().wrap(function _loop$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      yCenterInMapPixels = yTopOfInnerTile + (h + 0.5) * heightOfSampleInScreenPixels;
                      latWestPoint = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.point(xLeftOfInnerTile, yCenterInMapPixels);
                      _map$unproject = map.unproject(latWestPoint, zoom), lat = _map$unproject.lat;
                      if (!(lat > yMinOfLayer && lat < yMaxOfLayer)) {
                        _context3.next = 19;
                        break;
                      }
                      yInTilePixels = Math.round(h * heightOfSampleInScreenPixels) + Math.min(padding.top, 0);
                      yInRasterPixels = 0;
                      if (inSimpleCRS || _this4.projection === EPSG4326) {
                        yInRasterPixels = Math.floor((yMaxOfLayer - lat) / pixelHeight);
                      }
                      _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2(w) {
                        var latLngPoint, _map$unproject2, xOfLayer, xInRasterPixels, inverted, yInSrc, xInSrc, values, x, y, width, height, color;
                        return _regeneratorRuntime().wrap(function _loop2$(_context2) {
                          while (1) switch (_context2.prev = _context2.next) {
                            case 0:
                              latLngPoint = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.point(xLeftOfInnerTile + (w + 0.5) * widthOfSampleInScreenPixels, yCenterInMapPixels);
                              _map$unproject2 = map.unproject(latLngPoint, zoom), xOfLayer = _map$unproject2.lng;
                              if (!(xOfLayer > xMinOfLayer && xOfLayer < xMaxOfLayer)) {
                                _context2.next = 34;
                                break;
                              }
                              xInRasterPixels = 0;
                              if (!(inSimpleCRS || _this4.projection === EPSG4326)) {
                                _context2.next = 8;
                                break;
                              }
                              xInRasterPixels = Math.floor((xOfLayer - xMinOfLayer) / pixelWidth);
                              _context2.next = 18;
                              break;
                            case 8:
                              if (!_this4.getProjector()) {
                                _context2.next = 18;
                                break;
                              }
                              inverted = _this4.getProjector().inverse({
                                x: xOfLayer,
                                y: lat
                              });
                              yInSrc = inverted.y;
                              yInRasterPixels = Math.floor((ymax - yInSrc) / pixelHeight);
                              if (!(yInRasterPixels < 0 || yInRasterPixels >= rasterHeight)) {
                                _context2.next = 14;
                                break;
                              }
                              return _context2.abrupt("return", 0);
                            case 14:
                              xInSrc = inverted.x;
                              xInRasterPixels = Math.floor((xInSrc - xmin) / pixelWidth);
                              if (!(xInRasterPixels < 0 || xInRasterPixels >= rasterWidth)) {
                                _context2.next = 18;
                                break;
                              }
                              return _context2.abrupt("return", 0);
                            case 18:
                              values = null;
                              if (!tileRasters) {
                                _context2.next = 23;
                                break;
                              }
                              // get value from array specific to this tile
                              values = tileRasters.map(function (band) {
                                return band[h][w];
                              });
                              _context2.next = 29;
                              break;
                            case 23:
                              if (!rasters) {
                                _context2.next = 27;
                                break;
                              }
                              // get value from array with data for entire raster
                              values = rasters.map(function (band) {
                                return band[yInRasterPixels][xInRasterPixels];
                              });
                              _context2.next = 29;
                              break;
                            case 27:
                              done && done(Error("no rasters are available for, so skipping value generation"));
                              return _context2.abrupt("return", {
                                v: {
                                  v: void 0
                                }
                              });
                            case 29:
                              // x-axis coordinate of the starting point of the rectangle representing the raster pixel
                              x = Math.round(w * widthOfSampleInScreenPixels) + Math.min(padding.left, 0); // y-axis coordinate of the starting point of the rectangle representing the raster pixel
                              y = yInTilePixels; // how many real screen pixels does a pixel of the sampled raster take up
                              width = widthOfSampleInScreenPixelsInt;
                              height = heightOfSampleInScreenPixelsInt;
                              if (_this4.options.customDrawFunction) {
                                _this4.options.customDrawFunction({
                                  values: values,
                                  context: context,
                                  x: x,
                                  y: y,
                                  width: width,
                                  height: height,
                                  rasterX: xInRasterPixels,
                                  rasterY: yInRasterPixels,
                                  sampleX: w,
                                  sampleY: h,
                                  sampledRaster: tileRasters
                                });
                              } else {
                                color = _this4.getColor(values);
                                if (color && context) {
                                  context.fillStyle = color;
                                  context.fillRect(x, y, width, height);
                                }
                              }
                            case 34:
                            case "end":
                              return _context2.stop();
                          }
                        }, _loop2);
                      });
                      w = 0;
                    case 9:
                      if (!(w < numberOfSamplesAcross)) {
                        _context3.next = 19;
                        break;
                      }
                      return _context3.delegateYield(_loop2(w), "t0", 11);
                    case 11:
                      _ret2 = _context3.t0;
                      if (!(_ret2 === 0)) {
                        _context3.next = 14;
                        break;
                      }
                      return _context3.abrupt("continue", 16);
                    case 14:
                      if (!_ret2) {
                        _context3.next = 16;
                        break;
                      }
                      return _context3.abrupt("return", _ret2.v);
                    case 16:
                      w++;
                      _context3.next = 9;
                      break;
                    case 19:
                    case "end":
                      return _context3.stop();
                  }
                }, _loop);
              });
              h = 0;
            case 12:
              if (!(h < numberOfSamplesDown)) {
                _context4.next = 20;
                break;
              }
              return _context4.delegateYield(_loop(h), "t0", 14);
            case 14:
              _ret = _context4.t0;
              if (!_ret) {
                _context4.next = 17;
                break;
              }
              return _context4.abrupt("return", _ret.v);
            case 17:
              h++;
              _context4.next = 12;
              break;
            case 20:
              if (_this4.mask) {
                if (inSimpleCRS) {
                  console.warn("[georaster-layer-for-leaflet] mask is not supported when using simple projection");
                } else {
                  _this4.mask.then(function (mask) {
                    full_default().maskCanvas({
                      canvas: tile,
                      // eslint-disable-next-line camelcase
                      canvas_bbox: extentOfInnerTileInMapCRS.bbox,
                      // need to support simple projection too
                      // eslint-disable-next-line camelcase
                      canvas_srs: 3857,
                      // default map crs, need to support simple
                      mask: mask,
                      // eslint-disable-next-line camelcase
                      mask_srs: _this4.mask_srs,
                      strategy: _this4.mask_strategy // hide everything inside or outside the mask
                    });
                  });
                }
              }
              tile.style.visibility = "visible"; // set to default
              _context4.next = 28;
              break;
            case 24:
              _context4.prev = 24;
              _context4.t1 = _context4["catch"](0);
              console.error(_context4.t1);
              error = _context4.t1;
            case 28:
              done && done(error, tile);
            case 29:
            case "end":
              return _context4.stop();
          }
        }, _callee2, null, [[0, 24]]);
      })), 0);

      // return the tile so it can be rendered on screen
      return tile;
    } catch (error) {
      console.error(error);
      done && done(error, tile);
    }
  },
  // copied from Leaflet with slight modifications,
  // including removing the lines that set the tile size
  _initTile: function _initTile(tile) {
    external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.DomUtil.addClass(tile, "leaflet-tile");
    tile.onselectstart = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.Util.falseFn;
    tile.onmousemove = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.Util.falseFn;

    // update opacity on tiles in IE7-8 because of filter inheritance problems
    if (external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.Browser.ielt9 && this.options.opacity < 1) {
      external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.DomUtil.setOpacity(tile, this.options.opacity);
    }

    // without this hack, tiles disappear after zoom on Chrome for Android
    // https://github.com/Leaflet/Leaflet/issues/2078
    if (external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.Browser.android && !external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.Browser.android23) {
      tile.style.WebkitBackfaceVisibility = "hidden";
    }
  },
  // method from https://github.com/Leaflet/Leaflet/blob/bb1d94ac7f2716852213dd11563d89855f8d6bb1/src/layer/ImageOverlay.js
  getBounds: function getBounds() {
    this.initBounds();
    return this._bounds;
  },
  getMap: function getMap() {
    return this._map || this._mapToAdd;
  },
  getMapCRS: function getMapCRS() {
    var _this$getMap;
    return ((_this$getMap = this.getMap()) === null || _this$getMap === void 0 ? void 0 : _this$getMap.options.crs) || external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.CRS.EPSG3857;
  },
  // add in to ensure backwards compatability with Leaflet 1.0.3
  _tileCoordsToNwSe: function _tileCoordsToNwSe(coords) {
    var map = this.getMap();
    var tileSize = this.getTileSize();
    var nwPoint = coords.scaleBy(tileSize);
    var sePoint = nwPoint.add(tileSize);
    var nw = map.unproject(nwPoint, coords.z);
    var se = map.unproject(sePoint, coords.z);
    return [nw, se];
  },
  _tileCoordsToBounds: function _tileCoordsToBounds(coords) {
    var _this$_tileCoordsToNw = this._tileCoordsToNwSe(coords),
      _this$_tileCoordsToNw2 = georaster_layer_for_leaflet_slicedToArray(_this$_tileCoordsToNw, 2),
      nw = _this$_tileCoordsToNw2[0],
      se = _this$_tileCoordsToNw2[1];
    var bounds = new external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.LatLngBounds(nw, se);
    if (!this.options.noWrap) {
      var crs = this.getMap().options.crs;
      bounds = crs.wrapLatLngBounds(bounds);
    }
    return bounds;
  },
  _isValidTile: function _isValidTile(coords) {
    var crs = this.getMapCRS();
    if (!crs.infinite) {
      // don't load tile if it's out of bounds and not wrapped
      var globalBounds = this._globalTileRange;
      if (!crs.wrapLng && (coords.x < globalBounds.min.x || coords.x > globalBounds.max.x) || !crs.wrapLat && (coords.y < globalBounds.min.y || coords.y > globalBounds.max.y)) {
        return false;
      }
    }
    var bounds = this.getBounds();
    if (!bounds) {
      return true;
    }
    var x = coords.x,
      y = coords.y,
      z = coords.z;

    // not sure what srs should be here when simple crs
    var layerExtent = new GeoExtent(bounds, {
      srs: 4326
    });
    var boundsOfTile = this._tileCoordsToBounds(coords);

    // check given tile coordinates
    if (layerExtent.overlaps(boundsOfTile)) return true;

    // if not within the original confines of the earth return false
    // we don't want wrapping if using Simple CRS
    if (isSimpleCRS(crs)) return false;

    // width of the globe in tiles at the given zoom level
    var width = Math.pow(2, z);

    // check one world to the left
    var leftCoords = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.point(x - width, y);
    leftCoords.z = z;
    var leftBounds = this._tileCoordsToBounds(leftCoords);
    if (layerExtent.overlaps(leftBounds)) return true;

    // check one world to the right
    var rightCoords = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.point(x + width, y);
    rightCoords.z = z;
    var rightBounds = this._tileCoordsToBounds(rightCoords);
    if (layerExtent.overlaps(rightBounds)) return true;
    return false;
  },
  getColor: function getColor(values) {
    var _this5 = this;
    if (this.options.pixelValuesToColorFn) {
      return this.options.pixelValuesToColorFn(values);
    } else {
      var numberOfValues = values.length;
      var haveDataForAllBands = values.every(function (value) {
        return value !== undefined && value !== _this5.noDataValue;
      });
      if (haveDataForAllBands) {
        if (numberOfValues == 1) {
          var value = values[0];
          if (this.palette) {
            var _this$palette$value = georaster_layer_for_leaflet_slicedToArray(this.palette[value], 4),
              r = _this$palette$value[0],
              g = _this$palette$value[1],
              b = _this$palette$value[2],
              a = _this$palette$value[3];
            return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a / 255, ")");
          } else if (this.georasters[0].mins) {
            var _this$georasters$ = this.georasters[0],
              mins = _this$georasters$.mins,
              ranges = _this$georasters$.ranges;
            return this.scale((values[0] - mins[0]) / ranges[0]).hex();
          } else if (this.currentStats.mins) {
            var min = this.currentStats.mins[0];
            var range = this.currentStats.ranges[0];
            return this.scale((values[0] - min) / range).hex();
          }
        } else if (numberOfValues === 2) {
          return "rgb(".concat(values[0], ",").concat(values[1], ",0)");
        } else if (numberOfValues === 3) {
          return "rgb(".concat(values[0], ",").concat(values[1], ",").concat(values[2], ")");
        } else if (numberOfValues === 4) {
          return "rgba(".concat(values[0], ",").concat(values[1], ",").concat(values[2], ",").concat(values[3] / 255, ")");
        }
      }
    }
  },
  /**
   * Redraws the active map tiles updating the pixel values using the supplie callback
   */
  updateColors: function updateColors(pixelValuesToColorFn) {
    var _this6 = this;
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        debugLevel: -1
      },
      _ref4$debugLevel = _ref4.debugLevel,
      debugLevel = _ref4$debugLevel === void 0 ? -1 : _ref4$debugLevel;
    if (!pixelValuesToColorFn) {
      throw new Error("Missing pixelValuesToColorFn function");
    }

    // if debugLevel is -1, set it to the default for the class
    if (debugLevel === -1) debugLevel = this.debugLevel;
    if (debugLevel >= 1) console.log("Start updating active tile pixel values");

    // update option to ensure correct colours at other zoom levels.
    this.options.pixelValuesToColorFn = pixelValuesToColorFn;
    var tiles = this.getActiveTiles();
    if (!tiles) {
      console.error("No active tiles available");
      return this;
    }
    if (debugLevel >= 1) console.log("Active tiles fetched", tiles);
    tiles.forEach(function (tile) {
      var coords = tile.coords,
        el = tile.el;
      _this6.drawTile({
        tile: el,
        coords: coords,
        context: el.getContext("2d")
      });
    });
    if (debugLevel >= 1) console.log("Finished updating active tile colours");
    return this;
  },
  getTiles: function getTiles() {
    // transform _tiles object collection into an array
    return Object.values(this._tiles);
  },
  getActiveTiles: function getActiveTiles() {
    var _this7 = this;
    var tiles = this.getTiles();
    // only return valid tiles
    return tiles.filter(function (tile) {
      return _this7._isValidTile(tile.coords);
    });
  },
  isSupportedProjection: function isSupportedProjection() {
    if (this._isSupportedProjection === undefined) {
      var projection = this.projection;
      if (isUTM_default()(projection)) {
        this._isSupportedProjection = true;
      } else if (PROJ4_SUPPORTED_PROJECTIONS.has(projection)) {
        this._isSupportedProjection = true;
      } else if (typeof (proj4_fully_loaded_default()) === "function" && "EPSG:".concat(projection) in (proj4_fully_loaded_default()).defs) {
        this._isSupportedProjection = true;
      } else if (typeof proj4 === "function" && typeof proj4.defs !== "undefined" && "EPSG:".concat(projection) in proj4.defs) {
        this._isSupportedProjection = true;
      } else {
        this._isSupportedProjection = false;
      }
    }
    return this._isSupportedProjection;
  },
  getProjectionString: function getProjectionString(projection) {
    if (isUTM_default()(projection)) {
      return getProjString_default()(projection);
    }
    return "EPSG:".concat(projection);
  },
  initBounds: function initBounds(options) {
    if (!options) options = this.options;
    if (!this._bounds) {
      var debugLevel = this.debugLevel,
        height = this.height,
        width = this.width,
        projection = this.projection,
        xmin = this.xmin,
        xmax = this.xmax,
        ymin = this.ymin,
        ymax = this.ymax;
      // check if map using Simple CRS
      if (isSimpleCRS(this.getMapCRS())) {
        if (height === width) {
          this._bounds = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLngBounds([ORIGIN, [MAX_NORTHING, MAX_EASTING]]);
        } else if (height > width) {
          this._bounds = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLngBounds([ORIGIN, [MAX_NORTHING, MAX_EASTING / this.ratio]]);
        } else if (width > height) {
          this._bounds = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLngBounds([ORIGIN, [MAX_NORTHING * this.ratio, MAX_EASTING]]);
        }
      } else if (projection === EPSG4326) {
        if (debugLevel >= 1) console.log("georaster projection is in ".concat(EPSG4326));
        var minLatWest = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLng(ymin, xmin);
        var maxLatEast = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLng(ymax, xmax);
        this._bounds = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLngBounds(minLatWest, maxLatEast);
      } else if (this.getProjector()) {
        if (debugLevel >= 1) console.log("projection is UTM or supported by proj4");
        var bottomLeft = this.getProjector().forward({
          x: xmin,
          y: ymin
        });
        var _minLatWest = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLng(bottomLeft.y, bottomLeft.x);
        var topRight = this.getProjector().forward({
          x: xmax,
          y: ymax
        });
        var _maxLatEast = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLng(topRight.y, topRight.x);
        this._bounds = external_root_L_commonjs_leaflet_amd_leaflet_commonjs2_leaflet_.latLngBounds(_minLatWest, _maxLatEast);
      } else {
        if (typeof (proj4_fully_loaded_default()) !== "function") {
          throw "You are using the lite version of georaster-layer-for-leaflet, which does not support rasters with the projection ".concat(projection, ".  Please try using the default build or add the projection definition to your global proj4.");
        } else {
          throw "GeoRasterLayer does not provide built-in support for rasters with the projection ".concat(projection, ".  Add the projection definition to your global proj4.");
        }
      }

      // these values are used so we don't try to sample outside of the raster
      this.xMinOfLayer = this._bounds.getWest();
      this.xMaxOfLayer = this._bounds.getEast();
      this.yMaxOfLayer = this._bounds.getNorth();
      this.yMinOfLayer = this._bounds.getSouth();
      options.bounds = this._bounds;
    }
  },
  getProjector: function getProjector() {
    if (this.isSupportedProjection()) {
      if (!(proj4_fully_loaded_default()) && !proj4) {
        throw "proj4 must be found in the global scope in order to load a raster that uses this projection";
      }
      if (!this._projector) {
        var projString = this.getProjectionString(this.projection);
        if (this.debugLevel >= 1) log({
          projString: projString
        });
        var proj4Lib;
        if (projString.startsWith("EPSG")) {
          if (typeof proj4 === "function" && typeof proj4.defs === "function" && projString in proj4.defs) {
            proj4Lib = proj4;
          } else if (typeof (proj4_fully_loaded_default()) === "function" && typeof (proj4_fully_loaded_default()).defs === "function" && projString in (proj4_fully_loaded_default()).defs) {
            proj4Lib = (proj4_fully_loaded_default());
          } else {
            throw "[georaster-layer-for-leaflet] projection not found in proj4 instance";
          }
        } else {
          if (typeof proj4 === "function") {
            proj4Lib = proj4;
          } else if (typeof (proj4_fully_loaded_default()) === "function") {
            proj4Lib = (proj4_fully_loaded_default());
          } else {
            throw "[georaster-layer-for-leaflet] projection not found in proj4 instance";
          }
        }
        this._projector = proj4Lib(projString, "EPSG:".concat(EPSG4326));
        if (this.debugLevel >= 1) console.log("projector set");
      }
      return this._projector;
    }
  },
  same: function same(array, key) {
    return new Set(array.map(function (item) {
      return item[key];
    })).size === 1;
  },
  clearCache: function clearCache() {
    this.cache = {};
  },
  _getResolution: function _getResolution(zoom) {
    var resolution = this.options.resolution;
    var resolutionValue;
    if (_typeof(resolution) === "object") {
      var zoomLevels = Object.keys(resolution);
      for (var key in zoomLevels) {
        if (Object.prototype.hasOwnProperty.call(zoomLevels, key)) {
          var zoomLvl = parseInt(zoomLevels[key]);
          if (zoomLvl <= zoom) {
            resolutionValue = resolution[zoomLvl];
          } else {
            break;
          }
        }
      }
    } else {
      resolutionValue = resolution;
    }
    return resolutionValue;
  }
});

/* eslint-disable @typescript-eslint/no-explicit-any */
if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
  window["GeoRasterLayer"] = GeoRasterLayer;
}
if (typeof self !== "undefined") {
  self["GeoRasterLayer"] = GeoRasterLayer;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* harmony default export */ const georaster_layer_for_leaflet = (GeoRasterLayer);

// Explicitly exports public types
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=georaster-layer-for-leaflet.js.map