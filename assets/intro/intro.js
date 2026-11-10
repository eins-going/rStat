(()=>{function Ti(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function ld(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var yn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},aa={duration:.5,overwrite:!1,delay:0},vh,Ke,Ce,Bn=1e8,ve=1/Bn,uh=Math.PI*2,ng=uh/4,ig=0,cd=Math.sqrt,sg=Math.cos,rg=Math.sin,Ge=function(t){return typeof t=="string"},Oe=function(t){return typeof t=="function"},Ci=function(t){return typeof t=="number"},Io=function(t){return typeof t>"u"},ci=function(t){return typeof t=="object"},vn=function(t){return t!==!1},yh=function(){return typeof window<"u"},yo=function(t){return Oe(t)||Ge(t)},hd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},sn=Array.isArray,ag=/random\([^)]+\)/g,og=/,\s*/g,td=/(?:-?\.?\d|\.)+/gi,Mh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ps=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,sh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Sh=/[+-]=-?[.\d]+/,lg=/[^,'"\[\]\s]+/gi,cg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Le,oi,fh,bh,Tn={},wo={},ud,fd=function(t){return(wo=rr(t,Tn))&&rn},Lo=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},oa=function(t,e){return!e&&console.warn(t)},dd=function(t,e){return t&&(Tn[t]=e)&&wo&&(wo[t]=e)||Tn},la=function(){return 0},hg={suppressEvents:!0,isStart:!0,kill:!1},Mo={suppressEvents:!0,kill:!1},ug={suppressEvents:!0},wh={},Ji=[],dh={},pd,_n={},rh={},ed=30,So=[],Ah="",Th=function(t){var e=t[0],n,i;if(ci(e)||Oe(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=So.length;i--&&!So[i].targetTest(e););n=So[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Ph(t[i],n)))||t.splice(i,1);return t},Ki=function(t){return t._gsap||Th(kn(t))[0]._gsap},Eh=function(t,e,n){return(n=t[e])&&Oe(n)?t[e]():Io(n)&&t.getAttribute&&t.getAttribute(e)||n},un=function(t,e){return(t=t.split(",")).forEach(e)||t},Fe=function(t){return Math.round(t*1e5)/1e5||0},Ie=function(t){return Math.round(t*1e7)/1e7||0},Is=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},fg=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Ao=function(){var t=Ji.length,e=Ji.slice(0),n,i;for(dh={},Ji.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Ch=function(t){return!!(t._initted||t._startAt||t.add)},md=function(t,e,n,i){Ji.length&&!Ke&&Ao(),t.render(e,n,i||!!(Ke&&e<0&&Ch(t))),Ji.length&&!Ke&&Ao()},gd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(lg).length<2?e:Ge(t)?t.trim():t},_d=function(t){return t},En=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},dg=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},rr=function(t,e){for(var n in e)t[n]=e[n];return t},nd=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=ci(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},To=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},ia=function(t){var e=t.parent||Le,n=t.keyframes?dg(sn(t.keyframes)):En;if(vn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},pg=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},xd=function(t,e,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},Do=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,a=e._next;r?r._next=a:t[n]===e&&(t[n]=a),a?a._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},ji=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Es=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},mg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},ph=function(t,e,n,i){return t._startAt&&(Ke?t._startAt.revert(Mo):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},gg=function s(t){return!t||t._ts&&s(t.parent)},id=function(t){return t._repeat?ar(t._tTime,t=t.duration()+t._rDelay)*t:0},ar=function(t,e){var n=Math.floor(t=Ie(t/e));return t&&n===t?n-1:n},Eo=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},No=function(t){return t._end=Ie(t._start+(t._tDur/Math.abs(t._ts||t._rts||ve)||0))},Uo=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Ie(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),No(t),n._dirty||Es(n,t)),t},vd=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Eo(t.rawTime(),e),(!e._dur||fa(0,e.totalDuration(),n)-e._tTime>ve)&&e.render(n,!0)),Es(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ve}},li=function(t,e,n,i){return e.parent&&ji(e),e._start=Ie((Ci(n)?n:!n&&Co(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==Le?Fn(t,n,e):t._time)+e._delay),e._end=Ie(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),xd(t,e,"_first","_last",t._sort?"_start":0),Co(e)||(t._recent=e),i||vd(t,e),t._ts<0&&Uo(t,t._tTime),t},yd=function(t,e){return(Tn.ScrollTrigger||Lo("scrollTrigger",e))&&Tn.ScrollTrigger.create(e,t)},Md=function(t,e,n,i,r){if(Dh(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!Ke&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&pd!==xn.frame)return Ji.push(t),t._lazy=[r,i],1},_g=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},Co=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},xg=function(t,e,n,i){var r=t.ratio,a=e<0||!e&&(!t._start&&_g(t)&&!(!t._initted&&Co(t))||(t._ts<0||t._dp._ts<0)&&!Co(t))?0:1,o=t._rDelay,l=0,c,h,d;if(o&&t._repeat&&(l=fa(0,t._tDur,e),h=ar(l,o),t._yoyo&&h&1&&(a=1-a),h!==ar(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||Ke||i||t._zTime===ve||!e&&t._zTime){if(!t._initted&&Md(t,e,i,n,l))return;for(d=t._zTime,t._zTime=e||(n?ve:0),n||(n=e&&!d),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&ph(t,e,n,!0),t._onUpdate&&!n&&An(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&An(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&ji(t,1),!n&&!Ke&&(An(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},vg=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},or=function(t,e,n,i){var r=t._repeat,a=Ie(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Ie(a*(r+1)+t._rDelay*r):a,o>0&&!i&&Uo(t,t._tTime=t._tDur*o),t.parent&&No(t),n||Es(t.parent,t),t},sd=function(t){return t instanceof nn?Es(t):or(t,t._dur)},yg={_start:0,endTime:la,totalDuration:la},Fn=function s(t,e,n){var i=t.labels,r=t._recent||yg,a=t.duration()>=Bn?r.endTime(!1):t._dur,o,l,c;return Ge(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(sn(n)?n[0]:n).totalDuration()),o>1?s(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},sa=function(t,e,n){var i=Ci(e[1]),r=(i?2:1)+(t<2?0:1),a=e[r],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=vn(l.vars.inherit)&&l.parent;a.immediateRender=vn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new Be(e[0],a,e[r+1])},Qi=function(t,e){return t||t===0?e(t):e},fa=function(t,e,n){return n<t?t:n>e?e:n},je=function(t,e){return!Ge(t)||!(e=cg.exec(t))?"":e[1]},Mg=function(t,e,n){return Qi(n,function(i){return fa(t,e,i)})},mh=[].slice,Sd=function(t,e){return t&&ci(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&ci(t[0]))&&!t.nodeType&&t!==oi},Sg=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return Ge(i)&&!e||Sd(i,1)?(r=n).push.apply(r,kn(i)):n.push(i)})||n},kn=function(t,e,n){return Ce&&!e&&Ce.selector?Ce.selector(t):Ge(t)&&!n&&(fh||!lr())?mh.call((e||bh).querySelectorAll(t),0):sn(t)?Sg(t,n):Sd(t)?mh.call(t,0):t?[t]:[]},gh=function(t){return t=kn(t)[0]||oa("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return kn(e,n.querySelectorAll?n:n===t?oa("Invalid scope")||bh.createElement("div"):t)}},bd=function(t){return t.sort(function(){return .5-Math.random()})},wd=function(t){if(Oe(t))return t;var e=ci(t)?t:{each:t},n=Cs(e.ease),i=e.from||0,r=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,d=i;return Ge(i)?h=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],d=i[1]),function(f,u,m){var _=(m||e).length,p=a[_],g,v,S,M,A,T,x,b,I;if(!p){if(I=e.grid==="auto"?0:(e.grid||[1,Bn])[1],!I){for(x=-Bn;x<(x=m[I++].getBoundingClientRect().left)&&I<_;);I<_&&I--}for(p=a[_]=[],g=l?Math.min(I,_)*h-.5:i%I,v=I===Bn?0:l?_*d/I-.5:i/I|0,x=0,b=Bn,T=0;T<_;T++)S=T%I-g,M=v-(T/I|0),p[T]=A=c?Math.abs(c==="y"?M:S):cd(S*S+M*M),A>x&&(x=A),A<b&&(b=A);i==="random"&&bd(p),p.max=x-b,p.min=b,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(I>_?_-1:c?c==="y"?_/I:I:Math.max(I,_/I))||0)*(i==="edges"?-1:1),p.b=_<0?r-_:r,p.u=je(e.amount||e.each)||0,n=n&&_<0?Ug(n):n}return _=(p[f]-p.min)/p.max||0,Ie(p.b+(n?n(_):_)*p.v)+p.u}},_h=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Ie(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Ci(n)?0:je(n))}},Ad=function(t,e){var n=sn(t),i,r;return!n&&ci(t)&&(i=n=t.radius||Bn,t.values?(t=kn(t.values),(r=!Ci(t[0]))&&(i*=i)):t=_h(t.increment)),Qi(e,n?Oe(t)?function(a){return r=t(a),Math.abs(r-a)<=i?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=Bn,h=0,d=t.length,f,u;d--;)r?(f=t[d].x-o,u=t[d].y-l,f=f*f+u*u):f=Math.abs(t[d]-o),f<c&&(c=f,h=d);return h=!i||c<=i?t[h]:a,r||h===a||Ci(a)?h:h+je(a)}:_h(t))},Td=function(t,e,n,i){return Qi(sn(t)?!e:n===!0?!!(n=0):!i,function(){return sn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},bg=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,a){return a(r)},i)}},wg=function(t,e){return function(n){return t(parseFloat(n))+(e||je(n))}},Ag=function(t,e,n){return Cd(t,e,0,1,n)},Ed=function(t,e,n){return Qi(n,function(i){return t[~~e(i)]})},Tg=function s(t,e,n){var i=e-t;return sn(t)?Ed(t,s(0,t.length),e):Qi(n,function(r){return(i+(r-t)%i)%i+t})},Eg=function s(t,e,n){var i=e-t,r=i*2;return sn(t)?Ed(t,s(0,t.length-1),e):Qi(n,function(a){return a=(r+(a-t)%r)%r||0,t+(a>i?r-a:a)})},cr=function(t){return t.replace(ag,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(og);return Td(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Cd=function(t,e,n,i,r){var a=e-t,o=i-n;return Qi(r,function(l){return n+((l-t)/a*o||0)})},Cg=function s(t,e,n,i){var r=isNaN(t+e)?0:function(u){return(1-u)*t+u*e};if(!r){var a=Ge(t),o={},l,c,h,d,f;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(sn(t)&&!sn(e)){for(h=[],d=t.length,f=d-2,c=1;c<d;c++)h.push(s(t[c-1],t[c]));d--,r=function(m){m*=d;var _=Math.min(f,~~m);return h[_](m-_)},n=e}else i||(t=rr(sn(t)?[]:{},t));if(!h){for(l in e)Ih.call(o,t,l,"get",e[l]);r=function(m){return Oh(m,o)||(a?t.p:t)}}}return Qi(n,r)},rd=function(t,e,n){var i=t.labels,r=Bn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},An=function(t,e,n){var i=t.vars,r=i[e],a=Ce,o=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&Ji.length&&Ao(),o&&(Ce=o),h=l?r.apply(c,l):r.call(c),Ce=a,h},ea=function(t){return ji(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ke),t.progress()<1&&An(t,"onInterrupt"),t},sr,Rd=[],Pd=function(t){if(t)if(t=!t.name&&t.default||t,yh()||t.headless){var e=t.name,n=Oe(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:la,render:Oh,add:Ih,kill:Xg,modifier:Wg,rawVars:0},a={targetTest:0,get:0,getSetter:Oo,aliases:{},register:0};if(lr(),t!==i){if(_n[e])return;En(i,En(To(t,r),a)),rr(i.prototype,rr(r,To(t,a))),_n[i.prop=e]=i,t.targetTest&&(So.push(i),wh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}dd(e,i),t.register&&t.register(rn,i,fn)}else Rd.push(t)},Se=255,na={aqua:[0,Se,Se],lime:[0,Se,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Se],navy:[0,0,128],white:[Se,Se,Se],olive:[128,128,0],yellow:[Se,Se,0],orange:[Se,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Se,0,0],pink:[Se,192,203],cyan:[0,Se,Se],transparent:[Se,Se,Se,0]},ah=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Se+.5|0},Id=function(t,e,n){var i=t?Ci(t)?[t>>16,t>>8&Se,t&Se]:0:na.black,r,a,o,l,c,h,d,f,u,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),na[t])i=na[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Se,i&Se,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Se,t&Se]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(td),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,r=h*2-a,i.length>3&&(i[3]*=1),i[0]=ah(l+1/3,r,a),i[1]=ah(l,r,a),i[2]=ah(l-1/3,r,a);else if(~t.indexOf("="))return i=t.match(Mh),n&&i.length<4&&(i[3]=1),i}else i=t.match(td)||na.transparent;i=i.map(Number)}return e&&!m&&(r=i[0]/Se,a=i[1]/Se,o=i[2]/Se,d=Math.max(r,a,o),f=Math.min(r,a,o),h=(d+f)/2,d===f?l=c=0:(u=d-f,c=h>.5?u/(2-d-f):u/(d+f),l=d===r?(a-o)/u+(a<o?6:0):d===a?(o-r)/u+2:(r-a)/u+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Ld=function(t){var e=[],n=[],i=-1;return t.split(Ei).forEach(function(r){var a=r.match(Ps)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},ad=function(t,e,n){var i="",r=(t+i).match(Ei),a=e?"hsla(":"rgba(",o=0,l,c,h,d;if(!r)return t;if(r=r.map(function(f){return(f=Id(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(h=Ld(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Ei,"1").split(Ps),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(Ei),d=c.length-1;o<d;o++)i+=c[o]+r[o];return i+c[d]},Ei=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in na)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),Rg=/hsl[a]?\(/,Rh=function(t){var e=t.join(" "),n;if(Ei.lastIndex=0,Ei.test(e))return n=Rg.test(e),t[1]=ad(t[1],n),t[0]=ad(t[0],n,Ld(t[1])),!0},ca,xn=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,a=r,o=[],l,c,h,d,f,u,m=function _(p){var g=s()-i,v=p===!0,S,M,A,T;if((g>t||g<0)&&(n+=g-e),i+=g,A=i-n,S=A-a,(S>0||v)&&(T=++d.frame,f=A-d.time*1e3,d.time=A=A/1e3,a+=S+(S>=r?0:r-S),M=1),v||(l=c(_)),M)for(u=0;u<o.length;u++)o[u](A,f,T,p)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){ud&&(!fh&&yh()&&(oi=fh=window,bh=oi.document||{},Tn.gsap=rn,(oi.gsapVersions||(oi.gsapVersions=[])).push(rn.version),fd(wo||oi.GreenSockGlobals||!oi.gsap&&oi||{}),Rd.forEach(Pd)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=h||function(p){return setTimeout(p,a-d.time*1e3+1|0)},ca=1,m(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),ca=0,c=la},lagSmoothing:function(p,g){t=p||1/0,e=Math.min(g||33,t)},fps:function(p){r=1e3/(p||240),a=d.time*1e3+r},add:function(p,g,v){var S=g?function(M,A,T,x){p(M,A,T,x),d.remove(S)}:p;return d.remove(p),o[v?"unshift":"push"](S),lr(),S},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&u>=g&&u--},_listeners:o},d})(),lr=function(){return!ca&&xn.wake()},he={},Pg=/^[\d.\-M][\d.\-,\s]/,Ig=/["']/g,Lg=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(Ig,"").trim():+c,i=l.substr(o+1).trim();return e},Dg=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Ng=function(t){var e=(t+"").split("("),n=he[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Lg(e[1])]:Dg(t).split(",").map(gd)):he._CE&&Pg.test(t)?he._CE("",t):n},Ug=function(t){return function(e){return 1-t(1-e)}},Cs=function(t,e){return t&&(Oe(t)?t:he[t]||Ng(t))||e},Ls=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},a;return un(t,function(o){he[o]=Tn[o]=r,he[a=o.toLowerCase()]=n;for(var l in r)he[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=he[o+"."+l]=r[l]}),r},Dd=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},oh=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),a=r/uh*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*rg((h-a)*r)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Dd(o);return r=uh/r,l.config=function(c,h){return s(t,c,h)},l},lh=function s(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:Dd(n);return i.config=function(r){return s(t,r)},i};un("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Ls(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});he.Linear.easeNone=he.none=he.Linear.easeIn;Ls("Elastic",oh("in"),oh("out"),oh());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(o){return o<e?s*o*o:o<n?s*Math.pow(o-1.5/t,2)+.75:o<i?s*(o-=2.25/t)*o+.9375:s*Math.pow(o-2.625/t,2)+.984375};Ls("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Ls("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Ls("Circ",function(s){return-(cd(1-s*s)-1)});Ls("Sine",function(s){return s===1?1:-sg(s*ng)+1});Ls("Back",lh("in"),lh("out"),lh());he.SteppedEase=he.steps=Tn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,a=1-ve;return function(o){return((i*fa(0,a,o)|0)+r)*n}}};aa.ease=he["quad.out"];un("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Ah+=s+","+s+"Params,"});var Ph=function(t,e){this.id=ig++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Eh,this.set=e?e.getSetter:Oo},ha=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,or(this,+e.duration,1,1),this.data=e.data,Ce&&(this._ctx=Ce,Ce.data.push(this)),ca||xn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,or(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(lr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Uo(this,n),!r._dp||r.parent||vd(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&li(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ve||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),md(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+id(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+id(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?ar(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-ve?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?Eo(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-ve?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||r>0&&r<o)&&this.totalTime(fa(-Math.abs(this._delay),o,r),i!==!1),No(this),mg(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{lr(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,r=this.progress()===1&&Math.abs(this._zTime)!==ve,a;if(r)for(this._tTime-=ve,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+ve){r=!1;break}a=a._next}this.totalTime(i,r)}return this},t.startTime=function(n){if(arguments.length){this._start=Ie(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&li(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(vn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Eo(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=ug);var i=Ke;return Ke=n,Ch(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ke=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,sd(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,sd(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Fn(this,n),vn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,vn(i)),this._dur||(this._zTime=-ve),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ve:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ve,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-ve)},t.eventCallback=function(n,i,r){var a=this.vars;return arguments.length>1?(i?(a[n]=i,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(a){var o=Oe(n)?n:_d,l=function(){var h=i.then;i.then=null,r&&r(),Oe(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){ea(this)},s})();En(ha.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ve,_prom:0,_ps:!1,_rts:1});var nn=(function(s){ld(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=vn(n.sortChildren),Le&&li(n.parent||Le,Ti(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&yd(Ti(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,a){return sa(0,arguments,this),this},e.from=function(i,r,a){return sa(1,arguments,this),this},e.fromTo=function(i,r,a,o){return sa(2,arguments,this),this},e.set=function(i,r,a){return r.duration=0,r.parent=this,ia(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Be(i,r,Fn(this,a),1),this},e.call=function(i,r,a){return li(this,Be.delayedCall(0,i,r),a)},e.staggerTo=function(i,r,a,o,l,c,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Be(i,a,Fn(this,l)),this},e.staggerFrom=function(i,r,a,o,l,c,h){return a.runBackwards=1,ia(a).immediateRender=vn(a.immediateRender),this.staggerTo(i,r,a,o,l,c,h)},e.staggerFromTo=function(i,r,a,o,l,c,h,d){return o.startAt=a,ia(o).immediateRender=vn(o.immediateRender),this.staggerTo(i,r,o,l,c,h,d)},e.render=function(i,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Ie(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,u,m,_,p,g,v,S,M,A,T,x;if(this!==Le&&h>l&&i>=0&&(h=l),h!==this._tTime||a||d){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),f=h,M=this._start,S=this._ts,g=!S,d&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,a);if(f=Ie(h%p),h===l?(_=this._repeat,f=c):(A=Ie(h/p),_=~~A,_&&_===A&&(f=c,_--),f>c&&(f=c)),A=ar(this._tTime,p),!o&&this._tTime&&A!==_&&this._tTime-A*p-this._dur<=0&&(A=_),T&&_&1&&(f=c-f,x=1),_!==A&&!this._lock){var b=T&&A&1,I=b===(T&&_&1);if(_<A&&(b=!b),o=b?0:h%c?c:h,this._lock=1,this.render(o||(x?0:Ie(_*p)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&An(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,A=_),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,I&&(this._lock=2,o=b?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=vg(this,Ie(o),Ie(f)),v&&(h-=f-(f=v._start))),this._tTime=h,this._time=f,this._act=!!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!r&&!A&&(An(this,"onStart"),this._tTime!==h))return this;if(f>=o&&i>=0)for(u=this._first;u;){if(m=u._next,(u._act||f>=u._start)&&u._ts&&v!==u){if(u.parent!==this)return this.render(i,r,a);if(u.render(u._ts>0?(f-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(f-u._start)*u._ts,r,a),f!==this._time||!this._ts&&!g){v=0,m&&(h+=this._zTime=-ve);break}}u=m}else{u=this._last;for(var P=i<0?i:f;u;){if(m=u._prev,(u._act||P<=u._end)&&u._ts&&v!==u){if(u.parent!==this)return this.render(i,r,a);if(u.render(u._ts>0?(P-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(P-u._start)*u._ts,r,a||Ke&&Ch(u)),f!==this._time||!this._ts&&!g){v=0,m&&(h+=this._zTime=P?-ve:ve);break}}u=m}}if(v&&!r&&(this.pause(),v.render(f>=o?0:-ve)._zTime=f>=o?1:-1,this._ts))return this._start=M,No(this),this.render(i,r,a);this._onUpdate&&!r&&An(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(M===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&ji(this,1),!r&&!(i<0&&!o)&&(h||o||!l)&&(An(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var a=this;if(Ci(r)||(r=Fn(this,r,i)),!(i instanceof ha)){if(sn(i))return i.forEach(function(o){return a.add(o,r)}),this;if(Ge(i))return this.addLabel(i,r);if(Oe(i))i=Be.delayedCall(0,i);else return this}return this!==i?li(this,i,r):this},e.getChildren=function(i,r,a,o){i===void 0&&(i=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Bn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Be?r&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===i)return r[a]},e.remove=function(i){return Ge(i)?this.removeLabel(i):Oe(i)?this.killTweensOf(i):(i.parent===this&&Do(this,i),i===this._recent&&(this._recent=this._last),Es(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ie(xn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=Fn(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,a){var o=Be.delayedCall(0,r||la,a);return o.data="isPause",this._hasPause=1,li(this,o,Fn(this,i))},e.removePause=function(i){var r=this._first;for(i=Fn(this,i);r;)r._start===i&&r.data==="isPause"&&ji(r),r=r._next},e.killTweensOf=function(i,r,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Zi!==o[l]&&o[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var a=[],o=kn(i),l=this._first,c=Ci(r),h;l;)l instanceof Be?fg(l._targets,o)&&(c?(!Zi||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(h=l.getTweensOf(o,r)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,r){r=r||{};var a=this,o=Fn(a,i),l=r,c=l.startAt,h=l.onStart,d=l.onStartParams,f=l.immediateRender,u,m=Be.to(a,En({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||ve,onStart:function(){if(a.pause(),!u){var p=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==p&&or(m,p,0,1).render(m._time,!0,!0),u=1}h&&h.apply(m,d||[])}},r));return f?m.render(0):m},e.tweenFromTo=function(i,r,a){return this.tweenTo(r,En({startAt:{time:Fn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),rd(this,Fn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),rd(this,Fn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ve)},e.shiftChildren=function(i,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Ie(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=i);return Es(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Es(this)},e.totalDuration=function(i){var r=0,a=this,o=a._last,l=Bn,c,h,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,li(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(r-=h,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Ie(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;or(a,a===Le&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(Le._ts&&(md(Le,Eo(i,Le)),pd=xn.frame),xn.frame>=ed){ed+=yn.autoSleep||120;var r=Le._first;if((!r||!r._ts)&&yn.autoSleep&&xn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||xn.sleep()}}},t})(ha);En(nn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Og=function(t,e,n,i,r,a,o){var l=new fn(this._pt,t,e,0,1,Uh,null,r),c=0,h=0,d,f,u,m,_,p,g,v;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=cr(i)),a&&(v=[n,i],a(v,t,e),n=v[0],i=v[1]),f=n.match(sh)||[];d=sh.exec(i);)m=d[0],_=i.substring(c,d.index),u?u=(u+1)%5:_.substr(-5)==="rgba("&&(u=1),m!==f[h++]&&(p=parseFloat(f[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:m.charAt(1)==="="?Is(p,m)-p:parseFloat(m)-p,m:u&&u<4?Math.round:0},c=sh.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Sh.test(i)||g)&&(l.e=0),this._pt=l,l},Ih=function(t,e,n,i,r,a,o,l,c,h){Oe(i)&&(i=i(r||0,t,a));var d=t[e],f=n!=="get"?n:Oe(d)?c?t[e.indexOf("set")||!Oe(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():d,u=Oe(d)?c?Vg:Ud:Nh,m;if(Ge(i)&&(~i.indexOf("random(")&&(i=cr(i)),i.charAt(1)==="="&&(m=Is(f,i)+(je(f)||0),(m||m===0)&&(i=m))),!h||f!==i||xh)return!isNaN(f*i)&&i!==""?(m=new fn(this._pt,t,e,+f||0,i-(f||0),typeof d=="boolean"?Hg:Od,0,u),c&&(m.fp=c),o&&m.modifier(o,this,t),this._pt=m):(!d&&!(e in t)&&Lo(e,i),Og.call(this,t,e,f,i,u,l||yn.stringFilter,c))},Fg=function(t,e,n,i,r){if(Oe(t)&&(t=ra(t,r,e,n,i)),!ci(t)||t.style&&t.nodeType||sn(t)||hd(t))return Ge(t)?ra(t,r,e,n,i):t;var a={},o;for(o in t)a[o]=ra(t[o],r,e,n,i);return a},Lh=function(t,e,n,i,r,a){var o,l,c,h;if(_n[t]&&(o=new _n[t]).init(r,o.rawVars?e[t]:Fg(e[t],i,r,a,n),n,i,a)!==!1&&(n._pt=l=new fn(n._pt,r,t,0,1,o.render,o,0,o.priority),n!==sr))for(c=n._ptLookup[n._targets.indexOf(r)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Zi,xh,Dh=function s(t,e,n){var i=t.vars,r=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,d=i.yoyoEase,f=i.keyframes,u=i.autoRevert,m=t._dur,_=t._startAt,p=t._targets,g=t.parent,v=g&&g.data==="nested"?g.vars.targets:p,S=t._overwrite==="auto"&&!vh,M=t.timeline,A=i.easeReverse||d,T,x,b,I,P,U,W,F,R,C,N,L,k;if(M&&(!f||!r)&&(r="none"),t._ease=Cs(r,aa.ease),t._rEase=A&&(Cs(A)||t._ease),t._from=!M&&!!i.runBackwards,t._from&&(t.ratio=1),!M||f&&!i.stagger){if(F=p[0]?Ki(p[0]).harness:0,L=F&&i[F.prop],T=To(i,wh),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!u?_.render(-1,!0):_.revert(h&&m?Mo:hg),_._lazy=0),a){if(ji(t._startAt=Be.set(p,En({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&vn(l),startAt:null,delay:0,onUpdate:c&&function(){return An(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ke||!o&&!u)&&t._startAt.revert(Mo),o&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&m&&!_){if(e&&(o=!1),b=En({overwrite:!1,data:"isFromStart",lazy:o&&!_&&vn(l),immediateRender:o,stagger:0,parent:g},T),L&&(b[F.prop]=L),ji(t._startAt=Be.set(p,b)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ke?t._startAt.revert(Mo):t._startAt.render(-1,!0)),t._zTime=e,!o)s(t._startAt,ve,ve);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&vn(l)||l&&!m,x=0;x<p.length;x++){if(P=p[x],W=P._gsap||Th(p)[x]._gsap,t._ptLookup[x]=C={},dh[W.id]&&Ji.length&&Ao(),N=v===p?x:v.indexOf(P),F&&(R=new F).init(P,L||T,t,N,v)!==!1&&(t._pt=I=new fn(t._pt,P,R.name,0,1,R.render,R,0,R.priority),R._props.forEach(function(z){C[z]=I}),R.priority&&(U=1)),!F||L)for(b in T)_n[b]&&(R=Lh(b,T,t,N,P,v))?R.priority&&(U=1):C[b]=I=Ih.call(t,P,b,"get",T[b],N,v,0,i.stringFilter);t._op&&t._op[x]&&t.kill(P,t._op[x]),S&&t._pt&&(Zi=t,Le.killTweensOf(P,C,t.globalTime(e)),k=!t.parent,Zi=0),t._pt&&l&&(dh[W.id]=1)}U&&Fh(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!k,f&&e<=0&&M.render(Bn,!0,!0)},Bg=function(t,e,n,i,r,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,d,f,u;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,u=t._targets.length;u--;){if(h=f[u][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return xh=1,t.vars[e]="+=0",Dh(t,o),xh=0,l?oa(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(u=c.length;u--;)d=c[u],h=d._pt||d,h.s=(i||i===0)&&!r?i:h.s+(i||0)+a*h.c,h.c=n-h.s,d.e&&(d.e=Fe(n)+je(d.e)),d.b&&(d.b=h.s+je(d.b))},kg=function(t,e){var n=t[0]?Ki(t[0]).harness:0,i=n&&n.aliases,r,a,o,l;if(!i)return e;r=rr({},e);for(a in i)if(a in r)for(l=i[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},zg=function(t,e,n,i){var r=e.ease||i||"power1.inOut",a,o;if(sn(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:r})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},ra=function(t,e,n,i,r){return Oe(t)?t.call(e,n,i,r):Ge(t)&&~t.indexOf("random(")?cr(t):t},Ro=Ah+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Nd={};un(Ro+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Nd[s]=1});Ro=Ro.split(",");var Be=(function(s){ld(t,s);function t(n,i,r,a){var o;typeof i=="number"&&(r.duration=i,i=r,r=null),o=s.call(this,a?i:ia(i))||this;var l=o.vars,c=l.duration,h=l.delay,d=l.immediateRender,f=l.stagger,u=l.overwrite,m=l.keyframes,_=l.defaults,p=l.scrollTrigger,g=i.parent||Le,v=(sn(n)||hd(n)?Ci(n[0]):"length"in i)?[n]:kn(n),S,M,A,T,x,b,I,P;if(o._targets=v.length?Th(v):oa("GSAP target "+n+" not found. https://gsap.com",!yn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=u,m||f||yo(c)||yo(h)){i=o.vars;var U=i.easeReverse||i.yoyoEase;if(S=o.timeline=new nn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:v}),S.kill(),S.parent=S._dp=Ti(o),S._start=0,f||yo(c)||yo(h)){if(T=v.length,I=f&&wd(f),ci(f))for(x in f)~Ro.indexOf(x)&&(P||(P={}),P[x]=f[x]);for(M=0;M<T;M++)A=To(i,Nd),A.stagger=0,U&&(A.easeReverse=U),P&&rr(A,P),b=v[M],A.duration=+ra(c,Ti(o),M,b,v),A.delay=(+ra(h,Ti(o),M,b,v)||0)-o._delay,!f&&T===1&&A.delay&&(o._delay=h=A.delay,o._start+=h,A.delay=0),S.to(b,A,I?I(M,b,v):0),S._ease=he.none;S.duration()?c=h=0:o.timeline=0}else if(m){ia(En(S.vars.defaults,{ease:"none"})),S._ease=Cs(m.ease||i.ease||"none");var W=0,F,R,C;if(sn(m))m.forEach(function(N){return S.to(v,N,">")}),S.duration();else{A={};for(x in m)x==="ease"||x==="easeEach"||zg(x,m[x],A,m.easeEach);for(x in A)for(F=A[x].sort(function(N,L){return N.t-L.t}),W=0,M=0;M<F.length;M++)R=F[M],C={ease:R.e,duration:(R.t-(M?F[M-1].t:0))/100*c},C[x]=R.v,S.to(v,C,W),W+=C.duration;S.duration()<c&&S.to({},{duration:c-S.duration()})}}c||o.duration(c=S.duration())}else o.timeline=0;return u===!0&&!vh&&(Zi=Ti(o),Le.killTweensOf(v),Zi=0),li(g,Ti(o),r),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!m&&o._start===Ie(g._time)&&vn(d)&&gg(Ti(o))&&g.data!=="nested")&&(o._tTime=-ve,o.render(Math.max(0,-h)||0)),p&&yd(Ti(o),p),o}var e=t.prototype;return e.render=function(i,r,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,d=i>l-ve&&!h?l:i<ve?0:i,f,u,m,_,p,g,v,S;if(!c)xg(this,i,r,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(f=d,S=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,a);if(f=Ie(d%_),d===l?(m=this._repeat,f=c):(p=Ie(d/_),m=~~p,m&&m===p?(f=c,m--):f>c&&(f=c)),g=this._yoyo&&m&1,g&&(f=c-f),p=ar(this._tTime,_),f===o&&!a&&this._initted&&m===p)return this._tTime=d,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&f!==_&&this._initted&&(this._lock=a=1,this.render(Ie(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(Md(this,h?i:f,a,r,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,r,a)}if(this._rEase){var M=f<o;if(M!==this._inv){var A=M?o:c-o;this._inv=M,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(M?-1:1)/A:0,this._invScale=M?-this.ratio:1-this.ratio,this._invEase=M?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(f/c);if(this._from&&(this.ratio=v=1-v),this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!r&&!p&&(An(this,"onStart"),this._tTime!==d))return this;for(u=this._pt;u;)u.r(v,u.d),u=u._next;S&&S.render(i<0?i:S._dur*S._ease(f/this._dur),r,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&ph(this,i,r,a),An(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!r&&this.parent&&An(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&ph(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&ji(this,1),!r&&!(h&&!o)&&(d||o||g)&&(An(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,a,o,l){ca||xn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Dh(this,c),h=this._ease(c/this._dur),Bg(this,i,r,a,o,h,c,l)?this.resetTo(i,r,a,o,1):(Uo(this,0),this.parent||xd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?ea(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ke),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Zi&&Zi.vars.overwrite!==!0)._first||ea(this),this.parent&&a!==this.timeline.totalDuration()&&or(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?kn(i):o,c=this._ptLookup,h=this._pt,d,f,u,m,_,p,g;if((!r||r==="all")&&pg(o,l))return r==="all"&&(this._pt=0),ea(this);for(d=this._op=this._op||[],r!=="all"&&(Ge(r)&&(_={},un(r,function(v){return _[v]=1}),r=_),r=kg(o,r)),g=o.length;g--;)if(~l.indexOf(o[g])){f=c[g],r==="all"?(d[g]=r,m=f,u={}):(u=d[g]=d[g]||{},m=r);for(_ in m)p=f&&f[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&Do(this,p,"_pt"),delete f[_]),u!=="all"&&(u[_]=1)}return this._initted&&!this._pt&&h&&ea(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return sa(1,arguments)},t.delayedCall=function(i,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,r,a){return sa(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,a){return Le.killTweensOf(i,r,a)},t})(ha);En(Be.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});un("staggerTo,staggerFrom,staggerFromTo",function(s){Be[s]=function(){var t=new nn,e=mh.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var Nh=function(t,e,n){return t[e]=n},Ud=function(t,e,n){return t[e](n)},Vg=function(t,e,n,i){return t[e](i.fp,n)},Gg=function(t,e,n){return t.setAttribute(e,n)},Oo=function(t,e){return Oe(t[e])?Ud:Io(t[e])&&t.setAttribute?Gg:Nh},Od=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Hg=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Uh=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Oh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Wg=function(t,e,n,i){for(var r=this._pt,a;r;)a=r._next,r.p===i&&r.modifier(t,e,n),r=a},Xg=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Do(this,e,"_pt"):e.dep||(n=1),e=i;return!n},qg=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Fh=function(t){for(var e=t._pt,n,i,r,a;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=r},fn=(function(){function s(e,n,i,r,a,o,l,c,h){this.t=n,this.s=r,this.c=a,this.p=i,this.r=o||Od,this.d=l||this,this.set=c||Nh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=qg,this.m=n,this.mt=r,this.tween=i},s})();un(Ah+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return wh[s]=1});Tn.TweenMax=Tn.TweenLite=Be;Tn.TimelineLite=Tn.TimelineMax=nn;Le=new nn({sortChildren:!1,defaults:aa,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});yn.stringFilter=Rh;var Rs=[],bo={},$g=[],od=0,Yg=0,ch=function(t){return(bo[t]||$g).map(function(e){return e()})},ua=function(){var t=Date.now(),e=[];t-od>2&&(ch("matchMediaInit"),Rs.forEach(function(n){var i=n.queries,r=n.conditions,a,o,l,c;for(o in i)a=oi.matchMedia(i[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),ch("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),od=t,ch("matchMedia"))},Fd=(function(){function s(e,n){this.selector=n&&gh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Yg++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Oe(n)&&(r=i,i=n,n=Oe);var a=this,o=function(){var c=Ce,h=a.selector,d;return c&&c!==a&&c.data.push(a),r&&(a.selector=gh(r)),Ce=a,d=i.apply(a,arguments),Oe(d)&&a._r.push(d),Ce=c,a.selector=h,a.isReverted=!1,d};return a.last=o,n===Oe?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Ce;Ce=null,n(this),Ce=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof Be&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof nn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Be)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=Rs.length;a--;)Rs[a].id===this.id&&Rs.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(ua):o.removeEventListener("change",ua)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},s})(),Zg=(function(){function s(e){this.contexts=[],this.scope=e,Ce&&Ce.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){ci(n)||(n={matches:n});var a=new Fd(0,r||this.scope),o=a.conditions={},l,c,h;Ce&&!a.selector&&(a.selector=Ce.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=oi.matchMedia(n[c]),l&&(Rs.indexOf(a)<0&&Rs.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(ua):l.addEventListener("change",ua),(a._mqs||(a._mqs=[])).push(l)));return h&&i(a,function(d){return a.add(null,d)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),Po={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Pd(i)})},timeline:function(t){return new nn(t)},getTweensOf:function(t,e){return Le.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ge(t)&&(t=kn(t)[0]);var r=Ki(t||{}).get,a=n?_d:gd;return n==="native"&&(n=""),t&&(e?a((_n[e]&&_n[e].get||r)(t,e,n,i)):function(o,l,c){return a((_n[o]&&_n[o].get||r)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=kn(t),t.length>1){var i=t.map(function(h){return rn.quickSetter(h,e,n)}),r=i.length;return function(h){for(var d=r;d--;)i[d](h)}}t=t[0]||{};var a=_n[e],o=Ki(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var d=new a;sr._pt=0,d.init(t,n?h+n:h,sr,0,[t]),d.render(1,d),sr._pt&&Oh(1,sr)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,r=rn.to(t,En((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return r.resetTo(e,l,c,h)};return a.tween=r,a},isTweening:function(t){return Le.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Cs(t.ease,aa.ease)),nd(aa,t||{})},config:function(t){return nd(yn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!_n[o]&&!Tn[o]&&oa(e+" effect requires "+o+" plugin.")}),rh[e]=function(o,l,c){return n(kn(o),En(l||{},r),c)},a&&(nn.prototype[e]=function(o,l,c){return this.add(rh[e](o,ci(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){he[t]=Cs(e)},parseEase:function(t,e){return arguments.length?Cs(t,e):he},getById:function(t){return Le.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new nn(t),i,r;for(n.smoothChildTiming=vn(t.smoothChildTiming),Le.remove(n),n._dp=0,n._time=n._tTime=Le._time,i=Le._first;i;)r=i._next,(e||!(!i._dur&&i instanceof Be&&i.vars.onComplete===i._targets[0]))&&li(n,i,i._start-i._delay),i=r;return li(Le,n,0),n},context:function(t,e){return t?new Fd(t,e):Ce},matchMedia:function(t){return new Zg(t)},matchMediaRefresh:function(){return Rs.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||ua()},addEventListener:function(t,e){var n=bo[t]||(bo[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=bo[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:Tg,wrapYoyo:Eg,distribute:wd,random:Td,snap:Ad,normalize:Ag,getUnit:je,clamp:Mg,splitColor:Id,toArray:kn,selector:gh,mapRange:Cd,pipe:bg,unitize:wg,interpolate:Cg,shuffle:bd},install:fd,effects:rh,ticker:xn,updateRoot:nn.updateRoot,plugins:_n,globalTimeline:Le,core:{PropTween:fn,globals:dd,Tween:Be,Timeline:nn,Animation:ha,getCache:Ki,_removeLinkedListItem:Do,reverting:function(){return Ke},context:function(t){return t&&Ce&&(Ce.data.push(t),t._ctx=Ce),Ce},suppressOverwrites:function(t){return vh=t}}};un("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Po[s]=Be[s]});xn.add(nn.updateRoot);sr=Po.to({},{duration:0});var Jg=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Kg=function(t,e){var n=t._targets,i,r,a;for(i in e)for(r=n.length;r--;)a=t._ptLookup[r][i],a&&(a=a.d)&&(a._pt&&(a=Jg(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[r],i))},hh=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,a){a._onInit=function(o){var l,c;if(Ge(r)&&(l={},un(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}Kg(o,r)}}}},rn=Po.registerPlugin({name:"attr",init:function(t,e,n,i,r){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Ke?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},hh("roundProps",_h),hh("modifiers"),hh("snap",Ad))||Po;Be.version=nn.version=rn.version="3.15.1";ud=1;yh()&&lr();var jg=he.Power0,Qg=he.Power1,t_=he.Power2,e_=he.Power3,n_=he.Power4,i_=he.Linear,s_=he.Quad,r_=he.Cubic,a_=he.Quart,o_=he.Quint,l_=he.Strong,c_=he.Elastic,h_=he.Back,u_=he.SteppedEase,f_=he.Bounce,d_=he.Sine,p_=he.Expo,m_=he.Circ;var Bd,ts,ur,Hh,Os,g_,kd,Wh,__=function(){return typeof window<"u"},Pi={},Us=180/Math.PI,fr=Math.PI/180,hr=Math.atan2,zd=1e8,Xh=/([A-Z])/g,x_=/(left|right|width|margin|padding|x)/i,v_=/[\s,\(]\S/,hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},kh=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},y_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},M_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},S_=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},b_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Yd=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Zd=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},w_=function(t,e,n){return t.style[e]=n},A_=function(t,e,n){return t.style.setProperty(e,n)},T_=function(t,e,n){return t._gsap[e]=n},E_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},C_=function(t,e,n,i,r){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},R_=function(t,e,n,i,r){var a=t._gsap;a[e]=n,a.renderTransform(r,a)},De="transform",Mn=De+"Origin",P_=function s(t,e){var n=this,i=this.target,r=i.style,a=i._gsap;if(t in Pi&&r){if(this.tfm=this.tfm||{},t!=="transform")t=hi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ri(i,o)}):this.tfm[t]=a.x?a[t]:Ri(i,t),t===Mn&&(this.tfm.zOrigin=a.zOrigin);else return hi.transform.split(",").forEach(function(o){return s.call(n,o,e)});if(this.props.indexOf(De)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Mn,e,"")),t=De}(r||e)&&this.props.push(t,e,r[t])},Jd=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},I_=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(Xh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=Wh(),(!r||!r.isStart)&&!n[De]&&(Jd(n),i.zOrigin&&n[Mn]&&(n[Mn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Kd=function(t,e){var n={target:t,props:[],revert:I_,save:P_};return t._gsap||rn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},jd,zh=function(t,e){var n=ts.createElementNS?ts.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ts.createElement(t);return n&&n.style?n:ts.createElement(t)},Cn=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Xh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,dr(e)||e,1)||""},Vd="O,Moz,ms,Ms,Webkit".split(","),dr=function(t,e,n){var i=e||Os,r=i.style,a=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Vd[a]+t in r););return a<0?null:(a===3?"ms":a>=0?Vd[a]:"")+t},Vh=function(){__()&&window.document&&(Bd=window,ts=Bd.document,ur=ts.documentElement,Os=zh("div")||{style:{}},g_=zh("div"),De=dr(De),Mn=De+"Origin",Os.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",jd=!!dr("perspective"),Wh=rn.core.reverting,Hh=1)},Gd=function(t){var e=t.ownerSVGElement,n=zh("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),ur.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),ur.removeChild(n),r},Hd=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Qd=function(t){var e,n;try{e=t.getBBox()}catch{e=Gd(t),n=1}return e&&(e.width||e.height)||n||(e=Gd(t)),e&&!e.width&&!e.x&&!e.y?{x:+Hd(t,["x","cx","x1"])||0,y:+Hd(t,["y","cy","y1"])||0,width:0,height:0}:e},tp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Qd(t))},ns=function(t,e){if(e){var n=t.style,i;e in Pi&&e!==Mn&&(e=De),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Xh,"-$1").toLowerCase())):n.removeAttribute(e)}},es=function(t,e,n,i,r,a){var o=new fn(t._pt,e,n,0,1,a?Zd:Yd);return t._pt=o,o.b=i,o.e=r,t._props.push(n),o},Wd={deg:1,rad:1,turn:1},L_={grid:1,flex:1},is=function s(t,e,n,i){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=Os.style,l=x_.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",u=i==="%",m,_,p,g;if(i===a||!r||Wd[i]||Wd[a])return r;if(a!=="px"&&!f&&(r=s(t,e,n,"px")),g=t.getCTM&&tp(t),(u||a==="%")&&(Pi[e]||~e.indexOf("adius")))return m=g?t.getBBox()[l?"width":"height"]:t[h],Fe(u?r/m*d:r/100*m);if(o[l?"width":"height"]=d+(f?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===ts||!_.appendChild)&&(_=ts.body),p=_._gsap,p&&u&&p.width&&l&&p.time===xn.time&&!p.uncache)return Fe(r/p.width*d);if(u&&(e==="height"||e==="width")){var v=t.style[e];t.style[e]=d+i,m=t[h],v?t.style[e]=v:ns(t,e)}else(u||a==="%")&&!L_[Cn(_,"display")]&&(o.position=Cn(t,"position")),_===t&&(o.position="static"),_.appendChild(Os),m=Os[h],_.removeChild(Os),o.position="absolute";return l&&u&&(p=Ki(_),p.time=xn.time,p.width=_[h]),Fe(f?m*r/d:m&&r?d/m*r:0)},Ri=function(t,e,n,i){var r;return Hh||Vh(),e in hi&&e!=="transform"&&(e=hi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Pi[e]&&e!=="transform"?(r=ma(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:Bo(Cn(t,Mn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=Fo[e]&&Fo[e](t,e,n)||Cn(t,e)||Eh(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?is(t,e,r,n)+n:r},D_=function(t,e,n,i){if(!n||n==="none"){var r=dr(e,t,1),a=r&&Cn(t,r,1);a&&a!==n?(e=r,n=a):e==="borderColor"&&(n=Cn(t,"borderTopColor"))}var o=new fn(this._pt,t.style,e,0,1,Uh),l=0,c=0,h,d,f,u,m,_,p,g,v,S,M,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Cn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Cn(t,e)||i,_?t.style[e]=_:ns(t,e)),h=[n,i],Rh(h),n=h[0],i=h[1],f=n.match(Ps)||[],A=i.match(Ps)||[],A.length){for(;d=Ps.exec(i);)p=d[0],v=i.substring(l,d.index),m?m=(m+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(m=1),p!==(_=f[c++]||"")&&(u=parseFloat(_)||0,M=_.substr((u+"").length),p.charAt(1)==="="&&(p=Is(u,p)+M),g=parseFloat(p),S=p.substr((g+"").length),l=Ps.lastIndex-S.length,S||(S=S||yn.units[e]||M,l===i.length&&(i+=S,o.e+=S)),M!==S&&(u=is(t,e,_,S)||0),o._pt={_next:o._pt,p:v||c===1?v:",",s:u,c:g-u,m:m&&m<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?Zd:Yd;return Sh.test(i)&&(o.e=0),this._pt=o,o},Xd={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},N_=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Xd[n]||n,e[1]=Xd[i]||i,e.join(" ")},U_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Pi[o]&&(l=1,o=o==="transformOrigin"?Mn:De),ns(n,o);l&&(ns(n,De),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ma(n,1),a.uncache=1,Jd(i)))}},Fo={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var a=t._pt=new fn(t._pt,e,n,0,0,U_);return a.u=i,a.pr=-10,a.tween=r,t._props.push(n),1}}},pa=[1,0,0,1,0,0],ep={},np=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},qd=function(t){var e=Cn(t,De);return np(e)?pa:e.substr(7).match(Mh).map(Fe)},qh=function(t,e){var n=t._gsap||Ki(t),i=t.style,r=qd(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?pa:r):(r===pa&&!t.offsetParent&&t!==ur&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,ur.appendChild(t)),r=qd(t),l?i.display=l:ns(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):ur.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Gh=function(t,e,n,i,r,a){var o=t._gsap,l=r||qh(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,d=o.xOffset||0,f=o.yOffset||0,u=l[0],m=l[1],_=l[2],p=l[3],g=l[4],v=l[5],S=e.split(" "),M=parseFloat(S[0])||0,A=parseFloat(S[1])||0,T,x,b,I;n?l!==pa&&(x=u*p-m*_)&&(b=M*(p/x)+A*(-_/x)+(_*v-p*g)/x,I=M*(-m/x)+A*(u/x)-(u*v-m*g)/x,M=b,A=I):(T=Qd(t),M=T.x+(~S[0].indexOf("%")?M/100*T.width:M),A=T.y+(~(S[1]||S[0]).indexOf("%")?A/100*T.height:A)),i||i!==!1&&o.smooth?(g=M-c,v=A-h,o.xOffset=d+(g*u+v*_)-g,o.yOffset=f+(g*m+v*p)-v):o.xOffset=o.yOffset=0,o.xOrigin=M,o.yOrigin=A,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[Mn]="0px 0px",a&&(es(a,o,"xOrigin",c,M),es(a,o,"yOrigin",h,A),es(a,o,"xOffset",d,o.xOffset),es(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",M+" "+A)},ma=function(t,e){var n=t._gsap||new Ph(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=Cn(t,Mn)||"0",h,d,f,u,m,_,p,g,v,S,M,A,T,x,b,I,P,U,W,F,R,C,N,L,k,z,X,$,ot,Tt,Y,ft;return h=d=f=_=p=g=v=S=M=0,u=m=1,n.svg=!!(t.getCTM&&tp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[De]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[De]!=="none"?l[De]:"")),i.scale=i.rotate=i.translate="none"),x=qh(t,n.svg),n.svg&&(n.uncache?(k=t.getBBox(),c=n.xOrigin-k.x+"px "+(n.yOrigin-k.y)+"px",L=""):L=!e&&t.getAttribute("data-svg-origin"),Gh(t,L||c,!!L||n.originIsAbsolute,n.smooth!==!1,x)),A=n.xOrigin||0,T=n.yOrigin||0,x!==pa&&(U=x[0],W=x[1],F=x[2],R=x[3],h=C=x[4],d=N=x[5],x.length===6?(u=Math.sqrt(U*U+W*W),m=Math.sqrt(R*R+F*F),_=U||W?hr(W,U)*Us:0,v=F||R?hr(F,R)*Us+_:0,v&&(m*=Math.abs(Math.cos(v*fr))),n.svg&&(h-=A-(A*U+T*F),d-=T-(A*W+T*R))):(ft=x[6],Tt=x[7],X=x[8],$=x[9],ot=x[10],Y=x[11],h=x[12],d=x[13],f=x[14],b=hr(ft,ot),p=b*Us,b&&(I=Math.cos(-b),P=Math.sin(-b),L=C*I+X*P,k=N*I+$*P,z=ft*I+ot*P,X=C*-P+X*I,$=N*-P+$*I,ot=ft*-P+ot*I,Y=Tt*-P+Y*I,C=L,N=k,ft=z),b=hr(-F,ot),g=b*Us,b&&(I=Math.cos(-b),P=Math.sin(-b),L=U*I-X*P,k=W*I-$*P,z=F*I-ot*P,Y=R*P+Y*I,U=L,W=k,F=z),b=hr(W,U),_=b*Us,b&&(I=Math.cos(b),P=Math.sin(b),L=U*I+W*P,k=C*I+N*P,W=W*I-U*P,N=N*I-C*P,U=L,C=k),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,g=180-g),u=Fe(Math.sqrt(U*U+W*W+F*F)),m=Fe(Math.sqrt(N*N+ft*ft)),b=hr(C,N),v=Math.abs(b)>2e-4?b*Us:0,M=Y?1/(Y<0?-Y:Y):0),n.svg&&(L=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!np(Cn(t,De)),L&&t.setAttribute("transform",L))),Math.abs(v)>90&&Math.abs(v)<270&&(r?(u*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,v+=v<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-d)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=Fe(u),n.scaleY=Fe(m),n.rotation=Fe(_)+o,n.rotationX=Fe(p)+o,n.rotationY=Fe(g)+o,n.skewX=v+o,n.skewY=S+o,n.transformPerspective=M+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Mn]=Bo(c)),n.xOffset=n.yOffset=0,n.force3D=yn.force3D,n.renderTransform=n.svg?F_:jd?ip:O_,n.uncache=0,n},Bo=function(t){return(t=t.split(" "))[0]+" "+t[1]},Bh=function(t,e,n){var i=je(e);return Fe(parseFloat(e)+parseFloat(is(t,"x",n+"px",i)))+i},O_=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,ip(t,e)},Ds="0deg",da="0px",Ns=") ",ip=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,d=n.rotationX,f=n.skewX,u=n.skewY,m=n.scaleX,_=n.scaleY,p=n.transformPerspective,g=n.force3D,v=n.target,S=n.zOrigin,M="",A=g==="auto"&&t&&t!==1||g===!0;if(S&&(d!==Ds||h!==Ds)){var T=parseFloat(h)*fr,x=Math.sin(T),b=Math.cos(T),I;T=parseFloat(d)*fr,I=Math.cos(T),a=Bh(v,a,x*I*-S),o=Bh(v,o,-Math.sin(T)*-S),l=Bh(v,l,b*I*-S+S)}p!==da&&(M+="perspective("+p+Ns),(i||r)&&(M+="translate("+i+"%, "+r+"%) "),(A||a!==da||o!==da||l!==da)&&(M+=l!==da||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Ns),c!==Ds&&(M+="rotate("+c+Ns),h!==Ds&&(M+="rotateY("+h+Ns),d!==Ds&&(M+="rotateX("+d+Ns),(f!==Ds||u!==Ds)&&(M+="skew("+f+", "+u+Ns),(m!==1||_!==1)&&(M+="scale("+m+", "+_+Ns),v.style[De]=M||"translate(0, 0)"},F_=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,d=n.scaleX,f=n.scaleY,u=n.target,m=n.xOrigin,_=n.yOrigin,p=n.xOffset,g=n.yOffset,v=n.forceCSS,S=parseFloat(a),M=parseFloat(o),A,T,x,b,I;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=fr,c*=fr,A=Math.cos(l)*d,T=Math.sin(l)*d,x=Math.sin(l-c)*-f,b=Math.cos(l-c)*f,c&&(h*=fr,I=Math.tan(c-h),I=Math.sqrt(1+I*I),x*=I,b*=I,h&&(I=Math.tan(h),I=Math.sqrt(1+I*I),A*=I,T*=I)),A=Fe(A),T=Fe(T),x=Fe(x),b=Fe(b)):(A=d,b=f,T=x=0),(S&&!~(a+"").indexOf("px")||M&&!~(o+"").indexOf("px"))&&(S=is(u,"x",a,"px"),M=is(u,"y",o,"px")),(m||_||p||g)&&(S=Fe(S+m-(m*A+_*x)+p),M=Fe(M+_-(m*T+_*b)+g)),(i||r)&&(I=u.getBBox(),S=Fe(S+i/100*I.width),M=Fe(M+r/100*I.height)),I="matrix("+A+","+T+","+x+","+b+","+S+","+M+")",u.setAttribute("transform",I),v&&(u.style[De]=I)},B_=function(t,e,n,i,r){var a=360,o=Ge(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?Us:1),c=l-i,h=i+c+"deg",d,f;return o&&(d=r.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*zd)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*zd)%a-~~(c/a)*a)),t._pt=f=new fn(t._pt,e,n,i,c,y_),f.e=h,f.u="deg",t._props.push(n),f},$d=function(t,e){for(var n in e)t[n]=e[n];return t},k_=function(t,e,n){var i=$d({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,d,f,u,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[De]=e,o=ma(n,1),ns(n,De),n.setAttribute("transform",c)):(c=getComputedStyle(n)[De],a[De]=e,o=ma(n,1),a[De]=c);for(l in Pi)c=i[l],h=o[l],c!==h&&r.indexOf(l)<0&&(u=je(c),m=je(h),d=u!==m?is(n,l,c,m):parseFloat(c),f=parseFloat(h),t._pt=new fn(t._pt,o,l,d,f-d,kh),t._pt.u=m||0,t._props.push(l));$d(o,i)};un("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",a=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(o){return t<2?s+o:"border"+o+s});Fo[t>1?"border"+s:s]=function(o,l,c,h,d){var f,u;if(arguments.length<4)return f=a.map(function(m){return Ri(o,m,c)}),u=f.join(" "),u.split(f[0]).length===5?f[0]:u;f=(h+"").split(" "),u={},a.forEach(function(m,_){return u[m]=f[_]=f[_]||f[(_-1)/2|0]}),o.init(l,u,d)}});var $h={name:"css",register:Vh,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var a=this._props,o=t.style,l=n.vars.startAt,c,h,d,f,u,m,_,p,g,v,S,M,A,T,x,b,I;Hh||Vh(),this.styles=this.styles||Kd(t),b=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(_n[_]&&Lh(_,e,n,i,t,r)))){if(u=typeof h,m=Fo[_],u==="function"&&(h=h.call(n,i,t,r),u=typeof h),u==="string"&&~h.indexOf("random(")&&(h=cr(h)),m)m(this,t,_,h,n)&&(x=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",Ei.lastIndex=0,Ei.test(c)||(p=je(c),g=je(h),g?p!==g&&(c=is(t,_,c,g)+g):p&&(h+=p)),this.add(o,"setProperty",c,h,i,r,0,0,_),a.push(_),b.push(_,0,o[_]);else if(u!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],Ge(c)&&~c.indexOf("random(")&&(c=cr(c)),je(c+"")||c==="auto"||(c+=yn.units[_]||je(Ri(t,_))||""),(c+"").charAt(1)==="="&&(c=Ri(t,_))):c=Ri(t,_),f=parseFloat(c),v=u==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),d=parseFloat(h),_ in hi&&(_==="autoAlpha"&&(f===1&&Ri(t,"visibility")==="hidden"&&d&&(f=0),b.push("visibility",0,o.visibility),es(this,o,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=hi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),S=_ in Pi,S){if(this.styles.save(_),I=h,u==="string"&&h.substring(0,6)==="var(--"){if(h=Cn(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var P=t.style.perspective;t.style.perspective=h,h=Cn(t,"perspective"),P?t.style.perspective=P:ns(t,"perspective")}d=parseFloat(h)}if(M||(A=t._gsap,A.renderTransform&&!e.parseTransform||ma(t,e.parseTransform),T=e.smoothOrigin!==!1&&A.smooth,M=this._pt=new fn(this._pt,o,De,0,1,A.renderTransform,A,0,-1),M.dep=1),_==="scale")this._pt=new fn(this._pt,A,"scaleY",A.scaleY,(v?Is(A.scaleY,v+d):d)-A.scaleY||0,kh),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){b.push(Mn,0,o[Mn]),h=N_(h),A.svg?Gh(t,h,0,T,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==A.zOrigin&&es(this,A,"zOrigin",A.zOrigin,g),es(this,o,_,Bo(c),Bo(h)));continue}else if(_==="svgOrigin"){Gh(t,h,1,T,0,this);continue}else if(_ in ep){B_(this,A,_,f,v?Is(f,v+h):h);continue}else if(_==="smoothOrigin"){es(this,A,"smooth",A.smooth,h);continue}else if(_==="force3D"){A[_]=h;continue}else if(_==="transform"){k_(this,h,t);continue}}else _ in o||(_=dr(_)||_);if(S||(d||d===0)&&(f||f===0)&&!v_.test(h)&&_ in o)p=(c+"").substr((f+"").length),d||(d=0),g=je(h)||(_ in yn.units?yn.units[_]:p),p!==g&&(f=is(t,_,c,g)),this._pt=new fn(this._pt,S?A:o,_,f,(v?Is(f,v+d):d)-f,!S&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?b_:kh),this._pt.u=g||0,S&&I!==h?(this._pt.b=c,this._pt.e=I,this._pt.r=S_):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=M_);else if(_ in o)D_.call(this,t,_,c,v?v+h:h);else if(_ in t)this.add(t,_,c||t[_],v?v+h:h,i,r);else if(_!=="parseTransform"){Lo(_,h);continue}S||(_ in o?b.push(_,0,o[_]):typeof t[_]=="function"?b.push(_,2,t[_]()):b.push(_,1,c||t[_])),a.push(_)}}x&&Fh(this)},render:function(t,e){if(e.tween._time||!Wh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ri,aliases:hi,getSetter:function(t,e,n){var i=hi[e];return i&&i.indexOf(",")<0&&(e=i),e in Pi&&e!==Mn&&(t._gsap.x||Ri(t,"x"))?n&&kd===n?e==="scale"?E_:T_:(kd=n||{})&&(e==="scale"?C_:R_):t.style&&!Io(t.style[e])?w_:~e.indexOf("-")?A_:Oo(t,e)},core:{_removeProperty:ns,_getMatrix:qh}};rn.utils.checkPrefix=dr;rn.core.getStyleSaver=Kd;(function(s,t,e,n){var i=un(s+","+t+","+e,function(r){Pi[r]=1});un(t,function(r){yn.units[r]="deg",ep[r]=1}),hi[i[13]]=s+","+t,un(n,function(r){var a=r.split(":");hi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");un("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){yn.units[s]="px"});rn.registerPlugin($h);var ui=rn.registerPlugin($h)||rn,N1=ui.core.Tween;var z_=`
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
}`,V_=`#version 300 es
void main(){ vec2 p = vec2(gl_VertexID == 2 ? 3.0 : -1.0, gl_VertexID == 0 ? -3.0 : 1.0); gl_Position = vec4(p, 0.0, 1.0); }`,G_=`#version 300 es
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
}`;async function H_(s){if(!navigator.gpu)return null;let t=await navigator.gpu.requestAdapter({powerPreference:"low-power"});if(!t)return null;let e=await t.requestDevice();e.addEventListener("uncapturederror",h=>console.warn("WebGPU \uC624\uB958:",h.error.message));let n=s.getContext("webgpu");if(!n)return null;let i=navigator.gpu.getPreferredCanvasFormat();n.configure({device:e,format:i,alphaMode:"opaque"});let r=e.createShaderModule({code:z_}),a=e.createRenderPipeline({layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),o=e.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),l=e.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}}]}),c=new Float32Array(16);return{kind:"WebGPU",lost:e.lost,draw(h){c.set(h),e.queue.writeBuffer(o,0,c);let d=e.createCommandEncoder(),f=d.beginRenderPass({colorAttachments:[{view:n.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});f.setPipeline(a),f.setBindGroup(0,l),f.draw(3),f.end(),e.queue.submit([d.finish()])}}}function sp(s){let t=s.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return null;let e=(r,a)=>{let o=t.createShader(r);return t.shaderSource(o,a),t.compileShader(o),o},n=t.createProgram();if(t.attachShader(n,e(t.VERTEX_SHADER,V_)),t.attachShader(n,e(t.FRAGMENT_SHADER,G_)),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))return null;t.useProgram(n),t.bindVertexArray(t.createVertexArray());let i=["uA","uColA","uColB","uGlow"].map(r=>t.getUniformLocation(n,r));return{kind:"WebGL2",draw(r){t.viewport(0,0,s.width,s.height),i.forEach((a,o)=>t.uniform4f(a,r[o*4],r[o*4+1],r[o*4+2],r[o*4+3])),t.drawArrays(t.TRIANGLES,0,3)}}}async function rp(s,{gpu:t=!0}={}){let e=null;if(t)try{e=await H_(s)}catch(i){console.warn("WebGPU \uC2E4\uD328, WebGL2\uB85C",i),e=null}if(!e){let i=s.cloneNode();s.replaceWith(i),s=i,e=sp(s)}let n=e?{...e,canvas:s}:{kind:"CSS",canvas:s,draw(){}};return e?.lost&&e.lost.then(()=>{let i=n.canvas.cloneNode();n.canvas.replaceWith(i);let r=sp(i);Object.assign(n,r?{...r,canvas:i}:{kind:"CSS",canvas:i,draw(){}})}),n}var Vp=0,Lu=1,Gp=2;var qs=1,Hp=2,Hr=3,gs=0,gn=1,_i=2,$s=0,Wr=1,ja=2,Du=3,Nu=4,Wp=5;var Ys=100,Xp=101,qp=102,$p=103,Yp=104,Zp=200,Jp=201,Kp=202,jp=203,Uu=204,Ou=205,Qp=206,tm=207,em=208,nm=209,im=210,sm=211,rm=212,am=213,om=214,dl=0,pl=1,ml=2,Cr=3,gl=4,_l=5,xl=6,vl=7,Fu=0,lm=1,cm=2,xi=0,Bu=1,ku=2,zu=3,Vu=4,Gu=5,Hu=6,Qa=7;var Wu=300,Zs=301,Xr=302,nc=303,ic=304,yl=1e3,di=1001,Ml=1002,Ye=1003,hm=1004;var to=1005;var mn=1006,sc=1007;var Vi=1008;var wn=1009,Xu=1010,qu=1011,qr=1012,rc=1013,Jn=1014,Kn=1015,jn=1016,ac=1017,oc=1018,Js=1020,$u=35902,Yu=35899,Zu=1021,Ju=1022,Qn=1023,Bi=1026,Gi=1027,Ku=1028,lc=1029,_s=1030,cc=1031;var hc=1033,eo=33776,no=33777,io=33778,so=33779,uc=35840,fc=35841,dc=35842,pc=35843,mc=36196,gc=37492,_c=37496,xc=37488,vc=37489,ro=37490,yc=37491,Mc=37808,Sc=37809,bc=37810,wc=37811,Ac=37812,Tc=37813,Ec=37814,Cc=37815,Rc=37816,Pc=37817,Ic=37818,Lc=37819,Dc=37820,Nc=37821,Uc=36492,Oc=36494,Fc=36495,Bc=36283,kc=36284,ao=36285,zc=36286;var Aa=2300,Sl=2301,ul=2302,yu=2303,Mu=2400,Su=2401,bu=2402;var um=3200;var Vc=0,fm=1,Hi="",dn="srgb",Ta="srgb-linear",Ea="linear",_e="srgb";var fl=7680;var dm=519,pm=512,mm=513,gm=514,ju=515,_m=516,xm=517,Qu=518,tf=519,vm=35044;var ef="300 es",Vn=2e3,Rr=2001;function W_(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function X_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ca(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ym(){let s=Ca("canvas");return s.style.display="block",s}var ap={},Pr=null;function nf(...s){let t="THREE."+s.shift();Pr?Pr("log",t,...s):console.log(t,...s)}function Mm(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Yt(...s){s=Mm(s);let t="THREE."+s.shift();if(Pr)Pr("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Jt(...s){s=Mm(s);let t="THREE."+s.shift();if(Pr)Pr("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Sa(...s){let t=s.join(" ");t in ap||(ap[t]=!0,Yt(...s))}function Sm(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var bm={[dl]:dl,[ml]:xl,[gl]:gl,[Cr]:_l,[pl]:pl,[xl]:ml,[vl]:vl,[_l]:Cr},mi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Yh=Math.PI/180,bl=180/Math.PI;function $r(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[s&255]+an[s>>8&255]+an[s>>16&255]+an[s>>24&255]+"-"+an[t&255]+an[t>>8&255]+"-"+an[t>>16&15|64]+an[t>>24&255]+"-"+an[e&63|128]+an[e>>8&255]+"-"+an[e>>16&255]+an[e>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function re(s,t,e){return Math.max(t,Math.min(e,s))}function q_(s,t){return(s%t+t)%t}function Zh(s,t,e){return(1-e)*s+e*t}function wm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function sf(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function $_(s,t){if(t.constructor===Float32Array)return s;let e=sf(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function Y_(s,t){if(t.constructor===Float32Array)return s;let e=sf(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var hf=class hf{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};hf.prototype.isVector2=!0;var Lt=hf,gi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],f=r[a+0],u=r[a+1],m=r[a+2],_=r[a+3];if(d!==_||l!==f||c!==u||h!==m){let p=l*f+c*u+h*m+d*_;p<0&&(f=-f,u=-u,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){let v=Math.acos(p),S=Math.sin(v);g=Math.sin(g*v)/S,o=Math.sin(o*v)/S,l=l*g+f*o,c=c*g+u*o,h=h*g+m*o,d=d*g+_*o}else{l=l*g+f*o,c=c*g+u*o,h=h*g+m*o,d=d*g+_*o;let v=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=v,c*=v,h*=v,d*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],f=r[a+1],u=r[a+2],m=r[a+3];return t[e]=o*m+h*d+l*u-c*f,t[e+1]=l*m+h*f+c*d-o*u,t[e+2]=c*m+h*u+o*f-l*d,t[e+3]=h*m-o*d-l*f-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),f=l(n/2),u=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=f*h*d+c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d-f*u*m;break;case"YXZ":this._x=f*h*d+c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d+f*u*m;break;case"ZXY":this._x=f*h*d-c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d-f*u*m;break;case"ZYX":this._x=f*h*d-c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d+f*u*m;break;case"YZX":this._x=f*h*d+c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d-f*u*m;break;case"XZY":this._x=f*h*d-c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d+f*u*m;break;default:Yt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],f=n+o+d;if(f>0){let u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-i)*u}else if(n>o&&n>d){let u=2*Math.sqrt(1+n-o-d);this._w=(h-l)/u,this._x=.25*u,this._y=(i+a)/u,this._z=(r+c)/u}else if(o>d){let u=2*Math.sqrt(1+o-n-d);this._w=(r-c)/u,this._x=(i+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+d-n-o);this._w=(a-i)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},uf=class uf{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(op.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(op.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=i+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Jh.copy(this).projectOnVector(t),this.sub(Jh)}reflect(t){return this.sub(Jh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};uf.prototype.isVector3=!0;var H=uf,Jh=new H,op=new gi,ff=class ff{constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],u=n[5],m=n[8],_=i[0],p=i[3],g=i[6],v=i[1],S=i[4],M=i[7],A=i[2],T=i[5],x=i[8];return r[0]=a*_+o*v+l*A,r[3]=a*p+o*S+l*T,r[6]=a*g+o*M+l*x,r[1]=c*_+h*v+d*A,r[4]=c*p+h*S+d*T,r[7]=c*g+h*M+d*x,r[2]=f*_+u*v+m*A,r[5]=f*p+u*S+m*T,r[8]=f*g+u*M+m*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,f=o*l-h*r,u=c*r-a*l,m=e*d+n*f+i*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=f*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=u*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Sa("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Kh.makeScale(t,e)),this}rotate(t){return Sa("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Kh.makeRotation(-t)),this}translate(t,e){return Sa("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Kh.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};ff.prototype.isMatrix3=!0;var Qt=ff,Kh=new Qt,lp=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cp=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Z_(){let s={enabled:!0,workingColorSpace:Ta,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_e&&(i.r=Fi(i.r),i.g=Fi(i.g),i.b=Fi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_e&&(i.r=Er(i.r),i.g=Er(i.g),i.b=Er(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Hi?Ea:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ta]:{primaries:t,whitePoint:n,transfer:Ea,toXYZ:lp,fromXYZ:cp,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:dn},outputColorSpaceConfig:{drawingBufferColorSpace:dn}},[dn]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:lp,fromXYZ:cp,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:dn}}}),s}var ce=Z_();function Fi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Er(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var pr,wl=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{pr===void 0&&(pr=Ca("canvas")),pr.width=t.width,pr.height=t.height;let i=pr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=pr}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ca("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Fi(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fi(e[n]/255)*255):e[n]=Fi(e[n]);return{data:e,width:t.width,height:t.height}}else return Yt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},J_=0,Ir=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=$r(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(jh(i[a].image)):r.push(jh(i[a]))}else r=jh(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function jh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?wl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Yt("Texture: Unable to serialize Texture."),{})}var K_=0,Qh=new H,Sn=class s extends mi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=di,i=di,r=mn,a=Vi,o=Qn,l=wn,c=s.DEFAULT_ANISOTROPY,h=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=$r(),this.name="",this.source=new Ir(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Lt(0,0),this.repeat=new Lt(1,1),this.center=new Lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Qh).x}get height(){return this.source.getSize(Qh).y}get depth(){return this.source.getSize(Qh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Yt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Yt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case yl:t.x=t.x-Math.floor(t.x);break;case di:t.x=t.x<0?0:1;break;case Ml:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case yl:t.y=t.y-Math.floor(t.y);break;case di:t.y=t.y<0?0:1;break;case Ml:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Wu;Sn.DEFAULT_ANISOTROPY=1;var df=class df{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],d=l[8],f=l[1],u=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,M=(u+1)/2,A=(g+1)/2,T=(h+f)/4,x=(d+_)/4,b=(m+p)/4;return S>M&&S>A?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=T/n,r=x/n):M>A?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=T/i,r=b/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=x/r,i=b/r),this.set(n,i,r,e),this}let v=Math.sqrt((p-m)*(p-m)+(d-_)*(d-_)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(d-_)/v,this.z=(f-h)/v,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};df.prototype.isVector4=!0;var Re=df,Al=class extends mi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new Sn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Ir(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},In=class extends Al{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ra=class extends Sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Tl=class extends Sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ec=class ec{constructor(t,e,n,i,r,a,o,l,c,h,d,f,u,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,d,f,u,m,_,p)}set(t,e,n,i,r,a,o,l,c,h,d,f,u,m,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=f,g[3]=u,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ec().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/mr.setFromMatrixColumn(t,0).length(),r=1/mr.setFromMatrixColumn(t,1).length(),a=1/mr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let f=a*h,u=a*d,m=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=u+m*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=m+u*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*h,u=l*d,m=c*h,_=c*d;e[0]=f+_*o,e[4]=m*o-u,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=u*o-m,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*h,u=l*d,m=c*h,_=c*d;e[0]=f-_*o,e[4]=-a*d,e[8]=m+u*o,e[1]=u+m*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*h,u=a*d,m=o*h,_=o*d;e[0]=l*h,e[4]=m*c-u,e[8]=f*c+_,e[1]=l*d,e[5]=_*c+f,e[9]=u*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,u=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-f*d,e[8]=m*d+u,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=u*d+m,e[10]=f-_*d}else if(t.order==="XZY"){let f=a*l,u=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=f*d+_,e[5]=a*h,e[9]=u*d-m,e[2]=m*d-u,e[6]=o*h,e[10]=_*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(j_,t,Q_)}lookAt(t,e,n){let i=this.elements;return Rn.subVectors(t,e),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),ss.crossVectors(n,Rn),ss.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),ss.crossVectors(n,Rn)),ss.normalize(),ko.crossVectors(Rn,ss),i[0]=ss.x,i[4]=ko.x,i[8]=Rn.x,i[1]=ss.y,i[5]=ko.y,i[9]=Rn.y,i[2]=ss.z,i[6]=ko.z,i[10]=Rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],u=n[13],m=n[2],_=n[6],p=n[10],g=n[14],v=n[3],S=n[7],M=n[11],A=n[15],T=i[0],x=i[4],b=i[8],I=i[12],P=i[1],U=i[5],W=i[9],F=i[13],R=i[2],C=i[6],N=i[10],L=i[14],k=i[3],z=i[7],X=i[11],$=i[15];return r[0]=a*T+o*P+l*R+c*k,r[4]=a*x+o*U+l*C+c*z,r[8]=a*b+o*W+l*N+c*X,r[12]=a*I+o*F+l*L+c*$,r[1]=h*T+d*P+f*R+u*k,r[5]=h*x+d*U+f*C+u*z,r[9]=h*b+d*W+f*N+u*X,r[13]=h*I+d*F+f*L+u*$,r[2]=m*T+_*P+p*R+g*k,r[6]=m*x+_*U+p*C+g*z,r[10]=m*b+_*W+p*N+g*X,r[14]=m*I+_*F+p*L+g*$,r[3]=v*T+S*P+M*R+A*k,r[7]=v*x+S*U+M*C+A*z,r[11]=v*b+S*W+M*N+A*X,r[15]=v*I+S*F+M*L+A*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],f=t[10],u=t[14],m=t[3],_=t[7],p=t[11],g=t[15],v=l*u-c*f,S=o*u-c*d,M=o*f-l*d,A=a*u-c*h,T=a*f-l*h,x=a*d-o*h;return e*(_*v-p*S+g*M)-n*(m*v-p*A+g*T)+i*(m*S-_*A+g*x)-r*(m*M-_*T+p*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],f=t[10],u=t[11],m=t[12],_=t[13],p=t[14],g=t[15],v=e*o-n*a,S=e*l-i*a,M=e*c-r*a,A=n*l-i*o,T=n*c-r*o,x=i*c-r*l,b=h*_-d*m,I=h*p-f*m,P=h*g-u*m,U=d*p-f*_,W=d*g-u*_,F=f*g-u*p,R=v*F-S*W+M*U+A*P-T*I+x*b;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/R;return t[0]=(o*F-l*W+c*U)*C,t[1]=(i*W-n*F-r*U)*C,t[2]=(_*x-p*T+g*A)*C,t[3]=(f*T-d*x-u*A)*C,t[4]=(l*P-a*F-c*I)*C,t[5]=(e*F-i*P+r*I)*C,t[6]=(p*M-m*x-g*S)*C,t[7]=(h*x-f*M+u*S)*C,t[8]=(a*W-o*P+c*b)*C,t[9]=(n*P-e*W-r*b)*C,t[10]=(m*T-_*M+g*v)*C,t[11]=(d*M-h*T-u*v)*C,t[12]=(o*I-a*U-l*b)*C,t[13]=(e*U-n*I+i*b)*C,t[14]=(_*S-m*A-p*v)*C,t[15]=(h*A-d*S+f*v)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,f=r*c,u=r*h,m=r*d,_=a*h,p=a*d,g=o*d,v=l*c,S=l*h,M=l*d,A=n.x,T=n.y,x=n.z;return i[0]=(1-(_+g))*A,i[1]=(u+M)*A,i[2]=(m-S)*A,i[3]=0,i[4]=(u-M)*T,i[5]=(1-(f+g))*T,i[6]=(p+v)*T,i[7]=0,i[8]=(m+S)*x,i[9]=(p-v)*x,i[10]=(1-(f+_))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=mr.set(i[0],i[1],i[2]).length(),o=mr.set(i[4],i[5],i[6]).length(),l=mr.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Xn.copy(this);let c=1/a,h=1/o,d=1/l;return Xn.elements[0]*=c,Xn.elements[1]*=c,Xn.elements[2]*=c,Xn.elements[4]*=h,Xn.elements[5]*=h,Xn.elements[6]*=h,Xn.elements[8]*=d,Xn.elements[9]*=d,Xn.elements[10]*=d,e.setFromRotationMatrix(Xn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Vn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-i),f=(e+t)/(e-t),u=(n+i)/(n-i),m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===Vn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Rr)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Vn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),f=-(e+t)/(e-t),u=-(n+i)/(n-i),m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===Vn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Rr)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ec.prototype.isMatrix4=!0;var be=ec,mr=new H,Xn=new be,j_=new H(0,0,0),Q_=new H(1,1,1),ss=new H,ko=new H,Rn=new H,hp=new be,up=new gi,ki=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],f=i[6],u=i[10];switch(e){case"XYZ":this._y=Math.asin(re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(re(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-re(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Yt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return up.setFromEuler(this),this.setFromQuaternion(up,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ki.DEFAULT_ORDER="XYZ";var Pa=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},tx=0,fp=new H,gr=new gi,Ii=new be,zo=new H,ga=new H,ex=new H,nx=new gi,dp=new H(1,0,0),pp=new H(0,1,0),mp=new H(0,0,1),gp={type:"added"},ix={type:"removed"},_r={type:"childadded",child:null},tu={type:"childremoved",child:null},Ze=class s extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=$r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new H,e=new ki,n=new gi,i=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new be},normalMatrix:{value:new Qt}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return gr.setFromAxisAngle(t,e),this.quaternion.multiply(gr),this}rotateOnWorldAxis(t,e){return gr.setFromAxisAngle(t,e),this.quaternion.premultiply(gr),this}rotateX(t){return this.rotateOnAxis(dp,t)}rotateY(t){return this.rotateOnAxis(pp,t)}rotateZ(t){return this.rotateOnAxis(mp,t)}translateOnAxis(t,e){return fp.copy(t).applyQuaternion(this.quaternion),this.position.add(fp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dp,t)}translateY(t){return this.translateOnAxis(pp,t)}translateZ(t){return this.translateOnAxis(mp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ii.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?zo.copy(t):zo.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ii.lookAt(ga,zo,this.up):Ii.lookAt(zo,ga,this.up),this.quaternion.setFromRotationMatrix(Ii),i&&(Ii.extractRotation(i.matrixWorld),gr.setFromRotationMatrix(Ii),this.quaternion.premultiply(gr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gp),_r.child=t,this.dispatchEvent(_r),_r.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ix),tu.child=t,this.dispatchEvent(tu),tu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gp),_r.child=t,this.dispatchEvent(_r),_r.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,t,ex),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,nx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),f=a(t.skeletons),u=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ze.DEFAULT_UP=new H(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Oi=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},sx={type:"move"},Lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),u=.02,m=.005;c.inputState.pinching&&f>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sx)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Oi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Am={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},Vo={h:0,s:0,l:0};function eu(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var ee=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=dn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ce.workingColorSpace){if(t=q_(t,1),e=re(e,0,1),n=re(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=eu(a,r,t+1/3),this.g=eu(a,r,t),this.b=eu(a,r,t-1/3)}return ce.colorSpaceToWorking(this,i),this}setStyle(t,e=dn){function n(r){r!==void 0&&parseFloat(r)<1&&Yt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Yt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Yt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=dn){let n=Am[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Yt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}copyLinearToSRGB(t){return this.r=Er(t.r),this.g=Er(t.g),this.b=Er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=dn){return ce.workingToColorSpace(on.copy(this),t),Math.round(re(on.r*255,0,255))*65536+Math.round(re(on.g*255,0,255))*256+Math.round(re(on.b*255,0,255))}getHexString(t=dn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(on.copy(this),e);let n=on.r,i=on.g,r=on.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=dn){ce.workingToColorSpace(on.copy(this),t);let e=on.r,n=on.g,i=on.b;return t!==dn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(rs),this.setHSL(rs.h+t,rs.s+e,rs.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(rs),t.getHSL(Vo);let n=Zh(rs.h,Vo.h,e),i=Zh(rs.s,Vo.s,e),r=Zh(rs.l,Vo.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new ee;ee.NAMES=Am;var Ia=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},qn=new H,Li=new H,nu=new H,Di=new H,xr=new H,vr=new H,_p=new H,iu=new H,su=new H,ru=new H,au=new Re,ou=new Re,lu=new Re,cs=class s{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),qn.subVectors(t,e),i.cross(qn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){qn.subVectors(i,e),Li.subVectors(n,e),nu.subVectors(t,e);let a=qn.dot(qn),o=qn.dot(Li),l=qn.dot(nu),c=Li.dot(Li),h=Li.dot(nu),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,u=(c*l-o*h)*f,m=(a*h-o*l)*f;return r.set(1-u-m,m,u)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Di.x),l.addScaledVector(a,Di.y),l.addScaledVector(o,Di.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return au.setScalar(0),ou.setScalar(0),lu.setScalar(0),au.fromBufferAttribute(t,e),ou.fromBufferAttribute(t,n),lu.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(au,r.x),a.addScaledVector(ou,r.y),a.addScaledVector(lu,r.z),a}static isFrontFacing(t,e,n,i){return qn.subVectors(n,e),Li.subVectors(t,e),qn.cross(Li).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qn.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),qn.cross(Li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;xr.subVectors(i,n),vr.subVectors(r,n),iu.subVectors(t,n);let l=xr.dot(iu),c=vr.dot(iu);if(l<=0&&c<=0)return e.copy(n);su.subVectors(t,i);let h=xr.dot(su),d=vr.dot(su);if(h>=0&&d<=h)return e.copy(i);let f=l*d-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(xr,a);ru.subVectors(t,r);let u=xr.dot(ru),m=vr.dot(ru);if(m>=0&&u<=m)return e.copy(r);let _=u*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(vr,o);let p=h*m-u*d;if(p<=0&&d-h>=0&&u-m>=0)return _p.subVectors(r,i),o=(d-h)/(d-h+(u-m)),e.copy(i).addScaledVector(_p,o);let g=1/(p+_+f);return a=_*g,o=f*g,e.copy(n).addScaledVector(xr,a).addScaledVector(vr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},hs=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint($n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint($n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=$n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,$n):$n.fromBufferAttribute(r,a),$n.applyMatrix4(t.matrixWorld),this.expandByPoint($n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Go.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Go.copy(n.boundingBox)),Go.applyMatrix4(t.matrixWorld),this.union(Go)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,$n),$n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(_a),Ho.subVectors(this.max,_a),yr.subVectors(t.a,_a),Mr.subVectors(t.b,_a),Sr.subVectors(t.c,_a),as.subVectors(Mr,yr),os.subVectors(Sr,Mr),Fs.subVectors(yr,Sr);let e=[0,-as.z,as.y,0,-os.z,os.y,0,-Fs.z,Fs.y,as.z,0,-as.x,os.z,0,-os.x,Fs.z,0,-Fs.x,-as.y,as.x,0,-os.y,os.x,0,-Fs.y,Fs.x,0];return!cu(e,yr,Mr,Sr,Ho)||(e=[1,0,0,0,1,0,0,0,1],!cu(e,yr,Mr,Sr,Ho))?!1:(Wo.crossVectors(as,os),e=[Wo.x,Wo.y,Wo.z],cu(e,yr,Mr,Sr,Ho))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,$n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize($n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ni),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ni=[new H,new H,new H,new H,new H,new H,new H,new H],$n=new H,Go=new hs,yr=new H,Mr=new H,Sr=new H,as=new H,os=new H,Fs=new H,_a=new H,Ho=new H,Wo=new H,Bs=new H;function cu(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Bs.fromArray(s,r);let o=i.x*Math.abs(Bs.x)+i.y*Math.abs(Bs.y)+i.z*Math.abs(Bs.z),l=t.dot(Bs),c=e.dot(Bs),h=n.dot(Bs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var ze=new H,Xo=new Lt,rx=0,pi=class extends mi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=vm,this.updateRanges=[],this.gpuType=Kn,this.version=0,this._normalizationScale=t!==void 0?sf(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Xo.fromBufferAttribute(this,e),Xo.applyMatrix3(t),this.setXY(e,Xo.x,Xo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):$_(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Y_(t,this.array)}};var La=class extends pi{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Da=class extends pi{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ue=class extends pi{constructor(t,e,n){super(new Float32Array(t),e,n)}},ax=new hs,xa=new H,hu=new H,us=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ax.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xa.subVectors(t,this.center);let e=xa.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(xa,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xa.copy(t.center).add(hu)),this.expandByPoint(xa.copy(t.center).sub(hu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ox=0,zn=new be,uu=new Ze,br=new H,Pn=new hs,va=new hs,$e=new H,bn=class s extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ox++}),this.uuid=$r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(W_(t)?Da:La)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return zn.makeRotationFromQuaternion(t),this.applyMatrix4(zn),this}rotateX(t){return zn.makeRotationX(t),this.applyMatrix4(zn),this}rotateY(t){return zn.makeRotationY(t),this.applyMatrix4(zn),this}rotateZ(t){return zn.makeRotationZ(t),this.applyMatrix4(zn),this}translate(t,e,n){return zn.makeTranslation(t,e,n),this.applyMatrix4(zn),this}scale(t,e,n){return zn.makeScale(t,e,n),this.applyMatrix4(zn),this}lookAt(t){return uu.lookAt(t),uu.updateMatrix(),this.applyMatrix4(uu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(br).negate(),this.translate(br.x,br.y,br.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Yt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Pn.setFromBufferAttribute(r),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(Pn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];va.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(Pn.min,va.min),Pn.expandByPoint($e),$e.addVectors(Pn.max,va.max),Pn.expandByPoint($e)):(Pn.expandByPoint(va.min),Pn.expandByPoint(va.max))}Pn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)$e.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared($e));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$e.fromBufferAttribute(o,c),l&&(br.fromBufferAttribute(t,c),$e.add(br)),i=Math.max(i,n.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new pi(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let I=0;I<n.count;I++)o[I]=new H,l[I]=new H;let h=new H,d=new H,f=new H,u=new Lt,m=new Lt,_=new Lt,p=new H,g=new H;function v(I,P,U){c[I]=c[P]=c[U]=1,h.fromBufferAttribute(n,I),d.fromBufferAttribute(n,P),f.fromBufferAttribute(n,U),u.fromBufferAttribute(r,I),m.fromBufferAttribute(r,P),_.fromBufferAttribute(r,U),d.sub(h),f.sub(h),m.sub(u),_.sub(u);let W=1/(m.x*_.y-_.x*m.y);isFinite(W)&&(p.copy(d).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(W),g.copy(f).multiplyScalar(m.x).addScaledVector(d,-_.x).multiplyScalar(W),o[I].add(p),o[P].add(p),o[U].add(p),l[I].add(g),l[P].add(g),l[U].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let I=0,P=S.length;I<P;++I){let U=S[I],W=U.start,F=U.count;for(let R=W,C=W+F;R<C;R+=3)v(t.getX(R+0),t.getX(R+1),t.getX(R+2))}let M=new H,A=new H,T=new H,x=new H;function b(I){T.fromBufferAttribute(i,I),x.copy(T);let P=o[I];M.copy(P),M.sub(T.multiplyScalar(T.dot(P))).normalize(),A.crossVectors(x,P);let W=A.dot(l[I])<0?-1:1;a.setXYZW(I,M.x,M.y,M.z,W)}for(let I=0,P=n.count;I<P;++I)c[I]&&b(I);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new pi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,u=n.count;f<u;f++)n.setXYZ(f,0,0,0);let i=new H,r=new H,a=new H,o=new H,l=new H,c=new H,h=new H,d=new H;if(t)for(let f=0,u=t.count;f<u;f+=3){let m=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,u=e.count;f<u;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h),u=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?u=l[_]*o.data.stride+o.offset:u=l[_]*h;for(let g=0;g<h;g++)f[m++]=c[u++]}return new pi(f,h,d)}if(this.index===null)return Yt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let f=c[h],u=t(f,n);l.push(u)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){let u=c[d];h.push(u.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let f=0,u=d.length;f<u;f++)h.push(d[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var fu=new H,lx=new H,cx=new Qt,Yn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=fu.subVectors(n,e).cross(lx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(fu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||cx.getNormalMatrix(t),i=this.coplanarPoint(fu).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},hx=0,Zn=class extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hx++}),this.uuid=$r(),this.name="",this.type="Material",this.blending=Wr,this.side=gs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uu,this.blendDst=Ou,this.blendEquation=Ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=Cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fl,this.stencilZFail=fl,this.stencilZPass=fl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Yt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Yt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Yn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Lt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Lt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Ui=new H,du=new H,qo=new H,$o=new H,Dr=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ui.copy(this.origin).addScaledVector(this.direction,e),Ui.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){du.copy(t).add(e).multiplyScalar(.5),qo.copy(e).sub(t).normalize(),$o.copy(this.origin).sub(du);let r=t.distanceTo(e)*.5,a=-this.direction.dot(qo),o=$o.dot(this.direction),l=-$o.dot(qo),c=$o.lengthSq(),h=Math.abs(1-a*a),d,f,u,m;if(h>0)if(d=a*l-o,f=a*o-l,m=r*h,d>=0)if(f>=-m)if(f<=m){let _=1/h;d*=_,f*=_,u=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;else f<=-m?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),u=-d*d+f*(f+2*l)+c):f<=m?(d=0,f=Math.min(Math.max(-r,-l),r),u=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),u=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(du).addScaledVector(qo,f),u}intersectSphere(t,e){if(t.radius<0)return null;Ui.subVectors(t.center,this.origin);let n=Ui.dot(this.direction),i=Ui.dot(Ui)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ui)!==null}intersectTriangle(t,e,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,f=t.y-a.y,u=t.z-a.z,m=e.x-a.x,_=e.y-a.y,p=e.z-a.z,g=n.x-a.x,v=n.y-a.y,S=n.z-a.z,M=Math.abs(l),A=Math.abs(c),T=Math.abs(h),x,b,I,P,U,W,F,R,C,N,L,k;if(M>=A&&M>=T?(I=l,W=d,C=m,k=g,l>=0?(x=c,b=h,P=f,U=u,F=_,R=p,N=v,L=S):(x=h,b=c,P=u,U=f,F=p,R=_,N=S,L=v)):A>=T?(I=c,W=f,C=_,k=v,c>=0?(x=h,b=l,P=u,U=d,F=p,R=m,N=S,L=g):(x=l,b=h,P=d,U=u,F=m,R=p,N=g,L=S)):(I=h,W=u,C=p,k=S,h>=0?(x=l,b=c,P=d,U=f,F=m,R=_,N=g,L=v):(x=c,b=l,P=f,U=d,F=_,R=m,N=v,L=g)),I===0)return null;let z=x/I,X=b/I,$=1/I,ot=P-z*W,Tt=U-X*W,Y=F-z*C,ft=R-X*C,At=N-z*k,Pt=L-X*k,mt=At*ft-Pt*Y,Bt=ot*Pt-Tt*At,Kt=Y*Tt-ft*ot;if(i){if(mt<0||Bt<0||Kt<0)return null}else if((mt<0||Bt<0||Kt<0)&&(mt>0||Bt>0||Kt>0))return null;let zt=mt+Bt+Kt;if(zt===0)return null;let Zt=$*(mt*W+Bt*C+Kt*k);return(zt>0?Zt<0:Zt>0)?null:this.at(Zt/zt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},El=class extends Zn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Fu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},xp=new be,ks=new Dr,Yo=new us,vp=new H,Zo=new H,Jo=new H,Ko=new H,pu=new H,jo=new H,yp=new H,Qo=new H,Ln=class extends Ze{constructor(t=new bn,e=new El){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){jo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(pu.fromBufferAttribute(d,t),a?jo.addScaledVector(pu,h):jo.addScaledVector(pu.sub(e),h))}e.add(jo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yo.copy(n.boundingSphere),Yo.applyMatrix4(r),ks.copy(t.ray).recast(t.near),!(Yo.containsPoint(ks.origin)===!1&&(ks.intersectSphere(Yo,vp)===null||ks.origin.distanceToSquared(vp)>(t.far-t.near)**2))&&(xp.copy(r).invert(),ks.copy(t.ray).applyMatrix4(xp),!(n.boundingBox!==null&&ks.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ks)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let p=f[m],g=a[p.materialIndex],v=Math.max(p.start,u.start),S=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let M=v,A=S;M<A;M+=3){let T=o.getX(M),x=o.getX(M+1),b=o.getX(M+2);i=tl(this,g,t,n,c,h,d,T,x,b),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,u.start),_=Math.min(o.count,u.start+u.count);for(let p=m,g=_;p<g;p+=3){let v=o.getX(p),S=o.getX(p+1),M=o.getX(p+2);i=tl(this,a,t,n,c,h,d,v,S,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let p=f[m],g=a[p.materialIndex],v=Math.max(p.start,u.start),S=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let M=v,A=S;M<A;M+=3){let T=M,x=M+1,b=M+2;i=tl(this,g,t,n,c,h,d,T,x,b),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,u.start),_=Math.min(l.count,u.start+u.count);for(let p=m,g=_;p<g;p+=3){let v=p,S=p+1,M=p+2;i=tl(this,a,t,n,c,h,d,v,S,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function ux(s,t,e,n,i,r,a,o){let l;if(t.side===gn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===gs,o),l===null)return null;Qo.copy(o),Qo.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Qo);return c<e.near||c>e.far?null:{distance:c,point:Qo.clone(),object:s}}function tl(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Zo),s.getVertexPosition(l,Jo),s.getVertexPosition(c,Ko);let h=ux(s,t,e,n,Zo,Jo,Ko,yp);if(h){let d=new H;cs.getBarycoord(yp,Zo,Jo,Ko,d),i&&(h.uv=cs.getInterpolatedAttribute(i,o,l,c,d,new Lt)),r&&(h.uv1=cs.getInterpolatedAttribute(r,o,l,c,d,new Lt)),a&&(h.normal=cs.getInterpolatedAttribute(a,o,l,c,d,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new H,materialIndex:0};cs.getNormal(Zo,Jo,Ko,f.normal),h.face=f,h.barycoord=d}return h}var Cl=class extends Sn{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ye,h=Ye,d,f){super(null,a,o,l,c,h,i,r,d,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zs=new us,fx=new Lt(.5,.5),el=new H,fs=class{constructor(t=new Yn,e=new Yn,n=new Yn,i=new Yn,r=new Yn,a=new Yn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn,n=!1){let i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],f=r[6],u=r[7],m=r[8],_=r[9],p=r[10],g=r[11],v=r[12],S=r[13],M=r[14],A=r[15];if(i[0].setComponents(c-a,u-h,g-m,A-v).normalize(),i[1].setComponents(c+a,u+h,g+m,A+v).normalize(),i[2].setComponents(c+o,u+d,g+_,A+S).normalize(),i[3].setComponents(c-o,u-d,g-_,A-S).normalize(),n)i[4].setComponents(l,f,p,M).normalize(),i[5].setComponents(c-l,u-f,g-p,A-M).normalize();else if(i[4].setComponents(c-l,u-f,g-p,A-M).normalize(),e===Vn)i[5].setComponents(c+l,u+f,g+p,A+M).normalize();else if(e===Rr)i[5].setComponents(l,f,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zs)}intersectsSprite(t){zs.center.set(0,0,0);let e=fx.distanceTo(t.center);return zs.radius=.7071067811865476+e,zs.applyMatrix4(t.matrixWorld),this.intersectsSphere(zs)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(el.x=i.normal.x>0?t.max.x:t.min.x,el.y=i.normal.y>0?t.max.y:t.min.y,el.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(el)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Mp=new be,Rl=class s{constructor(){this.coordinateSystem=Vn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];Mp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new fs),n[i].setFromProjectionMatrix(Mp,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new fs),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};var Gs=class extends Zn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Pl=new H,Il=new H,Sp=new be,ya=new Dr,nl=new us,mu=new H,bp=new H,Ll=class extends Ze{constructor(t=new bn,e=new Gs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Pl.fromBufferAttribute(e,i-1),Il.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Pl.distanceTo(Il);t.setAttribute("lineDistance",new Ue(n,1))}else Yt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nl.copy(n.boundingSphere),nl.applyMatrix4(i),nl.radius+=r,t.ray.intersectsSphere(nl)===!1)return;Sp.copy(i).invert(),ya.copy(t.ray).applyMatrix4(Sp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=u,p=m-1;_<p;_+=c){let g=h.getX(_),v=h.getX(_+1),S=il(this,t,ya,l,g,v,_);S&&e.push(S)}if(this.isLineLoop){let _=h.getX(m-1),p=h.getX(u),g=il(this,t,ya,l,_,p,m-1);g&&e.push(g)}}else{let u=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=u,p=m-1;_<p;_+=c){let g=il(this,t,ya,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=il(this,t,ya,l,m-1,u,m-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function il(s,t,e,n,i,r,a){let o=s.geometry.attributes.position;if(Pl.fromBufferAttribute(o,i),Il.fromBufferAttribute(o,r),e.distanceSqToSegment(Pl,Il,mu,bp)>n)return;mu.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(mu);if(!(c<t.near||c>t.far))return{distance:c,point:bp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var wp=new H,Ap=new H,Nr=class extends Ll{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)wp.fromBufferAttribute(e,i),Ap.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+wp.distanceTo(Ap);t.setAttribute("lineDistance",new Ue(n,1))}else Yt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Dl=class extends Zn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Tp=new be,wu=new Dr,sl=new us,rl=new H,Na=class extends Ze{constructor(t=new bn,e=new Dl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sl.copy(n.boundingSphere),sl.applyMatrix4(i),sl.radius+=r,t.ray.intersectsSphere(sl)===!1)return;Tp.copy(i).invert(),wu.copy(t.ray).applyMatrix4(Tp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let m=f,_=u;m<_;m++){let p=c.getX(m);rl.fromBufferAttribute(d,p),Ep(rl,p,l,i,t,e,this)}}else{let f=Math.max(0,a.start),u=Math.min(d.count,a.start+a.count);for(let m=f,_=u;m<_;m++)rl.fromBufferAttribute(d,m),Ep(rl,m,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ep(s,t,e,n,i,r,a){let o=wu.distanceSqToPoint(s);if(o<e){let l=new H;wu.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Ua=class extends Sn{constructor(t=[],e=Zs,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var zi=class extends Sn{constructor(t,e,n=Jn,i,r,a,o=Ye,l=Ye,c,h=Bi,d=1){if(h!==Bi&&h!==Gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:d};super(f,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ir(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Oa=class extends zi{constructor(t,e=Jn,n=Zs,i,r,a=Ye,o=Ye,l,c=Bi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Fa=class extends Sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ur=class s extends bn{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],f=0,u=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(d,2));function m(_,p,g,v,S,M,A,T,x,b,I){let P=M/x,U=A/b,W=M/2,F=A/2,R=T/2,C=x+1,N=b+1,L=0,k=0,z=new H;for(let X=0;X<N;X++){let $=X*U-F;for(let ot=0;ot<C;ot++){let Tt=ot*P-W;z[_]=Tt*v,z[p]=$*S,z[g]=R,c.push(z.x,z.y,z.z),z[_]=0,z[p]=0,z[g]=T>0?1:-1,h.push(z.x,z.y,z.z),d.push(ot/x),d.push(1-X/b),L+=1}}for(let X=0;X<b;X++)for(let $=0;$<x;$++){let ot=f+$+C*X,Tt=f+$+C*(X+1),Y=f+($+1)+C*(X+1),ft=f+($+1)+C*X;l.push(ot,Tt,ft),l.push(Tt,Y,ft),k+=6}o.addGroup(u,k,I),u+=k,f+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Yt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],f=n[i+1]-h,u=(a-h)/f;return(i+u)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new Lt:new H);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new H,i=[],r=[],a=[],o=new H,l=new be;for(let u=0;u<=t;u++){let m=u/t;i[u]=this.getTangentAt(m,new H)}r[0]=new H,a[0]=new H;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(i[u-1],i[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(re(i[u-1].dot(i[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(i[u],r[u])}if(e===!0){let u=Math.acos(re(r[0].dot(r[t]),-1,1));u/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],u*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Or=class extends Dn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Lt){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,u=c-this.aY;l=f*h-u*d+this.aX,c=f*d+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Nl=class extends Or{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function rf(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+d)+(l-o)/d;f*=h,u*=h,i(a,o,f,u)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var Cp=new H,Rp=new H,gu=new rf,_u=new rf,xu=new rf,Ul=class extends Dn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new H){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Rp.subVectors(i[0],i[1]).add(i[0]),c=Rp);let d=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Cp.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Cp),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),u),_=Math.pow(d.distanceToSquared(f),u),p=Math.pow(f.distanceToSquared(h),u);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),gu.initNonuniformCatmullRom(c.x,d.x,f.x,h.x,m,_,p),_u.initNonuniformCatmullRom(c.y,d.y,f.y,h.y,m,_,p),xu.initNonuniformCatmullRom(c.z,d.z,f.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(gu.initCatmullRom(c.x,d.x,f.x,h.x,this.tension),_u.initCatmullRom(c.y,d.y,f.y,h.y,this.tension),xu.initCatmullRom(c.z,d.z,f.z,h.z,this.tension));return n.set(gu.calc(l),_u.calc(l),xu.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new H().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Pp(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function dx(s,t){let e=1-s;return e*e*t}function px(s,t){return 2*(1-s)*s*t}function mx(s,t){return s*s*t}function ba(s,t,e,n){return dx(s,t)+px(s,e)+mx(s,n)}function gx(s,t){let e=1-s;return e*e*e*t}function _x(s,t){let e=1-s;return 3*e*e*s*t}function xx(s,t){return 3*(1-s)*s*s*t}function vx(s,t){return s*s*s*t}function wa(s,t,e,n,i){return gx(s,t)+_x(s,e)+xx(s,n)+vx(s,i)}var Ba=class extends Dn{constructor(t=new Lt,e=new Lt,n=new Lt,i=new Lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Lt){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(wa(t,i.x,r.x,a.x,o.x),wa(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ol=class extends Dn{constructor(t=new H,e=new H,n=new H,i=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new H){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(wa(t,i.x,r.x,a.x,o.x),wa(t,i.y,r.y,a.y,o.y),wa(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ka=class extends Dn{constructor(t=new Lt,e=new Lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Lt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fl=class extends Dn{constructor(t=new H,e=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new H){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new H){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},za=class extends Dn{constructor(t=new Lt,e=new Lt,n=new Lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Lt){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ba(t,i.x,r.x,a.x),ba(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Bl=class extends Dn{constructor(t=new H,e=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new H){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ba(t,i.x,r.x,a.x),ba(t,i.y,r.y,a.y),ba(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Va=class extends Dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Lt){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Pp(o,l.x,c.x,h.x,d.x),Pp(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new Lt().fromArray(i))}return this}},Au=Object.freeze({__proto__:null,ArcCurve:Nl,CatmullRomCurve3:Ul,CubicBezierCurve:Ba,CubicBezierCurve3:Ol,EllipseCurve:Or,LineCurve:ka,LineCurve3:Fl,QuadraticBezierCurve:za,QuadraticBezierCurve3:Bl,SplineCurve:Va}),kl=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Au[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Au[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},Hs=class extends kl{constructor(t){super(),this.type="Path",this.currentPoint=new Lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new ka(this.currentPoint.clone(),new Lt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new za(this.currentPoint.clone(),new Lt(t,e),new Lt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new Ba(this.currentPoint.clone(),new Lt(t,e),new Lt(n,i),new Lt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Va(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new Or(t,e,n,i,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Fr=class extends Hs{constructor(t){super(t),this.uuid=$r(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Hs().fromJSON(i))}return this}};function yx(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Tm(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Ax(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,d=l;for(let f=e;f<i;f+=e){let u=s[f],m=s[f+1];u<o&&(o=u),m<l&&(l=m),u>h&&(h=u),m>d&&(d=m)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Ga(r,a,e,o,l,c,0),a}function Tm(s,t,e,n,i){let r;if(i===Ox(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=Ip(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Ip(a/n|0,s[a],s[a+1],r);return r&&Br(r,r.next)&&(Wa(r),r=r.next),r}function Ws(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Br(e,e.next)||Ne(e.prev,e,e.next)===0)){if(Wa(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ga(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Px(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Sx(s,n,i,r):Mx(s)){t.push(l.i,s.i,c.i),Wa(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=bx(Ws(s),t),Ga(s,t,e,n,i,r,2)):a===2&&wx(s,t,e,n,i,r):Ga(Ws(s),t,e,n,i,r,1);break}}}function Mx(s){let t=s.prev,e=s,n=s.next;if(Ne(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),d=Math.min(o,l,c),f=Math.max(i,r,a),u=Math.max(o,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=d&&m.y<=u&&Ma(i,o,r,l,a,c,m.x,m.y)&&Ne(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Sx(s,t,e,n){let i=s.prev,r=s,a=s.next;if(Ne(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,d=r.y,f=a.y,u=Math.min(o,l,c),m=Math.min(h,d,f),_=Math.max(o,l,c),p=Math.max(h,d,f),g=Tu(u,m,t,e,n),v=Tu(_,p,t,e,n),S=s.prevZ,M=s.nextZ;for(;S&&S.z>=g&&M&&M.z<=v;){if(S.x>=u&&S.x<=_&&S.y>=m&&S.y<=p&&S!==i&&S!==a&&Ma(o,h,l,d,c,f,S.x,S.y)&&Ne(S.prev,S,S.next)>=0||(S=S.prevZ,M.x>=u&&M.x<=_&&M.y>=m&&M.y<=p&&M!==i&&M!==a&&Ma(o,h,l,d,c,f,M.x,M.y)&&Ne(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;S&&S.z>=g;){if(S.x>=u&&S.x<=_&&S.y>=m&&S.y<=p&&S!==i&&S!==a&&Ma(o,h,l,d,c,f,S.x,S.y)&&Ne(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;M&&M.z<=v;){if(M.x>=u&&M.x<=_&&M.y>=m&&M.y<=p&&M!==i&&M!==a&&Ma(o,h,l,d,c,f,M.x,M.y)&&Ne(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function bx(s,t){let e=s;do{let n=e.prev,i=e.next.next;!Br(n,i)&&Cm(n,e,e.next,i)&&Ha(n,i)&&Ha(i,n)&&(t.push(n.i,e.i,i.i),Wa(e),Wa(e.next),e=s=i),e=e.next}while(e!==s);return Ws(e)}function wx(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Dx(a,o)){let l=Rm(a,o);a=Ws(a,a.next),l=Ws(l,l.next),Ga(a,t,e,n,i,r,0),Ga(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Ax(s,t,e,n){let i=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Tm(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Lx(c))}i.sort(Tx);for(let r=0;r<i.length;r++)e=Ex(i[r],e);return e}function Tx(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Ex(s,t){let e=Cx(s,t);if(!e)return t;let n=Rm(e,s);return Ws(n,n.next),Ws(e,e.next)}function Cx(s,t){let e=t,n=s.x,i=s.y,r=-1/0,a;if(Br(s,e))return e;do{if(Br(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Em(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let d=Math.abs(i-e.y)/(n-e.x);Ha(e,s)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&Rx(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function Rx(s,t){return Ne(s.prev,s,t.prev)<0&&Ne(t.next,s,s.next)<0}function Px(s,t,e,n){let i=s;do i.z===0&&(i.z=Tu(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Ix(i)}function Ix(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Tu(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Lx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Em(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Ma(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Em(s,t,e,n,i,r,a,o)}function Dx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Nx(s,t)&&(Ha(s,t)&&Ha(t,s)&&Ux(s,t)&&(Ne(s.prev,s,t.prev)||Ne(s,t.prev,t))||Br(s,t)&&Ne(s.prev,s,s.next)>0&&Ne(t.prev,t,t.next)>0)}function Ne(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Br(s,t){return s.x===t.x&&s.y===t.y}function Cm(s,t,e,n){let i=ol(Ne(s,t,e)),r=ol(Ne(s,t,n)),a=ol(Ne(e,n,s)),o=ol(Ne(e,n,t));return!!(i!==r&&a!==o||i===0&&al(s,e,t)||r===0&&al(s,n,t)||a===0&&al(e,s,n)||o===0&&al(e,t,n))}function al(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function ol(s){return s>0?1:s<0?-1:0}function Nx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Cm(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Ha(s,t){return Ne(s.prev,s,s.next)<0?Ne(s,t,s.next)>=0&&Ne(s,s.prev,t)>=0:Ne(s,t,s.prev)<0||Ne(s,s.next,t)<0}function Ux(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Rm(s,t){let e=Eu(s.i,s.x,s.y),n=Eu(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ip(s,t,e,n){let i=Eu(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Wa(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Eu(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ox(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Cu=class{static triangulate(t,e,n=2){return yx(t,e,n)}},Vs=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];Lp(t),Dp(n,t);let a=t.length;e.forEach(Lp);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Dp(n,e[l]);let o=Cu.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Lp(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Dp(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var Xa=class s extends bn{constructor(t=new Fr([new Lt(.5,.5),new Lt(-.5,.5),new Lt(-.5,-.5),new Lt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Ue(i,3)),this.setAttribute("uv",new Ue(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:u-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Fx,S,M=!1,A,T,x,b;if(g){S=g.getSpacedPoints(h),M=!0,f=!1;let at=g.isCatmullRomCurve3?g.closed:!1;A=g.computeFrenetFrames(h,at),T=new H,x=new H,b=new H}f||(p=0,u=0,m=0,_=0);let I=o.extractPoints(c),P=I.shape,U=I.holes;if(!Vs.isClockWise(P)){P=P.reverse();for(let at=0,q=U.length;at<q;at++){let it=U[at];Vs.isClockWise(it)&&(U[at]=it.reverse())}}function F(at){let it=10000000000000001e-36,ut=at[0];for(let V=1;V<=at.length;V++){let lt=V%at.length,dt=at[lt],Et=dt.x-ut.x,Dt=dt.y-ut.y,Xt=Et*Et+Dt*Dt,O=Math.max(Math.abs(dt.x),Math.abs(dt.y),Math.abs(ut.x),Math.abs(ut.y)),de=it*O*O;if(Xt<=de){at.splice(lt,1),V--;continue}ut=dt}}F(P),U.forEach(F);let R=U.length,C=P;for(let at=0;at<R;at++){let q=U[at];P=P.concat(q)}function N(at,q,it){return q||Jt("ExtrudeGeometry: vec does not exist"),at.clone().addScaledVector(q,it)}let L=P.length;function k(at,q,it){let ut,V,lt,dt=at.x-q.x,Et=at.y-q.y,Dt=it.x-at.x,Xt=it.y-at.y,O=dt*dt+Et*Et,de=dt*Xt-Et*Dt;if(Math.abs(de)>Number.EPSILON){let et=Math.sqrt(O),vt=Math.sqrt(Dt*Dt+Xt*Xt),nt=q.x-Et/et,Ct=q.y+dt/et,gt=it.x-Xt/vt,yt=it.y+Dt/vt,E=((gt-nt)*Xt-(yt-Ct)*Dt)/(dt*Xt-Et*Dt);ut=nt+dt*E-at.x,V=Ct+Et*E-at.y;let y=ut*ut+V*V;if(y<=2)return new Lt(ut,V);lt=Math.sqrt(y/2)}else{let et=!1;dt>Number.EPSILON?Dt>Number.EPSILON&&(et=!0):dt<-Number.EPSILON?Dt<-Number.EPSILON&&(et=!0):Math.sign(Et)===Math.sign(Xt)&&(et=!0),et?(ut=-Et,V=dt,lt=Math.sqrt(O)):(ut=dt,V=Et,lt=Math.sqrt(O/2))}return new Lt(ut/lt,V/lt)}let z=[];for(let at=0,q=C.length,it=q-1,ut=at+1;at<q;at++,it++,ut++)it===q&&(it=0),ut===q&&(ut=0),z[at]=k(C[at],C[it],C[ut]);let X=[],$,ot=z.concat();for(let at=0,q=R;at<q;at++){let it=U[at];$=[];for(let ut=0,V=it.length,lt=V-1,dt=ut+1;ut<V;ut++,lt++,dt++)lt===V&&(lt=0),dt===V&&(dt=0),$[ut]=k(it[ut],it[lt],it[dt]);X.push($),ot=ot.concat($)}let Tt;if(p===0)Tt=Vs.triangulateShape(C,U);else{let at=[],q=[];for(let it=0;it<p;it++){let ut=it/p,V=u*Math.cos(ut*Math.PI/2),lt=m*Math.sin(ut*Math.PI/2)+_;for(let dt=0,Et=C.length;dt<Et;dt++){let Dt=N(C[dt],z[dt],lt);Bt(Dt.x,Dt.y,-V),ut===0&&at.push(Dt)}for(let dt=0,Et=R;dt<Et;dt++){let Dt=U[dt];$=X[dt];let Xt=[];for(let O=0,de=Dt.length;O<de;O++){let et=N(Dt[O],$[O],lt);Bt(et.x,et.y,-V),ut===0&&Xt.push(et)}ut===0&&q.push(Xt)}}Tt=Vs.triangulateShape(at,q)}let Y=Tt.length,ft=m+_;for(let at=0;at<L;at++){let q=f?N(P[at],ot[at],ft):P[at];M?(x.copy(A.normals[0]).multiplyScalar(q.x),T.copy(A.binormals[0]).multiplyScalar(q.y),b.copy(S[0]).add(x).add(T),Bt(b.x,b.y,b.z)):Bt(q.x,q.y,0)}for(let at=1;at<=h;at++)for(let q=0;q<L;q++){let it=f?N(P[q],ot[q],ft):P[q];M?(x.copy(A.normals[at]).multiplyScalar(it.x),T.copy(A.binormals[at]).multiplyScalar(it.y),b.copy(S[at]).add(x).add(T),Bt(b.x,b.y,b.z)):Bt(it.x,it.y,d/h*at)}for(let at=p-1;at>=0;at--){let q=at/p,it=u*Math.cos(q*Math.PI/2),ut=m*Math.sin(q*Math.PI/2)+_;for(let V=0,lt=C.length;V<lt;V++){let dt=N(C[V],z[V],ut);Bt(dt.x,dt.y,d+it)}for(let V=0,lt=U.length;V<lt;V++){let dt=U[V];$=X[V];for(let Et=0,Dt=dt.length;Et<Dt;Et++){let Xt=N(dt[Et],$[Et],ut);M?Bt(Xt.x,Xt.y+S[h-1].y,S[h-1].x+it):Bt(Xt.x,Xt.y,d+it)}}}At(),Pt();function At(){let at=i.length/3;if(f){let q=0,it=L*q;for(let ut=0;ut<Y;ut++){let V=Tt[ut];Kt(V[2]+it,V[1]+it,V[0]+it)}q=h+p*2,it=L*q;for(let ut=0;ut<Y;ut++){let V=Tt[ut];Kt(V[0]+it,V[1]+it,V[2]+it)}}else{for(let q=0;q<Y;q++){let it=Tt[q];Kt(it[2],it[1],it[0])}for(let q=0;q<Y;q++){let it=Tt[q];Kt(it[0]+L*h,it[1]+L*h,it[2]+L*h)}}n.addGroup(at,i.length/3-at,0)}function Pt(){let at=i.length/3,q=0;mt(C,q),q+=C.length;for(let it=0,ut=U.length;it<ut;it++){let V=U[it];mt(V,q),q+=V.length}n.addGroup(at,i.length/3-at,1)}function mt(at,q){let it=at.length;for(;--it>=0;){let ut=it,V=it-1;V<0&&(V=at.length-1);for(let lt=0,dt=h+p*2;lt<dt;lt++){let Et=L*lt,Dt=L*(lt+1),Xt=q+ut+Et,O=q+V+Et,de=q+V+Dt,et=q+ut+Dt;zt(Xt,O,de,et)}}}function Bt(at,q,it){l.push(at),l.push(q),l.push(it)}function Kt(at,q,it){Zt(at),Zt(q),Zt(it);let ut=i.length/3,V=v.generateTopUV(n,i,ut-3,ut-2,ut-1);jt(V[0]),jt(V[1]),jt(V[2])}function zt(at,q,it,ut){Zt(at),Zt(q),Zt(ut),Zt(q),Zt(it),Zt(ut);let V=i.length/3,lt=v.generateSideWallUV(n,i,V-6,V-3,V-2,V-1);jt(lt[0]),jt(lt[1]),jt(lt[3]),jt(lt[1]),jt(lt[2]),jt(lt[3])}function Zt(at){i.push(l[at*3+0]),i.push(l[at*3+1]),i.push(l[at*3+2])}function jt(at){r.push(at.x),r.push(at.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Bx(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Au[i.type]().fromJSON(i)),new s(n,t.options)}},Fx={generateTopUV:function(s,t,e,n,i){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Lt(r,a),new Lt(o,l),new Lt(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],f=t[i*3],u=t[i*3+1],m=t[i*3+2],_=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Lt(a,1-l),new Lt(c,1-d),new Lt(f,1-m),new Lt(_,1-g)]:[new Lt(o,1-l),new Lt(h,1-d),new Lt(u,1-m),new Lt(p,1-g)]}};function Bx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Xs=class s extends bn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=t/o,f=e/l,u=[],m=[],_=[],p=[];for(let g=0;g<h;g++){let v=g*f-a;for(let S=0;S<c;S++){let M=S*d-r;m.push(M,-v,0),_.push(0,0,1),p.push(S/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){let S=v+c*g,M=v+c*(g+1),A=v+1+c*(g+1),T=v+1+c*g;u.push(S,M,T),u.push(M,A,T)}this.setIndex(u),this.setAttribute("position",new Ue(m,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var qa=class extends Zn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ee(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function Ks(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(Np(i))i.isRenderTargetTexture?(Yt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Np(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function ln(s){let t={};for(let e=0;e<s.length;e++){let n=Ks(s[e]);for(let i in n)t[i]=n[i]}return t}function Np(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function kx(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function af(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var Pm={clone:Ks,merge:ln},zx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Gn=class extends Zn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zx,this.fragmentShader=Vx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ks(t.uniforms),this.uniformsGroups=kx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new ee().setHex(i.value);break;case"v2":this.uniforms[n].value=new Lt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new H().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Re().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Qt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new be().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},zl=class extends Gn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},kr=class extends Zn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vc,this.normalScale=new Lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Vl=class extends Zn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=um,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Gl=class extends Zn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function wr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function ll(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var ds=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Hl=class extends ds{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mu,endingEnd:Mu}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Su:r=t,o=2*e-n;break;case bu:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Su:a=t,l=2*n-e;break;case bu:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,u=this._weightNext,m=(n-e)/(i-e),_=m*m,p=_*m,g=-f*p+2*f*_-f*m,v=(1+f)*p+(-1.5-2*f)*_+(-.5+f)*m+1,S=(-1-u)*p+(1.5+u)*_+.5*m,M=u*p-u*_;for(let A=0;A!==o;++A)r[A]=g*a[h+A]+v*a[c+A]+S*a[l+A]+M*a[d+A];return r}},Wl=class extends ds{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),d=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*d+a[l+f]*h;return r}},Xl=class extends ds{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},ql=class extends ds{interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(n-e)/(i-e),_=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*_+a[l+p]*m;return r}let f=o*2,u=t-1;for(let m=0;m!==o;++m){let _=a[c+m],p=a[l+m],g=u*f+m*2,v=d[g],S=d[g+1],M=t*f+m*2,A=h[M],T=h[M+1],x=Hx(n,e,v,A,i);r[m]=Im(x,_,S,T,p)}return r}};function Im(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function Gx(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function Hx(s,t,e,n,i){let r=(s-t)/(i-t);for(let a=0;a<8;a++){let o=Im(r,t,e,n,i)-s;if(Math.abs(o)<1e-10)break;let l=Gx(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Nn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=wr(e,this.TimeBufferType),this.values=wr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:wr(t.times,Array),values:wr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),ll(t.settings)&&(n.settings={inTangents:wr(t.settings.inTangents,Array),outTangents:wr(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Xl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Wl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Hl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ql(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Aa:e=this.InterpolantFactoryMethodDiscrete;break;case Sl:e=this.InterpolantFactoryMethodLinear;break;case ul:e=this.InterpolantFactoryMethodSmooth;break;case yu:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Yt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Aa;case this.InterpolantFactoryMethodLinear:return Sl;case this.InterpolantFactoryMethodSmooth:return ul;case this.InterpolantFactoryMethodBezier:return yu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;ll(this.settings)&&(Up(this.settings.inTangents,t),Up(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;ll(this.settings)&&(Op(this.settings.inTangents,t),Op(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Jt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Jt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Jt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Jt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&X_(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Jt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ul,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let d=o*n,f=d-n,u=d+n;for(let m=0;m!==n;++m){let _=e[d+m];if(_!==e[f+m]||_!==e[u+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,f=a*n;for(let u=0;u!==n;++u)e[f+u]=e[d+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,ll(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Up(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]+=t}function Op(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}Nn.prototype.ValueTypeName="";Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=Sl;var ps=class extends Nn{constructor(t,e,n){super(t,e,n)}};ps.prototype.ValueTypeName="bool";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=Aa;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;var $l=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};$l.prototype.ValueTypeName="color";var Yl=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};Yl.prototype.ValueTypeName="number";var Zl=class extends ds{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)gi.slerpFlat(r,0,a,c-o,a,c,l);return r}},$a=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Zl(this.times,this.values,this.getValueSize(),t)}};$a.prototype.ValueTypeName="quaternion";$a.prototype.InterpolantFactoryMethodSmooth=void 0;var ms=class extends Nn{constructor(t,e,n){super(t,e,n)}};ms.prototype.ValueTypeName="string";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=Aa;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;var Jl=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};Jl.prototype.ValueTypeName="vector";var Kl=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){let u=c[d],m=c[d+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Lm=new Kl,jl=class{constructor(t){this.manager=t!==void 0?t:Lm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};jl.DEFAULT_MATERIAL_NAME="__DEFAULT";var zr=class extends Ze{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Ya=class extends zr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},vu=new be,Fp=new H,Bp=new H,Ql=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Lt(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fs,this._frameExtents=new Lt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Fp.setFromMatrixPosition(t.matrixWorld),e.position.copy(Fp),Bp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Bp),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){vu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(vu,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===Rr||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(vu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},cl=new H,hl=new gi,fi=new H,Za=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be,this.coordinateSystem=Vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(cl,hl,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cl,hl,fi.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(cl,hl,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cl,hl,fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ls=new H,kp=new Lt,zp=new Lt,pn=class extends Za{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=bl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Yh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bl*2*Math.atan(Math.tan(Yh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ls.x,ls.y).multiplyScalar(-t/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-t/ls.z)}getViewSize(t,e){return this.getViewBounds(t,kp,zp),e.subVectors(zp,kp)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Yh*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ja=class extends Za{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ru=class extends Ql{constructor(){super(new Ja(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Vr=class extends zr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Ru}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Ka=class extends zr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ar=-90,Tr=1,Gr=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new pn(Ar,Tr,t,e);i.layers=this.layers,this.add(i);let r=new pn(Ar,Tr,t,e);r.layers=this.layers,this.add(r);let a=new pn(Ar,Tr,t,e);a.layers=this.layers,this.add(a);let o=new pn(Ar,Tr,t,e);o.layers=this.layers,this.add(o);let l=new pn(Ar,Tr,t,e);l.layers=this.layers,this.add(l);let c=new pn(Ar,Tr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,f,u),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},tc=class extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var of="\\[\\]\\.:\\/",Wx=new RegExp("["+of+"]","g"),lf="[^"+of+"]",Xx="[^"+of.replace("\\.","")+"]",qx=/((?:WC+[\/:])*)/.source.replace("WC",lf),$x=/(WCOD+)?/.source.replace("WCOD",Xx),Yx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lf),Zx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lf),Jx=new RegExp("^"+qx+$x+Yx+Zx+"$"),Kx=["material","materials","bones","map"],Pu=class{constructor(t,e,n){let i=n||Te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Te=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Wx,"")}static parseTrackName(t){let e=Jx.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Kx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Yt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Jt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Jt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Jt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Jt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Jt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;Jt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=Pu;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var F1=new Float32Array(1);var pf=class pf{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};pf.prototype.isMatrix2=!0;var Iu=pf;function cf(s,t,e,n){let i=jx(n);switch(e){case Zu:return s*t;case Ku:return s*t/i.components*i.byteLength;case lc:return s*t/i.components*i.byteLength;case _s:return s*t*2/i.components*i.byteLength;case cc:return s*t*2/i.components*i.byteLength;case Ju:return s*t*3/i.components*i.byteLength;case Qn:return s*t*4/i.components*i.byteLength;case hc:return s*t*4/i.components*i.byteLength;case eo:case no:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case io:case so:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fc:case pc:return Math.max(s,16)*Math.max(t,8)/4;case uc:case dc:return Math.max(s,8)*Math.max(t,8)/2;case mc:case gc:case xc:case vc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case _c:case ro:case yc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Mc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Sc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case bc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case wc:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ac:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Tc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ec:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Cc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Rc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Lc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Dc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Nc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Uc:case Oc:case Fc:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Bc:case kc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ao:case zc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jx(s){switch(s){case wn:case Xu:return{byteLength:1,components:1};case qr:case qu:case jn:return{byteLength:2,components:1};case ac:case oc:return{byteLength:2,components:4};case Jn:case rc:case Kn:return{byteLength:4,components:1};case $u:case Yu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Yt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function t0(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function tv(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=s.HALF_FLOAT:u=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=s.SHORT;else if(c instanceof Uint32Array)u=s.UNSIGNED_INT;else if(c instanceof Int32Array)u=s.INT;else if(c instanceof Int8Array)u=s.BYTE;else if(c instanceof Uint8Array)u=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((u,m)=>u.start-m.start);let f=0;for(let u=1;u<d.length;u++){let m=d[f],_=d[u];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,d[f]=_)}d.length=f+1;for(let u=0,m=d.length;u<m;u++){let _=d[u];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var ev=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nv=`#ifdef USE_ALPHAHASH
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
#endif`,iv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,av=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ov=`#ifdef USE_AOMAP
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
#endif`,lv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cv=`#ifdef USE_BATCHING
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
#endif`,hv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pv=`#ifdef USE_IRIDESCENCE
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
#endif`,mv=`#ifdef USE_BUMPMAP
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
#endif`,gv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_v=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Sv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wv=`#define PI 3.141592653589793
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
} // validated`,Av=`vec3 transformedNormal = objectNormal;
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
#endif`,Tv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ev=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Iv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lv=`#ifdef USE_ENVMAP
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
#endif`,Dv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Nv=`#ifdef USE_ENVMAP
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
#endif`,Uv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ov=`#ifdef USE_ENVMAP
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
#endif`,Fv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vv=`#ifdef USE_GRADIENTMAP
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
}`,Gv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,qv=`#ifdef USE_ENVMAP
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
#endif`,$v=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kv=`PhysicalMaterial material;
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
#endif`,jv=`uniform sampler2D dfgLUT;
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
}`,Qv=`
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
#endif`,ty=`#if defined( RE_IndirectDiffuse )
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
#endif`,ey=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ny=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,iy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ry=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ay=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,oy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ly=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hy=`#if defined( USE_POINTS_UV )
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
#endif`,uy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,py=`#if defined( USE_MORPHCOLORS )
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
#endif`,my=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gy=`#ifdef USE_MORPHTARGETS
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
#endif`,_y=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,My=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,by=`#ifdef USE_NORMALMAP
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
#endif`,wy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ay=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ty=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ey=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ry=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Py=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Iy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ly=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ny=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Oy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,By=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ky=`float getShadowMask() {
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
}`,zy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vy=`#ifdef USE_SKINNING
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
#endif`,Gy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hy=`#ifdef USE_SKINNING
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
#endif`,Wy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$y=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yy=`#ifdef USE_TRANSMISSION
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
#endif`,Zy=`#ifdef USE_TRANSMISSION
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
#endif`,Jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ky=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,tM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,eM=`uniform sampler2D t2D;
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
}`,nM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iM=`uniform float backgroundBlurriness;
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
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aM=`#include <common>
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
}`,oM=`#if DEPTH_PACKING == 3200
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
}`,lM=`#define DISTANCE
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
}`,cM=`#define DISTANCE
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
}`,hM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fM=`uniform float scale;
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
}`,dM=`uniform vec3 diffuse;
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
}`,pM=`#include <common>
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
}`,mM=`uniform vec3 diffuse;
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
}`,gM=`#define LAMBERT
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
}`,_M=`#define LAMBERT
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
}`,xM=`#define MATCAP
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
}`,vM=`#define MATCAP
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
}`,yM=`#define NORMAL
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
}`,MM=`#define NORMAL
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
}`,SM=`#define PHONG
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
}`,bM=`#define PHONG
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
}`,wM=`#define STANDARD
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
}`,AM=`#define STANDARD
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
}`,TM=`#define TOON
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
}`,EM=`#define TOON
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
}`,CM=`uniform float size;
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
}`,RM=`uniform vec3 diffuse;
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
}`,PM=`#include <common>
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
}`,IM=`uniform vec3 color;
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
}`,LM=`uniform float rotation;
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
}`,DM=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:ev,alphahash_pars_fragment:nv,alphamap_fragment:iv,alphamap_pars_fragment:sv,alphatest_fragment:rv,alphatest_pars_fragment:av,aomap_fragment:ov,aomap_pars_fragment:lv,batching_pars_vertex:cv,batching_vertex:hv,begin_vertex:uv,beginnormal_vertex:fv,bsdfs:dv,iridescence_fragment:pv,bumpmap_pars_fragment:mv,clipping_planes_fragment:gv,clipping_planes_pars_fragment:_v,clipping_planes_pars_vertex:xv,clipping_planes_vertex:vv,color_fragment:yv,color_pars_fragment:Mv,color_pars_vertex:Sv,color_vertex:bv,common:wv,defaultnormal_vertex:Av,displacementmap_pars_vertex:Tv,displacementmap_vertex:Ev,emissivemap_fragment:Cv,emissivemap_pars_fragment:Rv,colorspace_fragment:Pv,colorspace_pars_fragment:Iv,envmap_fragment:Lv,envmap_common_pars_fragment:Dv,envmap_pars_fragment:Nv,envmap_pars_vertex:Uv,envmap_physical_pars_fragment:qv,envmap_vertex:Ov,fog_vertex:Fv,fog_pars_vertex:Bv,fog_fragment:kv,fog_pars_fragment:zv,gradientmap_pars_fragment:Vv,lightmap_pars_fragment:Gv,lights_lambert_fragment:Hv,lights_lambert_pars_fragment:Wv,lights_pars_begin:Xv,lights_toon_fragment:$v,lights_toon_pars_fragment:Yv,lights_phong_fragment:Zv,lights_phong_pars_fragment:Jv,lights_physical_fragment:Kv,lights_physical_pars_fragment:jv,lights_fragment_begin:Qv,lights_fragment_maps:ty,lights_fragment_end:ey,lightprobes_pars_fragment:ny,logdepthbuf_fragment:iy,logdepthbuf_pars_fragment:sy,logdepthbuf_pars_vertex:ry,logdepthbuf_vertex:ay,map_fragment:oy,map_pars_fragment:ly,map_particle_fragment:cy,map_particle_pars_fragment:hy,metalnessmap_fragment:uy,metalnessmap_pars_fragment:fy,morphinstance_vertex:dy,morphcolor_vertex:py,morphnormal_vertex:my,morphtarget_pars_vertex:gy,morphtarget_vertex:_y,normal_fragment_begin:xy,normal_fragment_maps:vy,normal_pars_fragment:yy,normal_pars_vertex:My,normal_vertex:Sy,normalmap_pars_fragment:by,clearcoat_normal_fragment_begin:wy,clearcoat_normal_fragment_maps:Ay,clearcoat_pars_fragment:Ty,iridescence_pars_fragment:Ey,opaque_fragment:Cy,packing:Ry,premultiplied_alpha_fragment:Py,project_vertex:Iy,dithering_fragment:Ly,dithering_pars_fragment:Dy,roughnessmap_fragment:Ny,roughnessmap_pars_fragment:Uy,shadowmap_pars_fragment:Oy,shadowmap_pars_vertex:Fy,shadowmap_vertex:By,shadowmask_pars_fragment:ky,skinbase_vertex:zy,skinning_pars_vertex:Vy,skinning_vertex:Gy,skinnormal_vertex:Hy,specularmap_fragment:Wy,specularmap_pars_fragment:Xy,tonemapping_fragment:qy,tonemapping_pars_fragment:$y,transmission_fragment:Yy,transmission_pars_fragment:Zy,uv_pars_fragment:Jy,uv_pars_vertex:Ky,uv_vertex:jy,worldpos_vertex:Qy,background_vert:tM,background_frag:eM,backgroundCube_vert:nM,backgroundCube_frag:iM,cube_vert:sM,cube_frag:rM,depth_vert:aM,depth_frag:oM,distance_vert:lM,distance_frag:cM,equirect_vert:hM,equirect_frag:uM,linedashed_vert:fM,linedashed_frag:dM,meshbasic_vert:pM,meshbasic_frag:mM,meshlambert_vert:gM,meshlambert_frag:_M,meshmatcap_vert:xM,meshmatcap_frag:vM,meshnormal_vert:yM,meshnormal_frag:MM,meshphong_vert:SM,meshphong_frag:bM,meshphysical_vert:wM,meshphysical_frag:AM,meshtoon_vert:TM,meshtoon_frag:EM,points_vert:CM,points_frag:RM,shadow_vert:PM,shadow_frag:IM,sprite_vert:LM,sprite_frag:DM},Ut={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},yi={basic:{uniforms:ln([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:ln([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:ln([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:ln([Ut.common,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.roughnessmap,Ut.metalnessmap,Ut.fog,Ut.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:ln([Ut.common,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.gradientmap,Ut.fog,Ut.lights,{emissive:{value:new ee(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:ln([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:ln([Ut.points,Ut.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:ln([Ut.common,Ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:ln([Ut.common,Ut.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:ln([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:ln([Ut.sprite,Ut.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:ln([Ut.common,Ut.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:ln([Ut.lights,Ut.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};yi.physical={uniforms:ln([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var Gc={r:0,b:0,g:0},NM=new be,e0=new Qt;e0.set(-1,0,0,0,1,0,0,0,1);function UM(s,t,e,n,i,r){let a=new ee(0),o=i===!0?0:1,l,c,h=null,d=0,f=null;function u(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){let M=v.backgroundBlurriness>0;S=t.get(S,M)}return S}function m(v){let S=!1,M=u(v);M===null?p(a,o):M&&M.isColor&&(p(M,1),S=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(v,S){let M=u(S);M&&M.isCubeTexture?(c===void 0&&(c=new Ln(new Ur(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Ks(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(NM.makeRotationFromEuler(S.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(e0),c.material.toneMapped=ce.getTransfer(M.colorSpace)!==_e,(h!==M||d!==M.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,f=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ln(new Xs(2,2),new Gn({name:"BackgroundMaterial",uniforms:Ks(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:gs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=ce.getTransfer(M.colorSpace)!==_e,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,f=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,S){v.getRGB(Gc,af(s)),e.buffers.color.setClear(Gc.r,Gc.g,Gc.b,S,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,S=1){a.set(v),o=S,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,p(a,o)},render:m,addToRenderList:_,dispose:g}}function OM(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null),r=i,a=!1;function o(U,W,F,R,C){let N=!1,L=d(U,R,F,W);r!==L&&(r=L,c(r.object)),N=u(U,R,F,C),N&&m(U,R,F,C),C!==null&&t.update(C,s.ELEMENT_ARRAY_BUFFER),(N||a)&&(a=!1,M(U,W,F,R),C!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(C).buffer))}function l(){return s.createVertexArray()}function c(U){return s.bindVertexArray(U)}function h(U){return s.deleteVertexArray(U)}function d(U,W,F,R){let C=R.wireframe===!0,N=n[W.id];N===void 0&&(N={},n[W.id]=N);let L=U.isInstancedMesh===!0?U.id:0,k=N[L];k===void 0&&(k={},N[L]=k);let z=k[F.id];z===void 0&&(z={},k[F.id]=z);let X=z[C];return X===void 0&&(X=f(l()),z[C]=X),X}function f(U){let W=[],F=[],R=[];for(let C=0;C<e;C++)W[C]=0,F[C]=0,R[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:F,attributeDivisors:R,object:U,attributes:{},index:null}}function u(U,W,F,R){let C=r.attributes,N=W.attributes,L=0,k=F.getAttributes();for(let z in k)if(k[z].location>=0){let $=C[z],ot=N[z];if(ot===void 0&&(z==="instanceMatrix"&&U.instanceMatrix&&(ot=U.instanceMatrix),z==="instanceColor"&&U.instanceColor&&(ot=U.instanceColor)),$===void 0||$.attribute!==ot||ot&&$.data!==ot.data)return!0;L++}return r.attributesNum!==L||r.index!==R}function m(U,W,F,R){let C={},N=W.attributes,L=0,k=F.getAttributes();for(let z in k)if(k[z].location>=0){let $=N[z];$===void 0&&(z==="instanceMatrix"&&U.instanceMatrix&&($=U.instanceMatrix),z==="instanceColor"&&U.instanceColor&&($=U.instanceColor));let ot={};ot.attribute=$,$&&$.data&&(ot.data=$.data),C[z]=ot,L++}r.attributes=C,r.attributesNum=L,r.index=R}function _(){let U=r.newAttributes;for(let W=0,F=U.length;W<F;W++)U[W]=0}function p(U){g(U,0)}function g(U,W){let F=r.newAttributes,R=r.enabledAttributes,C=r.attributeDivisors;F[U]=1,R[U]===0&&(s.enableVertexAttribArray(U),R[U]=1),C[U]!==W&&(s.vertexAttribDivisor(U,W),C[U]=W)}function v(){let U=r.newAttributes,W=r.enabledAttributes;for(let F=0,R=W.length;F<R;F++)W[F]!==U[F]&&(s.disableVertexAttribArray(F),W[F]=0)}function S(U,W,F,R,C,N,L){L===!0?s.vertexAttribIPointer(U,W,F,C,N):s.vertexAttribPointer(U,W,F,R,C,N)}function M(U,W,F,R){_();let C=R.attributes,N=F.getAttributes(),L=W.defaultAttributeValues;for(let k in N){let z=N[k];if(z.location>=0){let X=C[k];if(X===void 0&&(k==="instanceMatrix"&&U.instanceMatrix&&(X=U.instanceMatrix),k==="instanceColor"&&U.instanceColor&&(X=U.instanceColor)),X!==void 0){let $=X.normalized,ot=X.itemSize,Tt=t.get(X);if(Tt===void 0)continue;let Y=Tt.buffer,ft=Tt.type,At=Tt.bytesPerElement,Pt=ft===s.INT||ft===s.UNSIGNED_INT||X.gpuType===rc;if(X.isInterleavedBufferAttribute){let mt=X.data,Bt=mt.isInterleavedBuffer===!0?mt.stride:mt.itemSize,Kt=X.offset;if(mt.isInstancedInterleavedBuffer||mt.isInstancedBufferAttribute){for(let zt=0;zt<z.locationSize;zt++)g(z.location+zt,mt.meshPerAttribute);U.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let zt=0;zt<z.locationSize;zt++)p(z.location+zt);s.bindBuffer(s.ARRAY_BUFFER,Y);for(let zt=0;zt<z.locationSize;zt++)S(z.location+zt,ot/z.locationSize,ft,$,Bt*At,(Kt+ot/z.locationSize*zt)*At,Pt)}else{if(X.isInstancedBufferAttribute){for(let mt=0;mt<z.locationSize;mt++)g(z.location+mt,X.meshPerAttribute);U.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let mt=0;mt<z.locationSize;mt++)p(z.location+mt);s.bindBuffer(s.ARRAY_BUFFER,Y);for(let mt=0;mt<z.locationSize;mt++)S(z.location+mt,ot/z.locationSize,ft,$,ot*At,ot/z.locationSize*mt*At,Pt)}}else if(L!==void 0){let $=L[k];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(z.location,$);break;case 3:s.vertexAttrib3fv(z.location,$);break;case 4:s.vertexAttrib4fv(z.location,$);break;default:s.vertexAttrib1fv(z.location,$)}}}}v()}function A(){I();for(let U in n){let W=n[U];for(let F in W){let R=W[F];for(let C in R){let N=R[C];for(let L in N)h(N[L].object),delete N[L];delete R[C]}}delete n[U]}}function T(U){if(n[U.id]===void 0)return;let W=n[U.id];for(let F in W){let R=W[F];for(let C in R){let N=R[C];for(let L in N)h(N[L].object),delete N[L];delete R[C]}}delete n[U.id]}function x(U){for(let W in n){let F=n[W];for(let R in F){let C=F[R];if(C[U.id]===void 0)continue;let N=C[U.id];for(let L in N)h(N[L].object),delete N[L];delete C[U.id]}}}function b(U){for(let W in n){let F=n[W],R=U.isInstancedMesh===!0?U.id:0,C=F[R];if(C!==void 0){for(let N in C){let L=C[N];for(let k in L)h(L[k].object),delete L[k];delete C[N]}delete F[R],Object.keys(F).length===0&&delete n[W]}}}function I(){P(),a=!0,r!==i&&(r=i,c(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function FM(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let u=0;u<h;u++)f+=c[u];e.update(f,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function BM(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(x){return!(x!==Qn&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let b=x===jn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==wn&&x!==Kn&&!b&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Yt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Yt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Yt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:M,maxSamples:A,samples:T}}function kM(s){let t=this,e=null,n=0,i=!1,r=!1,a=new Yn,o=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let u=d.length!==0||f||n!==0||i;return i=f,n=d.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,u){let m=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,g=s.get(d);if(!i||m===null||m.length===0||r&&!p)r?h(null):c();else{let v=r?0:n,S=v*4,M=g.clippingState||null;l.value=M,M=h(m,f,S,u);for(let A=0;A!==S;++A)M[A]=e[A];g.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,f,u,m){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=u+_*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let S=0,M=u;S!==_;++S,M+=4)a.copy(d[S]).applyMatrix4(v,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var co=class extends In{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ua(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ur(5,5,5),r=new Gn({name:"CubemapFromEquirect",uniforms:Ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:$s});r.uniforms.tEquirect.value=e;let a=new Ln(i,r),o=e.minFilter;return e.minFilter===Vi&&(e.minFilter=mn),new Gr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Dm=256,zM=3,VM=20,n0=256,i0=16,GM=3,HM=new H,WM=new ee,Wc=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Gr(1,10,null),this._boxMesh=new Ln(new Ur(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:a=256,position:o=HM}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,f=l.autoClearColor,u=l.autoClearDepth,m=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(WM));let p=new Gr(n,i,h);return p.position.copy(o),p.update(l,t),l.autoClear=d,l.autoClearColor=f,l.autoClearDepth=u,l.autoClearStencil=m,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Om(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Um(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Dm,wm(t))}_fromTexture(t,e){t.mapping===Zs||t.mapping===Xr?this._setSize(t.image.length===0?Dm:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Nm(t,!1,!1),n=Math.log2(t)-zM;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Nm(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Zs||t.mapping===Xr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Om()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Um()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=XM(),this._integrationMaterial=qM());let e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/i0);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-GM)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(n0*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=$M());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}};function Nm(s,t,e){return new co(s,{minFilter:Vi,generateMipmaps:t,type:jn,colorSpace:Ta,depthBuffer:e})}function ho(s,t,e){return new Gn({name:s,uniforms:t,vertexShader:se.cube_vert,fragmentShader:e,side:gn,blending:$s,depthTest:!1,depthWrite:!1})}function XM(){return ho("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${n0}u

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
	`)}function qM(){return ho("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:i0}},`

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
	`)}function $M(){return ho("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${VM}
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
	`)}function Um(){return ho("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Om(){return ho("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function YM(s){let t=new WeakMap,e=new WeakMap,n=null;function i(f,u=!1){return f==null?null:u?a(f):r(f)}function r(f){if(f&&f.isTexture){let u=f.mapping;if(u===nc||u===ic)if(t.has(f)){let m=t.get(f).texture;return o(m,f.mapping)}else{let m=f.image;if(m&&m.height>0){let _=new co(m.height);return _.fromEquirectangularTexture(s,f),t.set(f,_),f.addEventListener("dispose",c),o(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let u=f.mapping,m=u===nc||u===ic,_=u===Zs||u===Xr;if(m||_){let p=e.get(f),g=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new Wc(s)),p=m?n.fromEquirectangular(f,p):n.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,e.set(f,p),p.texture;if(p!==void 0)return p.texture;{let v=f.image;return m&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new Wc(s)),p=m?n.fromEquirectangular(f):n.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,e.set(f,p),f.addEventListener("dispose",h),p.texture):null}}}return f}function o(f,u){return u===nc?f.mapping=Zs:u===ic&&(f.mapping=Xr),f}function l(f){let u=0,m=6;for(let _=0;_<m;_++)f[_]!==void 0&&u++;return u===m}function c(f){let u=f.target;u.removeEventListener("dispose",c);let m=t.get(u);m!==void 0&&(t.delete(u),m.dispose())}function h(f){let u=f.target;u.removeEventListener("dispose",h);let m=e.get(u);m!==void 0&&(e.delete(u),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function ZM(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Sa("WebGLRenderer: "+n+" extension not supported."),i}}}function JM(s,t,e,n){let i={},r=new WeakMap,a=new FinalizationRegistry(m=>delete i[m]);function o(m){l(m.target)}function l(m){m.index!==null&&t.remove(m.index);for(let p in m.attributes)t.remove(m.attributes[p]);m.removeEventListener("dispose",o),delete i[m.id],a.unregister(m);let _=r.get(m);_&&(t.remove(_),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(m,_){return i[_.id]!==void 0||(_.addEventListener("dispose",o),i[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(m){let _=m.attributes;for(let p in _)t.update(_[p],s.ARRAY_BUFFER)}function d(m){let _=m.index,p=m.attributes.position,g=0;if(p===void 0)return;let v=_!==null?_.array.length:p.array.length/3-1,S=p.count>=65535?Da:La,M=new S(Math.ceil(v/3)*6,1),A=M.array;if(_!==null){let x=_.array;g=_.version;for(let b=0,I=0;b<v;b+=3){let P=x[b+0],U=x[b+1],W=x[b+2];A[I++]=P,A[I++]=U,A[I++]=U,A[I++]=W,A[I++]=W,A[I++]=P}}else{g=p.version;for(let x=0,b=0;x<v;x+=3){let I=x+0,P=x+1,U=x+2;A[b++]=I,A[b++]=P,A[b++]=P,A[b++]=U,A[b++]=U,A[b++]=I}}M.version=g;let T=r.get(m);T&&t.remove(T),r.set(m,M)}function f(m){let _=r.get(m);if(_){let p=m.index;p!==null&&_.version<p.version&&d(m)}else d(m);return r.get(m)}function u(){for(let m in i){let _=i[m].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:f,dispose:u}}function KM(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,u){u!==0&&(s.drawElementsInstanced(n,f,r,d*a,u),e.update(f,n,u))}function h(d,f,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,u);let _=0;for(let p=0;p<u;p++)_+=f[p];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function jM(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Jt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function QM(s,t,e){let n=new WeakMap,i=new Re;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==d){let I=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",I)};f!==void 0&&f.texture.dispose();let u=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],S=0;u===!0&&(S=1),m===!0&&(S=2),_===!0&&(S=3);let M=o.attributes.position.count*S,A=1;M>t.maxTextureSize&&(A=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let T=new Float32Array(M*A*4*d),x=new Ra(T,M,A,d);x.type=Kn,x.needsUpdate=!0;let b=S*4;for(let P=0;P<d;P++){let U=p[P],W=g[P],F=v[P],R=M*A*4*P;for(let C=0;C<U.count;C++){let N=C*b;u===!0&&(i.fromBufferAttribute(U,C),T[R+N+0]=i.x,T[R+N+1]=i.y,T[R+N+2]=i.z,T[R+N+3]=0),m===!0&&(i.fromBufferAttribute(W,C),T[R+N+4]=i.x,T[R+N+5]=i.y,T[R+N+6]=i.z,T[R+N+7]=0),_===!0&&(i.fromBufferAttribute(F,C),T[R+N+8]=i.x,T[R+N+9]=i.y,T[R+N+10]=i.z,T[R+N+11]=F.itemSize===4?i.w:1)}}f={count:d,texture:x,size:new Lt(M,A)},n.set(o,f),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let u=0;for(let _=0;_<c.length;_++)u+=c[_];let m=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function tS(s,t,e,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,d=c.geometry,f=t.get(c,d);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let u=c.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return f}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var eS={[Bu]:"LINEAR_TONE_MAPPING",[ku]:"REINHARD_TONE_MAPPING",[zu]:"CINEON_TONE_MAPPING",[Vu]:"ACES_FILMIC_TONE_MAPPING",[Hu]:"AGX_TONE_MAPPING",[Qa]:"NEUTRAL_TONE_MAPPING",[Gu]:"CUSTOM_TONE_MAPPING"};function nS(s,t,e,n,i,r){let a=new In(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new bn;h.setAttribute("position",new Ue([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ue([0,2,0,0,2,0],2));let d=new zl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Ln(h,d),u=new Ja(-1,1,1,-1,0,1),m=null,_=null,p=!1,g,v=null,S=[],M=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let x=0;x<S.length;x++){let b=S[x];b.setSize&&b.setSize(A,T)}},this.setEffects=function(A){S=A,M=S.length>0&&S[0].isRenderPass===!0;let T=a.width,x=a.height;S.length>0&&o===null&&(o=new In(T,x,{type:jn,depthBuffer:!1,stencilBuffer:!1}),l=new In(T,x,{type:jn,depthBuffer:!1,stencilBuffer:!1}));let b=i===!0&&S.some(I=>I.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&c===null&&(c=new zi(T,x),r===!0&&(c.format=Gi,c.type=Js)),a.dispose(),a.depthTexture=b?c:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let I=0;I<S.length;I++){let P=S[I];P.setSize&&P.setSize(T,x),b&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(c)}},this.begin=function(A,T){if(p||A.toneMapping===xi&&S.length===0)return!1;if(v=T,T!==null){let x=T.width,b=T.height;(a.width!==x||a.height!==b)&&this.setSize(x,b)}return M===!1&&A.setRenderTarget(a),g=A.toneMapping,A.toneMapping=xi,!0},this.hasRenderPass=function(){return M},this.end=function(A,T){A.toneMapping=g,p=!0;let x=a,b=o;for(let I=0;I<S.length;I++){let P=S[I];P.enabled!==!1&&(P.render(A,b,x,T),P.needsSwap!==!1&&(x=b,b=b===o?l:o))}if(m!==A.outputColorSpace||_!==A.toneMapping){m=A.outputColorSpace,_=A.toneMapping,d.defines={},ce.getTransfer(m)===_e&&(d.defines.SRGB_TRANSFER="");let I=eS[_];I&&(d.defines[I]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(v),A.render(f,u),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}var s0=new Sn,r0=new zi(1,1),a0=new Oa(1),o0=new Ra,l0=new Tl,c0=new Ua,Fm=[],Bm=[],km=new Float32Array(16),zm=new Float32Array(9),Vm=new Float32Array(4);function Zr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Fm[i];if(r===void 0&&(r=new Float32Array(i),Fm[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function He(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function We(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function qc(s,t){let e=Bm[t];e===void 0&&(e=new Int32Array(t),Bm[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function iS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function sS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2fv(this.addr,t),We(e,t)}}function rS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;s.uniform3fv(this.addr,t),We(e,t)}}function aS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4fv(this.addr,t),We(e,t)}}function oS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Vm.set(n),s.uniformMatrix2fv(this.addr,!1,Vm),We(e,n)}}function lS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;zm.set(n),s.uniformMatrix3fv(this.addr,!1,zm),We(e,n)}}function cS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;km.set(n),s.uniformMatrix4fv(this.addr,!1,km),We(e,n)}}function hS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function uS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2iv(this.addr,t),We(e,t)}}function fS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3iv(this.addr,t),We(e,t)}}function dS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4iv(this.addr,t),We(e,t)}}function pS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function mS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2uiv(this.addr,t),We(e,t)}}function gS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3uiv(this.addr,t),We(e,t)}}function _S(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4uiv(this.addr,t),We(e,t)}}function $c(s){return s.version===0&&(s.compareFunction=tf,s.needsUpdate=!0),s}function xS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=$c(r0):r=s0,e.setTexture2D(t||r,i)}function vS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||l0,i)}function yS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=$c(a0):r=c0,e.setTextureCube(t||r,i)}function MS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||o0,i)}function SS(s){switch(s){case 5126:return iS;case 35664:return sS;case 35665:return rS;case 35666:return aS;case 35674:return oS;case 35675:return lS;case 35676:return cS;case 5124:case 35670:return hS;case 35667:case 35671:return uS;case 35668:case 35672:return fS;case 35669:case 35673:return dS;case 5125:return pS;case 36294:return mS;case 36295:return gS;case 36296:return _S;case 35678:case 36198:case 36298:case 36306:case 35682:return xS;case 35679:case 36299:case 36307:return vS;case 35680:case 36300:case 36308:case 36293:return yS;case 36289:case 36303:case 36311:case 36292:return MS}}function bS(s,t){s.uniform1fv(this.addr,t)}function wS(s,t){let e=Zr(t,this.size,2);s.uniform2fv(this.addr,e)}function AS(s,t){let e=Zr(t,this.size,3);s.uniform3fv(this.addr,e)}function TS(s,t){let e=Zr(t,this.size,4);s.uniform4fv(this.addr,e)}function ES(s,t){let e=Zr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function CS(s,t){let e=Zr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function RS(s,t){let e=Zr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function PS(s,t){s.uniform1iv(this.addr,t)}function IS(s,t){s.uniform2iv(this.addr,t)}function LS(s,t){s.uniform3iv(this.addr,t)}function DS(s,t){s.uniform4iv(this.addr,t)}function NS(s,t){s.uniform1uiv(this.addr,t)}function US(s,t){s.uniform2uiv(this.addr,t)}function OS(s,t){s.uniform3uiv(this.addr,t)}function FS(s,t){s.uniform4uiv(this.addr,t)}function BS(s,t,e){let n=this.cache,i=t.length,r=qc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=$c(r0):a=s0;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function kS(s,t,e){let n=this.cache,i=t.length,r=qc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||l0,r[a])}function zS(s,t,e){let n=this.cache,i=t.length,r=qc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=$c(a0):a=c0;for(let o=0;o!==i;++o)e.setTextureCube(t[o]||a,r[o])}function VS(s,t,e){let n=this.cache,i=t.length,r=qc(e,i);He(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||o0,r[a])}function GS(s){switch(s){case 5126:return bS;case 35664:return wS;case 35665:return AS;case 35666:return TS;case 35674:return ES;case 35675:return CS;case 35676:return RS;case 5124:case 35670:return PS;case 35667:case 35671:return IS;case 35668:case 35672:return LS;case 35669:case 35673:return DS;case 5125:return NS;case 36294:return US;case 36295:return OS;case 36296:return FS;case 35678:case 36198:case 36298:case 36306:case 35682:return BS;case 35679:case 36299:case 36307:return kS;case 35680:case 36300:case 36308:case 36293:return zS;case 36289:case 36303:case 36311:case 36292:return VS}}var _f=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=SS(e.type)}},xf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=GS(e.type)}},vf=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},mf=/(\w+)(\])?(\[|\.)?/g;function Gm(s,t){s.seq.push(t),s.map[t.id]=t}function HS(s,t,e){let n=s.name,i=n.length;for(mf.lastIndex=0;;){let r=mf.exec(n),a=mf.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Gm(e,c===void 0?new _f(o,s,t):new xf(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new vf(o),Gm(e,d)),e=d}}}var Yr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);HS(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Hm(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var WS=37297,XS=0;function qS(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Wm=new Qt;function $S(s){ce._getMatrix(Wm,ce.workingColorSpace,s);let t=`mat3( ${Wm.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(s)){case Ea:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return Yt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Xm(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+qS(s.getShaderSource(t),o)}else return r}function YS(s,t){let e=$S(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var ZS={[Bu]:"Linear",[ku]:"Reinhard",[zu]:"Cineon",[Vu]:"ACESFilmic",[Hu]:"AgX",[Qa]:"Neutral",[Gu]:"Custom"};function JS(s,t){let e=ZS[t];return e===void 0?(Yt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Hc=new H;function KS(){ce.getLuminanceCoefficients(Hc);let s=Hc.x.toFixed(4),t=Hc.y.toFixed(4),e=Hc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lo).join(`
`)}function QS(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function tb(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function lo(s){return s!==""}function qm(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function $m(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var eb=/^[ \t]*#include +<([\w\d./]+)>/gm;function yf(s){return s.replace(eb,nb)}function nb(s,t){let e=se[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return yf(e)}var ib=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ym(s){return s.replace(ib,sb)}function sb(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Zm(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var rb={[qs]:"SHADOWMAP_TYPE_PCF",[Hr]:"SHADOWMAP_TYPE_VSM"};function ab(s){return rb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ob={[Xr]:"ENVMAP_MODE_REFRACTION"};function lb(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":ob[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var cb={[Fu]:"ENVMAP_BLENDING_MULTIPLY",[lm]:"ENVMAP_BLENDING_MIX",[cm]:"ENVMAP_BLENDING_ADD"};function hb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":cb[s.combine]||"ENVMAP_BLENDING_NONE"}function ub(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=ab(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=lb(e),d=hb(e),f=jS(e),u=QS(r),m=i.createProgram(),_,p,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(lo).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(lo).join(`
`),p.length>0&&(p+=`
`)):(_=[Zm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lo).join(`
`),p=[Zm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?se.tonemapping_pars_fragment:"",e.toneMapping!==xi?JS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,YS("linearToOutputTexel",e.outputColorSpace),KS(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(lo).join(`
`)),a=yf(a),a=qm(a,e),a=$m(a,e),o=yf(o),o=qm(o,e),o=$m(o,e),a=Ym(a),o=Ym(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",e.glslVersion===ef?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ef?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=g+_+a,S=g+p+o,M=Hm(i,i.VERTEX_SHADER,v),A=Hm(i,i.FRAGMENT_SHADER,S);i.attachShader(m,M),i.attachShader(m,A),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function T(P){if(s.debug.checkShaderErrors){let U=i.getProgramInfoLog(m)||"",W=i.getShaderInfoLog(M)||"",F=i.getShaderInfoLog(A)||"",R=U.trim(),C=W.trim(),N=F.trim(),L=!0,k=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(L=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,M,A);else{let z=Xm(i,M,"vertex"),X=Xm(i,A,"fragment");Jt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+R+`
`+z+`
`+X)}else R!==""?Yt("WebGLProgram: Program Info Log:",R):(C===""||N==="")&&(k=!1);k&&(P.diagnostics={runnable:L,programLog:R,vertexShader:{log:C,prefix:_},fragmentShader:{log:N,prefix:p}})}i.deleteShader(M),i.deleteShader(A),x=new Yr(i,m),b=tb(i,m)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(m,WS)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=XS++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=M,this.fragmentShader=A,this}var fb=0,Mf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Sf(t),e.set(t,n)),n}},Sf=class{constructor(t){this.id=fb++,this.code=t,this.usedTimes=0}};function db(s){return s===_s||s===ro||s===ao}function pb(s,t,e,n,i,r){let a=new Pa,o=new Mf,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,b,I,P,U,W){let F=P.fog,R=U.geometry,C=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,N=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,L=t.get(x.envMap||C,N),k=f[x.type],z=n.precision;x.precision!==null&&(z=n.getMaxPrecision(x.precision),z!==x.precision&&Yt("WebGLProgram.getParameters:",x.precision,"not supported, using",z,"instead."));let X=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,$=X!==void 0?X.length:0,ot=0;R.morphAttributes.position!==void 0&&(ot=1),R.morphAttributes.normal!==void 0&&(ot=2),R.morphAttributes.color!==void 0&&(ot=3);let Tt,Y,ft,At;if(k){let Nt=yi[k];Tt=Nt.vertexShader,Y=Nt.fragmentShader}else{Tt=x.vertexShader,Y=x.fragmentShader;let Nt=o.getVertexShaderStage(x),xe=o.getFragmentShaderStage(x);o.update(x,Nt,xe),ft=Nt.id,At=xe.id}let Pt=s.getRenderTarget(),mt=s.state.buffers.depth.getReversed(),Bt=U.isInstancedMesh===!0,Kt=U.isBatchedMesh===!0,zt=!!x.map,Zt=!!x.matcap,jt=!!L,at=jt&&L.isPMREMTexture===!0,q=!!x.aoMap,it=!!x.lightMap,ut=!!x.bumpMap&&x.wireframe===!1,V=!!x.normalMap,lt=!!x.displacementMap,dt=!!x.emissiveMap,Et=!!x.metalnessMap,Dt=!!x.roughnessMap,Xt=x.anisotropy>0,O=x.clearcoat>0,de=x.diffuseRoughness>0,et=x.dispersion>0,vt=x.retroreflectivity>0,nt=x.iridescence>0,Ct=x.sheen>0,gt=x.transmission>0,yt=Xt&&!!x.anisotropyMap,E=O&&!!x.clearcoatMap,y=O&&!!x.clearcoatNormalMap,G=O&&!!x.clearcoatRoughnessMap,ht=de&&!!x.diffuseRoughnessMap,st=nt&&!!x.iridescenceMap,_t=nt&&!!x.iridescenceThicknessMap,xt=Ct&&!!x.sheenColorMap,J=Ct&&!!x.sheenRoughnessMap,Q=!!x.specularMap,pt=!!x.specularColorMap,D=!!x.specularIntensityMap,rt=gt&&!!x.transmissionMap,tt=gt&&!!x.thicknessMap,bt=!!x.gradientMap,St=!!x.alphaMap,wt=x.alphaTest>0,Ht=!!x.alphaHash,ie=!!x.extensions,Mt=xi;x.toneMapped&&(Pt===null||Pt.isXRRenderTarget===!0)&&(Mt=s.toneMapping);let $t=at?L.isCompressedCubeTexture?L.image[0].mipmaps:L.mipmaps:null,ne={shaderID:k,shaderType:x.type,shaderName:x.name,vertexShader:Tt,fragmentShader:Y,defines:x.defines,customVertexShaderID:ft,customFragmentShaderID:At,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:z,batching:Kt,batchingColor:Kt&&U._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&U.instanceColor!==null,instancingMorph:Bt&&U.morphTexture!==null,outputColorSpace:Pt===null?s.outputColorSpace:Pt.isXRRenderTarget===!0?Pt.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:zt,matcap:Zt,envMap:jt,envMapMode:jt&&L.mapping,envMapPMREM:at,envMapMaxLod:at?$t.length-1:null,envMapSize:at?$t[0].width:null,aoMap:q,lightMap:it,bumpMap:ut,normalMap:V,displacementMap:lt,emissiveMap:dt,normalMapObjectSpace:V&&x.normalMapType===fm,normalMapTangentSpace:V&&x.normalMapType===Vc,packedNormalMap:V&&x.normalMapType===Vc&&db(x.normalMap.format),metalnessMap:Et,roughnessMap:Dt,anisotropy:Xt,anisotropyMap:yt,clearcoat:O,clearcoatMap:E,clearcoatNormalMap:y,clearcoatRoughnessMap:G,diffuseRoughness:de,diffuseRoughnessMap:ht,dispersion:et,retroreflection:vt,iridescence:nt,iridescenceMap:st,iridescenceThicknessMap:_t,sheen:Ct,sheenColorMap:xt,sheenRoughnessMap:J,specularMap:Q,specularColorMap:pt,specularIntensityMap:D,transmission:gt,transmissionMap:rt,thicknessMap:tt,gradientMap:bt,opaque:x.transparent===!1&&x.blending===Wr&&x.alphaToCoverage===!1,alphaMap:St,alphaTest:wt,alphaHash:Ht,combine:x.combine,mapUv:zt&&u(x.map.channel),aoMapUv:q&&u(x.aoMap.channel),lightMapUv:it&&u(x.lightMap.channel),bumpMapUv:ut&&u(x.bumpMap.channel),normalMapUv:V&&u(x.normalMap.channel),displacementMapUv:lt&&u(x.displacementMap.channel),emissiveMapUv:dt&&u(x.emissiveMap.channel),metalnessMapUv:Et&&u(x.metalnessMap.channel),roughnessMapUv:Dt&&u(x.roughnessMap.channel),anisotropyMapUv:yt&&u(x.anisotropyMap.channel),clearcoatMapUv:E&&u(x.clearcoatMap.channel),clearcoatNormalMapUv:y&&u(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&u(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ht&&u(x.diffuseRoughnessMap.channel),iridescenceMapUv:st&&u(x.iridescenceMap.channel),iridescenceThicknessMapUv:_t&&u(x.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&u(x.sheenColorMap.channel),sheenRoughnessMapUv:J&&u(x.sheenRoughnessMap.channel),specularMapUv:Q&&u(x.specularMap.channel),specularColorMapUv:pt&&u(x.specularColorMap.channel),specularIntensityMapUv:D&&u(x.specularIntensityMap.channel),transmissionMapUv:rt&&u(x.transmissionMap.channel),thicknessMapUv:tt&&u(x.thicknessMap.channel),alphaMapUv:St&&u(x.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(V||Xt),vertexNormals:!!R.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!R.attributes.uv&&(zt||St),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||R.attributes.normal===void 0&&V===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:mt,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:R.attributes.position!==void 0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:ot,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:W.filter(Nt=>Nt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Mt,decodeVideoTexture:zt&&x.map.isVideoTexture===!0&&ce.getTransfer(x.map.colorSpace)===_e,decodeVideoTextureEmissive:dt&&x.emissiveMap.isVideoTexture===!0&&ce.getTransfer(x.emissiveMap.colorSpace)===_e,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===_i,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ie&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&x.extensions.multiDraw===!0||Kt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ne.vertexUv1s=l.has(1),ne.vertexUv2s=l.has(2),ne.vertexUv3s=l.has(3),l.clear(),ne}function _(x){let b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)b.push(I),b.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(b,x),g(b,x),b.push(s.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function p(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapPMREM),x.push(b.envMapMaxLod),x.push(b.envMapSize),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.diffuseRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.numSunLights),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numSunLightShadows),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.numLightProbeGrids),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function g(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function v(x){let b=f[x.type],I;if(b){let P=yi[b];I=Pm.clone(P.uniforms)}else I=x.uniforms;return I}function S(x,b){let I=h.get(b);return I!==void 0?++I.usedTimes:(I=new ub(s,b,x,i),c.push(I),h.set(b,I)),I}function M(x){if(--x.usedTimes===0){let b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function T(){o.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:v,acquireProgram:S,releaseProgram:M,releaseShaderCache:A,programs:c,dispose:T}}function mb(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function gb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Jm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Km(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(f){let u=0;return f.isInstancedMesh&&(u+=2),f.isSkinnedMesh&&(u+=1),u}function o(f,u,m,_,p,g){let v=s[t];return v===void 0?(v={id:f.id,object:f,geometry:u,material:m,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:p,group:g},s[t]=v):(v.id=f.id,v.object=f,v.geometry=u,v.material=m,v.materialVariant=a(f),v.groupOrder=_,v.renderOrder=f.renderOrder,v.z=p,v.group=g),t++,v}function l(f,u,m,_,p,g,v){v.reversedDepth===!0&&(p=-p);let S=o(f,u,m,_,p,g);m.transmission>0?n.push(S):m.transparent===!0?i.push(S):e.push(S)}function c(f,u,m,_,p,g){let v=o(f,u,m,_,p,g);m.transmission>0?n.unshift(v):m.transparent===!0?i.unshift(v):e.unshift(v)}function h(f,u){e.length>1&&e.sort(f||gb),n.length>1&&n.sort(u||Jm),i.length>1&&i.sort(u||Jm)}function d(){for(let f=t,u=s.length;f<u;f++){let m=s[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function _b(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new Km,s.set(n,[a])):i>=r.length?(a=new Km,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function xb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new H,color:new ee};break;case"SpotLight":e={position:new H,direction:new H,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new H,halfWidth:new H,halfHeight:new H};break}return s[t.id]=e,e}}}function vb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var yb=0;function Mb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Sb(s){let t=new xb,e=vb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);let i=new H,r=new be,a=new be;function o(c){let h=0,d=0,f=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let u=0,m=0,_=0,p=0,g=0,v=0,S=0,M=0,A=0,T=0,x=0,b=0,I=0,P=0;c.sort(Mb);for(let W=0,F=c.length;W<F;W++){let R=c[W],C=R.color,N=R.intensity,L=R.distance,k=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===_s?k=R.shadow.map.texture:k=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=C.r*N,d+=C.g*N,f+=C.b*N;else if(R.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(R.sh.coefficients[z],N);P++}else if(R.isSunLight){let z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let X=R.shadow,$=e.get(R);$.shadowIntensity=X.intensity,$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),n.sunShadow[m]=$,n.sunShadowMap[m]=k;let ot=X.getViewportCount();for(let Tt=0;Tt<ot;Tt++)n.sunShadowMatrix[_+Tt]=X.getMatrix(Tt),n.sunShadowCascade[_+Tt]=X._cascadeData[Tt];_+=ot,m++}n.sun[u]=z,u++}else if(R.isDirectionalLight){let z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let X=R.shadow,$=e.get(R);$.shadowIntensity=X.intensity,$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=k,n.directionalShadowMatrix[p]=R.shadow.matrix,A++}n.directional[p]=z,p++}else if(R.isSpotLight){let z=t.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(C).multiplyScalar(N),z.distance=L,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,n.spot[v]=z;let X=R.shadow;if(R.map&&(n.spotLightMap[b]=R.map,b++,X.updateMatrices(R),R.castShadow&&I++),n.spotLightMatrix[v]=X.matrix,R.castShadow){let $=e.get(R);$.shadowIntensity=X.intensity,$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,n.spotShadow[v]=$,n.spotShadowMap[v]=k,x++}v++}else if(R.isRectAreaLight){let z=t.get(R);z.color.copy(C).multiplyScalar(N),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),n.rectArea[S]=z,S++}else if(R.isPointLight){let z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){let X=R.shadow,$=e.get(R);$.shadowIntensity=X.intensity,$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,$.shadowCameraNear=X.camera.near,$.shadowCameraFar=X.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=R.shadow.matrix,T++}n.point[g]=z,g++}else if(R.isHemisphereLight){let z=t.get(R);z.skyColor.copy(R.color).multiplyScalar(N),z.groundColor.copy(R.groundColor).multiplyScalar(N),n.hemi[M]=z,M++}}S>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ut.LTC_FLOAT_1,n.rectAreaLTC2=Ut.LTC_FLOAT_2):(n.rectAreaLTC1=Ut.LTC_HALF_1,n.rectAreaLTC2=Ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;let U=n.hash;(U.sunLength!==u||U.directionalLength!==p||U.pointLength!==g||U.spotLength!==v||U.rectAreaLength!==S||U.hemiLength!==M||U.numSunShadows!==m||U.numDirectionalShadows!==A||U.numPointShadows!==T||U.numSpotShadows!==x||U.numSpotMaps!==b||U.numLightProbes!==P)&&(n.sun.length=u,n.directional.length=p,n.spot.length=v,n.rectArea.length=S,n.point.length=g,n.hemi.length=M,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+b-I,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=P,U.sunLength=u,U.directionalLength=p,U.pointLength=g,U.spotLength=v,U.rectAreaLength=S,U.hemiLength=M,U.numSunShadows=m,U.numDirectionalShadows=A,U.numPointShadows=T,U.numSpotShadows=x,U.numSpotMaps=b,U.numLightProbes=P,n.version=yb++)}function l(c,h){let d=0,f=0,u=0,m=0,_=0,p=0,g=h.matrixWorldInverse;for(let v=0,S=c.length;v<S;v++){let M=c[v];if(M.isSunLight){let A=n.sun[d];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(g),d++}else if(M.isDirectionalLight){let A=n.directional[f];A.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),f++}else if(M.isSpotLight){let A=n.spot[m];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),m++}else if(M.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){let A=n.point[u];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),u++}else if(M.isHemisphereLight){let A=n.hemi[p];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function jm(s){let t=new Sb(s),e=[],n=[],i=[];function r(d){h.camera=d,e.length=0,n.length=0,i.length=0}function a(d){d.isLightProbeGrid?i.push(d):e.push(d)}function o(d){n.push(d)}function l(){t.setup(e),i.sort((d,f)=>d.priority-f.priority||d.id-f.id)}function c(d){t.setupView(e,d)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function bb(s){let t=new WeakMap;function e(i,r=0){let a=t.get(i),o;return a===void 0?(o=new jm(s),t.set(i,[o])):r>=a.length?(o=new jm(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var wb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ab=`uniform sampler2D shadow_pass;
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
}`,Tb=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Eb=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Qm=new be,oo=new H,gf=new H;function Cb(s,t,e){let n=new fs,i=new Lt,r=new Lt,a=new Re,o=new Vl,l=new Gl,c={},h=e.maxTextureSize,d={[gs]:gn,[gn]:gs,[_i]:_i},f=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Lt},radius:{value:4}},vertexShader:wb,fragmentShader:Ab}),u=f.clone();u.defines.HORIZONTAL_PASS=1;let m=new bn;m.setAttribute("position",new pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ln(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qs;let g=this.type;this.render=function(T,x,b){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===Hp&&(Yt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=qs);let I=s.getRenderTarget(),P=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),W=s.state;W.setBlending($s),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let F=g!==this.type;F&&x.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(C=>C.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,C=T.length;R<C;R++){let N=T[R],L=N.shadow;if(L===void 0){Yt("WebGLShadowMap:",N,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;i.copy(L.mapSize);let k=L.getFrameExtents();i.multiply(k),r.copy(L.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/k.x),i.x=r.x*k.x,L.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/k.y),i.y=r.y*k.y,L.mapSize.y=r.y));let z=s.state.buffers.depth.getReversed();if(L.camera._reversedDepth=z,L.map===null||F===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Hr){if(N.isPointLight){Yt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new In(i.x,i.y,{format:_s,type:jn,minFilter:mn,magFilter:mn,generateMipmaps:!1}),L.map.texture.name=N.name+".shadowMap",L.map.depthTexture=new zi(i.x,i.y,Kn),L.map.depthTexture.name=N.name+".shadowMapDepth",L.map.depthTexture.format=Bi,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Ye,L.map.depthTexture.magFilter=Ye}else N.isPointLight?(L.map=new co(i.x),L.map.depthTexture=new Oa(i.x,Jn)):(L.map=new In(i.x,i.y),L.map.depthTexture=new zi(i.x,i.y,Jn)),L.map.depthTexture.name=N.name+".shadowMap",L.map.depthTexture.format=Bi,this.type===qs?(L.map.depthTexture.compareFunction=z?Qu:ju,L.map.depthTexture.minFilter=mn,L.map.depthTexture.magFilter=mn):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Ye,L.map.depthTexture.magFilter=Ye);L.camera.updateProjectionMatrix()}L.map.isWebGLCubeRenderTarget!==!0&&(L.map.width!==i.x||L.map.height!==i.y)&&L.map.setSize(i.x,i.y);let X=L.map.isWebGLCubeRenderTarget?6:L.getViewportCount();N.isPointLight!==!0&&L.updateMatrices(N,b);let $=(L.camera.layers.mask&4294967294)!==0?L.camera.layers:b.layers;for(let ot=0;ot<X;ot++){let Tt=L.getCamera(ot);if(N.isPointLight){let Y=L.camera,ft=L.matrix,At=N.distance||Y.far;At!==Y.far&&(Y.far=At,Y.updateProjectionMatrix()),oo.setFromMatrixPosition(N.matrixWorld),Y.position.copy(oo),gf.copy(Y.position),gf.add(Tb[ot]),Y.up.copy(Eb[ot]),Y.lookAt(gf),Y.updateMatrixWorld(),ft.makeTranslation(-oo.x,-oo.y,-oo.z),Qm.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),L._frustum.setFromProjectionMatrix(Qm,Y.coordinateSystem,Y.reversedDepth)}if(L.map.isWebGLCubeRenderTarget)s.setRenderTarget(L.map,ot),s.clear();else{ot===0&&(s.setRenderTarget(L.map),s.clear());let Y=L.getViewport(ot);a.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),W.viewport(a)}n=L.getFrustum(ot),M(x,b,Tt,N,$,this.type)}L.isPointLightShadow!==!0&&this.type===Hr&&v(L,b),L.needsUpdate=!1}g=this.type,p.needsUpdate=!1,s.setRenderTarget(I,P,U)};function v(T,x){let b=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,u.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),T.mapPass===null?T.mapPass=new In(i.x,i.y,{format:_s,type:jn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(x,null,b,f,_,null),u.uniforms.shadow_pass.value=T.mapPass.texture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(x,null,b,u,_,null)}function S(T,x,b,I){let P=null,U=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)P=U;else if(P=b.isPointLight===!0?l:o,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let W=P.uuid,F=x.uuid,R=c[W];R===void 0&&(R={},c[W]=R);let C=R[F];C===void 0&&(C=P.clone(),R[F]=C,x.addEventListener("dispose",A)),P=C}if(P.visible=x.visible,P.wireframe=x.wireframe,I===Hr?P.side=x.shadowSide!==null?x.shadowSide:x.side:P.side=x.shadowSide!==null?x.shadowSide:d[x.side],P.alphaMap=x.alphaMap,P.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,P.map=x.map,P.clipShadows=x.clipShadows,P.clippingPlanes=x.clippingPlanes,P.clipIntersection=x.clipIntersection,P.displacementMap=x.displacementMap,P.displacementScale=x.displacementScale,P.displacementBias=x.displacementBias,P.wireframeLinewidth=x.wireframeLinewidth,P.linewidth=x.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let W=s.properties.get(P);W.light=b}return P}function M(T,x,b,I,P,U){if(T.visible===!1)return;if(T.layers.test(P)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&U===Hr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);let R=t.update(T),C=T.material;if(Array.isArray(C)){let N=R.groups;for(let L=0,k=N.length;L<k;L++){let z=N[L],X=C[z.materialIndex];if(X&&X.visible){let $=S(T,X,I,U);T.onBeforeShadow(s,T,x,b,R,$,z),s.renderBufferDirect(b,null,R,$,T,z),T.onAfterShadow(s,T,x,b,R,$,z)}}}else if(C.visible){let N=S(T,C,I,U);T.onBeforeShadow(s,T,x,b,R,N,null),s.renderBufferDirect(b,null,R,N,T,null),T.onAfterShadow(s,T,x,b,R,N,null)}}let F=T.children;for(let R=0,C=F.length;R<C;R++)M(F[R],x,b,I,P,U)}function A(T){T.target.removeEventListener("dispose",A);for(let b in c){let I=c[b],P=T.target.uuid;P in I&&(I[P].dispose(),delete I[P])}}}function Rb(s,t){function e(){let D=!1,rt=new Re,tt=null,bt=new Re(0,0,0,0);return{setMask:function(St){tt!==St&&!D&&(s.colorMask(St,St,St,St),tt=St)},setLocked:function(St){D=St},setClear:function(St,wt,Ht,ie,Mt){Mt===!0&&(St*=ie,wt*=ie,Ht*=ie),rt.set(St,wt,Ht,ie),bt.equals(rt)===!1&&(s.clearColor(St,wt,Ht,ie),bt.copy(rt))},reset:function(){D=!1,tt=null,bt.set(-1,0,0,0)}}}function n(){let D=!1,rt=!1,tt=null,bt=null,St=null;return{setReversed:function(wt){if(rt!==wt){let Ht=t.get("EXT_clip_control");wt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),rt=wt;let ie=St;St=null,this.setClear(ie)}},getReversed:function(){return rt},setTest:function(wt){wt?mt(s.DEPTH_TEST):Bt(s.DEPTH_TEST)},setMask:function(wt){tt!==wt&&!D&&(s.depthMask(wt),tt=wt)},setFunc:function(wt){if(rt&&(wt=bm[wt]),bt!==wt){switch(wt){case dl:s.depthFunc(s.NEVER);break;case pl:s.depthFunc(s.ALWAYS);break;case ml:s.depthFunc(s.LESS);break;case Cr:s.depthFunc(s.LEQUAL);break;case gl:s.depthFunc(s.EQUAL);break;case _l:s.depthFunc(s.GEQUAL);break;case xl:s.depthFunc(s.GREATER);break;case vl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}bt=wt}},setLocked:function(wt){D=wt},setClear:function(wt){St!==wt&&(St=wt,rt&&(wt=1-wt),s.clearDepth(wt))},reset:function(){D=!1,tt=null,bt=null,St=null,rt=!1}}}function i(){let D=!1,rt=null,tt=null,bt=null,St=null,wt=null,Ht=null,ie=null,Mt=null;return{setTest:function($t){D||($t?mt(s.STENCIL_TEST):Bt(s.STENCIL_TEST))},setMask:function($t){rt!==$t&&!D&&(s.stencilMask($t),rt=$t)},setFunc:function($t,ne,Nt){(tt!==$t||bt!==ne||St!==Nt)&&(s.stencilFunc($t,ne,Nt),tt=$t,bt=ne,St=Nt)},setOp:function($t,ne,Nt){(wt!==$t||Ht!==ne||ie!==Nt)&&(s.stencilOp($t,ne,Nt),wt=$t,Ht=ne,ie=Nt)},setLocked:function($t){D=$t},setClear:function($t){Mt!==$t&&(s.clearStencil($t),Mt=$t)},reset:function(){D=!1,rt=null,tt=null,bt=null,St=null,wt=null,Ht=null,ie=null,Mt=null}}}let r=new e,a=new n,o=new i,l={},c=new WeakMap,h={},d={},f={},u=new WeakMap,m=[],_=null,p=!1,g=null,v=null,S=null,M=null,A=null,T=null,x=null,b=new ee(0,0,0),I=0,P=!1,U=null,W=null,F=null,R=null,C=null,N=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),L=!1,k=0,z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(z)[1]),L=k>=1):z.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),L=k>=2);let X=null,$={},ot=s.getParameter(s.SCISSOR_BOX),Tt=s.getParameter(s.VIEWPORT),Y=new Re().fromArray(ot),ft=new Re().fromArray(Tt);function At(D,rt,tt,bt){let St=new Uint8Array(4),wt=s.createTexture();s.bindTexture(D,wt),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<tt;Ht++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(rt,0,s.RGBA,1,1,bt,0,s.RGBA,s.UNSIGNED_BYTE,St):s.texImage2D(rt+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,St);return wt}let Pt={};Pt[s.TEXTURE_2D]=At(s.TEXTURE_2D,s.TEXTURE_2D,1),Pt[s.TEXTURE_CUBE_MAP]=At(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pt[s.TEXTURE_2D_ARRAY]=At(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Pt[s.TEXTURE_3D]=At(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),mt(s.DEPTH_TEST),a.setFunc(Cr),ut(!1),V(Lu),mt(s.CULL_FACE),q($s);function mt(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Bt(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function Kt(D,rt){return f[D]!==rt?(s.bindFramebuffer(D,rt),f[D]=rt,D===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=rt),D===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=rt),!0):!1}function zt(D,rt){let tt=m,bt=!1;if(D){tt=u.get(rt),tt===void 0&&(tt=[],u.set(rt,tt));let St=D.textures;if(tt.length!==St.length||tt[0]!==s.COLOR_ATTACHMENT0){for(let wt=0,Ht=St.length;wt<Ht;wt++)tt[wt]=s.COLOR_ATTACHMENT0+wt;tt.length=St.length,bt=!0}}else tt[0]!==s.BACK&&(tt[0]=s.BACK,bt=!0);bt&&s.drawBuffers(tt)}function Zt(D){return _!==D?(s.useProgram(D),_=D,!0):!1}let jt={[Ys]:s.FUNC_ADD,[Xp]:s.FUNC_SUBTRACT,[qp]:s.FUNC_REVERSE_SUBTRACT};jt[$p]=s.MIN,jt[Yp]=s.MAX;let at={[Zp]:s.ZERO,[Jp]:s.ONE,[Kp]:s.SRC_COLOR,[Uu]:s.SRC_ALPHA,[im]:s.SRC_ALPHA_SATURATE,[em]:s.DST_COLOR,[Qp]:s.DST_ALPHA,[jp]:s.ONE_MINUS_SRC_COLOR,[Ou]:s.ONE_MINUS_SRC_ALPHA,[nm]:s.ONE_MINUS_DST_COLOR,[tm]:s.ONE_MINUS_DST_ALPHA,[sm]:s.CONSTANT_COLOR,[rm]:s.ONE_MINUS_CONSTANT_COLOR,[am]:s.CONSTANT_ALPHA,[om]:s.ONE_MINUS_CONSTANT_ALPHA};function q(D,rt,tt,bt,St,wt,Ht,ie,Mt,$t){if(D===$s){p===!0&&(Bt(s.BLEND),p=!1);return}if(p===!1&&(mt(s.BLEND),p=!0),D!==Wp){if(D!==g||$t!==P){if((v!==Ys||A!==Ys)&&(s.blendEquation(s.FUNC_ADD),v=Ys,A=Ys),$t)switch(D){case Wr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ja:s.blendFunc(s.ONE,s.ONE);break;case Du:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Nu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Jt("WebGLState: Invalid blending: ",D);break}else switch(D){case Wr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ja:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Du:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nu:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",D);break}S=null,M=null,T=null,x=null,b.set(0,0,0),I=0,g=D,P=$t}return}St=St||rt,wt=wt||tt,Ht=Ht||bt,(rt!==v||St!==A)&&(s.blendEquationSeparate(jt[rt],jt[St]),v=rt,A=St),(tt!==S||bt!==M||wt!==T||Ht!==x)&&(s.blendFuncSeparate(at[tt],at[bt],at[wt],at[Ht]),S=tt,M=bt,T=wt,x=Ht),(ie.equals(b)===!1||Mt!==I)&&(s.blendColor(ie.r,ie.g,ie.b,Mt),b.copy(ie),I=Mt),g=D,P=!1}function it(D,rt){D.side===_i?Bt(s.CULL_FACE):mt(s.CULL_FACE);let tt=D.side===gn;rt&&(tt=!tt),ut(tt),D.blending===Wr&&D.transparent===!1?q($s):q(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let bt=D.stencilWrite;o.setTest(bt),bt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),dt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?mt(s.SAMPLE_ALPHA_TO_COVERAGE):Bt(s.SAMPLE_ALPHA_TO_COVERAGE)}function ut(D){U!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),U=D)}function V(D){D!==Vp?(mt(s.CULL_FACE),D!==W&&(D===Lu?s.cullFace(s.BACK):D===Gp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Bt(s.CULL_FACE),W=D}function lt(D){D!==F&&(L&&s.lineWidth(D),F=D)}function dt(D,rt,tt){D?(mt(s.POLYGON_OFFSET_FILL),(R!==rt||C!==tt)&&(R=rt,C=tt,a.getReversed()&&(rt=-rt,tt=-tt),s.polygonOffset(rt,tt))):Bt(s.POLYGON_OFFSET_FILL)}function Et(D){D?mt(s.SCISSOR_TEST):Bt(s.SCISSOR_TEST)}function Dt(D){D===void 0&&(D=s.TEXTURE0+N-1),X!==D&&(s.activeTexture(D),X=D)}function Xt(D,rt,tt){tt===void 0&&(X===null?tt=s.TEXTURE0+N-1:tt=X);let bt=$[tt];bt===void 0&&(bt={type:void 0,texture:void 0},$[tt]=bt),(bt.type!==D||bt.texture!==rt)&&(X!==tt&&(s.activeTexture(tt),X=tt),s.bindTexture(D,rt||Pt[D]),bt.type=D,bt.texture=rt)}function O(){let D=$[X];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function de(){try{s.compressedTexImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function et(){try{s.compressedTexImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function vt(){try{s.texSubImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function nt(){try{s.texSubImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function Ct(){try{s.compressedTexSubImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function gt(){try{s.compressedTexSubImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function yt(){try{s.texStorage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function E(){try{s.texStorage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function y(){try{s.texImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function G(){try{s.texImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function ht(D){return d[D]!==void 0?d[D]:s.getParameter(D)}function st(D,rt){d[D]!==rt&&(s.pixelStorei(D,rt),d[D]=rt)}function _t(D){Y.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),Y.copy(D))}function xt(D){ft.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),ft.copy(D))}function J(D,rt){let tt=c.get(rt);tt===void 0&&(tt=new WeakMap,c.set(rt,tt));let bt=tt.get(D);bt===void 0&&(bt=s.getUniformBlockIndex(rt,D.name),s.uniformBlockBinding(rt,bt,bt),tt.set(D,bt))}function Q(D,rt,tt){let St=c.get(rt).get(D);l[St]!==tt&&(s.bindBufferBase(s.UNIFORM_BUFFER,St,tt),l[St]=tt)}function pt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},X=null,$={},f={},l={},u=new WeakMap,m=[],_=null,p=!1,g=null,v=null,S=null,M=null,A=null,T=null,x=null,b=new ee(0,0,0),I=0,P=!1,U=null,W=null,F=null,R=null,C=null,Y.set(0,0,s.canvas.width,s.canvas.height),ft.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:mt,disable:Bt,bindFramebuffer:Kt,drawBuffers:zt,useProgram:Zt,setBlending:q,setMaterial:it,setFlipSided:ut,setCullFace:V,setLineWidth:lt,setPolygonOffset:dt,setScissorTest:Et,activeTexture:Dt,bindTexture:Xt,unbindTexture:O,compressedTexImage2D:de,compressedTexImage3D:et,texImage2D:y,texImage3D:G,pixelStorei:st,getParameter:ht,updateUBOMapping:J,uniformBlockBinding:Q,texStorage2D:yt,texStorage3D:E,texSubImage2D:vt,texSubImage3D:nt,compressedTexSubImage2D:Ct,compressedTexSubImage3D:gt,scissor:_t,viewport:xt,reset:pt}}function Pb(s,t,e,n,i,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Lt,h=new WeakMap,d=new Set,f,u=new WeakMap,m=new Set,_=new FinalizationRegistry(E=>m.delete(E)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return p?new OffscreenCanvas(E,y):Ca("canvas")}function v(E,y,G){let ht=1,st=yt(E);if((st.width>G||st.height>G)&&(ht=G/Math.max(st.width,st.height)),ht<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let _t=Math.floor(ht*st.width),xt=Math.floor(ht*st.height);f===void 0&&(f=g(_t,xt));let J=y?g(_t,xt):f;return J.width=_t,J.height=xt,J.getContext("2d").drawImage(E,0,0,_t,xt),Yt("WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+_t+"x"+xt+")."),J}else return"data"in E&&Yt("WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),E;return E}function S(E){return E.generateMipmaps}function M(E){s.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(E,y,G,ht,st,_t=!1){if(E!==null){if(s[E]!==void 0)return s[E];Yt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let xt;ht&&(xt=t.get("EXT_texture_norm16"),xt||Yt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=y;if(y===s.RED&&(G===s.FLOAT&&(J=s.R32F),G===s.HALF_FLOAT&&(J=s.R16F),G===s.UNSIGNED_BYTE&&(J=s.R8),G===s.UNSIGNED_SHORT&&xt&&(J=xt.R16_EXT),G===s.SHORT&&xt&&(J=xt.R16_SNORM_EXT)),y===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.R8UI),G===s.UNSIGNED_SHORT&&(J=s.R16UI),G===s.UNSIGNED_INT&&(J=s.R32UI),G===s.BYTE&&(J=s.R8I),G===s.SHORT&&(J=s.R16I),G===s.INT&&(J=s.R32I)),y===s.RG&&(G===s.FLOAT&&(J=s.RG32F),G===s.HALF_FLOAT&&(J=s.RG16F),G===s.UNSIGNED_BYTE&&(J=s.RG8),G===s.UNSIGNED_SHORT&&xt&&(J=xt.RG16_EXT),G===s.SHORT&&xt&&(J=xt.RG16_SNORM_EXT)),y===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.RG8UI),G===s.UNSIGNED_SHORT&&(J=s.RG16UI),G===s.UNSIGNED_INT&&(J=s.RG32UI),G===s.BYTE&&(J=s.RG8I),G===s.SHORT&&(J=s.RG16I),G===s.INT&&(J=s.RG32I)),y===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.RGB8UI),G===s.UNSIGNED_SHORT&&(J=s.RGB16UI),G===s.UNSIGNED_INT&&(J=s.RGB32UI),G===s.BYTE&&(J=s.RGB8I),G===s.SHORT&&(J=s.RGB16I),G===s.INT&&(J=s.RGB32I)),y===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),G===s.UNSIGNED_INT&&(J=s.RGBA32UI),G===s.BYTE&&(J=s.RGBA8I),G===s.SHORT&&(J=s.RGBA16I),G===s.INT&&(J=s.RGBA32I)),y===s.RGB&&(G===s.UNSIGNED_SHORT&&xt&&(J=xt.RGB16_EXT),G===s.SHORT&&xt&&(J=xt.RGB16_SNORM_EXT),G===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),G===s.UNSIGNED_INT_10F_11F_11F_REV&&(J=s.R11F_G11F_B10F)),y===s.RGBA){let Q=_t?Ea:ce.getTransfer(st);G===s.FLOAT&&(J=s.RGBA32F),G===s.HALF_FLOAT&&(J=s.RGBA16F),G===s.UNSIGNED_BYTE&&(J=Q===_e?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT&&xt&&(J=xt.RGBA16_EXT),G===s.SHORT&&xt&&(J=xt.RGBA16_SNORM_EXT),G===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(E,y){let G;return E?y===null||y===Jn||y===Js?G=s.DEPTH24_STENCIL8:y===Kn?G=s.DEPTH32F_STENCIL8:y===qr&&(G=s.DEPTH24_STENCIL8,Yt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Jn||y===Js?G=s.DEPTH_COMPONENT24:y===Kn?G=s.DEPTH_COMPONENT32F:y===qr&&(G=s.DEPTH_COMPONENT16),G}function b(E,y){return S(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ye&&E.minFilter!==mn?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function I(E){let y=new WeakRef(E);n.get(E).__ref=y,m.add(y),_.register(E,y,y)}function P(E){let y=n.get(E).__ref;y!==void 0&&(m.delete(y),_.unregister(y))}function U(E){F(E.target)}function W(E){R(E.target)}function F(E){E.removeEventListener("dispose",U),P(E),N(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&d.delete(E)}function R(E){E.removeEventListener("dispose",W),P(E),k(E)}function C(){for(let E of m){let y=E.deref();y!==void 0&&(y.isRenderTarget===!0?R(y):F(y))}m.clear(),d.clear()}function N(E){let y=n.get(E);if(y.__webglInit===void 0)return;let G=E.source,ht=u.get(G);if(ht){let st=ht[y.__cacheKey];st.usedTimes--,st.usedTimes===0&&L(E),Object.keys(ht).length===0&&u.delete(G)}n.remove(E)}function L(E){let y=n.get(E);s.deleteTexture(y.__webglTexture);let G=E.source,ht=u.get(G);delete ht[y.__cacheKey],a.memory.textures--}function k(E){let y=n.get(E);y.__depthDisposeCallback&&y.__depthDisposeCallback();let G=E.depthTexture;if(G&&G.renderTarget===E&&F(G),E.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(y.__webglFramebuffer[st]))for(let _t=0;_t<y.__webglFramebuffer[st].length;_t++)s.deleteFramebuffer(y.__webglFramebuffer[st][_t]);else s.deleteFramebuffer(y.__webglFramebuffer[st]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[st])}else{if(Array.isArray(y.__webglFramebuffer))for(let st=0;st<y.__webglFramebuffer.length;st++)s.deleteFramebuffer(y.__webglFramebuffer[st]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let st=0;st<y.__webglColorRenderbuffer.length;st++)y.__webglColorRenderbuffer[st]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[st]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let ht=E.textures;for(let st=0,_t=ht.length;st<_t;st++){let xt=n.get(ht[st]);xt.__webglTexture&&(s.deleteTexture(xt.__webglTexture),a.memory.textures--),n.remove(ht[st])}n.remove(E)}let z=0;function X(){z=0}function $(){return z}function ot(E){z=E}function Tt(){let E=z;return E>=i.maxTextures&&Yt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+i.maxTextures),z+=1,E}function Y(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.mipmapsAutoUpdate),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function ft(E,y){let G=n.get(E);if(E.isVideoTexture&&Ct(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&G.__version!==E.version){let ht=E.image;if(ht===null)Yt("WebGLRenderer: Texture marked for update but no image data found.");else if(ht.complete===!1)Yt("WebGLRenderer: Texture marked for update but image is incomplete");else{it(G,E,y);return}}else E.isExternalTexture&&(G.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+y)}function At(E,y){let G=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&G.__version!==E.version){it(G,E,y);return}else E.isExternalTexture&&(G.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+y)}function Pt(E,y){let G=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&G.__version!==E.version){it(G,E,y);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+y)}function mt(E,y){let G=n.get(E);if(E.version>0&&G.__version!==E.version){ut(G,E,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+y)}let Bt={[yl]:s.REPEAT,[di]:s.CLAMP_TO_EDGE,[Ml]:s.MIRRORED_REPEAT},Kt={[Ye]:s.NEAREST,[hm]:s.NEAREST_MIPMAP_NEAREST,[to]:s.NEAREST_MIPMAP_LINEAR,[mn]:s.LINEAR,[sc]:s.LINEAR_MIPMAP_NEAREST,[Vi]:s.LINEAR_MIPMAP_LINEAR},zt={[pm]:s.NEVER,[tf]:s.ALWAYS,[mm]:s.LESS,[ju]:s.LEQUAL,[gm]:s.EQUAL,[Qu]:s.GEQUAL,[_m]:s.GREATER,[xm]:s.NOTEQUAL};function Zt(E,y){if(y.type===Kn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===mn||y.magFilter===sc||y.magFilter===to||y.magFilter===Vi||y.minFilter===mn||y.minFilter===sc||y.minFilter===to||y.minFilter===Vi)&&Yt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,Bt[y.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,Bt[y.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,Bt[y.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,Kt[y.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,Kt[y.minFilter]),y.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,zt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ye||y.minFilter!==to&&y.minFilter!==Vi||y.type===Kn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function jt(E,y){let G=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",U),I(y));let ht=y.source,st=u.get(ht);st===void 0&&(st={},u.set(ht,st));let _t=Y(y);if(_t!==E.__cacheKey){st[_t]===void 0&&(st[_t]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),st[_t].usedTimes++;let xt=st[E.__cacheKey];xt!==void 0&&(st[E.__cacheKey].usedTimes--,xt.usedTimes===0&&L(y)),E.__cacheKey=_t,E.__webglTexture=st[_t].texture}return G}function at(E,y,G){return Math.floor(Math.floor(E/G)/y)}function q(E,y,G,ht){let _t=E.updateRanges;if(_t.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,G,ht,y.data);else{_t.sort((D,rt)=>D.start-rt.start);let xt=0;for(let D=1;D<_t.length;D++){let rt=_t[xt],tt=_t[D],bt=rt.start+rt.count,St=at(tt.start,y.width,4),wt=at(rt.start,y.width,4);tt.start<=bt+1&&St===wt&&at(tt.start+tt.count-1,y.width,4)===St?rt.count=Math.max(rt.count,tt.start+tt.count-rt.start):(++xt,_t[xt]=tt)}_t.length=xt+1;let J=e.getParameter(s.UNPACK_ROW_LENGTH),Q=e.getParameter(s.UNPACK_SKIP_PIXELS),pt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let D=0,rt=_t.length;D<rt;D++){let tt=_t[D],bt=Math.floor(tt.start/4),St=Math.ceil(tt.count/4),wt=bt%y.width,Ht=Math.floor(bt/y.width),ie=St,Mt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,wt),e.pixelStorei(s.UNPACK_SKIP_ROWS,Ht),e.texSubImage2D(s.TEXTURE_2D,0,wt,Ht,ie,Mt,G,ht,y.data)}E.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,J),e.pixelStorei(s.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(s.UNPACK_SKIP_ROWS,pt)}}function it(E,y,G){let ht=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ht=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ht=s.TEXTURE_3D);let st=jt(E,y),_t=y.source;e.bindTexture(ht,E.__webglTexture,s.TEXTURE0+G);let xt=n.get(_t);if(_t.version!==xt.__version||st===!0){if(e.activeTexture(s.TEXTURE0+G),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let Mt=ce.getPrimaries(ce.workingColorSpace),$t=y.colorSpace===Hi?null:ce.getPrimaries(y.colorSpace),ne=y.colorSpace===Hi||Mt===$t?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne)}e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment);let Q=v(y.image,!1,i.maxTextureSize);Q=gt(y,Q);let pt=r.convert(y.format,y.colorSpace),D=r.convert(y.type),rt=T(y.internalFormat,pt,D,y.normalized,y.colorSpace,y.isVideoTexture);Zt(ht,y);let tt,bt=y.mipmaps,St=y.isVideoTexture!==!0,wt=xt.__version===void 0||st===!0,Ht=_t.dataReady,ie=b(y,Q);if(y.isDepthTexture)rt=x(y.format===Gi,y.type),wt&&(St?e.texStorage2D(s.TEXTURE_2D,1,rt,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,rt,Q.width,Q.height,0,pt,D,null));else if(y.isDataTexture)if(bt.length>0){St&&wt&&e.texStorage2D(s.TEXTURE_2D,ie,rt,bt[0].width,bt[0].height);for(let Mt=0,$t=bt.length;Mt<$t;Mt++)tt=bt[Mt],St?Ht&&e.texSubImage2D(s.TEXTURE_2D,Mt,0,0,tt.width,tt.height,pt,D,tt.data):e.texImage2D(s.TEXTURE_2D,Mt,rt,tt.width,tt.height,0,pt,D,tt.data);y.generateMipmaps=!1}else St?(wt&&e.texStorage2D(s.TEXTURE_2D,ie,rt,Q.width,Q.height),Ht&&q(y,Q,pt,D)):e.texImage2D(s.TEXTURE_2D,0,rt,Q.width,Q.height,0,pt,D,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){St&&wt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ie,rt,bt[0].width,bt[0].height,Q.depth);for(let Mt=0,$t=bt.length;Mt<$t;Mt++)if(tt=bt[Mt],y.format!==Qn)if(pt!==null)if(St){if(Ht)if(y.layerUpdates.size>0){let ne=cf(tt.width,tt.height,y.format,y.type);for(let Nt of y.layerUpdates){let xe=tt.data.subarray(Nt*ne/tt.data.BYTES_PER_ELEMENT,(Nt+1)*ne/tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Mt,0,0,Nt,tt.width,tt.height,1,pt,xe)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Mt,0,0,0,tt.width,tt.height,Q.depth,pt,tt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Mt,rt,tt.width,tt.height,Q.depth,0,tt.data,0,0);else Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else St?Ht&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Mt,0,0,0,tt.width,tt.height,Q.depth,pt,D,tt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Mt,rt,tt.width,tt.height,Q.depth,0,pt,D,tt.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{St&&wt&&e.texStorage2D(s.TEXTURE_2D,ie,rt,bt[0].width,bt[0].height);for(let Mt=0,$t=bt.length;Mt<$t;Mt++)tt=bt[Mt],y.format!==Qn?pt!==null?St?Ht&&e.compressedTexSubImage2D(s.TEXTURE_2D,Mt,0,0,tt.width,tt.height,pt,tt.data):e.compressedTexImage2D(s.TEXTURE_2D,Mt,rt,tt.width,tt.height,0,tt.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):St?Ht&&e.texSubImage2D(s.TEXTURE_2D,Mt,0,0,tt.width,tt.height,pt,D,tt.data):e.texImage2D(s.TEXTURE_2D,Mt,rt,tt.width,tt.height,0,pt,D,tt.data)}else if(y.isDataArrayTexture)if(St){if(wt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ie,rt,Q.width,Q.height,Q.depth),Ht)if(y.layerUpdates.size>0){let Mt=cf(Q.width,Q.height,y.format,y.type);for(let $t of y.layerUpdates){let ne=Q.data.subarray($t*Mt/Q.data.BYTES_PER_ELEMENT,($t+1)*Mt/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$t,Q.width,Q.height,1,pt,D,ne)}y.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,pt,D,Q.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,rt,Q.width,Q.height,Q.depth,0,pt,D,Q.data);else if(y.isData3DTexture)St?(wt&&e.texStorage3D(s.TEXTURE_3D,ie,rt,Q.width,Q.height,Q.depth),Ht&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,pt,D,Q.data)):e.texImage3D(s.TEXTURE_3D,0,rt,Q.width,Q.height,Q.depth,0,pt,D,Q.data);else if(y.isFramebufferTexture){if(wt)if(St)e.texStorage2D(s.TEXTURE_2D,ie,rt,Q.width,Q.height);else{let Mt=Q.width,$t=Q.height;for(let ne=0;ne<ie;ne++)e.texImage2D(s.TEXTURE_2D,ne,rt,Mt,$t,0,pt,D,null),Mt>>=1,$t>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in s){let Mt=s.canvas;if(Mt.hasAttribute("layoutsubtree")||Mt.setAttribute("layoutsubtree","true"),Q.parentNode!==Mt){Mt.appendChild(Q),d.add(y),Mt.onpaint=$t=>{let ne=$t.changedElements;for(let Nt of d)ne.includes(Nt.image)&&(Nt.needsUpdate=!0)},Mt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Q);else{let ne=s.RGBA,Nt=s.RGBA,xe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ne,Nt,xe,Q)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(bt.length>0){if(St&&wt){let Mt=yt(bt[0]);e.texStorage2D(s.TEXTURE_2D,ie,rt,Mt.width,Mt.height)}for(let Mt=0,$t=bt.length;Mt<$t;Mt++)tt=bt[Mt],St?Ht&&e.texSubImage2D(s.TEXTURE_2D,Mt,0,0,pt,D,tt):e.texImage2D(s.TEXTURE_2D,Mt,rt,pt,D,tt);y.generateMipmaps=!1}else if(St){if(wt){let Mt=yt(Q);e.texStorage2D(s.TEXTURE_2D,ie,rt,Mt.width,Mt.height)}Ht&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,pt,D,Q)}else e.texImage2D(s.TEXTURE_2D,0,rt,pt,D,Q);S(y)&&y.mipmapsAutoUpdate===!0&&M(ht),xt.__version=_t.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function ut(E,y,G){if(y.image.length!==6)return;let ht=jt(E,y),st=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+G);let _t=n.get(st);if(st.version!==_t.__version||ht===!0){e.activeTexture(s.TEXTURE0+G);let xt=ce.getPrimaries(ce.workingColorSpace),J=y.colorSpace===Hi?null:ce.getPrimaries(y.colorSpace),Q=y.colorSpace===Hi||xt===J?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let pt=y.isCompressedTexture||y.image[0].isCompressedTexture,D=y.image[0]&&y.image[0].isDataTexture,rt=[];for(let Nt=0;Nt<6;Nt++)!pt&&!D?rt[Nt]=v(y.image[Nt],!0,i.maxCubemapSize):rt[Nt]=D?y.image[Nt].image:y.image[Nt],rt[Nt]=gt(y,rt[Nt]);let tt=rt[0],bt=r.convert(y.format,y.colorSpace),St=r.convert(y.type),wt=T(y.internalFormat,bt,St,y.normalized,y.colorSpace),Ht=y.isVideoTexture!==!0,ie=_t.__version===void 0||ht===!0,Mt=st.dataReady,$t=b(y,tt);Zt(s.TEXTURE_CUBE_MAP,y);let ne;if(y.isDepthTexture){if(wt=x(y.format===Gi,y.type),ie)if(Ht)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,wt,tt.width,tt.height);else for(let Nt=0;Nt<6;Nt++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,wt,tt.width,tt.height,0,bt,St,null)}else if(pt){Ht&&ie&&e.texStorage2D(s.TEXTURE_CUBE_MAP,$t,wt,tt.width,tt.height);for(let Nt=0;Nt<6;Nt++){ne=rt[Nt].mipmaps;for(let xe=0;xe<ne.length;xe++){let Xe=ne[xe];y.format!==Qn?bt!==null?Ht?Mt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,xe,0,0,Xe.width,Xe.height,bt,Xe.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,xe,wt,Xe.width,Xe.height,0,Xe.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,xe,0,0,Xe.width,Xe.height,bt,St,Xe.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,xe,wt,Xe.width,Xe.height,0,bt,St,Xe.data)}}}else{if(ne=y.mipmaps,Ht&&ie){ne.length>0&&$t++;let Nt=yt(rt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,$t,wt,Nt.width,Nt.height)}for(let Nt=0;Nt<6;Nt++)if(D){Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,0,0,rt[Nt].width,rt[Nt].height,bt,St,rt[Nt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,wt,rt[Nt].width,rt[Nt].height,0,bt,St,rt[Nt].data);for(let xe=0;xe<ne.length;xe++){let $i=ne[xe].image[Nt].image;Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,xe+1,0,0,$i.width,$i.height,bt,St,$i.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,xe+1,wt,$i.width,$i.height,0,bt,St,$i.data)}}else{Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,0,0,bt,St,rt[Nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,wt,bt,St,rt[Nt]);for(let xe=0;xe<ne.length;xe++){let Xe=ne[xe];Ht?Mt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,xe+1,0,0,bt,St,Xe.image[Nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,xe+1,wt,bt,St,Xe.image[Nt])}}}S(y)&&y.mipmapsAutoUpdate===!0&&M(s.TEXTURE_CUBE_MAP),_t.__version=st.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function V(E,y,G,ht,st,_t){let xt=r.convert(G.format,G.colorSpace),J=r.convert(G.type),Q=T(G.internalFormat,xt,J,G.normalized,G.colorSpace),pt=n.get(y),D=n.get(G);if(D.__renderTarget=y,!pt.__hasExternalTextures){let rt=Math.max(1,y.width>>_t),tt=Math.max(1,y.height>>_t);st===s.TEXTURE_3D||st===s.TEXTURE_2D_ARRAY?e.texImage3D(st,_t,Q,rt,tt,y.depth,0,xt,J,null):e.texImage2D(st,_t,Q,rt,tt,0,xt,J,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),nt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ht,st,D.__webglTexture,0,vt(y)):(st===s.TEXTURE_2D||st>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ht,st,D.__webglTexture,_t),e.bindFramebuffer(s.FRAMEBUFFER,null)}function lt(E,y,G){if(s.bindRenderbuffer(s.RENDERBUFFER,E),y.depthBuffer){let ht=y.depthTexture,st=ht&&ht.isDepthTexture?ht.type:null,_t=x(y.stencilBuffer,st),xt=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;nt(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt(y),_t,y.width,y.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt(y),_t,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,_t,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,xt,s.RENDERBUFFER,E)}else{let ht=y.textures;for(let st=0;st<ht.length;st++){let _t=ht[st],xt=r.convert(_t.format,_t.colorSpace),J=r.convert(_t.type),Q=T(_t.internalFormat,xt,J,_t.normalized,_t.colorSpace);nt(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt(y),Q,y.width,y.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt(y),Q,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,Q,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function dt(E,y,G){let ht=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let st=n.get(y.depthTexture);st.__renderTarget=y;let _t=ht?y.depthTexture.image[0]:y.depthTexture.image;(!st.__webglTexture||_t.width!==y.width||_t.height!==y.height)&&(_t.width=y.width,_t.height=y.height,y.depthTexture.needsUpdate=!0),ht?mt(y.depthTexture,0):ft(y.depthTexture,0);let xt=st.__webglTexture,J=vt(y),Q=ht?s.TEXTURE_CUBE_MAP_POSITIVE_X+G:s.TEXTURE_2D,pt=y.depthTexture.format===Gi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(y.depthTexture.format===Bi)nt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pt,Q,xt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,pt,Q,xt,0);else if(y.depthTexture.format===Gi)nt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pt,Q,xt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,pt,Q,xt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Et(E){let y=n.get(E),G=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){let ht=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),ht){let st=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,ht.removeEventListener("dispose",st)};ht.addEventListener("dispose",st),y.__depthDisposeCallback=st}y.__boundDepthTexture=ht}if(E.depthTexture&&!y.__autoAllocateDepthBuffer)if(G)for(let ht=0;ht<6;ht++)dt(y.__webglFramebuffer[ht],E,ht);else E.texture.mipmaps.length>0?dt(y.__webglFramebuffer[0],E,0):dt(y.__webglFramebuffer,E,0);else if(G){y.__webglDepthbuffer=[];for(let ht=0;ht<6;ht++)if(e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[ht]),y.__webglDepthbuffer[ht]===void 0)y.__webglDepthbuffer[ht]=s.createRenderbuffer(),lt(y.__webglDepthbuffer[ht],E,!1);else{let st=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_t=y.__webglDepthbuffer[ht];s.bindRenderbuffer(s.RENDERBUFFER,_t),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,_t)}}else if(E.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),lt(y.__webglDepthbuffer,E,!1);else{let st=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_t=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,_t),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,_t)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(E,y,G){let ht=n.get(E);y!==void 0&&V(ht.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&Et(E)}function Xt(E){let y=E.texture,G=n.get(E),ht=n.get(y);E.addEventListener("dispose",W),I(E);let st=E.textures,_t=E.isWebGLCubeRenderTarget===!0,xt=st.length>1;if(xt||(ht.__webglTexture===void 0&&(ht.__webglTexture=s.createTexture()),ht.__version=y.version,a.memory.textures++),_t){G.__webglFramebuffer=[];for(let J=0;J<6;J++)if(y.mipmaps.length>0){G.__webglFramebuffer[J]=[];for(let Q=0;Q<y.mipmaps.length;Q++)G.__webglFramebuffer[J][Q]=s.createFramebuffer()}else G.__webglFramebuffer[J]=s.createFramebuffer()}else{if(y.mipmaps.length>0){G.__webglFramebuffer=[];for(let J=0;J<y.mipmaps.length;J++)G.__webglFramebuffer[J]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(xt)for(let J=0,Q=st.length;J<Q;J++){let pt=n.get(st[J]);pt.__webglTexture===void 0&&(pt.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&nt(E)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let J=0;J<st.length;J++){let Q=st[J];G.__webglColorRenderbuffer[J]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[J]);let pt=r.convert(Q.format,Q.colorSpace),D=r.convert(Q.type),rt=T(Q.internalFormat,pt,D,Q.normalized,Q.colorSpace,E.isXRRenderTarget===!0),tt=vt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,rt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+J,s.RENDERBUFFER,G.__webglColorRenderbuffer[J])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),lt(G.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(_t){e.bindTexture(s.TEXTURE_CUBE_MAP,ht.__webglTexture),Zt(s.TEXTURE_CUBE_MAP,y);for(let J=0;J<6;J++)if(y.mipmaps.length>0)for(let Q=0;Q<y.mipmaps.length;Q++)V(G.__webglFramebuffer[J][Q],E,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Q);else V(G.__webglFramebuffer[J],E,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);S(y)?M(s.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}else if(xt){for(let J=0,Q=st.length;J<Q;J++){let pt=st[J],D=n.get(pt),rt=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(rt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(rt,D.__webglTexture),Zt(rt,pt),V(G.__webglFramebuffer,E,pt,s.COLOR_ATTACHMENT0+J,rt,0),S(pt)&&M(rt)}e.unbindTexture()}else{let J=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(J=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(J,ht.__webglTexture),Zt(J,y),y.mipmaps.length>0)for(let Q=0;Q<y.mipmaps.length;Q++)V(G.__webglFramebuffer[Q],E,y,s.COLOR_ATTACHMENT0,J,Q);else V(G.__webglFramebuffer,E,y,s.COLOR_ATTACHMENT0,J,0);S(y)?M(J):y.mipmaps.length>0&&s.texParameteri(J,s.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}E.depthBuffer&&Et(E)}function O(E){let y=E.textures;for(let G=0,ht=y.length;G<ht;G++){let st=y[G];if(S(st)&&st.mipmapsAutoUpdate===!0){let _t=A(E),xt=n.get(st).__webglTexture;e.bindTexture(_t,xt),M(_t),e.unbindTexture()}}}let de=[];function et(E){if(E.samples>0){if(nt(E)===!1){let y=E.textures,G=E.width,ht=E.height,st=s.COLOR_BUFFER_BIT,_t=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=n.get(E),J=y.length>1;if(J)for(let pt=0;pt<y.length;pt++)e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let pt=0;pt<y.length;pt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(st|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(st|=s.STENCIL_BUFFER_BIT)),J){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xt.__webglColorRenderbuffer[pt]);let D=n.get(y[pt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,D,0)}s.blitFramebuffer(0,0,G,ht,0,0,G,ht,st,s.NEAREST),l===!0&&(de.length=0,de.push(s.COLOR_ATTACHMENT0+pt),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&de.push(_t),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,de))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),J)for(let pt=0;pt<y.length;pt++){e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,xt.__webglColorRenderbuffer[pt]);let D=n.get(y[pt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,D,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let y=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function vt(E){return Math.min(i.maxSamples,E.samples)}function nt(E){let y=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ct(E){let y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function gt(E,y){let G=E.colorSpace,ht=E.format,st=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||G!==Ta&&G!==Hi&&(ce.getTransfer(G)===_e?(ht!==Qn||st!==wn)&&Yt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",G)),y}function yt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Tt,this.resetTextureUnits=X,this.getTextureUnits=$,this.setTextureUnits=ot,this.setTexture2D=ft,this.setTexture2DArray=At,this.setTexture3D=Pt,this.setTextureCube=mt,this.rebindTextures=Dt,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=Et,this.setupFrameBufferTexture=V,this.useMultisampledRTT=nt,this.dispose=C}function Ib(s,t){function e(n,i=Hi){let r,a=ce.getTransfer(i);if(n===wn)return s.UNSIGNED_BYTE;if(n===ac)return s.UNSIGNED_SHORT_4_4_4_4;if(n===oc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===$u)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Yu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Xu)return s.BYTE;if(n===qu)return s.SHORT;if(n===qr)return s.UNSIGNED_SHORT;if(n===rc)return s.INT;if(n===Jn)return s.UNSIGNED_INT;if(n===Kn)return s.FLOAT;if(n===jn)return s.HALF_FLOAT;if(n===Zu)return s.ALPHA;if(n===Ju)return s.RGB;if(n===Qn)return s.RGBA;if(n===Bi)return s.DEPTH_COMPONENT;if(n===Gi)return s.DEPTH_STENCIL;if(n===Ku)return s.RED;if(n===lc)return s.RED_INTEGER;if(n===_s)return s.RG;if(n===cc)return s.RG_INTEGER;if(n===hc)return s.RGBA_INTEGER;if(n===eo||n===no||n===io||n===so)if(a===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===io)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===so)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===uc||n===fc||n===dc||n===pc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===uc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===mc||n===gc||n===_c||n===xc||n===vc||n===ro||n===yc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===mc||n===gc)return a===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_c)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===xc)return r.COMPRESSED_R11_EAC;if(n===vc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ro)return r.COMPRESSED_RG11_EAC;if(n===yc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Mc||n===Sc||n===bc||n===wc||n===Ac||n===Tc||n===Ec||n===Cc||n===Rc||n===Pc||n===Ic||n===Lc||n===Dc||n===Nc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Mc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ac)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ec)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Rc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ic)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Lc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Dc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Nc)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Uc||n===Oc||n===Fc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Uc)return a===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Bc||n===kc||n===ao||n===zc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Bc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===kc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ao)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Js?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Lb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Db=`
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

}`,bf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Fa(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Gn({vertexShader:Lb,fragmentShader:Db,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ln(new Xs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wf=class extends mi{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,u=null,m=null,_=typeof XRWebGLBinding<"u",p=new bf,g={},v=e.getContextAttributes(),S=null,M=null,A=[],T=[],x=new Lt,b=null,I=null,P=new pn;P.viewport=new Re;let U=new pn;U.viewport=new Re;let W=[P,U],F=new tc,R=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ft=A[Y];return ft===void 0&&(ft=new Lr,A[Y]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(Y){let ft=A[Y];return ft===void 0&&(ft=new Lr,A[Y]=ft),ft.getGripSpace()},this.getHand=function(Y){let ft=A[Y];return ft===void 0&&(ft=new Lr,A[Y]=ft),ft.getHandSpace()};function N(Y){let ft=T.indexOf(Y.inputSource);if(ft===-1)return;let At=A[ft];At!==void 0&&(At.update(Y.inputSource,Y.frame,c||a),At.dispatchEvent({type:Y.type,data:Y.inputSource}))}function L(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",L),i.removeEventListener("inputsourceschange",k);for(let Y=0;Y<A.length;Y++){let ft=T[Y];ft!==null&&(T[Y]=null,A[Y].disconnect(ft))}R=null,C=null,p.reset();for(let Y in g)delete g[Y];if(t.setRenderTarget(S),u=null,f=null,d=null,i=null,M=null,Tt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(x.width,x.height,!1),I!==null){let Y=I.camera;Y.fov=I.fov,Y.zoom=I.zoom,Y.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Yt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Yt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(S=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",L),i.addEventListener("inputsourceschange",k),v.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,Pt=null,mt=null;v.depth&&(mt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,At=v.stencil?Gi:Bi,Pt=v.stencil?Js:Jn);let Bt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(Bt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new In(f.textureWidth,f.textureHeight,{format:Qn,type:wn,depthTexture:new zi(f.textureWidth,f.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let At={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(i,e,At),i.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),M=new In(u.framebufferWidth,u.framebufferHeight,{format:Qn,type:wn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Tt.setContext(i),Tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function k(Y){for(let ft=0;ft<Y.removed.length;ft++){let At=Y.removed[ft],Pt=T.indexOf(At);Pt>=0&&(T[Pt]=null,A[Pt].disconnect(At))}for(let ft=0;ft<Y.added.length;ft++){let At=Y.added[ft],Pt=T.indexOf(At);if(Pt===-1){for(let Bt=0;Bt<A.length;Bt++)if(Bt>=T.length){T.push(At),Pt=Bt;break}else if(T[Bt]===null){T[Bt]=At,Pt=Bt;break}if(Pt===-1)break}let mt=A[Pt];mt&&mt.connect(At)}}function z(Y,ft){ft===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ft.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let ft=Y.near,At=Y.far;p.texture!==null&&(p.depthNear>0&&(ft=p.depthNear),p.depthFar>0&&(At=p.depthFar)),F.near=U.near=P.near=ft,F.far=U.far=P.far=At,(R!==F.near||C!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),R=F.near,C=F.far),F.layers.mask=Y.layers.mask|6,P.layers.mask=F.layers.mask&-5,U.layers.mask=F.layers.mask&-3;let Pt=Y.parent,mt=F.cameras;z(F,Pt);for(let Bt=0;Bt<mt.length;Bt++)z(mt[Bt],Pt);F.projectionMatrix.copy(P.projectionMatrix),F.projectionMatrixInverse.copy(P.projectionMatrixInverse),I===null&&Y.isPerspectiveCamera&&(I={camera:Y,fov:Y.fov,zoom:Y.zoom}),X(Y,F,Pt)};function X(Y,ft,At){At===null?Y.matrix.copy(ft.matrixWorld):(Y.matrix.copy(At.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ft.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ft.projectionMatrix),Y.projectionMatrixInverse.copy(ft.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=bl*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&u===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(Y){return g[Y]};let $=null;function ot(Y,ft){if(h=ft.getViewerPose(c||a),m=ft,h!==null){let At=h.views;u!==null&&(t.setRenderTargetFramebuffer(M,u.framebuffer),t.setRenderTarget(M));let Pt=!1;At.length!==F.cameras.length&&(F.cameras.length=0,Pt=!0);for(let zt=0;zt<At.length;zt++){let Zt=At[zt],jt=null;if(u!==null)jt=u.getViewport(Zt);else{let q=d.getViewSubImage(f,Zt);jt=q.viewport,zt===0&&(t.setRenderTargetTextures(M,q.colorTexture,q.depthStencilTexture),t.setRenderTarget(M))}let at=W[zt];at===void 0&&(at=new pn,at.layers.enable(zt),at.viewport=new Re,W[zt]=at),at.matrix.fromArray(Zt.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(Zt.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(jt.x,jt.y,jt.width,jt.height),zt===0&&(F.matrix.copy(at.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Pt===!0&&F.cameras.push(at)}let mt=i.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let zt=d.getDepthInformation(At[0]);zt&&zt.isValid&&zt.texture&&p.init(zt,i.renderState)}if(mt&&mt.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let zt=0;zt<At.length;zt++){let Zt=At[zt].camera;if(Zt){let jt=g[Zt];jt||(jt=new Fa,g[Zt]=jt);let at=d.getCameraImage(Zt);jt.sourceTexture=at}}}}for(let At=0;At<A.length;At++){let Pt=T[At],mt=A[At];Pt!==null&&mt!==void 0&&mt.update(Pt,ft,c||a)}$&&$(Y,ft),ft.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ft}),m=null}let Tt=new t0;Tt.setAnimationLoop(ot),this.setAnimationLoop=function(Y){$=Y},this.dispose=function(){}}},Nb=new be,h0=new Qt;h0.set(-1,0,0,0,1,0,0,0,1);function Ub(s,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,af(s)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,v,S,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),f(p,g),g.isMeshPhysicalMaterial&&u(p,g,M)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,v,S):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===gn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===gn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let v=t.get(g),S=v.envMap,M=v.envMapRotation;S&&(p.envMap.value=S,p.envMapRotation.value.setFromMatrix4(Nb.makeRotationFromEuler(M)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(h0),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,v,S){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=S*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function u(p,g,v){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===gn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ob(s,t,e,n){let i={},r={};function a(v,S){let M=S.program;n.uniformBlockBinding(v,M,i[v.id])}function o(v,S){let M=i[v.id];M===void 0&&(m(v),M=l(v),i[v.id]=M,v.addEventListener("dispose",p));let A=S.program;n.updateUBOMapping(v,A);let T=t.render.frame;r[v.id]!==T&&(c(v),r[v.id]=T)}function l(v){let S=s.createBuffer(),M=v.__size,A=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,M,A),s.bindBuffer(s.UNIFORM_BUFFER,null),S}function c(v){let S=i[v.id],M=v.uniforms,A=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let T=0,x=M.length;T<x;T++){let b=M[T];if(Array.isArray(b))for(let I=0,P=b.length;I<P;I++)h(b[I],T,I,A);else h(b,T,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(v,S,M,A){if(f(v,S,M,A)===!0){let T=v.__offset,x=v.value;if(Array.isArray(x)){let b=0;for(let I=0;I<x.length;I++){let P=x[I],U=_(P,!0);d(P,v.__data,b),b+=U.storage/Float32Array.BYTES_PER_ELEMENT}}else d(x,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,v.__data)}}function d(v,S,M){typeof v=="number"||typeof v=="boolean"?S[M]=v:v.isMatrix3?(S[M]=v.elements[0],S[M+1]=v.elements[1],S[M+2]=v.elements[2],S[M+3]=0,S[M+4]=v.elements[3],S[M+5]=v.elements[4],S[M+6]=v.elements[5],S[M+7]=0,S[M+8]=v.elements[6],S[M+9]=v.elements[7],S[M+10]=v.elements[8],S[M+11]=0):ArrayBuffer.isView(v)?S.set(v.subarray(0,S.length-M),M):v.toArray(S,M)}function f(v,S,M,A){let T=v.value,x=S+"_"+M;if(Array.isArray(T)){A[x]===void 0&&(A[x]=[]);let b=A[x],I=!1;for(let P=0;P<T.length;P++)u(T[P],b,P)===!0&&(I=!0);return I}return u(T,A,x)}function u(v,S,M){if(S[M]===void 0)return typeof v=="number"||typeof v=="boolean"?S[M]=v:ArrayBuffer.isView(v)?S[M]=v.slice():S[M]=v.clone(),!0;{let A=S[M];if(typeof v=="number"||typeof v=="boolean"){if(A!==v)return S[M]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(A.equals(v)===!1)return A.copy(v),!0}}return!1}function m(v){let S=v.uniforms,M=0,A=16;for(let x=0,b=S.length;x<b;x++){let I=Array.isArray(S[x])?S[x]:[S[x]];for(let P=0,U=I.length;P<U;P++){let W=I[P],F=Array.isArray(W.value)?W.value:[W.value],R=Array.isArray(S[x])||Array.isArray(W.value),C=M;for(let L=0,k=F.length;L<k;L++){let z=F[L],X=_(z,R),$=M%A,ot=$%X.boundary,Tt=$+ot;M+=ot,Tt!==0&&A-Tt<X.storage&&(M+=A-Tt),L===0&&(C=M),M+=X.storage}let N=W.type==="int"?Int32Array:W.type==="uint"?Uint32Array:Float32Array;W.__data=new N((M-C)/Float32Array.BYTES_PER_ELEMENT),W.__offset=C}}let T=M%A;return T>0&&(M+=A-T),v.__size=M,v.__cache={},this}function _(v,S){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=16,M.storage=48):v.isMatrix4?(M.boundary=16,M.storage=64):v.isTexture?Yt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Yt("WebGLRenderer: Unsupported uniform value type.",v),S===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function p(v){let S=v.target;S.removeEventListener("dispose",p),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function g(){for(let v in i)s.deleteBuffer(i[v]);i={},r={}}return{bind:a,update:o,dispose:g}}var Fb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),vi=null;function Bb(){return vi===null&&(vi=new Cl(Fb,16,16,_s,jn),vi.name="DFG_LUT",vi.minFilter=mn,vi.magFilter=mn,vi.wrapS=di,vi.wrapT=di,vi.generateMipmaps=!1,vi.needsUpdate=!0),vi}var Xc=class{constructor(t={}){let{canvas:e=ym(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:u=wn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=u,p=new Set([hc,cc,lc]),g=new Set([wn,Jn,qr,Js,ac,oc]),v=new Uint32Array(4),S=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},A=null,T=null,x=[],b=[],I=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,U=!1,W=null,F=null,R=null,C=null;this._outputColorSpace=dn;let N=0,L=0,k=null,z=-1,X=null,$=new Re,ot=new Re,Tt=null,Y=new ee(0),ft=0,At=e.width,Pt=e.height,mt=1,Bt=null,Kt=null,zt=new Re(0,0,At,Pt),Zt=new Re(0,0,At,Pt),jt=!1,at=new fs,q=new Rl,it=!1,ut=!1,V=new be,lt=new H,dt=new Re,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Dt=!1;function Xt(){return k===null?mt:1}let O=n;function de(w,B){return e.getContext(w,B)}let et,vt,nt,Ct,gt,yt,E,y,G,ht,st,_t,xt,J,Q,pt,D,rt,tt,bt,St,wt,Ht;try{let w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",$t,!1),e.addEventListener("webglcontextrestored",ne,!1),e.addEventListener("webglcontextcreationerror",Nt,!1),O===null){let B="webgl2";if(O=de(B,w),O===null)throw de(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ie()}catch(w){throw e.removeEventListener("webglcontextlost",$t,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Nt,!1),Jt("WebGLRenderer: "+w.message),w}function ie(){et=new ZM(O),et.init(),St=new Ib(O,et),vt=new BM(O,et,t,St),nt=new Rb(O,et),vt.reversedDepthBuffer&&f&&nt.buffers.depth.setReversed(!0),F=O.createFramebuffer(),R=O.createFramebuffer(),C=O.createFramebuffer(),Ct=new jM(O),gt=new mb,yt=new Pb(O,et,nt,gt,vt,St,Ct),E=new YM(P),y=new tv(O),wt=new OM(O,y),G=new JM(O,y,Ct,wt),ht=new tS(O,G,y,wt,Ct),rt=new QM(O,vt,yt),Q=new kM(gt),st=new pb(P,E,et,vt,wt,Q),_t=new Ub(P,gt),xt=new _b,J=new bb(et),D=new UM(P,E,nt,ht,m,l),pt=new Cb(P,ht,vt),Ht=new Ob(O,Ct,vt,nt),tt=new FM(O,et,Ct),bt=new KM(O,et,Ct),Ct.programs=st.programs,P.capabilities=vt,P.extensions=et,P.properties=gt,P.renderLists=xt,P.shadowMap=pt,P.state=nt,P.info=Ct}_!==wn&&(I=new nS(_,e.width,e.height,o,i,r));let Mt=new wf(P,O);this.xr=Mt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let w=et.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=et.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(w){w!==void 0&&(mt=w,this.setSize(At,Pt,!1))},this.getSize=function(w){return w.set(At,Pt)},this.setSize=function(w,B,j=!0){if(Mt.isPresenting){Yt("WebGLRenderer: Can't change size while VR device is presenting.");return}At=w,Pt=B,e.width=Math.floor(w*mt),e.height=Math.floor(B*mt),j===!0&&(e.style.width=w+"px",e.style.height=B+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(At*mt,Pt*mt).floor()},this.setDrawingBufferSize=function(w,B,j){At=w,Pt=B,mt=j,e.width=Math.floor(w*j),e.height=Math.floor(B*j),this.setViewport(0,0,w,B)},this.setEffects=function(w){if(_===wn){Jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let B=0;B<w.length;B++)if(w[B].isOutputPass===!0){Yt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy($)},this.getViewport=function(w){return w.copy(zt)},this.setViewport=function(w,B,j,Z){w.isVector4?zt.set(w.x,w.y,w.z,w.w):zt.set(w,B,j,Z),nt.viewport($.copy(zt).multiplyScalar(Xt()).round())},this.getScissor=function(w){return w.copy(Zt)},this.setScissor=function(w,B,j,Z){w.isVector4?Zt.set(w.x,w.y,w.z,w.w):Zt.set(w,B,j,Z),nt.scissor(ot.copy(Zt).multiplyScalar(Xt()).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(w){nt.setScissorTest(jt=w)},this.setOpaqueSort=function(w){Bt=w},this.setTransparentSort=function(w){Kt=w},this.getClearColor=function(w){return w.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(w=!0,B=!0,j=!0){let Z=0;if(w){let K=!1;if(k!==null){let It=k.texture.format;K=p.has(It)}if(K){let It=k.texture.type,kt=g.has(It),Rt=D.getClearColor(),Ot=D.getClearAlpha(),Wt=Rt.r,te=Rt.g,oe=Rt.b;kt?(v[0]=Wt,v[1]=te,v[2]=oe,v[3]=Ot,O.clearBufferuiv(O.COLOR,0,v)):(S[0]=Wt,S[1]=te,S[2]=oe,S[3]=Ot,O.clearBufferiv(O.COLOR,0,S))}else Z|=O.COLOR_BUFFER_BIT}B&&(Z|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Z|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&O.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),W=w},this.dispose=function(){e.removeEventListener("webglcontextlost",$t,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Nt,!1),D.dispose(),xt.dispose(),J.dispose(),yt.dispose(),gt.dispose(),E.dispose(),ht.dispose(),G.dispose(),wt.dispose(),Ht.dispose(),st.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",Wf),Mt.removeEventListener("sessionend",Xf),ws.stop()};function $t(w){w.preventDefault(),nf("WebGLRenderer: Context Lost."),U=!0}function ne(){nf("WebGLRenderer: Context Restored."),U=!1;let w=Ct.autoReset,B=pt.enabled,j=pt.autoUpdate,Z=pt.needsUpdate,K=pt.type;ie(),Ct.autoReset=w,pt.enabled=B,pt.autoUpdate=j,pt.needsUpdate=Z,pt.type=K}function Nt(w){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function xe(w){let B=w.target;B.removeEventListener("dispose",xe),Xe(B)}function Xe(w){$i(w),gt.remove(w)}function $i(w){let B=gt.get(w).programs;B!==void 0&&(B.forEach(function(j){st.releaseProgram(j)}),w.isShaderMaterial&&st.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,j,Z,K,It){B===null&&(B=Et);let kt=K.isMesh&&K.matrixWorld.determinantAffine()<0,Rt=Q0(w,B,j,Z,K);nt.setMaterial(Z,kt);let Ot=j.index,Wt=1;if(Z.wireframe===!0){if(Ot=G.getWireframeAttribute(j),Ot===void 0)return;Wt=2}let te=j.drawRange,oe=j.attributes.position,Vt=te.start*Wt,le=(te.start+te.count)*Wt;It!==null&&(Vt=Math.max(Vt,It.start*Wt),le=Math.min(le,(It.start+It.count)*Wt)),Ot!==null?(Vt=Math.max(Vt,0),le=Math.min(le,Ot.count)):oe!=null&&(Vt=Math.max(Vt,0),le=Math.min(le,oe.count));let ke=le-Vt;if(ke<0||ke===1/0)return;wt.setup(K,Z,Rt,j,Ot);let Ae,Me=tt;if(Ot!==null&&(Ae=y.get(Ot),Me=bt,Me.setIndex(Ae)),K.isMesh)Z.wireframe===!0?(nt.setLineWidth(Z.wireframeLinewidth*Xt()),Me.setMode(O.LINES)):Me.setMode(O.TRIANGLES);else if(K.isLine){let tn=Z.linewidth;tn===void 0&&(tn=1),nt.setLineWidth(tn*Xt()),K.isLineSegments?Me.setMode(O.LINES):K.isLineLoop?Me.setMode(O.LINE_LOOP):Me.setMode(O.LINE_STRIP)}else K.isPoints?Me.setMode(O.POINTS):K.isSprite&&Me.setMode(O.TRIANGLES);if(K.isBatchedMesh)if(et.get("WEBGL_multi_draw"))Me.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let tn=K._multiDrawStarts,Gt=K._multiDrawCounts,hn=K._multiDrawCount,me=Ot?y.get(Ot).bytesPerElement:1,As=gt.get(Z).currentProgram.getUniforms();for(let en=0;en<hn;en++)As.setValue(O,"_gl_DrawID",en),Me.render(tn[en]/me,Gt[en])}else if(K.isInstancedMesh)Me.renderInstances(Vt,ke,K.count);else if(j.isInstancedBufferGeometry){let tn=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Gt=Math.min(j.instanceCount,tn);Me.renderInstances(Vt,ke,Gt)}else Me.render(Vt,ke)};function Hf(w,B,j,Z){W!==null&&w.isNodeMaterial&&W.setObject(Z,w),it===!0&&Q.setState(w,j,!1),w.transparent===!0&&w.side===_i&&w.forceSinglePass===!1?(w.side=gn,w.needsUpdate=!0,ta(w,B,Z),w.side=gs,w.needsUpdate=!0,ta(w,B,Z),w.side=_i):ta(w,B,Z)}this.compile=function(w,B,j=null){j===null&&(j=w),W!==null&&W.renderStart(w,B,j),T=J.get(j),T.init(B),b.push(T),j.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),w!==j&&w.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),T.setupLights(),W!==null&&W.updateLights(T.state.lightsArray),ut=this.localClippingEnabled,it=Q.init(this.clippingPlanes,ut),it===!0&&Q.setGlobalState(this.clippingPlanes,B),W!==null&&pt.render(T.state.shadowsArray,j,B);let Z=new Set;return w.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let It=K.material;if(It)if(Array.isArray(It))for(let kt=0;kt<It.length;kt++){let Rt=It[kt];Hf(Rt,j,B,K),Z.add(Rt)}else Hf(It,j,B,K),Z.add(It)}),T=b.pop(),W!==null&&W.renderEnd(),Z},this.compileAsync=function(w,B,j=null){let Z=this.compile(w,B,j);return new Promise(K=>{function It(){if(Z.forEach(function(kt){let Ot=gt.get(kt).currentProgram;(Ot===void 0||Ot.isReady())&&Z.delete(kt)}),Z.size===0){K(w);return}setTimeout(It,10)}et.get("KHR_parallel_shader_compile")!==null?It():setTimeout(It,10)})};let nh=null;function K0(w){nh&&nh(w)}function Wf(){ws.stop()}function Xf(){ws.start()}let ws=new t0;ws.setAnimationLoop(K0),typeof self<"u"&&ws.setContext(self),this.setAnimationLoop=function(w){nh=w,Mt.setAnimationLoop(w),w===null?ws.stop():ws.start()},Mt.addEventListener("sessionstart",Wf),Mt.addEventListener("sessionend",Xf),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;W!==null&&W.renderStart(w,B);let j=Mt.enabled===!0&&Mt.isPresenting===!0,Z=I!==null&&(k===null||j)&&I.begin(P,k);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(B),B=Mt.getCamera()),w.isScene===!0&&w.onBeforeRender(P,w,B,k),T=J.get(w,b.length),T.init(B),T.state.textureUnits=yt.getTextureUnits(),b.push(T),V.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?q.setFromArrayCamera(B):at.setFromProjectionMatrix(V,Vn,B.reversedDepth),ut=this.localClippingEnabled,it=Q.init(this.clippingPlanes,ut),A=xt.get(w,x.length),A.init(),x.push(A),this.info.render.frame++,Mt.enabled===!0&&Mt.isPresenting===!0){let kt=P.xr.getDepthSensingMesh();kt!==null&&ih(kt,B,-1/0,P.sortObjects)}ih(w,B,0,P.sortObjects),A.finish(),W!==null&&W.updateLights(T.state.lightsArray),P.sortObjects===!0&&A.sort(Bt,Kt),Dt=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,Dt&&D.addToRenderList(A,w),this.info.autoReset===!0&&this.info.reset(),it===!0&&Q.beginShadows();let K=T.state.shadowsArray;if(pt.render(K,w,B),it===!0&&Q.endShadows(),(Z&&I.hasRenderPass())===!1){let kt=A.opaque,Rt=A.transmissive;if(T.setupLights(),B.isArrayCamera){let Ot=B.cameras;if(Rt.length>0)for(let Wt=0,te=Ot.length;Wt<te;Wt++){let oe=Ot[Wt];$f(kt,Rt,w,oe)}Dt&&D.render(w);for(let Wt=0,te=Ot.length;Wt<te;Wt++){let oe=Ot[Wt];qf(A,w,oe,oe.viewport)}}else Rt.length>0&&$f(kt,Rt,w,B),Dt&&D.render(w),qf(A,w,B)}k!==null&&L===0&&(yt.updateMultisampleRenderTarget(k),yt.updateRenderTargetMipmap(k)),Z&&I.end(P),w.isScene===!0&&w.onAfterRender(P,w,B),wt.resetDefaultState(),z=-1,X=null,b.pop(),b.length>0?(T=b[b.length-1],yt.setTextureUnits(T.state.textureUnits),it===!0&&Q.setGlobalState(P.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,W!==null&&W.renderEnd()};function ih(w,B,j,Z){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)j=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){let kt=B.isArrayCamera?q:at;if(!w.frustumCulled||w.intersectsFrustum(kt)){Z&&dt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(V);let Rt=ht.update(w),Ot=w.material;Ot.visible&&A.push(w,Rt,Ot,j,dt.z,null,B)}}else if(w.isMesh||w.isLine||w.isPoints){let kt=B.isArrayCamera?q:at;if(!w.frustumCulled||w.intersectsFrustum(kt)){let Rt=ht.update(w),Ot=w.material;if(Z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),dt.copy(w.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),dt.copy(Rt.boundingSphere.center)),dt.applyMatrix4(w.matrixWorld).applyMatrix4(V)),Array.isArray(Ot)){let Wt=Rt.groups;for(let te=0,oe=Wt.length;te<oe;te++){let Vt=Wt[te],le=Ot[Vt.materialIndex];le&&le.visible&&A.push(w,Rt,le,j,dt.z,Vt,B)}}else Ot.visible&&A.push(w,Rt,Ot,j,dt.z,null,B)}}}let It=w.children;for(let kt=0,Rt=It.length;kt<Rt;kt++)ih(It[kt],B,j,Z)}function qf(w,B,j,Z){let{opaque:K,transmissive:It,transparent:kt}=w;T.setupLightsView(j),it===!0&&Q.setGlobalState(P.clippingPlanes,j),Z&&nt.viewport($.copy(Z)),K.length>0&&xo(K,B,j),It.length>0&&xo(It,B,j),kt.length>0&&xo(kt,B,j),nt.buffers.depth.setTest(!0),nt.buffers.depth.setMask(!0),nt.buffers.color.setMask(!0),nt.setPolygonOffset(!1)}function $f(w,B,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[Z.id]===void 0){let Vt=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[Z.id]=new In(1,1,{generateMipmaps:!0,type:Vt?jn:wn,minFilter:Vi,samples:Math.max(4,vt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let It=T.state.transmissionRenderTarget[Z.id],kt=Z.viewport||$;It.setSize(kt.z*P.transmissionResolutionScale,kt.w*P.transmissionResolutionScale);let Rt=P.getRenderTarget(),Ot=P.getActiveCubeFace(),Wt=P.getActiveMipmapLevel();P.setRenderTarget(It),P.getClearColor(Y),ft=P.getClearAlpha(),ft<1&&P.setClearColor(16777215,.5),P.clear(),Dt&&D.render(j);let te=P.toneMapping;P.toneMapping=xi;let oe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),T.setupLightsView(Z),it===!0&&Q.setGlobalState(P.clippingPlanes,Z),xo(w,j,Z),yt.updateMultisampleRenderTarget(It),yt.updateRenderTargetMipmap(It),et.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let le=0,ke=B.length;le<ke;le++){let Ae=B[le],{object:Me,geometry:tn,material:Gt,group:hn}=Ae;if(Gt.side===_i&&Me.layers.test(Z.layers)){let me=Gt.side;Gt.side=gn,Gt.needsUpdate=!0,Yf(Me,j,Z,tn,Gt,hn),Gt.side=me,Gt.needsUpdate=!0,Vt=!0}}Vt===!0&&(yt.updateMultisampleRenderTarget(It),yt.updateRenderTargetMipmap(It))}P.setRenderTarget(Rt,Ot,Wt),P.setClearColor(Y,ft),oe!==void 0&&(Z.viewport=oe),P.toneMapping=te}function xo(w,B,j){let Z=B.isScene===!0?B.overrideMaterial:null;for(let K=0,It=w.length;K<It;K++){let kt=w[K],{object:Rt,geometry:Ot,group:Wt}=kt,te=kt.material;te.allowOverride===!0&&Z!==null&&(te=Z),Rt.layers.test(j.layers)&&Yf(Rt,B,j,Ot,te,Wt)}}function Yf(w,B,j,Z,K,It){W!==null&&K.isNodeMaterial&&W.setObject(w,K),w.onBeforeRender(P,B,j,Z,K,It),w.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),K.onBeforeRender(P,B,j,Z,w,It),K.transparent===!0&&K.side===_i&&K.forceSinglePass===!1?(K.side=gn,K.needsUpdate=!0,P.renderBufferDirect(j,B,Z,K,w,It),K.side=gs,K.needsUpdate=!0,P.renderBufferDirect(j,B,Z,K,w,It),K.side=_i):P.renderBufferDirect(j,B,Z,K,w,It),w.onAfterRender(P,B,j,Z,K,It)}function Zf(w){let B=0;for(let j of w)j.texture!==null&&B++;return B}function ta(w,B,j){B.isScene!==!0&&(B=Et);let Z=gt.get(w),K=T.state.lights,It=T.state.shadowsArray,kt=K.state.version,Rt=st.getParameters(w,K.state,It,B,j,T.state.lightProbeGridArray),Ot=st.getProgramCacheKey(Rt),Wt=Z.programs;Z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?B.environment:null,Z.fog=B.fog;let te=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;Z.envMap=E.get(w.envMap||Z.environment,te),Z.envMapRotation=Z.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,Wt===void 0&&(w.addEventListener("dispose",xe),Wt=new Map,Z.programs=Wt,Z.programVariants=new Map);let oe=Wt.get(Ot);if(oe!==void 0){if(Z.currentProgram===oe&&Z.lightsStateVersion===kt)return Kf(w,Rt),oe}else Rt.uniforms=st.getUniforms(w),W!==null&&w.isNodeMaterial&&W.build(w,j,Rt),w.onBeforeCompile(Rt,P),oe=st.acquireProgram(Rt,Ot),Wt.set(Ot,oe),Z.uniforms=Rt.uniforms;let Vt=Z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Vt.clippingPlanes=Q.uniform),Kf(w,Rt),Z.needsLights=eg(w),Z.lightsStateVersion=kt,Z.needsLights&&(Vt.ambientLightColor.value=K.state.ambient,Vt.lightProbe.value=K.state.probe,Vt.sunLights.value=K.state.sun,Vt.sunLightShadows.value=K.state.sunShadow,Vt.directionalLights.value=K.state.directional,Vt.directionalLightShadows.value=K.state.directionalShadow,Vt.spotLights.value=K.state.spot,Vt.spotLightShadows.value=K.state.spotShadow,Vt.rectAreaLights.value=K.state.rectArea,Vt.ltc_1.value=K.state.rectAreaLTC1,Vt.ltc_2.value=K.state.rectAreaLTC2,Vt.pointLights.value=K.state.point,Vt.pointLightShadows.value=K.state.pointShadow,Vt.hemisphereLights.value=K.state.hemi,Vt.sunShadowMatrix.value=K.state.sunShadowMatrix,Vt.sunShadowCascade.value=K.state.sunShadowCascade,Vt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Vt.spotLightMatrix.value=K.state.spotLightMatrix,Vt.spotLightMap.value=K.state.spotLightMap,Vt.pointShadowMatrix.value=K.state.pointShadowMatrix),Z.numLightProbeGrids=Zf(T.state.lightProbeGridArray),Z.currentProgram=oe,Z.uniformsList=null,oe}function j0(w,B,j,Z,K){let It=gt.get(w),kt=It.currentProgram.id+","+Z+","+K,Rt=It.programVariants.get(kt);return Rt===void 0?(Rt=ta(w,B,j),It.programVariants.set(kt,Rt)):(It.currentProgram=Rt,It.uniformsList=null,It.outputColorSpace=Z,It.toneMapping=K),Rt}function Jf(w){if(w.uniformsList===null){let B=w.currentProgram.getUniforms();w.uniformsList=Yr.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function Kf(w,B){let j=gt.get(w);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function Q0(w,B,j,Z,K){B.isScene!==!0&&(B=Et),yt.resetTextureUnits();let It=B.fog,kt=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?B.environment:null,Rt=k===null?P.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:ce.workingColorSpace,Ot=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Wt=E.get(Z.envMap||kt,Ot),te=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,oe=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Vt=!!j.morphAttributes.position,le=!!j.morphAttributes.normal,ke=!!j.morphAttributes.color,Ae=xi;Z.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Ae=P.toneMapping);let Me=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,tn=Me!==void 0?Me.length:0,Gt=gt.get(Z),hn=T.state.lights;if(it===!0&&(ut===!0||w!==X)){let Pe=w===X&&Z.id===z;Q.setState(Z,w,Pe)}let me=!1,As=!1;Z.version===Gt.__version?Gt.needsLights&&Gt.lightsStateVersion!==hn.state.version||K.isBatchedMesh&&Gt.batching===!1||!K.isBatchedMesh&&Gt.batching===!0||K.isBatchedMesh&&Gt.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Gt.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Gt.instancing===!1||!K.isInstancedMesh&&Gt.instancing===!0||K.isSkinnedMesh&&Gt.skinning===!1||!K.isSkinnedMesh&&Gt.skinning===!0||K.isInstancedMesh&&Gt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Gt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Gt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Gt.instancingMorph===!1&&K.morphTexture!==null||Gt.envMap!==Wt||Z.fog===!0&&Gt.fog!==It||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==Q.numPlanes||Gt.numIntersection!==Q.numIntersection)||Gt.vertexAlphas!==te||Gt.vertexTangents!==oe||Gt.morphTargets!==Vt||Gt.morphNormals!==le||Gt.morphColors!==ke||Gt.morphTargetsCount!==tn||Gt.numLightProbeGrids!==Zf(T.state.lightProbeGridArray)?me=!0:(Gt.outputColorSpace!==Rt||Gt.toneMapping!==Ae)&&(As=!0):(me=!0,Gt.__version=Z.version);let en=Gt.currentProgram;(me===!0||As===!0)&&(en=As===!0?j0(Z,B,K,Rt,Ae):ta(Z,B,K),W&&Z.isNodeMaterial&&W.onUpdateProgram(Z,en,Gt));let vo=!1,Yi=!1,Ts=!1,pe=en.getUniforms(),Je=Gt.uniforms;if(nt.useProgram(en.program)&&(vo=!0,Yi=!0,Ts=!0),Z.id!==z&&(z=Z.id,Yi=!0),vo||X!==w){nt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),pe.setValue(O,"projectionMatrix",w.projectionMatrix),pe.setValue(O,"viewMatrix",w.matrixWorldInverse);let qe=pe.map.cameraPosition;qe!==void 0&&qe.setValue(O,lt.setFromMatrixPosition(w.matrixWorld)),vt.logarithmicDepthBuffer&&pe.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&pe.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),X!==w&&(X=w,Yi=!0,Ts=!0)}if(Gt.needsLights&&(hn.state.sunShadowMap.length>0&&pe.setValue(O,"sunShadowMap",hn.state.sunShadowMap,yt),hn.state.directionalShadowMap.length>0&&pe.setValue(O,"directionalShadowMap",hn.state.directionalShadowMap,yt),hn.state.spotShadowMap.length>0&&pe.setValue(O,"spotShadowMap",hn.state.spotShadowMap,yt),hn.state.pointShadowMap.length>0&&pe.setValue(O,"pointShadowMap",hn.state.pointShadowMap,yt)),K.isSkinnedMesh){pe.setOptional(O,K,"bindMatrix"),pe.setOptional(O,K,"bindMatrixInverse");let Pe=K.skeleton;Pe&&(Pe.boneTexture===null&&Pe.computeBoneTexture(),pe.setValue(O,"boneTexture",Pe.boneTexture,yt))}K.isBatchedMesh&&(pe.setOptional(O,K,"batchingTexture"),pe.setValue(O,"batchingTexture",K._matricesTexture,yt),pe.setOptional(O,K,"batchingIdTexture"),pe.setValue(O,"batchingIdTexture",K._indirectTexture,yt),pe.setOptional(O,K,"batchingColorTexture"),K._colorsTexture!==null&&pe.setValue(O,"batchingColorTexture",K._colorsTexture,yt));let Wn=j.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&rt.update(K,j,en),(Yi||Gt.receiveShadow!==K.receiveShadow)&&(Gt.receiveShadow=K.receiveShadow,pe.setValue(O,"receiveShadow",K.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&B.environment!==null&&(Je.envMapIntensity.value=B.environmentIntensity),Je.dfgLUT!==void 0&&(Je.dfgLUT.value=Bb()),Yi){if(pe.setValue(O,"toneMappingExposure",P.toneMappingExposure),Gt.needsLights&&tg(Je,Ts),It&&Z.fog===!0&&_t.refreshFogUniforms(Je,It),_t.refreshMaterialUniforms(Je,Z,mt,Pt,T.state.transmissionRenderTarget[w.id]),Gt.needsLights&&Gt.numLightProbeGrids>0){let Pe=M,qe=0;for(let Ai of T.state.lightProbeGridArray)Ai.texture!==null&&(Pe.textures[qe]=Ai.texture,Pe.min[qe]=Ai.boundingBox.min,Pe.max[qe]=Ai.boundingBox.max,Pe.resolution[qe]=Ai.resolution,qe++);for(let Ai in Pe)Pe[Ai].length=qe;Je.probesSH.value=Pe.textures,Je.probesMin.value=Pe.min,Je.probesMax.value=Pe.max,Je.probesResolution.value=Pe.resolution}Yr.upload(O,Jf(Gt),Je,yt)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Yr.upload(O,Jf(Gt),Je,yt),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&pe.setValue(O,"center",K.center),pe.setValue(O,"modelViewMatrix",K.modelViewMatrix),pe.setValue(O,"normalMatrix",K.normalMatrix),pe.setValue(O,"modelMatrix",K.matrixWorld),Z.uniformsGroups!==void 0){let Pe=Z.uniformsGroups;for(let qe=0,Ai=Pe.length;qe<Ai;qe++){let Qf=Pe[qe];Ht.update(Qf,en),Ht.bind(Qf,en)}}return en}function tg(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.sunLights.needsUpdate=B,w.sunLightShadows.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function eg(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(w,B,j){let Z=gt.get(w);Z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),gt.get(w.texture).__webglTexture=B,gt.get(w.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:j,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,B){let j=gt.get(w);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(w,B=0,j=0){k=w,N=B,L=j;let Z=null,K=!1,It=!1;if(w){let Rt=gt.get(w);if(Rt.__useDefaultFramebuffer!==void 0){nt.bindFramebuffer(O.FRAMEBUFFER,Rt.__webglFramebuffer),$.copy(w.viewport),ot.copy(w.scissor),Tt=w.scissorTest,nt.viewport($),nt.scissor(ot),nt.setScissorTest(Tt),z=-1;return}else if(Rt.__webglFramebuffer===void 0)yt.setupRenderTarget(w);else if(Rt.__hasExternalTextures)yt.rebindTextures(w,gt.get(w.texture).__webglTexture,gt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let te=w.depthTexture;if(Rt.__boundDepthTexture!==te){if(te!==null&&gt.has(te)&&(w.width!==te.image.width||w.height!==te.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");yt.setupDepthRenderbuffer(w)}}let Ot=w.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(It=!0);let Wt=gt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Wt[B])?Z=Wt[B][j]:Z=Wt[B],K=!0):w.samples>0&&yt.useMultisampledRTT(w)===!1?Z=gt.get(w).__webglMultisampledFramebuffer:Array.isArray(Wt)?Z=Wt[j]:Z=Wt,$.copy(w.viewport),ot.copy(w.scissor),Tt=w.scissorTest}else $.copy(zt).multiplyScalar(mt).floor(),ot.copy(Zt).multiplyScalar(mt).floor(),Tt=jt;if(j!==0&&(Z=F),nt.bindFramebuffer(O.FRAMEBUFFER,Z)&&nt.drawBuffers(w,Z),nt.viewport($),nt.scissor(ot),nt.setScissorTest(Tt),K){let Rt=gt.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+B,Rt.__webglTexture,j)}else if(It){let Rt=B;for(let Ot=0;Ot<w.textures.length;Ot++){let Wt=gt.get(w.textures[Ot]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ot,Wt.__webglTexture,j,Rt)}}else if(w!==null&&j!==0){let Rt=gt.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Rt.__webglTexture,j)}z=-1};function jf(w){let B=gt.get(w);return(B.__readFormat!==w.format||B.__readType!==w.type)&&(B.__readFormat=w.format,B.__readType=w.type,B.__formatReadable=vt.textureFormatReadable(w.format),B.__typeReadable=vt.textureTypeReadable(w.type)),B}this.readRenderTargetPixels=function(w,B,j,Z,K,It,kt,Rt=0){if(!(w&&w.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=gt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&kt!==void 0&&(Ot=Ot[kt],Array.isArray(Ot)&&(Ot=Ot[0])),Ot){nt.bindFramebuffer(O.FRAMEBUFFER,Ot);try{let Wt=w.textures[Rt],te=Wt.format,oe=Wt.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Rt);let Vt=jf(Wt);if(Vt.__formatReadable===!1){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Vt.__typeReadable===!1){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-Z&&j>=0&&j<=w.height-K&&O.readPixels(B,j,Z,K,St.convert(te),St.convert(oe),It)}finally{let Wt=k!==null?gt.get(k).__webglFramebuffer:null;nt.bindFramebuffer(O.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(w,B,j,Z,K,It,kt,Rt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=gt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&kt!==void 0&&(Ot=Ot[kt],Array.isArray(Ot)&&(Ot=Ot[0])),Ot)if(B>=0&&B<=w.width-Z&&j>=0&&j<=w.height-K){nt.bindFramebuffer(O.FRAMEBUFFER,Ot);let Wt=w.textures[Rt],te=Wt.format,oe=Wt.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Rt);let Vt=jf(Wt);if(Vt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Vt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,le),O.bufferData(O.PIXEL_PACK_BUFFER,It.byteLength,O.STREAM_READ),O.readPixels(B,j,Z,K,St.convert(te),St.convert(oe),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let ke=k!==null?gt.get(k).__webglFramebuffer:null;nt.bindFramebuffer(O.FRAMEBUFFER,ke);let Ae=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Sm(O,Ae,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,le),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,It),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(le),O.deleteSync(Ae),It}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,B=null,j=0){let Z=Math.pow(2,-j),K=Math.floor(w.image.width*Z),It=Math.floor(w.image.height*Z),kt=B!==null?B.x:0,Rt=B!==null?B.y:0;yt.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,j,0,0,kt,Rt,K,It),nt.unbindTexture()},this.copyTextureToTexture=function(w,B,j=null,Z=null,K=0,It=0){let kt,Rt,Ot,Wt,te,oe,Vt,le,ke,Ae=w.isCompressedTexture?w.mipmaps[It]:w.image;if(j!==null)kt=j.max.x-j.min.x,Rt=j.max.y-j.min.y,Ot=j.isBox3?j.max.z-j.min.z:1,Wt=j.min.x,te=j.min.y,oe=j.isBox3?j.min.z:0;else{let pe=Math.pow(2,-K);kt=Math.floor(Ae.width*pe),Rt=Math.floor(Ae.height*pe),w.isDataArrayTexture?Ot=Ae.depth:w.isData3DTexture?Ot=Math.floor(Ae.depth*pe):Ot=1,Wt=0,te=0,oe=0}Z!==null?(Vt=Z.x,le=Z.y,ke=Z.z):(Vt=0,le=0,ke=0);let Me=St.convert(B.format),tn=St.convert(B.type),Gt;B.isData3DTexture?(yt.setTexture3D(B,0),Gt=O.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(yt.setTexture2DArray(B,0),Gt=O.TEXTURE_2D_ARRAY):(yt.setTexture2D(B,0),Gt=O.TEXTURE_2D),nt.activeTexture(O.TEXTURE0),nt.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),nt.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),nt.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment);let hn=nt.getParameter(O.UNPACK_ROW_LENGTH),me=nt.getParameter(O.UNPACK_IMAGE_HEIGHT),As=nt.getParameter(O.UNPACK_SKIP_PIXELS),en=nt.getParameter(O.UNPACK_SKIP_ROWS),vo=nt.getParameter(O.UNPACK_SKIP_IMAGES);nt.pixelStorei(O.UNPACK_ROW_LENGTH,Ae.width),nt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ae.height),nt.pixelStorei(O.UNPACK_SKIP_PIXELS,Wt),nt.pixelStorei(O.UNPACK_SKIP_ROWS,te),nt.pixelStorei(O.UNPACK_SKIP_IMAGES,oe);let Yi=w.isDataArrayTexture||w.isData3DTexture,Ts=B.isDataArrayTexture||B.isData3DTexture;if(w.isDepthTexture){let pe=gt.get(w),Je=gt.get(B),Wn=gt.get(pe.__renderTarget),Pe=gt.get(Je.__renderTarget);nt.bindFramebuffer(O.READ_FRAMEBUFFER,Wn.__webglFramebuffer),nt.bindFramebuffer(O.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let qe=0;qe<Ot;qe++)Yi&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,gt.get(w).__webglTexture,K,oe+qe),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,gt.get(B).__webglTexture,It,ke+qe)),O.blitFramebuffer(Wt,te,Wt+kt,te+Rt,Vt,le,Vt+kt,le+Rt,O.DEPTH_BUFFER_BIT,O.NEAREST);nt.bindFramebuffer(O.READ_FRAMEBUFFER,null),nt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(K!==0||w.isRenderTargetTexture||gt.has(w)){let pe=gt.get(w),Je=gt.get(B);nt.bindFramebuffer(O.READ_FRAMEBUFFER,R),nt.bindFramebuffer(O.DRAW_FRAMEBUFFER,C);for(let Wn=0;Wn<Ot;Wn++)Yi?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,pe.__webglTexture,K,oe+Wn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,pe.__webglTexture,K),Ts?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Je.__webglTexture,It,ke+Wn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Je.__webglTexture,It),K!==0?O.blitFramebuffer(Wt,te,Wt+kt,te+Rt,Vt,le,Vt+kt,le+Rt,O.COLOR_BUFFER_BIT,O.NEAREST):Ts?O.copyTexSubImage3D(Gt,It,Vt,le,ke+Wn,Wt,te,kt,Rt):O.copyTexSubImage2D(Gt,It,Vt,le,Wt,te,kt,Rt);nt.bindFramebuffer(O.READ_FRAMEBUFFER,null),nt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Ts?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(Gt,It,Vt,le,ke,kt,Rt,Ot,Me,tn,Ae.data):B.isCompressedArrayTexture?O.compressedTexSubImage3D(Gt,It,Vt,le,ke,kt,Rt,Ot,Me,Ae.data):O.texSubImage3D(Gt,It,Vt,le,ke,kt,Rt,Ot,Me,tn,Ae):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,It,Vt,le,kt,Rt,Me,tn,Ae.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,It,Vt,le,Ae.width,Ae.height,Me,Ae.data):O.texSubImage2D(O.TEXTURE_2D,It,Vt,le,kt,Rt,Me,tn,Ae);nt.pixelStorei(O.UNPACK_ROW_LENGTH,hn),nt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,me),nt.pixelStorei(O.UNPACK_SKIP_PIXELS,As),nt.pixelStorei(O.UNPACK_SKIP_ROWS,en),nt.pixelStorei(O.UNPACK_SKIP_IMAGES,vo),It===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&O.generateMipmap(Gt),nt.unbindTexture()},this.initRenderTarget=function(w){gt.get(w).__webglFramebuffer===void 0&&yt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?yt.setTextureCube(w,0):w.isData3DTexture?yt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?yt.setTexture2DArray(w,0):yt.setTexture2D(w,0),nt.unbindTexture()},this.resetState=function(){N=0,L=0,k=null,nt.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}};var ti={ink:"#07090d",bg:"#14161b",text:"#eef0f3",muted:"#9aa1ad",amber:"#f5a524",gold:"#ffcf7a",field:"#5fb37c",sky:"#5fb3ff",blue:"#4ea1ff",coral:"#ff6b5e",origin:"#ffd28a",dest:"#9fd1ff",melonO:"#5fd07a",melonD:"#ff5a6e"},Tf=[["#f5a524","#3f9b6a"],["#f5a524","#ffcf7a"],["#d99a4a","#4a78c8"],["#3f9b6a","#4f9fe8"],["#e9b85a","#3d7fd9"],["#5fb37c","#e0b04a"],["#d99a4a","#4f9fe8"],["#2f9fb0","#5f6ee8"],["#f5a524","#c0603a"],["#7cc98f","#3f8fd0"],["#5fb37c","#3cc0b0"],["#5fb3ff","#3f9b6a"],["#8f9dff","#7cc98f"],["#ff8a6b","#c58a3a"],["#c58a3a","#3f9b8a"],["#f5a524","#8a6a3a"],["#f5a524","#5fb37c"]],uo=["#3b2a12","#8a5a17","#d98e1f","#f5a524","#ffd98a"],Wi={lo:"#4ea1ff",mid:"#3a404c",hi:"#f5a524",na:"#2f343e"},Jr=["#14301f","#1f5a3a","#3f9b6a","#7cc98f","#d4f2a8"],Yc=["#1a2c52","#24539a","#2f7fd6","#3fb0e6","#7fe0f0"],Zc=["#6b4a2e","#a8582a","#e07a3a","#ff9a5a","#ffd9b0"],u0=["#2b4a8f","#2f86c9","#2fb3a8","#9cc56a","#f5a524"],xs=s=>{let t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},Af=s=>(s/=255,s<=.04045?s/12.92:((s+.055)/1.055)**2.4),kb=s=>255*(s<=.0031308?s*12.92:1.055*s**(1/2.4)-.055);function zb(s,t,e){let n=xs(s),i=xs(t);return n.map((r,a)=>Math.round(kb(Af(r)+(Af(i[a])-Af(r))*e)))}function Un(s,t){t=Math.min(1,Math.max(0,t))*(s.length-1);let e=Math.min(s.length-2,Math.floor(t));return zb(s[e],s[e+1],t-e)}var Ee=([s,t,e],n=1)=>n===1?`rgb(${s},${t},${e})`:`rgba(${s},${t},${e},${n})`;var cn=1920,Xi=1080,Vb=10,Mi=.06,Gb=1.2,Hn=s=>new ee(Array.isArray(s)?`rgb(${s.join(",")})`:s),Ef=s=>s<=0?0:s>=1?1:s*s*(3-2*s);function Hb(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function Cf(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function Wb(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}var Xb=`
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
}`,qb=`
uniform float uAlpha; varying vec3 vColor; varying float vA;
void main(){
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r); a *= a;
  gl_FragColor = vec4(vColor, a * vA * uAlpha);
  #include <colorspace_fragment>
}`;function f0(s,t){let e=new Xc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.setClearColor(0,0),e.toneMapping=Qa,e.toneMappingExposure=1,e.outputColorSpace=dn,e.shadowMap.enabled=!0,e.shadowMap.type=qs;let n=new Ia,i=new pn(30,cn/Xi,1,200),r=Vb/t.Q,a=(V,lt)=>[V*r,lt*r];n.add(new Ya(14674175,1709064,.9)),n.add(new Ka(16777215,.18));let o=new Vr(16773596,2.6);o.position.set(-7,-11,17),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:50}),o.shadow.bias=-4e-4,n.add(o);let l=new Vr(9419519,.9);l.position.set(9,12,6),n.add(l);let c=new Ln(new Xs(60,60),new qa({opacity:.42,transparent:!0}));c.receiveShadow=!0,n.add(c);let h=Math.max(...Object.values(t.land.v).filter(Boolean)),d={cap:Hn("#1f242d"),side:Hn("#14171d")},f=Math.max(...Object.values(t.spots.dev)),u=Object.values(t.jikbul.v).sort((V,lt)=>V-lt),m=V=>{let lt=0,dt=u.length-1;for(;lt<dt;){let Et=lt+dt>>1;u[Et]<V?lt=Et+1:dt=Et}return .08+.92*(lt/(u.length-1))},_=new Oi;n.add(_);let p=t.map.sigun.map(V=>{let lt=V.rings.map(([_t,...xt])=>{let J=pt=>pt.slice(0,-1).map(([rt,tt])=>new Lt(...a(rt,tt))),Q=new Fr(J(_t));return xt.forEach(pt=>Q.holes.push(new Hs(J(pt)))),Q}),dt=new Xa(lt,{depth:1,bevelEnabled:!1,curveSegments:1}),Et=t.land.v[V.key],Dt=Et?Math.sqrt(Et/h):0,Xt=Hn(Et?Un(uo,.12+.88*Dt):"#2a2620"),O=t.rice.dev[V.key],de=O==null?Hn(Wi.na):Hn(Wi.mid).lerp(Hn(O<0?Wi.lo:Wi.hi),Math.min(1,Math.abs(O)/.05)**.8),et=t.jikbul.v[V.key],vt=Hn(et==null?"#262c28":Un(Jr,m(et))),nt=t.spots.dev[V.key]||0,Ct=Hn(nt?Un(Yc,.1+.9*(nt/f)**1.3):"#1d2430"),gt=Mi+1.9*(nt/f)**1.8,yt=new kr({roughness:.58,metalness:.04,transparent:!0}),E=new kr({roughness:.75,metalness:0,transparent:!0}),y=new Ln(dt,[yt,E]);y.castShadow=y.receiveShadow=!0,y.scale.z=Mi,_.add(y);let[G,ht]=a(...V.c),st=Math.min(1,Math.max(0,(G+4)/9*.45+(ht+5)/10*.55));return{key:V.key,mesh:y,cap:yt,side:E,h:Mi+(Gb-Mi)*Dt,landCol:Xt,riceCol:de,jikCol:vt,devCol:Ct,h2:gt,cx:G,cy:ht,delay:st,land:Et,rings:V.rings}}),g=new Map(p.map(V=>[V.key,V])),v=(V,lt)=>{let dt=[];V.forEach(Dt=>{for(let Xt=1;Xt<Dt.length;Xt++)dt.push(...a(...Dt[Xt-1]),lt,...a(...Dt[Xt]),lt)});let Et=new bn;return Et.setAttribute("position",new Ue(dt,3)),Et},S=new Gs({color:Hn("#cfd6e2"),transparent:!0,opacity:0,depthWrite:!1}),M=new Gs({color:Hn("#8d96a6"),transparent:!0,opacity:0,depthWrite:!1}),A=new Nr(v(t.map.lineSido,0),S),T=new Nr(v(t.map.lineSigun,0),M);A.renderOrder=T.renderOrder=2,_.add(A,T);let x=9e3,b=2400,I=Wb(20261110),P=[],U=[],W=[],F=[],R=[],C=p.map(V=>(V.land||0)/Math.max(1e-6,V.rings.reduce((lt,dt)=>lt+Cf(dt[0]),0))),N=[...C].sort((V,lt)=>V-lt),L=V=>N.indexOf(V)/(N.length-1),k=p.map(V=>V.rings.reduce((lt,dt)=>lt+Cf(dt[0]),0)**.85),z=k.reduce((V,lt)=>V+lt,0),X=(V,lt,dt)=>{P.push(V,lt,.08);let Et=9+I()*16,Dt=I()*Math.PI*2,Xt=(I()-.5)*Math.PI*.7;U.push(Et*Math.cos(Dt)*Math.cos(Xt)*1.4,Et*Math.sin(Dt)*Math.cos(Xt),4+Et*Math.sin(Xt)*.6);let O=Math.hypot(V,lt)/6;W.push(Math.min(1,I()*.65+O*.35)),F.push(I()),R.push(dt.r,dt.g,dt.b)};p.forEach((V,lt)=>{let dt=Math.max(6,Math.round((x-b)*k[lt]/z)),Et=Hn(Un(uo,.35+.65*L(C[lt]))),Dt=V.rings.map(de=>de[0]),Xt=Dt.map(Cf),O=Xt.reduce((de,et)=>de+et,0);for(let de=0;de<dt;de++){let et=I()*O,vt=0;for(;et>Xt[vt]&&vt<Dt.length-1;)et-=Xt[vt++];let nt=Dt[vt],Ct=1/0,gt=-1/0,yt=1/0,E=-1/0;nt.forEach(([y,G])=>{Ct=Math.min(Ct,y),gt=Math.max(gt,y),yt=Math.min(yt,G),E=Math.max(E,G)});for(let y=0;y<40;y++){let G=Ct+I()*(gt-Ct),ht=yt+I()*(E-yt);if(Hb(G,ht,nt)){X(...a(G,ht),Et);break}}}});let $=Hn("#ffe9c2"),ot=t.map.lineSido,Tt=ot.map(V=>V.reduce((lt,dt,Et)=>Et?lt+Math.hypot(dt[0]-V[Et-1][0],dt[1]-V[Et-1][1]):0,0)),Y=Tt.reduce((V,lt)=>V+lt,0);for(let V=0;V<b;V++){let lt=I()*Y,dt=0;for(;lt>Tt[dt]&&dt<ot.length-1;)lt-=Tt[dt++];let Et=ot[dt];for(let Dt=1;Dt<Et.length;Dt++){let Xt=Math.hypot(Et[Dt][0]-Et[Dt-1][0],Et[Dt][1]-Et[Dt-1][1]);if(lt<=Xt||Dt===Et.length-1){let O=Xt?Math.min(1,lt/Xt):0;X(...a(Et[Dt-1][0]+(Et[Dt][0]-Et[Dt-1][0])*O,Et[Dt-1][1]+(Et[Dt][1]-Et[Dt-1][1])*O),$);break}lt-=Xt}}let ft=new bn;ft.setAttribute("position",new Ue(P,3)),ft.setAttribute("aStart",new Ue(U,3)),ft.setAttribute("aDelay",new Ue(W,1)),ft.setAttribute("aSeed",new Ue(F,1)),ft.setAttribute("aColor",new Ue(R,3));let At=new Gn({vertexShader:Xb,fragmentShader:qb,transparent:!0,depthWrite:!1,blending:ja,uniforms:{uMorph:{value:0},uTime:{value:0},uSize:{value:92},uScale:{value:1},uAlpha:{value:1}}}),Pt=new Na(ft,At);Pt.frustumCulled=!1,Pt.renderOrder=3,n.add(Pt);let mt=new ee,Bt=new ee,Kt=new H,zt=cn,Zt=Xi;function jt(V,lt){zt=V,Zt=lt,e.setSize(V,lt,!1),At.uniforms.uScale.value=lt/Xi}function at(V,lt){let dt=V.tilt*.86,Et=V.orbit,Dt=V.camDist,Xt=V.camX,O=-.4*V.tilt+V.camY;i.position.set(Xt+Dt*Math.sin(dt)*Math.sin(Et),O-Dt*Math.sin(dt)*Math.cos(Et),Dt*Math.cos(dt)),i.up.set(0,1,0),i.lookAt(Xt,O,0),i.setViewOffset(cn,Xi,-V.mapShift,-V.mapLift,cn,Xi),i.updateMatrixWorld();let de=V.mapAlpha>.001;_.visible=de,p.forEach(vt=>{let nt=Ef((V.rise-vt.delay*.5)/.5),Ct=V.devRise>0?Ef((V.devRise-(1-vt.delay)*.5)/.5):0;vt.mesh.scale.z=Mi+(vt.h-Mi)*nt+(vt.h2-Mi)*Ct,mt.lerpColors(vt.landCol,vt.riceCol,V.riceColor).lerp(vt.jikCol,V.jikColor).lerp(vt.devCol,V.devColor).lerp(d.cap,V.mapDim),vt.cap.color.copy(mt),vt.cap.emissive.copy(mt).multiplyScalar(.16*(1-Math.min(1,V.mapDim))),Bt.copy(mt).multiplyScalar(.52).lerp(d.side,V.mapDim),vt.side.color.copy(Bt),vt.cap.opacity=vt.side.opacity=V.mapAlpha});let et=1-Ef(Math.max(V.rise,V.devRise)*1.6);A.position.z=Mi+.004,T.position.z=Mi+.003,S.opacity=V.mapAlpha*et*(.28+.4*V.mapDim),M.opacity=V.mapAlpha*et*(.1+.12*V.mapDim),c.material.opacity=.42*V.mapAlpha,At.uniforms.uMorph.value=V.morph,At.uniforms.uTime.value=lt,At.uniforms.uAlpha.value=V.pAlpha,Pt.visible=V.pAlpha>.001,s.style.opacity=V.glAlpha,V.glAlpha>.001&&e.render(n,i)}function q(V,lt,dt){return Kt.set(V,lt,dt).project(i),[(Kt.x+1)*.5*cn,(1-Kt.y)*.5*Xi]}return{render:at,resize:jt,project:q,top:V=>{let lt=g.get(V);return lt?[lt.cx,lt.cy,lt.mesh.scale.z]:null},world:(V,lt)=>a(V,lt),flat:Mi,units:p,byKey:g,renderer:e}}var $b=s=>s<0?0:s>1?1:s,Yb=s=>(s=$b(s),s*s*(3-2*s)),Rf=s=>s-Math.floor(s),Jc='"Pretendard Variable", Pretendard, system-ui, sans-serif';function d0(s,t,e){let n=s.getContext("2d"),i=1;function r(F,R){s.width=F,s.height=R,i=F/cn}let a=t.flows.top.slice(0,50).map(([F,R,C],N)=>({o:F,d:R,v:C,i:N,ph:Rf(N*.618)})),o=a[0].v,l=xs(ti.melonO),c=xs(ti.melonD),h=(F,R,C,N)=>{let L=1-N;return[L*L*F[0]+2*L*N*R[0]+N*N*C[0],L*L*F[1]+2*L*N*R[1]+N*N*C[1]]},d=F=>l.map((R,C)=>Math.round(R+(c[C]-R)*F));function f(F,R){let C=F.flowAlpha;if(C<=.002||F.flows<=.001)return;n.globalCompositeOperation="lighter";let N=new Map;for(let L=a.length-1;L>=0;L--){let k=a[L],z=e.top(k.o),X=e.top(k.d);if(!z||!X)continue;let $=e.project(z[0],z[1],z[2]),ot=e.project(X[0],X[1],X[2]),Tt=ot[0]-$[0],Y=ot[1]-$[1],ft=Math.hypot(Tt,Y)||1,At=[($[0]+ot[0])/2-Y*.22,($[1]+ot[1])/2+Tt*.22-ft*.18],Pt=Yb((F.flows-L/a.length*.55)/.45);if(Pt<=0)continue;let mt=Math.sqrt(k.v/o),Bt=L<3,Kt=n.createLinearGradient($[0],$[1],ot[0],ot[1]);Kt.addColorStop(0,Ee(l,1)),Kt.addColorStop(1,Ee(c,1));let zt=Math.max(8,Math.round(ft/10)),Zt=()=>{n.beginPath(),n.moveTo($[0],$[1]);for(let it=1;it<=zt*Pt;it++){let ut=h($,At,ot,it/zt);n.lineTo(ut[0],ut[1])}let q=h($,At,ot,Pt);n.lineTo(q[0],q[1])};n.lineCap="round",n.strokeStyle=Kt,n.globalAlpha=C*(.035+.08*mt)*(Bt?1.5:1),n.lineWidth=3+11*mt,Zt(),n.stroke(),n.globalAlpha=C*(.22+.5*mt)*(Bt?1.2:1),n.lineWidth=.7+2.8*mt,Zt(),n.stroke();let jt=Bt?4:mt>.4?3:2,at=.42/(.5+ft/520);for(let q=0;q<jt;q++){let it=Rf(R*at+k.ph+q/jt);if(it>Pt)continue;let ut=h($,At,ot,it),V=1.6+3.2*mt,lt=d(it),dt=n.createRadialGradient(ut[0],ut[1],0,ut[0],ut[1],V*3.2);dt.addColorStop(0,Ee([255,255,255],1)),dt.addColorStop(.25,Ee(lt,.9)),dt.addColorStop(1,Ee(lt,0)),n.globalAlpha=C*(.35+.4*Math.sin(it*Math.PI)),n.fillStyle=dt,n.beginPath(),n.arc(ut[0],ut[1],V*3.2,0,Math.PI*2),n.fill()}n.globalAlpha=C*Pt*.9,n.fillStyle=Ee(l,1),n.beginPath(),n.arc($[0],$[1],1.6+2.2*mt,0,Math.PI*2),n.fill(),Pt>.98&&N.set(k.d,{p:ot,v:(N.get(k.d)?.v||0)+k.v})}N.forEach(({p:L,v:k})=>{let X=4+11*Math.sqrt(k/o),$=Rf(R*.6+L[0]*.01);n.globalAlpha=C*.45;let ot=n.createRadialGradient(L[0],L[1],0,L[0],L[1],X*1.8);ot.addColorStop(0,Ee(c,.9)),ot.addColorStop(1,Ee(c,0)),n.fillStyle=ot,n.beginPath(),n.arc(L[0],L[1],X*1.8,0,Math.PI*2),n.fill(),n.globalAlpha=C*(1-$)*.7,n.strokeStyle=Ee(c,1),n.lineWidth=1.2,n.beginPath(),n.arc(L[0],L[1],X+$*22,0,Math.PI*2),n.stroke()}),n.globalAlpha=1,n.globalCompositeOperation="source-over"}let u=t.power.k,m=t.power.months,_=u.length,p=Math.max(...u),g=+m[0].slice(5,7)-1,v=1250,S=548,M=36,A=400,T=F=>M+(A-M)*(F/p),x=F=>-Math.PI/2+(g+F)/12*Math.PI*2,b=F=>{let R=Math.floor(F),C=F-R,N=C&&R+1<_?u[R]+(u[R+1]-u[R])*C:u[R],L=T(N),k=x(F);return[v+L*Math.cos(k),S+L*Math.sin(k)]},I=F=>Un(u0,F/(_-1));function P(F){let R=F.powerAlpha;if(R<=.002)return;let C=F.spiral*(_-1);n.save(),n.globalAlpha=R,n.setLineDash([2,6]),n.lineWidth=1,[1e6,2e6].forEach(k=>{n.strokeStyle="rgba(220,228,240,0.16)",n.beginPath(),n.arc(v,S,T(k),0,Math.PI*2),n.stroke(),n.fillStyle="rgba(220,228,240,0.45)",n.font=`500 15px ${Jc}`,n.textAlign="left",n.fillText(`${k/1e4}\uB9CC MWh`,v+8,S-T(k)-6)}),n.setLineDash([]),n.font=`600 17px ${Jc}`,n.textAlign="center",n.textBaseline="middle";for(let k=0;k<12;k++){let z=-Math.PI/2+k/12*Math.PI*2,X=A+34;n.fillStyle=k===0||k===7?"rgba(255,220,160,0.85)":"rgba(200,208,220,0.45)",n.fillText(`${k+1}\uC6D4`,v+X*Math.cos(z),S+X*Math.sin(z))}n.lineCap="round",n.lineJoin="round",n.globalCompositeOperation="lighter";let N=6;for(let k=1;k<=Math.ceil(C);k++){let z=Math.min(k,C);if(z<=k-1)break;let X=(C-k)/12,$=.32+.68*Math.exp(-X*.55),ot=I(k);n.strokeStyle=Ee(ot,1),n.beginPath();let[Tt,Y]=b(k-1);n.moveTo(Tt,Y);for(let ft=1;ft<=N;ft++){let At=k-1+(z-(k-1))*ft/N,[Pt,mt]=b(At);n.lineTo(Pt,mt)}n.globalAlpha=R*$*.22,n.lineWidth=9,n.stroke(),n.globalAlpha=R*$,n.lineWidth=2.2,n.stroke()}if(C>0){let[k,z]=b(C),X=I(C),$=n.createRadialGradient(k,z,0,k,z,34);$.addColorStop(0,"rgba(255,255,255,0.95)"),$.addColorStop(.2,Ee(X,.8)),$.addColorStop(1,Ee(X,0)),n.globalAlpha=R,n.fillStyle=$,n.beginPath(),n.arc(k,z,34,0,Math.PI*2),n.fill()}n.globalCompositeOperation="source-over";let L=Math.min(_-1,Math.floor(C+.001));n.globalAlpha=R,n.fillStyle=Ee(I(C),1),n.font=`800 64px ${Jc}`,n.fillText(m[L].slice(0,4),v,S-6),n.fillStyle="rgba(220,228,240,0.6)",n.font=`500 16px ${Jc}`,n.fillText(`${+m[L].slice(5,7)}\uC6D4 \xB7 ${Math.round(u[L]/1e4)}\uB9CC MWh`,v,S+36),n.restore()}let U=!0;function W(F,R){let C=F.flowAlpha>.002&&F.flows>.001||F.powerAlpha>.002;C!==U&&(U=C,s.style.visibility=C?"visible":"hidden"),C&&(n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,s.width,s.height),n.setTransform(i,0,0,i,0,0),f(F,R),P(F))}return{render:W,resize:r}}var Zb="http://www.w3.org/2000/svg",ue=(s,t={},e)=>{let n=document.createElementNS(Zb,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},Jb=s=>s<0?0:s>1?1:s,ei=s=>(s=Jb(s),s*s*(3-2*s));function p0(s,t){let e=t.rice,n=150,i=700,r=770,a=920,o=725,l=950,c=e.hist.filter(([,q])=>q!=null),h=c.flatMap(([,q,it])=>[q,it]).concat(e.fc.flatMap(q=>[q.lo,q.hi]),[e.stat,e.krei].filter(Boolean)),d=Math.floor((Math.min(...h)-6)/10)*10,f=Math.ceil((Math.max(...h)+4)/10)*10,u=c[0][0],m=c.at(-1)[0],_=q=>n+(q-u)/(m-u)*(i-n),p=q=>r+q/(e.fc.length-1)*(a-r),g=q=>l-(q-d)/(f-d)*(l-o),v=ue("g",{class:"rc",opacity:0},s),S=ue("defs",{},s),M=ue("linearGradient",{id:"rcArea",x1:0,y1:0,x2:0,y2:1},S);ue("stop",{offset:0,"stop-color":ti.gold,"stop-opacity":.22},M),ue("stop",{offset:1,"stop-color":ti.gold,"stop-opacity":0},M);let A=ue("g",{class:"rc-grid"},v);for(let q=d;q<=f;q+=20)q!==d&&(ue("line",{x1:n,x2:a+10,y1:g(q),y2:g(q)},A),ue("text",{x:n-14,y:g(q)+5,"text-anchor":"end"},A).textContent=q);[u,2015,2020,m].forEach(q=>{ue("text",{x:_(q),y:l+30,"text-anchor":"middle"},A).textContent=q}),ue("text",{x:n-14,y:o-22,"text-anchor":"end",class:"rc-unit"},A).textContent="kg/10a";let T=q=>q.map(([it,ut],V)=>`${V?"L":"M"}${it.toFixed(1)},${ut.toFixed(1)}`).join(""),x=c.filter(([,,q])=>q).map(([q,,it])=>[_(q),g(it)]),b=c.map(([q,it])=>[_(q),g(it)]),I=ue("path",{d:`${T(b)}L${_(m)},${l}L${_(u)},${l}Z`,fill:"url(#rcArea)",opacity:0},v),P=ue("path",{d:T(x),class:"rc-norm"},v),U=ue("path",{d:T(b),class:"rc-line"},v),W=b.map(([q,it])=>ue("circle",{cx:q,cy:it,r:4.2,class:"rc-dot",opacity:0},v)),F=ue("g",{class:"rc-fc"},v);ue("rect",{x:r-30,y:o-30,width:a-r+60,height:l-o+44,rx:14,class:"rc-fcbox"},F),ue("text",{x:(r+a)/2,y:l+30,"text-anchor":"middle",class:"rc-fclab"},F).textContent=`${e.year} \uC608\uCE21 ${e.fc.length}\uBC88`;let R=[[e.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98",ti.sky],[e.krei,"KREI",ti.field]].filter(([q])=>q!=null).map(([q,it,ut],V)=>{let lt=ue("g",{opacity:0},F);return ue("line",{x1:r-18,x2:a+18,y1:g(q),y2:g(q),stroke:ut,"stroke-width":2,"stroke-dasharray":"5 4"},lt),ue("text",{x:a+26,y:g(q)+(V?14:-4),fill:ut,class:"rc-ref"},lt).textContent=`${it} ${q}`,lt}),C=ue("path",{d:T(e.fc.map((q,it)=>[p(it),g(q.y)])),class:"rc-fcline"},F),N=e.fc.map((q,it)=>{let ut=ue("g",{opacity:0},F);return ue("line",{x1:p(it),x2:p(it),y1:g(q.lo),y2:g(q.hi),class:"rc-wh"},ut),ue("circle",{cx:p(it),cy:g(q.y),r:it===e.fc.length-1?7:5,class:it===e.fc.length-1?"rc-fcdot now":"rc-fcdot"},ut),ut}),L=q=>q.replace(/(\d+)월 (\d+)일/,"$1/$2");ue("text",{x:p(0),y:o-42,"text-anchor":"middle",class:"rc-fcd"},F).textContent=L(e.fc[0].lab),ue("text",{x:p(e.fc.length-1),y:o-42,"text-anchor":"middle",class:"rc-fcd"},F).textContent=L(e.fc.at(-1).lab);let k=t.facts,z=k.riceAcc,X=ue("g",{class:"ra",opacity:0},s),$=[["\uD3C9\uB144 \uADF8\uB300\uB85C",z.norm,"norm"],...t.rice.fc.slice(0,5).map(q=>[q.lab,z[`m${q.t}`],q.t])].filter(([,q])=>q!=null),ot=330,Tt=900,Y=742,ft=37,At=q=>ot+q/Math.max(...$.map(it=>it[1]))*(Tt-ot);ue("text",{x:150,y:Y-44,class:"ra-h"},X).textContent=`\uC804\uAD6D \uB2E8\uC218 \uD3C9\uADE0 \uC624\uCC28 \xB7 ${k.riceFrom}~${t.rice.year-1} \uADF8\uD574 \uC774\uC804 \uC790\uB8CC\uB85C\uB9CC \uC7AC\uD604`;let Pt=$.slice(1).reduce((q,it)=>it[1]<q[1]?it:q)[2],mt=$.map(([q,it,ut],V)=>{let lt=Y+V*ft,dt=ue("g",{opacity:0},X);ue("text",{x:ot-16,y:lt+19,"text-anchor":"end",class:"ra-l"},dt).textContent=V?`${q} \uC608\uCE21`:q;let Et=ue("rect",{x:ot,y:lt+4,width:0,height:22,rx:5,class:ut==="norm"?"ra-b norm":ut==="0915"?"ra-b best":"ra-b"},dt),Dt=ue("text",{x:ot,y:lt+21,class:"ra-v"},dt);return Dt.textContent=`${it}kg`,{gg:dt,r:Et,tx:Dt,w:At(it)-ot}}),Bt=[[z.stat,"\uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1","#5fb3ff"],[z.krei,"KREI 9\uC6D4 \uC804\uB9DD","#5fb37c"]].map(([q,it,ut],V)=>{let lt=ue("g",{opacity:0},X),dt=At(q),Et=Y-6,Dt=Y+$.length*ft;return ue("line",{x1:dt,x2:dt,y1:Et,y2:Dt,stroke:ut,"stroke-width":2,"stroke-dasharray":"4 4"},lt),ue("text",{x:dt+(V?8:-8),y:Dt+24,"text-anchor":V?"start":"end",fill:ut,class:"ra-ref"},lt).textContent=`${it} ${q}kg`,lt}),Kt=0,zt=0;function Zt(){Kt=U.getTotalLength(),zt=C.getTotalLength(),U.style.strokeDasharray=`${Kt} ${Kt}`,C.style.strokeDasharray=`${zt} ${zt}`}function jt(q){X.setAttribute("opacity",q.accAlpha),!(q.accAlpha<=.002)&&(mt.forEach((it,ut)=>{let V=ei((q.riceAcc-ut*.1)/.45);it.gg.setAttribute("opacity",ei(V*3)),it.r.setAttribute("width",it.w*V),it.tx.setAttribute("x",ot+it.w*V+10)}),Bt.forEach((it,ut)=>it.setAttribute("opacity",ei((q.riceAcc-.7-ut*.1)/.2))))}function at(q){if(jt(q),Kt||Zt(),v.setAttribute("opacity",q.riceAlpha),q.riceAlpha<=.002)return;let it=ei(q.riceLine);U.style.strokeDashoffset=Kt*(1-it),P.style.opacity=.9*ei(q.riceLine*1.5),I.setAttribute("opacity",ei((q.riceLine-.6)/.4)),W.forEach((V,lt)=>V.setAttribute("opacity",ei((it-lt/W.length)*8)));let ut=q.riceFc;F.setAttribute("opacity",ei(ut*4)),N.forEach((V,lt)=>V.setAttribute("opacity",ei((ut-lt/N.length*.7)/.3))),C.style.strokeDashoffset=zt*(1-ei(ut/.95)),R.forEach((V,lt)=>V.setAttribute("opacity",ei((ut-.75-lt*.08)/.15)))}return{render:at}}var Kb="http://www.w3.org/2000/svg",vs=(s,t={},e)=>{let n=document.createElementNS(Kb,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},jb=s=>s<0?0:s>1?1:s,Pf=s=>(s=jb(s),s*s*(3-2*s)),Qb=s=>Math.round(s/100).toLocaleString("ko-KR");function m0(s,t){let e=t.jikbul,n=e.sido.filter(v=>v.pub>0),i=vs("g",{class:"bd",opacity:0},s),r=150,a=206,o=222,l=470,c=628,h=20.5,d=Math.max(...n.map(v=>v.pub)),f=v=>v.hh?v.pub*100/v.hh:0,u=n.map(f),m=[...u].sort((v,S)=>v-S),_=v=>m.indexOf(v)/Math.max(1,m.length-1);vs("text",{x:r,y:c-22,class:"bd-h"},i).textContent=`\uC2DC\uB3C4\uBCC4 \uACF5\uC775\uC9C1\uBD88 \uC608\uC0B0\uD604\uC561 \xB7 ${e.year}`,vs("text",{x:900,y:c-22,"text-anchor":"end",class:"bd-y"},i).textContent="\uB18D\uAC00\uB2F9";let p=n.map((v,S)=>{let M=c+S*h,A=v.pub/d*l,T=Un(Jr,.25+.75*_(u[S])),x=vs("g",{},i);vs("text",{x:a,y:M+14,"text-anchor":"end",class:"bd-n"},x).textContent=v.name;let b=vs("rect",{x:o,y:M+3,width:0,height:h-7,rx:4,fill:Ee(T)},x),I=vs("text",{x:o,y:M+14,class:"bd-v2"},x);I.textContent=`${Qb(v.pub)}\uC5B5`;let P=vs("text",{x:900,y:M+14,"text-anchor":"end",class:"bd-f"},x);return P.textContent=`${Math.round(u[S]).toLocaleString("ko-KR")}\uB9CC`,{gg:x,b,v:I,f:P,w:A}});function g(v){i.setAttribute("opacity",v.bdAlpha),!(v.bdAlpha<=.002)&&p.forEach((S,M)=>{let A=Pf((v.bdBars-M/p.length*.5)/.5);S.gg.setAttribute("opacity",Pf(A*3)),S.b.setAttribute("width",S.w*A),S.v.setAttribute("x",o+S.w*A+8),S.f.setAttribute("opacity",Pf((v.bdSplit-M/p.length*.4)/.4))})}return{render:g}}var ni=.5416666666666666,g0="assets/intro/shots/";function _0(s,t,e){s.insertAdjacentHTML("beforeend",`
    <div class="scr-wrap" id="scr-wrap">
      <div class="scr" id="scr">
        <div class="scr-bar"><i></i><i></i><i></i><span class="scr-url" id="scr-url">ag-rstat.vercel.app</span></div>
        <div class="scr-view">
          <div class="scr-zoom" id="scr-zoom">
            ${e.map(u=>`<img class="scr-img" data-n="${u}" src="${g0}${u}.webp" alt="" decoding="async" width="1040" height="585">`).join("")}
            <div class="scr-marks" id="scr-marks"></div>
            <div class="cursor" id="cursor"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6.2 1.6L10 19z"/></svg><span class="ripple"></span></div>
          </div>
        </div>
      </div>
    </div>`);let n=s.querySelector("#scr-wrap"),i=s.querySelector("#scr-zoom"),r=s.querySelector("#scr-marks"),a=s.querySelector("#cursor"),o=s.querySelector("#scr-url"),l=Object.fromEntries([...s.querySelectorAll(".scr-img")].map(u=>[u.dataset.n,u])),c=(u,m)=>t.shots[u]?.boxes?.[m]||t.shots.home?.boxes?.[m]||null;function h(u,m=.92){if(!u)return{scale:1,x:0,y:0};let[_,p,g,v]=u,S=Math.max(1,Math.min(1040/(g*ni),585/(v*ni))*m),M=1040/2-(_+g/2)*ni*S,A=585/2-(p+v/2)*ni*S;return M=Math.min(0,Math.max(1040-1040*S,M)),A=Math.min(0,Math.max(585-585*S,A)),{scale:S,x:M,y:A}}let d=u=>u?{x:(u[0]+u[2]/2)*ni,y:(u[1]+u[3]/2)*ni}:{x:1040/2,y:585/2};function f(u,m,_,p="top"){if(!m)return null;let[g,v,S,M]=m;return r.insertAdjacentHTML("beforeend",`<div class="mk mk-${p}" id="mk-${u}" style="left:${g*ni}px;top:${v*ni}px;width:${S*ni}px;height:${M*ni}px"><span>${_}</span></div>`),r.querySelector(`#mk-${u}`)}return{wrap:n,zoom:i,cursor:a,url:o,imgs:l,box:c,focus:h,at:d,mark:f,K:ni}}function x0(s,t){return s.insertAdjacentHTML("beforeend",`
    <div class="wall-wrap" id="wall-wrap"><div class="wall" id="wall">
      ${t.map(([e,n])=>`<figure class="wt"><img src="${g0}${e}_s.webp" alt="" decoding="async" width="320" height="180"><figcaption>${n}</figcaption></figure>`).join("")}
    </div></div>`),s.querySelector("#wall-wrap")}var t1="http://www.w3.org/2000/svg",fe=(s,t={},e)=>{let n=document.createElementNS(t1,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n},y0=s=>s<0?0:s>1?1:s,js=s=>(s=y0(s),s*s*(3-2*s)),If=s=>1-(1-y0(s))**3,e1=s=>s-Math.floor(s),fo='"Pretendard Variable", Pretendard, system-ui, sans-serif';function v0(s){return()=>(s=s*1664525+1013904223>>>0)/4294967296}function n1(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){let[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}function i1(s){let t=0;for(let e=0,n=s.length-1;e<s.length;n=e++)t+=(s[n][0]+s[e][0])*(s[n][1]-s[e][1]);return Math.abs(t/2)}function M0(s,t,e,n){let i=s.getContext("2d"),r=e.spots,a=1,o=!0;function l(et,vt){s.width=et,s.height=vt,a=et/cn}let c=r.rio.regions,h=Math.max(...c.map(et=>et.x)),d=et=>et>=1?Un(["#ffd27a","#f5a524","#ff7a4a"],Math.min(1,(et-1)/2.4)):Un(["#2f6fd0","#4ea1ff","#9fd1ff"],et);function f(et,vt){let nt=et.rioA;if(nt<=.002)return;let Ct=1290,gt=560,yt=74,E=300,y=c.length,G=Math.PI*2/y*.36;i.save(),i.globalAlpha=nt,i.globalCompositeOperation="lighter";for(let st=0;st<3;st++){let _t=e1(vt*.42+st/3),xt=yt+_t*360;i.strokeStyle=`rgba(255,200,120,${.22*(1-_t)*nt})`,i.lineWidth=1.5,i.beginPath(),i.arc(Ct,gt,xt,0,Math.PI*2),i.stroke()}c.forEach((st,_t)=>{let xt=If((et.rioP-_t/y*.5)/.5);if(xt<=0)return;let J=-Math.PI/2+_t/y*Math.PI*2+et.rioP*.12,Q=yt+(E*Math.sqrt(st.x/h)+18)*xt,pt=d(st.lq),D=i.createLinearGradient(Ct+yt*Math.cos(J),gt+yt*Math.sin(J),Ct+Q*Math.cos(J),gt+Q*Math.sin(J));D.addColorStop(0,Ee(pt,.08)),D.addColorStop(.6,Ee(pt,.55)),D.addColorStop(1,Ee(pt,.95)),i.fillStyle=D,i.beginPath(),i.moveTo(Ct+yt*Math.cos(J-G),gt+yt*Math.sin(J-G));let rt=yt+(Q-yt)*.55,tt=G*1.5*(yt/rt)*2.4;i.quadraticCurveTo(Ct+rt*Math.cos(J-tt),gt+rt*Math.sin(J-tt),Ct+Q*Math.cos(J),gt+Q*Math.sin(J)),i.quadraticCurveTo(Ct+rt*Math.cos(J+tt),gt+rt*Math.sin(J+tt),Ct+yt*Math.cos(J+G),gt+yt*Math.sin(J+G)),i.closePath(),i.fill();let bt=js((xt-.7)/.3);if(bt>0){let St=Q+26,wt=Ct+St*Math.cos(J),Ht=gt+St*Math.sin(J);i.globalCompositeOperation="source-over",i.globalAlpha=nt*bt,i.textAlign=Math.cos(J)>.25?"left":Math.cos(J)<-.25?"right":"center",i.textBaseline="middle",i.fillStyle="#eef0f3",i.font=`700 19px ${fo}`,i.fillText(st.name,wt,Ht-9),i.fillStyle=Ee(pt,1),i.font=`600 15px ${fo}`,i.fillText(`${(st.x/1e6).toFixed(1)}\uC870 \xB7 ${st.lq}`,wt,Ht+11),i.globalAlpha=nt,i.globalCompositeOperation="lighter"}}),i.globalCompositeOperation="source-over";let ht=i.createRadialGradient(Ct,gt,0,Ct,gt,yt);ht.addColorStop(0,"rgba(40,30,16,0.95)"),ht.addColorStop(1,"rgba(20,16,10,0.9)"),i.fillStyle=ht,i.beginPath(),i.arc(Ct,gt,yt-4,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(255,207,122,0.5)",i.lineWidth=1.2,i.stroke(),i.textAlign="center",i.textBaseline="middle",i.fillStyle="#ffd98a",i.font=`800 30px ${fo}`,i.fillText(`${Math.round(r.rio.total/1e6)}\uC870`,Ct,gt-6),i.fillStyle="#aab2bf",i.font=`500 14px ${fo}`,i.fillText(`\uB18D\uC2DD\uD488 \uC0B0\uCD9C ${r.rio.year}`,Ct,gt+20),i.textAlign="right",i.fillStyle="rgba(200,208,220,0.75)",i.font=`500 16px ${fo}`,i.fillText("\uAF43\uC78E \uAE38\uC774 = \uC2DC\uB3C4 \uB18D\uC2DD\uD488 \uC0B0\uCD9C\uC561 \xB7 \uC22B\uC790 = \uD2B9\uD654\uB3C4(\uC804\uAD6D \uD3C9\uADE0 1, \uC8FC\uD669\uC77C\uC218\uB85D \uB18D\uC2DD\uD488\uC5D0 \uAE30\uB304\uB2E4)",1844,1018),i.restore()}let u=[[245,165,36],[255,122,89],[124,201,143]],m=Math.max(...r.coops.map(et=>et[3])),_=v0(1110),p=r.coops.map(et=>({w:n.world(et[0],et[1]),k:et[2],s:Math.sqrt(et[3]/m),o:_()}));function g(et,vt){let nt=et.coopA;nt<=.002||(i.save(),i.globalCompositeOperation="lighter",p.forEach(Ct=>{let gt=js((et.coopP-Ct.o*.8)/.2);if(gt<=0)return;let[yt,E]=n.project(Ct.w[0],Ct.w[1],n.flat),y=(1.4+6.5*Ct.s)*(.6+.4*gt),G=.85+.15*Math.sin(vt*2+Ct.o*30),ht=i.createRadialGradient(yt,E,0,yt,E,y*2);ht.addColorStop(0,Ee(u[Ct.k],.5*nt*gt*G)),ht.addColorStop(1,Ee(u[Ct.k],0)),i.fillStyle=ht,i.beginPath(),i.arc(yt,E,y*2,0,Math.PI*2),i.fill(),i.globalCompositeOperation="source-over",i.fillStyle=Ee(u[Ct.k],.92*nt*gt),i.beginPath(),i.arc(yt,E,Math.max(1.5,y*.7),0,Math.PI*2),i.fill(),i.globalCompositeOperation="lighter"}),i.restore())}let v=v0(14939),S=e.map.sigun.map(et=>r.lv.nv[et.key]?r.lv.man[et.key]/r.lv.nv[et.key]:0),M=S.filter(et=>et>0).sort((et,vt)=>et-vt),A=et=>{let vt=0,nt=M.length-1;for(;vt<nt;){let Ct=vt+nt>>1;M[Ct]<et?vt=Ct+1:nt=Ct}return vt/(M.length-1)},T=[];e.map.sigun.forEach((et,vt)=>{let nt=r.lv.nv[et.key];if(!nt)return;let Ct=Un(Zc,.1+.9*A(S[vt])),gt=et.rings.map(y=>y[0]),yt=gt.map(i1),E=yt.reduce((y,G)=>y+G,0);for(let y=0;y<nt;y++){let G=v()*E,ht=0;for(;G>yt[ht]&&ht<gt.length-1;)G-=yt[ht++];let st=gt[ht],_t=1/0,xt=-1/0,J=1/0,Q=-1/0;st.forEach(([pt,D])=>{_t=Math.min(_t,pt),xt=Math.max(xt,pt),J=Math.min(J,D),Q=Math.max(Q,D)});for(let pt=0;pt<30;pt++){let D=_t+v()*(xt-_t),rt=J+v()*(Q-J);if(n1(D,rt,st)){T.push({w:n.world(D,rt),c:Ct,o:v()});break}}}});function x(et){let vt=et.lvA;if(!(vt<=.002)){i.save(),i.globalCompositeOperation="lighter";for(let nt of T){let Ct=js((et.lvP-nt.o*.85)/.15);if(Ct<=0)continue;let[gt,yt]=n.project(nt.w[0],nt.w[1],.06);i.fillStyle=Ee(nt.c,.75*vt*Ct),i.fillRect(gt-1.3,yt-1.3,2.6,2.6)}i.restore()}}let b=r.employ,I=fe("g",{opacity:0},t),P=150,U=1770,W=560,F=950,R=5e3,C=et=>P+(et-b.years[0])/(b.years.at(-1)-b.years[0])*(U-P),N=et=>F-et/R*(F-W),L=fe("defs",{},t),k=fe("linearGradient",{id:"empG",x1:0,y1:0,x2:0,y2:1},L);fe("stop",{offset:0,"stop-color":"#7cc98f","stop-opacity":.45},k),fe("stop",{offset:1,"stop-color":"#7cc98f","stop-opacity":0},k);let z=fe("clipPath",{id:"empClip"},L),X=fe("rect",{x:P-10,y:0,width:0,height:1080},z);for(let et=1e3;et<=4e3;et+=1e3)fe("line",{x1:P,x2:U,y1:N(et),y2:N(et),class:"sp-grid"},I),fe("text",{x:U+12,y:N(et)+5,class:"sp-ax"},I).textContent=`${et/10}\uB9CC`;for(let et=1970;et<=2020;et+=10)fe("text",{x:C(et),y:F+30,"text-anchor":"middle",class:"sp-ax"},I).textContent=et;let $=b.years.map((et,vt)=>[C(et),N(b.a[vt])]),ot=$.map(([et,vt],nt)=>`${nt?"L":"M"}${et.toFixed(1)},${vt.toFixed(1)}`).join(""),Tt=fe("g",{"clip-path":"url(#empClip)"},I);fe("path",{d:`${ot}L${U},${F}L${P},${F}Z`,fill:"url(#empG)"},Tt),fe("path",{d:ot,class:"sp-eline"},Tt);let Y=fe("circle",{r:7,class:"sp-ehead"},I),ft=fe("text",{class:"sp-ehv","text-anchor":"middle"},I),At=fe("text",{x:$[0][0]+14,y:$[0][1]-18,class:"sp-ehs"},I);At.textContent=`${b.years[0]}\uB144 ${Math.round(b.a[0]/10)}\uB9CC \uBA85`;function Pt(et){if(I.setAttribute("opacity",et.empA),et.empA<=.002)return;let vt=et.empP,nt=P+(U-P)*vt;X.setAttribute("width",nt-P+12);let Ct=Math.min(b.years.length-1,vt*(b.years.length-1)),gt=Math.floor(Ct),yt=Ct-gt,E=Math.min(b.years.length-1,gt+1),y=$[gt][0]+($[E][0]-$[gt][0])*yt,G=$[gt][1]+($[E][1]-$[gt][1])*yt,ht=b.a[gt]+(b.a[E]-b.a[gt])*yt;Y.setAttribute("cx",y),Y.setAttribute("cy",G),ft.setAttribute("x",Math.min(U-40,y)),ft.setAttribute("y",G-22),ft.textContent=`${Math.round(b.years[0]+Ct)}\uB144 ${Math.round(ht/10)}\uB9CC`,At.setAttribute("opacity",js(vt*6))}let mt=fe("g",{opacity:0},t),Bt=fe("pattern",{id:"soilDots",width:9,height:9,patternUnits:"userSpaceOnUse"},L);fe("circle",{cx:2,cy:2,r:.9,fill:"rgba(0,0,0,0.25)"},Bt),fe("circle",{cx:6.5,cy:6,r:.7,fill:"rgba(255,255,255,0.12)"},Bt);let Kt=["#7fcf7a","#b9d36a","#d9b86a","#b08858","#6e5a48","#3a3632"],zt=["1\uAE09","2\uAE09","3\uAE09","4\uAE09","5\uAE09","\uAE30\uD0C0"],Zt=[["\uB17C",r.soil.pg,880],["\uBC2D",r.soil.fg,1440]].map(([et,vt,nt])=>{let Ct=vt.reduce((J,Q)=>J+Q,0),gt=250,yt=640,E=280;fe("text",{x:nt+E/2,y:gt-28,"text-anchor":"middle",class:"sp-sh"},mt).textContent=`${et}\uC73C\uB85C \uC4F8 \uB54C \uC801\uC131\uB4F1\uAE09`;let y=gt,G=vt.map((J,Q)=>{let pt=J/Ct*yt,D=fe("g",{},mt);fe("rect",{x:nt,y,width:E,height:Math.max(1,pt-2),rx:4,fill:Kt[Q]},D),fe("rect",{x:nt,y,width:E,height:Math.max(1,pt-2),rx:4,fill:"url(#soilDots)"},D);let rt=J/Ct*100;if(pt>16){let bt=fe("text",{x:nt+E+14,y:y+pt/2+6,class:"sp-sl"},D);bt.innerHTML=`<tspan class="b">${zt[Q]}</tspan><tspan dx="8">${rt.toFixed(1)}%</tspan>`}let tt={g:D,y0:y,h:pt};return y+=pt,tt}),ht=(vt[0]+vt[1])/Ct*100,st=G[0].h+G[1].h,_t=fe("g",{opacity:0},mt);fe("path",{d:`M${nt-14},${gt}h-10v${st}h10`,fill:"none",stroke:"#ffd98a","stroke-width":2},_t);let xt=fe("text",{x:nt-32,y:gt+Math.max(18,st/2+6),"text-anchor":"end",class:"sp-sb"},_t);return xt.innerHTML=`<tspan x="${nt-32}" dy="0">1\xB72\uAE09\uC9C0</tspan><tspan x="${nt-32}" dy="30" class="v">${ht.toFixed(1)}%</tspan>`,{layers:G,br:_t}});function jt(et){mt.setAttribute("opacity",et.soilA),!(et.soilA<=.002)&&Zt.forEach((vt,nt)=>{vt.layers.forEach((Ct,gt)=>{let yt=If((et.soilP-nt*.08-gt*.09)/.38);Ct.g.setAttribute("opacity",js(yt*2)),Ct.g.setAttribute("transform",`translate(0 ${(-120*(1-yt)).toFixed(1)})`)}),vt.br.setAttribute("opacity",js((et.soilP-.75)/.2))})}let at=fe("g",{opacity:0},t),q=r.lv.kinds.filter(([,et])=>et>1e3),it=r.lv.kinds.reduce((et,[,vt])=>et+vt,0),ut=290,V=720,lt=112,dt=["#ff9a5a","#f5c14f","#9fd1ff"];fe("circle",{cx:ut,cy:V,r:lt,fill:"none",stroke:"rgba(255,255,255,0.07)","stroke-width":34},at);let Et=2*Math.PI*lt,Dt=0,Xt=q.map(([et,vt],nt)=>{let Ct=vt/it,gt=fe("circle",{cx:ut,cy:V,r:lt,fill:"none",stroke:dt[nt],"stroke-width":34,transform:`rotate(${-90+Dt*360} ${ut} ${V})`,"stroke-dasharray":`0 ${Et}`},at),yt=fe("text",{x:ut+lt+60,y:V-40+nt*40,class:"sp-dl"},at);return yt.innerHTML=`<tspan fill="${dt[nt]}" class="b">${et}</tspan><tspan dx="10">${Math.round(Ct*100)}%</tspan>`,Dt+=Ct,{c:gt,f:Ct,t:yt}});fe("text",{x:ut,y:V+6,"text-anchor":"middle",class:"sp-dc"},at).textContent="\uBD84\uB1E8\uB294",fe("text",{x:ut,y:V+32,"text-anchor":"middle",class:"sp-dc2"},at).textContent="\uC5B4\uB290 \uAC00\uCD95\uC5D0\uC11C";function O(et){at.setAttribute("opacity",et.lvA),!(et.lvA<=.002)&&Xt.forEach((vt,nt)=>{let Ct=If((et.lvP-nt*.15)/.5);vt.c.setAttribute("stroke-dasharray",`${Math.max(0,vt.f*Et*Ct-3)} ${Et}`),vt.t.setAttribute("opacity",js((Ct-.5)/.5))})}function de(et,vt){Pt(et),jt(et),O(et);let nt=et.rioA>.002||et.coopA>.002||et.lvA>.002;nt!==o&&(o=nt,s.style.visibility=nt?"visible":"hidden"),nt&&(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,s.width,s.height),i.setTransform(a,0,0,a,0,0),f(et,vt),g(et,vt),x(et))}return{render:de,resize:l,coopKinds:r.coopKinds}}var ys=.13392857142857142,s1=ys*16,Lf=s=>440*2**((s-69)/12),r1=[[57,60,64,45],[57,60,65,41],[55,60,64,48],[55,59,62,43]],a1=[[57,60,64,41],[55,59,62,43],[55,59,64,40],[57,60,64,45]];function S0({T:s,hits:t}){let e=null,n=null,i=null,r=null,a=null,o=.7,l=!1,c=!1,h=0,d=0,f=new Set;function u(C){return C<s.stats-.4?{pad:.75,bass:0,kick:0,hat:0,snare:0,arp:.25,soft:!1}:C<s.real?{pad:.6,bass:.8,kick:.9,hat:0,snare:0,arp:.3,soft:!1}:C<s.rice?{pad:.55,bass:.85,kick:.9,hat:.7,snare:0,arp:.55,soft:!1}:C<s.wall?{pad:.5,bass:1,kick:1,hat:.9,snare:.8,arp:.7,soft:!1}:C<s.maker-.2?{pad:.6,bass:1,kick:1,hat:1,snare:1,arp:.8,soft:!1,build:(C-s.wall)/(s.maker-s.wall)}:C<s.end-.2?{pad:.8,bass:.35,kick:0,hat:0,snare:0,arp:.45,soft:!0}:{pad:.9,bass:.6,kick:0,hat:0,snare:0,arp:0,soft:!1,end:!0}}function m(){e=new(window.AudioContext||window.webkitAudioContext),n=e.createGain(),n.gain.value=0;let C=e.createDynamicsCompressor();C.threshold.value=-16,C.ratio.value=3.5,C.attack.value=.004,C.release.value=.2,n.connect(C).connect(e.destination),i=e.createGain(),i.gain.value=.9,i.connect(n),r=e.createConvolver();let N=e.sampleRate*2.6,L=e.createBuffer(2,N,e.sampleRate);for(let X=0;X<2;X++){let $=L.getChannelData(X);for(let ot=0;ot<N;ot++)$[ot]=(Math.random()*2-1)*(1-ot/N)**2.6}r.buffer=L;let k=e.createGain();k.gain.value=.32,r.connect(k).connect(n),a=e.createBuffer(1,e.sampleRate,e.sampleRate);let z=a.getChannelData(0);for(let X=0;X<z.length;X++)z[X]=Math.random()*2-1}let _=(C,N,L)=>{let k={src:C,g:N,end:L};return f.add(k),C.onended=()=>f.delete(k),k};function p(C,N=0){if(C.connect(i),N){let L=e.createGain();L.gain.value=N,C.connect(L).connect(r)}}function g(C,N,L,k,z,X=0){C.gain.setValueAtTime(1e-4,N),C.gain.exponentialRampToValueAtTime(k,N+L),C.gain.exponentialRampToValueAtTime(Math.max(1e-4,X),N+L+z)}function v(C,N,L,k,z,{a:X=.005,d:$=k,lp:ot=0,q:Tt=.7,detune:Y=0,send:ft=0,sustain:At=0}={}){let Pt=e.createOscillator();Pt.type=C,Pt.frequency.value=N,Pt.detune.value=Y;let mt=e.createGain();g(mt,L,X,z,$,At);let Bt=Pt;if(ot){let Kt=e.createBiquadFilter();Kt.type="lowpass",Kt.frequency.value=ot,Kt.Q.value=Tt,Pt.connect(Kt),Bt=Kt}return Bt.connect(mt),p(mt,ft),Pt.start(L),Pt.stop(L+X+$+.05),_(Pt,mt,L+X+$),Pt}function S(C,N,L,k,z,X=1,$=0){let ot=e.createBufferSource();ot.buffer=a;let Tt=e.createBiquadFilter();Tt.type=k,Tt.frequency.value=z,Tt.Q.value=X;let Y=e.createGain();g(Y,C,.002,L,N),ot.connect(Tt).connect(Y),p(Y,$),ot.start(C,Math.random()*.5),ot.stop(C+N+.05),_(ot,Y,C+N)}let M=(C,N)=>{let L=v("sine",150,C,.42,.95*N);L.frequency.setValueAtTime(150,C),L.frequency.exponentialRampToValueAtTime(42,C+.13)},A=(C,N,L)=>S(C,L?.16:.04,.16*N,"highpass",8200,.8),T=(C,N)=>{S(C,.2,.32*N,"bandpass",1900,.7,.25),v("triangle",190,C,.09,.18*N)},x=(C,N,L,k)=>v("sawtooth",Lf(N),C,k,.2*L,{a:.01,lp:380,q:4}),b=(C,N,L,k)=>v(k?"triangle":"square",Lf(N),C,k?.5:.17,(k?.09:.045)*L,{lp:k?2600:3200,send:k?.5:.25});function I(C,N,L,k){N.forEach(z=>[-7,7].forEach(X=>v("sawtooth",Lf(z),C,k,.028*L,{a:.35,d:k,lp:1300,detune:X,send:.45,sustain:.012*L})))}function P(C,N=1){let L=v("sine",58,C,1.6,.8*N,{send:.6});L.frequency.setValueAtTime(70,C),L.frequency.exponentialRampToValueAtTime(38,C+1.2),S(C,1.1,.35*N,"lowpass",420,.5,.7)}function U(C,N,L=1){let k=e.createBufferSource();k.buffer=a,k.loop=!0;let z=e.createBiquadFilter();z.type="bandpass",z.Q.value=2.2,z.frequency.setValueAtTime(300,C),z.frequency.exponentialRampToValueAtTime(6e3,C+N);let X=e.createGain();X.gain.setValueAtTime(1e-4,C),X.gain.exponentialRampToValueAtTime(.22*L,C+N*.95),X.gain.exponentialRampToValueAtTime(1e-4,C+N+.05),k.connect(z).connect(X),p(X,.4),k.start(C),k.stop(C+N+.1),_(k,X,C+N)}function W(C,N){let L=C*ys,k=u(L),z=(C%16+16)%16,X=Math.floor(C/16),$=(k.soft?a1:r1)[(X%4+4)%4];if(z===0&&k.pad&&I(N,$.slice(0,3),k.pad,s1*(k.end?2.2:1)),k.bass&&z%2===0&&x(N,$[3]+(z%8===6?12:0),k.bass,ys*1.7),k.kick&&(z%4===0||k.build>.5&&z%2===0)&&M(N,k.kick),k.hat&&z%2===1&&A(N,k.hat*(z%4===3?1:.6),z%8===7),k.snare&&(z===4||z===12||k.build>.75&&z>=12)&&T(N,k.snare*(z>12?.7:1)),k.arp){let Tt=(k.soft?[0,-1,-1,-1,1,-1,-1,-1,2,-1,-1,-1,1,-1,-1,-1]:[0,1,2,4,1,2,4,2,0,1,2,4,2,4,5,4])[z];if(Tt>=0){let Y=[...$.slice(0,3),$[0]+12,$[1]+12,$[2]+12];b(N,Y[Tt]+12,k.arp,k.soft)}}t.forEach(({t:ot,big:Tt})=>{ot>=L&&ot<L+ys&&P(N+(ot-L),Tt);let Y=ot-1.3;Tt>=.6&&Y>=L&&Y<L+ys&&U(N+(Y-L),1.3,Tt)})}function F(){let C=e.currentTime;f.forEach(N=>{try{N.g.gain.cancelScheduledValues(C),N.g.gain.setTargetAtTime(1e-4,C,.02),N.src.stop(C+.1)}catch{}}),f.clear()}function R(){n&&n.gain.setTargetAtTime(l?o*.8:0,e.currentTime,.08)}return{get on(){return l},async enable(){e||m(),e.state!=="running"&&await e.resume(),l=!0,c=!1,R()},disable(){l=!1,R(),e&&(F(),c=!1)},setVolume(C){o=C,R()},sync(C,N){if(!e||!l)return;if(!N){c&&(F(),c=!1);return}let L=e.currentTime;for(c&&Math.abs(L-h-C)>.12&&(F(),c=!1),c||(h=L-C+.04,d=Math.ceil(C/ys),c=!0);d*ys<C+.18;)W(d,h+d*ys),d++}}}var we=window.INTRO,ae=we.facts,ye=(s,t=document)=>t.querySelector(s),I0=(s,t=document)=>[...t.querySelectorAll(s)],qi=ye("#stage"),th=ye("#player"),c1=matchMedia("(prefers-reduced-motion: reduce)").matches,jc=s=>s.split("|")[1].replace(/시부$/,""),tr=s=>Math.round(s).toLocaleString("ko-KR"),L0=(s,t=1)=>`${(s/1e4).toFixed(s>=1e6?0:t)}\uB9CC`,D0=s=>{let t=Math.round(s/100);return t>=1e4?`${Math.floor(t/1e4)}\uC870 ${tr(t%1e4)}\uC5B5`:`${tr(t)}\uC5B5`},b0=s=>`${Math.round(s*100)}%`,h1=Object.entries(we.land.v).filter(([,s])=>s).sort((s,t)=>t[1]-s[1]).slice(0,3),w0=we.rice.fc.at(-1),u1=we.power.k,er=we.power.months,A0=s=>er.reduce((t,e,n)=>e.startsWith(s)?t+u1[n]:t,0),N0=String(+er.at(-1).slice(0,4)-(er.at(-1).endsWith("12")?0:1)),f1=A0(N0)/A0(er[0].slice(0,4)),Bf=we.gohyang,TE=Bf.years[0],EE=Bf.years.at(-1),mo=s=>s.map(t=>`<span class="ln">${[...t].map(e=>`<span class="ch${e===" "?" sp":""}">${e===" "?"&nbsp;":e}</span>`).join("")}</span>`).join(""),Kc=s=>`<ul class="pts">${s.map(([t,e])=>`<li><b>${t}</b><span>${e}</span></li>`).join("")}</ul>`,Qs=(s,t,e,n,i,r="",a="")=>`
  <section class="sc ${a}" id="sc-${s}">
    <p class="kicker"><b>${t}</b>${e}</p>
    <h2 class="hl">${mo(n)}</h2>
    ${i?`<p class="it-sub">${i}</p>`:""}
    ${r}
  </section>`,po=s=>`linear-gradient(90deg, ${s.join(", ")})`,Ss=(s,{dec:t=0,suf:e="",from:n}={})=>`<b class="cnt" data-n="${s}" data-dec="${t}" data-suf="${e}"${n!=null?` data-from="${n}"`:""}>${(+s).toFixed(t)}${e}</b>`,ri=we.spots,T0=[...ri.rio.regions].sort((s,t)=>t.lq-s.lq)[0],d1=ri.soil.pg.reduce((s,t)=>s+t,0),p1=(ri.soil.pg[0]+ri.soil.pg[1])/d1*100,CE=[...ri.lv.kinds].sort((s,t)=>t[1]-s[1]),RE=ri.lv.kinds.reduce((s,[,t])=>s+t,0),E0=Object.entries(ri.dev).sort((s,t)=>t[1]-s[1])[0],eh=[{id:"rio",no:"08",name:"\uC9C0\uC5ED\uC0B0\uC5C5\uC5F0\uAD00\uD45C(\uB18D\uC5C5)",href:"rio",big:Ss(Math.round(ri.rio.total/1e6)),unit:"\uC870\uC6D0 \uB18D\uC2DD\uD488 \uC0B0\uCD9C",line:"17\uAC1C \uC2DC\uB3C4\uB9C8\uB2E4 \uB18D\uC2DD\uD488\uC774 \uB9CC\uB4DC\uB294 \uC0DD\uC0B0\xB7\uBD80\uAC00\uAC00\uCE58\xB7\uC77C\uC790\uB9AC \uD30C\uAE09\uD6A8\uACFC",pts:[[`${T0.name} ${T0.lq}`,"\uB18D\uC2DD\uD488 \uD2B9\uD654\uB3C4 1\uC704 \u2014 \uC804\uAD6D \uD3C9\uADE0\uC758 3.6\uBC30"],[`${ae.rio.sectors}\uAC1C \uC0B0\uC5C5`,"\uBB34\uC5C7\uC774 \uB4E4\uC5B4\uAC00\uACE0 \uC5B4\uB514\uC5D0 \uC4F0\uC774\uB294\uC9C0\uAE4C\uC9C0"]]},{id:"employ",no:"09",name:"\uB18D\uC5C5\uACE0\uC6A9",href:"employ",big:Ss(+ae.employ.to-+ae.employ.from+1),unit:"\uB144\uC758 \uB18D\uC5C5 \uC77C\uC790\uB9AC",line:`\uB18D\uB9BC\uC5B4\uC5C5 \uCDE8\uC5C5\uC790 ${Math.round(ae.employ.a0/10)}\uB9CC \uBA85\uC774 ${Math.round(ae.employ.a1/10)}\uB9CC \uBA85\uC774 \uB418\uAE30\uAE4C\uC9C0`,pts:[[`${tr(ae.employ.months)}\uAC1C\uC6D4`,"\uC6D4\uBCC4 \xB7 \uACC4\uC808 \xB7 \uC2DC\uAD70\uBCC4 \xB7 \uC5F0\uB839\xB7\uC885\uC0AC\uC0C1\uC9C0\uC704\xB7\uB178\uB3D9\uC2DC\uAC04"]]},{id:"agfin",no:"10",name:"\uB18D\uC5C5\uAE08\uC735\uBCF4\uD5D8",href:"agfin",big:Ss(ae.agfin.coops),unit:"\uAC1C \uB18D\xB7\uCD95\uD611",line:"\uC870\uD569\uB9C8\uB2E4 \uACF5\uC2DC \uC7AC\uBB34\uB97C \uC9C0\uB3C4 \uC704\uC5D0",pts:[[D0(ae.agfin.paid),`${ae.agfin.year} \uB18D\uC791\uBB3C\uC7AC\uD574\uBCF4\uD5D8 \uBCF4\uD5D8\uAE08 \xB7 \uAC00\uC785 ${L0(ae.agfin.cnt)}\uAC74`],[`${ae.agfin.cats}\uAC1C \uBD84\uC57C`,"\uACFC\uC218\xB7\uC2DD\uB7C9\xB7\uCC44\uC18C\xB7\uC2DC\uC124 \uC7AC\uD574\uBCF4\uD5D8\uC744 \uC2DC\uAD70 \uB2E8\uC704\uB85C"]]},{id:"ruraldev",no:"11",name:"\uB18D\uCD0C\uAC1C\uBC1C",href:"ruraldev",big:Ss(ae.ruraldev.sites),unit:"\uAC1C \uC0AC\uC5C5 \uC9C0\uAD6C",line:"\uB18D\uC5B4\uCD0C\uACF5\uC0AC \uC9C0\uAD6C\uC758 \uC720\uD615\xB7\uC704\uCE58\xB7\uC900\uACF5 \uC608\uC815, \uC608\uC0B0\uD604\uC561\uAE4C\uC9C0",cls:"right",pts:[[`${jc(E0[0])} ${E0[1]}\uACF3`,"\uC9C0\uAD6C\uAC00 \uAC00\uC7A5 \uB9CE\uC740 \uC2DC\uAD70"],[`${ae.ruraldev.cats}\uAC1C \uAC08\uB798`,"\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5 \uC608\uC0B0\uC744 \uB18D\uAC00\uB2F9\uC73C\uB85C"]]},{id:"soil",no:"12",name:"\uB18D\uACBD\uC9C0 \uD1A0\uC591",href:"soil",big:Ss(Math.round(ae.soil.tests/1e4)),unit:"\uB9CC \uAC74 \uD1A0\uC591\uAC80\uC815",line:`\uD759\uC758 \uC591\uBD84 ${ae.soil.chem}\uAC00\uC9C0\uC640 \uB545\uC758 \uC801\uC131\uB4F1\uAE09`,pts:[[`${p1.toFixed(1)}%`,"\uB17C\uC73C\uB85C 1\xB72\uAE09\uC778 \uB545 \u2014 \uAD6D\uD1A0\uC5D0\uC11C \uC88B\uC740 \uB545\uC740 \uC774\uB9CC\uD07C"],[`${ae.soil.obst}\uAC00\uC9C0`,"\uB4F1\uAE09\uC744 \uB0AE\uCD94\uB294 \uC800\uD574\uC694\uC778\uAE4C\uC9C0"]]},{id:"livestock",no:"13",name:"\uCD95\uC0B0 \uD658\uACBD",href:"livestock",big:Ss(ae.livestock.villages),unit:"\uAC1C \uB9C8\uC744",line:`\uC810 \uD558\uB098\uAC00 \uB9C8\uC744 \uD558\uB098 \u2014 ${ae.livestock.from}~${ae.livestock.to} \uAC00\uCD95\uBD84\uB1E8 \uBC1C\uC0DD`,pts:[]}],m1=[["home","\uC8FC\uC694\uD1B5\uACC4"],["rice","\uBCBC \uC791\uD669"],["rio","\uC0B0\uC5C5\uC5F0\uAD00\uD45C"],["flow","\uBB3C\uB958\uB3D9\uD5A5"],["power","\uB18D\uC0AC\uC6A9 \uC804\uAE30"],["employ","\uB18D\uC5C5\uACE0\uC6A9"],["agfin","\uAE08\uC735\uBCF4\uD5D8"],["jikbul","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791"],["ruraldev","\uB18D\uCD0C\uAC1C\uBC1C"],["soil","\uB18D\uACBD\uC9C0 \uD1A0\uC591"],["livestock","\uCD95\uC0B0 \uD658\uACBD"],["home_sat","\uC704\uC131\uC9C0\uB3C4"],["rice_sat","\uC704\uC131 \uC601\uC0C1"],["home_hn","\uC2DC\uAD70 \uD604\uD669\uD310"],["status","\uC790\uB8CC \uC218\uC9D1 \uD604\uD669"]];qi.insertAdjacentHTML("beforeend",`
  <div class="copy">
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${mo(["\uC9C0\uC5ED\uB18D\uC5C5","\uD604\uD669\uD310"])}</h1>
      <p class="it-sub">\uC9C0\uC5ED \uB18D\uC5C5\uC758 \uBAA8\uB4E0 \uC22B\uC790\uB97C, \uC2DC\uAD70 \uB2E8\uC704\uB85C \uD55C \uD654\uBA74\uC5D0</p>
    </section>
    ${Qs("stats","01","\uC8FC\uC694\uD1B5\uACC4",[`${we.map.sigun.length}\uAC1C \uC2DC\uAD70,`,`${ae.metrics}\uAC1C \uC9C0\uD45C`],"\uC804\uAD6D\xB7\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uAC19\uC740 \uB208\uAE08\uC73C\uB85C",Kc([[`${tr(ae.parcels/1e4)}\uB9CC`,"\uD544\uC9C0 \u2014 \uD31C\uB9F5 \uB18D\uACBD\uC9C0\uB97C \uC804\uBD80 \uBC1B\uC544 \uC9C1\uC811 \uBD84\uC11D"],[`${ae.parcelMed}\u33A1`,`\uC804\uAD6D \uB18D\uACBD\uC9C0 \uC911\uC559\uAC12 \xB7 0.1ha \uBBF8\uB9CC\uC774 ${b0(ae.parcelSmall)}`],[b0(ae.paddyArmt),"\uB17C \uACBD\uC9C0\uC815\uB9AC\uC728\uC744 \uC2DC\uAD70\uB9C8\uB2E4 \uACAC\uC900\uB2E4"]]))}
    ${Qs("real","02","\uC2E4\uC81C \uD654\uBA74",["\uACE0\uB974\uBA74, \uADF8 \uC2DC\uAD70\uC758","\uD604\uD669\uD310\uC774 \uB41C\uB2E4"],"\uC2DC\uB3C4\xB7\uC2DC\uAD70\uC744 \uACE0\uB974\uAC70\uB098 \uC9C0\uB3C4\uB97C \uB204\uB974\uBA74<br>\uBAA8\uB4E0 \uCE78\uC774 \uADF8 \uC9C0\uC5ED \uC22B\uC790\uB85C \uBC14\uB01D\uB2C8\uB2E4",Kc([["\uC804\uB144 \uB300\uBE44","\uC99D\uAC10\uC774 \uC704\uCABD \uB760\uB85C \uD750\uB978\uB2E4"],["\uC2DC\uB3C4 \uC548 \uC21C\uC704","\uC9C0\uB3C4 \uC544\uB798\uC5D0\uC11C \uBC14\uB85C \uBE44\uAD50"],["\uC8FC\uC18C \uACF5\uC720","\uBCF4\uB358 \uD654\uBA74\uC744 \uADF8\uB300\uB85C \uBCF4\uB0B8\uB2E4"]]),"narrow")}
    ${Qs("sat","03","\uC704\uC131\uC9C0\uB3C4",["\uD1B5\uACC4 \uB4A4\uC758","\uC2E4\uC81C \uB545\uC744 \uBCF8\uB2E4"],"",Kc([["\uD56D\uACF5\uC601\uC0C1",`\uD31C\uB9F5 \uD544\uC9C0 \xB7 \uC720\uD1B5\uC2DC\uC124 ${tr(ae.facilities)}\uACF3 \xB7 \uC8FC\uC81C\uB3C4`],["\uB17C NDVI","Sentinel-2 10m \u2014 \uB17C\uB9C8\uB2E4 \uBCBC\uAC00 \uC5BC\uB9C8\uB098 \uD478\uB978\uC9C0"],["5\uC77C\uB9C8\uB2E4","\uAD6C\uB984 \uB080 \uB0A0\uC740 \uB808\uC774\uB354\uB85C, 2017\uB144\uBD80\uD130 \uB0A0\uC9DC\uBCC4\uB85C"]]),"narrow")}
    ${Qs("rice","04","\uBCBC \uC791\uD669",["\uC300 \uC218\uD655\uB7C9\uC744","7\uC6D4\uBD80\uD130 \uBBF8\uB9AC"],"\uAE30\uC0C1\xB7\uC704\uC131\xB7\uBCD1\uD574\uCDA9 \uC608\uCC30\uB85C<br>\uC2DC\uAD70\uBCC4 \uB2E8\uC218\uB97C 7\uBC88 \uC608\uCE21",`<div class="big b1">${Ss(w0.y,{dec:1})}<small>kg/10a</small></div>
       <p class="big-cap b1">${we.rice.year} \uC804\uAD6D \uB2E8\uC218 \uC608\uCE21 \xB7 ${w0.lab}</p>
       <div class="big b2">${Ss(ae.riceAcc.m0915,{dec:1,from:ae.riceAcc.norm})}<small>kg \uD3C9\uADE0 \uC624\uCC28</small></div>
       <p class="big-cap b2">9\uC6D4 15\uC77C \uC608\uCE21 \xB7 \uAD6D\uAC00\uB370\uC774\uD130\uCC98 10\uC6D4 \uC608\uC0C1 ${ae.riceAcc.stat}kg\uACFC \uAC19\uC740 \uC218\uC900\uC744 3\uC8FC \uBA3C\uC800</p>`)}
    ${Qs("jik","05","\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",["\uC9C1\uBD88\uAE08, \uC6B0\uB9AC \uC9C0\uC5ED\uC5D0","\uC5BC\uB9C8\uB098 \uC624\uB098"],"\uC9C0\uBC29\uC7AC\uC815365 \uC138\uBD80\uC0AC\uC5C5 \uC608\uC0B0\uD604\uC561\uC744<br>\uC790\uB3D9\uC73C\uB85C \uBAA8\uC544 \uC2DC\uAD70\xB7\uB18D\uAC00\uB2F9\uC73C\uB85C",`<ul class="chips"><li><b>${D0(we.jikbul.pubNat)}</b>\uACF5\uC775\uC9C1\uBD88 ${we.jikbul.year}</li><li><b>${we.jikbul.bizCount}\uAC1C</b>\uC2DC\uAD70 \uC138\uBD80\uC0AC\uC5C5</li><li><b>\uACE0\uD5A5\uC0AC\uB791\uAE30\uAE08</b>${Bf.govs}\uACF3\uB3C4</li></ul>`)}
    ${Qs("flow","06","\uBB3C\uB958\uB3D9\uD5A5",["\uC218\uBC15 \uD30C\uB81B\uD2B8\uAC00","\uC6C0\uC9C1\uC774\uB294 \uAE38"],`\uBB3C\uB958\uAE30\uAE30 \uACF5\uB3D9\uC774\uC6A9 ${ae.od.years}\uB144 \xB7 ${ae.od.crops}\uAC1C \uD488\uBAA9 \uC911<br>${we.flows.year}\uB144 \uC218\uBC15 \uD30C\uB81B\uD2B8 ${tr(we.flows.total)}\uAC1C\uC758 \uC774\uB3D9`,`<ol class="pairs">${we.flows.top.slice(0,3).map(([s,t,e])=>`<li><span class="o">${jc(s)}</span><i></i><span class="d">${jc(t)}</span><b>${tr(e)}\uAC1C</b></li>`).join("")}</ol>`)}
    ${Qs("power","07","\uB18D\uC0AC\uC6A9 \uC804\uAE30",["\uACC4\uC808\uC744 \uB530\uB77C \uB3C4\uB294","\uB18D\uC5C5 \uC804\uB825"],`\uD55C\uC804 ${ae.power.regions}\uAC1C \uC9C0\uC5ED \xB7 ${ae.power.months}\uAC1C\uC6D4`,`<ul class="it-facts">
        <li><b>4\uAC00\uC9C0</b><span>${ae.power.types.join("\xB7")} \uACC4\uC808 \uC720\uD615 \uC790\uB3D9 \uBD84\uB958</span></li>
        <li><b>\uD3C9\uB144 \uBC94\uC704</b><span>\uBC97\uC5B4\uB09C \uC9C0\uC5ED\uC744 \uB2EC\uB9C8\uB2E4 \uC9DA\uB294\uB2E4</span></li>
        <li><b>${f1.toFixed(1)}\uBC30</b><span>${er[0].slice(0,4)}\uB144\uBCF4\uB2E4 \uB298\uC5B4\uB09C ${N0}\uB144 \uC0AC\uC6A9\uB7C9</span></li>
      </ul>`)}
    ${eh.map(s=>`
      <section class="sc spot ${s.cls||""}" id="sc-${s.id}">
        <p class="kicker"><b>${s.no}</b>${s.name}</p>
        <div class="spot-big">${s.big}<small>${s.unit}</small></div>
        <p class="spot-line">${s.line}</p>
        ${s.pts.length?Kc(s.pts):""}
      </section>`).join("")}
  </div>
  <div class="labels">${h1.map(([s,t])=>`<div class="lab" data-k="${s}"><b>${jc(s)}</b><span>${L0(t)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>\uACBD\uC9C0\uBA74\uC801 ${we.land.year}</span><i class="bar" style="background:${po(uo)}"></i><span>\uB192\uC774\xB7\uC0C9\uC774 \uD074\uC218\uB85D \uB113\uB2E4</span></div>
    <div class="it-lg" id="lg-rice"><span>\uD3C9\uB144\uBCF4\uB2E4 \uB0AE\uC74C</span><i class="bar" style="background:${po([Wi.lo,Wi.mid,Wi.hi])}"></i><span>\uB192\uC74C \xB7 ${we.rice.year} \uC2DC\uAD70 \uC608\uCE21</span></div>
    <div class="it-lg" id="lg-jik"><span>\uC801\uC74C</span><i class="bar" style="background:${po(Jr)}"></i><span>\uB9CE\uC74C \xB7 \uB18D\uAC00\uB2F9 \uACF5\uC775\uC9C1\uBD88(\uAE30\uBCF8\uD615) \uC608\uC0B0 ${we.jikbul.year}</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${ti.melonO}"></i><span>\uBCF4\uB0B8 \uC0B0\uC9C0</span><i class="it-dot" style="background:${ti.melonD}"></i><span>\uBC1B\uC740 \uACF3 \xB7 \uC218\uBC15 \uD30C\uB81B\uD2B8 ${we.flows.year}\uB144 ${we.flows.months} \xB7 \uC0C1\uC704 50</span></div>
    <div class="it-lg" id="lg-coop"><i class="it-dot" style="background:#f5a524"></i><span>\uC9C0\uC5ED\uB18D\uD611 ${ri.coopKinds.L}</span><i class="it-dot" style="background:#ff7a59"></i><span>\uCD95\uD611 ${ri.coopKinds.X}</span><i class="it-dot" style="background:#7cc98f"></i><span>\uD488\uBAA9\uB18D\uD611 ${ri.coopKinds.I} \xB7 \uC810 \uD06C\uAE30 = \uC790\uC0B0</span></div>
    <div class="it-lg" id="lg-dev"><span>\uC801\uC74C</span><i class="bar" style="background:${po(Yc)}"></i><span>\uB9CE\uC74C \xB7 \uAE30\uB465 \uB192\uC774 = \uC2DC\uAD70 \uC0AC\uC5C5 \uC9C0\uAD6C \uC218 (\uD55C\uAD6D\uB18D\uC5B4\uCD0C\uACF5\uC0AC)</span></div>
    <div class="it-lg" id="lg-lv"><span>\uB9C8\uC744\uB2F9 \uBD84\uB1E8 \uC801\uC74C</span><i class="bar" style="background:${po(Zc)}"></i><span>\uB9CE\uC74C \xB7 \uAD6D\uB9BD\uD658\uACBD\uACFC\uD559\uC6D0 \uC804\uAD6D\uC624\uC5FC\uC6D0\uC870\uC0AC</span></div>
    <div class="it-lg" id="lg-power"><span>\uC804\uAD6D \uB18D\uC0AC\uC6A9 \uC804\uB825 \uC6D4 \uC0AC\uC6A9\uB7C9 \xB7 ${er[0].replace("-",".")}~${er.at(-1).replace("-",".")}</span></div>
  </div>`);var Ve=_0(qi,we,["home","home_jn","home_hn","home_sat","rice_sat"]);x0(qi,m1);var Ms=we.shots.ndvi||{};qi.insertAdjacentHTML("beforeend",`
  <div class="nd" id="nd">
    <div class="nd-frame">
      <img class="nd-w" src="assets/intro/shots/ndvi_wide.webp" alt="" decoding="async" style="transform-origin:${(Ms.fx??.3)*100}% ${(Ms.fy??.42)*100}%">
      <img class="nd-z" src="assets/intro/shots/ndvi_zoom.webp" alt="" decoding="async" style="transform-origin:40% 63%">
      <img class="nd-c" src="assets/intro/shots/ndvi_close.webp" alt="" decoding="async">
      <span class="nd-ring" style="left:${(Ms.fx??.3)*100}%;top:${(Ms.fy??.42)*100}%"></span>
      <div class="nd-tag"><b>${Ms.where||"\uAE40\uC81C\uC2DC"} \uB17C NDVI</b><span>Sentinel-2 \xB7 ${Ms.date?Ms.date.replace(/-/g,"."):""} \xB7 \uAD6C\uB984 ${Ms.cloud??"\u2013"}%</span></div>
      <div class="nd-lg"><span>\uB0AE\uC74C</span><i></i><span>\uB192\uC74C \xB7 \uBCBC\uAC00 \uD478\uB97C\uC218\uB85D \uCD08\uB85D</span></div>
    </div>
  </div>`);var U0=(s,t,e,n,i)=>(qi.insertAdjacentHTML("beforeend",`<div class="mini" id="mini-${s}" style="left:${e}px;top:${n}px;width:${i}px"><div class="scr-bar"><i></i><i></i><i></i><span class="scr-url">ag-rstat.vercel.app/${t}</span></div><div class="mini-view" style="height:${Math.round(i*9/16)}px"><img src="assets/intro/shots/${t}.webp" alt="" decoding="async"></div></div>`),ye(`#mini-${s}`));U0("rio","rio",150,560,600);U0("employ","employ",1250,96,560);qi.insertAdjacentHTML("beforeend",`
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
  </div>`);var Qe={scene:0,bgI:0,glow:0,morph:0,pAlpha:1,mapAlpha:0,rise:0,tilt:0,orbit:0,camDist:23.5,camX:0,camY:0,mapShift:300,mapLift:0,riceColor:0,jikColor:0,mapDim:0,glAlpha:1,labels:0,riceAlpha:0,riceLine:0,riceFc:0,accAlpha:0,riceAcc:0,bdAlpha:0,bdBars:0,bdSplit:0,flows:0,flowAlpha:0,spiral:0,powerAlpha:0,rioA:0,rioP:0,empA:0,empP:0,coopA:0,coopP:0,devRise:0,devColor:0,soilA:0,soilP:0,lvA:0,lvP:0},jr=f0(ye("#gl"),we),O0=d0(ye("#fx"),we,jr),g1=p0(ye("#rice"),we),_1=m0(ye("#rice"),we),F0=M0(ye("#sp"),ye("#spsvg"),we,jr),_o={draw(){},canvas:ye("#bg"),kind:"\u2026"},x1=I0(".lab",qi),Qc=960,Uf=540;function B0(){let s=th.clientWidth/cn;qi.style.transform=`scale(${s})`;let t=Math.min(window.devicePixelRatio||1,1.75),e=Math.min(2880,Math.max(640,Math.round(cn*s*t))),n=Math.round(e*Xi/cn);jr.resize(e,n),O0.resize(e,n),F0.resize(e,n),Qc=Math.max(480,Math.round(e/2)),Uf=Math.round(Qc*Xi/cn),_o.canvas.width=Qc,_o.canvas.height=Uf}new ResizeObserver(B0).observe(th);var ct={open:0,stats:5,real:12,sat:21,rice:29,jik:40,flow:48,power:54,spot:59,SPOT:5,wall:89.4,maker:94.4,end:102,total:106},Qr=[{t:ct.open,name:"\uC5F4\uAE30"},{t:ct.stats,name:"\uC8FC\uC694\uD1B5\uACC4",href:"./"},{t:ct.real,name:"\uC2E4\uC81C \uD654\uBA74",href:"./"},{t:ct.sat,name:"\uC704\uC131\uC9C0\uB3C4",href:"./"},{t:ct.rice,name:"\uBCBC \uC791\uD669",href:"rice"},{t:ct.jik,name:"\uC9C1\uBD88\uAE08\xB7\uACE0\uD5A5\uC0AC\uB791",href:"jikbul"},{t:ct.flow,name:"\uBB3C\uB958\uB3D9\uD5A5",href:"flow"},{t:ct.power,name:"\uB18D\uC0AC\uC6A9 \uC804\uAE30",href:"power"},...eh.map((s,t)=>({t:ct.spot+t*ct.SPOT,name:s.name,href:s.href})),{t:ct.wall,name:"\uC790\uB8CC \uC218\uC9D1 \uD604\uD669",href:"status"},{t:ct.maker,name:"\uB9CC\uB4E0\uC774",href:"about"},{t:ct.end,name:"\uB2EB\uAE30"}],nr=ct.total,Ft=ui.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),qt=(s,t,e,n="power2.inOut")=>Ft.to(Qe,{...s,duration:e,ease:n},t),ai=(s,t,e=1.2)=>qt({scene:s},t,e);function bi(s,t){let e=typeof s=="string"?ye(s):s;Ft.set(e,{autoAlpha:1,y:0},t).fromTo(e.querySelector(".kicker"),{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.6,ease:"power3.out"},t);let n=e.querySelectorAll(".hl .ch");n.length&&Ft.fromTo(n,{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.85,stagger:Math.min(.028,.5/n.length),ease:"expo.out"},t+.1);let i=e.querySelector(".it-sub");i&&Ft.fromTo(i,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.7,ease:"power2.out"},t+.5)}var wi=(s,t)=>Ft.to(typeof s=="string"?ye(s):s,{autoAlpha:0,y:-24,duration:.45,ease:"power2.in"},t),ir=(s,t,e=.16)=>{let n=I0(`${s} .pts li, ${s} .it-facts li, ${s} .pairs li, ${s} .chips li`);n.length&&Ft.fromTo(n,{autoAlpha:0,x:-16},{autoAlpha:1,x:0,stagger:e,duration:.55,ease:"power2.out"},t)},k0=[];function kf(s,t,e){let n=+s.dataset.n,i=+(s.dataset.dec||0),r=s.dataset.suf||"",a=s.dataset.from!=null?+s.dataset.from:i?n*.94:0,o={v:a,last:""};k0.push({elm:s,o,dec:i,suf:r}),Ft.fromTo(o,{v:a},{v:n,duration:e,ease:"power3.out"},t)}var bs=(s,t,e)=>Ft.fromTo(`#lg-${s}`,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},t).to(`#lg-${s}`,{autoAlpha:0,duration:.4},e),z0=Ve.zoom,zf=(s,t,e=.4)=>{Object.entries(Ve.imgs).forEach(([n,i])=>Ft.to(i,{autoAlpha:n===s?1:0,duration:e,ease:"power1.inOut"},t))},v1=(s,t,e,n="sine.inOut",i)=>Ft.to(z0,{...Ve.focus(s,i),duration:e,ease:n},t);function Vf(s,t,e=.8){let n=Ve.at(s);Ft.to(Ve.cursor,{x:n.x,y:n.y,duration:e,ease:"power3.inOut"},t-e).fromTo(Ve.cursor.querySelector(".ripple"),{scale:.2,autoAlpha:.9},{scale:2.6,autoAlpha:0,duration:.55,ease:"power2.out"},t).fromTo(Ve.cursor.querySelector("svg"),{scale:1},{scale:.82,duration:.08,yoyo:!0,repeat:1,ease:"power1.inOut"},t)}ui.set(".sc, .it-lg, .outro, .maker, .wall-copy, #scr-wrap, #wall-wrap, .mk, #nd, .nd-z, .nd-c, .mini",{autoAlpha:0});ui.set(z0,{scale:1,x:0,y:0,transformOrigin:"0 0"});ui.set(Ve.cursor,{x:1100,y:645,autoAlpha:0});ui.set(Ve.cursor.querySelector(".ripple"),{autoAlpha:0});ui.set(Object.values(Ve.imgs),{autoAlpha:0});qt({bgI:1},0,1.6,"power1.out");qt({morph:1},.15,3.6,"none");qt({glow:.5},1.2,2.2);bi("#sc-open",.45);Ft.fromTo("#sc-open .mark",{scale:.4,rotate:-90},{scale:1,rotate:0,duration:1.2,ease:"back.out(2)"},.45);wi("#sc-open",4.4);qt({mapAlpha:1},3.3,1.2);qt({pAlpha:.32},3.8,1);ai(1,4.6,1.4);qt({tilt:1},5,2.3);qt({rise:1},5.5,2.5,"power2.out");qt({orbit:.36,camDist:21.2},5,6.8,"sine.inOut");qt({pAlpha:0},6.2,1.2);bi("#sc-stats",5.1);ir("#sc-stats",6.4,.22);bs("stats",6,11.2);qt({labels:1},8,.6,"power2.out");qt({labels:0},11,.4);wi("#sc-stats",11.3);ai(2,11.6);qt({glAlpha:0},11.5,.8);var On=ct.real;Ft.set(Ve.imgs.home,{autoAlpha:1},On).fromTo("#scr-wrap",{autoAlpha:0,rotateY:-30,rotateX:10,x:220,z:-320},{autoAlpha:1,rotateY:-8,rotateX:3,x:0,z:0,duration:1.4,ease:"expo.out"},On);bi("#sc-real",On+.3);ir("#sc-real",On+1.6,.2);Ft.set(Ve.cursor,{autoAlpha:1},On+1.2);Vf(Ve.box("home","#sido"),On+2.6,1.2);zf("home_jn",On+2.75);Vf(Ve.box("home_jn","#sgg"),On+4.2,.9);zf("home_hn",On+4.35);Ft.to(Ve.cursor,{autoAlpha:0,duration:.3},On+5);[[".ticker","\uC804\uB144 \uB300\uBE44 \uC99D\uAC10\uC774 \uD750\uB978\uB2E4","bottom"],["#map-card","\uC9C0\uB3C4\uB97C \uB204\uB974\uBA74 \uADF8 \uC2DC\uAD70\uC73C\uB85C","top"],[".col-right","\uC791\uBB3C\xB7\uC18C\uB4DD\xB7\uC608\uC0B0\xB7\uB18D\uAC00\uACBD\uC81C","top"]].forEach(([s,t,e],n)=>{let i=Ve.mark(`r${n}`,Ve.box("home",s),t,e);i&&Ft.fromTo(i,{autoAlpha:0,scale:1.04},{autoAlpha:1,scale:1,duration:.45,ease:"power2.out"},On+5.2+n*.55).to(i,{autoAlpha:0,duration:.3},On+8.3)});Ft.to("#scr-wrap",{rotateY:-4,rotateX:1.5,duration:7,ease:"sine.inOut"},On+1.4);ai(3,ct.sat-.4);wi("#sc-real",ct.sat-.3);Ft.set(Ve.cursor,{autoAlpha:1},ct.sat-1);Vf(Ve.box("home_hn","#view-btn"),ct.sat+.1,.9);zf("home_sat",ct.sat+.25,.5);Ft.to(Ve.cursor,{autoAlpha:0,duration:.3},ct.sat+.7);bi("#sc-sat",ct.sat+.3);ir("#sc-sat",ct.sat+1.4,.5);v1([300,120,960,600],ct.sat+.8,3.4,"sine.inOut",1);Ft.to("#scr-wrap",{autoAlpha:0,scale:.92,rotateY:-16,x:-80,duration:.7,ease:"power2.in"},ct.sat+2.6);Ft.set("#nd",{autoAlpha:1},ct.sat+2.8).fromTo("#nd .nd-frame",{autoAlpha:0,scale:.9,rotateY:14},{autoAlpha:1,scale:1,rotateY:0,duration:1,ease:"expo.out"},ct.sat+2.8).fromTo("#nd .nd-w",{scale:1,autoAlpha:1},{scale:2.1,duration:1.8,ease:"power2.in"},ct.sat+3.6).fromTo("#nd .nd-ring",{autoAlpha:0,scale:2},{autoAlpha:1,scale:1,duration:.5,ease:"power2.out"},ct.sat+3.2).to("#nd .nd-ring",{autoAlpha:0,scale:.4,duration:.4},ct.sat+4.4).fromTo("#nd .nd-z",{autoAlpha:0,scale:1.06},{autoAlpha:1,scale:1,duration:.5,ease:"power1.out"},ct.sat+5.1).to("#nd .nd-z",{scale:2.07,duration:1.3,ease:"power2.in"},ct.sat+5.8).fromTo("#nd .nd-c",{autoAlpha:0,scale:1.04},{autoAlpha:1,scale:1.12,duration:1.4,ease:"sine.out"},ct.sat+6.9).fromTo("#nd .nd-tag, #nd .nd-lg",{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,stagger:.1},ct.sat+3.4).to("#nd",{autoAlpha:0,duration:.5,ease:"power2.in"},ct.rice-.55);wi("#sc-sat",ct.rice-.6);ai(4,ct.rice-.4);Ft.set(Qe,{riceColor:1,jikColor:0,mapDim:0,rise:0,tilt:.24,orbit:0,camDist:23,camX:0,camY:0,labels:0,pAlpha:0},ct.rice-.3);qt({glAlpha:1},ct.rice-.25,.9);bi("#sc-rice",ct.rice+.2);Ft.set("#sc-rice .b2",{autoAlpha:0},ct.rice);qt({riceAlpha:1},ct.rice+.4,.6,"power1.out");qt({riceLine:1},ct.rice+.6,1.9,"power1.inOut");qt({riceFc:1},ct.rice+2.3,1.9,"power1.out");Ft.fromTo("#sc-rice .b1",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.1,duration:.6,ease:"power2.out"},ct.rice+2.2);kf(ye("#sc-rice .b1 .cnt"),ct.rice+2.2,2);bs("rice",ct.rice+.8,ct.jik-.4);qt({riceAlpha:0},ct.rice+5.4,.5);Ft.to("#sc-rice .b1",{autoAlpha:0,y:-10,duration:.4},ct.rice+5.4);qt({accAlpha:1},ct.rice+5.7,.4,"none");qt({riceAcc:1},ct.rice+5.8,2.6,"power1.out");Ft.fromTo("#sc-rice .b2",{autoAlpha:0,y:14},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},ct.rice+5.9);kf(ye("#sc-rice .b2 .cnt"),ct.rice+5.9,2.4);qt({accAlpha:0},ct.jik-.5,.4);wi("#sc-rice",ct.jik-.5);ai(5,ct.jik-.3);qt({riceColor:0,jikColor:1},ct.jik-.2,1.2);qt({orbit:.14,tilt:.42,camDist:22},ct.jik-.2,7.6,"sine.inOut");bi("#sc-jik",ct.jik+.2);bs("jik",ct.jik+.6,ct.flow-.4);qt({bdAlpha:1},ct.jik+.8,.4,"none");qt({bdBars:1},ct.jik+.9,1.8,"power1.out");qt({bdSplit:1},ct.jik+2.5,2.2,"power1.out");ir("#sc-jik",ct.jik+1,.18);qt({bdAlpha:0},ct.flow-.5,.4);wi("#sc-jik",ct.flow-.5);ai(6,ct.flow-.3);qt({jikColor:0,mapDim:1,tilt:0,orbit:0,camDist:15.2,camX:.5,camY:1.5},ct.flow-.3,1.3);qt({flowAlpha:1},ct.flow+.4,.3,"none");qt({flows:1},ct.flow+.4,2.7,"power1.out");bi("#sc-flow",ct.flow+.3);ir("#sc-flow",ct.flow+1.6,.14);bs("flow",ct.flow+.8,ct.power-.6);qt({flowAlpha:0},ct.power-.5,.6);wi("#sc-flow",ct.power-.5);qt({glAlpha:0},ct.power-.4,.8);ai(7,ct.power-.4);qt({powerAlpha:1},ct.power-.1,.5,"power1.out");qt({spiral:1},ct.power,3.3,"power1.inOut");qt({glow:.32},ct.power-.4,1);bi("#sc-power",ct.power+.1);ir("#sc-power",ct.power+1.3,.2);bs("power",ct.power+.4,ct.spot-.6);qt({powerAlpha:0},ct.spot-.5,.5);wi("#sc-power",ct.spot-.5);var ge=s=>ct.spot+s*ct.SPOT;function y1(s){let t=eh[s],e=ge(s),n=ye(`#sc-${t.id}`);ai(8+s,e-.4,1),bi(n,e),Ft.fromTo(n.querySelectorAll(".spot-big, .spot-line"),{autoAlpha:0,y:16},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power3.out"},e+.15),kf(n.querySelector(".cnt"),e+.15,1.6),ir(`#sc-${t.id}`,e+1.3,.3),wi(n,e+ct.SPOT-.45)}eh.forEach((s,t)=>y1(t));qt({rioA:1},ge(0)-.2,.5,"power1.out");qt({rioP:1},ge(0)+.1,2.6,"power2.out");qt({rioA:0},ge(1)-.5,.45);var V0=(s,t,e,n)=>Ft.fromTo(`#mini-${s}`,{autoAlpha:0,...n},{autoAlpha:1,x:0,y:0,rotateY:0,duration:.9,ease:"expo.out"},t).fromTo(`#mini-${s} img`,{scale:1},{scale:1.14,duration:e-t,ease:"sine.inOut"},t).to(`#mini-${s}`,{autoAlpha:0,duration:.4},e-.45);V0("rio",ge(0)+.9,ge(1),{y:40});V0("employ",ge(1)+.5,ge(2),{x:60});qt({empA:1},ge(1)-.1,.4,"none");qt({empP:1},ge(1)+.3,3.2,"power1.inOut");qt({empA:0},ge(2)-.5,.45);Ft.set(Qe,{mapDim:1,riceColor:0,jikColor:0,devColor:0,rise:0,devRise:0,tilt:0,orbit:0,camDist:23,camX:0,camY:0,mapShift:300,labels:0},ge(2)-.6);qt({glAlpha:1},ge(2)-.5,.7);qt({coopA:1},ge(2)-.1,.3,"none");qt({coopP:1},ge(2)+.2,2.8,"power1.inOut");bs("coop",ge(2)+.5,ge(3)-.4);qt({coopA:0},ge(3)-.5,.45);qt({mapDim:0,devColor:1,mapShift:-330,tilt:.95,orbit:-.42,camDist:20.5},ge(3)-.5,1.5);qt({devRise:1},ge(3)+.4,2.4,"power2.out");qt({orbit:-.12},ge(3)+1,3.6,"sine.inOut");bs("dev",ge(3)+.6,ge(4)-.4);qt({glAlpha:0},ge(4)-.5,.6);qt({soilA:1},ge(4)-.1,.4,"none");qt({soilP:1},ge(4)+.2,2.8,"power1.out");qt({soilA:0},ge(5)-.5,.45);Ft.set(Qe,{tilt:0,orbit:0,camDist:22,mapShift:260,devRise:0,devColor:0,mapDim:.9},ge(5)-.5);qt({lvA:1},ge(5)-.1,.3,"none");qt({lvP:1},ge(5)+.2,3,"power1.inOut");bs("lv",ge(5)+.6,ct.wall-.4);qt({lvA:0},ct.wall-.5,.45);ai(14,ct.wall-.4);Ft.set("#wall-wrap",{autoAlpha:1},ct.wall).fromTo("#wall .wt",{autoAlpha:0,z:-600,rotateX:-40},{autoAlpha:1,z:0,rotateX:0,duration:1.1,stagger:{each:.05,from:"center"},ease:"power3.out"},ct.wall).fromTo("#wall",{rotateZ:-7,rotateX:26,y:40},{rotateZ:-3,rotateX:18,y:0,duration:5,ease:"sine.inOut"},ct.wall).to("#wall-wrap",{autoAlpha:0,duration:.5},ct.maker-.5);bi("#sc-wall",ct.wall+.6);wi("#sc-wall",ct.maker-.5);ai(15,ct.maker-.4);Ft.set("#sc-maker",{autoAlpha:1,y:0},ct.maker).fromTo("#sc-maker .mk-photo",{autoAlpha:0,y:40,scale:.94},{autoAlpha:1,y:0,scale:1,duration:1.2,ease:"power3.out"},ct.maker+.1).fromTo("#sc-maker .kicker",{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.5},ct.maker+.4).fromTo("#sc-maker .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.04,ease:"expo.out"},ct.maker+.5).fromTo("#sc-maker .mk-phil li",{autoAlpha:0,x:-18},{autoAlpha:1,x:0,duration:.6,stagger:.55,ease:"power2.out"},ct.maker+1.4).fromTo("#sc-maker .mk-quote, #sc-maker .mk-mail",{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.7,stagger:.4,ease:"power2.out"},ct.maker+4).to("#sc-maker",{autoAlpha:0,y:-20,duration:.5,ease:"power2.in"},ct.end-.5);ai(16,ct.end-.3);qt({glow:.55},ct.end-.3,1.2);Ft.set("#sc-end",{autoAlpha:1},ct.end).fromTo("#sc-end .mark",{scale:.3,rotate:-120,autoAlpha:0},{scale:1,rotate:0,autoAlpha:1,duration:1.1,ease:"back.out(1.8)"},ct.end).fromTo("#sc-end .hl .ch",{yPercent:118,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.8,stagger:.035,ease:"expo.out"},ct.end+.15).fromTo("#sc-end .url, #sc-end .srcs, #sc-end .btns",{autoAlpha:0,y:12},{autoAlpha:1,y:0,stagger:.12,duration:.6,ease:"power2.out"},ct.end+.6).set({},{},nr);var Kr=Tf.map(([s,t])=>[xs(s).map(e=>e/255),xs(t).map(e=>e/255)]),ii=new Float32Array(16),M1=performance.now();function S1(){let s=Ft.time(),t=(performance.now()-M1)/1e3,e=Math.min(Tf.length-2,Math.floor(Qe.scene)),n=Qe.scene-e;for(let i=0;i<3;i++)ii[4+i]=Kr[e][0][i]+(Kr[e+1][0][i]-Kr[e][0][i])*n,ii[8+i]=Kr[e][1][i]+(Kr[e+1][1][i]-Kr[e][1][i])*n;ii[0]=t,ii[1]=Qe.bgI,ii[2]=Qc,ii[3]=Uf,ii[12]=(cn/2+Qe.mapShift)/cn,ii[13]=.5,ii[14]=.42,ii[15]=Qe.glow,_o.draw(ii),jr.render(Qe,t),O0.render(Qe,s),g1.render(Qe),_1.render(Qe),F0.render(Qe,s),x1.forEach((i,r)=>{let a=jr.top(i.dataset.k);if(!a||Qe.labels<=.01){i.style.opacity=0;return}let[o,l]=jr.project(a[0],a[1],a[2]),c=Math.min(1,Math.max(0,Qe.labels*1.4-r*.2));i.style.opacity=c,i.style.transform=`translate(${o.toFixed(1)}px, ${(l-12*(1-c)).toFixed(1)}px)`}),k0.forEach(i=>{let r=i.o.v.toFixed(i.dec).replace(/\B(?=(\d{3})+(?!\d))/g,",")+i.suf;r!==i.o.last&&(i.o.last=r,i.elm.textContent=r)}),T1()}var Of=ye("#play"),Si=ye("#track"),b1=ye("#fill"),w1=ye("#time"),Df=ye("#go"),G0=ye("#chaps"),A1=ye("#chapname");Si.setAttribute("aria-valuemax",nr);G0.innerHTML=Qr.map(s=>`<button type="button" data-t="${s.t}" style="left:${s.t/nr*100}%" title="${s.name}" aria-label="${s.name}\uBD80\uD130 \uBCF4\uAE30"></button>`).join("");var H0=[...G0.children],C0=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`,R0=-1,P0="";function T1(){let s=Ft.time();b1.style.transform=`scaleX(${s/nr})`,w1.textContent=`${C0(s)} / ${C0(nr)}`,Si.setAttribute("aria-valuenow",s.toFixed(1));let t=Qr.reduce((n,i,r)=>s>=i.t-.01?r:n,0);if(t!==R0){R0=t,H0.forEach((i,r)=>{i.classList.toggle("on",r===t),i.classList.toggle("past",r<t)});let n=Qr[t];A1.textContent=`${String(t).padStart(2,"0")} ${n.name}`,Df.hidden=!n.href,n.href&&(Df.href=n.href,Df.textContent=`${n.name} \uD654\uBA74 \uC5F4\uAE30 \u2192`)}let e=Ft.progress()>=1?"end":Ft.paused()?"paused":"playing";e!==P0&&(P0=e,Of.dataset.state=e,Of.setAttribute("aria-label",e==="playing"?"\uBA48\uCDA4":e==="end"?"\uB2E4\uC2DC \uBCF4\uAE30":"\uC7AC\uC0DD"),th.classList.toggle("is-paused",e==="paused"))}function W0(){Ft.progress()>=1?Ft.restart():Ft.paused(!Ft.paused())}Of.addEventListener("click",W0);ye("#again").addEventListener("click",()=>Ft.restart());ye("#bigplay").addEventListener("click",()=>Ft.progress()>=1?Ft.restart():Ft.play());H0.forEach(s=>s.addEventListener("click",t=>{t.stopPropagation(),Ft.seek(+s.dataset.t+.001,!1),Ft.progress()<1&&Ft.play()}));var X0=!1,q0=s=>{let t=Si.getBoundingClientRect();Ft.seek(Math.min(1,Math.max(0,(s.clientX-t.left)/t.width))*nr,!1)};Si.addEventListener("pointerdown",s=>{s.target.closest("button")||(X0=!Ft.paused()&&Ft.progress()<1,Ft.pause(),Si.setPointerCapture(s.pointerId),q0(s))});Si.addEventListener("pointermove",s=>{Si.hasPointerCapture(s.pointerId)&&q0(s)});Si.addEventListener("pointerup",s=>{Si.releasePointerCapture(s.pointerId),X0&&Ft.play()});Si.addEventListener("keydown",s=>{let t={ArrowLeft:-5,ArrowRight:5}[s.key];t&&(s.preventDefault(),s.stopPropagation(),Ft.seek(Math.min(nr,Math.max(0,Ft.time()+t)),!1))});document.addEventListener("keydown",s=>{if(!s.target.closest("input, textarea, select, .it-track")){if(s.key===" "||s.key==="k"){if(s.target.closest("a, button")&&s.key===" ")return;s.preventDefault(),W0()}else if(s.key==="Home")Ft.seek(0,!1);else if(s.key==="ArrowRight"){let t=Qr.find(e=>e.t>Ft.time()+.05);t&&Ft.seek(t.t+.001,!1)}else if(s.key==="ArrowLeft"){let t=[...Qr].reverse().find(e=>e.t<Ft.time()-.6);Ft.seek((t?t.t:0)+.001,!1)}}});var Nf=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&!Ft.paused()?(Ft.pause(),Nf=!0):!document.hidden&&Nf&&(Nf=!1,Ft.play())});var si=S0({T:ct,hits:Qr.slice(1).map((s,t)=>({t:s.t,big:s.t>=ct.spot&&s.t<ct.wall?.55:s.t>=ct.maker&&s.t<ct.end?.4:1}))}),go=ye("#snd"),Ff=ye("#vol"),$0=ye("#sndhint"),Y0={get:s=>{try{return localStorage.getItem(s)}catch{return null}},set:(s,t)=>{try{localStorage.setItem(s,t)}catch{}}},Z0=+(Y0.get("intro-vol")??70);Ff.value=Z0;si.setVolume(Z0/100);function J0(){go.setAttribute("aria-pressed",si.on),go.setAttribute("aria-label",si.on?"\uC18C\uB9AC \uB044\uAE30":"\uC18C\uB9AC \uCF1C\uAE30"),go.dataset.on=si.on?"1":"0",si.on&&($0.hidden=!0)}async function Gf(){await si.enable(),J0()}go.addEventListener("click",async()=>{si.on?si.disable():await Gf(),J0()});$0.addEventListener("click",Gf);Ff.addEventListener("input",async()=>{let s=+Ff.value;si.setVolume(s/100),Y0.set("intro-vol",s),s>0&&!si.on&&await Gf()});document.addEventListener("keydown",s=>{s.key==="m"&&!s.target.closest("input, textarea, select")&&go.click()});ui.ticker.add(()=>si.sync(Ft.time(),!Ft.paused()&&Ft.progress()<1));window.__intro={tl:Ft,S:Qe};(async()=>{_o=await rp(ye("#bg"),{gpu:!/[?&]gl\b/.test(location.search)}),qi.dataset.gpu=_o.kind,B0();try{await Promise.race([document.fonts.ready,new Promise(s=>setTimeout(s,1500))])}catch{}ui.ticker.add(S1),th.classList.add("ready"),c1?(Ft.seek(9.5,!1),Ft.pause()):Ft.play(0)})();})();
