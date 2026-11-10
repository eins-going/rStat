(()=>{function Ai(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function rd(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var yn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ea={duration:.5,overwrite:!1,delay:0},xh,Ke,Ae,Bn=1e8,xe=1/Bn,hh=Math.PI*2,Xg=hh/4,qg=0,ad=Math.sqrt,$g=Math.cos,Yg=Math.sin,Ge=function(t){return typeof t=="string"},Oe=function(t){return typeof t=="function"},Ei=function(t){return typeof t=="number"},Eo=function(t){return typeof t>"u"},ci=function(t){return typeof t=="object"},vn=function(t){return t!==!1},vh=function(){return typeof window<"u"},go=function(t){return Oe(t)||Ge(t)},od=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},sn=Array.isArray,Zg=/random\([^)]+\)/g,Jg=/,\s*/g,Kf=/(?:-?\.?\d|\.)+/gi,yh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ts=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ih=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Mh=/[+-]=-?[.\d]+/,Kg=/[^,'"\[\]\s]+/gi,jg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Pe,oi,uh,Sh,Tn={},yo={},ld,cd=function(t){return(yo=er(t,Tn))&&rn},Co=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},na=function(t,e){return!e&&console.warn(t)},hd=function(t,e){return t&&(Tn[t]=e)&&yo&&(yo[t]=e)||Tn},ia=function(){return 0},Qg={suppressEvents:!0,isStart:!0,kill:!1},_o={suppressEvents:!0,kill:!1},t0={suppressEvents:!0},bh={},Zi=[],fh={},ud,_n={},sh={},jf=30,xo=[],wh="",Ah=function(t){var e=t[0],n,i;if(ci(e)||Oe(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=xo.length;i--&&!xo[i].targetTest(e););n=xo[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Rh(t[i],n)))||t.splice(i,1);return t},Ji=function(t){return t._gsap||Ah(kn(t))[0]._gsap},Th=function(t,e,n){return(n=t[e])&&Oe(n)?t[e]():Eo(n)&&t.getAttribute&&t.getAttribute(e)||n},un=function(t,e){return(t=t.split(",")).forEach(e)||t},Fe=function(t){return Math.round(t*1e5)/1e5||0},Re=function(t){return Math.round(t*1e7)/1e7||0},Es=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},e0=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Mo=function(){var t=Zi.length,e=Zi.slice(0),n,i;for(fh={},Zi.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Eh=function(t){return!!(t._initted||t._startAt||t.add)},fd=function(t,e,n,i){Zi.length&&!Ke&&Mo(),t.render(e,n,i||!!(Ke&&e<0&&Eh(t))),Zi.length&&!Ke&&Mo()},dd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Kg).length<2?e:Ge(t)?t.trim():t},pd=function(t){return t},En=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},n0=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},er=function(t,e){for(var n in e)t[n]=e[n];return t},Qf=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=ci(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},So=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},jr=function(t){var e=t.parent||Pe,n=t.keyframes?n0(sn(t.keyframes)):En;if(vn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},i0=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},md=function(t,e,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},Ro=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,a=e._next;r?r._next=a:t[n]===e&&(t[n]=a),a?a._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},Ki=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},bs=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},s0=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},dh=function(t,e,n,i){return t._startAt&&(Ke?t._startAt.revert(_o):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},r0=function s(t){return!t||t._ts&&s(t.parent)},td=function(t){return t._repeat?nr(t._tTime,t=t.duration()+t._rDelay)*t:0},nr=function(t,e){var n=Math.floor(t=Re(t/e));return t&&n===t?n-1:n},bo=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Po=function(t){return t._end=Re(t._start+(t._tDur/Math.abs(t._ts||t._rts||xe)||0))},Io=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Re(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Po(t),n._dirty||bs(n,t)),t},gd=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=bo(t.rawTime(),e),(!e._dur||oa(0,e.totalDuration(),n)-e._tTime>xe)&&e.render(n,!0)),bs(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-xe}},li=function(t,e,n,i){return e.parent&&Ki(e),e._start=Re((Ei(n)?n:!n&&wo(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==Pe?Fn(t,n,e):t._time)+e._delay),e._end=Re(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),md(t,e,"_first","_last",t._sort?"_start":0),wo(e)||(t._recent=e),i||gd(t,e),t._ts<0&&Io(t,t._tTime),t},_d=function(t,e){return(Tn.ScrollTrigger||Co("scrollTrigger",e))&&Tn.ScrollTrigger.create(e,t)},xd=function(t,e,n,i,r){if(Lh(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!Ke&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&ud!==xn.frame)return Zi.push(t),t._lazy=[r,i],1},a0=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},wo=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},o0=function(t,e,n,i){var r=t.ratio,a=e<0||!e&&(!t._start&&a0(t)&&!(!t._initted&&wo(t))||(t._ts<0||t._dp._ts<0)&&!wo(t))?0:1,o=t._rDelay,l=0,c,h,d;if(o&&t._repeat&&(l=oa(0,t._tDur,e),h=nr(l,o),t._yoyo&&h&1&&(a=1-a),h!==nr(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||Ke||i||t._zTime===xe||!e&&t._zTime){if(!t._initted&&xd(t,e,i,n,l))return;for(d=t._zTime,t._zTime=e||(n?xe:0),n||(n=e&&!d),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&dh(t,e,n,!0),t._onUpdate&&!n&&An(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&An(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Ki(t,1),!n&&!Ke&&(An(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},l0=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},ir=function(t,e,n,i){var r=t._repeat,a=Re(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Re(a*(r+1)+t._rDelay*r):a,o>0&&!i&&Io(t,t._tTime=t._tDur*o),t.parent&&Po(t),n||bs(t.parent,t),t},ed=function(t){return t instanceof nn?bs(t):ir(t,t._dur)},c0={_start:0,endTime:ia,totalDuration:ia},Fn=function s(t,e,n){var i=t.labels,r=t._recent||c0,a=t.duration()>=Bn?r.endTime(!1):t._dur,o,l,c;return Ge(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(sn(n)?n[0]:n).totalDuration()),o>1?s(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},Qr=function(t,e,n){var i=Ei(e[1]),r=(i?2:1)+(t<2?0:1),a=e[r],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=vn(l.vars.inherit)&&l.parent;a.immediateRender=vn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new Be(e[0],a,e[r+1])},ji=function(t,e){return t||t===0?e(t):e},oa=function(t,e,n){return n<t?t:n>e?e:n},je=function(t,e){return!Ge(t)||!(e=jg.exec(t))?"":e[1]},h0=function(t,e,n){return ji(n,function(i){return oa(t,e,i)})},ph=[].slice,vd=function(t,e){return t&&ci(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&ci(t[0]))&&!t.nodeType&&t!==oi},u0=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return Ge(i)&&!e||vd(i,1)?(r=n).push.apply(r,kn(i)):n.push(i)})||n},kn=function(t,e,n){return Ae&&!e&&Ae.selector?Ae.selector(t):Ge(t)&&!n&&(uh||!sr())?ph.call((e||Sh).querySelectorAll(t),0):sn(t)?u0(t,n):vd(t)?ph.call(t,0):t?[t]:[]},mh=function(t){return t=kn(t)[0]||na("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return kn(e,n.querySelectorAll?n:n===t?na("Invalid scope")||Sh.createElement("div"):t)}},yd=function(t){return t.sort(function(){return .5-Math.random()})},Md=function(t){if(Oe(t))return t;var e=ci(t)?t:{each:t},n=ws(e.ease),i=e.from||0,r=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,d=i;return Ge(i)?h=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],d=i[1]),function(u,f,m){var _=(m||e).length,p=a[_],g,y,w,M,b,T,x,S,C;if(!p){if(C=e.grid==="auto"?0:(e.grid||[1,Bn])[1],!C){for(x=-Bn;x<(x=m[C++].getBoundingClientRect().left)&&C<_;);C<_&&C--}for(p=a[_]=[],g=l?Math.min(C,_)*h-.5:i%C,y=C===Bn?0:l?_*d/C-.5:i/C|0,x=0,S=Bn,T=0;T<_;T++)w=T%C-g,M=y-(T/C|0),p[T]=b=c?Math.abs(c==="y"?M:w):ad(w*w+M*M),b>x&&(x=b),b<S&&(S=b);i==="random"&&yd(p),p.max=x-S,p.min=S,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(C>_?_-1:c?c==="y"?_/C:C:Math.max(C,_/C))||0)*(i==="edges"?-1:1),p.b=_<0?r-_:r,p.u=je(e.amount||e.each)||0,n=n&&_<0?w0(n):n}return _=(p[u]-p.min)/p.max||0,Re(p.b+(n?n(_):_)*p.v)+p.u}},gh=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Re(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Ei(n)?0:je(n))}},Sd=function(t,e){var n=sn(t),i,r;return!n&&ci(t)&&(i=n=t.radius||Bn,t.values?(t=kn(t.values),(r=!Ei(t[0]))&&(i*=i)):t=gh(t.increment)),ji(e,n?Oe(t)?function(a){return r=t(a),Math.abs(r-a)<=i?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=Bn,h=0,d=t.length,u,f;d--;)r?(u=t[d].x-o,f=t[d].y-l,u=u*u+f*f):u=Math.abs(t[d]-o),u<c&&(c=u,h=d);return h=!i||c<=i?t[h]:a,r||h===a||Ei(a)?h:h+je(a)}:gh(t))},bd=function(t,e,n,i){return ji(sn(t)?!e:n===!0?!!(n=0):!i,function(){return sn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},f0=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,a){return a(r)},i)}},d0=function(t,e){return function(n){return t(parseFloat(n))+(e||je(n))}},p0=function(t,e,n){return Ad(t,e,0,1,n)},wd=function(t,e,n){return ji(n,function(i){return t[~~e(i)]})},m0=function s(t,e,n){var i=e-t;return sn(t)?wd(t,s(0,t.length),e):ji(n,function(r){return(i+(r-t)%i)%i+t})},g0=function s(t,e,n){var i=e-t,r=i*2;return sn(t)?wd(t,s(0,t.length-1),e):ji(n,function(a){return a=(r+(a-t)%r)%r||0,t+(a>i?r-a:a)})},rr=function(t){return t.replace(Zg,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(Jg);return bd(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Ad=function(t,e,n,i,r){var a=e-t,o=i-n;return ji(r,function(l){return n+((l-t)/a*o||0)})},_0=function s(t,e,n,i){var r=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!r){var a=Ge(t),o={},l,c,h,d,u;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(sn(t)&&!sn(e)){for(h=[],d=t.length,u=d-2,c=1;c<d;c++)h.push(s(t[c-1],t[c]));d--,r=function(m){m*=d;var _=Math.min(u,~~m);return h[_](m-_)},n=e}else i||(t=er(sn(t)?[]:{},t));if(!h){for(l in e)Ph.call(o,t,l,"get",e[l]);r=function(m){return Uh(m,o)||(a?t.p:t)}}}return ji(n,r)},nd=function(t,e,n){var i=t.labels,r=Bn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},An=function(t,e,n){var i=t.vars,r=i[e],a=Ae,o=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&Zi.length&&Mo(),o&&(Ae=o),h=l?r.apply(c,l):r.call(c),Ae=a,h},Jr=function(t){return Ki(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ke),t.progress()<1&&An(t,"onInterrupt"),t},tr,Td=[],Ed=function(t){if(t)if(t=!t.name&&t.default||t,vh()||t.headless){var e=t.name,n=Oe(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:ia,render:Uh,add:Ph,kill:N0,modifier:D0,rawVars:0},a={targetTest:0,get:0,getSetter:Lo,aliases:{},register:0};if(sr(),t!==i){if(_n[e])return;En(i,En(So(t,r),a)),er(i.prototype,er(r,So(t,a))),_n[i.prop=e]=i,t.targetTest&&(xo.push(i),bh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}hd(e,i),t.register&&t.register(rn,i,fn)}else Td.push(t)},ye=255,Kr={aqua:[0,ye,ye],lime:[0,ye,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ye],navy:[0,0,128],white:[ye,ye,ye],olive:[128,128,0],yellow:[ye,ye,0],orange:[ye,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ye,0,0],pink:[ye,192,203],cyan:[0,ye,ye],transparent:[ye,ye,ye,0]},rh=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ye+.5|0},Cd=function(t,e,n){var i=t?Ei(t)?[t>>16,t>>8&ye,t&ye]:0:Kr.black,r,a,o,l,c,h,d,u,f,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Kr[t])i=Kr[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ye,i&ye,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ye,t&ye]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(Kf),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,r=h*2-a,i.length>3&&(i[3]*=1),i[0]=rh(l+1/3,r,a),i[1]=rh(l,r,a),i[2]=rh(l-1/3,r,a);else if(~t.indexOf("="))return i=t.match(yh),n&&i.length<4&&(i[3]=1),i}else i=t.match(Kf)||Kr.transparent;i=i.map(Number)}return e&&!m&&(r=i[0]/ye,a=i[1]/ye,o=i[2]/ye,d=Math.max(r,a,o),u=Math.min(r,a,o),h=(d+u)/2,d===u?l=c=0:(f=d-u,c=h>.5?f/(2-d-u):f/(d+u),l=d===r?(a-o)/f+(a<o?6:0):d===a?(o-r)/f+2:(r-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Rd=function(t){var e=[],n=[],i=-1;return t.split(Ti).forEach(function(r){var a=r.match(Ts)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},id=function(t,e,n){var i="",r=(t+i).match(Ti),a=e?"hsla(":"rgba(",o=0,l,c,h,d;if(!r)return t;if(r=r.map(function(u){return(u=Cd(u,e,1))&&a+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=Rd(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Ti,"1").split(Ts),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(Ti),d=c.length-1;o<d;o++)i+=c[o]+r[o];return i+c[d]},Ti=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Kr)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),x0=/hsl[a]?\(/,Ch=function(t){var e=t.join(" "),n;if(Ti.lastIndex=0,Ti.test(e))return n=x0.test(e),t[1]=id(t[1],n),t[0]=id(t[0],n,Rd(t[1])),!0},sa,xn=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,a=r,o=[],l,c,h,d,u,f,m=function _(p){var g=s()-i,y=p===!0,w,M,b,T;if((g>t||g<0)&&(n+=g-e),i+=g,b=i-n,w=b-a,(w>0||y)&&(T=++d.frame,u=b-d.time*1e3,d.time=b=b/1e3,a+=w+(w>=r?0:r-w),M=1),y||(l=c(_)),M)for(f=0;f<o.length;f++)o[f](b,u,T,p)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return u/(1e3/(p||60))},wake:function(){ld&&(!uh&&vh()&&(oi=uh=window,Sh=oi.document||{},Tn.gsap=rn,(oi.gsapVersions||(oi.gsapVersions=[])).push(rn.version),cd(yo||oi.GreenSockGlobals||!oi.gsap&&oi||{}),Td.forEach(Ed)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=h||function(p){return setTimeout(p,a-d.time*1e3+1|0)},sa=1,m(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),sa=0,c=ia},lagSmoothing:function(p,g){t=p||1/0,e=Math.min(g||33,t)},fps:function(p){r=1e3/(p||240),a=d.time*1e3+r},add:function(p,g,y){var w=g?function(M,b,T,x){p(M,b,T,x),d.remove(w)}:p;return d.remove(p),o[y?"unshift":"push"](w),sr(),w},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&f>=g&&f--},_listeners:o},d})(),sr=function(){return!sa&&xn.wake()},he={},v0=/^[\d.\-M][\d.\-,\s]/,y0=/["']/g,M0=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(y0,"").trim():+c,i=l.substr(o+1).trim();return e},S0=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},b0=function(t){var e=(t+"").split("("),n=he[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[M0(e[1])]:S0(t).split(",").map(dd)):he._CE&&v0.test(t)?he._CE("",t):n},w0=function(t){return function(e){return 1-t(1-e)}},ws=function(t,e){return t&&(Oe(t)?t:he[t]||b0(t))||e},Cs=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},a;return un(t,function(o){he[o]=Tn[o]=r,he[a=o.toLowerCase()]=n;for(var l in r)he[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=he[o+"."+l]=r[l]}),r},Pd=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},ah=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),a=r/hh*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*Yg((h-a)*r)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Pd(o);return r=hh/r,l.config=function(c,h){return s(t,c,h)},l},oh=function s(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:Pd(n);return i.config=function(r){return s(t,r)},i};un("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Cs(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});he.Linear.easeNone=he.none=he.Linear.easeIn;Cs("Elastic",ah("in"),ah("out"),ah());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(o){return o<e?s*o*o:o<n?s*Math.pow(o-1.5/t,2)+.75:o<i?s*(o-=2.25/t)*o+.9375:s*Math.pow(o-2.625/t,2)+.984375};Cs("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Cs("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Cs("Circ",function(s){return-(ad(1-s*s)-1)});Cs("Sine",function(s){return s===1?1:-$g(s*Xg)+1});Cs("Back",oh("in"),oh("out"),oh());he.SteppedEase=he.steps=Tn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,a=1-xe;return function(o){return((i*oa(0,a,o)|0)+r)*n}}};ea.ease=he["quad.out"];un("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return wh+=s+","+s+"Params,"});var Rh=function(t,e){this.id=qg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Th,this.set=e?e.getSetter:Lo},ra=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ir(this,+e.duration,1,1),this.data=e.data,Ae&&(this._ctx=Ae,Ae.data.push(this)),sa||xn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,ir(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(sr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Io(this,n),!r._dp||r.parent||gd(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&li(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===xe||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),fd(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+td(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+td(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?nr(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-xe?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?bo(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-xe?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||r>0&&r<o)&&this.totalTime(oa(-Math.abs(this._delay),o,r),i!==!1),Po(this),s0(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{sr(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,r=this.progress()===1&&Math.abs(this._zTime)!==xe,a;if(r)for(this._tTime-=xe,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+xe){r=!1;break}a=a._next}this.totalTime(i,r)}return this},t.startTime=function(n){if(arguments.length){this._start=Re(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&li(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(vn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?bo(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=t0);var i=Ke;return Ke=n,Eh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ke=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,ed(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,ed(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Fn(this,n),vn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,vn(i)),this._dur||(this._zTime=-xe),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-xe:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-xe,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-xe)},t.eventCallback=function(n,i,r){var a=this.vars;return arguments.length>1?(i?(a[n]=i,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(a){var o=Oe(n)?n:pd,l=function(){var h=i.then;i.then=null,r&&r(),Oe(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Jr(this)},s})();En(ra.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-xe,_prom:0,_ps:!1,_rts:1});var nn=(function(s){rd(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=vn(n.sortChildren),Pe&&li(n.parent||Pe,Ai(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&_d(Ai(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,a){return Qr(0,arguments,this),this},e.from=function(i,r,a){return Qr(1,arguments,this),this},e.fromTo=function(i,r,a,o){return Qr(2,arguments,this),this},e.set=function(i,r,a){return r.duration=0,r.parent=this,jr(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Be(i,r,Fn(this,a),1),this},e.call=function(i,r,a){return li(this,Be.delayedCall(0,i,r),a)},e.staggerTo=function(i,r,a,o,l,c,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Be(i,a,Fn(this,l)),this},e.staggerFrom=function(i,r,a,o,l,c,h){return a.runBackwards=1,jr(a).immediateRender=vn(a.immediateRender),this.staggerTo(i,r,a,o,l,c,h)},e.staggerFromTo=function(i,r,a,o,l,c,h,d){return o.startAt=a,jr(o).immediateRender=vn(o.immediateRender),this.staggerTo(i,r,o,l,c,h,d)},e.render=function(i,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Re(i),d=this._zTime<0!=i<0&&(this._initted||!c),u,f,m,_,p,g,y,w,M,b,T,x;if(this!==Pe&&h>l&&i>=0&&(h=l),h!==this._tTime||a||d){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,M=this._start,w=this._ts,g=!w,d&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,a);if(u=Re(h%p),h===l?(_=this._repeat,u=c):(b=Re(h/p),_=~~b,_&&_===b&&(u=c,_--),u>c&&(u=c)),b=nr(this._tTime,p),!o&&this._tTime&&b!==_&&this._tTime-b*p-this._dur<=0&&(b=_),T&&_&1&&(u=c-u,x=1),_!==b&&!this._lock){var S=T&&b&1,C=S===(T&&_&1);if(_<b&&(S=!S),o=S?0:h%c?c:h,this._lock=1,this.render(o||(x?0:Re(_*p)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&An(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,b=_),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,C&&(this._lock=2,o=S?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=l0(this,Re(o),Re(u)),y&&(h-=u-(u=y._start))),this._tTime=h,this._time=u,this._act=!!w,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!r&&!b&&(An(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(f=this._first;f;){if(m=f._next,(f._act||u>=f._start)&&f._ts&&y!==f){if(f.parent!==this)return this.render(i,r,a);if(f.render(f._ts>0?(u-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(u-f._start)*f._ts,r,a),u!==this._time||!this._ts&&!g){y=0,m&&(h+=this._zTime=-xe);break}}f=m}else{f=this._last;for(var R=i<0?i:u;f;){if(m=f._prev,(f._act||R<=f._end)&&f._ts&&y!==f){if(f.parent!==this)return this.render(i,r,a);if(f.render(f._ts>0?(R-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(R-f._start)*f._ts,r,a||Ke&&Eh(f)),u!==this._time||!this._ts&&!g){y=0,m&&(h+=this._zTime=R?-xe:xe);break}}f=m}}if(y&&!r&&(this.pause(),y.render(u>=o?0:-xe)._zTime=u>=o?1:-1,this._ts))return this._start=M,Po(this),this.render(i,r,a);this._onUpdate&&!r&&An(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(M===this._start||Math.abs(w)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ki(this,1),!r&&!(i<0&&!o)&&(h||o||!l)&&(An(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var a=this;if(Ei(r)||(r=Fn(this,r,i)),!(i instanceof ra)){if(sn(i))return i.forEach(function(o){return a.add(o,r)}),this;if(Ge(i))return this.addLabel(i,r);if(Oe(i))i=Be.delayedCall(0,i);else return this}return this!==i?li(this,i,r):this},e.getChildren=function(i,r,a,o){i===void 0&&(i=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Bn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Be?r&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===i)return r[a]},e.remove=function(i){return Ge(i)?this.removeLabel(i):Oe(i)?this.killTweensOf(i):(i.parent===this&&Ro(this,i),i===this._recent&&(this._recent=this._last),bs(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Re(xn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=Fn(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,a){var o=Be.delayedCall(0,r||ia,a);return o.data="isPause",this._hasPause=1,li(this,o,Fn(this,i))},e.removePause=function(i){var r=this._first;for(i=Fn(this,i);r;)r._start===i&&r.data==="isPause"&&Ki(r),r=r._next},e.killTweensOf=function(i,r,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Yi!==o[l]&&o[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var a=[],o=kn(i),l=this._first,c=Ei(r),h;l;)l instanceof Be?e0(l._targets,o)&&(c?(!Yi||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(h=l.getTweensOf(o,r)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,r){r=r||{};var a=this,o=Fn(a,i),l=r,c=l.startAt,h=l.onStart,d=l.onStartParams,u=l.immediateRender,f,m=Be.to(a,En({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||xe,onStart:function(){if(a.pause(),!f){var p=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==p&&ir(m,p,0,1).render(m._time,!0,!0),f=1}h&&h.apply(m,d||[])}},r));return u?m.render(0):m},e.tweenFromTo=function(i,r,a){return this.tweenTo(r,En({startAt:{time:Fn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),nd(this,Fn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),nd(this,Fn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+xe)},e.shiftChildren=function(i,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Re(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=i);return bs(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),bs(this)},e.totalDuration=function(i){var r=0,a=this,o=a._last,l=Bn,c,h,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,li(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(r-=h,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Re(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;ir(a,a===Pe&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(Pe._ts&&(fd(Pe,bo(i,Pe)),ud=xn.frame),xn.frame>=jf){jf+=yn.autoSleep||120;var r=Pe._first;if((!r||!r._ts)&&yn.autoSleep&&xn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||xn.sleep()}}},t})(ra);En(nn.prototype,{_lock:0,_hasPause:0,_forcing:0});var A0=function(t,e,n,i,r,a,o){var l=new fn(this._pt,t,e,0,1,Nh,null,r),c=0,h=0,d,u,f,m,_,p,g,y;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=rr(i)),a&&(y=[n,i],a(y,t,e),n=y[0],i=y[1]),u=n.match(ih)||[];d=ih.exec(i);)m=d[0],_=i.substring(c,d.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),m!==u[h++]&&(p=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:m.charAt(1)==="="?Es(p,m)-p:parseFloat(m)-p,m:f&&f<4?Math.round:0},c=ih.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Mh.test(i)||g)&&(l.e=0),this._pt=l,l},Ph=function(t,e,n,i,r,a,o,l,c,h){Oe(i)&&(i=i(r||0,t,a));var d=t[e],u=n!=="get"?n:Oe(d)?c?t[e.indexOf("set")||!Oe(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():d,f=Oe(d)?c?P0:Ld:Dh,m;if(Ge(i)&&(~i.indexOf("random(")&&(i=rr(i)),i.charAt(1)==="="&&(m=Es(u,i)+(je(u)||0),(m||m===0)&&(i=m))),!h||u!==i||_h)return!isNaN(u*i)&&i!==""?(m=new fn(this._pt,t,e,+u||0,i-(u||0),typeof d=="boolean"?L0:Dd,0,f),c&&(m.fp=c),o&&m.modifier(o,this,t),this._pt=m):(!d&&!(e in t)&&Co(e,i),A0.call(this,t,e,u,i,f,l||yn.stringFilter,c))},T0=function(t,e,n,i,r){if(Oe(t)&&(t=ta(t,r,e,n,i)),!ci(t)||t.style&&t.nodeType||sn(t)||od(t))return Ge(t)?ta(t,r,e,n,i):t;var a={},o;for(o in t)a[o]=ta(t[o],r,e,n,i);return a},Ih=function(t,e,n,i,r,a){var o,l,c,h;if(_n[t]&&(o=new _n[t]).init(r,o.rawVars?e[t]:T0(e[t],i,r,a,n),n,i,a)!==!1&&(n._pt=l=new fn(n._pt,r,t,0,1,o.render,o,0,o.priority),n!==tr))for(c=n._ptLookup[n._targets.indexOf(r)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Yi,_h,Lh=function s(t,e,n){var i=t.vars,r=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,d=i.yoyoEase,u=i.keyframes,f=i.autoRevert,m=t._dur,_=t._startAt,p=t._targets,g=t.parent,y=g&&g.data==="nested"?g.vars.targets:p,w=t._overwrite==="auto"&&!xh,M=t.timeline,b=i.easeReverse||d,T,x,S,C,R,L,G,O,P,F,z,N,Y;if(M&&(!u||!r)&&(r="none"),t._ease=ws(r,ea.ease),t._rEase=b&&(ws(b)||t._ease),t._from=!M&&!!i.runBackwards,t._from&&(t.ratio=1),!M||u&&!i.stagger){if(O=p[0]?Ji(p[0]).harness:0,N=O&&i[O.prop],T=So(i,bh),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!f?_.render(-1,!0):_.revert(h&&m?_o:Qg),_._lazy=0),a){if(Ki(t._startAt=Be.set(p,En({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&vn(l),startAt:null,delay:0,onUpdate:c&&function(){return An(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ke||!o&&!f)&&t._startAt.revert(_o),o&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&m&&!_){if(e&&(o=!1),S=En({overwrite:!1,data:"isFromStart",lazy:o&&!_&&vn(l),immediateRender:o,stagger:0,parent:g},T),N&&(S[O.prop]=N),Ki(t._startAt=Be.set(p,S)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ke?t._startAt.revert(_o):t._startAt.render(-1,!0)),t._zTime=e,!o)s(t._startAt,xe,xe);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&vn(l)||l&&!m,x=0;x<p.length;x++){if(R=p[x],G=R._gsap||Ah(p)[x]._gsap,t._ptLookup[x]=F={},fh[G.id]&&Zi.length&&Mo(),z=y===p?x:y.indexOf(R),O&&(P=new O).init(R,N||T,t,z,y)!==!1&&(t._pt=C=new fn(t._pt,R,P.name,0,1,P.render,P,0,P.priority),P._props.forEach(function(W){F[W]=C}),P.priority&&(L=1)),!O||N)for(S in T)_n[S]&&(P=Ih(S,T,t,z,R,y))?P.priority&&(L=1):F[S]=C=Ph.call(t,R,S,"get",T[S],z,y,0,i.stringFilter);t._op&&t._op[x]&&t.kill(R,t._op[x]),w&&t._pt&&(Yi=t,Pe.killTweensOf(R,F,t.globalTime(e)),Y=!t.parent,Yi=0),t._pt&&l&&(fh[G.id]=1)}L&&Oh(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!Y,u&&e<=0&&M.render(Bn,!0,!0)},E0=function(t,e,n,i,r,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,d,u,f;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,f=t._targets.length;f--;){if(h=u[f][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return _h=1,t.vars[e]="+=0",Lh(t,o),_h=0,l?na(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(f=c.length;f--;)d=c[f],h=d._pt||d,h.s=(i||i===0)&&!r?i:h.s+(i||0)+a*h.c,h.c=n-h.s,d.e&&(d.e=Fe(n)+je(d.e)),d.b&&(d.b=h.s+je(d.b))},C0=function(t,e){var n=t[0]?Ji(t[0]).harness:0,i=n&&n.aliases,r,a,o,l;if(!i)return e;r=er({},e);for(a in i)if(a in r)for(l=i[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},R0=function(t,e,n,i){var r=e.ease||i||"power1.inOut",a,o;if(sn(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:r})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},ta=function(t,e,n,i,r){return Oe(t)?t.call(e,n,i,r):Ge(t)&&~t.indexOf("random(")?rr(t):t},Ao=wh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Id={};un(Ao+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Id[s]=1});Ao=Ao.split(",");var Be=(function(s){rd(t,s);function t(n,i,r,a){var o;typeof i=="number"&&(r.duration=i,i=r,r=null),o=s.call(this,a?i:jr(i))||this;var l=o.vars,c=l.duration,h=l.delay,d=l.immediateRender,u=l.stagger,f=l.overwrite,m=l.keyframes,_=l.defaults,p=l.scrollTrigger,g=i.parent||Pe,y=(sn(n)||od(n)?Ei(n[0]):"length"in i)?[n]:kn(n),w,M,b,T,x,S,C,R;if(o._targets=y.length?Ah(y):na("GSAP target "+n+" not found. https://gsap.com",!yn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,m||u||go(c)||go(h)){i=o.vars;var L=i.easeReverse||i.yoyoEase;if(w=o.timeline=new nn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:y}),w.kill(),w.parent=w._dp=Ai(o),w._start=0,u||go(c)||go(h)){if(T=y.length,C=u&&Md(u),ci(u))for(x in u)~Ao.indexOf(x)&&(R||(R={}),R[x]=u[x]);for(M=0;M<T;M++)b=So(i,Id),b.stagger=0,L&&(b.easeReverse=L),R&&er(b,R),S=y[M],b.duration=+ta(c,Ai(o),M,S,y),b.delay=(+ta(h,Ai(o),M,S,y)||0)-o._delay,!u&&T===1&&b.delay&&(o._delay=h=b.delay,o._start+=h,b.delay=0),w.to(S,b,C?C(M,S,y):0),w._ease=he.none;w.duration()?c=h=0:o.timeline=0}else if(m){jr(En(w.vars.defaults,{ease:"none"})),w._ease=ws(m.ease||i.ease||"none");var G=0,O,P,F;if(sn(m))m.forEach(function(z){return w.to(y,z,">")}),w.duration();else{b={};for(x in m)x==="ease"||x==="easeEach"||R0(x,m[x],b,m.easeEach);for(x in b)for(O=b[x].sort(function(z,N){return z.t-N.t}),G=0,M=0;M<O.length;M++)P=O[M],F={ease:P.e,duration:(P.t-(M?O[M-1].t:0))/100*c},F[x]=P.v,w.to(y,F,G),G+=F.duration;w.duration()<c&&w.to({},{duration:c-w.duration()})}}c||o.duration(c=w.duration())}else o.timeline=0;return f===!0&&!xh&&(Yi=Ai(o),Pe.killTweensOf(y),Yi=0),li(g,Ai(o),r),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!m&&o._start===Re(g._time)&&vn(d)&&r0(Ai(o))&&g.data!=="nested")&&(o._tTime=-xe,o.render(Math.max(0,-h)||0)),p&&_d(Ai(o),p),o}var e=t.prototype;return e.render=function(i,r,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,d=i>l-xe&&!h?l:i<xe?0:i,u,f,m,_,p,g,y,w;if(!c)o0(this,i,r,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=d,w=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,a);if(u=Re(d%_),d===l?(m=this._repeat,u=c):(p=Re(d/_),m=~~p,m&&m===p?(u=c,m--):u>c&&(u=c)),g=this._yoyo&&m&1,g&&(u=c-u),p=nr(this._tTime,_),u===o&&!a&&this._initted&&m===p)return this._tTime=d,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&u!==_&&this._initted&&(this._lock=a=1,this.render(Re(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(xd(this,h?i:u,a,r,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,r,a)}if(this._rEase){var M=u<o;if(M!==this._inv){var b=M?o:c-o;this._inv=M,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=b?(M?-1:1)/b:0,this._invScale=M?-this.ratio:1-this.ratio,this._invEase=M?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(u/c);if(this._from&&(this.ratio=y=1-y),this._tTime=d,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!r&&!p&&(An(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(y,f.d),f=f._next;w&&w.render(i<0?i:w._dur*w._ease(u/this._dur),r,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&dh(this,i,r,a),An(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!r&&this.parent&&An(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&dh(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ki(this,1),!r&&!(h&&!o)&&(d||o||g)&&(An(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,a,o,l){sa||xn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Lh(this,c),h=this._ease(c/this._dur),E0(this,i,r,a,o,h,c,l)?this.resetTo(i,r,a,o,1):(Io(this,0),this.parent||md(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Jr(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ke),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Yi&&Yi.vars.overwrite!==!0)._first||Jr(this),this.parent&&a!==this.timeline.totalDuration()&&ir(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?kn(i):o,c=this._ptLookup,h=this._pt,d,u,f,m,_,p,g;if((!r||r==="all")&&i0(o,l))return r==="all"&&(this._pt=0),Jr(this);for(d=this._op=this._op||[],r!=="all"&&(Ge(r)&&(_={},un(r,function(y){return _[y]=1}),r=_),r=C0(o,r)),g=o.length;g--;)if(~l.indexOf(o[g])){u=c[g],r==="all"?(d[g]=r,m=u,f={}):(f=d[g]=d[g]||{},m=r);for(_ in m)p=u&&u[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&Ro(this,p,"_pt"),delete u[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&h&&Jr(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return Qr(1,arguments)},t.delayedCall=function(i,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,r,a){return Qr(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,a){return Pe.killTweensOf(i,r,a)},t})(ra);En(Be.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});un("staggerTo,staggerFrom,staggerFromTo",function(s){Be[s]=function(){var t=new nn,e=ph.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var Dh=function(t,e,n){return t[e]=n},Ld=function(t,e,n){return t[e](n)},P0=function(t,e,n,i){return t[e](i.fp,n)},I0=function(t,e,n){return t.setAttribute(e,n)},Lo=function(t,e){return Oe(t[e])?Ld:Eo(t[e])&&t.setAttribute?I0:Dh},Dd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},L0=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Nh=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Uh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},D0=function(t,e,n,i){for(var r=this._pt,a;r;)a=r._next,r.p===i&&r.modifier(t,e,n),r=a},N0=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Ro(this,e,"_pt"):e.dep||(n=1),e=i;return!n},U0=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Oh=function(t){for(var e=t._pt,n,i,r,a;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=r},fn=(function(){function s(e,n,i,r,a,o,l,c,h){this.t=n,this.s=r,this.c=a,this.p=i,this.r=o||Dd,this.d=l||this,this.set=c||Dh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=U0,this.m=n,this.mt=r,this.tween=i},s})();un(wh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return bh[s]=1});Tn.TweenMax=Tn.TweenLite=Be;Tn.TimelineLite=Tn.TimelineMax=nn;Pe=new nn({sortChildren:!1,defaults:ea,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});yn.stringFilter=Ch;var As=[],vo={},O0=[],sd=0,F0=0,lh=function(t){return(vo[t]||O0).map(function(e){return e()})},aa=function(){var t=Date.now(),e=[];t-sd>2&&(lh("matchMediaInit"),As.forEach(function(n){var i=n.queries,r=n.conditions,a,o,l,c;for(o in i)a=oi.matchMedia(i[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),lh("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),sd=t,lh("matchMedia"))},Nd=(function(){function s(e,n){this.selector=n&&mh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=F0++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Oe(n)&&(r=i,i=n,n=Oe);var a=this,o=function(){var c=Ae,h=a.selector,d;return c&&c!==a&&c.data.push(a),r&&(a.selector=mh(r)),Ae=a,d=i.apply(a,arguments),Oe(d)&&a._r.push(d),Ae=c,a.selector=h,a.isReverted=!1,d};return a.last=o,n===Oe?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Ae;Ae=null,n(this),Ae=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof Be&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof nn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Be)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=As.length;a--;)As[a].id===this.id&&As.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(aa):o.removeEventListener("change",aa)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},s})(),B0=(function(){function s(e){this.contexts=[],this.scope=e,Ae&&Ae.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){ci(n)||(n={matches:n});var a=new Nd(0,r||this.scope),o=a.conditions={},l,c,h;Ae&&!a.selector&&(a.selector=Ae.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=oi.matchMedia(n[c]),l&&(As.indexOf(a)<0&&As.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(aa):l.addEventListener("change",aa),(a._mqs||(a._mqs=[])).push(l)));return h&&i(a,function(d){return a.add(null,d)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),To={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Ed(i)})},timeline:function(t){return new nn(t)},getTweensOf:function(t,e){return Pe.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ge(t)&&(t=kn(t)[0]);var r=Ji(t||{}).get,a=n?pd:dd;return n==="native"&&(n=""),t&&(e?a((_n[e]&&_n[e].get||r)(t,e,n,i)):function(o,l,c){return a((_n[o]&&_n[o].get||r)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=kn(t),t.length>1){var i=t.map(function(h){return rn.quickSetter(h,e,n)}),r=i.length;return function(h){for(var d=r;d--;)i[d](h)}}t=t[0]||{};var a=_n[e],o=Ji(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var d=new a;tr._pt=0,d.init(t,n?h+n:h,tr,0,[t]),d.render(1,d),tr._pt&&Uh(1,tr)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,r=rn.to(t,En((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return r.resetTo(e,l,c,h)};return a.tween=r,a},isTweening:function(t){return Pe.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=ws(t.ease,ea.ease)),Qf(ea,t||{})},config:function(t){return Qf(yn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!_n[o]&&!Tn[o]&&na(e+" effect requires "+o+" plugin.")}),sh[e]=function(o,l,c){return n(kn(o),En(l||{},r),c)},a&&(nn.prototype[e]=function(o,l,c){return this.add(sh[e](o,ci(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){he[t]=ws(e)},parseEase:function(t,e){return arguments.length?ws(t,e):he},getById:function(t){return Pe.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new nn(t),i,r;for(n.smoothChildTiming=vn(t.smoothChildTiming),Pe.remove(n),n._dp=0,n._time=n._tTime=Pe._time,i=Pe._first;i;)r=i._next,(e||!(!i._dur&&i instanceof Be&&i.vars.onComplete===i._targets[0]))&&li(n,i,i._start-i._delay),i=r;return li(Pe,n,0),n},context:function(t,e){return t?new Nd(t,e):Ae},matchMedia:function(t){return new B0(t)},matchMediaRefresh:function(){return As.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||aa()},addEventListener:function(t,e){var n=vo[t]||(vo[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=vo[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:m0,wrapYoyo:g0,distribute:Md,random:bd,snap:Sd,normalize:p0,getUnit:je,clamp:h0,splitColor:Cd,toArray:kn,selector:mh,mapRange:Ad,pipe:f0,unitize:d0,interpolate:_0,shuffle:yd},install:cd,effects:sh,ticker:xn,updateRoot:nn.updateRoot,plugins:_n,globalTimeline:Pe,core:{PropTween:fn,globals:hd,Tween:Be,Timeline:nn,Animation:ra,getCache:Ji,_removeLinkedListItem:Ro,reverting:function(){return Ke},context:function(t){return t&&Ae&&(Ae.data.push(t),t._ctx=Ae),Ae},suppressOverwrites:function(t){return xh=t}}};un("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return To[s]=Be[s]});xn.add(nn.updateRoot);tr=To.to({},{duration:0});var k0=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},z0=function(t,e){var n=t._targets,i,r,a;for(i in e)for(r=n.length;r--;)a=t._ptLookup[r][i],a&&(a=a.d)&&(a._pt&&(a=k0(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[r],i))},ch=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,a){a._onInit=function(o){var l,c;if(Ge(r)&&(l={},un(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}z0(o,r)}}}},rn=To.registerPlugin({name:"attr",init:function(t,e,n,i,r){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Ke?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},ch("roundProps",gh),ch("modifiers"),ch("snap",Sd))||To;Be.version=nn.version=rn.version="3.15.1";ld=1;vh()&&sr();var V0=he.Power0,G0=he.Power1,H0=he.Power2,W0=he.Power3,X0=he.Power4,q0=he.Linear,$0=he.Quad,Y0=he.Cubic,Z0=he.Quart,J0=he.Quint,K0=he.Strong,j0=he.Elastic,Q0=he.Back,t_=he.SteppedEase,e_=he.Bounce,n_=he.Sine,i_=he.Expo,s_=he.Circ;var Ud,Qi,or,Gh,Ls,r_,Od,Hh,a_=function(){return typeof window<"u"},Ri={},Is=180/Math.PI,lr=Math.PI/180,ar=Math.atan2,Fd=1e8,Wh=/([A-Z])/g,o_=/(left|right|width|margin|padding|x)/i,l_=/[\s,\(]\S/,hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Bh=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},c_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},h_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},u_=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},f_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Xd=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},qd=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},d_=function(t,e,n){return t.style[e]=n},p_=function(t,e,n){return t.style.setProperty(e,n)},m_=function(t,e,n){return t._gsap[e]=n},g_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},__=function(t,e,n,i,r){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},x_=function(t,e,n,i,r){var a=t._gsap;a[e]=n,a.renderTransform(r,a)},Ie="transform",Mn=Ie+"Origin",v_=function s(t,e){var n=this,i=this.target,r=i.style,a=i._gsap;if(t in Ri&&r){if(this.tfm=this.tfm||{},t!=="transform")t=hi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ci(i,o)}):this.tfm[t]=a.x?a[t]:Ci(i,t),t===Mn&&(this.tfm.zOrigin=a.zOrigin);else return hi.transform.split(",").forEach(function(o){return s.call(n,o,e)});if(this.props.indexOf(Ie)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Mn,e,"")),t=Ie}(r||e)&&this.props.push(t,e,r[t])},$d=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},y_=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(Wh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=Hh(),(!r||!r.isStart)&&!n[Ie]&&($d(n),i.zOrigin&&n[Mn]&&(n[Mn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Yd=function(t,e){var n={target:t,props:[],revert:y_,save:v_};return t._gsap||rn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Zd,kh=function(t,e){var n=Qi.createElementNS?Qi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Qi.createElement(t);return n&&n.style?n:Qi.createElement(t)},Cn=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Wh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,cr(e)||e,1)||""},Bd="O,Moz,ms,Ms,Webkit".split(","),cr=function(t,e,n){var i=e||Ls,r=i.style,a=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Bd[a]+t in r););return a<0?null:(a===3?"ms":a>=0?Bd[a]:"")+t},zh=function(){a_()&&window.document&&(Ud=window,Qi=Ud.document,or=Qi.documentElement,Ls=kh("div")||{style:{}},r_=kh("div"),Ie=cr(Ie),Mn=Ie+"Origin",Ls.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Zd=!!cr("perspective"),Hh=rn.core.reverting,Gh=1)},kd=function(t){var e=t.ownerSVGElement,n=kh("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),or.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),or.removeChild(n),r},zd=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Jd=function(t){var e,n;try{e=t.getBBox()}catch{e=kd(t),n=1}return e&&(e.width||e.height)||n||(e=kd(t)),e&&!e.width&&!e.x&&!e.y?{x:+zd(t,["x","cx","x1"])||0,y:+zd(t,["y","cy","y1"])||0,width:0,height:0}:e},Kd=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Jd(t))},es=function(t,e){if(e){var n=t.style,i;e in Ri&&e!==Mn&&(e=Ie),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Wh,"-$1").toLowerCase())):n.removeAttribute(e)}},ts=function(t,e,n,i,r,a){var o=new fn(t._pt,e,n,0,1,a?qd:Xd);return t._pt=o,o.b=i,o.e=r,t._props.push(n),o},Vd={deg:1,rad:1,turn:1},M_={grid:1,flex:1},ns=function s(t,e,n,i){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=Ls.style,l=o_.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,u=i==="px",f=i==="%",m,_,p,g;if(i===a||!r||Vd[i]||Vd[a])return r;if(a!=="px"&&!u&&(r=s(t,e,n,"px")),g=t.getCTM&&Kd(t),(f||a==="%")&&(Ri[e]||~e.indexOf("adius")))return m=g?t.getBBox()[l?"width":"height"]:t[h],Fe(f?r/m*d:r/100*m);if(o[l?"width":"height"]=d+(u?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Qi||!_.appendChild)&&(_=Qi.body),p=_._gsap,p&&f&&p.width&&l&&p.time===xn.time&&!p.uncache)return Fe(r/p.width*d);if(f&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=d+i,m=t[h],y?t.style[e]=y:es(t,e)}else(f||a==="%")&&!M_[Cn(_,"display")]&&(o.position=Cn(t,"position")),_===t&&(o.position="static"),_.appendChild(Ls),m=Ls[h],_.removeChild(Ls),o.position="absolute";return l&&f&&(p=Ji(_),p.time=xn.time,p.width=_[h]),Fe(u?m*r/d:m&&r?d/m*r:0)},Ci=function(t,e,n,i){var r;return Gh||zh(),e in hi&&e!=="transform"&&(e=hi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ri[e]&&e!=="transform"?(r=ha(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:No(Cn(t,Mn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=Do[e]&&Do[e](t,e,n)||Cn(t,e)||Th(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?ns(t,e,r,n)+n:r},S_=function(t,e,n,i){if(!n||n==="none"){var r=cr(e,t,1),a=r&&Cn(t,r,1);a&&a!==n?(e=r,n=a):e==="borderColor"&&(n=Cn(t,"borderTopColor"))}var o=new fn(this._pt,t.style,e,0,1,Nh),l=0,c=0,h,d,u,f,m,_,p,g,y,w,M,b;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Cn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Cn(t,e)||i,_?t.style[e]=_:es(t,e)),h=[n,i],Ch(h),n=h[0],i=h[1],u=n.match(Ts)||[],b=i.match(Ts)||[],b.length){for(;d=Ts.exec(i);)p=d[0],y=i.substring(l,d.index),m?m=(m+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(m=1),p!==(_=u[c++]||"")&&(f=parseFloat(_)||0,M=_.substr((f+"").length),p.charAt(1)==="="&&(p=Es(f,p)+M),g=parseFloat(p),w=p.substr((g+"").length),l=Ts.lastIndex-w.length,w||(w=w||yn.units[e]||M,l===i.length&&(i+=w,o.e+=w)),M!==w&&(f=ns(t,e,_,w)||0),o._pt={_next:o._pt,p:y||c===1?y:",",s:f,c:g-f,m:m&&m<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?qd:Xd;return Mh.test(i)&&(o.e=0),this._pt=o,o},Gd={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},b_=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Gd[n]||n,e[1]=Gd[i]||i,e.join(" ")},w_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Ri[o]&&(l=1,o=o==="transformOrigin"?Mn:Ie),es(n,o);l&&(es(n,Ie),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ha(n,1),a.uncache=1,$d(i)))}},Do={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var a=t._pt=new fn(t._pt,e,n,0,0,w_);return a.u=i,a.pr=-10,a.tween=r,t._props.push(n),1}}},ca=[1,0,0,1,0,0],jd={},Qd=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Hd=function(t){var e=Cn(t,Ie);return Qd(e)?ca:e.substr(7).match(yh).map(Fe)},Xh=function(t,e){var n=t._gsap||Ji(t),i=t.style,r=Hd(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?ca:r):(r===ca&&!t.offsetParent&&t!==or&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,or.appendChild(t)),r=Hd(t),l?i.display=l:es(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):or.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Vh=function(t,e,n,i,r,a){var o=t._gsap,l=r||Xh(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,d=o.xOffset||0,u=o.yOffset||0,f=l[0],m=l[1],_=l[2],p=l[3],g=l[4],y=l[5],w=e.split(" "),M=parseFloat(w[0])||0,b=parseFloat(w[1])||0,T,x,S,C;n?l!==ca&&(x=f*p-m*_)&&(S=M*(p/x)+b*(-_/x)+(_*y-p*g)/x,C=M*(-m/x)+b*(f/x)-(f*y-m*g)/x,M=S,b=C):(T=Jd(t),M=T.x+(~w[0].indexOf("%")?M/100*T.width:M),b=T.y+(~(w[1]||w[0]).indexOf("%")?b/100*T.height:b)),i||i!==!1&&o.smooth?(g=M-c,y=b-h,o.xOffset=d+(g*f+y*_)-g,o.yOffset=u+(g*m+y*p)-y):o.xOffset=o.yOffset=0,o.xOrigin=M,o.yOrigin=b,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[Mn]="0px 0px",a&&(ts(a,o,"xOrigin",c,M),ts(a,o,"yOrigin",h,b),ts(a,o,"xOffset",d,o.xOffset),ts(a,o,"yOffset",u,o.yOffset)),t.setAttribute("data-svg-origin",M+" "+b)},ha=function(t,e){var n=t._gsap||new Rh(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=Cn(t,Mn)||"0",h,d,u,f,m,_,p,g,y,w,M,b,T,x,S,C,R,L,G,O,P,F,z,N,Y,W,K,Z,dt,Ot,J,ft;return h=d=u=_=p=g=y=w=M=0,f=m=1,n.svg=!!(t.getCTM&&Kd(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ie]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ie]!=="none"?l[Ie]:"")),i.scale=i.rotate=i.translate="none"),x=Xh(t,n.svg),n.svg&&(n.uncache?(Y=t.getBBox(),c=n.xOrigin-Y.x+"px "+(n.yOrigin-Y.y)+"px",N=""):N=!e&&t.getAttribute("data-svg-origin"),Vh(t,N||c,!!N||n.originIsAbsolute,n.smooth!==!1,x)),b=n.xOrigin||0,T=n.yOrigin||0,x!==ca&&(L=x[0],G=x[1],O=x[2],P=x[3],h=F=x[4],d=z=x[5],x.length===6?(f=Math.sqrt(L*L+G*G),m=Math.sqrt(P*P+O*O),_=L||G?ar(G,L)*Is:0,y=O||P?ar(O,P)*Is+_:0,y&&(m*=Math.abs(Math.cos(y*lr))),n.svg&&(h-=b-(b*L+T*O),d-=T-(b*G+T*P))):(ft=x[6],Ot=x[7],K=x[8],Z=x[9],dt=x[10],J=x[11],h=x[12],d=x[13],u=x[14],S=ar(ft,dt),p=S*Is,S&&(C=Math.cos(-S),R=Math.sin(-S),N=F*C+K*R,Y=z*C+Z*R,W=ft*C+dt*R,K=F*-R+K*C,Z=z*-R+Z*C,dt=ft*-R+dt*C,J=Ot*-R+J*C,F=N,z=Y,ft=W),S=ar(-O,dt),g=S*Is,S&&(C=Math.cos(-S),R=Math.sin(-S),N=L*C-K*R,Y=G*C-Z*R,W=O*C-dt*R,J=P*R+J*C,L=N,G=Y,O=W),S=ar(G,L),_=S*Is,S&&(C=Math.cos(S),R=Math.sin(S),N=L*C+G*R,Y=F*C+z*R,G=G*C-L*R,z=z*C-F*R,L=N,F=Y),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,g=180-g),f=Fe(Math.sqrt(L*L+G*G+O*O)),m=Fe(Math.sqrt(z*z+ft*ft)),S=ar(F,z),y=Math.abs(S)>2e-4?S*Is:0,M=J?1/(J<0?-J:J):0),n.svg&&(N=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Qd(Cn(t,Ie)),N&&t.setAttribute("transform",N))),Math.abs(y)>90&&Math.abs(y)<270&&(r?(f*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-d)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=Fe(f),n.scaleY=Fe(m),n.rotation=Fe(_)+o,n.rotationX=Fe(p)+o,n.rotationY=Fe(g)+o,n.skewX=y+o,n.skewY=w+o,n.transformPerspective=M+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Mn]=No(c)),n.xOffset=n.yOffset=0,n.force3D=yn.force3D,n.renderTransform=n.svg?T_:Zd?tp:A_,n.uncache=0,n},No=function(t){return(t=t.split(" "))[0]+" "+t[1]},Fh=function(t,e,n){var i=je(e);return Fe(parseFloat(e)+parseFloat(ns(t,"x",n+"px",i)))+i},A_=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,tp(t,e)},Rs="0deg",la="0px",Ps=") ",tp=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,d=n.rotationX,u=n.skewX,f=n.skewY,m=n.scaleX,_=n.scaleY,p=n.transformPerspective,g=n.force3D,y=n.target,w=n.zOrigin,M="",b=g==="auto"&&t&&t!==1||g===!0;if(w&&(d!==Rs||h!==Rs)){var T=parseFloat(h)*lr,x=Math.sin(T),S=Math.cos(T),C;T=parseFloat(d)*lr,C=Math.cos(T),a=Fh(y,a,x*C*-w),o=Fh(y,o,-Math.sin(T)*-w),l=Fh(y,l,S*C*-w+w)}p!==la&&(M+="perspective("+p+Ps),(i||r)&&(M+="translate("+i+"%, "+r+"%) "),(b||a!==la||o!==la||l!==la)&&(M+=l!==la||b?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Ps),c!==Rs&&(M+="rotate("+c+Ps),h!==Rs&&(M+="rotateY("+h+Ps),d!==Rs&&(M+="rotateX("+d+Ps),(u!==Rs||f!==Rs)&&(M+="skew("+u+", "+f+Ps),(m!==1||_!==1)&&(M+="scale("+m+", "+_+Ps),y.style[Ie]=M||"translate(0, 0)"},T_=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,d=n.scaleX,u=n.scaleY,f=n.target,m=n.xOrigin,_=n.yOrigin,p=n.xOffset,g=n.yOffset,y=n.forceCSS,w=parseFloat(a),M=parseFloat(o),b,T,x,S,C;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=lr,c*=lr,b=Math.cos(l)*d,T=Math.sin(l)*d,x=Math.sin(l-c)*-u,S=Math.cos(l-c)*u,c&&(h*=lr,C=Math.tan(c-h),C=Math.sqrt(1+C*C),x*=C,S*=C,h&&(C=Math.tan(h),C=Math.sqrt(1+C*C),b*=C,T*=C)),b=Fe(b),T=Fe(T),x=Fe(x),S=Fe(S)):(b=d,S=u,T=x=0),(w&&!~(a+"").indexOf("px")||M&&!~(o+"").indexOf("px"))&&(w=ns(f,"x",a,"px"),M=ns(f,"y",o,"px")),(m||_||p||g)&&(w=Fe(w+m-(m*b+_*x)+p),M=Fe(M+_-(m*T+_*S)+g)),(i||r)&&(C=f.getBBox(),w=Fe(w+i/100*C.width),M=Fe(M+r/100*C.height)),C="matrix("+b+","+T+","+x+","+S+","+w+","+M+")",f.setAttribute("transform",C),y&&(f.style[Ie]=C)},E_=function(t,e,n,i,r){var a=360,o=Ge(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?Is:1),c=l-i,h=i+c+"deg",d,u;return o&&(d=r.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*Fd)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*Fd)%a-~~(c/a)*a)),t._pt=u=new fn(t._pt,e,n,i,c,c_),u.e=h,u.u="deg",t._props.push(n),u},Wd=function(t,e){for(var n in e)t[n]=e[n];return t},C_=function(t,e,n){var i=Wd({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,d,u,f,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ie]=e,o=ha(n,1),es(n,Ie),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ie],a[Ie]=e,o=ha(n,1),a[Ie]=c);for(l in Ri)c=i[l],h=o[l],c!==h&&r.indexOf(l)<0&&(f=je(c),m=je(h),d=f!==m?ns(n,l,c,m):parseFloat(c),u=parseFloat(h),t._pt=new fn(t._pt,o,l,d,u-d,Bh),t._pt.u=m||0,t._props.push(l));Wd(o,i)};un("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",a=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(o){return t<2?s+o:"border"+o+s});Do[t>1?"border"+s:s]=function(o,l,c,h,d){var u,f;if(arguments.length<4)return u=a.map(function(m){return Ci(o,m,c)}),f=u.join(" "),f.split(u[0]).length===5?u[0]:f;u=(h+"").split(" "),f={},a.forEach(function(m,_){return f[m]=u[_]=u[_]||u[(_-1)/2|0]}),o.init(l,f,d)}});var qh={name:"css",register:zh,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var a=this._props,o=t.style,l=n.vars.startAt,c,h,d,u,f,m,_,p,g,y,w,M,b,T,x,S,C;Gh||zh(),this.styles=this.styles||Yd(t),S=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(_n[_]&&Ih(_,e,n,i,t,r)))){if(f=typeof h,m=Do[_],f==="function"&&(h=h.call(n,i,t,r),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=rr(h)),m)m(this,t,_,h,n)&&(x=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",Ti.lastIndex=0,Ti.test(c)||(p=je(c),g=je(h),g?p!==g&&(c=ns(t,_,c,g)+g):p&&(h+=p)),this.add(o,"setProperty",c,h,i,r,0,0,_),a.push(_),S.push(_,0,o[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],Ge(c)&&~c.indexOf("random(")&&(c=rr(c)),je(c+"")||c==="auto"||(c+=yn.units[_]||je(Ci(t,_))||""),(c+"").charAt(1)==="="&&(c=Ci(t,_))):c=Ci(t,_),u=parseFloat(c),y=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),y&&(h=h.substr(2)),d=parseFloat(h),_ in hi&&(_==="autoAlpha"&&(u===1&&Ci(t,"visibility")==="hidden"&&d&&(u=0),S.push("visibility",0,o.visibility),ts(this,o,"visibility",u?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=hi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),w=_ in Ri,w){if(this.styles.save(_),C=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=Cn(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var R=t.style.perspective;t.style.perspective=h,h=Cn(t,"perspective"),R?t.style.perspective=R:es(t,"perspective")}d=parseFloat(h)}if(M||(b=t._gsap,b.renderTransform&&!e.parseTransform||ha(t,e.parseTransform),T=e.smoothOrigin!==!1&&b.smooth,M=this._pt=new fn(this._pt,o,Ie,0,1,b.renderTransform,b,0,-1),M.dep=1),_==="scale")this._pt=new fn(this._pt,b,"scaleY",b.scaleY,(y?Es(b.scaleY,y+d):d)-b.scaleY||0,Bh),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){S.push(Mn,0,o[Mn]),h=b_(h),b.svg?Vh(t,h,0,T,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==b.zOrigin&&ts(this,b,"zOrigin",b.zOrigin,g),ts(this,o,_,No(c),No(h)));continue}else if(_==="svgOrigin"){Vh(t,h,1,T,0,this);continue}else if(_ in jd){E_(this,b,_,u,y?Es(u,y+h):h);continue}else if(_==="smoothOrigin"){ts(this,b,"smooth",b.smooth,h);continue}else if(_==="force3D"){b[_]=h;continue}else if(_==="transform"){C_(this,h,t);continue}}else _ in o||(_=cr(_)||_);if(w||(d||d===0)&&(u||u===0)&&!l_.test(h)&&_ in o)p=(c+"").substr((u+"").length),d||(d=0),g=je(h)||(_ in yn.units?yn.units[_]:p),p!==g&&(u=ns(t,_,c,g)),this._pt=new fn(this._pt,w?b:o,_,u,(y?Es(u,y+d):d)-u,!w&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?f_:Bh),this._pt.u=g||0,w&&C!==h?(this._pt.b=c,this._pt.e=C,this._pt.r=u_):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=h_);else if(_ in o)S_.call(this,t,_,c,y?y+h:h);else if(_ in t)this.add(t,_,c||t[_],y?y+h:h,i,r);else if(_!=="parseTransform"){Co(_,h);continue}w||(_ in o?S.push(_,0,o[_]):typeof t[_]=="function"?S.push(_,2,t[_]()):S.push(_,1,c||t[_])),a.push(_)}}x&&Oh(this)},render:function(t,e){if(e.tween._time||!Hh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ci,aliases:hi,getSetter:function(t,e,n){var i=hi[e];return i&&i.indexOf(",")<0&&(e=i),e in Ri&&e!==Mn&&(t._gsap.x||Ci(t,"x"))?n&&Od===n?e==="scale"?g_:m_:(Od=n||{})&&(e==="scale"?__:x_):t.style&&!Eo(t.style[e])?d_:~e.indexOf("-")?p_:Lo(t,e)},core:{_removeProperty:es,_getMatrix:Xh}};rn.utils.checkPrefix=cr;rn.core.getStyleSaver=Yd;(function(s,t,e,n){var i=un(s+","+t+","+e,function(r){Ri[r]=1});un(t,function(r){yn.units[r]="deg",jd[r]=1}),hi[i[13]]=s+","+t,un(n,function(r){var a=r.split(":");hi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");un("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){yn.units[s]="px"});rn.registerPlugin(qh);var Pi=rn.registerPlugin(qh)||rn,y1=Pi.core.Tween;var R_=`
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
}`,P_=`#version 300 es
void main(){ vec2 p = vec2(gl_VertexID == 2 ? 3.0 : -1.0, gl_VertexID == 0 ? -3.0 : 1.0); gl_Position = vec4(p, 0.0, 1.0); }`,I_=`#version 300 es
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
}`;async function L_(s){if(!navigator.gpu)return null;let t=await navigator.gpu.requestAdapter({powerPreference:"low-power"});if(!t)return null;let e=await t.requestDevice();e.addEventListener("uncapturederror",h=>console.warn("WebGPU \uC624\uB958:",h.error.message));let n=s.getContext("webgpu");if(!n)return null;let i=navigator.gpu.getPreferredCanvasFormat();n.configure({device:e,format:i,alphaMode:"opaque"});let r=e.createShaderModule({code:R_}),a=e.createRenderPipeline({layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),o=e.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),l=e.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}}]}),c=new Float32Array(16);return{kind:"WebGPU",lost:e.lost,draw(h){c.set(h),e.queue.writeBuffer(o,0,c);let d=e.createCommandEncoder(),u=d.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});u.setPipeline(a),u.setBindGroup(0,l),u.draw(3),u.end(),e.queue.submit([d.finish()])}}}function ep(s){let t=s.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return null;let e=(r,a)=>{let o=t.createShader(r);return t.shaderSource(o,a),t.compileShader(o),o},n=t.createProgram();if(t.attachShader(n,e(t.VERTEX_SHADER,P_)),t.attachShader(n,e(t.FRAGMENT_SHADER,I_)),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))return null;t.useProgram(n),t.bindVertexArray(t.createVertexArray());let i=["uA","uColA","uColB","uGlow"].map(r=>t.getUniformLocation(n,r));return{kind:"WebGL2",draw(r){t.viewport(0,0,s.width,s.height),i.forEach((a,o)=>t.uniform4f(a,r[o*4],r[o*4+1],r[o*4+2],r[o*4+3])),t.drawArrays(t.TRIANGLES,0,3)}}}async function np(s,{gpu:t=!0}={}){let e=null;if(t)try{e=await L_(s)}catch(i){console.warn("WebGPU \uC2E4\uD328, WebGL2\uB85C",i),e=null}if(!e){let i=s.cloneNode();s.replaceWith(i),s=i,e=ep(s)}let n=e?{...e,canvas:s}:{kind:"CSS",canvas:s,draw(){}};return e?.lost&&e.lost.then(()=>{let i=n.canvas.cloneNode();n.canvas.replaceWith(i);let r=ep(i);Object.assign(n,r?{...r,canvas:i}:{kind:"CSS",canvas:i,draw(){}})}),n}var Bp=0,Iu=1,kp=2;var Gs=1,zp=2,kr=3,ms=0,gn=1,gi=2,Hs=0,zr=1,$a=2,Lu=3,Du=4,Vp=5;var Ws=100,Gp=101,Hp=102,Wp=103,Xp=104,qp=200,$p=201,Yp=202,Zp=203,Nu=204,Uu=205,Jp=206,Kp=207,jp=208,Qp=209,tm=210,em=211,nm=212,im=213,sm=214,cl=0,hl=1,ul=2,wr=3,fl=4,dl=5,pl=6,ml=7,Ou=0,rm=1,am=2,_i=0,Fu=1,Bu=2,ku=3,zu=4,Vu=5,Gu=6,Ya=7;var Hu=300,Xs=301,Vr=302,jl=303,Ql=304,gl=1e3,fi=1001,_l=1002,Ye=1003,om=1004;var Za=1005;var mn=1006,tc=1007;var Vi=1008;var wn=1009,Wu=1010,Xu=1011,Gr=1012,ec=1013,Jn=1014,Kn=1015,jn=1016,nc=1017,ic=1018,qs=1020,qu=35902,$u=35899,Yu=1021,Zu=1022,Qn=1023,Bi=1026,Gi=1027,Ju=1028,sc=1029,gs=1030,rc=1031;var ac=1033,Ja=33776,Ka=33777,ja=33778,Qa=33779,oc=35840,lc=35841,cc=35842,hc=35843,uc=36196,fc=37492,dc=37496,pc=37488,mc=37489,to=37490,gc=37491,_c=37808,xc=37809,vc=37810,yc=37811,Mc=37812,Sc=37813,bc=37814,wc=37815,Ac=37816,Tc=37817,Ec=37818,Cc=37819,Rc=37820,Pc=37821,Ic=36492,Lc=36494,Dc=36495,Nc=36283,Uc=36284,eo=36285,Oc=36286;var ya=2300,xl=2301,ol=2302,vu=2303,yu=2400,Mu=2401,Su=2402;var lm=3200;var Fc=0,cm=1,Hi="",dn="srgb",Ma="srgb-linear",Sa="linear",ge="srgb";var ll=7680;var hm=519,um=512,fm=513,dm=514,Ku=515,pm=516,mm=517,ju=518,Qu=519,gm=35044;var tf="300 es",Vn=2e3,Ar=2001;function D_(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function N_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function ba(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function _m(){let s=ba("canvas");return s.style.display="block",s}var ip={},Tr=null;function ef(...s){let t="THREE."+s.shift();Tr?Tr("log",t,...s):console.log(t,...s)}function xm(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Yt(...s){s=xm(s);let t="THREE."+s.shift();if(Tr)Tr("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Jt(...s){s=xm(s);let t="THREE."+s.shift();if(Tr)Tr("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function _a(...s){let t=s.join(" ");t in ip||(ip[t]=!0,Yt(...s))}function vm(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var ym={[cl]:cl,[ul]:pl,[fl]:fl,[wr]:dl,[hl]:hl,[pl]:ul,[ml]:ml,[dl]:wr},pi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var $h=Math.PI/180,vl=180/Math.PI;function Hr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[s&255]+an[s>>8&255]+an[s>>16&255]+an[s>>24&255]+"-"+an[t&255]+an[t>>8&255]+"-"+an[t>>16&15|64]+an[t>>24&255]+"-"+an[e&63|128]+an[e>>8&255]+"-"+an[e>>16&255]+an[e>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function re(s,t,e){return Math.max(t,Math.min(e,s))}function U_(s,t){return(s%t+t)%t}function Yh(s,t,e){return(1-e)*s+e*t}function Mm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function nf(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function O_(s,t){if(t.constructor===Float32Array)return s;let e=nf(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function F_(s,t){if(t.constructor===Float32Array)return s;let e=nf(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var cf=class cf{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};cf.prototype.isVector2=!0;var Pt=cf,mi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[a+0],f=r[a+1],m=r[a+2],_=r[a+3];if(d!==_||l!==u||c!==f||h!==m){let p=l*u+c*f+h*m+d*_;p<0&&(u=-u,f=-f,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){let y=Math.acos(p),w=Math.sin(y);g=Math.sin(g*y)/w,o=Math.sin(o*y)/w,l=l*g+u*o,c=c*g+f*o,h=h*g+m*o,d=d*g+_*o}else{l=l*g+u*o,c=c*g+f*o,h=h*g+m*o,d=d*g+_*o;let y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+h*d+l*f-c*u,t[e+1]=l*m+h*u+c*d-o*f,t[e+2]=c*m+h*f+o*u-l*d,t[e+3]=h*m-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),u=l(n/2),f=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Yt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},hf=class hf{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=i+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Zh.copy(this).projectOnVector(t),this.sub(Zh)}reflect(t){return this.sub(Zh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};hf.prototype.isVector3=!0;var V=hf,Zh=new V,sp=new mi,uf=class uf{constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],_=i[0],p=i[3],g=i[6],y=i[1],w=i[4],M=i[7],b=i[2],T=i[5],x=i[8];return r[0]=a*_+o*y+l*b,r[3]=a*p+o*w+l*T,r[6]=a*g+o*M+l*x,r[1]=c*_+h*y+d*b,r[4]=c*p+h*w+d*T,r[7]=c*g+h*M+d*x,r[2]=u*_+f*y+m*b,r[5]=u*p+f*w+m*T,r[8]=u*g+f*M+m*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=e*d+n*u+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return _a("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Jh.makeScale(t,e)),this}rotate(t){return _a("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Jh.makeRotation(-t)),this}translate(t,e){return _a("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Jh.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};uf.prototype.isMatrix3=!0;var jt=uf,Jh=new jt,rp=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ap=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function B_(){let s={enabled:!0,workingColorSpace:Ma,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ge&&(i.r=Fi(i.r),i.g=Fi(i.g),i.b=Fi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ge&&(i.r=br(i.r),i.g=br(i.g),i.b=br(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Hi?Sa:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ma]:{primaries:t,whitePoint:n,transfer:Sa,toXYZ:rp,fromXYZ:ap,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:dn},outputColorSpaceConfig:{drawingBufferColorSpace:dn}},[dn]:{primaries:t,whitePoint:n,transfer:ge,toXYZ:rp,fromXYZ:ap,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:dn}}}),s}var ce=B_();function Fi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function br(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var hr,yl=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{hr===void 0&&(hr=ba("canvas")),hr.width=t.width,hr.height=t.height;let i=hr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=hr}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ba("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Fi(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fi(e[n]/255)*255):e[n]=Fi(e[n]);return{data:e,width:t.width,height:t.height}}else return Yt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},k_=0,Er=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=Hr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Kh(i[a].image)):r.push(Kh(i[a]))}else r=Kh(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Kh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?yl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Yt("Texture: Unable to serialize Texture."),{})}var z_=0,jh=new V,Sn=class s extends pi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=fi,i=fi,r=mn,a=Vi,o=Qn,l=wn,c=s.DEFAULT_ANISOTROPY,h=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=Hr(),this.name="",this.source=new Er(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(jh).x}get height(){return this.source.getSize(jh).y}get depth(){return this.source.getSize(jh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Yt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Yt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gl:t.x=t.x-Math.floor(t.x);break;case fi:t.x=t.x<0?0:1;break;case _l:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gl:t.y=t.y-Math.floor(t.y);break;case fi:t.y=t.y<0?0:1;break;case _l:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Hu;Sn.DEFAULT_ANISOTROPY=1;var ff=class ff{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,M=(f+1)/2,b=(g+1)/2,T=(h+u)/4,x=(d+_)/4,S=(m+p)/4;return w>M&&w>b?w<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(w),i=T/n,r=x/n):M>b?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=T/i,r=S/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=x/r,i=S/r),this.set(n,i,r,e),this}let y=Math.sqrt((p-m)*(p-m)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(p-m)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ff.prototype.isVector4=!0;var Te=ff,Ml=class extends pi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new Sn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Er(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},In=class extends Ml{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},wa=class extends Sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Sl=class extends Sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Kl=class Kl{constructor(t,e,n,i,r,a,o,l,c,h,d,u,f,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,d,u,f,m,_,p)}set(t,e,n,i,r,a,o,l,c,h,d,u,f,m,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=u,g[3]=f,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kl().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/ur.setFromMatrixColumn(t,0).length(),r=1/ur.setFromMatrixColumn(t,1).length(),a=1/ur.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,m=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,m=c*h,_=c*d;e[0]=u+_*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,m=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,m=o*h,_=o*d;e[0]=l*h,e[4]=m*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=m*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+m,e[10]=u-_*d}else if(t.order==="XZY"){let u=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(V_,t,G_)}lookAt(t,e,n){let i=this.elements;return Rn.subVectors(t,e),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),is.crossVectors(n,Rn),is.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),is.crossVectors(n,Rn)),is.normalize(),Uo.crossVectors(Rn,is),i[0]=is.x,i[4]=Uo.x,i[8]=Rn.x,i[1]=is.y,i[5]=Uo.y,i[9]=Rn.y,i[2]=is.z,i[6]=Uo.z,i[10]=Rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],_=n[6],p=n[10],g=n[14],y=n[3],w=n[7],M=n[11],b=n[15],T=i[0],x=i[4],S=i[8],C=i[12],R=i[1],L=i[5],G=i[9],O=i[13],P=i[2],F=i[6],z=i[10],N=i[14],Y=i[3],W=i[7],K=i[11],Z=i[15];return r[0]=a*T+o*R+l*P+c*Y,r[4]=a*x+o*L+l*F+c*W,r[8]=a*S+o*G+l*z+c*K,r[12]=a*C+o*O+l*N+c*Z,r[1]=h*T+d*R+u*P+f*Y,r[5]=h*x+d*L+u*F+f*W,r[9]=h*S+d*G+u*z+f*K,r[13]=h*C+d*O+u*N+f*Z,r[2]=m*T+_*R+p*P+g*Y,r[6]=m*x+_*L+p*F+g*W,r[10]=m*S+_*G+p*z+g*K,r[14]=m*C+_*O+p*N+g*Z,r[3]=y*T+w*R+M*P+b*Y,r[7]=y*x+w*L+M*F+b*W,r[11]=y*S+w*G+M*z+b*K,r[15]=y*C+w*O+M*N+b*Z,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],_=t[7],p=t[11],g=t[15],y=l*f-c*u,w=o*f-c*d,M=o*u-l*d,b=a*f-c*h,T=a*u-l*h,x=a*d-o*h;return e*(_*y-p*w+g*M)-n*(m*y-p*b+g*T)+i*(m*w-_*b+g*x)-r*(m*M-_*T+p*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],_=t[13],p=t[14],g=t[15],y=e*o-n*a,w=e*l-i*a,M=e*c-r*a,b=n*l-i*o,T=n*c-r*o,x=i*c-r*l,S=h*_-d*m,C=h*p-u*m,R=h*g-f*m,L=d*p-u*_,G=d*g-f*_,O=u*g-f*p,P=y*O-w*G+M*L+b*R-T*C+x*S;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/P;return t[0]=(o*O-l*G+c*L)*F,t[1]=(i*G-n*O-r*L)*F,t[2]=(_*x-p*T+g*b)*F,t[3]=(u*T-d*x-f*b)*F,t[4]=(l*R-a*O-c*C)*F,t[5]=(e*O-i*R+r*C)*F,t[6]=(p*M-m*x-g*w)*F,t[7]=(h*x-u*M+f*w)*F,t[8]=(a*G-o*R+c*S)*F,t[9]=(n*R-e*G-r*S)*F,t[10]=(m*T-_*M+g*y)*F,t[11]=(d*M-h*T-f*y)*F,t[12]=(o*C-a*L-l*S)*F,t[13]=(e*L-n*C+i*S)*F,t[14]=(_*w-m*b-p*y)*F,t[15]=(h*b-d*w+u*y)*F,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,_=a*h,p=a*d,g=o*d,y=l*c,w=l*h,M=l*d,b=n.x,T=n.y,x=n.z;return i[0]=(1-(_+g))*b,i[1]=(f+M)*b,i[2]=(m-w)*b,i[3]=0,i[4]=(f-M)*T,i[5]=(1-(u+g))*T,i[6]=(p+y)*T,i[7]=0,i[8]=(m+w)*x,i[9]=(p-y)*x,i[10]=(1-(u+_))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=ur.set(i[0],i[1],i[2]).length(),o=ur.set(i[4],i[5],i[6]).length(),l=ur.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Xn.copy(this);let c=1/a,h=1/o,d=1/l;return Xn.elements[0]*=c,Xn.elements[1]*=c,Xn.elements[2]*=c,Xn.elements[4]*=h,Xn.elements[5]*=h,Xn.elements[6]*=h,Xn.elements[8]*=d,Xn.elements[9]*=d,Xn.elements[10]*=d,e.setFromRotationMatrix(Xn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Vn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===Vn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ar)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Vn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===Vn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ar)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Kl.prototype.isMatrix4=!0;var Me=Kl,ur=new V,Xn=new Me,V_=new V(0,0,0),G_=new V(1,1,1),is=new V,Uo=new V,Rn=new V,op=new Me,lp=new mi,ki=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-re(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Yt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return op.makeRotationFromQuaternion(t),this.setFromRotationMatrix(op,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return lp.setFromEuler(this),this.setFromQuaternion(lp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ki.DEFAULT_ORDER="XYZ";var Aa=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},H_=0,cp=new V,fr=new mi,Ii=new Me,Oo=new V,ua=new V,W_=new V,X_=new mi,hp=new V(1,0,0),up=new V(0,1,0),fp=new V(0,0,1),dp={type:"added"},q_={type:"removed"},dr={type:"childadded",child:null},Qh={type:"childremoved",child:null},Ze=class s extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:H_++}),this.uuid=Hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new V,e=new ki,n=new mi,i=new V(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Me},normalMatrix:{value:new jt}}),this.matrix=new Me,this.matrixWorld=new Me,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fr.setFromAxisAngle(t,e),this.quaternion.multiply(fr),this}rotateOnWorldAxis(t,e){return fr.setFromAxisAngle(t,e),this.quaternion.premultiply(fr),this}rotateX(t){return this.rotateOnAxis(hp,t)}rotateY(t){return this.rotateOnAxis(up,t)}rotateZ(t){return this.rotateOnAxis(fp,t)}translateOnAxis(t,e){return cp.copy(t).applyQuaternion(this.quaternion),this.position.add(cp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(hp,t)}translateY(t){return this.translateOnAxis(up,t)}translateZ(t){return this.translateOnAxis(fp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ii.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Oo.copy(t):Oo.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ua.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ii.lookAt(ua,Oo,this.up):Ii.lookAt(Oo,ua,this.up),this.quaternion.setFromRotationMatrix(Ii),i&&(Ii.extractRotation(i.matrixWorld),fr.setFromRotationMatrix(Ii),this.quaternion.premultiply(fr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(dp),dr.child=t,this.dispatchEvent(dr),dr.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(q_),Qh.child=t,this.dispatchEvent(Qh),Qh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(dp),dr.child=t,this.dispatchEvent(dr),dr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,t,W_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,X_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ze.DEFAULT_UP=new V(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Oi=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},$_={type:"move"},Cr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Oi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Sm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},Fo={h:0,s:0,l:0};function tu(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var te=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=dn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ce.workingColorSpace){if(t=U_(t,1),e=re(e,0,1),n=re(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=tu(a,r,t+1/3),this.g=tu(a,r,t),this.b=tu(a,r,t-1/3)}return ce.colorSpaceToWorking(this,i),this}setStyle(t,e=dn){function n(r){r!==void 0&&parseFloat(r)<1&&Yt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Yt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Yt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=dn){let n=Sm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Yt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}copyLinearToSRGB(t){return this.r=br(t.r),this.g=br(t.g),this.b=br(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=dn){return ce.workingToColorSpace(on.copy(this),t),Math.round(re(on.r*255,0,255))*65536+Math.round(re(on.g*255,0,255))*256+Math.round(re(on.b*255,0,255))}getHexString(t=dn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(on.copy(this),e);let n=on.r,i=on.g,r=on.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=dn){ce.workingToColorSpace(on.copy(this),t);let e=on.r,n=on.g,i=on.b;return t!==dn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ss),this.setHSL(ss.h+t,ss.s+e,ss.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ss),t.getHSL(Fo);let n=Yh(ss.h,Fo.h,e),i=Yh(ss.s,Fo.s,e),r=Yh(ss.l,Fo.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new te;te.NAMES=Sm;var Ta=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},qn=new V,Li=new V,eu=new V,Di=new V,pr=new V,mr=new V,pp=new V,nu=new V,iu=new V,su=new V,ru=new Te,au=new Te,ou=new Te,ls=class s{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),qn.subVectors(t,e),i.cross(qn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){qn.subVectors(i,e),Li.subVectors(n,e),eu.subVectors(t,e);let a=qn.dot(qn),o=qn.dot(Li),l=qn.dot(eu),c=Li.dot(Li),h=Li.dot(eu),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Di.x),l.addScaledVector(a,Di.y),l.addScaledVector(o,Di.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return ru.setScalar(0),au.setScalar(0),ou.setScalar(0),ru.fromBufferAttribute(t,e),au.fromBufferAttribute(t,n),ou.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(ru,r.x),a.addScaledVector(au,r.y),a.addScaledVector(ou,r.z),a}static isFrontFacing(t,e,n,i){return qn.subVectors(n,e),Li.subVectors(t,e),qn.cross(Li).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qn.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),qn.cross(Li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;pr.subVectors(i,n),mr.subVectors(r,n),nu.subVectors(t,n);let l=pr.dot(nu),c=mr.dot(nu);if(l<=0&&c<=0)return e.copy(n);iu.subVectors(t,i);let h=pr.dot(iu),d=mr.dot(iu);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(pr,a);su.subVectors(t,r);let f=pr.dot(su),m=mr.dot(su);if(m>=0&&f<=m)return e.copy(r);let _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(mr,o);let p=h*m-f*d;if(p<=0&&d-h>=0&&f-m>=0)return pp.subVectors(r,i),o=(d-h)/(d-h+(f-m)),e.copy(i).addScaledVector(pp,o);let g=1/(p+_+u);return a=_*g,o=u*g,e.copy(n).addScaledVector(pr,a).addScaledVector(mr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},cs=class{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint($n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint($n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=$n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,$n):$n.fromBufferAttribute(r,a),$n.applyMatrix4(t.matrixWorld),this.expandByPoint($n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bo.copy(n.boundingBox)),Bo.applyMatrix4(t.matrixWorld),this.union(Bo)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,$n),$n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fa),ko.subVectors(this.max,fa),gr.subVectors(t.a,fa),_r.subVectors(t.b,fa),xr.subVectors(t.c,fa),rs.subVectors(_r,gr),as.subVectors(xr,_r),Ds.subVectors(gr,xr);let e=[0,-rs.z,rs.y,0,-as.z,as.y,0,-Ds.z,Ds.y,rs.z,0,-rs.x,as.z,0,-as.x,Ds.z,0,-Ds.x,-rs.y,rs.x,0,-as.y,as.x,0,-Ds.y,Ds.x,0];return!lu(e,gr,_r,xr,ko)||(e=[1,0,0,0,1,0,0,0,1],!lu(e,gr,_r,xr,ko))?!1:(zo.crossVectors(rs,as),e=[zo.x,zo.y,zo.z],lu(e,gr,_r,xr,ko))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,$n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize($n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ni),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ni=[new V,new V,new V,new V,new V,new V,new V,new V],$n=new V,Bo=new cs,gr=new V,_r=new V,xr=new V,rs=new V,as=new V,Ds=new V,fa=new V,ko=new V,zo=new V,Ns=new V;function lu(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ns.fromArray(s,r);let o=i.x*Math.abs(Ns.x)+i.y*Math.abs(Ns.y)+i.z*Math.abs(Ns.z),l=t.dot(Ns),c=e.dot(Ns),h=n.dot(Ns);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ve=new V,Vo=new Pt,Y_=0,di=class extends pi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Y_++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=gm,this.updateRanges=[],this.gpuType=Kn,this.version=0,this._normalizationScale=t!==void 0?nf(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Vo.fromBufferAttribute(this,e),Vo.applyMatrix3(t),this.setXY(e,Vo.x,Vo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):O_(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):F_(t,this.array)}};var Ea=class extends di{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ca=class extends di{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var De=class extends di{constructor(t,e,n){super(new Float32Array(t),e,n)}},Z_=new cs,da=new V,cu=new V,hs=class{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Z_.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;da.subVectors(t,this.center);let e=da.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(da,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(cu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(da.copy(t.center).add(cu)),this.expandByPoint(da.copy(t.center).sub(cu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},J_=0,zn=new Me,hu=new Ze,vr=new V,Pn=new cs,pa=new cs,$e=new V,bn=class s extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=Hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(D_(t)?Ca:Ea)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return zn.makeRotationFromQuaternion(t),this.applyMatrix4(zn),this}rotateX(t){return zn.makeRotationX(t),this.applyMatrix4(zn),this}rotateY(t){return zn.makeRotationY(t),this.applyMatrix4(zn),this}rotateZ(t){return zn.makeRotationZ(t),this.applyMatrix4(zn),this}translate(t,e,n){return zn.makeTranslation(t,e,n),this.applyMatrix4(zn),this}scale(t,e,n){return zn.makeScale(t,e,n),this.applyMatrix4(zn),this}lookAt(t){return hu.lookAt(t),hu.updateMatrix(),this.applyMatrix4(hu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vr).negate(),this.translate(vr.x,vr.y,vr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new De(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Yt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Pn.setFromBufferAttribute(r),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){let n=this.boundingSphere.center;if(Pn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];pa.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(Pn.min,pa.min),Pn.expandByPoint($e),$e.addVectors(Pn.max,pa.max),Pn.expandByPoint($e)):(Pn.expandByPoint(pa.min),Pn.expandByPoint(pa.max))}Pn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)$e.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared($e));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$e.fromBufferAttribute(o,c),l&&(vr.fromBufferAttribute(t,c),$e.add(vr)),i=Math.max(i,n.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new di(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let C=0;C<n.count;C++)o[C]=new V,l[C]=new V;let h=new V,d=new V,u=new V,f=new Pt,m=new Pt,_=new Pt,p=new V,g=new V;function y(C,R,L){c[C]=c[R]=c[L]=1,h.fromBufferAttribute(n,C),d.fromBufferAttribute(n,R),u.fromBufferAttribute(n,L),f.fromBufferAttribute(r,C),m.fromBufferAttribute(r,R),_.fromBufferAttribute(r,L),d.sub(h),u.sub(h),m.sub(f),_.sub(f);let G=1/(m.x*_.y-_.x*m.y);isFinite(G)&&(p.copy(d).multiplyScalar(_.y).addScaledVector(u,-m.y).multiplyScalar(G),g.copy(u).multiplyScalar(m.x).addScaledVector(d,-_.x).multiplyScalar(G),o[C].add(p),o[R].add(p),o[L].add(p),l[C].add(g),l[R].add(g),l[L].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let C=0,R=w.length;C<R;++C){let L=w[C],G=L.start,O=L.count;for(let P=G,F=G+O;P<F;P+=3)y(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let M=new V,b=new V,T=new V,x=new V;function S(C){T.fromBufferAttribute(i,C),x.copy(T);let R=o[C];M.copy(R),M.sub(T.multiplyScalar(T.dot(R))).normalize(),b.crossVectors(x,R);let G=b.dot(l[C])<0?-1:1;a.setXYZW(C,M.x,M.y,M.z,G)}for(let C=0,R=n.count;C<R;++C)c[C]&&S(C);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new di(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new V,r=new V,a=new V,o=new V,l=new V,c=new V,h=new V,d=new V;if(t)for(let u=0,f=t.count;u<f;u+=3){let m=t.getX(u+0),_=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let g=0;g<h;g++)u[m++]=c[f++]}return new di(u,h,d)}if(this.index===null)return Yt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var uu=new V,K_=new V,j_=new jt,Yn=class{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=uu.subVectors(n,e).cross(K_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(uu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||j_.getNormalMatrix(t),i=this.coplanarPoint(uu).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Q_=0,Zn=class extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=Hr(),this.name="",this.type="Material",this.blending=zr,this.side=ms,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nu,this.blendDst=Uu,this.blendEquation=Ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ll,this.stencilZFail=ll,this.stencilZPass=ll,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Yt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Yt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new te().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Yn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Pt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Pt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Ui=new V,fu=new V,Go=new V,Ho=new V,Rr=class{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ui.copy(this.origin).addScaledVector(this.direction,e),Ui.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){fu.copy(t).add(e).multiplyScalar(.5),Go.copy(e).sub(t).normalize(),Ho.copy(this.origin).sub(fu);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Go),o=Ho.dot(this.direction),l=-Ho.dot(Go),c=Ho.lengthSq(),h=Math.abs(1-a*a),d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){let _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(fu).addScaledVector(Go,u),f}intersectSphere(t,e){if(t.radius<0)return null;Ui.subVectors(t.center,this.origin);let n=Ui.dot(this.direction),i=Ui.dot(Ui)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ui)!==null}intersectTriangle(t,e,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,m=e.x-a.x,_=e.y-a.y,p=e.z-a.z,g=n.x-a.x,y=n.y-a.y,w=n.z-a.z,M=Math.abs(l),b=Math.abs(c),T=Math.abs(h),x,S,C,R,L,G,O,P,F,z,N,Y;if(M>=b&&M>=T?(C=l,G=d,F=m,Y=g,l>=0?(x=c,S=h,R=u,L=f,O=_,P=p,z=y,N=w):(x=h,S=c,R=f,L=u,O=p,P=_,z=w,N=y)):b>=T?(C=c,G=u,F=_,Y=y,c>=0?(x=h,S=l,R=f,L=d,O=p,P=m,z=w,N=g):(x=l,S=h,R=d,L=f,O=m,P=p,z=g,N=w)):(C=h,G=f,F=p,Y=w,h>=0?(x=l,S=c,R=d,L=u,O=m,P=_,z=g,N=y):(x=c,S=l,R=u,L=d,O=_,P=m,z=y,N=g)),C===0)return null;let W=x/C,K=S/C,Z=1/C,dt=R-W*G,Ot=L-K*G,J=O-W*F,ft=P-K*F,At=z-W*Y,Ut=N-K*Y,_t=At*ft-Ut*J,Bt=dt*Ut-Ot*At,ee=J*Ot-ft*dt;if(i){if(_t<0||Bt<0||ee<0)return null}else if((_t<0||Bt<0||ee<0)&&(_t>0||Bt>0||ee>0))return null;let zt=_t+Bt+ee;if(zt===0)return null;let Zt=Z*(_t*G+Bt*F+ee*Y);return(zt>0?Zt<0:Zt>0)?null:this.at(Zt/zt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},bl=class extends Zn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},mp=new Me,Us=new Rr,Wo=new hs,gp=new V,Xo=new V,qo=new V,$o=new V,du=new V,Yo=new V,_p=new V,Zo=new V,Ln=class extends Ze{constructor(t=new bn,e=new bl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){Yo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(du.fromBufferAttribute(d,t),a?Yo.addScaledVector(du,h):Yo.addScaledVector(du.sub(e),h))}e.add(Yo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wo.copy(n.boundingSphere),Wo.applyMatrix4(r),Us.copy(t.ray).recast(t.near),!(Wo.containsPoint(Us.origin)===!1&&(Us.intersectSphere(Wo,gp)===null||Us.origin.distanceToSquared(gp)>(t.far-t.near)**2))&&(mp.copy(r).invert(),Us.copy(t.ray).applyMatrix4(mp),!(n.boundingBox!==null&&Us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Us)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){let p=u[m],g=a[p.materialIndex],y=Math.max(p.start,f.start),w=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let M=y,b=w;M<b;M+=3){let T=o.getX(M),x=o.getX(M+1),S=o.getX(M+2);i=Jo(this,g,t,n,c,h,d,T,x,S),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let y=o.getX(p),w=o.getX(p+1),M=o.getX(p+2);i=Jo(this,a,t,n,c,h,d,y,w,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){let p=u[m],g=a[p.materialIndex],y=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=y,b=w;M<b;M+=3){let T=M,x=M+1,S=M+2;i=Jo(this,g,t,n,c,h,d,T,x,S),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let y=p,w=p+1,M=p+2;i=Jo(this,a,t,n,c,h,d,y,w,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function tx(s,t,e,n,i,r,a,o){let l;if(t.side===gn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===ms,o),l===null)return null;Zo.copy(o),Zo.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Zo);return c<e.near||c>e.far?null:{distance:c,point:Zo.clone(),object:s}}function Jo(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Xo),s.getVertexPosition(l,qo),s.getVertexPosition(c,$o);let h=tx(s,t,e,n,Xo,qo,$o,_p);if(h){let d=new V;ls.getBarycoord(_p,Xo,qo,$o,d),i&&(h.uv=ls.getInterpolatedAttribute(i,o,l,c,d,new Pt)),r&&(h.uv1=ls.getInterpolatedAttribute(r,o,l,c,d,new Pt)),a&&(h.normal=ls.getInterpolatedAttribute(a,o,l,c,d,new V),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new V,materialIndex:0};ls.getNormal(Xo,qo,$o,u.normal),h.face=u,h.barycoord=d}return h}var wl=class extends Sn{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ye,h=Ye,d,u){super(null,a,o,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Os=new hs,ex=new Pt(.5,.5),Ko=new V,us=class{constructor(t=new Yn,e=new Yn,n=new Yn,i=new Yn,r=new Yn,a=new Yn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn,n=!1){let i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],_=r[9],p=r[10],g=r[11],y=r[12],w=r[13],M=r[14],b=r[15];if(i[0].setComponents(c-a,f-h,g-m,b-y).normalize(),i[1].setComponents(c+a,f+h,g+m,b+y).normalize(),i[2].setComponents(c+o,f+d,g+_,b+w).normalize(),i[3].setComponents(c-o,f-d,g-_,b-w).normalize(),n)i[4].setComponents(l,u,p,M).normalize(),i[5].setComponents(c-l,f-u,g-p,b-M).normalize();else if(i[4].setComponents(c-l,f-u,g-p,b-M).normalize(),e===Vn)i[5].setComponents(c+l,f+u,g+p,b+M).normalize();else if(e===Ar)i[5].setComponents(l,u,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Os.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(t){Os.center.set(0,0,0);let e=ex.distanceTo(t.center);return Os.radius=.7071067811865476+e,Os.applyMatrix4(t.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Ko.x=i.normal.x>0?t.max.x:t.min.x,Ko.y=i.normal.y>0?t.max.y:t.min.y,Ko.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ko)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},xp=new Me,Al=class s{constructor(){this.coordinateSystem=Vn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];xp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new us),n[i].setFromProjectionMatrix(xp,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new us),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};var Bs=class extends Zn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Tl=new V,El=new V,vp=new Me,ma=new Rr,jo=new hs,pu=new V,yp=new V,Cl=class extends Ze{constructor(t=new bn,e=new Bs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Tl.fromBufferAttribute(e,i-1),El.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Tl.distanceTo(El);t.setAttribute("lineDistance",new De(n,1))}else Yt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jo.copy(n.boundingSphere),jo.applyMatrix4(i),jo.radius+=r,t.ray.intersectsSphere(jo)===!1)return;vp.copy(i).invert(),ma.copy(t.ray).applyMatrix4(vp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=f,p=m-1;_<p;_+=c){let g=h.getX(_),y=h.getX(_+1),w=Qo(this,t,ma,l,g,y,_);w&&e.push(w)}if(this.isLineLoop){let _=h.getX(m-1),p=h.getX(f),g=Qo(this,t,ma,l,_,p,m-1);g&&e.push(g)}}else{let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,p=m-1;_<p;_+=c){let g=Qo(this,t,ma,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=Qo(this,t,ma,l,m-1,f,m-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Qo(s,t,e,n,i,r,a){let o=s.geometry.attributes.position;if(Tl.fromBufferAttribute(o,i),El.fromBufferAttribute(o,r),e.distanceSqToSegment(Tl,El,pu,yp)>n)return;pu.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(pu);if(!(c<t.near||c>t.far))return{distance:c,point:yp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Mp=new V,Sp=new V,Pr=class extends Cl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Mp.fromBufferAttribute(e,i),Sp.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Mp.distanceTo(Sp);t.setAttribute("lineDistance",new De(n,1))}else Yt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Rl=class extends Zn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},bp=new Me,bu=new Rr,tl=new hs,el=new V,Ra=class extends Ze{constructor(t=new bn,e=new Rl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tl.copy(n.boundingSphere),tl.applyMatrix4(i),tl.radius+=r,t.ray.intersectsSphere(tl)===!1)return;bp.copy(i).invert(),bu.copy(t.ray).applyMatrix4(bp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,_=f;m<_;m++){let p=c.getX(m);el.fromBufferAttribute(d,p),wp(el,p,l,i,t,e,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,_=f;m<_;m++)el.fromBufferAttribute(d,m),wp(el,m,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function wp(s,t,e,n,i,r,a){let o=bu.distanceSqToPoint(s);if(o<e){let l=new V;bu.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Pa=class extends Sn{constructor(t=[],e=Xs,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var zi=class extends Sn{constructor(t,e,n=Jn,i,r,a,o=Ye,l=Ye,c,h=Bi,d=1){if(h!==Bi&&h!==Gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Er(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ia=class extends zi{constructor(t,e=Jn,n=Xs,i,r,a=Ye,o=Ye,l,c=Bi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},La=class extends Sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ir=class s extends bn{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(h,3)),this.setAttribute("uv",new De(d,2));function m(_,p,g,y,w,M,b,T,x,S,C){let R=M/x,L=b/S,G=M/2,O=b/2,P=T/2,F=x+1,z=S+1,N=0,Y=0,W=new V;for(let K=0;K<z;K++){let Z=K*L-O;for(let dt=0;dt<F;dt++){let Ot=dt*R-G;W[_]=Ot*y,W[p]=Z*w,W[g]=P,c.push(W.x,W.y,W.z),W[_]=0,W[p]=0,W[g]=T>0?1:-1,h.push(W.x,W.y,W.z),d.push(dt/x),d.push(1-K/S),N+=1}}for(let K=0;K<S;K++)for(let Z=0;Z<x;Z++){let dt=u+Z+F*K,Ot=u+Z+F*(K+1),J=u+(Z+1)+F*(K+1),ft=u+(Z+1)+F*K;l.push(dt,Ot,ft),l.push(Ot,J,ft),Y+=6}o.addGroup(f,Y,C),f+=Y,u+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Yt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new Pt:new V);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new V,i=[],r=[],a=[],o=new V,l=new Me;for(let f=0;f<=t;f++){let m=f/t;i[f]=this.getTangentAt(m,new V)}r[0]=new V,a[0]=new V;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(re(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(re(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Lr=class extends Dn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Pt){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Pl=class extends Lr{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function sf(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var Ap=new V,Tp=new V,mu=new sf,gu=new sf,_u=new sf,Il=class extends Dn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new V){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Tp.subVectors(i[0],i[1]).add(i[0]),c=Tp);let d=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ap.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ap),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),mu.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,_,p),gu.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,_,p),_u.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(mu.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),gu.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),_u.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(mu.calc(l),gu.calc(l),_u.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new V().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Ep(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function nx(s,t){let e=1-s;return e*e*t}function ix(s,t){return 2*(1-s)*s*t}function sx(s,t){return s*s*t}function xa(s,t,e,n){return nx(s,t)+ix(s,e)+sx(s,n)}function rx(s,t){let e=1-s;return e*e*e*t}function ax(s,t){let e=1-s;return 3*e*e*s*t}function ox(s,t){return 3*(1-s)*s*s*t}function lx(s,t){return s*s*s*t}function va(s,t,e,n,i){return rx(s,t)+ax(s,e)+ox(s,n)+lx(s,i)}var Da=class extends Dn{constructor(t=new Pt,e=new Pt,n=new Pt,i=new Pt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Pt){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(va(t,i.x,r.x,a.x,o.x),va(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ll=class extends Dn{constructor(t=new V,e=new V,n=new V,i=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new V){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(va(t,i.x,r.x,a.x,o.x),va(t,i.y,r.y,a.y,o.y),va(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Na=class extends Dn{constructor(t=new Pt,e=new Pt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Pt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Pt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Dl=class extends Dn{constructor(t=new V,e=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new V){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new V){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ua=class extends Dn{constructor(t=new Pt,e=new Pt,n=new Pt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Pt){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(xa(t,i.x,r.x,a.x),xa(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Nl=class extends Dn{constructor(t=new V,e=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new V){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(xa(t,i.x,r.x,a.x),xa(t,i.y,r.y,a.y),xa(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Oa=class extends Dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Pt){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Ep(o,l.x,c.x,h.x,d.x),Ep(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new Pt().fromArray(i))}return this}},wu=Object.freeze({__proto__:null,ArcCurve:Pl,CatmullRomCurve3:Il,CubicBezierCurve:Da,CubicBezierCurve3:Ll,EllipseCurve:Lr,LineCurve:Na,LineCurve3:Dl,QuadraticBezierCurve:Ua,QuadraticBezierCurve3:Nl,SplineCurve:Oa}),Ul=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wu[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new wu[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},ks=class extends Ul{constructor(t){super(),this.type="Path",this.currentPoint=new Pt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Na(this.currentPoint.clone(),new Pt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Ua(this.currentPoint.clone(),new Pt(t,e),new Pt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new Da(this.currentPoint.clone(),new Pt(t,e),new Pt(n,i),new Pt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Oa(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new Lr(t,e,n,i,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Dr=class extends ks{constructor(t){super(t),this.uuid=Hr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new ks().fromJSON(i))}return this}};function cx(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=bm(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=px(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,d=l;for(let u=e;u<i;u+=e){let f=s[u],m=s[u+1];f<o&&(o=f),m<l&&(l=m),f>h&&(h=f),m>d&&(d=m)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Fa(r,a,e,o,l,c,0),a}function bm(s,t,e,n,i){let r;if(i===Ax(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=Cp(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Cp(a/n|0,s[a],s[a+1],r);return r&&Nr(r,r.next)&&(ka(r),r=r.next),r}function zs(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Nr(e,e.next)||Le(e.prev,e,e.next)===0)){if(ka(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Fa(s,t,e,n,i,r,a){if(!s)return;!a&&r&&vx(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?ux(s,n,i,r):hx(s)){t.push(l.i,s.i,c.i),ka(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=fx(zs(s),t),Fa(s,t,e,n,i,r,2)):a===2&&dx(s,t,e,n,i,r):Fa(zs(s),t,e,n,i,r,1);break}}}function hx(s){let t=s.prev,e=s,n=s.next;if(Le(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),d=Math.min(o,l,c),u=Math.max(i,r,a),f=Math.max(o,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&ga(i,o,r,l,a,c,m.x,m.y)&&Le(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ux(s,t,e,n){let i=s.prev,r=s,a=s.next;if(Le(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,d=r.y,u=a.y,f=Math.min(o,l,c),m=Math.min(h,d,u),_=Math.max(o,l,c),p=Math.max(h,d,u),g=Au(f,m,t,e,n),y=Au(_,p,t,e,n),w=s.prevZ,M=s.nextZ;for(;w&&w.z>=g&&M&&M.z<=y;){if(w.x>=f&&w.x<=_&&w.y>=m&&w.y<=p&&w!==i&&w!==a&&ga(o,h,l,d,c,u,w.x,w.y)&&Le(w.prev,w,w.next)>=0||(w=w.prevZ,M.x>=f&&M.x<=_&&M.y>=m&&M.y<=p&&M!==i&&M!==a&&ga(o,h,l,d,c,u,M.x,M.y)&&Le(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;w&&w.z>=g;){if(w.x>=f&&w.x<=_&&w.y>=m&&w.y<=p&&w!==i&&w!==a&&ga(o,h,l,d,c,u,w.x,w.y)&&Le(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;M&&M.z<=y;){if(M.x>=f&&M.x<=_&&M.y>=m&&M.y<=p&&M!==i&&M!==a&&ga(o,h,l,d,c,u,M.x,M.y)&&Le(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function fx(s,t){let e=s;do{let n=e.prev,i=e.next.next;!Nr(n,i)&&Am(n,e,e.next,i)&&Ba(n,i)&&Ba(i,n)&&(t.push(n.i,e.i,i.i),ka(e),ka(e.next),e=s=i),e=e.next}while(e!==s);return zs(e)}function dx(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Sx(a,o)){let l=Tm(a,o);a=zs(a,a.next),l=zs(l,l.next),Fa(a,t,e,n,i,r,0),Fa(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function px(s,t,e,n){let i=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=bm(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Mx(c))}i.sort(mx);for(let r=0;r<i.length;r++)e=gx(i[r],e);return e}function mx(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function gx(s,t){let e=_x(s,t);if(!e)return t;let n=Tm(e,s);return zs(n,n.next),zs(e,e.next)}function _x(s,t){let e=t,n=s.x,i=s.y,r=-1/0,a;if(Nr(s,e))return e;do{if(Nr(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&wm(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let d=Math.abs(i-e.y)/(n-e.x);Ba(e,s)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&xx(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function xx(s,t){return Le(s.prev,s,t.prev)<0&&Le(t.next,s,s.next)<0}function vx(s,t,e,n){let i=s;do i.z===0&&(i.z=Au(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,yx(i)}function yx(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Au(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Mx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function wm(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function ga(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&wm(s,t,e,n,i,r,a,o)}function Sx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!bx(s,t)&&(Ba(s,t)&&Ba(t,s)&&wx(s,t)&&(Le(s.prev,s,t.prev)||Le(s,t.prev,t))||Nr(s,t)&&Le(s.prev,s,s.next)>0&&Le(t.prev,t,t.next)>0)}function Le(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Nr(s,t){return s.x===t.x&&s.y===t.y}function Am(s,t,e,n){let i=il(Le(s,t,e)),r=il(Le(s,t,n)),a=il(Le(e,n,s)),o=il(Le(e,n,t));return!!(i!==r&&a!==o||i===0&&nl(s,e,t)||r===0&&nl(s,n,t)||a===0&&nl(e,s,n)||o===0&&nl(e,t,n))}function nl(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function il(s){return s>0?1:s<0?-1:0}function bx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Am(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Ba(s,t){return Le(s.prev,s,s.next)<0?Le(s,t,s.next)>=0&&Le(s,s.prev,t)>=0:Le(s,t,s.prev)<0||Le(s,s.next,t)<0}function wx(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Tm(s,t){let e=Tu(s.i,s.x,s.y),n=Tu(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Cp(s,t,e,n){let i=Tu(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ka(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Tu(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ax(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Eu=class{static triangulate(t,e,n=2){return cx(t,e,n)}},Fs=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];Rp(t),Pp(n,t);let a=t.length;e.forEach(Rp);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Pp(n,e[l]);let o=Eu.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Rp(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Pp(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var za=class s extends bn{constructor(t=new Dr([new Pt(.5,.5),new Pt(-.5,.5),new Pt(-.5,-.5),new Pt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new De(i,3)),this.setAttribute("uv",new De(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:Tx,w,M=!1,b,T,x,S;if(g){w=g.getSpacedPoints(h),M=!0,u=!1;let at=g.isCatmullRomCurve3?g.closed:!1;b=g.computeFrenetFrames(h,at),T=new V,x=new V,S=new V}u||(p=0,f=0,m=0,_=0);let C=o.extractPoints(c),R=C.shape,L=C.holes;if(!Fs.isClockWise(R)){R=R.reverse();for(let at=0,H=L.length;at<H;at++){let it=L[at];Fs.isClockWise(it)&&(L[at]=it.reverse())}}function O(at){let it=10000000000000001e-36,ct=at[0];for(let B=1;B<=at.length;B++){let ot=B%at.length,ut=at[ot],Tt=ut.x-ct.x,It=ut.y-ct.y,Xt=Tt*Tt+It*It,D=Math.max(Math.abs(ut.x),Math.abs(ut.y),Math.abs(ct.x),Math.abs(ct.y)),de=it*D*D;if(Xt<=de){at.splice(ot,1),B--;continue}ct=ut}}O(R),L.forEach(O);let P=L.length,F=R;for(let at=0;at<P;at++){let H=L[at];R=R.concat(H)}function z(at,H,it){return H||Jt("ExtrudeGeometry: vec does not exist"),at.clone().addScaledVector(H,it)}let N=R.length;function Y(at,H,it){let ct,B,ot,ut=at.x-H.x,Tt=at.y-H.y,It=it.x-at.x,Xt=it.y-at.y,D=ut*ut+Tt*Tt,de=ut*Xt-Tt*It;if(Math.abs(de)>Number.EPSILON){let et=Math.sqrt(D),vt=Math.sqrt(It*It+Xt*Xt),nt=H.x-Tt/et,Et=H.y+ut/et,mt=it.x-Xt/vt,yt=it.y+It/vt,E=((mt-nt)*Xt-(yt-Et)*It)/(ut*Xt-Tt*It);ct=nt+ut*E-at.x,B=Et+Tt*E-at.y;let v=ct*ct+B*B;if(v<=2)return new Pt(ct,B);ot=Math.sqrt(v/2)}else{let et=!1;ut>Number.EPSILON?It>Number.EPSILON&&(et=!0):ut<-Number.EPSILON?It<-Number.EPSILON&&(et=!0):Math.sign(Tt)===Math.sign(Xt)&&(et=!0),et?(ct=-Tt,B=ut,ot=Math.sqrt(D)):(ct=ut,B=Tt,ot=Math.sqrt(D/2))}return new Pt(ct/ot,B/ot)}let W=[];for(let at=0,H=F.length,it=H-1,ct=at+1;at<H;at++,it++,ct++)it===H&&(it=0),ct===H&&(ct=0),W[at]=Y(F[at],F[it],F[ct]);let K=[],Z,dt=W.concat();for(let at=0,H=P;at<H;at++){let it=L[at];Z=[];for(let ct=0,B=it.length,ot=B-1,ut=ct+1;ct<B;ct++,ot++,ut++)ot===B&&(ot=0),ut===B&&(ut=0),Z[ct]=Y(it[ct],it[ot],it[ut]);K.push(Z),dt=dt.concat(Z)}let Ot;if(p===0)Ot=Fs.triangulateShape(F,L);else{let at=[],H=[];for(let it=0;it<p;it++){let ct=it/p,B=f*Math.cos(ct*Math.PI/2),ot=m*Math.sin(ct*Math.PI/2)+_;for(let ut=0,Tt=F.length;ut<Tt;ut++){let It=z(F[ut],W[ut],ot);Bt(It.x,It.y,-B),ct===0&&at.push(It)}for(let ut=0,Tt=P;ut<Tt;ut++){let It=L[ut];Z=K[ut];let Xt=[];for(let D=0,de=It.length;D<de;D++){let et=z(It[D],Z[D],ot);Bt(et.x,et.y,-B),ct===0&&Xt.push(et)}ct===0&&H.push(Xt)}}Ot=Fs.triangulateShape(at,H)}let J=Ot.length,ft=m+_;for(let at=0;at<N;at++){let H=u?z(R[at],dt[at],ft):R[at];M?(x.copy(b.normals[0]).multiplyScalar(H.x),T.copy(b.binormals[0]).multiplyScalar(H.y),S.copy(w[0]).add(x).add(T),Bt(S.x,S.y,S.z)):Bt(H.x,H.y,0)}for(let at=1;at<=h;at++)for(let H=0;H<N;H++){let it=u?z(R[H],dt[H],ft):R[H];M?(x.copy(b.normals[at]).multiplyScalar(it.x),T.copy(b.binormals[at]).multiplyScalar(it.y),S.copy(w[at]).add(x).add(T),Bt(S.x,S.y,S.z)):Bt(it.x,it.y,d/h*at)}for(let at=p-1;at>=0;at--){let H=at/p,it=f*Math.cos(H*Math.PI/2),ct=m*Math.sin(H*Math.PI/2)+_;for(let B=0,ot=F.length;B<ot;B++){let ut=z(F[B],W[B],ct);Bt(ut.x,ut.y,d+it)}for(let B=0,ot=L.length;B<ot;B++){let ut=L[B];Z=K[B];for(let Tt=0,It=ut.length;Tt<It;Tt++){let Xt=z(ut[Tt],Z[Tt],ct);M?Bt(Xt.x,Xt.y+w[h-1].y,w[h-1].x+it):Bt(Xt.x,Xt.y,d+it)}}}At(),Ut();function At(){let at=i.length/3;if(u){let H=0,it=N*H;for(let ct=0;ct<J;ct++){let B=Ot[ct];ee(B[2]+it,B[1]+it,B[0]+it)}H=h+p*2,it=N*H;for(let ct=0;ct<J;ct++){let B=Ot[ct];ee(B[0]+it,B[1]+it,B[2]+it)}}else{for(let H=0;H<J;H++){let it=Ot[H];ee(it[2],it[1],it[0])}for(let H=0;H<J;H++){let it=Ot[H];ee(it[0]+N*h,it[1]+N*h,it[2]+N*h)}}n.addGroup(at,i.length/3-at,0)}function Ut(){let at=i.length/3,H=0;_t(F,H),H+=F.length;for(let it=0,ct=L.length;it<ct;it++){let B=L[it];_t(B,H),H+=B.length}n.addGroup(at,i.length/3-at,1)}function _t(at,H){let it=at.length;for(;--it>=0;){let ct=it,B=it-1;B<0&&(B=at.length-1);for(let ot=0,ut=h+p*2;ot<ut;ot++){let Tt=N*ot,It=N*(ot+1),Xt=H+ct+Tt,D=H+B+Tt,de=H+B+It,et=H+ct+It;zt(Xt,D,de,et)}}}function Bt(at,H,it){l.push(at),l.push(H),l.push(it)}function ee(at,H,it){Zt(at),Zt(H),Zt(it);let ct=i.length/3,B=y.generateTopUV(n,i,ct-3,ct-2,ct-1);Kt(B[0]),Kt(B[1]),Kt(B[2])}function zt(at,H,it,ct){Zt(at),Zt(H),Zt(ct),Zt(H),Zt(it),Zt(ct);let B=i.length/3,ot=y.generateSideWallUV(n,i,B-6,B-3,B-2,B-1);Kt(ot[0]),Kt(ot[1]),Kt(ot[3]),Kt(ot[1]),Kt(ot[2]),Kt(ot[3])}function Zt(at){i.push(l[at*3+0]),i.push(l[at*3+1]),i.push(l[at*3+2])}function Kt(at){r.push(at.x),r.push(at.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ex(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new wu[i.type]().fromJSON(i)),new s(n,t.options)}},Tx={generateTopUV:function(s,t,e,n,i){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Pt(r,a),new Pt(o,l),new Pt(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],m=t[i*3+2],_=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Pt(a,1-l),new Pt(c,1-d),new Pt(u,1-m),new Pt(_,1-g)]:[new Pt(o,1-l),new Pt(h,1-d),new Pt(f,1-m),new Pt(p,1-g)]}};function Ex(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Vs=class s extends bn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=t/o,u=e/l,f=[],m=[],_=[],p=[];for(let g=0;g<h;g++){let y=g*u-a;for(let w=0;w<c;w++){let M=w*d-r;m.push(M,-y,0),_.push(0,0,1),p.push(w/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<o;y++){let w=y+c*g,M=y+c*(g+1),b=y+1+c*(g+1),T=y+1+c*g;f.push(w,M,T),f.push(M,b,T)}this.setIndex(f),this.setAttribute("position",new De(m,3)),this.setAttribute("normal",new De(_,3)),this.setAttribute("uv",new De(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Va=class extends Zn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new te(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function $s(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(Ip(i))i.isRenderTargetTexture?(Yt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Ip(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function ln(s){let t={};for(let e=0;e<s.length;e++){let n=$s(s[e]);for(let i in n)t[i]=n[i]}return t}function Ip(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Cx(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function rf(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var Em={clone:$s,merge:ln},Rx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Px=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Gn=class extends Zn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rx,this.fragmentShader=Px,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=$s(t.uniforms),this.uniformsGroups=Cx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new te().setHex(i.value);break;case"v2":this.uniforms[n].value=new Pt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new V().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Te().fromArray(i.value);break;case"m3":this.uniforms[n].value=new jt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Me().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ol=class extends Gn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ur=class extends Zn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fc,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Fl=class extends Zn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Bl=class extends Zn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function yr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function sl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var fs=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},kl=class extends fs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yu,endingEnd:yu}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Mu:r=t,o=2*e-n;break;case Su:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Mu:a=t,l=2*n-e;break;case Su:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-e)/(i-e),_=m*m,p=_*m,g=-u*p+2*u*_-u*m,y=(1+u)*p+(-1.5-2*u)*_+(-.5+u)*m+1,w=(-1-f)*p+(1.5+f)*_+.5*m,M=f*p-f*_;for(let b=0;b!==o;++b)r[b]=g*a[h+b]+y*a[c+b]+w*a[l+b]+M*a[d+b];return r}},zl=class extends fs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Vl=class extends fs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Gl=class extends fs{interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(n-e)/(i-e),_=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*_+a[l+p]*m;return r}let u=o*2,f=t-1;for(let m=0;m!==o;++m){let _=a[c+m],p=a[l+m],g=f*u+m*2,y=d[g],w=d[g+1],M=t*u+m*2,b=h[M],T=h[M+1],x=Lx(n,e,y,b,i);r[m]=Cm(x,_,w,T,p)}return r}};function Cm(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function Ix(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function Lx(s,t,e,n,i){let r=(s-t)/(i-t);for(let a=0;a<8;a++){let o=Cm(r,t,e,n,i)-s;if(Math.abs(o)<1e-10)break;let l=Ix(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Nn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=yr(e,this.TimeBufferType),this.values=yr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:yr(t.times,Array),values:yr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),sl(t.settings)&&(n.settings={inTangents:yr(t.settings.inTangents,Array),outTangents:yr(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Vl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new zl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new kl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Gl(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case ya:e=this.InterpolantFactoryMethodDiscrete;break;case xl:e=this.InterpolantFactoryMethodLinear;break;case ol:e=this.InterpolantFactoryMethodSmooth;break;case vu:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Yt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ya;case this.InterpolantFactoryMethodLinear:return xl;case this.InterpolantFactoryMethodSmooth:return ol;case this.InterpolantFactoryMethodBezier:return vu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;sl(this.settings)&&(Lp(this.settings.inTangents,t),Lp(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;sl(this.settings)&&(Dp(this.settings.inTangents,t),Dp(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Jt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Jt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Jt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Jt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&N_(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Jt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ol,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let _=e[d+m];if(_!==e[u+m]||_!==e[f+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,sl(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Lp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]+=t}function Dp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}Nn.prototype.ValueTypeName="";Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=xl;var ds=class extends Nn{constructor(t,e,n){super(t,e,n)}};ds.prototype.ValueTypeName="bool";ds.prototype.ValueBufferType=Array;ds.prototype.DefaultInterpolation=ya;ds.prototype.InterpolantFactoryMethodLinear=void 0;ds.prototype.InterpolantFactoryMethodSmooth=void 0;var Hl=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};Hl.prototype.ValueTypeName="color";var Wl=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};Wl.prototype.ValueTypeName="number";var Xl=class extends fs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)mi.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ga=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Xl(this.times,this.values,this.getValueSize(),t)}};Ga.prototype.ValueTypeName="quaternion";Ga.prototype.InterpolantFactoryMethodSmooth=void 0;var ps=class extends Nn{constructor(t,e,n){super(t,e,n)}};ps.prototype.ValueTypeName="string";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=ya;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;var ql=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};ql.prototype.ValueTypeName="vector";var $l=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Rm=new $l,Yl=class{constructor(t){this.manager=t!==void 0?t:Rm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Yl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Or=class extends Ze{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Ha=class extends Or{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},xu=new Me,Np=new V,Up=new V,Zl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new Me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new us,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Np.setFromMatrixPosition(t.matrixWorld),e.position.copy(Np),Up.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Up),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){xu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(xu,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===Ar||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(xu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},rl=new V,al=new mi,ui=new V,Wa=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me,this.projectionMatrix=new Me,this.projectionMatrixInverse=new Me,this.coordinateSystem=Vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(rl,al,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rl,al,ui.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(rl,al,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rl,al,ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},os=new V,Op=new Pt,Fp=new Pt,pn=class extends Wa{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=vl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan($h*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vl*2*Math.atan(Math.tan($h*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(os.x,os.y).multiplyScalar(-t/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(os.x,os.y).multiplyScalar(-t/os.z)}getViewSize(t,e){return this.getViewBounds(t,Op,Fp),e.subVectors(Fp,Op)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan($h*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Xa=class extends Wa{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Cu=class extends Zl{constructor(){super(new Xa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fr=class extends Or{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Cu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},qa=class extends Or{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Mr=-90,Sr=1,Br=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new pn(Mr,Sr,t,e);i.layers=this.layers,this.add(i);let r=new pn(Mr,Sr,t,e);r.layers=this.layers,this.add(r);let a=new pn(Mr,Sr,t,e);a.layers=this.layers,this.add(a);let o=new pn(Mr,Sr,t,e);o.layers=this.layers,this.add(o);let l=new pn(Mr,Sr,t,e);l.layers=this.layers,this.add(l);let c=new pn(Mr,Sr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Jl=class extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var af="\\[\\]\\.:\\/",Dx=new RegExp("["+af+"]","g"),of="[^"+af+"]",Nx="[^"+af.replace("\\.","")+"]",Ux=/((?:WC+[\/:])*)/.source.replace("WC",of),Ox=/(WCOD+)?/.source.replace("WCOD",Nx),Fx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",of),Bx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",of),kx=new RegExp("^"+Ux+Ox+Fx+Bx+"$"),zx=["material","materials","bones","map"],Ru=class{constructor(t,e,n){let i=n||we.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},we=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Dx,"")}static parseTrackName(t){let e=kx.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);zx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Yt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Jt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Jt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Jt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Jt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Jt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;Jt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};we.Composite=Ru;we.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};we.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};we.prototype.GetterByBindingType=[we.prototype._getValue_direct,we.prototype._getValue_array,we.prototype._getValue_arrayElement,we.prototype._getValue_toArray];we.prototype.SetterByBindingTypeAndVersioning=[[we.prototype._setValue_direct,we.prototype._setValue_direct_setNeedsUpdate,we.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[we.prototype._setValue_array,we.prototype._setValue_array_setNeedsUpdate,we.prototype._setValue_array_setMatrixWorldNeedsUpdate],[we.prototype._setValue_arrayElement,we.prototype._setValue_arrayElement_setNeedsUpdate,we.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[we.prototype._setValue_fromArray,we.prototype._setValue_fromArray_setNeedsUpdate,we.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var b1=new Float32Array(1);var df=class df{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};df.prototype.isMatrix2=!0;var Pu=df;function lf(s,t,e,n){let i=Vx(n);switch(e){case Yu:return s*t;case Ju:return s*t/i.components*i.byteLength;case sc:return s*t/i.components*i.byteLength;case gs:return s*t*2/i.components*i.byteLength;case rc:return s*t*2/i.components*i.byteLength;case Zu:return s*t*3/i.components*i.byteLength;case Qn:return s*t*4/i.components*i.byteLength;case ac:return s*t*4/i.components*i.byteLength;case Ja:case Ka:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ja:case Qa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case lc:case hc:return Math.max(s,16)*Math.max(t,8)/4;case oc:case cc:return Math.max(s,8)*Math.max(t,8)/2;case uc:case fc:case pc:case mc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case dc:case to:case gc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case _c:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case xc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case vc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case yc:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Sc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case bc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case wc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ac:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Tc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ec:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Cc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Rc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Pc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ic:case Lc:case Dc:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Nc:case Uc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case eo:case Oc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vx(s){switch(s){case wn:case Wu:return{byteLength:1,components:1};case Gr:case Xu:case jn:return{byteLength:2,components:1};case nc:case ic:return{byteLength:2,components:4};case Jn:case ec:case Kn:return{byteLength:4,components:1};case qu:case $u:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Yt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Km(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Hx(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var Wx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xx=`#ifdef USE_ALPHAHASH
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
#endif`,qx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$x=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jx=`#ifdef USE_AOMAP
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
#endif`,Kx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jx=`#ifdef USE_BATCHING
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
#endif`,Qx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ev=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iv=`#ifdef USE_IRIDESCENCE
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
#endif`,sv=`#ifdef USE_BUMPMAP
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
#endif`,rv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,av=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ov=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,hv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,uv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,dv=`#define PI 3.141592653589793
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
} // validated`,pv=`vec3 transformedNormal = objectNormal;
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
#endif`,mv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_v=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vv="gl_FragColor = linearToOutputTexel( gl_FragColor );",yv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mv=`#ifdef USE_ENVMAP
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
#endif`,Sv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,bv=`#ifdef USE_ENVMAP
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
#endif`,wv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Av=`#ifdef USE_ENVMAP
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
#endif`,Tv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ev=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pv=`#ifdef USE_GRADIENTMAP
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
}`,Iv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Uv=`#ifdef USE_ENVMAP
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
#endif`,Ov=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zv=`PhysicalMaterial material;
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
#endif`,Vv=`uniform sampler2D dfgLUT;
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
}`,Gv=`
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
#endif`,Hv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xv=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,qv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$v=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Qv=`#if defined( USE_POINTS_UV )
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
#endif`,ty=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ey=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ny=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,iy=`#if defined( USE_MORPHCOLORS )
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
#endif`,sy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ry=`#ifdef USE_MORPHTARGETS
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
#endif`,ay=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,oy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ly=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,fy=`#ifdef USE_NORMALMAP
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
#endif`,dy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,py=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,my=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_y=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,My=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,by=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ay=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ty=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ey=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cy=`float getShadowMask() {
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
}`,Ry=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Py=`#ifdef USE_SKINNING
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
#endif`,Iy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ly=`#ifdef USE_SKINNING
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
#endif`,Dy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ny=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Uy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Oy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fy=`#ifdef USE_TRANSMISSION
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
#endif`,By=`#ifdef USE_TRANSMISSION
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
#endif`,ky=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Hy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wy=`uniform sampler2D t2D;
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
}`,Xy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qy=`uniform float backgroundBlurriness;
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
}`,$y=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zy=`#include <common>
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
}`,Jy=`#if DEPTH_PACKING == 3200
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
}`,Ky=`#define DISTANCE
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
}`,jy=`#define DISTANCE
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
}`,Qy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eM=`uniform float scale;
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
}`,nM=`uniform vec3 diffuse;
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
}`,iM=`#include <common>
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
}`,sM=`uniform vec3 diffuse;
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
}`,rM=`#define LAMBERT
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
}`,aM=`#define LAMBERT
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
}`,oM=`#define MATCAP
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
}`,lM=`#define MATCAP
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
}`,cM=`#define NORMAL
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
}`,hM=`#define NORMAL
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
}`,uM=`#define PHONG
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
}`,fM=`#define PHONG
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
}`,dM=`#define STANDARD
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
}`,pM=`#define STANDARD
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
}`,mM=`#define TOON
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
}`,gM=`#define TOON
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
}`,_M=`uniform float size;
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
}`,xM=`uniform vec3 diffuse;
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
}`,vM=`#include <common>
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
}`,yM=`uniform vec3 color;
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
}`,MM=`uniform float rotation;
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
}`,SM=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:Wx,alphahash_pars_fragment:Xx,alphamap_fragment:qx,alphamap_pars_fragment:$x,alphatest_fragment:Yx,alphatest_pars_fragment:Zx,aomap_fragment:Jx,aomap_pars_fragment:Kx,batching_pars_vertex:jx,batching_vertex:Qx,begin_vertex:tv,beginnormal_vertex:ev,bsdfs:nv,iridescence_fragment:iv,bumpmap_pars_fragment:sv,clipping_planes_fragment:rv,clipping_planes_pars_fragment:av,clipping_planes_pars_vertex:ov,clipping_planes_vertex:lv,color_fragment:cv,color_pars_fragment:hv,color_pars_vertex:uv,color_vertex:fv,common:dv,defaultnormal_vertex:pv,displacementmap_pars_vertex:mv,displacementmap_vertex:gv,emissivemap_fragment:_v,emissivemap_pars_fragment:xv,colorspace_fragment:vv,colorspace_pars_fragment:yv,envmap_fragment:Mv,envmap_common_pars_fragment:Sv,envmap_pars_fragment:bv,envmap_pars_vertex:wv,envmap_physical_pars_fragment:Uv,envmap_vertex:Av,fog_vertex:Tv,fog_pars_vertex:Ev,fog_fragment:Cv,fog_pars_fragment:Rv,gradientmap_pars_fragment:Pv,lightmap_pars_fragment:Iv,lights_lambert_fragment:Lv,lights_lambert_pars_fragment:Dv,lights_pars_begin:Nv,lights_toon_fragment:Ov,lights_toon_pars_fragment:Fv,lights_phong_fragment:Bv,lights_phong_pars_fragment:kv,lights_physical_fragment:zv,lights_physical_pars_fragment:Vv,lights_fragment_begin:Gv,lights_fragment_maps:Hv,lights_fragment_end:Wv,lightprobes_pars_fragment:Xv,logdepthbuf_fragment:qv,logdepthbuf_pars_fragment:$v,logdepthbuf_pars_vertex:Yv,logdepthbuf_vertex:Zv,map_fragment:Jv,map_pars_fragment:Kv,map_particle_fragment:jv,map_particle_pars_fragment:Qv,metalnessmap_fragment:ty,metalnessmap_pars_fragment:ey,morphinstance_vertex:ny,morphcolor_vertex:iy,morphnormal_vertex:sy,morphtarget_pars_vertex:ry,morphtarget_vertex:ay,normal_fragment_begin:oy,normal_fragment_maps:ly,normal_pars_fragment:cy,normal_pars_vertex:hy,normal_vertex:uy,normalmap_pars_fragment:fy,clearcoat_normal_fragment_begin:dy,clearcoat_normal_fragment_maps:py,clearcoat_pars_fragment:my,iridescence_pars_fragment:gy,opaque_fragment:_y,packing:xy,premultiplied_alpha_fragment:vy,project_vertex:yy,dithering_fragment:My,dithering_pars_fragment:Sy,roughnessmap_fragment:by,roughnessmap_pars_fragment:wy,shadowmap_pars_fragment:Ay,shadowmap_pars_vertex:Ty,shadowmap_vertex:Ey,shadowmask_pars_fragment:Cy,skinbase_vertex:Ry,skinning_pars_vertex:Py,skinning_vertex:Iy,skinnormal_vertex:Ly,specularmap_fragment:Dy,specularmap_pars_fragment:Ny,tonemapping_fragment:Uy,tonemapping_pars_fragment:Oy,transmission_fragment:Fy,transmission_pars_fragment:By,uv_pars_fragment:ky,uv_pars_vertex:zy,uv_vertex:Vy,worldpos_vertex:Gy,background_vert:Hy,background_frag:Wy,backgroundCube_vert:Xy,backgroundCube_frag:qy,cube_vert:$y,cube_frag:Yy,depth_vert:Zy,depth_frag:Jy,distance_vert:Ky,distance_frag:jy,equirect_vert:Qy,equirect_frag:tM,linedashed_vert:eM,linedashed_frag:nM,meshbasic_vert:iM,meshbasic_frag:sM,meshlambert_vert:rM,meshlambert_frag:aM,meshmatcap_vert:oM,meshmatcap_frag:lM,meshnormal_vert:cM,meshnormal_frag:hM,meshphong_vert:uM,meshphong_frag:fM,meshphysical_vert:dM,meshphysical_frag:pM,meshtoon_vert:mM,meshtoon_frag:gM,points_vert:_M,points_frag:xM,shadow_vert:vM,shadow_frag:yM,sprite_vert:MM,sprite_frag:SM},Dt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},vi={basic:{uniforms:ln([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:ln([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:ln([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:ln([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:ln([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:ln([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:ln([Dt.points,Dt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:ln([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:ln([Dt.common,Dt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:ln([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:ln([Dt.sprite,Dt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:ln([Dt.common,Dt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:ln([Dt.lights,Dt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};vi.physical={uniforms:ln([vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new jt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var Bc={r:0,b:0,g:0},bM=new Me,jm=new jt;jm.set(-1,0,0,0,1,0,0,0,1);function wM(s,t,e,n,i,r){let a=new te(0),o=i===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){let M=y.backgroundBlurriness>0;w=t.get(w,M)}return w}function m(y){let w=!1,M=f(y);M===null?p(a,o):M&&M.isColor&&(p(M,1),w=!0);let b=s.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(y,w){let M=f(w);M&&M.isCubeTexture?(c===void 0&&(c=new Ln(new Ir(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:$s(vi.backgroundCube.uniforms),vertexShader:vi.backgroundCube.vertexShader,fragmentShader:vi.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(bM.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(jm),c.material.toneMapped=ce.getTransfer(M.colorSpace)!==ge,(h!==M||d!==M.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ln(new Vs(2,2),new Gn({name:"BackgroundMaterial",uniforms:$s(vi.background.uniforms),vertexShader:vi.background.vertexShader,fragmentShader:vi.background.fragmentShader,side:ms,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ce.getTransfer(M.colorSpace)!==ge,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,w){y.getRGB(Bc,rf(s)),e.buffers.color.setClear(Bc.r,Bc.g,Bc.b,w,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,p(a,o)},render:m,addToRenderList:_,dispose:g}}function AM(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,a=!1;function o(L,G,O,P,F){let z=!1,N=d(L,P,O,G);r!==N&&(r=N,c(r.object)),z=f(L,P,O,F),z&&m(L,P,O,F),F!==null&&t.update(F,s.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,M(L,G,O,P),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function d(L,G,O,P){let F=P.wireframe===!0,z=n[G.id];z===void 0&&(z={},n[G.id]=z);let N=L.isInstancedMesh===!0?L.id:0,Y=z[N];Y===void 0&&(Y={},z[N]=Y);let W=Y[O.id];W===void 0&&(W={},Y[O.id]=W);let K=W[F];return K===void 0&&(K=u(l()),W[F]=K),K}function u(L){let G=[],O=[],P=[];for(let F=0;F<e;F++)G[F]=0,O[F]=0,P[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:O,attributeDivisors:P,object:L,attributes:{},index:null}}function f(L,G,O,P){let F=r.attributes,z=G.attributes,N=0,Y=O.getAttributes();for(let W in Y)if(Y[W].location>=0){let Z=F[W],dt=z[W];if(dt===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(dt=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(dt=L.instanceColor)),Z===void 0||Z.attribute!==dt||dt&&Z.data!==dt.data)return!0;N++}return r.attributesNum!==N||r.index!==P}function m(L,G,O,P){let F={},z=G.attributes,N=0,Y=O.getAttributes();for(let W in Y)if(Y[W].location>=0){let Z=z[W];Z===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(Z=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(Z=L.instanceColor));let dt={};dt.attribute=Z,Z&&Z.data&&(dt.data=Z.data),F[W]=dt,N++}r.attributes=F,r.attributesNum=N,r.index=P}function _(){let L=r.newAttributes;for(let G=0,O=L.length;G<O;G++)L[G]=0}function p(L){g(L,0)}function g(L,G){let O=r.newAttributes,P=r.enabledAttributes,F=r.attributeDivisors;O[L]=1,P[L]===0&&(s.enableVertexAttribArray(L),P[L]=1),F[L]!==G&&(s.vertexAttribDivisor(L,G),F[L]=G)}function y(){let L=r.newAttributes,G=r.enabledAttributes;for(let O=0,P=G.length;O<P;O++)G[O]!==L[O]&&(s.disableVertexAttribArray(O),G[O]=0)}function w(L,G,O,P,F,z,N){N===!0?s.vertexAttribIPointer(L,G,O,F,z):s.vertexAttribPointer(L,G,O,P,F,z)}function M(L,G,O,P){_();let F=P.attributes,z=O.getAttributes(),N=G.defaultAttributeValues;for(let Y in z){let W=z[Y];if(W.location>=0){let K=F[Y];if(K===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(K=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(K=L.instanceColor)),K!==void 0){let Z=K.normalized,dt=K.itemSize,Ot=t.get(K);if(Ot===void 0)continue;let J=Ot.buffer,ft=Ot.type,At=Ot.bytesPerElement,Ut=ft===s.INT||ft===s.UNSIGNED_INT||K.gpuType===ec;if(K.isInterleavedBufferAttribute){let _t=K.data,Bt=_t.isInterleavedBuffer===!0?_t.stride:_t.itemSize,ee=K.offset;if(_t.isInstancedInterleavedBuffer||_t.isInstancedBufferAttribute){for(let zt=0;zt<W.locationSize;zt++)g(W.location+zt,_t.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let zt=0;zt<W.locationSize;zt++)p(W.location+zt);s.bindBuffer(s.ARRAY_BUFFER,J);for(let zt=0;zt<W.locationSize;zt++)w(W.location+zt,dt/W.locationSize,ft,Z,Bt*At,(ee+dt/W.locationSize*zt)*At,Ut)}else{if(K.isInstancedBufferAttribute){for(let _t=0;_t<W.locationSize;_t++)g(W.location+_t,K.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let _t=0;_t<W.locationSize;_t++)p(W.location+_t);s.bindBuffer(s.ARRAY_BUFFER,J);for(let _t=0;_t<W.locationSize;_t++)w(W.location+_t,dt/W.locationSize,ft,Z,dt*At,dt/W.locationSize*_t*At,Ut)}}else if(N!==void 0){let Z=N[Y];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(W.location,Z);break;case 3:s.vertexAttrib3fv(W.location,Z);break;case 4:s.vertexAttrib4fv(W.location,Z);break;default:s.vertexAttrib1fv(W.location,Z)}}}}y()}function b(){C();for(let L in n){let G=n[L];for(let O in G){let P=G[O];for(let F in P){let z=P[F];for(let N in z)h(z[N].object),delete z[N];delete P[F]}}delete n[L]}}function T(L){if(n[L.id]===void 0)return;let G=n[L.id];for(let O in G){let P=G[O];for(let F in P){let z=P[F];for(let N in z)h(z[N].object),delete z[N];delete P[F]}}delete n[L.id]}function x(L){for(let G in n){let O=n[G];for(let P in O){let F=O[P];if(F[L.id]===void 0)continue;let z=F[L.id];for(let N in z)h(z[N].object),delete z[N];delete F[L.id]}}}function S(L){for(let G in n){let O=n[G],P=L.isInstancedMesh===!0?L.id:0,F=O[P];if(F!==void 0){for(let z in F){let N=F[z];for(let Y in N)h(N[Y].object),delete N[Y];delete F[z]}delete O[P],Object.keys(O).length===0&&delete n[G]}}}function C(){R(),a=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:C,resetDefaultState:R,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function TM(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function EM(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(x){return!(x!==Qn&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let S=x===jn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==wn&&x!==Kn&&!S&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Yt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Yt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Yt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:M,maxSamples:b,samples:T}}function CM(s){let t=this,e=null,n=0,i=!1,r=!1,a=new Yn,o=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,g=s.get(d);if(!i||m===null||m.length===0||r&&!p)r?h(null):c();else{let y=r?0:n,w=y*4,M=g.clippingState||null;l.value=M,M=h(m,u,w,f);for(let b=0;b!==w;++b)M[b]=e[b];g.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=f+_*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<g)&&(p=new Float32Array(g));for(let w=0,M=f;w!==_;++w,M+=4)a.copy(d[w]).applyMatrix4(y,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var so=class extends In{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Pa(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ir(5,5,5),r=new Gn({name:"CubemapFromEquirect",uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:Hs});r.uniforms.tEquirect.value=e;let a=new Ln(i,r),o=e.minFilter;return e.minFilter===Vi&&(e.minFilter=mn),new Br(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Pm=256,RM=3,PM=20,Qm=256,tg=16,IM=3,LM=new V,DM=new te,zc=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Br(1,10,null),this._boxMesh=new Ln(new Ir(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:a=256,position:o=LM}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,u=l.autoClearColor,f=l.autoClearDepth,m=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(DM));let p=new Br(n,i,h);return p.position.copy(o),p.update(l,t),l.autoClear=d,l.autoClearColor=u,l.autoClearDepth=f,l.autoClearStencil=m,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Pm,Mm(t))}_fromTexture(t,e){t.mapping===Xs||t.mapping===Vr?this._setSize(t.image.length===0?Pm:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Im(t,!1,!1),n=Math.log2(t)-RM;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Im(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Xs||t.mapping===Vr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dm()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Lm()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=NM(),this._integrationMaterial=UM());let e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/tg);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-IM)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(Qm*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=OM());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}};function Im(s,t,e){return new so(s,{minFilter:Vi,generateMipmaps:t,type:jn,colorSpace:Ma,depthBuffer:e})}function ro(s,t,e){return new Gn({name:s,uniforms:t,vertexShader:se.cube_vert,fragmentShader:e,side:gn,blending:Hs,depthTest:!1,depthWrite:!1})}function NM(){return ro("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Qm}u

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
	`)}function UM(){return ro("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:tg}},`

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
	`)}function OM(){return ro("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${PM}
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
	`)}function Lm(){return ro("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Dm(){return ro("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function FM(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===jl||f===Ql)if(t.has(u)){let m=t.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let _=new so(m.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let f=u.mapping,m=f===jl||f===Ql,_=f===Xs||f===Vr;if(m||_){let p=e.get(u),g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new zc(s)),p=m?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{let y=u.image;return m&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new zc(s)),p=m?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===jl?u.mapping=Xs:f===Ql&&(u.mapping=Vr),u}function l(u){let f=0,m=6;for(let _=0;_<m;_++)u[_]!==void 0&&f++;return f===m}function c(u){let f=u.target;f.removeEventListener("dispose",c);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function BM(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&_a("WebGLRenderer: "+n+" extension not supported."),i}}}function kM(s,t,e,n){let i={},r=new WeakMap,a=new FinalizationRegistry(m=>delete i[m]);function o(m){l(m.target)}function l(m){m.index!==null&&t.remove(m.index);for(let p in m.attributes)t.remove(m.attributes[p]);m.removeEventListener("dispose",o),delete i[m.id],a.unregister(m);let _=r.get(m);_&&(t.remove(_),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(m,_){return i[_.id]!==void 0||(_.addEventListener("dispose",o),i[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(m){let _=m.attributes;for(let p in _)t.update(_[p],s.ARRAY_BUFFER)}function d(m){let _=m.index,p=m.attributes.position,g=0;if(p===void 0)return;let y=_!==null?_.array.length:p.array.length/3-1,w=p.count>=65535?Ca:Ea,M=new w(Math.ceil(y/3)*6,1),b=M.array;if(_!==null){let x=_.array;g=_.version;for(let S=0,C=0;S<y;S+=3){let R=x[S+0],L=x[S+1],G=x[S+2];b[C++]=R,b[C++]=L,b[C++]=L,b[C++]=G,b[C++]=G,b[C++]=R}}else{g=p.version;for(let x=0,S=0;x<y;x+=3){let C=x+0,R=x+1,L=x+2;b[S++]=C,b[S++]=R,b[S++]=R,b[S++]=L,b[S++]=L,b[S++]=C}}M.version=g;let T=r.get(m);T&&t.remove(T),r.set(m,M)}function u(m){let _=r.get(m);if(_){let p=m.index;p!==null&&_.version<p.version&&d(m)}else d(m);return r.get(m)}function f(){for(let m in i){let _=i[m].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:u,dispose:f}}function zM(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){s.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let _=0;for(let p=0;p<f;p++)_+=u[p];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function VM(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Jt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function GM(s,t,e){let n=new WeakMap,i=new Te;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let C=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",C)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],w=0;f===!0&&(w=1),m===!0&&(w=2),_===!0&&(w=3);let M=o.attributes.position.count*w,b=1;M>t.maxTextureSize&&(b=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let T=new Float32Array(M*b*4*d),x=new wa(T,M,b,d);x.type=Kn,x.needsUpdate=!0;let S=w*4;for(let R=0;R<d;R++){let L=p[R],G=g[R],O=y[R],P=M*b*4*R;for(let F=0;F<L.count;F++){let z=F*S;f===!0&&(i.fromBufferAttribute(L,F),T[P+z+0]=i.x,T[P+z+1]=i.y,T[P+z+2]=i.z,T[P+z+3]=0),m===!0&&(i.fromBufferAttribute(G,F),T[P+z+4]=i.x,T[P+z+5]=i.y,T[P+z+6]=i.z,T[P+z+7]=0),_===!0&&(i.fromBufferAttribute(O,F),T[P+z+8]=i.x,T[P+z+9]=i.y,T[P+z+10]=i.z,T[P+z+11]=O.itemSize===4?i.w:1)}}u={count:d,texture:x,size:new Pt(M,b)},n.set(o,u),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function HM(s,t,e,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var WM={[Fu]:"LINEAR_TONE_MAPPING",[Bu]:"REINHARD_TONE_MAPPING",[ku]:"CINEON_TONE_MAPPING",[zu]:"ACES_FILMIC_TONE_MAPPING",[Gu]:"AGX_TONE_MAPPING",[Ya]:"NEUTRAL_TONE_MAPPING",[Vu]:"CUSTOM_TONE_MAPPING"};function XM(s,t,e,n,i,r){let a=new In(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new bn;h.setAttribute("position",new De([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new De([0,2,0,0,2,0],2));let d=new Ol({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Ln(h,d),f=new Xa(-1,1,1,-1,0,1),m=null,_=null,p=!1,g,y=null,w=[],M=!1;this.setSize=function(b,T){a.setSize(b,T),o!==null&&o.setSize(b,T),l!==null&&l.setSize(b,T);for(let x=0;x<w.length;x++){let S=w[x];S.setSize&&S.setSize(b,T)}},this.setEffects=function(b){w=b,M=w.length>0&&w[0].isRenderPass===!0;let T=a.width,x=a.height;w.length>0&&o===null&&(o=new In(T,x,{type:jn,depthBuffer:!1,stencilBuffer:!1}),l=new In(T,x,{type:jn,depthBuffer:!1,stencilBuffer:!1}));let S=i===!0&&w.some(C=>C.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new zi(T,x),r===!0&&(c.format=Gi,c.type=qs)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let C=0;C<w.length;C++){let R=w[C];R.setSize&&R.setSize(T,x),S&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(b,T){if(p||b.toneMapping===_i&&w.length===0)return!1;if(y=T,T!==null){let x=T.width,S=T.height;(a.width!==x||a.height!==S)&&this.setSize(x,S)}return M===!1&&b.setRenderTarget(a),g=b.toneMapping,b.toneMapping=_i,!0},this.hasRenderPass=function(){return M},this.end=function(b,T){b.toneMapping=g,p=!0;let x=a,S=o;for(let C=0;C<w.length;C++){let R=w[C];R.enabled!==!1&&(R.render(b,S,x,T),R.needsSwap!==!1&&(x=S,S=S===o?l:o))}if(m!==b.outputColorSpace||_!==b.toneMapping){m=b.outputColorSpace,_=b.toneMapping,d.defines={},ce.getTransfer(m)===ge&&(d.defines.SRGB_TRANSFER="");let C=WM[_];C&&(d.defines[C]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=x.texture,b.setRenderTarget(y),b.render(u,f),y=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}var eg=new Sn,ng=new zi(1,1),ig=new Ia(1),sg=new wa,rg=new Sl,ag=new Pa,Nm=[],Um=[],Om=new Float32Array(16),Fm=new Float32Array(9),Bm=new Float32Array(4);function Xr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Nm[i];if(r===void 0&&(r=new Float32Array(i),Nm[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function He(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function We(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Gc(s,t){let e=Um[t];e===void 0&&(e=new Int32Array(t),Um[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function qM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function $M(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2fv(this.addr,t),We(e,t)}}function YM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;s.uniform3fv(this.addr,t),We(e,t)}}function ZM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4fv(this.addr,t),We(e,t)}}function JM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Bm.set(n),s.uniformMatrix2fv(this.addr,!1,Bm),We(e,n)}}function KM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Fm.set(n),s.uniformMatrix3fv(this.addr,!1,Fm),We(e,n)}}function jM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Om.set(n),s.uniformMatrix4fv(this.addr,!1,Om),We(e,n)}}function QM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function tS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2iv(this.addr,t),We(e,t)}}function eS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3iv(this.addr,t),We(e,t)}}function nS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4iv(this.addr,t),We(e,t)}}function iS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function sS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2uiv(this.addr,t),We(e,t)}}function rS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3uiv(this.addr,t),We(e,t)}}function aS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4uiv(this.addr,t),We(e,t)}}function Hc(s){return s.version===0&&(s.compareFunction=Qu,s.needsUpdate=!0),s}function oS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Hc(ng):r=eg,e.setTexture2D(t||r,i)}function lS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||rg,i)}function cS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Hc(ig):r=ag,e.setTextureCube(t||r,i)}function hS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||sg,i)}function uS(s){switch(s){case 5126:return qM;case 35664:return $M;case 35665:return YM;case 35666:return ZM;case 35674:return JM;case 35675:return KM;case 35676:return jM;case 5124:case 35670:return QM;case 35667:case 35671:return tS;case 35668:case 35672:return eS;case 35669:case 35673:return nS;case 5125:return iS;case 36294:return sS;case 36295:return rS;case 36296:return aS;case 35678:case 36198:case 36298:case 36306:case 35682:return oS;case 35679:case 36299:case 36307:return lS;case 35680:case 36300:case 36308:case 36293:return cS;case 36289:case 36303:case 36311:case 36292:return hS}}function fS(s,t){s.uniform1fv(this.addr,t)}function dS(s,t){let e=Xr(t,this.size,2);s.uniform2fv(this.addr,e)}function pS(s,t){let e=Xr(t,this.size,3);s.uniform3fv(this.addr,e)}function mS(s,t){let e=Xr(t,this.size,4);s.uniform4fv(this.addr,e)}function gS(s,t){let e=Xr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function _S(s,t){let e=Xr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function xS(s,t){let e=Xr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function vS(s,t){s.uniform1iv(this.addr,t)}function yS(s,t){s.uniform2iv(this.addr,t)}function MS(s,t){s.uniform3iv(this.addr,t)}function SS(s,t){s.uniform4iv(this.addr,t)}function bS(s,t){s.uniform1uiv(this.addr,t)}function wS(s,t){s.uniform2uiv(this.addr,t)}function AS(s,t){s.uniform3uiv(this.addr,t)}function TS(s,t){s.uniform4uiv(this.addr,t)}function ES(s,t,e){let n=this.cache,i=t.length,r=Gc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Hc(ng):a=eg;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function CS(s,t,e){let n=this.cache,i=t.length,r=Gc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||rg,r[a])}function RS(s,t,e){let n=this.cache,i=t.length,r=Gc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=Hc(ig):a=ag;for(let o=0;o!==i;++o)e.setTextureCube(t[o]||a,r[o])}function PS(s,t,e){let n=this.cache,i=t.length,r=Gc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||sg,r[a])}function IS(s){switch(s){case 5126:return fS;case 35664:return dS;case 35665:return pS;case 35666:return mS;case 35674:return gS;case 35675:return _S;case 35676:return xS;case 5124:case 35670:return vS;case 35667:case 35671:return yS;case 35668:case 35672:return MS;case 35669:case 35673:return SS;case 5125:return bS;case 36294:return wS;case 36295:return AS;case 36296:return TS;case 35678:case 36198:case 36298:case 36306:case 35682:return ES;case 35679:case 36299:case 36307:return CS;case 35680:case 36300:case 36308:case 36293:return RS;case 36289:case 36303:case 36311:case 36292:return PS}}var gf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=uS(e.type)}},_f=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=IS(e.type)}},xf=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},pf=/(\w+)(\])?(\[|\.)?/g;function km(s,t){s.seq.push(t),s.map[t.id]=t}function LS(s,t,e){let n=s.name,i=n.length;for(pf.lastIndex=0;;){let r=pf.exec(n),a=pf.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){km(e,c===void 0?new gf(o,s,t):new _f(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new xf(o),km(e,d)),e=d}}}var Wr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);LS(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function zm(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var DS=37297,NS=0;function US(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Vm=new jt;function OS(s){ce._getMatrix(Vm,ce.workingColorSpace,s);let t=`mat3( ${Vm.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(s)){case Sa:return[t,"LinearTransferOETF"];case ge:return[t,"sRGBTransferOETF"];default:return Yt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Gm(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+US(s.getShaderSource(t),o)}else return r}function FS(s,t){let e=OS(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var BS={[Fu]:"Linear",[Bu]:"Reinhard",[ku]:"Cineon",[zu]:"ACESFilmic",[Gu]:"AgX",[Ya]:"Neutral",[Vu]:"Custom"};function kS(s,t){let e=BS[t];return e===void 0?(Yt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var kc=new V;function zS(){ce.getLuminanceCoefficients(kc);let s=kc.x.toFixed(4),t=kc.y.toFixed(4),e=kc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function VS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(io).join(`
`)}function GS(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function HS(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function io(s){return s!==""}function Hm(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Wm(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var WS=/^[ \t]*#include +<([\w\d./]+)>/gm;function vf(s){return s.replace(WS,XS)}function XS(s,t){let e=se[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return vf(e)}var qS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xm(s){return s.replace(qS,$S)}function $S(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function qm(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var YS={[Gs]:"SHADOWMAP_TYPE_PCF",[kr]:"SHADOWMAP_TYPE_VSM"};function ZS(s){return YS[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var JS={[Vr]:"ENVMAP_MODE_REFRACTION"};function KS(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":JS[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var jS={[Ou]:"ENVMAP_BLENDING_MULTIPLY",[rm]:"ENVMAP_BLENDING_MIX",[am]:"ENVMAP_BLENDING_ADD"};function QS(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":jS[s.combine]||"ENVMAP_BLENDING_NONE"}function tb(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=ZS(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=KS(e),d=QS(e),u=VS(e),f=GS(r),m=i.createProgram(),_,p,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(io).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(io).join(`
`),p.length>0&&(p+=`
`)):(_=[qm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(io).join(`
`),p=[qm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_i?"#define TONE_MAPPING":"",e.toneMapping!==_i?se.tonemapping_pars_fragment:"",e.toneMapping!==_i?kS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,FS("linearToOutputTexel",e.outputColorSpace),zS(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(io).join(`
`)),a=vf(a),a=Hm(a,e),a=Wm(a,e),o=vf(o),o=Hm(o,e),o=Wm(o,e),a=Xm(a),o=Xm(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",e.glslVersion===tf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=g+_+a,w=g+p+o,M=zm(i,i.VERTEX_SHADER,y),b=zm(i,i.FRAGMENT_SHADER,w);i.attachShader(m,M),i.attachShader(m,b),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function T(R){if(s.debug.checkShaderErrors){let L=i.getProgramInfoLog(m)||"",G=i.getShaderInfoLog(M)||"",O=i.getShaderInfoLog(b)||"",P=L.trim(),F=G.trim(),z=O.trim(),N=!0,Y=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(N=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,M,b);else{let W=Gm(i,M,"vertex"),K=Gm(i,b,"fragment");Jt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+P+`
`+W+`
`+K)}else P!==""?Yt("WebGLProgram: Program Info Log:",P):(F===""||z==="")&&(Y=!1);Y&&(R.diagnostics={runnable:N,programLog:P,vertexShader:{log:F,prefix:_},fragmentShader:{log:z,prefix:p}})}i.deleteShader(M),i.deleteShader(b),x=new Wr(i,m),S=HS(i,m)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(m,DS)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=NS++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=M,this.fragmentShader=b,this}var eb=0,yf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Mf(t),e.set(t,n)),n}},Mf=class{constructor(t){this.id=eb++,this.code=t,this.usedTimes=0}};function nb(s){return s===gs||s===to||s===eo}function ib(s,t,e,n,i,r){let a=new Aa,o=new yf,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,S,C,R,L,G){let O=R.fog,P=L.geometry,F=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,N=t.get(x.envMap||F,z),Y=u[x.type],W=n.precision;x.precision!==null&&(W=n.getMaxPrecision(x.precision),W!==x.precision&&Yt("WebGLProgram.getParameters:",x.precision,"not supported, using",W,"instead."));let K=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,Z=K!==void 0?K.length:0,dt=0;P.morphAttributes.position!==void 0&&(dt=1),P.morphAttributes.normal!==void 0&&(dt=2),P.morphAttributes.color!==void 0&&(dt=3);let Ot,J,ft,At;if(Y){let Lt=vi[Y];Ot=Lt.vertexShader,J=Lt.fragmentShader}else{Ot=x.vertexShader,J=x.fragmentShader;let Lt=o.getVertexShaderStage(x),_e=o.getFragmentShaderStage(x);o.update(x,Lt,_e),ft=Lt.id,At=_e.id}let Ut=s.getRenderTarget(),_t=s.state.buffers.depth.getReversed(),Bt=L.isInstancedMesh===!0,ee=L.isBatchedMesh===!0,zt=!!x.map,Zt=!!x.matcap,Kt=!!N,at=Kt&&N.isPMREMTexture===!0,H=!!x.aoMap,it=!!x.lightMap,ct=!!x.bumpMap&&x.wireframe===!1,B=!!x.normalMap,ot=!!x.displacementMap,ut=!!x.emissiveMap,Tt=!!x.metalnessMap,It=!!x.roughnessMap,Xt=x.anisotropy>0,D=x.clearcoat>0,de=x.diffuseRoughness>0,et=x.dispersion>0,vt=x.retroreflectivity>0,nt=x.iridescence>0,Et=x.sheen>0,mt=x.transmission>0,yt=Xt&&!!x.anisotropyMap,E=D&&!!x.clearcoatMap,v=D&&!!x.clearcoatNormalMap,k=D&&!!x.clearcoatRoughnessMap,lt=de&&!!x.diffuseRoughnessMap,st=nt&&!!x.iridescenceMap,gt=nt&&!!x.iridescenceThicknessMap,xt=Et&&!!x.sheenColorMap,q=Et&&!!x.sheenRoughnessMap,Q=!!x.specularMap,pt=!!x.specularColorMap,I=!!x.specularIntensityMap,rt=mt&&!!x.transmissionMap,tt=mt&&!!x.thicknessMap,bt=!!x.gradientMap,St=!!x.alphaMap,wt=x.alphaTest>0,Ht=!!x.alphaHash,ie=!!x.extensions,Mt=_i;x.toneMapped&&(Ut===null||Ut.isXRRenderTarget===!0)&&(Mt=s.toneMapping);let $t=at?N.isCompressedCubeTexture?N.image[0].mipmaps:N.mipmaps:null,ne={shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:Ot,fragmentShader:J,defines:x.defines,customVertexShaderID:ft,customFragmentShaderID:At,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:W,batching:ee,batchingColor:ee&&L._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&L.instanceColor!==null,instancingMorph:Bt&&L.morphTexture!==null,outputColorSpace:Ut===null?s.outputColorSpace:Ut.isXRRenderTarget===!0?Ut.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:zt,matcap:Zt,envMap:Kt,envMapMode:Kt&&N.mapping,envMapPMREM:at,envMapMaxLod:at?$t.length-1:null,envMapSize:at?$t[0].width:null,aoMap:H,lightMap:it,bumpMap:ct,normalMap:B,displacementMap:ot,emissiveMap:ut,normalMapObjectSpace:B&&x.normalMapType===cm,normalMapTangentSpace:B&&x.normalMapType===Fc,packedNormalMap:B&&x.normalMapType===Fc&&nb(x.normalMap.format),metalnessMap:Tt,roughnessMap:It,anisotropy:Xt,anisotropyMap:yt,clearcoat:D,clearcoatMap:E,clearcoatNormalMap:v,clearcoatRoughnessMap:k,diffuseRoughness:de,diffuseRoughnessMap:lt,dispersion:et,retroreflection:vt,iridescence:nt,iridescenceMap:st,iridescenceThicknessMap:gt,sheen:Et,sheenColorMap:xt,sheenRoughnessMap:q,specularMap:Q,specularColorMap:pt,specularIntensityMap:I,transmission:mt,transmissionMap:rt,thicknessMap:tt,gradientMap:bt,opaque:x.transparent===!1&&x.blending===zr&&x.alphaToCoverage===!1,alphaMap:St,alphaTest:wt,alphaHash:Ht,combine:x.combine,mapUv:zt&&f(x.map.channel),aoMapUv:H&&f(x.aoMap.channel),lightMapUv:it&&f(x.lightMap.channel),bumpMapUv:ct&&f(x.bumpMap.channel),normalMapUv:B&&f(x.normalMap.channel),displacementMapUv:ot&&f(x.displacementMap.channel),emissiveMapUv:ut&&f(x.emissiveMap.channel),metalnessMapUv:Tt&&f(x.metalnessMap.channel),roughnessMapUv:It&&f(x.roughnessMap.channel),anisotropyMapUv:yt&&f(x.anisotropyMap.channel),clearcoatMapUv:E&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:v&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:lt&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:st&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:q&&f(x.sheenRoughnessMap.channel),specularMapUv:Q&&f(x.specularMap.channel),specularColorMapUv:pt&&f(x.specularColorMap.channel),specularIntensityMapUv:I&&f(x.specularIntensityMap.channel),transmissionMapUv:rt&&f(x.transmissionMap.channel),thicknessMapUv:tt&&f(x.thicknessMap.channel),alphaMapUv:St&&f(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(B||Xt),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!P.attributes.uv&&(zt||St),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&B===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:_t,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:dt,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:G.filter(Lt=>Lt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:Mt,decodeVideoTexture:zt&&x.map.isVideoTexture===!0&&ce.getTransfer(x.map.colorSpace)===ge,decodeVideoTextureEmissive:ut&&x.emissiveMap.isVideoTexture===!0&&ce.getTransfer(x.emissiveMap.colorSpace)===ge,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===gi,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ie&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&x.extensions.multiDraw===!0||ee)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ne.vertexUv1s=l.has(1),ne.vertexUv2s=l.has(2),ne.vertexUv3s=l.has(3),l.clear(),ne}function _(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)S.push(C),S.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(p(S,x),g(S,x),S.push(s.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function p(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapPMREM),x.push(S.envMapMaxLod),x.push(S.envMapSize),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.diffuseRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.numLightProbeGrids),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function g(x,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function y(x){let S=u[x.type],C;if(S){let R=vi[S];C=Em.clone(R.uniforms)}else C=x.uniforms;return C}function w(x,S){let C=h.get(S);return C!==void 0?++C.usedTimes:(C=new tb(s,S,x,i),c.push(C),h.set(S,C)),C}function M(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function T(){o.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:y,acquireProgram:w,releaseProgram:M,releaseShaderCache:b,programs:c,dispose:T}}function sb(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function rb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function $m(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ym(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,_,p,g){let y=s[t];return y===void 0?(y={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:p,group:g},s[t]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=m,y.materialVariant=a(u),y.groupOrder=_,y.renderOrder=u.renderOrder,y.z=p,y.group=g),t++,y}function l(u,f,m,_,p,g,y){y.reversedDepth===!0&&(p=-p);let w=o(u,f,m,_,p,g);m.transmission>0?n.push(w):m.transparent===!0?i.push(w):e.push(w)}function c(u,f,m,_,p,g){let y=o(u,f,m,_,p,g);m.transmission>0?n.unshift(y):m.transparent===!0?i.unshift(y):e.unshift(y)}function h(u,f){e.length>1&&e.sort(u||rb),n.length>1&&n.sort(f||$m),i.length>1&&i.sort(f||$m)}function d(){for(let u=t,f=s.length;u<f;u++){let m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function ab(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new Ym,s.set(n,[a])):i>=r.length?(a=new Ym,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function ob(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new V,color:new te};break;case"SpotLight":e={position:new V,direction:new V,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new V,halfWidth:new V,halfHeight:new V};break}return s[t.id]=e,e}}}function lb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var cb=0;function hb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function ub(s){let t=new ob,e=lb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new V);let i=new V,r=new Me,a=new Me;function o(c){let h=0,d=0,u=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let f=0,m=0,_=0,p=0,g=0,y=0,w=0,M=0,b=0,T=0,x=0,S=0,C=0,R=0;c.sort(hb);for(let G=0,O=c.length;G<O;G++){let P=c[G],F=P.color,z=P.intensity,N=P.distance,Y=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===gs?Y=P.shadow.map.texture:Y=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=F.r*z,d+=F.g*z,u+=F.b*z;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],z);R++}else if(P.isSunLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let K=P.shadow,Z=e.get(P);Z.shadowIntensity=K.intensity,Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[m]=Z,n.sunShadowMap[m]=Y;let dt=K.getViewportCount();for(let Ot=0;Ot<dt;Ot++)n.sunShadowMatrix[_+Ot]=K.getMatrix(Ot),n.sunShadowCascade[_+Ot]=K._cascadeData[Ot];_+=dt,m++}n.sun[f]=W,f++}else if(P.isDirectionalLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let K=P.shadow,Z=e.get(P);Z.shadowIntensity=K.intensity,Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,n.directionalShadow[p]=Z,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=P.shadow.matrix,b++}n.directional[p]=W,p++}else if(P.isSpotLight){let W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(F).multiplyScalar(z),W.distance=N,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[y]=W;let K=P.shadow;if(P.map&&(n.spotLightMap[S]=P.map,S++,K.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[y]=K.matrix,P.castShadow){let Z=e.get(P);Z.shadowIntensity=K.intensity,Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,n.spotShadow[y]=Z,n.spotShadowMap[y]=Y,x++}y++}else if(P.isRectAreaLight){let W=t.get(P);W.color.copy(F).multiplyScalar(z),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[w]=W,w++}else if(P.isPointLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){let K=P.shadow,Z=e.get(P);Z.shadowIntensity=K.intensity,Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,Z.shadowCameraNear=K.camera.near,Z.shadowCameraFar=K.camera.far,n.pointShadow[g]=Z,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=P.shadow.matrix,T++}n.point[g]=W,g++}else if(P.isHemisphereLight){let W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(z),W.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[M]=W,M++}}w>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let L=n.hash;(L.sunLength!==f||L.directionalLength!==p||L.pointLength!==g||L.spotLength!==y||L.rectAreaLength!==w||L.hemiLength!==M||L.numSunShadows!==m||L.numDirectionalShadows!==b||L.numPointShadows!==T||L.numSpotShadows!==x||L.numSpotMaps!==S||L.numLightProbes!==R)&&(n.sun.length=f,n.directional.length=p,n.spot.length=y,n.rectArea.length=w,n.point.length=g,n.hemi.length=M,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+S-C,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,L.sunLength=f,L.directionalLength=p,L.pointLength=g,L.spotLength=y,L.rectAreaLength=w,L.hemiLength=M,L.numSunShadows=m,L.numDirectionalShadows=b,L.numPointShadows=T,L.numSpotShadows=x,L.numSpotMaps=S,L.numLightProbes=R,n.version=cb++)}function l(c,h){let d=0,u=0,f=0,m=0,_=0,p=0,g=h.matrixWorldInverse;for(let y=0,w=c.length;y<w;y++){let M=c[y];if(M.isSunLight){let b=n.sun[d];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(g),d++}else if(M.isDirectionalLight){let b=n.directional[u];b.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),u++}else if(M.isSpotLight){let b=n.spot[m];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),m++}else if(M.isRectAreaLight){let b=n.rectArea[_];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){let b=n.point[f];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(g),f++}else if(M.isHemisphereLight){let b=n.hemi[p];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function Zm(s){let t=new ub(s),e=[],n=[],i=[];function r(d){h.camera=d,e.length=0,n.length=0,i.length=0}function a(d){d.isLightProbeGrid?i.push(d):e.push(d)}function o(d){n.push(d)}function l(){t.setup(e),i.sort((d,u)=>d.priority-u.priority||d.id-u.id)}function c(d){t.setupView(e,d)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function fb(s){let t=new WeakMap;function e(i,r=0){let a=t.get(i),o;return a===void 0?(o=new Zm(s),t.set(i,[o])):r>=a.length?(o=new Zm(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var db=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pb=`uniform sampler2D shadow_pass;
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
}`,mb=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],gb=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Jm=new Me,no=new V,mf=new V;function _b(s,t,e){let n=new us,i=new Pt,r=new Pt,a=new Te,o=new Fl,l=new Bl,c={},h=e.maxTextureSize,d={[ms]:gn,[gn]:ms,[gi]:gi},u=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:db,fragmentShader:pb}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new bn;m.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ln(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gs;let g=this.type;this.render=function(T,x,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===zp&&(Yt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Gs);let C=s.getRenderTarget(),R=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),G=s.state;G.setBlending(Hs),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let O=g!==this.type;O&&x.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(F=>F.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,F=T.length;P<F;P++){let z=T[P],N=z.shadow;if(N===void 0){Yt("WebGLShadowMap:",z,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;i.copy(N.mapSize);let Y=N.getFrameExtents();i.multiply(Y),r.copy(N.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,N.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,N.mapSize.y=r.y));let W=s.state.buffers.depth.getReversed();if(N.camera._reversedDepth=W,N.map===null||O===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===kr){if(z.isPointLight){Yt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new In(i.x,i.y,{format:gs,type:jn,minFilter:mn,magFilter:mn,generateMipmaps:!1}),N.map.texture.name=z.name+".shadowMap",N.map.depthTexture=new zi(i.x,i.y,Kn),N.map.depthTexture.name=z.name+".shadowMapDepth",N.map.depthTexture.format=Bi,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ye,N.map.depthTexture.magFilter=Ye}else z.isPointLight?(N.map=new so(i.x),N.map.depthTexture=new Ia(i.x,Jn)):(N.map=new In(i.x,i.y),N.map.depthTexture=new zi(i.x,i.y,Jn)),N.map.depthTexture.name=z.name+".shadowMap",N.map.depthTexture.format=Bi,this.type===Gs?(N.map.depthTexture.compareFunction=W?ju:Ku,N.map.depthTexture.minFilter=mn,N.map.depthTexture.magFilter=mn):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ye,N.map.depthTexture.magFilter=Ye);N.camera.updateProjectionMatrix()}N.map.isWebGLCubeRenderTarget!==!0&&(N.map.width!==i.x||N.map.height!==i.y)&&N.map.setSize(i.x,i.y);let K=N.map.isWebGLCubeRenderTarget?6:N.getViewportCount();z.isPointLight!==!0&&N.updateMatrices(z,S);let Z=(N.camera.layers.mask&4294967294)!==0?N.camera.layers:S.layers;for(let dt=0;dt<K;dt++){let Ot=N.getCamera(dt);if(z.isPointLight){let J=N.camera,ft=N.matrix,At=z.distance||J.far;At!==J.far&&(J.far=At,J.updateProjectionMatrix()),no.setFromMatrixPosition(z.matrixWorld),J.position.copy(no),mf.copy(J.position),mf.add(mb[dt]),J.up.copy(gb[dt]),J.lookAt(mf),J.updateMatrixWorld(),ft.makeTranslation(-no.x,-no.y,-no.z),Jm.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),N._frustum.setFromProjectionMatrix(Jm,J.coordinateSystem,J.reversedDepth)}if(N.map.isWebGLCubeRenderTarget)s.setRenderTarget(N.map,dt),s.clear();else{dt===0&&(s.setRenderTarget(N.map),s.clear());let J=N.getViewport(dt);a.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),G.viewport(a)}n=N.getFrustum(dt),M(x,S,Ot,z,Z,this.type)}N.isPointLightShadow!==!0&&this.type===kr&&y(N,S),N.needsUpdate=!1}g=this.type,p.needsUpdate=!1,s.setRenderTarget(C,R,L)};function y(T,x){let S=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new In(i.x,i.y,{format:gs,type:jn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(x,null,S,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(x,null,S,f,_,null)}function w(T,x,S,C){let R=null,L=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)R=L;else if(R=S.isPointLight===!0?l:o,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let G=R.uuid,O=x.uuid,P=c[G];P===void 0&&(P={},c[G]=P);let F=P[O];F===void 0&&(F=R.clone(),P[O]=F,x.addEventListener("dispose",b)),R=F}if(R.visible=x.visible,R.wireframe=x.wireframe,C===kr?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:d[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,S.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let G=s.properties.get(R);G.light=S}return R}function M(T,x,S,C,R,L){if(T.visible===!1)return;if(T.layers.test(R)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===kr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);let P=t.update(T),F=T.material;if(Array.isArray(F)){let z=P.groups;for(let N=0,Y=z.length;N<Y;N++){let W=z[N],K=F[W.materialIndex];if(K&&K.visible){let Z=w(T,K,C,L);T.onBeforeShadow(s,T,x,S,P,Z,W),s.renderBufferDirect(S,null,P,Z,T,W),T.onAfterShadow(s,T,x,S,P,Z,W)}}}else if(F.visible){let z=w(T,F,C,L);T.onBeforeShadow(s,T,x,S,P,z,null),s.renderBufferDirect(S,null,P,z,T,null),T.onAfterShadow(s,T,x,S,P,z,null)}}let O=T.children;for(let P=0,F=O.length;P<F;P++)M(O[P],x,S,C,R,L)}function b(T){T.target.removeEventListener("dispose",b);for(let S in c){let C=c[S],R=T.target.uuid;R in C&&(C[R].dispose(),delete C[R])}}}function xb(s,t){function e(){let I=!1,rt=new Te,tt=null,bt=new Te(0,0,0,0);return{setMask:function(St){tt!==St&&!I&&(s.colorMask(St,St,St,St),tt=St)},setLocked:function(St){I=St},setClear:function(St,wt,Ht,ie,Mt){Mt===!0&&(St*=ie,wt*=ie,Ht*=ie),rt.set(St,wt,Ht,ie),bt.equals(rt)===!1&&(s.clearColor(St,wt,Ht,ie),bt.copy(rt))},reset:function(){I=!1,tt=null,bt.set(-1,0,0,0)}}}function n(){let I=!1,rt=!1,tt=null,bt=null,St=null;return{setReversed:function(wt){if(rt!==wt){let Ht=t.get("EXT_clip_control");wt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),rt=wt;let ie=St;St=null,this.setClear(ie)}},getReversed:function(){return rt},setTest:function(wt){wt?_t(s.DEPTH_TEST):Bt(s.DEPTH_TEST)},setMask:function(wt){tt!==wt&&!I&&(s.depthMask(wt),tt=wt)},setFunc:function(wt){if(rt&&(wt=ym[wt]),bt!==wt){switch(wt){case cl:s.depthFunc(s.NEVER);break;case hl:s.depthFunc(s.ALWAYS);break;case ul:s.depthFunc(s.LESS);break;case wr:s.depthFunc(s.LEQUAL);break;case fl:s.depthFunc(s.EQUAL);break;case dl:s.depthFunc(s.GEQUAL);break;case pl:s.depthFunc(s.GREATER);break;case ml:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}bt=wt}},setLocked:function(wt){I=wt},setClear:function(wt){St!==wt&&(St=wt,rt&&(wt=1-wt),s.clearDepth(wt))},reset:function(){I=!1,tt=null,bt=null,St=null,rt=!1}}}function i(){let I=!1,rt=null,tt=null,bt=null,St=null,wt=null,Ht=null,ie=null,Mt=null;return{setTest:function($t){I||($t?_t(s.STENCIL_TEST):Bt(s.STENCIL_TEST))},setMask:function($t){rt!==$t&&!I&&(s.stencilMask($t),rt=$t)},setFunc:function($t,ne,Lt){(tt!==$t||bt!==ne||St!==Lt)&&(s.stencilFunc($t,ne,Lt),tt=$t,bt=ne,St=Lt)},setOp:function($t,ne,Lt){(wt!==$t||Ht!==ne||ie!==Lt)&&(s.stencilOp($t,ne,Lt),wt=$t,Ht=ne,ie=Lt)},setLocked:function($t){I=$t},setClear:function($t){Mt!==$t&&(s.clearStencil($t),Mt=$t)},reset:function(){I=!1,rt=null,tt=null,bt=null,St=null,wt=null,Ht=null,ie=null,Mt=null}}}let r=new e,a=new n,o=new i,l={},c=new WeakMap,h={},d={},u={},f=new WeakMap,m=[],_=null,p=!1,g=null,y=null,w=null,M=null,b=null,T=null,x=null,S=new te(0,0,0),C=0,R=!1,L=null,G=null,O=null,P=null,F=null,z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,Y=0,W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(W)[1]),N=Y>=1):W.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),N=Y>=2);let K=null,Z={},dt=s.getParameter(s.SCISSOR_BOX),Ot=s.getParameter(s.VIEWPORT),J=new Te().fromArray(dt),ft=new Te().fromArray(Ot);function At(I,rt,tt,bt){let St=new Uint8Array(4),wt=s.createTexture();s.bindTexture(I,wt),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<tt;Ht++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(rt,0,s.RGBA,1,1,bt,0,s.RGBA,s.UNSIGNED_BYTE,St):s.texImage2D(rt+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,St);return wt}let Ut={};Ut[s.TEXTURE_2D]=At(s.TEXTURE_2D,s.TEXTURE_2D,1),Ut[s.TEXTURE_CUBE_MAP]=At(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ut[s.TEXTURE_2D_ARRAY]=At(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ut[s.TEXTURE_3D]=At(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),_t(s.DEPTH_TEST),a.setFunc(wr),ct(!1),B(Iu),_t(s.CULL_FACE),H(Hs);function _t(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function Bt(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function ee(I,rt){return u[I]!==rt?(s.bindFramebuffer(I,rt),u[I]=rt,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=rt),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=rt),!0):!1}function zt(I,rt){let tt=m,bt=!1;if(I){tt=f.get(rt),tt===void 0&&(tt=[],f.set(rt,tt));let St=I.textures;if(tt.length!==St.length||tt[0]!==s.COLOR_ATTACHMENT0){for(let wt=0,Ht=St.length;wt<Ht;wt++)tt[wt]=s.COLOR_ATTACHMENT0+wt;tt.length=St.length,bt=!0}}else tt[0]!==s.BACK&&(tt[0]=s.BACK,bt=!0);bt&&s.drawBuffers(tt)}function Zt(I){return _!==I?(s.useProgram(I),_=I,!0):!1}let Kt={[Ws]:s.FUNC_ADD,[Gp]:s.FUNC_SUBTRACT,[Hp]:s.FUNC_REVERSE_SUBTRACT};Kt[Wp]=s.MIN,Kt[Xp]=s.MAX;let at={[qp]:s.ZERO,[$p]:s.ONE,[Yp]:s.SRC_COLOR,[Nu]:s.SRC_ALPHA,[tm]:s.SRC_ALPHA_SATURATE,[jp]:s.DST_COLOR,[Jp]:s.DST_ALPHA,[Zp]:s.ONE_MINUS_SRC_COLOR,[Uu]:s.ONE_MINUS_SRC_ALPHA,[Qp]:s.ONE_MINUS_DST_COLOR,[Kp]:s.ONE_MINUS_DST_ALPHA,[em]:s.CONSTANT_COLOR,[nm]:s.ONE_MINUS_CONSTANT_COLOR,[im]:s.CONSTANT_ALPHA,[sm]:s.ONE_MINUS_CONSTANT_ALPHA};function H(I,rt,tt,bt,St,wt,Ht,ie,Mt,$t){if(I===Hs){p===!0&&(Bt(s.BLEND),p=!1);return}if(p===!1&&(_t(s.BLEND),p=!0),I!==Vp){if(I!==g||$t!==R){if((y!==Ws||b!==Ws)&&(s.blendEquation(s.FUNC_ADD),y=Ws,b=Ws),$t)switch(I){case zr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case $a:s.blendFunc(s.ONE,s.ONE);break;case Lu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Du:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Jt("WebGLState: Invalid blending: ",I);break}else switch(I){case zr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case $a:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Lu:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Du:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",I);break}w=null,M=null,T=null,x=null,S.set(0,0,0),C=0,g=I,R=$t}return}St=St||rt,wt=wt||tt,Ht=Ht||bt,(rt!==y||St!==b)&&(s.blendEquationSeparate(Kt[rt],Kt[St]),y=rt,b=St),(tt!==w||bt!==M||wt!==T||Ht!==x)&&(s.blendFuncSeparate(at[tt],at[bt],at[wt],at[Ht]),w=tt,M=bt,T=wt,x=Ht),(ie.equals(S)===!1||Mt!==C)&&(s.blendColor(ie.r,ie.g,ie.b,Mt),S.copy(ie),C=Mt),g=I,R=!1}function it(I,rt){I.side===gi?Bt(s.CULL_FACE):_t(s.CULL_FACE);let tt=I.side===gn;rt&&(tt=!tt),ct(tt),I.blending===zr&&I.transparent===!1?H(Hs):H(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let bt=I.stencilWrite;o.setTest(bt),bt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ut(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?_t(s.SAMPLE_ALPHA_TO_COVERAGE):Bt(s.SAMPLE_ALPHA_TO_COVERAGE)}function ct(I){L!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),L=I)}function B(I){I!==Bp?(_t(s.CULL_FACE),I!==G&&(I===Iu?s.cullFace(s.BACK):I===kp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Bt(s.CULL_FACE),G=I}function ot(I){I!==O&&(N&&s.lineWidth(I),O=I)}function ut(I,rt,tt){I?(_t(s.POLYGON_OFFSET_FILL),(P!==rt||F!==tt)&&(P=rt,F=tt,a.getReversed()&&(rt=-rt,tt=-tt),s.polygonOffset(rt,tt))):Bt(s.POLYGON_OFFSET_FILL)}function Tt(I){I?_t(s.SCISSOR_TEST):Bt(s.SCISSOR_TEST)}function It(I){I===void 0&&(I=s.TEXTURE0+z-1),K!==I&&(s.activeTexture(I),K=I)}function Xt(I,rt,tt){tt===void 0&&(K===null?tt=s.TEXTURE0+z-1:tt=K);let bt=Z[tt];bt===void 0&&(bt={type:void 0,texture:void 0},Z[tt]=bt),(bt.type!==I||bt.texture!==rt)&&(K!==tt&&(s.activeTexture(tt),K=tt),s.bindTexture(I,rt||Ut[I]),bt.type=I,bt.texture=rt)}function D(){let I=Z[K];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function de(){try{s.compressedTexImage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function et(){try{s.compressedTexImage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function vt(){try{s.texSubImage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function nt(){try{s.texSubImage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function Et(){try{s.compressedTexSubImage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function mt(){try{s.compressedTexSubImage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function yt(){try{s.texStorage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function E(){try{s.texStorage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function v(){try{s.texImage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function k(){try{s.texImage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function lt(I){return d[I]!==void 0?d[I]:s.getParameter(I)}function st(I,rt){d[I]!==rt&&(s.pixelStorei(I,rt),d[I]=rt)}function gt(I){J.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),J.copy(I))}function xt(I){ft.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),ft.copy(I))}function q(I,rt){let tt=c.get(rt);tt===void 0&&(tt=new WeakMap,c.set(rt,tt));let bt=tt.get(I);bt===void 0&&(bt=s.getUniformBlockIndex(rt,I.name),s.uniformBlockBinding(rt,bt,bt),tt.set(I,bt))}function Q(I,rt,tt){let St=c.get(rt).get(I);l[St]!==tt&&(s.bindBufferBase(s.UNIFORM_BUFFER,St,tt),l[St]=tt)}function pt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},K=null,Z={},u={},l={},f=new WeakMap,m=[],_=null,p=!1,g=null,y=null,w=null,M=null,b=null,T=null,x=null,S=new te(0,0,0),C=0,R=!1,L=null,G=null,O=null,P=null,F=null,J.set(0,0,s.canvas.width,s.canvas.height),ft.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:_t,disable:Bt,bindFramebuffer:ee,drawBuffers:zt,useProgram:Zt,setBlending:H,setMaterial:it,setFlipSided:ct,setCullFace:B,setLineWidth:ot,setPolygonOffset:ut,setScissorTest:Tt,activeTexture:It,bindTexture:Xt,unbindTexture:D,compressedTexImage2D:de,compressedTexImage3D:et,texImage2D:v,texImage3D:k,pixelStorei:st,getParameter:lt,updateUBOMapping:q,uniformBlockBinding:Q,texStorage2D:yt,texStorage3D:E,texSubImage2D:vt,texSubImage3D:nt,compressedTexSubImage2D:Et,compressedTexSubImage3D:mt,scissor:gt,viewport:xt,reset:pt}}function vb(s,t,e,n,i,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pt,h=new WeakMap,d=new Set,u,f=new WeakMap,m=new Set,_=new FinalizationRegistry(E=>m.delete(E)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return p?new OffscreenCanvas(E,v):ba("canvas")}function y(E,v,k){let lt=1,st=yt(E);if((st.width>k||st.height>k)&&(lt=k/Math.max(st.width,st.height)),lt<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let gt=Math.floor(lt*st.width),xt=Math.floor(lt*st.height);u===void 0&&(u=g(gt,xt));let q=v?g(gt,xt):u;return q.width=gt,q.height=xt,q.getContext("2d").drawImage(E,0,0,gt,xt),Yt("WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+gt+"x"+xt+")."),q}else return"data"in E&&Yt("WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),E;return E}function w(E){return E.generateMipmaps}function M(E){s.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(E,v,k,lt,st,gt=!1){if(E!==null){if(s[E]!==void 0)return s[E];Yt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let xt;lt&&(xt=t.get("EXT_texture_norm16"),xt||Yt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=v;if(v===s.RED&&(k===s.FLOAT&&(q=s.R32F),k===s.HALF_FLOAT&&(q=s.R16F),k===s.UNSIGNED_BYTE&&(q=s.R8),k===s.UNSIGNED_SHORT&&xt&&(q=xt.R16_EXT),k===s.SHORT&&xt&&(q=xt.R16_SNORM_EXT)),v===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(q=s.R8UI),k===s.UNSIGNED_SHORT&&(q=s.R16UI),k===s.UNSIGNED_INT&&(q=s.R32UI),k===s.BYTE&&(q=s.R8I),k===s.SHORT&&(q=s.R16I),k===s.INT&&(q=s.R32I)),v===s.RG&&(k===s.FLOAT&&(q=s.RG32F),k===s.HALF_FLOAT&&(q=s.RG16F),k===s.UNSIGNED_BYTE&&(q=s.RG8),k===s.UNSIGNED_SHORT&&xt&&(q=xt.RG16_EXT),k===s.SHORT&&xt&&(q=xt.RG16_SNORM_EXT)),v===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(q=s.RG8UI),k===s.UNSIGNED_SHORT&&(q=s.RG16UI),k===s.UNSIGNED_INT&&(q=s.RG32UI),k===s.BYTE&&(q=s.RG8I),k===s.SHORT&&(q=s.RG16I),k===s.INT&&(q=s.RG32I)),v===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(q=s.RGB8UI),k===s.UNSIGNED_SHORT&&(q=s.RGB16UI),k===s.UNSIGNED_INT&&(q=s.RGB32UI),k===s.BYTE&&(q=s.RGB8I),k===s.SHORT&&(q=s.RGB16I),k===s.INT&&(q=s.RGB32I)),v===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),k===s.UNSIGNED_INT&&(q=s.RGBA32UI),k===s.BYTE&&(q=s.RGBA8I),k===s.SHORT&&(q=s.RGBA16I),k===s.INT&&(q=s.RGBA32I)),v===s.RGB&&(k===s.UNSIGNED_SHORT&&xt&&(q=xt.RGB16_EXT),k===s.SHORT&&xt&&(q=xt.RGB16_SNORM_EXT),k===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&(q=s.R11F_G11F_B10F)),v===s.RGBA){let Q=gt?Sa:ce.getTransfer(st);k===s.FLOAT&&(q=s.RGBA32F),k===s.HALF_FLOAT&&(q=s.RGBA16F),k===s.UNSIGNED_BYTE&&(q=Q===ge?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT&&xt&&(q=xt.RGBA16_EXT),k===s.SHORT&&xt&&(q=xt.RGBA16_SNORM_EXT),k===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(E,v){let k;return E?v===null||v===Jn||v===qs?k=s.DEPTH24_STENCIL8:v===Kn?k=s.DEPTH32F_STENCIL8:v===Gr&&(k=s.DEPTH24_STENCIL8,Yt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Jn||v===qs?k=s.DEPTH_COMPONENT24:v===Kn?k=s.DEPTH_COMPONENT32F:v===Gr&&(k=s.DEPTH_COMPONENT16),k}function S(E,v){return w(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ye&&E.minFilter!==mn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function C(E){let v=new WeakRef(E);n.get(E).__ref=v,m.add(v),_.register(E,v,v)}function R(E){let v=n.get(E).__ref;v!==void 0&&(m.delete(v),_.unregister(v))}function L(E){O(E.target)}function G(E){P(E.target)}function O(E){E.removeEventListener("dispose",L),R(E),z(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&d.delete(E)}function P(E){E.removeEventListener("dispose",G),R(E),Y(E)}function F(){for(let E of m){let v=E.deref();v!==void 0&&(v.isRenderTarget===!0?P(v):O(v))}m.clear(),d.clear()}function z(E){let v=n.get(E);if(v.__webglInit===void 0)return;let k=E.source,lt=f.get(k);if(lt){let st=lt[v.__cacheKey];st.usedTimes--,st.usedTimes===0&&N(E),Object.keys(lt).length===0&&f.delete(k)}n.remove(E)}function N(E){let v=n.get(E);s.deleteTexture(v.__webglTexture);let k=E.source,lt=f.get(k);delete lt[v.__cacheKey],a.memory.textures--}function Y(E){let v=n.get(E);v.__depthDisposeCallback&&v.__depthDisposeCallback();let k=E.depthTexture;if(k&&k.renderTarget===E&&O(k),E.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(v.__webglFramebuffer[st]))for(let gt=0;gt<v.__webglFramebuffer[st].length;gt++)s.deleteFramebuffer(v.__webglFramebuffer[st][gt]);else s.deleteFramebuffer(v.__webglFramebuffer[st]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[st])}else{if(Array.isArray(v.__webglFramebuffer))for(let st=0;st<v.__webglFramebuffer.length;st++)s.deleteFramebuffer(v.__webglFramebuffer[st]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let st=0;st<v.__webglColorRenderbuffer.length;st++)v.__webglColorRenderbuffer[st]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[st]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let lt=E.textures;for(let st=0,gt=lt.length;st<gt;st++){let xt=n.get(lt[st]);xt.__webglTexture&&(s.deleteTexture(xt.__webglTexture),a.memory.textures--),n.remove(lt[st])}n.remove(E)}let W=0;function K(){W=0}function Z(){return W}function dt(E){W=E}function Ot(){let E=W;return E>=i.maxTextures&&Yt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+i.maxTextures),W+=1,E}function J(E){let v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.mipmapsAutoUpdate),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function ft(E,v){let k=n.get(E);if(E.isVideoTexture&&Et(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&k.__version!==E.version){let lt=E.image;if(lt===null)Yt("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)Yt("WebGLRenderer: Texture marked for update but image is incomplete");else{it(k,E,v);return}}else E.isExternalTexture&&(k.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+v)}function At(E,v){let k=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&k.__version!==E.version){it(k,E,v);return}else E.isExternalTexture&&(k.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+v)}function Ut(E,v){let k=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&k.__version!==E.version){it(k,E,v);return}e.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+v)}function _t(E,v){let k=n.get(E);if(E.version>0&&k.__version!==E.version){ct(k,E,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+v)}let Bt={[gl]:s.REPEAT,[fi]:s.CLAMP_TO_EDGE,[_l]:s.MIRRORED_REPEAT},ee={[Ye]:s.NEAREST,[om]:s.NEAREST_MIPMAP_NEAREST,[Za]:s.NEAREST_MIPMAP_LINEAR,[mn]:s.LINEAR,[tc]:s.LINEAR_MIPMAP_NEAREST,[Vi]:s.LINEAR_MIPMAP_LINEAR},zt={[um]:s.NEVER,[Qu]:s.ALWAYS,[fm]:s.LESS,[Ku]:s.LEQUAL,[dm]:s.EQUAL,[ju]:s.GEQUAL,[pm]:s.GREATER,[mm]:s.NOTEQUAL};function Zt(E,v){if(v.type===Kn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===mn||v.magFilter===tc||v.magFilter===Za||v.magFilter===Vi||v.minFilter===mn||v.minFilter===tc||v.minFilter===Za||v.minFilter===Vi)&&Yt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,Bt[v.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,Bt[v.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,Bt[v.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,ee[v.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,ee[v.minFilter]),v.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,zt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ye||v.minFilter!==Za&&v.minFilter!==Vi||v.type===Kn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Kt(E,v){let k=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",L),C(v));let lt=v.source,st=f.get(lt);st===void 0&&(st={},f.set(lt,st));let gt=J(v);if(gt!==E.__cacheKey){st[gt]===void 0&&(st[gt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),st[gt].usedTimes++;let xt=st[E.__cacheKey];xt!==void 0&&(st[E.__cacheKey].usedTimes--,xt.usedTimes===0&&N(v)),E.__cacheKey=gt,E.__webglTexture=st[gt].texture}return k}function at(E,v,k){return Math.floor(Math.floor(E/k)/v)}function H(E,v,k,lt){let gt=E.updateRanges;if(gt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,k,lt,v.data);else{gt.sort((I,rt)=>I.start-rt.start);let xt=0;for(let I=1;I<gt.length;I++){let rt=gt[xt],tt=gt[I],bt=rt.start+rt.count,St=at(tt.start,v.width,4),wt=at(rt.start,v.width,4);tt.start<=bt+1&&St===wt&&at(tt.start+tt.count-1,v.width,4)===St?rt.count=Math.max(rt.count,tt.start+tt.count-rt.start):(++xt,gt[xt]=tt)}gt.length=xt+1;let q=e.getParameter(s.UNPACK_ROW_LENGTH),Q=e.getParameter(s.UNPACK_SKIP_PIXELS),pt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let I=0,rt=gt.length;I<rt;I++){let tt=gt[I],bt=Math.floor(tt.start/4),St=Math.ceil(tt.count/4),wt=bt%v.width,Ht=Math.floor(bt/v.width),ie=St,Mt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,wt),e.pixelStorei(s.UNPACK_SKIP_ROWS,Ht),e.texSubImage2D(s.TEXTURE_2D,0,wt,Ht,ie,Mt,k,lt,v.data)}E.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,q),e.pixelStorei(s.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(s.UNPACK_SKIP_ROWS,pt)}}function it(E,v,k){let lt=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(lt=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(lt=s.TEXTURE_3D);let st=Kt(E,v),gt=v.source;e.bindTexture(lt,E.__webglTexture,s.TEXTURE0+k);let xt=n.get(gt);if(gt.version!==xt.__version||st===!0){if(e.activeTexture(s.TEXTURE0+k),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let Mt=ce.getPrimaries(ce.workingColorSpace),$t=v.colorSpace===Hi?null:ce.getPrimaries(v.colorSpace),ne=v.colorSpace===Hi||Mt===$t?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne)}e.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment);let Q=y(v.image,!1,i.maxTextureSize);Q=mt(v,Q);let pt=r.convert(v.format,v.colorSpace),I=r.convert(v.type),rt=T(v.internalFormat,pt,I,v.normalized,v.colorSpace,v.isVideoTexture);Zt(lt,v);let tt,bt=v.mipmaps,St=v.isVideoTexture!==!0,wt=xt.__version===void 0||st===!0,Ht=gt.dataReady,ie=S(v,Q);if(v.isDepthTexture)rt=x(v.format===Gi,v.type),wt&&(St?e.texStorage2D(s.TEXTURE_2D,1,rt,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,rt,Q.width,Q.height,0,pt,I,null));else if(v.isDataTexture)if(bt.length>0){St&&wt&&e.texStorage2D(s.TEXTURE_2D,ie,rt,bt[0].width,bt[0].height);for(let Mt=0,$t=bt.length;Mt<$t;Mt++)tt=bt[Mt],St?Ht&&e.texSubImage2D(s.TEXTURE_2D,Mt,0,0,tt.width,tt.height,pt,I,tt.data):e.texImage2D(s.TEXTURE_2D,Mt,rt,tt.width,tt.height,0,pt,I,tt.data);v.generateMipmaps=!1}else St?(wt&&e.texStorage2D(s.TEXTURE_2D,ie,rt,Q.width,Q.height),Ht&&H(v,Q,pt,I)):e.texImage2D(s.TEXTURE_2D,0,rt,Q.width,Q.height,0,pt,I,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){St&&wt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ie,rt,bt[0].width,bt[0].height,Q.depth);for(let Mt=0,$t=bt.length;Mt<$t;Mt++)if(tt=bt[Mt],v.format!==Qn)if(pt!==null)if(St){if(Ht)if(v.layerUpdates.size>0){let ne=lf(tt.width,tt.height,v.format,v.type);for(let Lt of v.layerUpdates){let _e=tt.data.subarray(Lt*ne/tt.data.BYTES_PER_ELEMENT,(Lt+1)*ne/tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Mt,0,0,Lt,tt.width,tt.height,1,pt,_e)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Mt,0,0,0,tt.width,tt.height,Q.depth,pt,tt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Mt,rt,tt.width,tt.height,Q.depth,0,tt.data,0,0);else Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else St?Ht&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Mt,0,0,0,tt.width,tt.height,Q.depth,pt,I,tt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Mt,rt,tt.width,tt.height,Q.depth,0,pt,I,tt.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{St&&wt&&e.texStorage2D(s.TEXTURE_2D,ie,rt,bt[0].width,bt[0].height);for(let Mt=0,$t=bt.length;Mt<$t;Mt++)tt=bt[Mt],v.format!==Qn?pt!==null?St?Ht&&e.compressedTexSubImage2D(s.TEXTURE_2D,Mt,0,0,tt.width,tt.height,pt,tt.data):e.compressedTexImage2D(s.TEXTURE_2D,Mt,rt,tt.width,tt.height,0,tt.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):St?Ht&&e.texSubImage2D(s.TEXTURE_2D,Mt,0,0,tt.width,tt.height,pt,I,tt.data):e.texImage2D(s.TEXTURE_2D,Mt,rt,tt.width,tt.height,0,pt,I,tt.data)}else if(v.isDataArrayTexture)if(St){if(wt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ie,rt,Q.width,Q.height,Q.depth),Ht)if(v.layerUpdates.size>0){let Mt=lf(Q.width,Q.height,v.format,v.type);for(let $t of v.layerUpdates){let ne=Q.data.subarray($t*Mt/Q.data.BYTES_PER_ELEMENT,($t+1)*Mt/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$t,Q.width,Q.height,1,pt,I,ne)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,pt,I,Q.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,rt,Q.width,Q.height,Q.depth,0,pt,I,Q.data);else if(v.isData3DTexture)St?(wt&&e.texStorage3D(s.TEXTURE_3D,ie,rt,Q.width,Q.height,Q.depth),Ht&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,pt,I,Q.data)):e.texImage3D(s.TEXTURE_3D,0,rt,Q.width,Q.height,Q.depth,0,pt,I,Q.data);else if(v.isFramebufferTexture){if(wt)if(St)e.texStorage2D(s.TEXTURE_2D,ie,rt,Q.width,Q.height);else{let Mt=Q.width,$t=Q.height;for(let ne=0;ne<ie;ne++)e.texImage2D(s.TEXTURE_2D,ne,rt,Mt,$t,0,pt,I,null),Mt>>=1,$t>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in s){let Mt=s.canvas;if(Mt.hasAttribute("layoutsubtree")||Mt.setAttribute("layoutsubtree","true"),Q.parentNode!==Mt){Mt.appendChild(Q),d.add(v),Mt.onpaint=$t=>{let ne=$t.changedElements;for(let Lt of d)ne.includes(Lt.image)&&(Lt.needsUpdate=!0)},Mt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Q);else{let ne=s.RGBA,Lt=s.RGBA,_e=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ne,Lt,_e,Q)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(bt.length>0){if(St&&wt){let Mt=yt(bt[0]);e.texStorage2D(s.TEXTURE_2D,ie,rt,Mt.width,Mt.height)}for(let Mt=0,$t=bt.length;Mt<$t;Mt++)tt=bt[Mt],St?Ht&&e.texSubImage2D(s.TEXTURE_2D,Mt,0,0,pt,I,tt):e.texImage2D(s.TEXTURE_2D,Mt,rt,pt,I,tt);v.generateMipmaps=!1}else if(St){if(wt){let Mt=yt(Q);e.texStorage2D(s.TEXTURE_2D,ie,rt,Mt.width,Mt.height)}Ht&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,pt,I,Q)}else e.texImage2D(s.TEXTURE_2D,0,rt,pt,I,Q);w(v)&&v.mipmapsAutoUpdate===!0&&M(lt),xt.__version=gt.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ct(E,v,k){if(v.image.length!==6)return;let lt=Kt(E,v),st=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+k);let gt=n.get(st);if(st.version!==gt.__version||lt===!0){e.activeTexture(s.TEXTURE0+k);let xt=ce.getPrimaries(ce.workingColorSpace),q=v.colorSpace===Hi?null:ce.getPrimaries(v.colorSpace),Q=v.colorSpace===Hi||xt===q?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let pt=v.isCompressedTexture||v.image[0].isCompressedTexture,I=v.image[0]&&v.image[0].isDataTexture,rt=[];for(let Lt=0;Lt<6;Lt++)!pt&&!I?rt[Lt]=y(v.image[Lt],!0,i.maxCubemapSize):rt[Lt]=I?v.image[Lt].image:v.image[Lt],rt[Lt]=mt(v,rt[Lt]);let tt=rt[0],bt=r.convert(v.format,v.colorSpace),St=r.convert(v.type),wt=T(v.internalFormat,bt,St,v.normalized,v.colorSpace),Ht=v.isVideoTexture!==!0,ie=gt.__version===void 0||lt===!0,Mt=st.dataReady,$t=S(v,tt);Zt(s.TEXTURE_CUBE_MAP,v);let ne;if(v.isDepthTexture){if(wt=x(v.format===Gi,v.type),ie)if(Ht)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,wt,tt.width,tt.height);else for(let Lt=0;Lt<6;Lt++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0,wt,tt.width,tt.height,0,bt,St,null)}else if(pt){Ht&&ie&&e.texStorage2D(s.TEXTURE_CUBE_MAP,$t,wt,tt.width,tt.height);for(let Lt=0;Lt<6;Lt++){ne=rt[Lt].mipmaps;for(let _e=0;_e<ne.length;_e++){let Xe=ne[_e];v.format!==Qn?bt!==null?Ht?Mt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,_e,0,0,Xe.width,Xe.height,bt,Xe.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,_e,wt,Xe.width,Xe.height,0,Xe.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,_e,0,0,Xe.width,Xe.height,bt,St,Xe.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,_e,wt,Xe.width,Xe.height,0,bt,St,Xe.data)}}}else{if(ne=v.mipmaps,Ht&&ie){ne.length>0&&$t++;let Lt=yt(rt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,$t,wt,Lt.width,Lt.height)}for(let Lt=0;Lt<6;Lt++)if(I){Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0,0,0,rt[Lt].width,rt[Lt].height,bt,St,rt[Lt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0,wt,rt[Lt].width,rt[Lt].height,0,bt,St,rt[Lt].data);for(let _e=0;_e<ne.length;_e++){let qi=ne[_e].image[Lt].image;Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,_e+1,0,0,qi.width,qi.height,bt,St,qi.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,_e+1,wt,qi.width,qi.height,0,bt,St,qi.data)}}else{Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0,0,0,bt,St,rt[Lt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0,wt,bt,St,rt[Lt]);for(let _e=0;_e<ne.length;_e++){let Xe=ne[_e];Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,_e+1,0,0,bt,St,Xe.image[Lt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,_e+1,wt,bt,St,Xe.image[Lt])}}}w(v)&&v.mipmapsAutoUpdate===!0&&M(s.TEXTURE_CUBE_MAP),gt.__version=st.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function B(E,v,k,lt,st,gt){let xt=r.convert(k.format,k.colorSpace),q=r.convert(k.type),Q=T(k.internalFormat,xt,q,k.normalized,k.colorSpace),pt=n.get(v),I=n.get(k);if(I.__renderTarget=v,!pt.__hasExternalTextures){let rt=Math.max(1,v.width>>gt),tt=Math.max(1,v.height>>gt);st===s.TEXTURE_3D||st===s.TEXTURE_2D_ARRAY?e.texImage3D(st,gt,Q,rt,tt,v.depth,0,xt,q,null):e.texImage2D(st,gt,Q,rt,tt,0,xt,q,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),nt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,lt,st,I.__webglTexture,0,vt(v)):(st===s.TEXTURE_2D||st>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,lt,st,I.__webglTexture,gt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ot(E,v,k){if(s.bindRenderbuffer(s.RENDERBUFFER,E),v.depthBuffer){let lt=v.depthTexture,st=lt&&lt.isDepthTexture?lt.type:null,gt=x(v.stencilBuffer,st),xt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;nt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt(v),gt,v.width,v.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt(v),gt,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,gt,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,xt,s.RENDERBUFFER,E)}else{let lt=v.textures;for(let st=0;st<lt.length;st++){let gt=lt[st],xt=r.convert(gt.format,gt.colorSpace),q=r.convert(gt.type),Q=T(gt.internalFormat,xt,q,gt.normalized,gt.colorSpace);nt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt(v),Q,v.width,v.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt(v),Q,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Q,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ut(E,v,k){let lt=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let st=n.get(v.depthTexture);st.__renderTarget=v;let gt=lt?v.depthTexture.image[0]:v.depthTexture.image;(!st.__webglTexture||gt.width!==v.width||gt.height!==v.height)&&(gt.width=v.width,gt.height=v.height,v.depthTexture.needsUpdate=!0),lt?_t(v.depthTexture,0):ft(v.depthTexture,0);let xt=st.__webglTexture,q=vt(v),Q=lt?s.TEXTURE_CUBE_MAP_POSITIVE_X+k:s.TEXTURE_2D,pt=v.depthTexture.format===Gi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(v.depthTexture.format===Bi)nt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pt,Q,xt,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,pt,Q,xt,0);else if(v.depthTexture.format===Gi)nt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pt,Q,xt,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,pt,Q,xt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Tt(E){let v=n.get(E),k=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){let lt=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),lt){let st=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,lt.removeEventListener("dispose",st)};lt.addEventListener("dispose",st),v.__depthDisposeCallback=st}v.__boundDepthTexture=lt}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(k)for(let lt=0;lt<6;lt++)ut(v.__webglFramebuffer[lt],E,lt);else E.texture.mipmaps.length>0?ut(v.__webglFramebuffer[0],E,0):ut(v.__webglFramebuffer,E,0);else if(k){v.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[lt]),v.__webglDepthbuffer[lt]===void 0)v.__webglDepthbuffer[lt]=s.createRenderbuffer(),ot(v.__webglDepthbuffer[lt],E,!1);else{let st=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=v.__webglDepthbuffer[lt];s.bindRenderbuffer(s.RENDERBUFFER,gt),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,gt)}}else if(E.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),ot(v.__webglDepthbuffer,E,!1);else{let st=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,gt),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,gt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function It(E,v,k){let lt=n.get(E);v!==void 0&&B(lt.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Tt(E)}function Xt(E){let v=E.texture,k=n.get(E),lt=n.get(v);E.addEventListener("dispose",G),C(E);let st=E.textures,gt=E.isWebGLCubeRenderTarget===!0,xt=st.length>1;if(xt||(lt.__webglTexture===void 0&&(lt.__webglTexture=s.createTexture()),lt.__version=v.version,a.memory.textures++),gt){k.__webglFramebuffer=[];for(let q=0;q<6;q++)if(v.mipmaps.length>0){k.__webglFramebuffer[q]=[];for(let Q=0;Q<v.mipmaps.length;Q++)k.__webglFramebuffer[q][Q]=s.createFramebuffer()}else k.__webglFramebuffer[q]=s.createFramebuffer()}else{if(v.mipmaps.length>0){k.__webglFramebuffer=[];for(let q=0;q<v.mipmaps.length;q++)k.__webglFramebuffer[q]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(xt)for(let q=0,Q=st.length;q<Q;q++){let pt=n.get(st[q]);pt.__webglTexture===void 0&&(pt.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&nt(E)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let q=0;q<st.length;q++){let Q=st[q];k.__webglColorRenderbuffer[q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[q]);let pt=r.convert(Q.format,Q.colorSpace),I=r.convert(Q.type),rt=T(Q.internalFormat,pt,I,Q.normalized,Q.colorSpace,E.isXRRenderTarget===!0),tt=vt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,rt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+q,s.RENDERBUFFER,k.__webglColorRenderbuffer[q])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),ot(k.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(gt){e.bindTexture(s.TEXTURE_CUBE_MAP,lt.__webglTexture),Zt(s.TEXTURE_CUBE_MAP,v);for(let q=0;q<6;q++)if(v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)B(k.__webglFramebuffer[q][Q],E,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+q,Q);else B(k.__webglFramebuffer[q],E,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);w(v)?M(s.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),e.unbindTexture()}else if(xt){for(let q=0,Q=st.length;q<Q;q++){let pt=st[q],I=n.get(pt),rt=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(rt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(rt,I.__webglTexture),Zt(rt,pt),B(k.__webglFramebuffer,E,pt,s.COLOR_ATTACHMENT0+q,rt,0),w(pt)&&M(rt)}e.unbindTexture()}else{let q=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(q=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(q,lt.__webglTexture),Zt(q,v),v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)B(k.__webglFramebuffer[Q],E,v,s.COLOR_ATTACHMENT0,q,Q);else B(k.__webglFramebuffer,E,v,s.COLOR_ATTACHMENT0,q,0);w(v)?M(q):v.mipmaps.length>0&&s.texParameteri(q,s.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),e.unbindTexture()}E.depthBuffer&&Tt(E)}function D(E){let v=E.textures;for(let k=0,lt=v.length;k<lt;k++){let st=v[k];if(w(st)&&st.mipmapsAutoUpdate===!0){let gt=b(E),xt=n.get(st).__webglTexture;e.bindTexture(gt,xt),M(gt),e.unbindTexture()}}}let de=[];function et(E){if(E.samples>0){if(nt(E)===!1){let v=E.textures,k=E.width,lt=E.height,st=s.COLOR_BUFFER_BIT,gt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=n.get(E),q=v.length>1;if(q)for(let pt=0;pt<v.length;pt++)e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let pt=0;pt<v.length;pt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(st|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(st|=s.STENCIL_BUFFER_BIT)),q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xt.__webglColorRenderbuffer[pt]);let I=n.get(v[pt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,I,0)}s.blitFramebuffer(0,0,k,lt,0,0,k,lt,st,s.NEAREST),l===!0&&(de.length=0,de.push(s.COLOR_ATTACHMENT0+pt),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&de.push(gt),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,de))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),q)for(let pt=0;pt<v.length;pt++){e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,xt.__webglColorRenderbuffer[pt]);let I=n.get(v[pt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,I,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let v=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function vt(E){return Math.min(i.maxSamples,E.samples)}function nt(E){let v=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Et(E){let v=a.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function mt(E,v){let k=E.colorSpace,lt=E.format,st=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||k!==Ma&&k!==Hi&&(ce.getTransfer(k)===ge?(lt!==Qn||st!==wn)&&Yt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",k)),v}function yt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Ot,this.resetTextureUnits=K,this.getTextureUnits=Z,this.setTextureUnits=dt,this.setTexture2D=ft,this.setTexture2DArray=At,this.setTexture3D=Ut,this.setTextureCube=_t,this.rebindTextures=It,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=B,this.useMultisampledRTT=nt,this.dispose=F}function yb(s,t){function e(n,i=Hi){let r,a=ce.getTransfer(i);if(n===wn)return s.UNSIGNED_BYTE;if(n===nc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ic)return s.UNSIGNED_SHORT_5_5_5_1;if(n===qu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===$u)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wu)return s.BYTE;if(n===Xu)return s.SHORT;if(n===Gr)return s.UNSIGNED_SHORT;if(n===ec)return s.INT;if(n===Jn)return s.UNSIGNED_INT;if(n===Kn)return s.FLOAT;if(n===jn)return s.HALF_FLOAT;if(n===Yu)return s.ALPHA;if(n===Zu)return s.RGB;if(n===Qn)return s.RGBA;if(n===Bi)return s.DEPTH_COMPONENT;if(n===Gi)return s.DEPTH_STENCIL;if(n===Ju)return s.RED;if(n===sc)return s.RED_INTEGER;if(n===gs)return s.RG;if(n===rc)return s.RG_INTEGER;if(n===ac)return s.RGBA_INTEGER;if(n===Ja||n===Ka||n===ja||n===Qa)if(a===ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ja)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ka)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ja)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ja)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ka)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ja)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oc||n===lc||n===cc||n===hc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===oc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===lc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===cc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===hc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===uc||n===fc||n===dc||n===pc||n===mc||n===to||n===gc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===uc||n===fc)return a===ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===dc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===pc)return r.COMPRESSED_R11_EAC;if(n===mc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===to)return r.COMPRESSED_RG11_EAC;if(n===gc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===_c||n===xc||n===vc||n===yc||n===Mc||n===Sc||n===bc||n===wc||n===Ac||n===Tc||n===Ec||n===Cc||n===Rc||n===Pc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_c)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Mc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Sc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===bc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ac)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Tc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ec)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Cc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Rc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pc)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ic||n===Lc||n===Dc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ic)return a===ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Lc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Dc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nc||n===Uc||n===eo||n===Oc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Nc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Uc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===eo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Mb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sb=`
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

}`,Sf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new La(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Gn({vertexShader:Mb,fragmentShader:Sb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ln(new Vs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bf=class extends pi{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null,_=typeof XRWebGLBinding<"u",p=new Sf,g={},y=e.getContextAttributes(),w=null,M=null,b=[],T=[],x=new Pt,S=null,C=null,R=new pn;R.viewport=new Te;let L=new pn;L.viewport=new Te;let G=[R,L],O=new Jl,P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ft=b[J];return ft===void 0&&(ft=new Cr,b[J]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(J){let ft=b[J];return ft===void 0&&(ft=new Cr,b[J]=ft),ft.getGripSpace()},this.getHand=function(J){let ft=b[J];return ft===void 0&&(ft=new Cr,b[J]=ft),ft.getHandSpace()};function z(J){let ft=T.indexOf(J.inputSource);if(ft===-1)return;let At=b[ft];At!==void 0&&(At.update(J.inputSource,J.frame,c||a),At.dispatchEvent({type:J.type,data:J.inputSource}))}function N(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",Y);for(let J=0;J<b.length;J++){let ft=T[J];ft!==null&&(T[J]=null,b[J].disconnect(ft))}P=null,F=null,p.reset();for(let J in g)delete g[J];if(t.setRenderTarget(w),f=null,u=null,d=null,i=null,M=null,Ot.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(x.width,x.height,!1),C!==null){let J=C.camera;J.fov=C.fov,J.zoom=C.zoom,J.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Yt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Yt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(w=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",N),i.addEventListener("inputsourceschange",Y),y.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,Ut=null,_t=null;y.depth&&(_t=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,At=y.stencil?Gi:Bi,Ut=y.stencil?qs:Jn);let Bt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Bt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),M=new In(u.textureWidth,u.textureHeight,{format:Qn,type:wn,depthTexture:new zi(u.textureWidth,u.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let At={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,At),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new In(f.framebufferWidth,f.framebufferHeight,{format:Qn,type:wn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ot.setContext(i),Ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Y(J){for(let ft=0;ft<J.removed.length;ft++){let At=J.removed[ft],Ut=T.indexOf(At);Ut>=0&&(T[Ut]=null,b[Ut].disconnect(At))}for(let ft=0;ft<J.added.length;ft++){let At=J.added[ft],Ut=T.indexOf(At);if(Ut===-1){for(let Bt=0;Bt<b.length;Bt++)if(Bt>=T.length){T.push(At),Ut=Bt;break}else if(T[Bt]===null){T[Bt]=At,Ut=Bt;break}if(Ut===-1)break}let _t=b[Ut];_t&&_t.connect(At)}}function W(J,ft){ft===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ft.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let ft=J.near,At=J.far;p.texture!==null&&(p.depthNear>0&&(ft=p.depthNear),p.depthFar>0&&(At=p.depthFar)),O.near=L.near=R.near=ft,O.far=L.far=R.far=At,(P!==O.near||F!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),P=O.near,F=O.far),O.layers.mask=J.layers.mask|6,R.layers.mask=O.layers.mask&-5,L.layers.mask=O.layers.mask&-3;let Ut=J.parent,_t=O.cameras;W(O,Ut);for(let Bt=0;Bt<_t.length;Bt++)W(_t[Bt],Ut);O.projectionMatrix.copy(R.projectionMatrix),O.projectionMatrixInverse.copy(R.projectionMatrixInverse),C===null&&J.isPerspectiveCamera&&(C={camera:J,fov:J.fov,zoom:J.zoom}),K(J,O,Ut)};function K(J,ft,At){At===null?J.matrix.copy(ft.matrixWorld):(J.matrix.copy(At.matrixWorld),J.matrix.invert(),J.matrix.multiply(ft.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ft.projectionMatrix),J.projectionMatrixInverse.copy(ft.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=vl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(J){return g[J]};let Z=null;function dt(J,ft){if(h=ft.getViewerPose(c||a),m=ft,h!==null){let At=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Ut=!1;At.length!==O.cameras.length&&(O.cameras.length=0,Ut=!0);for(let zt=0;zt<At.length;zt++){let Zt=At[zt],Kt=null;if(f!==null)Kt=f.getViewport(Zt);else{let H=d.getViewSubImage(u,Zt);Kt=H.viewport,zt===0&&(t.setRenderTargetTextures(M,H.colorTexture,H.depthStencilTexture),t.setRenderTarget(M))}let at=G[zt];at===void 0&&(at=new pn,at.layers.enable(zt),at.viewport=new Te,G[zt]=at),at.matrix.fromArray(Zt.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(Zt.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),zt===0&&(O.matrix.copy(at.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ut===!0&&O.cameras.push(at)}let _t=i.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let zt=d.getDepthInformation(At[0]);zt&&zt.isValid&&zt.texture&&p.init(zt,i.renderState)}if(_t&&_t.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let zt=0;zt<At.length;zt++){let Zt=At[zt].camera;if(Zt){let Kt=g[Zt];Kt||(Kt=new La,g[Zt]=Kt);let at=d.getCameraImage(Zt);Kt.sourceTexture=at}}}}for(let At=0;At<b.length;At++){let Ut=T[At],_t=b[At];Ut!==null&&_t!==void 0&&_t.update(Ut,ft,c||a)}Z&&Z(J,ft),ft.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ft}),m=null}let Ot=new Km;Ot.setAnimationLoop(dt),this.setAnimationLoop=function(J){Z=J},this.dispose=function(){}}},bb=new Me,og=new jt;og.set(-1,0,0,0,1,0,0,0,1);function wb(s,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,rf(s)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,y,w,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),u(p,g),g.isMeshPhysicalMaterial&&f(p,g,M)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,y,w):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===gn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===gn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let y=t.get(g),w=y.envMap,M=y.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(bb.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(og),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,y,w){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*y,p.scale.value=w*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,y){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===gn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let y=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ab(s,t,e,n){let i={},r={};function a(y,w){let M=w.program;n.uniformBlockBinding(y,M,i[y.id])}function o(y,w){let M=i[y.id];M===void 0&&(m(y),M=l(y),i[y.id]=M,y.addEventListener("dispose",p));let b=w.program;n.updateUBOMapping(y,b);let T=t.render.frame;r[y.id]!==T&&(c(y),r[y.id]=T)}function l(y){let w=s.createBuffer(),M=y.__size,b=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,M,b),s.bindBuffer(s.UNIFORM_BUFFER,null),w}function c(y){let w=i[y.id],M=y.uniforms,b=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let T=0,x=M.length;T<x;T++){let S=M[T];if(Array.isArray(S))for(let C=0,R=S.length;C<R;C++)h(S[C],T,C,b);else h(S,T,0,b)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(y,w,M,b){if(u(y,w,M,b)===!0){let T=y.__offset,x=y.value;if(Array.isArray(x)){let S=0;for(let C=0;C<x.length;C++){let R=x[C],L=_(R,!0);d(R,y.__data,S),S+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else d(x,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,y.__data)}}function d(y,w,M){typeof y=="number"||typeof y=="boolean"?w[M]=y:y.isMatrix3?(w[M]=y.elements[0],w[M+1]=y.elements[1],w[M+2]=y.elements[2],w[M+3]=0,w[M+4]=y.elements[3],w[M+5]=y.elements[4],w[M+6]=y.elements[5],w[M+7]=0,w[M+8]=y.elements[6],w[M+9]=y.elements[7],w[M+10]=y.elements[8],w[M+11]=0):ArrayBuffer.isView(y)?w.set(y.subarray(0,w.length-M),M):y.toArray(w,M)}function u(y,w,M,b){let T=y.value,x=w+"_"+M;if(Array.isArray(T)){b[x]===void 0&&(b[x]=[]);let S=b[x],C=!1;for(let R=0;R<T.length;R++)f(T[R],S,R)===!0&&(C=!0);return C}return f(T,b,x)}function f(y,w,M){if(w[M]===void 0)return typeof y=="number"||typeof y=="boolean"?w[M]=y:ArrayBuffer.isView(y)?w[M]=y.slice():w[M]=y.clone(),!0;{let b=w[M];if(typeof y=="number"||typeof y=="boolean"){if(b!==y)return w[M]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(b.equals(y)===!1)return b.copy(y),!0}}return!1}function m(y){let w=y.uniforms,M=0,b=16;for(let x=0,S=w.length;x<S;x++){let C=Array.isArray(w[x])?w[x]:[w[x]];for(let R=0,L=C.length;R<L;R++){let G=C[R],O=Array.isArray(G.value)?G.value:[G.value],P=Array.isArray(w[x])||Array.isArray(G.value),F=M;for(let N=0,Y=O.length;N<Y;N++){let W=O[N],K=_(W,P),Z=M%b,dt=Z%K.boundary,Ot=Z+dt;M+=dt,Ot!==0&&b-Ot<K.storage&&(M+=b-Ot),N===0&&(F=M),M+=K.storage}let z=G.type==="int"?Int32Array:G.type==="uint"?Uint32Array:Float32Array;G.__data=new z((M-F)/Float32Array.BYTES_PER_ELEMENT),G.__offset=F}}let T=M%b;return T>0&&(M+=b-T),y.__size=M,y.__cache={},this}function _(y,w){let M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=16,M.storage=48):y.isMatrix4?(M.boundary=16,M.storage=64):y.isTexture?Yt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(M.boundary=16,M.storage=y.byteLength):Yt("WebGLRenderer: Unsupported uniform value type.",y),w===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function p(y){let w=y.target;w.removeEventListener("dispose",p),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function g(){for(let y in i)s.deleteBuffer(i[y]);i={},r={}}return{bind:a,update:o,dispose:g}}var Tb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),xi=null;function Eb(){return xi===null&&(xi=new wl(Tb,16,16,gs,jn),xi.name="DFG_LUT",xi.minFilter=mn,xi.magFilter=mn,xi.wrapS=fi,xi.wrapT=fi,xi.generateMipmaps=!1,xi.needsUpdate=!0),xi}var Vc=class{constructor(t={}){let{canvas:e=_m(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=wn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=f,p=new Set([ac,rc,sc]),g=new Set([wn,Jn,Gr,qs,nc,ic]),y=new Uint32Array(4),w=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},b=null,T=null,x=[],S=[],C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,L=!1,G=null,O=null,P=null,F=null;this._outputColorSpace=dn;let z=0,N=0,Y=null,W=-1,K=null,Z=new Te,dt=new Te,Ot=null,J=new te(0),ft=0,At=e.width,Ut=e.height,_t=1,Bt=null,ee=null,zt=new Te(0,0,At,Ut),Zt=new Te(0,0,At,Ut),Kt=!1,at=new us,H=new Al,it=!1,ct=!1,B=new Me,ot=new V,ut=new Te,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},It=!1;function Xt(){return Y===null?_t:1}let D=n;function de(A,U){return e.getContext(A,U)}let et,vt,nt,Et,mt,yt,E,v,k,lt,st,gt,xt,q,Q,pt,I,rt,tt,bt,St,wt,Ht;try{let A={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",$t,!1),e.addEventListener("webglcontextrestored",ne,!1),e.addEventListener("webglcontextcreationerror",Lt,!1),D===null){let U="webgl2";if(D=de(U,A),D===null)throw de(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ie()}catch(A){throw e.removeEventListener("webglcontextlost",$t,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Lt,!1),Jt("WebGLRenderer: "+A.message),A}function ie(){et=new BM(D),et.init(),St=new yb(D,et),vt=new EM(D,et,t,St),nt=new xb(D,et),vt.reversedDepthBuffer&&u&&nt.buffers.depth.setReversed(!0),O=D.createFramebuffer(),P=D.createFramebuffer(),F=D.createFramebuffer(),Et=new VM(D),mt=new sb,yt=new vb(D,et,nt,mt,vt,St,Et),E=new FM(R),v=new Hx(D),wt=new AM(D,v),k=new kM(D,v,Et,wt),lt=new HM(D,k,v,wt,Et),rt=new GM(D,vt,yt),Q=new CM(mt),st=new ib(R,E,et,vt,wt,Q),gt=new wb(R,mt),xt=new ab,q=new fb(et),I=new wM(R,E,nt,lt,m,l),pt=new _b(R,lt,vt),Ht=new Ab(D,Et,vt,nt),tt=new TM(D,et,Et),bt=new zM(D,et,Et),Et.programs=st.programs,R.capabilities=vt,R.extensions=et,R.properties=mt,R.renderLists=xt,R.shadowMap=pt,R.state=nt,R.info=Et}_!==wn&&(C=new XM(_,e.width,e.height,o,i,r));let Mt=new bf(R,D);this.xr=Mt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let A=et.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=et.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return _t},this.setPixelRatio=function(A){A!==void 0&&(_t=A,this.setSize(At,Ut,!1))},this.getSize=function(A){return A.set(At,Ut)},this.setSize=function(A,U,j=!0){if(Mt.isPresenting){Yt("WebGLRenderer: Can't change size while VR device is presenting.");return}At=A,Ut=U,e.width=Math.floor(A*_t),e.height=Math.floor(U*_t),j===!0&&(e.style.width=A+"px",e.style.height=U+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,A,U)},this.getDrawingBufferSize=function(A){return A.set(At*_t,Ut*_t).floor()},this.setDrawingBufferSize=function(A,U,j){At=A,Ut=U,_t=j,e.width=Math.floor(A*j),e.height=Math.floor(U*j),this.setViewport(0,0,A,U)},this.setEffects=function(A){if(_===wn){Jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let U=0;U<A.length;U++)if(A[U].isOutputPass===!0){Yt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(Z)},this.getViewport=function(A){return A.copy(zt)},this.setViewport=function(A,U,j,X){A.isVector4?zt.set(A.x,A.y,A.z,A.w):zt.set(A,U,j,X),nt.viewport(Z.copy(zt).multiplyScalar(Xt()).round())},this.getScissor=function(A){return A.copy(Zt)},this.setScissor=function(A,U,j,X){A.isVector4?Zt.set(A.x,A.y,A.z,A.w):Zt.set(A,U,j,X),nt.scissor(dt.copy(Zt).multiplyScalar(Xt()).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(A){nt.setScissorTest(Kt=A)},this.setOpaqueSort=function(A){Bt=A},this.setTransparentSort=function(A){ee=A},this.getClearColor=function(A){return A.copy(I.getClearColor())},this.setClearColor=function(){I.setClearColor(...arguments)},this.getClearAlpha=function(){return I.getClearAlpha()},this.setClearAlpha=function(){I.setClearAlpha(...arguments)},this.clear=function(A=!0,U=!0,j=!0){let X=0;if(A){let $=!1;if(Y!==null){let Rt=Y.texture.format;$=p.has(Rt)}if($){let Rt=Y.texture.type,kt=g.has(Rt),Ct=I.getClearColor(),Nt=I.getClearAlpha(),Wt=Ct.r,Qt=Ct.g,oe=Ct.b;kt?(y[0]=Wt,y[1]=Qt,y[2]=oe,y[3]=Nt,D.clearBufferuiv(D.COLOR,0,y)):(w[0]=Wt,w[1]=Qt,w[2]=oe,w[3]=Nt,D.clearBufferiv(D.COLOR,0,w))}else X|=D.COLOR_BUFFER_BIT}U&&(X|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(X|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&D.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),G=A},this.dispose=function(){e.removeEventListener("webglcontextlost",$t,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Lt,!1),I.dispose(),xt.dispose(),q.dispose(),yt.dispose(),mt.dispose(),E.dispose(),lt.dispose(),k.dispose(),wt.dispose(),Ht.dispose(),st.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",Vf),Mt.removeEventListener("sessionend",Gf),ys.stop()};function $t(A){A.preventDefault(),ef("WebGLRenderer: Context Lost."),L=!0}function ne(){ef("WebGLRenderer: Context Restored."),L=!1;let A=Et.autoReset,U=pt.enabled,j=pt.autoUpdate,X=pt.needsUpdate,$=pt.type;ie(),Et.autoReset=A,pt.enabled=U,pt.autoUpdate=j,pt.needsUpdate=X,pt.type=$}function Lt(A){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function _e(A){let U=A.target;U.removeEventListener("dispose",_e),Xe(U)}function Xe(A){qi(A),mt.remove(A)}function qi(A){let U=mt.get(A).programs;U!==void 0&&(U.forEach(function(j){st.releaseProgram(j)}),A.isShaderMaterial&&st.releaseShaderCache(A))}this.renderBufferDirect=function(A,U,j,X,$,Rt){U===null&&(U=Tt);let kt=$.isMesh&&$.matrixWorld.determinantAffine()<0,Ct=Gg(A,U,j,X,$);nt.setMaterial(X,kt);let Nt=j.index,Wt=1;if(X.wireframe===!0){if(Nt=k.getWireframeAttribute(j),Nt===void 0)return;Wt=2}let Qt=j.drawRange,oe=j.attributes.position,Vt=Qt.start*Wt,le=(Qt.start+Qt.count)*Wt;Rt!==null&&(Vt=Math.max(Vt,Rt.start*Wt),le=Math.min(le,(Rt.start+Rt.count)*Wt)),Nt!==null?(Vt=Math.max(Vt,0),le=Math.min(le,Nt.count)):oe!=null&&(Vt=Math.max(Vt,0),le=Math.min(le,oe.count));let ze=le-Vt;if(ze<0||ze===1/0)return;wt.setup($,X,Ct,j,Nt);let be,ve=tt;if(Nt!==null&&(be=v.get(Nt),ve=bt,ve.setIndex(be)),$.isMesh)X.wireframe===!0?(nt.setLineWidth(X.wireframeLinewidth*Xt()),ve.setMode(D.LINES)):ve.setMode(D.TRIANGLES);else if($.isLine){let tn=X.linewidth;tn===void 0&&(tn=1),nt.setLineWidth(tn*Xt()),$.isLineSegments?ve.setMode(D.LINES):$.isLineLoop?ve.setMode(D.LINE_LOOP):ve.setMode(D.LINE_STRIP)}else $.isPoints?ve.setMode(D.POINTS):$.isSprite&&ve.setMode(D.TRIANGLES);if($.isBatchedMesh)if(et.get("WEBGL_multi_draw"))ve.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let tn=$._multiDrawStarts,Gt=$._multiDrawCounts,hn=$._multiDrawCount,me=Nt?v.get(Nt).bytesPerElement:1,Ms=mt.get(X).currentProgram.getUniforms();for(let en=0;en<hn;en++)Ms.setValue(D,"_gl_DrawID",en),ve.render(tn[en]/me,Gt[en])}else if($.isInstancedMesh)ve.renderInstances(Vt,ze,$.count);else if(j.isInstancedBufferGeometry){let tn=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Gt=Math.min(j.instanceCount,tn);ve.renderInstances(Vt,ze,Gt)}else ve.render(Vt,ze)};function zf(A,U,j,X){G!==null&&A.isNodeMaterial&&G.setObject(X,A),it===!0&&Q.setState(A,j,!1),A.transparent===!0&&A.side===gi&&A.forceSinglePass===!1?(A.side=gn,A.needsUpdate=!0,Zr(A,U,X),A.side=ms,A.needsUpdate=!0,Zr(A,U,X),A.side=gi):Zr(A,U,X)}this.compile=function(A,U,j=null){j===null&&(j=A),G!==null&&G.renderStart(A,U,j),T=q.get(j),T.init(U),S.push(T),j.traverseVisible(function($){$.isLight&&$.layers.test(U.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),A!==j&&A.traverseVisible(function($){$.isLight&&$.layers.test(U.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),T.setupLights(),G!==null&&G.updateLights(T.state.lightsArray),ct=this.localClippingEnabled,it=Q.init(this.clippingPlanes,ct),it===!0&&Q.setGlobalState(this.clippingPlanes,U),G!==null&&pt.render(T.state.shadowsArray,j,U);let X=new Set;return A.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let Rt=$.material;if(Rt)if(Array.isArray(Rt))for(let kt=0;kt<Rt.length;kt++){let Ct=Rt[kt];zf(Ct,j,U,$),X.add(Ct)}else zf(Rt,j,U,$),X.add(Rt)}),T=S.pop(),G!==null&&G.renderEnd(),X},this.compileAsync=function(A,U,j=null){let X=this.compile(A,U,j);return new Promise($=>{function Rt(){if(X.forEach(function(kt){let Nt=mt.get(kt).currentProgram;(Nt===void 0||Nt.isReady())&&X.delete(kt)}),X.size===0){$(A);return}setTimeout(Rt,10)}et.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let eh=null;function zg(A){eh&&eh(A)}function Vf(){ys.stop()}function Gf(){ys.start()}let ys=new Km;ys.setAnimationLoop(zg),typeof self<"u"&&ys.setContext(self),this.setAnimationLoop=function(A){eh=A,Mt.setAnimationLoop(A),A===null?ys.stop():ys.start()},Mt.addEventListener("sessionstart",Vf),Mt.addEventListener("sessionend",Gf),this.render=function(A,U){if(U!==void 0&&U.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;G!==null&&G.renderStart(A,U);let j=Mt.enabled===!0&&Mt.isPresenting===!0,X=C!==null&&(Y===null||j)&&C.begin(R,Y);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(U),U=Mt.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,U,Y),T=q.get(A,S.length),T.init(U),T.state.textureUnits=yt.getTextureUnits(),S.push(T),B.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?H.setFromArrayCamera(U):at.setFromProjectionMatrix(B,Vn,U.reversedDepth),ct=this.localClippingEnabled,it=Q.init(this.clippingPlanes,ct),b=xt.get(A,x.length),b.init(),x.push(b),this.info.render.frame++,Mt.enabled===!0&&Mt.isPresenting===!0){let kt=R.xr.getDepthSensingMesh();kt!==null&&nh(kt,U,-1/0,R.sortObjects)}nh(A,U,0,R.sortObjects),b.finish(),G!==null&&G.updateLights(T.state.lightsArray),R.sortObjects===!0&&b.sort(Bt,ee),It=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,It&&I.addToRenderList(b,A),this.info.autoReset===!0&&this.info.reset(),it===!0&&Q.beginShadows();let $=T.state.shadowsArray;if(pt.render($,A,U),it===!0&&Q.endShadows(),(X&&C.hasRenderPass())===!1){let kt=b.opaque,Ct=b.transmissive;if(T.setupLights(),U.isArrayCamera){let Nt=U.cameras;if(Ct.length>0)for(let Wt=0,Qt=Nt.length;Wt<Qt;Wt++){let oe=Nt[Wt];Wf(kt,Ct,A,oe)}It&&I.render(A);for(let Wt=0,Qt=Nt.length;Wt<Qt;Wt++){let oe=Nt[Wt];Hf(b,A,oe,oe.viewport)}}else Ct.length>0&&Wf(kt,Ct,A,U),It&&I.render(A),Hf(b,A,U)}Y!==null&&N===0&&(yt.updateMultisampleRenderTarget(Y),yt.updateRenderTargetMipmap(Y)),X&&C.end(R),A.isScene===!0&&A.onAfterRender(R,A,U),wt.resetDefaultState(),W=-1,K=null,S.pop(),S.length>0?(T=S[S.length-1],yt.setTextureUnits(T.state.textureUnits),it===!0&&Q.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?b=x[x.length-1]:b=null,G!==null&&G.renderEnd()};function nh(A,U,j,X){if(A.visible===!1)return;if(A.layers.test(U.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(U);else if(A.isLight)T.pushLight(A),A.castShadow&&T.pushShadow(A);else if(A.isSprite){let kt=U.isArrayCamera?H:at;if(!A.frustumCulled||A.intersectsFrustum(kt)){X&&ut.setFromMatrixPosition(A.matrixWorld).applyMatrix4(B);let Ct=lt.update(A),Nt=A.material;Nt.visible&&b.push(A,Ct,Nt,j,ut.z,null,U)}}else if(A.isMesh||A.isLine||A.isPoints){let kt=U.isArrayCamera?H:at;if(!A.frustumCulled||A.intersectsFrustum(kt)){let Ct=lt.update(A),Nt=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ut.copy(A.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),ut.copy(Ct.boundingSphere.center)),ut.applyMatrix4(A.matrixWorld).applyMatrix4(B)),Array.isArray(Nt)){let Wt=Ct.groups;for(let Qt=0,oe=Wt.length;Qt<oe;Qt++){let Vt=Wt[Qt],le=Nt[Vt.materialIndex];le&&le.visible&&b.push(A,Ct,le,j,ut.z,Vt,U)}}else Nt.visible&&b.push(A,Ct,Nt,j,ut.z,null,U)}}}let Rt=A.children;for(let kt=0,Ct=Rt.length;kt<Ct;kt++)nh(Rt[kt],U,j,X)}function Hf(A,U,j,X){let{opaque:$,transmissive:Rt,transparent:kt}=A;T.setupLightsView(j),it===!0&&Q.setGlobalState(R.clippingPlanes,j),X&&nt.viewport(Z.copy(X)),$.length>0&&po($,U,j),Rt.length>0&&po(Rt,U,j),kt.length>0&&po(kt,U,j),nt.buffers.depth.setTest(!0),nt.buffers.depth.setMask(!0),nt.buffers.color.setMask(!0),nt.setPolygonOffset(!1)}function Wf(A,U,j,X){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[X.id]===void 0){let Vt=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[X.id]=new In(1,1,{generateMipmaps:!0,type:Vt?jn:wn,minFilter:Vi,samples:Math.max(4,vt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let Rt=T.state.transmissionRenderTarget[X.id],kt=X.viewport||Z;Rt.setSize(kt.z*R.transmissionResolutionScale,kt.w*R.transmissionResolutionScale);let Ct=R.getRenderTarget(),Nt=R.getActiveCubeFace(),Wt=R.getActiveMipmapLevel();R.setRenderTarget(Rt),R.getClearColor(J),ft=R.getClearAlpha(),ft<1&&R.setClearColor(16777215,.5),R.clear(),It&&I.render(j);let Qt=R.toneMapping;R.toneMapping=_i;let oe=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),T.setupLightsView(X),it===!0&&Q.setGlobalState(R.clippingPlanes,X),po(A,j,X),yt.updateMultisampleRenderTarget(Rt),yt.updateRenderTargetMipmap(Rt),et.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let le=0,ze=U.length;le<ze;le++){let be=U[le],{object:ve,geometry:tn,material:Gt,group:hn}=be;if(Gt.side===gi&&ve.layers.test(X.layers)){let me=Gt.side;Gt.side=gn,Gt.needsUpdate=!0,Xf(ve,j,X,tn,Gt,hn),Gt.side=me,Gt.needsUpdate=!0,Vt=!0}}Vt===!0&&(yt.updateMultisampleRenderTarget(Rt),yt.updateRenderTargetMipmap(Rt))}R.setRenderTarget(Ct,Nt,Wt),R.setClearColor(J,ft),oe!==void 0&&(X.viewport=oe),R.toneMapping=Qt}function po(A,U,j){let X=U.isScene===!0?U.overrideMaterial:null;for(let $=0,Rt=A.length;$<Rt;$++){let kt=A[$],{object:Ct,geometry:Nt,group:Wt}=kt,Qt=kt.material;Qt.allowOverride===!0&&X!==null&&(Qt=X),Ct.layers.test(j.layers)&&Xf(Ct,U,j,Nt,Qt,Wt)}}function Xf(A,U,j,X,$,Rt){G!==null&&$.isNodeMaterial&&G.setObject(A,$),A.onBeforeRender(R,U,j,X,$,Rt),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),$.onBeforeRender(R,U,j,X,A,Rt),$.transparent===!0&&$.side===gi&&$.forceSinglePass===!1?($.side=gn,$.needsUpdate=!0,R.renderBufferDirect(j,U,X,$,A,Rt),$.side=ms,$.needsUpdate=!0,R.renderBufferDirect(j,U,X,$,A,Rt),$.side=gi):R.renderBufferDirect(j,U,X,$,A,Rt),A.onAfterRender(R,U,j,X,$,Rt)}function qf(A){let U=0;for(let j of A)j.texture!==null&&U++;return U}function Zr(A,U,j){U.isScene!==!0&&(U=Tt);let X=mt.get(A),$=T.state.lights,Rt=T.state.shadowsArray,kt=$.state.version,Ct=st.getParameters(A,$.state,Rt,U,j,T.state.lightProbeGridArray),Nt=st.getProgramCacheKey(Ct),Wt=X.programs;X.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?U.environment:null,X.fog=U.fog;let Qt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;X.envMap=E.get(A.envMap||X.environment,Qt),X.envMapRotation=X.environment!==null&&A.envMap===null?U.environmentRotation:A.envMapRotation,Wt===void 0&&(A.addEventListener("dispose",_e),Wt=new Map,X.programs=Wt,X.programVariants=new Map);let oe=Wt.get(Nt);if(oe!==void 0){if(X.currentProgram===oe&&X.lightsStateVersion===kt)return Yf(A,Ct),oe}else Ct.uniforms=st.getUniforms(A),G!==null&&A.isNodeMaterial&&G.build(A,j,Ct),A.onBeforeCompile(Ct,R),oe=st.acquireProgram(Ct,Nt),Wt.set(Nt,oe),X.uniforms=Ct.uniforms;let Vt=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Vt.clippingPlanes=Q.uniform),Yf(A,Ct),X.needsLights=Wg(A),X.lightsStateVersion=kt,X.needsLights&&(Vt.ambientLightColor.value=$.state.ambient,Vt.lightProbe.value=$.state.probe,Vt.sunLights.value=$.state.sun,Vt.sunLightShadows.value=$.state.sunShadow,Vt.directionalLights.value=$.state.directional,Vt.directionalLightShadows.value=$.state.directionalShadow,Vt.spotLights.value=$.state.spot,Vt.spotLightShadows.value=$.state.spotShadow,Vt.rectAreaLights.value=$.state.rectArea,Vt.ltc_1.value=$.state.rectAreaLTC1,Vt.ltc_2.value=$.state.rectAreaLTC2,Vt.pointLights.value=$.state.point,Vt.pointLightShadows.value=$.state.pointShadow,Vt.hemisphereLights.value=$.state.hemi,Vt.sunShadowMatrix.value=$.state.sunShadowMatrix,Vt.sunShadowCascade.value=$.state.sunShadowCascade,Vt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Vt.spotLightMatrix.value=$.state.spotLightMatrix,Vt.spotLightMap.value=$.state.spotLightMap,Vt.pointShadowMatrix.value=$.state.pointShadowMatrix),X.numLightProbeGrids=qf(T.state.lightProbeGridArray),X.currentProgram=oe,X.uniformsList=null,oe}function Vg(A,U,j,X,$){let Rt=mt.get(A),kt=Rt.currentProgram.id+","+X+","+$,Ct=Rt.programVariants.get(kt);return Ct===void 0?(Ct=Zr(A,U,j),Rt.programVariants.set(kt,Ct)):(Rt.currentProgram=Ct,Rt.uniformsList=null,Rt.outputColorSpace=X,Rt.toneMapping=$),Ct}function $f(A){if(A.uniformsList===null){let U=A.currentProgram.getUniforms();A.uniformsList=Wr.seqWithValue(U.seq,A.uniforms)}return A.uniformsList}function Yf(A,U){let j=mt.get(A);j.outputColorSpace=U.outputColorSpace,j.batching=U.batching,j.batchingColor=U.batchingColor,j.instancing=U.instancing,j.instancingColor=U.instancingColor,j.instancingMorph=U.instancingMorph,j.skinning=U.skinning,j.morphTargets=U.morphTargets,j.morphNormals=U.morphNormals,j.morphColors=U.morphColors,j.morphTargetsCount=U.morphTargetsCount,j.numClippingPlanes=U.numClippingPlanes,j.numIntersection=U.numClipIntersection,j.vertexAlphas=U.vertexAlphas,j.vertexTangents=U.vertexTangents,j.toneMapping=U.toneMapping}function Gg(A,U,j,X,$){U.isScene!==!0&&(U=Tt),yt.resetTextureUnits();let Rt=U.fog,kt=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?U.environment:null,Ct=Y===null?R.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ce.workingColorSpace,Nt=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Wt=E.get(X.envMap||kt,Nt),Qt=X.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,oe=!!j.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Vt=!!j.morphAttributes.position,le=!!j.morphAttributes.normal,ze=!!j.morphAttributes.color,be=_i;X.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(be=R.toneMapping);let ve=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,tn=ve!==void 0?ve.length:0,Gt=mt.get(X),hn=T.state.lights;if(it===!0&&(ct===!0||A!==K)){let Ce=A===K&&X.id===W;Q.setState(X,A,Ce)}let me=!1,Ms=!1;X.version===Gt.__version?Gt.needsLights&&Gt.lightsStateVersion!==hn.state.version||$.isBatchedMesh&&Gt.batching===!1||!$.isBatchedMesh&&Gt.batching===!0||$.isBatchedMesh&&Gt.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Gt.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Gt.instancing===!1||!$.isInstancedMesh&&Gt.instancing===!0||$.isSkinnedMesh&&Gt.skinning===!1||!$.isSkinnedMesh&&Gt.skinning===!0||$.isInstancedMesh&&Gt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Gt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Gt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Gt.instancingMorph===!1&&$.morphTexture!==null||Gt.envMap!==Wt||X.fog===!0&&Gt.fog!==Rt||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==Q.numPlanes||Gt.numIntersection!==Q.numIntersection)||Gt.vertexAlphas!==Qt||Gt.vertexTangents!==oe||Gt.morphTargets!==Vt||Gt.morphNormals!==le||Gt.morphColors!==ze||Gt.morphTargetsCount!==tn||Gt.numLightProbeGrids!==qf(T.state.lightProbeGridArray)?me=!0:(Gt.outputColorSpace!==Ct||Gt.toneMapping!==be)&&(Ms=!0):(me=!0,Gt.__version=X.version);let en=Gt.currentProgram;(me===!0||Ms===!0)&&(en=Ms===!0?Vg(X,U,$,Ct,be):Zr(X,U,$),G&&X.isNodeMaterial&&G.onUpdateProgram(X,en,Gt));let mo=!1,$i=!1,Ss=!1,pe=en.getUniforms(),Je=Gt.uniforms;if(nt.useProgram(en.program)&&(mo=!0,$i=!0,Ss=!0),X.id!==W&&(W=X.id,$i=!0),mo||K!==A){nt.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),pe.setValue(D,"projectionMatrix",A.projectionMatrix),pe.setValue(D,"viewMatrix",A.matrixWorldInverse);let qe=pe.map.cameraPosition;qe!==void 0&&qe.setValue(D,ot.setFromMatrixPosition(A.matrixWorld)),vt.logarithmicDepthBuffer&&pe.setValue(D,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&pe.setValue(D,"isOrthographic",A.isOrthographicCamera===!0),K!==A&&(K=A,$i=!0,Ss=!0)}if(Gt.needsLights&&(hn.state.sunShadowMap.length>0&&pe.setValue(D,"sunShadowMap",hn.state.sunShadowMap,yt),hn.state.directionalShadowMap.length>0&&pe.setValue(D,"directionalShadowMap",hn.state.directionalShadowMap,yt),hn.state.spotShadowMap.length>0&&pe.setValue(D,"spotShadowMap",hn.state.spotShadowMap,yt),hn.state.pointShadowMap.length>0&&pe.setValue(D,"pointShadowMap",hn.state.pointShadowMap,yt)),$.isSkinnedMesh){pe.setOptional(D,$,"bindMatrix"),pe.setOptional(D,$,"bindMatrixInverse");let Ce=$.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),pe.setValue(D,"boneTexture",Ce.boneTexture,yt))}$.isBatchedMesh&&(pe.setOptional(D,$,"batchingTexture"),pe.setValue(D,"batchingTexture",$._matricesTexture,yt),pe.setOptional(D,$,"batchingIdTexture"),pe.setValue(D,"batchingIdTexture",$._indirectTexture,yt),pe.setOptional(D,$,"batchingColorTexture"),$._colorsTexture!==null&&pe.setValue(D,"batchingColorTexture",$._colorsTexture,yt));let Wn=j.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&rt.update($,j,en),($i||Gt.receiveShadow!==$.receiveShadow)&&(Gt.receiveShadow=$.receiveShadow,pe.setValue(D,"receiveShadow",$.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&U.environment!==null&&(Je.envMapIntensity.value=U.environmentIntensity),Je.dfgLUT!==void 0&&(Je.dfgLUT.value=Eb()),$i){if(pe.setValue(D,"toneMappingExposure",R.toneMappingExposure),Gt.needsLights&&Hg(Je,Ss),Rt&&X.fog===!0&&gt.refreshFogUniforms(Je,Rt),gt.refreshMaterialUniforms(Je,X,_t,Ut,T.state.transmissionRenderTarget[A.id]),Gt.needsLights&&Gt.numLightProbeGrids>0){let Ce=M,qe=0;for(let wi of T.state.lightProbeGridArray)wi.texture!==null&&(Ce.textures[qe]=wi.texture,Ce.min[qe]=wi.boundingBox.min,Ce.max[qe]=wi.boundingBox.max,Ce.resolution[qe]=wi.resolution,qe++);for(let wi in Ce)Ce[wi].length=qe;Je.probesSH.value=Ce.textures,Je.probesMin.value=Ce.min,Je.probesMax.value=Ce.max,Je.probesResolution.value=Ce.resolution}Wr.upload(D,$f(Gt),Je,yt)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Wr.upload(D,$f(Gt),Je,yt),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&pe.setValue(D,"center",$.center),pe.setValue(D,"modelViewMatrix",$.modelViewMatrix),pe.setValue(D,"normalMatrix",$.normalMatrix),pe.setValue(D,"modelMatrix",$.matrixWorld),X.uniformsGroups!==void 0){let Ce=X.uniformsGroups;for(let qe=0,wi=Ce.length;qe<wi;qe++){let Jf=Ce[qe];Ht.update(Jf,en),Ht.bind(Jf,en)}}return en}function Hg(A,U){A.ambientLightColor.needsUpdate=U,A.lightProbe.needsUpdate=U,A.sunLights.needsUpdate=U,A.sunLightShadows.needsUpdate=U,A.directionalLights.needsUpdate=U,A.directionalLightShadows.needsUpdate=U,A.pointLights.needsUpdate=U,A.pointLightShadows.needsUpdate=U,A.spotLights.needsUpdate=U,A.spotLightShadows.needsUpdate=U,A.rectAreaLights.needsUpdate=U,A.hemisphereLights.needsUpdate=U}function Wg(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(A,U,j){let X=mt.get(A);X.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),mt.get(A.texture).__webglTexture=U,mt.get(A.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:j,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,U){let j=mt.get(A);j.__webglFramebuffer=U,j.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(A,U=0,j=0){Y=A,z=U,N=j;let X=null,$=!1,Rt=!1;if(A){let Ct=mt.get(A);if(Ct.__useDefaultFramebuffer!==void 0){nt.bindFramebuffer(D.FRAMEBUFFER,Ct.__webglFramebuffer),Z.copy(A.viewport),dt.copy(A.scissor),Ot=A.scissorTest,nt.viewport(Z),nt.scissor(dt),nt.setScissorTest(Ot),W=-1;return}else if(Ct.__webglFramebuffer===void 0)yt.setupRenderTarget(A);else if(Ct.__hasExternalTextures)yt.rebindTextures(A,mt.get(A.texture).__webglTexture,mt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Qt=A.depthTexture;if(Ct.__boundDepthTexture!==Qt){if(Qt!==null&&mt.has(Qt)&&(A.width!==Qt.image.width||A.height!==Qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");yt.setupDepthRenderbuffer(A)}}let Nt=A.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(Rt=!0);let Wt=mt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Wt[U])?X=Wt[U][j]:X=Wt[U],$=!0):A.samples>0&&yt.useMultisampledRTT(A)===!1?X=mt.get(A).__webglMultisampledFramebuffer:Array.isArray(Wt)?X=Wt[j]:X=Wt,Z.copy(A.viewport),dt.copy(A.scissor),Ot=A.scissorTest}else Z.copy(zt).multiplyScalar(_t).floor(),dt.copy(Zt).multiplyScalar(_t).floor(),Ot=Kt;if(j!==0&&(X=O),nt.bindFramebuffer(D.FRAMEBUFFER,X)&&nt.drawBuffers(A,X),nt.viewport(Z),nt.scissor(dt),nt.setScissorTest(Ot),$){let Ct=mt.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ct.__webglTexture,j)}else if(Rt){let Ct=U;for(let Nt=0;Nt<A.textures.length;Nt++){let Wt=mt.get(A.textures[Nt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Nt,Wt.__webglTexture,j,Ct)}}else if(A!==null&&j!==0){let Ct=mt.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ct.__webglTexture,j)}W=-1};function Zf(A){let U=mt.get(A);return(U.__readFormat!==A.format||U.__readType!==A.type)&&(U.__readFormat=A.format,U.__readType=A.type,U.__formatReadable=vt.textureFormatReadable(A.format),U.__typeReadable=vt.textureTypeReadable(A.type)),U}this.readRenderTargetPixels=function(A,U,j,X,$,Rt,kt,Ct=0){if(!(A&&A.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=mt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&kt!==void 0&&(Nt=Nt[kt],Array.isArray(Nt)&&(Nt=Nt[0])),Nt){nt.bindFramebuffer(D.FRAMEBUFFER,Nt);try{let Wt=A.textures[Ct],Qt=Wt.format,oe=Wt.type;A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ct);let Vt=Zf(Wt);if(Vt.__formatReadable===!1){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Vt.__typeReadable===!1){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=A.width-X&&j>=0&&j<=A.height-$&&D.readPixels(U,j,X,$,St.convert(Qt),St.convert(oe),Rt)}finally{let Wt=Y!==null?mt.get(Y).__webglFramebuffer:null;nt.bindFramebuffer(D.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(A,U,j,X,$,Rt,kt,Ct=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=mt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&kt!==void 0&&(Nt=Nt[kt],Array.isArray(Nt)&&(Nt=Nt[0])),Nt)if(U>=0&&U<=A.width-X&&j>=0&&j<=A.height-$){nt.bindFramebuffer(D.FRAMEBUFFER,Nt);let Wt=A.textures[Ct],Qt=Wt.format,oe=Wt.type;A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ct);let Vt=Zf(Wt);if(Vt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Vt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,le),D.bufferData(D.PIXEL_PACK_BUFFER,Rt.byteLength,D.STREAM_READ),D.readPixels(U,j,X,$,St.convert(Qt),St.convert(oe),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let ze=Y!==null?mt.get(Y).__webglFramebuffer:null;nt.bindFramebuffer(D.FRAMEBUFFER,ze);let be=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await vm(D,be,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,le),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Rt),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(le),D.deleteSync(be),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,U=null,j=0){let X=Math.pow(2,-j),$=Math.floor(A.image.width*X),Rt=Math.floor(A.image.height*X),kt=U!==null?U.x:0,Ct=U!==null?U.y:0;yt.setTexture2D(A,0),D.copyTexSubImage2D(D.TEXTURE_2D,j,0,0,kt,Ct,$,Rt),nt.unbindTexture()},this.copyTextureToTexture=function(A,U,j=null,X=null,$=0,Rt=0){let kt,Ct,Nt,Wt,Qt,oe,Vt,le,ze,be=A.isCompressedTexture?A.mipmaps[Rt]:A.image;if(j!==null)kt=j.max.x-j.min.x,Ct=j.max.y-j.min.y,Nt=j.isBox3?j.max.z-j.min.z:1,Wt=j.min.x,Qt=j.min.y,oe=j.isBox3?j.min.z:0;else{let pe=Math.pow(2,-$);kt=Math.floor(be.width*pe),Ct=Math.floor(be.height*pe),A.isDataArrayTexture?Nt=be.depth:A.isData3DTexture?Nt=Math.floor(be.depth*pe):Nt=1,Wt=0,Qt=0,oe=0}X!==null?(Vt=X.x,le=X.y,ze=X.z):(Vt=0,le=0,ze=0);let ve=St.convert(U.format),tn=St.convert(U.type),Gt;U.isData3DTexture?(yt.setTexture3D(U,0),Gt=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(yt.setTexture2DArray(U,0),Gt=D.TEXTURE_2D_ARRAY):(yt.setTexture2D(U,0),Gt=D.TEXTURE_2D),nt.activeTexture(D.TEXTURE0),nt.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),nt.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),nt.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);let hn=nt.getParameter(D.UNPACK_ROW_LENGTH),me=nt.getParameter(D.UNPACK_IMAGE_HEIGHT),Ms=nt.getParameter(D.UNPACK_SKIP_PIXELS),en=nt.getParameter(D.UNPACK_SKIP_ROWS),mo=nt.getParameter(D.UNPACK_SKIP_IMAGES);nt.pixelStorei(D.UNPACK_ROW_LENGTH,be.width),nt.pixelStorei(D.UNPACK_IMAGE_HEIGHT,be.height),nt.pixelStorei(D.UNPACK_SKIP_PIXELS,Wt),nt.pixelStorei(D.UNPACK_SKIP_ROWS,Qt),nt.pixelStorei(D.UNPACK_SKIP_IMAGES,oe);let $i=A.isDataArrayTexture||A.isData3DTexture,Ss=U.isDataArrayTexture||U.isData3DTexture;if(A.isDepthTexture){let pe=mt.get(A),Je=mt.get(U),Wn=mt.get(pe.__renderTarget),Ce=mt.get(Je.__renderTarget);nt.bindFramebuffer(D.READ_FRAMEBUFFER,Wn.__webglFramebuffer),nt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let qe=0;qe<Nt;qe++)$i&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.get(A).__webglTexture,$,oe+qe),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.get(U).__webglTexture,Rt,ze+qe)),D.blitFramebuffer(Wt,Qt,Wt+kt,Qt+Ct,Vt,le,Vt+kt,le+Ct,D.DEPTH_BUFFER_BIT,D.NEAREST);nt.bindFramebuffer(D.READ_FRAMEBUFFER,null),nt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if($!==0||A.isRenderTargetTexture||mt.has(A)){let pe=mt.get(A),Je=mt.get(U);nt.bindFramebuffer(D.READ_FRAMEBUFFER,P),nt.bindFramebuffer(D.DRAW_FRAMEBUFFER,F);for(let Wn=0;Wn<Nt;Wn++)$i?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pe.__webglTexture,$,oe+Wn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pe.__webglTexture,$),Ss?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Je.__webglTexture,Rt,ze+Wn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Je.__webglTexture,Rt),$!==0?D.blitFramebuffer(Wt,Qt,Wt+kt,Qt+Ct,Vt,le,Vt+kt,le+Ct,D.COLOR_BUFFER_BIT,D.NEAREST):Ss?D.copyTexSubImage3D(Gt,Rt,Vt,le,ze+Wn,Wt,Qt,kt,Ct):D.copyTexSubImage2D(Gt,Rt,Vt,le,Wt,Qt,kt,Ct);nt.bindFramebuffer(D.READ_FRAMEBUFFER,null),nt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ss?A.isDataTexture||A.isData3DTexture?D.texSubImage3D(Gt,Rt,Vt,le,ze,kt,Ct,Nt,ve,tn,be.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Gt,Rt,Vt,le,ze,kt,Ct,Nt,ve,be.data):D.texSubImage3D(Gt,Rt,Vt,le,ze,kt,Ct,Nt,ve,tn,be):A.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Rt,Vt,le,kt,Ct,ve,tn,be.data):A.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Rt,Vt,le,be.width,be.height,ve,be.data):D.texSubImage2D(D.TEXTURE_2D,Rt,Vt,le,kt,Ct,ve,tn,be);nt.pixelStorei(D.UNPACK_ROW_LENGTH,hn),nt.pixelStorei(D.UNPACK_IMAGE_HEIGHT,me),nt.pixelStorei(D.UNPACK_SKIP_PIXELS,Ms),nt.pixelStorei(D.UNPACK_SKIP_ROWS,en),nt.pixelStorei(D.UNPACK_SKIP_IMAGES,mo),Rt===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&D.generateMipmap(Gt),nt.unbindTexture()},this.initRenderTarget=function(A){mt.get(A).__webglFramebuffer===void 0&&yt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?yt.setTextureCube(A,0):A.isData3DTexture?yt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?yt.setTexture2DArray(A,0):yt.setTexture2D(A,0),nt.unbindTexture()},this.resetState=function(){z=0,N=0,Y=null,nt.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}};var ti={ink:"#07090d",bg:"#14161b",text:"#eef0f3",muted:"#9aa1ad",amber:"#f5a524",gold:"#ffcf7a",field:"#5fb37c",sky:"#5fb3ff",blue:"#4ea1ff",coral:"#ff6b5e",origin:"#ffd28a",dest:"#9fd1ff"},Af=[["#f5a524","#3f9b6a"],["#f5a524","#ffcf7a"],["#d99a4a","#4a78c8"],["#3f9b6a","#4f9fe8"],["#e9b85a","#3d7fd9"],["#5fb37c","#e0b04a"],["#d99a4a","#4f9fe8"],["#2f9fb0","#5f6ee8"],["#f5a524","#c0603a"],["#7cc98f","#3f8fd0"],["#5fb37c","#3cc0b0"],["#5fb3ff","#3f9b6a"],["#8f9dff","#7cc98f"],["#ff8a6b","#c58a3a"],["#c58a3a","#3f9b8a"],["#f5a524","#8a6a3a"],["#f5a524","#5fb37c"]],ao=["#3b2a12","#8a5a17","#d98e1f","#f5a524","#ffd98a"],Wi={lo:"#4ea1ff",mid:"#3a404c",hi:"#f5a524",na:"#2f343e"},Wc=["#14301f","#1f5a3a","#3f9b6a","#7cc98f","#d4f2a8"],Xc=["#1a2c52","#24539a","#2f7fd6","#3fb0e6","#7fe0f0"],qc=["#6b4a2e","#a8582a","#e07a3a","#ff9a5a","#ffd9b0"],lg=["#2b4a8f","#2f86c9","#2fb3a8","#9cc56a","#f5a524"],_s=s=>{let t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},wf=s=>(s/=255,s<=.04045?s/12.92:((s+.055)/1.055)**2.4),Cb=s=>255*(s<=.0031308?s*12.92:1.055*s**(1/2.4)-.055);function Rb(s,t,e){let n=_s(s),i=_s(t);return n.map((r,a)=>Math.round(Cb(wf(r)+(wf(i[a])-wf(r))*e)))}function ei(s,t){t=Math.min(1,Math.max(0,t))*(s.length-1);let e=Math.min(s.length-2,Math.floor(t));return Rb(s[e],s[e+1],t-e)}var Ne=([s,t,e],n=1)=>n===1?`rgb(${s},${t},${e})`:`rgba(${s},${t},${e},${n})`;var cn=1920,Xi=1080,Pb=10,yi=.06,Ib=1.2,Hn=s=>new te(Array.isArray(s)?`rgb(${s.join(",")})`:s),Tf=s=>s<=0?0:s>=1?1:s*s*(3-2*s);function Lb(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function Ef(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function Db(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}var Nb=`
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
}`,Ub=`
uniform float uAlpha; varying vec3 vColor; varying float vA;
void main(){
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r); a *= a;
  gl_FragColor = vec4(vColor, a * vA * uAlpha);
  #include <colorspace_fragment>
}`;function cg(s,t){let e=new Vc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.setClearColor(0,0),e.toneMapping=Ya,e.toneMappingExposure=1,e.outputColorSpace=dn,e.shadowMap.enabled=!0,e.shadowMap.type=Gs;let n=new Ta,i=new pn(30,cn/Xi,1,200),r=Pb/t.Q,a=(B,ot)=>[B*r,ot*r];n.add(new Ha(14674175,1709064,.9)),n.add(new qa(16777215,.18));let o=new Fr(16773596,2.6);o.position.set(-7,-11,17),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:50}),o.shadow.bias=-4e-4,n.add(o);let l=new Fr(9419519,.9);l.position.set(9,12,6),n.add(l);let c=new Ln(new Vs(60,60),new Va({opacity:.42,transparent:!0}));c.receiveShadow=!0,n.add(c);let h=Math.max(...Object.values(t.land.v).filter(Boolean)),d={cap:Hn("#1f242d"),side:Hn("#14171d")},u=Math.max(...Object.values(t.spots.dev)),f=Object.values(t.jikbul.v).sort((B,ot)=>B-ot),m=B=>{let ot=0,ut=f.length-1;for(;ot<ut;){let Tt=ot+ut>>1;f[Tt]<B?ot=Tt+1:ut=Tt}return .08+.92*(ot/(f.length-1))},_=new Oi;n.add(_);let p=t.map.sigun.map(B=>{let ot=B.rings.map(([gt,...xt])=>{let q=pt=>pt.slice(0,-1).map(([rt,tt])=>new Pt(...a(rt,tt))),Q=new Dr(q(gt));return xt.forEach(pt=>Q.holes.push(new ks(q(pt)))),Q}),ut=new za(ot,{depth:1,bevelEnabled:!1,curveSegments:1}),Tt=t.land.v[B.key],It=Tt?Math.sqrt(Tt/h):0,Xt=Hn(Tt?ei(ao,.12+.88*It):"#2a2620"),D=t.rice.dev[B.key],de=D==null?Hn(Wi.na):Hn(Wi.mid).lerp(Hn(D<0?Wi.lo:Wi.hi),Math.min(1,Math.abs(D)/.05)**.8),et=t.jikbul.v[B.key],vt=Hn(et==null?"#262c28":ei(Wc,m(et))),nt=t.spots.dev[B.key]||0,Et=Hn(nt?ei(Xc,.1+.9*(nt/u)**1.3):"#1d2430"),mt=yi+1.9*(nt/u)**1.8,yt=new Ur({roughness:.58,metalness:.04,transparent:!0}),E=new Ur({roughness:.75,metalness:0,transparent:!0}),v=new Ln(ut,[yt,E]);v.castShadow=v.receiveShadow=!0,v.scale.z=yi,_.add(v);let[k,lt]=a(...B.c),st=Math.min(1,Math.max(0,(k+4)/9*.45+(lt+5)/10*.55));return{key:B.key,mesh:v,cap:yt,side:E,h:yi+(Ib-yi)*It,landCol:Xt,riceCol:de,jikCol:vt,devCol:Et,h2:mt,cx:k,cy:lt,delay:st,land:Tt,rings:B.rings}}),g=new Map(p.map(B=>[B.key,B])),y=(B,ot)=>{let ut=[];B.forEach(It=>{for(let Xt=1;Xt<It.length;Xt++)ut.push(...a(...It[Xt-1]),ot,...a(...It[Xt]),ot)});let Tt=new bn;return Tt.setAttribute("position",new De(ut,3)),Tt},w=new Bs({color:Hn("#cfd6e2"),transparent:!0,opacity:0,depthWrite:!1}),M=new Bs({color:Hn("#8d96a6"),transparent:!0,opacity:0,depthWrite:!1}),b=new Pr(y(t.map.lineSido,0),w),T=new Pr(y(t.map.lineSigun,0),M);b.renderOrder=T.renderOrder=2,_.add(b,T);let x=9e3,S=2400,C=Db(20261110),R=[],L=[],G=[],O=[],P=[],F=p.map(B=>(B.land||0)/Math.max(1e-6,B.rings.reduce((ot,ut)=>ot+Ef(ut[0]),0))),z=[...F].sort((B,ot)=>B-ot),N=B=>z.indexOf(B)/(z.length-1),Y=p.map(B=>B.rings.reduce((ot,ut)=>ot+Ef(ut[0]),0)**.85),W=Y.reduce((B,ot)=>B+ot,0),K=(B,ot,ut)=>{R.push(B,ot,.08);let Tt=9+C()*16,It=C()*Math.PI*2,Xt=(C()-.5)*Math.PI*.7;L.push(Tt*Math.cos(It)*Math.cos(Xt)*1.4,Tt*Math.sin(It)*Math.cos(Xt),4+Tt*Math.sin(Xt)*.6);let D=Math.hypot(B,ot)/6;G.push(Math.min(1,C()*.65+D*.35)),O.push(C()),P.push(ut.r,ut.g,ut.b)};p.forEach((B,ot)=>{let ut=Math.max(6,Math.round((x-S)*Y[ot]/W)),Tt=Hn(ei(ao,.35+.65*N(F[ot]))),It=B.rings.map(de=>de[0]),Xt=It.map(Ef),D=Xt.reduce((de,et)=>de+et,0);for(let de=0;de<ut;de++){let et=C()*D,vt=0;for(;et>Xt[vt]&&vt<It.length-1;)et-=Xt[vt++];let nt=It[vt],Et=1/0,mt=-1/0,yt=1/0,E=-1/0;nt.forEach(([v,k])=>{Et=Math.min(Et,v),mt=Math.max(mt,v),yt=Math.min(yt,k),E=Math.max(E,k)});for(let v=0;v<40;v++){let k=Et+C()*(mt-Et),lt=yt+C()*(E-yt);if(Lb(k,lt,nt)){K(...a(k,lt),Tt);break}}}});let Z=Hn("#ffe9c2"),dt=t.map.lineSido,Ot=dt.map(B=>B.reduce((ot,ut,Tt)=>Tt?ot+Math.hypot(ut[0]-B[Tt-1][0],ut[1]-B[Tt-1][1]):0,0)),J=Ot.reduce((B,ot)=>B+ot,0);for(let B=0;B<S;B++){let ot=C()*J,ut=0;for(;ot>Ot[ut]&&ut<dt.length-1;)ot-=Ot[ut++];let Tt=dt[ut];for(let It=1;It<Tt.length;It++){let Xt=Math.hypot(Tt[It][0]-Tt[It-1][0],Tt[It][1]-Tt[It-1][1]);if(ot<=Xt||It===Tt.length-1){let D=Xt?Math.min(1,ot/Xt):0;K(...a(Tt[It-1][0]+(Tt[It][0]-Tt[It-1][0])*D,Tt[It-1][1]+(Tt[It][1]-Tt[It-1][1])*D),Z);break}ot-=Xt}}let ft=new bn;ft.setAttribute("position",new De(R,3)),ft.setAttribute("aStart",new De(L,3)),ft.setAttribute("aDelay",new De(G,1)),ft.setAttribute("aSeed",new De(O,1)),ft.setAttribute("aColor",new De(P,3));let At=new Gn({vertexShader:Nb,fragmentShader:Ub,transparent:!0,depthWrite:!1,blending:$a,uniforms:{uMorph:{value:0},uTime:{value:0},uSize:{value:92},uScale:{value:1},uAlpha:{value:1}}}),Ut=new Ra(ft,At);Ut.frustumCulled=!1,Ut.renderOrder=3,n.add(Ut);let _t=new te,Bt=new te,ee=new V,zt=cn,Zt=Xi;function Kt(B,ot){zt=B,Zt=ot,e.setSize(B,ot,!1),At.uniforms.uScale.value=ot/Xi}function at(B,ot){let ut=B.tilt*.86,Tt=B.orbit,It=B.camDist,Xt=B.camX,D=-.4*B.tilt+B.camY;i.position.set(Xt+It*Math.sin(ut)*Math.sin(Tt),D-It*Math.sin(ut)*Math.cos(Tt),It*Math.cos(ut)),i.up.set(0,1,0),i.lookAt(Xt,D,0),i.setViewOffset(cn,Xi,-B.mapShift,-B.mapLift,cn,Xi),i.updateMatrixWorld();let de=B.mapAlpha>.001;_.visible=de,p.forEach(vt=>{let nt=Tf((B.rise-vt.delay*.5)/.5),Et=B.devRise>0?Tf((B.devRise-(1-vt.delay)*.5)/.5):0;vt.mesh.scale.z=yi+(vt.h-yi)*nt+(vt.h2-yi)*Et,_t.lerpColors(vt.landCol,vt.riceCol,B.riceColor).lerp(vt.jikCol,B.jikColor).lerp(vt.devCol,B.devColor).lerp(d.cap,B.mapDim),vt.cap.color.copy(_t),vt.cap.emissive.copy(_t).multiplyScalar(.16*(1-Math.min(1,B.mapDim))),Bt.copy(_t).multiplyScalar(.52).lerp(d.side,B.mapDim),vt.side.color.copy(Bt),vt.cap.opacity=vt.side.opacity=B.mapAlpha});let et=1-Tf(Math.max(B.rise,B.devRise)*1.6);b.position.z=yi+.004,T.position.z=yi+.003,w.opacity=B.mapAlpha*et*(.28+.4*B.mapDim),M.opacity=B.mapAlpha*et*(.1+.12*B.mapDim),c.material.opacity=.42*B.mapAlpha,At.uniforms.uMorph.value=B.morph,At.uniforms.uTime.value=ot,At.uniforms.uAlpha.value=B.pAlpha,Ut.visible=B.pAlpha>.001,s.style.opacity=B.glAlpha,B.glAlpha>.001&&e.render(n,i)}function H(B,ot,ut){return ee.set(B,ot,ut).project(i),[(ee.x+1)*.5*cn,(1-ee.y)*.5*Xi]}return{render:at,resize:Kt,project:H,top:B=>{let ot=g.get(B);return ot?[ot.cx,ot.cy,ot.mesh.scale.z]:null},world:(B,ot)=>a(B,ot),flat:yi,units:p,byKey:g,renderer:e}}var Ob=s=>s<0?0:s>1?1:s,Fb=s=>(s=Ob(s),s*s*(3-2*s)),Cf=s=>s-Math.floor(s),$c='"Pretendard Variable", Pretendard, system-ui, sans-serif';function hg(s,t,e){let n=s.getContext("2d"),i=1;function r(O,P){s.width=O,s.height=P,i=O/cn}let a=t.flows.top.slice(0,50).map(([O,P,F],z)=>({o:O,d:P,v:F,i:z,ph:Cf(z*.618)})),o=a[0].v,l=_s(ti.origin),c=_s(ti.dest),h=(O,P,F,z)=>{let N=1-z;return[N*N*O[0]+2*N*z*P[0]+z*z*F[0],N*N*O[1]+2*N*z*P[1]+z*z*F[1]]},d=O=>l.map((P,F)=>Math.round(P+(c[F]-P)*O));function u(O,P){let F=O.flowAlpha;if(F<=.002||O.flows<=.001)return;n.globalCompositeOperation="lighter";let z=new Map;for(let N=a.length-1;N>=0;N--){let Y=a[N],W=e.top(Y.o),K=e.top(Y.d);if(!W||!K)continue;let Z=e.project(W[0],W[1],W[2]),dt=e.project(K[0],K[1],K[2]),Ot=dt[0]-Z[0],J=dt[1]-Z[1],ft=Math.hypot(Ot,J)||1,At=[(Z[0]+dt[0])/2-J*.22,(Z[1]+dt[1])/2+Ot*.22-ft*.18],Ut=Fb((O.flows-N/a.length*.55)/.45);if(Ut<=0)continue;let _t=Math.sqrt(Y.v/o),Bt=N<3,ee=n.createLinearGradient(Z[0],Z[1],dt[0],dt[1]);ee.addColorStop(0,Ne(l,1)),ee.addColorStop(1,Ne(c,1));let zt=Math.max(8,Math.round(ft/10)),Zt=()=>{n.beginPath(),n.moveTo(Z[0],Z[1]);for(let it=1;it<=zt*Ut;it++){let ct=h(Z,At,dt,it/zt);n.lineTo(ct[0],ct[1])}let H=h(Z,At,dt,Ut);n.lineTo(H[0],H[1])};n.lineCap="round",n.strokeStyle=ee,n.globalAlpha=F*(.035+.08*_t)*(Bt?1.5:1),n.lineWidth=3+11*_t,Zt(),n.stroke(),n.globalAlpha=F*(.22+.5*_t)*(Bt?1.2:1),n.lineWidth=.7+2.8*_t,Zt(),n.stroke();let Kt=Bt?4:_t>.4?3:2,at=.42/(.5+ft/520);for(let H=0;H<Kt;H++){let it=Cf(P*at+Y.ph+H/Kt);if(it>Ut)continue;let ct=h(Z,At,dt,it),B=1.6+3.2*_t,ot=d(it),ut=n.createRadialGradient(ct[0],ct[1],0,ct[0],ct[1],B*3.2);ut.addColorStop(0,Ne([255,255,255],1)),ut.addColorStop(.25,Ne(ot,.9)),ut.addColorStop(1,Ne(ot,0)),n.globalAlpha=F*(.35+.4*Math.sin(it*Math.PI)),n.fillStyle=ut,n.beginPath(),n.arc(ct[0],ct[1],B*3.2,0,Math.PI*2),n.fill()}n.globalAlpha=F*Ut*.9,n.fillStyle=Ne(l,1),n.beginPath(),n.arc(Z[0],Z[1],1.6+2.2*_t,0,Math.PI*2),n.fill(),Ut>.98&&z.set(Y.d,{p:dt,v:(z.get(Y.d)?.v||0)+Y.v})}z.forEach(({p:N,v:Y})=>{let K=4+11*Math.sqrt(Y/o),Z=Cf(P*.6+N[0]*.01);n.globalAlpha=F*.45;let dt=n.createRadialGradient(N[0],N[1],0,N[0],N[1],K*1.8);dt.addColorStop(0,Ne(c,.9)),dt.addColorStop(1,Ne(c,0)),n.fillStyle=dt,n.beginPath(),n.arc(N[0],N[1],K*1.8,0,Math.PI*2),n.fill(),n.globalAlpha=F*(1-Z)*.7,n.strokeStyle=Ne(c,1),n.lineWidth=1.2,n.beginPath(),n.arc(N[0],N[1],K+Z*22,0,Math.PI*2),n.stroke()}),n.globalAlpha=1,n.globalCompositeOperation="source-over"}let f=t.power.k,m=t.power.months,_=f.length,p=Math.max(...f),g=+m[0].slice(5,7)-1,y=1250,w=548,M=36,b=400,T=O=>M+(b-M)*(O/p),x=O=>-Math.PI/2+(g+O)/12*Math.PI*2,S=O=>{let P=Math.floor(O),F=O-P,z=F&&P+1<_?f[P]+(f[P+1]-f[P])*F:f[P],N=T(z),Y=x(O);return[y+N*Math.cos(Y),w+N*Math.sin(Y)]},C=O=>ei(lg,O/(_-1));function R(O){let P=O.powerAlpha;if(P<=.002)return;let F=O.spiral*(_-1);n.save(),n.globalAlpha=P,n.setLineDash([2,6]),n.lineWidth=1,[1e6,2e6].forEach(Y=>{n.strokeStyle="rgba(220,228,240,0.16)",n.beginPath(),n.arc(y,w,T(Y),0,Math.PI*2),n.stroke(),n.fillStyle="rgba(220,228,240,0.45)",n.font=`500 15px ${$c}`,n.textAlign="left",n.fillText(`${Y/1e4}\uB9CC MWh`,y+8,w-T(Y)-6)}),n.setLineDash([]),n.font=`600 17px ${$c}`,n.textAlign="center",n.textBaseline="middle";for(let Y=0;Y<12;Y++){let W=-Math.PI/2+Y/12*Math.PI*2,K=b+34;n.fillStyle=Y===0||Y===7?"rgba(255,220,160,0.85)":"rgba(200,208,220,0.45)",n.fillText(`${Y+1}\uC6D4`,y+K*Math.cos(W),w+K*Math.sin(W))}n.lineCap="round",n.lineJoin="round",n.globalCompositeOperation="lighter";let z=6;for(let Y=1;Y<=Math.ceil(F);Y++){let W=Math.min(Y,F);if(W<=Y-1)break;let K=(F-Y)/12,Z=.32+.68*Math.exp(-K*.55),dt=C(Y);n.strokeStyle=Ne(dt,1),n.beginPath();let[Ot,J]=S(Y-1);n.moveTo(Ot,J);for(let ft=1;ft<=z;ft++){let At=Y-1+(W-(Y-1))*ft/z,[Ut,_t]=S(At);n.lineTo(Ut,_t)}n.globalAlpha=P*Z*.22,n.lineWidth=9,n.stroke(),n.globalAlpha=P*Z,n.lineWidth=2.2,n.stroke()}if(F>0){let[Y,W]=S(F),K=C(F),Z=n.createRadialGradient(Y,W,0,Y,W,34);Z.addColorStop(0,"rgba(255,255,255,0.95)"),Z.addColorStop(.2,Ne(K,.8)),Z.addColorStop(1,Ne(K,0)),n.globalAlpha=P,n.fillStyle=Z,n.beginPath(),n.arc(Y,W,34,0,Math.PI*2),n.fill()}n.globalCompositeOperation="source-over";let N=Math.min(_-1,Math.floor(F+.001));n.globalAlpha=P,n.fillStyle=Ne(C(F),1),n.font=`800 64px ${$c}`,n.fillText(m[N].slice(0,4),y,w-6),n.fillStyle="rgba(220,228,240,0.6)",n.font=`500 16px ${$c}`,n.fillText(`${+m[N].slice(5,7)}\uC6D4 \xB7 ${Math.round(f[N]/1e4)}\uB9CC MWh`,y,w+36),n.restore()}let L=!0;function G(O,P){let F=O.flowAlpha>.002&&O.flows>.001||O.powerAlpha>.002;F!==L&&(L=F,s.style.visibility=F?"visible":"hidden"),F&&(n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,s.width,s.height),n.setTransform(i,0,0,i,0,0),u(O,P),R(O))}return{render:G,resize:r}}var Bb="http://www.w3.org/2000/svg",ue=(s,t={},e)=>{let n=document.createElementNS(Bb,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},kb=s=>s<0?0:s>1?1:s,ni=s=>(s=kb(s),s*s*(3-2*s));function ug(s,t){let e=t.rice,n=150,i=700,r=770,a=920,o=725,l=950,c=e.hist.filter(([,H])=>H!=null),h=c.flatMap(([,H,it])=>[H,it]).concat(e.fc.flatMap(H=>[H.lo,H.hi]),[e.stat,e.krei].filter(Boolean)),d=Math.floor((Math.min(...h)-6)/10)*10,u=Math.ceil((Math.max(...h)+4)/10)*10,f=c[0][0],m=c.at(-1)[0],_=H=>n+(H-f)/(m-f)*(i-n),p=H=>r+H/(e.fc.length-1)*(a-r),g=H=>l-(H-d)/(u-d)*(l-o),y=ue("g",{class:"rc",opacity:0},s),w=ue("defs",{},s),M=ue("linearGradient",{id:"rcArea",x1:0,y1:0,x2:0,y2:1},w);ue("stop",{offset:0,"stop-color":ti.gold,"stop-opacity":.22},M),ue("stop",{offset:1,"stop-color":ti.gold,"stop-opacity":0},M);let b=ue("g",{class:"rc-grid"},y);for(let H=d;H<=u;H+=20)H!==d&&(ue("line",{x1:n,x2:a+10,y1:g(H),y2:g(H)},b),ue("text",{x:n-14,y:g(H)+5,"text-anchor":"end"},b).textContent=H);[f,2015,2020,m].forEach(H=>{ue("text",{x:_(H),y:l+30,"text-anchor":"middle"},b).textContent=H}),ue("text",{x:n-14,y:o-22,"text-anchor":"end",class:"rc-unit"},b).textContent="kg/10a";let T=H=>H.map(([it,ct],B)=>`${B?"L":"M"}${it.toFixed(1)},${ct.toFixed(1)}`).join(""),x=c.filter(([,,H])=>H).map(([H,,it])=>[_(H),g(it)]),S=c.map(([H,it])=>[_(H),g(it)]),C=ue("path",{d:`${T(S)}L${_(m)},${l}L${_(f)},${l}Z`,fill:"url(#rcArea)",opacity:0},y),R=ue("path",{d:T(x),class:"rc-norm"},y),L=ue("path",{d:T(S),class:"rc-line"},y),G=S.map(([H,it])=>ue("circle",{cx:H,cy:it,r:4.2,class:"rc-dot",opacity:0},y)),O=ue("g",{class:"rc-fc"},y);ue("rect",{x:r-30,y:o-30,width:a-r+60,height:l-o+44,rx:14,class:"rc-fcbox"},O),ue("text",{x:(r+a)/2,y:l+30,"text-anchor":"middle",class:"rc-fclab"},O).textContent=`${e.year} \uC608\uCE21 ${e.fc.length}\uBC88`;let P=[[e.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98",ti.sky],[e.krei,"KREI",ti.field]].filter(([H])=>H!=null).map(([H,it,ct],B)=>{let ot=ue("g",{opacity:0},O);return ue("line",{x1:r-18,x2:a+18,y1:g(H),y2:g(H),stroke:ct,"stroke-width":2,"stroke-dasharray":"5 4"},ot),ue("text",{x:a+26,y:g(H)+(B?14:-4),fill:ct,class:"rc-ref"},ot).textContent=`${it} ${H}`,ot}),F=ue("path",{d:T(e.fc.map((H,it)=>[p(it),g(H.y)])),class:"rc-fcline"},O),z=e.fc.map((H,it)=>{let ct=ue("g",{opacity:0},O);return ue("line",{x1:p(it),x2:p(it),y1:g(H.lo),y2:g(H.hi),class:"rc-wh"},ct),ue("circle",{cx:p(it),cy:g(H.y),r:it===e.fc.length-1?7:5,class:it===e.fc.length-1?"rc-fcdot now":"rc-fcdot"},ct),ct}),N=H=>H.replace(/(\d+)월 (\d+)일/,"$1/$2");ue("text",{x:p(0),y:o-42,"text-anchor":"middle",class:"rc-fcd"},O).textContent=N(e.fc[0].lab),ue("text",{x:p(e.fc.length-1),y:o-42,"text-anchor":"middle",class:"rc-fcd"},O).textContent=N(e.fc.at(-1).lab);let Y=t.facts,W=Y.riceAcc,K=ue("g",{class:"ra",opacity:0},s),Z=[["\uD3C9\uB144 \uADF8\uB300\uB85C",W.norm,"norm"],...t.rice.fc.slice(0,5).map(H=>[H.lab,W[`m${H.t}`],H.t])].filter(([,H])=>H!=null),dt=330,Ot=900,J=742,ft=37,At=H=>dt+H/Math.max(...Z.map(it=>it[1]))*(Ot-dt);ue("text",{x:150,y:J-44,class:"ra-h"},K).textContent=`\uC804\uAD6D \uB2E8\uC218 \uD3C9\uADE0 \uC624\uCC28 \xB7 ${Y.riceFrom}~${t.rice.year-1} \uADF8\uD574 \uC774\uC804 \uC790\uB8CC\uB85C\uB9CC \uC7AC\uD604`;let Ut=Z.slice(1).reduce((H,it)=>it[1]<H[1]?it:H)[2],_t=Z.map(([H,it,ct],B)=>{let ot=J+B*ft,ut=ue("g",{opacity:0},K);ue("text",{x:dt-16,y:ot+19,"text-anchor":"end",class:"ra-l"},ut).textContent=B?`${H} \uC608\uCE21`:H;let Tt=ue("rect",{x:dt,y:ot+4,width:0,height:22,rx:5,class:ct==="norm"?"ra-b norm":ct==="0915"?"ra-b best":"ra-b"},ut),It=ue("text",{x:dt,y:ot+21,class:"ra-v"},ut);return It.textContent=`${it}kg`,{gg:ut,r:Tt,tx:It,w:At(it)-dt}}),Bt=[[W.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1","#5fb3ff"],[W.krei,"KREI 9\uC6D4 \uC804\uB9DD","#5fb37c"]].map(([H,it,ct],B)=>{let ot=ue("g",{opacity:0},K),ut=At(H),Tt=J-6,It=J+Z.length*ft;return ue("line",{x1:ut,x2:ut,y1:Tt,y2:It,stroke:ct,"stroke-width":2,"stroke-dasharray":"4 4"},ot),ue("text",{x:ut+(B?8:-8),y:It+24,"text-anchor":B?"start":"end",fill:ct,class:"ra-ref"},ot).textContent=`${it} ${H}kg`,ot}),ee=0,zt=0;function Zt(){ee=L.getTotalLength(),zt=F.getTotalLength(),L.style.strokeDasharray=`${ee} ${ee}`,F.style.strokeDasharray=`${zt} ${zt}`}function Kt(H){K.setAttribute("opacity",H.accAlpha),!(H.accAlpha<=.002)&&(_t.forEach((it,ct)=>{let B=ni((H.riceAcc-ct*.1)/.45);it.gg.setAttribute("opacity",ni(B*3)),it.r.setAttribute("width",it.w*B),it.tx.setAttribute("x",dt+it.w*B+10)}),Bt.forEach((it,ct)=>it.setAttribute("opacity",ni((H.riceAcc-.7-ct*.1)/.2))))}function at(H){if(Kt(H),ee||Zt(),y.setAttribute("opacity",H.riceAlpha),H.riceAlpha<=.002)return;let it=ni(H.riceLine);L.style.strokeDashoffset=ee*(1-it),R.style.opacity=.9*ni(H.riceLine*1.5),C.setAttribute("opacity",ni((H.riceLine-.6)/.4)),G.forEach((B,ot)=>B.setAttribute("opacity",ni((it-ot/G.length)*8)));let ct=H.riceFc;O.setAttribute("opacity",ni(ct*4)),z.forEach((B,ot)=>B.setAttribute("opacity",ni((ct-ot/z.length*.7)/.3))),F.style.strokeDashoffset=zt*(1-ni(ct/.95)),P.forEach((B,ot)=>B.setAttribute("opacity",ni((ct-.75-ot*.08)/.15)))}return{render:at}}var zb="http://www.w3.org/2000/svg",Un=(s,t={},e)=>{let n=document.createElementNS(zb,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},Vb=s=>s<0?0:s>1?1:s,Yc=s=>(s=Vb(s),s*s*(3-2*s)),oo=s=>Math.round(s/100).toLocaleString("ko-KR");function fg(s,t){let e=t.gohyang,n=Un("g",{class:"bd",opacity:0},s),i=150,r=950,a=210,o=58,l=26,c=Math.max(...e.years.map(b=>b.size));Un("text",{x:i,y:640,class:"bd-h"},n).textContent=`\uACE0\uD5A5\uC0AC\uB791\uAE30\uAE08 \uC608\uC0B0\uD604\uC561 \xB7 \uC804\uAD6D ${e.govs}\uACF3`;let h=e.years.map((b,T)=>{let x=i+T*(o+l),S=b.size/c*a,C=Un("g",{},n),R=Un("rect",{x,y:r-S,width:o,height:S,rx:8,class:T===e.years.length-1?"bd-bar now":"bd-bar"},C),L=Un("text",{x:x+o/2,y:r-S-12,"text-anchor":"middle",class:"bd-v"},C);return L.textContent=`${oo(b.size)}\uC5B5`,Un("text",{x:x+o/2,y:r+28,"text-anchor":"middle",class:"bd-y"},C).textContent=b.full?b.y:`${b.y}.${b.ymd.slice(4,6)}`,{r:R,v:L,h:S,x}}),d=e.last,u=520,f=380,m=752,_=e.years.at(-1);Un("text",{x:u,y:728,class:"bd-h2"},n).textContent=`${_.y}\uB144 ${+_.ymd.slice(4,6)}\uC6D4 \uB9D0 ${oo(d.size)}\uC5B5\uC6D0\uC774`;let p=[["\uC0AC\uC5C5",d.biz,d.bizEp,"#5fb37c"],["\uC6B4\uC601",d.run,d.runEp,"#ffcf7a"],["\uB118\uAE40",d.move,null,"#6b7280"],["\uC801\uB9BD",d.keep,null,"#5fb3ff"]],g=u,y=p.map(([b,T,x,S])=>{let C=T/d.size*f,R=Un("g",{},n),L=Un("rect",{x:g,y:m,width:Math.max(0,C-3),height:34,rx:6,fill:S,opacity:.9},R),G=x!=null?Un("rect",{x:g,y:m+34-8,width:Math.max(0,x/d.size*f-3),height:8,rx:3,fill:"#0b0d12",opacity:.45},R):null,O={name:b,v:T,ep:x,c:S,x:g,w:C,r:L,e:G,gg:R};return g+=C,O}),w=y.filter(b=>b.name!=="\uB118\uAE40").map((b,T)=>{let x=Un("g",{opacity:0},n),S=m+76+T*38;Un("rect",{x:u,y:S-13,width:12,height:12,rx:3,fill:b.c},x);let C=Un("text",{x:u+22,y:S,class:"bd-row"},x);return C.innerHTML=b.ep!=null?`<tspan class="b">${b.name} ${oo(b.v)}\uC5B5</tspan><tspan dx="10">\uC9C0\uCD9C ${oo(b.ep)}\uC5B5 \xB7 \uC9D1\uD589\uB960 ${Math.round(b.ep/b.v*100)}%</tspan>`:`<tspan class="b">${b.name} ${oo(b.v)}\uC5B5</tspan><tspan dx="10">\uC608\uC0B0\uD604\uC561\uC758 ${Math.round(b.v/d.size*100)}%\uB97C \uB0A8\uACA8 \uB454\uB2E4</tspan>`,x});function M(b){n.setAttribute("opacity",b.bdAlpha),!(b.bdAlpha<=.002)&&(h.forEach((T,x)=>{let S=Yc((b.bdBars-x*.18)/.46);T.r.setAttribute("height",T.h*S),T.r.setAttribute("y",r-T.h*S),T.v.setAttribute("opacity",Yc((S-.7)/.3))}),y.forEach((T,x)=>{let S=Yc((b.bdSplit-x*.12)/.5);T.gg.setAttribute("opacity",S),T.r.setAttribute("width",Math.max(0,(T.w-3)*S))}),w.forEach((T,x)=>T.setAttribute("opacity",Yc((b.bdSplit-.45-x*.12)/.3))))}return{render:M}}var ii=.5416666666666666,dg="assets/intro/shots/";function pg(s,t,e){s.insertAdjacentHTML("beforeend",`
    <div class="scr-wrap" id="scr-wrap">
      <div class="scr" id="scr">
        <div class="scr-bar"><i></i><i></i><i></i><span class="scr-url" id="scr-url">ag-rstat.vercel.app</span></div>
        <div class="scr-view">
          <div class="scr-zoom" id="scr-zoom">
            ${e.map(f=>`<img class="scr-img" data-n="${f}" src="${dg}${f}.webp" alt="" decoding="async" width="1040" height="585">`).join("")}
            <div class="scr-marks" id="scr-marks"></div>
            <div class="cursor" id="cursor"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6.2 1.6L10 19z"/></svg><span class="ripple"></span></div>
          </div>
        </div>
      </div>
    </div>`);let n=s.querySelector("#scr-wrap"),i=s.querySelector("#scr-zoom"),r=s.querySelector("#scr-marks"),a=s.querySelector("#cursor"),o=s.querySelector("#scr-url"),l=Object.fromEntries([...s.querySelectorAll(".scr-img")].map(f=>[f.dataset.n,f])),c=(f,m)=>t.shots[f]?.boxes?.[m]||t.shots.home?.boxes?.[m]||null;function h(f,m=.92){if(!f)return{scale:1,x:0,y:0};let[_,p,g,y]=f,w=Math.max(1,Math.min(1040/(g*ii),585/(y*ii))*m),M=1040/2-(_+g/2)*ii*w,b=585/2-(p+y/2)*ii*w;return M=Math.min(0,Math.max(1040-1040*w,M)),b=Math.min(0,Math.max(585-585*w,b)),{scale:w,x:M,y:b}}let d=f=>f?{x:(f[0]+f[2]/2)*ii,y:(f[1]+f[3]/2)*ii}:{x:1040/2,y:585/2};function u(f,m,_,p="top"){if(!m)return null;let[g,y,w,M]=m;return r.insertAdjacentHTML("beforeend",`<div class="mk mk-${p}" id="mk-${f}" style="left:${g*ii}px;top:${y*ii}px;width:${w*ii}px;height:${M*ii}px"><span>${_}</span></div>`),r.querySelector(`#mk-${f}`)}return{wrap:n,zoom:i,cursor:a,url:o,imgs:l,box:c,focus:h,at:d,mark:u,K:ii}}function mg(s,t){return s.insertAdjacentHTML("beforeend",`
    <div class="wall-wrap" id="wall-wrap"><div class="wall" id="wall">
      ${t.map(([e,n])=>`<figure class="wt"><img src="${dg}${e}_s.webp" alt="" decoding="async" width="320" height="180"><figcaption>${n}</figcaption></figure>`).join("")}
    </div></div>`),s.querySelector("#wall-wrap")}var Gb="http://www.w3.org/2000/svg",fe=(s,t={},e)=>{let n=document.createElementNS(Gb,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},_g=s=>s<0?0:s>1?1:s,Ys=s=>(s=_g(s),s*s*(3-2*s)),Rf=s=>1-(1-_g(s))**3,Hb=s=>s-Math.floor(s),lo='"Pretendard Variable", Pretendard, system-ui, sans-serif';function gg(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}function Wb(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function Xb(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function xg(s,t,e,n){let i=s.getContext("2d"),r=e.spots,a=1,o=!0;function l(et,vt){s.width=et,s.height=vt,a=et/cn}let c=r.rio.regions,h=Math.max(...c.map(et=>et.x)),d=et=>et>=1?ei(["#ffd27a","#f5a524","#ff7a4a"],Math.min(1,(et-1)/2.4)):ei(["#2f6fd0","#4ea1ff","#9fd1ff"],et);function u(et,vt){let nt=et.rioA;if(nt<=.002)return;let Et=1290,mt=560,yt=74,E=300,v=c.length,k=Math.PI*2/v*.36;i.save(),i.globalAlpha=nt,i.globalCompositeOperation="lighter";for(let st=0;st<3;st++){let gt=Hb(vt*.42+st/3),xt=yt+gt*360;i.strokeStyle=`rgba(255,200,120,${.22*(1-gt)*nt})`,i.lineWidth=1.5,i.beginPath(),i.arc(Et,mt,xt,0,Math.PI*2),i.stroke()}c.forEach((st,gt)=>{let xt=Rf((et.rioP-gt/v*.5)/.5);if(xt<=0)return;let q=-Math.PI/2+gt/v*Math.PI*2+et.rioP*.12,Q=yt+(E*Math.sqrt(st.x/h)+18)*xt,pt=d(st.lq),I=i.createLinearGradient(Et+yt*Math.cos(q),mt+yt*Math.sin(q),Et+Q*Math.cos(q),mt+Q*Math.sin(q));I.addColorStop(0,Ne(pt,.08)),I.addColorStop(.6,Ne(pt,.55)),I.addColorStop(1,Ne(pt,.95)),i.fillStyle=I,i.beginPath(),i.moveTo(Et+yt*Math.cos(q-k),mt+yt*Math.sin(q-k));let rt=yt+(Q-yt)*.55,tt=k*1.5*(yt/rt)*2.4;i.quadraticCurveTo(Et+rt*Math.cos(q-tt),mt+rt*Math.sin(q-tt),Et+Q*Math.cos(q),mt+Q*Math.sin(q)),i.quadraticCurveTo(Et+rt*Math.cos(q+tt),mt+rt*Math.sin(q+tt),Et+yt*Math.cos(q+k),mt+yt*Math.sin(q+k)),i.closePath(),i.fill();let bt=Ys((xt-.7)/.3);if(bt>0){let St=Q+26,wt=Et+St*Math.cos(q),Ht=mt+St*Math.sin(q);i.globalCompositeOperation="source-over",i.globalAlpha=nt*bt,i.textAlign=Math.cos(q)>.25?"left":Math.cos(q)<-.25?"right":"center",i.textBaseline="middle",i.fillStyle="#eef0f3",i.font=`700 19px ${lo}`,i.fillText(st.name,wt,Ht-9),i.fillStyle=Ne(pt,1),i.font=`600 15px ${lo}`,i.fillText(`${(st.x/1e6).toFixed(1)}\uC870 \xB7 ${st.lq}`,wt,Ht+11),i.globalAlpha=nt,i.globalCompositeOperation="lighter"}}),i.globalCompositeOperation="source-over";let lt=i.createRadialGradient(Et,mt,0,Et,mt,yt);lt.addColorStop(0,"rgba(40,30,16,0.95)"),lt.addColorStop(1,"rgba(20,16,10,0.9)"),i.fillStyle=lt,i.beginPath(),i.arc(Et,mt,yt-4,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(255,207,122,0.5)",i.lineWidth=1.2,i.stroke(),i.textAlign="center",i.textBaseline="middle",i.fillStyle="#ffd98a",i.font=`800 30px ${lo}`,i.fillText(`${Math.round(r.rio.total/1e6)}\uC870`,Et,mt-6),i.fillStyle="#aab2bf",i.font=`500 14px ${lo}`,i.fillText(`\uB18D\uC2DD\uD488 \uC0B0\uCD9C ${r.rio.year}`,Et,mt+20),i.textAlign="right",i.fillStyle="rgba(200,208,220,0.75)",i.font=`500 16px ${lo}`,i.fillText("\uAF43\uC78E \uAE38\uC774 = \uC2DC\uB3C4 \uB18D\uC2DD\uD488 \uC0B0\uCD9C\uC561 \xB7 \uC22B\uC790 = \uD2B9\uD654\uB3C4(\uC804\uAD6D \uD3C9\uADE0 1, \uC8FC\uD669\uC77C\uC218\uB85D \uB18D\uC2DD\uD488\uC5D0 \uAE30\uB304\uB2E4)",1844,1018),i.restore()}let f=[[245,165,36],[255,122,89],[124,201,143]],m=Math.max(...r.coops.map(et=>et[3])),_=gg(1110),p=r.coops.map(et=>({w:n.world(et[0],et[1]),k:et[2],s:Math.sqrt(et[3]/m),o:_()}));function g(et,vt){let nt=et.coopA;nt<=.002||(i.save(),i.globalCompositeOperation="lighter",p.forEach(Et=>{let mt=Ys((et.coopP-Et.o*.8)/.2);if(mt<=0)return;let[yt,E]=n.project(Et.w[0],Et.w[1],n.flat),v=(1.4+6.5*Et.s)*(.6+.4*mt),k=.85+.15*Math.sin(vt*2+Et.o*30),lt=i.createRadialGradient(yt,E,0,yt,E,v*2);lt.addColorStop(0,Ne(f[Et.k],.5*nt*mt*k)),lt.addColorStop(1,Ne(f[Et.k],0)),i.fillStyle=lt,i.beginPath(),i.arc(yt,E,v*2,0,Math.PI*2),i.fill(),i.globalCompositeOperation="source-over",i.fillStyle=Ne(f[Et.k],.92*nt*mt),i.beginPath(),i.arc(yt,E,Math.max(1.5,v*.7),0,Math.PI*2),i.fill(),i.globalCompositeOperation="lighter"}),i.restore())}let y=gg(14939),w=e.map.sigun.map(et=>r.lv.nv[et.key]?r.lv.man[et.key]/r.lv.nv[et.key]:0),M=w.filter(et=>et>0).sort((et,vt)=>et-vt),b=et=>{let vt=0,nt=M.length-1;for(;vt<nt;){let Et=vt+nt>>1;M[Et]<et?vt=Et+1:nt=Et}return vt/(M.length-1)},T=[];e.map.sigun.forEach((et,vt)=>{let nt=r.lv.nv[et.key];if(!nt)return;let Et=ei(qc,.1+.9*b(w[vt])),mt=et.rings.map(v=>v[0]),yt=mt.map(Xb),E=yt.reduce((v,k)=>v+k,0);for(let v=0;v<nt;v++){let k=y()*E,lt=0;for(;k>yt[lt]&&lt<mt.length-1;)k-=yt[lt++];let st=mt[lt],gt=1/0,xt=-1/0,q=1/0,Q=-1/0;st.forEach(([pt,I])=>{gt=Math.min(gt,pt),xt=Math.max(xt,pt),q=Math.min(q,I),Q=Math.max(Q,I)});for(let pt=0;pt<30;pt++){let I=gt+y()*(xt-gt),rt=q+y()*(Q-q);if(Wb(I,rt,st)){T.push({w:n.world(I,rt),c:Et,o:y()});break}}}});function x(et){let vt=et.lvA;if(!(vt<=.002)){i.save(),i.globalCompositeOperation="lighter";for(let nt of T){let Et=Ys((et.lvP-nt.o*.85)/.15);if(Et<=0)continue;let[mt,yt]=n.project(nt.w[0],nt.w[1],.06);i.fillStyle=Ne(nt.c,.75*vt*Et),i.fillRect(mt-1.3,yt-1.3,2.6,2.6)}i.restore()}}let S=r.employ,C=fe("g",{opacity:0},t),R=150,L=1770,G=560,O=950,P=5e3,F=et=>R+(et-S.years[0])/(S.years.at(-1)-S.years[0])*(L-R),z=et=>O-et/P*(O-G),N=fe("defs",{},t),Y=fe("linearGradient",{id:"empG",x1:0,y1:0,x2:0,y2:1},N);fe("stop",{offset:0,"stop-color":"#7cc98f","stop-opacity":.45},Y),fe("stop",{offset:1,"stop-color":"#7cc98f","stop-opacity":0},Y);let W=fe("clipPath",{id:"empClip"},N),K=fe("rect",{x:R-10,y:0,width:0,height:1080},W);for(let et=1e3;et<=4e3;et+=1e3)fe("line",{x1:R,x2:L,y1:z(et),y2:z(et),class:"sp-grid"},C),fe("text",{x:L+12,y:z(et)+5,class:"sp-ax"},C).textContent=`${et/10}\uB9CC`;for(let et=1970;et<=2020;et+=10)fe("text",{x:F(et),y:O+30,"text-anchor":"middle",class:"sp-ax"},C).textContent=et;let Z=S.years.map((et,vt)=>[F(et),z(S.a[vt])]),dt=Z.map(([et,vt],nt)=>`${nt?"L":"M"}${et.toFixed(1)},${vt.toFixed(1)}`).join(""),Ot=fe("g",{"clip-path":"url(#empClip)"},C);fe("path",{d:`${dt}L${L},${O}L${R},${O}Z`,fill:"url(#empG)"},Ot),fe("path",{d:dt,class:"sp-eline"},Ot);let J=fe("circle",{r:7,class:"sp-ehead"},C),ft=fe("text",{class:"sp-ehv","text-anchor":"middle"},C),At=fe("text",{x:Z[0][0]+14,y:Z[0][1]-18,class:"sp-ehs"},C);At.textContent=`${S.years[0]}\uB144 ${Math.round(S.a[0]/10)}\uB9CC \uBA85`;function Ut(et){if(C.setAttribute("opacity",et.empA),et.empA<=.002)return;let vt=et.empP,nt=R+(L-R)*vt;K.setAttribute("width",nt-R+12);let Et=Math.min(S.years.length-1,vt*(S.years.length-1)),mt=Math.floor(Et),yt=Et-mt,E=Math.min(S.years.length-1,mt+1),v=Z[mt][0]+(Z[E][0]-Z[mt][0])*yt,k=Z[mt][1]+(Z[E][1]-Z[mt][1])*yt,lt=S.a[mt]+(S.a[E]-S.a[mt])*yt;J.setAttribute("cx",v),J.setAttribute("cy",k),ft.setAttribute("x",Math.min(L-40,v)),ft.setAttribute("y",k-22),ft.textContent=`${Math.round(S.years[0]+Et)}\uB144 ${Math.round(lt/10)}\uB9CC`,At.setAttribute("opacity",Ys(vt*6))}let _t=fe("g",{opacity:0},t),Bt=fe("pattern",{id:"soilDots",width:9,height:9,patternUnits:"userSpaceOnUse"},N);fe("circle",{cx:2,cy:2,r:.9,fill:"rgba(0,0,0,0.25)"},Bt),fe("circle",{cx:6.5,cy:6,r:.7,fill:"rgba(255,255,255,0.12)"},Bt);let ee=["#7fcf7a","#b9d36a","#d9b86a","#b08858","#6e5a48","#3a3632"],zt=["1\uAE09","2\uAE09","3\uAE09","4\uAE09","5\uAE09","\uAE30\uD0C0"],Zt=[["\uB17C",r.soil.pg,880],["\uBC2D",r.soil.fg,1440]].map(([et,vt,nt])=>{let Et=vt.reduce((q,Q)=>q+Q,0),mt=250,yt=640,E=280;fe("text",{x:nt+E/2,y:mt-28,"text-anchor":"middle",class:"sp-sh"},_t).textContent=`${et}\uC73C\uB85C \uC4F8 \uB54C \uC801\uC131\uB4F1\uAE09`;let v=mt,k=vt.map((q,Q)=>{let pt=q/Et*yt,I=fe("g",{},_t);fe("rect",{x:nt,y:v,width:E,height:Math.max(1,pt-2),rx:4,fill:ee[Q]},I),fe("rect",{x:nt,y:v,width:E,height:Math.max(1,pt-2),rx:4,fill:"url(#soilDots)"},I);let rt=q/Et*100;if(pt>16){let bt=fe("text",{x:nt+E+14,y:v+pt/2+6,class:"sp-sl"},I);bt.innerHTML=`<tspan class="b">${zt[Q]}</tspan><tspan dx="8">${rt.toFixed(1)}%</tspan>`}let tt={g:I,y0:v,h:pt};return v+=pt,tt}),lt=(vt[0]+vt[1])/Et*100,st=k[0].h+k[1].h,gt=fe("g",{opacity:0},_t);fe("path",{d:`M${nt-14},${mt}h-10v${st}h10`,fill:"none",stroke:"#ffd98a","stroke-width":2},gt);let xt=fe("text",{x:nt-32,y:mt+Math.max(18,st/2+6),"text-anchor":"end",class:"sp-sb"},gt);return xt.innerHTML=`<tspan x="${nt-32}" dy="0">1\xB72\uAE09\uC9C0</tspan><tspan x="${nt-32}" dy="30" class="v">${lt.toFixed(1)}%</tspan>`,{layers:k,br:gt}});function Kt(et){_t.setAttribute("opacity",et.soilA),!(et.soilA<=.002)&&Zt.forEach((vt,nt)=>{vt.layers.forEach((Et,mt)=>{let yt=Rf((et.soilP-nt*.08-mt*.09)/.38);Et.g.setAttribute("opacity",Ys(yt*2)),Et.g.setAttribute("transform",`translate(0 ${(-120*(1-yt)).toFixed(1)})`)}),vt.br.setAttribute("opacity",Ys((et.soilP-.75)/.2))})}let at=fe("g",{opacity:0},t),H=r.lv.kinds.filter(([,et])=>et>1e3),it=r.lv.kinds.reduce((et,[,vt])=>et+vt,0),ct=290,B=720,ot=112,ut=["#ff9a5a","#f5c14f","#9fd1ff"];fe("circle",{cx:ct,cy:B,r:ot,fill:"none",stroke:"rgba(255,255,255,0.07)","stroke-width":34},at);let Tt=2*Math.PI*ot,It=0,Xt=H.map(([et,vt],nt)=>{let Et=vt/it,mt=fe("circle",{cx:ct,cy:B,r:ot,fill:"none",stroke:ut[nt],"stroke-width":34,transform:`rotate(${-90+It*360} ${ct} ${B})`,"stroke-dasharray":`0 ${Tt}`},at),yt=fe("text",{x:ct+ot+60,y:B-40+nt*40,class:"sp-dl"},at);return yt.innerHTML=`<tspan fill="${ut[nt]}" class="b">${et}</tspan><tspan dx="10">${Math.round(Et*100)}%</tspan>`,It+=Et,{c:mt,f:Et,t:yt}});fe("text",{x:ct,y:B+6,"text-anchor":"middle",class:"sp-dc"},at).textContent="\uBD84\uB1E8\uB294",fe("text",{x:ct,y:B+32,"text-anchor":"middle",class:"sp-dc2"},at).textContent="\uC5B4\uB290 \uAC00\uCD95\uC5D0\uC11C";function D(et){at.setAttribute("opacity",et.lvA),!(et.lvA<=.002)&&Xt.forEach((vt,nt)=>{let Et=Rf((et.lvP-nt*.15)/.5);vt.c.setAttribute("stroke-dasharray",`${Math.max(0,vt.f*Tt*Et-3)} ${Tt}`),vt.t.setAttribute("opacity",Ys((Et-.5)/.5))})}function de(et,vt){Ut(et),Kt(et),D(et);let nt=et.rioA>.002||et.coopA>.002||et.lvA>.002;nt!==o&&(o=nt,s.style.visibility=nt?"visible":"hidden"),nt&&(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,s.width,s.height),i.setTransform(a,0,0,a,0,0),u(et,vt),g(et,vt),x(et))}return{render:de,resize:l,coopKinds:r.coopKinds}}var ke=window.INTRO,ae=ke.facts,Ee=(s,t=document)=>t.querySelector(s),Cg=(s,t=document)=>[...t.querySelectorAll(s)],js=Ee("#stage"),jc=Ee("#player"),Yb=matchMedia("(prefers-reduced-motion: reduce)").matches,Jc=s=>s.split("|")[1].replace(/시부$/,""),$r=s=>Math.round(s).toLocaleString("ko-KR"),Df=(s,t=1)=>`${(s/1e4).toFixed(s>=1e6?0:t)}\uB9CC`,Zb=s=>{let t=Math.round(s/100);return t>=1e4?`${Math.floor(t/1e4)}\uC870 ${$r(t%1e4)}\uC5B5`:`${$r(t)}\uC5B5`},vg=s=>`${Math.round(s*100)}%`,Jb=Object.entries(ke.land.v).filter(([,s])=>s).sort((s,t)=>t[1]-s[1]).slice(0,3),yg=ke.rice.fc.at(-1),Kb=ke.power.k,Js=ke.power.months,Mg=s=>Js.reduce((t,e,n)=>e.startsWith(s)?t+Kb[n]:t,0),Rg=String(+Js.at(-1).slice(0,4)-(Js.at(-1).endsWith("12")?0:1)),jb=Mg(Rg)/Mg(Js[0].slice(0,4)),Of=ke.gohyang,Sg=Of.years[0],Qb=Of.years.at(-1),ho=s=>s.map(t=>`<span class="ln">${[...t].map(e=>`<span class="ch${e===" "?" sp":""}">${e===" "?"&nbsp;":e}</span>`).join("")}</span>`).join(""),Zc=s=>`<ul class="pts">${s.map(([t,e])=>`<li><b>${t}</b><span>${e}</span></li>`).join("")}</ul>`,Zs=(s,t,e,n,i,r="",a="")=>`
  <section class="sc ${a}" id="sc-${s}">
    <p class="kicker"><b>${t}</b>${e}</p>
    <h2 class="hl">${ho(n)}</h2>
    ${i?`<p class="it-sub">${i}</p>`:""}
    ${r}
  </section>`,co=s=>`linear-gradient(90deg, ${s.join(", ")})`,xs=(s,{dec:t=0,suf:e="",from:n}={})=>`<b class="cnt" data-n="${s}" data-dec="${t}" data-suf="${e}"${n!=null?` data-from="${n}"`:""}>${(+s).toFixed(t)}${e}</b>`,ri=ke.spots,bg=[...ri.rio.regions].sort((s,t)=>t.lq-s.lq)[0],t1=ri.soil.pg.reduce((s,t)=>s+t,0),e1=(ri.soil.pg[0]+ri.soil.pg[1])/t1*100,cE=[...ri.lv.kinds].sort((s,t)=>t[1]-s[1]),hE=ri.lv.kinds.reduce((s,[,t])=>s+t,0),wg=Object.entries(ri.dev).sort((s,t)=>t[1]-s[1])[0],Qc=[{id:"rio",no:"08",name:"\uC9C0\uC5ED\uC0B0\uC5C5\uC5F0\uAD00\uD45C(\uB18D\uC5C5)",href:"rio",big:xs(Math.round(ri.rio.total/1e6)),unit:"\uC870\uC6D0 \uB18D\uC2DD\uD488 \uC0B0\uCD9C",line:"17\uAC1C \uC2DC\uB3C4\uB9C8\uB2E4 \uB18D\uC2DD\uD488\uC774 \uB9CC\uB4DC\uB294 \uC0DD\uC0B0\xB7\uBD80\uAC00\uAC00\uCE58\xB7\uC77C\uC790\uB9AC \uD30C\uAE09\uD6A8\uACFC",pts:[[`${bg.name} ${bg.lq}`,"\uB18D\uC2DD\uD488 \uD2B9\uD654\uB3C4 1\uC704 \u2014 \uC804\uAD6D \uD3C9\uADE0\uC758 3.6\uBC30"],[`${ae.rio.sectors}\uAC1C \uC0B0\uC5C5`,"\uBB34\uC5C7\uC774 \uB4E4\uC5B4\uAC00\uACE0 \uC5B4\uB514\uC5D0 \uC4F0\uC774\uB294\uC9C0\uAE4C\uC9C0"]]},{id:"employ",no:"09",name:"\uB18D\uC5C5\uACE0\uC6A9",href:"employ",big:xs(+ae.employ.to-+ae.employ.from+1),unit:"\uB144\uC758 \uB18D\uC5C5 \uC77C\uC790\uB9AC",line:`\uB18D\uB9BC\uC5B4\uC5C5 \uCDE8\uC5C5\uC790 ${Math.round(ae.employ.a0/10)}\uB9CC \uBA85\uC774 ${Math.round(ae.employ.a1/10)}\uB9CC \uBA85\uC774 \uB418\uAE30\uAE4C\uC9C0`,pts:[[`${$r(ae.employ.months)}\uAC1C\uC6D4`,"\uC6D4\uBCC4 \xB7 \uACC4\uC808 \xB7 \uC2DC\uAD70\uBCC4 \xB7 \uC5F0\uB839\xB7\uC885\uC0AC\uC0C1\uC9C0\uC704\xB7\uB178\uB3D9\uC2DC\uAC04"]]},{id:"agfin",no:"10",name:"\uB18D\uC5C5\uAE08\uC735\uBCF4\uD5D8",href:"agfin",big:xs(ae.agfin.coops),unit:"\uAC1C \uB18D\xB7\uCD95\uD611",line:"\uC870\uD569\uB9C8\uB2E4 \uACF5\uC2DC \uC7AC\uBB34\uB97C \uC9C0\uB3C4 \uC704\uC5D0",pts:[[Zb(ae.agfin.paid),`${ae.agfin.year} \uB18D\uC791\uBB3C\uC7AC\uD574\uBCF4\uD5D8 \uBCF4\uD5D8\uAE08 \xB7 \uAC00\uC785 ${Df(ae.agfin.cnt)}\uAC74`],[`${ae.agfin.cats}\uAC1C \uBD84\uC57C`,"\uACFC\uC218\xB7\uC2DD\uB7C9\xB7\uCC44\uC18C\xB7\uC2DC\uC124 \uC7AC\uD574\uBCF4\uD5D8\uC744 \uC2DC\uAD70 \uB2E8\uC704\uB85C"]]},{id:"ruraldev",no:"11",name:"\uB18D\uCD0C\uAC1C\uBC1C",href:"ruraldev",big:xs(ae.ruraldev.sites),unit:"\uAC1C \uC0AC\uC5C5 \uC9C0\uAD6C",line:"\uB18D\uC5B4\uCD0C\uACF5\uC0AC \uC9C0\uAD6C\uC758 \uC720\uD615\xB7\uC704\uCE58\xB7\uC900\uACF5 \uC608\uC815, \uC608\uC0B0\uD604\uC561\uAE4C\uC9C0",cls:"right",pts:[[`${Jc(wg[0])} ${wg[1]}\uACF3`,"\uC9C0\uAD6C\uAC00 \uAC00\uC7A5 \uB9CE\uC740 \uC2DC\uAD70"],[`${ae.ruraldev.cats}\uAC1C \uAC08\uB798`,"\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5 \uC608\uC0B0\uC744 \uB18D\uAC00\uB2F9\uC73C\uB85C"]]},{id:"soil",no:"12",name:"\uB18D\uACBD\uC9C0 \uD1A0\uC591",href:"soil",big:xs(Math.round(ae.soil.tests/1e4)),unit:"\uB9CC \uAC74 \uD1A0\uC591\uAC80\uC815",line:`\uD759\uC758 \uC591\uBD84 ${ae.soil.chem}\uAC00\uC9C0\uC640 \uB545\uC758 \uC801\uC131\uB4F1\uAE09`,pts:[[`${e1.toFixed(1)}%`,"\uB17C\uC73C\uB85C 1\xB72\uAE09\uC778 \uB545 \u2014 \uAD6D\uD1A0\uC5D0\uC11C \uC88B\uC740 \uB545\uC740 \uC774\uB9CC\uD07C"],[`${ae.soil.obst}\uAC00\uC9C0`,"\uB4F1\uAE09\uC744 \uB0AE\uCD94\uB294 \uC800\uD574\uC694\uC778\uAE4C\uC9C0"]]},{id:"livestock",no:"13",name:"\uCD95\uC0B0 \uD658\uACBD",href:"livestock",big:xs(ae.livestock.villages),unit:"\uAC1C \uB9C8\uC744",line:`\uC810 \uD558\uB098\uAC00 \uB9C8\uC744 \uD558\uB098 \u2014 ${ae.livestock.from}~${ae.livestock.to} \uAC00\uCD95\uBD84\uB1E8 \uBC1C\uC0DD`,pts:[]}],n1=[["home","\uC8FC\uC694\uD1B5\uACC4"],["rice","\uBCBC \uC791\uD669"],["rio","\uC0B0\uC5C5\uC5F0\uAD00\uD45C"],["flow","\uBB3C\uB958\uB3D9\uD5A5"],["power","\uB18D\uC0AC\uC6A9 \uC804\uAE30"],["employ","\uB18D\uC5C5\uACE0\uC6A9"],["agfin","\uAE08\uC735\uBCF4\uD5D8"],["jikbul","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791"],["ruraldev","\uB18D\uCD0C\uAC1C\uBC1C"],["soil","\uB18D\uACBD\uC9C0 \uD1A0\uC591"],["livestock","\uCD95\uC0B0 \uD658\uACBD"],["home_sat","\uC704\uC131\uC9C0\uB3C4"],["rice_sat","\uC704\uC131 \uC601\uC0C1"],["home_hn","\uC2DC\uAD70 \uD604\uD669\uD310"],["status","\uC790\uB8CC \uC218\uC9D1 \uD604\uD669"]];js.insertAdjacentHTML("beforeend",`
  <div class="copy">
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${ho(["\uC9C0\uC5ED\uB18D\uC5C5","\uD604\uD669\uD310"])}</h1>
      <p class="it-sub">\uC9C0\uC5ED \uB18D\uC5C5\uC758 \uBAA8\uB4E0 \uC22B\uC790\uB97C, \uC2DC\uAD70 \uB2E8\uC704\uB85C \uD55C \uD654\uBA74\uC5D0</p>
    </section>
    ${Zs("stats","01","\uC8FC\uC694\uD1B5\uACC4",[`${ke.map.sigun.length}\uAC1C \uC2DC\uAD70,`,`${ae.metrics}\uAC1C \uC9C0\uD45C`],"\uC804\uAD6D\xB7\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uAC19\uC740 \uB208\uAE08\uC73C\uB85C",Zc([[`${$r(ae.parcels/1e4)}\uB9CC`,"\uD544\uC9C0 \u2014 \uD31C\uB9F5 \uB18D\uACBD\uC9C0\uB97C \uC804\uBD80 \uBC1B\uC544 \uC9C1\uC811 \uBD84\uC11D"],[`${ae.parcelMed}\u33A1`,`\uC804\uAD6D \uB18D\uACBD\uC9C0 \uC911\uC559\uAC12 \xB7 0.1ha \uBBF8\uB9CC\uC774 ${vg(ae.parcelSmall)}`],[vg(ae.paddyArmt),"\uB17C \uACBD\uC9C0\uC815\uB9AC\uC728\uC744 \uC2DC\uAD70\uB9C8\uB2E4 \uACAC\uC900\uB2E4"]]))}
    ${Zs("real","02","\uC2E4\uC81C \uD654\uBA74",["\uACE0\uB974\uBA74, \uADF8 \uC2DC\uAD70\uC758","\uD604\uD669\uD310\uC774 \uB41C\uB2E4"],"\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uACE0\uB974\uAC70\uB098 \uC9C0\uB3C4\uB97C \uB204\uB974\uBA74<br>\uBAA8\uB4E0 \uCE78\uC774 \uADF8 \uC9C0\uC5ED \uC22B\uC790\uB85C \uBC14\uB01D\uB2C8\uB2E4",Zc([["\uC804\uB144 \uB300\uBE44","\uC99D\uAC10\uC774 \uC704\uCABD \uB760\uB85C \uD750\uB978\uB2E4"],["\uC2DC\uB3C4 \uC548 \uC21C\uC704","\uC9C0\uB3C4 \uC544\uB798\uC5D0\uC11C \uBC14\uB85C \uBE44\uAD50"],["\uC8FC\uC18C \uACF5\uC720","\uBCF4\uB358 \uD654\uBA74\uC744 \uADF8\uB300\uB85C \uBCF4\uB0B8\uB2E4"]]),"narrow")}
    ${Zs("sat","03","\uC704\uC131\uC9C0\uB3C4",["\uD1B5\uACC4 \uB4A4\uC758","\uC2E4\uC81C \uB545\uC744 \uBCF8\uB2E4"],"",Zc([["\uD56D\uACF5\uC601\uC0C1",`\uD31C\uB9F5 \uD544\uC9C0 \xB7 \uC720\uD1B5\uC2DC\uC124 ${$r(ae.facilities)}\uACF3 \xB7 \uC8FC\uC81C\uB3C4`],["Sentinel-2","10m \uD574\uC0C1\uB3C4 \xB7 5\uC77C\uB9C8\uB2E4 \xB7 \uB17C\uB9CC \uACE8\uB77C \uC0DD\uC721(NDVI)"],["\uB808\uC774\uB354","\uAD6C\uB984 \uB080 \uB0A0\uB3C4, \uBC24\uC5D0\uB3C4 \uBB3C \uB304 \uB17C\uC744 \uAC00\uB978\uB2E4"]]),"narrow")}
    ${Zs("rice","04","\uBCBC \uC791\uD669",["\uC300 \uC218\uD655\uB7C9\uC744","7\uC6D4\uBD80\uD130 \uBBF8\uB9AC"],"\uAE30\uC0C1\xB7\uC704\uC131\xB7\uBCD1\uD574\uCDA9 \uC608\uCC30\uB85C<br>\uC2DC\uAD70\uBCC4 \uB2E8\uC218\uB97C 7\uBC88 \uC608\uCE21",`<div class="big b1">${xs(yg.y,{dec:1})}<small>kg/10a</small></div>
       <p class="big-cap b1">${ke.rice.year} \uC804\uAD6D \uB2E8\uC218 \uC608\uCE21 \xB7 ${yg.lab}</p>
       <div class="big b2">${xs(ae.riceAcc.m0915,{dec:1,from:ae.riceAcc.norm})}<small>kg \uD3C9\uADE0 \uC624\uCC28</small></div>
       <p class="big-cap b2">9\uC6D4 15\uC77C \uC608\uCE21 \xB7 \uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1 ${ae.riceAcc.stat}kg\uACFC \uAC19\uC740 \uC218\uC900\uC744 3\uC8FC \uBA3C\uC800</p>`)}
    ${Zs("jik","05","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",["\uB18D\uC5C5 \uC608\uC0B0\uC774","\uC5B4\uB514\uB85C \uAC00\uB294\uC9C0"],"\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5 \uC9D1\uD589 \uC790\uB8CC\uB97C<br>\uC790\uB3D9\uC73C\uB85C \uC77D\uC5B4 \uC2DC\uAD70\uBCC4\uB85C",`<ul class="chips"><li><b>${Of.govs}\uACF3</b>\uC9C0\uC790\uCCB4 \uAE30\uAE08</li><li><b>${$r(Qb.size/Sg.size)}\uBC30</b>${Sg.y}\uB144\uBCF4\uB2E4 \uCEE4\uC9C4 \uADDC\uBAA8</li><li><b>\uB300\uC870 \uAC80\uC99D</b>\uD589\uC815\uC548\uC804\uBD80 \uBC1C\uD45C \uBAA8\uAE08\uC561</li></ul>`)}
    ${Zs("flow","06","\uBB3C\uB958\uB3D9\uD5A5",["\uB18D\uC0B0\uBB3C\uC774","\uC6C0\uC9C1\uC774\uB294 \uAE38"],`\uBB3C\uB958\uAE30\uAE30 \uACF5\uB3D9\uC774\uC6A9 ${ae.od.years}\uB144 \xB7 ${ae.od.crops}\uAC1C \uD488\uBAA9<br>\uD310\uB85C\xB7\uCD9C\uD558 \uC8FC\uCCB4\uAE4C\uC9C0 \uC2DC\uAD70 \uC0AC\uC774 \uD750\uB984`,`<ol class="pairs">${ke.flows.top.slice(0,3).map(([s,t,e])=>`<li><span class="o">${Jc(s)}</span><i></i><span class="d">${Jc(t)}</span><b>${Df(e,0)}\uAC1C</b></li>`).join("")}</ol>`)}
    ${Zs("power","07","\uB18D\uC0AC\uC6A9 \uC804\uAE30",["\uACC4\uC808\uC744 \uB530\uB77C \uB3C4\uB294","\uB18D\uC5C5 \uC804\uB825"],`\uD55C\uC804 ${ae.power.regions}\uAC1C \uC9C0\uC5ED \xB7 ${ae.power.months}\uAC1C\uC6D4`,`<ul class="it-facts">
        <li><b>4\uAC00\uC9C0</b><span>${ae.power.types.join("\xB7")} \uACC4\uC808 \uC720\uD615 \uC790\uB3D9 \uBD84\uB958</span></li>
        <li><b>\uD3C9\uB144 \uBC94\uC704</b><span>\uBC97\uC5B4\uB09C \uC9C0\uC5ED\uC744 \uB2EC\uB9C8\uB2E4 \uC9DA\uB294\uB2E4</span></li>
        <li><b>${jb.toFixed(1)}\uBC30</b><span>${Js[0].slice(0,4)}\uB144\uBCF4\uB2E4 \uB298\uC5B4\uB09C ${Rg}\uB144 \uC0AC\uC6A9\uB7C9</span></li>
      </ul>`)}
    ${Qc.map(s=>`
      <section class="sc spot ${s.cls||""}" id="sc-${s.id}">
        <p class="kicker"><b>${s.no}</b>${s.name}</p>
        <div class="spot-big">${s.big}<small>${s.unit}</small></div>
        <p class="spot-line">${s.line}</p>
        ${s.pts.length?Zc(s.pts):""}
      </section>`).join("")}
  </div>
  <div class="labels">${Jb.map(([s,t])=>`<div class="lab" data-k="${s}"><b>${Jc(s)}</b><span>${Df(t)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>\uACBD\uC9C0\uBA74\uC801 ${ke.land.year}</span><i class="bar" style="background:${co(ao)}"></i><span>\uB192\uC774\xB7\uC0C9\uC774 \uD074\uC218\uB85D \uB113\uB2E4</span></div>
    <div class="it-lg" id="lg-rice"><span>\uD3C9\uB144\uBCF4\uB2E4 \uB0AE\uC74C</span><i class="bar" style="background:${co([Wi.lo,Wi.mid,Wi.hi])}"></i><span>\uB192\uC74C \xB7 ${ke.rice.year} \uC2DC\uAD70 \uC608\uCE21</span></div>
    <div class="it-lg" id="lg-jik"><span>\uC801\uC74C</span><i class="bar" style="background:${co(Wc)}"></i><span>\uB9CE\uC74C \xB7 \uB18D\uAC00\uB2F9 \uACF5\uC775\uC9C1\uBD88(\uAE30\uBCF8\uD615) \uC608\uC0B0 ${ke.jikbul.year}</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${ti.origin}"></i><span>\uBCF4\uB0B8 \uACF3</span><i class="it-dot" style="background:${ti.dest}"></i><span>\uBC1B\uC740 \uACF3 \xB7 \uCEE8\uD14C\uC774\uB108 ${ke.flows.year}\uB144 ${ke.flows.months} \xB7 \uC0C1\uC704 50</span></div>
    <div class="it-lg" id="lg-coop"><i class="it-dot" style="background:#f5a524"></i><span>\uC9C0\uC5ED\uB18D\uD611 ${ri.coopKinds.L}</span><i class="it-dot" style="background:#ff7a59"></i><span>\uCD95\uD611 ${ri.coopKinds.X}</span><i class="it-dot" style="background:#7cc98f"></i><span>\uD488\uBAA9\uB18D\uD611 ${ri.coopKinds.I} \xB7 \uC810 \uD06C\uAE30 = \uC790\uC0B0</span></div>
    <div class="it-lg" id="lg-dev"><span>\uC801\uC74C</span><i class="bar" style="background:${co(Xc)}"></i><span>\uB9CE\uC74C \xB7 \uAE30\uB465 \uB192\uC774 = \uC2DC\uAD70 \uC0AC\uC5C5 \uC9C0\uAD6C \uC218 (\uD55C\uAD6D\uB18D\uC5B4\uCD0C\uACF5\uC0AC)</span></div>
    <div class="it-lg" id="lg-lv"><span>\uB9C8\uC744\uB2F9 \uBD84\uB1E8 \uC801\uC74C</span><i class="bar" style="background:${co(qc)}"></i><span>\uB9CE\uC74C \xB7 \uAD6D\uB9BD\uD658\uACBD\uACFC\uD559\uC6D0 \uC804\uAD6D\uC624\uC5FC\uC6D0\uC870\uC0AC</span></div>
    <div class="it-lg" id="lg-power"><span>\uC804\uAD6D \uB18D\uC0AC\uC6A9 \uC804\uB825 \uC6D4 \uC0AC\uC6A9\uB7C9 \xB7 ${Js[0].replace("-",".")}~${Js.at(-1).replace("-",".")}</span></div>
  </div>`);var Ue=pg(js,ke,["home","home_jn","home_hn","home_sat","rice_sat"]);mg(js,n1);js.insertAdjacentHTML("beforeend",`
  <div class="wall-copy" id="sc-wall">
    <p class="kicker"><b>14</b>\uC790\uB8CC \uC218\uC9D1 \uD604\uD669</p>
    <h2 class="hl">${ho([`\uC790\uB8CC ${ae.status.items}\uC885, ${ae.status.auto}\uC885\uC740 \uC2A4\uC2A4\uB85C \uAC31\uC2E0`])}</h2>
    <p class="it-sub">${ae.status.orgs}\uAC1C \uAE30\uAD00\uC758 \uACF5\uAC1C \uC790\uB8CC \xB7 \uBB34\uC5C7\uC744 \uC5B8\uC81C \uBC1B\uC558\uB294\uC9C0\uAE4C\uC9C0 \uACF5\uAC1C</p>
  </div>
  <div class="maker" id="sc-maker">
    <figure class="mk-photo"><img src="assets/maker.webp" alt="" width="360" height="540"></figure>
    <div class="mk-text">
      <p class="kicker"><b>15</b>\uB9CC\uB4E0 \uC774</p>
      <h2 class="hl">${ho(["\uB9CC\uB4E0 \uC774\uC758 \uC0DD\uAC01"])}</h2>
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
    <h2 class="hl">${ho(["\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310"])}</h2>
    <p class="url">ag-rstat.vercel.app</p>
    <p class="srcs">\uAD6D\uAC00\uB370\uC774\uD130\uCC98 \xB7 \uD55C\uAD6D\uC740\uD589 \xB7 \uD55C\uC804 \xB7 \uB18D\uCD0C\uC9C4\uD765\uCCAD \xB7 \uC9C0\uBC29\uC7AC\uC815365 \uB4F1 ${ae.status.orgs}\uAC1C \uAE30\uAD00 \uACF5\uAC1C \uC790\uB8CC</p>
    <div class="btns"><a class="btn pri" href="./">\uD604\uD669\uD310 \uC5F4\uAE30</a><button type="button" class="btn" id="again">\uB2E4\uC2DC \uBCF4\uAE30</button></div>
  </div>`);var Qe={scene:0,bgI:0,glow:0,morph:0,pAlpha:1,mapAlpha:0,rise:0,tilt:0,orbit:0,camDist:23.5,camX:0,camY:0,mapShift:300,mapLift:0,riceColor:0,jikColor:0,mapDim:0,glAlpha:1,labels:0,riceAlpha:0,riceLine:0,riceFc:0,accAlpha:0,riceAcc:0,bdAlpha:0,bdBars:0,bdSplit:0,flows:0,flowAlpha:0,spiral:0,powerAlpha:0,rioA:0,rioP:0,empA:0,empP:0,coopA:0,coopP:0,devRise:0,devColor:0,soilA:0,soilP:0,lvA:0,lvP:0},Yr=cg(Ee("#gl"),ke),Pg=hg(Ee("#fx"),ke,Yr),i1=ug(Ee("#rice"),ke),s1=fg(Ee("#rice"),ke),Ig=xg(Ee("#sp"),Ee("#spsvg"),ke,Yr),uo={draw(){},canvas:Ee("#bg"),kind:"\u2026"},r1=Cg(".lab",js),Kc=960,Nf=540;function Lg(){let s=jc.clientWidth/cn;js.style.transform=`scale(${s})`;let t=Math.min(window.devicePixelRatio||1,1.75),e=Math.min(2880,Math.max(640,Math.round(cn*s*t))),n=Math.round(e*Xi/cn);Yr.resize(e,n),Pg.resize(e,n),Ig.resize(e,n),Kc=Math.max(480,Math.round(e/2)),Nf=Math.round(Kc*Xi/cn),uo.canvas.width=Kc,uo.canvas.height=Nf}new ResizeObserver(Lg).observe(jc);var ht={open:0,stats:5,real:12,sat:21,rice:29,jik:40,flow:48,power:54,spot:59,SPOT:5,wall:89.4,maker:94.4,end:102,total:106},fo=[{t:ht.open,name:"\uC5F4\uAE30"},{t:ht.stats,name:"\uC8FC\uC694\uD1B5\uACC4",href:"./"},{t:ht.real,name:"\uC2E4\uC81C \uD654\uBA74",href:"./"},{t:ht.sat,name:"\uC704\uC131\uC9C0\uB3C4",href:"./"},{t:ht.rice,name:"\uBCBC \uC791\uD669",href:"rice"},{t:ht.jik,name:"\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",href:"jikbul"},{t:ht.flow,name:"\uBB3C\uB958\uB3D9\uD5A5",href:"flow"},{t:ht.power,name:"\uB18D\uC0AC\uC6A9 \uC804\uAE30",href:"power"},...Qc.map((s,t)=>({t:ht.spot+t*ht.SPOT,name:s.name,href:s.href})),{t:ht.wall,name:"\uC790\uB8CC \uC218\uC9D1 \uD604\uD669",href:"status"},{t:ht.maker,name:"\uB9CC\uB4E0\uC774",href:"about"},{t:ht.end,name:"\uB2EB\uAE30"}],Ks=ht.total,Ft=Pi.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),qt=(s,t,e,n="power2.inOut")=>Ft.to(Qe,{...s,duration:e,ease:n},t),ai=(s,t,e=1.2)=>qt({scene:s},t,e);function Si(s,t){let e=typeof s=="string"?Ee(s):s;Ft.set(e,{autoAlpha:1,y:0},t).fromTo(e.querySelector(".kicker"),{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.6,ease:"power3.out"},t);let n=e.querySelectorAll(".hl .ch");n.length&&Ft.fromTo(n,{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.85,stagger:Math.min(.028,.5/n.length),ease:"expo.out"},t+.1);let i=e.querySelector(".it-sub");i&&Ft.fromTo(i,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.7,ease:"power2.out"},t+.5)}var bi=(s,t)=>Ft.to(typeof s=="string"?Ee(s):s,{autoAlpha:0,y:-24,duration:.45,ease:"power2.in"},t),Qs=(s,t,e=.16)=>{let n=Cg(`${s} .pts li, ${s} .it-facts li, ${s} .pairs li, ${s} .chips li`);n.length&&Ft.fromTo(n,{autoAlpha:0,x:-16},{autoAlpha:1,x:0,stagger:e,duration:.55,ease:"power2.out"},t)},Dg=[];function Ff(s,t,e){let n=+s.dataset.n,i=+(s.dataset.dec||0),r=s.dataset.suf||"",a=s.dataset.from!=null?+s.dataset.from:i?n*.94:0,o={v:a,last:""};Dg.push({elm:s,o,dec:i,suf:r}),Ft.fromTo(o,{v:a},{v:n,duration:e,ease:"power3.out"},t)}var vs=(s,t,e)=>Ft.fromTo(`#lg-${s}`,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},t).to(`#lg-${s}`,{autoAlpha:0,duration:.4},e),Ng=Ue.zoom,th=(s,t,e=.4)=>{Object.entries(Ue.imgs).forEach(([n,i])=>Ft.to(i,{autoAlpha:n===s?1:0,duration:e,ease:"power1.inOut"},t))},Bf=(s,t,e,n="sine.inOut",i)=>Ft.to(Ng,{...Ue.focus(s,i),duration:e,ease:n},t);function kf(s,t,e=.8){let n=Ue.at(s);Ft.to(Ue.cursor,{x:n.x,y:n.y,duration:e,ease:"power3.inOut"},t-e).fromTo(Ue.cursor.querySelector(".ripple"),{scale:.2,autoAlpha:.9},{scale:2.6,autoAlpha:0,duration:.55,ease:"power2.out"},t).fromTo(Ue.cursor.querySelector("svg"),{scale:1},{scale:.82,duration:.08,yoyo:!0,repeat:1,ease:"power1.inOut"},t)}Pi.set(".sc, .it-lg, .outro, .maker, .wall-copy, #scr-wrap, #wall-wrap, .mk",{autoAlpha:0});Pi.set(Ng,{scale:1,x:0,y:0,transformOrigin:"0 0"});Pi.set(Ue.cursor,{x:1100,y:645,autoAlpha:0});Pi.set(Ue.cursor.querySelector(".ripple"),{autoAlpha:0});Pi.set(Object.values(Ue.imgs),{autoAlpha:0});qt({bgI:1},0,1.6,"power1.out");qt({morph:1},.15,3.6,"none");qt({glow:.5},1.2,2.2);Si("#sc-open",.45);Ft.fromTo("#sc-open .mark",{scale:.4,rotate:-90},{scale:1,rotate:0,duration:1.2,ease:"back.out(2)"},.45);bi("#sc-open",4.4);qt({mapAlpha:1},3.3,1.2);qt({pAlpha:.32},3.8,1);ai(1,4.6,1.4);qt({tilt:1},5,2.3);qt({rise:1},5.5,2.5,"power2.out");qt({orbit:.36,camDist:21.2},5,6.8,"sine.inOut");qt({pAlpha:0},6.2,1.2);Si("#sc-stats",5.1);Qs("#sc-stats",6.4,.22);vs("stats",6,11.2);qt({labels:1},8,.6,"power2.out");qt({labels:0},11,.4);bi("#sc-stats",11.3);ai(2,11.6);qt({glAlpha:0},11.5,.8);var On=ht.real;Ft.set(Ue.imgs.home,{autoAlpha:1},On).fromTo("#scr-wrap",{autoAlpha:0,rotateY:-30,rotateX:10,x:220,z:-320},{autoAlpha:1,rotateY:-8,rotateX:3,x:0,z:0,duration:1.4,ease:"expo.out"},On);Si("#sc-real",On+.3);Qs("#sc-real",On+1.6,.2);Ft.set(Ue.cursor,{autoAlpha:1},On+1.2);kf(Ue.box("home","#sido"),On+2.6,1.2);th("home_jn",On+2.75);kf(Ue.box("home_jn","#sgg"),On+4.2,.9);th("home_hn",On+4.35);Ft.to(Ue.cursor,{autoAlpha:0,duration:.3},On+5);[[".ticker","\uC804\uB144 \uB300\uBE44 \uC99D\uAC10\uC774 \uD750\uB978\uB2E4","bottom"],["#map-card","\uC9C0\uB3C4\uB97C \uB204\uB974\uBA74 \uADF8 \uC2DC\uAD70\uC73C\uB85C","top"],[".col-right","\uC791\uBB3C\xB7\uC18C\uB4DD\xB7\uC608\uC0B0\xB7\uB18D\uAC00\uACBD\uC81C","top"]].forEach(([s,t,e],n)=>{let i=Ue.mark(`r${n}`,Ue.box("home",s),t,e);i&&Ft.fromTo(i,{autoAlpha:0,scale:1.04},{autoAlpha:1,scale:1,duration:.45,ease:"power2.out"},On+5.2+n*.55).to(i,{autoAlpha:0,duration:.3},On+8.3)});Ft.to("#scr-wrap",{rotateY:-4,rotateX:1.5,duration:7,ease:"sine.inOut"},On+1.4);ai(3,ht.sat-.4);bi("#sc-real",ht.sat-.3);Ft.set(Ue.cursor,{autoAlpha:1},ht.sat-1);kf(Ue.box("home_hn","#view-btn"),ht.sat+.1,.9);th("home_sat",ht.sat+.25,.5);Ft.to(Ue.cursor,{autoAlpha:0,duration:.3},ht.sat+.7);Si("#sc-sat",ht.sat+.3);Qs("#sc-sat",ht.sat+1.4,.5);Bf([300,120,960,600],ht.sat+.8,3.4,"sine.inOut",1);th("rice_sat",ht.sat+4.3,.6);Bf(null,ht.sat+4.3,.6,"power2.out");var Pf=Ue.mark("sat",Ue.box("rice_sat","#map-wrap"),"Sentinel-2 NDVI \xB7 \uD574\uB0A8\uAD70 \uB17C","top");Bf(Ue.box("rice_sat","#map-wrap"),ht.sat+4.9,2.6,"sine.inOut",.98);Pf&&Ft.fromTo(Pf,{autoAlpha:0},{autoAlpha:1,duration:.4},ht.sat+5.3).to(Pf,{autoAlpha:0,duration:.3},ht.sat+7.2);Ft.to("#scr-wrap",{autoAlpha:0,rotateY:14,x:-140,z:-240,duration:.7,ease:"power2.in"},ht.rice-.6);bi("#sc-sat",ht.rice-.6);ai(4,ht.rice-.4);Ft.set(Qe,{riceColor:1,jikColor:0,mapDim:0,rise:0,tilt:.24,orbit:0,camDist:23,camX:0,camY:0,labels:0,pAlpha:0},ht.rice-.3);qt({glAlpha:1},ht.rice-.25,.9);Si("#sc-rice",ht.rice+.2);Ft.set("#sc-rice .b2",{autoAlpha:0},ht.rice);qt({riceAlpha:1},ht.rice+.4,.6,"power1.out");qt({riceLine:1},ht.rice+.6,1.9,"power1.inOut");qt({riceFc:1},ht.rice+2.3,1.9,"power1.out");Ft.fromTo("#sc-rice .b1",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.1,duration:.6,ease:"power2.out"},ht.rice+2.2);Ff(Ee("#sc-rice .b1 .cnt"),ht.rice+2.2,2);vs("rice",ht.rice+.8,ht.jik-.4);qt({riceAlpha:0},ht.rice+5.4,.5);Ft.to("#sc-rice .b1",{autoAlpha:0,y:-10,duration:.4},ht.rice+5.4);qt({accAlpha:1},ht.rice+5.7,.4,"none");qt({riceAcc:1},ht.rice+5.8,2.6,"power1.out");Ft.fromTo("#sc-rice .b2",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},ht.rice+5.9);Ff(Ee("#sc-rice .b2 .cnt"),ht.rice+5.9,2.4);qt({accAlpha:0},ht.jik-.5,.4);bi("#sc-rice",ht.jik-.5);ai(5,ht.jik-.3);qt({riceColor:0,jikColor:1},ht.jik-.2,1.2);qt({orbit:.14,tilt:.42,camDist:22},ht.jik-.2,7.6,"sine.inOut");Si("#sc-jik",ht.jik+.2);vs("jik",ht.jik+.6,ht.flow-.4);qt({bdAlpha:1},ht.jik+.8,.4,"none");qt({bdBars:1},ht.jik+.9,1.8,"power1.out");qt({bdSplit:1},ht.jik+2.5,2.2,"power1.out");Qs("#sc-jik",ht.jik+1,.18);qt({bdAlpha:0},ht.flow-.5,.4);bi("#sc-jik",ht.flow-.5);ai(6,ht.flow-.3);qt({jikColor:0,mapDim:1,tilt:0,orbit:0,camDist:15.2,camX:.5,camY:1.5},ht.flow-.3,1.3);qt({flowAlpha:1},ht.flow+.4,.3,"none");qt({flows:1},ht.flow+.4,2.7,"power1.out");Si("#sc-flow",ht.flow+.3);Qs("#sc-flow",ht.flow+1.6,.14);vs("flow",ht.flow+.8,ht.power-.6);qt({flowAlpha:0},ht.power-.5,.6);bi("#sc-flow",ht.power-.5);qt({glAlpha:0},ht.power-.4,.8);ai(7,ht.power-.4);qt({powerAlpha:1},ht.power-.1,.5,"power1.out");qt({spiral:1},ht.power,3.3,"power1.inOut");qt({glow:.32},ht.power-.4,1);Si("#sc-power",ht.power+.1);Qs("#sc-power",ht.power+1.3,.2);vs("power",ht.power+.4,ht.spot-.6);qt({powerAlpha:0},ht.spot-.5,.5);bi("#sc-power",ht.spot-.5);var Se=s=>ht.spot+s*ht.SPOT;function a1(s){let t=Qc[s],e=Se(s),n=Ee(`#sc-${t.id}`);ai(8+s,e-.4,1),Si(n,e),Ft.fromTo(n.querySelectorAll(".spot-big, .spot-line"),{autoAlpha:0,y:16},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power3.out"},e+.15),Ff(n.querySelector(".cnt"),e+.15,1.6),Qs(`#sc-${t.id}`,e+1.3,.3),bi(n,e+ht.SPOT-.45)}Qc.forEach((s,t)=>a1(t));qt({rioA:1},Se(0)-.2,.5,"power1.out");qt({rioP:1},Se(0)+.1,2.6,"power2.out");qt({rioA:0},Se(1)-.5,.45);qt({empA:1},Se(1)-.1,.4,"none");qt({empP:1},Se(1)+.3,3.2,"power1.inOut");qt({empA:0},Se(2)-.5,.45);Ft.set(Qe,{mapDim:1,riceColor:0,jikColor:0,devColor:0,rise:0,devRise:0,tilt:0,orbit:0,camDist:23,camX:0,camY:0,mapShift:300,labels:0},Se(2)-.6);qt({glAlpha:1},Se(2)-.5,.7);qt({coopA:1},Se(2)-.1,.3,"none");qt({coopP:1},Se(2)+.2,2.8,"power1.inOut");vs("coop",Se(2)+.5,Se(3)-.4);qt({coopA:0},Se(3)-.5,.45);qt({mapDim:0,devColor:1,mapShift:-330,tilt:.95,orbit:-.42,camDist:20.5},Se(3)-.5,1.5);qt({devRise:1},Se(3)+.4,2.4,"power2.out");qt({orbit:-.12},Se(3)+1,3.6,"sine.inOut");vs("dev",Se(3)+.6,Se(4)-.4);qt({glAlpha:0},Se(4)-.5,.6);qt({soilA:1},Se(4)-.1,.4,"none");qt({soilP:1},Se(4)+.2,2.8,"power1.out");qt({soilA:0},Se(5)-.5,.45);Ft.set(Qe,{tilt:0,orbit:0,camDist:22,mapShift:260,devRise:0,devColor:0,mapDim:.9},Se(5)-.5);qt({lvA:1},Se(5)-.1,.3,"none");qt({lvP:1},Se(5)+.2,3,"power1.inOut");vs("lv",Se(5)+.6,ht.wall-.4);qt({lvA:0},ht.wall-.5,.45);ai(14,ht.wall-.4);Ft.set("#wall-wrap",{autoAlpha:1},ht.wall).fromTo("#wall .wt",{autoAlpha:0,z:-600,rotateX:-40},{autoAlpha:1,z:0,rotateX:0,duration:1.1,stagger:{each:.05,from:"center"},ease:"power3.out"},ht.wall).fromTo("#wall",{rotateZ:-7,rotateX:26,y:40},{rotateZ:-3,rotateX:18,y:0,duration:5,ease:"sine.inOut"},ht.wall).to("#wall-wrap",{autoAlpha:0,duration:.5},ht.maker-.5);Si("#sc-wall",ht.wall+.6);bi("#sc-wall",ht.maker-.5);ai(15,ht.maker-.4);Ft.set("#sc-maker",{autoAlpha:1,y:0},ht.maker).fromTo("#sc-maker .mk-photo",{autoAlpha:0,y:40,scale:.94},{autoAlpha:1,y:0,scale:1,duration:1.2,ease:"power3.out"},ht.maker+.1).fromTo("#sc-maker .kicker",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.5},ht.maker+.4).fromTo("#sc-maker .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.04,ease:"expo.out"},ht.maker+.5).fromTo("#sc-maker .mk-phil li",{autoAlpha:0,x:-18},{autoAlpha:1,x:0,duration:.6,stagger:.55,ease:"power2.out"},ht.maker+1.4).fromTo("#sc-maker .mk-quote, #sc-maker .mk-mail",{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.7,stagger:.4,ease:"power2.out"},ht.maker+4).to("#sc-maker",{autoAlpha:0,y:-20,duration:.5,ease:"power2.in"},ht.end-.5);ai(16,ht.end-.3);qt({glow:.55},ht.end-.3,1.2);Ft.set("#sc-end",{autoAlpha:1},ht.end).fromTo("#sc-end .mark",{scale:.3,rotate:-120,autoAlpha:0},{scale:1,rotate:0,autoAlpha:1,duration:1.1,ease:"back.out(1.8)"},ht.end).fromTo("#sc-end .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.035,ease:"expo.out"},ht.end+.15).fromTo("#sc-end .url, #sc-end .srcs, #sc-end .btns",{autoAlpha:0,y:12},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},ht.end+.6).set({},{},Ks);var qr=Af.map(([s,t])=>[_s(s).map(e=>e/255),_s(t).map(e=>e/255)]),si=new Float32Array(16),o1=performance.now();function l1(){let s=Ft.time(),t=(performance.now()-o1)/1e3,e=Math.min(Af.length-2,Math.floor(Qe.scene)),n=Qe.scene-e;for(let i=0;i<3;i++)si[4+i]=qr[e][0][i]+(qr[e+1][0][i]-qr[e][0][i])*n,si[8+i]=qr[e][1][i]+(qr[e+1][1][i]-qr[e][1][i])*n;si[0]=t,si[1]=Qe.bgI,si[2]=Kc,si[3]=Nf,si[12]=(cn/2+Qe.mapShift)/cn,si[13]=.5,si[14]=.42,si[15]=Qe.glow,uo.draw(si),Yr.render(Qe,t),Pg.render(Qe,s),i1.render(Qe),s1.render(Qe),Ig.render(Qe,s),r1.forEach((i,r)=>{let a=Yr.top(i.dataset.k);if(!a||Qe.labels<=.01){i.style.opacity=0;return}let[o,l]=Yr.project(a[0],a[1],a[2]),c=Math.min(1,Math.max(0,Qe.labels*1.4-r*.2));i.style.opacity=c,i.style.transform=`translate(${o.toFixed(1)}px, ${(l-12*(1-c)).toFixed(1)}px)`}),Dg.forEach(i=>{let r=i.o.v.toFixed(i.dec).replace(/\B(?=(\d{3})+(?!\d))/g,",")+i.suf;r!==i.o.last&&(i.o.last=r,i.elm.textContent=r)}),f1()}var Uf=Ee("#play"),Mi=Ee("#track"),c1=Ee("#fill"),h1=Ee("#time"),If=Ee("#go"),Ug=Ee("#chaps"),u1=Ee("#chapname");Mi.setAttribute("aria-valuemax",Ks);Ug.innerHTML=fo.map(s=>`<button type="button" data-t="${s.t}" style="left:${s.t/Ks*100}%" title="${s.name}" aria-label="${s.name}\uBD80\uD130 \uBCF4\uAE30"></button>`).join("");var Og=[...Ug.children],Ag=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`,Tg=-1,Eg="";function f1(){let s=Ft.time();c1.style.transform=`scaleX(${s/Ks})`,h1.textContent=`${Ag(s)} / ${Ag(Ks)}`,Mi.setAttribute("aria-valuenow",s.toFixed(1));let t=fo.reduce((n,i,r)=>s>=i.t-.01?r:n,0);if(t!==Tg){Tg=t,Og.forEach((i,r)=>{i.classList.toggle("on",r===t),i.classList.toggle("past",r<t)});let n=fo[t];u1.textContent=`${String(t).padStart(2,"0")} ${n.name}`,If.hidden=!n.href,n.href&&(If.href=n.href,If.textContent=`${n.name} \uD654\uBA74 \uC5F4\uAE30 \u2192`)}let e=Ft.progress()>=1?"end":Ft.paused()?"paused":"playing";e!==Eg&&(Eg=e,Uf.dataset.state=e,Uf.setAttribute("aria-label",e==="playing"?"\uBA48\uCDA4":e==="end"?"\uB2E4\uC2DC \uBCF4\uAE30":"\uC7AC\uC0DD"),jc.classList.toggle("is-paused",e==="paused"))}function Fg(){Ft.progress()>=1?Ft.restart():Ft.paused(!Ft.paused())}Uf.addEventListener("click",Fg);Ee("#again").addEventListener("click",()=>Ft.restart());Ee("#bigplay").addEventListener("click",()=>Ft.progress()>=1?Ft.restart():Ft.play());Og.forEach(s=>s.addEventListener("click",t=>{t.stopPropagation(),Ft.seek(+s.dataset.t+.001,!1),Ft.progress()<1&&Ft.play()}));var Bg=!1,kg=s=>{let t=Mi.getBoundingClientRect();Ft.seek(Math.min(1,Math.max(0,(s.clientX-t.left)/t.width))*Ks,!1)};Mi.addEventListener("pointerdown",s=>{s.target.closest("button")||(Bg=!Ft.paused()&&Ft.progress()<1,Ft.pause(),Mi.setPointerCapture(s.pointerId),kg(s))});Mi.addEventListener("pointermove",s=>{Mi.hasPointerCapture(s.pointerId)&&kg(s)});Mi.addEventListener("pointerup",s=>{Mi.releasePointerCapture(s.pointerId),Bg&&Ft.play()});Mi.addEventListener("keydown",s=>{let t={ArrowLeft:-5,ArrowRight:5}[s.key];t&&(s.preventDefault(),s.stopPropagation(),Ft.seek(Math.min(Ks,Math.max(0,Ft.time()+t)),!1))});document.addEventListener("keydown",s=>{if(!s.target.closest("input, textarea, select, .it-track")){if(s.key===" "||s.key==="k"){if(s.target.closest("a, button")&&s.key===" ")return;s.preventDefault(),Fg()}else if(s.key==="Home")Ft.seek(0,!1);else if(s.key==="ArrowRight"){let t=fo.find(e=>e.t>Ft.time()+.05);t&&Ft.seek(t.t+.001,!1)}else if(s.key==="ArrowLeft"){let t=[...fo].reverse().find(e=>e.t<Ft.time()-.6);Ft.seek((t?t.t:0)+.001,!1)}}});var Lf=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&!Ft.paused()?(Ft.pause(),Lf=!0):!document.hidden&&Lf&&(Lf=!1,Ft.play())});window.__intro={tl:Ft,S:Qe};(async()=>{uo=await np(Ee("#bg"),{gpu:!/[?&]gl\b/.test(location.search)}),js.dataset.gpu=uo.kind,Lg();try{await Promise.race([document.fonts.ready,new Promise(s=>setTimeout(s,1500))])}catch{}Pi.ticker.add(l1),jc.classList.add("ready"),Yb?(Ft.seek(9.5,!1),Ft.pause()):Ft.play(0)})();})();
