(()=>{function Ii(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function gf(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var Mn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ca={duration:.5,overwrite:!1,delay:0},Ch,Ke,Ee,zn=1e8,xe=1/zn,yh=Math.PI*2,mg=yh/4,gg=0,_f=Math.sqrt,_g=Math.cos,xg=Math.sin,Ge=function(t){return typeof t=="string"},Oe=function(t){return typeof t=="function"},Di=function(t){return typeof t=="number"},Fo=function(t){return typeof t>"u"},mi=function(t){return typeof t=="object"},yn=function(t){return t!==!1},Rh=function(){return typeof window<"u"},To=function(t){return Oe(t)||Ge(t)},xf=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},sn=Array.isArray,vg=/random\([^)]+\)/g,yg=/,\s*/g,lf=/(?:-?\.?\d|\.)+/gi,Ph=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ns=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,fh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ih=/[+-]=-?[.\d]+/,Mg=/[^,'"\[\]\s]+/gi,Sg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ie,fi,Mh,Lh,Cn={},Po={},vf,yf=function(t){return(Po=or(t,Cn))&&rn},Bo=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},ha=function(t,e){return!e&&console.warn(t)},Mf=function(t,e){return t&&(Cn[t]=e)&&Po&&(Po[t]=e)||Cn},ua=function(){return 0},bg={suppressEvents:!0,isStart:!0,kill:!1},Eo={suppressEvents:!0,kill:!1},wg={suppressEvents:!0},Dh={},ts=[],Sh={},Sf,xn={},ph={},cf=30,Co=[],Nh="",Uh=function(t){var e=t[0],n,i;if(mi(e)||Oe(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Co.length;i--&&!Co[i].targetTest(e););n=Co[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new kh(t[i],n)))||t.splice(i,1);return t},es=function(t){return t._gsap||Uh(Vn(t))[0]._gsap},Oh=function(t,e,n){return(n=t[e])&&Oe(n)?t[e]():Fo(n)&&t.getAttribute&&t.getAttribute(e)||n},un=function(t,e){return(t=t.split(",")).forEach(e)||t},Fe=function(t){return Math.round(t*1e5)/1e5||0},Pe=function(t){return Math.round(t*1e7)/1e7||0},Us=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},Ag=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Io=function(){var t=ts.length,e=ts.slice(0),n,i;for(Sh={},ts.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Fh=function(t){return!!(t._initted||t._startAt||t.add)},bf=function(t,e,n,i){ts.length&&!Ke&&Io(),t.render(e,n,i||!!(Ke&&e<0&&Fh(t))),ts.length&&!Ke&&Io()},wf=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Mg).length<2?e:Ge(t)?t.trim():t},Af=function(t){return t},Rn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Tg=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},or=function(t,e){for(var n in e)t[n]=e[n];return t},hf=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=mi(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},Lo=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},aa=function(t){var e=t.parent||Ie,n=t.keyframes?Tg(sn(t.keyframes)):Rn;if(yn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Eg=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Tf=function(t,e,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},ko=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,a=e._next;r?r._next=a:t[n]===e&&(t[n]=a),a?a._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},ns=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Is=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},Cg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},bh=function(t,e,n,i){return t._startAt&&(Ke?t._startAt.revert(Eo):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},Rg=function s(t){return!t||t._ts&&s(t.parent)},uf=function(t){return t._repeat?lr(t._tTime,t=t.duration()+t._rDelay)*t:0},lr=function(t,e){var n=Math.floor(t=Pe(t/e));return t&&n===t?n-1:n},Do=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},zo=function(t){return t._end=Pe(t._start+(t._tDur/Math.abs(t._ts||t._rts||xe)||0))},Vo=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Pe(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),zo(t),n._dirty||Is(n,t)),t},Ef=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Do(t.rawTime(),e),(!e._dur||ma(0,e.totalDuration(),n)-e._tTime>xe)&&e.render(n,!0)),Is(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-xe}},pi=function(t,e,n,i){return e.parent&&ns(e),e._start=Pe((Di(n)?n:!n&&No(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==Ie?kn(t,n,e):t._time)+e._delay),e._end=Pe(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Tf(t,e,"_first","_last",t._sort?"_start":0),No(e)||(t._recent=e),i||Ef(t,e),t._ts<0&&Vo(t,t._tTime),t},Cf=function(t,e){return(Cn.ScrollTrigger||Bo("scrollTrigger",e))&&Cn.ScrollTrigger.create(e,t)},Rf=function(t,e,n,i,r){if(Gh(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!Ke&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Sf!==vn.frame)return ts.push(t),t._lazy=[r,i],1},Pg=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},No=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Ig=function(t,e,n,i){var r=t.ratio,a=e<0||!e&&(!t._start&&Pg(t)&&!(!t._initted&&No(t))||(t._ts<0||t._dp._ts<0)&&!No(t))?0:1,o=t._rDelay,l=0,c,h,f;if(o&&t._repeat&&(l=ma(0,t._tDur,e),h=lr(l,o),t._yoyo&&h&1&&(a=1-a),h!==lr(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||Ke||i||t._zTime===xe||!e&&t._zTime){if(!t._initted&&Rf(t,e,i,n,l))return;for(f=t._zTime,t._zTime=e||(n?xe:0),n||(n=e&&!f),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&bh(t,e,n,!0),t._onUpdate&&!n&&En(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&En(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&ns(t,1),!n&&!Ke&&(En(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Lg=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},cr=function(t,e,n,i){var r=t._repeat,a=Pe(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Pe(a*(r+1)+t._rDelay*r):a,o>0&&!i&&Vo(t,t._tTime=t._tDur*o),t.parent&&zo(t),n||Is(t.parent,t),t},df=function(t){return t instanceof nn?Is(t):cr(t,t._dur)},Dg={_start:0,endTime:ua,totalDuration:ua},kn=function s(t,e,n){var i=t.labels,r=t._recent||Dg,a=t.duration()>=zn?r.endTime(!1):t._dur,o,l,c;return Ge(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(sn(n)?n[0]:n).totalDuration()),o>1?s(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},oa=function(t,e,n){var i=Di(e[1]),r=(i?2:1)+(t<2?0:1),a=e[r],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=yn(l.vars.inherit)&&l.parent;a.immediateRender=yn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new ke(e[0],a,e[r+1])},is=function(t,e){return t||t===0?e(t):e},ma=function(t,e,n){return n<t?t:n>e?e:n},je=function(t,e){return!Ge(t)||!(e=Sg.exec(t))?"":e[1]},Ng=function(t,e,n){return is(n,function(i){return ma(t,e,i)})},wh=[].slice,Pf=function(t,e){return t&&mi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&mi(t[0]))&&!t.nodeType&&t!==fi},Ug=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return Ge(i)&&!e||Pf(i,1)?(r=n).push.apply(r,Vn(i)):n.push(i)})||n},Vn=function(t,e,n){return Ee&&!e&&Ee.selector?Ee.selector(t):Ge(t)&&!n&&(Mh||!hr())?wh.call((e||Lh).querySelectorAll(t),0):sn(t)?Ug(t,n):Pf(t)?wh.call(t,0):t?[t]:[]},Ah=function(t){return t=Vn(t)[0]||ha("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Vn(e,n.querySelectorAll?n:n===t?ha("Invalid scope")||Lh.createElement("div"):t)}},If=function(t){return t.sort(function(){return .5-Math.random()})},Lf=function(t){if(Oe(t))return t;var e=mi(t)?t:{each:t},n=Ls(e.ease),i=e.from||0,r=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,f=i;return Ge(i)?h=f={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],f=i[1]),function(u,d,m){var _=(m||e).length,p=a[_],g,v,b,y,A,T,x,S,I;if(!p){if(I=e.grid==="auto"?0:(e.grid||[1,zn])[1],!I){for(x=-zn;x<(x=m[I++].getBoundingClientRect().left)&&I<_;);I<_&&I--}for(p=a[_]=[],g=l?Math.min(I,_)*h-.5:i%I,v=I===zn?0:l?_*f/I-.5:i/I|0,x=0,S=zn,T=0;T<_;T++)b=T%I-g,y=v-(T/I|0),p[T]=A=c?Math.abs(c==="y"?y:b):_f(b*b+y*y),A>x&&(x=A),A<S&&(S=A);i==="random"&&If(p),p.max=x-S,p.min=S,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(I>_?_-1:c?c==="y"?_/I:I:Math.max(I,_/I))||0)*(i==="edges"?-1:1),p.b=_<0?r-_:r,p.u=je(e.amount||e.each)||0,n=n&&_<0?Yg(n):n}return _=(p[u]-p.min)/p.max||0,Pe(p.b+(n?n(_):_)*p.v)+p.u}},Th=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Pe(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Di(n)?0:je(n))}},Df=function(t,e){var n=sn(t),i,r;return!n&&mi(t)&&(i=n=t.radius||zn,t.values?(t=Vn(t.values),(r=!Di(t[0]))&&(i*=i)):t=Th(t.increment)),is(e,n?Oe(t)?function(a){return r=t(a),Math.abs(r-a)<=i?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=zn,h=0,f=t.length,u,d;f--;)r?(u=t[f].x-o,d=t[f].y-l,u=u*u+d*d):u=Math.abs(t[f]-o),u<c&&(c=u,h=f);return h=!i||c<=i?t[h]:a,r||h===a||Di(a)?h:h+je(a)}:Th(t))},Nf=function(t,e,n,i){return is(sn(t)?!e:n===!0?!!(n=0):!i,function(){return sn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},Og=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,a){return a(r)},i)}},Fg=function(t,e){return function(n){return t(parseFloat(n))+(e||je(n))}},Bg=function(t,e,n){return Of(t,e,0,1,n)},Uf=function(t,e,n){return is(n,function(i){return t[~~e(i)]})},kg=function s(t,e,n){var i=e-t;return sn(t)?Uf(t,s(0,t.length),e):is(n,function(r){return(i+(r-t)%i)%i+t})},zg=function s(t,e,n){var i=e-t,r=i*2;return sn(t)?Uf(t,s(0,t.length-1),e):is(n,function(a){return a=(r+(a-t)%r)%r||0,t+(a>i?r-a:a)})},ur=function(t){return t.replace(vg,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(yg);return Nf(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Of=function(t,e,n,i,r){var a=e-t,o=i-n;return is(r,function(l){return n+((l-t)/a*o||0)})},Vg=function s(t,e,n,i){var r=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!r){var a=Ge(t),o={},l,c,h,f,u;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(sn(t)&&!sn(e)){for(h=[],f=t.length,u=f-2,c=1;c<f;c++)h.push(s(t[c-1],t[c]));f--,r=function(m){m*=f;var _=Math.min(u,~~m);return h[_](m-_)},n=e}else i||(t=or(sn(t)?[]:{},t));if(!h){for(l in e)zh.call(o,t,l,"get",e[l]);r=function(m){return Xh(m,o)||(a?t.p:t)}}}return is(n,r)},ff=function(t,e,n){var i=t.labels,r=zn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},En=function(t,e,n){var i=t.vars,r=i[e],a=Ee,o=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&ts.length&&Io(),o&&(Ee=o),h=l?r.apply(c,l):r.call(c),Ee=a,h},sa=function(t){return ns(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ke),t.progress()<1&&En(t,"onInterrupt"),t},ar,Ff=[],Bf=function(t){if(t)if(t=!t.name&&t.default||t,Rh()||t.headless){var e=t.name,n=Oe(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:ua,render:Xh,add:zh,kill:s_,modifier:i_,rawVars:0},a={targetTest:0,get:0,getSetter:Go,aliases:{},register:0};if(hr(),t!==i){if(xn[e])return;Rn(i,Rn(Lo(t,r),a)),or(i.prototype,or(r,Lo(t,a))),xn[i.prop=e]=i,t.targetTest&&(Co.push(i),Dh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Mf(e,i),t.register&&t.register(rn,i,dn)}else Ff.push(t)},Me=255,ra={aqua:[0,Me,Me],lime:[0,Me,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Me],navy:[0,0,128],white:[Me,Me,Me],olive:[128,128,0],yellow:[Me,Me,0],orange:[Me,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Me,0,0],pink:[Me,192,203],cyan:[0,Me,Me],transparent:[Me,Me,Me,0]},mh=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Me+.5|0},kf=function(t,e,n){var i=t?Di(t)?[t>>16,t>>8&Me,t&Me]:0:ra.black,r,a,o,l,c,h,f,u,d,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),ra[t])i=ra[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Me,i&Me,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Me,t&Me]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(lf),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,r=h*2-a,i.length>3&&(i[3]*=1),i[0]=mh(l+1/3,r,a),i[1]=mh(l,r,a),i[2]=mh(l-1/3,r,a);else if(~t.indexOf("="))return i=t.match(Ph),n&&i.length<4&&(i[3]=1),i}else i=t.match(lf)||ra.transparent;i=i.map(Number)}return e&&!m&&(r=i[0]/Me,a=i[1]/Me,o=i[2]/Me,f=Math.max(r,a,o),u=Math.min(r,a,o),h=(f+u)/2,f===u?l=c=0:(d=f-u,c=h>.5?d/(2-f-u):d/(f+u),l=f===r?(a-o)/d+(a<o?6:0):f===a?(o-r)/d+2:(r-a)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},zf=function(t){var e=[],n=[],i=-1;return t.split(Li).forEach(function(r){var a=r.match(Ns)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},pf=function(t,e,n){var i="",r=(t+i).match(Li),a=e?"hsla(":"rgba(",o=0,l,c,h,f;if(!r)return t;if(r=r.map(function(u){return(u=kf(u,e,1))&&a+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=zf(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Li,"1").split(Ns),f=c.length-1;o<f;o++)i+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(Li),f=c.length-1;o<f;o++)i+=c[o]+r[o];return i+c[f]},Li=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in ra)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),Gg=/hsl[a]?\(/,Bh=function(t){var e=t.join(" "),n;if(Li.lastIndex=0,Li.test(e))return n=Gg.test(e),t[1]=pf(t[1],n),t[0]=pf(t[0],n,zf(t[1])),!0},da,vn=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,a=r,o=[],l,c,h,f,u,d,m=function _(p){var g=s()-i,v=p===!0,b,y,A,T;if((g>t||g<0)&&(n+=g-e),i+=g,A=i-n,b=A-a,(b>0||v)&&(T=++f.frame,u=A-f.time*1e3,f.time=A=A/1e3,a+=b+(b>=r?0:r-b),y=1),v||(l=c(_)),y)for(d=0;d<o.length;d++)o[d](A,u,T,p)};return f={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return u/(1e3/(p||60))},wake:function(){vf&&(!Mh&&Rh()&&(fi=Mh=window,Lh=fi.document||{},Cn.gsap=rn,(fi.gsapVersions||(fi.gsapVersions=[])).push(rn.version),yf(Po||fi.GreenSockGlobals||!fi.gsap&&fi||{}),Ff.forEach(Bf)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=h||function(p){return setTimeout(p,a-f.time*1e3+1|0)},da=1,m(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),da=0,c=ua},lagSmoothing:function(p,g){t=p||1/0,e=Math.min(g||33,t)},fps:function(p){r=1e3/(p||240),a=f.time*1e3+r},add:function(p,g,v){var b=g?function(y,A,T,x){p(y,A,T,x),f.remove(b)}:p;return f.remove(p),o[v?"unshift":"push"](b),hr(),b},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&d>=g&&d--},_listeners:o},f})(),hr=function(){return!da&&vn.wake()},ue={},Hg=/^[\d.\-M][\d.\-,\s]/,Wg=/["']/g,Xg=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(Wg,"").trim():+c,i=l.substr(o+1).trim();return e},qg=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},$g=function(t){var e=(t+"").split("("),n=ue[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Xg(e[1])]:qg(t).split(",").map(wf)):ue._CE&&Hg.test(t)?ue._CE("",t):n},Yg=function(t){return function(e){return 1-t(1-e)}},Ls=function(t,e){return t&&(Oe(t)?t:ue[t]||$g(t))||e},Os=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},a;return un(t,function(o){ue[o]=Cn[o]=r,ue[a=o.toLowerCase()]=n;for(var l in r)ue[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ue[o+"."+l]=r[l]}),r},Vf=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},gh=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),a=r/yh*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*xg((h-a)*r)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Vf(o);return r=yh/r,l.config=function(c,h){return s(t,c,h)},l},_h=function s(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:Vf(n);return i.config=function(r){return s(t,r)},i};un("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Os(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ue.Linear.easeNone=ue.none=ue.Linear.easeIn;Os("Elastic",gh("in"),gh("out"),gh());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(o){return o<e?s*o*o:o<n?s*Math.pow(o-1.5/t,2)+.75:o<i?s*(o-=2.25/t)*o+.9375:s*Math.pow(o-2.625/t,2)+.984375};Os("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Os("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Os("Circ",function(s){return-(_f(1-s*s)-1)});Os("Sine",function(s){return s===1?1:-_g(s*mg)+1});Os("Back",_h("in"),_h("out"),_h());ue.SteppedEase=ue.steps=Cn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,a=1-xe;return function(o){return((i*ma(0,a,o)|0)+r)*n}}};ca.ease=ue["quad.out"];un("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Nh+=s+","+s+"Params,"});var kh=function(t,e){this.id=gg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Oh,this.set=e?e.getSetter:Go},fa=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,cr(this,+e.duration,1,1),this.data=e.data,Ee&&(this._ctx=Ee,Ee.data.push(this)),da||vn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,cr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(hr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Vo(this,n),!r._dp||r.parent||Ef(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&pi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===xe||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),bf(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+uf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+uf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?lr(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-xe?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?Do(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-xe?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||r>0&&r<o)&&this.totalTime(ma(-Math.abs(this._delay),o,r),i!==!1),zo(this),Cg(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{hr(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,r=this.progress()===1&&Math.abs(this._zTime)!==xe,a;if(r)for(this._tTime-=xe,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+xe){r=!1;break}a=a._next}this.totalTime(i,r)}return this},t.startTime=function(n){if(arguments.length){this._start=Pe(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&pi(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(yn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Do(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=wg);var i=Ke;return Ke=n,Fh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ke=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,df(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,df(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(kn(this,n),yn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,yn(i)),this._dur||(this._zTime=-xe),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-xe:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-xe,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-xe)},t.eventCallback=function(n,i,r){var a=this.vars;return arguments.length>1?(i?(a[n]=i,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(a){var o=Oe(n)?n:Af,l=function(){var h=i.then;i.then=null,r&&r(),Oe(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){sa(this)},s})();Rn(fa.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-xe,_prom:0,_ps:!1,_rts:1});var nn=(function(s){gf(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=yn(n.sortChildren),Ie&&pi(n.parent||Ie,Ii(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&Cf(Ii(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,a){return oa(0,arguments,this),this},e.from=function(i,r,a){return oa(1,arguments,this),this},e.fromTo=function(i,r,a,o){return oa(2,arguments,this),this},e.set=function(i,r,a){return r.duration=0,r.parent=this,aa(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new ke(i,r,kn(this,a),1),this},e.call=function(i,r,a){return pi(this,ke.delayedCall(0,i,r),a)},e.staggerTo=function(i,r,a,o,l,c,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new ke(i,a,kn(this,l)),this},e.staggerFrom=function(i,r,a,o,l,c,h){return a.runBackwards=1,aa(a).immediateRender=yn(a.immediateRender),this.staggerTo(i,r,a,o,l,c,h)},e.staggerFromTo=function(i,r,a,o,l,c,h,f){return o.startAt=a,aa(o).immediateRender=yn(o.immediateRender),this.staggerTo(i,r,o,l,c,h,f)},e.render=function(i,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Pe(i),f=this._zTime<0!=i<0&&(this._initted||!c),u,d,m,_,p,g,v,b,y,A,T,x;if(this!==Ie&&h>l&&i>=0&&(h=l),h!==this._tTime||a||f){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,y=this._start,b=this._ts,g=!b,f&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,a);if(u=Pe(h%p),h===l?(_=this._repeat,u=c):(A=Pe(h/p),_=~~A,_&&_===A&&(u=c,_--),u>c&&(u=c)),A=lr(this._tTime,p),!o&&this._tTime&&A!==_&&this._tTime-A*p-this._dur<=0&&(A=_),T&&_&1&&(u=c-u,x=1),_!==A&&!this._lock){var S=T&&A&1,I=S===(T&&_&1);if(_<A&&(S=!S),o=S?0:h%c?c:h,this._lock=1,this.render(o||(x?0:Pe(_*p)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&En(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,A=_),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,I&&(this._lock=2,o=S?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=Lg(this,Pe(o),Pe(u)),v&&(h-=u-(u=v._start))),this._tTime=h,this._time=u,this._act=!!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!r&&!A&&(En(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(d=this._first;d;){if(m=d._next,(d._act||u>=d._start)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,r,a);if(d.render(d._ts>0?(u-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(u-d._start)*d._ts,r,a),u!==this._time||!this._ts&&!g){v=0,m&&(h+=this._zTime=-xe);break}}d=m}else{d=this._last;for(var R=i<0?i:u;d;){if(m=d._prev,(d._act||R<=d._end)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,r,a);if(d.render(d._ts>0?(R-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(R-d._start)*d._ts,r,a||Ke&&Fh(d)),u!==this._time||!this._ts&&!g){v=0,m&&(h+=this._zTime=R?-xe:xe);break}}d=m}}if(v&&!r&&(this.pause(),v.render(u>=o?0:-xe)._zTime=u>=o?1:-1,this._ts))return this._start=y,zo(this),this.render(i,r,a);this._onUpdate&&!r&&En(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(y===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&ns(this,1),!r&&!(i<0&&!o)&&(h||o||!l)&&(En(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var a=this;if(Di(r)||(r=kn(this,r,i)),!(i instanceof fa)){if(sn(i))return i.forEach(function(o){return a.add(o,r)}),this;if(Ge(i))return this.addLabel(i,r);if(Oe(i))i=ke.delayedCall(0,i);else return this}return this!==i?pi(this,i,r):this},e.getChildren=function(i,r,a,o){i===void 0&&(i=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-zn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof ke?r&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===i)return r[a]},e.remove=function(i){return Ge(i)?this.removeLabel(i):Oe(i)?this.killTweensOf(i):(i.parent===this&&ko(this,i),i===this._recent&&(this._recent=this._last),Is(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Pe(vn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=kn(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,a){var o=ke.delayedCall(0,r||ua,a);return o.data="isPause",this._hasPause=1,pi(this,o,kn(this,i))},e.removePause=function(i){var r=this._first;for(i=kn(this,i);r;)r._start===i&&r.data==="isPause"&&ns(r),r=r._next},e.killTweensOf=function(i,r,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Qi!==o[l]&&o[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var a=[],o=Vn(i),l=this._first,c=Di(r),h;l;)l instanceof ke?Ag(l._targets,o)&&(c?(!Qi||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(h=l.getTweensOf(o,r)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,r){r=r||{};var a=this,o=kn(a,i),l=r,c=l.startAt,h=l.onStart,f=l.onStartParams,u=l.immediateRender,d,m=ke.to(a,Rn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||xe,onStart:function(){if(a.pause(),!d){var p=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==p&&cr(m,p,0,1).render(m._time,!0,!0),d=1}h&&h.apply(m,f||[])}},r));return u?m.render(0):m},e.tweenFromTo=function(i,r,a){return this.tweenTo(r,Rn({startAt:{time:kn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),ff(this,kn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),ff(this,kn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+xe)},e.shiftChildren=function(i,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Pe(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=i);return Is(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Is(this)},e.totalDuration=function(i){var r=0,a=this,o=a._last,l=zn,c,h,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,pi(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(r-=h,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=Pe(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;cr(a,a===Ie&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(Ie._ts&&(bf(Ie,Do(i,Ie)),Sf=vn.frame),vn.frame>=cf){cf+=Mn.autoSleep||120;var r=Ie._first;if((!r||!r._ts)&&Mn.autoSleep&&vn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||vn.sleep()}}},t})(fa);Rn(nn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Zg=function(t,e,n,i,r,a,o){var l=new dn(this._pt,t,e,0,1,Wh,null,r),c=0,h=0,f,u,d,m,_,p,g,v;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=ur(i)),a&&(v=[n,i],a(v,t,e),n=v[0],i=v[1]),u=n.match(fh)||[];f=fh.exec(i);)m=f[0],_=i.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),m!==u[h++]&&(p=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:m.charAt(1)==="="?Us(p,m)-p:parseFloat(m)-p,m:d&&d<4?Math.round:0},c=fh.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Ih.test(i)||g)&&(l.e=0),this._pt=l,l},zh=function(t,e,n,i,r,a,o,l,c,h){Oe(i)&&(i=i(r||0,t,a));var f=t[e],u=n!=="get"?n:Oe(f)?c?t[e.indexOf("set")||!Oe(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,d=Oe(f)?c?t_:Hf:Hh,m;if(Ge(i)&&(~i.indexOf("random(")&&(i=ur(i)),i.charAt(1)==="="&&(m=Us(u,i)+(je(u)||0),(m||m===0)&&(i=m))),!h||u!==i||Eh)return!isNaN(u*i)&&i!==""?(m=new dn(this._pt,t,e,+u||0,i-(u||0),typeof f=="boolean"?n_:Wf,0,d),c&&(m.fp=c),o&&m.modifier(o,this,t),this._pt=m):(!f&&!(e in t)&&Bo(e,i),Zg.call(this,t,e,u,i,d,l||Mn.stringFilter,c))},Jg=function(t,e,n,i,r){if(Oe(t)&&(t=la(t,r,e,n,i)),!mi(t)||t.style&&t.nodeType||sn(t)||xf(t))return Ge(t)?la(t,r,e,n,i):t;var a={},o;for(o in t)a[o]=la(t[o],r,e,n,i);return a},Vh=function(t,e,n,i,r,a){var o,l,c,h;if(xn[t]&&(o=new xn[t]).init(r,o.rawVars?e[t]:Jg(e[t],i,r,a,n),n,i,a)!==!1&&(n._pt=l=new dn(n._pt,r,t,0,1,o.render,o,0,o.priority),n!==ar))for(c=n._ptLookup[n._targets.indexOf(r)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Qi,Eh,Gh=function s(t,e,n){var i=t.vars,r=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,f=i.yoyoEase,u=i.keyframes,d=i.autoRevert,m=t._dur,_=t._startAt,p=t._targets,g=t.parent,v=g&&g.data==="nested"?g.vars.targets:p,b=t._overwrite==="auto"&&!Ch,y=t.timeline,A=i.easeReverse||f,T,x,S,I,R,D,G,F,C,k,H,O,J;if(y&&(!u||!r)&&(r="none"),t._ease=Ls(r,ca.ease),t._rEase=A&&(Ls(A)||t._ease),t._from=!y&&!!i.runBackwards,t._from&&(t.ratio=1),!y||u&&!i.stagger){if(F=p[0]?es(p[0]).harness:0,O=F&&i[F.prop],T=Lo(i,Dh),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!d?_.render(-1,!0):_.revert(h&&m?Eo:bg),_._lazy=0),a){if(ns(t._startAt=ke.set(p,Rn({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&yn(l),startAt:null,delay:0,onUpdate:c&&function(){return En(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ke||!o&&!d)&&t._startAt.revert(Eo),o&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&m&&!_){if(e&&(o=!1),S=Rn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&yn(l),immediateRender:o,stagger:0,parent:g},T),O&&(S[F.prop]=O),ns(t._startAt=ke.set(p,S)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ke?t._startAt.revert(Eo):t._startAt.render(-1,!0)),t._zTime=e,!o)s(t._startAt,xe,xe);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&yn(l)||l&&!m,x=0;x<p.length;x++){if(R=p[x],G=R._gsap||Uh(p)[x]._gsap,t._ptLookup[x]=k={},Sh[G.id]&&ts.length&&Io(),H=v===p?x:v.indexOf(R),F&&(C=new F).init(R,O||T,t,H,v)!==!1&&(t._pt=I=new dn(t._pt,R,C.name,0,1,C.render,C,0,C.priority),C._props.forEach(function(q){k[q]=I}),C.priority&&(D=1)),!F||O)for(S in T)xn[S]&&(C=Vh(S,T,t,H,R,v))?C.priority&&(D=1):k[S]=I=zh.call(t,R,S,"get",T[S],H,v,0,i.stringFilter);t._op&&t._op[x]&&t.kill(R,t._op[x]),b&&t._pt&&(Qi=t,Ie.killTweensOf(R,k,t.globalTime(e)),J=!t.parent,Qi=0),t._pt&&l&&(Sh[G.id]=1)}D&&qh(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!J,u&&e<=0&&y.render(zn,!0,!0)},Kg=function(t,e,n,i,r,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,f,u,d;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,d=t._targets.length;d--;){if(h=u[d][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Eh=1,t.vars[e]="+=0",Gh(t,o),Eh=0,l?ha(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(d=c.length;d--;)f=c[d],h=f._pt||f,h.s=(i||i===0)&&!r?i:h.s+(i||0)+a*h.c,h.c=n-h.s,f.e&&(f.e=Fe(n)+je(f.e)),f.b&&(f.b=h.s+je(f.b))},jg=function(t,e){var n=t[0]?es(t[0]).harness:0,i=n&&n.aliases,r,a,o,l;if(!i)return e;r=or({},e);for(a in i)if(a in r)for(l=i[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},Qg=function(t,e,n,i){var r=e.ease||i||"power1.inOut",a,o;if(sn(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:r})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},la=function(t,e,n,i,r){return Oe(t)?t.call(e,n,i,r):Ge(t)&&~t.indexOf("random(")?ur(t):t},Uo=Nh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Gf={};un(Uo+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Gf[s]=1});Uo=Uo.split(",");var ke=(function(s){gf(t,s);function t(n,i,r,a){var o;typeof i=="number"&&(r.duration=i,i=r,r=null),o=s.call(this,a?i:aa(i))||this;var l=o.vars,c=l.duration,h=l.delay,f=l.immediateRender,u=l.stagger,d=l.overwrite,m=l.keyframes,_=l.defaults,p=l.scrollTrigger,g=i.parent||Ie,v=(sn(n)||xf(n)?Di(n[0]):"length"in i)?[n]:Vn(n),b,y,A,T,x,S,I,R;if(o._targets=v.length?Uh(v):ha("GSAP target "+n+" not found. https://gsap.com",!Mn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,m||u||To(c)||To(h)){i=o.vars;var D=i.easeReverse||i.yoyoEase;if(b=o.timeline=new nn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:v}),b.kill(),b.parent=b._dp=Ii(o),b._start=0,u||To(c)||To(h)){if(T=v.length,I=u&&Lf(u),mi(u))for(x in u)~Uo.indexOf(x)&&(R||(R={}),R[x]=u[x]);for(y=0;y<T;y++)A=Lo(i,Gf),A.stagger=0,D&&(A.easeReverse=D),R&&or(A,R),S=v[y],A.duration=+la(c,Ii(o),y,S,v),A.delay=(+la(h,Ii(o),y,S,v)||0)-o._delay,!u&&T===1&&A.delay&&(o._delay=h=A.delay,o._start+=h,A.delay=0),b.to(S,A,I?I(y,S,v):0),b._ease=ue.none;b.duration()?c=h=0:o.timeline=0}else if(m){aa(Rn(b.vars.defaults,{ease:"none"})),b._ease=Ls(m.ease||i.ease||"none");var G=0,F,C,k;if(sn(m))m.forEach(function(H){return b.to(v,H,">")}),b.duration();else{A={};for(x in m)x==="ease"||x==="easeEach"||Qg(x,m[x],A,m.easeEach);for(x in A)for(F=A[x].sort(function(H,O){return H.t-O.t}),G=0,y=0;y<F.length;y++)C=F[y],k={ease:C.e,duration:(C.t-(y?F[y-1].t:0))/100*c},k[x]=C.v,b.to(v,k,G),G+=k.duration;b.duration()<c&&b.to({},{duration:c-b.duration()})}}c||o.duration(c=b.duration())}else o.timeline=0;return d===!0&&!Ch&&(Qi=Ii(o),Ie.killTweensOf(v),Qi=0),pi(g,Ii(o),r),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(f||!c&&!m&&o._start===Pe(g._time)&&yn(f)&&Rg(Ii(o))&&g.data!=="nested")&&(o._tTime=-xe,o.render(Math.max(0,-h)||0)),p&&Cf(Ii(o),p),o}var e=t.prototype;return e.render=function(i,r,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,f=i>l-xe&&!h?l:i<xe?0:i,u,d,m,_,p,g,v,b;if(!c)Ig(this,i,r,a);else if(f!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=f,b=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,a);if(u=Pe(f%_),f===l?(m=this._repeat,u=c):(p=Pe(f/_),m=~~p,m&&m===p?(u=c,m--):u>c&&(u=c)),g=this._yoyo&&m&1,g&&(u=c-u),p=lr(this._tTime,_),u===o&&!a&&this._initted&&m===p)return this._tTime=f,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&u!==_&&this._initted&&(this._lock=a=1,this.render(Pe(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(Rf(this,h?i:u,a,r,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,r,a)}if(this._rEase){var y=u<o;if(y!==this._inv){var A=y?o:c-o;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(y?-1:1)/A:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(u/c);if(this._from&&(this.ratio=v=1-v),this._tTime=f,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!r&&!p&&(En(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(v,d.d),d=d._next;b&&b.render(i<0?i:b._dur*b._ease(u/this._dur),r,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&bh(this,i,r,a),En(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!r&&this.parent&&En(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&bh(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&ns(this,1),!r&&!(h&&!o)&&(f||o||g)&&(En(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,a,o,l){da||vn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Gh(this,c),h=this._ease(c/this._dur),Kg(this,i,r,a,o,h,c,l)?this.resetTo(i,r,a,o,1):(Vo(this,0),this.parent||Tf(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?sa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ke),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Qi&&Qi.vars.overwrite!==!0)._first||sa(this),this.parent&&a!==this.timeline.totalDuration()&&cr(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Vn(i):o,c=this._ptLookup,h=this._pt,f,u,d,m,_,p,g;if((!r||r==="all")&&Eg(o,l))return r==="all"&&(this._pt=0),sa(this);for(f=this._op=this._op||[],r!=="all"&&(Ge(r)&&(_={},un(r,function(v){return _[v]=1}),r=_),r=jg(o,r)),g=o.length;g--;)if(~l.indexOf(o[g])){u=c[g],r==="all"?(f[g]=r,m=u,d={}):(d=f[g]=f[g]||{},m=r);for(_ in m)p=u&&u[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&ko(this,p,"_pt"),delete u[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&h&&sa(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return oa(1,arguments)},t.delayedCall=function(i,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,r,a){return oa(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,a){return Ie.killTweensOf(i,r,a)},t})(fa);Rn(ke.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});un("staggerTo,staggerFrom,staggerFromTo",function(s){ke[s]=function(){var t=new nn,e=wh.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var Hh=function(t,e,n){return t[e]=n},Hf=function(t,e,n){return t[e](n)},t_=function(t,e,n,i){return t[e](i.fp,n)},e_=function(t,e,n){return t.setAttribute(e,n)},Go=function(t,e){return Oe(t[e])?Hf:Fo(t[e])&&t.setAttribute?e_:Hh},Wf=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},n_=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Wh=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Xh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},i_=function(t,e,n,i){for(var r=this._pt,a;r;)a=r._next,r.p===i&&r.modifier(t,e,n),r=a},s_=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?ko(this,e,"_pt"):e.dep||(n=1),e=i;return!n},r_=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},qh=function(t){for(var e=t._pt,n,i,r,a;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=r},dn=(function(){function s(e,n,i,r,a,o,l,c,h){this.t=n,this.s=r,this.c=a,this.p=i,this.r=o||Wf,this.d=l||this,this.set=c||Hh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=r_,this.m=n,this.mt=r,this.tween=i},s})();un(Nh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Dh[s]=1});Cn.TweenMax=Cn.TweenLite=ke;Cn.TimelineLite=Cn.TimelineMax=nn;Ie=new nn({sortChildren:!1,defaults:ca,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Mn.stringFilter=Bh;var Ds=[],Ro={},a_=[],mf=0,o_=0,xh=function(t){return(Ro[t]||a_).map(function(e){return e()})},pa=function(){var t=Date.now(),e=[];t-mf>2&&(xh("matchMediaInit"),Ds.forEach(function(n){var i=n.queries,r=n.conditions,a,o,l,c;for(o in i)a=fi.matchMedia(i[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),xh("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),mf=t,xh("matchMedia"))},Xf=(function(){function s(e,n){this.selector=n&&Ah(n),this.data=[],this._r=[],this.isReverted=!1,this.id=o_++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Oe(n)&&(r=i,i=n,n=Oe);var a=this,o=function(){var c=Ee,h=a.selector,f;return c&&c!==a&&c.data.push(a),r&&(a.selector=Ah(r)),Ee=a,f=i.apply(a,arguments),Oe(f)&&a._r.push(f),Ee=c,a.selector=h,a.isReverted=!1,f};return a.last=o,n===Oe?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Ee;Ee=null,n(this),Ee=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof ke&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof nn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ke)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=Ds.length;a--;)Ds[a].id===this.id&&Ds.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(pa):o.removeEventListener("change",pa)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},s})(),l_=(function(){function s(e){this.contexts=[],this.scope=e,Ee&&Ee.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){mi(n)||(n={matches:n});var a=new Xf(0,r||this.scope),o=a.conditions={},l,c,h;Ee&&!a.selector&&(a.selector=Ee.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=fi.matchMedia(n[c]),l&&(Ds.indexOf(a)<0&&Ds.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(pa):l.addEventListener("change",pa),(a._mqs||(a._mqs=[])).push(l)));return h&&i(a,function(f){return a.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),Oo={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Bf(i)})},timeline:function(t){return new nn(t)},getTweensOf:function(t,e){return Ie.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ge(t)&&(t=Vn(t)[0]);var r=es(t||{}).get,a=n?Af:wf;return n==="native"&&(n=""),t&&(e?a((xn[e]&&xn[e].get||r)(t,e,n,i)):function(o,l,c){return a((xn[o]&&xn[o].get||r)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=Vn(t),t.length>1){var i=t.map(function(h){return rn.quickSetter(h,e,n)}),r=i.length;return function(h){for(var f=r;f--;)i[f](h)}}t=t[0]||{};var a=xn[e],o=es(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var f=new a;ar._pt=0,f.init(t,n?h+n:h,ar,0,[t]),f.render(1,f),ar._pt&&Xh(1,ar)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,r=rn.to(t,Rn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return r.resetTo(e,l,c,h)};return a.tween=r,a},isTweening:function(t){return Ie.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Ls(t.ease,ca.ease)),hf(ca,t||{})},config:function(t){return hf(Mn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!xn[o]&&!Cn[o]&&ha(e+" effect requires "+o+" plugin.")}),ph[e]=function(o,l,c){return n(Vn(o),Rn(l||{},r),c)},a&&(nn.prototype[e]=function(o,l,c){return this.add(ph[e](o,mi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ue[t]=Ls(e)},parseEase:function(t,e){return arguments.length?Ls(t,e):ue},getById:function(t){return Ie.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new nn(t),i,r;for(n.smoothChildTiming=yn(t.smoothChildTiming),Ie.remove(n),n._dp=0,n._time=n._tTime=Ie._time,i=Ie._first;i;)r=i._next,(e||!(!i._dur&&i instanceof ke&&i.vars.onComplete===i._targets[0]))&&pi(n,i,i._start-i._delay),i=r;return pi(Ie,n,0),n},context:function(t,e){return t?new Xf(t,e):Ee},matchMedia:function(t){return new l_(t)},matchMediaRefresh:function(){return Ds.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||pa()},addEventListener:function(t,e){var n=Ro[t]||(Ro[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Ro[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:kg,wrapYoyo:zg,distribute:Lf,random:Nf,snap:Df,normalize:Bg,getUnit:je,clamp:Ng,splitColor:kf,toArray:Vn,selector:Ah,mapRange:Of,pipe:Og,unitize:Fg,interpolate:Vg,shuffle:If},install:yf,effects:ph,ticker:vn,updateRoot:nn.updateRoot,plugins:xn,globalTimeline:Ie,core:{PropTween:dn,globals:Mf,Tween:ke,Timeline:nn,Animation:fa,getCache:es,_removeLinkedListItem:ko,reverting:function(){return Ke},context:function(t){return t&&Ee&&(Ee.data.push(t),t._ctx=Ee),Ee},suppressOverwrites:function(t){return Ch=t}}};un("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Oo[s]=ke[s]});vn.add(nn.updateRoot);ar=Oo.to({},{duration:0});var c_=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},h_=function(t,e){var n=t._targets,i,r,a;for(i in e)for(r=n.length;r--;)a=t._ptLookup[r][i],a&&(a=a.d)&&(a._pt&&(a=c_(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[r],i))},vh=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,a){a._onInit=function(o){var l,c;if(Ge(r)&&(l={},un(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}h_(o,r)}}}},rn=Oo.registerPlugin({name:"attr",init:function(t,e,n,i,r){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Ke?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},vh("roundProps",Th),vh("modifiers"),vh("snap",Df))||Oo;ke.version=nn.version=rn.version="3.15.1";vf=1;Rh()&&hr();var u_=ue.Power0,d_=ue.Power1,f_=ue.Power2,p_=ue.Power3,m_=ue.Power4,g_=ue.Linear,__=ue.Quad,x_=ue.Cubic,v_=ue.Quart,y_=ue.Quint,M_=ue.Strong,S_=ue.Elastic,b_=ue.Back,w_=ue.SteppedEase,A_=ue.Bounce,T_=ue.Sine,E_=ue.Expo,C_=ue.Circ;var qf,ss,fr,jh,zs,R_,$f,Qh,P_=function(){return typeof window<"u"},Ui={},ks=180/Math.PI,pr=Math.PI/180,dr=Math.atan2,Yf=1e8,tu=/([A-Z])/g,I_=/(left|right|width|margin|padding|x)/i,L_=/[\s,\(]\S/,gi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Yh=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},D_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},N_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},U_=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},O_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},np=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},ip=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},F_=function(t,e,n){return t.style[e]=n},B_=function(t,e,n){return t.style.setProperty(e,n)},k_=function(t,e,n){return t._gsap[e]=n},z_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},V_=function(t,e,n,i,r){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},G_=function(t,e,n,i,r){var a=t._gsap;a[e]=n,a.renderTransform(r,a)},Le="transform",Sn=Le+"Origin",H_=function s(t,e){var n=this,i=this.target,r=i.style,a=i._gsap;if(t in Ui&&r){if(this.tfm=this.tfm||{},t!=="transform")t=gi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ni(i,o)}):this.tfm[t]=a.x?a[t]:Ni(i,t),t===Sn&&(this.tfm.zOrigin=a.zOrigin);else return gi.transform.split(",").forEach(function(o){return s.call(n,o,e)});if(this.props.indexOf(Le)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Sn,e,"")),t=Le}(r||e)&&this.props.push(t,e,r[t])},sp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},W_=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(tu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=Qh(),(!r||!r.isStart)&&!n[Le]&&(sp(n),i.zOrigin&&n[Sn]&&(n[Sn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},rp=function(t,e){var n={target:t,props:[],revert:W_,save:H_};return t._gsap||rn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},ap,Zh=function(t,e){var n=ss.createElementNS?ss.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ss.createElement(t);return n&&n.style?n:ss.createElement(t)},Pn=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(tu,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,mr(e)||e,1)||""},Zf="O,Moz,ms,Ms,Webkit".split(","),mr=function(t,e,n){var i=e||zs,r=i.style,a=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Zf[a]+t in r););return a<0?null:(a===3?"ms":a>=0?Zf[a]:"")+t},Jh=function(){P_()&&window.document&&(qf=window,ss=qf.document,fr=ss.documentElement,zs=Zh("div")||{style:{}},R_=Zh("div"),Le=mr(Le),Sn=Le+"Origin",zs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",ap=!!mr("perspective"),Qh=rn.core.reverting,jh=1)},Jf=function(t){var e=t.ownerSVGElement,n=Zh("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),fr.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),fr.removeChild(n),r},Kf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},op=function(t){var e,n;try{e=t.getBBox()}catch{e=Jf(t),n=1}return e&&(e.width||e.height)||n||(e=Jf(t)),e&&!e.width&&!e.x&&!e.y?{x:+Kf(t,["x","cx","x1"])||0,y:+Kf(t,["y","cy","y1"])||0,width:0,height:0}:e},lp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&op(t))},as=function(t,e){if(e){var n=t.style,i;e in Ui&&e!==Sn&&(e=Le),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(tu,"-$1").toLowerCase())):n.removeAttribute(e)}},rs=function(t,e,n,i,r,a){var o=new dn(t._pt,e,n,0,1,a?ip:np);return t._pt=o,o.b=i,o.e=r,t._props.push(n),o},jf={deg:1,rad:1,turn:1},X_={grid:1,flex:1},os=function s(t,e,n,i){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=zs.style,l=I_.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),f=100,u=i==="px",d=i==="%",m,_,p,g;if(i===a||!r||jf[i]||jf[a])return r;if(a!=="px"&&!u&&(r=s(t,e,n,"px")),g=t.getCTM&&lp(t),(d||a==="%")&&(Ui[e]||~e.indexOf("adius")))return m=g?t.getBBox()[l?"width":"height"]:t[h],Fe(d?r/m*f:r/100*m);if(o[l?"width":"height"]=f+(u?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===ss||!_.appendChild)&&(_=ss.body),p=_._gsap,p&&d&&p.width&&l&&p.time===vn.time&&!p.uncache)return Fe(r/p.width*f);if(d&&(e==="height"||e==="width")){var v=t.style[e];t.style[e]=f+i,m=t[h],v?t.style[e]=v:as(t,e)}else(d||a==="%")&&!X_[Pn(_,"display")]&&(o.position=Pn(t,"position")),_===t&&(o.position="static"),_.appendChild(zs),m=zs[h],_.removeChild(zs),o.position="absolute";return l&&d&&(p=es(_),p.time=vn.time,p.width=_[h]),Fe(u?m*r/f:m&&r?f/m*r:0)},Ni=function(t,e,n,i){var r;return jh||Jh(),e in gi&&e!=="transform"&&(e=gi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ui[e]&&e!=="transform"?(r=xa(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:Wo(Pn(t,Sn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=Ho[e]&&Ho[e](t,e,n)||Pn(t,e)||Oh(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?os(t,e,r,n)+n:r},q_=function(t,e,n,i){if(!n||n==="none"){var r=mr(e,t,1),a=r&&Pn(t,r,1);a&&a!==n?(e=r,n=a):e==="borderColor"&&(n=Pn(t,"borderTopColor"))}var o=new dn(this._pt,t.style,e,0,1,Wh),l=0,c=0,h,f,u,d,m,_,p,g,v,b,y,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Pn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Pn(t,e)||i,_?t.style[e]=_:as(t,e)),h=[n,i],Bh(h),n=h[0],i=h[1],u=n.match(Ns)||[],A=i.match(Ns)||[],A.length){for(;f=Ns.exec(i);)p=f[0],v=i.substring(l,f.index),m?m=(m+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(m=1),p!==(_=u[c++]||"")&&(d=parseFloat(_)||0,y=_.substr((d+"").length),p.charAt(1)==="="&&(p=Us(d,p)+y),g=parseFloat(p),b=p.substr((g+"").length),l=Ns.lastIndex-b.length,b||(b=b||Mn.units[e]||y,l===i.length&&(i+=b,o.e+=b)),y!==b&&(d=os(t,e,_,b)||0),o._pt={_next:o._pt,p:v||c===1?v:",",s:d,c:g-d,m:m&&m<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?ip:np;return Ih.test(i)&&(o.e=0),this._pt=o,o},Qf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},$_=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Qf[n]||n,e[1]=Qf[i]||i,e.join(" ")},Y_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Ui[o]&&(l=1,o=o==="transformOrigin"?Sn:Le),as(n,o);l&&(as(n,Le),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",xa(n,1),a.uncache=1,sp(i)))}},Ho={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var a=t._pt=new dn(t._pt,e,n,0,0,Y_);return a.u=i,a.pr=-10,a.tween=r,t._props.push(n),1}}},_a=[1,0,0,1,0,0],cp={},hp=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},tp=function(t){var e=Pn(t,Le);return hp(e)?_a:e.substr(7).match(Ph).map(Fe)},eu=function(t,e){var n=t._gsap||es(t),i=t.style,r=tp(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?_a:r):(r===_a&&!t.offsetParent&&t!==fr&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,fr.appendChild(t)),r=tp(t),l?i.display=l:as(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):fr.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Kh=function(t,e,n,i,r,a){var o=t._gsap,l=r||eu(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,f=o.xOffset||0,u=o.yOffset||0,d=l[0],m=l[1],_=l[2],p=l[3],g=l[4],v=l[5],b=e.split(" "),y=parseFloat(b[0])||0,A=parseFloat(b[1])||0,T,x,S,I;n?l!==_a&&(x=d*p-m*_)&&(S=y*(p/x)+A*(-_/x)+(_*v-p*g)/x,I=y*(-m/x)+A*(d/x)-(d*v-m*g)/x,y=S,A=I):(T=op(t),y=T.x+(~b[0].indexOf("%")?y/100*T.width:y),A=T.y+(~(b[1]||b[0]).indexOf("%")?A/100*T.height:A)),i||i!==!1&&o.smooth?(g=y-c,v=A-h,o.xOffset=f+(g*d+v*_)-g,o.yOffset=u+(g*m+v*p)-v):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=A,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[Sn]="0px 0px",a&&(rs(a,o,"xOrigin",c,y),rs(a,o,"yOrigin",h,A),rs(a,o,"xOffset",f,o.xOffset),rs(a,o,"yOffset",u,o.yOffset)),t.setAttribute("data-svg-origin",y+" "+A)},xa=function(t,e){var n=t._gsap||new kh(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=Pn(t,Sn)||"0",h,f,u,d,m,_,p,g,v,b,y,A,T,x,S,I,R,D,G,F,C,k,H,O,J,q,it,K,mt,Ut,tt,z;return h=f=u=_=p=g=v=b=y=0,d=m=1,n.svg=!!(t.getCTM&&lp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Le]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Le]!=="none"?l[Le]:"")),i.scale=i.rotate=i.translate="none"),x=eu(t,n.svg),n.svg&&(n.uncache?(J=t.getBBox(),c=n.xOrigin-J.x+"px "+(n.yOrigin-J.y)+"px",O=""):O=!e&&t.getAttribute("data-svg-origin"),Kh(t,O||c,!!O||n.originIsAbsolute,n.smooth!==!1,x)),A=n.xOrigin||0,T=n.yOrigin||0,x!==_a&&(D=x[0],G=x[1],F=x[2],C=x[3],h=k=x[4],f=H=x[5],x.length===6?(d=Math.sqrt(D*D+G*G),m=Math.sqrt(C*C+F*F),_=D||G?dr(G,D)*ks:0,v=F||C?dr(F,C)*ks+_:0,v&&(m*=Math.abs(Math.cos(v*pr))),n.svg&&(h-=A-(A*D+T*F),f-=T-(A*G+T*C))):(z=x[6],Ut=x[7],it=x[8],K=x[9],mt=x[10],tt=x[11],h=x[12],f=x[13],u=x[14],S=dr(z,mt),p=S*ks,S&&(I=Math.cos(-S),R=Math.sin(-S),O=k*I+it*R,J=H*I+K*R,q=z*I+mt*R,it=k*-R+it*I,K=H*-R+K*I,mt=z*-R+mt*I,tt=Ut*-R+tt*I,k=O,H=J,z=q),S=dr(-F,mt),g=S*ks,S&&(I=Math.cos(-S),R=Math.sin(-S),O=D*I-it*R,J=G*I-K*R,q=F*I-mt*R,tt=C*R+tt*I,D=O,G=J,F=q),S=dr(G,D),_=S*ks,S&&(I=Math.cos(S),R=Math.sin(S),O=D*I+G*R,J=k*I+H*R,G=G*I-D*R,H=H*I-k*R,D=O,k=J),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,g=180-g),d=Fe(Math.sqrt(D*D+G*G+F*F)),m=Fe(Math.sqrt(H*H+z*z)),S=dr(k,H),v=Math.abs(S)>2e-4?S*ks:0,y=tt?1/(tt<0?-tt:tt):0),n.svg&&(O=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!hp(Pn(t,Le)),O&&t.setAttribute("transform",O))),Math.abs(v)>90&&Math.abs(v)<270&&(r?(d*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,v+=v<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=Fe(d),n.scaleY=Fe(m),n.rotation=Fe(_)+o,n.rotationX=Fe(p)+o,n.rotationY=Fe(g)+o,n.skewX=v+o,n.skewY=b+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Sn]=Wo(c)),n.xOffset=n.yOffset=0,n.force3D=Mn.force3D,n.renderTransform=n.svg?J_:ap?up:Z_,n.uncache=0,n},Wo=function(t){return(t=t.split(" "))[0]+" "+t[1]},$h=function(t,e,n){var i=je(e);return Fe(parseFloat(e)+parseFloat(os(t,"x",n+"px",i)))+i},Z_=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,up(t,e)},Fs="0deg",ga="0px",Bs=") ",up=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,f=n.rotationX,u=n.skewX,d=n.skewY,m=n.scaleX,_=n.scaleY,p=n.transformPerspective,g=n.force3D,v=n.target,b=n.zOrigin,y="",A=g==="auto"&&t&&t!==1||g===!0;if(b&&(f!==Fs||h!==Fs)){var T=parseFloat(h)*pr,x=Math.sin(T),S=Math.cos(T),I;T=parseFloat(f)*pr,I=Math.cos(T),a=$h(v,a,x*I*-b),o=$h(v,o,-Math.sin(T)*-b),l=$h(v,l,S*I*-b+b)}p!==ga&&(y+="perspective("+p+Bs),(i||r)&&(y+="translate("+i+"%, "+r+"%) "),(A||a!==ga||o!==ga||l!==ga)&&(y+=l!==ga||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Bs),c!==Fs&&(y+="rotate("+c+Bs),h!==Fs&&(y+="rotateY("+h+Bs),f!==Fs&&(y+="rotateX("+f+Bs),(u!==Fs||d!==Fs)&&(y+="skew("+u+", "+d+Bs),(m!==1||_!==1)&&(y+="scale("+m+", "+_+Bs),v.style[Le]=y||"translate(0, 0)"},J_=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,f=n.scaleX,u=n.scaleY,d=n.target,m=n.xOrigin,_=n.yOrigin,p=n.xOffset,g=n.yOffset,v=n.forceCSS,b=parseFloat(a),y=parseFloat(o),A,T,x,S,I;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=pr,c*=pr,A=Math.cos(l)*f,T=Math.sin(l)*f,x=Math.sin(l-c)*-u,S=Math.cos(l-c)*u,c&&(h*=pr,I=Math.tan(c-h),I=Math.sqrt(1+I*I),x*=I,S*=I,h&&(I=Math.tan(h),I=Math.sqrt(1+I*I),A*=I,T*=I)),A=Fe(A),T=Fe(T),x=Fe(x),S=Fe(S)):(A=f,S=u,T=x=0),(b&&!~(a+"").indexOf("px")||y&&!~(o+"").indexOf("px"))&&(b=os(d,"x",a,"px"),y=os(d,"y",o,"px")),(m||_||p||g)&&(b=Fe(b+m-(m*A+_*x)+p),y=Fe(y+_-(m*T+_*S)+g)),(i||r)&&(I=d.getBBox(),b=Fe(b+i/100*I.width),y=Fe(y+r/100*I.height)),I="matrix("+A+","+T+","+x+","+S+","+b+","+y+")",d.setAttribute("transform",I),v&&(d.style[Le]=I)},K_=function(t,e,n,i,r){var a=360,o=Ge(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?ks:1),c=l-i,h=i+c+"deg",f,u;return o&&(f=r.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*Yf)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*Yf)%a-~~(c/a)*a)),t._pt=u=new dn(t._pt,e,n,i,c,D_),u.e=h,u.u="deg",t._props.push(n),u},ep=function(t,e){for(var n in e)t[n]=e[n];return t},j_=function(t,e,n){var i=ep({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,f,u,d,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Le]=e,o=xa(n,1),as(n,Le),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Le],a[Le]=e,o=xa(n,1),a[Le]=c);for(l in Ui)c=i[l],h=o[l],c!==h&&r.indexOf(l)<0&&(d=je(c),m=je(h),f=d!==m?os(n,l,c,m):parseFloat(c),u=parseFloat(h),t._pt=new dn(t._pt,o,l,f,u-f,Yh),t._pt.u=m||0,t._props.push(l));ep(o,i)};un("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",a=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(o){return t<2?s+o:"border"+o+s});Ho[t>1?"border"+s:s]=function(o,l,c,h,f){var u,d;if(arguments.length<4)return u=a.map(function(m){return Ni(o,m,c)}),d=u.join(" "),d.split(u[0]).length===5?u[0]:d;u=(h+"").split(" "),d={},a.forEach(function(m,_){return d[m]=u[_]=u[_]||u[(_-1)/2|0]}),o.init(l,d,f)}});var nu={name:"css",register:Jh,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var a=this._props,o=t.style,l=n.vars.startAt,c,h,f,u,d,m,_,p,g,v,b,y,A,T,x,S,I;jh||Jh(),this.styles=this.styles||rp(t),S=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(xn[_]&&Vh(_,e,n,i,t,r)))){if(d=typeof h,m=Ho[_],d==="function"&&(h=h.call(n,i,t,r),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=ur(h)),m)m(this,t,_,h,n)&&(x=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",Li.lastIndex=0,Li.test(c)||(p=je(c),g=je(h),g?p!==g&&(c=os(t,_,c,g)+g):p&&(h+=p)),this.add(o,"setProperty",c,h,i,r,0,0,_),a.push(_),S.push(_,0,o[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],Ge(c)&&~c.indexOf("random(")&&(c=ur(c)),je(c+"")||c==="auto"||(c+=Mn.units[_]||je(Ni(t,_))||""),(c+"").charAt(1)==="="&&(c=Ni(t,_))):c=Ni(t,_),u=parseFloat(c),v=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),f=parseFloat(h),_ in gi&&(_==="autoAlpha"&&(u===1&&Ni(t,"visibility")==="hidden"&&f&&(u=0),S.push("visibility",0,o.visibility),rs(this,o,"visibility",u?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=gi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),b=_ in Ui,b){if(this.styles.save(_),I=h,d==="string"&&h.substring(0,6)==="var(--"){if(h=Pn(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var R=t.style.perspective;t.style.perspective=h,h=Pn(t,"perspective"),R?t.style.perspective=R:as(t,"perspective")}f=parseFloat(h)}if(y||(A=t._gsap,A.renderTransform&&!e.parseTransform||xa(t,e.parseTransform),T=e.smoothOrigin!==!1&&A.smooth,y=this._pt=new dn(this._pt,o,Le,0,1,A.renderTransform,A,0,-1),y.dep=1),_==="scale")this._pt=new dn(this._pt,A,"scaleY",A.scaleY,(v?Us(A.scaleY,v+f):f)-A.scaleY||0,Yh),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){S.push(Sn,0,o[Sn]),h=$_(h),A.svg?Kh(t,h,0,T,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==A.zOrigin&&rs(this,A,"zOrigin",A.zOrigin,g),rs(this,o,_,Wo(c),Wo(h)));continue}else if(_==="svgOrigin"){Kh(t,h,1,T,0,this);continue}else if(_ in cp){K_(this,A,_,u,v?Us(u,v+h):h);continue}else if(_==="smoothOrigin"){rs(this,A,"smooth",A.smooth,h);continue}else if(_==="force3D"){A[_]=h;continue}else if(_==="transform"){j_(this,h,t);continue}}else _ in o||(_=mr(_)||_);if(b||(f||f===0)&&(u||u===0)&&!L_.test(h)&&_ in o)p=(c+"").substr((u+"").length),f||(f=0),g=je(h)||(_ in Mn.units?Mn.units[_]:p),p!==g&&(u=os(t,_,c,g)),this._pt=new dn(this._pt,b?A:o,_,u,(v?Us(u,v+f):f)-u,!b&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?O_:Yh),this._pt.u=g||0,b&&I!==h?(this._pt.b=c,this._pt.e=I,this._pt.r=U_):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=N_);else if(_ in o)q_.call(this,t,_,c,v?v+h:h);else if(_ in t)this.add(t,_,c||t[_],v?v+h:h,i,r);else if(_!=="parseTransform"){Bo(_,h);continue}b||(_ in o?S.push(_,0,o[_]):typeof t[_]=="function"?S.push(_,2,t[_]()):S.push(_,1,c||t[_])),a.push(_)}}x&&qh(this)},render:function(t,e){if(e.tween._time||!Qh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ni,aliases:gi,getSetter:function(t,e,n){var i=gi[e];return i&&i.indexOf(",")<0&&(e=i),e in Ui&&e!==Sn&&(t._gsap.x||Ni(t,"x"))?n&&$f===n?e==="scale"?z_:k_:($f=n||{})&&(e==="scale"?V_:G_):t.style&&!Fo(t.style[e])?F_:~e.indexOf("-")?B_:Go(t,e)},core:{_removeProperty:as,_getMatrix:eu}};rn.utils.checkPrefix=mr;rn.core.getStyleSaver=rp;(function(s,t,e,n){var i=un(s+","+t+","+e,function(r){Ui[r]=1});un(t,function(r){Mn.units[r]="deg",cp[r]=1}),gi[i[13]]=s+","+t,un(n,function(r){var a=r.split(":");gi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");un("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Mn.units[s]="px"});rn.registerPlugin(nu);var Gn=rn.registerPlugin(nu)||rn,j1=Gn.core.Tween;var Q_=`
struct U { a: vec4f, colA: vec4f, colB: vec4f, glow: vec4f };
@group(0) @binding(0) var<uniform> u: U;

@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  var p = array(vec2f(-1.0, -3.0), vec2f(-1.0, 1.0), vec2f(3.0, 1.0));
  return vec4f(p[i], 0.0, 1.0);
}
fn hash(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn noise(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p); let w = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2f(1.0, 0.0)), w.x), mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), w.x), w.y);
}
fn fbm(q: vec2f) -> f32 {
  var p = q; var s = 0.0; var a = 0.5;
  for (var k = 0; k < 5; k++) { s += a * noise(p); p = mat2x2f(1.6, 1.2, -1.2, 1.6) * p; a *= 0.5; }
  return s;
}
@fragment fn fs(@builtin(position) fc: vec4f) -> @location(0) vec4f {
  let t = u.a.x; let res = u.a.zw;
  let uv = vec2f(fc.x / res.x, 1.0 - fc.y / res.y);
  var p = (uv - 0.5) * vec2f(res.x / res.y, 1.0);
  let q = vec2f(fbm(p * 1.4 + vec2f(t * 0.020, -t * 0.015)), fbm(p * 1.4 + vec2f(5.2, 1.3) - t * 0.018));
  let g = fbm(p * 1.8 + q * 1.7 + vec2f(0.0, t * 0.03));
  let band = smoothstep(0.42, 0.95, g);
  var col = vec3f(0.027, 0.035, 0.051);
  col += u.colA.rgb * band * 0.30 * (0.55 + 0.45 * q.x);
  col += u.colB.rgb * smoothstep(0.35, 0.9, q.y) * 0.16;
  let gp = (u.glow.xy - 0.5) * vec2f(res.x / res.y, 1.0);
  let d = length(p - gp);
  col += mix(u.colA.rgb, u.colB.rgb, 0.5) * exp(-d * d / (u.glow.z * u.glow.z)) * u.glow.w;
  col *= u.a.y;
  let v = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2f(1.1, 1.0)));
  col *= mix(0.45, 1.0, v);
  col += (hash(fc.xy + fract(t) * 91.0) - 0.5) * 0.022;
  return vec4f(max(col, vec3f(0.0)), 1.0);
}`,tx=`#version 300 es
void main(){ vec2 p = vec2(gl_VertexID == 2 ? 3.0 : -1.0, gl_VertexID == 0 ? -3.0 : 1.0); gl_Position = vec4(p, 0.0, 1.0); }`,ex=`#version 300 es
precision highp float;
uniform vec4 uA, uColA, uColB, uGlow;
out vec4 o;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p), w = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), w.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), w.x), w.y); }
float fbm(vec2 p){ float s = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int k = 0; k < 5; k++){ s += a*noise(p); p = m*p; a *= 0.5; } return s; }
void main(){
  float t = uA.x; vec2 res = uA.zw;
  vec2 uv = gl_FragCoord.xy / res;
  vec2 p = (uv - 0.5) * vec2(res.x/res.y, 1.0);
  vec2 q = vec2(fbm(p*1.4 + vec2(t*0.020, -t*0.015)), fbm(p*1.4 + vec2(5.2, 1.3) - t*0.018));
  float g = fbm(p*1.8 + q*1.7 + vec2(0.0, t*0.03));
  float band = smoothstep(0.42, 0.95, g);
  vec3 col = vec3(0.027, 0.035, 0.051);
  col += uColA.rgb * band * 0.30 * (0.55 + 0.45*q.x);
  col += uColB.rgb * smoothstep(0.35, 0.9, q.y) * 0.16;
  vec2 gp = (uGlow.xy - 0.5) * vec2(res.x/res.y, 1.0);
  float d = length(p - gp);
  col += mix(uColA.rgb, uColB.rgb, 0.5) * exp(-d*d/(uGlow.z*uGlow.z)) * uGlow.w;
  col *= uA.y;
  float v = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.1, 1.0)));
  col *= mix(0.45, 1.0, v);
  col += (hash(gl_FragCoord.xy + fract(t)*91.0) - 0.5) * 0.022;
  o = vec4(max(col, vec3(0.0)), 1.0);
}`;async function nx(s){if(!navigator.gpu)return null;let t=await navigator.gpu.requestAdapter({powerPreference:"low-power"});if(!t)return null;let e=await t.requestDevice();e.addEventListener("uncapturederror",h=>console.warn("WebGPU \uC624\uB958:",h.error.message));let n=s.getContext("webgpu");if(!n)return null;let i=navigator.gpu.getPreferredCanvasFormat();n.configure({device:e,format:i,alphaMode:"opaque"});let r=e.createShaderModule({code:Q_}),a=e.createRenderPipeline({layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),o=e.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),l=e.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}}]}),c=new Float32Array(16);return{kind:"WebGPU",lost:e.lost,draw(h){c.set(h),e.queue.writeBuffer(o,0,c);let f=e.createCommandEncoder(),u=f.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});u.setPipeline(a),u.setBindGroup(0,l),u.draw(3),u.end(),e.queue.submit([f.finish()])}}}function dp(s){let t=s.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return null;let e=(r,a)=>{let o=t.createShader(r);return t.shaderSource(o,a),t.compileShader(o),o},n=t.createProgram();if(t.attachShader(n,e(t.VERTEX_SHADER,tx)),t.attachShader(n,e(t.FRAGMENT_SHADER,ex)),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))return null;t.useProgram(n),t.bindVertexArray(t.createVertexArray());let i=["uA","uColA","uColB","uGlow"].map(r=>t.getUniformLocation(n,r));return{kind:"WebGL2",draw(r){t.viewport(0,0,s.width,s.height),i.forEach((a,o)=>t.uniform4f(a,r[o*4],r[o*4+1],r[o*4+2],r[o*4+3])),t.drawArrays(t.TRIANGLES,0,3)}}}async function fp(s,{gpu:t=!0}={}){let e=null;if(t)try{e=await nx(s)}catch(i){console.warn("WebGPU \uC2E4\uD328, WebGL2\uB85C",i),e=null}if(!e){let i=s.cloneNode();s.replaceWith(i),s=i,e=dp(s)}let n=e?{...e,canvas:s}:{kind:"CSS",canvas:s,draw(){}};return e?.lost&&e.lost.then(()=>{let i=n.canvas.cloneNode();n.canvas.replaceWith(i);let r=dp(i);Object.assign(n,r?{...r,canvas:i}:{kind:"CSS",canvas:i,draw(){}})}),n}var Zp=0,Vu=1,Jp=2;var Js=1,Kp=2,Xr=3,ys=0,gn=1,Si=2,Ks=0,qr=1,eo=2,Gu=3,Hu=4,jp=5;var js=100,Qp=101,tm=102,em=103,nm=104,im=200,sm=201,rm=202,am=203,Wu=204,Xu=205,om=206,lm=207,cm=208,hm=209,um=210,dm=211,fm=212,pm=213,mm=214,vl=0,yl=1,Ml=2,Pr=3,Sl=4,bl=5,wl=6,Al=7,qu=0,gm=1,_m=2,bi=0,$u=1,Yu=2,Zu=3,Ju=4,Ku=5,ju=6,no=7;var Qu=300,Qs=301,$r=302,lc=303,cc=304,Tl=1e3,xi=1001,El=1002,Ye=1003,xm=1004;var io=1005;var mn=1006,hc=1007;var qi=1008;var An=1009,td=1010,ed=1011,Yr=1012,uc=1013,ei=1014,ni=1015,ii=1016,dc=1017,fc=1018,tr=1020,nd=35902,id=35899,sd=1021,rd=1022,si=1023,Hi=1026,$i=1027,ad=1028,pc=1029,Ms=1030,mc=1031;var gc=1033,so=33776,ro=33777,ao=33778,oo=33779,_c=35840,xc=35841,vc=35842,yc=35843,Mc=36196,Sc=37492,bc=37496,wc=37488,Ac=37489,lo=37490,Tc=37491,Ec=37808,Cc=37809,Rc=37810,Pc=37811,Ic=37812,Lc=37813,Dc=37814,Nc=37815,Uc=37816,Oc=37817,Fc=37818,Bc=37819,kc=37820,zc=37821,Vc=36492,Gc=36494,Hc=36495,Wc=36283,Xc=36284,co=36285,qc=36286;var Ca=2300,Cl=2301,_l=2302,Ru=2303,Pu=2400,Iu=2401,Lu=2402;var vm=3200;var $c=0,ym=1,Yi="",fn="srgb",Ra="srgb-linear",Pa="linear",me="srgb";var xl=7680;var Mm=519,Sm=512,bm=513,wm=514,od=515,Am=516,Tm=517,ld=518,cd=519,Em=35044;var hd="300 es",Wn=2e3,Ir=2001;function ix(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function sx(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ia(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Cm(){let s=Ia("canvas");return s.style.display="block",s}var pp={},Lr=null;function ud(...s){let t="THREE."+s.shift();Lr?Lr("log",t,...s):console.log(t,...s)}function Rm(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Jt(...s){s=Rm(s);let t="THREE."+s.shift();if(Lr)Lr("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function jt(...s){s=Rm(s);let t="THREE."+s.shift();if(Lr)Lr("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Aa(...s){let t=s.join(" ");t in pp||(pp[t]=!0,Jt(...s))}function Pm(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Im={[vl]:vl,[Ml]:wl,[Sl]:Sl,[Pr]:bl,[yl]:yl,[wl]:Ml,[Al]:Al,[bl]:Pr},yi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var iu=Math.PI/180,Rl=180/Math.PI;function Zr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[s&255]+an[s>>8&255]+an[s>>16&255]+an[s>>24&255]+"-"+an[t&255]+an[t>>8&255]+"-"+an[t>>16&15|64]+an[t>>24&255]+"-"+an[e&63|128]+an[e>>8&255]+"-"+an[e>>16&255]+an[e>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function oe(s,t,e){return Math.max(t,Math.min(e,s))}function rx(s,t){return(s%t+t)%t}function su(s,t,e){return(1-e)*s+e*t}function Lm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function dd(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ax(s,t){if(t.constructor===Float32Array)return s;let e=dd(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function ox(s,t){if(t.constructor===Float32Array)return s;let e=dd(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var xd=class xd{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};xd.prototype.isVector2=!0;var It=xd,Mi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3],u=r[a+0],d=r[a+1],m=r[a+2],_=r[a+3];if(f!==_||l!==u||c!==d||h!==m){let p=l*u+c*d+h*m+f*_;p<0&&(u=-u,d=-d,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){let v=Math.acos(p),b=Math.sin(v);g=Math.sin(g*v)/b,o=Math.sin(o*v)/b,l=l*g+u*o,c=c*g+d*o,h=h*g+m*o,f=f*g+_*o}else{l=l*g+u*o,c=c*g+d*o,h=h*g+m*o,f=f*g+_*o;let v=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=v,c*=v,h*=v,f*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[a],u=r[a+1],d=r[a+2],m=r[a+3];return t[e]=o*m+h*f+l*d-c*u,t[e+1]=l*m+h*u+c*f-o*d,t[e+2]=c*m+h*d+o*u-l*f,t[e+3]=h*m-o*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(r/2),u=l(n/2),d=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*m,this._y=c*d*f-u*h*m,this._z=c*h*m+u*d*f,this._w=c*h*f-u*d*m;break;case"YXZ":this._x=u*h*f+c*d*m,this._y=c*d*f-u*h*m,this._z=c*h*m-u*d*f,this._w=c*h*f+u*d*m;break;case"ZXY":this._x=u*h*f-c*d*m,this._y=c*d*f+u*h*m,this._z=c*h*m+u*d*f,this._w=c*h*f-u*d*m;break;case"ZYX":this._x=u*h*f-c*d*m,this._y=c*d*f+u*h*m,this._z=c*h*m-u*d*f,this._w=c*h*f+u*d*m;break;case"YZX":this._x=u*h*f+c*d*m,this._y=c*d*f+u*h*m,this._z=c*h*m-u*d*f,this._w=c*h*f-u*d*m;break;case"XZY":this._x=u*h*f-c*d*m,this._y=c*d*f-u*h*m,this._z=c*h*m+u*d*f,this._w=c*h*f+u*d*m;break;default:Jt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(oe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},vd=class vd{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(mp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(mp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=i+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ru.copy(this).projectOnVector(t),this.sub(ru)}reflect(t){return this.sub(ru.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};vd.prototype.isVector3=!0;var W=vd,ru=new W,mp=new Mi,yd=class yd{constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],m=n[8],_=i[0],p=i[3],g=i[6],v=i[1],b=i[4],y=i[7],A=i[2],T=i[5],x=i[8];return r[0]=a*_+o*v+l*A,r[3]=a*p+o*b+l*T,r[6]=a*g+o*y+l*x,r[1]=c*_+h*v+f*A,r[4]=c*p+h*b+f*T,r[7]=c*g+h*y+f*x,r[2]=u*_+d*v+m*A,r[5]=u*p+d*b+m*T,r[8]=u*g+d*y+m*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,m=e*f+n*u+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=f*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Aa("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(au.makeScale(t,e)),this}rotate(t){return Aa("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(au.makeRotation(-t)),this}translate(t,e){return Aa("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(au.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};yd.prototype.isMatrix3=!0;var te=yd,au=new te,gp=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_p=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lx(){let s={enabled:!0,workingColorSpace:Ra,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===me&&(i.r=Gi(i.r),i.g=Gi(i.g),i.b=Gi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===me&&(i.r=Rr(i.r),i.g=Rr(i.g),i.b=Rr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Yi?Pa:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ra]:{primaries:t,whitePoint:n,transfer:Pa,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:fn},outputColorSpaceConfig:{drawingBufferColorSpace:fn}},[fn]:{primaries:t,whitePoint:n,transfer:me,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:fn}}}),s}var he=lx();function Gi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Rr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var gr,Pl=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{gr===void 0&&(gr=Ia("canvas")),gr.width=t.width,gr.height=t.height;let i=gr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=gr}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ia("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Gi(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Gi(e[n]/255)*255):e[n]=Gi(e[n]);return{data:e,width:t.width,height:t.height}}else return Jt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},cx=0,Dr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:cx++}),this.uuid=Zr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(ou(i[a].image)):r.push(ou(i[a]))}else r=ou(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function ou(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Pl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Jt("Texture: Unable to serialize Texture."),{})}var hx=0,lu=new W,bn=class s extends yi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=xi,i=xi,r=mn,a=qi,o=si,l=An,c=s.DEFAULT_ANISOTROPY,h=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hx++}),this.uuid=Zr(),this.name="",this.source=new Dr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(lu).x}get height(){return this.source.getSize(lu).y}get depth(){return this.source.getSize(lu).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Jt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Jt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Qu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Tl:t.x=t.x-Math.floor(t.x);break;case xi:t.x=t.x<0?0:1;break;case El:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Tl:t.y=t.y-Math.floor(t.y);break;case xi:t.y=t.y<0?0:1;break;case El:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};bn.DEFAULT_IMAGE=null;bn.DEFAULT_MAPPING=Qu;bn.DEFAULT_ANISOTROPY=1;var Md=class Md{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,y=(d+1)/2,A=(g+1)/2,T=(h+u)/4,x=(f+_)/4,S=(m+p)/4;return b>y&&b>A?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=T/n,r=x/n):y>A?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=T/i,r=S/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=x/r,i=S/r),this.set(n,i,r,e),this}let v=Math.sqrt((p-m)*(p-m)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(f-_)/v,this.z=(u-h)/v,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this.w=oe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this.w=oe(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Md.prototype.isVector4=!0;var Ce=Md,Il=class extends yi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new bn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Dr(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dn=class extends Il{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},La=class extends bn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ll=class extends bn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var oc=class oc{constructor(t,e,n,i,r,a,o,l,c,h,f,u,d,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,f,u,d,m,_,p)}set(t,e,n,i,r,a,o,l,c,h,f,u,d,m,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=f,g[14]=u,g[3]=d,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oc().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/_r.setFromMatrixColumn(t,0).length(),r=1/_r.setFromMatrixColumn(t,1).length(),a=1/_r.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=a*h,d=a*f,m=o*h,_=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+m*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=m+d*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,m=c*h,_=c*f;e[0]=u+_*o,e[4]=m*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-m,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,m=c*h,_=c*f;e[0]=u-_*o,e[4]=-a*f,e[8]=m+d*o,e[1]=d+m*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,d=a*f,m=o*h,_=o*f;e[0]=l*h,e[4]=m*c-d,e[8]=u*c+_,e[1]=l*f,e[5]=_*c+u,e[9]=d*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,d=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-u*f,e[8]=m*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*f+m,e[10]=u-_*f}else if(t.order==="XZY"){let u=a*l,d=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+_,e[5]=a*h,e[9]=d*f-m,e[2]=m*f-d,e[6]=o*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ux,t,dx)}lookAt(t,e,n){let i=this.elements;return In.subVectors(t,e),In.lengthSq()===0&&(In.z=1),In.normalize(),ls.crossVectors(n,In),ls.lengthSq()===0&&(Math.abs(n.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),ls.crossVectors(n,In)),ls.normalize(),Xo.crossVectors(In,ls),i[0]=ls.x,i[4]=Xo.x,i[8]=In.x,i[1]=ls.y,i[5]=Xo.y,i[9]=In.y,i[2]=ls.z,i[6]=Xo.z,i[10]=In.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],m=n[2],_=n[6],p=n[10],g=n[14],v=n[3],b=n[7],y=n[11],A=n[15],T=i[0],x=i[4],S=i[8],I=i[12],R=i[1],D=i[5],G=i[9],F=i[13],C=i[2],k=i[6],H=i[10],O=i[14],J=i[3],q=i[7],it=i[11],K=i[15];return r[0]=a*T+o*R+l*C+c*J,r[4]=a*x+o*D+l*k+c*q,r[8]=a*S+o*G+l*H+c*it,r[12]=a*I+o*F+l*O+c*K,r[1]=h*T+f*R+u*C+d*J,r[5]=h*x+f*D+u*k+d*q,r[9]=h*S+f*G+u*H+d*it,r[13]=h*I+f*F+u*O+d*K,r[2]=m*T+_*R+p*C+g*J,r[6]=m*x+_*D+p*k+g*q,r[10]=m*S+_*G+p*H+g*it,r[14]=m*I+_*F+p*O+g*K,r[3]=v*T+b*R+y*C+A*J,r[7]=v*x+b*D+y*k+A*q,r[11]=v*S+b*G+y*H+A*it,r[15]=v*I+b*F+y*O+A*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],m=t[3],_=t[7],p=t[11],g=t[15],v=l*d-c*u,b=o*d-c*f,y=o*u-l*f,A=a*d-c*h,T=a*u-l*h,x=a*f-o*h;return e*(_*v-p*b+g*y)-n*(m*v-p*A+g*T)+i*(m*b-_*A+g*x)-r*(m*y-_*T+p*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],m=t[12],_=t[13],p=t[14],g=t[15],v=e*o-n*a,b=e*l-i*a,y=e*c-r*a,A=n*l-i*o,T=n*c-r*o,x=i*c-r*l,S=h*_-f*m,I=h*p-u*m,R=h*g-d*m,D=f*p-u*_,G=f*g-d*_,F=u*g-d*p,C=v*F-b*G+y*D+A*R-T*I+x*S;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/C;return t[0]=(o*F-l*G+c*D)*k,t[1]=(i*G-n*F-r*D)*k,t[2]=(_*x-p*T+g*A)*k,t[3]=(u*T-f*x-d*A)*k,t[4]=(l*R-a*F-c*I)*k,t[5]=(e*F-i*R+r*I)*k,t[6]=(p*y-m*x-g*b)*k,t[7]=(h*x-u*y+d*b)*k,t[8]=(a*G-o*R+c*S)*k,t[9]=(n*R-e*G-r*S)*k,t[10]=(m*T-_*y+g*v)*k,t[11]=(f*y-h*T-d*v)*k,t[12]=(o*I-a*D-l*S)*k,t[13]=(e*D-n*I+i*S)*k,t[14]=(_*b-m*A-p*v)*k,t[15]=(h*A-f*b+u*v)*k,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,m=r*f,_=a*h,p=a*f,g=o*f,v=l*c,b=l*h,y=l*f,A=n.x,T=n.y,x=n.z;return i[0]=(1-(_+g))*A,i[1]=(d+y)*A,i[2]=(m-b)*A,i[3]=0,i[4]=(d-y)*T,i[5]=(1-(u+g))*T,i[6]=(p+v)*T,i[7]=0,i[8]=(m+b)*x,i[9]=(p-v)*x,i[10]=(1-(u+_))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=_r.set(i[0],i[1],i[2]).length(),o=_r.set(i[4],i[5],i[6]).length(),l=_r.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Jn.copy(this);let c=1/a,h=1/o,f=1/l;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=h,Jn.elements[5]*=h,Jn.elements[6]*=h,Jn.elements[8]*=f,Jn.elements[9]*=f,Jn.elements[10]*=f,e.setFromRotationMatrix(Jn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Wn,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===Wn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ir)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Wn,l=!1){let c=this.elements,h=2/(e-t),f=2/(n-i),u=-(e+t)/(e-t),d=-(n+i)/(n-i),m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===Wn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ir)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};oc.prototype.isMatrix4=!0;var Se=oc,_r=new W,Jn=new Se,ux=new W(0,0,0),dx=new W(1,1,1),ls=new W,Xo=new W,In=new W,xp=new Se,vp=new Mi,Wi=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(oe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-oe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Jt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vp.setFromEuler(this),this.setFromQuaternion(vp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wi.DEFAULT_ORDER="XYZ";var Da=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},fx=0,yp=new W,xr=new Mi,Oi=new Se,qo=new W,va=new W,px=new W,mx=new Mi,Mp=new W(1,0,0),Sp=new W(0,1,0),bp=new W(0,0,1),wp={type:"added"},gx={type:"removed"},vr={type:"childadded",child:null},cu={type:"childremoved",child:null},Ze=class s extends yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fx++}),this.uuid=Zr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new W,e=new Wi,n=new Mi,i=new W(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Se},normalMatrix:{value:new te}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Da,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return xr.setFromAxisAngle(t,e),this.quaternion.multiply(xr),this}rotateOnWorldAxis(t,e){return xr.setFromAxisAngle(t,e),this.quaternion.premultiply(xr),this}rotateX(t){return this.rotateOnAxis(Mp,t)}rotateY(t){return this.rotateOnAxis(Sp,t)}rotateZ(t){return this.rotateOnAxis(bp,t)}translateOnAxis(t,e){return yp.copy(t).applyQuaternion(this.quaternion),this.position.add(yp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mp,t)}translateY(t){return this.translateOnAxis(Sp,t)}translateZ(t){return this.translateOnAxis(bp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?qo.copy(t):qo.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),va.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(va,qo,this.up):Oi.lookAt(qo,va,this.up),this.quaternion.setFromRotationMatrix(Oi),i&&(Oi.extractRotation(i.matrixWorld),xr.setFromRotationMatrix(Oi),this.quaternion.premultiply(xr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wp),vr.child=t,this.dispatchEvent(vr),vr.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gx),cu.child=t,this.dispatchEvent(cu),cu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Oi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Oi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wp),vr.child=t,this.dispatchEvent(vr),vr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(va,t,px),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(va,mx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ze.DEFAULT_UP=new W(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vi=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},_x={type:"move"},Nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,m=.005;c.inputState.pinching&&u>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_x)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Vi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Dm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cs={h:0,s:0,l:0},$o={h:0,s:0,l:0};function hu(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var ne=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=fn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=he.workingColorSpace){return this.r=t,this.g=e,this.b=n,he.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=he.workingColorSpace){if(t=rx(t,1),e=oe(e,0,1),n=oe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=hu(a,r,t+1/3),this.g=hu(a,r,t),this.b=hu(a,r,t-1/3)}return he.colorSpaceToWorking(this,i),this}setStyle(t,e=fn){function n(r){r!==void 0&&parseFloat(r)<1&&Jt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Jt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Jt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=fn){let n=Dm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Jt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}copyLinearToSRGB(t){return this.r=Rr(t.r),this.g=Rr(t.g),this.b=Rr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fn){return he.workingToColorSpace(on.copy(this),t),Math.round(oe(on.r*255,0,255))*65536+Math.round(oe(on.g*255,0,255))*256+Math.round(oe(on.b*255,0,255))}getHexString(t=fn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.workingToColorSpace(on.copy(this),e);let n=on.r,i=on.g,r=on.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=he.workingColorSpace){return he.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=fn){he.workingToColorSpace(on.copy(this),t);let e=on.r,n=on.g,i=on.b;return t!==fn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(cs),this.setHSL(cs.h+t,cs.s+e,cs.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(cs),t.getHSL($o);let n=su(cs.h,$o.h,e),i=su(cs.s,$o.s,e),r=su(cs.l,$o.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new ne;ne.NAMES=Dm;var Na=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wi,this.environmentIntensity=1,this.environmentRotation=new Wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Kn=new W,Fi=new W,uu=new W,Bi=new W,yr=new W,Mr=new W,Ap=new W,du=new W,fu=new W,pu=new W,mu=new Ce,gu=new Ce,_u=new Ce,fs=class s{constructor(t=new W,e=new W,n=new W){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Kn.subVectors(t,e),i.cross(Kn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Kn.subVectors(i,e),Fi.subVectors(n,e),uu.subVectors(t,e);let a=Kn.dot(Kn),o=Kn.dot(Fi),l=Kn.dot(uu),c=Fi.dot(Fi),h=Fi.dot(uu),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bi.x),l.addScaledVector(a,Bi.y),l.addScaledVector(o,Bi.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return mu.setScalar(0),gu.setScalar(0),_u.setScalar(0),mu.fromBufferAttribute(t,e),gu.fromBufferAttribute(t,n),_u.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(mu,r.x),a.addScaledVector(gu,r.y),a.addScaledVector(_u,r.z),a}static isFrontFacing(t,e,n,i){return Kn.subVectors(n,e),Fi.subVectors(t,e),Kn.cross(Fi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Kn.subVectors(this.c,this.b),Fi.subVectors(this.a,this.b),Kn.cross(Fi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;yr.subVectors(i,n),Mr.subVectors(r,n),du.subVectors(t,n);let l=yr.dot(du),c=Mr.dot(du);if(l<=0&&c<=0)return e.copy(n);fu.subVectors(t,i);let h=yr.dot(fu),f=Mr.dot(fu);if(h>=0&&f<=h)return e.copy(i);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(yr,a);pu.subVectors(t,r);let d=yr.dot(pu),m=Mr.dot(pu);if(m>=0&&d<=m)return e.copy(r);let _=d*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Mr,o);let p=h*m-d*f;if(p<=0&&f-h>=0&&d-m>=0)return Ap.subVectors(r,i),o=(f-h)/(f-h+(d-m)),e.copy(i).addScaledVector(Ap,o);let g=1/(p+_+u);return a=_*g,o=u*g,e.copy(n).addScaledVector(yr,a).addScaledVector(Mr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ps=class{constructor(t=new W(1/0,1/0,1/0),e=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(jn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(jn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=jn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,jn):jn.fromBufferAttribute(r,a),jn.applyMatrix4(t.matrixWorld),this.expandByPoint(jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Yo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yo.copy(n.boundingBox)),Yo.applyMatrix4(t.matrixWorld),this.union(Yo)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,jn),jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ya),Zo.subVectors(this.max,ya),Sr.subVectors(t.a,ya),br.subVectors(t.b,ya),wr.subVectors(t.c,ya),hs.subVectors(br,Sr),us.subVectors(wr,br),Vs.subVectors(Sr,wr);let e=[0,-hs.z,hs.y,0,-us.z,us.y,0,-Vs.z,Vs.y,hs.z,0,-hs.x,us.z,0,-us.x,Vs.z,0,-Vs.x,-hs.y,hs.x,0,-us.y,us.x,0,-Vs.y,Vs.x,0];return!xu(e,Sr,br,wr,Zo)||(e=[1,0,0,0,1,0,0,0,1],!xu(e,Sr,br,wr,Zo))?!1:(Jo.crossVectors(hs,us),e=[Jo.x,Jo.y,Jo.z],xu(e,Sr,br,wr,Zo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ki),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ki=[new W,new W,new W,new W,new W,new W,new W,new W],jn=new W,Yo=new ps,Sr=new W,br=new W,wr=new W,hs=new W,us=new W,Vs=new W,ya=new W,Zo=new W,Jo=new W,Gs=new W;function xu(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Gs.fromArray(s,r);let o=i.x*Math.abs(Gs.x)+i.y*Math.abs(Gs.y)+i.z*Math.abs(Gs.z),l=t.dot(Gs),c=e.dot(Gs),h=n.dot(Gs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ve=new W,Ko=new It,xx=0,vi=class extends yi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Em,this.updateRanges=[],this.gpuType=ni,this.version=0,this._normalizationScale=t!==void 0?dd(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ko.fromBufferAttribute(this,e),Ko.applyMatrix3(t),this.setXY(e,Ko.x,Ko.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):ax(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):ox(t,this.array)}};var Ua=class extends vi{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Oa=class extends vi{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ne=class extends vi{constructor(t,e,n){super(new Float32Array(t),e,n)}},vx=new ps,Ma=new W,vu=new W,ms=class{constructor(t=new W,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):vx.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ma.subVectors(t,this.center);let e=Ma.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ma,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(vu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ma.copy(t.center).add(vu)),this.expandByPoint(Ma.copy(t.center).sub(vu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},yx=0,Hn=new Se,yu=new Ze,Ar=new W,Ln=new ps,Sa=new ps,$e=new W,wn=class s extends yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yx++}),this.uuid=Zr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ix(t)?Oa:Ua)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new te().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Hn.makeRotationFromQuaternion(t),this.applyMatrix4(Hn),this}rotateX(t){return Hn.makeRotationX(t),this.applyMatrix4(Hn),this}rotateY(t){return Hn.makeRotationY(t),this.applyMatrix4(Hn),this}rotateZ(t){return Hn.makeRotationZ(t),this.applyMatrix4(Hn),this}translate(t,e,n){return Hn.makeTranslation(t,e,n),this.applyMatrix4(Hn),this}scale(t,e,n){return Hn.makeScale(t,e,n),this.applyMatrix4(Hn),this}lookAt(t){return yu.lookAt(t),yu.updateMatrix(),this.applyMatrix4(yu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ar).negate(),this.translate(Ar.x,Ar.y,Ar.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ne(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Jt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ps);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Ln.setFromBufferAttribute(r),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ms);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(t){let n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Sa.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(Ln.min,Sa.min),Ln.expandByPoint($e),$e.addVectors(Ln.max,Sa.max),Ln.expandByPoint($e)):(Ln.expandByPoint(Sa.min),Ln.expandByPoint(Sa.max))}Ln.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)$e.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared($e));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$e.fromBufferAttribute(o,c),l&&(Ar.fromBufferAttribute(t,c),$e.add(Ar)),i=Math.max(i,n.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new vi(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let I=0;I<n.count;I++)o[I]=new W,l[I]=new W;let h=new W,f=new W,u=new W,d=new It,m=new It,_=new It,p=new W,g=new W;function v(I,R,D){c[I]=c[R]=c[D]=1,h.fromBufferAttribute(n,I),f.fromBufferAttribute(n,R),u.fromBufferAttribute(n,D),d.fromBufferAttribute(r,I),m.fromBufferAttribute(r,R),_.fromBufferAttribute(r,D),f.sub(h),u.sub(h),m.sub(d),_.sub(d);let G=1/(m.x*_.y-_.x*m.y);isFinite(G)&&(p.copy(f).multiplyScalar(_.y).addScaledVector(u,-m.y).multiplyScalar(G),g.copy(u).multiplyScalar(m.x).addScaledVector(f,-_.x).multiplyScalar(G),o[I].add(p),o[R].add(p),o[D].add(p),l[I].add(g),l[R].add(g),l[D].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let I=0,R=b.length;I<R;++I){let D=b[I],G=D.start,F=D.count;for(let C=G,k=G+F;C<k;C+=3)v(t.getX(C+0),t.getX(C+1),t.getX(C+2))}let y=new W,A=new W,T=new W,x=new W;function S(I){T.fromBufferAttribute(i,I),x.copy(T);let R=o[I];y.copy(R),y.sub(T.multiplyScalar(T.dot(R))).normalize(),A.crossVectors(x,R);let G=A.dot(l[I])<0?-1:1;a.setXYZW(I,y.x,y.y,y.z,G)}for(let I=0,R=n.count;I<R;++I)c[I]&&S(I);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new vi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new W,r=new W,a=new W,o=new W,l=new W,c=new W,h=new W,f=new W;if(t)for(let u=0,d=t.count;u<d;u+=3){let m=t.getX(u+0),_=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h),d=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let g=0;g<h;g++)u[m++]=c[d++]}return new vi(u,h,f)}if(this.index===null)return Jt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Mu=new W,Mx=new W,Sx=new te,Qn=class{constructor(t=new W(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Mu.subVectors(n,e).cross(Mx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(Mu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Sx.getNormalMatrix(t),i=this.coplanarPoint(Mu).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},bx=0,ti=class extends yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bx++}),this.uuid=Zr(),this.name="",this.type="Material",this.blending=qr,this.side=ys,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wu,this.blendDst=Xu,this.blendEquation=js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=Pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xl,this.stencilZFail=xl,this.stencilZPass=xl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Jt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Jt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ne().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Qn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new It().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new It().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var zi=new W,Su=new W,jo=new W,Qo=new W,Ur=class{constructor(t=new W,e=new W(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=zi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zi.copy(this.origin).addScaledVector(this.direction,e),zi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Su.copy(t).add(e).multiplyScalar(.5),jo.copy(e).sub(t).normalize(),Qo.copy(this.origin).sub(Su);let r=t.distanceTo(e)*.5,a=-this.direction.dot(jo),o=Qo.dot(this.direction),l=-Qo.dot(jo),c=Qo.lengthSq(),h=Math.abs(1-a*a),f,u,d,m;if(h>0)if(f=a*l-o,u=a*o-l,m=r*h,f>=0)if(u>=-m)if(u<=m){let _=1/h;f*=_,u*=_,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-m?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=m?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Su).addScaledVector(jo,u),d}intersectSphere(t,e){if(t.radius<0)return null;zi.subVectors(t.center,this.origin);let n=zi.dot(this.direction),i=zi.dot(zi)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,zi)!==null}intersectTriangle(t,e,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,d=t.z-a.z,m=e.x-a.x,_=e.y-a.y,p=e.z-a.z,g=n.x-a.x,v=n.y-a.y,b=n.z-a.z,y=Math.abs(l),A=Math.abs(c),T=Math.abs(h),x,S,I,R,D,G,F,C,k,H,O,J;if(y>=A&&y>=T?(I=l,G=f,k=m,J=g,l>=0?(x=c,S=h,R=u,D=d,F=_,C=p,H=v,O=b):(x=h,S=c,R=d,D=u,F=p,C=_,H=b,O=v)):A>=T?(I=c,G=u,k=_,J=v,c>=0?(x=h,S=l,R=d,D=f,F=p,C=m,H=b,O=g):(x=l,S=h,R=f,D=d,F=m,C=p,H=g,O=b)):(I=h,G=d,k=p,J=b,h>=0?(x=l,S=c,R=f,D=u,F=m,C=_,H=g,O=v):(x=c,S=l,R=u,D=f,F=_,C=m,H=v,O=g)),I===0)return null;let q=x/I,it=S/I,K=1/I,mt=R-q*G,Ut=D-it*G,tt=F-q*k,z=C-it*k,nt=H-q*J,at=O-it*J,Y=nt*z-at*tt,gt=mt*at-Ut*nt,Ot=tt*Ut-z*mt;if(i){if(Y<0||gt<0||Ot<0)return null}else if((Y<0||gt<0||Ot<0)&&(Y>0||gt>0||Ot>0))return null;let Et=Y+gt+Ot;if(Et===0)return null;let Ct=K*(Y*G+gt*k+Ot*J);return(Et>0?Ct<0:Ct>0)?null:this.at(Ct/Et,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Dl=class extends ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.combine=qu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Tp=new Se,Hs=new Ur,tl=new ms,Ep=new W,el=new W,nl=new W,il=new W,bu=new W,sl=new W,Cp=new W,rl=new W,Nn=class extends Ze{constructor(t=new wn,e=new Dl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){sl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(bu.fromBufferAttribute(f,t),a?sl.addScaledVector(bu,h):sl.addScaledVector(bu.sub(e),h))}e.add(sl)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),tl.copy(n.boundingSphere),tl.applyMatrix4(r),Hs.copy(t.ray).recast(t.near),!(tl.containsPoint(Hs.origin)===!1&&(Hs.intersectSphere(tl,Ep)===null||Hs.origin.distanceToSquared(Ep)>(t.far-t.near)**2))&&(Tp.copy(r).invert(),Hs.copy(t.ray).applyMatrix4(Tp),!(n.boundingBox!==null&&Hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hs)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){let p=u[m],g=a[p.materialIndex],v=Math.max(p.start,d.start),b=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let y=v,A=b;y<A;y+=3){let T=o.getX(y),x=o.getX(y+1),S=o.getX(y+2);i=al(this,g,t,n,c,h,f,T,x,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=m,g=_;p<g;p+=3){let v=o.getX(p),b=o.getX(p+1),y=o.getX(p+2);i=al(this,a,t,n,c,h,f,v,b,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){let p=u[m],g=a[p.materialIndex],v=Math.max(p.start,d.start),b=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let y=v,A=b;y<A;y+=3){let T=y,x=y+1,S=y+2;i=al(this,g,t,n,c,h,f,T,x,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=m,g=_;p<g;p+=3){let v=p,b=p+1,y=p+2;i=al(this,a,t,n,c,h,f,v,b,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function wx(s,t,e,n,i,r,a,o){let l;if(t.side===gn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===ys,o),l===null)return null;rl.copy(o),rl.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(rl);return c<e.near||c>e.far?null:{distance:c,point:rl.clone(),object:s}}function al(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,el),s.getVertexPosition(l,nl),s.getVertexPosition(c,il);let h=wx(s,t,e,n,el,nl,il,Cp);if(h){let f=new W;fs.getBarycoord(Cp,el,nl,il,f),i&&(h.uv=fs.getInterpolatedAttribute(i,o,l,c,f,new It)),r&&(h.uv1=fs.getInterpolatedAttribute(r,o,l,c,f,new It)),a&&(h.normal=fs.getInterpolatedAttribute(a,o,l,c,f,new W),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new W,materialIndex:0};fs.getNormal(el,nl,il,u.normal),h.face=u,h.barycoord=f}return h}var Nl=class extends bn{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ye,h=Ye,f,u){super(null,a,o,l,c,h,i,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ws=new ms,Ax=new It(.5,.5),ol=new W,gs=class{constructor(t=new Qn,e=new Qn,n=new Qn,i=new Qn,r=new Qn,a=new Qn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Wn,n=!1){let i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],m=r[8],_=r[9],p=r[10],g=r[11],v=r[12],b=r[13],y=r[14],A=r[15];if(i[0].setComponents(c-a,d-h,g-m,A-v).normalize(),i[1].setComponents(c+a,d+h,g+m,A+v).normalize(),i[2].setComponents(c+o,d+f,g+_,A+b).normalize(),i[3].setComponents(c-o,d-f,g-_,A-b).normalize(),n)i[4].setComponents(l,u,p,y).normalize(),i[5].setComponents(c-l,d-u,g-p,A-y).normalize();else if(i[4].setComponents(c-l,d-u,g-p,A-y).normalize(),e===Wn)i[5].setComponents(c+l,d+u,g+p,A+y).normalize();else if(e===Ir)i[5].setComponents(l,u,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ws.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ws.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ws)}intersectsSprite(t){Ws.center.set(0,0,0);let e=Ax.distanceTo(t.center);return Ws.radius=.7071067811865476+e,Ws.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ws)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(ol.x=i.normal.x>0?t.max.x:t.min.x,ol.y=i.normal.y>0?t.max.y:t.min.y,ol.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ol)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Rp=new Se,Ul=class s{constructor(){this.coordinateSystem=Wn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];Rp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new gs),n[i].setFromProjectionMatrix(Rp,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new gs),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};var qs=class extends ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ol=new W,Fl=new W,Pp=new Se,ba=new Ur,ll=new ms,wu=new W,Ip=new W,Bl=class extends Ze{constructor(t=new wn,e=new qs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Ol.fromBufferAttribute(e,i-1),Fl.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Ol.distanceTo(Fl);t.setAttribute("lineDistance",new Ne(n,1))}else Jt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ll.copy(n.boundingSphere),ll.applyMatrix4(i),ll.radius+=r,t.ray.intersectsSphere(ll)===!1)return;Pp.copy(i).invert(),ba.copy(t.ray).applyMatrix4(Pp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=d,p=m-1;_<p;_+=c){let g=h.getX(_),v=h.getX(_+1),b=cl(this,t,ba,l,g,v,_);b&&e.push(b)}if(this.isLineLoop){let _=h.getX(m-1),p=h.getX(d),g=cl(this,t,ba,l,_,p,m-1);g&&e.push(g)}}else{let d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=d,p=m-1;_<p;_+=c){let g=cl(this,t,ba,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=cl(this,t,ba,l,m-1,d,m-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function cl(s,t,e,n,i,r,a){let o=s.geometry.attributes.position;if(Ol.fromBufferAttribute(o,i),Fl.fromBufferAttribute(o,r),e.distanceSqToSegment(Ol,Fl,wu,Ip)>n)return;wu.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(wu);if(!(c<t.near||c>t.far))return{distance:c,point:Ip.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Lp=new W,Dp=new W,Or=class extends Bl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Lp.fromBufferAttribute(e,i),Dp.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Lp.distanceTo(Dp);t.setAttribute("lineDistance",new Ne(n,1))}else Jt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var kl=class extends ti{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Np=new Se,Du=new Ur,hl=new ms,ul=new W,Fa=class extends Ze{constructor(t=new wn,e=new kl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hl.copy(n.boundingSphere),hl.applyMatrix4(i),hl.radius+=r,t.ray.intersectsSphere(hl)===!1)return;Np.copy(i).invert(),Du.copy(t.ray).applyMatrix4(Np);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let m=u,_=d;m<_;m++){let p=c.getX(m);ul.fromBufferAttribute(f,p),Up(ul,p,l,i,t,e,this)}}else{let u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let m=u,_=d;m<_;m++)ul.fromBufferAttribute(f,m),Up(ul,m,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Up(s,t,e,n,i,r,a){let o=Du.distanceSqToPoint(s);if(o<e){let l=new W;Du.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Ba=class extends bn{constructor(t=[],e=Qs,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Xi=class extends bn{constructor(t,e,n=ei,i,r,a,o=Ye,l=Ye,c,h=Hi,f=1){if(h!==Hi&&h!==$i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Dr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ka=class extends Xi{constructor(t,e=ei,n=Qs,i,r,a=Ye,o=Ye,l,c=Hi){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},za=class extends bn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Fr=class s extends wn{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],u=0,d=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(f,2));function m(_,p,g,v,b,y,A,T,x,S,I){let R=y/x,D=A/S,G=y/2,F=A/2,C=T/2,k=x+1,H=S+1,O=0,J=0,q=new W;for(let it=0;it<H;it++){let K=it*D-F;for(let mt=0;mt<k;mt++){let Ut=mt*R-G;q[_]=Ut*v,q[p]=K*b,q[g]=C,c.push(q.x,q.y,q.z),q[_]=0,q[p]=0,q[g]=T>0?1:-1,h.push(q.x,q.y,q.z),f.push(mt/x),f.push(1-it/S),O+=1}}for(let it=0;it<S;it++)for(let K=0;K<x;K++){let mt=u+K+k*it,Ut=u+K+k*(it+1),tt=u+(K+1)+k*(it+1),z=u+(K+1)+k*it;l.push(mt,Ut,z),l.push(Ut,tt,z),J+=6}o.addGroup(d,J,I),d+=J,u+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Jt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],u=n[i+1]-h,d=(a-h)/u;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new It:new W);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new W,i=[],r=[],a=[],o=new W,l=new Se;for(let d=0;d<=t;d++){let m=d/t;i[d]=this.getTangentAt(m,new W)}r[0]=new W,a[0]=new W;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(oe(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(oe(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],d*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Br=class extends Un{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new It){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},zl=class extends Br{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function fd(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,i(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var Op=new W,Fp=new W,Au=new fd,Tu=new fd,Eu=new fd,Vl=class extends Un{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new W){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Fp.subVectors(i[0],i[1]).add(i[0]),c=Fp);let f=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Op.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Op),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),p=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),Au.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,m,_,p),Tu.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,m,_,p),Eu.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(Au.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),Tu.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Eu.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(Au.calc(l),Tu.calc(l),Eu.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new W().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Bp(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Tx(s,t){let e=1-s;return e*e*t}function Ex(s,t){return 2*(1-s)*s*t}function Cx(s,t){return s*s*t}function Ta(s,t,e,n){return Tx(s,t)+Ex(s,e)+Cx(s,n)}function Rx(s,t){let e=1-s;return e*e*e*t}function Px(s,t){let e=1-s;return 3*e*e*s*t}function Ix(s,t){return 3*(1-s)*s*s*t}function Lx(s,t){return s*s*s*t}function Ea(s,t,e,n,i){return Rx(s,t)+Px(s,e)+Ix(s,n)+Lx(s,i)}var Va=class extends Un{constructor(t=new It,e=new It,n=new It,i=new It){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new It){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ea(t,i.x,r.x,a.x,o.x),Ea(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Gl=class extends Un{constructor(t=new W,e=new W,n=new W,i=new W){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new W){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ea(t,i.x,r.x,a.x,o.x),Ea(t,i.y,r.y,a.y,o.y),Ea(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ga=class extends Un{constructor(t=new It,e=new It){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new It){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new It){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Hl=class extends Un{constructor(t=new W,e=new W){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new W){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new W){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ha=class extends Un{constructor(t=new It,e=new It,n=new It){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new It){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ta(t,i.x,r.x,a.x),Ta(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wl=class extends Un{constructor(t=new W,e=new W,n=new W){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new W){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ta(t,i.x,r.x,a.x),Ta(t,i.y,r.y,a.y),Ta(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wa=class extends Un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new It){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(Bp(o,l.x,c.x,h.x,f.x),Bp(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new It().fromArray(i))}return this}},Nu=Object.freeze({__proto__:null,ArcCurve:zl,CatmullRomCurve3:Vl,CubicBezierCurve:Va,CubicBezierCurve3:Gl,EllipseCurve:Br,LineCurve:Ga,LineCurve3:Hl,QuadraticBezierCurve:Ha,QuadraticBezierCurve3:Wl,SplineCurve:Wa}),Xl=class extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nu[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Nu[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},$s=class extends Xl{constructor(t){super(),this.type="Path",this.currentPoint=new It,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ga(this.currentPoint.clone(),new It(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Ha(this.currentPoint.clone(),new It(t,e),new It(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new Va(this.currentPoint.clone(),new It(t,e),new It(n,i),new It(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Wa(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new Br(t,e,n,i,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},kr=class extends $s{constructor(t){super(t),this.uuid=Zr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new $s().fromJSON(i))}return this}};function Dx(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Nm(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Bx(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,f=l;for(let u=e;u<i;u+=e){let d=s[u],m=s[u+1];d<o&&(o=d),m<l&&(l=m),d>h&&(h=d),m>f&&(f=m)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return Xa(r,a,e,o,l,c,0),a}function Nm(s,t,e,n,i){let r;if(i===Zx(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=kp(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=kp(a/n|0,s[a],s[a+1],r);return r&&zr(r,r.next)&&($a(r),r=r.next),r}function Ys(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(zr(e,e.next)||De(e.prev,e,e.next)===0)){if($a(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Xa(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Hx(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Ux(s,n,i,r):Nx(s)){t.push(l.i,s.i,c.i),$a(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Ox(Ys(s),t),Xa(s,t,e,n,i,r,2)):a===2&&Fx(s,t,e,n,i,r):Xa(Ys(s),t,e,n,i,r,1);break}}}function Nx(s){let t=s.prev,e=s,n=s.next;if(De(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),f=Math.min(o,l,c),u=Math.max(i,r,a),d=Math.max(o,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=f&&m.y<=d&&wa(i,o,r,l,a,c,m.x,m.y)&&De(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ux(s,t,e,n){let i=s.prev,r=s,a=s.next;if(De(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,f=r.y,u=a.y,d=Math.min(o,l,c),m=Math.min(h,f,u),_=Math.max(o,l,c),p=Math.max(h,f,u),g=Uu(d,m,t,e,n),v=Uu(_,p,t,e,n),b=s.prevZ,y=s.nextZ;for(;b&&b.z>=g&&y&&y.z<=v;){if(b.x>=d&&b.x<=_&&b.y>=m&&b.y<=p&&b!==i&&b!==a&&wa(o,h,l,f,c,u,b.x,b.y)&&De(b.prev,b,b.next)>=0||(b=b.prevZ,y.x>=d&&y.x<=_&&y.y>=m&&y.y<=p&&y!==i&&y!==a&&wa(o,h,l,f,c,u,y.x,y.y)&&De(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;b&&b.z>=g;){if(b.x>=d&&b.x<=_&&b.y>=m&&b.y<=p&&b!==i&&b!==a&&wa(o,h,l,f,c,u,b.x,b.y)&&De(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;y&&y.z<=v;){if(y.x>=d&&y.x<=_&&y.y>=m&&y.y<=p&&y!==i&&y!==a&&wa(o,h,l,f,c,u,y.x,y.y)&&De(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Ox(s,t){let e=s;do{let n=e.prev,i=e.next.next;!zr(n,i)&&Om(n,e,e.next,i)&&qa(n,i)&&qa(i,n)&&(t.push(n.i,e.i,i.i),$a(e),$a(e.next),e=s=i),e=e.next}while(e!==s);return Ys(e)}function Fx(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qx(a,o)){let l=Fm(a,o);a=Ys(a,a.next),l=Ys(l,l.next),Xa(a,t,e,n,i,r,0),Xa(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Bx(s,t,e,n){let i=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Nm(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Xx(c))}i.sort(kx);for(let r=0;r<i.length;r++)e=zx(i[r],e);return e}function kx(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function zx(s,t){let e=Vx(s,t);if(!e)return t;let n=Fm(e,s);return Ys(n,n.next),Ys(e,e.next)}function Vx(s,t){let e=t,n=s.x,i=s.y,r=-1/0,a;if(zr(s,e))return e;do{if(zr(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let f=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Um(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let f=Math.abs(i-e.y)/(n-e.x);qa(e,s)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&Gx(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function Gx(s,t){return De(s.prev,s,t.prev)<0&&De(t.next,s,s.next)<0}function Hx(s,t,e,n){let i=s;do i.z===0&&(i.z=Uu(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Wx(i)}function Wx(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Uu(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Xx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Um(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function wa(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Um(s,t,e,n,i,r,a,o)}function qx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!$x(s,t)&&(qa(s,t)&&qa(t,s)&&Yx(s,t)&&(De(s.prev,s,t.prev)||De(s,t.prev,t))||zr(s,t)&&De(s.prev,s,s.next)>0&&De(t.prev,t,t.next)>0)}function De(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function zr(s,t){return s.x===t.x&&s.y===t.y}function Om(s,t,e,n){let i=fl(De(s,t,e)),r=fl(De(s,t,n)),a=fl(De(e,n,s)),o=fl(De(e,n,t));return!!(i!==r&&a!==o||i===0&&dl(s,e,t)||r===0&&dl(s,n,t)||a===0&&dl(e,s,n)||o===0&&dl(e,t,n))}function dl(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function fl(s){return s>0?1:s<0?-1:0}function $x(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Om(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function qa(s,t){return De(s.prev,s,s.next)<0?De(s,t,s.next)>=0&&De(s,s.prev,t)>=0:De(s,t,s.prev)<0||De(s,s.next,t)<0}function Yx(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Fm(s,t){let e=Ou(s.i,s.x,s.y),n=Ou(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function kp(s,t,e,n){let i=Ou(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function $a(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Ou(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Zx(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Fu=class{static triangulate(t,e,n=2){return Dx(t,e,n)}},Xs=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];zp(t),Vp(n,t);let a=t.length;e.forEach(zp);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Vp(n,e[l]);let o=Fu.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function zp(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Vp(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var Ya=class s extends wn{constructor(t=new kr([new It(.5,.5),new It(-.5,.5),new It(-.5,-.5),new It(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Ne(i,3)),this.setAttribute("uv",new Ne(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Jx,b,y=!1,A,T,x,S;if(g){b=g.getSpacedPoints(h),y=!0,u=!1;let ot=g.isCatmullRomCurve3?g.closed:!1;A=g.computeFrenetFrames(h,ot),T=new W,x=new W,S=new W}u||(p=0,d=0,m=0,_=0);let I=o.extractPoints(c),R=I.shape,D=I.holes;if(!Xs.isClockWise(R)){R=R.reverse();for(let ot=0,P=D.length;ot<P;ot++){let V=D[ot];Xs.isClockWise(V)&&(D[ot]=V.reverse())}}function F(ot){let V=10000000000000001e-36,et=ot[0];for(let L=1;L<=ot.length;L++){let $=L%ot.length,rt=ot[$],xt=rt.x-et.x,dt=rt.y-et.y,bt=xt*xt+dt*dt,N=Math.max(Math.abs(rt.x),Math.abs(rt.y),Math.abs(et.x),Math.abs(et.y)),Kt=V*N*N;if(bt<=Kt){ot.splice($,1),L--;continue}et=rt}}F(R),D.forEach(F);let C=D.length,k=R;for(let ot=0;ot<C;ot++){let P=D[ot];R=R.concat(P)}function H(ot,P,V){return P||jt("ExtrudeGeometry: vec does not exist"),ot.clone().addScaledVector(P,V)}let O=R.length;function J(ot,P,V){let et,L,$,rt=ot.x-P.x,xt=ot.y-P.y,dt=V.x-ot.x,bt=V.y-ot.y,N=rt*rt+xt*xt,Kt=rt*bt-xt*dt;if(Math.abs(Kt)>Number.EPSILON){let Vt=Math.sqrt(N),Xt=Math.sqrt(dt*dt+bt*bt),pt=P.x-xt/Vt,Qt=P.y+rt/Vt,Lt=V.x-bt/Xt,kt=V.y+dt/Xt,E=((Lt-pt)*bt-(kt-Qt)*dt)/(rt*bt-xt*dt);et=pt+rt*E-ot.x,L=Qt+xt*E-ot.y;let M=et*et+L*L;if(M<=2)return new It(et,L);$=Math.sqrt(M/2)}else{let Vt=!1;rt>Number.EPSILON?dt>Number.EPSILON&&(Vt=!0):rt<-Number.EPSILON?dt<-Number.EPSILON&&(Vt=!0):Math.sign(xt)===Math.sign(bt)&&(Vt=!0),Vt?(et=-xt,L=rt,$=Math.sqrt(N)):(et=rt,L=xt,$=Math.sqrt(N/2))}return new It(et/$,L/$)}let q=[];for(let ot=0,P=k.length,V=P-1,et=ot+1;ot<P;ot++,V++,et++)V===P&&(V=0),et===P&&(et=0),q[ot]=J(k[ot],k[V],k[et]);let it=[],K,mt=q.concat();for(let ot=0,P=C;ot<P;ot++){let V=D[ot];K=[];for(let et=0,L=V.length,$=L-1,rt=et+1;et<L;et++,$++,rt++)$===L&&($=0),rt===L&&(rt=0),K[et]=J(V[et],V[$],V[rt]);it.push(K),mt=mt.concat(K)}let Ut;if(p===0)Ut=Xs.triangulateShape(k,D);else{let ot=[],P=[];for(let V=0;V<p;V++){let et=V/p,L=d*Math.cos(et*Math.PI/2),$=m*Math.sin(et*Math.PI/2)+_;for(let rt=0,xt=k.length;rt<xt;rt++){let dt=H(k[rt],q[rt],$);gt(dt.x,dt.y,-L),et===0&&ot.push(dt)}for(let rt=0,xt=C;rt<xt;rt++){let dt=D[rt];K=it[rt];let bt=[];for(let N=0,Kt=dt.length;N<Kt;N++){let Vt=H(dt[N],K[N],$);gt(Vt.x,Vt.y,-L),et===0&&bt.push(Vt)}et===0&&P.push(bt)}}Ut=Xs.triangulateShape(ot,P)}let tt=Ut.length,z=m+_;for(let ot=0;ot<O;ot++){let P=u?H(R[ot],mt[ot],z):R[ot];y?(x.copy(A.normals[0]).multiplyScalar(P.x),T.copy(A.binormals[0]).multiplyScalar(P.y),S.copy(b[0]).add(x).add(T),gt(S.x,S.y,S.z)):gt(P.x,P.y,0)}for(let ot=1;ot<=h;ot++)for(let P=0;P<O;P++){let V=u?H(R[P],mt[P],z):R[P];y?(x.copy(A.normals[ot]).multiplyScalar(V.x),T.copy(A.binormals[ot]).multiplyScalar(V.y),S.copy(b[ot]).add(x).add(T),gt(S.x,S.y,S.z)):gt(V.x,V.y,f/h*ot)}for(let ot=p-1;ot>=0;ot--){let P=ot/p,V=d*Math.cos(P*Math.PI/2),et=m*Math.sin(P*Math.PI/2)+_;for(let L=0,$=k.length;L<$;L++){let rt=H(k[L],q[L],et);gt(rt.x,rt.y,f+V)}for(let L=0,$=D.length;L<$;L++){let rt=D[L];K=it[L];for(let xt=0,dt=rt.length;xt<dt;xt++){let bt=H(rt[xt],K[xt],et);y?gt(bt.x,bt.y+b[h-1].y,b[h-1].x+V):gt(bt.x,bt.y,f+V)}}}nt(),at();function nt(){let ot=i.length/3;if(u){let P=0,V=O*P;for(let et=0;et<tt;et++){let L=Ut[et];Ot(L[2]+V,L[1]+V,L[0]+V)}P=h+p*2,V=O*P;for(let et=0;et<tt;et++){let L=Ut[et];Ot(L[0]+V,L[1]+V,L[2]+V)}}else{for(let P=0;P<tt;P++){let V=Ut[P];Ot(V[2],V[1],V[0])}for(let P=0;P<tt;P++){let V=Ut[P];Ot(V[0]+O*h,V[1]+O*h,V[2]+O*h)}}n.addGroup(ot,i.length/3-ot,0)}function at(){let ot=i.length/3,P=0;Y(k,P),P+=k.length;for(let V=0,et=D.length;V<et;V++){let L=D[V];Y(L,P),P+=L.length}n.addGroup(ot,i.length/3-ot,1)}function Y(ot,P){let V=ot.length;for(;--V>=0;){let et=V,L=V-1;L<0&&(L=ot.length-1);for(let $=0,rt=h+p*2;$<rt;$++){let xt=O*$,dt=O*($+1),bt=P+et+xt,N=P+L+xt,Kt=P+L+dt,Vt=P+et+dt;Et(bt,N,Kt,Vt)}}}function gt(ot,P,V){l.push(ot),l.push(P),l.push(V)}function Ot(ot,P,V){Ct(ot),Ct(P),Ct(V);let et=i.length/3,L=v.generateTopUV(n,i,et-3,et-2,et-1);zt(L[0]),zt(L[1]),zt(L[2])}function Et(ot,P,V,et){Ct(ot),Ct(P),Ct(et),Ct(P),Ct(V),Ct(et);let L=i.length/3,$=v.generateSideWallUV(n,i,L-6,L-3,L-2,L-1);zt($[0]),zt($[1]),zt($[3]),zt($[1]),zt($[2]),zt($[3])}function Ct(ot){i.push(l[ot*3+0]),i.push(l[ot*3+1]),i.push(l[ot*3+2])}function zt(ot){r.push(ot.x),r.push(ot.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Kx(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Nu[i.type]().fromJSON(i)),new s(n,t.options)}},Jx={generateTopUV:function(s,t,e,n,i){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new It(r,a),new It(o,l),new It(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[i*3],d=t[i*3+1],m=t[i*3+2],_=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new It(a,1-l),new It(c,1-f),new It(u,1-m),new It(_,1-g)]:[new It(o,1-l),new It(h,1-f),new It(d,1-m),new It(p,1-g)]}};function Kx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Zs=class s extends wn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=t/o,u=e/l,d=[],m=[],_=[],p=[];for(let g=0;g<h;g++){let v=g*u-a;for(let b=0;b<c;b++){let y=b*f-r;m.push(y,-v,0),_.push(0,0,1),p.push(b/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){let b=v+c*g,y=v+c*(g+1),A=v+1+c*(g+1),T=v+1+c*g;d.push(b,y,T),d.push(y,A,T)}this.setIndex(d),this.setAttribute("position",new Ne(m,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Za=class extends ti{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ne(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function er(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(Gp(i))i.isRenderTargetTexture?(Jt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Gp(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function ln(s){let t={};for(let e=0;e<s.length;e++){let n=er(s[e]);for(let i in n)t[i]=n[i]}return t}function Gp(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function jx(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function pd(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}var Bm={clone:er,merge:ln},Qx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xn=class extends ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qx,this.fragmentShader=tv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=er(t.uniforms),this.uniformsGroups=jx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new ne().setHex(i.value);break;case"v2":this.uniforms[n].value=new It().fromArray(i.value);break;case"v3":this.uniforms[n].value=new W().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ce().fromArray(i.value);break;case"m3":this.uniforms[n].value=new te().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Se().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ql=class extends Xn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Vr=class extends ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$c,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var $l=class extends ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Yl=class extends ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Tr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function pl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var _s=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Zl=class extends _s{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pu,endingEnd:Pu}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Iu:r=t,o=2*e-n;break;case Lu:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Iu:a=t,l=2*n-e;break;case Lu:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,m=(n-e)/(i-e),_=m*m,p=_*m,g=-u*p+2*u*_-u*m,v=(1+u)*p+(-1.5-2*u)*_+(-.5+u)*m+1,b=(-1-d)*p+(1.5+d)*_+.5*m,y=d*p-d*_;for(let A=0;A!==o;++A)r[A]=g*a[h+A]+v*a[c+A]+b*a[l+A]+y*a[f+A];return r}},Jl=class extends _s{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),f=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*f+a[l+u]*h;return r}},Kl=class extends _s{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},jl=class extends _s{interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let m=(n-e)/(i-e),_=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*_+a[l+p]*m;return r}let u=o*2,d=t-1;for(let m=0;m!==o;++m){let _=a[c+m],p=a[l+m],g=d*u+m*2,v=f[g],b=f[g+1],y=t*u+m*2,A=h[y],T=h[y+1],x=nv(n,e,v,A,i);r[m]=km(x,_,b,T,p)}return r}};function km(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function ev(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function nv(s,t,e,n,i){let r=(s-t)/(i-t);for(let a=0;a<8;a++){let o=km(r,t,e,n,i)-s;if(Math.abs(o)<1e-10)break;let l=ev(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var On=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Tr(e,this.TimeBufferType),this.values=Tr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Tr(t.times,Array),values:Tr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),pl(t.settings)&&(n.settings={inTangents:Tr(t.settings.inTangents,Array),outTangents:Tr(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Kl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Jl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Zl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new jl(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ca:e=this.InterpolantFactoryMethodDiscrete;break;case Cl:e=this.InterpolantFactoryMethodLinear;break;case _l:e=this.InterpolantFactoryMethodSmooth;break;case Ru:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Jt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ca;case this.InterpolantFactoryMethodLinear:return Cl;case this.InterpolantFactoryMethodSmooth:return _l;case this.InterpolantFactoryMethodBezier:return Ru}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;pl(this.settings)&&(Hp(this.settings.inTangents,t),Hp(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;pl(this.settings)&&(Wp(this.settings.inTangents,t),Wp(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(jt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(jt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){jt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){jt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&sx(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){jt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===_l,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let f=o*n,u=f-n,d=f+n;for(let m=0;m!==n;++m){let _=e[f+m];if(_!==e[u+m]||_!==e[d+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)e[u+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,pl(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Hp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]+=t}function Wp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}On.prototype.ValueTypeName="";On.prototype.TimeBufferType=Float32Array;On.prototype.ValueBufferType=Float32Array;On.prototype.DefaultInterpolation=Cl;var xs=class extends On{constructor(t,e,n){super(t,e,n)}};xs.prototype.ValueTypeName="bool";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=Ca;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ql=class extends On{constructor(t,e,n,i){super(t,e,n,i)}};Ql.prototype.ValueTypeName="color";var tc=class extends On{constructor(t,e,n,i){super(t,e,n,i)}};tc.prototype.ValueTypeName="number";var ec=class extends _s{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)Mi.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ja=class extends On{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new ec(this.times,this.values,this.getValueSize(),t)}};Ja.prototype.ValueTypeName="quaternion";Ja.prototype.InterpolantFactoryMethodSmooth=void 0;var vs=class extends On{constructor(t,e,n){super(t,e,n)}};vs.prototype.ValueTypeName="string";vs.prototype.ValueBufferType=Array;vs.prototype.DefaultInterpolation=Ca;vs.prototype.InterpolantFactoryMethodLinear=void 0;vs.prototype.InterpolantFactoryMethodSmooth=void 0;var nc=class extends On{constructor(t,e,n,i){super(t,e,n,i)}};nc.prototype.ValueTypeName="vector";var ic=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],m=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},zm=new ic,sc=class{constructor(t){this.manager=t!==void 0?t:zm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};sc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Gr=class extends Ze{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ne(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Ka=class extends Gr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ne(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Cu=new Se,Xp=new W,qp=new W,rc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gs,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Xp.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xp),qp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qp),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Cu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Cu,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===Ir||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Cu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ml=new W,gl=new Mi,_i=new W,ja=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=Wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ml,gl,_i),_i.x===1&&_i.y===1&&_i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ml,gl,_i.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ml,gl,_i),_i.x===1&&_i.y===1&&_i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ml,gl,_i.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ds=new W,$p=new It,Yp=new It,pn=class extends ja{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Rl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(iu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rl*2*Math.atan(Math.tan(iu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ds.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ds.x,ds.y).multiplyScalar(-t/ds.z),ds.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ds.x,ds.y).multiplyScalar(-t/ds.z)}getViewSize(t,e){return this.getViewBounds(t,$p,Yp),e.subVectors(Yp,$p)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(iu*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Qa=class extends ja{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Bu=class extends rc{constructor(){super(new Qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hr=class extends Gr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Bu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},to=class extends Gr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Er=-90,Cr=1,Wr=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new pn(Er,Cr,t,e);i.layers=this.layers,this.add(i);let r=new pn(Er,Cr,t,e);r.layers=this.layers,this.add(r);let a=new pn(Er,Cr,t,e);a.layers=this.layers,this.add(a);let o=new pn(Er,Cr,t,e);o.layers=this.layers,this.add(o);let l=new pn(Er,Cr,t,e);l.layers=this.layers,this.add(l);let c=new pn(Er,Cr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ac=class extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var md="\\[\\]\\.:\\/",iv=new RegExp("["+md+"]","g"),gd="[^"+md+"]",sv="[^"+md.replace("\\.","")+"]",rv=/((?:WC+[\/:])*)/.source.replace("WC",gd),av=/(WCOD+)?/.source.replace("WCOD",sv),ov=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gd),lv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gd),cv=new RegExp("^"+rv+av+ov+lv+"$"),hv=["material","materials","bones","map"],ku=class{constructor(t,e,n){let i=n||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ae=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(iv,"")}static parseTrackName(t){let e=cv.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);hv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Jt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){jt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){jt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){jt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){jt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){jt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;jt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=ku;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ew=new Float32Array(1);var Sd=class Sd{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};Sd.prototype.isMatrix2=!0;var zu=Sd;function _d(s,t,e,n){let i=uv(n);switch(e){case sd:return s*t;case ad:return s*t/i.components*i.byteLength;case pc:return s*t/i.components*i.byteLength;case Ms:return s*t*2/i.components*i.byteLength;case mc:return s*t*2/i.components*i.byteLength;case rd:return s*t*3/i.components*i.byteLength;case si:return s*t*4/i.components*i.byteLength;case gc:return s*t*4/i.components*i.byteLength;case so:case ro:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ao:case oo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case xc:case yc:return Math.max(s,16)*Math.max(t,8)/4;case _c:case vc:return Math.max(s,8)*Math.max(t,8)/2;case Mc:case Sc:case wc:case Ac:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case bc:case lo:case Tc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ec:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Cc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Rc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ic:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Lc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Dc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Nc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Uc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Oc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Fc:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Bc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case kc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case zc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Vc:case Gc:case Hc:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Wc:case Xc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case co:case qc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function uv(s){switch(s){case An:case td:return{byteLength:1,components:1};case Yr:case ed:case ii:return{byteLength:2,components:1};case dc:case fc:return{byteLength:2,components:4};case ei:case uc:case ni:return{byteLength:4,components:1};case nd:case id:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Jt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function l0(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function fv(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let h=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,h);else{f.sort((d,m)=>d.start-m.start);let u=0;for(let d=1;d<f.length;d++){let m=f[u],_=f[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,m=f.length;d<m;d++){let _=f[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var pv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,gv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_v=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Mv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,bv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Av=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ev=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Cv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Pv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Iv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Uv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ov=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Fv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,kv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,qv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,$v=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Jv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ty=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ey=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ny=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,iy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,ry=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ay=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,oy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ly=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,uy=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,dy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,py=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,my=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,gy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_y=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,My=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,by=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ay=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ty=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ey=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ry=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Py=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Iy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ly=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ny=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Oy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Fy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,By=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ky=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Hy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$y=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Jy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ky=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,eM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,iM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,aM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,oM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,dM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gM=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_M=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,MM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,SM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,bM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,TM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,EM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,CM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,LM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,NM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,UM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,OM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,BM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,GM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,HM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,re={alphahash_fragment:pv,alphahash_pars_fragment:mv,alphamap_fragment:gv,alphamap_pars_fragment:_v,alphatest_fragment:xv,alphatest_pars_fragment:vv,aomap_fragment:yv,aomap_pars_fragment:Mv,batching_pars_vertex:Sv,batching_vertex:bv,begin_vertex:wv,beginnormal_vertex:Av,bsdfs:Tv,iridescence_fragment:Ev,bumpmap_pars_fragment:Cv,clipping_planes_fragment:Rv,clipping_planes_pars_fragment:Pv,clipping_planes_pars_vertex:Iv,clipping_planes_vertex:Lv,color_fragment:Dv,color_pars_fragment:Nv,color_pars_vertex:Uv,color_vertex:Ov,common:Fv,defaultnormal_vertex:Bv,displacementmap_pars_vertex:kv,displacementmap_vertex:zv,emissivemap_fragment:Vv,emissivemap_pars_fragment:Gv,colorspace_fragment:Hv,colorspace_pars_fragment:Wv,envmap_fragment:Xv,envmap_common_pars_fragment:qv,envmap_pars_fragment:$v,envmap_pars_vertex:Yv,envmap_physical_pars_fragment:ry,envmap_vertex:Zv,fog_vertex:Jv,fog_pars_vertex:Kv,fog_fragment:jv,fog_pars_fragment:Qv,gradientmap_pars_fragment:ty,lightmap_pars_fragment:ey,lights_lambert_fragment:ny,lights_lambert_pars_fragment:iy,lights_pars_begin:sy,lights_toon_fragment:ay,lights_toon_pars_fragment:oy,lights_phong_fragment:ly,lights_phong_pars_fragment:cy,lights_physical_fragment:hy,lights_physical_pars_fragment:uy,lights_fragment_begin:dy,lights_fragment_maps:fy,lights_fragment_end:py,lightprobes_pars_fragment:my,logdepthbuf_fragment:gy,logdepthbuf_pars_fragment:_y,logdepthbuf_pars_vertex:xy,logdepthbuf_vertex:vy,map_fragment:yy,map_pars_fragment:My,map_particle_fragment:Sy,map_particle_pars_fragment:by,metalnessmap_fragment:wy,metalnessmap_pars_fragment:Ay,morphinstance_vertex:Ty,morphcolor_vertex:Ey,morphnormal_vertex:Cy,morphtarget_pars_vertex:Ry,morphtarget_vertex:Py,normal_fragment_begin:Iy,normal_fragment_maps:Ly,normal_pars_fragment:Dy,normal_pars_vertex:Ny,normal_vertex:Uy,normalmap_pars_fragment:Oy,clearcoat_normal_fragment_begin:Fy,clearcoat_normal_fragment_maps:By,clearcoat_pars_fragment:ky,iridescence_pars_fragment:zy,opaque_fragment:Vy,packing:Gy,premultiplied_alpha_fragment:Hy,project_vertex:Wy,dithering_fragment:Xy,dithering_pars_fragment:qy,roughnessmap_fragment:$y,roughnessmap_pars_fragment:Yy,shadowmap_pars_fragment:Zy,shadowmap_pars_vertex:Jy,shadowmap_vertex:Ky,shadowmask_pars_fragment:jy,skinbase_vertex:Qy,skinning_pars_vertex:tM,skinning_vertex:eM,skinnormal_vertex:nM,specularmap_fragment:iM,specularmap_pars_fragment:sM,tonemapping_fragment:rM,tonemapping_pars_fragment:aM,transmission_fragment:oM,transmission_pars_fragment:lM,uv_pars_fragment:cM,uv_pars_vertex:hM,uv_vertex:uM,worldpos_vertex:dM,background_vert:fM,background_frag:pM,backgroundCube_vert:mM,backgroundCube_frag:gM,cube_vert:_M,cube_frag:xM,depth_vert:vM,depth_frag:yM,distance_vert:MM,distance_frag:SM,equirect_vert:bM,equirect_frag:wM,linedashed_vert:AM,linedashed_frag:TM,meshbasic_vert:EM,meshbasic_frag:CM,meshlambert_vert:RM,meshlambert_frag:PM,meshmatcap_vert:IM,meshmatcap_frag:LM,meshnormal_vert:DM,meshnormal_frag:NM,meshphong_vert:UM,meshphong_frag:OM,meshphysical_vert:FM,meshphysical_frag:BM,meshtoon_vert:kM,meshtoon_frag:zM,points_vert:VM,points_frag:GM,shadow_vert:HM,shadow_frag:WM,sprite_vert:XM,sprite_frag:qM},Nt={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},Ai={basic:{uniforms:ln([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:ln([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new ne(0)},envMapIntensity:{value:1}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:ln([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:ln([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:ln([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new ne(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:ln([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:ln([Nt.points,Nt.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:ln([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:ln([Nt.common,Nt.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:ln([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:ln([Nt.sprite,Nt.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distance:{uniforms:ln([Nt.common,Nt.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distance_vert,fragmentShader:re.distance_frag},shadow:{uniforms:ln([Nt.lights,Nt.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};Ai.physical={uniforms:ln([Ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new te},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};var Yc={r:0,b:0,g:0},$M=new Se,c0=new te;c0.set(-1,0,0,0,1,0,0,0,1);function YM(s,t,e,n,i,r){let a=new ne(0),o=i===!0?0:1,l,c,h=null,f=0,u=null;function d(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){let y=v.backgroundBlurriness>0;b=t.get(b,y)}return b}function m(v){let b=!1,y=d(v);y===null?p(a,o):y&&y.isColor&&(p(y,1),b=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(v,b){let y=d(b);y&&y.isCubeTexture?(c===void 0&&(c=new Nn(new Fr(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:er(Ai.backgroundCube.uniforms),vertexShader:Ai.backgroundCube.vertexShader,fragmentShader:Ai.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4($M.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(c0),c.material.toneMapped=he.getTransfer(y.colorSpace)!==me,(h!==y||f!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Nn(new Zs(2,2),new Xn({name:"BackgroundMaterial",uniforms:er(Ai.background.uniforms),vertexShader:Ai.background.vertexShader,fragmentShader:Ai.background.fragmentShader,side:ys,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=he.getTransfer(y.colorSpace)!==me,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,b){v.getRGB(Yc,pd(s)),e.buffers.color.setClear(Yc.r,Yc.g,Yc.b,b,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,b=1){a.set(v),o=b,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,p(a,o)},render:m,addToRenderList:_,dispose:g}}function ZM(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,a=!1;function o(D,G,F,C,k){let H=!1,O=f(D,C,F,G);r!==O&&(r=O,c(r.object)),H=d(D,C,F,k),H&&m(D,C,F,k),k!==null&&t.update(k,s.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(D,G,F,C),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return s.createVertexArray()}function c(D){return s.bindVertexArray(D)}function h(D){return s.deleteVertexArray(D)}function f(D,G,F,C){let k=C.wireframe===!0,H=n[G.id];H===void 0&&(H={},n[G.id]=H);let O=D.isInstancedMesh===!0?D.id:0,J=H[O];J===void 0&&(J={},H[O]=J);let q=J[F.id];q===void 0&&(q={},J[F.id]=q);let it=q[k];return it===void 0&&(it=u(l()),q[k]=it),it}function u(D){let G=[],F=[],C=[];for(let k=0;k<e;k++)G[k]=0,F[k]=0,C[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:F,attributeDivisors:C,object:D,attributes:{},index:null}}function d(D,G,F,C){let k=r.attributes,H=G.attributes,O=0,J=F.getAttributes();for(let q in J)if(J[q].location>=0){let K=k[q],mt=H[q];if(mt===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(mt=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(mt=D.instanceColor)),K===void 0||K.attribute!==mt||mt&&K.data!==mt.data)return!0;O++}return r.attributesNum!==O||r.index!==C}function m(D,G,F,C){let k={},H=G.attributes,O=0,J=F.getAttributes();for(let q in J)if(J[q].location>=0){let K=H[q];K===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(K=D.instanceColor));let mt={};mt.attribute=K,K&&K.data&&(mt.data=K.data),k[q]=mt,O++}r.attributes=k,r.attributesNum=O,r.index=C}function _(){let D=r.newAttributes;for(let G=0,F=D.length;G<F;G++)D[G]=0}function p(D){g(D,0)}function g(D,G){let F=r.newAttributes,C=r.enabledAttributes,k=r.attributeDivisors;F[D]=1,C[D]===0&&(s.enableVertexAttribArray(D),C[D]=1),k[D]!==G&&(s.vertexAttribDivisor(D,G),k[D]=G)}function v(){let D=r.newAttributes,G=r.enabledAttributes;for(let F=0,C=G.length;F<C;F++)G[F]!==D[F]&&(s.disableVertexAttribArray(F),G[F]=0)}function b(D,G,F,C,k,H,O){O===!0?s.vertexAttribIPointer(D,G,F,k,H):s.vertexAttribPointer(D,G,F,C,k,H)}function y(D,G,F,C){_();let k=C.attributes,H=F.getAttributes(),O=G.defaultAttributeValues;for(let J in H){let q=H[J];if(q.location>=0){let it=k[J];if(it===void 0&&(J==="instanceMatrix"&&D.instanceMatrix&&(it=D.instanceMatrix),J==="instanceColor"&&D.instanceColor&&(it=D.instanceColor)),it!==void 0){let K=it.normalized,mt=it.itemSize,Ut=t.get(it);if(Ut===void 0)continue;let tt=Ut.buffer,z=Ut.type,nt=Ut.bytesPerElement,at=z===s.INT||z===s.UNSIGNED_INT||it.gpuType===uc;if(it.isInterleavedBufferAttribute){let Y=it.data,gt=Y.isInterleavedBuffer===!0?Y.stride:Y.itemSize,Ot=it.offset;if(Y.isInstancedInterleavedBuffer||Y.isInstancedBufferAttribute){for(let Et=0;Et<q.locationSize;Et++)g(q.location+Et,Y.meshPerAttribute);D.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Et=0;Et<q.locationSize;Et++)p(q.location+Et);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let Et=0;Et<q.locationSize;Et++)b(q.location+Et,mt/q.locationSize,z,K,gt*nt,(Ot+mt/q.locationSize*Et)*nt,at)}else{if(it.isInstancedBufferAttribute){for(let Y=0;Y<q.locationSize;Y++)g(q.location+Y,it.meshPerAttribute);D.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let Y=0;Y<q.locationSize;Y++)p(q.location+Y);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let Y=0;Y<q.locationSize;Y++)b(q.location+Y,mt/q.locationSize,z,K,mt*nt,mt/q.locationSize*Y*nt,at)}}else if(O!==void 0){let K=O[J];if(K!==void 0)switch(K.length){case 2:s.vertexAttrib2fv(q.location,K);break;case 3:s.vertexAttrib3fv(q.location,K);break;case 4:s.vertexAttrib4fv(q.location,K);break;default:s.vertexAttrib1fv(q.location,K)}}}}v()}function A(){I();for(let D in n){let G=n[D];for(let F in G){let C=G[F];for(let k in C){let H=C[k];for(let O in H)h(H[O].object),delete H[O];delete C[k]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;let G=n[D.id];for(let F in G){let C=G[F];for(let k in C){let H=C[k];for(let O in H)h(H[O].object),delete H[O];delete C[k]}}delete n[D.id]}function x(D){for(let G in n){let F=n[G];for(let C in F){let k=F[C];if(k[D.id]===void 0)continue;let H=k[D.id];for(let O in H)h(H[O].object),delete H[O];delete k[D.id]}}}function S(D){for(let G in n){let F=n[G],C=D.isInstancedMesh===!0?D.id:0,k=F[C];if(k!==void 0){for(let H in k){let O=k[H];for(let J in O)h(O[J].object),delete O[J];delete k[H]}delete F[C],Object.keys(F).length===0&&delete n[G]}}}function I(){R(),a=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function JM(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function KM(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(x){return!(x!==si&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let S=x===ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==An&&x!==ni&&!S&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Jt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&Jt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&Jt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:y,maxSamples:A,samples:T}}function jM(s){let t=this,e=null,n=0,i=!1,r=!1,a=new Qn,o=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let m=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,g=s.get(f);if(!i||m===null||m.length===0||r&&!p)r?h(null):c();else{let v=r?0:n,b=v*4,y=g.clippingState||null;l.value=y,y=h(m,u,b,d);for(let A=0;A!==b;++A)y[A]=e[A];g.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,m){let _=f!==null?f.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=d+_*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let b=0,y=d;b!==_;++b,y+=4)a.copy(f[b]).applyMatrix4(v,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var fo=class extends Dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ba(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Fr(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:Ks});r.uniforms.tEquirect.value=e;let a=new Nn(i,r),o=e.minFilter;return e.minFilter===qi&&(e.minFilter=mn),new Wr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Vm=256,QM=3,tS=20,h0=256,u0=16,eS=3,nS=new W,iS=new ne,Jc=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Wr(1,10,null),this._boxMesh=new Nn(new Fr(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:a=256,position:o=nS}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,u=l.autoClearColor,d=l.autoClearDepth,m=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(iS));let p=new Wr(n,i,h);return p.position.copy(o),p.update(l,t),l.autoClear=f,l.autoClearColor=u,l.autoClearDepth=d,l.autoClearStencil=m,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Vm,Lm(t))}_fromTexture(t,e){t.mapping===Qs||t.mapping===$r?this._setSize(t.image.length===0?Vm:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Gm(t,!1,!1),n=Math.log2(t)-QM;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Gm(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Qs||t.mapping===$r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wm()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Hm()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=sS(),this._integrationMaterial=rS());let e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/u0);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-eS)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(h0*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=aS());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}};function Gm(s,t,e){return new fo(s,{minFilter:qi,generateMipmaps:t,type:ii,colorSpace:Ra,depthBuffer:e})}function po(s,t,e){return new Xn({name:s,uniforms:t,vertexShader:re.cube_vert,fragmentShader:e,side:gn,blending:Ks,depthTest:!1,depthWrite:!1})}function sS(){return po("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${h0}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function rS(){return po("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:u0}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function aS(){return po("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${tS}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Hm(){return po("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Wm(){return po("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function oS(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===lc||d===cc)if(t.has(u)){let m=t.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let _=new fo(m.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let d=u.mapping,m=d===lc||d===cc,_=d===Qs||d===$r;if(m||_){let p=e.get(u),g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new Jc(s)),p=m?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{let v=u.image;return m&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new Jc(s)),p=m?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,d){return d===lc?u.mapping=Qs:d===cc&&(u.mapping=$r),u}function l(u){let d=0,m=6;for(let _=0;_<m;_++)u[_]!==void 0&&d++;return d===m}function c(u){let d=u.target;d.removeEventListener("dispose",c);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function lS(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Aa("WebGLRenderer: "+n+" extension not supported."),i}}}function cS(s,t,e,n){let i={},r=new WeakMap,a=new FinalizationRegistry(m=>delete i[m]);function o(m){l(m.target)}function l(m){m.index!==null&&t.remove(m.index);for(let p in m.attributes)t.remove(m.attributes[p]);m.removeEventListener("dispose",o),delete i[m.id],a.unregister(m);let _=r.get(m);_&&(t.remove(_),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(m,_){return i[_.id]!==void 0||(_.addEventListener("dispose",o),i[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(m){let _=m.attributes;for(let p in _)t.update(_[p],s.ARRAY_BUFFER)}function f(m){let _=m.index,p=m.attributes.position,g=0;if(p===void 0)return;let v=_!==null?_.array.length:p.array.length/3-1,b=p.count>=65535?Oa:Ua,y=new b(Math.ceil(v/3)*6,1),A=y.array;if(_!==null){let x=_.array;g=_.version;for(let S=0,I=0;S<v;S+=3){let R=x[S+0],D=x[S+1],G=x[S+2];A[I++]=R,A[I++]=D,A[I++]=D,A[I++]=G,A[I++]=G,A[I++]=R}}else{g=p.version;for(let x=0,S=0;x<v;x+=3){let I=x+0,R=x+1,D=x+2;A[S++]=I,A[S++]=R,A[S++]=R,A[S++]=D,A[S++]=D,A[S++]=I}}y.version=g;let T=r.get(m);T&&t.remove(T),r.set(m,y)}function u(m){let _=r.get(m);if(_){let p=m.index;p!==null&&_.version<p.version&&f(m)}else f(m);return r.get(m)}function d(){for(let m in i){let _=i[m].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:u,dispose:d}}function hS(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){s.drawElements(n,u,r,f*a),e.update(u,n,1)}function c(f,u,d){d!==0&&(s.drawElementsInstanced(n,u,r,f*a,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let _=0;for(let p=0;p<d;p++)_+=u[p];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function uS(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:jt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function dS(s,t,e){let n=new WeakMap,i=new Ce;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let I=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",I)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],b=0;d===!0&&(b=1),m===!0&&(b=2),_===!0&&(b=3);let y=o.attributes.position.count*b,A=1;y>t.maxTextureSize&&(A=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let T=new Float32Array(y*A*4*f),x=new La(T,y,A,f);x.type=ni,x.needsUpdate=!0;let S=b*4;for(let R=0;R<f;R++){let D=p[R],G=g[R],F=v[R],C=y*A*4*R;for(let k=0;k<D.count;k++){let H=k*S;d===!0&&(i.fromBufferAttribute(D,k),T[C+H+0]=i.x,T[C+H+1]=i.y,T[C+H+2]=i.z,T[C+H+3]=0),m===!0&&(i.fromBufferAttribute(G,k),T[C+H+4]=i.x,T[C+H+5]=i.y,T[C+H+6]=i.z,T[C+H+7]=0),_===!0&&(i.fromBufferAttribute(F,k),T[C+H+8]=i.x,T[C+H+9]=i.y,T[C+H+10]=i.z,T[C+H+11]=F.itemSize===4?i.w:1)}}u={count:f,texture:x,size:new It(y,A)},n.set(o,u),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let m=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function fS(s,t,e,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var pS={[$u]:"LINEAR_TONE_MAPPING",[Yu]:"REINHARD_TONE_MAPPING",[Zu]:"CINEON_TONE_MAPPING",[Ju]:"ACES_FILMIC_TONE_MAPPING",[ju]:"AGX_TONE_MAPPING",[no]:"NEUTRAL_TONE_MAPPING",[Ku]:"CUSTOM_TONE_MAPPING"};function mS(s,t,e,n,i,r){let a=new Dn(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new wn;h.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ne([0,2,0,0,2,0],2));let f=new ql({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Nn(h,f),d=new Qa(-1,1,1,-1,0,1),m=null,_=null,p=!1,g,v=null,b=[],y=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let x=0;x<b.length;x++){let S=b[x];S.setSize&&S.setSize(A,T)}},this.setEffects=function(A){b=A,y=b.length>0&&b[0].isRenderPass===!0;let T=a.width,x=a.height;b.length>0&&o===null&&(o=new Dn(T,x,{type:ii,depthBuffer:!1,stencilBuffer:!1}),l=new Dn(T,x,{type:ii,depthBuffer:!1,stencilBuffer:!1}));let S=i===!0&&b.some(I=>I.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new Xi(T,x),r===!0&&(c.format=$i,c.type=tr)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let I=0;I<b.length;I++){let R=b[I];R.setSize&&R.setSize(T,x),S&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(A,T){if(p||A.toneMapping===bi&&b.length===0)return!1;if(v=T,T!==null){let x=T.width,S=T.height;(a.width!==x||a.height!==S)&&this.setSize(x,S)}return y===!1&&A.setRenderTarget(a),g=A.toneMapping,A.toneMapping=bi,!0},this.hasRenderPass=function(){return y},this.end=function(A,T){A.toneMapping=g,p=!0;let x=a,S=o;for(let I=0;I<b.length;I++){let R=b[I];R.enabled!==!1&&(R.render(A,S,x,T),R.needsSwap!==!1&&(x=S,S=S===o?l:o))}if(m!==A.outputColorSpace||_!==A.toneMapping){m=A.outputColorSpace,_=A.toneMapping,f.defines={},he.getTransfer(m)===me&&(f.defines.SRGB_TRANSFER="");let I=pS[_];I&&(f.defines[I]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(v),A.render(u,d),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}var d0=new bn,f0=new Xi(1,1),p0=new ka(1),m0=new La,g0=new Ll,_0=new Ba,Xm=[],qm=[],$m=new Float32Array(16),Ym=new Float32Array(9),Zm=new Float32Array(4);function Kr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Xm[i];if(r===void 0&&(r=new Float32Array(i),Xm[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function He(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function We(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function jc(s,t){let e=qm[t];e===void 0&&(e=new Int32Array(t),qm[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function gS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function _S(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2fv(this.addr,t),We(e,t)}}function xS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;s.uniform3fv(this.addr,t),We(e,t)}}function vS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4fv(this.addr,t),We(e,t)}}function yS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Zm.set(n),s.uniformMatrix2fv(this.addr,!1,Zm),We(e,n)}}function MS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Ym.set(n),s.uniformMatrix3fv(this.addr,!1,Ym),We(e,n)}}function SS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;$m.set(n),s.uniformMatrix4fv(this.addr,!1,$m),We(e,n)}}function bS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function wS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2iv(this.addr,t),We(e,t)}}function AS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3iv(this.addr,t),We(e,t)}}function TS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4iv(this.addr,t),We(e,t)}}function ES(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function CS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2uiv(this.addr,t),We(e,t)}}function RS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3uiv(this.addr,t),We(e,t)}}function PS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4uiv(this.addr,t),We(e,t)}}function Qc(s){return s.version===0&&(s.compareFunction=cd,s.needsUpdate=!0),s}function IS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Qc(f0):r=d0,e.setTexture2D(t||r,i)}function LS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||g0,i)}function DS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Qc(p0):r=_0,e.setTextureCube(t||r,i)}function NS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||m0,i)}function US(s){switch(s){case 5126:return gS;case 35664:return _S;case 35665:return xS;case 35666:return vS;case 35674:return yS;case 35675:return MS;case 35676:return SS;case 5124:case 35670:return bS;case 35667:case 35671:return wS;case 35668:case 35672:return AS;case 35669:case 35673:return TS;case 5125:return ES;case 36294:return CS;case 36295:return RS;case 36296:return PS;case 35678:case 36198:case 36298:case 36306:case 35682:return IS;case 35679:case 36299:case 36307:return LS;case 35680:case 36300:case 36308:case 36293:return DS;case 36289:case 36303:case 36311:case 36292:return NS}}function OS(s,t){s.uniform1fv(this.addr,t)}function FS(s,t){let e=Kr(t,this.size,2);s.uniform2fv(this.addr,e)}function BS(s,t){let e=Kr(t,this.size,3);s.uniform3fv(this.addr,e)}function kS(s,t){let e=Kr(t,this.size,4);s.uniform4fv(this.addr,e)}function zS(s,t){let e=Kr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function VS(s,t){let e=Kr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function GS(s,t){let e=Kr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function HS(s,t){s.uniform1iv(this.addr,t)}function WS(s,t){s.uniform2iv(this.addr,t)}function XS(s,t){s.uniform3iv(this.addr,t)}function qS(s,t){s.uniform4iv(this.addr,t)}function $S(s,t){s.uniform1uiv(this.addr,t)}function YS(s,t){s.uniform2uiv(this.addr,t)}function ZS(s,t){s.uniform3uiv(this.addr,t)}function JS(s,t){s.uniform4uiv(this.addr,t)}function KS(s,t,e){let n=this.cache,i=t.length,r=jc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Qc(f0):a=d0;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function jS(s,t,e){let n=this.cache,i=t.length,r=jc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||g0,r[a])}function QS(s,t,e){let n=this.cache,i=t.length,r=jc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=Qc(p0):a=_0;for(let o=0;o!==i;++o)e.setTextureCube(t[o]||a,r[o])}function tb(s,t,e){let n=this.cache,i=t.length,r=jc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||m0,r[a])}function eb(s){switch(s){case 5126:return OS;case 35664:return FS;case 35665:return BS;case 35666:return kS;case 35674:return zS;case 35675:return VS;case 35676:return GS;case 5124:case 35670:return HS;case 35667:case 35671:return WS;case 35668:case 35672:return XS;case 35669:case 35673:return qS;case 5125:return $S;case 36294:return YS;case 36295:return ZS;case 36296:return JS;case 35678:case 36198:case 36298:case 36306:case 35682:return KS;case 35679:case 36299:case 36307:return jS;case 35680:case 36300:case 36308:case 36293:return QS;case 36289:case 36303:case 36311:case 36292:return tb}}var Ad=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=US(e.type)}},Td=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=eb(e.type)}},Ed=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},bd=/(\w+)(\])?(\[|\.)?/g;function Jm(s,t){s.seq.push(t),s.map[t.id]=t}function nb(s,t,e){let n=s.name,i=n.length;for(bd.lastIndex=0;;){let r=bd.exec(n),a=bd.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Jm(e,c===void 0?new Ad(o,s,t):new Td(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new Ed(o),Jm(e,f)),e=f}}}var Jr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);nb(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Km(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var ib=37297,sb=0;function rb(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var jm=new te;function ab(s){he._getMatrix(jm,he.workingColorSpace,s);let t=`mat3( ${jm.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(s)){case Pa:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return Jt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Qm(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+rb(s.getShaderSource(t),o)}else return r}function ob(s,t){let e=ab(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var lb={[$u]:"Linear",[Yu]:"Reinhard",[Zu]:"Cineon",[Ju]:"ACESFilmic",[ju]:"AgX",[no]:"Neutral",[Ku]:"Custom"};function cb(s,t){let e=lb[t];return e===void 0?(Jt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Zc=new W;function hb(){he.getLuminanceCoefficients(Zc);let s=Zc.x.toFixed(4),t=Zc.y.toFixed(4),e=Zc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ub(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(uo).join(`
`)}function db(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function fb(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function uo(s){return s!==""}function t0(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function e0(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var pb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cd(s){return s.replace(pb,mb)}function mb(s,t){let e=re[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Cd(e)}var gb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function n0(s){return s.replace(gb,_b)}function _b(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function i0(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var xb={[Js]:"SHADOWMAP_TYPE_PCF",[Xr]:"SHADOWMAP_TYPE_VSM"};function vb(s){return xb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var yb={[$r]:"ENVMAP_MODE_REFRACTION"};function Mb(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":yb[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Sb={[qu]:"ENVMAP_BLENDING_MULTIPLY",[gm]:"ENVMAP_BLENDING_MIX",[_m]:"ENVMAP_BLENDING_ADD"};function bb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Sb[s.combine]||"ENVMAP_BLENDING_NONE"}function wb(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=vb(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Mb(e),f=bb(e),u=ub(e),d=db(r),m=i.createProgram(),_,p,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(uo).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(uo).join(`
`),p.length>0&&(p+=`
`)):(_=[i0(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(uo).join(`
`),p=[i0(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==bi?"#define TONE_MAPPING":"",e.toneMapping!==bi?re.tonemapping_pars_fragment:"",e.toneMapping!==bi?cb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,ob("linearToOutputTexel",e.outputColorSpace),hb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(uo).join(`
`)),a=Cd(a),a=t0(a,e),a=e0(a,e),o=Cd(o),o=t0(o,e),o=e0(o,e),a=n0(a),o=n0(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",e.glslVersion===hd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===hd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=g+_+a,b=g+p+o,y=Km(i,i.VERTEX_SHADER,v),A=Km(i,i.FRAGMENT_SHADER,b);i.attachShader(m,y),i.attachShader(m,A),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function T(R){if(s.debug.checkShaderErrors){let D=i.getProgramInfoLog(m)||"",G=i.getShaderInfoLog(y)||"",F=i.getShaderInfoLog(A)||"",C=D.trim(),k=G.trim(),H=F.trim(),O=!0,J=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(O=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,y,A);else{let q=Qm(i,y,"vertex"),it=Qm(i,A,"fragment");jt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+C+`
`+q+`
`+it)}else C!==""?Jt("WebGLProgram: Program Info Log:",C):(k===""||H==="")&&(J=!1);J&&(R.diagnostics={runnable:O,programLog:C,vertexShader:{log:k,prefix:_},fragmentShader:{log:H,prefix:p}})}i.deleteShader(y),i.deleteShader(A),x=new Jr(i,m),S=fb(i,m)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(m,ib)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=sb++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=y,this.fragmentShader=A,this}var Ab=0,Rd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Pd(t),e.set(t,n)),n}},Pd=class{constructor(t){this.id=Ab++,this.code=t,this.usedTimes=0}};function Tb(s){return s===Ms||s===lo||s===co}function Eb(s,t,e,n,i,r){let a=new Da,o=new Rd,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,S,I,R,D,G){let F=R.fog,C=D.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,O=t.get(x.envMap||k,H),J=u[x.type],q=n.precision;x.precision!==null&&(q=n.getMaxPrecision(x.precision),q!==x.precision&&Jt("WebGLProgram.getParameters:",x.precision,"not supported, using",q,"instead."));let it=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,K=it!==void 0?it.length:0,mt=0;C.morphAttributes.position!==void 0&&(mt=1),C.morphAttributes.normal!==void 0&&(mt=2),C.morphAttributes.color!==void 0&&(mt=3);let Ut,tt,z,nt;if(J){let Dt=Ai[J];Ut=Dt.vertexShader,tt=Dt.fragmentShader}else{Ut=x.vertexShader,tt=x.fragmentShader;let Dt=o.getVertexShaderStage(x),_e=o.getFragmentShaderStage(x);o.update(x,Dt,_e),z=Dt.id,nt=_e.id}let at=s.getRenderTarget(),Y=s.state.buffers.depth.getReversed(),gt=D.isInstancedMesh===!0,Ot=D.isBatchedMesh===!0,Et=!!x.map,Ct=!!x.matcap,zt=!!O,ot=zt&&O.isPMREMTexture===!0,P=!!x.aoMap,V=!!x.lightMap,et=!!x.bumpMap&&x.wireframe===!1,L=!!x.normalMap,$=!!x.displacementMap,rt=!!x.emissiveMap,xt=!!x.metalnessMap,dt=!!x.roughnessMap,bt=x.anisotropy>0,N=x.clearcoat>0,Kt=x.diffuseRoughness>0,Vt=x.dispersion>0,Xt=x.retroreflectivity>0,pt=x.iridescence>0,Qt=x.sheen>0,Lt=x.transmission>0,kt=bt&&!!x.anisotropyMap,E=N&&!!x.clearcoatMap,M=N&&!!x.clearcoatNormalMap,X=N&&!!x.clearcoatRoughnessMap,_t=Kt&&!!x.diffuseRoughnessMap,ft=pt&&!!x.iridescenceMap,yt=pt&&!!x.iridescenceThicknessMap,At=Qt&&!!x.sheenColorMap,ct=Qt&&!!x.sheenRoughnessMap,ht=!!x.specularMap,St=!!x.specularColorMap,U=!!x.specularIntensityMap,ut=Lt&&!!x.transmissionMap,lt=Lt&&!!x.thicknessMap,Tt=!!x.gradientMap,Mt=!!x.alphaMap,wt=x.alphaTest>0,Yt=!!x.alphaHash,se=!!x.extensions,vt=bi;x.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(vt=s.toneMapping);let Zt=ot?O.isCompressedCubeTexture?O.image[0].mipmaps:O.mipmaps:null,ie={shaderID:J,shaderType:x.type,shaderName:x.name,vertexShader:Ut,fragmentShader:tt,defines:x.defines,customVertexShaderID:z,customFragmentShaderID:nt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:q,batching:Ot,batchingColor:Ot&&D._colorsTexture!==null,instancing:gt,instancingColor:gt&&D.instanceColor!==null,instancingMorph:gt&&D.morphTexture!==null,outputColorSpace:at===null?s.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:he.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Et,matcap:Ct,envMap:zt,envMapMode:zt&&O.mapping,envMapPMREM:ot,envMapMaxLod:ot?Zt.length-1:null,envMapSize:ot?Zt[0].width:null,aoMap:P,lightMap:V,bumpMap:et,normalMap:L,displacementMap:$,emissiveMap:rt,normalMapObjectSpace:L&&x.normalMapType===ym,normalMapTangentSpace:L&&x.normalMapType===$c,packedNormalMap:L&&x.normalMapType===$c&&Tb(x.normalMap.format),metalnessMap:xt,roughnessMap:dt,anisotropy:bt,anisotropyMap:kt,clearcoat:N,clearcoatMap:E,clearcoatNormalMap:M,clearcoatRoughnessMap:X,diffuseRoughness:Kt,diffuseRoughnessMap:_t,dispersion:Vt,retroreflection:Xt,iridescence:pt,iridescenceMap:ft,iridescenceThicknessMap:yt,sheen:Qt,sheenColorMap:At,sheenRoughnessMap:ct,specularMap:ht,specularColorMap:St,specularIntensityMap:U,transmission:Lt,transmissionMap:ut,thicknessMap:lt,gradientMap:Tt,opaque:x.transparent===!1&&x.blending===qr&&x.alphaToCoverage===!1,alphaMap:Mt,alphaTest:wt,alphaHash:Yt,combine:x.combine,mapUv:Et&&d(x.map.channel),aoMapUv:P&&d(x.aoMap.channel),lightMapUv:V&&d(x.lightMap.channel),bumpMapUv:et&&d(x.bumpMap.channel),normalMapUv:L&&d(x.normalMap.channel),displacementMapUv:$&&d(x.displacementMap.channel),emissiveMapUv:rt&&d(x.emissiveMap.channel),metalnessMapUv:xt&&d(x.metalnessMap.channel),roughnessMapUv:dt&&d(x.roughnessMap.channel),anisotropyMapUv:kt&&d(x.anisotropyMap.channel),clearcoatMapUv:E&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:M&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:_t&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:ft&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:At&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:ct&&d(x.sheenRoughnessMap.channel),specularMapUv:ht&&d(x.specularMap.channel),specularColorMapUv:St&&d(x.specularColorMap.channel),specularIntensityMapUv:U&&d(x.specularIntensityMap.channel),transmissionMapUv:ut&&d(x.transmissionMap.channel),thicknessMapUv:lt&&d(x.thicknessMap.channel),alphaMapUv:Mt&&d(x.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(L||bt),vertexNormals:!!C.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!C.attributes.uv&&(Et||Mt),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||C.attributes.normal===void 0&&L===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Y,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:mt,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:G.filter(Dt=>Dt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:vt,decodeVideoTexture:Et&&x.map.isVideoTexture===!0&&he.getTransfer(x.map.colorSpace)===me,decodeVideoTextureEmissive:rt&&x.emissiveMap.isVideoTexture===!0&&he.getTransfer(x.emissiveMap.colorSpace)===me,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Si,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:se&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&x.extensions.multiDraw===!0||Ot)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ie.vertexUv1s=l.has(1),ie.vertexUv2s=l.has(2),ie.vertexUv3s=l.has(3),l.clear(),ie}function _(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)S.push(I),S.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(S,x),g(S,x),S.push(s.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function p(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapPMREM),x.push(S.envMapMaxLod),x.push(S.envMapSize),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.diffuseRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.numLightProbeGrids),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function g(x,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function v(x){let S=u[x.type],I;if(S){let R=Ai[S];I=Bm.clone(R.uniforms)}else I=x.uniforms;return I}function b(x,S){let I=h.get(S);return I!==void 0?++I.usedTimes:(I=new wb(s,S,x,i),c.push(I),h.set(S,I)),I}function y(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function T(){o.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:v,acquireProgram:b,releaseProgram:y,releaseShaderCache:A,programs:c,dispose:T}}function Cb(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Rb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function s0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function r0(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,m,_,p,g){let v=s[t];return v===void 0?(v={id:u.id,object:u,geometry:d,material:m,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:p,group:g},s[t]=v):(v.id=u.id,v.object=u,v.geometry=d,v.material=m,v.materialVariant=a(u),v.groupOrder=_,v.renderOrder=u.renderOrder,v.z=p,v.group=g),t++,v}function l(u,d,m,_,p,g,v){v.reversedDepth===!0&&(p=-p);let b=o(u,d,m,_,p,g);m.transmission>0?n.push(b):m.transparent===!0?i.push(b):e.push(b)}function c(u,d,m,_,p,g){let v=o(u,d,m,_,p,g);m.transmission>0?n.unshift(v):m.transparent===!0?i.unshift(v):e.unshift(v)}function h(u,d){e.length>1&&e.sort(u||Rb),n.length>1&&n.sort(d||s0),i.length>1&&i.sort(d||s0)}function f(){for(let u=t,d=s.length;u<d;u++){let m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:f,sort:h}}function Pb(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new r0,s.set(n,[a])):i>=r.length?(a=new r0,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Ib(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new W,color:new ne};break;case"SpotLight":e={position:new W,direction:new W,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new W,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new W,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new W,halfWidth:new W,halfHeight:new W};break}return s[t.id]=e,e}}}function Lb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Db=0;function Nb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ub(s){let t=new Ib,e=Lb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new W);let i=new W,r=new Se,a=new Se;function o(c){let h=0,f=0,u=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let d=0,m=0,_=0,p=0,g=0,v=0,b=0,y=0,A=0,T=0,x=0,S=0,I=0,R=0;c.sort(Nb);for(let G=0,F=c.length;G<F;G++){let C=c[G],k=C.color,H=C.intensity,O=C.distance,J=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Ms?J=C.shadow.map.texture:J=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=k.r*H,f+=k.g*H,u+=k.b*H;else if(C.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(C.sh.coefficients[q],H);R++}else if(C.isSunLight){let q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let it=C.shadow,K=e.get(C);K.shadowIntensity=it.intensity,K.shadowBias=it.bias,K.shadowNormalBias=it.normalBias,K.shadowRadius=it.radius,K.shadowMapSize.copy(it.mapSize).multiply(it.getFrameExtents()),n.sunShadow[m]=K,n.sunShadowMap[m]=J;let mt=it.getViewportCount();for(let Ut=0;Ut<mt;Ut++)n.sunShadowMatrix[_+Ut]=it.getMatrix(Ut),n.sunShadowCascade[_+Ut]=it._cascadeData[Ut];_+=mt,m++}n.sun[d]=q,d++}else if(C.isDirectionalLight){let q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let it=C.shadow,K=e.get(C);K.shadowIntensity=it.intensity,K.shadowBias=it.bias,K.shadowNormalBias=it.normalBias,K.shadowRadius=it.radius,K.shadowMapSize=it.mapSize,n.directionalShadow[p]=K,n.directionalShadowMap[p]=J,n.directionalShadowMatrix[p]=C.shadow.matrix,A++}n.directional[p]=q,p++}else if(C.isSpotLight){let q=t.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(k).multiplyScalar(H),q.distance=O,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,n.spot[v]=q;let it=C.shadow;if(C.map&&(n.spotLightMap[S]=C.map,S++,it.updateMatrices(C),C.castShadow&&I++),n.spotLightMatrix[v]=it.matrix,C.castShadow){let K=e.get(C);K.shadowIntensity=it.intensity,K.shadowBias=it.bias,K.shadowNormalBias=it.normalBias,K.shadowRadius=it.radius,K.shadowMapSize=it.mapSize,n.spotShadow[v]=K,n.spotShadowMap[v]=J,x++}v++}else if(C.isRectAreaLight){let q=t.get(C);q.color.copy(k).multiplyScalar(H),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),n.rectArea[b]=q,b++}else if(C.isPointLight){let q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),q.distance=C.distance,q.decay=C.decay,C.castShadow){let it=C.shadow,K=e.get(C);K.shadowIntensity=it.intensity,K.shadowBias=it.bias,K.shadowNormalBias=it.normalBias,K.shadowRadius=it.radius,K.shadowMapSize=it.mapSize,K.shadowCameraNear=it.camera.near,K.shadowCameraFar=it.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=C.shadow.matrix,T++}n.point[g]=q,g++}else if(C.isHemisphereLight){let q=t.get(C);q.skyColor.copy(C.color).multiplyScalar(H),q.groundColor.copy(C.groundColor).multiplyScalar(H),n.hemi[y]=q,y++}}b>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Nt.LTC_FLOAT_1,n.rectAreaLTC2=Nt.LTC_FLOAT_2):(n.rectAreaLTC1=Nt.LTC_HALF_1,n.rectAreaLTC2=Nt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let D=n.hash;(D.sunLength!==d||D.directionalLength!==p||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==b||D.hemiLength!==y||D.numSunShadows!==m||D.numDirectionalShadows!==A||D.numPointShadows!==T||D.numSpotShadows!==x||D.numSpotMaps!==S||D.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=p,n.spot.length=v,n.rectArea.length=b,n.point.length=g,n.hemi.length=y,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+S-I,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=R,D.sunLength=d,D.directionalLength=p,D.pointLength=g,D.spotLength=v,D.rectAreaLength=b,D.hemiLength=y,D.numSunShadows=m,D.numDirectionalShadows=A,D.numPointShadows=T,D.numSpotShadows=x,D.numSpotMaps=S,D.numLightProbes=R,n.version=Db++)}function l(c,h){let f=0,u=0,d=0,m=0,_=0,p=0,g=h.matrixWorldInverse;for(let v=0,b=c.length;v<b;v++){let y=c[v];if(y.isSunLight){let A=n.sun[f];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(g),f++}else if(y.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),u++}else if(y.isSpotLight){let A=n.spot[m];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),m++}else if(y.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){let A=n.point[d];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){let A=n.hemi[p];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function a0(s){let t=new Ub(s),e=[],n=[],i=[];function r(f){h.camera=f,e.length=0,n.length=0,i.length=0}function a(f){f.isLightProbeGrid?i.push(f):e.push(f)}function o(f){n.push(f)}function l(){t.setup(e),i.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function c(f){t.setupView(e,f)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Ob(s){let t=new WeakMap;function e(i,r=0){let a=t.get(i),o;return a===void 0?(o=new a0(s),t.set(i,[o])):r>=a.length?(o=new a0(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Fb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,kb=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],zb=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],o0=new Se,ho=new W,wd=new W;function Vb(s,t,e){let n=new gs,i=new It,r=new It,a=new Ce,o=new $l,l=new Yl,c={},h=e.maxTextureSize,f={[ys]:gn,[gn]:ys,[Si]:Si},u=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:Fb,fragmentShader:Bb}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let m=new wn;m.setAttribute("position",new vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Nn(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Js;let g=this.type;this.render=function(T,x,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===Kp&&(Jt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Js);let I=s.getRenderTarget(),R=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),G=s.state;G.setBlending(Ks),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let F=g!==this.type;F&&x.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(k=>k.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,k=T.length;C<k;C++){let H=T[C],O=H.shadow;if(O===void 0){Jt("WebGLShadowMap:",H,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);let J=O.getFrameExtents();i.multiply(J),r.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/J.x),i.x=r.x*J.x,O.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/J.y),i.y=r.y*J.y,O.mapSize.y=r.y));let q=s.state.buffers.depth.getReversed();if(O.camera._reversedDepth=q,O.map===null||F===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Xr){if(H.isPointLight){Jt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Dn(i.x,i.y,{format:Ms,type:ii,minFilter:mn,magFilter:mn,generateMipmaps:!1}),O.map.texture.name=H.name+".shadowMap",O.map.depthTexture=new Xi(i.x,i.y,ni),O.map.depthTexture.name=H.name+".shadowMapDepth",O.map.depthTexture.format=Hi,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ye,O.map.depthTexture.magFilter=Ye}else H.isPointLight?(O.map=new fo(i.x),O.map.depthTexture=new ka(i.x,ei)):(O.map=new Dn(i.x,i.y),O.map.depthTexture=new Xi(i.x,i.y,ei)),O.map.depthTexture.name=H.name+".shadowMap",O.map.depthTexture.format=Hi,this.type===Js?(O.map.depthTexture.compareFunction=q?ld:od,O.map.depthTexture.minFilter=mn,O.map.depthTexture.magFilter=mn):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ye,O.map.depthTexture.magFilter=Ye);O.camera.updateProjectionMatrix()}O.map.isWebGLCubeRenderTarget!==!0&&(O.map.width!==i.x||O.map.height!==i.y)&&O.map.setSize(i.x,i.y);let it=O.map.isWebGLCubeRenderTarget?6:O.getViewportCount();H.isPointLight!==!0&&O.updateMatrices(H,S);let K=(O.camera.layers.mask&4294967294)!==0?O.camera.layers:S.layers;for(let mt=0;mt<it;mt++){let Ut=O.getCamera(mt);if(H.isPointLight){let tt=O.camera,z=O.matrix,nt=H.distance||tt.far;nt!==tt.far&&(tt.far=nt,tt.updateProjectionMatrix()),ho.setFromMatrixPosition(H.matrixWorld),tt.position.copy(ho),wd.copy(tt.position),wd.add(kb[mt]),tt.up.copy(zb[mt]),tt.lookAt(wd),tt.updateMatrixWorld(),z.makeTranslation(-ho.x,-ho.y,-ho.z),o0.multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse),O._frustum.setFromProjectionMatrix(o0,tt.coordinateSystem,tt.reversedDepth)}if(O.map.isWebGLCubeRenderTarget)s.setRenderTarget(O.map,mt),s.clear();else{mt===0&&(s.setRenderTarget(O.map),s.clear());let tt=O.getViewport(mt);a.set(r.x*tt.x,r.y*tt.y,r.x*tt.z,r.y*tt.w),G.viewport(a)}n=O.getFrustum(mt),y(x,S,Ut,H,K,this.type)}O.isPointLightShadow!==!0&&this.type===Xr&&v(O,S),O.needsUpdate=!1}g=this.type,p.needsUpdate=!1,s.setRenderTarget(I,R,D)};function v(T,x){let S=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null?T.mapPass=new Dn(i.x,i.y,{format:Ms,type:ii}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(x,null,S,u,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(x,null,S,d,_,null)}function b(T,x,S,I){let R=null,D=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)R=D;else if(R=S.isPointLight===!0?l:o,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let G=R.uuid,F=x.uuid,C=c[G];C===void 0&&(C={},c[G]=C);let k=C[F];k===void 0&&(k=R.clone(),C[F]=k,x.addEventListener("dispose",A)),R=k}if(R.visible=x.visible,R.wireframe=x.wireframe,I===Xr?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:f[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,S.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let G=s.properties.get(R);G.light=S}return R}function y(T,x,S,I,R,D){if(T.visible===!1)return;if(T.layers.test(R)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===Xr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);let C=t.update(T),k=T.material;if(Array.isArray(k)){let H=C.groups;for(let O=0,J=H.length;O<J;O++){let q=H[O],it=k[q.materialIndex];if(it&&it.visible){let K=b(T,it,I,D);T.onBeforeShadow(s,T,x,S,C,K,q),s.renderBufferDirect(S,null,C,K,T,q),T.onAfterShadow(s,T,x,S,C,K,q)}}}else if(k.visible){let H=b(T,k,I,D);T.onBeforeShadow(s,T,x,S,C,H,null),s.renderBufferDirect(S,null,C,H,T,null),T.onAfterShadow(s,T,x,S,C,H,null)}}let F=T.children;for(let C=0,k=F.length;C<k;C++)y(F[C],x,S,I,R,D)}function A(T){T.target.removeEventListener("dispose",A);for(let S in c){let I=c[S],R=T.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function Gb(s,t){function e(){let U=!1,ut=new Ce,lt=null,Tt=new Ce(0,0,0,0);return{setMask:function(Mt){lt!==Mt&&!U&&(s.colorMask(Mt,Mt,Mt,Mt),lt=Mt)},setLocked:function(Mt){U=Mt},setClear:function(Mt,wt,Yt,se,vt){vt===!0&&(Mt*=se,wt*=se,Yt*=se),ut.set(Mt,wt,Yt,se),Tt.equals(ut)===!1&&(s.clearColor(Mt,wt,Yt,se),Tt.copy(ut))},reset:function(){U=!1,lt=null,Tt.set(-1,0,0,0)}}}function n(){let U=!1,ut=!1,lt=null,Tt=null,Mt=null;return{setReversed:function(wt){if(ut!==wt){let Yt=t.get("EXT_clip_control");wt?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT),ut=wt;let se=Mt;Mt=null,this.setClear(se)}},getReversed:function(){return ut},setTest:function(wt){wt?Y(s.DEPTH_TEST):gt(s.DEPTH_TEST)},setMask:function(wt){lt!==wt&&!U&&(s.depthMask(wt),lt=wt)},setFunc:function(wt){if(ut&&(wt=Im[wt]),Tt!==wt){switch(wt){case vl:s.depthFunc(s.NEVER);break;case yl:s.depthFunc(s.ALWAYS);break;case Ml:s.depthFunc(s.LESS);break;case Pr:s.depthFunc(s.LEQUAL);break;case Sl:s.depthFunc(s.EQUAL);break;case bl:s.depthFunc(s.GEQUAL);break;case wl:s.depthFunc(s.GREATER);break;case Al:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Tt=wt}},setLocked:function(wt){U=wt},setClear:function(wt){Mt!==wt&&(Mt=wt,ut&&(wt=1-wt),s.clearDepth(wt))},reset:function(){U=!1,lt=null,Tt=null,Mt=null,ut=!1}}}function i(){let U=!1,ut=null,lt=null,Tt=null,Mt=null,wt=null,Yt=null,se=null,vt=null;return{setTest:function(Zt){U||(Zt?Y(s.STENCIL_TEST):gt(s.STENCIL_TEST))},setMask:function(Zt){ut!==Zt&&!U&&(s.stencilMask(Zt),ut=Zt)},setFunc:function(Zt,ie,Dt){(lt!==Zt||Tt!==ie||Mt!==Dt)&&(s.stencilFunc(Zt,ie,Dt),lt=Zt,Tt=ie,Mt=Dt)},setOp:function(Zt,ie,Dt){(wt!==Zt||Yt!==ie||se!==Dt)&&(s.stencilOp(Zt,ie,Dt),wt=Zt,Yt=ie,se=Dt)},setLocked:function(Zt){U=Zt},setClear:function(Zt){vt!==Zt&&(s.clearStencil(Zt),vt=Zt)},reset:function(){U=!1,ut=null,lt=null,Tt=null,Mt=null,wt=null,Yt=null,se=null,vt=null}}}let r=new e,a=new n,o=new i,l={},c=new WeakMap,h={},f={},u={},d=new WeakMap,m=[],_=null,p=!1,g=null,v=null,b=null,y=null,A=null,T=null,x=null,S=new ne(0,0,0),I=0,R=!1,D=null,G=null,F=null,C=null,k=null,H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,J=0,q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(q)[1]),O=J>=1):q.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),O=J>=2);let it=null,K={},mt=s.getParameter(s.SCISSOR_BOX),Ut=s.getParameter(s.VIEWPORT),tt=new Ce().fromArray(mt),z=new Ce().fromArray(Ut);function nt(U,ut,lt,Tt){let Mt=new Uint8Array(4),wt=s.createTexture();s.bindTexture(U,wt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Yt=0;Yt<lt;Yt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(ut,0,s.RGBA,1,1,Tt,0,s.RGBA,s.UNSIGNED_BYTE,Mt):s.texImage2D(ut+Yt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Mt);return wt}let at={};at[s.TEXTURE_2D]=nt(s.TEXTURE_2D,s.TEXTURE_2D,1),at[s.TEXTURE_CUBE_MAP]=nt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[s.TEXTURE_2D_ARRAY]=nt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),at[s.TEXTURE_3D]=nt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(s.DEPTH_TEST),a.setFunc(Pr),et(!1),L(Vu),Y(s.CULL_FACE),P(Ks);function Y(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function gt(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Ot(U,ut){return u[U]!==ut?(s.bindFramebuffer(U,ut),u[U]=ut,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ut),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ut),!0):!1}function Et(U,ut){let lt=m,Tt=!1;if(U){lt=d.get(ut),lt===void 0&&(lt=[],d.set(ut,lt));let Mt=U.textures;if(lt.length!==Mt.length||lt[0]!==s.COLOR_ATTACHMENT0){for(let wt=0,Yt=Mt.length;wt<Yt;wt++)lt[wt]=s.COLOR_ATTACHMENT0+wt;lt.length=Mt.length,Tt=!0}}else lt[0]!==s.BACK&&(lt[0]=s.BACK,Tt=!0);Tt&&s.drawBuffers(lt)}function Ct(U){return _!==U?(s.useProgram(U),_=U,!0):!1}let zt={[js]:s.FUNC_ADD,[Qp]:s.FUNC_SUBTRACT,[tm]:s.FUNC_REVERSE_SUBTRACT};zt[em]=s.MIN,zt[nm]=s.MAX;let ot={[im]:s.ZERO,[sm]:s.ONE,[rm]:s.SRC_COLOR,[Wu]:s.SRC_ALPHA,[um]:s.SRC_ALPHA_SATURATE,[cm]:s.DST_COLOR,[om]:s.DST_ALPHA,[am]:s.ONE_MINUS_SRC_COLOR,[Xu]:s.ONE_MINUS_SRC_ALPHA,[hm]:s.ONE_MINUS_DST_COLOR,[lm]:s.ONE_MINUS_DST_ALPHA,[dm]:s.CONSTANT_COLOR,[fm]:s.ONE_MINUS_CONSTANT_COLOR,[pm]:s.CONSTANT_ALPHA,[mm]:s.ONE_MINUS_CONSTANT_ALPHA};function P(U,ut,lt,Tt,Mt,wt,Yt,se,vt,Zt){if(U===Ks){p===!0&&(gt(s.BLEND),p=!1);return}if(p===!1&&(Y(s.BLEND),p=!0),U!==jp){if(U!==g||Zt!==R){if((v!==js||A!==js)&&(s.blendEquation(s.FUNC_ADD),v=js,A=js),Zt)switch(U){case qr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case eo:s.blendFunc(s.ONE,s.ONE);break;case Gu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Hu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:jt("WebGLState: Invalid blending: ",U);break}else switch(U){case qr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case eo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Gu:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hu:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",U);break}b=null,y=null,T=null,x=null,S.set(0,0,0),I=0,g=U,R=Zt}return}Mt=Mt||ut,wt=wt||lt,Yt=Yt||Tt,(ut!==v||Mt!==A)&&(s.blendEquationSeparate(zt[ut],zt[Mt]),v=ut,A=Mt),(lt!==b||Tt!==y||wt!==T||Yt!==x)&&(s.blendFuncSeparate(ot[lt],ot[Tt],ot[wt],ot[Yt]),b=lt,y=Tt,T=wt,x=Yt),(se.equals(S)===!1||vt!==I)&&(s.blendColor(se.r,se.g,se.b,vt),S.copy(se),I=vt),g=U,R=!1}function V(U,ut){U.side===Si?gt(s.CULL_FACE):Y(s.CULL_FACE);let lt=U.side===gn;ut&&(lt=!lt),et(lt),U.blending===qr&&U.transparent===!1?P(Ks):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let Tt=U.stencilWrite;o.setTest(Tt),Tt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),rt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Y(s.SAMPLE_ALPHA_TO_COVERAGE):gt(s.SAMPLE_ALPHA_TO_COVERAGE)}function et(U){D!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),D=U)}function L(U){U!==Zp?(Y(s.CULL_FACE),U!==G&&(U===Vu?s.cullFace(s.BACK):U===Jp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):gt(s.CULL_FACE),G=U}function $(U){U!==F&&(O&&s.lineWidth(U),F=U)}function rt(U,ut,lt){U?(Y(s.POLYGON_OFFSET_FILL),(C!==ut||k!==lt)&&(C=ut,k=lt,a.getReversed()&&(ut=-ut,lt=-lt),s.polygonOffset(ut,lt))):gt(s.POLYGON_OFFSET_FILL)}function xt(U){U?Y(s.SCISSOR_TEST):gt(s.SCISSOR_TEST)}function dt(U){U===void 0&&(U=s.TEXTURE0+H-1),it!==U&&(s.activeTexture(U),it=U)}function bt(U,ut,lt){lt===void 0&&(it===null?lt=s.TEXTURE0+H-1:lt=it);let Tt=K[lt];Tt===void 0&&(Tt={type:void 0,texture:void 0},K[lt]=Tt),(Tt.type!==U||Tt.texture!==ut)&&(it!==lt&&(s.activeTexture(lt),it=lt),s.bindTexture(U,ut||at[U]),Tt.type=U,Tt.texture=ut)}function N(){let U=K[it];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Kt(){try{s.compressedTexImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function Vt(){try{s.compressedTexImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function Xt(){try{s.texSubImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function pt(){try{s.texSubImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function Qt(){try{s.compressedTexSubImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function Lt(){try{s.compressedTexSubImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function kt(){try{s.texStorage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function E(){try{s.texStorage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function M(){try{s.texImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function X(){try{s.texImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function _t(U){return f[U]!==void 0?f[U]:s.getParameter(U)}function ft(U,ut){f[U]!==ut&&(s.pixelStorei(U,ut),f[U]=ut)}function yt(U){tt.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),tt.copy(U))}function At(U){z.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),z.copy(U))}function ct(U,ut){let lt=c.get(ut);lt===void 0&&(lt=new WeakMap,c.set(ut,lt));let Tt=lt.get(U);Tt===void 0&&(Tt=s.getUniformBlockIndex(ut,U.name),s.uniformBlockBinding(ut,Tt,Tt),lt.set(U,Tt))}function ht(U,ut,lt){let Mt=c.get(ut).get(U);l[Mt]!==lt&&(s.bindBufferBase(s.UNIFORM_BUFFER,Mt,lt),l[Mt]=lt)}function St(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},it=null,K={},u={},l={},d=new WeakMap,m=[],_=null,p=!1,g=null,v=null,b=null,y=null,A=null,T=null,x=null,S=new ne(0,0,0),I=0,R=!1,D=null,G=null,F=null,C=null,k=null,tt.set(0,0,s.canvas.width,s.canvas.height),z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Y,disable:gt,bindFramebuffer:Ot,drawBuffers:Et,useProgram:Ct,setBlending:P,setMaterial:V,setFlipSided:et,setCullFace:L,setLineWidth:$,setPolygonOffset:rt,setScissorTest:xt,activeTexture:dt,bindTexture:bt,unbindTexture:N,compressedTexImage2D:Kt,compressedTexImage3D:Vt,texImage2D:M,texImage3D:X,pixelStorei:ft,getParameter:_t,updateUBOMapping:ct,uniformBlockBinding:ht,texStorage2D:kt,texStorage3D:E,texSubImage2D:Xt,texSubImage3D:pt,compressedTexSubImage2D:Qt,compressedTexSubImage3D:Lt,scissor:yt,viewport:At,reset:St}}function Hb(s,t,e,n,i,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,h=new WeakMap,f=new Set,u,d=new WeakMap,m=new Set,_=new FinalizationRegistry(E=>m.delete(E)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,M){return p?new OffscreenCanvas(E,M):Ia("canvas")}function v(E,M,X){let _t=1,ft=kt(E);if((ft.width>X||ft.height>X)&&(_t=X/Math.max(ft.width,ft.height)),_t<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let yt=Math.floor(_t*ft.width),At=Math.floor(_t*ft.height);u===void 0&&(u=g(yt,At));let ct=M?g(yt,At):u;return ct.width=yt,ct.height=At,ct.getContext("2d").drawImage(E,0,0,yt,At),Jt("WebGLRenderer: Texture has been resized from ("+ft.width+"x"+ft.height+") to ("+yt+"x"+At+")."),ct}else return"data"in E&&Jt("WebGLRenderer: Image in DataTexture is too big ("+ft.width+"x"+ft.height+")."),E;return E}function b(E){return E.generateMipmaps}function y(E){s.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(E,M,X,_t,ft,yt=!1){if(E!==null){if(s[E]!==void 0)return s[E];Jt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let At;_t&&(At=t.get("EXT_texture_norm16"),At||Jt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ct=M;if(M===s.RED&&(X===s.FLOAT&&(ct=s.R32F),X===s.HALF_FLOAT&&(ct=s.R16F),X===s.UNSIGNED_BYTE&&(ct=s.R8),X===s.UNSIGNED_SHORT&&At&&(ct=At.R16_EXT),X===s.SHORT&&At&&(ct=At.R16_SNORM_EXT)),M===s.RED_INTEGER&&(X===s.UNSIGNED_BYTE&&(ct=s.R8UI),X===s.UNSIGNED_SHORT&&(ct=s.R16UI),X===s.UNSIGNED_INT&&(ct=s.R32UI),X===s.BYTE&&(ct=s.R8I),X===s.SHORT&&(ct=s.R16I),X===s.INT&&(ct=s.R32I)),M===s.RG&&(X===s.FLOAT&&(ct=s.RG32F),X===s.HALF_FLOAT&&(ct=s.RG16F),X===s.UNSIGNED_BYTE&&(ct=s.RG8),X===s.UNSIGNED_SHORT&&At&&(ct=At.RG16_EXT),X===s.SHORT&&At&&(ct=At.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(X===s.UNSIGNED_BYTE&&(ct=s.RG8UI),X===s.UNSIGNED_SHORT&&(ct=s.RG16UI),X===s.UNSIGNED_INT&&(ct=s.RG32UI),X===s.BYTE&&(ct=s.RG8I),X===s.SHORT&&(ct=s.RG16I),X===s.INT&&(ct=s.RG32I)),M===s.RGB_INTEGER&&(X===s.UNSIGNED_BYTE&&(ct=s.RGB8UI),X===s.UNSIGNED_SHORT&&(ct=s.RGB16UI),X===s.UNSIGNED_INT&&(ct=s.RGB32UI),X===s.BYTE&&(ct=s.RGB8I),X===s.SHORT&&(ct=s.RGB16I),X===s.INT&&(ct=s.RGB32I)),M===s.RGBA_INTEGER&&(X===s.UNSIGNED_BYTE&&(ct=s.RGBA8UI),X===s.UNSIGNED_SHORT&&(ct=s.RGBA16UI),X===s.UNSIGNED_INT&&(ct=s.RGBA32UI),X===s.BYTE&&(ct=s.RGBA8I),X===s.SHORT&&(ct=s.RGBA16I),X===s.INT&&(ct=s.RGBA32I)),M===s.RGB&&(X===s.UNSIGNED_SHORT&&At&&(ct=At.RGB16_EXT),X===s.SHORT&&At&&(ct=At.RGB16_SNORM_EXT),X===s.UNSIGNED_INT_5_9_9_9_REV&&(ct=s.RGB9_E5),X===s.UNSIGNED_INT_10F_11F_11F_REV&&(ct=s.R11F_G11F_B10F)),M===s.RGBA){let ht=yt?Pa:he.getTransfer(ft);X===s.FLOAT&&(ct=s.RGBA32F),X===s.HALF_FLOAT&&(ct=s.RGBA16F),X===s.UNSIGNED_BYTE&&(ct=ht===me?s.SRGB8_ALPHA8:s.RGBA8),X===s.UNSIGNED_SHORT&&At&&(ct=At.RGBA16_EXT),X===s.SHORT&&At&&(ct=At.RGBA16_SNORM_EXT),X===s.UNSIGNED_SHORT_4_4_4_4&&(ct=s.RGBA4),X===s.UNSIGNED_SHORT_5_5_5_1&&(ct=s.RGB5_A1)}return(ct===s.R16F||ct===s.R32F||ct===s.RG16F||ct===s.RG32F||ct===s.RGBA16F||ct===s.RGBA32F)&&t.get("EXT_color_buffer_float"),ct}function x(E,M){let X;return E?M===null||M===ei||M===tr?X=s.DEPTH24_STENCIL8:M===ni?X=s.DEPTH32F_STENCIL8:M===Yr&&(X=s.DEPTH24_STENCIL8,Jt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ei||M===tr?X=s.DEPTH_COMPONENT24:M===ni?X=s.DEPTH_COMPONENT32F:M===Yr&&(X=s.DEPTH_COMPONENT16),X}function S(E,M){return b(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ye&&E.minFilter!==mn?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function I(E){let M=new WeakRef(E);n.get(E).__ref=M,m.add(M),_.register(E,M,M)}function R(E){let M=n.get(E).__ref;M!==void 0&&(m.delete(M),_.unregister(M))}function D(E){F(E.target)}function G(E){C(E.target)}function F(E){E.removeEventListener("dispose",D),R(E),H(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&f.delete(E)}function C(E){E.removeEventListener("dispose",G),R(E),J(E)}function k(){for(let E of m){let M=E.deref();M!==void 0&&(M.isRenderTarget===!0?C(M):F(M))}m.clear(),f.clear()}function H(E){let M=n.get(E);if(M.__webglInit===void 0)return;let X=E.source,_t=d.get(X);if(_t){let ft=_t[M.__cacheKey];ft.usedTimes--,ft.usedTimes===0&&O(E),Object.keys(_t).length===0&&d.delete(X)}n.remove(E)}function O(E){let M=n.get(E);s.deleteTexture(M.__webglTexture);let X=E.source,_t=d.get(X);delete _t[M.__cacheKey],a.memory.textures--}function J(E){let M=n.get(E);M.__depthDisposeCallback&&M.__depthDisposeCallback();let X=E.depthTexture;if(X&&X.renderTarget===E&&F(X),E.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(M.__webglFramebuffer[ft]))for(let yt=0;yt<M.__webglFramebuffer[ft].length;yt++)s.deleteFramebuffer(M.__webglFramebuffer[ft][yt]);else s.deleteFramebuffer(M.__webglFramebuffer[ft]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[ft])}else{if(Array.isArray(M.__webglFramebuffer))for(let ft=0;ft<M.__webglFramebuffer.length;ft++)s.deleteFramebuffer(M.__webglFramebuffer[ft]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ft=0;ft<M.__webglColorRenderbuffer.length;ft++)M.__webglColorRenderbuffer[ft]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[ft]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let _t=E.textures;for(let ft=0,yt=_t.length;ft<yt;ft++){let At=n.get(_t[ft]);At.__webglTexture&&(s.deleteTexture(At.__webglTexture),a.memory.textures--),n.remove(_t[ft])}n.remove(E)}let q=0;function it(){q=0}function K(){return q}function mt(E){q=E}function Ut(){let E=q;return E>=i.maxTextures&&Jt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+i.maxTextures),q+=1,E}function tt(E){let M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.mipmapsAutoUpdate),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function z(E,M){let X=n.get(E);if(E.isVideoTexture&&Qt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&X.__version!==E.version){let _t=E.image;if(_t===null)Jt("WebGLRenderer: Texture marked for update but no image data found.");else if(_t.complete===!1)Jt("WebGLRenderer: Texture marked for update but image is incomplete");else{V(X,E,M);return}}else E.isExternalTexture&&(X.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,X.__webglTexture,s.TEXTURE0+M)}function nt(E,M){let X=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&X.__version!==E.version){V(X,E,M);return}else E.isExternalTexture&&(X.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,X.__webglTexture,s.TEXTURE0+M)}function at(E,M){let X=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&X.__version!==E.version){V(X,E,M);return}e.bindTexture(s.TEXTURE_3D,X.__webglTexture,s.TEXTURE0+M)}function Y(E,M){let X=n.get(E);if(E.version>0&&X.__version!==E.version){et(X,E,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture,s.TEXTURE0+M)}let gt={[Tl]:s.REPEAT,[xi]:s.CLAMP_TO_EDGE,[El]:s.MIRRORED_REPEAT},Ot={[Ye]:s.NEAREST,[xm]:s.NEAREST_MIPMAP_NEAREST,[io]:s.NEAREST_MIPMAP_LINEAR,[mn]:s.LINEAR,[hc]:s.LINEAR_MIPMAP_NEAREST,[qi]:s.LINEAR_MIPMAP_LINEAR},Et={[Sm]:s.NEVER,[cd]:s.ALWAYS,[bm]:s.LESS,[od]:s.LEQUAL,[wm]:s.EQUAL,[ld]:s.GEQUAL,[Am]:s.GREATER,[Tm]:s.NOTEQUAL};function Ct(E,M){if(M.type===ni&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===mn||M.magFilter===hc||M.magFilter===io||M.magFilter===qi||M.minFilter===mn||M.minFilter===hc||M.minFilter===io||M.minFilter===qi)&&Jt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,gt[M.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,gt[M.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,gt[M.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,Ot[M.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,Ot[M.minFilter]),M.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,Et[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ye||M.minFilter!==io&&M.minFilter!==qi||M.type===ni&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let X=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function zt(E,M){let X=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",D),I(M));let _t=M.source,ft=d.get(_t);ft===void 0&&(ft={},d.set(_t,ft));let yt=tt(M);if(yt!==E.__cacheKey){ft[yt]===void 0&&(ft[yt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,X=!0),ft[yt].usedTimes++;let At=ft[E.__cacheKey];At!==void 0&&(ft[E.__cacheKey].usedTimes--,At.usedTimes===0&&O(M)),E.__cacheKey=yt,E.__webglTexture=ft[yt].texture}return X}function ot(E,M,X){return Math.floor(Math.floor(E/X)/M)}function P(E,M,X,_t){let yt=E.updateRanges;if(yt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,X,_t,M.data);else{yt.sort((U,ut)=>U.start-ut.start);let At=0;for(let U=1;U<yt.length;U++){let ut=yt[At],lt=yt[U],Tt=ut.start+ut.count,Mt=ot(lt.start,M.width,4),wt=ot(ut.start,M.width,4);lt.start<=Tt+1&&Mt===wt&&ot(lt.start+lt.count-1,M.width,4)===Mt?ut.count=Math.max(ut.count,lt.start+lt.count-ut.start):(++At,yt[At]=lt)}yt.length=At+1;let ct=e.getParameter(s.UNPACK_ROW_LENGTH),ht=e.getParameter(s.UNPACK_SKIP_PIXELS),St=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let U=0,ut=yt.length;U<ut;U++){let lt=yt[U],Tt=Math.floor(lt.start/4),Mt=Math.ceil(lt.count/4),wt=Tt%M.width,Yt=Math.floor(Tt/M.width),se=Mt,vt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,wt),e.pixelStorei(s.UNPACK_SKIP_ROWS,Yt),e.texSubImage2D(s.TEXTURE_2D,0,wt,Yt,se,vt,X,_t,M.data)}E.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,ct),e.pixelStorei(s.UNPACK_SKIP_PIXELS,ht),e.pixelStorei(s.UNPACK_SKIP_ROWS,St)}}function V(E,M,X){let _t=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(_t=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(_t=s.TEXTURE_3D);let ft=zt(E,M),yt=M.source;e.bindTexture(_t,E.__webglTexture,s.TEXTURE0+X);let At=n.get(yt);if(yt.version!==At.__version||ft===!0){if(e.activeTexture(s.TEXTURE0+X),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let vt=he.getPrimaries(he.workingColorSpace),Zt=M.colorSpace===Yi?null:he.getPrimaries(M.colorSpace),ie=M.colorSpace===Yi||vt===Zt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie)}e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let ht=v(M.image,!1,i.maxTextureSize);ht=Lt(M,ht);let St=r.convert(M.format,M.colorSpace),U=r.convert(M.type),ut=T(M.internalFormat,St,U,M.normalized,M.colorSpace,M.isVideoTexture);Ct(_t,M);let lt,Tt=M.mipmaps,Mt=M.isVideoTexture!==!0,wt=At.__version===void 0||ft===!0,Yt=yt.dataReady,se=S(M,ht);if(M.isDepthTexture)ut=x(M.format===$i,M.type),wt&&(Mt?e.texStorage2D(s.TEXTURE_2D,1,ut,ht.width,ht.height):e.texImage2D(s.TEXTURE_2D,0,ut,ht.width,ht.height,0,St,U,null));else if(M.isDataTexture)if(Tt.length>0){Mt&&wt&&e.texStorage2D(s.TEXTURE_2D,se,ut,Tt[0].width,Tt[0].height);for(let vt=0,Zt=Tt.length;vt<Zt;vt++)lt=Tt[vt],Mt?Yt&&e.texSubImage2D(s.TEXTURE_2D,vt,0,0,lt.width,lt.height,St,U,lt.data):e.texImage2D(s.TEXTURE_2D,vt,ut,lt.width,lt.height,0,St,U,lt.data);M.generateMipmaps=!1}else Mt?(wt&&e.texStorage2D(s.TEXTURE_2D,se,ut,ht.width,ht.height),Yt&&P(M,ht,St,U)):e.texImage2D(s.TEXTURE_2D,0,ut,ht.width,ht.height,0,St,U,ht.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Mt&&wt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,se,ut,Tt[0].width,Tt[0].height,ht.depth);for(let vt=0,Zt=Tt.length;vt<Zt;vt++)if(lt=Tt[vt],M.format!==si)if(St!==null)if(Mt){if(Yt)if(M.layerUpdates.size>0){let ie=_d(lt.width,lt.height,M.format,M.type);for(let Dt of M.layerUpdates){let _e=lt.data.subarray(Dt*ie/lt.data.BYTES_PER_ELEMENT,(Dt+1)*ie/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,vt,0,0,Dt,lt.width,lt.height,1,St,_e)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,vt,0,0,0,lt.width,lt.height,ht.depth,St,lt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,vt,ut,lt.width,lt.height,ht.depth,0,lt.data,0,0);else Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Mt?Yt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,vt,0,0,0,lt.width,lt.height,ht.depth,St,U,lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,vt,ut,lt.width,lt.height,ht.depth,0,St,U,lt.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Mt&&wt&&e.texStorage2D(s.TEXTURE_2D,se,ut,Tt[0].width,Tt[0].height);for(let vt=0,Zt=Tt.length;vt<Zt;vt++)lt=Tt[vt],M.format!==si?St!==null?Mt?Yt&&e.compressedTexSubImage2D(s.TEXTURE_2D,vt,0,0,lt.width,lt.height,St,lt.data):e.compressedTexImage2D(s.TEXTURE_2D,vt,ut,lt.width,lt.height,0,lt.data):Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Mt?Yt&&e.texSubImage2D(s.TEXTURE_2D,vt,0,0,lt.width,lt.height,St,U,lt.data):e.texImage2D(s.TEXTURE_2D,vt,ut,lt.width,lt.height,0,St,U,lt.data)}else if(M.isDataArrayTexture)if(Mt){if(wt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,se,ut,ht.width,ht.height,ht.depth),Yt)if(M.layerUpdates.size>0){let vt=_d(ht.width,ht.height,M.format,M.type);for(let Zt of M.layerUpdates){let ie=ht.data.subarray(Zt*vt/ht.data.BYTES_PER_ELEMENT,(Zt+1)*vt/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Zt,ht.width,ht.height,1,St,U,ie)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,St,U,ht.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,ut,ht.width,ht.height,ht.depth,0,St,U,ht.data);else if(M.isData3DTexture)Mt?(wt&&e.texStorage3D(s.TEXTURE_3D,se,ut,ht.width,ht.height,ht.depth),Yt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,St,U,ht.data)):e.texImage3D(s.TEXTURE_3D,0,ut,ht.width,ht.height,ht.depth,0,St,U,ht.data);else if(M.isFramebufferTexture){if(wt)if(Mt)e.texStorage2D(s.TEXTURE_2D,se,ut,ht.width,ht.height);else{let vt=ht.width,Zt=ht.height;for(let ie=0;ie<se;ie++)e.texImage2D(s.TEXTURE_2D,ie,ut,vt,Zt,0,St,U,null),vt>>=1,Zt>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let vt=s.canvas;if(vt.hasAttribute("layoutsubtree")||vt.setAttribute("layoutsubtree","true"),ht.parentNode!==vt){vt.appendChild(ht),f.add(M),vt.onpaint=Zt=>{let ie=Zt.changedElements;for(let Dt of f)ie.includes(Dt.image)&&(Dt.needsUpdate=!0)},vt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ht);else{let ie=s.RGBA,Dt=s.RGBA,_e=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ie,Dt,_e,ht)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(Mt&&wt){let vt=kt(Tt[0]);e.texStorage2D(s.TEXTURE_2D,se,ut,vt.width,vt.height)}for(let vt=0,Zt=Tt.length;vt<Zt;vt++)lt=Tt[vt],Mt?Yt&&e.texSubImage2D(s.TEXTURE_2D,vt,0,0,St,U,lt):e.texImage2D(s.TEXTURE_2D,vt,ut,St,U,lt);M.generateMipmaps=!1}else if(Mt){if(wt){let vt=kt(ht);e.texStorage2D(s.TEXTURE_2D,se,ut,vt.width,vt.height)}Yt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,St,U,ht)}else e.texImage2D(s.TEXTURE_2D,0,ut,St,U,ht);b(M)&&M.mipmapsAutoUpdate===!0&&y(_t),At.__version=yt.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function et(E,M,X){if(M.image.length!==6)return;let _t=zt(E,M),ft=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+X);let yt=n.get(ft);if(ft.version!==yt.__version||_t===!0){e.activeTexture(s.TEXTURE0+X);let At=he.getPrimaries(he.workingColorSpace),ct=M.colorSpace===Yi?null:he.getPrimaries(M.colorSpace),ht=M.colorSpace===Yi||At===ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);let St=M.isCompressedTexture||M.image[0].isCompressedTexture,U=M.image[0]&&M.image[0].isDataTexture,ut=[];for(let Dt=0;Dt<6;Dt++)!St&&!U?ut[Dt]=v(M.image[Dt],!0,i.maxCubemapSize):ut[Dt]=U?M.image[Dt].image:M.image[Dt],ut[Dt]=Lt(M,ut[Dt]);let lt=ut[0],Tt=r.convert(M.format,M.colorSpace),Mt=r.convert(M.type),wt=T(M.internalFormat,Tt,Mt,M.normalized,M.colorSpace),Yt=M.isVideoTexture!==!0,se=yt.__version===void 0||_t===!0,vt=ft.dataReady,Zt=S(M,lt);Ct(s.TEXTURE_CUBE_MAP,M);let ie;if(M.isDepthTexture){if(wt=x(M.format===$i,M.type),se)if(Yt)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,wt,lt.width,lt.height);else for(let Dt=0;Dt<6;Dt++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,wt,lt.width,lt.height,0,Tt,Mt,null)}else if(St){Yt&&se&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Zt,wt,lt.width,lt.height);for(let Dt=0;Dt<6;Dt++){ie=ut[Dt].mipmaps;for(let _e=0;_e<ie.length;_e++){let Xe=ie[_e];M.format!==si?Tt!==null?Yt?vt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,_e,0,0,Xe.width,Xe.height,Tt,Xe.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,_e,wt,Xe.width,Xe.height,0,Xe.data):Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,_e,0,0,Xe.width,Xe.height,Tt,Mt,Xe.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,_e,wt,Xe.width,Xe.height,0,Tt,Mt,Xe.data)}}}else{if(ie=M.mipmaps,Yt&&se){ie.length>0&&Zt++;let Dt=kt(ut[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Zt,wt,Dt.width,Dt.height)}for(let Dt=0;Dt<6;Dt++)if(U){Yt?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,0,0,ut[Dt].width,ut[Dt].height,Tt,Mt,ut[Dt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,wt,ut[Dt].width,ut[Dt].height,0,Tt,Mt,ut[Dt].data);for(let _e=0;_e<ie.length;_e++){let Ki=ie[_e].image[Dt].image;Yt?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,_e+1,0,0,Ki.width,Ki.height,Tt,Mt,Ki.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,_e+1,wt,Ki.width,Ki.height,0,Tt,Mt,Ki.data)}}else{Yt?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,0,0,Tt,Mt,ut[Dt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,wt,Tt,Mt,ut[Dt]);for(let _e=0;_e<ie.length;_e++){let Xe=ie[_e];Yt?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,_e+1,0,0,Tt,Mt,Xe.image[Dt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,_e+1,wt,Tt,Mt,Xe.image[Dt])}}}b(M)&&M.mipmapsAutoUpdate===!0&&y(s.TEXTURE_CUBE_MAP),yt.__version=ft.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function L(E,M,X,_t,ft,yt){let At=r.convert(X.format,X.colorSpace),ct=r.convert(X.type),ht=T(X.internalFormat,At,ct,X.normalized,X.colorSpace),St=n.get(M),U=n.get(X);if(U.__renderTarget=M,!St.__hasExternalTextures){let ut=Math.max(1,M.width>>yt),lt=Math.max(1,M.height>>yt);ft===s.TEXTURE_3D||ft===s.TEXTURE_2D_ARRAY?e.texImage3D(ft,yt,ht,ut,lt,M.depth,0,At,ct,null):e.texImage2D(ft,yt,ht,ut,lt,0,At,ct,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),pt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_t,ft,U.__webglTexture,0,Xt(M)):(ft===s.TEXTURE_2D||ft>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ft<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,_t,ft,U.__webglTexture,yt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function $(E,M,X){if(s.bindRenderbuffer(s.RENDERBUFFER,E),M.depthBuffer){let _t=M.depthTexture,ft=_t&&_t.isDepthTexture?_t.type:null,yt=x(M.stencilBuffer,ft),At=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;pt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Xt(M),yt,M.width,M.height):X?s.renderbufferStorageMultisample(s.RENDERBUFFER,Xt(M),yt,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,yt,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,At,s.RENDERBUFFER,E)}else{let _t=M.textures;for(let ft=0;ft<_t.length;ft++){let yt=_t[ft],At=r.convert(yt.format,yt.colorSpace),ct=r.convert(yt.type),ht=T(yt.internalFormat,At,ct,yt.normalized,yt.colorSpace);pt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Xt(M),ht,M.width,M.height):X?s.renderbufferStorageMultisample(s.RENDERBUFFER,Xt(M),ht,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ht,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function rt(E,M,X){let _t=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ft=n.get(M.depthTexture);ft.__renderTarget=M;let yt=_t?M.depthTexture.image[0]:M.depthTexture.image;(!ft.__webglTexture||yt.width!==M.width||yt.height!==M.height)&&(yt.width=M.width,yt.height=M.height,M.depthTexture.needsUpdate=!0),_t?Y(M.depthTexture,0):z(M.depthTexture,0);let At=ft.__webglTexture,ct=Xt(M),ht=_t?s.TEXTURE_CUBE_MAP_POSITIVE_X+X:s.TEXTURE_2D,St=M.depthTexture.format===$i?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Hi)pt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,St,ht,At,0,ct):s.framebufferTexture2D(s.FRAMEBUFFER,St,ht,At,0);else if(M.depthTexture.format===$i)pt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,St,ht,At,0,ct):s.framebufferTexture2D(s.FRAMEBUFFER,St,ht,At,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function xt(E){let M=n.get(E),X=E.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==E.depthTexture){let _t=E.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),_t){let ft=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,_t.removeEventListener("dispose",ft)};_t.addEventListener("dispose",ft),M.__depthDisposeCallback=ft}M.__boundDepthTexture=_t}if(E.depthTexture&&!M.__autoAllocateDepthBuffer)if(X)for(let _t=0;_t<6;_t++)rt(M.__webglFramebuffer[_t],E,_t);else E.texture.mipmaps.length>0?rt(M.__webglFramebuffer[0],E,0):rt(M.__webglFramebuffer,E,0);else if(X){M.__webglDepthbuffer=[];for(let _t=0;_t<6;_t++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[_t]),M.__webglDepthbuffer[_t]===void 0)M.__webglDepthbuffer[_t]=s.createRenderbuffer(),$(M.__webglDepthbuffer[_t],E,!1);else{let ft=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=M.__webglDepthbuffer[_t];s.bindRenderbuffer(s.RENDERBUFFER,yt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ft,s.RENDERBUFFER,yt)}}else if(E.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),$(M.__webglDepthbuffer,E,!1);else{let ft=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,yt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ft,s.RENDERBUFFER,yt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function dt(E,M,X){let _t=n.get(E);M!==void 0&&L(_t.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),X!==void 0&&xt(E)}function bt(E){let M=E.texture,X=n.get(E),_t=n.get(M);E.addEventListener("dispose",G),I(E);let ft=E.textures,yt=E.isWebGLCubeRenderTarget===!0,At=ft.length>1;if(At||(_t.__webglTexture===void 0&&(_t.__webglTexture=s.createTexture()),_t.__version=M.version,a.memory.textures++),yt){X.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(M.mipmaps.length>0){X.__webglFramebuffer[ct]=[];for(let ht=0;ht<M.mipmaps.length;ht++)X.__webglFramebuffer[ct][ht]=s.createFramebuffer()}else X.__webglFramebuffer[ct]=s.createFramebuffer()}else{if(M.mipmaps.length>0){X.__webglFramebuffer=[];for(let ct=0;ct<M.mipmaps.length;ct++)X.__webglFramebuffer[ct]=s.createFramebuffer()}else X.__webglFramebuffer=s.createFramebuffer();if(At)for(let ct=0,ht=ft.length;ct<ht;ct++){let St=n.get(ft[ct]);St.__webglTexture===void 0&&(St.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&pt(E)===!1){X.__webglMultisampledFramebuffer=s.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ct=0;ct<ft.length;ct++){let ht=ft[ct];X.__webglColorRenderbuffer[ct]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,X.__webglColorRenderbuffer[ct]);let St=r.convert(ht.format,ht.colorSpace),U=r.convert(ht.type),ut=T(ht.internalFormat,St,U,ht.normalized,ht.colorSpace,E.isXRRenderTarget===!0),lt=Xt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,lt,ut,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.RENDERBUFFER,X.__webglColorRenderbuffer[ct])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(X.__webglDepthRenderbuffer=s.createRenderbuffer(),$(X.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(yt){e.bindTexture(s.TEXTURE_CUBE_MAP,_t.__webglTexture),Ct(s.TEXTURE_CUBE_MAP,M);for(let ct=0;ct<6;ct++)if(M.mipmaps.length>0)for(let ht=0;ht<M.mipmaps.length;ht++)L(X.__webglFramebuffer[ct][ht],E,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,ht);else L(X.__webglFramebuffer[ct],E,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);b(M)?y(s.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}else if(At){for(let ct=0,ht=ft.length;ct<ht;ct++){let St=ft[ct],U=n.get(St),ut=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ut=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,U.__webglTexture),Ct(ut,St),L(X.__webglFramebuffer,E,St,s.COLOR_ATTACHMENT0+ct,ut,0),b(St)&&y(ut)}e.unbindTexture()}else{let ct=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ct=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ct,_t.__webglTexture),Ct(ct,M),M.mipmaps.length>0)for(let ht=0;ht<M.mipmaps.length;ht++)L(X.__webglFramebuffer[ht],E,M,s.COLOR_ATTACHMENT0,ct,ht);else L(X.__webglFramebuffer,E,M,s.COLOR_ATTACHMENT0,ct,0);b(M)?y(ct):M.mipmaps.length>0&&s.texParameteri(ct,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}E.depthBuffer&&xt(E)}function N(E){let M=E.textures;for(let X=0,_t=M.length;X<_t;X++){let ft=M[X];if(b(ft)&&ft.mipmapsAutoUpdate===!0){let yt=A(E),At=n.get(ft).__webglTexture;e.bindTexture(yt,At),y(yt),e.unbindTexture()}}}let Kt=[];function Vt(E){if(E.samples>0){if(pt(E)===!1){let M=E.textures,X=E.width,_t=E.height,ft=s.COLOR_BUFFER_BIT,yt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,At=n.get(E),ct=M.length>1;if(ct)for(let St=0;St<M.length;St++)e.bindFramebuffer(s.FRAMEBUFFER,At.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,At.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let St=0;St<M.length;St++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ft|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ft|=s.STENCIL_BUFFER_BIT)),ct){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,At.__webglColorRenderbuffer[St]);let U=n.get(M[St]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,U,0)}s.blitFramebuffer(0,0,X,_t,0,0,X,_t,ft,s.NEAREST),l===!0&&(Kt.length=0,Kt.push(s.COLOR_ATTACHMENT0+St),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&Kt.push(yt),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Kt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ct)for(let St=0;St<M.length;St++){e.bindFramebuffer(s.FRAMEBUFFER,At.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,At.__webglColorRenderbuffer[St]);let U=n.get(M[St]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,At.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,U,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let M=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Xt(E){return Math.min(i.maxSamples,E.samples)}function pt(E){let M=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Qt(E){let M=a.render.frame;h.get(E)!==M&&(h.set(E,M),E.update())}function Lt(E,M){let X=E.colorSpace,_t=E.format,ft=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||X!==Ra&&X!==Yi&&(he.getTransfer(X)===me?(_t!==si||ft!==An)&&Jt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",X)),M}function kt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Ut,this.resetTextureUnits=it,this.getTextureUnits=K,this.setTextureUnits=mt,this.setTexture2D=z,this.setTexture2DArray=nt,this.setTexture3D=at,this.setTextureCube=Y,this.rebindTextures=dt,this.setupRenderTarget=bt,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=Vt,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=L,this.useMultisampledRTT=pt,this.dispose=k}function Wb(s,t){function e(n,i=Yi){let r,a=he.getTransfer(i);if(n===An)return s.UNSIGNED_BYTE;if(n===dc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===fc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===nd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===id)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===td)return s.BYTE;if(n===ed)return s.SHORT;if(n===Yr)return s.UNSIGNED_SHORT;if(n===uc)return s.INT;if(n===ei)return s.UNSIGNED_INT;if(n===ni)return s.FLOAT;if(n===ii)return s.HALF_FLOAT;if(n===sd)return s.ALPHA;if(n===rd)return s.RGB;if(n===si)return s.RGBA;if(n===Hi)return s.DEPTH_COMPONENT;if(n===$i)return s.DEPTH_STENCIL;if(n===ad)return s.RED;if(n===pc)return s.RED_INTEGER;if(n===Ms)return s.RG;if(n===mc)return s.RG_INTEGER;if(n===gc)return s.RGBA_INTEGER;if(n===so||n===ro||n===ao||n===oo)if(a===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===so)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===so)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_c||n===xc||n===vc||n===yc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_c)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Mc||n===Sc||n===bc||n===wc||n===Ac||n===lo||n===Tc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Mc||n===Sc)return a===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===bc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===wc)return r.COMPRESSED_R11_EAC;if(n===Ac)return r.COMPRESSED_SIGNED_R11_EAC;if(n===lo)return r.COMPRESSED_RG11_EAC;if(n===Tc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ec||n===Cc||n===Rc||n===Pc||n===Ic||n===Lc||n===Dc||n===Nc||n===Uc||n===Oc||n===Fc||n===Bc||n===kc||n===zc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ec)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Cc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Rc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ic)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Dc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Nc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Uc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Oc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Bc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===kc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===zc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vc||n===Gc||n===Hc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Vc)return a===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Gc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wc||n===Xc||n===co||n===qc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Xc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===co)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===tr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Xb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Id=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new za(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Xn({vertexShader:Xb,fragmentShader:qb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Nn(new Zs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ld=class extends yi{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,m=null,_=typeof XRWebGLBinding<"u",p=new Id,g={},v=e.getContextAttributes(),b=null,y=null,A=[],T=[],x=new It,S=null,I=null,R=new pn;R.viewport=new Ce;let D=new pn;D.viewport=new Ce;let G=[R,D],F=new ac,C=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let z=A[tt];return z===void 0&&(z=new Nr,A[tt]=z),z.getTargetRaySpace()},this.getControllerGrip=function(tt){let z=A[tt];return z===void 0&&(z=new Nr,A[tt]=z),z.getGripSpace()},this.getHand=function(tt){let z=A[tt];return z===void 0&&(z=new Nr,A[tt]=z),z.getHandSpace()};function H(tt){let z=T.indexOf(tt.inputSource);if(z===-1)return;let nt=A[z];nt!==void 0&&(nt.update(tt.inputSource,tt.frame,c||a),nt.dispatchEvent({type:tt.type,data:tt.inputSource}))}function O(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",J);for(let tt=0;tt<A.length;tt++){let z=T[tt];z!==null&&(T[tt]=null,A[tt].disconnect(z))}C=null,k=null,p.reset();for(let tt in g)delete g[tt];if(t.setRenderTarget(b),d=null,u=null,f=null,i=null,y=null,Ut.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(x.width,x.height,!1),I!==null){let tt=I.camera;tt.fov=I.fov,tt.zoom=I.zoom,tt.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,n.isPresenting===!0&&Jt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){o=tt,n.isPresenting===!0&&Jt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(tt){c=tt},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(i,e)),f},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(tt){if(i=tt,i!==null){if(b=t.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",O),i.addEventListener("inputsourceschange",J),v.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,at=null,Y=null;v.depth&&(Y=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=v.stencil?$i:Hi,at=v.stencil?tr:ei);let gt={colorFormat:e.RGBA8,depthFormat:Y,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(gt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Dn(u.textureWidth,u.textureHeight,{format:si,type:An,depthTexture:new Xi(u.textureWidth,u.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let nt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Dn(d.framebufferWidth,d.framebufferHeight,{format:si,type:An,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ut.setContext(i),Ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function J(tt){for(let z=0;z<tt.removed.length;z++){let nt=tt.removed[z],at=T.indexOf(nt);at>=0&&(T[at]=null,A[at].disconnect(nt))}for(let z=0;z<tt.added.length;z++){let nt=tt.added[z],at=T.indexOf(nt);if(at===-1){for(let gt=0;gt<A.length;gt++)if(gt>=T.length){T.push(nt),at=gt;break}else if(T[gt]===null){T[gt]=nt,at=gt;break}if(at===-1)break}let Y=A[at];Y&&Y.connect(nt)}}function q(tt,z){z===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(z.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(i===null)return;let z=tt.near,nt=tt.far;p.texture!==null&&(p.depthNear>0&&(z=p.depthNear),p.depthFar>0&&(nt=p.depthFar)),F.near=D.near=R.near=z,F.far=D.far=R.far=nt,(C!==F.near||k!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),C=F.near,k=F.far),F.layers.mask=tt.layers.mask|6,R.layers.mask=F.layers.mask&-5,D.layers.mask=F.layers.mask&-3;let at=tt.parent,Y=F.cameras;q(F,at);for(let gt=0;gt<Y.length;gt++)q(Y[gt],at);F.projectionMatrix.copy(R.projectionMatrix),F.projectionMatrixInverse.copy(R.projectionMatrixInverse),I===null&&tt.isPerspectiveCamera&&(I={camera:tt,fov:tt.fov,zoom:tt.zoom}),it(tt,F,at)};function it(tt,z,nt){nt===null?tt.matrix.copy(z.matrixWorld):(tt.matrix.copy(nt.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(z.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(z.projectionMatrix),tt.projectionMatrixInverse.copy(z.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=Rl*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(tt){l=tt,u!==null&&(u.fixedFoveation=tt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=tt)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(tt){return g[tt]};let K=null;function mt(tt,z){if(h=z.getViewerPose(c||a),m=z,h!==null){let nt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let at=!1;nt.length!==F.cameras.length&&(F.cameras.length=0,at=!0);for(let Et=0;Et<nt.length;Et++){let Ct=nt[Et],zt=null;if(d!==null)zt=d.getViewport(Ct);else{let P=f.getViewSubImage(u,Ct);zt=P.viewport,Et===0&&(t.setRenderTargetTextures(y,P.colorTexture,P.depthStencilTexture),t.setRenderTarget(y))}let ot=G[Et];ot===void 0&&(ot=new pn,ot.layers.enable(Et),ot.viewport=new Ce,G[Et]=ot),ot.matrix.fromArray(Ct.transform.matrix),ot.matrix.decompose(ot.position,ot.quaternion,ot.scale),ot.projectionMatrix.fromArray(Ct.projectionMatrix),ot.projectionMatrixInverse.copy(ot.projectionMatrix).invert(),ot.viewport.set(zt.x,zt.y,zt.width,zt.height),Et===0&&(F.matrix.copy(ot.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),at===!0&&F.cameras.push(ot)}let Y=i.enabledFeatures;if(Y&&Y.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){f=n.getBinding();let Et=f.getDepthInformation(nt[0]);Et&&Et.isValid&&Et.texture&&p.init(Et,i.renderState)}if(Y&&Y.includes("camera-access")&&_){t.state.unbindTexture(),f=n.getBinding();for(let Et=0;Et<nt.length;Et++){let Ct=nt[Et].camera;if(Ct){let zt=g[Ct];zt||(zt=new za,g[Ct]=zt);let ot=f.getCameraImage(Ct);zt.sourceTexture=ot}}}}for(let nt=0;nt<A.length;nt++){let at=T[nt],Y=A[nt];at!==null&&Y!==void 0&&Y.update(at,z,c||a)}K&&K(tt,z),z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:z}),m=null}let Ut=new l0;Ut.setAnimationLoop(mt),this.setAnimationLoop=function(tt){K=tt},this.dispose=function(){}}},$b=new Se,x0=new te;x0.set(-1,0,0,0,1,0,0,0,1);function Yb(s,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,pd(s)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,v,b,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),f(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),u(p,g),g.isMeshPhysicalMaterial&&d(p,g,y)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,v,b):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===gn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===gn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let v=t.get(g),b=v.envMap,y=v.envMapRotation;b&&(p.envMap.value=b,p.envMapRotation.value.setFromMatrix4($b.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(x0),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,v,b){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=b*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function f(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function d(p,g,v){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===gn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Zb(s,t,e,n){let i={},r={};function a(v,b){let y=b.program;n.uniformBlockBinding(v,y,i[v.id])}function o(v,b){let y=i[v.id];y===void 0&&(m(v),y=l(v),i[v.id]=y,v.addEventListener("dispose",p));let A=b.program;n.updateUBOMapping(v,A);let T=t.render.frame;r[v.id]!==T&&(c(v),r[v.id]=T)}function l(v){let b=s.createBuffer(),y=v.__size,A=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,y,A),s.bindBuffer(s.UNIFORM_BUFFER,null),b}function c(v){let b=i[v.id],y=v.uniforms,A=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let T=0,x=y.length;T<x;T++){let S=y[T];if(Array.isArray(S))for(let I=0,R=S.length;I<R;I++)h(S[I],T,I,A);else h(S,T,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(v,b,y,A){if(u(v,b,y,A)===!0){let T=v.__offset,x=v.value;if(Array.isArray(x)){let S=0;for(let I=0;I<x.length;I++){let R=x[I],D=_(R,!0);f(R,v.__data,S),S+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else f(x,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,v.__data)}}function f(v,b,y){typeof v=="number"||typeof v=="boolean"?b[y]=v:v.isMatrix3?(b[y]=v.elements[0],b[y+1]=v.elements[1],b[y+2]=v.elements[2],b[y+3]=0,b[y+4]=v.elements[3],b[y+5]=v.elements[4],b[y+6]=v.elements[5],b[y+7]=0,b[y+8]=v.elements[6],b[y+9]=v.elements[7],b[y+10]=v.elements[8],b[y+11]=0):ArrayBuffer.isView(v)?b.set(v.subarray(0,b.length-y),y):v.toArray(b,y)}function u(v,b,y,A){let T=v.value,x=b+"_"+y;if(Array.isArray(T)){A[x]===void 0&&(A[x]=[]);let S=A[x],I=!1;for(let R=0;R<T.length;R++)d(T[R],S,R)===!0&&(I=!0);return I}return d(T,A,x)}function d(v,b,y){if(b[y]===void 0)return typeof v=="number"||typeof v=="boolean"?b[y]=v:ArrayBuffer.isView(v)?b[y]=v.slice():b[y]=v.clone(),!0;{let A=b[y];if(typeof v=="number"||typeof v=="boolean"){if(A!==v)return b[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(A.equals(v)===!1)return A.copy(v),!0}}return!1}function m(v){let b=v.uniforms,y=0,A=16;for(let x=0,S=b.length;x<S;x++){let I=Array.isArray(b[x])?b[x]:[b[x]];for(let R=0,D=I.length;R<D;R++){let G=I[R],F=Array.isArray(G.value)?G.value:[G.value],C=Array.isArray(b[x])||Array.isArray(G.value),k=y;for(let O=0,J=F.length;O<J;O++){let q=F[O],it=_(q,C),K=y%A,mt=K%it.boundary,Ut=K+mt;y+=mt,Ut!==0&&A-Ut<it.storage&&(y+=A-Ut),O===0&&(k=y),y+=it.storage}let H=G.type==="int"?Int32Array:G.type==="uint"?Uint32Array:Float32Array;G.__data=new H((y-k)/Float32Array.BYTES_PER_ELEMENT),G.__offset=k}}let T=y%A;return T>0&&(y+=A-T),v.__size=y,v.__cache={},this}function _(v,b){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?Jt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Jt("WebGLRenderer: Unsupported uniform value type.",v),b===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function p(v){let b=v.target;b.removeEventListener("dispose",p),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function g(){for(let v in i)s.deleteBuffer(i[v]);i={},r={}}return{bind:a,update:o,dispose:g}}var Jb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),wi=null;function Kb(){return wi===null&&(wi=new Nl(Jb,16,16,Ms,ii),wi.name="DFG_LUT",wi.minFilter=mn,wi.magFilter=mn,wi.wrapS=xi,wi.wrapT=xi,wi.generateMipmaps=!1,wi.needsUpdate=!0),wi}var Kc=class{constructor(t={}){let{canvas:e=Cm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=An}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=d,p=new Set([gc,mc,pc]),g=new Set([An,ei,Yr,tr,dc,fc]),v=new Uint32Array(4),b=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},A=null,T=null,x=[],S=[],I=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,D=!1,G=null,F=null,C=null,k=null;this._outputColorSpace=fn;let H=0,O=0,J=null,q=-1,it=null,K=new Ce,mt=new Ce,Ut=null,tt=new ne(0),z=0,nt=e.width,at=e.height,Y=1,gt=null,Ot=null,Et=new Ce(0,0,nt,at),Ct=new Ce(0,0,nt,at),zt=!1,ot=new gs,P=new Ul,V=!1,et=!1,L=new Se,$=new W,rt=new Ce,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},dt=!1;function bt(){return J===null?Y:1}let N=n;function Kt(w,B){return e.getContext(w,B)}let Vt,Xt,pt,Qt,Lt,kt,E,M,X,_t,ft,yt,At,ct,ht,St,U,ut,lt,Tt,Mt,wt,Yt;try{let w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Zt,!1),e.addEventListener("webglcontextrestored",ie,!1),e.addEventListener("webglcontextcreationerror",Dt,!1),N===null){let B="webgl2";if(N=Kt(B,w),N===null)throw Kt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}se()}catch(w){throw e.removeEventListener("webglcontextlost",Zt,!1),e.removeEventListener("webglcontextrestored",ie,!1),e.removeEventListener("webglcontextcreationerror",Dt,!1),jt("WebGLRenderer: "+w.message),w}function se(){Vt=new lS(N),Vt.init(),Mt=new Wb(N,Vt),Xt=new KM(N,Vt,t,Mt),pt=new Gb(N,Vt),Xt.reversedDepthBuffer&&u&&pt.buffers.depth.setReversed(!0),F=N.createFramebuffer(),C=N.createFramebuffer(),k=N.createFramebuffer(),Qt=new uS(N),Lt=new Cb,kt=new Hb(N,Vt,pt,Lt,Xt,Mt,Qt),E=new oS(R),M=new fv(N),wt=new ZM(N,M),X=new cS(N,M,Qt,wt),_t=new fS(N,X,M,wt,Qt),ut=new dS(N,Xt,kt),ht=new jM(Lt),ft=new Eb(R,E,Vt,Xt,wt,ht),yt=new Yb(R,Lt),At=new Pb,ct=new Ob(Vt),U=new YM(R,E,pt,_t,m,l),St=new Vb(R,_t,Xt),Yt=new Zb(N,Qt,Xt,pt),lt=new JM(N,Vt,Qt),Tt=new hS(N,Vt,Qt),Qt.programs=ft.programs,R.capabilities=Xt,R.extensions=Vt,R.properties=Lt,R.renderLists=At,R.shadowMap=St,R.state=pt,R.info=Qt}_!==An&&(I=new mS(_,e.width,e.height,o,i,r));let vt=new Ld(R,N);this.xr=vt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let w=Vt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Vt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(w){w!==void 0&&(Y=w,this.setSize(nt,at,!1))},this.getSize=function(w){return w.set(nt,at)},this.setSize=function(w,B,st=!0){if(vt.isPresenting){Jt("WebGLRenderer: Can't change size while VR device is presenting.");return}nt=w,at=B,e.width=Math.floor(w*Y),e.height=Math.floor(B*Y),st===!0&&(e.style.width=w+"px",e.style.height=B+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(nt*Y,at*Y).floor()},this.setDrawingBufferSize=function(w,B,st){nt=w,at=B,Y=st,e.width=Math.floor(w*st),e.height=Math.floor(B*st),this.setViewport(0,0,w,B)},this.setEffects=function(w){if(_===An){jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let B=0;B<w.length;B++)if(w[B].isOutputPass===!0){Jt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(K)},this.getViewport=function(w){return w.copy(Et)},this.setViewport=function(w,B,st,Z){w.isVector4?Et.set(w.x,w.y,w.z,w.w):Et.set(w,B,st,Z),pt.viewport(K.copy(Et).multiplyScalar(bt()).round())},this.getScissor=function(w){return w.copy(Ct)},this.setScissor=function(w,B,st,Z){w.isVector4?Ct.set(w.x,w.y,w.z,w.w):Ct.set(w,B,st,Z),pt.scissor(mt.copy(Ct).multiplyScalar(bt()).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(w){pt.setScissorTest(zt=w)},this.setOpaqueSort=function(w){gt=w},this.setTransparentSort=function(w){Ot=w},this.getClearColor=function(w){return w.copy(U.getClearColor())},this.setClearColor=function(){U.setClearColor(...arguments)},this.getClearAlpha=function(){return U.getClearAlpha()},this.setClearAlpha=function(){U.setClearAlpha(...arguments)},this.clear=function(w=!0,B=!0,st=!0){let Z=0;if(w){let j=!1;if(J!==null){let Pt=J.texture.format;j=p.has(Pt)}if(j){let Pt=J.texture.type,Gt=g.has(Pt),Rt=U.getClearColor(),Ft=U.getClearAlpha(),qt=Rt.r,ee=Rt.g,le=Rt.b;Gt?(v[0]=qt,v[1]=ee,v[2]=le,v[3]=Ft,N.clearBufferuiv(N.COLOR,0,v)):(b[0]=qt,b[1]=ee,b[2]=le,b[3]=Ft,N.clearBufferiv(N.COLOR,0,b))}else Z|=N.COLOR_BUFFER_BIT}B&&(Z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),st&&(Z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&N.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),G=w},this.dispose=function(){e.removeEventListener("webglcontextlost",Zt,!1),e.removeEventListener("webglcontextrestored",ie,!1),e.removeEventListener("webglcontextcreationerror",Dt,!1),U.dispose(),At.dispose(),ct.dispose(),kt.dispose(),Lt.dispose(),E.dispose(),_t.dispose(),X.dispose(),wt.dispose(),Yt.dispose(),ft.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",Kd),vt.removeEventListener("sessionend",jd),Cs.stop()};function Zt(w){w.preventDefault(),ud("WebGLRenderer: Context Lost."),D=!0}function ie(){ud("WebGLRenderer: Context Restored."),D=!1;let w=Qt.autoReset,B=St.enabled,st=St.autoUpdate,Z=St.needsUpdate,j=St.type;se(),Qt.autoReset=w,St.enabled=B,St.autoUpdate=st,St.needsUpdate=Z,St.type=j}function Dt(w){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function _e(w){let B=w.target;B.removeEventListener("dispose",_e),Xe(B)}function Xe(w){Ki(w),Lt.remove(w)}function Ki(w){let B=Lt.get(w).programs;B!==void 0&&(B.forEach(function(st){ft.releaseProgram(st)}),w.isShaderMaterial&&ft.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,st,Z,j,Pt){B===null&&(B=xt);let Gt=j.isMesh&&j.matrixWorld.determinantAffine()<0,Rt=dg(w,B,st,Z,j);pt.setMaterial(Z,Gt);let Ft=st.index,qt=1;if(Z.wireframe===!0){if(Ft=X.getWireframeAttribute(st),Ft===void 0)return;qt=2}let ee=st.drawRange,le=st.attributes.position,Ht=ee.start*qt,ce=(ee.start+ee.count)*qt;Pt!==null&&(Ht=Math.max(Ht,Pt.start*qt),ce=Math.min(ce,(Pt.start+Pt.count)*qt)),Ft!==null?(Ht=Math.max(Ht,0),ce=Math.min(ce,Ft.count)):le!=null&&(Ht=Math.max(Ht,0),ce=Math.min(ce,le.count));let ze=ce-Ht;if(ze<0||ze===1/0)return;wt.setup(j,Z,Rt,st,Ft);let be,ye=lt;if(Ft!==null&&(be=M.get(Ft),ye=Tt,ye.setIndex(be)),j.isMesh)Z.wireframe===!0?(pt.setLineWidth(Z.wireframeLinewidth*bt()),ye.setMode(N.LINES)):ye.setMode(N.TRIANGLES);else if(j.isLine){let tn=Z.linewidth;tn===void 0&&(tn=1),pt.setLineWidth(tn*bt()),j.isLineSegments?ye.setMode(N.LINES):j.isLineLoop?ye.setMode(N.LINE_LOOP):ye.setMode(N.LINE_STRIP)}else j.isPoints?ye.setMode(N.POINTS):j.isSprite&&ye.setMode(N.TRIANGLES);if(j.isBatchedMesh)if(Vt.get("WEBGL_multi_draw"))ye.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let tn=j._multiDrawStarts,Wt=j._multiDrawCounts,hn=j._multiDrawCount,pe=Ft?M.get(Ft).bytesPerElement:1,Rs=Lt.get(Z).currentProgram.getUniforms();for(let en=0;en<hn;en++)Rs.setValue(N,"_gl_DrawID",en),ye.render(tn[en]/pe,Wt[en])}else if(j.isInstancedMesh)ye.renderInstances(Ht,ze,j.count);else if(st.isInstancedBufferGeometry){let tn=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,Wt=Math.min(st.instanceCount,tn);ye.renderInstances(Ht,ze,Wt)}else ye.render(Ht,ze)};function Jd(w,B,st,Z){G!==null&&w.isNodeMaterial&&G.setObject(Z,w),V===!0&&ht.setState(w,st,!1),w.transparent===!0&&w.side===Si&&w.forceSinglePass===!1?(w.side=gn,w.needsUpdate=!0,ia(w,B,Z),w.side=ys,w.needsUpdate=!0,ia(w,B,Z),w.side=Si):ia(w,B,Z)}this.compile=function(w,B,st=null){st===null&&(st=w),G!==null&&G.renderStart(w,B,st),T=ct.get(st),T.init(B),S.push(T),st.traverseVisible(function(j){j.isLight&&j.layers.test(B.layers)&&(T.pushLight(j),j.castShadow&&T.pushShadow(j))}),w!==st&&w.traverseVisible(function(j){j.isLight&&j.layers.test(B.layers)&&(T.pushLight(j),j.castShadow&&T.pushShadow(j))}),T.setupLights(),G!==null&&G.updateLights(T.state.lightsArray),et=this.localClippingEnabled,V=ht.init(this.clippingPlanes,et),V===!0&&ht.setGlobalState(this.clippingPlanes,B),G!==null&&St.render(T.state.shadowsArray,st,B);let Z=new Set;return w.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let Pt=j.material;if(Pt)if(Array.isArray(Pt))for(let Gt=0;Gt<Pt.length;Gt++){let Rt=Pt[Gt];Jd(Rt,st,B,j),Z.add(Rt)}else Jd(Pt,st,B,j),Z.add(Pt)}),T=S.pop(),G!==null&&G.renderEnd(),Z},this.compileAsync=function(w,B,st=null){let Z=this.compile(w,B,st);return new Promise(j=>{function Pt(){if(Z.forEach(function(Gt){let Ft=Lt.get(Gt).currentProgram;(Ft===void 0||Ft.isReady())&&Z.delete(Gt)}),Z.size===0){j(w);return}setTimeout(Pt,10)}Vt.get("KHR_parallel_shader_compile")!==null?Pt():setTimeout(Pt,10)})};let uh=null;function hg(w){uh&&uh(w)}function Kd(){Cs.stop()}function jd(){Cs.start()}let Cs=new l0;Cs.setAnimationLoop(hg),typeof self<"u"&&Cs.setContext(self),this.setAnimationLoop=function(w){uh=w,vt.setAnimationLoop(w),w===null?Cs.stop():Cs.start()},vt.addEventListener("sessionstart",Kd),vt.addEventListener("sessionend",jd),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;G!==null&&G.renderStart(w,B);let st=vt.enabled===!0&&vt.isPresenting===!0,Z=I!==null&&(J===null||st)&&I.begin(R,J);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(vt.cameraAutoUpdate===!0&&vt.updateCamera(B),B=vt.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,B,J),T=ct.get(w,S.length),T.init(B),T.state.textureUnits=kt.getTextureUnits(),S.push(T),L.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?P.setFromArrayCamera(B):ot.setFromProjectionMatrix(L,Wn,B.reversedDepth),et=this.localClippingEnabled,V=ht.init(this.clippingPlanes,et),A=At.get(w,x.length),A.init(),x.push(A),this.info.render.frame++,vt.enabled===!0&&vt.isPresenting===!0){let Gt=R.xr.getDepthSensingMesh();Gt!==null&&dh(Gt,B,-1/0,R.sortObjects)}dh(w,B,0,R.sortObjects),A.finish(),G!==null&&G.updateLights(T.state.lightsArray),R.sortObjects===!0&&A.sort(gt,Ot),dt=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,dt&&U.addToRenderList(A,w),this.info.autoReset===!0&&this.info.reset(),V===!0&&ht.beginShadows();let j=T.state.shadowsArray;if(St.render(j,w,B),V===!0&&ht.endShadows(),(Z&&I.hasRenderPass())===!1){let Gt=A.opaque,Rt=A.transmissive;if(T.setupLights(),B.isArrayCamera){let Ft=B.cameras;if(Rt.length>0)for(let qt=0,ee=Ft.length;qt<ee;qt++){let le=Ft[qt];tf(Gt,Rt,w,le)}dt&&U.render(w);for(let qt=0,ee=Ft.length;qt<ee;qt++){let le=Ft[qt];Qd(A,w,le,le.viewport)}}else Rt.length>0&&tf(Gt,Rt,w,B),dt&&U.render(w),Qd(A,w,B)}J!==null&&O===0&&(kt.updateMultisampleRenderTarget(J),kt.updateRenderTargetMipmap(J)),Z&&I.end(R),w.isScene===!0&&w.onAfterRender(R,w,B),wt.resetDefaultState(),q=-1,it=null,S.pop(),S.length>0?(T=S[S.length-1],kt.setTextureUnits(T.state.textureUnits),V===!0&&ht.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,G!==null&&G.renderEnd()};function dh(w,B,st,Z){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)st=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){let Gt=B.isArrayCamera?P:ot;if(!w.frustumCulled||w.intersectsFrustum(Gt)){Z&&rt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(L);let Rt=_t.update(w),Ft=w.material;Ft.visible&&A.push(w,Rt,Ft,st,rt.z,null,B)}}else if(w.isMesh||w.isLine||w.isPoints){let Gt=B.isArrayCamera?P:ot;if(!w.frustumCulled||w.intersectsFrustum(Gt)){let Rt=_t.update(w),Ft=w.material;if(Z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),rt.copy(w.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),rt.copy(Rt.boundingSphere.center)),rt.applyMatrix4(w.matrixWorld).applyMatrix4(L)),Array.isArray(Ft)){let qt=Rt.groups;for(let ee=0,le=qt.length;ee<le;ee++){let Ht=qt[ee],ce=Ft[Ht.materialIndex];ce&&ce.visible&&A.push(w,Rt,ce,st,rt.z,Ht,B)}}else Ft.visible&&A.push(w,Rt,Ft,st,rt.z,null,B)}}}let Pt=w.children;for(let Gt=0,Rt=Pt.length;Gt<Rt;Gt++)dh(Pt[Gt],B,st,Z)}function Qd(w,B,st,Z){let{opaque:j,transmissive:Pt,transparent:Gt}=w;T.setupLightsView(st),V===!0&&ht.setGlobalState(R.clippingPlanes,st),Z&&pt.viewport(K.copy(Z)),j.length>0&&wo(j,B,st),Pt.length>0&&wo(Pt,B,st),Gt.length>0&&wo(Gt,B,st),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function tf(w,B,st,Z){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[Z.id]===void 0){let Ht=Vt.has("EXT_color_buffer_half_float")||Vt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[Z.id]=new Dn(1,1,{generateMipmaps:!0,type:Ht?ii:An,minFilter:qi,samples:Math.max(4,Xt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:he.workingColorSpace})}let Pt=T.state.transmissionRenderTarget[Z.id],Gt=Z.viewport||K;Pt.setSize(Gt.z*R.transmissionResolutionScale,Gt.w*R.transmissionResolutionScale);let Rt=R.getRenderTarget(),Ft=R.getActiveCubeFace(),qt=R.getActiveMipmapLevel();R.setRenderTarget(Pt),R.getClearColor(tt),z=R.getClearAlpha(),z<1&&R.setClearColor(16777215,.5),R.clear(),dt&&U.render(st);let ee=R.toneMapping;R.toneMapping=bi;let le=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),T.setupLightsView(Z),V===!0&&ht.setGlobalState(R.clippingPlanes,Z),wo(w,st,Z),kt.updateMultisampleRenderTarget(Pt),kt.updateRenderTargetMipmap(Pt),Vt.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let ce=0,ze=B.length;ce<ze;ce++){let be=B[ce],{object:ye,geometry:tn,material:Wt,group:hn}=be;if(Wt.side===Si&&ye.layers.test(Z.layers)){let pe=Wt.side;Wt.side=gn,Wt.needsUpdate=!0,ef(ye,st,Z,tn,Wt,hn),Wt.side=pe,Wt.needsUpdate=!0,Ht=!0}}Ht===!0&&(kt.updateMultisampleRenderTarget(Pt),kt.updateRenderTargetMipmap(Pt))}R.setRenderTarget(Rt,Ft,qt),R.setClearColor(tt,z),le!==void 0&&(Z.viewport=le),R.toneMapping=ee}function wo(w,B,st){let Z=B.isScene===!0?B.overrideMaterial:null;for(let j=0,Pt=w.length;j<Pt;j++){let Gt=w[j],{object:Rt,geometry:Ft,group:qt}=Gt,ee=Gt.material;ee.allowOverride===!0&&Z!==null&&(ee=Z),Rt.layers.test(st.layers)&&ef(Rt,B,st,Ft,ee,qt)}}function ef(w,B,st,Z,j,Pt){G!==null&&j.isNodeMaterial&&G.setObject(w,j),w.onBeforeRender(R,B,st,Z,j,Pt),w.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),j.onBeforeRender(R,B,st,Z,w,Pt),j.transparent===!0&&j.side===Si&&j.forceSinglePass===!1?(j.side=gn,j.needsUpdate=!0,R.renderBufferDirect(st,B,Z,j,w,Pt),j.side=ys,j.needsUpdate=!0,R.renderBufferDirect(st,B,Z,j,w,Pt),j.side=Si):R.renderBufferDirect(st,B,Z,j,w,Pt),w.onAfterRender(R,B,st,Z,j,Pt)}function nf(w){let B=0;for(let st of w)st.texture!==null&&B++;return B}function ia(w,B,st){B.isScene!==!0&&(B=xt);let Z=Lt.get(w),j=T.state.lights,Pt=T.state.shadowsArray,Gt=j.state.version,Rt=ft.getParameters(w,j.state,Pt,B,st,T.state.lightProbeGridArray),Ft=ft.getProgramCacheKey(Rt),qt=Z.programs;Z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?B.environment:null,Z.fog=B.fog;let ee=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;Z.envMap=E.get(w.envMap||Z.environment,ee),Z.envMapRotation=Z.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,qt===void 0&&(w.addEventListener("dispose",_e),qt=new Map,Z.programs=qt,Z.programVariants=new Map);let le=qt.get(Ft);if(le!==void 0){if(Z.currentProgram===le&&Z.lightsStateVersion===Gt)return rf(w,Rt),le}else Rt.uniforms=ft.getUniforms(w),G!==null&&w.isNodeMaterial&&G.build(w,st,Rt),w.onBeforeCompile(Rt,R),le=ft.acquireProgram(Rt,Ft),qt.set(Ft,le),Z.uniforms=Rt.uniforms;let Ht=Z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ht.clippingPlanes=ht.uniform),rf(w,Rt),Z.needsLights=pg(w),Z.lightsStateVersion=Gt,Z.needsLights&&(Ht.ambientLightColor.value=j.state.ambient,Ht.lightProbe.value=j.state.probe,Ht.sunLights.value=j.state.sun,Ht.sunLightShadows.value=j.state.sunShadow,Ht.directionalLights.value=j.state.directional,Ht.directionalLightShadows.value=j.state.directionalShadow,Ht.spotLights.value=j.state.spot,Ht.spotLightShadows.value=j.state.spotShadow,Ht.rectAreaLights.value=j.state.rectArea,Ht.ltc_1.value=j.state.rectAreaLTC1,Ht.ltc_2.value=j.state.rectAreaLTC2,Ht.pointLights.value=j.state.point,Ht.pointLightShadows.value=j.state.pointShadow,Ht.hemisphereLights.value=j.state.hemi,Ht.sunShadowMatrix.value=j.state.sunShadowMatrix,Ht.sunShadowCascade.value=j.state.sunShadowCascade,Ht.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ht.spotLightMatrix.value=j.state.spotLightMatrix,Ht.spotLightMap.value=j.state.spotLightMap,Ht.pointShadowMatrix.value=j.state.pointShadowMatrix),Z.numLightProbeGrids=nf(T.state.lightProbeGridArray),Z.currentProgram=le,Z.uniformsList=null,le}function ug(w,B,st,Z,j){let Pt=Lt.get(w),Gt=Pt.currentProgram.id+","+Z+","+j,Rt=Pt.programVariants.get(Gt);return Rt===void 0?(Rt=ia(w,B,st),Pt.programVariants.set(Gt,Rt)):(Pt.currentProgram=Rt,Pt.uniformsList=null,Pt.outputColorSpace=Z,Pt.toneMapping=j),Rt}function sf(w){if(w.uniformsList===null){let B=w.currentProgram.getUniforms();w.uniformsList=Jr.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function rf(w,B){let st=Lt.get(w);st.outputColorSpace=B.outputColorSpace,st.batching=B.batching,st.batchingColor=B.batchingColor,st.instancing=B.instancing,st.instancingColor=B.instancingColor,st.instancingMorph=B.instancingMorph,st.skinning=B.skinning,st.morphTargets=B.morphTargets,st.morphNormals=B.morphNormals,st.morphColors=B.morphColors,st.morphTargetsCount=B.morphTargetsCount,st.numClippingPlanes=B.numClippingPlanes,st.numIntersection=B.numClipIntersection,st.vertexAlphas=B.vertexAlphas,st.vertexTangents=B.vertexTangents,st.toneMapping=B.toneMapping}function dg(w,B,st,Z,j){B.isScene!==!0&&(B=xt),kt.resetTextureUnits();let Pt=B.fog,Gt=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?B.environment:null,Rt=J===null?R.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:he.workingColorSpace,Ft=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,qt=E.get(Z.envMap||Gt,Ft),ee=Z.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,le=!!st.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ht=!!st.morphAttributes.position,ce=!!st.morphAttributes.normal,ze=!!st.morphAttributes.color,be=bi;Z.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(be=R.toneMapping);let ye=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,tn=ye!==void 0?ye.length:0,Wt=Lt.get(Z),hn=T.state.lights;if(V===!0&&(et===!0||w!==it)){let Re=w===it&&Z.id===q;ht.setState(Z,w,Re)}let pe=!1,Rs=!1;Z.version===Wt.__version?Wt.needsLights&&Wt.lightsStateVersion!==hn.state.version||j.isBatchedMesh&&Wt.batching===!1||!j.isBatchedMesh&&Wt.batching===!0||j.isBatchedMesh&&Wt.batchingColor===!0&&j._colorsTexture===null||j.isBatchedMesh&&Wt.batchingColor===!1&&j._colorsTexture!==null||j.isInstancedMesh&&Wt.instancing===!1||!j.isInstancedMesh&&Wt.instancing===!0||j.isSkinnedMesh&&Wt.skinning===!1||!j.isSkinnedMesh&&Wt.skinning===!0||j.isInstancedMesh&&Wt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Wt.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Wt.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Wt.instancingMorph===!1&&j.morphTexture!==null||Wt.envMap!==qt||Z.fog===!0&&Wt.fog!==Pt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==ht.numPlanes||Wt.numIntersection!==ht.numIntersection)||Wt.vertexAlphas!==ee||Wt.vertexTangents!==le||Wt.morphTargets!==Ht||Wt.morphNormals!==ce||Wt.morphColors!==ze||Wt.morphTargetsCount!==tn||Wt.numLightProbeGrids!==nf(T.state.lightProbeGridArray)?pe=!0:(Wt.outputColorSpace!==Rt||Wt.toneMapping!==be)&&(Rs=!0):(pe=!0,Wt.__version=Z.version);let en=Wt.currentProgram;(pe===!0||Rs===!0)&&(en=Rs===!0?ug(Z,B,j,Rt,be):ia(Z,B,j),G&&Z.isNodeMaterial&&G.onUpdateProgram(Z,en,Wt));let Ao=!1,ji=!1,Ps=!1,fe=en.getUniforms(),Je=Wt.uniforms;if(pt.useProgram(en.program)&&(Ao=!0,ji=!0,Ps=!0),Z.id!==q&&(q=Z.id,ji=!0),Ao||it!==w){pt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),fe.setValue(N,"projectionMatrix",w.projectionMatrix),fe.setValue(N,"viewMatrix",w.matrixWorldInverse);let qe=fe.map.cameraPosition;qe!==void 0&&qe.setValue(N,$.setFromMatrixPosition(w.matrixWorld)),Xt.logarithmicDepthBuffer&&fe.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&fe.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),it!==w&&(it=w,ji=!0,Ps=!0)}if(Wt.needsLights&&(hn.state.sunShadowMap.length>0&&fe.setValue(N,"sunShadowMap",hn.state.sunShadowMap,kt),hn.state.directionalShadowMap.length>0&&fe.setValue(N,"directionalShadowMap",hn.state.directionalShadowMap,kt),hn.state.spotShadowMap.length>0&&fe.setValue(N,"spotShadowMap",hn.state.spotShadowMap,kt),hn.state.pointShadowMap.length>0&&fe.setValue(N,"pointShadowMap",hn.state.pointShadowMap,kt)),j.isSkinnedMesh){fe.setOptional(N,j,"bindMatrix"),fe.setOptional(N,j,"bindMatrixInverse");let Re=j.skeleton;Re&&(Re.boneTexture===null&&Re.computeBoneTexture(),fe.setValue(N,"boneTexture",Re.boneTexture,kt))}j.isBatchedMesh&&(fe.setOptional(N,j,"batchingTexture"),fe.setValue(N,"batchingTexture",j._matricesTexture,kt),fe.setOptional(N,j,"batchingIdTexture"),fe.setValue(N,"batchingIdTexture",j._indirectTexture,kt),fe.setOptional(N,j,"batchingColorTexture"),j._colorsTexture!==null&&fe.setValue(N,"batchingColorTexture",j._colorsTexture,kt));let Zn=st.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&ut.update(j,st,en),(ji||Wt.receiveShadow!==j.receiveShadow)&&(Wt.receiveShadow=j.receiveShadow,fe.setValue(N,"receiveShadow",j.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&B.environment!==null&&(Je.envMapIntensity.value=B.environmentIntensity),Je.dfgLUT!==void 0&&(Je.dfgLUT.value=Kb()),ji){if(fe.setValue(N,"toneMappingExposure",R.toneMappingExposure),Wt.needsLights&&fg(Je,Ps),Pt&&Z.fog===!0&&yt.refreshFogUniforms(Je,Pt),yt.refreshMaterialUniforms(Je,Z,Y,at,T.state.transmissionRenderTarget[w.id]),Wt.needsLights&&Wt.numLightProbeGrids>0){let Re=y,qe=0;for(let Pi of T.state.lightProbeGridArray)Pi.texture!==null&&(Re.textures[qe]=Pi.texture,Re.min[qe]=Pi.boundingBox.min,Re.max[qe]=Pi.boundingBox.max,Re.resolution[qe]=Pi.resolution,qe++);for(let Pi in Re)Re[Pi].length=qe;Je.probesSH.value=Re.textures,Je.probesMin.value=Re.min,Je.probesMax.value=Re.max,Je.probesResolution.value=Re.resolution}Jr.upload(N,sf(Wt),Je,kt)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Jr.upload(N,sf(Wt),Je,kt),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&fe.setValue(N,"center",j.center),fe.setValue(N,"modelViewMatrix",j.modelViewMatrix),fe.setValue(N,"normalMatrix",j.normalMatrix),fe.setValue(N,"modelMatrix",j.matrixWorld),Z.uniformsGroups!==void 0){let Re=Z.uniformsGroups;for(let qe=0,Pi=Re.length;qe<Pi;qe++){let of=Re[qe];Yt.update(of,en),Yt.bind(of,en)}}return en}function fg(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.sunLights.needsUpdate=B,w.sunLightShadows.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function pg(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(w,B,st){let Z=Lt.get(w);Z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Lt.get(w.texture).__webglTexture=B,Lt.get(w.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:st,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,B){let st=Lt.get(w);st.__webglFramebuffer=B,st.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(w,B=0,st=0){J=w,H=B,O=st;let Z=null,j=!1,Pt=!1;if(w){let Rt=Lt.get(w);if(Rt.__useDefaultFramebuffer!==void 0){pt.bindFramebuffer(N.FRAMEBUFFER,Rt.__webglFramebuffer),K.copy(w.viewport),mt.copy(w.scissor),Ut=w.scissorTest,pt.viewport(K),pt.scissor(mt),pt.setScissorTest(Ut),q=-1;return}else if(Rt.__webglFramebuffer===void 0)kt.setupRenderTarget(w);else if(Rt.__hasExternalTextures)kt.rebindTextures(w,Lt.get(w.texture).__webglTexture,Lt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let ee=w.depthTexture;if(Rt.__boundDepthTexture!==ee){if(ee!==null&&Lt.has(ee)&&(w.width!==ee.image.width||w.height!==ee.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(w)}}let Ft=w.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(Pt=!0);let qt=Lt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(qt[B])?Z=qt[B][st]:Z=qt[B],j=!0):w.samples>0&&kt.useMultisampledRTT(w)===!1?Z=Lt.get(w).__webglMultisampledFramebuffer:Array.isArray(qt)?Z=qt[st]:Z=qt,K.copy(w.viewport),mt.copy(w.scissor),Ut=w.scissorTest}else K.copy(Et).multiplyScalar(Y).floor(),mt.copy(Ct).multiplyScalar(Y).floor(),Ut=zt;if(st!==0&&(Z=F),pt.bindFramebuffer(N.FRAMEBUFFER,Z)&&pt.drawBuffers(w,Z),pt.viewport(K),pt.scissor(mt),pt.setScissorTest(Ut),j){let Rt=Lt.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,Rt.__webglTexture,st)}else if(Pt){let Rt=B;for(let Ft=0;Ft<w.textures.length;Ft++){let qt=Lt.get(w.textures[Ft]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ft,qt.__webglTexture,st,Rt)}}else if(w!==null&&st!==0){let Rt=Lt.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Rt.__webglTexture,st)}q=-1};function af(w){let B=Lt.get(w);return(B.__readFormat!==w.format||B.__readType!==w.type)&&(B.__readFormat=w.format,B.__readType=w.type,B.__formatReadable=Xt.textureFormatReadable(w.format),B.__typeReadable=Xt.textureTypeReadable(w.type)),B}this.readRenderTargetPixels=function(w,B,st,Z,j,Pt,Gt,Rt=0){if(!(w&&w.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=Lt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Gt!==void 0&&(Ft=Ft[Gt],Array.isArray(Ft)&&(Ft=Ft[0])),Ft){pt.bindFramebuffer(N.FRAMEBUFFER,Ft);try{let qt=w.textures[Rt],ee=qt.format,le=qt.type;w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Rt);let Ht=af(qt);if(Ht.__formatReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ht.__typeReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-Z&&st>=0&&st<=w.height-j&&N.readPixels(B,st,Z,j,Mt.convert(ee),Mt.convert(le),Pt)}finally{let qt=J!==null?Lt.get(J).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,qt)}}},this.readRenderTargetPixelsAsync=async function(w,B,st,Z,j,Pt,Gt,Rt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=Lt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Gt!==void 0&&(Ft=Ft[Gt],Array.isArray(Ft)&&(Ft=Ft[0])),Ft)if(B>=0&&B<=w.width-Z&&st>=0&&st<=w.height-j){pt.bindFramebuffer(N.FRAMEBUFFER,Ft);let qt=w.textures[Rt],ee=qt.format,le=qt.type;w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Rt);let Ht=af(qt);if(Ht.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ht.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ce=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ce),N.bufferData(N.PIXEL_PACK_BUFFER,Pt.byteLength,N.STREAM_READ),N.readPixels(B,st,Z,j,Mt.convert(ee),Mt.convert(le),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let ze=J!==null?Lt.get(J).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,ze);let be=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Pm(N,be,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ce),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Pt),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(ce),N.deleteSync(be),Pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,B=null,st=0){let Z=Math.pow(2,-st),j=Math.floor(w.image.width*Z),Pt=Math.floor(w.image.height*Z),Gt=B!==null?B.x:0,Rt=B!==null?B.y:0;kt.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,st,0,0,Gt,Rt,j,Pt),pt.unbindTexture()},this.copyTextureToTexture=function(w,B,st=null,Z=null,j=0,Pt=0){let Gt,Rt,Ft,qt,ee,le,Ht,ce,ze,be=w.isCompressedTexture?w.mipmaps[Pt]:w.image;if(st!==null)Gt=st.max.x-st.min.x,Rt=st.max.y-st.min.y,Ft=st.isBox3?st.max.z-st.min.z:1,qt=st.min.x,ee=st.min.y,le=st.isBox3?st.min.z:0;else{let fe=Math.pow(2,-j);Gt=Math.floor(be.width*fe),Rt=Math.floor(be.height*fe),w.isDataArrayTexture?Ft=be.depth:w.isData3DTexture?Ft=Math.floor(be.depth*fe):Ft=1,qt=0,ee=0,le=0}Z!==null?(Ht=Z.x,ce=Z.y,ze=Z.z):(Ht=0,ce=0,ze=0);let ye=Mt.convert(B.format),tn=Mt.convert(B.type),Wt;B.isData3DTexture?(kt.setTexture3D(B,0),Wt=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(kt.setTexture2DArray(B,0),Wt=N.TEXTURE_2D_ARRAY):(kt.setTexture2D(B,0),Wt=N.TEXTURE_2D),pt.activeTexture(N.TEXTURE0),pt.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),pt.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),pt.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);let hn=pt.getParameter(N.UNPACK_ROW_LENGTH),pe=pt.getParameter(N.UNPACK_IMAGE_HEIGHT),Rs=pt.getParameter(N.UNPACK_SKIP_PIXELS),en=pt.getParameter(N.UNPACK_SKIP_ROWS),Ao=pt.getParameter(N.UNPACK_SKIP_IMAGES);pt.pixelStorei(N.UNPACK_ROW_LENGTH,be.width),pt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,be.height),pt.pixelStorei(N.UNPACK_SKIP_PIXELS,qt),pt.pixelStorei(N.UNPACK_SKIP_ROWS,ee),pt.pixelStorei(N.UNPACK_SKIP_IMAGES,le);let ji=w.isDataArrayTexture||w.isData3DTexture,Ps=B.isDataArrayTexture||B.isData3DTexture;if(w.isDepthTexture){let fe=Lt.get(w),Je=Lt.get(B),Zn=Lt.get(fe.__renderTarget),Re=Lt.get(Je.__renderTarget);pt.bindFramebuffer(N.READ_FRAMEBUFFER,Zn.__webglFramebuffer),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let qe=0;qe<Ft;qe++)ji&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Lt.get(w).__webglTexture,j,le+qe),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Lt.get(B).__webglTexture,Pt,ze+qe)),N.blitFramebuffer(qt,ee,qt+Gt,ee+Rt,Ht,ce,Ht+Gt,ce+Rt,N.DEPTH_BUFFER_BIT,N.NEAREST);pt.bindFramebuffer(N.READ_FRAMEBUFFER,null),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(j!==0||w.isRenderTargetTexture||Lt.has(w)){let fe=Lt.get(w),Je=Lt.get(B);pt.bindFramebuffer(N.READ_FRAMEBUFFER,C),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,k);for(let Zn=0;Zn<Ft;Zn++)ji?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,fe.__webglTexture,j,le+Zn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,j),Ps?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Je.__webglTexture,Pt,ze+Zn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Je.__webglTexture,Pt),j!==0?N.blitFramebuffer(qt,ee,qt+Gt,ee+Rt,Ht,ce,Ht+Gt,ce+Rt,N.COLOR_BUFFER_BIT,N.NEAREST):Ps?N.copyTexSubImage3D(Wt,Pt,Ht,ce,ze+Zn,qt,ee,Gt,Rt):N.copyTexSubImage2D(Wt,Pt,Ht,ce,qt,ee,Gt,Rt);pt.bindFramebuffer(N.READ_FRAMEBUFFER,null),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Ps?w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Wt,Pt,Ht,ce,ze,Gt,Rt,Ft,ye,tn,be.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(Wt,Pt,Ht,ce,ze,Gt,Rt,Ft,ye,be.data):N.texSubImage3D(Wt,Pt,Ht,ce,ze,Gt,Rt,Ft,ye,tn,be):w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Pt,Ht,ce,Gt,Rt,ye,tn,be.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Pt,Ht,ce,be.width,be.height,ye,be.data):N.texSubImage2D(N.TEXTURE_2D,Pt,Ht,ce,Gt,Rt,ye,tn,be);pt.pixelStorei(N.UNPACK_ROW_LENGTH,hn),pt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pe),pt.pixelStorei(N.UNPACK_SKIP_PIXELS,Rs),pt.pixelStorei(N.UNPACK_SKIP_ROWS,en),pt.pixelStorei(N.UNPACK_SKIP_IMAGES,Ao),Pt===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&N.generateMipmap(Wt),pt.unbindTexture()},this.initRenderTarget=function(w){Lt.get(w).__webglFramebuffer===void 0&&kt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?kt.setTextureCube(w,0):w.isData3DTexture?kt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?kt.setTexture2DArray(w,0):kt.setTexture2D(w,0),pt.unbindTexture()},this.resetState=function(){H=0,O=0,J=null,pt.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}};var ri={ink:"#07090d",bg:"#14161b",text:"#eef0f3",muted:"#9aa1ad",amber:"#f5a524",gold:"#ffcf7a",field:"#5fb37c",sky:"#5fb3ff",blue:"#4ea1ff",coral:"#ff6b5e",origin:"#ffd28a",dest:"#9fd1ff",melonO:"#5fd07a",melonD:"#ff5a6e"},Nd=[["#5a6272","#3a4a66"],["#f5a524","#3f9b6a"],["#f5a524","#ffcf7a"],["#d99a4a","#4a78c8"],["#f5a524","#8a6a3a"],["#c58a3a","#3f9b6a"],["#3f9b6a","#4f9fe8"],["#e9b85a","#3d7fd9"],["#e9b85a","#3d7fd9"],["#5fb37c","#e0b04a"],["#5fb3ff","#3f9b6a"],["#5fd07a","#c0504a"],["#ff8a6b","#c58a3a"],["#f5a524","#3cc0b0"],["#2f9fb0","#5f6ee8"],["#f5a524","#c0603a"],["#7cc98f","#3f8fd0"],["#8f9dff","#7cc98f"],["#c58a3a","#3f9b8a"],["#f5a524","#8a6a3a"],["#f5a524","#5fb37c"]],mo=["#3b2a12","#8a5a17","#d98e1f","#f5a524","#ffd98a"],Zi={lo:"#4ea1ff",mid:"#3a404c",hi:"#f5a524",na:"#2f343e"},jr=["#14301f","#1f5a3a","#3f9b6a","#7cc98f","#d4f2a8"],th=["#1a2c52","#24539a","#2f7fd6","#3fb0e6","#7fe0f0"],eh=["#6b4a2e","#a8582a","#e07a3a","#ff9a5a","#ffd9b0"],v0=["#2b4a8f","#2f86c9","#2fb3a8","#9cc56a","#f5a524"],Ss=s=>{let t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},Dd=s=>(s/=255,s<=.04045?s/12.92:((s+.055)/1.055)**2.4),jb=s=>255*(s<=.0031308?s*12.92:1.055*s**(1/2.4)-.055);function Qb(s,t,e){let n=Ss(s),i=Ss(t);return n.map((r,a)=>Math.round(jb(Dd(r)+(Dd(i[a])-Dd(r))*e)))}function Fn(s,t){t=Math.min(1,Math.max(0,t))*(s.length-1);let e=Math.min(s.length-2,Math.floor(t));return Qb(s[e],s[e+1],t-e)}var Te=([s,t,e],n=1)=>n===1?`rgb(${s},${t},${e})`:`rgba(${s},${t},${e},${n})`;var cn=1920,Ji=1080,t1=10,Ti=.06,e1=1.2,qn=s=>new ne(Array.isArray(s)?`rgb(${s.join(",")})`:s),Ud=s=>s<=0?0:s>=1?1:s*s*(3-2*s);function n1(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function Od(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function i1(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}var s1=`
attribute vec3 aStart; attribute float aDelay; attribute float aSeed; attribute vec3 aColor;
uniform float uMorph, uTime, uSize, uScale;
varying vec3 vColor; varying float vA;
float ease(float t){ return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) / 2.0; }
void main(){
  float t = clamp((uMorph - aDelay*0.45) / 0.55, 0.0, 1.0);
  float e = ease(t), sw = 1.0 - e;
  vec3 p = mix(aStart, position, e);
  p.x += sin(uTime*0.55 + aSeed*6.2831) * 0.45 * sw;
  p.y += cos(uTime*0.47 + aSeed*12.566) * 0.45 * sw;
  p.z += sin(uTime*0.8 + aSeed*30.0) * 0.25 * sw;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (1.0 + 1.6*sw) * uScale / -mv.z;
  float tw = 0.78 + 0.22 * sin(uTime*2.3 + aSeed*41.0);
  vColor = aColor; vA = mix(0.45, 1.0, e) * tw;
}`,r1=`
uniform float uAlpha; varying vec3 vColor; varying float vA;
void main(){
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r); a *= a;
  gl_FragColor = vec4(vColor, a * vA * uAlpha);
  #include <colorspace_fragment>
}`;function y0(s,t){let e=new Kc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.setClearColor(0,0),e.toneMapping=no,e.toneMappingExposure=1,e.outputColorSpace=fn,e.shadowMap.enabled=!0,e.shadowMap.type=Js;let n=new Na,i=new pn(30,cn/Ji,1,200),r=t1/t.Q,a=(L,$)=>[L*r,$*r];n.add(new Ka(14674175,1709064,.9)),n.add(new to(16777215,.18));let o=new Hr(16773596,2.6);o.position.set(-7,-11,17),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:50}),o.shadow.bias=-4e-4,n.add(o);let l=new Hr(9419519,.9);l.position.set(9,12,6),n.add(l);let c=new Nn(new Zs(60,60),new Za({opacity:.42,transparent:!0}));c.receiveShadow=!0,n.add(c);let h=Math.max(...Object.values(t.land.v).filter(Boolean)),f={cap:qn("#1f242d"),side:qn("#14171d")},u=Math.max(...Object.values(t.spots.dev)),d=Object.values(t.jikbul.v).sort((L,$)=>L-$),m=L=>{let $=0,rt=d.length-1;for(;$<rt;){let xt=$+rt>>1;d[xt]<L?$=xt+1:rt=xt}return .08+.92*($/(d.length-1))},_=new Vi;n.add(_);let p=t.map.sigun.map(L=>{let $=L.rings.map(([yt,...At])=>{let ct=St=>St.slice(0,-1).map(([ut,lt])=>new It(...a(ut,lt))),ht=new kr(ct(yt));return At.forEach(St=>ht.holes.push(new $s(ct(St)))),ht}),rt=new Ya($,{depth:1,bevelEnabled:!1,curveSegments:1}),xt=t.land.v[L.key],dt=xt?Math.sqrt(xt/h):0,bt=qn(xt?Fn(mo,.12+.88*dt):"#2a2620"),N=t.rice.dev[L.key],Kt=N==null?qn(Zi.na):qn(Zi.mid).lerp(qn(N<0?Zi.lo:Zi.hi),Math.min(1,Math.abs(N)/.05)**.8),Vt=t.jikbul.v[L.key],Xt=qn(Vt==null?"#262c28":Fn(jr,m(Vt))),pt=t.spots.dev[L.key]||0,Qt=qn(pt?Fn(th,.1+.9*(pt/u)**1.3):"#1d2430"),Lt=Ti+1.9*(pt/u)**1.8,kt=new Vr({roughness:.58,metalness:.04,transparent:!0}),E=new Vr({roughness:.75,metalness:0,transparent:!0}),M=new Nn(rt,[kt,E]);M.castShadow=M.receiveShadow=!0,M.scale.z=Ti,_.add(M);let[X,_t]=a(...L.c),ft=Math.min(1,Math.max(0,(X+4)/9*.45+(_t+5)/10*.55));return{key:L.key,mesh:M,cap:kt,side:E,h:Ti+(e1-Ti)*dt,landCol:bt,riceCol:Kt,jikCol:Xt,devCol:Qt,h2:Lt,cx:X,cy:_t,delay:ft,land:xt,rings:L.rings}}),g=new Map(p.map(L=>[L.key,L])),v=(L,$)=>{let rt=[];L.forEach(dt=>{for(let bt=1;bt<dt.length;bt++)rt.push(...a(...dt[bt-1]),$,...a(...dt[bt]),$)});let xt=new wn;return xt.setAttribute("position",new Ne(rt,3)),xt},b=new qs({color:qn("#cfd6e2"),transparent:!0,opacity:0,depthWrite:!1}),y=new qs({color:qn("#8d96a6"),transparent:!0,opacity:0,depthWrite:!1}),A=new Or(v(t.map.lineSido,0),b),T=new Or(v(t.map.lineSigun,0),y);A.renderOrder=T.renderOrder=2,_.add(A,T);let x=9e3,S=2400,I=i1(20261110),R=[],D=[],G=[],F=[],C=[],k=p.map(L=>(L.land||0)/Math.max(1e-6,L.rings.reduce(($,rt)=>$+Od(rt[0]),0))),H=[...k].sort((L,$)=>L-$),O=L=>H.indexOf(L)/(H.length-1),J=p.map(L=>L.rings.reduce(($,rt)=>$+Od(rt[0]),0)**.85),q=J.reduce((L,$)=>L+$,0),it=(L,$,rt)=>{R.push(L,$,.08);let xt=9+I()*16,dt=I()*Math.PI*2,bt=(I()-.5)*Math.PI*.7;D.push(xt*Math.cos(dt)*Math.cos(bt)*1.4,xt*Math.sin(dt)*Math.cos(bt),4+xt*Math.sin(bt)*.6);let N=Math.hypot(L,$)/6;G.push(Math.min(1,I()*.65+N*.35)),F.push(I()),C.push(rt.r,rt.g,rt.b)};p.forEach((L,$)=>{let rt=Math.max(6,Math.round((x-S)*J[$]/q)),xt=qn(Fn(mo,.35+.65*O(k[$]))),dt=L.rings.map(Kt=>Kt[0]),bt=dt.map(Od),N=bt.reduce((Kt,Vt)=>Kt+Vt,0);for(let Kt=0;Kt<rt;Kt++){let Vt=I()*N,Xt=0;for(;Vt>bt[Xt]&&Xt<dt.length-1;)Vt-=bt[Xt++];let pt=dt[Xt],Qt=1/0,Lt=-1/0,kt=1/0,E=-1/0;pt.forEach(([M,X])=>{Qt=Math.min(Qt,M),Lt=Math.max(Lt,M),kt=Math.min(kt,X),E=Math.max(E,X)});for(let M=0;M<40;M++){let X=Qt+I()*(Lt-Qt),_t=kt+I()*(E-kt);if(n1(X,_t,pt)){it(...a(X,_t),xt);break}}}});let K=qn("#ffe9c2"),mt=t.map.lineSido,Ut=mt.map(L=>L.reduce(($,rt,xt)=>xt?$+Math.hypot(rt[0]-L[xt-1][0],rt[1]-L[xt-1][1]):0,0)),tt=Ut.reduce((L,$)=>L+$,0);for(let L=0;L<S;L++){let $=I()*tt,rt=0;for(;$>Ut[rt]&&rt<mt.length-1;)$-=Ut[rt++];let xt=mt[rt];for(let dt=1;dt<xt.length;dt++){let bt=Math.hypot(xt[dt][0]-xt[dt-1][0],xt[dt][1]-xt[dt-1][1]);if($<=bt||dt===xt.length-1){let N=bt?Math.min(1,$/bt):0;it(...a(xt[dt-1][0]+(xt[dt][0]-xt[dt-1][0])*N,xt[dt-1][1]+(xt[dt][1]-xt[dt-1][1])*N),K);break}$-=bt}}let z=new wn;z.setAttribute("position",new Ne(R,3)),z.setAttribute("aStart",new Ne(D,3)),z.setAttribute("aDelay",new Ne(G,1)),z.setAttribute("aSeed",new Ne(F,1)),z.setAttribute("aColor",new Ne(C,3));let nt=new Xn({vertexShader:s1,fragmentShader:r1,transparent:!0,depthWrite:!1,blending:eo,uniforms:{uMorph:{value:0},uTime:{value:0},uSize:{value:92},uScale:{value:1},uAlpha:{value:1}}}),at=new Fa(z,nt);at.frustumCulled=!1,at.renderOrder=3,n.add(at);let Y=new ne,gt=new ne,Ot=new W,Et=cn,Ct=Ji;function zt(L,$){Et=L,Ct=$,e.setSize(L,$,!1),nt.uniforms.uScale.value=$/Ji}function ot(L,$){let rt=L.tilt*.86,xt=L.orbit,dt=L.camDist,bt=L.camX,N=-.4*L.tilt+L.camY;i.position.set(bt+dt*Math.sin(rt)*Math.sin(xt),N-dt*Math.sin(rt)*Math.cos(xt),dt*Math.cos(rt)),i.up.set(0,1,0),i.lookAt(bt,N,0),i.setViewOffset(cn,Ji,-L.mapShift,-L.mapLift,cn,Ji),i.updateMatrixWorld();let Kt=L.mapAlpha>.001;_.visible=Kt,p.forEach(Xt=>{let pt=Ud((L.rise-Xt.delay*.5)/.5),Qt=L.devRise>0?Ud((L.devRise-(1-Xt.delay)*.5)/.5):0;Xt.mesh.scale.z=Ti+(Xt.h-Ti)*pt+(Xt.h2-Ti)*Qt,Y.lerpColors(Xt.landCol,Xt.riceCol,L.riceColor).lerp(Xt.jikCol,L.jikColor).lerp(Xt.devCol,L.devColor).lerp(f.cap,L.mapDim),Xt.cap.color.copy(Y),Xt.cap.emissive.copy(Y).multiplyScalar(.16*(1-Math.min(1,L.mapDim))),gt.copy(Y).multiplyScalar(.52).lerp(f.side,L.mapDim),Xt.side.color.copy(gt),Xt.cap.opacity=Xt.side.opacity=L.mapAlpha});let Vt=1-Ud(Math.max(L.rise,L.devRise)*1.6);A.position.z=Ti+.004,T.position.z=Ti+.003,b.opacity=L.mapAlpha*Vt*(.28+.4*L.mapDim),y.opacity=L.mapAlpha*Vt*(.1+.12*L.mapDim),c.material.opacity=.42*L.mapAlpha,nt.uniforms.uMorph.value=L.morph,nt.uniforms.uTime.value=$,nt.uniforms.uAlpha.value=L.pAlpha,at.visible=L.pAlpha>.001,s.style.opacity=L.glAlpha,L.glAlpha>.001&&e.render(n,i)}function P(L,$,rt){return Ot.set(L,$,rt).project(i),[(Ot.x+1)*.5*cn,(1-Ot.y)*.5*Ji]}return{render:ot,resize:zt,project:P,top:L=>{let $=g.get(L);return $?[$.cx,$.cy,$.mesh.scale.z]:null},world:(L,$)=>a(L,$),flat:Ti,units:p,byKey:g,renderer:e}}var a1=s=>s<0?0:s>1?1:s,o1=s=>(s=a1(s),s*s*(3-2*s)),Fd=s=>s-Math.floor(s),nh='"Pretendard Variable", Pretendard, system-ui, sans-serif';function M0(s,t,e){let n=s.getContext("2d"),i=1;function r(F,C){s.width=F,s.height=C,i=F/cn}let a=t.flows.top.slice(0,50).map(([F,C,k],H)=>({o:F,d:C,v:k,i:H,ph:Fd(H*.618)})),o=a[0].v,l=Ss(ri.melonO),c=Ss(ri.melonD),h=(F,C,k,H)=>{let O=1-H;return[O*O*F[0]+2*O*H*C[0]+H*H*k[0],O*O*F[1]+2*O*H*C[1]+H*H*k[1]]},f=F=>l.map((C,k)=>Math.round(C+(c[k]-C)*F));function u(F,C){let k=F.flowAlpha;if(k<=.002||F.flows<=.001)return;n.globalCompositeOperation="lighter";let H=new Map;for(let O=a.length-1;O>=0;O--){let J=a[O],q=e.top(J.o),it=e.top(J.d);if(!q||!it)continue;let K=e.project(q[0],q[1],q[2]),mt=e.project(it[0],it[1],it[2]),Ut=mt[0]-K[0],tt=mt[1]-K[1],z=Math.hypot(Ut,tt)||1,nt=[(K[0]+mt[0])/2-tt*.22,(K[1]+mt[1])/2+Ut*.22-z*.18],at=o1((F.flows-O/a.length*.55)/.45);if(at<=0)continue;let Y=Math.sqrt(J.v/o),gt=O<3,Ot=n.createLinearGradient(K[0],K[1],mt[0],mt[1]);Ot.addColorStop(0,Te(l,1)),Ot.addColorStop(1,Te(c,1));let Et=Math.max(8,Math.round(z/10)),Ct=()=>{n.beginPath(),n.moveTo(K[0],K[1]);for(let V=1;V<=Et*at;V++){let et=h(K,nt,mt,V/Et);n.lineTo(et[0],et[1])}let P=h(K,nt,mt,at);n.lineTo(P[0],P[1])};n.lineCap="round",n.strokeStyle=Ot,n.globalAlpha=k*(.035+.08*Y)*(gt?1.5:1),n.lineWidth=3+11*Y,Ct(),n.stroke(),n.globalAlpha=k*(.22+.5*Y)*(gt?1.2:1),n.lineWidth=.7+2.8*Y,Ct(),n.stroke();let zt=gt?4:Y>.4?3:2,ot=.42/(.5+z/520);for(let P=0;P<zt;P++){let V=Fd(C*ot+J.ph+P/zt);if(V>at)continue;let et=h(K,nt,mt,V),L=1.6+3.2*Y,$=f(V),rt=n.createRadialGradient(et[0],et[1],0,et[0],et[1],L*3.2);rt.addColorStop(0,Te([255,255,255],1)),rt.addColorStop(.25,Te($,.9)),rt.addColorStop(1,Te($,0)),n.globalAlpha=k*(.35+.4*Math.sin(V*Math.PI)),n.fillStyle=rt,n.beginPath(),n.arc(et[0],et[1],L*3.2,0,Math.PI*2),n.fill()}n.globalAlpha=k*at*.9,n.fillStyle=Te(l,1),n.beginPath(),n.arc(K[0],K[1],1.6+2.2*Y,0,Math.PI*2),n.fill(),at>.98&&H.set(J.d,{p:mt,v:(H.get(J.d)?.v||0)+J.v})}H.forEach(({p:O,v:J})=>{let it=4+11*Math.sqrt(J/o),K=Fd(C*.6+O[0]*.01);n.globalAlpha=k*.45;let mt=n.createRadialGradient(O[0],O[1],0,O[0],O[1],it*1.8);mt.addColorStop(0,Te(c,.9)),mt.addColorStop(1,Te(c,0)),n.fillStyle=mt,n.beginPath(),n.arc(O[0],O[1],it*1.8,0,Math.PI*2),n.fill(),n.globalAlpha=k*(1-K)*.7,n.strokeStyle=Te(c,1),n.lineWidth=1.2,n.beginPath(),n.arc(O[0],O[1],it+K*22,0,Math.PI*2),n.stroke()}),n.globalAlpha=1,n.globalCompositeOperation="source-over"}let d=t.power.k,m=t.power.months,_=d.length,p=Math.max(...d),g=+m[0].slice(5,7)-1,v=1250,b=548,y=36,A=400,T=F=>y+(A-y)*(F/p),x=F=>-Math.PI/2+(g+F)/12*Math.PI*2,S=F=>{let C=Math.floor(F),k=F-C,H=k&&C+1<_?d[C]+(d[C+1]-d[C])*k:d[C],O=T(H),J=x(F);return[v+O*Math.cos(J),b+O*Math.sin(J)]},I=F=>Fn(v0,F/(_-1));function R(F){let C=F.powerAlpha;if(C<=.002)return;let k=F.spiral*(_-1);n.save(),n.globalAlpha=C,n.setLineDash([2,6]),n.lineWidth=1,[1e6,2e6].forEach(J=>{n.strokeStyle="rgba(220,228,240,0.16)",n.beginPath(),n.arc(v,b,T(J),0,Math.PI*2),n.stroke(),n.fillStyle="rgba(220,228,240,0.55)",n.font=`500 20px ${nh}`,n.textAlign="left",n.fillText(`${J/1e4}\uB9CC MWh`,v+8,b-T(J)-6)}),n.setLineDash([]),n.font=`600 22px ${nh}`,n.textAlign="center",n.textBaseline="middle";for(let J=0;J<12;J++){let q=-Math.PI/2+J/12*Math.PI*2,it=A+34;n.fillStyle=J===0||J===7?"rgba(255,220,160,0.85)":"rgba(200,208,220,0.45)",n.fillText(`${J+1}\uC6D4`,v+it*Math.cos(q),b+it*Math.sin(q))}n.lineCap="round",n.lineJoin="round",n.globalCompositeOperation="lighter";let H=6;for(let J=1;J<=Math.ceil(k);J++){let q=Math.min(J,k);if(q<=J-1)break;let it=(k-J)/12,K=.32+.68*Math.exp(-it*.55),mt=I(J);n.strokeStyle=Te(mt,1),n.beginPath();let[Ut,tt]=S(J-1);n.moveTo(Ut,tt);for(let z=1;z<=H;z++){let nt=J-1+(q-(J-1))*z/H,[at,Y]=S(nt);n.lineTo(at,Y)}n.globalAlpha=C*K*.22,n.lineWidth=9,n.stroke(),n.globalAlpha=C*K,n.lineWidth=2.2,n.stroke()}if(k>0){let[J,q]=S(k),it=I(k),K=n.createRadialGradient(J,q,0,J,q,34);K.addColorStop(0,"rgba(255,255,255,0.95)"),K.addColorStop(.2,Te(it,.8)),K.addColorStop(1,Te(it,0)),n.globalAlpha=C,n.fillStyle=K,n.beginPath(),n.arc(J,q,34,0,Math.PI*2),n.fill()}n.globalCompositeOperation="source-over";let O=Math.min(_-1,Math.floor(k+.001));n.globalAlpha=C,n.fillStyle=Te(I(k),1),n.font=`800 64px ${nh}`,n.fillText(m[O].slice(0,4),v,b-6),n.fillStyle="rgba(220,228,240,0.7)",n.font=`500 22px ${nh}`,n.fillText(`${+m[O].slice(5,7)}\uC6D4 \xB7 ${Math.round(d[O]/1e4)}\uB9CC MWh`,v,b+40),n.restore()}let D=!0;function G(F,C){let k=F.flowAlpha>.002&&F.flows>.001||F.powerAlpha>.002;k!==D&&(D=k,s.style.visibility=k?"visible":"hidden"),k&&(n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,s.width,s.height),n.setTransform(i,0,0,i,0,0),u(F,C),R(F))}return{render:G,resize:r}}var l1="http://www.w3.org/2000/svg",de=(s,t={},e)=>{let n=document.createElementNS(l1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},c1=s=>s<0?0:s>1?1:s,ai=s=>(s=c1(s),s*s*(3-2*s));function S0(s,t){let e=t.rice,n=150,i=700,r=770,a=920,o=725,l=950,c=e.hist.filter(([,P])=>P!=null),h=c.flatMap(([,P,V])=>[P,V]).concat(e.fc.flatMap(P=>[P.lo,P.hi]),[e.stat,e.krei].filter(Boolean)),f=Math.floor((Math.min(...h)-6)/10)*10,u=Math.ceil((Math.max(...h)+4)/10)*10,d=c[0][0],m=c.at(-1)[0],_=P=>n+(P-d)/(m-d)*(i-n),p=P=>r+P/(e.fc.length-1)*(a-r),g=P=>l-(P-f)/(u-f)*(l-o),v=de("g",{class:"rc",opacity:0},s),b=de("defs",{},s),y=de("linearGradient",{id:"rcArea",x1:0,y1:0,x2:0,y2:1},b);de("stop",{offset:0,"stop-color":ri.gold,"stop-opacity":.22},y),de("stop",{offset:1,"stop-color":ri.gold,"stop-opacity":0},y);let A=de("g",{class:"rc-grid"},v);for(let P=f;P<=u;P+=20)P!==f&&(de("line",{x1:n,x2:a+10,y1:g(P),y2:g(P)},A),de("text",{x:n-14,y:g(P)+5,"text-anchor":"end"},A).textContent=P);[d,2015,2020,m].forEach(P=>{de("text",{x:_(P),y:l+30,"text-anchor":"middle"},A).textContent=P}),de("text",{x:n-14,y:o-22,"text-anchor":"end",class:"rc-unit"},A).textContent="kg/10a";let T=P=>P.map(([V,et],L)=>`${L?"L":"M"}${V.toFixed(1)},${et.toFixed(1)}`).join(""),x=c.filter(([,,P])=>P).map(([P,,V])=>[_(P),g(V)]),S=c.map(([P,V])=>[_(P),g(V)]),I=de("path",{d:`${T(S)}L${_(m)},${l}L${_(d)},${l}Z`,fill:"url(#rcArea)",opacity:0},v),R=de("path",{d:T(x),class:"rc-norm"},v),D=de("path",{d:T(S),class:"rc-line"},v),G=S.map(([P,V])=>de("circle",{cx:P,cy:V,r:4.2,class:"rc-dot",opacity:0},v)),F=de("g",{class:"rc-fc"},v);de("rect",{x:r-30,y:o-30,width:a-r+60,height:l-o+44,rx:14,class:"rc-fcbox"},F),de("text",{x:(r+a)/2,y:l+30,"text-anchor":"middle",class:"rc-fclab"},F).textContent=`${e.year} \uC608\uCE21 ${e.fc.length}\uBC88`;let C=[[e.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98",ri.sky],[e.krei,"KREI",ri.field]].filter(([P])=>P!=null).map(([P,V,et],L)=>{let $=de("g",{opacity:0},F);return de("line",{x1:r-18,x2:a+18,y1:g(P),y2:g(P),stroke:et,"stroke-width":2,"stroke-dasharray":"5 4"},$),de("text",{x:a+26,y:g(P)+(L?14:-4),fill:et,class:"rc-ref"},$).textContent=`${V} ${P}`,$}),k=de("path",{d:T(e.fc.map((P,V)=>[p(V),g(P.y)])),class:"rc-fcline"},F),H=e.fc.map((P,V)=>{let et=de("g",{opacity:0},F);return de("line",{x1:p(V),x2:p(V),y1:g(P.lo),y2:g(P.hi),class:"rc-wh"},et),de("circle",{cx:p(V),cy:g(P.y),r:V===e.fc.length-1?7:5,class:V===e.fc.length-1?"rc-fcdot now":"rc-fcdot"},et),et}),O=P=>P.replace(/(\d+)월 (\d+)일/,"$1/$2");de("text",{x:p(0),y:o-42,"text-anchor":"middle",class:"rc-fcd"},F).textContent=O(e.fc[0].lab),de("text",{x:p(e.fc.length-1),y:o-42,"text-anchor":"middle",class:"rc-fcd"},F).textContent=O(e.fc.at(-1).lab);let J=t.facts,q=J.riceAcc,it=de("g",{class:"ra",opacity:0},s),K=[["\uD3C9\uB144 \uADF8\uB300\uB85C",q.norm,"norm"],...t.rice.fc.slice(0,5).map(P=>[P.lab,q[`m${P.t}`],P.t])].filter(([,P])=>P!=null),mt=330,Ut=900,tt=742,z=37,nt=P=>mt+P/Math.max(...K.map(V=>V[1]))*(Ut-mt);de("text",{x:150,y:tt-44,class:"ra-h"},it).textContent=`\uC804\uAD6D \uB2E8\uC218 \uD3C9\uADE0 \uC624\uCC28 \xB7 ${J.riceFrom}~${t.rice.year-1} \uADF8\uD574 \uC774\uC804 \uC790\uB8CC\uB85C\uB9CC \uC7AC\uD604`;let at=K.slice(1).reduce((P,V)=>V[1]<P[1]?V:P)[2],Y=K.map(([P,V,et],L)=>{let $=tt+L*z,rt=de("g",{opacity:0},it);de("text",{x:mt-16,y:$+19,"text-anchor":"end",class:"ra-l"},rt).textContent=L?`${P} \uC608\uCE21`:P;let xt=de("rect",{x:mt,y:$+4,width:0,height:22,rx:5,class:et==="norm"?"ra-b norm":et==="0915"?"ra-b best":"ra-b"},rt),dt=de("text",{x:mt,y:$+21,class:"ra-v"},rt);return dt.textContent=`${V}kg`,{gg:rt,r:xt,tx:dt,w:nt(V)-mt}}),gt=[[q.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1","#5fb3ff"],[q.krei,"KREI 9\uC6D4 \uC804\uB9DD","#5fb37c"]].map(([P,V,et],L)=>{let $=de("g",{opacity:0},it),rt=nt(P),xt=tt-6,dt=tt+K.length*z;return de("line",{x1:rt,x2:rt,y1:xt,y2:dt,stroke:et,"stroke-width":2,"stroke-dasharray":"4 4"},$),de("text",{x:rt+(L?8:-8),y:dt+24,"text-anchor":L?"start":"end",fill:et,class:"ra-ref"},$).textContent=`${V} ${P}kg`,$}),Ot=0,Et=0;function Ct(){Ot=D.getTotalLength(),Et=k.getTotalLength(),D.style.strokeDasharray=`${Ot} ${Ot}`,k.style.strokeDasharray=`${Et} ${Et}`}function zt(P){it.setAttribute("opacity",P.accAlpha),!(P.accAlpha<=.002)&&(Y.forEach((V,et)=>{let L=ai((P.riceAcc-et*.1)/.45);V.gg.setAttribute("opacity",ai(L*3)),V.r.setAttribute("width",V.w*L),V.tx.setAttribute("x",mt+V.w*L+10)}),gt.forEach((V,et)=>V.setAttribute("opacity",ai((P.riceAcc-.7-et*.1)/.2))))}function ot(P){if(zt(P),Ot||Ct(),v.setAttribute("opacity",P.riceAlpha),P.riceAlpha<=.002)return;let V=ai(P.riceLine);D.style.strokeDashoffset=Ot*(1-V),R.style.opacity=.9*ai(P.riceLine*1.5),I.setAttribute("opacity",ai((P.riceLine-.6)/.4)),G.forEach((L,$)=>L.setAttribute("opacity",ai((V-$/G.length)*8)));let et=P.riceFc;F.setAttribute("opacity",ai(et*4)),H.forEach((L,$)=>L.setAttribute("opacity",ai((et-$/H.length*.7)/.3))),k.style.strokeDashoffset=Et*(1-ai(et/.95)),C.forEach((L,$)=>L.setAttribute("opacity",ai((et-.75-$*.08)/.15)))}return{render:ot}}var h1="http://www.w3.org/2000/svg",bs=(s,t={},e)=>{let n=document.createElementNS(h1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},u1=s=>s<0?0:s>1?1:s,Bd=s=>(s=u1(s),s*s*(3-2*s)),d1=s=>Math.round(s/100).toLocaleString("ko-KR");function b0(s,t){let e=t.jikbul,n=e.sido.filter(v=>v.pub>0).slice(0,9),i=bs("g",{class:"bd",opacity:0},s),r=150,a=222,o=240,l=400,c=600,h=38,f=Math.max(...n.map(v=>v.pub)),u=v=>v.hh?v.pub*100/v.hh:0,d=n.map(u),m=[...d].sort((v,b)=>v-b),_=v=>m.indexOf(v)/Math.max(1,m.length-1);bs("text",{x:r,y:c-22,class:"bd-h"},i).textContent=`\uC2DC\uB3C4\uBCC4 \uACF5\uC775\uC9C1\uBD88 \uC608\uC0B0\uD604\uC561 \xB7 ${e.year}`,bs("text",{x:900,y:c-22,"text-anchor":"end",class:"bd-y"},i).textContent="\uB18D\uAC00\uB2F9 \uC608\uC0B0";let p=n.map((v,b)=>{let y=c+b*h,A=v.pub/f*l,T=Fn(jr,.25+.75*_(d[b])),x=bs("g",{},i);bs("text",{x:a,y:y+26,"text-anchor":"end",class:"bd-n"},x).textContent=v.name;let S=bs("rect",{x:o,y:y+6,width:0,height:h-12,rx:6,fill:Te(T)},x),I=bs("text",{x:o,y:y+26,class:"bd-v2"},x);I.textContent=`${d1(v.pub)}\uC5B5`;let R=bs("text",{x:900,y:y+26,"text-anchor":"end",class:"bd-f"},x);return R.textContent=`${Math.round(d[b]).toLocaleString("ko-KR")}\uB9CC`,{gg:x,b:S,v:I,f:R,w:A}});function g(v){i.setAttribute("opacity",v.bdAlpha),!(v.bdAlpha<=.002)&&p.forEach((b,y)=>{let A=Bd((v.bdBars-y/p.length*.5)/.5);b.gg.setAttribute("opacity",Bd(A*3)),b.b.setAttribute("width",b.w*A),b.v.setAttribute("x",o+b.w*A+10),b.f.setAttribute("opacity",Bd((v.bdSplit-y/p.length*.4)/.4))})}return{render:g}}var oi=.5729166666666666,w0="assets/intro/shots/";function A0(s,t,e){s.insertAdjacentHTML("beforeend",`
    <div class="scr-wrap" id="scr-wrap">
      <div class="scr" id="scr">
        <div class="scr-bar"><i></i><i></i><i></i><span class="scr-url" id="scr-url">ag-rstat.vercel.app</span></div>
        <div class="scr-view">
          <div class="scr-zoom" id="scr-zoom">
            ${e.map(d=>`<img class="scr-img" data-n="${d}" src="${w0}${d}.webp" alt="" decoding="async" width="1100" height="619">`).join("")}
            <div class="scr-marks" id="scr-marks"></div>
            <div class="cursor" id="cursor"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6.2 1.6L10 19z"/></svg><span class="ripple"></span></div>
          </div>
        </div>
      </div>
    </div>`);let n=s.querySelector("#scr-wrap"),i=s.querySelector("#scr-zoom"),r=s.querySelector("#scr-marks"),a=s.querySelector("#cursor"),o=s.querySelector("#scr-url"),l=Object.fromEntries([...s.querySelectorAll(".scr-img")].map(d=>[d.dataset.n,d])),c=(d,m)=>t.shots[d]?.boxes?.[m]||t.shots.home?.boxes?.[m]||null;function h(d,m=.92){if(!d)return{scale:1,x:0,y:0};let[_,p,g,v]=d,b=Math.max(1,Math.min(1100/(g*oi),619/(v*oi))*m),y=1100/2-(_+g/2)*oi*b,A=619/2-(p+v/2)*oi*b;return y=Math.min(0,Math.max(1100-1100*b,y)),A=Math.min(0,Math.max(619-619*b,A)),{scale:b,x:y,y:A}}let f=d=>d?{x:(d[0]+d[2]/2)*oi,y:(d[1]+d[3]/2)*oi}:{x:1100/2,y:619/2};function u(d,m,_,p="top"){if(!m)return null;let[g,v,b,y]=m;return r.insertAdjacentHTML("beforeend",`<div class="mk mk-${p}" id="mk-${d}" style="left:${g*oi}px;top:${v*oi}px;width:${b*oi}px;height:${y*oi}px"><span>${_}</span></div>`),r.querySelector(`#mk-${d}`)}return{wrap:n,zoom:i,cursor:a,url:o,imgs:l,box:c,focus:h,at:f,mark:u,K:oi}}function T0(s,t){return s.insertAdjacentHTML("beforeend",`
    <div class="wall-wrap" id="wall-wrap"><div class="wall" id="wall">
      ${t.map(([e,n])=>`<figure class="wt"><img src="${w0}${e}_s.webp" alt="" decoding="async" width="320" height="180"><figcaption>${n}</figcaption></figure>`).join("")}
    </div></div>`),s.querySelector("#wall-wrap")}var f1="http://www.w3.org/2000/svg",ve=(s,t={},e)=>{let n=document.createElementNS(f1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},R0=s=>s<0?0:s>1?1:s,Qr=s=>(s=R0(s),s*s*(3-2*s)),E0=s=>1-(1-R0(s))**3,p1=s=>s-Math.floor(s),go='"Pretendard Variable", Pretendard, system-ui, sans-serif';function C0(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}function m1(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function g1(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function P0(s,t,e,n){let i=s.getContext("2d"),r=e.spots,a=1,o=!0;function l(P,V){s.width=P,s.height=V,a=P/cn}let c=r.rio.regions,h=Math.max(...c.map(P=>P.x)),f=P=>P>=1?Fn(["#ffd27a","#f5a524","#ff7a4a"],Math.min(1,(P-1)/2.4)):Fn(["#2f6fd0","#4ea1ff","#9fd1ff"],P);function u(P,V){let et=P.rioA;if(et<=.002)return;let L=1310,$=520,rt=78,xt=290,dt=c.length,bt=Math.PI*2/dt*.36;i.save(),i.globalAlpha=et,i.globalCompositeOperation="lighter";for(let Kt=0;Kt<3;Kt++){let Vt=p1(V*.42+Kt/3),Xt=rt+Vt*360;i.strokeStyle=`rgba(255,200,120,${.22*(1-Vt)*et})`,i.lineWidth=1.5,i.beginPath(),i.arc(L,$,Xt,0,Math.PI*2),i.stroke()}c.forEach((Kt,Vt)=>{let Xt=E0((P.rioP-Vt/dt*.5)/.5);if(Xt<=0)return;let pt=-Math.PI/2+Vt/dt*Math.PI*2+P.rioP*.12,Qt=rt+(xt*Math.sqrt(Kt.x/h)+18)*Xt,Lt=f(Kt.lq),kt=i.createLinearGradient(L+rt*Math.cos(pt),$+rt*Math.sin(pt),L+Qt*Math.cos(pt),$+Qt*Math.sin(pt));kt.addColorStop(0,Te(Lt,.08)),kt.addColorStop(.6,Te(Lt,.55)),kt.addColorStop(1,Te(Lt,.95)),i.fillStyle=kt,i.beginPath(),i.moveTo(L+rt*Math.cos(pt-bt),$+rt*Math.sin(pt-bt));let E=rt+(Qt-rt)*.55,M=bt*1.5*(rt/E)*2.4;i.quadraticCurveTo(L+E*Math.cos(pt-M),$+E*Math.sin(pt-M),L+Qt*Math.cos(pt),$+Qt*Math.sin(pt)),i.quadraticCurveTo(L+E*Math.cos(pt+M),$+E*Math.sin(pt+M),L+rt*Math.cos(pt+bt),$+rt*Math.sin(pt+bt)),i.closePath(),i.fill();let X=Qr((Xt-.7)/.3);if(X>0){let _t=Qt+34,ft=L+_t*Math.cos(pt),yt=$+_t*Math.sin(pt);i.globalCompositeOperation="source-over",i.globalAlpha=et*X,i.textAlign=Math.cos(pt)>.25?"left":Math.cos(pt)<-.25?"right":"center",i.textBaseline="middle",i.fillStyle="#eef0f3",i.font=`700 23px ${go}`,i.fillText(Kt.name,ft,yt-11),i.fillStyle=Te(Lt,1),i.font=`600 18px ${go}`,i.fillText(`${(Kt.x/1e6).toFixed(1)}\uC870`,ft,yt+13),i.globalAlpha=et,i.globalCompositeOperation="lighter"}}),i.globalCompositeOperation="source-over";let N=i.createRadialGradient(L,$,0,L,$,rt);N.addColorStop(0,"rgba(40,30,16,0.95)"),N.addColorStop(1,"rgba(20,16,10,0.9)"),i.fillStyle=N,i.beginPath(),i.arc(L,$,rt-4,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(255,207,122,0.5)",i.lineWidth=1.2,i.stroke(),i.textAlign="center",i.textBaseline="middle",i.fillStyle="#ffd98a",i.font=`800 30px ${go}`,i.fillText(`${Math.round(r.rio.total/1e6)}\uC870`,L,$-6),i.fillStyle="#aab2bf",i.font=`500 16px ${go}`,i.fillText(`\uB18D\uC2DD\uD488 \uC0B0\uCD9C ${r.rio.year}`,L,$+20),i.textAlign="right",i.fillStyle="rgba(200,208,220,0.8)",i.font=`500 22px ${go}`,i.fillText("\uAF43\uC78E \uAE38\uC774 = \uC2DC\uB3C4 \uB18D\uC2DD\uD488 \uC0B0\uCD9C\uC561 \xB7 \uC8FC\uD669\uC77C\uC218\uB85D \uB18D\uC2DD\uD488\uC5D0 \uD2B9\uD654",1844,985),i.restore()}let d=[[245,165,36],[255,122,89],[124,201,143]],m=Math.max(...r.coops.map(P=>P[3])),_=C0(1110),p=r.coops.map(P=>({w:n.world(P[0],P[1]),k:P[2],s:Math.sqrt(P[3]/m),o:_()}));function g(P,V){let et=P.coopA;et<=.002||(i.save(),i.globalCompositeOperation="lighter",p.forEach(L=>{let $=Qr((P.coopP-L.o*.8)/.2);if($<=0)return;let[rt,xt]=n.project(L.w[0],L.w[1],n.flat),dt=(1.4+6.5*L.s)*(.6+.4*$),bt=.85+.15*Math.sin(V*2+L.o*30),N=i.createRadialGradient(rt,xt,0,rt,xt,dt*2);N.addColorStop(0,Te(d[L.k],.5*et*$*bt)),N.addColorStop(1,Te(d[L.k],0)),i.fillStyle=N,i.beginPath(),i.arc(rt,xt,dt*2,0,Math.PI*2),i.fill(),i.globalCompositeOperation="source-over",i.fillStyle=Te(d[L.k],.92*et*$),i.beginPath(),i.arc(rt,xt,Math.max(1.5,dt*.7),0,Math.PI*2),i.fill(),i.globalCompositeOperation="lighter"}),i.restore())}let v=C0(14939),b=e.map.sigun.map(P=>r.lv.nv[P.key]?r.lv.man[P.key]/r.lv.nv[P.key]:0),y=b.filter(P=>P>0).sort((P,V)=>P-V),A=P=>{let V=0,et=y.length-1;for(;V<et;){let L=V+et>>1;y[L]<P?V=L+1:et=L}return V/(y.length-1)},T=[];e.map.sigun.forEach((P,V)=>{let et=r.lv.nv[P.key];if(!et)return;let L=Fn(eh,.1+.9*A(b[V])),$=P.rings.map(dt=>dt[0]),rt=$.map(g1),xt=rt.reduce((dt,bt)=>dt+bt,0);for(let dt=0;dt<et;dt++){let bt=v()*xt,N=0;for(;bt>rt[N]&&N<$.length-1;)bt-=rt[N++];let Kt=$[N],Vt=1/0,Xt=-1/0,pt=1/0,Qt=-1/0;Kt.forEach(([Lt,kt])=>{Vt=Math.min(Vt,Lt),Xt=Math.max(Xt,Lt),pt=Math.min(pt,kt),Qt=Math.max(Qt,kt)});for(let Lt=0;Lt<30;Lt++){let kt=Vt+v()*(Xt-Vt),E=pt+v()*(Qt-pt);if(m1(kt,E,Kt)){T.push({w:n.world(kt,E),c:L,o:v()});break}}}});function x(P){let V=P.lvA;if(!(V<=.002)){i.save(),i.globalCompositeOperation="lighter";for(let et of T){let L=Qr((P.lvP-et.o*.85)/.15);if(L<=0)continue;let[$,rt]=n.project(et.w[0],et.w[1],.06);i.fillStyle=Te(et.c,.75*V*L),i.fillRect($-1.3,rt-1.3,2.6,2.6)}i.restore()}}let S=r.employ,I=ve("g",{opacity:0},t),R=150,D=1770,G=560,F=950,C=5e3,k=P=>R+(P-S.years[0])/(S.years.at(-1)-S.years[0])*(D-R),H=P=>F-P/C*(F-G),O=ve("defs",{},t),J=ve("linearGradient",{id:"empG",x1:0,y1:0,x2:0,y2:1},O);ve("stop",{offset:0,"stop-color":"#7cc98f","stop-opacity":.45},J),ve("stop",{offset:1,"stop-color":"#7cc98f","stop-opacity":0},J);let q=ve("clipPath",{id:"empClip"},O),it=ve("rect",{x:R-10,y:0,width:0,height:1080},q);for(let P=1e3;P<=4e3;P+=1e3)ve("line",{x1:R,x2:D,y1:H(P),y2:H(P),class:"sp-grid"},I),ve("text",{x:D+12,y:H(P)+5,class:"sp-ax"},I).textContent=`${P/10}\uB9CC`;for(let P=1970;P<=2020;P+=10)ve("text",{x:k(P),y:F+30,"text-anchor":"middle",class:"sp-ax"},I).textContent=P;let K=S.years.map((P,V)=>[k(P),H(S.a[V])]),mt=K.map(([P,V],et)=>`${et?"L":"M"}${P.toFixed(1)},${V.toFixed(1)}`).join(""),Ut=ve("g",{"clip-path":"url(#empClip)"},I);ve("path",{d:`${mt}L${D},${F}L${R},${F}Z`,fill:"url(#empG)"},Ut),ve("path",{d:mt,class:"sp-eline"},Ut);let tt=ve("circle",{r:7,class:"sp-ehead"},I),z=ve("text",{class:"sp-ehv","text-anchor":"middle"},I),nt=ve("text",{x:K[0][0]+14,y:K[0][1]-18,class:"sp-ehs"},I);nt.textContent=`${S.years[0]}\uB144 ${Math.round(S.a[0]/10)}\uB9CC \uBA85`;function at(P){if(I.setAttribute("opacity",P.empA),P.empA<=.002)return;let V=P.empP,et=R+(D-R)*V;it.setAttribute("width",et-R+12);let L=Math.min(S.years.length-1,V*(S.years.length-1)),$=Math.floor(L),rt=L-$,xt=Math.min(S.years.length-1,$+1),dt=K[$][0]+(K[xt][0]-K[$][0])*rt,bt=K[$][1]+(K[xt][1]-K[$][1])*rt,N=S.a[$]+(S.a[xt]-S.a[$])*rt;tt.setAttribute("cx",dt),tt.setAttribute("cy",bt),z.setAttribute("x",Math.min(D-40,dt)),z.setAttribute("y",bt-22),z.textContent=`${Math.round(S.years[0]+L)}\uB144 ${Math.round(N/10)}\uB9CC`,nt.setAttribute("opacity",Qr(V*6))}let Y=ve("g",{opacity:0},t),gt=ve("pattern",{id:"soilDots",width:9,height:9,patternUnits:"userSpaceOnUse"},O);ve("circle",{cx:2,cy:2,r:.9,fill:"rgba(0,0,0,0.25)"},gt),ve("circle",{cx:6.5,cy:6,r:.7,fill:"rgba(255,255,255,0.12)"},gt);let Ot=["#7fcf7a","#b9d36a","#d9b86a","#b08858","#6e5a48","#3a3632"],Et=["1\uAE09","2\uAE09","3\uAE09","4\uAE09","5\uAE09","\uAE30\uD0C0"],Ct=[["\uB17C",r.soil.pg,880],["\uBC2D",r.soil.fg,1440]].map(([P,V,et])=>{let L=V.reduce((pt,Qt)=>pt+Qt,0),$=250,rt=640,xt=280;ve("text",{x:et+xt/2,y:$-28,"text-anchor":"middle",class:"sp-sh"},Y).textContent=`${P}\uC73C\uB85C \uC4F8 \uB54C \uC801\uC131\uB4F1\uAE09`;let dt=$,bt=V.map((pt,Qt)=>{let Lt=pt/L*rt,kt=ve("g",{},Y);ve("rect",{x:et,y:dt,width:xt,height:Math.max(1,Lt-2),rx:4,fill:Ot[Qt]},kt),ve("rect",{x:et,y:dt,width:xt,height:Math.max(1,Lt-2),rx:4,fill:"url(#soilDots)"},kt);let E=pt/L*100;if(Lt>16){let X=ve("text",{x:et+xt+14,y:dt+Lt/2+6,class:"sp-sl"},kt);X.innerHTML=`<tspan class="b">${Et[Qt]}</tspan><tspan dx="8">${E.toFixed(1)}%</tspan>`}let M={g:kt,y0:dt,h:Lt};return dt+=Lt,M}),N=(V[0]+V[1])/L*100,Kt=bt[0].h+bt[1].h,Vt=ve("g",{opacity:0},Y);ve("path",{d:`M${et-14},${$}h-10v${Kt}h10`,fill:"none",stroke:"#ffd98a","stroke-width":2},Vt);let Xt=ve("text",{x:et-32,y:$+Math.max(18,Kt/2+6),"text-anchor":"end",class:"sp-sb"},Vt);return Xt.innerHTML=`<tspan x="${et-32}" dy="0">1\xB72\uAE09\uC9C0</tspan><tspan x="${et-32}" dy="30" class="v">${N.toFixed(1)}%</tspan>`,{layers:bt,br:Vt}});function zt(P){Y.setAttribute("opacity",P.soilA),!(P.soilA<=.002)&&Ct.forEach((V,et)=>{V.layers.forEach((L,$)=>{let rt=E0((P.soilP-et*.08-$*.09)/.38);L.g.setAttribute("opacity",Qr(rt*2)),L.g.setAttribute("transform",`translate(0 ${(-120*(1-rt)).toFixed(1)})`)}),V.br.setAttribute("opacity",Qr((P.soilP-.75)/.2))})}function ot(P,V){at(P),zt(P);let et=P.rioA>.002||P.coopA>.002||P.lvA>.002;et!==o&&(o=et,s.style.visibility=et?"visible":"hidden"),et&&(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,s.width,s.height),i.setTransform(a,0,0,a,0,0),u(P,V),g(P,V),x(P))}return{render:ot,resize:l,coopKinds:r.coopKinds}}var I0=[["hook",2.5],["title",3],["stats",2],["real",3],["only",1.5],["parcel",3],["ndvi",2],["rice",2],["acc",4],["jik",2],["dev",2.5],["flow",4.5],["vill",1.5],["coop",2],["power",1.5],["rio",1.5],["employ",1.5],["soil",2],["wall",3],["maker",4],["end",3]],Q={},Qe={},kd=0;for(let[s,t]of I0)Q[s]=+kd.toFixed(3),Qe[s]=t*2.5,kd+=t*2.5;var Ei=+kd.toFixed(3),L0=I0.map(([s])=>s);var li=60/96/4,zd=1.4,D0=.5,x1=.6,v1=.3,ws=s=>440*2**((s-69)/12),y1=[[[62,66,69],38],[[61,64,69],37],[[59,62,66],35],[[59,62,67],43],[[57,62,66],42],[[55,59,62],43],[[55,59,64],40],[[57,61,64],45]],M1=[[62,66,69],38],S1=[[57,61,64],45],b1=[[0,78,4],[4,81,4],[8,86,8],[16,85,4],[20,81,4],[24,76,8],[32,74,4],[36,78,4],[40,83,8],[48,83,4],[52,79,4],[56,74,8],[64,81,4],[68,78,4],[72,86,8],[80,83,4],[84,86,4],[88,79,8],[96,76,4],[100,79,4],[104,83,8],[112,81,4],[116,85,4],[120,88,8]],w1=[0,2,1,2,0,2,1,2];function Vd({T:s,TOTAL:t,voice:e,offline:n=!1,sampleRate:i=44100}){let r=Math.round(s.end/2.5),a=z=>z>=r?M1:z===r-1?S1:y1[(z%8+8)%8],o={pad:[[0,.7],[s.title,.75],[s.stats,.8],[s.only,.65],[s.parcel,.8],[s.wall,.75],[s.maker,.6],[s.end,.85],[s.end+5,.5],[t,0]],comp:[[0,0],[s.title,0],[s.title+2.5,.5],[s.stats,.7],[s.only,.5],[s.parcel,.7],[s.wall,.7],[s.maker,.5],[s.end,0]],bass:[[0,0],[s.title+2.5,0],[s.stats,.7],[s.only,.45],[s.parcel,.75],[s.wall,.7],[s.maker,.4],[s.end-2.5,.4],[s.end,0]],kick:[[0,0],[s.stats-2.5,0],[s.stats,.5],[s.real,.6],[s.only,.3],[s.parcel,.62],[s.wall,.6],[s.maker,.25],[s.maker+2.5,0],[t,0]],shaker:[[0,0],[s.stats,0],[s.real,.5],[s.only,.25],[s.parcel,.55],[s.flow,.7],[s.wall,.55],[s.maker,.15],[s.maker+2.5,0],[t,0]],rim:[[0,0],[s.parcel-2.5,0],[s.parcel,.5],[s.wall,.5],[s.maker,0],[t,0]],pluck:[[0,0],[s.title,.2],[s.stats,.45],[s.only,.3],[s.parcel,.5],[s.flow,.6],[s.wall,.5],[s.maker,.2],[s.end,.15],[s.end+2.5,0],[t,0]],lead:[[0,.9],[s.title,.85],[s.stats,.4],[s.wall,.4],[s.maker,.6],[s.end,0]],cut:[[0,700],[s.title,1e3],[s.stats,1400],[s.only,1100],[s.parcel,1500],[s.wall,1500],[s.maker,1e3],[s.end,1300],[t,800]]},l=(z,nt)=>{let at=o[z];if(nt<=at[0][0])return at[0][1];for(let Y=1;Y<at.length;Y++)if(nt<=at[Y][0]){let[gt,Ot]=at[Y-1],[Et,Ct]=at[Y];return Ot+(Ct-Ot)*(nt-gt)/(Et-gt||1)}return at[at.length-1][1]},c=[s.title,s.only,s.parcel,s.rice,s.jik,s.flow,s.vill,s.power,s.wall,s.maker,s.end].map(z=>z-1.1),h=null,f=null,u=null,d=null,m=null,_=null,p=.7,g=!1,v=!1,b=0,y=0,A=!0,T=new Set,x={lines:e?.lines||[],meta:null,buf:new Map,cut:new Map,src:null,id:null,loading:null};function S(){h=n?new OfflineAudioContext(2,Math.ceil(i*(t+1.5)),i):new(window.AudioContext||window.webkitAudioContext),f=h.createGain(),f.gain.value=n?.56:0;let z=h.createDynamicsCompressor();z.threshold.value=-14,z.ratio.value=3,z.attack.value=.006,z.release.value=.25,f.connect(z).connect(h.destination),u=h.createGain(),u.gain.value=zd,u.connect(f),d=h.createGain(),d.gain.value=1.2,d.connect(f),m=h.createConvolver();let nt=Math.floor(h.sampleRate*2.6),at=h.createBuffer(2,nt,h.sampleRate),Y=7,gt=()=>(Y=Y*1664525+1013904223>>>0)/2147483648-1;for(let Ct=0;Ct<2;Ct++){let zt=at.getChannelData(Ct);for(let ot=0;ot<nt;ot++)zt[ot]=gt()*(1-ot/nt)**2.8}m.buffer=at;let Ot=h.createGain();Ot.gain.value=.3,m.connect(Ot).connect(u),_=h.createBuffer(1,h.sampleRate,h.sampleRate);let Et=_.getChannelData(0);for(let Ct=0;Ct<Et.length;Ct++)Et[Ct]=gt()}let I=(z,nt)=>{if(n)return;let at={src:z,g:nt};T.add(at),z.onended=()=>T.delete(at)};function R(z,nt=0){if(z.connect(u),nt){let at=h.createGain();at.gain.value=nt,z.connect(at).connect(m)}}function D(z,nt,at,Y,gt,{a:Ot=.005,lp:Et=0,q:Ct=.7,detune:zt=0,send:ot=0,hold:P=0}={}){if(gt<4e-4)return null;let V=h.createOscillator();V.type=z,V.frequency.value=nt,V.detune.value=zt;let et=h.createGain();et.gain.setValueAtTime(1e-4,at),et.gain.exponentialRampToValueAtTime(gt,at+Ot),P?(et.gain.setValueAtTime(gt,at+Ot+P),et.gain.exponentialRampToValueAtTime(1e-4,at+Ot+P+Y)):et.gain.exponentialRampToValueAtTime(1e-4,at+Ot+Y);let L=V;if(Et){let $=h.createBiquadFilter();$.type="lowpass",$.frequency.value=Et,$.Q.value=Ct,V.connect($),L=$}return L.connect(et),R(et,ot),V.start(at),V.stop(at+Ot+P+Y+.03),I(V,et),V}function G(z,nt,at,Y,gt,Ot=1,Et=0,Ct=.002){if(at<4e-4)return;let zt=h.createBufferSource();zt.buffer=_,zt.loop=nt>.9;let ot=h.createBiquadFilter();ot.type=Y,ot.frequency.value=gt,ot.Q.value=Ot;let P=h.createGain();P.gain.setValueAtTime(1e-4,z),P.gain.exponentialRampToValueAtTime(at,z+Ct),P.gain.exponentialRampToValueAtTime(1e-4,z+Ct+nt),zt.connect(ot).connect(P),R(P,Et),zt.start(z,z*.37%.5),zt.stop(z+Ct+nt+.03),I(zt,P)}function F(z,nt,at,Y=1.9,gt=.34){let Ot=ws(z);D("sine",Ot,nt,Y,.105*at,{a:.004,send:gt}),D("sine",Ot,nt,Y*.9,.04*at,{a:.004,detune:7,send:gt}),D("triangle",Ot,nt,Y*.5,.045*at,{a:.003,lp:2400,send:gt}),D("sine",Ot*2,nt,Y*.3,.02*at,{a:.003,send:gt})}let C=(z,nt)=>{let at=D("sine",120,z,.3,.6*nt,{a:.003});at&&(at.frequency.setValueAtTime(120,z),at.frequency.exponentialRampToValueAtTime(46,z+.1))},k=(z,nt,at)=>G(z,at?.07:.04,(at?.075:.045)*nt,"highpass",7200,.7,.1,.006),H=(z,nt)=>{G(z,.05,.1*nt,"bandpass",2100,2.2,.25),D("triangle",420,z,.045,.05*nt,{a:.001})};function O(z,nt){let at=z*li,Y=(z%16+16)%16,gt=Math.floor(z/16);if(at>t)return;let[Ot,Et]=a(gt),Ct=dt=>l(dt,at),zt=Ct("cut"),ot=gt>=r;if(Y===0&&(!ot||gt===r)){let dt=Ct("pad"),bt=ot?t-at-1.2:2.5*.75;Ot.forEach(N=>[-7,7].forEach(Kt=>D("triangle",ws(N-12),nt,ot?3:2.5*.6,.03*dt,{a:.7,lp:zt,detune:Kt,send:.5,hold:bt}))),D("sine",ws(Ot[0]+12),nt,2.5*.6,.012*dt,{a:.9,send:.6,hold:Math.min(bt,2.5*.75)})}if(ot){gt===r&&Y===0&&([38,45,50,57,62,66,69,74,78].forEach((dt,bt)=>F(dt,nt+bt*.075,.9-bt*.04,5.5,.5)),D("sine",ws(26),nt,3.2,.2,{a:.02})),gt===r+1&&Y===0&&(F(86,nt,.5,4.5,.6),F(81,nt+.16,.35,4,.6));for(let dt of c)dt>=at&&dt<at+li&&G(nt+(dt-at),1.1,.05,"highpass",5200,.6,.6,1);return}let P=Ct("comp");P&&(Y===0||Y===6)&&Ot.forEach((dt,bt)=>F(dt,nt+bt*.012,P*(Y===0?.62:.42),Y===0?2:1.3));let V=Ct("bass");if(V&&(Y===0||Y===6||Y===8)){let dt=Y===0?li*5.5:li*2.6;D("sine",ws(Et),nt,dt,.2*V,{a:.012}),D("triangle",ws(Et),nt,dt*.8,.06*V,{a:.012,lp:420})}let et=Ct("kick");et&&(Y===0||Y===8||Y===11&&gt%2===1)&&C(nt,et*(Y===11?.6:1));let L=Ct("rim");L&&(Y===4||Y===12)&&H(nt,L);let $=Ct("shaker");$&&k(nt,$,Y%4===2);let rt=Ct("pluck");if(rt&&Y%2===0){let dt=Ot[w1[Y/2]]+12+(Y===12?12:0);D("sine",ws(dt),nt,.3,.07*rt,{a:.003,send:.4}),D("triangle",ws(dt),nt,.09,.035*rt,{a:.002,lp:3e3})}let xt=Ct("lead");if(xt){let dt=(z%128+128)%128;for(let[bt,N,Kt]of b1)bt===dt&&F(N,nt,xt*.8,.5+Kt*li*1.6,.5)}for(let dt of c)dt>=at&&dt<at+li&&G(nt+(dt-at),1.1,.05,"highpass",5200,.6,.6,1)}async function J(){return x.loading||(x.loading=(async()=>{let z=await fetch(`${e.base}index.json`,{cache:"no-cache"});if(!z.ok)throw new Error("\uB0B4\uB808\uC774\uC158 \uC5C6\uC74C");x.meta=await z.json(),await Promise.all(x.lines.map(async nt=>{let at=x.meta.files?.[nt.id];if(!at)return;let Y=await(await fetch(`${e.base}${at.file}?v=${x.meta.made||""}`)).arrayBuffer(),gt=await h.decodeAudioData(Y),Ot=gt.getChannelData(0),Et=gt.sampleRate,Ct=0,zt=Ot.length-1;for(;Ct<Ot.length&&Math.abs(Ot[Ct])<.02;)Ct++;for(;zt>Ct&&Math.abs(Ot[zt])<.02;)zt--;x.buf.set(nt.id,gt),x.cut.set(nt.id,{lead:Math.max(0,Ct/Et-.04),end:zt/Et+.15})}))})().catch(()=>{x.meta=null})),x.loading}let q=z=>{let nt=x.cut.get(z.id);return nt?[z.at-nt.lead,z.at-nt.lead+nt.end]:null},it=z=>{let nt=null;for(let at of x.lines){let Y=q(at);Y&&z>=Y[0]&&(nt={l:at,sp:Y})}return nt&&z<nt.sp[1]?nt.l:null};function K(){if(x.src){try{x.src.stop()}catch{}x.src=null}x.id=null}function mt(z){u&&u.gain.setTargetAtTime(z?D0:zd,h.currentTime,z?.12:.5)}function Ut(){let z=h.currentTime;T.forEach(nt=>{try{nt.g.gain.cancelScheduledValues(z),nt.g.gain.setTargetAtTime(1e-4,z,.03),nt.src.stop(z+.15)}catch{}}),T.clear(),K()}function tt(){f&&f.gain.setTargetAtTime(g?p*.8:0,h.currentTime,.1)}return{get on(){return g},get hasVoice(){return x.buf.size>0},get voiceOn(){return A},async enable(){h||S(),h.state!=="running"&&await h.resume(),g=!0,v=!1,tt(),e&&J()},async tryEnable(){try{if(h||S(),h.state!=="running"&&(h.resume().catch(()=>{}),await new Promise(z=>setTimeout(z,350))),h.state!=="running")return!1}catch{return!1}return g=!0,v=!1,tt(),e&&J(),!0},disable(){g=!1,tt(),h&&(Ut(),v=!1,mt(!1))},setVolume(z){p=z,tt()},setVoice(z){A=z,!z&&h&&(K(),mt(!1))},caption(z){return!g||!A||!x.buf.size?null:it(z)||null},sync(z,nt){if(!h||!g)return;if(!nt){v&&(Ut(),v=!1,mt(!1));return}let at=h.currentTime;for(v&&Math.abs(at-b-z)>v1&&(Ut(),v=!1),v||(b=at-z+.05,y=Math.ceil(z/li),v=!0);y*li<z+x1;){let Y=b+y*li;Y>at-.03&&O(y,Y),y++}if(A&&x.buf.size){let Y=it(z);if(Y&&x.id!==Y.id){K();let gt=h.createBufferSource();gt.buffer=x.buf.get(Y.id),gt.connect(d);let Ot=q(Y)[0],Et=Math.max(0,z-Ot),Ct=b+Ot+Et;gt.start(Math.max(at,Ct),Et),gt.onended=()=>{x.src===gt&&(x.src=null,mt(!1))},x.src=gt,x.id=Y.id,mt(!0)}else!Y&&x.id&&(x.id=null)}},async render({withVoice:z=!0,withMusic:nt=!0}={}){if(S(),z&&e&&await J(),nt)for(let at=0;at*li<t;at++)O(at,at*li);if(z)for(let at of x.lines){let Y=q(at);if(!Y)continue;let gt=h.createBufferSource();gt.buffer=x.buf.get(at.id),gt.connect(d),gt.start(Math.max(0,Y[0]),0,Y[1]-Y[0]+.2),u.gain.setTargetAtTime(D0,Math.max(0,Y[0]),.12),u.gain.setTargetAtTime(zd,Y[1],.5)}return h.startRendering()}}}var A1=[["01","hook",.7,"\uB18D\uC5C5 \uD1B5\uACC4\uB294 \uAE30\uAD00\uB9C8\uB2E4 \uD769\uC5B4\uC838 \uC788\uACE0, \uB300\uBD80\uBD84 \uC2DC\uB3C4 \uB2E8\uC704\uC5D0\uC11C \uBA48\uCDA5\uB2C8\uB2E4.","\uB18D\uC5C5 \uD1B5\uACC4\uB294 \uAE30\uAD00\uB9C8\uB2E4 \uD769\uC5B4\uC838 \uC788\uACE0, \uB300\uBD80\uBD84 \uC2DC\uB3C4 \uB2E8\uC704\uC5D0\uC11C \uBA48\uCDA5\uB2C8\uB2E4."],["02","title",.3,"\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310\uC740 17\uAC1C \uAE30\uAD00\uC758 \uC790\uB8CC 45\uC885\uC744 \uC2DC\uAD70 \uB2E8\uC704 \uD55C \uD654\uBA74\uC5D0 \uBAA8\uC558\uC2B5\uB2C8\uB2E4.","\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310\uC740, \uC5F4\uC77C\uACF1 \uAC1C \uAE30\uAD00\uC758 \uC790\uB8CC \uB9C8\uD754\uB2E4\uC12F \uC885\uC744, \uC2DC\uAD70 \uB2E8\uC704 \uD55C \uD654\uBA74\uC5D0 \uBAA8\uC558\uC2B5\uB2C8\uB2E4."],["03","stats",.4,"168\uAC1C \uC2DC\uAD70\uC744 31\uAC1C \uC9C0\uD45C\uB85C \uACAC\uC8FC\uACE0,","\uBC31\uC721\uC2ED\uD314 \uAC1C \uC2DC\uAD70\uC744 \uC11C\uB978\uD55C \uAC1C \uC9C0\uD45C\uB85C \uACAC\uC8FC\uACE0,"],["04","real",.5,"\uC2DC\uAD70\uC744 \uACE0\uB974\uBA74 \uD654\uBA74 \uC804\uCCB4\uAC00 \uADF8 \uC9C0\uC5ED\uC758 \uC22B\uC790\uB85C \uBC14\uB01D\uB2C8\uB2E4.","\uC2DC\uAD70\uC744 \uACE0\uB974\uBA74, \uD654\uBA74 \uC804\uCCB4\uAC00 \uADF8 \uC9C0\uC5ED\uC758 \uC22B\uC790\uB85C \uBC14\uB01D\uB2C8\uB2E4."],["05","only",.4,"\uC5EC\uAE30\uC5D0, \uB2E4\uB978 \uACF3\uC5D0\uC11C \uAD6C\uD558\uAE30 \uC5B4\uB824\uC6B4 \uC790\uB8CC\uB97C \uB354\uD588\uC2B5\uB2C8\uB2E4.","\uC5EC\uAE30\uC5D0, \uB2E4\uB978 \uACF3\uC5D0\uC11C \uAD6C\uD558\uAE30 \uC5B4\uB824\uC6B4 \uC790\uB8CC\uB97C \uB354\uD588\uC2B5\uB2C8\uB2E4."],["06","parcel",.4,"\uC804\uAD6D \uB18D\uACBD\uC9C0 1,118\uB9CC \uD544\uC9C0\uB97C \uBAA8\uB450 \uBC1B\uC544, \uD544\uC9C0 \uD06C\uAE30\uC640 \uACBD\uC9C0\uC815\uB9AC\uC728\uC744 \uC2DC\uAD70\uBCC4\uB85C \uACC4\uC0B0\uD588\uC2B5\uB2C8\uB2E4.","\uC804\uAD6D \uB18D\uACBD\uC9C0 \uCC9C\uBC31\uC2ED\uD314\uB9CC \uD544\uC9C0\uB97C \uBAA8\uB450 \uBC1B\uC544, \uD544\uC9C0 \uD06C\uAE30\uC640 \uACBD\uC9C0\uC815\uB9AC\uC728\uC744 \uC2DC\uAD70\uBCC4\uB85C \uACC4\uC0B0\uD588\uC2B5\uB2C8\uB2E4."],["07","ndvi",.4,"\uC704\uC131\uC73C\uB85C\uB294 \uB17C \uD558\uB098\uD558\uB098\uC758 \uC0DD\uC721\uC744 \uB2F7\uC0C8\uB9C8\uB2E4 \uC0B4\uD54D\uB2C8\uB2E4.","\uC704\uC131\uC73C\uB85C\uB294, \uB17C \uD558\uB098\uD558\uB098\uC758 \uC0DD\uC721\uC744 \uB2F7\uC0C8\uB9C8\uB2E4 \uC0B4\uD54D\uB2C8\uB2E4."],["08","rice",.4,"\uC300 \uC218\uD655\uB7C9\uC740 7\uC6D4 \uB9D0\uBD80\uD130 \uC2DC\uAD70\uBCC4\uB85C \uC608\uCE21\uD569\uB2C8\uB2E4.","\uC300 \uC218\uD655\uB7C9\uC740, \uCE60\uC6D4 \uB9D0\uBD80\uD130 \uC2DC\uAD70\uBCC4\uB85C \uC608\uCE21\uD569\uB2C8\uB2E4."],["09","acc",.3,"\uC9C0\uB09C 13\uB144\uC744 \uAC80\uC99D\uD574 \uBCF4\uB2C8, 9\uC6D4 \uC911\uC21C \uC608\uCE21\uC774 \uAD6D\uAC00\uB370\uC774\uD130\uCC98\uC758 10\uC6D4 \uBC1C\uD45C\uB9CC\uD07C \uC815\uD655\uD588\uC2B5\uB2C8\uB2E4. 3\uC8FC \uBA3C\uC800 \uC544\uB294 \uC148\uC785\uB2C8\uB2E4.","\uC9C0\uB09C \uC2ED\uC0BC \uB144\uC744 \uAC80\uC99D\uD574 \uBCF4\uB2C8, \uAD6C\uC6D4 \uC911\uC21C \uC608\uCE21\uC774, \uAD6D\uAC00\uB370\uC774\uD130\uCC98\uC758 \uC2DC\uC6D4 \uBC1C\uD45C\uB9CC\uD07C \uC815\uD655\uD588\uC2B5\uB2C8\uB2E4. \uC0BC \uC8FC \uBA3C\uC800 \uC544\uB294 \uC148\uC785\uB2C8\uB2E4."],["10","jik",.4,"\uC2DC\uAD70\uBCC4 \uD1B5\uACC4\uB97C \uCC3E\uAE30 \uC5B4\uB824\uC6B4 \uC9C1\uBD88\uAE08\uACFC \uB18D\uCD0C\uAC1C\uBC1C \uC608\uC0B0\uC740, \uC9C0\uBC29\uC7AC\uC815365\uC758 \uC138\uBD80\uC0AC\uC5C5\uC744 \uACE8\uB77C\uB0B4 \uB18D\uAC00\uB2F9 \uAE08\uC561\uC73C\uB85C \uB9CC\uB4E4\uC5C8\uC2B5\uB2C8\uB2E4.","\uC2DC\uAD70\uBCC4 \uD1B5\uACC4\uB97C \uCC3E\uAE30 \uC5B4\uB824\uC6B4 \uC9C1\uBD88\uAE08\uACFC \uB18D\uCD0C\uAC1C\uBC1C \uC608\uC0B0\uC740, \uC9C0\uBC29\uC7AC\uC815 \uC0BC\uC721\uC624\uC758 \uC138\uBD80\uC0AC\uC5C5\uC744 \uACE8\uB77C\uB0B4, \uB18D\uAC00\uB2F9 \uAE08\uC561\uC73C\uB85C \uB9CC\uB4E4\uC5C8\uC2B5\uB2C8\uB2E4."],["11","flow",.4,"\uBB3C\uB958\uAE30\uAE30 \uC774\uC6A9 \uC2E4\uC801\uC73C\uB85C\uB294 \uB18D\uC0B0\uBB3C\uC774 \uC5B4\uB290 \uB3C4\uC2DC\uB85C \uAC00\uB294\uC9C0 \uADF8\uB838\uC2B5\uB2C8\uB2E4. 2025\uB144, \uC74C\uC131 \uC218\uBC15\uC740 \uC11C\uC6B8\uB85C, \uB17C\uC0B0 \uC218\uBC15\uC740 \uC6A9\uC778\uC73C\uB85C \uAC14\uC2B5\uB2C8\uB2E4.","\uBB3C\uB958\uAE30\uAE30 \uC774\uC6A9 \uC2E4\uC801\uC73C\uB85C\uB294, \uB18D\uC0B0\uBB3C\uC774 \uC5B4\uB290 \uB3C4\uC2DC\uB85C \uAC00\uB294\uC9C0 \uADF8\uB838\uC2B5\uB2C8\uB2E4. \uC774\uCC9C\uC774\uC2ED\uC624 \uB144, \uC74C\uC131 \uC218\uBC15\uC740 \uC11C\uC6B8\uB85C, \uB17C\uC0B0 \uC218\uBC15\uC740 \uC6A9\uC778\uC73C\uB85C \uAC14\uC2B5\uB2C8\uB2E4."],["12","vill",.4,"\uAC00\uCD95\uBD84\uB1E8\uB294 1\uB9CC 5\uCC9C \uAC1C \uB9C8\uC744 \uB2E8\uC704\uB85C,","\uAC00\uCD95\uBD84\uB1E8\uB294, \uB9CC \uC624\uCC9C \uAC1C \uB9C8\uC744 \uB2E8\uC704\uB85C,"],["13","coop",.4,"\uB18D\uD611\uACFC \uCD95\uD611\uC740 1,110\uAC1C \uC870\uD569 \uD558\uB098\uD558\uB098\uC758 \uC7AC\uBB34\uB85C \uBCF4\uC5EC \uC90D\uB2C8\uB2E4.","\uB18D\uD611\uACFC \uCD95\uD611\uC740, \uCC9C\uBC31\uC2ED \uAC1C \uC870\uD569 \uD558\uB098\uD558\uB098\uC758 \uC7AC\uBB34\uB85C \uBCF4\uC5EC \uC90D\uB2C8\uB2E4."],["14","power",.4,"\uB18D\uC0AC\uC6A9 \uC804\uAE30 200\uAC1C\uC6D4,","\uB18D\uC0AC\uC6A9 \uC804\uAE30 \uC774\uBC31 \uAC1C\uC6D4,"],["15","rio",.4,"\uC0B0\uC5C5\uC5F0\uAD00\uD45C\uC758 \uB18D\uC2DD\uD488 \uD30C\uAE09\uD6A8\uACFC,","\uC0B0\uC5C5\uC5F0\uAD00\uD45C\uC758 \uB18D\uC2DD\uD488 \uD30C\uAE09\uD6A8\uACFC,"],["16","employ",.4,"1963\uB144\uBD80\uD130 \uC774\uC5B4\uC9C4 \uB18D\uC5C5 \uC77C\uC790\uB9AC,","\uCC9C\uAD6C\uBC31\uC721\uC2ED\uC0BC \uB144\uBD80\uD130 \uC774\uC5B4\uC9C4 \uB18D\uC5C5 \uC77C\uC790\uB9AC,"],["17","soil",.4,"233\uB9CC \uAC74\uC758 \uD1A0\uC591\uAC80\uC815\uAE4C\uC9C0 \uADF8\uB9BC\uC73C\uB85C \uD480\uC5C8\uC2B5\uB2C8\uB2E4.","\uC774\uBC31\uC0BC\uC2ED\uC0BC\uB9CC \uAC74\uC758 \uD1A0\uC591\uAC80\uC815\uAE4C\uC9C0, \uADF8\uB9BC\uC73C\uB85C \uD480\uC5C8\uC2B5\uB2C8\uB2E4."],["18","wall",.5,"\uC790\uB8CC 45\uC885 \uAC00\uC6B4\uB370 36\uC885\uC740 \uC2A4\uC2A4\uB85C \uAC31\uC2E0\uB418\uACE0, \uBC1B\uC740 \uB0A0\uC9DC\uAE4C\uC9C0 \uBAA8\uB450 \uACF5\uAC1C\uD569\uB2C8\uB2E4.","\uC790\uB8CC \uB9C8\uD754\uB2E4\uC12F \uC885 \uAC00\uC6B4\uB370 \uC11C\uB978\uC5EC\uC12F \uC885\uC740 \uC2A4\uC2A4\uB85C \uAC31\uC2E0\uB418\uACE0, \uBC1B\uC740 \uB0A0\uC9DC\uAE4C\uC9C0 \uBAA8\uB450 \uACF5\uAC1C\uD569\uB2C8\uB2E4."],["19","maker",.6,"\uACF5\uAC1C\uB41C \uC790\uB8CC\uB97C \uADF8\uB300\uB85C, \uC804\uAD6D \uD3C9\uADE0\uC774 \uC544\uB2CC \uC6B0\uB9AC \uC2DC\uAD70\uC758 \uC22B\uC790\uB85C \uC804\uD569\uB2C8\uB2E4. \uBD80\uC871\uD55C \uC810\uC740 \uC54C\uB824 \uC8FC\uC2ED\uC2DC\uC624.","\uACF5\uAC1C\uB41C \uC790\uB8CC\uB97C \uADF8\uB300\uB85C, \uC804\uAD6D \uD3C9\uADE0\uC774 \uC544\uB2CC, \uC6B0\uB9AC \uC2DC\uAD70\uC758 \uC22B\uC790\uB85C \uC804\uD569\uB2C8\uB2E4. \uBD80\uC871\uD55C \uC810\uC740 \uC54C\uB824 \uC8FC\uC2ED\uC2DC\uC624."],["20","end",.9,"\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310\uC785\uB2C8\uB2E4.","\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310\uC785\uB2C8\uB2E4."]],Gd=A1.map(([s,t,e,n,i])=>({id:s,sc:t,at:+(Q[t]+e).toFixed(2),text:n,read:i}));var we=window.INTRO,ae=we.facts,ge=(s,t=document)=>t.querySelector(s),bo=(s,t=document)=>[...t.querySelectorAll(s)],Yn=ge("#stage"),ah=ge("#player"),ih=s=>s.split("|")[1].replace(/시부$/,""),ea=s=>Math.round(s).toLocaleString("ko-KR"),C1=(s,t=1)=>`${(s/1e4).toFixed(s>=1e6?0:t)}\uB9CC`,H0=s=>{let t=Math.round(s/100);return t>=1e4?`${Math.floor(t/1e4)}\uC870 ${ea(t%1e4)}\uC5B5`:`${ea(t)}\uC5B5`},R1=Object.entries(we.land.v).filter(([,s])=>s).sort((s,t)=>t[1]-s[1]).slice(0,3),P1=we.rice.fc.at(-1),N0=we.power.months,As=we.spots,I1=As.soil.pg.reduce((s,t)=>s+t,0),L1=(As.soil.pg[0]+As.soil.pg[1])/I1*100,U0=Object.entries(As.dev).sort((s,t)=>t[1]-s[1])[0],O0=Math.round(ae.parcelSmall*100),sr=s=>s.map(t=>`<span class="ln">${[...t].map(e=>`<span class="ch${e===" "?" sp":""}">${e===" "?"&nbsp;":e}</span>`).join("")}</span>`).join(""),Hd=s=>`<ul class="pts">${s.map(([t,e])=>`<li><b>${t}</b><span>${e}</span></li>`).join("")}</ul>`,W0=(s,t)=>`<p class="kicker">${s?`<b>${"\u2460\u2461\u2462\u2463\u2464\u2465".indexOf(s)+1}</b>`:""}${t}</p>`,nr=(s,t,e,n,i,r="",a="")=>`
  <section class="sc ${a}" id="sc-${s}">
    ${W0(t,e)}
    <h2 class="hl">${sr(n)}</h2>
    ${i?`<p class="it-sub">${i}</p>`:""}
    ${r}
  </section>`,xo=s=>`linear-gradient(90deg, ${s.join(", ")})`,$n=(s,{dec:t=0,suf:e="",from:n}={})=>`<b class="cnt" data-n="${s}" data-dec="${t}" data-suf="${e}"${n!=null?` data-from="${n}"`:""}>${(+s).toFixed(t)}${e}</b>`,X0=[{id:"dev",badge:"\u2462",name:"\uB18D\uCD0C\uAC1C\uBC1C",href:"ruraldev",big:$n(ae.ruraldev.sites),unit:"\uAC1C \uC0AC\uC5C5 \uC9C0\uAD6C",line:"\uC138\uBD80\uC0AC\uC5C5 \uC608\uC0B0\uACFC \uC9C0\uAD6C\uC758 \uC704\uCE58\xB7\uC900\uACF5 \uC608\uC815\uAE4C\uC9C0",cls:"right",pts:[[`${ih(U0[0])} ${U0[1]}\uACF3`,"\uC9C0\uAD6C\uAC00 \uAC00\uC7A5 \uB9CE\uC740 \uC2DC\uAD70"],[`${we.gohyang.govs}\uACF3`,"\uACE0\uD5A5\uC0AC\uB791\uAE30\uAE08 \uD68C\uACC4\uB3C4 \uAC19\uC740 \uBC29\uBC95\uC73C\uB85C"]]},{id:"vill",badge:"\u2464",name:"\uCD95\uC0B0 \uD658\uACBD",href:"livestock",big:$n(ae.livestock.villages),unit:"\uAC1C \uB9C8\uC744",line:"\uC810 \uD558\uB098\uAC00 \uB9C8\uC744 \uD558\uB098 \u2014 \uAC00\uCD95\uBD84\uB1E8 \uBC1C\uC0DD\uB7C9",pts:[]},{id:"coop",badge:"\u2464",name:"\uB18D\uC5C5\uAE08\uC735\uBCF4\uD5D8",href:"agfin",big:$n(ae.agfin.coops),unit:"\uAC1C \uB18D\xB7\uCD95\uD611",line:"\uC870\uD569 \uD558\uB098\uD558\uB098\uC758 \uACF5\uC2DC \uC7AC\uBB34\uB97C \uC9C0\uB3C4 \uC704\uC5D0",pts:[[H0(ae.agfin.paid),`${ae.agfin.year} \uB18D\uC791\uBB3C\uC7AC\uD574\uBCF4\uD5D8 \uBCF4\uD5D8\uAE08\uB3C4 \uC2DC\uAD70\uBCC4\uB85C`]]},{id:"power",badge:"\u2465",name:"\uB18D\uC0AC\uC6A9 \uC804\uAE30",href:"power",big:$n(ae.power.months),unit:"\uAC1C\uC6D4",line:`\uD55C\uC804 ${ae.power.regions}\uAC1C \uC9C0\uC5ED \xB7 \uACC4\uC808 \uC720\uD615 ${ae.power.types.length}\uAC00\uC9C0`,pts:[]},{id:"rio",badge:"\u2465",name:"\uC9C0\uC5ED\uC0B0\uC5C5\uC5F0\uAD00\uD45C(\uB18D\uC5C5)",href:"rio",big:$n(Math.round(As.rio.total/1e6)),unit:"\uC870 \uC6D0 \uB18D\uC2DD\uD488 \uC0B0\uCD9C",line:`17\uAC1C \uC2DC\uB3C4 \xB7 ${ae.rio.sectors}\uAC1C \uC0B0\uC5C5\uC758 \uD30C\uAE09\uD6A8\uACFC`,pts:[]},{id:"employ",badge:"\u2465",name:"\uB18D\uC5C5\uACE0\uC6A9",href:"employ",big:$n(+ae.employ.to-+ae.employ.from+1),unit:`\uB144\uAC04 \xB7 ${ae.employ.from}~${ae.employ.to}`,line:`\uB18D\uB9BC\uC5B4\uC5C5 \uCDE8\uC5C5\uC790 ${Math.round(ae.employ.a0/10)}\uB9CC \uBA85\uC5D0\uC11C ${Math.round(ae.employ.a1/10)}\uB9CC \uBA85\uC73C\uB85C`,pts:[]},{id:"soil",badge:"\u2465",name:"\uB18D\uACBD\uC9C0 \uD1A0\uC591",href:"soil",big:$n(Math.round(ae.soil.tests/1e4)),unit:"\uB9CC \uAC74 \uD1A0\uC591\uAC80\uC815",line:`\uB17C\uC73C\uB85C 1\xB72\uAE09\uC778 \uB545\uC740 ${L1.toFixed(1)}%\uBFD0`,pts:[]}],D1=[["home","\uC8FC\uC694\uD1B5\uACC4"],["rice","\uBCBC \uC791\uD669"],["rio","\uC0B0\uC5C5\uC5F0\uAD00\uD45C"],["flow","\uBB3C\uB958\uB3D9\uD5A5"],["power","\uB18D\uC0AC\uC6A9 \uC804\uAE30"],["employ","\uB18D\uC5C5\uACE0\uC6A9"],["agfin","\uAE08\uC735\uBCF4\uD5D8"],["jikbul","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791"],["ruraldev","\uB18D\uCD0C\uAC1C\uBC1C"],["soil","\uB18D\uACBD\uC9C0 \uD1A0\uC591"],["livestock","\uCD95\uC0B0 \uD658\uACBD"],["home_sat","\uC704\uC131\uC9C0\uB3C4"],["rice_sat","\uC704\uC131 \uC601\uC0C1"],["home_hn","\uC2DC\uAD70 \uD604\uD669\uD310"],["status","\uC790\uB8CC \uC218\uC9D1 \uD604\uD669"]],N1=[["\u2460",`${ea(ae.parcels/1e4)}\uB9CC \uD544\uC9C0 \uBD84\uC11D`,"\uC8FC\uC694\uD1B5\uACC4 \xB7 \uC704\uC131\uC9C0\uB3C4"],["\u2461","\uC300 \uC218\uD655\uB7C9 \uC608\uCE21\uACFC \uAC80\uC99D","\uBCBC \uC791\uD669"],["\u2462","\uC2DC\uAD70\uBCC4 \uC9C1\uBD88\uAE08\xB7\uB18D\uCD0C\uAC1C\uBC1C \uC608\uC0B0","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791 \xB7 \uB18D\uCD0C\uAC1C\uBC1C"],["\u2463","\uC0B0\uC9C0\uC5D0\uC11C \uB3C4\uC2DC\uB85C \uAC00\uB294 \uBB3C\uB958","\uBB3C\uB958\uB3D9\uD5A5"],["\u2464","\uB9C8\uC744\xB7\uC870\uD569 \uB2E8\uC704 \uC790\uB8CC","\uCD95\uC0B0 \uD658\uACBD \xB7 \uB18D\uC5C5\uAE08\uC735\uBCF4\uD5D8"],["\u2465",`${ae.power.months}\uAC1C\uC6D4\xB7${+ae.employ.to-+ae.employ.from+1}\uB144\uAC04 \uC2DC\uACC4\uC5F4`,"\uC804\uAE30 \xB7 \uC0B0\uC5C5\uC5F0\uAD00 \xB7 \uACE0\uC6A9 \xB7 \uD1A0\uC591"]],F0=20261110,Wd=()=>(F0=F0*1664525+1013904223>>>0)/4294967296,q0=ae.status.orgList.map((s,t)=>{let e=t%4,n=Math.floor(t/4);return{n:s,x:800+e*262+n%2*70+Wd()*70,y:96+n*176+Wd()*80,r:Wd()}});Yn.insertAdjacentHTML("beforeend",`
  <div class="orgs">${q0.map(s=>`<span class="org" style="left:${s.x.toFixed(0)}px;top:${s.y.toFixed(0)}px">${s.n}</span>`).join("")}</div>
  <div class="copy">
    <section class="sc sc-open" id="sc-hook">
      <h2 class="hl">${sr(["\uB18D\uC5C5 \uD1B5\uACC4\uB294","\uD769\uC5B4\uC838 \uC788\uB2E4"])}</h2>
      <p class="it-sub">\uAE30\uAD00\uB9C8\uB2E4 \uB530\uB85C, \uB300\uBD80\uBD84 \uC2DC\uB3C4 \uB2E8\uC704\uAE4C\uC9C0</p>
    </section>
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${sr(["\uC9C0\uC5ED\uB18D\uC5C5","\uD604\uD669\uD310"])}</h1>
      <div class="nums"><div>${$n(ae.status.orgs)}<span>\uAC1C \uAE30\uAD00</span></div><div>${$n(ae.status.items)}<span>\uC885 \uC790\uB8CC</span></div><div>${$n(we.map.sigun.length)}<span>\uAC1C \uC2DC\uAD70, \uD55C \uD654\uBA74</span></div></div>
    </section>
    ${nr("stats","","\uC8FC\uC694\uD1B5\uACC4",[`${we.map.sigun.length}\uAC1C \uC2DC\uAD70,`,`${ae.metrics}\uAC1C \uC9C0\uD45C`],"\uC804\uAD6D\xB7\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uAC19\uC740 \uB208\uAE08\uC73C\uB85C")}
    ${nr("real","","\uC8FC\uC694\uD1B5\uACC4",["\uACE0\uB974\uBA74, \uADF8 \uC2DC\uAD70\uC758","\uD604\uD669\uD310"],"\uD574\uB0A8\uAD70\uC744 \uACE0\uB978 \uC2E4\uC81C \uD654\uBA74","","narrow")}
    ${nr("parcel","\u2460","\uD544\uC9C0",[`${ea(ae.parcels/1e4)}\uB9CC \uD544\uC9C0\uB97C`,"\uC804\uBD80 \uACC4\uC0B0\uD588\uB2E4"],"",`<div class="waffle-row"><div class="waffle">${Array.from({length:100},(s,t)=>`<i class="${t<O0?"on":""}"></i>`).join("")}</div>
         <p class="waffle-cap">\uD544\uC9C0 100\uAC1C \uC911<br><b>${O0}\uAC1C</b>\uAC00 0.1ha \uBBF8\uB9CC</p></div>
       ${Hd([[`${ae.parcelMed}\u33A1`,"\uD544\uC9C0 \uD06C\uAE30 \uC911\uC559\uAC12"],[`${Math.round(ae.paddyArmt*100)}%`,"\uB17C \uACBD\uC9C0\uC815\uB9AC\uC728 \u2014 \uC2DC\uAD70\uB9C8\uB2E4 \uACAC\uC900\uB2E4"]])}`,"narrow")}
    ${nr("ndvi","\u2460","\uC704\uC131 \uC601\uC0C1",["\uB17C \uD558\uB098\uD558\uB098\uC758","\uC0DD\uC721\uC744 \uBCF8\uB2E4"],"",Hd([["10m","Sentinel-2 \uC704\uC131 \xB7 \uB17C \uD544\uC9C0\uB9CC"],["5\uC77C\uB9C8\uB2E4","2017\uB144\uBD80\uD130 \uB0A0\uC9DC\uBCC4\uB85C"]]),"narrow")}
    ${nr("rice","\u2461","\uBCBC \uC791\uD669",["\uC300 \uC218\uD655\uB7C9\uC744","7\uC6D4 \uB9D0\uBD80\uD130 \uC608\uCE21"],"",`<div class="big b1">${$n(P1.y,{dec:1})}<small>kg/10a</small></div>
       <p class="big-cap b1">${we.rice.year} \uC804\uAD6D \uB2E8\uC218 \uC608\uCE21 \xB7 \uAD6D\uAC00\uB370\uC774\uD130\uCC98 \uC608\uC0C1 ${we.rice.stat}</p>
       <div class="big b2">${$n(ae.riceAcc.m0915,{dec:1,from:ae.riceAcc.norm})}<small>kg \uD3C9\uADE0 \uC624\uCC28</small><em class="early">3\uC8FC \uBA3C\uC800</em></div>
       <p class="big-cap b2">9\uC6D4 15\uC77C \uC608\uCE21 \xB7 \uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1\uC740 ${ae.riceAcc.stat}kg</p>`)}
    ${nr("jik","\u2462","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",["\uC9C1\uBD88\uAE08, \uC6B0\uB9AC \uAD70\uC5D0","\uC5BC\uB9C8\uB098 \uC624\uB098"],`\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5\uC5D0\uC11C \uACE8\uB77C\uB0B8 \uACF5\uC775\uC9C1\uBD88 ${H0(we.jikbul.pubNat)}`)}
    ${nr("flow","\u2463","\uBB3C\uB958\uB3D9\uD5A5",["\uC0B0\uC9C0\uC5D0\uC11C \uB3C4\uC2DC\uB85C,","\uC218\uBC15\uC774 \uAC00\uB294 \uAE38"],`${we.flows.year}\uB144 \uC218\uBC15 \uD30C\uB81B\uD2B8 ${ea(we.flows.total)}\uAC1C<br><small>\uBB3C\uB958\uAE30\uAE30 \uACF5\uB3D9\uC774\uC6A9 ${ae.od.from}~${ae.od.to}\uB144 \uC790\uB8CC \xB7 ${ae.od.crops}\uAC1C \uD488\uBAA9</small>`,`<ol class="pairs">${we.flows.top.slice(0,2).map(([s,t,e])=>`<li><span class="o">${ih(s)}</span><i></i><span class="d">${ih(t)}</span><b>${ea(e)}\uAC1C</b></li>`).join("")}</ol>`)}
    ${X0.map(s=>`
      <section class="sc spot ${s.cls||""}" id="sc-${s.id}">
        ${W0(s.badge,s.name)}
        <div class="spot-big">${s.big}<small>${s.unit}</small></div>
        <p class="spot-line">${s.line}</p>
        ${s.pts.length?Hd(s.pts):""}
      </section>`).join("")}
  </div>
  <div class="only" id="sc-only">
    <p class="only-eye">\uC5EC\uAE30\uC5D0\uB9CC</p>
    <h2 class="hl">${sr(["\uB2E4\uB978 \uACF3\uC5D0\uC11C \uAD6C\uD558\uAE30 \uC5B4\uB824\uC6B4 \uC790\uB8CC"])}</h2>
    <ol class="only-list">${N1.map(([s,t,e])=>`<li><b>${s}</b><span>${t}</span><small>${e}</small></li>`).join("")}</ol>
  </div>
  <div class="labels">${R1.map(([s,t])=>`<div class="lab" data-k="${s}"><b>${ih(s)}</b><span>${C1(t)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>\uACBD\uC9C0\uBA74\uC801 ${we.land.year}</span><i class="bar" style="background:${xo(mo)}"></i><span>\uB192\uC744\uC218\uB85D \uB113\uB2E4</span></div>
    <div class="it-lg" id="lg-rice"><span>\uD3C9\uB144\uBCF4\uB2E4 \uB0AE\uC74C</span><i class="bar" style="background:${xo([Zi.lo,Zi.mid,Zi.hi])}"></i><span>\uB192\uC74C \xB7 ${we.rice.year} \uC2DC\uAD70 \uC608\uCE21</span></div>
    <div class="it-lg" id="lg-jik"><span>\uC801\uC74C</span><i class="bar" style="background:${xo(jr)}"></i><span>\uB9CE\uC74C \xB7 \uB18D\uAC00\uB2F9 \uACF5\uC775\uC9C1\uBD88(\uAE30\uBCF8\uD615) ${we.jikbul.year}</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${ri.melonO}"></i><span>\uBCF4\uB0B8 \uC0B0\uC9C0</span><i class="it-dot" style="background:${ri.melonD}"></i><span>\uBC1B\uC740 \uACF3 \xB7 ${we.flows.year}\uB144 ${we.flows.months}</span></div>
    <div class="it-lg" id="lg-coop"><i class="it-dot" style="background:#f5a524"></i><span>\uC9C0\uC5ED\uB18D\uD611 ${As.coopKinds.L}</span><i class="it-dot" style="background:#ff7a59"></i><span>\uCD95\uD611 ${As.coopKinds.X}</span><i class="it-dot" style="background:#7cc98f"></i><span>\uD488\uBAA9\uB18D\uD611 ${As.coopKinds.I} \xB7 \uC810 \uD06C\uAE30 = \uC790\uC0B0</span></div>
    <div class="it-lg left" id="lg-dev"><span>\uC801\uC74C</span><i class="bar" style="background:${xo(th)}"></i><span>\uB9CE\uC74C \xB7 \uAE30\uB465 \uB192\uC774 = \uC2DC\uAD70 \uC0AC\uC5C5 \uC9C0\uAD6C \uC218</span></div>
    <div class="it-lg" id="lg-lv"><span>\uB9C8\uC744\uB2F9 \uBD84\uB1E8 \uC801\uC74C</span><i class="bar" style="background:${xo(eh)}"></i><span>\uB9CE\uC74C \xB7 ${ae.livestock.from}~${ae.livestock.to}</span></div>
    <div class="it-lg" id="lg-power"><span>\uC804\uAD6D \uB18D\uC0AC\uC6A9 \uC804\uB825 \uC6D4 \uC0AC\uC6A9\uB7C9 \xB7 ${N0[0].replace("-",".")}~${N0.at(-1).replace("-",".")}</span></div>
  </div>`);var Ue=A0(Yn,we,["home","home_jn","home_hn","home_sat"]);T0(Yn,D1);var ir=we.shots.ndvi||{};Yn.insertAdjacentHTML("beforeend",`
  <div class="nd" id="nd">
    <div class="nd-frame">
      <img class="nd-w" src="assets/intro/shots/ndvi_wide.webp" alt="" decoding="async" style="transform-origin:${(ir.fx??.3)*100}% ${(ir.fy??.42)*100}%">
      <img class="nd-z" src="assets/intro/shots/ndvi_zoom.webp" alt="" decoding="async" style="transform-origin:40% 63%">
      <img class="nd-c" src="assets/intro/shots/ndvi_close.webp" alt="" decoding="async">
      <span class="nd-ring" style="left:${(ir.fx??.3)*100}%;top:${(ir.fy??.42)*100}%"></span>
      <div class="nd-tag"><b>${ir.where||"\uAE40\uC81C\uC2DC"} \uB17C NDVI</b><span>Sentinel-2 \xB7 ${ir.date?ir.date.replace(/-/g,"."):""}</span></div>
      <div class="nd-lg"><span>\uB0AE\uC74C</span><i></i><span>\uB192\uC74C \xB7 \uBCBC\uAC00 \uD478\uB97C\uC218\uB85D \uCD08\uB85D</span></div>
    </div>
  </div>`);var $0=(s,t,e,n,i)=>(Yn.insertAdjacentHTML("beforeend",`<div class="mini" id="mini-${s}" style="left:${e}px;top:${n}px;width:${i}px"><div class="scr-bar"><i></i><i></i><i></i><span class="scr-url">ag-rstat.vercel.app/${t}</span></div><div class="mini-view" style="height:${Math.round(i*9/16)}px"><img src="assets/intro/shots/${t}.webp" alt="" decoding="async"></div></div>`),ge(`#mini-${s}`));$0("rio","rio",150,590,620);$0("employ","employ",1230,96,580);Yn.insertAdjacentHTML("beforeend",`
  <div class="wall-copy" id="sc-wall">
    <p class="kicker">\uC790\uB8CC \uC218\uC9D1 \uD604\uD669</p>
    <h2 class="hl">${sr([`${ae.status.items}\uC885 \uAC00\uC6B4\uB370 ${ae.status.auto}\uC885\uC740 \uC2A4\uC2A4\uB85C \uAC31\uC2E0`])}</h2>
    <p class="it-sub">${ae.status.orgs}\uAC1C \uAE30\uAD00\uC758 \uACF5\uAC1C \uC790\uB8CC \xB7 \uBB34\uC5C7\uC744 \uC5B8\uC81C \uBC1B\uC558\uB294\uC9C0\uAE4C\uC9C0 \uACF5\uAC1C</p>
  </div>
  <div class="maker" id="sc-maker">
    <figure class="mk-photo"><img src="assets/maker.webp" alt="" width="360" height="540"></figure>
    <div class="mk-text">
      <p class="kicker">\uB9CC\uB4E0 \uC774</p>
      <h2 class="hl">${sr(["\uB9CC\uB4E0 \uC774\uC758 \uC0DD\uAC01"])}</h2>
      <ol class="mk-phil">
        <li><b>\uADF8\uB300\uB85C</b><span>\uACF5\uAC1C\uB41C \uC790\uB8CC\uB97C \uCD9C\uCC98\uC640 \uD568\uAED8, \uACE0\uCE58\uC9C0 \uC54A\uACE0</span></li>
        <li><b>\uC6B0\uB9AC \uC2DC\uAD70</b><span>\uC804\uAD6D \uD3C9\uADE0\uC774 \uC544\uB2C8\uB77C \uB0B4 \uC9C0\uC5ED\uC758 \uC22B\uC790\uB85C</span></li>
        <li><b>\uAC80\uC99D</b><span>\uC608\uCE21\uC740 \uB9DE\uC558\uB294\uC9C0\uAE4C\uC9C0 \uACF5\uAC1C\uD55C\uB2E4</span></li>
        <li><b>\uD55C \uD654\uBA74</b><span>\uBAA8\uC740 \uC790\uB8CC\uB294 \uBAA8\uB450 \uADF8\uB9BC\uC73C\uB85C, \uD55C\uB208\uC5D0</span></li>
      </ol>
      <p class="mk-quote">\u201C\uC800\uB294 \uC644\uBCBD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uBD80\uC871\uD55C \uBD80\uBD84\uC740 \uC9C0\uC801\uD574 \uC8FC\uC2DC\uACE0,<br>\uD544\uC694\uD55C \uC790\uB8CC\uB098 \uAE30\uB2A5\uC774 \uC788\uC73C\uBA74 \uB9D0\uC500\uD574 \uC8FC\uC138\uC694.\u201D</p>
      <p class="mk-mail">agrirstat@gmail.com</p>
    </div>
  </div>
  <div class="outro" id="sc-end">
    <span class="mark big"></span>
    <h2 class="hl">${sr(["\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310"])}</h2>
    <p class="url">ag-rstat.vercel.app</p>
    <p class="srcs">\uAD6D\uAC00\uB370\uC774\uD130\uCC98 \xB7 \uD55C\uAD6D\uC740\uD589 \xB7 \uD55C\uC804 \xB7 \uB18D\uCD0C\uC9C4\uD765\uCCAD \xB7 \uC9C0\uBC29\uC7AC\uC815365 \uB4F1 ${ae.status.orgs}\uAC1C \uAE30\uAD00 \uACF5\uAC1C \uC790\uB8CC</p>
    <div class="btns"><a class="btn pri" href="./">\uD604\uD669\uD310 \uC5F4\uAE30</a><button type="button" class="btn" id="again">\uB2E4\uC2DC \uBCF4\uAE30</button></div>
  </div>`);var _n={scene:0,bgI:0,glow:0,morph:0,pAlpha:1,mapAlpha:0,rise:0,tilt:0,orbit:0,camDist:23.5,camX:0,camY:0,mapShift:300,mapLift:0,riceColor:0,jikColor:0,mapDim:0,glAlpha:1,labels:0,riceAlpha:0,riceLine:0,riceFc:0,accAlpha:0,riceAcc:0,bdAlpha:0,bdBars:0,bdSplit:0,flows:0,flowAlpha:0,spiral:0,powerAlpha:0,rioA:0,rioP:0,empA:0,empP:0,coopA:0,coopP:0,devRise:0,devColor:0,soilA:0,soilP:0,lvA:0,lvP:0},na=y0(ge("#gl"),we),Y0=M0(ge("#fx"),we,na),U1=S0(ge("#rice"),we),O1=b0(ge("#rice"),we),Z0=P0(ge("#sp"),ge("#spsvg"),we,na),yo={draw(){},canvas:ge("#bg"),kind:"\u2026"},F1=bo(".lab",Yn),sh=960,$d=540;function J0(){let s=ah.clientWidth/cn;Yn.style.transform=`scale(${s})`;let t=Math.min(window.devicePixelRatio||1,1.75),e=Math.min(2880,Math.max(640,Math.round(cn*s*t))),n=Math.round(e*Ji/cn);na.resize(e,n),Y0.resize(e,n),Z0.resize(e,n),sh=Math.max(480,Math.round(e/2)),$d=Math.round(sh*Ji/cn),yo.canvas.width=sh,yo.canvas.height=$d}new ResizeObserver(J0).observe(ah);var Mo=[{t:Q.hook,name:"\uC5F4\uAE30"},{t:Q.stats,name:"\uC8FC\uC694\uD1B5\uACC4",href:"./"},{t:Q.real,name:"\uC2E4\uC81C \uD654\uBA74",href:"./"},{t:Q.only,name:"\uC5EC\uAE30\uC5D0\uB9CC"},{t:Q.parcel,name:"\uD544\uC9C0\xB7\uC704\uC131",href:"./"},{t:Q.rice,name:"\uBCBC \uC791\uD669",href:"rice"},{t:Q.jik,name:"\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",href:"jikbul"},{t:Q.dev,name:"\uB18D\uCD0C\uAC1C\uBC1C",href:"ruraldev"},{t:Q.flow,name:"\uBB3C\uB958\uB3D9\uD5A5",href:"flow"},{t:Q.vill,name:"\uCD95\uC0B0 \uD658\uACBD",href:"livestock"},{t:Q.coop,name:"\uB18D\uC5C5\uAE08\uC735\uBCF4\uD5D8",href:"agfin"},{t:Q.power,name:"\uB18D\uC0AC\uC6A9 \uC804\uAE30",href:"power"},{t:Q.rio,name:"\uC9C0\uC5ED\uC0B0\uC5C5\uC5F0\uAD00\uD45C(\uB18D\uC5C5)",href:"rio"},{t:Q.employ,name:"\uB18D\uC5C5\uACE0\uC6A9",href:"employ"},{t:Q.soil,name:"\uB18D\uACBD\uC9C0 \uD1A0\uC591",href:"soil"},{t:Q.wall,name:"\uC790\uB8CC \uC218\uC9D1 \uD604\uD669",href:"status"},{t:Q.maker,name:"\uB9CC\uB4E0\uC774",href:"about"},{t:Q.end,name:"\uB2EB\uAE30"}],Bt=Gn.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),$t=(s,t,e,n="power2.inOut")=>Bt.to(_n,{...s,duration:e,ease:n},t),Tn=(s,t=1.2)=>$t({scene:L0.indexOf(s)},Q[s]-.4,t);function ui(s,t){let e=typeof s=="string"?ge(s):s;Bt.set(e,{autoAlpha:1,y:0},t);let n=e.querySelector(".kicker");n&&Bt.fromTo(n,{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.6,ease:"power3.out"},t);let i=e.querySelectorAll(".hl .ch");i.length&&Bt.fromTo(i,{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.85,stagger:Math.min(.028,.5/i.length),ease:"expo.out"},t+.1);let r=e.querySelector(".it-sub");r&&Bt.fromTo(r,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.7,ease:"power2.out"},t+.5)}var di=(s,t)=>Bt.to(typeof s=="string"?ge(s):s,{autoAlpha:0,y:-24,duration:.45,ease:"power2.in"},t),oh=(s,t,e=.16)=>{let n=bo(`${s} .pts li, ${s} .pairs li`);n.length&&Bt.fromTo(n,{autoAlpha:0,x:-16},{autoAlpha:1,x:0,stagger:e,duration:.55,ease:"power2.out"},t)},K0=[];function lh(s,t,e){let n=+s.dataset.n,i=+(s.dataset.dec||0),r=s.dataset.suf||"",a=s.dataset.from!=null?+s.dataset.from:i?n*.94:0,o={v:a,last:""};K0.push({elm:s,o,dec:i,suf:r}),Bt.fromTo(o,{v:a},{v:n,duration:e,ease:"power3.out"},t)}var Es=(s,t,e)=>Bt.fromTo(`#lg-${s}`,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},t).to(`#lg-${s}`,{autoAlpha:0,duration:.4},e),ch=Ue.zoom,j0=(s,t,e=.4)=>{Object.entries(Ue.imgs).forEach(([n,i])=>Bt.to(i,{autoAlpha:n===s?1:0,duration:e,ease:"power1.inOut"},t))},Q0=(s,t,e,n="sine.inOut",i)=>Bt.to(ch,{...Ue.focus(s,i),duration:e,ease:n},t);function tg(s,t,e=.8){let n=Ue.at(s);Bt.to(Ue.cursor,{x:n.x,y:n.y,duration:e,ease:"power3.inOut"},t-e).fromTo(Ue.cursor.querySelector(".ripple"),{scale:.2,autoAlpha:.9},{scale:2.6,autoAlpha:0,duration:.55,ease:"power2.out"},t).fromTo(Ue.cursor.querySelector("svg"),{scale:1},{scale:.82,duration:.08,yoyo:!0,repeat:1,ease:"power1.inOut"},t)}Gn.set(".sc, .it-lg, .outro, .maker, .wall-copy, .only, #scr-wrap, #wall-wrap, #nd, .nd-z, .nd-c, .mini, .org",{autoAlpha:0});Gn.set(ch,{scale:1,x:0,y:0,transformOrigin:"0 0"});Gn.set(Ue.cursor,{x:1160,y:679,autoAlpha:0});Gn.set(Ue.cursor.querySelector(".ripple"),{autoAlpha:0});Gn.set(Object.values(Ue.imgs),{autoAlpha:0});$t({bgI:1},0,1.6,"power1.out");$t({glow:.22},.4,2);var B1=bo(".org",Yn);B1.forEach((s,t)=>{let e=q0[t];Bt.fromTo(s,{autoAlpha:0,scale:.86},{autoAlpha:.9,scale:1,duration:.7,ease:"power2.out"},.25+e.r*2.2).fromTo(s,{x:0,y:0},{x:(e.r-.5)*70,y:(.5-e.r*7%1)*50,duration:Q.title+.6,ease:"sine.inOut"},0).to(s,{x:1260-e.x-60,y:540-e.y,scale:.25,autoAlpha:0,duration:1.5,ease:"power3.in"},Q.title+.1+e.r*.5)});ui("#sc-hook",.4);di("#sc-hook",Q.title-.35);Tn("title");$t({morph:1},Q.title+.2,3.4,"none");$t({glow:.5},Q.title+.6,2.2);ui("#sc-open",Q.title+.25);Bt.fromTo("#sc-open .mark",{scale:.4,rotate:-90},{scale:1,rotate:0,duration:1.2,ease:"back.out(2)"},Q.title+.25);Bt.fromTo("#sc-open .nums > div",{autoAlpha:0,y:18},{autoAlpha:1,y:0,stagger:.9,duration:.6,ease:"power2.out"},Q.title+2.3);bo("#sc-open .cnt").forEach((s,t)=>lh(s,Q.title+2.3+t*.9,1.1));di("#sc-open",Q.stats-.5);$t({mapAlpha:1},Q.title+3,1.2);$t({pAlpha:.32},Q.title+3.6,1);Tn("stats",1.4);$t({tilt:1},Q.stats-.2,2);$t({rise:1},Q.stats+.2,2.2,"power2.out");$t({orbit:.34,camDist:21.2},Q.stats-.2,Qe.stats+.4,"sine.inOut");$t({pAlpha:0},Q.stats+.4,1);ui("#sc-stats",Q.stats+.1);Es("stats",Q.stats+.8,Q.real-.6);$t({labels:1},Q.stats+2.2,.6,"power2.out");$t({labels:0},Q.real-.7,.4);di("#sc-stats",Q.real-.5);Tn("real");$t({glAlpha:0},Q.real-.5,.8);var Bn=Q.real;Bt.set(Ue.imgs.home,{autoAlpha:1},Bn).set([Ue.imgs.home_jn,Ue.imgs.home_hn,Ue.imgs.home_sat],{autoAlpha:0},Bn).set(ch,{scale:1,x:0,y:0},Bn).fromTo("#scr-wrap",{autoAlpha:0,rotateY:-30,rotateX:10,x:220,z:-320,scale:1},{autoAlpha:1,rotateY:-6,rotateX:2,x:0,z:0,duration:1.3,ease:"expo.out"},Bn);ui("#sc-real",Bn+.2);Bt.set(Ue.cursor,{autoAlpha:1},Bn+.9);tg(Ue.box("home","#sido"),Bn+2,1);j0("home_jn",Bn+2.15);tg(Ue.box("home_jn","#sgg"),Bn+3.3,.8);j0("home_hn",Bn+3.45);Bt.to(Ue.cursor,{autoAlpha:0,duration:.3},Bn+4);Bt.to("#scr-wrap",{rotateY:0,rotateX:0,duration:2.6,ease:"sine.inOut"},Bn+3.6);Q0([98,50,1240,700],Bn+4.1,Qe.real-4.5,"sine.inOut",1);Bt.to("#scr-wrap",{autoAlpha:0,scale:.94,duration:.45,ease:"power2.in"},Q.only-.5);di("#sc-real",Q.only-.5);Tn("only");Bt.set("#sc-only",{autoAlpha:1},Q.only).fromTo("#sc-only .only-eye",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},Q.only).fromTo("#sc-only .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.018,ease:"expo.out"},Q.only+.1).fromTo("#sc-only li",{autoAlpha:0,y:26,scale:.96},{autoAlpha:1,y:0,scale:1,duration:.55,stagger:.26,ease:"back.out(1.6)"},Q.only+.8).to("#sc-only",{autoAlpha:0,y:-20,duration:.4,ease:"power2.in"},Q.parcel-.45).set("#sc-only",{y:0},Q.only-.01);Tn("parcel");var Ci=Q.parcel;Bt.set(Ue.imgs.home_sat,{autoAlpha:1},Ci).set([Ue.imgs.home,Ue.imgs.home_jn,Ue.imgs.home_hn],{autoAlpha:0},Ci).set(ch,{scale:1,x:0,y:0},Ci).set(Ue.cursor,{autoAlpha:0},Ci).fromTo("#scr-wrap",{autoAlpha:0,rotateY:22,rotateX:4,x:160,z:-200,scale:1},{autoAlpha:1,rotateY:-3,rotateX:1,x:0,z:0,duration:1.2,ease:"expo.out"},Ci);Q0([330,150,900,560],Ci+.9,Qe.parcel-1.2,"sine.inOut",1);ui("#sc-parcel",Ci+.15);Bt.fromTo("#sc-parcel .waffle-row",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},Ci+1).fromTo("#sc-parcel .waffle i.on",{backgroundColor:"rgba(255,255,255,0.09)",scale:.6},{backgroundColor:"#f5a524",scale:1,duration:.3,stagger:.028,ease:"power2.out"},Ci+1.3);oh("#sc-parcel",Ci+3.4,.9);Bt.to("#scr-wrap",{autoAlpha:0,scale:.92,rotateY:-16,x:-80,duration:.6,ease:"power2.in"},Q.ndvi-.5);di("#sc-parcel",Q.ndvi-.5);Tn("ndvi");var hi=Q.ndvi;ui("#sc-ndvi",hi+.15);oh("#sc-ndvi",hi+1.2,.5);Bt.set("#nd",{autoAlpha:1},hi-.1).fromTo("#nd .nd-frame",{autoAlpha:0,scale:.9,rotateY:14},{autoAlpha:1,scale:1,rotateY:0,duration:.9,ease:"expo.out"},hi-.1).fromTo("#nd .nd-tag, #nd .nd-lg",{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,stagger:.1},hi+.4).fromTo("#nd .nd-ring",{autoAlpha:0,scale:2},{autoAlpha:1,scale:1,duration:.45,ease:"power2.out"},hi+.5).fromTo("#nd .nd-w",{scale:1,autoAlpha:1},{scale:2.1,duration:1.3,ease:"power2.in"},hi+.9).to("#nd .nd-ring",{autoAlpha:0,scale:.4,duration:.35},hi+1.5).fromTo("#nd .nd-z",{autoAlpha:0,scale:1.06},{autoAlpha:1,scale:1,duration:.45,ease:"power1.out"},hi+2).to("#nd .nd-z",{scale:2.07,duration:1.1,ease:"power2.in"},hi+2.5).fromTo("#nd .nd-c",{autoAlpha:0,scale:1.04},{autoAlpha:1,scale:1.14,duration:Qe.ndvi-3.4,ease:"sine.out"},hi+3.4).to("#nd",{autoAlpha:0,duration:.5,ease:"power2.in"},Q.rice-.55);di("#sc-ndvi",Q.rice-.55);Tn("rice");Bt.set(_n,{riceColor:1,jikColor:0,devColor:0,mapDim:0,rise:0,devRise:0,tilt:.24,orbit:0,camDist:23,camX:0,camY:0,mapShift:300,labels:0,pAlpha:0,mapAlpha:1},Q.rice-.3);$t({glAlpha:1},Q.rice-.25,.9);ui("#sc-rice",Q.rice+.15);Bt.set("#sc-rice .b2",{autoAlpha:0},Q.rice);$t({riceAlpha:1},Q.rice+.3,.6,"power1.out");$t({riceLine:1},Q.rice+.4,1.6,"power1.inOut");$t({riceFc:1},Q.rice+1.7,1.7,"power1.out");Bt.fromTo("#sc-rice .b1",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.1,duration:.6,ease:"power2.out"},Q.rice+1.4);lh(ge("#sc-rice .b1 .cnt"),Q.rice+1.4,1.8);Es("rice",Q.rice+.8,Q.jik-.4);$t({orbit:.1,camDist:22},Q.rice,Qe.rice+Qe.acc,"sine.inOut");$t({riceAlpha:0},Q.acc-.3,.5);Bt.to("#sc-rice .b1",{autoAlpha:0,y:-10,duration:.4},Q.acc-.3);Tn("acc");$t({accAlpha:1},Q.acc+.1,.4,"none");$t({riceAcc:1},Q.acc+.2,3,"power1.out");Bt.fromTo("#sc-rice .b2",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},Q.acc+.3);lh(ge("#sc-rice .b2 .cnt"),Q.acc+.3,2.6);Bt.fromTo("#sc-rice .early",{autoAlpha:0,scale:.6},{autoAlpha:1,scale:1,duration:.6,ease:"back.out(2.4)"},Q.acc+7.4);$t({accAlpha:0},Q.jik-.5,.4);di("#sc-rice",Q.jik-.5);Tn("jik");$t({riceColor:0,jikColor:1},Q.jik-.2,1.2);$t({orbit:.16,tilt:.42,camDist:22},Q.jik-.2,Qe.jik,"sine.inOut");ui("#sc-jik",Q.jik+.15);Es("jik",Q.jik+.6,Q.dev-.4);$t({bdAlpha:1},Q.jik+.7,.4,"none");$t({bdBars:1},Q.jik+.8,1.6,"power1.out");$t({bdSplit:1},Q.jik+2,1.6,"power1.out");$t({bdAlpha:0},Q.dev-.5,.4);di("#sc-jik",Q.dev-.5);var rr=s=>{let t=X0.find(i=>i.id===s),e=Q[s],n=ge(`#sc-${s}`);Tn(s,1),ui(n,e+.05),Bt.fromTo(n.querySelectorAll(".spot-big, .spot-line"),{autoAlpha:0,y:16},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power3.out"},e+.15),lh(n.querySelector(".cnt"),e+.15,Math.min(1.6,Qe[s]*.4)),t.pts.length&&oh(`#sc-${s}`,e+1.4,.7),di(n,e+Qe[s]-.45)};rr("dev");$t({jikColor:0,devColor:1,mapShift:-330,tilt:.95,orbit:-.42,camDist:20.5},Q.dev-.5,1.5);$t({devRise:1},Q.dev+.4,2.2,"power2.out");$t({orbit:-.1},Q.dev+1,Qe.dev-1.2,"sine.inOut");Es("dev",Q.dev+.8,Q.flow-.5);Tn("flow");$t({devRise:0,devColor:0,mapDim:1,mapShift:300,tilt:0,orbit:0,camDist:16.4,camX:.5,camY:1.3},Q.flow-.5,1.5);$t({camDist:14.6,camY:1.6},Q.flow+1.2,Qe.flow-1.8,"sine.inOut");$t({flowAlpha:1},Q.flow+.6,.3,"none");$t({flows:1},Q.flow+.6,3.2,"power1.out");ui("#sc-flow",Q.flow+.2);oh("#sc-flow",Q.flow+6.3,1.9);Es("flow",Q.flow+1,Q.vill-.6);$t({flowAlpha:0},Q.vill-.5,.5);di("#sc-flow",Q.vill-.5);rr("vill");$t({camDist:22,camX:0,camY:0,mapDim:.9},Q.vill-.5,1.2);$t({lvA:1},Q.vill,.3,"none");$t({lvP:1},Q.vill+.1,2.6,"power1.inOut");Es("lv",Q.vill+.6,Q.coop-.4);$t({lvA:0},Q.coop-.4,.5);rr("coop");$t({mapDim:1,camDist:21},Q.coop-.3,Qe.coop,"sine.inOut");$t({coopA:1},Q.coop-.1,.3,"none");$t({coopP:1},Q.coop+.1,2.6,"power1.inOut");Es("coop",Q.coop+.6,Q.power-.4);$t({coopA:0},Q.power-.5,.45);$t({glAlpha:0},Q.power-.5,.6);rr("power");$t({powerAlpha:1},Q.power-.1,.5,"power1.out");$t({spiral:1},Q.power,Qe.power-.7,"power1.inOut");Es("power",Q.power+.5,Q.rio-.5);$t({powerAlpha:0},Q.rio-.45,.45);rr("rio");$t({rioA:1},Q.rio-.15,.45,"power1.out");$t({rioP:1},Q.rio,2.2,"power2.out");$t({rioA:0},Q.employ-.45,.45);var eg=(s,t,e,n)=>Bt.fromTo(`#mini-${s}`,{autoAlpha:0,...n},{autoAlpha:1,x:0,y:0,rotateY:0,duration:.8,ease:"expo.out"},t).fromTo(`#mini-${s} img`,{scale:1},{scale:1.14,duration:e-t,ease:"sine.inOut"},t).to(`#mini-${s}`,{autoAlpha:0,duration:.4},e-.45);eg("rio",Q.rio+.7,Q.employ,{y:40});rr("employ");eg("employ",Q.employ+.4,Q.soil,{x:60});$t({empA:1},Q.employ-.1,.4,"none");$t({empP:1},Q.employ+.1,Qe.employ-1.5,"power1.inOut");$t({empA:0},Q.soil-.45,.45);rr("soil");$t({soilA:1},Q.soil-.1,.4,"none");$t({soilP:1},Q.soil+.1,2.4,"power1.out");$t({soilA:0},Q.wall-.5,.45);Tn("wall");Bt.set("#wall-wrap",{autoAlpha:1},Q.wall).fromTo("#wall .wt",{autoAlpha:0,z:-600,rotateX:-40},{autoAlpha:1,z:0,rotateX:0,duration:1.1,stagger:{each:.05,from:"center"},ease:"power3.out"},Q.wall).fromTo("#wall",{rotateZ:-7,rotateX:26,y:40},{rotateZ:-3,rotateX:18,y:0,duration:Qe.wall,ease:"sine.inOut"},Q.wall).to("#wall-wrap",{autoAlpha:0,duration:.5},Q.maker-.5);ui("#sc-wall",Q.wall+.3);di("#sc-wall",Q.maker-.5);Tn("maker");Bt.set("#sc-maker",{autoAlpha:1,y:0},Q.maker).fromTo("#sc-maker .mk-photo",{autoAlpha:0,y:40,scale:.94},{autoAlpha:1,y:0,scale:1,duration:1.2,ease:"power3.out"},Q.maker+.1).fromTo("#sc-maker .kicker",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.5},Q.maker+.3).fromTo("#sc-maker .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.04,ease:"expo.out"},Q.maker+.4).fromTo("#sc-maker .mk-phil li",{autoAlpha:0,x:-18},{autoAlpha:1,x:0,duration:.6,stagger:.6,ease:"power2.out"},Q.maker+1.1).fromTo("#sc-maker .mk-quote, #sc-maker .mk-mail",{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.7,stagger:.4,ease:"power2.out"},Q.maker+5.6).to("#sc-maker",{autoAlpha:0,y:-20,duration:.5,ease:"power2.in"},Q.end-.5);Tn("end");$t({glow:.55},Q.end-.3,1.2);Bt.set("#sc-end",{autoAlpha:1},Q.end).fromTo("#sc-end .mark",{scale:.3,rotate:-120,autoAlpha:0},{scale:1,rotate:0,autoAlpha:1,duration:1.1,ease:"back.out(1.8)"},Q.end).fromTo("#sc-end .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.035,ease:"expo.out"},Q.end+.15).fromTo("#sc-end .url, #sc-end .srcs, #sc-end .btns",{autoAlpha:0,y:12},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},Q.end+.6).set({},{},Ei);var ta=Nd.map(([s,t])=>[Ss(s).map(e=>e/255),Ss(t).map(e=>e/255)]),ci=new Float32Array(16),k1=performance.now();function B0(){let s=Bt.time(),t=(performance.now()-k1)/1e3,e=Math.min(Nd.length-2,Math.floor(_n.scene)),n=_n.scene-e;for(let i=0;i<3;i++)ci[4+i]=ta[e][0][i]+(ta[e+1][0][i]-ta[e][0][i])*n,ci[8+i]=ta[e][1][i]+(ta[e+1][1][i]-ta[e][1][i])*n;ci[0]=t,ci[1]=_n.bgI,ci[2]=sh,ci[3]=$d,ci[12]=(cn/2+_n.mapShift)/cn,ci[13]=.5,ci[14]=.42,ci[15]=_n.glow,yo.draw(ci),na.render(_n,t),Y0.render(_n,s),U1.render(_n),O1.render(_n),Z0.render(_n,s),F1.forEach((i,r)=>{let a=na.top(i.dataset.k);if(!a||_n.labels<=.01){i.style.opacity=0;return}let[o,l]=na.project(a[0],a[1],a[2]),c=Math.min(1,Math.max(0,_n.labels*1.4-r*.2));i.style.opacity=c,i.style.transform=`translate(${o.toFixed(1)}px, ${(l-12*(1-c)).toFixed(1)}px)`}),K0.forEach(i=>{let r=i.o.v.toFixed(i.dec).replace(/\B(?=(\d{3})+(?!\d))/g,",")+i.suf;r!==i.o.last&&(i.o.last=r,i.elm.textContent=r)}),H1()}var Yd=ge("#play"),Ri=ge("#track"),z1=ge("#fill"),V1=ge("#time"),Xd=ge("#go"),ng=ge("#chaps"),G1=ge("#chapname");Ri.setAttribute("aria-valuemax",Ei);ng.innerHTML=Mo.map(s=>`<button type="button" data-t="${s.t}" style="left:${s.t/Ei*100}%" title="${s.name}" aria-label="${s.name}\uBD80\uD130 \uBCF4\uAE30"></button>`).join("");var ig=[...ng.children],k0=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`,z0=-1,V0="";function H1(){let s=Bt.time();z1.style.transform=`scaleX(${s/Ei})`,V1.textContent=`${k0(s)} / ${k0(Ei)}`,Ri.setAttribute("aria-valuenow",s.toFixed(1));let t=Mo.reduce((n,i,r)=>s>=i.t-.01?r:n,0);if(t!==z0){z0=t,ig.forEach((i,r)=>{i.classList.toggle("on",r===t),i.classList.toggle("past",r<t)});let n=Mo[t];G1.textContent=`${String(t).padStart(2,"0")} ${n.name}`,Xd.hidden=!n.href,n.href&&(Xd.href=n.href,Xd.textContent=`${n.name} \uD654\uBA74 \uC5F4\uAE30 \u2192`)}let e=Bt.progress()>=1?"end":Bt.paused()?"paused":"playing";e!==V0&&(V0=e,Yd.dataset.state=e,Yd.setAttribute("aria-label",e==="playing"?"\uBA48\uCDA4":e==="end"?"\uB2E4\uC2DC \uBCF4\uAE30":"\uC7AC\uC0DD"),ah.classList.toggle("is-paused",e==="paused"))}function sg(){Bt.progress()>=1?Bt.restart():Bt.paused(!Bt.paused())}Yd.addEventListener("click",sg);ge("#again").addEventListener("click",()=>Bt.restart());ge("#bigplay").addEventListener("click",()=>Bt.progress()>=1?Bt.restart():Bt.play());ig.forEach(s=>s.addEventListener("click",t=>{t.stopPropagation(),Bt.seek(+s.dataset.t+.001,!1),Bt.progress()<1&&Bt.play()}));var rg=!1,ag=s=>{let t=Ri.getBoundingClientRect();Bt.seek(Math.min(1,Math.max(0,(s.clientX-t.left)/t.width))*Ei,!1)};Ri.addEventListener("pointerdown",s=>{s.target.closest("button")||(rg=!Bt.paused()&&Bt.progress()<1,Bt.pause(),Ri.setPointerCapture(s.pointerId),ag(s))});Ri.addEventListener("pointermove",s=>{Ri.hasPointerCapture(s.pointerId)&&ag(s)});Ri.addEventListener("pointerup",s=>{Ri.releasePointerCapture(s.pointerId),rg&&Bt.play()});Ri.addEventListener("keydown",s=>{let t={ArrowLeft:-5,ArrowRight:5}[s.key];t&&(s.preventDefault(),s.stopPropagation(),Bt.seek(Math.min(Ei,Math.max(0,Bt.time()+t)),!1))});document.addEventListener("keydown",s=>{if(!s.target.closest("input, textarea, select, .it-track")){if(s.key===" "||s.key==="k"){if(s.target.closest("a, button")&&s.key===" ")return;s.preventDefault(),sg()}else if(s.key==="Home")Bt.seek(0,!1);else if(s.key==="ArrowRight"){let t=Mo.find(e=>e.t>Bt.time()+.05);t&&Bt.seek(t.t+.001,!1)}else if(s.key==="ArrowLeft"){let t=[...Mo].reverse().find(e=>e.t<Bt.time()-.6);Bt.seek((t?t.t:0)+.001,!1)}}});var qd=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&!Bt.paused()?(Bt.pause(),qd=!0):!document.hidden&&qd&&(qd=!1,Bt.play())});var Be=Vd({T:Q,TOTAL:Ei,voice:{lines:Gd,base:"assets/intro/voice/"}}),vo=ge("#snd"),So=ge("#vol"),og=ge("#sndhint"),rh=ge("#vo");Yn.insertAdjacentHTML("beforeend",'<div class="cap" id="cap" aria-live="off"><span></span></div>');var lg=ge("#cap"),W1=lg.firstElementChild,G0=null;Gn.ticker.add(()=>{let s=Be.caption(Bt.time()),t=s?s.id:null;t!==G0&&(G0=t,s&&(W1.textContent=s.text),lg.classList.toggle("on",!!s)),rh.hidden=!Be.hasVoice});rh.addEventListener("click",()=>{Be.setVoice(!Be.voiceOn),rh.setAttribute("aria-pressed",Be.voiceOn),Ts.set("intro-vo",Be.voiceOn?"1":"0")});var Ts={get:s=>{try{return localStorage.getItem(s)}catch{return null}},set:(s,t)=>{try{localStorage.setItem(s,t)}catch{}}},cg=+(Ts.get("intro-vol")??70);Ts.get("intro-vo")==="0"&&(Be.setVoice(!1),rh.setAttribute("aria-pressed","false"));So.value=cg;Be.setVolume(cg/100);function Zd(){vo.setAttribute("aria-pressed",Be.on),vo.setAttribute("aria-label",Be.on?"\uC18C\uB9AC \uB044\uAE30":"\uC18C\uB9AC \uCF1C\uAE30"),vo.dataset.on=Be.on?"1":"0",Be.on&&(og.hidden=!0)}async function hh(){+So.value<5&&(So.value=70,Be.setVolume(.7),Ts.set("intro-vol",70)),await Be.enable(),Ts.set("intro-snd","1"),Zd()}vo.addEventListener("click",async()=>{Be.on?(Be.disable(),Ts.set("intro-snd","0")):await hh(),Zd()});Ts.get("intro-snd")==="1"&&Be.tryEnable().then(s=>{if(s)return Zd();let t=()=>{document.removeEventListener("click",e,!0),document.removeEventListener("keydown",e,!0)},e=n=>{t(),!(Be.on||n.target.closest?.("#snd, #sndhint, #vol")||n.type==="keydown"&&n.key==="m")&&hh()};document.addEventListener("click",e,!0),document.addEventListener("keydown",e,!0)});og.addEventListener("click",hh);So.addEventListener("input",async()=>{let s=+So.value;Be.setVolume(s/100),Ts.set("intro-vol",s),s>0&&!Be.on&&await hh()});document.addEventListener("keydown",s=>{s.key==="m"&&!s.target.closest("input, textarea, select")&&vo.click()});Gn.ticker.add(()=>Be.sync(Bt.time(),!Bt.paused()&&Bt.progress()<1));window.__intro={tl:Bt,S:_n,music:Be,render:s=>Vd({T:Q,TOTAL:Ei,voice:{lines:Gd,base:"assets/intro/voice/"},offline:!0}).render(s)};(async()=>{yo=await fp(ge("#bg"),{gpu:!/[?&]gl\b/.test(location.search)}),Yn.dataset.gpu=yo.kind,J0();let s=Promise.all([document.fonts.ready,...bo("img",Yn).map(t=>t.decode?t.decode().catch(()=>{}):Promise.resolve())]);try{await Promise.race([s,new Promise(t=>setTimeout(t,4e3))])}catch{}Gn.ticker.lagSmoothing(0),Gn.ticker.add(B0),B0(),ah.classList.add("ready"),requestAnimationFrame(()=>{Bt.seek(0,!1),Bt.play(0)})})();})();
