(()=>{function Ei(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function uf(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var Mn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ra={duration:.5,overwrite:!1,delay:0},Sh,je,Ce,kn=1e8,ye=1/kn,ph=Math.PI*2,og=ph/4,lg=0,df=Math.sqrt,cg=Math.cos,hg=Math.sin,Ge=function(t){return typeof t=="string"},Oe=function(t){return typeof t=="function"},Ri=function(t){return typeof t=="number"},Lo=function(t){return typeof t>"u"},ui=function(t){return typeof t=="object"},yn=function(t){return t!==!1},bh=function(){return typeof window<"u"},Mo=function(t){return Oe(t)||Ge(t)},ff=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},rn=Array.isArray,ug=/random\([^)]+\)/g,dg=/,\s*/g,nf=/(?:-?\.?\d|\.)+/gi,wh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ps=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,oh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ah=/[+-]=-?[.\d]+/,fg=/[^,'"\[\]\s]+/gi,pg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Le,ci,mh,Th,En={},Ao={},pf,mf=function(t){return(Ao=rr(t,En))&&an},Do=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},aa=function(t,e){return!e&&console.warn(t)},gf=function(t,e){return t&&(En[t]=e)&&Ao&&(Ao[t]=e)||En},oa=function(){return 0},mg={suppressEvents:!0,isStart:!0,kill:!1},So={suppressEvents:!0,kill:!1},gg={suppressEvents:!0},Eh={},Ji=[],gh={},_f,xn={},lh={},sf=30,bo=[],Ch="",Rh=function(t){var e=t[0],n,i;if(ui(e)||Oe(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=bo.length;i--&&!bo[i].targetTest(e););n=bo[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Dh(t[i],n)))||t.splice(i,1);return t},Ki=function(t){return t._gsap||Rh(zn(t))[0]._gsap},Ph=function(t,e,n){return(n=t[e])&&Oe(n)?t[e]():Lo(n)&&t.getAttribute&&t.getAttribute(e)||n},dn=function(t,e){return(t=t.split(",")).forEach(e)||t},Fe=function(t){return Math.round(t*1e5)/1e5||0},Ie=function(t){return Math.round(t*1e7)/1e7||0},Is=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},_g=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},To=function(){var t=Ji.length,e=Ji.slice(0),n,i;for(gh={},Ji.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Ih=function(t){return!!(t._initted||t._startAt||t.add)},xf=function(t,e,n,i){Ji.length&&!je&&To(),t.render(e,n,i||!!(je&&e<0&&Ih(t))),Ji.length&&!je&&To()},vf=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(fg).length<2?e:Ge(t)?t.trim():t},yf=function(t){return t},Cn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},xg=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},rr=function(t,e){for(var n in e)t[n]=e[n];return t},rf=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=ui(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},Eo=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},na=function(t){var e=t.parent||Le,n=t.keyframes?xg(rn(t.keyframes)):Cn;if(yn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},vg=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Mf=function(t,e,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},No=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,a=e._next;r?r._next=a:t[n]===e&&(t[n]=a),a?a._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},ji=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Es=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},yg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},_h=function(t,e,n,i){return t._startAt&&(je?t._startAt.revert(So):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},Mg=function s(t){return!t||t._ts&&s(t.parent)},af=function(t){return t._repeat?ar(t._tTime,t=t.duration()+t._rDelay)*t:0},ar=function(t,e){var n=Math.floor(t=Ie(t/e));return t&&n===t?n-1:n},Co=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Uo=function(t){return t._end=Ie(t._start+(t._tDur/Math.abs(t._ts||t._rts||ye)||0))},Oo=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Ie(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Uo(t),n._dirty||Es(n,t)),t},Sf=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Co(t.rawTime(),e),(!e._dur||ua(0,e.totalDuration(),n)-e._tTime>ye)&&e.render(n,!0)),Es(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ye}},hi=function(t,e,n,i){return e.parent&&ji(e),e._start=Ie((Ri(n)?n:!n&&Ro(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==Le?Bn(t,n,e):t._time)+e._delay),e._end=Ie(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Mf(t,e,"_first","_last",t._sort?"_start":0),Ro(e)||(t._recent=e),i||Sf(t,e),t._ts<0&&Oo(t,t._tTime),t},bf=function(t,e){return(En.ScrollTrigger||Do("scrollTrigger",e))&&En.ScrollTrigger.create(e,t)},wf=function(t,e,n,i,r){if(Oh(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!je&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&_f!==vn.frame)return Ji.push(t),t._lazy=[r,i],1},Sg=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},Ro=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},bg=function(t,e,n,i){var r=t.ratio,a=e<0||!e&&(!t._start&&Sg(t)&&!(!t._initted&&Ro(t))||(t._ts<0||t._dp._ts<0)&&!Ro(t))?0:1,o=t._rDelay,l=0,c,h,f;if(o&&t._repeat&&(l=ua(0,t._tDur,e),h=ar(l,o),t._yoyo&&h&1&&(a=1-a),h!==ar(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||je||i||t._zTime===ye||!e&&t._zTime){if(!t._initted&&wf(t,e,i,n,l))return;for(f=t._zTime,t._zTime=e||(n?ye:0),n||(n=e&&!f),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&_h(t,e,n,!0),t._onUpdate&&!n&&Tn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Tn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&ji(t,1),!n&&!je&&(Tn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},wg=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},or=function(t,e,n,i){var r=t._repeat,a=Ie(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Ie(a*(r+1)+t._rDelay*r):a,o>0&&!i&&Oo(t,t._tTime=t._tDur*o),t.parent&&Uo(t),n||Es(t.parent,t),t},of=function(t){return t instanceof sn?Es(t):or(t,t._dur)},Ag={_start:0,endTime:oa,totalDuration:oa},Bn=function s(t,e,n){var i=t.labels,r=t._recent||Ag,a=t.duration()>=kn?r.endTime(!1):t._dur,o,l,c;return Ge(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(rn(n)?n[0]:n).totalDuration()),o>1?s(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},ia=function(t,e,n){var i=Ri(e[1]),r=(i?2:1)+(t<2?0:1),a=e[r],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=yn(l.vars.inherit)&&l.parent;a.immediateRender=yn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new Be(e[0],a,e[r+1])},Qi=function(t,e){return t||t===0?e(t):e},ua=function(t,e,n){return n<t?t:n>e?e:n},Qe=function(t,e){return!Ge(t)||!(e=pg.exec(t))?"":e[1]},Tg=function(t,e,n){return Qi(n,function(i){return ua(t,e,i)})},xh=[].slice,Af=function(t,e){return t&&ui(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&ui(t[0]))&&!t.nodeType&&t!==ci},Eg=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return Ge(i)&&!e||Af(i,1)?(r=n).push.apply(r,zn(i)):n.push(i)})||n},zn=function(t,e,n){return Ce&&!e&&Ce.selector?Ce.selector(t):Ge(t)&&!n&&(mh||!lr())?xh.call((e||Th).querySelectorAll(t),0):rn(t)?Eg(t,n):Af(t)?xh.call(t,0):t?[t]:[]},vh=function(t){return t=zn(t)[0]||aa("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return zn(e,n.querySelectorAll?n:n===t?aa("Invalid scope")||Th.createElement("div"):t)}},Tf=function(t){return t.sort(function(){return .5-Math.random()})},Ef=function(t){if(Oe(t))return t;var e=ui(t)?t:{each:t},n=Cs(e.ease),i=e.from||0,r=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,f=i;return Ge(i)?h=f={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],f=i[1]),function(d,u,m){var _=(m||e).length,p=a[_],g,y,S,v,A,T,x,b,C;if(!p){if(C=e.grid==="auto"?0:(e.grid||[1,kn])[1],!C){for(x=-kn;x<(x=m[C++].getBoundingClientRect().left)&&C<_;);C<_&&C--}for(p=a[_]=[],g=l?Math.min(C,_)*h-.5:i%C,y=C===kn?0:l?_*f/C-.5:i/C|0,x=0,b=kn,T=0;T<_;T++)S=T%C-g,v=y-(T/C|0),p[T]=A=c?Math.abs(c==="y"?v:S):df(S*S+v*v),A>x&&(x=A),A<b&&(b=A);i==="random"&&Tf(p),p.max=x-b,p.min=b,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(C>_?_-1:c?c==="y"?_/C:C:Math.max(C,_/C))||0)*(i==="edges"?-1:1),p.b=_<0?r-_:r,p.u=Qe(e.amount||e.each)||0,n=n&&_<0?zg(n):n}return _=(p[d]-p.min)/p.max||0,Ie(p.b+(n?n(_):_)*p.v)+p.u}},yh=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Ie(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Ri(n)?0:Qe(n))}},Cf=function(t,e){var n=rn(t),i,r;return!n&&ui(t)&&(i=n=t.radius||kn,t.values?(t=zn(t.values),(r=!Ri(t[0]))&&(i*=i)):t=yh(t.increment)),Qi(e,n?Oe(t)?function(a){return r=t(a),Math.abs(r-a)<=i?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=kn,h=0,f=t.length,d,u;f--;)r?(d=t[f].x-o,u=t[f].y-l,d=d*d+u*u):d=Math.abs(t[f]-o),d<c&&(c=d,h=f);return h=!i||c<=i?t[h]:a,r||h===a||Ri(a)?h:h+Qe(a)}:yh(t))},Rf=function(t,e,n,i){return Qi(rn(t)?!e:n===!0?!!(n=0):!i,function(){return rn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},Cg=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,a){return a(r)},i)}},Rg=function(t,e){return function(n){return t(parseFloat(n))+(e||Qe(n))}},Pg=function(t,e,n){return If(t,e,0,1,n)},Pf=function(t,e,n){return Qi(n,function(i){return t[~~e(i)]})},Ig=function s(t,e,n){var i=e-t;return rn(t)?Pf(t,s(0,t.length),e):Qi(n,function(r){return(i+(r-t)%i)%i+t})},Lg=function s(t,e,n){var i=e-t,r=i*2;return rn(t)?Pf(t,s(0,t.length-1),e):Qi(n,function(a){return a=(r+(a-t)%r)%r||0,t+(a>i?r-a:a)})},cr=function(t){return t.replace(ug,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(dg);return Rf(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},If=function(t,e,n,i,r){var a=e-t,o=i-n;return Qi(r,function(l){return n+((l-t)/a*o||0)})},Dg=function s(t,e,n,i){var r=isNaN(t+e)?0:function(u){return(1-u)*t+u*e};if(!r){var a=Ge(t),o={},l,c,h,f,d;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(rn(t)&&!rn(e)){for(h=[],f=t.length,d=f-2,c=1;c<f;c++)h.push(s(t[c-1],t[c]));f--,r=function(m){m*=f;var _=Math.min(d,~~m);return h[_](m-_)},n=e}else i||(t=rr(rn(t)?[]:{},t));if(!h){for(l in e)Nh.call(o,t,l,"get",e[l]);r=function(m){return kh(m,o)||(a?t.p:t)}}}return Qi(n,r)},lf=function(t,e,n){var i=t.labels,r=kn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},Tn=function(t,e,n){var i=t.vars,r=i[e],a=Ce,o=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&Ji.length&&To(),o&&(Ce=o),h=l?r.apply(c,l):r.call(c),Ce=a,h},ta=function(t){return ji(t),t.scrollTrigger&&t.scrollTrigger.kill(!!je),t.progress()<1&&Tn(t,"onInterrupt"),t},sr,Lf=[],Df=function(t){if(t)if(t=!t.name&&t.default||t,bh()||t.headless){var e=t.name,n=Oe(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:oa,render:kh,add:Nh,kill:Jg,modifier:Zg,rawVars:0},a={targetTest:0,get:0,getSetter:Fo,aliases:{},register:0};if(lr(),t!==i){if(xn[e])return;Cn(i,Cn(Eo(t,r),a)),rr(i.prototype,rr(r,Eo(t,a))),xn[i.prop=e]=i,t.targetTest&&(bo.push(i),Eh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}gf(e,i),t.register&&t.register(an,i,fn)}else Lf.push(t)},Se=255,ea={aqua:[0,Se,Se],lime:[0,Se,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Se],navy:[0,0,128],white:[Se,Se,Se],olive:[128,128,0],yellow:[Se,Se,0],orange:[Se,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Se,0,0],pink:[Se,192,203],cyan:[0,Se,Se],transparent:[Se,Se,Se,0]},ch=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Se+.5|0},Nf=function(t,e,n){var i=t?Ri(t)?[t>>16,t>>8&Se,t&Se]:0:ea.black,r,a,o,l,c,h,f,d,u,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),ea[t])i=ea[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Se,i&Se,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Se,t&Se]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(nf),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,r=h*2-a,i.length>3&&(i[3]*=1),i[0]=ch(l+1/3,r,a),i[1]=ch(l,r,a),i[2]=ch(l-1/3,r,a);else if(~t.indexOf("="))return i=t.match(wh),n&&i.length<4&&(i[3]=1),i}else i=t.match(nf)||ea.transparent;i=i.map(Number)}return e&&!m&&(r=i[0]/Se,a=i[1]/Se,o=i[2]/Se,f=Math.max(r,a,o),d=Math.min(r,a,o),h=(f+d)/2,f===d?l=c=0:(u=f-d,c=h>.5?u/(2-f-d):u/(f+d),l=f===r?(a-o)/u+(a<o?6:0):f===a?(o-r)/u+2:(r-a)/u+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Uf=function(t){var e=[],n=[],i=-1;return t.split(Ci).forEach(function(r){var a=r.match(Ps)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},cf=function(t,e,n){var i="",r=(t+i).match(Ci),a=e?"hsla(":"rgba(",o=0,l,c,h,f;if(!r)return t;if(r=r.map(function(d){return(d=Nf(d,e,1))&&a+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=Uf(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Ci,"1").split(Ps),f=c.length-1;o<f;o++)i+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(Ci),f=c.length-1;o<f;o++)i+=c[o]+r[o];return i+c[f]},Ci=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in ea)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),Ng=/hsl[a]?\(/,Lh=function(t){var e=t.join(" "),n;if(Ci.lastIndex=0,Ci.test(e))return n=Ng.test(e),t[1]=cf(t[1],n),t[0]=cf(t[0],n,Uf(t[1])),!0},la,vn=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,a=r,o=[],l,c,h,f,d,u,m=function _(p){var g=s()-i,y=p===!0,S,v,A,T;if((g>t||g<0)&&(n+=g-e),i+=g,A=i-n,S=A-a,(S>0||y)&&(T=++f.frame,d=A-f.time*1e3,f.time=A=A/1e3,a+=S+(S>=r?0:r-S),v=1),y||(l=c(_)),v)for(u=0;u<o.length;u++)o[u](A,d,T,p)};return f={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){pf&&(!mh&&bh()&&(ci=mh=window,Th=ci.document||{},En.gsap=an,(ci.gsapVersions||(ci.gsapVersions=[])).push(an.version),mf(Ao||ci.GreenSockGlobals||!ci.gsap&&ci||{}),Lf.forEach(Df)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=h||function(p){return setTimeout(p,a-f.time*1e3+1|0)},la=1,m(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),la=0,c=oa},lagSmoothing:function(p,g){t=p||1/0,e=Math.min(g||33,t)},fps:function(p){r=1e3/(p||240),a=f.time*1e3+r},add:function(p,g,y){var S=g?function(v,A,T,x){p(v,A,T,x),f.remove(S)}:p;return f.remove(p),o[y?"unshift":"push"](S),lr(),S},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&u>=g&&u--},_listeners:o},f})(),lr=function(){return!la&&vn.wake()},he={},Ug=/^[\d.\-M][\d.\-,\s]/,Og=/["']/g,Fg=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(Og,"").trim():+c,i=l.substr(o+1).trim();return e},Bg=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},kg=function(t){var e=(t+"").split("("),n=he[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Fg(e[1])]:Bg(t).split(",").map(vf)):he._CE&&Ug.test(t)?he._CE("",t):n},zg=function(t){return function(e){return 1-t(1-e)}},Cs=function(t,e){return t&&(Oe(t)?t:he[t]||kg(t))||e},Ls=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},a;return dn(t,function(o){he[o]=En[o]=r,he[a=o.toLowerCase()]=n;for(var l in r)he[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=he[o+"."+l]=r[l]}),r},Of=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},hh=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),a=r/ph*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*hg((h-a)*r)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Of(o);return r=ph/r,l.config=function(c,h){return s(t,c,h)},l},uh=function s(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:Of(n);return i.config=function(r){return s(t,r)},i};dn("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Ls(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});he.Linear.easeNone=he.none=he.Linear.easeIn;Ls("Elastic",hh("in"),hh("out"),hh());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(o){return o<e?s*o*o:o<n?s*Math.pow(o-1.5/t,2)+.75:o<i?s*(o-=2.25/t)*o+.9375:s*Math.pow(o-2.625/t,2)+.984375};Ls("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Ls("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Ls("Circ",function(s){return-(df(1-s*s)-1)});Ls("Sine",function(s){return s===1?1:-cg(s*og)+1});Ls("Back",uh("in"),uh("out"),uh());he.SteppedEase=he.steps=En.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,a=1-ye;return function(o){return((i*ua(0,a,o)|0)+r)*n}}};ra.ease=he["quad.out"];dn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Ch+=s+","+s+"Params,"});var Dh=function(t,e){this.id=lg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Ph,this.set=e?e.getSetter:Fo},ca=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,or(this,+e.duration,1,1),this.data=e.data,Ce&&(this._ctx=Ce,Ce.data.push(this)),la||vn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,or(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(lr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Oo(this,n),!r._dp||r.parent||Sf(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&hi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ye||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),xf(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+af(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+af(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?ar(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-ye?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?Co(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-ye?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||r>0&&r<o)&&this.totalTime(ua(-Math.abs(this._delay),o,r),i!==!1),Uo(this),yg(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{lr(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,r=this.progress()===1&&Math.abs(this._zTime)!==ye,a;if(r)for(this._tTime-=ye,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+ye){r=!1;break}a=a._next}this.totalTime(i,r)}return this},t.startTime=function(n){if(arguments.length){this._start=Ie(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&hi(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(yn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Co(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=gg);var i=je;return je=n,Ih(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),je=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,of(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,of(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Bn(this,n),yn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,yn(i)),this._dur||(this._zTime=-ye),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ye:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ye,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-ye)},t.eventCallback=function(n,i,r){var a=this.vars;return arguments.length>1?(i?(a[n]=i,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(a){var o=Oe(n)?n:yf,l=function(){var h=i.then;i.then=null,r&&r(),Oe(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){ta(this)},s})();Cn(ca.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ye,_prom:0,_ps:!1,_rts:1});var sn=(function(s){uf(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=yn(n.sortChildren),Le&&hi(n.parent||Le,Ei(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&bf(Ei(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,a){return ia(0,arguments,this),this},e.from=function(i,r,a){return ia(1,arguments,this),this},e.fromTo=function(i,r,a,o){return ia(2,arguments,this),this},e.set=function(i,r,a){return r.duration=0,r.parent=this,na(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Be(i,r,Bn(this,a),1),this},e.call=function(i,r,a){return hi(this,Be.delayedCall(0,i,r),a)},e.staggerTo=function(i,r,a,o,l,c,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Be(i,a,Bn(this,l)),this},e.staggerFrom=function(i,r,a,o,l,c,h){return a.runBackwards=1,na(a).immediateRender=yn(a.immediateRender),this.staggerTo(i,r,a,o,l,c,h)},e.staggerFromTo=function(i,r,a,o,l,c,h,f){return o.startAt=a,na(o).immediateRender=yn(o.immediateRender),this.staggerTo(i,r,o,l,c,h,f)},e.render=function(i,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Ie(i),f=this._zTime<0!=i<0&&(this._initted||!c),d,u,m,_,p,g,y,S,v,A,T,x;if(this!==Le&&h>l&&i>=0&&(h=l),h!==this._tTime||a||f){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),d=h,v=this._start,S=this._ts,g=!S,f&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,a);if(d=Ie(h%p),h===l?(_=this._repeat,d=c):(A=Ie(h/p),_=~~A,_&&_===A&&(d=c,_--),d>c&&(d=c)),A=ar(this._tTime,p),!o&&this._tTime&&A!==_&&this._tTime-A*p-this._dur<=0&&(A=_),T&&_&1&&(d=c-d,x=1),_!==A&&!this._lock){var b=T&&A&1,C=b===(T&&_&1);if(_<A&&(b=!b),o=b?0:h%c?c:h,this._lock=1,this.render(o||(x?0:Ie(_*p)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&Tn(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,A=_),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,C&&(this._lock=2,o=b?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=wg(this,Ie(o),Ie(d)),y&&(h-=d-(d=y._start))),this._tTime=h,this._time=d,this._act=!!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!r&&!A&&(Tn(this,"onStart"),this._tTime!==h))return this;if(d>=o&&i>=0)for(u=this._first;u;){if(m=u._next,(u._act||d>=u._start)&&u._ts&&y!==u){if(u.parent!==this)return this.render(i,r,a);if(u.render(u._ts>0?(d-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(d-u._start)*u._ts,r,a),d!==this._time||!this._ts&&!g){y=0,m&&(h+=this._zTime=-ye);break}}u=m}else{u=this._last;for(var R=i<0?i:d;u;){if(m=u._prev,(u._act||R<=u._end)&&u._ts&&y!==u){if(u.parent!==this)return this.render(i,r,a);if(u.render(u._ts>0?(R-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(R-u._start)*u._ts,r,a||je&&Ih(u)),d!==this._time||!this._ts&&!g){y=0,m&&(h+=this._zTime=R?-ye:ye);break}}u=m}}if(y&&!r&&(this.pause(),y.render(d>=o?0:-ye)._zTime=d>=o?1:-1,this._ts))return this._start=v,Uo(this),this.render(i,r,a);this._onUpdate&&!r&&Tn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(v===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&ji(this,1),!r&&!(i<0&&!o)&&(h||o||!l)&&(Tn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var a=this;if(Ri(r)||(r=Bn(this,r,i)),!(i instanceof ca)){if(rn(i))return i.forEach(function(o){return a.add(o,r)}),this;if(Ge(i))return this.addLabel(i,r);if(Oe(i))i=Be.delayedCall(0,i);else return this}return this!==i?hi(this,i,r):this},e.getChildren=function(i,r,a,o){i===void 0&&(i=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-kn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Be?r&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===i)return r[a]},e.remove=function(i){return Ge(i)?this.removeLabel(i):Oe(i)?this.killTweensOf(i):(i.parent===this&&No(this,i),i===this._recent&&(this._recent=this._last),Es(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ie(vn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=Bn(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,a){var o=Be.delayedCall(0,r||oa,a);return o.data="isPause",this._hasPause=1,hi(this,o,Bn(this,i))},e.removePause=function(i){var r=this._first;for(i=Bn(this,i);r;)r._start===i&&r.data==="isPause"&&ji(r),r=r._next},e.killTweensOf=function(i,r,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Zi!==o[l]&&o[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var a=[],o=zn(i),l=this._first,c=Ri(r),h;l;)l instanceof Be?_g(l._targets,o)&&(c?(!Zi||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(h=l.getTweensOf(o,r)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,r){r=r||{};var a=this,o=Bn(a,i),l=r,c=l.startAt,h=l.onStart,f=l.onStartParams,d=l.immediateRender,u,m=Be.to(a,Cn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||ye,onStart:function(){if(a.pause(),!u){var p=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==p&&or(m,p,0,1).render(m._time,!0,!0),u=1}h&&h.apply(m,f||[])}},r));return d?m.render(0):m},e.tweenFromTo=function(i,r,a){return this.tweenTo(r,Cn({startAt:{time:Bn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),lf(this,Bn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),lf(this,Bn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ye)},e.shiftChildren=function(i,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Ie(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=i);return Es(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Es(this)},e.totalDuration=function(i){var r=0,a=this,o=a._last,l=kn,c,h,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,hi(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(r-=h,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=Ie(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;or(a,a===Le&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(Le._ts&&(xf(Le,Co(i,Le)),_f=vn.frame),vn.frame>=sf){sf+=Mn.autoSleep||120;var r=Le._first;if((!r||!r._ts)&&Mn.autoSleep&&vn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||vn.sleep()}}},t})(ca);Cn(sn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Vg=function(t,e,n,i,r,a,o){var l=new fn(this._pt,t,e,0,1,Bh,null,r),c=0,h=0,f,d,u,m,_,p,g,y;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=cr(i)),a&&(y=[n,i],a(y,t,e),n=y[0],i=y[1]),d=n.match(oh)||[];f=oh.exec(i);)m=f[0],_=i.substring(c,f.index),u?u=(u+1)%5:_.substr(-5)==="rgba("&&(u=1),m!==d[h++]&&(p=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:m.charAt(1)==="="?Is(p,m)-p:parseFloat(m)-p,m:u&&u<4?Math.round:0},c=oh.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Ah.test(i)||g)&&(l.e=0),this._pt=l,l},Nh=function(t,e,n,i,r,a,o,l,c,h){Oe(i)&&(i=i(r||0,t,a));var f=t[e],d=n!=="get"?n:Oe(f)?c?t[e.indexOf("set")||!Oe(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,u=Oe(f)?c?qg:Bf:Fh,m;if(Ge(i)&&(~i.indexOf("random(")&&(i=cr(i)),i.charAt(1)==="="&&(m=Is(d,i)+(Qe(d)||0),(m||m===0)&&(i=m))),!h||d!==i||Mh)return!isNaN(d*i)&&i!==""?(m=new fn(this._pt,t,e,+d||0,i-(d||0),typeof f=="boolean"?Yg:kf,0,u),c&&(m.fp=c),o&&m.modifier(o,this,t),this._pt=m):(!f&&!(e in t)&&Do(e,i),Vg.call(this,t,e,d,i,u,l||Mn.stringFilter,c))},Gg=function(t,e,n,i,r){if(Oe(t)&&(t=sa(t,r,e,n,i)),!ui(t)||t.style&&t.nodeType||rn(t)||ff(t))return Ge(t)?sa(t,r,e,n,i):t;var a={},o;for(o in t)a[o]=sa(t[o],r,e,n,i);return a},Uh=function(t,e,n,i,r,a){var o,l,c,h;if(xn[t]&&(o=new xn[t]).init(r,o.rawVars?e[t]:Gg(e[t],i,r,a,n),n,i,a)!==!1&&(n._pt=l=new fn(n._pt,r,t,0,1,o.render,o,0,o.priority),n!==sr))for(c=n._ptLookup[n._targets.indexOf(r)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Zi,Mh,Oh=function s(t,e,n){var i=t.vars,r=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,f=i.yoyoEase,d=i.keyframes,u=i.autoRevert,m=t._dur,_=t._startAt,p=t._targets,g=t.parent,y=g&&g.data==="nested"?g.vars.targets:p,S=t._overwrite==="auto"&&!Sh,v=t.timeline,A=i.easeReverse||f,T,x,b,C,R,L,W,O,P,F,V,N,Y;if(v&&(!d||!r)&&(r="none"),t._ease=Cs(r,ra.ease),t._rEase=A&&(Cs(A)||t._ease),t._from=!v&&!!i.runBackwards,t._from&&(t.ratio=1),!v||d&&!i.stagger){if(O=p[0]?Ki(p[0]).harness:0,N=O&&i[O.prop],T=Eo(i,Eh),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!u?_.render(-1,!0):_.revert(h&&m?So:mg),_._lazy=0),a){if(ji(t._startAt=Be.set(p,Cn({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&yn(l),startAt:null,delay:0,onUpdate:c&&function(){return Tn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(je||!o&&!u)&&t._startAt.revert(So),o&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&m&&!_){if(e&&(o=!1),b=Cn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&yn(l),immediateRender:o,stagger:0,parent:g},T),N&&(b[O.prop]=N),ji(t._startAt=Be.set(p,b)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(je?t._startAt.revert(So):t._startAt.render(-1,!0)),t._zTime=e,!o)s(t._startAt,ye,ye);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&yn(l)||l&&!m,x=0;x<p.length;x++){if(R=p[x],W=R._gsap||Rh(p)[x]._gsap,t._ptLookup[x]=F={},gh[W.id]&&Ji.length&&To(),V=y===p?x:y.indexOf(R),O&&(P=new O).init(R,N||T,t,V,y)!==!1&&(t._pt=C=new fn(t._pt,R,P.name,0,1,P.render,P,0,P.priority),P._props.forEach(function(X){F[X]=C}),P.priority&&(L=1)),!O||N)for(b in T)xn[b]&&(P=Uh(b,T,t,V,R,y))?P.priority&&(L=1):F[b]=C=Nh.call(t,R,b,"get",T[b],V,y,0,i.stringFilter);t._op&&t._op[x]&&t.kill(R,t._op[x]),S&&t._pt&&(Zi=t,Le.killTweensOf(R,F,t.globalTime(e)),Y=!t.parent,Zi=0),t._pt&&l&&(gh[W.id]=1)}L&&zh(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!Y,d&&e<=0&&v.render(kn,!0,!0)},Hg=function(t,e,n,i,r,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,f,d,u;if(!c)for(c=t._ptCache[e]=[],d=t._ptLookup,u=t._targets.length;u--;){if(h=d[u][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Mh=1,t.vars[e]="+=0",Oh(t,o),Mh=0,l?aa(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(u=c.length;u--;)f=c[u],h=f._pt||f,h.s=(i||i===0)&&!r?i:h.s+(i||0)+a*h.c,h.c=n-h.s,f.e&&(f.e=Fe(n)+Qe(f.e)),f.b&&(f.b=h.s+Qe(f.b))},Wg=function(t,e){var n=t[0]?Ki(t[0]).harness:0,i=n&&n.aliases,r,a,o,l;if(!i)return e;r=rr({},e);for(a in i)if(a in r)for(l=i[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},Xg=function(t,e,n,i){var r=e.ease||i||"power1.inOut",a,o;if(rn(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:r})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},sa=function(t,e,n,i,r){return Oe(t)?t.call(e,n,i,r):Ge(t)&&~t.indexOf("random(")?cr(t):t},Po=Ch+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Ff={};dn(Po+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Ff[s]=1});Po=Po.split(",");var Be=(function(s){uf(t,s);function t(n,i,r,a){var o;typeof i=="number"&&(r.duration=i,i=r,r=null),o=s.call(this,a?i:na(i))||this;var l=o.vars,c=l.duration,h=l.delay,f=l.immediateRender,d=l.stagger,u=l.overwrite,m=l.keyframes,_=l.defaults,p=l.scrollTrigger,g=i.parent||Le,y=(rn(n)||ff(n)?Ri(n[0]):"length"in i)?[n]:zn(n),S,v,A,T,x,b,C,R;if(o._targets=y.length?Rh(y):aa("GSAP target "+n+" not found. https://gsap.com",!Mn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=u,m||d||Mo(c)||Mo(h)){i=o.vars;var L=i.easeReverse||i.yoyoEase;if(S=o.timeline=new sn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:y}),S.kill(),S.parent=S._dp=Ei(o),S._start=0,d||Mo(c)||Mo(h)){if(T=y.length,C=d&&Ef(d),ui(d))for(x in d)~Po.indexOf(x)&&(R||(R={}),R[x]=d[x]);for(v=0;v<T;v++)A=Eo(i,Ff),A.stagger=0,L&&(A.easeReverse=L),R&&rr(A,R),b=y[v],A.duration=+sa(c,Ei(o),v,b,y),A.delay=(+sa(h,Ei(o),v,b,y)||0)-o._delay,!d&&T===1&&A.delay&&(o._delay=h=A.delay,o._start+=h,A.delay=0),S.to(b,A,C?C(v,b,y):0),S._ease=he.none;S.duration()?c=h=0:o.timeline=0}else if(m){na(Cn(S.vars.defaults,{ease:"none"})),S._ease=Cs(m.ease||i.ease||"none");var W=0,O,P,F;if(rn(m))m.forEach(function(V){return S.to(y,V,">")}),S.duration();else{A={};for(x in m)x==="ease"||x==="easeEach"||Xg(x,m[x],A,m.easeEach);for(x in A)for(O=A[x].sort(function(V,N){return V.t-N.t}),W=0,v=0;v<O.length;v++)P=O[v],F={ease:P.e,duration:(P.t-(v?O[v-1].t:0))/100*c},F[x]=P.v,S.to(y,F,W),W+=F.duration;S.duration()<c&&S.to({},{duration:c-S.duration()})}}c||o.duration(c=S.duration())}else o.timeline=0;return u===!0&&!Sh&&(Zi=Ei(o),Le.killTweensOf(y),Zi=0),hi(g,Ei(o),r),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(f||!c&&!m&&o._start===Ie(g._time)&&yn(f)&&Mg(Ei(o))&&g.data!=="nested")&&(o._tTime=-ye,o.render(Math.max(0,-h)||0)),p&&bf(Ei(o),p),o}var e=t.prototype;return e.render=function(i,r,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,f=i>l-ye&&!h?l:i<ye?0:i,d,u,m,_,p,g,y,S;if(!c)bg(this,i,r,a);else if(f!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(d=f,S=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,a);if(d=Ie(f%_),f===l?(m=this._repeat,d=c):(p=Ie(f/_),m=~~p,m&&m===p?(d=c,m--):d>c&&(d=c)),g=this._yoyo&&m&1,g&&(d=c-d),p=ar(this._tTime,_),d===o&&!a&&this._initted&&m===p)return this._tTime=f,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&d!==_&&this._initted&&(this._lock=a=1,this.render(Ie(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(wf(this,h?i:d,a,r,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,r,a)}if(this._rEase){var v=d<o;if(v!==this._inv){var A=v?o:c-o;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(v?-1:1)/A:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(d/c);if(this._from&&(this.ratio=y=1-y),this._tTime=f,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!r&&!p&&(Tn(this,"onStart"),this._tTime!==f))return this;for(u=this._pt;u;)u.r(y,u.d),u=u._next;S&&S.render(i<0?i:S._dur*S._ease(d/this._dur),r,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&_h(this,i,r,a),Tn(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!r&&this.parent&&Tn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&_h(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&ji(this,1),!r&&!(h&&!o)&&(f||o||g)&&(Tn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,a,o,l){la||vn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Oh(this,c),h=this._ease(c/this._dur),Hg(this,i,r,a,o,h,c,l)?this.resetTo(i,r,a,o,1):(Oo(this,0),this.parent||Mf(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?ta(this):this.scrollTrigger&&this.scrollTrigger.kill(!!je),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Zi&&Zi.vars.overwrite!==!0)._first||ta(this),this.parent&&a!==this.timeline.totalDuration()&&or(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?zn(i):o,c=this._ptLookup,h=this._pt,f,d,u,m,_,p,g;if((!r||r==="all")&&vg(o,l))return r==="all"&&(this._pt=0),ta(this);for(f=this._op=this._op||[],r!=="all"&&(Ge(r)&&(_={},dn(r,function(y){return _[y]=1}),r=_),r=Wg(o,r)),g=o.length;g--;)if(~l.indexOf(o[g])){d=c[g],r==="all"?(f[g]=r,m=d,u={}):(u=f[g]=f[g]||{},m=r);for(_ in m)p=d&&d[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&No(this,p,"_pt"),delete d[_]),u!=="all"&&(u[_]=1)}return this._initted&&!this._pt&&h&&ta(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return ia(1,arguments)},t.delayedCall=function(i,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,r,a){return ia(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,a){return Le.killTweensOf(i,r,a)},t})(ca);Cn(Be.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});dn("staggerTo,staggerFrom,staggerFromTo",function(s){Be[s]=function(){var t=new sn,e=xh.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var Fh=function(t,e,n){return t[e]=n},Bf=function(t,e,n){return t[e](n)},qg=function(t,e,n,i){return t[e](i.fp,n)},$g=function(t,e,n){return t.setAttribute(e,n)},Fo=function(t,e){return Oe(t[e])?Bf:Lo(t[e])&&t.setAttribute?$g:Fh},kf=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Yg=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Bh=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},kh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Zg=function(t,e,n,i){for(var r=this._pt,a;r;)a=r._next,r.p===i&&r.modifier(t,e,n),r=a},Jg=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?No(this,e,"_pt"):e.dep||(n=1),e=i;return!n},Kg=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},zh=function(t){for(var e=t._pt,n,i,r,a;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=r},fn=(function(){function s(e,n,i,r,a,o,l,c,h){this.t=n,this.s=r,this.c=a,this.p=i,this.r=o||kf,this.d=l||this,this.set=c||Fh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=Kg,this.m=n,this.mt=r,this.tween=i},s})();dn(Ch+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Eh[s]=1});En.TweenMax=En.TweenLite=Be;En.TimelineLite=En.TimelineMax=sn;Le=new sn({sortChildren:!1,defaults:ra,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Mn.stringFilter=Lh;var Rs=[],wo={},jg=[],hf=0,Qg=0,dh=function(t){return(wo[t]||jg).map(function(e){return e()})},ha=function(){var t=Date.now(),e=[];t-hf>2&&(dh("matchMediaInit"),Rs.forEach(function(n){var i=n.queries,r=n.conditions,a,o,l,c;for(o in i)a=ci.matchMedia(i[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),dh("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),hf=t,dh("matchMedia"))},zf=(function(){function s(e,n){this.selector=n&&vh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Qg++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Oe(n)&&(r=i,i=n,n=Oe);var a=this,o=function(){var c=Ce,h=a.selector,f;return c&&c!==a&&c.data.push(a),r&&(a.selector=vh(r)),Ce=a,f=i.apply(a,arguments),Oe(f)&&a._r.push(f),Ce=c,a.selector=h,a.isReverted=!1,f};return a.last=o,n===Oe?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Ce;Ce=null,n(this),Ce=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof Be&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof sn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Be)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=Rs.length;a--;)Rs[a].id===this.id&&Rs.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(ha):o.removeEventListener("change",ha)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},s})(),t_=(function(){function s(e){this.contexts=[],this.scope=e,Ce&&Ce.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){ui(n)||(n={matches:n});var a=new zf(0,r||this.scope),o=a.conditions={},l,c,h;Ce&&!a.selector&&(a.selector=Ce.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=ci.matchMedia(n[c]),l&&(Rs.indexOf(a)<0&&Rs.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(ha):l.addEventListener("change",ha),(a._mqs||(a._mqs=[])).push(l)));return h&&i(a,function(f){return a.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),Io={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Df(i)})},timeline:function(t){return new sn(t)},getTweensOf:function(t,e){return Le.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ge(t)&&(t=zn(t)[0]);var r=Ki(t||{}).get,a=n?yf:vf;return n==="native"&&(n=""),t&&(e?a((xn[e]&&xn[e].get||r)(t,e,n,i)):function(o,l,c){return a((xn[o]&&xn[o].get||r)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=zn(t),t.length>1){var i=t.map(function(h){return an.quickSetter(h,e,n)}),r=i.length;return function(h){for(var f=r;f--;)i[f](h)}}t=t[0]||{};var a=xn[e],o=Ki(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var f=new a;sr._pt=0,f.init(t,n?h+n:h,sr,0,[t]),f.render(1,f),sr._pt&&kh(1,sr)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,r=an.to(t,Cn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return r.resetTo(e,l,c,h)};return a.tween=r,a},isTweening:function(t){return Le.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Cs(t.ease,ra.ease)),rf(ra,t||{})},config:function(t){return rf(Mn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!xn[o]&&!En[o]&&aa(e+" effect requires "+o+" plugin.")}),lh[e]=function(o,l,c){return n(zn(o),Cn(l||{},r),c)},a&&(sn.prototype[e]=function(o,l,c){return this.add(lh[e](o,ui(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){he[t]=Cs(e)},parseEase:function(t,e){return arguments.length?Cs(t,e):he},getById:function(t){return Le.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new sn(t),i,r;for(n.smoothChildTiming=yn(t.smoothChildTiming),Le.remove(n),n._dp=0,n._time=n._tTime=Le._time,i=Le._first;i;)r=i._next,(e||!(!i._dur&&i instanceof Be&&i.vars.onComplete===i._targets[0]))&&hi(n,i,i._start-i._delay),i=r;return hi(Le,n,0),n},context:function(t,e){return t?new zf(t,e):Ce},matchMedia:function(t){return new t_(t)},matchMediaRefresh:function(){return Rs.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||ha()},addEventListener:function(t,e){var n=wo[t]||(wo[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=wo[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:Ig,wrapYoyo:Lg,distribute:Ef,random:Rf,snap:Cf,normalize:Pg,getUnit:Qe,clamp:Tg,splitColor:Nf,toArray:zn,selector:vh,mapRange:If,pipe:Cg,unitize:Rg,interpolate:Dg,shuffle:Tf},install:mf,effects:lh,ticker:vn,updateRoot:sn.updateRoot,plugins:xn,globalTimeline:Le,core:{PropTween:fn,globals:gf,Tween:Be,Timeline:sn,Animation:ca,getCache:Ki,_removeLinkedListItem:No,reverting:function(){return je},context:function(t){return t&&Ce&&(Ce.data.push(t),t._ctx=Ce),Ce},suppressOverwrites:function(t){return Sh=t}}};dn("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Io[s]=Be[s]});vn.add(sn.updateRoot);sr=Io.to({},{duration:0});var e_=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},n_=function(t,e){var n=t._targets,i,r,a;for(i in e)for(r=n.length;r--;)a=t._ptLookup[r][i],a&&(a=a.d)&&(a._pt&&(a=e_(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[r],i))},fh=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,a){a._onInit=function(o){var l,c;if(Ge(r)&&(l={},dn(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}n_(o,r)}}}},an=Io.registerPlugin({name:"attr",init:function(t,e,n,i,r){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)je?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},fh("roundProps",yh),fh("modifiers"),fh("snap",Cf))||Io;Be.version=sn.version=an.version="3.15.1";pf=1;bh()&&lr();var i_=he.Power0,s_=he.Power1,r_=he.Power2,a_=he.Power3,o_=he.Power4,l_=he.Linear,c_=he.Quad,h_=he.Cubic,u_=he.Quart,d_=he.Quint,f_=he.Strong,p_=he.Elastic,m_=he.Back,g_=he.SteppedEase,__=he.Bounce,x_=he.Sine,v_=he.Expo,y_=he.Circ;var Vf,ts,ur,qh,Os,M_,Gf,$h,S_=function(){return typeof window<"u"},Ii={},Us=180/Math.PI,dr=Math.PI/180,hr=Math.atan2,Hf=1e8,Yh=/([A-Z])/g,b_=/(left|right|width|margin|padding|x)/i,w_=/[\s,\(]\S/,di={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Gh=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},A_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},T_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},E_=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},C_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Kf=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},jf=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},R_=function(t,e,n){return t.style[e]=n},P_=function(t,e,n){return t.style.setProperty(e,n)},I_=function(t,e,n){return t._gsap[e]=n},L_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},D_=function(t,e,n,i,r){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},N_=function(t,e,n,i,r){var a=t._gsap;a[e]=n,a.renderTransform(r,a)},De="transform",Sn=De+"Origin",U_=function s(t,e){var n=this,i=this.target,r=i.style,a=i._gsap;if(t in Ii&&r){if(this.tfm=this.tfm||{},t!=="transform")t=di[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Pi(i,o)}):this.tfm[t]=a.x?a[t]:Pi(i,t),t===Sn&&(this.tfm.zOrigin=a.zOrigin);else return di.transform.split(",").forEach(function(o){return s.call(n,o,e)});if(this.props.indexOf(De)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Sn,e,"")),t=De}(r||e)&&this.props.push(t,e,r[t])},Qf=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},O_=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(Yh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=$h(),(!r||!r.isStart)&&!n[De]&&(Qf(n),i.zOrigin&&n[Sn]&&(n[Sn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},tp=function(t,e){var n={target:t,props:[],revert:O_,save:U_};return t._gsap||an.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},ep,Hh=function(t,e){var n=ts.createElementNS?ts.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ts.createElement(t);return n&&n.style?n:ts.createElement(t)},Rn=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Yh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,fr(e)||e,1)||""},Wf="O,Moz,ms,Ms,Webkit".split(","),fr=function(t,e,n){var i=e||Os,r=i.style,a=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Wf[a]+t in r););return a<0?null:(a===3?"ms":a>=0?Wf[a]:"")+t},Wh=function(){S_()&&window.document&&(Vf=window,ts=Vf.document,ur=ts.documentElement,Os=Hh("div")||{style:{}},M_=Hh("div"),De=fr(De),Sn=De+"Origin",Os.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",ep=!!fr("perspective"),$h=an.core.reverting,qh=1)},Xf=function(t){var e=t.ownerSVGElement,n=Hh("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),ur.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),ur.removeChild(n),r},qf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},np=function(t){var e,n;try{e=t.getBBox()}catch{e=Xf(t),n=1}return e&&(e.width||e.height)||n||(e=Xf(t)),e&&!e.width&&!e.x&&!e.y?{x:+qf(t,["x","cx","x1"])||0,y:+qf(t,["y","cy","y1"])||0,width:0,height:0}:e},ip=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&np(t))},ns=function(t,e){if(e){var n=t.style,i;e in Ii&&e!==Sn&&(e=De),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Yh,"-$1").toLowerCase())):n.removeAttribute(e)}},es=function(t,e,n,i,r,a){var o=new fn(t._pt,e,n,0,1,a?jf:Kf);return t._pt=o,o.b=i,o.e=r,t._props.push(n),o},$f={deg:1,rad:1,turn:1},F_={grid:1,flex:1},is=function s(t,e,n,i){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=Os.style,l=b_.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),f=100,d=i==="px",u=i==="%",m,_,p,g;if(i===a||!r||$f[i]||$f[a])return r;if(a!=="px"&&!d&&(r=s(t,e,n,"px")),g=t.getCTM&&ip(t),(u||a==="%")&&(Ii[e]||~e.indexOf("adius")))return m=g?t.getBBox()[l?"width":"height"]:t[h],Fe(u?r/m*f:r/100*m);if(o[l?"width":"height"]=f+(d?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===ts||!_.appendChild)&&(_=ts.body),p=_._gsap,p&&u&&p.width&&l&&p.time===vn.time&&!p.uncache)return Fe(r/p.width*f);if(u&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=f+i,m=t[h],y?t.style[e]=y:ns(t,e)}else(u||a==="%")&&!F_[Rn(_,"display")]&&(o.position=Rn(t,"position")),_===t&&(o.position="static"),_.appendChild(Os),m=Os[h],_.removeChild(Os),o.position="absolute";return l&&u&&(p=Ki(_),p.time=vn.time,p.width=_[h]),Fe(d?m*r/f:m&&r?f/m*r:0)},Pi=function(t,e,n,i){var r;return qh||Wh(),e in di&&e!=="transform"&&(e=di[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ii[e]&&e!=="transform"?(r=pa(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:ko(Rn(t,Sn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=Bo[e]&&Bo[e](t,e,n)||Rn(t,e)||Ph(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?is(t,e,r,n)+n:r},B_=function(t,e,n,i){if(!n||n==="none"){var r=fr(e,t,1),a=r&&Rn(t,r,1);a&&a!==n?(e=r,n=a):e==="borderColor"&&(n=Rn(t,"borderTopColor"))}var o=new fn(this._pt,t.style,e,0,1,Bh),l=0,c=0,h,f,d,u,m,_,p,g,y,S,v,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Rn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Rn(t,e)||i,_?t.style[e]=_:ns(t,e)),h=[n,i],Lh(h),n=h[0],i=h[1],d=n.match(Ps)||[],A=i.match(Ps)||[],A.length){for(;f=Ps.exec(i);)p=f[0],y=i.substring(l,f.index),m?m=(m+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(m=1),p!==(_=d[c++]||"")&&(u=parseFloat(_)||0,v=_.substr((u+"").length),p.charAt(1)==="="&&(p=Is(u,p)+v),g=parseFloat(p),S=p.substr((g+"").length),l=Ps.lastIndex-S.length,S||(S=S||Mn.units[e]||v,l===i.length&&(i+=S,o.e+=S)),v!==S&&(u=is(t,e,_,S)||0),o._pt={_next:o._pt,p:y||c===1?y:",",s:u,c:g-u,m:m&&m<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?jf:Kf;return Ah.test(i)&&(o.e=0),this._pt=o,o},Yf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},k_=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Yf[n]||n,e[1]=Yf[i]||i,e.join(" ")},z_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Ii[o]&&(l=1,o=o==="transformOrigin"?Sn:De),ns(n,o);l&&(ns(n,De),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",pa(n,1),a.uncache=1,Qf(i)))}},Bo={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var a=t._pt=new fn(t._pt,e,n,0,0,z_);return a.u=i,a.pr=-10,a.tween=r,t._props.push(n),1}}},fa=[1,0,0,1,0,0],sp={},rp=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Zf=function(t){var e=Rn(t,De);return rp(e)?fa:e.substr(7).match(wh).map(Fe)},Zh=function(t,e){var n=t._gsap||Ki(t),i=t.style,r=Zf(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?fa:r):(r===fa&&!t.offsetParent&&t!==ur&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,ur.appendChild(t)),r=Zf(t),l?i.display=l:ns(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):ur.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Xh=function(t,e,n,i,r,a){var o=t._gsap,l=r||Zh(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,f=o.xOffset||0,d=o.yOffset||0,u=l[0],m=l[1],_=l[2],p=l[3],g=l[4],y=l[5],S=e.split(" "),v=parseFloat(S[0])||0,A=parseFloat(S[1])||0,T,x,b,C;n?l!==fa&&(x=u*p-m*_)&&(b=v*(p/x)+A*(-_/x)+(_*y-p*g)/x,C=v*(-m/x)+A*(u/x)-(u*y-m*g)/x,v=b,A=C):(T=np(t),v=T.x+(~S[0].indexOf("%")?v/100*T.width:v),A=T.y+(~(S[1]||S[0]).indexOf("%")?A/100*T.height:A)),i||i!==!1&&o.smooth?(g=v-c,y=A-h,o.xOffset=f+(g*u+y*_)-g,o.yOffset=d+(g*m+y*p)-y):o.xOffset=o.yOffset=0,o.xOrigin=v,o.yOrigin=A,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[Sn]="0px 0px",a&&(es(a,o,"xOrigin",c,v),es(a,o,"yOrigin",h,A),es(a,o,"xOffset",f,o.xOffset),es(a,o,"yOffset",d,o.yOffset)),t.setAttribute("data-svg-origin",v+" "+A)},pa=function(t,e){var n=t._gsap||new Dh(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=Rn(t,Sn)||"0",h,f,d,u,m,_,p,g,y,S,v,A,T,x,b,C,R,L,W,O,P,F,V,N,Y,X,j,Z,q,ut,k,Q;return h=f=d=_=p=g=y=S=v=0,u=m=1,n.svg=!!(t.getCTM&&ip(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[De]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[De]!=="none"?l[De]:"")),i.scale=i.rotate=i.translate="none"),x=Zh(t,n.svg),n.svg&&(n.uncache?(Y=t.getBBox(),c=n.xOrigin-Y.x+"px "+(n.yOrigin-Y.y)+"px",N=""):N=!e&&t.getAttribute("data-svg-origin"),Xh(t,N||c,!!N||n.originIsAbsolute,n.smooth!==!1,x)),A=n.xOrigin||0,T=n.yOrigin||0,x!==fa&&(L=x[0],W=x[1],O=x[2],P=x[3],h=F=x[4],f=V=x[5],x.length===6?(u=Math.sqrt(L*L+W*W),m=Math.sqrt(P*P+O*O),_=L||W?hr(W,L)*Us:0,y=O||P?hr(O,P)*Us+_:0,y&&(m*=Math.abs(Math.cos(y*dr))),n.svg&&(h-=A-(A*L+T*O),f-=T-(A*W+T*P))):(Q=x[6],ut=x[7],j=x[8],Z=x[9],q=x[10],k=x[11],h=x[12],f=x[13],d=x[14],b=hr(Q,q),p=b*Us,b&&(C=Math.cos(-b),R=Math.sin(-b),N=F*C+j*R,Y=V*C+Z*R,X=Q*C+q*R,j=F*-R+j*C,Z=V*-R+Z*C,q=Q*-R+q*C,k=ut*-R+k*C,F=N,V=Y,Q=X),b=hr(-O,q),g=b*Us,b&&(C=Math.cos(-b),R=Math.sin(-b),N=L*C-j*R,Y=W*C-Z*R,X=O*C-q*R,k=P*R+k*C,L=N,W=Y,O=X),b=hr(W,L),_=b*Us,b&&(C=Math.cos(b),R=Math.sin(b),N=L*C+W*R,Y=F*C+V*R,W=W*C-L*R,V=V*C-F*R,L=N,F=Y),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,g=180-g),u=Fe(Math.sqrt(L*L+W*W+O*O)),m=Fe(Math.sqrt(V*V+Q*Q)),b=hr(F,V),y=Math.abs(b)>2e-4?b*Us:0,v=k?1/(k<0?-k:k):0),n.svg&&(N=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!rp(Rn(t,De)),N&&t.setAttribute("transform",N))),Math.abs(y)>90&&Math.abs(y)<270&&(r?(u*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Fe(u),n.scaleY=Fe(m),n.rotation=Fe(_)+o,n.rotationX=Fe(p)+o,n.rotationY=Fe(g)+o,n.skewX=y+o,n.skewY=S+o,n.transformPerspective=v+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Sn]=ko(c)),n.xOffset=n.yOffset=0,n.force3D=Mn.force3D,n.renderTransform=n.svg?G_:ep?ap:V_,n.uncache=0,n},ko=function(t){return(t=t.split(" "))[0]+" "+t[1]},Vh=function(t,e,n){var i=Qe(e);return Fe(parseFloat(e)+parseFloat(is(t,"x",n+"px",i)))+i},V_=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,ap(t,e)},Ds="0deg",da="0px",Ns=") ",ap=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,f=n.rotationX,d=n.skewX,u=n.skewY,m=n.scaleX,_=n.scaleY,p=n.transformPerspective,g=n.force3D,y=n.target,S=n.zOrigin,v="",A=g==="auto"&&t&&t!==1||g===!0;if(S&&(f!==Ds||h!==Ds)){var T=parseFloat(h)*dr,x=Math.sin(T),b=Math.cos(T),C;T=parseFloat(f)*dr,C=Math.cos(T),a=Vh(y,a,x*C*-S),o=Vh(y,o,-Math.sin(T)*-S),l=Vh(y,l,b*C*-S+S)}p!==da&&(v+="perspective("+p+Ns),(i||r)&&(v+="translate("+i+"%, "+r+"%) "),(A||a!==da||o!==da||l!==da)&&(v+=l!==da||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Ns),c!==Ds&&(v+="rotate("+c+Ns),h!==Ds&&(v+="rotateY("+h+Ns),f!==Ds&&(v+="rotateX("+f+Ns),(d!==Ds||u!==Ds)&&(v+="skew("+d+", "+u+Ns),(m!==1||_!==1)&&(v+="scale("+m+", "+_+Ns),y.style[De]=v||"translate(0, 0)"},G_=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,f=n.scaleX,d=n.scaleY,u=n.target,m=n.xOrigin,_=n.yOrigin,p=n.xOffset,g=n.yOffset,y=n.forceCSS,S=parseFloat(a),v=parseFloat(o),A,T,x,b,C;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=dr,c*=dr,A=Math.cos(l)*f,T=Math.sin(l)*f,x=Math.sin(l-c)*-d,b=Math.cos(l-c)*d,c&&(h*=dr,C=Math.tan(c-h),C=Math.sqrt(1+C*C),x*=C,b*=C,h&&(C=Math.tan(h),C=Math.sqrt(1+C*C),A*=C,T*=C)),A=Fe(A),T=Fe(T),x=Fe(x),b=Fe(b)):(A=f,b=d,T=x=0),(S&&!~(a+"").indexOf("px")||v&&!~(o+"").indexOf("px"))&&(S=is(u,"x",a,"px"),v=is(u,"y",o,"px")),(m||_||p||g)&&(S=Fe(S+m-(m*A+_*x)+p),v=Fe(v+_-(m*T+_*b)+g)),(i||r)&&(C=u.getBBox(),S=Fe(S+i/100*C.width),v=Fe(v+r/100*C.height)),C="matrix("+A+","+T+","+x+","+b+","+S+","+v+")",u.setAttribute("transform",C),y&&(u.style[De]=C)},H_=function(t,e,n,i,r){var a=360,o=Ge(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?Us:1),c=l-i,h=i+c+"deg",f,d;return o&&(f=r.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*Hf)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*Hf)%a-~~(c/a)*a)),t._pt=d=new fn(t._pt,e,n,i,c,A_),d.e=h,d.u="deg",t._props.push(n),d},Jf=function(t,e){for(var n in e)t[n]=e[n];return t},W_=function(t,e,n){var i=Jf({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,f,d,u,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[De]=e,o=pa(n,1),ns(n,De),n.setAttribute("transform",c)):(c=getComputedStyle(n)[De],a[De]=e,o=pa(n,1),a[De]=c);for(l in Ii)c=i[l],h=o[l],c!==h&&r.indexOf(l)<0&&(u=Qe(c),m=Qe(h),f=u!==m?is(n,l,c,m):parseFloat(c),d=parseFloat(h),t._pt=new fn(t._pt,o,l,f,d-f,Gh),t._pt.u=m||0,t._props.push(l));Jf(o,i)};dn("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",a=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(o){return t<2?s+o:"border"+o+s});Bo[t>1?"border"+s:s]=function(o,l,c,h,f){var d,u;if(arguments.length<4)return d=a.map(function(m){return Pi(o,m,c)}),u=d.join(" "),u.split(d[0]).length===5?d[0]:u;d=(h+"").split(" "),u={},a.forEach(function(m,_){return u[m]=d[_]=d[_]||d[(_-1)/2|0]}),o.init(l,u,f)}});var Jh={name:"css",register:Wh,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var a=this._props,o=t.style,l=n.vars.startAt,c,h,f,d,u,m,_,p,g,y,S,v,A,T,x,b,C;qh||Wh(),this.styles=this.styles||tp(t),b=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(xn[_]&&Uh(_,e,n,i,t,r)))){if(u=typeof h,m=Bo[_],u==="function"&&(h=h.call(n,i,t,r),u=typeof h),u==="string"&&~h.indexOf("random(")&&(h=cr(h)),m)m(this,t,_,h,n)&&(x=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",Ci.lastIndex=0,Ci.test(c)||(p=Qe(c),g=Qe(h),g?p!==g&&(c=is(t,_,c,g)+g):p&&(h+=p)),this.add(o,"setProperty",c,h,i,r,0,0,_),a.push(_),b.push(_,0,o[_]);else if(u!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],Ge(c)&&~c.indexOf("random(")&&(c=cr(c)),Qe(c+"")||c==="auto"||(c+=Mn.units[_]||Qe(Pi(t,_))||""),(c+"").charAt(1)==="="&&(c=Pi(t,_))):c=Pi(t,_),d=parseFloat(c),y=u==="string"&&h.charAt(1)==="="&&h.substr(0,2),y&&(h=h.substr(2)),f=parseFloat(h),_ in di&&(_==="autoAlpha"&&(d===1&&Pi(t,"visibility")==="hidden"&&f&&(d=0),b.push("visibility",0,o.visibility),es(this,o,"visibility",d?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=di[_],~_.indexOf(",")&&(_=_.split(",")[0]))),S=_ in Ii,S){if(this.styles.save(_),C=h,u==="string"&&h.substring(0,6)==="var(--"){if(h=Rn(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var R=t.style.perspective;t.style.perspective=h,h=Rn(t,"perspective"),R?t.style.perspective=R:ns(t,"perspective")}f=parseFloat(h)}if(v||(A=t._gsap,A.renderTransform&&!e.parseTransform||pa(t,e.parseTransform),T=e.smoothOrigin!==!1&&A.smooth,v=this._pt=new fn(this._pt,o,De,0,1,A.renderTransform,A,0,-1),v.dep=1),_==="scale")this._pt=new fn(this._pt,A,"scaleY",A.scaleY,(y?Is(A.scaleY,y+f):f)-A.scaleY||0,Gh),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){b.push(Sn,0,o[Sn]),h=k_(h),A.svg?Xh(t,h,0,T,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==A.zOrigin&&es(this,A,"zOrigin",A.zOrigin,g),es(this,o,_,ko(c),ko(h)));continue}else if(_==="svgOrigin"){Xh(t,h,1,T,0,this);continue}else if(_ in sp){H_(this,A,_,d,y?Is(d,y+h):h);continue}else if(_==="smoothOrigin"){es(this,A,"smooth",A.smooth,h);continue}else if(_==="force3D"){A[_]=h;continue}else if(_==="transform"){W_(this,h,t);continue}}else _ in o||(_=fr(_)||_);if(S||(f||f===0)&&(d||d===0)&&!w_.test(h)&&_ in o)p=(c+"").substr((d+"").length),f||(f=0),g=Qe(h)||(_ in Mn.units?Mn.units[_]:p),p!==g&&(d=is(t,_,c,g)),this._pt=new fn(this._pt,S?A:o,_,d,(y?Is(d,y+f):f)-d,!S&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?C_:Gh),this._pt.u=g||0,S&&C!==h?(this._pt.b=c,this._pt.e=C,this._pt.r=E_):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=T_);else if(_ in o)B_.call(this,t,_,c,y?y+h:h);else if(_ in t)this.add(t,_,c||t[_],y?y+h:h,i,r);else if(_!=="parseTransform"){Do(_,h);continue}S||(_ in o?b.push(_,0,o[_]):typeof t[_]=="function"?b.push(_,2,t[_]()):b.push(_,1,c||t[_])),a.push(_)}}x&&zh(this)},render:function(t,e){if(e.tween._time||!$h())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Pi,aliases:di,getSetter:function(t,e,n){var i=di[e];return i&&i.indexOf(",")<0&&(e=i),e in Ii&&e!==Sn&&(t._gsap.x||Pi(t,"x"))?n&&Gf===n?e==="scale"?L_:I_:(Gf=n||{})&&(e==="scale"?D_:N_):t.style&&!Lo(t.style[e])?R_:~e.indexOf("-")?P_:Fo(t,e)},core:{_removeProperty:ns,_getMatrix:Zh}};an.utils.checkPrefix=fr;an.core.getStyleSaver=tp;(function(s,t,e,n){var i=dn(s+","+t+","+e,function(r){Ii[r]=1});dn(t,function(r){Mn.units[r]="deg",sp[r]=1}),di[i[13]]=s+","+t,dn(n,function(r){var a=r.split(":");di[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");dn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Mn.units[s]="px"});an.registerPlugin(Jh);var Vn=an.registerPlugin(Jh)||an,F1=Vn.core.Tween;var X_=`
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
}`,q_=`#version 300 es
void main(){ vec2 p = vec2(gl_VertexID == 2 ? 3.0 : -1.0, gl_VertexID == 0 ? -3.0 : 1.0); gl_Position = vec4(p, 0.0, 1.0); }`,$_=`#version 300 es
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
}`;async function Y_(s){if(!navigator.gpu)return null;let t=await navigator.gpu.requestAdapter({powerPreference:"low-power"});if(!t)return null;let e=await t.requestDevice();e.addEventListener("uncapturederror",h=>console.warn("WebGPU \uC624\uB958:",h.error.message));let n=s.getContext("webgpu");if(!n)return null;let i=navigator.gpu.getPreferredCanvasFormat();n.configure({device:e,format:i,alphaMode:"opaque"});let r=e.createShaderModule({code:X_}),a=e.createRenderPipeline({layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),o=e.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),l=e.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}}]}),c=new Float32Array(16);return{kind:"WebGPU",lost:e.lost,draw(h){c.set(h),e.queue.writeBuffer(o,0,c);let f=e.createCommandEncoder(),d=f.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});d.setPipeline(a),d.setBindGroup(0,l),d.draw(3),d.end(),e.queue.submit([f.finish()])}}}function op(s){let t=s.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return null;let e=(r,a)=>{let o=t.createShader(r);return t.shaderSource(o,a),t.compileShader(o),o},n=t.createProgram();if(t.attachShader(n,e(t.VERTEX_SHADER,q_)),t.attachShader(n,e(t.FRAGMENT_SHADER,$_)),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))return null;t.useProgram(n),t.bindVertexArray(t.createVertexArray());let i=["uA","uColA","uColB","uGlow"].map(r=>t.getUniformLocation(n,r));return{kind:"WebGL2",draw(r){t.viewport(0,0,s.width,s.height),i.forEach((a,o)=>t.uniform4f(a,r[o*4],r[o*4+1],r[o*4+2],r[o*4+3])),t.drawArrays(t.TRIANGLES,0,3)}}}async function lp(s,{gpu:t=!0}={}){let e=null;if(t)try{e=await Y_(s)}catch(i){console.warn("WebGPU \uC2E4\uD328, WebGL2\uB85C",i),e=null}if(!e){let i=s.cloneNode();s.replaceWith(i),s=i,e=op(s)}let n=e?{...e,canvas:s}:{kind:"CSS",canvas:s,draw(){}};return e?.lost&&e.lost.then(()=>{let i=n.canvas.cloneNode();n.canvas.replaceWith(i);let r=op(i);Object.assign(n,r?{...r,canvas:i}:{kind:"CSS",canvas:i,draw(){}})}),n}var Wp=0,Uu=1,Xp=2;var qs=1,qp=2,Hr=3,gs=0,_n=1,xi=2,$s=0,Wr=1,Ka=2,Ou=3,Fu=4,$p=5;var Ys=100,Yp=101,Zp=102,Jp=103,Kp=104,jp=200,Qp=201,tm=202,em=203,Bu=204,ku=205,nm=206,im=207,sm=208,rm=209,am=210,om=211,lm=212,cm=213,hm=214,pl=0,ml=1,gl=2,Cr=3,_l=4,xl=5,vl=6,yl=7,zu=0,um=1,dm=2,vi=0,Vu=1,Gu=2,Hu=3,Wu=4,Xu=5,qu=6,ja=7;var $u=300,Zs=301,Xr=302,ic=303,sc=304,Ml=1e3,pi=1001,Sl=1002,Ye=1003,fm=1004;var Qa=1005;var gn=1006,rc=1007;var Gi=1008;var An=1009,Yu=1010,Zu=1011,qr=1012,ac=1013,jn=1014,Qn=1015,ti=1016,oc=1017,lc=1018,Js=1020,Ju=35902,Ku=35899,ju=1021,Qu=1022,ei=1023,ki=1026,Hi=1027,td=1028,cc=1029,_s=1030,hc=1031;var uc=1033,to=33776,eo=33777,no=33778,io=33779,dc=35840,fc=35841,pc=35842,mc=35843,gc=36196,_c=37492,xc=37496,vc=37488,yc=37489,so=37490,Mc=37491,Sc=37808,bc=37809,wc=37810,Ac=37811,Tc=37812,Ec=37813,Cc=37814,Rc=37815,Pc=37816,Ic=37817,Lc=37818,Dc=37819,Nc=37820,Uc=37821,Oc=36492,Fc=36494,Bc=36495,kc=36283,zc=36284,ro=36285,Vc=36286;var wa=2300,bl=2301,dl=2302,bu=2303,wu=2400,Au=2401,Tu=2402;var pm=3200;var Gc=0,mm=1,Wi="",pn="srgb",Aa="srgb-linear",Ta="linear",_e="srgb";var fl=7680;var gm=519,_m=512,xm=513,vm=514,ed=515,ym=516,Mm=517,nd=518,id=519,Sm=35044;var sd="300 es",Hn=2e3,Rr=2001;function Z_(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function J_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ea(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function bm(){let s=Ea("canvas");return s.style.display="block",s}var cp={},Pr=null;function rd(...s){let t="THREE."+s.shift();Pr?Pr("log",t,...s):console.log(t,...s)}function wm(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Kt(...s){s=wm(s);let t="THREE."+s.shift();if(Pr)Pr("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function jt(...s){s=wm(s);let t="THREE."+s.shift();if(Pr)Pr("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Ma(...s){let t=s.join(" ");t in cp||(cp[t]=!0,Kt(...s))}function Am(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Tm={[pl]:pl,[gl]:vl,[_l]:_l,[Cr]:xl,[ml]:ml,[vl]:gl,[yl]:yl,[xl]:Cr},gi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Kh=Math.PI/180,wl=180/Math.PI;function $r(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[s&255]+on[s>>8&255]+on[s>>16&255]+on[s>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[e&63|128]+on[e>>8&255]+"-"+on[e>>16&255]+on[e>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function re(s,t,e){return Math.max(t,Math.min(e,s))}function K_(s,t){return(s%t+t)%t}function jh(s,t,e){return(1-e)*s+e*t}function Em(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ad(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function j_(s,t){if(t.constructor===Float32Array)return s;let e=ad(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function Q_(s,t){if(t.constructor===Float32Array)return s;let e=ad(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var dd=class dd{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};dd.prototype.isVector2=!0;var Dt=dd,_i=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3],d=r[a+0],u=r[a+1],m=r[a+2],_=r[a+3];if(f!==_||l!==d||c!==u||h!==m){let p=l*d+c*u+h*m+f*_;p<0&&(d=-d,u=-u,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){let y=Math.acos(p),S=Math.sin(y);g=Math.sin(g*y)/S,o=Math.sin(o*y)/S,l=l*g+d*o,c=c*g+u*o,h=h*g+m*o,f=f*g+_*o}else{l=l*g+d*o,c=c*g+u*o,h=h*g+m*o,f=f*g+_*o;let y=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=y,c*=y,h*=y,f*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[a],d=r[a+1],u=r[a+2],m=r[a+3];return t[e]=o*m+h*f+l*u-c*d,t[e+1]=l*m+h*d+c*f-o*u,t[e+2]=c*m+h*u+o*d-l*f,t[e+3]=h*m-o*f-l*d-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(r/2),d=l(n/2),u=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*f+c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f-d*u*m;break;case"YXZ":this._x=d*h*f+c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f+d*u*m;break;case"ZXY":this._x=d*h*f-c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f-d*u*m;break;case"ZYX":this._x=d*h*f-c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f+d*u*m;break;case"YZX":this._x=d*h*f+c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f-d*u*m;break;case"XZY":this._x=d*h*f-c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f+d*u*m;break;default:Kt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],d=n+o+f;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-i)*u}else if(n>o&&n>f){let u=2*Math.sqrt(1+n-o-f);this._w=(h-l)/u,this._x=.25*u,this._y=(i+a)/u,this._z=(r+c)/u}else if(o>f){let u=2*Math.sqrt(1+o-n-f);this._w=(r-c)/u,this._x=(i+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+f-n-o);this._w=(a-i)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},fd=class fd{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=i+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qh.copy(this).projectOnVector(t),this.sub(Qh)}reflect(t){return this.sub(Qh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};fd.prototype.isVector3=!0;var H=fd,Qh=new H,hp=new _i,pd=class pd{constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],d=n[2],u=n[5],m=n[8],_=i[0],p=i[3],g=i[6],y=i[1],S=i[4],v=i[7],A=i[2],T=i[5],x=i[8];return r[0]=a*_+o*y+l*A,r[3]=a*p+o*S+l*T,r[6]=a*g+o*v+l*x,r[1]=c*_+h*y+f*A,r[4]=c*p+h*S+f*T,r[7]=c*g+h*v+f*x,r[2]=d*_+u*y+m*A,r[5]=d*p+u*S+m*T,r[8]=d*g+u*v+m*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,d=o*l-h*r,u=c*r-a*l,m=e*f+n*d+i*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=f*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=u*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ma("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tu.makeScale(t,e)),this}rotate(t){return Ma("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tu.makeRotation(-t)),this}translate(t,e){return Ma("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};pd.prototype.isMatrix3=!0;var Qt=pd,tu=new Qt,up=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dp=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tx(){let s={enabled:!0,workingColorSpace:Aa,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_e&&(i.r=Bi(i.r),i.g=Bi(i.g),i.b=Bi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_e&&(i.r=Er(i.r),i.g=Er(i.g),i.b=Er(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Wi?Ta:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Aa]:{primaries:t,whitePoint:n,transfer:Ta,toXYZ:up,fromXYZ:dp,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:up,fromXYZ:dp,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),s}var ce=tx();function Bi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Er(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var pr,Al=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{pr===void 0&&(pr=Ea("canvas")),pr.width=t.width,pr.height=t.height;let i=pr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=pr}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ea("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Bi(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bi(e[n]/255)*255):e[n]=Bi(e[n]);return{data:e,width:t.width,height:t.height}}else return Kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ex=0,Ir=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ex++}),this.uuid=$r(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(eu(i[a].image)):r.push(eu(i[a]))}else r=eu(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function eu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Al.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Kt("Texture: Unable to serialize Texture."),{})}var nx=0,nu=new H,bn=class s extends gi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=pi,i=pi,r=gn,a=Gi,o=ei,l=An,c=s.DEFAULT_ANISOTROPY,h=Wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nx++}),this.uuid=$r(),this.name="",this.source=new Ir(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(nu).x}get height(){return this.source.getSize(nu).y}get depth(){return this.source.getSize(nu).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Kt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$u)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ml:t.x=t.x-Math.floor(t.x);break;case pi:t.x=t.x<0?0:1;break;case Sl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ml:t.y=t.y-Math.floor(t.y);break;case pi:t.y=t.y<0?0:1;break;case Sl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};bn.DEFAULT_IMAGE=null;bn.DEFAULT_MAPPING=$u;bn.DEFAULT_ANISOTROPY=1;var md=class md{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],f=l[8],d=l[1],u=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,v=(u+1)/2,A=(g+1)/2,T=(h+d)/4,x=(f+_)/4,b=(m+p)/4;return S>v&&S>A?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=T/n,r=x/n):v>A?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=T/i,r=b/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=x/r,i=b/r),this.set(n,i,r,e),this}let y=Math.sqrt((p-m)*(p-m)+(f-_)*(f-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-m)/y,this.y=(f-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};md.prototype.isVector4=!0;var Re=md,Tl=class extends gi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new bn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Ir(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ln=class extends Tl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ca=class extends bn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var El=class extends bn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var nc=class nc{constructor(t,e,n,i,r,a,o,l,c,h,f,d,u,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,f,d,u,m,_,p)}set(t,e,n,i,r,a,o,l,c,h,f,d,u,m,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=f,g[14]=d,g[3]=u,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nc().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/mr.setFromMatrixColumn(t,0).length(),r=1/mr.setFromMatrixColumn(t,1).length(),a=1/mr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let d=a*h,u=a*f,m=o*h,_=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=u+m*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=m+u*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,u=l*f,m=c*h,_=c*f;e[0]=d+_*o,e[4]=m*o-u,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=u*o-m,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,u=l*f,m=c*h,_=c*f;e[0]=d-_*o,e[4]=-a*f,e[8]=m+u*o,e[1]=u+m*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,u=a*f,m=o*h,_=o*f;e[0]=l*h,e[4]=m*c-u,e[8]=d*c+_,e[1]=l*f,e[5]=_*c+d,e[9]=u*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,u=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-d*f,e[8]=m*f+u,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=u*f+m,e[10]=d-_*f}else if(t.order==="XZY"){let d=a*l,u=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=d*f+_,e[5]=a*h,e[9]=u*f-m,e[2]=m*f-u,e[6]=o*h,e[10]=_*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ix,t,sx)}lookAt(t,e,n){let i=this.elements;return Pn.subVectors(t,e),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),ss.crossVectors(n,Pn),ss.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),ss.crossVectors(n,Pn)),ss.normalize(),zo.crossVectors(Pn,ss),i[0]=ss.x,i[4]=zo.x,i[8]=Pn.x,i[1]=ss.y,i[5]=zo.y,i[9]=Pn.y,i[2]=ss.z,i[6]=zo.z,i[10]=Pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],d=n[9],u=n[13],m=n[2],_=n[6],p=n[10],g=n[14],y=n[3],S=n[7],v=n[11],A=n[15],T=i[0],x=i[4],b=i[8],C=i[12],R=i[1],L=i[5],W=i[9],O=i[13],P=i[2],F=i[6],V=i[10],N=i[14],Y=i[3],X=i[7],j=i[11],Z=i[15];return r[0]=a*T+o*R+l*P+c*Y,r[4]=a*x+o*L+l*F+c*X,r[8]=a*b+o*W+l*V+c*j,r[12]=a*C+o*O+l*N+c*Z,r[1]=h*T+f*R+d*P+u*Y,r[5]=h*x+f*L+d*F+u*X,r[9]=h*b+f*W+d*V+u*j,r[13]=h*C+f*O+d*N+u*Z,r[2]=m*T+_*R+p*P+g*Y,r[6]=m*x+_*L+p*F+g*X,r[10]=m*b+_*W+p*V+g*j,r[14]=m*C+_*O+p*N+g*Z,r[3]=y*T+S*R+v*P+A*Y,r[7]=y*x+S*L+v*F+A*X,r[11]=y*b+S*W+v*V+A*j,r[15]=y*C+S*O+v*N+A*Z,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],d=t[10],u=t[14],m=t[3],_=t[7],p=t[11],g=t[15],y=l*u-c*d,S=o*u-c*f,v=o*d-l*f,A=a*u-c*h,T=a*d-l*h,x=a*f-o*h;return e*(_*y-p*S+g*v)-n*(m*y-p*A+g*T)+i*(m*S-_*A+g*x)-r*(m*v-_*T+p*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],d=t[10],u=t[11],m=t[12],_=t[13],p=t[14],g=t[15],y=e*o-n*a,S=e*l-i*a,v=e*c-r*a,A=n*l-i*o,T=n*c-r*o,x=i*c-r*l,b=h*_-f*m,C=h*p-d*m,R=h*g-u*m,L=f*p-d*_,W=f*g-u*_,O=d*g-u*p,P=y*O-S*W+v*L+A*R-T*C+x*b;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/P;return t[0]=(o*O-l*W+c*L)*F,t[1]=(i*W-n*O-r*L)*F,t[2]=(_*x-p*T+g*A)*F,t[3]=(d*T-f*x-u*A)*F,t[4]=(l*R-a*O-c*C)*F,t[5]=(e*O-i*R+r*C)*F,t[6]=(p*v-m*x-g*S)*F,t[7]=(h*x-d*v+u*S)*F,t[8]=(a*W-o*R+c*b)*F,t[9]=(n*R-e*W-r*b)*F,t[10]=(m*T-_*v+g*y)*F,t[11]=(f*v-h*T-u*y)*F,t[12]=(o*C-a*L-l*b)*F,t[13]=(e*L-n*C+i*b)*F,t[14]=(_*S-m*A-p*y)*F,t[15]=(h*A-f*S+d*y)*F,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,d=r*c,u=r*h,m=r*f,_=a*h,p=a*f,g=o*f,y=l*c,S=l*h,v=l*f,A=n.x,T=n.y,x=n.z;return i[0]=(1-(_+g))*A,i[1]=(u+v)*A,i[2]=(m-S)*A,i[3]=0,i[4]=(u-v)*T,i[5]=(1-(d+g))*T,i[6]=(p+y)*T,i[7]=0,i[8]=(m+S)*x,i[9]=(p-y)*x,i[10]=(1-(d+_))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=mr.set(i[0],i[1],i[2]).length(),o=mr.set(i[4],i[5],i[6]).length(),l=mr.set(i[8],i[9],i[10]).length();r<0&&(a=-a),$n.copy(this);let c=1/a,h=1/o,f=1/l;return $n.elements[0]*=c,$n.elements[1]*=c,$n.elements[2]*=c,$n.elements[4]*=h,$n.elements[5]*=h,$n.elements[6]*=h,$n.elements[8]*=f,$n.elements[9]*=f,$n.elements[10]*=f,e.setFromRotationMatrix($n),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Hn,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i),m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===Hn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Rr)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Hn,l=!1){let c=this.elements,h=2/(e-t),f=2/(n-i),d=-(e+t)/(e-t),u=-(n+i)/(n-i),m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===Hn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Rr)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};nc.prototype.isMatrix4=!0;var be=nc,mr=new H,$n=new be,ix=new H(0,0,0),sx=new H(1,1,1),ss=new H,zo=new H,Pn=new H,fp=new be,pp=new _i,zi=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],d=i[6],u=i[10];switch(e){case"XYZ":this._y=Math.asin(re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(re(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-re(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return pp.setFromEuler(this),this.setFromQuaternion(pp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zi.DEFAULT_ORDER="XYZ";var Ra=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},rx=0,mp=new H,gr=new _i,Li=new be,Vo=new H,ma=new H,ax=new H,ox=new _i,gp=new H(1,0,0),_p=new H(0,1,0),xp=new H(0,0,1),vp={type:"added"},lx={type:"removed"},_r={type:"childadded",child:null},iu={type:"childremoved",child:null},Ze=class s extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=$r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new H,e=new zi,n=new _i,i=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new be},normalMatrix:{value:new Qt}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return gr.setFromAxisAngle(t,e),this.quaternion.multiply(gr),this}rotateOnWorldAxis(t,e){return gr.setFromAxisAngle(t,e),this.quaternion.premultiply(gr),this}rotateX(t){return this.rotateOnAxis(gp,t)}rotateY(t){return this.rotateOnAxis(_p,t)}rotateZ(t){return this.rotateOnAxis(xp,t)}translateOnAxis(t,e){return mp.copy(t).applyQuaternion(this.quaternion),this.position.add(mp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gp,t)}translateY(t){return this.translateOnAxis(_p,t)}translateZ(t){return this.translateOnAxis(xp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Vo.copy(t):Vo.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ma.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(ma,Vo,this.up):Li.lookAt(Vo,ma,this.up),this.quaternion.setFromRotationMatrix(Li),i&&(Li.extractRotation(i.matrixWorld),gr.setFromRotationMatrix(Li),this.quaternion.premultiply(gr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vp),_r.child=t,this.dispatchEvent(_r),_r.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lx),iu.child=t,this.dispatchEvent(iu),iu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Li.multiply(t.parent.matrixWorld)),t.applyMatrix4(Li),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vp),_r.child=t,this.dispatchEvent(_r),_r.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ma,t,ax),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ma,ox,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),d=a(t.skeletons),u=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ze.DEFAULT_UP=new H(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Fi=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},cx={type:"move"},Lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),u=.02,m=.005;c.inputState.pinching&&d>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cx)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Fi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Cm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},Go={h:0,s:0,l:0};function su(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var ee=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ce.workingColorSpace){if(t=K_(t,1),e=re(e,0,1),n=re(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=su(a,r,t+1/3),this.g=su(a,r,t),this.b=su(a,r,t-1/3)}return ce.colorSpaceToWorking(this,i),this}setStyle(t,e=pn){function n(r){r!==void 0&&parseFloat(r)<1&&Kt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Kt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pn){let n=Cm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bi(t.r),this.g=Bi(t.g),this.b=Bi(t.b),this}copyLinearToSRGB(t){return this.r=Er(t.r),this.g=Er(t.g),this.b=Er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pn){return ce.workingToColorSpace(ln.copy(this),t),Math.round(re(ln.r*255,0,255))*65536+Math.round(re(ln.g*255,0,255))*256+Math.round(re(ln.b*255,0,255))}getHexString(t=pn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(ln.copy(this),e);let n=ln.r,i=ln.g,r=ln.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(ln.copy(this),e),t.r=ln.r,t.g=ln.g,t.b=ln.b,t}getStyle(t=pn){ce.workingToColorSpace(ln.copy(this),t);let e=ln.r,n=ln.g,i=ln.b;return t!==pn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(rs),this.setHSL(rs.h+t,rs.s+e,rs.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(rs),t.getHSL(Go);let n=jh(rs.h,Go.h,e),i=jh(rs.s,Go.s,e),r=jh(rs.l,Go.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ln=new ee;ee.NAMES=Cm;var Pa=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zi,this.environmentIntensity=1,this.environmentRotation=new zi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Yn=new H,Di=new H,ru=new H,Ni=new H,xr=new H,vr=new H,yp=new H,au=new H,ou=new H,lu=new H,cu=new Re,hu=new Re,uu=new Re,cs=class s{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Yn.subVectors(t,e),i.cross(Yn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Yn.subVectors(i,e),Di.subVectors(n,e),ru.subVectors(t,e);let a=Yn.dot(Yn),o=Yn.dot(Di),l=Yn.dot(ru),c=Di.dot(Di),h=Di.dot(ru),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,u=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-u-m,m,u)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ni.x),l.addScaledVector(a,Ni.y),l.addScaledVector(o,Ni.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return cu.setScalar(0),hu.setScalar(0),uu.setScalar(0),cu.fromBufferAttribute(t,e),hu.fromBufferAttribute(t,n),uu.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(cu,r.x),a.addScaledVector(hu,r.y),a.addScaledVector(uu,r.z),a}static isFrontFacing(t,e,n,i){return Yn.subVectors(n,e),Di.subVectors(t,e),Yn.cross(Di).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Yn.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),Yn.cross(Di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;xr.subVectors(i,n),vr.subVectors(r,n),au.subVectors(t,n);let l=xr.dot(au),c=vr.dot(au);if(l<=0&&c<=0)return e.copy(n);ou.subVectors(t,i);let h=xr.dot(ou),f=vr.dot(ou);if(h>=0&&f<=h)return e.copy(i);let d=l*f-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(xr,a);lu.subVectors(t,r);let u=xr.dot(lu),m=vr.dot(lu);if(m>=0&&u<=m)return e.copy(r);let _=u*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(vr,o);let p=h*m-u*f;if(p<=0&&f-h>=0&&u-m>=0)return yp.subVectors(r,i),o=(f-h)/(f-h+(u-m)),e.copy(i).addScaledVector(yp,o);let g=1/(p+_+d);return a=_*g,o=d*g,e.copy(n).addScaledVector(xr,a).addScaledVector(vr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},hs=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Zn):Zn.fromBufferAttribute(r,a),Zn.applyMatrix4(t.matrixWorld),this.expandByPoint(Zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ho.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ho.copy(n.boundingBox)),Ho.applyMatrix4(t.matrixWorld),this.union(Ho)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Zn),Zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ga),Wo.subVectors(this.max,ga),yr.subVectors(t.a,ga),Mr.subVectors(t.b,ga),Sr.subVectors(t.c,ga),as.subVectors(Mr,yr),os.subVectors(Sr,Mr),Fs.subVectors(yr,Sr);let e=[0,-as.z,as.y,0,-os.z,os.y,0,-Fs.z,Fs.y,as.z,0,-as.x,os.z,0,-os.x,Fs.z,0,-Fs.x,-as.y,as.x,0,-os.y,os.x,0,-Fs.y,Fs.x,0];return!du(e,yr,Mr,Sr,Wo)||(e=[1,0,0,0,1,0,0,0,1],!du(e,yr,Mr,Sr,Wo))?!1:(Xo.crossVectors(as,os),e=[Xo.x,Xo.y,Xo.z],du(e,yr,Mr,Sr,Wo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ui),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ui=[new H,new H,new H,new H,new H,new H,new H,new H],Zn=new H,Ho=new hs,yr=new H,Mr=new H,Sr=new H,as=new H,os=new H,Fs=new H,ga=new H,Wo=new H,Xo=new H,Bs=new H;function du(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Bs.fromArray(s,r);let o=i.x*Math.abs(Bs.x)+i.y*Math.abs(Bs.y)+i.z*Math.abs(Bs.z),l=t.dot(Bs),c=e.dot(Bs),h=n.dot(Bs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var ze=new H,qo=new Dt,hx=0,mi=class extends gi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sm,this.updateRanges=[],this.gpuType=Qn,this.version=0,this._normalizationScale=t!==void 0?ad(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qo.fromBufferAttribute(this,e),qo.applyMatrix3(t),this.setXY(e,qo.x,qo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):j_(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Q_(t,this.array)}};var Ia=class extends mi{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var La=class extends mi{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ue=class extends mi{constructor(t,e,n){super(new Float32Array(t),e,n)}},ux=new hs,_a=new H,fu=new H,us=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ux.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_a.subVectors(t,this.center);let e=_a.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(_a,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_a.copy(t.center).add(fu)),this.expandByPoint(_a.copy(t.center).sub(fu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},dx=0,Gn=new be,pu=new Ze,br=new H,In=new hs,xa=new hs,$e=new H,wn=class s extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dx++}),this.uuid=$r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Z_(t)?La:Ia)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Gn.makeRotationFromQuaternion(t),this.applyMatrix4(Gn),this}rotateX(t){return Gn.makeRotationX(t),this.applyMatrix4(Gn),this}rotateY(t){return Gn.makeRotationY(t),this.applyMatrix4(Gn),this}rotateZ(t){return Gn.makeRotationZ(t),this.applyMatrix4(Gn),this}translate(t,e,n){return Gn.makeTranslation(t,e,n),this.applyMatrix4(Gn),this}scale(t,e,n){return Gn.makeScale(t,e,n),this.applyMatrix4(Gn),this}lookAt(t){return pu.lookAt(t),pu.updateMatrix(),this.applyMatrix4(pu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(br).negate(),this.translate(br.x,br.y,br.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];In.setFromBufferAttribute(r),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(In.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];xa.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(In.min,xa.min),In.expandByPoint($e),$e.addVectors(In.max,xa.max),In.expandByPoint($e)):(In.expandByPoint(xa.min),In.expandByPoint(xa.max))}In.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)$e.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared($e));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$e.fromBufferAttribute(o,c),l&&(br.fromBufferAttribute(t,c),$e.add(br)),i=Math.max(i,n.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new mi(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let C=0;C<n.count;C++)o[C]=new H,l[C]=new H;let h=new H,f=new H,d=new H,u=new Dt,m=new Dt,_=new Dt,p=new H,g=new H;function y(C,R,L){c[C]=c[R]=c[L]=1,h.fromBufferAttribute(n,C),f.fromBufferAttribute(n,R),d.fromBufferAttribute(n,L),u.fromBufferAttribute(r,C),m.fromBufferAttribute(r,R),_.fromBufferAttribute(r,L),f.sub(h),d.sub(h),m.sub(u),_.sub(u);let W=1/(m.x*_.y-_.x*m.y);isFinite(W)&&(p.copy(f).multiplyScalar(_.y).addScaledVector(d,-m.y).multiplyScalar(W),g.copy(d).multiplyScalar(m.x).addScaledVector(f,-_.x).multiplyScalar(W),o[C].add(p),o[R].add(p),o[L].add(p),l[C].add(g),l[R].add(g),l[L].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let C=0,R=S.length;C<R;++C){let L=S[C],W=L.start,O=L.count;for(let P=W,F=W+O;P<F;P+=3)y(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let v=new H,A=new H,T=new H,x=new H;function b(C){T.fromBufferAttribute(i,C),x.copy(T);let R=o[C];v.copy(R),v.sub(T.multiplyScalar(T.dot(R))).normalize(),A.crossVectors(x,R);let W=A.dot(l[C])<0?-1:1;a.setXYZW(C,v.x,v.y,v.z,W)}for(let C=0,R=n.count;C<R;++C)c[C]&&b(C);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new mi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let i=new H,r=new H,a=new H,o=new H,l=new H,c=new H,h=new H,f=new H;if(t)for(let d=0,u=t.count;d<u;d+=3){let m=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,u=e.count;d<u;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(l.length*h),u=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?u=l[_]*o.data.stride+o.offset:u=l[_]*h;for(let g=0;g<h;g++)d[m++]=c[u++]}return new mi(d,h,f)}if(this.index===null)return Kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let d=c[h],u=t(d,n);l.push(u)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){let u=c[f];h.push(u.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let d=0,u=f.length;d<u;d++)h.push(f[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var mu=new H,fx=new H,px=new Qt,Jn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=mu.subVectors(n,e).cross(fx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(mu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||px.getNormalMatrix(t),i=this.coplanarPoint(mu).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},mx=0,Kn=class extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=$r(),this.name="",this.type="Material",this.blending=Wr,this.side=gs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bu,this.blendDst=ku,this.blendEquation=Ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=Cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fl,this.stencilZFail=fl,this.stencilZPass=fl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Kt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Jn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Dt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Dt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Oi=new H,gu=new H,$o=new H,Yo=new H,Dr=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Oi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Oi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Oi.copy(this.origin).addScaledVector(this.direction,e),Oi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){gu.copy(t).add(e).multiplyScalar(.5),$o.copy(e).sub(t).normalize(),Yo.copy(this.origin).sub(gu);let r=t.distanceTo(e)*.5,a=-this.direction.dot($o),o=Yo.dot(this.direction),l=-Yo.dot($o),c=Yo.lengthSq(),h=Math.abs(1-a*a),f,d,u,m;if(h>0)if(f=a*l-o,d=a*o-l,m=r*h,f>=0)if(d>=-m)if(d<=m){let _=1/h;f*=_,d*=_,u=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d<=-m?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c):d<=m?(f=0,d=Math.min(Math.max(-r,-l),r),u=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(gu).addScaledVector($o,d),u}intersectSphere(t,e){if(t.radius<0)return null;Oi.subVectors(t.center,this.origin);let n=Oi.dot(this.direction),i=Oi.dot(Oi)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(o=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Oi)!==null}intersectTriangle(t,e,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,d=t.y-a.y,u=t.z-a.z,m=e.x-a.x,_=e.y-a.y,p=e.z-a.z,g=n.x-a.x,y=n.y-a.y,S=n.z-a.z,v=Math.abs(l),A=Math.abs(c),T=Math.abs(h),x,b,C,R,L,W,O,P,F,V,N,Y;if(v>=A&&v>=T?(C=l,W=f,F=m,Y=g,l>=0?(x=c,b=h,R=d,L=u,O=_,P=p,V=y,N=S):(x=h,b=c,R=u,L=d,O=p,P=_,V=S,N=y)):A>=T?(C=c,W=d,F=_,Y=y,c>=0?(x=h,b=l,R=u,L=f,O=p,P=m,V=S,N=g):(x=l,b=h,R=f,L=u,O=m,P=p,V=g,N=S)):(C=h,W=u,F=p,Y=S,h>=0?(x=l,b=c,R=f,L=d,O=m,P=_,V=g,N=y):(x=c,b=l,R=d,L=f,O=_,P=m,V=y,N=g)),C===0)return null;let X=x/C,j=b/C,Z=1/C,q=R-X*W,ut=L-j*W,k=O-X*F,Q=P-j*F,gt=V-X*Y,vt=N-j*Y,dt=gt*Q-vt*k,Lt=q*vt-ut*gt,Zt=k*ut-Q*q;if(i){if(dt<0||Lt<0||Zt<0)return null}else if((dt<0||Lt<0||Zt<0)&&(dt>0||Lt>0||Zt>0))return null;let Ft=dt+Lt+Zt;if(Ft===0)return null;let Xt=Z*(dt*W+Lt*F+Zt*Y);return(Ft>0?Xt<0:Xt>0)?null:this.at(Xt/Ft,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Cl=class extends Kn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zi,this.combine=zu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Mp=new be,ks=new Dr,Zo=new us,Sp=new H,Jo=new H,Ko=new H,jo=new H,_u=new H,Qo=new H,bp=new H,tl=new H,Dn=class extends Ze{constructor(t=new wn,e=new Cl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){Qo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(_u.fromBufferAttribute(f,t),a?Qo.addScaledVector(_u,h):Qo.addScaledVector(_u.sub(e),h))}e.add(Qo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Zo.copy(n.boundingSphere),Zo.applyMatrix4(r),ks.copy(t.ray).recast(t.near),!(Zo.containsPoint(ks.origin)===!1&&(ks.intersectSphere(Zo,Sp)===null||ks.origin.distanceToSquared(Sp)>(t.far-t.near)**2))&&(Mp.copy(r).invert(),ks.copy(t.ray).applyMatrix4(Mp),!(n.boundingBox!==null&&ks.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ks)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){let p=d[m],g=a[p.materialIndex],y=Math.max(p.start,u.start),S=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let v=y,A=S;v<A;v+=3){let T=o.getX(v),x=o.getX(v+1),b=o.getX(v+2);i=el(this,g,t,n,c,h,f,T,x,b),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,u.start),_=Math.min(o.count,u.start+u.count);for(let p=m,g=_;p<g;p+=3){let y=o.getX(p),S=o.getX(p+1),v=o.getX(p+2);i=el(this,a,t,n,c,h,f,y,S,v),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){let p=d[m],g=a[p.materialIndex],y=Math.max(p.start,u.start),S=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let v=y,A=S;v<A;v+=3){let T=v,x=v+1,b=v+2;i=el(this,g,t,n,c,h,f,T,x,b),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,u.start),_=Math.min(l.count,u.start+u.count);for(let p=m,g=_;p<g;p+=3){let y=p,S=p+1,v=p+2;i=el(this,a,t,n,c,h,f,y,S,v),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function gx(s,t,e,n,i,r,a,o){let l;if(t.side===_n?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===gs,o),l===null)return null;tl.copy(o),tl.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(tl);return c<e.near||c>e.far?null:{distance:c,point:tl.clone(),object:s}}function el(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Jo),s.getVertexPosition(l,Ko),s.getVertexPosition(c,jo);let h=gx(s,t,e,n,Jo,Ko,jo,bp);if(h){let f=new H;cs.getBarycoord(bp,Jo,Ko,jo,f),i&&(h.uv=cs.getInterpolatedAttribute(i,o,l,c,f,new Dt)),r&&(h.uv1=cs.getInterpolatedAttribute(r,o,l,c,f,new Dt)),a&&(h.normal=cs.getInterpolatedAttribute(a,o,l,c,f,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new H,materialIndex:0};cs.getNormal(Jo,Ko,jo,d.normal),h.face=d,h.barycoord=f}return h}var Rl=class extends bn{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ye,h=Ye,f,d){super(null,a,o,l,c,h,i,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zs=new us,_x=new Dt(.5,.5),nl=new H,ds=class{constructor(t=new Jn,e=new Jn,n=new Jn,i=new Jn,r=new Jn,a=new Jn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Hn,n=!1){let i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],d=r[6],u=r[7],m=r[8],_=r[9],p=r[10],g=r[11],y=r[12],S=r[13],v=r[14],A=r[15];if(i[0].setComponents(c-a,u-h,g-m,A-y).normalize(),i[1].setComponents(c+a,u+h,g+m,A+y).normalize(),i[2].setComponents(c+o,u+f,g+_,A+S).normalize(),i[3].setComponents(c-o,u-f,g-_,A-S).normalize(),n)i[4].setComponents(l,d,p,v).normalize(),i[5].setComponents(c-l,u-d,g-p,A-v).normalize();else if(i[4].setComponents(c-l,u-d,g-p,A-v).normalize(),e===Hn)i[5].setComponents(c+l,u+d,g+p,A+v).normalize();else if(e===Rr)i[5].setComponents(l,d,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zs)}intersectsSprite(t){zs.center.set(0,0,0);let e=_x.distanceTo(t.center);return zs.radius=.7071067811865476+e,zs.applyMatrix4(t.matrixWorld),this.intersectsSphere(zs)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(nl.x=i.normal.x>0?t.max.x:t.min.x,nl.y=i.normal.y>0?t.max.y:t.min.y,nl.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(nl)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},wp=new be,Pl=class s{constructor(){this.coordinateSystem=Hn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];wp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new ds),n[i].setFromProjectionMatrix(wp,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new ds),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};var Gs=class extends Kn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Il=new H,Ll=new H,Ap=new be,va=new Dr,il=new us,xu=new H,Tp=new H,Dl=class extends Ze{constructor(t=new wn,e=new Gs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Il.fromBufferAttribute(e,i-1),Ll.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Il.distanceTo(Ll);t.setAttribute("lineDistance",new Ue(n,1))}else Kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),il.copy(n.boundingSphere),il.applyMatrix4(i),il.radius+=r,t.ray.intersectsSphere(il)===!1)return;Ap.copy(i).invert(),va.copy(t.ray).applyMatrix4(Ap);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=u,p=m-1;_<p;_+=c){let g=h.getX(_),y=h.getX(_+1),S=sl(this,t,va,l,g,y,_);S&&e.push(S)}if(this.isLineLoop){let _=h.getX(m-1),p=h.getX(u),g=sl(this,t,va,l,_,p,m-1);g&&e.push(g)}}else{let u=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=u,p=m-1;_<p;_+=c){let g=sl(this,t,va,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=sl(this,t,va,l,m-1,u,m-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function sl(s,t,e,n,i,r,a){let o=s.geometry.attributes.position;if(Il.fromBufferAttribute(o,i),Ll.fromBufferAttribute(o,r),e.distanceSqToSegment(Il,Ll,xu,Tp)>n)return;xu.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(xu);if(!(c<t.near||c>t.far))return{distance:c,point:Tp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Ep=new H,Cp=new H,Nr=class extends Dl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Ep.fromBufferAttribute(e,i),Cp.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ep.distanceTo(Cp);t.setAttribute("lineDistance",new Ue(n,1))}else Kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Nl=class extends Kn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Rp=new be,Eu=new Dr,rl=new us,al=new H,Da=class extends Ze{constructor(t=new wn,e=new Nl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rl.copy(n.boundingSphere),rl.applyMatrix4(i),rl.radius+=r,t.ray.intersectsSphere(rl)===!1)return;Rp.copy(i).invert(),Eu.copy(t.ray).applyMatrix4(Rp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let m=d,_=u;m<_;m++){let p=c.getX(m);al.fromBufferAttribute(f,p),Pp(al,p,l,i,t,e,this)}}else{let d=Math.max(0,a.start),u=Math.min(f.count,a.start+a.count);for(let m=d,_=u;m<_;m++)al.fromBufferAttribute(f,m),Pp(al,m,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Pp(s,t,e,n,i,r,a){let o=Eu.distanceSqToPoint(s);if(o<e){let l=new H;Eu.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Na=class extends bn{constructor(t=[],e=Zs,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Vi=class extends bn{constructor(t,e,n=jn,i,r,a,o=Ye,l=Ye,c,h=ki,f=1){if(h!==ki&&h!==Hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:f};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ir(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ua=class extends Vi{constructor(t,e=jn,n=Zs,i,r,a=Ye,o=Ye,l,c=ki){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Oa=class extends bn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ur=class s extends wn{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],d=0,u=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(f,2));function m(_,p,g,y,S,v,A,T,x,b,C){let R=v/x,L=A/b,W=v/2,O=A/2,P=T/2,F=x+1,V=b+1,N=0,Y=0,X=new H;for(let j=0;j<V;j++){let Z=j*L-O;for(let q=0;q<F;q++){let ut=q*R-W;X[_]=ut*y,X[p]=Z*S,X[g]=P,c.push(X.x,X.y,X.z),X[_]=0,X[p]=0,X[g]=T>0?1:-1,h.push(X.x,X.y,X.z),f.push(q/x),f.push(1-j/b),N+=1}}for(let j=0;j<b;j++)for(let Z=0;Z<x;Z++){let q=d+Z+F*j,ut=d+Z+F*(j+1),k=d+(Z+1)+F*(j+1),Q=d+(Z+1)+F*j;l.push(q,ut,Q),l.push(ut,k,Q),Y+=6}o.addGroup(u,Y,C),u+=Y,d+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Nn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,u=(a-h)/d;return(i+u)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new Dt:new H);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new H,i=[],r=[],a=[],o=new H,l=new be;for(let u=0;u<=t;u++){let m=u/t;i[u]=this.getTangentAt(m,new H)}r[0]=new H,a[0]=new H;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),f=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(i[u-1],i[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(re(i[u-1].dot(i[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(i[u],r[u])}if(e===!0){let u=Math.acos(re(r[0].dot(r[t]),-1,1));u/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],u*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Or=class extends Nn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Dt){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*h-u*f+this.aX,c=d*f+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ul=class extends Or{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function od(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+f)+(l-o)/f;d*=h,u*=h,i(a,o,d,u)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var Ip=new H,Lp=new H,vu=new od,yu=new od,Mu=new od,Ol=class extends Nn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new H){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Lp.subVectors(i[0],i[1]).add(i[0]),c=Lp);let f=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ip.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ip),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(f),u),_=Math.pow(f.distanceToSquared(d),u),p=Math.pow(d.distanceToSquared(h),u);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),vu.initNonuniformCatmullRom(c.x,f.x,d.x,h.x,m,_,p),yu.initNonuniformCatmullRom(c.y,f.y,d.y,h.y,m,_,p),Mu.initNonuniformCatmullRom(c.z,f.z,d.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(vu.initCatmullRom(c.x,f.x,d.x,h.x,this.tension),yu.initCatmullRom(c.y,f.y,d.y,h.y,this.tension),Mu.initCatmullRom(c.z,f.z,d.z,h.z,this.tension));return n.set(vu.calc(l),yu.calc(l),Mu.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new H().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Dp(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function xx(s,t){let e=1-s;return e*e*t}function vx(s,t){return 2*(1-s)*s*t}function yx(s,t){return s*s*t}function Sa(s,t,e,n){return xx(s,t)+vx(s,e)+yx(s,n)}function Mx(s,t){let e=1-s;return e*e*e*t}function Sx(s,t){let e=1-s;return 3*e*e*s*t}function bx(s,t){return 3*(1-s)*s*s*t}function wx(s,t){return s*s*s*t}function ba(s,t,e,n,i){return Mx(s,t)+Sx(s,e)+bx(s,n)+wx(s,i)}var Fa=class extends Nn{constructor(t=new Dt,e=new Dt,n=new Dt,i=new Dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Dt){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ba(t,i.x,r.x,a.x,o.x),ba(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Fl=class extends Nn{constructor(t=new H,e=new H,n=new H,i=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new H){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ba(t,i.x,r.x,a.x,o.x),ba(t,i.y,r.y,a.y,o.y),ba(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ba=class extends Nn{constructor(t=new Dt,e=new Dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Dt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Bl=class extends Nn{constructor(t=new H,e=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new H){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new H){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ka=class extends Nn{constructor(t=new Dt,e=new Dt,n=new Dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Dt){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Sa(t,i.x,r.x,a.x),Sa(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},kl=class extends Nn{constructor(t=new H,e=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new H){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Sa(t,i.x,r.x,a.x),Sa(t,i.y,r.y,a.y),Sa(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},za=class extends Nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Dt){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(Dp(o,l.x,c.x,h.x,f.x),Dp(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new Dt().fromArray(i))}return this}},Cu=Object.freeze({__proto__:null,ArcCurve:Ul,CatmullRomCurve3:Ol,CubicBezierCurve:Fa,CubicBezierCurve3:Fl,EllipseCurve:Or,LineCurve:Ba,LineCurve3:Bl,QuadraticBezierCurve:ka,QuadraticBezierCurve3:kl,SplineCurve:za}),zl=class extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Cu[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Cu[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},Hs=class extends zl{constructor(t){super(),this.type="Path",this.currentPoint=new Dt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ba(this.currentPoint.clone(),new Dt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new ka(this.currentPoint.clone(),new Dt(t,e),new Dt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new Fa(this.currentPoint.clone(),new Dt(t,e),new Dt(n,i),new Dt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new za(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new Or(t,e,n,i,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Fr=class extends Hs{constructor(t){super(t),this.uuid=$r(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Hs().fromJSON(i))}return this}};function Ax(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Rm(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Px(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,f=l;for(let d=e;d<i;d+=e){let u=s[d],m=s[d+1];u<o&&(o=u),m<l&&(l=m),u>h&&(h=u),m>f&&(f=m)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return Va(r,a,e,o,l,c,0),a}function Rm(s,t,e,n,i){let r;if(i===Vx(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=Np(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Np(a/n|0,s[a],s[a+1],r);return r&&Br(r,r.next)&&(Ha(r),r=r.next),r}function Ws(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Br(e,e.next)||Ne(e.prev,e,e.next)===0)){if(Ha(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Va(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Ux(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Ex(s,n,i,r):Tx(s)){t.push(l.i,s.i,c.i),Ha(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Cx(Ws(s),t),Va(s,t,e,n,i,r,2)):a===2&&Rx(s,t,e,n,i,r):Va(Ws(s),t,e,n,i,r,1);break}}}function Tx(s){let t=s.prev,e=s,n=s.next;if(Ne(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),f=Math.min(o,l,c),d=Math.max(i,r,a),u=Math.max(o,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=f&&m.y<=u&&ya(i,o,r,l,a,c,m.x,m.y)&&Ne(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ex(s,t,e,n){let i=s.prev,r=s,a=s.next;if(Ne(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,f=r.y,d=a.y,u=Math.min(o,l,c),m=Math.min(h,f,d),_=Math.max(o,l,c),p=Math.max(h,f,d),g=Ru(u,m,t,e,n),y=Ru(_,p,t,e,n),S=s.prevZ,v=s.nextZ;for(;S&&S.z>=g&&v&&v.z<=y;){if(S.x>=u&&S.x<=_&&S.y>=m&&S.y<=p&&S!==i&&S!==a&&ya(o,h,l,f,c,d,S.x,S.y)&&Ne(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=u&&v.x<=_&&v.y>=m&&v.y<=p&&v!==i&&v!==a&&ya(o,h,l,f,c,d,v.x,v.y)&&Ne(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=g;){if(S.x>=u&&S.x<=_&&S.y>=m&&S.y<=p&&S!==i&&S!==a&&ya(o,h,l,f,c,d,S.x,S.y)&&Ne(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=y;){if(v.x>=u&&v.x<=_&&v.y>=m&&v.y<=p&&v!==i&&v!==a&&ya(o,h,l,f,c,d,v.x,v.y)&&Ne(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Cx(s,t){let e=s;do{let n=e.prev,i=e.next.next;!Br(n,i)&&Im(n,e,e.next,i)&&Ga(n,i)&&Ga(i,n)&&(t.push(n.i,e.i,i.i),Ha(e),Ha(e.next),e=s=i),e=e.next}while(e!==s);return Ws(e)}function Rx(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Bx(a,o)){let l=Lm(a,o);a=Ws(a,a.next),l=Ws(l,l.next),Va(a,t,e,n,i,r,0),Va(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Px(s,t,e,n){let i=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Rm(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Fx(c))}i.sort(Ix);for(let r=0;r<i.length;r++)e=Lx(i[r],e);return e}function Ix(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Lx(s,t){let e=Dx(s,t);if(!e)return t;let n=Lm(e,s);return Ws(n,n.next),Ws(e,e.next)}function Dx(s,t){let e=t,n=s.x,i=s.y,r=-1/0,a;if(Br(s,e))return e;do{if(Br(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let f=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Pm(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let f=Math.abs(i-e.y)/(n-e.x);Ga(e,s)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&Nx(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function Nx(s,t){return Ne(s.prev,s,t.prev)<0&&Ne(t.next,s,s.next)<0}function Ux(s,t,e,n){let i=s;do i.z===0&&(i.z=Ru(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Ox(i)}function Ox(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Ru(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Fx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Pm(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function ya(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Pm(s,t,e,n,i,r,a,o)}function Bx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!kx(s,t)&&(Ga(s,t)&&Ga(t,s)&&zx(s,t)&&(Ne(s.prev,s,t.prev)||Ne(s,t.prev,t))||Br(s,t)&&Ne(s.prev,s,s.next)>0&&Ne(t.prev,t,t.next)>0)}function Ne(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Br(s,t){return s.x===t.x&&s.y===t.y}function Im(s,t,e,n){let i=ll(Ne(s,t,e)),r=ll(Ne(s,t,n)),a=ll(Ne(e,n,s)),o=ll(Ne(e,n,t));return!!(i!==r&&a!==o||i===0&&ol(s,e,t)||r===0&&ol(s,n,t)||a===0&&ol(e,s,n)||o===0&&ol(e,t,n))}function ol(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function ll(s){return s>0?1:s<0?-1:0}function kx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Im(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Ga(s,t){return Ne(s.prev,s,s.next)<0?Ne(s,t,s.next)>=0&&Ne(s,s.prev,t)>=0:Ne(s,t,s.prev)<0||Ne(s,s.next,t)<0}function zx(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Lm(s,t){let e=Pu(s.i,s.x,s.y),n=Pu(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Np(s,t,e,n){let i=Pu(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ha(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Pu(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Vx(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Iu=class{static triangulate(t,e,n=2){return Ax(t,e,n)}},Vs=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];Up(t),Op(n,t);let a=t.length;e.forEach(Up);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Op(n,e[l]);let o=Iu.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Up(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Op(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var Wa=class s extends wn{constructor(t=new Fr([new Dt(.5,.5),new Dt(-.5,.5),new Dt(-.5,-.5),new Dt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Ue(i,3)),this.setAttribute("uv",new Ue(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:u-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:Gx,S,v=!1,A,T,x,b;if(g){S=g.getSpacedPoints(h),v=!0,d=!1;let st=g.isCatmullRomCurve3?g.closed:!1;A=g.computeFrenetFrames(h,st),T=new H,x=new H,b=new H}d||(p=0,u=0,m=0,_=0);let C=o.extractPoints(c),R=C.shape,L=C.holes;if(!Vs.isClockWise(R)){R=R.reverse();for(let st=0,G=L.length;st<G;st++){let et=L[st];Vs.isClockWise(et)&&(L[st]=et.reverse())}}function O(st){let et=10000000000000001e-36,ct=st[0];for(let B=1;B<=st.length;B++){let ht=B%st.length,mt=st[ht],Ct=mt.x-ct.x,Nt=mt.y-ct.y,qt=Ct*Ct+Nt*Nt,D=Math.max(Math.abs(mt.x),Math.abs(mt.y),Math.abs(ct.x),Math.abs(ct.y)),fe=et*D*D;if(qt<=fe){st.splice(ht,1),B--;continue}ct=mt}}O(R),L.forEach(O);let P=L.length,F=R;for(let st=0;st<P;st++){let G=L[st];R=R.concat(G)}function V(st,G,et){return G||jt("ExtrudeGeometry: vec does not exist"),st.clone().addScaledVector(G,et)}let N=R.length;function Y(st,G,et){let ct,B,ht,mt=st.x-G.x,Ct=st.y-G.y,Nt=et.x-st.x,qt=et.y-st.y,D=mt*mt+Ct*Ct,fe=mt*qt-Ct*Nt;if(Math.abs(fe)>Number.EPSILON){let rt=Math.sqrt(D),St=Math.sqrt(Nt*Nt+qt*qt),at=G.x-Ct/rt,Rt=G.y+mt/rt,xt=et.x-qt/St,bt=et.y+Nt/St,E=((xt-at)*qt-(bt-Rt)*Nt)/(mt*qt-Ct*Nt);ct=at+mt*E-st.x,B=Rt+Ct*E-st.y;let M=ct*ct+B*B;if(M<=2)return new Dt(ct,B);ht=Math.sqrt(M/2)}else{let rt=!1;mt>Number.EPSILON?Nt>Number.EPSILON&&(rt=!0):mt<-Number.EPSILON?Nt<-Number.EPSILON&&(rt=!0):Math.sign(Ct)===Math.sign(qt)&&(rt=!0),rt?(ct=-Ct,B=mt,ht=Math.sqrt(D)):(ct=mt,B=Ct,ht=Math.sqrt(D/2))}return new Dt(ct/ht,B/ht)}let X=[];for(let st=0,G=F.length,et=G-1,ct=st+1;st<G;st++,et++,ct++)et===G&&(et=0),ct===G&&(ct=0),X[st]=Y(F[st],F[et],F[ct]);let j=[],Z,q=X.concat();for(let st=0,G=P;st<G;st++){let et=L[st];Z=[];for(let ct=0,B=et.length,ht=B-1,mt=ct+1;ct<B;ct++,ht++,mt++)ht===B&&(ht=0),mt===B&&(mt=0),Z[ct]=Y(et[ct],et[ht],et[mt]);j.push(Z),q=q.concat(Z)}let ut;if(p===0)ut=Vs.triangulateShape(F,L);else{let st=[],G=[];for(let et=0;et<p;et++){let ct=et/p,B=u*Math.cos(ct*Math.PI/2),ht=m*Math.sin(ct*Math.PI/2)+_;for(let mt=0,Ct=F.length;mt<Ct;mt++){let Nt=V(F[mt],X[mt],ht);Lt(Nt.x,Nt.y,-B),ct===0&&st.push(Nt)}for(let mt=0,Ct=P;mt<Ct;mt++){let Nt=L[mt];Z=j[mt];let qt=[];for(let D=0,fe=Nt.length;D<fe;D++){let rt=V(Nt[D],Z[D],ht);Lt(rt.x,rt.y,-B),ct===0&&qt.push(rt)}ct===0&&G.push(qt)}}ut=Vs.triangulateShape(st,G)}let k=ut.length,Q=m+_;for(let st=0;st<N;st++){let G=d?V(R[st],q[st],Q):R[st];v?(x.copy(A.normals[0]).multiplyScalar(G.x),T.copy(A.binormals[0]).multiplyScalar(G.y),b.copy(S[0]).add(x).add(T),Lt(b.x,b.y,b.z)):Lt(G.x,G.y,0)}for(let st=1;st<=h;st++)for(let G=0;G<N;G++){let et=d?V(R[G],q[G],Q):R[G];v?(x.copy(A.normals[st]).multiplyScalar(et.x),T.copy(A.binormals[st]).multiplyScalar(et.y),b.copy(S[st]).add(x).add(T),Lt(b.x,b.y,b.z)):Lt(et.x,et.y,f/h*st)}for(let st=p-1;st>=0;st--){let G=st/p,et=u*Math.cos(G*Math.PI/2),ct=m*Math.sin(G*Math.PI/2)+_;for(let B=0,ht=F.length;B<ht;B++){let mt=V(F[B],X[B],ct);Lt(mt.x,mt.y,f+et)}for(let B=0,ht=L.length;B<ht;B++){let mt=L[B];Z=j[B];for(let Ct=0,Nt=mt.length;Ct<Nt;Ct++){let qt=V(mt[Ct],Z[Ct],ct);v?Lt(qt.x,qt.y+S[h-1].y,S[h-1].x+et):Lt(qt.x,qt.y,f+et)}}}gt(),vt();function gt(){let st=i.length/3;if(d){let G=0,et=N*G;for(let ct=0;ct<k;ct++){let B=ut[ct];Zt(B[2]+et,B[1]+et,B[0]+et)}G=h+p*2,et=N*G;for(let ct=0;ct<k;ct++){let B=ut[ct];Zt(B[0]+et,B[1]+et,B[2]+et)}}else{for(let G=0;G<k;G++){let et=ut[G];Zt(et[2],et[1],et[0])}for(let G=0;G<k;G++){let et=ut[G];Zt(et[0]+N*h,et[1]+N*h,et[2]+N*h)}}n.addGroup(st,i.length/3-st,0)}function vt(){let st=i.length/3,G=0;dt(F,G),G+=F.length;for(let et=0,ct=L.length;et<ct;et++){let B=L[et];dt(B,G),G+=B.length}n.addGroup(st,i.length/3-st,1)}function dt(st,G){let et=st.length;for(;--et>=0;){let ct=et,B=et-1;B<0&&(B=st.length-1);for(let ht=0,mt=h+p*2;ht<mt;ht++){let Ct=N*ht,Nt=N*(ht+1),qt=G+ct+Ct,D=G+B+Ct,fe=G+B+Nt,rt=G+ct+Nt;Ft(qt,D,fe,rt)}}}function Lt(st,G,et){l.push(st),l.push(G),l.push(et)}function Zt(st,G,et){Xt(st),Xt(G),Xt(et);let ct=i.length/3,B=y.generateTopUV(n,i,ct-3,ct-2,ct-1);Jt(B[0]),Jt(B[1]),Jt(B[2])}function Ft(st,G,et,ct){Xt(st),Xt(G),Xt(ct),Xt(G),Xt(et),Xt(ct);let B=i.length/3,ht=y.generateSideWallUV(n,i,B-6,B-3,B-2,B-1);Jt(ht[0]),Jt(ht[1]),Jt(ht[3]),Jt(ht[1]),Jt(ht[2]),Jt(ht[3])}function Xt(st){i.push(l[st*3+0]),i.push(l[st*3+1]),i.push(l[st*3+2])}function Jt(st){r.push(st.x),r.push(st.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Hx(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Cu[i.type]().fromJSON(i)),new s(n,t.options)}},Gx={generateTopUV:function(s,t,e,n,i){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Dt(r,a),new Dt(o,l),new Dt(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],d=t[i*3],u=t[i*3+1],m=t[i*3+2],_=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Dt(a,1-l),new Dt(c,1-f),new Dt(d,1-m),new Dt(_,1-g)]:[new Dt(o,1-l),new Dt(h,1-f),new Dt(u,1-m),new Dt(p,1-g)]}};function Hx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Xs=class s extends wn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=t/o,d=e/l,u=[],m=[],_=[],p=[];for(let g=0;g<h;g++){let y=g*d-a;for(let S=0;S<c;S++){let v=S*f-r;m.push(v,-y,0),_.push(0,0,1),p.push(S/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<o;y++){let S=y+c*g,v=y+c*(g+1),A=y+1+c*(g+1),T=y+1+c*g;u.push(S,v,T),u.push(v,A,T)}this.setIndex(u),this.setAttribute("position",new Ue(m,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Xa=class extends Kn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ee(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function Ks(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(Fp(i))i.isRenderTargetTexture?(Kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Fp(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function cn(s){let t={};for(let e=0;e<s.length;e++){let n=Ks(s[e]);for(let i in n)t[i]=n[i]}return t}function Fp(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Wx(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ld(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var Dm={clone:Ks,merge:cn},Xx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wn=class extends Kn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xx,this.fragmentShader=qx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ks(t.uniforms),this.uniformsGroups=Wx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new ee().setHex(i.value);break;case"v2":this.uniforms[n].value=new Dt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new H().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Re().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Qt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new be().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Vl=class extends Wn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},kr=class extends Kn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gc,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Gl=class extends Kn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Hl=class extends Kn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function wr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function cl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var fs=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Wl=class extends fs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wu,endingEnd:wu}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Au:r=t,o=2*e-n;break;case Tu:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Au:a=t,l=2*n-e;break;case Tu:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-e)/(i-e),_=m*m,p=_*m,g=-d*p+2*d*_-d*m,y=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*m+1,S=(-1-u)*p+(1.5+u)*_+.5*m,v=u*p-u*_;for(let A=0;A!==o;++A)r[A]=g*a[h+A]+y*a[c+A]+S*a[l+A]+v*a[f+A];return r}},Xl=class extends fs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),f=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*f+a[l+d]*h;return r}},ql=class extends fs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},$l=class extends fs{interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let m=(n-e)/(i-e),_=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*_+a[l+p]*m;return r}let d=o*2,u=t-1;for(let m=0;m!==o;++m){let _=a[c+m],p=a[l+m],g=u*d+m*2,y=f[g],S=f[g+1],v=t*d+m*2,A=h[v],T=h[v+1],x=Yx(n,e,y,A,i);r[m]=Nm(x,_,S,T,p)}return r}};function Nm(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function $x(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function Yx(s,t,e,n,i){let r=(s-t)/(i-t);for(let a=0;a<8;a++){let o=Nm(r,t,e,n,i)-s;if(Math.abs(o)<1e-10)break;let l=$x(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Un=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=wr(e,this.TimeBufferType),this.values=wr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:wr(t.times,Array),values:wr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),cl(t.settings)&&(n.settings={inTangents:wr(t.settings.inTangents,Array),outTangents:wr(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ql(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Xl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Wl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new $l(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case wa:e=this.InterpolantFactoryMethodDiscrete;break;case bl:e=this.InterpolantFactoryMethodLinear;break;case dl:e=this.InterpolantFactoryMethodSmooth;break;case bu:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Kt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wa;case this.InterpolantFactoryMethodLinear:return bl;case this.InterpolantFactoryMethodSmooth:return dl;case this.InterpolantFactoryMethodBezier:return bu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;cl(this.settings)&&(Bp(this.settings.inTangents,t),Bp(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;cl(this.settings)&&(kp(this.settings.inTangents,t),kp(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(jt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(jt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){jt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){jt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&J_(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){jt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===dl,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let f=o*n,d=f-n,u=f+n;for(let m=0;m!==n;++m){let _=e[f+m];if(_!==e[d+m]||_!==e[u+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*n,d=a*n;for(let u=0;u!==n;++u)e[d+u]=e[f+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,cl(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Bp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]+=t}function kp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}Un.prototype.ValueTypeName="";Un.prototype.TimeBufferType=Float32Array;Un.prototype.ValueBufferType=Float32Array;Un.prototype.DefaultInterpolation=bl;var ps=class extends Un{constructor(t,e,n){super(t,e,n)}};ps.prototype.ValueTypeName="bool";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=wa;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;var Yl=class extends Un{constructor(t,e,n,i){super(t,e,n,i)}};Yl.prototype.ValueTypeName="color";var Zl=class extends Un{constructor(t,e,n,i){super(t,e,n,i)}};Zl.prototype.ValueTypeName="number";var Jl=class extends fs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)_i.slerpFlat(r,0,a,c-o,a,c,l);return r}},qa=class extends Un{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Jl(this.times,this.values,this.getValueSize(),t)}};qa.prototype.ValueTypeName="quaternion";qa.prototype.InterpolantFactoryMethodSmooth=void 0;var ms=class extends Un{constructor(t,e,n){super(t,e,n)}};ms.prototype.ValueTypeName="string";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=wa;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;var Kl=class extends Un{constructor(t,e,n,i){super(t,e,n,i)}};Kl.prototype.ValueTypeName="vector";var jl=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=c.length;f<d;f+=2){let u=c[f],m=c[f+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Um=new jl,Ql=class{constructor(t){this.manager=t!==void 0?t:Um,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Ql.DEFAULT_MATERIAL_NAME="__DEFAULT";var zr=class extends Ze{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},$a=class extends zr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Su=new be,zp=new H,Vp=new H,tc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ds,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;zp.setFromMatrixPosition(t.matrixWorld),e.position.copy(zp),Vp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vp),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Su.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Su,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===Rr||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Su)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},hl=new H,ul=new _i,fi=new H,Ya=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(hl,ul,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hl,ul,fi.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(hl,ul,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hl,ul,fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ls=new H,Gp=new Dt,Hp=new Dt,mn=class extends Ya{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=wl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Kh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wl*2*Math.atan(Math.tan(Kh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ls.x,ls.y).multiplyScalar(-t/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-t/ls.z)}getViewSize(t,e){return this.getViewBounds(t,Gp,Hp),e.subVectors(Hp,Gp)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Kh*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Za=class extends Ya{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Lu=class extends tc{constructor(){super(new Za(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Vr=class extends zr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Lu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Ja=class extends zr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ar=-90,Tr=1,Gr=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new mn(Ar,Tr,t,e);i.layers=this.layers,this.add(i);let r=new mn(Ar,Tr,t,e);r.layers=this.layers,this.add(r);let a=new mn(Ar,Tr,t,e);a.layers=this.layers,this.add(a);let o=new mn(Ar,Tr,t,e);o.layers=this.layers,this.add(o);let l=new mn(Ar,Tr,t,e);l.layers=this.layers,this.add(l);let c=new mn(Ar,Tr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,d,u),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ec=class extends mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var cd="\\[\\]\\.:\\/",Zx=new RegExp("["+cd+"]","g"),hd="[^"+cd+"]",Jx="[^"+cd.replace("\\.","")+"]",Kx=/((?:WC+[\/:])*)/.source.replace("WC",hd),jx=/(WCOD+)?/.source.replace("WCOD",Jx),Qx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hd),tv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hd),ev=new RegExp("^"+Kx+jx+Qx+tv+"$"),nv=["material","materials","bones","map"],Du=class{constructor(t,e,n){let i=n||Te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Te=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Zx,"")}static parseTrackName(t){let e=ev.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);nv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Kt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){jt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){jt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){jt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){jt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){jt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;jt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=Du;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var z1=new Float32Array(1);var gd=class gd{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};gd.prototype.isMatrix2=!0;var Nu=gd;function ud(s,t,e,n){let i=iv(n);switch(e){case ju:return s*t;case td:return s*t/i.components*i.byteLength;case cc:return s*t/i.components*i.byteLength;case _s:return s*t*2/i.components*i.byteLength;case hc:return s*t*2/i.components*i.byteLength;case Qu:return s*t*3/i.components*i.byteLength;case ei:return s*t*4/i.components*i.byteLength;case uc:return s*t*4/i.components*i.byteLength;case to:case eo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case no:case io:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fc:case mc:return Math.max(s,16)*Math.max(t,8)/4;case dc:case pc:return Math.max(s,8)*Math.max(t,8)/2;case gc:case _c:case vc:case yc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case xc:case so:case Mc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Sc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case bc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case wc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ac:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Tc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Ec:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Cc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Rc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Pc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ic:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Lc:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Dc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Nc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Uc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Oc:case Fc:case Bc:return Math.ceil(s/4)*Math.ceil(t/4)*16;case kc:case zc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ro:case Vc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function iv(s){switch(s){case An:case Yu:return{byteLength:1,components:1};case qr:case Zu:case ti:return{byteLength:2,components:1};case oc:case lc:return{byteLength:2,components:4};case jn:case ac:case Qn:return{byteLength:4,components:1};case Ju:case Ku:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function i0(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function rv(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=s.HALF_FLOAT:u=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=s.SHORT;else if(c instanceof Uint32Array)u=s.UNSIGNED_INT;else if(c instanceof Int32Array)u=s.INT;else if(c instanceof Int8Array)u=s.BYTE;else if(c instanceof Uint8Array)u=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let h=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,h);else{f.sort((u,m)=>u.start-m.start);let d=0;for(let u=1;u<f.length;u++){let m=f[d],_=f[u];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,f[d]=_)}f.length=d+1;for(let u=0,m=f.length;u<m;u++){let _=f[u];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var av=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ov=`#ifdef USE_ALPHAHASH
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
#endif`,lv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,uv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dv=`#ifdef USE_AOMAP
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
#endif`,fv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pv=`#ifdef USE_BATCHING
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
#endif`,mv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_v=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vv=`#ifdef USE_IRIDESCENCE
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
#endif`,yv=`#ifdef USE_BUMPMAP
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
#endif`,Mv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Av=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Tv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ev=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Cv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Rv=`#define PI 3.141592653589793
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
} // validated`,Pv=`vec3 transformedNormal = objectNormal;
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
#endif`,Iv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ov=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fv=`#ifdef USE_ENVMAP
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
#endif`,Bv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,kv=`#ifdef USE_ENVMAP
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
#endif`,zv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vv=`#ifdef USE_ENVMAP
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
#endif`,Gv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qv=`#ifdef USE_GRADIENTMAP
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
}`,$v=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Kv=`#ifdef USE_ENVMAP
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
#endif`,jv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ty=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ey=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ny=`PhysicalMaterial material;
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
#endif`,iy=`uniform sampler2D dfgLUT;
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
}`,sy=`
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
#endif`,ry=`#if defined( RE_IndirectDiffuse )
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
#endif`,ay=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,oy=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,ly=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,py=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,my=`#if defined( USE_POINTS_UV )
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
#endif`,gy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_y=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vy=`#if defined( USE_MORPHCOLORS )
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
#endif`,yy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,My=`#ifdef USE_MORPHTARGETS
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
#endif`,Sy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,by=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,wy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ay=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ty=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ey=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Cy=`#ifdef USE_NORMALMAP
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
#endif`,Ry=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Py=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Iy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ly=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ny=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Uy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Oy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,By=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ky=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Wy=`float getShadowMask() {
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
}`,Xy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qy=`#ifdef USE_SKINNING
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
#endif`,$y=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yy=`#ifdef USE_SKINNING
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
#endif`,Zy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ky=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qy=`#ifdef USE_TRANSMISSION
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
#endif`,tM=`#ifdef USE_TRANSMISSION
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
#endif`,eM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,iM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,rM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,aM=`uniform sampler2D t2D;
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
}`,oM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lM=`uniform float backgroundBlurriness;
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
}`,cM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uM=`#include <common>
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
}`,dM=`#if DEPTH_PACKING == 3200
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
}`,fM=`#define DISTANCE
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
}`,pM=`#define DISTANCE
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
}`,mM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_M=`uniform float scale;
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
}`,xM=`uniform vec3 diffuse;
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
}`,vM=`#include <common>
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
}`,yM=`uniform vec3 diffuse;
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
}`,MM=`#define LAMBERT
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
}`,SM=`#define LAMBERT
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
}`,bM=`#define MATCAP
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
}`,wM=`#define MATCAP
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
}`,AM=`#define NORMAL
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
}`,TM=`#define NORMAL
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
}`,EM=`#define PHONG
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
}`,CM=`#define PHONG
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
}`,RM=`#define STANDARD
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
}`,PM=`#define STANDARD
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
}`,IM=`#define TOON
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
}`,LM=`#define TOON
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
}`,DM=`uniform float size;
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
}`,NM=`uniform vec3 diffuse;
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
}`,UM=`#include <common>
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
}`,OM=`uniform vec3 color;
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
}`,FM=`uniform float rotation;
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
}`,BM=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:av,alphahash_pars_fragment:ov,alphamap_fragment:lv,alphamap_pars_fragment:cv,alphatest_fragment:hv,alphatest_pars_fragment:uv,aomap_fragment:dv,aomap_pars_fragment:fv,batching_pars_vertex:pv,batching_vertex:mv,begin_vertex:gv,beginnormal_vertex:_v,bsdfs:xv,iridescence_fragment:vv,bumpmap_pars_fragment:yv,clipping_planes_fragment:Mv,clipping_planes_pars_fragment:Sv,clipping_planes_pars_vertex:bv,clipping_planes_vertex:wv,color_fragment:Av,color_pars_fragment:Tv,color_pars_vertex:Ev,color_vertex:Cv,common:Rv,defaultnormal_vertex:Pv,displacementmap_pars_vertex:Iv,displacementmap_vertex:Lv,emissivemap_fragment:Dv,emissivemap_pars_fragment:Nv,colorspace_fragment:Uv,colorspace_pars_fragment:Ov,envmap_fragment:Fv,envmap_common_pars_fragment:Bv,envmap_pars_fragment:kv,envmap_pars_vertex:zv,envmap_physical_pars_fragment:Kv,envmap_vertex:Vv,fog_vertex:Gv,fog_pars_vertex:Hv,fog_fragment:Wv,fog_pars_fragment:Xv,gradientmap_pars_fragment:qv,lightmap_pars_fragment:$v,lights_lambert_fragment:Yv,lights_lambert_pars_fragment:Zv,lights_pars_begin:Jv,lights_toon_fragment:jv,lights_toon_pars_fragment:Qv,lights_phong_fragment:ty,lights_phong_pars_fragment:ey,lights_physical_fragment:ny,lights_physical_pars_fragment:iy,lights_fragment_begin:sy,lights_fragment_maps:ry,lights_fragment_end:ay,lightprobes_pars_fragment:oy,logdepthbuf_fragment:ly,logdepthbuf_pars_fragment:cy,logdepthbuf_pars_vertex:hy,logdepthbuf_vertex:uy,map_fragment:dy,map_pars_fragment:fy,map_particle_fragment:py,map_particle_pars_fragment:my,metalnessmap_fragment:gy,metalnessmap_pars_fragment:_y,morphinstance_vertex:xy,morphcolor_vertex:vy,morphnormal_vertex:yy,morphtarget_pars_vertex:My,morphtarget_vertex:Sy,normal_fragment_begin:by,normal_fragment_maps:wy,normal_pars_fragment:Ay,normal_pars_vertex:Ty,normal_vertex:Ey,normalmap_pars_fragment:Cy,clearcoat_normal_fragment_begin:Ry,clearcoat_normal_fragment_maps:Py,clearcoat_pars_fragment:Iy,iridescence_pars_fragment:Ly,opaque_fragment:Dy,packing:Ny,premultiplied_alpha_fragment:Uy,project_vertex:Oy,dithering_fragment:Fy,dithering_pars_fragment:By,roughnessmap_fragment:ky,roughnessmap_pars_fragment:zy,shadowmap_pars_fragment:Vy,shadowmap_pars_vertex:Gy,shadowmap_vertex:Hy,shadowmask_pars_fragment:Wy,skinbase_vertex:Xy,skinning_pars_vertex:qy,skinning_vertex:$y,skinnormal_vertex:Yy,specularmap_fragment:Zy,specularmap_pars_fragment:Jy,tonemapping_fragment:Ky,tonemapping_pars_fragment:jy,transmission_fragment:Qy,transmission_pars_fragment:tM,uv_pars_fragment:eM,uv_pars_vertex:nM,uv_vertex:iM,worldpos_vertex:sM,background_vert:rM,background_frag:aM,backgroundCube_vert:oM,backgroundCube_frag:lM,cube_vert:cM,cube_frag:hM,depth_vert:uM,depth_frag:dM,distance_vert:fM,distance_frag:pM,equirect_vert:mM,equirect_frag:gM,linedashed_vert:_M,linedashed_frag:xM,meshbasic_vert:vM,meshbasic_frag:yM,meshlambert_vert:MM,meshlambert_frag:SM,meshmatcap_vert:bM,meshmatcap_frag:wM,meshnormal_vert:AM,meshnormal_frag:TM,meshphong_vert:EM,meshphong_frag:CM,meshphysical_vert:RM,meshphysical_frag:PM,meshtoon_vert:IM,meshtoon_frag:LM,points_vert:DM,points_frag:NM,shadow_vert:UM,shadow_frag:OM,sprite_vert:FM,sprite_frag:BM},Ot={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},Mi={basic:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:cn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:cn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:cn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:cn([Ot.points,Ot.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:cn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:cn([Ot.common,Ot.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:cn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:cn([Ot.sprite,Ot.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:cn([Ot.common,Ot.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:cn([Ot.lights,Ot.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Mi.physical={uniforms:cn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var Hc={r:0,b:0,g:0},kM=new be,s0=new Qt;s0.set(-1,0,0,0,1,0,0,0,1);function zM(s,t,e,n,i,r){let a=new ee(0),o=i===!0?0:1,l,c,h=null,f=0,d=null;function u(y){let S=y.isScene===!0?y.background:null;if(S&&S.isTexture){let v=y.backgroundBlurriness>0;S=t.get(S,v)}return S}function m(y){let S=!1,v=u(y);v===null?p(a,o):v&&v.isColor&&(p(v,1),S=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(y,S){let v=u(S);v&&v.isCubeTexture?(c===void 0&&(c=new Dn(new Ur(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Ks(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(kM.makeRotationFromEuler(S.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(s0),c.material.toneMapped=ce.getTransfer(v.colorSpace)!==_e,(h!==v||f!==v.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Dn(new Xs(2,2),new Wn({name:"BackgroundMaterial",uniforms:Ks(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:gs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=ce.getTransfer(v.colorSpace)!==_e,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,f=v.version,d=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,S){y.getRGB(Hc,ld(s)),e.buffers.color.setClear(Hc.r,Hc.g,Hc.b,S,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,S=1){a.set(y),o=S,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,p(a,o)},render:m,addToRenderList:_,dispose:g}}function VM(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,a=!1;function o(L,W,O,P,F){let V=!1,N=f(L,P,O,W);r!==N&&(r=N,c(r.object)),V=u(L,P,O,F),V&&m(L,P,O,F),F!==null&&t.update(F,s.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,v(L,W,O,P),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function f(L,W,O,P){let F=P.wireframe===!0,V=n[W.id];V===void 0&&(V={},n[W.id]=V);let N=L.isInstancedMesh===!0?L.id:0,Y=V[N];Y===void 0&&(Y={},V[N]=Y);let X=Y[O.id];X===void 0&&(X={},Y[O.id]=X);let j=X[F];return j===void 0&&(j=d(l()),X[F]=j),j}function d(L){let W=[],O=[],P=[];for(let F=0;F<e;F++)W[F]=0,O[F]=0,P[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:O,attributeDivisors:P,object:L,attributes:{},index:null}}function u(L,W,O,P){let F=r.attributes,V=W.attributes,N=0,Y=O.getAttributes();for(let X in Y)if(Y[X].location>=0){let Z=F[X],q=V[X];if(q===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(q=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(q=L.instanceColor)),Z===void 0||Z.attribute!==q||q&&Z.data!==q.data)return!0;N++}return r.attributesNum!==N||r.index!==P}function m(L,W,O,P){let F={},V=W.attributes,N=0,Y=O.getAttributes();for(let X in Y)if(Y[X].location>=0){let Z=V[X];Z===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(Z=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(Z=L.instanceColor));let q={};q.attribute=Z,Z&&Z.data&&(q.data=Z.data),F[X]=q,N++}r.attributes=F,r.attributesNum=N,r.index=P}function _(){let L=r.newAttributes;for(let W=0,O=L.length;W<O;W++)L[W]=0}function p(L){g(L,0)}function g(L,W){let O=r.newAttributes,P=r.enabledAttributes,F=r.attributeDivisors;O[L]=1,P[L]===0&&(s.enableVertexAttribArray(L),P[L]=1),F[L]!==W&&(s.vertexAttribDivisor(L,W),F[L]=W)}function y(){let L=r.newAttributes,W=r.enabledAttributes;for(let O=0,P=W.length;O<P;O++)W[O]!==L[O]&&(s.disableVertexAttribArray(O),W[O]=0)}function S(L,W,O,P,F,V,N){N===!0?s.vertexAttribIPointer(L,W,O,F,V):s.vertexAttribPointer(L,W,O,P,F,V)}function v(L,W,O,P){_();let F=P.attributes,V=O.getAttributes(),N=W.defaultAttributeValues;for(let Y in V){let X=V[Y];if(X.location>=0){let j=F[Y];if(j===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(j=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(j=L.instanceColor)),j!==void 0){let Z=j.normalized,q=j.itemSize,ut=t.get(j);if(ut===void 0)continue;let k=ut.buffer,Q=ut.type,gt=ut.bytesPerElement,vt=Q===s.INT||Q===s.UNSIGNED_INT||j.gpuType===ac;if(j.isInterleavedBufferAttribute){let dt=j.data,Lt=dt.isInterleavedBuffer===!0?dt.stride:dt.itemSize,Zt=j.offset;if(dt.isInstancedInterleavedBuffer||dt.isInstancedBufferAttribute){for(let Ft=0;Ft<X.locationSize;Ft++)g(X.location+Ft,dt.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Ft=0;Ft<X.locationSize;Ft++)p(X.location+Ft);s.bindBuffer(s.ARRAY_BUFFER,k);for(let Ft=0;Ft<X.locationSize;Ft++)S(X.location+Ft,q/X.locationSize,Q,Z,Lt*gt,(Zt+q/X.locationSize*Ft)*gt,vt)}else{if(j.isInstancedBufferAttribute){for(let dt=0;dt<X.locationSize;dt++)g(X.location+dt,j.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let dt=0;dt<X.locationSize;dt++)p(X.location+dt);s.bindBuffer(s.ARRAY_BUFFER,k);for(let dt=0;dt<X.locationSize;dt++)S(X.location+dt,q/X.locationSize,Q,Z,q*gt,q/X.locationSize*dt*gt,vt)}}else if(N!==void 0){let Z=N[Y];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(X.location,Z);break;case 3:s.vertexAttrib3fv(X.location,Z);break;case 4:s.vertexAttrib4fv(X.location,Z);break;default:s.vertexAttrib1fv(X.location,Z)}}}}y()}function A(){C();for(let L in n){let W=n[L];for(let O in W){let P=W[O];for(let F in P){let V=P[F];for(let N in V)h(V[N].object),delete V[N];delete P[F]}}delete n[L]}}function T(L){if(n[L.id]===void 0)return;let W=n[L.id];for(let O in W){let P=W[O];for(let F in P){let V=P[F];for(let N in V)h(V[N].object),delete V[N];delete P[F]}}delete n[L.id]}function x(L){for(let W in n){let O=n[W];for(let P in O){let F=O[P];if(F[L.id]===void 0)continue;let V=F[L.id];for(let N in V)h(V[N].object),delete V[N];delete F[L.id]}}}function b(L){for(let W in n){let O=n[W],P=L.isInstancedMesh===!0?L.id:0,F=O[P];if(F!==void 0){for(let V in F){let N=F[V];for(let Y in N)h(N[Y].object),delete N[Y];delete F[V]}delete O[P],Object.keys(O).length===0&&delete n[W]}}}function C(){R(),a=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:C,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function GM(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let u=0;u<h;u++)d+=c[u];e.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function HM(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(x){return!(x!==ei&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let b=x===ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==An&&x!==Qn&&!b&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Kt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&Kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&Kt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:u,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:v,maxSamples:A,samples:T}}function WM(s){let t=this,e=null,n=0,i=!1,r=!1,a=new Jn,o=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let u=f.length!==0||d||n!==0||i;return i=d,n=f.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,u){let m=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,g=s.get(f);if(!i||m===null||m.length===0||r&&!p)r?h(null):c();else{let y=r?0:n,S=y*4,v=g.clippingState||null;l.value=v,v=h(m,d,S,u);for(let A=0;A!==S;++A)v[A]=e[A];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,u,m){let _=f!==null?f.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=u+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<g)&&(p=new Float32Array(g));for(let S=0,v=u;S!==_;++S,v+=4)a.copy(f[S]).applyMatrix4(y,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var lo=class extends Ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Na(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ur(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:Ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:_n,blending:$s});r.uniforms.tEquirect.value=e;let a=new Dn(i,r),o=e.minFilter;return e.minFilter===Gi&&(e.minFilter=gn),new Gr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Om=256,XM=3,qM=20,r0=256,a0=16,$M=3,YM=new H,ZM=new ee,Xc=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Gr(1,10,null),this._boxMesh=new Dn(new Ur(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:a=256,position:o=YM}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,d=l.autoClearColor,u=l.autoClearDepth,m=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(ZM));let p=new Gr(n,i,h);return p.position.copy(o),p.update(l,t),l.autoClear=f,l.autoClearColor=d,l.autoClearDepth=u,l.autoClearStencil=m,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=km(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Om,Em(t))}_fromTexture(t,e){t.mapping===Zs||t.mapping===Xr?this._setSize(t.image.length===0?Om:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Fm(t,!1,!1),n=Math.log2(t)-XM;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Fm(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Zs||t.mapping===Xr?(this._cubemapMaterial===null&&(this._cubemapMaterial=km()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Bm()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=JM(),this._integrationMaterial=KM());let e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/a0);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-$M)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(r0*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=jM());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}};function Fm(s,t,e){return new lo(s,{minFilter:Gi,generateMipmaps:t,type:ti,colorSpace:Aa,depthBuffer:e})}function co(s,t,e){return new Wn({name:s,uniforms:t,vertexShader:se.cube_vert,fragmentShader:e,side:_n,blending:$s,depthTest:!1,depthWrite:!1})}function JM(){return co("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${r0}u

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
	`)}function KM(){return co("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:a0}},`

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
	`)}function jM(){return co("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${qM}
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
	`)}function Bm(){return co("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function km(){return co("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function QM(s){let t=new WeakMap,e=new WeakMap,n=null;function i(d,u=!1){return d==null?null:u?a(d):r(d)}function r(d){if(d&&d.isTexture){let u=d.mapping;if(u===ic||u===sc)if(t.has(d)){let m=t.get(d).texture;return o(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let _=new lo(m.height);return _.fromEquirectangularTexture(s,d),t.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let u=d.mapping,m=u===ic||u===sc,_=u===Zs||u===Xr;if(m||_){let p=e.get(d),g=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new Xc(s)),p=m?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),p.texture;if(p!==void 0)return p.texture;{let y=d.image;return m&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new Xc(s)),p=m?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function o(d,u){return u===ic?d.mapping=Zs:u===sc&&(d.mapping=Xr),d}function l(d){let u=0,m=6;for(let _=0;_<m;_++)d[_]!==void 0&&u++;return u===m}function c(d){let u=d.target;u.removeEventListener("dispose",c);let m=t.get(u);m!==void 0&&(t.delete(u),m.dispose())}function h(d){let u=d.target;u.removeEventListener("dispose",h);let m=e.get(u);m!==void 0&&(e.delete(u),m.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function tS(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Ma("WebGLRenderer: "+n+" extension not supported."),i}}}function eS(s,t,e,n){let i={},r=new WeakMap,a=new FinalizationRegistry(m=>delete i[m]);function o(m){l(m.target)}function l(m){m.index!==null&&t.remove(m.index);for(let p in m.attributes)t.remove(m.attributes[p]);m.removeEventListener("dispose",o),delete i[m.id],a.unregister(m);let _=r.get(m);_&&(t.remove(_),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(m,_){return i[_.id]!==void 0||(_.addEventListener("dispose",o),i[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(m){let _=m.attributes;for(let p in _)t.update(_[p],s.ARRAY_BUFFER)}function f(m){let _=m.index,p=m.attributes.position,g=0;if(p===void 0)return;let y=_!==null?_.array.length:p.array.length/3-1,S=p.count>=65535?La:Ia,v=new S(Math.ceil(y/3)*6,1),A=v.array;if(_!==null){let x=_.array;g=_.version;for(let b=0,C=0;b<y;b+=3){let R=x[b+0],L=x[b+1],W=x[b+2];A[C++]=R,A[C++]=L,A[C++]=L,A[C++]=W,A[C++]=W,A[C++]=R}}else{g=p.version;for(let x=0,b=0;x<y;x+=3){let C=x+0,R=x+1,L=x+2;A[b++]=C,A[b++]=R,A[b++]=R,A[b++]=L,A[b++]=L,A[b++]=C}}v.version=g;let T=r.get(m);T&&t.remove(T),r.set(m,v)}function d(m){let _=r.get(m);if(_){let p=m.index;p!==null&&_.version<p.version&&f(m)}else f(m);return r.get(m)}function u(){for(let m in i){let _=i[m].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:d,dispose:u}}function nS(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,u){u!==0&&(s.drawElementsInstanced(n,d,r,f*a,u),e.update(d,n,u))}function h(f,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,u);let _=0;for(let p=0;p<u;p++)_+=d[p];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function iS(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:jt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function sS(s,t,e){let n=new WeakMap,i=new Re;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==f){let C=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",C)};d!==void 0&&d.texture.dispose();let u=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],S=0;u===!0&&(S=1),m===!0&&(S=2),_===!0&&(S=3);let v=o.attributes.position.count*S,A=1;v>t.maxTextureSize&&(A=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let T=new Float32Array(v*A*4*f),x=new Ca(T,v,A,f);x.type=Qn,x.needsUpdate=!0;let b=S*4;for(let R=0;R<f;R++){let L=p[R],W=g[R],O=y[R],P=v*A*4*R;for(let F=0;F<L.count;F++){let V=F*b;u===!0&&(i.fromBufferAttribute(L,F),T[P+V+0]=i.x,T[P+V+1]=i.y,T[P+V+2]=i.z,T[P+V+3]=0),m===!0&&(i.fromBufferAttribute(W,F),T[P+V+4]=i.x,T[P+V+5]=i.y,T[P+V+6]=i.z,T[P+V+7]=0),_===!0&&(i.fromBufferAttribute(O,F),T[P+V+8]=i.x,T[P+V+9]=i.y,T[P+V+10]=i.z,T[P+V+11]=O.itemSize===4?i.w:1)}}d={count:f,texture:x,size:new Dt(v,A)},n.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let u=0;for(let _=0;_<c.length;_++)u+=c[_];let m=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function rS(s,t,e,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,f=c.geometry,d=t.get(c,f);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let u=c.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var aS={[Vu]:"LINEAR_TONE_MAPPING",[Gu]:"REINHARD_TONE_MAPPING",[Hu]:"CINEON_TONE_MAPPING",[Wu]:"ACES_FILMIC_TONE_MAPPING",[qu]:"AGX_TONE_MAPPING",[ja]:"NEUTRAL_TONE_MAPPING",[Xu]:"CUSTOM_TONE_MAPPING"};function oS(s,t,e,n,i,r){let a=new Ln(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new wn;h.setAttribute("position",new Ue([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ue([0,2,0,0,2,0],2));let f=new Vl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Dn(h,f),u=new Za(-1,1,1,-1,0,1),m=null,_=null,p=!1,g,y=null,S=[],v=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let x=0;x<S.length;x++){let b=S[x];b.setSize&&b.setSize(A,T)}},this.setEffects=function(A){S=A,v=S.length>0&&S[0].isRenderPass===!0;let T=a.width,x=a.height;S.length>0&&o===null&&(o=new Ln(T,x,{type:ti,depthBuffer:!1,stencilBuffer:!1}),l=new Ln(T,x,{type:ti,depthBuffer:!1,stencilBuffer:!1}));let b=i===!0&&S.some(C=>C.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&c===null&&(c=new Vi(T,x),r===!0&&(c.format=Hi,c.type=Js)),a.dispose(),a.depthTexture=b?c:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let C=0;C<S.length;C++){let R=S[C];R.setSize&&R.setSize(T,x),b&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(A,T){if(p||A.toneMapping===vi&&S.length===0)return!1;if(y=T,T!==null){let x=T.width,b=T.height;(a.width!==x||a.height!==b)&&this.setSize(x,b)}return v===!1&&A.setRenderTarget(a),g=A.toneMapping,A.toneMapping=vi,!0},this.hasRenderPass=function(){return v},this.end=function(A,T){A.toneMapping=g,p=!0;let x=a,b=o;for(let C=0;C<S.length;C++){let R=S[C];R.enabled!==!1&&(R.render(A,b,x,T),R.needsSwap!==!1&&(x=b,b=b===o?l:o))}if(m!==A.outputColorSpace||_!==A.toneMapping){m=A.outputColorSpace,_=A.toneMapping,f.defines={},ce.getTransfer(m)===_e&&(f.defines.SRGB_TRANSFER="");let C=aS[_];C&&(f.defines[C]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(y),A.render(d,u),y=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}var o0=new bn,l0=new Vi(1,1),c0=new Ua(1),h0=new Ca,u0=new El,d0=new Na,zm=[],Vm=[],Gm=new Float32Array(16),Hm=new Float32Array(9),Wm=new Float32Array(4);function Zr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=zm[i];if(r===void 0&&(r=new Float32Array(i),zm[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function He(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function We(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function $c(s,t){let e=Vm[t];e===void 0&&(e=new Int32Array(t),Vm[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function lS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function cS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2fv(this.addr,t),We(e,t)}}function hS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;s.uniform3fv(this.addr,t),We(e,t)}}function uS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4fv(this.addr,t),We(e,t)}}function dS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Wm.set(n),s.uniformMatrix2fv(this.addr,!1,Wm),We(e,n)}}function fS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Hm.set(n),s.uniformMatrix3fv(this.addr,!1,Hm),We(e,n)}}function pS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Gm.set(n),s.uniformMatrix4fv(this.addr,!1,Gm),We(e,n)}}function mS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function gS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2iv(this.addr,t),We(e,t)}}function _S(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3iv(this.addr,t),We(e,t)}}function xS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4iv(this.addr,t),We(e,t)}}function vS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function yS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2uiv(this.addr,t),We(e,t)}}function MS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3uiv(this.addr,t),We(e,t)}}function SS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4uiv(this.addr,t),We(e,t)}}function Yc(s){return s.version===0&&(s.compareFunction=id,s.needsUpdate=!0),s}function bS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Yc(l0):r=o0,e.setTexture2D(t||r,i)}function wS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||u0,i)}function AS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Yc(c0):r=d0,e.setTextureCube(t||r,i)}function TS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||h0,i)}function ES(s){switch(s){case 5126:return lS;case 35664:return cS;case 35665:return hS;case 35666:return uS;case 35674:return dS;case 35675:return fS;case 35676:return pS;case 5124:case 35670:return mS;case 35667:case 35671:return gS;case 35668:case 35672:return _S;case 35669:case 35673:return xS;case 5125:return vS;case 36294:return yS;case 36295:return MS;case 36296:return SS;case 35678:case 36198:case 36298:case 36306:case 35682:return bS;case 35679:case 36299:case 36307:return wS;case 35680:case 36300:case 36308:case 36293:return AS;case 36289:case 36303:case 36311:case 36292:return TS}}function CS(s,t){s.uniform1fv(this.addr,t)}function RS(s,t){let e=Zr(t,this.size,2);s.uniform2fv(this.addr,e)}function PS(s,t){let e=Zr(t,this.size,3);s.uniform3fv(this.addr,e)}function IS(s,t){let e=Zr(t,this.size,4);s.uniform4fv(this.addr,e)}function LS(s,t){let e=Zr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function DS(s,t){let e=Zr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function NS(s,t){let e=Zr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function US(s,t){s.uniform1iv(this.addr,t)}function OS(s,t){s.uniform2iv(this.addr,t)}function FS(s,t){s.uniform3iv(this.addr,t)}function BS(s,t){s.uniform4iv(this.addr,t)}function kS(s,t){s.uniform1uiv(this.addr,t)}function zS(s,t){s.uniform2uiv(this.addr,t)}function VS(s,t){s.uniform3uiv(this.addr,t)}function GS(s,t){s.uniform4uiv(this.addr,t)}function HS(s,t,e){let n=this.cache,i=t.length,r=$c(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Yc(l0):a=o0;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function WS(s,t,e){let n=this.cache,i=t.length,r=$c(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||u0,r[a])}function XS(s,t,e){let n=this.cache,i=t.length,r=$c(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=Yc(c0):a=d0;for(let o=0;o!==i;++o)e.setTextureCube(t[o]||a,r[o])}function qS(s,t,e){let n=this.cache,i=t.length,r=$c(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||h0,r[a])}function $S(s){switch(s){case 5126:return CS;case 35664:return RS;case 35665:return PS;case 35666:return IS;case 35674:return LS;case 35675:return DS;case 35676:return NS;case 5124:case 35670:return US;case 35667:case 35671:return OS;case 35668:case 35672:return FS;case 35669:case 35673:return BS;case 5125:return kS;case 36294:return zS;case 36295:return VS;case 36296:return GS;case 35678:case 36198:case 36298:case 36306:case 35682:return HS;case 35679:case 36299:case 36307:return WS;case 35680:case 36300:case 36308:case 36293:return XS;case 36289:case 36303:case 36311:case 36292:return qS}}var vd=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ES(e.type)}},yd=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$S(e.type)}},Md=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},_d=/(\w+)(\])?(\[|\.)?/g;function Xm(s,t){s.seq.push(t),s.map[t.id]=t}function YS(s,t,e){let n=s.name,i=n.length;for(_d.lastIndex=0;;){let r=_d.exec(n),a=_d.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Xm(e,c===void 0?new vd(o,s,t):new yd(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new Md(o),Xm(e,f)),e=f}}}var Yr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);YS(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function qm(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var ZS=37297,JS=0;function KS(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var $m=new Qt;function jS(s){ce._getMatrix($m,ce.workingColorSpace,s);let t=`mat3( ${$m.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(s)){case Ta:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return Kt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ym(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+KS(s.getShaderSource(t),o)}else return r}function QS(s,t){let e=jS(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var tb={[Vu]:"Linear",[Gu]:"Reinhard",[Hu]:"Cineon",[Wu]:"ACESFilmic",[qu]:"AgX",[ja]:"Neutral",[Xu]:"Custom"};function eb(s,t){let e=tb[t];return e===void 0?(Kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Wc=new H;function nb(){ce.getLuminanceCoefficients(Wc);let s=Wc.x.toFixed(4),t=Wc.y.toFixed(4),e=Wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ib(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(oo).join(`
`)}function sb(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function rb(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function oo(s){return s!==""}function Zm(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Jm(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ab=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sd(s){return s.replace(ab,ob)}function ob(s,t){let e=se[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Sd(e)}var lb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Km(s){return s.replace(lb,cb)}function cb(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function jm(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var hb={[qs]:"SHADOWMAP_TYPE_PCF",[Hr]:"SHADOWMAP_TYPE_VSM"};function ub(s){return hb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var db={[Xr]:"ENVMAP_MODE_REFRACTION"};function fb(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":db[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var pb={[zu]:"ENVMAP_BLENDING_MULTIPLY",[um]:"ENVMAP_BLENDING_MIX",[dm]:"ENVMAP_BLENDING_ADD"};function mb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":pb[s.combine]||"ENVMAP_BLENDING_NONE"}function gb(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=ub(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=fb(e),f=mb(e),d=ib(e),u=sb(r),m=i.createProgram(),_,p,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(oo).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(oo).join(`
`),p.length>0&&(p+=`
`)):(_=[jm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oo).join(`
`),p=[jm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==vi?"#define TONE_MAPPING":"",e.toneMapping!==vi?se.tonemapping_pars_fragment:"",e.toneMapping!==vi?eb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,QS("linearToOutputTexel",e.outputColorSpace),nb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(oo).join(`
`)),a=Sd(a),a=Zm(a,e),a=Jm(a,e),o=Sd(o),o=Zm(o,e),o=Jm(o,e),a=Km(a),o=Km(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",e.glslVersion===sd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=g+_+a,S=g+p+o,v=qm(i,i.VERTEX_SHADER,y),A=qm(i,i.FRAGMENT_SHADER,S);i.attachShader(m,v),i.attachShader(m,A),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function T(R){if(s.debug.checkShaderErrors){let L=i.getProgramInfoLog(m)||"",W=i.getShaderInfoLog(v)||"",O=i.getShaderInfoLog(A)||"",P=L.trim(),F=W.trim(),V=O.trim(),N=!0,Y=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(N=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,v,A);else{let X=Ym(i,v,"vertex"),j=Ym(i,A,"fragment");jt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+P+`
`+X+`
`+j)}else P!==""?Kt("WebGLProgram: Program Info Log:",P):(F===""||V==="")&&(Y=!1);Y&&(R.diagnostics={runnable:N,programLog:P,vertexShader:{log:F,prefix:_},fragmentShader:{log:V,prefix:p}})}i.deleteShader(v),i.deleteShader(A),x=new Yr(i,m),b=rb(i,m)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(m,ZS)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=JS++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=v,this.fragmentShader=A,this}var _b=0,bd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new wd(t),e.set(t,n)),n}},wd=class{constructor(t){this.id=_b++,this.code=t,this.usedTimes=0}};function xb(s){return s===_s||s===so||s===ro}function vb(s,t,e,n,i,r){let a=new Ra,o=new bd,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,b,C,R,L,W){let O=R.fog,P=L.geometry,F=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,N=t.get(x.envMap||F,V),Y=d[x.type],X=n.precision;x.precision!==null&&(X=n.getMaxPrecision(x.precision),X!==x.precision&&Kt("WebGLProgram.getParameters:",x.precision,"not supported, using",X,"instead."));let j=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,Z=j!==void 0?j.length:0,q=0;P.morphAttributes.position!==void 0&&(q=1),P.morphAttributes.normal!==void 0&&(q=2),P.morphAttributes.color!==void 0&&(q=3);let ut,k,Q,gt;if(Y){let Ut=Mi[Y];ut=Ut.vertexShader,k=Ut.fragmentShader}else{ut=x.vertexShader,k=x.fragmentShader;let Ut=o.getVertexShaderStage(x),ve=o.getFragmentShaderStage(x);o.update(x,Ut,ve),Q=Ut.id,gt=ve.id}let vt=s.getRenderTarget(),dt=s.state.buffers.depth.getReversed(),Lt=L.isInstancedMesh===!0,Zt=L.isBatchedMesh===!0,Ft=!!x.map,Xt=!!x.matcap,Jt=!!N,st=Jt&&N.isPMREMTexture===!0,G=!!x.aoMap,et=!!x.lightMap,ct=!!x.bumpMap&&x.wireframe===!1,B=!!x.normalMap,ht=!!x.displacementMap,mt=!!x.emissiveMap,Ct=!!x.metalnessMap,Nt=!!x.roughnessMap,qt=x.anisotropy>0,D=x.clearcoat>0,fe=x.diffuseRoughness>0,rt=x.dispersion>0,St=x.retroreflectivity>0,at=x.iridescence>0,Rt=x.sheen>0,xt=x.transmission>0,bt=qt&&!!x.anisotropyMap,E=D&&!!x.clearcoatMap,M=D&&!!x.clearcoatNormalMap,z=D&&!!x.clearcoatRoughnessMap,ft=fe&&!!x.diffuseRoughnessMap,ot=at&&!!x.iridescenceMap,yt=at&&!!x.iridescenceThicknessMap,Mt=Rt&&!!x.sheenColorMap,J=Rt&&!!x.sheenRoughnessMap,nt=!!x.specularMap,_t=!!x.specularColorMap,I=!!x.specularIntensityMap,lt=xt&&!!x.transmissionMap,it=xt&&!!x.thicknessMap,Tt=!!x.gradientMap,At=!!x.alphaMap,Et=x.alphaTest>0,Ht=!!x.alphaHash,ie=!!x.extensions,wt=vi;x.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(wt=s.toneMapping);let Yt=st?N.isCompressedCubeTexture?N.image[0].mipmaps:N.mipmaps:null,ne={shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:ut,fragmentShader:k,defines:x.defines,customVertexShaderID:Q,customFragmentShaderID:gt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:X,batching:Zt,batchingColor:Zt&&L._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&L.instanceColor!==null,instancingMorph:Lt&&L.morphTexture!==null,outputColorSpace:vt===null?s.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ft,matcap:Xt,envMap:Jt,envMapMode:Jt&&N.mapping,envMapPMREM:st,envMapMaxLod:st?Yt.length-1:null,envMapSize:st?Yt[0].width:null,aoMap:G,lightMap:et,bumpMap:ct,normalMap:B,displacementMap:ht,emissiveMap:mt,normalMapObjectSpace:B&&x.normalMapType===mm,normalMapTangentSpace:B&&x.normalMapType===Gc,packedNormalMap:B&&x.normalMapType===Gc&&xb(x.normalMap.format),metalnessMap:Ct,roughnessMap:Nt,anisotropy:qt,anisotropyMap:bt,clearcoat:D,clearcoatMap:E,clearcoatNormalMap:M,clearcoatRoughnessMap:z,diffuseRoughness:fe,diffuseRoughnessMap:ft,dispersion:rt,retroreflection:St,iridescence:at,iridescenceMap:ot,iridescenceThicknessMap:yt,sheen:Rt,sheenColorMap:Mt,sheenRoughnessMap:J,specularMap:nt,specularColorMap:_t,specularIntensityMap:I,transmission:xt,transmissionMap:lt,thicknessMap:it,gradientMap:Tt,opaque:x.transparent===!1&&x.blending===Wr&&x.alphaToCoverage===!1,alphaMap:At,alphaTest:Et,alphaHash:Ht,combine:x.combine,mapUv:Ft&&u(x.map.channel),aoMapUv:G&&u(x.aoMap.channel),lightMapUv:et&&u(x.lightMap.channel),bumpMapUv:ct&&u(x.bumpMap.channel),normalMapUv:B&&u(x.normalMap.channel),displacementMapUv:ht&&u(x.displacementMap.channel),emissiveMapUv:mt&&u(x.emissiveMap.channel),metalnessMapUv:Ct&&u(x.metalnessMap.channel),roughnessMapUv:Nt&&u(x.roughnessMap.channel),anisotropyMapUv:bt&&u(x.anisotropyMap.channel),clearcoatMapUv:E&&u(x.clearcoatMap.channel),clearcoatNormalMapUv:M&&u(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&u(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ft&&u(x.diffuseRoughnessMap.channel),iridescenceMapUv:ot&&u(x.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&u(x.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&u(x.sheenColorMap.channel),sheenRoughnessMapUv:J&&u(x.sheenRoughnessMap.channel),specularMapUv:nt&&u(x.specularMap.channel),specularColorMapUv:_t&&u(x.specularColorMap.channel),specularIntensityMapUv:I&&u(x.specularIntensityMap.channel),transmissionMapUv:lt&&u(x.transmissionMap.channel),thicknessMapUv:it&&u(x.thicknessMap.channel),alphaMapUv:At&&u(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(B||qt),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!P.attributes.uv&&(Ft||At),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&B===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:dt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:q,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:W.filter(Ut=>Ut.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:wt,decodeVideoTexture:Ft&&x.map.isVideoTexture===!0&&ce.getTransfer(x.map.colorSpace)===_e,decodeVideoTextureEmissive:mt&&x.emissiveMap.isVideoTexture===!0&&ce.getTransfer(x.emissiveMap.colorSpace)===_e,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===xi,flipSided:x.side===_n,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ie&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&x.extensions.multiDraw===!0||Zt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ne.vertexUv1s=l.has(1),ne.vertexUv2s=l.has(2),ne.vertexUv3s=l.has(3),l.clear(),ne}function _(x){let b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)b.push(C),b.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(p(b,x),g(b,x),b.push(s.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function p(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapPMREM),x.push(b.envMapMaxLod),x.push(b.envMapSize),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.diffuseRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.numSunLights),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numSunLightShadows),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.numLightProbeGrids),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function g(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function y(x){let b=d[x.type],C;if(b){let R=Mi[b];C=Dm.clone(R.uniforms)}else C=x.uniforms;return C}function S(x,b){let C=h.get(b);return C!==void 0?++C.usedTimes:(C=new gb(s,b,x,i),c.push(C),h.set(b,C)),C}function v(x){if(--x.usedTimes===0){let b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function T(){o.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:y,acquireProgram:S,releaseProgram:v,releaseShaderCache:A,programs:c,dispose:T}}function yb(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Mb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Qm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function t0(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(d){let u=0;return d.isInstancedMesh&&(u+=2),d.isSkinnedMesh&&(u+=1),u}function o(d,u,m,_,p,g){let y=s[t];return y===void 0?(y={id:d.id,object:d,geometry:u,material:m,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:g},s[t]=y):(y.id=d.id,y.object=d,y.geometry=u,y.material=m,y.materialVariant=a(d),y.groupOrder=_,y.renderOrder=d.renderOrder,y.z=p,y.group=g),t++,y}function l(d,u,m,_,p,g,y){y.reversedDepth===!0&&(p=-p);let S=o(d,u,m,_,p,g);m.transmission>0?n.push(S):m.transparent===!0?i.push(S):e.push(S)}function c(d,u,m,_,p,g){let y=o(d,u,m,_,p,g);m.transmission>0?n.unshift(y):m.transparent===!0?i.unshift(y):e.unshift(y)}function h(d,u){e.length>1&&e.sort(d||Mb),n.length>1&&n.sort(u||Qm),i.length>1&&i.sort(u||Qm)}function f(){for(let d=t,u=s.length;d<u;d++){let m=s[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:f,sort:h}}function Sb(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new t0,s.set(n,[a])):i>=r.length?(a=new t0,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function bb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new H,color:new ee};break;case"SpotLight":e={position:new H,direction:new H,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new H,halfWidth:new H,halfHeight:new H};break}return s[t.id]=e,e}}}function wb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Ab=0;function Tb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Eb(s){let t=new bb,e=wb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);let i=new H,r=new be,a=new be;function o(c){let h=0,f=0,d=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let u=0,m=0,_=0,p=0,g=0,y=0,S=0,v=0,A=0,T=0,x=0,b=0,C=0,R=0;c.sort(Tb);for(let W=0,O=c.length;W<O;W++){let P=c[W],F=P.color,V=P.intensity,N=P.distance,Y=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===_s?Y=P.shadow.map.texture:Y=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=F.r*V,f+=F.g*V,d+=F.b*V;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],V);R++}else if(P.isSunLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let j=P.shadow,Z=e.get(P);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[m]=Z,n.sunShadowMap[m]=Y;let q=j.getViewportCount();for(let ut=0;ut<q;ut++)n.sunShadowMatrix[_+ut]=j.getMatrix(ut),n.sunShadowCascade[_+ut]=j._cascadeData[ut];_+=q,m++}n.sun[u]=X,u++}else if(P.isDirectionalLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let j=P.shadow,Z=e.get(P);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,n.directionalShadow[p]=Z,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=P.shadow.matrix,A++}n.directional[p]=X,p++}else if(P.isSpotLight){let X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(F).multiplyScalar(V),X.distance=N,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[y]=X;let j=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,j.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[y]=j.matrix,P.castShadow){let Z=e.get(P);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,n.spotShadow[y]=Z,n.spotShadowMap[y]=Y,x++}y++}else if(P.isRectAreaLight){let X=t.get(P);X.color.copy(F).multiplyScalar(V),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[S]=X,S++}else if(P.isPointLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let j=P.shadow,Z=e.get(P);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,Z.shadowCameraNear=j.camera.near,Z.shadowCameraFar=j.camera.far,n.pointShadow[g]=Z,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=P.shadow.matrix,T++}n.point[g]=X,g++}else if(P.isHemisphereLight){let X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(V),X.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[v]=X,v++}}S>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;let L=n.hash;(L.sunLength!==u||L.directionalLength!==p||L.pointLength!==g||L.spotLength!==y||L.rectAreaLength!==S||L.hemiLength!==v||L.numSunShadows!==m||L.numDirectionalShadows!==A||L.numPointShadows!==T||L.numSpotShadows!==x||L.numSpotMaps!==b||L.numLightProbes!==R)&&(n.sun.length=u,n.directional.length=p,n.spot.length=y,n.rectArea.length=S,n.point.length=g,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+b-C,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,L.sunLength=u,L.directionalLength=p,L.pointLength=g,L.spotLength=y,L.rectAreaLength=S,L.hemiLength=v,L.numSunShadows=m,L.numDirectionalShadows=A,L.numPointShadows=T,L.numSpotShadows=x,L.numSpotMaps=b,L.numLightProbes=R,n.version=Ab++)}function l(c,h){let f=0,d=0,u=0,m=0,_=0,p=0,g=h.matrixWorldInverse;for(let y=0,S=c.length;y<S;y++){let v=c[y];if(v.isSunLight){let A=n.sun[f];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(g),f++}else if(v.isDirectionalLight){let A=n.directional[d];A.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),d++}else if(v.isSpotLight){let A=n.spot[m];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),A.halfWidth.set(v.width*.5,0,0),A.halfHeight.set(0,v.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){let A=n.point[u];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(g),u++}else if(v.isHemisphereLight){let A=n.hemi[p];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function e0(s){let t=new Eb(s),e=[],n=[],i=[];function r(f){h.camera=f,e.length=0,n.length=0,i.length=0}function a(f){f.isLightProbeGrid?i.push(f):e.push(f)}function o(f){n.push(f)}function l(){t.setup(e),i.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function c(f){t.setupView(e,f)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Cb(s){let t=new WeakMap;function e(i,r=0){let a=t.get(i),o;return a===void 0?(o=new e0(s),t.set(i,[o])):r>=a.length?(o=new e0(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Rb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pb=`uniform sampler2D shadow_pass;
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
}`,Ib=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Lb=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],n0=new be,ao=new H,xd=new H;function Db(s,t,e){let n=new ds,i=new Dt,r=new Dt,a=new Re,o=new Gl,l=new Hl,c={},h=e.maxTextureSize,f={[gs]:_n,[_n]:gs,[xi]:xi},d=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:Rb,fragmentShader:Pb}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new wn;m.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Dn(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qs;let g=this.type;this.render=function(T,x,b){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===qp&&(Kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=qs);let C=s.getRenderTarget(),R=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),W=s.state;W.setBlending($s),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let O=g!==this.type;O&&x.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(F=>F.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,F=T.length;P<F;P++){let V=T[P],N=V.shadow;if(N===void 0){Kt("WebGLShadowMap:",V,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;i.copy(N.mapSize);let Y=N.getFrameExtents();i.multiply(Y),r.copy(N.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,N.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,N.mapSize.y=r.y));let X=s.state.buffers.depth.getReversed();if(N.camera._reversedDepth=X,N.map===null||O===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===Hr){if(V.isPointLight){Kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new Ln(i.x,i.y,{format:_s,type:ti,minFilter:gn,magFilter:gn,generateMipmaps:!1}),N.map.texture.name=V.name+".shadowMap",N.map.depthTexture=new Vi(i.x,i.y,Qn),N.map.depthTexture.name=V.name+".shadowMapDepth",N.map.depthTexture.format=ki,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ye,N.map.depthTexture.magFilter=Ye}else V.isPointLight?(N.map=new lo(i.x),N.map.depthTexture=new Ua(i.x,jn)):(N.map=new Ln(i.x,i.y),N.map.depthTexture=new Vi(i.x,i.y,jn)),N.map.depthTexture.name=V.name+".shadowMap",N.map.depthTexture.format=ki,this.type===qs?(N.map.depthTexture.compareFunction=X?nd:ed,N.map.depthTexture.minFilter=gn,N.map.depthTexture.magFilter=gn):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ye,N.map.depthTexture.magFilter=Ye);N.camera.updateProjectionMatrix()}N.map.isWebGLCubeRenderTarget!==!0&&(N.map.width!==i.x||N.map.height!==i.y)&&N.map.setSize(i.x,i.y);let j=N.map.isWebGLCubeRenderTarget?6:N.getViewportCount();V.isPointLight!==!0&&N.updateMatrices(V,b);let Z=(N.camera.layers.mask&4294967294)!==0?N.camera.layers:b.layers;for(let q=0;q<j;q++){let ut=N.getCamera(q);if(V.isPointLight){let k=N.camera,Q=N.matrix,gt=V.distance||k.far;gt!==k.far&&(k.far=gt,k.updateProjectionMatrix()),ao.setFromMatrixPosition(V.matrixWorld),k.position.copy(ao),xd.copy(k.position),xd.add(Ib[q]),k.up.copy(Lb[q]),k.lookAt(xd),k.updateMatrixWorld(),Q.makeTranslation(-ao.x,-ao.y,-ao.z),n0.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),N._frustum.setFromProjectionMatrix(n0,k.coordinateSystem,k.reversedDepth)}if(N.map.isWebGLCubeRenderTarget)s.setRenderTarget(N.map,q),s.clear();else{q===0&&(s.setRenderTarget(N.map),s.clear());let k=N.getViewport(q);a.set(r.x*k.x,r.y*k.y,r.x*k.z,r.y*k.w),W.viewport(a)}n=N.getFrustum(q),v(x,b,ut,V,Z,this.type)}N.isPointLightShadow!==!0&&this.type===Hr&&y(N,b),N.needsUpdate=!1}g=this.type,p.needsUpdate=!1,s.setRenderTarget(C,R,L)};function y(T,x){let b=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,u.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),T.mapPass===null?T.mapPass=new Ln(i.x,i.y,{format:_s,type:ti}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(x,null,b,d,_,null),u.uniforms.shadow_pass.value=T.mapPass.texture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(x,null,b,u,_,null)}function S(T,x,b,C){let R=null,L=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)R=L;else if(R=b.isPointLight===!0?l:o,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let W=R.uuid,O=x.uuid,P=c[W];P===void 0&&(P={},c[W]=P);let F=P[O];F===void 0&&(F=R.clone(),P[O]=F,x.addEventListener("dispose",A)),R=F}if(R.visible=x.visible,R.wireframe=x.wireframe,C===Hr?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:f[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let W=s.properties.get(R);W.light=b}return R}function v(T,x,b,C,R,L){if(T.visible===!1)return;if(T.layers.test(R)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===Hr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);let P=t.update(T),F=T.material;if(Array.isArray(F)){let V=P.groups;for(let N=0,Y=V.length;N<Y;N++){let X=V[N],j=F[X.materialIndex];if(j&&j.visible){let Z=S(T,j,C,L);T.onBeforeShadow(s,T,x,b,P,Z,X),s.renderBufferDirect(b,null,P,Z,T,X),T.onAfterShadow(s,T,x,b,P,Z,X)}}}else if(F.visible){let V=S(T,F,C,L);T.onBeforeShadow(s,T,x,b,P,V,null),s.renderBufferDirect(b,null,P,V,T,null),T.onAfterShadow(s,T,x,b,P,V,null)}}let O=T.children;for(let P=0,F=O.length;P<F;P++)v(O[P],x,b,C,R,L)}function A(T){T.target.removeEventListener("dispose",A);for(let b in c){let C=c[b],R=T.target.uuid;R in C&&(C[R].dispose(),delete C[R])}}}function Nb(s,t){function e(){let I=!1,lt=new Re,it=null,Tt=new Re(0,0,0,0);return{setMask:function(At){it!==At&&!I&&(s.colorMask(At,At,At,At),it=At)},setLocked:function(At){I=At},setClear:function(At,Et,Ht,ie,wt){wt===!0&&(At*=ie,Et*=ie,Ht*=ie),lt.set(At,Et,Ht,ie),Tt.equals(lt)===!1&&(s.clearColor(At,Et,Ht,ie),Tt.copy(lt))},reset:function(){I=!1,it=null,Tt.set(-1,0,0,0)}}}function n(){let I=!1,lt=!1,it=null,Tt=null,At=null;return{setReversed:function(Et){if(lt!==Et){let Ht=t.get("EXT_clip_control");Et?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),lt=Et;let ie=At;At=null,this.setClear(ie)}},getReversed:function(){return lt},setTest:function(Et){Et?dt(s.DEPTH_TEST):Lt(s.DEPTH_TEST)},setMask:function(Et){it!==Et&&!I&&(s.depthMask(Et),it=Et)},setFunc:function(Et){if(lt&&(Et=Tm[Et]),Tt!==Et){switch(Et){case pl:s.depthFunc(s.NEVER);break;case ml:s.depthFunc(s.ALWAYS);break;case gl:s.depthFunc(s.LESS);break;case Cr:s.depthFunc(s.LEQUAL);break;case _l:s.depthFunc(s.EQUAL);break;case xl:s.depthFunc(s.GEQUAL);break;case vl:s.depthFunc(s.GREATER);break;case yl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Tt=Et}},setLocked:function(Et){I=Et},setClear:function(Et){At!==Et&&(At=Et,lt&&(Et=1-Et),s.clearDepth(Et))},reset:function(){I=!1,it=null,Tt=null,At=null,lt=!1}}}function i(){let I=!1,lt=null,it=null,Tt=null,At=null,Et=null,Ht=null,ie=null,wt=null;return{setTest:function(Yt){I||(Yt?dt(s.STENCIL_TEST):Lt(s.STENCIL_TEST))},setMask:function(Yt){lt!==Yt&&!I&&(s.stencilMask(Yt),lt=Yt)},setFunc:function(Yt,ne,Ut){(it!==Yt||Tt!==ne||At!==Ut)&&(s.stencilFunc(Yt,ne,Ut),it=Yt,Tt=ne,At=Ut)},setOp:function(Yt,ne,Ut){(Et!==Yt||Ht!==ne||ie!==Ut)&&(s.stencilOp(Yt,ne,Ut),Et=Yt,Ht=ne,ie=Ut)},setLocked:function(Yt){I=Yt},setClear:function(Yt){wt!==Yt&&(s.clearStencil(Yt),wt=Yt)},reset:function(){I=!1,lt=null,it=null,Tt=null,At=null,Et=null,Ht=null,ie=null,wt=null}}}let r=new e,a=new n,o=new i,l={},c=new WeakMap,h={},f={},d={},u=new WeakMap,m=[],_=null,p=!1,g=null,y=null,S=null,v=null,A=null,T=null,x=null,b=new ee(0,0,0),C=0,R=!1,L=null,W=null,O=null,P=null,F=null,V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,Y=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(X)[1]),N=Y>=1):X.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),N=Y>=2);let j=null,Z={},q=s.getParameter(s.SCISSOR_BOX),ut=s.getParameter(s.VIEWPORT),k=new Re().fromArray(q),Q=new Re().fromArray(ut);function gt(I,lt,it,Tt){let At=new Uint8Array(4),Et=s.createTexture();s.bindTexture(I,Et),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<it;Ht++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(lt,0,s.RGBA,1,1,Tt,0,s.RGBA,s.UNSIGNED_BYTE,At):s.texImage2D(lt+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,At);return Et}let vt={};vt[s.TEXTURE_2D]=gt(s.TEXTURE_2D,s.TEXTURE_2D,1),vt[s.TEXTURE_CUBE_MAP]=gt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[s.TEXTURE_2D_ARRAY]=gt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),vt[s.TEXTURE_3D]=gt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),dt(s.DEPTH_TEST),a.setFunc(Cr),ct(!1),B(Uu),dt(s.CULL_FACE),G($s);function dt(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function Lt(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function Zt(I,lt){return d[I]!==lt?(s.bindFramebuffer(I,lt),d[I]=lt,I===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=lt),I===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=lt),!0):!1}function Ft(I,lt){let it=m,Tt=!1;if(I){it=u.get(lt),it===void 0&&(it=[],u.set(lt,it));let At=I.textures;if(it.length!==At.length||it[0]!==s.COLOR_ATTACHMENT0){for(let Et=0,Ht=At.length;Et<Ht;Et++)it[Et]=s.COLOR_ATTACHMENT0+Et;it.length=At.length,Tt=!0}}else it[0]!==s.BACK&&(it[0]=s.BACK,Tt=!0);Tt&&s.drawBuffers(it)}function Xt(I){return _!==I?(s.useProgram(I),_=I,!0):!1}let Jt={[Ys]:s.FUNC_ADD,[Yp]:s.FUNC_SUBTRACT,[Zp]:s.FUNC_REVERSE_SUBTRACT};Jt[Jp]=s.MIN,Jt[Kp]=s.MAX;let st={[jp]:s.ZERO,[Qp]:s.ONE,[tm]:s.SRC_COLOR,[Bu]:s.SRC_ALPHA,[am]:s.SRC_ALPHA_SATURATE,[sm]:s.DST_COLOR,[nm]:s.DST_ALPHA,[em]:s.ONE_MINUS_SRC_COLOR,[ku]:s.ONE_MINUS_SRC_ALPHA,[rm]:s.ONE_MINUS_DST_COLOR,[im]:s.ONE_MINUS_DST_ALPHA,[om]:s.CONSTANT_COLOR,[lm]:s.ONE_MINUS_CONSTANT_COLOR,[cm]:s.CONSTANT_ALPHA,[hm]:s.ONE_MINUS_CONSTANT_ALPHA};function G(I,lt,it,Tt,At,Et,Ht,ie,wt,Yt){if(I===$s){p===!0&&(Lt(s.BLEND),p=!1);return}if(p===!1&&(dt(s.BLEND),p=!0),I!==$p){if(I!==g||Yt!==R){if((y!==Ys||A!==Ys)&&(s.blendEquation(s.FUNC_ADD),y=Ys,A=Ys),Yt)switch(I){case Wr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ka:s.blendFunc(s.ONE,s.ONE);break;case Ou:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Fu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:jt("WebGLState: Invalid blending: ",I);break}else switch(I){case Wr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ka:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ou:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fu:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",I);break}S=null,v=null,T=null,x=null,b.set(0,0,0),C=0,g=I,R=Yt}return}At=At||lt,Et=Et||it,Ht=Ht||Tt,(lt!==y||At!==A)&&(s.blendEquationSeparate(Jt[lt],Jt[At]),y=lt,A=At),(it!==S||Tt!==v||Et!==T||Ht!==x)&&(s.blendFuncSeparate(st[it],st[Tt],st[Et],st[Ht]),S=it,v=Tt,T=Et,x=Ht),(ie.equals(b)===!1||wt!==C)&&(s.blendColor(ie.r,ie.g,ie.b,wt),b.copy(ie),C=wt),g=I,R=!1}function et(I,lt){I.side===xi?Lt(s.CULL_FACE):dt(s.CULL_FACE);let it=I.side===_n;lt&&(it=!it),ct(it),I.blending===Wr&&I.transparent===!1?G($s):G(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let Tt=I.stencilWrite;o.setTest(Tt),Tt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),mt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?dt(s.SAMPLE_ALPHA_TO_COVERAGE):Lt(s.SAMPLE_ALPHA_TO_COVERAGE)}function ct(I){L!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),L=I)}function B(I){I!==Wp?(dt(s.CULL_FACE),I!==W&&(I===Uu?s.cullFace(s.BACK):I===Xp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Lt(s.CULL_FACE),W=I}function ht(I){I!==O&&(N&&s.lineWidth(I),O=I)}function mt(I,lt,it){I?(dt(s.POLYGON_OFFSET_FILL),(P!==lt||F!==it)&&(P=lt,F=it,a.getReversed()&&(lt=-lt,it=-it),s.polygonOffset(lt,it))):Lt(s.POLYGON_OFFSET_FILL)}function Ct(I){I?dt(s.SCISSOR_TEST):Lt(s.SCISSOR_TEST)}function Nt(I){I===void 0&&(I=s.TEXTURE0+V-1),j!==I&&(s.activeTexture(I),j=I)}function qt(I,lt,it){it===void 0&&(j===null?it=s.TEXTURE0+V-1:it=j);let Tt=Z[it];Tt===void 0&&(Tt={type:void 0,texture:void 0},Z[it]=Tt),(Tt.type!==I||Tt.texture!==lt)&&(j!==it&&(s.activeTexture(it),j=it),s.bindTexture(I,lt||vt[I]),Tt.type=I,Tt.texture=lt)}function D(){let I=Z[j];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function fe(){try{s.compressedTexImage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function rt(){try{s.compressedTexImage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function St(){try{s.texSubImage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function at(){try{s.texSubImage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function Rt(){try{s.compressedTexSubImage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function xt(){try{s.compressedTexSubImage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function bt(){try{s.texStorage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function E(){try{s.texStorage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function M(){try{s.texImage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function z(){try{s.texImage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function ft(I){return f[I]!==void 0?f[I]:s.getParameter(I)}function ot(I,lt){f[I]!==lt&&(s.pixelStorei(I,lt),f[I]=lt)}function yt(I){k.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),k.copy(I))}function Mt(I){Q.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),Q.copy(I))}function J(I,lt){let it=c.get(lt);it===void 0&&(it=new WeakMap,c.set(lt,it));let Tt=it.get(I);Tt===void 0&&(Tt=s.getUniformBlockIndex(lt,I.name),s.uniformBlockBinding(lt,Tt,Tt),it.set(I,Tt))}function nt(I,lt,it){let At=c.get(lt).get(I);l[At]!==it&&(s.bindBufferBase(s.UNIFORM_BUFFER,At,it),l[At]=it)}function _t(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},j=null,Z={},d={},l={},u=new WeakMap,m=[],_=null,p=!1,g=null,y=null,S=null,v=null,A=null,T=null,x=null,b=new ee(0,0,0),C=0,R=!1,L=null,W=null,O=null,P=null,F=null,k.set(0,0,s.canvas.width,s.canvas.height),Q.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:dt,disable:Lt,bindFramebuffer:Zt,drawBuffers:Ft,useProgram:Xt,setBlending:G,setMaterial:et,setFlipSided:ct,setCullFace:B,setLineWidth:ht,setPolygonOffset:mt,setScissorTest:Ct,activeTexture:Nt,bindTexture:qt,unbindTexture:D,compressedTexImage2D:fe,compressedTexImage3D:rt,texImage2D:M,texImage3D:z,pixelStorei:ot,getParameter:ft,updateUBOMapping:J,uniformBlockBinding:nt,texStorage2D:bt,texStorage3D:E,texSubImage2D:St,texSubImage3D:at,compressedTexSubImage2D:Rt,compressedTexSubImage3D:xt,scissor:yt,viewport:Mt,reset:_t}}function Ub(s,t,e,n,i,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Dt,h=new WeakMap,f=new Set,d,u=new WeakMap,m=new Set,_=new FinalizationRegistry(E=>m.delete(E)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,M){return p?new OffscreenCanvas(E,M):Ea("canvas")}function y(E,M,z){let ft=1,ot=bt(E);if((ot.width>z||ot.height>z)&&(ft=z/Math.max(ot.width,ot.height)),ft<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let yt=Math.floor(ft*ot.width),Mt=Math.floor(ft*ot.height);d===void 0&&(d=g(yt,Mt));let J=M?g(yt,Mt):d;return J.width=yt,J.height=Mt,J.getContext("2d").drawImage(E,0,0,yt,Mt),Kt("WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+yt+"x"+Mt+")."),J}else return"data"in E&&Kt("WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),E;return E}function S(E){return E.generateMipmaps}function v(E){s.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(E,M,z,ft,ot,yt=!1){if(E!==null){if(s[E]!==void 0)return s[E];Kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Mt;ft&&(Mt=t.get("EXT_texture_norm16"),Mt||Kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=M;if(M===s.RED&&(z===s.FLOAT&&(J=s.R32F),z===s.HALF_FLOAT&&(J=s.R16F),z===s.UNSIGNED_BYTE&&(J=s.R8),z===s.UNSIGNED_SHORT&&Mt&&(J=Mt.R16_EXT),z===s.SHORT&&Mt&&(J=Mt.R16_SNORM_EXT)),M===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.R8UI),z===s.UNSIGNED_SHORT&&(J=s.R16UI),z===s.UNSIGNED_INT&&(J=s.R32UI),z===s.BYTE&&(J=s.R8I),z===s.SHORT&&(J=s.R16I),z===s.INT&&(J=s.R32I)),M===s.RG&&(z===s.FLOAT&&(J=s.RG32F),z===s.HALF_FLOAT&&(J=s.RG16F),z===s.UNSIGNED_BYTE&&(J=s.RG8),z===s.UNSIGNED_SHORT&&Mt&&(J=Mt.RG16_EXT),z===s.SHORT&&Mt&&(J=Mt.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RG8UI),z===s.UNSIGNED_SHORT&&(J=s.RG16UI),z===s.UNSIGNED_INT&&(J=s.RG32UI),z===s.BYTE&&(J=s.RG8I),z===s.SHORT&&(J=s.RG16I),z===s.INT&&(J=s.RG32I)),M===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RGB8UI),z===s.UNSIGNED_SHORT&&(J=s.RGB16UI),z===s.UNSIGNED_INT&&(J=s.RGB32UI),z===s.BYTE&&(J=s.RGB8I),z===s.SHORT&&(J=s.RGB16I),z===s.INT&&(J=s.RGB32I)),M===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),z===s.UNSIGNED_INT&&(J=s.RGBA32UI),z===s.BYTE&&(J=s.RGBA8I),z===s.SHORT&&(J=s.RGBA16I),z===s.INT&&(J=s.RGBA32I)),M===s.RGB&&(z===s.UNSIGNED_SHORT&&Mt&&(J=Mt.RGB16_EXT),z===s.SHORT&&Mt&&(J=Mt.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(J=s.R11F_G11F_B10F)),M===s.RGBA){let nt=yt?Ta:ce.getTransfer(ot);z===s.FLOAT&&(J=s.RGBA32F),z===s.HALF_FLOAT&&(J=s.RGBA16F),z===s.UNSIGNED_BYTE&&(J=nt===_e?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&Mt&&(J=Mt.RGBA16_EXT),z===s.SHORT&&Mt&&(J=Mt.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(E,M){let z;return E?M===null||M===jn||M===Js?z=s.DEPTH24_STENCIL8:M===Qn?z=s.DEPTH32F_STENCIL8:M===qr&&(z=s.DEPTH24_STENCIL8,Kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===jn||M===Js?z=s.DEPTH_COMPONENT24:M===Qn?z=s.DEPTH_COMPONENT32F:M===qr&&(z=s.DEPTH_COMPONENT16),z}function b(E,M){return S(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ye&&E.minFilter!==gn?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function C(E){let M=new WeakRef(E);n.get(E).__ref=M,m.add(M),_.register(E,M,M)}function R(E){let M=n.get(E).__ref;M!==void 0&&(m.delete(M),_.unregister(M))}function L(E){O(E.target)}function W(E){P(E.target)}function O(E){E.removeEventListener("dispose",L),R(E),V(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&f.delete(E)}function P(E){E.removeEventListener("dispose",W),R(E),Y(E)}function F(){for(let E of m){let M=E.deref();M!==void 0&&(M.isRenderTarget===!0?P(M):O(M))}m.clear(),f.clear()}function V(E){let M=n.get(E);if(M.__webglInit===void 0)return;let z=E.source,ft=u.get(z);if(ft){let ot=ft[M.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&N(E),Object.keys(ft).length===0&&u.delete(z)}n.remove(E)}function N(E){let M=n.get(E);s.deleteTexture(M.__webglTexture);let z=E.source,ft=u.get(z);delete ft[M.__cacheKey],a.memory.textures--}function Y(E){let M=n.get(E);M.__depthDisposeCallback&&M.__depthDisposeCallback();let z=E.depthTexture;if(z&&z.renderTarget===E&&O(z),E.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(M.__webglFramebuffer[ot]))for(let yt=0;yt<M.__webglFramebuffer[ot].length;yt++)s.deleteFramebuffer(M.__webglFramebuffer[ot][yt]);else s.deleteFramebuffer(M.__webglFramebuffer[ot]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[ot])}else{if(Array.isArray(M.__webglFramebuffer))for(let ot=0;ot<M.__webglFramebuffer.length;ot++)s.deleteFramebuffer(M.__webglFramebuffer[ot]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ot=0;ot<M.__webglColorRenderbuffer.length;ot++)M.__webglColorRenderbuffer[ot]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[ot]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let ft=E.textures;for(let ot=0,yt=ft.length;ot<yt;ot++){let Mt=n.get(ft[ot]);Mt.__webglTexture&&(s.deleteTexture(Mt.__webglTexture),a.memory.textures--),n.remove(ft[ot])}n.remove(E)}let X=0;function j(){X=0}function Z(){return X}function q(E){X=E}function ut(){let E=X;return E>=i.maxTextures&&Kt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+i.maxTextures),X+=1,E}function k(E){let M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.mipmapsAutoUpdate),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function Q(E,M){let z=n.get(E);if(E.isVideoTexture&&Rt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&z.__version!==E.version){let ft=E.image;if(ft===null)Kt("WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)Kt("WebGLRenderer: Texture marked for update but image is incomplete");else{et(z,E,M);return}}else E.isExternalTexture&&(z.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+M)}function gt(E,M){let z=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){et(z,E,M);return}else E.isExternalTexture&&(z.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+M)}function vt(E,M){let z=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){et(z,E,M);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+M)}function dt(E,M){let z=n.get(E);if(E.version>0&&z.__version!==E.version){ct(z,E,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+M)}let Lt={[Ml]:s.REPEAT,[pi]:s.CLAMP_TO_EDGE,[Sl]:s.MIRRORED_REPEAT},Zt={[Ye]:s.NEAREST,[fm]:s.NEAREST_MIPMAP_NEAREST,[Qa]:s.NEAREST_MIPMAP_LINEAR,[gn]:s.LINEAR,[rc]:s.LINEAR_MIPMAP_NEAREST,[Gi]:s.LINEAR_MIPMAP_LINEAR},Ft={[_m]:s.NEVER,[id]:s.ALWAYS,[xm]:s.LESS,[ed]:s.LEQUAL,[vm]:s.EQUAL,[nd]:s.GEQUAL,[ym]:s.GREATER,[Mm]:s.NOTEQUAL};function Xt(E,M){if(M.type===Qn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===gn||M.magFilter===rc||M.magFilter===Qa||M.magFilter===Gi||M.minFilter===gn||M.minFilter===rc||M.minFilter===Qa||M.minFilter===Gi)&&Kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,Lt[M.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,Lt[M.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,Lt[M.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,Zt[M.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,Zt[M.minFilter]),M.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,Ft[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ye||M.minFilter!==Qa&&M.minFilter!==Gi||M.type===Qn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Jt(E,M){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",L),C(M));let ft=M.source,ot=u.get(ft);ot===void 0&&(ot={},u.set(ft,ot));let yt=k(M);if(yt!==E.__cacheKey){ot[yt]===void 0&&(ot[yt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ot[yt].usedTimes++;let Mt=ot[E.__cacheKey];Mt!==void 0&&(ot[E.__cacheKey].usedTimes--,Mt.usedTimes===0&&N(M)),E.__cacheKey=yt,E.__webglTexture=ot[yt].texture}return z}function st(E,M,z){return Math.floor(Math.floor(E/z)/M)}function G(E,M,z,ft){let yt=E.updateRanges;if(yt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,z,ft,M.data);else{yt.sort((I,lt)=>I.start-lt.start);let Mt=0;for(let I=1;I<yt.length;I++){let lt=yt[Mt],it=yt[I],Tt=lt.start+lt.count,At=st(it.start,M.width,4),Et=st(lt.start,M.width,4);it.start<=Tt+1&&At===Et&&st(it.start+it.count-1,M.width,4)===At?lt.count=Math.max(lt.count,it.start+it.count-lt.start):(++Mt,yt[Mt]=it)}yt.length=Mt+1;let J=e.getParameter(s.UNPACK_ROW_LENGTH),nt=e.getParameter(s.UNPACK_SKIP_PIXELS),_t=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let I=0,lt=yt.length;I<lt;I++){let it=yt[I],Tt=Math.floor(it.start/4),At=Math.ceil(it.count/4),Et=Tt%M.width,Ht=Math.floor(Tt/M.width),ie=At,wt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Et),e.pixelStorei(s.UNPACK_SKIP_ROWS,Ht),e.texSubImage2D(s.TEXTURE_2D,0,Et,Ht,ie,wt,z,ft,M.data)}E.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,J),e.pixelStorei(s.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(s.UNPACK_SKIP_ROWS,_t)}}function et(E,M,z){let ft=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ft=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ft=s.TEXTURE_3D);let ot=Jt(E,M),yt=M.source;e.bindTexture(ft,E.__webglTexture,s.TEXTURE0+z);let Mt=n.get(yt);if(yt.version!==Mt.__version||ot===!0){if(e.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let wt=ce.getPrimaries(ce.workingColorSpace),Yt=M.colorSpace===Wi?null:ce.getPrimaries(M.colorSpace),ne=M.colorSpace===Wi||wt===Yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne)}e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let nt=y(M.image,!1,i.maxTextureSize);nt=xt(M,nt);let _t=r.convert(M.format,M.colorSpace),I=r.convert(M.type),lt=T(M.internalFormat,_t,I,M.normalized,M.colorSpace,M.isVideoTexture);Xt(ft,M);let it,Tt=M.mipmaps,At=M.isVideoTexture!==!0,Et=Mt.__version===void 0||ot===!0,Ht=yt.dataReady,ie=b(M,nt);if(M.isDepthTexture)lt=x(M.format===Hi,M.type),Et&&(At?e.texStorage2D(s.TEXTURE_2D,1,lt,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,lt,nt.width,nt.height,0,_t,I,null));else if(M.isDataTexture)if(Tt.length>0){At&&Et&&e.texStorage2D(s.TEXTURE_2D,ie,lt,Tt[0].width,Tt[0].height);for(let wt=0,Yt=Tt.length;wt<Yt;wt++)it=Tt[wt],At?Ht&&e.texSubImage2D(s.TEXTURE_2D,wt,0,0,it.width,it.height,_t,I,it.data):e.texImage2D(s.TEXTURE_2D,wt,lt,it.width,it.height,0,_t,I,it.data);M.generateMipmaps=!1}else At?(Et&&e.texStorage2D(s.TEXTURE_2D,ie,lt,nt.width,nt.height),Ht&&G(M,nt,_t,I)):e.texImage2D(s.TEXTURE_2D,0,lt,nt.width,nt.height,0,_t,I,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){At&&Et&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ie,lt,Tt[0].width,Tt[0].height,nt.depth);for(let wt=0,Yt=Tt.length;wt<Yt;wt++)if(it=Tt[wt],M.format!==ei)if(_t!==null)if(At){if(Ht)if(M.layerUpdates.size>0){let ne=ud(it.width,it.height,M.format,M.type);for(let Ut of M.layerUpdates){let ve=it.data.subarray(Ut*ne/it.data.BYTES_PER_ELEMENT,(Ut+1)*ne/it.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,wt,0,0,Ut,it.width,it.height,1,_t,ve)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,wt,0,0,0,it.width,it.height,nt.depth,_t,it.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,wt,lt,it.width,it.height,nt.depth,0,it.data,0,0);else Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else At?Ht&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,wt,0,0,0,it.width,it.height,nt.depth,_t,I,it.data):e.texImage3D(s.TEXTURE_2D_ARRAY,wt,lt,it.width,it.height,nt.depth,0,_t,I,it.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{At&&Et&&e.texStorage2D(s.TEXTURE_2D,ie,lt,Tt[0].width,Tt[0].height);for(let wt=0,Yt=Tt.length;wt<Yt;wt++)it=Tt[wt],M.format!==ei?_t!==null?At?Ht&&e.compressedTexSubImage2D(s.TEXTURE_2D,wt,0,0,it.width,it.height,_t,it.data):e.compressedTexImage2D(s.TEXTURE_2D,wt,lt,it.width,it.height,0,it.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):At?Ht&&e.texSubImage2D(s.TEXTURE_2D,wt,0,0,it.width,it.height,_t,I,it.data):e.texImage2D(s.TEXTURE_2D,wt,lt,it.width,it.height,0,_t,I,it.data)}else if(M.isDataArrayTexture)if(At){if(Et&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ie,lt,nt.width,nt.height,nt.depth),Ht)if(M.layerUpdates.size>0){let wt=ud(nt.width,nt.height,M.format,M.type);for(let Yt of M.layerUpdates){let ne=nt.data.subarray(Yt*wt/nt.data.BYTES_PER_ELEMENT,(Yt+1)*wt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Yt,nt.width,nt.height,1,_t,I,ne)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,_t,I,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,lt,nt.width,nt.height,nt.depth,0,_t,I,nt.data);else if(M.isData3DTexture)At?(Et&&e.texStorage3D(s.TEXTURE_3D,ie,lt,nt.width,nt.height,nt.depth),Ht&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,_t,I,nt.data)):e.texImage3D(s.TEXTURE_3D,0,lt,nt.width,nt.height,nt.depth,0,_t,I,nt.data);else if(M.isFramebufferTexture){if(Et)if(At)e.texStorage2D(s.TEXTURE_2D,ie,lt,nt.width,nt.height);else{let wt=nt.width,Yt=nt.height;for(let ne=0;ne<ie;ne++)e.texImage2D(s.TEXTURE_2D,ne,lt,wt,Yt,0,_t,I,null),wt>>=1,Yt>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let wt=s.canvas;if(wt.hasAttribute("layoutsubtree")||wt.setAttribute("layoutsubtree","true"),nt.parentNode!==wt){wt.appendChild(nt),f.add(M),wt.onpaint=Yt=>{let ne=Yt.changedElements;for(let Ut of f)ne.includes(Ut.image)&&(Ut.needsUpdate=!0)},wt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,nt);else{let ne=s.RGBA,Ut=s.RGBA,ve=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ne,Ut,ve,nt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(At&&Et){let wt=bt(Tt[0]);e.texStorage2D(s.TEXTURE_2D,ie,lt,wt.width,wt.height)}for(let wt=0,Yt=Tt.length;wt<Yt;wt++)it=Tt[wt],At?Ht&&e.texSubImage2D(s.TEXTURE_2D,wt,0,0,_t,I,it):e.texImage2D(s.TEXTURE_2D,wt,lt,_t,I,it);M.generateMipmaps=!1}else if(At){if(Et){let wt=bt(nt);e.texStorage2D(s.TEXTURE_2D,ie,lt,wt.width,wt.height)}Ht&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t,I,nt)}else e.texImage2D(s.TEXTURE_2D,0,lt,_t,I,nt);S(M)&&M.mipmapsAutoUpdate===!0&&v(ft),Mt.__version=yt.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function ct(E,M,z){if(M.image.length!==6)return;let ft=Jt(E,M),ot=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+z);let yt=n.get(ot);if(ot.version!==yt.__version||ft===!0){e.activeTexture(s.TEXTURE0+z);let Mt=ce.getPrimaries(ce.workingColorSpace),J=M.colorSpace===Wi?null:ce.getPrimaries(M.colorSpace),nt=M.colorSpace===Wi||Mt===J?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let _t=M.isCompressedTexture||M.image[0].isCompressedTexture,I=M.image[0]&&M.image[0].isDataTexture,lt=[];for(let Ut=0;Ut<6;Ut++)!_t&&!I?lt[Ut]=y(M.image[Ut],!0,i.maxCubemapSize):lt[Ut]=I?M.image[Ut].image:M.image[Ut],lt[Ut]=xt(M,lt[Ut]);let it=lt[0],Tt=r.convert(M.format,M.colorSpace),At=r.convert(M.type),Et=T(M.internalFormat,Tt,At,M.normalized,M.colorSpace),Ht=M.isVideoTexture!==!0,ie=yt.__version===void 0||ft===!0,wt=ot.dataReady,Yt=b(M,it);Xt(s.TEXTURE_CUBE_MAP,M);let ne;if(M.isDepthTexture){if(Et=x(M.format===Hi,M.type),ie)if(Ht)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,Et,it.width,it.height);else for(let Ut=0;Ut<6;Ut++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,Et,it.width,it.height,0,Tt,At,null)}else if(_t){Ht&&ie&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Yt,Et,it.width,it.height);for(let Ut=0;Ut<6;Ut++){ne=lt[Ut].mipmaps;for(let ve=0;ve<ne.length;ve++){let Xe=ne[ve];M.format!==ei?Tt!==null?Ht?wt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,ve,0,0,Xe.width,Xe.height,Tt,Xe.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,ve,Et,Xe.width,Xe.height,0,Xe.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,ve,0,0,Xe.width,Xe.height,Tt,At,Xe.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,ve,Et,Xe.width,Xe.height,0,Tt,At,Xe.data)}}}else{if(ne=M.mipmaps,Ht&&ie){ne.length>0&&Yt++;let Ut=bt(lt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Yt,Et,Ut.width,Ut.height)}for(let Ut=0;Ut<6;Ut++)if(I){Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,0,0,lt[Ut].width,lt[Ut].height,Tt,At,lt[Ut].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,Et,lt[Ut].width,lt[Ut].height,0,Tt,At,lt[Ut].data);for(let ve=0;ve<ne.length;ve++){let $i=ne[ve].image[Ut].image;Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,ve+1,0,0,$i.width,$i.height,Tt,At,$i.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,ve+1,Et,$i.width,$i.height,0,Tt,At,$i.data)}}else{Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,0,0,Tt,At,lt[Ut]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,Et,Tt,At,lt[Ut]);for(let ve=0;ve<ne.length;ve++){let Xe=ne[ve];Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,ve+1,0,0,Tt,At,Xe.image[Ut]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,ve+1,Et,Tt,At,Xe.image[Ut])}}}S(M)&&M.mipmapsAutoUpdate===!0&&v(s.TEXTURE_CUBE_MAP),yt.__version=ot.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function B(E,M,z,ft,ot,yt){let Mt=r.convert(z.format,z.colorSpace),J=r.convert(z.type),nt=T(z.internalFormat,Mt,J,z.normalized,z.colorSpace),_t=n.get(M),I=n.get(z);if(I.__renderTarget=M,!_t.__hasExternalTextures){let lt=Math.max(1,M.width>>yt),it=Math.max(1,M.height>>yt);ot===s.TEXTURE_3D||ot===s.TEXTURE_2D_ARRAY?e.texImage3D(ot,yt,nt,lt,it,M.depth,0,Mt,J,null):e.texImage2D(ot,yt,nt,lt,it,0,Mt,J,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),at(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ft,ot,I.__webglTexture,0,St(M)):(ot===s.TEXTURE_2D||ot>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ft,ot,I.__webglTexture,yt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ht(E,M,z){if(s.bindRenderbuffer(s.RENDERBUFFER,E),M.depthBuffer){let ft=M.depthTexture,ot=ft&&ft.isDepthTexture?ft.type:null,yt=x(M.stencilBuffer,ot),Mt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;at(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(M),yt,M.width,M.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(M),yt,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,yt,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Mt,s.RENDERBUFFER,E)}else{let ft=M.textures;for(let ot=0;ot<ft.length;ot++){let yt=ft[ot],Mt=r.convert(yt.format,yt.colorSpace),J=r.convert(yt.type),nt=T(yt.internalFormat,Mt,J,yt.normalized,yt.colorSpace);at(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(M),nt,M.width,M.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(M),nt,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,nt,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function mt(E,M,z){let ft=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ot=n.get(M.depthTexture);ot.__renderTarget=M;let yt=ft?M.depthTexture.image[0]:M.depthTexture.image;(!ot.__webglTexture||yt.width!==M.width||yt.height!==M.height)&&(yt.width=M.width,yt.height=M.height,M.depthTexture.needsUpdate=!0),ft?dt(M.depthTexture,0):Q(M.depthTexture,0);let Mt=ot.__webglTexture,J=St(M),nt=ft?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,_t=M.depthTexture.format===Hi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===ki)at(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_t,nt,Mt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,_t,nt,Mt,0);else if(M.depthTexture.format===Hi)at(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_t,nt,Mt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,_t,nt,Mt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ct(E){let M=n.get(E),z=E.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==E.depthTexture){let ft=E.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ft){let ot=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ft.removeEventListener("dispose",ot)};ft.addEventListener("dispose",ot),M.__depthDisposeCallback=ot}M.__boundDepthTexture=ft}if(E.depthTexture&&!M.__autoAllocateDepthBuffer)if(z)for(let ft=0;ft<6;ft++)mt(M.__webglFramebuffer[ft],E,ft);else E.texture.mipmaps.length>0?mt(M.__webglFramebuffer[0],E,0):mt(M.__webglFramebuffer,E,0);else if(z){M.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[ft]),M.__webglDepthbuffer[ft]===void 0)M.__webglDepthbuffer[ft]=s.createRenderbuffer(),ht(M.__webglDepthbuffer[ft],E,!1);else{let ot=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=M.__webglDepthbuffer[ft];s.bindRenderbuffer(s.RENDERBUFFER,yt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ot,s.RENDERBUFFER,yt)}}else if(E.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),ht(M.__webglDepthbuffer,E,!1);else{let ot=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,yt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ot,s.RENDERBUFFER,yt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Nt(E,M,z){let ft=n.get(E);M!==void 0&&B(ft.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Ct(E)}function qt(E){let M=E.texture,z=n.get(E),ft=n.get(M);E.addEventListener("dispose",W),C(E);let ot=E.textures,yt=E.isWebGLCubeRenderTarget===!0,Mt=ot.length>1;if(Mt||(ft.__webglTexture===void 0&&(ft.__webglTexture=s.createTexture()),ft.__version=M.version,a.memory.textures++),yt){z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(M.mipmaps.length>0){z.__webglFramebuffer[J]=[];for(let nt=0;nt<M.mipmaps.length;nt++)z.__webglFramebuffer[J][nt]=s.createFramebuffer()}else z.__webglFramebuffer[J]=s.createFramebuffer()}else{if(M.mipmaps.length>0){z.__webglFramebuffer=[];for(let J=0;J<M.mipmaps.length;J++)z.__webglFramebuffer[J]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(Mt)for(let J=0,nt=ot.length;J<nt;J++){let _t=n.get(ot[J]);_t.__webglTexture===void 0&&(_t.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&at(E)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let J=0;J<ot.length;J++){let nt=ot[J];z.__webglColorRenderbuffer[J]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[J]);let _t=r.convert(nt.format,nt.colorSpace),I=r.convert(nt.type),lt=T(nt.internalFormat,_t,I,nt.normalized,nt.colorSpace,E.isXRRenderTarget===!0),it=St(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,it,lt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+J,s.RENDERBUFFER,z.__webglColorRenderbuffer[J])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),ht(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(yt){e.bindTexture(s.TEXTURE_CUBE_MAP,ft.__webglTexture),Xt(s.TEXTURE_CUBE_MAP,M);for(let J=0;J<6;J++)if(M.mipmaps.length>0)for(let nt=0;nt<M.mipmaps.length;nt++)B(z.__webglFramebuffer[J][nt],E,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,nt);else B(z.__webglFramebuffer[J],E,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);S(M)?v(s.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}else if(Mt){for(let J=0,nt=ot.length;J<nt;J++){let _t=ot[J],I=n.get(_t),lt=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(lt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(lt,I.__webglTexture),Xt(lt,_t),B(z.__webglFramebuffer,E,_t,s.COLOR_ATTACHMENT0+J,lt,0),S(_t)&&v(lt)}e.unbindTexture()}else{let J=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(J=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(J,ft.__webglTexture),Xt(J,M),M.mipmaps.length>0)for(let nt=0;nt<M.mipmaps.length;nt++)B(z.__webglFramebuffer[nt],E,M,s.COLOR_ATTACHMENT0,J,nt);else B(z.__webglFramebuffer,E,M,s.COLOR_ATTACHMENT0,J,0);S(M)?v(J):M.mipmaps.length>0&&s.texParameteri(J,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}E.depthBuffer&&Ct(E)}function D(E){let M=E.textures;for(let z=0,ft=M.length;z<ft;z++){let ot=M[z];if(S(ot)&&ot.mipmapsAutoUpdate===!0){let yt=A(E),Mt=n.get(ot).__webglTexture;e.bindTexture(yt,Mt),v(yt),e.unbindTexture()}}}let fe=[];function rt(E){if(E.samples>0){if(at(E)===!1){let M=E.textures,z=E.width,ft=E.height,ot=s.COLOR_BUFFER_BIT,yt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Mt=n.get(E),J=M.length>1;if(J)for(let _t=0;_t<M.length;_t++)e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let _t=0;_t<M.length;_t++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ot|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ot|=s.STENCIL_BUFFER_BIT)),J){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[_t]);let I=n.get(M[_t]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,I,0)}s.blitFramebuffer(0,0,z,ft,0,0,z,ft,ot,s.NEAREST),l===!0&&(fe.length=0,fe.push(s.COLOR_ATTACHMENT0+_t),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&fe.push(yt),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),J)for(let _t=0;_t<M.length;_t++){e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[_t]);let I=n.get(M[_t]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,I,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let M=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function St(E){return Math.min(i.maxSamples,E.samples)}function at(E){let M=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Rt(E){let M=a.render.frame;h.get(E)!==M&&(h.set(E,M),E.update())}function xt(E,M){let z=E.colorSpace,ft=E.format,ot=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||z!==Aa&&z!==Wi&&(ce.getTransfer(z)===_e?(ft!==ei||ot!==An)&&Kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",z)),M}function bt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=ut,this.resetTextureUnits=j,this.getTextureUnits=Z,this.setTextureUnits=q,this.setTexture2D=Q,this.setTexture2DArray=gt,this.setTexture3D=vt,this.setTextureCube=dt,this.rebindTextures=Nt,this.setupRenderTarget=qt,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=B,this.useMultisampledRTT=at,this.dispose=F}function Ob(s,t){function e(n,i=Wi){let r,a=ce.getTransfer(i);if(n===An)return s.UNSIGNED_BYTE;if(n===oc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===lc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ju)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ku)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yu)return s.BYTE;if(n===Zu)return s.SHORT;if(n===qr)return s.UNSIGNED_SHORT;if(n===ac)return s.INT;if(n===jn)return s.UNSIGNED_INT;if(n===Qn)return s.FLOAT;if(n===ti)return s.HALF_FLOAT;if(n===ju)return s.ALPHA;if(n===Qu)return s.RGB;if(n===ei)return s.RGBA;if(n===ki)return s.DEPTH_COMPONENT;if(n===Hi)return s.DEPTH_STENCIL;if(n===td)return s.RED;if(n===cc)return s.RED_INTEGER;if(n===_s)return s.RG;if(n===hc)return s.RG_INTEGER;if(n===uc)return s.RGBA_INTEGER;if(n===to||n===eo||n===no||n===io)if(a===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===to)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===to)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===eo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===io)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===dc||n===fc||n===pc||n===mc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===dc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gc||n===_c||n===xc||n===vc||n===yc||n===so||n===Mc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===gc||n===_c)return a===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===vc)return r.COMPRESSED_R11_EAC;if(n===yc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===so)return r.COMPRESSED_RG11_EAC;if(n===Mc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Sc||n===bc||n===wc||n===Ac||n===Tc||n===Ec||n===Cc||n===Rc||n===Pc||n===Ic||n===Lc||n===Dc||n===Nc||n===Uc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ac)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ec)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ic)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Lc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Uc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oc||n===Fc||n===Bc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Oc)return a===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kc||n===zc||n===ro||n===Vc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===kc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===zc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ro)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Js?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Fb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bb=`
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

}`,Ad=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Oa(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Wn({vertexShader:Fb,fragmentShader:Bb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Dn(new Xs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Td=class extends gi{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,d=null,u=null,m=null,_=typeof XRWebGLBinding<"u",p=new Ad,g={},y=e.getContextAttributes(),S=null,v=null,A=[],T=[],x=new Dt,b=null,C=null,R=new mn;R.viewport=new Re;let L=new mn;L.viewport=new Re;let W=[R,L],O=new ec,P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Q=A[k];return Q===void 0&&(Q=new Lr,A[k]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(k){let Q=A[k];return Q===void 0&&(Q=new Lr,A[k]=Q),Q.getGripSpace()},this.getHand=function(k){let Q=A[k];return Q===void 0&&(Q=new Lr,A[k]=Q),Q.getHandSpace()};function V(k){let Q=T.indexOf(k.inputSource);if(Q===-1)return;let gt=A[Q];gt!==void 0&&(gt.update(k.inputSource,k.frame,c||a),gt.dispatchEvent({type:k.type,data:k.inputSource}))}function N(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",Y);for(let k=0;k<A.length;k++){let Q=T[k];Q!==null&&(T[k]=null,A[k].disconnect(Q))}P=null,F=null,p.reset();for(let k in g)delete g[k];if(t.setRenderTarget(S),u=null,d=null,f=null,i=null,v=null,ut.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(x.width,x.height,!1),C!==null){let k=C.camera;k.fov=C.fov,k.zoom=C.zoom,k.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&Kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,n.isPresenting===!0&&Kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(i,e)),f},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(k){if(i=k,i!==null){if(S=t.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",N),i.addEventListener("inputsourceschange",Y),y.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,vt=null,dt=null;y.depth&&(dt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,gt=y.stencil?Hi:ki,vt=y.stencil?Js:jn);let Lt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Lt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new Ln(d.textureWidth,d.textureHeight,{format:ei,type:An,depthTexture:new Vi(d.textureWidth,d.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let gt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(i,e,gt),i.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),v=new Ln(u.framebufferWidth,u.framebufferHeight,{format:ei,type:An,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ut.setContext(i),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Y(k){for(let Q=0;Q<k.removed.length;Q++){let gt=k.removed[Q],vt=T.indexOf(gt);vt>=0&&(T[vt]=null,A[vt].disconnect(gt))}for(let Q=0;Q<k.added.length;Q++){let gt=k.added[Q],vt=T.indexOf(gt);if(vt===-1){for(let Lt=0;Lt<A.length;Lt++)if(Lt>=T.length){T.push(gt),vt=Lt;break}else if(T[Lt]===null){T[Lt]=gt,vt=Lt;break}if(vt===-1)break}let dt=A[vt];dt&&dt.connect(gt)}}function X(k,Q){Q===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Q.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(i===null)return;let Q=k.near,gt=k.far;p.texture!==null&&(p.depthNear>0&&(Q=p.depthNear),p.depthFar>0&&(gt=p.depthFar)),O.near=L.near=R.near=Q,O.far=L.far=R.far=gt,(P!==O.near||F!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),P=O.near,F=O.far),O.layers.mask=k.layers.mask|6,R.layers.mask=O.layers.mask&-5,L.layers.mask=O.layers.mask&-3;let vt=k.parent,dt=O.cameras;X(O,vt);for(let Lt=0;Lt<dt.length;Lt++)X(dt[Lt],vt);O.projectionMatrix.copy(R.projectionMatrix),O.projectionMatrixInverse.copy(R.projectionMatrixInverse),C===null&&k.isPerspectiveCamera&&(C={camera:k,fov:k.fov,zoom:k.zoom}),j(k,O,vt)};function j(k,Q,gt){gt===null?k.matrix.copy(Q.matrixWorld):(k.matrix.copy(gt.matrixWorld),k.matrix.invert(),k.matrix.multiply(Q.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(Q.projectionMatrix),k.projectionMatrixInverse.copy(Q.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=wl*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(k){l=k,d!==null&&(d.fixedFoveation=k),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=k)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(k){return g[k]};let Z=null;function q(k,Q){if(h=Q.getViewerPose(c||a),m=Q,h!==null){let gt=h.views;u!==null&&(t.setRenderTargetFramebuffer(v,u.framebuffer),t.setRenderTarget(v));let vt=!1;gt.length!==O.cameras.length&&(O.cameras.length=0,vt=!0);for(let Ft=0;Ft<gt.length;Ft++){let Xt=gt[Ft],Jt=null;if(u!==null)Jt=u.getViewport(Xt);else{let G=f.getViewSubImage(d,Xt);Jt=G.viewport,Ft===0&&(t.setRenderTargetTextures(v,G.colorTexture,G.depthStencilTexture),t.setRenderTarget(v))}let st=W[Ft];st===void 0&&(st=new mn,st.layers.enable(Ft),st.viewport=new Re,W[Ft]=st),st.matrix.fromArray(Xt.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(Xt.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),Ft===0&&(O.matrix.copy(st.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),vt===!0&&O.cameras.push(st)}let dt=i.enabledFeatures;if(dt&&dt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){f=n.getBinding();let Ft=f.getDepthInformation(gt[0]);Ft&&Ft.isValid&&Ft.texture&&p.init(Ft,i.renderState)}if(dt&&dt.includes("camera-access")&&_){t.state.unbindTexture(),f=n.getBinding();for(let Ft=0;Ft<gt.length;Ft++){let Xt=gt[Ft].camera;if(Xt){let Jt=g[Xt];Jt||(Jt=new Oa,g[Xt]=Jt);let st=f.getCameraImage(Xt);Jt.sourceTexture=st}}}}for(let gt=0;gt<A.length;gt++){let vt=T[gt],dt=A[gt];vt!==null&&dt!==void 0&&dt.update(vt,Q,c||a)}Z&&Z(k,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),m=null}let ut=new i0;ut.setAnimationLoop(q),this.setAnimationLoop=function(k){Z=k},this.dispose=function(){}}},kb=new be,f0=new Qt;f0.set(-1,0,0,0,1,0,0,0,1);function zb(s,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,ld(s)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,y,S,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),f(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),d(p,g),g.isMeshPhysicalMaterial&&u(p,g,v)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,y,S):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===_n&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===_n&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let y=t.get(g),S=y.envMap,v=y.envMapRotation;S&&(p.envMap.value=S,p.envMapRotation.value.setFromMatrix4(kb.makeRotationFromEuler(v)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(f0),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,y,S){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*y,p.scale.value=S*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function f(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function u(p,g,y){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===_n&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let y=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Vb(s,t,e,n){let i={},r={};function a(y,S){let v=S.program;n.uniformBlockBinding(y,v,i[y.id])}function o(y,S){let v=i[y.id];v===void 0&&(m(y),v=l(y),i[y.id]=v,y.addEventListener("dispose",p));let A=S.program;n.updateUBOMapping(y,A);let T=t.render.frame;r[y.id]!==T&&(c(y),r[y.id]=T)}function l(y){let S=s.createBuffer(),v=y.__size,A=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,v,A),s.bindBuffer(s.UNIFORM_BUFFER,null),S}function c(y){let S=i[y.id],v=y.uniforms,A=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let T=0,x=v.length;T<x;T++){let b=v[T];if(Array.isArray(b))for(let C=0,R=b.length;C<R;C++)h(b[C],T,C,A);else h(b,T,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(y,S,v,A){if(d(y,S,v,A)===!0){let T=y.__offset,x=y.value;if(Array.isArray(x)){let b=0;for(let C=0;C<x.length;C++){let R=x[C],L=_(R,!0);f(R,y.__data,b),b+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else f(x,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,y.__data)}}function f(y,S,v){typeof y=="number"||typeof y=="boolean"?S[v]=y:y.isMatrix3?(S[v]=y.elements[0],S[v+1]=y.elements[1],S[v+2]=y.elements[2],S[v+3]=0,S[v+4]=y.elements[3],S[v+5]=y.elements[4],S[v+6]=y.elements[5],S[v+7]=0,S[v+8]=y.elements[6],S[v+9]=y.elements[7],S[v+10]=y.elements[8],S[v+11]=0):ArrayBuffer.isView(y)?S.set(y.subarray(0,S.length-v),v):y.toArray(S,v)}function d(y,S,v,A){let T=y.value,x=S+"_"+v;if(Array.isArray(T)){A[x]===void 0&&(A[x]=[]);let b=A[x],C=!1;for(let R=0;R<T.length;R++)u(T[R],b,R)===!0&&(C=!0);return C}return u(T,A,x)}function u(y,S,v){if(S[v]===void 0)return typeof y=="number"||typeof y=="boolean"?S[v]=y:ArrayBuffer.isView(y)?S[v]=y.slice():S[v]=y.clone(),!0;{let A=S[v];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return S[v]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(A.equals(y)===!1)return A.copy(y),!0}}return!1}function m(y){let S=y.uniforms,v=0,A=16;for(let x=0,b=S.length;x<b;x++){let C=Array.isArray(S[x])?S[x]:[S[x]];for(let R=0,L=C.length;R<L;R++){let W=C[R],O=Array.isArray(W.value)?W.value:[W.value],P=Array.isArray(S[x])||Array.isArray(W.value),F=v;for(let N=0,Y=O.length;N<Y;N++){let X=O[N],j=_(X,P),Z=v%A,q=Z%j.boundary,ut=Z+q;v+=q,ut!==0&&A-ut<j.storage&&(v+=A-ut),N===0&&(F=v),v+=j.storage}let V=W.type==="int"?Int32Array:W.type==="uint"?Uint32Array:Float32Array;W.__data=new V((v-F)/Float32Array.BYTES_PER_ELEMENT),W.__offset=F}}let T=v%A;return T>0&&(v+=A-T),y.__size=v,y.__cache={},this}function _(y,S){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=16,v.storage=48):y.isMatrix4?(v.boundary=16,v.storage=64):y.isTexture?Kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(v.boundary=16,v.storage=y.byteLength):Kt("WebGLRenderer: Unsupported uniform value type.",y),S===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function p(y){let S=y.target;S.removeEventListener("dispose",p),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function g(){for(let y in i)s.deleteBuffer(i[y]);i={},r={}}return{bind:a,update:o,dispose:g}}var Gb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),yi=null;function Hb(){return yi===null&&(yi=new Rl(Gb,16,16,_s,ti),yi.name="DFG_LUT",yi.minFilter=gn,yi.magFilter=gn,yi.wrapS=pi,yi.wrapT=pi,yi.generateMipmaps=!1,yi.needsUpdate=!0),yi}var qc=class{constructor(t={}){let{canvas:e=bm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:u=An}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=u,p=new Set([uc,hc,cc]),g=new Set([An,jn,qr,Js,oc,lc]),y=new Uint32Array(4),S=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},A=null,T=null,x=[],b=[],C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,L=!1,W=null,O=null,P=null,F=null;this._outputColorSpace=pn;let V=0,N=0,Y=null,X=-1,j=null,Z=new Re,q=new Re,ut=null,k=new ee(0),Q=0,gt=e.width,vt=e.height,dt=1,Lt=null,Zt=null,Ft=new Re(0,0,gt,vt),Xt=new Re(0,0,gt,vt),Jt=!1,st=new ds,G=new Pl,et=!1,ct=!1,B=new be,ht=new H,mt=new Re,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Nt=!1;function qt(){return Y===null?dt:1}let D=n;function fe(w,U){return e.getContext(w,U)}let rt,St,at,Rt,xt,bt,E,M,z,ft,ot,yt,Mt,J,nt,_t,I,lt,it,Tt,At,Et,Ht;try{let w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Yt,!1),e.addEventListener("webglcontextrestored",ne,!1),e.addEventListener("webglcontextcreationerror",Ut,!1),D===null){let U="webgl2";if(D=fe(U,w),D===null)throw fe(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ie()}catch(w){throw e.removeEventListener("webglcontextlost",Yt,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Ut,!1),jt("WebGLRenderer: "+w.message),w}function ie(){rt=new tS(D),rt.init(),At=new Ob(D,rt),St=new HM(D,rt,t,At),at=new Nb(D,rt),St.reversedDepthBuffer&&d&&at.buffers.depth.setReversed(!0),O=D.createFramebuffer(),P=D.createFramebuffer(),F=D.createFramebuffer(),Rt=new iS(D),xt=new yb,bt=new Ub(D,rt,at,xt,St,At,Rt),E=new QM(R),M=new rv(D),Et=new VM(D,M),z=new eS(D,M,Rt,Et),ft=new rS(D,z,M,Et,Rt),lt=new sS(D,St,bt),nt=new WM(xt),ot=new vb(R,E,rt,St,Et,nt),yt=new zb(R,xt),Mt=new Sb,J=new Cb(rt),I=new zM(R,E,at,ft,m,l),_t=new Db(R,ft,St),Ht=new Vb(D,Rt,St,at),it=new GM(D,rt,Rt),Tt=new nS(D,rt,Rt),Rt.programs=ot.programs,R.capabilities=St,R.extensions=rt,R.properties=xt,R.renderLists=Mt,R.shadowMap=_t,R.state=at,R.info=Rt}_!==An&&(C=new oS(_,e.width,e.height,o,i,r));let wt=new Td(R,D);this.xr=wt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let w=rt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=rt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return dt},this.setPixelRatio=function(w){w!==void 0&&(dt=w,this.setSize(gt,vt,!1))},this.getSize=function(w){return w.set(gt,vt)},this.setSize=function(w,U,tt=!0){if(wt.isPresenting){Kt("WebGLRenderer: Can't change size while VR device is presenting.");return}gt=w,vt=U,e.width=Math.floor(w*dt),e.height=Math.floor(U*dt),tt===!0&&(e.style.width=w+"px",e.style.height=U+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(gt*dt,vt*dt).floor()},this.setDrawingBufferSize=function(w,U,tt){gt=w,vt=U,dt=tt,e.width=Math.floor(w*tt),e.height=Math.floor(U*tt),this.setViewport(0,0,w,U)},this.setEffects=function(w){if(_===An){jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let U=0;U<w.length;U++)if(w[U].isOutputPass===!0){Kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(Z)},this.getViewport=function(w){return w.copy(Ft)},this.setViewport=function(w,U,tt,$){w.isVector4?Ft.set(w.x,w.y,w.z,w.w):Ft.set(w,U,tt,$),at.viewport(Z.copy(Ft).multiplyScalar(qt()).round())},this.getScissor=function(w){return w.copy(Xt)},this.setScissor=function(w,U,tt,$){w.isVector4?Xt.set(w.x,w.y,w.z,w.w):Xt.set(w,U,tt,$),at.scissor(q.copy(Xt).multiplyScalar(qt()).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(w){at.setScissorTest(Jt=w)},this.setOpaqueSort=function(w){Lt=w},this.setTransparentSort=function(w){Zt=w},this.getClearColor=function(w){return w.copy(I.getClearColor())},this.setClearColor=function(){I.setClearColor(...arguments)},this.getClearAlpha=function(){return I.getClearAlpha()},this.setClearAlpha=function(){I.setClearAlpha(...arguments)},this.clear=function(w=!0,U=!0,tt=!0){let $=0;if(w){let K=!1;if(Y!==null){let It=Y.texture.format;K=p.has(It)}if(K){let It=Y.texture.type,zt=g.has(It),Pt=I.getClearColor(),Bt=I.getClearAlpha(),Wt=Pt.r,te=Pt.g,oe=Pt.b;zt?(y[0]=Wt,y[1]=te,y[2]=oe,y[3]=Bt,D.clearBufferuiv(D.COLOR,0,y)):(S[0]=Wt,S[1]=te,S[2]=oe,S[3]=Bt,D.clearBufferiv(D.COLOR,0,S))}else $|=D.COLOR_BUFFER_BIT}U&&($|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),tt&&($|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&D.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),W=w},this.dispose=function(){e.removeEventListener("webglcontextlost",Yt,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Ut,!1),I.dispose(),Mt.dispose(),J.dispose(),bt.dispose(),xt.dispose(),E.dispose(),ft.dispose(),z.dispose(),Et.dispose(),Ht.dispose(),ot.dispose(),wt.dispose(),wt.removeEventListener("sessionstart",qd),wt.removeEventListener("sessionend",$d),ws.stop()};function Yt(w){w.preventDefault(),rd("WebGLRenderer: Context Lost."),L=!0}function ne(){rd("WebGLRenderer: Context Restored."),L=!1;let w=Rt.autoReset,U=_t.enabled,tt=_t.autoUpdate,$=_t.needsUpdate,K=_t.type;ie(),Rt.autoReset=w,_t.enabled=U,_t.autoUpdate=tt,_t.needsUpdate=$,_t.type=K}function Ut(w){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ve(w){let U=w.target;U.removeEventListener("dispose",ve),Xe(U)}function Xe(w){$i(w),xt.remove(w)}function $i(w){let U=xt.get(w).programs;U!==void 0&&(U.forEach(function(tt){ot.releaseProgram(tt)}),w.isShaderMaterial&&ot.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,tt,$,K,It){U===null&&(U=Ct);let zt=K.isMesh&&K.matrixWorld.determinantAffine()<0,Pt=sg(w,U,tt,$,K);at.setMaterial($,zt);let Bt=tt.index,Wt=1;if($.wireframe===!0){if(Bt=z.getWireframeAttribute(tt),Bt===void 0)return;Wt=2}let te=tt.drawRange,oe=tt.attributes.position,Vt=te.start*Wt,le=(te.start+te.count)*Wt;It!==null&&(Vt=Math.max(Vt,It.start*Wt),le=Math.min(le,(It.start+It.count)*Wt)),Bt!==null?(Vt=Math.max(Vt,0),le=Math.min(le,Bt.count)):oe!=null&&(Vt=Math.max(Vt,0),le=Math.min(le,oe.count));let ke=le-Vt;if(ke<0||ke===1/0)return;Et.setup(K,$,Pt,tt,Bt);let Ae,Me=it;if(Bt!==null&&(Ae=M.get(Bt),Me=Tt,Me.setIndex(Ae)),K.isMesh)$.wireframe===!0?(at.setLineWidth($.wireframeLinewidth*qt()),Me.setMode(D.LINES)):Me.setMode(D.TRIANGLES);else if(K.isLine){let en=$.linewidth;en===void 0&&(en=1),at.setLineWidth(en*qt()),K.isLineSegments?Me.setMode(D.LINES):K.isLineLoop?Me.setMode(D.LINE_LOOP):Me.setMode(D.LINE_STRIP)}else K.isPoints?Me.setMode(D.POINTS):K.isSprite&&Me.setMode(D.TRIANGLES);if(K.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))Me.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let en=K._multiDrawStarts,Gt=K._multiDrawCounts,un=K._multiDrawCount,me=Bt?M.get(Bt).bytesPerElement:1,As=xt.get($).currentProgram.getUniforms();for(let nn=0;nn<un;nn++)As.setValue(D,"_gl_DrawID",nn),Me.render(en[nn]/me,Gt[nn])}else if(K.isInstancedMesh)Me.renderInstances(Vt,ke,K.count);else if(tt.isInstancedBufferGeometry){let en=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,Gt=Math.min(tt.instanceCount,en);Me.renderInstances(Vt,ke,Gt)}else Me.render(Vt,ke)};function Xd(w,U,tt,$){W!==null&&w.isNodeMaterial&&W.setObject($,w),et===!0&&nt.setState(w,tt,!1),w.transparent===!0&&w.side===xi&&w.forceSinglePass===!1?(w.side=_n,w.needsUpdate=!0,Qr(w,U,$),w.side=gs,w.needsUpdate=!0,Qr(w,U,$),w.side=xi):Qr(w,U,$)}this.compile=function(w,U,tt=null){tt===null&&(tt=w),W!==null&&W.renderStart(w,U,tt),T=J.get(tt),T.init(U),b.push(T),tt.traverseVisible(function(K){K.isLight&&K.layers.test(U.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),w!==tt&&w.traverseVisible(function(K){K.isLight&&K.layers.test(U.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),T.setupLights(),W!==null&&W.updateLights(T.state.lightsArray),ct=this.localClippingEnabled,et=nt.init(this.clippingPlanes,ct),et===!0&&nt.setGlobalState(this.clippingPlanes,U),W!==null&&_t.render(T.state.shadowsArray,tt,U);let $=new Set;return w.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let It=K.material;if(It)if(Array.isArray(It))for(let zt=0;zt<It.length;zt++){let Pt=It[zt];Xd(Pt,tt,U,K),$.add(Pt)}else Xd(It,tt,U,K),$.add(It)}),T=b.pop(),W!==null&&W.renderEnd(),$},this.compileAsync=function(w,U,tt=null){let $=this.compile(w,U,tt);return new Promise(K=>{function It(){if($.forEach(function(zt){let Bt=xt.get(zt).currentProgram;(Bt===void 0||Bt.isReady())&&$.delete(zt)}),$.size===0){K(w);return}setTimeout(It,10)}rt.get("KHR_parallel_shader_compile")!==null?It():setTimeout(It,10)})};let rh=null;function ng(w){rh&&rh(w)}function qd(){ws.stop()}function $d(){ws.start()}let ws=new i0;ws.setAnimationLoop(ng),typeof self<"u"&&ws.setContext(self),this.setAnimationLoop=function(w){rh=w,wt.setAnimationLoop(w),w===null?ws.stop():ws.start()},wt.addEventListener("sessionstart",qd),wt.addEventListener("sessionend",$d),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;W!==null&&W.renderStart(w,U);let tt=wt.enabled===!0&&wt.isPresenting===!0,$=C!==null&&(Y===null||tt)&&C.begin(R,Y);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),wt.enabled===!0&&wt.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(wt.cameraAutoUpdate===!0&&wt.updateCamera(U),U=wt.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,U,Y),T=J.get(w,b.length),T.init(U),T.state.textureUnits=bt.getTextureUnits(),b.push(T),B.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?G.setFromArrayCamera(U):st.setFromProjectionMatrix(B,Hn,U.reversedDepth),ct=this.localClippingEnabled,et=nt.init(this.clippingPlanes,ct),A=Mt.get(w,x.length),A.init(),x.push(A),this.info.render.frame++,wt.enabled===!0&&wt.isPresenting===!0){let zt=R.xr.getDepthSensingMesh();zt!==null&&ah(zt,U,-1/0,R.sortObjects)}ah(w,U,0,R.sortObjects),A.finish(),W!==null&&W.updateLights(T.state.lightsArray),R.sortObjects===!0&&A.sort(Lt,Zt),Nt=wt.enabled===!1||wt.isPresenting===!1||wt.hasDepthSensing()===!1,Nt&&I.addToRenderList(A,w),this.info.autoReset===!0&&this.info.reset(),et===!0&&nt.beginShadows();let K=T.state.shadowsArray;if(_t.render(K,w,U),et===!0&&nt.endShadows(),($&&C.hasRenderPass())===!1){let zt=A.opaque,Pt=A.transmissive;if(T.setupLights(),U.isArrayCamera){let Bt=U.cameras;if(Pt.length>0)for(let Wt=0,te=Bt.length;Wt<te;Wt++){let oe=Bt[Wt];Zd(zt,Pt,w,oe)}Nt&&I.render(w);for(let Wt=0,te=Bt.length;Wt<te;Wt++){let oe=Bt[Wt];Yd(A,w,oe,oe.viewport)}}else Pt.length>0&&Zd(zt,Pt,w,U),Nt&&I.render(w),Yd(A,w,U)}Y!==null&&N===0&&(bt.updateMultisampleRenderTarget(Y),bt.updateRenderTargetMipmap(Y)),$&&C.end(R),w.isScene===!0&&w.onAfterRender(R,w,U),Et.resetDefaultState(),X=-1,j=null,b.pop(),b.length>0?(T=b[b.length-1],bt.setTextureUnits(T.state.textureUnits),et===!0&&nt.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,W!==null&&W.renderEnd()};function ah(w,U,tt,$){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)tt=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){let zt=U.isArrayCamera?G:st;if(!w.frustumCulled||w.intersectsFrustum(zt)){$&&mt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(B);let Pt=ft.update(w),Bt=w.material;Bt.visible&&A.push(w,Pt,Bt,tt,mt.z,null,U)}}else if(w.isMesh||w.isLine||w.isPoints){let zt=U.isArrayCamera?G:st;if(!w.frustumCulled||w.intersectsFrustum(zt)){let Pt=ft.update(w),Bt=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),mt.copy(w.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),mt.copy(Pt.boundingSphere.center)),mt.applyMatrix4(w.matrixWorld).applyMatrix4(B)),Array.isArray(Bt)){let Wt=Pt.groups;for(let te=0,oe=Wt.length;te<oe;te++){let Vt=Wt[te],le=Bt[Vt.materialIndex];le&&le.visible&&A.push(w,Pt,le,tt,mt.z,Vt,U)}}else Bt.visible&&A.push(w,Pt,Bt,tt,mt.z,null,U)}}}let It=w.children;for(let zt=0,Pt=It.length;zt<Pt;zt++)ah(It[zt],U,tt,$)}function Yd(w,U,tt,$){let{opaque:K,transmissive:It,transparent:zt}=w;T.setupLightsView(tt),et===!0&&nt.setGlobalState(R.clippingPlanes,tt),$&&at.viewport(Z.copy($)),K.length>0&&vo(K,U,tt),It.length>0&&vo(It,U,tt),zt.length>0&&vo(zt,U,tt),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function Zd(w,U,tt,$){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[$.id]===void 0){let Vt=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[$.id]=new Ln(1,1,{generateMipmaps:!0,type:Vt?ti:An,minFilter:Gi,samples:Math.max(4,St.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let It=T.state.transmissionRenderTarget[$.id],zt=$.viewport||Z;It.setSize(zt.z*R.transmissionResolutionScale,zt.w*R.transmissionResolutionScale);let Pt=R.getRenderTarget(),Bt=R.getActiveCubeFace(),Wt=R.getActiveMipmapLevel();R.setRenderTarget(It),R.getClearColor(k),Q=R.getClearAlpha(),Q<1&&R.setClearColor(16777215,.5),R.clear(),Nt&&I.render(tt);let te=R.toneMapping;R.toneMapping=vi;let oe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),T.setupLightsView($),et===!0&&nt.setGlobalState(R.clippingPlanes,$),vo(w,tt,$),bt.updateMultisampleRenderTarget(It),bt.updateRenderTargetMipmap(It),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let le=0,ke=U.length;le<ke;le++){let Ae=U[le],{object:Me,geometry:en,material:Gt,group:un}=Ae;if(Gt.side===xi&&Me.layers.test($.layers)){let me=Gt.side;Gt.side=_n,Gt.needsUpdate=!0,Jd(Me,tt,$,en,Gt,un),Gt.side=me,Gt.needsUpdate=!0,Vt=!0}}Vt===!0&&(bt.updateMultisampleRenderTarget(It),bt.updateRenderTargetMipmap(It))}R.setRenderTarget(Pt,Bt,Wt),R.setClearColor(k,Q),oe!==void 0&&($.viewport=oe),R.toneMapping=te}function vo(w,U,tt){let $=U.isScene===!0?U.overrideMaterial:null;for(let K=0,It=w.length;K<It;K++){let zt=w[K],{object:Pt,geometry:Bt,group:Wt}=zt,te=zt.material;te.allowOverride===!0&&$!==null&&(te=$),Pt.layers.test(tt.layers)&&Jd(Pt,U,tt,Bt,te,Wt)}}function Jd(w,U,tt,$,K,It){W!==null&&K.isNodeMaterial&&W.setObject(w,K),w.onBeforeRender(R,U,tt,$,K,It),w.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),K.onBeforeRender(R,U,tt,$,w,It),K.transparent===!0&&K.side===xi&&K.forceSinglePass===!1?(K.side=_n,K.needsUpdate=!0,R.renderBufferDirect(tt,U,$,K,w,It),K.side=gs,K.needsUpdate=!0,R.renderBufferDirect(tt,U,$,K,w,It),K.side=xi):R.renderBufferDirect(tt,U,$,K,w,It),w.onAfterRender(R,U,tt,$,K,It)}function Kd(w){let U=0;for(let tt of w)tt.texture!==null&&U++;return U}function Qr(w,U,tt){U.isScene!==!0&&(U=Ct);let $=xt.get(w),K=T.state.lights,It=T.state.shadowsArray,zt=K.state.version,Pt=ot.getParameters(w,K.state,It,U,tt,T.state.lightProbeGridArray),Bt=ot.getProgramCacheKey(Pt),Wt=$.programs;$.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?U.environment:null,$.fog=U.fog;let te=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;$.envMap=E.get(w.envMap||$.environment,te),$.envMapRotation=$.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Wt===void 0&&(w.addEventListener("dispose",ve),Wt=new Map,$.programs=Wt,$.programVariants=new Map);let oe=Wt.get(Bt);if(oe!==void 0){if($.currentProgram===oe&&$.lightsStateVersion===zt)return Qd(w,Pt),oe}else Pt.uniforms=ot.getUniforms(w),W!==null&&w.isNodeMaterial&&W.build(w,tt,Pt),w.onBeforeCompile(Pt,R),oe=ot.acquireProgram(Pt,Bt),Wt.set(Bt,oe),$.uniforms=Pt.uniforms;let Vt=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Vt.clippingPlanes=nt.uniform),Qd(w,Pt),$.needsLights=ag(w),$.lightsStateVersion=zt,$.needsLights&&(Vt.ambientLightColor.value=K.state.ambient,Vt.lightProbe.value=K.state.probe,Vt.sunLights.value=K.state.sun,Vt.sunLightShadows.value=K.state.sunShadow,Vt.directionalLights.value=K.state.directional,Vt.directionalLightShadows.value=K.state.directionalShadow,Vt.spotLights.value=K.state.spot,Vt.spotLightShadows.value=K.state.spotShadow,Vt.rectAreaLights.value=K.state.rectArea,Vt.ltc_1.value=K.state.rectAreaLTC1,Vt.ltc_2.value=K.state.rectAreaLTC2,Vt.pointLights.value=K.state.point,Vt.pointLightShadows.value=K.state.pointShadow,Vt.hemisphereLights.value=K.state.hemi,Vt.sunShadowMatrix.value=K.state.sunShadowMatrix,Vt.sunShadowCascade.value=K.state.sunShadowCascade,Vt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Vt.spotLightMatrix.value=K.state.spotLightMatrix,Vt.spotLightMap.value=K.state.spotLightMap,Vt.pointShadowMatrix.value=K.state.pointShadowMatrix),$.numLightProbeGrids=Kd(T.state.lightProbeGridArray),$.currentProgram=oe,$.uniformsList=null,oe}function ig(w,U,tt,$,K){let It=xt.get(w),zt=It.currentProgram.id+","+$+","+K,Pt=It.programVariants.get(zt);return Pt===void 0?(Pt=Qr(w,U,tt),It.programVariants.set(zt,Pt)):(It.currentProgram=Pt,It.uniformsList=null,It.outputColorSpace=$,It.toneMapping=K),Pt}function jd(w){if(w.uniformsList===null){let U=w.currentProgram.getUniforms();w.uniformsList=Yr.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Qd(w,U){let tt=xt.get(w);tt.outputColorSpace=U.outputColorSpace,tt.batching=U.batching,tt.batchingColor=U.batchingColor,tt.instancing=U.instancing,tt.instancingColor=U.instancingColor,tt.instancingMorph=U.instancingMorph,tt.skinning=U.skinning,tt.morphTargets=U.morphTargets,tt.morphNormals=U.morphNormals,tt.morphColors=U.morphColors,tt.morphTargetsCount=U.morphTargetsCount,tt.numClippingPlanes=U.numClippingPlanes,tt.numIntersection=U.numClipIntersection,tt.vertexAlphas=U.vertexAlphas,tt.vertexTangents=U.vertexTangents,tt.toneMapping=U.toneMapping}function sg(w,U,tt,$,K){U.isScene!==!0&&(U=Ct),bt.resetTextureUnits();let It=U.fog,zt=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?U.environment:null,Pt=Y===null?R.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ce.workingColorSpace,Bt=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Wt=E.get($.envMap||zt,Bt),te=$.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,oe=!!tt.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Vt=!!tt.morphAttributes.position,le=!!tt.morphAttributes.normal,ke=!!tt.morphAttributes.color,Ae=vi;$.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ae=R.toneMapping);let Me=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,en=Me!==void 0?Me.length:0,Gt=xt.get($),un=T.state.lights;if(et===!0&&(ct===!0||w!==j)){let Pe=w===j&&$.id===X;nt.setState($,w,Pe)}let me=!1,As=!1;$.version===Gt.__version?Gt.needsLights&&Gt.lightsStateVersion!==un.state.version||K.isBatchedMesh&&Gt.batching===!1||!K.isBatchedMesh&&Gt.batching===!0||K.isBatchedMesh&&Gt.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Gt.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Gt.instancing===!1||!K.isInstancedMesh&&Gt.instancing===!0||K.isSkinnedMesh&&Gt.skinning===!1||!K.isSkinnedMesh&&Gt.skinning===!0||K.isInstancedMesh&&Gt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Gt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Gt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Gt.instancingMorph===!1&&K.morphTexture!==null||Gt.envMap!==Wt||$.fog===!0&&Gt.fog!==It||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==nt.numPlanes||Gt.numIntersection!==nt.numIntersection)||Gt.vertexAlphas!==te||Gt.vertexTangents!==oe||Gt.morphTargets!==Vt||Gt.morphNormals!==le||Gt.morphColors!==ke||Gt.morphTargetsCount!==en||Gt.numLightProbeGrids!==Kd(T.state.lightProbeGridArray)?me=!0:(Gt.outputColorSpace!==Pt||Gt.toneMapping!==Ae)&&(As=!0):(me=!0,Gt.__version=$.version);let nn=Gt.currentProgram;(me===!0||As===!0)&&(nn=As===!0?ig($,U,K,Pt,Ae):Qr($,U,K),W&&$.isNodeMaterial&&W.onUpdateProgram($,nn,Gt));let yo=!1,Yi=!1,Ts=!1,pe=nn.getUniforms(),Ke=Gt.uniforms;if(at.useProgram(nn.program)&&(yo=!0,Yi=!0,Ts=!0),$.id!==X&&(X=$.id,Yi=!0),yo||j!==w){at.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),pe.setValue(D,"projectionMatrix",w.projectionMatrix),pe.setValue(D,"viewMatrix",w.matrixWorldInverse);let qe=pe.map.cameraPosition;qe!==void 0&&qe.setValue(D,ht.setFromMatrixPosition(w.matrixWorld)),St.logarithmicDepthBuffer&&pe.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&pe.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),j!==w&&(j=w,Yi=!0,Ts=!0)}if(Gt.needsLights&&(un.state.sunShadowMap.length>0&&pe.setValue(D,"sunShadowMap",un.state.sunShadowMap,bt),un.state.directionalShadowMap.length>0&&pe.setValue(D,"directionalShadowMap",un.state.directionalShadowMap,bt),un.state.spotShadowMap.length>0&&pe.setValue(D,"spotShadowMap",un.state.spotShadowMap,bt),un.state.pointShadowMap.length>0&&pe.setValue(D,"pointShadowMap",un.state.pointShadowMap,bt)),K.isSkinnedMesh){pe.setOptional(D,K,"bindMatrix"),pe.setOptional(D,K,"bindMatrixInverse");let Pe=K.skeleton;Pe&&(Pe.boneTexture===null&&Pe.computeBoneTexture(),pe.setValue(D,"boneTexture",Pe.boneTexture,bt))}K.isBatchedMesh&&(pe.setOptional(D,K,"batchingTexture"),pe.setValue(D,"batchingTexture",K._matricesTexture,bt),pe.setOptional(D,K,"batchingIdTexture"),pe.setValue(D,"batchingIdTexture",K._indirectTexture,bt),pe.setOptional(D,K,"batchingColorTexture"),K._colorsTexture!==null&&pe.setValue(D,"batchingColorTexture",K._colorsTexture,bt));let qn=tt.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&lt.update(K,tt,nn),(Yi||Gt.receiveShadow!==K.receiveShadow)&&(Gt.receiveShadow=K.receiveShadow,pe.setValue(D,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&U.environment!==null&&(Ke.envMapIntensity.value=U.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=Hb()),Yi){if(pe.setValue(D,"toneMappingExposure",R.toneMappingExposure),Gt.needsLights&&rg(Ke,Ts),It&&$.fog===!0&&yt.refreshFogUniforms(Ke,It),yt.refreshMaterialUniforms(Ke,$,dt,vt,T.state.transmissionRenderTarget[w.id]),Gt.needsLights&&Gt.numLightProbeGrids>0){let Pe=v,qe=0;for(let Ti of T.state.lightProbeGridArray)Ti.texture!==null&&(Pe.textures[qe]=Ti.texture,Pe.min[qe]=Ti.boundingBox.min,Pe.max[qe]=Ti.boundingBox.max,Pe.resolution[qe]=Ti.resolution,qe++);for(let Ti in Pe)Pe[Ti].length=qe;Ke.probesSH.value=Pe.textures,Ke.probesMin.value=Pe.min,Ke.probesMax.value=Pe.max,Ke.probesResolution.value=Pe.resolution}Yr.upload(D,jd(Gt),Ke,bt)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Yr.upload(D,jd(Gt),Ke,bt),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&pe.setValue(D,"center",K.center),pe.setValue(D,"modelViewMatrix",K.modelViewMatrix),pe.setValue(D,"normalMatrix",K.normalMatrix),pe.setValue(D,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){let Pe=$.uniformsGroups;for(let qe=0,Ti=Pe.length;qe<Ti;qe++){let ef=Pe[qe];Ht.update(ef,nn),Ht.bind(ef,nn)}}return nn}function rg(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.sunLights.needsUpdate=U,w.sunLightShadows.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function ag(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(w,U,tt){let $=xt.get(w);$.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),xt.get(w.texture).__webglTexture=U,xt.get(w.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:tt,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,U){let tt=xt.get(w);tt.__webglFramebuffer=U,tt.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,tt=0){Y=w,V=U,N=tt;let $=null,K=!1,It=!1;if(w){let Pt=xt.get(w);if(Pt.__useDefaultFramebuffer!==void 0){at.bindFramebuffer(D.FRAMEBUFFER,Pt.__webglFramebuffer),Z.copy(w.viewport),q.copy(w.scissor),ut=w.scissorTest,at.viewport(Z),at.scissor(q),at.setScissorTest(ut),X=-1;return}else if(Pt.__webglFramebuffer===void 0)bt.setupRenderTarget(w);else if(Pt.__hasExternalTextures)bt.rebindTextures(w,xt.get(w.texture).__webglTexture,xt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let te=w.depthTexture;if(Pt.__boundDepthTexture!==te){if(te!==null&&xt.has(te)&&(w.width!==te.image.width||w.height!==te.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");bt.setupDepthRenderbuffer(w)}}let Bt=w.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(It=!0);let Wt=xt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Wt[U])?$=Wt[U][tt]:$=Wt[U],K=!0):w.samples>0&&bt.useMultisampledRTT(w)===!1?$=xt.get(w).__webglMultisampledFramebuffer:Array.isArray(Wt)?$=Wt[tt]:$=Wt,Z.copy(w.viewport),q.copy(w.scissor),ut=w.scissorTest}else Z.copy(Ft).multiplyScalar(dt).floor(),q.copy(Xt).multiplyScalar(dt).floor(),ut=Jt;if(tt!==0&&($=O),at.bindFramebuffer(D.FRAMEBUFFER,$)&&at.drawBuffers(w,$),at.viewport(Z),at.scissor(q),at.setScissorTest(ut),K){let Pt=xt.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,Pt.__webglTexture,tt)}else if(It){let Pt=U;for(let Bt=0;Bt<w.textures.length;Bt++){let Wt=xt.get(w.textures[Bt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Bt,Wt.__webglTexture,tt,Pt)}}else if(w!==null&&tt!==0){let Pt=xt.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Pt.__webglTexture,tt)}X=-1};function tf(w){let U=xt.get(w);return(U.__readFormat!==w.format||U.__readType!==w.type)&&(U.__readFormat=w.format,U.__readType=w.type,U.__formatReadable=St.textureFormatReadable(w.format),U.__typeReadable=St.textureTypeReadable(w.type)),U}this.readRenderTargetPixels=function(w,U,tt,$,K,It,zt,Pt=0){if(!(w&&w.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=xt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&zt!==void 0&&(Bt=Bt[zt],Array.isArray(Bt)&&(Bt=Bt[0])),Bt){at.bindFramebuffer(D.FRAMEBUFFER,Bt);try{let Wt=w.textures[Pt],te=Wt.format,oe=Wt.type;w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Pt);let Vt=tf(Wt);if(Vt.__formatReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Vt.__typeReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-$&&tt>=0&&tt<=w.height-K&&D.readPixels(U,tt,$,K,At.convert(te),At.convert(oe),It)}finally{let Wt=Y!==null?xt.get(Y).__webglFramebuffer:null;at.bindFramebuffer(D.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(w,U,tt,$,K,It,zt,Pt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=xt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&zt!==void 0&&(Bt=Bt[zt],Array.isArray(Bt)&&(Bt=Bt[0])),Bt)if(U>=0&&U<=w.width-$&&tt>=0&&tt<=w.height-K){at.bindFramebuffer(D.FRAMEBUFFER,Bt);let Wt=w.textures[Pt],te=Wt.format,oe=Wt.type;w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Pt);let Vt=tf(Wt);if(Vt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Vt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,le),D.bufferData(D.PIXEL_PACK_BUFFER,It.byteLength,D.STREAM_READ),D.readPixels(U,tt,$,K,At.convert(te),At.convert(oe),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let ke=Y!==null?xt.get(Y).__webglFramebuffer:null;at.bindFramebuffer(D.FRAMEBUFFER,ke);let Ae=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Am(D,Ae,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,le),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,It),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(le),D.deleteSync(Ae),It}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,U=null,tt=0){let $=Math.pow(2,-tt),K=Math.floor(w.image.width*$),It=Math.floor(w.image.height*$),zt=U!==null?U.x:0,Pt=U!==null?U.y:0;bt.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,tt,0,0,zt,Pt,K,It),at.unbindTexture()},this.copyTextureToTexture=function(w,U,tt=null,$=null,K=0,It=0){let zt,Pt,Bt,Wt,te,oe,Vt,le,ke,Ae=w.isCompressedTexture?w.mipmaps[It]:w.image;if(tt!==null)zt=tt.max.x-tt.min.x,Pt=tt.max.y-tt.min.y,Bt=tt.isBox3?tt.max.z-tt.min.z:1,Wt=tt.min.x,te=tt.min.y,oe=tt.isBox3?tt.min.z:0;else{let pe=Math.pow(2,-K);zt=Math.floor(Ae.width*pe),Pt=Math.floor(Ae.height*pe),w.isDataArrayTexture?Bt=Ae.depth:w.isData3DTexture?Bt=Math.floor(Ae.depth*pe):Bt=1,Wt=0,te=0,oe=0}$!==null?(Vt=$.x,le=$.y,ke=$.z):(Vt=0,le=0,ke=0);let Me=At.convert(U.format),en=At.convert(U.type),Gt;U.isData3DTexture?(bt.setTexture3D(U,0),Gt=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(bt.setTexture2DArray(U,0),Gt=D.TEXTURE_2D_ARRAY):(bt.setTexture2D(U,0),Gt=D.TEXTURE_2D),at.activeTexture(D.TEXTURE0),at.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),at.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),at.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);let un=at.getParameter(D.UNPACK_ROW_LENGTH),me=at.getParameter(D.UNPACK_IMAGE_HEIGHT),As=at.getParameter(D.UNPACK_SKIP_PIXELS),nn=at.getParameter(D.UNPACK_SKIP_ROWS),yo=at.getParameter(D.UNPACK_SKIP_IMAGES);at.pixelStorei(D.UNPACK_ROW_LENGTH,Ae.width),at.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ae.height),at.pixelStorei(D.UNPACK_SKIP_PIXELS,Wt),at.pixelStorei(D.UNPACK_SKIP_ROWS,te),at.pixelStorei(D.UNPACK_SKIP_IMAGES,oe);let Yi=w.isDataArrayTexture||w.isData3DTexture,Ts=U.isDataArrayTexture||U.isData3DTexture;if(w.isDepthTexture){let pe=xt.get(w),Ke=xt.get(U),qn=xt.get(pe.__renderTarget),Pe=xt.get(Ke.__renderTarget);at.bindFramebuffer(D.READ_FRAMEBUFFER,qn.__webglFramebuffer),at.bindFramebuffer(D.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let qe=0;qe<Bt;qe++)Yi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xt.get(w).__webglTexture,K,oe+qe),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xt.get(U).__webglTexture,It,ke+qe)),D.blitFramebuffer(Wt,te,Wt+zt,te+Pt,Vt,le,Vt+zt,le+Pt,D.DEPTH_BUFFER_BIT,D.NEAREST);at.bindFramebuffer(D.READ_FRAMEBUFFER,null),at.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(K!==0||w.isRenderTargetTexture||xt.has(w)){let pe=xt.get(w),Ke=xt.get(U);at.bindFramebuffer(D.READ_FRAMEBUFFER,P),at.bindFramebuffer(D.DRAW_FRAMEBUFFER,F);for(let qn=0;qn<Bt;qn++)Yi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pe.__webglTexture,K,oe+qn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pe.__webglTexture,K),Ts?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ke.__webglTexture,It,ke+qn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ke.__webglTexture,It),K!==0?D.blitFramebuffer(Wt,te,Wt+zt,te+Pt,Vt,le,Vt+zt,le+Pt,D.COLOR_BUFFER_BIT,D.NEAREST):Ts?D.copyTexSubImage3D(Gt,It,Vt,le,ke+qn,Wt,te,zt,Pt):D.copyTexSubImage2D(Gt,It,Vt,le,Wt,te,zt,Pt);at.bindFramebuffer(D.READ_FRAMEBUFFER,null),at.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ts?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Gt,It,Vt,le,ke,zt,Pt,Bt,Me,en,Ae.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Gt,It,Vt,le,ke,zt,Pt,Bt,Me,Ae.data):D.texSubImage3D(Gt,It,Vt,le,ke,zt,Pt,Bt,Me,en,Ae):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,It,Vt,le,zt,Pt,Me,en,Ae.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,It,Vt,le,Ae.width,Ae.height,Me,Ae.data):D.texSubImage2D(D.TEXTURE_2D,It,Vt,le,zt,Pt,Me,en,Ae);at.pixelStorei(D.UNPACK_ROW_LENGTH,un),at.pixelStorei(D.UNPACK_IMAGE_HEIGHT,me),at.pixelStorei(D.UNPACK_SKIP_PIXELS,As),at.pixelStorei(D.UNPACK_SKIP_ROWS,nn),at.pixelStorei(D.UNPACK_SKIP_IMAGES,yo),It===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&D.generateMipmap(Gt),at.unbindTexture()},this.initRenderTarget=function(w){xt.get(w).__webglFramebuffer===void 0&&bt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?bt.setTextureCube(w,0):w.isData3DTexture?bt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?bt.setTexture2DArray(w,0):bt.setTexture2D(w,0),at.unbindTexture()},this.resetState=function(){V=0,N=0,Y=null,at.reset(),Et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}};var ni={ink:"#07090d",bg:"#14161b",text:"#eef0f3",muted:"#9aa1ad",amber:"#f5a524",gold:"#ffcf7a",field:"#5fb37c",sky:"#5fb3ff",blue:"#4ea1ff",coral:"#ff6b5e",origin:"#ffd28a",dest:"#9fd1ff",melonO:"#5fd07a",melonD:"#ff5a6e"},Cd=[["#f5a524","#3f9b6a"],["#f5a524","#ffcf7a"],["#d99a4a","#4a78c8"],["#3f9b6a","#4f9fe8"],["#e9b85a","#3d7fd9"],["#5fb37c","#e0b04a"],["#d99a4a","#4f9fe8"],["#2f9fb0","#5f6ee8"],["#f5a524","#c0603a"],["#7cc98f","#3f8fd0"],["#5fb37c","#3cc0b0"],["#5fb3ff","#3f9b6a"],["#8f9dff","#7cc98f"],["#ff8a6b","#c58a3a"],["#c58a3a","#3f9b8a"],["#f5a524","#8a6a3a"],["#f5a524","#5fb37c"]],ho=["#3b2a12","#8a5a17","#d98e1f","#f5a524","#ffd98a"],Xi={lo:"#4ea1ff",mid:"#3a404c",hi:"#f5a524",na:"#2f343e"},Jr=["#14301f","#1f5a3a","#3f9b6a","#7cc98f","#d4f2a8"],Zc=["#1a2c52","#24539a","#2f7fd6","#3fb0e6","#7fe0f0"],Jc=["#6b4a2e","#a8582a","#e07a3a","#ff9a5a","#ffd9b0"],p0=["#2b4a8f","#2f86c9","#2fb3a8","#9cc56a","#f5a524"],xs=s=>{let t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},Ed=s=>(s/=255,s<=.04045?s/12.92:((s+.055)/1.055)**2.4),Wb=s=>255*(s<=.0031308?s*12.92:1.055*s**(1/2.4)-.055);function Xb(s,t,e){let n=xs(s),i=xs(t);return n.map((r,a)=>Math.round(Wb(Ed(r)+(Ed(i[a])-Ed(r))*e)))}function On(s,t){t=Math.min(1,Math.max(0,t))*(s.length-1);let e=Math.min(s.length-2,Math.floor(t));return Xb(s[e],s[e+1],t-e)}var Ee=([s,t,e],n=1)=>n===1?`rgb(${s},${t},${e})`:`rgba(${s},${t},${e},${n})`;var hn=1920,qi=1080,qb=10,Si=.06,$b=1.2,Xn=s=>new ee(Array.isArray(s)?`rgb(${s.join(",")})`:s),Rd=s=>s<=0?0:s>=1?1:s*s*(3-2*s);function Yb(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function Pd(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function Zb(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}var Jb=`
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
}`,Kb=`
uniform float uAlpha; varying vec3 vColor; varying float vA;
void main(){
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r); a *= a;
  gl_FragColor = vec4(vColor, a * vA * uAlpha);
  #include <colorspace_fragment>
}`;function m0(s,t){let e=new qc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.setClearColor(0,0),e.toneMapping=ja,e.toneMappingExposure=1,e.outputColorSpace=pn,e.shadowMap.enabled=!0,e.shadowMap.type=qs;let n=new Pa,i=new mn(30,hn/qi,1,200),r=qb/t.Q,a=(B,ht)=>[B*r,ht*r];n.add(new $a(14674175,1709064,.9)),n.add(new Ja(16777215,.18));let o=new Vr(16773596,2.6);o.position.set(-7,-11,17),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:50}),o.shadow.bias=-4e-4,n.add(o);let l=new Vr(9419519,.9);l.position.set(9,12,6),n.add(l);let c=new Dn(new Xs(60,60),new Xa({opacity:.42,transparent:!0}));c.receiveShadow=!0,n.add(c);let h=Math.max(...Object.values(t.land.v).filter(Boolean)),f={cap:Xn("#1f242d"),side:Xn("#14171d")},d=Math.max(...Object.values(t.spots.dev)),u=Object.values(t.jikbul.v).sort((B,ht)=>B-ht),m=B=>{let ht=0,mt=u.length-1;for(;ht<mt;){let Ct=ht+mt>>1;u[Ct]<B?ht=Ct+1:mt=Ct}return .08+.92*(ht/(u.length-1))},_=new Fi;n.add(_);let p=t.map.sigun.map(B=>{let ht=B.rings.map(([yt,...Mt])=>{let J=_t=>_t.slice(0,-1).map(([lt,it])=>new Dt(...a(lt,it))),nt=new Fr(J(yt));return Mt.forEach(_t=>nt.holes.push(new Hs(J(_t)))),nt}),mt=new Wa(ht,{depth:1,bevelEnabled:!1,curveSegments:1}),Ct=t.land.v[B.key],Nt=Ct?Math.sqrt(Ct/h):0,qt=Xn(Ct?On(ho,.12+.88*Nt):"#2a2620"),D=t.rice.dev[B.key],fe=D==null?Xn(Xi.na):Xn(Xi.mid).lerp(Xn(D<0?Xi.lo:Xi.hi),Math.min(1,Math.abs(D)/.05)**.8),rt=t.jikbul.v[B.key],St=Xn(rt==null?"#262c28":On(Jr,m(rt))),at=t.spots.dev[B.key]||0,Rt=Xn(at?On(Zc,.1+.9*(at/d)**1.3):"#1d2430"),xt=Si+1.9*(at/d)**1.8,bt=new kr({roughness:.58,metalness:.04,transparent:!0}),E=new kr({roughness:.75,metalness:0,transparent:!0}),M=new Dn(mt,[bt,E]);M.castShadow=M.receiveShadow=!0,M.scale.z=Si,_.add(M);let[z,ft]=a(...B.c),ot=Math.min(1,Math.max(0,(z+4)/9*.45+(ft+5)/10*.55));return{key:B.key,mesh:M,cap:bt,side:E,h:Si+($b-Si)*Nt,landCol:qt,riceCol:fe,jikCol:St,devCol:Rt,h2:xt,cx:z,cy:ft,delay:ot,land:Ct,rings:B.rings}}),g=new Map(p.map(B=>[B.key,B])),y=(B,ht)=>{let mt=[];B.forEach(Nt=>{for(let qt=1;qt<Nt.length;qt++)mt.push(...a(...Nt[qt-1]),ht,...a(...Nt[qt]),ht)});let Ct=new wn;return Ct.setAttribute("position",new Ue(mt,3)),Ct},S=new Gs({color:Xn("#cfd6e2"),transparent:!0,opacity:0,depthWrite:!1}),v=new Gs({color:Xn("#8d96a6"),transparent:!0,opacity:0,depthWrite:!1}),A=new Nr(y(t.map.lineSido,0),S),T=new Nr(y(t.map.lineSigun,0),v);A.renderOrder=T.renderOrder=2,_.add(A,T);let x=9e3,b=2400,C=Zb(20261110),R=[],L=[],W=[],O=[],P=[],F=p.map(B=>(B.land||0)/Math.max(1e-6,B.rings.reduce((ht,mt)=>ht+Pd(mt[0]),0))),V=[...F].sort((B,ht)=>B-ht),N=B=>V.indexOf(B)/(V.length-1),Y=p.map(B=>B.rings.reduce((ht,mt)=>ht+Pd(mt[0]),0)**.85),X=Y.reduce((B,ht)=>B+ht,0),j=(B,ht,mt)=>{R.push(B,ht,.08);let Ct=9+C()*16,Nt=C()*Math.PI*2,qt=(C()-.5)*Math.PI*.7;L.push(Ct*Math.cos(Nt)*Math.cos(qt)*1.4,Ct*Math.sin(Nt)*Math.cos(qt),4+Ct*Math.sin(qt)*.6);let D=Math.hypot(B,ht)/6;W.push(Math.min(1,C()*.65+D*.35)),O.push(C()),P.push(mt.r,mt.g,mt.b)};p.forEach((B,ht)=>{let mt=Math.max(6,Math.round((x-b)*Y[ht]/X)),Ct=Xn(On(ho,.35+.65*N(F[ht]))),Nt=B.rings.map(fe=>fe[0]),qt=Nt.map(Pd),D=qt.reduce((fe,rt)=>fe+rt,0);for(let fe=0;fe<mt;fe++){let rt=C()*D,St=0;for(;rt>qt[St]&&St<Nt.length-1;)rt-=qt[St++];let at=Nt[St],Rt=1/0,xt=-1/0,bt=1/0,E=-1/0;at.forEach(([M,z])=>{Rt=Math.min(Rt,M),xt=Math.max(xt,M),bt=Math.min(bt,z),E=Math.max(E,z)});for(let M=0;M<40;M++){let z=Rt+C()*(xt-Rt),ft=bt+C()*(E-bt);if(Yb(z,ft,at)){j(...a(z,ft),Ct);break}}}});let Z=Xn("#ffe9c2"),q=t.map.lineSido,ut=q.map(B=>B.reduce((ht,mt,Ct)=>Ct?ht+Math.hypot(mt[0]-B[Ct-1][0],mt[1]-B[Ct-1][1]):0,0)),k=ut.reduce((B,ht)=>B+ht,0);for(let B=0;B<b;B++){let ht=C()*k,mt=0;for(;ht>ut[mt]&&mt<q.length-1;)ht-=ut[mt++];let Ct=q[mt];for(let Nt=1;Nt<Ct.length;Nt++){let qt=Math.hypot(Ct[Nt][0]-Ct[Nt-1][0],Ct[Nt][1]-Ct[Nt-1][1]);if(ht<=qt||Nt===Ct.length-1){let D=qt?Math.min(1,ht/qt):0;j(...a(Ct[Nt-1][0]+(Ct[Nt][0]-Ct[Nt-1][0])*D,Ct[Nt-1][1]+(Ct[Nt][1]-Ct[Nt-1][1])*D),Z);break}ht-=qt}}let Q=new wn;Q.setAttribute("position",new Ue(R,3)),Q.setAttribute("aStart",new Ue(L,3)),Q.setAttribute("aDelay",new Ue(W,1)),Q.setAttribute("aSeed",new Ue(O,1)),Q.setAttribute("aColor",new Ue(P,3));let gt=new Wn({vertexShader:Jb,fragmentShader:Kb,transparent:!0,depthWrite:!1,blending:Ka,uniforms:{uMorph:{value:0},uTime:{value:0},uSize:{value:92},uScale:{value:1},uAlpha:{value:1}}}),vt=new Da(Q,gt);vt.frustumCulled=!1,vt.renderOrder=3,n.add(vt);let dt=new ee,Lt=new ee,Zt=new H,Ft=hn,Xt=qi;function Jt(B,ht){Ft=B,Xt=ht,e.setSize(B,ht,!1),gt.uniforms.uScale.value=ht/qi}function st(B,ht){let mt=B.tilt*.86,Ct=B.orbit,Nt=B.camDist,qt=B.camX,D=-.4*B.tilt+B.camY;i.position.set(qt+Nt*Math.sin(mt)*Math.sin(Ct),D-Nt*Math.sin(mt)*Math.cos(Ct),Nt*Math.cos(mt)),i.up.set(0,1,0),i.lookAt(qt,D,0),i.setViewOffset(hn,qi,-B.mapShift,-B.mapLift,hn,qi),i.updateMatrixWorld();let fe=B.mapAlpha>.001;_.visible=fe,p.forEach(St=>{let at=Rd((B.rise-St.delay*.5)/.5),Rt=B.devRise>0?Rd((B.devRise-(1-St.delay)*.5)/.5):0;St.mesh.scale.z=Si+(St.h-Si)*at+(St.h2-Si)*Rt,dt.lerpColors(St.landCol,St.riceCol,B.riceColor).lerp(St.jikCol,B.jikColor).lerp(St.devCol,B.devColor).lerp(f.cap,B.mapDim),St.cap.color.copy(dt),St.cap.emissive.copy(dt).multiplyScalar(.16*(1-Math.min(1,B.mapDim))),Lt.copy(dt).multiplyScalar(.52).lerp(f.side,B.mapDim),St.side.color.copy(Lt),St.cap.opacity=St.side.opacity=B.mapAlpha});let rt=1-Rd(Math.max(B.rise,B.devRise)*1.6);A.position.z=Si+.004,T.position.z=Si+.003,S.opacity=B.mapAlpha*rt*(.28+.4*B.mapDim),v.opacity=B.mapAlpha*rt*(.1+.12*B.mapDim),c.material.opacity=.42*B.mapAlpha,gt.uniforms.uMorph.value=B.morph,gt.uniforms.uTime.value=ht,gt.uniforms.uAlpha.value=B.pAlpha,vt.visible=B.pAlpha>.001,s.style.opacity=B.glAlpha,B.glAlpha>.001&&e.render(n,i)}function G(B,ht,mt){return Zt.set(B,ht,mt).project(i),[(Zt.x+1)*.5*hn,(1-Zt.y)*.5*qi]}return{render:st,resize:Jt,project:G,top:B=>{let ht=g.get(B);return ht?[ht.cx,ht.cy,ht.mesh.scale.z]:null},world:(B,ht)=>a(B,ht),flat:Si,units:p,byKey:g,renderer:e}}var jb=s=>s<0?0:s>1?1:s,Qb=s=>(s=jb(s),s*s*(3-2*s)),Id=s=>s-Math.floor(s),Kc='"Pretendard Variable", Pretendard, system-ui, sans-serif';function g0(s,t,e){let n=s.getContext("2d"),i=1;function r(O,P){s.width=O,s.height=P,i=O/hn}let a=t.flows.top.slice(0,50).map(([O,P,F],V)=>({o:O,d:P,v:F,i:V,ph:Id(V*.618)})),o=a[0].v,l=xs(ni.melonO),c=xs(ni.melonD),h=(O,P,F,V)=>{let N=1-V;return[N*N*O[0]+2*N*V*P[0]+V*V*F[0],N*N*O[1]+2*N*V*P[1]+V*V*F[1]]},f=O=>l.map((P,F)=>Math.round(P+(c[F]-P)*O));function d(O,P){let F=O.flowAlpha;if(F<=.002||O.flows<=.001)return;n.globalCompositeOperation="lighter";let V=new Map;for(let N=a.length-1;N>=0;N--){let Y=a[N],X=e.top(Y.o),j=e.top(Y.d);if(!X||!j)continue;let Z=e.project(X[0],X[1],X[2]),q=e.project(j[0],j[1],j[2]),ut=q[0]-Z[0],k=q[1]-Z[1],Q=Math.hypot(ut,k)||1,gt=[(Z[0]+q[0])/2-k*.22,(Z[1]+q[1])/2+ut*.22-Q*.18],vt=Qb((O.flows-N/a.length*.55)/.45);if(vt<=0)continue;let dt=Math.sqrt(Y.v/o),Lt=N<3,Zt=n.createLinearGradient(Z[0],Z[1],q[0],q[1]);Zt.addColorStop(0,Ee(l,1)),Zt.addColorStop(1,Ee(c,1));let Ft=Math.max(8,Math.round(Q/10)),Xt=()=>{n.beginPath(),n.moveTo(Z[0],Z[1]);for(let et=1;et<=Ft*vt;et++){let ct=h(Z,gt,q,et/Ft);n.lineTo(ct[0],ct[1])}let G=h(Z,gt,q,vt);n.lineTo(G[0],G[1])};n.lineCap="round",n.strokeStyle=Zt,n.globalAlpha=F*(.035+.08*dt)*(Lt?1.5:1),n.lineWidth=3+11*dt,Xt(),n.stroke(),n.globalAlpha=F*(.22+.5*dt)*(Lt?1.2:1),n.lineWidth=.7+2.8*dt,Xt(),n.stroke();let Jt=Lt?4:dt>.4?3:2,st=.42/(.5+Q/520);for(let G=0;G<Jt;G++){let et=Id(P*st+Y.ph+G/Jt);if(et>vt)continue;let ct=h(Z,gt,q,et),B=1.6+3.2*dt,ht=f(et),mt=n.createRadialGradient(ct[0],ct[1],0,ct[0],ct[1],B*3.2);mt.addColorStop(0,Ee([255,255,255],1)),mt.addColorStop(.25,Ee(ht,.9)),mt.addColorStop(1,Ee(ht,0)),n.globalAlpha=F*(.35+.4*Math.sin(et*Math.PI)),n.fillStyle=mt,n.beginPath(),n.arc(ct[0],ct[1],B*3.2,0,Math.PI*2),n.fill()}n.globalAlpha=F*vt*.9,n.fillStyle=Ee(l,1),n.beginPath(),n.arc(Z[0],Z[1],1.6+2.2*dt,0,Math.PI*2),n.fill(),vt>.98&&V.set(Y.d,{p:q,v:(V.get(Y.d)?.v||0)+Y.v})}V.forEach(({p:N,v:Y})=>{let j=4+11*Math.sqrt(Y/o),Z=Id(P*.6+N[0]*.01);n.globalAlpha=F*.45;let q=n.createRadialGradient(N[0],N[1],0,N[0],N[1],j*1.8);q.addColorStop(0,Ee(c,.9)),q.addColorStop(1,Ee(c,0)),n.fillStyle=q,n.beginPath(),n.arc(N[0],N[1],j*1.8,0,Math.PI*2),n.fill(),n.globalAlpha=F*(1-Z)*.7,n.strokeStyle=Ee(c,1),n.lineWidth=1.2,n.beginPath(),n.arc(N[0],N[1],j+Z*22,0,Math.PI*2),n.stroke()}),n.globalAlpha=1,n.globalCompositeOperation="source-over"}let u=t.power.k,m=t.power.months,_=u.length,p=Math.max(...u),g=+m[0].slice(5,7)-1,y=1250,S=548,v=36,A=400,T=O=>v+(A-v)*(O/p),x=O=>-Math.PI/2+(g+O)/12*Math.PI*2,b=O=>{let P=Math.floor(O),F=O-P,V=F&&P+1<_?u[P]+(u[P+1]-u[P])*F:u[P],N=T(V),Y=x(O);return[y+N*Math.cos(Y),S+N*Math.sin(Y)]},C=O=>On(p0,O/(_-1));function R(O){let P=O.powerAlpha;if(P<=.002)return;let F=O.spiral*(_-1);n.save(),n.globalAlpha=P,n.setLineDash([2,6]),n.lineWidth=1,[1e6,2e6].forEach(Y=>{n.strokeStyle="rgba(220,228,240,0.16)",n.beginPath(),n.arc(y,S,T(Y),0,Math.PI*2),n.stroke(),n.fillStyle="rgba(220,228,240,0.45)",n.font=`500 15px ${Kc}`,n.textAlign="left",n.fillText(`${Y/1e4}\uB9CC MWh`,y+8,S-T(Y)-6)}),n.setLineDash([]),n.font=`600 17px ${Kc}`,n.textAlign="center",n.textBaseline="middle";for(let Y=0;Y<12;Y++){let X=-Math.PI/2+Y/12*Math.PI*2,j=A+34;n.fillStyle=Y===0||Y===7?"rgba(255,220,160,0.85)":"rgba(200,208,220,0.45)",n.fillText(`${Y+1}\uC6D4`,y+j*Math.cos(X),S+j*Math.sin(X))}n.lineCap="round",n.lineJoin="round",n.globalCompositeOperation="lighter";let V=6;for(let Y=1;Y<=Math.ceil(F);Y++){let X=Math.min(Y,F);if(X<=Y-1)break;let j=(F-Y)/12,Z=.32+.68*Math.exp(-j*.55),q=C(Y);n.strokeStyle=Ee(q,1),n.beginPath();let[ut,k]=b(Y-1);n.moveTo(ut,k);for(let Q=1;Q<=V;Q++){let gt=Y-1+(X-(Y-1))*Q/V,[vt,dt]=b(gt);n.lineTo(vt,dt)}n.globalAlpha=P*Z*.22,n.lineWidth=9,n.stroke(),n.globalAlpha=P*Z,n.lineWidth=2.2,n.stroke()}if(F>0){let[Y,X]=b(F),j=C(F),Z=n.createRadialGradient(Y,X,0,Y,X,34);Z.addColorStop(0,"rgba(255,255,255,0.95)"),Z.addColorStop(.2,Ee(j,.8)),Z.addColorStop(1,Ee(j,0)),n.globalAlpha=P,n.fillStyle=Z,n.beginPath(),n.arc(Y,X,34,0,Math.PI*2),n.fill()}n.globalCompositeOperation="source-over";let N=Math.min(_-1,Math.floor(F+.001));n.globalAlpha=P,n.fillStyle=Ee(C(F),1),n.font=`800 64px ${Kc}`,n.fillText(m[N].slice(0,4),y,S-6),n.fillStyle="rgba(220,228,240,0.6)",n.font=`500 16px ${Kc}`,n.fillText(`${+m[N].slice(5,7)}\uC6D4 \xB7 ${Math.round(u[N]/1e4)}\uB9CC MWh`,y,S+36),n.restore()}let L=!0;function W(O,P){let F=O.flowAlpha>.002&&O.flows>.001||O.powerAlpha>.002;F!==L&&(L=F,s.style.visibility=F?"visible":"hidden"),F&&(n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,s.width,s.height),n.setTransform(i,0,0,i,0,0),d(O,P),R(O))}return{render:W,resize:r}}var t1="http://www.w3.org/2000/svg",ue=(s,t={},e)=>{let n=document.createElementNS(t1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},e1=s=>s<0?0:s>1?1:s,ii=s=>(s=e1(s),s*s*(3-2*s));function _0(s,t){let e=t.rice,n=150,i=700,r=770,a=920,o=725,l=950,c=e.hist.filter(([,G])=>G!=null),h=c.flatMap(([,G,et])=>[G,et]).concat(e.fc.flatMap(G=>[G.lo,G.hi]),[e.stat,e.krei].filter(Boolean)),f=Math.floor((Math.min(...h)-6)/10)*10,d=Math.ceil((Math.max(...h)+4)/10)*10,u=c[0][0],m=c.at(-1)[0],_=G=>n+(G-u)/(m-u)*(i-n),p=G=>r+G/(e.fc.length-1)*(a-r),g=G=>l-(G-f)/(d-f)*(l-o),y=ue("g",{class:"rc",opacity:0},s),S=ue("defs",{},s),v=ue("linearGradient",{id:"rcArea",x1:0,y1:0,x2:0,y2:1},S);ue("stop",{offset:0,"stop-color":ni.gold,"stop-opacity":.22},v),ue("stop",{offset:1,"stop-color":ni.gold,"stop-opacity":0},v);let A=ue("g",{class:"rc-grid"},y);for(let G=f;G<=d;G+=20)G!==f&&(ue("line",{x1:n,x2:a+10,y1:g(G),y2:g(G)},A),ue("text",{x:n-14,y:g(G)+5,"text-anchor":"end"},A).textContent=G);[u,2015,2020,m].forEach(G=>{ue("text",{x:_(G),y:l+30,"text-anchor":"middle"},A).textContent=G}),ue("text",{x:n-14,y:o-22,"text-anchor":"end",class:"rc-unit"},A).textContent="kg/10a";let T=G=>G.map(([et,ct],B)=>`${B?"L":"M"}${et.toFixed(1)},${ct.toFixed(1)}`).join(""),x=c.filter(([,,G])=>G).map(([G,,et])=>[_(G),g(et)]),b=c.map(([G,et])=>[_(G),g(et)]),C=ue("path",{d:`${T(b)}L${_(m)},${l}L${_(u)},${l}Z`,fill:"url(#rcArea)",opacity:0},y),R=ue("path",{d:T(x),class:"rc-norm"},y),L=ue("path",{d:T(b),class:"rc-line"},y),W=b.map(([G,et])=>ue("circle",{cx:G,cy:et,r:4.2,class:"rc-dot",opacity:0},y)),O=ue("g",{class:"rc-fc"},y);ue("rect",{x:r-30,y:o-30,width:a-r+60,height:l-o+44,rx:14,class:"rc-fcbox"},O),ue("text",{x:(r+a)/2,y:l+30,"text-anchor":"middle",class:"rc-fclab"},O).textContent=`${e.year} \uC608\uCE21 ${e.fc.length}\uBC88`;let P=[[e.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98",ni.sky],[e.krei,"KREI",ni.field]].filter(([G])=>G!=null).map(([G,et,ct],B)=>{let ht=ue("g",{opacity:0},O);return ue("line",{x1:r-18,x2:a+18,y1:g(G),y2:g(G),stroke:ct,"stroke-width":2,"stroke-dasharray":"5 4"},ht),ue("text",{x:a+26,y:g(G)+(B?14:-4),fill:ct,class:"rc-ref"},ht).textContent=`${et} ${G}`,ht}),F=ue("path",{d:T(e.fc.map((G,et)=>[p(et),g(G.y)])),class:"rc-fcline"},O),V=e.fc.map((G,et)=>{let ct=ue("g",{opacity:0},O);return ue("line",{x1:p(et),x2:p(et),y1:g(G.lo),y2:g(G.hi),class:"rc-wh"},ct),ue("circle",{cx:p(et),cy:g(G.y),r:et===e.fc.length-1?7:5,class:et===e.fc.length-1?"rc-fcdot now":"rc-fcdot"},ct),ct}),N=G=>G.replace(/(\d+)월 (\d+)일/,"$1/$2");ue("text",{x:p(0),y:o-42,"text-anchor":"middle",class:"rc-fcd"},O).textContent=N(e.fc[0].lab),ue("text",{x:p(e.fc.length-1),y:o-42,"text-anchor":"middle",class:"rc-fcd"},O).textContent=N(e.fc.at(-1).lab);let Y=t.facts,X=Y.riceAcc,j=ue("g",{class:"ra",opacity:0},s),Z=[["\uD3C9\uB144 \uADF8\uB300\uB85C",X.norm,"norm"],...t.rice.fc.slice(0,5).map(G=>[G.lab,X[`m${G.t}`],G.t])].filter(([,G])=>G!=null),q=330,ut=900,k=742,Q=37,gt=G=>q+G/Math.max(...Z.map(et=>et[1]))*(ut-q);ue("text",{x:150,y:k-44,class:"ra-h"},j).textContent=`\uC804\uAD6D \uB2E8\uC218 \uD3C9\uADE0 \uC624\uCC28 \xB7 ${Y.riceFrom}~${t.rice.year-1} \uADF8\uD574 \uC774\uC804 \uC790\uB8CC\uB85C\uB9CC \uC7AC\uD604`;let vt=Z.slice(1).reduce((G,et)=>et[1]<G[1]?et:G)[2],dt=Z.map(([G,et,ct],B)=>{let ht=k+B*Q,mt=ue("g",{opacity:0},j);ue("text",{x:q-16,y:ht+19,"text-anchor":"end",class:"ra-l"},mt).textContent=B?`${G} \uC608\uCE21`:G;let Ct=ue("rect",{x:q,y:ht+4,width:0,height:22,rx:5,class:ct==="norm"?"ra-b norm":ct==="0915"?"ra-b best":"ra-b"},mt),Nt=ue("text",{x:q,y:ht+21,class:"ra-v"},mt);return Nt.textContent=`${et}kg`,{gg:mt,r:Ct,tx:Nt,w:gt(et)-q}}),Lt=[[X.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1","#5fb3ff"],[X.krei,"KREI 9\uC6D4 \uC804\uB9DD","#5fb37c"]].map(([G,et,ct],B)=>{let ht=ue("g",{opacity:0},j),mt=gt(G),Ct=k-6,Nt=k+Z.length*Q;return ue("line",{x1:mt,x2:mt,y1:Ct,y2:Nt,stroke:ct,"stroke-width":2,"stroke-dasharray":"4 4"},ht),ue("text",{x:mt+(B?8:-8),y:Nt+24,"text-anchor":B?"start":"end",fill:ct,class:"ra-ref"},ht).textContent=`${et} ${G}kg`,ht}),Zt=0,Ft=0;function Xt(){Zt=L.getTotalLength(),Ft=F.getTotalLength(),L.style.strokeDasharray=`${Zt} ${Zt}`,F.style.strokeDasharray=`${Ft} ${Ft}`}function Jt(G){j.setAttribute("opacity",G.accAlpha),!(G.accAlpha<=.002)&&(dt.forEach((et,ct)=>{let B=ii((G.riceAcc-ct*.1)/.45);et.gg.setAttribute("opacity",ii(B*3)),et.r.setAttribute("width",et.w*B),et.tx.setAttribute("x",q+et.w*B+10)}),Lt.forEach((et,ct)=>et.setAttribute("opacity",ii((G.riceAcc-.7-ct*.1)/.2))))}function st(G){if(Jt(G),Zt||Xt(),y.setAttribute("opacity",G.riceAlpha),G.riceAlpha<=.002)return;let et=ii(G.riceLine);L.style.strokeDashoffset=Zt*(1-et),R.style.opacity=.9*ii(G.riceLine*1.5),C.setAttribute("opacity",ii((G.riceLine-.6)/.4)),W.forEach((B,ht)=>B.setAttribute("opacity",ii((et-ht/W.length)*8)));let ct=G.riceFc;O.setAttribute("opacity",ii(ct*4)),V.forEach((B,ht)=>B.setAttribute("opacity",ii((ct-ht/V.length*.7)/.3))),F.style.strokeDashoffset=Ft*(1-ii(ct/.95)),P.forEach((B,ht)=>B.setAttribute("opacity",ii((ct-.75-ht*.08)/.15)))}return{render:st}}var n1="http://www.w3.org/2000/svg",vs=(s,t={},e)=>{let n=document.createElementNS(n1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},i1=s=>s<0?0:s>1?1:s,Ld=s=>(s=i1(s),s*s*(3-2*s)),s1=s=>Math.round(s/100).toLocaleString("ko-KR");function x0(s,t){let e=t.jikbul,n=e.sido.filter(y=>y.pub>0),i=vs("g",{class:"bd",opacity:0},s),r=150,a=206,o=222,l=470,c=628,h=20.5,f=Math.max(...n.map(y=>y.pub)),d=y=>y.hh?y.pub*100/y.hh:0,u=n.map(d),m=[...u].sort((y,S)=>y-S),_=y=>m.indexOf(y)/Math.max(1,m.length-1);vs("text",{x:r,y:c-22,class:"bd-h"},i).textContent=`\uC2DC\uB3C4\uBCC4 \uACF5\uC775\uC9C1\uBD88 \uC608\uC0B0\uD604\uC561 \xB7 ${e.year}`,vs("text",{x:900,y:c-22,"text-anchor":"end",class:"bd-y"},i).textContent="\uB18D\uAC00\uB2F9";let p=n.map((y,S)=>{let v=c+S*h,A=y.pub/f*l,T=On(Jr,.25+.75*_(u[S])),x=vs("g",{},i);vs("text",{x:a,y:v+14,"text-anchor":"end",class:"bd-n"},x).textContent=y.name;let b=vs("rect",{x:o,y:v+3,width:0,height:h-7,rx:4,fill:Ee(T)},x),C=vs("text",{x:o,y:v+14,class:"bd-v2"},x);C.textContent=`${s1(y.pub)}\uC5B5`;let R=vs("text",{x:900,y:v+14,"text-anchor":"end",class:"bd-f"},x);return R.textContent=`${Math.round(u[S]).toLocaleString("ko-KR")}\uB9CC`,{gg:x,b,v:C,f:R,w:A}});function g(y){i.setAttribute("opacity",y.bdAlpha),!(y.bdAlpha<=.002)&&p.forEach((S,v)=>{let A=Ld((y.bdBars-v/p.length*.5)/.5);S.gg.setAttribute("opacity",Ld(A*3)),S.b.setAttribute("width",S.w*A),S.v.setAttribute("x",o+S.w*A+8),S.f.setAttribute("opacity",Ld((y.bdSplit-v/p.length*.4)/.4))})}return{render:g}}var si=.5416666666666666,v0="assets/intro/shots/";function y0(s,t,e){s.insertAdjacentHTML("beforeend",`
    <div class="scr-wrap" id="scr-wrap">
      <div class="scr" id="scr">
        <div class="scr-bar"><i></i><i></i><i></i><span class="scr-url" id="scr-url">ag-rstat.vercel.app</span></div>
        <div class="scr-view">
          <div class="scr-zoom" id="scr-zoom">
            ${e.map(u=>`<img class="scr-img" data-n="${u}" src="${v0}${u}.webp" alt="" decoding="async" width="1040" height="585">`).join("")}
            <div class="scr-marks" id="scr-marks"></div>
            <div class="cursor" id="cursor"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6.2 1.6L10 19z"/></svg><span class="ripple"></span></div>
          </div>
        </div>
      </div>
    </div>`);let n=s.querySelector("#scr-wrap"),i=s.querySelector("#scr-zoom"),r=s.querySelector("#scr-marks"),a=s.querySelector("#cursor"),o=s.querySelector("#scr-url"),l=Object.fromEntries([...s.querySelectorAll(".scr-img")].map(u=>[u.dataset.n,u])),c=(u,m)=>t.shots[u]?.boxes?.[m]||t.shots.home?.boxes?.[m]||null;function h(u,m=.92){if(!u)return{scale:1,x:0,y:0};let[_,p,g,y]=u,S=Math.max(1,Math.min(1040/(g*si),585/(y*si))*m),v=1040/2-(_+g/2)*si*S,A=585/2-(p+y/2)*si*S;return v=Math.min(0,Math.max(1040-1040*S,v)),A=Math.min(0,Math.max(585-585*S,A)),{scale:S,x:v,y:A}}let f=u=>u?{x:(u[0]+u[2]/2)*si,y:(u[1]+u[3]/2)*si}:{x:1040/2,y:585/2};function d(u,m,_,p="top"){if(!m)return null;let[g,y,S,v]=m;return r.insertAdjacentHTML("beforeend",`<div class="mk mk-${p}" id="mk-${u}" style="left:${g*si}px;top:${y*si}px;width:${S*si}px;height:${v*si}px"><span>${_}</span></div>`),r.querySelector(`#mk-${u}`)}return{wrap:n,zoom:i,cursor:a,url:o,imgs:l,box:c,focus:h,at:f,mark:d,K:si}}function M0(s,t){return s.insertAdjacentHTML("beforeend",`
    <div class="wall-wrap" id="wall-wrap"><div class="wall" id="wall">
      ${t.map(([e,n])=>`<figure class="wt"><img src="${v0}${e}_s.webp" alt="" decoding="async" width="320" height="180"><figcaption>${n}</figcaption></figure>`).join("")}
    </div></div>`),s.querySelector("#wall-wrap")}var r1="http://www.w3.org/2000/svg",de=(s,t={},e)=>{let n=document.createElementNS(r1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},b0=s=>s<0?0:s>1?1:s,js=s=>(s=b0(s),s*s*(3-2*s)),Dd=s=>1-(1-b0(s))**3,a1=s=>s-Math.floor(s),uo='"Pretendard Variable", Pretendard, system-ui, sans-serif';function S0(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}function o1(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function l1(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function w0(s,t,e,n){let i=s.getContext("2d"),r=e.spots,a=1,o=!0;function l(rt,St){s.width=rt,s.height=St,a=rt/hn}let c=r.rio.regions,h=Math.max(...c.map(rt=>rt.x)),f=rt=>rt>=1?On(["#ffd27a","#f5a524","#ff7a4a"],Math.min(1,(rt-1)/2.4)):On(["#2f6fd0","#4ea1ff","#9fd1ff"],rt);function d(rt,St){let at=rt.rioA;if(at<=.002)return;let Rt=1290,xt=560,bt=74,E=300,M=c.length,z=Math.PI*2/M*.36;i.save(),i.globalAlpha=at,i.globalCompositeOperation="lighter";for(let ot=0;ot<3;ot++){let yt=a1(St*.42+ot/3),Mt=bt+yt*360;i.strokeStyle=`rgba(255,200,120,${.22*(1-yt)*at})`,i.lineWidth=1.5,i.beginPath(),i.arc(Rt,xt,Mt,0,Math.PI*2),i.stroke()}c.forEach((ot,yt)=>{let Mt=Dd((rt.rioP-yt/M*.5)/.5);if(Mt<=0)return;let J=-Math.PI/2+yt/M*Math.PI*2+rt.rioP*.12,nt=bt+(E*Math.sqrt(ot.x/h)+18)*Mt,_t=f(ot.lq),I=i.createLinearGradient(Rt+bt*Math.cos(J),xt+bt*Math.sin(J),Rt+nt*Math.cos(J),xt+nt*Math.sin(J));I.addColorStop(0,Ee(_t,.08)),I.addColorStop(.6,Ee(_t,.55)),I.addColorStop(1,Ee(_t,.95)),i.fillStyle=I,i.beginPath(),i.moveTo(Rt+bt*Math.cos(J-z),xt+bt*Math.sin(J-z));let lt=bt+(nt-bt)*.55,it=z*1.5*(bt/lt)*2.4;i.quadraticCurveTo(Rt+lt*Math.cos(J-it),xt+lt*Math.sin(J-it),Rt+nt*Math.cos(J),xt+nt*Math.sin(J)),i.quadraticCurveTo(Rt+lt*Math.cos(J+it),xt+lt*Math.sin(J+it),Rt+bt*Math.cos(J+z),xt+bt*Math.sin(J+z)),i.closePath(),i.fill();let Tt=js((Mt-.7)/.3);if(Tt>0){let At=nt+26,Et=Rt+At*Math.cos(J),Ht=xt+At*Math.sin(J);i.globalCompositeOperation="source-over",i.globalAlpha=at*Tt,i.textAlign=Math.cos(J)>.25?"left":Math.cos(J)<-.25?"right":"center",i.textBaseline="middle",i.fillStyle="#eef0f3",i.font=`700 19px ${uo}`,i.fillText(ot.name,Et,Ht-9),i.fillStyle=Ee(_t,1),i.font=`600 15px ${uo}`,i.fillText(`${(ot.x/1e6).toFixed(1)}\uC870 \xB7 ${ot.lq}`,Et,Ht+11),i.globalAlpha=at,i.globalCompositeOperation="lighter"}}),i.globalCompositeOperation="source-over";let ft=i.createRadialGradient(Rt,xt,0,Rt,xt,bt);ft.addColorStop(0,"rgba(40,30,16,0.95)"),ft.addColorStop(1,"rgba(20,16,10,0.9)"),i.fillStyle=ft,i.beginPath(),i.arc(Rt,xt,bt-4,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(255,207,122,0.5)",i.lineWidth=1.2,i.stroke(),i.textAlign="center",i.textBaseline="middle",i.fillStyle="#ffd98a",i.font=`800 30px ${uo}`,i.fillText(`${Math.round(r.rio.total/1e6)}\uC870`,Rt,xt-6),i.fillStyle="#aab2bf",i.font=`500 14px ${uo}`,i.fillText(`\uB18D\uC2DD\uD488 \uC0B0\uCD9C ${r.rio.year}`,Rt,xt+20),i.textAlign="right",i.fillStyle="rgba(200,208,220,0.75)",i.font=`500 16px ${uo}`,i.fillText("\uAF43\uC78E \uAE38\uC774 = \uC2DC\uB3C4 \uB18D\uC2DD\uD488 \uC0B0\uCD9C\uC561 \xB7 \uC22B\uC790 = \uD2B9\uD654\uB3C4(\uC804\uAD6D \uD3C9\uADE0 1, \uC8FC\uD669\uC77C\uC218\uB85D \uB18D\uC2DD\uD488\uC5D0 \uAE30\uB304\uB2E4)",1844,1018),i.restore()}let u=[[245,165,36],[255,122,89],[124,201,143]],m=Math.max(...r.coops.map(rt=>rt[3])),_=S0(1110),p=r.coops.map(rt=>({w:n.world(rt[0],rt[1]),k:rt[2],s:Math.sqrt(rt[3]/m),o:_()}));function g(rt,St){let at=rt.coopA;at<=.002||(i.save(),i.globalCompositeOperation="lighter",p.forEach(Rt=>{let xt=js((rt.coopP-Rt.o*.8)/.2);if(xt<=0)return;let[bt,E]=n.project(Rt.w[0],Rt.w[1],n.flat),M=(1.4+6.5*Rt.s)*(.6+.4*xt),z=.85+.15*Math.sin(St*2+Rt.o*30),ft=i.createRadialGradient(bt,E,0,bt,E,M*2);ft.addColorStop(0,Ee(u[Rt.k],.5*at*xt*z)),ft.addColorStop(1,Ee(u[Rt.k],0)),i.fillStyle=ft,i.beginPath(),i.arc(bt,E,M*2,0,Math.PI*2),i.fill(),i.globalCompositeOperation="source-over",i.fillStyle=Ee(u[Rt.k],.92*at*xt),i.beginPath(),i.arc(bt,E,Math.max(1.5,M*.7),0,Math.PI*2),i.fill(),i.globalCompositeOperation="lighter"}),i.restore())}let y=S0(14939),S=e.map.sigun.map(rt=>r.lv.nv[rt.key]?r.lv.man[rt.key]/r.lv.nv[rt.key]:0),v=S.filter(rt=>rt>0).sort((rt,St)=>rt-St),A=rt=>{let St=0,at=v.length-1;for(;St<at;){let Rt=St+at>>1;v[Rt]<rt?St=Rt+1:at=Rt}return St/(v.length-1)},T=[];e.map.sigun.forEach((rt,St)=>{let at=r.lv.nv[rt.key];if(!at)return;let Rt=On(Jc,.1+.9*A(S[St])),xt=rt.rings.map(M=>M[0]),bt=xt.map(l1),E=bt.reduce((M,z)=>M+z,0);for(let M=0;M<at;M++){let z=y()*E,ft=0;for(;z>bt[ft]&&ft<xt.length-1;)z-=bt[ft++];let ot=xt[ft],yt=1/0,Mt=-1/0,J=1/0,nt=-1/0;ot.forEach(([_t,I])=>{yt=Math.min(yt,_t),Mt=Math.max(Mt,_t),J=Math.min(J,I),nt=Math.max(nt,I)});for(let _t=0;_t<30;_t++){let I=yt+y()*(Mt-yt),lt=J+y()*(nt-J);if(o1(I,lt,ot)){T.push({w:n.world(I,lt),c:Rt,o:y()});break}}}});function x(rt){let St=rt.lvA;if(!(St<=.002)){i.save(),i.globalCompositeOperation="lighter";for(let at of T){let Rt=js((rt.lvP-at.o*.85)/.15);if(Rt<=0)continue;let[xt,bt]=n.project(at.w[0],at.w[1],.06);i.fillStyle=Ee(at.c,.75*St*Rt),i.fillRect(xt-1.3,bt-1.3,2.6,2.6)}i.restore()}}let b=r.employ,C=de("g",{opacity:0},t),R=150,L=1770,W=560,O=950,P=5e3,F=rt=>R+(rt-b.years[0])/(b.years.at(-1)-b.years[0])*(L-R),V=rt=>O-rt/P*(O-W),N=de("defs",{},t),Y=de("linearGradient",{id:"empG",x1:0,y1:0,x2:0,y2:1},N);de("stop",{offset:0,"stop-color":"#7cc98f","stop-opacity":.45},Y),de("stop",{offset:1,"stop-color":"#7cc98f","stop-opacity":0},Y);let X=de("clipPath",{id:"empClip"},N),j=de("rect",{x:R-10,y:0,width:0,height:1080},X);for(let rt=1e3;rt<=4e3;rt+=1e3)de("line",{x1:R,x2:L,y1:V(rt),y2:V(rt),class:"sp-grid"},C),de("text",{x:L+12,y:V(rt)+5,class:"sp-ax"},C).textContent=`${rt/10}\uB9CC`;for(let rt=1970;rt<=2020;rt+=10)de("text",{x:F(rt),y:O+30,"text-anchor":"middle",class:"sp-ax"},C).textContent=rt;let Z=b.years.map((rt,St)=>[F(rt),V(b.a[St])]),q=Z.map(([rt,St],at)=>`${at?"L":"M"}${rt.toFixed(1)},${St.toFixed(1)}`).join(""),ut=de("g",{"clip-path":"url(#empClip)"},C);de("path",{d:`${q}L${L},${O}L${R},${O}Z`,fill:"url(#empG)"},ut),de("path",{d:q,class:"sp-eline"},ut);let k=de("circle",{r:7,class:"sp-ehead"},C),Q=de("text",{class:"sp-ehv","text-anchor":"middle"},C),gt=de("text",{x:Z[0][0]+14,y:Z[0][1]-18,class:"sp-ehs"},C);gt.textContent=`${b.years[0]}\uB144 ${Math.round(b.a[0]/10)}\uB9CC \uBA85`;function vt(rt){if(C.setAttribute("opacity",rt.empA),rt.empA<=.002)return;let St=rt.empP,at=R+(L-R)*St;j.setAttribute("width",at-R+12);let Rt=Math.min(b.years.length-1,St*(b.years.length-1)),xt=Math.floor(Rt),bt=Rt-xt,E=Math.min(b.years.length-1,xt+1),M=Z[xt][0]+(Z[E][0]-Z[xt][0])*bt,z=Z[xt][1]+(Z[E][1]-Z[xt][1])*bt,ft=b.a[xt]+(b.a[E]-b.a[xt])*bt;k.setAttribute("cx",M),k.setAttribute("cy",z),Q.setAttribute("x",Math.min(L-40,M)),Q.setAttribute("y",z-22),Q.textContent=`${Math.round(b.years[0]+Rt)}\uB144 ${Math.round(ft/10)}\uB9CC`,gt.setAttribute("opacity",js(St*6))}let dt=de("g",{opacity:0},t),Lt=de("pattern",{id:"soilDots",width:9,height:9,patternUnits:"userSpaceOnUse"},N);de("circle",{cx:2,cy:2,r:.9,fill:"rgba(0,0,0,0.25)"},Lt),de("circle",{cx:6.5,cy:6,r:.7,fill:"rgba(255,255,255,0.12)"},Lt);let Zt=["#7fcf7a","#b9d36a","#d9b86a","#b08858","#6e5a48","#3a3632"],Ft=["1\uAE09","2\uAE09","3\uAE09","4\uAE09","5\uAE09","\uAE30\uD0C0"],Xt=[["\uB17C",r.soil.pg,880],["\uBC2D",r.soil.fg,1440]].map(([rt,St,at])=>{let Rt=St.reduce((J,nt)=>J+nt,0),xt=250,bt=640,E=280;de("text",{x:at+E/2,y:xt-28,"text-anchor":"middle",class:"sp-sh"},dt).textContent=`${rt}\uC73C\uB85C \uC4F8 \uB54C \uC801\uC131\uB4F1\uAE09`;let M=xt,z=St.map((J,nt)=>{let _t=J/Rt*bt,I=de("g",{},dt);de("rect",{x:at,y:M,width:E,height:Math.max(1,_t-2),rx:4,fill:Zt[nt]},I),de("rect",{x:at,y:M,width:E,height:Math.max(1,_t-2),rx:4,fill:"url(#soilDots)"},I);let lt=J/Rt*100;if(_t>16){let Tt=de("text",{x:at+E+14,y:M+_t/2+6,class:"sp-sl"},I);Tt.innerHTML=`<tspan class="b">${Ft[nt]}</tspan><tspan dx="8">${lt.toFixed(1)}%</tspan>`}let it={g:I,y0:M,h:_t};return M+=_t,it}),ft=(St[0]+St[1])/Rt*100,ot=z[0].h+z[1].h,yt=de("g",{opacity:0},dt);de("path",{d:`M${at-14},${xt}h-10v${ot}h10`,fill:"none",stroke:"#ffd98a","stroke-width":2},yt);let Mt=de("text",{x:at-32,y:xt+Math.max(18,ot/2+6),"text-anchor":"end",class:"sp-sb"},yt);return Mt.innerHTML=`<tspan x="${at-32}" dy="0">1\xB72\uAE09\uC9C0</tspan><tspan x="${at-32}" dy="30" class="v">${ft.toFixed(1)}%</tspan>`,{layers:z,br:yt}});function Jt(rt){dt.setAttribute("opacity",rt.soilA),!(rt.soilA<=.002)&&Xt.forEach((St,at)=>{St.layers.forEach((Rt,xt)=>{let bt=Dd((rt.soilP-at*.08-xt*.09)/.38);Rt.g.setAttribute("opacity",js(bt*2)),Rt.g.setAttribute("transform",`translate(0 ${(-120*(1-bt)).toFixed(1)})`)}),St.br.setAttribute("opacity",js((rt.soilP-.75)/.2))})}let st=de("g",{opacity:0},t),G=r.lv.kinds.filter(([,rt])=>rt>1e3),et=r.lv.kinds.reduce((rt,[,St])=>rt+St,0),ct=290,B=720,ht=112,mt=["#ff9a5a","#f5c14f","#9fd1ff"];de("circle",{cx:ct,cy:B,r:ht,fill:"none",stroke:"rgba(255,255,255,0.07)","stroke-width":34},st);let Ct=2*Math.PI*ht,Nt=0,qt=G.map(([rt,St],at)=>{let Rt=St/et,xt=de("circle",{cx:ct,cy:B,r:ht,fill:"none",stroke:mt[at],"stroke-width":34,transform:`rotate(${-90+Nt*360} ${ct} ${B})`,"stroke-dasharray":`0 ${Ct}`},st),bt=de("text",{x:ct+ht+60,y:B-40+at*40,class:"sp-dl"},st);return bt.innerHTML=`<tspan fill="${mt[at]}" class="b">${rt}</tspan><tspan dx="10">${Math.round(Rt*100)}%</tspan>`,Nt+=Rt,{c:xt,f:Rt,t:bt}});de("text",{x:ct,y:B+6,"text-anchor":"middle",class:"sp-dc"},st).textContent="\uBD84\uB1E8\uB294",de("text",{x:ct,y:B+32,"text-anchor":"middle",class:"sp-dc2"},st).textContent="\uC5B4\uB290 \uAC00\uCD95\uC5D0\uC11C";function D(rt){st.setAttribute("opacity",rt.lvA),!(rt.lvA<=.002)&&qt.forEach((St,at)=>{let Rt=Dd((rt.lvP-at*.15)/.5);St.c.setAttribute("stroke-dasharray",`${Math.max(0,St.f*Ct*Rt-3)} ${Ct}`),St.t.setAttribute("opacity",js((Rt-.5)/.5))})}function fe(rt,St){vt(rt),Jt(rt),D(rt);let at=rt.rioA>.002||rt.coopA>.002||rt.lvA>.002;at!==o&&(o=at,s.style.visibility=at?"visible":"hidden"),at&&(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,s.width,s.height),i.setTransform(a,0,0,a,0,0),d(rt,St),g(rt,St),x(rt))}return{render:fe,resize:l,coopKinds:r.coopKinds}}var ys=.13392857142857142,c1=ys*16,fo=s=>440*2**((s-69)/12),h1=[[57,60,64,45],[57,60,65,41],[55,60,64,48],[55,59,62,43],[57,60,64,45],[57,60,65,41],[55,59,62,43],[56,59,64,40]];function A0({T:s,voice:t}){let e={pad:[[0,.8],[5,.7],[12,.6],[29,.55],[94,.6],[97,.75],[106,.85]],bass:[[0,0],[4,0],[8,.55],[12,.7],[21,.55],[29,.7],[48,.8],[92,.85],[95,.35],[102,.3],[106,.2]],kick:[[0,0],[5,0],[9,.45],[12,.6],[21,.6],[24,.35],[28,.35],[31,.6],[48,.7],[92,.75],[95,0],[106,0]],hat:[[0,0],[12,0],[15,.25],[21,.2],[24,.1],[29,.15],[33,.3],[48,.4],[92,.45],[94.5,0],[106,0]],snare:[[0,0],[45,0],[49,.22],[92,.28],[94.5,0],[106,0]],arp:[[0,.12],[6,.2],[14,.4],[29,.42],[48,.5],[92,.55],[95,.3],[102,.25],[106,0]],bell:[[0,.45],[6,.25],[12,.12],[21,.15],[24,.4],[28,.18],[32,.08],[94,.1],[97,.35],[106,.6]],lead:[[0,0],[106,0]],cut:[[0,650],[6,1e3],[14,1300],[21,1150],[26,900],[30,1350],[50,1600],[92,1700],[96,1100],[106,1400]]},n=(q,ut)=>{let k=e[q];if(ut<=k[0][0])return k[0][1];for(let Q=1;Q<k.length;Q++)if(ut<=k[Q][0]){let[gt,vt]=k[Q-1],[dt,Lt]=k[Q];return vt+(Lt-vt)*(ut-gt)/(dt-gt)}return k[k.length-1][1]},i=[[0,76,4],[4,74,2],[6,72,2],[8,74,4],[12,76,4],[16,77,6],[22,76,2],[24,74,8],[32,72,4],[36,74,2],[38,76,2],[40,79,6],[46,77,2],[48,76,8],[56,74,8],[64,76,4],[68,74,2],[70,72,2],[72,74,4],[76,76,4],[80,77,6],[86,79,2],[88,81,8],[96,79,4],[100,77,2],[102,76,2],[104,74,6],[110,72,2],[112,71,8],[120,69,8]],r=[0,1,2,4,1,2,4,2,0,1,2,4,2,4,5,4],a=[s.stats,s.rice,s.flow,s.maker].map(q=>q-1.2),o=null,l=null,c=null,h=null,f=null,d=null,u=.7,m=!1,_=!1,p=0,g=0,y=!0,S=new Set,v={lines:t?.lines||[],meta:null,buf:new Map,src:null,id:null,loading:null};function A(){o=new(window.AudioContext||window.webkitAudioContext),l=o.createGain(),l.gain.value=0;let q=o.createDynamicsCompressor();q.threshold.value=-16,q.ratio.value=3,q.attack.value=.005,q.release.value=.25,l.connect(q).connect(o.destination),c=o.createGain(),c.gain.value=.9,c.connect(l),h=o.createGain(),h.gain.value=1.15,h.connect(l),f=o.createConvolver();let ut=o.sampleRate*2.8,k=o.createBuffer(2,ut,o.sampleRate);for(let vt=0;vt<2;vt++){let dt=k.getChannelData(vt);for(let Lt=0;Lt<ut;Lt++)dt[Lt]=(Math.random()*2-1)*(1-Lt/ut)**2.6}f.buffer=k;let Q=o.createGain();Q.gain.value=.32,f.connect(Q).connect(c),d=o.createBuffer(1,o.sampleRate,o.sampleRate);let gt=d.getChannelData(0);for(let vt=0;vt<gt.length;vt++)gt[vt]=Math.random()*2-1}let T=(q,ut)=>{let k={src:q,g:ut};S.add(k),q.onended=()=>S.delete(k)};function x(q,ut=0){if(q.connect(c),ut){let k=o.createGain();k.gain.value=ut,q.connect(k).connect(f)}}function b(q,ut,k,Q,gt,vt=0){q.gain.setValueAtTime(1e-4,ut),q.gain.exponentialRampToValueAtTime(Math.max(2e-4,Q),ut+k),q.gain.exponentialRampToValueAtTime(Math.max(1e-4,vt),ut+k+gt)}function C(q,ut,k,Q,gt,{a:vt=.005,lp:dt=0,q:Lt=.7,detune:Zt=0,send:Ft=0,sustain:Xt=0,vib:Jt=0}={}){if(gt<5e-4)return null;let st=o.createOscillator();st.type=q,st.frequency.value=ut,st.detune.value=Zt;let G=o.createGain();b(G,k,vt,gt,Q,Xt);let et=st;if(dt){let ct=o.createBiquadFilter();ct.type="lowpass",ct.frequency.value=dt,ct.Q.value=Lt,st.connect(ct),et=ct}if(Jt){let ct=o.createOscillator(),B=o.createGain();ct.frequency.value=5,B.gain.value=Jt,ct.connect(B).connect(st.detune),ct.start(k),ct.stop(k+vt+Q+.05)}return et.connect(G),x(G,Ft),st.start(k),st.stop(k+vt+Q+.05),T(st,G),st}function R(q,ut,k,Q,gt,vt=1,dt=0,Lt=.002){if(k<5e-4)return;let Zt=o.createBufferSource();Zt.buffer=d,Zt.loop=ut>.9;let Ft=o.createBiquadFilter();Ft.type=Q,Ft.frequency.value=gt,Ft.Q.value=vt;let Xt=o.createGain();b(Xt,q,Lt,k,ut),Zt.connect(Ft).connect(Xt),x(Xt,dt),Zt.start(q,Math.random()*.5),Zt.stop(q+Lt+ut+.05),T(Zt,Xt)}let L=(q,ut)=>{let k=C("sine",140,q,.4,.85*ut);k&&(k.frequency.setValueAtTime(140,q),k.frequency.exponentialRampToValueAtTime(44,q+.12))},W=(q,ut,k)=>R(q,k?.14:.035,.13*ut,"highpass",8e3,.8),O=(q,ut)=>{R(q,.18,.26*ut,"bandpass",1800,.7,.3),C("triangle",185,q,.08,.13*ut)};function P(q,ut){let k=q*ys,Q=(q%16+16)%16,gt=Math.floor(q/16),vt=h1[(gt%8+8)%8],dt=ct=>n(ct,k),Lt=dt("cut");if(Q===0){let ct=dt("pad");vt.slice(0,3).forEach(B=>[-8,8].forEach(ht=>C("sawtooth",fo(B),ut,c1*1.05,.026*ct,{a:.6,lp:Lt,detune:ht,send:.55,sustain:.014*ct})))}let Zt=dt("bass");Zt&&Q%2===0&&C("sawtooth",fo(vt[3]+(Q%8===6?12:0)),ut,ys*1.6,.17*Zt,{a:.01,lp:160+Lt*.15,q:3});let Ft=dt("kick");Ft&&Q%4===0&&L(ut,Ft);let Xt=dt("hat");Xt&&Q%2===1&&W(ut,Xt*(Q%4===3?1:.55),Q%8===7);let Jt=dt("snare");Jt&&(Q===4||Q===12)&&O(ut,Jt);let st=dt("arp");if(st){let ct=[...vt.slice(0,3),vt[0]+12,vt[1]+12,vt[2]+12];C("sine",fo(ct[r[Q]]+24),ut,.25,.04*st,{a:.008,send:.45})}let G=dt("bell");G&&(Q===0||Q===6||Q===10)&&C("sine",fo(vt[Q===0?0:Q===6?2:1]+24),ut,1.3,.05*G,{send:.75});let et=dt("lead");if(et){let ct=(q%128+128)%128;for(let[B,ht,mt]of i)B===ct&&C("triangle",fo(ht),ut,mt*ys*1.1,.075*et,{a:.02,lp:2600,vib:6,send:.45,sustain:.03*et})}for(let ct of a)ct>=k&&ct<k+ys&&R(ut+(ct-k),1.2,.07,"highpass",5e3,.6,.6,1.1)}async function F(){return v.loading||(v.loading=(async()=>{let q=await fetch(`${t.base}index.json`,{cache:"no-cache"});if(!q.ok)throw new Error("\uB0B4\uB808\uC774\uC158 \uC5C6\uC74C");v.meta=await q.json(),await Promise.all(v.lines.map(async ut=>{let k=v.meta.files?.[ut.id];if(!k)return;let Q=await(await fetch(`${t.base}${k.file}`)).arrayBuffer();v.buf.set(ut.id,await o.decodeAudioData(Q))}))})().catch(()=>{v.meta=null})),v.loading}let V=q=>v.buf.get(q.id)?.duration??v.meta?.files?.[q.id]?.dur??0,N=q=>v.lines.find(ut=>v.buf.has(ut.id)&&q>=ut.at&&q<ut.at+V(ut));function Y(){if(v.src){try{v.src.stop()}catch{}v.src=null}v.id=null}function X(q){c&&c.gain.setTargetAtTime(q?.38:.9,o.currentTime,q?.12:.5)}function j(){let q=o.currentTime;S.forEach(ut=>{try{ut.g.gain.cancelScheduledValues(q),ut.g.gain.setTargetAtTime(1e-4,q,.03),ut.src.stop(q+.15)}catch{}}),S.clear(),Y()}function Z(){l&&l.gain.setTargetAtTime(m?u*.8:0,o.currentTime,.1)}return{get on(){return m},get hasVoice(){return v.buf.size>0},get voiceOn(){return y},async enable(){o||A(),o.state!=="running"&&await o.resume(),m=!0,_=!1,Z(),t&&F()},disable(){m=!1,Z(),o&&(j(),_=!1,X(!1))},setVolume(q){u=q,Z()},setVoice(q){y=q,!q&&o&&(Y(),X(!1))},caption(q){return!m||!y||!v.buf.size?null:N(q)||null},sync(q,ut){if(!o||!m)return;if(!ut){_&&(j(),_=!1,X(!1));return}let k=o.currentTime;for(_&&Math.abs(k-p-q)>.12&&(j(),_=!1),_||(p=k-q+.05,g=Math.ceil(q/ys),_=!0);g*ys<q+.18;)P(g,p+g*ys),g++;if(y&&v.buf.size){let Q=N(q);if(Q&&v.id!==Q.id){Y();let gt=o.createBufferSource();gt.buffer=v.buf.get(Q.id),gt.connect(h);let vt=Math.max(0,q-Q.at),dt=p+Q.at+vt;gt.start(Math.max(k,dt),vt),gt.onended=()=>{v.src===gt&&(v.src=null,X(!1))},v.src=gt,v.id=Q.id,X(!0)}else!Q&&v.id&&(v.id=null)}}}}var T0=[{id:"01",at:.8,text:"\uC9C0\uC5ED \uB18D\uC5C5\uC758 \uBAA8\uB4E0 \uC22B\uC790\uB97C, \uD55C \uD654\uBA74\uC5D0.",read:"\uC9C0\uC5ED \uB18D\uC5C5\uC758 \uBAA8\uB4E0 \uC22B\uC790\uB97C, \uD55C \uD654\uBA74\uC5D0."},{id:"02",at:5.6,text:"168\uAC1C \uC2DC\uAD70\uC744 \uD55C \uD654\uBA74\uC5D0. \uB18D\uACBD\uC9C0 1,118\uB9CC \uD544\uC9C0\uAE4C\uC9C0.",read:"\uBC31\uC721\uC2ED\uD314 \uAC1C \uC2DC\uAD70\uC744 \uD55C \uD654\uBA74\uC5D0. \uB18D\uACBD\uC9C0 \uCC9C\uBC31\uC2ED\uD314\uB9CC \uD544\uC9C0\uAE4C\uC9C0."},{id:"03",at:12.8,text:"\uC2DC\uB3C4\uC640 \uC2DC\uAD70\uC744 \uACE0\uB974\uBA74, \uBAA8\uB4E0 \uC22B\uC790\uAC00 \uADF8 \uC9C0\uC5ED\uC758 \uAC83\uC73C\uB85C \uBC14\uB01D\uB2C8\uB2E4.",read:"\uC2DC\uB3C4\uC640 \uC2DC\uAD70\uC744 \uACE0\uB974\uBA74, \uBAA8\uB4E0 \uC22B\uC790\uAC00 \uADF8 \uC9C0\uC5ED\uC758 \uAC83\uC73C\uB85C \uBC14\uB01D\uB2C8\uB2E4."},{id:"04",at:21.6,text:"\uD1B5\uACC4 \uB4A4\uC758 \uC2E4\uC81C \uB545. \uC704\uC131\uC73C\uB85C \uB17C \uD55C \uD544\uC9C0 \uD55C \uD544\uC9C0\uC758 \uC0DD\uC721\uAE4C\uC9C0 \uBD05\uB2C8\uB2E4.",read:"\uD1B5\uACC4 \uB4A4\uC758 \uC2E4\uC81C \uB545. \uC704\uC131\uC73C\uB85C \uB17C \uD55C \uD544\uC9C0 \uD55C \uD544\uC9C0\uC758 \uC0DD\uC721\uAE4C\uC9C0 \uBD05\uB2C8\uB2E4."},{id:"05",at:29.6,text:"\uC300 \uC218\uD655\uB7C9\uC744 7\uC6D4\uBD80\uD130 \uBBF8\uB9AC. 9\uC6D4 \uC911\uC21C \uC608\uCE21\uC740 \uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1\uACFC \uAC19\uC740 \uC815\uD655\uB3C4\uB97C, 3\uC8FC \uBA3C\uC800 \uB0C5\uB2C8\uB2E4.",read:"\uC300 \uC218\uD655\uB7C9\uC744 \uCE60\uC6D4\uBD80\uD130 \uBBF8\uB9AC. \uAD6C\uC6D4 \uC911\uC21C \uC608\uCE21\uC740 \uAD6D\uAC00\uB370\uC774\uD130\uCC98 \uC2DC\uC6D4 \uC608\uC0C1\uACFC \uAC19\uC740 \uC815\uD655\uB3C4\uB97C, \uC0BC \uC8FC \uBA3C\uC800 \uB0C5\uB2C8\uB2E4."},{id:"06",at:40.6,text:"\uC9C1\uBD88\uAE08, \uC6B0\uB9AC \uC9C0\uC5ED\uC5D4 \uC5BC\uB9C8\uB098 \uC62C\uAE4C\uC694. \uC2DC\uAD70 \uC608\uC0B0\uC744 \uBAA8\uC544 \uB18D\uAC00\uB2F9\uC73C\uB85C \uACAC\uC90D\uB2C8\uB2E4.",read:"\uC9C1\uBD88\uAE08, \uC6B0\uB9AC \uC9C0\uC5ED\uC5D4 \uC5BC\uB9C8\uB098 \uC62C\uAE4C\uC694. \uC2DC\uAD70 \uC608\uC0B0\uC744 \uBAA8\uC544 \uB18D\uAC00\uB2F9\uC73C\uB85C \uACAC\uC90D\uB2C8\uB2E4."},{id:"07",at:48.6,text:"\uC74C\uC131\uC758 \uC218\uBC15\uC740 \uC11C\uC6B8\uB85C. \uB18D\uC0B0\uBB3C\uC774 \uAC00\uB294 \uAE38\uC774 \uBCF4\uC785\uB2C8\uB2E4.",read:"\uC74C\uC131\uC758 \uC218\uBC15\uC740 \uC11C\uC6B8\uB85C. \uB18D\uC0B0\uBB3C\uC774 \uAC00\uB294 \uAE38\uC774 \uBCF4\uC785\uB2C8\uB2E4."},{id:"08",at:54.5,text:"\uB18D\uC0AC\uC6A9 \uC804\uAE30\uB294 \uACC4\uC808\uC744 \uB530\uB77C \uB3D5\uB2C8\uB2E4.",read:"\uB18D\uC0AC\uC6A9 \uC804\uAE30\uB294 \uACC4\uC808\uC744 \uB530\uB77C \uB3D5\uB2C8\uB2E4."},{id:"09",at:59.4,text:"\uB18D\uC2DD\uD488\uC774 \uC9C0\uC5ED\uC5D0 \uB9CC\uB4DC\uB294 200\uC870 \uC6D0\uC758 \uD30C\uAE09\uD6A8\uACFC.",read:"\uB18D\uC2DD\uD488\uC774 \uC9C0\uC5ED\uC5D0 \uB9CC\uB4DC\uB294 \uC774\uBC31\uC870 \uC6D0\uC758 \uD30C\uAE09\uD6A8\uACFC."},{id:"10",at:64.4,text:"63\uB144, 476\uB9CC\uC5D0\uC11C 138\uB9CC\uC73C\uB85C.",read:"\uC721\uC2ED\uC0BC \uB144, \uC0AC\uBC31\uCE60\uC2ED\uC721\uB9CC\uC5D0\uC11C \uBC31\uC0BC\uC2ED\uD314\uB9CC\uC73C\uB85C."},{id:"11",at:69.4,text:"1,110\uAC1C \uB18D\xB7\uCD95\uD611\uC758 \uC7AC\uBB34\uC640 \uC7AC\uD574\uBCF4\uD5D8\uAE4C\uC9C0.",read:"\uCC9C\uBC31\uC5F4 \uAC1C \uB18D\uCD95\uD611\uC758 \uC7AC\uBB34\uC640 \uC7AC\uD574\uBCF4\uD5D8\uAE4C\uC9C0."},{id:"12",at:74.4,text:"\uB18D\uCD0C\uAC1C\uBC1C \uC9C0\uAD6C 3,483\uACF3\uC758 \uC704\uCE58\uC640 \uC608\uC0B0.",read:"\uB18D\uCD0C\uAC1C\uBC1C \uC9C0\uAD6C \uC0BC\uCC9C\uC0AC\uBC31\uD314\uC2ED\uC0BC \uACF3\uC758 \uC704\uCE58\uC640 \uC608\uC0B0."},{id:"13",at:79.4,text:"\uD1A0\uC591\uAC80\uC815 233\uB9CC \uAC74, \uD759\uC774 \uB9D0\uD574 \uC90D\uB2C8\uB2E4.",read:"\uD1A0\uC591\uAC80\uC815 \uC774\uBC31\uC0BC\uC2ED\uC0BC\uB9CC \uAC74, \uD759\uC774 \uB9D0\uD574 \uC90D\uB2C8\uB2E4."},{id:"14",at:84.4,text:"1\uB9CC 5\uCC9C \uAC1C \uAC00\uAE4C\uC6B4 \uB9C8\uC744\uC758 \uAC00\uCD95\uBD84\uB1E8\uAE4C\uC9C0.",read:"\uB9CC \uC624\uCC9C \uAC1C \uAC00\uAE4C\uC6B4 \uB9C8\uC744\uC758 \uAC00\uCD95\uBD84\uB1E8\uAE4C\uC9C0."},{id:"15",at:89.6,text:"45\uC885 \uACF5\uAC1C \uC790\uB8CC, \uB300\uBD80\uBD84 \uC2A4\uC2A4\uB85C \uAC31\uC2E0\uB429\uB2C8\uB2E4.",read:"\uB9C8\uD754\uB2E4\uC12F \uC885 \uACF5\uAC1C \uC790\uB8CC, \uB300\uBD80\uBD84 \uC2A4\uC2A4\uB85C \uAC31\uC2E0\uB429\uB2C8\uB2E4."},{id:"16",at:95,text:"\uACF5\uAC1C\uB41C \uC790\uB8CC\uB97C \uADF8\uB300\uB85C, \uC6B0\uB9AC \uC2DC\uAD70\uC758 \uC22B\uC790\uB85C. \uC608\uCE21\uC740 \uB9DE\uC558\uB294\uC9C0\uAE4C\uC9C0 \uACF5\uAC1C\uD569\uB2C8\uB2E4.",read:"\uACF5\uAC1C\uB41C \uC790\uB8CC\uB97C \uADF8\uB300\uB85C, \uC6B0\uB9AC \uC2DC\uAD70\uC758 \uC22B\uC790\uB85C. \uC608\uCE21\uC740 \uB9DE\uC558\uB294\uC9C0\uAE4C\uC9C0 \uACF5\uAC1C\uD569\uB2C8\uB2E4."},{id:"17",at:102.6,text:"\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310.",read:"\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310."}];var we=window.INTRO,ae=we.facts,xe=(s,t=document)=>t.querySelector(s),kd=(s,t=document)=>[...t.querySelectorAll(s)],oi=xe("#stage"),nh=xe("#player"),Qc=s=>s.split("|")[1].replace(/시부$/,""),tr=s=>Math.round(s).toLocaleString("ko-KR"),F0=(s,t=1)=>`${(s/1e4).toFixed(s>=1e6?0:t)}\uB9CC`,B0=s=>{let t=Math.round(s/100);return t>=1e4?`${Math.floor(t/1e4)}\uC870 ${tr(t%1e4)}\uC5B5`:`${tr(t)}\uC5B5`},E0=s=>`${Math.round(s*100)}%`,f1=Object.entries(we.land.v).filter(([,s])=>s).sort((s,t)=>t[1]-s[1]).slice(0,3),C0=we.rice.fc.at(-1),p1=we.power.k,er=we.power.months,R0=s=>er.reduce((t,e,n)=>e.startsWith(s)?t+p1[n]:t,0),k0=String(+er.at(-1).slice(0,4)-(er.at(-1).endsWith("12")?0:1)),m1=R0(k0)/R0(er[0].slice(0,4)),zd=we.gohyang,IE=zd.years[0],LE=zd.years.at(-1),mo=s=>s.map(t=>`<span class="ln">${[...t].map(e=>`<span class="ch${e===" "?" sp":""}">${e===" "?"&nbsp;":e}</span>`).join("")}</span>`).join(""),jc=s=>`<ul class="pts">${s.map(([t,e])=>`<li><b>${t}</b><span>${e}</span></li>`).join("")}</ul>`,Qs=(s,t,e,n,i,r="",a="")=>`
  <section class="sc ${a}" id="sc-${s}">
    <p class="kicker"><b>${t}</b>${e}</p>
    <h2 class="hl">${mo(n)}</h2>
    ${i?`<p class="it-sub">${i}</p>`:""}
    ${r}
  </section>`,po=s=>`linear-gradient(90deg, ${s.join(", ")})`,Ss=(s,{dec:t=0,suf:e="",from:n}={})=>`<b class="cnt" data-n="${s}" data-dec="${t}" data-suf="${e}"${n!=null?` data-from="${n}"`:""}>${(+s).toFixed(t)}${e}</b>`,ai=we.spots,P0=[...ai.rio.regions].sort((s,t)=>t.lq-s.lq)[0],g1=ai.soil.pg.reduce((s,t)=>s+t,0),_1=(ai.soil.pg[0]+ai.soil.pg[1])/g1*100,DE=[...ai.lv.kinds].sort((s,t)=>t[1]-s[1]),NE=ai.lv.kinds.reduce((s,[,t])=>s+t,0),I0=Object.entries(ai.dev).sort((s,t)=>t[1]-s[1])[0],ih=[{id:"rio",no:"08",name:"\uC9C0\uC5ED\uC0B0\uC5C5\uC5F0\uAD00\uD45C(\uB18D\uC5C5)",href:"rio",big:Ss(Math.round(ai.rio.total/1e6)),unit:"\uC870\uC6D0 \uB18D\uC2DD\uD488 \uC0B0\uCD9C",line:"17\uAC1C \uC2DC\uB3C4\uB9C8\uB2E4 \uB18D\uC2DD\uD488\uC774 \uB9CC\uB4DC\uB294 \uC0DD\uC0B0\xB7\uBD80\uAC00\uAC00\uCE58\xB7\uC77C\uC790\uB9AC \uD30C\uAE09\uD6A8\uACFC",pts:[[`${P0.name} ${P0.lq}`,"\uB18D\uC2DD\uD488 \uD2B9\uD654\uB3C4 1\uC704 \u2014 \uC804\uAD6D \uD3C9\uADE0\uC758 3.6\uBC30"],[`${ae.rio.sectors}\uAC1C \uC0B0\uC5C5`,"\uBB34\uC5C7\uC774 \uB4E4\uC5B4\uAC00\uACE0 \uC5B4\uB514\uC5D0 \uC4F0\uC774\uB294\uC9C0\uAE4C\uC9C0"]]},{id:"employ",no:"09",name:"\uB18D\uC5C5\uACE0\uC6A9",href:"employ",big:Ss(+ae.employ.to-+ae.employ.from+1),unit:"\uB144\uC758 \uB18D\uC5C5 \uC77C\uC790\uB9AC",line:`\uB18D\uB9BC\uC5B4\uC5C5 \uCDE8\uC5C5\uC790 ${Math.round(ae.employ.a0/10)}\uB9CC \uBA85\uC774 ${Math.round(ae.employ.a1/10)}\uB9CC \uBA85\uC774 \uB418\uAE30\uAE4C\uC9C0`,pts:[[`${tr(ae.employ.months)}\uAC1C\uC6D4`,"\uC6D4\uBCC4 \xB7 \uACC4\uC808 \xB7 \uC2DC\uAD70\uBCC4 \xB7 \uC5F0\uB839\xB7\uC885\uC0AC\uC0C1\uC9C0\uC704\xB7\uB178\uB3D9\uC2DC\uAC04"]]},{id:"agfin",no:"10",name:"\uB18D\uC5C5\uAE08\uC735\uBCF4\uD5D8",href:"agfin",big:Ss(ae.agfin.coops),unit:"\uAC1C \uB18D\xB7\uCD95\uD611",line:"\uC870\uD569\uB9C8\uB2E4 \uACF5\uC2DC \uC7AC\uBB34\uB97C \uC9C0\uB3C4 \uC704\uC5D0",pts:[[B0(ae.agfin.paid),`${ae.agfin.year} \uB18D\uC791\uBB3C\uC7AC\uD574\uBCF4\uD5D8 \uBCF4\uD5D8\uAE08 \xB7 \uAC00\uC785 ${F0(ae.agfin.cnt)}\uAC74`],[`${ae.agfin.cats}\uAC1C \uBD84\uC57C`,"\uACFC\uC218\xB7\uC2DD\uB7C9\xB7\uCC44\uC18C\xB7\uC2DC\uC124 \uC7AC\uD574\uBCF4\uD5D8\uC744 \uC2DC\uAD70 \uB2E8\uC704\uB85C"]]},{id:"ruraldev",no:"11",name:"\uB18D\uCD0C\uAC1C\uBC1C",href:"ruraldev",big:Ss(ae.ruraldev.sites),unit:"\uAC1C \uC0AC\uC5C5 \uC9C0\uAD6C",line:"\uB18D\uC5B4\uCD0C\uACF5\uC0AC \uC9C0\uAD6C\uC758 \uC720\uD615\xB7\uC704\uCE58\xB7\uC900\uACF5 \uC608\uC815, \uC608\uC0B0\uD604\uC561\uAE4C\uC9C0",cls:"right",pts:[[`${Qc(I0[0])} ${I0[1]}\uACF3`,"\uC9C0\uAD6C\uAC00 \uAC00\uC7A5 \uB9CE\uC740 \uC2DC\uAD70"],[`${ae.ruraldev.cats}\uAC1C \uAC08\uB798`,"\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5 \uC608\uC0B0\uC744 \uB18D\uAC00\uB2F9\uC73C\uB85C"]]},{id:"soil",no:"12",name:"\uB18D\uACBD\uC9C0 \uD1A0\uC591",href:"soil",big:Ss(Math.round(ae.soil.tests/1e4)),unit:"\uB9CC \uAC74 \uD1A0\uC591\uAC80\uC815",line:`\uD759\uC758 \uC591\uBD84 ${ae.soil.chem}\uAC00\uC9C0\uC640 \uB545\uC758 \uC801\uC131\uB4F1\uAE09`,pts:[[`${_1.toFixed(1)}%`,"\uB17C\uC73C\uB85C 1\xB72\uAE09\uC778 \uB545 \u2014 \uAD6D\uD1A0\uC5D0\uC11C \uC88B\uC740 \uB545\uC740 \uC774\uB9CC\uD07C"],[`${ae.soil.obst}\uAC00\uC9C0`,"\uB4F1\uAE09\uC744 \uB0AE\uCD94\uB294 \uC800\uD574\uC694\uC778\uAE4C\uC9C0"]]},{id:"livestock",no:"13",name:"\uCD95\uC0B0 \uD658\uACBD",href:"livestock",big:Ss(ae.livestock.villages),unit:"\uAC1C \uB9C8\uC744",line:`\uC810 \uD558\uB098\uAC00 \uB9C8\uC744 \uD558\uB098 \u2014 ${ae.livestock.from}~${ae.livestock.to} \uAC00\uCD95\uBD84\uB1E8 \uBC1C\uC0DD`,pts:[]}],x1=[["home","\uC8FC\uC694\uD1B5\uACC4"],["rice","\uBCBC \uC791\uD669"],["rio","\uC0B0\uC5C5\uC5F0\uAD00\uD45C"],["flow","\uBB3C\uB958\uB3D9\uD5A5"],["power","\uB18D\uC0AC\uC6A9 \uC804\uAE30"],["employ","\uB18D\uC5C5\uACE0\uC6A9"],["agfin","\uAE08\uC735\uBCF4\uD5D8"],["jikbul","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791"],["ruraldev","\uB18D\uCD0C\uAC1C\uBC1C"],["soil","\uB18D\uACBD\uC9C0 \uD1A0\uC591"],["livestock","\uCD95\uC0B0 \uD658\uACBD"],["home_sat","\uC704\uC131\uC9C0\uB3C4"],["rice_sat","\uC704\uC131 \uC601\uC0C1"],["home_hn","\uC2DC\uAD70 \uD604\uD669\uD310"],["status","\uC790\uB8CC \uC218\uC9D1 \uD604\uD669"]];oi.insertAdjacentHTML("beforeend",`
  <div class="copy">
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${mo(["\uC9C0\uC5ED\uB18D\uC5C5","\uD604\uD669\uD310"])}</h1>
      <p class="it-sub">\uC9C0\uC5ED \uB18D\uC5C5\uC758 \uBAA8\uB4E0 \uC22B\uC790\uB97C, \uC2DC\uAD70 \uB2E8\uC704\uB85C \uD55C \uD654\uBA74\uC5D0</p>
    </section>
    ${Qs("stats","01","\uC8FC\uC694\uD1B5\uACC4",[`${we.map.sigun.length}\uAC1C \uC2DC\uAD70,`,`${ae.metrics}\uAC1C \uC9C0\uD45C`],"\uC804\uAD6D\xB7\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uAC19\uC740 \uB208\uAE08\uC73C\uB85C",jc([[`${tr(ae.parcels/1e4)}\uB9CC`,"\uD544\uC9C0 \u2014 \uD31C\uB9F5 \uB18D\uACBD\uC9C0\uB97C \uC804\uBD80 \uBC1B\uC544 \uC9C1\uC811 \uBD84\uC11D"],[`${ae.parcelMed}\u33A1`,`\uC804\uAD6D \uB18D\uACBD\uC9C0 \uC911\uC559\uAC12 \xB7 0.1ha \uBBF8\uB9CC\uC774 ${E0(ae.parcelSmall)}`],[E0(ae.paddyArmt),"\uB17C \uACBD\uC9C0\uC815\uB9AC\uC728\uC744 \uC2DC\uAD70\uB9C8\uB2E4 \uACAC\uC900\uB2E4"]]))}
    ${Qs("real","02","\uC2E4\uC81C \uD654\uBA74",["\uACE0\uB974\uBA74, \uADF8 \uC2DC\uAD70\uC758","\uD604\uD669\uD310\uC774 \uB41C\uB2E4"],"\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uACE0\uB974\uAC70\uB098 \uC9C0\uB3C4\uB97C \uB204\uB974\uBA74<br>\uBAA8\uB4E0 \uCE78\uC774 \uADF8 \uC9C0\uC5ED \uC22B\uC790\uB85C \uBC14\uB01D\uB2C8\uB2E4",jc([["\uC804\uB144 \uB300\uBE44","\uC99D\uAC10\uC774 \uC704\uCABD \uB760\uB85C \uD750\uB978\uB2E4"],["\uC2DC\uB3C4 \uC548 \uC21C\uC704","\uC9C0\uB3C4 \uC544\uB798\uC5D0\uC11C \uBC14\uB85C \uBE44\uAD50"],["\uC8FC\uC18C \uACF5\uC720","\uBCF4\uB358 \uD654\uBA74\uC744 \uADF8\uB300\uB85C \uBCF4\uB0B8\uB2E4"]]),"narrow")}
    ${Qs("sat","03","\uC704\uC131\uC9C0\uB3C4",["\uD1B5\uACC4 \uB4A4\uC758","\uC2E4\uC81C \uB545\uC744 \uBCF8\uB2E4"],"",jc([["\uD56D\uACF5\uC601\uC0C1",`\uD31C\uB9F5 \uD544\uC9C0 \xB7 \uC720\uD1B5\uC2DC\uC124 ${tr(ae.facilities)}\uACF3 \xB7 \uC8FC\uC81C\uB3C4`],["\uB17C NDVI","Sentinel-2 10m \u2014 \uB17C\uB9C8\uB2E4 \uBCBC\uAC00 \uC5BC\uB9C8\uB098 \uD478\uB978\uC9C0"],["5\uC77C\uB9C8\uB2E4","\uAD6C\uB984 \uB080 \uB0A0\uC740 \uB808\uC774\uB354\uB85C, 2017\uB144\uBD80\uD130 \uB0A0\uC9DC\uBCC4\uB85C"]]),"narrow")}
    ${Qs("rice","04","\uBCBC \uC791\uD669",["\uC300 \uC218\uD655\uB7C9\uC744","7\uC6D4\uBD80\uD130 \uBBF8\uB9AC"],"\uAE30\uC0C1\xB7\uC704\uC131\xB7\uBCD1\uD574\uCDA9 \uC608\uCC30\uB85C<br>\uC2DC\uAD70\uBCC4 \uB2E8\uC218\uB97C 7\uBC88 \uC608\uCE21",`<div class="big b1">${Ss(C0.y,{dec:1})}<small>kg/10a</small></div>
       <p class="big-cap b1">${we.rice.year} \uC804\uAD6D \uB2E8\uC218 \uC608\uCE21 \xB7 ${C0.lab}</p>
       <div class="big b2">${Ss(ae.riceAcc.m0915,{dec:1,from:ae.riceAcc.norm})}<small>kg \uD3C9\uADE0 \uC624\uCC28</small></div>
       <p class="big-cap b2">9\uC6D4 15\uC77C \uC608\uCE21 \xB7 \uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1 ${ae.riceAcc.stat}kg\uACFC \uAC19\uC740 \uC218\uC900\uC744 3\uC8FC \uBA3C\uC800</p>`)}
    ${Qs("jik","05","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",["\uC9C1\uBD88\uAE08, \uC6B0\uB9AC \uC9C0\uC5ED\uC5D0","\uC5BC\uB9C8\uB098 \uC624\uB098"],"\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5 \uC608\uC0B0\uD604\uC561\uC744<br>\uC790\uB3D9\uC73C\uB85C \uBAA8\uC544 \uC2DC\uAD70\xB7\uB18D\uAC00\uB2F9\uC73C\uB85C",`<ul class="chips"><li><b>${B0(we.jikbul.pubNat)}</b>\uACF5\uC775\uC9C1\uBD88 ${we.jikbul.year}</li><li><b>${we.jikbul.bizCount}\uAC1C</b>\uC2DC\uAD70 \uC138\uBD80\uC0AC\uC5C5</li><li><b>\uACE0\uD5A5\uC0AC\uB791\uAE30\uAE08</b>${zd.govs}\uACF3\uB3C4</li></ul>`)}
    ${Qs("flow","06","\uBB3C\uB958\uB3D9\uD5A5",["\uC218\uBC15 \uD30C\uB81B\uD2B8\uAC00","\uC6C0\uC9C1\uC774\uB294 \uAE38"],`\uBB3C\uB958\uAE30\uAE30 \uACF5\uB3D9\uC774\uC6A9 ${ae.od.years}\uB144 \xB7 ${ae.od.crops}\uAC1C \uD488\uBAA9 \uC911<br>${we.flows.year}\uB144 \uC218\uBC15 \uD30C\uB81B\uD2B8 ${tr(we.flows.total)}\uAC1C\uC758 \uC774\uB3D9`,`<ol class="pairs">${we.flows.top.slice(0,3).map(([s,t,e])=>`<li><span class="o">${Qc(s)}</span><i></i><span class="d">${Qc(t)}</span><b>${tr(e)}\uAC1C</b></li>`).join("")}</ol>`)}
    ${Qs("power","07","\uB18D\uC0AC\uC6A9 \uC804\uAE30",["\uACC4\uC808\uC744 \uB530\uB77C \uB3C4\uB294","\uB18D\uC5C5 \uC804\uB825"],`\uD55C\uC804 ${ae.power.regions}\uAC1C \uC9C0\uC5ED \xB7 ${ae.power.months}\uAC1C\uC6D4`,`<ul class="it-facts">
        <li><b>4\uAC00\uC9C0</b><span>${ae.power.types.join("\xB7")} \uACC4\uC808 \uC720\uD615 \uC790\uB3D9 \uBD84\uB958</span></li>
        <li><b>\uD3C9\uB144 \uBC94\uC704</b><span>\uBC97\uC5B4\uB09C \uC9C0\uC5ED\uC744 \uB2EC\uB9C8\uB2E4 \uC9DA\uB294\uB2E4</span></li>
        <li><b>${m1.toFixed(1)}\uBC30</b><span>${er[0].slice(0,4)}\uB144\uBCF4\uB2E4 \uB298\uC5B4\uB09C ${k0}\uB144 \uC0AC\uC6A9\uB7C9</span></li>
      </ul>`)}
    ${ih.map(s=>`
      <section class="sc spot ${s.cls||""}" id="sc-${s.id}">
        <p class="kicker"><b>${s.no}</b>${s.name}</p>
        <div class="spot-big">${s.big}<small>${s.unit}</small></div>
        <p class="spot-line">${s.line}</p>
        ${s.pts.length?jc(s.pts):""}
      </section>`).join("")}
  </div>
  <div class="labels">${f1.map(([s,t])=>`<div class="lab" data-k="${s}"><b>${Qc(s)}</b><span>${F0(t)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>\uACBD\uC9C0\uBA74\uC801 ${we.land.year}</span><i class="bar" style="background:${po(ho)}"></i><span>\uB192\uC774\xB7\uC0C9\uC774 \uD074\uC218\uB85D \uB113\uB2E4</span></div>
    <div class="it-lg" id="lg-rice"><span>\uD3C9\uB144\uBCF4\uB2E4 \uB0AE\uC74C</span><i class="bar" style="background:${po([Xi.lo,Xi.mid,Xi.hi])}"></i><span>\uB192\uC74C \xB7 ${we.rice.year} \uC2DC\uAD70 \uC608\uCE21</span></div>
    <div class="it-lg" id="lg-jik"><span>\uC801\uC74C</span><i class="bar" style="background:${po(Jr)}"></i><span>\uB9CE\uC74C \xB7 \uB18D\uAC00\uB2F9 \uACF5\uC775\uC9C1\uBD88(\uAE30\uBCF8\uD615) \uC608\uC0B0 ${we.jikbul.year}</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${ni.melonO}"></i><span>\uBCF4\uB0B8 \uC0B0\uC9C0</span><i class="it-dot" style="background:${ni.melonD}"></i><span>\uBC1B\uC740 \uACF3 \xB7 \uC218\uBC15 \uD30C\uB81B\uD2B8 ${we.flows.year}\uB144 ${we.flows.months} \xB7 \uC0C1\uC704 50</span></div>
    <div class="it-lg" id="lg-coop"><i class="it-dot" style="background:#f5a524"></i><span>\uC9C0\uC5ED\uB18D\uD611 ${ai.coopKinds.L}</span><i class="it-dot" style="background:#ff7a59"></i><span>\uCD95\uD611 ${ai.coopKinds.X}</span><i class="it-dot" style="background:#7cc98f"></i><span>\uD488\uBAA9\uB18D\uD611 ${ai.coopKinds.I} \xB7 \uC810 \uD06C\uAE30 = \uC790\uC0B0</span></div>
    <div class="it-lg" id="lg-dev"><span>\uC801\uC74C</span><i class="bar" style="background:${po(Zc)}"></i><span>\uB9CE\uC74C \xB7 \uAE30\uB465 \uB192\uC774 = \uC2DC\uAD70 \uC0AC\uC5C5 \uC9C0\uAD6C \uC218 (\uD55C\uAD6D\uB18D\uC5B4\uCD0C\uACF5\uC0AC)</span></div>
    <div class="it-lg" id="lg-lv"><span>\uB9C8\uC744\uB2F9 \uBD84\uB1E8 \uC801\uC74C</span><i class="bar" style="background:${po(Jc)}"></i><span>\uB9CE\uC74C \xB7 \uAD6D\uB9BD\uD658\uACBD\uACFC\uD559\uC6D0 \uC804\uAD6D\uC624\uC5FC\uC6D0\uC870\uC0AC</span></div>
    <div class="it-lg" id="lg-power"><span>\uC804\uAD6D \uB18D\uC0AC\uC6A9 \uC804\uB825 \uC6D4 \uC0AC\uC6A9\uB7C9 \xB7 ${er[0].replace("-",".")}~${er.at(-1).replace("-",".")}</span></div>
  </div>`);var Ve=y0(oi,we,["home","home_jn","home_hn","home_sat","rice_sat"]);M0(oi,x1);var Ms=we.shots.ndvi||{};oi.insertAdjacentHTML("beforeend",`
  <div class="nd" id="nd">
    <div class="nd-frame">
      <img class="nd-w" src="assets/intro/shots/ndvi_wide.webp" alt="" decoding="async" style="transform-origin:${(Ms.fx??.3)*100}% ${(Ms.fy??.42)*100}%">
      <img class="nd-z" src="assets/intro/shots/ndvi_zoom.webp" alt="" decoding="async" style="transform-origin:40% 63%">
      <img class="nd-c" src="assets/intro/shots/ndvi_close.webp" alt="" decoding="async">
      <span class="nd-ring" style="left:${(Ms.fx??.3)*100}%;top:${(Ms.fy??.42)*100}%"></span>
      <div class="nd-tag"><b>${Ms.where||"\uAE40\uC81C\uC2DC"} \uB17C NDVI</b><span>Sentinel-2 \xB7 ${Ms.date?Ms.date.replace(/-/g,"."):""} \xB7 \uAD6C\uB984 ${Ms.cloud??"\u2013"}%</span></div>
      <div class="nd-lg"><span>\uB0AE\uC74C</span><i></i><span>\uB192\uC74C \xB7 \uBCBC\uAC00 \uD478\uB97C\uC218\uB85D \uCD08\uB85D</span></div>
    </div>
  </div>`);var z0=(s,t,e,n,i)=>(oi.insertAdjacentHTML("beforeend",`<div class="mini" id="mini-${s}" style="left:${e}px;top:${n}px;width:${i}px"><div class="scr-bar"><i></i><i></i><i></i><span class="scr-url">ag-rstat.vercel.app/${t}</span></div><div class="mini-view" style="height:${Math.round(i*9/16)}px"><img src="assets/intro/shots/${t}.webp" alt="" decoding="async"></div></div>`),xe(`#mini-${s}`));z0("rio","rio",150,560,600);z0("employ","employ",1250,96,560);oi.insertAdjacentHTML("beforeend",`
  <div class="wall-copy" id="sc-wall">
    <p class="kicker"><b>14</b>\uC790\uB8CC \uC218\uC9D1 \uD604\uD669</p>
    <h2 class="hl">${mo([`\uC790\uB8CC ${ae.status.items}\uC885, ${ae.status.auto}\uC885\uC740 \uC2A4\uC2A4\uB85C \uAC31\uC2E0`])}</h2>
    <p class="it-sub">${ae.status.orgs}\uAC1C \uAE30\uAD00\uC758 \uACF5\uAC1C \uC790\uB8CC \xB7 \uBB34\uC5C7\uC744 \uC5B8\uC81C \uBC1B\uC558\uB294\uC9C0\uAE4C\uC9C0 \uACF5\uAC1C</p>
  </div>
  <div class="maker" id="sc-maker">
    <figure class="mk-photo"><img src="assets/maker.webp" alt="" width="360" height="540"></figure>
    <div class="mk-text">
      <p class="kicker"><b>15</b>\uB9CC\uB4E0 \uC774</p>
      <h2 class="hl">${mo(["\uB9CC\uB4E0 \uC774\uC758 \uC0DD\uAC01"])}</h2>
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
    <h2 class="hl">${mo(["\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310"])}</h2>
    <p class="url">ag-rstat.vercel.app</p>
    <p class="srcs">\uAD6D\uAC00\uB370\uC774\uD130\uCC98 \xB7 \uD55C\uAD6D\uC740\uD589 \xB7 \uD55C\uC804 \xB7 \uB18D\uCD0C\uC9C4\uD765\uCCAD \xB7 \uC9C0\uBC29\uC7AC\uC815365 \uB4F1 ${ae.status.orgs}\uAC1C \uAE30\uAD00 \uACF5\uAC1C \uC790\uB8CC</p>
    <div class="btns"><a class="btn pri" href="./">\uD604\uD669\uD310 \uC5F4\uAE30</a><button type="button" class="btn" id="again">\uB2E4\uC2DC \uBCF4\uAE30</button></div>
  </div>`);var tn={scene:0,bgI:0,glow:0,morph:0,pAlpha:1,mapAlpha:0,rise:0,tilt:0,orbit:0,camDist:23.5,camX:0,camY:0,mapShift:300,mapLift:0,riceColor:0,jikColor:0,mapDim:0,glAlpha:1,labels:0,riceAlpha:0,riceLine:0,riceFc:0,accAlpha:0,riceAcc:0,bdAlpha:0,bdBars:0,bdSplit:0,flows:0,flowAlpha:0,spiral:0,powerAlpha:0,rioA:0,rioP:0,empA:0,empP:0,coopA:0,coopP:0,devRise:0,devColor:0,soilA:0,soilP:0,lvA:0,lvP:0},jr=m0(xe("#gl"),we),V0=g0(xe("#fx"),we,jr),v1=_0(xe("#rice"),we),y1=x0(xe("#rice"),we),G0=w0(xe("#sp"),xe("#spsvg"),we,jr),_o={draw(){},canvas:xe("#bg"),kind:"\u2026"},M1=kd(".lab",oi),th=960,Od=540;function H0(){let s=nh.clientWidth/hn;oi.style.transform=`scale(${s})`;let t=Math.min(window.devicePixelRatio||1,1.75),e=Math.min(2880,Math.max(640,Math.round(hn*s*t))),n=Math.round(e*qi/hn);jr.resize(e,n),V0.resize(e,n),G0.resize(e,n),th=Math.max(480,Math.round(e/2)),Od=Math.round(th*qi/hn),_o.canvas.width=th,_o.canvas.height=Od}new ResizeObserver(H0).observe(nh);var pt={open:0,stats:5,real:12,sat:21,rice:29,jik:40,flow:48,power:54,spot:59,SPOT:5,wall:89.4,maker:94.4,end:102,total:106},xo=[{t:pt.open,name:"\uC5F4\uAE30"},{t:pt.stats,name:"\uC8FC\uC694\uD1B5\uACC4",href:"./"},{t:pt.real,name:"\uC2E4\uC81C \uD654\uBA74",href:"./"},{t:pt.sat,name:"\uC704\uC131\uC9C0\uB3C4",href:"./"},{t:pt.rice,name:"\uBCBC \uC791\uD669",href:"rice"},{t:pt.jik,name:"\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",href:"jikbul"},{t:pt.flow,name:"\uBB3C\uB958\uB3D9\uD5A5",href:"flow"},{t:pt.power,name:"\uB18D\uC0AC\uC6A9 \uC804\uAE30",href:"power"},...ih.map((s,t)=>({t:pt.spot+t*pt.SPOT,name:s.name,href:s.href})),{t:pt.wall,name:"\uC790\uB8CC \uC218\uC9D1 \uD604\uD669",href:"status"},{t:pt.maker,name:"\uB9CC\uB4E0\uC774",href:"about"},{t:pt.end,name:"\uB2EB\uAE30"}],nr=pt.total,kt=Vn.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),$t=(s,t,e,n="power2.inOut")=>kt.to(tn,{...s,duration:e,ease:n},t),li=(s,t,e=1.2)=>$t({scene:s},t,e);function wi(s,t){let e=typeof s=="string"?xe(s):s;kt.set(e,{autoAlpha:1,y:0},t).fromTo(e.querySelector(".kicker"),{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.6,ease:"power3.out"},t);let n=e.querySelectorAll(".hl .ch");n.length&&kt.fromTo(n,{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.85,stagger:Math.min(.028,.5/n.length),ease:"expo.out"},t+.1);let i=e.querySelector(".it-sub");i&&kt.fromTo(i,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.7,ease:"power2.out"},t+.5)}var Ai=(s,t)=>kt.to(typeof s=="string"?xe(s):s,{autoAlpha:0,y:-24,duration:.45,ease:"power2.in"},t),ir=(s,t,e=.16)=>{let n=kd(`${s} .pts li, ${s} .it-facts li, ${s} .pairs li, ${s} .chips li`);n.length&&kt.fromTo(n,{autoAlpha:0,x:-16},{autoAlpha:1,x:0,stagger:e,duration:.55,ease:"power2.out"},t)},W0=[];function Vd(s,t,e){let n=+s.dataset.n,i=+(s.dataset.dec||0),r=s.dataset.suf||"",a=s.dataset.from!=null?+s.dataset.from:i?n*.94:0,o={v:a,last:""};W0.push({elm:s,o,dec:i,suf:r}),kt.fromTo(o,{v:a},{v:n,duration:e,ease:"power3.out"},t)}var bs=(s,t,e)=>kt.fromTo(`#lg-${s}`,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},t).to(`#lg-${s}`,{autoAlpha:0,duration:.4},e),X0=Ve.zoom,Gd=(s,t,e=.4)=>{Object.entries(Ve.imgs).forEach(([n,i])=>kt.to(i,{autoAlpha:n===s?1:0,duration:e,ease:"power1.inOut"},t))},S1=(s,t,e,n="sine.inOut",i)=>kt.to(X0,{...Ve.focus(s,i),duration:e,ease:n},t);function Hd(s,t,e=.8){let n=Ve.at(s);kt.to(Ve.cursor,{x:n.x,y:n.y,duration:e,ease:"power3.inOut"},t-e).fromTo(Ve.cursor.querySelector(".ripple"),{scale:.2,autoAlpha:.9},{scale:2.6,autoAlpha:0,duration:.55,ease:"power2.out"},t).fromTo(Ve.cursor.querySelector("svg"),{scale:1},{scale:.82,duration:.08,yoyo:!0,repeat:1,ease:"power1.inOut"},t)}Vn.set(".sc, .it-lg, .outro, .maker, .wall-copy, #scr-wrap, #wall-wrap, .mk, #nd, .nd-z, .nd-c, .mini",{autoAlpha:0});Vn.set(X0,{scale:1,x:0,y:0,transformOrigin:"0 0"});Vn.set(Ve.cursor,{x:1100,y:645,autoAlpha:0});Vn.set(Ve.cursor.querySelector(".ripple"),{autoAlpha:0});Vn.set(Object.values(Ve.imgs),{autoAlpha:0});$t({bgI:1},0,1.6,"power1.out");$t({morph:1},.15,3.6,"none");$t({glow:.5},1.2,2.2);wi("#sc-open",.45);kt.fromTo("#sc-open .mark",{scale:.4,rotate:-90},{scale:1,rotate:0,duration:1.2,ease:"back.out(2)"},.45);Ai("#sc-open",4.4);$t({mapAlpha:1},3.3,1.2);$t({pAlpha:.32},3.8,1);li(1,4.6,1.4);$t({tilt:1},5,2.3);$t({rise:1},5.5,2.5,"power2.out");$t({orbit:.36,camDist:21.2},5,6.8,"sine.inOut");$t({pAlpha:0},6.2,1.2);wi("#sc-stats",5.1);ir("#sc-stats",6.4,.22);bs("stats",6,11.2);$t({labels:1},8,.6,"power2.out");$t({labels:0},11,.4);Ai("#sc-stats",11.3);li(2,11.6);$t({glAlpha:0},11.5,.8);var Fn=pt.real;kt.set(Ve.imgs.home,{autoAlpha:1},Fn).fromTo("#scr-wrap",{autoAlpha:0,rotateY:-30,rotateX:10,x:220,z:-320},{autoAlpha:1,rotateY:-8,rotateX:3,x:0,z:0,duration:1.4,ease:"expo.out"},Fn);wi("#sc-real",Fn+.3);ir("#sc-real",Fn+1.6,.2);kt.set(Ve.cursor,{autoAlpha:1},Fn+1.2);Hd(Ve.box("home","#sido"),Fn+2.6,1.2);Gd("home_jn",Fn+2.75);Hd(Ve.box("home_jn","#sgg"),Fn+4.2,.9);Gd("home_hn",Fn+4.35);kt.to(Ve.cursor,{autoAlpha:0,duration:.3},Fn+5);[[".ticker","\uC804\uB144 \uB300\uBE44 \uC99D\uAC10\uC774 \uD750\uB978\uB2E4","bottom"],["#map-card","\uC9C0\uB3C4\uB97C \uB204\uB974\uBA74 \uADF8 \uC2DC\uAD70\uC73C\uB85C","top"],[".col-right","\uC791\uBB3C\xB7\uC18C\uB4DD\xB7\uC608\uC0B0\xB7\uB18D\uAC00\uACBD\uC81C","top"]].forEach(([s,t,e],n)=>{let i=Ve.mark(`r${n}`,Ve.box("home",s),t,e);i&&kt.fromTo(i,{autoAlpha:0,scale:1.04},{autoAlpha:1,scale:1,duration:.45,ease:"power2.out"},Fn+5.2+n*.55).to(i,{autoAlpha:0,duration:.3},Fn+8.3)});kt.to("#scr-wrap",{rotateY:-4,rotateX:1.5,duration:7,ease:"sine.inOut"},Fn+1.4);li(3,pt.sat-.4);Ai("#sc-real",pt.sat-.3);kt.set(Ve.cursor,{autoAlpha:1},pt.sat-1);Hd(Ve.box("home_hn","#view-btn"),pt.sat+.1,.9);Gd("home_sat",pt.sat+.25,.5);kt.to(Ve.cursor,{autoAlpha:0,duration:.3},pt.sat+.7);wi("#sc-sat",pt.sat+.3);ir("#sc-sat",pt.sat+1.4,.5);S1([300,120,960,600],pt.sat+.8,3.4,"sine.inOut",1);kt.to("#scr-wrap",{autoAlpha:0,scale:.92,rotateY:-16,x:-80,duration:.7,ease:"power2.in"},pt.sat+2.6);kt.set("#nd",{autoAlpha:1},pt.sat+2.8).fromTo("#nd .nd-frame",{autoAlpha:0,scale:.9,rotateY:14},{autoAlpha:1,scale:1,rotateY:0,duration:1,ease:"expo.out"},pt.sat+2.8).fromTo("#nd .nd-w",{scale:1,autoAlpha:1},{scale:2.1,duration:1.8,ease:"power2.in"},pt.sat+3.6).fromTo("#nd .nd-ring",{autoAlpha:0,scale:2},{autoAlpha:1,scale:1,duration:.5,ease:"power2.out"},pt.sat+3.2).to("#nd .nd-ring",{autoAlpha:0,scale:.4,duration:.4},pt.sat+4.4).fromTo("#nd .nd-z",{autoAlpha:0,scale:1.06},{autoAlpha:1,scale:1,duration:.5,ease:"power1.out"},pt.sat+5.1).to("#nd .nd-z",{scale:2.07,duration:1.3,ease:"power2.in"},pt.sat+5.8).fromTo("#nd .nd-c",{autoAlpha:0,scale:1.04},{autoAlpha:1,scale:1.12,duration:1.4,ease:"sine.out"},pt.sat+6.9).fromTo("#nd .nd-tag, #nd .nd-lg",{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,stagger:.1},pt.sat+3.4).to("#nd",{autoAlpha:0,duration:.5,ease:"power2.in"},pt.rice-.55);Ai("#sc-sat",pt.rice-.6);li(4,pt.rice-.4);kt.set(tn,{riceColor:1,jikColor:0,mapDim:0,rise:0,tilt:.24,orbit:0,camDist:23,camX:0,camY:0,labels:0,pAlpha:0},pt.rice-.3);$t({glAlpha:1},pt.rice-.25,.9);wi("#sc-rice",pt.rice+.2);kt.set("#sc-rice .b2",{autoAlpha:0},pt.rice);$t({riceAlpha:1},pt.rice+.4,.6,"power1.out");$t({riceLine:1},pt.rice+.6,1.9,"power1.inOut");$t({riceFc:1},pt.rice+2.3,1.9,"power1.out");kt.fromTo("#sc-rice .b1",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.1,duration:.6,ease:"power2.out"},pt.rice+2.2);Vd(xe("#sc-rice .b1 .cnt"),pt.rice+2.2,2);bs("rice",pt.rice+.8,pt.jik-.4);$t({riceAlpha:0},pt.rice+5.4,.5);kt.to("#sc-rice .b1",{autoAlpha:0,y:-10,duration:.4},pt.rice+5.4);$t({accAlpha:1},pt.rice+5.7,.4,"none");$t({riceAcc:1},pt.rice+5.8,2.6,"power1.out");kt.fromTo("#sc-rice .b2",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},pt.rice+5.9);Vd(xe("#sc-rice .b2 .cnt"),pt.rice+5.9,2.4);$t({accAlpha:0},pt.jik-.5,.4);Ai("#sc-rice",pt.jik-.5);li(5,pt.jik-.3);$t({riceColor:0,jikColor:1},pt.jik-.2,1.2);$t({orbit:.14,tilt:.42,camDist:22},pt.jik-.2,7.6,"sine.inOut");wi("#sc-jik",pt.jik+.2);bs("jik",pt.jik+.6,pt.flow-.4);$t({bdAlpha:1},pt.jik+.8,.4,"none");$t({bdBars:1},pt.jik+.9,1.8,"power1.out");$t({bdSplit:1},pt.jik+2.5,2.2,"power1.out");ir("#sc-jik",pt.jik+1,.18);$t({bdAlpha:0},pt.flow-.5,.4);Ai("#sc-jik",pt.flow-.5);li(6,pt.flow-.3);$t({jikColor:0,mapDim:1,tilt:0,orbit:0,camDist:15.2,camX:.5,camY:1.5},pt.flow-.3,1.3);$t({flowAlpha:1},pt.flow+.4,.3,"none");$t({flows:1},pt.flow+.4,2.7,"power1.out");wi("#sc-flow",pt.flow+.3);ir("#sc-flow",pt.flow+1.6,.14);bs("flow",pt.flow+.8,pt.power-.6);$t({flowAlpha:0},pt.power-.5,.6);Ai("#sc-flow",pt.power-.5);$t({glAlpha:0},pt.power-.4,.8);li(7,pt.power-.4);$t({powerAlpha:1},pt.power-.1,.5,"power1.out");$t({spiral:1},pt.power,3.3,"power1.inOut");$t({glow:.32},pt.power-.4,1);wi("#sc-power",pt.power+.1);ir("#sc-power",pt.power+1.3,.2);bs("power",pt.power+.4,pt.spot-.6);$t({powerAlpha:0},pt.spot-.5,.5);Ai("#sc-power",pt.spot-.5);var ge=s=>pt.spot+s*pt.SPOT;function b1(s){let t=ih[s],e=ge(s),n=xe(`#sc-${t.id}`);li(8+s,e-.4,1),wi(n,e),kt.fromTo(n.querySelectorAll(".spot-big, .spot-line"),{autoAlpha:0,y:16},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power3.out"},e+.15),Vd(n.querySelector(".cnt"),e+.15,1.6),ir(`#sc-${t.id}`,e+1.3,.3),Ai(n,e+pt.SPOT-.45)}ih.forEach((s,t)=>b1(t));$t({rioA:1},ge(0)-.2,.5,"power1.out");$t({rioP:1},ge(0)+.1,2.6,"power2.out");$t({rioA:0},ge(1)-.5,.45);var q0=(s,t,e,n)=>kt.fromTo(`#mini-${s}`,{autoAlpha:0,...n},{autoAlpha:1,x:0,y:0,rotateY:0,duration:.9,ease:"expo.out"},t).fromTo(`#mini-${s} img`,{scale:1},{scale:1.14,duration:e-t,ease:"sine.inOut"},t).to(`#mini-${s}`,{autoAlpha:0,duration:.4},e-.45);q0("rio",ge(0)+.9,ge(1),{y:40});q0("employ",ge(1)+.5,ge(2),{x:60});$t({empA:1},ge(1)-.1,.4,"none");$t({empP:1},ge(1)+.3,3.2,"power1.inOut");$t({empA:0},ge(2)-.5,.45);kt.set(tn,{mapDim:1,riceColor:0,jikColor:0,devColor:0,rise:0,devRise:0,tilt:0,orbit:0,camDist:23,camX:0,camY:0,mapShift:300,labels:0},ge(2)-.6);$t({glAlpha:1},ge(2)-.5,.7);$t({coopA:1},ge(2)-.1,.3,"none");$t({coopP:1},ge(2)+.2,2.8,"power1.inOut");bs("coop",ge(2)+.5,ge(3)-.4);$t({coopA:0},ge(3)-.5,.45);$t({mapDim:0,devColor:1,mapShift:-330,tilt:.95,orbit:-.42,camDist:20.5},ge(3)-.5,1.5);$t({devRise:1},ge(3)+.4,2.4,"power2.out");$t({orbit:-.12},ge(3)+1,3.6,"sine.inOut");bs("dev",ge(3)+.6,ge(4)-.4);$t({glAlpha:0},ge(4)-.5,.6);$t({soilA:1},ge(4)-.1,.4,"none");$t({soilP:1},ge(4)+.2,2.8,"power1.out");$t({soilA:0},ge(5)-.5,.45);kt.set(tn,{tilt:0,orbit:0,camDist:22,mapShift:260,devRise:0,devColor:0,mapDim:.9},ge(5)-.5);$t({lvA:1},ge(5)-.1,.3,"none");$t({lvP:1},ge(5)+.2,3,"power1.inOut");bs("lv",ge(5)+.6,pt.wall-.4);$t({lvA:0},pt.wall-.5,.45);li(14,pt.wall-.4);kt.set("#wall-wrap",{autoAlpha:1},pt.wall).fromTo("#wall .wt",{autoAlpha:0,z:-600,rotateX:-40},{autoAlpha:1,z:0,rotateX:0,duration:1.1,stagger:{each:.05,from:"center"},ease:"power3.out"},pt.wall).fromTo("#wall",{rotateZ:-7,rotateX:26,y:40},{rotateZ:-3,rotateX:18,y:0,duration:5,ease:"sine.inOut"},pt.wall).to("#wall-wrap",{autoAlpha:0,duration:.5},pt.maker-.5);wi("#sc-wall",pt.wall+.6);Ai("#sc-wall",pt.maker-.5);li(15,pt.maker-.4);kt.set("#sc-maker",{autoAlpha:1,y:0},pt.maker).fromTo("#sc-maker .mk-photo",{autoAlpha:0,y:40,scale:.94},{autoAlpha:1,y:0,scale:1,duration:1.2,ease:"power3.out"},pt.maker+.1).fromTo("#sc-maker .kicker",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.5},pt.maker+.4).fromTo("#sc-maker .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.04,ease:"expo.out"},pt.maker+.5).fromTo("#sc-maker .mk-phil li",{autoAlpha:0,x:-18},{autoAlpha:1,x:0,duration:.6,stagger:.55,ease:"power2.out"},pt.maker+1.4).fromTo("#sc-maker .mk-quote, #sc-maker .mk-mail",{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.7,stagger:.4,ease:"power2.out"},pt.maker+4).to("#sc-maker",{autoAlpha:0,y:-20,duration:.5,ease:"power2.in"},pt.end-.5);li(16,pt.end-.3);$t({glow:.55},pt.end-.3,1.2);kt.set("#sc-end",{autoAlpha:1},pt.end).fromTo("#sc-end .mark",{scale:.3,rotate:-120,autoAlpha:0},{scale:1,rotate:0,autoAlpha:1,duration:1.1,ease:"back.out(1.8)"},pt.end).fromTo("#sc-end .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.035,ease:"expo.out"},pt.end+.15).fromTo("#sc-end .url, #sc-end .srcs, #sc-end .btns",{autoAlpha:0,y:12},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},pt.end+.6).set({},{},nr);var Kr=Cd.map(([s,t])=>[xs(s).map(e=>e/255),xs(t).map(e=>e/255)]),ri=new Float32Array(16),w1=performance.now();function L0(){let s=kt.time(),t=(performance.now()-w1)/1e3,e=Math.min(Cd.length-2,Math.floor(tn.scene)),n=tn.scene-e;for(let i=0;i<3;i++)ri[4+i]=Kr[e][0][i]+(Kr[e+1][0][i]-Kr[e][0][i])*n,ri[8+i]=Kr[e][1][i]+(Kr[e+1][1][i]-Kr[e][1][i])*n;ri[0]=t,ri[1]=tn.bgI,ri[2]=th,ri[3]=Od,ri[12]=(hn/2+tn.mapShift)/hn,ri[13]=.5,ri[14]=.42,ri[15]=tn.glow,_o.draw(ri),jr.render(tn,t),V0.render(tn,s),v1.render(tn),y1.render(tn),G0.render(tn,s),M1.forEach((i,r)=>{let a=jr.top(i.dataset.k);if(!a||tn.labels<=.01){i.style.opacity=0;return}let[o,l]=jr.project(a[0],a[1],a[2]),c=Math.min(1,Math.max(0,tn.labels*1.4-r*.2));i.style.opacity=c,i.style.transform=`translate(${o.toFixed(1)}px, ${(l-12*(1-c)).toFixed(1)}px)`}),W0.forEach(i=>{let r=i.o.v.toFixed(i.dec).replace(/\B(?=(\d{3})+(?!\d))/g,",")+i.suf;r!==i.o.last&&(i.o.last=r,i.elm.textContent=r)}),C1()}var Fd=xe("#play"),bi=xe("#track"),A1=xe("#fill"),T1=xe("#time"),Nd=xe("#go"),$0=xe("#chaps"),E1=xe("#chapname");bi.setAttribute("aria-valuemax",nr);$0.innerHTML=xo.map(s=>`<button type="button" data-t="${s.t}" style="left:${s.t/nr*100}%" title="${s.name}" aria-label="${s.name}\uBD80\uD130 \uBCF4\uAE30"></button>`).join("");var Y0=[...$0.children],D0=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`,N0=-1,U0="";function C1(){let s=kt.time();A1.style.transform=`scaleX(${s/nr})`,T1.textContent=`${D0(s)} / ${D0(nr)}`,bi.setAttribute("aria-valuenow",s.toFixed(1));let t=xo.reduce((n,i,r)=>s>=i.t-.01?r:n,0);if(t!==N0){N0=t,Y0.forEach((i,r)=>{i.classList.toggle("on",r===t),i.classList.toggle("past",r<t)});let n=xo[t];E1.textContent=`${String(t).padStart(2,"0")} ${n.name}`,Nd.hidden=!n.href,n.href&&(Nd.href=n.href,Nd.textContent=`${n.name} \uD654\uBA74 \uC5F4\uAE30 \u2192`)}let e=kt.progress()>=1?"end":kt.paused()?"paused":"playing";e!==U0&&(U0=e,Fd.dataset.state=e,Fd.setAttribute("aria-label",e==="playing"?"\uBA48\uCDA4":e==="end"?"\uB2E4\uC2DC \uBCF4\uAE30":"\uC7AC\uC0DD"),nh.classList.toggle("is-paused",e==="paused"))}function Z0(){kt.progress()>=1?kt.restart():kt.paused(!kt.paused())}Fd.addEventListener("click",Z0);xe("#again").addEventListener("click",()=>kt.restart());xe("#bigplay").addEventListener("click",()=>kt.progress()>=1?kt.restart():kt.play());Y0.forEach(s=>s.addEventListener("click",t=>{t.stopPropagation(),kt.seek(+s.dataset.t+.001,!1),kt.progress()<1&&kt.play()}));var J0=!1,K0=s=>{let t=bi.getBoundingClientRect();kt.seek(Math.min(1,Math.max(0,(s.clientX-t.left)/t.width))*nr,!1)};bi.addEventListener("pointerdown",s=>{s.target.closest("button")||(J0=!kt.paused()&&kt.progress()<1,kt.pause(),bi.setPointerCapture(s.pointerId),K0(s))});bi.addEventListener("pointermove",s=>{bi.hasPointerCapture(s.pointerId)&&K0(s)});bi.addEventListener("pointerup",s=>{bi.releasePointerCapture(s.pointerId),J0&&kt.play()});bi.addEventListener("keydown",s=>{let t={ArrowLeft:-5,ArrowRight:5}[s.key];t&&(s.preventDefault(),s.stopPropagation(),kt.seek(Math.min(nr,Math.max(0,kt.time()+t)),!1))});document.addEventListener("keydown",s=>{if(!s.target.closest("input, textarea, select, .it-track")){if(s.key===" "||s.key==="k"){if(s.target.closest("a, button")&&s.key===" ")return;s.preventDefault(),Z0()}else if(s.key==="Home")kt.seek(0,!1);else if(s.key==="ArrowRight"){let t=xo.find(e=>e.t>kt.time()+.05);t&&kt.seek(t.t+.001,!1)}else if(s.key==="ArrowLeft"){let t=[...xo].reverse().find(e=>e.t<kt.time()-.6);kt.seek((t?t.t:0)+.001,!1)}}});var Ud=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&!kt.paused()?(kt.pause(),Ud=!0):!document.hidden&&Ud&&(Ud=!1,kt.play())});var Je=A0({T:pt,voice:{lines:T0,base:"assets/intro/voice/"}}),go=xe("#snd"),Bd=xe("#vol"),j0=xe("#sndhint"),eh=xe("#vo");oi.insertAdjacentHTML("beforeend",'<div class="cap" id="cap" aria-live="off"><span></span></div>');var Q0=xe("#cap"),R1=Q0.firstElementChild,O0=null;Vn.ticker.add(()=>{let s=Je.caption(kt.time()),t=s?s.id:null;t!==O0&&(O0=t,s&&(R1.textContent=s.text),Q0.classList.toggle("on",!!s)),eh.hidden=!Je.hasVoice});eh.addEventListener("click",()=>{Je.setVoice(!Je.voiceOn),eh.setAttribute("aria-pressed",Je.voiceOn),sh.set("intro-vo",Je.voiceOn?"1":"0")});var sh={get:s=>{try{return localStorage.getItem(s)}catch{return null}},set:(s,t)=>{try{localStorage.setItem(s,t)}catch{}}},tg=+(sh.get("intro-vol")??70);sh.get("intro-vo")==="0"&&(Je.setVoice(!1),eh.setAttribute("aria-pressed","false"));Bd.value=tg;Je.setVolume(tg/100);function eg(){go.setAttribute("aria-pressed",Je.on),go.setAttribute("aria-label",Je.on?"\uC18C\uB9AC \uB044\uAE30":"\uC18C\uB9AC \uCF1C\uAE30"),go.dataset.on=Je.on?"1":"0",Je.on&&(j0.hidden=!0)}async function Wd(){await Je.enable(),eg()}go.addEventListener("click",async()=>{Je.on?Je.disable():await Wd(),eg()});j0.addEventListener("click",Wd);Bd.addEventListener("input",async()=>{let s=+Bd.value;Je.setVolume(s/100),sh.set("intro-vol",s),s>0&&!Je.on&&await Wd()});document.addEventListener("keydown",s=>{s.key==="m"&&!s.target.closest("input, textarea, select")&&go.click()});Vn.ticker.add(()=>Je.sync(kt.time(),!kt.paused()&&kt.progress()<1));window.__intro={tl:kt,S:tn};(async()=>{_o=await lp(xe("#bg"),{gpu:!/[?&]gl\b/.test(location.search)}),oi.dataset.gpu=_o.kind,H0();let s=Promise.all([document.fonts.ready,...kd("img",oi).map(t=>t.decode?t.decode().catch(()=>{}):Promise.resolve())]);try{await Promise.race([s,new Promise(t=>setTimeout(t,4e3))])}catch{}Vn.ticker.lagSmoothing(250,33),Vn.ticker.add(L0),L0(),nh.classList.add("ready"),requestAnimationFrame(()=>{kt.seek(0,!1),kt.play(0)})})();})();
