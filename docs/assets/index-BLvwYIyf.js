(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))u(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const g of f.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&u(g)}).observe(document,{childList:!0,subtree:!0});function o(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function u(d){if(d.ep)return;d.ep=!0;const f=o(d);fetch(d.href,f)}})();function Dv(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var mu={exports:{}},ci={};var Zh;function jv(){if(Zh)return ci;Zh=1;var l=Symbol.for("react.transitional.element"),i=Symbol.for("react.fragment");function o(u,d,f){var g=null;if(f!==void 0&&(g=""+f),d.key!==void 0&&(g=""+d.key),"key"in d){f={};for(var C in d)C!=="key"&&(f[C]=d[C])}else f=d;return d=f.ref,{$$typeof:l,type:u,key:g,ref:d!==void 0?d:null,props:f}}return ci.Fragment=i,ci.jsx=o,ci.jsxs=o,ci}var Ih;function Rv(){return Ih||(Ih=1,mu.exports=jv()),mu.exports}var m=Rv(),pu={exports:{}},bt={};var Jh;function zv(){if(Jh)return bt;Jh=1;var l=Symbol.for("react.transitional.element"),i=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),g=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),A=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),E=Symbol.iterator;function q(y){return y===null||typeof y!="object"?null:(y=E&&y[E]||y["@@iterator"],typeof y=="function"?y:null)}var Q={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Y=Object.assign,nt={};function ft(y,x,T){this.props=y,this.context=x,this.refs=nt,this.updater=T||Q}ft.prototype.isReactComponent={},ft.prototype.setState=function(y,x){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,x,"setState")},ft.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};function it(){}it.prototype=ft.prototype;function pt(y,x,T){this.props=y,this.context=x,this.refs=nt,this.updater=T||Q}var Ot=pt.prototype=new it;Ot.constructor=pt,Y(Ot,ft.prototype),Ot.isPureReactComponent=!0;var $t=Array.isArray;function Nt(){}var V={H:null,A:null,T:null,S:null},_=Object.prototype.hasOwnProperty;function w(y,x,T){var R=T.ref;return{$$typeof:l,type:y,key:x,ref:R!==void 0?R:null,props:T}}function G(y,x){return w(y.type,x,y.props)}function Z(y){return typeof y=="object"&&y!==null&&y.$$typeof===l}function I(y){var x={"=":"=0",":":"=2"};return"$"+y.replace(/[=:]/g,function(T){return x[T]})}var ut=/\/+/g;function gt(y,x){return typeof y=="object"&&y!==null&&y.key!=null?I(""+y.key):x.toString(36)}function Pt(y){switch(y.status){case"fulfilled":return y.value;case"rejected":throw y.reason;default:switch(typeof y.status=="string"?y.then(Nt,Nt):(y.status="pending",y.then(function(x){y.status==="pending"&&(y.status="fulfilled",y.value=x)},function(x){y.status==="pending"&&(y.status="rejected",y.reason=x)})),y.status){case"fulfilled":return y.value;case"rejected":throw y.reason}}throw y}function O(y,x,T,R,F){var X=typeof y;(X==="undefined"||X==="boolean")&&(y=null);var at=!1;if(y===null)at=!0;else switch(X){case"bigint":case"string":case"number":at=!0;break;case"object":switch(y.$$typeof){case l:case i:at=!0;break;case b:return at=y._init,O(at(y._payload),x,T,R,F)}}if(at)return F=F(y),at=R===""?"."+gt(y,0):R,$t(F)?(T="",at!=null&&(T=at.replace(ut,"$&/")+"/"),O(F,x,T,"",function(yt){return yt})):F!=null&&(Z(F)&&(F=G(F,T+(F.key==null||y&&y.key===F.key?"":(""+F.key).replace(ut,"$&/")+"/")+at)),x.push(F)),1;at=0;var $=R===""?".":R+":";if($t(y))for(var et=0;et<y.length;et++)R=y[et],X=$+gt(R,et),at+=O(R,x,T,X,F);else if(et=q(y),typeof et=="function")for(y=et.call(y),et=0;!(R=y.next()).done;)R=R.value,X=$+gt(R,et++),at+=O(R,x,T,X,F);else if(X==="object"){if(typeof y.then=="function")return O(Pt(y),x,T,R,F);throw x=String(y),Error("Objects are not valid as a React child (found: "+(x==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":x)+"). If you meant to render a collection of children, use an array instead.")}return at}function L(y,x,T){if(y==null)return y;var R=[],F=0;return O(y,R,"","",function(X){return x.call(T,X,F++)}),R}function K(y){if(y._status===-1){var x=y._result;x=x(),x.then(function(T){(y._status===0||y._status===-1)&&(y._status=1,y._result=T)},function(T){(y._status===0||y._status===-1)&&(y._status=2,y._result=T)}),y._status===-1&&(y._status=0,y._result=x)}if(y._status===1)return y._result.default;throw y._result}var J=typeof reportError=="function"?reportError:function(y){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var x=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof y=="object"&&y!==null&&typeof y.message=="string"?String(y.message):String(y),error:y});if(!window.dispatchEvent(x))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",y);return}console.error(y)},dt={map:L,forEach:function(y,x,T){L(y,function(){x.apply(this,arguments)},T)},count:function(y){var x=0;return L(y,function(){x++}),x},toArray:function(y){return L(y,function(x){return x})||[]},only:function(y){if(!Z(y))throw Error("React.Children.only expected to receive a single React element child.");return y}};return bt.Activity=v,bt.Children=dt,bt.Component=ft,bt.Fragment=o,bt.Profiler=d,bt.PureComponent=pt,bt.StrictMode=u,bt.Suspense=A,bt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=V,bt.__COMPILER_RUNTIME={__proto__:null,c:function(y){return V.H.useMemoCache(y)}},bt.cache=function(y){return function(){return y.apply(null,arguments)}},bt.cacheSignal=function(){return null},bt.cloneElement=function(y,x,T){if(y==null)throw Error("The argument must be a React element, but you passed "+y+".");var R=Y({},y.props),F=y.key;if(x!=null)for(X in x.key!==void 0&&(F=""+x.key),x)!_.call(x,X)||X==="key"||X==="__self"||X==="__source"||X==="ref"&&x.ref===void 0||(R[X]=x[X]);var X=arguments.length-2;if(X===1)R.children=T;else if(1<X){for(var at=Array(X),$=0;$<X;$++)at[$]=arguments[$+2];R.children=at}return w(y.type,F,R)},bt.createContext=function(y){return y={$$typeof:g,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null},y.Provider=y,y.Consumer={$$typeof:f,_context:y},y},bt.createElement=function(y,x,T){var R,F={},X=null;if(x!=null)for(R in x.key!==void 0&&(X=""+x.key),x)_.call(x,R)&&R!=="key"&&R!=="__self"&&R!=="__source"&&(F[R]=x[R]);var at=arguments.length-2;if(at===1)F.children=T;else if(1<at){for(var $=Array(at),et=0;et<at;et++)$[et]=arguments[et+2];F.children=$}if(y&&y.defaultProps)for(R in at=y.defaultProps,at)F[R]===void 0&&(F[R]=at[R]);return w(y,X,F)},bt.createRef=function(){return{current:null}},bt.forwardRef=function(y){return{$$typeof:C,render:y}},bt.isValidElement=Z,bt.lazy=function(y){return{$$typeof:b,_payload:{_status:-1,_result:y},_init:K}},bt.memo=function(y,x){return{$$typeof:p,type:y,compare:x===void 0?null:x}},bt.startTransition=function(y){var x=V.T,T={};V.T=T;try{var R=y(),F=V.S;F!==null&&F(T,R),typeof R=="object"&&R!==null&&typeof R.then=="function"&&R.then(Nt,J)}catch(X){J(X)}finally{x!==null&&T.types!==null&&(x.types=T.types),V.T=x}},bt.unstable_useCacheRefresh=function(){return V.H.useCacheRefresh()},bt.use=function(y){return V.H.use(y)},bt.useActionState=function(y,x,T){return V.H.useActionState(y,x,T)},bt.useCallback=function(y,x){return V.H.useCallback(y,x)},bt.useContext=function(y){return V.H.useContext(y)},bt.useDebugValue=function(){},bt.useDeferredValue=function(y,x){return V.H.useDeferredValue(y,x)},bt.useEffect=function(y,x){return V.H.useEffect(y,x)},bt.useEffectEvent=function(y){return V.H.useEffectEvent(y)},bt.useId=function(){return V.H.useId()},bt.useImperativeHandle=function(y,x,T){return V.H.useImperativeHandle(y,x,T)},bt.useInsertionEffect=function(y,x){return V.H.useInsertionEffect(y,x)},bt.useLayoutEffect=function(y,x){return V.H.useLayoutEffect(y,x)},bt.useMemo=function(y,x){return V.H.useMemo(y,x)},bt.useOptimistic=function(y,x){return V.H.useOptimistic(y,x)},bt.useReducer=function(y,x,T){return V.H.useReducer(y,x,T)},bt.useRef=function(y){return V.H.useRef(y)},bt.useState=function(y){return V.H.useState(y)},bt.useSyncExternalStore=function(y,x,T){return V.H.useSyncExternalStore(y,x,T)},bt.useTransition=function(){return V.H.useTransition()},bt.version="19.2.4",bt}var $h;function Qu(){return $h||($h=1,pu.exports=zv()),pu.exports}var zt=Qu(),gu={exports:{}},di={},vu={exports:{}},yu={};var Wh;function Ov(){return Wh||(Wh=1,(function(l){function i(O,L){var K=O.length;O.push(L);t:for(;0<K;){var J=K-1>>>1,dt=O[J];if(0<d(dt,L))O[J]=L,O[K]=dt,K=J;else break t}}function o(O){return O.length===0?null:O[0]}function u(O){if(O.length===0)return null;var L=O[0],K=O.pop();if(K!==L){O[0]=K;t:for(var J=0,dt=O.length,y=dt>>>1;J<y;){var x=2*(J+1)-1,T=O[x],R=x+1,F=O[R];if(0>d(T,K))R<dt&&0>d(F,T)?(O[J]=F,O[R]=K,J=R):(O[J]=T,O[x]=K,J=x);else if(R<dt&&0>d(F,K))O[J]=F,O[R]=K,J=R;else break t}}return L}function d(O,L){var K=O.sortIndex-L.sortIndex;return K!==0?K:O.id-L.id}if(l.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;l.unstable_now=function(){return f.now()}}else{var g=Date,C=g.now();l.unstable_now=function(){return g.now()-C}}var A=[],p=[],b=1,v=null,E=3,q=!1,Q=!1,Y=!1,nt=!1,ft=typeof setTimeout=="function"?setTimeout:null,it=typeof clearTimeout=="function"?clearTimeout:null,pt=typeof setImmediate<"u"?setImmediate:null;function Ot(O){for(var L=o(p);L!==null;){if(L.callback===null)u(p);else if(L.startTime<=O)u(p),L.sortIndex=L.expirationTime,i(A,L);else break;L=o(p)}}function $t(O){if(Y=!1,Ot(O),!Q)if(o(A)!==null)Q=!0,Nt||(Nt=!0,I());else{var L=o(p);L!==null&&Pt($t,L.startTime-O)}}var Nt=!1,V=-1,_=5,w=-1;function G(){return nt?!0:!(l.unstable_now()-w<_)}function Z(){if(nt=!1,Nt){var O=l.unstable_now();w=O;var L=!0;try{t:{Q=!1,Y&&(Y=!1,it(V),V=-1),q=!0;var K=E;try{e:{for(Ot(O),v=o(A);v!==null&&!(v.expirationTime>O&&G());){var J=v.callback;if(typeof J=="function"){v.callback=null,E=v.priorityLevel;var dt=J(v.expirationTime<=O);if(O=l.unstable_now(),typeof dt=="function"){v.callback=dt,Ot(O),L=!0;break e}v===o(A)&&u(A),Ot(O)}else u(A);v=o(A)}if(v!==null)L=!0;else{var y=o(p);y!==null&&Pt($t,y.startTime-O),L=!1}}break t}finally{v=null,E=K,q=!1}L=void 0}}finally{L?I():Nt=!1}}}var I;if(typeof pt=="function")I=function(){pt(Z)};else if(typeof MessageChannel<"u"){var ut=new MessageChannel,gt=ut.port2;ut.port1.onmessage=Z,I=function(){gt.postMessage(null)}}else I=function(){ft(Z,0)};function Pt(O,L){V=ft(function(){O(l.unstable_now())},L)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(O){O.callback=null},l.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<O?Math.floor(1e3/O):5},l.unstable_getCurrentPriorityLevel=function(){return E},l.unstable_next=function(O){switch(E){case 1:case 2:case 3:var L=3;break;default:L=E}var K=E;E=L;try{return O()}finally{E=K}},l.unstable_requestPaint=function(){nt=!0},l.unstable_runWithPriority=function(O,L){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var K=E;E=O;try{return L()}finally{E=K}},l.unstable_scheduleCallback=function(O,L,K){var J=l.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?J+K:J):K=J,O){case 1:var dt=-1;break;case 2:dt=250;break;case 5:dt=1073741823;break;case 4:dt=1e4;break;default:dt=5e3}return dt=K+dt,O={id:b++,callback:L,priorityLevel:O,startTime:K,expirationTime:dt,sortIndex:-1},K>J?(O.sortIndex=K,i(p,O),o(A)===null&&O===o(p)&&(Y?(it(V),V=-1):Y=!0,Pt($t,K-J))):(O.sortIndex=dt,i(A,O),Q||q||(Q=!0,Nt||(Nt=!0,I()))),O},l.unstable_shouldYield=G,l.unstable_wrapCallback=function(O){var L=E;return function(){var K=E;E=L;try{return O.apply(this,arguments)}finally{E=K}}}})(yu)),yu}var tm;function Hv(){return tm||(tm=1,vu.exports=Ov()),vu.exports}var bu={exports:{}},_e={};var em;function Uv(){if(em)return _e;em=1;var l=Qu();function i(A){var p="https://react.dev/errors/"+A;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var b=2;b<arguments.length;b++)p+="&args[]="+encodeURIComponent(arguments[b])}return"Minified React error #"+A+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(){}var u={d:{f:o,r:function(){throw Error(i(522))},D:o,C:o,L:o,m:o,X:o,S:o,M:o},p:0,findDOMNode:null},d=Symbol.for("react.portal");function f(A,p,b){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:d,key:v==null?null:""+v,children:A,containerInfo:p,implementation:b}}var g=l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function C(A,p){if(A==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return _e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,_e.createPortal=function(A,p){var b=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(i(299));return f(A,p,null,b)},_e.flushSync=function(A){var p=g.T,b=u.p;try{if(g.T=null,u.p=2,A)return A()}finally{g.T=p,u.p=b,u.d.f()}},_e.preconnect=function(A,p){typeof A=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,u.d.C(A,p))},_e.prefetchDNS=function(A){typeof A=="string"&&u.d.D(A)},_e.preinit=function(A,p){if(typeof A=="string"&&p&&typeof p.as=="string"){var b=p.as,v=C(b,p.crossOrigin),E=typeof p.integrity=="string"?p.integrity:void 0,q=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;b==="style"?u.d.S(A,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:v,integrity:E,fetchPriority:q}):b==="script"&&u.d.X(A,{crossOrigin:v,integrity:E,fetchPriority:q,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},_e.preinitModule=function(A,p){if(typeof A=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var b=C(p.as,p.crossOrigin);u.d.M(A,{crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&u.d.M(A)},_e.preload=function(A,p){if(typeof A=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var b=p.as,v=C(b,p.crossOrigin);u.d.L(A,b,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},_e.preloadModule=function(A,p){if(typeof A=="string")if(p){var b=C(p.as,p.crossOrigin);u.d.m(A,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else u.d.m(A)},_e.requestFormReset=function(A){u.d.r(A)},_e.unstable_batchedUpdates=function(A,p){return A(p)},_e.useFormState=function(A,p,b){return g.H.useFormState(A,p,b)},_e.useFormStatus=function(){return g.H.useHostTransitionStatus()},_e.version="19.2.4",_e}var nm;function jm(){if(nm)return bu.exports;nm=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(i){console.error(i)}}return l(),bu.exports=Uv(),bu.exports}var am;function kv(){if(am)return di;am=1;var l=Hv(),i=Qu(),o=jm();function u(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function g(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function C(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function A(t){if(f(t)!==t)throw Error(u(188))}function p(t){var e=t.alternate;if(!e){if(e=f(t),e===null)throw Error(u(188));return e!==t?null:t}for(var n=t,a=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(a=r.return,a!==null){n=a;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return A(r),t;if(s===a)return A(r),e;s=s.sibling}throw Error(u(188))}if(n.return!==a.return)n=r,a=s;else{for(var c=!1,h=r.child;h;){if(h===n){c=!0,n=r,a=s;break}if(h===a){c=!0,a=r,n=s;break}h=h.sibling}if(!c){for(h=s.child;h;){if(h===n){c=!0,n=s,a=r;break}if(h===a){c=!0,a=s,n=r;break}h=h.sibling}if(!c)throw Error(u(189))}}if(n.alternate!==a)throw Error(u(190))}if(n.tag!==3)throw Error(u(188));return n.stateNode.current===n?t:e}function b(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=b(t),e!==null)return e;t=t.sibling}return null}var v=Object.assign,E=Symbol.for("react.element"),q=Symbol.for("react.transitional.element"),Q=Symbol.for("react.portal"),Y=Symbol.for("react.fragment"),nt=Symbol.for("react.strict_mode"),ft=Symbol.for("react.profiler"),it=Symbol.for("react.consumer"),pt=Symbol.for("react.context"),Ot=Symbol.for("react.forward_ref"),$t=Symbol.for("react.suspense"),Nt=Symbol.for("react.suspense_list"),V=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),w=Symbol.for("react.activity"),G=Symbol.for("react.memo_cache_sentinel"),Z=Symbol.iterator;function I(t){return t===null||typeof t!="object"?null:(t=Z&&t[Z]||t["@@iterator"],typeof t=="function"?t:null)}var ut=Symbol.for("react.client.reference");function gt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ut?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Y:return"Fragment";case ft:return"Profiler";case nt:return"StrictMode";case $t:return"Suspense";case Nt:return"SuspenseList";case w:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Q:return"Portal";case pt:return t.displayName||"Context";case it:return(t._context.displayName||"Context")+".Consumer";case Ot:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case V:return e=t.displayName||null,e!==null?e:gt(t.type)||"Memo";case _:e=t._payload,t=t._init;try{return gt(t(e))}catch{}}return null}var Pt=Array.isArray,O=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},J=[],dt=-1;function y(t){return{current:t}}function x(t){0>dt||(t.current=J[dt],J[dt]=null,dt--)}function T(t,e){dt++,J[dt]=t.current,t.current=e}var R=y(null),F=y(null),X=y(null),at=y(null);function $(t,e){switch(T(X,e),T(F,t),T(R,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?yh(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=yh(e),t=bh(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}x(R),T(R,t)}function et(){x(R),x(F),x(X)}function yt(t){t.memoizedState!==null&&T(at,t);var e=R.current,n=bh(e,t.type);e!==n&&(T(F,t),T(R,n))}function ht(t){F.current===t&&(x(R),x(F)),at.current===t&&(x(at),ri._currentValue=K)}var xt,Vt;function _t(t){if(xt===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);xt=e&&e[1]||"",Vt=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+xt+t+Vt}var Tt=!1;function vt(t,e){if(!t||Tt)return"";Tt=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var B=function(){throw Error()};if(Object.defineProperty(B.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(B,[])}catch(H){var z=H}Reflect.construct(t,[],B)}else{try{B.call()}catch(H){z=H}t.call(B.prototype)}}else{try{throw Error()}catch(H){z=H}(B=t())&&typeof B.catch=="function"&&B.catch(function(){})}}catch(H){if(H&&z&&typeof H.stack=="string")return[H.stack,z.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=a.DetermineComponentFrameRoot(),c=s[0],h=s[1];if(c&&h){var S=c.split(`
`),j=h.split(`
`);for(r=a=0;a<S.length&&!S[a].includes("DetermineComponentFrameRoot");)a++;for(;r<j.length&&!j[r].includes("DetermineComponentFrameRoot");)r++;if(a===S.length||r===j.length)for(a=S.length-1,r=j.length-1;1<=a&&0<=r&&S[a]!==j[r];)r--;for(;1<=a&&0<=r;a--,r--)if(S[a]!==j[r]){if(a!==1||r!==1)do if(a--,r--,0>r||S[a]!==j[r]){var k=`
`+S[a].replace(" at new "," at ");return t.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",t.displayName)),k}while(1<=a&&0<=r);break}}}finally{Tt=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?_t(n):""}function ae(t,e){switch(t.tag){case 26:case 27:case 5:return _t(t.type);case 16:return _t("Lazy");case 13:return t.child!==e&&e!==null?_t("Suspense Fallback"):_t("Suspense");case 19:return _t("SuspenseList");case 0:case 15:return vt(t.type,!1);case 11:return vt(t.type.render,!1);case 1:return vt(t.type,!0);case 31:return _t("Activity");default:return""}}function Ct(t){try{var e="",n=null;do e+=ae(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Ht=Object.prototype.hasOwnProperty,Zt=l.unstable_scheduleCallback,De=l.unstable_cancelCallback,be=l.unstable_shouldYield,Qe=l.unstable_requestPaint,Et=l.unstable_now,Ne=l.unstable_getCurrentPriorityLevel,Wt=l.unstable_ImmediatePriority,re=l.unstable_UserBlockingPriority,ge=l.unstable_NormalPriority,U=l.unstable_LowPriority,rt=l.unstable_IdlePriority,W=l.log,Ut=l.unstable_setDisableYieldValue,me=null,ue=null;function Pe(t){if(typeof W=="function"&&Ut(t),ue&&typeof ue.setStrictMode=="function")try{ue.setStrictMode(me,t)}catch{}}var tt=Math.clz32?Math.clz32:Ma,Yt=Math.log,cn=Math.LN2;function Ma(t){return t>>>=0,t===0?32:31-(Yt(t)/cn|0)|0}var je=256,Le=262144,Ni=4194304;function oa(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function _i(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var r=0,s=t.suspendedLanes,c=t.pingedLanes;t=t.warmLanes;var h=a&134217727;return h!==0?(a=h&~s,a!==0?r=oa(a):(c&=h,c!==0?r=oa(c):n||(n=h&~t,n!==0&&(r=oa(n))))):(h=a&~s,h!==0?r=oa(h):c!==0?r=oa(c):n||(n=a&~t,n!==0&&(r=oa(n)))),r===0?0:e!==0&&e!==r&&(e&s)===0&&(s=r&-r,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:r}function bl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function vp(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $u(){var t=Ni;return Ni<<=1,(Ni&62914560)===0&&(Ni=4194304),t}function es(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Sl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function yp(t,e,n,a,r,s){var c=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var h=t.entanglements,S=t.expirationTimes,j=t.hiddenUpdates;for(n=c&~n;0<n;){var k=31-tt(n),B=1<<k;h[k]=0,S[k]=-1;var z=j[k];if(z!==null)for(j[k]=null,k=0;k<z.length;k++){var H=z[k];H!==null&&(H.lane&=-536870913)}n&=~B}a!==0&&Wu(t,a,0),s!==0&&r===0&&t.tag!==0&&(t.suspendedLanes|=s&~(c&~e))}function Wu(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-tt(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function tc(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-tt(n),r=1<<a;r&e|t[a]&e&&(t[a]|=e),n&=~r}}function ec(t,e){var n=e&-e;return n=(n&42)!==0?1:ns(n),(n&(t.suspendedLanes|e))!==0?0:n}function ns(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function as(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function nc(){var t=L.p;return t!==0?t:(t=window.event,t===void 0?32:qh(t.type))}function ac(t,e){var n=L.p;try{return L.p=t,e()}finally{L.p=n}}var Hn=Math.random().toString(36).slice(2),Se="__reactFiber$"+Hn,Re="__reactProps$"+Hn,Da="__reactContainer$"+Hn,ls="__reactEvents$"+Hn,bp="__reactListeners$"+Hn,Sp="__reactHandles$"+Hn,lc="__reactResources$"+Hn,xl="__reactMarker$"+Hn;function is(t){delete t[Se],delete t[Re],delete t[ls],delete t[bp],delete t[Sp]}function ja(t){var e=t[Se];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Da]||n[Se]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=_h(t);t!==null;){if(n=t[Se])return n;t=_h(t)}return e}t=n,n=t.parentNode}return null}function Ra(t){if(t=t[Se]||t[Da]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Cl(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(u(33))}function za(t){var e=t[lc];return e||(e=t[lc]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function ve(t){t[xl]=!0}var ic=new Set,rc={};function ua(t,e){Oa(t,e),Oa(t+"Capture",e)}function Oa(t,e){for(rc[t]=e,t=0;t<e.length;t++)ic.add(e[t])}var xp=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),sc={},oc={};function Cp(t){return Ht.call(oc,t)?!0:Ht.call(sc,t)?!1:xp.test(t)?oc[t]=!0:(sc[t]=!0,!1)}function Ei(t,e,n){if(Cp(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function wi(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function gn(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function Ze(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function uc(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ap(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var r=a.get,s=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(c){n=""+c,s.call(this,c)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(c){n=""+c},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function rs(t){if(!t._valueTracker){var e=uc(t)?"checked":"value";t._valueTracker=Ap(t,e,""+t[e])}}function cc(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=uc(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Mi(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Tp=/[\n"\\]/g;function Ie(t){return t.replace(Tp,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function ss(t,e,n,a,r,s,c,h){t.name="",c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?t.type=c:t.removeAttribute("type"),e!=null?c==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Ze(e)):t.value!==""+Ze(e)&&(t.value=""+Ze(e)):c!=="submit"&&c!=="reset"||t.removeAttribute("value"),e!=null?os(t,c,Ze(e)):n!=null?os(t,c,Ze(n)):a!=null&&t.removeAttribute("value"),r==null&&s!=null&&(t.defaultChecked=!!s),r!=null&&(t.checked=r&&typeof r!="function"&&typeof r!="symbol"),h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"?t.name=""+Ze(h):t.removeAttribute("name")}function dc(t,e,n,a,r,s,c,h){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){rs(t);return}n=n!=null?""+Ze(n):"",e=e!=null?""+Ze(e):n,h||e===t.value||(t.value=e),t.defaultValue=e}a=a??r,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=h?t.checked:!!a,t.defaultChecked=!!a,c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.name=c),rs(t)}function os(t,e,n){e==="number"&&Mi(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Ha(t,e,n,a){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&a&&(t[n].defaultSelected=!0)}else{for(n=""+Ze(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,a&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function fc(t,e,n){if(e!=null&&(e=""+Ze(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+Ze(n):""}function hc(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(u(92));if(Pt(a)){if(1<a.length)throw Error(u(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=Ze(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),rs(t)}function Ua(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Np=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function mc(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||Np.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function pc(t,e,n){if(e!=null&&typeof e!="object")throw Error(u(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var r in e)a=e[r],e.hasOwnProperty(r)&&n[r]!==a&&mc(t,r,a)}else for(var s in e)e.hasOwnProperty(s)&&mc(t,s,e[s])}function us(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _p=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ep=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Di(t){return Ep.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function vn(){}var cs=null;function ds(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ka=null,Ga=null;function gc(t){var e=Ra(t);if(e&&(t=e.stateNode)){var n=t[Re]||null;t:switch(t=e.stateNode,e.type){case"input":if(ss(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ie(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var r=a[Re]||null;if(!r)throw Error(u(90));ss(a,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&cc(a)}break t;case"textarea":fc(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&Ha(t,!!n.multiple,e,!1)}}}var fs=!1;function vc(t,e,n){if(fs)return t(e,n);fs=!0;try{var a=t(e);return a}finally{if(fs=!1,(ka!==null||Ga!==null)&&(vr(),ka&&(e=ka,t=Ga,Ga=ka=null,gc(e),t)))for(e=0;e<t.length;e++)gc(t[e])}}function Al(t,e){var n=t.stateNode;if(n===null)return null;var a=n[Re]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(u(231,e,typeof n));return n}var yn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),hs=!1;if(yn)try{var Tl={};Object.defineProperty(Tl,"passive",{get:function(){hs=!0}}),window.addEventListener("test",Tl,Tl),window.removeEventListener("test",Tl,Tl)}catch{hs=!1}var Un=null,ms=null,ji=null;function yc(){if(ji)return ji;var t,e=ms,n=e.length,a,r="value"in Un?Un.value:Un.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var c=n-t;for(a=1;a<=c&&e[n-a]===r[s-a];a++);return ji=r.slice(t,1<a?1-a:void 0)}function Ri(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function zi(){return!0}function bc(){return!1}function ze(t){function e(n,a,r,s,c){this._reactName=n,this._targetInst=r,this.type=a,this.nativeEvent=s,this.target=c,this.currentTarget=null;for(var h in t)t.hasOwnProperty(h)&&(n=t[h],this[h]=n?n(s):s[h]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?zi:bc,this.isPropagationStopped=bc,this}return v(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=zi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=zi)},persist:function(){},isPersistent:zi}),e}var ca={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Oi=ze(ca),Nl=v({},ca,{view:0,detail:0}),wp=ze(Nl),ps,gs,_l,Hi=v({},Nl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ys,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==_l&&(_l&&t.type==="mousemove"?(ps=t.screenX-_l.screenX,gs=t.screenY-_l.screenY):gs=ps=0,_l=t),ps)},movementY:function(t){return"movementY"in t?t.movementY:gs}}),Sc=ze(Hi),Mp=v({},Hi,{dataTransfer:0}),Dp=ze(Mp),jp=v({},Nl,{relatedTarget:0}),vs=ze(jp),Rp=v({},ca,{animationName:0,elapsedTime:0,pseudoElement:0}),zp=ze(Rp),Op=v({},ca,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Hp=ze(Op),Up=v({},ca,{data:0}),xc=ze(Up),kp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Pp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Lp(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Pp[t])?!!e[t]:!1}function ys(){return Lp}var Bp=v({},Nl,{key:function(t){if(t.key){var e=kp[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ri(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Gp[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ys,charCode:function(t){return t.type==="keypress"?Ri(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ri(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),qp=ze(Bp),Fp=v({},Hi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cc=ze(Fp),Vp=v({},Nl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ys}),Yp=ze(Vp),Kp=v({},ca,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xp=ze(Kp),Qp=v({},Hi,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Zp=ze(Qp),Ip=v({},ca,{newState:0,oldState:0}),Jp=ze(Ip),$p=[9,13,27,32],bs=yn&&"CompositionEvent"in window,El=null;yn&&"documentMode"in document&&(El=document.documentMode);var Wp=yn&&"TextEvent"in window&&!El,Ac=yn&&(!bs||El&&8<El&&11>=El),Tc=" ",Nc=!1;function _c(t,e){switch(t){case"keyup":return $p.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ec(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Pa=!1;function tg(t,e){switch(t){case"compositionend":return Ec(e);case"keypress":return e.which!==32?null:(Nc=!0,Tc);case"textInput":return t=e.data,t===Tc&&Nc?null:t;default:return null}}function eg(t,e){if(Pa)return t==="compositionend"||!bs&&_c(t,e)?(t=yc(),ji=ms=Un=null,Pa=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ac&&e.locale!=="ko"?null:e.data;default:return null}}var ng={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wc(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!ng[t.type]:e==="textarea"}function Mc(t,e,n,a){ka?Ga?Ga.push(a):Ga=[a]:ka=a,e=Tr(e,"onChange"),0<e.length&&(n=new Oi("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var wl=null,Ml=null;function ag(t){fh(t,0)}function Ui(t){var e=Cl(t);if(cc(e))return t}function Dc(t,e){if(t==="change")return e}var jc=!1;if(yn){var Ss;if(yn){var xs="oninput"in document;if(!xs){var Rc=document.createElement("div");Rc.setAttribute("oninput","return;"),xs=typeof Rc.oninput=="function"}Ss=xs}else Ss=!1;jc=Ss&&(!document.documentMode||9<document.documentMode)}function zc(){wl&&(wl.detachEvent("onpropertychange",Oc),Ml=wl=null)}function Oc(t){if(t.propertyName==="value"&&Ui(Ml)){var e=[];Mc(e,Ml,t,ds(t)),vc(ag,e)}}function lg(t,e,n){t==="focusin"?(zc(),wl=e,Ml=n,wl.attachEvent("onpropertychange",Oc)):t==="focusout"&&zc()}function ig(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ui(Ml)}function rg(t,e){if(t==="click")return Ui(e)}function sg(t,e){if(t==="input"||t==="change")return Ui(e)}function og(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Be=typeof Object.is=="function"?Object.is:og;function Dl(t,e){if(Be(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var r=n[a];if(!Ht.call(e,r)||!Be(t[r],e[r]))return!1}return!0}function Hc(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Uc(t,e){var n=Hc(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Hc(n)}}function kc(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?kc(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Gc(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Mi(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Mi(t.document)}return e}function Cs(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var ug=yn&&"documentMode"in document&&11>=document.documentMode,La=null,As=null,jl=null,Ts=!1;function Pc(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ts||La==null||La!==Mi(a)||(a=La,"selectionStart"in a&&Cs(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),jl&&Dl(jl,a)||(jl=a,a=Tr(As,"onSelect"),0<a.length&&(e=new Oi("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=La)))}function da(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ba={animationend:da("Animation","AnimationEnd"),animationiteration:da("Animation","AnimationIteration"),animationstart:da("Animation","AnimationStart"),transitionrun:da("Transition","TransitionRun"),transitionstart:da("Transition","TransitionStart"),transitioncancel:da("Transition","TransitionCancel"),transitionend:da("Transition","TransitionEnd")},Ns={},Lc={};yn&&(Lc=document.createElement("div").style,"AnimationEvent"in window||(delete Ba.animationend.animation,delete Ba.animationiteration.animation,delete Ba.animationstart.animation),"TransitionEvent"in window||delete Ba.transitionend.transition);function fa(t){if(Ns[t])return Ns[t];if(!Ba[t])return t;var e=Ba[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Lc)return Ns[t]=e[n];return t}var Bc=fa("animationend"),qc=fa("animationiteration"),Fc=fa("animationstart"),cg=fa("transitionrun"),dg=fa("transitionstart"),fg=fa("transitioncancel"),Vc=fa("transitionend"),Yc=new Map,_s="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");_s.push("scrollEnd");function sn(t,e){Yc.set(t,e),ua(e,[t])}var ki=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Je=[],qa=0,Es=0;function Gi(){for(var t=qa,e=Es=qa=0;e<t;){var n=Je[e];Je[e++]=null;var a=Je[e];Je[e++]=null;var r=Je[e];Je[e++]=null;var s=Je[e];if(Je[e++]=null,a!==null&&r!==null){var c=a.pending;c===null?r.next=r:(r.next=c.next,c.next=r),a.pending=r}s!==0&&Kc(n,r,s)}}function Pi(t,e,n,a){Je[qa++]=t,Je[qa++]=e,Je[qa++]=n,Je[qa++]=a,Es|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function ws(t,e,n,a){return Pi(t,e,n,a),Li(t)}function ha(t,e){return Pi(t,null,null,e),Li(t)}function Kc(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var r=!1,s=t.return;s!==null;)s.childLanes|=n,a=s.alternate,a!==null&&(a.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(r=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,r&&e!==null&&(r=31-tt(n),t=s.hiddenUpdates,a=t[r],a===null?t[r]=[e]:a.push(e),e.lane=n|536870912),s):null}function Li(t){if(50<Wl)throw Wl=0,Go=null,Error(u(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Fa={};function hg(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qe(t,e,n,a){return new hg(t,e,n,a)}function Ms(t){return t=t.prototype,!(!t||!t.isReactComponent)}function bn(t,e){var n=t.alternate;return n===null?(n=qe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function Xc(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Bi(t,e,n,a,r,s){var c=0;if(a=t,typeof t=="function")Ms(t)&&(c=1);else if(typeof t=="string")c=yv(t,n,R.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case w:return t=qe(31,n,e,r),t.elementType=w,t.lanes=s,t;case Y:return ma(n.children,r,s,e);case nt:c=8,r|=24;break;case ft:return t=qe(12,n,e,r|2),t.elementType=ft,t.lanes=s,t;case $t:return t=qe(13,n,e,r),t.elementType=$t,t.lanes=s,t;case Nt:return t=qe(19,n,e,r),t.elementType=Nt,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case pt:c=10;break t;case it:c=9;break t;case Ot:c=11;break t;case V:c=14;break t;case _:c=16,a=null;break t}c=29,n=Error(u(130,t===null?"null":typeof t,"")),a=null}return e=qe(c,n,e,r),e.elementType=t,e.type=a,e.lanes=s,e}function ma(t,e,n,a){return t=qe(7,t,a,e),t.lanes=n,t}function Ds(t,e,n){return t=qe(6,t,null,e),t.lanes=n,t}function Qc(t){var e=qe(18,null,null,0);return e.stateNode=t,e}function js(t,e,n){return e=qe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Zc=new WeakMap;function $e(t,e){if(typeof t=="object"&&t!==null){var n=Zc.get(t);return n!==void 0?n:(e={value:t,source:e,stack:Ct(e)},Zc.set(t,e),e)}return{value:t,source:e,stack:Ct(e)}}var Va=[],Ya=0,qi=null,Rl=0,We=[],tn=0,kn=null,dn=1,fn="";function Sn(t,e){Va[Ya++]=Rl,Va[Ya++]=qi,qi=t,Rl=e}function Ic(t,e,n){We[tn++]=dn,We[tn++]=fn,We[tn++]=kn,kn=t;var a=dn;t=fn;var r=32-tt(a)-1;a&=~(1<<r),n+=1;var s=32-tt(e)+r;if(30<s){var c=r-r%5;s=(a&(1<<c)-1).toString(32),a>>=c,r-=c,dn=1<<32-tt(e)+r|n<<r|a,fn=s+t}else dn=1<<s|n<<r|a,fn=t}function Rs(t){t.return!==null&&(Sn(t,1),Ic(t,1,0))}function zs(t){for(;t===qi;)qi=Va[--Ya],Va[Ya]=null,Rl=Va[--Ya],Va[Ya]=null;for(;t===kn;)kn=We[--tn],We[tn]=null,fn=We[--tn],We[tn]=null,dn=We[--tn],We[tn]=null}function Jc(t,e){We[tn++]=dn,We[tn++]=fn,We[tn++]=kn,dn=e.id,fn=e.overflow,kn=t}var xe=null,te=null,Rt=!1,Gn=null,en=!1,Os=Error(u(519));function Pn(t){var e=Error(u(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw zl($e(e,t)),Os}function $c(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[Se]=t,e[Re]=a,n){case"dialog":Mt("cancel",e),Mt("close",e);break;case"iframe":case"object":case"embed":Mt("load",e);break;case"video":case"audio":for(n=0;n<ei.length;n++)Mt(ei[n],e);break;case"source":Mt("error",e);break;case"img":case"image":case"link":Mt("error",e),Mt("load",e);break;case"details":Mt("toggle",e);break;case"input":Mt("invalid",e),dc(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":Mt("invalid",e);break;case"textarea":Mt("invalid",e),hc(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||gh(e.textContent,n)?(a.popover!=null&&(Mt("beforetoggle",e),Mt("toggle",e)),a.onScroll!=null&&Mt("scroll",e),a.onScrollEnd!=null&&Mt("scrollend",e),a.onClick!=null&&(e.onclick=vn),e=!0):e=!1,e||Pn(t,!0)}function Wc(t){for(xe=t.return;xe;)switch(xe.tag){case 5:case 31:case 13:en=!1;return;case 27:case 3:en=!0;return;default:xe=xe.return}}function Ka(t){if(t!==xe)return!1;if(!Rt)return Wc(t),Rt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Wo(t.type,t.memoizedProps)),n=!n),n&&te&&Pn(t),Wc(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(u(317));te=Nh(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(u(317));te=Nh(t)}else e===27?(e=te,Wn(t.type)?(t=lu,lu=null,te=t):te=e):te=xe?an(t.stateNode.nextSibling):null;return!0}function pa(){te=xe=null,Rt=!1}function Hs(){var t=Gn;return t!==null&&(ke===null?ke=t:ke.push.apply(ke,t),Gn=null),t}function zl(t){Gn===null?Gn=[t]:Gn.push(t)}var Us=y(null),ga=null,xn=null;function Ln(t,e,n){T(Us,e._currentValue),e._currentValue=n}function Cn(t){t._currentValue=Us.current,x(Us)}function ks(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Gs(t,e,n,a){var r=t.child;for(r!==null&&(r.return=t);r!==null;){var s=r.dependencies;if(s!==null){var c=r.child;s=s.firstContext;t:for(;s!==null;){var h=s;s=r;for(var S=0;S<e.length;S++)if(h.context===e[S]){s.lanes|=n,h=s.alternate,h!==null&&(h.lanes|=n),ks(s.return,n,t),a||(c=null);break t}s=h.next}}else if(r.tag===18){if(c=r.return,c===null)throw Error(u(341));c.lanes|=n,s=c.alternate,s!==null&&(s.lanes|=n),ks(c,n,t),c=null}else c=r.child;if(c!==null)c.return=r;else for(c=r;c!==null;){if(c===t){c=null;break}if(r=c.sibling,r!==null){r.return=c.return,c=r;break}c=c.return}r=c}}function Xa(t,e,n,a){t=null;for(var r=e,s=!1;r!==null;){if(!s){if((r.flags&524288)!==0)s=!0;else if((r.flags&262144)!==0)break}if(r.tag===10){var c=r.alternate;if(c===null)throw Error(u(387));if(c=c.memoizedProps,c!==null){var h=r.type;Be(r.pendingProps.value,c.value)||(t!==null?t.push(h):t=[h])}}else if(r===at.current){if(c=r.alternate,c===null)throw Error(u(387));c.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(t!==null?t.push(ri):t=[ri])}r=r.return}t!==null&&Gs(e,t,n,a),e.flags|=262144}function Fi(t){for(t=t.firstContext;t!==null;){if(!Be(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function va(t){ga=t,xn=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ce(t){return td(ga,t)}function Vi(t,e){return ga===null&&va(t),td(t,e)}function td(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},xn===null){if(t===null)throw Error(u(308));xn=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else xn=xn.next=e;return n}var mg=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},pg=l.unstable_scheduleCallback,gg=l.unstable_NormalPriority,ce={$$typeof:pt,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ps(){return{controller:new mg,data:new Map,refCount:0}}function Ol(t){t.refCount--,t.refCount===0&&pg(gg,function(){t.controller.abort()})}var Hl=null,Ls=0,Qa=0,Za=null;function vg(t,e){if(Hl===null){var n=Hl=[];Ls=0,Qa=Vo(),Za={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Ls++,e.then(ed,ed),e}function ed(){if(--Ls===0&&Hl!==null){Za!==null&&(Za.status="fulfilled");var t=Hl;Hl=null,Qa=0,Za=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function yg(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(r){n.push(r)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var r=0;r<n.length;r++)(0,n[r])(e)},function(r){for(a.status="rejected",a.reason=r,r=0;r<n.length;r++)(0,n[r])(void 0)}),a}var nd=O.S;O.S=function(t,e){Lf=Et(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&vg(t,e),nd!==null&&nd(t,e)};var ya=y(null);function Bs(){var t=ya.current;return t!==null?t:It.pooledCache}function Yi(t,e){e===null?T(ya,ya.current):T(ya,e.pool)}function ad(){var t=Bs();return t===null?null:{parent:ce._currentValue,pool:t}}var Ia=Error(u(460)),qs=Error(u(474)),Ki=Error(u(542)),Xi={then:function(){}};function ld(t){return t=t.status,t==="fulfilled"||t==="rejected"}function id(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(vn,vn),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,sd(t),t;default:if(typeof e.status=="string")e.then(vn,vn);else{if(t=It,t!==null&&100<t.shellSuspendCounter)throw Error(u(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var r=e;r.status="fulfilled",r.value=a}},function(a){if(e.status==="pending"){var r=e;r.status="rejected",r.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,sd(t),t}throw Sa=e,Ia}}function ba(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Sa=n,Ia):n}}var Sa=null;function rd(){if(Sa===null)throw Error(u(459));var t=Sa;return Sa=null,t}function sd(t){if(t===Ia||t===Ki)throw Error(u(483))}var Ja=null,Ul=0;function Qi(t){var e=Ul;return Ul+=1,Ja===null&&(Ja=[]),id(Ja,t,e)}function kl(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function Zi(t,e){throw e.$$typeof===E?Error(u(525)):(t=Object.prototype.toString.call(e),Error(u(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function od(t){function e(M,N){if(t){var D=M.deletions;D===null?(M.deletions=[N],M.flags|=16):D.push(N)}}function n(M,N){if(!t)return null;for(;N!==null;)e(M,N),N=N.sibling;return null}function a(M){for(var N=new Map;M!==null;)M.key!==null?N.set(M.key,M):N.set(M.index,M),M=M.sibling;return N}function r(M,N){return M=bn(M,N),M.index=0,M.sibling=null,M}function s(M,N,D){return M.index=D,t?(D=M.alternate,D!==null?(D=D.index,D<N?(M.flags|=67108866,N):D):(M.flags|=67108866,N)):(M.flags|=1048576,N)}function c(M){return t&&M.alternate===null&&(M.flags|=67108866),M}function h(M,N,D,P){return N===null||N.tag!==6?(N=Ds(D,M.mode,P),N.return=M,N):(N=r(N,D),N.return=M,N)}function S(M,N,D,P){var ct=D.type;return ct===Y?k(M,N,D.props.children,P,D.key):N!==null&&(N.elementType===ct||typeof ct=="object"&&ct!==null&&ct.$$typeof===_&&ba(ct)===N.type)?(N=r(N,D.props),kl(N,D),N.return=M,N):(N=Bi(D.type,D.key,D.props,null,M.mode,P),kl(N,D),N.return=M,N)}function j(M,N,D,P){return N===null||N.tag!==4||N.stateNode.containerInfo!==D.containerInfo||N.stateNode.implementation!==D.implementation?(N=js(D,M.mode,P),N.return=M,N):(N=r(N,D.children||[]),N.return=M,N)}function k(M,N,D,P,ct){return N===null||N.tag!==7?(N=ma(D,M.mode,P,ct),N.return=M,N):(N=r(N,D),N.return=M,N)}function B(M,N,D){if(typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint")return N=Ds(""+N,M.mode,D),N.return=M,N;if(typeof N=="object"&&N!==null){switch(N.$$typeof){case q:return D=Bi(N.type,N.key,N.props,null,M.mode,D),kl(D,N),D.return=M,D;case Q:return N=js(N,M.mode,D),N.return=M,N;case _:return N=ba(N),B(M,N,D)}if(Pt(N)||I(N))return N=ma(N,M.mode,D,null),N.return=M,N;if(typeof N.then=="function")return B(M,Qi(N),D);if(N.$$typeof===pt)return B(M,Vi(M,N),D);Zi(M,N)}return null}function z(M,N,D,P){var ct=N!==null?N.key:null;if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return ct!==null?null:h(M,N,""+D,P);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case q:return D.key===ct?S(M,N,D,P):null;case Q:return D.key===ct?j(M,N,D,P):null;case _:return D=ba(D),z(M,N,D,P)}if(Pt(D)||I(D))return ct!==null?null:k(M,N,D,P,null);if(typeof D.then=="function")return z(M,N,Qi(D),P);if(D.$$typeof===pt)return z(M,N,Vi(M,D),P);Zi(M,D)}return null}function H(M,N,D,P,ct){if(typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint")return M=M.get(D)||null,h(N,M,""+P,ct);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case q:return M=M.get(P.key===null?D:P.key)||null,S(N,M,P,ct);case Q:return M=M.get(P.key===null?D:P.key)||null,j(N,M,P,ct);case _:return P=ba(P),H(M,N,D,P,ct)}if(Pt(P)||I(P))return M=M.get(D)||null,k(N,M,P,ct,null);if(typeof P.then=="function")return H(M,N,D,Qi(P),ct);if(P.$$typeof===pt)return H(M,N,D,Vi(N,P),ct);Zi(N,P)}return null}function lt(M,N,D,P){for(var ct=null,kt=null,st=N,At=N=0,jt=null;st!==null&&At<D.length;At++){st.index>At?(jt=st,st=null):jt=st.sibling;var Gt=z(M,st,D[At],P);if(Gt===null){st===null&&(st=jt);break}t&&st&&Gt.alternate===null&&e(M,st),N=s(Gt,N,At),kt===null?ct=Gt:kt.sibling=Gt,kt=Gt,st=jt}if(At===D.length)return n(M,st),Rt&&Sn(M,At),ct;if(st===null){for(;At<D.length;At++)st=B(M,D[At],P),st!==null&&(N=s(st,N,At),kt===null?ct=st:kt.sibling=st,kt=st);return Rt&&Sn(M,At),ct}for(st=a(st);At<D.length;At++)jt=H(st,M,At,D[At],P),jt!==null&&(t&&jt.alternate!==null&&st.delete(jt.key===null?At:jt.key),N=s(jt,N,At),kt===null?ct=jt:kt.sibling=jt,kt=jt);return t&&st.forEach(function(la){return e(M,la)}),Rt&&Sn(M,At),ct}function mt(M,N,D,P){if(D==null)throw Error(u(151));for(var ct=null,kt=null,st=N,At=N=0,jt=null,Gt=D.next();st!==null&&!Gt.done;At++,Gt=D.next()){st.index>At?(jt=st,st=null):jt=st.sibling;var la=z(M,st,Gt.value,P);if(la===null){st===null&&(st=jt);break}t&&st&&la.alternate===null&&e(M,st),N=s(la,N,At),kt===null?ct=la:kt.sibling=la,kt=la,st=jt}if(Gt.done)return n(M,st),Rt&&Sn(M,At),ct;if(st===null){for(;!Gt.done;At++,Gt=D.next())Gt=B(M,Gt.value,P),Gt!==null&&(N=s(Gt,N,At),kt===null?ct=Gt:kt.sibling=Gt,kt=Gt);return Rt&&Sn(M,At),ct}for(st=a(st);!Gt.done;At++,Gt=D.next())Gt=H(st,M,At,Gt.value,P),Gt!==null&&(t&&Gt.alternate!==null&&st.delete(Gt.key===null?At:Gt.key),N=s(Gt,N,At),kt===null?ct=Gt:kt.sibling=Gt,kt=Gt);return t&&st.forEach(function(Mv){return e(M,Mv)}),Rt&&Sn(M,At),ct}function Qt(M,N,D,P){if(typeof D=="object"&&D!==null&&D.type===Y&&D.key===null&&(D=D.props.children),typeof D=="object"&&D!==null){switch(D.$$typeof){case q:t:{for(var ct=D.key;N!==null;){if(N.key===ct){if(ct=D.type,ct===Y){if(N.tag===7){n(M,N.sibling),P=r(N,D.props.children),P.return=M,M=P;break t}}else if(N.elementType===ct||typeof ct=="object"&&ct!==null&&ct.$$typeof===_&&ba(ct)===N.type){n(M,N.sibling),P=r(N,D.props),kl(P,D),P.return=M,M=P;break t}n(M,N);break}else e(M,N);N=N.sibling}D.type===Y?(P=ma(D.props.children,M.mode,P,D.key),P.return=M,M=P):(P=Bi(D.type,D.key,D.props,null,M.mode,P),kl(P,D),P.return=M,M=P)}return c(M);case Q:t:{for(ct=D.key;N!==null;){if(N.key===ct)if(N.tag===4&&N.stateNode.containerInfo===D.containerInfo&&N.stateNode.implementation===D.implementation){n(M,N.sibling),P=r(N,D.children||[]),P.return=M,M=P;break t}else{n(M,N);break}else e(M,N);N=N.sibling}P=js(D,M.mode,P),P.return=M,M=P}return c(M);case _:return D=ba(D),Qt(M,N,D,P)}if(Pt(D))return lt(M,N,D,P);if(I(D)){if(ct=I(D),typeof ct!="function")throw Error(u(150));return D=ct.call(D),mt(M,N,D,P)}if(typeof D.then=="function")return Qt(M,N,Qi(D),P);if(D.$$typeof===pt)return Qt(M,N,Vi(M,D),P);Zi(M,D)}return typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint"?(D=""+D,N!==null&&N.tag===6?(n(M,N.sibling),P=r(N,D),P.return=M,M=P):(n(M,N),P=Ds(D,M.mode,P),P.return=M,M=P),c(M)):n(M,N)}return function(M,N,D,P){try{Ul=0;var ct=Qt(M,N,D,P);return Ja=null,ct}catch(st){if(st===Ia||st===Ki)throw st;var kt=qe(29,st,null,M.mode);return kt.lanes=P,kt.return=M,kt}}}var xa=od(!0),ud=od(!1),Bn=!1;function Fs(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Vs(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function qn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Fn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(Lt&2)!==0){var r=a.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),a.pending=e,e=Li(t),Kc(t,null,n),e}return Pi(t,a,e,n),Li(t)}function Gl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,tc(t,n)}}function Ys(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var c={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?r=s=c:s=s.next=c,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:a.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Ks=!1;function Pl(){if(Ks){var t=Za;if(t!==null)throw t}}function Ll(t,e,n,a){Ks=!1;var r=t.updateQueue;Bn=!1;var s=r.firstBaseUpdate,c=r.lastBaseUpdate,h=r.shared.pending;if(h!==null){r.shared.pending=null;var S=h,j=S.next;S.next=null,c===null?s=j:c.next=j,c=S;var k=t.alternate;k!==null&&(k=k.updateQueue,h=k.lastBaseUpdate,h!==c&&(h===null?k.firstBaseUpdate=j:h.next=j,k.lastBaseUpdate=S))}if(s!==null){var B=r.baseState;c=0,k=j=S=null,h=s;do{var z=h.lane&-536870913,H=z!==h.lane;if(H?(Dt&z)===z:(a&z)===z){z!==0&&z===Qa&&(Ks=!0),k!==null&&(k=k.next={lane:0,tag:h.tag,payload:h.payload,callback:null,next:null});t:{var lt=t,mt=h;z=e;var Qt=n;switch(mt.tag){case 1:if(lt=mt.payload,typeof lt=="function"){B=lt.call(Qt,B,z);break t}B=lt;break t;case 3:lt.flags=lt.flags&-65537|128;case 0:if(lt=mt.payload,z=typeof lt=="function"?lt.call(Qt,B,z):lt,z==null)break t;B=v({},B,z);break t;case 2:Bn=!0}}z=h.callback,z!==null&&(t.flags|=64,H&&(t.flags|=8192),H=r.callbacks,H===null?r.callbacks=[z]:H.push(z))}else H={lane:z,tag:h.tag,payload:h.payload,callback:h.callback,next:null},k===null?(j=k=H,S=B):k=k.next=H,c|=z;if(h=h.next,h===null){if(h=r.shared.pending,h===null)break;H=h,h=H.next,H.next=null,r.lastBaseUpdate=H,r.shared.pending=null}}while(!0);k===null&&(S=B),r.baseState=S,r.firstBaseUpdate=j,r.lastBaseUpdate=k,s===null&&(r.shared.lanes=0),Qn|=c,t.lanes=c,t.memoizedState=B}}function cd(t,e){if(typeof t!="function")throw Error(u(191,t));t.call(e)}function dd(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)cd(n[t],e)}var $a=y(null),Ii=y(0);function fd(t,e){t=jn,T(Ii,t),T($a,e),jn=t|e.baseLanes}function Xs(){T(Ii,jn),T($a,$a.current)}function Qs(){jn=Ii.current,x($a),x(Ii)}var Fe=y(null),nn=null;function Vn(t){var e=t.alternate;T(se,se.current&1),T(Fe,t),nn===null&&(e===null||$a.current!==null||e.memoizedState!==null)&&(nn=t)}function Zs(t){T(se,se.current),T(Fe,t),nn===null&&(nn=t)}function hd(t){t.tag===22?(T(se,se.current),T(Fe,t),nn===null&&(nn=t)):Yn()}function Yn(){T(se,se.current),T(Fe,Fe.current)}function Ve(t){x(Fe),nn===t&&(nn=null),x(se)}var se=y(0);function Ji(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||nu(n)||au(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var An=0,St=null,Kt=null,de=null,$i=!1,Wa=!1,Ca=!1,Wi=0,Bl=0,tl=null,bg=0;function le(){throw Error(u(321))}function Is(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Be(t[n],e[n]))return!1;return!0}function Js(t,e,n,a,r,s){return An=s,St=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,O.H=t===null||t.memoizedState===null?Id:ho,Ca=!1,s=n(a,r),Ca=!1,Wa&&(s=pd(e,n,a,r)),md(t),s}function md(t){O.H=Vl;var e=Kt!==null&&Kt.next!==null;if(An=0,de=Kt=St=null,$i=!1,Bl=0,tl=null,e)throw Error(u(300));t===null||fe||(t=t.dependencies,t!==null&&Fi(t)&&(fe=!0))}function pd(t,e,n,a){St=t;var r=0;do{if(Wa&&(tl=null),Bl=0,Wa=!1,25<=r)throw Error(u(301));if(r+=1,de=Kt=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}O.H=Jd,s=e(n,a)}while(Wa);return s}function Sg(){var t=O.H,e=t.useState()[0];return e=typeof e.then=="function"?ql(e):e,t=t.useState()[0],(Kt!==null?Kt.memoizedState:null)!==t&&(St.flags|=1024),e}function $s(){var t=Wi!==0;return Wi=0,t}function Ws(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function to(t){if($i){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}$i=!1}An=0,de=Kt=St=null,Wa=!1,Bl=Wi=0,tl=null}function Me(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return de===null?St.memoizedState=de=t:de=de.next=t,de}function oe(){if(Kt===null){var t=St.alternate;t=t!==null?t.memoizedState:null}else t=Kt.next;var e=de===null?St.memoizedState:de.next;if(e!==null)de=e,Kt=t;else{if(t===null)throw St.alternate===null?Error(u(467)):Error(u(310));Kt=t,t={memoizedState:Kt.memoizedState,baseState:Kt.baseState,baseQueue:Kt.baseQueue,queue:Kt.queue,next:null},de===null?St.memoizedState=de=t:de=de.next=t}return de}function tr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ql(t){var e=Bl;return Bl+=1,tl===null&&(tl=[]),t=id(tl,t,e),e=St,(de===null?e.memoizedState:de.next)===null&&(e=e.alternate,O.H=e===null||e.memoizedState===null?Id:ho),t}function er(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ql(t);if(t.$$typeof===pt)return Ce(t)}throw Error(u(438,String(t)))}function eo(t){var e=null,n=St.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=St.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(r){return r.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=tr(),St.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=G;return e.index++,n}function Tn(t,e){return typeof e=="function"?e(t):e}function nr(t){var e=oe();return no(e,Kt,t)}function no(t,e,n){var a=t.queue;if(a===null)throw Error(u(311));a.lastRenderedReducer=n;var r=t.baseQueue,s=a.pending;if(s!==null){if(r!==null){var c=r.next;r.next=s.next,s.next=c}e.baseQueue=r=s,a.pending=null}if(s=t.baseState,r===null)t.memoizedState=s;else{e=r.next;var h=c=null,S=null,j=e,k=!1;do{var B=j.lane&-536870913;if(B!==j.lane?(Dt&B)===B:(An&B)===B){var z=j.revertLane;if(z===0)S!==null&&(S=S.next={lane:0,revertLane:0,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null}),B===Qa&&(k=!0);else if((An&z)===z){j=j.next,z===Qa&&(k=!0);continue}else B={lane:0,revertLane:j.revertLane,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},S===null?(h=S=B,c=s):S=S.next=B,St.lanes|=z,Qn|=z;B=j.action,Ca&&n(s,B),s=j.hasEagerState?j.eagerState:n(s,B)}else z={lane:B,revertLane:j.revertLane,gesture:j.gesture,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},S===null?(h=S=z,c=s):S=S.next=z,St.lanes|=B,Qn|=B;j=j.next}while(j!==null&&j!==e);if(S===null?c=s:S.next=h,!Be(s,t.memoizedState)&&(fe=!0,k&&(n=Za,n!==null)))throw n;t.memoizedState=s,t.baseState=c,t.baseQueue=S,a.lastRenderedState=s}return r===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function ao(t){var e=oe(),n=e.queue;if(n===null)throw Error(u(311));n.lastRenderedReducer=t;var a=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var c=r=r.next;do s=t(s,c.action),c=c.next;while(c!==r);Be(s,e.memoizedState)||(fe=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,a]}function gd(t,e,n){var a=St,r=oe(),s=Rt;if(s){if(n===void 0)throw Error(u(407));n=n()}else n=e();var c=!Be((Kt||r).memoizedState,n);if(c&&(r.memoizedState=n,fe=!0),r=r.queue,ro(bd.bind(null,a,r,t),[t]),r.getSnapshot!==e||c||de!==null&&de.memoizedState.tag&1){if(a.flags|=2048,el(9,{destroy:void 0},yd.bind(null,a,r,n,e),null),It===null)throw Error(u(349));s||(An&127)!==0||vd(a,e,n)}return n}function vd(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=St.updateQueue,e===null?(e=tr(),St.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function yd(t,e,n,a){e.value=n,e.getSnapshot=a,Sd(e)&&xd(t)}function bd(t,e,n){return n(function(){Sd(e)&&xd(t)})}function Sd(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Be(t,n)}catch{return!0}}function xd(t){var e=ha(t,2);e!==null&&Ge(e,t,2)}function lo(t){var e=Me();if(typeof t=="function"){var n=t;if(t=n(),Ca){Pe(!0);try{n()}finally{Pe(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Tn,lastRenderedState:t},e}function Cd(t,e,n,a){return t.baseState=n,no(t,Kt,typeof a=="function"?a:Tn)}function xg(t,e,n,a,r){if(ir(t))throw Error(u(485));if(t=e.action,t!==null){var s={payload:r,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(c){s.listeners.push(c)}};O.T!==null?n(!0):s.isTransition=!1,a(s),n=e.pending,n===null?(s.next=e.pending=s,Ad(e,s)):(s.next=n.next,e.pending=n.next=s)}}function Ad(t,e){var n=e.action,a=e.payload,r=t.state;if(e.isTransition){var s=O.T,c={};O.T=c;try{var h=n(r,a),S=O.S;S!==null&&S(c,h),Td(t,e,h)}catch(j){io(t,e,j)}finally{s!==null&&c.types!==null&&(s.types=c.types),O.T=s}}else try{s=n(r,a),Td(t,e,s)}catch(j){io(t,e,j)}}function Td(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Nd(t,e,a)},function(a){return io(t,e,a)}):Nd(t,e,n)}function Nd(t,e,n){e.status="fulfilled",e.value=n,_d(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Ad(t,n)))}function io(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,_d(e),e=e.next;while(e!==a)}t.action=null}function _d(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Ed(t,e){return e}function wd(t,e){if(Rt){var n=It.formState;if(n!==null){t:{var a=St;if(Rt){if(te){e:{for(var r=te,s=en;r.nodeType!==8;){if(!s){r=null;break e}if(r=an(r.nextSibling),r===null){r=null;break e}}s=r.data,r=s==="F!"||s==="F"?r:null}if(r){te=an(r.nextSibling),a=r.data==="F!";break t}}Pn(a)}a=!1}a&&(e=n[0])}}return n=Me(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ed,lastRenderedState:e},n.queue=a,n=Xd.bind(null,St,a),a.dispatch=n,a=lo(!1),s=fo.bind(null,St,!1,a.queue),a=Me(),r={state:e,dispatch:null,action:t,pending:null},a.queue=r,n=xg.bind(null,St,r,s,n),r.dispatch=n,a.memoizedState=t,[e,n,!1]}function Md(t){var e=oe();return Dd(e,Kt,t)}function Dd(t,e,n){if(e=no(t,e,Ed)[0],t=nr(Tn)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=ql(e)}catch(c){throw c===Ia?Ki:c}else a=e;e=oe();var r=e.queue,s=r.dispatch;return n!==e.memoizedState&&(St.flags|=2048,el(9,{destroy:void 0},Cg.bind(null,r,n),null)),[a,s,t]}function Cg(t,e){t.action=e}function jd(t){var e=oe(),n=Kt;if(n!==null)return Dd(e,n,t);oe(),e=e.memoizedState,n=oe();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function el(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=St.updateQueue,e===null&&(e=tr(),St.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Rd(){return oe().memoizedState}function ar(t,e,n,a){var r=Me();St.flags|=t,r.memoizedState=el(1|e,{destroy:void 0},n,a===void 0?null:a)}function lr(t,e,n,a){var r=oe();a=a===void 0?null:a;var s=r.memoizedState.inst;Kt!==null&&a!==null&&Is(a,Kt.memoizedState.deps)?r.memoizedState=el(e,s,n,a):(St.flags|=t,r.memoizedState=el(1|e,s,n,a))}function zd(t,e){ar(8390656,8,t,e)}function ro(t,e){lr(2048,8,t,e)}function Ag(t){St.flags|=4;var e=St.updateQueue;if(e===null)e=tr(),St.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Od(t){var e=oe().memoizedState;return Ag({ref:e,nextImpl:t}),function(){if((Lt&2)!==0)throw Error(u(440));return e.impl.apply(void 0,arguments)}}function Hd(t,e){return lr(4,2,t,e)}function Ud(t,e){return lr(4,4,t,e)}function kd(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Gd(t,e,n){n=n!=null?n.concat([t]):null,lr(4,4,kd.bind(null,e,t),n)}function so(){}function Pd(t,e){var n=oe();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&Is(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function Ld(t,e){var n=oe();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&Is(e,a[1]))return a[0];if(a=t(),Ca){Pe(!0);try{t()}finally{Pe(!1)}}return n.memoizedState=[a,e],a}function oo(t,e,n){return n===void 0||(An&1073741824)!==0&&(Dt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=qf(),St.lanes|=t,Qn|=t,n)}function Bd(t,e,n,a){return Be(n,e)?n:$a.current!==null?(t=oo(t,n,a),Be(t,e)||(fe=!0),t):(An&42)===0||(An&1073741824)!==0&&(Dt&261930)===0?(fe=!0,t.memoizedState=n):(t=qf(),St.lanes|=t,Qn|=t,e)}function qd(t,e,n,a,r){var s=L.p;L.p=s!==0&&8>s?s:8;var c=O.T,h={};O.T=h,fo(t,!1,e,n);try{var S=r(),j=O.S;if(j!==null&&j(h,S),S!==null&&typeof S=="object"&&typeof S.then=="function"){var k=yg(S,a);Fl(t,e,k,Xe(t))}else Fl(t,e,a,Xe(t))}catch(B){Fl(t,e,{then:function(){},status:"rejected",reason:B},Xe())}finally{L.p=s,c!==null&&h.types!==null&&(c.types=h.types),O.T=c}}function Tg(){}function uo(t,e,n,a){if(t.tag!==5)throw Error(u(476));var r=Fd(t).queue;qd(t,r,e,K,n===null?Tg:function(){return Vd(t),n(a)})}function Fd(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Tn,lastRenderedState:K},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Tn,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Vd(t){var e=Fd(t);e.next===null&&(e=t.alternate.memoizedState),Fl(t,e.next.queue,{},Xe())}function co(){return Ce(ri)}function Yd(){return oe().memoizedState}function Kd(){return oe().memoizedState}function Ng(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=Xe();t=qn(n);var a=Fn(e,t,n);a!==null&&(Ge(a,e,n),Gl(a,e,n)),e={cache:Ps()},t.payload=e;return}e=e.return}}function _g(t,e,n){var a=Xe();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ir(t)?Qd(e,n):(n=ws(t,e,n,a),n!==null&&(Ge(n,t,a),Zd(n,e,a)))}function Xd(t,e,n){var a=Xe();Fl(t,e,n,a)}function Fl(t,e,n,a){var r={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(ir(t))Qd(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var c=e.lastRenderedState,h=s(c,n);if(r.hasEagerState=!0,r.eagerState=h,Be(h,c))return Pi(t,e,r,0),It===null&&Gi(),!1}catch{}if(n=ws(t,e,r,a),n!==null)return Ge(n,t,a),Zd(n,e,a),!0}return!1}function fo(t,e,n,a){if(a={lane:2,revertLane:Vo(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},ir(t)){if(e)throw Error(u(479))}else e=ws(t,n,a,2),e!==null&&Ge(e,t,2)}function ir(t){var e=t.alternate;return t===St||e!==null&&e===St}function Qd(t,e){Wa=$i=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Zd(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,tc(t,n)}}var Vl={readContext:Ce,use:er,useCallback:le,useContext:le,useEffect:le,useImperativeHandle:le,useLayoutEffect:le,useInsertionEffect:le,useMemo:le,useReducer:le,useRef:le,useState:le,useDebugValue:le,useDeferredValue:le,useTransition:le,useSyncExternalStore:le,useId:le,useHostTransitionStatus:le,useFormState:le,useActionState:le,useOptimistic:le,useMemoCache:le,useCacheRefresh:le};Vl.useEffectEvent=le;var Id={readContext:Ce,use:er,useCallback:function(t,e){return Me().memoizedState=[t,e===void 0?null:e],t},useContext:Ce,useEffect:zd,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,ar(4194308,4,kd.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ar(4194308,4,t,e)},useInsertionEffect:function(t,e){ar(4,2,t,e)},useMemo:function(t,e){var n=Me();e=e===void 0?null:e;var a=t();if(Ca){Pe(!0);try{t()}finally{Pe(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=Me();if(n!==void 0){var r=n(e);if(Ca){Pe(!0);try{n(e)}finally{Pe(!1)}}}else r=e;return a.memoizedState=a.baseState=r,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:r},a.queue=t,t=t.dispatch=_g.bind(null,St,t),[a.memoizedState,t]},useRef:function(t){var e=Me();return t={current:t},e.memoizedState=t},useState:function(t){t=lo(t);var e=t.queue,n=Xd.bind(null,St,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:so,useDeferredValue:function(t,e){var n=Me();return oo(n,t,e)},useTransition:function(){var t=lo(!1);return t=qd.bind(null,St,t.queue,!0,!1),Me().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=St,r=Me();if(Rt){if(n===void 0)throw Error(u(407));n=n()}else{if(n=e(),It===null)throw Error(u(349));(Dt&127)!==0||vd(a,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,zd(bd.bind(null,a,s,t),[t]),a.flags|=2048,el(9,{destroy:void 0},yd.bind(null,a,s,n,e),null),n},useId:function(){var t=Me(),e=It.identifierPrefix;if(Rt){var n=fn,a=dn;n=(a&~(1<<32-tt(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Wi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=bg++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:co,useFormState:wd,useActionState:wd,useOptimistic:function(t){var e=Me();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=fo.bind(null,St,!0,n),n.dispatch=e,[t,e]},useMemoCache:eo,useCacheRefresh:function(){return Me().memoizedState=Ng.bind(null,St)},useEffectEvent:function(t){var e=Me(),n={impl:t};return e.memoizedState=n,function(){if((Lt&2)!==0)throw Error(u(440));return n.impl.apply(void 0,arguments)}}},ho={readContext:Ce,use:er,useCallback:Pd,useContext:Ce,useEffect:ro,useImperativeHandle:Gd,useInsertionEffect:Hd,useLayoutEffect:Ud,useMemo:Ld,useReducer:nr,useRef:Rd,useState:function(){return nr(Tn)},useDebugValue:so,useDeferredValue:function(t,e){var n=oe();return Bd(n,Kt.memoizedState,t,e)},useTransition:function(){var t=nr(Tn)[0],e=oe().memoizedState;return[typeof t=="boolean"?t:ql(t),e]},useSyncExternalStore:gd,useId:Yd,useHostTransitionStatus:co,useFormState:Md,useActionState:Md,useOptimistic:function(t,e){var n=oe();return Cd(n,Kt,t,e)},useMemoCache:eo,useCacheRefresh:Kd};ho.useEffectEvent=Od;var Jd={readContext:Ce,use:er,useCallback:Pd,useContext:Ce,useEffect:ro,useImperativeHandle:Gd,useInsertionEffect:Hd,useLayoutEffect:Ud,useMemo:Ld,useReducer:ao,useRef:Rd,useState:function(){return ao(Tn)},useDebugValue:so,useDeferredValue:function(t,e){var n=oe();return Kt===null?oo(n,t,e):Bd(n,Kt.memoizedState,t,e)},useTransition:function(){var t=ao(Tn)[0],e=oe().memoizedState;return[typeof t=="boolean"?t:ql(t),e]},useSyncExternalStore:gd,useId:Yd,useHostTransitionStatus:co,useFormState:jd,useActionState:jd,useOptimistic:function(t,e){var n=oe();return Kt!==null?Cd(n,Kt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:eo,useCacheRefresh:Kd};Jd.useEffectEvent=Od;function mo(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:v({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var po={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=Xe(),r=qn(a);r.payload=e,n!=null&&(r.callback=n),e=Fn(t,r,a),e!==null&&(Ge(e,t,a),Gl(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=Xe(),r=qn(a);r.tag=1,r.payload=e,n!=null&&(r.callback=n),e=Fn(t,r,a),e!==null&&(Ge(e,t,a),Gl(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Xe(),a=qn(n);a.tag=2,e!=null&&(a.callback=e),e=Fn(t,a,n),e!==null&&(Ge(e,t,n),Gl(e,t,n))}};function $d(t,e,n,a,r,s,c){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,s,c):e.prototype&&e.prototype.isPureReactComponent?!Dl(n,a)||!Dl(r,s):!0}function Wd(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&po.enqueueReplaceState(e,e.state,null)}function Aa(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=v({},n));for(var r in t)n[r]===void 0&&(n[r]=t[r])}return n}function tf(t){ki(t)}function ef(t){console.error(t)}function nf(t){ki(t)}function rr(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function af(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function go(t,e,n){return n=qn(n),n.tag=3,n.payload={element:null},n.callback=function(){rr(t,e)},n}function lf(t){return t=qn(t),t.tag=3,t}function rf(t,e,n,a){var r=n.type.getDerivedStateFromError;if(typeof r=="function"){var s=a.value;t.payload=function(){return r(s)},t.callback=function(){af(e,n,a)}}var c=n.stateNode;c!==null&&typeof c.componentDidCatch=="function"&&(t.callback=function(){af(e,n,a),typeof r!="function"&&(Zn===null?Zn=new Set([this]):Zn.add(this));var h=a.stack;this.componentDidCatch(a.value,{componentStack:h!==null?h:""})})}function Eg(t,e,n,a,r){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&Xa(e,n,r,!0),n=Fe.current,n!==null){switch(n.tag){case 31:case 13:return nn===null?yr():n.alternate===null&&ie===0&&(ie=3),n.flags&=-257,n.flags|=65536,n.lanes=r,a===Xi?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Bo(t,a,r)),!1;case 22:return n.flags|=65536,a===Xi?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Bo(t,a,r)),!1}throw Error(u(435,n.tag))}return Bo(t,a,r),yr(),!1}if(Rt)return e=Fe.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=r,a!==Os&&(t=Error(u(422),{cause:a}),zl($e(t,n)))):(a!==Os&&(e=Error(u(423),{cause:a}),zl($e(e,n))),t=t.current.alternate,t.flags|=65536,r&=-r,t.lanes|=r,a=$e(a,n),r=go(t.stateNode,a,r),Ys(t,r),ie!==4&&(ie=2)),!1;var s=Error(u(520),{cause:a});if(s=$e(s,n),$l===null?$l=[s]:$l.push(s),ie!==4&&(ie=2),e===null)return!0;a=$e(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=r&-r,n.lanes|=t,t=go(n.stateNode,a,t),Ys(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(Zn===null||!Zn.has(s))))return n.flags|=65536,r&=-r,n.lanes|=r,r=lf(r),rf(r,t,n,a),Ys(n,r),!1}n=n.return}while(n!==null);return!1}var vo=Error(u(461)),fe=!1;function Ae(t,e,n,a){e.child=t===null?ud(e,null,n,a):xa(e,t.child,n,a)}function sf(t,e,n,a,r){n=n.render;var s=e.ref;if("ref"in a){var c={};for(var h in a)h!=="ref"&&(c[h]=a[h])}else c=a;return va(e),a=Js(t,e,n,c,s,r),h=$s(),t!==null&&!fe?(Ws(t,e,r),Nn(t,e,r)):(Rt&&h&&Rs(e),e.flags|=1,Ae(t,e,a,r),e.child)}function of(t,e,n,a,r){if(t===null){var s=n.type;return typeof s=="function"&&!Ms(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,uf(t,e,s,a,r)):(t=Bi(n.type,null,a,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!No(t,r)){var c=s.memoizedProps;if(n=n.compare,n=n!==null?n:Dl,n(c,a)&&t.ref===e.ref)return Nn(t,e,r)}return e.flags|=1,t=bn(s,a),t.ref=e.ref,t.return=e,e.child=t}function uf(t,e,n,a,r){if(t!==null){var s=t.memoizedProps;if(Dl(s,a)&&t.ref===e.ref)if(fe=!1,e.pendingProps=a=s,No(t,r))(t.flags&131072)!==0&&(fe=!0);else return e.lanes=t.lanes,Nn(t,e,r)}return yo(t,e,n,a,r)}function cf(t,e,n,a){var r=a.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(s=s!==null?s.baseLanes|n:n,t!==null){for(a=e.child=t.child,r=0;a!==null;)r=r|a.lanes|a.childLanes,a=a.sibling;a=r&~s}else a=0,e.child=null;return df(t,e,s,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Yi(e,s!==null?s.cachePool:null),s!==null?fd(e,s):Xs(),hd(e);else return a=e.lanes=536870912,df(t,e,s!==null?s.baseLanes|n:n,n,a)}else s!==null?(Yi(e,s.cachePool),fd(e,s),Yn(),e.memoizedState=null):(t!==null&&Yi(e,null),Xs(),Yn());return Ae(t,e,r,n),e.child}function Yl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function df(t,e,n,a,r){var s=Bs();return s=s===null?null:{parent:ce._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&Yi(e,null),Xs(),hd(e),t!==null&&Xa(t,e,a,!0),e.childLanes=r,null}function sr(t,e){return e=ur({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function ff(t,e,n){return xa(e,t.child,null,n),t=sr(e,e.pendingProps),t.flags|=2,Ve(e),e.memoizedState=null,t}function wg(t,e,n){var a=e.pendingProps,r=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(Rt){if(a.mode==="hidden")return t=sr(e,a),e.lanes=536870912,Yl(null,t);if(Zs(e),(t=te)?(t=Th(t,en),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:kn!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},n=Qc(t),n.return=e,e.child=n,xe=e,te=null)):t=null,t===null)throw Pn(e);return e.lanes=536870912,null}return sr(e,a)}var s=t.memoizedState;if(s!==null){var c=s.dehydrated;if(Zs(e),r)if(e.flags&256)e.flags&=-257,e=ff(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(u(558));else if(fe||Xa(t,e,n,!1),r=(n&t.childLanes)!==0,fe||r){if(a=It,a!==null&&(c=ec(a,n),c!==0&&c!==s.retryLane))throw s.retryLane=c,ha(t,c),Ge(a,t,c),vo;yr(),e=ff(t,e,n)}else t=s.treeContext,te=an(c.nextSibling),xe=e,Rt=!0,Gn=null,en=!1,t!==null&&Jc(e,t),e=sr(e,a),e.flags|=4096;return e}return t=bn(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function or(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(u(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function yo(t,e,n,a,r){return va(e),n=Js(t,e,n,a,void 0,r),a=$s(),t!==null&&!fe?(Ws(t,e,r),Nn(t,e,r)):(Rt&&a&&Rs(e),e.flags|=1,Ae(t,e,n,r),e.child)}function hf(t,e,n,a,r,s){return va(e),e.updateQueue=null,n=pd(e,a,n,r),md(t),a=$s(),t!==null&&!fe?(Ws(t,e,s),Nn(t,e,s)):(Rt&&a&&Rs(e),e.flags|=1,Ae(t,e,n,s),e.child)}function mf(t,e,n,a,r){if(va(e),e.stateNode===null){var s=Fa,c=n.contextType;typeof c=="object"&&c!==null&&(s=Ce(c)),s=new n(a,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=po,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=a,s.state=e.memoizedState,s.refs={},Fs(e),c=n.contextType,s.context=typeof c=="object"&&c!==null?Ce(c):Fa,s.state=e.memoizedState,c=n.getDerivedStateFromProps,typeof c=="function"&&(mo(e,n,c,a),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(c=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),c!==s.state&&po.enqueueReplaceState(s,s.state,null),Ll(e,a,s,r),Pl(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){s=e.stateNode;var h=e.memoizedProps,S=Aa(n,h);s.props=S;var j=s.context,k=n.contextType;c=Fa,typeof k=="object"&&k!==null&&(c=Ce(k));var B=n.getDerivedStateFromProps;k=typeof B=="function"||typeof s.getSnapshotBeforeUpdate=="function",h=e.pendingProps!==h,k||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(h||j!==c)&&Wd(e,s,a,c),Bn=!1;var z=e.memoizedState;s.state=z,Ll(e,a,s,r),Pl(),j=e.memoizedState,h||z!==j||Bn?(typeof B=="function"&&(mo(e,n,B,a),j=e.memoizedState),(S=Bn||$d(e,n,S,a,z,j,c))?(k||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=j),s.props=a,s.state=j,s.context=c,a=S):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{s=e.stateNode,Vs(t,e),c=e.memoizedProps,k=Aa(n,c),s.props=k,B=e.pendingProps,z=s.context,j=n.contextType,S=Fa,typeof j=="object"&&j!==null&&(S=Ce(j)),h=n.getDerivedStateFromProps,(j=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(c!==B||z!==S)&&Wd(e,s,a,S),Bn=!1,z=e.memoizedState,s.state=z,Ll(e,a,s,r),Pl();var H=e.memoizedState;c!==B||z!==H||Bn||t!==null&&t.dependencies!==null&&Fi(t.dependencies)?(typeof h=="function"&&(mo(e,n,h,a),H=e.memoizedState),(k=Bn||$d(e,n,k,a,z,H,S)||t!==null&&t.dependencies!==null&&Fi(t.dependencies))?(j||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(a,H,S),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(a,H,S)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||c===t.memoizedProps&&z===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&z===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=H),s.props=a,s.state=H,s.context=S,a=k):(typeof s.componentDidUpdate!="function"||c===t.memoizedProps&&z===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&z===t.memoizedState||(e.flags|=1024),a=!1)}return s=a,or(t,e),a=(e.flags&128)!==0,s||a?(s=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&a?(e.child=xa(e,t.child,null,r),e.child=xa(e,null,n,r)):Ae(t,e,n,r),e.memoizedState=s.state,t=e.child):t=Nn(t,e,r),t}function pf(t,e,n,a){return pa(),e.flags|=256,Ae(t,e,n,a),e.child}var bo={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function So(t){return{baseLanes:t,cachePool:ad()}}function xo(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=Ke),t}function gf(t,e,n){var a=e.pendingProps,r=!1,s=(e.flags&128)!==0,c;if((c=s)||(c=t!==null&&t.memoizedState===null?!1:(se.current&2)!==0),c&&(r=!0,e.flags&=-129),c=(e.flags&32)!==0,e.flags&=-33,t===null){if(Rt){if(r?Vn(e):Yn(),(t=te)?(t=Th(t,en),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:kn!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},n=Qc(t),n.return=e,e.child=n,xe=e,te=null)):t=null,t===null)throw Pn(e);return au(t)?e.lanes=32:e.lanes=536870912,null}var h=a.children;return a=a.fallback,r?(Yn(),r=e.mode,h=ur({mode:"hidden",children:h},r),a=ma(a,r,n,null),h.return=e,a.return=e,h.sibling=a,e.child=h,a=e.child,a.memoizedState=So(n),a.childLanes=xo(t,c,n),e.memoizedState=bo,Yl(null,a)):(Vn(e),Co(e,h))}var S=t.memoizedState;if(S!==null&&(h=S.dehydrated,h!==null)){if(s)e.flags&256?(Vn(e),e.flags&=-257,e=Ao(t,e,n)):e.memoizedState!==null?(Yn(),e.child=t.child,e.flags|=128,e=null):(Yn(),h=a.fallback,r=e.mode,a=ur({mode:"visible",children:a.children},r),h=ma(h,r,n,null),h.flags|=2,a.return=e,h.return=e,a.sibling=h,e.child=a,xa(e,t.child,null,n),a=e.child,a.memoizedState=So(n),a.childLanes=xo(t,c,n),e.memoizedState=bo,e=Yl(null,a));else if(Vn(e),au(h)){if(c=h.nextSibling&&h.nextSibling.dataset,c)var j=c.dgst;c=j,a=Error(u(419)),a.stack="",a.digest=c,zl({value:a,source:null,stack:null}),e=Ao(t,e,n)}else if(fe||Xa(t,e,n,!1),c=(n&t.childLanes)!==0,fe||c){if(c=It,c!==null&&(a=ec(c,n),a!==0&&a!==S.retryLane))throw S.retryLane=a,ha(t,a),Ge(c,t,a),vo;nu(h)||yr(),e=Ao(t,e,n)}else nu(h)?(e.flags|=192,e.child=t.child,e=null):(t=S.treeContext,te=an(h.nextSibling),xe=e,Rt=!0,Gn=null,en=!1,t!==null&&Jc(e,t),e=Co(e,a.children),e.flags|=4096);return e}return r?(Yn(),h=a.fallback,r=e.mode,S=t.child,j=S.sibling,a=bn(S,{mode:"hidden",children:a.children}),a.subtreeFlags=S.subtreeFlags&65011712,j!==null?h=bn(j,h):(h=ma(h,r,n,null),h.flags|=2),h.return=e,a.return=e,a.sibling=h,e.child=a,Yl(null,a),a=e.child,h=t.child.memoizedState,h===null?h=So(n):(r=h.cachePool,r!==null?(S=ce._currentValue,r=r.parent!==S?{parent:S,pool:S}:r):r=ad(),h={baseLanes:h.baseLanes|n,cachePool:r}),a.memoizedState=h,a.childLanes=xo(t,c,n),e.memoizedState=bo,Yl(t.child,a)):(Vn(e),n=t.child,t=n.sibling,n=bn(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(c=e.deletions,c===null?(e.deletions=[t],e.flags|=16):c.push(t)),e.child=n,e.memoizedState=null,n)}function Co(t,e){return e=ur({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function ur(t,e){return t=qe(22,t,null,e),t.lanes=0,t}function Ao(t,e,n){return xa(e,t.child,null,n),t=Co(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function vf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),ks(t.return,e,n)}function To(t,e,n,a,r,s){var c=t.memoizedState;c===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:r,treeForkCount:s}:(c.isBackwards=e,c.rendering=null,c.renderingStartTime=0,c.last=a,c.tail=n,c.tailMode=r,c.treeForkCount=s)}function yf(t,e,n){var a=e.pendingProps,r=a.revealOrder,s=a.tail;a=a.children;var c=se.current,h=(c&2)!==0;if(h?(c=c&1|2,e.flags|=128):c&=1,T(se,c),Ae(t,e,a,n),a=Rt?Rl:0,!h&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&vf(t,n,e);else if(t.tag===19)vf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Ji(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),To(e,!1,r,n,s,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Ji(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}To(e,!0,n,null,s,a);break;case"together":To(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Nn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Qn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(Xa(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(u(153));if(e.child!==null){for(t=e.child,n=bn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=bn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function No(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&Fi(t)))}function Mg(t,e,n){switch(e.tag){case 3:$(e,e.stateNode.containerInfo),Ln(e,ce,t.memoizedState.cache),pa();break;case 27:case 5:yt(e);break;case 4:$(e,e.stateNode.containerInfo);break;case 10:Ln(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Zs(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(Vn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?gf(t,e,n):(Vn(e),t=Nn(t,e,n),t!==null?t.sibling:null);Vn(e);break;case 19:var r=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(Xa(t,e,n,!1),a=(n&e.childLanes)!==0),r){if(a)return yf(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),T(se,se.current),a)break;return null;case 22:return e.lanes=0,cf(t,e,n,e.pendingProps);case 24:Ln(e,ce,t.memoizedState.cache)}return Nn(t,e,n)}function bf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)fe=!0;else{if(!No(t,n)&&(e.flags&128)===0)return fe=!1,Mg(t,e,n);fe=(t.flags&131072)!==0}else fe=!1,Rt&&(e.flags&1048576)!==0&&Ic(e,Rl,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=ba(e.elementType),e.type=t,typeof t=="function")Ms(t)?(a=Aa(t,a),e.tag=1,e=mf(null,e,t,a,n)):(e.tag=0,e=yo(null,e,t,a,n));else{if(t!=null){var r=t.$$typeof;if(r===Ot){e.tag=11,e=sf(null,e,t,a,n);break t}else if(r===V){e.tag=14,e=of(null,e,t,a,n);break t}}throw e=gt(t)||t,Error(u(306,e,""))}}return e;case 0:return yo(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,r=Aa(a,e.pendingProps),mf(t,e,a,r,n);case 3:t:{if($(e,e.stateNode.containerInfo),t===null)throw Error(u(387));a=e.pendingProps;var s=e.memoizedState;r=s.element,Vs(t,e),Ll(e,a,null,n);var c=e.memoizedState;if(a=c.cache,Ln(e,ce,a),a!==s.cache&&Gs(e,[ce],n,!0),Pl(),a=c.element,s.isDehydrated)if(s={element:a,isDehydrated:!1,cache:c.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=pf(t,e,a,n);break t}else if(a!==r){r=$e(Error(u(424)),e),zl(r),e=pf(t,e,a,n);break t}else for(t=e.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,te=an(t.firstChild),xe=e,Rt=!0,Gn=null,en=!0,n=ud(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(pa(),a===r){e=Nn(t,e,n);break t}Ae(t,e,a,n)}e=e.child}return e;case 26:return or(t,e),t===null?(n=Dh(e.type,null,e.pendingProps,null))?e.memoizedState=n:Rt||(n=e.type,t=e.pendingProps,a=Nr(X.current).createElement(n),a[Se]=e,a[Re]=t,Te(a,n,t),ve(a),e.stateNode=a):e.memoizedState=Dh(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return yt(e),t===null&&Rt&&(a=e.stateNode=Eh(e.type,e.pendingProps,X.current),xe=e,en=!0,r=te,Wn(e.type)?(lu=r,te=an(a.firstChild)):te=r),Ae(t,e,e.pendingProps.children,n),or(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&Rt&&((r=a=te)&&(a=iv(a,e.type,e.pendingProps,en),a!==null?(e.stateNode=a,xe=e,te=an(a.firstChild),en=!1,r=!0):r=!1),r||Pn(e)),yt(e),r=e.type,s=e.pendingProps,c=t!==null?t.memoizedProps:null,a=s.children,Wo(r,s)?a=null:c!==null&&Wo(r,c)&&(e.flags|=32),e.memoizedState!==null&&(r=Js(t,e,Sg,null,null,n),ri._currentValue=r),or(t,e),Ae(t,e,a,n),e.child;case 6:return t===null&&Rt&&((t=n=te)&&(n=rv(n,e.pendingProps,en),n!==null?(e.stateNode=n,xe=e,te=null,t=!0):t=!1),t||Pn(e)),null;case 13:return gf(t,e,n);case 4:return $(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=xa(e,null,a,n):Ae(t,e,a,n),e.child;case 11:return sf(t,e,e.type,e.pendingProps,n);case 7:return Ae(t,e,e.pendingProps,n),e.child;case 8:return Ae(t,e,e.pendingProps.children,n),e.child;case 12:return Ae(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,Ln(e,e.type,a.value),Ae(t,e,a.children,n),e.child;case 9:return r=e.type._context,a=e.pendingProps.children,va(e),r=Ce(r),a=a(r),e.flags|=1,Ae(t,e,a,n),e.child;case 14:return of(t,e,e.type,e.pendingProps,n);case 15:return uf(t,e,e.type,e.pendingProps,n);case 19:return yf(t,e,n);case 31:return wg(t,e,n);case 22:return cf(t,e,n,e.pendingProps);case 24:return va(e),a=Ce(ce),t===null?(r=Bs(),r===null&&(r=It,s=Ps(),r.pooledCache=s,s.refCount++,s!==null&&(r.pooledCacheLanes|=n),r=s),e.memoizedState={parent:a,cache:r},Fs(e),Ln(e,ce,r)):((t.lanes&n)!==0&&(Vs(t,e),Ll(e,null,null,n),Pl()),r=t.memoizedState,s=e.memoizedState,r.parent!==a?(r={parent:a,cache:a},e.memoizedState=r,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=r),Ln(e,ce,a)):(a=s.cache,Ln(e,ce,a),a!==r.cache&&Gs(e,[ce],n,!0))),Ae(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(u(156,e.tag))}function _n(t){t.flags|=4}function _o(t,e,n,a,r){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(r&335544128)===r)if(t.stateNode.complete)t.flags|=8192;else if(Kf())t.flags|=8192;else throw Sa=Xi,qs}else t.flags&=-16777217}function Sf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Hh(e))if(Kf())t.flags|=8192;else throw Sa=Xi,qs}function cr(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?$u():536870912,t.lanes|=e,il|=e)}function Kl(t,e){if(!Rt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function ee(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,a|=r.subtreeFlags&65011712,a|=r.flags&65011712,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,a|=r.subtreeFlags,a|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Dg(t,e,n){var a=e.pendingProps;switch(zs(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ee(e),null;case 1:return ee(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Cn(ce),et(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Ka(e)?_n(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Hs())),ee(e),null;case 26:var r=e.type,s=e.memoizedState;return t===null?(_n(e),s!==null?(ee(e),Sf(e,s)):(ee(e),_o(e,r,null,a,n))):s?s!==t.memoizedState?(_n(e),ee(e),Sf(e,s)):(ee(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&_n(e),ee(e),_o(e,r,t,a,n)),null;case 27:if(ht(e),n=X.current,r=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&_n(e);else{if(!a){if(e.stateNode===null)throw Error(u(166));return ee(e),null}t=R.current,Ka(e)?$c(e):(t=Eh(r,a,n),e.stateNode=t,_n(e))}return ee(e),null;case 5:if(ht(e),r=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&_n(e);else{if(!a){if(e.stateNode===null)throw Error(u(166));return ee(e),null}if(s=R.current,Ka(e))$c(e);else{var c=Nr(X.current);switch(s){case 1:s=c.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:s=c.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":s=c.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":s=c.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":s=c.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof a.is=="string"?c.createElement("select",{is:a.is}):c.createElement("select"),a.multiple?s.multiple=!0:a.size&&(s.size=a.size);break;default:s=typeof a.is=="string"?c.createElement(r,{is:a.is}):c.createElement(r)}}s[Se]=e,s[Re]=a;t:for(c=e.child;c!==null;){if(c.tag===5||c.tag===6)s.appendChild(c.stateNode);else if(c.tag!==4&&c.tag!==27&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===e)break t;for(;c.sibling===null;){if(c.return===null||c.return===e)break t;c=c.return}c.sibling.return=c.return,c=c.sibling}e.stateNode=s;t:switch(Te(s,r,a),r){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&_n(e)}}return ee(e),_o(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&_n(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(u(166));if(t=X.current,Ka(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,r=xe,r!==null)switch(r.tag){case 27:case 5:a=r.memoizedProps}t[Se]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||gh(t.nodeValue,n)),t||Pn(e,!0)}else t=Nr(t).createTextNode(a),t[Se]=e,e.stateNode=t}return ee(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=Ka(e),n!==null){if(t===null){if(!a)throw Error(u(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(u(557));t[Se]=e}else pa(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;ee(e),t=!1}else n=Hs(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Ve(e),e):(Ve(e),null);if((e.flags&128)!==0)throw Error(u(558))}return ee(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(r=Ka(e),a!==null&&a.dehydrated!==null){if(t===null){if(!r)throw Error(u(318));if(r=e.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(u(317));r[Se]=e}else pa(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;ee(e),r=!1}else r=Hs(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=r),r=!0;if(!r)return e.flags&256?(Ve(e),e):(Ve(e),null)}return Ve(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,r=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(r=a.alternate.memoizedState.cachePool.pool),s=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(s=a.memoizedState.cachePool.pool),s!==r&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),cr(e,e.updateQueue),ee(e),null);case 4:return et(),t===null&&Qo(e.stateNode.containerInfo),ee(e),null;case 10:return Cn(e.type),ee(e),null;case 19:if(x(se),a=e.memoizedState,a===null)return ee(e),null;if(r=(e.flags&128)!==0,s=a.rendering,s===null)if(r)Kl(a,!1);else{if(ie!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(s=Ji(t),s!==null){for(e.flags|=128,Kl(a,!1),t=s.updateQueue,e.updateQueue=t,cr(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)Xc(n,t),n=n.sibling;return T(se,se.current&1|2),Rt&&Sn(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&Et()>pr&&(e.flags|=128,r=!0,Kl(a,!1),e.lanes=4194304)}else{if(!r)if(t=Ji(s),t!==null){if(e.flags|=128,r=!0,t=t.updateQueue,e.updateQueue=t,cr(e,t),Kl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!s.alternate&&!Rt)return ee(e),null}else 2*Et()-a.renderingStartTime>pr&&n!==536870912&&(e.flags|=128,r=!0,Kl(a,!1),e.lanes=4194304);a.isBackwards?(s.sibling=e.child,e.child=s):(t=a.last,t!==null?t.sibling=s:e.child=s,a.last=s)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Et(),t.sibling=null,n=se.current,T(se,r?n&1|2:n&1),Rt&&Sn(e,a.treeForkCount),t):(ee(e),null);case 22:case 23:return Ve(e),Qs(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(ee(e),e.subtreeFlags&6&&(e.flags|=8192)):ee(e),n=e.updateQueue,n!==null&&cr(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&x(ya),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Cn(ce),ee(e),null;case 25:return null;case 30:return null}throw Error(u(156,e.tag))}function jg(t,e){switch(zs(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Cn(ce),et(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return ht(e),null;case 31:if(e.memoizedState!==null){if(Ve(e),e.alternate===null)throw Error(u(340));pa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Ve(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(u(340));pa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return x(se),null;case 4:return et(),null;case 10:return Cn(e.type),null;case 22:case 23:return Ve(e),Qs(),t!==null&&x(ya),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Cn(ce),null;case 25:return null;default:return null}}function xf(t,e){switch(zs(e),e.tag){case 3:Cn(ce),et();break;case 26:case 27:case 5:ht(e);break;case 4:et();break;case 31:e.memoizedState!==null&&Ve(e);break;case 13:Ve(e);break;case 19:x(se);break;case 10:Cn(e.type);break;case 22:case 23:Ve(e),Qs(),t!==null&&x(ya);break;case 24:Cn(ce)}}function Xl(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var r=a.next;n=r;do{if((n.tag&t)===t){a=void 0;var s=n.create,c=n.inst;a=s(),c.destroy=a}n=n.next}while(n!==r)}}catch(h){Ft(e,e.return,h)}}function Kn(t,e,n){try{var a=e.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var s=r.next;a=s;do{if((a.tag&t)===t){var c=a.inst,h=c.destroy;if(h!==void 0){c.destroy=void 0,r=e;var S=n,j=h;try{j()}catch(k){Ft(r,S,k)}}}a=a.next}while(a!==s)}}catch(k){Ft(e,e.return,k)}}function Cf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{dd(e,n)}catch(a){Ft(t,t.return,a)}}}function Af(t,e,n){n.props=Aa(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){Ft(t,e,a)}}function Ql(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(r){Ft(t,e,r)}}function hn(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(r){Ft(t,e,r)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(r){Ft(t,e,r)}else n.current=null}function Tf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(r){Ft(t,t.return,r)}}function Eo(t,e,n){try{var a=t.stateNode;Wg(a,t.type,n,e),a[Re]=e}catch(r){Ft(t,t.return,r)}}function Nf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Wn(t.type)||t.tag===4}function wo(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Nf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Wn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Mo(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=vn));else if(a!==4&&(a===27&&Wn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Mo(t,e,n),t=t.sibling;t!==null;)Mo(t,e,n),t=t.sibling}function dr(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&Wn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(dr(t,e,n),t=t.sibling;t!==null;)dr(t,e,n),t=t.sibling}function _f(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,r=e.attributes;r.length;)e.removeAttributeNode(r[0]);Te(e,a,n),e[Se]=t,e[Re]=n}catch(s){Ft(t,t.return,s)}}var En=!1,he=!1,Do=!1,Ef=typeof WeakSet=="function"?WeakSet:Set,ye=null;function Rg(t,e){if(t=t.containerInfo,Jo=Rr,t=Gc(t),Cs(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var r=a.anchorOffset,s=a.focusNode;a=a.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break t}var c=0,h=-1,S=-1,j=0,k=0,B=t,z=null;e:for(;;){for(var H;B!==n||r!==0&&B.nodeType!==3||(h=c+r),B!==s||a!==0&&B.nodeType!==3||(S=c+a),B.nodeType===3&&(c+=B.nodeValue.length),(H=B.firstChild)!==null;)z=B,B=H;for(;;){if(B===t)break e;if(z===n&&++j===r&&(h=c),z===s&&++k===a&&(S=c),(H=B.nextSibling)!==null)break;B=z,z=B.parentNode}B=H}n=h===-1||S===-1?null:{start:h,end:S}}else n=null}n=n||{start:0,end:0}}else n=null;for($o={focusedElem:t,selectionRange:n},Rr=!1,ye=e;ye!==null;)if(e=ye,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ye=t;else for(;ye!==null;){switch(e=ye,s=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)r=t[n],r.ref.impl=r.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&s!==null){t=void 0,n=e,r=s.memoizedProps,s=s.memoizedState,a=n.stateNode;try{var lt=Aa(n.type,r);t=a.getSnapshotBeforeUpdate(lt,s),a.__reactInternalSnapshotBeforeUpdate=t}catch(mt){Ft(n,n.return,mt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)eu(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":eu(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(u(163))}if(t=e.sibling,t!==null){t.return=e.return,ye=t;break}ye=e.return}}function wf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Mn(t,n),a&4&&Xl(5,n);break;case 1:if(Mn(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(c){Ft(n,n.return,c)}else{var r=Aa(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(r,e,t.__reactInternalSnapshotBeforeUpdate)}catch(c){Ft(n,n.return,c)}}a&64&&Cf(n),a&512&&Ql(n,n.return);break;case 3:if(Mn(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{dd(t,e)}catch(c){Ft(n,n.return,c)}}break;case 27:e===null&&a&4&&_f(n);case 26:case 5:Mn(t,n),e===null&&a&4&&Tf(n),a&512&&Ql(n,n.return);break;case 12:Mn(t,n);break;case 31:Mn(t,n),a&4&&jf(t,n);break;case 13:Mn(t,n),a&4&&Rf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Bg.bind(null,n),sv(t,n))));break;case 22:if(a=n.memoizedState!==null||En,!a){e=e!==null&&e.memoizedState!==null||he,r=En;var s=he;En=a,(he=e)&&!s?Dn(t,n,(n.subtreeFlags&8772)!==0):Mn(t,n),En=r,he=s}break;case 30:break;default:Mn(t,n)}}function Mf(t){var e=t.alternate;e!==null&&(t.alternate=null,Mf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&is(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var ne=null,Oe=!1;function wn(t,e,n){for(n=n.child;n!==null;)Df(t,e,n),n=n.sibling}function Df(t,e,n){if(ue&&typeof ue.onCommitFiberUnmount=="function")try{ue.onCommitFiberUnmount(me,n)}catch{}switch(n.tag){case 26:he||hn(n,e),wn(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:he||hn(n,e);var a=ne,r=Oe;Wn(n.type)&&(ne=n.stateNode,Oe=!1),wn(t,e,n),ai(n.stateNode),ne=a,Oe=r;break;case 5:he||hn(n,e);case 6:if(a=ne,r=Oe,ne=null,wn(t,e,n),ne=a,Oe=r,ne!==null)if(Oe)try{(ne.nodeType===9?ne.body:ne.nodeName==="HTML"?ne.ownerDocument.body:ne).removeChild(n.stateNode)}catch(s){Ft(n,e,s)}else try{ne.removeChild(n.stateNode)}catch(s){Ft(n,e,s)}break;case 18:ne!==null&&(Oe?(t=ne,Ch(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),hl(t)):Ch(ne,n.stateNode));break;case 4:a=ne,r=Oe,ne=n.stateNode.containerInfo,Oe=!0,wn(t,e,n),ne=a,Oe=r;break;case 0:case 11:case 14:case 15:Kn(2,n,e),he||Kn(4,n,e),wn(t,e,n);break;case 1:he||(hn(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Af(n,e,a)),wn(t,e,n);break;case 21:wn(t,e,n);break;case 22:he=(a=he)||n.memoizedState!==null,wn(t,e,n),he=a;break;default:wn(t,e,n)}}function jf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{hl(t)}catch(n){Ft(e,e.return,n)}}}function Rf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{hl(t)}catch(n){Ft(e,e.return,n)}}function zg(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Ef),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Ef),e;default:throw Error(u(435,t.tag))}}function fr(t,e){var n=zg(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var r=qg.bind(null,t,a);a.then(r,r)}})}function He(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var r=n[a],s=t,c=e,h=c;t:for(;h!==null;){switch(h.tag){case 27:if(Wn(h.type)){ne=h.stateNode,Oe=!1;break t}break;case 5:ne=h.stateNode,Oe=!1;break t;case 3:case 4:ne=h.stateNode.containerInfo,Oe=!0;break t}h=h.return}if(ne===null)throw Error(u(160));Df(s,c,r),ne=null,Oe=!1,s=r.alternate,s!==null&&(s.return=null),r.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)zf(e,t),e=e.sibling}var on=null;function zf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:He(e,t),Ue(t),a&4&&(Kn(3,t,t.return),Xl(3,t),Kn(5,t,t.return));break;case 1:He(e,t),Ue(t),a&512&&(he||n===null||hn(n,n.return)),a&64&&En&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var r=on;if(He(e,t),Ue(t),a&512&&(he||n===null||hn(n,n.return)),a&4){var s=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,r=r.ownerDocument||r;e:switch(a){case"title":s=r.getElementsByTagName("title")[0],(!s||s[xl]||s[Se]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=r.createElement(a),r.head.insertBefore(s,r.querySelector("head > title"))),Te(s,a,n),s[Se]=t,ve(s),a=s;break t;case"link":var c=zh("link","href",r).get(a+(n.href||""));if(c){for(var h=0;h<c.length;h++)if(s=c[h],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){c.splice(h,1);break e}}s=r.createElement(a),Te(s,a,n),r.head.appendChild(s);break;case"meta":if(c=zh("meta","content",r).get(a+(n.content||""))){for(h=0;h<c.length;h++)if(s=c[h],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){c.splice(h,1);break e}}s=r.createElement(a),Te(s,a,n),r.head.appendChild(s);break;default:throw Error(u(468,a))}s[Se]=t,ve(s),a=s}t.stateNode=a}else Oh(r,t.type,t.stateNode);else t.stateNode=Rh(r,a,t.memoizedProps);else s!==a?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,a===null?Oh(r,t.type,t.stateNode):Rh(r,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Eo(t,t.memoizedProps,n.memoizedProps)}break;case 27:He(e,t),Ue(t),a&512&&(he||n===null||hn(n,n.return)),n!==null&&a&4&&Eo(t,t.memoizedProps,n.memoizedProps);break;case 5:if(He(e,t),Ue(t),a&512&&(he||n===null||hn(n,n.return)),t.flags&32){r=t.stateNode;try{Ua(r,"")}catch(lt){Ft(t,t.return,lt)}}a&4&&t.stateNode!=null&&(r=t.memoizedProps,Eo(t,r,n!==null?n.memoizedProps:r)),a&1024&&(Do=!0);break;case 6:if(He(e,t),Ue(t),a&4){if(t.stateNode===null)throw Error(u(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(lt){Ft(t,t.return,lt)}}break;case 3:if(wr=null,r=on,on=_r(e.containerInfo),He(e,t),on=r,Ue(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{hl(e.containerInfo)}catch(lt){Ft(t,t.return,lt)}Do&&(Do=!1,Of(t));break;case 4:a=on,on=_r(t.stateNode.containerInfo),He(e,t),Ue(t),on=a;break;case 12:He(e,t),Ue(t);break;case 31:He(e,t),Ue(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,fr(t,a)));break;case 13:He(e,t),Ue(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(mr=Et()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,fr(t,a)));break;case 22:r=t.memoizedState!==null;var S=n!==null&&n.memoizedState!==null,j=En,k=he;if(En=j||r,he=k||S,He(e,t),he=k,En=j,Ue(t),a&8192)t:for(e=t.stateNode,e._visibility=r?e._visibility&-2:e._visibility|1,r&&(n===null||S||En||he||Ta(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){S=n=e;try{if(s=S.stateNode,r)c=s.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none";else{h=S.stateNode;var B=S.memoizedProps.style,z=B!=null&&B.hasOwnProperty("display")?B.display:null;h.style.display=z==null||typeof z=="boolean"?"":(""+z).trim()}}catch(lt){Ft(S,S.return,lt)}}}else if(e.tag===6){if(n===null){S=e;try{S.stateNode.nodeValue=r?"":S.memoizedProps}catch(lt){Ft(S,S.return,lt)}}}else if(e.tag===18){if(n===null){S=e;try{var H=S.stateNode;r?Ah(H,!0):Ah(S.stateNode,!1)}catch(lt){Ft(S,S.return,lt)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,fr(t,n))));break;case 19:He(e,t),Ue(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,fr(t,a)));break;case 30:break;case 21:break;default:He(e,t),Ue(t)}}function Ue(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Nf(a)){n=a;break}a=a.return}if(n==null)throw Error(u(160));switch(n.tag){case 27:var r=n.stateNode,s=wo(t);dr(t,s,r);break;case 5:var c=n.stateNode;n.flags&32&&(Ua(c,""),n.flags&=-33);var h=wo(t);dr(t,h,c);break;case 3:case 4:var S=n.stateNode.containerInfo,j=wo(t);Mo(t,j,S);break;default:throw Error(u(161))}}catch(k){Ft(t,t.return,k)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Of(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Of(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Mn(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)wf(t,e.alternate,e),e=e.sibling}function Ta(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Kn(4,e,e.return),Ta(e);break;case 1:hn(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Af(e,e.return,n),Ta(e);break;case 27:ai(e.stateNode);case 26:case 5:hn(e,e.return),Ta(e);break;case 22:e.memoizedState===null&&Ta(e);break;case 30:Ta(e);break;default:Ta(e)}t=t.sibling}}function Dn(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,r=t,s=e,c=s.flags;switch(s.tag){case 0:case 11:case 15:Dn(r,s,n),Xl(4,s);break;case 1:if(Dn(r,s,n),a=s,r=a.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(j){Ft(a,a.return,j)}if(a=s,r=a.updateQueue,r!==null){var h=a.stateNode;try{var S=r.shared.hiddenCallbacks;if(S!==null)for(r.shared.hiddenCallbacks=null,r=0;r<S.length;r++)cd(S[r],h)}catch(j){Ft(a,a.return,j)}}n&&c&64&&Cf(s),Ql(s,s.return);break;case 27:_f(s);case 26:case 5:Dn(r,s,n),n&&a===null&&c&4&&Tf(s),Ql(s,s.return);break;case 12:Dn(r,s,n);break;case 31:Dn(r,s,n),n&&c&4&&jf(r,s);break;case 13:Dn(r,s,n),n&&c&4&&Rf(r,s);break;case 22:s.memoizedState===null&&Dn(r,s,n),Ql(s,s.return);break;case 30:break;default:Dn(r,s,n)}e=e.sibling}}function jo(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Ol(n))}function Ro(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Ol(t))}function un(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Hf(t,e,n,a),e=e.sibling}function Hf(t,e,n,a){var r=e.flags;switch(e.tag){case 0:case 11:case 15:un(t,e,n,a),r&2048&&Xl(9,e);break;case 1:un(t,e,n,a);break;case 3:un(t,e,n,a),r&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Ol(t)));break;case 12:if(r&2048){un(t,e,n,a),t=e.stateNode;try{var s=e.memoizedProps,c=s.id,h=s.onPostCommit;typeof h=="function"&&h(c,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(S){Ft(e,e.return,S)}}else un(t,e,n,a);break;case 31:un(t,e,n,a);break;case 13:un(t,e,n,a);break;case 23:break;case 22:s=e.stateNode,c=e.alternate,e.memoizedState!==null?s._visibility&2?un(t,e,n,a):Zl(t,e):s._visibility&2?un(t,e,n,a):(s._visibility|=2,nl(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),r&2048&&jo(c,e);break;case 24:un(t,e,n,a),r&2048&&Ro(e.alternate,e);break;default:un(t,e,n,a)}}function nl(t,e,n,a,r){for(r=r&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,c=e,h=n,S=a,j=c.flags;switch(c.tag){case 0:case 11:case 15:nl(s,c,h,S,r),Xl(8,c);break;case 23:break;case 22:var k=c.stateNode;c.memoizedState!==null?k._visibility&2?nl(s,c,h,S,r):Zl(s,c):(k._visibility|=2,nl(s,c,h,S,r)),r&&j&2048&&jo(c.alternate,c);break;case 24:nl(s,c,h,S,r),r&&j&2048&&Ro(c.alternate,c);break;default:nl(s,c,h,S,r)}e=e.sibling}}function Zl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,r=a.flags;switch(a.tag){case 22:Zl(n,a),r&2048&&jo(a.alternate,a);break;case 24:Zl(n,a),r&2048&&Ro(a.alternate,a);break;default:Zl(n,a)}e=e.sibling}}var Il=8192;function al(t,e,n){if(t.subtreeFlags&Il)for(t=t.child;t!==null;)Uf(t,e,n),t=t.sibling}function Uf(t,e,n){switch(t.tag){case 26:al(t,e,n),t.flags&Il&&t.memoizedState!==null&&bv(n,on,t.memoizedState,t.memoizedProps);break;case 5:al(t,e,n);break;case 3:case 4:var a=on;on=_r(t.stateNode.containerInfo),al(t,e,n),on=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=Il,Il=16777216,al(t,e,n),Il=a):al(t,e,n));break;default:al(t,e,n)}}function kf(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Jl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];ye=a,Pf(a,t)}kf(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Gf(t),t=t.sibling}function Gf(t){switch(t.tag){case 0:case 11:case 15:Jl(t),t.flags&2048&&Kn(9,t,t.return);break;case 3:Jl(t);break;case 12:Jl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,hr(t)):Jl(t);break;default:Jl(t)}}function hr(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];ye=a,Pf(a,t)}kf(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Kn(8,e,e.return),hr(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,hr(e));break;default:hr(e)}t=t.sibling}}function Pf(t,e){for(;ye!==null;){var n=ye;switch(n.tag){case 0:case 11:case 15:Kn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Ol(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,ye=a;else t:for(n=t;ye!==null;){a=ye;var r=a.sibling,s=a.return;if(Mf(a),a===n){ye=null;break t}if(r!==null){r.return=s,ye=r;break t}ye=s}}}var Og={getCacheForType:function(t){var e=Ce(ce),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ce(ce).controller.signal}},Hg=typeof WeakMap=="function"?WeakMap:Map,Lt=0,It=null,wt=null,Dt=0,qt=0,Ye=null,Xn=!1,ll=!1,zo=!1,jn=0,ie=0,Qn=0,Na=0,Oo=0,Ke=0,il=0,$l=null,ke=null,Ho=!1,mr=0,Lf=0,pr=1/0,gr=null,Zn=null,pe=0,In=null,rl=null,Rn=0,Uo=0,ko=null,Bf=null,Wl=0,Go=null;function Xe(){return(Lt&2)!==0&&Dt!==0?Dt&-Dt:O.T!==null?Vo():nc()}function qf(){if(Ke===0)if((Dt&536870912)===0||Rt){var t=Le;Le<<=1,(Le&3932160)===0&&(Le=262144),Ke=t}else Ke=536870912;return t=Fe.current,t!==null&&(t.flags|=32),Ke}function Ge(t,e,n){(t===It&&(qt===2||qt===9)||t.cancelPendingCommit!==null)&&(sl(t,0),Jn(t,Dt,Ke,!1)),Sl(t,n),((Lt&2)===0||t!==It)&&(t===It&&((Lt&2)===0&&(Na|=n),ie===4&&Jn(t,Dt,Ke,!1)),mn(t))}function Ff(t,e,n){if((Lt&6)!==0)throw Error(u(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||bl(t,e),r=a?Gg(t,e):Lo(t,e,!0),s=a;do{if(r===0){ll&&!a&&Jn(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!Ug(n)){r=Lo(t,e,!1),s=!1;continue}if(r===2){if(s=e,t.errorRecoveryDisabledLanes&s)var c=0;else c=t.pendingLanes&-536870913,c=c!==0?c:c&536870912?536870912:0;if(c!==0){e=c;t:{var h=t;r=$l;var S=h.current.memoizedState.isDehydrated;if(S&&(sl(h,c).flags|=256),c=Lo(h,c,!1),c!==2){if(zo&&!S){h.errorRecoveryDisabledLanes|=s,Na|=s,r=4;break t}s=ke,ke=r,s!==null&&(ke===null?ke=s:ke.push.apply(ke,s))}r=c}if(s=!1,r!==2)continue}}if(r===1){sl(t,0),Jn(t,e,0,!0);break}t:{switch(a=t,s=r,s){case 0:case 1:throw Error(u(345));case 4:if((e&4194048)!==e)break;case 6:Jn(a,e,Ke,!Xn);break t;case 2:ke=null;break;case 3:case 5:break;default:throw Error(u(329))}if((e&62914560)===e&&(r=mr+300-Et(),10<r)){if(Jn(a,e,Ke,!Xn),_i(a,0,!0)!==0)break t;Rn=e,a.timeoutHandle=Sh(Vf.bind(null,a,n,ke,gr,Ho,e,Ke,Na,il,Xn,s,"Throttled",-0,0),r);break t}Vf(a,n,ke,gr,Ho,e,Ke,Na,il,Xn,s,null,-0,0)}}break}while(!0);mn(t)}function Vf(t,e,n,a,r,s,c,h,S,j,k,B,z,H){if(t.timeoutHandle=-1,B=e.subtreeFlags,B&8192||(B&16785408)===16785408){B={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:vn},Uf(e,s,B);var lt=(s&62914560)===s?mr-Et():(s&4194048)===s?Lf-Et():0;if(lt=Sv(B,lt),lt!==null){Rn=s,t.cancelPendingCommit=lt($f.bind(null,t,e,s,n,a,r,c,h,S,k,B,null,z,H)),Jn(t,s,c,!j);return}}$f(t,e,s,n,a,r,c,h,S)}function Ug(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var r=n[a],s=r.getSnapshot;r=r.value;try{if(!Be(s(),r))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Jn(t,e,n,a){e&=~Oo,e&=~Na,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var r=e;0<r;){var s=31-tt(r),c=1<<s;a[s]=-1,r&=~c}n!==0&&Wu(t,n,e)}function vr(){return(Lt&6)===0?(ti(0),!1):!0}function Po(){if(wt!==null){if(qt===0)var t=wt.return;else t=wt,xn=ga=null,to(t),Ja=null,Ul=0,t=wt;for(;t!==null;)xf(t.alternate,t),t=t.return;wt=null}}function sl(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,nv(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Rn=0,Po(),It=t,wt=n=bn(t.current,null),Dt=e,qt=0,Ye=null,Xn=!1,ll=bl(t,e),zo=!1,il=Ke=Oo=Na=Qn=ie=0,ke=$l=null,Ho=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var r=31-tt(a),s=1<<r;e|=t[r],a&=~s}return jn=e,Gi(),n}function Yf(t,e){St=null,O.H=Vl,e===Ia||e===Ki?(e=rd(),qt=3):e===qs?(e=rd(),qt=4):qt=e===vo?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Ye=e,wt===null&&(ie=1,rr(t,$e(e,t.current)))}function Kf(){var t=Fe.current;return t===null?!0:(Dt&4194048)===Dt?nn===null:(Dt&62914560)===Dt||(Dt&536870912)!==0?t===nn:!1}function Xf(){var t=O.H;return O.H=Vl,t===null?Vl:t}function Qf(){var t=O.A;return O.A=Og,t}function yr(){ie=4,Xn||(Dt&4194048)!==Dt&&Fe.current!==null||(ll=!0),(Qn&134217727)===0&&(Na&134217727)===0||It===null||Jn(It,Dt,Ke,!1)}function Lo(t,e,n){var a=Lt;Lt|=2;var r=Xf(),s=Qf();(It!==t||Dt!==e)&&(gr=null,sl(t,e)),e=!1;var c=ie;t:do try{if(qt!==0&&wt!==null){var h=wt,S=Ye;switch(qt){case 8:Po(),c=6;break t;case 3:case 2:case 9:case 6:Fe.current===null&&(e=!0);var j=qt;if(qt=0,Ye=null,ol(t,h,S,j),n&&ll){c=0;break t}break;default:j=qt,qt=0,Ye=null,ol(t,h,S,j)}}kg(),c=ie;break}catch(k){Yf(t,k)}while(!0);return e&&t.shellSuspendCounter++,xn=ga=null,Lt=a,O.H=r,O.A=s,wt===null&&(It=null,Dt=0,Gi()),c}function kg(){for(;wt!==null;)Zf(wt)}function Gg(t,e){var n=Lt;Lt|=2;var a=Xf(),r=Qf();It!==t||Dt!==e?(gr=null,pr=Et()+500,sl(t,e)):ll=bl(t,e);t:do try{if(qt!==0&&wt!==null){e=wt;var s=Ye;e:switch(qt){case 1:qt=0,Ye=null,ol(t,e,s,1);break;case 2:case 9:if(ld(s)){qt=0,Ye=null,If(e);break}e=function(){qt!==2&&qt!==9||It!==t||(qt=7),mn(t)},s.then(e,e);break t;case 3:qt=7;break t;case 4:qt=5;break t;case 7:ld(s)?(qt=0,Ye=null,If(e)):(qt=0,Ye=null,ol(t,e,s,7));break;case 5:var c=null;switch(wt.tag){case 26:c=wt.memoizedState;case 5:case 27:var h=wt;if(c?Hh(c):h.stateNode.complete){qt=0,Ye=null;var S=h.sibling;if(S!==null)wt=S;else{var j=h.return;j!==null?(wt=j,br(j)):wt=null}break e}}qt=0,Ye=null,ol(t,e,s,5);break;case 6:qt=0,Ye=null,ol(t,e,s,6);break;case 8:Po(),ie=6;break t;default:throw Error(u(462))}}Pg();break}catch(k){Yf(t,k)}while(!0);return xn=ga=null,O.H=a,O.A=r,Lt=n,wt!==null?0:(It=null,Dt=0,Gi(),ie)}function Pg(){for(;wt!==null&&!be();)Zf(wt)}function Zf(t){var e=bf(t.alternate,t,jn);t.memoizedProps=t.pendingProps,e===null?br(t):wt=e}function If(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=hf(n,e,e.pendingProps,e.type,void 0,Dt);break;case 11:e=hf(n,e,e.pendingProps,e.type.render,e.ref,Dt);break;case 5:to(e);default:xf(n,e),e=wt=Xc(e,jn),e=bf(n,e,jn)}t.memoizedProps=t.pendingProps,e===null?br(t):wt=e}function ol(t,e,n,a){xn=ga=null,to(e),Ja=null,Ul=0;var r=e.return;try{if(Eg(t,r,e,n,Dt)){ie=1,rr(t,$e(n,t.current)),wt=null;return}}catch(s){if(r!==null)throw wt=r,s;ie=1,rr(t,$e(n,t.current)),wt=null;return}e.flags&32768?(Rt||a===1?t=!0:ll||(Dt&536870912)!==0?t=!1:(Xn=t=!0,(a===2||a===9||a===3||a===6)&&(a=Fe.current,a!==null&&a.tag===13&&(a.flags|=16384))),Jf(e,t)):br(e)}function br(t){var e=t;do{if((e.flags&32768)!==0){Jf(e,Xn);return}t=e.return;var n=Dg(e.alternate,e,jn);if(n!==null){wt=n;return}if(e=e.sibling,e!==null){wt=e;return}wt=e=t}while(e!==null);ie===0&&(ie=5)}function Jf(t,e){do{var n=jg(t.alternate,t);if(n!==null){n.flags&=32767,wt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){wt=t;return}wt=t=n}while(t!==null);ie=6,wt=null}function $f(t,e,n,a,r,s,c,h,S){t.cancelPendingCommit=null;do Sr();while(pe!==0);if((Lt&6)!==0)throw Error(u(327));if(e!==null){if(e===t.current)throw Error(u(177));if(s=e.lanes|e.childLanes,s|=Es,yp(t,n,s,c,h,S),t===It&&(wt=It=null,Dt=0),rl=e,In=t,Rn=n,Uo=s,ko=r,Bf=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Fg(ge,function(){return ah(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=O.T,O.T=null,r=L.p,L.p=2,c=Lt,Lt|=4;try{Rg(t,e,n)}finally{Lt=c,L.p=r,O.T=a}}pe=1,Wf(),th(),eh()}}function Wf(){if(pe===1){pe=0;var t=In,e=rl,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=O.T,O.T=null;var a=L.p;L.p=2;var r=Lt;Lt|=4;try{zf(e,t);var s=$o,c=Gc(t.containerInfo),h=s.focusedElem,S=s.selectionRange;if(c!==h&&h&&h.ownerDocument&&kc(h.ownerDocument.documentElement,h)){if(S!==null&&Cs(h)){var j=S.start,k=S.end;if(k===void 0&&(k=j),"selectionStart"in h)h.selectionStart=j,h.selectionEnd=Math.min(k,h.value.length);else{var B=h.ownerDocument||document,z=B&&B.defaultView||window;if(z.getSelection){var H=z.getSelection(),lt=h.textContent.length,mt=Math.min(S.start,lt),Qt=S.end===void 0?mt:Math.min(S.end,lt);!H.extend&&mt>Qt&&(c=Qt,Qt=mt,mt=c);var M=Uc(h,mt),N=Uc(h,Qt);if(M&&N&&(H.rangeCount!==1||H.anchorNode!==M.node||H.anchorOffset!==M.offset||H.focusNode!==N.node||H.focusOffset!==N.offset)){var D=B.createRange();D.setStart(M.node,M.offset),H.removeAllRanges(),mt>Qt?(H.addRange(D),H.extend(N.node,N.offset)):(D.setEnd(N.node,N.offset),H.addRange(D))}}}}for(B=[],H=h;H=H.parentNode;)H.nodeType===1&&B.push({element:H,left:H.scrollLeft,top:H.scrollTop});for(typeof h.focus=="function"&&h.focus(),h=0;h<B.length;h++){var P=B[h];P.element.scrollLeft=P.left,P.element.scrollTop=P.top}}Rr=!!Jo,$o=Jo=null}finally{Lt=r,L.p=a,O.T=n}}t.current=e,pe=2}}function th(){if(pe===2){pe=0;var t=In,e=rl,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=O.T,O.T=null;var a=L.p;L.p=2;var r=Lt;Lt|=4;try{wf(t,e.alternate,e)}finally{Lt=r,L.p=a,O.T=n}}pe=3}}function eh(){if(pe===4||pe===3){pe=0,Qe();var t=In,e=rl,n=Rn,a=Bf;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?pe=5:(pe=0,rl=In=null,nh(t,t.pendingLanes));var r=t.pendingLanes;if(r===0&&(Zn=null),as(n),e=e.stateNode,ue&&typeof ue.onCommitFiberRoot=="function")try{ue.onCommitFiberRoot(me,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=O.T,r=L.p,L.p=2,O.T=null;try{for(var s=t.onRecoverableError,c=0;c<a.length;c++){var h=a[c];s(h.value,{componentStack:h.stack})}}finally{O.T=e,L.p=r}}(Rn&3)!==0&&Sr(),mn(t),r=t.pendingLanes,(n&261930)!==0&&(r&42)!==0?t===Go?Wl++:(Wl=0,Go=t):Wl=0,ti(0)}}function nh(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Ol(e)))}function Sr(){return Wf(),th(),eh(),ah()}function ah(){if(pe!==5)return!1;var t=In,e=Uo;Uo=0;var n=as(Rn),a=O.T,r=L.p;try{L.p=32>n?32:n,O.T=null,n=ko,ko=null;var s=In,c=Rn;if(pe=0,rl=In=null,Rn=0,(Lt&6)!==0)throw Error(u(331));var h=Lt;if(Lt|=4,Gf(s.current),Hf(s,s.current,c,n),Lt=h,ti(0,!1),ue&&typeof ue.onPostCommitFiberRoot=="function")try{ue.onPostCommitFiberRoot(me,s)}catch{}return!0}finally{L.p=r,O.T=a,nh(t,e)}}function lh(t,e,n){e=$e(n,e),e=go(t.stateNode,e,2),t=Fn(t,e,2),t!==null&&(Sl(t,2),mn(t))}function Ft(t,e,n){if(t.tag===3)lh(t,t,n);else for(;e!==null;){if(e.tag===3){lh(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Zn===null||!Zn.has(a))){t=$e(n,t),n=lf(2),a=Fn(e,n,2),a!==null&&(rf(n,a,e,t),Sl(a,2),mn(a));break}}e=e.return}}function Bo(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new Hg;var r=new Set;a.set(e,r)}else r=a.get(e),r===void 0&&(r=new Set,a.set(e,r));r.has(n)||(zo=!0,r.add(n),t=Lg.bind(null,t,e,n),e.then(t,t))}function Lg(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,It===t&&(Dt&n)===n&&(ie===4||ie===3&&(Dt&62914560)===Dt&&300>Et()-mr?(Lt&2)===0&&sl(t,0):Oo|=n,il===Dt&&(il=0)),mn(t)}function ih(t,e){e===0&&(e=$u()),t=ha(t,e),t!==null&&(Sl(t,e),mn(t))}function Bg(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),ih(t,n)}function qg(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(u(314))}a!==null&&a.delete(e),ih(t,n)}function Fg(t,e){return Zt(t,e)}var xr=null,ul=null,qo=!1,Cr=!1,Fo=!1,$n=0;function mn(t){t!==ul&&t.next===null&&(ul===null?xr=ul=t:ul=ul.next=t),Cr=!0,qo||(qo=!0,Yg())}function ti(t,e){if(!Fo&&Cr){Fo=!0;do for(var n=!1,a=xr;a!==null;){if(t!==0){var r=a.pendingLanes;if(r===0)var s=0;else{var c=a.suspendedLanes,h=a.pingedLanes;s=(1<<31-tt(42|t)+1)-1,s&=r&~(c&~h),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,uh(a,s))}else s=Dt,s=_i(a,a===It?s:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(s&3)===0||bl(a,s)||(n=!0,uh(a,s));a=a.next}while(n);Fo=!1}}function Vg(){rh()}function rh(){Cr=qo=!1;var t=0;$n!==0&&ev()&&(t=$n);for(var e=Et(),n=null,a=xr;a!==null;){var r=a.next,s=sh(a,e);s===0?(a.next=null,n===null?xr=r:n.next=r,r===null&&(ul=n)):(n=a,(t!==0||(s&3)!==0)&&(Cr=!0)),a=r}pe!==0&&pe!==5||ti(t),$n!==0&&($n=0)}function sh(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var c=31-tt(s),h=1<<c,S=r[c];S===-1?((h&n)===0||(h&a)!==0)&&(r[c]=vp(h,e)):S<=e&&(t.expiredLanes|=h),s&=~h}if(e=It,n=Dt,n=_i(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(qt===2||qt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&De(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||bl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&De(a),as(n)){case 2:case 8:n=re;break;case 32:n=ge;break;case 268435456:n=rt;break;default:n=ge}return a=oh.bind(null,t),n=Zt(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&De(a),t.callbackPriority=2,t.callbackNode=null,2}function oh(t,e){if(pe!==0&&pe!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Sr()&&t.callbackNode!==n)return null;var a=Dt;return a=_i(t,t===It?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(Ff(t,a,e),sh(t,Et()),t.callbackNode!=null&&t.callbackNode===n?oh.bind(null,t):null)}function uh(t,e){if(Sr())return null;Ff(t,e,!0)}function Yg(){av(function(){(Lt&6)!==0?Zt(Wt,Vg):rh()})}function Vo(){if($n===0){var t=Qa;t===0&&(t=je,je<<=1,(je&261888)===0&&(je=256)),$n=t}return $n}function ch(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Di(""+t)}function dh(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function Kg(t,e,n,a,r){if(e==="submit"&&n&&n.stateNode===r){var s=ch((r[Re]||null).action),c=a.submitter;c&&(e=(e=c[Re]||null)?ch(e.formAction):c.getAttribute("formAction"),e!==null&&(s=e,c=null));var h=new Oi("action","action",null,a,r);t.push({event:h,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if($n!==0){var S=c?dh(r,c):new FormData(r);uo(n,{pending:!0,data:S,method:r.method,action:s},null,S)}}else typeof s=="function"&&(h.preventDefault(),S=c?dh(r,c):new FormData(r),uo(n,{pending:!0,data:S,method:r.method,action:s},s,S))},currentTarget:r}]})}}for(var Yo=0;Yo<_s.length;Yo++){var Ko=_s[Yo],Xg=Ko.toLowerCase(),Qg=Ko[0].toUpperCase()+Ko.slice(1);sn(Xg,"on"+Qg)}sn(Bc,"onAnimationEnd"),sn(qc,"onAnimationIteration"),sn(Fc,"onAnimationStart"),sn("dblclick","onDoubleClick"),sn("focusin","onFocus"),sn("focusout","onBlur"),sn(cg,"onTransitionRun"),sn(dg,"onTransitionStart"),sn(fg,"onTransitionCancel"),sn(Vc,"onTransitionEnd"),Oa("onMouseEnter",["mouseout","mouseover"]),Oa("onMouseLeave",["mouseout","mouseover"]),Oa("onPointerEnter",["pointerout","pointerover"]),Oa("onPointerLeave",["pointerout","pointerover"]),ua("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ua("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ua("onBeforeInput",["compositionend","keypress","textInput","paste"]),ua("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ua("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ua("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ei="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zg=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ei));function fh(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],r=a.event;a=a.listeners;t:{var s=void 0;if(e)for(var c=a.length-1;0<=c;c--){var h=a[c],S=h.instance,j=h.currentTarget;if(h=h.listener,S!==s&&r.isPropagationStopped())break t;s=h,r.currentTarget=j;try{s(r)}catch(k){ki(k)}r.currentTarget=null,s=S}else for(c=0;c<a.length;c++){if(h=a[c],S=h.instance,j=h.currentTarget,h=h.listener,S!==s&&r.isPropagationStopped())break t;s=h,r.currentTarget=j;try{s(r)}catch(k){ki(k)}r.currentTarget=null,s=S}}}}function Mt(t,e){var n=e[ls];n===void 0&&(n=e[ls]=new Set);var a=t+"__bubble";n.has(a)||(hh(e,t,2,!1),n.add(a))}function Xo(t,e,n){var a=0;e&&(a|=4),hh(n,t,a,e)}var Ar="_reactListening"+Math.random().toString(36).slice(2);function Qo(t){if(!t[Ar]){t[Ar]=!0,ic.forEach(function(n){n!=="selectionchange"&&(Zg.has(n)||Xo(n,!1,t),Xo(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ar]||(e[Ar]=!0,Xo("selectionchange",!1,e))}}function hh(t,e,n,a){switch(qh(e)){case 2:var r=Av;break;case 8:r=Tv;break;default:r=uu}n=r.bind(null,e,n,t),r=void 0,!hs||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),a?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Zo(t,e,n,a,r){var s=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var c=a.tag;if(c===3||c===4){var h=a.stateNode.containerInfo;if(h===r)break;if(c===4)for(c=a.return;c!==null;){var S=c.tag;if((S===3||S===4)&&c.stateNode.containerInfo===r)return;c=c.return}for(;h!==null;){if(c=ja(h),c===null)return;if(S=c.tag,S===5||S===6||S===26||S===27){a=s=c;continue t}h=h.parentNode}}a=a.return}vc(function(){var j=s,k=ds(n),B=[];t:{var z=Yc.get(t);if(z!==void 0){var H=Oi,lt=t;switch(t){case"keypress":if(Ri(n)===0)break t;case"keydown":case"keyup":H=qp;break;case"focusin":lt="focus",H=vs;break;case"focusout":lt="blur",H=vs;break;case"beforeblur":case"afterblur":H=vs;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":H=Sc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":H=Dp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":H=Yp;break;case Bc:case qc:case Fc:H=zp;break;case Vc:H=Xp;break;case"scroll":case"scrollend":H=wp;break;case"wheel":H=Zp;break;case"copy":case"cut":case"paste":H=Hp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":H=Cc;break;case"toggle":case"beforetoggle":H=Jp}var mt=(e&4)!==0,Qt=!mt&&(t==="scroll"||t==="scrollend"),M=mt?z!==null?z+"Capture":null:z;mt=[];for(var N=j,D;N!==null;){var P=N;if(D=P.stateNode,P=P.tag,P!==5&&P!==26&&P!==27||D===null||M===null||(P=Al(N,M),P!=null&&mt.push(ni(N,P,D))),Qt)break;N=N.return}0<mt.length&&(z=new H(z,lt,null,n,k),B.push({event:z,listeners:mt}))}}if((e&7)===0){t:{if(z=t==="mouseover"||t==="pointerover",H=t==="mouseout"||t==="pointerout",z&&n!==cs&&(lt=n.relatedTarget||n.fromElement)&&(ja(lt)||lt[Da]))break t;if((H||z)&&(z=k.window===k?k:(z=k.ownerDocument)?z.defaultView||z.parentWindow:window,H?(lt=n.relatedTarget||n.toElement,H=j,lt=lt?ja(lt):null,lt!==null&&(Qt=f(lt),mt=lt.tag,lt!==Qt||mt!==5&&mt!==27&&mt!==6)&&(lt=null)):(H=null,lt=j),H!==lt)){if(mt=Sc,P="onMouseLeave",M="onMouseEnter",N="mouse",(t==="pointerout"||t==="pointerover")&&(mt=Cc,P="onPointerLeave",M="onPointerEnter",N="pointer"),Qt=H==null?z:Cl(H),D=lt==null?z:Cl(lt),z=new mt(P,N+"leave",H,n,k),z.target=Qt,z.relatedTarget=D,P=null,ja(k)===j&&(mt=new mt(M,N+"enter",lt,n,k),mt.target=D,mt.relatedTarget=Qt,P=mt),Qt=P,H&&lt)e:{for(mt=Ig,M=H,N=lt,D=0,P=M;P;P=mt(P))D++;P=0;for(var ct=N;ct;ct=mt(ct))P++;for(;0<D-P;)M=mt(M),D--;for(;0<P-D;)N=mt(N),P--;for(;D--;){if(M===N||N!==null&&M===N.alternate){mt=M;break e}M=mt(M),N=mt(N)}mt=null}else mt=null;H!==null&&mh(B,z,H,mt,!1),lt!==null&&Qt!==null&&mh(B,Qt,lt,mt,!0)}}t:{if(z=j?Cl(j):window,H=z.nodeName&&z.nodeName.toLowerCase(),H==="select"||H==="input"&&z.type==="file")var kt=Dc;else if(wc(z))if(jc)kt=sg;else{kt=ig;var st=lg}else H=z.nodeName,!H||H.toLowerCase()!=="input"||z.type!=="checkbox"&&z.type!=="radio"?j&&us(j.elementType)&&(kt=Dc):kt=rg;if(kt&&(kt=kt(t,j))){Mc(B,kt,n,k);break t}st&&st(t,z,j),t==="focusout"&&j&&z.type==="number"&&j.memoizedProps.value!=null&&os(z,"number",z.value)}switch(st=j?Cl(j):window,t){case"focusin":(wc(st)||st.contentEditable==="true")&&(La=st,As=j,jl=null);break;case"focusout":jl=As=La=null;break;case"mousedown":Ts=!0;break;case"contextmenu":case"mouseup":case"dragend":Ts=!1,Pc(B,n,k);break;case"selectionchange":if(ug)break;case"keydown":case"keyup":Pc(B,n,k)}var At;if(bs)t:{switch(t){case"compositionstart":var jt="onCompositionStart";break t;case"compositionend":jt="onCompositionEnd";break t;case"compositionupdate":jt="onCompositionUpdate";break t}jt=void 0}else Pa?_c(t,n)&&(jt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(jt="onCompositionStart");jt&&(Ac&&n.locale!=="ko"&&(Pa||jt!=="onCompositionStart"?jt==="onCompositionEnd"&&Pa&&(At=yc()):(Un=k,ms="value"in Un?Un.value:Un.textContent,Pa=!0)),st=Tr(j,jt),0<st.length&&(jt=new xc(jt,t,null,n,k),B.push({event:jt,listeners:st}),At?jt.data=At:(At=Ec(n),At!==null&&(jt.data=At)))),(At=Wp?tg(t,n):eg(t,n))&&(jt=Tr(j,"onBeforeInput"),0<jt.length&&(st=new xc("onBeforeInput","beforeinput",null,n,k),B.push({event:st,listeners:jt}),st.data=At)),Kg(B,t,j,n,k)}fh(B,e)})}function ni(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Tr(t,e){for(var n=e+"Capture",a=[];t!==null;){var r=t,s=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||s===null||(r=Al(t,n),r!=null&&a.unshift(ni(t,r,s)),r=Al(t,e),r!=null&&a.push(ni(t,r,s))),t.tag===3)return a;t=t.return}return[]}function Ig(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function mh(t,e,n,a,r){for(var s=e._reactName,c=[];n!==null&&n!==a;){var h=n,S=h.alternate,j=h.stateNode;if(h=h.tag,S!==null&&S===a)break;h!==5&&h!==26&&h!==27||j===null||(S=j,r?(j=Al(n,s),j!=null&&c.unshift(ni(n,j,S))):r||(j=Al(n,s),j!=null&&c.push(ni(n,j,S)))),n=n.return}c.length!==0&&t.push({event:e,listeners:c})}var Jg=/\r\n?/g,$g=/\u0000|\uFFFD/g;function ph(t){return(typeof t=="string"?t:""+t).replace(Jg,`
`).replace($g,"")}function gh(t,e){return e=ph(e),ph(t)===e}function Xt(t,e,n,a,r,s){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||Ua(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&Ua(t,""+a);break;case"className":wi(t,"class",a);break;case"tabIndex":wi(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":wi(t,n,a);break;case"style":pc(t,a,s);break;case"data":if(e!=="object"){wi(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Di(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Xt(t,e,"name",r.name,r,null),Xt(t,e,"formEncType",r.formEncType,r,null),Xt(t,e,"formMethod",r.formMethod,r,null),Xt(t,e,"formTarget",r.formTarget,r,null)):(Xt(t,e,"encType",r.encType,r,null),Xt(t,e,"method",r.method,r,null),Xt(t,e,"target",r.target,r,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Di(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=vn);break;case"onScroll":a!=null&&Mt("scroll",t);break;case"onScrollEnd":a!=null&&Mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(u(61));if(n=a.__html,n!=null){if(r.children!=null)throw Error(u(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Di(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":Mt("beforetoggle",t),Mt("toggle",t),Ei(t,"popover",a);break;case"xlinkActuate":gn(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":gn(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":gn(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":gn(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":gn(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":gn(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":gn(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":gn(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":gn(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Ei(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=_p.get(n)||n,Ei(t,n,a))}}function Io(t,e,n,a,r,s){switch(n){case"style":pc(t,a,s);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(u(61));if(n=a.__html,n!=null){if(r.children!=null)throw Error(u(60));t.innerHTML=n}}break;case"children":typeof a=="string"?Ua(t,a):(typeof a=="number"||typeof a=="bigint")&&Ua(t,""+a);break;case"onScroll":a!=null&&Mt("scroll",t);break;case"onScrollEnd":a!=null&&Mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=vn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!rc.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(r=n.endsWith("Capture"),e=n.slice(2,r?n.length-7:void 0),s=t[Re]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,r),typeof a=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,r);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Ei(t,n,a)}}}function Te(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Mt("error",t),Mt("load",t);var a=!1,r=!1,s;for(s in n)if(n.hasOwnProperty(s)){var c=n[s];if(c!=null)switch(s){case"src":a=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(u(137,e));default:Xt(t,e,s,c,n,null)}}r&&Xt(t,e,"srcSet",n.srcSet,n,null),a&&Xt(t,e,"src",n.src,n,null);return;case"input":Mt("invalid",t);var h=s=c=r=null,S=null,j=null;for(a in n)if(n.hasOwnProperty(a)){var k=n[a];if(k!=null)switch(a){case"name":r=k;break;case"type":c=k;break;case"checked":S=k;break;case"defaultChecked":j=k;break;case"value":s=k;break;case"defaultValue":h=k;break;case"children":case"dangerouslySetInnerHTML":if(k!=null)throw Error(u(137,e));break;default:Xt(t,e,a,k,n,null)}}dc(t,s,h,S,j,c,r,!1);return;case"select":Mt("invalid",t),a=c=s=null;for(r in n)if(n.hasOwnProperty(r)&&(h=n[r],h!=null))switch(r){case"value":s=h;break;case"defaultValue":c=h;break;case"multiple":a=h;default:Xt(t,e,r,h,n,null)}e=s,n=c,t.multiple=!!a,e!=null?Ha(t,!!a,e,!1):n!=null&&Ha(t,!!a,n,!0);return;case"textarea":Mt("invalid",t),s=r=a=null;for(c in n)if(n.hasOwnProperty(c)&&(h=n[c],h!=null))switch(c){case"value":a=h;break;case"defaultValue":r=h;break;case"children":s=h;break;case"dangerouslySetInnerHTML":if(h!=null)throw Error(u(91));break;default:Xt(t,e,c,h,n,null)}hc(t,a,r,s);return;case"option":for(S in n)n.hasOwnProperty(S)&&(a=n[S],a!=null)&&(S==="selected"?t.selected=a&&typeof a!="function"&&typeof a!="symbol":Xt(t,e,S,a,n,null));return;case"dialog":Mt("beforetoggle",t),Mt("toggle",t),Mt("cancel",t),Mt("close",t);break;case"iframe":case"object":Mt("load",t);break;case"video":case"audio":for(a=0;a<ei.length;a++)Mt(ei[a],t);break;case"image":Mt("error",t),Mt("load",t);break;case"details":Mt("toggle",t);break;case"embed":case"source":case"link":Mt("error",t),Mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(j in n)if(n.hasOwnProperty(j)&&(a=n[j],a!=null))switch(j){case"children":case"dangerouslySetInnerHTML":throw Error(u(137,e));default:Xt(t,e,j,a,n,null)}return;default:if(us(e)){for(k in n)n.hasOwnProperty(k)&&(a=n[k],a!==void 0&&Io(t,e,k,a,n,void 0));return}}for(h in n)n.hasOwnProperty(h)&&(a=n[h],a!=null&&Xt(t,e,h,a,n,null))}function Wg(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,s=null,c=null,h=null,S=null,j=null,k=null;for(H in n){var B=n[H];if(n.hasOwnProperty(H)&&B!=null)switch(H){case"checked":break;case"value":break;case"defaultValue":S=B;default:a.hasOwnProperty(H)||Xt(t,e,H,null,a,B)}}for(var z in a){var H=a[z];if(B=n[z],a.hasOwnProperty(z)&&(H!=null||B!=null))switch(z){case"type":s=H;break;case"name":r=H;break;case"checked":j=H;break;case"defaultChecked":k=H;break;case"value":c=H;break;case"defaultValue":h=H;break;case"children":case"dangerouslySetInnerHTML":if(H!=null)throw Error(u(137,e));break;default:H!==B&&Xt(t,e,z,H,a,B)}}ss(t,c,h,S,j,k,s,r);return;case"select":H=c=h=z=null;for(s in n)if(S=n[s],n.hasOwnProperty(s)&&S!=null)switch(s){case"value":break;case"multiple":H=S;default:a.hasOwnProperty(s)||Xt(t,e,s,null,a,S)}for(r in a)if(s=a[r],S=n[r],a.hasOwnProperty(r)&&(s!=null||S!=null))switch(r){case"value":z=s;break;case"defaultValue":h=s;break;case"multiple":c=s;default:s!==S&&Xt(t,e,r,s,a,S)}e=h,n=c,a=H,z!=null?Ha(t,!!n,z,!1):!!a!=!!n&&(e!=null?Ha(t,!!n,e,!0):Ha(t,!!n,n?[]:"",!1));return;case"textarea":H=z=null;for(h in n)if(r=n[h],n.hasOwnProperty(h)&&r!=null&&!a.hasOwnProperty(h))switch(h){case"value":break;case"children":break;default:Xt(t,e,h,null,a,r)}for(c in a)if(r=a[c],s=n[c],a.hasOwnProperty(c)&&(r!=null||s!=null))switch(c){case"value":z=r;break;case"defaultValue":H=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(u(91));break;default:r!==s&&Xt(t,e,c,r,a,s)}fc(t,z,H);return;case"option":for(var lt in n)z=n[lt],n.hasOwnProperty(lt)&&z!=null&&!a.hasOwnProperty(lt)&&(lt==="selected"?t.selected=!1:Xt(t,e,lt,null,a,z));for(S in a)z=a[S],H=n[S],a.hasOwnProperty(S)&&z!==H&&(z!=null||H!=null)&&(S==="selected"?t.selected=z&&typeof z!="function"&&typeof z!="symbol":Xt(t,e,S,z,a,H));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var mt in n)z=n[mt],n.hasOwnProperty(mt)&&z!=null&&!a.hasOwnProperty(mt)&&Xt(t,e,mt,null,a,z);for(j in a)if(z=a[j],H=n[j],a.hasOwnProperty(j)&&z!==H&&(z!=null||H!=null))switch(j){case"children":case"dangerouslySetInnerHTML":if(z!=null)throw Error(u(137,e));break;default:Xt(t,e,j,z,a,H)}return;default:if(us(e)){for(var Qt in n)z=n[Qt],n.hasOwnProperty(Qt)&&z!==void 0&&!a.hasOwnProperty(Qt)&&Io(t,e,Qt,void 0,a,z);for(k in a)z=a[k],H=n[k],!a.hasOwnProperty(k)||z===H||z===void 0&&H===void 0||Io(t,e,k,z,a,H);return}}for(var M in n)z=n[M],n.hasOwnProperty(M)&&z!=null&&!a.hasOwnProperty(M)&&Xt(t,e,M,null,a,z);for(B in a)z=a[B],H=n[B],!a.hasOwnProperty(B)||z===H||z==null&&H==null||Xt(t,e,B,z,a,H)}function vh(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function tv(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var r=n[a],s=r.transferSize,c=r.initiatorType,h=r.duration;if(s&&h&&vh(c)){for(c=0,h=r.responseEnd,a+=1;a<n.length;a++){var S=n[a],j=S.startTime;if(j>h)break;var k=S.transferSize,B=S.initiatorType;k&&vh(B)&&(S=S.responseEnd,c+=k*(S<h?1:(h-j)/(S-j)))}if(--a,e+=8*(s+c)/(r.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Jo=null,$o=null;function Nr(t){return t.nodeType===9?t:t.ownerDocument}function yh(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function bh(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Wo(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var tu=null;function ev(){var t=window.event;return t&&t.type==="popstate"?t===tu?!1:(tu=t,!0):(tu=null,!1)}var Sh=typeof setTimeout=="function"?setTimeout:void 0,nv=typeof clearTimeout=="function"?clearTimeout:void 0,xh=typeof Promise=="function"?Promise:void 0,av=typeof queueMicrotask=="function"?queueMicrotask:typeof xh<"u"?function(t){return xh.resolve(null).then(t).catch(lv)}:Sh;function lv(t){setTimeout(function(){throw t})}function Wn(t){return t==="head"}function Ch(t,e){var n=e,a=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(r),hl(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")ai(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,ai(n);for(var s=n.firstChild;s;){var c=s.nextSibling,h=s.nodeName;s[xl]||h==="SCRIPT"||h==="STYLE"||h==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=c}}else n==="body"&&ai(t.ownerDocument.body);n=r}while(n);hl(e)}function Ah(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function eu(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":eu(n),is(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function iv(t,e,n,a){for(;t.nodeType===1;){var r=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[xl])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==r.rel||t.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||t.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||t.getAttribute("title")!==(r.title==null?null:r.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(r.src==null?null:r.src)||t.getAttribute("type")!==(r.type==null?null:r.type)||t.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=r.name==null?null:""+r.name;if(r.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=an(t.nextSibling),t===null)break}return null}function rv(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=an(t.nextSibling),t===null))return null;return t}function Th(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=an(t.nextSibling),t===null))return null;return t}function nu(t){return t.data==="$?"||t.data==="$~"}function au(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function sv(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function an(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var lu=null;function Nh(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return an(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function _h(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Eh(t,e,n){switch(e=Nr(n),t){case"html":if(t=e.documentElement,!t)throw Error(u(452));return t;case"head":if(t=e.head,!t)throw Error(u(453));return t;case"body":if(t=e.body,!t)throw Error(u(454));return t;default:throw Error(u(451))}}function ai(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);is(t)}var ln=new Map,wh=new Set;function _r(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var zn=L.d;L.d={f:ov,r:uv,D:cv,C:dv,L:fv,m:hv,X:pv,S:mv,M:gv};function ov(){var t=zn.f(),e=vr();return t||e}function uv(t){var e=Ra(t);e!==null&&e.tag===5&&e.type==="form"?Vd(e):zn.r(t)}var cl=typeof document>"u"?null:document;function Mh(t,e,n){var a=cl;if(a&&typeof e=="string"&&e){var r=Ie(e);r='link[rel="'+t+'"][href="'+r+'"]',typeof n=="string"&&(r+='[crossorigin="'+n+'"]'),wh.has(r)||(wh.add(r),t={rel:t,crossOrigin:n,href:e},a.querySelector(r)===null&&(e=a.createElement("link"),Te(e,"link",t),ve(e),a.head.appendChild(e)))}}function cv(t){zn.D(t),Mh("dns-prefetch",t,null)}function dv(t,e){zn.C(t,e),Mh("preconnect",t,e)}function fv(t,e,n){zn.L(t,e,n);var a=cl;if(a&&t&&e){var r='link[rel="preload"][as="'+Ie(e)+'"]';e==="image"&&n&&n.imageSrcSet?(r+='[imagesrcset="'+Ie(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(r+='[imagesizes="'+Ie(n.imageSizes)+'"]')):r+='[href="'+Ie(t)+'"]';var s=r;switch(e){case"style":s=dl(t);break;case"script":s=fl(t)}ln.has(s)||(t=v({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),ln.set(s,t),a.querySelector(r)!==null||e==="style"&&a.querySelector(li(s))||e==="script"&&a.querySelector(ii(s))||(e=a.createElement("link"),Te(e,"link",t),ve(e),a.head.appendChild(e)))}}function hv(t,e){zn.m(t,e);var n=cl;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",r='link[rel="modulepreload"][as="'+Ie(a)+'"][href="'+Ie(t)+'"]',s=r;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=fl(t)}if(!ln.has(s)&&(t=v({rel:"modulepreload",href:t},e),ln.set(s,t),n.querySelector(r)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(ii(s)))return}a=n.createElement("link"),Te(a,"link",t),ve(a),n.head.appendChild(a)}}}function mv(t,e,n){zn.S(t,e,n);var a=cl;if(a&&t){var r=za(a).hoistableStyles,s=dl(t);e=e||"default";var c=r.get(s);if(!c){var h={loading:0,preload:null};if(c=a.querySelector(li(s)))h.loading=5;else{t=v({rel:"stylesheet",href:t,"data-precedence":e},n),(n=ln.get(s))&&iu(t,n);var S=c=a.createElement("link");ve(S),Te(S,"link",t),S._p=new Promise(function(j,k){S.onload=j,S.onerror=k}),S.addEventListener("load",function(){h.loading|=1}),S.addEventListener("error",function(){h.loading|=2}),h.loading|=4,Er(c,e,a)}c={type:"stylesheet",instance:c,count:1,state:h},r.set(s,c)}}}function pv(t,e){zn.X(t,e);var n=cl;if(n&&t){var a=za(n).hoistableScripts,r=fl(t),s=a.get(r);s||(s=n.querySelector(ii(r)),s||(t=v({src:t,async:!0},e),(e=ln.get(r))&&ru(t,e),s=n.createElement("script"),ve(s),Te(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},a.set(r,s))}}function gv(t,e){zn.M(t,e);var n=cl;if(n&&t){var a=za(n).hoistableScripts,r=fl(t),s=a.get(r);s||(s=n.querySelector(ii(r)),s||(t=v({src:t,async:!0,type:"module"},e),(e=ln.get(r))&&ru(t,e),s=n.createElement("script"),ve(s),Te(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},a.set(r,s))}}function Dh(t,e,n,a){var r=(r=X.current)?_r(r):null;if(!r)throw Error(u(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=dl(n.href),n=za(r).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=dl(n.href);var s=za(r).hoistableStyles,c=s.get(t);if(c||(r=r.ownerDocument||r,c={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,c),(s=r.querySelector(li(t)))&&!s._p&&(c.instance=s,c.state.loading=5),ln.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ln.set(t,n),s||vv(r,t,n,c.state))),e&&a===null)throw Error(u(528,""));return c}if(e&&a!==null)throw Error(u(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=fl(n),n=za(r).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(u(444,t))}}function dl(t){return'href="'+Ie(t)+'"'}function li(t){return'link[rel="stylesheet"]['+t+"]"}function jh(t){return v({},t,{"data-precedence":t.precedence,precedence:null})}function vv(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Te(e,"link",n),ve(e),t.head.appendChild(e))}function fl(t){return'[src="'+Ie(t)+'"]'}function ii(t){return"script[async]"+t}function Rh(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+Ie(n.href)+'"]');if(a)return e.instance=a,ve(a),a;var r=v({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),ve(a),Te(a,"style",r),Er(a,n.precedence,t),e.instance=a;case"stylesheet":r=dl(n.href);var s=t.querySelector(li(r));if(s)return e.state.loading|=4,e.instance=s,ve(s),s;a=jh(n),(r=ln.get(r))&&iu(a,r),s=(t.ownerDocument||t).createElement("link"),ve(s);var c=s;return c._p=new Promise(function(h,S){c.onload=h,c.onerror=S}),Te(s,"link",a),e.state.loading|=4,Er(s,n.precedence,t),e.instance=s;case"script":return s=fl(n.src),(r=t.querySelector(ii(s)))?(e.instance=r,ve(r),r):(a=n,(r=ln.get(s))&&(a=v({},n),ru(a,r)),t=t.ownerDocument||t,r=t.createElement("script"),ve(r),Te(r,"link",a),t.head.appendChild(r),e.instance=r);case"void":return null;default:throw Error(u(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Er(a,n.precedence,t));return e.instance}function Er(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=a.length?a[a.length-1]:null,s=r,c=0;c<a.length;c++){var h=a[c];if(h.dataset.precedence===e)s=h;else if(s!==r)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function iu(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function ru(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var wr=null;function zh(t,e,n){if(wr===null){var a=new Map,r=wr=new Map;r.set(n,a)}else r=wr,a=r.get(n),a||(a=new Map,r.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),r=0;r<n.length;r++){var s=n[r];if(!(s[xl]||s[Se]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var c=s.getAttribute(e)||"";c=t+c;var h=a.get(c);h?h.push(s):a.set(c,[s])}}return a}function Oh(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function yv(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;return e.rel==="stylesheet"?(t=e.disabled,typeof e.precedence=="string"&&t==null):!0;case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Hh(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function bv(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var r=dl(a.href),s=e.querySelector(li(r));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Mr.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,ve(s);return}s=e.ownerDocument||e,a=jh(a),(r=ln.get(r))&&iu(a,r),s=s.createElement("link"),ve(s);var c=s;c._p=new Promise(function(h,S){c.onload=h,c.onerror=S}),Te(s,"link",a),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Mr.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var su=0;function Sv(t,e){return t.stylesheets&&t.count===0&&jr(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&jr(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&su===0&&(su=62500*tv());var r=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&jr(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>su?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(r)}}:null}function Mr(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)jr(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Dr=null;function jr(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Dr=new Map,e.forEach(xv,t),Dr=null,Mr.call(t))}function xv(t,e){if(!(e.state.loading&4)){var n=Dr.get(t);if(n)var a=n.get(null);else{n=new Map,Dr.set(t,n);for(var r=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<r.length;s++){var c=r[s];(c.nodeName==="LINK"||c.getAttribute("media")!=="not all")&&(n.set(c.dataset.precedence,c),a=c)}a&&n.set(null,a)}r=e.instance,c=r.getAttribute("data-precedence"),s=n.get(c)||a,s===a&&n.set(null,r),n.set(c,r),this.count++,a=Mr.bind(this),r.addEventListener("load",a),r.addEventListener("error",a),s?s.parentNode.insertBefore(r,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(r,t.firstChild)),e.state.loading|=4}}var ri={$$typeof:pt,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function Cv(t,e,n,a,r,s,c,h,S){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=es(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=es(0),this.hiddenUpdates=es(null),this.identifierPrefix=a,this.onUncaughtError=r,this.onCaughtError=s,this.onRecoverableError=c,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=S,this.incompleteTransitions=new Map}function Uh(t,e,n,a,r,s,c,h,S,j,k,B){return t=new Cv(t,e,n,c,S,j,k,B,h),e=1,s===!0&&(e|=24),s=qe(3,null,null,e),t.current=s,s.stateNode=t,e=Ps(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:a,isDehydrated:n,cache:e},Fs(s),t}function kh(t){return t?(t=Fa,t):Fa}function Gh(t,e,n,a,r,s){r=kh(r),a.context===null?a.context=r:a.pendingContext=r,a=qn(e),a.payload={element:n},s=s===void 0?null:s,s!==null&&(a.callback=s),n=Fn(t,a,e),n!==null&&(Ge(n,t,e),Gl(n,t,e))}function Ph(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ou(t,e){Ph(t,e),(t=t.alternate)&&Ph(t,e)}function Lh(t){if(t.tag===13||t.tag===31){var e=ha(t,67108864);e!==null&&Ge(e,t,67108864),ou(t,67108864)}}function Bh(t){if(t.tag===13||t.tag===31){var e=Xe();e=ns(e);var n=ha(t,e);n!==null&&Ge(n,t,e),ou(t,e)}}var Rr=!0;function Av(t,e,n,a){var r=O.T;O.T=null;var s=L.p;try{L.p=2,uu(t,e,n,a)}finally{L.p=s,O.T=r}}function Tv(t,e,n,a){var r=O.T;O.T=null;var s=L.p;try{L.p=8,uu(t,e,n,a)}finally{L.p=s,O.T=r}}function uu(t,e,n,a){if(Rr){var r=cu(a);if(r===null)Zo(t,e,a,zr,n),Fh(t,a);else if(_v(r,t,e,n,a))a.stopPropagation();else if(Fh(t,a),e&4&&-1<Nv.indexOf(t)){for(;r!==null;){var s=Ra(r);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var c=oa(s.pendingLanes);if(c!==0){var h=s;for(h.pendingLanes|=2,h.entangledLanes|=2;c;){var S=1<<31-tt(c);h.entanglements[1]|=S,c&=~S}mn(s),(Lt&6)===0&&(pr=Et()+500,ti(0))}}break;case 31:case 13:h=ha(s,2),h!==null&&Ge(h,s,2),vr(),ou(s,2)}if(s=cu(a),s===null&&Zo(t,e,a,zr,n),s===r)break;r=s}r!==null&&a.stopPropagation()}else Zo(t,e,a,null,n)}}function cu(t){return t=ds(t),du(t)}var zr=null;function du(t){if(zr=null,t=ja(t),t!==null){var e=f(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=g(e),t!==null)return t;t=null}else if(n===31){if(t=C(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return zr=t,null}function qh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ne()){case Wt:return 2;case re:return 8;case ge:case U:return 32;case rt:return 268435456;default:return 32}default:return 32}}var fu=!1,ta=null,ea=null,na=null,si=new Map,oi=new Map,aa=[],Nv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Fh(t,e){switch(t){case"focusin":case"focusout":ta=null;break;case"dragenter":case"dragleave":ea=null;break;case"mouseover":case"mouseout":na=null;break;case"pointerover":case"pointerout":si.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":oi.delete(e.pointerId)}}function ui(t,e,n,a,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Ra(e),e!==null&&Lh(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function _v(t,e,n,a,r){switch(e){case"focusin":return ta=ui(ta,t,e,n,a,r),!0;case"dragenter":return ea=ui(ea,t,e,n,a,r),!0;case"mouseover":return na=ui(na,t,e,n,a,r),!0;case"pointerover":var s=r.pointerId;return si.set(s,ui(si.get(s)||null,t,e,n,a,r)),!0;case"gotpointercapture":return s=r.pointerId,oi.set(s,ui(oi.get(s)||null,t,e,n,a,r)),!0}return!1}function Vh(t){var e=ja(t.target);if(e!==null){var n=f(e);if(n!==null){if(e=n.tag,e===13){if(e=g(n),e!==null){t.blockedOn=e,ac(t.priority,function(){Bh(n)});return}}else if(e===31){if(e=C(n),e!==null){t.blockedOn=e,ac(t.priority,function(){Bh(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Or(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=cu(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);cs=a,n.target.dispatchEvent(a),cs=null}else return e=Ra(n),e!==null&&Lh(e),t.blockedOn=n,!1;e.shift()}return!0}function Yh(t,e,n){Or(t)&&n.delete(e)}function Ev(){fu=!1,ta!==null&&Or(ta)&&(ta=null),ea!==null&&Or(ea)&&(ea=null),na!==null&&Or(na)&&(na=null),si.forEach(Yh),oi.forEach(Yh)}function Hr(t,e){t.blockedOn===e&&(t.blockedOn=null,fu||(fu=!0,l.unstable_scheduleCallback(l.unstable_NormalPriority,Ev)))}var Ur=null;function Kh(t){Ur!==t&&(Ur=t,l.unstable_scheduleCallback(l.unstable_NormalPriority,function(){Ur===t&&(Ur=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],r=t[e+2];if(typeof a!="function"){if(du(a||n)===null)continue;break}var s=Ra(n);s!==null&&(t.splice(e,3),e-=3,uo(s,{pending:!0,data:r,method:n.method,action:a},a,r))}}))}function hl(t){function e(S){return Hr(S,t)}ta!==null&&Hr(ta,t),ea!==null&&Hr(ea,t),na!==null&&Hr(na,t),si.forEach(e),oi.forEach(e);for(var n=0;n<aa.length;n++){var a=aa[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<aa.length&&(n=aa[0],n.blockedOn===null);)Vh(n),n.blockedOn===null&&aa.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var r=n[a],s=n[a+1],c=r[Re]||null;if(typeof s=="function")c||Kh(n);else if(c){var h=null;if(s&&s.hasAttribute("formAction")){if(r=s,c=s[Re]||null)h=c.formAction;else if(du(r)!==null)continue}else h=c.action;typeof h=="function"?n[a+1]=h:(n.splice(a,3),a-=3),Kh(n)}}}function Xh(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(c){return r=c})},focusReset:"manual",scroll:"manual"})}function e(){r!==null&&(r(),r=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,r=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),r!==null&&(r(),r=null)}}}function hu(t){this._internalRoot=t}kr.prototype.render=hu.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(u(409));var n=e.current,a=Xe();Gh(n,a,t,e,null,null)},kr.prototype.unmount=hu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Gh(t.current,2,null,t,null,null),vr(),e[Da]=null}};function kr(t){this._internalRoot=t}kr.prototype.unstable_scheduleHydration=function(t){if(t){var e=nc();t={blockedOn:null,target:t,priority:e};for(var n=0;n<aa.length&&e!==0&&e<aa[n].priority;n++);aa.splice(n,0,t),n===0&&Vh(t)}};var Qh=i.version;if(Qh!=="19.2.4")throw Error(u(527,Qh,"19.2.4"));L.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(u(188)):(t=Object.keys(t).join(","),Error(u(268,t)));return t=p(e),t=t!==null?b(t):null,t=t===null?null:t.stateNode,t};var wv={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Gr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Gr.isDisabled&&Gr.supportsFiber)try{me=Gr.inject(wv),ue=Gr}catch{}}return di.createRoot=function(t,e){if(!d(t))throw Error(u(299));var n=!1,a="",r=tf,s=ef,c=nf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(r=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(c=e.onRecoverableError)),e=Uh(t,1,!1,null,null,n,a,null,r,s,c,Xh),t[Da]=e.current,Qo(t),new hu(e)},di.hydrateRoot=function(t,e,n){if(!d(t))throw Error(u(299));var a=!1,r="",s=tf,c=ef,h=nf,S=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(h=n.onRecoverableError),n.formState!==void 0&&(S=n.formState)),e=Uh(t,1,!0,e,n??null,a,r,S,s,c,h,Xh),e.context=kh(null),n=e.current,a=Xe(),a=ns(a),r=qn(a),r.callback=null,Fn(n,r,a),n=a,e.current.lanes=n,Sl(e,n),mn(e),t[Da]=e.current,Qo(t),new kr(e)},di.version="19.2.4",di}var lm;function Gv(){if(lm)return gu.exports;lm=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(i){console.error(i)}}return l(),gu.exports=kv(),gu.exports}var Pv=Gv(),Lv=class{constructor(l){var i;this.scope=(i=l.scope)!=null?i:"app",this.name=l.name,this.key=`${this.scope}:${this.name}`,this.defaultValue=l.defaultValue}},Bv=class{constructor(){this.grips=new Map}makeKey(l,i){return`${l??"app"}:${i}`}defineGrip(l,i,o){const u=new Lv({scope:o,name:l,defaultValue:i});if(this.grips.has(u.key))throw new Error(`Grip already registered: ${u.key}`);return this.grips.set(u.key,u),u}findOrDefineGrip(l,i,o){const u=this.makeKey(o,l),d=this.grips.get(u);return d||this.defineGrip(l,i,o)}get(l,i){return this.grips.get(`${l}:${i}`)}},qv=l=>(i,o,u)=>l.defineGrip(i,o,u),Rm=class{constructor(l,i){this.kind="DualContextContainer",this.home=l,this.presentation=i,this.grok=l.getGrok()}getGripConsumerContext(){return this.presentation}getGripHomeContext(){return this.home}getGrok(){return this.grok}},Pr=class zm{constructor(i,o){this.kind="GripContext",this.grok=i,this.id=o??`ctx_${Math.random().toString(36).slice(2)}`,this.contextNode=i.ensureNode(this)}getGripConsumerContext(){return this}getGripHomeContext(){return this}getNode(){return this.contextNode}getGrok(){return this.grok}isRoot(){return this.contextNode.get_parent_nodes().length===0}submitTask(i,o=0){this.contextNode.submitTask(i,o)}submitWeakTask(i){this.contextNode.submitWeakTask(i)}getParents(){return this.contextNode?this.contextNode.get_parents_with_priority().map(i=>({ctx:i.node.get_context(),priority:i.priority})).filter(i=>i.ctx!=null):[]}addParent(i,o=0){const u=i.getGripHomeContext();if(u.contextNode.grok!==this.grok)throw new Error("Contexts must be attached to the same engine");if(u===this)throw new Error("Context cannot be its own parent");if(this.contextNode.addParent(u.contextNode,o),this.grok.hasCycle(this.contextNode))throw this.contextNode.removeParent(u.contextNode),new Error("Cycle detected in context DAG");return this}unlinkParent(i){try{this.contextNode.removeParent(i.contextNode)}catch{}return this}hasAncestor(i){return this.contextNode.get_parent_nodes().some(o=>{var u;return o.get_context()===i||((u=o.get_context())==null?void 0:u.hasAncestor(i))||!1})}setValue(i,o){return this}setDrip(i,o){return this}resolveOverride(i){}resolveOverrideWithSource(i){}createChild(i){var o;return new zm(this.grok).addParent(this,(o=i?.priority)!=null?o:0)}getLiveDripForGrip(i){return this.contextNode.getLiveDripForGrip(i)}getOrCreateConsumer(i){return this.contextNode.getOrCreateConsumer(i)}registerTap(i){if(!this.grok)throw new Error("Context is not attached to an engine");this.grok.registerTapAt(this,i)}unregisterTap(i){this.grok.unregisterTap(i)}unregisterSource(i){this.contextNode.unregisterSource(i)}_getContextNode(){return this.contextNode}getContextNode(){return this.contextNode}},Fv=class{constructor(l,i){this.context=null,this.subs=new Set,this.immediateSubs=new Set,this.firstSubCallbacks=new Set,this.zeroSubCallbacks=new Set,this.enqueued=!1,this.zeroCheckScheduled=!1,this.context=l,this.value=i}reset(l,i){this.context=l,this.value=i,this.subs.clear(),this.immediateSubs.clear(),this.firstSubCallbacks.clear(),this.zeroSubCallbacks.clear(),this.enqueued=!1,this.zeroCheckScheduled=!1}get(){return this.value}next(l){this.value!==l&&(this.value=l,this.enqueueNotifySubscribers())}enqueueNotifySubscribers(){var l;if(this.notifyImmediateSubscribers(),!this.enqueued){this.enqueued=!0;const i=this;(l=this.context)==null||l.submitWeakTask(()=>i.taskQueueCallback())}}taskQueueCallback(){this.enqueued=!1,this.notifySubscribers()}notifySubscribers(){this.subs.forEach(l=>l(this.value))}notifyImmediateSubscribers(){this.immediateSubs.forEach(l=>l(this.value))}hasSubscribers(){return this.subs.size>0||this.immediateSubs.size>0}subscribeWith(l,i){const o=!this.hasSubscribers();return l.add(i),o&&this.firstSubCallbacks.forEach(u=>u()),()=>{var u;if(l.has(i)&&(l.delete(i),!this.hasSubscribers()&&!this.zeroCheckScheduled)){this.zeroCheckScheduled=!0;const d=this;(u=this.context)==null||u.submitWeakTask(()=>{d.zeroCheckScheduled=!1,d.hasSubscribers()||d.zeroSubCallbacks.forEach(f=>f())})}}}subscribe(l){return this.subscribeWith(this.subs,l)}subscribePriority(l){return this.subscribeWith(this.immediateSubs,l)}addOnFirstSubscriber(l){this.firstSubCallbacks.add(l)}addOnZeroSubscribers(l){this.zeroSubCallbacks.add(l)}unsubscribeAll(){this.hasSubscribers()&&(this.subs.clear(),this.immediateSubs.clear(),this.zeroSubCallbacks.forEach(l=>l())),this.context=null}_notifyUnsubscribed(){var l;if(this.subs.size===0&&!this.zeroCheckScheduled){this.zeroCheckScheduled=!0;const i=this;(l=this.context)==null||l.submitWeakTask(()=>{i.zeroCheckScheduled=!1,i.hasSubscribers()||i.zeroSubCallbacks.forEach(o=>o())})}}},Vv=class{constructor(){this.handles=[]}add(l){this.handles.push(l)}remove(l){const i=this.handles.indexOf(l);i>=0&&this.handles.splice(i,1)}getHandles(){return this.handles}get size(){return this.handles.length}cancelAll(){for(;this.handles.length>0;)this.handles[0].cancel()}},Yv=class{constructor(){this.items=[]}get size(){return this.items.length}push(l){this.items.push(l),this.bubbleUp(this.items.length-1)}peek(){return this.items[0]}pop(){if(this.items.length===0)return;const l=this.items[0],i=this.items.pop();return this.items.length>0&&(this.items[0]=i,this.bubbleDown(0)),l}less(l,i){return l.priority!==i.priority?l.priority<i.priority:l.sequence<i.sequence}bubbleUp(l){for(;l>0;){const i=Math.floor((l-1)/2);if(!this.less(this.items[l],this.items[i]))break;this.swap(l,i),l=i}}bubbleDown(l){const i=this.items.length;for(;;){const o=l*2+1,u=l*2+2;let d=l;if(o<i&&this.less(this.items[o],this.items[d])&&(d=o),u<i&&this.less(this.items[u],this.items[d])&&(d=u),d===l)break;this.swap(l,d),l=d}}swap(l,i){const o=this.items[l];this.items[l]=this.items[i],this.items[i]=o}},Kv=class{constructor(l){this.heap=new Yv,this.nextId=1,this.nextSequence=1,this.scheduled=!1,this.isFlushing=!1;var i,o;this.options={autoFlush:(i=l?.autoFlush)!=null?i:!0,useMicrotask:(o=l?.useMicrotask)!=null?o:!0}}get size(){return this.heap.size}submit(l,i=0,o){const u={id:this.nextId++,priority:i,sequence:this.nextSequence++,strongCallback:l,state:"pending"};o&&(u.handle=this.createHandle(u,o)),this.heap.push(u),this.scheduleFlushIfNeeded()}submitWeak(l,i=0,o){if(typeof WeakRef>"u"){this.submit(l,i,o);return}const u={id:this.nextId++,priority:i,sequence:this.nextSequence++,weakCallback:new WeakRef(l),state:"pending"};o&&(u.handle=this.createHandle(u,o)),this.heap.push(u),this.scheduleFlushIfNeeded()}flush(){var l,i,o,u;if(!this.isFlushing){this.isFlushing=!0;try{for(;;){const d=this.heap.pop();if(!d)break;if(d.state==="cancelled")continue;const f=(i=d.strongCallback)!=null?i:(l=d.weakCallback)==null?void 0:l.deref();if(!f){d.state==="pending"&&((o=d.handle)==null||o.notifyNoLongerPending()),d.state="completed";continue}try{d.state==="pending"&&((u=d.handle)==null||u.notifyNoLongerPending()),d.state="running",f(),d.state="completed"}catch(g){this.reportAsyncError(g),d.state="completed"}}}finally{this.isFlushing=!1,this.scheduled=!1}}}cancelScheduledFlush(){this.scheduled=!1}createHandle(l,i){const o=new Xv(l,i);return i.add(o),o}scheduleFlushIfNeeded(){this.options.autoFlush&&(this.scheduled||this.isFlushing||(this.scheduled=!0,this.options.useMicrotask&&typeof queueMicrotask=="function"?queueMicrotask(()=>this.flush()):setTimeout(()=>this.flush(),0)))}reportAsyncError(l){setTimeout(()=>{throw l},0)}},Xv=class{constructor(l,i){this.removed=!1,this.task=l,this.holder=i}cancel(){return this.task.state!=="pending"?!1:(this.task.state="cancelled",this.notifyNoLongerPending(),!0)}isRunning(){return this.task.state==="running"}isCancelled(){return this.task.state==="cancelled"}isPending(){return this.task.state==="pending"}isCompleted(){return this.task.state==="completed"}notifyNoLongerPending(){if(!this.removed)try{this.holder.remove(this)}finally{this.removed=!0}}},Qv=class{constructor(l,i){if(this.destinations=new Map,this.outputs=new Set,l.kind==="TapFactory"?(this.tap=l.build(),this.tapFactory=l):(this.tap=l,this.tapFactory=void 0),i)for(const o of i)this.outputs.add(o)}addDestinationGrip(l,i){var o,u,d=this.destinations.get(l),f=!1;d||(d=new im(l,this.tap,this),this.destinations.set(l,d),f=!0,d.registerDestinationParamDrips()),d.addGrip(i);const g=l.get_context();f?(u=(o=this.tap).onConnect)==null||u.call(o,g,i):g&&this.tap.produce({destContext:g})}removeDestinationForContext(l){var i,o,u,d;const f=this.destinations.get(l);if(f&&(f.cleanup(),f.unsubscribeAllDestinationParams(),this.destinations.delete(l)),this.destinations.size===0){if(!((o=(i=this.tap).getHomeContext)==null?void 0:o.call(i)))return;(d=(u=this.tap).onDetach)==null||d.call(u)}}getDestinations(){return this.destinations}addDestination(l,i){var o=this.destinations.get(l);o||(o=new im(l,this.tap,this),this.destinations.set(l,o),o.registerDestinationParamDrips()),o.addGrip(i)}removeDestinationGripForContext(l,i){const o=this.destinations.get(l);o&&(o.removeGrip(i),o.getGrips().size===0&&this.removeDestinationForContext(l))}getDestinationParams(l){for(const[i,o]of this.destinations)if(i.get_context()===l)return o}publish(l,i){let o=0;const u=new Set;try{for(const[d,f]of this.getDestinations()){const g=d.get_context();if(!g){u.add(d);continue}for(const C of f.getGrips())l.has(C)&&this.outputs.has(C)&&(i(g,C,l.get(C)),o+=1)}}finally{for(const d of u)this.removeDestinationForContext(d)}return o}},im=class{constructor(l,i,o,u){this.destinationParamDrips=new Map,this.destinationDripsSubs=new Map,this.destContextNode=l,this.tap=i,this.grips=new Set(u??[]),this.producer=o,i.createDestinationContext&&(this.tapContext=i.createDestinationContext(this))}getTapContext(){return this.tapContext}registerDestinationParamDrips(){if(!this.tap.destinationParamGrips)return;const l=this;for(const i of this.tap.destinationParamGrips){const o=this.destContextNode.getOrCreateConsumer(i);this.destinationParamDrips.set(i,o),this.destinationDripsSubs.set(i,o.subscribePriority(u=>{o.get()!==void 0&&l.tap.produceOnDestParams(this.destContextNode.get_context(),i)}))}}unregisterDestination(){this.producer.removeDestinationForContext(this.destContextNode)}unsubscribeAllDestinationParams(){for(const[l,i]of this.destinationDripsSubs)i();this.destinationDripsSubs.clear(),this.destinationParamDrips.clear()}getDestinationParamValue(l){const i=this.destinationParamDrips.get(l);return i?.get()}getAllDestinationParamValues(){const l=new Map;for(const[i,o]of this.destinationParamDrips)l.set(i,o.get());return l}addGrip(l){var i,o;this.grips.has(l)||(this.grips.size===0&&this.registerDestinationParamDrips(),this.grips.add(l),(o=(i=this.tapContext)==null?void 0:i.dripAdded)==null||o.call(i,l),this.sanityCheck())}removeGrip(l){var i,o,u,d;try{if(!this.grips.has(l))return;this.grips.delete(l),(o=(i=this.tapContext)==null?void 0:i.dripRemoved)==null||o.call(i,l),this.grips.size===0&&((d=(u=this.tapContext)==null?void 0:u.onDetach)==null||d.call(u),this.unregisterDestination())}finally{this.sanityCheck()}}cleanup(){var l,i;this.grips.size>0&&((i=(l=this.tapContext)==null?void 0:l.onDetach)==null||i.call(l))}sanityCheck(){if(this.grips.size===0&&this.destinationParamDrips.size>0)throw new Error("Destination has destination param drips but no output grips")}getGrips(){return this.grips}getDestinationParamDrips(){return this.destinationParamDrips}getContext(){return this.destContextNode.contextRef.deref()}getContextNode(){return this.destContextNode}get destContext(){const l=this.destContextNode.get_context();if(!l)throw new Error("Destination context is gone");return l}get(l){const i=this.getDestParam(l);return i!==void 0?i:this.getHomeParam(l)}getAll(){var l,i,o,u;const d=new Map,f=(i=(l=this.tap).getHomeContext)==null?void 0:i.call(l);if(f&&this.tap.homeParamGrips){const g=((u=(o=this.tap).getParamsContext)==null?void 0:u.call(o))||f;for(const C of this.tap.homeParamGrips){const p=g.getOrCreateConsumer(C).get();p!==void 0&&d.set(C,p)}}for(const[g,C]of this.destinationParamDrips){const A=C.get();A!==void 0&&d.set(g,A)}return d}has(l){return this.hasDestParam(l)||this.hasHomeParam(l)}getDestParam(l){const i=this.destinationParamDrips.get(l);return i?.get()}getAllDestParams(){const l=new Map;for(const[i,o]of this.destinationParamDrips){const u=o.get();u!==void 0&&l.set(i,u)}return l}getHomeParam(l){var i,o,u,d;const f=(o=(i=this.tap).getHomeContext)==null?void 0:o.call(i);return f?(((d=(u=this.tap).getParamsContext)==null?void 0:d.call(u))||f).getOrCreateConsumer(l).get():void 0}getAllHomeParams(){var l,i,o,u;const d=new Map,f=(i=(l=this.tap).getHomeContext)==null?void 0:i.call(l);if(f&&this.tap.homeParamGrips){const g=((u=(o=this.tap).getParamsContext)==null?void 0:u.call(o))||f;for(const C of this.tap.homeParamGrips){const p=g.getOrCreateConsumer(C).get();p!==void 0&&d.set(C,p)}}return d}hasDestParam(l){return this.destinationParamDrips.has(l)}hasHomeParam(l){var i,o;return(o=(i=this.tap.homeParamGrips)==null?void 0:i.includes(l))!=null?o:!1}},Zv=class{constructor(l,i){this.kind="GripContextNode",this.parents=[],this.children=[],this.handleHolder=new Vv,this.producers=new Map,this.consumers=new Map,this.deletedConsumers=new Map,this.resolvedProviders=new Map,this.producerByTap=new Map,this.lastSeen=Date.now(),this.grok=l,this.id=i.id,this.contextRef=new WeakRef(i)}get_grok(){return this.grok}submitTask(l,i){this.grok.submitTask(l,i,this.handleHolder)}submitWeakTask(l){this.grok.submitWeakTask(l,this.handleHolder)}get_context(){return this.contextRef.deref()}get_parent_nodes(){return this.parents.map(l=>l.node)}isRoot(){return this.parents.length===0}getParents(){return this.get_parents_with_priority().map(l=>l.node)}get_parents_with_priority(){return this.parents.slice()}get_producers(){return this.producers}get_consumers(){return this.consumers}get_children_nodes(){return this.children}addParent(l,i=0){this.parents.find(u=>u.node===l)||(this.parents.push({node:l,priority:i}),this.parents.sort((u,d)=>u.priority-d.priority),l.children.push(this))}removeParent(l){const i=this.parents.findIndex(u=>u.node===l);if(i===-1)throw new Error(`Parent ${l.id} is not a parent of ${this.id}`);this.parents.splice(i,1);const o=l.children.indexOf(this);o!==-1&&l.children.splice(o,1)}_removeTap(l){var i,o;const u=this.producerByTap.get(l);if(u){for(const d of u.outputs)this.producers.delete(d);this.producerByTap.delete(l),u.tapFactory&&this.producerByTap.delete(u.tapFactory),(o=(i=u.tap).onDetach)==null||o.call(i)}}recordProducer(l,i){this.producers.set(l,i),this.lastSeen=Date.now()}getResolvedProviders(){return this.resolvedProviders}setResolvedProvider(l,i){this.resolvedProviders.set(l,i)}getOrCreateProducerRecord(l,i){let o=this.producerByTap.get(l);return o||(o=new Qv(l,i),this.producerByTap.set(l,o),l!==o.tap&&this.producerByTap.set(o.tap,o)),o.tap,o}getProducerRecord(l){return this.producerByTap.get(l)}recordConsumer(l,i){this.consumers.set(l,new WeakRef(i)),this.lastSeen=Date.now(),i.addOnFirstSubscriber(()=>{const o=this.get_context();o&&this.grok.resolver.addConsumer(o,l)})}getOrCreateConsumer(l){var i;let o=(i=this.consumers.get(l))==null?void 0:i.deref();if(!o){const u=this.get_context();if(!u)throw new Error("Context is gone");const d=this.deletedConsumers.get(l),f=d?.deref();d&&!f&&this.deletedConsumers.delete(l),f?(o=f,f.reset(u,l.defaultValue)):o=new Fv(u,l.defaultValue),this.recordConsumer(l,o),o.addOnZeroSubscribers(()=>{this.removeConsumerForGrip(l)})}return o}getLiveDripForGrip(l){const i=this.consumers.get(l),o=i?.deref();return!o&&i&&this.consumers.delete(l),o}notifyConsumers(l,i){const o=this.getLiveDripForGrip(l);return o?(o.next(i),1):0}removeConsumerForGrip(l){const i=this.consumers.get(l);i&&i.deref()&&this.deletedConsumers.set(l,i),this.consumers.delete(l),this.unregisterSource(l),this.resolvedProviders.delete(l)}unregisterSource(l){const i=this.resolvedProviders.get(l);i&&i.removeDestinationForContext(l,this)}removeDestinationForContext(l,i){const o=this.producers.get(l);o&&o.removeDestinationGripForContext(i,l)}purgeDanglingDrips(){const l=new Set;var i=0;for(const[o,u]of this.consumers)u.deref()?i+=1:l.add(o);for(const o of l)this.removeConsumerForGrip(o);return i}touch(){this.lastSeen=Date.now()}getLastSeen(){return this.lastSeen}},Iv=class{constructor(l){this.nodes=new Map,this.weakNodes=new Map,this.gcIntervalMs=3e4,this.maxIdleMs=12e4,this.gcTimer=null,this.grok=l}hasCycle(l){const i=new Set(l.get_children_nodes()),o=new Set,u=new Array,d=f=>{if(i.delete(f),o.has(f))return!1;o.add(f),u.push(f);for(const g of f.get_parent_nodes())if(u.includes(g)||d(g))return!0;return u.pop(),!1};for(;i.size>0;){const f=i.values().next().value;if(f&&d(f))return!0}return!1}ensureNode(l){let i=this.nodes.get(l.id);if(!i){i=new Zv(this.grok,l),this.nodes.set(l.id,i),this.weakNodes.set(l.id,new WeakRef(i));for(const{ctx:o,priority:u}of l.getParents()){const d=this.ensureNode(o);i.addParent(d,u)}this.startGcIfNeeded()}return i.touch(),i}getNode(l){return this.nodes.get(l.id)}getNodeById(l){return this.nodes.get(l)}snapshot(){return this.nodes}snapshotSanityCheck(){const l=new Map,i=[...this.nodes.values()],o=new Set;for(;i.length>0;){const f=i.pop();if(l.has(f.id))continue;l.set(f.id,f);const g=[];f.children.forEach(C=>{!l.has(C.id)&&!this.nodes.has(C.id)?o.add(C):(g.push(C),l.has(C.id)||i.push(C))}),g.length!==f.children.length&&(f.children.length=0,f.children.push(...g))}o.size>0;const u=new Set,d=new Set;for(const[f,g]of this.weakNodes){const C=g.deref();C?l.has(C.id)||d.add(C):u.add(f)}for(const f of u)this.weakNodes.delete(f);return{nodes:l,missingNodes:o,nodesNotReaped:d}}notifyConsumers(l,i,o){const u=this.getNode(l);return u?u.notifyConsumers(i,o):0}startGcIfNeeded(){var l,i;if(!this.gcTimer){this.gcTimer=setInterval(()=>this.gcSweep(),this.gcIntervalMs);try{(i=(l=this.gcTimer).unref)==null||i.call(l)}catch{}}}gcSweep(){const l=new Set;for(const[i,o]of this.nodes){const d=!o.contextRef.deref(),g=o.purgeDanglingDrips()===0;d&&g&&o.children.length===0&&l.add(i)}for(const i of l){const o=this.nodes.get(i);o&&(this.clearContextNode(o),this.nodes.delete(i))}for(const[i,o]of this.nodes){const u=o.children.filter(d=>this.nodes.has(d.id));u.length!==o.children.length&&(o.children.length=0,o.children.push(...u))}}clearContextNode(l){for(const i of l.consumers.values()){const o=i.deref();o&&o.unsubscribeAll()}l.consumers.clear();for(const i of l.parents.slice())l.removeParent(i.node);for(const i of l.children.slice())try{i.removeParent(l)}catch{const u=l.children.indexOf(i);u!==-1&&l.children.splice(u,1)}l.parents.length=0,l.children.length=0}countLiveConsumers(l){let i=0;for(const o of l.consumers.values())o.deref()&&(i+=1);return i}};function Jv(l,i){const o=new Set;for(const u of i)l.has(u)&&o.add(u);return o}function $v(l,i){const o=new Set;for(const u of l)i.has(u)||o.add(u);return o}var Wv=class{constructor(l){this.grok=l}addConsumer(l,i){const o=this.grok.ensureNode(l);o.getOrCreateConsumer(i),this.resolveConsumer(o,i)}removeConsumer(l,i){const o=this.grok.ensureNode(l);this.unresolveConsumer(o,i),o.removeConsumerForGrip(i)}applyProducerDelta(l,i){const o=l.kind==="GripContext"?l.getNode():l;o.submitTask(()=>{var u,d;const f=new Set;for(const[A,p]of i.removed.entries()){const b=o.getProducerRecord(A);if(b)for(const v of p.attributedGrips)this.collectConsumers(b,v,f)}for(const[A,p]of i.removed.entries()){const b=o.getProducerRecord(A);if(b)for(const v of p.attributedGrips)o.get_producers().get(v)===b&&o.get_producers().delete(v),b.outputs.delete(v)}for(const[A,p]of i.added.entries()){const b=o.getOrCreateProducerRecord(A,A.provides),v=o.get_context(),E=b.tap;v&&!((u=E.getHomeContext)!=null&&u.call(E))&&((d=E.onAttach)==null||d.call(E,v));for(const q of p.attributedGrips)o.recordProducer(q,b),b.outputs.add(q)}const g=[o,...this.getDescendants(o)];for(const[A,p]of i.added.entries())for(const b of p.attributedGrips)for(const v of g)v.get_consumers().has(b)&&f.add({destNode:v,grip:b});for(const{destNode:A,grip:p}of f)this.unresolveConsumer(A,p),this.resolveConsumer(A,p);const C=new Set([...i.added.keys(),...i.removed.keys()]);for(const A of C){const p=o.getProducerRecord(A);p&&p.outputs.size===0&&o._removeTap(A)}},100)}analyzeDelta(l,i){var o;const u=new Map;for(const[b,v]of l.get_producers().entries()){const E=(o=v.tapFactory)!=null?o:v.tap;u.has(E)||u.set(E,new Set),u.get(E).add(b)}const d=new Map,f=new Map;for(const[b,v]of u.entries())l.getProducerRecord(b),f.set(b,new Set(v)),d.set(b,{producerTap:b,score:0,bindingId:"",attributedGrips:f.get(b)});for(const[b,v]of i.removed.entries()){const E=f.get(b);if(E){for(const q of v.attributedGrips)E.delete(q);E.size===0&&(f.delete(b),d.delete(b))}}for(const[b,v]of i.added.entries()){f.has(b)||f.set(b,new Set);const E=f.get(b);for(const q of v.attributedGrips)E.add(q);d.set(b,{...v,attributedGrips:E})}const g=new Map,C=new Map,A=new Map,p=new Set;u.forEach(b=>b.forEach(v=>p.add(v))),f.forEach(b=>b.forEach(v=>p.add(v)));for(const b of p){const v=this.findTapForGrip(b,u),E=this.findTapForGrip(b,f);v&&!E?(C.has(v)||C.set(v,new Set),C.get(v).add(b)):!v&&E?(g.has(E)||g.set(E,new Set),g.get(E).add(b)):v&&E&&v!==E&&A.set(b,{from:v,to:E})}return{added:g,removed:C,transferred:A,finalProducers:d}}findTapForGrip(l,i){for(const[o,u]of i.entries())if(u.has(l))return o}collectConsumers(l,i,o){for(const u of l.getDestinations().values())u.getGrips().has(i)&&o.add({destNode:u.getContextNode(),grip:i})}addProducer(l,i){var o,u,d,f;(o=i.onAttach)==null||o.call(i,l);const g=this.grok.ensureNode(l),C=g.getOrCreateProducerRecord(i,i.provides);try{i.producer=(u=i.producer)!=null?u:C,i.homeContext=(d=i.homeContext)!=null?d:l,i.engine=(f=i.engine)!=null?f:this.grok}catch{}for(const b of i.provides)g.recordProducer(b,C);const A=[g,...this.getDescendants(g)],p=new Set(i.provides);for(const b of A)for(const[v,E]of b.get_consumers())p.has(v)&&this.resolveConsumer(b,v)}removeProducer(l,i){const o=this.grok.ensureNode(l),u=o.getProducerRecord(i);if(!u)return;const d=[];for(const f of Array.from(u.getDestinations().values())){const g=f.getContextNode();for(const C of f.getGrips())d.push({destNode:g,grip:C})}for(const f of i.provides)o.get_producers().get(f)===u&&o.get_producers().delete(f);o._removeTap(i);for(const{destNode:f,grip:g}of d){const C=f.getResolvedProviders();C.get(g)===o&&C.delete(g),u.removeDestinationGripForContext(f,g),this.resolveConsumer(f,g)}}addParent(l,i){this.reevaluateDescendants(l)}unlinkParent(l,i){var o;(o=l.unlinkParent)==null||o.call(l,i),this.reevaluateDescendants(l)}reevaluateDescendants(l){const i=this.grok.ensureNode(l),o=[i,...this.getDescendants(i)];for(const u of o){const d=Array.from(u.get_consumers().keys());for(const f of d)this.resolveConsumer(u,f)}}resolveConsumer(l,i){var o,u;const d=l.getResolvedProviders().get(i),f=this.findProducerFor(l,i);if(d!==f)if(d&&this.unresolveConsumer(l,i),f){const g=f.get_producers().get(i);if(g){const C=f.get_context();C&&!g.tap.getHomeContext()&&((u=(o=g.tap).onAttach)==null||u.call(o,C)),g.addDestinationGrip(l,i),l.setResolvedProvider(i,f)}}else l.getResolvedProviders().delete(i),l.get_context()&&l.notifyConsumers(i,i.defaultValue)}unresolveConsumer(l,i){const o=l.getResolvedProviders(),u=o.get(i);u&&(u.removeDestinationForContext(i,l),o.delete(i))}findProducerFor(l,i){if(l.get_producers().has(i))return l;const o=[],u=new Set;for(o.push(l),u.add(l);o.length>0;){const d=o.shift();if(d.get_producers().has(i))return d;const f=d.get_parents_with_priority(),g=[],C=[];for(const{node:A}of f)u.has(A)||(A.isRoot()?C.push(A):g.push(A),u.add(A));o.push(...g,...C)}return null}getDescendants(l){const i=new Set,o=[...l.get_children_nodes()],u=new Set([l]);for(;o.length>0;){const d=o.shift();if(!u.has(d)){u.add(d),i.add(d);for(const f of d.get_children_nodes())u.has(f)||o.push(f)}}return Array.from(i)}resolveConsumerStage1(l,i,o,u,d){var f=this.grok.ensureNode(i),g=f.get_producers().get(o);if(g){const C=this.grok.ensureNode(l);return g.addDestinationGrip(C,o),C.setResolvedProvider(o,f),!0}for(const C of i.getParents()){const A=C.ctx;if(A.isRoot()){d.push(A);continue}if(!u.has(A)&&(u.add(A),this.resolveConsumerStage1(l,A,o,u,d)))return!0}return!1}resolveProducer(l,i,o){var u=o;if(i){const C=this.grok.ensureNode(i).get_producers();if(C.size>0){const A=Jv(u,C.keys());if(A.size>0&&(u=$v(u,A),u.size===0))return}}else i=l;const d=this.grok.ensureNode(i),f=d.get_consumers();for(const[g,C]of f)u.has(g)&&this.resolveConsumer(d,g)}},Om=class{constructor(){this.partitions=new Set,this.itemToPartition=new Map,this.characteristicToPartition=new Map,this.itemToCharacteristics=new Map,this.dirtyPartitions=new Set}add(l,i){if(this.itemToPartition.has(l))return this.itemToPartition.get(l);this.itemToCharacteristics.set(l,new Set(i));const o=new Set;for(const d of i)this.characteristicToPartition.has(d)&&o.add(this.characteristicToPartition.get(d));let u;if(o.size===0)u={items:new Set([l])},this.partitions.add(u);else{const d=Array.from(o);u=d[0],u.items.add(l);for(let f=1;f<d.length;f++){const g=d[f];if(g!==u){for(const C of g.items)u.items.add(C),this.itemToPartition.set(C,u);this.updateCharacteristicMappings(g,u),this.partitions.delete(g)}}}this.itemToPartition.set(l,u);for(const d of i)this.characteristicToPartition.set(d,u);return u}updateCharacteristicMappings(l,i){for(const o of l.items){const u=this.itemToCharacteristics.get(o);if(u)for(const d of u)this.characteristicToPartition.get(d)===l&&this.characteristicToPartition.set(d,i)}}remove(l){const i=this.itemToPartition.get(l);return i?(i.items.delete(l),this.itemToPartition.delete(l),this.itemToCharacteristics.delete(l),i.items.size===0?(this.partitions.delete(i),this.dirtyPartitions.delete(i)):i.items.size>=2&&this.dirtyPartitions.add(i),i):null}getPartitionForItem(l){return this.itemToPartition.get(l)}repartitionDirtySets(){if(this.dirtyPartitions.size===0)return new Set;const l=new Set;for(const i of this.dirtyPartitions){for(const u of i.items){const d=this.itemToCharacteristics.get(u);if(d)for(const f of d)this.characteristicToPartition.get(f)===i&&this.characteristicToPartition.delete(f)}this.partitions.delete(i);const o=new Set;for(const u of i.items){this.itemToPartition.delete(u);const d=this.add(u,Array.from(this.itemToCharacteristics.get(u)||[]));o.add(d)}if(o.size>1)for(const u of o)l.add(u)}return this.dirtyPartitions.clear(),l}getPartitions(){return Array.from(this.partitions).map(l=>l.items)}},ty=class{constructor(){this.objectIds=new WeakMap,this.nextId=0}getId(l){return this.objectIds.has(l)||this.objectIds.set(l,this.nextId++),this.objectIds.get(l)}},ey=new ty;function Lr(l){return l.map(i=>{const o=typeof i;if(i===null)return"N:";if(o==="undefined")return"U:";if(o==="object")return`O:${ey.getId(i)}`;if(o==="string"){const d=i;return`s:${d.length}:${d}`}if(o==="number"){const d=i;return`n:${Number.isNaN(d)?"NaN":Object.is(d,-0)?"0":String(d)}`}if(o==="boolean")return`b:${i?"true":"false"}`;const u=String(i);return`x:${u.length}:${u}`}).join("|")}var rm=class{constructor(){this.internalMap=new Map}set(l,i){return this.internalMap.set(Lr(l),{key:l,value:i}),this}get(l){var i;return(i=this.internalMap.get(Lr(l)))==null?void 0:i.value}delete(l){return this.internalMap.delete(Lr(l))}has(l){return this.internalMap.has(Lr(l))}clear(){this.internalMap.clear()}size(){return this.internalMap.size}*keys(){for(const l of this.internalMap.values())yield l.key}*values(){for(const l of this.internalMap.values())yield l.value}*entries(){for(const l of this.internalMap.values())yield[l.key,l.value]}forEach(l,i){this.internalMap.forEach((o,u)=>l.call(i,o.value,o.key,this))}[Symbol.iterator](){return this.entries()}},ny=class{constructor(){this.index=new Map}add(l){for(const i of l.conditions.keys())this.index.has(i)||this.index.set(i,new Set),this.index.get(i).add(l)}remove(l){for(const i of l.conditions.keys()){const o=this.index.get(i);o&&(o.delete(l),o.size===0&&this.index.delete(i))}}getAffectedQueries(l){const i=new Set;for(const o of l){const u=this.index.get(o);if(u)for(const d of u)i.add(d)}return i}},ay=class{attribute(l){const i=new Map,o=new Om;for(const u of l)o.add(u,Array.from(u.tap.provides));for(const u of o.getPartitions()){const d=Array.from(u).sort((g,C)=>C.score-g.score||g.bindingId.localeCompare(C.bindingId)),f=new Set;for(const g of d){const C=Array.from(g.tap.provides).filter(A=>!f.has(A));if(C.length>0){const A={producerTap:g.tap,score:g.score,bindingId:g.bindingId,attributedGrips:new Set(C)};i.set(g.tap,A),C.forEach(p=>f.add(p))}}}return i}},ly=class{constructor(l=[],i=1e3,o=!0,u=!0){this.bindings=new Map,this.invertedIndex=new ny,this.activeMatches=new Map,this.attributionUtility=new ay,this.inputGripRefCounts=new Map,this.lastAttributedResult=new Map,this.structurallyChangedQueries=new Set,this.queryPartitioner=new Om,this.precomputedMaps=new Map,this.runtimeEvaluationSets=new Set,this.cache=new rm,this.queryToPartition=new Map,this.partitionToKeyGrips=new Map,this.precomputationThreshold=i,this.useHybridEvaluation=o,this.useCache=u,l.forEach(d=>this.addBinding(d))}getBinding(l){return this.bindings.get(l)}addBinding(l){const i=new Set;let o=new Set;this.bindings.has(l.id)&&(o=this.removeBinding(l.id).removedInputs),this.bindings.set(l.id,l),this.invertedIndex.add(l.query),this.structurallyChangedQueries.add(l.query),this.cache.clear();for(const u of l.query.conditions.keys()){const d=this.inputGripRefCounts.get(u)||0;d===0&&i.add(u),this.inputGripRefCounts.set(u,d+1)}if(this.useHybridEvaluation){const u=this.queryPartitioner.add(l.query,Array.from(l.query.conditions.keys()));this.updateHybridStateForPartition(u.items)}return{newInputs:i,removedInputs:o}}removeBinding(l){const i=new Set,o=this.bindings.get(l);if(o){this.bindings.delete(l),this.invertedIndex.remove(o.query),this.activeMatches.delete(l),this.structurallyChangedQueries.add(o.query),this.cache.clear();for(const u of o.query.conditions.keys()){const d=this.inputGripRefCounts.get(u);d&&(d===1?(this.inputGripRefCounts.delete(u),i.add(u)):this.inputGripRefCounts.set(u,d-1))}if(this.useHybridEvaluation){const u=this.queryPartitioner.remove(o.query);u&&(this.clearHybridStateForPartition(u.items),this.queryPartitioner.repartitionDirtySets().forEach(f=>this.updateHybridStateForPartition(f.items)))}}return{removedInputs:i}}getAllInputGrips(){return new Set(this.inputGripRefCounts.keys())}updateHybridStateForPartition(l){this.clearHybridStateForPartition(l),this.calculateComplexity(l)<=this.precomputationThreshold?this.precomputePartition(l):this.runtimeEvaluationSets.add(l),l.forEach(i=>this.queryToPartition.set(i,l))}clearHybridStateForPartition(l){this.precomputedMaps.delete(l),this.runtimeEvaluationSets.delete(l),this.partitionToKeyGrips.delete(l),l.forEach(i=>this.queryToPartition.delete(i))}calculateComplexity(l){const i=new Map;for(const u of l)for(const[d,f]of u.conditions.entries()){i.has(d)||i.set(d,new Set);const g=i.get(d);for(const C of f.keys())g.add(C)}let o=1;for(const u of i.values())if(o*=u.size,o>this.precomputationThreshold)return o;return o}precomputePartition(l){var i;const o=new rm,u=new Set;for(const C of l)C.conditions.forEach((A,p)=>u.add(p));const d=Array.from(u).sort((C,A)=>C.key.localeCompare(A.key));this.partitionToKeyGrips.set(l,d);const f=new Map;for(const C of d){const A=new Set;for(const p of l)(i=p.conditions.get(C))==null||i.forEach((b,v)=>A.add(v));f.set(C,Array.from(A))}const g=(C,A)=>{if(C===d.length){const v={getValue:Y=>new Map(A).get(Y)},E=d.map(Y=>v.getValue(Y)),q=this.evaluateQueries(l,v),Q=this.attributionUtility.attribute(Array.from(q.values()));o.set(E,Q);return}const p=d[C],b=f.get(p)||[void 0];for(const v of b)A.push([p,v]),g(C+1,A),A.pop()};g(0,[]),this.precomputedMaps.set(l,o)}evaluateQueries(l,i){const o=new Map,u=[];for(const d of this.bindings.values())l.has(d.query)&&u.push(d);for(const d of u){let f=0;if(d.query.conditions.size===0)continue;let g=!0;for(const[C,A]of d.query.conditions.entries()){const p=i.getValue(C);if(p===void 0||!A.has(p)){g=!1;break}f+=A.get(p)}g&&o.set(d.id,{tap:d.tap,score:d.baseScore+f,bindingId:d.id})}return o}onGripsChanged(l,i){const o=this.invertedIndex.getAffectedQueries(l);for(const p of this.structurallyChangedQueries)o.add(p);this.structurallyChangedQueries.clear();const u=this.evaluateQueries(o,i);for(const p of o){const b=Array.from(this.bindings.values()).filter(v=>v.query===p);for(const v of b){const E=u.get(v.id);this.activeMatches.get(v.id)&&!E?this.activeMatches.delete(v.id):E&&this.activeMatches.set(v.id,E)}}const d=Array.from(this.activeMatches.values());let f;if(this.useCache){const p=this.getAllInputGrips(),b=Array.from(p).sort((v,E)=>v.key.localeCompare(E.key)).map(v=>i.getValue(v));this.cache.has(b)?f=this.cache.get(b):(f=this.attributionUtility.attribute(d),this.cache.set(b,f))}else f=this.attributionUtility.attribute(d);const g=new Map,C=new Map,A=new Set([...f.keys(),...this.lastAttributedResult.keys()]);for(const p of A){const b=f.get(p),v=this.lastAttributedResult.get(p);if(b&&!v)g.set(p,b);else if(!b&&v)C.set(p,v);else if(b&&v){const E=new Set;for(const Q of b.attributedGrips)v.attributedGrips.has(Q)||E.add(Q);const q=new Set;for(const Q of v.attributedGrips)b.attributedGrips.has(Q)||q.add(Q);E.size>0&&g.set(p,{...b,attributedGrips:E}),q.size>0&&C.set(p,{...v,attributedGrips:q})}}return this.lastAttributedResult=f,{added:g,removed:C}}},iy=class{constructor(l){this.valuesMap=new Map,this.changedGrips=new Set,this.dripSubscriptions=new Map,this.isFirstEvaluation=!0,this.container=l,this.evaluator=new ly}addBinding(l){const i=this.evaluator.addBinding(l);i.newInputs.forEach(o=>this._subscribeToGrip(o)),i.removedInputs.forEach(o=>this._unsubscribeFromGrip(o));for(const o of l.query.conditions.keys())this.changedGrips.add(o);this.container.getGripHomeContext().submitTask(()=>this._evaluate(),100)}removeBinding(l){const i=this.evaluator.getBinding(l);if(i)for(const u of i.query.conditions.keys())this.changedGrips.add(u);const o=this.evaluator.removeBinding(l);this.container.getGripHomeContext().submitTask(()=>this._evaluate(),100),o.removedInputs.forEach(u=>this._unsubscribeFromGrip(u))}_subscribeToGrip(l){if(this.dripSubscriptions.has(l))return;const o=this.container.getGripHomeContext().getOrCreateConsumer(l);this.isFirstEvaluation&&(this.valuesMap.set(l,o.get()),this.changedGrips.add(l));const u=o.subscribePriority(()=>{this._onGripChanged(l,o)});this.dripSubscriptions.set(l,u)}_unsubscribeFromGrip(l){const i=this.dripSubscriptions.get(l);i&&(i(),this.dripSubscriptions.delete(l),this.valuesMap.delete(l))}_onGripChanged(l,i){this.valuesMap.set(l,i.get()),this.changedGrips.add(l),this.container.getGripHomeContext().submitTask(()=>this._evaluate(),100)}_evaluate(){if(this.changedGrips.size===0&&!this.isFirstEvaluation)return;const l=this.changedGrips;this.changedGrips=new Set,this.isFirstEvaluation=!1;const i={getValue:u=>this.valuesMap.get(u)},o=this.evaluator.onGripsChanged(l,i);this.applyAttributionDelta(o)}applyAttributionDelta(l){this.container.getGrok().applyProducerDelta(this.container.getGripConsumerContext(),l)}},ry=class extends Rm{constructor(l,i){super(l,i),this.matcher=new iy(this)}addBinding(l){this.matcher.addBinding(l)}removeBinding(l){this.matcher.removeBinding(l)}},sy=class{constructor(l){this.graph=new Iv(this),this.taskQueue=new Kv,this.resolver=new Wv(this),this.registry=l,this.rootContext=new Pr(this,"root"),this.mainHomeContext=new Pr(this,"main-home").addParent(this.rootContext,0),this.mainPresentationContext=new Pr(this,"main-presentation").addParent(this.mainHomeContext,0),this.mainContext=new ry(this.mainHomeContext,this.mainPresentationContext)}getRegistry(){return this.registry}hasCycle(l){return this.graph.hasCycle(l)}submitTask(l,i,o){this.taskQueue.submit(l,i,o)}submitWeakTask(l,i){this.taskQueue.submitWeak(l,0,i)}getTaskQueue(){return this.taskQueue}flush(){this.taskQueue.flush()}ensureNode(l){return this.graph.ensureNode(l)}createContext(l,i=0,o){const u=new Pr(this,o);return(l??this.mainContext)&&u.addParent(l??this.mainContext,i),this.ensureNode(u),u}disposeContext(l){}createDualContext(l,i){const o=this.createContext(l,0),u=o.createChild();return this.ensureNode(u),new Rm(o,u)}registerTapAt(l,i){const o=l.getGripHomeContext();this.resolver.addProducer(o,i)}applyProducerDelta(l,i){this.resolver.applyProducerDelta(l,i)}registerTap(l){this.registerTapAt(this.mainContext,l)}unregisterTap(l){const i=l.getHomeContext();i&&this.resolver.removeProducer(i,l)}query(l,i){const o=i.getGripConsumerContext(),u=o.getGripConsumerContext()._getContextNode();var d=u.getLiveDripForGrip(l);return d?(u.getResolvedProviders().has(l)||this.resolver.addConsumer(o,l),d):(d=u.getOrCreateConsumer(l),this.resolver.addConsumer(o,l),d)}addBinding(l){this.mainContext.addBinding(l)}removeBinding(l){this.mainContext.removeBinding(l)}getGraph(){return this.graph.snapshot()}getGraphSanityCheck(){return this.graph.snapshotSanityCheck()}},Hm=class{constructor(l){if(this.kind="Tap",this.id=`tap_${Math.random().toString(36).substr(2,9)}`,this.paramDrips=new Map,this.paramDripsSubs=new Map,this.delayedUpdates=!0,this.paramUpdates=new Set,this.provides=l.provides,this.destinationParamGrips=l.destinationParamGrips,this.homeParamGrips=l.homeParamGrips,l.destinationParamGrips){for(const i of l.destinationParamGrips)if(this.provides.includes(i))throw new Error("Destination parameter grip is also provided by this tap")}}getHomeContext(){return this.homeContext}getParamsContext(){return this.paramsContext}onAttach(l){var i,o;if(l.getGripHomeContext){const f=l;i=f.getGripHomeContext(),o=f.getGripConsumerContext()}else i=l,o=i;this.homeContext=i,this.paramsContext=o;const u=this.homeContext._getContextNode();this.producer=u.getOrCreateProducerRecord(this,this.provides);for(const f of this.provides)u.recordProducer(f,this.producer);const d=i.getGrok();this.engine=d,this.subscribeToIncomingParams()}subscribeToIncomingParams(){if(!this.paramsContext||!this.homeParamGrips||this.homeParamGrips.length===0)return;this.delayedUpdates=!0;const l=this;for(const i of this.homeParamGrips){const o=this.paramsContext.getOrCreateConsumer(i),u=o.subscribe(()=>{l.inputParmsChanged(i)});this.paramDrips.set(i,o),this.paramDripsSubs.set(i,u)}}inputParmsChanged(l){this.paramUpdates.add(l),this.delayedUpdates||this.produceOnParams(l)}onDetach(){this.engine=void 0,this.homeContext=void 0,this.producer=void 0;for(const l of this.paramDripsSubs.values())try{l()}catch{}this.paramDripsSubs.clear(),this.paramDrips.clear()}getDestinationsForNode(l,i){const o=l.get_producers().get(i);if(!o)throw new Error("Grip not produced by this tap");return o.getDestinations().get(l)}onConnect(l,i){this.produce({destContext:l})}onDisconnect(l,i){const o=this.getDestination(l);if(!o)throw new Error("Destination not found for this tap");o.removeGrip(i)}getDestination(l){var i;return(i=this.producer)==null?void 0:i.getDestinations().get(l._getContextNode())}getDestParamValue(l,i){const o=this.getDestination(l);return o?.getDestinationParamValue(i)}getAllDestParamValues(l){const i=this.getDestination(l);return i?.getAllDestinationParamValues()}publish(l,i){if(!this.engine||!this.homeContext||!this.producer)return 0;var o=[];if(i){const d=i._getContextNode(),f=this.producer.getDestinations().get(d);if(!f)return 0;o.push(f)}else o=Array.from(this.producer.getDestinations().values());var u=0;for(const d of o){const f=d.getContext();if(f)for(const g of d.getGrips())l.has(g)&&(u+=f._getContextNode().notifyConsumers(g,l.get(g)))}return u}getDestinationParams(l){var i;return(i=this.producer)==null?void 0:i.getDestinationParams(l)}},oy=class extends Hm{constructor(l){super({provides:l.provides})}produceOnParams(l){throw new Error("Method not implemented.")}produceOnDestParams(l,i){throw new Error("Method not implemented.")}},uy=class extends oy{constructor(l,i,o){super({provides:o?.handleGrip?[l,o.handleGrip]:[l]}),this.listeners=new Set,this.valueGrip=l,this.handleGrip=o?.handleGrip,this.currentValue=i??l.defaultValue}produce(l){const i=new Map([[this.valueGrip,this.currentValue]]);this.handleGrip&&i.set(this.handleGrip,this),this.publish(i,l?.destContext)}get(){return this.currentValue}set(l){const i=l;this.currentValue!==i&&(this.currentValue=i,this.produce(),this.listeners.forEach(o=>o()))}update(l){this.set(l(this.currentValue))}subscribe(l){return this.listeners.add(l),()=>this.listeners.delete(l)}};function Jt(l,i){var o;return new uy(l,(o=i?.initial)!=null?o:l.defaultValue,i)}var cy=class extends Hm{constructor(l){var i;super({provides:l.handleGrip?[...l.provides,l.handleGrip]:l.provides,destinationParamGrips:l.destinationParamGrips,homeParamGrips:l.homeParamGrips}),this.state=new Map,this.homeParamUnsubs=[],this.computeFn=l.compute,this.handleGrip=l.handleGrip;const o=new Set((i=l.stateGrips)!=null?i:[]);if(l.initialState){const u=Array.isArray(l.initialState)?l.initialState:Array.from(l.initialState.keys()).map(d=>[d,void 0]);for(const[d]of u)o.add(d)}if(this.stateGripSet=o,l.initialState){const u=Array.isArray(l.initialState)?l.initialState:Array.from(l.initialState.entries());for(const[d,f]of u)this.state.set(d,f)}}getState(l){return this.state.get(l)}setState(l,i){this.state.get(l)!==i&&(this.state.set(l,i),this.produce())}onAttach(l){if(super.onAttach(l),this.homeParamGrips&&this.homeParamGrips.length>0)for(const i of this.homeParamGrips){const o=l.getOrCreateConsumer(i);l.getGrok().resolver.addConsumer(l,i);const u=o.subscribe(()=>{this.produce()});this.homeParamUnsubs.push(u)}}onDetach(){try{for(const l of this.homeParamUnsubs)l()}finally{this.homeParamUnsubs=[],super.onDetach()}}computeFor(l){const i=C=>{var A;return(A=this.homeContext)==null?void 0:A.getOrCreateConsumer(C).get()},o=(C,A)=>{var p,b;return(b=(p=A??l)!=null?p:this.homeContext)==null?void 0:b.getOrCreateConsumer(C).get()},u=C=>this.state.get(C),d=this.computeFn({dest:l,getHomeParam:i,getDestParam:o,getState:u}),f=new Map,g=[];for(const[C,A]of d){const p=C;this.stateGripSet.has(p)?g.push([p,A]):f.set(p,A)}if(g.length)for(const[C,A]of g)this.state.get(C)!==A&&this.state.set(C,A);return this.handleGrip&&f.set(this.handleGrip,this),f}produce(l){var i,o;if(l?.destContext){const d=this.computeFor(l.destContext);this.publish(d,l.destContext);return}const u=Array.from((o=(i=this.producer)==null?void 0:i.getDestinations().keys())!=null?o:[]);if(u.length!==0)for(const d of u){const f=d.get_context();if(!f)continue;const g=this.computeFor(f);this.publish(g,f)}}produceOnParams(){this.produce()}produceOnDestParams(l){this.produce({destContext:l})}};function Br(l){return new cy(l)}jm();var Um=zt.createContext(null);function dy(l){const i=l.context??l.grok.mainContext,o=zt.useMemo(()=>({grok:l.grok,context:i}),[l.grok,i]);return m.jsx(Um.Provider,{value:o,children:l.children})}function fy(){const l=zt.useContext(Um);if(!l)throw new Error("GripProvider missing");return l}function Bt(l,i){const{grok:o,context:u}=fy(),d=i&&i.getGripConsumerContext?i.getGripConsumerContext():i??u,f=zt.useMemo(()=>o.query(l,d),[o,d,l]),g=zt.useCallback(()=>f.get(),[f]),C=zt.useCallback(A=>f.subscribe(()=>A()),[f]);return zt.useSyncExternalStore(C,g,g)}function km(l,i){const o=Bt(l,i);return zt.useCallback(u=>{o?o.set(u):console.warn(`useGripSetter: handle is undefined - no tap registered for: ${l.key}?`)},[o,l])}function qr(l,i,o){const{ctx:u,parse:d,format:f}={},g=Bt(l,u),C=km(i,u),A=(f?f(g):g)??"",p=zt.useCallback(b=>{const v=b.target.value,E=d?d(v):v;E!==void 0&&C(E)},[C,d]);return{value:A,onChange:p}}function hy(l,i,o){const{ctx:u,emptyAs:d,clamp:f,parse:g,format:C}=o??{},A=Bt(l,u),p=km(i,u),b=zt.useCallback(Q=>{if(Q==null)return Q;let Y=Q;return f?.min!=null&&Y<f.min&&(Y=f.min),f?.max!=null&&Y>f.max&&(Y=f.max),Y},[f?.min,f?.max]),v=zt.useCallback(Q=>{if(Q==="")return d??void 0;const Y=Number(Q);return Number.isFinite(Y)?Y:d??void 0},[d]),E=C?C(A):A==null?"":String(A),q=zt.useCallback(Q=>{const Y=Q.target.value,nt=(g??v)(Y),ft=b(nt);ft!=null&&p(ft)},[p,g,v,b]);return{value:E,onChange:q}}const Gm=new Bv,ot=qv(Gm),Zu=new sy(Gm),my=Zu.mainContext,_a={background:"#f6f8f7",borderWidth:0,borderColor:"#b7c2bc",wedgeStrokeWidth:1,wedgeStrokeColor:"#ffffff",collapseRedundant:!0,fontFamily:"sans-serif",fontSizePx:12,width:"fit",height:"fit",colorScheme:["#0f6b48","#2a9d8f","#e9c46a","#f4a261","#e76f51"]},Ci={format:"auto",delimiter:",",hasHeaderRow:!0,commentPrefix:"#",magnitudeField:"magnitude",pathFields:["level1","level2"],urlField:"url",descriptionField:"description",attributeFields:[]},Tu=ot("AppView","selection"),py=ot("AppView.Tap"),mi=ot("Projects",[]),gy=ot("Projects.Tap"),pi=ot("ActiveProjectId",null),vy=ot("ActiveProjectId.Tap"),sm=ot("ActiveProject",null),gi=ot("Datasets",[]),yy=ot("Datasets.Tap"),vi=ot("ActiveDatasetId",null),by=ot("ActiveDatasetId.Tap"),yi=ot("ActiveDataset",null),Nu=ot("NewProjectName",""),Pm=ot("NewProjectName.Tap"),_u=ot("ImportSource",null),Lm=ot("ImportSource.Tap"),Eu=ot("ImportUrlInput",""),Bm=ot("ImportUrlInput.Tap"),wu=ot("ImportParameters",Ci),qm=ot("ImportParameters.Tap"),om=ot("ImportDetectedFormat",null),Sy=ot("ImportDetectedFormat.Tap"),um=ot("ImportRows",[]),xy=ot("ImportRows.Tap"),cm=ot("ImportTree",null),Cy=ot("ImportTree.Tap"),Mu=ot("ImportPreviewState",null),Ay=ot("ImportPreviewState.Tap"),Du=ot("ImportWarningsState",[]),Ty=ot("ImportWarningsState.Tap"),ju=ot("ImportFatalError",null),Ny=ot("ImportFatalError.Tap"),Ru=ot("ImportLoading",!1),_y=ot("ImportLoading.Tap"),zu=ot("ImportCanApply",!1),Ey=ot("ImportCanApply.Tap"),Ou=ot("ImportDatasetName",""),Fm=ot("ImportDatasetName.Tap"),Hu=ot("PreviewFilter",""),Vm=ot("PreviewFilter.Tap"),Uu=ot("ImportPopoverOpen",!1),Ym=ot("ImportPopoverOpen.Tap"),pl=ot("ChartSettingsState",_a),Km=ot("ChartSettingsState.Tap"),bi=ot("ChartFocusPath",null),wy=ot("ChartFocusPath.Tap"),ku=ot("ChartSelectedPath",null),My=ot("ChartSelectedPath.Tap"),Gu=ot("ChartHoverPath",null),Dy=ot("ChartHoverPath.Tap"),gl=ot("ChartDepthLimit",6),Xm=ot("ChartDepthLimit.Tap"),Pu=ot("ChartHistory",[]),jy=ot("ChartHistory.Tap"),Lu=ot("ChartHistoryIndex",-1),Ry=ot("ChartHistoryIndex.Tap"),Yr=ot("ChartLayout",null),Xr=ot("JownaActions");function Su(l,i){const o=l.trim();return/^#[0-9a-fA-F]{6}$/.test(o)?o:/^#[0-9a-fA-F]{3}$/.test(o)?`#${o[1]}${o[1]}${o[2]}${o[2]}${o[3]}${o[3]}`:i}const Qm=zt.createContext(null);function zy(l){return m.jsx(Qm.Provider,{value:l.model,children:l.children})}function sa(){const l=zt.useContext(Qm);if(!l)throw new Error("useChartScreenContext must be used inside ChartScreenProvider.");return l}function Oy(){const l=sa();return l.resolvedFocusPath?m.jsxs("div",{className:"panel chart-breadcrumbs",children:[m.jsx("span",{className:"muted",children:"Focus"}),l.resolvedFocusPath.map((i,o)=>{const u=l.resolvedFocusPath.slice(0,o+1),d=o===l.resolvedFocusPath.length-1;return m.jsx("button",{className:`crumb ${d?"is-current":""}`,onClick:()=>l.actions?.focusPath(u),children:i},`${i}-${o}`)})]}):null}function Hy(){const l=sa();return m.jsxs("header",{className:"panel row",style:{justifyContent:"space-between"},children:[m.jsxs("div",{children:[m.jsx("h1",{style:{marginBottom:4},children:"Chart View"}),m.jsx("div",{className:"muted",children:l.dataset?.name??"No active dataset"})]}),m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:l.openSettingsPopover,children:"Chart Settings"}),m.jsx("button",{className:"ghost",onClick:l.onDownloadHtml,disabled:!l.dataset,children:"Download HTML"}),m.jsx("button",{className:"ghost",onClick:l.onDownloadSvg,disabled:!l.dataset||!l.chartLayout,children:"Download SVG"}),m.jsx("button",{className:"ghost",onClick:()=>l.actions?.backToSelection(),children:"Back to Selection"})]})]})}function ts(l){return l.replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").trim().toLowerCase()}function Uy(l){const i=ts(l);return/\bunassigned\b/.test(i)}function ky(l){const i=ts(l);return/\bunassigned\b/.test(i)&&/\bmembers?\b/.test(i)}function Zm(l,i){const o=ts(l);return/\bmembers?\b/.test(o)?i.trim().length>0:!1}function Gy(l){const i=l.find(([u])=>ky(u));return i?i[0]:l.find(([u,d])=>Zm(u,d))?.[0]??null}function Py(l,i){const o=l.trim();if(o.length===0)return[];if(o.startsWith("[")&&o.endsWith("]")||o.startsWith("{")&&o.endsWith("}"))try{const f=JSON.parse(o);if(Array.isArray(f))return Array.from(new Set(f.map(g=>String(g).trim()).filter(g=>g.length>0)))}catch{}if((i?/\bmembers?\b/.test(ts(i)):!1)&&!/[,\n;|]/.test(o)){const f=o.split(/\s+/).filter(g=>g.length>0);if(f.length>1&&f.every(g=>/^[\w./:-]+$/.test(g)))return Array.from(new Set(f))}const d=o.includes(`
`)?/\r?\n+/:o.includes(";")?/\s*;\s*/:o.includes("|")?/\s*\|\s*/:/\s*,\s*/;return Array.from(new Set(o.split(d).map(f=>f.trim()).filter(f=>f.length>0)))}function Ea(l){return l.trim().toLowerCase().startsWith("[other ")}const Im=270,Ly=10,By=.5,dm=.6,fm=.8,vl="rgb(220,220,220)",Qr=4;function Si(l,i){return{x:Math.cos(i+Math.PI/2)*l,y:Math.sin(i+Math.PI/2)*l}}function qy(l,i,o,u){if(u<=o)return"";const d=u-o>Math.PI?1:0,f=Si(i,o),g=Si(i,u);if(l<=0)return[`M ${f.x} ${f.y}`,`A ${i} ${i} 0 ${d} 1 ${g.x} ${g.y}`,"L 0 0","Z"].join(" ");const C=Si(l,u),A=Si(l,o);return[`M ${f.x} ${f.y}`,`A ${i} ${i} 0 ${d} 1 ${g.x} ${g.y}`,`L ${C.x} ${C.y}`,`A ${l} ${l} 0 ${d} 0 ${A.x} ${A.y}`,"Z"].join(" ")}function Jm(l,i){return o=>{if(o<=0||l<=0)return 0;const u=o/l;return Math.pow(u,.86)*i}}function Fy(l,i){return l<=0?0:i<=0?l:Math.min(i,l)}function Vy(l){let i=l;for(;i<=-180;)i+=360;for(;i>180;)i-=360;return i}function $m(l){if(!l||l.nodes.length===0)return 0;let i=0;for(const o of l.nodes)o.depth<=0||Ea(o.name)||o.depth>i&&(i=o.depth);return i>0?i:l.nodes.reduce((o,u)=>Math.max(o,u.depth),0)}function xi(l,i){return l.length===i.length&&l.every((o,u)=>o===i[u])}function Ee(l){return l.join("/")}function Yy(l,i){if(!i||i.length===0)return l;const[o,...u]=i;if(o!==l.name)return null;let d=l;for(const f of u){const g=d.children?.find(C=>C.name===f);if(!g)return null;d=g}return d}function Ky(l){const i=new Map;if(!l||l.nodes.length===0)return i;const o=l.nodes.find(p=>p.depth===0)??l.nodes[0],u=new Set(l.nodes.map(p=>Ee(p.path))),d=new Map;for(const p of l.nodes){if(Ea(p.name)){i.set(Ee(p.path),vl);continue}if(p.depth===0)continue;const b=Ee(Xy(p.path.slice(0,-1),u)),v=d.get(b);v?v.push(p):d.set(b,[p])}d.forEach(p=>{p.sort((b,v)=>b.startAngle!==v.startAngle?b.startAngle-v.startAngle:b.endAngle-v.endAngle)});const f=$m(l),g=f>8?8:Math.max(f,1),C=(fm-dm)/g,A=(p,b,v)=>{let E=v;if(E-b>1/12&&(E=b+1/12),p.depth>0)if(p.magnitude<=0||Ea(p.name))i.set(Ee(p.path),vl);else{const Q=Math.min(fm,dm+(p.depth-1)*C),Y=Zy(b,By,Q);i.set(Ee(p.path),Qy(Y.r,Y.g,Y.b))}const q=d.get(Ee(p.path))??[];if(q.length!==0)for(let Q=0;Q<q.length;Q+=1){const Y=q[Q];let nt,ft;p.depth===0?q.length>6?(nt=(1-Math.pow(1-Q/q.length,1.4))*.95,ft=(1-Math.pow(1-(Q+.55)/q.length,1.4))*.95):(nt=Q/q.length,ft=(Q+.55)/q.length):(nt=hm(Y.startAngle,p.startAngle,p.endAngle,b,E),ft=hm(Y.startAngle+(Y.endAngle-Y.startAngle)*.99,p.startAngle,p.endAngle,b,E)),A(Y,nt,ft)}};return A(o,0,1),i}function Wm(l,i,o=vl){for(const u of i)if(!(!u||u.length===0))for(let d=u.length;d>=1;d-=1){const f=l.get(Ee(u.slice(0,d)));if(typeof f=="string"&&f.length>0)return f}return o}function Xy(l,i){for(let o=l.length;o>=0;o-=1){const u=l.slice(0,o);if(i.has(Ee(u)))return u}return[]}function hm(l,i,o,u,d){return o===i?u:u+(l-i)/(o-i)*(d-u)}function Qy(l,i,o){return`rgb(${l},${i},${o})`}function Zy(l,i,o){const u=o<=.5?o*(i+1):o+i-o*i,d=o*2-u;return{r:Math.floor(xu(d,u,l+1/3)),g:Math.floor(xu(d,u,l)),b:Math.floor(xu(d,u,l-1/3))}}function xu(l,i,o){let u=o;for(;u<0;)u+=1;for(;u>1;)u-=1;let d;return 6*u<1?d=l+(i-l)*u*6:2*u<1?d=i:3*u<2?d=l+(i-l)*(2/3-u)*6:d=l,d*255}function Iy(l,i,o,u,d,f){const g=u<=1||d>=u,C=l.endAngle-l.startAngle,A=o-i,p=i+A*(g?.6:.56),b=p*C,v=g?.007:.04,E=g?6:10,q=g?2:10;if(C<v||A<E||b<q)return null;const Q=(l.startAngle+l.endAngle)/2,Y=Si(p,Q),nt=Math.max(4,f*.58),ft=g?Math.max(0,A-f*.45):Math.max(0,b-f*.35),it=Math.max(g?4:6,Math.floor(ft/nt)),pt=l.name.length>it,Ot=$y(l.name,it),$t=g?Q*180/Math.PI-90:Q*180/Math.PI,Nt=Vy($t),V=Nt>90||Nt<-90,_=V?Nt+180:Nt;return{text:Ot,fullText:l.name,isTruncated:pt,x:Y.x,y:Y.y,rotate:_,anchor:g?V?"end":"start":"middle"}}function Jy(l,i){const f=Math.max(20,l.fullText.length*i*.58)+18,g=i+10+2,C=l.x,A=l.y-i*1.2;return{x:C-f/2,y:A-g/2,width:f,height:g,textX:C,textY:A}}function $y(l,i){return l.length<=i?l:`${l.slice(0,Math.max(0,i-3))}...`}function Wy(l,i,o){if(!l||l.nodes.length===0)return{visibleNodes:[]};const u=l.nodes.filter(v=>v.depth>0);if(u.length===0||i<=0)return{visibleNodes:u.map(v=>({node:v,isGroupedHidden:!1,hiddenCount:0,key:Ee(v.path),colorPath:v.path,interactionPath:v.path,renderOuterDepth:v.depth,labelOuterDepth:v.depth}))};const d=Math.max(Qr,o)*2.3,f=Jm(i,Im),g=new Map,C=new Set(u.map(v=>Ee(v.path)));for(const v of u){const E=Ee(v.path.slice(0,-1)),q=g.get(E);q?q.push(v):g.set(E,[v])}g.forEach(v=>{v.sort((E,q)=>E.startAngle!==q.startAngle?E.startAngle-q.startAngle:E.endAngle-q.endAngle)});const A=[];for(const[v,E]of g.entries()){let q=0,Q=0;for(;q<E.length;){const Y=E[q];if(!mm(Y,f,d)){A.push({node:Y,isGroupedHidden:!1,hiddenCount:0,key:Ee(Y.path),colorPath:Y.path,interactionPath:Y.path,renderOuterDepth:Y.depth,labelOuterDepth:Y.depth}),q+=1;continue}let nt=q;for(;nt+1<E.length&&mm(E[nt+1],f,d);)nt+=1;const ft=E.slice(q,nt+1),it=ft[0],pt=ft[ft.length-1],Ot=it.path.slice(0,-1),$t=Ot.length>0?Ot:it.path,Nt=ft.find(G=>!Ea(G.name))??it,V=t0(Ot,Nt.path,C),_=ft.length,w=ft.reduce((G,Z)=>G+Z.magnitude,0);A.push({node:{path:it.path.slice(0,-1).concat([`${_} more`]),name:`${_} more`,depth:it.depth,magnitude:w,startAngle:it.startAngle,endAngle:pt.endAngle},isGroupedHidden:!0,hiddenCount:_,key:`${v}/[${_}-more-${Q}]`,colorPath:V,interactionPath:$t,renderOuterDepth:it.depth,labelOuterDepth:it.depth}),Q+=1,q=nt+1}}const p=A.sort((v,E)=>v.node.depth!==E.node.depth?v.node.depth-E.node.depth:v.node.startAngle!==E.node.startAngle?v.node.startAngle-E.node.startAngle:v.node.endAngle!==E.node.endAngle?v.node.endAngle-E.node.endAngle:v.key.localeCompare(E.key)),b=new Set(p.map(v=>Ee(v.node.path.slice(0,-1))));return{visibleNodes:p.map(v=>{const E=b.has(Ee(v.node.path)),q=Math.min(i,v.node.depth);return{...v,renderOuterDepth:v.isGroupedHidden?i:E?q:i,labelOuterDepth:E?q:i}})}}function mm(l,i,o){const u=i(Math.max(0,l.depth-1)),d=i(l.depth);return Math.max(0,l.endAngle-l.startAngle)*(u+d)<o}function t0(l,i,o){for(let u=l.length;u>=2;u-=1){const d=l.slice(0,u);if(o.has(Ee(d)))return d}return i}function e0(){const l=sa();return m.jsx("section",{className:"chart-surface chart-surface-krona",style:l.chartSurfaceStyle,children:!l.dataset||!l.chartLayout?m.jsx("div",{className:"muted",children:"No chart data yet. Import a dataset and open chart."}):m.jsxs(m.Fragment,{children:[m.jsxs("svg",{ref:l.chartSvgRef,className:"chart-canvas chart-canvas-krona",viewBox:"0 0 620 620",role:"img",style:l.chartCanvasStyle,children:[m.jsx("defs",{children:m.jsxs("pattern",{id:"chart-hidden-pattern",patternUnits:"userSpaceOnUse",x:"0",y:"0",width:"7",height:"7",children:[m.jsx("line",{x1:"0",y1:"0",x2:"3.5",y2:"3.5",stroke:"rgba(16,36,27,0.35)",strokeWidth:"0.8"}),m.jsx("line",{x1:"3.5",y1:"7",x2:"7",y2:"3.5",stroke:"rgba(16,36,27,0.35)",strokeWidth:"0.8"})]})}),m.jsxs("g",{transform:"translate(310 310)",style:{fontFamily:l.resolvedChartSettings.fontFamily},children:[l.wedgeRenderPlan.visibleNodes.map(i=>{const o=i.node,u=i.interactionPath,d=l.radiusScale(Math.max(0,o.depth-1)),f=l.radiusScale(i.renderOuterDepth),g=qy(d,f,o.startAngle,o.endAngle);if(!g)return null;const C=u.length>0&&!Ea(o.name),A=C&&l.activePath?xi(u,l.activePath):!1,p=C&&l.resolvedFocusPath?xi(u,l.resolvedFocusPath):!1,b=Ea(o.name)?vl:Wm(l.kronaColors,[i.colorPath,u,o.path],vl),v=i.key,E=i.isGroupedHidden?`${i.hiddenCount} more`:`${o.path.join(" / ")}: ${o.magnitude.toLocaleString()}`;return m.jsxs("g",{children:[m.jsx("path",{className:`chart-wedge ${A?"is-active":""} ${p?"is-focus":""}`,d:g,fill:b,stroke:A?"#062d1e":l.resolvedChartSettings.wedgeStrokeColor,strokeWidth:A?2.2:Math.max(.4,l.resolvedChartSettings.wedgeStrokeWidth),opacity:C&&l.hoverPath?A?1:.42:p?1:.92,role:C?"button":void 0,tabIndex:C?0:void 0,onMouseEnter:C?()=>l.actions?.hoverPath(u):void 0,onMouseLeave:C?()=>l.actions?.hoverPath(null):void 0,onClick:C?()=>l.actions?.focusPath(u):void 0,onKeyDown:C?q=>{(q.key==="Enter"||q.key===" ")&&(q.preventDefault(),l.actions?.focusPath(u))}:void 0,children:m.jsx("title",{children:E})}),i.isGroupedHidden&&m.jsx("path",{d:g,fill:"url(#chart-hidden-pattern)",stroke:"none",opacity:.65,pointerEvents:"none"})]},v)}),l.wedgeRenderPlan.visibleNodes.map(i=>{const o=i.node,u=i.interactionPath,d=l.radiusScale(Math.max(0,o.depth-1)),f=l.radiusScale(i.labelOuterDepth),g=Iy(o,d,f,l.maxDepth,i.labelOuterDepth,l.labelFontSize);if(!g)return null;const A=!!l.hoverPath&&xi(u,l.hoverPath??[])&&g.isTruncated?Jy(g,l.labelFontSize):null;return m.jsxs("g",{children:[A&&m.jsxs("g",{className:"chart-label-tooltip",pointerEvents:"none",children:[m.jsx("rect",{className:"chart-label-tooltip-box",x:A.x,y:A.y,width:A.width,height:A.height,rx:7,ry:7,fill:"#ffffff",stroke:l.resolvedChartSettings.wedgeStrokeColor,strokeWidth:Math.max(.4,l.resolvedChartSettings.wedgeStrokeWidth)+.5}),m.jsx("text",{className:"chart-label-tooltip-text",x:A.textX,y:A.textY,textAnchor:"middle",dominantBaseline:"middle",style:{fontFamily:l.resolvedChartSettings.fontFamily,fontSize:`${l.labelFontSize}px`},children:g.fullText})]}),m.jsx("text",{className:"chart-wedge-label",x:g.x,y:g.y,textAnchor:g.anchor,dominantBaseline:"middle",transform:`rotate(${g.rotate} ${g.x} ${g.y})`,style:{fontFamily:l.resolvedChartSettings.fontFamily,fontSize:`${l.labelFontSize}px`},children:g.text})]},`label-${i.key}`)}),m.jsx("circle",{r:l.centerDiscRadius,className:"chart-center-disc",onClick:()=>l.parentFocusPath?l.actions?.focusPath(l.parentFocusPath):l.actions?.clearFocus()}),m.jsx("text",{x:0,y:-18,textAnchor:"middle",className:"chart-center-title",children:l.activeNode?.name??l.resolvedFocusPath?.[l.resolvedFocusPath.length-1]??"Root"}),m.jsx("text",{x:0,y:2,textAnchor:"middle",className:"chart-center-metric",children:l.activeMagnitude.toLocaleString()}),m.jsxs("text",{x:0,y:22,textAnchor:"middle",className:"chart-center-sub",children:[l.activeShare.toFixed(1),"% of view"]})]})]}),m.jsx("div",{className:"chart-hint muted",children:"Click a segment to zoom. Hover to inspect. Click center to move up."})]})})}function n0(){const l=sa();return l.detailsPanelCollapsed?null:m.jsxs("aside",{className:"panel stack chart-details",children:[m.jsx("h3",{children:l.hoverPath?"Hover Details":"Details"}),l.activeNode?m.jsxs("div",{className:"stack",children:[m.jsx("div",{children:m.jsx("strong",{children:l.activeNode.name})}),m.jsxs("div",{className:"muted",children:["path: ",(l.activePath??[]).join(" / ")]}),m.jsxs("div",{className:"chart-stats",children:[m.jsxs("div",{className:"chart-stat",children:[m.jsx("span",{className:"muted",children:"Magnitude"}),m.jsx("strong",{children:l.activeMagnitude.toLocaleString()})]}),m.jsxs("div",{className:"chart-stat",children:[m.jsx("span",{className:"muted",children:"Share"}),m.jsxs("strong",{children:[l.activeShare.toFixed(1),"%"]})]}),m.jsxs("div",{className:"chart-stat",children:[m.jsx("span",{className:"muted",children:"Children"}),m.jsx("strong",{children:l.activeNode.children?.length??0})]})]}),l.activeNode.description&&m.jsx("div",{children:l.activeNode.description}),l.activeNode.url&&m.jsx("div",{children:m.jsx("a",{href:l.activeNode.url,target:"_blank",rel:"noreferrer",children:l.activeNode.url})}),m.jsxs("div",{className:"stack",children:[l.visibleAttributes.map(([i,o])=>m.jsxs("div",{className:"muted",children:[m.jsxs("strong",{children:[i,":"]})," ",o]},i)),m.jsx("button",{className:"ghost members-popover-trigger",onClick:l.onToggleMembersPopover,"aria-haspopup":"dialog","aria-expanded":l.membersPopoverOpen,children:`${l.unassignedMembersLabel} (${l.unassignedMembers.length})`})]})]}):m.jsx("div",{className:"muted",children:"Hover or click a wedge to inspect node details."}),m.jsxs("div",{className:"stack",children:[m.jsx("h3",{children:"Top Segments"}),l.topSegments.length===0?m.jsx("div",{className:"muted",children:"No segments in the current view."}):m.jsxs("div",{className:"stack",children:[l.topSegments.map(i=>{const o=l.totalMagnitude>0?i.magnitude/l.totalMagnitude*100:0,u=l.activePath?xi(i.path,l.activePath):!1;return m.jsxs("button",{className:`key-row ${u?"is-active":""}`,onMouseEnter:()=>l.actions?.hoverPath(i.path),onMouseLeave:()=>l.actions?.hoverPath(null),onClick:()=>l.actions?.focusPath(i.path),children:[m.jsx("span",{className:"legend-dot",style:{background:Wm(l.kronaColors,[i.path],vl)}}),m.jsx("span",{className:"key-label",children:i.name}),m.jsxs("span",{className:"key-value",children:[o.toFixed(1),"%"]})]},`key-${i.path.join("/")}`)}),l.hiddenSegments>0&&m.jsxs("div",{className:"muted",children:["+ ",l.hiddenSegments," more in this level"]})]})]})]})}function a0(){const l=sa();return m.jsxs("div",{className:`chart-layout ${l.detailsPanelCollapsed?"is-details-hidden":""}`,children:[m.jsx(e0,{}),m.jsx(n0,{})]})}function l0(){const l=sa();return l.settingsPopoverOpen?m.jsx("div",{className:"chart-settings-popover-backdrop",onClick:l.closeSettingsPopover,children:m.jsxs("section",{className:"panel chart-settings-popover",role:"dialog","aria-modal":"true","aria-label":"Chart settings",onClick:i=>i.stopPropagation(),children:[m.jsxs("header",{className:"chart-settings-popover-header",children:[m.jsx("h2",{children:"Chart Settings"}),m.jsx("button",{className:"ghost popover-x",onClick:l.closeSettingsPopover,"aria-label":"Close chart settings",children:"X"})]}),m.jsx("div",{className:"chart-settings-popover-body",children:m.jsxs("div",{className:"chart-settings-grid",children:[m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Background"}),m.jsxs("div",{className:"row",children:[m.jsx("input",{className:"chart-color-input",type:"color",value:Su(l.resolvedChartSettings.background,"#f6f8f7"),onChange:i=>l.updateChartSettings({background:i.target.value})}),m.jsx("input",{value:l.resolvedChartSettings.background,onChange:i=>l.updateChartSettings({background:i.target.value})})]})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Border Color"}),m.jsxs("div",{className:"row",children:[m.jsx("input",{className:"chart-color-input",type:"color",value:Su(l.resolvedChartSettings.borderColor,"#b7c2bc"),onChange:i=>l.updateChartSettings({borderColor:i.target.value})}),m.jsx("input",{value:l.resolvedChartSettings.borderColor,onChange:i=>l.updateChartSettings({borderColor:i.target.value})})]})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Border Width"}),m.jsx("input",{type:"number",min:0,step:.2,value:l.resolvedChartSettings.borderWidth,onChange:i=>{const o=Number.parseFloat(i.target.value);Number.isFinite(o)&&l.updateChartSettings({borderWidth:Math.max(0,o)})}})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Wedge Stroke Color"}),m.jsxs("div",{className:"row",children:[m.jsx("input",{className:"chart-color-input",type:"color",value:Su(l.resolvedChartSettings.wedgeStrokeColor,"#ffffff"),onChange:i=>l.updateChartSettings({wedgeStrokeColor:i.target.value})}),m.jsx("input",{value:l.resolvedChartSettings.wedgeStrokeColor,onChange:i=>l.updateChartSettings({wedgeStrokeColor:i.target.value})})]})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Wedge Stroke Width"}),m.jsx("input",{type:"number",min:.4,step:.2,value:l.resolvedChartSettings.wedgeStrokeWidth,onChange:i=>{const o=Number.parseFloat(i.target.value);Number.isFinite(o)&&l.updateChartSettings({wedgeStrokeWidth:Math.max(.4,o)})}})]}),m.jsxs("label",{className:"row",style:{alignItems:"center"},children:[m.jsx("input",{type:"checkbox",style:{width:"auto"},checked:l.resolvedChartSettings.collapseRedundant,onChange:i=>l.updateChartSettings({collapseRedundant:i.target.checked})}),m.jsx("span",{children:"Collapse redundant wedges"})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Font Family"}),m.jsx("select",{value:l.resolvedChartSettings.fontFamily,onChange:i=>l.updateChartSettings({fontFamily:i.target.value}),children:l.chartFontOptions.map(i=>m.jsx("option",{value:i.value,children:i.label},i.value))})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Font Size (px)"}),m.jsx("input",{type:"number",min:Qr,step:1,value:l.resolvedChartSettings.fontSizePx,onChange:i=>{const o=Number.parseFloat(i.target.value);Number.isFinite(o)&&l.updateChartSettings({fontSizePx:Math.max(Qr,o)})}})]}),m.jsxs("div",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Chart Width"}),m.jsxs("div",{className:"row chart-dimension-row",children:[m.jsxs("select",{value:l.widthMode,onChange:i=>l.updateDimensionMode("width",i.target.value),children:[m.jsx("option",{value:"fit",children:"Fit"}),m.jsx("option",{value:"custom",children:"Custom"})]}),m.jsx("input",{type:"number",min:240,step:10,value:l.widthInputValue,onChange:l.onDimensionValueChange("width"),onFocus:l.onDimensionInputFocus("width"),onBlur:l.onDimensionInputBlur("width"),disabled:l.widthMode==="fit"})]})]}),m.jsxs("div",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Chart Height"}),m.jsxs("div",{className:"row chart-dimension-row",children:[m.jsxs("select",{value:l.heightMode,onChange:i=>l.updateDimensionMode("height",i.target.value),children:[m.jsx("option",{value:"fit",children:"Fit"}),m.jsx("option",{value:"custom",children:"Custom"})]}),m.jsx("input",{type:"number",min:240,step:10,value:l.heightInputValue,onChange:l.onDimensionValueChange("height"),onFocus:l.onDimensionInputFocus("height"),onBlur:l.onDimensionInputBlur("height"),disabled:l.heightMode==="fit"})]})]})]})}),m.jsxs("footer",{className:"row chart-settings-popover-footer",children:[m.jsx("button",{className:"ghost",onClick:()=>l.persistChartSettings({..._a}),children:"Reset Defaults"}),m.jsx("button",{className:"ghost",onClick:l.closeSettingsPopover,children:"Close"})]})]})}):null}function i0(){const l=sa();return m.jsxs("div",{className:"panel row chart-toolbar",style:{justifyContent:"space-between"},children:[m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:()=>l.actions?.goBack(),disabled:l.historyIndex<=0,children:"Back"}),m.jsx("button",{className:"ghost",onClick:()=>l.actions?.goForward(),disabled:l.historyIndex>=l.history.length-1,children:"Forward"}),m.jsx("button",{className:"ghost",onClick:()=>l.parentFocusPath&&l.actions?.focusPath(l.parentFocusPath),disabled:!l.parentFocusPath,children:"Up"}),m.jsx("button",{className:"ghost",onClick:()=>l.actions?.clearFocus(),children:"Reset"}),m.jsx("button",{className:"ghost",onClick:l.onToggleDetailsPanel,children:l.detailsPanelCollapsed?"Show Details":"Hide Details"})]}),m.jsxs("div",{className:"row",style:{minWidth:220},children:[m.jsxs("label",{className:"row chart-collapse-wrap",children:[m.jsx("input",{type:"checkbox",checked:l.resolvedChartSettings.collapseRedundant,onChange:i=>l.updateChartSettings({collapseRedundant:i.target.checked})}),m.jsx("span",{children:"Collapse"})]}),m.jsx("span",{className:"muted",children:"Depth"}),m.jsx("input",{type:"number",...l.depthBind,min:0,max:12})]})]})}function r0(){const l=sa();return l.detailsPanelCollapsed||!l.membersPopoverOpen?null:m.jsx("div",{className:"members-popover-layer",children:m.jsxs("section",{className:"panel members-popover members-popover-floating",role:"dialog","aria-label":`${l.unassignedMembersLabel} list`,children:[m.jsxs("header",{className:"members-popover-header",children:[m.jsx("strong",{children:`${l.unassignedMembersLabel} (${l.unassignedMembers.length})`}),m.jsx("button",{className:"ghost popover-x",onClick:l.onCloseMembersPopover,"aria-label":"Close members list",children:"X"})]}),m.jsx("div",{className:"members-popover-list",children:l.unassignedMembers.map((i,o)=>m.jsx("div",{className:"members-popover-item",children:i},`${i}-${o}`))}),m.jsx("footer",{className:"members-popover-footer",children:m.jsx("button",{className:"ghost",onClick:l.onCloseMembersPopover,children:"Close"})})]})})}const Cu=[{label:"Krona (sans-serif)",value:"sans-serif"},{label:"Arial",value:"Arial"},{label:"Helvetica",value:"Helvetica"},{label:"Verdana",value:"Verdana"},{label:"IBM Plex Sans",value:"IBM Plex Sans"},{label:"System UI",value:"system-ui"},{label:"Times New Roman",value:"Times New Roman"},{label:"Courier New",value:"Courier New"},{label:"Monospace",value:"monospace"}];function s0(l,i){const o=new Blob([i],{type:"text/html;charset=utf-8"});tp(l,o)}function o0(l,i){const o=c0(i),u=new Blob([o],{type:"image/svg+xml;charset=utf-8"});tp(l,u)}function u0(l){const i=l.trim().replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return`${i.length>0?i:"dataset-chart"}.svg`}function tp(l,i){const o=URL.createObjectURL(i),u=document.createElement("a");u.href=o,u.download=l,u.rel="noopener",u.click(),URL.revokeObjectURL(o)}function c0(l){const i=l.cloneNode(!0);i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");const o=i.getAttribute("viewBox");if(o){const d=o.trim().split(/\s+/).map(f=>Number.parseFloat(f));d.length===4&&d.every(f=>Number.isFinite(f))&&(i.setAttribute("width",String(d[2])),i.setAttribute("height",String(d[3])))}const u=document.createElementNS("http://www.w3.org/2000/svg","style");return u.textContent=`
    .chart-wedge-label{fill:#0e2b1f;font-weight:600}
    .chart-center-disc{fill:#f4faf7;stroke:#c4d8cc;stroke-width:1.4}
    .chart-center-title{font-size:13px;font-weight:700;fill:#102a1f}
    .chart-center-metric{font-size:15px;font-weight:700;fill:#174936}
    .chart-center-sub{font-size:11px;fill:#4f675d}
  `,i.insertBefore(u,i.firstChild),`<?xml version="1.0" encoding="UTF-8"?>
${i.outerHTML}`}function d0(l){const i=m0({name:l.datasetName,tree:l.tree,depthLimit:l.depthLimit,chartSettings:l.chartSettings});return`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${h0(l.datasetName)}</title>
    <style>${p0}</style>
  </head>
  <body>
    <div class="app-shell">
      <div class="app-frame chart-screen-frame">
        <header class="panel row space-between">
          <div>
            <h1 id="chart-title">Chart</h1>
            <div id="chart-subtitle" class="muted"></div>
            <div class="generated-by muted">
              Generated by
              <a href="https://github.com/owebeeone/jowna" target="_blank" rel="noreferrer noopener">
                Jowna
              </a>
            </div>
          </div>
        </header>

        <div class="panel row chart-toolbar space-between">
          <div class="row">
            <button id="btn-back" class="ghost">Back</button>
            <button id="btn-forward" class="ghost">Forward</button>
            <button id="btn-up" class="ghost">Up</button>
            <button id="btn-reset" class="ghost">Reset</button>
            <button id="btn-toggle-details" class="ghost">Hide Details</button>
            <label class="row chart-collapse-wrap">
              <input id="collapse-input" type="checkbox" />
              <span>Collapse</span>
            </label>
            <button id="btn-download-svg" class="ghost">Download SVG</button>
          </div>
          <div class="row depth-wrap">
            <span class="muted">Depth</span>
            <input id="depth-input" type="number" min="0" max="12" />
          </div>
        </div>

        <div id="breadcrumbs" class="panel chart-breadcrumbs"></div>

        <div id="chart-layout" class="chart-layout">
          <section class="chart-surface chart-surface-krona">
            <svg id="chart-svg" class="chart-canvas chart-canvas-krona" viewBox="0 0 620 620" role="img">
              <g id="chart-root" transform="translate(310 310)"></g>
            </svg>
            <div class="chart-hint muted">Click a segment to zoom. Hover to inspect. Click center to move up.</div>
          </section>

          <aside id="chart-details" class="panel stack chart-details">
            <h3 id="details-heading">Details</h3>
            <div id="details-content" class="stack"></div>
            <div class="stack">
              <h3>Top Segments</h3>
              <div id="top-segments" class="stack"></div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <script id="jowna-export-data" type="application/json">${i}<\/script>
    <script>${g0}<\/script>
  </body>
</html>
`}function f0(l){const i=l.trim().replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return`${i.length>0?i:"dataset-chart"}.html`}function h0(l){return l.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function m0(l){return JSON.stringify(l).replaceAll("<","\\u003c").replaceAll(">","\\u003e").replaceAll("&","\\u0026").replaceAll("\u2028","\\u2028").replaceAll("\u2029","\\u2029")}const p0=`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
}

.app-shell {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 0%, #e2f4ea, #f6f8f7 45%, #eef3f1 100%);
  color: #12251c;
}

.app-frame {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  gap: 16px;
}

.app-frame.chart-screen-frame {
  max-width: none;
  width: 100%;
}

.panel {
  background: #ffffff;
  border: 1px solid #d6dfda;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(15, 32, 24, 0.06);
}

.panel h1,
.panel h2,
.panel h3 {
  margin: 0;
}

.row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.stack {
  display: grid;
  gap: 8px;
}

.space-between {
  justify-content: space-between;
}

.muted {
  color: #52675d;
  font-size: 0.9rem;
}

.generated-by {
  margin-top: 4px;
}

.generated-by a {
  color: inherit;
  text-decoration: underline;
}

button,
input {
  font: inherit;
}

input {
  width: 100%;
  border: 1px solid #c5d1ca;
  border-radius: 8px;
  padding: 8px;
  background: #fbfdfc;
}

.chart-collapse-wrap {
  border: 1px solid #c5d1ca;
  border-radius: 8px;
  padding: 6px 10px;
  background: #ffffff;
}

.chart-collapse-wrap input[type="checkbox"] {
  width: auto;
  margin: 0;
}

button {
  border: 1px solid #1f6f4d;
  border-radius: 8px;
  padding: 8px 12px;
  background: #1f6f4d;
  color: #ffffff;
  cursor: pointer;
}

button.ghost {
  background: #ffffff;
  color: #1f6f4d;
}

button:disabled {
  opacity: 0.6;
  cursor: default;
}

.depth-wrap {
  min-width: 220px;
}

.chart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
}

.chart-layout.is-details-hidden {
  grid-template-columns: minmax(0, 1fr);
}

.chart-surface {
  background: #ffffff;
  border: 1px solid #d6dfda;
  border-radius: 12px;
  padding: 12px;
  min-height: 0;
}

.chart-surface-krona {
  background:
    radial-gradient(circle at 50% 40%, #f9fdfb 0%, #f4faf7 38%, #ebf3ee 100%),
    #ffffff;
}

.chart-canvas {
  width: 100%;
  height: 600px;
  display: block;
}

.chart-canvas-krona {
  height: clamp(560px, calc(100vh - 270px), 1400px);
  overflow: visible;
}

.chart-layout.is-details-hidden .chart-canvas-krona {
  height: clamp(620px, calc(100vh - 230px), 1600px);
}

.chart-breadcrumbs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.crumb {
  border: 1px solid #bfd2c8;
  background: #f4faf7;
  color: #194533;
  border-radius: 999px;
  padding: 5px 10px;
  line-height: 1.2;
}

.crumb.is-current {
  border-color: #175d3f;
  background: #1f6f4d;
  color: #ffffff;
}

.chart-wedge {
  cursor: pointer;
  transition:
    opacity 160ms ease,
    stroke-width 180ms ease,
    filter 160ms ease;
}

.chart-wedge:hover {
  filter: brightness(1.07) saturate(1.06);
}

.chart-wedge.is-active {
  filter: brightness(1.08) saturate(1.12);
}

.chart-wedge.is-focus {
  filter: saturate(1.14);
}

.chart-wedge-label {
  fill: #0e2b1f;
  font-size: 11px;
  font-weight: 600;
  pointer-events: none;
  text-rendering: geometricPrecision;
}

.chart-label-tooltip {
  pointer-events: none;
}

.chart-label-tooltip-box {
  fill: #ffffff;
}

.chart-label-tooltip-text {
  fill: #102a1f;
  font-weight: 600;
}

.chart-center-disc {
  fill: #f4faf7;
  stroke: #c4d8cc;
  stroke-width: 1.4;
  cursor: pointer;
}

.chart-center-title {
  font-size: 13px;
  font-weight: 700;
  fill: #102a1f;
}

.chart-center-metric {
  font-size: 15px;
  font-weight: 700;
  fill: #174936;
}

.chart-center-sub {
  font-size: 11px;
  fill: #4f675d;
}

.chart-hint {
  text-align: center;
}

.chart-details {
  max-height: 700px;
  overflow: auto;
}

.chart-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.chart-stat {
  border: 1px solid #d4e1db;
  border-radius: 10px;
  background: #f7fbf9;
  padding: 8px;
  display: grid;
  gap: 2px;
}

.key-row {
  border: 1px solid #d0ddd6;
  background: #ffffff;
  color: #1c3d30;
  border-radius: 8px;
  padding: 8px 10px;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
}

.key-row:hover {
  border-color: #96b9a8;
  background: #f4faf7;
}

.key-row.is-active {
  border-color: #1f6f4d;
  background: #e8f4ed;
}

.key-label {
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.key-value {
  font-variant-numeric: tabular-nums;
  color: #335a4a;
}

.legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 99px;
  margin-right: 6px;
}

@media (max-width: 980px) {
  .chart-layout {
    grid-template-columns: 1fr;
  }

  .chart-surface {
    min-height: 480px;
  }

  .chart-canvas {
    height: 460px;
  }

  .chart-canvas-krona {
    height: 500px;
  }

  .chart-layout.is-details-hidden .chart-canvas-krona {
    height: 540px;
  }

  .chart-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
`,g0=`
(function () {
  var OUTER_RADIUS = 270;
  var MAX_KEY_SEGMENTS = 10;
  var MIN_LABEL_FONT_SIZE = 4;
  var KRONA_SATURATION = 0.5;
  var KRONA_LIGHTNESS_BASE = 0.6;
  var KRONA_LIGHTNESS_MAX = 0.8;
  var KRONA_UNCLASSIFIED_COLOR = "rgb(220,220,220)";
  var SVG_NS = "http://www.w3.org/2000/svg";

  var payload = readPayload();
  if (!payload || !payload.tree || typeof payload.tree.name !== "string") {
    showFatal("Missing chart dataset payload.");
    return;
  }

  var dataset = payload;
  var chartSettings = resolveChartSettings(payload.chartSettings);
  var rootPath = [dataset.tree.name];
  var state = {
    focusPath: rootPath.slice(),
    selectedPath: rootPath.slice(),
    hoverPath: null,
    detailsPanelCollapsed: false,
    history: [rootPath.slice()],
    historyIndex: 0,
    depthLimit: normalizeDepthLimit(payload.depthLimit),
  };

  var elements = {
    title: byId("chart-title"),
    subtitle: byId("chart-subtitle"),
    backButton: byId("btn-back"),
    forwardButton: byId("btn-forward"),
    upButton: byId("btn-up"),
    resetButton: byId("btn-reset"),
    toggleDetailsButton: byId("btn-toggle-details"),
    collapseInput: byId("collapse-input"),
    downloadSvgButton: byId("btn-download-svg"),
    depthInput: byId("depth-input"),
    breadcrumbs: byId("breadcrumbs"),
    chartLayout: byId("chart-layout"),
    chartDetails: byId("chart-details"),
    chartSurface: byClass("chart-surface"),
    chartSvg: byId("chart-svg"),
    chartRoot: byId("chart-root"),
    detailsHeading: byId("details-heading"),
    detailsContent: byId("details-content"),
    topSegments: byId("top-segments"),
  };

  var datasetName = typeof dataset.name === "string" && dataset.name.length > 0 ? dataset.name : "Dataset";
  document.title = datasetName;
  elements.title.textContent = datasetName;
  elements.subtitle.textContent = datasetName;
  elements.depthInput.value = String(state.depthLimit);
  elements.collapseInput.checked = chartSettings.collapseRedundant !== false;
  applyChartSettings();
  applyDetailsPanelVisibility();

  bindControls();
  render();

  function bindControls() {
    elements.backButton.addEventListener("click", function () {
      if (state.historyIndex <= 0) {
        return;
      }
      state.historyIndex -= 1;
      var path = state.history[state.historyIndex];
      state.focusPath = path.slice();
      state.selectedPath = path.slice();
      state.hoverPath = null;
      render();
    });

    elements.forwardButton.addEventListener("click", function () {
      if (state.historyIndex >= state.history.length - 1) {
        return;
      }
      state.historyIndex += 1;
      var path = state.history[state.historyIndex];
      state.focusPath = path.slice();
      state.selectedPath = path.slice();
      state.hoverPath = null;
      render();
    });

    elements.upButton.addEventListener("click", function () {
      var focusPath = state.focusPath && state.focusPath.length > 0 ? state.focusPath : rootPath;
      if (focusPath.length <= 1) {
        return;
      }
      setFocusPath(focusPath.slice(0, -1), true);
    });

    elements.resetButton.addEventListener("click", function () {
      state.focusPath = rootPath.slice();
      state.selectedPath = rootPath.slice();
      state.hoverPath = null;
      state.history = [rootPath.slice()];
      state.historyIndex = 0;
      render();
    });

    elements.toggleDetailsButton.addEventListener("click", function () {
      state.detailsPanelCollapsed = !state.detailsPanelCollapsed;
      applyDetailsPanelVisibility();
    });

    elements.downloadSvgButton.addEventListener("click", function () {
      downloadCurrentSvg();
    });

    elements.depthInput.addEventListener("input", function () {
      state.depthLimit = normalizeDepthLimit(elements.depthInput.value);
      render();
    });

    elements.collapseInput.addEventListener("change", function () {
      chartSettings.collapseRedundant = !!elements.collapseInput.checked;
      render();
    });
  }

  function render() {
    var layout = computeLayout(dataset.tree, state.focusPath, state.depthLimit);
    var colorLayout = computeLayout(dataset.tree, null, 0);
    var kronaColors = buildKronaColorMap(colorLayout);

    var resolvedFocusPath = state.focusPath && state.focusPath.length > 0 ? state.focusPath : rootPath;
    var activePath = state.hoverPath || state.selectedPath || resolvedFocusPath;
    var activeNode = findNodeByPath(dataset.tree, activePath);
    var activeLayoutNode = findLayoutNodeByPath(layout.nodes, activePath);

    var totalMagnitude = layout.totalMagnitude;
    var activeMagnitude = activeLayoutNode ? activeLayoutNode.magnitude : activeNode ? activeNode.magnitude : 0;
    var activeShare = totalMagnitude > 0 ? (activeMagnitude / totalMagnitude) * 100 : 0;
    var layoutDataMaxDepth = computeLayoutDataMaxDepth(layout);
    var renderDepth = resolveRenderDepth(layoutDataMaxDepth, state.depthLimit);
    var maxDepth = renderDepth;
    var radiusScale = createRadiusScale(renderDepth, OUTER_RADIUS);
    var centerDiscRadius = maxDepth > 0 ? Math.max(8, Math.min(42, radiusScale(1) * 0.78)) : 42;
    var wedgeRenderPlan = createWedgeRenderPlan(
      layout,
      renderDepth,
      Math.max(MIN_LABEL_FONT_SIZE, chartSettings.fontSizePx),
      radiusScale
    );
    var parentFocusPath = resolvedFocusPath.length > 1 ? resolvedFocusPath.slice(0, -1) : null;

    renderToolbar(parentFocusPath);
    renderBreadcrumbs(resolvedFocusPath);
    renderSvg(
      layout,
      kronaColors,
      activePath,
      resolvedFocusPath,
      activeNode,
      activeMagnitude,
      activeShare,
      radiusScale,
      centerDiscRadius,
      maxDepth,
      parentFocusPath,
      wedgeRenderPlan
    );
    renderDetails(activeNode, activePath, activeMagnitude, activeShare);
    renderTopSegments(layout, totalMagnitude, activePath, kronaColors);
  }

  function applyChartSettings() {
    document.body.style.fontFamily = resolveFontFamily(chartSettings.fontFamily);

    if (elements.chartSurface) {
      elements.chartSurface.style.background = chartSettings.background;
      elements.chartSurface.style.borderWidth = String(chartSettings.borderWidth) + "px";
      elements.chartSurface.style.borderColor = chartSettings.borderColor;
    }

    if (elements.chartSvg) {
      if (typeof chartSettings.width === "number" && chartSettings.width > 0) {
        elements.chartSvg.style.width = String(chartSettings.width) + "px";
      } else {
        elements.chartSvg.style.width = "";
      }
      if (typeof chartSettings.height === "number" && chartSettings.height > 0) {
        elements.chartSvg.style.height = String(chartSettings.height) + "px";
      } else {
        elements.chartSvg.style.height = "";
      }
      elements.chartSvg.style.overflow = "visible";
    }
  }

  function applyDetailsPanelVisibility() {
    if (!elements.chartLayout || !elements.chartDetails) {
      return;
    }

    if (state.detailsPanelCollapsed) {
      elements.chartLayout.classList.add("is-details-hidden");
      elements.chartDetails.setAttribute("hidden", "hidden");
      elements.toggleDetailsButton.textContent = "Show Details";
    } else {
      elements.chartLayout.classList.remove("is-details-hidden");
      elements.chartDetails.removeAttribute("hidden");
      elements.toggleDetailsButton.textContent = "Hide Details";
    }
  }

  function renderToolbar(parentFocusPath) {
    elements.backButton.disabled = state.historyIndex <= 0;
    elements.forwardButton.disabled = state.historyIndex >= state.history.length - 1;
    elements.upButton.disabled = !parentFocusPath;
  }

  function renderBreadcrumbs(focusPath) {
    clearElement(elements.breadcrumbs);
    var focusLabel = document.createElement("span");
    focusLabel.className = "muted";
    focusLabel.textContent = "Focus";
    elements.breadcrumbs.appendChild(focusLabel);

    for (var index = 0; index < focusPath.length; index += 1) {
      var crumbPath = focusPath.slice(0, index + 1);
      var button = document.createElement("button");
      button.className = "crumb" + (index === focusPath.length - 1 ? " is-current" : "");
      button.textContent = focusPath[index];
      button.addEventListener("click", createFocusHandler(crumbPath));
      elements.breadcrumbs.appendChild(button);
    }
  }

  function renderSvg(
    layout,
    kronaColors,
    activePath,
    resolvedFocusPath,
    activeNode,
    activeMagnitude,
    activeShare,
    radiusScale,
    centerDiscRadius,
    maxDepth,
    parentFocusPath,
    wedgeRenderPlan
  ) {
    clearElement(elements.chartRoot);
    ensureHiddenPattern();

    var renderNodes = wedgeRenderPlan.visibleNodes;
    for (var index = 0; index < renderNodes.length; index += 1) {
      var renderNode = renderNodes[index];
      var node = renderNode.node;
      var interactionPath = renderNode.interactionPath;
      if (node.depth <= 0) {
        continue;
      }

      var innerRadius = radiusScale(Math.max(0, node.depth - 1));
      var outerRadius = radiusScale(renderNode.renderOuterDepth);
      var pathData = arcPath(innerRadius, outerRadius, node.startAngle, node.endAngle);
      if (!pathData) {
        continue;
      }

      var isInteractive = interactionPath.length > 0 && !isUnclassifiedNodeName(node.name);
      var isActive = isInteractive && activePath ? pathEquals(interactionPath, activePath) : false;
      var isFocused = isInteractive && resolvedFocusPath ? pathEquals(interactionPath, resolvedFocusPath) : false;
      var fill = isUnclassifiedNodeName(node.name)
        ? KRONA_UNCLASSIFIED_COLOR
        : resolveNodeFillColor(
            kronaColors,
            [renderNode.colorPath || node.path, interactionPath, node.path],
            KRONA_UNCLASSIFIED_COLOR
          );

      var pathElement = createSvgElement("path");
      pathElement.setAttribute("class", "chart-wedge" + (isActive ? " is-active" : "") + (isFocused ? " is-focus" : ""));
      pathElement.setAttribute("d", pathData);
      pathElement.setAttribute("fill", fill);
      pathElement.setAttribute("stroke", isActive ? "#062d1e" : chartSettings.wedgeStrokeColor);
      pathElement.setAttribute(
        "stroke-width",
        isActive ? "2.2" : String(Math.max(0.4, chartSettings.wedgeStrokeWidth))
      );
      pathElement.setAttribute(
        "opacity",
        isInteractive && state.hoverPath ? (isActive ? "1" : "0.42") : (isFocused ? "1" : "0.92")
      );

      if (isInteractive) {
        pathElement.setAttribute("role", "button");
        pathElement.setAttribute("tabindex", "0");
        pathElement.addEventListener("mouseenter", createHoverHandler(interactionPath));
        pathElement.addEventListener("mouseleave", clearHoverHandler);
        pathElement.addEventListener("click", createFocusHandler(interactionPath));
        pathElement.addEventListener("pointerdown", createFocusHandler(interactionPath));
      }

      var title = createSvgElement("title");
      title.textContent = renderNode.isGroupedHidden
        ? String(renderNode.hiddenCount) + " more"
        : node.path.join(" / ") + ": " + formatNumber(node.magnitude);
      pathElement.appendChild(title);
      elements.chartRoot.appendChild(pathElement);

      if (renderNode.isGroupedHidden) {
        var patternPath = createSvgElement("path");
        patternPath.setAttribute("d", pathData);
        patternPath.setAttribute("fill", "url(#chart-hidden-pattern)");
        patternPath.setAttribute("stroke", "none");
        patternPath.setAttribute("opacity", "0.65");
        patternPath.setAttribute("pointer-events", "none");
        elements.chartRoot.appendChild(patternPath);
      }
    }

    for (var labelIndex = 0; labelIndex < renderNodes.length; labelIndex += 1) {
      var labelRenderNode = renderNodes[labelIndex];
      var labelNode = labelRenderNode.node;
      var labelInteractionPath = labelRenderNode.interactionPath;
      if (labelNode.depth <= 0) {
        continue;
      }
      var labelInnerRadius = radiusScale(Math.max(0, labelNode.depth - 1));
      var labelOuterRadius = radiusScale(labelRenderNode.labelOuterDepth);
      var label = createWedgeLabel(
        labelNode,
        labelInnerRadius,
        labelOuterRadius,
        maxDepth,
        labelRenderNode.labelOuterDepth,
        Math.max(MIN_LABEL_FONT_SIZE, chartSettings.fontSizePx)
      );
      if (!label) {
        continue;
      }

      var showTooltip = !!state.hoverPath && pathEquals(labelInteractionPath, state.hoverPath) && label.isTruncated;
      if (showTooltip) {
        var tooltip = createHoverLabelTooltip(
          label,
          Math.max(MIN_LABEL_FONT_SIZE, chartSettings.fontSizePx)
        );
        var tooltipGroup = createSvgElement("g");
        tooltipGroup.setAttribute("class", "chart-label-tooltip");
        tooltipGroup.setAttribute("pointer-events", "none");

        var tooltipBox = createSvgElement("rect");
        tooltipBox.setAttribute("class", "chart-label-tooltip-box");
        tooltipBox.setAttribute("x", String(tooltip.x));
        tooltipBox.setAttribute("y", String(tooltip.y));
        tooltipBox.setAttribute("width", String(tooltip.width));
        tooltipBox.setAttribute("height", String(tooltip.height));
        tooltipBox.setAttribute("rx", "7");
        tooltipBox.setAttribute("ry", "7");
        tooltipBox.setAttribute("fill", "#ffffff");
        tooltipBox.setAttribute("stroke", chartSettings.wedgeStrokeColor);
        tooltipBox.setAttribute("stroke-width", String(Math.max(0.4, chartSettings.wedgeStrokeWidth) + 0.5));
        tooltipGroup.appendChild(tooltipBox);

        var tooltipText = createSvgElement("text");
        tooltipText.setAttribute("class", "chart-label-tooltip-text");
        tooltipText.setAttribute("x", String(tooltip.textX));
        tooltipText.setAttribute("y", String(tooltip.textY));
        tooltipText.setAttribute("text-anchor", "middle");
        tooltipText.setAttribute("dominant-baseline", "middle");
        tooltipText.setAttribute("font-family", chartSettings.fontFamily);
        tooltipText.setAttribute(
          "font-size",
          String(Math.max(MIN_LABEL_FONT_SIZE, chartSettings.fontSizePx))
        );
        tooltipText.textContent = label.fullText;
        tooltipGroup.appendChild(tooltipText);

        elements.chartRoot.appendChild(tooltipGroup);
      }

      var text = createSvgElement("text");
      text.setAttribute("class", "chart-wedge-label");
      text.setAttribute("x", String(label.x));
      text.setAttribute("y", String(label.y));
      text.setAttribute("text-anchor", label.anchor);
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("transform", "rotate(" + label.rotate + " " + label.x + " " + label.y + ")");
      text.setAttribute("font-family", chartSettings.fontFamily);
      text.setAttribute(
        "font-size",
        String(Math.max(MIN_LABEL_FONT_SIZE, chartSettings.fontSizePx))
      );
      text.textContent = label.text;
      elements.chartRoot.appendChild(text);
    }

    var centerDisc = createSvgElement("circle");
    centerDisc.setAttribute("r", String(centerDiscRadius));
    centerDisc.setAttribute("class", "chart-center-disc");
    centerDisc.addEventListener("click", function () {
      if (parentFocusPath) {
        setFocusPath(parentFocusPath, true);
      } else {
        state.focusPath = rootPath.slice();
        state.selectedPath = rootPath.slice();
        state.hoverPath = null;
        render();
      }
    });
    elements.chartRoot.appendChild(centerDisc);

    var centerTitle = createSvgElement("text");
    centerTitle.setAttribute("x", "0");
    centerTitle.setAttribute("y", "-18");
    centerTitle.setAttribute("text-anchor", "middle");
    centerTitle.setAttribute("class", "chart-center-title");
    centerTitle.textContent = activeNode ? activeNode.name : (resolvedFocusPath[resolvedFocusPath.length - 1] || "Root");
    elements.chartRoot.appendChild(centerTitle);

    var centerMetric = createSvgElement("text");
    centerMetric.setAttribute("x", "0");
    centerMetric.setAttribute("y", "2");
    centerMetric.setAttribute("text-anchor", "middle");
    centerMetric.setAttribute("class", "chart-center-metric");
    centerMetric.textContent = formatNumber(activeMagnitude);
    elements.chartRoot.appendChild(centerMetric);

    var centerSub = createSvgElement("text");
    centerSub.setAttribute("x", "0");
    centerSub.setAttribute("y", "22");
    centerSub.setAttribute("text-anchor", "middle");
    centerSub.setAttribute("class", "chart-center-sub");
    centerSub.textContent = activeShare.toFixed(1) + "% of view";
    elements.chartRoot.appendChild(centerSub);
  }

  function ensureHiddenPattern() {
    if (!elements.chartSvg) {
      return;
    }

    var existing = elements.chartSvg.querySelector("#chart-hidden-pattern");
    if (existing) {
      return;
    }

    var defs = elements.chartSvg.querySelector("defs");
    if (!defs) {
      defs = createSvgElement("defs");
      elements.chartSvg.insertBefore(defs, elements.chartSvg.firstChild);
    }

    var pattern = createSvgElement("pattern");
    pattern.setAttribute("id", "chart-hidden-pattern");
    pattern.setAttribute("patternUnits", "userSpaceOnUse");
    pattern.setAttribute("x", "0");
    pattern.setAttribute("y", "0");
    pattern.setAttribute("width", "7");
    pattern.setAttribute("height", "7");

    var lineA = createSvgElement("line");
    lineA.setAttribute("x1", "0");
    lineA.setAttribute("y1", "0");
    lineA.setAttribute("x2", "3.5");
    lineA.setAttribute("y2", "3.5");
    lineA.setAttribute("stroke", "rgba(16,36,27,0.35)");
    lineA.setAttribute("stroke-width", "0.8");
    pattern.appendChild(lineA);

    var lineB = createSvgElement("line");
    lineB.setAttribute("x1", "3.5");
    lineB.setAttribute("y1", "7");
    lineB.setAttribute("x2", "7");
    lineB.setAttribute("y2", "3.5");
    lineB.setAttribute("stroke", "rgba(16,36,27,0.35)");
    lineB.setAttribute("stroke-width", "0.8");
    pattern.appendChild(lineB);

    defs.appendChild(pattern);
  }

  function createWedgeRenderPlan(layout, maxDepth, labelFontSize, radiusScale) {
    if (!layout || !layout.nodes || layout.nodes.length === 0) {
      return { visibleNodes: [] };
    }

    var visibleNodes = layout.nodes.filter(function (node) {
      return node.depth > 0;
    });
    if (visibleNodes.length === 0 || maxDepth <= 0) {
      return {
        visibleNodes: visibleNodes.map(function (node) {
          return {
            node: node,
            isGroupedHidden: false,
            hiddenCount: 0,
            key: pathKey(node.path),
            colorPath: node.path,
            interactionPath: node.path,
            renderOuterDepth: node.depth,
            labelOuterDepth: node.depth,
          };
        }),
      };
    }

    var minVisibleWidth = Math.max(MIN_LABEL_FONT_SIZE, labelFontSize) * 2.3;
    var childrenByParent = new Map();
    var visiblePathKeys = new Set(
      visibleNodes.map(function (node) {
        return pathKey(node.path);
      })
    );
    for (var index = 0; index < visibleNodes.length; index += 1) {
      var current = visibleNodes[index];
      var parent = pathKey(current.path.slice(0, -1));
      var children = childrenByParent.get(parent);
      if (children) {
        children.push(current);
      } else {
        childrenByParent.set(parent, [current]);
      }
    }

    childrenByParent.forEach(function (children) {
      children.sort(function (left, right) {
        if (left.startAngle !== right.startAngle) {
          return left.startAngle - right.startAngle;
        }
        return left.endAngle - right.endAngle;
      });
    });

    var groupedNodes = [];
    childrenByParent.forEach(function (children, parentKey) {
      var cursor = 0;
      var hiddenGroupIndex = 0;
      while (cursor < children.length) {
        var child = children[cursor];
        if (!shouldGroupHiddenChild(child, radiusScale, minVisibleWidth)) {
          groupedNodes.push({
            node: child,
            isGroupedHidden: false,
            hiddenCount: 0,
            key: pathKey(child.path),
            colorPath: child.path,
            interactionPath: child.path,
            renderOuterDepth: child.depth,
            labelOuterDepth: child.depth,
          });
          cursor += 1;
          continue;
        }

        var runEnd = cursor;
        while (
          runEnd + 1 < children.length &&
          shouldGroupHiddenChild(children[runEnd + 1], radiusScale, minVisibleWidth)
        ) {
          runEnd += 1;
        }

        var run = children.slice(cursor, runEnd + 1);
        var first = run[0];
        var last = run[run.length - 1];
        var parentPath = first.path.slice(0, -1);
        var interactionPath = parentPath.length > 0 ? parentPath : first.path;
        var primaryColorNode = run.find(function (node) {
          return !isUnclassifiedNodeName(node.name);
        }) || first;
        var groupedColorPath = resolveGroupedColorPath(
          parentPath,
          primaryColorNode.path,
          visiblePathKeys
        );
        var hiddenCount = run.length;
        var groupedMagnitude = run.reduce(function (sum, item) {
          return sum + item.magnitude;
        }, 0);

        groupedNodes.push({
          node: {
            path: first.path.slice(0, -1).concat([String(hiddenCount) + " more"]),
            name: String(hiddenCount) + " more",
            depth: first.depth,
            magnitude: groupedMagnitude,
            startAngle: first.startAngle,
            endAngle: last.endAngle,
          },
          isGroupedHidden: true,
          hiddenCount: hiddenCount,
          key: parentKey + "/[" + hiddenCount + "-more-" + hiddenGroupIndex + "]",
          colorPath: groupedColorPath,
          interactionPath: interactionPath,
          renderOuterDepth: first.depth,
          labelOuterDepth: first.depth,
        });

        hiddenGroupIndex += 1;
        cursor = runEnd + 1;
      }
    });

    groupedNodes.sort(function (left, right) {
      if (left.node.depth !== right.node.depth) {
        return left.node.depth - right.node.depth;
      }
      if (left.node.startAngle !== right.node.startAngle) {
        return left.node.startAngle - right.node.startAngle;
      }
      if (left.node.endAngle !== right.node.endAngle) {
        return left.node.endAngle - right.node.endAngle;
      }
      return left.key.localeCompare(right.key);
    });

    var parentKeys = new Set(groupedNodes.map(function (entry) {
      return pathKey(entry.node.path.slice(0, -1));
    }));
    return {
      visibleNodes: groupedNodes.map(function (entry) {
        var hasVisibleChildren = parentKeys.has(pathKey(entry.node.path));
        var ringOuterDepth = Math.min(maxDepth, entry.node.depth);
        return {
          node: entry.node,
          isGroupedHidden: entry.isGroupedHidden,
          hiddenCount: entry.hiddenCount,
          key: entry.key,
          colorPath: entry.colorPath,
          interactionPath: entry.interactionPath,
          renderOuterDepth: entry.isGroupedHidden
            ? maxDepth
            : hasVisibleChildren
              ? ringOuterDepth
              : maxDepth,
          labelOuterDepth: hasVisibleChildren ? ringOuterDepth : maxDepth,
        };
      }),
    };
  }

  function shouldGroupHiddenChild(child, radiusScale, minVisibleWidth) {
    var innerRadius = radiusScale(Math.max(0, child.depth - 1));
    var outerRadius = radiusScale(child.depth);
    var angleSpan = Math.max(0, child.endAngle - child.startAngle);
    var widthEstimate = angleSpan * (innerRadius + outerRadius);
    return widthEstimate < minVisibleWidth;
  }

  function resolveGroupedColorPath(parentPath, fallbackPath, visiblePathKeys) {
    for (var length = parentPath.length; length >= 2; length -= 1) {
      var candidate = parentPath.slice(0, length);
      if (visiblePathKeys.has(pathKey(candidate))) {
        return candidate;
      }
    }
    return fallbackPath;
  }

  function renderDetails(activeNode, activePath, activeMagnitude, activeShare) {
    elements.detailsHeading.textContent = state.hoverPath ? "Hover Details" : "Details";
    clearElement(elements.detailsContent);

    if (!activeNode) {
      appendText(elements.detailsContent, "div", "muted", "Hover or click a wedge to inspect node details.");
      return;
    }

    var titleBlock = document.createElement("div");
    var strong = document.createElement("strong");
    strong.textContent = activeNode.name;
    titleBlock.appendChild(strong);
    elements.detailsContent.appendChild(titleBlock);

    appendText(elements.detailsContent, "div", "muted", "path: " + (activePath ? activePath.join(" / ") : ""));

    var stats = document.createElement("div");
    stats.className = "chart-stats";
    stats.appendChild(createStat("Magnitude", formatNumber(activeMagnitude)));
    stats.appendChild(createStat("Share", activeShare.toFixed(1) + "%"));
    stats.appendChild(createStat("Children", String(activeNode.children ? activeNode.children.length : 0)));
    elements.detailsContent.appendChild(stats);

    if (activeNode.description) {
      appendText(elements.detailsContent, "div", "", activeNode.description);
    }

    if (activeNode.url) {
      var urlBlock = document.createElement("div");
      var link = document.createElement("a");
      link.href = activeNode.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = activeNode.url;
      urlBlock.appendChild(link);
      elements.detailsContent.appendChild(urlBlock);
    }

    var attributes = activeNode.attributes || {};
    var attributeKeys = Object.keys(attributes);
    if (attributeKeys.length > 0) {
      var attributeContainer = document.createElement("div");
      attributeContainer.className = "stack";
      for (var index = 0; index < attributeKeys.length; index += 1) {
        var key = attributeKeys[index];
        var row = document.createElement("div");
        row.className = "muted";
        var keyStrong = document.createElement("strong");
        keyStrong.textContent = key + ":";
        row.appendChild(keyStrong);
        row.appendChild(document.createTextNode(" " + String(attributes[key])));
        attributeContainer.appendChild(row);
      }
      elements.detailsContent.appendChild(attributeContainer);
    }
  }

  function renderTopSegments(layout, totalMagnitude, activePath, kronaColors) {
    clearElement(elements.topSegments);

    var topLevel = layout.nodes
      .filter(function (node) {
        return node.depth === 1 && !isUnclassifiedNodeName(node.name);
      })
      .sort(function (left, right) {
        if (right.magnitude !== left.magnitude) {
          return right.magnitude - left.magnitude;
        }
        return left.name.localeCompare(right.name);
      });

    if (topLevel.length === 0) {
      appendText(elements.topSegments, "div", "muted", "No segments in the current view.");
      return;
    }

    var visible = topLevel.slice(0, MAX_KEY_SEGMENTS);
    for (var index = 0; index < visible.length; index += 1) {
      var node = visible[index];
      var share = totalMagnitude > 0 ? (node.magnitude / totalMagnitude) * 100 : 0;
      var isActive = activePath ? pathEquals(node.path, activePath) : false;

      var keyButton = document.createElement("button");
      keyButton.className = "key-row" + (isActive ? " is-active" : "");
      keyButton.addEventListener("mouseenter", createHoverHandler(node.path));
      keyButton.addEventListener("mouseleave", clearHoverHandler);
      keyButton.addEventListener("click", createFocusHandler(node.path));
      keyButton.addEventListener("pointerdown", createFocusHandler(node.path));

      var dot = document.createElement("span");
      dot.className = "legend-dot";
      dot.style.background = resolveNodeFillColor(kronaColors, [node.path], KRONA_UNCLASSIFIED_COLOR);
      keyButton.appendChild(dot);

      var label = document.createElement("span");
      label.className = "key-label";
      label.textContent = node.name;
      keyButton.appendChild(label);

      var value = document.createElement("span");
      value.className = "key-value";
      value.textContent = share.toFixed(1) + "%";
      keyButton.appendChild(value);

      elements.topSegments.appendChild(keyButton);
    }

    var hidden = topLevel.length - visible.length;
    if (hidden > 0) {
      appendText(elements.topSegments, "div", "muted", "+ " + hidden + " more in this level");
    }
  }

  function createStat(label, value) {
    var stat = document.createElement("div");
    stat.className = "chart-stat";
    appendText(stat, "span", "muted", label);
    appendText(stat, "strong", "", value);
    return stat;
  }

  function createHoverHandler(path) {
    return function () {
      state.hoverPath = path.slice();
      render();
    };
  }

  function clearHoverHandler() {
    if (!state.hoverPath) {
      return;
    }
    state.hoverPath = null;
    render();
  }

  function createFocusHandler(path) {
    return function () {
      setFocusPath(path, true);
    };
  }

  function setFocusPath(path, trackHistory) {
    var normalized = normalizePath(path);
    if (normalized.length === 0) {
      return;
    }
    if (!findNodeByPath(dataset.tree, normalized)) {
      return;
    }
    var focusUnchanged = state.focusPath && pathEquals(state.focusPath, normalized);

    state.focusPath = normalized;
    state.selectedPath = normalized;
    state.hoverPath = null;

    if (trackHistory && !focusUnchanged) {
      var historyPrefix = state.history.slice(0, state.historyIndex + 1);
      historyPrefix.push(normalized.slice());
      state.history = historyPrefix;
      state.historyIndex = state.history.length - 1;
    }

    render();
  }

  function normalizePath(path) {
    if (!Array.isArray(path)) {
      return rootPath.slice();
    }
    var normalized = path
      .map(function (segment) {
        return String(segment).trim();
      })
      .filter(function (segment) {
        return segment.length > 0;
      });

    if (normalized.length === 0 || normalized[0] !== rootPath[0]) {
      return rootPath.slice();
    }
    return normalized;
  }

  function computeLayout(root, focusedPath, depthLimitInput) {
    var normalizedFocusPath = normalizeFocusedPath(root, focusedPath);
    var focusedRoot = resolveFocusedNode(root, normalizedFocusPath) || root;
    var pathPrefix = normalizedFocusPath ? normalizedFocusPath.slice(0, -1) : [];
    var totalMagnitude = computeEffectiveMagnitude(focusedRoot);
    var collapseRedundant = chartSettings.collapseRedundant !== false;
    var rootHasMultipleChildren = Array.isArray(dataset.tree.children) && dataset.tree.children.length > 1;
    var depthLimit = depthLimitInput <= 0 ? null : depthLimitInput;
    var nodes = flattenForLayout({
      node: focusedRoot,
      pathPrefix: pathPrefix,
      depth: 0,
      startAngle: 0,
      angleSpan: totalMagnitude > 0 ? Math.PI * 2 : 0,
      depthLimit: depthLimit,
      collapseRedundant: collapseRedundant,
      rootHasMultipleChildren: rootHasMultipleChildren,
    });

    return {
      nodes: nodes,
      totalMagnitude: totalMagnitude,
    };
  }

  function flattenForLayout(args) {
    var currentPath = args.pathPrefix.concat([args.node.name]);
    var nodeMagnitude = computeEffectiveMagnitude(args.node);
    var angleSpan = Math.max(0, args.angleSpan);

    var currentNode = {
      path: currentPath,
      name: args.node.name,
      depth: args.depth,
      magnitude: nodeMagnitude,
      startAngle: args.startAngle,
      endAngle: args.startAngle + angleSpan,
    };

    var nodes = [currentNode];
    if (
      !Array.isArray(args.node.children) ||
      args.node.children.length === 0 ||
      (typeof args.depthLimit === "number" && args.depth >= args.depthLimit)
    ) {
      return nodes;
    }

    var resolvedChildren = args.node.children
      .map(function (child) {
        var collapsed = resolveCollapsedChild(
          child,
          args.collapseRedundant,
          args.rootHasMultipleChildren
        );
        return {
          child: collapsed.node,
          pathSegments: collapsed.pathSegments,
          magnitude: computeEffectiveMagnitude(collapsed.node),
        };
      })
      .filter(function (entry) {
        return entry.magnitude > 0;
      });

    var childEntries = resolvedChildren.map(function (entry) {
      return {
        child: entry.child,
        pathSegments: entry.pathSegments,
        magnitude: entry.magnitude,
        isUnclassified: false,
      };
    });

    var childrenTotalMagnitude = childEntries.reduce(function (sum, entry) {
      return sum + entry.magnitude;
    }, 0);
    var unclassifiedMagnitude = Math.max(0, nodeMagnitude - childrenTotalMagnitude);
    if (unclassifiedMagnitude > 0.000000001) {
      childEntries.push({
        child: null,
        pathSegments: [getUnclassifiedName(args.node.name)],
        magnitude: unclassifiedMagnitude,
        isUnclassified: true,
      });
    }

    var childStartAngle = args.startAngle;
    for (var index = 0; index < childEntries.length; index += 1) {
      var entry = childEntries[index];
      var childAngleSpan = nodeMagnitude === 0 ? 0 : (entry.magnitude / nodeMagnitude) * angleSpan;
      if (entry.isUnclassified || !entry.child) {
        nodes.push({
          path: currentPath.concat(entry.pathSegments),
          name: entry.pathSegments[entry.pathSegments.length - 1] || "Unclassified",
          depth: args.depth + 1,
          magnitude: entry.magnitude,
          startAngle: childStartAngle,
          endAngle: childStartAngle + childAngleSpan,
        });
      } else {
        var childNodes = flattenForLayout({
          node: entry.child,
          pathPrefix: currentPath.concat(entry.pathSegments.slice(0, -1)),
          depth: args.depth + 1,
          startAngle: childStartAngle,
          angleSpan: childAngleSpan,
          depthLimit: args.depthLimit,
          collapseRedundant: args.collapseRedundant,
          rootHasMultipleChildren: args.rootHasMultipleChildren,
        });
        nodes = nodes.concat(childNodes);
      }
      childStartAngle += childAngleSpan;
    }

    return nodes;
  }

  function computeEffectiveMagnitude(node) {
    var nodeMagnitude = normalizeMagnitude(node.magnitude);
    if (!Array.isArray(node.children) || node.children.length === 0) {
      return nodeMagnitude;
    }
    var childrenMagnitude = node.children.reduce(function (sum, child) {
      return sum + computeEffectiveMagnitude(child);
    }, 0);
    return Math.max(nodeMagnitude, childrenMagnitude);
  }

  function normalizeMagnitude(value) {
    var numberValue = Number(value);
    if (!Number.isFinite(numberValue) || numberValue <= 0) {
      return 0;
    }
    return numberValue;
  }

  function getUnclassifiedName(parentName) {
    return "[other " + String(parentName) + "]";
  }

  function resolveCollapsedChild(node, collapseRedundant, rootHasMultipleChildren) {
    var pathSegments = [node.name];
    var candidate = node;

    if (!collapseRedundant) {
      return {
        node: candidate,
        pathSegments: pathSegments,
      };
    }

    while (isCollapsibleNode(candidate, rootHasMultipleChildren)) {
      var child = Array.isArray(candidate.children) ? candidate.children[0] : null;
      if (!child) {
        break;
      }
      candidate = child;
      pathSegments.push(child.name);
    }

    return {
      node: candidate,
      pathSegments: pathSegments,
    };
  }

  function isCollapsibleNode(node, rootHasMultipleChildren) {
    if (!Array.isArray(node.children) || node.children.length !== 1) {
      return false;
    }
    var child = node.children[0];
    var nodeMagnitude = computeEffectiveMagnitude(node);
    var childMagnitude = computeEffectiveMagnitude(child);
    if (Math.abs(nodeMagnitude - childMagnitude) > 0.000000001) {
      return false;
    }
    return rootHasMultipleChildren || (Array.isArray(child.children) && child.children.length > 0);
  }

  function resolveFocusedNode(root, focusedPath) {
    if (!focusedPath || focusedPath.length === 0) {
      return root;
    }
    var head = focusedPath[0];
    if (head !== root.name) {
      return null;
    }
    var cursor = root;
    for (var index = 1; index < focusedPath.length; index += 1) {
      var segment = focusedPath[index];
      var next = Array.isArray(cursor.children)
        ? cursor.children.find(function (child) {
            return child.name === segment;
          })
        : null;
      if (!next) {
        return null;
      }
      cursor = next;
    }
    return cursor;
  }

  function normalizeFocusedPath(root, focusedPath) {
    if (!Array.isArray(focusedPath) || focusedPath.length === 0) {
      return null;
    }
    var normalized = focusedPath
      .map(function (segment) {
        return String(segment).trim();
      })
      .filter(function (segment) {
        return segment.length > 0;
      });

    if (normalized.length === 0 || normalized[0] !== root.name) {
      return null;
    }
    return normalized;
  }

  function findLayoutNodeByPath(nodes, path) {
    if (!path) {
      return null;
    }
    for (var index = 0; index < nodes.length; index += 1) {
      if (pathEquals(nodes[index].path, path)) {
        return nodes[index];
      }
    }
    return null;
  }

  function findNodeByPath(root, path) {
    if (!path || path.length === 0) {
      return root;
    }

    if (path[0] !== root.name) {
      return null;
    }

    var cursor = root;
    for (var index = 1; index < path.length; index += 1) {
      var segment = path[index];
      var next = Array.isArray(cursor.children)
        ? cursor.children.find(function (child) {
            return child.name === segment;
          })
        : null;
      if (!next) {
        return null;
      }
      cursor = next;
    }

    return cursor;
  }

  function arcPath(innerRadius, outerRadius, startAngle, endAngle) {
    if (endAngle <= startAngle) {
      return "";
    }

    var largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    var outerStart = polarPoint(outerRadius, startAngle);
    var outerEnd = polarPoint(outerRadius, endAngle);

    if (innerRadius <= 0) {
      return (
        "M " +
        outerStart.x +
        " " +
        outerStart.y +
        " A " +
        outerRadius +
        " " +
        outerRadius +
        " 0 " +
        largeArc +
        " 1 " +
        outerEnd.x +
        " " +
        outerEnd.y +
        " L 0 0 Z"
      );
    }

    var innerEnd = polarPoint(innerRadius, endAngle);
    var innerStart = polarPoint(innerRadius, startAngle);

    return (
      "M " +
      outerStart.x +
      " " +
      outerStart.y +
      " A " +
      outerRadius +
      " " +
      outerRadius +
      " 0 " +
      largeArc +
      " 1 " +
      outerEnd.x +
      " " +
      outerEnd.y +
      " L " +
      innerEnd.x +
      " " +
      innerEnd.y +
      " A " +
      innerRadius +
      " " +
      innerRadius +
      " 0 " +
      largeArc +
      " 0 " +
      innerStart.x +
      " " +
      innerStart.y +
      " Z"
    );
  }

  function polarPoint(radius, angle) {
    return {
      x: Math.cos(angle + Math.PI / 2) * radius,
      y: Math.sin(angle + Math.PI / 2) * radius,
    };
  }

  function createRadiusScale(maxDepth, outerRadius) {
    return function (depth) {
      if (depth <= 0 || maxDepth <= 0) {
        return 0;
      }
      var normalized = depth / maxDepth;
      return Math.pow(normalized, 0.86) * outerRadius;
    };
  }

  function computeLayoutDataMaxDepth(layout) {
    if (!layout || !layout.nodes || layout.nodes.length === 0) {
      return 0;
    }

    var maxDepth = 0;
    for (var index = 0; index < layout.nodes.length; index += 1) {
      var node = layout.nodes[index];
      if (node.depth <= 0 || isUnclassifiedNodeName(node.name)) {
        continue;
      }
      if (node.depth > maxDepth) {
        maxDepth = node.depth;
      }
    }

    if (maxDepth > 0) {
      return maxDepth;
    }
    return maxNodeDepth(layout.nodes);
  }

  function resolveRenderDepth(treeMaxDepth, depthLimit) {
    if (treeMaxDepth <= 0) {
      return 0;
    }
    if (depthLimit <= 0) {
      return treeMaxDepth;
    }
    return Math.min(depthLimit, treeMaxDepth);
  }

  function createWedgeLabel(node, innerRadius, outerRadius, maxDepth, outerDepth, fontSizePx) {
    var isOuterRing = maxDepth <= 1 || outerDepth >= maxDepth;
    var angleSpan = node.endAngle - node.startAngle;
    var ringThickness = outerRadius - innerRadius;
    var radius = innerRadius + ringThickness * (isOuterRing ? 0.6 : 0.56);
    var tangentialSpan = radius * angleSpan;

    var minAngleSpan = isOuterRing ? 0.007 : 0.04;
    var minRingThickness = isOuterRing ? 6 : 10;
    var minTangentialSpan = isOuterRing ? 2 : 10;

    if (
      angleSpan < minAngleSpan ||
      ringThickness < minRingThickness ||
      tangentialSpan < minTangentialSpan
    ) {
      return null;
    }

    var midAngle = (node.startAngle + node.endAngle) / 2;
    var point = polarPoint(radius, midAngle);

    var approximateCharWidth = Math.max(4, fontSizePx * 0.58);
    var availableTextLength = isOuterRing
      ? Math.max(0, ringThickness - fontSizePx * 0.45)
      : Math.max(0, tangentialSpan - fontSizePx * 0.35);
    var maxChars = Math.max(isOuterRing ? 4 : 6, Math.floor(availableTextLength / approximateCharWidth));
    var isTruncated = node.name.length > maxChars;
    var text = ellipsize(node.name, maxChars);
    var baseRotation = isOuterRing ? (midAngle * 180) / Math.PI - 90 : (midAngle * 180) / Math.PI;
    var normalizedRotation = normalizeDegrees(baseRotation);
    var flip = normalizedRotation > 90 || normalizedRotation < -90;
    var rotate = flip ? normalizedRotation + 180 : normalizedRotation;

    return {
      text: text,
      fullText: node.name,
      isTruncated: isTruncated,
      x: point.x,
      y: point.y,
      rotate: rotate,
      anchor: isOuterRing ? (flip ? "end" : "start") : "middle",
    };
  }

  function createHoverLabelTooltip(label, fontSizePx) {
    var horizontalPadding = 9;
    var verticalPadding = 5;
    var approxTextWidth = Math.max(20, label.fullText.length * fontSizePx * 0.58);
    var width = approxTextWidth + horizontalPadding * 2;
    var height = fontSizePx + verticalPadding * 2 + 2;
    var centerX = label.x;
    var centerY = label.y - fontSizePx * 1.2;

    return {
      x: centerX - width / 2,
      y: centerY - height / 2,
      width: width,
      height: height,
      textX: centerX,
      textY: centerY,
    };
  }

  function ellipsize(value, maxLength) {
    if (value.length <= maxLength) {
      return value;
    }
    return value.slice(0, Math.max(0, maxLength - 3)) + "...";
  }

  function buildKronaColorMap(layout) {
    var colors = new Map();
    if (!layout || !layout.nodes || layout.nodes.length === 0) {
      return colors;
    }

    var root = layout.nodes.find(function (node) {
      return node.depth === 0;
    }) || layout.nodes[0];
    var existingPathKeys = new Set(
      layout.nodes.map(function (node) {
        return pathKey(node.path);
      })
    );
    var childrenByParent = new Map();
    for (var index = 0; index < layout.nodes.length; index += 1) {
      var node = layout.nodes[index];
      if (isUnclassifiedNodeName(node.name)) {
        colors.set(pathKey(node.path), KRONA_UNCLASSIFIED_COLOR);
        continue;
      }
      if (node.depth === 0) {
        continue;
      }
      var parent = pathKey(
        resolveNearestExistingAncestorPath(node.path.slice(0, -1), existingPathKeys)
      );
      var children = childrenByParent.get(parent);
      if (children) {
        children.push(node);
      } else {
        childrenByParent.set(parent, [node]);
      }
    }

    childrenByParent.forEach(function (children) {
      children.sort(function (left, right) {
        if (left.startAngle !== right.startAngle) {
          return left.startAngle - right.startAngle;
        }
        return left.endAngle - right.endAngle;
      });
    });

    var maxDepth = computeLayoutDataMaxDepth(layout);
    var depthNormalizer = maxDepth > 8 ? 8 : Math.max(maxDepth, 1);
    var lightnessFactor = (KRONA_LIGHTNESS_MAX - KRONA_LIGHTNESS_BASE) / depthNormalizer;

    function assignColor(node, hueMin, hueMax) {
      var boundedHueMax = hueMax;
      if (boundedHueMax - hueMin > 1 / 12) {
        boundedHueMax = hueMin + 1 / 12;
      }

      if (node.depth > 0) {
        if (node.magnitude <= 0 || isUnclassifiedNodeName(node.name)) {
          colors.set(pathKey(node.path), KRONA_UNCLASSIFIED_COLOR);
        } else {
          var lightness = Math.min(
            KRONA_LIGHTNESS_MAX,
            KRONA_LIGHTNESS_BASE + (node.depth - 1) * lightnessFactor
          );
          var rgb = hslToRgb(hueMin, KRONA_SATURATION, lightness);
          colors.set(pathKey(node.path), rgbText(rgb.r, rgb.g, rgb.b));
        }
      }

      var children = childrenByParent.get(pathKey(node.path)) || [];
      if (children.length === 0) {
        return;
      }

      for (var childIndex = 0; childIndex < children.length; childIndex += 1) {
        var child = children[childIndex];
        var childHueMin;
        var childHueMax;

        if (node.depth === 0) {
          if (children.length > 6) {
            childHueMin = (1 - Math.pow(1 - childIndex / children.length, 1.4)) * 0.95;
            childHueMax = (1 - Math.pow(1 - (childIndex + 0.55) / children.length, 1.4)) * 0.95;
          } else {
            childHueMin = childIndex / children.length;
            childHueMax = (childIndex + 0.55) / children.length;
          }
        } else {
          childHueMin = lerp(child.startAngle, node.startAngle, node.endAngle, hueMin, boundedHueMax);
          childHueMax = lerp(
            child.startAngle + (child.endAngle - child.startAngle) * 0.99,
            node.startAngle,
            node.endAngle,
            hueMin,
            boundedHueMax
          );
        }

        assignColor(child, childHueMin, childHueMax);
      }
    }

    assignColor(root, 0, 1);
    return colors;
  }

  function resolveNodeFillColor(colors, candidatePaths, fallbackColor) {
    for (var index = 0; index < candidatePaths.length; index += 1) {
      var candidate = candidatePaths[index];
      if (!Array.isArray(candidate) || candidate.length === 0) {
        continue;
      }
      for (var length = candidate.length; length >= 1; length -= 1) {
        var color = colors.get(pathKey(candidate.slice(0, length)));
        if (typeof color === "string" && color.length > 0) {
          return color;
        }
      }
    }
    return fallbackColor;
  }

  function resolveNearestExistingAncestorPath(path, existingPathKeys) {
    for (var length = path.length; length >= 0; length -= 1) {
      var candidate = path.slice(0, length);
      if (existingPathKeys.has(pathKey(candidate))) {
        return candidate;
      }
    }
    return [];
  }

  function lerp(value, rangeStart, rangeEnd, outputStart, outputEnd) {
    if (rangeEnd === rangeStart) {
      return outputStart;
    }
    return outputStart + ((value - rangeStart) / (rangeEnd - rangeStart)) * (outputEnd - outputStart);
  }

  function rgbText(red, green, blue) {
    return "rgb(" + red + "," + green + "," + blue + ")";
  }

  function hslToRgb(hue, saturation, lightness) {
    if (saturation === 0) {
      var value = Math.floor(lightness * 255);
      return { r: value, g: value, b: value };
    }

    var m2 = lightness <= 0.5
      ? lightness * (saturation + 1)
      : lightness + saturation - lightness * saturation;
    var m1 = lightness * 2 - m2;

    return {
      r: Math.floor(hueToRgb(m1, m2, hue + 1 / 3)),
      g: Math.floor(hueToRgb(m1, m2, hue)),
      b: Math.floor(hueToRgb(m1, m2, hue - 1 / 3)),
    };
  }

  function hueToRgb(m1, m2, hue) {
    var normalizedHue = hue;
    while (normalizedHue < 0) {
      normalizedHue += 1;
    }
    while (normalizedHue > 1) {
      normalizedHue -= 1;
    }

    var value;
    if (6 * normalizedHue < 1) {
      value = m1 + (m2 - m1) * normalizedHue * 6;
    } else if (2 * normalizedHue < 1) {
      value = m2;
    } else if (3 * normalizedHue < 2) {
      value = m1 + (m2 - m1) * (2 / 3 - normalizedHue) * 6;
    } else {
      value = m1;
    }

    return value * 255;
  }

  function maxNodeDepth(nodes) {
    var max = 0;
    for (var index = 0; index < nodes.length; index += 1) {
      if (nodes[index].depth > max) {
        max = nodes[index].depth;
      }
    }
    return max;
  }

  function pathEquals(left, right) {
    if (left.length !== right.length) {
      return false;
    }
    for (var index = 0; index < left.length; index += 1) {
      if (left[index] !== right[index]) {
        return false;
      }
    }
    return true;
  }

  function pathKey(path) {
    return path.join("/");
  }

  function isUnclassifiedNodeName(name) {
    return String(name).trim().toLowerCase().indexOf("[other ") === 0;
  }

  function normalizeDegrees(angle) {
    var normalized = angle;
    while (normalized <= -180) {
      normalized += 360;
    }
    while (normalized > 180) {
      normalized -= 360;
    }
    return normalized;
  }

  function resolveChartSettings(raw) {
    var defaults = {
      background: "#f6f8f7",
      borderWidth: 0,
      borderColor: "#b7c2bc",
      wedgeStrokeWidth: 1,
      wedgeStrokeColor: "#ffffff",
      collapseRedundant: true,
      fontFamily: "sans-serif",
      fontSizePx: 12,
      width: "fit",
      height: "fit",
      colorScheme: ["#0f6b48", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    };

    if (!raw || typeof raw !== "object") {
      return defaults;
    }

    var width = raw.width;
    var height = raw.height;
    var normalizedWidth =
      typeof width === "number" && Number.isFinite(width) && width > 0 ? width : "fit";
    var normalizedHeight =
      typeof height === "number" && Number.isFinite(height) && height > 0 ? height : "fit";

    return {
      background: typeof raw.background === "string" ? raw.background : defaults.background,
      borderWidth:
        typeof raw.borderWidth === "number" && Number.isFinite(raw.borderWidth)
          ? Math.max(0, raw.borderWidth)
          : defaults.borderWidth,
      borderColor: typeof raw.borderColor === "string" ? raw.borderColor : defaults.borderColor,
      wedgeStrokeWidth:
        typeof raw.wedgeStrokeWidth === "number" && Number.isFinite(raw.wedgeStrokeWidth)
          ? Math.max(0.4, raw.wedgeStrokeWidth)
          : defaults.wedgeStrokeWidth,
      wedgeStrokeColor:
        typeof raw.wedgeStrokeColor === "string"
          ? raw.wedgeStrokeColor
          : defaults.wedgeStrokeColor,
      collapseRedundant:
        typeof raw.collapseRedundant === "boolean"
          ? raw.collapseRedundant
          : defaults.collapseRedundant,
      fontFamily: typeof raw.fontFamily === "string" ? raw.fontFamily : defaults.fontFamily,
      fontSizePx:
        typeof raw.fontSizePx === "number" && Number.isFinite(raw.fontSizePx)
          ? Math.max(MIN_LABEL_FONT_SIZE, raw.fontSizePx)
          : defaults.fontSizePx,
      width: normalizedWidth,
      height: normalizedHeight,
      colorScheme: Array.isArray(raw.colorScheme) ? raw.colorScheme : defaults.colorScheme,
    };
  }

  function resolveFontFamily(fontFamily) {
    if (typeof fontFamily !== "string" || fontFamily.trim().length === 0) {
      return "sans-serif";
    }
    if (fontFamily.includes(",")) {
      return fontFamily;
    }
    return (
      fontFamily +
      ", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    );
  }

  function normalizeDepthLimit(value) {
    var parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return 0;
    }
    if (parsed < 0) {
      return 0;
    }
    if (parsed > 12) {
      return 12;
    }
    return Math.floor(parsed);
  }

  function byId(id) {
    var element = document.getElementById(id);
    if (!element) {
      throw new Error("Missing element #" + id);
    }
    return element;
  }

  function byClass(className) {
    var element = document.querySelector("." + className);
    if (!element) {
      throw new Error("Missing element ." + className);
    }
    return element;
  }

  function clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function createSvgElement(tagName) {
    return document.createElementNS(SVG_NS, tagName);
  }

  function appendText(container, tagName, className, value) {
    var element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    element.textContent = value;
    container.appendChild(element);
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString();
  }

  function downloadCurrentSvg() {
    var fileName = toSvgFileName(datasetName);
    var svgMarkup = serializeSvgForDownload(elements.chartSvg);
    downloadTextFile(fileName, svgMarkup, "image/svg+xml;charset=utf-8");
  }

  function serializeSvgForDownload(svgElement) {
    var clone = svgElement.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    var viewBox = clone.getAttribute("viewBox");
    if (typeof viewBox === "string" && viewBox.length > 0) {
      var parts = viewBox
        .trim()
        .split(/\\s+/)
        .map(function (part) {
          return Number.parseFloat(part);
        });
      if (
        parts.length === 4 &&
        Number.isFinite(parts[0]) &&
        Number.isFinite(parts[1]) &&
        Number.isFinite(parts[2]) &&
        Number.isFinite(parts[3])
      ) {
        clone.setAttribute("width", String(parts[2]));
        clone.setAttribute("height", String(parts[3]));
      }
    }

    var style = createSvgElement("style");
    style.textContent =
      ".chart-wedge-label{fill:#0e2b1f;font-weight:600}" +
      ".chart-label-tooltip{pointer-events:none}" +
      ".chart-label-tooltip-box{fill:#ffffff}" +
      ".chart-label-tooltip-text{fill:#102a1f;font-weight:600}" +
      ".chart-center-disc{fill:#f4faf7;stroke:#c4d8cc;stroke-width:1.4}" +
      ".chart-center-title{font-size:13px;font-weight:700;fill:#102a1f}" +
      ".chart-center-metric{font-size:15px;font-weight:700;fill:#174936}" +
      ".chart-center-sub{font-size:11px;fill:#4f675d}";
    clone.insertBefore(style, clone.firstChild);

    return '<?xml version="1.0" encoding="UTF-8"?>\\n' + clone.outerHTML;
  }

  function toSvgFileName(name) {
    var normalized = String(name || "")
      .trim()
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    var base = normalized.length > 0 ? normalized : "dataset-chart";
    return base + ".svg";
  }

  function downloadTextFile(fileName, content, mimeType) {
    var blob = new Blob([content], { type: mimeType });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = "noopener";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function readPayload() {
    var script = document.getElementById("jowna-export-data");
    if (!script || !script.textContent) {
      return null;
    }
    try {
      return JSON.parse(script.textContent);
    } catch (_error) {
      return null;
    }
  }

  function showFatal(message) {
    document.body.innerHTML =
      '<div style="padding:24px;font-family:sans-serif"><h1>Jowna Export</h1><p>' +
      message +
      "</p></div>";
  }
})();
`;class ep{computeLayout(i){const o=C0(i.root,i.focusedPath),u=x0(i.root,o)??i.root,d=o?o.slice(0,-1):[],f=yl(u),g=i.settings.collapseRedundant!==!1,C=(i.root.children?.length??0)>1;return{nodes:np({node:u,pathPrefix:d,depth:0,startAngle:0,angleSpan:f>0?Math.PI*2:0,depthLimit:i.depthLimit,collapseRedundant:g,rootHasMultipleChildren:C}),totalMagnitude:f}}}function np(l){const i=[...l.pathPrefix,l.node.name],o=yl(l.node),u=Math.max(0,l.angleSpan),f=[{path:i,name:l.node.name,depth:l.depth,magnitude:o,startAngle:l.startAngle,endAngle:l.startAngle+u}];if(!l.node.children||l.node.children.length===0||typeof l.depthLimit=="number"&&l.depth>=l.depthLimit)return f;const C=l.node.children.map(v=>{const E=b0({node:v,collapseRedundant:l.collapseRedundant,rootHasMultipleChildren:l.rootHasMultipleChildren});return{child:E.node,pathSegments:E.pathSegments,magnitude:yl(E.node)}}).filter(v=>v.magnitude>0).map(v=>({child:v.child,pathSegments:v.pathSegments,magnitude:v.magnitude,isUnclassified:!1})),A=C.reduce((v,E)=>v+E.magnitude,0),p=Math.max(0,o-A);p>1e-9&&C.push({child:null,pathSegments:[y0(l.node.name)],magnitude:p,isUnclassified:!0});let b=l.startAngle;for(const v of C){const E=o===0?0:v.magnitude/o*u;v.isUnclassified||!v.child?f.push({path:i.concat(v.pathSegments),name:v.pathSegments[v.pathSegments.length-1]??"Unclassified",depth:l.depth+1,magnitude:v.magnitude,startAngle:b,endAngle:b+E}):f.push(...np({node:v.child,pathPrefix:i.concat(v.pathSegments.slice(0,-1)),depth:l.depth+1,startAngle:b,angleSpan:E,depthLimit:l.depthLimit,collapseRedundant:l.collapseRedundant,rootHasMultipleChildren:l.rootHasMultipleChildren})),b+=E}return f}function yl(l){const i=v0(l.magnitude);if(!l.children||l.children.length===0)return i;const o=l.children.reduce((u,d)=>u+yl(d),0);return Math.max(i,o)}function v0(l){return!Number.isFinite(l)||l<=0?0:l}function y0(l){return`[other ${l}]`}function b0(l){const i=[l.node.name];let o=l.node;if(!l.collapseRedundant)return{node:o,pathSegments:i};for(;S0(o,l.rootHasMultipleChildren);){const u=o.children?.[0];if(!u)break;o=u,i.push(u.name)}return{node:o,pathSegments:i}}function S0(l,i){const o=l.children??[];if(o.length!==1)return!1;const u=o[0],d=yl(l),f=yl(u);return Math.abs(d-f)>1e-9?!1:i||(u.children?.length??0)>0}function x0(l,i){if(!i||i.length===0)return l;const[o,...u]=i;if(o!==l.name)return null;let d=l;for(const f of u){const g=d.children?.find(C=>C.name===f);if(!g)return null;d=g}return d}function C0(l,i){if(!i||i.length===0)return null;const o=i.map(u=>u.trim()).filter(u=>u.length>0);return o.length===0||o[0]!==l.name?null:o}function A0(){const l=Bt(Xr),i=Bt(yi),o=Bt(Yr),u=Bt(bi),d=Bt(ku),f=Bt(Gu),g=Bt(Pu)??[],C=Bt(Lu)??-1,A=Bt(pl),p=Bt(Km),b=Bt(gl)??0,[v,E]=zt.useState(!1),[q,Q]=zt.useState(!1),[Y,nt]=zt.useState(null),[ft,it]=zt.useState({width:"",height:""}),[pt,Ot]=zt.useState(null),$t=zt.useRef(null),Nt=hy(gl,Xm,{emptyAs:0,clamp:{min:0,max:12}}),V=A??_a,_={background:V.background,borderWidth:`${Math.max(0,V.borderWidth)}px`,borderColor:V.borderColor},w={width:typeof V.width=="number"?`${Math.max(240,V.width)}px`:void 0,height:typeof V.height=="number"?`${Math.max(240,V.height)}px`:void 0,overflow:"visible"},G=Math.max(Qr,V.fontSizePx),Z=typeof V.width=="number"?"custom":"fit",I=typeof V.height=="number"?"custom":"fit",ut=pt==="width"?ft.width:typeof V.width=="number"?String(V.width):"",gt=pt==="height"?ft.height:typeof V.height=="number"?String(V.height):"",Pt=zt.useMemo(()=>{const tt=V.fontFamily;return Cu.some(Yt=>Yt.value===tt)?Cu:[{label:`Custom (${tt})`,value:tt},...Cu]},[V.fontFamily]),O=zt.useMemo(()=>i?new ep().computeLayout({root:i.tree,settings:{..._a,collapseRedundant:V.collapseRedundant},focusedPath:null,depthLimit:null}):null,[i,V.collapseRedundant]),L=zt.useMemo(()=>Ky(O??o??null),[O,o]),K=i?u??[i.tree.name]:null,J=f??d??K,dt=i?Yy(i.tree,J):null,y=J&&o?o.nodes.find(tt=>xi(tt.path,J))??null:null,x=J?Ee(J):null,T=Object.entries(dt?.attributes??{}),R=Gy(T),F=R?T.find(([tt])=>tt===R)?.[1]??"":"",X=R?Py(F,R):[],at=new Set(T.filter(([tt,Yt])=>Zm(tt,Yt)).map(([tt])=>tt)),$="Unassigned Members",et=T.filter(([tt])=>!at.has(tt)&&!Uy(tt)),yt=!!(x&&Y===x),ht=o?.totalMagnitude??0,xt=y?.magnitude??dt?.magnitude??0,Vt=ht>0?xt/ht*100:0,_t=(o?.nodes.filter(tt=>tt.depth===1&&!Ea(tt.name))??[]).sort((tt,Yt)=>Yt.magnitude!==tt.magnitude?Yt.magnitude-tt.magnitude:tt.name.localeCompare(Yt.name)),Tt=_t.slice(0,Ly),vt=_t.length-Tt.length,ae=$m(o??null),Ct=Fy(ae,b),Ht=Jm(Ct,Im),Zt=Ct>0?Math.max(8,Math.min(42,Ht(1)*.78)):42,De=zt.useMemo(()=>Wy(o??null,Ct,G),[o,G,Ct]),be=K&&K.length>1?K.slice(0,-1):null,Qe=tt=>{const Yt={...tt,colorScheme:Array.isArray(tt.colorScheme)?[...tt.colorScheme]:tt.colorScheme};if(l?.setProjectChartSettings){l.setProjectChartSettings(Yt);return}p?.set(Yt)},Et=tt=>{const Yt=p?.get()??V;Qe({...Yt,...tt})},Ne=(tt,Yt)=>{if(Yt==="fit"){Ot(Le=>Le===tt?null:Le),it(Le=>({...Le,[tt]:""})),Et({[tt]:"fit"});return}const cn=V[tt],Ma=tt==="width"?620:640,je=typeof cn=="number"&&Number.isFinite(cn)?Math.max(240,cn):Ma;it(Le=>({...Le,[tt]:String(je)})),Et({[tt]:je})},Wt=tt=>Yt=>{it(cn=>({...cn,[tt]:Yt.target.value}))},re=tt=>()=>{Ot(tt)},ge=tt=>Yt=>{Ot(je=>je===tt?null:je);const cn=Number.parseInt(Yt.target.value,10);if(!Number.isFinite(cn)){const je=typeof V[tt]=="number"?String(V[tt]):"";it(Le=>({...Le,[tt]:je}));return}const Ma=Math.max(240,cn);it(je=>({...je,[tt]:String(Ma)})),Et({[tt]:Ma})},U=()=>{if(!i)return;const tt=d0({datasetName:i.name,tree:i.tree,depthLimit:b,chartSettings:V});s0(f0(i.name),tt)},rt=()=>{!i||!$t.current||o0(u0(i.name),$t.current)},W=()=>{x&&nt(tt=>tt===x?null:x)},Ut=()=>{nt(null)},me=()=>{Q(tt=>!tt),nt(null)},ue=()=>{E(!0)},Pe=()=>{E(!1)};return zt.useEffect(()=>{if(pt!=="width"){const tt=typeof V.width=="number"?String(V.width):"";it(Yt=>Yt.width===tt?Yt:{...Yt,width:tt})}if(pt!=="height"){const tt=typeof V.height=="number"?String(V.height):"";it(Yt=>Yt.height===tt?Yt:{...Yt,height:tt})}},[pt,V.height,V.width,it]),{actions:l,dataset:i,chartLayout:o,focusPath:u,selectedPath:d,hoverPath:f,history:g,historyIndex:C,depthBind:Nt,depthLimit:b,settingsPopoverOpen:v,detailsPanelCollapsed:q,chartSvgRef:$t,resolvedChartSettings:V,chartSurfaceStyle:_,chartCanvasStyle:w,labelFontSize:G,widthMode:Z,heightMode:I,widthInputValue:ut,heightInputValue:gt,chartFontOptions:Pt,kronaColors:L,resolvedFocusPath:K,activePath:J,activeNode:dt,activeLayoutNode:y,activePathKey:x,visibleAttributes:et,membersPopoverOpen:yt,unassignedMembersLabel:$,unassignedMembers:X,totalMagnitude:ht,activeMagnitude:xt,activeShare:Vt,topSegments:Tt,hiddenSegments:vt,maxDepth:Ct,radiusScale:Ht,centerDiscRadius:Zt,wedgeRenderPlan:De,parentFocusPath:be,persistChartSettings:Qe,updateChartSettings:Et,updateDimensionMode:Ne,onDimensionValueChange:Wt,onDimensionInputFocus:re,onDimensionInputBlur:ge,onDownloadHtml:U,onDownloadSvg:rt,onToggleMembersPopover:W,onCloseMembersPopover:Ut,onToggleDetailsPanel:me,openSettingsPopover:ue,closeSettingsPopover:Pe}}function T0(){const l=A0();return m.jsx(zy,{model:l,children:m.jsxs("div",{className:"app-shell",children:[m.jsxs("div",{className:"app-frame chart-screen-frame",children:[m.jsx(Hy,{}),m.jsx(i0,{}),m.jsx(Oy,{}),m.jsx(a0,{})]}),m.jsx(r0,{}),m.jsx(l0,{})]})})}function N0(){const i=Bt(Xr),o=Bt(mi)??[],u=Bt(pi),d=Bt(gi)??[],f=Bt(vi),g=Bt(_u),C=Bt(wu)??Ci,A=Bt(qm),p=Bt(Lm),b=Bt(Mu),v=Bt(Du)??[],E=Bt(ju),q=Bt(Ru)??!1,Q=Bt(zu)??!1,Y=Bt(Uu)??!1,nt=Bt(Ym),ft=qr(Nu,Pm),it=qr(Ou,Fm),pt=qr(Hu,Vm),Ot=qr(Eu,Bm),[$t,Nt]=zt.useState(null),[V,_]=zt.useState(""),[w,G]=zt.useState(null),[Z,I]=zt.useState(""),[ut,gt]=zt.useState(null),[Pt,O]=zt.useState([]),[L,K]=zt.useState(null),[J,dt]=zt.useState(""),y=zt.useRef(null),x=(b?.rows??[]).filter(U=>{const rt=pt.value.trim().toLowerCase();return rt.length===0?!0:[String(U.sourceRow),String(U.magnitude),U.path.join(" / "),U.url??"",U.description??"",...Object.values(U.attributes)].join(" ").toLowerCase().includes(rt)}),T=U=>{A?.update(rt=>({...rt??Ci,...U}))},R=()=>{nt?.set(!0)},F=()=>{nt?.set(!1)},X=()=>{nt?.set(!1)},at=async U=>{i&&(await i.openProject(U),nt?.set(!0))},$=async U=>{i&&await i.openProject(U)},et=async(U,rt)=>{if(i)try{await i.exportProjectArchive(U),gt(`Downloaded archive for '${rt}'.`),O([])}catch(W){console.warn("Failed exporting project archive",W);const Ut=W instanceof Error?W.message:"Unknown export error.";gt(`Warning: ${Ut}`),O([])}},yt=()=>{y.current?.click()},ht=async U=>{const rt=U.target.files?.[0]??null;if(U.target.value="",!(!rt||!i))try{const W=await i.importProjectArchive(rt),Ut=W.warnings.length,me=Ut>0?` with ${Ut} warning(s).`:".",ue=W.mode==="krona-html"?"Krona HTML project":"project archive";gt(`Imported ${ue} '${W.projectName}' (${W.datasetCount} dataset(s))${me}`);const Pe=W.warnings.slice(0,120).map(E0);W.warnings.length>120&&Pe.push(`... ${W.warnings.length-120} additional warning(s) not shown.`),O(Pe)}catch(W){console.warn("Failed importing project archive",W);const Ut=W instanceof Error?W.message:"Unknown import error.";gt(`Warning: ${Ut}`),O([])}},xt=L!==null?o.find(U=>U.id===L)??null:null,Vt=J.trim().toLowerCase()==="delete",_t=U=>{K(U),dt("")},Tt=()=>{K(null),dt("")},vt=async()=>{if(!(!xt||!Vt||!i))try{await i.deleteProject(xt.id),gt(`Deleted project '${xt.name}'.`)}catch(U){console.warn("Failed deleting project",U);const rt=U instanceof Error?U.message:"Unknown delete error.";gt(`Warning: ${rt}`)}finally{Tt()}},ae=U=>{try{const rt={exportedAt:new Date().toISOString(),dataset:U};w0(_0(U.name),JSON.stringify(rt,null,2),"application/json"),gt(`Downloaded dataset '${U.name}' JSON.`)}catch(rt){console.warn("Failed exporting dataset JSON",rt);const W=rt instanceof Error?rt.message:"Unknown dataset export error.";gt(`Warning: ${W}`)}},Ct=(U,rt)=>{Nt(U),_(rt)},Ht=()=>{Nt(null),_("")},Zt=async U=>{const rt=o.find(me=>me.id===U),W=V.trim(),Ut=W.length>0?W:rt?.name??"";Ht(),!(!i||!rt||Ut.length===0||Ut===rt.name)&&await i.renameProject(U,Ut)},De=(U,rt)=>{G(U),I(rt)},be=()=>{G(null),I("")},Qe=async U=>{const rt=d.find(me=>me.id===U),W=Z.trim(),Ut=W.length>0?W:rt?.name??"";be(),!(!i||!rt||Ut.length===0||Ut===rt.name)&&await i.renameDataset(U,Ut)},Et=U=>{if(U.key==="Enter"){U.preventDefault(),U.currentTarget.blur();return}U.key==="Escape"&&(U.preventDefault(),be())},Ne=U=>{if(U.key==="Enter"){U.preventDefault(),U.currentTarget.blur();return}U.key==="Escape"&&(U.preventDefault(),Ht())},Wt=()=>{!i||!f||(i.openChart(f),nt?.set(!1))},re=async U=>{const rt=U.target.files?.[0];if(!rt)return;const W=await rt.text();p?.set({kind:"file",name:rt.name,content:W})},ge=async()=>{const U=Ot.value.trim();if(U.length!==0)try{const W=await(await fetch(U)).text(),Ut=U.split("/").pop()||"url-source";p?.set({kind:"url",name:Ut,content:W})}catch(rt){console.error("Failed loading URL source",rt)}};return m.jsxs("div",{className:"app-shell",children:[m.jsxs("div",{className:"app-frame",children:[m.jsx("header",{className:"panel",children:m.jsx("h1",{children:m.jsx("a",{href:"https://github.com/owebeeone/jowna",target:"_blank",rel:"noreferrer",children:"Jowna - data visualizer"})})}),m.jsx("div",{className:"panel-grid",children:m.jsxs("section",{className:"panel stack",children:[m.jsx("h2",{children:"Projects"}),m.jsxs("div",{className:"row",children:[m.jsx("input",{placeholder:"New project name",value:ft.value,onChange:ft.onChange}),m.jsx("button",{onClick:()=>i?.createProject(ft.value),disabled:!i,children:"Create"})]}),m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:()=>i?.refreshProjects(),disabled:!i,children:"Refresh"}),m.jsx("button",{className:"ghost",onClick:R,children:"Import Tool"}),m.jsx("button",{className:"ghost",onClick:yt,disabled:!i,children:"Upload Project"}),m.jsx(pm,{onClick:()=>i?.openChart(f),disabled:!i||!f,label:"Open active chart"})]}),m.jsx("input",{ref:y,type:"file",accept:".jowna,.jowna-project,.krona.html,.html,.htm,application/json,text/json,text/html",style:{display:"none"},onChange:ht}),m.jsx("div",{className:"storage-warning",children:"Warning: project data is stored in your browser on this computer and may be removed by site-data/browser cleanup."}),ut&&m.jsx("div",{className:"muted",children:ut}),Pt.length>0&&m.jsx("ul",{className:"warning-list",children:Pt.map((U,rt)=>m.jsx("li",{children:U},`${U}-${rt}`))}),m.jsx("ul",{className:"project-list",children:o.map(U=>{const rt=U.id===u;return m.jsxs("li",{className:`project-item${rt?" active":""}`,role:"button",tabIndex:0,onClick:()=>{$(U.id)},onKeyDown:W=>{W.target===W.currentTarget&&(W.key==="Enter"||W.key===" ")&&(W.preventDefault(),$(U.id))},children:[m.jsx("div",{children:$t===U.id?m.jsx("input",{className:"project-name-input",autoFocus:!0,value:V,onChange:W=>_(W.target.value),onClick:W=>W.stopPropagation(),onBlur:()=>{Zt(U.id)},onKeyDown:Ne}):m.jsx("button",{className:"project-name-button",onClick:W=>{W.stopPropagation(),Ct(U.id,U.name)},children:U.name})}),m.jsxs("div",{className:"muted",children:["datasets: ",U.datasetIds.length]}),m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:W=>{W.stopPropagation(),at(U.id)},children:"Import"}),m.jsx("button",{className:"ghost",onClick:W=>{W.stopPropagation(),i?.copyProject(U.id,`${U.name} Copy`)},children:"Copy"}),m.jsx("button",{className:"ghost",title:"Download the Jowna project file.",onClick:W=>{W.stopPropagation(),et(U.id,U.name)},children:"Download Jowna"}),m.jsx("button",{className:"danger",onClick:W=>{W.stopPropagation(),_t(U.id)},children:"Delete"})]}),rt&&m.jsxs("div",{className:"project-datasets stack",onClick:W=>W.stopPropagation(),onKeyDown:W=>W.stopPropagation(),children:[m.jsx("h3",{children:"Datasets"}),d.length===0&&m.jsx("div",{className:"muted",children:"No datasets yet."}),d.map(W=>m.jsxs("div",{className:"row",style:{justifyContent:"space-between"},children:[m.jsxs("div",{className:"dataset-name-wrap",children:[w===W.id?m.jsx("input",{className:"dataset-name-input",autoFocus:!0,value:Z,onChange:Ut=>I(Ut.target.value),onBlur:()=>{Qe(W.id)},onKeyDown:Et}):m.jsx("button",{className:"dataset-name-button",onClick:()=>De(W.id,W.name),children:W.name}),W.id===f&&m.jsx("span",{className:"muted",children:"(active)"})]}),m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:()=>ae(W),children:"Download Dataset"}),m.jsx(pm,{className:"ghost",onClick:()=>i?.openChart(W.id),disabled:!i,label:`Open chart for ${W.name}`})]})]},W.id))]})]},U.id)})})]})})]}),Y&&m.jsx("div",{className:"import-popover-backdrop",onClick:F,children:m.jsxs("section",{className:"panel import-popover",role:"dialog","aria-modal":"true","aria-label":"Import Tool",onClick:U=>U.stopPropagation(),children:[m.jsxs("header",{className:"import-popover-header",children:[m.jsx("h2",{children:"Import Tool"}),m.jsx("button",{className:"ghost popover-x",onClick:X,"aria-label":"Cancel import dialog",children:"X"})]}),m.jsxs("div",{className:"import-popover-body stack",children:[m.jsxs("div",{className:"stack",children:[m.jsxs("label",{children:[m.jsx("span",{className:"muted",children:"File Source"}),m.jsx("input",{type:"file",onChange:re})]}),m.jsxs("div",{className:"row",children:[m.jsx("input",{placeholder:"https://example.com/data.tsv",value:Ot.value,onChange:Ot.onChange}),m.jsx("button",{className:"ghost",onClick:ge,children:"Load URL"})]}),m.jsxs("div",{className:"muted",children:["Source: ",m.jsx("strong",{children:g?.name??"none"})]})]}),m.jsxs("div",{className:"panel stack",style:{background:"#fafcfb"},children:[m.jsx("h3",{children:"Parse Parameters"}),m.jsxs("div",{className:"row",children:[m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Format"}),m.jsxs("select",{value:C.format,onChange:U=>T({format:U.target.value}),children:[m.jsx("option",{value:"auto",children:"Auto"}),m.jsx("option",{value:"tsv",children:"TSV"}),m.jsx("option",{value:"csv",children:"CSV"}),m.jsx("option",{value:"json-hierarchy",children:"JSON hierarchy"}),m.jsx("option",{value:"json-flat",children:"JSON flat rows"})]})]}),m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Delimiter"}),m.jsx("input",{value:C.delimiter,onChange:U=>T({delimiter:U.target.value})})]})]}),m.jsxs("label",{className:"row",style:{alignItems:"center"},children:[m.jsx("input",{type:"checkbox",style:{width:"auto"},checked:C.hasHeaderRow,onChange:U=>T({hasHeaderRow:U.target.checked})}),m.jsx("span",{children:"Header row"})]}),m.jsxs("div",{className:"row",children:[m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Comment Prefix"}),m.jsx("input",{value:C.commentPrefix,onChange:U=>T({commentPrefix:U.target.value})})]}),m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Magnitude Field"}),m.jsx("input",{value:C.magnitudeField,onChange:U=>T({magnitudeField:U.target.value})})]})]}),m.jsxs("label",{children:[m.jsx("span",{className:"muted",children:"Path Fields (comma-separated)"}),m.jsx("input",{value:C.pathFields.join(","),onChange:U=>T({pathFields:U.target.value.split(",").map(rt=>rt.trim()).filter(rt=>rt.length>0)})})]}),m.jsxs("div",{className:"row",children:[m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"URL Field"}),m.jsx("input",{value:C.urlField??"",onChange:U=>T({urlField:U.target.value.trim().length>0?U.target.value:null})})]}),m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Description Field"}),m.jsx("input",{value:C.descriptionField??"",onChange:U=>T({descriptionField:U.target.value.trim().length>0?U.target.value:null})})]})]}),m.jsxs("label",{children:[m.jsx("span",{className:"muted",children:"Attribute Fields (comma-separated)"}),m.jsx("input",{value:C.attributeFields.join(","),onChange:U=>T({attributeFields:U.target.value.split(",").map(rt=>rt.trim()).filter(rt=>rt.length>0)})})]}),m.jsx("div",{className:"row",children:m.jsx("button",{onClick:()=>i?.parsePreview(),disabled:!i||q,children:q?"Parsing...":"Preview Parse"})})]}),m.jsxs("div",{className:"panel stack",style:{background:"#fafcfb"},children:[m.jsx("h3",{children:"Preview"}),E&&m.jsx("div",{style:{color:"#b23a2f"},children:E}),m.jsxs("div",{className:"muted",children:["Rows: ",b?.totalRows??0]}),m.jsxs("label",{children:[m.jsx("span",{className:"muted",children:"Filter Preview"}),m.jsx("input",{value:pt.value,onChange:pt.onChange})]}),m.jsx("div",{className:"preview-wrap",children:m.jsxs("table",{className:"preview-table",children:[m.jsx("thead",{children:m.jsxs("tr",{children:[m.jsx("th",{children:"row"}),m.jsx("th",{children:"magnitude"}),m.jsx("th",{children:"path"}),m.jsx("th",{children:"url"}),m.jsx("th",{children:"description"}),m.jsx("th",{children:"attributes"})]})}),m.jsxs("tbody",{children:[x.map(U=>m.jsxs("tr",{children:[m.jsx("td",{children:U.sourceRow}),m.jsx("td",{children:U.magnitude}),m.jsx("td",{children:U.path.join(" / ")}),m.jsx("td",{children:U.url??""}),m.jsx("td",{children:U.description??""}),m.jsx("td",{children:Object.entries(U.attributes).map(([rt,W])=>`${rt}:${W}`).join(" | ")})]},U.rowId)),x.length===0&&m.jsx("tr",{children:m.jsx("td",{colSpan:6,className:"muted",children:"No preview rows."})})]})]})}),m.jsxs("div",{children:[m.jsx("h4",{children:"Warnings"}),m.jsxs("ul",{className:"warning-list",children:[v.map((U,rt)=>m.jsxs("li",{children:[m.jsx("strong",{children:U.code}),": ",U.message,U.row?` (row ${U.row})`:"",U.column?` [${U.column}]`:""]},`${U.code}-${U.row??0}-${rt}`)),v.length===0&&m.jsx("li",{className:"muted",children:"No warnings."})]})]}),m.jsxs("div",{className:"row",children:[m.jsx("input",{placeholder:"Dataset name",value:it.value,onChange:it.onChange}),m.jsx("button",{onClick:()=>i?.applyImport(it.value),disabled:!i||!Q||!u,children:"Apply Import"})]})]})]}),m.jsxs("footer",{className:"import-popover-footer row",children:[m.jsx("button",{className:"ghost",onClick:X,children:"Cancel"}),m.jsx("button",{className:"ghost",onClick:F,children:"Close"}),m.jsx("button",{onClick:Wt,disabled:!i||!f,children:"View Chart"})]})]})}),xt&&m.jsx("div",{className:"delete-confirm-backdrop",onClick:Tt,children:m.jsxs("section",{className:"panel delete-confirm-dialog",role:"dialog","aria-modal":"true","aria-label":"Confirm project deletion",onClick:U=>U.stopPropagation(),children:[m.jsx("h3",{children:"Delete Project"}),m.jsxs("div",{children:["Type ",m.jsx("code",{children:"delete"})," to delete ",m.jsx("strong",{children:xt.name}),"."]}),m.jsx("input",{autoFocus:!0,value:J,placeholder:"delete",onChange:U=>dt(U.target.value)}),m.jsxs("div",{className:"row delete-confirm-actions",children:[m.jsx("button",{className:"ghost",onClick:Tt,children:"Cancel"}),m.jsx("button",{className:"danger",onClick:vt,disabled:!Vt,children:"Delete"})]})]})})]})}function _0(l){const i=l.trim().replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return`${i.length>0?i:"dataset"}.json`}function E0(l){const i=l.row?` (row ${l.row})`:"",o=l.column?` [${l.column}]`:"";return`${l.code}: ${l.message}${i}${o}`}function w0(l,i,o){const u=new Blob([i],{type:o}),d=URL.createObjectURL(u),f=document.createElement("a");f.href=d,f.download=l,f.rel="noopener",f.click(),URL.revokeObjectURL(d)}function pm({className:l,disabled:i,label:o,onClick:u}){const d=l?`chart-icon-button ${l}`:"chart-icon-button";return m.jsx("button",{className:d,onClick:u,disabled:i,"aria-label":o,children:m.jsx(M0,{})})}function M0(){return m.jsxs("svg",{className:"chart-outline-icon",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",focusable:"false",children:[m.jsx("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor",strokeWidth:"1.6"}),m.jsx("circle",{cx:"12",cy:"12",r:"3.2",stroke:"currentColor",strokeWidth:"1.2"}),m.jsx("path",{d:"M12 3v6",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"}),m.jsx("path",{d:"M17.4 6.7l-3.8 4.8",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"}),m.jsx("path",{d:"M20.8 13l-6-0.4",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"}),m.jsx("path",{d:"M7 19.7l2.4-5.5",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]})}function D0(){return(Bt(Tu)??"selection")==="chart"?m.jsx(T0,{}):m.jsx(N0,{})}var Kr={exports:{}};var j0=Kr.exports,gm;function R0(){return gm||(gm=1,(function(l,i){((o,u)=>{l.exports=u()})(j0,function o(){var u=typeof self<"u"?self:typeof window<"u"?window:u!==void 0?u:{},d,f=!u.document&&!!u.postMessage,g=u.IS_PAPA_WORKER||!1,C={},A=0,p={};function b(_){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(w){var G=$t(w);G.chunkSize=parseInt(G.chunkSize),w.step||w.chunk||(G.chunkSize=null),this._handle=new Y(G),(this._handle.streamer=this)._config=G}).call(this,_),this.parseChunk=function(w,G){var Z=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<Z){let ut=this._config.newline;ut||(I=this._config.quoteChar||'"',ut=this._handle.guessLineEndings(w,I)),w=[...w.split(ut).slice(Z)].join(ut)}this.isFirstChunk&&V(this._config.beforeFirstChunk)&&(I=this._config.beforeFirstChunk(w))!==void 0&&(w=I),this.isFirstChunk=!1,this._halted=!1;var Z=this._partialLine+w,I=(this._partialLine="",this._handle.parse(Z,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(w=I.meta.cursor,Z=(this._finished||(this._partialLine=Z.substring(w-this._baseIndex),this._baseIndex=w),I&&I.data&&(this._rowCount+=I.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),g)u.postMessage({results:I,workerId:p.WORKER_ID,finished:Z});else if(V(this._config.chunk)&&!G){if(this._config.chunk(I,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=I=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(I.data),this._completeResults.errors=this._completeResults.errors.concat(I.errors),this._completeResults.meta=I.meta),this._completed||!Z||!V(this._config.complete)||I&&I.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),Z||I&&I.meta.paused||this._nextChunk(),I}this._halted=!0},this._sendError=function(w){V(this._config.error)?this._config.error(w):g&&this._config.error&&u.postMessage({workerId:p.WORKER_ID,error:w,finished:!1})}}function v(_){var w;(_=_||{}).chunkSize||(_.chunkSize=p.RemoteChunkSize),b.call(this,_),this._nextChunk=f?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(G){this._input=G,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(w=new XMLHttpRequest,this._config.withCredentials&&(w.withCredentials=this._config.withCredentials),f||(w.onload=Nt(this._chunkLoaded,this),w.onerror=Nt(this._chunkError,this)),w.open(this._config.downloadRequestBody?"POST":"GET",this._input,!f),this._config.downloadRequestHeaders){var G,Z=this._config.downloadRequestHeaders;for(G in Z)w.setRequestHeader(G,Z[G])}var I;this._config.chunkSize&&(I=this._start+this._config.chunkSize-1,w.setRequestHeader("Range","bytes="+this._start+"-"+I));try{w.send(this._config.downloadRequestBody)}catch(ut){this._chunkError(ut.message)}f&&w.status===0&&this._chunkError()}},this._chunkLoaded=function(){w.readyState===4&&(w.status<200||400<=w.status?this._chunkError():(this._start+=this._config.chunkSize||w.responseText.length,this._finished=!this._config.chunkSize||this._start>=(G=>(G=G.getResponseHeader("Content-Range"))!==null?parseInt(G.substring(G.lastIndexOf("/")+1)):-1)(w),this.parseChunk(w.responseText)))},this._chunkError=function(G){G=w.statusText||G,this._sendError(new Error(G))}}function E(_){(_=_||{}).chunkSize||(_.chunkSize=p.LocalChunkSize),b.call(this,_);var w,G,Z=typeof FileReader<"u";this.stream=function(I){this._input=I,G=I.slice||I.webkitSlice||I.mozSlice,Z?((w=new FileReader).onload=Nt(this._chunkLoaded,this),w.onerror=Nt(this._chunkError,this)):w=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var I=this._input,ut=(this._config.chunkSize&&(ut=Math.min(this._start+this._config.chunkSize,this._input.size),I=G.call(I,this._start,ut)),w.readAsText(I,this._config.encoding));Z||this._chunkLoaded({target:{result:ut}})},this._chunkLoaded=function(I){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(I.target.result)},this._chunkError=function(){this._sendError(w.error)}}function q(_){var w;b.call(this,_=_||{}),this.stream=function(G){return w=G,this._nextChunk()},this._nextChunk=function(){var G,Z;if(!this._finished)return G=this._config.chunkSize,w=G?(Z=w.substring(0,G),w.substring(G)):(Z=w,""),this._finished=!w,this.parseChunk(Z)}}function Q(_){b.call(this,_=_||{});var w=[],G=!0,Z=!1;this.pause=function(){b.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){b.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(I){this._input=I,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){Z&&w.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),w.length?this.parseChunk(w.shift()):G=!0},this._streamData=Nt(function(I){try{w.push(typeof I=="string"?I:I.toString(this._config.encoding)),G&&(G=!1,this._checkIsFinished(),this.parseChunk(w.shift()))}catch(ut){this._streamError(ut)}},this),this._streamError=Nt(function(I){this._streamCleanUp(),this._sendError(I)},this),this._streamEnd=Nt(function(){this._streamCleanUp(),Z=!0,this._streamData("")},this),this._streamCleanUp=Nt(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function Y(_){var w,G,Z,I,ut=Math.pow(2,53),gt=-ut,Pt=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,O=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,L=this,K=0,J=0,dt=!1,y=!1,x=[],T={data:[],errors:[],meta:{}};function R($){return _.skipEmptyLines==="greedy"?$.join("").trim()==="":$.length===1&&$[0].length===0}function F(){if(T&&Z&&(at("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+p.DefaultDelimiter+"'"),Z=!1),_.skipEmptyLines&&(T.data=T.data.filter(function(xt){return!R(xt)})),X()){let xt=function(Vt,_t){V(_.transformHeader)&&(Vt=_.transformHeader(Vt,_t)),x.push(Vt)};var ht=xt;if(T)if(Array.isArray(T.data[0])){for(var $=0;X()&&$<T.data.length;$++)T.data[$].forEach(xt);T.data.splice(0,1)}else T.data.forEach(xt)}function et(xt,Vt){for(var _t=_.header?{}:[],Tt=0;Tt<xt.length;Tt++){var vt=Tt,ae=xt[Tt],ae=((Ct,Ht)=>(Zt=>(_.dynamicTypingFunction&&_.dynamicTyping[Zt]===void 0&&(_.dynamicTyping[Zt]=_.dynamicTypingFunction(Zt)),(_.dynamicTyping[Zt]||_.dynamicTyping)===!0))(Ct)?Ht==="true"||Ht==="TRUE"||Ht!=="false"&&Ht!=="FALSE"&&((Zt=>{if(Pt.test(Zt)&&(Zt=parseFloat(Zt),gt<Zt&&Zt<ut))return 1})(Ht)?parseFloat(Ht):O.test(Ht)?new Date(Ht):Ht===""?null:Ht):Ht)(vt=_.header?Tt>=x.length?"__parsed_extra":x[Tt]:vt,ae=_.transform?_.transform(ae,vt):ae);vt==="__parsed_extra"?(_t[vt]=_t[vt]||[],_t[vt].push(ae)):_t[vt]=ae}return _.header&&(Tt>x.length?at("FieldMismatch","TooManyFields","Too many fields: expected "+x.length+" fields but parsed "+Tt,J+Vt):Tt<x.length&&at("FieldMismatch","TooFewFields","Too few fields: expected "+x.length+" fields but parsed "+Tt,J+Vt)),_t}var yt;T&&(_.header||_.dynamicTyping||_.transform)&&(yt=1,!T.data.length||Array.isArray(T.data[0])?(T.data=T.data.map(et),yt=T.data.length):T.data=et(T.data,0),_.header&&T.meta&&(T.meta.fields=x),J+=yt)}function X(){return _.header&&x.length===0}function at($,et,yt,ht){$={type:$,code:et,message:yt},ht!==void 0&&($.row=ht),T.errors.push($)}V(_.step)&&(I=_.step,_.step=function($){T=$,X()?F():(F(),T.data.length!==0&&(K+=$.data.length,_.preview&&K>_.preview?G.abort():(T.data=T.data[0],I(T,L))))}),this.parse=function($,et,yt){var ht=_.quoteChar||'"',ht=(_.newline||(_.newline=this.guessLineEndings($,ht)),Z=!1,_.delimiter?V(_.delimiter)&&(_.delimiter=_.delimiter($),T.meta.delimiter=_.delimiter):((ht=((xt,Vt,_t,Tt,vt)=>{var ae,Ct,Ht,Zt;vt=vt||[",","	","|",";",p.RECORD_SEP,p.UNIT_SEP];for(var De=0;De<vt.length;De++){for(var be,Qe=vt[De],Et=0,Ne=0,Wt=0,re=(Ht=void 0,new ft({comments:Tt,delimiter:Qe,newline:Vt,preview:10}).parse(xt)),ge=0;ge<re.data.length;ge++)_t&&R(re.data[ge])?Wt++:(be=re.data[ge].length,Ne+=be,Ht===void 0?Ht=be:0<be&&(Et+=Math.abs(be-Ht),Ht=be));0<re.data.length&&(Ne/=re.data.length-Wt),(Ct===void 0||Et<=Ct)&&(Zt===void 0||Zt<Ne)&&1.99<Ne&&(Ct=Et,ae=Qe,Zt=Ne)}return{successful:!!(_.delimiter=ae),bestDelimiter:ae}})($,_.newline,_.skipEmptyLines,_.comments,_.delimitersToGuess)).successful?_.delimiter=ht.bestDelimiter:(Z=!0,_.delimiter=p.DefaultDelimiter),T.meta.delimiter=_.delimiter),$t(_));return _.preview&&_.header&&ht.preview++,w=$,G=new ft(ht),T=G.parse(w,et,yt),F(),dt?{meta:{paused:!0}}:T||{meta:{paused:!1}}},this.paused=function(){return dt},this.pause=function(){dt=!0,G.abort(),w=V(_.chunk)?"":w.substring(G.getCharIndex())},this.resume=function(){L.streamer._halted?(dt=!1,L.streamer.parseChunk(w,!0)):setTimeout(L.resume,3)},this.aborted=function(){return y},this.abort=function(){y=!0,G.abort(),T.meta.aborted=!0,V(_.complete)&&_.complete(T),w=""},this.guessLineEndings=function(xt,ht){xt=xt.substring(0,1048576);var ht=new RegExp(nt(ht)+"([^]*?)"+nt(ht),"gm"),yt=(xt=xt.replace(ht,"")).split("\r"),ht=xt.split(`
`),xt=1<ht.length&&ht[0].length<yt[0].length;if(yt.length===1||xt)return`
`;for(var Vt=0,_t=0;_t<yt.length;_t++)yt[_t][0]===`
`&&Vt++;return Vt>=yt.length/2?`\r
`:"\r"}}function nt(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ft(_){var w=(_=_||{}).delimiter,G=_.newline,Z=_.comments,I=_.step,ut=_.preview,gt=_.fastMode,Pt=null,O=!1,L=_.quoteChar==null?'"':_.quoteChar,K=L;if(_.escapeChar!==void 0&&(K=_.escapeChar),(typeof w!="string"||-1<p.BAD_DELIMITERS.indexOf(w))&&(w=","),Z===w)throw new Error("Comment character same as delimiter");Z===!0?Z="#":(typeof Z!="string"||-1<p.BAD_DELIMITERS.indexOf(Z))&&(Z=!1),G!==`
`&&G!=="\r"&&G!==`\r
`&&(G=`
`);var J=0,dt=!1;this.parse=function(y,x,T){if(typeof y!="string")throw new Error("Input must be a string");var R=y.length,F=w.length,X=G.length,at=Z.length,$=V(I),et=[],yt=[],ht=[],xt=J=0;if(!y)return Et();if(gt||gt!==!1&&y.indexOf(L)===-1){for(var Vt=y.split(G),_t=0;_t<Vt.length;_t++){if(ht=Vt[_t],J+=ht.length,_t!==Vt.length-1)J+=G.length;else if(T)return Et();if(!Z||ht.substring(0,at)!==Z){if($){if(et=[],Zt(ht.split(w)),Ne(),dt)return Et()}else Zt(ht.split(w));if(ut&&ut<=_t)return et=et.slice(0,ut),Et(!0)}}return Et()}for(var Tt=y.indexOf(w,J),vt=y.indexOf(G,J),ae=new RegExp(nt(K)+nt(L),"g"),Ct=y.indexOf(L,J);;)if(y[J]===L)for(Ct=J,J++;;){if((Ct=y.indexOf(L,Ct+1))===-1)return T||yt.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:et.length,index:J}),be();if(Ct===R-1)return be(y.substring(J,Ct).replace(ae,L));if(L===K&&y[Ct+1]===K)Ct++;else if(L===K||Ct===0||y[Ct-1]!==K){Tt!==-1&&Tt<Ct+1&&(Tt=y.indexOf(w,Ct+1));var Ht=De((vt=vt!==-1&&vt<Ct+1?y.indexOf(G,Ct+1):vt)===-1?Tt:Math.min(Tt,vt));if(y.substr(Ct+1+Ht,F)===w){ht.push(y.substring(J,Ct).replace(ae,L)),y[J=Ct+1+Ht+F]!==L&&(Ct=y.indexOf(L,J)),Tt=y.indexOf(w,J),vt=y.indexOf(G,J);break}if(Ht=De(vt),y.substring(Ct+1+Ht,Ct+1+Ht+X)===G){if(ht.push(y.substring(J,Ct).replace(ae,L)),Qe(Ct+1+Ht+X),Tt=y.indexOf(w,J),Ct=y.indexOf(L,J),$&&(Ne(),dt))return Et();if(ut&&et.length>=ut)return Et(!0);break}yt.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:et.length,index:J}),Ct++}}else if(Z&&ht.length===0&&y.substring(J,J+at)===Z){if(vt===-1)return Et();J=vt+X,vt=y.indexOf(G,J),Tt=y.indexOf(w,J)}else if(Tt!==-1&&(Tt<vt||vt===-1))ht.push(y.substring(J,Tt)),J=Tt+F,Tt=y.indexOf(w,J);else{if(vt===-1)break;if(ht.push(y.substring(J,vt)),Qe(vt+X),$&&(Ne(),dt))return Et();if(ut&&et.length>=ut)return Et(!0)}return be();function Zt(Wt){et.push(Wt),xt=J}function De(Wt){var re=0;return re=Wt!==-1&&(Wt=y.substring(Ct+1,Wt))&&Wt.trim()===""?Wt.length:re}function be(Wt){return T||(Wt===void 0&&(Wt=y.substring(J)),ht.push(Wt),J=R,Zt(ht),$&&Ne()),Et()}function Qe(Wt){J=Wt,Zt(ht),ht=[],vt=y.indexOf(G,J)}function Et(Wt){if(_.header&&!x&&et.length&&!O){var re=et[0],ge=Object.create(null),U=new Set(re);let rt=!1;for(let W=0;W<re.length;W++){let Ut=re[W];if(ge[Ut=V(_.transformHeader)?_.transformHeader(Ut,W):Ut]){let me,ue=ge[Ut];for(;me=Ut+"_"+ue,ue++,U.has(me););U.add(me),re[W]=me,ge[Ut]++,rt=!0,(Pt=Pt===null?{}:Pt)[me]=Ut}else ge[Ut]=1,re[W]=Ut;U.add(Ut)}rt&&console.warn("Duplicate headers found and renamed."),O=!0}return{data:et,errors:yt,meta:{delimiter:w,linebreak:G,aborted:dt,truncated:!!Wt,cursor:xt+(x||0),renamedHeaders:Pt}}}function Ne(){I(Et()),et=[],yt=[]}},this.abort=function(){dt=!0},this.getCharIndex=function(){return J}}function it(_){var w=_.data,G=C[w.workerId],Z=!1;if(w.error)G.userError(w.error,w.file);else if(w.results&&w.results.data){var I={abort:function(){Z=!0,pt(w.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:Ot,resume:Ot};if(V(G.userStep)){for(var ut=0;ut<w.results.data.length&&(G.userStep({data:w.results.data[ut],errors:w.results.errors,meta:w.results.meta},I),!Z);ut++);delete w.results}else V(G.userChunk)&&(G.userChunk(w.results,I,w.file),delete w.results)}w.finished&&!Z&&pt(w.workerId,w.results)}function pt(_,w){var G=C[_];V(G.userComplete)&&G.userComplete(w),G.terminate(),delete C[_]}function Ot(){throw new Error("Not implemented.")}function $t(_){if(typeof _!="object"||_===null)return _;var w,G=Array.isArray(_)?[]:{};for(w in _)G[w]=$t(_[w]);return G}function Nt(_,w){return function(){_.apply(w,arguments)}}function V(_){return typeof _=="function"}return p.parse=function(_,w){var G=(w=w||{}).dynamicTyping||!1;if(V(G)&&(w.dynamicTypingFunction=G,G={}),w.dynamicTyping=G,w.transform=!!V(w.transform)&&w.transform,!w.worker||!p.WORKERS_SUPPORTED)return G=null,p.NODE_STREAM_INPUT,typeof _=="string"?(_=(Z=>Z.charCodeAt(0)!==65279?Z:Z.slice(1))(_),G=new(w.download?v:q)(w)):_.readable===!0&&V(_.read)&&V(_.on)?G=new Q(w):(u.File&&_ instanceof File||_ instanceof Object)&&(G=new E(w)),G.stream(_);(G=(()=>{var Z;return!!p.WORKERS_SUPPORTED&&(Z=(()=>{var I=u.URL||u.webkitURL||null,ut=o.toString();return p.BLOB_URL||(p.BLOB_URL=I.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",ut,")();"],{type:"text/javascript"})))})(),(Z=new u.Worker(Z)).onmessage=it,Z.id=A++,C[Z.id]=Z)})()).userStep=w.step,G.userChunk=w.chunk,G.userComplete=w.complete,G.userError=w.error,w.step=V(w.step),w.chunk=V(w.chunk),w.complete=V(w.complete),w.error=V(w.error),delete w.worker,G.postMessage({input:_,config:w,workerId:G.id})},p.unparse=function(_,w){var G=!1,Z=!0,I=",",ut=`\r
`,gt='"',Pt=gt+gt,O=!1,L=null,K=!1,J=((()=>{if(typeof w=="object"){if(typeof w.delimiter!="string"||p.BAD_DELIMITERS.filter(function(x){return w.delimiter.indexOf(x)!==-1}).length||(I=w.delimiter),typeof w.quotes!="boolean"&&typeof w.quotes!="function"&&!Array.isArray(w.quotes)||(G=w.quotes),typeof w.skipEmptyLines!="boolean"&&typeof w.skipEmptyLines!="string"||(O=w.skipEmptyLines),typeof w.newline=="string"&&(ut=w.newline),typeof w.quoteChar=="string"&&(gt=w.quoteChar),typeof w.header=="boolean"&&(Z=w.header),Array.isArray(w.columns)){if(w.columns.length===0)throw new Error("Option columns is empty");L=w.columns}w.escapeChar!==void 0&&(Pt=w.escapeChar+gt),w.escapeFormulae instanceof RegExp?K=w.escapeFormulae:typeof w.escapeFormulae=="boolean"&&w.escapeFormulae&&(K=/^[=+\-@\t\r].*$/)}})(),new RegExp(nt(gt),"g"));if(typeof _=="string"&&(_=JSON.parse(_)),Array.isArray(_)){if(!_.length||Array.isArray(_[0]))return dt(null,_,O);if(typeof _[0]=="object")return dt(L||Object.keys(_[0]),_,O)}else if(typeof _=="object")return typeof _.data=="string"&&(_.data=JSON.parse(_.data)),Array.isArray(_.data)&&(_.fields||(_.fields=_.meta&&_.meta.fields||L),_.fields||(_.fields=Array.isArray(_.data[0])?_.fields:typeof _.data[0]=="object"?Object.keys(_.data[0]):[]),Array.isArray(_.data[0])||typeof _.data[0]=="object"||(_.data=[_.data])),dt(_.fields||[],_.data||[],O);throw new Error("Unable to serialize unrecognized input");function dt(x,T,R){var F="",X=(typeof x=="string"&&(x=JSON.parse(x)),typeof T=="string"&&(T=JSON.parse(T)),Array.isArray(x)&&0<x.length),at=!Array.isArray(T[0]);if(X&&Z){for(var $=0;$<x.length;$++)0<$&&(F+=I),F+=y(x[$],$);0<T.length&&(F+=ut)}for(var et=0;et<T.length;et++){var yt=(X?x:T[et]).length,ht=!1,xt=X?Object.keys(T[et]).length===0:T[et].length===0;if(R&&!X&&(ht=R==="greedy"?T[et].join("").trim()==="":T[et].length===1&&T[et][0].length===0),R==="greedy"&&X){for(var Vt=[],_t=0;_t<yt;_t++){var Tt=at?x[_t]:_t;Vt.push(T[et][Tt])}ht=Vt.join("").trim()===""}if(!ht){for(var vt=0;vt<yt;vt++){0<vt&&!xt&&(F+=I);var ae=X&&at?x[vt]:vt;F+=y(T[et][ae],vt)}et<T.length-1&&(!R||0<yt&&!xt)&&(F+=ut)}}return F}function y(x,T){var R,F;return x==null?"":x.constructor===Date?JSON.stringify(x).slice(1,25):(F=!1,K&&typeof x=="string"&&K.test(x)&&(x="'"+x,F=!0),R=x.toString().replace(J,Pt),(F=F||G===!0||typeof G=="function"&&G(x,T)||Array.isArray(G)&&G[T]||((X,at)=>{for(var $=0;$<at.length;$++)if(-1<X.indexOf(at[$]))return!0;return!1})(R,p.BAD_DELIMITERS)||-1<R.indexOf(I)||R.charAt(0)===" "||R.charAt(R.length-1)===" ")?gt+R+gt:R)}},p.RECORD_SEP="",p.UNIT_SEP="",p.BYTE_ORDER_MARK="\uFEFF",p.BAD_DELIMITERS=["\r",`
`,'"',p.BYTE_ORDER_MARK],p.WORKERS_SUPPORTED=!f&&!!u.Worker,p.NODE_STREAM_INPUT=1,p.LocalChunkSize=10485760,p.RemoteChunkSize=5242880,p.DefaultDelimiter=",",p.Parser=ft,p.ParserHandle=Y,p.NetworkStreamer=v,p.FileStreamer=E,p.StringStreamer=q,p.ReadableStreamStreamer=Q,u.jQuery&&((d=u.jQuery).fn.parse=function(_){var w=_.config||{},G=[];return this.each(function(ut){if(!(d(this).prop("tagName").toUpperCase()==="INPUT"&&d(this).attr("type").toLowerCase()==="file"&&u.FileReader)||!this.files||this.files.length===0)return!0;for(var gt=0;gt<this.files.length;gt++)G.push({file:this.files[gt],inputElem:this,instanceConfig:d.extend({},w)})}),Z(),this;function Z(){if(G.length===0)V(_.complete)&&_.complete();else{var ut,gt,Pt,O,L=G[0];if(V(_.before)){var K=_.before(L.file,L.inputElem);if(typeof K=="object"){if(K.action==="abort")return ut="AbortError",gt=L.file,Pt=L.inputElem,O=K.reason,void(V(_.error)&&_.error({name:ut},gt,Pt,O));if(K.action==="skip")return void I();typeof K.config=="object"&&(L.instanceConfig=d.extend(L.instanceConfig,K.config))}else if(K==="skip")return void I()}var J=L.instanceConfig.complete;L.instanceConfig.complete=function(dt){V(J)&&J(dt,L.file,L.inputElem),I()},p.parse(L.file,L.instanceConfig)}}function I(){G.splice(0,1),Z()}}),g&&(u.onmessage=function(_){_=_.data,p.WORKER_ID===void 0&&_&&(p.WORKER_ID=_.workerId),typeof _.input=="string"?u.postMessage({workerId:p.WORKER_ID,results:p.parse(_.input,_.config),finished:!0}):(u.File&&_.input instanceof File||_.input instanceof Object)&&(_=p.parse(_.input,_.config))&&u.postMessage({workerId:p.WORKER_ID,results:_,finished:!0})}),(v.prototype=Object.create(b.prototype)).constructor=v,(E.prototype=Object.create(b.prototype)).constructor=E,(q.prototype=Object.create(q.prototype)).constructor=q,(Q.prototype=Object.create(b.prototype)).constructor=Q,p})})(Kr)),Kr.exports}var z0=R0();const O0=Dv(z0);function we(l){return{code:l.code,message:l.message,severity:"warning",row:l.row,column:l.column}}const Bu="Root";function ap(l){const i=[],o=vm(Bu);return l.forEach(d=>{let f=o;d.path.forEach(g=>{const C=g.trim();f.children.has(C)||f.children.set(C,vm(C)),f=f.children.get(C)}),f.magnitude+=d.magnitude,U0(f,d,i)}),{tree:lp(o),warnings:i}}function H0(l){const i=[];if(Array.isArray(l)){const u=l.map((d,f)=>qu(d,i,`root[${f}]`)).filter(d=>d!==null);return{tree:{name:Bu,magnitude:u.reduce((d,f)=>d+f.magnitude,0),children:u},warnings:i}}return{tree:qu(l,i,"root")??{name:Bu,magnitude:0,children:[]},warnings:i}}function vm(l){return{name:l,magnitude:0,children:new Map,url:null,description:null,attributes:{}}}function U0(l,i,o){i.url&&(l.url&&l.url!==i.url?o.push(we({code:"CONFLICTING_URL",message:`Multiple URL values found for path '${i.path.join("/")}'. Keeping first value.`,row:i.sourceRow,column:"url"})):l.url=i.url),i.description&&(l.description&&l.description!==i.description?o.push(we({code:"CONFLICTING_DESCRIPTION",message:`Multiple description values found for path '${i.path.join("/")}'. Keeping first value.`,row:i.sourceRow,column:"description"})):l.description=i.description);for(const[u,d]of Object.entries(i.attributes)){if(u.length===0)continue;const f=l.attributes[u];if(f&&f!==d){o.push(we({code:"CONFLICTING_ATTRIBUTE",message:`Multiple values for attribute '${u}' found at path '${i.path.join("/")}'. Keeping first value.`,row:i.sourceRow,column:u}));continue}l.attributes[u]=d}}function lp(l){const i=[...l.children.values()].map(f=>lp(f)),o=i.length>0,u=i.reduce((f,g)=>f+g.magnitude,0),d=l.magnitude+u;return{name:l.name,magnitude:d,children:o?i:void 0,url:l.url,description:l.description,attributes:Object.keys(l.attributes).length>0?l.attributes:void 0}}function qu(l,i,o){if(!l||typeof l!="object")return i.push(we({code:"INVALID_NODE",message:`Node at '${o}' is not an object and was skipped.`})),null;const u=l,d=String(u.name??"").trim(),f=d.length>0?d:"Unnamed";d.length===0&&i.push(we({code:"MISSING_NODE_NAME",message:`Node name missing at '${o}'. Using 'Unnamed'.`}));const C=(Array.isArray(u.children)?u.children:[]).map((v,E)=>qu(v,i,`${o}.children[${E}]`)).filter(v=>v!==null),A=u.magnitude,p=typeof A=="number"&&Number.isFinite(A)?A:null;if(C.length===0)return p===null||p<0?(i.push(we({code:"INVALID_LEAF_MAGNITUDE",message:`Leaf node '${f}' at '${o}' has invalid magnitude and was skipped.`,column:"magnitude"})),null):{name:f,magnitude:p,url:Fr(u.url),description:Fr(u.description),attributes:ym(u)};const b=C.reduce((v,E)=>v+E.magnitude,0);return p!==null&&p!==b&&i.push(we({code:"PARENT_MAGNITUDE_MISMATCH",message:`Parent node '${f}' at '${o}' has explicit magnitude ${p} but children sum to ${b}.`,column:"magnitude"})),{name:f,magnitude:b,children:C,url:Fr(u.url),description:Fr(u.description),attributes:ym(u),explicitMagnitude:p}}function Fr(l){if(typeof l!="string")return null;const i=l.trim();return i.length>0?i:null}function ym(l){const i=Object.fromEntries(Object.entries(l).filter(([o])=>!["name","magnitude","children","url","description"].includes(o)).filter(([,o])=>typeof o=="string"||typeof o=="number").map(([o,u])=>[o,String(u)]));return Object.keys(i).length>0?i:void 0}const bm=100,k0=["csv","tsv"];class G0{id="papaparse-delimited";supportedFormats=k0;async parse(i){const o=F0(i.parameters.format);return this.parseDelimited({...i,parameters:{...i.parameters,format:o}})}async parseDelimited(i){const o=[],u=P0(i.source.content,i.parameters.commentPrefix),d=V0(i.parameters),f=Y0(u.content,d,i.parameters),{parsed:g,hasHeaderRow:C}=f;g.errors.forEach(E=>{o.push(we({code:"PARSE_ERROR",message:E.message,row:Iu(u.sourceRows,C,E.row??0)}))});const A=g.data.filter(E=>E!=null),p=C?L0(A,u.sourceRows,i.parameters):B0(A,u.sourceRows,i.parameters),b=ap(p.rows);o.push(...p.warnings,...b.warnings),p.rows.length===0&&o.length===0&&o.push(we({code:"EMPTY_INPUT",message:"No usable rows found."}));const v=["sourceRow","magnitude","path","url","description",...p.attributeKeys];return{detectedFormat:i.parameters.format,normalizedRows:p.rows,preview:q0(v,p.rows),tree:b.tree,warnings:o}}}function P0(l,i){if(!i){const f=l.split(/\r?\n/).map((g,C)=>C+1);return{content:l,sourceRows:f}}const o=l.split(/\r?\n/),u=[],d=[];return o.forEach((f,g)=>{f.trimStart().startsWith(i)||(u.push(f),d.push(g+1))}),{content:u.join(`
`),sourceRows:d}}function L0(l,i,o){const u=[],d=[],f=new Set(o.attributeFields);return l.forEach((g,C)=>{const A=Iu(i,!0,C),p=Object.keys(g),b=ip(p,o),v=wa(g,b),E=Number(v),q=rp(g,p,o,b);if(!Number.isFinite(E)||E<0){d.push(we({code:"INVALID_MAGNITUDE",message:`Invalid magnitude '${v}'.`,row:A,column:b}));return}const Q=Object.fromEntries(o.attributeFields.map(Y=>[Y,wa(g,Y)]));u.push({rowId:`row-${A}`,sourceRow:A,magnitude:E,path:q,url:Zr(g,o.urlField),description:Zr(g,o.descriptionField),attributes:Q})}),{rows:u,warnings:d,attributeKeys:[...f]}}function B0(l,i,o){const u=[],d=[],f=l.reduce((A,p)=>Math.max(A,p.length),0),g=Array.from({length:f},(A,p)=>`col${p+1}`),C=new Set(o.attributeFields);return l.forEach((A,p)=>{const b=[...A];for(;b.length<f;)b.push("");const v=Iu(i,!1,p),E=Object.fromEntries(g.map((it,pt)=>[it,b[pt]??""])),q=ip(g,o),Q=wa(E,q),Y=Number(Q),nt=rp(E,g,o,q);if(!Number.isFinite(Y)||Y<0){u.push(we({code:"INVALID_MAGNITUDE",message:`Invalid magnitude '${Q}'.`,row:v,column:q}));return}const ft=Object.fromEntries(o.attributeFields.map(it=>[it,wa(E,it)]));d.push({rowId:`row-${v}`,sourceRow:v,magnitude:Y,path:nt,url:Zr(E,o.urlField),description:Zr(E,o.descriptionField),attributes:ft})}),{rows:d,warnings:u,attributeKeys:[...C]}}function q0(l,i){return{columns:l,rows:i.slice(0,bm),totalRows:i.length,truncated:i.length>bm}}function Iu(l,i,o){const u=i?o+1:o;return l[u]??o+1}function F0(l){return l==="tsv"?"tsv":"csv"}function V0(l){return l.delimiter.length>0?l.delimiter:l.format==="tsv"?"	":","}function Y0(l,i,o){const u=Sm(l,i,o.hasHeaderRow);return o.hasHeaderRow&&K0(u,o)?{parsed:Sm(l,i,!1),hasHeaderRow:!1}:{parsed:u,hasHeaderRow:o.hasHeaderRow}}function Sm(l,i,o){return O0.parse(l,{delimiter:i,header:o,skipEmptyLines:!1,transformHeader:u=>u.trim()})}function K0(l,i){const o=l.meta.fields?.map(d=>d.trim())??[];if(o.length===0||o.includes(i.magnitudeField))return!1;const u=o[0]??"";return u.length>0&&Number.isFinite(Number(u))}function ip(l,i){return l.includes(i.magnitudeField)?i.magnitudeField:l.includes("col1")?"col1":l[0]??i.magnitudeField}function rp(l,i,o,u){const d=o.pathFields.map(g=>wa(l,g).trim()).filter(g=>g.length>0);return d.length>0?d:i.filter(g=>X0(g,o,u)).map(g=>wa(l,g).trim()).filter(g=>g.length>0)}function X0(l,i,o){return!(l.length===0||l===o||i.pathFields.includes(l)||i.attributeFields.includes(l)||i.urlField&&l===i.urlField||i.descriptionField&&l===i.descriptionField)}function wa(l,i){const o=l[i];return typeof o!="string"?"":o.trim()}function Zr(l,i){if(!i)return null;const o=wa(l,i);return o.length>0?o:null}const Q0=["csv","tsv"],Z0=["json-hierarchy","json-flat"];function I0(l){return l.parameters.format!=="auto"?l.parameters.format:l.formatHint&&l.formatHint!=="auto"?l.formatHint:J0(l.source)}function J0(l){const i=eb(l.name);return i?i==="json-hierarchy"?sp(l.content):i:nb(l.content)}function $0(l){return Q0.includes(l)}function W0(l){return Z0.includes(l)}function tb(l,i){const o=l.format==="auto";return i==="tsv"?{...l,delimiter:"	",format:i}:i==="csv"?{...l,delimiter:o||l.delimiter.length===0?",":l.delimiter,format:i}:{...l,format:i}}function eb(l){const i=l.toLowerCase();if(i.endsWith(".tsv"))return"tsv";if(i.endsWith(".csv"))return"csv";if(i.endsWith(".json"))return"json-hierarchy"}function nb(l){const i=l.trim();return i.startsWith("{")||i.startsWith("[")?sp(l):"csv"}function sp(l){try{const i=JSON.parse(l);if(Array.isArray(i)){if(i.length===0)return"json-flat";const o=i[0];return o&&typeof o=="object"&&"path"in o?"json-flat":"json-hierarchy"}return"json-hierarchy"}catch{return"json-hierarchy"}}const xm=100,ab=["json-hierarchy","json-flat"];class lb{id="json-data-parser";supportedFormats=ab;async parse(i){return i.parameters.format==="json-flat"?this.parseFlatRowsJson(i):this.parseHierarchyJson(i)}async parseHierarchyJson(i){const o=[],u=Cm(i.source.content,o);if(u===null)return Tm("json-hierarchy",o);const d=H0(u);return o.push(...d.warnings),{detectedFormat:"json-hierarchy",normalizedRows:[],preview:{columns:[],rows:[],totalRows:0,truncated:!1},tree:d.tree,warnings:o}}async parseFlatRowsJson(i){const o=[],u=Cm(i.source.content,o);if(!Array.isArray(u))return o.push(we({code:"INVALID_JSON_FLAT_ROWS",message:"JSON flat-row format requires an array of row objects."})),Tm("json-flat",o);const d=[],f=new Set;u.forEach((C,A)=>{const p=A+1;if(!C||typeof C!="object"){o.push(we({code:"INVALID_ROW",message:"Row is not an object and was skipped.",row:p}));return}const b=C,v=Number(b.magnitude),E=ib(b.path);if(!Number.isFinite(v)||v<0){o.push(we({code:"INVALID_MAGNITUDE",message:`Invalid magnitude '${String(b.magnitude)}'.`,row:p,column:"magnitude"}));return}if(E.length===0){o.push(we({code:"MISSING_PATH",message:"Path is missing or empty after normalization.",row:p,column:"path"}));return}const q=rb(b);Object.keys(q).forEach(Q=>f.add(Q)),d.push({rowId:`row-${p}`,sourceRow:p,magnitude:v,path:E,url:Am(b.url),description:Am(b.description),attributes:q})});const g=ap(d);return o.push(...g.warnings),{detectedFormat:"json-flat",normalizedRows:d,preview:sb(d,f),tree:g.tree,warnings:o}}}function Cm(l,i){try{return JSON.parse(l)}catch(o){return i.push(we({code:"INVALID_JSON",message:`Unable to parse JSON: ${o.message}`})),null}}function ib(l){return Array.isArray(l)?l.map(i=>String(i).trim()).filter(i=>i.length>0):[]}function Am(l){if(typeof l!="string")return null;const i=l.trim();return i.length>0?i:null}function rb(l){return Object.fromEntries(Object.entries(l).filter(([i])=>!["magnitude","path","url","description"].includes(i)).filter(([,i])=>typeof i=="string"||typeof i=="number").map(([i,o])=>[i,String(o)]))}function sb(l,i){return{columns:["sourceRow","magnitude","path","url","description",...i],rows:l.slice(0,xm),totalRows:l.length,truncated:l.length>xm}}function Tm(l,i){return{detectedFormat:l,normalizedRows:[],preview:{columns:[],rows:[],totalRows:0,truncated:!1},tree:{name:"Root",magnitude:0,children:[]},warnings:i}}class ob{constructor(i){this.parsers=i}listParsers(){return this.parsers}getParser(i){return $0(i)?this.parsers.find(o=>o.supportedFormats.includes("csv")||o.supportedFormats.includes("tsv")):W0(i)?this.parsers.find(o=>o.supportedFormats.includes("json-hierarchy")||o.supportedFormats.includes("json-flat")):this.parsers.find(o=>o.supportedFormats.includes(i))}}function ub(){return new ob([new G0,new lb])}class cb{constructor(i){this.registry=i}async parse(i){const o=I0(i),u=this.registry.getParser(o);if(!u)throw new Error(`No parser registered for format '${o}'.`);return u.parse({...i,parameters:tb(i.parameters,o)})}}const db="jowna",fb=1,pn="projects",rn="datasets",Ir="jowna/settings",Jr="jowna/recent";function hb(l={}){const i=pb(l.indexedDbFactory);if(!i)return mb(l);const o=op(l.localStorageLike),u=l.now??(()=>new Date().toISOString()),d=l.createId??up,f=vb(i,l.dbName??db,l.dbVersion??fb),g={async listProjects(){const v=(await f).transaction(pn,"readonly"),E=v.objectStore(pn),q=await fi(E.getAll());return await ia(v),q},async getProject(b){const E=(await f).transaction(pn,"readonly"),q=E.objectStore(pn),Q=await fi(q.get(b));return await ia(E),Q},async saveProject(b){const E=(await f).transaction(pn,"readwrite");E.objectStore(pn).put(b),await ia(E)},async deleteProject(b){const E=(await f).transaction([pn,rn],"readwrite");E.objectStore(pn).delete(b);const q=E.objectStore(rn);(await fi(q.getAll())).filter(Y=>Y.projectId===b).forEach(Y=>{q.delete(Y.id)}),await ia(E)},async copyProject(b,v){const E=await g.getProject(b);if(!E)throw new Error(`Project '${b}' does not exist.`);const q=await C.listByProject(b),Q=d("project"),Y=u(),nt=new Map;E.datasetIds.forEach(pt=>{nt.set(pt,d("dataset"))}),q.forEach(pt=>{nt.has(pt.id)||nt.set(pt.id,d("dataset"))});const ft=q.map(pt=>({...pt,id:nt.get(pt.id),projectId:Q,createdAt:Y,updatedAt:Y}));for(const pt of ft)await C.saveDataset(pt);const it={...E,id:Q,name:v,createdAt:Y,updatedAt:Y,datasetIds:E.datasetIds.map(pt=>nt.get(pt)),activeDatasetId:E.activeDatasetId?nt.get(E.activeDatasetId)??null:null};return await g.saveProject(it),it}},C={async listByProject(b){const E=(await f).transaction(rn,"readonly"),q=E.objectStore(rn),Q=await fi(q.getAll());return await ia(E),Q.filter(Y=>Y.projectId===b)},async getDataset(b){const E=(await f).transaction(rn,"readonly"),q=E.objectStore(rn),Q=await fi(q.get(b));return await ia(E),Q},async saveDataset(b){const E=(await f).transaction(rn,"readwrite");E.objectStore(rn).put(b),await ia(E)},async deleteDataset(b){const E=(await f).transaction(rn,"readwrite");E.objectStore(rn).delete(b),await ia(E)}};return{projects:g,datasets:C,settings:{async loadSettings(){const b=o.getItem(Ir);if(b)try{return JSON.parse(b)}catch{return}},async saveSettings(b){o.setItem(Ir,JSON.stringify(b))}},recentProjects:{async listRecentProjectIds(){const b=o.getItem(Jr);if(!b)return[];try{return JSON.parse(b)}catch{return[]}},async saveRecentProjectIds(b){o.setItem(Jr,JSON.stringify(b))}}}}function mb(l){const i=new Map,o=new Map,u=op(l.localStorageLike),d=l.now??(()=>new Date().toISOString()),f=l.createId??up;return{projects:{async listProjects(){return[...i.values()]},async getProject(b){return i.get(b)},async saveProject(b){i.set(b.id,b)},async deleteProject(b){i.delete(b),[...o.values()].filter(v=>v.projectId===b).forEach(v=>o.delete(v.id))},async copyProject(b,v){const E=i.get(b);if(!E)throw new Error(`Project '${b}' does not exist.`);const q=[...o.values()].filter(it=>it.projectId===b),Q=f("project"),Y=d(),nt=new Map;E.datasetIds.forEach(it=>{nt.set(it,f("dataset"))}),q.forEach(it=>{nt.has(it.id)||nt.set(it.id,f("dataset"))}),q.forEach(it=>{o.set(nt.get(it.id),{...it,id:nt.get(it.id),projectId:Q,createdAt:Y,updatedAt:Y})});const ft={...E,id:Q,name:v,createdAt:Y,updatedAt:Y,datasetIds:E.datasetIds.map(it=>nt.get(it)),activeDatasetId:E.activeDatasetId?nt.get(E.activeDatasetId)??null:null};return i.set(ft.id,ft),ft}},datasets:{async listByProject(b){return[...o.values()].filter(v=>v.projectId===b)},async getDataset(b){return o.get(b)},async saveDataset(b){o.set(b.id,b)},async deleteDataset(b){o.delete(b)}},settings:{async loadSettings(){const b=u.getItem(Ir);if(b)try{return JSON.parse(b)}catch{return}},async saveSettings(b){u.setItem(Ir,JSON.stringify(b))}},recentProjects:{async listRecentProjectIds(){const b=u.getItem(Jr);if(!b)return[];try{return JSON.parse(b)}catch{return[]}},async saveRecentProjectIds(b){u.setItem(Jr,JSON.stringify(b))}}}}function pb(l){if(l)return l;if(typeof indexedDB<"u")return indexedDB}function op(l){return l||(typeof localStorage<"u"?localStorage:gb())}function gb(){const l=new Map;return{getItem(i){return l.get(i)??null},setItem(i,o){l.set(i,o)}}}function up(l){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?`${l}-${crypto.randomUUID()}`:`${l}-${Math.random().toString(36).slice(2,10)}`}function vb(l,i,o){return new Promise((u,d)=>{const f=l.open(i,o);f.onupgradeneeded=()=>{const g=f.result;g.objectStoreNames.contains(pn)||g.createObjectStore(pn,{keyPath:"id"}),g.objectStoreNames.contains(rn)||g.createObjectStore(rn,{keyPath:"id"})},f.onsuccess=()=>u(f.result),f.onerror=()=>d(f.error)})}function fi(l){return new Promise((i,o)=>{l.onsuccess=()=>i(l.result),l.onerror=()=>o(l.error)})}function ia(l){return new Promise((i,o)=>{l.oncomplete=()=>i(),l.onerror=()=>o(l.error),l.onabort=()=>o(l.error)})}const Fu="Imported Krona Project",Vu="Dataset",Nm=".krona";function yb(l){const i=xb(l.content),o=Cb(i);if(o.name!=="krona")throw new Error("Krona HTML XML root element must be <krona>.");const u=[],d=Tb(o,u),f=On(o,"node");if(f.length===0)throw new Error("Krona HTML contains no <node> elements.");const g=Nb(o),C=Mb(f,d),A=Math.max(g.length,C,1),b=_b(g,A,u).map((E,q)=>{const Q=[],Y=Eb({nodes:f,datasetIndex:q,magnitudeTag:d,warnings:Q}),nt=Db(Y);return(Y.children?.length??0)===0&&Y.magnitude<=0&&Q.push(Ai({code:"KRONA_EMPTY_DATASET",message:`Dataset '${E}' has no usable magnitudes.`})),{name:E,tree:Y,flatTable:nt,warnings:Q}}),v=[...u,...b.flatMap(E=>E.warnings)];return{projectName:zb(l.name),sourceFileName:l.name,datasets:b,warnings:v}}function bb(l){const i=l.createId("project"),o=Ti(l.nextProjectName??l.parsed.projectName,Fu),u=l.parsed.datasets.map(g=>{const C=l.createId("dataset");return{id:C,projectId:i,name:Ti(g.name,`${Vu} ${C}`),createdAt:l.nowIso,updatedAt:l.nowIso,tree:g.tree,sourceFileName:l.parsed.sourceFileName,flatTable:g.flatTable,importWarnings:g.warnings}}),d=u.map(g=>g.id);return{project:{id:i,name:o,createdAt:l.nowIso,updatedAt:l.nowIso,datasetIds:d,activeDatasetId:d[0]??null},datasets:u,warnings:l.parsed.warnings}}function Sb(l,i){const o=l.trim().toLowerCase();return o.endsWith(".krona.html")?!0:o.endsWith(".html")||o.endsWith(".htm")?/<krona\b/i.test(i):/<krona\b/i.test(i)}function xb(l){const i=l.match(/<krona\b[\s\S]*?<\/krona>/i);if(!i)throw new Error("No <krona> XML section found in file.");return i[0]}function Cb(l){const i={name:"#document",attributes:{},children:[]},o=[i];(l.match(/<[^>]+>|[^<]+/g)??[]).forEach(f=>{if(!f.startsWith("<")){const q=f.trim();q.length>0&&o[o.length-1]?.children.push(Ju(q));return}if(f.startsWith("<!--")||f.startsWith("<?")||f.startsWith("<!"))return;if(f.startsWith("</")){const q=f.slice(2,-1).trim().toLowerCase();for(;o.length>1&&o.pop()?.name!==q;);return}const g=f.endsWith("/>"),C=f.slice(1,g?-2:-1).trim(),A=C.match(/^([^\s/>]+)/);if(!A)return;const p=A[1].toLowerCase(),b=Ab(C.slice(A[1].length)),v={name:p,attributes:b,children:[]};o[o.length-1]?.children.push(v),g||o.push(v)});const d=i.children.find(f=>Xu(f));if(!d)throw new Error("Unable to parse Krona XML.");return d}function Ab(l){const i={},o=/([^\s=/>]+)\s*=\s*("([^"]*)"|'([^']*)')/g;let u=o.exec(l);for(;u;){const d=u[1]?.toLowerCase(),f=u[3]??u[4]??"";d&&(i[d]=Ju(f)),u=o.exec(l)}return i}function Tb(l,i){const u=On(l,"attributes")[0]?.attributes.magnitude?.trim().toLowerCase();return u&&u.length>0?u:(i.push(Ai({code:"KRONA_MISSING_MAGNITUDE_ATTRIBUTE",message:"Missing attributes magnitude declaration. Falling back to 'magnitude'.",column:"attributes.magnitude"})),"magnitude")}function Nb(l){const i=On(l,"datasets")[0];return i?On(i,"dataset").map(o=>Ku(o).trim()).filter(o=>o.length>0):[]}function _b(l,i,o){if(i<=0)return[];const u=[...l];for(;u.length<i;){const d=`${Vu} ${u.length+1}`;o.push(Ai({code:"KRONA_DATASET_NAME_MISSING",message:`Dataset name missing at index ${u.length}. Using '${d}'.`})),u.push(d)}return u.map((d,f)=>Ti(d,`${Vu} ${f+1}`))}function Eb(l){if(l.nodes.length===1)return Yu(l.nodes[0],l.datasetIndex,l.magnitudeTag,l.warnings,[]);const i=l.nodes.map(u=>Yu(u,l.datasetIndex,l.magnitudeTag,l.warnings,[]));return{name:"Root",magnitude:i.reduce((u,d)=>u+$r(d.magnitude),0),children:i}}function Yu(l,i,o,u,d){const f=(l.attributes.name??"").trim(),g=Ti(f,"Unnamed"),C=[...d,g];f.length===0&&u.push(Ai({code:"KRONA_MISSING_NODE_NAME",message:`Node name missing at path '${d.join("/")||"root"}'. Using 'Unnamed'.`}));const A=On(l,"node").map(Y=>Yu(Y,i,o,u,C)),p=cp(l,o,i),b=Rb(p),v=jb(b),E=A.reduce((Y,nt)=>Y+$r(nt.magnitude),0);b!==null&&v===null&&u.push(Ai({code:"KRONA_INVALID_MAGNITUDE",message:`Invalid magnitude '${b}' at path '${C.join("/")}'.`,column:o}));const q=wb(l,i,o);return{name:g,magnitude:$r(v??E),children:A.length>0?A:void 0,attributes:Object.keys(q).length>0?q:void 0,explicitMagnitude:v}}function wb(l,i,o){const u={};return On(l).forEach(d=>{if(d.name==="node"||d.name===o)return;const f=cp(l,d.name,i);f===null||f.trim().length===0||(u[d.name]=f.trim())}),u}function Mb(l,i){let o=0;const u=d=>{const f=dp(d,i);o=Math.max(o,f.length),On(d,"node").forEach(g=>u(g))};return l.forEach(d=>u(d)),o}function cp(l,i,o){const u=dp(l,i);return u.length===0?null:o<u.length?u[o]??null:u[u.length-1]??null}function dp(l,i){const o=On(l,i)[0];if(!o)return[];const u=On(o,"val");if(u.length>0)return u.map(f=>Ku(f));const d=Ku(o);return d.length>0?[d]:[]}function Db(l){const i=[];let o=0;const u=(d,f)=>{const g=[...f,d.name],C=d.children??[];if(C.length===0){const A=$r(d.magnitude);if(A<=0)return;o+=1,i.push({rowId:`row-${o}`,sourceRow:o,magnitude:A,path:g,url:null,description:null,attributes:d.attributes??{}});return}C.forEach(A=>u(A,g))};return u(l,[]),i}function Ku(l){const i=[],o=u=>{if(typeof u=="string"){i.push(u);return}u.children.forEach(d=>o(d))};return l.children.forEach(u=>o(u)),i.join(" ").replace(/\s+/g," ").trim()}function On(l,i){if(!i)return l.children.filter(u=>Xu(u));const o=i.toLowerCase();return l.children.filter(u=>Xu(u)&&u.name===o)}function Ai(l){return{code:l.code,message:l.message,severity:"warning",row:l.row,column:l.column}}function $r(l){return!Number.isFinite(l)||l<0?0:l}function jb(l){if(l===null)return null;const i=Number(l);return!Number.isFinite(i)||i<0?null:i}function Rb(l){if(l===null)return null;const i=l.trim();return i.length>0?i:null}function Ti(l,i){const o=Ju(l).trim();return o.length>0?o:i}function zb(l){const i=l.trim();if(i.length===0)return Fu;const o=i.replace(/\.[^.]+$/,""),u=o.toLowerCase().endsWith(Nm)?o.slice(0,-Nm.length):o;return Ti(u,Fu)}function Xu(l){return typeof l!="string"}function Ju(l){return l.replace(/&#x([0-9a-fA-F]+);/g,(i,o)=>_m(parseInt(o,16))).replace(/&#([0-9]+);/g,(i,o)=>_m(parseInt(o,10))).replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'")}function _m(l){if(!Number.isInteger(l)||l<0)return"";try{return String.fromCodePoint(l)}catch{return""}}const fp="jowna.project",hp=1,mp="1.0.0",Ob=".jowna",Hb="application/x-jowna+json";function Ub(l){return{format:fp,version:hp,schemaVersion:mp,exportedAt:l.exportedAt,project:l.project,datasets:l.datasets}}function kb(l){return JSON.stringify(l,null,2)}function Gb(l){let i;try{i=JSON.parse(l)}catch{throw new Error("Invalid project archive file.")}if(!Fb(i))throw new Error("Invalid project archive file.");const o=i.version;if(o!==hp)throw new Error(`Unsupported project archive version '${o}'.`);return{...i,schemaVersion:i.schemaVersion&&typeof i.schemaVersion=="string"?i.schemaVersion:mp}}function Pb(l){const i=l.createId("project"),o=new Map,u=new Map(l.archive.datasets.map(v=>[v.id,v]));l.archive.project.datasetIds.forEach(v=>{o.has(v)||o.set(v,l.createId("dataset"))}),l.archive.datasets.forEach(v=>{o.has(v.id)||o.set(v.id,l.createId("dataset"))});const f=qb([...l.archive.project.datasetIds,...l.archive.datasets.map(v=>v.id)]).filter(v=>u.has(v)).map(v=>({...u.get(v),id:o.get(v),projectId:i,createdAt:l.nowIso,updatedAt:l.nowIso})),g=Bb(l.nextName??l.archive.project.name,"Imported Project"),C=f.map(v=>v.id),A=l.archive.project.activeDatasetId?o.get(l.archive.project.activeDatasetId)??null:null,p=A&&C.includes(A)?A:C[0]??null;return{project:{...l.archive.project,id:i,name:g,createdAt:l.nowIso,updatedAt:l.nowIso,datasetIds:C,activeDatasetId:p},datasets:f}}function Lb(l){const i=l.trim().replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return`${i.length>0?i:"project"}${Ob}`}function Bb(l,i){const o=l.trim();return o.length>0?o:i}function qb(l){return[...new Set(l)]}function Wr(l){return typeof l=="object"&&l!==null}function Fb(l){return!Wr(l)||l.format!==fp||typeof l.version!="number"||!Number.isInteger(l.version)||typeof l.exportedAt!="string"||!Vb(l.project)||!Array.isArray(l.datasets)?!1:l.datasets.every(i=>Yb(i))}function Vb(l){return!(!Wr(l)||typeof l.id!="string"||typeof l.name!="string"||typeof l.createdAt!="string"||typeof l.updatedAt!="string"||!Array.isArray(l.datasetIds)||!l.datasetIds.every(i=>typeof i=="string")||l.activeDatasetId!==null&&typeof l.activeDatasetId!="string")}function Yb(l){return!(!Wr(l)||typeof l.id!="string"||typeof l.projectId!="string"||typeof l.name!="string"||typeof l.createdAt!="string"||typeof l.updatedAt!="string"||!Wr(l.tree)||typeof l.tree.name!="string"||typeof l.tree.magnitude!="number")}let Em=!1;function Kb(){if(Em)return;Em=!0;const l=hb(),i=new cb(ub()),o=new ep,u=Jt(Tu,{initial:Tu.defaultValue??"selection",handleGrip:py}),d=Jt(mi,{initial:mi.defaultValue??[],handleGrip:gy}),f=Jt(pi,{initial:pi.defaultValue??null,handleGrip:vy}),g=Jt(gi,{initial:gi.defaultValue??[],handleGrip:yy}),C=Jt(vi,{initial:vi.defaultValue??null,handleGrip:by}),A=Jt(_u,{initial:_u.defaultValue??null,handleGrip:Lm}),p=Jt(Eu,{initial:Eu.defaultValue??"",handleGrip:Bm}),b=Jt(wu,{initial:wu.defaultValue??Ci,handleGrip:qm}),v=Jt(om,{initial:om.defaultValue??null,handleGrip:Sy}),E=Jt(um,{initial:um.defaultValue??[],handleGrip:xy}),q=Jt(cm,{initial:cm.defaultValue??null,handleGrip:Cy}),Q=Jt(Mu,{initial:Mu.defaultValue??null,handleGrip:Ay}),Y=Jt(Du,{initial:Du.defaultValue??[],handleGrip:Ty}),nt=Jt(ju,{initial:ju.defaultValue??null,handleGrip:Ny}),ft=Jt(Ru,{initial:Ru.defaultValue??!1,handleGrip:_y}),it=Jt(zu,{initial:zu.defaultValue??!1,handleGrip:Ey}),pt=Jt(Ou,{initial:Ou.defaultValue??"",handleGrip:Fm}),Ot=Jt(Uu,{initial:Uu.defaultValue??!1,handleGrip:Ym}),$t=Jt(Hu,{initial:Hu.defaultValue??"",handleGrip:Vm}),Nt=Jt(Nu,{initial:Nu.defaultValue??"",handleGrip:Pm}),V=Jt(pl,{initial:pl.defaultValue??_a,handleGrip:Km});let _=ra(pl.defaultValue??_a);const w=Jt(bi,{initial:bi.defaultValue??null,handleGrip:wy}),G=Jt(ku,{initial:ku.defaultValue??null,handleGrip:My}),Z=Jt(Gu,{initial:Gu.defaultValue??null,handleGrip:Dy}),I=Jt(gl,{initial:gl.defaultValue??6,handleGrip:Xm}),ut=Jt(Pu,{initial:Pu.defaultValue??[],handleGrip:jy}),gt=Jt(Lu,{initial:Lu.defaultValue??-1,handleGrip:Ry});Au([u,d,f,g,C,A,p,b,v,E,q,Q,Y,nt,ft,it,pt,Ot,$t,Nt,V,w,G,Z,I,ut,gt]);const Pt=Br({provides:[sm],homeParamGrips:[mi,pi],compute:({getHomeParam:x})=>{const T=x(mi)??[],R=x(pi)??null,F=T.find(X=>X.id===R)??null;return new Map([[sm,F]])}}),O=Br({provides:[yi],homeParamGrips:[gi,vi],compute:({getHomeParam:x})=>{const T=x(gi)??[],R=x(vi)??null,F=T.find(X=>X.id===R)??null;return new Map([[yi,F]])}}),L=Br({provides:[Yr],homeParamGrips:[yi,pl,bi,gl],compute:({getHomeParam:x})=>{const T=x(yi)??null,R=x(pl),F=x(bi)??null,X=x(gl)??0;if(!T||!R)return new Map([[Yr,null]]);const at=o.computeLayout({root:T.tree,settings:R,focusedPath:F,depthLimit:X<=0?null:X});return new Map([[Yr,at]])}});Au([Pt,O,L]);const K={refreshProjects:async()=>{const x=Xb(await l.projects.listProjects());d.set(x);const T=f.get(),R=T&&x.some(F=>F.id===T)?T:x[0]?.id??null;f.set(R),R?await y(R):(g.set([]),C.set(null),V.set(ra(_)),Ot.set(!0))},createProject:async x=>{const T=hi(x,"Untitled Project"),R=ml(),F={id:Vr("project"),name:T,createdAt:R,updatedAt:R,datasetIds:[],activeDatasetId:null,chartSettings:ra(V.get()??_)};await l.projects.saveProject(F),await K.refreshProjects(),await K.openProject(F.id),Nt.set("")},copyProject:async(x,T)=>{const R=await l.projects.getProject(x),F=hi(T??`${R?.name??"Project"} Copy`,"Project Copy"),X=await l.projects.copyProject(x,F);await K.refreshProjects(),await K.openProject(X.id)},deleteProject:async x=>{await l.projects.deleteProject(x),await K.refreshProjects()},renameProject:async(x,T)=>{const R=await l.projects.getProject(x);if(!R)throw new Error(`Project '${x}' no longer exists.`);const F=hi(T,R.name);F!==R.name&&(await l.projects.saveProject({...R,name:F}),await K.refreshProjects())},exportProjectArchive:async x=>{const T=await l.projects.getProject(x);if(!T)throw new Error(`Project '${x}' no longer exists.`);const R=await l.datasets.listByProject(x),F=new Map(R.map(yt=>[yt.id,yt])),at=wm([...T.datasetIds,...R.map(yt=>yt.id)]).map(yt=>F.get(yt)).filter(yt=>!!yt),$=Ub({project:T,datasets:at,exportedAt:ml()}),et=kb($);Jb(Lb(T.name),et,Hb)},importProjectArchive:async x=>{const T=await x.text(),R=async()=>{const X=Gb(T),at=ml(),$=Pb({archive:X,nowIso:at,createId:Vr});for(const et of $.datasets)await l.datasets.saveDataset(et);return await l.projects.saveProject($.project),await K.refreshProjects(),await K.openProject($.project.id),{mode:"archive",projectName:$.project.name,datasetCount:$.datasets.length,warnings:[]}},F=async()=>{const X=yb({name:x.name,content:T}),at=ml(),$=bb({parsed:X,nowIso:at,createId:Vr});for(const et of $.datasets)await l.datasets.saveDataset(et);return await l.projects.saveProject($.project),await K.refreshProjects(),await K.openProject($.project.id),{mode:"krona-html",projectName:$.project.name,datasetCount:$.datasets.length,warnings:$.warnings}};if(Sb(x.name,T))try{return await F()}catch(X){try{return await R()}catch{throw X}}try{return await R()}catch(X){try{return await F()}catch(at){throw new Error(`Unsupported import file. Archive parse failed: ${Dm(X)}. Krona HTML parse failed: ${Dm(at)}.`)}}},renameDataset:async(x,T)=>{const R=await l.datasets.getDataset(x);if(!R)throw new Error(`Dataset '${x}' no longer exists.`);const F=hi(T,R.name);F!==R.name&&(await l.datasets.saveDataset({...R,name:F}),await K.refreshProjects())},openProject:async x=>{f.set(x),await y(x),u.set("selection")},parsePreview:async()=>{const x=A.get(),T=b.get()??Ci;if(!x||x.content.trim().length===0){nt.set("Select a source file or URL before parsing."),Q.set(null),Y.set([]),it.set(!1);return}ft.set(!0),nt.set(null);try{const R=await i.parse({source:x,parameters:T});v.set(R.detectedFormat),E.set(R.normalizedRows),q.set(R.tree),Q.set(R.preview),Y.set(R.warnings);const F=R.normalizedRows.length>0||R.tree.magnitude>0||(R.tree.children?.length??0)>0;it.set(F),nt.set(F?null:"No usable rows found.")}catch(R){v.set(null),E.set([]),q.set(null),Q.set(null),Y.set([]),it.set(!1),nt.set(R.message)}finally{ft.set(!1)}},applyImport:async x=>{const T=f.get(),R=q.get(),F=E.get()??[],X=Y.get()??[],at=A.get(),$=v.get()??void 0;if(!T)throw new Error("Select or create a project before applying import.");if(!R)throw new Error("Parse preview before applying import.");const et=ml(),yt=hi(x,"Imported Dataset"),ht={id:Vr("dataset"),projectId:T,name:yt,createdAt:et,updatedAt:et,tree:R,sourceFileName:at?.name,sourceFormat:$,flatTable:F,importWarnings:X};await l.datasets.saveDataset(ht);const xt=await l.projects.getProject(T);if(!xt)throw new Error(`Project '${T}' no longer exists.`);const Vt={...xt,datasetIds:wm([...xt.datasetIds,ht.id]),activeDatasetId:ht.id,updatedAt:et};await l.projects.saveProject(Vt),await K.refreshProjects(),await K.openChart(ht.id),pt.set(yt),Ot.set(!1)},openChart:x=>{const T=x??C.get();if(T){C.set(T);const F=(g.get()??[]).find(X=>X.id===T)??null;F&&I.set(Ib(F.tree))}u.set("chart")},setProjectChartSettings:async x=>{const T=f.get();if(V.set(ra(x)),!T)return;const R=await l.projects.getProject(T);R&&(await l.projects.saveProject({...R,chartSettings:ra(x)}),d.update(F=>F.map(X=>X.id===T?{...X,chartSettings:ra(x)}:X)))},backToSelection:()=>{u.set("selection")},focusPath:x=>{const T=Mm(x);if(T.length===0)return;const R=C.get(),F=(g.get()??[]).find(et=>et.id===R)??null;if(F&&!Zb(F.tree,T))return;w.set(T),G.set(T),Z.set(null);const X=ut.get()??[],at=gt.get()??-1,$=[...X.slice(0,at+1),T];ut.set($),gt.set($.length-1)},hoverPath:x=>{Z.set(x?Mm(x):null)},goBack:()=>{const x=ut.get()??[],T=gt.get()??-1;if(T<=0)return;const R=T-1;gt.set(R);const F=x[R]??null;w.set(F),G.set(F),Z.set(null)},goForward:()=>{const x=ut.get()??[],T=gt.get()??-1;if(T>=x.length-1)return;const R=T+1;gt.set(R);const F=x[R]??null;w.set(F),G.set(F),Z.set(null)},clearFocus:()=>{w.set(null),G.set(null),Z.set(null),ut.set([]),gt.set(-1)}},J=Br({provides:[Xr],compute:()=>new Map([[Xr,K]])});Au([J]),dt();async function dt(){const x=await l.settings.loadSettings();x?.chart?(_=ra(x.chart),V.set(_)):await l.settings.saveSettings({chart:V.get()??_a,app:{defaultFormat:"tsv",autoSaveLastProject:!0,savedProjectSort:"updated-desc"}}),await K.refreshProjects()}async function y(x){const T=Qb(await l.datasets.listByProject(x));g.set(T),T.length===0&&Ot.set(!0);const R=await l.projects.getProject(x),F=R?.chartSettings??_;V.set(ra(F));const X=R?.activeDatasetId??null,at=X&&T.some($=>$.id===X)?X:T[0]?.id??null;C.set(at),R&&R.activeDatasetId!==at&&await l.projects.saveProject({...R,activeDatasetId:at,updatedAt:ml()})}}function Au(l){l.forEach(i=>{Zu.registerTap(i)})}function Vr(l){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?`${l}-${crypto.randomUUID()}`:`${l}-${Math.random().toString(36).slice(2,10)}`}function ml(){return new Date().toISOString()}function Xb(l){return[...l].sort((i,o)=>o.updatedAt.localeCompare(i.updatedAt))}function Qb(l){return[...l].sort((i,o)=>o.updatedAt.localeCompare(i.updatedAt))}function wm(l){return[...new Set(l)]}function hi(l,i){const o=l.trim();return o.length>0?o:i}function Mm(l){return l.map(i=>i.trim()).filter(i=>i.length>0)}function Zb(l,i){if(i.length===0||i[0]!==l.name)return!1;let o=l;for(let u=1;u<i.length;u+=1){const d=o.children?.find(f=>f.name===i[u]);if(!d)return!1;o=d}return!0}function ra(l){return{...l,colorScheme:Array.isArray(l.colorScheme)?[...l.colorScheme]:l.colorScheme}}function Ib(l){return pp(l,0)}function pp(l,i){const o=l.children??[];if(o.length===0)return i;let u=i;for(const d of o){const f=pp(d,i+1);f>u&&(u=f)}return u}function Dm(l){return l instanceof Error&&l.message.trim().length>0?l.message:"Unknown error"}function Jb(l,i,o){const u=new Blob([i],{type:o}),d=URL.createObjectURL(u),f=document.createElement("a");f.href=d,f.download=l,f.rel="noopener",f.click(),URL.revokeObjectURL(d)}Kb();const gp=document.getElementById("root");if(!gp)throw new Error("Expected #root element for Jowna bootstrap.");Pv.createRoot(gp).render(m.jsx(zt.StrictMode,{children:m.jsx(dy,{grok:Zu,context:my,children:m.jsx(D0,{})})}));
