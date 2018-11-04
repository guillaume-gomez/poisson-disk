!function(t){var r={};function n(e){if(r[e])return r[e].exports;var i=r[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},n.p="",n(n.s=7)}([function(t,r,n){"use strict";t.exports=function(t,r){var n,e,i,o,s,a=new Array(t),u=Math.floor(t/2)<<1,h=0;for(s=0;s<u;s+=2)n=-2*Math.log(r()),e=Math.sqrt(n),i=2*Math.PI*r(),h+=n,a[s]=e*Math.cos(i),a[s+1]=e*Math.sin(i);if(t%2){var c=Math.sqrt(-2*Math.log(r()))*Math.cos(2*Math.PI*r());a[t-1]=c,h+=Math.pow(c,2)}for(o=1/Math.sqrt(h),s=0;s<t;++s)a[s]*=o;return a}},function(t,r){t.exports=function(t,r){t=t||1,r=r||2;for(var n=2*t+1,e=Math.pow(n,r)-1,i=new Array(e),o=0;o<e;o++)for(var s=i[o]=new Array(r),a=o<e/2?o:o+1,u=1;u<=r;u++){var h=a%Math.pow(n,u);s[u-1]=h/Math.pow(n,u-1)-t,a-=h}return i}},function(t,r){function n(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(n(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))}(t)||!!t._isBuffer)}},function(t,r,n){"use strict";t.exports=function(t){for(var r=new Array(t),n=0;n<t;++n)r[n]=n;return r}},function(t,r,n){var e=n(3),i=n(2),o="undefined"!=typeof Float64Array;function s(t,r){return t[0]-r[0]}function a(){var t,r=this.stride,n=new Array(r.length);for(t=0;t<n.length;++t)n[t]=[Math.abs(r[t]),t];n.sort(s);var e=new Array(n.length);for(t=0;t<e.length;++t)e[t]=n[t][1];return e}function u(t,r){var n=["View",r,"d",t].join("");r<0&&(n="View_Nil"+t);var i="generic"===t;if(-1===r){var o="function "+n+"(a){this.data=a;};var proto="+n+".prototype;proto.dtype='"+t+"';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new "+n+"(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_"+n+"(a){return new "+n+"(a);}";return new Function(o)()}if(0===r){o="function "+n+"(a,d) {this.data = a;this.offset = d};var proto="+n+".prototype;proto.dtype='"+t+"';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function "+n+"_copy() {return new "+n+"(this.data,this.offset)};proto.pick=function "+n+"_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function "+n+"_get(){return "+(i?"this.data.get(this.offset)":"this.data[this.offset]")+"};proto.set=function "+n+"_set(v){return "+(i?"this.data.set(this.offset,v)":"this.data[this.offset]=v")+"};return function construct_"+n+"(a,b,c,d){return new "+n+"(a,d)}";return new Function("TrivialArray",o)(h[t][0])}o=["'use strict'"];var s=e(r),u=s.map(function(t){return"i"+t}),c="this.offset+"+s.map(function(t){return"this.stride["+t+"]*i"+t}).join("+"),p=s.map(function(t){return"b"+t}).join(","),f=s.map(function(t){return"c"+t}).join(",");o.push("function "+n+"(a,"+p+","+f+",d){this.data=a","this.shape=["+p+"]","this.stride=["+f+"]","this.offset=d|0}","var proto="+n+".prototype","proto.dtype='"+t+"'","proto.dimension="+r),o.push("Object.defineProperty(proto,'size',{get:function "+n+"_size(){return "+s.map(function(t){return"this.shape["+t+"]"}).join("*"),"}})"),1===r?o.push("proto.order=[0]"):(o.push("Object.defineProperty(proto,'order',{get:"),r<4?(o.push("function "+n+"_order(){"),2===r?o.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})"):3===r&&o.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")):o.push("ORDER})")),o.push("proto.set=function "+n+"_set("+u.join(",")+",v){"),i?o.push("return this.data.set("+c+",v)}"):o.push("return this.data["+c+"]=v}"),o.push("proto.get=function "+n+"_get("+u.join(",")+"){"),i?o.push("return this.data.get("+c+")}"):o.push("return this.data["+c+"]}"),o.push("proto.index=function "+n+"_index(",u.join(),"){return "+c+"}"),o.push("proto.hi=function "+n+"_hi("+u.join(",")+"){return new "+n+"(this.data,"+s.map(function(t){return["(typeof i",t,"!=='number'||i",t,"<0)?this.shape[",t,"]:i",t,"|0"].join("")}).join(",")+","+s.map(function(t){return"this.stride["+t+"]"}).join(",")+",this.offset)}");var d=s.map(function(t){return"a"+t+"=this.shape["+t+"]"}),l=s.map(function(t){return"c"+t+"=this.stride["+t+"]"});o.push("proto.lo=function "+n+"_lo("+u.join(",")+"){var b=this.offset,d=0,"+d.join(",")+","+l.join(","));for(var y=0;y<r;++y)o.push("if(typeof i"+y+"==='number'&&i"+y+">=0){d=i"+y+"|0;b+=c"+y+"*d;a"+y+"-=d}");o.push("return new "+n+"(this.data,"+s.map(function(t){return"a"+t}).join(",")+","+s.map(function(t){return"c"+t}).join(",")+",b)}"),o.push("proto.step=function "+n+"_step("+u.join(",")+"){var "+s.map(function(t){return"a"+t+"=this.shape["+t+"]"}).join(",")+","+s.map(function(t){return"b"+t+"=this.stride["+t+"]"}).join(",")+",c=this.offset,d=0,ceil=Math.ceil");for(y=0;y<r;++y)o.push("if(typeof i"+y+"==='number'){d=i"+y+"|0;if(d<0){c+=b"+y+"*(a"+y+"-1);a"+y+"=ceil(-a"+y+"/d)}else{a"+y+"=ceil(a"+y+"/d)}b"+y+"*=d}");o.push("return new "+n+"(this.data,"+s.map(function(t){return"a"+t}).join(",")+","+s.map(function(t){return"b"+t}).join(",")+",c)}");var g=new Array(r),v=new Array(r);for(y=0;y<r;++y)g[y]="a[i"+y+"]",v[y]="b[i"+y+"]";o.push("proto.transpose=function "+n+"_transpose("+u+"){"+u.map(function(t,r){return t+"=("+t+"===undefined?"+r+":"+t+"|0)"}).join(";"),"var a=this.shape,b=this.stride;return new "+n+"(this.data,"+g.join(",")+","+v.join(",")+",this.offset)}"),o.push("proto.pick=function "+n+"_pick("+u+"){var a=[],b=[],c=this.offset");for(y=0;y<r;++y)o.push("if(typeof i"+y+"==='number'&&i"+y+">=0){c=(c+this.stride["+y+"]*i"+y+")|0}else{a.push(this.shape["+y+"]);b.push(this.stride["+y+"])}");return o.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),o.push("return function construct_"+n+"(data,shape,stride,offset){return new "+n+"(data,"+s.map(function(t){return"shape["+t+"]"}).join(",")+","+s.map(function(t){return"stride["+t+"]"}).join(",")+",offset)}"),new Function("CTOR_LIST","ORDER",o.join("\n"))(h[t],a)}var h={float32:[],float64:[],int8:[],int16:[],int32:[],uint8:[],uint16:[],uint32:[],array:[],uint8_clamped:[],buffer:[],generic:[]};t.exports=function(t,r,n,e){if(void 0===t)return(0,h.array[0])([]);"number"==typeof t&&(t=[t]),void 0===r&&(r=[t.length]);var s=r.length;if(void 0===n){n=new Array(s);for(var a=s-1,c=1;a>=0;--a)n[a]=c,c*=r[a]}if(void 0===e)for(e=0,a=0;a<s;++a)n[a]<0&&(e-=(r[a]-1)*n[a]);for(var p=function(t){if(i(t))return"buffer";if(o)switch(Object.prototype.toString.call(t)){case"[object Float64Array]":return"float64";case"[object Float32Array]":return"float32";case"[object Int8Array]":return"int8";case"[object Int16Array]":return"int16";case"[object Int32Array]":return"int32";case"[object Uint8Array]":return"uint8";case"[object Uint16Array]":return"uint16";case"[object Uint32Array]":return"uint32";case"[object Uint8ClampedArray]":return"uint8_clamped"}return Array.isArray(t)?"array":"generic"}(t),f=h[p];f.length<=s+1;)f.push(u(p,f.length-1));return(0,f[s+1])(t,r,n,e)}},function(t,r,n){"use strict";var e=n(4);t.exports=function(t,r){r=r||"float64";for(var n=1,i=0;i<t.length;++i)n*=t[i];return e(new(function(t){switch(t){case"uint8":return Uint8Array;case"uint16":return Uint16Array;case"uint32":return Uint32Array;case"int8":return Int8Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float":case"float32":return Float32Array;case"double":case"float64":return Float64Array;case"uint8_clamped":return Uint8ClampedArray;case"generic":case"buffer":case"data":case"dataview":return ArrayBuffer;case"array":return Array}}(r))(n),t)}},function(t,r,n){"use strict";var e=n(5),i=n(1),o=n(0),s=function(t,r){for(var n=0,e=0;e<t.length;e++)n+=Math.pow(t[e]-r[e],2);return n},a=function(t,r,n,o,s){n=n||2*r,this.shape=t,this.dimension=this.shape.length,this.minDistance=r,this.squaredMinDistance=r*r,this.deltaDistance=n-r,this.cellSize=r/Math.sqrt(this.dimension),this.maxTries=o||30,this.rng=s||Math.random,this.neighbourhood=function(t){var r,n=i(2,t),e=[];for(r=0;r<t;r++)e.push(0);return n.push(e),n.sort(function(r,n){for(var e=0,i=0,o=0;o<t;o++)e+=Math.pow(r[o],2),i+=Math.pow(n[o],2);return e<i?-1:e>i?1:0}),n}(this.dimension),this.currentPoint=null,this.processList=[],this.samplePoints=[],this.gridShape=[];for(var a=0;a<this.dimension;a++)this.gridShape.push(Math.ceil(t[a]/this.cellSize));this.grid=e(this.gridShape,"uint32")};a.prototype.shape=null,a.prototype.dimension=null,a.prototype.minDistance=null,a.prototype.squaredMinDistance=null,a.prototype.deltaDistance=null,a.prototype.cellSize=null,a.prototype.maxTries=null,a.prototype.rng=null,a.prototype.neighbourhood=null,a.prototype.currentPoint=null,a.prototype.processList=null,a.prototype.samplePoints=null,a.prototype.gridShape=null,a.prototype.grid=null,a.prototype.addRandomPoint=function(){for(var t=new Array(this.dimension),r=0;r<this.dimension;r++)t[r]=this.rng()*this.shape[r];return this.directAddPoint(t)},a.prototype.addPoint=function(t){var r,n=!0;if(t.length===this.dimension)for(r=0;r<this.dimension&&n;r++)n=t[r]>=0&&t[r]<=this.shape[r];else n=!1;return n?this.directAddPoint(t):null},a.prototype.directAddPoint=function(t){var r,n=0,e=this.grid.stride;for(this.processList.push(t),this.samplePoints.push(t),r=0;r<this.dimension;r++)n+=(t[r]/this.cellSize|0)*e[r];return this.grid.data[n]=this.samplePoints.length,t},a.prototype.inNeighbourhood=function(t){var r,n,e,i,o,a=this.dimension,u=this.grid.stride;for(r=0;r<this.neighbourhood.length;r++){for(n=0,e=0;e<a;e++)(i=(t[e]/this.cellSize|0)+this.neighbourhood[r][e])>=0&&i<this.gridShape[e]&&(n+=i*u[e]);if(0!==this.grid.data[n]&&(o=this.samplePoints[this.grid.data[n]-1],s(t,o)<this.squaredMinDistance))return!0}return!1},a.prototype.next=function(){for(var t,r,n,e,i,s,a;this.processList.length>0;){for(null===this.currentPoint&&(this.currentPoint=this.processList.shift()),e=this.currentPoint,t=0;t<this.maxTries;t++){for(s=!0,n=this.minDistance+this.deltaDistance*this.rng(),2===this.dimension?(r=this.rng()*Math.PI*2,i=[Math.cos(r),Math.sin(r)]):i=o(this.dimension,this.rng),a=0;s&&a<this.dimension;a++)i[a]=e[a]+i[a]*n,s=i[a]>=0&&i[a]<=this.shape[a]-1;if(s&&!this.inNeighbourhood(i))return this.directAddPoint(i)}t===this.maxTries&&(this.currentPoint=null)}return null},a.prototype.fill=function(){for(0===this.samplePoints.length&&this.addRandomPoint();this.next(););return this.samplePoints},a.prototype.getAllPoints=function(){return this.samplePoints},a.prototype.reset=function(){var t=this.grid.data,r=0;for(r=0;r<t.length;r++)t[r]=0;this.samplePoints=[],this.currentPoint=null,this.processList.length=0},t.exports=a},function(t,r,n){"use strict";var e,i=(e=n(6))&&e.__esModule?e:{default:e};function o(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var n=[],e=!0,i=!1,o=void 0;try{for(var s,a=t[Symbol.iterator]();!(e=(s=a.next()).done)&&(n.push(s.value),!r||n.length!==r);e=!0);}catch(t){i=!0,o=t}finally{try{e||null==a.return||a.return()}finally{if(i)throw o}}return n}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s=1,a=5,u=5,h=0,c=20,p=0,f=20,d=2,l=[],y=1,g=4,v=2,m=3,b=2,w=5,A=5,j=15;function M(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],r=document.getElementById("myCanvas"),n="#".concat($("#dot-color").val())||"#FF0000";t&&(function(t){$("#export-to-png").click(function(){x(t)})}(r=function(){var t=document.createElement("CANVAS");return t.width=800,t.height=1e3,t.id="myCanvas",t.style.backgroundColor="#9E82B8",document.getElementById("canvasId").appendChild(t),t}()),function(t){$("#export-to-png-no-bg").click(function(){x(t,!1)})}(r),function(t){$("#reset").click(function(){t.getContext("2d").clearRect(0,0,t.width,t.height),M(!1)})}(r),$("#dot-color").change(function(){var t="#".concat($(this).val()),r=document.getElementById("myCanvas"),n=r.getContext("2d");n.clearRect(0,0,r.width,r.height),l.forEach(function(r){var e=r.x,i=r.y;P(n,e,i,s,t)})}),$("#nb-rows").slider({}),$("#nb-columns").slider({}),$("#min-distance").slider({}),$("#max-distance").slider({})),function(t,r){l=[];var n=t.getContext("2d"),e=$("#nb-rows").slider("getValue"),M=$("#nb-columns").slider("getValue"),x=$("#min-distance").slider("getValue"),I=$("#max-distance").slider("getValue");y=e[0],g=e[1],v=M[0],m=M[1],b=x[0],w=x[1],A=I[0],j=I[1],function t(r,n,e,a,u,M,x){if(M>d)return void function(t,r,n,e,s,a,u){var h=_(b,w),c=_(A,j);new i.default([s,a],h,c,30).fill().forEach(function(i){var s=o(i,2),a=s[0],h=s[1];l.push({x:a+n,y:h+e}),P(t,a+n,h+e,r,u)})}(r,s,n,e,a,u,x);var I=_(y,g);var S=u/I;var C=_(v,m);var $=a/C;for(var D=0;D<I;D++)for(var E=_(h,c),O=0;O<C;O++){var L=_(p,f),R=$,F=S,T=n+O*$,k=e+D*S;t(r,T,k,R-L,F-E,M+1,x)}}(n,a,u,t.width,t.height,1,r)}(r,n)}function P(t,r,n,e,i){t.beginPath(),t.arc(r,n,e,0,2*Math.PI,!1),t.fillStyle=i,t.fill()}function x(t){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=document.createElement("canvas");n.width=t.width,n.height=t.height;var e=n.getContext("2d");r&&(e.fillStyle=t.style.backgroundColor,e.fillRect(0,0,t.width,t.height)),e.drawImage(t,0,0);var i=n.toDataURL("image/png").replace("image/png","image/octet-stream");window.location.href=i}function _(t,r){return Math.round((r-t)*Math.random())+t}document.addEventListener("DOMContentLoaded",function(){M()})}]);