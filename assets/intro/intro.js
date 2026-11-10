(()=>{function ci(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Ef(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var fn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Nr={duration:.5,overwrite:!1,delay:0},qc,Xe,Me,Pn=1e8,pe=1/Pn,Bc=Math.PI*2,ig=Bc/4,sg=0,Cf=Math.sqrt,rg=Math.cos,ag=Math.sin,Ne=function(t){return typeof t=="string"},Re=function(t){return typeof t=="function"},ui=function(t){return typeof t=="number"},ro=function(t){return typeof t>"u"},Jn=function(t){return typeof t=="object"},un=function(t){return t!==!1},Yc=function(){return typeof window<"u"},$a=function(t){return Re(t)||Ne(t)},Rf=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Je=Array.isArray,og=/random\([^)]+\)/g,lg=/,\s*/g,vf=/(?:-?\.?\d|\.)+/gi,$c=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,cs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ic=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Zc=/[+-]=-?[.\d]+/,cg=/[^,'"\[\]\s]+/gi,hg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,we,$n,zc,Jc,yn={},Qa={},Pf,If=function(t){return(Qa=Ns(t,yn))&&Ke},ao=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Ur=function(t,e){return!e&&console.warn(t)},Lf=function(t,e){return t&&(yn[t]=e)&&Qa&&(Qa[t]=e)||yn},Fr=function(){return 0},ug={suppressEvents:!0,isStart:!0,kill:!1},Za={suppressEvents:!0,kill:!1},fg={suppressEvents:!0},Kc={},Di=[],kc={},Df,cn={},Lc={},yf=30,Ja=[],Qc="",jc=function(t){var e=t[0],n,i;if(Jn(e)||Re(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Ja.length;i--&&!Ja[i].targetTest(e););n=Ja[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new ih(t[i],n)))||t.splice(i,1);return t},Ni=function(t){return t._gsap||jc(In(t))[0]._gsap},th=function(t,e,n){return(n=t[e])&&Re(n)?t[e]():ro(n)&&t.getAttribute&&t.getAttribute(e)||n},nn=function(t,e){return(t=t.split(",")).forEach(e)||t},Pe=function(t){return Math.round(t*1e5)/1e5||0},Te=function(t){return Math.round(t*1e7)/1e7||0},hs=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},dg=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},ja=function(){var t=Di.length,e=Di.slice(0),n,i;for(kc={},Di.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},eh=function(t){return!!(t._initted||t._startAt||t.add)},Nf=function(t,e,n,i){Di.length&&!Xe&&ja(),t.render(e,n,i||!!(Xe&&e<0&&eh(t))),Di.length&&!Xe&&ja()},Uf=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(cg).length<2?e:Ne(t)?t.trim():t},Ff=function(t){return t},Mn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},pg=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Ns=function(t,e){for(var n in e)t[n]=e[n];return t},Mf=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Jn(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},to=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},Ir=function(t){var e=t.parent||we,n=t.keyframes?pg(Je(t.keyframes)):Mn;if(un(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},mg=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Of=function(t,e,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},oo=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,a=e._next;r?r._next=a:t[n]===e&&(t[n]=a),a?a._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},Ui=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},as=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},gg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Gc=function(t,e,n,i){return t._startAt&&(Xe?t._startAt.revert(Za):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},_g=function s(t){return!t||t._ts&&s(t.parent)},Sf=function(t){return t._repeat?Us(t._tTime,t=t.duration()+t._rDelay)*t:0},Us=function(t,e){var n=Math.floor(t=Te(t/e));return t&&n===t?n-1:n},eo=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},lo=function(t){return t._end=Te(t._start+(t._tDur/Math.abs(t._ts||t._rts||pe)||0))},co=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Te(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),lo(t),n._dirty||as(n,t)),t},Bf=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=eo(t.rawTime(),e),(!e._dur||kr(0,e.totalDuration(),n)-e._tTime>pe)&&e.render(n,!0)),as(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-pe}},Zn=function(t,e,n,i){return e.parent&&Ui(e),e._start=Te((ui(n)?n:!n&&no(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==we?Rn(t,n,e):t._time)+e._delay),e._end=Te(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Of(t,e,"_first","_last",t._sort?"_start":0),no(e)||(t._recent=e),i||Bf(t,e),t._ts<0&&co(t,t._tTime),t},zf=function(t,e){return(yn.ScrollTrigger||ao("scrollTrigger",e))&&yn.ScrollTrigger.create(e,t)},kf=function(t,e,n,i,r){if(ah(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!Xe&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Df!==hn.frame)return Di.push(t),t._lazy=[r,i],1},xg=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},no=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},vg=function(t,e,n,i){var r=t.ratio,a=e<0||!e&&(!t._start&&xg(t)&&!(!t._initted&&no(t))||(t._ts<0||t._dp._ts<0)&&!no(t))?0:1,o=t._rDelay,l=0,c,h,f;if(o&&t._repeat&&(l=kr(0,t._tDur,e),h=Us(l,o),t._yoyo&&h&1&&(a=1-a),h!==Us(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||Xe||i||t._zTime===pe||!e&&t._zTime){if(!t._initted&&kf(t,e,i,n,l))return;for(f=t._zTime,t._zTime=e||(n?pe:0),n||(n=e&&!f),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&Gc(t,e,n,!0),t._onUpdate&&!n&&vn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&vn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Ui(t,1),!n&&!Xe&&(vn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},yg=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Fs=function(t,e,n,i){var r=t._repeat,a=Te(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Te(a*(r+1)+t._rDelay*r):a,o>0&&!i&&co(t,t._tTime=t._tDur*o),t.parent&&lo(t),n||as(t.parent,t),t},bf=function(t){return t instanceof Ze?as(t):Fs(t,t._dur)},Mg={_start:0,endTime:Fr,totalDuration:Fr},Rn=function s(t,e,n){var i=t.labels,r=t._recent||Mg,a=t.duration()>=Pn?r.endTime(!1):t._dur,o,l,c;return Ne(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(Je(n)?n[0]:n).totalDuration()),o>1?s(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},Lr=function(t,e,n){var i=ui(e[1]),r=(i?2:1)+(t<2?0:1),a=e[r],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=un(l.vars.inherit)&&l.parent;a.immediateRender=un(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new Ie(e[0],a,e[r+1])},Fi=function(t,e){return t||t===0?e(t):e},kr=function(t,e,n){return n<t?t:n>e?e:n},qe=function(t,e){return!Ne(t)||!(e=hg.exec(t))?"":e[1]},Sg=function(t,e,n){return Fi(n,function(i){return kr(t,e,i)})},Vc=[].slice,Gf=function(t,e){return t&&Jn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Jn(t[0]))&&!t.nodeType&&t!==$n},bg=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return Ne(i)&&!e||Gf(i,1)?(r=n).push.apply(r,In(i)):n.push(i)})||n},In=function(t,e,n){return Me&&!e&&Me.selector?Me.selector(t):Ne(t)&&!n&&(zc||!Os())?Vc.call((e||Jc).querySelectorAll(t),0):Je(t)?bg(t,n):Gf(t)?Vc.call(t,0):t?[t]:[]},Hc=function(t){return t=In(t)[0]||Ur("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return In(e,n.querySelectorAll?n:n===t?Ur("Invalid scope")||Jc.createElement("div"):t)}},Vf=function(t){return t.sort(function(){return .5-Math.random()})},Hf=function(t){if(Re(t))return t;var e=Jn(t)?t:{each:t},n=os(e.ease),i=e.from||0,r=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,f=i;return Ne(i)?h=f={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],f=i[1]),function(u,d,m){var _=(m||e).length,p=a[_],g,v,T,y,w,A,x,S,P;if(!p){if(P=e.grid==="auto"?0:(e.grid||[1,Pn])[1],!P){for(x=-Pn;x<(x=m[P++].getBoundingClientRect().left)&&P<_;);P<_&&P--}for(p=a[_]=[],g=l?Math.min(P,_)*h-.5:i%P,v=P===Pn?0:l?_*f/P-.5:i/P|0,x=0,S=Pn,A=0;A<_;A++)T=A%P-g,y=v-(A/P|0),p[A]=w=c?Math.abs(c==="y"?y:T):Cf(T*T+y*y),w>x&&(x=w),w<S&&(S=w);i==="random"&&Vf(p),p.max=x-S,p.min=S,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(P>_?_-1:c?c==="y"?_/P:P:Math.max(P,_/P))||0)*(i==="edges"?-1:1),p.b=_<0?r-_:r,p.u=qe(e.amount||e.each)||0,n=n&&_<0?Fg(n):n}return _=(p[u]-p.min)/p.max||0,Te(p.b+(n?n(_):_)*p.v)+p.u}},Wc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Te(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(ui(n)?0:qe(n))}},Wf=function(t,e){var n=Je(t),i,r;return!n&&Jn(t)&&(i=n=t.radius||Pn,t.values?(t=In(t.values),(r=!ui(t[0]))&&(i*=i)):t=Wc(t.increment)),Fi(e,n?Re(t)?function(a){return r=t(a),Math.abs(r-a)<=i?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=Pn,h=0,f=t.length,u,d;f--;)r?(u=t[f].x-o,d=t[f].y-l,u=u*u+d*d):u=Math.abs(t[f]-o),u<c&&(c=u,h=f);return h=!i||c<=i?t[h]:a,r||h===a||ui(a)?h:h+qe(a)}:Wc(t))},Xf=function(t,e,n,i){return Fi(Je(t)?!e:n===!0?!!(n=0):!i,function(){return Je(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},Tg=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,a){return a(r)},i)}},wg=function(t,e){return function(n){return t(parseFloat(n))+(e||qe(n))}},Ag=function(t,e,n){return Yf(t,e,0,1,n)},qf=function(t,e,n){return Fi(n,function(i){return t[~~e(i)]})},Eg=function s(t,e,n){var i=e-t;return Je(t)?qf(t,s(0,t.length),e):Fi(n,function(r){return(i+(r-t)%i)%i+t})},Cg=function s(t,e,n){var i=e-t,r=i*2;return Je(t)?qf(t,s(0,t.length-1),e):Fi(n,function(a){return a=(r+(a-t)%r)%r||0,t+(a>i?r-a:a)})},Bs=function(t){return t.replace(og,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(lg);return Xf(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Yf=function(t,e,n,i,r){var a=e-t,o=i-n;return Fi(r,function(l){return n+((l-t)/a*o||0)})},Rg=function s(t,e,n,i){var r=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!r){var a=Ne(t),o={},l,c,h,f,u;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(Je(t)&&!Je(e)){for(h=[],f=t.length,u=f-2,c=1;c<f;c++)h.push(s(t[c-1],t[c]));f--,r=function(m){m*=f;var _=Math.min(u,~~m);return h[_](m-_)},n=e}else i||(t=Ns(Je(t)?[]:{},t));if(!h){for(l in e)sh.call(o,t,l,"get",e[l]);r=function(m){return ch(m,o)||(a?t.p:t)}}}return Fi(n,r)},Tf=function(t,e,n){var i=t.labels,r=Pn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},vn=function(t,e,n){var i=t.vars,r=i[e],a=Me,o=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&Di.length&&ja(),o&&(Me=o),h=l?r.apply(c,l):r.call(c),Me=a,h},Rr=function(t){return Ui(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Xe),t.progress()<1&&vn(t,"onInterrupt"),t},Ds,$f=[],Zf=function(t){if(t)if(t=!t.name&&t.default||t,Yc()||t.headless){var e=t.name,n=Re(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:Fr,render:ch,add:sh,kill:qg,modifier:Xg,rawVars:0},a={targetTest:0,get:0,getSetter:ho,aliases:{},register:0};if(Os(),t!==i){if(cn[e])return;Mn(i,Mn(to(t,r),a)),Ns(i.prototype,Ns(r,to(t,a))),cn[i.prop=e]=i,t.targetTest&&(Ja.push(i),Kc[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Lf(e,i),t.register&&t.register(Ke,i,sn)}else $f.push(t)},ge=255,Pr={aqua:[0,ge,ge],lime:[0,ge,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ge],navy:[0,0,128],white:[ge,ge,ge],olive:[128,128,0],yellow:[ge,ge,0],orange:[ge,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ge,0,0],pink:[ge,192,203],cyan:[0,ge,ge],transparent:[ge,ge,ge,0]},Dc=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ge+.5|0},Jf=function(t,e,n){var i=t?ui(t)?[t>>16,t>>8&ge,t&ge]:0:Pr.black,r,a,o,l,c,h,f,u,d,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Pr[t])i=Pr[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ge,i&ge,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ge,t&ge]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(vf),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,r=h*2-a,i.length>3&&(i[3]*=1),i[0]=Dc(l+1/3,r,a),i[1]=Dc(l,r,a),i[2]=Dc(l-1/3,r,a);else if(~t.indexOf("="))return i=t.match($c),n&&i.length<4&&(i[3]=1),i}else i=t.match(vf)||Pr.transparent;i=i.map(Number)}return e&&!m&&(r=i[0]/ge,a=i[1]/ge,o=i[2]/ge,f=Math.max(r,a,o),u=Math.min(r,a,o),h=(f+u)/2,f===u?l=c=0:(d=f-u,c=h>.5?d/(2-f-u):d/(f+u),l=f===r?(a-o)/d+(a<o?6:0):f===a?(o-r)/d+2:(r-a)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Kf=function(t){var e=[],n=[],i=-1;return t.split(hi).forEach(function(r){var a=r.match(cs)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},wf=function(t,e,n){var i="",r=(t+i).match(hi),a=e?"hsla(":"rgba(",o=0,l,c,h,f;if(!r)return t;if(r=r.map(function(u){return(u=Jf(u,e,1))&&a+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=Kf(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(hi,"1").split(cs),f=c.length-1;o<f;o++)i+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(hi),f=c.length-1;o<f;o++)i+=c[o]+r[o];return i+c[f]},hi=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Pr)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),Pg=/hsl[a]?\(/,nh=function(t){var e=t.join(" "),n;if(hi.lastIndex=0,hi.test(e))return n=Pg.test(e),t[1]=wf(t[1],n),t[0]=wf(t[0],n,Kf(t[1])),!0},Or,hn=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,a=r,o=[],l,c,h,f,u,d,m=function _(p){var g=s()-i,v=p===!0,T,y,w,A;if((g>t||g<0)&&(n+=g-e),i+=g,w=i-n,T=w-a,(T>0||v)&&(A=++f.frame,u=w-f.time*1e3,f.time=w=w/1e3,a+=T+(T>=r?0:r-T),y=1),v||(l=c(_)),y)for(d=0;d<o.length;d++)o[d](w,u,A,p)};return f={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return u/(1e3/(p||60))},wake:function(){Pf&&(!zc&&Yc()&&($n=zc=window,Jc=$n.document||{},yn.gsap=Ke,($n.gsapVersions||($n.gsapVersions=[])).push(Ke.version),If(Qa||$n.GreenSockGlobals||!$n.gsap&&$n||{}),$f.forEach(Zf)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=h||function(p){return setTimeout(p,a-f.time*1e3+1|0)},Or=1,m(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Or=0,c=Fr},lagSmoothing:function(p,g){t=p||1/0,e=Math.min(g||33,t)},fps:function(p){r=1e3/(p||240),a=f.time*1e3+r},add:function(p,g,v){var T=g?function(y,w,A,x){p(y,w,A,x),f.remove(T)}:p;return f.remove(p),o[v?"unshift":"push"](T),Os(),T},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&d>=g&&d--},_listeners:o},f})(),Os=function(){return!Or&&hn.wake()},se={},Ig=/^[\d.\-M][\d.\-,\s]/,Lg=/["']/g,Dg=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(Lg,"").trim():+c,i=l.substr(o+1).trim();return e},Ng=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Ug=function(t){var e=(t+"").split("("),n=se[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Dg(e[1])]:Ng(t).split(",").map(Uf)):se._CE&&Ig.test(t)?se._CE("",t):n},Fg=function(t){return function(e){return 1-t(1-e)}},os=function(t,e){return t&&(Re(t)?t:se[t]||Ug(t))||e},us=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},a;return nn(t,function(o){se[o]=yn[o]=r,se[a=o.toLowerCase()]=n;for(var l in r)se[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=se[o+"."+l]=r[l]}),r},Qf=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Nc=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),a=r/Bc*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*ag((h-a)*r)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Qf(o);return r=Bc/r,l.config=function(c,h){return s(t,c,h)},l},Uc=function s(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:Qf(n);return i.config=function(r){return s(t,r)},i};nn("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;us(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});se.Linear.easeNone=se.none=se.Linear.easeIn;us("Elastic",Nc("in"),Nc("out"),Nc());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(o){return o<e?s*o*o:o<n?s*Math.pow(o-1.5/t,2)+.75:o<i?s*(o-=2.25/t)*o+.9375:s*Math.pow(o-2.625/t,2)+.984375};us("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);us("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});us("Circ",function(s){return-(Cf(1-s*s)-1)});us("Sine",function(s){return s===1?1:-rg(s*ig)+1});us("Back",Uc("in"),Uc("out"),Uc());se.SteppedEase=se.steps=yn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,a=1-pe;return function(o){return((i*kr(0,a,o)|0)+r)*n}}};Nr.ease=se["quad.out"];nn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Qc+=s+","+s+"Params,"});var ih=function(t,e){this.id=sg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:th,this.set=e?e.getSetter:ho},Br=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Fs(this,+e.duration,1,1),this.data=e.data,Me&&(this._ctx=Me,Me.data.push(this)),Or||hn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Fs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Os(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(co(this,n),!r._dp||r.parent||Bf(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Zn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===pe||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Nf(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Sf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Sf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?Us(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-pe?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?eo(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-pe?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||r>0&&r<o)&&this.totalTime(kr(-Math.abs(this._delay),o,r),i!==!1),lo(this),gg(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{Os(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,r=this.progress()===1&&Math.abs(this._zTime)!==pe,a;if(r)for(this._tTime-=pe,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+pe){r=!1;break}a=a._next}this.totalTime(i,r)}return this},t.startTime=function(n){if(arguments.length){this._start=Te(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Zn(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(un(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?eo(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=fg);var i=Xe;return Xe=n,eh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Xe=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,bf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,bf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Rn(this,n),un(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,un(i)),this._dur||(this._zTime=-pe),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-pe:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-pe,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-pe)},t.eventCallback=function(n,i,r){var a=this.vars;return arguments.length>1?(i?(a[n]=i,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(a){var o=Re(n)?n:Ff,l=function(){var h=i.then;i.then=null,r&&r(),Re(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Rr(this)},s})();Mn(Br.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-pe,_prom:0,_ps:!1,_rts:1});var Ze=(function(s){Ef(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=un(n.sortChildren),we&&Zn(n.parent||we,ci(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&zf(ci(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,a){return Lr(0,arguments,this),this},e.from=function(i,r,a){return Lr(1,arguments,this),this},e.fromTo=function(i,r,a,o){return Lr(2,arguments,this),this},e.set=function(i,r,a){return r.duration=0,r.parent=this,Ir(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Ie(i,r,Rn(this,a),1),this},e.call=function(i,r,a){return Zn(this,Ie.delayedCall(0,i,r),a)},e.staggerTo=function(i,r,a,o,l,c,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Ie(i,a,Rn(this,l)),this},e.staggerFrom=function(i,r,a,o,l,c,h){return a.runBackwards=1,Ir(a).immediateRender=un(a.immediateRender),this.staggerTo(i,r,a,o,l,c,h)},e.staggerFromTo=function(i,r,a,o,l,c,h,f){return o.startAt=a,Ir(o).immediateRender=un(o.immediateRender),this.staggerTo(i,r,o,l,c,h,f)},e.render=function(i,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Te(i),f=this._zTime<0!=i<0&&(this._initted||!c),u,d,m,_,p,g,v,T,y,w,A,x;if(this!==we&&h>l&&i>=0&&(h=l),h!==this._tTime||a||f){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,y=this._start,T=this._ts,g=!T,f&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,a);if(u=Te(h%p),h===l?(_=this._repeat,u=c):(w=Te(h/p),_=~~w,_&&_===w&&(u=c,_--),u>c&&(u=c)),w=Us(this._tTime,p),!o&&this._tTime&&w!==_&&this._tTime-w*p-this._dur<=0&&(w=_),A&&_&1&&(u=c-u,x=1),_!==w&&!this._lock){var S=A&&w&1,P=S===(A&&_&1);if(_<w&&(S=!S),o=S?0:h%c?c:h,this._lock=1,this.render(o||(x?0:Te(_*p)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&vn(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,w=_),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,P&&(this._lock=2,o=S?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=yg(this,Te(o),Te(u)),v&&(h-=u-(u=v._start))),this._tTime=h,this._time=u,this._act=!!T,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!r&&!w&&(vn(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(d=this._first;d;){if(m=d._next,(d._act||u>=d._start)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,r,a);if(d.render(d._ts>0?(u-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(u-d._start)*d._ts,r,a),u!==this._time||!this._ts&&!g){v=0,m&&(h+=this._zTime=-pe);break}}d=m}else{d=this._last;for(var R=i<0?i:u;d;){if(m=d._prev,(d._act||R<=d._end)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,r,a);if(d.render(d._ts>0?(R-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(R-d._start)*d._ts,r,a||Xe&&eh(d)),u!==this._time||!this._ts&&!g){v=0,m&&(h+=this._zTime=R?-pe:pe);break}}d=m}}if(v&&!r&&(this.pause(),v.render(u>=o?0:-pe)._zTime=u>=o?1:-1,this._ts))return this._start=y,lo(this),this.render(i,r,a);this._onUpdate&&!r&&vn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(y===this._start||Math.abs(T)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ui(this,1),!r&&!(i<0&&!o)&&(h||o||!l)&&(vn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var a=this;if(ui(r)||(r=Rn(this,r,i)),!(i instanceof Br)){if(Je(i))return i.forEach(function(o){return a.add(o,r)}),this;if(Ne(i))return this.addLabel(i,r);if(Re(i))i=Ie.delayedCall(0,i);else return this}return this!==i?Zn(this,i,r):this},e.getChildren=function(i,r,a,o){i===void 0&&(i=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Pn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ie?r&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===i)return r[a]},e.remove=function(i){return Ne(i)?this.removeLabel(i):Re(i)?this.killTweensOf(i):(i.parent===this&&oo(this,i),i===this._recent&&(this._recent=this._last),as(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Te(hn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=Rn(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,a){var o=Ie.delayedCall(0,r||Fr,a);return o.data="isPause",this._hasPause=1,Zn(this,o,Rn(this,i))},e.removePause=function(i){var r=this._first;for(i=Rn(this,i);r;)r._start===i&&r.data==="isPause"&&Ui(r),r=r._next},e.killTweensOf=function(i,r,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Li!==o[l]&&o[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var a=[],o=In(i),l=this._first,c=ui(r),h;l;)l instanceof Ie?dg(l._targets,o)&&(c?(!Li||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(h=l.getTweensOf(o,r)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,r){r=r||{};var a=this,o=Rn(a,i),l=r,c=l.startAt,h=l.onStart,f=l.onStartParams,u=l.immediateRender,d,m=Ie.to(a,Mn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||pe,onStart:function(){if(a.pause(),!d){var p=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==p&&Fs(m,p,0,1).render(m._time,!0,!0),d=1}h&&h.apply(m,f||[])}},r));return u?m.render(0):m},e.tweenFromTo=function(i,r,a){return this.tweenTo(r,Mn({startAt:{time:Rn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Tf(this,Rn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Tf(this,Rn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+pe)},e.shiftChildren=function(i,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Te(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=i);return as(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),as(this)},e.totalDuration=function(i){var r=0,a=this,o=a._last,l=Pn,c,h,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Zn(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(r-=h,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=Te(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;Fs(a,a===we&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(we._ts&&(Nf(we,eo(i,we)),Df=hn.frame),hn.frame>=yf){yf+=fn.autoSleep||120;var r=we._first;if((!r||!r._ts)&&fn.autoSleep&&hn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||hn.sleep()}}},t})(Br);Mn(Ze.prototype,{_lock:0,_hasPause:0,_forcing:0});var Og=function(t,e,n,i,r,a,o){var l=new sn(this._pt,t,e,0,1,lh,null,r),c=0,h=0,f,u,d,m,_,p,g,v;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=Bs(i)),a&&(v=[n,i],a(v,t,e),n=v[0],i=v[1]),u=n.match(Ic)||[];f=Ic.exec(i);)m=f[0],_=i.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),m!==u[h++]&&(p=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:m.charAt(1)==="="?hs(p,m)-p:parseFloat(m)-p,m:d&&d<4?Math.round:0},c=Ic.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Zc.test(i)||g)&&(l.e=0),this._pt=l,l},sh=function(t,e,n,i,r,a,o,l,c,h){Re(i)&&(i=i(r||0,t,a));var f=t[e],u=n!=="get"?n:Re(f)?c?t[e.indexOf("set")||!Re(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,d=Re(f)?c?Vg:td:oh,m;if(Ne(i)&&(~i.indexOf("random(")&&(i=Bs(i)),i.charAt(1)==="="&&(m=hs(u,i)+(qe(u)||0),(m||m===0)&&(i=m))),!h||u!==i||Xc)return!isNaN(u*i)&&i!==""?(m=new sn(this._pt,t,e,+u||0,i-(u||0),typeof f=="boolean"?Wg:ed,0,d),c&&(m.fp=c),o&&m.modifier(o,this,t),this._pt=m):(!f&&!(e in t)&&ao(e,i),Og.call(this,t,e,u,i,d,l||fn.stringFilter,c))},Bg=function(t,e,n,i,r){if(Re(t)&&(t=Dr(t,r,e,n,i)),!Jn(t)||t.style&&t.nodeType||Je(t)||Rf(t))return Ne(t)?Dr(t,r,e,n,i):t;var a={},o;for(o in t)a[o]=Dr(t[o],r,e,n,i);return a},rh=function(t,e,n,i,r,a){var o,l,c,h;if(cn[t]&&(o=new cn[t]).init(r,o.rawVars?e[t]:Bg(e[t],i,r,a,n),n,i,a)!==!1&&(n._pt=l=new sn(n._pt,r,t,0,1,o.render,o,0,o.priority),n!==Ds))for(c=n._ptLookup[n._targets.indexOf(r)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Li,Xc,ah=function s(t,e,n){var i=t.vars,r=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,f=i.yoyoEase,u=i.keyframes,d=i.autoRevert,m=t._dur,_=t._startAt,p=t._targets,g=t.parent,v=g&&g.data==="nested"?g.vars.targets:p,T=t._overwrite==="auto"&&!qc,y=t.timeline,w=i.easeReverse||f,A,x,S,P,R,L,k,O,C,F,G,N,Y;if(y&&(!u||!r)&&(r="none"),t._ease=os(r,Nr.ease),t._rEase=w&&(os(w)||t._ease),t._from=!y&&!!i.runBackwards,t._from&&(t.ratio=1),!y||u&&!i.stagger){if(O=p[0]?Ni(p[0]).harness:0,N=O&&i[O.prop],A=to(i,Kc),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!d?_.render(-1,!0):_.revert(h&&m?Za:ug),_._lazy=0),a){if(Ui(t._startAt=Ie.set(p,Mn({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&un(l),startAt:null,delay:0,onUpdate:c&&function(){return vn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Xe||!o&&!d)&&t._startAt.revert(Za),o&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&m&&!_){if(e&&(o=!1),S=Mn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&un(l),immediateRender:o,stagger:0,parent:g},A),N&&(S[O.prop]=N),Ui(t._startAt=Ie.set(p,S)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Xe?t._startAt.revert(Za):t._startAt.render(-1,!0)),t._zTime=e,!o)s(t._startAt,pe,pe);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&un(l)||l&&!m,x=0;x<p.length;x++){if(R=p[x],k=R._gsap||jc(p)[x]._gsap,t._ptLookup[x]=F={},kc[k.id]&&Di.length&&ja(),G=v===p?x:v.indexOf(R),O&&(C=new O).init(R,N||A,t,G,v)!==!1&&(t._pt=P=new sn(t._pt,R,C.name,0,1,C.render,C,0,C.priority),C._props.forEach(function(V){F[V]=P}),C.priority&&(L=1)),!O||N)for(S in A)cn[S]&&(C=rh(S,A,t,G,R,v))?C.priority&&(L=1):F[S]=P=sh.call(t,R,S,"get",A[S],G,v,0,i.stringFilter);t._op&&t._op[x]&&t.kill(R,t._op[x]),T&&t._pt&&(Li=t,we.killTweensOf(R,F,t.globalTime(e)),Y=!t.parent,Li=0),t._pt&&l&&(kc[k.id]=1)}L&&hh(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!Y,u&&e<=0&&y.render(Pn,!0,!0)},zg=function(t,e,n,i,r,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,f,u,d;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,d=t._targets.length;d--;){if(h=u[d][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Xc=1,t.vars[e]="+=0",ah(t,o),Xc=0,l?Ur(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(d=c.length;d--;)f=c[d],h=f._pt||f,h.s=(i||i===0)&&!r?i:h.s+(i||0)+a*h.c,h.c=n-h.s,f.e&&(f.e=Pe(n)+qe(f.e)),f.b&&(f.b=h.s+qe(f.b))},kg=function(t,e){var n=t[0]?Ni(t[0]).harness:0,i=n&&n.aliases,r,a,o,l;if(!i)return e;r=Ns({},e);for(a in i)if(a in r)for(l=i[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},Gg=function(t,e,n,i){var r=e.ease||i||"power1.inOut",a,o;if(Je(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:r})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},Dr=function(t,e,n,i,r){return Re(t)?t.call(e,n,i,r):Ne(t)&&~t.indexOf("random(")?Bs(t):t},io=Qc+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",jf={};nn(io+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return jf[s]=1});io=io.split(",");var Ie=(function(s){Ef(t,s);function t(n,i,r,a){var o;typeof i=="number"&&(r.duration=i,i=r,r=null),o=s.call(this,a?i:Ir(i))||this;var l=o.vars,c=l.duration,h=l.delay,f=l.immediateRender,u=l.stagger,d=l.overwrite,m=l.keyframes,_=l.defaults,p=l.scrollTrigger,g=i.parent||we,v=(Je(n)||Rf(n)?ui(n[0]):"length"in i)?[n]:In(n),T,y,w,A,x,S,P,R;if(o._targets=v.length?jc(v):Ur("GSAP target "+n+" not found. https://gsap.com",!fn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,m||u||$a(c)||$a(h)){i=o.vars;var L=i.easeReverse||i.yoyoEase;if(T=o.timeline=new Ze({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:v}),T.kill(),T.parent=T._dp=ci(o),T._start=0,u||$a(c)||$a(h)){if(A=v.length,P=u&&Hf(u),Jn(u))for(x in u)~io.indexOf(x)&&(R||(R={}),R[x]=u[x]);for(y=0;y<A;y++)w=to(i,jf),w.stagger=0,L&&(w.easeReverse=L),R&&Ns(w,R),S=v[y],w.duration=+Dr(c,ci(o),y,S,v),w.delay=(+Dr(h,ci(o),y,S,v)||0)-o._delay,!u&&A===1&&w.delay&&(o._delay=h=w.delay,o._start+=h,w.delay=0),T.to(S,w,P?P(y,S,v):0),T._ease=se.none;T.duration()?c=h=0:o.timeline=0}else if(m){Ir(Mn(T.vars.defaults,{ease:"none"})),T._ease=os(m.ease||i.ease||"none");var k=0,O,C,F;if(Je(m))m.forEach(function(G){return T.to(v,G,">")}),T.duration();else{w={};for(x in m)x==="ease"||x==="easeEach"||Gg(x,m[x],w,m.easeEach);for(x in w)for(O=w[x].sort(function(G,N){return G.t-N.t}),k=0,y=0;y<O.length;y++)C=O[y],F={ease:C.e,duration:(C.t-(y?O[y-1].t:0))/100*c},F[x]=C.v,T.to(v,F,k),k+=F.duration;T.duration()<c&&T.to({},{duration:c-T.duration()})}}c||o.duration(c=T.duration())}else o.timeline=0;return d===!0&&!qc&&(Li=ci(o),we.killTweensOf(v),Li=0),Zn(g,ci(o),r),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(f||!c&&!m&&o._start===Te(g._time)&&un(f)&&_g(ci(o))&&g.data!=="nested")&&(o._tTime=-pe,o.render(Math.max(0,-h)||0)),p&&zf(ci(o),p),o}var e=t.prototype;return e.render=function(i,r,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,f=i>l-pe&&!h?l:i<pe?0:i,u,d,m,_,p,g,v,T;if(!c)vg(this,i,r,a);else if(f!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=f,T=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,a);if(u=Te(f%_),f===l?(m=this._repeat,u=c):(p=Te(f/_),m=~~p,m&&m===p?(u=c,m--):u>c&&(u=c)),g=this._yoyo&&m&1,g&&(u=c-u),p=Us(this._tTime,_),u===o&&!a&&this._initted&&m===p)return this._tTime=f,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&u!==_&&this._initted&&(this._lock=a=1,this.render(Te(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(kf(this,h?i:u,a,r,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,r,a)}if(this._rEase){var y=u<o;if(y!==this._inv){var w=y?o:c-o;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=w?(y?-1:1)/w:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(u/c);if(this._from&&(this.ratio=v=1-v),this._tTime=f,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!r&&!p&&(vn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(v,d.d),d=d._next;T&&T.render(i<0?i:T._dur*T._ease(u/this._dur),r,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&Gc(this,i,r,a),vn(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!r&&this.parent&&vn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&Gc(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&Ui(this,1),!r&&!(h&&!o)&&(f||o||g)&&(vn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,a,o,l){Or||hn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||ah(this,c),h=this._ease(c/this._dur),zg(this,i,r,a,o,h,c,l)?this.resetTo(i,r,a,o,1):(co(this,0),this.parent||Of(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Rr(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Xe),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Li&&Li.vars.overwrite!==!0)._first||Rr(this),this.parent&&a!==this.timeline.totalDuration()&&Fs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?In(i):o,c=this._ptLookup,h=this._pt,f,u,d,m,_,p,g;if((!r||r==="all")&&mg(o,l))return r==="all"&&(this._pt=0),Rr(this);for(f=this._op=this._op||[],r!=="all"&&(Ne(r)&&(_={},nn(r,function(v){return _[v]=1}),r=_),r=kg(o,r)),g=o.length;g--;)if(~l.indexOf(o[g])){u=c[g],r==="all"?(f[g]=r,m=u,d={}):(d=f[g]=f[g]||{},m=r);for(_ in m)p=u&&u[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&oo(this,p,"_pt"),delete u[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&h&&Rr(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return Lr(1,arguments)},t.delayedCall=function(i,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,r,a){return Lr(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,a){return we.killTweensOf(i,r,a)},t})(Br);Mn(Ie.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});nn("staggerTo,staggerFrom,staggerFromTo",function(s){Ie[s]=function(){var t=new Ze,e=Vc.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var oh=function(t,e,n){return t[e]=n},td=function(t,e,n){return t[e](n)},Vg=function(t,e,n,i){return t[e](i.fp,n)},Hg=function(t,e,n){return t.setAttribute(e,n)},ho=function(t,e){return Re(t[e])?td:ro(t[e])&&t.setAttribute?Hg:oh},ed=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Wg=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},lh=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},ch=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Xg=function(t,e,n,i){for(var r=this._pt,a;r;)a=r._next,r.p===i&&r.modifier(t,e,n),r=a},qg=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?oo(this,e,"_pt"):e.dep||(n=1),e=i;return!n},Yg=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},hh=function(t){for(var e=t._pt,n,i,r,a;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=r},sn=(function(){function s(e,n,i,r,a,o,l,c,h){this.t=n,this.s=r,this.c=a,this.p=i,this.r=o||ed,this.d=l||this,this.set=c||oh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=Yg,this.m=n,this.mt=r,this.tween=i},s})();nn(Qc+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Kc[s]=1});yn.TweenMax=yn.TweenLite=Ie;yn.TimelineLite=yn.TimelineMax=Ze;we=new Ze({sortChildren:!1,defaults:Nr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});fn.stringFilter=nh;var ls=[],Ka={},$g=[],Af=0,Zg=0,Fc=function(t){return(Ka[t]||$g).map(function(e){return e()})},zr=function(){var t=Date.now(),e=[];t-Af>2&&(Fc("matchMediaInit"),ls.forEach(function(n){var i=n.queries,r=n.conditions,a,o,l,c;for(o in i)a=$n.matchMedia(i[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),Fc("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Af=t,Fc("matchMedia"))},nd=(function(){function s(e,n){this.selector=n&&Hc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Zg++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Re(n)&&(r=i,i=n,n=Re);var a=this,o=function(){var c=Me,h=a.selector,f;return c&&c!==a&&c.data.push(a),r&&(a.selector=Hc(r)),Me=a,f=i.apply(a,arguments),Re(f)&&a._r.push(f),Me=c,a.selector=h,a.isReverted=!1,f};return a.last=o,n===Re?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Me;Me=null,n(this),Me=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof Ie&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof Ze?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ie)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=ls.length;a--;)ls[a].id===this.id&&ls.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(zr):o.removeEventListener("change",zr)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},s})(),Jg=(function(){function s(e){this.contexts=[],this.scope=e,Me&&Me.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){Jn(n)||(n={matches:n});var a=new nd(0,r||this.scope),o=a.conditions={},l,c,h;Me&&!a.selector&&(a.selector=Me.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=$n.matchMedia(n[c]),l&&(ls.indexOf(a)<0&&ls.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(zr):l.addEventListener("change",zr),(a._mqs||(a._mqs=[])).push(l)));return h&&i(a,function(f){return a.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),so={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Zf(i)})},timeline:function(t){return new Ze(t)},getTweensOf:function(t,e){return we.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ne(t)&&(t=In(t)[0]);var r=Ni(t||{}).get,a=n?Ff:Uf;return n==="native"&&(n=""),t&&(e?a((cn[e]&&cn[e].get||r)(t,e,n,i)):function(o,l,c){return a((cn[o]&&cn[o].get||r)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=In(t),t.length>1){var i=t.map(function(h){return Ke.quickSetter(h,e,n)}),r=i.length;return function(h){for(var f=r;f--;)i[f](h)}}t=t[0]||{};var a=cn[e],o=Ni(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var f=new a;Ds._pt=0,f.init(t,n?h+n:h,Ds,0,[t]),f.render(1,f),Ds._pt&&ch(1,Ds)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,r=Ke.to(t,Mn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return r.resetTo(e,l,c,h)};return a.tween=r,a},isTweening:function(t){return we.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=os(t.ease,Nr.ease)),Mf(Nr,t||{})},config:function(t){return Mf(fn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!cn[o]&&!yn[o]&&Ur(e+" effect requires "+o+" plugin.")}),Lc[e]=function(o,l,c){return n(In(o),Mn(l||{},r),c)},a&&(Ze.prototype[e]=function(o,l,c){return this.add(Lc[e](o,Jn(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){se[t]=os(e)},parseEase:function(t,e){return arguments.length?os(t,e):se},getById:function(t){return we.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Ze(t),i,r;for(n.smoothChildTiming=un(t.smoothChildTiming),we.remove(n),n._dp=0,n._time=n._tTime=we._time,i=we._first;i;)r=i._next,(e||!(!i._dur&&i instanceof Ie&&i.vars.onComplete===i._targets[0]))&&Zn(n,i,i._start-i._delay),i=r;return Zn(we,n,0),n},context:function(t,e){return t?new nd(t,e):Me},matchMedia:function(t){return new Jg(t)},matchMediaRefresh:function(){return ls.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||zr()},addEventListener:function(t,e){var n=Ka[t]||(Ka[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Ka[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:Eg,wrapYoyo:Cg,distribute:Hf,random:Xf,snap:Wf,normalize:Ag,getUnit:qe,clamp:Sg,splitColor:Jf,toArray:In,selector:Hc,mapRange:Yf,pipe:Tg,unitize:wg,interpolate:Rg,shuffle:Vf},install:If,effects:Lc,ticker:hn,updateRoot:Ze.updateRoot,plugins:cn,globalTimeline:we,core:{PropTween:sn,globals:Lf,Tween:Ie,Timeline:Ze,Animation:Br,getCache:Ni,_removeLinkedListItem:oo,reverting:function(){return Xe},context:function(t){return t&&Me&&(Me.data.push(t),t._ctx=Me),Me},suppressOverwrites:function(t){return qc=t}}};nn("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return so[s]=Ie[s]});hn.add(Ze.updateRoot);Ds=so.to({},{duration:0});var Kg=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Qg=function(t,e){var n=t._targets,i,r,a;for(i in e)for(r=n.length;r--;)a=t._ptLookup[r][i],a&&(a=a.d)&&(a._pt&&(a=Kg(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[r],i))},Oc=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,a){a._onInit=function(o){var l,c;if(Ne(r)&&(l={},nn(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}Qg(o,r)}}}},Ke=so.registerPlugin({name:"attr",init:function(t,e,n,i,r){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Xe?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Oc("roundProps",Wc),Oc("modifiers"),Oc("snap",Wf))||so;Ie.version=Ze.version=Ke.version="3.15.1";Pf=1;Yc()&&Os();var jg=se.Power0,t0=se.Power1,e0=se.Power2,n0=se.Power3,i0=se.Power4,s0=se.Linear,r0=se.Quad,a0=se.Cubic,o0=se.Quart,l0=se.Quint,c0=se.Strong,h0=se.Elastic,u0=se.Back,f0=se.SteppedEase,d0=se.Bounce,p0=se.Sine,m0=se.Expo,g0=se.Circ;var id,Oi,ks,gh,ms,_0,sd,_h,x0=function(){return typeof window<"u"},di={},ps=180/Math.PI,Gs=Math.PI/180,zs=Math.atan2,rd=1e8,xh=/([A-Z])/g,v0=/(left|right|width|margin|padding|x)/i,y0=/[\s,\(]\S/,Kn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},fh=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},M0=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},S0=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},b0=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},T0=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},dd=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},pd=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},w0=function(t,e,n){return t.style[e]=n},A0=function(t,e,n){return t.style.setProperty(e,n)},E0=function(t,e,n){return t._gsap[e]=n},C0=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},R0=function(t,e,n,i,r){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},P0=function(t,e,n,i,r){var a=t._gsap;a[e]=n,a.renderTransform(r,a)},Ae="transform",dn=Ae+"Origin",I0=function s(t,e){var n=this,i=this.target,r=i.style,a=i._gsap;if(t in di&&r){if(this.tfm=this.tfm||{},t!=="transform")t=Kn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=fi(i,o)}):this.tfm[t]=a.x?a[t]:fi(i,t),t===dn&&(this.tfm.zOrigin=a.zOrigin);else return Kn.transform.split(",").forEach(function(o){return s.call(n,o,e)});if(this.props.indexOf(Ae)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(dn,e,"")),t=Ae}(r||e)&&this.props.push(t,e,r[t])},md=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},L0=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(xh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=_h(),(!r||!r.isStart)&&!n[Ae]&&(md(n),i.zOrigin&&n[dn]&&(n[dn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},gd=function(t,e){var n={target:t,props:[],revert:L0,save:I0};return t._gsap||Ke.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},_d,dh=function(t,e){var n=Oi.createElementNS?Oi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Oi.createElement(t);return n&&n.style?n:Oi.createElement(t)},Sn=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(xh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,Vs(e)||e,1)||""},ad="O,Moz,ms,Ms,Webkit".split(","),Vs=function(t,e,n){var i=e||ms,r=i.style,a=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(ad[a]+t in r););return a<0?null:(a===3?"ms":a>=0?ad[a]:"")+t},ph=function(){x0()&&window.document&&(id=window,Oi=id.document,ks=Oi.documentElement,ms=dh("div")||{style:{}},_0=dh("div"),Ae=Vs(Ae),dn=Ae+"Origin",ms.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",_d=!!Vs("perspective"),_h=Ke.core.reverting,gh=1)},od=function(t){var e=t.ownerSVGElement,n=dh("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),ks.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),ks.removeChild(n),r},ld=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},xd=function(t){var e,n;try{e=t.getBBox()}catch{e=od(t),n=1}return e&&(e.width||e.height)||n||(e=od(t)),e&&!e.width&&!e.x&&!e.y?{x:+ld(t,["x","cx","x1"])||0,y:+ld(t,["y","cy","y1"])||0,width:0,height:0}:e},vd=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&xd(t))},zi=function(t,e){if(e){var n=t.style,i;e in di&&e!==dn&&(e=Ae),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(xh,"-$1").toLowerCase())):n.removeAttribute(e)}},Bi=function(t,e,n,i,r,a){var o=new sn(t._pt,e,n,0,1,a?pd:dd);return t._pt=o,o.b=i,o.e=r,t._props.push(n),o},cd={deg:1,rad:1,turn:1},D0={grid:1,flex:1},ki=function s(t,e,n,i){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=ms.style,l=v0.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),f=100,u=i==="px",d=i==="%",m,_,p,g;if(i===a||!r||cd[i]||cd[a])return r;if(a!=="px"&&!u&&(r=s(t,e,n,"px")),g=t.getCTM&&vd(t),(d||a==="%")&&(di[e]||~e.indexOf("adius")))return m=g?t.getBBox()[l?"width":"height"]:t[h],Pe(d?r/m*f:r/100*m);if(o[l?"width":"height"]=f+(u?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Oi||!_.appendChild)&&(_=Oi.body),p=_._gsap,p&&d&&p.width&&l&&p.time===hn.time&&!p.uncache)return Pe(r/p.width*f);if(d&&(e==="height"||e==="width")){var v=t.style[e];t.style[e]=f+i,m=t[h],v?t.style[e]=v:zi(t,e)}else(d||a==="%")&&!D0[Sn(_,"display")]&&(o.position=Sn(t,"position")),_===t&&(o.position="static"),_.appendChild(ms),m=ms[h],_.removeChild(ms),o.position="absolute";return l&&d&&(p=Ni(_),p.time=hn.time,p.width=_[h]),Pe(u?m*r/f:m&&r?f/m*r:0)},fi=function(t,e,n,i){var r;return gh||ph(),e in Kn&&e!=="transform"&&(e=Kn[e],~e.indexOf(",")&&(e=e.split(",")[0])),di[e]&&e!=="transform"?(r=Hr(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:fo(Sn(t,dn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=uo[e]&&uo[e](t,e,n)||Sn(t,e)||th(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?ki(t,e,r,n)+n:r},N0=function(t,e,n,i){if(!n||n==="none"){var r=Vs(e,t,1),a=r&&Sn(t,r,1);a&&a!==n?(e=r,n=a):e==="borderColor"&&(n=Sn(t,"borderTopColor"))}var o=new sn(this._pt,t.style,e,0,1,lh),l=0,c=0,h,f,u,d,m,_,p,g,v,T,y,w;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Sn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Sn(t,e)||i,_?t.style[e]=_:zi(t,e)),h=[n,i],nh(h),n=h[0],i=h[1],u=n.match(cs)||[],w=i.match(cs)||[],w.length){for(;f=cs.exec(i);)p=f[0],v=i.substring(l,f.index),m?m=(m+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(m=1),p!==(_=u[c++]||"")&&(d=parseFloat(_)||0,y=_.substr((d+"").length),p.charAt(1)==="="&&(p=hs(d,p)+y),g=parseFloat(p),T=p.substr((g+"").length),l=cs.lastIndex-T.length,T||(T=T||fn.units[e]||y,l===i.length&&(i+=T,o.e+=T)),y!==T&&(d=ki(t,e,_,T)||0),o._pt={_next:o._pt,p:v||c===1?v:",",s:d,c:g-d,m:m&&m<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?pd:dd;return Zc.test(i)&&(o.e=0),this._pt=o,o},hd={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},U0=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=hd[n]||n,e[1]=hd[i]||i,e.join(" ")},F0=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],di[o]&&(l=1,o=o==="transformOrigin"?dn:Ae),zi(n,o);l&&(zi(n,Ae),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Hr(n,1),a.uncache=1,md(i)))}},uo={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var a=t._pt=new sn(t._pt,e,n,0,0,F0);return a.u=i,a.pr=-10,a.tween=r,t._props.push(n),1}}},Vr=[1,0,0,1,0,0],yd={},Md=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},ud=function(t){var e=Sn(t,Ae);return Md(e)?Vr:e.substr(7).match($c).map(Pe)},vh=function(t,e){var n=t._gsap||Ni(t),i=t.style,r=ud(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?Vr:r):(r===Vr&&!t.offsetParent&&t!==ks&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,ks.appendChild(t)),r=ud(t),l?i.display=l:zi(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):ks.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},mh=function(t,e,n,i,r,a){var o=t._gsap,l=r||vh(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,f=o.xOffset||0,u=o.yOffset||0,d=l[0],m=l[1],_=l[2],p=l[3],g=l[4],v=l[5],T=e.split(" "),y=parseFloat(T[0])||0,w=parseFloat(T[1])||0,A,x,S,P;n?l!==Vr&&(x=d*p-m*_)&&(S=y*(p/x)+w*(-_/x)+(_*v-p*g)/x,P=y*(-m/x)+w*(d/x)-(d*v-m*g)/x,y=S,w=P):(A=xd(t),y=A.x+(~T[0].indexOf("%")?y/100*A.width:y),w=A.y+(~(T[1]||T[0]).indexOf("%")?w/100*A.height:w)),i||i!==!1&&o.smooth?(g=y-c,v=w-h,o.xOffset=f+(g*d+v*_)-g,o.yOffset=u+(g*m+v*p)-v):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=w,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[dn]="0px 0px",a&&(Bi(a,o,"xOrigin",c,y),Bi(a,o,"yOrigin",h,w),Bi(a,o,"xOffset",f,o.xOffset),Bi(a,o,"yOffset",u,o.yOffset)),t.setAttribute("data-svg-origin",y+" "+w)},Hr=function(t,e){var n=t._gsap||new ih(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=Sn(t,dn)||"0",h,f,u,d,m,_,p,g,v,T,y,w,A,x,S,P,R,L,k,O,C,F,G,N,Y,V,J,K,$,ht,X,ot;return h=f=u=_=p=g=v=T=y=0,d=m=1,n.svg=!!(t.getCTM&&vd(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ae]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ae]!=="none"?l[Ae]:"")),i.scale=i.rotate=i.translate="none"),x=vh(t,n.svg),n.svg&&(n.uncache?(Y=t.getBBox(),c=n.xOrigin-Y.x+"px "+(n.yOrigin-Y.y)+"px",N=""):N=!e&&t.getAttribute("data-svg-origin"),mh(t,N||c,!!N||n.originIsAbsolute,n.smooth!==!1,x)),w=n.xOrigin||0,A=n.yOrigin||0,x!==Vr&&(L=x[0],k=x[1],O=x[2],C=x[3],h=F=x[4],f=G=x[5],x.length===6?(d=Math.sqrt(L*L+k*k),m=Math.sqrt(C*C+O*O),_=L||k?zs(k,L)*ps:0,v=O||C?zs(O,C)*ps+_:0,v&&(m*=Math.abs(Math.cos(v*Gs))),n.svg&&(h-=w-(w*L+A*O),f-=A-(w*k+A*C))):(ot=x[6],ht=x[7],J=x[8],K=x[9],$=x[10],X=x[11],h=x[12],f=x[13],u=x[14],S=zs(ot,$),p=S*ps,S&&(P=Math.cos(-S),R=Math.sin(-S),N=F*P+J*R,Y=G*P+K*R,V=ot*P+$*R,J=F*-R+J*P,K=G*-R+K*P,$=ot*-R+$*P,X=ht*-R+X*P,F=N,G=Y,ot=V),S=zs(-O,$),g=S*ps,S&&(P=Math.cos(-S),R=Math.sin(-S),N=L*P-J*R,Y=k*P-K*R,V=O*P-$*R,X=C*R+X*P,L=N,k=Y,O=V),S=zs(k,L),_=S*ps,S&&(P=Math.cos(S),R=Math.sin(S),N=L*P+k*R,Y=F*P+G*R,k=k*P-L*R,G=G*P-F*R,L=N,F=Y),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,g=180-g),d=Pe(Math.sqrt(L*L+k*k+O*O)),m=Pe(Math.sqrt(G*G+ot*ot)),S=zs(F,G),v=Math.abs(S)>2e-4?S*ps:0,y=X?1/(X<0?-X:X):0),n.svg&&(N=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Md(Sn(t,Ae)),N&&t.setAttribute("transform",N))),Math.abs(v)>90&&Math.abs(v)<270&&(r?(d*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,v+=v<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=Pe(d),n.scaleY=Pe(m),n.rotation=Pe(_)+o,n.rotationX=Pe(p)+o,n.rotationY=Pe(g)+o,n.skewX=v+o,n.skewY=T+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[dn]=fo(c)),n.xOffset=n.yOffset=0,n.force3D=fn.force3D,n.renderTransform=n.svg?B0:_d?Sd:O0,n.uncache=0,n},fo=function(t){return(t=t.split(" "))[0]+" "+t[1]},uh=function(t,e,n){var i=qe(e);return Pe(parseFloat(e)+parseFloat(ki(t,"x",n+"px",i)))+i},O0=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Sd(t,e)},fs="0deg",Gr="0px",ds=") ",Sd=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,f=n.rotationX,u=n.skewX,d=n.skewY,m=n.scaleX,_=n.scaleY,p=n.transformPerspective,g=n.force3D,v=n.target,T=n.zOrigin,y="",w=g==="auto"&&t&&t!==1||g===!0;if(T&&(f!==fs||h!==fs)){var A=parseFloat(h)*Gs,x=Math.sin(A),S=Math.cos(A),P;A=parseFloat(f)*Gs,P=Math.cos(A),a=uh(v,a,x*P*-T),o=uh(v,o,-Math.sin(A)*-T),l=uh(v,l,S*P*-T+T)}p!==Gr&&(y+="perspective("+p+ds),(i||r)&&(y+="translate("+i+"%, "+r+"%) "),(w||a!==Gr||o!==Gr||l!==Gr)&&(y+=l!==Gr||w?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+ds),c!==fs&&(y+="rotate("+c+ds),h!==fs&&(y+="rotateY("+h+ds),f!==fs&&(y+="rotateX("+f+ds),(u!==fs||d!==fs)&&(y+="skew("+u+", "+d+ds),(m!==1||_!==1)&&(y+="scale("+m+", "+_+ds),v.style[Ae]=y||"translate(0, 0)"},B0=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,f=n.scaleX,u=n.scaleY,d=n.target,m=n.xOrigin,_=n.yOrigin,p=n.xOffset,g=n.yOffset,v=n.forceCSS,T=parseFloat(a),y=parseFloat(o),w,A,x,S,P;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Gs,c*=Gs,w=Math.cos(l)*f,A=Math.sin(l)*f,x=Math.sin(l-c)*-u,S=Math.cos(l-c)*u,c&&(h*=Gs,P=Math.tan(c-h),P=Math.sqrt(1+P*P),x*=P,S*=P,h&&(P=Math.tan(h),P=Math.sqrt(1+P*P),w*=P,A*=P)),w=Pe(w),A=Pe(A),x=Pe(x),S=Pe(S)):(w=f,S=u,A=x=0),(T&&!~(a+"").indexOf("px")||y&&!~(o+"").indexOf("px"))&&(T=ki(d,"x",a,"px"),y=ki(d,"y",o,"px")),(m||_||p||g)&&(T=Pe(T+m-(m*w+_*x)+p),y=Pe(y+_-(m*A+_*S)+g)),(i||r)&&(P=d.getBBox(),T=Pe(T+i/100*P.width),y=Pe(y+r/100*P.height)),P="matrix("+w+","+A+","+x+","+S+","+T+","+y+")",d.setAttribute("transform",P),v&&(d.style[Ae]=P)},z0=function(t,e,n,i,r){var a=360,o=Ne(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?ps:1),c=l-i,h=i+c+"deg",f,u;return o&&(f=r.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*rd)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*rd)%a-~~(c/a)*a)),t._pt=u=new sn(t._pt,e,n,i,c,M0),u.e=h,u.u="deg",t._props.push(n),u},fd=function(t,e){for(var n in e)t[n]=e[n];return t},k0=function(t,e,n){var i=fd({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,f,u,d,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ae]=e,o=Hr(n,1),zi(n,Ae),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ae],a[Ae]=e,o=Hr(n,1),a[Ae]=c);for(l in di)c=i[l],h=o[l],c!==h&&r.indexOf(l)<0&&(d=qe(c),m=qe(h),f=d!==m?ki(n,l,c,m):parseFloat(c),u=parseFloat(h),t._pt=new sn(t._pt,o,l,f,u-f,fh),t._pt.u=m||0,t._props.push(l));fd(o,i)};nn("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",a=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(o){return t<2?s+o:"border"+o+s});uo[t>1?"border"+s:s]=function(o,l,c,h,f){var u,d;if(arguments.length<4)return u=a.map(function(m){return fi(o,m,c)}),d=u.join(" "),d.split(u[0]).length===5?u[0]:d;u=(h+"").split(" "),d={},a.forEach(function(m,_){return d[m]=u[_]=u[_]||u[(_-1)/2|0]}),o.init(l,d,f)}});var yh={name:"css",register:ph,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var a=this._props,o=t.style,l=n.vars.startAt,c,h,f,u,d,m,_,p,g,v,T,y,w,A,x,S,P;gh||ph(),this.styles=this.styles||gd(t),S=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(cn[_]&&rh(_,e,n,i,t,r)))){if(d=typeof h,m=uo[_],d==="function"&&(h=h.call(n,i,t,r),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=Bs(h)),m)m(this,t,_,h,n)&&(x=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",hi.lastIndex=0,hi.test(c)||(p=qe(c),g=qe(h),g?p!==g&&(c=ki(t,_,c,g)+g):p&&(h+=p)),this.add(o,"setProperty",c,h,i,r,0,0,_),a.push(_),S.push(_,0,o[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],Ne(c)&&~c.indexOf("random(")&&(c=Bs(c)),qe(c+"")||c==="auto"||(c+=fn.units[_]||qe(fi(t,_))||""),(c+"").charAt(1)==="="&&(c=fi(t,_))):c=fi(t,_),u=parseFloat(c),v=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),f=parseFloat(h),_ in Kn&&(_==="autoAlpha"&&(u===1&&fi(t,"visibility")==="hidden"&&f&&(u=0),S.push("visibility",0,o.visibility),Bi(this,o,"visibility",u?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=Kn[_],~_.indexOf(",")&&(_=_.split(",")[0]))),T=_ in di,T){if(this.styles.save(_),P=h,d==="string"&&h.substring(0,6)==="var(--"){if(h=Sn(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var R=t.style.perspective;t.style.perspective=h,h=Sn(t,"perspective"),R?t.style.perspective=R:zi(t,"perspective")}f=parseFloat(h)}if(y||(w=t._gsap,w.renderTransform&&!e.parseTransform||Hr(t,e.parseTransform),A=e.smoothOrigin!==!1&&w.smooth,y=this._pt=new sn(this._pt,o,Ae,0,1,w.renderTransform,w,0,-1),y.dep=1),_==="scale")this._pt=new sn(this._pt,w,"scaleY",w.scaleY,(v?hs(w.scaleY,v+f):f)-w.scaleY||0,fh),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){S.push(dn,0,o[dn]),h=U0(h),w.svg?mh(t,h,0,A,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==w.zOrigin&&Bi(this,w,"zOrigin",w.zOrigin,g),Bi(this,o,_,fo(c),fo(h)));continue}else if(_==="svgOrigin"){mh(t,h,1,A,0,this);continue}else if(_ in yd){z0(this,w,_,u,v?hs(u,v+h):h);continue}else if(_==="smoothOrigin"){Bi(this,w,"smooth",w.smooth,h);continue}else if(_==="force3D"){w[_]=h;continue}else if(_==="transform"){k0(this,h,t);continue}}else _ in o||(_=Vs(_)||_);if(T||(f||f===0)&&(u||u===0)&&!y0.test(h)&&_ in o)p=(c+"").substr((u+"").length),f||(f=0),g=qe(h)||(_ in fn.units?fn.units[_]:p),p!==g&&(u=ki(t,_,c,g)),this._pt=new sn(this._pt,T?w:o,_,u,(v?hs(u,v+f):f)-u,!T&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?T0:fh),this._pt.u=g||0,T&&P!==h?(this._pt.b=c,this._pt.e=P,this._pt.r=b0):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=S0);else if(_ in o)N0.call(this,t,_,c,v?v+h:h);else if(_ in t)this.add(t,_,c||t[_],v?v+h:h,i,r);else if(_!=="parseTransform"){ao(_,h);continue}T||(_ in o?S.push(_,0,o[_]):typeof t[_]=="function"?S.push(_,2,t[_]()):S.push(_,1,c||t[_])),a.push(_)}}x&&hh(this)},render:function(t,e){if(e.tween._time||!_h())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:fi,aliases:Kn,getSetter:function(t,e,n){var i=Kn[e];return i&&i.indexOf(",")<0&&(e=i),e in di&&e!==dn&&(t._gsap.x||fi(t,"x"))?n&&sd===n?e==="scale"?C0:E0:(sd=n||{})&&(e==="scale"?R0:P0):t.style&&!ro(t.style[e])?w0:~e.indexOf("-")?A0:ho(t,e)},core:{_removeProperty:zi,_getMatrix:vh}};Ke.utils.checkPrefix=Vs;Ke.core.getStyleSaver=gd;(function(s,t,e,n){var i=nn(s+","+t+","+e,function(r){di[r]=1});nn(t,function(r){fn.units[r]="deg",yd[r]=1}),Kn[i[13]]=s+","+t,nn(n,function(r){var a=r.split(":");Kn[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");nn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){fn.units[s]="px"});Ke.registerPlugin(yh);var Wr=Ke.registerPlugin(yh)||Ke,_b=Wr.core.Tween;var G0=`
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
}`,V0=`#version 300 es
void main(){ vec2 p = vec2(gl_VertexID == 2 ? 3.0 : -1.0, gl_VertexID == 0 ? -3.0 : 1.0); gl_Position = vec4(p, 0.0, 1.0); }`,H0=`#version 300 es
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
}`;async function W0(s){if(!navigator.gpu)return null;let t=await navigator.gpu.requestAdapter({powerPreference:"low-power"});if(!t)return null;let e=await t.requestDevice();e.addEventListener("uncapturederror",h=>console.warn("WebGPU \uC624\uB958:",h.error.message));let n=s.getContext("webgpu");if(!n)return null;let i=navigator.gpu.getPreferredCanvasFormat();n.configure({device:e,format:i,alphaMode:"opaque"});let r=e.createShaderModule({code:G0}),a=e.createRenderPipeline({layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),o=e.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),l=e.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}}]}),c=new Float32Array(16);return{kind:"WebGPU",lost:e.lost,draw(h){c.set(h),e.queue.writeBuffer(o,0,c);let f=e.createCommandEncoder(),u=f.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});u.setPipeline(a),u.setBindGroup(0,l),u.draw(3),u.end(),e.queue.submit([f.finish()])}}}function bd(s){let t=s.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return null;let e=(r,a)=>{let o=t.createShader(r);return t.shaderSource(o,a),t.compileShader(o),o},n=t.createProgram();if(t.attachShader(n,e(t.VERTEX_SHADER,V0)),t.attachShader(n,e(t.FRAGMENT_SHADER,H0)),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))return null;t.useProgram(n),t.bindVertexArray(t.createVertexArray());let i=["uA","uColA","uColB","uGlow"].map(r=>t.getUniformLocation(n,r));return{kind:"WebGL2",draw(r){t.viewport(0,0,s.width,s.height),i.forEach((a,o)=>t.uniform4f(a,r[o*4],r[o*4+1],r[o*4+2],r[o*4+3])),t.drawArrays(t.TRIANGLES,0,3)}}}async function Td(s,{gpu:t=!0}={}){let e=null;if(t)try{e=await W0(s)}catch(i){console.warn("WebGPU \uC2E4\uD328, WebGL2\uB85C",i),e=null}if(!e){let i=s.cloneNode();s.replaceWith(i),s=i,e=bd(s)}let n=e?{...e,canvas:s}:{kind:"CSS",canvas:s,draw(){}};return e?.lost&&e.lost.then(()=>{let i=n.canvas.cloneNode();n.canvas.replaceWith(i);let r=bd(i);Object.assign(n,r?{...r,canvas:i}:{kind:"CSS",canvas:i,draw(){}})}),n}var ap=0,ru=1,op=2;var ws=1,lp=2,xr=3,ji=0,ln=1,ii=2,As=0,vr=1,Ea=2,au=3,ou=4,cp=5;var Es=100,hp=101,up=102,fp=103,dp=104,pp=200,mp=201,gp=202,_p=203,lu=204,cu=205,xp=206,vp=207,yp=208,Mp=209,Sp=210,bp=211,Tp=212,wp=213,Ap=214,Vo=0,Ho=1,Wo=2,ir=3,Xo=4,qo=5,Yo=6,$o=7,hu=0,Ep=1,Cp=2,si=0,uu=1,fu=2,du=3,pu=4,mu=5,gu=6,Ca=7;var _u=300,Cs=301,yr=302,Il=303,Ll=304,Zo=1e3,jn=1001,Jo=1002,Ge=1003,Rp=1004;var Ra=1005;var on=1006,Dl=1007;var Ti=1008;var gn=1009,xu=1010,vu=1011,Mr=1012,Nl=1013,Vn=1014,Hn=1015,Wn=1016,Ul=1017,Fl=1018,Rs=1020,yu=35902,Mu=35899,Su=1021,bu=1022,Xn=1023,Mi=1026,wi=1027,Tu=1028,Ol=1029,ts=1030,Bl=1031;var zl=1033,Pa=33776,Ia=33777,La=33778,Da=33779,kl=35840,Gl=35841,Vl=35842,Hl=35843,Wl=36196,Xl=37492,ql=37496,Yl=37488,$l=37489,Na=37490,Zl=37491,Jl=37808,Kl=37809,Ql=37810,jl=37811,tc=37812,ec=37813,nc=37814,ic=37815,sc=37816,rc=37817,ac=37818,oc=37819,lc=37820,cc=37821,hc=36492,uc=36494,fc=36495,dc=36283,pc=36284,Ua=36285,mc=36286;var ta=2300,Ko=2301,ko=2302,Yh=2303,$h=2400,Zh=2401,Jh=2402;var Pp=3200;var gc=0,Ip=1,Ai="",rn="srgb",ea="srgb-linear",na="linear",ue="srgb";var Go=7680;var Lp=519,Dp=512,Np=513,Up=514,wu=515,Fp=516,Op=517,Au=518,Eu=519,Bp=35044;var Cu="300 es",Dn=2e3,sr=2001;function X0(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function q0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function ia(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function zp(){let s=ia("canvas");return s.style.display="block",s}var wd={},rr=null;function Ru(...s){let t="THREE."+s.shift();rr?rr("log",t,...s):console.log(t,...s)}function kp(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function zt(...s){s=kp(s);let t="THREE."+s.shift();if(rr)rr("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Vt(...s){s=kp(s);let t="THREE."+s.shift();if(rr)rr("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Kr(...s){let t=s.join(" ");t in wd||(wd[t]=!0,zt(...s))}function Gp(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Vp={[Vo]:Vo,[Wo]:Yo,[Xo]:Xo,[ir]:qo,[Ho]:Ho,[Yo]:Wo,[$o]:$o,[qo]:ir},ei=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Mh=Math.PI/180,Qo=180/Math.PI;function Sr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qe[s&255]+Qe[s>>8&255]+Qe[s>>16&255]+Qe[s>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]).toLowerCase()}function te(s,t,e){return Math.max(t,Math.min(e,s))}function Y0(s,t){return(s%t+t)%t}function Sh(s,t,e){return(1-e)*s+e*t}function Hp(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Pu(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function $0(s,t){if(t.constructor===Float32Array)return s;let e=Pu(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function Z0(s,t){if(t.constructor===Float32Array)return s;let e=Pu(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var Fu=class Fu{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Fu.prototype.isVector2=!0;var St=Fu,ni=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3],u=r[a+0],d=r[a+1],m=r[a+2],_=r[a+3];if(f!==_||l!==u||c!==d||h!==m){let p=l*u+c*d+h*m+f*_;p<0&&(u=-u,d=-d,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){let v=Math.acos(p),T=Math.sin(v);g=Math.sin(g*v)/T,o=Math.sin(o*v)/T,l=l*g+u*o,c=c*g+d*o,h=h*g+m*o,f=f*g+_*o}else{l=l*g+u*o,c=c*g+d*o,h=h*g+m*o,f=f*g+_*o;let v=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=v,c*=v,h*=v,f*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[a],u=r[a+1],d=r[a+2],m=r[a+3];return t[e]=o*m+h*f+l*d-c*u,t[e+1]=l*m+h*u+c*f-o*d,t[e+2]=c*m+h*d+o*u-l*f,t[e+3]=h*m-o*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(r/2),u=l(n/2),d=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*m,this._y=c*d*f-u*h*m,this._z=c*h*m+u*d*f,this._w=c*h*f-u*d*m;break;case"YXZ":this._x=u*h*f+c*d*m,this._y=c*d*f-u*h*m,this._z=c*h*m-u*d*f,this._w=c*h*f+u*d*m;break;case"ZXY":this._x=u*h*f-c*d*m,this._y=c*d*f+u*h*m,this._z=c*h*m+u*d*f,this._w=c*h*f-u*d*m;break;case"ZYX":this._x=u*h*f-c*d*m,this._y=c*d*f+u*h*m,this._z=c*h*m-u*d*f,this._w=c*h*f+u*d*m;break;case"YZX":this._x=u*h*f+c*d*m,this._y=c*d*f+u*h*m,this._z=c*h*m-u*d*f,this._w=c*h*f-u*d*m;break;case"XZY":this._x=u*h*f-c*d*m,this._y=c*d*f-u*h*m,this._z=c*h*m+u*d*f,this._w=c*h*f+u*d*m;break;default:zt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ou=class Ou{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ad.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ad.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=i+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return bh.copy(this).projectOnVector(t),this.sub(bh)}reflect(t){return this.sub(bh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ou.prototype.isVector3=!0;var z=Ou,bh=new z,Ad=new ni,Bu=class Bu{constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],m=n[8],_=i[0],p=i[3],g=i[6],v=i[1],T=i[4],y=i[7],w=i[2],A=i[5],x=i[8];return r[0]=a*_+o*v+l*w,r[3]=a*p+o*T+l*A,r[6]=a*g+o*y+l*x,r[1]=c*_+h*v+f*w,r[4]=c*p+h*T+f*A,r[7]=c*g+h*y+f*x,r[2]=u*_+d*v+m*w,r[5]=u*p+d*T+m*A,r[8]=u*g+d*y+m*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,m=e*f+n*u+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=f*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Kr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Th.makeScale(t,e)),this}rotate(t){return Kr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Th.makeRotation(-t)),this}translate(t,e){return Kr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Th.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Bu.prototype.isMatrix3=!0;var Wt=Bu,Th=new Wt,Ed=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cd=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function J0(){let s={enabled:!0,workingColorSpace:ea,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ue&&(i.r=yi(i.r),i.g=yi(i.g),i.b=yi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ue&&(i.r=nr(i.r),i.g=nr(i.g),i.b=nr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ai?na:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ea]:{primaries:t,whitePoint:n,transfer:na,toXYZ:Ed,fromXYZ:Cd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:Ed,fromXYZ:Cd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}}),s}var ie=J0();function yi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function nr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Hs,jo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Hs===void 0&&(Hs=ia("canvas")),Hs.width=t.width,Hs.height=t.height;let i=Hs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Hs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ia("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=yi(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yi(e[n]/255)*255):e[n]=yi(e[n]);return{data:e,width:t.width,height:t.height}}else return zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},K0=0,ar=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=Sr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(wh(i[a].image)):r.push(wh(i[a]))}else r=wh(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function wh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?jo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(zt("Texture: Unable to serialize Texture."),{})}var Q0=0,Ah=new z,pn=class s extends ei{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=jn,i=jn,r=on,a=Ti,o=Xn,l=gn,c=s.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Q0++}),this.uuid=Sr(),this.name="",this.source=new ar(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ah).x}get height(){return this.source.getSize(Ah).y}get depth(){return this.source.getSize(Ah).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){zt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){zt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_u)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zo:t.x=t.x-Math.floor(t.x);break;case jn:t.x=t.x<0?0:1;break;case Jo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zo:t.y=t.y-Math.floor(t.y);break;case jn:t.y=t.y<0?0:1;break;case Jo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=_u;pn.DEFAULT_ANISOTROPY=1;var zu=class zu{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,y=(d+1)/2,w=(g+1)/2,A=(h+u)/4,x=(f+_)/4,S=(m+p)/4;return T>y&&T>w?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=A/n,r=x/n):y>w?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=A/i,r=S/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=x/r,i=S/r),this.set(n,i,r,e),this}let v=Math.sqrt((p-m)*(p-m)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(f-_)/v,this.z=(u-h)/v,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};zu.prototype.isVector4=!0;var Se=zu,tl=class extends ei{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new pn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new ar(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},wn=class extends tl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},sa=class extends pn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var el=class extends pn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Pl=class Pl{constructor(t,e,n,i,r,a,o,l,c,h,f,u,d,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,f,u,d,m,_,p)}set(t,e,n,i,r,a,o,l,c,h,f,u,d,m,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=f,g[14]=u,g[3]=d,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pl().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Ws.setFromMatrixColumn(t,0).length(),r=1/Ws.setFromMatrixColumn(t,1).length(),a=1/Ws.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=a*h,d=a*f,m=o*h,_=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+m*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=m+d*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,m=c*h,_=c*f;e[0]=u+_*o,e[4]=m*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-m,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,m=c*h,_=c*f;e[0]=u-_*o,e[4]=-a*f,e[8]=m+d*o,e[1]=d+m*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,d=a*f,m=o*h,_=o*f;e[0]=l*h,e[4]=m*c-d,e[8]=u*c+_,e[1]=l*f,e[5]=_*c+u,e[9]=d*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,d=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-u*f,e[8]=m*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*f+m,e[10]=u-_*f}else if(t.order==="XZY"){let u=a*l,d=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+_,e[5]=a*h,e[9]=d*f-m,e[2]=m*f-d,e[6]=o*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(j0,t,t_)}lookAt(t,e,n){let i=this.elements;return bn.subVectors(t,e),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Gi.crossVectors(n,bn),Gi.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Gi.crossVectors(n,bn)),Gi.normalize(),po.crossVectors(bn,Gi),i[0]=Gi.x,i[4]=po.x,i[8]=bn.x,i[1]=Gi.y,i[5]=po.y,i[9]=bn.y,i[2]=Gi.z,i[6]=po.z,i[10]=bn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],m=n[2],_=n[6],p=n[10],g=n[14],v=n[3],T=n[7],y=n[11],w=n[15],A=i[0],x=i[4],S=i[8],P=i[12],R=i[1],L=i[5],k=i[9],O=i[13],C=i[2],F=i[6],G=i[10],N=i[14],Y=i[3],V=i[7],J=i[11],K=i[15];return r[0]=a*A+o*R+l*C+c*Y,r[4]=a*x+o*L+l*F+c*V,r[8]=a*S+o*k+l*G+c*J,r[12]=a*P+o*O+l*N+c*K,r[1]=h*A+f*R+u*C+d*Y,r[5]=h*x+f*L+u*F+d*V,r[9]=h*S+f*k+u*G+d*J,r[13]=h*P+f*O+u*N+d*K,r[2]=m*A+_*R+p*C+g*Y,r[6]=m*x+_*L+p*F+g*V,r[10]=m*S+_*k+p*G+g*J,r[14]=m*P+_*O+p*N+g*K,r[3]=v*A+T*R+y*C+w*Y,r[7]=v*x+T*L+y*F+w*V,r[11]=v*S+T*k+y*G+w*J,r[15]=v*P+T*O+y*N+w*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],m=t[3],_=t[7],p=t[11],g=t[15],v=l*d-c*u,T=o*d-c*f,y=o*u-l*f,w=a*d-c*h,A=a*u-l*h,x=a*f-o*h;return e*(_*v-p*T+g*y)-n*(m*v-p*w+g*A)+i*(m*T-_*w+g*x)-r*(m*y-_*A+p*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],m=t[12],_=t[13],p=t[14],g=t[15],v=e*o-n*a,T=e*l-i*a,y=e*c-r*a,w=n*l-i*o,A=n*c-r*o,x=i*c-r*l,S=h*_-f*m,P=h*p-u*m,R=h*g-d*m,L=f*p-u*_,k=f*g-d*_,O=u*g-d*p,C=v*O-T*k+y*L+w*R-A*P+x*S;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/C;return t[0]=(o*O-l*k+c*L)*F,t[1]=(i*k-n*O-r*L)*F,t[2]=(_*x-p*A+g*w)*F,t[3]=(u*A-f*x-d*w)*F,t[4]=(l*R-a*O-c*P)*F,t[5]=(e*O-i*R+r*P)*F,t[6]=(p*y-m*x-g*T)*F,t[7]=(h*x-u*y+d*T)*F,t[8]=(a*k-o*R+c*S)*F,t[9]=(n*R-e*k-r*S)*F,t[10]=(m*A-_*y+g*v)*F,t[11]=(f*y-h*A-d*v)*F,t[12]=(o*P-a*L-l*S)*F,t[13]=(e*L-n*P+i*S)*F,t[14]=(_*T-m*w-p*v)*F,t[15]=(h*w-f*T+u*v)*F,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,m=r*f,_=a*h,p=a*f,g=o*f,v=l*c,T=l*h,y=l*f,w=n.x,A=n.y,x=n.z;return i[0]=(1-(_+g))*w,i[1]=(d+y)*w,i[2]=(m-T)*w,i[3]=0,i[4]=(d-y)*A,i[5]=(1-(u+g))*A,i[6]=(p+v)*A,i[7]=0,i[8]=(m+T)*x,i[9]=(p-v)*x,i[10]=(1-(u+_))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ws.set(i[0],i[1],i[2]).length(),o=Ws.set(i[4],i[5],i[6]).length(),l=Ws.set(i[8],i[9],i[10]).length();r<0&&(a=-a),On.copy(this);let c=1/a,h=1/o,f=1/l;return On.elements[0]*=c,On.elements[1]*=c,On.elements[2]*=c,On.elements[4]*=h,On.elements[5]*=h,On.elements[6]*=h,On.elements[8]*=f,On.elements[9]*=f,On.elements[10]*=f,e.setFromRotationMatrix(On),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Dn,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===Dn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===sr)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Dn,l=!1){let c=this.elements,h=2/(e-t),f=2/(n-i),u=-(e+t)/(e-t),d=-(n+i)/(n-i),m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===Dn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===sr)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Pl.prototype.isMatrix4=!0;var _e=Pl,Ws=new z,On=new _e,j0=new z(0,0,0),t_=new z(1,1,1),Gi=new z,po=new z,bn=new z,Rd=new _e,Pd=new ni,Si=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-te(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Rd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Pd.setFromEuler(this),this.setFromQuaternion(Pd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Si.DEFAULT_ORDER="XYZ";var ra=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},e_=0,Id=new z,Xs=new ni,pi=new _e,mo=new z,Xr=new z,n_=new z,i_=new ni,Ld=new z(1,0,0),Dd=new z(0,1,0),Nd=new z(0,0,1),Ud={type:"added"},s_={type:"removed"},qs={type:"childadded",child:null},Eh={type:"childremoved",child:null},Ve=class s extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=Sr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new z,e=new Si,n=new ni,i=new z(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new _e},normalMatrix:{value:new Wt}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Xs.setFromAxisAngle(t,e),this.quaternion.multiply(Xs),this}rotateOnWorldAxis(t,e){return Xs.setFromAxisAngle(t,e),this.quaternion.premultiply(Xs),this}rotateX(t){return this.rotateOnAxis(Ld,t)}rotateY(t){return this.rotateOnAxis(Dd,t)}rotateZ(t){return this.rotateOnAxis(Nd,t)}translateOnAxis(t,e){return Id.copy(t).applyQuaternion(this.quaternion),this.position.add(Id.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ld,t)}translateY(t){return this.translateOnAxis(Dd,t)}translateZ(t){return this.translateOnAxis(Nd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?mo.copy(t):mo.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Xr,mo,this.up):pi.lookAt(mo,Xr,this.up),this.quaternion.setFromRotationMatrix(pi),i&&(pi.extractRotation(i.matrixWorld),Xs.setFromRotationMatrix(pi),this.quaternion.premultiply(Xs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ud),qs.child=t,this.dispatchEvent(qs),qs.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(s_),Eh.child=t,this.dispatchEvent(Eh),Eh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ud),qs.child=t,this.dispatchEvent(qs),qs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xr,t,n_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xr,i_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ve.DEFAULT_UP=new z(0,1,0);Ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vi=class extends Ve{constructor(){super(),this.isGroup=!0,this.type="Group"}},r_={type:"move"},or=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,m=.005;c.inputState.pinching&&u>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(r_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new vi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Wp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},go={h:0,s:0,l:0};function Ch(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var $t=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ie.workingColorSpace){if(t=Y0(t,1),e=te(e,0,1),n=te(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ch(a,r,t+1/3),this.g=Ch(a,r,t),this.b=Ch(a,r,t-1/3)}return ie.colorSpaceToWorking(this,i),this}setStyle(t,e=rn){function n(r){r!==void 0&&parseFloat(r)<1&&zt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:zt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);zt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=rn){let n=Wp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):zt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yi(t.r),this.g=yi(t.g),this.b=yi(t.b),this}copyLinearToSRGB(t){return this.r=nr(t.r),this.g=nr(t.g),this.b=nr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=rn){return ie.workingToColorSpace(je.copy(this),t),Math.round(te(je.r*255,0,255))*65536+Math.round(te(je.g*255,0,255))*256+Math.round(te(je.b*255,0,255))}getHexString(t=rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.workingToColorSpace(je.copy(this),e);let n=je.r,i=je.g,r=je.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=rn){ie.workingToColorSpace(je.copy(this),t);let e=je.r,n=je.g,i=je.b;return t!==rn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Vi),this.setHSL(Vi.h+t,Vi.s+e,Vi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vi),t.getHSL(go);let n=Sh(Vi.h,go.h,e),i=Sh(Vi.s,go.s,e),r=Sh(Vi.l,go.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},je=new $t;$t.NAMES=Wp;var aa=class extends Ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Si,this.environmentIntensity=1,this.environmentRotation=new Si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Bn=new z,mi=new z,Rh=new z,gi=new z,Ys=new z,$s=new z,Fd=new z,Ph=new z,Ih=new z,Lh=new z,Dh=new Se,Nh=new Se,Uh=new Se,qi=class s{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Bn.subVectors(t,e),i.cross(Bn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Bn.subVectors(i,e),mi.subVectors(n,e),Rh.subVectors(t,e);let a=Bn.dot(Bn),o=Bn.dot(mi),l=Bn.dot(Rh),c=mi.dot(mi),h=mi.dot(Rh),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,gi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gi.x),l.addScaledVector(a,gi.y),l.addScaledVector(o,gi.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Dh.setScalar(0),Nh.setScalar(0),Uh.setScalar(0),Dh.fromBufferAttribute(t,e),Nh.fromBufferAttribute(t,n),Uh.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Dh,r.x),a.addScaledVector(Nh,r.y),a.addScaledVector(Uh,r.z),a}static isFrontFacing(t,e,n,i){return Bn.subVectors(n,e),mi.subVectors(t,e),Bn.cross(mi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Bn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Bn.cross(mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;Ys.subVectors(i,n),$s.subVectors(r,n),Ph.subVectors(t,n);let l=Ys.dot(Ph),c=$s.dot(Ph);if(l<=0&&c<=0)return e.copy(n);Ih.subVectors(t,i);let h=Ys.dot(Ih),f=$s.dot(Ih);if(h>=0&&f<=h)return e.copy(i);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(Ys,a);Lh.subVectors(t,r);let d=Ys.dot(Lh),m=$s.dot(Lh);if(m>=0&&d<=m)return e.copy(r);let _=d*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector($s,o);let p=h*m-d*f;if(p<=0&&f-h>=0&&d-m>=0)return Fd.subVectors(r,i),o=(f-h)/(f-h+(d-m)),e.copy(i).addScaledVector(Fd,o);let g=1/(p+_+u);return a=_*g,o=u*g,e.copy(n).addScaledVector(Ys,a).addScaledVector($s,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Yi=class{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,zn):zn.fromBufferAttribute(r,a),zn.applyMatrix4(t.matrixWorld),this.expandByPoint(zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_o.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_o.copy(n.boundingBox)),_o.applyMatrix4(t.matrixWorld),this.union(_o)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,zn),zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qr),xo.subVectors(this.max,qr),Zs.subVectors(t.a,qr),Js.subVectors(t.b,qr),Ks.subVectors(t.c,qr),Hi.subVectors(Js,Zs),Wi.subVectors(Ks,Js),gs.subVectors(Zs,Ks);let e=[0,-Hi.z,Hi.y,0,-Wi.z,Wi.y,0,-gs.z,gs.y,Hi.z,0,-Hi.x,Wi.z,0,-Wi.x,gs.z,0,-gs.x,-Hi.y,Hi.x,0,-Wi.y,Wi.x,0,-gs.y,gs.x,0];return!Fh(e,Zs,Js,Ks,xo)||(e=[1,0,0,0,1,0,0,0,1],!Fh(e,Zs,Js,Ks,xo))?!1:(vo.crossVectors(Hi,Wi),e=[vo.x,vo.y,vo.z],Fh(e,Zs,Js,Ks,xo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},_i=[new z,new z,new z,new z,new z,new z,new z,new z],zn=new z,_o=new Yi,Zs=new z,Js=new z,Ks=new z,Hi=new z,Wi=new z,gs=new z,qr=new z,xo=new z,vo=new z,_s=new z;function Fh(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){_s.fromArray(s,r);let o=i.x*Math.abs(_s.x)+i.y*Math.abs(_s.y)+i.z*Math.abs(_s.z),l=t.dot(_s),c=e.dot(_s),h=n.dot(_s);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var De=new z,yo=new St,a_=0,ti=class extends ei{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:a_++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Bp,this.updateRanges=[],this.gpuType=Hn,this.version=0,this._normalizationScale=t!==void 0?Pu(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)yo.fromBufferAttribute(this,e),yo.applyMatrix3(t),this.setXY(e,yo.x,yo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix3(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):$0(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Z0(t,this.array)}};var oa=class extends ti{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var la=class extends ti{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ce=class extends ti{constructor(t,e,n){super(new Float32Array(t),e,n)}},o_=new Yi,Yr=new z,Oh=new z,$i=class{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):o_.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Yr.subVectors(t,this.center);let e=Yr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Yr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Oh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yr.copy(t.center).add(Oh)),this.expandByPoint(Yr.copy(t.center).sub(Oh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},l_=0,Ln=new _e,Bh=new Ve,Qs=new z,Tn=new Yi,$r=new Yi,ke=new z,mn=class s extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:l_++}),this.uuid=Sr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(X0(t)?la:oa)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,n){return Ln.makeTranslation(t,e,n),this.applyMatrix4(Ln),this}scale(t,e,n){return Ln.makeScale(t,e,n),this.applyMatrix4(Ln),this}lookAt(t){return Bh.lookAt(t),Bh.updateMatrix(),this.applyMatrix4(Bh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ce(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $i);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){let n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];$r.setFromBufferAttribute(o),this.morphTargetsRelative?(ke.addVectors(Tn.min,$r.min),Tn.expandByPoint(ke),ke.addVectors(Tn.max,$r.max),Tn.expandByPoint(ke)):(Tn.expandByPoint($r.min),Tn.expandByPoint($r.max))}Tn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)ke.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(ke));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ke.fromBufferAttribute(o,c),l&&(Qs.fromBufferAttribute(t,c),ke.add(Qs)),i=Math.max(i,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ti(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let P=0;P<n.count;P++)o[P]=new z,l[P]=new z;let h=new z,f=new z,u=new z,d=new St,m=new St,_=new St,p=new z,g=new z;function v(P,R,L){c[P]=c[R]=c[L]=1,h.fromBufferAttribute(n,P),f.fromBufferAttribute(n,R),u.fromBufferAttribute(n,L),d.fromBufferAttribute(r,P),m.fromBufferAttribute(r,R),_.fromBufferAttribute(r,L),f.sub(h),u.sub(h),m.sub(d),_.sub(d);let k=1/(m.x*_.y-_.x*m.y);isFinite(k)&&(p.copy(f).multiplyScalar(_.y).addScaledVector(u,-m.y).multiplyScalar(k),g.copy(u).multiplyScalar(m.x).addScaledVector(f,-_.x).multiplyScalar(k),o[P].add(p),o[R].add(p),o[L].add(p),l[P].add(g),l[R].add(g),l[L].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let P=0,R=T.length;P<R;++P){let L=T[P],k=L.start,O=L.count;for(let C=k,F=k+O;C<F;C+=3)v(t.getX(C+0),t.getX(C+1),t.getX(C+2))}let y=new z,w=new z,A=new z,x=new z;function S(P){A.fromBufferAttribute(i,P),x.copy(A);let R=o[P];y.copy(R),y.sub(A.multiplyScalar(A.dot(R))).normalize(),w.crossVectors(x,R);let k=w.dot(l[P])<0?-1:1;a.setXYZW(P,y.x,y.y,y.z,k)}for(let P=0,R=n.count;P<R;++P)c[P]&&S(P);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ti(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new z,r=new z,a=new z,o=new z,l=new z,c=new z,h=new z,f=new z;if(t)for(let u=0,d=t.count;u<d;u+=3){let m=t.getX(u+0),_=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h),d=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let g=0;g<h;g++)u[m++]=c[d++]}return new ti(u,h,f)}if(this.index===null)return zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var zh=new z,c_=new z,h_=new Wt,kn=class{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=zh.subVectors(n,e).cross(c_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(zh),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||h_.getNormalMatrix(t),i=this.coplanarPoint(zh).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},u_=0,Gn=class extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:u_++}),this.uuid=Sr(),this.name="",this.type="Material",this.blending=vr,this.side=ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lu,this.blendDst=cu,this.blendEquation=Es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Go,this.stencilZFail=Go,this.stencilZPass=Go,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){zt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){zt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new $t().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new kn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new St().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new St().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var xi=new z,kh=new z,Mo=new z,So=new z,lr=class{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=xi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xi.copy(this.origin).addScaledVector(this.direction,e),xi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){kh.copy(t).add(e).multiplyScalar(.5),Mo.copy(e).sub(t).normalize(),So.copy(this.origin).sub(kh);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Mo),o=So.dot(this.direction),l=-So.dot(Mo),c=So.lengthSq(),h=Math.abs(1-a*a),f,u,d,m;if(h>0)if(f=a*l-o,u=a*o-l,m=r*h,f>=0)if(u>=-m)if(u<=m){let _=1/h;f*=_,u*=_,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-m?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=m?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(kh).addScaledVector(Mo,u),d}intersectSphere(t,e){if(t.radius<0)return null;xi.subVectors(t.center,this.origin);let n=xi.dot(this.direction),i=xi.dot(xi)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,xi)!==null}intersectTriangle(t,e,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,d=t.z-a.z,m=e.x-a.x,_=e.y-a.y,p=e.z-a.z,g=n.x-a.x,v=n.y-a.y,T=n.z-a.z,y=Math.abs(l),w=Math.abs(c),A=Math.abs(h),x,S,P,R,L,k,O,C,F,G,N,Y;if(y>=w&&y>=A?(P=l,k=f,F=m,Y=g,l>=0?(x=c,S=h,R=u,L=d,O=_,C=p,G=v,N=T):(x=h,S=c,R=d,L=u,O=p,C=_,G=T,N=v)):w>=A?(P=c,k=u,F=_,Y=v,c>=0?(x=h,S=l,R=d,L=f,O=p,C=m,G=T,N=g):(x=l,S=h,R=f,L=d,O=m,C=p,G=g,N=T)):(P=h,k=d,F=p,Y=T,h>=0?(x=l,S=c,R=f,L=u,O=m,C=_,G=g,N=v):(x=c,S=l,R=u,L=f,O=_,C=m,G=v,N=g)),P===0)return null;let V=x/P,J=S/P,K=1/P,$=R-V*k,ht=L-J*k,X=O-V*F,ot=C-J*F,pt=G-V*Y,Ct=N-J*Y,ut=pt*ot-Ct*X,Nt=$*Ct-ht*pt,le=X*ht-ot*$;if(i){if(ut<0||Nt<0||le<0)return null}else if((ut<0||Nt<0||le<0)&&(ut>0||Nt>0||le>0))return null;let Ft=ut+Nt+le;if(Ft===0)return null;let qt=K*(ut*k+Nt*F+le*Y);return(Ft>0?qt<0:qt>0)?null:this.at(qt/Ft,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nl=class extends Gn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Si,this.combine=hu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Od=new _e,xs=new lr,bo=new $i,Bd=new z,To=new z,wo=new z,Ao=new z,Gh=new z,Eo=new z,zd=new z,Co=new z,An=class extends Ve{constructor(t=new mn,e=new nl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){Eo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(Gh.fromBufferAttribute(f,t),a?Eo.addScaledVector(Gh,h):Eo.addScaledVector(Gh.sub(e),h))}e.add(Eo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bo.copy(n.boundingSphere),bo.applyMatrix4(r),xs.copy(t.ray).recast(t.near),!(bo.containsPoint(xs.origin)===!1&&(xs.intersectSphere(bo,Bd)===null||xs.origin.distanceToSquared(Bd)>(t.far-t.near)**2))&&(Od.copy(r).invert(),xs.copy(t.ray).applyMatrix4(Od),!(n.boundingBox!==null&&xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xs)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){let p=u[m],g=a[p.materialIndex],v=Math.max(p.start,d.start),T=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let y=v,w=T;y<w;y+=3){let A=o.getX(y),x=o.getX(y+1),S=o.getX(y+2);i=Ro(this,g,t,n,c,h,f,A,x,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=m,g=_;p<g;p+=3){let v=o.getX(p),T=o.getX(p+1),y=o.getX(p+2);i=Ro(this,a,t,n,c,h,f,v,T,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){let p=u[m],g=a[p.materialIndex],v=Math.max(p.start,d.start),T=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let y=v,w=T;y<w;y+=3){let A=y,x=y+1,S=y+2;i=Ro(this,g,t,n,c,h,f,A,x,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=m,g=_;p<g;p+=3){let v=p,T=p+1,y=p+2;i=Ro(this,a,t,n,c,h,f,v,T,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function f_(s,t,e,n,i,r,a,o){let l;if(t.side===ln?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===ji,o),l===null)return null;Co.copy(o),Co.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Co);return c<e.near||c>e.far?null:{distance:c,point:Co.clone(),object:s}}function Ro(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,To),s.getVertexPosition(l,wo),s.getVertexPosition(c,Ao);let h=f_(s,t,e,n,To,wo,Ao,zd);if(h){let f=new z;qi.getBarycoord(zd,To,wo,Ao,f),i&&(h.uv=qi.getInterpolatedAttribute(i,o,l,c,f,new St)),r&&(h.uv1=qi.getInterpolatedAttribute(r,o,l,c,f,new St)),a&&(h.normal=qi.getInterpolatedAttribute(a,o,l,c,f,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new z,materialIndex:0};qi.getNormal(To,wo,Ao,u.normal),h.face=u,h.barycoord=f}return h}var il=class extends pn{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ge,h=Ge,f,u){super(null,a,o,l,c,h,i,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var vs=new $i,d_=new St(.5,.5),Po=new z,Zi=class{constructor(t=new kn,e=new kn,n=new kn,i=new kn,r=new kn,a=new kn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn,n=!1){let i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],m=r[8],_=r[9],p=r[10],g=r[11],v=r[12],T=r[13],y=r[14],w=r[15];if(i[0].setComponents(c-a,d-h,g-m,w-v).normalize(),i[1].setComponents(c+a,d+h,g+m,w+v).normalize(),i[2].setComponents(c+o,d+f,g+_,w+T).normalize(),i[3].setComponents(c-o,d-f,g-_,w-T).normalize(),n)i[4].setComponents(l,u,p,y).normalize(),i[5].setComponents(c-l,d-u,g-p,w-y).normalize();else if(i[4].setComponents(c-l,d-u,g-p,w-y).normalize(),e===Dn)i[5].setComponents(c+l,d+u,g+p,w+y).normalize();else if(e===sr)i[5].setComponents(l,u,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(t){vs.center.set(0,0,0);let e=d_.distanceTo(t.center);return vs.radius=.7071067811865476+e,vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Po.x=i.normal.x>0?t.max.x:t.min.x,Po.y=i.normal.y>0?t.max.y:t.min.y,Po.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Po)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},kd=new _e,sl=class s{constructor(){this.coordinateSystem=Dn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];kd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new Zi),n[i].setFromProjectionMatrix(kd,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new Zi),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};var Ms=class extends Gn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},rl=new z,al=new z,Gd=new _e,Zr=new lr,Io=new $i,Vh=new z,Vd=new z,ol=class extends Ve{constructor(t=new mn,e=new Ms){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)rl.fromBufferAttribute(e,i-1),al.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=rl.distanceTo(al);t.setAttribute("lineDistance",new Ce(n,1))}else zt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(i),Io.radius+=r,t.ray.intersectsSphere(Io)===!1)return;Gd.copy(i).invert(),Zr.copy(t.ray).applyMatrix4(Gd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=d,p=m-1;_<p;_+=c){let g=h.getX(_),v=h.getX(_+1),T=Lo(this,t,Zr,l,g,v,_);T&&e.push(T)}if(this.isLineLoop){let _=h.getX(m-1),p=h.getX(d),g=Lo(this,t,Zr,l,_,p,m-1);g&&e.push(g)}}else{let d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=d,p=m-1;_<p;_+=c){let g=Lo(this,t,Zr,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=Lo(this,t,Zr,l,m-1,d,m-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Lo(s,t,e,n,i,r,a){let o=s.geometry.attributes.position;if(rl.fromBufferAttribute(o,i),al.fromBufferAttribute(o,r),e.distanceSqToSegment(rl,al,Vh,Vd)>n)return;Vh.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Vh);if(!(c<t.near||c>t.far))return{distance:c,point:Vd.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Hd=new z,Wd=new z,cr=class extends ol{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Hd.fromBufferAttribute(e,i),Wd.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Hd.distanceTo(Wd);t.setAttribute("lineDistance",new Ce(n,1))}else zt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ll=class extends Gn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Xd=new _e,Kh=new lr,Do=new $i,No=new z,ca=class extends Ve{constructor(t=new mn,e=new ll){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(i),Do.radius+=r,t.ray.intersectsSphere(Do)===!1)return;Xd.copy(i).invert(),Kh.copy(t.ray).applyMatrix4(Xd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let m=u,_=d;m<_;m++){let p=c.getX(m);No.fromBufferAttribute(f,p),qd(No,p,l,i,t,e,this)}}else{let u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let m=u,_=d;m<_;m++)No.fromBufferAttribute(f,m),qd(No,m,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function qd(s,t,e,n,i,r,a){let o=Kh.distanceSqToPoint(s);if(o<e){let l=new z;Kh.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var ha=class extends pn{constructor(t=[],e=Cs,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var bi=class extends pn{constructor(t,e,n=Vn,i,r,a,o=Ge,l=Ge,c,h=Mi,f=1){if(h!==Mi&&h!==wi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ar(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ua=class extends bi{constructor(t,e=Vn,n=Cs,i,r,a=Ge,o=Ge,l,c=Mi){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},fa=class extends pn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},hr=class s extends mn{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],u=0,d=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(f,2));function m(_,p,g,v,T,y,w,A,x,S,P){let R=y/x,L=w/S,k=y/2,O=w/2,C=A/2,F=x+1,G=S+1,N=0,Y=0,V=new z;for(let J=0;J<G;J++){let K=J*L-O;for(let $=0;$<F;$++){let ht=$*R-k;V[_]=ht*v,V[p]=K*T,V[g]=C,c.push(V.x,V.y,V.z),V[_]=0,V[p]=0,V[g]=A>0?1:-1,h.push(V.x,V.y,V.z),f.push($/x),f.push(1-J/S),N+=1}}for(let J=0;J<S;J++)for(let K=0;K<x;K++){let $=u+K+F*J,ht=u+K+F*(J+1),X=u+(K+1)+F*(J+1),ot=u+(K+1)+F*J;l.push($,ht,ot),l.push(ht,X,ot),Y+=6}o.addGroup(d,Y,P),d+=Y,u+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var En=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){zt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],u=n[i+1]-h,d=(a-h)/u;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new St:new z);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new z,i=[],r=[],a=[],o=new z,l=new _e;for(let d=0;d<=t;d++){let m=d/t;i[d]=this.getTangentAt(m,new z)}r[0]=new z,a[0]=new z;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(te(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(te(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],d*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},ur=class extends En{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new St){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},cl=class extends ur{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Iu(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,i(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var Yd=new z,$d=new z,Hh=new Iu,Wh=new Iu,Xh=new Iu,hl=class extends En{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new z){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:($d.subVectors(i[0],i[1]).add(i[0]),c=$d);let f=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Yd.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Yd),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),p=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),Hh.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,m,_,p),Wh.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,m,_,p),Xh.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(Hh.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),Wh.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Xh.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(Hh.calc(l),Wh.calc(l),Xh.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new z().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Zd(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function p_(s,t){let e=1-s;return e*e*t}function m_(s,t){return 2*(1-s)*s*t}function g_(s,t){return s*s*t}function Qr(s,t,e,n){return p_(s,t)+m_(s,e)+g_(s,n)}function __(s,t){let e=1-s;return e*e*e*t}function x_(s,t){let e=1-s;return 3*e*e*s*t}function v_(s,t){return 3*(1-s)*s*s*t}function y_(s,t){return s*s*s*t}function jr(s,t,e,n,i){return __(s,t)+x_(s,e)+v_(s,n)+y_(s,i)}var da=class extends En{constructor(t=new St,e=new St,n=new St,i=new St){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new St){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(jr(t,i.x,r.x,a.x,o.x),jr(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ul=class extends En{constructor(t=new z,e=new z,n=new z,i=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new z){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(jr(t,i.x,r.x,a.x,o.x),jr(t,i.y,r.y,a.y,o.y),jr(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},pa=class extends En{constructor(t=new St,e=new St){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new St){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new St){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},fl=class extends En{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ma=class extends En{constructor(t=new St,e=new St,n=new St){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new St){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Qr(t,i.x,r.x,a.x),Qr(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},dl=class extends En{constructor(t=new z,e=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new z){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Qr(t,i.x,r.x,a.x),Qr(t,i.y,r.y,a.y),Qr(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ga=class extends En{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new St){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(Zd(o,l.x,c.x,h.x,f.x),Zd(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new St().fromArray(i))}return this}},Qh=Object.freeze({__proto__:null,ArcCurve:cl,CatmullRomCurve3:hl,CubicBezierCurve:da,CubicBezierCurve3:ul,EllipseCurve:ur,LineCurve:pa,LineCurve3:fl,QuadraticBezierCurve:ma,QuadraticBezierCurve3:dl,SplineCurve:ga}),pl=class extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Qh[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Qh[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},Ss=class extends pl{constructor(t){super(),this.type="Path",this.currentPoint=new St,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new pa(this.currentPoint.clone(),new St(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new ma(this.currentPoint.clone(),new St(t,e),new St(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new da(this.currentPoint.clone(),new St(t,e),new St(n,i),new St(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ga(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new ur(t,e,n,i,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},fr=class extends Ss{constructor(t){super(t),this.uuid=Sr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Ss().fromJSON(i))}return this}};function M_(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Xp(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=A_(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,f=l;for(let u=e;u<i;u+=e){let d=s[u],m=s[u+1];d<o&&(o=d),m<l&&(l=m),d>h&&(h=d),m>f&&(f=m)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return _a(r,a,e,o,l,c,0),a}function Xp(s,t,e,n,i){let r;if(i===O_(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=Jd(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Jd(a/n|0,s[a],s[a+1],r);return r&&dr(r,r.next)&&(va(r),r=r.next),r}function bs(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(dr(e,e.next)||Ee(e.prev,e,e.next)===0)){if(va(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function _a(s,t,e,n,i,r,a){if(!s)return;!a&&r&&I_(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?b_(s,n,i,r):S_(s)){t.push(l.i,s.i,c.i),va(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=T_(bs(s),t),_a(s,t,e,n,i,r,2)):a===2&&w_(s,t,e,n,i,r):_a(bs(s),t,e,n,i,r,1);break}}}function S_(s){let t=s.prev,e=s,n=s.next;if(Ee(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),f=Math.min(o,l,c),u=Math.max(i,r,a),d=Math.max(o,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=f&&m.y<=d&&Jr(i,o,r,l,a,c,m.x,m.y)&&Ee(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function b_(s,t,e,n){let i=s.prev,r=s,a=s.next;if(Ee(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,f=r.y,u=a.y,d=Math.min(o,l,c),m=Math.min(h,f,u),_=Math.max(o,l,c),p=Math.max(h,f,u),g=jh(d,m,t,e,n),v=jh(_,p,t,e,n),T=s.prevZ,y=s.nextZ;for(;T&&T.z>=g&&y&&y.z<=v;){if(T.x>=d&&T.x<=_&&T.y>=m&&T.y<=p&&T!==i&&T!==a&&Jr(o,h,l,f,c,u,T.x,T.y)&&Ee(T.prev,T,T.next)>=0||(T=T.prevZ,y.x>=d&&y.x<=_&&y.y>=m&&y.y<=p&&y!==i&&y!==a&&Jr(o,h,l,f,c,u,y.x,y.y)&&Ee(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;T&&T.z>=g;){if(T.x>=d&&T.x<=_&&T.y>=m&&T.y<=p&&T!==i&&T!==a&&Jr(o,h,l,f,c,u,T.x,T.y)&&Ee(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;y&&y.z<=v;){if(y.x>=d&&y.x<=_&&y.y>=m&&y.y<=p&&y!==i&&y!==a&&Jr(o,h,l,f,c,u,y.x,y.y)&&Ee(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function T_(s,t){let e=s;do{let n=e.prev,i=e.next.next;!dr(n,i)&&Yp(n,e,e.next,i)&&xa(n,i)&&xa(i,n)&&(t.push(n.i,e.i,i.i),va(e),va(e.next),e=s=i),e=e.next}while(e!==s);return bs(e)}function w_(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&N_(a,o)){let l=$p(a,o);a=bs(a,a.next),l=bs(l,l.next),_a(a,t,e,n,i,r,0),_a(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function A_(s,t,e,n){let i=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Xp(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(D_(c))}i.sort(E_);for(let r=0;r<i.length;r++)e=C_(i[r],e);return e}function E_(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function C_(s,t){let e=R_(s,t);if(!e)return t;let n=$p(e,s);return bs(n,n.next),bs(e,e.next)}function R_(s,t){let e=t,n=s.x,i=s.y,r=-1/0,a;if(dr(s,e))return e;do{if(dr(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let f=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&qp(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let f=Math.abs(i-e.y)/(n-e.x);xa(e,s)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&P_(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function P_(s,t){return Ee(s.prev,s,t.prev)<0&&Ee(t.next,s,s.next)<0}function I_(s,t,e,n){let i=s;do i.z===0&&(i.z=jh(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,L_(i)}function L_(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function jh(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function D_(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function qp(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Jr(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&qp(s,t,e,n,i,r,a,o)}function N_(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!U_(s,t)&&(xa(s,t)&&xa(t,s)&&F_(s,t)&&(Ee(s.prev,s,t.prev)||Ee(s,t.prev,t))||dr(s,t)&&Ee(s.prev,s,s.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function dr(s,t){return s.x===t.x&&s.y===t.y}function Yp(s,t,e,n){let i=Fo(Ee(s,t,e)),r=Fo(Ee(s,t,n)),a=Fo(Ee(e,n,s)),o=Fo(Ee(e,n,t));return!!(i!==r&&a!==o||i===0&&Uo(s,e,t)||r===0&&Uo(s,n,t)||a===0&&Uo(e,s,n)||o===0&&Uo(e,t,n))}function Uo(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Fo(s){return s>0?1:s<0?-1:0}function U_(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Yp(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function xa(s,t){return Ee(s.prev,s,s.next)<0?Ee(s,t,s.next)>=0&&Ee(s,s.prev,t)>=0:Ee(s,t,s.prev)<0||Ee(s,s.next,t)<0}function F_(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function $p(s,t){let e=tu(s.i,s.x,s.y),n=tu(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Jd(s,t,e,n){let i=tu(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function va(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function tu(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function O_(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var eu=class{static triangulate(t,e,n=2){return M_(t,e,n)}},ys=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];Kd(t),Qd(n,t);let a=t.length;e.forEach(Kd);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Qd(n,e[l]);let o=eu.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Kd(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Qd(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var ya=class s extends mn{constructor(t=new fr([new St(.5,.5),new St(-.5,.5),new St(-.5,-.5),new St(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Ce(i,3)),this.setAttribute("uv",new Ce(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:B_,T,y=!1,w,A,x,S;if(g){T=g.getSpacedPoints(h),y=!0,u=!1;let B=g.isCatmullRomCurve3?g.closed:!1;w=g.computeFrenetFrames(h,B),A=new z,x=new z,S=new z}u||(p=0,d=0,m=0,_=0);let P=o.extractPoints(c),R=P.shape,L=P.holes;if(!ys.isClockWise(R)){R=R.reverse();for(let B=0,Q=L.length;B<Q;B++){let nt=L[B];ys.isClockWise(nt)&&(L[B]=nt.reverse())}}function O(B){let nt=10000000000000001e-36,at=B[0];for(let rt=1;rt<=B.length;rt++){let Et=rt%B.length,bt=B[Et],Gt=bt.x-at.x,Ht=bt.y-at.y,kt=Gt*Gt+Ht*Ht,D=Math.max(Math.abs(bt.x),Math.abs(bt.y),Math.abs(at.x),Math.abs(at.y)),de=nt*D*D;if(kt<=de){B.splice(Et,1),rt--;continue}at=bt}}O(R),L.forEach(O);let C=L.length,F=R;for(let B=0;B<C;B++){let Q=L[B];R=R.concat(Q)}function G(B,Q,nt){return Q||Vt("ExtrudeGeometry: vec does not exist"),B.clone().addScaledVector(Q,nt)}let N=R.length;function Y(B,Q,nt){let at,rt,Et,bt=B.x-Q.x,Gt=B.y-Q.y,Ht=nt.x-B.x,kt=nt.y-B.y,D=bt*bt+Gt*Gt,de=bt*kt-Gt*Ht;if(Math.abs(de)>Number.EPSILON){let Xt=Math.sqrt(D),re=Math.sqrt(Ht*Ht+kt*kt),dt=Q.x-Gt/Xt,he=Q.y+bt/Xt,Lt=nt.x-kt/re,Bt=nt.y+Ht/re,E=((Lt-dt)*kt-(Bt-he)*Ht)/(bt*kt-Gt*Ht);at=dt+bt*E-B.x,rt=he+Gt*E-B.y;let M=at*at+rt*rt;if(M<=2)return new St(at,rt);Et=Math.sqrt(M/2)}else{let Xt=!1;bt>Number.EPSILON?Ht>Number.EPSILON&&(Xt=!0):bt<-Number.EPSILON?Ht<-Number.EPSILON&&(Xt=!0):Math.sign(Gt)===Math.sign(kt)&&(Xt=!0),Xt?(at=-Gt,rt=bt,Et=Math.sqrt(D)):(at=bt,rt=Gt,Et=Math.sqrt(D/2))}return new St(at/Et,rt/Et)}let V=[];for(let B=0,Q=F.length,nt=Q-1,at=B+1;B<Q;B++,nt++,at++)nt===Q&&(nt=0),at===Q&&(at=0),V[B]=Y(F[B],F[nt],F[at]);let J=[],K,$=V.concat();for(let B=0,Q=C;B<Q;B++){let nt=L[B];K=[];for(let at=0,rt=nt.length,Et=rt-1,bt=at+1;at<rt;at++,Et++,bt++)Et===rt&&(Et=0),bt===rt&&(bt=0),K[at]=Y(nt[at],nt[Et],nt[bt]);J.push(K),$=$.concat(K)}let ht;if(p===0)ht=ys.triangulateShape(F,L);else{let B=[],Q=[];for(let nt=0;nt<p;nt++){let at=nt/p,rt=d*Math.cos(at*Math.PI/2),Et=m*Math.sin(at*Math.PI/2)+_;for(let bt=0,Gt=F.length;bt<Gt;bt++){let Ht=G(F[bt],V[bt],Et);Nt(Ht.x,Ht.y,-rt),at===0&&B.push(Ht)}for(let bt=0,Gt=C;bt<Gt;bt++){let Ht=L[bt];K=J[bt];let kt=[];for(let D=0,de=Ht.length;D<de;D++){let Xt=G(Ht[D],K[D],Et);Nt(Xt.x,Xt.y,-rt),at===0&&kt.push(Xt)}at===0&&Q.push(kt)}}ht=ys.triangulateShape(B,Q)}let X=ht.length,ot=m+_;for(let B=0;B<N;B++){let Q=u?G(R[B],$[B],ot):R[B];y?(x.copy(w.normals[0]).multiplyScalar(Q.x),A.copy(w.binormals[0]).multiplyScalar(Q.y),S.copy(T[0]).add(x).add(A),Nt(S.x,S.y,S.z)):Nt(Q.x,Q.y,0)}for(let B=1;B<=h;B++)for(let Q=0;Q<N;Q++){let nt=u?G(R[Q],$[Q],ot):R[Q];y?(x.copy(w.normals[B]).multiplyScalar(nt.x),A.copy(w.binormals[B]).multiplyScalar(nt.y),S.copy(T[B]).add(x).add(A),Nt(S.x,S.y,S.z)):Nt(nt.x,nt.y,f/h*B)}for(let B=p-1;B>=0;B--){let Q=B/p,nt=d*Math.cos(Q*Math.PI/2),at=m*Math.sin(Q*Math.PI/2)+_;for(let rt=0,Et=F.length;rt<Et;rt++){let bt=G(F[rt],V[rt],at);Nt(bt.x,bt.y,f+nt)}for(let rt=0,Et=L.length;rt<Et;rt++){let bt=L[rt];K=J[rt];for(let Gt=0,Ht=bt.length;Gt<Ht;Gt++){let kt=G(bt[Gt],K[Gt],at);y?Nt(kt.x,kt.y+T[h-1].y,T[h-1].x+nt):Nt(kt.x,kt.y,f+nt)}}}pt(),Ct();function pt(){let B=i.length/3;if(u){let Q=0,nt=N*Q;for(let at=0;at<X;at++){let rt=ht[at];le(rt[2]+nt,rt[1]+nt,rt[0]+nt)}Q=h+p*2,nt=N*Q;for(let at=0;at<X;at++){let rt=ht[at];le(rt[0]+nt,rt[1]+nt,rt[2]+nt)}}else{for(let Q=0;Q<X;Q++){let nt=ht[Q];le(nt[2],nt[1],nt[0])}for(let Q=0;Q<X;Q++){let nt=ht[Q];le(nt[0]+N*h,nt[1]+N*h,nt[2]+N*h)}}n.addGroup(B,i.length/3-B,0)}function Ct(){let B=i.length/3,Q=0;ut(F,Q),Q+=F.length;for(let nt=0,at=L.length;nt<at;nt++){let rt=L[nt];ut(rt,Q),Q+=rt.length}n.addGroup(B,i.length/3-B,1)}function ut(B,Q){let nt=B.length;for(;--nt>=0;){let at=nt,rt=nt-1;rt<0&&(rt=B.length-1);for(let Et=0,bt=h+p*2;Et<bt;Et++){let Gt=N*Et,Ht=N*(Et+1),kt=Q+at+Gt,D=Q+rt+Gt,de=Q+rt+Ht,Xt=Q+at+Ht;Ft(kt,D,de,Xt)}}}function Nt(B,Q,nt){l.push(B),l.push(Q),l.push(nt)}function le(B,Q,nt){qt(B),qt(Q),qt(nt);let at=i.length/3,rt=v.generateTopUV(n,i,at-3,at-2,at-1);Jt(rt[0]),Jt(rt[1]),Jt(rt[2])}function Ft(B,Q,nt,at){qt(B),qt(Q),qt(at),qt(Q),qt(nt),qt(at);let rt=i.length/3,Et=v.generateSideWallUV(n,i,rt-6,rt-3,rt-2,rt-1);Jt(Et[0]),Jt(Et[1]),Jt(Et[3]),Jt(Et[1]),Jt(Et[2]),Jt(Et[3])}function qt(B){i.push(l[B*3+0]),i.push(l[B*3+1]),i.push(l[B*3+2])}function Jt(B){r.push(B.x),r.push(B.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return z_(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Qh[i.type]().fromJSON(i)),new s(n,t.options)}},B_={generateTopUV:function(s,t,e,n,i){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new St(r,a),new St(o,l),new St(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[i*3],d=t[i*3+1],m=t[i*3+2],_=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new St(a,1-l),new St(c,1-f),new St(u,1-m),new St(_,1-g)]:[new St(o,1-l),new St(h,1-f),new St(d,1-m),new St(p,1-g)]}};function z_(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ts=class s extends mn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=t/o,u=e/l,d=[],m=[],_=[],p=[];for(let g=0;g<h;g++){let v=g*u-a;for(let T=0;T<c;T++){let y=T*f-r;m.push(y,-v,0),_.push(0,0,1),p.push(T/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){let T=v+c*g,y=v+c*(g+1),w=v+1+c*(g+1),A=v+1+c*g;d.push(T,y,A),d.push(y,w,A)}this.setIndex(d),this.setAttribute("position",new Ce(m,3)),this.setAttribute("normal",new Ce(_,3)),this.setAttribute("uv",new Ce(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ma=class extends Gn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new $t(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function Ps(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(jd(i))i.isRenderTargetTexture?(zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(jd(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function tn(s){let t={};for(let e=0;e<s.length;e++){let n=Ps(s[e]);for(let i in n)t[i]=n[i]}return t}function jd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function k_(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Lu(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}var Zp={clone:Ps,merge:tn},G_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,V_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nn=class extends Gn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=G_,this.fragmentShader=V_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ps(t.uniforms),this.uniformsGroups=k_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new $t().setHex(i.value);break;case"v2":this.uniforms[n].value=new St().fromArray(i.value);break;case"v3":this.uniforms[n].value=new z().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Se().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Wt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new _e().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ml=class extends Nn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},pr=class extends Gn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gc,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var gl=class extends Gn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},_l=class extends Gn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function js(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Oo(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var Ji=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},xl=class extends Ji{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$h,endingEnd:$h}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zh:r=t,o=2*e-n;break;case Jh:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zh:a=t,l=2*n-e;break;case Jh:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,m=(n-e)/(i-e),_=m*m,p=_*m,g=-u*p+2*u*_-u*m,v=(1+u)*p+(-1.5-2*u)*_+(-.5+u)*m+1,T=(-1-d)*p+(1.5+d)*_+.5*m,y=d*p-d*_;for(let w=0;w!==o;++w)r[w]=g*a[h+w]+v*a[c+w]+T*a[l+w]+y*a[f+w];return r}},vl=class extends Ji{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),f=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*f+a[l+u]*h;return r}},yl=class extends Ji{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Ml=class extends Ji{interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let m=(n-e)/(i-e),_=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*_+a[l+p]*m;return r}let u=o*2,d=t-1;for(let m=0;m!==o;++m){let _=a[c+m],p=a[l+m],g=d*u+m*2,v=f[g],T=f[g+1],y=t*u+m*2,w=h[y],A=h[y+1],x=W_(n,e,v,w,i);r[m]=Jp(x,_,T,A,p)}return r}};function Jp(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function H_(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function W_(s,t,e,n,i){let r=(s-t)/(i-t);for(let a=0;a<8;a++){let o=Jp(r,t,e,n,i)-s;if(Math.abs(o)<1e-10)break;let l=H_(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Cn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=js(e,this.TimeBufferType),this.values=js(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:js(t.times,Array),values:js(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Oo(t.settings)&&(n.settings={inTangents:js(t.settings.inTangents,Array),outTangents:js(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new yl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new vl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new xl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ml(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case ta:e=this.InterpolantFactoryMethodDiscrete;break;case Ko:e=this.InterpolantFactoryMethodLinear;break;case ko:e=this.InterpolantFactoryMethodSmooth;break;case Yh:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return zt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ta;case this.InterpolantFactoryMethodLinear:return Ko;case this.InterpolantFactoryMethodSmooth:return ko;case this.InterpolantFactoryMethodBezier:return Yh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;Oo(this.settings)&&(tp(this.settings.inTangents,t),tp(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Oo(this.settings)&&(ep(this.settings.inTangents,t),ep(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Vt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Vt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&q0(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Vt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ko,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let f=o*n,u=f-n,d=f+n;for(let m=0;m!==n;++m){let _=e[f+m];if(_!==e[u+m]||_!==e[d+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)e[u+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Oo(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function tp(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]+=t}function ep(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}Cn.prototype.ValueTypeName="";Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=Ko;var Ki=class extends Cn{constructor(t,e,n){super(t,e,n)}};Ki.prototype.ValueTypeName="bool";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=ta;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Sl=class extends Cn{constructor(t,e,n,i){super(t,e,n,i)}};Sl.prototype.ValueTypeName="color";var bl=class extends Cn{constructor(t,e,n,i){super(t,e,n,i)}};bl.prototype.ValueTypeName="number";var Tl=class extends Ji{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)ni.slerpFlat(r,0,a,c-o,a,c,l);return r}},Sa=class extends Cn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Tl(this.times,this.values,this.getValueSize(),t)}};Sa.prototype.ValueTypeName="quaternion";Sa.prototype.InterpolantFactoryMethodSmooth=void 0;var Qi=class extends Cn{constructor(t,e,n){super(t,e,n)}};Qi.prototype.ValueTypeName="string";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=ta;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var wl=class extends Cn{constructor(t,e,n,i){super(t,e,n,i)}};wl.prototype.ValueTypeName="vector";var Al=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],m=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Kp=new Al,El=class{constructor(t){this.manager=t!==void 0?t:Kp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};El.DEFAULT_MATERIAL_NAME="__DEFAULT";var mr=class extends Ve{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},ba=class extends mr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $t(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},qh=new _e,np=new z,ip=new z,Cl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.mapType=gn,this.map=null,this.mapPass=null,this.matrix=new _e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zi,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;np.setFromMatrixPosition(t.matrixWorld),e.position.copy(np),ip.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ip),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){qh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(qh,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===sr||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(qh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Bo=new z,zo=new ni,Qn=new z,Ta=class extends Ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Bo,zo,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bo,zo,Qn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Bo,zo,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bo,zo,Qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xi=new z,sp=new St,rp=new St,an=class extends Ta{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Qo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Mh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qo*2*Math.atan(Math.tan(Mh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z)}getViewSize(t,e){return this.getViewBounds(t,sp,rp),e.subVectors(rp,sp)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Mh*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var wa=class extends Ta{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},nu=class extends Cl{constructor(){super(new wa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},gr=class extends mr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.target=new Ve,this.shadow=new nu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Aa=class extends mr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var tr=-90,er=1,_r=class extends Ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new an(tr,er,t,e);i.layers=this.layers,this.add(i);let r=new an(tr,er,t,e);r.layers=this.layers,this.add(r);let a=new an(tr,er,t,e);a.layers=this.layers,this.add(a);let o=new an(tr,er,t,e);o.layers=this.layers,this.add(o);let l=new an(tr,er,t,e);l.layers=this.layers,this.add(l);let c=new an(tr,er,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Rl=class extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Du="\\[\\]\\.:\\/",X_=new RegExp("["+Du+"]","g"),Nu="[^"+Du+"]",q_="[^"+Du.replace("\\.","")+"]",Y_=/((?:WC+[\/:])*)/.source.replace("WC",Nu),$_=/(WCOD+)?/.source.replace("WCOD",q_),Z_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nu),J_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nu),K_=new RegExp("^"+Y_+$_+Z_+J_+"$"),Q_=["material","materials","bones","map"],iu=class{constructor(t,e,n){let i=n||ye.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ye=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(X_,"")}static parseTrackName(t){let e=K_.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Q_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){zt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;Vt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ye.Composite=iu;ye.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ye.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ye.prototype.GetterByBindingType=[ye.prototype._getValue_direct,ye.prototype._getValue_array,ye.prototype._getValue_arrayElement,ye.prototype._getValue_toArray];ye.prototype.SetterByBindingTypeAndVersioning=[[ye.prototype._setValue_direct,ye.prototype._setValue_direct_setNeedsUpdate,ye.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_array,ye.prototype._setValue_array_setNeedsUpdate,ye.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_arrayElement,ye.prototype._setValue_arrayElement_setNeedsUpdate,ye.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_fromArray,ye.prototype._setValue_fromArray_setNeedsUpdate,ye.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var yb=new Float32Array(1);var ku=class ku{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};ku.prototype.isMatrix2=!0;var su=ku;function Uu(s,t,e,n){let i=j_(n);switch(e){case Su:return s*t;case Tu:return s*t/i.components*i.byteLength;case Ol:return s*t/i.components*i.byteLength;case ts:return s*t*2/i.components*i.byteLength;case Bl:return s*t*2/i.components*i.byteLength;case bu:return s*t*3/i.components*i.byteLength;case Xn:return s*t*4/i.components*i.byteLength;case zl:return s*t*4/i.components*i.byteLength;case Pa:case Ia:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case La:case Da:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Gl:case Hl:return Math.max(s,16)*Math.max(t,8)/4;case kl:case Vl:return Math.max(s,8)*Math.max(t,8)/2;case Wl:case Xl:case Yl:case $l:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ql:case Na:case Zl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Jl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Kl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ql:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case jl:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case tc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ec:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case nc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ic:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case sc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case rc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case ac:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case oc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case lc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case cc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case hc:case uc:case fc:return Math.ceil(s/4)*Math.ceil(t/4)*16;case dc:case pc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ua:case mc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function j_(s){switch(s){case gn:case xu:return{byteLength:1,components:1};case Mr:case vu:case Wn:return{byteLength:2,components:1};case Ul:case Fl:return{byteLength:2,components:4};case Vn:case Nl:case Hn:return{byteLength:4,components:1};case yu:case Mu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function vm(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function ex(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let h=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,h);else{f.sort((d,m)=>d.start-m.start);let u=0;for(let d=1;d<f.length;d++){let m=f[u],_=f[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,m=f.length;d<m;d++){let _=f[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var nx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ix=`#ifdef USE_ALPHAHASH
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
#endif`,sx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ax=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ox=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lx=`#ifdef USE_AOMAP
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
#endif`,cx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hx=`#ifdef USE_BATCHING
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
#endif`,ux=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,px=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mx=`#ifdef USE_IRIDESCENCE
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
#endif`,gx=`#ifdef USE_BUMPMAP
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
#endif`,_x=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Sx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,bx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Tx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wx=`#define PI 3.141592653589793
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
} // validated`,Ax=`vec3 transformedNormal = objectNormal;
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
#endif`,Ex=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Px=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ix="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dx=`#ifdef USE_ENVMAP
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
#endif`,Nx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Ux=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ox=`#ifdef USE_ENVMAP
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
#endif`,Bx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vx=`#ifdef USE_GRADIENTMAP
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
}`,Hx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Yx=`#ifdef USE_ENVMAP
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
#endif`,$x=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qx=`PhysicalMaterial material;
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
#endif`,jx=`uniform sampler2D dfgLUT;
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
}`,tv=`
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
#endif`,ev=`#if defined( RE_IndirectDiffuse )
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
#endif`,nv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iv=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,sv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,av=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ov=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,uv=`#if defined( USE_POINTS_UV )
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
#endif`,fv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mv=`#if defined( USE_MORPHCOLORS )
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
#endif`,gv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_v=`#ifdef USE_MORPHTARGETS
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
#endif`,xv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Mv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Tv=`#ifdef USE_NORMALMAP
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
#endif`,wv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Av=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ev=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Iv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Uv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ov=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kv=`float getShadowMask() {
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
}`,Gv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vv=`#ifdef USE_SKINNING
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
#endif`,Hv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wv=`#ifdef USE_SKINNING
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
#endif`,Xv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$v=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zv=`#ifdef USE_TRANSMISSION
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
#endif`,Jv=`#ifdef USE_TRANSMISSION
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
#endif`,Kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ty=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ey=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ny=`uniform sampler2D t2D;
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
}`,iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sy=`uniform float backgroundBlurriness;
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
}`,ry=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ay=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oy=`#include <common>
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
}`,ly=`#if DEPTH_PACKING == 3200
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
}`,cy=`#define DISTANCE
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
}`,hy=`#define DISTANCE
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
}`,uy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dy=`uniform float scale;
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
}`,py=`uniform vec3 diffuse;
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
}`,my=`#include <common>
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
}`,gy=`uniform vec3 diffuse;
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
}`,_y=`#define LAMBERT
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
}`,xy=`#define LAMBERT
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
}`,vy=`#define MATCAP
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
}`,yy=`#define MATCAP
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
}`,My=`#define NORMAL
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
}`,Sy=`#define NORMAL
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
}`,by=`#define PHONG
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
}`,Ty=`#define PHONG
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
}`,wy=`#define STANDARD
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
}`,Ay=`#define STANDARD
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
}`,Ey=`#define TOON
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
}`,Cy=`#define TOON
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
}`,Ry=`uniform float size;
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
}`,Py=`uniform vec3 diffuse;
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
}`,Iy=`#include <common>
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
}`,Ly=`uniform vec3 color;
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
}`,Dy=`uniform float rotation;
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
}`,Ny=`uniform vec3 diffuse;
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
}`,jt={alphahash_fragment:nx,alphahash_pars_fragment:ix,alphamap_fragment:sx,alphamap_pars_fragment:rx,alphatest_fragment:ax,alphatest_pars_fragment:ox,aomap_fragment:lx,aomap_pars_fragment:cx,batching_pars_vertex:hx,batching_vertex:ux,begin_vertex:fx,beginnormal_vertex:dx,bsdfs:px,iridescence_fragment:mx,bumpmap_pars_fragment:gx,clipping_planes_fragment:_x,clipping_planes_pars_fragment:xx,clipping_planes_pars_vertex:vx,clipping_planes_vertex:yx,color_fragment:Mx,color_pars_fragment:Sx,color_pars_vertex:bx,color_vertex:Tx,common:wx,defaultnormal_vertex:Ax,displacementmap_pars_vertex:Ex,displacementmap_vertex:Cx,emissivemap_fragment:Rx,emissivemap_pars_fragment:Px,colorspace_fragment:Ix,colorspace_pars_fragment:Lx,envmap_fragment:Dx,envmap_common_pars_fragment:Nx,envmap_pars_fragment:Ux,envmap_pars_vertex:Fx,envmap_physical_pars_fragment:Yx,envmap_vertex:Ox,fog_vertex:Bx,fog_pars_vertex:zx,fog_fragment:kx,fog_pars_fragment:Gx,gradientmap_pars_fragment:Vx,lightmap_pars_fragment:Hx,lights_lambert_fragment:Wx,lights_lambert_pars_fragment:Xx,lights_pars_begin:qx,lights_toon_fragment:$x,lights_toon_pars_fragment:Zx,lights_phong_fragment:Jx,lights_phong_pars_fragment:Kx,lights_physical_fragment:Qx,lights_physical_pars_fragment:jx,lights_fragment_begin:tv,lights_fragment_maps:ev,lights_fragment_end:nv,lightprobes_pars_fragment:iv,logdepthbuf_fragment:sv,logdepthbuf_pars_fragment:rv,logdepthbuf_pars_vertex:av,logdepthbuf_vertex:ov,map_fragment:lv,map_pars_fragment:cv,map_particle_fragment:hv,map_particle_pars_fragment:uv,metalnessmap_fragment:fv,metalnessmap_pars_fragment:dv,morphinstance_vertex:pv,morphcolor_vertex:mv,morphnormal_vertex:gv,morphtarget_pars_vertex:_v,morphtarget_vertex:xv,normal_fragment_begin:vv,normal_fragment_maps:yv,normal_pars_fragment:Mv,normal_pars_vertex:Sv,normal_vertex:bv,normalmap_pars_fragment:Tv,clearcoat_normal_fragment_begin:wv,clearcoat_normal_fragment_maps:Av,clearcoat_pars_fragment:Ev,iridescence_pars_fragment:Cv,opaque_fragment:Rv,packing:Pv,premultiplied_alpha_fragment:Iv,project_vertex:Lv,dithering_fragment:Dv,dithering_pars_fragment:Nv,roughnessmap_fragment:Uv,roughnessmap_pars_fragment:Fv,shadowmap_pars_fragment:Ov,shadowmap_pars_vertex:Bv,shadowmap_vertex:zv,shadowmask_pars_fragment:kv,skinbase_vertex:Gv,skinning_pars_vertex:Vv,skinning_vertex:Hv,skinnormal_vertex:Wv,specularmap_fragment:Xv,specularmap_pars_fragment:qv,tonemapping_fragment:Yv,tonemapping_pars_fragment:$v,transmission_fragment:Zv,transmission_pars_fragment:Jv,uv_pars_fragment:Kv,uv_pars_vertex:Qv,uv_vertex:jv,worldpos_vertex:ty,background_vert:ey,background_frag:ny,backgroundCube_vert:iy,backgroundCube_frag:sy,cube_vert:ry,cube_frag:ay,depth_vert:oy,depth_frag:ly,distance_vert:cy,distance_frag:hy,equirect_vert:uy,equirect_frag:fy,linedashed_vert:dy,linedashed_frag:py,meshbasic_vert:my,meshbasic_frag:gy,meshlambert_vert:_y,meshlambert_frag:xy,meshmatcap_vert:vy,meshmatcap_frag:yy,meshnormal_vert:My,meshnormal_frag:Sy,meshphong_vert:by,meshphong_frag:Ty,meshphysical_vert:wy,meshphysical_frag:Ay,meshtoon_vert:Ey,meshtoon_frag:Cy,points_vert:Ry,points_frag:Py,shadow_vert:Iy,shadow_frag:Ly,sprite_vert:Dy,sprite_frag:Ny},wt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},ai={basic:{uniforms:tn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:tn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new $t(0)},envMapIntensity:{value:1}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:tn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:tn([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:tn([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new $t(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:tn([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:tn([wt.points,wt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:tn([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:tn([wt.common,wt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:tn([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:tn([wt.sprite,wt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distance:{uniforms:tn([wt.common,wt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distance_vert,fragmentShader:jt.distance_frag},shadow:{uniforms:tn([wt.lights,wt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};ai.physical={uniforms:tn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Wt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};var _c={r:0,b:0,g:0},Uy=new _e,ym=new Wt;ym.set(-1,0,0,0,1,0,0,0,1);function Fy(s,t,e,n,i,r){let a=new $t(0),o=i===!0?0:1,l,c,h=null,f=0,u=null;function d(v){let T=v.isScene===!0?v.background:null;if(T&&T.isTexture){let y=v.backgroundBlurriness>0;T=t.get(T,y)}return T}function m(v){let T=!1,y=d(v);y===null?p(a,o):y&&y.isColor&&(p(y,1),T=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(v,T){let y=d(T);y&&y.isCubeTexture?(c===void 0&&(c=new An(new hr(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:Ps(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,A,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Uy.makeRotationFromEuler(T.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ym),c.material.toneMapped=ie.getTransfer(y.colorSpace)!==ue,(h!==y||f!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new An(new Ts(2,2),new Nn({name:"BackgroundMaterial",uniforms:Ps(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:ji,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=ie.getTransfer(y.colorSpace)!==ue,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,T){v.getRGB(_c,Lu(s)),e.buffers.color.setClear(_c.r,_c.g,_c.b,T,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,T=1){a.set(v),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,p(a,o)},render:m,addToRenderList:_,dispose:g}}function Oy(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,a=!1;function o(L,k,O,C,F){let G=!1,N=f(L,C,O,k);r!==N&&(r=N,c(r.object)),G=d(L,C,O,F),G&&m(L,C,O,F),F!==null&&t.update(F,s.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,y(L,k,O,C),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function f(L,k,O,C){let F=C.wireframe===!0,G=n[k.id];G===void 0&&(G={},n[k.id]=G);let N=L.isInstancedMesh===!0?L.id:0,Y=G[N];Y===void 0&&(Y={},G[N]=Y);let V=Y[O.id];V===void 0&&(V={},Y[O.id]=V);let J=V[F];return J===void 0&&(J=u(l()),V[F]=J),J}function u(L){let k=[],O=[],C=[];for(let F=0;F<e;F++)k[F]=0,O[F]=0,C[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:O,attributeDivisors:C,object:L,attributes:{},index:null}}function d(L,k,O,C){let F=r.attributes,G=k.attributes,N=0,Y=O.getAttributes();for(let V in Y)if(Y[V].location>=0){let K=F[V],$=G[V];if($===void 0&&(V==="instanceMatrix"&&L.instanceMatrix&&($=L.instanceMatrix),V==="instanceColor"&&L.instanceColor&&($=L.instanceColor)),K===void 0||K.attribute!==$||$&&K.data!==$.data)return!0;N++}return r.attributesNum!==N||r.index!==C}function m(L,k,O,C){let F={},G=k.attributes,N=0,Y=O.getAttributes();for(let V in Y)if(Y[V].location>=0){let K=G[V];K===void 0&&(V==="instanceMatrix"&&L.instanceMatrix&&(K=L.instanceMatrix),V==="instanceColor"&&L.instanceColor&&(K=L.instanceColor));let $={};$.attribute=K,K&&K.data&&($.data=K.data),F[V]=$,N++}r.attributes=F,r.attributesNum=N,r.index=C}function _(){let L=r.newAttributes;for(let k=0,O=L.length;k<O;k++)L[k]=0}function p(L){g(L,0)}function g(L,k){let O=r.newAttributes,C=r.enabledAttributes,F=r.attributeDivisors;O[L]=1,C[L]===0&&(s.enableVertexAttribArray(L),C[L]=1),F[L]!==k&&(s.vertexAttribDivisor(L,k),F[L]=k)}function v(){let L=r.newAttributes,k=r.enabledAttributes;for(let O=0,C=k.length;O<C;O++)k[O]!==L[O]&&(s.disableVertexAttribArray(O),k[O]=0)}function T(L,k,O,C,F,G,N){N===!0?s.vertexAttribIPointer(L,k,O,F,G):s.vertexAttribPointer(L,k,O,C,F,G)}function y(L,k,O,C){_();let F=C.attributes,G=O.getAttributes(),N=k.defaultAttributeValues;for(let Y in G){let V=G[Y];if(V.location>=0){let J=F[Y];if(J===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(J=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(J=L.instanceColor)),J!==void 0){let K=J.normalized,$=J.itemSize,ht=t.get(J);if(ht===void 0)continue;let X=ht.buffer,ot=ht.type,pt=ht.bytesPerElement,Ct=ot===s.INT||ot===s.UNSIGNED_INT||J.gpuType===Nl;if(J.isInterleavedBufferAttribute){let ut=J.data,Nt=ut.isInterleavedBuffer===!0?ut.stride:ut.itemSize,le=J.offset;if(ut.isInstancedInterleavedBuffer||ut.isInstancedBufferAttribute){for(let Ft=0;Ft<V.locationSize;Ft++)g(V.location+Ft,ut.meshPerAttribute);L.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Ft=0;Ft<V.locationSize;Ft++)p(V.location+Ft);s.bindBuffer(s.ARRAY_BUFFER,X);for(let Ft=0;Ft<V.locationSize;Ft++)T(V.location+Ft,$/V.locationSize,ot,K,Nt*pt,(le+$/V.locationSize*Ft)*pt,Ct)}else{if(J.isInstancedBufferAttribute){for(let ut=0;ut<V.locationSize;ut++)g(V.location+ut,J.meshPerAttribute);L.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ut=0;ut<V.locationSize;ut++)p(V.location+ut);s.bindBuffer(s.ARRAY_BUFFER,X);for(let ut=0;ut<V.locationSize;ut++)T(V.location+ut,$/V.locationSize,ot,K,$*pt,$/V.locationSize*ut*pt,Ct)}}else if(N!==void 0){let K=N[Y];if(K!==void 0)switch(K.length){case 2:s.vertexAttrib2fv(V.location,K);break;case 3:s.vertexAttrib3fv(V.location,K);break;case 4:s.vertexAttrib4fv(V.location,K);break;default:s.vertexAttrib1fv(V.location,K)}}}}v()}function w(){P();for(let L in n){let k=n[L];for(let O in k){let C=k[O];for(let F in C){let G=C[F];for(let N in G)h(G[N].object),delete G[N];delete C[F]}}delete n[L]}}function A(L){if(n[L.id]===void 0)return;let k=n[L.id];for(let O in k){let C=k[O];for(let F in C){let G=C[F];for(let N in G)h(G[N].object),delete G[N];delete C[F]}}delete n[L.id]}function x(L){for(let k in n){let O=n[k];for(let C in O){let F=O[C];if(F[L.id]===void 0)continue;let G=F[L.id];for(let N in G)h(G[N].object),delete G[N];delete F[L.id]}}}function S(L){for(let k in n){let O=n[k],C=L.isInstancedMesh===!0?L.id:0,F=O[C];if(F!==void 0){for(let G in F){let N=F[G];for(let Y in N)h(N[Y].object),delete N[Y];delete F[G]}delete O[C],Object.keys(O).length===0&&delete n[k]}}}function P(){R(),a=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:S,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function By(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function zy(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(x){return!(x!==Xn&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let S=x===Wn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==gn&&x!==Hn&&!S&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(zt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&zt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),A=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:T,maxFragmentUniforms:y,maxSamples:w,samples:A}}function ky(s){let t=this,e=null,n=0,i=!1,r=!1,a=new kn,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let m=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,g=s.get(f);if(!i||m===null||m.length===0||r&&!p)r?h(null):c();else{let v=r?0:n,T=v*4,y=g.clippingState||null;l.value=y,y=h(m,u,T,d);for(let w=0;w!==T;++w)y[w]=e[w];g.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,m){let _=f!==null?f.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=d+_*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let T=0,y=d;T!==_;++T,y+=4)a.copy(f[T]).applyMatrix4(v,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var Ba=class extends wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ha(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new hr(5,5,5),r=new Nn({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:As});r.uniforms.tEquirect.value=e;let a=new An(i,r),o=e.minFilter;return e.minFilter===Ti&&(e.minFilter=on),new _r(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Qp=256,Gy=3,Vy=20,Mm=256,Sm=16,Hy=3,Wy=new z,Xy=new $t,vc=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new _r(1,10,null),this._boxMesh=new An(new hr(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:a=256,position:o=Wy}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,u=l.autoClearColor,d=l.autoClearDepth,m=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(Xy));let p=new _r(n,i,h);return p.position.copy(o),p.update(l,t),l.autoClear=f,l.autoClearColor=u,l.autoClearDepth=d,l.autoClearStencil=m,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=em(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Qp,Hp(t))}_fromTexture(t,e){t.mapping===Cs||t.mapping===yr?this._setSize(t.image.length===0?Qp:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=jp(t,!1,!1),n=Math.log2(t)-Gy;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=jp(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Cs||t.mapping===yr?(this._cubemapMaterial===null&&(this._cubemapMaterial=em()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=tm()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=qy(),this._integrationMaterial=Yy());let e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Sm);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-Hy)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(Mm*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=$y());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}};function jp(s,t,e){return new Ba(s,{minFilter:Ti,generateMipmaps:t,type:Wn,colorSpace:ea,depthBuffer:e})}function za(s,t,e){return new Nn({name:s,uniforms:t,vertexShader:jt.cube_vert,fragmentShader:e,side:ln,blending:As,depthTest:!1,depthWrite:!1})}function qy(){return za("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Mm}u

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
	`)}function Yy(){return za("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Sm}},`

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
	`)}function $y(){return za("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Vy}
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
	`)}function tm(){return za("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function em(){return za("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Zy(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Il||d===Ll)if(t.has(u)){let m=t.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let _=new Ba(m.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let d=u.mapping,m=d===Il||d===Ll,_=d===Cs||d===yr;if(m||_){let p=e.get(u),g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new vc(s)),p=m?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{let v=u.image;return m&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new vc(s)),p=m?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,d){return d===Il?u.mapping=Cs:d===Ll&&(u.mapping=yr),u}function l(u){let d=0,m=6;for(let _=0;_<m;_++)u[_]!==void 0&&d++;return d===m}function c(u){let d=u.target;d.removeEventListener("dispose",c);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function Jy(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Kr("WebGLRenderer: "+n+" extension not supported."),i}}}function Ky(s,t,e,n){let i={},r=new WeakMap,a=new FinalizationRegistry(m=>delete i[m]);function o(m){l(m.target)}function l(m){m.index!==null&&t.remove(m.index);for(let p in m.attributes)t.remove(m.attributes[p]);m.removeEventListener("dispose",o),delete i[m.id],a.unregister(m);let _=r.get(m);_&&(t.remove(_),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(m,_){return i[_.id]!==void 0||(_.addEventListener("dispose",o),i[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(m){let _=m.attributes;for(let p in _)t.update(_[p],s.ARRAY_BUFFER)}function f(m){let _=m.index,p=m.attributes.position,g=0;if(p===void 0)return;let v=_!==null?_.array.length:p.array.length/3-1,T=p.count>=65535?la:oa,y=new T(Math.ceil(v/3)*6,1),w=y.array;if(_!==null){let x=_.array;g=_.version;for(let S=0,P=0;S<v;S+=3){let R=x[S+0],L=x[S+1],k=x[S+2];w[P++]=R,w[P++]=L,w[P++]=L,w[P++]=k,w[P++]=k,w[P++]=R}}else{g=p.version;for(let x=0,S=0;x<v;x+=3){let P=x+0,R=x+1,L=x+2;w[S++]=P,w[S++]=R,w[S++]=R,w[S++]=L,w[S++]=L,w[S++]=P}}y.version=g;let A=r.get(m);A&&t.remove(A),r.set(m,y)}function u(m){let _=r.get(m);if(_){let p=m.index;p!==null&&_.version<p.version&&f(m)}else f(m);return r.get(m)}function d(){for(let m in i){let _=i[m].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:u,dispose:d}}function Qy(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){s.drawElements(n,u,r,f*a),e.update(u,n,1)}function c(f,u,d){d!==0&&(s.drawElementsInstanced(n,u,r,f*a,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let _=0;for(let p=0;p<d;p++)_+=u[p];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function jy(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Vt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function tM(s,t,e){let n=new WeakMap,i=new Se;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let P=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",P)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],T=0;d===!0&&(T=1),m===!0&&(T=2),_===!0&&(T=3);let y=o.attributes.position.count*T,w=1;y>t.maxTextureSize&&(w=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let A=new Float32Array(y*w*4*f),x=new sa(A,y,w,f);x.type=Hn,x.needsUpdate=!0;let S=T*4;for(let R=0;R<f;R++){let L=p[R],k=g[R],O=v[R],C=y*w*4*R;for(let F=0;F<L.count;F++){let G=F*S;d===!0&&(i.fromBufferAttribute(L,F),A[C+G+0]=i.x,A[C+G+1]=i.y,A[C+G+2]=i.z,A[C+G+3]=0),m===!0&&(i.fromBufferAttribute(k,F),A[C+G+4]=i.x,A[C+G+5]=i.y,A[C+G+6]=i.z,A[C+G+7]=0),_===!0&&(i.fromBufferAttribute(O,F),A[C+G+8]=i.x,A[C+G+9]=i.y,A[C+G+10]=i.z,A[C+G+11]=O.itemSize===4?i.w:1)}}u={count:f,texture:x,size:new St(y,w)},n.set(o,u),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let m=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function eM(s,t,e,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var nM={[uu]:"LINEAR_TONE_MAPPING",[fu]:"REINHARD_TONE_MAPPING",[du]:"CINEON_TONE_MAPPING",[pu]:"ACES_FILMIC_TONE_MAPPING",[gu]:"AGX_TONE_MAPPING",[Ca]:"NEUTRAL_TONE_MAPPING",[mu]:"CUSTOM_TONE_MAPPING"};function iM(s,t,e,n,i,r){let a=new wn(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new mn;h.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ce([0,2,0,0,2,0],2));let f=new ml({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new An(h,f),d=new wa(-1,1,1,-1,0,1),m=null,_=null,p=!1,g,v=null,T=[],y=!1;this.setSize=function(w,A){a.setSize(w,A),o!==null&&o.setSize(w,A),l!==null&&l.setSize(w,A);for(let x=0;x<T.length;x++){let S=T[x];S.setSize&&S.setSize(w,A)}},this.setEffects=function(w){T=w,y=T.length>0&&T[0].isRenderPass===!0;let A=a.width,x=a.height;T.length>0&&o===null&&(o=new wn(A,x,{type:Wn,depthBuffer:!1,stencilBuffer:!1}),l=new wn(A,x,{type:Wn,depthBuffer:!1,stencilBuffer:!1}));let S=i===!0&&T.some(P=>P.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new bi(A,x),r===!0&&(c.format=wi,c.type=Rs)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let P=0;P<T.length;P++){let R=T[P];R.setSize&&R.setSize(A,x),S&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(w,A){if(p||w.toneMapping===si&&T.length===0)return!1;if(v=A,A!==null){let x=A.width,S=A.height;(a.width!==x||a.height!==S)&&this.setSize(x,S)}return y===!1&&w.setRenderTarget(a),g=w.toneMapping,w.toneMapping=si,!0},this.hasRenderPass=function(){return y},this.end=function(w,A){w.toneMapping=g,p=!0;let x=a,S=o;for(let P=0;P<T.length;P++){let R=T[P];R.enabled!==!1&&(R.render(w,S,x,A),R.needsSwap!==!1&&(x=S,S=S===o?l:o))}if(m!==w.outputColorSpace||_!==w.toneMapping){m=w.outputColorSpace,_=w.toneMapping,f.defines={},ie.getTransfer(m)===ue&&(f.defines.SRGB_TRANSFER="");let P=nM[_];P&&(f.defines[P]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,w.setRenderTarget(v),w.render(u,d),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}var bm=new pn,Tm=new bi(1,1),wm=new ua(1),Am=new sa,Em=new el,Cm=new ha,nm=[],im=[],sm=new Float32Array(16),rm=new Float32Array(9),am=new Float32Array(4);function Tr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=nm[i];if(r===void 0&&(r=new Float32Array(i),nm[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Ue(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Fe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Mc(s,t){let e=im[t];e===void 0&&(e=new Int32Array(t),im[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function sM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function rM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2fv(this.addr,t),Fe(e,t)}}function aM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;s.uniform3fv(this.addr,t),Fe(e,t)}}function oM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4fv(this.addr,t),Fe(e,t)}}function lM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Fe(e,t)}else{if(Ue(e,n))return;am.set(n),s.uniformMatrix2fv(this.addr,!1,am),Fe(e,n)}}function cM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Fe(e,t)}else{if(Ue(e,n))return;rm.set(n),s.uniformMatrix3fv(this.addr,!1,rm),Fe(e,n)}}function hM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Fe(e,t)}else{if(Ue(e,n))return;sm.set(n),s.uniformMatrix4fv(this.addr,!1,sm),Fe(e,n)}}function uM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function fM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2iv(this.addr,t),Fe(e,t)}}function dM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;s.uniform3iv(this.addr,t),Fe(e,t)}}function pM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4iv(this.addr,t),Fe(e,t)}}function mM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function gM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2uiv(this.addr,t),Fe(e,t)}}function _M(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;s.uniform3uiv(this.addr,t),Fe(e,t)}}function xM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4uiv(this.addr,t),Fe(e,t)}}function Sc(s){return s.version===0&&(s.compareFunction=Eu,s.needsUpdate=!0),s}function vM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Sc(Tm):r=bm,e.setTexture2D(t||r,i)}function yM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Em,i)}function MM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Sc(wm):r=Cm,e.setTextureCube(t||r,i)}function SM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Am,i)}function bM(s){switch(s){case 5126:return sM;case 35664:return rM;case 35665:return aM;case 35666:return oM;case 35674:return lM;case 35675:return cM;case 35676:return hM;case 5124:case 35670:return uM;case 35667:case 35671:return fM;case 35668:case 35672:return dM;case 35669:case 35673:return pM;case 5125:return mM;case 36294:return gM;case 36295:return _M;case 36296:return xM;case 35678:case 36198:case 36298:case 36306:case 35682:return vM;case 35679:case 36299:case 36307:return yM;case 35680:case 36300:case 36308:case 36293:return MM;case 36289:case 36303:case 36311:case 36292:return SM}}function TM(s,t){s.uniform1fv(this.addr,t)}function wM(s,t){let e=Tr(t,this.size,2);s.uniform2fv(this.addr,e)}function AM(s,t){let e=Tr(t,this.size,3);s.uniform3fv(this.addr,e)}function EM(s,t){let e=Tr(t,this.size,4);s.uniform4fv(this.addr,e)}function CM(s,t){let e=Tr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function RM(s,t){let e=Tr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function PM(s,t){let e=Tr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function IM(s,t){s.uniform1iv(this.addr,t)}function LM(s,t){s.uniform2iv(this.addr,t)}function DM(s,t){s.uniform3iv(this.addr,t)}function NM(s,t){s.uniform4iv(this.addr,t)}function UM(s,t){s.uniform1uiv(this.addr,t)}function FM(s,t){s.uniform2uiv(this.addr,t)}function OM(s,t){s.uniform3uiv(this.addr,t)}function BM(s,t){s.uniform4uiv(this.addr,t)}function zM(s,t,e){let n=this.cache,i=t.length,r=Mc(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),Fe(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Sc(Tm):a=bm;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function kM(s,t,e){let n=this.cache,i=t.length,r=Mc(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),Fe(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Em,r[a])}function GM(s,t,e){let n=this.cache,i=t.length,r=Mc(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),Fe(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=Sc(wm):a=Cm;for(let o=0;o!==i;++o)e.setTextureCube(t[o]||a,r[o])}function VM(s,t,e){let n=this.cache,i=t.length,r=Mc(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),Fe(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Am,r[a])}function HM(s){switch(s){case 5126:return TM;case 35664:return wM;case 35665:return AM;case 35666:return EM;case 35674:return CM;case 35675:return RM;case 35676:return PM;case 5124:case 35670:return IM;case 35667:case 35671:return LM;case 35668:case 35672:return DM;case 35669:case 35673:return NM;case 5125:return UM;case 36294:return FM;case 36295:return OM;case 36296:return BM;case 35678:case 36198:case 36298:case 36306:case 35682:return zM;case 35679:case 36299:case 36307:return kM;case 35680:case 36300:case 36308:case 36293:return GM;case 36289:case 36303:case 36311:case 36292:return VM}}var Hu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=bM(e.type)}},Wu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=HM(e.type)}},Xu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},Gu=/(\w+)(\])?(\[|\.)?/g;function om(s,t){s.seq.push(t),s.map[t.id]=t}function WM(s,t,e){let n=s.name,i=n.length;for(Gu.lastIndex=0;;){let r=Gu.exec(n),a=Gu.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){om(e,c===void 0?new Hu(o,s,t):new Wu(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new Xu(o),om(e,f)),e=f}}}var br=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);WM(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function lm(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var XM=37297,qM=0;function YM(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var cm=new Wt;function $M(s){ie._getMatrix(cm,ie.workingColorSpace,s);let t=`mat3( ${cm.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(s)){case na:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return zt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function hm(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+YM(s.getShaderSource(t),o)}else return r}function ZM(s,t){let e=$M(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var JM={[uu]:"Linear",[fu]:"Reinhard",[du]:"Cineon",[pu]:"ACESFilmic",[gu]:"AgX",[Ca]:"Neutral",[mu]:"Custom"};function KM(s,t){let e=JM[t];return e===void 0?(zt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var xc=new z;function QM(){ie.getLuminanceCoefficients(xc);let s=xc.x.toFixed(4),t=xc.y.toFixed(4),e=xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oa).join(`
`)}function tS(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function eS(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Oa(s){return s!==""}function um(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function fm(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var nS=/^[ \t]*#include +<([\w\d./]+)>/gm;function qu(s){return s.replace(nS,iS)}function iS(s,t){let e=jt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return qu(e)}var sS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dm(s){return s.replace(sS,rS)}function rS(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function pm(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var aS={[ws]:"SHADOWMAP_TYPE_PCF",[xr]:"SHADOWMAP_TYPE_VSM"};function oS(s){return aS[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var lS={[yr]:"ENVMAP_MODE_REFRACTION"};function cS(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":lS[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var hS={[hu]:"ENVMAP_BLENDING_MULTIPLY",[Ep]:"ENVMAP_BLENDING_MIX",[Cp]:"ENVMAP_BLENDING_ADD"};function uS(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":hS[s.combine]||"ENVMAP_BLENDING_NONE"}function fS(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=oS(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=cS(e),f=uS(e),u=jM(e),d=tS(r),m=i.createProgram(),_,p,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Oa).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Oa).join(`
`),p.length>0&&(p+=`
`)):(_=[pm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oa).join(`
`),p=[pm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==si?"#define TONE_MAPPING":"",e.toneMapping!==si?jt.tonemapping_pars_fragment:"",e.toneMapping!==si?KM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,ZM("linearToOutputTexel",e.outputColorSpace),QM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Oa).join(`
`)),a=qu(a),a=um(a,e),a=fm(a,e),o=qu(o),o=um(o,e),o=fm(o,e),a=dm(a),o=dm(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",e.glslVersion===Cu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Cu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=g+_+a,T=g+p+o,y=lm(i,i.VERTEX_SHADER,v),w=lm(i,i.FRAGMENT_SHADER,T);i.attachShader(m,y),i.attachShader(m,w),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function A(R){if(s.debug.checkShaderErrors){let L=i.getProgramInfoLog(m)||"",k=i.getShaderInfoLog(y)||"",O=i.getShaderInfoLog(w)||"",C=L.trim(),F=k.trim(),G=O.trim(),N=!0,Y=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(N=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,y,w);else{let V=hm(i,y,"vertex"),J=hm(i,w,"fragment");Vt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+C+`
`+V+`
`+J)}else C!==""?zt("WebGLProgram: Program Info Log:",C):(F===""||G==="")&&(Y=!1);Y&&(R.diagnostics={runnable:N,programLog:C,vertexShader:{log:F,prefix:_},fragmentShader:{log:G,prefix:p}})}i.deleteShader(y),i.deleteShader(w),x=new br(i,m),S=eS(i,m)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(m,XM)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=qM++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=y,this.fragmentShader=w,this}var dS=0,Yu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new $u(t),e.set(t,n)),n}},$u=class{constructor(t){this.id=dS++,this.code=t,this.usedTimes=0}};function pS(s){return s===ts||s===Na||s===Ua}function mS(s,t,e,n,i,r){let a=new ra,o=new Yu,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,S,P,R,L,k){let O=R.fog,C=L.geometry,F=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,N=t.get(x.envMap||F,G),Y=u[x.type],V=n.precision;x.precision!==null&&(V=n.getMaxPrecision(x.precision),V!==x.precision&&zt("WebGLProgram.getParameters:",x.precision,"not supported, using",V,"instead."));let J=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,K=J!==void 0?J.length:0,$=0;C.morphAttributes.position!==void 0&&($=1),C.morphAttributes.normal!==void 0&&($=2),C.morphAttributes.color!==void 0&&($=3);let ht,X,ot,pt;if(Y){let Tt=ai[Y];ht=Tt.vertexShader,X=Tt.fragmentShader}else{ht=x.vertexShader,X=x.fragmentShader;let Tt=o.getVertexShaderStage(x),fe=o.getFragmentShaderStage(x);o.update(x,Tt,fe),ot=Tt.id,pt=fe.id}let Ct=s.getRenderTarget(),ut=s.state.buffers.depth.getReversed(),Nt=L.isInstancedMesh===!0,le=L.isBatchedMesh===!0,Ft=!!x.map,qt=!!x.matcap,Jt=!!N,B=Jt&&N.isPMREMTexture===!0,Q=!!x.aoMap,nt=!!x.lightMap,at=!!x.bumpMap&&x.wireframe===!1,rt=!!x.normalMap,Et=!!x.displacementMap,bt=!!x.emissiveMap,Gt=!!x.metalnessMap,Ht=!!x.roughnessMap,kt=x.anisotropy>0,D=x.clearcoat>0,de=x.diffuseRoughness>0,Xt=x.dispersion>0,re=x.retroreflectivity>0,dt=x.iridescence>0,he=x.sheen>0,Lt=x.transmission>0,Bt=kt&&!!x.anisotropyMap,E=D&&!!x.clearcoatMap,M=D&&!!x.clearcoatNormalMap,H=D&&!!x.clearcoatRoughnessMap,lt=de&&!!x.diffuseRoughnessMap,st=dt&&!!x.iridescenceMap,mt=dt&&!!x.iridescenceThicknessMap,yt=he&&!!x.sheenColorMap,tt=he&&!!x.sheenRoughnessMap,et=!!x.specularMap,_t=!!x.specularColorMap,I=!!x.specularIntensityMap,it=Lt&&!!x.transmissionMap,j=Lt&&!!x.thicknessMap,xt=!!x.gradientMap,ft=!!x.alphaMap,gt=x.alphaTest>0,Ut=!!x.alphaHash,Qt=!!x.extensions,ct=si;x.toneMapped&&(Ct===null||Ct.isXRRenderTarget===!0)&&(ct=s.toneMapping);let Ot=B?N.isCompressedCubeTexture?N.image[0].mipmaps:N.mipmaps:null,Kt={shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:ht,fragmentShader:X,defines:x.defines,customVertexShaderID:ot,customFragmentShaderID:pt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:V,batching:le,batchingColor:le&&L._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&L.instanceColor!==null,instancingMorph:Nt&&L.morphTexture!==null,outputColorSpace:Ct===null?s.outputColorSpace:Ct.isXRRenderTarget===!0?Ct.texture.colorSpace:ie.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ft,matcap:qt,envMap:Jt,envMapMode:Jt&&N.mapping,envMapPMREM:B,envMapMaxLod:B?Ot.length-1:null,envMapSize:B?Ot[0].width:null,aoMap:Q,lightMap:nt,bumpMap:at,normalMap:rt,displacementMap:Et,emissiveMap:bt,normalMapObjectSpace:rt&&x.normalMapType===Ip,normalMapTangentSpace:rt&&x.normalMapType===gc,packedNormalMap:rt&&x.normalMapType===gc&&pS(x.normalMap.format),metalnessMap:Gt,roughnessMap:Ht,anisotropy:kt,anisotropyMap:Bt,clearcoat:D,clearcoatMap:E,clearcoatNormalMap:M,clearcoatRoughnessMap:H,diffuseRoughness:de,diffuseRoughnessMap:lt,dispersion:Xt,retroreflection:re,iridescence:dt,iridescenceMap:st,iridescenceThicknessMap:mt,sheen:he,sheenColorMap:yt,sheenRoughnessMap:tt,specularMap:et,specularColorMap:_t,specularIntensityMap:I,transmission:Lt,transmissionMap:it,thicknessMap:j,gradientMap:xt,opaque:x.transparent===!1&&x.blending===vr&&x.alphaToCoverage===!1,alphaMap:ft,alphaTest:gt,alphaHash:Ut,combine:x.combine,mapUv:Ft&&d(x.map.channel),aoMapUv:Q&&d(x.aoMap.channel),lightMapUv:nt&&d(x.lightMap.channel),bumpMapUv:at&&d(x.bumpMap.channel),normalMapUv:rt&&d(x.normalMap.channel),displacementMapUv:Et&&d(x.displacementMap.channel),emissiveMapUv:bt&&d(x.emissiveMap.channel),metalnessMapUv:Gt&&d(x.metalnessMap.channel),roughnessMapUv:Ht&&d(x.roughnessMap.channel),anisotropyMapUv:Bt&&d(x.anisotropyMap.channel),clearcoatMapUv:E&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:M&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:lt&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:st&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:yt&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:tt&&d(x.sheenRoughnessMap.channel),specularMapUv:et&&d(x.specularMap.channel),specularColorMapUv:_t&&d(x.specularColorMap.channel),specularIntensityMapUv:I&&d(x.specularIntensityMap.channel),transmissionMapUv:it&&d(x.transmissionMap.channel),thicknessMapUv:j&&d(x.thicknessMap.channel),alphaMapUv:ft&&d(x.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(rt||kt),vertexNormals:!!C.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!C.attributes.uv&&(Ft||ft),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||C.attributes.normal===void 0&&rt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ut,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:$,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:k.filter(Tt=>Tt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:ct,decodeVideoTexture:Ft&&x.map.isVideoTexture===!0&&ie.getTransfer(x.map.colorSpace)===ue,decodeVideoTextureEmissive:bt&&x.emissiveMap.isVideoTexture===!0&&ie.getTransfer(x.emissiveMap.colorSpace)===ue,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ii,flipSided:x.side===ln,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Qt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qt&&x.extensions.multiDraw===!0||le)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Kt.vertexUv1s=l.has(1),Kt.vertexUv2s=l.has(2),Kt.vertexUv3s=l.has(3),l.clear(),Kt}function _(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)S.push(P),S.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(p(S,x),g(S,x),S.push(s.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function p(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapPMREM),x.push(S.envMapMaxLod),x.push(S.envMapSize),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.diffuseRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.numLightProbeGrids),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function g(x,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function v(x){let S=u[x.type],P;if(S){let R=ai[S];P=Zp.clone(R.uniforms)}else P=x.uniforms;return P}function T(x,S){let P=h.get(S);return P!==void 0?++P.usedTimes:(P=new fS(s,S,x,i),c.push(P),h.set(S,P)),P}function y(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function A(){o.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:v,acquireProgram:T,releaseProgram:y,releaseShaderCache:w,programs:c,dispose:A}}function gS(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function _S(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function mm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function gm(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,m,_,p,g){let v=s[t];return v===void 0?(v={id:u.id,object:u,geometry:d,material:m,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:p,group:g},s[t]=v):(v.id=u.id,v.object=u,v.geometry=d,v.material=m,v.materialVariant=a(u),v.groupOrder=_,v.renderOrder=u.renderOrder,v.z=p,v.group=g),t++,v}function l(u,d,m,_,p,g,v){v.reversedDepth===!0&&(p=-p);let T=o(u,d,m,_,p,g);m.transmission>0?n.push(T):m.transparent===!0?i.push(T):e.push(T)}function c(u,d,m,_,p,g){let v=o(u,d,m,_,p,g);m.transmission>0?n.unshift(v):m.transparent===!0?i.unshift(v):e.unshift(v)}function h(u,d){e.length>1&&e.sort(u||_S),n.length>1&&n.sort(d||mm),i.length>1&&i.sort(d||mm)}function f(){for(let u=t,d=s.length;u<d;u++){let m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:f,sort:h}}function xS(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new gm,s.set(n,[a])):i>=r.length?(a=new gm,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function vS(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new z,color:new $t};break;case"SpotLight":e={position:new z,direction:new z,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new z,halfWidth:new z,halfHeight:new z};break}return s[t.id]=e,e}}}function yS(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var MS=0;function SS(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function bS(s){let t=new vS,e=yS(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);let i=new z,r=new _e,a=new _e;function o(c){let h=0,f=0,u=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let d=0,m=0,_=0,p=0,g=0,v=0,T=0,y=0,w=0,A=0,x=0,S=0,P=0,R=0;c.sort(SS);for(let k=0,O=c.length;k<O;k++){let C=c[k],F=C.color,G=C.intensity,N=C.distance,Y=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===ts?Y=C.shadow.map.texture:Y=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=F.r*G,f+=F.g*G,u+=F.b*G;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],G);R++}else if(C.isSunLight){let V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let J=C.shadow,K=e.get(C);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[m]=K,n.sunShadowMap[m]=Y;let $=J.getViewportCount();for(let ht=0;ht<$;ht++)n.sunShadowMatrix[_+ht]=J.getMatrix(ht),n.sunShadowCascade[_+ht]=J._cascadeData[ht];_+=$,m++}n.sun[d]=V,d++}else if(C.isDirectionalLight){let V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let J=C.shadow,K=e.get(C);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,n.directionalShadow[p]=K,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=C.shadow.matrix,w++}n.directional[p]=V,p++}else if(C.isSpotLight){let V=t.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(F).multiplyScalar(G),V.distance=N,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[v]=V;let J=C.shadow;if(C.map&&(n.spotLightMap[S]=C.map,S++,J.updateMatrices(C),C.castShadow&&P++),n.spotLightMatrix[v]=J.matrix,C.castShadow){let K=e.get(C);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,n.spotShadow[v]=K,n.spotShadowMap[v]=Y,x++}v++}else if(C.isRectAreaLight){let V=t.get(C);V.color.copy(F).multiplyScalar(G),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[T]=V,T++}else if(C.isPointLight){let V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){let J=C.shadow,K=e.get(C);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,K.shadowCameraNear=J.camera.near,K.shadowCameraFar=J.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=C.shadow.matrix,A++}n.point[g]=V,g++}else if(C.isHemisphereLight){let V=t.get(C);V.skyColor.copy(C.color).multiplyScalar(G),V.groundColor.copy(C.groundColor).multiplyScalar(G),n.hemi[y]=V,y++}}T>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=wt.LTC_FLOAT_1,n.rectAreaLTC2=wt.LTC_FLOAT_2):(n.rectAreaLTC1=wt.LTC_HALF_1,n.rectAreaLTC2=wt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let L=n.hash;(L.sunLength!==d||L.directionalLength!==p||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==T||L.hemiLength!==y||L.numSunShadows!==m||L.numDirectionalShadows!==w||L.numPointShadows!==A||L.numSpotShadows!==x||L.numSpotMaps!==S||L.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=p,n.spot.length=v,n.rectArea.length=T,n.point.length=g,n.hemi.length=y,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+S-P,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=R,L.sunLength=d,L.directionalLength=p,L.pointLength=g,L.spotLength=v,L.rectAreaLength=T,L.hemiLength=y,L.numSunShadows=m,L.numDirectionalShadows=w,L.numPointShadows=A,L.numSpotShadows=x,L.numSpotMaps=S,L.numLightProbes=R,n.version=MS++)}function l(c,h){let f=0,u=0,d=0,m=0,_=0,p=0,g=h.matrixWorldInverse;for(let v=0,T=c.length;v<T;v++){let y=c[v];if(y.isSunLight){let w=n.sun[f];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(g),f++}else if(y.isDirectionalLight){let w=n.directional[u];w.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(g),u++}else if(y.isSpotLight){let w=n.spot[m];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(g),m++}else if(y.isRectAreaLight){let w=n.rectArea[_];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){let w=n.point[d];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){let w=n.hemi[p];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function _m(s){let t=new bS(s),e=[],n=[],i=[];function r(f){h.camera=f,e.length=0,n.length=0,i.length=0}function a(f){f.isLightProbeGrid?i.push(f):e.push(f)}function o(f){n.push(f)}function l(){t.setup(e),i.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function c(f){t.setupView(e,f)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function TS(s){let t=new WeakMap;function e(i,r=0){let a=t.get(i),o;return a===void 0?(o=new _m(s),t.set(i,[o])):r>=a.length?(o=new _m(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var wS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,AS=`uniform sampler2D shadow_pass;
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
}`,ES=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],CS=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],xm=new _e,Fa=new z,Vu=new z;function RS(s,t,e){let n=new Zi,i=new St,r=new St,a=new Se,o=new gl,l=new _l,c={},h=e.maxTextureSize,f={[ji]:ln,[ln]:ji,[ii]:ii},u=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:wS,fragmentShader:AS}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let m=new mn;m.setAttribute("position",new ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new An(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ws;let g=this.type;this.render=function(A,x,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;this.type===lp&&(zt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ws);let P=s.getRenderTarget(),R=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),k=s.state;k.setBlending(As),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let O=g!==this.type;O&&x.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(F=>F.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,F=A.length;C<F;C++){let G=A[C],N=G.shadow;if(N===void 0){zt("WebGLShadowMap:",G,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;i.copy(N.mapSize);let Y=N.getFrameExtents();i.multiply(Y),r.copy(N.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,N.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,N.mapSize.y=r.y));let V=s.state.buffers.depth.getReversed();if(N.camera._reversedDepth=V,N.map===null||O===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===xr){if(G.isPointLight){zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new wn(i.x,i.y,{format:ts,type:Wn,minFilter:on,magFilter:on,generateMipmaps:!1}),N.map.texture.name=G.name+".shadowMap",N.map.depthTexture=new bi(i.x,i.y,Hn),N.map.depthTexture.name=G.name+".shadowMapDepth",N.map.depthTexture.format=Mi,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ge,N.map.depthTexture.magFilter=Ge}else G.isPointLight?(N.map=new Ba(i.x),N.map.depthTexture=new ua(i.x,Vn)):(N.map=new wn(i.x,i.y),N.map.depthTexture=new bi(i.x,i.y,Vn)),N.map.depthTexture.name=G.name+".shadowMap",N.map.depthTexture.format=Mi,this.type===ws?(N.map.depthTexture.compareFunction=V?Au:wu,N.map.depthTexture.minFilter=on,N.map.depthTexture.magFilter=on):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ge,N.map.depthTexture.magFilter=Ge);N.camera.updateProjectionMatrix()}N.map.isWebGLCubeRenderTarget!==!0&&(N.map.width!==i.x||N.map.height!==i.y)&&N.map.setSize(i.x,i.y);let J=N.map.isWebGLCubeRenderTarget?6:N.getViewportCount();G.isPointLight!==!0&&N.updateMatrices(G,S);let K=(N.camera.layers.mask&4294967294)!==0?N.camera.layers:S.layers;for(let $=0;$<J;$++){let ht=N.getCamera($);if(G.isPointLight){let X=N.camera,ot=N.matrix,pt=G.distance||X.far;pt!==X.far&&(X.far=pt,X.updateProjectionMatrix()),Fa.setFromMatrixPosition(G.matrixWorld),X.position.copy(Fa),Vu.copy(X.position),Vu.add(ES[$]),X.up.copy(CS[$]),X.lookAt(Vu),X.updateMatrixWorld(),ot.makeTranslation(-Fa.x,-Fa.y,-Fa.z),xm.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),N._frustum.setFromProjectionMatrix(xm,X.coordinateSystem,X.reversedDepth)}if(N.map.isWebGLCubeRenderTarget)s.setRenderTarget(N.map,$),s.clear();else{$===0&&(s.setRenderTarget(N.map),s.clear());let X=N.getViewport($);a.set(r.x*X.x,r.y*X.y,r.x*X.z,r.y*X.w),k.viewport(a)}n=N.getFrustum($),y(x,S,ht,G,K,this.type)}N.isPointLightShadow!==!0&&this.type===xr&&v(N,S),N.needsUpdate=!1}g=this.type,p.needsUpdate=!1,s.setRenderTarget(P,R,L)};function v(A,x){let S=t.update(_);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null?A.mapPass=new wn(i.x,i.y,{format:ts,type:Wn}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value.set(A.map.width,A.map.height),u.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(x,null,S,u,_,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(x,null,S,d,_,null)}function T(A,x,S,P){let R=null,L=S.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)R=L;else if(R=S.isPointLight===!0?l:o,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let k=R.uuid,O=x.uuid,C=c[k];C===void 0&&(C={},c[k]=C);let F=C[O];F===void 0&&(F=R.clone(),C[O]=F,x.addEventListener("dispose",w)),R=F}if(R.visible=x.visible,R.wireframe=x.wireframe,P===xr?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:f[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,S.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let k=s.properties.get(R);k.light=S}return R}function y(A,x,S,P,R,L){if(A.visible===!1)return;if(A.layers.test(R)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&L===xr)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,A.matrixWorld);let C=t.update(A),F=A.material;if(Array.isArray(F)){let G=C.groups;for(let N=0,Y=G.length;N<Y;N++){let V=G[N],J=F[V.materialIndex];if(J&&J.visible){let K=T(A,J,P,L);A.onBeforeShadow(s,A,x,S,C,K,V),s.renderBufferDirect(S,null,C,K,A,V),A.onAfterShadow(s,A,x,S,C,K,V)}}}else if(F.visible){let G=T(A,F,P,L);A.onBeforeShadow(s,A,x,S,C,G,null),s.renderBufferDirect(S,null,C,G,A,null),A.onAfterShadow(s,A,x,S,C,G,null)}}let O=A.children;for(let C=0,F=O.length;C<F;C++)y(O[C],x,S,P,R,L)}function w(A){A.target.removeEventListener("dispose",w);for(let S in c){let P=c[S],R=A.target.uuid;R in P&&(P[R].dispose(),delete P[R])}}}function PS(s,t){function e(){let I=!1,it=new Se,j=null,xt=new Se(0,0,0,0);return{setMask:function(ft){j!==ft&&!I&&(s.colorMask(ft,ft,ft,ft),j=ft)},setLocked:function(ft){I=ft},setClear:function(ft,gt,Ut,Qt,ct){ct===!0&&(ft*=Qt,gt*=Qt,Ut*=Qt),it.set(ft,gt,Ut,Qt),xt.equals(it)===!1&&(s.clearColor(ft,gt,Ut,Qt),xt.copy(it))},reset:function(){I=!1,j=null,xt.set(-1,0,0,0)}}}function n(){let I=!1,it=!1,j=null,xt=null,ft=null;return{setReversed:function(gt){if(it!==gt){let Ut=t.get("EXT_clip_control");gt?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),it=gt;let Qt=ft;ft=null,this.setClear(Qt)}},getReversed:function(){return it},setTest:function(gt){gt?ut(s.DEPTH_TEST):Nt(s.DEPTH_TEST)},setMask:function(gt){j!==gt&&!I&&(s.depthMask(gt),j=gt)},setFunc:function(gt){if(it&&(gt=Vp[gt]),xt!==gt){switch(gt){case Vo:s.depthFunc(s.NEVER);break;case Ho:s.depthFunc(s.ALWAYS);break;case Wo:s.depthFunc(s.LESS);break;case ir:s.depthFunc(s.LEQUAL);break;case Xo:s.depthFunc(s.EQUAL);break;case qo:s.depthFunc(s.GEQUAL);break;case Yo:s.depthFunc(s.GREATER);break;case $o:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xt=gt}},setLocked:function(gt){I=gt},setClear:function(gt){ft!==gt&&(ft=gt,it&&(gt=1-gt),s.clearDepth(gt))},reset:function(){I=!1,j=null,xt=null,ft=null,it=!1}}}function i(){let I=!1,it=null,j=null,xt=null,ft=null,gt=null,Ut=null,Qt=null,ct=null;return{setTest:function(Ot){I||(Ot?ut(s.STENCIL_TEST):Nt(s.STENCIL_TEST))},setMask:function(Ot){it!==Ot&&!I&&(s.stencilMask(Ot),it=Ot)},setFunc:function(Ot,Kt,Tt){(j!==Ot||xt!==Kt||ft!==Tt)&&(s.stencilFunc(Ot,Kt,Tt),j=Ot,xt=Kt,ft=Tt)},setOp:function(Ot,Kt,Tt){(gt!==Ot||Ut!==Kt||Qt!==Tt)&&(s.stencilOp(Ot,Kt,Tt),gt=Ot,Ut=Kt,Qt=Tt)},setLocked:function(Ot){I=Ot},setClear:function(Ot){ct!==Ot&&(s.clearStencil(Ot),ct=Ot)},reset:function(){I=!1,it=null,j=null,xt=null,ft=null,gt=null,Ut=null,Qt=null,ct=null}}}let r=new e,a=new n,o=new i,l={},c=new WeakMap,h={},f={},u={},d=new WeakMap,m=[],_=null,p=!1,g=null,v=null,T=null,y=null,w=null,A=null,x=null,S=new $t(0,0,0),P=0,R=!1,L=null,k=null,O=null,C=null,F=null,G=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,Y=0,V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(V)[1]),N=Y>=1):V.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),N=Y>=2);let J=null,K={},$=s.getParameter(s.SCISSOR_BOX),ht=s.getParameter(s.VIEWPORT),X=new Se().fromArray($),ot=new Se().fromArray(ht);function pt(I,it,j,xt){let ft=new Uint8Array(4),gt=s.createTexture();s.bindTexture(I,gt),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ut=0;Ut<j;Ut++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(it,0,s.RGBA,1,1,xt,0,s.RGBA,s.UNSIGNED_BYTE,ft):s.texImage2D(it+Ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ft);return gt}let Ct={};Ct[s.TEXTURE_2D]=pt(s.TEXTURE_2D,s.TEXTURE_2D,1),Ct[s.TEXTURE_CUBE_MAP]=pt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ct[s.TEXTURE_2D_ARRAY]=pt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ct[s.TEXTURE_3D]=pt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ut(s.DEPTH_TEST),a.setFunc(ir),at(!1),rt(ru),ut(s.CULL_FACE),Q(As);function ut(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function Nt(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function le(I,it){return u[I]!==it?(s.bindFramebuffer(I,it),u[I]=it,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=it),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=it),!0):!1}function Ft(I,it){let j=m,xt=!1;if(I){j=d.get(it),j===void 0&&(j=[],d.set(it,j));let ft=I.textures;if(j.length!==ft.length||j[0]!==s.COLOR_ATTACHMENT0){for(let gt=0,Ut=ft.length;gt<Ut;gt++)j[gt]=s.COLOR_ATTACHMENT0+gt;j.length=ft.length,xt=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,xt=!0);xt&&s.drawBuffers(j)}function qt(I){return _!==I?(s.useProgram(I),_=I,!0):!1}let Jt={[Es]:s.FUNC_ADD,[hp]:s.FUNC_SUBTRACT,[up]:s.FUNC_REVERSE_SUBTRACT};Jt[fp]=s.MIN,Jt[dp]=s.MAX;let B={[pp]:s.ZERO,[mp]:s.ONE,[gp]:s.SRC_COLOR,[lu]:s.SRC_ALPHA,[Sp]:s.SRC_ALPHA_SATURATE,[yp]:s.DST_COLOR,[xp]:s.DST_ALPHA,[_p]:s.ONE_MINUS_SRC_COLOR,[cu]:s.ONE_MINUS_SRC_ALPHA,[Mp]:s.ONE_MINUS_DST_COLOR,[vp]:s.ONE_MINUS_DST_ALPHA,[bp]:s.CONSTANT_COLOR,[Tp]:s.ONE_MINUS_CONSTANT_COLOR,[wp]:s.CONSTANT_ALPHA,[Ap]:s.ONE_MINUS_CONSTANT_ALPHA};function Q(I,it,j,xt,ft,gt,Ut,Qt,ct,Ot){if(I===As){p===!0&&(Nt(s.BLEND),p=!1);return}if(p===!1&&(ut(s.BLEND),p=!0),I!==cp){if(I!==g||Ot!==R){if((v!==Es||w!==Es)&&(s.blendEquation(s.FUNC_ADD),v=Es,w=Es),Ot)switch(I){case vr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ea:s.blendFunc(s.ONE,s.ONE);break;case au:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ou:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Vt("WebGLState: Invalid blending: ",I);break}else switch(I){case vr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ea:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case au:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ou:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",I);break}T=null,y=null,A=null,x=null,S.set(0,0,0),P=0,g=I,R=Ot}return}ft=ft||it,gt=gt||j,Ut=Ut||xt,(it!==v||ft!==w)&&(s.blendEquationSeparate(Jt[it],Jt[ft]),v=it,w=ft),(j!==T||xt!==y||gt!==A||Ut!==x)&&(s.blendFuncSeparate(B[j],B[xt],B[gt],B[Ut]),T=j,y=xt,A=gt,x=Ut),(Qt.equals(S)===!1||ct!==P)&&(s.blendColor(Qt.r,Qt.g,Qt.b,ct),S.copy(Qt),P=ct),g=I,R=!1}function nt(I,it){I.side===ii?Nt(s.CULL_FACE):ut(s.CULL_FACE);let j=I.side===ln;it&&(j=!j),at(j),I.blending===vr&&I.transparent===!1?Q(As):Q(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let xt=I.stencilWrite;o.setTest(xt),xt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),bt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ut(s.SAMPLE_ALPHA_TO_COVERAGE):Nt(s.SAMPLE_ALPHA_TO_COVERAGE)}function at(I){L!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),L=I)}function rt(I){I!==ap?(ut(s.CULL_FACE),I!==k&&(I===ru?s.cullFace(s.BACK):I===op?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Nt(s.CULL_FACE),k=I}function Et(I){I!==O&&(N&&s.lineWidth(I),O=I)}function bt(I,it,j){I?(ut(s.POLYGON_OFFSET_FILL),(C!==it||F!==j)&&(C=it,F=j,a.getReversed()&&(it=-it,j=-j),s.polygonOffset(it,j))):Nt(s.POLYGON_OFFSET_FILL)}function Gt(I){I?ut(s.SCISSOR_TEST):Nt(s.SCISSOR_TEST)}function Ht(I){I===void 0&&(I=s.TEXTURE0+G-1),J!==I&&(s.activeTexture(I),J=I)}function kt(I,it,j){j===void 0&&(J===null?j=s.TEXTURE0+G-1:j=J);let xt=K[j];xt===void 0&&(xt={type:void 0,texture:void 0},K[j]=xt),(xt.type!==I||xt.texture!==it)&&(J!==j&&(s.activeTexture(j),J=j),s.bindTexture(I,it||Ct[I]),xt.type=I,xt.texture=it)}function D(){let I=K[J];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function de(){try{s.compressedTexImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function Xt(){try{s.compressedTexImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function re(){try{s.texSubImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function dt(){try{s.texSubImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function he(){try{s.compressedTexSubImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function Lt(){try{s.compressedTexSubImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function Bt(){try{s.texStorage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function E(){try{s.texStorage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function M(){try{s.texImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function H(){try{s.texImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function lt(I){return f[I]!==void 0?f[I]:s.getParameter(I)}function st(I,it){f[I]!==it&&(s.pixelStorei(I,it),f[I]=it)}function mt(I){X.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),X.copy(I))}function yt(I){ot.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),ot.copy(I))}function tt(I,it){let j=c.get(it);j===void 0&&(j=new WeakMap,c.set(it,j));let xt=j.get(I);xt===void 0&&(xt=s.getUniformBlockIndex(it,I.name),s.uniformBlockBinding(it,xt,xt),j.set(I,xt))}function et(I,it,j){let ft=c.get(it).get(I);l[ft]!==j&&(s.bindBufferBase(s.UNIFORM_BUFFER,ft,j),l[ft]=j)}function _t(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},J=null,K={},u={},l={},d=new WeakMap,m=[],_=null,p=!1,g=null,v=null,T=null,y=null,w=null,A=null,x=null,S=new $t(0,0,0),P=0,R=!1,L=null,k=null,O=null,C=null,F=null,X.set(0,0,s.canvas.width,s.canvas.height),ot.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ut,disable:Nt,bindFramebuffer:le,drawBuffers:Ft,useProgram:qt,setBlending:Q,setMaterial:nt,setFlipSided:at,setCullFace:rt,setLineWidth:Et,setPolygonOffset:bt,setScissorTest:Gt,activeTexture:Ht,bindTexture:kt,unbindTexture:D,compressedTexImage2D:de,compressedTexImage3D:Xt,texImage2D:M,texImage3D:H,pixelStorei:st,getParameter:lt,updateUBOMapping:tt,uniformBlockBinding:et,texStorage2D:Bt,texStorage3D:E,texSubImage2D:re,texSubImage3D:dt,compressedTexSubImage2D:he,compressedTexSubImage3D:Lt,scissor:mt,viewport:yt,reset:_t}}function IS(s,t,e,n,i,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new St,h=new WeakMap,f=new Set,u,d=new WeakMap,m=new Set,_=new FinalizationRegistry(E=>m.delete(E)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,M){return p?new OffscreenCanvas(E,M):ia("canvas")}function v(E,M,H){let lt=1,st=Bt(E);if((st.width>H||st.height>H)&&(lt=H/Math.max(st.width,st.height)),lt<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let mt=Math.floor(lt*st.width),yt=Math.floor(lt*st.height);u===void 0&&(u=g(mt,yt));let tt=M?g(mt,yt):u;return tt.width=mt,tt.height=yt,tt.getContext("2d").drawImage(E,0,0,mt,yt),zt("WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+mt+"x"+yt+")."),tt}else return"data"in E&&zt("WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),E;return E}function T(E){return E.generateMipmaps}function y(E){s.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function A(E,M,H,lt,st,mt=!1){if(E!==null){if(s[E]!==void 0)return s[E];zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let yt;lt&&(yt=t.get("EXT_texture_norm16"),yt||zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let tt=M;if(M===s.RED&&(H===s.FLOAT&&(tt=s.R32F),H===s.HALF_FLOAT&&(tt=s.R16F),H===s.UNSIGNED_BYTE&&(tt=s.R8),H===s.UNSIGNED_SHORT&&yt&&(tt=yt.R16_EXT),H===s.SHORT&&yt&&(tt=yt.R16_SNORM_EXT)),M===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(tt=s.R8UI),H===s.UNSIGNED_SHORT&&(tt=s.R16UI),H===s.UNSIGNED_INT&&(tt=s.R32UI),H===s.BYTE&&(tt=s.R8I),H===s.SHORT&&(tt=s.R16I),H===s.INT&&(tt=s.R32I)),M===s.RG&&(H===s.FLOAT&&(tt=s.RG32F),H===s.HALF_FLOAT&&(tt=s.RG16F),H===s.UNSIGNED_BYTE&&(tt=s.RG8),H===s.UNSIGNED_SHORT&&yt&&(tt=yt.RG16_EXT),H===s.SHORT&&yt&&(tt=yt.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(H===s.UNSIGNED_BYTE&&(tt=s.RG8UI),H===s.UNSIGNED_SHORT&&(tt=s.RG16UI),H===s.UNSIGNED_INT&&(tt=s.RG32UI),H===s.BYTE&&(tt=s.RG8I),H===s.SHORT&&(tt=s.RG16I),H===s.INT&&(tt=s.RG32I)),M===s.RGB_INTEGER&&(H===s.UNSIGNED_BYTE&&(tt=s.RGB8UI),H===s.UNSIGNED_SHORT&&(tt=s.RGB16UI),H===s.UNSIGNED_INT&&(tt=s.RGB32UI),H===s.BYTE&&(tt=s.RGB8I),H===s.SHORT&&(tt=s.RGB16I),H===s.INT&&(tt=s.RGB32I)),M===s.RGBA_INTEGER&&(H===s.UNSIGNED_BYTE&&(tt=s.RGBA8UI),H===s.UNSIGNED_SHORT&&(tt=s.RGBA16UI),H===s.UNSIGNED_INT&&(tt=s.RGBA32UI),H===s.BYTE&&(tt=s.RGBA8I),H===s.SHORT&&(tt=s.RGBA16I),H===s.INT&&(tt=s.RGBA32I)),M===s.RGB&&(H===s.UNSIGNED_SHORT&&yt&&(tt=yt.RGB16_EXT),H===s.SHORT&&yt&&(tt=yt.RGB16_SNORM_EXT),H===s.UNSIGNED_INT_5_9_9_9_REV&&(tt=s.RGB9_E5),H===s.UNSIGNED_INT_10F_11F_11F_REV&&(tt=s.R11F_G11F_B10F)),M===s.RGBA){let et=mt?na:ie.getTransfer(st);H===s.FLOAT&&(tt=s.RGBA32F),H===s.HALF_FLOAT&&(tt=s.RGBA16F),H===s.UNSIGNED_BYTE&&(tt=et===ue?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT&&yt&&(tt=yt.RGBA16_EXT),H===s.SHORT&&yt&&(tt=yt.RGBA16_SNORM_EXT),H===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function x(E,M){let H;return E?M===null||M===Vn||M===Rs?H=s.DEPTH24_STENCIL8:M===Hn?H=s.DEPTH32F_STENCIL8:M===Mr&&(H=s.DEPTH24_STENCIL8,zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Vn||M===Rs?H=s.DEPTH_COMPONENT24:M===Hn?H=s.DEPTH_COMPONENT32F:M===Mr&&(H=s.DEPTH_COMPONENT16),H}function S(E,M){return T(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ge&&E.minFilter!==on?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function P(E){let M=new WeakRef(E);n.get(E).__ref=M,m.add(M),_.register(E,M,M)}function R(E){let M=n.get(E).__ref;M!==void 0&&(m.delete(M),_.unregister(M))}function L(E){O(E.target)}function k(E){C(E.target)}function O(E){E.removeEventListener("dispose",L),R(E),G(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&f.delete(E)}function C(E){E.removeEventListener("dispose",k),R(E),Y(E)}function F(){for(let E of m){let M=E.deref();M!==void 0&&(M.isRenderTarget===!0?C(M):O(M))}m.clear(),f.clear()}function G(E){let M=n.get(E);if(M.__webglInit===void 0)return;let H=E.source,lt=d.get(H);if(lt){let st=lt[M.__cacheKey];st.usedTimes--,st.usedTimes===0&&N(E),Object.keys(lt).length===0&&d.delete(H)}n.remove(E)}function N(E){let M=n.get(E);s.deleteTexture(M.__webglTexture);let H=E.source,lt=d.get(H);delete lt[M.__cacheKey],a.memory.textures--}function Y(E){let M=n.get(E);M.__depthDisposeCallback&&M.__depthDisposeCallback();let H=E.depthTexture;if(H&&H.renderTarget===E&&O(H),E.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(M.__webglFramebuffer[st]))for(let mt=0;mt<M.__webglFramebuffer[st].length;mt++)s.deleteFramebuffer(M.__webglFramebuffer[st][mt]);else s.deleteFramebuffer(M.__webglFramebuffer[st]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[st])}else{if(Array.isArray(M.__webglFramebuffer))for(let st=0;st<M.__webglFramebuffer.length;st++)s.deleteFramebuffer(M.__webglFramebuffer[st]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let st=0;st<M.__webglColorRenderbuffer.length;st++)M.__webglColorRenderbuffer[st]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[st]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let lt=E.textures;for(let st=0,mt=lt.length;st<mt;st++){let yt=n.get(lt[st]);yt.__webglTexture&&(s.deleteTexture(yt.__webglTexture),a.memory.textures--),n.remove(lt[st])}n.remove(E)}let V=0;function J(){V=0}function K(){return V}function $(E){V=E}function ht(){let E=V;return E>=i.maxTextures&&zt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+i.maxTextures),V+=1,E}function X(E){let M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.mipmapsAutoUpdate),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function ot(E,M){let H=n.get(E);if(E.isVideoTexture&&he(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&H.__version!==E.version){let lt=E.image;if(lt===null)zt("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)zt("WebGLRenderer: Texture marked for update but image is incomplete");else{nt(H,E,M);return}}else E.isExternalTexture&&(H.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+M)}function pt(E,M){let H=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){nt(H,E,M);return}else E.isExternalTexture&&(H.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+M)}function Ct(E,M){let H=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){nt(H,E,M);return}e.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+M)}function ut(E,M){let H=n.get(E);if(E.version>0&&H.__version!==E.version){at(H,E,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+M)}let Nt={[Zo]:s.REPEAT,[jn]:s.CLAMP_TO_EDGE,[Jo]:s.MIRRORED_REPEAT},le={[Ge]:s.NEAREST,[Rp]:s.NEAREST_MIPMAP_NEAREST,[Ra]:s.NEAREST_MIPMAP_LINEAR,[on]:s.LINEAR,[Dl]:s.LINEAR_MIPMAP_NEAREST,[Ti]:s.LINEAR_MIPMAP_LINEAR},Ft={[Dp]:s.NEVER,[Eu]:s.ALWAYS,[Np]:s.LESS,[wu]:s.LEQUAL,[Up]:s.EQUAL,[Au]:s.GEQUAL,[Fp]:s.GREATER,[Op]:s.NOTEQUAL};function qt(E,M){if(M.type===Hn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===on||M.magFilter===Dl||M.magFilter===Ra||M.magFilter===Ti||M.minFilter===on||M.minFilter===Dl||M.minFilter===Ra||M.minFilter===Ti)&&zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,Nt[M.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,Nt[M.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,Nt[M.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,le[M.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,le[M.minFilter]),M.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,Ft[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ge||M.minFilter!==Ra&&M.minFilter!==Ti||M.type===Hn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Jt(E,M){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",L),P(M));let lt=M.source,st=d.get(lt);st===void 0&&(st={},d.set(lt,st));let mt=X(M);if(mt!==E.__cacheKey){st[mt]===void 0&&(st[mt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,H=!0),st[mt].usedTimes++;let yt=st[E.__cacheKey];yt!==void 0&&(st[E.__cacheKey].usedTimes--,yt.usedTimes===0&&N(M)),E.__cacheKey=mt,E.__webglTexture=st[mt].texture}return H}function B(E,M,H){return Math.floor(Math.floor(E/H)/M)}function Q(E,M,H,lt){let mt=E.updateRanges;if(mt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,H,lt,M.data);else{mt.sort((I,it)=>I.start-it.start);let yt=0;for(let I=1;I<mt.length;I++){let it=mt[yt],j=mt[I],xt=it.start+it.count,ft=B(j.start,M.width,4),gt=B(it.start,M.width,4);j.start<=xt+1&&ft===gt&&B(j.start+j.count-1,M.width,4)===ft?it.count=Math.max(it.count,j.start+j.count-it.start):(++yt,mt[yt]=j)}mt.length=yt+1;let tt=e.getParameter(s.UNPACK_ROW_LENGTH),et=e.getParameter(s.UNPACK_SKIP_PIXELS),_t=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let I=0,it=mt.length;I<it;I++){let j=mt[I],xt=Math.floor(j.start/4),ft=Math.ceil(j.count/4),gt=xt%M.width,Ut=Math.floor(xt/M.width),Qt=ft,ct=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,gt),e.pixelStorei(s.UNPACK_SKIP_ROWS,Ut),e.texSubImage2D(s.TEXTURE_2D,0,gt,Ut,Qt,ct,H,lt,M.data)}E.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,tt),e.pixelStorei(s.UNPACK_SKIP_PIXELS,et),e.pixelStorei(s.UNPACK_SKIP_ROWS,_t)}}function nt(E,M,H){let lt=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(lt=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(lt=s.TEXTURE_3D);let st=Jt(E,M),mt=M.source;e.bindTexture(lt,E.__webglTexture,s.TEXTURE0+H);let yt=n.get(mt);if(mt.version!==yt.__version||st===!0){if(e.activeTexture(s.TEXTURE0+H),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let ct=ie.getPrimaries(ie.workingColorSpace),Ot=M.colorSpace===Ai?null:ie.getPrimaries(M.colorSpace),Kt=M.colorSpace===Ai||ct===Ot?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt)}e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let et=v(M.image,!1,i.maxTextureSize);et=Lt(M,et);let _t=r.convert(M.format,M.colorSpace),I=r.convert(M.type),it=A(M.internalFormat,_t,I,M.normalized,M.colorSpace,M.isVideoTexture);qt(lt,M);let j,xt=M.mipmaps,ft=M.isVideoTexture!==!0,gt=yt.__version===void 0||st===!0,Ut=mt.dataReady,Qt=S(M,et);if(M.isDepthTexture)it=x(M.format===wi,M.type),gt&&(ft?e.texStorage2D(s.TEXTURE_2D,1,it,et.width,et.height):e.texImage2D(s.TEXTURE_2D,0,it,et.width,et.height,0,_t,I,null));else if(M.isDataTexture)if(xt.length>0){ft&&gt&&e.texStorage2D(s.TEXTURE_2D,Qt,it,xt[0].width,xt[0].height);for(let ct=0,Ot=xt.length;ct<Ot;ct++)j=xt[ct],ft?Ut&&e.texSubImage2D(s.TEXTURE_2D,ct,0,0,j.width,j.height,_t,I,j.data):e.texImage2D(s.TEXTURE_2D,ct,it,j.width,j.height,0,_t,I,j.data);M.generateMipmaps=!1}else ft?(gt&&e.texStorage2D(s.TEXTURE_2D,Qt,it,et.width,et.height),Ut&&Q(M,et,_t,I)):e.texImage2D(s.TEXTURE_2D,0,it,et.width,et.height,0,_t,I,et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ft&&gt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Qt,it,xt[0].width,xt[0].height,et.depth);for(let ct=0,Ot=xt.length;ct<Ot;ct++)if(j=xt[ct],M.format!==Xn)if(_t!==null)if(ft){if(Ut)if(M.layerUpdates.size>0){let Kt=Uu(j.width,j.height,M.format,M.type);for(let Tt of M.layerUpdates){let fe=j.data.subarray(Tt*Kt/j.data.BYTES_PER_ELEMENT,(Tt+1)*Kt/j.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ct,0,0,Tt,j.width,j.height,1,_t,fe)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ct,0,0,0,j.width,j.height,et.depth,_t,j.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ct,it,j.width,j.height,et.depth,0,j.data,0,0);else zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?Ut&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,ct,0,0,0,j.width,j.height,et.depth,_t,I,j.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ct,it,j.width,j.height,et.depth,0,_t,I,j.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{ft&&gt&&e.texStorage2D(s.TEXTURE_2D,Qt,it,xt[0].width,xt[0].height);for(let ct=0,Ot=xt.length;ct<Ot;ct++)j=xt[ct],M.format!==Xn?_t!==null?ft?Ut&&e.compressedTexSubImage2D(s.TEXTURE_2D,ct,0,0,j.width,j.height,_t,j.data):e.compressedTexImage2D(s.TEXTURE_2D,ct,it,j.width,j.height,0,j.data):zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?Ut&&e.texSubImage2D(s.TEXTURE_2D,ct,0,0,j.width,j.height,_t,I,j.data):e.texImage2D(s.TEXTURE_2D,ct,it,j.width,j.height,0,_t,I,j.data)}else if(M.isDataArrayTexture)if(ft){if(gt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Qt,it,et.width,et.height,et.depth),Ut)if(M.layerUpdates.size>0){let ct=Uu(et.width,et.height,M.format,M.type);for(let Ot of M.layerUpdates){let Kt=et.data.subarray(Ot*ct/et.data.BYTES_PER_ELEMENT,(Ot+1)*ct/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ot,et.width,et.height,1,_t,I,Kt)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,_t,I,et.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,it,et.width,et.height,et.depth,0,_t,I,et.data);else if(M.isData3DTexture)ft?(gt&&e.texStorage3D(s.TEXTURE_3D,Qt,it,et.width,et.height,et.depth),Ut&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,_t,I,et.data)):e.texImage3D(s.TEXTURE_3D,0,it,et.width,et.height,et.depth,0,_t,I,et.data);else if(M.isFramebufferTexture){if(gt)if(ft)e.texStorage2D(s.TEXTURE_2D,Qt,it,et.width,et.height);else{let ct=et.width,Ot=et.height;for(let Kt=0;Kt<Qt;Kt++)e.texImage2D(s.TEXTURE_2D,Kt,it,ct,Ot,0,_t,I,null),ct>>=1,Ot>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let ct=s.canvas;if(ct.hasAttribute("layoutsubtree")||ct.setAttribute("layoutsubtree","true"),et.parentNode!==ct){ct.appendChild(et),f.add(M),ct.onpaint=Ot=>{let Kt=Ot.changedElements;for(let Tt of f)Kt.includes(Tt.image)&&(Tt.needsUpdate=!0)},ct.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,et);else{let Kt=s.RGBA,Tt=s.RGBA,fe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Kt,Tt,fe,et)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(xt.length>0){if(ft&&gt){let ct=Bt(xt[0]);e.texStorage2D(s.TEXTURE_2D,Qt,it,ct.width,ct.height)}for(let ct=0,Ot=xt.length;ct<Ot;ct++)j=xt[ct],ft?Ut&&e.texSubImage2D(s.TEXTURE_2D,ct,0,0,_t,I,j):e.texImage2D(s.TEXTURE_2D,ct,it,_t,I,j);M.generateMipmaps=!1}else if(ft){if(gt){let ct=Bt(et);e.texStorage2D(s.TEXTURE_2D,Qt,it,ct.width,ct.height)}Ut&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t,I,et)}else e.texImage2D(s.TEXTURE_2D,0,it,_t,I,et);T(M)&&M.mipmapsAutoUpdate===!0&&y(lt),yt.__version=mt.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function at(E,M,H){if(M.image.length!==6)return;let lt=Jt(E,M),st=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+H);let mt=n.get(st);if(st.version!==mt.__version||lt===!0){e.activeTexture(s.TEXTURE0+H);let yt=ie.getPrimaries(ie.workingColorSpace),tt=M.colorSpace===Ai?null:ie.getPrimaries(M.colorSpace),et=M.colorSpace===Ai||yt===tt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let _t=M.isCompressedTexture||M.image[0].isCompressedTexture,I=M.image[0]&&M.image[0].isDataTexture,it=[];for(let Tt=0;Tt<6;Tt++)!_t&&!I?it[Tt]=v(M.image[Tt],!0,i.maxCubemapSize):it[Tt]=I?M.image[Tt].image:M.image[Tt],it[Tt]=Lt(M,it[Tt]);let j=it[0],xt=r.convert(M.format,M.colorSpace),ft=r.convert(M.type),gt=A(M.internalFormat,xt,ft,M.normalized,M.colorSpace),Ut=M.isVideoTexture!==!0,Qt=mt.__version===void 0||lt===!0,ct=st.dataReady,Ot=S(M,j);qt(s.TEXTURE_CUBE_MAP,M);let Kt;if(M.isDepthTexture){if(gt=x(M.format===wi,M.type),Qt)if(Ut)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,gt,j.width,j.height);else for(let Tt=0;Tt<6;Tt++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,gt,j.width,j.height,0,xt,ft,null)}else if(_t){Ut&&Qt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Ot,gt,j.width,j.height);for(let Tt=0;Tt<6;Tt++){Kt=it[Tt].mipmaps;for(let fe=0;fe<Kt.length;fe++){let Be=Kt[fe];M.format!==Xn?xt!==null?Ut?ct&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,fe,0,0,Be.width,Be.height,xt,Be.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,fe,gt,Be.width,Be.height,0,Be.data):zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?ct&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,fe,0,0,Be.width,Be.height,xt,ft,Be.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,fe,gt,Be.width,Be.height,0,xt,ft,Be.data)}}}else{if(Kt=M.mipmaps,Ut&&Qt){Kt.length>0&&Ot++;let Tt=Bt(it[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Ot,gt,Tt.width,Tt.height)}for(let Tt=0;Tt<6;Tt++)if(I){Ut?ct&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,it[Tt].width,it[Tt].height,xt,ft,it[Tt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,gt,it[Tt].width,it[Tt].height,0,xt,ft,it[Tt].data);for(let fe=0;fe<Kt.length;fe++){let Pi=Kt[fe].image[Tt].image;Ut?ct&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,fe+1,0,0,Pi.width,Pi.height,xt,ft,Pi.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,fe+1,gt,Pi.width,Pi.height,0,xt,ft,Pi.data)}}else{Ut?ct&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,xt,ft,it[Tt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,gt,xt,ft,it[Tt]);for(let fe=0;fe<Kt.length;fe++){let Be=Kt[fe];Ut?ct&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,fe+1,0,0,xt,ft,Be.image[Tt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,fe+1,gt,xt,ft,Be.image[Tt])}}}T(M)&&M.mipmapsAutoUpdate===!0&&y(s.TEXTURE_CUBE_MAP),mt.__version=st.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function rt(E,M,H,lt,st,mt){let yt=r.convert(H.format,H.colorSpace),tt=r.convert(H.type),et=A(H.internalFormat,yt,tt,H.normalized,H.colorSpace),_t=n.get(M),I=n.get(H);if(I.__renderTarget=M,!_t.__hasExternalTextures){let it=Math.max(1,M.width>>mt),j=Math.max(1,M.height>>mt);st===s.TEXTURE_3D||st===s.TEXTURE_2D_ARRAY?e.texImage3D(st,mt,et,it,j,M.depth,0,yt,tt,null):e.texImage2D(st,mt,et,it,j,0,yt,tt,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),dt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,lt,st,I.__webglTexture,0,re(M)):(st===s.TEXTURE_2D||st>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,lt,st,I.__webglTexture,mt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Et(E,M,H){if(s.bindRenderbuffer(s.RENDERBUFFER,E),M.depthBuffer){let lt=M.depthTexture,st=lt&&lt.isDepthTexture?lt.type:null,mt=x(M.stencilBuffer,st),yt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;dt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,re(M),mt,M.width,M.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,re(M),mt,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,mt,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,yt,s.RENDERBUFFER,E)}else{let lt=M.textures;for(let st=0;st<lt.length;st++){let mt=lt[st],yt=r.convert(mt.format,mt.colorSpace),tt=r.convert(mt.type),et=A(mt.internalFormat,yt,tt,mt.normalized,mt.colorSpace);dt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,re(M),et,M.width,M.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,re(M),et,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,et,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function bt(E,M,H){let lt=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let st=n.get(M.depthTexture);st.__renderTarget=M;let mt=lt?M.depthTexture.image[0]:M.depthTexture.image;(!st.__webglTexture||mt.width!==M.width||mt.height!==M.height)&&(mt.width=M.width,mt.height=M.height,M.depthTexture.needsUpdate=!0),lt?ut(M.depthTexture,0):ot(M.depthTexture,0);let yt=st.__webglTexture,tt=re(M),et=lt?s.TEXTURE_CUBE_MAP_POSITIVE_X+H:s.TEXTURE_2D,_t=M.depthTexture.format===wi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Mi)dt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_t,et,yt,0,tt):s.framebufferTexture2D(s.FRAMEBUFFER,_t,et,yt,0);else if(M.depthTexture.format===wi)dt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_t,et,yt,0,tt):s.framebufferTexture2D(s.FRAMEBUFFER,_t,et,yt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Gt(E){let M=n.get(E),H=E.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==E.depthTexture){let lt=E.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),lt){let st=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,lt.removeEventListener("dispose",st)};lt.addEventListener("dispose",st),M.__depthDisposeCallback=st}M.__boundDepthTexture=lt}if(E.depthTexture&&!M.__autoAllocateDepthBuffer)if(H)for(let lt=0;lt<6;lt++)bt(M.__webglFramebuffer[lt],E,lt);else E.texture.mipmaps.length>0?bt(M.__webglFramebuffer[0],E,0):bt(M.__webglFramebuffer,E,0);else if(H){M.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[lt]),M.__webglDepthbuffer[lt]===void 0)M.__webglDepthbuffer[lt]=s.createRenderbuffer(),Et(M.__webglDepthbuffer[lt],E,!1);else{let st=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=M.__webglDepthbuffer[lt];s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,mt)}}else if(E.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),Et(M.__webglDepthbuffer,E,!1);else{let st=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,mt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ht(E,M,H){let lt=n.get(E);M!==void 0&&rt(lt.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&Gt(E)}function kt(E){let M=E.texture,H=n.get(E),lt=n.get(M);E.addEventListener("dispose",k),P(E);let st=E.textures,mt=E.isWebGLCubeRenderTarget===!0,yt=st.length>1;if(yt||(lt.__webglTexture===void 0&&(lt.__webglTexture=s.createTexture()),lt.__version=M.version,a.memory.textures++),mt){H.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(M.mipmaps.length>0){H.__webglFramebuffer[tt]=[];for(let et=0;et<M.mipmaps.length;et++)H.__webglFramebuffer[tt][et]=s.createFramebuffer()}else H.__webglFramebuffer[tt]=s.createFramebuffer()}else{if(M.mipmaps.length>0){H.__webglFramebuffer=[];for(let tt=0;tt<M.mipmaps.length;tt++)H.__webglFramebuffer[tt]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(yt)for(let tt=0,et=st.length;tt<et;tt++){let _t=n.get(st[tt]);_t.__webglTexture===void 0&&(_t.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&dt(E)===!1){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let tt=0;tt<st.length;tt++){let et=st[tt];H.__webglColorRenderbuffer[tt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[tt]);let _t=r.convert(et.format,et.colorSpace),I=r.convert(et.type),it=A(et.internalFormat,_t,I,et.normalized,et.colorSpace,E.isXRRenderTarget===!0),j=re(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,j,it,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+tt,s.RENDERBUFFER,H.__webglColorRenderbuffer[tt])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),Et(H.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(mt){e.bindTexture(s.TEXTURE_CUBE_MAP,lt.__webglTexture),qt(s.TEXTURE_CUBE_MAP,M);for(let tt=0;tt<6;tt++)if(M.mipmaps.length>0)for(let et=0;et<M.mipmaps.length;et++)rt(H.__webglFramebuffer[tt][et],E,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,et);else rt(H.__webglFramebuffer[tt],E,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);T(M)?y(s.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}else if(yt){for(let tt=0,et=st.length;tt<et;tt++){let _t=st[tt],I=n.get(_t),it=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(it=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(it,I.__webglTexture),qt(it,_t),rt(H.__webglFramebuffer,E,_t,s.COLOR_ATTACHMENT0+tt,it,0),T(_t)&&y(it)}e.unbindTexture()}else{let tt=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(tt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(tt,lt.__webglTexture),qt(tt,M),M.mipmaps.length>0)for(let et=0;et<M.mipmaps.length;et++)rt(H.__webglFramebuffer[et],E,M,s.COLOR_ATTACHMENT0,tt,et);else rt(H.__webglFramebuffer,E,M,s.COLOR_ATTACHMENT0,tt,0);T(M)?y(tt):M.mipmaps.length>0&&s.texParameteri(tt,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}E.depthBuffer&&Gt(E)}function D(E){let M=E.textures;for(let H=0,lt=M.length;H<lt;H++){let st=M[H];if(T(st)&&st.mipmapsAutoUpdate===!0){let mt=w(E),yt=n.get(st).__webglTexture;e.bindTexture(mt,yt),y(mt),e.unbindTexture()}}}let de=[];function Xt(E){if(E.samples>0){if(dt(E)===!1){let M=E.textures,H=E.width,lt=E.height,st=s.COLOR_BUFFER_BIT,mt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=n.get(E),tt=M.length>1;if(tt)for(let _t=0;_t<M.length;_t++)e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let _t=0;_t<M.length;_t++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(st|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(st|=s.STENCIL_BUFFER_BIT)),tt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,yt.__webglColorRenderbuffer[_t]);let I=n.get(M[_t]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,I,0)}s.blitFramebuffer(0,0,H,lt,0,0,H,lt,st,s.NEAREST),l===!0&&(de.length=0,de.push(s.COLOR_ATTACHMENT0+_t),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&de.push(mt),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,de))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),tt)for(let _t=0;_t<M.length;_t++){e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,yt.__webglColorRenderbuffer[_t]);let I=n.get(M[_t]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,I,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let M=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function re(E){return Math.min(i.maxSamples,E.samples)}function dt(E){let M=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function he(E){let M=a.render.frame;h.get(E)!==M&&(h.set(E,M),E.update())}function Lt(E,M){let H=E.colorSpace,lt=E.format,st=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||H!==ea&&H!==Ai&&(ie.getTransfer(H)===ue?(lt!==Xn||st!==gn)&&zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",H)),M}function Bt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=ht,this.resetTextureUnits=J,this.getTextureUnits=K,this.setTextureUnits=$,this.setTexture2D=ot,this.setTexture2DArray=pt,this.setTexture3D=Ct,this.setTextureCube=ut,this.rebindTextures=Ht,this.setupRenderTarget=kt,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=Xt,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=dt,this.dispose=F}function LS(s,t){function e(n,i=Ai){let r,a=ie.getTransfer(i);if(n===gn)return s.UNSIGNED_BYTE;if(n===Ul)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Fl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===yu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Mu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===xu)return s.BYTE;if(n===vu)return s.SHORT;if(n===Mr)return s.UNSIGNED_SHORT;if(n===Nl)return s.INT;if(n===Vn)return s.UNSIGNED_INT;if(n===Hn)return s.FLOAT;if(n===Wn)return s.HALF_FLOAT;if(n===Su)return s.ALPHA;if(n===bu)return s.RGB;if(n===Xn)return s.RGBA;if(n===Mi)return s.DEPTH_COMPONENT;if(n===wi)return s.DEPTH_STENCIL;if(n===Tu)return s.RED;if(n===Ol)return s.RED_INTEGER;if(n===ts)return s.RG;if(n===Bl)return s.RG_INTEGER;if(n===zl)return s.RGBA_INTEGER;if(n===Pa||n===Ia||n===La||n===Da)if(a===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Pa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===La)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Pa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===La)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===kl||n===Gl||n===Vl||n===Hl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===kl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Hl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wl||n===Xl||n===ql||n===Yl||n===$l||n===Na||n===Zl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wl||n===Xl)return a===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ql)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Yl)return r.COMPRESSED_R11_EAC;if(n===$l)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Na)return r.COMPRESSED_RG11_EAC;if(n===Zl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Jl||n===Kl||n===Ql||n===jl||n===tc||n===ec||n===nc||n===ic||n===sc||n===rc||n===ac||n===oc||n===lc||n===cc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Jl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Kl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ql)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===tc)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ec)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===nc)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ic)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sc)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===rc)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ac)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===oc)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===lc)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cc)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===hc||n===uc||n===fc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===hc)return a===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===uc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dc||n===pc||n===Ua||n===mc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===dc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===pc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===mc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Rs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var DS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,NS=`
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

}`,Zu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new fa(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Nn({vertexShader:DS,fragmentShader:NS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new An(new Ts(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ju=class extends ei{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,m=null,_=typeof XRWebGLBinding<"u",p=new Zu,g={},v=e.getContextAttributes(),T=null,y=null,w=[],A=[],x=new St,S=null,P=null,R=new an;R.viewport=new Se;let L=new an;L.viewport=new Se;let k=[R,L],O=new Rl,C=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ot=w[X];return ot===void 0&&(ot=new or,w[X]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(X){let ot=w[X];return ot===void 0&&(ot=new or,w[X]=ot),ot.getGripSpace()},this.getHand=function(X){let ot=w[X];return ot===void 0&&(ot=new or,w[X]=ot),ot.getHandSpace()};function G(X){let ot=A.indexOf(X.inputSource);if(ot===-1)return;let pt=w[ot];pt!==void 0&&(pt.update(X.inputSource,X.frame,c||a),pt.dispatchEvent({type:X.type,data:X.inputSource}))}function N(){i.removeEventListener("select",G),i.removeEventListener("selectstart",G),i.removeEventListener("selectend",G),i.removeEventListener("squeeze",G),i.removeEventListener("squeezestart",G),i.removeEventListener("squeezeend",G),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",Y);for(let X=0;X<w.length;X++){let ot=A[X];ot!==null&&(A[X]=null,w[X].disconnect(ot))}C=null,F=null,p.reset();for(let X in g)delete g[X];if(t.setRenderTarget(T),d=null,u=null,f=null,i=null,y=null,ht.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(x.width,x.height,!1),P!==null){let X=P.camera;X.fov=P.fov,X.zoom=P.zoom,X.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(i,e)),f},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(T=t.getRenderTarget(),i.addEventListener("select",G),i.addEventListener("selectstart",G),i.addEventListener("selectend",G),i.addEventListener("squeeze",G),i.addEventListener("squeezestart",G),i.addEventListener("squeezeend",G),i.addEventListener("end",N),i.addEventListener("inputsourceschange",Y),v.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Ct=null,ut=null;v.depth&&(ut=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=v.stencil?wi:Mi,Ct=v.stencil?Rs:Vn);let Nt={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Nt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new wn(u.textureWidth,u.textureHeight,{format:Xn,type:gn,depthTexture:new bi(u.textureWidth,u.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let pt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,pt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new wn(d.framebufferWidth,d.framebufferHeight,{format:Xn,type:gn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ht.setContext(i),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Y(X){for(let ot=0;ot<X.removed.length;ot++){let pt=X.removed[ot],Ct=A.indexOf(pt);Ct>=0&&(A[Ct]=null,w[Ct].disconnect(pt))}for(let ot=0;ot<X.added.length;ot++){let pt=X.added[ot],Ct=A.indexOf(pt);if(Ct===-1){for(let Nt=0;Nt<w.length;Nt++)if(Nt>=A.length){A.push(pt),Ct=Nt;break}else if(A[Nt]===null){A[Nt]=pt,Ct=Nt;break}if(Ct===-1)break}let ut=w[Ct];ut&&ut.connect(pt)}}function V(X,ot){ot===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ot.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let ot=X.near,pt=X.far;p.texture!==null&&(p.depthNear>0&&(ot=p.depthNear),p.depthFar>0&&(pt=p.depthFar)),O.near=L.near=R.near=ot,O.far=L.far=R.far=pt,(C!==O.near||F!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),C=O.near,F=O.far),O.layers.mask=X.layers.mask|6,R.layers.mask=O.layers.mask&-5,L.layers.mask=O.layers.mask&-3;let Ct=X.parent,ut=O.cameras;V(O,Ct);for(let Nt=0;Nt<ut.length;Nt++)V(ut[Nt],Ct);O.projectionMatrix.copy(R.projectionMatrix),O.projectionMatrixInverse.copy(R.projectionMatrixInverse),P===null&&X.isPerspectiveCamera&&(P={camera:X,fov:X.fov,zoom:X.zoom}),J(X,O,Ct)};function J(X,ot,pt){pt===null?X.matrix.copy(ot.matrixWorld):(X.matrix.copy(pt.matrixWorld),X.matrix.invert(),X.matrix.multiply(ot.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ot.projectionMatrix),X.projectionMatrixInverse.copy(ot.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Qo*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(X){return g[X]};let K=null;function $(X,ot){if(h=ot.getViewerPose(c||a),m=ot,h!==null){let pt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let Ct=!1;pt.length!==O.cameras.length&&(O.cameras.length=0,Ct=!0);for(let Ft=0;Ft<pt.length;Ft++){let qt=pt[Ft],Jt=null;if(d!==null)Jt=d.getViewport(qt);else{let Q=f.getViewSubImage(u,qt);Jt=Q.viewport,Ft===0&&(t.setRenderTargetTextures(y,Q.colorTexture,Q.depthStencilTexture),t.setRenderTarget(y))}let B=k[Ft];B===void 0&&(B=new an,B.layers.enable(Ft),B.viewport=new Se,k[Ft]=B),B.matrix.fromArray(qt.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(qt.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),Ft===0&&(O.matrix.copy(B.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ct===!0&&O.cameras.push(B)}let ut=i.enabledFeatures;if(ut&&ut.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){f=n.getBinding();let Ft=f.getDepthInformation(pt[0]);Ft&&Ft.isValid&&Ft.texture&&p.init(Ft,i.renderState)}if(ut&&ut.includes("camera-access")&&_){t.state.unbindTexture(),f=n.getBinding();for(let Ft=0;Ft<pt.length;Ft++){let qt=pt[Ft].camera;if(qt){let Jt=g[qt];Jt||(Jt=new fa,g[qt]=Jt);let B=f.getCameraImage(qt);Jt.sourceTexture=B}}}}for(let pt=0;pt<w.length;pt++){let Ct=A[pt],ut=w[pt];Ct!==null&&ut!==void 0&&ut.update(Ct,ot,c||a)}K&&K(X,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),m=null}let ht=new vm;ht.setAnimationLoop($),this.setAnimationLoop=function(X){K=X},this.dispose=function(){}}},US=new _e,Rm=new Wt;Rm.set(-1,0,0,0,1,0,0,0,1);function FS(s,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Lu(s)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,v,T,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),f(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),u(p,g),g.isMeshPhysicalMaterial&&d(p,g,y)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,v,T):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===ln&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===ln&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let v=t.get(g),T=v.envMap,y=v.envMapRotation;T&&(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4(US.makeRotationFromEuler(y)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Rm),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,v,T){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=T*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function f(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function d(p,g,v){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===ln&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function OS(s,t,e,n){let i={},r={};function a(v,T){let y=T.program;n.uniformBlockBinding(v,y,i[v.id])}function o(v,T){let y=i[v.id];y===void 0&&(m(v),y=l(v),i[v.id]=y,v.addEventListener("dispose",p));let w=T.program;n.updateUBOMapping(v,w);let A=t.render.frame;r[v.id]!==A&&(c(v),r[v.id]=A)}function l(v){let T=s.createBuffer(),y=v.__size,w=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,y,w),s.bindBuffer(s.UNIFORM_BUFFER,null),T}function c(v){let T=i[v.id],y=v.uniforms,w=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let A=0,x=y.length;A<x;A++){let S=y[A];if(Array.isArray(S))for(let P=0,R=S.length;P<R;P++)h(S[P],A,P,w);else h(S,A,0,w)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(v,T,y,w){if(u(v,T,y,w)===!0){let A=v.__offset,x=v.value;if(Array.isArray(x)){let S=0;for(let P=0;P<x.length;P++){let R=x[P],L=_(R,!0);f(R,v.__data,S),S+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else f(x,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,A,v.__data)}}function f(v,T,y){typeof v=="number"||typeof v=="boolean"?T[y]=v:v.isMatrix3?(T[y]=v.elements[0],T[y+1]=v.elements[1],T[y+2]=v.elements[2],T[y+3]=0,T[y+4]=v.elements[3],T[y+5]=v.elements[4],T[y+6]=v.elements[5],T[y+7]=0,T[y+8]=v.elements[6],T[y+9]=v.elements[7],T[y+10]=v.elements[8],T[y+11]=0):ArrayBuffer.isView(v)?T.set(v.subarray(0,T.length-y),y):v.toArray(T,y)}function u(v,T,y,w){let A=v.value,x=T+"_"+y;if(Array.isArray(A)){w[x]===void 0&&(w[x]=[]);let S=w[x],P=!1;for(let R=0;R<A.length;R++)d(A[R],S,R)===!0&&(P=!0);return P}return d(A,w,x)}function d(v,T,y){if(T[y]===void 0)return typeof v=="number"||typeof v=="boolean"?T[y]=v:ArrayBuffer.isView(v)?T[y]=v.slice():T[y]=v.clone(),!0;{let w=T[y];if(typeof v=="number"||typeof v=="boolean"){if(w!==v)return T[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(w.equals(v)===!1)return w.copy(v),!0}}return!1}function m(v){let T=v.uniforms,y=0,w=16;for(let x=0,S=T.length;x<S;x++){let P=Array.isArray(T[x])?T[x]:[T[x]];for(let R=0,L=P.length;R<L;R++){let k=P[R],O=Array.isArray(k.value)?k.value:[k.value],C=Array.isArray(T[x])||Array.isArray(k.value),F=y;for(let N=0,Y=O.length;N<Y;N++){let V=O[N],J=_(V,C),K=y%w,$=K%J.boundary,ht=K+$;y+=$,ht!==0&&w-ht<J.storage&&(y+=w-ht),N===0&&(F=y),y+=J.storage}let G=k.type==="int"?Int32Array:k.type==="uint"?Uint32Array:Float32Array;k.__data=new G((y-F)/Float32Array.BYTES_PER_ELEMENT),k.__offset=F}}let A=y%w;return A>0&&(y+=w-A),v.__size=y,v.__cache={},this}function _(v,T){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):zt("WebGLRenderer: Unsupported uniform value type.",v),T===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function p(v){let T=v.target;T.removeEventListener("dispose",p),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function g(){for(let v in i)s.deleteBuffer(i[v]);i={},r={}}return{bind:a,update:o,dispose:g}}var BS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ri=null;function zS(){return ri===null&&(ri=new il(BS,16,16,ts,Wn),ri.name="DFG_LUT",ri.minFilter=on,ri.magFilter=on,ri.wrapS=jn,ri.wrapT=jn,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}var yc=class{constructor(t={}){let{canvas:e=zp(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=gn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=d,p=new Set([zl,Bl,Ol]),g=new Set([gn,Vn,Mr,Rs,Ul,Fl]),v=new Uint32Array(4),T=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},w=null,A=null,x=[],S=[],P=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,L=!1,k=null,O=null,C=null,F=null;this._outputColorSpace=rn;let G=0,N=0,Y=null,V=-1,J=null,K=new Se,$=new Se,ht=null,X=new $t(0),ot=0,pt=e.width,Ct=e.height,ut=1,Nt=null,le=null,Ft=new Se(0,0,pt,Ct),qt=new Se(0,0,pt,Ct),Jt=!1,B=new Zi,Q=new sl,nt=!1,at=!1,rt=new _e,Et=new z,bt=new Se,Gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ht=!1;function kt(){return Y===null?ut:1}let D=n;function de(b,U){return e.getContext(b,U)}let Xt,re,dt,he,Lt,Bt,E,M,H,lt,st,mt,yt,tt,et,_t,I,it,j,xt,ft,gt,Ut;try{let b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Ot,!1),e.addEventListener("webglcontextrestored",Kt,!1),e.addEventListener("webglcontextcreationerror",Tt,!1),D===null){let U="webgl2";if(D=de(U,b),D===null)throw de(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Qt()}catch(b){throw e.removeEventListener("webglcontextlost",Ot,!1),e.removeEventListener("webglcontextrestored",Kt,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),Vt("WebGLRenderer: "+b.message),b}function Qt(){Xt=new Jy(D),Xt.init(),ft=new LS(D,Xt),re=new zy(D,Xt,t,ft),dt=new PS(D,Xt),re.reversedDepthBuffer&&u&&dt.buffers.depth.setReversed(!0),O=D.createFramebuffer(),C=D.createFramebuffer(),F=D.createFramebuffer(),he=new jy(D),Lt=new gS,Bt=new IS(D,Xt,dt,Lt,re,ft,he),E=new Zy(R),M=new ex(D),gt=new Oy(D,M),H=new Ky(D,M,he,gt),lt=new eM(D,H,M,gt,he),it=new tM(D,re,Bt),et=new ky(Lt),st=new mS(R,E,Xt,re,gt,et),mt=new FS(R,Lt),yt=new xS,tt=new TS(Xt),I=new Fy(R,E,dt,lt,m,l),_t=new RS(R,lt,re),Ut=new OS(D,he,re,dt),j=new By(D,Xt,he),xt=new Qy(D,Xt,he),he.programs=st.programs,R.capabilities=re,R.extensions=Xt,R.properties=Lt,R.renderLists=yt,R.shadowMap=_t,R.state=dt,R.info=he}_!==gn&&(P=new iM(_,e.width,e.height,o,i,r));let ct=new Ju(R,D);this.xr=ct,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let b=Xt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Xt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ut},this.setPixelRatio=function(b){b!==void 0&&(ut=b,this.setSize(pt,Ct,!1))},this.getSize=function(b){return b.set(pt,Ct)},this.setSize=function(b,U,Z=!0){if(ct.isPresenting){zt("WebGLRenderer: Can't change size while VR device is presenting.");return}pt=b,Ct=U,e.width=Math.floor(b*ut),e.height=Math.floor(U*ut),Z===!0&&(e.style.width=b+"px",e.style.height=U+"px"),P!==null&&P.setSize(e.width,e.height),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(pt*ut,Ct*ut).floor()},this.setDrawingBufferSize=function(b,U,Z){pt=b,Ct=U,ut=Z,e.width=Math.floor(b*Z),e.height=Math.floor(U*Z),this.setViewport(0,0,b,U)},this.setEffects=function(b){if(_===gn){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let U=0;U<b.length;U++)if(b[U].isOutputPass===!0){zt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(K)},this.getViewport=function(b){return b.copy(Ft)},this.setViewport=function(b,U,Z,W){b.isVector4?Ft.set(b.x,b.y,b.z,b.w):Ft.set(b,U,Z,W),dt.viewport(K.copy(Ft).multiplyScalar(kt()).round())},this.getScissor=function(b){return b.copy(qt)},this.setScissor=function(b,U,Z,W){b.isVector4?qt.set(b.x,b.y,b.z,b.w):qt.set(b,U,Z,W),dt.scissor($.copy(qt).multiplyScalar(kt()).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(b){dt.setScissorTest(Jt=b)},this.setOpaqueSort=function(b){Nt=b},this.setTransparentSort=function(b){le=b},this.getClearColor=function(b){return b.copy(I.getClearColor())},this.setClearColor=function(){I.setClearColor(...arguments)},this.getClearAlpha=function(){return I.getClearAlpha()},this.setClearAlpha=function(){I.setClearAlpha(...arguments)},this.clear=function(b=!0,U=!0,Z=!0){let W=0;if(b){let q=!1;if(Y!==null){let Mt=Y.texture.format;q=p.has(Mt)}if(q){let Mt=Y.texture.type,Rt=g.has(Mt),vt=I.getClearColor(),At=I.getClearAlpha(),Dt=vt.r,Yt=vt.g,ee=vt.b;Rt?(v[0]=Dt,v[1]=Yt,v[2]=ee,v[3]=At,D.clearBufferuiv(D.COLOR,0,v)):(T[0]=Dt,T[1]=Yt,T[2]=ee,T[3]=At,D.clearBufferiv(D.COLOR,0,T))}else W|=D.COLOR_BUFFER_BIT}U&&(W|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(W|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&D.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),k=b},this.dispose=function(){e.removeEventListener("webglcontextlost",Ot,!1),e.removeEventListener("webglcontextrestored",Kt,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),I.dispose(),yt.dispose(),tt.dispose(),Bt.dispose(),Lt.dispose(),E.dispose(),lt.dispose(),H.dispose(),gt.dispose(),Ut.dispose(),st.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",cf),ct.removeEventListener("sessionend",hf),is.stop()};function Ot(b){b.preventDefault(),Ru("WebGLRenderer: Context Lost."),L=!0}function Kt(){Ru("WebGLRenderer: Context Restored."),L=!1;let b=he.autoReset,U=_t.enabled,Z=_t.autoUpdate,W=_t.needsUpdate,q=_t.type;Qt(),he.autoReset=b,_t.enabled=U,_t.autoUpdate=Z,_t.needsUpdate=W,_t.type=q}function Tt(b){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function fe(b){let U=b.target;U.removeEventListener("dispose",fe),Be(U)}function Be(b){Pi(b),Lt.remove(b)}function Pi(b){let U=Lt.get(b).programs;U!==void 0&&(U.forEach(function(Z){st.releaseProgram(Z)}),b.isShaderMaterial&&st.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,Z,W,q,Mt){U===null&&(U=Gt);let Rt=q.isMesh&&q.matrixWorld.determinantAffine()<0,vt=tg(b,U,Z,W,q);dt.setMaterial(W,Rt);let At=Z.index,Dt=1;if(W.wireframe===!0){if(At=H.getWireframeAttribute(Z),At===void 0)return;Dt=2}let Yt=Z.drawRange,ee=Z.attributes.position,Pt=Yt.start*Dt,ne=(Yt.start+Yt.count)*Dt;Mt!==null&&(Pt=Math.max(Pt,Mt.start*Dt),ne=Math.min(ne,(Mt.start+Mt.count)*Dt)),At!==null?(Pt=Math.max(Pt,0),ne=Math.min(ne,At.count)):ee!=null&&(Pt=Math.max(Pt,0),ne=Math.min(ne,ee.count));let Le=ne-Pt;if(Le<0||Le===1/0)return;gt.setup(q,W,vt,Z,At);let xe,me=j;if(At!==null&&(xe=M.get(At),me=xt,me.setIndex(xe)),q.isMesh)W.wireframe===!0?(dt.setLineWidth(W.wireframeLinewidth*kt()),me.setMode(D.LINES)):me.setMode(D.TRIANGLES);else if(q.isLine){let Ye=W.linewidth;Ye===void 0&&(Ye=1),dt.setLineWidth(Ye*kt()),q.isLineSegments?me.setMode(D.LINES):q.isLineLoop?me.setMode(D.LINE_LOOP):me.setMode(D.LINE_STRIP)}else q.isPoints?me.setMode(D.POINTS):q.isSprite&&me.setMode(D.TRIANGLES);if(q.isBatchedMesh)if(Xt.get("WEBGL_multi_draw"))me.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Ye=q._multiDrawStarts,It=q._multiDrawCounts,en=q._multiDrawCount,ce=At?M.get(At).bytesPerElement:1,ss=Lt.get(W).currentProgram.getUniforms();for(let $e=0;$e<en;$e++)ss.setValue(D,"_gl_DrawID",$e),me.render(Ye[$e]/ce,It[$e])}else if(q.isInstancedMesh)me.renderInstances(Pt,Le,q.count);else if(Z.isInstancedBufferGeometry){let Ye=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,It=Math.min(Z.instanceCount,Ye);me.renderInstances(Pt,Le,It)}else me.render(Pt,Le)};function lf(b,U,Z,W){k!==null&&b.isNodeMaterial&&k.setObject(W,b),nt===!0&&et.setState(b,Z,!1),b.transparent===!0&&b.side===ii&&b.forceSinglePass===!1?(b.side=ln,b.needsUpdate=!0,Cr(b,U,W),b.side=ji,b.needsUpdate=!0,Cr(b,U,W),b.side=ii):Cr(b,U,W)}this.compile=function(b,U,Z=null){Z===null&&(Z=b),k!==null&&k.renderStart(b,U,Z),A=tt.get(Z),A.init(U),S.push(A),Z.traverseVisible(function(q){q.isLight&&q.layers.test(U.layers)&&(A.pushLight(q),q.castShadow&&A.pushShadow(q))}),b!==Z&&b.traverseVisible(function(q){q.isLight&&q.layers.test(U.layers)&&(A.pushLight(q),q.castShadow&&A.pushShadow(q))}),A.setupLights(),k!==null&&k.updateLights(A.state.lightsArray),at=this.localClippingEnabled,nt=et.init(this.clippingPlanes,at),nt===!0&&et.setGlobalState(this.clippingPlanes,U),k!==null&&_t.render(A.state.shadowsArray,Z,U);let W=new Set;return b.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let Mt=q.material;if(Mt)if(Array.isArray(Mt))for(let Rt=0;Rt<Mt.length;Rt++){let vt=Mt[Rt];lf(vt,Z,U,q),W.add(vt)}else lf(Mt,Z,U,q),W.add(Mt)}),A=S.pop(),k!==null&&k.renderEnd(),W},this.compileAsync=function(b,U,Z=null){let W=this.compile(b,U,Z);return new Promise(q=>{function Mt(){if(W.forEach(function(Rt){let At=Lt.get(Rt).currentProgram;(At===void 0||At.isReady())&&W.delete(Rt)}),W.size===0){q(b);return}setTimeout(Mt,10)}Xt.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Rc=null;function Qm(b){Rc&&Rc(b)}function cf(){is.stop()}function hf(){is.start()}let is=new vm;is.setAnimationLoop(Qm),typeof self<"u"&&is.setContext(self),this.setAnimationLoop=function(b){Rc=b,ct.setAnimationLoop(b),b===null?is.stop():is.start()},ct.addEventListener("sessionstart",cf),ct.addEventListener("sessionend",hf),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;k!==null&&k.renderStart(b,U);let Z=ct.enabled===!0&&ct.isPresenting===!0,W=P!==null&&(Y===null||Z)&&P.begin(R,Y);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(U),U=ct.getCamera()),b.isScene===!0&&b.onBeforeRender(R,b,U,Y),A=tt.get(b,S.length),A.init(U),A.state.textureUnits=Bt.getTextureUnits(),S.push(A),rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?Q.setFromArrayCamera(U):B.setFromProjectionMatrix(rt,Dn,U.reversedDepth),at=this.localClippingEnabled,nt=et.init(this.clippingPlanes,at),w=yt.get(b,x.length),w.init(),x.push(w),this.info.render.frame++,ct.enabled===!0&&ct.isPresenting===!0){let Rt=R.xr.getDepthSensingMesh();Rt!==null&&Pc(Rt,U,-1/0,R.sortObjects)}Pc(b,U,0,R.sortObjects),w.finish(),k!==null&&k.updateLights(A.state.lightsArray),R.sortObjects===!0&&w.sort(Nt,le),Ht=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Ht&&I.addToRenderList(w,b),this.info.autoReset===!0&&this.info.reset(),nt===!0&&et.beginShadows();let q=A.state.shadowsArray;if(_t.render(q,b,U),nt===!0&&et.endShadows(),(W&&P.hasRenderPass())===!1){let Rt=w.opaque,vt=w.transmissive;if(A.setupLights(),U.isArrayCamera){let At=U.cameras;if(vt.length>0)for(let Dt=0,Yt=At.length;Dt<Yt;Dt++){let ee=At[Dt];ff(Rt,vt,b,ee)}Ht&&I.render(b);for(let Dt=0,Yt=At.length;Dt<Yt;Dt++){let ee=At[Dt];uf(w,b,ee,ee.viewport)}}else vt.length>0&&ff(Rt,vt,b,U),Ht&&I.render(b),uf(w,b,U)}Y!==null&&N===0&&(Bt.updateMultisampleRenderTarget(Y),Bt.updateRenderTargetMipmap(Y)),W&&P.end(R),b.isScene===!0&&b.onAfterRender(R,b,U),gt.resetDefaultState(),V=-1,J=null,S.pop(),S.length>0?(A=S[S.length-1],Bt.setTextureUnits(A.state.textureUnits),nt===!0&&et.setGlobalState(R.clippingPlanes,A.state.camera)):A=null,x.pop(),x.length>0?w=x[x.length-1]:w=null,k!==null&&k.renderEnd()};function Pc(b,U,Z,W){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)A.pushLight(b),b.castShadow&&A.pushShadow(b);else if(b.isSprite){let Rt=U.isArrayCamera?Q:B;if(!b.frustumCulled||b.intersectsFrustum(Rt)){W&&bt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(rt);let vt=lt.update(b),At=b.material;At.visible&&w.push(b,vt,At,Z,bt.z,null,U)}}else if(b.isMesh||b.isLine||b.isPoints){let Rt=U.isArrayCamera?Q:B;if(!b.frustumCulled||b.intersectsFrustum(Rt)){let vt=lt.update(b),At=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),bt.copy(b.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),bt.copy(vt.boundingSphere.center)),bt.applyMatrix4(b.matrixWorld).applyMatrix4(rt)),Array.isArray(At)){let Dt=vt.groups;for(let Yt=0,ee=Dt.length;Yt<ee;Yt++){let Pt=Dt[Yt],ne=At[Pt.materialIndex];ne&&ne.visible&&w.push(b,vt,ne,Z,bt.z,Pt,U)}}else At.visible&&w.push(b,vt,At,Z,bt.z,null,U)}}}let Mt=b.children;for(let Rt=0,vt=Mt.length;Rt<vt;Rt++)Pc(Mt[Rt],U,Z,W)}function uf(b,U,Z,W){let{opaque:q,transmissive:Mt,transparent:Rt}=b;A.setupLightsView(Z),nt===!0&&et.setGlobalState(R.clippingPlanes,Z),W&&dt.viewport(K.copy(W)),q.length>0&&qa(q,U,Z),Mt.length>0&&qa(Mt,U,Z),Rt.length>0&&qa(Rt,U,Z),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function ff(b,U,Z,W){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[W.id]===void 0){let Pt=Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[W.id]=new wn(1,1,{generateMipmaps:!0,type:Pt?Wn:gn,minFilter:Ti,samples:Math.max(4,re.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ie.workingColorSpace})}let Mt=A.state.transmissionRenderTarget[W.id],Rt=W.viewport||K;Mt.setSize(Rt.z*R.transmissionResolutionScale,Rt.w*R.transmissionResolutionScale);let vt=R.getRenderTarget(),At=R.getActiveCubeFace(),Dt=R.getActiveMipmapLevel();R.setRenderTarget(Mt),R.getClearColor(X),ot=R.getClearAlpha(),ot<1&&R.setClearColor(16777215,.5),R.clear(),Ht&&I.render(Z);let Yt=R.toneMapping;R.toneMapping=si;let ee=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),A.setupLightsView(W),nt===!0&&et.setGlobalState(R.clippingPlanes,W),qa(b,Z,W),Bt.updateMultisampleRenderTarget(Mt),Bt.updateRenderTargetMipmap(Mt),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let ne=0,Le=U.length;ne<Le;ne++){let xe=U[ne],{object:me,geometry:Ye,material:It,group:en}=xe;if(It.side===ii&&me.layers.test(W.layers)){let ce=It.side;It.side=ln,It.needsUpdate=!0,df(me,Z,W,Ye,It,en),It.side=ce,It.needsUpdate=!0,Pt=!0}}Pt===!0&&(Bt.updateMultisampleRenderTarget(Mt),Bt.updateRenderTargetMipmap(Mt))}R.setRenderTarget(vt,At,Dt),R.setClearColor(X,ot),ee!==void 0&&(W.viewport=ee),R.toneMapping=Yt}function qa(b,U,Z){let W=U.isScene===!0?U.overrideMaterial:null;for(let q=0,Mt=b.length;q<Mt;q++){let Rt=b[q],{object:vt,geometry:At,group:Dt}=Rt,Yt=Rt.material;Yt.allowOverride===!0&&W!==null&&(Yt=W),vt.layers.test(Z.layers)&&df(vt,U,Z,At,Yt,Dt)}}function df(b,U,Z,W,q,Mt){k!==null&&q.isNodeMaterial&&k.setObject(b,q),b.onBeforeRender(R,U,Z,W,q,Mt),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(R,U,Z,W,b,Mt),q.transparent===!0&&q.side===ii&&q.forceSinglePass===!1?(q.side=ln,q.needsUpdate=!0,R.renderBufferDirect(Z,U,W,q,b,Mt),q.side=ji,q.needsUpdate=!0,R.renderBufferDirect(Z,U,W,q,b,Mt),q.side=ii):R.renderBufferDirect(Z,U,W,q,b,Mt),b.onAfterRender(R,U,Z,W,q,Mt)}function pf(b){let U=0;for(let Z of b)Z.texture!==null&&U++;return U}function Cr(b,U,Z){U.isScene!==!0&&(U=Gt);let W=Lt.get(b),q=A.state.lights,Mt=A.state.shadowsArray,Rt=q.state.version,vt=st.getParameters(b,q.state,Mt,U,Z,A.state.lightProbeGridArray),At=st.getProgramCacheKey(vt),Dt=W.programs;W.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?U.environment:null,W.fog=U.fog;let Yt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;W.envMap=E.get(b.envMap||W.environment,Yt),W.envMapRotation=W.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Dt===void 0&&(b.addEventListener("dispose",fe),Dt=new Map,W.programs=Dt,W.programVariants=new Map);let ee=Dt.get(At);if(ee!==void 0){if(W.currentProgram===ee&&W.lightsStateVersion===Rt)return gf(b,vt),ee}else vt.uniforms=st.getUniforms(b),k!==null&&b.isNodeMaterial&&k.build(b,Z,vt),b.onBeforeCompile(vt,R),ee=st.acquireProgram(vt,At),Dt.set(At,ee),W.uniforms=vt.uniforms;let Pt=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pt.clippingPlanes=et.uniform),gf(b,vt),W.needsLights=ng(b),W.lightsStateVersion=Rt,W.needsLights&&(Pt.ambientLightColor.value=q.state.ambient,Pt.lightProbe.value=q.state.probe,Pt.sunLights.value=q.state.sun,Pt.sunLightShadows.value=q.state.sunShadow,Pt.directionalLights.value=q.state.directional,Pt.directionalLightShadows.value=q.state.directionalShadow,Pt.spotLights.value=q.state.spot,Pt.spotLightShadows.value=q.state.spotShadow,Pt.rectAreaLights.value=q.state.rectArea,Pt.ltc_1.value=q.state.rectAreaLTC1,Pt.ltc_2.value=q.state.rectAreaLTC2,Pt.pointLights.value=q.state.point,Pt.pointLightShadows.value=q.state.pointShadow,Pt.hemisphereLights.value=q.state.hemi,Pt.sunShadowMatrix.value=q.state.sunShadowMatrix,Pt.sunShadowCascade.value=q.state.sunShadowCascade,Pt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Pt.spotLightMatrix.value=q.state.spotLightMatrix,Pt.spotLightMap.value=q.state.spotLightMap,Pt.pointShadowMatrix.value=q.state.pointShadowMatrix),W.numLightProbeGrids=pf(A.state.lightProbeGridArray),W.currentProgram=ee,W.uniformsList=null,ee}function jm(b,U,Z,W,q){let Mt=Lt.get(b),Rt=Mt.currentProgram.id+","+W+","+q,vt=Mt.programVariants.get(Rt);return vt===void 0?(vt=Cr(b,U,Z),Mt.programVariants.set(Rt,vt)):(Mt.currentProgram=vt,Mt.uniformsList=null,Mt.outputColorSpace=W,Mt.toneMapping=q),vt}function mf(b){if(b.uniformsList===null){let U=b.currentProgram.getUniforms();b.uniformsList=br.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function gf(b,U){let Z=Lt.get(b);Z.outputColorSpace=U.outputColorSpace,Z.batching=U.batching,Z.batchingColor=U.batchingColor,Z.instancing=U.instancing,Z.instancingColor=U.instancingColor,Z.instancingMorph=U.instancingMorph,Z.skinning=U.skinning,Z.morphTargets=U.morphTargets,Z.morphNormals=U.morphNormals,Z.morphColors=U.morphColors,Z.morphTargetsCount=U.morphTargetsCount,Z.numClippingPlanes=U.numClippingPlanes,Z.numIntersection=U.numClipIntersection,Z.vertexAlphas=U.vertexAlphas,Z.vertexTangents=U.vertexTangents,Z.toneMapping=U.toneMapping}function tg(b,U,Z,W,q){U.isScene!==!0&&(U=Gt),Bt.resetTextureUnits();let Mt=U.fog,Rt=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?U.environment:null,vt=Y===null?R.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ie.workingColorSpace,At=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Dt=E.get(W.envMap||Rt,At),Yt=W.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,ee=!!Z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pt=!!Z.morphAttributes.position,ne=!!Z.morphAttributes.normal,Le=!!Z.morphAttributes.color,xe=si;W.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(xe=R.toneMapping);let me=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Ye=me!==void 0?me.length:0,It=Lt.get(W),en=A.state.lights;if(nt===!0&&(at===!0||b!==J)){let be=b===J&&W.id===V;et.setState(W,b,be)}let ce=!1,ss=!1;W.version===It.__version?It.needsLights&&It.lightsStateVersion!==en.state.version||q.isBatchedMesh&&It.batching===!1||!q.isBatchedMesh&&It.batching===!0||q.isBatchedMesh&&It.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&It.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&It.instancing===!1||!q.isInstancedMesh&&It.instancing===!0||q.isSkinnedMesh&&It.skinning===!1||!q.isSkinnedMesh&&It.skinning===!0||q.isInstancedMesh&&It.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&It.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&It.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&It.instancingMorph===!1&&q.morphTexture!==null||It.envMap!==Dt||W.fog===!0&&It.fog!==Mt||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==et.numPlanes||It.numIntersection!==et.numIntersection)||It.vertexAlphas!==Yt||It.vertexTangents!==ee||It.morphTargets!==Pt||It.morphNormals!==ne||It.morphColors!==Le||It.morphTargetsCount!==Ye||It.numLightProbeGrids!==pf(A.state.lightProbeGridArray)?ce=!0:(It.outputColorSpace!==vt||It.toneMapping!==xe)&&(ss=!0):(ce=!0,It.__version=W.version);let $e=It.currentProgram;(ce===!0||ss===!0)&&($e=ss===!0?jm(W,U,q,vt,xe):Cr(W,U,q),k&&W.isNodeMaterial&&k.onUpdateProgram(W,$e,It));let Ya=!1,Ii=!1,rs=!1,ae=$e.getUniforms(),We=It.uniforms;if(dt.useProgram($e.program)&&(Ya=!0,Ii=!0,rs=!0),W.id!==V&&(V=W.id,Ii=!0),Ya||J!==b){dt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ae.setValue(D,"projectionMatrix",b.projectionMatrix),ae.setValue(D,"viewMatrix",b.matrixWorldInverse);let ze=ae.map.cameraPosition;ze!==void 0&&ze.setValue(D,Et.setFromMatrixPosition(b.matrixWorld)),re.logarithmicDepthBuffer&&ae.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ae.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),J!==b&&(J=b,Ii=!0,rs=!0)}if(It.needsLights&&(en.state.sunShadowMap.length>0&&ae.setValue(D,"sunShadowMap",en.state.sunShadowMap,Bt),en.state.directionalShadowMap.length>0&&ae.setValue(D,"directionalShadowMap",en.state.directionalShadowMap,Bt),en.state.spotShadowMap.length>0&&ae.setValue(D,"spotShadowMap",en.state.spotShadowMap,Bt),en.state.pointShadowMap.length>0&&ae.setValue(D,"pointShadowMap",en.state.pointShadowMap,Bt)),q.isSkinnedMesh){ae.setOptional(D,q,"bindMatrix"),ae.setOptional(D,q,"bindMatrixInverse");let be=q.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),ae.setValue(D,"boneTexture",be.boneTexture,Bt))}q.isBatchedMesh&&(ae.setOptional(D,q,"batchingTexture"),ae.setValue(D,"batchingTexture",q._matricesTexture,Bt),ae.setOptional(D,q,"batchingIdTexture"),ae.setValue(D,"batchingIdTexture",q._indirectTexture,Bt),ae.setOptional(D,q,"batchingColorTexture"),q._colorsTexture!==null&&ae.setValue(D,"batchingColorTexture",q._colorsTexture,Bt));let Fn=Z.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&it.update(q,Z,$e),(Ii||It.receiveShadow!==q.receiveShadow)&&(It.receiveShadow=q.receiveShadow,ae.setValue(D,"receiveShadow",q.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&U.environment!==null&&(We.envMapIntensity.value=U.environmentIntensity),We.dfgLUT!==void 0&&(We.dfgLUT.value=zS()),Ii){if(ae.setValue(D,"toneMappingExposure",R.toneMappingExposure),It.needsLights&&eg(We,rs),Mt&&W.fog===!0&&mt.refreshFogUniforms(We,Mt),mt.refreshMaterialUniforms(We,W,ut,Ct,A.state.transmissionRenderTarget[b.id]),It.needsLights&&It.numLightProbeGrids>0){let be=y,ze=0;for(let li of A.state.lightProbeGridArray)li.texture!==null&&(be.textures[ze]=li.texture,be.min[ze]=li.boundingBox.min,be.max[ze]=li.boundingBox.max,be.resolution[ze]=li.resolution,ze++);for(let li in be)be[li].length=ze;We.probesSH.value=be.textures,We.probesMin.value=be.min,We.probesMax.value=be.max,We.probesResolution.value=be.resolution}br.upload(D,mf(It),We,Bt)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(br.upload(D,mf(It),We,Bt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ae.setValue(D,"center",q.center),ae.setValue(D,"modelViewMatrix",q.modelViewMatrix),ae.setValue(D,"normalMatrix",q.normalMatrix),ae.setValue(D,"modelMatrix",q.matrixWorld),W.uniformsGroups!==void 0){let be=W.uniformsGroups;for(let ze=0,li=be.length;ze<li;ze++){let xf=be[ze];Ut.update(xf,$e),Ut.bind(xf,$e)}}return $e}function eg(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.sunLights.needsUpdate=U,b.sunLightShadows.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function ng(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(b,U,Z){let W=Lt.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Lt.get(b.texture).__webglTexture=U,Lt.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Z,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,U){let Z=Lt.get(b);Z.__webglFramebuffer=U,Z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,Z=0){Y=b,G=U,N=Z;let W=null,q=!1,Mt=!1;if(b){let vt=Lt.get(b);if(vt.__useDefaultFramebuffer!==void 0){dt.bindFramebuffer(D.FRAMEBUFFER,vt.__webglFramebuffer),K.copy(b.viewport),$.copy(b.scissor),ht=b.scissorTest,dt.viewport(K),dt.scissor($),dt.setScissorTest(ht),V=-1;return}else if(vt.__webglFramebuffer===void 0)Bt.setupRenderTarget(b);else if(vt.__hasExternalTextures)Bt.rebindTextures(b,Lt.get(b.texture).__webglTexture,Lt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Yt=b.depthTexture;if(vt.__boundDepthTexture!==Yt){if(Yt!==null&&Lt.has(Yt)&&(b.width!==Yt.image.width||b.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(b)}}let At=b.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(Mt=!0);let Dt=Lt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Dt[U])?W=Dt[U][Z]:W=Dt[U],q=!0):b.samples>0&&Bt.useMultisampledRTT(b)===!1?W=Lt.get(b).__webglMultisampledFramebuffer:Array.isArray(Dt)?W=Dt[Z]:W=Dt,K.copy(b.viewport),$.copy(b.scissor),ht=b.scissorTest}else K.copy(Ft).multiplyScalar(ut).floor(),$.copy(qt).multiplyScalar(ut).floor(),ht=Jt;if(Z!==0&&(W=O),dt.bindFramebuffer(D.FRAMEBUFFER,W)&&dt.drawBuffers(b,W),dt.viewport(K),dt.scissor($),dt.setScissorTest(ht),q){let vt=Lt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,vt.__webglTexture,Z)}else if(Mt){let vt=U;for(let At=0;At<b.textures.length;At++){let Dt=Lt.get(b.textures[At]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+At,Dt.__webglTexture,Z,vt)}}else if(b!==null&&Z!==0){let vt=Lt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,vt.__webglTexture,Z)}V=-1};function _f(b){let U=Lt.get(b);return(U.__readFormat!==b.format||U.__readType!==b.type)&&(U.__readFormat=b.format,U.__readType=b.type,U.__formatReadable=re.textureFormatReadable(b.format),U.__typeReadable=re.textureTypeReadable(b.type)),U}this.readRenderTargetPixels=function(b,U,Z,W,q,Mt,Rt,vt=0){if(!(b&&b.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=Lt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(At=At[Rt],Array.isArray(At)&&(At=At[0])),At){dt.bindFramebuffer(D.FRAMEBUFFER,At);try{let Dt=b.textures[vt],Yt=Dt.format,ee=Dt.type;b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+vt);let Pt=_f(Dt);if(Pt.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pt.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-W&&Z>=0&&Z<=b.height-q&&D.readPixels(U,Z,W,q,ft.convert(Yt),ft.convert(ee),Mt)}finally{let Dt=Y!==null?Lt.get(Y).__webglFramebuffer:null;dt.bindFramebuffer(D.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(b,U,Z,W,q,Mt,Rt,vt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=Lt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(At=At[Rt],Array.isArray(At)&&(At=At[0])),At)if(U>=0&&U<=b.width-W&&Z>=0&&Z<=b.height-q){dt.bindFramebuffer(D.FRAMEBUFFER,At);let Dt=b.textures[vt],Yt=Dt.format,ee=Dt.type;b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+vt);let Pt=_f(Dt);if(Pt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ne=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ne),D.bufferData(D.PIXEL_PACK_BUFFER,Mt.byteLength,D.STREAM_READ),D.readPixels(U,Z,W,q,ft.convert(Yt),ft.convert(ee),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Le=Y!==null?Lt.get(Y).__webglFramebuffer:null;dt.bindFramebuffer(D.FRAMEBUFFER,Le);let xe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Gp(D,xe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ne),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Mt),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(ne),D.deleteSync(xe),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,U=null,Z=0){let W=Math.pow(2,-Z),q=Math.floor(b.image.width*W),Mt=Math.floor(b.image.height*W),Rt=U!==null?U.x:0,vt=U!==null?U.y:0;Bt.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,Z,0,0,Rt,vt,q,Mt),dt.unbindTexture()},this.copyTextureToTexture=function(b,U,Z=null,W=null,q=0,Mt=0){let Rt,vt,At,Dt,Yt,ee,Pt,ne,Le,xe=b.isCompressedTexture?b.mipmaps[Mt]:b.image;if(Z!==null)Rt=Z.max.x-Z.min.x,vt=Z.max.y-Z.min.y,At=Z.isBox3?Z.max.z-Z.min.z:1,Dt=Z.min.x,Yt=Z.min.y,ee=Z.isBox3?Z.min.z:0;else{let ae=Math.pow(2,-q);Rt=Math.floor(xe.width*ae),vt=Math.floor(xe.height*ae),b.isDataArrayTexture?At=xe.depth:b.isData3DTexture?At=Math.floor(xe.depth*ae):At=1,Dt=0,Yt=0,ee=0}W!==null?(Pt=W.x,ne=W.y,Le=W.z):(Pt=0,ne=0,Le=0);let me=ft.convert(U.format),Ye=ft.convert(U.type),It;U.isData3DTexture?(Bt.setTexture3D(U,0),It=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Bt.setTexture2DArray(U,0),It=D.TEXTURE_2D_ARRAY):(Bt.setTexture2D(U,0),It=D.TEXTURE_2D),dt.activeTexture(D.TEXTURE0),dt.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),dt.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),dt.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);let en=dt.getParameter(D.UNPACK_ROW_LENGTH),ce=dt.getParameter(D.UNPACK_IMAGE_HEIGHT),ss=dt.getParameter(D.UNPACK_SKIP_PIXELS),$e=dt.getParameter(D.UNPACK_SKIP_ROWS),Ya=dt.getParameter(D.UNPACK_SKIP_IMAGES);dt.pixelStorei(D.UNPACK_ROW_LENGTH,xe.width),dt.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xe.height),dt.pixelStorei(D.UNPACK_SKIP_PIXELS,Dt),dt.pixelStorei(D.UNPACK_SKIP_ROWS,Yt),dt.pixelStorei(D.UNPACK_SKIP_IMAGES,ee);let Ii=b.isDataArrayTexture||b.isData3DTexture,rs=U.isDataArrayTexture||U.isData3DTexture;if(b.isDepthTexture){let ae=Lt.get(b),We=Lt.get(U),Fn=Lt.get(ae.__renderTarget),be=Lt.get(We.__renderTarget);dt.bindFramebuffer(D.READ_FRAMEBUFFER,Fn.__webglFramebuffer),dt.bindFramebuffer(D.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ze=0;ze<At;ze++)Ii&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Lt.get(b).__webglTexture,q,ee+ze),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Lt.get(U).__webglTexture,Mt,Le+ze)),D.blitFramebuffer(Dt,Yt,Dt+Rt,Yt+vt,Pt,ne,Pt+Rt,ne+vt,D.DEPTH_BUFFER_BIT,D.NEAREST);dt.bindFramebuffer(D.READ_FRAMEBUFFER,null),dt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(q!==0||b.isRenderTargetTexture||Lt.has(b)){let ae=Lt.get(b),We=Lt.get(U);dt.bindFramebuffer(D.READ_FRAMEBUFFER,C),dt.bindFramebuffer(D.DRAW_FRAMEBUFFER,F);for(let Fn=0;Fn<At;Fn++)Ii?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ae.__webglTexture,q,ee+Fn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ae.__webglTexture,q),rs?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,We.__webglTexture,Mt,Le+Fn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,We.__webglTexture,Mt),q!==0?D.blitFramebuffer(Dt,Yt,Dt+Rt,Yt+vt,Pt,ne,Pt+Rt,ne+vt,D.COLOR_BUFFER_BIT,D.NEAREST):rs?D.copyTexSubImage3D(It,Mt,Pt,ne,Le+Fn,Dt,Yt,Rt,vt):D.copyTexSubImage2D(It,Mt,Pt,ne,Dt,Yt,Rt,vt);dt.bindFramebuffer(D.READ_FRAMEBUFFER,null),dt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else rs?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(It,Mt,Pt,ne,Le,Rt,vt,At,me,Ye,xe.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(It,Mt,Pt,ne,Le,Rt,vt,At,me,xe.data):D.texSubImage3D(It,Mt,Pt,ne,Le,Rt,vt,At,me,Ye,xe):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Mt,Pt,ne,Rt,vt,me,Ye,xe.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Mt,Pt,ne,xe.width,xe.height,me,xe.data):D.texSubImage2D(D.TEXTURE_2D,Mt,Pt,ne,Rt,vt,me,Ye,xe);dt.pixelStorei(D.UNPACK_ROW_LENGTH,en),dt.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ce),dt.pixelStorei(D.UNPACK_SKIP_PIXELS,ss),dt.pixelStorei(D.UNPACK_SKIP_ROWS,$e),dt.pixelStorei(D.UNPACK_SKIP_IMAGES,Ya),Mt===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&D.generateMipmap(It),dt.unbindTexture()},this.initRenderTarget=function(b){Lt.get(b).__webglFramebuffer===void 0&&Bt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Bt.setTextureCube(b,0):b.isData3DTexture?Bt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Bt.setTexture2DArray(b,0):Bt.setTexture2D(b,0),dt.unbindTexture()},this.resetState=function(){G=0,N=0,Y=null,dt.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}};var qn={ink:"#07090d",bg:"#14161b",text:"#eef0f3",muted:"#9aa1ad",amber:"#f5a524",gold:"#ffcf7a",field:"#5fb37c",sky:"#5fb3ff",blue:"#4ea1ff",coral:"#ff6b5e",origin:"#ffd28a",dest:"#9fd1ff"},Qu=[["#f5a524","#3f9b6a"],["#f5a524","#ffcf7a"],["#e9b85a","#3d7fd9"],["#d99a4a","#4f9fe8"],["#2f9fb0","#5f6ee8"],["#c58a3a","#3f9b8a"],["#f5a524","#5fb37c"]],ka=["#3b2a12","#8a5a17","#d98e1f","#f5a524","#ffd98a"],Ei={lo:"#4ea1ff",mid:"#3a404c",hi:"#f5a524",na:"#2f343e"},Pm=["#2b4a8f","#2f86c9","#2fb3a8","#9cc56a","#f5a524"],es=s=>{let t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},Ku=s=>(s/=255,s<=.04045?s/12.92:((s+.055)/1.055)**2.4),kS=s=>255*(s<=.0031308?s*12.92:1.055*s**(1/2.4)-.055);function GS(s,t,e){let n=es(s),i=es(t);return n.map((r,a)=>Math.round(kS(Ku(r)+(Ku(i[a])-Ku(r))*e)))}function Ga(s,t){t=Math.min(1,Math.max(0,t))*(s.length-1);let e=Math.min(s.length-2,Math.floor(t));return GS(s[e],s[e+1],t-e)}var _n=([s,t,e],n=1)=>n===1?`rgb(${s},${t},${e})`:`rgba(${s},${t},${e},${n})`;var xn=1920,Ci=1080,VS=10,Is=.06,HS=1.2,oi=s=>new $t(Array.isArray(s)?`rgb(${s.join(",")})`:s),Im=s=>s<=0?0:s>=1?1:s*s*(3-2*s);function WS(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function ju(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function XS(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}var qS=`
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
}`,YS=`
uniform float uAlpha; varying vec3 vColor; varying float vA;
void main(){
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r); a *= a;
  gl_FragColor = vec4(vColor, a * vA * uAlpha);
  #include <colorspace_fragment>
}`;function Lm(s,t){let e=new yc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.setClearColor(0,0),e.toneMapping=Ca,e.toneMappingExposure=1,e.outputColorSpace=rn,e.shadowMap.enabled=!0,e.shadowMap.type=ws;let n=new aa,i=new an(30,xn/Ci,1,200),r=VS/t.Q,a=(B,Q)=>[B*r,Q*r];n.add(new ba(14674175,1709064,.9)),n.add(new Aa(16777215,.18));let o=new gr(16773596,2.6);o.position.set(-7,-11,17),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:50}),o.shadow.bias=-4e-4,n.add(o);let l=new gr(9419519,.9);l.position.set(9,12,6),n.add(l);let c=new An(new Ts(60,60),new Ma({opacity:.42,transparent:!0}));c.receiveShadow=!0,n.add(c);let h=Math.max(...Object.values(t.land.v).filter(Boolean)),f={cap:oi("#1f242d"),side:oi("#14171d")},u=new vi;n.add(u);let d=t.map.sigun.map(B=>{let Q=B.rings.map(([dt,...he])=>{let Lt=E=>E.slice(0,-1).map(([H,lt])=>new St(...a(H,lt))),Bt=new fr(Lt(dt));return he.forEach(E=>Bt.holes.push(new Ss(Lt(E)))),Bt}),nt=new ya(Q,{depth:1,bevelEnabled:!1,curveSegments:1}),at=t.land.v[B.key],rt=at?Math.sqrt(at/h):0,Et=oi(at?Ga(ka,.12+.88*rt):"#2a2620"),bt=t.rice.dev[B.key],Gt=bt==null?oi(Ei.na):oi(Ei.mid).lerp(oi(bt<0?Ei.lo:Ei.hi),Math.min(1,Math.abs(bt)/.05)**.8),Ht=new pr({roughness:.58,metalness:.04,transparent:!0}),kt=new pr({roughness:.75,metalness:0,transparent:!0}),D=new An(nt,[Ht,kt]);D.castShadow=D.receiveShadow=!0,D.scale.z=Is,u.add(D);let[de,Xt]=a(...B.c),re=Math.min(1,Math.max(0,(de+4)/9*.45+(Xt+5)/10*.55));return{key:B.key,mesh:D,cap:Ht,side:kt,h:Is+(HS-Is)*rt,landCol:Et,riceCol:Gt,cx:de,cy:Xt,delay:re,land:at,rings:B.rings}}),m=new Map(d.map(B=>[B.key,B])),_=(B,Q)=>{let nt=[];B.forEach(rt=>{for(let Et=1;Et<rt.length;Et++)nt.push(...a(...rt[Et-1]),Q,...a(...rt[Et]),Q)});let at=new mn;return at.setAttribute("position",new Ce(nt,3)),at},p=new Ms({color:oi("#cfd6e2"),transparent:!0,opacity:0,depthWrite:!1}),g=new Ms({color:oi("#8d96a6"),transparent:!0,opacity:0,depthWrite:!1}),v=new cr(_(t.map.lineSido,0),p),T=new cr(_(t.map.lineSigun,0),g);v.renderOrder=T.renderOrder=2,u.add(v,T);let y=9e3,w=2400,A=XS(20261110),x=[],S=[],P=[],R=[],L=[],k=d.map(B=>(B.land||0)/Math.max(1e-6,B.rings.reduce((Q,nt)=>Q+ju(nt[0]),0))),O=[...k].sort((B,Q)=>B-Q),C=B=>O.indexOf(B)/(O.length-1),F=d.map(B=>B.rings.reduce((Q,nt)=>Q+ju(nt[0]),0)**.85),G=F.reduce((B,Q)=>B+Q,0),N=(B,Q,nt)=>{x.push(B,Q,.08);let at=9+A()*16,rt=A()*Math.PI*2,Et=(A()-.5)*Math.PI*.7;S.push(at*Math.cos(rt)*Math.cos(Et)*1.4,at*Math.sin(rt)*Math.cos(Et),4+at*Math.sin(Et)*.6);let bt=Math.hypot(B,Q)/6;P.push(Math.min(1,A()*.65+bt*.35)),R.push(A()),L.push(nt.r,nt.g,nt.b)};d.forEach((B,Q)=>{let nt=Math.max(6,Math.round((y-w)*F[Q]/G)),at=oi(Ga(ka,.35+.65*C(k[Q]))),rt=B.rings.map(Gt=>Gt[0]),Et=rt.map(ju),bt=Et.reduce((Gt,Ht)=>Gt+Ht,0);for(let Gt=0;Gt<nt;Gt++){let Ht=A()*bt,kt=0;for(;Ht>Et[kt]&&kt<rt.length-1;)Ht-=Et[kt++];let D=rt[kt],de=1/0,Xt=-1/0,re=1/0,dt=-1/0;D.forEach(([he,Lt])=>{de=Math.min(de,he),Xt=Math.max(Xt,he),re=Math.min(re,Lt),dt=Math.max(dt,Lt)});for(let he=0;he<40;he++){let Lt=de+A()*(Xt-de),Bt=re+A()*(dt-re);if(WS(Lt,Bt,D)){N(...a(Lt,Bt),at);break}}}});let Y=oi("#ffe9c2"),V=t.map.lineSido,J=V.map(B=>B.reduce((Q,nt,at)=>at?Q+Math.hypot(nt[0]-B[at-1][0],nt[1]-B[at-1][1]):0,0)),K=J.reduce((B,Q)=>B+Q,0);for(let B=0;B<w;B++){let Q=A()*K,nt=0;for(;Q>J[nt]&&nt<V.length-1;)Q-=J[nt++];let at=V[nt];for(let rt=1;rt<at.length;rt++){let Et=Math.hypot(at[rt][0]-at[rt-1][0],at[rt][1]-at[rt-1][1]);if(Q<=Et||rt===at.length-1){let bt=Et?Math.min(1,Q/Et):0;N(...a(at[rt-1][0]+(at[rt][0]-at[rt-1][0])*bt,at[rt-1][1]+(at[rt][1]-at[rt-1][1])*bt),Y);break}Q-=Et}}let $=new mn;$.setAttribute("position",new Ce(x,3)),$.setAttribute("aStart",new Ce(S,3)),$.setAttribute("aDelay",new Ce(P,1)),$.setAttribute("aSeed",new Ce(R,1)),$.setAttribute("aColor",new Ce(L,3));let ht=new Nn({vertexShader:qS,fragmentShader:YS,transparent:!0,depthWrite:!1,blending:Ea,uniforms:{uMorph:{value:0},uTime:{value:0},uSize:{value:92},uScale:{value:1},uAlpha:{value:1}}}),X=new ca($,ht);X.frustumCulled=!1,X.renderOrder=3,n.add(X);let ot=new $t,pt=new $t,Ct=new z,ut=xn,Nt=Ci;function le(B,Q){ut=B,Nt=Q,e.setSize(B,Q,!1),ht.uniforms.uScale.value=Q/Ci}function Ft(B,Q){let nt=B.tilt*.86,at=B.orbit,rt=B.camDist,Et=B.camX,bt=-.4*B.tilt+B.camY;i.position.set(Et+rt*Math.sin(nt)*Math.sin(at),bt-rt*Math.sin(nt)*Math.cos(at),rt*Math.cos(nt)),i.up.set(0,1,0),i.lookAt(Et,bt,0),i.setViewOffset(xn,Ci,-B.mapShift,-B.mapLift,xn,Ci),i.updateMatrixWorld();let Gt=B.mapAlpha>.001;u.visible=Gt,d.forEach(kt=>{let D=Im((B.rise-kt.delay*.5)/.5);kt.mesh.scale.z=Is+(kt.h-Is)*D,ot.lerpColors(kt.landCol,kt.riceCol,B.riceColor).lerp(f.cap,B.mapDim),kt.cap.color.copy(ot),kt.cap.emissive.copy(ot).multiplyScalar(.16*(1-B.mapDim)),pt.copy(ot).multiplyScalar(.52).lerp(f.side,B.mapDim),kt.side.color.copy(pt),kt.cap.opacity=kt.side.opacity=B.mapAlpha});let Ht=1-Im(B.rise*1.6);v.position.z=Is+.004,T.position.z=Is+.003,p.opacity=B.mapAlpha*Ht*(.28+.4*B.mapDim),g.opacity=B.mapAlpha*Ht*(.1+.12*B.mapDim),c.material.opacity=.42*B.mapAlpha,ht.uniforms.uMorph.value=B.morph,ht.uniforms.uTime.value=Q,ht.uniforms.uAlpha.value=B.pAlpha,X.visible=B.pAlpha>.001,s.style.opacity=B.glAlpha,B.glAlpha>.001&&e.render(n,i)}function qt(B,Q,nt){return Ct.set(B,Q,nt).project(i),[(Ct.x+1)*.5*xn,(1-Ct.y)*.5*Ci]}return{render:Ft,resize:le,project:qt,top:B=>{let Q=m.get(B);return Q?[Q.cx,Q.cy,Q.mesh.scale.z]:null},units:d,byKey:m,renderer:e}}var $S=s=>s<0?0:s>1?1:s,ZS=s=>(s=$S(s),s*s*(3-2*s)),tf=s=>s-Math.floor(s),bc='"Pretendard Variable", Pretendard, system-ui, sans-serif';function Dm(s,t,e){let n=s.getContext("2d"),i=1;function r(O,C){s.width=O,s.height=C,i=O/xn}let a=t.flows.top.slice(0,50).map(([O,C,F],G)=>({o:O,d:C,v:F,i:G,ph:tf(G*.618)})),o=a[0].v,l=es(qn.origin),c=es(qn.dest),h=(O,C,F,G)=>{let N=1-G;return[N*N*O[0]+2*N*G*C[0]+G*G*F[0],N*N*O[1]+2*N*G*C[1]+G*G*F[1]]},f=O=>l.map((C,F)=>Math.round(C+(c[F]-C)*O));function u(O,C){let F=O.flowAlpha;if(F<=.002||O.flows<=.001)return;n.globalCompositeOperation="lighter";let G=new Map;for(let N=a.length-1;N>=0;N--){let Y=a[N],V=e.top(Y.o),J=e.top(Y.d);if(!V||!J)continue;let K=e.project(V[0],V[1],V[2]),$=e.project(J[0],J[1],J[2]),ht=$[0]-K[0],X=$[1]-K[1],ot=Math.hypot(ht,X)||1,pt=[(K[0]+$[0])/2-X*.22,(K[1]+$[1])/2+ht*.22-ot*.18],Ct=ZS((O.flows-N/a.length*.55)/.45);if(Ct<=0)continue;let ut=Math.sqrt(Y.v/o),Nt=N<3,le=n.createLinearGradient(K[0],K[1],$[0],$[1]);le.addColorStop(0,_n(l,1)),le.addColorStop(1,_n(c,1));let Ft=Math.max(8,Math.round(ot/10)),qt=()=>{n.beginPath(),n.moveTo(K[0],K[1]);for(let nt=1;nt<=Ft*Ct;nt++){let at=h(K,pt,$,nt/Ft);n.lineTo(at[0],at[1])}let Q=h(K,pt,$,Ct);n.lineTo(Q[0],Q[1])};n.lineCap="round",n.strokeStyle=le,n.globalAlpha=F*(.035+.08*ut)*(Nt?1.5:1),n.lineWidth=3+11*ut,qt(),n.stroke(),n.globalAlpha=F*(.22+.5*ut)*(Nt?1.2:1),n.lineWidth=.7+2.8*ut,qt(),n.stroke();let Jt=Nt?4:ut>.4?3:2,B=.42/(.5+ot/520);for(let Q=0;Q<Jt;Q++){let nt=tf(C*B+Y.ph+Q/Jt);if(nt>Ct)continue;let at=h(K,pt,$,nt),rt=1.6+3.2*ut,Et=f(nt),bt=n.createRadialGradient(at[0],at[1],0,at[0],at[1],rt*3.2);bt.addColorStop(0,_n([255,255,255],1)),bt.addColorStop(.25,_n(Et,.9)),bt.addColorStop(1,_n(Et,0)),n.globalAlpha=F*(.35+.4*Math.sin(nt*Math.PI)),n.fillStyle=bt,n.beginPath(),n.arc(at[0],at[1],rt*3.2,0,Math.PI*2),n.fill()}n.globalAlpha=F*Ct*.9,n.fillStyle=_n(l,1),n.beginPath(),n.arc(K[0],K[1],1.6+2.2*ut,0,Math.PI*2),n.fill(),Ct>.98&&G.set(Y.d,{p:$,v:(G.get(Y.d)?.v||0)+Y.v})}G.forEach(({p:N,v:Y})=>{let J=4+11*Math.sqrt(Y/o),K=tf(C*.6+N[0]*.01);n.globalAlpha=F*.45;let $=n.createRadialGradient(N[0],N[1],0,N[0],N[1],J*1.8);$.addColorStop(0,_n(c,.9)),$.addColorStop(1,_n(c,0)),n.fillStyle=$,n.beginPath(),n.arc(N[0],N[1],J*1.8,0,Math.PI*2),n.fill(),n.globalAlpha=F*(1-K)*.7,n.strokeStyle=_n(c,1),n.lineWidth=1.2,n.beginPath(),n.arc(N[0],N[1],J+K*22,0,Math.PI*2),n.stroke()}),n.globalAlpha=1,n.globalCompositeOperation="source-over"}let d=t.power.k,m=t.power.months,_=d.length,p=Math.max(...d),g=+m[0].slice(5,7)-1,v=1250,T=548,y=36,w=400,A=O=>y+(w-y)*(O/p),x=O=>-Math.PI/2+(g+O)/12*Math.PI*2,S=O=>{let C=Math.floor(O),F=O-C,G=F&&C+1<_?d[C]+(d[C+1]-d[C])*F:d[C],N=A(G),Y=x(O);return[v+N*Math.cos(Y),T+N*Math.sin(Y)]},P=O=>Ga(Pm,O/(_-1));function R(O){let C=O.powerAlpha;if(C<=.002)return;let F=O.spiral*(_-1);n.save(),n.globalAlpha=C,n.setLineDash([2,6]),n.lineWidth=1,[1e6,2e6].forEach(Y=>{n.strokeStyle="rgba(220,228,240,0.16)",n.beginPath(),n.arc(v,T,A(Y),0,Math.PI*2),n.stroke(),n.fillStyle="rgba(220,228,240,0.45)",n.font=`500 15px ${bc}`,n.textAlign="left",n.fillText(`${Y/1e4}\uB9CC MWh`,v+8,T-A(Y)-6)}),n.setLineDash([]),n.font=`600 17px ${bc}`,n.textAlign="center",n.textBaseline="middle";for(let Y=0;Y<12;Y++){let V=-Math.PI/2+Y/12*Math.PI*2,J=w+34;n.fillStyle=Y===0||Y===7?"rgba(255,220,160,0.85)":"rgba(200,208,220,0.45)",n.fillText(`${Y+1}\uC6D4`,v+J*Math.cos(V),T+J*Math.sin(V))}n.lineCap="round",n.lineJoin="round",n.globalCompositeOperation="lighter";let G=6;for(let Y=1;Y<=Math.ceil(F);Y++){let V=Math.min(Y,F);if(V<=Y-1)break;let J=(F-Y)/12,K=.32+.68*Math.exp(-J*.55),$=P(Y);n.strokeStyle=_n($,1),n.beginPath();let[ht,X]=S(Y-1);n.moveTo(ht,X);for(let ot=1;ot<=G;ot++){let pt=Y-1+(V-(Y-1))*ot/G,[Ct,ut]=S(pt);n.lineTo(Ct,ut)}n.globalAlpha=C*K*.22,n.lineWidth=9,n.stroke(),n.globalAlpha=C*K,n.lineWidth=2.2,n.stroke()}if(F>0){let[Y,V]=S(F),J=P(F),K=n.createRadialGradient(Y,V,0,Y,V,34);K.addColorStop(0,"rgba(255,255,255,0.95)"),K.addColorStop(.2,_n(J,.8)),K.addColorStop(1,_n(J,0)),n.globalAlpha=C,n.fillStyle=K,n.beginPath(),n.arc(Y,V,34,0,Math.PI*2),n.fill()}n.globalCompositeOperation="source-over";let N=Math.min(_-1,Math.floor(F+.001));n.globalAlpha=C,n.fillStyle=_n(P(F),1),n.font=`800 64px ${bc}`,n.fillText(m[N].slice(0,4),v,T-6),n.fillStyle="rgba(220,228,240,0.6)",n.font=`500 16px ${bc}`,n.fillText(`${+m[N].slice(5,7)}\uC6D4 \xB7 ${Math.round(d[N]/1e4)}\uB9CC MWh`,v,T+36),n.restore()}let L=!0;function k(O,C){let F=O.flowAlpha>.002&&O.flows>.001||O.powerAlpha>.002;F!==L&&(L=F,s.style.visibility=F?"visible":"hidden"),F&&(n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,s.width,s.height),n.setTransform(i,0,0,i,0,0),u(O,C),R(O))}return{render:k,resize:r}}var JS="http://www.w3.org/2000/svg",ve=(s,t={},e)=>{let n=document.createElementNS(JS,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},KS=s=>s<0?0:s>1?1:s,ns=s=>(s=KS(s),s*s*(3-2*s));function Nm(s,t){let e=t.rice,n=150,i=700,r=770,a=920,o=725,l=950,c=e.hist.filter(([,$])=>$!=null),h=c.flatMap(([,$,ht])=>[$,ht]).concat(e.fc.flatMap($=>[$.lo,$.hi]),[e.stat,e.krei].filter(Boolean)),f=Math.floor((Math.min(...h)-6)/10)*10,u=Math.ceil((Math.max(...h)+4)/10)*10,d=c[0][0],m=c.at(-1)[0],_=$=>n+($-d)/(m-d)*(i-n),p=$=>r+$/(e.fc.length-1)*(a-r),g=$=>l-($-f)/(u-f)*(l-o),v=ve("g",{class:"rc",opacity:0},s),T=ve("defs",{},s),y=ve("linearGradient",{id:"rcArea",x1:0,y1:0,x2:0,y2:1},T);ve("stop",{offset:0,"stop-color":qn.gold,"stop-opacity":.22},y),ve("stop",{offset:1,"stop-color":qn.gold,"stop-opacity":0},y);let w=ve("g",{class:"rc-grid"},v);for(let $=f;$<=u;$+=20)$!==f&&(ve("line",{x1:n,x2:a+10,y1:g($),y2:g($)},w),ve("text",{x:n-14,y:g($)+5,"text-anchor":"end"},w).textContent=$);[d,2015,2020,m].forEach($=>{ve("text",{x:_($),y:l+30,"text-anchor":"middle"},w).textContent=$}),ve("text",{x:n-14,y:o-22,"text-anchor":"end",class:"rc-unit"},w).textContent="kg/10a";let A=$=>$.map(([ht,X],ot)=>`${ot?"L":"M"}${ht.toFixed(1)},${X.toFixed(1)}`).join(""),x=c.filter(([,,$])=>$).map(([$,,ht])=>[_($),g(ht)]),S=c.map(([$,ht])=>[_($),g(ht)]),P=ve("path",{d:`${A(S)}L${_(m)},${l}L${_(d)},${l}Z`,fill:"url(#rcArea)",opacity:0},v),R=ve("path",{d:A(x),class:"rc-norm"},v),L=ve("path",{d:A(S),class:"rc-line"},v),k=S.map(([$,ht])=>ve("circle",{cx:$,cy:ht,r:4.2,class:"rc-dot",opacity:0},v)),O=ve("g",{class:"rc-fc"},v);ve("rect",{x:r-30,y:o-30,width:a-r+60,height:l-o+44,rx:14,class:"rc-fcbox"},O),ve("text",{x:(r+a)/2,y:l+30,"text-anchor":"middle",class:"rc-fclab"},O).textContent=`${e.year} \uC608\uCE21 ${e.fc.length}\uBC88`;let C=[[e.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98",qn.sky],[e.krei,"KREI",qn.field]].filter(([$])=>$!=null).map(([$,ht,X],ot)=>{let pt=ve("g",{opacity:0},O);return ve("line",{x1:r-18,x2:a+18,y1:g($),y2:g($),stroke:X,"stroke-width":2,"stroke-dasharray":"5 4"},pt),ve("text",{x:a+26,y:g($)+(ot?14:-4),fill:X,class:"rc-ref"},pt).textContent=`${ht} ${$}`,pt}),F=ve("path",{d:A(e.fc.map(($,ht)=>[p(ht),g($.y)])),class:"rc-fcline"},O),G=e.fc.map(($,ht)=>{let X=ve("g",{opacity:0},O);return ve("line",{x1:p(ht),x2:p(ht),y1:g($.lo),y2:g($.hi),class:"rc-wh"},X),ve("circle",{cx:p(ht),cy:g($.y),r:ht===e.fc.length-1?7:5,class:ht===e.fc.length-1?"rc-fcdot now":"rc-fcdot"},X),X}),N=$=>$.replace(/(\d+)월 (\d+)일/,"$1/$2");ve("text",{x:p(0),y:o-42,"text-anchor":"middle",class:"rc-fcd"},O).textContent=N(e.fc[0].lab),ve("text",{x:p(e.fc.length-1),y:o-42,"text-anchor":"middle",class:"rc-fcd"},O).textContent=N(e.fc.at(-1).lab);let Y=0,V=0;function J(){Y=L.getTotalLength(),V=F.getTotalLength(),L.style.strokeDasharray=`${Y} ${Y}`,F.style.strokeDasharray=`${V} ${V}`}function K($){if(Y||J(),v.setAttribute("opacity",$.riceAlpha),$.riceAlpha<=.002)return;let ht=ns($.riceLine);L.style.strokeDashoffset=Y*(1-ht),R.style.opacity=.9*ns($.riceLine*1.5),P.setAttribute("opacity",ns(($.riceLine-.6)/.4)),k.forEach((ot,pt)=>ot.setAttribute("opacity",ns((ht-pt/k.length)*8)));let X=$.riceFc;O.setAttribute("opacity",ns(X*4)),G.forEach((ot,pt)=>ot.setAttribute("opacity",ns((X-pt/G.length*.7)/.3))),F.style.strokeDashoffset=V*(1-ns(X/.95)),C.forEach((ot,pt)=>ot.setAttribute("opacity",ns((X-.75-pt*.08)/.15)))}return{render:K}}var He=window.INTRO,Oe=(s,t=document)=>t.querySelector(s),Ha=Oe("#stage"),Ec=Oe("#player"),QS=matchMedia("(prefers-reduced-motion: reduce)").matches,ef=s=>s.split("|")[1].replace(/시부$/,""),Um=(s,t=1)=>`${(s/1e4).toFixed(s>=1e6?0:t)}\uB9CC`,jS=new Set(He.map.sigun.map(s=>s.sido)).size,tb=Object.entries(He.land.v).filter(([,s])=>s).sort((s,t)=>t[1]-s[1]).slice(0,3),Fm=He.rice.fc.at(-1),eb=He.power.k,Ls=He.power.months,Om=s=>Ls.reduce((t,e,n)=>e.startsWith(s)?t+eb[n]:t,0),Vm=String(+Ls.at(-1).slice(0,4)-(Ls.at(-1).endsWith("12")?0:1)),nb=Om(Vm)/Om(Ls[0].slice(0,4)),wc=s=>s.map(t=>`<span class="ln">${[...t].map(e=>`<span class="ch${e===" "?" sp":""}">${e===" "?"&nbsp;":e}</span>`).join("")}</span>`).join(""),Tc=(s,t,e,n,i,r="")=>`
  <section class="sc" id="sc-${s}">
    <p class="kicker"><b>${t}</b>${e}</p>
    <h2 class="hl">${wc(n)}</h2>
    <p class="it-sub">${i}</p>
    ${r}
  </section>`,Bm=s=>`linear-gradient(90deg, ${s.join(", ")})`;Ha.insertAdjacentHTML("beforeend",`
  <div class="copy">
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${wc(["\uC9C0\uC5ED\uB18D\uC5C5","\uD604\uD669\uD310"])}</h1>
      <p class="it-sub">\uACF5\uAC1C \uD1B5\uACC4\uB85C \uBCF4\uB294 \uC6B0\uB9AC \uC9C0\uC5ED \uB18D\uC5C5</p>
    </section>
    ${Tc("stats","01","\uC8FC\uC694\uD1B5\uACC4",[`${He.map.sigun.length}\uAC1C \uC2DC\uAD70\uC744`,"\uD55C \uD654\uBA74\uC5D0"],"\uB18D\uAC00\xB7\uACBD\uC9C0\xB7\uAC00\uCD95\xB7\uC791\uBB3C\xB7\uC18C\uB4DD\xB7\uC608\uC0B0\uC744<br>\uC2DC\uB3C4\uC640 \uC2DC\uAD70\uBCC4\uB85C \uBC14\uB85C \uBE44\uAD50",`<div class="nums">
        <div><b data-n="${He.map.sigun.length}">0</b><span>\uC2DC\uAD70</span></div>
        <div><b data-n="${jS}">0</b><span>\uC2DC\uB3C4</span></div>
        <div><b data-n="${Math.round(He.land.nat/1e4)}" data-suf="\uB9CC">0</b><span>ha \uACBD\uC9C0</span></div>
      </div>`)}
    ${Tc("rice","02","\uBCBC \uC791\uD669",["\uC300 \uC218\uD655\uB7C9\uC744","7\uC6D4\uBD80\uD130 \uBBF8\uB9AC"],"\uAE30\uC0C1\xB7\uC704\uC131\xB7\uBCD1\uD574\uCDA9 \uC608\uCC30\uB85C \uC2DC\uAD70\uBCC4 \uB2E8\uC218\uB97C \uC608\uCE21\uD558\uACE0<br>\uD655\uC815\uCE58\uB85C \uC815\uD655\uB3C4\uB97C \uACF5\uAC1C",`<div class="big"><b data-n="${Fm.y}" data-dec="1">0</b><small>kg/10a</small></div>
       <p class="big-cap">${He.rice.year} \uC804\uAD6D \uC300 \uB2E8\uC218 \uC608\uCE21 \xB7 ${Fm.lab}</p>`)}
    ${Tc("flow","03","\uBB3C\uB958\uB3D9\uD5A5",["\uB18D\uC0B0\uBB3C\uC774","\uC6C0\uC9C1\uC774\uB294 \uAE38"],`\uBB3C\uB958\uAE30\uAE30 \uACF5\uB3D9\uC774\uC6A9 ${He.flows.year-2004}\uB144 \uC2E4\uC801\uC73C\uB85C \uBCF8<br>\uC2DC\uAD70 \uC0AC\uC774 \uD750\uB984`,`<ol class="pairs">${He.flows.top.slice(0,3).map(([s,t,e])=>`<li><span class="o">${ef(s)}</span><i></i><span class="d">${ef(t)}</span><b>${Um(e,0)}\uAC1C</b></li>`).join("")}</ol>`)}
    ${Tc("power","04","\uB18D\uC0AC\uC6A9 \uC804\uAE30",["\uACC4\uC808\uC744 \uB530\uB77C \uB3C4\uB294","\uB18D\uC5C5 \uC804\uB825"],"\uD55C\uC804 \uC2DC\uAD70\xB7\uC6D4\uBCC4 \uC0AC\uC6A9\uB7C9\uC73C\uB85C<br>\uC9C0\uC5ED \uB18D\uC5C5\uD65C\uB3D9\uC744 \uC77D\uB294\uB2E4",`<ul class="it-facts">
        <li><b>1~2\uC6D4</b><span>\uC2DC\uC124 \uB09C\uBC29\uC774 \uAC00\uC7A5 \uB9CE\uB2E4</span></li>
        <li><b>8~9\uC6D4</b><span>\uC5EC\uB984 \uB450 \uBC88\uC9F8 \uC815\uC810</span></li>
        <li><b>${nb.toFixed(1)}\uBC30</b><span>${Ls[0].slice(0,4)}\uB144\uBCF4\uB2E4 \uB298\uC5B4\uB09C ${Vm}\uB144 \uC0AC\uC6A9\uB7C9</span></li>
      </ul>`)}
  </div>
  <div class="labels">${tb.map(([s,t])=>`<div class="lab" data-k="${s}"><b>${ef(s)}</b><span>${Um(t)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>\uACBD\uC9C0\uBA74\uC801 ${He.land.year}</span><i class="bar" style="background:${Bm(ka)}"></i><span>\uB192\uC774\xB7\uC0C9\uC774 \uD074\uC218\uB85D \uB113\uB2E4</span></div>
    <div class="it-lg" id="lg-rice"><span>\uD3C9\uB144\uBCF4\uB2E4 \uB0AE\uC74C</span><i class="bar" style="background:${Bm([Ei.lo,Ei.mid,Ei.hi])}"></i><span>\uB192\uC74C \xB7 ${He.rice.year} \uC2DC\uAD70 \uC608\uCE21</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${qn.origin}"></i><span>\uBCF4\uB0B8 \uACF3</span><i class="it-dot" style="background:${qn.dest}"></i><span>\uBC1B\uC740 \uACF3 \xB7 \uCEE8\uD14C\uC774\uB108 ${He.flows.year}\uB144 ${He.flows.months} \xB7 \uC0C1\uC704 50</span></div>
    <div class="it-lg" id="lg-power"><span>\uC804\uAD6D \uB18D\uC0AC\uC6A9 \uC804\uB825 \uC6D4 \uC0AC\uC6A9\uB7C9 \xB7 ${Ls[0].replace("-",".")}~${Ls.at(-1).replace("-",".")}</span></div>
  </div>
  <div class="more" id="sc-more">
    <p class="kicker"><b>05</b>\uADF8\uB9AC\uACE0 \uB354</p>
    <h2 class="hl">${wc(["\uC9C0\uC5ED \uB18D\uC5C5\uC758 \uC22B\uC790\uB97C \uD55C\uACF3\uC5D0"])}</h2>
    <div class="cards">${[["rio","\uC9C0\uC5ED\uC0B0\uC5C5\uC5F0\uAD00\uD45C(\uB18D\uC5C5)","\uC0DD\uC0B0\xB7\uBD80\uAC00\uAC00\uCE58\xB7\uC77C\uC790\uB9AC \uD30C\uAE09","#f5a524",'<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="17" r="2.4"/><path d="M8.2 8.2l2.6 6.6M15.9 7.6l-2.7 7.3M8.4 6.8l7.2-.6"/>'],["employ","\uB18D\uC5C5\uACE0\uC6A9","\uB18D\uB9BC\uC5B4\uC5C5 \uCDE8\uC5C5\uC790 60\uB144","#ffcf7a",'<circle cx="9" cy="7.5" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.3a4.5 4.5 0 0 1 6 4.7"/>'],["agfin","\uB18D\uC5C5\uAE08\uC735\uBCF4\uD5D8","\uB18D\xB7\uCD95\uD611 \uC7AC\uBB34 \xB7 \uC7AC\uD574\uBCF4\uD5D8","#7cc98f",'<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.6"/>'],["jikbul","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791","\uC9C1\uBD88\uAE08 \uC608\uC0B0 \xB7 \uACE0\uD5A5\uC0AC\uB791\uAE30\uAE08","#3cc0b0",'<ellipse cx="12" cy="6.5" rx="7" ry="2.8"/><path d="M5 6.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5M5 11.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5"/>'],["ruraldev","\uB18D\uCD0C\uAC1C\uBC1C","\uC0AC\uC5C5 \uC608\uC0B0 \xB7 \uC0AC\uC5C5 \uC9C0\uAD6C","#5fb3ff",'<path d="M3 20h18M5 20v-8l5-4 5 4v8M15 20v-6l3-2.5 3 2.5v6"/><path d="M8.5 20v-4h3v4"/>'],["soil","\uB18D\uACBD\uC9C0 \uD1A0\uC591","\uD1A0\uC591 \uC801\uC131 \xB7 \uC591\uBD84 \uC0C1\uD0DC","#8f9dff",'<path d="M3 8.5c3-2 6 2 9 0s6-2 9 0M3 13c3-2 6 2 9 0s6-2 9 0M3 17.5c3-2 6 2 9 0s6-2 9 0"/>'],["livestock","\uCD95\uC0B0 \uD658\uACBD","\uAC00\uCD95\uBD84\uB1E8 \uBC1C\uC0DD\xB7\uCC98\uB9AC","#ff8a6b",'<path d="M12 3.5c3.5 4.4 6 7.7 6 10.6a6 6 0 0 1-12 0c0-2.9 2.5-6.2 6-10.6z"/><path d="M9.2 14.6a2.9 2.9 0 0 0 2.8 2.6"/>']].map(([s,t,e,n,i])=>`<a class="card" href="${s}" style="--c:${n}"><svg viewBox="0 0 24 24" aria-hidden="true">${i}</svg><b>${t}</b><span>${e}</span></a>`).join("")}</div>
  </div>
  <div class="outro" id="sc-end">
    <span class="mark big"></span>
    <h2 class="hl">${wc(["\uC9C0\uC5ED\uB18D\uC5C5 \uD604\uD669\uD310"])}</h2>
    <p class="url">ag-rstat.vercel.app</p>
    <p class="srcs">\uAD6D\uAC00\uB370\uC774\uD130\uCC98 \xB7 \uD55C\uAD6D\uC740\uD589 \xB7 \uD55C\uC804 \xB7 \uB18D\uCD0C\uC9C4\uD765\uCCAD \xB7 \uC9C0\uBC29\uC7AC\uC815365 \uB4F1 \uACF5\uAC1C \uC790\uB8CC</p>
    <div class="btns"><a class="btn pri" href="./">\uD604\uD669\uD310 \uC5F4\uAE30</a><button type="button" class="btn" id="again">\uB2E4\uC2DC \uBCF4\uAE30</button></div>
  </div>`);var Un={scene:0,bgI:0,glow:0,morph:0,pAlpha:1,mapAlpha:0,rise:0,tilt:0,orbit:0,camDist:23.5,camX:0,camY:0,mapShift:300,mapLift:0,riceColor:0,mapDim:0,glAlpha:1,labels:0,riceAlpha:0,riceLine:0,riceFc:0,flows:0,flowAlpha:0,spiral:0,powerAlpha:0},Va=Lm(Oe("#gl"),He),Hm=Dm(Oe("#fx"),He,Va),ib=Nm(Oe("#rice"),He),Ar={draw(){},canvas:Oe("#bg"),kind:"\u2026"},sb=[...Ha.querySelectorAll(".lab")],Ac=960,rf=540;function Wm(){let s=Ec.clientWidth/xn;Ha.style.transform=`scale(${s})`;let t=Math.min(window.devicePixelRatio||1,1.75),e=Math.min(2880,Math.max(640,Math.round(xn*s*t))),n=Math.round(e*Ci/xn);Va.resize(e,n),Hm.resize(e,n),Ac=Math.max(480,Math.round(e/2)),rf=Math.round(Ac*Ci/xn),Ar.canvas.width=Ac,Ar.canvas.height=rf}new ResizeObserver(Wm).observe(Ec);var af=[{id:"open",t:0,name:"\uC5F4\uAE30"},{id:"stats",t:4,name:"\uC8FC\uC694\uD1B5\uACC4",href:"./"},{id:"rice",t:10,name:"\uBCBC \uC791\uD669",href:"rice"},{id:"flow",t:16,name:"\uBB3C\uB958\uB3D9\uD5A5",href:"flow"},{id:"power",t:21,name:"\uB18D\uC0AC\uC6A9 \uC804\uAE30",href:"power"},{id:"more",t:25,name:"\uADF8\uB9AC\uACE0 \uB354"}],Er=30,Zt=Wr.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),oe=(s,t,e,n="power2.inOut")=>Zt.to(Un,{...s,duration:e,ease:n},t);function Wa(s,t){let e=Oe(s);Zt.set(e,{autoAlpha:1,y:0},t).fromTo(e.querySelector(".kicker"),{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.6,ease:"power3.out"},t).fromTo(e.querySelectorAll(".hl .ch"),{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.85,stagger:.028,ease:"expo.out"},t+.1);let n=e.querySelector(".it-sub");n&&Zt.fromTo(n,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.7,ease:"power2.out"},t+.55)}function Xa(s,t){Zt.to(Oe(s),{autoAlpha:0,y:-26,duration:.5,ease:"power2.in"},t)}var Xm=[];function qm(s,t,e){let n=+s.dataset.n,i=+(s.dataset.dec||0),r=s.dataset.suf||"",a={v:i?n*.94:0,last:""};Xm.push({elm:s,o:a,dec:i,suf:r}),Zt.fromTo(a,{v:a.v},{v:n,duration:e,ease:"power3.out"},t)}var Cc=(s,t,e)=>Zt.fromTo(`#lg-${s}`,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},t).to(`#lg-${s}`,{autoAlpha:0,duration:.4},e);Wr.set(".sc, .it-lg, .more, .outro",{autoAlpha:0});oe({bgI:1},0,1.6,"power1.out");oe({morph:1},.15,3.3,"none");oe({glow:.5},1.2,2.2);Wa("#sc-open",.45);Zt.fromTo("#sc-open .mark",{scale:.4,rotate:-90},{scale:1,rotate:0,duration:1.2,ease:"back.out(2)"},.45);Xa("#sc-open",3.45);oe({mapAlpha:1},2.9,1.2);oe({pAlpha:.32},3.3,1);oe({scene:1},3.6,1.4);oe({tilt:1},4,2.3);oe({rise:1},4.5,2.5,"power2.out");oe({orbit:.36,camDist:21.2},4,5.7,"sine.inOut");oe({pAlpha:0},5.2,1.2);Wa("#sc-stats",4.1);Zt.fromTo("#sc-stats .nums > div",{autoAlpha:0,y:16},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},4.8);Ha.querySelectorAll("#sc-stats [data-n]").forEach((s,t)=>qm(s,4.8+t*.12,1.6));Cc("stats",5,9.2);oe({labels:1},6.9,.6,"power2.out");oe({labels:0},9.1,.4);Xa("#sc-stats",9.3);oe({scene:2},9.6,1.2);oe({rise:0,tilt:.24,orbit:0,camDist:23},9.5,1.6);oe({riceColor:1},10,1.3);Wa("#sc-rice",10.1);oe({riceAlpha:1},10.4,.6,"power1.out");oe({riceLine:1},10.6,1.9,"power1.inOut");oe({riceFc:1},12.4,1.9,"power1.out");Zt.fromTo("#sc-rice .big, #sc-rice .big-cap",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.1,duration:.6,ease:"power2.out"},12.3);qm(Oe("#sc-rice [data-n]"),12.3,2);Cc("rice",10.8,15.3);oe({riceAlpha:0},15.3,.5);Xa("#sc-rice",15.3);oe({scene:3},15.6,1.2);oe({riceColor:0,mapDim:1,tilt:0,camDist:15.2,camX:.5,camY:1.5},15.5,1.3);oe({flowAlpha:1},16.2,.3,"none");oe({flows:1},16.2,2.7,"power1.out");Wa("#sc-flow",16.1);Zt.fromTo("#sc-flow .pairs li",{autoAlpha:0,x:-16},{autoAlpha:1,x:0,stagger:.14,duration:.55,ease:"power2.out"},17.4);Cc("flow",16.6,20.2);oe({flowAlpha:0},20.3,.6);Xa("#sc-flow",20.3);oe({glAlpha:0},20.4,.8);oe({scene:4},20.6,1.2);oe({powerAlpha:1},20.9,.5,"power1.out");oe({spiral:1},21,3.1,"power1.inOut");oe({glow:.32},20.6,1);Wa("#sc-power",21.1);Zt.fromTo("#sc-power .it-facts li",{autoAlpha:0,x:-16},{autoAlpha:1,x:0,stagger:.16,duration:.55,ease:"power2.out"},22.3);Cc("power",21.4,24.4);oe({powerAlpha:0},24.5,.5);Xa("#sc-power",24.5);oe({scene:5,glow:.2},24.8,1);Zt.set("#sc-more",{autoAlpha:1,y:0},25).fromTo("#sc-more .kicker",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.5},25).fromTo("#sc-more .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.7,stagger:.018,ease:"expo.out"},25.05).fromTo("#sc-more .card",{autoAlpha:0,y:46,rotateX:-32},{autoAlpha:1,y:0,rotateX:0,duration:.8,stagger:.085,ease:"power3.out"},25.25).fromTo("#sc-more .card svg > *",{strokeDashoffset:60},{strokeDashoffset:0,duration:1,stagger:.02,ease:"power2.out"},25.4).to("#sc-more",{autoAlpha:0,y:-20,duration:.5,ease:"power2.in"},27.5);oe({scene:6,glow:.55},27.8,1.2);Zt.set("#sc-end",{autoAlpha:1},28).fromTo("#sc-end .mark",{scale:.3,rotate:-120,autoAlpha:0},{scale:1,rotate:0,autoAlpha:1,duration:1.1,ease:"back.out(1.8)"},28).fromTo("#sc-end .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.035,ease:"expo.out"},28.15).fromTo("#sc-end .url, #sc-end .srcs, #sc-end .btns",{autoAlpha:0,y:12},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},28.6).set({},{},Er);var wr=Qu.map(([s,t])=>[es(s).map(e=>e/255),es(t).map(e=>e/255)]),Yn=new Float32Array(16),rb=performance.now();function ab(){let s=Zt.time(),t=(performance.now()-rb)/1e3,e=Math.min(Qu.length-2,Math.floor(Un.scene)),n=Un.scene-e;for(let i=0;i<3;i++)Yn[4+i]=wr[e][0][i]+(wr[e+1][0][i]-wr[e][0][i])*n,Yn[8+i]=wr[e][1][i]+(wr[e+1][1][i]-wr[e][1][i])*n;Yn[0]=t,Yn[1]=Un.bgI,Yn[2]=Ac,Yn[3]=rf,Yn[12]=(xn/2+Un.mapShift)/xn,Yn[13]=.5,Yn[14]=.42,Yn[15]=Un.glow,Ar.draw(Yn),Va.render(Un,t),Hm.render(Un,s),ib.render(Un),sb.forEach((i,r)=>{let a=Va.top(i.dataset.k);if(!a||Un.labels<=.01){i.style.opacity=0;return}let[o,l]=Va.project(a[0],a[1],a[2]),c=Math.min(1,Math.max(0,Un.labels*1.4-r*.2));i.style.opacity=c,i.style.transform=`translate(${o.toFixed(1)}px, ${(l-12*(1-c)).toFixed(1)}px)`}),Xm.forEach(i=>{let r=i.o.v.toFixed(i.dec).replace(/\B(?=(\d{3})+(?!\d))/g,",")+i.suf;r!==i.o.last&&(i.o.last=r,i.elm.textContent=r)}),cb()}var of=Oe("#play"),Ri=Oe("#track"),ob=Oe("#fill"),lb=Oe("#time"),nf=Oe("#go"),Ym=Oe("#chaps");Ym.innerHTML=af.map(s=>`<button type="button" data-t="${s.t}" style="left:${s.t/Er*100}%">${s.name}</button>`).join("");var $m=[...Ym.children],zm=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`,km=-1,Gm="";function cb(){let s=Zt.time();ob.style.transform=`scaleX(${s/Er})`,lb.textContent=`${zm(s)} / ${zm(Er)}`,Ri.setAttribute("aria-valuenow",s.toFixed(1));let t=af.reduce((n,i,r)=>s>=i.t-.01?r:n,0);if(t!==km){km=t,$m.forEach((i,r)=>i.classList.toggle("on",r===t));let n=af[t];nf.hidden=!n.href,n.href&&(nf.href=n.href,nf.textContent=`${n.name} \uD654\uBA74 \uC5F4\uAE30 \u2192`)}let e=Zt.progress()>=1?"end":Zt.paused()?"paused":"playing";e!==Gm&&(Gm=e,of.dataset.state=e,of.setAttribute("aria-label",e==="playing"?"\uBA48\uCDA4":e==="end"?"\uB2E4\uC2DC \uBCF4\uAE30":"\uC7AC\uC0DD"),Ec.classList.toggle("is-paused",e==="paused"))}function Zm(){Zt.progress()>=1?Zt.restart():Zt.paused(!Zt.paused())}of.addEventListener("click",Zm);Oe("#again").addEventListener("click",()=>Zt.restart());Oe("#bigplay").addEventListener("click",()=>Zt.progress()>=1?Zt.restart():Zt.play());$m.forEach(s=>s.addEventListener("click",t=>{t.stopPropagation(),Zt.seek(+s.dataset.t+.001,!1),Zt.progress()<1&&Zt.play()}));var Jm=!1,Km=s=>{let t=Ri.getBoundingClientRect();Zt.seek(Math.min(1,Math.max(0,(s.clientX-t.left)/t.width))*Er,!1)};Ri.addEventListener("pointerdown",s=>{s.target.closest("button")||(Jm=!Zt.paused()&&Zt.progress()<1,Zt.pause(),Ri.setPointerCapture(s.pointerId),Km(s))});Ri.addEventListener("pointermove",s=>{Ri.hasPointerCapture(s.pointerId)&&Km(s)});Ri.addEventListener("pointerup",s=>{Ri.releasePointerCapture(s.pointerId),Jm&&Zt.play()});Ri.addEventListener("keydown",s=>{let t={ArrowLeft:-3,ArrowRight:3}[s.key];t&&(s.preventDefault(),Zt.seek(Math.min(Er,Math.max(0,Zt.time()+t))))});document.addEventListener("keydown",s=>{if(!s.target.closest("input, textarea, select"))if(s.key===" "||s.key==="k"){if(s.target.closest("a, button")&&s.key===" ")return;s.preventDefault(),Zm()}else s.key==="Home"&&Zt.seek(0)});var sf=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&!Zt.paused()?(Zt.pause(),sf=!0):!document.hidden&&sf&&(sf=!1,Zt.play())});window.__intro={tl:Zt,S:Un};(async()=>{Ar=await Td(Oe("#bg"),{gpu:!/[?&]gl\b/.test(location.search)}),Ha.dataset.gpu=Ar.kind,Oe("#gpu").textContent=Ar.kind,Wm();try{await Promise.race([document.fonts.ready,new Promise(s=>setTimeout(s,1500))])}catch{}Wr.ticker.add(ab),Ec.classList.add("ready"),QS?(Zt.seek(8.4),Zt.pause()):Zt.play(0)})();})();
