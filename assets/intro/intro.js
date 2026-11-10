(()=>{function Ii(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function uf(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var Sn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ca={duration:.5,overwrite:!1,delay:0},Sh,je,Ce,Vn=1e8,ve=1/Vn,ph=Math.PI*2,rg=ph/4,ag=0,df=Math.sqrt,og=Math.cos,lg=Math.sin,He=function(t){return typeof t=="string"},Oe=function(t){return typeof t=="function"},Di=function(t){return typeof t=="number"},No=function(t){return typeof t>"u"},pi=function(t){return typeof t=="object"},Mn=function(t){return t!==!1},bh=function(){return typeof window<"u"},bo=function(t){return Oe(t)||He(t)},ff=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},rn=Array.isArray,cg=/random\([^)]+\)/g,hg=/,\s*/g,nf=/(?:-?\.?\d|\.)+/gi,wh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ds=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,oh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ah=/[+-]=-?[.\d]+/,ug=/[^,'"\[\]\s]+/gi,dg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,De,di,mh,Th,Rn={},Eo={},pf,mf=function(t){return(Eo=lr(t,Rn))&&an},Uo=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},ha=function(t,e){return!e&&console.warn(t)},gf=function(t,e){return t&&(Rn[t]=e)&&Eo&&(Eo[t]=e)||Rn},ua=function(){return 0},fg={suppressEvents:!0,isStart:!0,kill:!1},wo={suppressEvents:!0,kill:!1},pg={suppressEvents:!0},Eh={},ts=[],gh={},_f,vn={},lh={},sf=30,Ao=[],Ch="",Rh=function(t){var e=t[0],n,i;if(pi(e)||Oe(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Ao.length;i--&&!Ao[i].targetTest(e););n=Ao[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Dh(t[i],n)))||t.splice(i,1);return t},es=function(t){return t._gsap||Rh(Hn(t))[0]._gsap},Ph=function(t,e,n){return(n=t[e])&&Oe(n)?t[e]():No(n)&&t.getAttribute&&t.getAttribute(e)||n},fn=function(t,e){return(t=t.split(",")).forEach(e)||t},Be=function(t){return Math.round(t*1e5)/1e5||0},Le=function(t){return Math.round(t*1e7)/1e7||0},Ns=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},mg=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Co=function(){var t=ts.length,e=ts.slice(0),n,i;for(gh={},ts.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Ih=function(t){return!!(t._initted||t._startAt||t.add)},xf=function(t,e,n,i){ts.length&&!je&&Co(),t.render(e,n,i||!!(je&&e<0&&Ih(t))),ts.length&&!je&&Co()},vf=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(ug).length<2?e:He(t)?t.trim():t},yf=function(t){return t},Pn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},gg=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},lr=function(t,e){for(var n in e)t[n]=e[n];return t},rf=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=pi(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},Ro=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},aa=function(t){var e=t.parent||De,n=t.keyframes?gg(rn(t.keyframes)):Pn;if(Mn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},_g=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Mf=function(t,e,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},Fo=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,a=e._next;r?r._next=a:t[n]===e&&(t[n]=a),a?a._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},ns=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Ps=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},xg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},_h=function(t,e,n,i){return t._startAt&&(je?t._startAt.revert(wo):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},vg=function s(t){return!t||t._ts&&s(t.parent)},af=function(t){return t._repeat?cr(t._tTime,t=t.duration()+t._rDelay)*t:0},cr=function(t,e){var n=Math.floor(t=Le(t/e));return t&&n===t?n-1:n},Po=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Oo=function(t){return t._end=Le(t._start+(t._tDur/Math.abs(t._ts||t._rts||ve)||0))},Bo=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Le(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Oo(t),n._dirty||Ps(n,t)),t},Sf=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Po(t.rawTime(),e),(!e._dur||ma(0,e.totalDuration(),n)-e._tTime>ve)&&e.render(n,!0)),Ps(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ve}},fi=function(t,e,n,i){return e.parent&&ns(e),e._start=Le((Di(n)?n:!n&&Io(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==De?Gn(t,n,e):t._time)+e._delay),e._end=Le(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Mf(t,e,"_first","_last",t._sort?"_start":0),Io(e)||(t._recent=e),i||Sf(t,e),t._ts<0&&Bo(t,t._tTime),t},bf=function(t,e){return(Rn.ScrollTrigger||Uo("scrollTrigger",e))&&Rn.ScrollTrigger.create(e,t)},wf=function(t,e,n,i,r){if(Fh(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!je&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&_f!==yn.frame)return ts.push(t),t._lazy=[r,i],1},yg=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},Io=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Mg=function(t,e,n,i){var r=t.ratio,a=e<0||!e&&(!t._start&&yg(t)&&!(!t._initted&&Io(t))||(t._ts<0||t._dp._ts<0)&&!Io(t))?0:1,o=t._rDelay,l=0,c,h,f;if(o&&t._repeat&&(l=ma(0,t._tDur,e),h=cr(l,o),t._yoyo&&h&1&&(a=1-a),h!==cr(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||je||i||t._zTime===ve||!e&&t._zTime){if(!t._initted&&wf(t,e,i,n,l))return;for(f=t._zTime,t._zTime=e||(n?ve:0),n||(n=e&&!f),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&_h(t,e,n,!0),t._onUpdate&&!n&&Cn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Cn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&ns(t,1),!n&&!je&&(Cn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Sg=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},hr=function(t,e,n,i){var r=t._repeat,a=Le(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Le(a*(r+1)+t._rDelay*r):a,o>0&&!i&&Bo(t,t._tTime=t._tDur*o),t.parent&&Oo(t),n||Ps(t.parent,t),t},of=function(t){return t instanceof sn?Ps(t):hr(t,t._dur)},bg={_start:0,endTime:ua,totalDuration:ua},Gn=function s(t,e,n){var i=t.labels,r=t._recent||bg,a=t.duration()>=Vn?r.endTime(!1):t._dur,o,l,c;return He(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(rn(n)?n[0]:n).totalDuration()),o>1?s(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},oa=function(t,e,n){var i=Di(e[1]),r=(i?2:1)+(t<2?0:1),a=e[r],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Mn(l.vars.inherit)&&l.parent;a.immediateRender=Mn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new ke(e[0],a,e[r+1])},is=function(t,e){return t||t===0?e(t):e},ma=function(t,e,n){return n<t?t:n>e?e:n},Qe=function(t,e){return!He(t)||!(e=dg.exec(t))?"":e[1]},wg=function(t,e,n){return is(n,function(i){return ma(t,e,i)})},xh=[].slice,Af=function(t,e){return t&&pi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&pi(t[0]))&&!t.nodeType&&t!==di},Ag=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return He(i)&&!e||Af(i,1)?(r=n).push.apply(r,Hn(i)):n.push(i)})||n},Hn=function(t,e,n){return Ce&&!e&&Ce.selector?Ce.selector(t):He(t)&&!n&&(mh||!ur())?xh.call((e||Th).querySelectorAll(t),0):rn(t)?Ag(t,n):Af(t)?xh.call(t,0):t?[t]:[]},vh=function(t){return t=Hn(t)[0]||ha("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Hn(e,n.querySelectorAll?n:n===t?ha("Invalid scope")||Th.createElement("div"):t)}},Tf=function(t){return t.sort(function(){return .5-Math.random()})},Ef=function(t){if(Oe(t))return t;var e=pi(t)?t:{each:t},n=Is(e.ease),i=e.from||0,r=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,f=i;return He(i)?h=f={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],f=i[1]),function(d,u,m){var _=(m||e).length,p=a[_],g,v,b,M,A,T,x,S,P;if(!p){if(P=e.grid==="auto"?0:(e.grid||[1,Vn])[1],!P){for(x=-Vn;x<(x=m[P++].getBoundingClientRect().left)&&P<_;);P<_&&P--}for(p=a[_]=[],g=l?Math.min(P,_)*h-.5:i%P,v=P===Vn?0:l?_*f/P-.5:i/P|0,x=0,S=Vn,T=0;T<_;T++)b=T%P-g,M=v-(T/P|0),p[T]=A=c?Math.abs(c==="y"?M:b):df(b*b+M*M),A>x&&(x=A),A<S&&(S=A);i==="random"&&Tf(p),p.max=x-S,p.min=S,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(P>_?_-1:c?c==="y"?_/P:P:Math.max(P,_/P))||0)*(i==="edges"?-1:1),p.b=_<0?r-_:r,p.u=Qe(e.amount||e.each)||0,n=n&&_<0?Bg(n):n}return _=(p[d]-p.min)/p.max||0,Le(p.b+(n?n(_):_)*p.v)+p.u}},yh=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Le(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Di(n)?0:Qe(n))}},Cf=function(t,e){var n=rn(t),i,r;return!n&&pi(t)&&(i=n=t.radius||Vn,t.values?(t=Hn(t.values),(r=!Di(t[0]))&&(i*=i)):t=yh(t.increment)),is(e,n?Oe(t)?function(a){return r=t(a),Math.abs(r-a)<=i?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=Vn,h=0,f=t.length,d,u;f--;)r?(d=t[f].x-o,u=t[f].y-l,d=d*d+u*u):d=Math.abs(t[f]-o),d<c&&(c=d,h=f);return h=!i||c<=i?t[h]:a,r||h===a||Di(a)?h:h+Qe(a)}:yh(t))},Rf=function(t,e,n,i){return is(rn(t)?!e:n===!0?!!(n=0):!i,function(){return rn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},Tg=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,a){return a(r)},i)}},Eg=function(t,e){return function(n){return t(parseFloat(n))+(e||Qe(n))}},Cg=function(t,e,n){return If(t,e,0,1,n)},Pf=function(t,e,n){return is(n,function(i){return t[~~e(i)]})},Rg=function s(t,e,n){var i=e-t;return rn(t)?Pf(t,s(0,t.length),e):is(n,function(r){return(i+(r-t)%i)%i+t})},Pg=function s(t,e,n){var i=e-t,r=i*2;return rn(t)?Pf(t,s(0,t.length-1),e):is(n,function(a){return a=(r+(a-t)%r)%r||0,t+(a>i?r-a:a)})},dr=function(t){return t.replace(cg,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(hg);return Rf(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},If=function(t,e,n,i,r){var a=e-t,o=i-n;return is(r,function(l){return n+((l-t)/a*o||0)})},Ig=function s(t,e,n,i){var r=isNaN(t+e)?0:function(u){return(1-u)*t+u*e};if(!r){var a=He(t),o={},l,c,h,f,d;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(rn(t)&&!rn(e)){for(h=[],f=t.length,d=f-2,c=1;c<f;c++)h.push(s(t[c-1],t[c]));f--,r=function(m){m*=f;var _=Math.min(d,~~m);return h[_](m-_)},n=e}else i||(t=lr(rn(t)?[]:{},t));if(!h){for(l in e)Nh.call(o,t,l,"get",e[l]);r=function(m){return kh(m,o)||(a?t.p:t)}}}return is(n,r)},lf=function(t,e,n){var i=t.labels,r=Vn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},Cn=function(t,e,n){var i=t.vars,r=i[e],a=Ce,o=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&ts.length&&Co(),o&&(Ce=o),h=l?r.apply(c,l):r.call(c),Ce=a,h},sa=function(t){return ns(t),t.scrollTrigger&&t.scrollTrigger.kill(!!je),t.progress()<1&&Cn(t,"onInterrupt"),t},or,Lf=[],Df=function(t){if(t)if(t=!t.name&&t.default||t,bh()||t.headless){var e=t.name,n=Oe(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:ua,render:kh,add:Nh,kill:Yg,modifier:$g,rawVars:0},a={targetTest:0,get:0,getSetter:ko,aliases:{},register:0};if(ur(),t!==i){if(vn[e])return;Pn(i,Pn(Ro(t,r),a)),lr(i.prototype,lr(r,Ro(t,a))),vn[i.prop=e]=i,t.targetTest&&(Ao.push(i),Eh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}gf(e,i),t.register&&t.register(an,i,pn)}else Lf.push(t)},Se=255,ra={aqua:[0,Se,Se],lime:[0,Se,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Se],navy:[0,0,128],white:[Se,Se,Se],olive:[128,128,0],yellow:[Se,Se,0],orange:[Se,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Se,0,0],pink:[Se,192,203],cyan:[0,Se,Se],transparent:[Se,Se,Se,0]},ch=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Se+.5|0},Nf=function(t,e,n){var i=t?Di(t)?[t>>16,t>>8&Se,t&Se]:0:ra.black,r,a,o,l,c,h,f,d,u,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),ra[t])i=ra[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Se,i&Se,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Se,t&Se]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(nf),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,r=h*2-a,i.length>3&&(i[3]*=1),i[0]=ch(l+1/3,r,a),i[1]=ch(l,r,a),i[2]=ch(l-1/3,r,a);else if(~t.indexOf("="))return i=t.match(wh),n&&i.length<4&&(i[3]=1),i}else i=t.match(nf)||ra.transparent;i=i.map(Number)}return e&&!m&&(r=i[0]/Se,a=i[1]/Se,o=i[2]/Se,f=Math.max(r,a,o),d=Math.min(r,a,o),h=(f+d)/2,f===d?l=c=0:(u=f-d,c=h>.5?u/(2-f-d):u/(f+d),l=f===r?(a-o)/u+(a<o?6:0):f===a?(o-r)/u+2:(r-a)/u+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Uf=function(t){var e=[],n=[],i=-1;return t.split(Li).forEach(function(r){var a=r.match(Ds)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},cf=function(t,e,n){var i="",r=(t+i).match(Li),a=e?"hsla(":"rgba(",o=0,l,c,h,f;if(!r)return t;if(r=r.map(function(d){return(d=Nf(d,e,1))&&a+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=Uf(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Li,"1").split(Ds),f=c.length-1;o<f;o++)i+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(Li),f=c.length-1;o<f;o++)i+=c[o]+r[o];return i+c[f]},Li=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in ra)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),Lg=/hsl[a]?\(/,Lh=function(t){var e=t.join(" "),n;if(Li.lastIndex=0,Li.test(e))return n=Lg.test(e),t[1]=cf(t[1],n),t[0]=cf(t[0],n,Uf(t[1])),!0},da,yn=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,a=r,o=[],l,c,h,f,d,u,m=function _(p){var g=s()-i,v=p===!0,b,M,A,T;if((g>t||g<0)&&(n+=g-e),i+=g,A=i-n,b=A-a,(b>0||v)&&(T=++f.frame,d=A-f.time*1e3,f.time=A=A/1e3,a+=b+(b>=r?0:r-b),M=1),v||(l=c(_)),M)for(u=0;u<o.length;u++)o[u](A,d,T,p)};return f={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){pf&&(!mh&&bh()&&(di=mh=window,Th=di.document||{},Rn.gsap=an,(di.gsapVersions||(di.gsapVersions=[])).push(an.version),mf(Eo||di.GreenSockGlobals||!di.gsap&&di||{}),Lf.forEach(Df)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=h||function(p){return setTimeout(p,a-f.time*1e3+1|0)},da=1,m(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),da=0,c=ua},lagSmoothing:function(p,g){t=p||1/0,e=Math.min(g||33,t)},fps:function(p){r=1e3/(p||240),a=f.time*1e3+r},add:function(p,g,v){var b=g?function(M,A,T,x){p(M,A,T,x),f.remove(b)}:p;return f.remove(p),o[v?"unshift":"push"](b),ur(),b},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&u>=g&&u--},_listeners:o},f})(),ur=function(){return!da&&yn.wake()},he={},Dg=/^[\d.\-M][\d.\-,\s]/,Ng=/["']/g,Ug=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(Ng,"").trim():+c,i=l.substr(o+1).trim();return e},Fg=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Og=function(t){var e=(t+"").split("("),n=he[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Ug(e[1])]:Fg(t).split(",").map(vf)):he._CE&&Dg.test(t)?he._CE("",t):n},Bg=function(t){return function(e){return 1-t(1-e)}},Is=function(t,e){return t&&(Oe(t)?t:he[t]||Og(t))||e},Us=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},a;return fn(t,function(o){he[o]=Rn[o]=r,he[a=o.toLowerCase()]=n;for(var l in r)he[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=he[o+"."+l]=r[l]}),r},Ff=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},hh=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),a=r/ph*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*lg((h-a)*r)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Ff(o);return r=ph/r,l.config=function(c,h){return s(t,c,h)},l},uh=function s(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:Ff(n);return i.config=function(r){return s(t,r)},i};fn("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Us(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});he.Linear.easeNone=he.none=he.Linear.easeIn;Us("Elastic",hh("in"),hh("out"),hh());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(o){return o<e?s*o*o:o<n?s*Math.pow(o-1.5/t,2)+.75:o<i?s*(o-=2.25/t)*o+.9375:s*Math.pow(o-2.625/t,2)+.984375};Us("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Us("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Us("Circ",function(s){return-(df(1-s*s)-1)});Us("Sine",function(s){return s===1?1:-og(s*rg)+1});Us("Back",uh("in"),uh("out"),uh());he.SteppedEase=he.steps=Rn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,a=1-ve;return function(o){return((i*ma(0,a,o)|0)+r)*n}}};ca.ease=he["quad.out"];fn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Ch+=s+","+s+"Params,"});var Dh=function(t,e){this.id=ag++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Ph,this.set=e?e.getSetter:ko},fa=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,hr(this,+e.duration,1,1),this.data=e.data,Ce&&(this._ctx=Ce,Ce.data.push(this)),da||yn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,hr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(ur(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Bo(this,n),!r._dp||r.parent||Sf(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&fi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ve||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),xf(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+af(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+af(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?cr(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-ve?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?Po(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-ve?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||r>0&&r<o)&&this.totalTime(ma(-Math.abs(this._delay),o,r),i!==!1),Oo(this),xg(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{ur(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,r=this.progress()===1&&Math.abs(this._zTime)!==ve,a;if(r)for(this._tTime-=ve,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+ve){r=!1;break}a=a._next}this.totalTime(i,r)}return this},t.startTime=function(n){if(arguments.length){this._start=Le(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&fi(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Mn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Po(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=pg);var i=je;return je=n,Ih(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),je=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,of(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,of(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Gn(this,n),Mn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Mn(i)),this._dur||(this._zTime=-ve),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ve:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ve,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-ve)},t.eventCallback=function(n,i,r){var a=this.vars;return arguments.length>1?(i?(a[n]=i,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(a){var o=Oe(n)?n:yf,l=function(){var h=i.then;i.then=null,r&&r(),Oe(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){sa(this)},s})();Pn(fa.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ve,_prom:0,_ps:!1,_rts:1});var sn=(function(s){uf(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=Mn(n.sortChildren),De&&fi(n.parent||De,Ii(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&bf(Ii(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,a){return oa(0,arguments,this),this},e.from=function(i,r,a){return oa(1,arguments,this),this},e.fromTo=function(i,r,a,o){return oa(2,arguments,this),this},e.set=function(i,r,a){return r.duration=0,r.parent=this,aa(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new ke(i,r,Gn(this,a),1),this},e.call=function(i,r,a){return fi(this,ke.delayedCall(0,i,r),a)},e.staggerTo=function(i,r,a,o,l,c,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new ke(i,a,Gn(this,l)),this},e.staggerFrom=function(i,r,a,o,l,c,h){return a.runBackwards=1,aa(a).immediateRender=Mn(a.immediateRender),this.staggerTo(i,r,a,o,l,c,h)},e.staggerFromTo=function(i,r,a,o,l,c,h,f){return o.startAt=a,aa(o).immediateRender=Mn(o.immediateRender),this.staggerTo(i,r,o,l,c,h,f)},e.render=function(i,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Le(i),f=this._zTime<0!=i<0&&(this._initted||!c),d,u,m,_,p,g,v,b,M,A,T,x;if(this!==De&&h>l&&i>=0&&(h=l),h!==this._tTime||a||f){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),d=h,M=this._start,b=this._ts,g=!b,f&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,a);if(d=Le(h%p),h===l?(_=this._repeat,d=c):(A=Le(h/p),_=~~A,_&&_===A&&(d=c,_--),d>c&&(d=c)),A=cr(this._tTime,p),!o&&this._tTime&&A!==_&&this._tTime-A*p-this._dur<=0&&(A=_),T&&_&1&&(d=c-d,x=1),_!==A&&!this._lock){var S=T&&A&1,P=S===(T&&_&1);if(_<A&&(S=!S),o=S?0:h%c?c:h,this._lock=1,this.render(o||(x?0:Le(_*p)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&Cn(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,A=_),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,P&&(this._lock=2,o=S?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=Sg(this,Le(o),Le(d)),v&&(h-=d-(d=v._start))),this._tTime=h,this._time=d,this._act=!!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!r&&!A&&(Cn(this,"onStart"),this._tTime!==h))return this;if(d>=o&&i>=0)for(u=this._first;u;){if(m=u._next,(u._act||d>=u._start)&&u._ts&&v!==u){if(u.parent!==this)return this.render(i,r,a);if(u.render(u._ts>0?(d-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(d-u._start)*u._ts,r,a),d!==this._time||!this._ts&&!g){v=0,m&&(h+=this._zTime=-ve);break}}u=m}else{u=this._last;for(var R=i<0?i:d;u;){if(m=u._prev,(u._act||R<=u._end)&&u._ts&&v!==u){if(u.parent!==this)return this.render(i,r,a);if(u.render(u._ts>0?(R-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(R-u._start)*u._ts,r,a||je&&Ih(u)),d!==this._time||!this._ts&&!g){v=0,m&&(h+=this._zTime=R?-ve:ve);break}}u=m}}if(v&&!r&&(this.pause(),v.render(d>=o?0:-ve)._zTime=d>=o?1:-1,this._ts))return this._start=M,Oo(this),this.render(i,r,a);this._onUpdate&&!r&&Cn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(M===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&ns(this,1),!r&&!(i<0&&!o)&&(h||o||!l)&&(Cn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var a=this;if(Di(r)||(r=Gn(this,r,i)),!(i instanceof fa)){if(rn(i))return i.forEach(function(o){return a.add(o,r)}),this;if(He(i))return this.addLabel(i,r);if(Oe(i))i=ke.delayedCall(0,i);else return this}return this!==i?fi(this,i,r):this},e.getChildren=function(i,r,a,o){i===void 0&&(i=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Vn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof ke?r&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===i)return r[a]},e.remove=function(i){return He(i)?this.removeLabel(i):Oe(i)?this.killTweensOf(i):(i.parent===this&&Fo(this,i),i===this._recent&&(this._recent=this._last),Ps(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Le(yn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=Gn(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,a){var o=ke.delayedCall(0,r||ua,a);return o.data="isPause",this._hasPause=1,fi(this,o,Gn(this,i))},e.removePause=function(i){var r=this._first;for(i=Gn(this,i);r;)r._start===i&&r.data==="isPause"&&ns(r),r=r._next},e.killTweensOf=function(i,r,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Qi!==o[l]&&o[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var a=[],o=Hn(i),l=this._first,c=Di(r),h;l;)l instanceof ke?mg(l._targets,o)&&(c?(!Qi||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(h=l.getTweensOf(o,r)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,r){r=r||{};var a=this,o=Gn(a,i),l=r,c=l.startAt,h=l.onStart,f=l.onStartParams,d=l.immediateRender,u,m=ke.to(a,Pn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||ve,onStart:function(){if(a.pause(),!u){var p=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==p&&hr(m,p,0,1).render(m._time,!0,!0),u=1}h&&h.apply(m,f||[])}},r));return d?m.render(0):m},e.tweenFromTo=function(i,r,a){return this.tweenTo(r,Pn({startAt:{time:Gn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),lf(this,Gn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),lf(this,Gn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ve)},e.shiftChildren=function(i,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Le(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=i);return Ps(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ps(this)},e.totalDuration=function(i){var r=0,a=this,o=a._last,l=Vn,c,h,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,fi(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(r-=h,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=Le(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;hr(a,a===De&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(De._ts&&(xf(De,Po(i,De)),_f=yn.frame),yn.frame>=sf){sf+=Sn.autoSleep||120;var r=De._first;if((!r||!r._ts)&&Sn.autoSleep&&yn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||yn.sleep()}}},t})(fa);Pn(sn.prototype,{_lock:0,_hasPause:0,_forcing:0});var kg=function(t,e,n,i,r,a,o){var l=new pn(this._pt,t,e,0,1,Bh,null,r),c=0,h=0,f,d,u,m,_,p,g,v;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=dr(i)),a&&(v=[n,i],a(v,t,e),n=v[0],i=v[1]),d=n.match(oh)||[];f=oh.exec(i);)m=f[0],_=i.substring(c,f.index),u?u=(u+1)%5:_.substr(-5)==="rgba("&&(u=1),m!==d[h++]&&(p=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:m.charAt(1)==="="?Ns(p,m)-p:parseFloat(m)-p,m:u&&u<4?Math.round:0},c=oh.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Ah.test(i)||g)&&(l.e=0),this._pt=l,l},Nh=function(t,e,n,i,r,a,o,l,c,h){Oe(i)&&(i=i(r||0,t,a));var f=t[e],d=n!=="get"?n:Oe(f)?c?t[e.indexOf("set")||!Oe(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,u=Oe(f)?c?Wg:Bf:Oh,m;if(He(i)&&(~i.indexOf("random(")&&(i=dr(i)),i.charAt(1)==="="&&(m=Ns(d,i)+(Qe(d)||0),(m||m===0)&&(i=m))),!h||d!==i||Mh)return!isNaN(d*i)&&i!==""?(m=new pn(this._pt,t,e,+d||0,i-(d||0),typeof f=="boolean"?qg:kf,0,u),c&&(m.fp=c),o&&m.modifier(o,this,t),this._pt=m):(!f&&!(e in t)&&Uo(e,i),kg.call(this,t,e,d,i,u,l||Sn.stringFilter,c))},zg=function(t,e,n,i,r){if(Oe(t)&&(t=la(t,r,e,n,i)),!pi(t)||t.style&&t.nodeType||rn(t)||ff(t))return He(t)?la(t,r,e,n,i):t;var a={},o;for(o in t)a[o]=la(t[o],r,e,n,i);return a},Uh=function(t,e,n,i,r,a){var o,l,c,h;if(vn[t]&&(o=new vn[t]).init(r,o.rawVars?e[t]:zg(e[t],i,r,a,n),n,i,a)!==!1&&(n._pt=l=new pn(n._pt,r,t,0,1,o.render,o,0,o.priority),n!==or))for(c=n._ptLookup[n._targets.indexOf(r)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Qi,Mh,Fh=function s(t,e,n){var i=t.vars,r=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,f=i.yoyoEase,d=i.keyframes,u=i.autoRevert,m=t._dur,_=t._startAt,p=t._targets,g=t.parent,v=g&&g.data==="nested"?g.vars.targets:p,b=t._overwrite==="auto"&&!Sh,M=t.timeline,A=i.easeReverse||f,T,x,S,P,R,D,W,O,C,k,G,U,j;if(M&&(!d||!r)&&(r="none"),t._ease=Is(r,ca.ease),t._rEase=A&&(Is(A)||t._ease),t._from=!M&&!!i.runBackwards,t._from&&(t.ratio=1),!M||d&&!i.stagger){if(O=p[0]?es(p[0]).harness:0,U=O&&i[O.prop],T=Ro(i,Eh),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!u?_.render(-1,!0):_.revert(h&&m?wo:fg),_._lazy=0),a){if(ns(t._startAt=ke.set(p,Pn({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&Mn(l),startAt:null,delay:0,onUpdate:c&&function(){return Cn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(je||!o&&!u)&&t._startAt.revert(wo),o&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&m&&!_){if(e&&(o=!1),S=Pn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Mn(l),immediateRender:o,stagger:0,parent:g},T),U&&(S[O.prop]=U),ns(t._startAt=ke.set(p,S)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(je?t._startAt.revert(wo):t._startAt.render(-1,!0)),t._zTime=e,!o)s(t._startAt,ve,ve);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&Mn(l)||l&&!m,x=0;x<p.length;x++){if(R=p[x],W=R._gsap||Rh(p)[x]._gsap,t._ptLookup[x]=k={},gh[W.id]&&ts.length&&Co(),G=v===p?x:v.indexOf(R),O&&(C=new O).init(R,U||T,t,G,v)!==!1&&(t._pt=P=new pn(t._pt,R,C.name,0,1,C.render,C,0,C.priority),C._props.forEach(function(q){k[q]=P}),C.priority&&(D=1)),!O||U)for(S in T)vn[S]&&(C=Uh(S,T,t,G,R,v))?C.priority&&(D=1):k[S]=P=Nh.call(t,R,S,"get",T[S],G,v,0,i.stringFilter);t._op&&t._op[x]&&t.kill(R,t._op[x]),b&&t._pt&&(Qi=t,De.killTweensOf(R,k,t.globalTime(e)),j=!t.parent,Qi=0),t._pt&&l&&(gh[W.id]=1)}D&&zh(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!j,d&&e<=0&&M.render(Vn,!0,!0)},Gg=function(t,e,n,i,r,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,f,d,u;if(!c)for(c=t._ptCache[e]=[],d=t._ptLookup,u=t._targets.length;u--;){if(h=d[u][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Mh=1,t.vars[e]="+=0",Fh(t,o),Mh=0,l?ha(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(u=c.length;u--;)f=c[u],h=f._pt||f,h.s=(i||i===0)&&!r?i:h.s+(i||0)+a*h.c,h.c=n-h.s,f.e&&(f.e=Be(n)+Qe(f.e)),f.b&&(f.b=h.s+Qe(f.b))},Vg=function(t,e){var n=t[0]?es(t[0]).harness:0,i=n&&n.aliases,r,a,o,l;if(!i)return e;r=lr({},e);for(a in i)if(a in r)for(l=i[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},Hg=function(t,e,n,i){var r=e.ease||i||"power1.inOut",a,o;if(rn(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:r})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},la=function(t,e,n,i,r){return Oe(t)?t.call(e,n,i,r):He(t)&&~t.indexOf("random(")?dr(t):t},Lo=Ch+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Of={};fn(Lo+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Of[s]=1});Lo=Lo.split(",");var ke=(function(s){uf(t,s);function t(n,i,r,a){var o;typeof i=="number"&&(r.duration=i,i=r,r=null),o=s.call(this,a?i:aa(i))||this;var l=o.vars,c=l.duration,h=l.delay,f=l.immediateRender,d=l.stagger,u=l.overwrite,m=l.keyframes,_=l.defaults,p=l.scrollTrigger,g=i.parent||De,v=(rn(n)||ff(n)?Di(n[0]):"length"in i)?[n]:Hn(n),b,M,A,T,x,S,P,R;if(o._targets=v.length?Rh(v):ha("GSAP target "+n+" not found. https://gsap.com",!Sn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=u,m||d||bo(c)||bo(h)){i=o.vars;var D=i.easeReverse||i.yoyoEase;if(b=o.timeline=new sn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:v}),b.kill(),b.parent=b._dp=Ii(o),b._start=0,d||bo(c)||bo(h)){if(T=v.length,P=d&&Ef(d),pi(d))for(x in d)~Lo.indexOf(x)&&(R||(R={}),R[x]=d[x]);for(M=0;M<T;M++)A=Ro(i,Of),A.stagger=0,D&&(A.easeReverse=D),R&&lr(A,R),S=v[M],A.duration=+la(c,Ii(o),M,S,v),A.delay=(+la(h,Ii(o),M,S,v)||0)-o._delay,!d&&T===1&&A.delay&&(o._delay=h=A.delay,o._start+=h,A.delay=0),b.to(S,A,P?P(M,S,v):0),b._ease=he.none;b.duration()?c=h=0:o.timeline=0}else if(m){aa(Pn(b.vars.defaults,{ease:"none"})),b._ease=Is(m.ease||i.ease||"none");var W=0,O,C,k;if(rn(m))m.forEach(function(G){return b.to(v,G,">")}),b.duration();else{A={};for(x in m)x==="ease"||x==="easeEach"||Hg(x,m[x],A,m.easeEach);for(x in A)for(O=A[x].sort(function(G,U){return G.t-U.t}),W=0,M=0;M<O.length;M++)C=O[M],k={ease:C.e,duration:(C.t-(M?O[M-1].t:0))/100*c},k[x]=C.v,b.to(v,k,W),W+=k.duration;b.duration()<c&&b.to({},{duration:c-b.duration()})}}c||o.duration(c=b.duration())}else o.timeline=0;return u===!0&&!Sh&&(Qi=Ii(o),De.killTweensOf(v),Qi=0),fi(g,Ii(o),r),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(f||!c&&!m&&o._start===Le(g._time)&&Mn(f)&&vg(Ii(o))&&g.data!=="nested")&&(o._tTime=-ve,o.render(Math.max(0,-h)||0)),p&&bf(Ii(o),p),o}var e=t.prototype;return e.render=function(i,r,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,f=i>l-ve&&!h?l:i<ve?0:i,d,u,m,_,p,g,v,b;if(!c)Mg(this,i,r,a);else if(f!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(d=f,b=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,a);if(d=Le(f%_),f===l?(m=this._repeat,d=c):(p=Le(f/_),m=~~p,m&&m===p?(d=c,m--):d>c&&(d=c)),g=this._yoyo&&m&1,g&&(d=c-d),p=cr(this._tTime,_),d===o&&!a&&this._initted&&m===p)return this._tTime=f,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&d!==_&&this._initted&&(this._lock=a=1,this.render(Le(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(wf(this,h?i:d,a,r,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,r,a)}if(this._rEase){var M=d<o;if(M!==this._inv){var A=M?o:c-o;this._inv=M,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(M?-1:1)/A:0,this._invScale=M?-this.ratio:1-this.ratio,this._invEase=M?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(d/c);if(this._from&&(this.ratio=v=1-v),this._tTime=f,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!r&&!p&&(Cn(this,"onStart"),this._tTime!==f))return this;for(u=this._pt;u;)u.r(v,u.d),u=u._next;b&&b.render(i<0?i:b._dur*b._ease(d/this._dur),r,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&_h(this,i,r,a),Cn(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!r&&this.parent&&Cn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&_h(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&ns(this,1),!r&&!(h&&!o)&&(f||o||g)&&(Cn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,a,o,l){da||yn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Fh(this,c),h=this._ease(c/this._dur),Gg(this,i,r,a,o,h,c,l)?this.resetTo(i,r,a,o,1):(Bo(this,0),this.parent||Mf(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?sa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!je),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Qi&&Qi.vars.overwrite!==!0)._first||sa(this),this.parent&&a!==this.timeline.totalDuration()&&hr(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Hn(i):o,c=this._ptLookup,h=this._pt,f,d,u,m,_,p,g;if((!r||r==="all")&&_g(o,l))return r==="all"&&(this._pt=0),sa(this);for(f=this._op=this._op||[],r!=="all"&&(He(r)&&(_={},fn(r,function(v){return _[v]=1}),r=_),r=Vg(o,r)),g=o.length;g--;)if(~l.indexOf(o[g])){d=c[g],r==="all"?(f[g]=r,m=d,u={}):(u=f[g]=f[g]||{},m=r);for(_ in m)p=d&&d[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&Fo(this,p,"_pt"),delete d[_]),u!=="all"&&(u[_]=1)}return this._initted&&!this._pt&&h&&sa(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return oa(1,arguments)},t.delayedCall=function(i,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,r,a){return oa(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,a){return De.killTweensOf(i,r,a)},t})(fa);Pn(ke.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});fn("staggerTo,staggerFrom,staggerFromTo",function(s){ke[s]=function(){var t=new sn,e=xh.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var Oh=function(t,e,n){return t[e]=n},Bf=function(t,e,n){return t[e](n)},Wg=function(t,e,n,i){return t[e](i.fp,n)},Xg=function(t,e,n){return t.setAttribute(e,n)},ko=function(t,e){return Oe(t[e])?Bf:No(t[e])&&t.setAttribute?Xg:Oh},kf=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},qg=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Bh=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},kh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},$g=function(t,e,n,i){for(var r=this._pt,a;r;)a=r._next,r.p===i&&r.modifier(t,e,n),r=a},Yg=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Fo(this,e,"_pt"):e.dep||(n=1),e=i;return!n},Zg=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},zh=function(t){for(var e=t._pt,n,i,r,a;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=r},pn=(function(){function s(e,n,i,r,a,o,l,c,h){this.t=n,this.s=r,this.c=a,this.p=i,this.r=o||kf,this.d=l||this,this.set=c||Oh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=Zg,this.m=n,this.mt=r,this.tween=i},s})();fn(Ch+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Eh[s]=1});Rn.TweenMax=Rn.TweenLite=ke;Rn.TimelineLite=Rn.TimelineMax=sn;De=new sn({sortChildren:!1,defaults:ca,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Sn.stringFilter=Lh;var Ls=[],To={},Jg=[],hf=0,Kg=0,dh=function(t){return(To[t]||Jg).map(function(e){return e()})},pa=function(){var t=Date.now(),e=[];t-hf>2&&(dh("matchMediaInit"),Ls.forEach(function(n){var i=n.queries,r=n.conditions,a,o,l,c;for(o in i)a=di.matchMedia(i[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),dh("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),hf=t,dh("matchMedia"))},zf=(function(){function s(e,n){this.selector=n&&vh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Kg++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Oe(n)&&(r=i,i=n,n=Oe);var a=this,o=function(){var c=Ce,h=a.selector,f;return c&&c!==a&&c.data.push(a),r&&(a.selector=vh(r)),Ce=a,f=i.apply(a,arguments),Oe(f)&&a._r.push(f),Ce=c,a.selector=h,a.isReverted=!1,f};return a.last=o,n===Oe?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Ce;Ce=null,n(this),Ce=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof ke&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof sn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ke)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=Ls.length;a--;)Ls[a].id===this.id&&Ls.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(pa):o.removeEventListener("change",pa)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},s})(),jg=(function(){function s(e){this.contexts=[],this.scope=e,Ce&&Ce.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){pi(n)||(n={matches:n});var a=new zf(0,r||this.scope),o=a.conditions={},l,c,h;Ce&&!a.selector&&(a.selector=Ce.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=di.matchMedia(n[c]),l&&(Ls.indexOf(a)<0&&Ls.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(pa):l.addEventListener("change",pa),(a._mqs||(a._mqs=[])).push(l)));return h&&i(a,function(f){return a.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),Do={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Df(i)})},timeline:function(t){return new sn(t)},getTweensOf:function(t,e){return De.getTweensOf(t,e)},getProperty:function(t,e,n,i){He(t)&&(t=Hn(t)[0]);var r=es(t||{}).get,a=n?yf:vf;return n==="native"&&(n=""),t&&(e?a((vn[e]&&vn[e].get||r)(t,e,n,i)):function(o,l,c){return a((vn[o]&&vn[o].get||r)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=Hn(t),t.length>1){var i=t.map(function(h){return an.quickSetter(h,e,n)}),r=i.length;return function(h){for(var f=r;f--;)i[f](h)}}t=t[0]||{};var a=vn[e],o=es(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var f=new a;or._pt=0,f.init(t,n?h+n:h,or,0,[t]),f.render(1,f),or._pt&&kh(1,or)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,r=an.to(t,Pn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return r.resetTo(e,l,c,h)};return a.tween=r,a},isTweening:function(t){return De.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Is(t.ease,ca.ease)),rf(ca,t||{})},config:function(t){return rf(Sn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!vn[o]&&!Rn[o]&&ha(e+" effect requires "+o+" plugin.")}),lh[e]=function(o,l,c){return n(Hn(o),Pn(l||{},r),c)},a&&(sn.prototype[e]=function(o,l,c){return this.add(lh[e](o,pi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){he[t]=Is(e)},parseEase:function(t,e){return arguments.length?Is(t,e):he},getById:function(t){return De.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new sn(t),i,r;for(n.smoothChildTiming=Mn(t.smoothChildTiming),De.remove(n),n._dp=0,n._time=n._tTime=De._time,i=De._first;i;)r=i._next,(e||!(!i._dur&&i instanceof ke&&i.vars.onComplete===i._targets[0]))&&fi(n,i,i._start-i._delay),i=r;return fi(De,n,0),n},context:function(t,e){return t?new zf(t,e):Ce},matchMedia:function(t){return new jg(t)},matchMediaRefresh:function(){return Ls.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||pa()},addEventListener:function(t,e){var n=To[t]||(To[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=To[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:Rg,wrapYoyo:Pg,distribute:Ef,random:Rf,snap:Cf,normalize:Cg,getUnit:Qe,clamp:wg,splitColor:Nf,toArray:Hn,selector:vh,mapRange:If,pipe:Tg,unitize:Eg,interpolate:Ig,shuffle:Tf},install:mf,effects:lh,ticker:yn,updateRoot:sn.updateRoot,plugins:vn,globalTimeline:De,core:{PropTween:pn,globals:gf,Tween:ke,Timeline:sn,Animation:fa,getCache:es,_removeLinkedListItem:Fo,reverting:function(){return je},context:function(t){return t&&Ce&&(Ce.data.push(t),t._ctx=Ce),Ce},suppressOverwrites:function(t){return Sh=t}}};fn("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Do[s]=ke[s]});yn.add(sn.updateRoot);or=Do.to({},{duration:0});var Qg=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},t_=function(t,e){var n=t._targets,i,r,a;for(i in e)for(r=n.length;r--;)a=t._ptLookup[r][i],a&&(a=a.d)&&(a._pt&&(a=Qg(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[r],i))},fh=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,a){a._onInit=function(o){var l,c;if(He(r)&&(l={},fn(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}t_(o,r)}}}},an=Do.registerPlugin({name:"attr",init:function(t,e,n,i,r){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)je?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},fh("roundProps",yh),fh("modifiers"),fh("snap",Cf))||Do;ke.version=sn.version=an.version="3.15.1";pf=1;bh()&&ur();var e_=he.Power0,n_=he.Power1,i_=he.Power2,s_=he.Power3,r_=he.Power4,a_=he.Linear,o_=he.Quad,l_=he.Cubic,c_=he.Quart,h_=he.Quint,u_=he.Strong,d_=he.Elastic,f_=he.Back,p_=he.SteppedEase,m_=he.Bounce,g_=he.Sine,__=he.Expo,x_=he.Circ;var Gf,ss,pr,qh,ks,v_,Vf,$h,y_=function(){return typeof window<"u"},Ui={},Bs=180/Math.PI,mr=Math.PI/180,fr=Math.atan2,Hf=1e8,Yh=/([A-Z])/g,M_=/(left|right|width|margin|padding|x)/i,S_=/[\s,\(]\S/,mi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Vh=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},b_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},w_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},A_=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},T_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Kf=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},jf=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},E_=function(t,e,n){return t.style[e]=n},C_=function(t,e,n){return t.style.setProperty(e,n)},R_=function(t,e,n){return t._gsap[e]=n},P_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},I_=function(t,e,n,i,r){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},L_=function(t,e,n,i,r){var a=t._gsap;a[e]=n,a.renderTransform(r,a)},Ne="transform",bn=Ne+"Origin",D_=function s(t,e){var n=this,i=this.target,r=i.style,a=i._gsap;if(t in Ui&&r){if(this.tfm=this.tfm||{},t!=="transform")t=mi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ni(i,o)}):this.tfm[t]=a.x?a[t]:Ni(i,t),t===bn&&(this.tfm.zOrigin=a.zOrigin);else return mi.transform.split(",").forEach(function(o){return s.call(n,o,e)});if(this.props.indexOf(Ne)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(bn,e,"")),t=Ne}(r||e)&&this.props.push(t,e,r[t])},Qf=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},N_=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(Yh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=$h(),(!r||!r.isStart)&&!n[Ne]&&(Qf(n),i.zOrigin&&n[bn]&&(n[bn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},tp=function(t,e){var n={target:t,props:[],revert:N_,save:D_};return t._gsap||an.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},ep,Hh=function(t,e){var n=ss.createElementNS?ss.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ss.createElement(t);return n&&n.style?n:ss.createElement(t)},In=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Yh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,gr(e)||e,1)||""},Wf="O,Moz,ms,Ms,Webkit".split(","),gr=function(t,e,n){var i=e||ks,r=i.style,a=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Wf[a]+t in r););return a<0?null:(a===3?"ms":a>=0?Wf[a]:"")+t},Wh=function(){y_()&&window.document&&(Gf=window,ss=Gf.document,pr=ss.documentElement,ks=Hh("div")||{style:{}},v_=Hh("div"),Ne=gr(Ne),bn=Ne+"Origin",ks.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",ep=!!gr("perspective"),$h=an.core.reverting,qh=1)},Xf=function(t){var e=t.ownerSVGElement,n=Hh("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),pr.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),pr.removeChild(n),r},qf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},np=function(t){var e,n;try{e=t.getBBox()}catch{e=Xf(t),n=1}return e&&(e.width||e.height)||n||(e=Xf(t)),e&&!e.width&&!e.x&&!e.y?{x:+qf(t,["x","cx","x1"])||0,y:+qf(t,["y","cy","y1"])||0,width:0,height:0}:e},ip=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&np(t))},as=function(t,e){if(e){var n=t.style,i;e in Ui&&e!==bn&&(e=Ne),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Yh,"-$1").toLowerCase())):n.removeAttribute(e)}},rs=function(t,e,n,i,r,a){var o=new pn(t._pt,e,n,0,1,a?jf:Kf);return t._pt=o,o.b=i,o.e=r,t._props.push(n),o},$f={deg:1,rad:1,turn:1},U_={grid:1,flex:1},os=function s(t,e,n,i){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=ks.style,l=M_.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),f=100,d=i==="px",u=i==="%",m,_,p,g;if(i===a||!r||$f[i]||$f[a])return r;if(a!=="px"&&!d&&(r=s(t,e,n,"px")),g=t.getCTM&&ip(t),(u||a==="%")&&(Ui[e]||~e.indexOf("adius")))return m=g?t.getBBox()[l?"width":"height"]:t[h],Be(u?r/m*f:r/100*m);if(o[l?"width":"height"]=f+(d?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===ss||!_.appendChild)&&(_=ss.body),p=_._gsap,p&&u&&p.width&&l&&p.time===yn.time&&!p.uncache)return Be(r/p.width*f);if(u&&(e==="height"||e==="width")){var v=t.style[e];t.style[e]=f+i,m=t[h],v?t.style[e]=v:as(t,e)}else(u||a==="%")&&!U_[In(_,"display")]&&(o.position=In(t,"position")),_===t&&(o.position="static"),_.appendChild(ks),m=ks[h],_.removeChild(ks),o.position="absolute";return l&&u&&(p=es(_),p.time=yn.time,p.width=_[h]),Be(d?m*r/f:m&&r?f/m*r:0)},Ni=function(t,e,n,i){var r;return qh||Wh(),e in mi&&e!=="transform"&&(e=mi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ui[e]&&e!=="transform"?(r=xa(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:Go(In(t,bn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=zo[e]&&zo[e](t,e,n)||In(t,e)||Ph(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?os(t,e,r,n)+n:r},F_=function(t,e,n,i){if(!n||n==="none"){var r=gr(e,t,1),a=r&&In(t,r,1);a&&a!==n?(e=r,n=a):e==="borderColor"&&(n=In(t,"borderTopColor"))}var o=new pn(this._pt,t.style,e,0,1,Bh),l=0,c=0,h,f,d,u,m,_,p,g,v,b,M,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=In(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=In(t,e)||i,_?t.style[e]=_:as(t,e)),h=[n,i],Lh(h),n=h[0],i=h[1],d=n.match(Ds)||[],A=i.match(Ds)||[],A.length){for(;f=Ds.exec(i);)p=f[0],v=i.substring(l,f.index),m?m=(m+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(m=1),p!==(_=d[c++]||"")&&(u=parseFloat(_)||0,M=_.substr((u+"").length),p.charAt(1)==="="&&(p=Ns(u,p)+M),g=parseFloat(p),b=p.substr((g+"").length),l=Ds.lastIndex-b.length,b||(b=b||Sn.units[e]||M,l===i.length&&(i+=b,o.e+=b)),M!==b&&(u=os(t,e,_,b)||0),o._pt={_next:o._pt,p:v||c===1?v:",",s:u,c:g-u,m:m&&m<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?jf:Kf;return Ah.test(i)&&(o.e=0),this._pt=o,o},Yf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},O_=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Yf[n]||n,e[1]=Yf[i]||i,e.join(" ")},B_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Ui[o]&&(l=1,o=o==="transformOrigin"?bn:Ne),as(n,o);l&&(as(n,Ne),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",xa(n,1),a.uncache=1,Qf(i)))}},zo={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var a=t._pt=new pn(t._pt,e,n,0,0,B_);return a.u=i,a.pr=-10,a.tween=r,t._props.push(n),1}}},_a=[1,0,0,1,0,0],sp={},rp=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Zf=function(t){var e=In(t,Ne);return rp(e)?_a:e.substr(7).match(wh).map(Be)},Zh=function(t,e){var n=t._gsap||es(t),i=t.style,r=Zf(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?_a:r):(r===_a&&!t.offsetParent&&t!==pr&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,pr.appendChild(t)),r=Zf(t),l?i.display=l:as(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):pr.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Xh=function(t,e,n,i,r,a){var o=t._gsap,l=r||Zh(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,f=o.xOffset||0,d=o.yOffset||0,u=l[0],m=l[1],_=l[2],p=l[3],g=l[4],v=l[5],b=e.split(" "),M=parseFloat(b[0])||0,A=parseFloat(b[1])||0,T,x,S,P;n?l!==_a&&(x=u*p-m*_)&&(S=M*(p/x)+A*(-_/x)+(_*v-p*g)/x,P=M*(-m/x)+A*(u/x)-(u*v-m*g)/x,M=S,A=P):(T=np(t),M=T.x+(~b[0].indexOf("%")?M/100*T.width:M),A=T.y+(~(b[1]||b[0]).indexOf("%")?A/100*T.height:A)),i||i!==!1&&o.smooth?(g=M-c,v=A-h,o.xOffset=f+(g*u+v*_)-g,o.yOffset=d+(g*m+v*p)-v):o.xOffset=o.yOffset=0,o.xOrigin=M,o.yOrigin=A,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[bn]="0px 0px",a&&(rs(a,o,"xOrigin",c,M),rs(a,o,"yOrigin",h,A),rs(a,o,"xOffset",f,o.xOffset),rs(a,o,"yOffset",d,o.yOffset)),t.setAttribute("data-svg-origin",M+" "+A)},xa=function(t,e){var n=t._gsap||new Dh(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=In(t,bn)||"0",h,f,d,u,m,_,p,g,v,b,M,A,T,x,S,P,R,D,W,O,C,k,G,U,j,q,et,Z,gt,$,L,X;return h=f=d=_=p=g=v=b=M=0,u=m=1,n.svg=!!(t.getCTM&&ip(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ne]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ne]!=="none"?l[Ne]:"")),i.scale=i.rotate=i.translate="none"),x=Zh(t,n.svg),n.svg&&(n.uncache?(j=t.getBBox(),c=n.xOrigin-j.x+"px "+(n.yOrigin-j.y)+"px",U=""):U=!e&&t.getAttribute("data-svg-origin"),Xh(t,U||c,!!U||n.originIsAbsolute,n.smooth!==!1,x)),A=n.xOrigin||0,T=n.yOrigin||0,x!==_a&&(D=x[0],W=x[1],O=x[2],C=x[3],h=k=x[4],f=G=x[5],x.length===6?(u=Math.sqrt(D*D+W*W),m=Math.sqrt(C*C+O*O),_=D||W?fr(W,D)*Bs:0,v=O||C?fr(O,C)*Bs+_:0,v&&(m*=Math.abs(Math.cos(v*mr))),n.svg&&(h-=A-(A*D+T*O),f-=T-(A*W+T*C))):(X=x[6],$=x[7],et=x[8],Z=x[9],gt=x[10],L=x[11],h=x[12],f=x[13],d=x[14],S=fr(X,gt),p=S*Bs,S&&(P=Math.cos(-S),R=Math.sin(-S),U=k*P+et*R,j=G*P+Z*R,q=X*P+gt*R,et=k*-R+et*P,Z=G*-R+Z*P,gt=X*-R+gt*P,L=$*-R+L*P,k=U,G=j,X=q),S=fr(-O,gt),g=S*Bs,S&&(P=Math.cos(-S),R=Math.sin(-S),U=D*P-et*R,j=W*P-Z*R,q=O*P-gt*R,L=C*R+L*P,D=U,W=j,O=q),S=fr(W,D),_=S*Bs,S&&(P=Math.cos(S),R=Math.sin(S),U=D*P+W*R,j=k*P+G*R,W=W*P-D*R,G=G*P-k*R,D=U,k=j),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,g=180-g),u=Be(Math.sqrt(D*D+W*W+O*O)),m=Be(Math.sqrt(G*G+X*X)),S=fr(k,G),v=Math.abs(S)>2e-4?S*Bs:0,M=L?1/(L<0?-L:L):0),n.svg&&(U=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!rp(In(t,Ne)),U&&t.setAttribute("transform",U))),Math.abs(v)>90&&Math.abs(v)<270&&(r?(u*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,v+=v<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Be(u),n.scaleY=Be(m),n.rotation=Be(_)+o,n.rotationX=Be(p)+o,n.rotationY=Be(g)+o,n.skewX=v+o,n.skewY=b+o,n.transformPerspective=M+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[bn]=Go(c)),n.xOffset=n.yOffset=0,n.force3D=Sn.force3D,n.renderTransform=n.svg?z_:ep?ap:k_,n.uncache=0,n},Go=function(t){return(t=t.split(" "))[0]+" "+t[1]},Gh=function(t,e,n){var i=Qe(e);return Be(parseFloat(e)+parseFloat(os(t,"x",n+"px",i)))+i},k_=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,ap(t,e)},Fs="0deg",ga="0px",Os=") ",ap=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,f=n.rotationX,d=n.skewX,u=n.skewY,m=n.scaleX,_=n.scaleY,p=n.transformPerspective,g=n.force3D,v=n.target,b=n.zOrigin,M="",A=g==="auto"&&t&&t!==1||g===!0;if(b&&(f!==Fs||h!==Fs)){var T=parseFloat(h)*mr,x=Math.sin(T),S=Math.cos(T),P;T=parseFloat(f)*mr,P=Math.cos(T),a=Gh(v,a,x*P*-b),o=Gh(v,o,-Math.sin(T)*-b),l=Gh(v,l,S*P*-b+b)}p!==ga&&(M+="perspective("+p+Os),(i||r)&&(M+="translate("+i+"%, "+r+"%) "),(A||a!==ga||o!==ga||l!==ga)&&(M+=l!==ga||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Os),c!==Fs&&(M+="rotate("+c+Os),h!==Fs&&(M+="rotateY("+h+Os),f!==Fs&&(M+="rotateX("+f+Os),(d!==Fs||u!==Fs)&&(M+="skew("+d+", "+u+Os),(m!==1||_!==1)&&(M+="scale("+m+", "+_+Os),v.style[Ne]=M||"translate(0, 0)"},z_=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,f=n.scaleX,d=n.scaleY,u=n.target,m=n.xOrigin,_=n.yOrigin,p=n.xOffset,g=n.yOffset,v=n.forceCSS,b=parseFloat(a),M=parseFloat(o),A,T,x,S,P;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=mr,c*=mr,A=Math.cos(l)*f,T=Math.sin(l)*f,x=Math.sin(l-c)*-d,S=Math.cos(l-c)*d,c&&(h*=mr,P=Math.tan(c-h),P=Math.sqrt(1+P*P),x*=P,S*=P,h&&(P=Math.tan(h),P=Math.sqrt(1+P*P),A*=P,T*=P)),A=Be(A),T=Be(T),x=Be(x),S=Be(S)):(A=f,S=d,T=x=0),(b&&!~(a+"").indexOf("px")||M&&!~(o+"").indexOf("px"))&&(b=os(u,"x",a,"px"),M=os(u,"y",o,"px")),(m||_||p||g)&&(b=Be(b+m-(m*A+_*x)+p),M=Be(M+_-(m*T+_*S)+g)),(i||r)&&(P=u.getBBox(),b=Be(b+i/100*P.width),M=Be(M+r/100*P.height)),P="matrix("+A+","+T+","+x+","+S+","+b+","+M+")",u.setAttribute("transform",P),v&&(u.style[Ne]=P)},G_=function(t,e,n,i,r){var a=360,o=He(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?Bs:1),c=l-i,h=i+c+"deg",f,d;return o&&(f=r.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*Hf)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*Hf)%a-~~(c/a)*a)),t._pt=d=new pn(t._pt,e,n,i,c,b_),d.e=h,d.u="deg",t._props.push(n),d},Jf=function(t,e){for(var n in e)t[n]=e[n];return t},V_=function(t,e,n){var i=Jf({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,f,d,u,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ne]=e,o=xa(n,1),as(n,Ne),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ne],a[Ne]=e,o=xa(n,1),a[Ne]=c);for(l in Ui)c=i[l],h=o[l],c!==h&&r.indexOf(l)<0&&(u=Qe(c),m=Qe(h),f=u!==m?os(n,l,c,m):parseFloat(c),d=parseFloat(h),t._pt=new pn(t._pt,o,l,f,d-f,Vh),t._pt.u=m||0,t._props.push(l));Jf(o,i)};fn("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",a=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(o){return t<2?s+o:"border"+o+s});zo[t>1?"border"+s:s]=function(o,l,c,h,f){var d,u;if(arguments.length<4)return d=a.map(function(m){return Ni(o,m,c)}),u=d.join(" "),u.split(d[0]).length===5?d[0]:u;d=(h+"").split(" "),u={},a.forEach(function(m,_){return u[m]=d[_]=d[_]||d[(_-1)/2|0]}),o.init(l,u,f)}});var Jh={name:"css",register:Wh,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var a=this._props,o=t.style,l=n.vars.startAt,c,h,f,d,u,m,_,p,g,v,b,M,A,T,x,S,P;qh||Wh(),this.styles=this.styles||tp(t),S=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(vn[_]&&Uh(_,e,n,i,t,r)))){if(u=typeof h,m=zo[_],u==="function"&&(h=h.call(n,i,t,r),u=typeof h),u==="string"&&~h.indexOf("random(")&&(h=dr(h)),m)m(this,t,_,h,n)&&(x=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",Li.lastIndex=0,Li.test(c)||(p=Qe(c),g=Qe(h),g?p!==g&&(c=os(t,_,c,g)+g):p&&(h+=p)),this.add(o,"setProperty",c,h,i,r,0,0,_),a.push(_),S.push(_,0,o[_]);else if(u!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],He(c)&&~c.indexOf("random(")&&(c=dr(c)),Qe(c+"")||c==="auto"||(c+=Sn.units[_]||Qe(Ni(t,_))||""),(c+"").charAt(1)==="="&&(c=Ni(t,_))):c=Ni(t,_),d=parseFloat(c),v=u==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),f=parseFloat(h),_ in mi&&(_==="autoAlpha"&&(d===1&&Ni(t,"visibility")==="hidden"&&f&&(d=0),S.push("visibility",0,o.visibility),rs(this,o,"visibility",d?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=mi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),b=_ in Ui,b){if(this.styles.save(_),P=h,u==="string"&&h.substring(0,6)==="var(--"){if(h=In(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var R=t.style.perspective;t.style.perspective=h,h=In(t,"perspective"),R?t.style.perspective=R:as(t,"perspective")}f=parseFloat(h)}if(M||(A=t._gsap,A.renderTransform&&!e.parseTransform||xa(t,e.parseTransform),T=e.smoothOrigin!==!1&&A.smooth,M=this._pt=new pn(this._pt,o,Ne,0,1,A.renderTransform,A,0,-1),M.dep=1),_==="scale")this._pt=new pn(this._pt,A,"scaleY",A.scaleY,(v?Ns(A.scaleY,v+f):f)-A.scaleY||0,Vh),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){S.push(bn,0,o[bn]),h=O_(h),A.svg?Xh(t,h,0,T,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==A.zOrigin&&rs(this,A,"zOrigin",A.zOrigin,g),rs(this,o,_,Go(c),Go(h)));continue}else if(_==="svgOrigin"){Xh(t,h,1,T,0,this);continue}else if(_ in sp){G_(this,A,_,d,v?Ns(d,v+h):h);continue}else if(_==="smoothOrigin"){rs(this,A,"smooth",A.smooth,h);continue}else if(_==="force3D"){A[_]=h;continue}else if(_==="transform"){V_(this,h,t);continue}}else _ in o||(_=gr(_)||_);if(b||(f||f===0)&&(d||d===0)&&!S_.test(h)&&_ in o)p=(c+"").substr((d+"").length),f||(f=0),g=Qe(h)||(_ in Sn.units?Sn.units[_]:p),p!==g&&(d=os(t,_,c,g)),this._pt=new pn(this._pt,b?A:o,_,d,(v?Ns(d,v+f):f)-d,!b&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?T_:Vh),this._pt.u=g||0,b&&P!==h?(this._pt.b=c,this._pt.e=P,this._pt.r=A_):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=w_);else if(_ in o)F_.call(this,t,_,c,v?v+h:h);else if(_ in t)this.add(t,_,c||t[_],v?v+h:h,i,r);else if(_!=="parseTransform"){Uo(_,h);continue}b||(_ in o?S.push(_,0,o[_]):typeof t[_]=="function"?S.push(_,2,t[_]()):S.push(_,1,c||t[_])),a.push(_)}}x&&zh(this)},render:function(t,e){if(e.tween._time||!$h())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ni,aliases:mi,getSetter:function(t,e,n){var i=mi[e];return i&&i.indexOf(",")<0&&(e=i),e in Ui&&e!==bn&&(t._gsap.x||Ni(t,"x"))?n&&Vf===n?e==="scale"?P_:R_:(Vf=n||{})&&(e==="scale"?I_:L_):t.style&&!No(t.style[e])?E_:~e.indexOf("-")?C_:ko(t,e)},core:{_removeProperty:as,_getMatrix:Zh}};an.utils.checkPrefix=gr;an.core.getStyleSaver=tp;(function(s,t,e,n){var i=fn(s+","+t+","+e,function(r){Ui[r]=1});fn(t,function(r){Sn.units[r]="deg",sp[r]=1}),mi[i[13]]=s+","+t,fn(n,function(r){var a=r.split(":");mi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");fn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Sn.units[s]="px"});an.registerPlugin(Jh);var Zn=an.registerPlugin(Jh)||an,U1=Zn.core.Tween;var H_=`
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
}`,W_=`#version 300 es
void main(){ vec2 p = vec2(gl_VertexID == 2 ? 3.0 : -1.0, gl_VertexID == 0 ? -3.0 : 1.0); gl_Position = vec4(p, 0.0, 1.0); }`,X_=`#version 300 es
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
}`;async function q_(s){if(!navigator.gpu)return null;let t=await navigator.gpu.requestAdapter({powerPreference:"low-power"});if(!t)return null;let e=await t.requestDevice();e.addEventListener("uncapturederror",h=>console.warn("WebGPU \uC624\uB958:",h.error.message));let n=s.getContext("webgpu");if(!n)return null;let i=navigator.gpu.getPreferredCanvasFormat();n.configure({device:e,format:i,alphaMode:"opaque"});let r=e.createShaderModule({code:H_}),a=e.createRenderPipeline({layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),o=e.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),l=e.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}}]}),c=new Float32Array(16);return{kind:"WebGPU",lost:e.lost,draw(h){c.set(h),e.queue.writeBuffer(o,0,c);let f=e.createCommandEncoder(),d=f.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});d.setPipeline(a),d.setBindGroup(0,l),d.draw(3),d.end(),e.queue.submit([f.finish()])}}}function op(s){let t=s.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return null;let e=(r,a)=>{let o=t.createShader(r);return t.shaderSource(o,a),t.compileShader(o),o},n=t.createProgram();if(t.attachShader(n,e(t.VERTEX_SHADER,W_)),t.attachShader(n,e(t.FRAGMENT_SHADER,X_)),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))return null;t.useProgram(n),t.bindVertexArray(t.createVertexArray());let i=["uA","uColA","uColB","uGlow"].map(r=>t.getUniformLocation(n,r));return{kind:"WebGL2",draw(r){t.viewport(0,0,s.width,s.height),i.forEach((a,o)=>t.uniform4f(a,r[o*4],r[o*4+1],r[o*4+2],r[o*4+3])),t.drawArrays(t.TRIANGLES,0,3)}}}async function lp(s,{gpu:t=!0}={}){let e=null;if(t)try{e=await q_(s)}catch(i){console.warn("WebGPU \uC2E4\uD328, WebGL2\uB85C",i),e=null}if(!e){let i=s.cloneNode();s.replaceWith(i),s=i,e=op(s)}let n=e?{...e,canvas:s}:{kind:"CSS",canvas:s,draw(){}};return e?.lost&&e.lost.then(()=>{let i=n.canvas.cloneNode();n.canvas.replaceWith(i);let r=op(i);Object.assign(n,r?{...r,canvas:i}:{kind:"CSS",canvas:i,draw(){}})}),n}var Wp=0,Uu=1,Xp=2;var Zs=1,qp=2,qr=3,ys=0,xn=1,Mi=2,Js=0,$r=1,eo=2,Fu=3,Ou=4,$p=5;var Ks=100,Yp=101,Zp=102,Jp=103,Kp=104,jp=200,Qp=201,tm=202,em=203,Bu=204,ku=205,nm=206,im=207,sm=208,rm=209,am=210,om=211,lm=212,cm=213,hm=214,gl=0,_l=1,xl=2,Ir=3,vl=4,yl=5,Ml=6,Sl=7,zu=0,um=1,dm=2,Si=0,Gu=1,Vu=2,Hu=3,Wu=4,Xu=5,qu=6,no=7;var $u=300,js=301,Yr=302,rc=303,ac=304,bl=1e3,_i=1001,wl=1002,Ze=1003,fm=1004;var io=1005;var _n=1006,oc=1007;var qi=1008;var Tn=1009,Yu=1010,Zu=1011,Zr=1012,lc=1013,ei=1014,ni=1015,ii=1016,cc=1017,hc=1018,Qs=1020,Ju=35902,Ku=35899,ju=1021,Qu=1022,si=1023,Hi=1026,$i=1027,td=1028,uc=1029,Ms=1030,dc=1031;var fc=1033,so=33776,ro=33777,ao=33778,oo=33779,pc=35840,mc=35841,gc=35842,_c=35843,xc=36196,vc=37492,yc=37496,Mc=37488,Sc=37489,lo=37490,bc=37491,wc=37808,Ac=37809,Tc=37810,Ec=37811,Cc=37812,Rc=37813,Pc=37814,Ic=37815,Lc=37816,Dc=37817,Nc=37818,Uc=37819,Fc=37820,Oc=37821,Bc=36492,kc=36494,zc=36495,Gc=36283,Vc=36284,co=36285,Hc=36286;var Ca=2300,Al=2301,pl=2302,bu=2303,wu=2400,Au=2401,Tu=2402;var pm=3200;var Wc=0,mm=1,Yi="",mn="srgb",Ra="srgb-linear",Pa="linear",_e="srgb";var ml=7680;var gm=519,_m=512,xm=513,vm=514,ed=515,ym=516,Mm=517,nd=518,id=519,Sm=35044;var sd="300 es",Xn=2e3,Lr=2001;function $_(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Y_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ia(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function bm(){let s=Ia("canvas");return s.style.display="block",s}var cp={},Dr=null;function rd(...s){let t="THREE."+s.shift();Dr?Dr("log",t,...s):console.log(t,...s)}function wm(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Kt(...s){s=wm(s);let t="THREE."+s.shift();if(Dr)Dr("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function jt(...s){s=wm(s);let t="THREE."+s.shift();if(Dr)Dr("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Aa(...s){let t=s.join(" ");t in cp||(cp[t]=!0,Kt(...s))}function Am(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Tm={[gl]:gl,[xl]:Ml,[vl]:vl,[Ir]:yl,[_l]:_l,[Ml]:xl,[Sl]:Sl,[yl]:Ir},vi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Kh=Math.PI/180,Tl=180/Math.PI;function Jr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[s&255]+on[s>>8&255]+on[s>>16&255]+on[s>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[e&63|128]+on[e>>8&255]+"-"+on[e>>16&255]+on[e>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function re(s,t,e){return Math.max(t,Math.min(e,s))}function Z_(s,t){return(s%t+t)%t}function jh(s,t,e){return(1-e)*s+e*t}function Em(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ad(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function J_(s,t){if(t.constructor===Float32Array)return s;let e=ad(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function K_(s,t){if(t.constructor===Float32Array)return s;let e=ad(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var dd=class dd{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};dd.prototype.isVector2=!0;var Nt=dd,yi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3],d=r[a+0],u=r[a+1],m=r[a+2],_=r[a+3];if(f!==_||l!==d||c!==u||h!==m){let p=l*d+c*u+h*m+f*_;p<0&&(d=-d,u=-u,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){let v=Math.acos(p),b=Math.sin(v);g=Math.sin(g*v)/b,o=Math.sin(o*v)/b,l=l*g+d*o,c=c*g+u*o,h=h*g+m*o,f=f*g+_*o}else{l=l*g+d*o,c=c*g+u*o,h=h*g+m*o,f=f*g+_*o;let v=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=v,c*=v,h*=v,f*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[a],d=r[a+1],u=r[a+2],m=r[a+3];return t[e]=o*m+h*f+l*u-c*d,t[e+1]=l*m+h*d+c*f-o*u,t[e+2]=c*m+h*u+o*d-l*f,t[e+3]=h*m-o*f-l*d-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(r/2),d=l(n/2),u=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*f+c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f-d*u*m;break;case"YXZ":this._x=d*h*f+c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f+d*u*m;break;case"ZXY":this._x=d*h*f-c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f-d*u*m;break;case"ZYX":this._x=d*h*f-c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f+d*u*m;break;case"YZX":this._x=d*h*f+c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f-d*u*m;break;case"XZY":this._x=d*h*f-c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f+d*u*m;break;default:Kt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],d=n+o+f;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-i)*u}else if(n>o&&n>f){let u=2*Math.sqrt(1+n-o-f);this._w=(h-l)/u,this._x=.25*u,this._y=(i+a)/u,this._z=(r+c)/u}else if(o>f){let u=2*Math.sqrt(1+o-n-f);this._w=(r-c)/u,this._x=(i+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+f-n-o);this._w=(a-i)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},fd=class fd{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=i+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qh.copy(this).projectOnVector(t),this.sub(Qh)}reflect(t){return this.sub(Qh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};fd.prototype.isVector3=!0;var H=fd,Qh=new H,hp=new yi,pd=class pd{constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],d=n[2],u=n[5],m=n[8],_=i[0],p=i[3],g=i[6],v=i[1],b=i[4],M=i[7],A=i[2],T=i[5],x=i[8];return r[0]=a*_+o*v+l*A,r[3]=a*p+o*b+l*T,r[6]=a*g+o*M+l*x,r[1]=c*_+h*v+f*A,r[4]=c*p+h*b+f*T,r[7]=c*g+h*M+f*x,r[2]=d*_+u*v+m*A,r[5]=d*p+u*b+m*T,r[8]=d*g+u*M+m*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,d=o*l-h*r,u=c*r-a*l,m=e*f+n*d+i*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=f*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=u*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Aa("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tu.makeScale(t,e)),this}rotate(t){return Aa("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tu.makeRotation(-t)),this}translate(t,e){return Aa("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};pd.prototype.isMatrix3=!0;var Qt=pd,tu=new Qt,up=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dp=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function j_(){let s={enabled:!0,workingColorSpace:Ra,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_e&&(i.r=Vi(i.r),i.g=Vi(i.g),i.b=Vi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_e&&(i.r=Pr(i.r),i.g=Pr(i.g),i.b=Pr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Yi?Pa:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ra]:{primaries:t,whitePoint:n,transfer:Pa,toXYZ:up,fromXYZ:dp,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:mn},outputColorSpaceConfig:{drawingBufferColorSpace:mn}},[mn]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:up,fromXYZ:dp,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:mn}}}),s}var ce=j_();function Vi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Pr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var _r,El=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{_r===void 0&&(_r=Ia("canvas")),_r.width=t.width,_r.height=t.height;let i=_r.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=_r}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ia("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Vi(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vi(e[n]/255)*255):e[n]=Vi(e[n]);return{data:e,width:t.width,height:t.height}}else return Kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Q_=0,Nr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=Jr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(eu(i[a].image)):r.push(eu(i[a]))}else r=eu(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function eu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?El.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Kt("Texture: Unable to serialize Texture."),{})}var tx=0,nu=new H,wn=class s extends vi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=_i,i=_i,r=_n,a=qi,o=si,l=Tn,c=s.DEFAULT_ANISOTROPY,h=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=Jr(),this.name="",this.source=new Nr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Nt(0,0),this.repeat=new Nt(1,1),this.center=new Nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(nu).x}get height(){return this.source.getSize(nu).y}get depth(){return this.source.getSize(nu).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Kt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$u)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bl:t.x=t.x-Math.floor(t.x);break;case _i:t.x=t.x<0?0:1;break;case wl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bl:t.y=t.y-Math.floor(t.y);break;case _i:t.y=t.y<0?0:1;break;case wl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};wn.DEFAULT_IMAGE=null;wn.DEFAULT_MAPPING=$u;wn.DEFAULT_ANISOTROPY=1;var md=class md{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],f=l[8],d=l[1],u=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,M=(u+1)/2,A=(g+1)/2,T=(h+d)/4,x=(f+_)/4,S=(m+p)/4;return b>M&&b>A?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=T/n,r=x/n):M>A?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=T/i,r=S/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=x/r,i=S/r),this.set(n,i,r,e),this}let v=Math.sqrt((p-m)*(p-m)+(f-_)*(f-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(f-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};md.prototype.isVector4=!0;var Re=md,Cl=class extends vi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new wn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:_n,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Nr(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Nn=class extends Cl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},La=class extends wn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Rl=class extends wn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var sc=class sc{constructor(t,e,n,i,r,a,o,l,c,h,f,d,u,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,f,d,u,m,_,p)}set(t,e,n,i,r,a,o,l,c,h,f,d,u,m,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=f,g[14]=d,g[3]=u,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new sc().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/xr.setFromMatrixColumn(t,0).length(),r=1/xr.setFromMatrixColumn(t,1).length(),a=1/xr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let d=a*h,u=a*f,m=o*h,_=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=u+m*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=m+u*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,u=l*f,m=c*h,_=c*f;e[0]=d+_*o,e[4]=m*o-u,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=u*o-m,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,u=l*f,m=c*h,_=c*f;e[0]=d-_*o,e[4]=-a*f,e[8]=m+u*o,e[1]=u+m*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,u=a*f,m=o*h,_=o*f;e[0]=l*h,e[4]=m*c-u,e[8]=d*c+_,e[1]=l*f,e[5]=_*c+d,e[9]=u*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,u=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-d*f,e[8]=m*f+u,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=u*f+m,e[10]=d-_*f}else if(t.order==="XZY"){let d=a*l,u=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=d*f+_,e[5]=a*h,e[9]=u*f-m,e[2]=m*f-u,e[6]=o*h,e[10]=_*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ex,t,nx)}lookAt(t,e,n){let i=this.elements;return Ln.subVectors(t,e),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),ls.crossVectors(n,Ln),ls.lengthSq()===0&&(Math.abs(n.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),ls.crossVectors(n,Ln)),ls.normalize(),Vo.crossVectors(Ln,ls),i[0]=ls.x,i[4]=Vo.x,i[8]=Ln.x,i[1]=ls.y,i[5]=Vo.y,i[9]=Ln.y,i[2]=ls.z,i[6]=Vo.z,i[10]=Ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],d=n[9],u=n[13],m=n[2],_=n[6],p=n[10],g=n[14],v=n[3],b=n[7],M=n[11],A=n[15],T=i[0],x=i[4],S=i[8],P=i[12],R=i[1],D=i[5],W=i[9],O=i[13],C=i[2],k=i[6],G=i[10],U=i[14],j=i[3],q=i[7],et=i[11],Z=i[15];return r[0]=a*T+o*R+l*C+c*j,r[4]=a*x+o*D+l*k+c*q,r[8]=a*S+o*W+l*G+c*et,r[12]=a*P+o*O+l*U+c*Z,r[1]=h*T+f*R+d*C+u*j,r[5]=h*x+f*D+d*k+u*q,r[9]=h*S+f*W+d*G+u*et,r[13]=h*P+f*O+d*U+u*Z,r[2]=m*T+_*R+p*C+g*j,r[6]=m*x+_*D+p*k+g*q,r[10]=m*S+_*W+p*G+g*et,r[14]=m*P+_*O+p*U+g*Z,r[3]=v*T+b*R+M*C+A*j,r[7]=v*x+b*D+M*k+A*q,r[11]=v*S+b*W+M*G+A*et,r[15]=v*P+b*O+M*U+A*Z,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],d=t[10],u=t[14],m=t[3],_=t[7],p=t[11],g=t[15],v=l*u-c*d,b=o*u-c*f,M=o*d-l*f,A=a*u-c*h,T=a*d-l*h,x=a*f-o*h;return e*(_*v-p*b+g*M)-n*(m*v-p*A+g*T)+i*(m*b-_*A+g*x)-r*(m*M-_*T+p*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],d=t[10],u=t[11],m=t[12],_=t[13],p=t[14],g=t[15],v=e*o-n*a,b=e*l-i*a,M=e*c-r*a,A=n*l-i*o,T=n*c-r*o,x=i*c-r*l,S=h*_-f*m,P=h*p-d*m,R=h*g-u*m,D=f*p-d*_,W=f*g-u*_,O=d*g-u*p,C=v*O-b*W+M*D+A*R-T*P+x*S;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/C;return t[0]=(o*O-l*W+c*D)*k,t[1]=(i*W-n*O-r*D)*k,t[2]=(_*x-p*T+g*A)*k,t[3]=(d*T-f*x-u*A)*k,t[4]=(l*R-a*O-c*P)*k,t[5]=(e*O-i*R+r*P)*k,t[6]=(p*M-m*x-g*b)*k,t[7]=(h*x-d*M+u*b)*k,t[8]=(a*W-o*R+c*S)*k,t[9]=(n*R-e*W-r*S)*k,t[10]=(m*T-_*M+g*v)*k,t[11]=(f*M-h*T-u*v)*k,t[12]=(o*P-a*D-l*S)*k,t[13]=(e*D-n*P+i*S)*k,t[14]=(_*b-m*A-p*v)*k,t[15]=(h*A-f*b+d*v)*k,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,d=r*c,u=r*h,m=r*f,_=a*h,p=a*f,g=o*f,v=l*c,b=l*h,M=l*f,A=n.x,T=n.y,x=n.z;return i[0]=(1-(_+g))*A,i[1]=(u+M)*A,i[2]=(m-b)*A,i[3]=0,i[4]=(u-M)*T,i[5]=(1-(d+g))*T,i[6]=(p+v)*T,i[7]=0,i[8]=(m+b)*x,i[9]=(p-v)*x,i[10]=(1-(d+_))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=xr.set(i[0],i[1],i[2]).length(),o=xr.set(i[4],i[5],i[6]).length(),l=xr.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Jn.copy(this);let c=1/a,h=1/o,f=1/l;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=h,Jn.elements[5]*=h,Jn.elements[6]*=h,Jn.elements[8]*=f,Jn.elements[9]*=f,Jn.elements[10]*=f,e.setFromRotationMatrix(Jn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Xn,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i),m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===Xn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Lr)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Xn,l=!1){let c=this.elements,h=2/(e-t),f=2/(n-i),d=-(e+t)/(e-t),u=-(n+i)/(n-i),m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===Xn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Lr)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};sc.prototype.isMatrix4=!0;var be=sc,xr=new H,Jn=new be,ex=new H(0,0,0),nx=new H(1,1,1),ls=new H,Vo=new H,Ln=new H,fp=new be,pp=new yi,Wi=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],d=i[6],u=i[10];switch(e){case"XYZ":this._y=Math.asin(re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(re(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-re(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return pp.setFromEuler(this),this.setFromQuaternion(pp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wi.DEFAULT_ORDER="XYZ";var Da=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ix=0,mp=new H,vr=new yi,Fi=new be,Ho=new H,va=new H,sx=new H,rx=new yi,gp=new H(1,0,0),_p=new H(0,1,0),xp=new H(0,0,1),vp={type:"added"},ax={type:"removed"},yr={type:"childadded",child:null},iu={type:"childremoved",child:null},Je=class s extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ix++}),this.uuid=Jr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new H,e=new Wi,n=new yi,i=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new be},normalMatrix:{value:new Qt}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Da,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vr.setFromAxisAngle(t,e),this.quaternion.multiply(vr),this}rotateOnWorldAxis(t,e){return vr.setFromAxisAngle(t,e),this.quaternion.premultiply(vr),this}rotateX(t){return this.rotateOnAxis(gp,t)}rotateY(t){return this.rotateOnAxis(_p,t)}rotateZ(t){return this.rotateOnAxis(xp,t)}translateOnAxis(t,e){return mp.copy(t).applyQuaternion(this.quaternion),this.position.add(mp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gp,t)}translateY(t){return this.translateOnAxis(_p,t)}translateZ(t){return this.translateOnAxis(xp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ho.copy(t):Ho.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),va.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(va,Ho,this.up):Fi.lookAt(Ho,va,this.up),this.quaternion.setFromRotationMatrix(Fi),i&&(Fi.extractRotation(i.matrixWorld),vr.setFromRotationMatrix(Fi),this.quaternion.premultiply(vr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vp),yr.child=t,this.dispatchEvent(yr),yr.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ax),iu.child=t,this.dispatchEvent(iu),iu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vp),yr.child=t,this.dispatchEvent(yr),yr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(va,t,sx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(va,rx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),d=a(t.skeletons),u=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Je.DEFAULT_UP=new H(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Gi=class extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}},ox={type:"move"},Ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),u=.02,m=.005;c.inputState.pinching&&d>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ox)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Gi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Cm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cs={h:0,s:0,l:0},Wo={h:0,s:0,l:0};function su(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var ee=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=mn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ce.workingColorSpace){if(t=Z_(t,1),e=re(e,0,1),n=re(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=su(a,r,t+1/3),this.g=su(a,r,t),this.b=su(a,r,t-1/3)}return ce.colorSpaceToWorking(this,i),this}setStyle(t,e=mn){function n(r){r!==void 0&&parseFloat(r)<1&&Kt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Kt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=mn){let n=Cm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vi(t.r),this.g=Vi(t.g),this.b=Vi(t.b),this}copyLinearToSRGB(t){return this.r=Pr(t.r),this.g=Pr(t.g),this.b=Pr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=mn){return ce.workingToColorSpace(ln.copy(this),t),Math.round(re(ln.r*255,0,255))*65536+Math.round(re(ln.g*255,0,255))*256+Math.round(re(ln.b*255,0,255))}getHexString(t=mn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(ln.copy(this),e);let n=ln.r,i=ln.g,r=ln.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(ln.copy(this),e),t.r=ln.r,t.g=ln.g,t.b=ln.b,t}getStyle(t=mn){ce.workingToColorSpace(ln.copy(this),t);let e=ln.r,n=ln.g,i=ln.b;return t!==mn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(cs),this.setHSL(cs.h+t,cs.s+e,cs.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(cs),t.getHSL(Wo);let n=jh(cs.h,Wo.h,e),i=jh(cs.s,Wo.s,e),r=jh(cs.l,Wo.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ln=new ee;ee.NAMES=Cm;var Na=class extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wi,this.environmentIntensity=1,this.environmentRotation=new Wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Kn=new H,Oi=new H,ru=new H,Bi=new H,Mr=new H,Sr=new H,yp=new H,au=new H,ou=new H,lu=new H,cu=new Re,hu=new Re,uu=new Re,fs=class s{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Kn.subVectors(t,e),i.cross(Kn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Kn.subVectors(i,e),Oi.subVectors(n,e),ru.subVectors(t,e);let a=Kn.dot(Kn),o=Kn.dot(Oi),l=Kn.dot(ru),c=Oi.dot(Oi),h=Oi.dot(ru),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,u=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-u-m,m,u)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bi.x),l.addScaledVector(a,Bi.y),l.addScaledVector(o,Bi.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return cu.setScalar(0),hu.setScalar(0),uu.setScalar(0),cu.fromBufferAttribute(t,e),hu.fromBufferAttribute(t,n),uu.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(cu,r.x),a.addScaledVector(hu,r.y),a.addScaledVector(uu,r.z),a}static isFrontFacing(t,e,n,i){return Kn.subVectors(n,e),Oi.subVectors(t,e),Kn.cross(Oi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Kn.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),Kn.cross(Oi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;Mr.subVectors(i,n),Sr.subVectors(r,n),au.subVectors(t,n);let l=Mr.dot(au),c=Sr.dot(au);if(l<=0&&c<=0)return e.copy(n);ou.subVectors(t,i);let h=Mr.dot(ou),f=Sr.dot(ou);if(h>=0&&f<=h)return e.copy(i);let d=l*f-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(Mr,a);lu.subVectors(t,r);let u=Mr.dot(lu),m=Sr.dot(lu);if(m>=0&&u<=m)return e.copy(r);let _=u*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Sr,o);let p=h*m-u*f;if(p<=0&&f-h>=0&&u-m>=0)return yp.subVectors(r,i),o=(f-h)/(f-h+(u-m)),e.copy(i).addScaledVector(yp,o);let g=1/(p+_+d);return a=_*g,o=d*g,e.copy(n).addScaledVector(Mr,a).addScaledVector(Sr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ps=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(jn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(jn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=jn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,jn):jn.fromBufferAttribute(r,a),jn.applyMatrix4(t.matrixWorld),this.expandByPoint(jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xo.copy(n.boundingBox)),Xo.applyMatrix4(t.matrixWorld),this.union(Xo)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,jn),jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ya),qo.subVectors(this.max,ya),br.subVectors(t.a,ya),wr.subVectors(t.b,ya),Ar.subVectors(t.c,ya),hs.subVectors(wr,br),us.subVectors(Ar,wr),zs.subVectors(br,Ar);let e=[0,-hs.z,hs.y,0,-us.z,us.y,0,-zs.z,zs.y,hs.z,0,-hs.x,us.z,0,-us.x,zs.z,0,-zs.x,-hs.y,hs.x,0,-us.y,us.x,0,-zs.y,zs.x,0];return!du(e,br,wr,Ar,qo)||(e=[1,0,0,0,1,0,0,0,1],!du(e,br,wr,Ar,qo))?!1:($o.crossVectors(hs,us),e=[$o.x,$o.y,$o.z],du(e,br,wr,Ar,qo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ki),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ki=[new H,new H,new H,new H,new H,new H,new H,new H],jn=new H,Xo=new ps,br=new H,wr=new H,Ar=new H,hs=new H,us=new H,zs=new H,ya=new H,qo=new H,$o=new H,Gs=new H;function du(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Gs.fromArray(s,r);let o=i.x*Math.abs(Gs.x)+i.y*Math.abs(Gs.y)+i.z*Math.abs(Gs.z),l=t.dot(Gs),c=e.dot(Gs),h=n.dot(Gs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ge=new H,Yo=new Nt,lx=0,xi=class extends vi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sm,this.updateRanges=[],this.gpuType=ni,this.version=0,this._normalizationScale=t!==void 0?ad(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Yo.fromBufferAttribute(this,e),Yo.applyMatrix3(t),this.setXY(e,Yo.x,Yo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix3(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):J_(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):K_(t,this.array)}};var Ua=class extends xi{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Fa=class extends xi{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Fe=class extends xi{constructor(t,e,n){super(new Float32Array(t),e,n)}},cx=new ps,Ma=new H,fu=new H,ms=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):cx.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ma.subVectors(t,this.center);let e=Ma.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ma,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ma.copy(t.center).add(fu)),this.expandByPoint(Ma.copy(t.center).sub(fu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},hx=0,Wn=new be,pu=new Je,Tr=new H,Dn=new ps,Sa=new ps,Ye=new H,An=class s extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hx++}),this.uuid=Jr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new($_(t)?Fa:Ua)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Wn.makeRotationFromQuaternion(t),this.applyMatrix4(Wn),this}rotateX(t){return Wn.makeRotationX(t),this.applyMatrix4(Wn),this}rotateY(t){return Wn.makeRotationY(t),this.applyMatrix4(Wn),this}rotateZ(t){return Wn.makeRotationZ(t),this.applyMatrix4(Wn),this}translate(t,e,n){return Wn.makeTranslation(t,e,n),this.applyMatrix4(Wn),this}scale(t,e,n){return Wn.makeScale(t,e,n),this.applyMatrix4(Wn),this}lookAt(t){return pu.lookAt(t),pu.updateMatrix(),this.applyMatrix4(pu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Tr).negate(),this.translate(Tr.x,Tr.y,Tr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Fe(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ps);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ms);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Sa.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(Dn.min,Sa.min),Dn.expandByPoint(Ye),Ye.addVectors(Dn.max,Sa.max),Dn.expandByPoint(Ye)):(Dn.expandByPoint(Sa.min),Dn.expandByPoint(Sa.max))}Dn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ye.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ye));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ye.fromBufferAttribute(o,c),l&&(Tr.fromBufferAttribute(t,c),Ye.add(Tr)),i=Math.max(i,n.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new xi(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let P=0;P<n.count;P++)o[P]=new H,l[P]=new H;let h=new H,f=new H,d=new H,u=new Nt,m=new Nt,_=new Nt,p=new H,g=new H;function v(P,R,D){c[P]=c[R]=c[D]=1,h.fromBufferAttribute(n,P),f.fromBufferAttribute(n,R),d.fromBufferAttribute(n,D),u.fromBufferAttribute(r,P),m.fromBufferAttribute(r,R),_.fromBufferAttribute(r,D),f.sub(h),d.sub(h),m.sub(u),_.sub(u);let W=1/(m.x*_.y-_.x*m.y);isFinite(W)&&(p.copy(f).multiplyScalar(_.y).addScaledVector(d,-m.y).multiplyScalar(W),g.copy(d).multiplyScalar(m.x).addScaledVector(f,-_.x).multiplyScalar(W),o[P].add(p),o[R].add(p),o[D].add(p),l[P].add(g),l[R].add(g),l[D].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,R=b.length;P<R;++P){let D=b[P],W=D.start,O=D.count;for(let C=W,k=W+O;C<k;C+=3)v(t.getX(C+0),t.getX(C+1),t.getX(C+2))}let M=new H,A=new H,T=new H,x=new H;function S(P){T.fromBufferAttribute(i,P),x.copy(T);let R=o[P];M.copy(R),M.sub(T.multiplyScalar(T.dot(R))).normalize(),A.crossVectors(x,R);let W=A.dot(l[P])<0?-1:1;a.setXYZW(P,M.x,M.y,M.z,W)}for(let P=0,R=n.count;P<R;++P)c[P]&&S(P);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new xi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let i=new H,r=new H,a=new H,o=new H,l=new H,c=new H,h=new H,f=new H;if(t)for(let d=0,u=t.count;d<u;d+=3){let m=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,u=e.count;d<u;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(l.length*h),u=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?u=l[_]*o.data.stride+o.offset:u=l[_]*h;for(let g=0;g<h;g++)d[m++]=c[u++]}return new xi(d,h,f)}if(this.index===null)return Kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let d=c[h],u=t(d,n);l.push(u)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){let u=c[f];h.push(u.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let d=0,u=f.length;d<u;d++)h.push(f[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var mu=new H,ux=new H,dx=new Qt,Qn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=mu.subVectors(n,e).cross(ux.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(mu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||dx.getNormalMatrix(t),i=this.coplanarPoint(mu).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},fx=0,ti=class extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fx++}),this.uuid=Jr(),this.name="",this.type="Material",this.blending=$r,this.side=ys,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bu,this.blendDst=ku,this.blendEquation=Ks,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=Ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ml,this.stencilZFail=ml,this.stencilZPass=ml,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Kt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Qn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Nt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Nt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var zi=new H,gu=new H,Zo=new H,Jo=new H,Fr=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=zi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zi.copy(this.origin).addScaledVector(this.direction,e),zi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){gu.copy(t).add(e).multiplyScalar(.5),Zo.copy(e).sub(t).normalize(),Jo.copy(this.origin).sub(gu);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Zo),o=Jo.dot(this.direction),l=-Jo.dot(Zo),c=Jo.lengthSq(),h=Math.abs(1-a*a),f,d,u,m;if(h>0)if(f=a*l-o,d=a*o-l,m=r*h,f>=0)if(d>=-m)if(d<=m){let _=1/h;f*=_,d*=_,u=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d<=-m?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c):d<=m?(f=0,d=Math.min(Math.max(-r,-l),r),u=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(gu).addScaledVector(Zo,d),u}intersectSphere(t,e){if(t.radius<0)return null;zi.subVectors(t.center,this.origin);let n=zi.dot(this.direction),i=zi.dot(zi)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(o=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,zi)!==null}intersectTriangle(t,e,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,d=t.y-a.y,u=t.z-a.z,m=e.x-a.x,_=e.y-a.y,p=e.z-a.z,g=n.x-a.x,v=n.y-a.y,b=n.z-a.z,M=Math.abs(l),A=Math.abs(c),T=Math.abs(h),x,S,P,R,D,W,O,C,k,G,U,j;if(M>=A&&M>=T?(P=l,W=f,k=m,j=g,l>=0?(x=c,S=h,R=d,D=u,O=_,C=p,G=v,U=b):(x=h,S=c,R=u,D=d,O=p,C=_,G=b,U=v)):A>=T?(P=c,W=d,k=_,j=v,c>=0?(x=h,S=l,R=u,D=f,O=p,C=m,G=b,U=g):(x=l,S=h,R=f,D=u,O=m,C=p,G=g,U=b)):(P=h,W=u,k=p,j=b,h>=0?(x=l,S=c,R=f,D=d,O=m,C=_,G=g,U=v):(x=c,S=l,R=d,D=f,O=_,C=m,G=v,U=g)),P===0)return null;let q=x/P,et=S/P,Z=1/P,gt=R-q*W,$=D-et*W,L=O-q*k,X=C-et*k,Q=G-q*j,_t=U-et*j,st=Q*X-_t*L,Ut=gt*_t-$*Q,Zt=L*$-X*gt;if(i){if(st<0||Ut<0||Zt<0)return null}else if((st<0||Ut<0||Zt<0)&&(st>0||Ut>0||Zt>0))return null;let Lt=st+Ut+Zt;if(Lt===0)return null;let qt=Z*(st*W+Ut*k+Zt*j);return(Lt>0?qt<0:qt>0)?null:this.at(qt/Lt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pl=class extends ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.combine=zu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Mp=new be,Vs=new Fr,Ko=new ms,Sp=new H,jo=new H,Qo=new H,tl=new H,_u=new H,el=new H,bp=new H,nl=new H,Un=class extends Je{constructor(t=new An,e=new Pl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){el.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(_u.fromBufferAttribute(f,t),a?el.addScaledVector(_u,h):el.addScaledVector(_u.sub(e),h))}e.add(el)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ko.copy(n.boundingSphere),Ko.applyMatrix4(r),Vs.copy(t.ray).recast(t.near),!(Ko.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(Ko,Sp)===null||Vs.origin.distanceToSquared(Sp)>(t.far-t.near)**2))&&(Mp.copy(r).invert(),Vs.copy(t.ray).applyMatrix4(Mp),!(n.boundingBox!==null&&Vs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Vs)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){let p=d[m],g=a[p.materialIndex],v=Math.max(p.start,u.start),b=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let M=v,A=b;M<A;M+=3){let T=o.getX(M),x=o.getX(M+1),S=o.getX(M+2);i=il(this,g,t,n,c,h,f,T,x,S),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,u.start),_=Math.min(o.count,u.start+u.count);for(let p=m,g=_;p<g;p+=3){let v=o.getX(p),b=o.getX(p+1),M=o.getX(p+2);i=il(this,a,t,n,c,h,f,v,b,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){let p=d[m],g=a[p.materialIndex],v=Math.max(p.start,u.start),b=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let M=v,A=b;M<A;M+=3){let T=M,x=M+1,S=M+2;i=il(this,g,t,n,c,h,f,T,x,S),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,u.start),_=Math.min(l.count,u.start+u.count);for(let p=m,g=_;p<g;p+=3){let v=p,b=p+1,M=p+2;i=il(this,a,t,n,c,h,f,v,b,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function px(s,t,e,n,i,r,a,o){let l;if(t.side===xn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===ys,o),l===null)return null;nl.copy(o),nl.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(nl);return c<e.near||c>e.far?null:{distance:c,point:nl.clone(),object:s}}function il(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,jo),s.getVertexPosition(l,Qo),s.getVertexPosition(c,tl);let h=px(s,t,e,n,jo,Qo,tl,bp);if(h){let f=new H;fs.getBarycoord(bp,jo,Qo,tl,f),i&&(h.uv=fs.getInterpolatedAttribute(i,o,l,c,f,new Nt)),r&&(h.uv1=fs.getInterpolatedAttribute(r,o,l,c,f,new Nt)),a&&(h.normal=fs.getInterpolatedAttribute(a,o,l,c,f,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new H,materialIndex:0};fs.getNormal(jo,Qo,tl,d.normal),h.face=d,h.barycoord=f}return h}var Il=class extends wn{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ze,h=Ze,f,d){super(null,a,o,l,c,h,i,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hs=new ms,mx=new Nt(.5,.5),sl=new H,gs=class{constructor(t=new Qn,e=new Qn,n=new Qn,i=new Qn,r=new Qn,a=new Qn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Xn,n=!1){let i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],d=r[6],u=r[7],m=r[8],_=r[9],p=r[10],g=r[11],v=r[12],b=r[13],M=r[14],A=r[15];if(i[0].setComponents(c-a,u-h,g-m,A-v).normalize(),i[1].setComponents(c+a,u+h,g+m,A+v).normalize(),i[2].setComponents(c+o,u+f,g+_,A+b).normalize(),i[3].setComponents(c-o,u-f,g-_,A-b).normalize(),n)i[4].setComponents(l,d,p,M).normalize(),i[5].setComponents(c-l,u-d,g-p,A-M).normalize();else if(i[4].setComponents(c-l,u-d,g-p,A-M).normalize(),e===Xn)i[5].setComponents(c+l,u+d,g+p,A+M).normalize();else if(e===Lr)i[5].setComponents(l,d,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hs)}intersectsSprite(t){Hs.center.set(0,0,0);let e=mx.distanceTo(t.center);return Hs.radius=.7071067811865476+e,Hs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hs)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(sl.x=i.normal.x>0?t.max.x:t.min.x,sl.y=i.normal.y>0?t.max.y:t.min.y,sl.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(sl)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},wp=new be,Ll=class s{constructor(){this.coordinateSystem=Xn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];wp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new gs),n[i].setFromProjectionMatrix(wp,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new gs),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};var Xs=class extends ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Dl=new H,Nl=new H,Ap=new be,ba=new Fr,rl=new ms,xu=new H,Tp=new H,Ul=class extends Je{constructor(t=new An,e=new Xs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Dl.fromBufferAttribute(e,i-1),Nl.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Dl.distanceTo(Nl);t.setAttribute("lineDistance",new Fe(n,1))}else Kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rl.copy(n.boundingSphere),rl.applyMatrix4(i),rl.radius+=r,t.ray.intersectsSphere(rl)===!1)return;Ap.copy(i).invert(),ba.copy(t.ray).applyMatrix4(Ap);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=u,p=m-1;_<p;_+=c){let g=h.getX(_),v=h.getX(_+1),b=al(this,t,ba,l,g,v,_);b&&e.push(b)}if(this.isLineLoop){let _=h.getX(m-1),p=h.getX(u),g=al(this,t,ba,l,_,p,m-1);g&&e.push(g)}}else{let u=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=u,p=m-1;_<p;_+=c){let g=al(this,t,ba,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=al(this,t,ba,l,m-1,u,m-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function al(s,t,e,n,i,r,a){let o=s.geometry.attributes.position;if(Dl.fromBufferAttribute(o,i),Nl.fromBufferAttribute(o,r),e.distanceSqToSegment(Dl,Nl,xu,Tp)>n)return;xu.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(xu);if(!(c<t.near||c>t.far))return{distance:c,point:Tp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Ep=new H,Cp=new H,Or=class extends Ul{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Ep.fromBufferAttribute(e,i),Cp.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ep.distanceTo(Cp);t.setAttribute("lineDistance",new Fe(n,1))}else Kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Fl=class extends ti{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Rp=new be,Eu=new Fr,ol=new ms,ll=new H,Oa=class extends Je{constructor(t=new An,e=new Fl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ol.copy(n.boundingSphere),ol.applyMatrix4(i),ol.radius+=r,t.ray.intersectsSphere(ol)===!1)return;Rp.copy(i).invert(),Eu.copy(t.ray).applyMatrix4(Rp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let m=d,_=u;m<_;m++){let p=c.getX(m);ll.fromBufferAttribute(f,p),Pp(ll,p,l,i,t,e,this)}}else{let d=Math.max(0,a.start),u=Math.min(f.count,a.start+a.count);for(let m=d,_=u;m<_;m++)ll.fromBufferAttribute(f,m),Pp(ll,m,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Pp(s,t,e,n,i,r,a){let o=Eu.distanceSqToPoint(s);if(o<e){let l=new H;Eu.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Ba=class extends wn{constructor(t=[],e=js,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Xi=class extends wn{constructor(t,e,n=ei,i,r,a,o=Ze,l=Ze,c,h=Hi,f=1){if(h!==Hi&&h!==$i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:f};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Nr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ka=class extends Xi{constructor(t,e=ei,n=js,i,r,a=Ze,o=Ze,l,c=Hi){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},za=class extends wn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Br=class s extends An{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],d=0,u=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(h,3)),this.setAttribute("uv",new Fe(f,2));function m(_,p,g,v,b,M,A,T,x,S,P){let R=M/x,D=A/S,W=M/2,O=A/2,C=T/2,k=x+1,G=S+1,U=0,j=0,q=new H;for(let et=0;et<G;et++){let Z=et*D-O;for(let gt=0;gt<k;gt++){let $=gt*R-W;q[_]=$*v,q[p]=Z*b,q[g]=C,c.push(q.x,q.y,q.z),q[_]=0,q[p]=0,q[g]=T>0?1:-1,h.push(q.x,q.y,q.z),f.push(gt/x),f.push(1-et/S),U+=1}}for(let et=0;et<S;et++)for(let Z=0;Z<x;Z++){let gt=d+Z+k*et,$=d+Z+k*(et+1),L=d+(Z+1)+k*(et+1),X=d+(Z+1)+k*et;l.push(gt,$,X),l.push($,L,X),j+=6}o.addGroup(u,j,P),u+=j,d+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,u=(a-h)/d;return(i+u)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new Nt:new H);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new H,i=[],r=[],a=[],o=new H,l=new be;for(let u=0;u<=t;u++){let m=u/t;i[u]=this.getTangentAt(m,new H)}r[0]=new H,a[0]=new H;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),f=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(i[u-1],i[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(re(i[u-1].dot(i[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(i[u],r[u])}if(e===!0){let u=Math.acos(re(r[0].dot(r[t]),-1,1));u/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],u*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},kr=class extends Fn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Nt){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*h-u*f+this.aX,c=d*f+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ol=class extends kr{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function od(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+f)+(l-o)/f;d*=h,u*=h,i(a,o,d,u)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var Ip=new H,Lp=new H,vu=new od,yu=new od,Mu=new od,Bl=class extends Fn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new H){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Lp.subVectors(i[0],i[1]).add(i[0]),c=Lp);let f=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ip.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ip),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(f),u),_=Math.pow(f.distanceToSquared(d),u),p=Math.pow(d.distanceToSquared(h),u);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),vu.initNonuniformCatmullRom(c.x,f.x,d.x,h.x,m,_,p),yu.initNonuniformCatmullRom(c.y,f.y,d.y,h.y,m,_,p),Mu.initNonuniformCatmullRom(c.z,f.z,d.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(vu.initCatmullRom(c.x,f.x,d.x,h.x,this.tension),yu.initCatmullRom(c.y,f.y,d.y,h.y,this.tension),Mu.initCatmullRom(c.z,f.z,d.z,h.z,this.tension));return n.set(vu.calc(l),yu.calc(l),Mu.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new H().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Dp(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function gx(s,t){let e=1-s;return e*e*t}function _x(s,t){return 2*(1-s)*s*t}function xx(s,t){return s*s*t}function Ta(s,t,e,n){return gx(s,t)+_x(s,e)+xx(s,n)}function vx(s,t){let e=1-s;return e*e*e*t}function yx(s,t){let e=1-s;return 3*e*e*s*t}function Mx(s,t){return 3*(1-s)*s*s*t}function Sx(s,t){return s*s*s*t}function Ea(s,t,e,n,i){return vx(s,t)+yx(s,e)+Mx(s,n)+Sx(s,i)}var Ga=class extends Fn{constructor(t=new Nt,e=new Nt,n=new Nt,i=new Nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Nt){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ea(t,i.x,r.x,a.x,o.x),Ea(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},kl=class extends Fn{constructor(t=new H,e=new H,n=new H,i=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new H){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ea(t,i.x,r.x,a.x,o.x),Ea(t,i.y,r.y,a.y,o.y),Ea(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Va=class extends Fn{constructor(t=new Nt,e=new Nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Nt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},zl=class extends Fn{constructor(t=new H,e=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new H){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new H){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ha=class extends Fn{constructor(t=new Nt,e=new Nt,n=new Nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Nt){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ta(t,i.x,r.x,a.x),Ta(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gl=class extends Fn{constructor(t=new H,e=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new H){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ta(t,i.x,r.x,a.x),Ta(t,i.y,r.y,a.y),Ta(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wa=class extends Fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Nt){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(Dp(o,l.x,c.x,h.x,f.x),Dp(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new Nt().fromArray(i))}return this}},Cu=Object.freeze({__proto__:null,ArcCurve:Ol,CatmullRomCurve3:Bl,CubicBezierCurve:Ga,CubicBezierCurve3:kl,EllipseCurve:kr,LineCurve:Va,LineCurve3:zl,QuadraticBezierCurve:Ha,QuadraticBezierCurve3:Gl,SplineCurve:Wa}),Vl=class extends Fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Cu[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Cu[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},qs=class extends Vl{constructor(t){super(),this.type="Path",this.currentPoint=new Nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Va(this.currentPoint.clone(),new Nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Ha(this.currentPoint.clone(),new Nt(t,e),new Nt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new Ga(this.currentPoint.clone(),new Nt(t,e),new Nt(n,i),new Nt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Wa(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new kr(t,e,n,i,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},zr=class extends qs{constructor(t){super(t),this.uuid=Jr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new qs().fromJSON(i))}return this}};function bx(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Rm(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Cx(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,f=l;for(let d=e;d<i;d+=e){let u=s[d],m=s[d+1];u<o&&(o=u),m<l&&(l=m),u>h&&(h=u),m>f&&(f=m)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return Xa(r,a,e,o,l,c,0),a}function Rm(s,t,e,n,i){let r;if(i===kx(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=Np(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Np(a/n|0,s[a],s[a+1],r);return r&&Gr(r,r.next)&&($a(r),r=r.next),r}function $s(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Gr(e,e.next)||Ue(e.prev,e,e.next)===0)){if($a(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Xa(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Dx(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Ax(s,n,i,r):wx(s)){t.push(l.i,s.i,c.i),$a(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Tx($s(s),t),Xa(s,t,e,n,i,r,2)):a===2&&Ex(s,t,e,n,i,r):Xa($s(s),t,e,n,i,r,1);break}}}function wx(s){let t=s.prev,e=s,n=s.next;if(Ue(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),f=Math.min(o,l,c),d=Math.max(i,r,a),u=Math.max(o,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=f&&m.y<=u&&wa(i,o,r,l,a,c,m.x,m.y)&&Ue(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ax(s,t,e,n){let i=s.prev,r=s,a=s.next;if(Ue(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,f=r.y,d=a.y,u=Math.min(o,l,c),m=Math.min(h,f,d),_=Math.max(o,l,c),p=Math.max(h,f,d),g=Ru(u,m,t,e,n),v=Ru(_,p,t,e,n),b=s.prevZ,M=s.nextZ;for(;b&&b.z>=g&&M&&M.z<=v;){if(b.x>=u&&b.x<=_&&b.y>=m&&b.y<=p&&b!==i&&b!==a&&wa(o,h,l,f,c,d,b.x,b.y)&&Ue(b.prev,b,b.next)>=0||(b=b.prevZ,M.x>=u&&M.x<=_&&M.y>=m&&M.y<=p&&M!==i&&M!==a&&wa(o,h,l,f,c,d,M.x,M.y)&&Ue(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;b&&b.z>=g;){if(b.x>=u&&b.x<=_&&b.y>=m&&b.y<=p&&b!==i&&b!==a&&wa(o,h,l,f,c,d,b.x,b.y)&&Ue(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;M&&M.z<=v;){if(M.x>=u&&M.x<=_&&M.y>=m&&M.y<=p&&M!==i&&M!==a&&wa(o,h,l,f,c,d,M.x,M.y)&&Ue(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Tx(s,t){let e=s;do{let n=e.prev,i=e.next.next;!Gr(n,i)&&Im(n,e,e.next,i)&&qa(n,i)&&qa(i,n)&&(t.push(n.i,e.i,i.i),$a(e),$a(e.next),e=s=i),e=e.next}while(e!==s);return $s(e)}function Ex(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Fx(a,o)){let l=Lm(a,o);a=$s(a,a.next),l=$s(l,l.next),Xa(a,t,e,n,i,r,0),Xa(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Cx(s,t,e,n){let i=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Rm(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Ux(c))}i.sort(Rx);for(let r=0;r<i.length;r++)e=Px(i[r],e);return e}function Rx(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Px(s,t){let e=Ix(s,t);if(!e)return t;let n=Lm(e,s);return $s(n,n.next),$s(e,e.next)}function Ix(s,t){let e=t,n=s.x,i=s.y,r=-1/0,a;if(Gr(s,e))return e;do{if(Gr(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let f=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Pm(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let f=Math.abs(i-e.y)/(n-e.x);qa(e,s)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&Lx(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function Lx(s,t){return Ue(s.prev,s,t.prev)<0&&Ue(t.next,s,s.next)<0}function Dx(s,t,e,n){let i=s;do i.z===0&&(i.z=Ru(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Nx(i)}function Nx(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Ru(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Ux(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Pm(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function wa(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Pm(s,t,e,n,i,r,a,o)}function Fx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Ox(s,t)&&(qa(s,t)&&qa(t,s)&&Bx(s,t)&&(Ue(s.prev,s,t.prev)||Ue(s,t.prev,t))||Gr(s,t)&&Ue(s.prev,s,s.next)>0&&Ue(t.prev,t,t.next)>0)}function Ue(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Gr(s,t){return s.x===t.x&&s.y===t.y}function Im(s,t,e,n){let i=hl(Ue(s,t,e)),r=hl(Ue(s,t,n)),a=hl(Ue(e,n,s)),o=hl(Ue(e,n,t));return!!(i!==r&&a!==o||i===0&&cl(s,e,t)||r===0&&cl(s,n,t)||a===0&&cl(e,s,n)||o===0&&cl(e,t,n))}function cl(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function hl(s){return s>0?1:s<0?-1:0}function Ox(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Im(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function qa(s,t){return Ue(s.prev,s,s.next)<0?Ue(s,t,s.next)>=0&&Ue(s,s.prev,t)>=0:Ue(s,t,s.prev)<0||Ue(s,s.next,t)<0}function Bx(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Lm(s,t){let e=Pu(s.i,s.x,s.y),n=Pu(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Np(s,t,e,n){let i=Pu(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function $a(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Pu(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function kx(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Iu=class{static triangulate(t,e,n=2){return bx(t,e,n)}},Ws=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];Up(t),Fp(n,t);let a=t.length;e.forEach(Up);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Fp(n,e[l]);let o=Iu.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Up(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Fp(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var Ya=class s extends An{constructor(t=new zr([new Nt(.5,.5),new Nt(-.5,.5),new Nt(-.5,-.5),new Nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Fe(i,3)),this.setAttribute("uv",new Fe(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:u-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:zx,b,M=!1,A,T,x,S;if(g){b=g.getSpacedPoints(h),M=!0,d=!1;let ct=g.isCatmullRomCurve3?g.closed:!1;A=g.computeFrenetFrames(h,ct),T=new H,x=new H,S=new H}d||(p=0,u=0,m=0,_=0);let P=o.extractPoints(c),R=P.shape,D=P.holes;if(!Ws.isClockWise(R)){R=R.reverse();for(let ct=0,V=D.length;ct<V;ct++){let tt=D[ct];Ws.isClockWise(tt)&&(D[ct]=tt.reverse())}}function O(ct){let tt=10000000000000001e-36,ht=ct[0];for(let F=1;F<=ct.length;F++){let nt=F%ct.length,mt=ct[nt],Ct=mt.x-ht.x,Dt=mt.y-ht.y,Xt=Ct*Ct+Dt*Dt,N=Math.max(Math.abs(mt.x),Math.abs(mt.y),Math.abs(ht.x),Math.abs(ht.y)),fe=tt*N*N;if(Xt<=fe){ct.splice(nt,1),F--;continue}ht=mt}}O(R),D.forEach(O);let C=D.length,k=R;for(let ct=0;ct<C;ct++){let V=D[ct];R=R.concat(V)}function G(ct,V,tt){return V||jt("ExtrudeGeometry: vec does not exist"),ct.clone().addScaledVector(V,tt)}let U=R.length;function j(ct,V,tt){let ht,F,nt,mt=ct.x-V.x,Ct=ct.y-V.y,Dt=tt.x-ct.x,Xt=tt.y-ct.y,N=mt*mt+Ct*Ct,fe=mt*Xt-Ct*Dt;if(Math.abs(fe)>Number.EPSILON){let ot=Math.sqrt(N),St=Math.sqrt(Dt*Dt+Xt*Xt),lt=V.x-Ct/ot,Rt=V.y+mt/ot,vt=tt.x-Xt/St,bt=tt.y+Dt/St,E=((vt-lt)*Xt-(bt-Rt)*Dt)/(mt*Xt-Ct*Dt);ht=lt+mt*E-ct.x,F=Rt+Ct*E-ct.y;let y=ht*ht+F*F;if(y<=2)return new Nt(ht,F);nt=Math.sqrt(y/2)}else{let ot=!1;mt>Number.EPSILON?Dt>Number.EPSILON&&(ot=!0):mt<-Number.EPSILON?Dt<-Number.EPSILON&&(ot=!0):Math.sign(Ct)===Math.sign(Xt)&&(ot=!0),ot?(ht=-Ct,F=mt,nt=Math.sqrt(N)):(ht=mt,F=Ct,nt=Math.sqrt(N/2))}return new Nt(ht/nt,F/nt)}let q=[];for(let ct=0,V=k.length,tt=V-1,ht=ct+1;ct<V;ct++,tt++,ht++)tt===V&&(tt=0),ht===V&&(ht=0),q[ct]=j(k[ct],k[tt],k[ht]);let et=[],Z,gt=q.concat();for(let ct=0,V=C;ct<V;ct++){let tt=D[ct];Z=[];for(let ht=0,F=tt.length,nt=F-1,mt=ht+1;ht<F;ht++,nt++,mt++)nt===F&&(nt=0),mt===F&&(mt=0),Z[ht]=j(tt[ht],tt[nt],tt[mt]);et.push(Z),gt=gt.concat(Z)}let $;if(p===0)$=Ws.triangulateShape(k,D);else{let ct=[],V=[];for(let tt=0;tt<p;tt++){let ht=tt/p,F=u*Math.cos(ht*Math.PI/2),nt=m*Math.sin(ht*Math.PI/2)+_;for(let mt=0,Ct=k.length;mt<Ct;mt++){let Dt=G(k[mt],q[mt],nt);Ut(Dt.x,Dt.y,-F),ht===0&&ct.push(Dt)}for(let mt=0,Ct=C;mt<Ct;mt++){let Dt=D[mt];Z=et[mt];let Xt=[];for(let N=0,fe=Dt.length;N<fe;N++){let ot=G(Dt[N],Z[N],nt);Ut(ot.x,ot.y,-F),ht===0&&Xt.push(ot)}ht===0&&V.push(Xt)}}$=Ws.triangulateShape(ct,V)}let L=$.length,X=m+_;for(let ct=0;ct<U;ct++){let V=d?G(R[ct],gt[ct],X):R[ct];M?(x.copy(A.normals[0]).multiplyScalar(V.x),T.copy(A.binormals[0]).multiplyScalar(V.y),S.copy(b[0]).add(x).add(T),Ut(S.x,S.y,S.z)):Ut(V.x,V.y,0)}for(let ct=1;ct<=h;ct++)for(let V=0;V<U;V++){let tt=d?G(R[V],gt[V],X):R[V];M?(x.copy(A.normals[ct]).multiplyScalar(tt.x),T.copy(A.binormals[ct]).multiplyScalar(tt.y),S.copy(b[ct]).add(x).add(T),Ut(S.x,S.y,S.z)):Ut(tt.x,tt.y,f/h*ct)}for(let ct=p-1;ct>=0;ct--){let V=ct/p,tt=u*Math.cos(V*Math.PI/2),ht=m*Math.sin(V*Math.PI/2)+_;for(let F=0,nt=k.length;F<nt;F++){let mt=G(k[F],q[F],ht);Ut(mt.x,mt.y,f+tt)}for(let F=0,nt=D.length;F<nt;F++){let mt=D[F];Z=et[F];for(let Ct=0,Dt=mt.length;Ct<Dt;Ct++){let Xt=G(mt[Ct],Z[Ct],ht);M?Ut(Xt.x,Xt.y+b[h-1].y,b[h-1].x+tt):Ut(Xt.x,Xt.y,f+tt)}}}Q(),_t();function Q(){let ct=i.length/3;if(d){let V=0,tt=U*V;for(let ht=0;ht<L;ht++){let F=$[ht];Zt(F[2]+tt,F[1]+tt,F[0]+tt)}V=h+p*2,tt=U*V;for(let ht=0;ht<L;ht++){let F=$[ht];Zt(F[0]+tt,F[1]+tt,F[2]+tt)}}else{for(let V=0;V<L;V++){let tt=$[V];Zt(tt[2],tt[1],tt[0])}for(let V=0;V<L;V++){let tt=$[V];Zt(tt[0]+U*h,tt[1]+U*h,tt[2]+U*h)}}n.addGroup(ct,i.length/3-ct,0)}function _t(){let ct=i.length/3,V=0;st(k,V),V+=k.length;for(let tt=0,ht=D.length;tt<ht;tt++){let F=D[tt];st(F,V),V+=F.length}n.addGroup(ct,i.length/3-ct,1)}function st(ct,V){let tt=ct.length;for(;--tt>=0;){let ht=tt,F=tt-1;F<0&&(F=ct.length-1);for(let nt=0,mt=h+p*2;nt<mt;nt++){let Ct=U*nt,Dt=U*(nt+1),Xt=V+ht+Ct,N=V+F+Ct,fe=V+F+Dt,ot=V+ht+Dt;Lt(Xt,N,fe,ot)}}}function Ut(ct,V,tt){l.push(ct),l.push(V),l.push(tt)}function Zt(ct,V,tt){qt(ct),qt(V),qt(tt);let ht=i.length/3,F=v.generateTopUV(n,i,ht-3,ht-2,ht-1);$t(F[0]),$t(F[1]),$t(F[2])}function Lt(ct,V,tt,ht){qt(ct),qt(V),qt(ht),qt(V),qt(tt),qt(ht);let F=i.length/3,nt=v.generateSideWallUV(n,i,F-6,F-3,F-2,F-1);$t(nt[0]),$t(nt[1]),$t(nt[3]),$t(nt[1]),$t(nt[2]),$t(nt[3])}function qt(ct){i.push(l[ct*3+0]),i.push(l[ct*3+1]),i.push(l[ct*3+2])}function $t(ct){r.push(ct.x),r.push(ct.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Gx(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Cu[i.type]().fromJSON(i)),new s(n,t.options)}},zx={generateTopUV:function(s,t,e,n,i){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Nt(r,a),new Nt(o,l),new Nt(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],d=t[i*3],u=t[i*3+1],m=t[i*3+2],_=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Nt(a,1-l),new Nt(c,1-f),new Nt(d,1-m),new Nt(_,1-g)]:[new Nt(o,1-l),new Nt(h,1-f),new Nt(u,1-m),new Nt(p,1-g)]}};function Gx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ys=class s extends An{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=t/o,d=e/l,u=[],m=[],_=[],p=[];for(let g=0;g<h;g++){let v=g*d-a;for(let b=0;b<c;b++){let M=b*f-r;m.push(M,-v,0),_.push(0,0,1),p.push(b/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){let b=v+c*g,M=v+c*(g+1),A=v+1+c*(g+1),T=v+1+c*g;u.push(b,M,T),u.push(M,A,T)}this.setIndex(u),this.setAttribute("position",new Fe(m,3)),this.setAttribute("normal",new Fe(_,3)),this.setAttribute("uv",new Fe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Za=class extends ti{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ee(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function tr(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(Op(i))i.isRenderTargetTexture?(Kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Op(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function cn(s){let t={};for(let e=0;e<s.length;e++){let n=tr(s[e]);for(let i in n)t[i]=n[i]}return t}function Op(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Vx(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ld(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var Dm={clone:tr,merge:cn},Hx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qn=class extends ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hx,this.fragmentShader=Wx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=tr(t.uniforms),this.uniformsGroups=Vx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new ee().setHex(i.value);break;case"v2":this.uniforms[n].value=new Nt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new H().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Re().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Qt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new be().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Hl=class extends qn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Vr=class extends ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wc,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Wl=class extends ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Xl=class extends ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Er(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function ul(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var _s=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ql=class extends _s{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wu,endingEnd:wu}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Au:r=t,o=2*e-n;break;case Tu:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Au:a=t,l=2*n-e;break;case Tu:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-e)/(i-e),_=m*m,p=_*m,g=-d*p+2*d*_-d*m,v=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*m+1,b=(-1-u)*p+(1.5+u)*_+.5*m,M=u*p-u*_;for(let A=0;A!==o;++A)r[A]=g*a[h+A]+v*a[c+A]+b*a[l+A]+M*a[f+A];return r}},$l=class extends _s{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),f=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*f+a[l+d]*h;return r}},Yl=class extends _s{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Zl=class extends _s{interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let m=(n-e)/(i-e),_=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*_+a[l+p]*m;return r}let d=o*2,u=t-1;for(let m=0;m!==o;++m){let _=a[c+m],p=a[l+m],g=u*d+m*2,v=f[g],b=f[g+1],M=t*d+m*2,A=h[M],T=h[M+1],x=qx(n,e,v,A,i);r[m]=Nm(x,_,b,T,p)}return r}};function Nm(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function Xx(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function qx(s,t,e,n,i){let r=(s-t)/(i-t);for(let a=0;a<8;a++){let o=Nm(r,t,e,n,i)-s;if(Math.abs(o)<1e-10)break;let l=Xx(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var On=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Er(e,this.TimeBufferType),this.values=Er(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Er(t.times,Array),values:Er(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),ul(t.settings)&&(n.settings={inTangents:Er(t.settings.inTangents,Array),outTangents:Er(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Yl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new $l(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ql(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Zl(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ca:e=this.InterpolantFactoryMethodDiscrete;break;case Al:e=this.InterpolantFactoryMethodLinear;break;case pl:e=this.InterpolantFactoryMethodSmooth;break;case bu:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Kt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ca;case this.InterpolantFactoryMethodLinear:return Al;case this.InterpolantFactoryMethodSmooth:return pl;case this.InterpolantFactoryMethodBezier:return bu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;ul(this.settings)&&(Bp(this.settings.inTangents,t),Bp(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;ul(this.settings)&&(kp(this.settings.inTangents,t),kp(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(jt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(jt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){jt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){jt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&Y_(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){jt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===pl,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let f=o*n,d=f-n,u=f+n;for(let m=0;m!==n;++m){let _=e[f+m];if(_!==e[d+m]||_!==e[u+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*n,d=a*n;for(let u=0;u!==n;++u)e[d+u]=e[f+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,ul(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Bp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]+=t}function kp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}On.prototype.ValueTypeName="";On.prototype.TimeBufferType=Float32Array;On.prototype.ValueBufferType=Float32Array;On.prototype.DefaultInterpolation=Al;var xs=class extends On{constructor(t,e,n){super(t,e,n)}};xs.prototype.ValueTypeName="bool";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=Ca;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;var Jl=class extends On{constructor(t,e,n,i){super(t,e,n,i)}};Jl.prototype.ValueTypeName="color";var Kl=class extends On{constructor(t,e,n,i){super(t,e,n,i)}};Kl.prototype.ValueTypeName="number";var jl=class extends _s{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)yi.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ja=class extends On{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new jl(this.times,this.values,this.getValueSize(),t)}};Ja.prototype.ValueTypeName="quaternion";Ja.prototype.InterpolantFactoryMethodSmooth=void 0;var vs=class extends On{constructor(t,e,n){super(t,e,n)}};vs.prototype.ValueTypeName="string";vs.prototype.ValueBufferType=Array;vs.prototype.DefaultInterpolation=Ca;vs.prototype.InterpolantFactoryMethodLinear=void 0;vs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ql=class extends On{constructor(t,e,n,i){super(t,e,n,i)}};Ql.prototype.ValueTypeName="vector";var tc=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=c.length;f<d;f+=2){let u=c[f],m=c[f+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Um=new tc,ec=class{constructor(t){this.manager=t!==void 0?t:Um,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};ec.DEFAULT_MATERIAL_NAME="__DEFAULT";var Hr=class extends Je{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Ka=class extends Hr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Su=new be,zp=new H,Gp=new H,nc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Nt(512,512),this.mapType=Tn,this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gs,this._frameExtents=new Nt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;zp.setFromMatrixPosition(t.matrixWorld),e.position.copy(zp),Gp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gp),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Su.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Su,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===Lr||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Su)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},dl=new H,fl=new yi,gi=new H,ja=class extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be,this.coordinateSystem=Xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(dl,fl,gi),gi.x===1&&gi.y===1&&gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(dl,fl,gi.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(dl,fl,gi),gi.x===1&&gi.y===1&&gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(dl,fl,gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ds=new H,Vp=new Nt,Hp=new Nt,gn=class extends ja{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Tl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Kh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Tl*2*Math.atan(Math.tan(Kh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ds.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ds.x,ds.y).multiplyScalar(-t/ds.z),ds.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ds.x,ds.y).multiplyScalar(-t/ds.z)}getViewSize(t,e){return this.getViewBounds(t,Vp,Hp),e.subVectors(Hp,Vp)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Kh*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Qa=class extends ja{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Lu=class extends nc{constructor(){super(new Qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Wr=class extends Hr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.target=new Je,this.shadow=new Lu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},to=class extends Hr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Cr=-90,Rr=1,Xr=class extends Je{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new gn(Cr,Rr,t,e);i.layers=this.layers,this.add(i);let r=new gn(Cr,Rr,t,e);r.layers=this.layers,this.add(r);let a=new gn(Cr,Rr,t,e);a.layers=this.layers,this.add(a);let o=new gn(Cr,Rr,t,e);o.layers=this.layers,this.add(o);let l=new gn(Cr,Rr,t,e);l.layers=this.layers,this.add(l);let c=new gn(Cr,Rr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,d,u),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ic=class extends gn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var cd="\\[\\]\\.:\\/",$x=new RegExp("["+cd+"]","g"),hd="[^"+cd+"]",Yx="[^"+cd.replace("\\.","")+"]",Zx=/((?:WC+[\/:])*)/.source.replace("WC",hd),Jx=/(WCOD+)?/.source.replace("WCOD",Yx),Kx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hd),jx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hd),Qx=new RegExp("^"+Zx+Jx+Kx+jx+"$"),tv=["material","materials","bones","map"],Du=class{constructor(t,e,n){let i=n||Te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Te=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($x,"")}static parseTrackName(t){let e=Qx.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);tv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Kt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){jt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){jt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){jt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){jt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){jt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;jt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=Du;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var B1=new Float32Array(1);var gd=class gd{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};gd.prototype.isMatrix2=!0;var Nu=gd;function ud(s,t,e,n){let i=ev(n);switch(e){case ju:return s*t;case td:return s*t/i.components*i.byteLength;case uc:return s*t/i.components*i.byteLength;case Ms:return s*t*2/i.components*i.byteLength;case dc:return s*t*2/i.components*i.byteLength;case Qu:return s*t*3/i.components*i.byteLength;case si:return s*t*4/i.components*i.byteLength;case fc:return s*t*4/i.components*i.byteLength;case so:case ro:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ao:case oo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case mc:case _c:return Math.max(s,16)*Math.max(t,8)/4;case pc:case gc:return Math.max(s,8)*Math.max(t,8)/2;case xc:case vc:case Mc:case Sc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case yc:case lo:case bc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case wc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ac:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Tc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ec:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Cc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Rc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Lc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Dc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Nc:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Uc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Fc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Oc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Bc:case kc:case zc:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Gc:case Vc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case co:case Hc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ev(s){switch(s){case Tn:case Yu:return{byteLength:1,components:1};case Zr:case Zu:case ii:return{byteLength:2,components:1};case cc:case hc:return{byteLength:2,components:4};case ei:case lc:case ni:return{byteLength:4,components:1};case Ju:case Ku:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function i0(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function iv(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=s.HALF_FLOAT:u=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=s.SHORT;else if(c instanceof Uint32Array)u=s.UNSIGNED_INT;else if(c instanceof Int32Array)u=s.INT;else if(c instanceof Int8Array)u=s.BYTE;else if(c instanceof Uint8Array)u=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let h=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,h);else{f.sort((u,m)=>u.start-m.start);let d=0;for(let u=1;u<f.length;u++){let m=f[d],_=f[u];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,f[d]=_)}f.length=d+1;for(let u=0,m=f.length;u<m;u++){let _=f[u];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var sv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rv=`#ifdef USE_ALPHAHASH
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
#endif`,av=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ov=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hv=`#ifdef USE_AOMAP
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
#endif`,uv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dv=`#ifdef USE_BATCHING
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
#endif`,fv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_v=`#ifdef USE_IRIDESCENCE
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
#endif`,xv=`#ifdef USE_BUMPMAP
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
#endif`,vv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,yv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,wv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Av=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Tv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ev=`#define PI 3.141592653589793
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
} // validated`,Cv=`vec3 transformedNormal = objectNormal;
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
#endif`,Rv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Iv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uv=`#ifdef USE_ENVMAP
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
#endif`,Fv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Ov=`#ifdef USE_ENVMAP
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
#endif`,Bv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kv=`#ifdef USE_ENVMAP
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
#endif`,zv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wv=`#ifdef USE_GRADIENTMAP
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
}`,Xv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$v=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Zv=`#ifdef USE_ENVMAP
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
#endif`,Jv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ty=`PhysicalMaterial material;
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
#endif`,ey=`uniform sampler2D dfgLUT;
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
}`,ny=`
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
#endif`,iy=`#if defined( RE_IndirectDiffuse )
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
#endif`,sy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ry=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,ay=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,oy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ly=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fy=`#if defined( USE_POINTS_UV )
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
#endif`,py=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,my=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_y=`#if defined( USE_MORPHCOLORS )
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
#endif`,xy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vy=`#ifdef USE_MORPHTARGETS
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
#endif`,yy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,My=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,by=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ay=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ty=`#ifdef USE_NORMALMAP
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
#endif`,Ey=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ry=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Py=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Iy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ly=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Dy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ny=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Uy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Oy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,By=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ky=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vy=`float getShadowMask() {
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
}`,Hy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wy=`#ifdef USE_SKINNING
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
#endif`,Xy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qy=`#ifdef USE_SKINNING
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
#endif`,$y=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ky=`#ifdef USE_TRANSMISSION
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
#endif`,jy=`#ifdef USE_TRANSMISSION
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
#endif`,Qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,iM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sM=`uniform sampler2D t2D;
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
}`,rM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aM=`uniform float backgroundBlurriness;
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
}`,oM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cM=`#include <common>
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
}`,hM=`#if DEPTH_PACKING == 3200
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
}`,uM=`#define DISTANCE
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
}`,dM=`#define DISTANCE
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
}`,fM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mM=`uniform float scale;
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
}`,gM=`uniform vec3 diffuse;
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
}`,_M=`#include <common>
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
}`,xM=`uniform vec3 diffuse;
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
}`,vM=`#define LAMBERT
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
}`,yM=`#define LAMBERT
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
}`,MM=`#define MATCAP
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
}`,SM=`#define MATCAP
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
}`,bM=`#define NORMAL
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
}`,wM=`#define NORMAL
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
}`,AM=`#define PHONG
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
}`,TM=`#define PHONG
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
}`,EM=`#define STANDARD
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
}`,CM=`#define STANDARD
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
}`,RM=`#define TOON
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
}`,PM=`#define TOON
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
}`,IM=`uniform float size;
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
}`,LM=`uniform vec3 diffuse;
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
}`,DM=`#include <common>
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
}`,NM=`uniform vec3 color;
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
}`,UM=`uniform float rotation;
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
}`,FM=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:sv,alphahash_pars_fragment:rv,alphamap_fragment:av,alphamap_pars_fragment:ov,alphatest_fragment:lv,alphatest_pars_fragment:cv,aomap_fragment:hv,aomap_pars_fragment:uv,batching_pars_vertex:dv,batching_vertex:fv,begin_vertex:pv,beginnormal_vertex:mv,bsdfs:gv,iridescence_fragment:_v,bumpmap_pars_fragment:xv,clipping_planes_fragment:vv,clipping_planes_pars_fragment:yv,clipping_planes_pars_vertex:Mv,clipping_planes_vertex:Sv,color_fragment:bv,color_pars_fragment:wv,color_pars_vertex:Av,color_vertex:Tv,common:Ev,defaultnormal_vertex:Cv,displacementmap_pars_vertex:Rv,displacementmap_vertex:Pv,emissivemap_fragment:Iv,emissivemap_pars_fragment:Lv,colorspace_fragment:Dv,colorspace_pars_fragment:Nv,envmap_fragment:Uv,envmap_common_pars_fragment:Fv,envmap_pars_fragment:Ov,envmap_pars_vertex:Bv,envmap_physical_pars_fragment:Zv,envmap_vertex:kv,fog_vertex:zv,fog_pars_vertex:Gv,fog_fragment:Vv,fog_pars_fragment:Hv,gradientmap_pars_fragment:Wv,lightmap_pars_fragment:Xv,lights_lambert_fragment:qv,lights_lambert_pars_fragment:$v,lights_pars_begin:Yv,lights_toon_fragment:Jv,lights_toon_pars_fragment:Kv,lights_phong_fragment:jv,lights_phong_pars_fragment:Qv,lights_physical_fragment:ty,lights_physical_pars_fragment:ey,lights_fragment_begin:ny,lights_fragment_maps:iy,lights_fragment_end:sy,lightprobes_pars_fragment:ry,logdepthbuf_fragment:ay,logdepthbuf_pars_fragment:oy,logdepthbuf_pars_vertex:ly,logdepthbuf_vertex:cy,map_fragment:hy,map_pars_fragment:uy,map_particle_fragment:dy,map_particle_pars_fragment:fy,metalnessmap_fragment:py,metalnessmap_pars_fragment:my,morphinstance_vertex:gy,morphcolor_vertex:_y,morphnormal_vertex:xy,morphtarget_pars_vertex:vy,morphtarget_vertex:yy,normal_fragment_begin:My,normal_fragment_maps:Sy,normal_pars_fragment:by,normal_pars_vertex:wy,normal_vertex:Ay,normalmap_pars_fragment:Ty,clearcoat_normal_fragment_begin:Ey,clearcoat_normal_fragment_maps:Cy,clearcoat_pars_fragment:Ry,iridescence_pars_fragment:Py,opaque_fragment:Iy,packing:Ly,premultiplied_alpha_fragment:Dy,project_vertex:Ny,dithering_fragment:Uy,dithering_pars_fragment:Fy,roughnessmap_fragment:Oy,roughnessmap_pars_fragment:By,shadowmap_pars_fragment:ky,shadowmap_pars_vertex:zy,shadowmap_vertex:Gy,shadowmask_pars_fragment:Vy,skinbase_vertex:Hy,skinning_pars_vertex:Wy,skinning_vertex:Xy,skinnormal_vertex:qy,specularmap_fragment:$y,specularmap_pars_fragment:Yy,tonemapping_fragment:Zy,tonemapping_pars_fragment:Jy,transmission_fragment:Ky,transmission_pars_fragment:jy,uv_pars_fragment:Qy,uv_pars_vertex:tM,uv_vertex:eM,worldpos_vertex:nM,background_vert:iM,background_frag:sM,backgroundCube_vert:rM,backgroundCube_frag:aM,cube_vert:oM,cube_frag:lM,depth_vert:cM,depth_frag:hM,distance_vert:uM,distance_frag:dM,equirect_vert:fM,equirect_frag:pM,linedashed_vert:mM,linedashed_frag:gM,meshbasic_vert:_M,meshbasic_frag:xM,meshlambert_vert:vM,meshlambert_frag:yM,meshmatcap_vert:MM,meshmatcap_frag:SM,meshnormal_vert:bM,meshnormal_frag:wM,meshphong_vert:AM,meshphong_frag:TM,meshphysical_vert:EM,meshphysical_frag:CM,meshtoon_vert:RM,meshtoon_frag:PM,points_vert:IM,points_frag:LM,shadow_vert:DM,shadow_frag:NM,sprite_vert:UM,sprite_frag:FM},Ot={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},wi={basic:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:cn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:cn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:cn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:cn([Ot.points,Ot.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:cn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:cn([Ot.common,Ot.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:cn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:cn([Ot.sprite,Ot.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:cn([Ot.common,Ot.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:cn([Ot.lights,Ot.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};wi.physical={uniforms:cn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var Xc={r:0,b:0,g:0},OM=new be,s0=new Qt;s0.set(-1,0,0,0,1,0,0,0,1);function BM(s,t,e,n,i,r){let a=new ee(0),o=i===!0?0:1,l,c,h=null,f=0,d=null;function u(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){let M=v.backgroundBlurriness>0;b=t.get(b,M)}return b}function m(v){let b=!1,M=u(v);M===null?p(a,o):M&&M.isColor&&(p(M,1),b=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(v,b){let M=u(b);M&&M.isCubeTexture?(c===void 0&&(c=new Un(new Br(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:tr(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(OM.makeRotationFromEuler(b.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(s0),c.material.toneMapped=ce.getTransfer(M.colorSpace)!==_e,(h!==M||f!==M.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,d=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Un(new Ys(2,2),new qn({name:"BackgroundMaterial",uniforms:tr(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:ys,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=ce.getTransfer(M.colorSpace)!==_e,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,f=M.version,d=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,b){v.getRGB(Xc,ld(s)),e.buffers.color.setClear(Xc.r,Xc.g,Xc.b,b,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,b=1){a.set(v),o=b,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,p(a,o)},render:m,addToRenderList:_,dispose:g}}function kM(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,a=!1;function o(D,W,O,C,k){let G=!1,U=f(D,C,O,W);r!==U&&(r=U,c(r.object)),G=u(D,C,O,k),G&&m(D,C,O,k),k!==null&&t.update(k,s.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,M(D,W,O,C),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return s.createVertexArray()}function c(D){return s.bindVertexArray(D)}function h(D){return s.deleteVertexArray(D)}function f(D,W,O,C){let k=C.wireframe===!0,G=n[W.id];G===void 0&&(G={},n[W.id]=G);let U=D.isInstancedMesh===!0?D.id:0,j=G[U];j===void 0&&(j={},G[U]=j);let q=j[O.id];q===void 0&&(q={},j[O.id]=q);let et=q[k];return et===void 0&&(et=d(l()),q[k]=et),et}function d(D){let W=[],O=[],C=[];for(let k=0;k<e;k++)W[k]=0,O[k]=0,C[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:O,attributeDivisors:C,object:D,attributes:{},index:null}}function u(D,W,O,C){let k=r.attributes,G=W.attributes,U=0,j=O.getAttributes();for(let q in j)if(j[q].location>=0){let Z=k[q],gt=G[q];if(gt===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(gt=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(gt=D.instanceColor)),Z===void 0||Z.attribute!==gt||gt&&Z.data!==gt.data)return!0;U++}return r.attributesNum!==U||r.index!==C}function m(D,W,O,C){let k={},G=W.attributes,U=0,j=O.getAttributes();for(let q in j)if(j[q].location>=0){let Z=G[q];Z===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(Z=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(Z=D.instanceColor));let gt={};gt.attribute=Z,Z&&Z.data&&(gt.data=Z.data),k[q]=gt,U++}r.attributes=k,r.attributesNum=U,r.index=C}function _(){let D=r.newAttributes;for(let W=0,O=D.length;W<O;W++)D[W]=0}function p(D){g(D,0)}function g(D,W){let O=r.newAttributes,C=r.enabledAttributes,k=r.attributeDivisors;O[D]=1,C[D]===0&&(s.enableVertexAttribArray(D),C[D]=1),k[D]!==W&&(s.vertexAttribDivisor(D,W),k[D]=W)}function v(){let D=r.newAttributes,W=r.enabledAttributes;for(let O=0,C=W.length;O<C;O++)W[O]!==D[O]&&(s.disableVertexAttribArray(O),W[O]=0)}function b(D,W,O,C,k,G,U){U===!0?s.vertexAttribIPointer(D,W,O,k,G):s.vertexAttribPointer(D,W,O,C,k,G)}function M(D,W,O,C){_();let k=C.attributes,G=O.getAttributes(),U=W.defaultAttributeValues;for(let j in G){let q=G[j];if(q.location>=0){let et=k[j];if(et===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(et=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(et=D.instanceColor)),et!==void 0){let Z=et.normalized,gt=et.itemSize,$=t.get(et);if($===void 0)continue;let L=$.buffer,X=$.type,Q=$.bytesPerElement,_t=X===s.INT||X===s.UNSIGNED_INT||et.gpuType===lc;if(et.isInterleavedBufferAttribute){let st=et.data,Ut=st.isInterleavedBuffer===!0?st.stride:st.itemSize,Zt=et.offset;if(st.isInstancedInterleavedBuffer||st.isInstancedBufferAttribute){for(let Lt=0;Lt<q.locationSize;Lt++)g(q.location+Lt,st.meshPerAttribute);D.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Lt=0;Lt<q.locationSize;Lt++)p(q.location+Lt);s.bindBuffer(s.ARRAY_BUFFER,L);for(let Lt=0;Lt<q.locationSize;Lt++)b(q.location+Lt,gt/q.locationSize,X,Z,Ut*Q,(Zt+gt/q.locationSize*Lt)*Q,_t)}else{if(et.isInstancedBufferAttribute){for(let st=0;st<q.locationSize;st++)g(q.location+st,et.meshPerAttribute);D.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let st=0;st<q.locationSize;st++)p(q.location+st);s.bindBuffer(s.ARRAY_BUFFER,L);for(let st=0;st<q.locationSize;st++)b(q.location+st,gt/q.locationSize,X,Z,gt*Q,gt/q.locationSize*st*Q,_t)}}else if(U!==void 0){let Z=U[j];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(q.location,Z);break;case 3:s.vertexAttrib3fv(q.location,Z);break;case 4:s.vertexAttrib4fv(q.location,Z);break;default:s.vertexAttrib1fv(q.location,Z)}}}}v()}function A(){P();for(let D in n){let W=n[D];for(let O in W){let C=W[O];for(let k in C){let G=C[k];for(let U in G)h(G[U].object),delete G[U];delete C[k]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;let W=n[D.id];for(let O in W){let C=W[O];for(let k in C){let G=C[k];for(let U in G)h(G[U].object),delete G[U];delete C[k]}}delete n[D.id]}function x(D){for(let W in n){let O=n[W];for(let C in O){let k=O[C];if(k[D.id]===void 0)continue;let G=k[D.id];for(let U in G)h(G[U].object),delete G[U];delete k[D.id]}}}function S(D){for(let W in n){let O=n[W],C=D.isInstancedMesh===!0?D.id:0,k=O[C];if(k!==void 0){for(let G in k){let U=k[G];for(let j in U)h(U[j].object),delete U[j];delete k[G]}delete O[C],Object.keys(O).length===0&&delete n[W]}}}function P(){R(),a=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function zM(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let u=0;u<h;u++)d+=c[u];e.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function GM(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(x){return!(x!==si&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let S=x===ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==Tn&&x!==ni&&!S&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Kt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&Kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&Kt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:u,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:M,maxSamples:A,samples:T}}function VM(s){let t=this,e=null,n=0,i=!1,r=!1,a=new Qn,o=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let u=f.length!==0||d||n!==0||i;return i=d,n=f.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,u){let m=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,g=s.get(f);if(!i||m===null||m.length===0||r&&!p)r?h(null):c();else{let v=r?0:n,b=v*4,M=g.clippingState||null;l.value=M,M=h(m,d,b,u);for(let A=0;A!==b;++A)M[A]=e[A];g.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,u,m){let _=f!==null?f.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=u+_*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let b=0,M=u;b!==_;++b,M+=4)a.copy(f[b]).applyMatrix4(v,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var fo=class extends Nn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ba(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Br(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:tr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:Js});r.uniforms.tEquirect.value=e;let a=new Un(i,r),o=e.minFilter;return e.minFilter===qi&&(e.minFilter=_n),new Xr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Fm=256,HM=3,WM=20,r0=256,a0=16,XM=3,qM=new H,$M=new ee,$c=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Xr(1,10,null),this._boxMesh=new Un(new Br(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:a=256,position:o=qM}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,d=l.autoClearColor,u=l.autoClearDepth,m=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor($M));let p=new Xr(n,i,h);return p.position.copy(o),p.update(l,t),l.autoClear=f,l.autoClearColor=d,l.autoClearDepth=u,l.autoClearStencil=m,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=km(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Fm,Em(t))}_fromTexture(t,e){t.mapping===js||t.mapping===Yr?this._setSize(t.image.length===0?Fm:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Om(t,!1,!1),n=Math.log2(t)-HM;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Om(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===js||t.mapping===Yr?(this._cubemapMaterial===null&&(this._cubemapMaterial=km()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Bm()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=YM(),this._integrationMaterial=ZM());let e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/a0);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-XM)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(r0*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=JM());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}};function Om(s,t,e){return new fo(s,{minFilter:qi,generateMipmaps:t,type:ii,colorSpace:Ra,depthBuffer:e})}function po(s,t,e){return new qn({name:s,uniforms:t,vertexShader:se.cube_vert,fragmentShader:e,side:xn,blending:Js,depthTest:!1,depthWrite:!1})}function YM(){return po("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

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
	`)}function ZM(){return po("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:a0}},`

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
	`)}function JM(){return po("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${WM}
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
	`)}function Bm(){return po("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function km(){return po("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function KM(s){let t=new WeakMap,e=new WeakMap,n=null;function i(d,u=!1){return d==null?null:u?a(d):r(d)}function r(d){if(d&&d.isTexture){let u=d.mapping;if(u===rc||u===ac)if(t.has(d)){let m=t.get(d).texture;return o(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let _=new fo(m.height);return _.fromEquirectangularTexture(s,d),t.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let u=d.mapping,m=u===rc||u===ac,_=u===js||u===Yr;if(m||_){let p=e.get(d),g=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new $c(s)),p=m?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),p.texture;if(p!==void 0)return p.texture;{let v=d.image;return m&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new $c(s)),p=m?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function o(d,u){return u===rc?d.mapping=js:u===ac&&(d.mapping=Yr),d}function l(d){let u=0,m=6;for(let _=0;_<m;_++)d[_]!==void 0&&u++;return u===m}function c(d){let u=d.target;u.removeEventListener("dispose",c);let m=t.get(u);m!==void 0&&(t.delete(u),m.dispose())}function h(d){let u=d.target;u.removeEventListener("dispose",h);let m=e.get(u);m!==void 0&&(e.delete(u),m.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function jM(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Aa("WebGLRenderer: "+n+" extension not supported."),i}}}function QM(s,t,e,n){let i={},r=new WeakMap,a=new FinalizationRegistry(m=>delete i[m]);function o(m){l(m.target)}function l(m){m.index!==null&&t.remove(m.index);for(let p in m.attributes)t.remove(m.attributes[p]);m.removeEventListener("dispose",o),delete i[m.id],a.unregister(m);let _=r.get(m);_&&(t.remove(_),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(m,_){return i[_.id]!==void 0||(_.addEventListener("dispose",o),i[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(m){let _=m.attributes;for(let p in _)t.update(_[p],s.ARRAY_BUFFER)}function f(m){let _=m.index,p=m.attributes.position,g=0;if(p===void 0)return;let v=_!==null?_.array.length:p.array.length/3-1,b=p.count>=65535?Fa:Ua,M=new b(Math.ceil(v/3)*6,1),A=M.array;if(_!==null){let x=_.array;g=_.version;for(let S=0,P=0;S<v;S+=3){let R=x[S+0],D=x[S+1],W=x[S+2];A[P++]=R,A[P++]=D,A[P++]=D,A[P++]=W,A[P++]=W,A[P++]=R}}else{g=p.version;for(let x=0,S=0;x<v;x+=3){let P=x+0,R=x+1,D=x+2;A[S++]=P,A[S++]=R,A[S++]=R,A[S++]=D,A[S++]=D,A[S++]=P}}M.version=g;let T=r.get(m);T&&t.remove(T),r.set(m,M)}function d(m){let _=r.get(m);if(_){let p=m.index;p!==null&&_.version<p.version&&f(m)}else f(m);return r.get(m)}function u(){for(let m in i){let _=i[m].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:d,dispose:u}}function tS(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,u){u!==0&&(s.drawElementsInstanced(n,d,r,f*a,u),e.update(d,n,u))}function h(f,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,u);let _=0;for(let p=0;p<u;p++)_+=d[p];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function eS(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:jt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function nS(s,t,e){let n=new WeakMap,i=new Re;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==f){let P=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",P)};d!==void 0&&d.texture.dispose();let u=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],b=0;u===!0&&(b=1),m===!0&&(b=2),_===!0&&(b=3);let M=o.attributes.position.count*b,A=1;M>t.maxTextureSize&&(A=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let T=new Float32Array(M*A*4*f),x=new La(T,M,A,f);x.type=ni,x.needsUpdate=!0;let S=b*4;for(let R=0;R<f;R++){let D=p[R],W=g[R],O=v[R],C=M*A*4*R;for(let k=0;k<D.count;k++){let G=k*S;u===!0&&(i.fromBufferAttribute(D,k),T[C+G+0]=i.x,T[C+G+1]=i.y,T[C+G+2]=i.z,T[C+G+3]=0),m===!0&&(i.fromBufferAttribute(W,k),T[C+G+4]=i.x,T[C+G+5]=i.y,T[C+G+6]=i.z,T[C+G+7]=0),_===!0&&(i.fromBufferAttribute(O,k),T[C+G+8]=i.x,T[C+G+9]=i.y,T[C+G+10]=i.z,T[C+G+11]=O.itemSize===4?i.w:1)}}d={count:f,texture:x,size:new Nt(M,A)},n.set(o,d),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let u=0;for(let _=0;_<c.length;_++)u+=c[_];let m=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function iS(s,t,e,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,f=c.geometry,d=t.get(c,f);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let u=c.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var sS={[Gu]:"LINEAR_TONE_MAPPING",[Vu]:"REINHARD_TONE_MAPPING",[Hu]:"CINEON_TONE_MAPPING",[Wu]:"ACES_FILMIC_TONE_MAPPING",[qu]:"AGX_TONE_MAPPING",[no]:"NEUTRAL_TONE_MAPPING",[Xu]:"CUSTOM_TONE_MAPPING"};function rS(s,t,e,n,i,r){let a=new Nn(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new An;h.setAttribute("position",new Fe([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Fe([0,2,0,0,2,0],2));let f=new Hl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Un(h,f),u=new Qa(-1,1,1,-1,0,1),m=null,_=null,p=!1,g,v=null,b=[],M=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let x=0;x<b.length;x++){let S=b[x];S.setSize&&S.setSize(A,T)}},this.setEffects=function(A){b=A,M=b.length>0&&b[0].isRenderPass===!0;let T=a.width,x=a.height;b.length>0&&o===null&&(o=new Nn(T,x,{type:ii,depthBuffer:!1,stencilBuffer:!1}),l=new Nn(T,x,{type:ii,depthBuffer:!1,stencilBuffer:!1}));let S=i===!0&&b.some(P=>P.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new Xi(T,x),r===!0&&(c.format=$i,c.type=Qs)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let P=0;P<b.length;P++){let R=b[P];R.setSize&&R.setSize(T,x),S&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(A,T){if(p||A.toneMapping===Si&&b.length===0)return!1;if(v=T,T!==null){let x=T.width,S=T.height;(a.width!==x||a.height!==S)&&this.setSize(x,S)}return M===!1&&A.setRenderTarget(a),g=A.toneMapping,A.toneMapping=Si,!0},this.hasRenderPass=function(){return M},this.end=function(A,T){A.toneMapping=g,p=!0;let x=a,S=o;for(let P=0;P<b.length;P++){let R=b[P];R.enabled!==!1&&(R.render(A,S,x,T),R.needsSwap!==!1&&(x=S,S=S===o?l:o))}if(m!==A.outputColorSpace||_!==A.toneMapping){m=A.outputColorSpace,_=A.toneMapping,f.defines={},ce.getTransfer(m)===_e&&(f.defines.SRGB_TRANSFER="");let P=sS[_];P&&(f.defines[P]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(v),A.render(d,u),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}var o0=new wn,l0=new Xi(1,1),c0=new ka(1),h0=new La,u0=new Rl,d0=new Ba,zm=[],Gm=[],Vm=new Float32Array(16),Hm=new Float32Array(9),Wm=new Float32Array(4);function jr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=zm[i];if(r===void 0&&(r=new Float32Array(i),zm[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function We(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Xe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Zc(s,t){let e=Gm[t];e===void 0&&(e=new Int32Array(t),Gm[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function aS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function oS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;s.uniform2fv(this.addr,t),Xe(e,t)}}function lS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;s.uniform3fv(this.addr,t),Xe(e,t)}}function cS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;s.uniform4fv(this.addr,t),Xe(e,t)}}function hS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Wm.set(n),s.uniformMatrix2fv(this.addr,!1,Wm),Xe(e,n)}}function uS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Hm.set(n),s.uniformMatrix3fv(this.addr,!1,Hm),Xe(e,n)}}function dS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Vm.set(n),s.uniformMatrix4fv(this.addr,!1,Vm),Xe(e,n)}}function fS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function pS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;s.uniform2iv(this.addr,t),Xe(e,t)}}function mS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;s.uniform3iv(this.addr,t),Xe(e,t)}}function gS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;s.uniform4iv(this.addr,t),Xe(e,t)}}function _S(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function xS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;s.uniform2uiv(this.addr,t),Xe(e,t)}}function vS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;s.uniform3uiv(this.addr,t),Xe(e,t)}}function yS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;s.uniform4uiv(this.addr,t),Xe(e,t)}}function Jc(s){return s.version===0&&(s.compareFunction=id,s.needsUpdate=!0),s}function MS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Jc(l0):r=o0,e.setTexture2D(t||r,i)}function SS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||u0,i)}function bS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Jc(c0):r=d0,e.setTextureCube(t||r,i)}function wS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||h0,i)}function AS(s){switch(s){case 5126:return aS;case 35664:return oS;case 35665:return lS;case 35666:return cS;case 35674:return hS;case 35675:return uS;case 35676:return dS;case 5124:case 35670:return fS;case 35667:case 35671:return pS;case 35668:case 35672:return mS;case 35669:case 35673:return gS;case 5125:return _S;case 36294:return xS;case 36295:return vS;case 36296:return yS;case 35678:case 36198:case 36298:case 36306:case 35682:return MS;case 35679:case 36299:case 36307:return SS;case 35680:case 36300:case 36308:case 36293:return bS;case 36289:case 36303:case 36311:case 36292:return wS}}function TS(s,t){s.uniform1fv(this.addr,t)}function ES(s,t){let e=jr(t,this.size,2);s.uniform2fv(this.addr,e)}function CS(s,t){let e=jr(t,this.size,3);s.uniform3fv(this.addr,e)}function RS(s,t){let e=jr(t,this.size,4);s.uniform4fv(this.addr,e)}function PS(s,t){let e=jr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function IS(s,t){let e=jr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function LS(s,t){let e=jr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function DS(s,t){s.uniform1iv(this.addr,t)}function NS(s,t){s.uniform2iv(this.addr,t)}function US(s,t){s.uniform3iv(this.addr,t)}function FS(s,t){s.uniform4iv(this.addr,t)}function OS(s,t){s.uniform1uiv(this.addr,t)}function BS(s,t){s.uniform2uiv(this.addr,t)}function kS(s,t){s.uniform3uiv(this.addr,t)}function zS(s,t){s.uniform4uiv(this.addr,t)}function GS(s,t,e){let n=this.cache,i=t.length,r=Zc(e,i);We(n,r)||(s.uniform1iv(this.addr,r),Xe(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Jc(l0):a=o0;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function VS(s,t,e){let n=this.cache,i=t.length,r=Zc(e,i);We(n,r)||(s.uniform1iv(this.addr,r),Xe(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||u0,r[a])}function HS(s,t,e){let n=this.cache,i=t.length,r=Zc(e,i);We(n,r)||(s.uniform1iv(this.addr,r),Xe(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=Jc(c0):a=d0;for(let o=0;o!==i;++o)e.setTextureCube(t[o]||a,r[o])}function WS(s,t,e){let n=this.cache,i=t.length,r=Zc(e,i);We(n,r)||(s.uniform1iv(this.addr,r),Xe(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||h0,r[a])}function XS(s){switch(s){case 5126:return TS;case 35664:return ES;case 35665:return CS;case 35666:return RS;case 35674:return PS;case 35675:return IS;case 35676:return LS;case 5124:case 35670:return DS;case 35667:case 35671:return NS;case 35668:case 35672:return US;case 35669:case 35673:return FS;case 5125:return OS;case 36294:return BS;case 36295:return kS;case 36296:return zS;case 35678:case 36198:case 36298:case 36306:case 35682:return GS;case 35679:case 36299:case 36307:return VS;case 35680:case 36300:case 36308:case 36293:return HS;case 36289:case 36303:case 36311:case 36292:return WS}}var vd=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=AS(e.type)}},yd=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=XS(e.type)}},Md=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},_d=/(\w+)(\])?(\[|\.)?/g;function Xm(s,t){s.seq.push(t),s.map[t.id]=t}function qS(s,t,e){let n=s.name,i=n.length;for(_d.lastIndex=0;;){let r=_d.exec(n),a=_d.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Xm(e,c===void 0?new vd(o,s,t):new yd(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new Md(o),Xm(e,f)),e=f}}}var Kr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);qS(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function qm(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var $S=37297,YS=0;function ZS(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var $m=new Qt;function JS(s){ce._getMatrix($m,ce.workingColorSpace,s);let t=`mat3( ${$m.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(s)){case Pa:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return Kt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ym(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+ZS(s.getShaderSource(t),o)}else return r}function KS(s,t){let e=JS(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var jS={[Gu]:"Linear",[Vu]:"Reinhard",[Hu]:"Cineon",[Wu]:"ACESFilmic",[qu]:"AgX",[no]:"Neutral",[Xu]:"Custom"};function QS(s,t){let e=jS[t];return e===void 0?(Kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var qc=new H;function tb(){ce.getLuminanceCoefficients(qc);let s=qc.x.toFixed(4),t=qc.y.toFixed(4),e=qc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function eb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(uo).join(`
`)}function nb(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ib(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function uo(s){return s!==""}function Zm(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Jm(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var sb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sd(s){return s.replace(sb,rb)}function rb(s,t){let e=se[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Sd(e)}var ab=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Km(s){return s.replace(ab,ob)}function ob(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function jm(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var lb={[Zs]:"SHADOWMAP_TYPE_PCF",[qr]:"SHADOWMAP_TYPE_VSM"};function cb(s){return lb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var hb={[Yr]:"ENVMAP_MODE_REFRACTION"};function ub(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":hb[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var db={[zu]:"ENVMAP_BLENDING_MULTIPLY",[um]:"ENVMAP_BLENDING_MIX",[dm]:"ENVMAP_BLENDING_ADD"};function fb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":db[s.combine]||"ENVMAP_BLENDING_NONE"}function pb(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=cb(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=ub(e),f=fb(e),d=eb(e),u=nb(r),m=i.createProgram(),_,p,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(uo).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(uo).join(`
`),p.length>0&&(p+=`
`)):(_=[jm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(uo).join(`
`),p=[jm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?se.tonemapping_pars_fragment:"",e.toneMapping!==Si?QS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,KS("linearToOutputTexel",e.outputColorSpace),tb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(uo).join(`
`)),a=Sd(a),a=Zm(a,e),a=Jm(a,e),o=Sd(o),o=Zm(o,e),o=Jm(o,e),a=Km(a),o=Km(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",e.glslVersion===sd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=g+_+a,b=g+p+o,M=qm(i,i.VERTEX_SHADER,v),A=qm(i,i.FRAGMENT_SHADER,b);i.attachShader(m,M),i.attachShader(m,A),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function T(R){if(s.debug.checkShaderErrors){let D=i.getProgramInfoLog(m)||"",W=i.getShaderInfoLog(M)||"",O=i.getShaderInfoLog(A)||"",C=D.trim(),k=W.trim(),G=O.trim(),U=!0,j=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(U=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,M,A);else{let q=Ym(i,M,"vertex"),et=Ym(i,A,"fragment");jt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+C+`
`+q+`
`+et)}else C!==""?Kt("WebGLProgram: Program Info Log:",C):(k===""||G==="")&&(j=!1);j&&(R.diagnostics={runnable:U,programLog:C,vertexShader:{log:k,prefix:_},fragmentShader:{log:G,prefix:p}})}i.deleteShader(M),i.deleteShader(A),x=new Kr(i,m),S=ib(i,m)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(m,$S)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=YS++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=M,this.fragmentShader=A,this}var mb=0,bd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new wd(t),e.set(t,n)),n}},wd=class{constructor(t){this.id=mb++,this.code=t,this.usedTimes=0}};function gb(s){return s===Ms||s===lo||s===co}function _b(s,t,e,n,i,r){let a=new Da,o=new bd,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,S,P,R,D,W){let O=R.fog,C=D.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,U=t.get(x.envMap||k,G),j=d[x.type],q=n.precision;x.precision!==null&&(q=n.getMaxPrecision(x.precision),q!==x.precision&&Kt("WebGLProgram.getParameters:",x.precision,"not supported, using",q,"instead."));let et=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,Z=et!==void 0?et.length:0,gt=0;C.morphAttributes.position!==void 0&&(gt=1),C.morphAttributes.normal!==void 0&&(gt=2),C.morphAttributes.color!==void 0&&(gt=3);let $,L,X,Q;if(j){let Ft=wi[j];$=Ft.vertexShader,L=Ft.fragmentShader}else{$=x.vertexShader,L=x.fragmentShader;let Ft=o.getVertexShaderStage(x),xe=o.getFragmentShaderStage(x);o.update(x,Ft,xe),X=Ft.id,Q=xe.id}let _t=s.getRenderTarget(),st=s.state.buffers.depth.getReversed(),Ut=D.isInstancedMesh===!0,Zt=D.isBatchedMesh===!0,Lt=!!x.map,qt=!!x.matcap,$t=!!U,ct=$t&&U.isPMREMTexture===!0,V=!!x.aoMap,tt=!!x.lightMap,ht=!!x.bumpMap&&x.wireframe===!1,F=!!x.normalMap,nt=!!x.displacementMap,mt=!!x.emissiveMap,Ct=!!x.metalnessMap,Dt=!!x.roughnessMap,Xt=x.anisotropy>0,N=x.clearcoat>0,fe=x.diffuseRoughness>0,ot=x.dispersion>0,St=x.retroreflectivity>0,lt=x.iridescence>0,Rt=x.sheen>0,vt=x.transmission>0,bt=Xt&&!!x.anisotropyMap,E=N&&!!x.clearcoatMap,y=N&&!!x.clearcoatNormalMap,z=N&&!!x.clearcoatRoughnessMap,pt=fe&&!!x.diffuseRoughnessMap,ut=lt&&!!x.iridescenceMap,yt=lt&&!!x.iridescenceThicknessMap,Mt=Rt&&!!x.sheenColorMap,J=Rt&&!!x.sheenRoughnessMap,rt=!!x.specularMap,xt=!!x.specularColorMap,I=!!x.specularIntensityMap,dt=vt&&!!x.transmissionMap,at=vt&&!!x.thicknessMap,Tt=!!x.gradientMap,At=!!x.alphaMap,Et=x.alphaTest>0,Ht=!!x.alphaHash,ie=!!x.extensions,wt=Si;x.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(wt=s.toneMapping);let Jt=ct?U.isCompressedCubeTexture?U.image[0].mipmaps:U.mipmaps:null,ne={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:$,fragmentShader:L,defines:x.defines,customVertexShaderID:X,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:q,batching:Zt,batchingColor:Zt&&D._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&D.instanceColor!==null,instancingMorph:Ut&&D.morphTexture!==null,outputColorSpace:_t===null?s.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Lt,matcap:qt,envMap:$t,envMapMode:$t&&U.mapping,envMapPMREM:ct,envMapMaxLod:ct?Jt.length-1:null,envMapSize:ct?Jt[0].width:null,aoMap:V,lightMap:tt,bumpMap:ht,normalMap:F,displacementMap:nt,emissiveMap:mt,normalMapObjectSpace:F&&x.normalMapType===mm,normalMapTangentSpace:F&&x.normalMapType===Wc,packedNormalMap:F&&x.normalMapType===Wc&&gb(x.normalMap.format),metalnessMap:Ct,roughnessMap:Dt,anisotropy:Xt,anisotropyMap:bt,clearcoat:N,clearcoatMap:E,clearcoatNormalMap:y,clearcoatRoughnessMap:z,diffuseRoughness:fe,diffuseRoughnessMap:pt,dispersion:ot,retroreflection:St,iridescence:lt,iridescenceMap:ut,iridescenceThicknessMap:yt,sheen:Rt,sheenColorMap:Mt,sheenRoughnessMap:J,specularMap:rt,specularColorMap:xt,specularIntensityMap:I,transmission:vt,transmissionMap:dt,thicknessMap:at,gradientMap:Tt,opaque:x.transparent===!1&&x.blending===$r&&x.alphaToCoverage===!1,alphaMap:At,alphaTest:Et,alphaHash:Ht,combine:x.combine,mapUv:Lt&&u(x.map.channel),aoMapUv:V&&u(x.aoMap.channel),lightMapUv:tt&&u(x.lightMap.channel),bumpMapUv:ht&&u(x.bumpMap.channel),normalMapUv:F&&u(x.normalMap.channel),displacementMapUv:nt&&u(x.displacementMap.channel),emissiveMapUv:mt&&u(x.emissiveMap.channel),metalnessMapUv:Ct&&u(x.metalnessMap.channel),roughnessMapUv:Dt&&u(x.roughnessMap.channel),anisotropyMapUv:bt&&u(x.anisotropyMap.channel),clearcoatMapUv:E&&u(x.clearcoatMap.channel),clearcoatNormalMapUv:y&&u(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&u(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:pt&&u(x.diffuseRoughnessMap.channel),iridescenceMapUv:ut&&u(x.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&u(x.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&u(x.sheenColorMap.channel),sheenRoughnessMapUv:J&&u(x.sheenRoughnessMap.channel),specularMapUv:rt&&u(x.specularMap.channel),specularColorMapUv:xt&&u(x.specularColorMap.channel),specularIntensityMapUv:I&&u(x.specularIntensityMap.channel),transmissionMapUv:dt&&u(x.transmissionMap.channel),thicknessMapUv:at&&u(x.thicknessMap.channel),alphaMapUv:At&&u(x.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(F||Xt),vertexNormals:!!C.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!C.attributes.uv&&(Lt||At),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||C.attributes.normal===void 0&&F===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:st,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:gt,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:W.filter(Ft=>Ft.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:wt,decodeVideoTexture:Lt&&x.map.isVideoTexture===!0&&ce.getTransfer(x.map.colorSpace)===_e,decodeVideoTextureEmissive:mt&&x.emissiveMap.isVideoTexture===!0&&ce.getTransfer(x.emissiveMap.colorSpace)===_e,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Mi,flipSided:x.side===xn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ie&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&x.extensions.multiDraw===!0||Zt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ne.vertexUv1s=l.has(1),ne.vertexUv2s=l.has(2),ne.vertexUv3s=l.has(3),l.clear(),ne}function _(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)S.push(P),S.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(p(S,x),g(S,x),S.push(s.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function p(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapPMREM),x.push(S.envMapMaxLod),x.push(S.envMapSize),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.diffuseRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.numLightProbeGrids),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function g(x,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function v(x){let S=d[x.type],P;if(S){let R=wi[S];P=Dm.clone(R.uniforms)}else P=x.uniforms;return P}function b(x,S){let P=h.get(S);return P!==void 0?++P.usedTimes:(P=new pb(s,S,x,i),c.push(P),h.set(S,P)),P}function M(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function T(){o.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:v,acquireProgram:b,releaseProgram:M,releaseShaderCache:A,programs:c,dispose:T}}function xb(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function vb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Qm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function t0(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(d){let u=0;return d.isInstancedMesh&&(u+=2),d.isSkinnedMesh&&(u+=1),u}function o(d,u,m,_,p,g){let v=s[t];return v===void 0?(v={id:d.id,object:d,geometry:u,material:m,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:g},s[t]=v):(v.id=d.id,v.object=d,v.geometry=u,v.material=m,v.materialVariant=a(d),v.groupOrder=_,v.renderOrder=d.renderOrder,v.z=p,v.group=g),t++,v}function l(d,u,m,_,p,g,v){v.reversedDepth===!0&&(p=-p);let b=o(d,u,m,_,p,g);m.transmission>0?n.push(b):m.transparent===!0?i.push(b):e.push(b)}function c(d,u,m,_,p,g){let v=o(d,u,m,_,p,g);m.transmission>0?n.unshift(v):m.transparent===!0?i.unshift(v):e.unshift(v)}function h(d,u){e.length>1&&e.sort(d||vb),n.length>1&&n.sort(u||Qm),i.length>1&&i.sort(u||Qm)}function f(){for(let d=t,u=s.length;d<u;d++){let m=s[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:f,sort:h}}function yb(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new t0,s.set(n,[a])):i>=r.length?(a=new t0,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Mb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new H,color:new ee};break;case"SpotLight":e={position:new H,direction:new H,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new H,halfWidth:new H,halfHeight:new H};break}return s[t.id]=e,e}}}function Sb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var bb=0;function wb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ab(s){let t=new Mb,e=Sb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);let i=new H,r=new be,a=new be;function o(c){let h=0,f=0,d=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let u=0,m=0,_=0,p=0,g=0,v=0,b=0,M=0,A=0,T=0,x=0,S=0,P=0,R=0;c.sort(wb);for(let W=0,O=c.length;W<O;W++){let C=c[W],k=C.color,G=C.intensity,U=C.distance,j=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Ms?j=C.shadow.map.texture:j=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=k.r*G,f+=k.g*G,d+=k.b*G;else if(C.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(C.sh.coefficients[q],G);R++}else if(C.isSunLight){let q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let et=C.shadow,Z=e.get(C);Z.shadowIntensity=et.intensity,Z.shadowBias=et.bias,Z.shadowNormalBias=et.normalBias,Z.shadowRadius=et.radius,Z.shadowMapSize.copy(et.mapSize).multiply(et.getFrameExtents()),n.sunShadow[m]=Z,n.sunShadowMap[m]=j;let gt=et.getViewportCount();for(let $=0;$<gt;$++)n.sunShadowMatrix[_+$]=et.getMatrix($),n.sunShadowCascade[_+$]=et._cascadeData[$];_+=gt,m++}n.sun[u]=q,u++}else if(C.isDirectionalLight){let q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let et=C.shadow,Z=e.get(C);Z.shadowIntensity=et.intensity,Z.shadowBias=et.bias,Z.shadowNormalBias=et.normalBias,Z.shadowRadius=et.radius,Z.shadowMapSize=et.mapSize,n.directionalShadow[p]=Z,n.directionalShadowMap[p]=j,n.directionalShadowMatrix[p]=C.shadow.matrix,A++}n.directional[p]=q,p++}else if(C.isSpotLight){let q=t.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(k).multiplyScalar(G),q.distance=U,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,n.spot[v]=q;let et=C.shadow;if(C.map&&(n.spotLightMap[S]=C.map,S++,et.updateMatrices(C),C.castShadow&&P++),n.spotLightMatrix[v]=et.matrix,C.castShadow){let Z=e.get(C);Z.shadowIntensity=et.intensity,Z.shadowBias=et.bias,Z.shadowNormalBias=et.normalBias,Z.shadowRadius=et.radius,Z.shadowMapSize=et.mapSize,n.spotShadow[v]=Z,n.spotShadowMap[v]=j,x++}v++}else if(C.isRectAreaLight){let q=t.get(C);q.color.copy(k).multiplyScalar(G),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),n.rectArea[b]=q,b++}else if(C.isPointLight){let q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),q.distance=C.distance,q.decay=C.decay,C.castShadow){let et=C.shadow,Z=e.get(C);Z.shadowIntensity=et.intensity,Z.shadowBias=et.bias,Z.shadowNormalBias=et.normalBias,Z.shadowRadius=et.radius,Z.shadowMapSize=et.mapSize,Z.shadowCameraNear=et.camera.near,Z.shadowCameraFar=et.camera.far,n.pointShadow[g]=Z,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=C.shadow.matrix,T++}n.point[g]=q,g++}else if(C.isHemisphereLight){let q=t.get(C);q.skyColor.copy(C.color).multiplyScalar(G),q.groundColor.copy(C.groundColor).multiplyScalar(G),n.hemi[M]=q,M++}}b>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;let D=n.hash;(D.sunLength!==u||D.directionalLength!==p||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==b||D.hemiLength!==M||D.numSunShadows!==m||D.numDirectionalShadows!==A||D.numPointShadows!==T||D.numSpotShadows!==x||D.numSpotMaps!==S||D.numLightProbes!==R)&&(n.sun.length=u,n.directional.length=p,n.spot.length=v,n.rectArea.length=b,n.point.length=g,n.hemi.length=M,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+S-P,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=R,D.sunLength=u,D.directionalLength=p,D.pointLength=g,D.spotLength=v,D.rectAreaLength=b,D.hemiLength=M,D.numSunShadows=m,D.numDirectionalShadows=A,D.numPointShadows=T,D.numSpotShadows=x,D.numSpotMaps=S,D.numLightProbes=R,n.version=bb++)}function l(c,h){let f=0,d=0,u=0,m=0,_=0,p=0,g=h.matrixWorldInverse;for(let v=0,b=c.length;v<b;v++){let M=c[v];if(M.isSunLight){let A=n.sun[f];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(g),f++}else if(M.isDirectionalLight){let A=n.directional[d];A.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),d++}else if(M.isSpotLight){let A=n.spot[m];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),m++}else if(M.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){let A=n.point[u];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),u++}else if(M.isHemisphereLight){let A=n.hemi[p];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function e0(s){let t=new Ab(s),e=[],n=[],i=[];function r(f){h.camera=f,e.length=0,n.length=0,i.length=0}function a(f){f.isLightProbeGrid?i.push(f):e.push(f)}function o(f){n.push(f)}function l(){t.setup(e),i.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function c(f){t.setupView(e,f)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Tb(s){let t=new WeakMap;function e(i,r=0){let a=t.get(i),o;return a===void 0?(o=new e0(s),t.set(i,[o])):r>=a.length?(o=new e0(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Eb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cb=`uniform sampler2D shadow_pass;
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
}`,Rb=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Pb=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],n0=new be,ho=new H,xd=new H;function Ib(s,t,e){let n=new gs,i=new Nt,r=new Nt,a=new Re,o=new Wl,l=new Xl,c={},h=e.maxTextureSize,f={[ys]:xn,[xn]:ys,[Mi]:Mi},d=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Nt},radius:{value:4}},vertexShader:Eb,fragmentShader:Cb}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new An;m.setAttribute("position",new xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Un(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zs;let g=this.type;this.render=function(T,x,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===qp&&(Kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Zs);let P=s.getRenderTarget(),R=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),W=s.state;W.setBlending(Js),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let O=g!==this.type;O&&x.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(k=>k.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,k=T.length;C<k;C++){let G=T[C],U=G.shadow;if(U===void 0){Kt("WebGLShadowMap:",G,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;i.copy(U.mapSize);let j=U.getFrameExtents();i.multiply(j),r.copy(U.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/j.x),i.x=r.x*j.x,U.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/j.y),i.y=r.y*j.y,U.mapSize.y=r.y));let q=s.state.buffers.depth.getReversed();if(U.camera._reversedDepth=q,U.map===null||O===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===qr){if(G.isPointLight){Kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new Nn(i.x,i.y,{format:Ms,type:ii,minFilter:_n,magFilter:_n,generateMipmaps:!1}),U.map.texture.name=G.name+".shadowMap",U.map.depthTexture=new Xi(i.x,i.y,ni),U.map.depthTexture.name=G.name+".shadowMapDepth",U.map.depthTexture.format=Hi,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Ze,U.map.depthTexture.magFilter=Ze}else G.isPointLight?(U.map=new fo(i.x),U.map.depthTexture=new ka(i.x,ei)):(U.map=new Nn(i.x,i.y),U.map.depthTexture=new Xi(i.x,i.y,ei)),U.map.depthTexture.name=G.name+".shadowMap",U.map.depthTexture.format=Hi,this.type===Zs?(U.map.depthTexture.compareFunction=q?nd:ed,U.map.depthTexture.minFilter=_n,U.map.depthTexture.magFilter=_n):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Ze,U.map.depthTexture.magFilter=Ze);U.camera.updateProjectionMatrix()}U.map.isWebGLCubeRenderTarget!==!0&&(U.map.width!==i.x||U.map.height!==i.y)&&U.map.setSize(i.x,i.y);let et=U.map.isWebGLCubeRenderTarget?6:U.getViewportCount();G.isPointLight!==!0&&U.updateMatrices(G,S);let Z=(U.camera.layers.mask&4294967294)!==0?U.camera.layers:S.layers;for(let gt=0;gt<et;gt++){let $=U.getCamera(gt);if(G.isPointLight){let L=U.camera,X=U.matrix,Q=G.distance||L.far;Q!==L.far&&(L.far=Q,L.updateProjectionMatrix()),ho.setFromMatrixPosition(G.matrixWorld),L.position.copy(ho),xd.copy(L.position),xd.add(Rb[gt]),L.up.copy(Pb[gt]),L.lookAt(xd),L.updateMatrixWorld(),X.makeTranslation(-ho.x,-ho.y,-ho.z),n0.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),U._frustum.setFromProjectionMatrix(n0,L.coordinateSystem,L.reversedDepth)}if(U.map.isWebGLCubeRenderTarget)s.setRenderTarget(U.map,gt),s.clear();else{gt===0&&(s.setRenderTarget(U.map),s.clear());let L=U.getViewport(gt);a.set(r.x*L.x,r.y*L.y,r.x*L.z,r.y*L.w),W.viewport(a)}n=U.getFrustum(gt),M(x,S,$,G,Z,this.type)}U.isPointLightShadow!==!0&&this.type===qr&&v(U,S),U.needsUpdate=!1}g=this.type,p.needsUpdate=!1,s.setRenderTarget(P,R,D)};function v(T,x){let S=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,u.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),T.mapPass===null?T.mapPass=new Nn(i.x,i.y,{format:Ms,type:ii}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(x,null,S,d,_,null),u.uniforms.shadow_pass.value=T.mapPass.texture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(x,null,S,u,_,null)}function b(T,x,S,P){let R=null,D=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)R=D;else if(R=S.isPointLight===!0?l:o,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let W=R.uuid,O=x.uuid,C=c[W];C===void 0&&(C={},c[W]=C);let k=C[O];k===void 0&&(k=R.clone(),C[O]=k,x.addEventListener("dispose",A)),R=k}if(R.visible=x.visible,R.wireframe=x.wireframe,P===qr?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:f[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,S.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let W=s.properties.get(R);W.light=S}return R}function M(T,x,S,P,R,D){if(T.visible===!1)return;if(T.layers.test(R)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===qr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);let C=t.update(T),k=T.material;if(Array.isArray(k)){let G=C.groups;for(let U=0,j=G.length;U<j;U++){let q=G[U],et=k[q.materialIndex];if(et&&et.visible){let Z=b(T,et,P,D);T.onBeforeShadow(s,T,x,S,C,Z,q),s.renderBufferDirect(S,null,C,Z,T,q),T.onAfterShadow(s,T,x,S,C,Z,q)}}}else if(k.visible){let G=b(T,k,P,D);T.onBeforeShadow(s,T,x,S,C,G,null),s.renderBufferDirect(S,null,C,G,T,null),T.onAfterShadow(s,T,x,S,C,G,null)}}let O=T.children;for(let C=0,k=O.length;C<k;C++)M(O[C],x,S,P,R,D)}function A(T){T.target.removeEventListener("dispose",A);for(let S in c){let P=c[S],R=T.target.uuid;R in P&&(P[R].dispose(),delete P[R])}}}function Lb(s,t){function e(){let I=!1,dt=new Re,at=null,Tt=new Re(0,0,0,0);return{setMask:function(At){at!==At&&!I&&(s.colorMask(At,At,At,At),at=At)},setLocked:function(At){I=At},setClear:function(At,Et,Ht,ie,wt){wt===!0&&(At*=ie,Et*=ie,Ht*=ie),dt.set(At,Et,Ht,ie),Tt.equals(dt)===!1&&(s.clearColor(At,Et,Ht,ie),Tt.copy(dt))},reset:function(){I=!1,at=null,Tt.set(-1,0,0,0)}}}function n(){let I=!1,dt=!1,at=null,Tt=null,At=null;return{setReversed:function(Et){if(dt!==Et){let Ht=t.get("EXT_clip_control");Et?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),dt=Et;let ie=At;At=null,this.setClear(ie)}},getReversed:function(){return dt},setTest:function(Et){Et?st(s.DEPTH_TEST):Ut(s.DEPTH_TEST)},setMask:function(Et){at!==Et&&!I&&(s.depthMask(Et),at=Et)},setFunc:function(Et){if(dt&&(Et=Tm[Et]),Tt!==Et){switch(Et){case gl:s.depthFunc(s.NEVER);break;case _l:s.depthFunc(s.ALWAYS);break;case xl:s.depthFunc(s.LESS);break;case Ir:s.depthFunc(s.LEQUAL);break;case vl:s.depthFunc(s.EQUAL);break;case yl:s.depthFunc(s.GEQUAL);break;case Ml:s.depthFunc(s.GREATER);break;case Sl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Tt=Et}},setLocked:function(Et){I=Et},setClear:function(Et){At!==Et&&(At=Et,dt&&(Et=1-Et),s.clearDepth(Et))},reset:function(){I=!1,at=null,Tt=null,At=null,dt=!1}}}function i(){let I=!1,dt=null,at=null,Tt=null,At=null,Et=null,Ht=null,ie=null,wt=null;return{setTest:function(Jt){I||(Jt?st(s.STENCIL_TEST):Ut(s.STENCIL_TEST))},setMask:function(Jt){dt!==Jt&&!I&&(s.stencilMask(Jt),dt=Jt)},setFunc:function(Jt,ne,Ft){(at!==Jt||Tt!==ne||At!==Ft)&&(s.stencilFunc(Jt,ne,Ft),at=Jt,Tt=ne,At=Ft)},setOp:function(Jt,ne,Ft){(Et!==Jt||Ht!==ne||ie!==Ft)&&(s.stencilOp(Jt,ne,Ft),Et=Jt,Ht=ne,ie=Ft)},setLocked:function(Jt){I=Jt},setClear:function(Jt){wt!==Jt&&(s.clearStencil(Jt),wt=Jt)},reset:function(){I=!1,dt=null,at=null,Tt=null,At=null,Et=null,Ht=null,ie=null,wt=null}}}let r=new e,a=new n,o=new i,l={},c=new WeakMap,h={},f={},d={},u=new WeakMap,m=[],_=null,p=!1,g=null,v=null,b=null,M=null,A=null,T=null,x=null,S=new ee(0,0,0),P=0,R=!1,D=null,W=null,O=null,C=null,k=null,G=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),U=!1,j=0,q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(q)[1]),U=j>=1):q.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),U=j>=2);let et=null,Z={},gt=s.getParameter(s.SCISSOR_BOX),$=s.getParameter(s.VIEWPORT),L=new Re().fromArray(gt),X=new Re().fromArray($);function Q(I,dt,at,Tt){let At=new Uint8Array(4),Et=s.createTexture();s.bindTexture(I,Et),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<at;Ht++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(dt,0,s.RGBA,1,1,Tt,0,s.RGBA,s.UNSIGNED_BYTE,At):s.texImage2D(dt+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,At);return Et}let _t={};_t[s.TEXTURE_2D]=Q(s.TEXTURE_2D,s.TEXTURE_2D,1),_t[s.TEXTURE_CUBE_MAP]=Q(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[s.TEXTURE_2D_ARRAY]=Q(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),_t[s.TEXTURE_3D]=Q(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(s.DEPTH_TEST),a.setFunc(Ir),ht(!1),F(Uu),st(s.CULL_FACE),V(Js);function st(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function Ut(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function Zt(I,dt){return d[I]!==dt?(s.bindFramebuffer(I,dt),d[I]=dt,I===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=dt),I===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=dt),!0):!1}function Lt(I,dt){let at=m,Tt=!1;if(I){at=u.get(dt),at===void 0&&(at=[],u.set(dt,at));let At=I.textures;if(at.length!==At.length||at[0]!==s.COLOR_ATTACHMENT0){for(let Et=0,Ht=At.length;Et<Ht;Et++)at[Et]=s.COLOR_ATTACHMENT0+Et;at.length=At.length,Tt=!0}}else at[0]!==s.BACK&&(at[0]=s.BACK,Tt=!0);Tt&&s.drawBuffers(at)}function qt(I){return _!==I?(s.useProgram(I),_=I,!0):!1}let $t={[Ks]:s.FUNC_ADD,[Yp]:s.FUNC_SUBTRACT,[Zp]:s.FUNC_REVERSE_SUBTRACT};$t[Jp]=s.MIN,$t[Kp]=s.MAX;let ct={[jp]:s.ZERO,[Qp]:s.ONE,[tm]:s.SRC_COLOR,[Bu]:s.SRC_ALPHA,[am]:s.SRC_ALPHA_SATURATE,[sm]:s.DST_COLOR,[nm]:s.DST_ALPHA,[em]:s.ONE_MINUS_SRC_COLOR,[ku]:s.ONE_MINUS_SRC_ALPHA,[rm]:s.ONE_MINUS_DST_COLOR,[im]:s.ONE_MINUS_DST_ALPHA,[om]:s.CONSTANT_COLOR,[lm]:s.ONE_MINUS_CONSTANT_COLOR,[cm]:s.CONSTANT_ALPHA,[hm]:s.ONE_MINUS_CONSTANT_ALPHA};function V(I,dt,at,Tt,At,Et,Ht,ie,wt,Jt){if(I===Js){p===!0&&(Ut(s.BLEND),p=!1);return}if(p===!1&&(st(s.BLEND),p=!0),I!==$p){if(I!==g||Jt!==R){if((v!==Ks||A!==Ks)&&(s.blendEquation(s.FUNC_ADD),v=Ks,A=Ks),Jt)switch(I){case $r:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case eo:s.blendFunc(s.ONE,s.ONE);break;case Fu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ou:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:jt("WebGLState: Invalid blending: ",I);break}else switch(I){case $r:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case eo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Fu:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ou:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",I);break}b=null,M=null,T=null,x=null,S.set(0,0,0),P=0,g=I,R=Jt}return}At=At||dt,Et=Et||at,Ht=Ht||Tt,(dt!==v||At!==A)&&(s.blendEquationSeparate($t[dt],$t[At]),v=dt,A=At),(at!==b||Tt!==M||Et!==T||Ht!==x)&&(s.blendFuncSeparate(ct[at],ct[Tt],ct[Et],ct[Ht]),b=at,M=Tt,T=Et,x=Ht),(ie.equals(S)===!1||wt!==P)&&(s.blendColor(ie.r,ie.g,ie.b,wt),S.copy(ie),P=wt),g=I,R=!1}function tt(I,dt){I.side===Mi?Ut(s.CULL_FACE):st(s.CULL_FACE);let at=I.side===xn;dt&&(at=!at),ht(at),I.blending===$r&&I.transparent===!1?V(Js):V(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let Tt=I.stencilWrite;o.setTest(Tt),Tt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),mt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?st(s.SAMPLE_ALPHA_TO_COVERAGE):Ut(s.SAMPLE_ALPHA_TO_COVERAGE)}function ht(I){D!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),D=I)}function F(I){I!==Wp?(st(s.CULL_FACE),I!==W&&(I===Uu?s.cullFace(s.BACK):I===Xp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ut(s.CULL_FACE),W=I}function nt(I){I!==O&&(U&&s.lineWidth(I),O=I)}function mt(I,dt,at){I?(st(s.POLYGON_OFFSET_FILL),(C!==dt||k!==at)&&(C=dt,k=at,a.getReversed()&&(dt=-dt,at=-at),s.polygonOffset(dt,at))):Ut(s.POLYGON_OFFSET_FILL)}function Ct(I){I?st(s.SCISSOR_TEST):Ut(s.SCISSOR_TEST)}function Dt(I){I===void 0&&(I=s.TEXTURE0+G-1),et!==I&&(s.activeTexture(I),et=I)}function Xt(I,dt,at){at===void 0&&(et===null?at=s.TEXTURE0+G-1:at=et);let Tt=Z[at];Tt===void 0&&(Tt={type:void 0,texture:void 0},Z[at]=Tt),(Tt.type!==I||Tt.texture!==dt)&&(et!==at&&(s.activeTexture(at),et=at),s.bindTexture(I,dt||_t[I]),Tt.type=I,Tt.texture=dt)}function N(){let I=Z[et];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function fe(){try{s.compressedTexImage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function ot(){try{s.compressedTexImage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function St(){try{s.texSubImage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function lt(){try{s.texSubImage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function Rt(){try{s.compressedTexSubImage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function vt(){try{s.compressedTexSubImage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function bt(){try{s.texStorage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function E(){try{s.texStorage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function y(){try{s.texImage2D(...arguments)}catch(I){jt("WebGLState:",I)}}function z(){try{s.texImage3D(...arguments)}catch(I){jt("WebGLState:",I)}}function pt(I){return f[I]!==void 0?f[I]:s.getParameter(I)}function ut(I,dt){f[I]!==dt&&(s.pixelStorei(I,dt),f[I]=dt)}function yt(I){L.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),L.copy(I))}function Mt(I){X.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),X.copy(I))}function J(I,dt){let at=c.get(dt);at===void 0&&(at=new WeakMap,c.set(dt,at));let Tt=at.get(I);Tt===void 0&&(Tt=s.getUniformBlockIndex(dt,I.name),s.uniformBlockBinding(dt,Tt,Tt),at.set(I,Tt))}function rt(I,dt,at){let At=c.get(dt).get(I);l[At]!==at&&(s.bindBufferBase(s.UNIFORM_BUFFER,At,at),l[At]=at)}function xt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},et=null,Z={},d={},l={},u=new WeakMap,m=[],_=null,p=!1,g=null,v=null,b=null,M=null,A=null,T=null,x=null,S=new ee(0,0,0),P=0,R=!1,D=null,W=null,O=null,C=null,k=null,L.set(0,0,s.canvas.width,s.canvas.height),X.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:st,disable:Ut,bindFramebuffer:Zt,drawBuffers:Lt,useProgram:qt,setBlending:V,setMaterial:tt,setFlipSided:ht,setCullFace:F,setLineWidth:nt,setPolygonOffset:mt,setScissorTest:Ct,activeTexture:Dt,bindTexture:Xt,unbindTexture:N,compressedTexImage2D:fe,compressedTexImage3D:ot,texImage2D:y,texImage3D:z,pixelStorei:ut,getParameter:pt,updateUBOMapping:J,uniformBlockBinding:rt,texStorage2D:bt,texStorage3D:E,texSubImage2D:St,texSubImage3D:lt,compressedTexSubImage2D:Rt,compressedTexSubImage3D:vt,scissor:yt,viewport:Mt,reset:xt}}function Db(s,t,e,n,i,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Nt,h=new WeakMap,f=new Set,d,u=new WeakMap,m=new Set,_=new FinalizationRegistry(E=>m.delete(E)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return p?new OffscreenCanvas(E,y):Ia("canvas")}function v(E,y,z){let pt=1,ut=bt(E);if((ut.width>z||ut.height>z)&&(pt=z/Math.max(ut.width,ut.height)),pt<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let yt=Math.floor(pt*ut.width),Mt=Math.floor(pt*ut.height);d===void 0&&(d=g(yt,Mt));let J=y?g(yt,Mt):d;return J.width=yt,J.height=Mt,J.getContext("2d").drawImage(E,0,0,yt,Mt),Kt("WebGLRenderer: Texture has been resized from ("+ut.width+"x"+ut.height+") to ("+yt+"x"+Mt+")."),J}else return"data"in E&&Kt("WebGLRenderer: Image in DataTexture is too big ("+ut.width+"x"+ut.height+")."),E;return E}function b(E){return E.generateMipmaps}function M(E){s.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(E,y,z,pt,ut,yt=!1){if(E!==null){if(s[E]!==void 0)return s[E];Kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Mt;pt&&(Mt=t.get("EXT_texture_norm16"),Mt||Kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=y;if(y===s.RED&&(z===s.FLOAT&&(J=s.R32F),z===s.HALF_FLOAT&&(J=s.R16F),z===s.UNSIGNED_BYTE&&(J=s.R8),z===s.UNSIGNED_SHORT&&Mt&&(J=Mt.R16_EXT),z===s.SHORT&&Mt&&(J=Mt.R16_SNORM_EXT)),y===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.R8UI),z===s.UNSIGNED_SHORT&&(J=s.R16UI),z===s.UNSIGNED_INT&&(J=s.R32UI),z===s.BYTE&&(J=s.R8I),z===s.SHORT&&(J=s.R16I),z===s.INT&&(J=s.R32I)),y===s.RG&&(z===s.FLOAT&&(J=s.RG32F),z===s.HALF_FLOAT&&(J=s.RG16F),z===s.UNSIGNED_BYTE&&(J=s.RG8),z===s.UNSIGNED_SHORT&&Mt&&(J=Mt.RG16_EXT),z===s.SHORT&&Mt&&(J=Mt.RG16_SNORM_EXT)),y===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RG8UI),z===s.UNSIGNED_SHORT&&(J=s.RG16UI),z===s.UNSIGNED_INT&&(J=s.RG32UI),z===s.BYTE&&(J=s.RG8I),z===s.SHORT&&(J=s.RG16I),z===s.INT&&(J=s.RG32I)),y===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RGB8UI),z===s.UNSIGNED_SHORT&&(J=s.RGB16UI),z===s.UNSIGNED_INT&&(J=s.RGB32UI),z===s.BYTE&&(J=s.RGB8I),z===s.SHORT&&(J=s.RGB16I),z===s.INT&&(J=s.RGB32I)),y===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),z===s.UNSIGNED_INT&&(J=s.RGBA32UI),z===s.BYTE&&(J=s.RGBA8I),z===s.SHORT&&(J=s.RGBA16I),z===s.INT&&(J=s.RGBA32I)),y===s.RGB&&(z===s.UNSIGNED_SHORT&&Mt&&(J=Mt.RGB16_EXT),z===s.SHORT&&Mt&&(J=Mt.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(J=s.R11F_G11F_B10F)),y===s.RGBA){let rt=yt?Pa:ce.getTransfer(ut);z===s.FLOAT&&(J=s.RGBA32F),z===s.HALF_FLOAT&&(J=s.RGBA16F),z===s.UNSIGNED_BYTE&&(J=rt===_e?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&Mt&&(J=Mt.RGBA16_EXT),z===s.SHORT&&Mt&&(J=Mt.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(E,y){let z;return E?y===null||y===ei||y===Qs?z=s.DEPTH24_STENCIL8:y===ni?z=s.DEPTH32F_STENCIL8:y===Zr&&(z=s.DEPTH24_STENCIL8,Kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ei||y===Qs?z=s.DEPTH_COMPONENT24:y===ni?z=s.DEPTH_COMPONENT32F:y===Zr&&(z=s.DEPTH_COMPONENT16),z}function S(E,y){return b(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ze&&E.minFilter!==_n?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function P(E){let y=new WeakRef(E);n.get(E).__ref=y,m.add(y),_.register(E,y,y)}function R(E){let y=n.get(E).__ref;y!==void 0&&(m.delete(y),_.unregister(y))}function D(E){O(E.target)}function W(E){C(E.target)}function O(E){E.removeEventListener("dispose",D),R(E),G(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&f.delete(E)}function C(E){E.removeEventListener("dispose",W),R(E),j(E)}function k(){for(let E of m){let y=E.deref();y!==void 0&&(y.isRenderTarget===!0?C(y):O(y))}m.clear(),f.clear()}function G(E){let y=n.get(E);if(y.__webglInit===void 0)return;let z=E.source,pt=u.get(z);if(pt){let ut=pt[y.__cacheKey];ut.usedTimes--,ut.usedTimes===0&&U(E),Object.keys(pt).length===0&&u.delete(z)}n.remove(E)}function U(E){let y=n.get(E);s.deleteTexture(y.__webglTexture);let z=E.source,pt=u.get(z);delete pt[y.__cacheKey],a.memory.textures--}function j(E){let y=n.get(E);y.__depthDisposeCallback&&y.__depthDisposeCallback();let z=E.depthTexture;if(z&&z.renderTarget===E&&O(z),E.isWebGLCubeRenderTarget)for(let ut=0;ut<6;ut++){if(Array.isArray(y.__webglFramebuffer[ut]))for(let yt=0;yt<y.__webglFramebuffer[ut].length;yt++)s.deleteFramebuffer(y.__webglFramebuffer[ut][yt]);else s.deleteFramebuffer(y.__webglFramebuffer[ut]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[ut])}else{if(Array.isArray(y.__webglFramebuffer))for(let ut=0;ut<y.__webglFramebuffer.length;ut++)s.deleteFramebuffer(y.__webglFramebuffer[ut]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ut=0;ut<y.__webglColorRenderbuffer.length;ut++)y.__webglColorRenderbuffer[ut]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[ut]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let pt=E.textures;for(let ut=0,yt=pt.length;ut<yt;ut++){let Mt=n.get(pt[ut]);Mt.__webglTexture&&(s.deleteTexture(Mt.__webglTexture),a.memory.textures--),n.remove(pt[ut])}n.remove(E)}let q=0;function et(){q=0}function Z(){return q}function gt(E){q=E}function $(){let E=q;return E>=i.maxTextures&&Kt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+i.maxTextures),q+=1,E}function L(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.mipmapsAutoUpdate),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function X(E,y){let z=n.get(E);if(E.isVideoTexture&&Rt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&z.__version!==E.version){let pt=E.image;if(pt===null)Kt("WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)Kt("WebGLRenderer: Texture marked for update but image is incomplete");else{tt(z,E,y);return}}else E.isExternalTexture&&(z.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+y)}function Q(E,y){let z=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){tt(z,E,y);return}else E.isExternalTexture&&(z.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+y)}function _t(E,y){let z=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){tt(z,E,y);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+y)}function st(E,y){let z=n.get(E);if(E.version>0&&z.__version!==E.version){ht(z,E,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+y)}let Ut={[bl]:s.REPEAT,[_i]:s.CLAMP_TO_EDGE,[wl]:s.MIRRORED_REPEAT},Zt={[Ze]:s.NEAREST,[fm]:s.NEAREST_MIPMAP_NEAREST,[io]:s.NEAREST_MIPMAP_LINEAR,[_n]:s.LINEAR,[oc]:s.LINEAR_MIPMAP_NEAREST,[qi]:s.LINEAR_MIPMAP_LINEAR},Lt={[_m]:s.NEVER,[id]:s.ALWAYS,[xm]:s.LESS,[ed]:s.LEQUAL,[vm]:s.EQUAL,[nd]:s.GEQUAL,[ym]:s.GREATER,[Mm]:s.NOTEQUAL};function qt(E,y){if(y.type===ni&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===_n||y.magFilter===oc||y.magFilter===io||y.magFilter===qi||y.minFilter===_n||y.minFilter===oc||y.minFilter===io||y.minFilter===qi)&&Kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,Ut[y.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,Ut[y.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,Ut[y.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,Zt[y.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,Zt[y.minFilter]),y.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,Lt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ze||y.minFilter!==io&&y.minFilter!==qi||y.type===ni&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function $t(E,y){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",D),P(y));let pt=y.source,ut=u.get(pt);ut===void 0&&(ut={},u.set(pt,ut));let yt=L(y);if(yt!==E.__cacheKey){ut[yt]===void 0&&(ut[yt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ut[yt].usedTimes++;let Mt=ut[E.__cacheKey];Mt!==void 0&&(ut[E.__cacheKey].usedTimes--,Mt.usedTimes===0&&U(y)),E.__cacheKey=yt,E.__webglTexture=ut[yt].texture}return z}function ct(E,y,z){return Math.floor(Math.floor(E/z)/y)}function V(E,y,z,pt){let yt=E.updateRanges;if(yt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,z,pt,y.data);else{yt.sort((I,dt)=>I.start-dt.start);let Mt=0;for(let I=1;I<yt.length;I++){let dt=yt[Mt],at=yt[I],Tt=dt.start+dt.count,At=ct(at.start,y.width,4),Et=ct(dt.start,y.width,4);at.start<=Tt+1&&At===Et&&ct(at.start+at.count-1,y.width,4)===At?dt.count=Math.max(dt.count,at.start+at.count-dt.start):(++Mt,yt[Mt]=at)}yt.length=Mt+1;let J=e.getParameter(s.UNPACK_ROW_LENGTH),rt=e.getParameter(s.UNPACK_SKIP_PIXELS),xt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let I=0,dt=yt.length;I<dt;I++){let at=yt[I],Tt=Math.floor(at.start/4),At=Math.ceil(at.count/4),Et=Tt%y.width,Ht=Math.floor(Tt/y.width),ie=At,wt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Et),e.pixelStorei(s.UNPACK_SKIP_ROWS,Ht),e.texSubImage2D(s.TEXTURE_2D,0,Et,Ht,ie,wt,z,pt,y.data)}E.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,J),e.pixelStorei(s.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(s.UNPACK_SKIP_ROWS,xt)}}function tt(E,y,z){let pt=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(pt=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(pt=s.TEXTURE_3D);let ut=$t(E,y),yt=y.source;e.bindTexture(pt,E.__webglTexture,s.TEXTURE0+z);let Mt=n.get(yt);if(yt.version!==Mt.__version||ut===!0){if(e.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let wt=ce.getPrimaries(ce.workingColorSpace),Jt=y.colorSpace===Yi?null:ce.getPrimaries(y.colorSpace),ne=y.colorSpace===Yi||wt===Jt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne)}e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment);let rt=v(y.image,!1,i.maxTextureSize);rt=vt(y,rt);let xt=r.convert(y.format,y.colorSpace),I=r.convert(y.type),dt=T(y.internalFormat,xt,I,y.normalized,y.colorSpace,y.isVideoTexture);qt(pt,y);let at,Tt=y.mipmaps,At=y.isVideoTexture!==!0,Et=Mt.__version===void 0||ut===!0,Ht=yt.dataReady,ie=S(y,rt);if(y.isDepthTexture)dt=x(y.format===$i,y.type),Et&&(At?e.texStorage2D(s.TEXTURE_2D,1,dt,rt.width,rt.height):e.texImage2D(s.TEXTURE_2D,0,dt,rt.width,rt.height,0,xt,I,null));else if(y.isDataTexture)if(Tt.length>0){At&&Et&&e.texStorage2D(s.TEXTURE_2D,ie,dt,Tt[0].width,Tt[0].height);for(let wt=0,Jt=Tt.length;wt<Jt;wt++)at=Tt[wt],At?Ht&&e.texSubImage2D(s.TEXTURE_2D,wt,0,0,at.width,at.height,xt,I,at.data):e.texImage2D(s.TEXTURE_2D,wt,dt,at.width,at.height,0,xt,I,at.data);y.generateMipmaps=!1}else At?(Et&&e.texStorage2D(s.TEXTURE_2D,ie,dt,rt.width,rt.height),Ht&&V(y,rt,xt,I)):e.texImage2D(s.TEXTURE_2D,0,dt,rt.width,rt.height,0,xt,I,rt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){At&&Et&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ie,dt,Tt[0].width,Tt[0].height,rt.depth);for(let wt=0,Jt=Tt.length;wt<Jt;wt++)if(at=Tt[wt],y.format!==si)if(xt!==null)if(At){if(Ht)if(y.layerUpdates.size>0){let ne=ud(at.width,at.height,y.format,y.type);for(let Ft of y.layerUpdates){let xe=at.data.subarray(Ft*ne/at.data.BYTES_PER_ELEMENT,(Ft+1)*ne/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,wt,0,0,Ft,at.width,at.height,1,xt,xe)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,wt,0,0,0,at.width,at.height,rt.depth,xt,at.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,wt,dt,at.width,at.height,rt.depth,0,at.data,0,0);else Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else At?Ht&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,wt,0,0,0,at.width,at.height,rt.depth,xt,I,at.data):e.texImage3D(s.TEXTURE_2D_ARRAY,wt,dt,at.width,at.height,rt.depth,0,xt,I,at.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{At&&Et&&e.texStorage2D(s.TEXTURE_2D,ie,dt,Tt[0].width,Tt[0].height);for(let wt=0,Jt=Tt.length;wt<Jt;wt++)at=Tt[wt],y.format!==si?xt!==null?At?Ht&&e.compressedTexSubImage2D(s.TEXTURE_2D,wt,0,0,at.width,at.height,xt,at.data):e.compressedTexImage2D(s.TEXTURE_2D,wt,dt,at.width,at.height,0,at.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):At?Ht&&e.texSubImage2D(s.TEXTURE_2D,wt,0,0,at.width,at.height,xt,I,at.data):e.texImage2D(s.TEXTURE_2D,wt,dt,at.width,at.height,0,xt,I,at.data)}else if(y.isDataArrayTexture)if(At){if(Et&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ie,dt,rt.width,rt.height,rt.depth),Ht)if(y.layerUpdates.size>0){let wt=ud(rt.width,rt.height,y.format,y.type);for(let Jt of y.layerUpdates){let ne=rt.data.subarray(Jt*wt/rt.data.BYTES_PER_ELEMENT,(Jt+1)*wt/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Jt,rt.width,rt.height,1,xt,I,ne)}y.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,xt,I,rt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,dt,rt.width,rt.height,rt.depth,0,xt,I,rt.data);else if(y.isData3DTexture)At?(Et&&e.texStorage3D(s.TEXTURE_3D,ie,dt,rt.width,rt.height,rt.depth),Ht&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,xt,I,rt.data)):e.texImage3D(s.TEXTURE_3D,0,dt,rt.width,rt.height,rt.depth,0,xt,I,rt.data);else if(y.isFramebufferTexture){if(Et)if(At)e.texStorage2D(s.TEXTURE_2D,ie,dt,rt.width,rt.height);else{let wt=rt.width,Jt=rt.height;for(let ne=0;ne<ie;ne++)e.texImage2D(s.TEXTURE_2D,ne,dt,wt,Jt,0,xt,I,null),wt>>=1,Jt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in s){let wt=s.canvas;if(wt.hasAttribute("layoutsubtree")||wt.setAttribute("layoutsubtree","true"),rt.parentNode!==wt){wt.appendChild(rt),f.add(y),wt.onpaint=Jt=>{let ne=Jt.changedElements;for(let Ft of f)ne.includes(Ft.image)&&(Ft.needsUpdate=!0)},wt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,rt);else{let ne=s.RGBA,Ft=s.RGBA,xe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ne,Ft,xe,rt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(At&&Et){let wt=bt(Tt[0]);e.texStorage2D(s.TEXTURE_2D,ie,dt,wt.width,wt.height)}for(let wt=0,Jt=Tt.length;wt<Jt;wt++)at=Tt[wt],At?Ht&&e.texSubImage2D(s.TEXTURE_2D,wt,0,0,xt,I,at):e.texImage2D(s.TEXTURE_2D,wt,dt,xt,I,at);y.generateMipmaps=!1}else if(At){if(Et){let wt=bt(rt);e.texStorage2D(s.TEXTURE_2D,ie,dt,wt.width,wt.height)}Ht&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,xt,I,rt)}else e.texImage2D(s.TEXTURE_2D,0,dt,xt,I,rt);b(y)&&y.mipmapsAutoUpdate===!0&&M(pt),Mt.__version=yt.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function ht(E,y,z){if(y.image.length!==6)return;let pt=$t(E,y),ut=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+z);let yt=n.get(ut);if(ut.version!==yt.__version||pt===!0){e.activeTexture(s.TEXTURE0+z);let Mt=ce.getPrimaries(ce.workingColorSpace),J=y.colorSpace===Yi?null:ce.getPrimaries(y.colorSpace),rt=y.colorSpace===Yi||Mt===J?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);let xt=y.isCompressedTexture||y.image[0].isCompressedTexture,I=y.image[0]&&y.image[0].isDataTexture,dt=[];for(let Ft=0;Ft<6;Ft++)!xt&&!I?dt[Ft]=v(y.image[Ft],!0,i.maxCubemapSize):dt[Ft]=I?y.image[Ft].image:y.image[Ft],dt[Ft]=vt(y,dt[Ft]);let at=dt[0],Tt=r.convert(y.format,y.colorSpace),At=r.convert(y.type),Et=T(y.internalFormat,Tt,At,y.normalized,y.colorSpace),Ht=y.isVideoTexture!==!0,ie=yt.__version===void 0||pt===!0,wt=ut.dataReady,Jt=S(y,at);qt(s.TEXTURE_CUBE_MAP,y);let ne;if(y.isDepthTexture){if(Et=x(y.format===$i,y.type),ie)if(Ht)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,Et,at.width,at.height);else for(let Ft=0;Ft<6;Ft++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,0,Et,at.width,at.height,0,Tt,At,null)}else if(xt){Ht&&ie&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Jt,Et,at.width,at.height);for(let Ft=0;Ft<6;Ft++){ne=dt[Ft].mipmaps;for(let xe=0;xe<ne.length;xe++){let qe=ne[xe];y.format!==si?Tt!==null?Ht?wt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,xe,0,0,qe.width,qe.height,Tt,qe.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,xe,Et,qe.width,qe.height,0,qe.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,xe,0,0,qe.width,qe.height,Tt,At,qe.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,xe,Et,qe.width,qe.height,0,Tt,At,qe.data)}}}else{if(ne=y.mipmaps,Ht&&ie){ne.length>0&&Jt++;let Ft=bt(dt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Jt,Et,Ft.width,Ft.height)}for(let Ft=0;Ft<6;Ft++)if(I){Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,0,0,0,dt[Ft].width,dt[Ft].height,Tt,At,dt[Ft].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,0,Et,dt[Ft].width,dt[Ft].height,0,Tt,At,dt[Ft].data);for(let xe=0;xe<ne.length;xe++){let Ki=ne[xe].image[Ft].image;Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,xe+1,0,0,Ki.width,Ki.height,Tt,At,Ki.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,xe+1,Et,Ki.width,Ki.height,0,Tt,At,Ki.data)}}else{Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,0,0,0,Tt,At,dt[Ft]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,0,Et,Tt,At,dt[Ft]);for(let xe=0;xe<ne.length;xe++){let qe=ne[xe];Ht?wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,xe+1,0,0,Tt,At,qe.image[Ft]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ft,xe+1,Et,Tt,At,qe.image[Ft])}}}b(y)&&y.mipmapsAutoUpdate===!0&&M(s.TEXTURE_CUBE_MAP),yt.__version=ut.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function F(E,y,z,pt,ut,yt){let Mt=r.convert(z.format,z.colorSpace),J=r.convert(z.type),rt=T(z.internalFormat,Mt,J,z.normalized,z.colorSpace),xt=n.get(y),I=n.get(z);if(I.__renderTarget=y,!xt.__hasExternalTextures){let dt=Math.max(1,y.width>>yt),at=Math.max(1,y.height>>yt);ut===s.TEXTURE_3D||ut===s.TEXTURE_2D_ARRAY?e.texImage3D(ut,yt,rt,dt,at,y.depth,0,Mt,J,null):e.texImage2D(ut,yt,rt,dt,at,0,Mt,J,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),lt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pt,ut,I.__webglTexture,0,St(y)):(ut===s.TEXTURE_2D||ut>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ut<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,pt,ut,I.__webglTexture,yt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function nt(E,y,z){if(s.bindRenderbuffer(s.RENDERBUFFER,E),y.depthBuffer){let pt=y.depthTexture,ut=pt&&pt.isDepthTexture?pt.type:null,yt=x(y.stencilBuffer,ut),Mt=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;lt(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(y),yt,y.width,y.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(y),yt,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,yt,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Mt,s.RENDERBUFFER,E)}else{let pt=y.textures;for(let ut=0;ut<pt.length;ut++){let yt=pt[ut],Mt=r.convert(yt.format,yt.colorSpace),J=r.convert(yt.type),rt=T(yt.internalFormat,Mt,J,yt.normalized,yt.colorSpace);lt(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(y),rt,y.width,y.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(y),rt,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,rt,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function mt(E,y,z){let pt=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ut=n.get(y.depthTexture);ut.__renderTarget=y;let yt=pt?y.depthTexture.image[0]:y.depthTexture.image;(!ut.__webglTexture||yt.width!==y.width||yt.height!==y.height)&&(yt.width=y.width,yt.height=y.height,y.depthTexture.needsUpdate=!0),pt?st(y.depthTexture,0):X(y.depthTexture,0);let Mt=ut.__webglTexture,J=St(y),rt=pt?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,xt=y.depthTexture.format===$i?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(y.depthTexture.format===Hi)lt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,xt,rt,Mt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,xt,rt,Mt,0);else if(y.depthTexture.format===$i)lt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,xt,rt,Mt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,xt,rt,Mt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ct(E){let y=n.get(E),z=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){let pt=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),pt){let ut=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,pt.removeEventListener("dispose",ut)};pt.addEventListener("dispose",ut),y.__depthDisposeCallback=ut}y.__boundDepthTexture=pt}if(E.depthTexture&&!y.__autoAllocateDepthBuffer)if(z)for(let pt=0;pt<6;pt++)mt(y.__webglFramebuffer[pt],E,pt);else E.texture.mipmaps.length>0?mt(y.__webglFramebuffer[0],E,0):mt(y.__webglFramebuffer,E,0);else if(z){y.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[pt]),y.__webglDepthbuffer[pt]===void 0)y.__webglDepthbuffer[pt]=s.createRenderbuffer(),nt(y.__webglDepthbuffer[pt],E,!1);else{let ut=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=y.__webglDepthbuffer[pt];s.bindRenderbuffer(s.RENDERBUFFER,yt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ut,s.RENDERBUFFER,yt)}}else if(E.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),nt(y.__webglDepthbuffer,E,!1);else{let ut=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,yt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ut,s.RENDERBUFFER,yt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(E,y,z){let pt=n.get(E);y!==void 0&&F(pt.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Ct(E)}function Xt(E){let y=E.texture,z=n.get(E),pt=n.get(y);E.addEventListener("dispose",W),P(E);let ut=E.textures,yt=E.isWebGLCubeRenderTarget===!0,Mt=ut.length>1;if(Mt||(pt.__webglTexture===void 0&&(pt.__webglTexture=s.createTexture()),pt.__version=y.version,a.memory.textures++),yt){z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(y.mipmaps.length>0){z.__webglFramebuffer[J]=[];for(let rt=0;rt<y.mipmaps.length;rt++)z.__webglFramebuffer[J][rt]=s.createFramebuffer()}else z.__webglFramebuffer[J]=s.createFramebuffer()}else{if(y.mipmaps.length>0){z.__webglFramebuffer=[];for(let J=0;J<y.mipmaps.length;J++)z.__webglFramebuffer[J]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(Mt)for(let J=0,rt=ut.length;J<rt;J++){let xt=n.get(ut[J]);xt.__webglTexture===void 0&&(xt.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&lt(E)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let J=0;J<ut.length;J++){let rt=ut[J];z.__webglColorRenderbuffer[J]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[J]);let xt=r.convert(rt.format,rt.colorSpace),I=r.convert(rt.type),dt=T(rt.internalFormat,xt,I,rt.normalized,rt.colorSpace,E.isXRRenderTarget===!0),at=St(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,at,dt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+J,s.RENDERBUFFER,z.__webglColorRenderbuffer[J])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),nt(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(yt){e.bindTexture(s.TEXTURE_CUBE_MAP,pt.__webglTexture),qt(s.TEXTURE_CUBE_MAP,y);for(let J=0;J<6;J++)if(y.mipmaps.length>0)for(let rt=0;rt<y.mipmaps.length;rt++)F(z.__webglFramebuffer[J][rt],E,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,rt);else F(z.__webglFramebuffer[J],E,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);b(y)?M(s.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}else if(Mt){for(let J=0,rt=ut.length;J<rt;J++){let xt=ut[J],I=n.get(xt),dt=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(dt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(dt,I.__webglTexture),qt(dt,xt),F(z.__webglFramebuffer,E,xt,s.COLOR_ATTACHMENT0+J,dt,0),b(xt)&&M(dt)}e.unbindTexture()}else{let J=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(J=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(J,pt.__webglTexture),qt(J,y),y.mipmaps.length>0)for(let rt=0;rt<y.mipmaps.length;rt++)F(z.__webglFramebuffer[rt],E,y,s.COLOR_ATTACHMENT0,J,rt);else F(z.__webglFramebuffer,E,y,s.COLOR_ATTACHMENT0,J,0);b(y)?M(J):y.mipmaps.length>0&&s.texParameteri(J,s.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}E.depthBuffer&&Ct(E)}function N(E){let y=E.textures;for(let z=0,pt=y.length;z<pt;z++){let ut=y[z];if(b(ut)&&ut.mipmapsAutoUpdate===!0){let yt=A(E),Mt=n.get(ut).__webglTexture;e.bindTexture(yt,Mt),M(yt),e.unbindTexture()}}}let fe=[];function ot(E){if(E.samples>0){if(lt(E)===!1){let y=E.textures,z=E.width,pt=E.height,ut=s.COLOR_BUFFER_BIT,yt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Mt=n.get(E),J=y.length>1;if(J)for(let xt=0;xt<y.length;xt++)e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let xt=0;xt<y.length;xt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ut|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ut|=s.STENCIL_BUFFER_BIT)),J){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[xt]);let I=n.get(y[xt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,I,0)}s.blitFramebuffer(0,0,z,pt,0,0,z,pt,ut,s.NEAREST),l===!0&&(fe.length=0,fe.push(s.COLOR_ATTACHMENT0+xt),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&fe.push(yt),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),J)for(let xt=0;xt<y.length;xt++){e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[xt]);let I=n.get(y[xt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,I,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let y=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function St(E){return Math.min(i.maxSamples,E.samples)}function lt(E){let y=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Rt(E){let y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function vt(E,y){let z=E.colorSpace,pt=E.format,ut=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||z!==Ra&&z!==Yi&&(ce.getTransfer(z)===_e?(pt!==si||ut!==Tn)&&Kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",z)),y}function bt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=et,this.getTextureUnits=Z,this.setTextureUnits=gt,this.setTexture2D=X,this.setTexture2DArray=Q,this.setTexture3D=_t,this.setTextureCube=st,this.rebindTextures=Dt,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=ot,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=F,this.useMultisampledRTT=lt,this.dispose=k}function Nb(s,t){function e(n,i=Yi){let r,a=ce.getTransfer(i);if(n===Tn)return s.UNSIGNED_BYTE;if(n===cc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===hc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ju)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ku)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yu)return s.BYTE;if(n===Zu)return s.SHORT;if(n===Zr)return s.UNSIGNED_SHORT;if(n===lc)return s.INT;if(n===ei)return s.UNSIGNED_INT;if(n===ni)return s.FLOAT;if(n===ii)return s.HALF_FLOAT;if(n===ju)return s.ALPHA;if(n===Qu)return s.RGB;if(n===si)return s.RGBA;if(n===Hi)return s.DEPTH_COMPONENT;if(n===$i)return s.DEPTH_STENCIL;if(n===td)return s.RED;if(n===uc)return s.RED_INTEGER;if(n===Ms)return s.RG;if(n===dc)return s.RG_INTEGER;if(n===fc)return s.RGBA_INTEGER;if(n===so||n===ro||n===ao||n===oo)if(a===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===so)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===so)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pc||n===mc||n===gc||n===_c)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_c)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xc||n===vc||n===yc||n===Mc||n===Sc||n===lo||n===bc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xc||n===vc)return a===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===yc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Mc)return r.COMPRESSED_R11_EAC;if(n===Sc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===lo)return r.COMPRESSED_RG11_EAC;if(n===bc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===wc||n===Ac||n===Tc||n===Ec||n===Cc||n===Rc||n===Pc||n===Ic||n===Lc||n===Dc||n===Nc||n===Uc||n===Fc||n===Oc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ac)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ec)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ic)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Lc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Dc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Uc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bc||n===kc||n===zc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Bc)return a===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===kc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gc||n===Vc||n===co||n===Hc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Gc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===co)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Ub=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fb=`
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

}`,Ad=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new za(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new qn({vertexShader:Ub,fragmentShader:Fb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Un(new Ys(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Td=class extends vi{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,d=null,u=null,m=null,_=typeof XRWebGLBinding<"u",p=new Ad,g={},v=e.getContextAttributes(),b=null,M=null,A=[],T=[],x=new Nt,S=null,P=null,R=new gn;R.viewport=new Re;let D=new gn;D.viewport=new Re;let W=[R,D],O=new ic,C=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let X=A[L];return X===void 0&&(X=new Ur,A[L]=X),X.getTargetRaySpace()},this.getControllerGrip=function(L){let X=A[L];return X===void 0&&(X=new Ur,A[L]=X),X.getGripSpace()},this.getHand=function(L){let X=A[L];return X===void 0&&(X=new Ur,A[L]=X),X.getHandSpace()};function G(L){let X=T.indexOf(L.inputSource);if(X===-1)return;let Q=A[X];Q!==void 0&&(Q.update(L.inputSource,L.frame,c||a),Q.dispatchEvent({type:L.type,data:L.inputSource}))}function U(){i.removeEventListener("select",G),i.removeEventListener("selectstart",G),i.removeEventListener("selectend",G),i.removeEventListener("squeeze",G),i.removeEventListener("squeezestart",G),i.removeEventListener("squeezeend",G),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",j);for(let L=0;L<A.length;L++){let X=T[L];X!==null&&(T[L]=null,A[L].disconnect(X))}C=null,k=null,p.reset();for(let L in g)delete g[L];if(t.setRenderTarget(b),u=null,d=null,f=null,i=null,M=null,$.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(x.width,x.height,!1),P!==null){let L=P.camera;L.fov=P.fov,L.zoom=P.zoom,L.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){r=L,n.isPresenting===!0&&Kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){o=L,n.isPresenting===!0&&Kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(L){c=L},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(i,e)),f},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(L){if(i=L,i!==null){if(b=t.getRenderTarget(),i.addEventListener("select",G),i.addEventListener("selectstart",G),i.addEventListener("selectend",G),i.addEventListener("squeeze",G),i.addEventListener("squeezestart",G),i.addEventListener("squeezeend",G),i.addEventListener("end",U),i.addEventListener("inputsourceschange",j),v.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Q=null,_t=null,st=null;v.depth&&(st=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=v.stencil?$i:Hi,_t=v.stencil?Qs:ei);let Ut={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Ut),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Nn(d.textureWidth,d.textureHeight,{format:si,type:Tn,depthTexture:new Xi(d.textureWidth,d.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Q={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(i,e,Q),i.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),M=new Nn(u.framebufferWidth,u.framebufferHeight,{format:si,type:Tn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),$.setContext(i),$.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function j(L){for(let X=0;X<L.removed.length;X++){let Q=L.removed[X],_t=T.indexOf(Q);_t>=0&&(T[_t]=null,A[_t].disconnect(Q))}for(let X=0;X<L.added.length;X++){let Q=L.added[X],_t=T.indexOf(Q);if(_t===-1){for(let Ut=0;Ut<A.length;Ut++)if(Ut>=T.length){T.push(Q),_t=Ut;break}else if(T[Ut]===null){T[Ut]=Q,_t=Ut;break}if(_t===-1)break}let st=A[_t];st&&st.connect(Q)}}function q(L,X){X===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(X.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(i===null)return;let X=L.near,Q=L.far;p.texture!==null&&(p.depthNear>0&&(X=p.depthNear),p.depthFar>0&&(Q=p.depthFar)),O.near=D.near=R.near=X,O.far=D.far=R.far=Q,(C!==O.near||k!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),C=O.near,k=O.far),O.layers.mask=L.layers.mask|6,R.layers.mask=O.layers.mask&-5,D.layers.mask=O.layers.mask&-3;let _t=L.parent,st=O.cameras;q(O,_t);for(let Ut=0;Ut<st.length;Ut++)q(st[Ut],_t);O.projectionMatrix.copy(R.projectionMatrix),O.projectionMatrixInverse.copy(R.projectionMatrixInverse),P===null&&L.isPerspectiveCamera&&(P={camera:L,fov:L.fov,zoom:L.zoom}),et(L,O,_t)};function et(L,X,Q){Q===null?L.matrix.copy(X.matrixWorld):(L.matrix.copy(Q.matrixWorld),L.matrix.invert(),L.matrix.multiply(X.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(X.projectionMatrix),L.projectionMatrixInverse.copy(X.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=Tl*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(L){l=L,d!==null&&(d.fixedFoveation=L),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=L)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(L){return g[L]};let Z=null;function gt(L,X){if(h=X.getViewerPose(c||a),m=X,h!==null){let Q=h.views;u!==null&&(t.setRenderTargetFramebuffer(M,u.framebuffer),t.setRenderTarget(M));let _t=!1;Q.length!==O.cameras.length&&(O.cameras.length=0,_t=!0);for(let Lt=0;Lt<Q.length;Lt++){let qt=Q[Lt],$t=null;if(u!==null)$t=u.getViewport(qt);else{let V=f.getViewSubImage(d,qt);$t=V.viewport,Lt===0&&(t.setRenderTargetTextures(M,V.colorTexture,V.depthStencilTexture),t.setRenderTarget(M))}let ct=W[Lt];ct===void 0&&(ct=new gn,ct.layers.enable(Lt),ct.viewport=new Re,W[Lt]=ct),ct.matrix.fromArray(qt.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(qt.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set($t.x,$t.y,$t.width,$t.height),Lt===0&&(O.matrix.copy(ct.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),_t===!0&&O.cameras.push(ct)}let st=i.enabledFeatures;if(st&&st.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){f=n.getBinding();let Lt=f.getDepthInformation(Q[0]);Lt&&Lt.isValid&&Lt.texture&&p.init(Lt,i.renderState)}if(st&&st.includes("camera-access")&&_){t.state.unbindTexture(),f=n.getBinding();for(let Lt=0;Lt<Q.length;Lt++){let qt=Q[Lt].camera;if(qt){let $t=g[qt];$t||($t=new za,g[qt]=$t);let ct=f.getCameraImage(qt);$t.sourceTexture=ct}}}}for(let Q=0;Q<A.length;Q++){let _t=T[Q],st=A[Q];_t!==null&&st!==void 0&&st.update(_t,X,c||a)}Z&&Z(L,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),m=null}let $=new i0;$.setAnimationLoop(gt),this.setAnimationLoop=function(L){Z=L},this.dispose=function(){}}},Ob=new be,f0=new Qt;f0.set(-1,0,0,0,1,0,0,0,1);function Bb(s,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,ld(s)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,v,b,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),f(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),d(p,g),g.isMeshPhysicalMaterial&&u(p,g,M)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,v,b):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===xn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===xn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let v=t.get(g),b=v.envMap,M=v.envMapRotation;b&&(p.envMap.value=b,p.envMapRotation.value.setFromMatrix4(Ob.makeRotationFromEuler(M)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(f0),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,v,b){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=b*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function f(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function u(p,g,v){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===xn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function kb(s,t,e,n){let i={},r={};function a(v,b){let M=b.program;n.uniformBlockBinding(v,M,i[v.id])}function o(v,b){let M=i[v.id];M===void 0&&(m(v),M=l(v),i[v.id]=M,v.addEventListener("dispose",p));let A=b.program;n.updateUBOMapping(v,A);let T=t.render.frame;r[v.id]!==T&&(c(v),r[v.id]=T)}function l(v){let b=s.createBuffer(),M=v.__size,A=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,M,A),s.bindBuffer(s.UNIFORM_BUFFER,null),b}function c(v){let b=i[v.id],M=v.uniforms,A=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let T=0,x=M.length;T<x;T++){let S=M[T];if(Array.isArray(S))for(let P=0,R=S.length;P<R;P++)h(S[P],T,P,A);else h(S,T,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(v,b,M,A){if(d(v,b,M,A)===!0){let T=v.__offset,x=v.value;if(Array.isArray(x)){let S=0;for(let P=0;P<x.length;P++){let R=x[P],D=_(R,!0);f(R,v.__data,S),S+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else f(x,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,v.__data)}}function f(v,b,M){typeof v=="number"||typeof v=="boolean"?b[M]=v:v.isMatrix3?(b[M]=v.elements[0],b[M+1]=v.elements[1],b[M+2]=v.elements[2],b[M+3]=0,b[M+4]=v.elements[3],b[M+5]=v.elements[4],b[M+6]=v.elements[5],b[M+7]=0,b[M+8]=v.elements[6],b[M+9]=v.elements[7],b[M+10]=v.elements[8],b[M+11]=0):ArrayBuffer.isView(v)?b.set(v.subarray(0,b.length-M),M):v.toArray(b,M)}function d(v,b,M,A){let T=v.value,x=b+"_"+M;if(Array.isArray(T)){A[x]===void 0&&(A[x]=[]);let S=A[x],P=!1;for(let R=0;R<T.length;R++)u(T[R],S,R)===!0&&(P=!0);return P}return u(T,A,x)}function u(v,b,M){if(b[M]===void 0)return typeof v=="number"||typeof v=="boolean"?b[M]=v:ArrayBuffer.isView(v)?b[M]=v.slice():b[M]=v.clone(),!0;{let A=b[M];if(typeof v=="number"||typeof v=="boolean"){if(A!==v)return b[M]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(A.equals(v)===!1)return A.copy(v),!0}}return!1}function m(v){let b=v.uniforms,M=0,A=16;for(let x=0,S=b.length;x<S;x++){let P=Array.isArray(b[x])?b[x]:[b[x]];for(let R=0,D=P.length;R<D;R++){let W=P[R],O=Array.isArray(W.value)?W.value:[W.value],C=Array.isArray(b[x])||Array.isArray(W.value),k=M;for(let U=0,j=O.length;U<j;U++){let q=O[U],et=_(q,C),Z=M%A,gt=Z%et.boundary,$=Z+gt;M+=gt,$!==0&&A-$<et.storage&&(M+=A-$),U===0&&(k=M),M+=et.storage}let G=W.type==="int"?Int32Array:W.type==="uint"?Uint32Array:Float32Array;W.__data=new G((M-k)/Float32Array.BYTES_PER_ELEMENT),W.__offset=k}}let T=M%A;return T>0&&(M+=A-T),v.__size=M,v.__cache={},this}function _(v,b){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=16,M.storage=48):v.isMatrix4?(M.boundary=16,M.storage=64):v.isTexture?Kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Kt("WebGLRenderer: Unsupported uniform value type.",v),b===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function p(v){let b=v.target;b.removeEventListener("dispose",p),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function g(){for(let v in i)s.deleteBuffer(i[v]);i={},r={}}return{bind:a,update:o,dispose:g}}var zb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),bi=null;function Gb(){return bi===null&&(bi=new Il(zb,16,16,Ms,ii),bi.name="DFG_LUT",bi.minFilter=_n,bi.magFilter=_n,bi.wrapS=_i,bi.wrapT=_i,bi.generateMipmaps=!1,bi.needsUpdate=!0),bi}var Yc=class{constructor(t={}){let{canvas:e=bm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Tn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=u,p=new Set([fc,dc,uc]),g=new Set([Tn,ei,Zr,Qs,cc,hc]),v=new Uint32Array(4),b=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},A=null,T=null,x=[],S=[],P=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,D=!1,W=null,O=null,C=null,k=null;this._outputColorSpace=mn;let G=0,U=0,j=null,q=-1,et=null,Z=new Re,gt=new Re,$=null,L=new ee(0),X=0,Q=e.width,_t=e.height,st=1,Ut=null,Zt=null,Lt=new Re(0,0,Q,_t),qt=new Re(0,0,Q,_t),$t=!1,ct=new gs,V=new Ll,tt=!1,ht=!1,F=new be,nt=new H,mt=new Re,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Dt=!1;function Xt(){return j===null?st:1}let N=n;function fe(w,B){return e.getContext(w,B)}let ot,St,lt,Rt,vt,bt,E,y,z,pt,ut,yt,Mt,J,rt,xt,I,dt,at,Tt,At,Et,Ht;try{let w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Jt,!1),e.addEventListener("webglcontextrestored",ne,!1),e.addEventListener("webglcontextcreationerror",Ft,!1),N===null){let B="webgl2";if(N=fe(B,w),N===null)throw fe(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ie()}catch(w){throw e.removeEventListener("webglcontextlost",Jt,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Ft,!1),jt("WebGLRenderer: "+w.message),w}function ie(){ot=new jM(N),ot.init(),At=new Nb(N,ot),St=new GM(N,ot,t,At),lt=new Lb(N,ot),St.reversedDepthBuffer&&d&&lt.buffers.depth.setReversed(!0),O=N.createFramebuffer(),C=N.createFramebuffer(),k=N.createFramebuffer(),Rt=new eS(N),vt=new xb,bt=new Db(N,ot,lt,vt,St,At,Rt),E=new KM(R),y=new iv(N),Et=new kM(N,y),z=new QM(N,y,Rt,Et),pt=new iS(N,z,y,Et,Rt),dt=new nS(N,St,bt),rt=new VM(vt),ut=new _b(R,E,ot,St,Et,rt),yt=new Bb(R,vt),Mt=new yb,J=new Tb(ot),I=new BM(R,E,lt,pt,m,l),xt=new Ib(R,pt,St),Ht=new kb(N,Rt,St,lt),at=new zM(N,ot,Rt),Tt=new tS(N,ot,Rt),Rt.programs=ut.programs,R.capabilities=St,R.extensions=ot,R.properties=vt,R.renderLists=Mt,R.shadowMap=xt,R.state=lt,R.info=Rt}_!==Tn&&(P=new rS(_,e.width,e.height,o,i,r));let wt=new Td(R,N);this.xr=wt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let w=ot.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ot.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return st},this.setPixelRatio=function(w){w!==void 0&&(st=w,this.setSize(Q,_t,!1))},this.getSize=function(w){return w.set(Q,_t)},this.setSize=function(w,B,it=!0){if(wt.isPresenting){Kt("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=w,_t=B,e.width=Math.floor(w*st),e.height=Math.floor(B*st),it===!0&&(e.style.width=w+"px",e.style.height=B+"px"),P!==null&&P.setSize(e.width,e.height),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(Q*st,_t*st).floor()},this.setDrawingBufferSize=function(w,B,it){Q=w,_t=B,st=it,e.width=Math.floor(w*it),e.height=Math.floor(B*it),this.setViewport(0,0,w,B)},this.setEffects=function(w){if(_===Tn){jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let B=0;B<w.length;B++)if(w[B].isOutputPass===!0){Kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(Z)},this.getViewport=function(w){return w.copy(Lt)},this.setViewport=function(w,B,it,Y){w.isVector4?Lt.set(w.x,w.y,w.z,w.w):Lt.set(w,B,it,Y),lt.viewport(Z.copy(Lt).multiplyScalar(Xt()).round())},this.getScissor=function(w){return w.copy(qt)},this.setScissor=function(w,B,it,Y){w.isVector4?qt.set(w.x,w.y,w.z,w.w):qt.set(w,B,it,Y),lt.scissor(gt.copy(qt).multiplyScalar(Xt()).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(w){lt.setScissorTest($t=w)},this.setOpaqueSort=function(w){Ut=w},this.setTransparentSort=function(w){Zt=w},this.getClearColor=function(w){return w.copy(I.getClearColor())},this.setClearColor=function(){I.setClearColor(...arguments)},this.getClearAlpha=function(){return I.getClearAlpha()},this.setClearAlpha=function(){I.setClearAlpha(...arguments)},this.clear=function(w=!0,B=!0,it=!0){let Y=0;if(w){let K=!1;if(j!==null){let It=j.texture.format;K=p.has(It)}if(K){let It=j.texture.type,zt=g.has(It),Pt=I.getClearColor(),Bt=I.getClearAlpha(),Wt=Pt.r,te=Pt.g,oe=Pt.b;zt?(v[0]=Wt,v[1]=te,v[2]=oe,v[3]=Bt,N.clearBufferuiv(N.COLOR,0,v)):(b[0]=Wt,b[1]=te,b[2]=oe,b[3]=Bt,N.clearBufferiv(N.COLOR,0,b))}else Y|=N.COLOR_BUFFER_BIT}B&&(Y|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),it&&(Y|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&N.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),W=w},this.dispose=function(){e.removeEventListener("webglcontextlost",Jt,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Ft,!1),I.dispose(),Mt.dispose(),J.dispose(),bt.dispose(),vt.dispose(),E.dispose(),pt.dispose(),z.dispose(),Et.dispose(),Ht.dispose(),ut.dispose(),wt.dispose(),wt.removeEventListener("sessionstart",qd),wt.removeEventListener("sessionend",$d),Es.stop()};function Jt(w){w.preventDefault(),rd("WebGLRenderer: Context Lost."),D=!0}function ne(){rd("WebGLRenderer: Context Restored."),D=!1;let w=Rt.autoReset,B=xt.enabled,it=xt.autoUpdate,Y=xt.needsUpdate,K=xt.type;ie(),Rt.autoReset=w,xt.enabled=B,xt.autoUpdate=it,xt.needsUpdate=Y,xt.type=K}function Ft(w){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function xe(w){let B=w.target;B.removeEventListener("dispose",xe),qe(B)}function qe(w){Ki(w),vt.remove(w)}function Ki(w){let B=vt.get(w).programs;B!==void 0&&(B.forEach(function(it){ut.releaseProgram(it)}),w.isShaderMaterial&&ut.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,it,Y,K,It){B===null&&(B=Ct);let zt=K.isMesh&&K.matrixWorld.determinantAffine()<0,Pt=ng(w,B,it,Y,K);lt.setMaterial(Y,zt);let Bt=it.index,Wt=1;if(Y.wireframe===!0){if(Bt=z.getWireframeAttribute(it),Bt===void 0)return;Wt=2}let te=it.drawRange,oe=it.attributes.position,Gt=te.start*Wt,le=(te.start+te.count)*Wt;It!==null&&(Gt=Math.max(Gt,It.start*Wt),le=Math.min(le,(It.start+It.count)*Wt)),Bt!==null?(Gt=Math.max(Gt,0),le=Math.min(le,Bt.count)):oe!=null&&(Gt=Math.max(Gt,0),le=Math.min(le,oe.count));let ze=le-Gt;if(ze<0||ze===1/0)return;Et.setup(K,Y,Pt,it,Bt);let Ae,Me=at;if(Bt!==null&&(Ae=y.get(Bt),Me=Tt,Me.setIndex(Ae)),K.isMesh)Y.wireframe===!0?(lt.setLineWidth(Y.wireframeLinewidth*Xt()),Me.setMode(N.LINES)):Me.setMode(N.TRIANGLES);else if(K.isLine){let en=Y.linewidth;en===void 0&&(en=1),lt.setLineWidth(en*Xt()),K.isLineSegments?Me.setMode(N.LINES):K.isLineLoop?Me.setMode(N.LINE_LOOP):Me.setMode(N.LINE_STRIP)}else K.isPoints?Me.setMode(N.POINTS):K.isSprite&&Me.setMode(N.TRIANGLES);if(K.isBatchedMesh)if(ot.get("WEBGL_multi_draw"))Me.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let en=K._multiDrawStarts,Vt=K._multiDrawCounts,dn=K._multiDrawCount,ge=Bt?y.get(Bt).bytesPerElement:1,Cs=vt.get(Y).currentProgram.getUniforms();for(let nn=0;nn<dn;nn++)Cs.setValue(N,"_gl_DrawID",nn),Me.render(en[nn]/ge,Vt[nn])}else if(K.isInstancedMesh)Me.renderInstances(Gt,ze,K.count);else if(it.isInstancedBufferGeometry){let en=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,Vt=Math.min(it.instanceCount,en);Me.renderInstances(Gt,ze,Vt)}else Me.render(Gt,ze)};function Xd(w,B,it,Y){W!==null&&w.isNodeMaterial&&W.setObject(Y,w),tt===!0&&rt.setState(w,it,!1),w.transparent===!0&&w.side===Mi&&w.forceSinglePass===!1?(w.side=xn,w.needsUpdate=!0,ia(w,B,Y),w.side=ys,w.needsUpdate=!0,ia(w,B,Y),w.side=Mi):ia(w,B,Y)}this.compile=function(w,B,it=null){it===null&&(it=w),W!==null&&W.renderStart(w,B,it),T=J.get(it),T.init(B),S.push(T),it.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),w!==it&&w.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),T.setupLights(),W!==null&&W.updateLights(T.state.lightsArray),ht=this.localClippingEnabled,tt=rt.init(this.clippingPlanes,ht),tt===!0&&rt.setGlobalState(this.clippingPlanes,B),W!==null&&xt.render(T.state.shadowsArray,it,B);let Y=new Set;return w.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let It=K.material;if(It)if(Array.isArray(It))for(let zt=0;zt<It.length;zt++){let Pt=It[zt];Xd(Pt,it,B,K),Y.add(Pt)}else Xd(It,it,B,K),Y.add(It)}),T=S.pop(),W!==null&&W.renderEnd(),Y},this.compileAsync=function(w,B,it=null){let Y=this.compile(w,B,it);return new Promise(K=>{function It(){if(Y.forEach(function(zt){let Bt=vt.get(zt).currentProgram;(Bt===void 0||Bt.isReady())&&Y.delete(zt)}),Y.size===0){K(w);return}setTimeout(It,10)}ot.get("KHR_parallel_shader_compile")!==null?It():setTimeout(It,10)})};let rh=null;function tg(w){rh&&rh(w)}function qd(){Es.stop()}function $d(){Es.start()}let Es=new i0;Es.setAnimationLoop(tg),typeof self<"u"&&Es.setContext(self),this.setAnimationLoop=function(w){rh=w,wt.setAnimationLoop(w),w===null?Es.stop():Es.start()},wt.addEventListener("sessionstart",qd),wt.addEventListener("sessionend",$d),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;W!==null&&W.renderStart(w,B);let it=wt.enabled===!0&&wt.isPresenting===!0,Y=P!==null&&(j===null||it)&&P.begin(R,j);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),wt.enabled===!0&&wt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(wt.cameraAutoUpdate===!0&&wt.updateCamera(B),B=wt.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,B,j),T=J.get(w,S.length),T.init(B),T.state.textureUnits=bt.getTextureUnits(),S.push(T),F.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?V.setFromArrayCamera(B):ct.setFromProjectionMatrix(F,Xn,B.reversedDepth),ht=this.localClippingEnabled,tt=rt.init(this.clippingPlanes,ht),A=Mt.get(w,x.length),A.init(),x.push(A),this.info.render.frame++,wt.enabled===!0&&wt.isPresenting===!0){let zt=R.xr.getDepthSensingMesh();zt!==null&&ah(zt,B,-1/0,R.sortObjects)}ah(w,B,0,R.sortObjects),A.finish(),W!==null&&W.updateLights(T.state.lightsArray),R.sortObjects===!0&&A.sort(Ut,Zt),Dt=wt.enabled===!1||wt.isPresenting===!1||wt.hasDepthSensing()===!1,Dt&&I.addToRenderList(A,w),this.info.autoReset===!0&&this.info.reset(),tt===!0&&rt.beginShadows();let K=T.state.shadowsArray;if(xt.render(K,w,B),tt===!0&&rt.endShadows(),(Y&&P.hasRenderPass())===!1){let zt=A.opaque,Pt=A.transmissive;if(T.setupLights(),B.isArrayCamera){let Bt=B.cameras;if(Pt.length>0)for(let Wt=0,te=Bt.length;Wt<te;Wt++){let oe=Bt[Wt];Zd(zt,Pt,w,oe)}Dt&&I.render(w);for(let Wt=0,te=Bt.length;Wt<te;Wt++){let oe=Bt[Wt];Yd(A,w,oe,oe.viewport)}}else Pt.length>0&&Zd(zt,Pt,w,B),Dt&&I.render(w),Yd(A,w,B)}j!==null&&U===0&&(bt.updateMultisampleRenderTarget(j),bt.updateRenderTargetMipmap(j)),Y&&P.end(R),w.isScene===!0&&w.onAfterRender(R,w,B),Et.resetDefaultState(),q=-1,et=null,S.pop(),S.length>0?(T=S[S.length-1],bt.setTextureUnits(T.state.textureUnits),tt===!0&&rt.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,W!==null&&W.renderEnd()};function ah(w,B,it,Y){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)it=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){let zt=B.isArrayCamera?V:ct;if(!w.frustumCulled||w.intersectsFrustum(zt)){Y&&mt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(F);let Pt=pt.update(w),Bt=w.material;Bt.visible&&A.push(w,Pt,Bt,it,mt.z,null,B)}}else if(w.isMesh||w.isLine||w.isPoints){let zt=B.isArrayCamera?V:ct;if(!w.frustumCulled||w.intersectsFrustum(zt)){let Pt=pt.update(w),Bt=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),mt.copy(w.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),mt.copy(Pt.boundingSphere.center)),mt.applyMatrix4(w.matrixWorld).applyMatrix4(F)),Array.isArray(Bt)){let Wt=Pt.groups;for(let te=0,oe=Wt.length;te<oe;te++){let Gt=Wt[te],le=Bt[Gt.materialIndex];le&&le.visible&&A.push(w,Pt,le,it,mt.z,Gt,B)}}else Bt.visible&&A.push(w,Pt,Bt,it,mt.z,null,B)}}}let It=w.children;for(let zt=0,Pt=It.length;zt<Pt;zt++)ah(It[zt],B,it,Y)}function Yd(w,B,it,Y){let{opaque:K,transmissive:It,transparent:zt}=w;T.setupLightsView(it),tt===!0&&rt.setGlobalState(R.clippingPlanes,it),Y&&lt.viewport(Z.copy(Y)),K.length>0&&Mo(K,B,it),It.length>0&&Mo(It,B,it),zt.length>0&&Mo(zt,B,it),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function Zd(w,B,it,Y){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[Y.id]===void 0){let Gt=ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[Y.id]=new Nn(1,1,{generateMipmaps:!0,type:Gt?ii:Tn,minFilter:qi,samples:Math.max(4,St.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let It=T.state.transmissionRenderTarget[Y.id],zt=Y.viewport||Z;It.setSize(zt.z*R.transmissionResolutionScale,zt.w*R.transmissionResolutionScale);let Pt=R.getRenderTarget(),Bt=R.getActiveCubeFace(),Wt=R.getActiveMipmapLevel();R.setRenderTarget(It),R.getClearColor(L),X=R.getClearAlpha(),X<1&&R.setClearColor(16777215,.5),R.clear(),Dt&&I.render(it);let te=R.toneMapping;R.toneMapping=Si;let oe=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),T.setupLightsView(Y),tt===!0&&rt.setGlobalState(R.clippingPlanes,Y),Mo(w,it,Y),bt.updateMultisampleRenderTarget(It),bt.updateRenderTargetMipmap(It),ot.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let le=0,ze=B.length;le<ze;le++){let Ae=B[le],{object:Me,geometry:en,material:Vt,group:dn}=Ae;if(Vt.side===Mi&&Me.layers.test(Y.layers)){let ge=Vt.side;Vt.side=xn,Vt.needsUpdate=!0,Jd(Me,it,Y,en,Vt,dn),Vt.side=ge,Vt.needsUpdate=!0,Gt=!0}}Gt===!0&&(bt.updateMultisampleRenderTarget(It),bt.updateRenderTargetMipmap(It))}R.setRenderTarget(Pt,Bt,Wt),R.setClearColor(L,X),oe!==void 0&&(Y.viewport=oe),R.toneMapping=te}function Mo(w,B,it){let Y=B.isScene===!0?B.overrideMaterial:null;for(let K=0,It=w.length;K<It;K++){let zt=w[K],{object:Pt,geometry:Bt,group:Wt}=zt,te=zt.material;te.allowOverride===!0&&Y!==null&&(te=Y),Pt.layers.test(it.layers)&&Jd(Pt,B,it,Bt,te,Wt)}}function Jd(w,B,it,Y,K,It){W!==null&&K.isNodeMaterial&&W.setObject(w,K),w.onBeforeRender(R,B,it,Y,K,It),w.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),K.onBeforeRender(R,B,it,Y,w,It),K.transparent===!0&&K.side===Mi&&K.forceSinglePass===!1?(K.side=xn,K.needsUpdate=!0,R.renderBufferDirect(it,B,Y,K,w,It),K.side=ys,K.needsUpdate=!0,R.renderBufferDirect(it,B,Y,K,w,It),K.side=Mi):R.renderBufferDirect(it,B,Y,K,w,It),w.onAfterRender(R,B,it,Y,K,It)}function Kd(w){let B=0;for(let it of w)it.texture!==null&&B++;return B}function ia(w,B,it){B.isScene!==!0&&(B=Ct);let Y=vt.get(w),K=T.state.lights,It=T.state.shadowsArray,zt=K.state.version,Pt=ut.getParameters(w,K.state,It,B,it,T.state.lightProbeGridArray),Bt=ut.getProgramCacheKey(Pt),Wt=Y.programs;Y.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?B.environment:null,Y.fog=B.fog;let te=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;Y.envMap=E.get(w.envMap||Y.environment,te),Y.envMapRotation=Y.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,Wt===void 0&&(w.addEventListener("dispose",xe),Wt=new Map,Y.programs=Wt,Y.programVariants=new Map);let oe=Wt.get(Bt);if(oe!==void 0){if(Y.currentProgram===oe&&Y.lightsStateVersion===zt)return Qd(w,Pt),oe}else Pt.uniforms=ut.getUniforms(w),W!==null&&w.isNodeMaterial&&W.build(w,it,Pt),w.onBeforeCompile(Pt,R),oe=ut.acquireProgram(Pt,Bt),Wt.set(Bt,oe),Y.uniforms=Pt.uniforms;let Gt=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Gt.clippingPlanes=rt.uniform),Qd(w,Pt),Y.needsLights=sg(w),Y.lightsStateVersion=zt,Y.needsLights&&(Gt.ambientLightColor.value=K.state.ambient,Gt.lightProbe.value=K.state.probe,Gt.sunLights.value=K.state.sun,Gt.sunLightShadows.value=K.state.sunShadow,Gt.directionalLights.value=K.state.directional,Gt.directionalLightShadows.value=K.state.directionalShadow,Gt.spotLights.value=K.state.spot,Gt.spotLightShadows.value=K.state.spotShadow,Gt.rectAreaLights.value=K.state.rectArea,Gt.ltc_1.value=K.state.rectAreaLTC1,Gt.ltc_2.value=K.state.rectAreaLTC2,Gt.pointLights.value=K.state.point,Gt.pointLightShadows.value=K.state.pointShadow,Gt.hemisphereLights.value=K.state.hemi,Gt.sunShadowMatrix.value=K.state.sunShadowMatrix,Gt.sunShadowCascade.value=K.state.sunShadowCascade,Gt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Gt.spotLightMatrix.value=K.state.spotLightMatrix,Gt.spotLightMap.value=K.state.spotLightMap,Gt.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.numLightProbeGrids=Kd(T.state.lightProbeGridArray),Y.currentProgram=oe,Y.uniformsList=null,oe}function eg(w,B,it,Y,K){let It=vt.get(w),zt=It.currentProgram.id+","+Y+","+K,Pt=It.programVariants.get(zt);return Pt===void 0?(Pt=ia(w,B,it),It.programVariants.set(zt,Pt)):(It.currentProgram=Pt,It.uniformsList=null,It.outputColorSpace=Y,It.toneMapping=K),Pt}function jd(w){if(w.uniformsList===null){let B=w.currentProgram.getUniforms();w.uniformsList=Kr.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function Qd(w,B){let it=vt.get(w);it.outputColorSpace=B.outputColorSpace,it.batching=B.batching,it.batchingColor=B.batchingColor,it.instancing=B.instancing,it.instancingColor=B.instancingColor,it.instancingMorph=B.instancingMorph,it.skinning=B.skinning,it.morphTargets=B.morphTargets,it.morphNormals=B.morphNormals,it.morphColors=B.morphColors,it.morphTargetsCount=B.morphTargetsCount,it.numClippingPlanes=B.numClippingPlanes,it.numIntersection=B.numClipIntersection,it.vertexAlphas=B.vertexAlphas,it.vertexTangents=B.vertexTangents,it.toneMapping=B.toneMapping}function ng(w,B,it,Y,K){B.isScene!==!0&&(B=Ct),bt.resetTextureUnits();let It=B.fog,zt=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?B.environment:null,Pt=j===null?R.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ce.workingColorSpace,Bt=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,Wt=E.get(Y.envMap||zt,Bt),te=Y.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,oe=!!it.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Gt=!!it.morphAttributes.position,le=!!it.morphAttributes.normal,ze=!!it.morphAttributes.color,Ae=Si;Y.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ae=R.toneMapping);let Me=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,en=Me!==void 0?Me.length:0,Vt=vt.get(Y),dn=T.state.lights;if(tt===!0&&(ht===!0||w!==et)){let Ie=w===et&&Y.id===q;rt.setState(Y,w,Ie)}let ge=!1,Cs=!1;Y.version===Vt.__version?Vt.needsLights&&Vt.lightsStateVersion!==dn.state.version||K.isBatchedMesh&&Vt.batching===!1||!K.isBatchedMesh&&Vt.batching===!0||K.isBatchedMesh&&Vt.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Vt.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Vt.instancing===!1||!K.isInstancedMesh&&Vt.instancing===!0||K.isSkinnedMesh&&Vt.skinning===!1||!K.isSkinnedMesh&&Vt.skinning===!0||K.isInstancedMesh&&Vt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Vt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Vt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Vt.instancingMorph===!1&&K.morphTexture!==null||Vt.envMap!==Wt||Y.fog===!0&&Vt.fog!==It||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==rt.numPlanes||Vt.numIntersection!==rt.numIntersection)||Vt.vertexAlphas!==te||Vt.vertexTangents!==oe||Vt.morphTargets!==Gt||Vt.morphNormals!==le||Vt.morphColors!==ze||Vt.morphTargetsCount!==en||Vt.numLightProbeGrids!==Kd(T.state.lightProbeGridArray)?ge=!0:(Vt.outputColorSpace!==Pt||Vt.toneMapping!==Ae)&&(Cs=!0):(ge=!0,Vt.__version=Y.version);let nn=Vt.currentProgram;(ge===!0||Cs===!0)&&(nn=Cs===!0?eg(Y,B,K,Pt,Ae):ia(Y,B,K),W&&Y.isNodeMaterial&&W.onUpdateProgram(Y,nn,Vt));let So=!1,ji=!1,Rs=!1,pe=nn.getUniforms(),Ke=Vt.uniforms;if(lt.useProgram(nn.program)&&(So=!0,ji=!0,Rs=!0),Y.id!==q&&(q=Y.id,ji=!0),So||et!==w){lt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),pe.setValue(N,"projectionMatrix",w.projectionMatrix),pe.setValue(N,"viewMatrix",w.matrixWorldInverse);let $e=pe.map.cameraPosition;$e!==void 0&&$e.setValue(N,nt.setFromMatrixPosition(w.matrixWorld)),St.logarithmicDepthBuffer&&pe.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&pe.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),et!==w&&(et=w,ji=!0,Rs=!0)}if(Vt.needsLights&&(dn.state.sunShadowMap.length>0&&pe.setValue(N,"sunShadowMap",dn.state.sunShadowMap,bt),dn.state.directionalShadowMap.length>0&&pe.setValue(N,"directionalShadowMap",dn.state.directionalShadowMap,bt),dn.state.spotShadowMap.length>0&&pe.setValue(N,"spotShadowMap",dn.state.spotShadowMap,bt),dn.state.pointShadowMap.length>0&&pe.setValue(N,"pointShadowMap",dn.state.pointShadowMap,bt)),K.isSkinnedMesh){pe.setOptional(N,K,"bindMatrix"),pe.setOptional(N,K,"bindMatrixInverse");let Ie=K.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),pe.setValue(N,"boneTexture",Ie.boneTexture,bt))}K.isBatchedMesh&&(pe.setOptional(N,K,"batchingTexture"),pe.setValue(N,"batchingTexture",K._matricesTexture,bt),pe.setOptional(N,K,"batchingIdTexture"),pe.setValue(N,"batchingIdTexture",K._indirectTexture,bt),pe.setOptional(N,K,"batchingColorTexture"),K._colorsTexture!==null&&pe.setValue(N,"batchingColorTexture",K._colorsTexture,bt));let Yn=it.morphAttributes;if((Yn.position!==void 0||Yn.normal!==void 0||Yn.color!==void 0)&&dt.update(K,it,nn),(ji||Vt.receiveShadow!==K.receiveShadow)&&(Vt.receiveShadow=K.receiveShadow,pe.setValue(N,"receiveShadow",K.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&B.environment!==null&&(Ke.envMapIntensity.value=B.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=Gb()),ji){if(pe.setValue(N,"toneMappingExposure",R.toneMappingExposure),Vt.needsLights&&ig(Ke,Rs),It&&Y.fog===!0&&yt.refreshFogUniforms(Ke,It),yt.refreshMaterialUniforms(Ke,Y,st,_t,T.state.transmissionRenderTarget[w.id]),Vt.needsLights&&Vt.numLightProbeGrids>0){let Ie=M,$e=0;for(let Pi of T.state.lightProbeGridArray)Pi.texture!==null&&(Ie.textures[$e]=Pi.texture,Ie.min[$e]=Pi.boundingBox.min,Ie.max[$e]=Pi.boundingBox.max,Ie.resolution[$e]=Pi.resolution,$e++);for(let Pi in Ie)Ie[Pi].length=$e;Ke.probesSH.value=Ie.textures,Ke.probesMin.value=Ie.min,Ke.probesMax.value=Ie.max,Ke.probesResolution.value=Ie.resolution}Kr.upload(N,jd(Vt),Ke,bt)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Kr.upload(N,jd(Vt),Ke,bt),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&pe.setValue(N,"center",K.center),pe.setValue(N,"modelViewMatrix",K.modelViewMatrix),pe.setValue(N,"normalMatrix",K.normalMatrix),pe.setValue(N,"modelMatrix",K.matrixWorld),Y.uniformsGroups!==void 0){let Ie=Y.uniformsGroups;for(let $e=0,Pi=Ie.length;$e<Pi;$e++){let ef=Ie[$e];Ht.update(ef,nn),Ht.bind(ef,nn)}}return nn}function ig(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.sunLights.needsUpdate=B,w.sunLightShadows.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function sg(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(w,B,it){let Y=vt.get(w);Y.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),vt.get(w.texture).__webglTexture=B,vt.get(w.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:it,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,B){let it=vt.get(w);it.__webglFramebuffer=B,it.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(w,B=0,it=0){j=w,G=B,U=it;let Y=null,K=!1,It=!1;if(w){let Pt=vt.get(w);if(Pt.__useDefaultFramebuffer!==void 0){lt.bindFramebuffer(N.FRAMEBUFFER,Pt.__webglFramebuffer),Z.copy(w.viewport),gt.copy(w.scissor),$=w.scissorTest,lt.viewport(Z),lt.scissor(gt),lt.setScissorTest($),q=-1;return}else if(Pt.__webglFramebuffer===void 0)bt.setupRenderTarget(w);else if(Pt.__hasExternalTextures)bt.rebindTextures(w,vt.get(w.texture).__webglTexture,vt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let te=w.depthTexture;if(Pt.__boundDepthTexture!==te){if(te!==null&&vt.has(te)&&(w.width!==te.image.width||w.height!==te.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");bt.setupDepthRenderbuffer(w)}}let Bt=w.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(It=!0);let Wt=vt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Wt[B])?Y=Wt[B][it]:Y=Wt[B],K=!0):w.samples>0&&bt.useMultisampledRTT(w)===!1?Y=vt.get(w).__webglMultisampledFramebuffer:Array.isArray(Wt)?Y=Wt[it]:Y=Wt,Z.copy(w.viewport),gt.copy(w.scissor),$=w.scissorTest}else Z.copy(Lt).multiplyScalar(st).floor(),gt.copy(qt).multiplyScalar(st).floor(),$=$t;if(it!==0&&(Y=O),lt.bindFramebuffer(N.FRAMEBUFFER,Y)&&lt.drawBuffers(w,Y),lt.viewport(Z),lt.scissor(gt),lt.setScissorTest($),K){let Pt=vt.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,Pt.__webglTexture,it)}else if(It){let Pt=B;for(let Bt=0;Bt<w.textures.length;Bt++){let Wt=vt.get(w.textures[Bt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Bt,Wt.__webglTexture,it,Pt)}}else if(w!==null&&it!==0){let Pt=vt.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Pt.__webglTexture,it)}q=-1};function tf(w){let B=vt.get(w);return(B.__readFormat!==w.format||B.__readType!==w.type)&&(B.__readFormat=w.format,B.__readType=w.type,B.__formatReadable=St.textureFormatReadable(w.format),B.__typeReadable=St.textureTypeReadable(w.type)),B}this.readRenderTargetPixels=function(w,B,it,Y,K,It,zt,Pt=0){if(!(w&&w.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&zt!==void 0&&(Bt=Bt[zt],Array.isArray(Bt)&&(Bt=Bt[0])),Bt){lt.bindFramebuffer(N.FRAMEBUFFER,Bt);try{let Wt=w.textures[Pt],te=Wt.format,oe=Wt.type;w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Pt);let Gt=tf(Wt);if(Gt.__formatReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Gt.__typeReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-Y&&it>=0&&it<=w.height-K&&N.readPixels(B,it,Y,K,At.convert(te),At.convert(oe),It)}finally{let Wt=j!==null?vt.get(j).__webglFramebuffer:null;lt.bindFramebuffer(N.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(w,B,it,Y,K,It,zt,Pt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&zt!==void 0&&(Bt=Bt[zt],Array.isArray(Bt)&&(Bt=Bt[0])),Bt)if(B>=0&&B<=w.width-Y&&it>=0&&it<=w.height-K){lt.bindFramebuffer(N.FRAMEBUFFER,Bt);let Wt=w.textures[Pt],te=Wt.format,oe=Wt.type;w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Pt);let Gt=tf(Wt);if(Gt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Gt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,le),N.bufferData(N.PIXEL_PACK_BUFFER,It.byteLength,N.STREAM_READ),N.readPixels(B,it,Y,K,At.convert(te),At.convert(oe),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let ze=j!==null?vt.get(j).__webglFramebuffer:null;lt.bindFramebuffer(N.FRAMEBUFFER,ze);let Ae=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Am(N,Ae,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,le),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,It),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(le),N.deleteSync(Ae),It}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,B=null,it=0){let Y=Math.pow(2,-it),K=Math.floor(w.image.width*Y),It=Math.floor(w.image.height*Y),zt=B!==null?B.x:0,Pt=B!==null?B.y:0;bt.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,it,0,0,zt,Pt,K,It),lt.unbindTexture()},this.copyTextureToTexture=function(w,B,it=null,Y=null,K=0,It=0){let zt,Pt,Bt,Wt,te,oe,Gt,le,ze,Ae=w.isCompressedTexture?w.mipmaps[It]:w.image;if(it!==null)zt=it.max.x-it.min.x,Pt=it.max.y-it.min.y,Bt=it.isBox3?it.max.z-it.min.z:1,Wt=it.min.x,te=it.min.y,oe=it.isBox3?it.min.z:0;else{let pe=Math.pow(2,-K);zt=Math.floor(Ae.width*pe),Pt=Math.floor(Ae.height*pe),w.isDataArrayTexture?Bt=Ae.depth:w.isData3DTexture?Bt=Math.floor(Ae.depth*pe):Bt=1,Wt=0,te=0,oe=0}Y!==null?(Gt=Y.x,le=Y.y,ze=Y.z):(Gt=0,le=0,ze=0);let Me=At.convert(B.format),en=At.convert(B.type),Vt;B.isData3DTexture?(bt.setTexture3D(B,0),Vt=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(bt.setTexture2DArray(B,0),Vt=N.TEXTURE_2D_ARRAY):(bt.setTexture2D(B,0),Vt=N.TEXTURE_2D),lt.activeTexture(N.TEXTURE0),lt.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),lt.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),lt.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);let dn=lt.getParameter(N.UNPACK_ROW_LENGTH),ge=lt.getParameter(N.UNPACK_IMAGE_HEIGHT),Cs=lt.getParameter(N.UNPACK_SKIP_PIXELS),nn=lt.getParameter(N.UNPACK_SKIP_ROWS),So=lt.getParameter(N.UNPACK_SKIP_IMAGES);lt.pixelStorei(N.UNPACK_ROW_LENGTH,Ae.width),lt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ae.height),lt.pixelStorei(N.UNPACK_SKIP_PIXELS,Wt),lt.pixelStorei(N.UNPACK_SKIP_ROWS,te),lt.pixelStorei(N.UNPACK_SKIP_IMAGES,oe);let ji=w.isDataArrayTexture||w.isData3DTexture,Rs=B.isDataArrayTexture||B.isData3DTexture;if(w.isDepthTexture){let pe=vt.get(w),Ke=vt.get(B),Yn=vt.get(pe.__renderTarget),Ie=vt.get(Ke.__renderTarget);lt.bindFramebuffer(N.READ_FRAMEBUFFER,Yn.__webglFramebuffer),lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let $e=0;$e<Bt;$e++)ji&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,vt.get(w).__webglTexture,K,oe+$e),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,vt.get(B).__webglTexture,It,ze+$e)),N.blitFramebuffer(Wt,te,Wt+zt,te+Pt,Gt,le,Gt+zt,le+Pt,N.DEPTH_BUFFER_BIT,N.NEAREST);lt.bindFramebuffer(N.READ_FRAMEBUFFER,null),lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(K!==0||w.isRenderTargetTexture||vt.has(w)){let pe=vt.get(w),Ke=vt.get(B);lt.bindFramebuffer(N.READ_FRAMEBUFFER,C),lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,k);for(let Yn=0;Yn<Bt;Yn++)ji?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,pe.__webglTexture,K,oe+Yn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pe.__webglTexture,K),Rs?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ke.__webglTexture,It,ze+Yn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ke.__webglTexture,It),K!==0?N.blitFramebuffer(Wt,te,Wt+zt,te+Pt,Gt,le,Gt+zt,le+Pt,N.COLOR_BUFFER_BIT,N.NEAREST):Rs?N.copyTexSubImage3D(Vt,It,Gt,le,ze+Yn,Wt,te,zt,Pt):N.copyTexSubImage2D(Vt,It,Gt,le,Wt,te,zt,Pt);lt.bindFramebuffer(N.READ_FRAMEBUFFER,null),lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Rs?w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Vt,It,Gt,le,ze,zt,Pt,Bt,Me,en,Ae.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(Vt,It,Gt,le,ze,zt,Pt,Bt,Me,Ae.data):N.texSubImage3D(Vt,It,Gt,le,ze,zt,Pt,Bt,Me,en,Ae):w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,It,Gt,le,zt,Pt,Me,en,Ae.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,It,Gt,le,Ae.width,Ae.height,Me,Ae.data):N.texSubImage2D(N.TEXTURE_2D,It,Gt,le,zt,Pt,Me,en,Ae);lt.pixelStorei(N.UNPACK_ROW_LENGTH,dn),lt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ge),lt.pixelStorei(N.UNPACK_SKIP_PIXELS,Cs),lt.pixelStorei(N.UNPACK_SKIP_ROWS,nn),lt.pixelStorei(N.UNPACK_SKIP_IMAGES,So),It===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&N.generateMipmap(Vt),lt.unbindTexture()},this.initRenderTarget=function(w){vt.get(w).__webglFramebuffer===void 0&&bt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?bt.setTextureCube(w,0):w.isData3DTexture?bt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?bt.setTexture2DArray(w,0):bt.setTexture2D(w,0),lt.unbindTexture()},this.resetState=function(){G=0,U=0,j=null,lt.reset(),Et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}};var ri={ink:"#07090d",bg:"#14161b",text:"#eef0f3",muted:"#9aa1ad",amber:"#f5a524",gold:"#ffcf7a",field:"#5fb37c",sky:"#5fb3ff",blue:"#4ea1ff",coral:"#ff6b5e",origin:"#ffd28a",dest:"#9fd1ff",melonO:"#5fd07a",melonD:"#ff5a6e"},Cd=[["#f5a524","#3f9b6a"],["#f5a524","#ffcf7a"],["#d99a4a","#4a78c8"],["#3f9b6a","#4f9fe8"],["#e9b85a","#3d7fd9"],["#5fb37c","#e0b04a"],["#d99a4a","#4f9fe8"],["#2f9fb0","#5f6ee8"],["#f5a524","#c0603a"],["#7cc98f","#3f8fd0"],["#5fb37c","#3cc0b0"],["#5fb3ff","#3f9b6a"],["#8f9dff","#7cc98f"],["#ff8a6b","#c58a3a"],["#c58a3a","#3f9b8a"],["#f5a524","#8a6a3a"],["#f5a524","#5fb37c"]],mo=["#3b2a12","#8a5a17","#d98e1f","#f5a524","#ffd98a"],Zi={lo:"#4ea1ff",mid:"#3a404c",hi:"#f5a524",na:"#2f343e"},Qr=["#14301f","#1f5a3a","#3f9b6a","#7cc98f","#d4f2a8"],Kc=["#1a2c52","#24539a","#2f7fd6","#3fb0e6","#7fe0f0"],jc=["#6b4a2e","#a8582a","#e07a3a","#ff9a5a","#ffd9b0"],p0=["#2b4a8f","#2f86c9","#2fb3a8","#9cc56a","#f5a524"],Ss=s=>{let t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},Ed=s=>(s/=255,s<=.04045?s/12.92:((s+.055)/1.055)**2.4),Vb=s=>255*(s<=.0031308?s*12.92:1.055*s**(1/2.4)-.055);function Hb(s,t,e){let n=Ss(s),i=Ss(t);return n.map((r,a)=>Math.round(Vb(Ed(r)+(Ed(i[a])-Ed(r))*e)))}function Bn(s,t){t=Math.min(1,Math.max(0,t))*(s.length-1);let e=Math.min(s.length-2,Math.floor(t));return Hb(s[e],s[e+1],t-e)}var Ee=([s,t,e],n=1)=>n===1?`rgb(${s},${t},${e})`:`rgba(${s},${t},${e},${n})`;var hn=1920,Ji=1080,Wb=10,Ai=.06,Xb=1.2,$n=s=>new ee(Array.isArray(s)?`rgb(${s.join(",")})`:s),Rd=s=>s<=0?0:s>=1?1:s*s*(3-2*s);function qb(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function Pd(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function $b(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}var Yb=`
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
}`,Zb=`
uniform float uAlpha; varying vec3 vColor; varying float vA;
void main(){
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r); a *= a;
  gl_FragColor = vec4(vColor, a * vA * uAlpha);
  #include <colorspace_fragment>
}`;function m0(s,t){let e=new Yc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.setClearColor(0,0),e.toneMapping=no,e.toneMappingExposure=1,e.outputColorSpace=mn,e.shadowMap.enabled=!0,e.shadowMap.type=Zs;let n=new Na,i=new gn(30,hn/Ji,1,200),r=Wb/t.Q,a=(F,nt)=>[F*r,nt*r];n.add(new Ka(14674175,1709064,.9)),n.add(new to(16777215,.18));let o=new Wr(16773596,2.6);o.position.set(-7,-11,17),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:50}),o.shadow.bias=-4e-4,n.add(o);let l=new Wr(9419519,.9);l.position.set(9,12,6),n.add(l);let c=new Un(new Ys(60,60),new Za({opacity:.42,transparent:!0}));c.receiveShadow=!0,n.add(c);let h=Math.max(...Object.values(t.land.v).filter(Boolean)),f={cap:$n("#1f242d"),side:$n("#14171d")},d=Math.max(...Object.values(t.spots.dev)),u=Object.values(t.jikbul.v).sort((F,nt)=>F-nt),m=F=>{let nt=0,mt=u.length-1;for(;nt<mt;){let Ct=nt+mt>>1;u[Ct]<F?nt=Ct+1:mt=Ct}return .08+.92*(nt/(u.length-1))},_=new Gi;n.add(_);let p=t.map.sigun.map(F=>{let nt=F.rings.map(([yt,...Mt])=>{let J=xt=>xt.slice(0,-1).map(([dt,at])=>new Nt(...a(dt,at))),rt=new zr(J(yt));return Mt.forEach(xt=>rt.holes.push(new qs(J(xt)))),rt}),mt=new Ya(nt,{depth:1,bevelEnabled:!1,curveSegments:1}),Ct=t.land.v[F.key],Dt=Ct?Math.sqrt(Ct/h):0,Xt=$n(Ct?Bn(mo,.12+.88*Dt):"#2a2620"),N=t.rice.dev[F.key],fe=N==null?$n(Zi.na):$n(Zi.mid).lerp($n(N<0?Zi.lo:Zi.hi),Math.min(1,Math.abs(N)/.05)**.8),ot=t.jikbul.v[F.key],St=$n(ot==null?"#262c28":Bn(Qr,m(ot))),lt=t.spots.dev[F.key]||0,Rt=$n(lt?Bn(Kc,.1+.9*(lt/d)**1.3):"#1d2430"),vt=Ai+1.9*(lt/d)**1.8,bt=new Vr({roughness:.58,metalness:.04,transparent:!0}),E=new Vr({roughness:.75,metalness:0,transparent:!0}),y=new Un(mt,[bt,E]);y.castShadow=y.receiveShadow=!0,y.scale.z=Ai,_.add(y);let[z,pt]=a(...F.c),ut=Math.min(1,Math.max(0,(z+4)/9*.45+(pt+5)/10*.55));return{key:F.key,mesh:y,cap:bt,side:E,h:Ai+(Xb-Ai)*Dt,landCol:Xt,riceCol:fe,jikCol:St,devCol:Rt,h2:vt,cx:z,cy:pt,delay:ut,land:Ct,rings:F.rings}}),g=new Map(p.map(F=>[F.key,F])),v=(F,nt)=>{let mt=[];F.forEach(Dt=>{for(let Xt=1;Xt<Dt.length;Xt++)mt.push(...a(...Dt[Xt-1]),nt,...a(...Dt[Xt]),nt)});let Ct=new An;return Ct.setAttribute("position",new Fe(mt,3)),Ct},b=new Xs({color:$n("#cfd6e2"),transparent:!0,opacity:0,depthWrite:!1}),M=new Xs({color:$n("#8d96a6"),transparent:!0,opacity:0,depthWrite:!1}),A=new Or(v(t.map.lineSido,0),b),T=new Or(v(t.map.lineSigun,0),M);A.renderOrder=T.renderOrder=2,_.add(A,T);let x=9e3,S=2400,P=$b(20261110),R=[],D=[],W=[],O=[],C=[],k=p.map(F=>(F.land||0)/Math.max(1e-6,F.rings.reduce((nt,mt)=>nt+Pd(mt[0]),0))),G=[...k].sort((F,nt)=>F-nt),U=F=>G.indexOf(F)/(G.length-1),j=p.map(F=>F.rings.reduce((nt,mt)=>nt+Pd(mt[0]),0)**.85),q=j.reduce((F,nt)=>F+nt,0),et=(F,nt,mt)=>{R.push(F,nt,.08);let Ct=9+P()*16,Dt=P()*Math.PI*2,Xt=(P()-.5)*Math.PI*.7;D.push(Ct*Math.cos(Dt)*Math.cos(Xt)*1.4,Ct*Math.sin(Dt)*Math.cos(Xt),4+Ct*Math.sin(Xt)*.6);let N=Math.hypot(F,nt)/6;W.push(Math.min(1,P()*.65+N*.35)),O.push(P()),C.push(mt.r,mt.g,mt.b)};p.forEach((F,nt)=>{let mt=Math.max(6,Math.round((x-S)*j[nt]/q)),Ct=$n(Bn(mo,.35+.65*U(k[nt]))),Dt=F.rings.map(fe=>fe[0]),Xt=Dt.map(Pd),N=Xt.reduce((fe,ot)=>fe+ot,0);for(let fe=0;fe<mt;fe++){let ot=P()*N,St=0;for(;ot>Xt[St]&&St<Dt.length-1;)ot-=Xt[St++];let lt=Dt[St],Rt=1/0,vt=-1/0,bt=1/0,E=-1/0;lt.forEach(([y,z])=>{Rt=Math.min(Rt,y),vt=Math.max(vt,y),bt=Math.min(bt,z),E=Math.max(E,z)});for(let y=0;y<40;y++){let z=Rt+P()*(vt-Rt),pt=bt+P()*(E-bt);if(qb(z,pt,lt)){et(...a(z,pt),Ct);break}}}});let Z=$n("#ffe9c2"),gt=t.map.lineSido,$=gt.map(F=>F.reduce((nt,mt,Ct)=>Ct?nt+Math.hypot(mt[0]-F[Ct-1][0],mt[1]-F[Ct-1][1]):0,0)),L=$.reduce((F,nt)=>F+nt,0);for(let F=0;F<S;F++){let nt=P()*L,mt=0;for(;nt>$[mt]&&mt<gt.length-1;)nt-=$[mt++];let Ct=gt[mt];for(let Dt=1;Dt<Ct.length;Dt++){let Xt=Math.hypot(Ct[Dt][0]-Ct[Dt-1][0],Ct[Dt][1]-Ct[Dt-1][1]);if(nt<=Xt||Dt===Ct.length-1){let N=Xt?Math.min(1,nt/Xt):0;et(...a(Ct[Dt-1][0]+(Ct[Dt][0]-Ct[Dt-1][0])*N,Ct[Dt-1][1]+(Ct[Dt][1]-Ct[Dt-1][1])*N),Z);break}nt-=Xt}}let X=new An;X.setAttribute("position",new Fe(R,3)),X.setAttribute("aStart",new Fe(D,3)),X.setAttribute("aDelay",new Fe(W,1)),X.setAttribute("aSeed",new Fe(O,1)),X.setAttribute("aColor",new Fe(C,3));let Q=new qn({vertexShader:Yb,fragmentShader:Zb,transparent:!0,depthWrite:!1,blending:eo,uniforms:{uMorph:{value:0},uTime:{value:0},uSize:{value:92},uScale:{value:1},uAlpha:{value:1}}}),_t=new Oa(X,Q);_t.frustumCulled=!1,_t.renderOrder=3,n.add(_t);let st=new ee,Ut=new ee,Zt=new H,Lt=hn,qt=Ji;function $t(F,nt){Lt=F,qt=nt,e.setSize(F,nt,!1),Q.uniforms.uScale.value=nt/Ji}function ct(F,nt){let mt=F.tilt*.86,Ct=F.orbit,Dt=F.camDist,Xt=F.camX,N=-.4*F.tilt+F.camY;i.position.set(Xt+Dt*Math.sin(mt)*Math.sin(Ct),N-Dt*Math.sin(mt)*Math.cos(Ct),Dt*Math.cos(mt)),i.up.set(0,1,0),i.lookAt(Xt,N,0),i.setViewOffset(hn,Ji,-F.mapShift,-F.mapLift,hn,Ji),i.updateMatrixWorld();let fe=F.mapAlpha>.001;_.visible=fe,p.forEach(St=>{let lt=Rd((F.rise-St.delay*.5)/.5),Rt=F.devRise>0?Rd((F.devRise-(1-St.delay)*.5)/.5):0;St.mesh.scale.z=Ai+(St.h-Ai)*lt+(St.h2-Ai)*Rt,st.lerpColors(St.landCol,St.riceCol,F.riceColor).lerp(St.jikCol,F.jikColor).lerp(St.devCol,F.devColor).lerp(f.cap,F.mapDim),St.cap.color.copy(st),St.cap.emissive.copy(st).multiplyScalar(.16*(1-Math.min(1,F.mapDim))),Ut.copy(st).multiplyScalar(.52).lerp(f.side,F.mapDim),St.side.color.copy(Ut),St.cap.opacity=St.side.opacity=F.mapAlpha});let ot=1-Rd(Math.max(F.rise,F.devRise)*1.6);A.position.z=Ai+.004,T.position.z=Ai+.003,b.opacity=F.mapAlpha*ot*(.28+.4*F.mapDim),M.opacity=F.mapAlpha*ot*(.1+.12*F.mapDim),c.material.opacity=.42*F.mapAlpha,Q.uniforms.uMorph.value=F.morph,Q.uniforms.uTime.value=nt,Q.uniforms.uAlpha.value=F.pAlpha,_t.visible=F.pAlpha>.001,s.style.opacity=F.glAlpha,F.glAlpha>.001&&e.render(n,i)}function V(F,nt,mt){return Zt.set(F,nt,mt).project(i),[(Zt.x+1)*.5*hn,(1-Zt.y)*.5*Ji]}return{render:ct,resize:$t,project:V,top:F=>{let nt=g.get(F);return nt?[nt.cx,nt.cy,nt.mesh.scale.z]:null},world:(F,nt)=>a(F,nt),flat:Ai,units:p,byKey:g,renderer:e}}var Jb=s=>s<0?0:s>1?1:s,Kb=s=>(s=Jb(s),s*s*(3-2*s)),Id=s=>s-Math.floor(s),Qc='"Pretendard Variable", Pretendard, system-ui, sans-serif';function g0(s,t,e){let n=s.getContext("2d"),i=1;function r(O,C){s.width=O,s.height=C,i=O/hn}let a=t.flows.top.slice(0,50).map(([O,C,k],G)=>({o:O,d:C,v:k,i:G,ph:Id(G*.618)})),o=a[0].v,l=Ss(ri.melonO),c=Ss(ri.melonD),h=(O,C,k,G)=>{let U=1-G;return[U*U*O[0]+2*U*G*C[0]+G*G*k[0],U*U*O[1]+2*U*G*C[1]+G*G*k[1]]},f=O=>l.map((C,k)=>Math.round(C+(c[k]-C)*O));function d(O,C){let k=O.flowAlpha;if(k<=.002||O.flows<=.001)return;n.globalCompositeOperation="lighter";let G=new Map;for(let U=a.length-1;U>=0;U--){let j=a[U],q=e.top(j.o),et=e.top(j.d);if(!q||!et)continue;let Z=e.project(q[0],q[1],q[2]),gt=e.project(et[0],et[1],et[2]),$=gt[0]-Z[0],L=gt[1]-Z[1],X=Math.hypot($,L)||1,Q=[(Z[0]+gt[0])/2-L*.22,(Z[1]+gt[1])/2+$*.22-X*.18],_t=Kb((O.flows-U/a.length*.55)/.45);if(_t<=0)continue;let st=Math.sqrt(j.v/o),Ut=U<3,Zt=n.createLinearGradient(Z[0],Z[1],gt[0],gt[1]);Zt.addColorStop(0,Ee(l,1)),Zt.addColorStop(1,Ee(c,1));let Lt=Math.max(8,Math.round(X/10)),qt=()=>{n.beginPath(),n.moveTo(Z[0],Z[1]);for(let tt=1;tt<=Lt*_t;tt++){let ht=h(Z,Q,gt,tt/Lt);n.lineTo(ht[0],ht[1])}let V=h(Z,Q,gt,_t);n.lineTo(V[0],V[1])};n.lineCap="round",n.strokeStyle=Zt,n.globalAlpha=k*(.035+.08*st)*(Ut?1.5:1),n.lineWidth=3+11*st,qt(),n.stroke(),n.globalAlpha=k*(.22+.5*st)*(Ut?1.2:1),n.lineWidth=.7+2.8*st,qt(),n.stroke();let $t=Ut?4:st>.4?3:2,ct=.42/(.5+X/520);for(let V=0;V<$t;V++){let tt=Id(C*ct+j.ph+V/$t);if(tt>_t)continue;let ht=h(Z,Q,gt,tt),F=1.6+3.2*st,nt=f(tt),mt=n.createRadialGradient(ht[0],ht[1],0,ht[0],ht[1],F*3.2);mt.addColorStop(0,Ee([255,255,255],1)),mt.addColorStop(.25,Ee(nt,.9)),mt.addColorStop(1,Ee(nt,0)),n.globalAlpha=k*(.35+.4*Math.sin(tt*Math.PI)),n.fillStyle=mt,n.beginPath(),n.arc(ht[0],ht[1],F*3.2,0,Math.PI*2),n.fill()}n.globalAlpha=k*_t*.9,n.fillStyle=Ee(l,1),n.beginPath(),n.arc(Z[0],Z[1],1.6+2.2*st,0,Math.PI*2),n.fill(),_t>.98&&G.set(j.d,{p:gt,v:(G.get(j.d)?.v||0)+j.v})}G.forEach(({p:U,v:j})=>{let et=4+11*Math.sqrt(j/o),Z=Id(C*.6+U[0]*.01);n.globalAlpha=k*.45;let gt=n.createRadialGradient(U[0],U[1],0,U[0],U[1],et*1.8);gt.addColorStop(0,Ee(c,.9)),gt.addColorStop(1,Ee(c,0)),n.fillStyle=gt,n.beginPath(),n.arc(U[0],U[1],et*1.8,0,Math.PI*2),n.fill(),n.globalAlpha=k*(1-Z)*.7,n.strokeStyle=Ee(c,1),n.lineWidth=1.2,n.beginPath(),n.arc(U[0],U[1],et+Z*22,0,Math.PI*2),n.stroke()}),n.globalAlpha=1,n.globalCompositeOperation="source-over"}let u=t.power.k,m=t.power.months,_=u.length,p=Math.max(...u),g=+m[0].slice(5,7)-1,v=1250,b=548,M=36,A=400,T=O=>M+(A-M)*(O/p),x=O=>-Math.PI/2+(g+O)/12*Math.PI*2,S=O=>{let C=Math.floor(O),k=O-C,G=k&&C+1<_?u[C]+(u[C+1]-u[C])*k:u[C],U=T(G),j=x(O);return[v+U*Math.cos(j),b+U*Math.sin(j)]},P=O=>Bn(p0,O/(_-1));function R(O){let C=O.powerAlpha;if(C<=.002)return;let k=O.spiral*(_-1);n.save(),n.globalAlpha=C,n.setLineDash([2,6]),n.lineWidth=1,[1e6,2e6].forEach(j=>{n.strokeStyle="rgba(220,228,240,0.16)",n.beginPath(),n.arc(v,b,T(j),0,Math.PI*2),n.stroke(),n.fillStyle="rgba(220,228,240,0.45)",n.font=`500 15px ${Qc}`,n.textAlign="left",n.fillText(`${j/1e4}\uB9CC MWh`,v+8,b-T(j)-6)}),n.setLineDash([]),n.font=`600 17px ${Qc}`,n.textAlign="center",n.textBaseline="middle";for(let j=0;j<12;j++){let q=-Math.PI/2+j/12*Math.PI*2,et=A+34;n.fillStyle=j===0||j===7?"rgba(255,220,160,0.85)":"rgba(200,208,220,0.45)",n.fillText(`${j+1}\uC6D4`,v+et*Math.cos(q),b+et*Math.sin(q))}n.lineCap="round",n.lineJoin="round",n.globalCompositeOperation="lighter";let G=6;for(let j=1;j<=Math.ceil(k);j++){let q=Math.min(j,k);if(q<=j-1)break;let et=(k-j)/12,Z=.32+.68*Math.exp(-et*.55),gt=P(j);n.strokeStyle=Ee(gt,1),n.beginPath();let[$,L]=S(j-1);n.moveTo($,L);for(let X=1;X<=G;X++){let Q=j-1+(q-(j-1))*X/G,[_t,st]=S(Q);n.lineTo(_t,st)}n.globalAlpha=C*Z*.22,n.lineWidth=9,n.stroke(),n.globalAlpha=C*Z,n.lineWidth=2.2,n.stroke()}if(k>0){let[j,q]=S(k),et=P(k),Z=n.createRadialGradient(j,q,0,j,q,34);Z.addColorStop(0,"rgba(255,255,255,0.95)"),Z.addColorStop(.2,Ee(et,.8)),Z.addColorStop(1,Ee(et,0)),n.globalAlpha=C,n.fillStyle=Z,n.beginPath(),n.arc(j,q,34,0,Math.PI*2),n.fill()}n.globalCompositeOperation="source-over";let U=Math.min(_-1,Math.floor(k+.001));n.globalAlpha=C,n.fillStyle=Ee(P(k),1),n.font=`800 64px ${Qc}`,n.fillText(m[U].slice(0,4),v,b-6),n.fillStyle="rgba(220,228,240,0.6)",n.font=`500 16px ${Qc}`,n.fillText(`${+m[U].slice(5,7)}\uC6D4 \xB7 ${Math.round(u[U]/1e4)}\uB9CC MWh`,v,b+36),n.restore()}let D=!0;function W(O,C){let k=O.flowAlpha>.002&&O.flows>.001||O.powerAlpha>.002;k!==D&&(D=k,s.style.visibility=k?"visible":"hidden"),k&&(n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,s.width,s.height),n.setTransform(i,0,0,i,0,0),d(O,C),R(O))}return{render:W,resize:r}}var jb="http://www.w3.org/2000/svg",ue=(s,t={},e)=>{let n=document.createElementNS(jb,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},Qb=s=>s<0?0:s>1?1:s,ai=s=>(s=Qb(s),s*s*(3-2*s));function _0(s,t){let e=t.rice,n=150,i=700,r=770,a=920,o=725,l=950,c=e.hist.filter(([,V])=>V!=null),h=c.flatMap(([,V,tt])=>[V,tt]).concat(e.fc.flatMap(V=>[V.lo,V.hi]),[e.stat,e.krei].filter(Boolean)),f=Math.floor((Math.min(...h)-6)/10)*10,d=Math.ceil((Math.max(...h)+4)/10)*10,u=c[0][0],m=c.at(-1)[0],_=V=>n+(V-u)/(m-u)*(i-n),p=V=>r+V/(e.fc.length-1)*(a-r),g=V=>l-(V-f)/(d-f)*(l-o),v=ue("g",{class:"rc",opacity:0},s),b=ue("defs",{},s),M=ue("linearGradient",{id:"rcArea",x1:0,y1:0,x2:0,y2:1},b);ue("stop",{offset:0,"stop-color":ri.gold,"stop-opacity":.22},M),ue("stop",{offset:1,"stop-color":ri.gold,"stop-opacity":0},M);let A=ue("g",{class:"rc-grid"},v);for(let V=f;V<=d;V+=20)V!==f&&(ue("line",{x1:n,x2:a+10,y1:g(V),y2:g(V)},A),ue("text",{x:n-14,y:g(V)+5,"text-anchor":"end"},A).textContent=V);[u,2015,2020,m].forEach(V=>{ue("text",{x:_(V),y:l+30,"text-anchor":"middle"},A).textContent=V}),ue("text",{x:n-14,y:o-22,"text-anchor":"end",class:"rc-unit"},A).textContent="kg/10a";let T=V=>V.map(([tt,ht],F)=>`${F?"L":"M"}${tt.toFixed(1)},${ht.toFixed(1)}`).join(""),x=c.filter(([,,V])=>V).map(([V,,tt])=>[_(V),g(tt)]),S=c.map(([V,tt])=>[_(V),g(tt)]),P=ue("path",{d:`${T(S)}L${_(m)},${l}L${_(u)},${l}Z`,fill:"url(#rcArea)",opacity:0},v),R=ue("path",{d:T(x),class:"rc-norm"},v),D=ue("path",{d:T(S),class:"rc-line"},v),W=S.map(([V,tt])=>ue("circle",{cx:V,cy:tt,r:4.2,class:"rc-dot",opacity:0},v)),O=ue("g",{class:"rc-fc"},v);ue("rect",{x:r-30,y:o-30,width:a-r+60,height:l-o+44,rx:14,class:"rc-fcbox"},O),ue("text",{x:(r+a)/2,y:l+30,"text-anchor":"middle",class:"rc-fclab"},O).textContent=`${e.year} \uC608\uCE21 ${e.fc.length}\uBC88`;let C=[[e.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98",ri.sky],[e.krei,"KREI",ri.field]].filter(([V])=>V!=null).map(([V,tt,ht],F)=>{let nt=ue("g",{opacity:0},O);return ue("line",{x1:r-18,x2:a+18,y1:g(V),y2:g(V),stroke:ht,"stroke-width":2,"stroke-dasharray":"5 4"},nt),ue("text",{x:a+26,y:g(V)+(F?14:-4),fill:ht,class:"rc-ref"},nt).textContent=`${tt} ${V}`,nt}),k=ue("path",{d:T(e.fc.map((V,tt)=>[p(tt),g(V.y)])),class:"rc-fcline"},O),G=e.fc.map((V,tt)=>{let ht=ue("g",{opacity:0},O);return ue("line",{x1:p(tt),x2:p(tt),y1:g(V.lo),y2:g(V.hi),class:"rc-wh"},ht),ue("circle",{cx:p(tt),cy:g(V.y),r:tt===e.fc.length-1?7:5,class:tt===e.fc.length-1?"rc-fcdot now":"rc-fcdot"},ht),ht}),U=V=>V.replace(/(\d+)월 (\d+)일/,"$1/$2");ue("text",{x:p(0),y:o-42,"text-anchor":"middle",class:"rc-fcd"},O).textContent=U(e.fc[0].lab),ue("text",{x:p(e.fc.length-1),y:o-42,"text-anchor":"middle",class:"rc-fcd"},O).textContent=U(e.fc.at(-1).lab);let j=t.facts,q=j.riceAcc,et=ue("g",{class:"ra",opacity:0},s),Z=[["\uD3C9\uB144 \uADF8\uB300\uB85C",q.norm,"norm"],...t.rice.fc.slice(0,5).map(V=>[V.lab,q[`m${V.t}`],V.t])].filter(([,V])=>V!=null),gt=330,$=900,L=742,X=37,Q=V=>gt+V/Math.max(...Z.map(tt=>tt[1]))*($-gt);ue("text",{x:150,y:L-44,class:"ra-h"},et).textContent=`\uC804\uAD6D \uB2E8\uC218 \uD3C9\uADE0 \uC624\uCC28 \xB7 ${j.riceFrom}~${t.rice.year-1} \uADF8\uD574 \uC774\uC804 \uC790\uB8CC\uB85C\uB9CC \uC7AC\uD604`;let _t=Z.slice(1).reduce((V,tt)=>tt[1]<V[1]?tt:V)[2],st=Z.map(([V,tt,ht],F)=>{let nt=L+F*X,mt=ue("g",{opacity:0},et);ue("text",{x:gt-16,y:nt+19,"text-anchor":"end",class:"ra-l"},mt).textContent=F?`${V} \uC608\uCE21`:V;let Ct=ue("rect",{x:gt,y:nt+4,width:0,height:22,rx:5,class:ht==="norm"?"ra-b norm":ht==="0915"?"ra-b best":"ra-b"},mt),Dt=ue("text",{x:gt,y:nt+21,class:"ra-v"},mt);return Dt.textContent=`${tt}kg`,{gg:mt,r:Ct,tx:Dt,w:Q(tt)-gt}}),Ut=[[q.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1","#5fb3ff"],[q.krei,"KREI 9\uC6D4 \uC804\uB9DD","#5fb37c"]].map(([V,tt,ht],F)=>{let nt=ue("g",{opacity:0},et),mt=Q(V),Ct=L-6,Dt=L+Z.length*X;return ue("line",{x1:mt,x2:mt,y1:Ct,y2:Dt,stroke:ht,"stroke-width":2,"stroke-dasharray":"4 4"},nt),ue("text",{x:mt+(F?8:-8),y:Dt+24,"text-anchor":F?"start":"end",fill:ht,class:"ra-ref"},nt).textContent=`${tt} ${V}kg`,nt}),Zt=0,Lt=0;function qt(){Zt=D.getTotalLength(),Lt=k.getTotalLength(),D.style.strokeDasharray=`${Zt} ${Zt}`,k.style.strokeDasharray=`${Lt} ${Lt}`}function $t(V){et.setAttribute("opacity",V.accAlpha),!(V.accAlpha<=.002)&&(st.forEach((tt,ht)=>{let F=ai((V.riceAcc-ht*.1)/.45);tt.gg.setAttribute("opacity",ai(F*3)),tt.r.setAttribute("width",tt.w*F),tt.tx.setAttribute("x",gt+tt.w*F+10)}),Ut.forEach((tt,ht)=>tt.setAttribute("opacity",ai((V.riceAcc-.7-ht*.1)/.2))))}function ct(V){if($t(V),Zt||qt(),v.setAttribute("opacity",V.riceAlpha),V.riceAlpha<=.002)return;let tt=ai(V.riceLine);D.style.strokeDashoffset=Zt*(1-tt),R.style.opacity=.9*ai(V.riceLine*1.5),P.setAttribute("opacity",ai((V.riceLine-.6)/.4)),W.forEach((F,nt)=>F.setAttribute("opacity",ai((tt-nt/W.length)*8)));let ht=V.riceFc;O.setAttribute("opacity",ai(ht*4)),G.forEach((F,nt)=>F.setAttribute("opacity",ai((ht-nt/G.length*.7)/.3))),k.style.strokeDashoffset=Lt*(1-ai(ht/.95)),C.forEach((F,nt)=>F.setAttribute("opacity",ai((ht-.75-nt*.08)/.15)))}return{render:ct}}var t1="http://www.w3.org/2000/svg",bs=(s,t={},e)=>{let n=document.createElementNS(t1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},e1=s=>s<0?0:s>1?1:s,Ld=s=>(s=e1(s),s*s*(3-2*s)),n1=s=>Math.round(s/100).toLocaleString("ko-KR");function x0(s,t){let e=t.jikbul,n=e.sido.filter(v=>v.pub>0),i=bs("g",{class:"bd",opacity:0},s),r=150,a=206,o=222,l=470,c=628,h=20.5,f=Math.max(...n.map(v=>v.pub)),d=v=>v.hh?v.pub*100/v.hh:0,u=n.map(d),m=[...u].sort((v,b)=>v-b),_=v=>m.indexOf(v)/Math.max(1,m.length-1);bs("text",{x:r,y:c-22,class:"bd-h"},i).textContent=`\uC2DC\uB3C4\uBCC4 \uACF5\uC775\uC9C1\uBD88 \uC608\uC0B0\uD604\uC561 \xB7 ${e.year}`,bs("text",{x:900,y:c-22,"text-anchor":"end",class:"bd-y"},i).textContent="\uB18D\uAC00\uB2F9";let p=n.map((v,b)=>{let M=c+b*h,A=v.pub/f*l,T=Bn(Qr,.25+.75*_(u[b])),x=bs("g",{},i);bs("text",{x:a,y:M+14,"text-anchor":"end",class:"bd-n"},x).textContent=v.name;let S=bs("rect",{x:o,y:M+3,width:0,height:h-7,rx:4,fill:Ee(T)},x),P=bs("text",{x:o,y:M+14,class:"bd-v2"},x);P.textContent=`${n1(v.pub)}\uC5B5`;let R=bs("text",{x:900,y:M+14,"text-anchor":"end",class:"bd-f"},x);return R.textContent=`${Math.round(u[b]).toLocaleString("ko-KR")}\uB9CC`,{gg:x,b:S,v:P,f:R,w:A}});function g(v){i.setAttribute("opacity",v.bdAlpha),!(v.bdAlpha<=.002)&&p.forEach((b,M)=>{let A=Ld((v.bdBars-M/p.length*.5)/.5);b.gg.setAttribute("opacity",Ld(A*3)),b.b.setAttribute("width",b.w*A),b.v.setAttribute("x",o+b.w*A+8),b.f.setAttribute("opacity",Ld((v.bdSplit-M/p.length*.4)/.4))})}return{render:g}}var oi=.5416666666666666,v0="assets/intro/shots/";function y0(s,t,e){s.insertAdjacentHTML("beforeend",`
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
    </div>`);let n=s.querySelector("#scr-wrap"),i=s.querySelector("#scr-zoom"),r=s.querySelector("#scr-marks"),a=s.querySelector("#cursor"),o=s.querySelector("#scr-url"),l=Object.fromEntries([...s.querySelectorAll(".scr-img")].map(u=>[u.dataset.n,u])),c=(u,m)=>t.shots[u]?.boxes?.[m]||t.shots.home?.boxes?.[m]||null;function h(u,m=.92){if(!u)return{scale:1,x:0,y:0};let[_,p,g,v]=u,b=Math.max(1,Math.min(1040/(g*oi),585/(v*oi))*m),M=1040/2-(_+g/2)*oi*b,A=585/2-(p+v/2)*oi*b;return M=Math.min(0,Math.max(1040-1040*b,M)),A=Math.min(0,Math.max(585-585*b,A)),{scale:b,x:M,y:A}}let f=u=>u?{x:(u[0]+u[2]/2)*oi,y:(u[1]+u[3]/2)*oi}:{x:1040/2,y:585/2};function d(u,m,_,p="top"){if(!m)return null;let[g,v,b,M]=m;return r.insertAdjacentHTML("beforeend",`<div class="mk mk-${p}" id="mk-${u}" style="left:${g*oi}px;top:${v*oi}px;width:${b*oi}px;height:${M*oi}px"><span>${_}</span></div>`),r.querySelector(`#mk-${u}`)}return{wrap:n,zoom:i,cursor:a,url:o,imgs:l,box:c,focus:h,at:f,mark:d,K:oi}}function M0(s,t){return s.insertAdjacentHTML("beforeend",`
    <div class="wall-wrap" id="wall-wrap"><div class="wall" id="wall">
      ${t.map(([e,n])=>`<figure class="wt"><img src="${v0}${e}_s.webp" alt="" decoding="async" width="320" height="180"><figcaption>${n}</figcaption></figure>`).join("")}
    </div></div>`),s.querySelector("#wall-wrap")}var i1="http://www.w3.org/2000/svg",de=(s,t={},e)=>{let n=document.createElementNS(i1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},b0=s=>s<0?0:s>1?1:s,er=s=>(s=b0(s),s*s*(3-2*s)),Dd=s=>1-(1-b0(s))**3,s1=s=>s-Math.floor(s),go='"Pretendard Variable", Pretendard, system-ui, sans-serif';function S0(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}function r1(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function a1(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function w0(s,t,e,n){let i=s.getContext("2d"),r=e.spots,a=1,o=!0;function l(ot,St){s.width=ot,s.height=St,a=ot/hn}let c=r.rio.regions,h=Math.max(...c.map(ot=>ot.x)),f=ot=>ot>=1?Bn(["#ffd27a","#f5a524","#ff7a4a"],Math.min(1,(ot-1)/2.4)):Bn(["#2f6fd0","#4ea1ff","#9fd1ff"],ot);function d(ot,St){let lt=ot.rioA;if(lt<=.002)return;let Rt=1290,vt=560,bt=74,E=300,y=c.length,z=Math.PI*2/y*.36;i.save(),i.globalAlpha=lt,i.globalCompositeOperation="lighter";for(let ut=0;ut<3;ut++){let yt=s1(St*.42+ut/3),Mt=bt+yt*360;i.strokeStyle=`rgba(255,200,120,${.22*(1-yt)*lt})`,i.lineWidth=1.5,i.beginPath(),i.arc(Rt,vt,Mt,0,Math.PI*2),i.stroke()}c.forEach((ut,yt)=>{let Mt=Dd((ot.rioP-yt/y*.5)/.5);if(Mt<=0)return;let J=-Math.PI/2+yt/y*Math.PI*2+ot.rioP*.12,rt=bt+(E*Math.sqrt(ut.x/h)+18)*Mt,xt=f(ut.lq),I=i.createLinearGradient(Rt+bt*Math.cos(J),vt+bt*Math.sin(J),Rt+rt*Math.cos(J),vt+rt*Math.sin(J));I.addColorStop(0,Ee(xt,.08)),I.addColorStop(.6,Ee(xt,.55)),I.addColorStop(1,Ee(xt,.95)),i.fillStyle=I,i.beginPath(),i.moveTo(Rt+bt*Math.cos(J-z),vt+bt*Math.sin(J-z));let dt=bt+(rt-bt)*.55,at=z*1.5*(bt/dt)*2.4;i.quadraticCurveTo(Rt+dt*Math.cos(J-at),vt+dt*Math.sin(J-at),Rt+rt*Math.cos(J),vt+rt*Math.sin(J)),i.quadraticCurveTo(Rt+dt*Math.cos(J+at),vt+dt*Math.sin(J+at),Rt+bt*Math.cos(J+z),vt+bt*Math.sin(J+z)),i.closePath(),i.fill();let Tt=er((Mt-.7)/.3);if(Tt>0){let At=rt+26,Et=Rt+At*Math.cos(J),Ht=vt+At*Math.sin(J);i.globalCompositeOperation="source-over",i.globalAlpha=lt*Tt,i.textAlign=Math.cos(J)>.25?"left":Math.cos(J)<-.25?"right":"center",i.textBaseline="middle",i.fillStyle="#eef0f3",i.font=`700 19px ${go}`,i.fillText(ut.name,Et,Ht-9),i.fillStyle=Ee(xt,1),i.font=`600 15px ${go}`,i.fillText(`${(ut.x/1e6).toFixed(1)}\uC870 \xB7 ${ut.lq}`,Et,Ht+11),i.globalAlpha=lt,i.globalCompositeOperation="lighter"}}),i.globalCompositeOperation="source-over";let pt=i.createRadialGradient(Rt,vt,0,Rt,vt,bt);pt.addColorStop(0,"rgba(40,30,16,0.95)"),pt.addColorStop(1,"rgba(20,16,10,0.9)"),i.fillStyle=pt,i.beginPath(),i.arc(Rt,vt,bt-4,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(255,207,122,0.5)",i.lineWidth=1.2,i.stroke(),i.textAlign="center",i.textBaseline="middle",i.fillStyle="#ffd98a",i.font=`800 30px ${go}`,i.fillText(`${Math.round(r.rio.total/1e6)}\uC870`,Rt,vt-6),i.fillStyle="#aab2bf",i.font=`500 14px ${go}`,i.fillText(`\uB18D\uC2DD\uD488 \uC0B0\uCD9C ${r.rio.year}`,Rt,vt+20),i.textAlign="right",i.fillStyle="rgba(200,208,220,0.75)",i.font=`500 16px ${go}`,i.fillText("\uAF43\uC78E \uAE38\uC774 = \uC2DC\uB3C4 \uB18D\uC2DD\uD488 \uC0B0\uCD9C\uC561 \xB7 \uC22B\uC790 = \uD2B9\uD654\uB3C4(\uC804\uAD6D \uD3C9\uADE0 1, \uC8FC\uD669\uC77C\uC218\uB85D \uB18D\uC2DD\uD488\uC5D0 \uAE30\uB304\uB2E4)",1844,1018),i.restore()}let u=[[245,165,36],[255,122,89],[124,201,143]],m=Math.max(...r.coops.map(ot=>ot[3])),_=S0(1110),p=r.coops.map(ot=>({w:n.world(ot[0],ot[1]),k:ot[2],s:Math.sqrt(ot[3]/m),o:_()}));function g(ot,St){let lt=ot.coopA;lt<=.002||(i.save(),i.globalCompositeOperation="lighter",p.forEach(Rt=>{let vt=er((ot.coopP-Rt.o*.8)/.2);if(vt<=0)return;let[bt,E]=n.project(Rt.w[0],Rt.w[1],n.flat),y=(1.4+6.5*Rt.s)*(.6+.4*vt),z=.85+.15*Math.sin(St*2+Rt.o*30),pt=i.createRadialGradient(bt,E,0,bt,E,y*2);pt.addColorStop(0,Ee(u[Rt.k],.5*lt*vt*z)),pt.addColorStop(1,Ee(u[Rt.k],0)),i.fillStyle=pt,i.beginPath(),i.arc(bt,E,y*2,0,Math.PI*2),i.fill(),i.globalCompositeOperation="source-over",i.fillStyle=Ee(u[Rt.k],.92*lt*vt),i.beginPath(),i.arc(bt,E,Math.max(1.5,y*.7),0,Math.PI*2),i.fill(),i.globalCompositeOperation="lighter"}),i.restore())}let v=S0(14939),b=e.map.sigun.map(ot=>r.lv.nv[ot.key]?r.lv.man[ot.key]/r.lv.nv[ot.key]:0),M=b.filter(ot=>ot>0).sort((ot,St)=>ot-St),A=ot=>{let St=0,lt=M.length-1;for(;St<lt;){let Rt=St+lt>>1;M[Rt]<ot?St=Rt+1:lt=Rt}return St/(M.length-1)},T=[];e.map.sigun.forEach((ot,St)=>{let lt=r.lv.nv[ot.key];if(!lt)return;let Rt=Bn(jc,.1+.9*A(b[St])),vt=ot.rings.map(y=>y[0]),bt=vt.map(a1),E=bt.reduce((y,z)=>y+z,0);for(let y=0;y<lt;y++){let z=v()*E,pt=0;for(;z>bt[pt]&&pt<vt.length-1;)z-=bt[pt++];let ut=vt[pt],yt=1/0,Mt=-1/0,J=1/0,rt=-1/0;ut.forEach(([xt,I])=>{yt=Math.min(yt,xt),Mt=Math.max(Mt,xt),J=Math.min(J,I),rt=Math.max(rt,I)});for(let xt=0;xt<30;xt++){let I=yt+v()*(Mt-yt),dt=J+v()*(rt-J);if(r1(I,dt,ut)){T.push({w:n.world(I,dt),c:Rt,o:v()});break}}}});function x(ot){let St=ot.lvA;if(!(St<=.002)){i.save(),i.globalCompositeOperation="lighter";for(let lt of T){let Rt=er((ot.lvP-lt.o*.85)/.15);if(Rt<=0)continue;let[vt,bt]=n.project(lt.w[0],lt.w[1],.06);i.fillStyle=Ee(lt.c,.75*St*Rt),i.fillRect(vt-1.3,bt-1.3,2.6,2.6)}i.restore()}}let S=r.employ,P=de("g",{opacity:0},t),R=150,D=1770,W=560,O=950,C=5e3,k=ot=>R+(ot-S.years[0])/(S.years.at(-1)-S.years[0])*(D-R),G=ot=>O-ot/C*(O-W),U=de("defs",{},t),j=de("linearGradient",{id:"empG",x1:0,y1:0,x2:0,y2:1},U);de("stop",{offset:0,"stop-color":"#7cc98f","stop-opacity":.45},j),de("stop",{offset:1,"stop-color":"#7cc98f","stop-opacity":0},j);let q=de("clipPath",{id:"empClip"},U),et=de("rect",{x:R-10,y:0,width:0,height:1080},q);for(let ot=1e3;ot<=4e3;ot+=1e3)de("line",{x1:R,x2:D,y1:G(ot),y2:G(ot),class:"sp-grid"},P),de("text",{x:D+12,y:G(ot)+5,class:"sp-ax"},P).textContent=`${ot/10}\uB9CC`;for(let ot=1970;ot<=2020;ot+=10)de("text",{x:k(ot),y:O+30,"text-anchor":"middle",class:"sp-ax"},P).textContent=ot;let Z=S.years.map((ot,St)=>[k(ot),G(S.a[St])]),gt=Z.map(([ot,St],lt)=>`${lt?"L":"M"}${ot.toFixed(1)},${St.toFixed(1)}`).join(""),$=de("g",{"clip-path":"url(#empClip)"},P);de("path",{d:`${gt}L${D},${O}L${R},${O}Z`,fill:"url(#empG)"},$),de("path",{d:gt,class:"sp-eline"},$);let L=de("circle",{r:7,class:"sp-ehead"},P),X=de("text",{class:"sp-ehv","text-anchor":"middle"},P),Q=de("text",{x:Z[0][0]+14,y:Z[0][1]-18,class:"sp-ehs"},P);Q.textContent=`${S.years[0]}\uB144 ${Math.round(S.a[0]/10)}\uB9CC \uBA85`;function _t(ot){if(P.setAttribute("opacity",ot.empA),ot.empA<=.002)return;let St=ot.empP,lt=R+(D-R)*St;et.setAttribute("width",lt-R+12);let Rt=Math.min(S.years.length-1,St*(S.years.length-1)),vt=Math.floor(Rt),bt=Rt-vt,E=Math.min(S.years.length-1,vt+1),y=Z[vt][0]+(Z[E][0]-Z[vt][0])*bt,z=Z[vt][1]+(Z[E][1]-Z[vt][1])*bt,pt=S.a[vt]+(S.a[E]-S.a[vt])*bt;L.setAttribute("cx",y),L.setAttribute("cy",z),X.setAttribute("x",Math.min(D-40,y)),X.setAttribute("y",z-22),X.textContent=`${Math.round(S.years[0]+Rt)}\uB144 ${Math.round(pt/10)}\uB9CC`,Q.setAttribute("opacity",er(St*6))}let st=de("g",{opacity:0},t),Ut=de("pattern",{id:"soilDots",width:9,height:9,patternUnits:"userSpaceOnUse"},U);de("circle",{cx:2,cy:2,r:.9,fill:"rgba(0,0,0,0.25)"},Ut),de("circle",{cx:6.5,cy:6,r:.7,fill:"rgba(255,255,255,0.12)"},Ut);let Zt=["#7fcf7a","#b9d36a","#d9b86a","#b08858","#6e5a48","#3a3632"],Lt=["1\uAE09","2\uAE09","3\uAE09","4\uAE09","5\uAE09","\uAE30\uD0C0"],qt=[["\uB17C",r.soil.pg,880],["\uBC2D",r.soil.fg,1440]].map(([ot,St,lt])=>{let Rt=St.reduce((J,rt)=>J+rt,0),vt=250,bt=640,E=280;de("text",{x:lt+E/2,y:vt-28,"text-anchor":"middle",class:"sp-sh"},st).textContent=`${ot}\uC73C\uB85C \uC4F8 \uB54C \uC801\uC131\uB4F1\uAE09`;let y=vt,z=St.map((J,rt)=>{let xt=J/Rt*bt,I=de("g",{},st);de("rect",{x:lt,y,width:E,height:Math.max(1,xt-2),rx:4,fill:Zt[rt]},I),de("rect",{x:lt,y,width:E,height:Math.max(1,xt-2),rx:4,fill:"url(#soilDots)"},I);let dt=J/Rt*100;if(xt>16){let Tt=de("text",{x:lt+E+14,y:y+xt/2+6,class:"sp-sl"},I);Tt.innerHTML=`<tspan class="b">${Lt[rt]}</tspan><tspan dx="8">${dt.toFixed(1)}%</tspan>`}let at={g:I,y0:y,h:xt};return y+=xt,at}),pt=(St[0]+St[1])/Rt*100,ut=z[0].h+z[1].h,yt=de("g",{opacity:0},st);de("path",{d:`M${lt-14},${vt}h-10v${ut}h10`,fill:"none",stroke:"#ffd98a","stroke-width":2},yt);let Mt=de("text",{x:lt-32,y:vt+Math.max(18,ut/2+6),"text-anchor":"end",class:"sp-sb"},yt);return Mt.innerHTML=`<tspan x="${lt-32}" dy="0">1\xB72\uAE09\uC9C0</tspan><tspan x="${lt-32}" dy="30" class="v">${pt.toFixed(1)}%</tspan>`,{layers:z,br:yt}});function $t(ot){st.setAttribute("opacity",ot.soilA),!(ot.soilA<=.002)&&qt.forEach((St,lt)=>{St.layers.forEach((Rt,vt)=>{let bt=Dd((ot.soilP-lt*.08-vt*.09)/.38);Rt.g.setAttribute("opacity",er(bt*2)),Rt.g.setAttribute("transform",`translate(0 ${(-120*(1-bt)).toFixed(1)})`)}),St.br.setAttribute("opacity",er((ot.soilP-.75)/.2))})}let ct=de("g",{opacity:0},t),V=r.lv.kinds.filter(([,ot])=>ot>1e3),tt=r.lv.kinds.reduce((ot,[,St])=>ot+St,0),ht=290,F=720,nt=112,mt=["#ff9a5a","#f5c14f","#9fd1ff"];de("circle",{cx:ht,cy:F,r:nt,fill:"none",stroke:"rgba(255,255,255,0.07)","stroke-width":34},ct);let Ct=2*Math.PI*nt,Dt=0,Xt=V.map(([ot,St],lt)=>{let Rt=St/tt,vt=de("circle",{cx:ht,cy:F,r:nt,fill:"none",stroke:mt[lt],"stroke-width":34,transform:`rotate(${-90+Dt*360} ${ht} ${F})`,"stroke-dasharray":`0 ${Ct}`},ct),bt=de("text",{x:ht+nt+60,y:F-40+lt*40,class:"sp-dl"},ct);return bt.innerHTML=`<tspan fill="${mt[lt]}" class="b">${ot}</tspan><tspan dx="10">${Math.round(Rt*100)}%</tspan>`,Dt+=Rt,{c:vt,f:Rt,t:bt}});de("text",{x:ht,y:F+6,"text-anchor":"middle",class:"sp-dc"},ct).textContent="\uBD84\uB1E8\uB294",de("text",{x:ht,y:F+32,"text-anchor":"middle",class:"sp-dc2"},ct).textContent="\uC5B4\uB290 \uAC00\uCD95\uC5D0\uC11C";function N(ot){ct.setAttribute("opacity",ot.lvA),!(ot.lvA<=.002)&&Xt.forEach((St,lt)=>{let Rt=Dd((ot.lvP-lt*.15)/.5);St.c.setAttribute("stroke-dasharray",`${Math.max(0,St.f*Ct*Rt-3)} ${Ct}`),St.t.setAttribute("opacity",er((Rt-.5)/.5))})}function fe(ot,St){_t(ot),$t(ot),N(ot);let lt=ot.rioA>.002||ot.coopA>.002||ot.lvA>.002;lt!==o&&(o=lt,s.style.visibility=lt?"visible":"hidden"),lt&&(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,s.width,s.height),i.setTransform(a,0,0,a,0,0),d(ot,St),g(ot,St),x(ot))}return{render:fe,resize:l,coopKinds:r.coopKinds}}var En=.13392857142857142,o1=En*16,kn=s=>440*2**((s-69)/12),l1={Am:[57,60,64,45],F:[57,60,65,41],C:[55,60,64,48],G:[55,59,62,43],Dm:[57,62,65,50],Em:[55,59,64,40],E:[56,59,64,40],Fm7:[57,60,64,41],G6:[55,59,64,43],Am9:[59,60,64,45]},zn=(...s)=>s.map(t=>l1[t]),Pe=s=>[...s].map(t=>t==="."?0:t==="x"?1:t==="o"?.55:t==="-"?.3:0),c1={none:{k:Pe("................"),s:Pe("................"),h:Pe("................")},hero:{k:Pe("x...x...x...x..."),s:Pe("................"),h:Pe("..o...o...o...o.")},tech:{k:Pe("x.....x.x......."),s:Pe("....-.......-..."),h:Pe("-o-o-o-o-o-o-o-o")},half:{k:Pe("x.........x....."),s:Pe("........x......."),h:Pe("..-...-...-...-.")},soft:{k:Pe("x.......x......."),s:Pe("............o..."),h:Pe("o.-.o.-.o.-.o.-.")},march:{k:Pe("x...x...x...x..."),s:Pe("....x.......x.oo"),h:Pe("o.o.o.o.o.o.o.o.")},drive:{k:Pe("x...x...x...x.o."),s:Pe("....x.......x..."),h:Pe("-o-x-o-x-o-x-o-x")},pump:{k:Pe("x...x...x...x..."),s:Pe("....o.......o..."),h:Pe("..x...x...x...x.")}};function A0({T:s,sp:t,hits:e,events:n}){let i=[{at:0,prog:zn("Am","Fm7","C","G"),dr:"none",pad:.9,bass:0,arp:"bell",cut:900},{at:s.stats,prog:zn("Am","F","C","G"),dr:"hero",pad:.55,bass:.9,arp:null,stab:.8,cut:1600},{at:s.real,prog:zn("Am","Am","F","G"),dr:"tech",pad:.35,bass:.7,arp:"pluck",cut:1400},{at:s.sat,prog:zn("Fm7","Fm7","Am","Am"),dr:"half",pad:.9,bass:.6,arp:"bell",cut:700,sweep:!0},{at:s.rice,prog:zn("C","G","Am","F"),dr:"soft",pad:.5,bass:.7,arp:"piano",cut:2e3,lead:{m:"A",from:5.6}},{at:s.jik,prog:zn("F","G","Em","Am"),dr:"march",pad:.45,bass:.9,arp:null,stab:.6,cut:1800},{at:s.flow,prog:zn("Am","F","C","G"),dr:"drive",pad:.35,bass:1,arp:"pluck",cut:2400,lead:{m:"B",from:0}},{at:s.power,prog:zn("Am","G","F","E"),dr:"pump",pad:.6,bass:1,arp:"saw",cut:2600,pumpPad:!0},...[0,1,2,3,4,5].map($=>({at:t($),prog:$%2?zn("F","G","Am","Am"):zn("Am","F","C","G"),dr:$%3===1?"march":"drive",pad:.4,bass:1,arp:["pluck","piano","saw","pluck","bell","saw"][$],cut:2200+$*150,lead:{m:"S",from:0,v:$},up:$>=3?2:0})),{at:s.wall,prog:zn("F","G","Am","Am"),dr:"drive",pad:.7,bass:1,arp:"saw",cut:3e3,build:!0,up:2},{at:s.maker,prog:zn("F","C","G","Am"),dr:"none",pad:.7,bass:.35,arp:"piano",cut:1700,lead:{m:"R",from:1.6},soft:!0},{at:s.end,prog:zn("Am9"),dr:"none",pad:1,bass:.7,arp:"bell",cut:2400,end:!0}].map($=>({...$,s0:Math.round($.at/En)})),r=$=>{let L=i[0];for(let X of i)$>=X.s0&&(L=X);return L},a={A:[[0,76,4],[4,74,2],[6,72,2],[8,74,4],[12,76,4],[16,79,6],[22,76,2],[24,74,8]],B:[[0,69,2],[2,72,2],[4,76,2],[6,74,2],[8,72,4],[12,69,2],[14,71,2],[16,72,4],[20,76,4],[24,79,3],[27,77,1],[28,76,4]],R:[[0,76,8],[8,74,6],[14,72,2],[16,72,8],[24,71,4],[28,69,4],[32,72,8],[40,74,8],[48,76,16]]},o=[[[0,81,2],[2,79,2],[4,76,4],[8,79,2],[10,81,2],[12,84,4]],[[0,72,4],[4,74,4],[8,76,6],[14,79,2],[16,77,8]],[[0,76,1],[1,79,1],[2,83,2],[4,81,2],[6,79,2],[8,76,4],[12,74,4]],[[0,69,3],[3,72,3],[6,76,2],[8,81,8]],[[0,84,2],[4,83,2],[8,81,2],[12,79,4]],[[0,76,2],[2,76,2],[4,79,4],[8,81,2],[10,79,2],[12,76,4]]],l=null,c=null,h=null,f=null,d=null,u=.7,m=!1,_=!1,p=0,g=0,v=new Set;function b(){l=new(window.AudioContext||window.webkitAudioContext),c=l.createGain(),c.gain.value=0;let $=l.createDynamicsCompressor();$.threshold.value=-16,$.ratio.value=3.5,$.attack.value=.004,$.release.value=.2,c.connect($).connect(l.destination),h=l.createGain(),h.gain.value=.9,h.connect(c),f=l.createConvolver();let L=l.sampleRate*2.8,X=l.createBuffer(2,L,l.sampleRate);for(let st=0;st<2;st++){let Ut=X.getChannelData(st);for(let Zt=0;Zt<L;Zt++)Ut[Zt]=(Math.random()*2-1)*(1-Zt/L)**2.6}f.buffer=X;let Q=l.createGain();Q.gain.value=.34,f.connect(Q).connect(c),d=l.createBuffer(1,l.sampleRate,l.sampleRate);let _t=d.getChannelData(0);for(let st=0;st<_t.length;st++)_t[st]=Math.random()*2-1}let M=($,L)=>{let X={src:$,g:L};v.add(X),$.onended=()=>v.delete(X)};function A($,L=0){if($.connect(h),L){let X=l.createGain();X.gain.value=L,$.connect(X).connect(f)}}function T($,L,X,Q,_t,st=0){$.gain.setValueAtTime(1e-4,L),$.gain.exponentialRampToValueAtTime(Math.max(2e-4,Q),L+X),$.gain.exponentialRampToValueAtTime(Math.max(1e-4,st),L+X+_t)}function x($,L,X,Q,_t,{a:st=.005,lp:Ut=0,q:Zt=.7,detune:Lt=0,send:qt=0,sustain:$t=0,lpEnd:ct=0,vib:V=0}={}){let tt=l.createOscillator();tt.type=$,tt.frequency.value=L,tt.detune.value=Lt;let ht=l.createGain();T(ht,X,st,_t,Q,$t);let F=tt;if(Ut){let nt=l.createBiquadFilter();nt.type="lowpass",nt.frequency.setValueAtTime(Ut,X),nt.Q.value=Zt,ct&&nt.frequency.exponentialRampToValueAtTime(ct,X+Q),tt.connect(nt),F=nt}if(V){let nt=l.createOscillator(),mt=l.createGain();nt.frequency.value=5.2,mt.gain.value=V,nt.connect(mt).connect(tt.detune),nt.start(X),nt.stop(X+st+Q+.05)}return F.connect(ht),A(ht,qt),tt.start(X),tt.stop(X+st+Q+.05),M(tt,ht),tt}function S($,L,X,Q,_t,st=1,Ut=0,Zt=0){let Lt=l.createBufferSource();Lt.buffer=d;let qt=l.createBiquadFilter();qt.type=Q,qt.frequency.setValueAtTime(_t,$),qt.Q.value=st,Zt&&qt.frequency.exponentialRampToValueAtTime(Zt,$+L);let $t=l.createGain();T($t,$,.002,X,L),Lt.connect(qt).connect($t),A($t,Ut),Lt.start($,Math.random()*.5),Lt.stop($+L+.05),M(Lt,$t)}let P=($,L)=>{let X=x("sine",150,$,.42,.95*L);X.frequency.setValueAtTime(150,$),X.frequency.exponentialRampToValueAtTime(42,$+.13)},R=($,L,X)=>S($,X?.16:.035,.15*L,"highpass",8200,.8),D=($,L)=>{S($,.2,.3*L,"bandpass",1900,.7,.25),x("triangle",190,$,.09,.16*L)},W=($,L,X,Q,_t=380)=>x("sawtooth",kn(L),$,Q,.19*X,{a:.01,lp:_t,q:4});function O($,L,X,Q,_t,st){L.forEach(Ut=>[-8,8].forEach(Zt=>x("sawtooth",kn(Ut),$,Q,.026*X,{a:.4,lp:st?380:_t,lpEnd:st?_t*2.6:0,detune:Zt,send:.5,sustain:.011*X})))}let C=($,L,X)=>L.forEach(Q=>[-6,6].forEach(_t=>x("sawtooth",kn(Q+12),$,.22,.03*X,{lp:2600,lpEnd:700,detune:_t,send:.3}))),k=($,L,X,Q,_t)=>x(_t?"triangle":"square",kn(L),$,X,(_t?.085:.04)*Q,{a:_t?.01:.02,lp:_t?3e3:2400,vib:_t?0:9,send:.4,sustain:(_t?.03:.02)*Q}),G={bell:{pat:[0,-1,-1,2,-1,-1,4,-1,-1,-1,3,-1,-1,-1,5,-1],play:($,L,X)=>{x("sine",kn(L+24),$,1.1,.06*X,{send:.7}),x("sine",kn(L+36),$,.5,.015*X,{send:.7})}},pluck:{pat:[0,1,2,4,1,2,4,2,0,1,2,4,2,4,5,4],play:($,L,X,Q)=>x("square",kn(L+12),$,.16,.042*X,{lp:Q+800,send:.25})},piano:{pat:[0,-1,2,-1,1,-1,2,-1,0,-1,2,-1,4,-1,2,-1],play:($,L,X)=>{x("triangle",kn(L+12),$,.7,.08*X,{send:.45}),x("sine",kn(L+24),$,.3,.02*X)}},saw:{pat:[0,2,4,2,1,3,5,3,0,2,4,2,1,3,5,3],play:($,L,X,Q,_t)=>x("sawtooth",kn(L+12),$,.12,.036*X,{lp:600+_t/16*Q*1.6,q:6,send:.2})}};function U($,L=1){x("sine",70,$,1.6,.8*L,{send:.6}).frequency.exponentialRampToValueAtTime(38,$+1.2),S($,1.1,.33*L,"lowpass",420,.5,.7),x("triangle",kn(81),$,1.4,.04*L,{send:.9})}function j($,L,X=1){let Q=l.createBufferSource();Q.buffer=d,Q.loop=!0;let _t=l.createBiquadFilter();_t.type="bandpass",_t.Q.value=2.2,_t.frequency.setValueAtTime(300,$),_t.frequency.exponentialRampToValueAtTime(6e3,$+L);let st=l.createGain();st.gain.setValueAtTime(1e-4,$),st.gain.exponentialRampToValueAtTime(.2*X,$+L*.95),st.gain.exponentialRampToValueAtTime(1e-4,$+L+.05),Q.connect(_t).connect(st),A(st,.4),Q.start($),Q.stop($+L+.1),M(Q,st)}let q={click:$=>{x("sine",2200,$,.03,.12),x("sine",1400,$+.012,.04,.06)},whoosh:$=>S($,.7,.2,"bandpass",4500,1.4,.5,400),ding:$=>[88,95,100].forEach((L,X)=>x("sine",kn(L),$+X*.06,1.2,.05,{send:.8})),swell:$=>[57,64,69].forEach(L=>x("sawtooth",kn(L),$,1.4,.02,{a:.9,lp:500,lpEnd:3e3,send:.6}))};function et($,L){let X=$*En,Q=r($),_t=$-Q.s0,st=(_t%16+16)%16,Ut=Math.floor(_t/16),Zt=Q.up||0,Lt=Q.prog[(Ut%Q.prog.length+Q.prog.length)%Q.prog.length].map(ht=>ht+Zt),qt=Q.pumpPad&&st%4===0?.35:1;st===0&&Q.pad&&O(L,Lt.slice(0,3),Q.pad,o1*(Q.end?2.2:1),Q.cut,Q.sweep),Q.pumpPad&&st%4===2&&O(L,Lt.slice(0,3),Q.pad*.6*qt,En*1.6,Q.cut),Q.stab&&(st===0||st===6||st===12)&&C(L,Lt.slice(0,3),Q.stab),Q.bass&&(Q.dr==="drive"||Q.dr==="pump"?st%2===0:Q.dr==="march"?st%4!==3:st%4===0)&&W(L,Lt[3]+(Q.dr==="drive"&&st%8===6?12:0),Q.bass,En*(Q.dr==="half"?6:1.7),Q.cut*.25);let $t=c1[Q.dr],ct=$t.k[st],V=$t.s[st],tt=$t.h[st];if(Q.build){let ht=_t/Math.max(1,Math.round((s.maker-s.wall)/En));ht>.4&&(ct=st%2===0?1:ct),ht>.55&&(V=Math.max(V,st%(ht>.8?1:2)===0?.35+.6*ht:0))}if(ct&&P(L,ct),V&&D(L,V),tt&&R(L,tt,tt===1&&st%4===3),Q.arp){let ht=G[Q.arp],F=ht.pat[st];if(F>=0){let nt=[...Lt.slice(0,3),Lt[0]+12,Lt[1]+12,Lt[2]+12];ht.play(L,nt[F],Q.soft?.8:1,Q.cut,st)}}if(Q.lead){let ht=Math.round(Q.lead.from/En),F=_t-ht,nt=Q.lead.m==="S"?o[Q.lead.v]:a[Q.lead.m],mt=Q.lead.m==="S"?16:Q.lead.m==="R"?64:32;if(F>=0){let Ct=F%mt;Q.lead.m==="R"&&F>=mt||nt.forEach(([Dt,Xt,N])=>{Dt===Ct&&k(L,Xt+Zt,N*En,Q.soft?1:.9,Q.soft||Q.lead.m==="A")})}}e.forEach(({t:ht,big:F})=>{ht>=X&&ht<X+En&&U(L+(ht-X),F);let nt=ht-1.3;F>=.6&&nt>=X&&nt<X+En&&j(L+(nt-X),1.3,F)});for(let[ht,F]of Object.entries(n))for(let nt of F)nt>=X&&nt<X+En&&q[ht](L+(nt-X))}function Z(){let $=l.currentTime;v.forEach(L=>{try{L.g.gain.cancelScheduledValues($),L.g.gain.setTargetAtTime(1e-4,$,.02),L.src.stop($+.1)}catch{}}),v.clear()}function gt(){c&&c.gain.setTargetAtTime(m?u*.8:0,l.currentTime,.08)}return{get on(){return m},async enable(){l||b(),l.state!=="running"&&await l.resume(),m=!0,_=!1,gt()},disable(){m=!1,gt(),l&&(Z(),_=!1)},setVolume($){u=$,gt()},sync($,L){if(!l||!m)return;if(!L){_&&(Z(),_=!1);return}let X=l.currentTime;for(_&&Math.abs(X-p-$)>.12&&(Z(),_=!1),_||(p=X-$+.04,g=Math.ceil($/En),_=!0);g*En<$+.18;)et(g,p+g*En),g++}}}var we=window.INTRO,ae=we.facts,ye=(s,t=document)=>t.querySelector(s),kd=(s,t=document)=>[...t.querySelectorAll(s)],Ti=ye("#stage"),ih=ye("#player"),eh=s=>s.split("|")[1].replace(/시부$/,""),ir=s=>Math.round(s).toLocaleString("ko-KR"),U0=(s,t=1)=>`${(s/1e4).toFixed(s>=1e6?0:t)}\uB9CC`,F0=s=>{let t=Math.round(s/100);return t>=1e4?`${Math.floor(t/1e4)}\uC870 ${ir(t%1e4)}\uC5B5`:`${ir(t)}\uC5B5`},T0=s=>`${Math.round(s*100)}%`,d1=Object.entries(we.land.v).filter(([,s])=>s).sort((s,t)=>t[1]-s[1]).slice(0,3),E0=we.rice.fc.at(-1),f1=we.power.k,sr=we.power.months,C0=s=>sr.reduce((t,e,n)=>e.startsWith(s)?t+f1[n]:t,0),O0=String(+sr.at(-1).slice(0,4)-(sr.at(-1).endsWith("12")?0:1)),p1=C0(O0)/C0(sr[0].slice(0,4)),zd=we.gohyang,EE=zd.years[0],CE=zd.years.at(-1),xo=s=>s.map(t=>`<span class="ln">${[...t].map(e=>`<span class="ch${e===" "?" sp":""}">${e===" "?"&nbsp;":e}</span>`).join("")}</span>`).join(""),th=s=>`<ul class="pts">${s.map(([t,e])=>`<li><b>${t}</b><span>${e}</span></li>`).join("")}</ul>`,nr=(s,t,e,n,i,r="",a="")=>`
  <section class="sc ${a}" id="sc-${s}">
    <p class="kicker"><b>${t}</b>${e}</p>
    <h2 class="hl">${xo(n)}</h2>
    ${i?`<p class="it-sub">${i}</p>`:""}
    ${r}
  </section>`,_o=s=>`linear-gradient(90deg, ${s.join(", ")})`,As=(s,{dec:t=0,suf:e="",from:n}={})=>`<b class="cnt" data-n="${s}" data-dec="${t}" data-suf="${e}"${n!=null?` data-from="${n}"`:""}>${(+s).toFixed(t)}${e}</b>`,hi=we.spots,R0=[...hi.rio.regions].sort((s,t)=>t.lq-s.lq)[0],m1=hi.soil.pg.reduce((s,t)=>s+t,0),g1=(hi.soil.pg[0]+hi.soil.pg[1])/m1*100,RE=[...hi.lv.kinds].sort((s,t)=>t[1]-s[1]),PE=hi.lv.kinds.reduce((s,[,t])=>s+t,0),P0=Object.entries(hi.dev).sort((s,t)=>t[1]-s[1])[0],sh=[{id:"rio",no:"08",name:"\uC9C0\uC5ED\uC0B0\uC5C5\uC5F0\uAD00\uD45C(\uB18D\uC5C5)",href:"rio",big:As(Math.round(hi.rio.total/1e6)),unit:"\uC870\uC6D0 \uB18D\uC2DD\uD488 \uC0B0\uCD9C",line:"17\uAC1C \uC2DC\uB3C4\uB9C8\uB2E4 \uB18D\uC2DD\uD488\uC774 \uB9CC\uB4DC\uB294 \uC0DD\uC0B0\xB7\uBD80\uAC00\uAC00\uCE58\xB7\uC77C\uC790\uB9AC \uD30C\uAE09\uD6A8\uACFC",pts:[[`${R0.name} ${R0.lq}`,"\uB18D\uC2DD\uD488 \uD2B9\uD654\uB3C4 1\uC704 \u2014 \uC804\uAD6D \uD3C9\uADE0\uC758 3.6\uBC30"],[`${ae.rio.sectors}\uAC1C \uC0B0\uC5C5`,"\uBB34\uC5C7\uC774 \uB4E4\uC5B4\uAC00\uACE0 \uC5B4\uB514\uC5D0 \uC4F0\uC774\uB294\uC9C0\uAE4C\uC9C0"]]},{id:"employ",no:"09",name:"\uB18D\uC5C5\uACE0\uC6A9",href:"employ",big:As(+ae.employ.to-+ae.employ.from+1),unit:"\uB144\uC758 \uB18D\uC5C5 \uC77C\uC790\uB9AC",line:`\uB18D\uB9BC\uC5B4\uC5C5 \uCDE8\uC5C5\uC790 ${Math.round(ae.employ.a0/10)}\uB9CC \uBA85\uC774 ${Math.round(ae.employ.a1/10)}\uB9CC \uBA85\uC774 \uB418\uAE30\uAE4C\uC9C0`,pts:[[`${ir(ae.employ.months)}\uAC1C\uC6D4`,"\uC6D4\uBCC4 \xB7 \uACC4\uC808 \xB7 \uC2DC\uAD70\uBCC4 \xB7 \uC5F0\uB839\xB7\uC885\uC0AC\uC0C1\uC9C0\uC704\xB7\uB178\uB3D9\uC2DC\uAC04"]]},{id:"agfin",no:"10",name:"\uB18D\uC5C5\uAE08\uC735\uBCF4\uD5D8",href:"agfin",big:As(ae.agfin.coops),unit:"\uAC1C \uB18D\xB7\uCD95\uD611",line:"\uC870\uD569\uB9C8\uB2E4 \uACF5\uC2DC \uC7AC\uBB34\uB97C \uC9C0\uB3C4 \uC704\uC5D0",pts:[[F0(ae.agfin.paid),`${ae.agfin.year} \uB18D\uC791\uBB3C\uC7AC\uD574\uBCF4\uD5D8 \uBCF4\uD5D8\uAE08 \xB7 \uAC00\uC785 ${U0(ae.agfin.cnt)}\uAC74`],[`${ae.agfin.cats}\uAC1C \uBD84\uC57C`,"\uACFC\uC218\xB7\uC2DD\uB7C9\xB7\uCC44\uC18C\xB7\uC2DC\uC124 \uC7AC\uD574\uBCF4\uD5D8\uC744 \uC2DC\uAD70 \uB2E8\uC704\uB85C"]]},{id:"ruraldev",no:"11",name:"\uB18D\uCD0C\uAC1C\uBC1C",href:"ruraldev",big:As(ae.ruraldev.sites),unit:"\uAC1C \uC0AC\uC5C5 \uC9C0\uAD6C",line:"\uB18D\uC5B4\uCD0C\uACF5\uC0AC \uC9C0\uAD6C\uC758 \uC720\uD615\xB7\uC704\uCE58\xB7\uC900\uACF5 \uC608\uC815, \uC608\uC0B0\uD604\uC561\uAE4C\uC9C0",cls:"right",pts:[[`${eh(P0[0])} ${P0[1]}\uACF3`,"\uC9C0\uAD6C\uAC00 \uAC00\uC7A5 \uB9CE\uC740 \uC2DC\uAD70"],[`${ae.ruraldev.cats}\uAC1C \uAC08\uB798`,"\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5 \uC608\uC0B0\uC744 \uB18D\uAC00\uB2F9\uC73C\uB85C"]]},{id:"soil",no:"12",name:"\uB18D\uACBD\uC9C0 \uD1A0\uC591",href:"soil",big:As(Math.round(ae.soil.tests/1e4)),unit:"\uB9CC \uAC74 \uD1A0\uC591\uAC80\uC815",line:`\uD759\uC758 \uC591\uBD84 ${ae.soil.chem}\uAC00\uC9C0\uC640 \uB545\uC758 \uC801\uC131\uB4F1\uAE09`,pts:[[`${g1.toFixed(1)}%`,"\uB17C\uC73C\uB85C 1\xB72\uAE09\uC778 \uB545 \u2014 \uAD6D\uD1A0\uC5D0\uC11C \uC88B\uC740 \uB545\uC740 \uC774\uB9CC\uD07C"],[`${ae.soil.obst}\uAC00\uC9C0`,"\uB4F1\uAE09\uC744 \uB0AE\uCD94\uB294 \uC800\uD574\uC694\uC778\uAE4C\uC9C0"]]},{id:"livestock",no:"13",name:"\uCD95\uC0B0 \uD658\uACBD",href:"livestock",big:As(ae.livestock.villages),unit:"\uAC1C \uB9C8\uC744",line:`\uC810 \uD558\uB098\uAC00 \uB9C8\uC744 \uD558\uB098 \u2014 ${ae.livestock.from}~${ae.livestock.to} \uAC00\uCD95\uBD84\uB1E8 \uBC1C\uC0DD`,pts:[]}],_1=[["home","\uC8FC\uC694\uD1B5\uACC4"],["rice","\uBCBC \uC791\uD669"],["rio","\uC0B0\uC5C5\uC5F0\uAD00\uD45C"],["flow","\uBB3C\uB958\uB3D9\uD5A5"],["power","\uB18D\uC0AC\uC6A9 \uC804\uAE30"],["employ","\uB18D\uC5C5\uACE0\uC6A9"],["agfin","\uAE08\uC735\uBCF4\uD5D8"],["jikbul","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791"],["ruraldev","\uB18D\uCD0C\uAC1C\uBC1C"],["soil","\uB18D\uACBD\uC9C0 \uD1A0\uC591"],["livestock","\uCD95\uC0B0 \uD658\uACBD"],["home_sat","\uC704\uC131\uC9C0\uB3C4"],["rice_sat","\uC704\uC131 \uC601\uC0C1"],["home_hn","\uC2DC\uAD70 \uD604\uD669\uD310"],["status","\uC790\uB8CC \uC218\uC9D1 \uD604\uD669"]];Ti.insertAdjacentHTML("beforeend",`
  <div class="copy">
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${xo(["\uC9C0\uC5ED\uB18D\uC5C5","\uD604\uD669\uD310"])}</h1>
      <p class="it-sub">\uC9C0\uC5ED \uB18D\uC5C5\uC758 \uBAA8\uB4E0 \uC22B\uC790\uB97C, \uC2DC\uAD70 \uB2E8\uC704\uB85C \uD55C \uD654\uBA74\uC5D0</p>
    </section>
    ${nr("stats","01","\uC8FC\uC694\uD1B5\uACC4",[`${we.map.sigun.length}\uAC1C \uC2DC\uAD70,`,`${ae.metrics}\uAC1C \uC9C0\uD45C`],"\uC804\uAD6D\xB7\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uAC19\uC740 \uB208\uAE08\uC73C\uB85C",th([[`${ir(ae.parcels/1e4)}\uB9CC`,"\uD544\uC9C0 \u2014 \uD31C\uB9F5 \uB18D\uACBD\uC9C0\uB97C \uC804\uBD80 \uBC1B\uC544 \uC9C1\uC811 \uBD84\uC11D"],[`${ae.parcelMed}\u33A1`,`\uC804\uAD6D \uB18D\uACBD\uC9C0 \uC911\uC559\uAC12 \xB7 0.1ha \uBBF8\uB9CC\uC774 ${T0(ae.parcelSmall)}`],[T0(ae.paddyArmt),"\uB17C \uACBD\uC9C0\uC815\uB9AC\uC728\uC744 \uC2DC\uAD70\uB9C8\uB2E4 \uACAC\uC900\uB2E4"]]))}
    ${nr("real","02","\uC2E4\uC81C \uD654\uBA74",["\uACE0\uB974\uBA74, \uADF8 \uC2DC\uAD70\uC758","\uD604\uD669\uD310\uC774 \uB41C\uB2E4"],"\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uACE0\uB974\uAC70\uB098 \uC9C0\uB3C4\uB97C \uB204\uB974\uBA74<br>\uBAA8\uB4E0 \uCE78\uC774 \uADF8 \uC9C0\uC5ED \uC22B\uC790\uB85C \uBC14\uB01D\uB2C8\uB2E4",th([["\uC804\uB144 \uB300\uBE44","\uC99D\uAC10\uC774 \uC704\uCABD \uB760\uB85C \uD750\uB978\uB2E4"],["\uC2DC\uB3C4 \uC548 \uC21C\uC704","\uC9C0\uB3C4 \uC544\uB798\uC5D0\uC11C \uBC14\uB85C \uBE44\uAD50"],["\uC8FC\uC18C \uACF5\uC720","\uBCF4\uB358 \uD654\uBA74\uC744 \uADF8\uB300\uB85C \uBCF4\uB0B8\uB2E4"]]),"narrow")}
    ${nr("sat","03","\uC704\uC131\uC9C0\uB3C4",["\uD1B5\uACC4 \uB4A4\uC758","\uC2E4\uC81C \uB545\uC744 \uBCF8\uB2E4"],"",th([["\uD56D\uACF5\uC601\uC0C1",`\uD31C\uB9F5 \uD544\uC9C0 \xB7 \uC720\uD1B5\uC2DC\uC124 ${ir(ae.facilities)}\uACF3 \xB7 \uC8FC\uC81C\uB3C4`],["\uB17C NDVI","Sentinel-2 10m \u2014 \uB17C\uB9C8\uB2E4 \uBCBC\uAC00 \uC5BC\uB9C8\uB098 \uD478\uB978\uC9C0"],["5\uC77C\uB9C8\uB2E4","\uAD6C\uB984 \uB080 \uB0A0\uC740 \uB808\uC774\uB354\uB85C, 2017\uB144\uBD80\uD130 \uB0A0\uC9DC\uBCC4\uB85C"]]),"narrow")}
    ${nr("rice","04","\uBCBC \uC791\uD669",["\uC300 \uC218\uD655\uB7C9\uC744","7\uC6D4\uBD80\uD130 \uBBF8\uB9AC"],"\uAE30\uC0C1\xB7\uC704\uC131\xB7\uBCD1\uD574\uCDA9 \uC608\uCC30\uB85C<br>\uC2DC\uAD70\uBCC4 \uB2E8\uC218\uB97C 7\uBC88 \uC608\uCE21",`<div class="big b1">${As(E0.y,{dec:1})}<small>kg/10a</small></div>
       <p class="big-cap b1">${we.rice.year} \uC804\uAD6D \uB2E8\uC218 \uC608\uCE21 \xB7 ${E0.lab}</p>
       <div class="big b2">${As(ae.riceAcc.m0915,{dec:1,from:ae.riceAcc.norm})}<small>kg \uD3C9\uADE0 \uC624\uCC28</small></div>
       <p class="big-cap b2">9\uC6D4 15\uC77C \uC608\uCE21 \xB7 \uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1 ${ae.riceAcc.stat}kg\uACFC \uAC19\uC740 \uC218\uC900\uC744 3\uC8FC \uBA3C\uC800</p>`)}
    ${nr("jik","05","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",["\uC9C1\uBD88\uAE08, \uC6B0\uB9AC \uC9C0\uC5ED\uC5D0","\uC5BC\uB9C8\uB098 \uC624\uB098"],"\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5 \uC608\uC0B0\uD604\uC561\uC744<br>\uC790\uB3D9\uC73C\uB85C \uBAA8\uC544 \uC2DC\uAD70\xB7\uB18D\uAC00\uB2F9\uC73C\uB85C",`<ul class="chips"><li><b>${F0(we.jikbul.pubNat)}</b>\uACF5\uC775\uC9C1\uBD88 ${we.jikbul.year}</li><li><b>${we.jikbul.bizCount}\uAC1C</b>\uC2DC\uAD70 \uC138\uBD80\uC0AC\uC5C5</li><li><b>\uACE0\uD5A5\uC0AC\uB791\uAE30\uAE08</b>${zd.govs}\uACF3\uB3C4</li></ul>`)}
    ${nr("flow","06","\uBB3C\uB958\uB3D9\uD5A5",["\uC218\uBC15 \uD30C\uB81B\uD2B8\uAC00","\uC6C0\uC9C1\uC774\uB294 \uAE38"],`\uBB3C\uB958\uAE30\uAE30 \uACF5\uB3D9\uC774\uC6A9 ${ae.od.years}\uB144 \xB7 ${ae.od.crops}\uAC1C \uD488\uBAA9 \uC911<br>${we.flows.year}\uB144 \uC218\uBC15 \uD30C\uB81B\uD2B8 ${ir(we.flows.total)}\uAC1C\uC758 \uC774\uB3D9`,`<ol class="pairs">${we.flows.top.slice(0,3).map(([s,t,e])=>`<li><span class="o">${eh(s)}</span><i></i><span class="d">${eh(t)}</span><b>${ir(e)}\uAC1C</b></li>`).join("")}</ol>`)}
    ${nr("power","07","\uB18D\uC0AC\uC6A9 \uC804\uAE30",["\uACC4\uC808\uC744 \uB530\uB77C \uB3C4\uB294","\uB18D\uC5C5 \uC804\uB825"],`\uD55C\uC804 ${ae.power.regions}\uAC1C \uC9C0\uC5ED \xB7 ${ae.power.months}\uAC1C\uC6D4`,`<ul class="it-facts">
        <li><b>4\uAC00\uC9C0</b><span>${ae.power.types.join("\xB7")} \uACC4\uC808 \uC720\uD615 \uC790\uB3D9 \uBD84\uB958</span></li>
        <li><b>\uD3C9\uB144 \uBC94\uC704</b><span>\uBC97\uC5B4\uB09C \uC9C0\uC5ED\uC744 \uB2EC\uB9C8\uB2E4 \uC9DA\uB294\uB2E4</span></li>
        <li><b>${p1.toFixed(1)}\uBC30</b><span>${sr[0].slice(0,4)}\uB144\uBCF4\uB2E4 \uB298\uC5B4\uB09C ${O0}\uB144 \uC0AC\uC6A9\uB7C9</span></li>
      </ul>`)}
    ${sh.map(s=>`
      <section class="sc spot ${s.cls||""}" id="sc-${s.id}">
        <p class="kicker"><b>${s.no}</b>${s.name}</p>
        <div class="spot-big">${s.big}<small>${s.unit}</small></div>
        <p class="spot-line">${s.line}</p>
        ${s.pts.length?th(s.pts):""}
      </section>`).join("")}
  </div>
  <div class="labels">${d1.map(([s,t])=>`<div class="lab" data-k="${s}"><b>${eh(s)}</b><span>${U0(t)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>\uACBD\uC9C0\uBA74\uC801 ${we.land.year}</span><i class="bar" style="background:${_o(mo)}"></i><span>\uB192\uC774\xB7\uC0C9\uC774 \uD074\uC218\uB85D \uB113\uB2E4</span></div>
    <div class="it-lg" id="lg-rice"><span>\uD3C9\uB144\uBCF4\uB2E4 \uB0AE\uC74C</span><i class="bar" style="background:${_o([Zi.lo,Zi.mid,Zi.hi])}"></i><span>\uB192\uC74C \xB7 ${we.rice.year} \uC2DC\uAD70 \uC608\uCE21</span></div>
    <div class="it-lg" id="lg-jik"><span>\uC801\uC74C</span><i class="bar" style="background:${_o(Qr)}"></i><span>\uB9CE\uC74C \xB7 \uB18D\uAC00\uB2F9 \uACF5\uC775\uC9C1\uBD88(\uAE30\uBCF8\uD615) \uC608\uC0B0 ${we.jikbul.year}</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${ri.melonO}"></i><span>\uBCF4\uB0B8 \uC0B0\uC9C0</span><i class="it-dot" style="background:${ri.melonD}"></i><span>\uBC1B\uC740 \uACF3 \xB7 \uC218\uBC15 \uD30C\uB81B\uD2B8 ${we.flows.year}\uB144 ${we.flows.months} \xB7 \uC0C1\uC704 50</span></div>
    <div class="it-lg" id="lg-coop"><i class="it-dot" style="background:#f5a524"></i><span>\uC9C0\uC5ED\uB18D\uD611 ${hi.coopKinds.L}</span><i class="it-dot" style="background:#ff7a59"></i><span>\uCD95\uD611 ${hi.coopKinds.X}</span><i class="it-dot" style="background:#7cc98f"></i><span>\uD488\uBAA9\uB18D\uD611 ${hi.coopKinds.I} \xB7 \uC810 \uD06C\uAE30 = \uC790\uC0B0</span></div>
    <div class="it-lg" id="lg-dev"><span>\uC801\uC74C</span><i class="bar" style="background:${_o(Kc)}"></i><span>\uB9CE\uC74C \xB7 \uAE30\uB465 \uB192\uC774 = \uC2DC\uAD70 \uC0AC\uC5C5 \uC9C0\uAD6C \uC218 (\uD55C\uAD6D\uB18D\uC5B4\uCD0C\uACF5\uC0AC)</span></div>
    <div class="it-lg" id="lg-lv"><span>\uB9C8\uC744\uB2F9 \uBD84\uB1E8 \uC801\uC74C</span><i class="bar" style="background:${_o(jc)}"></i><span>\uB9CE\uC74C \xB7 \uAD6D\uB9BD\uD658\uACBD\uACFC\uD559\uC6D0 \uC804\uAD6D\uC624\uC5FC\uC6D0\uC870\uC0AC</span></div>
    <div class="it-lg" id="lg-power"><span>\uC804\uAD6D \uB18D\uC0AC\uC6A9 \uC804\uB825 \uC6D4 \uC0AC\uC6A9\uB7C9 \xB7 ${sr[0].replace("-",".")}~${sr.at(-1).replace("-",".")}</span></div>
  </div>`);var Ve=y0(Ti,we,["home","home_jn","home_hn","home_sat","rice_sat"]);M0(Ti,_1);var ws=we.shots.ndvi||{};Ti.insertAdjacentHTML("beforeend",`
  <div class="nd" id="nd">
    <div class="nd-frame">
      <img class="nd-w" src="assets/intro/shots/ndvi_wide.webp" alt="" decoding="async" style="transform-origin:${(ws.fx??.3)*100}% ${(ws.fy??.42)*100}%">
      <img class="nd-z" src="assets/intro/shots/ndvi_zoom.webp" alt="" decoding="async" style="transform-origin:40% 63%">
      <img class="nd-c" src="assets/intro/shots/ndvi_close.webp" alt="" decoding="async">
      <span class="nd-ring" style="left:${(ws.fx??.3)*100}%;top:${(ws.fy??.42)*100}%"></span>
      <div class="nd-tag"><b>${ws.where||"\uAE40\uC81C\uC2DC"} \uB17C NDVI</b><span>Sentinel-2 \xB7 ${ws.date?ws.date.replace(/-/g,"."):""} \xB7 \uAD6C\uB984 ${ws.cloud??"\u2013"}%</span></div>
      <div class="nd-lg"><span>\uB0AE\uC74C</span><i></i><span>\uB192\uC74C \xB7 \uBCBC\uAC00 \uD478\uB97C\uC218\uB85D \uCD08\uB85D</span></div>
    </div>
  </div>`);var B0=(s,t,e,n,i)=>(Ti.insertAdjacentHTML("beforeend",`<div class="mini" id="mini-${s}" style="left:${e}px;top:${n}px;width:${i}px"><div class="scr-bar"><i></i><i></i><i></i><span class="scr-url">ag-rstat.vercel.app/${t}</span></div><div class="mini-view" style="height:${Math.round(i*9/16)}px"><img src="assets/intro/shots/${t}.webp" alt="" decoding="async"></div></div>`),ye(`#mini-${s}`));B0("rio","rio",150,560,600);B0("employ","employ",1250,96,560);Ti.insertAdjacentHTML("beforeend",`
  <div class="wall-copy" id="sc-wall">
    <p class="kicker"><b>14</b>\uC790\uB8CC \uC218\uC9D1 \uD604\uD669</p>
    <h2 class="hl">${xo([`\uC790\uB8CC ${ae.status.items}\uC885, ${ae.status.auto}\uC885\uC740 \uC2A4\uC2A4\uB85C \uAC31\uC2E0`])}</h2>
    <p class="it-sub">${ae.status.orgs}\uAC1C \uAE30\uAD00\uC758 \uACF5\uAC1C \uC790\uB8CC \xB7 \uBB34\uC5C7\uC744 \uC5B8\uC81C \uBC1B\uC558\uB294\uC9C0\uAE4C\uC9C0 \uACF5\uAC1C</p>
  </div>
  <div class="maker" id="sc-maker">
    <figure class="mk-photo"><img src="assets/maker.webp" alt="" width="360" height="540"></figure>
    <div class="mk-text">
      <p class="kicker"><b>15</b>\uB9CC\uB4E0 \uC774</p>
      <h2 class="hl">${xo(["\uB9CC\uB4E0 \uC774\uC758 \uC0DD\uAC01"])}</h2>
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
    <h2 class="hl">${xo(["\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310"])}</h2>
    <p class="url">ag-rstat.vercel.app</p>
    <p class="srcs">\uAD6D\uAC00\uB370\uC774\uD130\uCC98 \xB7 \uD55C\uAD6D\uC740\uD589 \xB7 \uD55C\uC804 \xB7 \uB18D\uCD0C\uC9C4\uD765\uCCAD \xB7 \uC9C0\uBC29\uC7AC\uC815365 \uB4F1 ${ae.status.orgs}\uAC1C \uAE30\uAD00 \uACF5\uAC1C \uC790\uB8CC</p>
    <div class="btns"><a class="btn pri" href="./">\uD604\uD669\uD310 \uC5F4\uAE30</a><button type="button" class="btn" id="again">\uB2E4\uC2DC \uBCF4\uAE30</button></div>
  </div>`);var tn={scene:0,bgI:0,glow:0,morph:0,pAlpha:1,mapAlpha:0,rise:0,tilt:0,orbit:0,camDist:23.5,camX:0,camY:0,mapShift:300,mapLift:0,riceColor:0,jikColor:0,mapDim:0,glAlpha:1,labels:0,riceAlpha:0,riceLine:0,riceFc:0,accAlpha:0,riceAcc:0,bdAlpha:0,bdBars:0,bdSplit:0,flows:0,flowAlpha:0,spiral:0,powerAlpha:0,rioA:0,rioP:0,empA:0,empP:0,coopA:0,coopP:0,devRise:0,devColor:0,soilA:0,soilP:0,lvA:0,lvP:0},ea=m0(ye("#gl"),we),k0=g0(ye("#fx"),we,ea),x1=_0(ye("#rice"),we),v1=x0(ye("#rice"),we),z0=w0(ye("#sp"),ye("#spsvg"),we,ea),yo={draw(){},canvas:ye("#bg"),kind:"\u2026"},y1=kd(".lab",Ti),nh=960,Fd=540;function G0(){let s=ih.clientWidth/hn;Ti.style.transform=`scale(${s})`;let t=Math.min(window.devicePixelRatio||1,1.75),e=Math.min(2880,Math.max(640,Math.round(hn*s*t))),n=Math.round(e*Ji/hn);ea.resize(e,n),k0.resize(e,n),z0.resize(e,n),nh=Math.max(480,Math.round(e/2)),Fd=Math.round(nh*Ji/hn),yo.canvas.width=nh,yo.canvas.height=Fd}new ResizeObserver(G0).observe(ih);var ft={open:0,stats:5,real:12,sat:21,rice:29,jik:40,flow:48,power:54,spot:59,SPOT:5,wall:89.4,maker:94.4,end:102,total:106},na=[{t:ft.open,name:"\uC5F4\uAE30"},{t:ft.stats,name:"\uC8FC\uC694\uD1B5\uACC4",href:"./"},{t:ft.real,name:"\uC2E4\uC81C \uD654\uBA74",href:"./"},{t:ft.sat,name:"\uC704\uC131\uC9C0\uB3C4",href:"./"},{t:ft.rice,name:"\uBCBC \uC791\uD669",href:"rice"},{t:ft.jik,name:"\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",href:"jikbul"},{t:ft.flow,name:"\uBB3C\uB958\uB3D9\uD5A5",href:"flow"},{t:ft.power,name:"\uB18D\uC0AC\uC6A9 \uC804\uAE30",href:"power"},...sh.map((s,t)=>({t:ft.spot+t*ft.SPOT,name:s.name,href:s.href})),{t:ft.wall,name:"\uC790\uB8CC \uC218\uC9D1 \uD604\uD669",href:"status"},{t:ft.maker,name:"\uB9CC\uB4E0\uC774",href:"about"},{t:ft.end,name:"\uB2EB\uAE30"}],rr=ft.total,kt=Zn.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),Yt=(s,t,e,n="power2.inOut")=>kt.to(tn,{...s,duration:e,ease:n},t),ui=(s,t,e=1.2)=>Yt({scene:s},t,e);function Ci(s,t){let e=typeof s=="string"?ye(s):s;kt.set(e,{autoAlpha:1,y:0},t).fromTo(e.querySelector(".kicker"),{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.6,ease:"power3.out"},t);let n=e.querySelectorAll(".hl .ch");n.length&&kt.fromTo(n,{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.85,stagger:Math.min(.028,.5/n.length),ease:"expo.out"},t+.1);let i=e.querySelector(".it-sub");i&&kt.fromTo(i,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.7,ease:"power2.out"},t+.5)}var Ri=(s,t)=>kt.to(typeof s=="string"?ye(s):s,{autoAlpha:0,y:-24,duration:.45,ease:"power2.in"},t),ar=(s,t,e=.16)=>{let n=kd(`${s} .pts li, ${s} .it-facts li, ${s} .pairs li, ${s} .chips li`);n.length&&kt.fromTo(n,{autoAlpha:0,x:-16},{autoAlpha:1,x:0,stagger:e,duration:.55,ease:"power2.out"},t)},V0=[];function Gd(s,t,e){let n=+s.dataset.n,i=+(s.dataset.dec||0),r=s.dataset.suf||"",a=s.dataset.from!=null?+s.dataset.from:i?n*.94:0,o={v:a,last:""};V0.push({elm:s,o,dec:i,suf:r}),kt.fromTo(o,{v:a},{v:n,duration:e,ease:"power3.out"},t)}var Ts=(s,t,e)=>kt.fromTo(`#lg-${s}`,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},t).to(`#lg-${s}`,{autoAlpha:0,duration:.4},e),H0=Ve.zoom,Vd=(s,t,e=.4)=>{Object.entries(Ve.imgs).forEach(([n,i])=>kt.to(i,{autoAlpha:n===s?1:0,duration:e,ease:"power1.inOut"},t))},M1=(s,t,e,n="sine.inOut",i)=>kt.to(H0,{...Ve.focus(s,i),duration:e,ease:n},t);function Hd(s,t,e=.8){let n=Ve.at(s);kt.to(Ve.cursor,{x:n.x,y:n.y,duration:e,ease:"power3.inOut"},t-e).fromTo(Ve.cursor.querySelector(".ripple"),{scale:.2,autoAlpha:.9},{scale:2.6,autoAlpha:0,duration:.55,ease:"power2.out"},t).fromTo(Ve.cursor.querySelector("svg"),{scale:1},{scale:.82,duration:.08,yoyo:!0,repeat:1,ease:"power1.inOut"},t)}Zn.set(".sc, .it-lg, .outro, .maker, .wall-copy, #scr-wrap, #wall-wrap, .mk, #nd, .nd-z, .nd-c, .mini",{autoAlpha:0});Zn.set(H0,{scale:1,x:0,y:0,transformOrigin:"0 0"});Zn.set(Ve.cursor,{x:1100,y:645,autoAlpha:0});Zn.set(Ve.cursor.querySelector(".ripple"),{autoAlpha:0});Zn.set(Object.values(Ve.imgs),{autoAlpha:0});Yt({bgI:1},0,1.6,"power1.out");Yt({morph:1},.15,3.6,"none");Yt({glow:.5},1.2,2.2);Ci("#sc-open",.45);kt.fromTo("#sc-open .mark",{scale:.4,rotate:-90},{scale:1,rotate:0,duration:1.2,ease:"back.out(2)"},.45);Ri("#sc-open",4.4);Yt({mapAlpha:1},3.3,1.2);Yt({pAlpha:.32},3.8,1);ui(1,4.6,1.4);Yt({tilt:1},5,2.3);Yt({rise:1},5.5,2.5,"power2.out");Yt({orbit:.36,camDist:21.2},5,6.8,"sine.inOut");Yt({pAlpha:0},6.2,1.2);Ci("#sc-stats",5.1);ar("#sc-stats",6.4,.22);Ts("stats",6,11.2);Yt({labels:1},8,.6,"power2.out");Yt({labels:0},11,.4);Ri("#sc-stats",11.3);ui(2,11.6);Yt({glAlpha:0},11.5,.8);var un=ft.real;kt.set(Ve.imgs.home,{autoAlpha:1},un).fromTo("#scr-wrap",{autoAlpha:0,rotateY:-30,rotateX:10,x:220,z:-320},{autoAlpha:1,rotateY:-8,rotateX:3,x:0,z:0,duration:1.4,ease:"expo.out"},un);Ci("#sc-real",un+.3);ar("#sc-real",un+1.6,.2);kt.set(Ve.cursor,{autoAlpha:1},un+1.2);Hd(Ve.box("home","#sido"),un+2.6,1.2);Vd("home_jn",un+2.75);Hd(Ve.box("home_jn","#sgg"),un+4.2,.9);Vd("home_hn",un+4.35);kt.to(Ve.cursor,{autoAlpha:0,duration:.3},un+5);[[".ticker","\uC804\uB144 \uB300\uBE44 \uC99D\uAC10\uC774 \uD750\uB978\uB2E4","bottom"],["#map-card","\uC9C0\uB3C4\uB97C \uB204\uB974\uBA74 \uADF8 \uC2DC\uAD70\uC73C\uB85C","top"],[".col-right","\uC791\uBB3C\xB7\uC18C\uB4DD\xB7\uC608\uC0B0\xB7\uB18D\uAC00\uACBD\uC81C","top"]].forEach(([s,t,e],n)=>{let i=Ve.mark(`r${n}`,Ve.box("home",s),t,e);i&&kt.fromTo(i,{autoAlpha:0,scale:1.04},{autoAlpha:1,scale:1,duration:.45,ease:"power2.out"},un+5.2+n*.55).to(i,{autoAlpha:0,duration:.3},un+8.3)});kt.to("#scr-wrap",{rotateY:-4,rotateX:1.5,duration:7,ease:"sine.inOut"},un+1.4);ui(3,ft.sat-.4);Ri("#sc-real",ft.sat-.3);kt.set(Ve.cursor,{autoAlpha:1},ft.sat-1);Hd(Ve.box("home_hn","#view-btn"),ft.sat+.1,.9);Vd("home_sat",ft.sat+.25,.5);kt.to(Ve.cursor,{autoAlpha:0,duration:.3},ft.sat+.7);Ci("#sc-sat",ft.sat+.3);ar("#sc-sat",ft.sat+1.4,.5);M1([300,120,960,600],ft.sat+.8,3.4,"sine.inOut",1);kt.to("#scr-wrap",{autoAlpha:0,scale:.92,rotateY:-16,x:-80,duration:.7,ease:"power2.in"},ft.sat+2.6);kt.set("#nd",{autoAlpha:1},ft.sat+2.8).fromTo("#nd .nd-frame",{autoAlpha:0,scale:.9,rotateY:14},{autoAlpha:1,scale:1,rotateY:0,duration:1,ease:"expo.out"},ft.sat+2.8).fromTo("#nd .nd-w",{scale:1,autoAlpha:1},{scale:2.1,duration:1.8,ease:"power2.in"},ft.sat+3.6).fromTo("#nd .nd-ring",{autoAlpha:0,scale:2},{autoAlpha:1,scale:1,duration:.5,ease:"power2.out"},ft.sat+3.2).to("#nd .nd-ring",{autoAlpha:0,scale:.4,duration:.4},ft.sat+4.4).fromTo("#nd .nd-z",{autoAlpha:0,scale:1.06},{autoAlpha:1,scale:1,duration:.5,ease:"power1.out"},ft.sat+5.1).to("#nd .nd-z",{scale:2.07,duration:1.3,ease:"power2.in"},ft.sat+5.8).fromTo("#nd .nd-c",{autoAlpha:0,scale:1.04},{autoAlpha:1,scale:1.12,duration:1.4,ease:"sine.out"},ft.sat+6.9).fromTo("#nd .nd-tag, #nd .nd-lg",{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,stagger:.1},ft.sat+3.4).to("#nd",{autoAlpha:0,duration:.5,ease:"power2.in"},ft.rice-.55);Ri("#sc-sat",ft.rice-.6);ui(4,ft.rice-.4);kt.set(tn,{riceColor:1,jikColor:0,mapDim:0,rise:0,tilt:.24,orbit:0,camDist:23,camX:0,camY:0,labels:0,pAlpha:0},ft.rice-.3);Yt({glAlpha:1},ft.rice-.25,.9);Ci("#sc-rice",ft.rice+.2);kt.set("#sc-rice .b2",{autoAlpha:0},ft.rice);Yt({riceAlpha:1},ft.rice+.4,.6,"power1.out");Yt({riceLine:1},ft.rice+.6,1.9,"power1.inOut");Yt({riceFc:1},ft.rice+2.3,1.9,"power1.out");kt.fromTo("#sc-rice .b1",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.1,duration:.6,ease:"power2.out"},ft.rice+2.2);Gd(ye("#sc-rice .b1 .cnt"),ft.rice+2.2,2);Ts("rice",ft.rice+.8,ft.jik-.4);Yt({riceAlpha:0},ft.rice+5.4,.5);kt.to("#sc-rice .b1",{autoAlpha:0,y:-10,duration:.4},ft.rice+5.4);Yt({accAlpha:1},ft.rice+5.7,.4,"none");Yt({riceAcc:1},ft.rice+5.8,2.6,"power1.out");kt.fromTo("#sc-rice .b2",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},ft.rice+5.9);Gd(ye("#sc-rice .b2 .cnt"),ft.rice+5.9,2.4);Yt({accAlpha:0},ft.jik-.5,.4);Ri("#sc-rice",ft.jik-.5);ui(5,ft.jik-.3);Yt({riceColor:0,jikColor:1},ft.jik-.2,1.2);Yt({orbit:.14,tilt:.42,camDist:22},ft.jik-.2,7.6,"sine.inOut");Ci("#sc-jik",ft.jik+.2);Ts("jik",ft.jik+.6,ft.flow-.4);Yt({bdAlpha:1},ft.jik+.8,.4,"none");Yt({bdBars:1},ft.jik+.9,1.8,"power1.out");Yt({bdSplit:1},ft.jik+2.5,2.2,"power1.out");ar("#sc-jik",ft.jik+1,.18);Yt({bdAlpha:0},ft.flow-.5,.4);Ri("#sc-jik",ft.flow-.5);ui(6,ft.flow-.3);Yt({jikColor:0,mapDim:1,tilt:0,orbit:0,camDist:15.2,camX:.5,camY:1.5},ft.flow-.3,1.3);Yt({flowAlpha:1},ft.flow+.4,.3,"none");Yt({flows:1},ft.flow+.4,2.7,"power1.out");Ci("#sc-flow",ft.flow+.3);ar("#sc-flow",ft.flow+1.6,.14);Ts("flow",ft.flow+.8,ft.power-.6);Yt({flowAlpha:0},ft.power-.5,.6);Ri("#sc-flow",ft.power-.5);Yt({glAlpha:0},ft.power-.4,.8);ui(7,ft.power-.4);Yt({powerAlpha:1},ft.power-.1,.5,"power1.out");Yt({spiral:1},ft.power,3.3,"power1.inOut");Yt({glow:.32},ft.power-.4,1);Ci("#sc-power",ft.power+.1);ar("#sc-power",ft.power+1.3,.2);Ts("power",ft.power+.4,ft.spot-.6);Yt({powerAlpha:0},ft.spot-.5,.5);Ri("#sc-power",ft.spot-.5);var me=s=>ft.spot+s*ft.SPOT;function S1(s){let t=sh[s],e=me(s),n=ye(`#sc-${t.id}`);ui(8+s,e-.4,1),Ci(n,e),kt.fromTo(n.querySelectorAll(".spot-big, .spot-line"),{autoAlpha:0,y:16},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power3.out"},e+.15),Gd(n.querySelector(".cnt"),e+.15,1.6),ar(`#sc-${t.id}`,e+1.3,.3),Ri(n,e+ft.SPOT-.45)}sh.forEach((s,t)=>S1(t));Yt({rioA:1},me(0)-.2,.5,"power1.out");Yt({rioP:1},me(0)+.1,2.6,"power2.out");Yt({rioA:0},me(1)-.5,.45);var W0=(s,t,e,n)=>kt.fromTo(`#mini-${s}`,{autoAlpha:0,...n},{autoAlpha:1,x:0,y:0,rotateY:0,duration:.9,ease:"expo.out"},t).fromTo(`#mini-${s} img`,{scale:1},{scale:1.14,duration:e-t,ease:"sine.inOut"},t).to(`#mini-${s}`,{autoAlpha:0,duration:.4},e-.45);W0("rio",me(0)+.9,me(1),{y:40});W0("employ",me(1)+.5,me(2),{x:60});Yt({empA:1},me(1)-.1,.4,"none");Yt({empP:1},me(1)+.3,3.2,"power1.inOut");Yt({empA:0},me(2)-.5,.45);kt.set(tn,{mapDim:1,riceColor:0,jikColor:0,devColor:0,rise:0,devRise:0,tilt:0,orbit:0,camDist:23,camX:0,camY:0,mapShift:300,labels:0},me(2)-.6);Yt({glAlpha:1},me(2)-.5,.7);Yt({coopA:1},me(2)-.1,.3,"none");Yt({coopP:1},me(2)+.2,2.8,"power1.inOut");Ts("coop",me(2)+.5,me(3)-.4);Yt({coopA:0},me(3)-.5,.45);Yt({mapDim:0,devColor:1,mapShift:-330,tilt:.95,orbit:-.42,camDist:20.5},me(3)-.5,1.5);Yt({devRise:1},me(3)+.4,2.4,"power2.out");Yt({orbit:-.12},me(3)+1,3.6,"sine.inOut");Ts("dev",me(3)+.6,me(4)-.4);Yt({glAlpha:0},me(4)-.5,.6);Yt({soilA:1},me(4)-.1,.4,"none");Yt({soilP:1},me(4)+.2,2.8,"power1.out");Yt({soilA:0},me(5)-.5,.45);kt.set(tn,{tilt:0,orbit:0,camDist:22,mapShift:260,devRise:0,devColor:0,mapDim:.9},me(5)-.5);Yt({lvA:1},me(5)-.1,.3,"none");Yt({lvP:1},me(5)+.2,3,"power1.inOut");Ts("lv",me(5)+.6,ft.wall-.4);Yt({lvA:0},ft.wall-.5,.45);ui(14,ft.wall-.4);kt.set("#wall-wrap",{autoAlpha:1},ft.wall).fromTo("#wall .wt",{autoAlpha:0,z:-600,rotateX:-40},{autoAlpha:1,z:0,rotateX:0,duration:1.1,stagger:{each:.05,from:"center"},ease:"power3.out"},ft.wall).fromTo("#wall",{rotateZ:-7,rotateX:26,y:40},{rotateZ:-3,rotateX:18,y:0,duration:5,ease:"sine.inOut"},ft.wall).to("#wall-wrap",{autoAlpha:0,duration:.5},ft.maker-.5);Ci("#sc-wall",ft.wall+.6);Ri("#sc-wall",ft.maker-.5);ui(15,ft.maker-.4);kt.set("#sc-maker",{autoAlpha:1,y:0},ft.maker).fromTo("#sc-maker .mk-photo",{autoAlpha:0,y:40,scale:.94},{autoAlpha:1,y:0,scale:1,duration:1.2,ease:"power3.out"},ft.maker+.1).fromTo("#sc-maker .kicker",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.5},ft.maker+.4).fromTo("#sc-maker .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.04,ease:"expo.out"},ft.maker+.5).fromTo("#sc-maker .mk-phil li",{autoAlpha:0,x:-18},{autoAlpha:1,x:0,duration:.6,stagger:.55,ease:"power2.out"},ft.maker+1.4).fromTo("#sc-maker .mk-quote, #sc-maker .mk-mail",{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.7,stagger:.4,ease:"power2.out"},ft.maker+4).to("#sc-maker",{autoAlpha:0,y:-20,duration:.5,ease:"power2.in"},ft.end-.5);ui(16,ft.end-.3);Yt({glow:.55},ft.end-.3,1.2);kt.set("#sc-end",{autoAlpha:1},ft.end).fromTo("#sc-end .mark",{scale:.3,rotate:-120,autoAlpha:0},{scale:1,rotate:0,autoAlpha:1,duration:1.1,ease:"back.out(1.8)"},ft.end).fromTo("#sc-end .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.035,ease:"expo.out"},ft.end+.15).fromTo("#sc-end .url, #sc-end .srcs, #sc-end .btns",{autoAlpha:0,y:12},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},ft.end+.6).set({},{},rr);var ta=Cd.map(([s,t])=>[Ss(s).map(e=>e/255),Ss(t).map(e=>e/255)]),li=new Float32Array(16),b1=performance.now();function I0(){let s=kt.time(),t=(performance.now()-b1)/1e3,e=Math.min(Cd.length-2,Math.floor(tn.scene)),n=tn.scene-e;for(let i=0;i<3;i++)li[4+i]=ta[e][0][i]+(ta[e+1][0][i]-ta[e][0][i])*n,li[8+i]=ta[e][1][i]+(ta[e+1][1][i]-ta[e][1][i])*n;li[0]=t,li[1]=tn.bgI,li[2]=nh,li[3]=Fd,li[12]=(hn/2+tn.mapShift)/hn,li[13]=.5,li[14]=.42,li[15]=tn.glow,yo.draw(li),ea.render(tn,t),k0.render(tn,s),x1.render(tn),v1.render(tn),z0.render(tn,s),y1.forEach((i,r)=>{let a=ea.top(i.dataset.k);if(!a||tn.labels<=.01){i.style.opacity=0;return}let[o,l]=ea.project(a[0],a[1],a[2]),c=Math.min(1,Math.max(0,tn.labels*1.4-r*.2));i.style.opacity=c,i.style.transform=`translate(${o.toFixed(1)}px, ${(l-12*(1-c)).toFixed(1)}px)`}),V0.forEach(i=>{let r=i.o.v.toFixed(i.dec).replace(/\B(?=(\d{3})+(?!\d))/g,",")+i.suf;r!==i.o.last&&(i.o.last=r,i.elm.textContent=r)}),E1()}var Od=ye("#play"),Ei=ye("#track"),w1=ye("#fill"),A1=ye("#time"),Nd=ye("#go"),X0=ye("#chaps"),T1=ye("#chapname");Ei.setAttribute("aria-valuemax",rr);X0.innerHTML=na.map(s=>`<button type="button" data-t="${s.t}" style="left:${s.t/rr*100}%" title="${s.name}" aria-label="${s.name}\uBD80\uD130 \uBCF4\uAE30"></button>`).join("");var q0=[...X0.children],L0=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`,D0=-1,N0="";function E1(){let s=kt.time();w1.style.transform=`scaleX(${s/rr})`,A1.textContent=`${L0(s)} / ${L0(rr)}`,Ei.setAttribute("aria-valuenow",s.toFixed(1));let t=na.reduce((n,i,r)=>s>=i.t-.01?r:n,0);if(t!==D0){D0=t,q0.forEach((i,r)=>{i.classList.toggle("on",r===t),i.classList.toggle("past",r<t)});let n=na[t];T1.textContent=`${String(t).padStart(2,"0")} ${n.name}`,Nd.hidden=!n.href,n.href&&(Nd.href=n.href,Nd.textContent=`${n.name} \uD654\uBA74 \uC5F4\uAE30 \u2192`)}let e=kt.progress()>=1?"end":kt.paused()?"paused":"playing";e!==N0&&(N0=e,Od.dataset.state=e,Od.setAttribute("aria-label",e==="playing"?"\uBA48\uCDA4":e==="end"?"\uB2E4\uC2DC \uBCF4\uAE30":"\uC7AC\uC0DD"),ih.classList.toggle("is-paused",e==="paused"))}function $0(){kt.progress()>=1?kt.restart():kt.paused(!kt.paused())}Od.addEventListener("click",$0);ye("#again").addEventListener("click",()=>kt.restart());ye("#bigplay").addEventListener("click",()=>kt.progress()>=1?kt.restart():kt.play());q0.forEach(s=>s.addEventListener("click",t=>{t.stopPropagation(),kt.seek(+s.dataset.t+.001,!1),kt.progress()<1&&kt.play()}));var Y0=!1,Z0=s=>{let t=Ei.getBoundingClientRect();kt.seek(Math.min(1,Math.max(0,(s.clientX-t.left)/t.width))*rr,!1)};Ei.addEventListener("pointerdown",s=>{s.target.closest("button")||(Y0=!kt.paused()&&kt.progress()<1,kt.pause(),Ei.setPointerCapture(s.pointerId),Z0(s))});Ei.addEventListener("pointermove",s=>{Ei.hasPointerCapture(s.pointerId)&&Z0(s)});Ei.addEventListener("pointerup",s=>{Ei.releasePointerCapture(s.pointerId),Y0&&kt.play()});Ei.addEventListener("keydown",s=>{let t={ArrowLeft:-5,ArrowRight:5}[s.key];t&&(s.preventDefault(),s.stopPropagation(),kt.seek(Math.min(rr,Math.max(0,kt.time()+t)),!1))});document.addEventListener("keydown",s=>{if(!s.target.closest("input, textarea, select, .it-track")){if(s.key===" "||s.key==="k"){if(s.target.closest("a, button")&&s.key===" ")return;s.preventDefault(),$0()}else if(s.key==="Home")kt.seek(0,!1);else if(s.key==="ArrowRight"){let t=na.find(e=>e.t>kt.time()+.05);t&&kt.seek(t.t+.001,!1)}else if(s.key==="ArrowLeft"){let t=[...na].reverse().find(e=>e.t<kt.time()-.6);kt.seek((t?t.t:0)+.001,!1)}}});var Ud=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&!kt.paused()?(kt.pause(),Ud=!0):!document.hidden&&Ud&&(Ud=!1,kt.play())});var ci=A0({T:ft,sp:me,hits:na.slice(1).map(s=>({t:s.t,big:s.t>=ft.spot&&s.t<ft.wall?.5:s.t>=ft.maker&&s.t<ft.end?.35:1})),events:{click:[un+2.6,un+4.2,ft.sat+.1],whoosh:[un+.05,ft.sat+2.6,ft.sat+3.7,ft.sat+5.9,ft.sat+6.9],ding:[ft.rice+2.3,ft.rice+6],swell:[ft.maker+.1]}}),vo=ye("#snd"),Bd=ye("#vol"),J0=ye("#sndhint"),K0={get:s=>{try{return localStorage.getItem(s)}catch{return null}},set:(s,t)=>{try{localStorage.setItem(s,t)}catch{}}},j0=+(K0.get("intro-vol")??70);Bd.value=j0;ci.setVolume(j0/100);function Q0(){vo.setAttribute("aria-pressed",ci.on),vo.setAttribute("aria-label",ci.on?"\uC18C\uB9AC \uB044\uAE30":"\uC18C\uB9AC \uCF1C\uAE30"),vo.dataset.on=ci.on?"1":"0",ci.on&&(J0.hidden=!0)}async function Wd(){await ci.enable(),Q0()}vo.addEventListener("click",async()=>{ci.on?ci.disable():await Wd(),Q0()});J0.addEventListener("click",Wd);Bd.addEventListener("input",async()=>{let s=+Bd.value;ci.setVolume(s/100),K0.set("intro-vol",s),s>0&&!ci.on&&await Wd()});document.addEventListener("keydown",s=>{s.key==="m"&&!s.target.closest("input, textarea, select")&&vo.click()});Zn.ticker.add(()=>ci.sync(kt.time(),!kt.paused()&&kt.progress()<1));window.__intro={tl:kt,S:tn};(async()=>{yo=await lp(ye("#bg"),{gpu:!/[?&]gl\b/.test(location.search)}),Ti.dataset.gpu=yo.kind,G0();let s=Promise.all([document.fonts.ready,...kd("img",Ti).map(t=>t.decode?t.decode().catch(()=>{}):Promise.resolve())]);try{await Promise.race([s,new Promise(t=>setTimeout(t,4e3))])}catch{}Zn.ticker.lagSmoothing(250,33),Zn.ticker.add(I0),I0(),ih.classList.add("ready"),requestAnimationFrame(()=>{kt.seek(0,!1),kt.play(0)})})();})();
