(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))o(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const v of f.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&o(v)}).observe(document,{childList:!0,subtree:!0});function u(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function o(d){if(d.ep)return;d.ep=!0;const f=u(d);fetch(d.href,f)}})();function wv(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var ho={exports:{}},di={};var Qh;function Mv(){if(Qh)return di;Qh=1;var l=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function u(o,d,f){var v=null;if(f!==void 0&&(v=""+f),d.key!==void 0&&(v=""+d.key),"key"in d){f={};for(var A in d)A!=="key"&&(f[A]=d[A])}else f=d;return d=f.ref,{$$typeof:l,type:o,key:v,ref:d!==void 0?d:null,props:f}}return di.Fragment=r,di.jsx=u,di.jsxs=u,di}var Zh;function Dv(){return Zh||(Zh=1,ho.exports=Mv()),ho.exports}var m=Dv(),mo={exports:{}},St={};var Ih;function jv(){if(Ih)return St;Ih=1;var l=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),u=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),v=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),C=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),N=Symbol.iterator;function Y(y){return y===null||typeof y!="object"?null:(y=N&&y[N]||y["@@iterator"],typeof y=="function"?y:null)}var I={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},X=Object.assign,at={};function mt(y,x,T){this.props=y,this.context=x,this.refs=at,this.updater=T||I}mt.prototype.isReactComponent={},mt.prototype.setState=function(y,x){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,x,"setState")},mt.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};function ot(){}ot.prototype=mt.prototype;function gt(y,x,T){this.props=y,this.context=x,this.refs=at,this.updater=T||I}var Ht=gt.prototype=new ot;Ht.constructor=gt,X(Ht,mt.prototype),Ht.isPureReactComponent=!0;var te=Array.isArray;function Et(){}var k={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function w(y,x,T){var R=T.ref;return{$$typeof:l,type:y,key:x,ref:R!==void 0?R:null,props:T}}function P(y,x){return w(y.type,x,y.props)}function $(y){return typeof y=="object"&&y!==null&&y.$$typeof===l}function J(y){var x={"=":"=0",":":"=2"};return"$"+y.replace(/[=:]/g,function(T){return x[T]})}var dt=/\/+/g;function vt(y,x){return typeof y=="object"&&y!==null&&y.key!=null?J(""+y.key):x.toString(36)}function qt(y){switch(y.status){case"fulfilled":return y.value;case"rejected":throw y.reason;default:switch(typeof y.status=="string"?y.then(Et,Et):(y.status="pending",y.then(function(x){y.status==="pending"&&(y.status="fulfilled",y.value=x)},function(x){y.status==="pending"&&(y.status="rejected",y.reason=x)})),y.status){case"fulfilled":return y.value;case"rejected":throw y.reason}}throw y}function O(y,x,T,R,F){var Q=typeof y;(Q==="undefined"||Q==="boolean")&&(y=null);var lt=!1;if(y===null)lt=!0;else switch(Q){case"bigint":case"string":case"number":lt=!0;break;case"object":switch(y.$$typeof){case l:case r:lt=!0;break;case b:return lt=y._init,O(lt(y._payload),x,T,R,F)}}if(lt)return F=F(y),lt=R===""?"."+vt(y,0):R,te(F)?(T="",lt!=null&&(T=lt.replace(dt,"$&/")+"/"),O(F,x,T,"",function(bt){return bt})):F!=null&&($(F)&&(F=P(F,T+(F.key==null||y&&y.key===F.key?"":(""+F.key).replace(dt,"$&/")+"/")+lt)),x.push(F)),1;lt=0;var W=R===""?".":R+":";if(te(y))for(var nt=0;nt<y.length;nt++)R=y[nt],Q=W+vt(R,nt),lt+=O(R,x,T,Q,F);else if(nt=Y(y),typeof nt=="function")for(y=nt.call(y),nt=0;!(R=y.next()).done;)R=R.value,Q=W+vt(R,nt++),lt+=O(R,x,T,Q,F);else if(Q==="object"){if(typeof y.then=="function")return O(qt(y),x,T,R,F);throw x=String(y),Error("Objects are not valid as a React child (found: "+(x==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":x)+"). If you meant to render a collection of children, use an array instead.")}return lt}function B(y,x,T){if(y==null)return y;var R=[],F=0;return O(y,R,"","",function(Q){return x.call(T,Q,F++)}),R}function K(y){if(y._status===-1){var x=y._result;x=x(),x.then(function(T){(y._status===0||y._status===-1)&&(y._status=1,y._result=T)},function(T){(y._status===0||y._status===-1)&&(y._status=2,y._result=T)}),y._status===-1&&(y._status=0,y._result=x)}if(y._status===1)return y._result.default;throw y._result}var Z=typeof reportError=="function"?reportError:function(y){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var x=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof y=="object"&&y!==null&&typeof y.message=="string"?String(y.message):String(y),error:y});if(!window.dispatchEvent(x))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",y);return}console.error(y)},rt={map:B,forEach:function(y,x,T){B(y,function(){x.apply(this,arguments)},T)},count:function(y){var x=0;return B(y,function(){x++}),x},toArray:function(y){return B(y,function(x){return x})||[]},only:function(y){if(!$(y))throw Error("React.Children.only expected to receive a single React element child.");return y}};return St.Activity=g,St.Children=rt,St.Component=mt,St.Fragment=u,St.Profiler=d,St.PureComponent=gt,St.StrictMode=o,St.Suspense=C,St.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,St.__COMPILER_RUNTIME={__proto__:null,c:function(y){return k.H.useMemoCache(y)}},St.cache=function(y){return function(){return y.apply(null,arguments)}},St.cacheSignal=function(){return null},St.cloneElement=function(y,x,T){if(y==null)throw Error("The argument must be a React element, but you passed "+y+".");var R=X({},y.props),F=y.key;if(x!=null)for(Q in x.key!==void 0&&(F=""+x.key),x)!E.call(x,Q)||Q==="key"||Q==="__self"||Q==="__source"||Q==="ref"&&x.ref===void 0||(R[Q]=x[Q]);var Q=arguments.length-2;if(Q===1)R.children=T;else if(1<Q){for(var lt=Array(Q),W=0;W<Q;W++)lt[W]=arguments[W+2];R.children=lt}return w(y.type,F,R)},St.createContext=function(y){return y={$$typeof:v,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null},y.Provider=y,y.Consumer={$$typeof:f,_context:y},y},St.createElement=function(y,x,T){var R,F={},Q=null;if(x!=null)for(R in x.key!==void 0&&(Q=""+x.key),x)E.call(x,R)&&R!=="key"&&R!=="__self"&&R!=="__source"&&(F[R]=x[R]);var lt=arguments.length-2;if(lt===1)F.children=T;else if(1<lt){for(var W=Array(lt),nt=0;nt<lt;nt++)W[nt]=arguments[nt+2];F.children=W}if(y&&y.defaultProps)for(R in lt=y.defaultProps,lt)F[R]===void 0&&(F[R]=lt[R]);return w(y,Q,F)},St.createRef=function(){return{current:null}},St.forwardRef=function(y){return{$$typeof:A,render:y}},St.isValidElement=$,St.lazy=function(y){return{$$typeof:b,_payload:{_status:-1,_result:y},_init:K}},St.memo=function(y,x){return{$$typeof:p,type:y,compare:x===void 0?null:x}},St.startTransition=function(y){var x=k.T,T={};k.T=T;try{var R=y(),F=k.S;F!==null&&F(T,R),typeof R=="object"&&R!==null&&typeof R.then=="function"&&R.then(Et,Z)}catch(Q){Z(Q)}finally{x!==null&&T.types!==null&&(x.types=T.types),k.T=x}},St.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},St.use=function(y){return k.H.use(y)},St.useActionState=function(y,x,T){return k.H.useActionState(y,x,T)},St.useCallback=function(y,x){return k.H.useCallback(y,x)},St.useContext=function(y){return k.H.useContext(y)},St.useDebugValue=function(){},St.useDeferredValue=function(y,x){return k.H.useDeferredValue(y,x)},St.useEffect=function(y,x){return k.H.useEffect(y,x)},St.useEffectEvent=function(y){return k.H.useEffectEvent(y)},St.useId=function(){return k.H.useId()},St.useImperativeHandle=function(y,x,T){return k.H.useImperativeHandle(y,x,T)},St.useInsertionEffect=function(y,x){return k.H.useInsertionEffect(y,x)},St.useLayoutEffect=function(y,x){return k.H.useLayoutEffect(y,x)},St.useMemo=function(y,x){return k.H.useMemo(y,x)},St.useOptimistic=function(y,x){return k.H.useOptimistic(y,x)},St.useReducer=function(y,x,T){return k.H.useReducer(y,x,T)},St.useRef=function(y){return k.H.useRef(y)},St.useState=function(y){return k.H.useState(y)},St.useSyncExternalStore=function(y,x,T){return k.H.useSyncExternalStore(y,x,T)},St.useTransition=function(){return k.H.useTransition()},St.version="19.2.4",St}var Jh;function Xo(){return Jh||(Jh=1,mo.exports=jv()),mo.exports}var Lt=Xo(),po={exports:{}},fi={},go={exports:{}},vo={};var $h;function Rv(){return $h||($h=1,(function(l){function r(O,B){var K=O.length;O.push(B);t:for(;0<K;){var Z=K-1>>>1,rt=O[Z];if(0<d(rt,B))O[Z]=B,O[K]=rt,K=Z;else break t}}function u(O){return O.length===0?null:O[0]}function o(O){if(O.length===0)return null;var B=O[0],K=O.pop();if(K!==B){O[0]=K;t:for(var Z=0,rt=O.length,y=rt>>>1;Z<y;){var x=2*(Z+1)-1,T=O[x],R=x+1,F=O[R];if(0>d(T,K))R<rt&&0>d(F,T)?(O[Z]=F,O[R]=K,Z=R):(O[Z]=T,O[x]=K,Z=x);else if(R<rt&&0>d(F,K))O[Z]=F,O[R]=K,Z=R;else break t}}return B}function d(O,B){var K=O.sortIndex-B.sortIndex;return K!==0?K:O.id-B.id}if(l.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;l.unstable_now=function(){return f.now()}}else{var v=Date,A=v.now();l.unstable_now=function(){return v.now()-A}}var C=[],p=[],b=1,g=null,N=3,Y=!1,I=!1,X=!1,at=!1,mt=typeof setTimeout=="function"?setTimeout:null,ot=typeof clearTimeout=="function"?clearTimeout:null,gt=typeof setImmediate<"u"?setImmediate:null;function Ht(O){for(var B=u(p);B!==null;){if(B.callback===null)o(p);else if(B.startTime<=O)o(p),B.sortIndex=B.expirationTime,r(C,B);else break;B=u(p)}}function te(O){if(X=!1,Ht(O),!I)if(u(C)!==null)I=!0,Et||(Et=!0,J());else{var B=u(p);B!==null&&qt(te,B.startTime-O)}}var Et=!1,k=-1,E=5,w=-1;function P(){return at?!0:!(l.unstable_now()-w<E)}function $(){if(at=!1,Et){var O=l.unstable_now();w=O;var B=!0;try{t:{I=!1,X&&(X=!1,ot(k),k=-1),Y=!0;var K=N;try{e:{for(Ht(O),g=u(C);g!==null&&!(g.expirationTime>O&&P());){var Z=g.callback;if(typeof Z=="function"){g.callback=null,N=g.priorityLevel;var rt=Z(g.expirationTime<=O);if(O=l.unstable_now(),typeof rt=="function"){g.callback=rt,Ht(O),B=!0;break e}g===u(C)&&o(C),Ht(O)}else o(C);g=u(C)}if(g!==null)B=!0;else{var y=u(p);y!==null&&qt(te,y.startTime-O),B=!1}}break t}finally{g=null,N=K,Y=!1}B=void 0}}finally{B?J():Et=!1}}}var J;if(typeof gt=="function")J=function(){gt($)};else if(typeof MessageChannel<"u"){var dt=new MessageChannel,vt=dt.port2;dt.port1.onmessage=$,J=function(){vt.postMessage(null)}}else J=function(){mt($,0)};function qt(O,B){k=mt(function(){O(l.unstable_now())},B)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(O){O.callback=null},l.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<O?Math.floor(1e3/O):5},l.unstable_getCurrentPriorityLevel=function(){return N},l.unstable_next=function(O){switch(N){case 1:case 2:case 3:var B=3;break;default:B=N}var K=N;N=B;try{return O()}finally{N=K}},l.unstable_requestPaint=function(){at=!0},l.unstable_runWithPriority=function(O,B){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var K=N;N=O;try{return B()}finally{N=K}},l.unstable_scheduleCallback=function(O,B,K){var Z=l.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?Z+K:Z):K=Z,O){case 1:var rt=-1;break;case 2:rt=250;break;case 5:rt=1073741823;break;case 4:rt=1e4;break;default:rt=5e3}return rt=K+rt,O={id:b++,callback:B,priorityLevel:O,startTime:K,expirationTime:rt,sortIndex:-1},K>Z?(O.sortIndex=K,r(p,O),u(C)===null&&O===u(p)&&(X?(ot(k),k=-1):X=!0,qt(te,K-Z))):(O.sortIndex=rt,r(C,O),I||Y||(I=!0,Et||(Et=!0,J()))),O},l.unstable_shouldYield=P,l.unstable_wrapCallback=function(O){var B=N;return function(){var K=N;N=B;try{return O.apply(this,arguments)}finally{N=K}}}})(vo)),vo}var Wh;function zv(){return Wh||(Wh=1,go.exports=Rv()),go.exports}var yo={exports:{}},Me={};var tm;function Ov(){if(tm)return Me;tm=1;var l=Xo();function r(C){var p="https://react.dev/errors/"+C;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var b=2;b<arguments.length;b++)p+="&args[]="+encodeURIComponent(arguments[b])}return"Minified React error #"+C+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(){}var o={d:{f:u,r:function(){throw Error(r(522))},D:u,C:u,L:u,m:u,X:u,S:u,M:u},p:0,findDOMNode:null},d=Symbol.for("react.portal");function f(C,p,b){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:d,key:g==null?null:""+g,children:C,containerInfo:p,implementation:b}}var v=l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function A(C,p){if(C==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Me.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,Me.createPortal=function(C,p){var b=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(r(299));return f(C,p,null,b)},Me.flushSync=function(C){var p=v.T,b=o.p;try{if(v.T=null,o.p=2,C)return C()}finally{v.T=p,o.p=b,o.d.f()}},Me.preconnect=function(C,p){typeof C=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,o.d.C(C,p))},Me.prefetchDNS=function(C){typeof C=="string"&&o.d.D(C)},Me.preinit=function(C,p){if(typeof C=="string"&&p&&typeof p.as=="string"){var b=p.as,g=A(b,p.crossOrigin),N=typeof p.integrity=="string"?p.integrity:void 0,Y=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;b==="style"?o.d.S(C,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:g,integrity:N,fetchPriority:Y}):b==="script"&&o.d.X(C,{crossOrigin:g,integrity:N,fetchPriority:Y,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Me.preinitModule=function(C,p){if(typeof C=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var b=A(p.as,p.crossOrigin);o.d.M(C,{crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&o.d.M(C)},Me.preload=function(C,p){if(typeof C=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var b=p.as,g=A(b,p.crossOrigin);o.d.L(C,b,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Me.preloadModule=function(C,p){if(typeof C=="string")if(p){var b=A(p.as,p.crossOrigin);o.d.m(C,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else o.d.m(C)},Me.requestFormReset=function(C){o.d.r(C)},Me.unstable_batchedUpdates=function(C,p){return C(p)},Me.useFormState=function(C,p,b){return v.H.useFormState(C,p,b)},Me.useFormStatus=function(){return v.H.useHostTransitionStatus()},Me.version="19.2.4",Me}var em;function jm(){if(em)return yo.exports;em=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(r){console.error(r)}}return l(),yo.exports=Ov(),yo.exports}var nm;function Hv(){if(nm)return fi;nm=1;var l=zv(),r=Xo(),u=jm();function o(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function v(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function A(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function C(t){if(f(t)!==t)throw Error(o(188))}function p(t){var e=t.alternate;if(!e){if(e=f(t),e===null)throw Error(o(188));return e!==t?null:t}for(var n=t,a=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(a=i.return,a!==null){n=a;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return C(i),t;if(s===a)return C(i),e;s=s.sibling}throw Error(o(188))}if(n.return!==a.return)n=i,a=s;else{for(var c=!1,h=i.child;h;){if(h===n){c=!0,n=i,a=s;break}if(h===a){c=!0,a=i,n=s;break}h=h.sibling}if(!c){for(h=s.child;h;){if(h===n){c=!0,n=s,a=i;break}if(h===a){c=!0,a=s,n=i;break}h=h.sibling}if(!c)throw Error(o(189))}}if(n.alternate!==a)throw Error(o(190))}if(n.tag!==3)throw Error(o(188));return n.stateNode.current===n?t:e}function b(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=b(t),e!==null)return e;t=t.sibling}return null}var g=Object.assign,N=Symbol.for("react.element"),Y=Symbol.for("react.transitional.element"),I=Symbol.for("react.portal"),X=Symbol.for("react.fragment"),at=Symbol.for("react.strict_mode"),mt=Symbol.for("react.profiler"),ot=Symbol.for("react.consumer"),gt=Symbol.for("react.context"),Ht=Symbol.for("react.forward_ref"),te=Symbol.for("react.suspense"),Et=Symbol.for("react.suspense_list"),k=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),w=Symbol.for("react.activity"),P=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function J(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var dt=Symbol.for("react.client.reference");function vt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===dt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case X:return"Fragment";case mt:return"Profiler";case at:return"StrictMode";case te:return"Suspense";case Et:return"SuspenseList";case w:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case I:return"Portal";case gt:return t.displayName||"Context";case ot:return(t._context.displayName||"Context")+".Consumer";case Ht:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case k:return e=t.displayName||null,e!==null?e:vt(t.type)||"Memo";case E:e=t._payload,t=t._init;try{return vt(t(e))}catch{}}return null}var qt=Array.isArray,O=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,B=u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},Z=[],rt=-1;function y(t){return{current:t}}function x(t){0>rt||(t.current=Z[rt],Z[rt]=null,rt--)}function T(t,e){rt++,Z[rt]=t.current,t.current=e}var R=y(null),F=y(null),Q=y(null),lt=y(null);function W(t,e){switch(T(Q,e),T(F,t),T(R,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?vh(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=vh(e),t=yh(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}x(R),T(R,t)}function nt(){x(R),x(F),x(Q)}function bt(t){t.memoizedState!==null&&T(lt,t);var e=R.current,n=yh(e,t.type);e!==n&&(T(F,t),T(R,n))}function ht(t){F.current===t&&(x(R),x(F)),lt.current===t&&(x(lt),si._currentValue=K)}var xt,Yt;function Nt(t){if(xt===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);xt=e&&e[1]||"",Yt=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+xt+t+Yt}var Tt=!1;function yt(t,e){if(!t||Tt)return"";Tt=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var V=function(){throw Error()};if(Object.defineProperty(V.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(V,[])}catch(U){var z=U}Reflect.construct(t,[],V)}else{try{V.call()}catch(U){z=U}t.call(V.prototype)}}else{try{throw Error()}catch(U){z=U}(V=t())&&typeof V.catch=="function"&&V.catch(function(){})}}catch(U){if(U&&z&&typeof U.stack=="string")return[U.stack,z.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=a.DetermineComponentFrameRoot(),c=s[0],h=s[1];if(c&&h){var S=c.split(`
`),j=h.split(`
`);for(i=a=0;a<S.length&&!S[a].includes("DetermineComponentFrameRoot");)a++;for(;i<j.length&&!j[i].includes("DetermineComponentFrameRoot");)i++;if(a===S.length||i===j.length)for(a=S.length-1,i=j.length-1;1<=a&&0<=i&&S[a]!==j[i];)i--;for(;1<=a&&0<=i;a--,i--)if(S[a]!==j[i]){if(a!==1||i!==1)do if(a--,i--,0>i||S[a]!==j[i]){var L=`
`+S[a].replace(" at new "," at ");return t.displayName&&L.includes("<anonymous>")&&(L=L.replace("<anonymous>",t.displayName)),L}while(1<=a&&0<=i);break}}}finally{Tt=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Nt(n):""}function se(t,e){switch(t.tag){case 26:case 27:case 5:return Nt(t.type);case 16:return Nt("Lazy");case 13:return t.child!==e&&e!==null?Nt("Suspense Fallback"):Nt("Suspense");case 19:return Nt("SuspenseList");case 0:case 15:return yt(t.type,!1);case 11:return yt(t.type.render,!1);case 1:return yt(t.type,!0);case 31:return Nt("Activity");default:return""}}function _t(t){try{var e="",n=null;do e+=se(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var wt=Object.prototype.hasOwnProperty,Qt=l.unstable_scheduleCallback,ye=l.unstable_cancelCallback,xe=l.unstable_shouldYield,sn=l.unstable_requestPaint,Ut=l.unstable_now,Ae=l.unstable_getCurrentPriorityLevel,ee=l.unstable_ImmediatePriority,zt=l.unstable_UserBlockingPriority,ge=l.unstable_NormalPriority,G=l.unstable_LowPriority,st=l.unstable_IdlePriority,tt=l.log,Gt=l.unstable_setDisableYieldValue,H=null,et=null;function kt(t){if(typeof tt=="function"&&Gt(t),et&&typeof et.setStrictMode=="function")try{et.setStrictMode(H,t)}catch{}}var ie=Math.clz32?Math.clz32:Qe,Re=Math.log,ne=Math.LN2;function Qe(t){return t>>>=0,t===0?32:31-(Re(t)/ne|0)|0}var Ce=256,oa=262144,Ma=4194304;function gn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Da(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var i=0,s=t.suspendedLanes,c=t.pingedLanes;t=t.warmLanes;var h=a&134217727;return h!==0?(a=h&~s,a!==0?i=gn(a):(c&=h,c!==0?i=gn(c):n||(n=h&~t,n!==0&&(i=gn(n))))):(h=a&~s,h!==0?i=gn(h):c!==0?i=gn(c):n||(n=a&~t,n!==0&&(i=gn(n)))),i===0?0:e!==0&&e!==i&&(e&s)===0&&(s=i&-i,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:i}function vn(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function pp(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jo(){var t=Ma;return Ma<<=1,(Ma&62914560)===0&&(Ma=4194304),t}function ts(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function xl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function gp(t,e,n,a,i,s){var c=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var h=t.entanglements,S=t.expirationTimes,j=t.hiddenUpdates;for(n=c&~n;0<n;){var L=31-ie(n),V=1<<L;h[L]=0,S[L]=-1;var z=j[L];if(z!==null)for(j[L]=null,L=0;L<z.length;L++){var U=z[L];U!==null&&(U.lane&=-536870913)}n&=~V}a!==0&&$o(t,a,0),s!==0&&i===0&&t.tag!==0&&(t.suspendedLanes|=s&~(c&~e))}function $o(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-ie(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function Wo(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-ie(n),i=1<<a;i&e|t[a]&e&&(t[a]|=e),n&=~i}}function tc(t,e){var n=e&-e;return n=(n&42)!==0?1:es(n),(n&(t.suspendedLanes|e))!==0?0:n}function es(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ns(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function ec(){var t=B.p;return t!==0?t:(t=window.event,t===void 0?32:Bh(t.type))}function nc(t,e){var n=B.p;try{return B.p=t,e()}finally{B.p=n}}var kn=Math.random().toString(36).slice(2),Te="__reactFiber$"+kn,Oe="__reactProps$"+kn,ja="__reactContainer$"+kn,as="__reactEvents$"+kn,vp="__reactListeners$"+kn,yp="__reactHandles$"+kn,ac="__reactResources$"+kn,Al="__reactMarker$"+kn;function ls(t){delete t[Te],delete t[Oe],delete t[as],delete t[vp],delete t[yp]}function Ra(t){var e=t[Te];if(e)return e;for(var n=t.parentNode;n;){if(e=n[ja]||n[Te]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=_h(t);t!==null;){if(n=t[Te])return n;t=_h(t)}return e}t=n,n=t.parentNode}return null}function za(t){if(t=t[Te]||t[ja]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Cl(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(o(33))}function Oa(t){var e=t[ac];return e||(e=t[ac]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function be(t){t[Al]=!0}var lc=new Set,ic={};function ca(t,e){Ha(t,e),Ha(t+"Capture",e)}function Ha(t,e){for(ic[t]=e,t=0;t<e.length;t++)lc.add(e[t])}var bp=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),rc={},sc={};function Sp(t){return wt.call(sc,t)?!0:wt.call(rc,t)?!1:bp.test(t)?sc[t]=!0:(rc[t]=!0,!1)}function Ei(t,e,n){if(Sp(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Ni(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function yn(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function Ze(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function uc(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function xp(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var i=a.get,s=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(c){n=""+c,s.call(this,c)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(c){n=""+c},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function is(t){if(!t._valueTracker){var e=uc(t)?"checked":"value";t._valueTracker=xp(t,e,""+t[e])}}function oc(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=uc(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function wi(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Ap=/[\n"\\]/g;function Ie(t){return t.replace(Ap,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function rs(t,e,n,a,i,s,c,h){t.name="",c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?t.type=c:t.removeAttribute("type"),e!=null?c==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Ze(e)):t.value!==""+Ze(e)&&(t.value=""+Ze(e)):c!=="submit"&&c!=="reset"||t.removeAttribute("value"),e!=null?ss(t,c,Ze(e)):n!=null?ss(t,c,Ze(n)):a!=null&&t.removeAttribute("value"),i==null&&s!=null&&(t.defaultChecked=!!s),i!=null&&(t.checked=i&&typeof i!="function"&&typeof i!="symbol"),h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"?t.name=""+Ze(h):t.removeAttribute("name")}function cc(t,e,n,a,i,s,c,h){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){is(t);return}n=n!=null?""+Ze(n):"",e=e!=null?""+Ze(e):n,h||e===t.value||(t.value=e),t.defaultValue=e}a=a??i,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=h?t.checked:!!a,t.defaultChecked=!!a,c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.name=c),is(t)}function ss(t,e,n){e==="number"&&wi(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Ua(t,e,n,a){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&a&&(t[n].defaultSelected=!0)}else{for(n=""+Ze(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,a&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function dc(t,e,n){if(e!=null&&(e=""+Ze(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+Ze(n):""}function fc(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(o(92));if(qt(a)){if(1<a.length)throw Error(o(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=Ze(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),is(t)}function ka(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Cp=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function hc(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||Cp.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function mc(t,e,n){if(e!=null&&typeof e!="object")throw Error(o(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var i in e)a=e[i],e.hasOwnProperty(i)&&n[i]!==a&&hc(t,i,a)}else for(var s in e)e.hasOwnProperty(s)&&hc(t,s,e[s])}function us(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Tp=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),_p=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Mi(t){return _p.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function bn(){}var os=null;function cs(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ga=null,La=null;function pc(t){var e=za(t);if(e&&(t=e.stateNode)){var n=t[Oe]||null;t:switch(t=e.stateNode,e.type){case"input":if(rs(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ie(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var i=a[Oe]||null;if(!i)throw Error(o(90));rs(a,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&oc(a)}break t;case"textarea":dc(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&Ua(t,!!n.multiple,e,!1)}}}var ds=!1;function gc(t,e,n){if(ds)return t(e,n);ds=!0;try{var a=t(e);return a}finally{if(ds=!1,(Ga!==null||La!==null)&&(gr(),Ga&&(e=Ga,t=La,La=Ga=null,pc(e),t)))for(e=0;e<t.length;e++)pc(t[e])}}function Tl(t,e){var n=t.stateNode;if(n===null)return null;var a=n[Oe]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(o(231,e,typeof n));return n}var Sn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fs=!1;if(Sn)try{var _l={};Object.defineProperty(_l,"passive",{get:function(){fs=!0}}),window.addEventListener("test",_l,_l),window.removeEventListener("test",_l,_l)}catch{fs=!1}var Gn=null,hs=null,Di=null;function vc(){if(Di)return Di;var t,e=hs,n=e.length,a,i="value"in Gn?Gn.value:Gn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var c=n-t;for(a=1;a<=c&&e[n-a]===i[s-a];a++);return Di=i.slice(t,1<a?1-a:void 0)}function ji(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ri(){return!0}function yc(){return!1}function He(t){function e(n,a,i,s,c){this._reactName=n,this._targetInst=i,this.type=a,this.nativeEvent=s,this.target=c,this.currentTarget=null;for(var h in t)t.hasOwnProperty(h)&&(n=t[h],this[h]=n?n(s):s[h]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ri:yc,this.isPropagationStopped=yc,this}return g(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ri)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ri)},persist:function(){},isPersistent:Ri}),e}var da={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zi=He(da),El=g({},da,{view:0,detail:0}),Ep=He(El),ms,ps,Nl,Oi=g({},El,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vs,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Nl&&(Nl&&t.type==="mousemove"?(ms=t.screenX-Nl.screenX,ps=t.screenY-Nl.screenY):ps=ms=0,Nl=t),ms)},movementY:function(t){return"movementY"in t?t.movementY:ps}}),bc=He(Oi),Np=g({},Oi,{dataTransfer:0}),wp=He(Np),Mp=g({},El,{relatedTarget:0}),gs=He(Mp),Dp=g({},da,{animationName:0,elapsedTime:0,pseudoElement:0}),jp=He(Dp),Rp=g({},da,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),zp=He(Rp),Op=g({},da,{data:0}),Sc=He(Op),Hp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Up={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gp(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=kp[t])?!!e[t]:!1}function vs(){return Gp}var Lp=g({},El,{key:function(t){if(t.key){var e=Hp[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ji(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Up[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vs,charCode:function(t){return t.type==="keypress"?ji(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ji(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Pp=He(Lp),Bp=g({},Oi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xc=He(Bp),qp=g({},El,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vs}),Vp=He(qp),Fp=g({},da,{propertyName:0,elapsedTime:0,pseudoElement:0}),Yp=He(Fp),Kp=g({},Oi,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Xp=He(Kp),Qp=g({},da,{newState:0,oldState:0}),Zp=He(Qp),Ip=[9,13,27,32],ys=Sn&&"CompositionEvent"in window,wl=null;Sn&&"documentMode"in document&&(wl=document.documentMode);var Jp=Sn&&"TextEvent"in window&&!wl,Ac=Sn&&(!ys||wl&&8<wl&&11>=wl),Cc=" ",Tc=!1;function _c(t,e){switch(t){case"keyup":return Ip.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ec(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Pa=!1;function $p(t,e){switch(t){case"compositionend":return Ec(e);case"keypress":return e.which!==32?null:(Tc=!0,Cc);case"textInput":return t=e.data,t===Cc&&Tc?null:t;default:return null}}function Wp(t,e){if(Pa)return t==="compositionend"||!ys&&_c(t,e)?(t=vc(),Di=hs=Gn=null,Pa=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ac&&e.locale!=="ko"?null:e.data;default:return null}}var tg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nc(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!tg[t.type]:e==="textarea"}function wc(t,e,n,a){Ga?La?La.push(a):La=[a]:Ga=a,e=Cr(e,"onChange"),0<e.length&&(n=new zi("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Ml=null,Dl=null;function eg(t){dh(t,0)}function Hi(t){var e=Cl(t);if(oc(e))return t}function Mc(t,e){if(t==="change")return e}var Dc=!1;if(Sn){var bs;if(Sn){var Ss="oninput"in document;if(!Ss){var jc=document.createElement("div");jc.setAttribute("oninput","return;"),Ss=typeof jc.oninput=="function"}bs=Ss}else bs=!1;Dc=bs&&(!document.documentMode||9<document.documentMode)}function Rc(){Ml&&(Ml.detachEvent("onpropertychange",zc),Dl=Ml=null)}function zc(t){if(t.propertyName==="value"&&Hi(Dl)){var e=[];wc(e,Dl,t,cs(t)),gc(eg,e)}}function ng(t,e,n){t==="focusin"?(Rc(),Ml=e,Dl=n,Ml.attachEvent("onpropertychange",zc)):t==="focusout"&&Rc()}function ag(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Hi(Dl)}function lg(t,e){if(t==="click")return Hi(e)}function ig(t,e){if(t==="input"||t==="change")return Hi(e)}function rg(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Be=typeof Object.is=="function"?Object.is:rg;function jl(t,e){if(Be(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var i=n[a];if(!wt.call(e,i)||!Be(t[i],e[i]))return!1}return!0}function Oc(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Hc(t,e){var n=Oc(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Oc(n)}}function Uc(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Uc(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function kc(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=wi(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=wi(t.document)}return e}function xs(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var sg=Sn&&"documentMode"in document&&11>=document.documentMode,Ba=null,As=null,Rl=null,Cs=!1;function Gc(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Cs||Ba==null||Ba!==wi(a)||(a=Ba,"selectionStart"in a&&xs(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Rl&&jl(Rl,a)||(Rl=a,a=Cr(As,"onSelect"),0<a.length&&(e=new zi("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=Ba)))}function fa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var qa={animationend:fa("Animation","AnimationEnd"),animationiteration:fa("Animation","AnimationIteration"),animationstart:fa("Animation","AnimationStart"),transitionrun:fa("Transition","TransitionRun"),transitionstart:fa("Transition","TransitionStart"),transitioncancel:fa("Transition","TransitionCancel"),transitionend:fa("Transition","TransitionEnd")},Ts={},Lc={};Sn&&(Lc=document.createElement("div").style,"AnimationEvent"in window||(delete qa.animationend.animation,delete qa.animationiteration.animation,delete qa.animationstart.animation),"TransitionEvent"in window||delete qa.transitionend.transition);function ha(t){if(Ts[t])return Ts[t];if(!qa[t])return t;var e=qa[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Lc)return Ts[t]=e[n];return t}var Pc=ha("animationend"),Bc=ha("animationiteration"),qc=ha("animationstart"),ug=ha("transitionrun"),og=ha("transitionstart"),cg=ha("transitioncancel"),Vc=ha("transitionend"),Fc=new Map,_s="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");_s.push("scrollEnd");function un(t,e){Fc.set(t,e),ca(e,[t])}var Ui=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Je=[],Va=0,Es=0;function ki(){for(var t=Va,e=Es=Va=0;e<t;){var n=Je[e];Je[e++]=null;var a=Je[e];Je[e++]=null;var i=Je[e];Je[e++]=null;var s=Je[e];if(Je[e++]=null,a!==null&&i!==null){var c=a.pending;c===null?i.next=i:(i.next=c.next,c.next=i),a.pending=i}s!==0&&Yc(n,i,s)}}function Gi(t,e,n,a){Je[Va++]=t,Je[Va++]=e,Je[Va++]=n,Je[Va++]=a,Es|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Ns(t,e,n,a){return Gi(t,e,n,a),Li(t)}function ma(t,e){return Gi(t,null,null,e),Li(t)}function Yc(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var i=!1,s=t.return;s!==null;)s.childLanes|=n,a=s.alternate,a!==null&&(a.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(i=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,i&&e!==null&&(i=31-ie(n),t=s.hiddenUpdates,a=t[i],a===null?t[i]=[e]:a.push(e),e.lane=n|536870912),s):null}function Li(t){if(50<ti)throw ti=0,Uu=null,Error(o(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Fa={};function dg(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qe(t,e,n,a){return new dg(t,e,n,a)}function ws(t){return t=t.prototype,!(!t||!t.isReactComponent)}function xn(t,e){var n=t.alternate;return n===null?(n=qe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function Kc(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Pi(t,e,n,a,i,s){var c=0;if(a=t,typeof t=="function")ws(t)&&(c=1);else if(typeof t=="string")c=gv(t,n,R.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case w:return t=qe(31,n,e,i),t.elementType=w,t.lanes=s,t;case X:return pa(n.children,i,s,e);case at:c=8,i|=24;break;case mt:return t=qe(12,n,e,i|2),t.elementType=mt,t.lanes=s,t;case te:return t=qe(13,n,e,i),t.elementType=te,t.lanes=s,t;case Et:return t=qe(19,n,e,i),t.elementType=Et,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case gt:c=10;break t;case ot:c=9;break t;case Ht:c=11;break t;case k:c=14;break t;case E:c=16,a=null;break t}c=29,n=Error(o(130,t===null?"null":typeof t,"")),a=null}return e=qe(c,n,e,i),e.elementType=t,e.type=a,e.lanes=s,e}function pa(t,e,n,a){return t=qe(7,t,a,e),t.lanes=n,t}function Ms(t,e,n){return t=qe(6,t,null,e),t.lanes=n,t}function Xc(t){var e=qe(18,null,null,0);return e.stateNode=t,e}function Ds(t,e,n){return e=qe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Qc=new WeakMap;function $e(t,e){if(typeof t=="object"&&t!==null){var n=Qc.get(t);return n!==void 0?n:(e={value:t,source:e,stack:_t(e)},Qc.set(t,e),e)}return{value:t,source:e,stack:_t(e)}}var Ya=[],Ka=0,Bi=null,zl=0,We=[],tn=0,Ln=null,dn=1,fn="";function An(t,e){Ya[Ka++]=zl,Ya[Ka++]=Bi,Bi=t,zl=e}function Zc(t,e,n){We[tn++]=dn,We[tn++]=fn,We[tn++]=Ln,Ln=t;var a=dn;t=fn;var i=32-ie(a)-1;a&=~(1<<i),n+=1;var s=32-ie(e)+i;if(30<s){var c=i-i%5;s=(a&(1<<c)-1).toString(32),a>>=c,i-=c,dn=1<<32-ie(e)+i|n<<i|a,fn=s+t}else dn=1<<s|n<<i|a,fn=t}function js(t){t.return!==null&&(An(t,1),Zc(t,1,0))}function Rs(t){for(;t===Bi;)Bi=Ya[--Ka],Ya[Ka]=null,zl=Ya[--Ka],Ya[Ka]=null;for(;t===Ln;)Ln=We[--tn],We[tn]=null,fn=We[--tn],We[tn]=null,dn=We[--tn],We[tn]=null}function Ic(t,e){We[tn++]=dn,We[tn++]=fn,We[tn++]=Ln,dn=e.id,fn=e.overflow,Ln=t}var _e=null,ae=null,Ot=!1,Pn=null,en=!1,zs=Error(o(519));function Bn(t){var e=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ol($e(e,t)),zs}function Jc(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[Te]=t,e[Oe]=a,n){case"dialog":Dt("cancel",e),Dt("close",e);break;case"iframe":case"object":case"embed":Dt("load",e);break;case"video":case"audio":for(n=0;n<ni.length;n++)Dt(ni[n],e);break;case"source":Dt("error",e);break;case"img":case"image":case"link":Dt("error",e),Dt("load",e);break;case"details":Dt("toggle",e);break;case"input":Dt("invalid",e),cc(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":Dt("invalid",e);break;case"textarea":Dt("invalid",e),fc(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||ph(e.textContent,n)?(a.popover!=null&&(Dt("beforetoggle",e),Dt("toggle",e)),a.onScroll!=null&&Dt("scroll",e),a.onScrollEnd!=null&&Dt("scrollend",e),a.onClick!=null&&(e.onclick=bn),e=!0):e=!1,e||Bn(t,!0)}function $c(t){for(_e=t.return;_e;)switch(_e.tag){case 5:case 31:case 13:en=!1;return;case 27:case 3:en=!0;return;default:_e=_e.return}}function Xa(t){if(t!==_e)return!1;if(!Ot)return $c(t),Ot=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Ju(t.type,t.memoizedProps)),n=!n),n&&ae&&Bn(t),$c(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));ae=Th(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));ae=Th(t)}else e===27?(e=ae,ea(t.type)?(t=no,no=null,ae=t):ae=e):ae=_e?an(t.stateNode.nextSibling):null;return!0}function ga(){ae=_e=null,Ot=!1}function Os(){var t=Pn;return t!==null&&(Le===null?Le=t:Le.push.apply(Le,t),Pn=null),t}function Ol(t){Pn===null?Pn=[t]:Pn.push(t)}var Hs=y(null),va=null,Cn=null;function qn(t,e,n){T(Hs,e._currentValue),e._currentValue=n}function Tn(t){t._currentValue=Hs.current,x(Hs)}function Us(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function ks(t,e,n,a){var i=t.child;for(i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){var c=i.child;s=s.firstContext;t:for(;s!==null;){var h=s;s=i;for(var S=0;S<e.length;S++)if(h.context===e[S]){s.lanes|=n,h=s.alternate,h!==null&&(h.lanes|=n),Us(s.return,n,t),a||(c=null);break t}s=h.next}}else if(i.tag===18){if(c=i.return,c===null)throw Error(o(341));c.lanes|=n,s=c.alternate,s!==null&&(s.lanes|=n),Us(c,n,t),c=null}else c=i.child;if(c!==null)c.return=i;else for(c=i;c!==null;){if(c===t){c=null;break}if(i=c.sibling,i!==null){i.return=c.return,c=i;break}c=c.return}i=c}}function Qa(t,e,n,a){t=null;for(var i=e,s=!1;i!==null;){if(!s){if((i.flags&524288)!==0)s=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var c=i.alternate;if(c===null)throw Error(o(387));if(c=c.memoizedProps,c!==null){var h=i.type;Be(i.pendingProps.value,c.value)||(t!==null?t.push(h):t=[h])}}else if(i===lt.current){if(c=i.alternate,c===null)throw Error(o(387));c.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(t!==null?t.push(si):t=[si])}i=i.return}t!==null&&ks(e,t,n,a),e.flags|=262144}function qi(t){for(t=t.firstContext;t!==null;){if(!Be(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function ya(t){va=t,Cn=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ee(t){return Wc(va,t)}function Vi(t,e){return va===null&&ya(t),Wc(t,e)}function Wc(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Cn===null){if(t===null)throw Error(o(308));Cn=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Cn=Cn.next=e;return n}var fg=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},hg=l.unstable_scheduleCallback,mg=l.unstable_NormalPriority,fe={$$typeof:gt,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Gs(){return{controller:new fg,data:new Map,refCount:0}}function Hl(t){t.refCount--,t.refCount===0&&hg(mg,function(){t.controller.abort()})}var Ul=null,Ls=0,Za=0,Ia=null;function pg(t,e){if(Ul===null){var n=Ul=[];Ls=0,Za=qu(),Ia={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Ls++,e.then(td,td),e}function td(){if(--Ls===0&&Ul!==null){Ia!==null&&(Ia.status="fulfilled");var t=Ul;Ul=null,Za=0,Ia=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function gg(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(i){n.push(i)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var i=0;i<n.length;i++)(0,n[i])(e)},function(i){for(a.status="rejected",a.reason=i,i=0;i<n.length;i++)(0,n[i])(void 0)}),a}var ed=O.S;O.S=function(t,e){Lf=Ut(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&pg(t,e),ed!==null&&ed(t,e)};var ba=y(null);function Ps(){var t=ba.current;return t!==null?t:$t.pooledCache}function Fi(t,e){e===null?T(ba,ba.current):T(ba,e.pool)}function nd(){var t=Ps();return t===null?null:{parent:fe._currentValue,pool:t}}var Ja=Error(o(460)),Bs=Error(o(474)),Yi=Error(o(542)),Ki={then:function(){}};function ad(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ld(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(bn,bn),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,rd(t),t;default:if(typeof e.status=="string")e.then(bn,bn);else{if(t=$t,t!==null&&100<t.shellSuspendCounter)throw Error(o(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var i=e;i.status="fulfilled",i.value=a}},function(a){if(e.status==="pending"){var i=e;i.status="rejected",i.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,rd(t),t}throw xa=e,Ja}}function Sa(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(xa=n,Ja):n}}var xa=null;function id(){if(xa===null)throw Error(o(459));var t=xa;return xa=null,t}function rd(t){if(t===Ja||t===Yi)throw Error(o(483))}var $a=null,kl=0;function Xi(t){var e=kl;return kl+=1,$a===null&&($a=[]),ld($a,t,e)}function Gl(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function Qi(t,e){throw e.$$typeof===N?Error(o(525)):(t=Object.prototype.toString.call(e),Error(o(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function sd(t){function e(M,_){if(t){var D=M.deletions;D===null?(M.deletions=[_],M.flags|=16):D.push(_)}}function n(M,_){if(!t)return null;for(;_!==null;)e(M,_),_=_.sibling;return null}function a(M){for(var _=new Map;M!==null;)M.key!==null?_.set(M.key,M):_.set(M.index,M),M=M.sibling;return _}function i(M,_){return M=xn(M,_),M.index=0,M.sibling=null,M}function s(M,_,D){return M.index=D,t?(D=M.alternate,D!==null?(D=D.index,D<_?(M.flags|=67108866,_):D):(M.flags|=67108866,_)):(M.flags|=1048576,_)}function c(M){return t&&M.alternate===null&&(M.flags|=67108866),M}function h(M,_,D,q){return _===null||_.tag!==6?(_=Ms(D,M.mode,q),_.return=M,_):(_=i(_,D),_.return=M,_)}function S(M,_,D,q){var ft=D.type;return ft===X?L(M,_,D.props.children,q,D.key):_!==null&&(_.elementType===ft||typeof ft=="object"&&ft!==null&&ft.$$typeof===E&&Sa(ft)===_.type)?(_=i(_,D.props),Gl(_,D),_.return=M,_):(_=Pi(D.type,D.key,D.props,null,M.mode,q),Gl(_,D),_.return=M,_)}function j(M,_,D,q){return _===null||_.tag!==4||_.stateNode.containerInfo!==D.containerInfo||_.stateNode.implementation!==D.implementation?(_=Ds(D,M.mode,q),_.return=M,_):(_=i(_,D.children||[]),_.return=M,_)}function L(M,_,D,q,ft){return _===null||_.tag!==7?(_=pa(D,M.mode,q,ft),_.return=M,_):(_=i(_,D),_.return=M,_)}function V(M,_,D){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return _=Ms(""+_,M.mode,D),_.return=M,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Y:return D=Pi(_.type,_.key,_.props,null,M.mode,D),Gl(D,_),D.return=M,D;case I:return _=Ds(_,M.mode,D),_.return=M,_;case E:return _=Sa(_),V(M,_,D)}if(qt(_)||J(_))return _=pa(_,M.mode,D,null),_.return=M,_;if(typeof _.then=="function")return V(M,Xi(_),D);if(_.$$typeof===gt)return V(M,Vi(M,_),D);Qi(M,_)}return null}function z(M,_,D,q){var ft=_!==null?_.key:null;if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return ft!==null?null:h(M,_,""+D,q);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Y:return D.key===ft?S(M,_,D,q):null;case I:return D.key===ft?j(M,_,D,q):null;case E:return D=Sa(D),z(M,_,D,q)}if(qt(D)||J(D))return ft!==null?null:L(M,_,D,q,null);if(typeof D.then=="function")return z(M,_,Xi(D),q);if(D.$$typeof===gt)return z(M,_,Vi(M,D),q);Qi(M,D)}return null}function U(M,_,D,q,ft){if(typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint")return M=M.get(D)||null,h(_,M,""+q,ft);if(typeof q=="object"&&q!==null){switch(q.$$typeof){case Y:return M=M.get(q.key===null?D:q.key)||null,S(_,M,q,ft);case I:return M=M.get(q.key===null?D:q.key)||null,j(_,M,q,ft);case E:return q=Sa(q),U(M,_,D,q,ft)}if(qt(q)||J(q))return M=M.get(D)||null,L(_,M,q,ft,null);if(typeof q.then=="function")return U(M,_,D,Xi(q),ft);if(q.$$typeof===gt)return U(M,_,D,Vi(_,q),ft);Qi(_,q)}return null}function it(M,_,D,q){for(var ft=null,Pt=null,ut=_,Ct=_=0,Rt=null;ut!==null&&Ct<D.length;Ct++){ut.index>Ct?(Rt=ut,ut=null):Rt=ut.sibling;var Bt=z(M,ut,D[Ct],q);if(Bt===null){ut===null&&(ut=Rt);break}t&&ut&&Bt.alternate===null&&e(M,ut),_=s(Bt,_,Ct),Pt===null?ft=Bt:Pt.sibling=Bt,Pt=Bt,ut=Rt}if(Ct===D.length)return n(M,ut),Ot&&An(M,Ct),ft;if(ut===null){for(;Ct<D.length;Ct++)ut=V(M,D[Ct],q),ut!==null&&(_=s(ut,_,Ct),Pt===null?ft=ut:Pt.sibling=ut,Pt=ut);return Ot&&An(M,Ct),ft}for(ut=a(ut);Ct<D.length;Ct++)Rt=U(ut,M,Ct,D[Ct],q),Rt!==null&&(t&&Rt.alternate!==null&&ut.delete(Rt.key===null?Ct:Rt.key),_=s(Rt,_,Ct),Pt===null?ft=Rt:Pt.sibling=Rt,Pt=Rt);return t&&ut.forEach(function(ra){return e(M,ra)}),Ot&&An(M,Ct),ft}function pt(M,_,D,q){if(D==null)throw Error(o(151));for(var ft=null,Pt=null,ut=_,Ct=_=0,Rt=null,Bt=D.next();ut!==null&&!Bt.done;Ct++,Bt=D.next()){ut.index>Ct?(Rt=ut,ut=null):Rt=ut.sibling;var ra=z(M,ut,Bt.value,q);if(ra===null){ut===null&&(ut=Rt);break}t&&ut&&ra.alternate===null&&e(M,ut),_=s(ra,_,Ct),Pt===null?ft=ra:Pt.sibling=ra,Pt=ra,ut=Rt}if(Bt.done)return n(M,ut),Ot&&An(M,Ct),ft;if(ut===null){for(;!Bt.done;Ct++,Bt=D.next())Bt=V(M,Bt.value,q),Bt!==null&&(_=s(Bt,_,Ct),Pt===null?ft=Bt:Pt.sibling=Bt,Pt=Bt);return Ot&&An(M,Ct),ft}for(ut=a(ut);!Bt.done;Ct++,Bt=D.next())Bt=U(ut,M,Ct,Bt.value,q),Bt!==null&&(t&&Bt.alternate!==null&&ut.delete(Bt.key===null?Ct:Bt.key),_=s(Bt,_,Ct),Pt===null?ft=Bt:Pt.sibling=Bt,Pt=Bt);return t&&ut.forEach(function(Nv){return e(M,Nv)}),Ot&&An(M,Ct),ft}function Jt(M,_,D,q){if(typeof D=="object"&&D!==null&&D.type===X&&D.key===null&&(D=D.props.children),typeof D=="object"&&D!==null){switch(D.$$typeof){case Y:t:{for(var ft=D.key;_!==null;){if(_.key===ft){if(ft=D.type,ft===X){if(_.tag===7){n(M,_.sibling),q=i(_,D.props.children),q.return=M,M=q;break t}}else if(_.elementType===ft||typeof ft=="object"&&ft!==null&&ft.$$typeof===E&&Sa(ft)===_.type){n(M,_.sibling),q=i(_,D.props),Gl(q,D),q.return=M,M=q;break t}n(M,_);break}else e(M,_);_=_.sibling}D.type===X?(q=pa(D.props.children,M.mode,q,D.key),q.return=M,M=q):(q=Pi(D.type,D.key,D.props,null,M.mode,q),Gl(q,D),q.return=M,M=q)}return c(M);case I:t:{for(ft=D.key;_!==null;){if(_.key===ft)if(_.tag===4&&_.stateNode.containerInfo===D.containerInfo&&_.stateNode.implementation===D.implementation){n(M,_.sibling),q=i(_,D.children||[]),q.return=M,M=q;break t}else{n(M,_);break}else e(M,_);_=_.sibling}q=Ds(D,M.mode,q),q.return=M,M=q}return c(M);case E:return D=Sa(D),Jt(M,_,D,q)}if(qt(D))return it(M,_,D,q);if(J(D)){if(ft=J(D),typeof ft!="function")throw Error(o(150));return D=ft.call(D),pt(M,_,D,q)}if(typeof D.then=="function")return Jt(M,_,Xi(D),q);if(D.$$typeof===gt)return Jt(M,_,Vi(M,D),q);Qi(M,D)}return typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint"?(D=""+D,_!==null&&_.tag===6?(n(M,_.sibling),q=i(_,D),q.return=M,M=q):(n(M,_),q=Ms(D,M.mode,q),q.return=M,M=q),c(M)):n(M,_)}return function(M,_,D,q){try{kl=0;var ft=Jt(M,_,D,q);return $a=null,ft}catch(ut){if(ut===Ja||ut===Yi)throw ut;var Pt=qe(29,ut,null,M.mode);return Pt.lanes=q,Pt.return=M,Pt}}}var Aa=sd(!0),ud=sd(!1),Vn=!1;function qs(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Vs(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Yn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(Vt&2)!==0){var i=a.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),a.pending=e,e=Li(t),Yc(t,null,n),e}return Gi(t,a,e,n),Li(t)}function Ll(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,Wo(t,n)}}function Fs(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var c={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?i=s=c:s=s.next=c,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Ys=!1;function Pl(){if(Ys){var t=Ia;if(t!==null)throw t}}function Bl(t,e,n,a){Ys=!1;var i=t.updateQueue;Vn=!1;var s=i.firstBaseUpdate,c=i.lastBaseUpdate,h=i.shared.pending;if(h!==null){i.shared.pending=null;var S=h,j=S.next;S.next=null,c===null?s=j:c.next=j,c=S;var L=t.alternate;L!==null&&(L=L.updateQueue,h=L.lastBaseUpdate,h!==c&&(h===null?L.firstBaseUpdate=j:h.next=j,L.lastBaseUpdate=S))}if(s!==null){var V=i.baseState;c=0,L=j=S=null,h=s;do{var z=h.lane&-536870913,U=z!==h.lane;if(U?(jt&z)===z:(a&z)===z){z!==0&&z===Za&&(Ys=!0),L!==null&&(L=L.next={lane:0,tag:h.tag,payload:h.payload,callback:null,next:null});t:{var it=t,pt=h;z=e;var Jt=n;switch(pt.tag){case 1:if(it=pt.payload,typeof it=="function"){V=it.call(Jt,V,z);break t}V=it;break t;case 3:it.flags=it.flags&-65537|128;case 0:if(it=pt.payload,z=typeof it=="function"?it.call(Jt,V,z):it,z==null)break t;V=g({},V,z);break t;case 2:Vn=!0}}z=h.callback,z!==null&&(t.flags|=64,U&&(t.flags|=8192),U=i.callbacks,U===null?i.callbacks=[z]:U.push(z))}else U={lane:z,tag:h.tag,payload:h.payload,callback:h.callback,next:null},L===null?(j=L=U,S=V):L=L.next=U,c|=z;if(h=h.next,h===null){if(h=i.shared.pending,h===null)break;U=h,h=U.next,U.next=null,i.lastBaseUpdate=U,i.shared.pending=null}}while(!0);L===null&&(S=V),i.baseState=S,i.firstBaseUpdate=j,i.lastBaseUpdate=L,s===null&&(i.shared.lanes=0),In|=c,t.lanes=c,t.memoizedState=V}}function od(t,e){if(typeof t!="function")throw Error(o(191,t));t.call(e)}function cd(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)od(n[t],e)}var Wa=y(null),Zi=y(0);function dd(t,e){t=zn,T(Zi,t),T(Wa,e),zn=t|e.baseLanes}function Ks(){T(Zi,zn),T(Wa,Wa.current)}function Xs(){zn=Zi.current,x(Wa),x(Zi)}var Ve=y(null),nn=null;function Kn(t){var e=t.alternate;T(ce,ce.current&1),T(Ve,t),nn===null&&(e===null||Wa.current!==null||e.memoizedState!==null)&&(nn=t)}function Qs(t){T(ce,ce.current),T(Ve,t),nn===null&&(nn=t)}function fd(t){t.tag===22?(T(ce,ce.current),T(Ve,t),nn===null&&(nn=t)):Xn()}function Xn(){T(ce,ce.current),T(Ve,Ve.current)}function Fe(t){x(Ve),nn===t&&(nn=null),x(ce)}var ce=y(0);function Ii(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||to(n)||eo(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var _n=0,At=null,Zt=null,he=null,Ji=!1,tl=!1,Ca=!1,$i=0,ql=0,el=null,vg=0;function ue(){throw Error(o(321))}function Zs(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Be(t[n],e[n]))return!1;return!0}function Is(t,e,n,a,i,s){return _n=s,At=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,O.H=t===null||t.memoizedState===null?Zd:du,Ca=!1,s=n(a,i),Ca=!1,tl&&(s=md(e,n,a,i)),hd(t),s}function hd(t){O.H=Yl;var e=Zt!==null&&Zt.next!==null;if(_n=0,he=Zt=At=null,Ji=!1,ql=0,el=null,e)throw Error(o(300));t===null||me||(t=t.dependencies,t!==null&&qi(t)&&(me=!0))}function md(t,e,n,a){At=t;var i=0;do{if(tl&&(el=null),ql=0,tl=!1,25<=i)throw Error(o(301));if(i+=1,he=Zt=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}O.H=Id,s=e(n,a)}while(tl);return s}function yg(){var t=O.H,e=t.useState()[0];return e=typeof e.then=="function"?Vl(e):e,t=t.useState()[0],(Zt!==null?Zt.memoizedState:null)!==t&&(At.flags|=1024),e}function Js(){var t=$i!==0;return $i=0,t}function $s(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function Ws(t){if(Ji){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Ji=!1}_n=0,he=Zt=At=null,tl=!1,ql=$i=0,el=null}function ze(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return he===null?At.memoizedState=he=t:he=he.next=t,he}function de(){if(Zt===null){var t=At.alternate;t=t!==null?t.memoizedState:null}else t=Zt.next;var e=he===null?At.memoizedState:he.next;if(e!==null)he=e,Zt=t;else{if(t===null)throw At.alternate===null?Error(o(467)):Error(o(310));Zt=t,t={memoizedState:Zt.memoizedState,baseState:Zt.baseState,baseQueue:Zt.baseQueue,queue:Zt.queue,next:null},he===null?At.memoizedState=he=t:he=he.next=t}return he}function Wi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Vl(t){var e=ql;return ql+=1,el===null&&(el=[]),t=ld(el,t,e),e=At,(he===null?e.memoizedState:he.next)===null&&(e=e.alternate,O.H=e===null||e.memoizedState===null?Zd:du),t}function tr(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Vl(t);if(t.$$typeof===gt)return Ee(t)}throw Error(o(438,String(t)))}function tu(t){var e=null,n=At.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=At.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(i){return i.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=Wi(),At.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=P;return e.index++,n}function En(t,e){return typeof e=="function"?e(t):e}function er(t){var e=de();return eu(e,Zt,t)}function eu(t,e,n){var a=t.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=n;var i=t.baseQueue,s=a.pending;if(s!==null){if(i!==null){var c=i.next;i.next=s.next,s.next=c}e.baseQueue=i=s,a.pending=null}if(s=t.baseState,i===null)t.memoizedState=s;else{e=i.next;var h=c=null,S=null,j=e,L=!1;do{var V=j.lane&-536870913;if(V!==j.lane?(jt&V)===V:(_n&V)===V){var z=j.revertLane;if(z===0)S!==null&&(S=S.next={lane:0,revertLane:0,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null}),V===Za&&(L=!0);else if((_n&z)===z){j=j.next,z===Za&&(L=!0);continue}else V={lane:0,revertLane:j.revertLane,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},S===null?(h=S=V,c=s):S=S.next=V,At.lanes|=z,In|=z;V=j.action,Ca&&n(s,V),s=j.hasEagerState?j.eagerState:n(s,V)}else z={lane:V,revertLane:j.revertLane,gesture:j.gesture,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},S===null?(h=S=z,c=s):S=S.next=z,At.lanes|=V,In|=V;j=j.next}while(j!==null&&j!==e);if(S===null?c=s:S.next=h,!Be(s,t.memoizedState)&&(me=!0,L&&(n=Ia,n!==null)))throw n;t.memoizedState=s,t.baseState=c,t.baseQueue=S,a.lastRenderedState=s}return i===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function nu(t){var e=de(),n=e.queue;if(n===null)throw Error(o(311));n.lastRenderedReducer=t;var a=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var c=i=i.next;do s=t(s,c.action),c=c.next;while(c!==i);Be(s,e.memoizedState)||(me=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,a]}function pd(t,e,n){var a=At,i=de(),s=Ot;if(s){if(n===void 0)throw Error(o(407));n=n()}else n=e();var c=!Be((Zt||i).memoizedState,n);if(c&&(i.memoizedState=n,me=!0),i=i.queue,iu(yd.bind(null,a,i,t),[t]),i.getSnapshot!==e||c||he!==null&&he.memoizedState.tag&1){if(a.flags|=2048,nl(9,{destroy:void 0},vd.bind(null,a,i,n,e),null),$t===null)throw Error(o(349));s||(_n&127)!==0||gd(a,e,n)}return n}function gd(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=At.updateQueue,e===null?(e=Wi(),At.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function vd(t,e,n,a){e.value=n,e.getSnapshot=a,bd(e)&&Sd(t)}function yd(t,e,n){return n(function(){bd(e)&&Sd(t)})}function bd(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Be(t,n)}catch{return!0}}function Sd(t){var e=ma(t,2);e!==null&&Pe(e,t,2)}function au(t){var e=ze();if(typeof t=="function"){var n=t;if(t=n(),Ca){kt(!0);try{n()}finally{kt(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:En,lastRenderedState:t},e}function xd(t,e,n,a){return t.baseState=n,eu(t,Zt,typeof a=="function"?a:En)}function bg(t,e,n,a,i){if(lr(t))throw Error(o(485));if(t=e.action,t!==null){var s={payload:i,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(c){s.listeners.push(c)}};O.T!==null?n(!0):s.isTransition=!1,a(s),n=e.pending,n===null?(s.next=e.pending=s,Ad(e,s)):(s.next=n.next,e.pending=n.next=s)}}function Ad(t,e){var n=e.action,a=e.payload,i=t.state;if(e.isTransition){var s=O.T,c={};O.T=c;try{var h=n(i,a),S=O.S;S!==null&&S(c,h),Cd(t,e,h)}catch(j){lu(t,e,j)}finally{s!==null&&c.types!==null&&(s.types=c.types),O.T=s}}else try{s=n(i,a),Cd(t,e,s)}catch(j){lu(t,e,j)}}function Cd(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Td(t,e,a)},function(a){return lu(t,e,a)}):Td(t,e,n)}function Td(t,e,n){e.status="fulfilled",e.value=n,_d(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Ad(t,n)))}function lu(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,_d(e),e=e.next;while(e!==a)}t.action=null}function _d(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Ed(t,e){return e}function Nd(t,e){if(Ot){var n=$t.formState;if(n!==null){t:{var a=At;if(Ot){if(ae){e:{for(var i=ae,s=en;i.nodeType!==8;){if(!s){i=null;break e}if(i=an(i.nextSibling),i===null){i=null;break e}}s=i.data,i=s==="F!"||s==="F"?i:null}if(i){ae=an(i.nextSibling),a=i.data==="F!";break t}}Bn(a)}a=!1}a&&(e=n[0])}}return n=ze(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ed,lastRenderedState:e},n.queue=a,n=Kd.bind(null,At,a),a.dispatch=n,a=au(!1),s=cu.bind(null,At,!1,a.queue),a=ze(),i={state:e,dispatch:null,action:t,pending:null},a.queue=i,n=bg.bind(null,At,i,s,n),i.dispatch=n,a.memoizedState=t,[e,n,!1]}function wd(t){var e=de();return Md(e,Zt,t)}function Md(t,e,n){if(e=eu(t,e,Ed)[0],t=er(En)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=Vl(e)}catch(c){throw c===Ja?Yi:c}else a=e;e=de();var i=e.queue,s=i.dispatch;return n!==e.memoizedState&&(At.flags|=2048,nl(9,{destroy:void 0},Sg.bind(null,i,n),null)),[a,s,t]}function Sg(t,e){t.action=e}function Dd(t){var e=de(),n=Zt;if(n!==null)return Md(e,n,t);de(),e=e.memoizedState,n=de();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function nl(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=At.updateQueue,e===null&&(e=Wi(),At.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function jd(){return de().memoizedState}function nr(t,e,n,a){var i=ze();At.flags|=t,i.memoizedState=nl(1|e,{destroy:void 0},n,a===void 0?null:a)}function ar(t,e,n,a){var i=de();a=a===void 0?null:a;var s=i.memoizedState.inst;Zt!==null&&a!==null&&Zs(a,Zt.memoizedState.deps)?i.memoizedState=nl(e,s,n,a):(At.flags|=t,i.memoizedState=nl(1|e,s,n,a))}function Rd(t,e){nr(8390656,8,t,e)}function iu(t,e){ar(2048,8,t,e)}function xg(t){At.flags|=4;var e=At.updateQueue;if(e===null)e=Wi(),At.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function zd(t){var e=de().memoizedState;return xg({ref:e,nextImpl:t}),function(){if((Vt&2)!==0)throw Error(o(440));return e.impl.apply(void 0,arguments)}}function Od(t,e){return ar(4,2,t,e)}function Hd(t,e){return ar(4,4,t,e)}function Ud(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function kd(t,e,n){n=n!=null?n.concat([t]):null,ar(4,4,Ud.bind(null,e,t),n)}function ru(){}function Gd(t,e){var n=de();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&Zs(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function Ld(t,e){var n=de();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&Zs(e,a[1]))return a[0];if(a=t(),Ca){kt(!0);try{t()}finally{kt(!1)}}return n.memoizedState=[a,e],a}function su(t,e,n){return n===void 0||(_n&1073741824)!==0&&(jt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=Bf(),At.lanes|=t,In|=t,n)}function Pd(t,e,n,a){return Be(n,e)?n:Wa.current!==null?(t=su(t,n,a),Be(t,e)||(me=!0),t):(_n&42)===0||(_n&1073741824)!==0&&(jt&261930)===0?(me=!0,t.memoizedState=n):(t=Bf(),At.lanes|=t,In|=t,e)}function Bd(t,e,n,a,i){var s=B.p;B.p=s!==0&&8>s?s:8;var c=O.T,h={};O.T=h,cu(t,!1,e,n);try{var S=i(),j=O.S;if(j!==null&&j(h,S),S!==null&&typeof S=="object"&&typeof S.then=="function"){var L=gg(S,a);Fl(t,e,L,Xe(t))}else Fl(t,e,a,Xe(t))}catch(V){Fl(t,e,{then:function(){},status:"rejected",reason:V},Xe())}finally{B.p=s,c!==null&&h.types!==null&&(c.types=h.types),O.T=c}}function Ag(){}function uu(t,e,n,a){if(t.tag!==5)throw Error(o(476));var i=qd(t).queue;Bd(t,i,e,K,n===null?Ag:function(){return Vd(t),n(a)})}function qd(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:En,lastRenderedState:K},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:En,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Vd(t){var e=qd(t);e.next===null&&(e=t.alternate.memoizedState),Fl(t,e.next.queue,{},Xe())}function ou(){return Ee(si)}function Fd(){return de().memoizedState}function Yd(){return de().memoizedState}function Cg(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=Xe();t=Fn(n);var a=Yn(e,t,n);a!==null&&(Pe(a,e,n),Ll(a,e,n)),e={cache:Gs()},t.payload=e;return}e=e.return}}function Tg(t,e,n){var a=Xe();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},lr(t)?Xd(e,n):(n=Ns(t,e,n,a),n!==null&&(Pe(n,t,a),Qd(n,e,a)))}function Kd(t,e,n){var a=Xe();Fl(t,e,n,a)}function Fl(t,e,n,a){var i={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(lr(t))Xd(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var c=e.lastRenderedState,h=s(c,n);if(i.hasEagerState=!0,i.eagerState=h,Be(h,c))return Gi(t,e,i,0),$t===null&&ki(),!1}catch{}if(n=Ns(t,e,i,a),n!==null)return Pe(n,t,a),Qd(n,e,a),!0}return!1}function cu(t,e,n,a){if(a={lane:2,revertLane:qu(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},lr(t)){if(e)throw Error(o(479))}else e=Ns(t,n,a,2),e!==null&&Pe(e,t,2)}function lr(t){var e=t.alternate;return t===At||e!==null&&e===At}function Xd(t,e){tl=Ji=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Qd(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,Wo(t,n)}}var Yl={readContext:Ee,use:tr,useCallback:ue,useContext:ue,useEffect:ue,useImperativeHandle:ue,useLayoutEffect:ue,useInsertionEffect:ue,useMemo:ue,useReducer:ue,useRef:ue,useState:ue,useDebugValue:ue,useDeferredValue:ue,useTransition:ue,useSyncExternalStore:ue,useId:ue,useHostTransitionStatus:ue,useFormState:ue,useActionState:ue,useOptimistic:ue,useMemoCache:ue,useCacheRefresh:ue};Yl.useEffectEvent=ue;var Zd={readContext:Ee,use:tr,useCallback:function(t,e){return ze().memoizedState=[t,e===void 0?null:e],t},useContext:Ee,useEffect:Rd,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,nr(4194308,4,Ud.bind(null,e,t),n)},useLayoutEffect:function(t,e){return nr(4194308,4,t,e)},useInsertionEffect:function(t,e){nr(4,2,t,e)},useMemo:function(t,e){var n=ze();e=e===void 0?null:e;var a=t();if(Ca){kt(!0);try{t()}finally{kt(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=ze();if(n!==void 0){var i=n(e);if(Ca){kt(!0);try{n(e)}finally{kt(!1)}}}else i=e;return a.memoizedState=a.baseState=i,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},a.queue=t,t=t.dispatch=Tg.bind(null,At,t),[a.memoizedState,t]},useRef:function(t){var e=ze();return t={current:t},e.memoizedState=t},useState:function(t){t=au(t);var e=t.queue,n=Kd.bind(null,At,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:ru,useDeferredValue:function(t,e){var n=ze();return su(n,t,e)},useTransition:function(){var t=au(!1);return t=Bd.bind(null,At,t.queue,!0,!1),ze().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=At,i=ze();if(Ot){if(n===void 0)throw Error(o(407));n=n()}else{if(n=e(),$t===null)throw Error(o(349));(jt&127)!==0||gd(a,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Rd(yd.bind(null,a,s,t),[t]),a.flags|=2048,nl(9,{destroy:void 0},vd.bind(null,a,s,n,e),null),n},useId:function(){var t=ze(),e=$t.identifierPrefix;if(Ot){var n=fn,a=dn;n=(a&~(1<<32-ie(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=$i++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=vg++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:ou,useFormState:Nd,useActionState:Nd,useOptimistic:function(t){var e=ze();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=cu.bind(null,At,!0,n),n.dispatch=e,[t,e]},useMemoCache:tu,useCacheRefresh:function(){return ze().memoizedState=Cg.bind(null,At)},useEffectEvent:function(t){var e=ze(),n={impl:t};return e.memoizedState=n,function(){if((Vt&2)!==0)throw Error(o(440));return n.impl.apply(void 0,arguments)}}},du={readContext:Ee,use:tr,useCallback:Gd,useContext:Ee,useEffect:iu,useImperativeHandle:kd,useInsertionEffect:Od,useLayoutEffect:Hd,useMemo:Ld,useReducer:er,useRef:jd,useState:function(){return er(En)},useDebugValue:ru,useDeferredValue:function(t,e){var n=de();return Pd(n,Zt.memoizedState,t,e)},useTransition:function(){var t=er(En)[0],e=de().memoizedState;return[typeof t=="boolean"?t:Vl(t),e]},useSyncExternalStore:pd,useId:Fd,useHostTransitionStatus:ou,useFormState:wd,useActionState:wd,useOptimistic:function(t,e){var n=de();return xd(n,Zt,t,e)},useMemoCache:tu,useCacheRefresh:Yd};du.useEffectEvent=zd;var Id={readContext:Ee,use:tr,useCallback:Gd,useContext:Ee,useEffect:iu,useImperativeHandle:kd,useInsertionEffect:Od,useLayoutEffect:Hd,useMemo:Ld,useReducer:nu,useRef:jd,useState:function(){return nu(En)},useDebugValue:ru,useDeferredValue:function(t,e){var n=de();return Zt===null?su(n,t,e):Pd(n,Zt.memoizedState,t,e)},useTransition:function(){var t=nu(En)[0],e=de().memoizedState;return[typeof t=="boolean"?t:Vl(t),e]},useSyncExternalStore:pd,useId:Fd,useHostTransitionStatus:ou,useFormState:Dd,useActionState:Dd,useOptimistic:function(t,e){var n=de();return Zt!==null?xd(n,Zt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:tu,useCacheRefresh:Yd};Id.useEffectEvent=zd;function fu(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:g({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var hu={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=Xe(),i=Fn(a);i.payload=e,n!=null&&(i.callback=n),e=Yn(t,i,a),e!==null&&(Pe(e,t,a),Ll(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=Xe(),i=Fn(a);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=Yn(t,i,a),e!==null&&(Pe(e,t,a),Ll(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Xe(),a=Fn(n);a.tag=2,e!=null&&(a.callback=e),e=Yn(t,a,n),e!==null&&(Pe(e,t,n),Ll(e,t,n))}};function Jd(t,e,n,a,i,s,c){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,s,c):e.prototype&&e.prototype.isPureReactComponent?!jl(n,a)||!jl(i,s):!0}function $d(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&hu.enqueueReplaceState(e,e.state,null)}function Ta(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=g({},n));for(var i in t)n[i]===void 0&&(n[i]=t[i])}return n}function Wd(t){Ui(t)}function tf(t){console.error(t)}function ef(t){Ui(t)}function ir(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function nf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function mu(t,e,n){return n=Fn(n),n.tag=3,n.payload={element:null},n.callback=function(){ir(t,e)},n}function af(t){return t=Fn(t),t.tag=3,t}function lf(t,e,n,a){var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var s=a.value;t.payload=function(){return i(s)},t.callback=function(){nf(e,n,a)}}var c=n.stateNode;c!==null&&typeof c.componentDidCatch=="function"&&(t.callback=function(){nf(e,n,a),typeof i!="function"&&(Jn===null?Jn=new Set([this]):Jn.add(this));var h=a.stack;this.componentDidCatch(a.value,{componentStack:h!==null?h:""})})}function _g(t,e,n,a,i){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&Qa(e,n,i,!0),n=Ve.current,n!==null){switch(n.tag){case 31:case 13:return nn===null?vr():n.alternate===null&&oe===0&&(oe=3),n.flags&=-257,n.flags|=65536,n.lanes=i,a===Ki?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Lu(t,a,i)),!1;case 22:return n.flags|=65536,a===Ki?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Lu(t,a,i)),!1}throw Error(o(435,n.tag))}return Lu(t,a,i),vr(),!1}if(Ot)return e=Ve.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=i,a!==zs&&(t=Error(o(422),{cause:a}),Ol($e(t,n)))):(a!==zs&&(e=Error(o(423),{cause:a}),Ol($e(e,n))),t=t.current.alternate,t.flags|=65536,i&=-i,t.lanes|=i,a=$e(a,n),i=mu(t.stateNode,a,i),Fs(t,i),oe!==4&&(oe=2)),!1;var s=Error(o(520),{cause:a});if(s=$e(s,n),Wl===null?Wl=[s]:Wl.push(s),oe!==4&&(oe=2),e===null)return!0;a=$e(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=i&-i,n.lanes|=t,t=mu(n.stateNode,a,t),Fs(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(Jn===null||!Jn.has(s))))return n.flags|=65536,i&=-i,n.lanes|=i,i=af(i),lf(i,t,n,a),Fs(n,i),!1}n=n.return}while(n!==null);return!1}var pu=Error(o(461)),me=!1;function Ne(t,e,n,a){e.child=t===null?ud(e,null,n,a):Aa(e,t.child,n,a)}function rf(t,e,n,a,i){n=n.render;var s=e.ref;if("ref"in a){var c={};for(var h in a)h!=="ref"&&(c[h]=a[h])}else c=a;return ya(e),a=Is(t,e,n,c,s,i),h=Js(),t!==null&&!me?($s(t,e,i),Nn(t,e,i)):(Ot&&h&&js(e),e.flags|=1,Ne(t,e,a,i),e.child)}function sf(t,e,n,a,i){if(t===null){var s=n.type;return typeof s=="function"&&!ws(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,uf(t,e,s,a,i)):(t=Pi(n.type,null,a,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Cu(t,i)){var c=s.memoizedProps;if(n=n.compare,n=n!==null?n:jl,n(c,a)&&t.ref===e.ref)return Nn(t,e,i)}return e.flags|=1,t=xn(s,a),t.ref=e.ref,t.return=e,e.child=t}function uf(t,e,n,a,i){if(t!==null){var s=t.memoizedProps;if(jl(s,a)&&t.ref===e.ref)if(me=!1,e.pendingProps=a=s,Cu(t,i))(t.flags&131072)!==0&&(me=!0);else return e.lanes=t.lanes,Nn(t,e,i)}return gu(t,e,n,a,i)}function of(t,e,n,a){var i=a.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(s=s!==null?s.baseLanes|n:n,t!==null){for(a=e.child=t.child,i=0;a!==null;)i=i|a.lanes|a.childLanes,a=a.sibling;a=i&~s}else a=0,e.child=null;return cf(t,e,s,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Fi(e,s!==null?s.cachePool:null),s!==null?dd(e,s):Ks(),fd(e);else return a=e.lanes=536870912,cf(t,e,s!==null?s.baseLanes|n:n,n,a)}else s!==null?(Fi(e,s.cachePool),dd(e,s),Xn(),e.memoizedState=null):(t!==null&&Fi(e,null),Ks(),Xn());return Ne(t,e,i,n),e.child}function Kl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function cf(t,e,n,a,i){var s=Ps();return s=s===null?null:{parent:fe._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&Fi(e,null),Ks(),fd(e),t!==null&&Qa(t,e,a,!0),e.childLanes=i,null}function rr(t,e){return e=ur({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function df(t,e,n){return Aa(e,t.child,null,n),t=rr(e,e.pendingProps),t.flags|=2,Fe(e),e.memoizedState=null,t}function Eg(t,e,n){var a=e.pendingProps,i=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(Ot){if(a.mode==="hidden")return t=rr(e,a),e.lanes=536870912,Kl(null,t);if(Qs(e),(t=ae)?(t=Ch(t,en),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:Ln!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},n=Xc(t),n.return=e,e.child=n,_e=e,ae=null)):t=null,t===null)throw Bn(e);return e.lanes=536870912,null}return rr(e,a)}var s=t.memoizedState;if(s!==null){var c=s.dehydrated;if(Qs(e),i)if(e.flags&256)e.flags&=-257,e=df(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(o(558));else if(me||Qa(t,e,n,!1),i=(n&t.childLanes)!==0,me||i){if(a=$t,a!==null&&(c=tc(a,n),c!==0&&c!==s.retryLane))throw s.retryLane=c,ma(t,c),Pe(a,t,c),pu;vr(),e=df(t,e,n)}else t=s.treeContext,ae=an(c.nextSibling),_e=e,Ot=!0,Pn=null,en=!1,t!==null&&Ic(e,t),e=rr(e,a),e.flags|=4096;return e}return t=xn(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function sr(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(o(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function gu(t,e,n,a,i){return ya(e),n=Is(t,e,n,a,void 0,i),a=Js(),t!==null&&!me?($s(t,e,i),Nn(t,e,i)):(Ot&&a&&js(e),e.flags|=1,Ne(t,e,n,i),e.child)}function ff(t,e,n,a,i,s){return ya(e),e.updateQueue=null,n=md(e,a,n,i),hd(t),a=Js(),t!==null&&!me?($s(t,e,s),Nn(t,e,s)):(Ot&&a&&js(e),e.flags|=1,Ne(t,e,n,s),e.child)}function hf(t,e,n,a,i){if(ya(e),e.stateNode===null){var s=Fa,c=n.contextType;typeof c=="object"&&c!==null&&(s=Ee(c)),s=new n(a,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=hu,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=a,s.state=e.memoizedState,s.refs={},qs(e),c=n.contextType,s.context=typeof c=="object"&&c!==null?Ee(c):Fa,s.state=e.memoizedState,c=n.getDerivedStateFromProps,typeof c=="function"&&(fu(e,n,c,a),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(c=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),c!==s.state&&hu.enqueueReplaceState(s,s.state,null),Bl(e,a,s,i),Pl(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){s=e.stateNode;var h=e.memoizedProps,S=Ta(n,h);s.props=S;var j=s.context,L=n.contextType;c=Fa,typeof L=="object"&&L!==null&&(c=Ee(L));var V=n.getDerivedStateFromProps;L=typeof V=="function"||typeof s.getSnapshotBeforeUpdate=="function",h=e.pendingProps!==h,L||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(h||j!==c)&&$d(e,s,a,c),Vn=!1;var z=e.memoizedState;s.state=z,Bl(e,a,s,i),Pl(),j=e.memoizedState,h||z!==j||Vn?(typeof V=="function"&&(fu(e,n,V,a),j=e.memoizedState),(S=Vn||Jd(e,n,S,a,z,j,c))?(L||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=j),s.props=a,s.state=j,s.context=c,a=S):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{s=e.stateNode,Vs(t,e),c=e.memoizedProps,L=Ta(n,c),s.props=L,V=e.pendingProps,z=s.context,j=n.contextType,S=Fa,typeof j=="object"&&j!==null&&(S=Ee(j)),h=n.getDerivedStateFromProps,(j=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(c!==V||z!==S)&&$d(e,s,a,S),Vn=!1,z=e.memoizedState,s.state=z,Bl(e,a,s,i),Pl();var U=e.memoizedState;c!==V||z!==U||Vn||t!==null&&t.dependencies!==null&&qi(t.dependencies)?(typeof h=="function"&&(fu(e,n,h,a),U=e.memoizedState),(L=Vn||Jd(e,n,L,a,z,U,S)||t!==null&&t.dependencies!==null&&qi(t.dependencies))?(j||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(a,U,S),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(a,U,S)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||c===t.memoizedProps&&z===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&z===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=U),s.props=a,s.state=U,s.context=S,a=L):(typeof s.componentDidUpdate!="function"||c===t.memoizedProps&&z===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&z===t.memoizedState||(e.flags|=1024),a=!1)}return s=a,sr(t,e),a=(e.flags&128)!==0,s||a?(s=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&a?(e.child=Aa(e,t.child,null,i),e.child=Aa(e,null,n,i)):Ne(t,e,n,i),e.memoizedState=s.state,t=e.child):t=Nn(t,e,i),t}function mf(t,e,n,a){return ga(),e.flags|=256,Ne(t,e,n,a),e.child}var vu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function yu(t){return{baseLanes:t,cachePool:nd()}}function bu(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=Ke),t}function pf(t,e,n){var a=e.pendingProps,i=!1,s=(e.flags&128)!==0,c;if((c=s)||(c=t!==null&&t.memoizedState===null?!1:(ce.current&2)!==0),c&&(i=!0,e.flags&=-129),c=(e.flags&32)!==0,e.flags&=-33,t===null){if(Ot){if(i?Kn(e):Xn(),(t=ae)?(t=Ch(t,en),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:Ln!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},n=Xc(t),n.return=e,e.child=n,_e=e,ae=null)):t=null,t===null)throw Bn(e);return eo(t)?e.lanes=32:e.lanes=536870912,null}var h=a.children;return a=a.fallback,i?(Xn(),i=e.mode,h=ur({mode:"hidden",children:h},i),a=pa(a,i,n,null),h.return=e,a.return=e,h.sibling=a,e.child=h,a=e.child,a.memoizedState=yu(n),a.childLanes=bu(t,c,n),e.memoizedState=vu,Kl(null,a)):(Kn(e),Su(e,h))}var S=t.memoizedState;if(S!==null&&(h=S.dehydrated,h!==null)){if(s)e.flags&256?(Kn(e),e.flags&=-257,e=xu(t,e,n)):e.memoizedState!==null?(Xn(),e.child=t.child,e.flags|=128,e=null):(Xn(),h=a.fallback,i=e.mode,a=ur({mode:"visible",children:a.children},i),h=pa(h,i,n,null),h.flags|=2,a.return=e,h.return=e,a.sibling=h,e.child=a,Aa(e,t.child,null,n),a=e.child,a.memoizedState=yu(n),a.childLanes=bu(t,c,n),e.memoizedState=vu,e=Kl(null,a));else if(Kn(e),eo(h)){if(c=h.nextSibling&&h.nextSibling.dataset,c)var j=c.dgst;c=j,a=Error(o(419)),a.stack="",a.digest=c,Ol({value:a,source:null,stack:null}),e=xu(t,e,n)}else if(me||Qa(t,e,n,!1),c=(n&t.childLanes)!==0,me||c){if(c=$t,c!==null&&(a=tc(c,n),a!==0&&a!==S.retryLane))throw S.retryLane=a,ma(t,a),Pe(c,t,a),pu;to(h)||vr(),e=xu(t,e,n)}else to(h)?(e.flags|=192,e.child=t.child,e=null):(t=S.treeContext,ae=an(h.nextSibling),_e=e,Ot=!0,Pn=null,en=!1,t!==null&&Ic(e,t),e=Su(e,a.children),e.flags|=4096);return e}return i?(Xn(),h=a.fallback,i=e.mode,S=t.child,j=S.sibling,a=xn(S,{mode:"hidden",children:a.children}),a.subtreeFlags=S.subtreeFlags&65011712,j!==null?h=xn(j,h):(h=pa(h,i,n,null),h.flags|=2),h.return=e,a.return=e,a.sibling=h,e.child=a,Kl(null,a),a=e.child,h=t.child.memoizedState,h===null?h=yu(n):(i=h.cachePool,i!==null?(S=fe._currentValue,i=i.parent!==S?{parent:S,pool:S}:i):i=nd(),h={baseLanes:h.baseLanes|n,cachePool:i}),a.memoizedState=h,a.childLanes=bu(t,c,n),e.memoizedState=vu,Kl(t.child,a)):(Kn(e),n=t.child,t=n.sibling,n=xn(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(c=e.deletions,c===null?(e.deletions=[t],e.flags|=16):c.push(t)),e.child=n,e.memoizedState=null,n)}function Su(t,e){return e=ur({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function ur(t,e){return t=qe(22,t,null,e),t.lanes=0,t}function xu(t,e,n){return Aa(e,t.child,null,n),t=Su(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function gf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Us(t.return,e,n)}function Au(t,e,n,a,i,s){var c=t.memoizedState;c===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:i,treeForkCount:s}:(c.isBackwards=e,c.rendering=null,c.renderingStartTime=0,c.last=a,c.tail=n,c.tailMode=i,c.treeForkCount=s)}function vf(t,e,n){var a=e.pendingProps,i=a.revealOrder,s=a.tail;a=a.children;var c=ce.current,h=(c&2)!==0;if(h?(c=c&1|2,e.flags|=128):c&=1,T(ce,c),Ne(t,e,a,n),a=Ot?zl:0,!h&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&gf(t,n,e);else if(t.tag===19)gf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Ii(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Au(e,!1,i,n,s,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Ii(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Au(e,!0,n,null,s,a);break;case"together":Au(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Nn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),In|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(Qa(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(o(153));if(e.child!==null){for(t=e.child,n=xn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=xn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Cu(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&qi(t)))}function Ng(t,e,n){switch(e.tag){case 3:W(e,e.stateNode.containerInfo),qn(e,fe,t.memoizedState.cache),ga();break;case 27:case 5:bt(e);break;case 4:W(e,e.stateNode.containerInfo);break;case 10:qn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Qs(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(Kn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?pf(t,e,n):(Kn(e),t=Nn(t,e,n),t!==null?t.sibling:null);Kn(e);break;case 19:var i=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(Qa(t,e,n,!1),a=(n&e.childLanes)!==0),i){if(a)return vf(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),T(ce,ce.current),a)break;return null;case 22:return e.lanes=0,of(t,e,n,e.pendingProps);case 24:qn(e,fe,t.memoizedState.cache)}return Nn(t,e,n)}function yf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)me=!0;else{if(!Cu(t,n)&&(e.flags&128)===0)return me=!1,Ng(t,e,n);me=(t.flags&131072)!==0}else me=!1,Ot&&(e.flags&1048576)!==0&&Zc(e,zl,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=Sa(e.elementType),e.type=t,typeof t=="function")ws(t)?(a=Ta(t,a),e.tag=1,e=hf(null,e,t,a,n)):(e.tag=0,e=gu(null,e,t,a,n));else{if(t!=null){var i=t.$$typeof;if(i===Ht){e.tag=11,e=rf(null,e,t,a,n);break t}else if(i===k){e.tag=14,e=sf(null,e,t,a,n);break t}}throw e=vt(t)||t,Error(o(306,e,""))}}return e;case 0:return gu(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,i=Ta(a,e.pendingProps),hf(t,e,a,i,n);case 3:t:{if(W(e,e.stateNode.containerInfo),t===null)throw Error(o(387));a=e.pendingProps;var s=e.memoizedState;i=s.element,Vs(t,e),Bl(e,a,null,n);var c=e.memoizedState;if(a=c.cache,qn(e,fe,a),a!==s.cache&&ks(e,[fe],n,!0),Pl(),a=c.element,s.isDehydrated)if(s={element:a,isDehydrated:!1,cache:c.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=mf(t,e,a,n);break t}else if(a!==i){i=$e(Error(o(424)),e),Ol(i),e=mf(t,e,a,n);break t}else for(t=e.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,ae=an(t.firstChild),_e=e,Ot=!0,Pn=null,en=!0,n=ud(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ga(),a===i){e=Nn(t,e,n);break t}Ne(t,e,a,n)}e=e.child}return e;case 26:return sr(t,e),t===null?(n=Mh(e.type,null,e.pendingProps,null))?e.memoizedState=n:Ot||(n=e.type,t=e.pendingProps,a=Tr(Q.current).createElement(n),a[Te]=e,a[Oe]=t,we(a,n,t),be(a),e.stateNode=a):e.memoizedState=Mh(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return bt(e),t===null&&Ot&&(a=e.stateNode=Eh(e.type,e.pendingProps,Q.current),_e=e,en=!0,i=ae,ea(e.type)?(no=i,ae=an(a.firstChild)):ae=i),Ne(t,e,e.pendingProps.children,n),sr(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&Ot&&((i=a=ae)&&(a=av(a,e.type,e.pendingProps,en),a!==null?(e.stateNode=a,_e=e,ae=an(a.firstChild),en=!1,i=!0):i=!1),i||Bn(e)),bt(e),i=e.type,s=e.pendingProps,c=t!==null?t.memoizedProps:null,a=s.children,Ju(i,s)?a=null:c!==null&&Ju(i,c)&&(e.flags|=32),e.memoizedState!==null&&(i=Is(t,e,yg,null,null,n),si._currentValue=i),sr(t,e),Ne(t,e,a,n),e.child;case 6:return t===null&&Ot&&((t=n=ae)&&(n=lv(n,e.pendingProps,en),n!==null?(e.stateNode=n,_e=e,ae=null,t=!0):t=!1),t||Bn(e)),null;case 13:return pf(t,e,n);case 4:return W(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Aa(e,null,a,n):Ne(t,e,a,n),e.child;case 11:return rf(t,e,e.type,e.pendingProps,n);case 7:return Ne(t,e,e.pendingProps,n),e.child;case 8:return Ne(t,e,e.pendingProps.children,n),e.child;case 12:return Ne(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,qn(e,e.type,a.value),Ne(t,e,a.children,n),e.child;case 9:return i=e.type._context,a=e.pendingProps.children,ya(e),i=Ee(i),a=a(i),e.flags|=1,Ne(t,e,a,n),e.child;case 14:return sf(t,e,e.type,e.pendingProps,n);case 15:return uf(t,e,e.type,e.pendingProps,n);case 19:return vf(t,e,n);case 31:return Eg(t,e,n);case 22:return of(t,e,n,e.pendingProps);case 24:return ya(e),a=Ee(fe),t===null?(i=Ps(),i===null&&(i=$t,s=Gs(),i.pooledCache=s,s.refCount++,s!==null&&(i.pooledCacheLanes|=n),i=s),e.memoizedState={parent:a,cache:i},qs(e),qn(e,fe,i)):((t.lanes&n)!==0&&(Vs(t,e),Bl(e,null,null,n),Pl()),i=t.memoizedState,s=e.memoizedState,i.parent!==a?(i={parent:a,cache:a},e.memoizedState=i,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=i),qn(e,fe,a)):(a=s.cache,qn(e,fe,a),a!==i.cache&&ks(e,[fe],n,!0))),Ne(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(o(156,e.tag))}function wn(t){t.flags|=4}function Tu(t,e,n,a,i){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(i&335544128)===i)if(t.stateNode.complete)t.flags|=8192;else if(Yf())t.flags|=8192;else throw xa=Ki,Bs}else t.flags&=-16777217}function bf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Oh(e))if(Yf())t.flags|=8192;else throw xa=Ki,Bs}function or(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Jo():536870912,t.lanes|=e,rl|=e)}function Xl(t,e){if(!Ot)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function le(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags&65011712,a|=i.flags&65011712,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function wg(t,e,n){var a=e.pendingProps;switch(Rs(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return le(e),null;case 1:return le(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Tn(fe),nt(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Xa(e)?wn(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Os())),le(e),null;case 26:var i=e.type,s=e.memoizedState;return t===null?(wn(e),s!==null?(le(e),bf(e,s)):(le(e),Tu(e,i,null,a,n))):s?s!==t.memoizedState?(wn(e),le(e),bf(e,s)):(le(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&wn(e),le(e),Tu(e,i,t,a,n)),null;case 27:if(ht(e),n=Q.current,i=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&wn(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return le(e),null}t=R.current,Xa(e)?Jc(e):(t=Eh(i,a,n),e.stateNode=t,wn(e))}return le(e),null;case 5:if(ht(e),i=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&wn(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return le(e),null}if(s=R.current,Xa(e))Jc(e);else{var c=Tr(Q.current);switch(s){case 1:s=c.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:s=c.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":s=c.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":s=c.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":s=c.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof a.is=="string"?c.createElement("select",{is:a.is}):c.createElement("select"),a.multiple?s.multiple=!0:a.size&&(s.size=a.size);break;default:s=typeof a.is=="string"?c.createElement(i,{is:a.is}):c.createElement(i)}}s[Te]=e,s[Oe]=a;t:for(c=e.child;c!==null;){if(c.tag===5||c.tag===6)s.appendChild(c.stateNode);else if(c.tag!==4&&c.tag!==27&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===e)break t;for(;c.sibling===null;){if(c.return===null||c.return===e)break t;c=c.return}c.sibling.return=c.return,c=c.sibling}e.stateNode=s;t:switch(we(s,i,a),i){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&wn(e)}}return le(e),Tu(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&wn(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(o(166));if(t=Q.current,Xa(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,i=_e,i!==null)switch(i.tag){case 27:case 5:a=i.memoizedProps}t[Te]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||ph(t.nodeValue,n)),t||Bn(e,!0)}else t=Tr(t).createTextNode(a),t[Te]=e,e.stateNode=t}return le(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=Xa(e),n!==null){if(t===null){if(!a)throw Error(o(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(557));t[Te]=e}else ga(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;le(e),t=!1}else n=Os(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Fe(e),e):(Fe(e),null);if((e.flags&128)!==0)throw Error(o(558))}return le(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(i=Xa(e),a!==null&&a.dehydrated!==null){if(t===null){if(!i)throw Error(o(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(o(317));i[Te]=e}else ga(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;le(e),i=!1}else i=Os(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=i),i=!0;if(!i)return e.flags&256?(Fe(e),e):(Fe(e),null)}return Fe(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,i=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(i=a.alternate.memoizedState.cachePool.pool),s=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(s=a.memoizedState.cachePool.pool),s!==i&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),or(e,e.updateQueue),le(e),null);case 4:return nt(),t===null&&Ku(e.stateNode.containerInfo),le(e),null;case 10:return Tn(e.type),le(e),null;case 19:if(x(ce),a=e.memoizedState,a===null)return le(e),null;if(i=(e.flags&128)!==0,s=a.rendering,s===null)if(i)Xl(a,!1);else{if(oe!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(s=Ii(t),s!==null){for(e.flags|=128,Xl(a,!1),t=s.updateQueue,e.updateQueue=t,or(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)Kc(n,t),n=n.sibling;return T(ce,ce.current&1|2),Ot&&An(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&Ut()>mr&&(e.flags|=128,i=!0,Xl(a,!1),e.lanes=4194304)}else{if(!i)if(t=Ii(s),t!==null){if(e.flags|=128,i=!0,t=t.updateQueue,e.updateQueue=t,or(e,t),Xl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!s.alternate&&!Ot)return le(e),null}else 2*Ut()-a.renderingStartTime>mr&&n!==536870912&&(e.flags|=128,i=!0,Xl(a,!1),e.lanes=4194304);a.isBackwards?(s.sibling=e.child,e.child=s):(t=a.last,t!==null?t.sibling=s:e.child=s,a.last=s)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Ut(),t.sibling=null,n=ce.current,T(ce,i?n&1|2:n&1),Ot&&An(e,a.treeForkCount),t):(le(e),null);case 22:case 23:return Fe(e),Xs(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(le(e),e.subtreeFlags&6&&(e.flags|=8192)):le(e),n=e.updateQueue,n!==null&&or(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&x(ba),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Tn(fe),le(e),null;case 25:return null;case 30:return null}throw Error(o(156,e.tag))}function Mg(t,e){switch(Rs(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Tn(fe),nt(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return ht(e),null;case 31:if(e.memoizedState!==null){if(Fe(e),e.alternate===null)throw Error(o(340));ga()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Fe(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(o(340));ga()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return x(ce),null;case 4:return nt(),null;case 10:return Tn(e.type),null;case 22:case 23:return Fe(e),Xs(),t!==null&&x(ba),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Tn(fe),null;case 25:return null;default:return null}}function Sf(t,e){switch(Rs(e),e.tag){case 3:Tn(fe),nt();break;case 26:case 27:case 5:ht(e);break;case 4:nt();break;case 31:e.memoizedState!==null&&Fe(e);break;case 13:Fe(e);break;case 19:x(ce);break;case 10:Tn(e.type);break;case 22:case 23:Fe(e),Xs(),t!==null&&x(ba);break;case 24:Tn(fe)}}function Ql(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var i=a.next;n=i;do{if((n.tag&t)===t){a=void 0;var s=n.create,c=n.inst;a=s(),c.destroy=a}n=n.next}while(n!==i)}}catch(h){Xt(e,e.return,h)}}function Qn(t,e,n){try{var a=e.updateQueue,i=a!==null?a.lastEffect:null;if(i!==null){var s=i.next;a=s;do{if((a.tag&t)===t){var c=a.inst,h=c.destroy;if(h!==void 0){c.destroy=void 0,i=e;var S=n,j=h;try{j()}catch(L){Xt(i,S,L)}}}a=a.next}while(a!==s)}}catch(L){Xt(e,e.return,L)}}function xf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{cd(e,n)}catch(a){Xt(t,t.return,a)}}}function Af(t,e,n){n.props=Ta(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){Xt(t,e,a)}}function Zl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(i){Xt(t,e,i)}}function hn(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(i){Xt(t,e,i)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(i){Xt(t,e,i)}else n.current=null}function Cf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(i){Xt(t,t.return,i)}}function _u(t,e,n){try{var a=t.stateNode;Jg(a,t.type,n,e),a[Oe]=e}catch(i){Xt(t,t.return,i)}}function Tf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ea(t.type)||t.tag===4}function Eu(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Tf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ea(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Nu(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=bn));else if(a!==4&&(a===27&&ea(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Nu(t,e,n),t=t.sibling;t!==null;)Nu(t,e,n),t=t.sibling}function cr(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&ea(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(cr(t,e,n),t=t.sibling;t!==null;)cr(t,e,n),t=t.sibling}function _f(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,i=e.attributes;i.length;)e.removeAttributeNode(i[0]);we(e,a,n),e[Te]=t,e[Oe]=n}catch(s){Xt(t,t.return,s)}}var Mn=!1,pe=!1,wu=!1,Ef=typeof WeakSet=="function"?WeakSet:Set,Se=null;function Dg(t,e){if(t=t.containerInfo,Zu=jr,t=kc(t),xs(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var i=a.anchorOffset,s=a.focusNode;a=a.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break t}var c=0,h=-1,S=-1,j=0,L=0,V=t,z=null;e:for(;;){for(var U;V!==n||i!==0&&V.nodeType!==3||(h=c+i),V!==s||a!==0&&V.nodeType!==3||(S=c+a),V.nodeType===3&&(c+=V.nodeValue.length),(U=V.firstChild)!==null;)z=V,V=U;for(;;){if(V===t)break e;if(z===n&&++j===i&&(h=c),z===s&&++L===a&&(S=c),(U=V.nextSibling)!==null)break;V=z,z=V.parentNode}V=U}n=h===-1||S===-1?null:{start:h,end:S}}else n=null}n=n||{start:0,end:0}}else n=null;for(Iu={focusedElem:t,selectionRange:n},jr=!1,Se=e;Se!==null;)if(e=Se,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Se=t;else for(;Se!==null;){switch(e=Se,s=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)i=t[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&s!==null){t=void 0,n=e,i=s.memoizedProps,s=s.memoizedState,a=n.stateNode;try{var it=Ta(n.type,i);t=a.getSnapshotBeforeUpdate(it,s),a.__reactInternalSnapshotBeforeUpdate=t}catch(pt){Xt(n,n.return,pt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Wu(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Wu(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(o(163))}if(t=e.sibling,t!==null){t.return=e.return,Se=t;break}Se=e.return}}function Nf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:jn(t,n),a&4&&Ql(5,n);break;case 1:if(jn(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(c){Xt(n,n.return,c)}else{var i=Ta(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(i,e,t.__reactInternalSnapshotBeforeUpdate)}catch(c){Xt(n,n.return,c)}}a&64&&xf(n),a&512&&Zl(n,n.return);break;case 3:if(jn(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{cd(t,e)}catch(c){Xt(n,n.return,c)}}break;case 27:e===null&&a&4&&_f(n);case 26:case 5:jn(t,n),e===null&&a&4&&Cf(n),a&512&&Zl(n,n.return);break;case 12:jn(t,n);break;case 31:jn(t,n),a&4&&Df(t,n);break;case 13:jn(t,n),a&4&&jf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Lg.bind(null,n),iv(t,n))));break;case 22:if(a=n.memoizedState!==null||Mn,!a){e=e!==null&&e.memoizedState!==null||pe,i=Mn;var s=pe;Mn=a,(pe=e)&&!s?Rn(t,n,(n.subtreeFlags&8772)!==0):jn(t,n),Mn=i,pe=s}break;case 30:break;default:jn(t,n)}}function wf(t){var e=t.alternate;e!==null&&(t.alternate=null,wf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ls(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var re=null,Ue=!1;function Dn(t,e,n){for(n=n.child;n!==null;)Mf(t,e,n),n=n.sibling}function Mf(t,e,n){if(et&&typeof et.onCommitFiberUnmount=="function")try{et.onCommitFiberUnmount(H,n)}catch{}switch(n.tag){case 26:pe||hn(n,e),Dn(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:pe||hn(n,e);var a=re,i=Ue;ea(n.type)&&(re=n.stateNode,Ue=!1),Dn(t,e,n),li(n.stateNode),re=a,Ue=i;break;case 5:pe||hn(n,e);case 6:if(a=re,i=Ue,re=null,Dn(t,e,n),re=a,Ue=i,re!==null)if(Ue)try{(re.nodeType===9?re.body:re.nodeName==="HTML"?re.ownerDocument.body:re).removeChild(n.stateNode)}catch(s){Xt(n,e,s)}else try{re.removeChild(n.stateNode)}catch(s){Xt(n,e,s)}break;case 18:re!==null&&(Ue?(t=re,xh(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ml(t)):xh(re,n.stateNode));break;case 4:a=re,i=Ue,re=n.stateNode.containerInfo,Ue=!0,Dn(t,e,n),re=a,Ue=i;break;case 0:case 11:case 14:case 15:Qn(2,n,e),pe||Qn(4,n,e),Dn(t,e,n);break;case 1:pe||(hn(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Af(n,e,a)),Dn(t,e,n);break;case 21:Dn(t,e,n);break;case 22:pe=(a=pe)||n.memoizedState!==null,Dn(t,e,n),pe=a;break;default:Dn(t,e,n)}}function Df(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ml(t)}catch(n){Xt(e,e.return,n)}}}function jf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ml(t)}catch(n){Xt(e,e.return,n)}}function jg(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Ef),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Ef),e;default:throw Error(o(435,t.tag))}}function dr(t,e){var n=jg(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var i=Pg.bind(null,t,a);a.then(i,i)}})}function ke(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var i=n[a],s=t,c=e,h=c;t:for(;h!==null;){switch(h.tag){case 27:if(ea(h.type)){re=h.stateNode,Ue=!1;break t}break;case 5:re=h.stateNode,Ue=!1;break t;case 3:case 4:re=h.stateNode.containerInfo,Ue=!0;break t}h=h.return}if(re===null)throw Error(o(160));Mf(s,c,i),re=null,Ue=!1,s=i.alternate,s!==null&&(s.return=null),i.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Rf(e,t),e=e.sibling}var on=null;function Rf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:ke(e,t),Ge(t),a&4&&(Qn(3,t,t.return),Ql(3,t),Qn(5,t,t.return));break;case 1:ke(e,t),Ge(t),a&512&&(pe||n===null||hn(n,n.return)),a&64&&Mn&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var i=on;if(ke(e,t),Ge(t),a&512&&(pe||n===null||hn(n,n.return)),a&4){var s=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,i=i.ownerDocument||i;e:switch(a){case"title":s=i.getElementsByTagName("title")[0],(!s||s[Al]||s[Te]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=i.createElement(a),i.head.insertBefore(s,i.querySelector("head > title"))),we(s,a,n),s[Te]=t,be(s),a=s;break t;case"link":var c=Rh("link","href",i).get(a+(n.href||""));if(c){for(var h=0;h<c.length;h++)if(s=c[h],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){c.splice(h,1);break e}}s=i.createElement(a),we(s,a,n),i.head.appendChild(s);break;case"meta":if(c=Rh("meta","content",i).get(a+(n.content||""))){for(h=0;h<c.length;h++)if(s=c[h],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){c.splice(h,1);break e}}s=i.createElement(a),we(s,a,n),i.head.appendChild(s);break;default:throw Error(o(468,a))}s[Te]=t,be(s),a=s}t.stateNode=a}else zh(i,t.type,t.stateNode);else t.stateNode=jh(i,a,t.memoizedProps);else s!==a?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,a===null?zh(i,t.type,t.stateNode):jh(i,a,t.memoizedProps)):a===null&&t.stateNode!==null&&_u(t,t.memoizedProps,n.memoizedProps)}break;case 27:ke(e,t),Ge(t),a&512&&(pe||n===null||hn(n,n.return)),n!==null&&a&4&&_u(t,t.memoizedProps,n.memoizedProps);break;case 5:if(ke(e,t),Ge(t),a&512&&(pe||n===null||hn(n,n.return)),t.flags&32){i=t.stateNode;try{ka(i,"")}catch(it){Xt(t,t.return,it)}}a&4&&t.stateNode!=null&&(i=t.memoizedProps,_u(t,i,n!==null?n.memoizedProps:i)),a&1024&&(wu=!0);break;case 6:if(ke(e,t),Ge(t),a&4){if(t.stateNode===null)throw Error(o(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(it){Xt(t,t.return,it)}}break;case 3:if(Nr=null,i=on,on=_r(e.containerInfo),ke(e,t),on=i,Ge(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ml(e.containerInfo)}catch(it){Xt(t,t.return,it)}wu&&(wu=!1,zf(t));break;case 4:a=on,on=_r(t.stateNode.containerInfo),ke(e,t),Ge(t),on=a;break;case 12:ke(e,t),Ge(t);break;case 31:ke(e,t),Ge(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,dr(t,a)));break;case 13:ke(e,t),Ge(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(hr=Ut()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,dr(t,a)));break;case 22:i=t.memoizedState!==null;var S=n!==null&&n.memoizedState!==null,j=Mn,L=pe;if(Mn=j||i,pe=L||S,ke(e,t),pe=L,Mn=j,Ge(t),a&8192)t:for(e=t.stateNode,e._visibility=i?e._visibility&-2:e._visibility|1,i&&(n===null||S||Mn||pe||_a(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){S=n=e;try{if(s=S.stateNode,i)c=s.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none";else{h=S.stateNode;var V=S.memoizedProps.style,z=V!=null&&V.hasOwnProperty("display")?V.display:null;h.style.display=z==null||typeof z=="boolean"?"":(""+z).trim()}}catch(it){Xt(S,S.return,it)}}}else if(e.tag===6){if(n===null){S=e;try{S.stateNode.nodeValue=i?"":S.memoizedProps}catch(it){Xt(S,S.return,it)}}}else if(e.tag===18){if(n===null){S=e;try{var U=S.stateNode;i?Ah(U,!0):Ah(S.stateNode,!1)}catch(it){Xt(S,S.return,it)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,dr(t,n))));break;case 19:ke(e,t),Ge(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,dr(t,a)));break;case 30:break;case 21:break;default:ke(e,t),Ge(t)}}function Ge(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Tf(a)){n=a;break}a=a.return}if(n==null)throw Error(o(160));switch(n.tag){case 27:var i=n.stateNode,s=Eu(t);cr(t,s,i);break;case 5:var c=n.stateNode;n.flags&32&&(ka(c,""),n.flags&=-33);var h=Eu(t);cr(t,h,c);break;case 3:case 4:var S=n.stateNode.containerInfo,j=Eu(t);Nu(t,j,S);break;default:throw Error(o(161))}}catch(L){Xt(t,t.return,L)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function zf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;zf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function jn(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Nf(t,e.alternate,e),e=e.sibling}function _a(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Qn(4,e,e.return),_a(e);break;case 1:hn(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Af(e,e.return,n),_a(e);break;case 27:li(e.stateNode);case 26:case 5:hn(e,e.return),_a(e);break;case 22:e.memoizedState===null&&_a(e);break;case 30:_a(e);break;default:_a(e)}t=t.sibling}}function Rn(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,i=t,s=e,c=s.flags;switch(s.tag){case 0:case 11:case 15:Rn(i,s,n),Ql(4,s);break;case 1:if(Rn(i,s,n),a=s,i=a.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(j){Xt(a,a.return,j)}if(a=s,i=a.updateQueue,i!==null){var h=a.stateNode;try{var S=i.shared.hiddenCallbacks;if(S!==null)for(i.shared.hiddenCallbacks=null,i=0;i<S.length;i++)od(S[i],h)}catch(j){Xt(a,a.return,j)}}n&&c&64&&xf(s),Zl(s,s.return);break;case 27:_f(s);case 26:case 5:Rn(i,s,n),n&&a===null&&c&4&&Cf(s),Zl(s,s.return);break;case 12:Rn(i,s,n);break;case 31:Rn(i,s,n),n&&c&4&&Df(i,s);break;case 13:Rn(i,s,n),n&&c&4&&jf(i,s);break;case 22:s.memoizedState===null&&Rn(i,s,n),Zl(s,s.return);break;case 30:break;default:Rn(i,s,n)}e=e.sibling}}function Mu(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Hl(n))}function Du(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Hl(t))}function cn(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Of(t,e,n,a),e=e.sibling}function Of(t,e,n,a){var i=e.flags;switch(e.tag){case 0:case 11:case 15:cn(t,e,n,a),i&2048&&Ql(9,e);break;case 1:cn(t,e,n,a);break;case 3:cn(t,e,n,a),i&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Hl(t)));break;case 12:if(i&2048){cn(t,e,n,a),t=e.stateNode;try{var s=e.memoizedProps,c=s.id,h=s.onPostCommit;typeof h=="function"&&h(c,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(S){Xt(e,e.return,S)}}else cn(t,e,n,a);break;case 31:cn(t,e,n,a);break;case 13:cn(t,e,n,a);break;case 23:break;case 22:s=e.stateNode,c=e.alternate,e.memoizedState!==null?s._visibility&2?cn(t,e,n,a):Il(t,e):s._visibility&2?cn(t,e,n,a):(s._visibility|=2,al(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),i&2048&&Mu(c,e);break;case 24:cn(t,e,n,a),i&2048&&Du(e.alternate,e);break;default:cn(t,e,n,a)}}function al(t,e,n,a,i){for(i=i&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,c=e,h=n,S=a,j=c.flags;switch(c.tag){case 0:case 11:case 15:al(s,c,h,S,i),Ql(8,c);break;case 23:break;case 22:var L=c.stateNode;c.memoizedState!==null?L._visibility&2?al(s,c,h,S,i):Il(s,c):(L._visibility|=2,al(s,c,h,S,i)),i&&j&2048&&Mu(c.alternate,c);break;case 24:al(s,c,h,S,i),i&&j&2048&&Du(c.alternate,c);break;default:al(s,c,h,S,i)}e=e.sibling}}function Il(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,i=a.flags;switch(a.tag){case 22:Il(n,a),i&2048&&Mu(a.alternate,a);break;case 24:Il(n,a),i&2048&&Du(a.alternate,a);break;default:Il(n,a)}e=e.sibling}}var Jl=8192;function ll(t,e,n){if(t.subtreeFlags&Jl)for(t=t.child;t!==null;)Hf(t,e,n),t=t.sibling}function Hf(t,e,n){switch(t.tag){case 26:ll(t,e,n),t.flags&Jl&&t.memoizedState!==null&&vv(n,on,t.memoizedState,t.memoizedProps);break;case 5:ll(t,e,n);break;case 3:case 4:var a=on;on=_r(t.stateNode.containerInfo),ll(t,e,n),on=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=Jl,Jl=16777216,ll(t,e,n),Jl=a):ll(t,e,n));break;default:ll(t,e,n)}}function Uf(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function $l(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Se=a,Gf(a,t)}Uf(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)kf(t),t=t.sibling}function kf(t){switch(t.tag){case 0:case 11:case 15:$l(t),t.flags&2048&&Qn(9,t,t.return);break;case 3:$l(t);break;case 12:$l(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,fr(t)):$l(t);break;default:$l(t)}}function fr(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Se=a,Gf(a,t)}Uf(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Qn(8,e,e.return),fr(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,fr(e));break;default:fr(e)}t=t.sibling}}function Gf(t,e){for(;Se!==null;){var n=Se;switch(n.tag){case 0:case 11:case 15:Qn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Hl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Se=a;else t:for(n=t;Se!==null;){a=Se;var i=a.sibling,s=a.return;if(wf(a),a===n){Se=null;break t}if(i!==null){i.return=s,Se=i;break t}Se=s}}}var Rg={getCacheForType:function(t){var e=Ee(fe),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ee(fe).controller.signal}},zg=typeof WeakMap=="function"?WeakMap:Map,Vt=0,$t=null,Mt=null,jt=0,Kt=0,Ye=null,Zn=!1,il=!1,ju=!1,zn=0,oe=0,In=0,Ea=0,Ru=0,Ke=0,rl=0,Wl=null,Le=null,zu=!1,hr=0,Lf=0,mr=1/0,pr=null,Jn=null,ve=0,$n=null,sl=null,On=0,Ou=0,Hu=null,Pf=null,ti=0,Uu=null;function Xe(){return(Vt&2)!==0&&jt!==0?jt&-jt:O.T!==null?qu():ec()}function Bf(){if(Ke===0)if((jt&536870912)===0||Ot){var t=oa;oa<<=1,(oa&3932160)===0&&(oa=262144),Ke=t}else Ke=536870912;return t=Ve.current,t!==null&&(t.flags|=32),Ke}function Pe(t,e,n){(t===$t&&(Kt===2||Kt===9)||t.cancelPendingCommit!==null)&&(ul(t,0),Wn(t,jt,Ke,!1)),xl(t,n),((Vt&2)===0||t!==$t)&&(t===$t&&((Vt&2)===0&&(Ea|=n),oe===4&&Wn(t,jt,Ke,!1)),mn(t))}function qf(t,e,n){if((Vt&6)!==0)throw Error(o(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||vn(t,e),i=a?Ug(t,e):Gu(t,e,!0),s=a;do{if(i===0){il&&!a&&Wn(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!Og(n)){i=Gu(t,e,!1),s=!1;continue}if(i===2){if(s=e,t.errorRecoveryDisabledLanes&s)var c=0;else c=t.pendingLanes&-536870913,c=c!==0?c:c&536870912?536870912:0;if(c!==0){e=c;t:{var h=t;i=Wl;var S=h.current.memoizedState.isDehydrated;if(S&&(ul(h,c).flags|=256),c=Gu(h,c,!1),c!==2){if(ju&&!S){h.errorRecoveryDisabledLanes|=s,Ea|=s,i=4;break t}s=Le,Le=i,s!==null&&(Le===null?Le=s:Le.push.apply(Le,s))}i=c}if(s=!1,i!==2)continue}}if(i===1){ul(t,0),Wn(t,e,0,!0);break}t:{switch(a=t,s=i,s){case 0:case 1:throw Error(o(345));case 4:if((e&4194048)!==e)break;case 6:Wn(a,e,Ke,!Zn);break t;case 2:Le=null;break;case 3:case 5:break;default:throw Error(o(329))}if((e&62914560)===e&&(i=hr+300-Ut(),10<i)){if(Wn(a,e,Ke,!Zn),Da(a,0,!0)!==0)break t;On=e,a.timeoutHandle=bh(Vf.bind(null,a,n,Le,pr,zu,e,Ke,Ea,rl,Zn,s,"Throttled",-0,0),i);break t}Vf(a,n,Le,pr,zu,e,Ke,Ea,rl,Zn,s,null,-0,0)}}break}while(!0);mn(t)}function Vf(t,e,n,a,i,s,c,h,S,j,L,V,z,U){if(t.timeoutHandle=-1,V=e.subtreeFlags,V&8192||(V&16785408)===16785408){V={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:bn},Hf(e,s,V);var it=(s&62914560)===s?hr-Ut():(s&4194048)===s?Lf-Ut():0;if(it=yv(V,it),it!==null){On=s,t.cancelPendingCommit=it(Jf.bind(null,t,e,s,n,a,i,c,h,S,L,V,null,z,U)),Wn(t,s,c,!j);return}}Jf(t,e,s,n,a,i,c,h,S)}function Og(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var i=n[a],s=i.getSnapshot;i=i.value;try{if(!Be(s(),i))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Wn(t,e,n,a){e&=~Ru,e&=~Ea,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var i=e;0<i;){var s=31-ie(i),c=1<<s;a[s]=-1,i&=~c}n!==0&&$o(t,n,e)}function gr(){return(Vt&6)===0?(ei(0),!1):!0}function ku(){if(Mt!==null){if(Kt===0)var t=Mt.return;else t=Mt,Cn=va=null,Ws(t),$a=null,kl=0,t=Mt;for(;t!==null;)Sf(t.alternate,t),t=t.return;Mt=null}}function ul(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,tv(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),On=0,ku(),$t=t,Mt=n=xn(t.current,null),jt=e,Kt=0,Ye=null,Zn=!1,il=vn(t,e),ju=!1,rl=Ke=Ru=Ea=In=oe=0,Le=Wl=null,zu=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var i=31-ie(a),s=1<<i;e|=t[i],a&=~s}return zn=e,ki(),n}function Ff(t,e){At=null,O.H=Yl,e===Ja||e===Yi?(e=id(),Kt=3):e===Bs?(e=id(),Kt=4):Kt=e===pu?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Ye=e,Mt===null&&(oe=1,ir(t,$e(e,t.current)))}function Yf(){var t=Ve.current;return t===null?!0:(jt&4194048)===jt?nn===null:(jt&62914560)===jt||(jt&536870912)!==0?t===nn:!1}function Kf(){var t=O.H;return O.H=Yl,t===null?Yl:t}function Xf(){var t=O.A;return O.A=Rg,t}function vr(){oe=4,Zn||(jt&4194048)!==jt&&Ve.current!==null||(il=!0),(In&134217727)===0&&(Ea&134217727)===0||$t===null||Wn($t,jt,Ke,!1)}function Gu(t,e,n){var a=Vt;Vt|=2;var i=Kf(),s=Xf();($t!==t||jt!==e)&&(pr=null,ul(t,e)),e=!1;var c=oe;t:do try{if(Kt!==0&&Mt!==null){var h=Mt,S=Ye;switch(Kt){case 8:ku(),c=6;break t;case 3:case 2:case 9:case 6:Ve.current===null&&(e=!0);var j=Kt;if(Kt=0,Ye=null,ol(t,h,S,j),n&&il){c=0;break t}break;default:j=Kt,Kt=0,Ye=null,ol(t,h,S,j)}}Hg(),c=oe;break}catch(L){Ff(t,L)}while(!0);return e&&t.shellSuspendCounter++,Cn=va=null,Vt=a,O.H=i,O.A=s,Mt===null&&($t=null,jt=0,ki()),c}function Hg(){for(;Mt!==null;)Qf(Mt)}function Ug(t,e){var n=Vt;Vt|=2;var a=Kf(),i=Xf();$t!==t||jt!==e?(pr=null,mr=Ut()+500,ul(t,e)):il=vn(t,e);t:do try{if(Kt!==0&&Mt!==null){e=Mt;var s=Ye;e:switch(Kt){case 1:Kt=0,Ye=null,ol(t,e,s,1);break;case 2:case 9:if(ad(s)){Kt=0,Ye=null,Zf(e);break}e=function(){Kt!==2&&Kt!==9||$t!==t||(Kt=7),mn(t)},s.then(e,e);break t;case 3:Kt=7;break t;case 4:Kt=5;break t;case 7:ad(s)?(Kt=0,Ye=null,Zf(e)):(Kt=0,Ye=null,ol(t,e,s,7));break;case 5:var c=null;switch(Mt.tag){case 26:c=Mt.memoizedState;case 5:case 27:var h=Mt;if(c?Oh(c):h.stateNode.complete){Kt=0,Ye=null;var S=h.sibling;if(S!==null)Mt=S;else{var j=h.return;j!==null?(Mt=j,yr(j)):Mt=null}break e}}Kt=0,Ye=null,ol(t,e,s,5);break;case 6:Kt=0,Ye=null,ol(t,e,s,6);break;case 8:ku(),oe=6;break t;default:throw Error(o(462))}}kg();break}catch(L){Ff(t,L)}while(!0);return Cn=va=null,O.H=a,O.A=i,Vt=n,Mt!==null?0:($t=null,jt=0,ki(),oe)}function kg(){for(;Mt!==null&&!xe();)Qf(Mt)}function Qf(t){var e=yf(t.alternate,t,zn);t.memoizedProps=t.pendingProps,e===null?yr(t):Mt=e}function Zf(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=ff(n,e,e.pendingProps,e.type,void 0,jt);break;case 11:e=ff(n,e,e.pendingProps,e.type.render,e.ref,jt);break;case 5:Ws(e);default:Sf(n,e),e=Mt=Kc(e,zn),e=yf(n,e,zn)}t.memoizedProps=t.pendingProps,e===null?yr(t):Mt=e}function ol(t,e,n,a){Cn=va=null,Ws(e),$a=null,kl=0;var i=e.return;try{if(_g(t,i,e,n,jt)){oe=1,ir(t,$e(n,t.current)),Mt=null;return}}catch(s){if(i!==null)throw Mt=i,s;oe=1,ir(t,$e(n,t.current)),Mt=null;return}e.flags&32768?(Ot||a===1?t=!0:il||(jt&536870912)!==0?t=!1:(Zn=t=!0,(a===2||a===9||a===3||a===6)&&(a=Ve.current,a!==null&&a.tag===13&&(a.flags|=16384))),If(e,t)):yr(e)}function yr(t){var e=t;do{if((e.flags&32768)!==0){If(e,Zn);return}t=e.return;var n=wg(e.alternate,e,zn);if(n!==null){Mt=n;return}if(e=e.sibling,e!==null){Mt=e;return}Mt=e=t}while(e!==null);oe===0&&(oe=5)}function If(t,e){do{var n=Mg(t.alternate,t);if(n!==null){n.flags&=32767,Mt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){Mt=t;return}Mt=t=n}while(t!==null);oe=6,Mt=null}function Jf(t,e,n,a,i,s,c,h,S){t.cancelPendingCommit=null;do br();while(ve!==0);if((Vt&6)!==0)throw Error(o(327));if(e!==null){if(e===t.current)throw Error(o(177));if(s=e.lanes|e.childLanes,s|=Es,gp(t,n,s,c,h,S),t===$t&&(Mt=$t=null,jt=0),sl=e,$n=t,On=n,Ou=s,Hu=i,Pf=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Bg(ge,function(){return nh(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=O.T,O.T=null,i=B.p,B.p=2,c=Vt,Vt|=4;try{Dg(t,e,n)}finally{Vt=c,B.p=i,O.T=a}}ve=1,$f(),Wf(),th()}}function $f(){if(ve===1){ve=0;var t=$n,e=sl,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=O.T,O.T=null;var a=B.p;B.p=2;var i=Vt;Vt|=4;try{Rf(e,t);var s=Iu,c=kc(t.containerInfo),h=s.focusedElem,S=s.selectionRange;if(c!==h&&h&&h.ownerDocument&&Uc(h.ownerDocument.documentElement,h)){if(S!==null&&xs(h)){var j=S.start,L=S.end;if(L===void 0&&(L=j),"selectionStart"in h)h.selectionStart=j,h.selectionEnd=Math.min(L,h.value.length);else{var V=h.ownerDocument||document,z=V&&V.defaultView||window;if(z.getSelection){var U=z.getSelection(),it=h.textContent.length,pt=Math.min(S.start,it),Jt=S.end===void 0?pt:Math.min(S.end,it);!U.extend&&pt>Jt&&(c=Jt,Jt=pt,pt=c);var M=Hc(h,pt),_=Hc(h,Jt);if(M&&_&&(U.rangeCount!==1||U.anchorNode!==M.node||U.anchorOffset!==M.offset||U.focusNode!==_.node||U.focusOffset!==_.offset)){var D=V.createRange();D.setStart(M.node,M.offset),U.removeAllRanges(),pt>Jt?(U.addRange(D),U.extend(_.node,_.offset)):(D.setEnd(_.node,_.offset),U.addRange(D))}}}}for(V=[],U=h;U=U.parentNode;)U.nodeType===1&&V.push({element:U,left:U.scrollLeft,top:U.scrollTop});for(typeof h.focus=="function"&&h.focus(),h=0;h<V.length;h++){var q=V[h];q.element.scrollLeft=q.left,q.element.scrollTop=q.top}}jr=!!Zu,Iu=Zu=null}finally{Vt=i,B.p=a,O.T=n}}t.current=e,ve=2}}function Wf(){if(ve===2){ve=0;var t=$n,e=sl,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=O.T,O.T=null;var a=B.p;B.p=2;var i=Vt;Vt|=4;try{Nf(t,e.alternate,e)}finally{Vt=i,B.p=a,O.T=n}}ve=3}}function th(){if(ve===4||ve===3){ve=0,sn();var t=$n,e=sl,n=On,a=Pf;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?ve=5:(ve=0,sl=$n=null,eh(t,t.pendingLanes));var i=t.pendingLanes;if(i===0&&(Jn=null),ns(n),e=e.stateNode,et&&typeof et.onCommitFiberRoot=="function")try{et.onCommitFiberRoot(H,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=O.T,i=B.p,B.p=2,O.T=null;try{for(var s=t.onRecoverableError,c=0;c<a.length;c++){var h=a[c];s(h.value,{componentStack:h.stack})}}finally{O.T=e,B.p=i}}(On&3)!==0&&br(),mn(t),i=t.pendingLanes,(n&261930)!==0&&(i&42)!==0?t===Uu?ti++:(ti=0,Uu=t):ti=0,ei(0)}}function eh(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Hl(e)))}function br(){return $f(),Wf(),th(),nh()}function nh(){if(ve!==5)return!1;var t=$n,e=Ou;Ou=0;var n=ns(On),a=O.T,i=B.p;try{B.p=32>n?32:n,O.T=null,n=Hu,Hu=null;var s=$n,c=On;if(ve=0,sl=$n=null,On=0,(Vt&6)!==0)throw Error(o(331));var h=Vt;if(Vt|=4,kf(s.current),Of(s,s.current,c,n),Vt=h,ei(0,!1),et&&typeof et.onPostCommitFiberRoot=="function")try{et.onPostCommitFiberRoot(H,s)}catch{}return!0}finally{B.p=i,O.T=a,eh(t,e)}}function ah(t,e,n){e=$e(n,e),e=mu(t.stateNode,e,2),t=Yn(t,e,2),t!==null&&(xl(t,2),mn(t))}function Xt(t,e,n){if(t.tag===3)ah(t,t,n);else for(;e!==null;){if(e.tag===3){ah(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Jn===null||!Jn.has(a))){t=$e(n,t),n=af(2),a=Yn(e,n,2),a!==null&&(lf(n,a,e,t),xl(a,2),mn(a));break}}e=e.return}}function Lu(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new zg;var i=new Set;a.set(e,i)}else i=a.get(e),i===void 0&&(i=new Set,a.set(e,i));i.has(n)||(ju=!0,i.add(n),t=Gg.bind(null,t,e,n),e.then(t,t))}function Gg(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,$t===t&&(jt&n)===n&&(oe===4||oe===3&&(jt&62914560)===jt&&300>Ut()-hr?(Vt&2)===0&&ul(t,0):Ru|=n,rl===jt&&(rl=0)),mn(t)}function lh(t,e){e===0&&(e=Jo()),t=ma(t,e),t!==null&&(xl(t,e),mn(t))}function Lg(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),lh(t,n)}function Pg(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(o(314))}a!==null&&a.delete(e),lh(t,n)}function Bg(t,e){return Qt(t,e)}var Sr=null,cl=null,Pu=!1,xr=!1,Bu=!1,ta=0;function mn(t){t!==cl&&t.next===null&&(cl===null?Sr=cl=t:cl=cl.next=t),xr=!0,Pu||(Pu=!0,Vg())}function ei(t,e){if(!Bu&&xr){Bu=!0;do for(var n=!1,a=Sr;a!==null;){if(t!==0){var i=a.pendingLanes;if(i===0)var s=0;else{var c=a.suspendedLanes,h=a.pingedLanes;s=(1<<31-ie(42|t)+1)-1,s&=i&~(c&~h),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,uh(a,s))}else s=jt,s=Da(a,a===$t?s:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(s&3)===0||vn(a,s)||(n=!0,uh(a,s));a=a.next}while(n);Bu=!1}}function qg(){ih()}function ih(){xr=Pu=!1;var t=0;ta!==0&&Wg()&&(t=ta);for(var e=Ut(),n=null,a=Sr;a!==null;){var i=a.next,s=rh(a,e);s===0?(a.next=null,n===null?Sr=i:n.next=i,i===null&&(cl=n)):(n=a,(t!==0||(s&3)!==0)&&(xr=!0)),a=i}ve!==0&&ve!==5||ei(t),ta!==0&&(ta=0)}function rh(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var c=31-ie(s),h=1<<c,S=i[c];S===-1?((h&n)===0||(h&a)!==0)&&(i[c]=pp(h,e)):S<=e&&(t.expiredLanes|=h),s&=~h}if(e=$t,n=jt,n=Da(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(Kt===2||Kt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&ye(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||vn(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&ye(a),ns(n)){case 2:case 8:n=zt;break;case 32:n=ge;break;case 268435456:n=st;break;default:n=ge}return a=sh.bind(null,t),n=Qt(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&ye(a),t.callbackPriority=2,t.callbackNode=null,2}function sh(t,e){if(ve!==0&&ve!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(br()&&t.callbackNode!==n)return null;var a=jt;return a=Da(t,t===$t?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(qf(t,a,e),rh(t,Ut()),t.callbackNode!=null&&t.callbackNode===n?sh.bind(null,t):null)}function uh(t,e){if(br())return null;qf(t,e,!0)}function Vg(){ev(function(){(Vt&6)!==0?Qt(ee,qg):ih()})}function qu(){if(ta===0){var t=Za;t===0&&(t=Ce,Ce<<=1,(Ce&261888)===0&&(Ce=256)),ta=t}return ta}function oh(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Mi(""+t)}function ch(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function Fg(t,e,n,a,i){if(e==="submit"&&n&&n.stateNode===i){var s=oh((i[Oe]||null).action),c=a.submitter;c&&(e=(e=c[Oe]||null)?oh(e.formAction):c.getAttribute("formAction"),e!==null&&(s=e,c=null));var h=new zi("action","action",null,a,i);t.push({event:h,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(ta!==0){var S=c?ch(i,c):new FormData(i);uu(n,{pending:!0,data:S,method:i.method,action:s},null,S)}}else typeof s=="function"&&(h.preventDefault(),S=c?ch(i,c):new FormData(i),uu(n,{pending:!0,data:S,method:i.method,action:s},s,S))},currentTarget:i}]})}}for(var Vu=0;Vu<_s.length;Vu++){var Fu=_s[Vu],Yg=Fu.toLowerCase(),Kg=Fu[0].toUpperCase()+Fu.slice(1);un(Yg,"on"+Kg)}un(Pc,"onAnimationEnd"),un(Bc,"onAnimationIteration"),un(qc,"onAnimationStart"),un("dblclick","onDoubleClick"),un("focusin","onFocus"),un("focusout","onBlur"),un(ug,"onTransitionRun"),un(og,"onTransitionStart"),un(cg,"onTransitionCancel"),un(Vc,"onTransitionEnd"),Ha("onMouseEnter",["mouseout","mouseover"]),Ha("onMouseLeave",["mouseout","mouseover"]),Ha("onPointerEnter",["pointerout","pointerover"]),Ha("onPointerLeave",["pointerout","pointerover"]),ca("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ca("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ca("onBeforeInput",["compositionend","keypress","textInput","paste"]),ca("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ca("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ca("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ni="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xg=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ni));function dh(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],i=a.event;a=a.listeners;t:{var s=void 0;if(e)for(var c=a.length-1;0<=c;c--){var h=a[c],S=h.instance,j=h.currentTarget;if(h=h.listener,S!==s&&i.isPropagationStopped())break t;s=h,i.currentTarget=j;try{s(i)}catch(L){Ui(L)}i.currentTarget=null,s=S}else for(c=0;c<a.length;c++){if(h=a[c],S=h.instance,j=h.currentTarget,h=h.listener,S!==s&&i.isPropagationStopped())break t;s=h,i.currentTarget=j;try{s(i)}catch(L){Ui(L)}i.currentTarget=null,s=S}}}}function Dt(t,e){var n=e[as];n===void 0&&(n=e[as]=new Set);var a=t+"__bubble";n.has(a)||(fh(e,t,2,!1),n.add(a))}function Yu(t,e,n){var a=0;e&&(a|=4),fh(n,t,a,e)}var Ar="_reactListening"+Math.random().toString(36).slice(2);function Ku(t){if(!t[Ar]){t[Ar]=!0,lc.forEach(function(n){n!=="selectionchange"&&(Xg.has(n)||Yu(n,!1,t),Yu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ar]||(e[Ar]=!0,Yu("selectionchange",!1,e))}}function fh(t,e,n,a){switch(Bh(e)){case 2:var i=xv;break;case 8:i=Av;break;default:i=so}n=i.bind(null,e,n,t),i=void 0,!fs||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),a?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Xu(t,e,n,a,i){var s=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var c=a.tag;if(c===3||c===4){var h=a.stateNode.containerInfo;if(h===i)break;if(c===4)for(c=a.return;c!==null;){var S=c.tag;if((S===3||S===4)&&c.stateNode.containerInfo===i)return;c=c.return}for(;h!==null;){if(c=Ra(h),c===null)return;if(S=c.tag,S===5||S===6||S===26||S===27){a=s=c;continue t}h=h.parentNode}}a=a.return}gc(function(){var j=s,L=cs(n),V=[];t:{var z=Fc.get(t);if(z!==void 0){var U=zi,it=t;switch(t){case"keypress":if(ji(n)===0)break t;case"keydown":case"keyup":U=Pp;break;case"focusin":it="focus",U=gs;break;case"focusout":it="blur",U=gs;break;case"beforeblur":case"afterblur":U=gs;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":U=bc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":U=wp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":U=Vp;break;case Pc:case Bc:case qc:U=jp;break;case Vc:U=Yp;break;case"scroll":case"scrollend":U=Ep;break;case"wheel":U=Xp;break;case"copy":case"cut":case"paste":U=zp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":U=xc;break;case"toggle":case"beforetoggle":U=Zp}var pt=(e&4)!==0,Jt=!pt&&(t==="scroll"||t==="scrollend"),M=pt?z!==null?z+"Capture":null:z;pt=[];for(var _=j,D;_!==null;){var q=_;if(D=q.stateNode,q=q.tag,q!==5&&q!==26&&q!==27||D===null||M===null||(q=Tl(_,M),q!=null&&pt.push(ai(_,q,D))),Jt)break;_=_.return}0<pt.length&&(z=new U(z,it,null,n,L),V.push({event:z,listeners:pt}))}}if((e&7)===0){t:{if(z=t==="mouseover"||t==="pointerover",U=t==="mouseout"||t==="pointerout",z&&n!==os&&(it=n.relatedTarget||n.fromElement)&&(Ra(it)||it[ja]))break t;if((U||z)&&(z=L.window===L?L:(z=L.ownerDocument)?z.defaultView||z.parentWindow:window,U?(it=n.relatedTarget||n.toElement,U=j,it=it?Ra(it):null,it!==null&&(Jt=f(it),pt=it.tag,it!==Jt||pt!==5&&pt!==27&&pt!==6)&&(it=null)):(U=null,it=j),U!==it)){if(pt=bc,q="onMouseLeave",M="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(pt=xc,q="onPointerLeave",M="onPointerEnter",_="pointer"),Jt=U==null?z:Cl(U),D=it==null?z:Cl(it),z=new pt(q,_+"leave",U,n,L),z.target=Jt,z.relatedTarget=D,q=null,Ra(L)===j&&(pt=new pt(M,_+"enter",it,n,L),pt.target=D,pt.relatedTarget=Jt,q=pt),Jt=q,U&&it)e:{for(pt=Qg,M=U,_=it,D=0,q=M;q;q=pt(q))D++;q=0;for(var ft=_;ft;ft=pt(ft))q++;for(;0<D-q;)M=pt(M),D--;for(;0<q-D;)_=pt(_),q--;for(;D--;){if(M===_||_!==null&&M===_.alternate){pt=M;break e}M=pt(M),_=pt(_)}pt=null}else pt=null;U!==null&&hh(V,z,U,pt,!1),it!==null&&Jt!==null&&hh(V,Jt,it,pt,!0)}}t:{if(z=j?Cl(j):window,U=z.nodeName&&z.nodeName.toLowerCase(),U==="select"||U==="input"&&z.type==="file")var Pt=Mc;else if(Nc(z))if(Dc)Pt=ig;else{Pt=ag;var ut=ng}else U=z.nodeName,!U||U.toLowerCase()!=="input"||z.type!=="checkbox"&&z.type!=="radio"?j&&us(j.elementType)&&(Pt=Mc):Pt=lg;if(Pt&&(Pt=Pt(t,j))){wc(V,Pt,n,L);break t}ut&&ut(t,z,j),t==="focusout"&&j&&z.type==="number"&&j.memoizedProps.value!=null&&ss(z,"number",z.value)}switch(ut=j?Cl(j):window,t){case"focusin":(Nc(ut)||ut.contentEditable==="true")&&(Ba=ut,As=j,Rl=null);break;case"focusout":Rl=As=Ba=null;break;case"mousedown":Cs=!0;break;case"contextmenu":case"mouseup":case"dragend":Cs=!1,Gc(V,n,L);break;case"selectionchange":if(sg)break;case"keydown":case"keyup":Gc(V,n,L)}var Ct;if(ys)t:{switch(t){case"compositionstart":var Rt="onCompositionStart";break t;case"compositionend":Rt="onCompositionEnd";break t;case"compositionupdate":Rt="onCompositionUpdate";break t}Rt=void 0}else Pa?_c(t,n)&&(Rt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(Rt="onCompositionStart");Rt&&(Ac&&n.locale!=="ko"&&(Pa||Rt!=="onCompositionStart"?Rt==="onCompositionEnd"&&Pa&&(Ct=vc()):(Gn=L,hs="value"in Gn?Gn.value:Gn.textContent,Pa=!0)),ut=Cr(j,Rt),0<ut.length&&(Rt=new Sc(Rt,t,null,n,L),V.push({event:Rt,listeners:ut}),Ct?Rt.data=Ct:(Ct=Ec(n),Ct!==null&&(Rt.data=Ct)))),(Ct=Jp?$p(t,n):Wp(t,n))&&(Rt=Cr(j,"onBeforeInput"),0<Rt.length&&(ut=new Sc("onBeforeInput","beforeinput",null,n,L),V.push({event:ut,listeners:Rt}),ut.data=Ct)),Fg(V,t,j,n,L)}dh(V,e)})}function ai(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Cr(t,e){for(var n=e+"Capture",a=[];t!==null;){var i=t,s=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||s===null||(i=Tl(t,n),i!=null&&a.unshift(ai(t,i,s)),i=Tl(t,e),i!=null&&a.push(ai(t,i,s))),t.tag===3)return a;t=t.return}return[]}function Qg(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function hh(t,e,n,a,i){for(var s=e._reactName,c=[];n!==null&&n!==a;){var h=n,S=h.alternate,j=h.stateNode;if(h=h.tag,S!==null&&S===a)break;h!==5&&h!==26&&h!==27||j===null||(S=j,i?(j=Tl(n,s),j!=null&&c.unshift(ai(n,j,S))):i||(j=Tl(n,s),j!=null&&c.push(ai(n,j,S)))),n=n.return}c.length!==0&&t.push({event:e,listeners:c})}var Zg=/\r\n?/g,Ig=/\u0000|\uFFFD/g;function mh(t){return(typeof t=="string"?t:""+t).replace(Zg,`
`).replace(Ig,"")}function ph(t,e){return e=mh(e),mh(t)===e}function It(t,e,n,a,i,s){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||ka(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&ka(t,""+a);break;case"className":Ni(t,"class",a);break;case"tabIndex":Ni(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Ni(t,n,a);break;case"style":mc(t,a,s);break;case"data":if(e!=="object"){Ni(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Mi(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&It(t,e,"name",i.name,i,null),It(t,e,"formEncType",i.formEncType,i,null),It(t,e,"formMethod",i.formMethod,i,null),It(t,e,"formTarget",i.formTarget,i,null)):(It(t,e,"encType",i.encType,i,null),It(t,e,"method",i.method,i,null),It(t,e,"target",i.target,i,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Mi(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=bn);break;case"onScroll":a!=null&&Dt("scroll",t);break;case"onScrollEnd":a!=null&&Dt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Mi(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":Dt("beforetoggle",t),Dt("toggle",t),Ei(t,"popover",a);break;case"xlinkActuate":yn(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":yn(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":yn(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":yn(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":yn(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":yn(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":yn(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":yn(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":yn(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Ei(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Tp.get(n)||n,Ei(t,n,a))}}function Qu(t,e,n,a,i,s){switch(n){case"style":mc(t,a,s);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"children":typeof a=="string"?ka(t,a):(typeof a=="number"||typeof a=="bigint")&&ka(t,""+a);break;case"onScroll":a!=null&&Dt("scroll",t);break;case"onScrollEnd":a!=null&&Dt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=bn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ic.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(i=n.endsWith("Capture"),e=n.slice(2,i?n.length-7:void 0),s=t[Oe]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,i),typeof a=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,i);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Ei(t,n,a)}}}function we(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Dt("error",t),Dt("load",t);var a=!1,i=!1,s;for(s in n)if(n.hasOwnProperty(s)){var c=n[s];if(c!=null)switch(s){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:It(t,e,s,c,n,null)}}i&&It(t,e,"srcSet",n.srcSet,n,null),a&&It(t,e,"src",n.src,n,null);return;case"input":Dt("invalid",t);var h=s=c=i=null,S=null,j=null;for(a in n)if(n.hasOwnProperty(a)){var L=n[a];if(L!=null)switch(a){case"name":i=L;break;case"type":c=L;break;case"checked":S=L;break;case"defaultChecked":j=L;break;case"value":s=L;break;case"defaultValue":h=L;break;case"children":case"dangerouslySetInnerHTML":if(L!=null)throw Error(o(137,e));break;default:It(t,e,a,L,n,null)}}cc(t,s,h,S,j,c,i,!1);return;case"select":Dt("invalid",t),a=c=s=null;for(i in n)if(n.hasOwnProperty(i)&&(h=n[i],h!=null))switch(i){case"value":s=h;break;case"defaultValue":c=h;break;case"multiple":a=h;default:It(t,e,i,h,n,null)}e=s,n=c,t.multiple=!!a,e!=null?Ua(t,!!a,e,!1):n!=null&&Ua(t,!!a,n,!0);return;case"textarea":Dt("invalid",t),s=i=a=null;for(c in n)if(n.hasOwnProperty(c)&&(h=n[c],h!=null))switch(c){case"value":a=h;break;case"defaultValue":i=h;break;case"children":s=h;break;case"dangerouslySetInnerHTML":if(h!=null)throw Error(o(91));break;default:It(t,e,c,h,n,null)}fc(t,a,i,s);return;case"option":for(S in n)n.hasOwnProperty(S)&&(a=n[S],a!=null)&&(S==="selected"?t.selected=a&&typeof a!="function"&&typeof a!="symbol":It(t,e,S,a,n,null));return;case"dialog":Dt("beforetoggle",t),Dt("toggle",t),Dt("cancel",t),Dt("close",t);break;case"iframe":case"object":Dt("load",t);break;case"video":case"audio":for(a=0;a<ni.length;a++)Dt(ni[a],t);break;case"image":Dt("error",t),Dt("load",t);break;case"details":Dt("toggle",t);break;case"embed":case"source":case"link":Dt("error",t),Dt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(j in n)if(n.hasOwnProperty(j)&&(a=n[j],a!=null))switch(j){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:It(t,e,j,a,n,null)}return;default:if(us(e)){for(L in n)n.hasOwnProperty(L)&&(a=n[L],a!==void 0&&Qu(t,e,L,a,n,void 0));return}}for(h in n)n.hasOwnProperty(h)&&(a=n[h],a!=null&&It(t,e,h,a,n,null))}function Jg(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,s=null,c=null,h=null,S=null,j=null,L=null;for(U in n){var V=n[U];if(n.hasOwnProperty(U)&&V!=null)switch(U){case"checked":break;case"value":break;case"defaultValue":S=V;default:a.hasOwnProperty(U)||It(t,e,U,null,a,V)}}for(var z in a){var U=a[z];if(V=n[z],a.hasOwnProperty(z)&&(U!=null||V!=null))switch(z){case"type":s=U;break;case"name":i=U;break;case"checked":j=U;break;case"defaultChecked":L=U;break;case"value":c=U;break;case"defaultValue":h=U;break;case"children":case"dangerouslySetInnerHTML":if(U!=null)throw Error(o(137,e));break;default:U!==V&&It(t,e,z,U,a,V)}}rs(t,c,h,S,j,L,s,i);return;case"select":U=c=h=z=null;for(s in n)if(S=n[s],n.hasOwnProperty(s)&&S!=null)switch(s){case"value":break;case"multiple":U=S;default:a.hasOwnProperty(s)||It(t,e,s,null,a,S)}for(i in a)if(s=a[i],S=n[i],a.hasOwnProperty(i)&&(s!=null||S!=null))switch(i){case"value":z=s;break;case"defaultValue":h=s;break;case"multiple":c=s;default:s!==S&&It(t,e,i,s,a,S)}e=h,n=c,a=U,z!=null?Ua(t,!!n,z,!1):!!a!=!!n&&(e!=null?Ua(t,!!n,e,!0):Ua(t,!!n,n?[]:"",!1));return;case"textarea":U=z=null;for(h in n)if(i=n[h],n.hasOwnProperty(h)&&i!=null&&!a.hasOwnProperty(h))switch(h){case"value":break;case"children":break;default:It(t,e,h,null,a,i)}for(c in a)if(i=a[c],s=n[c],a.hasOwnProperty(c)&&(i!=null||s!=null))switch(c){case"value":z=i;break;case"defaultValue":U=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(o(91));break;default:i!==s&&It(t,e,c,i,a,s)}dc(t,z,U);return;case"option":for(var it in n)z=n[it],n.hasOwnProperty(it)&&z!=null&&!a.hasOwnProperty(it)&&(it==="selected"?t.selected=!1:It(t,e,it,null,a,z));for(S in a)z=a[S],U=n[S],a.hasOwnProperty(S)&&z!==U&&(z!=null||U!=null)&&(S==="selected"?t.selected=z&&typeof z!="function"&&typeof z!="symbol":It(t,e,S,z,a,U));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var pt in n)z=n[pt],n.hasOwnProperty(pt)&&z!=null&&!a.hasOwnProperty(pt)&&It(t,e,pt,null,a,z);for(j in a)if(z=a[j],U=n[j],a.hasOwnProperty(j)&&z!==U&&(z!=null||U!=null))switch(j){case"children":case"dangerouslySetInnerHTML":if(z!=null)throw Error(o(137,e));break;default:It(t,e,j,z,a,U)}return;default:if(us(e)){for(var Jt in n)z=n[Jt],n.hasOwnProperty(Jt)&&z!==void 0&&!a.hasOwnProperty(Jt)&&Qu(t,e,Jt,void 0,a,z);for(L in a)z=a[L],U=n[L],!a.hasOwnProperty(L)||z===U||z===void 0&&U===void 0||Qu(t,e,L,z,a,U);return}}for(var M in n)z=n[M],n.hasOwnProperty(M)&&z!=null&&!a.hasOwnProperty(M)&&It(t,e,M,null,a,z);for(V in a)z=a[V],U=n[V],!a.hasOwnProperty(V)||z===U||z==null&&U==null||It(t,e,V,z,a,U)}function gh(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function $g(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var i=n[a],s=i.transferSize,c=i.initiatorType,h=i.duration;if(s&&h&&gh(c)){for(c=0,h=i.responseEnd,a+=1;a<n.length;a++){var S=n[a],j=S.startTime;if(j>h)break;var L=S.transferSize,V=S.initiatorType;L&&gh(V)&&(S=S.responseEnd,c+=L*(S<h?1:(h-j)/(S-j)))}if(--a,e+=8*(s+c)/(i.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Zu=null,Iu=null;function Tr(t){return t.nodeType===9?t:t.ownerDocument}function vh(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function yh(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Ju(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var $u=null;function Wg(){var t=window.event;return t&&t.type==="popstate"?t===$u?!1:($u=t,!0):($u=null,!1)}var bh=typeof setTimeout=="function"?setTimeout:void 0,tv=typeof clearTimeout=="function"?clearTimeout:void 0,Sh=typeof Promise=="function"?Promise:void 0,ev=typeof queueMicrotask=="function"?queueMicrotask:typeof Sh<"u"?function(t){return Sh.resolve(null).then(t).catch(nv)}:bh;function nv(t){setTimeout(function(){throw t})}function ea(t){return t==="head"}function xh(t,e){var n=e,a=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(i),ml(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")li(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,li(n);for(var s=n.firstChild;s;){var c=s.nextSibling,h=s.nodeName;s[Al]||h==="SCRIPT"||h==="STYLE"||h==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=c}}else n==="body"&&li(t.ownerDocument.body);n=i}while(n);ml(e)}function Ah(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function Wu(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Wu(n),ls(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function av(t,e,n,a){for(;t.nodeType===1;){var i=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Al])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==i.rel||t.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||t.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||t.getAttribute("title")!==(i.title==null?null:i.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(i.src==null?null:i.src)||t.getAttribute("type")!==(i.type==null?null:i.type)||t.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=i.name==null?null:""+i.name;if(i.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=an(t.nextSibling),t===null)break}return null}function lv(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=an(t.nextSibling),t===null))return null;return t}function Ch(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=an(t.nextSibling),t===null))return null;return t}function to(t){return t.data==="$?"||t.data==="$~"}function eo(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function iv(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function an(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var no=null;function Th(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return an(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function _h(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Eh(t,e,n){switch(e=Tr(n),t){case"html":if(t=e.documentElement,!t)throw Error(o(452));return t;case"head":if(t=e.head,!t)throw Error(o(453));return t;case"body":if(t=e.body,!t)throw Error(o(454));return t;default:throw Error(o(451))}}function li(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ls(t)}var ln=new Map,Nh=new Set;function _r(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Hn=B.d;B.d={f:rv,r:sv,D:uv,C:ov,L:cv,m:dv,X:hv,S:fv,M:mv};function rv(){var t=Hn.f(),e=gr();return t||e}function sv(t){var e=za(t);e!==null&&e.tag===5&&e.type==="form"?Vd(e):Hn.r(t)}var dl=typeof document>"u"?null:document;function wh(t,e,n){var a=dl;if(a&&typeof e=="string"&&e){var i=Ie(e);i='link[rel="'+t+'"][href="'+i+'"]',typeof n=="string"&&(i+='[crossorigin="'+n+'"]'),Nh.has(i)||(Nh.add(i),t={rel:t,crossOrigin:n,href:e},a.querySelector(i)===null&&(e=a.createElement("link"),we(e,"link",t),be(e),a.head.appendChild(e)))}}function uv(t){Hn.D(t),wh("dns-prefetch",t,null)}function ov(t,e){Hn.C(t,e),wh("preconnect",t,e)}function cv(t,e,n){Hn.L(t,e,n);var a=dl;if(a&&t&&e){var i='link[rel="preload"][as="'+Ie(e)+'"]';e==="image"&&n&&n.imageSrcSet?(i+='[imagesrcset="'+Ie(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(i+='[imagesizes="'+Ie(n.imageSizes)+'"]')):i+='[href="'+Ie(t)+'"]';var s=i;switch(e){case"style":s=fl(t);break;case"script":s=hl(t)}ln.has(s)||(t=g({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),ln.set(s,t),a.querySelector(i)!==null||e==="style"&&a.querySelector(ii(s))||e==="script"&&a.querySelector(ri(s))||(e=a.createElement("link"),we(e,"link",t),be(e),a.head.appendChild(e)))}}function dv(t,e){Hn.m(t,e);var n=dl;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",i='link[rel="modulepreload"][as="'+Ie(a)+'"][href="'+Ie(t)+'"]',s=i;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=hl(t)}if(!ln.has(s)&&(t=g({rel:"modulepreload",href:t},e),ln.set(s,t),n.querySelector(i)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(ri(s)))return}a=n.createElement("link"),we(a,"link",t),be(a),n.head.appendChild(a)}}}function fv(t,e,n){Hn.S(t,e,n);var a=dl;if(a&&t){var i=Oa(a).hoistableStyles,s=fl(t);e=e||"default";var c=i.get(s);if(!c){var h={loading:0,preload:null};if(c=a.querySelector(ii(s)))h.loading=5;else{t=g({rel:"stylesheet",href:t,"data-precedence":e},n),(n=ln.get(s))&&ao(t,n);var S=c=a.createElement("link");be(S),we(S,"link",t),S._p=new Promise(function(j,L){S.onload=j,S.onerror=L}),S.addEventListener("load",function(){h.loading|=1}),S.addEventListener("error",function(){h.loading|=2}),h.loading|=4,Er(c,e,a)}c={type:"stylesheet",instance:c,count:1,state:h},i.set(s,c)}}}function hv(t,e){Hn.X(t,e);var n=dl;if(n&&t){var a=Oa(n).hoistableScripts,i=hl(t),s=a.get(i);s||(s=n.querySelector(ri(i)),s||(t=g({src:t,async:!0},e),(e=ln.get(i))&&lo(t,e),s=n.createElement("script"),be(s),we(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},a.set(i,s))}}function mv(t,e){Hn.M(t,e);var n=dl;if(n&&t){var a=Oa(n).hoistableScripts,i=hl(t),s=a.get(i);s||(s=n.querySelector(ri(i)),s||(t=g({src:t,async:!0,type:"module"},e),(e=ln.get(i))&&lo(t,e),s=n.createElement("script"),be(s),we(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},a.set(i,s))}}function Mh(t,e,n,a){var i=(i=Q.current)?_r(i):null;if(!i)throw Error(o(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=fl(n.href),n=Oa(i).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=fl(n.href);var s=Oa(i).hoistableStyles,c=s.get(t);if(c||(i=i.ownerDocument||i,c={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,c),(s=i.querySelector(ii(t)))&&!s._p&&(c.instance=s,c.state.loading=5),ln.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ln.set(t,n),s||pv(i,t,n,c.state))),e&&a===null)throw Error(o(528,""));return c}if(e&&a!==null)throw Error(o(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=hl(n),n=Oa(i).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,t))}}function fl(t){return'href="'+Ie(t)+'"'}function ii(t){return'link[rel="stylesheet"]['+t+"]"}function Dh(t){return g({},t,{"data-precedence":t.precedence,precedence:null})}function pv(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),we(e,"link",n),be(e),t.head.appendChild(e))}function hl(t){return'[src="'+Ie(t)+'"]'}function ri(t){return"script[async]"+t}function jh(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+Ie(n.href)+'"]');if(a)return e.instance=a,be(a),a;var i=g({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),be(a),we(a,"style",i),Er(a,n.precedence,t),e.instance=a;case"stylesheet":i=fl(n.href);var s=t.querySelector(ii(i));if(s)return e.state.loading|=4,e.instance=s,be(s),s;a=Dh(n),(i=ln.get(i))&&ao(a,i),s=(t.ownerDocument||t).createElement("link"),be(s);var c=s;return c._p=new Promise(function(h,S){c.onload=h,c.onerror=S}),we(s,"link",a),e.state.loading|=4,Er(s,n.precedence,t),e.instance=s;case"script":return s=hl(n.src),(i=t.querySelector(ri(s)))?(e.instance=i,be(i),i):(a=n,(i=ln.get(s))&&(a=g({},n),lo(a,i)),t=t.ownerDocument||t,i=t.createElement("script"),be(i),we(i,"link",a),t.head.appendChild(i),e.instance=i);case"void":return null;default:throw Error(o(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Er(a,n.precedence,t));return e.instance}function Er(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=a.length?a[a.length-1]:null,s=i,c=0;c<a.length;c++){var h=a[c];if(h.dataset.precedence===e)s=h;else if(s!==i)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function ao(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function lo(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Nr=null;function Rh(t,e,n){if(Nr===null){var a=new Map,i=Nr=new Map;i.set(n,a)}else i=Nr,a=i.get(n),a||(a=new Map,i.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),i=0;i<n.length;i++){var s=n[i];if(!(s[Al]||s[Te]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var c=s.getAttribute(e)||"";c=t+c;var h=a.get(c);h?h.push(s):a.set(c,[s])}}return a}function zh(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function gv(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;return e.rel==="stylesheet"?(t=e.disabled,typeof e.precedence=="string"&&t==null):!0;case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Oh(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function vv(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var i=fl(a.href),s=e.querySelector(ii(i));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=wr.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,be(s);return}s=e.ownerDocument||e,a=Dh(a),(i=ln.get(i))&&ao(a,i),s=s.createElement("link"),be(s);var c=s;c._p=new Promise(function(h,S){c.onload=h,c.onerror=S}),we(s,"link",a),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=wr.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var io=0;function yv(t,e){return t.stylesheets&&t.count===0&&Dr(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Dr(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&io===0&&(io=62500*$g());var i=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Dr(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>io?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(i)}}:null}function wr(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Dr(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Mr=null;function Dr(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Mr=new Map,e.forEach(bv,t),Mr=null,wr.call(t))}function bv(t,e){if(!(e.state.loading&4)){var n=Mr.get(t);if(n)var a=n.get(null);else{n=new Map,Mr.set(t,n);for(var i=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<i.length;s++){var c=i[s];(c.nodeName==="LINK"||c.getAttribute("media")!=="not all")&&(n.set(c.dataset.precedence,c),a=c)}a&&n.set(null,a)}i=e.instance,c=i.getAttribute("data-precedence"),s=n.get(c)||a,s===a&&n.set(null,i),n.set(c,i),this.count++,a=wr.bind(this),i.addEventListener("load",a),i.addEventListener("error",a),s?s.parentNode.insertBefore(i,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(i,t.firstChild)),e.state.loading|=4}}var si={$$typeof:gt,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function Sv(t,e,n,a,i,s,c,h,S){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ts(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ts(0),this.hiddenUpdates=ts(null),this.identifierPrefix=a,this.onUncaughtError=i,this.onCaughtError=s,this.onRecoverableError=c,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=S,this.incompleteTransitions=new Map}function Hh(t,e,n,a,i,s,c,h,S,j,L,V){return t=new Sv(t,e,n,c,S,j,L,V,h),e=1,s===!0&&(e|=24),s=qe(3,null,null,e),t.current=s,s.stateNode=t,e=Gs(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:a,isDehydrated:n,cache:e},qs(s),t}function Uh(t){return t?(t=Fa,t):Fa}function kh(t,e,n,a,i,s){i=Uh(i),a.context===null?a.context=i:a.pendingContext=i,a=Fn(e),a.payload={element:n},s=s===void 0?null:s,s!==null&&(a.callback=s),n=Yn(t,a,e),n!==null&&(Pe(n,t,e),Ll(n,t,e))}function Gh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ro(t,e){Gh(t,e),(t=t.alternate)&&Gh(t,e)}function Lh(t){if(t.tag===13||t.tag===31){var e=ma(t,67108864);e!==null&&Pe(e,t,67108864),ro(t,67108864)}}function Ph(t){if(t.tag===13||t.tag===31){var e=Xe();e=es(e);var n=ma(t,e);n!==null&&Pe(n,t,e),ro(t,e)}}var jr=!0;function xv(t,e,n,a){var i=O.T;O.T=null;var s=B.p;try{B.p=2,so(t,e,n,a)}finally{B.p=s,O.T=i}}function Av(t,e,n,a){var i=O.T;O.T=null;var s=B.p;try{B.p=8,so(t,e,n,a)}finally{B.p=s,O.T=i}}function so(t,e,n,a){if(jr){var i=uo(a);if(i===null)Xu(t,e,a,Rr,n),qh(t,a);else if(Tv(i,t,e,n,a))a.stopPropagation();else if(qh(t,a),e&4&&-1<Cv.indexOf(t)){for(;i!==null;){var s=za(i);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var c=gn(s.pendingLanes);if(c!==0){var h=s;for(h.pendingLanes|=2,h.entangledLanes|=2;c;){var S=1<<31-ie(c);h.entanglements[1]|=S,c&=~S}mn(s),(Vt&6)===0&&(mr=Ut()+500,ei(0))}}break;case 31:case 13:h=ma(s,2),h!==null&&Pe(h,s,2),gr(),ro(s,2)}if(s=uo(a),s===null&&Xu(t,e,a,Rr,n),s===i)break;i=s}i!==null&&a.stopPropagation()}else Xu(t,e,a,null,n)}}function uo(t){return t=cs(t),oo(t)}var Rr=null;function oo(t){if(Rr=null,t=Ra(t),t!==null){var e=f(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=v(e),t!==null)return t;t=null}else if(n===31){if(t=A(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Rr=t,null}function Bh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ae()){case ee:return 2;case zt:return 8;case ge:case G:return 32;case st:return 268435456;default:return 32}default:return 32}}var co=!1,na=null,aa=null,la=null,ui=new Map,oi=new Map,ia=[],Cv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function qh(t,e){switch(t){case"focusin":case"focusout":na=null;break;case"dragenter":case"dragleave":aa=null;break;case"mouseover":case"mouseout":la=null;break;case"pointerover":case"pointerout":ui.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":oi.delete(e.pointerId)}}function ci(t,e,n,a,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:s,targetContainers:[i]},e!==null&&(e=za(e),e!==null&&Lh(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function Tv(t,e,n,a,i){switch(e){case"focusin":return na=ci(na,t,e,n,a,i),!0;case"dragenter":return aa=ci(aa,t,e,n,a,i),!0;case"mouseover":return la=ci(la,t,e,n,a,i),!0;case"pointerover":var s=i.pointerId;return ui.set(s,ci(ui.get(s)||null,t,e,n,a,i)),!0;case"gotpointercapture":return s=i.pointerId,oi.set(s,ci(oi.get(s)||null,t,e,n,a,i)),!0}return!1}function Vh(t){var e=Ra(t.target);if(e!==null){var n=f(e);if(n!==null){if(e=n.tag,e===13){if(e=v(n),e!==null){t.blockedOn=e,nc(t.priority,function(){Ph(n)});return}}else if(e===31){if(e=A(n),e!==null){t.blockedOn=e,nc(t.priority,function(){Ph(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function zr(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=uo(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);os=a,n.target.dispatchEvent(a),os=null}else return e=za(n),e!==null&&Lh(e),t.blockedOn=n,!1;e.shift()}return!0}function Fh(t,e,n){zr(t)&&n.delete(e)}function _v(){co=!1,na!==null&&zr(na)&&(na=null),aa!==null&&zr(aa)&&(aa=null),la!==null&&zr(la)&&(la=null),ui.forEach(Fh),oi.forEach(Fh)}function Or(t,e){t.blockedOn===e&&(t.blockedOn=null,co||(co=!0,l.unstable_scheduleCallback(l.unstable_NormalPriority,_v)))}var Hr=null;function Yh(t){Hr!==t&&(Hr=t,l.unstable_scheduleCallback(l.unstable_NormalPriority,function(){Hr===t&&(Hr=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],i=t[e+2];if(typeof a!="function"){if(oo(a||n)===null)continue;break}var s=za(n);s!==null&&(t.splice(e,3),e-=3,uu(s,{pending:!0,data:i,method:n.method,action:a},a,i))}}))}function ml(t){function e(S){return Or(S,t)}na!==null&&Or(na,t),aa!==null&&Or(aa,t),la!==null&&Or(la,t),ui.forEach(e),oi.forEach(e);for(var n=0;n<ia.length;n++){var a=ia[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<ia.length&&(n=ia[0],n.blockedOn===null);)Vh(n),n.blockedOn===null&&ia.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var i=n[a],s=n[a+1],c=i[Oe]||null;if(typeof s=="function")c||Yh(n);else if(c){var h=null;if(s&&s.hasAttribute("formAction")){if(i=s,c=s[Oe]||null)h=c.formAction;else if(oo(i)!==null)continue}else h=c.action;typeof h=="function"?n[a+1]=h:(n.splice(a,3),a-=3),Yh(n)}}}function Kh(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(c){return i=c})},focusReset:"manual",scroll:"manual"})}function e(){i!==null&&(i(),i=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,i=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),i!==null&&(i(),i=null)}}}function fo(t){this._internalRoot=t}Ur.prototype.render=fo.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(o(409));var n=e.current,a=Xe();kh(n,a,t,e,null,null)},Ur.prototype.unmount=fo.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;kh(t.current,2,null,t,null,null),gr(),e[ja]=null}};function Ur(t){this._internalRoot=t}Ur.prototype.unstable_scheduleHydration=function(t){if(t){var e=ec();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ia.length&&e!==0&&e<ia[n].priority;n++);ia.splice(n,0,t),n===0&&Vh(t)}};var Xh=r.version;if(Xh!=="19.2.4")throw Error(o(527,Xh,"19.2.4"));B.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(o(188)):(t=Object.keys(t).join(","),Error(o(268,t)));return t=p(e),t=t!==null?b(t):null,t=t===null?null:t.stateNode,t};var Ev={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var kr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!kr.isDisabled&&kr.supportsFiber)try{H=kr.inject(Ev),et=kr}catch{}}return fi.createRoot=function(t,e){if(!d(t))throw Error(o(299));var n=!1,a="",i=Wd,s=tf,c=ef;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(i=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(c=e.onRecoverableError)),e=Hh(t,1,!1,null,null,n,a,null,i,s,c,Kh),t[ja]=e.current,Ku(t),new fo(e)},fi.hydrateRoot=function(t,e,n){if(!d(t))throw Error(o(299));var a=!1,i="",s=Wd,c=tf,h=ef,S=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(h=n.onRecoverableError),n.formState!==void 0&&(S=n.formState)),e=Hh(t,1,!0,e,n??null,a,i,S,s,c,h,Kh),e.context=Uh(null),n=e.current,a=Xe(),a=es(a),i=Fn(a),i.callback=null,Yn(n,i,a),n=a,e.current.lanes=n,xl(e,n),mn(e),t[ja]=e.current,Ku(t),new Ur(e)},fi.version="19.2.4",fi}var am;function Uv(){if(am)return po.exports;am=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(r){console.error(r)}}return l(),po.exports=Hv(),po.exports}var kv=Uv(),Gv=class{constructor(l){var r;this.scope=(r=l.scope)!=null?r:"app",this.name=l.name,this.key=`${this.scope}:${this.name}`,this.defaultValue=l.defaultValue}},Lv=class{constructor(){this.grips=new Map}makeKey(l,r){return`${l??"app"}:${r}`}defineGrip(l,r,u){const o=new Gv({scope:u,name:l,defaultValue:r});if(this.grips.has(o.key))throw new Error(`Grip already registered: ${o.key}`);return this.grips.set(o.key,o),o}findOrDefineGrip(l,r,u){const o=this.makeKey(u,l),d=this.grips.get(o);return d||this.defineGrip(l,r,u)}get(l,r){return this.grips.get(`${l}:${r}`)}},Pv=l=>(r,u,o)=>l.defineGrip(r,u,o),Rm=class{constructor(l,r){this.kind="DualContextContainer",this.home=l,this.presentation=r,this.grok=l.getGrok()}getGripConsumerContext(){return this.presentation}getGripHomeContext(){return this.home}getGrok(){return this.grok}},Gr=class zm{constructor(r,u){this.kind="GripContext",this.grok=r,this.id=u??`ctx_${Math.random().toString(36).slice(2)}`,this.contextNode=r.ensureNode(this)}getGripConsumerContext(){return this}getGripHomeContext(){return this}getNode(){return this.contextNode}getGrok(){return this.grok}isRoot(){return this.contextNode.get_parent_nodes().length===0}submitTask(r,u=0){this.contextNode.submitTask(r,u)}submitWeakTask(r){this.contextNode.submitWeakTask(r)}getParents(){return this.contextNode?this.contextNode.get_parents_with_priority().map(r=>({ctx:r.node.get_context(),priority:r.priority})).filter(r=>r.ctx!=null):[]}addParent(r,u=0){const o=r.getGripHomeContext();if(o.contextNode.grok!==this.grok)throw new Error("Contexts must be attached to the same engine");if(o===this)throw new Error("Context cannot be its own parent");if(this.contextNode.addParent(o.contextNode,u),this.grok.hasCycle(this.contextNode))throw this.contextNode.removeParent(o.contextNode),new Error("Cycle detected in context DAG");return this}unlinkParent(r){try{this.contextNode.removeParent(r.contextNode)}catch{}return this}hasAncestor(r){return this.contextNode.get_parent_nodes().some(u=>{var o;return u.get_context()===r||((o=u.get_context())==null?void 0:o.hasAncestor(r))||!1})}setValue(r,u){return this}setDrip(r,u){return this}resolveOverride(r){}resolveOverrideWithSource(r){}createChild(r){var u;return new zm(this.grok).addParent(this,(u=r?.priority)!=null?u:0)}getLiveDripForGrip(r){return this.contextNode.getLiveDripForGrip(r)}getOrCreateConsumer(r){return this.contextNode.getOrCreateConsumer(r)}registerTap(r){if(!this.grok)throw new Error("Context is not attached to an engine");this.grok.registerTapAt(this,r)}unregisterTap(r){this.grok.unregisterTap(r)}unregisterSource(r){this.contextNode.unregisterSource(r)}_getContextNode(){return this.contextNode}getContextNode(){return this.contextNode}},Bv=class{constructor(l,r){this.context=null,this.subs=new Set,this.immediateSubs=new Set,this.firstSubCallbacks=new Set,this.zeroSubCallbacks=new Set,this.enqueued=!1,this.zeroCheckScheduled=!1,this.context=l,this.value=r}reset(l,r){this.context=l,this.value=r,this.subs.clear(),this.immediateSubs.clear(),this.firstSubCallbacks.clear(),this.zeroSubCallbacks.clear(),this.enqueued=!1,this.zeroCheckScheduled=!1}get(){return this.value}next(l){this.value!==l&&(this.value=l,this.enqueueNotifySubscribers())}enqueueNotifySubscribers(){var l;if(this.notifyImmediateSubscribers(),!this.enqueued){this.enqueued=!0;const r=this;(l=this.context)==null||l.submitWeakTask(()=>r.taskQueueCallback())}}taskQueueCallback(){this.enqueued=!1,this.notifySubscribers()}notifySubscribers(){this.subs.forEach(l=>l(this.value))}notifyImmediateSubscribers(){this.immediateSubs.forEach(l=>l(this.value))}hasSubscribers(){return this.subs.size>0||this.immediateSubs.size>0}subscribeWith(l,r){const u=!this.hasSubscribers();return l.add(r),u&&this.firstSubCallbacks.forEach(o=>o()),()=>{var o;if(l.has(r)&&(l.delete(r),!this.hasSubscribers()&&!this.zeroCheckScheduled)){this.zeroCheckScheduled=!0;const d=this;(o=this.context)==null||o.submitWeakTask(()=>{d.zeroCheckScheduled=!1,d.hasSubscribers()||d.zeroSubCallbacks.forEach(f=>f())})}}}subscribe(l){return this.subscribeWith(this.subs,l)}subscribePriority(l){return this.subscribeWith(this.immediateSubs,l)}addOnFirstSubscriber(l){this.firstSubCallbacks.add(l)}addOnZeroSubscribers(l){this.zeroSubCallbacks.add(l)}unsubscribeAll(){this.hasSubscribers()&&(this.subs.clear(),this.immediateSubs.clear(),this.zeroSubCallbacks.forEach(l=>l())),this.context=null}_notifyUnsubscribed(){var l;if(this.subs.size===0&&!this.zeroCheckScheduled){this.zeroCheckScheduled=!0;const r=this;(l=this.context)==null||l.submitWeakTask(()=>{r.zeroCheckScheduled=!1,r.hasSubscribers()||r.zeroSubCallbacks.forEach(u=>u())})}}},qv=class{constructor(){this.handles=[]}add(l){this.handles.push(l)}remove(l){const r=this.handles.indexOf(l);r>=0&&this.handles.splice(r,1)}getHandles(){return this.handles}get size(){return this.handles.length}cancelAll(){for(;this.handles.length>0;)this.handles[0].cancel()}},Vv=class{constructor(){this.items=[]}get size(){return this.items.length}push(l){this.items.push(l),this.bubbleUp(this.items.length-1)}peek(){return this.items[0]}pop(){if(this.items.length===0)return;const l=this.items[0],r=this.items.pop();return this.items.length>0&&(this.items[0]=r,this.bubbleDown(0)),l}less(l,r){return l.priority!==r.priority?l.priority<r.priority:l.sequence<r.sequence}bubbleUp(l){for(;l>0;){const r=Math.floor((l-1)/2);if(!this.less(this.items[l],this.items[r]))break;this.swap(l,r),l=r}}bubbleDown(l){const r=this.items.length;for(;;){const u=l*2+1,o=l*2+2;let d=l;if(u<r&&this.less(this.items[u],this.items[d])&&(d=u),o<r&&this.less(this.items[o],this.items[d])&&(d=o),d===l)break;this.swap(l,d),l=d}}swap(l,r){const u=this.items[l];this.items[l]=this.items[r],this.items[r]=u}},Fv=class{constructor(l){this.heap=new Vv,this.nextId=1,this.nextSequence=1,this.scheduled=!1,this.isFlushing=!1;var r,u;this.options={autoFlush:(r=l?.autoFlush)!=null?r:!0,useMicrotask:(u=l?.useMicrotask)!=null?u:!0}}get size(){return this.heap.size}submit(l,r=0,u){const o={id:this.nextId++,priority:r,sequence:this.nextSequence++,strongCallback:l,state:"pending"};u&&(o.handle=this.createHandle(o,u)),this.heap.push(o),this.scheduleFlushIfNeeded()}submitWeak(l,r=0,u){if(typeof WeakRef>"u"){this.submit(l,r,u);return}const o={id:this.nextId++,priority:r,sequence:this.nextSequence++,weakCallback:new WeakRef(l),state:"pending"};u&&(o.handle=this.createHandle(o,u)),this.heap.push(o),this.scheduleFlushIfNeeded()}flush(){var l,r,u,o;if(!this.isFlushing){this.isFlushing=!0;try{for(;;){const d=this.heap.pop();if(!d)break;if(d.state==="cancelled")continue;const f=(r=d.strongCallback)!=null?r:(l=d.weakCallback)==null?void 0:l.deref();if(!f){d.state==="pending"&&((u=d.handle)==null||u.notifyNoLongerPending()),d.state="completed";continue}try{d.state==="pending"&&((o=d.handle)==null||o.notifyNoLongerPending()),d.state="running",f(),d.state="completed"}catch(v){this.reportAsyncError(v),d.state="completed"}}}finally{this.isFlushing=!1,this.scheduled=!1}}}cancelScheduledFlush(){this.scheduled=!1}createHandle(l,r){const u=new Yv(l,r);return r.add(u),u}scheduleFlushIfNeeded(){this.options.autoFlush&&(this.scheduled||this.isFlushing||(this.scheduled=!0,this.options.useMicrotask&&typeof queueMicrotask=="function"?queueMicrotask(()=>this.flush()):setTimeout(()=>this.flush(),0)))}reportAsyncError(l){setTimeout(()=>{throw l},0)}},Yv=class{constructor(l,r){this.removed=!1,this.task=l,this.holder=r}cancel(){return this.task.state!=="pending"?!1:(this.task.state="cancelled",this.notifyNoLongerPending(),!0)}isRunning(){return this.task.state==="running"}isCancelled(){return this.task.state==="cancelled"}isPending(){return this.task.state==="pending"}isCompleted(){return this.task.state==="completed"}notifyNoLongerPending(){if(!this.removed)try{this.holder.remove(this)}finally{this.removed=!0}}},Kv=class{constructor(l,r){if(this.destinations=new Map,this.outputs=new Set,l.kind==="TapFactory"?(this.tap=l.build(),this.tapFactory=l):(this.tap=l,this.tapFactory=void 0),r)for(const u of r)this.outputs.add(u)}addDestinationGrip(l,r){var u,o,d=this.destinations.get(l),f=!1;d||(d=new lm(l,this.tap,this),this.destinations.set(l,d),f=!0,d.registerDestinationParamDrips()),d.addGrip(r);const v=l.get_context();f?(o=(u=this.tap).onConnect)==null||o.call(u,v,r):v&&this.tap.produce({destContext:v})}removeDestinationForContext(l){var r,u,o,d;const f=this.destinations.get(l);if(f&&(f.cleanup(),f.unsubscribeAllDestinationParams(),this.destinations.delete(l)),this.destinations.size===0){if(!((u=(r=this.tap).getHomeContext)==null?void 0:u.call(r)))return;(d=(o=this.tap).onDetach)==null||d.call(o)}}getDestinations(){return this.destinations}addDestination(l,r){var u=this.destinations.get(l);u||(u=new lm(l,this.tap,this),this.destinations.set(l,u),u.registerDestinationParamDrips()),u.addGrip(r)}removeDestinationGripForContext(l,r){const u=this.destinations.get(l);u&&(u.removeGrip(r),u.getGrips().size===0&&this.removeDestinationForContext(l))}getDestinationParams(l){for(const[r,u]of this.destinations)if(r.get_context()===l)return u}publish(l,r){let u=0;const o=new Set;try{for(const[d,f]of this.getDestinations()){const v=d.get_context();if(!v){o.add(d);continue}for(const A of f.getGrips())l.has(A)&&this.outputs.has(A)&&(r(v,A,l.get(A)),u+=1)}}finally{for(const d of o)this.removeDestinationForContext(d)}return u}},lm=class{constructor(l,r,u,o){this.destinationParamDrips=new Map,this.destinationDripsSubs=new Map,this.destContextNode=l,this.tap=r,this.grips=new Set(o??[]),this.producer=u,r.createDestinationContext&&(this.tapContext=r.createDestinationContext(this))}getTapContext(){return this.tapContext}registerDestinationParamDrips(){if(!this.tap.destinationParamGrips)return;const l=this;for(const r of this.tap.destinationParamGrips){const u=this.destContextNode.getOrCreateConsumer(r);this.destinationParamDrips.set(r,u),this.destinationDripsSubs.set(r,u.subscribePriority(o=>{u.get()!==void 0&&l.tap.produceOnDestParams(this.destContextNode.get_context(),r)}))}}unregisterDestination(){this.producer.removeDestinationForContext(this.destContextNode)}unsubscribeAllDestinationParams(){for(const[l,r]of this.destinationDripsSubs)r();this.destinationDripsSubs.clear(),this.destinationParamDrips.clear()}getDestinationParamValue(l){const r=this.destinationParamDrips.get(l);return r?.get()}getAllDestinationParamValues(){const l=new Map;for(const[r,u]of this.destinationParamDrips)l.set(r,u.get());return l}addGrip(l){var r,u;this.grips.has(l)||(this.grips.size===0&&this.registerDestinationParamDrips(),this.grips.add(l),(u=(r=this.tapContext)==null?void 0:r.dripAdded)==null||u.call(r,l),this.sanityCheck())}removeGrip(l){var r,u,o,d;try{if(!this.grips.has(l))return;this.grips.delete(l),(u=(r=this.tapContext)==null?void 0:r.dripRemoved)==null||u.call(r,l),this.grips.size===0&&((d=(o=this.tapContext)==null?void 0:o.onDetach)==null||d.call(o),this.unregisterDestination())}finally{this.sanityCheck()}}cleanup(){var l,r;this.grips.size>0&&((r=(l=this.tapContext)==null?void 0:l.onDetach)==null||r.call(l))}sanityCheck(){if(this.grips.size===0&&this.destinationParamDrips.size>0)throw new Error("Destination has destination param drips but no output grips")}getGrips(){return this.grips}getDestinationParamDrips(){return this.destinationParamDrips}getContext(){return this.destContextNode.contextRef.deref()}getContextNode(){return this.destContextNode}get destContext(){const l=this.destContextNode.get_context();if(!l)throw new Error("Destination context is gone");return l}get(l){const r=this.getDestParam(l);return r!==void 0?r:this.getHomeParam(l)}getAll(){var l,r,u,o;const d=new Map,f=(r=(l=this.tap).getHomeContext)==null?void 0:r.call(l);if(f&&this.tap.homeParamGrips){const v=((o=(u=this.tap).getParamsContext)==null?void 0:o.call(u))||f;for(const A of this.tap.homeParamGrips){const p=v.getOrCreateConsumer(A).get();p!==void 0&&d.set(A,p)}}for(const[v,A]of this.destinationParamDrips){const C=A.get();C!==void 0&&d.set(v,C)}return d}has(l){return this.hasDestParam(l)||this.hasHomeParam(l)}getDestParam(l){const r=this.destinationParamDrips.get(l);return r?.get()}getAllDestParams(){const l=new Map;for(const[r,u]of this.destinationParamDrips){const o=u.get();o!==void 0&&l.set(r,o)}return l}getHomeParam(l){var r,u,o,d;const f=(u=(r=this.tap).getHomeContext)==null?void 0:u.call(r);return f?(((d=(o=this.tap).getParamsContext)==null?void 0:d.call(o))||f).getOrCreateConsumer(l).get():void 0}getAllHomeParams(){var l,r,u,o;const d=new Map,f=(r=(l=this.tap).getHomeContext)==null?void 0:r.call(l);if(f&&this.tap.homeParamGrips){const v=((o=(u=this.tap).getParamsContext)==null?void 0:o.call(u))||f;for(const A of this.tap.homeParamGrips){const p=v.getOrCreateConsumer(A).get();p!==void 0&&d.set(A,p)}}return d}hasDestParam(l){return this.destinationParamDrips.has(l)}hasHomeParam(l){var r,u;return(u=(r=this.tap.homeParamGrips)==null?void 0:r.includes(l))!=null?u:!1}},Xv=class{constructor(l,r){this.kind="GripContextNode",this.parents=[],this.children=[],this.handleHolder=new qv,this.producers=new Map,this.consumers=new Map,this.deletedConsumers=new Map,this.resolvedProviders=new Map,this.producerByTap=new Map,this.lastSeen=Date.now(),this.grok=l,this.id=r.id,this.contextRef=new WeakRef(r)}get_grok(){return this.grok}submitTask(l,r){this.grok.submitTask(l,r,this.handleHolder)}submitWeakTask(l){this.grok.submitWeakTask(l,this.handleHolder)}get_context(){return this.contextRef.deref()}get_parent_nodes(){return this.parents.map(l=>l.node)}isRoot(){return this.parents.length===0}getParents(){return this.get_parents_with_priority().map(l=>l.node)}get_parents_with_priority(){return this.parents.slice()}get_producers(){return this.producers}get_consumers(){return this.consumers}get_children_nodes(){return this.children}addParent(l,r=0){this.parents.find(o=>o.node===l)||(this.parents.push({node:l,priority:r}),this.parents.sort((o,d)=>o.priority-d.priority),l.children.push(this))}removeParent(l){const r=this.parents.findIndex(o=>o.node===l);if(r===-1)throw new Error(`Parent ${l.id} is not a parent of ${this.id}`);this.parents.splice(r,1);const u=l.children.indexOf(this);u!==-1&&l.children.splice(u,1)}_removeTap(l){var r,u;const o=this.producerByTap.get(l);if(o){for(const d of o.outputs)this.producers.delete(d);this.producerByTap.delete(l),o.tapFactory&&this.producerByTap.delete(o.tapFactory),(u=(r=o.tap).onDetach)==null||u.call(r)}}recordProducer(l,r){this.producers.set(l,r),this.lastSeen=Date.now()}getResolvedProviders(){return this.resolvedProviders}setResolvedProvider(l,r){this.resolvedProviders.set(l,r)}getOrCreateProducerRecord(l,r){let u=this.producerByTap.get(l);return u||(u=new Kv(l,r),this.producerByTap.set(l,u),l!==u.tap&&this.producerByTap.set(u.tap,u)),u.tap,u}getProducerRecord(l){return this.producerByTap.get(l)}recordConsumer(l,r){this.consumers.set(l,new WeakRef(r)),this.lastSeen=Date.now(),r.addOnFirstSubscriber(()=>{const u=this.get_context();u&&this.grok.resolver.addConsumer(u,l)})}getOrCreateConsumer(l){var r;let u=(r=this.consumers.get(l))==null?void 0:r.deref();if(!u){const o=this.get_context();if(!o)throw new Error("Context is gone");const d=this.deletedConsumers.get(l),f=d?.deref();d&&!f&&this.deletedConsumers.delete(l),f?(u=f,f.reset(o,l.defaultValue)):u=new Bv(o,l.defaultValue),this.recordConsumer(l,u),u.addOnZeroSubscribers(()=>{this.removeConsumerForGrip(l)})}return u}getLiveDripForGrip(l){const r=this.consumers.get(l),u=r?.deref();return!u&&r&&this.consumers.delete(l),u}notifyConsumers(l,r){const u=this.getLiveDripForGrip(l);return u?(u.next(r),1):0}removeConsumerForGrip(l){const r=this.consumers.get(l);r&&r.deref()&&this.deletedConsumers.set(l,r),this.consumers.delete(l),this.unregisterSource(l),this.resolvedProviders.delete(l)}unregisterSource(l){const r=this.resolvedProviders.get(l);r&&r.removeDestinationForContext(l,this)}removeDestinationForContext(l,r){const u=this.producers.get(l);u&&u.removeDestinationGripForContext(r,l)}purgeDanglingDrips(){const l=new Set;var r=0;for(const[u,o]of this.consumers)o.deref()?r+=1:l.add(u);for(const u of l)this.removeConsumerForGrip(u);return r}touch(){this.lastSeen=Date.now()}getLastSeen(){return this.lastSeen}},Qv=class{constructor(l){this.nodes=new Map,this.weakNodes=new Map,this.gcIntervalMs=3e4,this.maxIdleMs=12e4,this.gcTimer=null,this.grok=l}hasCycle(l){const r=new Set(l.get_children_nodes()),u=new Set,o=new Array,d=f=>{if(r.delete(f),u.has(f))return!1;u.add(f),o.push(f);for(const v of f.get_parent_nodes())if(o.includes(v)||d(v))return!0;return o.pop(),!1};for(;r.size>0;){const f=r.values().next().value;if(f&&d(f))return!0}return!1}ensureNode(l){let r=this.nodes.get(l.id);if(!r){r=new Xv(this.grok,l),this.nodes.set(l.id,r),this.weakNodes.set(l.id,new WeakRef(r));for(const{ctx:u,priority:o}of l.getParents()){const d=this.ensureNode(u);r.addParent(d,o)}this.startGcIfNeeded()}return r.touch(),r}getNode(l){return this.nodes.get(l.id)}getNodeById(l){return this.nodes.get(l)}snapshot(){return this.nodes}snapshotSanityCheck(){const l=new Map,r=[...this.nodes.values()],u=new Set;for(;r.length>0;){const f=r.pop();if(l.has(f.id))continue;l.set(f.id,f);const v=[];f.children.forEach(A=>{!l.has(A.id)&&!this.nodes.has(A.id)?u.add(A):(v.push(A),l.has(A.id)||r.push(A))}),v.length!==f.children.length&&(f.children.length=0,f.children.push(...v))}u.size>0;const o=new Set,d=new Set;for(const[f,v]of this.weakNodes){const A=v.deref();A?l.has(A.id)||d.add(A):o.add(f)}for(const f of o)this.weakNodes.delete(f);return{nodes:l,missingNodes:u,nodesNotReaped:d}}notifyConsumers(l,r,u){const o=this.getNode(l);return o?o.notifyConsumers(r,u):0}startGcIfNeeded(){var l,r;if(!this.gcTimer){this.gcTimer=setInterval(()=>this.gcSweep(),this.gcIntervalMs);try{(r=(l=this.gcTimer).unref)==null||r.call(l)}catch{}}}gcSweep(){const l=new Set;for(const[r,u]of this.nodes){const d=!u.contextRef.deref(),v=u.purgeDanglingDrips()===0;d&&v&&u.children.length===0&&l.add(r)}for(const r of l){const u=this.nodes.get(r);u&&(this.clearContextNode(u),this.nodes.delete(r))}for(const[r,u]of this.nodes){const o=u.children.filter(d=>this.nodes.has(d.id));o.length!==u.children.length&&(u.children.length=0,u.children.push(...o))}}clearContextNode(l){for(const r of l.consumers.values()){const u=r.deref();u&&u.unsubscribeAll()}l.consumers.clear();for(const r of l.parents.slice())l.removeParent(r.node);for(const r of l.children.slice())try{r.removeParent(l)}catch{const o=l.children.indexOf(r);o!==-1&&l.children.splice(o,1)}l.parents.length=0,l.children.length=0}countLiveConsumers(l){let r=0;for(const u of l.consumers.values())u.deref()&&(r+=1);return r}};function Zv(l,r){const u=new Set;for(const o of r)l.has(o)&&u.add(o);return u}function Iv(l,r){const u=new Set;for(const o of l)r.has(o)||u.add(o);return u}var Jv=class{constructor(l){this.grok=l}addConsumer(l,r){const u=this.grok.ensureNode(l);u.getOrCreateConsumer(r),this.resolveConsumer(u,r)}removeConsumer(l,r){const u=this.grok.ensureNode(l);this.unresolveConsumer(u,r),u.removeConsumerForGrip(r)}applyProducerDelta(l,r){const u=l.kind==="GripContext"?l.getNode():l;u.submitTask(()=>{var o,d;const f=new Set;for(const[C,p]of r.removed.entries()){const b=u.getProducerRecord(C);if(b)for(const g of p.attributedGrips)this.collectConsumers(b,g,f)}for(const[C,p]of r.removed.entries()){const b=u.getProducerRecord(C);if(b)for(const g of p.attributedGrips)u.get_producers().get(g)===b&&u.get_producers().delete(g),b.outputs.delete(g)}for(const[C,p]of r.added.entries()){const b=u.getOrCreateProducerRecord(C,C.provides),g=u.get_context(),N=b.tap;g&&!((o=N.getHomeContext)!=null&&o.call(N))&&((d=N.onAttach)==null||d.call(N,g));for(const Y of p.attributedGrips)u.recordProducer(Y,b),b.outputs.add(Y)}const v=[u,...this.getDescendants(u)];for(const[C,p]of r.added.entries())for(const b of p.attributedGrips)for(const g of v)g.get_consumers().has(b)&&f.add({destNode:g,grip:b});for(const{destNode:C,grip:p}of f)this.unresolveConsumer(C,p),this.resolveConsumer(C,p);const A=new Set([...r.added.keys(),...r.removed.keys()]);for(const C of A){const p=u.getProducerRecord(C);p&&p.outputs.size===0&&u._removeTap(C)}},100)}analyzeDelta(l,r){var u;const o=new Map;for(const[b,g]of l.get_producers().entries()){const N=(u=g.tapFactory)!=null?u:g.tap;o.has(N)||o.set(N,new Set),o.get(N).add(b)}const d=new Map,f=new Map;for(const[b,g]of o.entries())l.getProducerRecord(b),f.set(b,new Set(g)),d.set(b,{producerTap:b,score:0,bindingId:"",attributedGrips:f.get(b)});for(const[b,g]of r.removed.entries()){const N=f.get(b);if(N){for(const Y of g.attributedGrips)N.delete(Y);N.size===0&&(f.delete(b),d.delete(b))}}for(const[b,g]of r.added.entries()){f.has(b)||f.set(b,new Set);const N=f.get(b);for(const Y of g.attributedGrips)N.add(Y);d.set(b,{...g,attributedGrips:N})}const v=new Map,A=new Map,C=new Map,p=new Set;o.forEach(b=>b.forEach(g=>p.add(g))),f.forEach(b=>b.forEach(g=>p.add(g)));for(const b of p){const g=this.findTapForGrip(b,o),N=this.findTapForGrip(b,f);g&&!N?(A.has(g)||A.set(g,new Set),A.get(g).add(b)):!g&&N?(v.has(N)||v.set(N,new Set),v.get(N).add(b)):g&&N&&g!==N&&C.set(b,{from:g,to:N})}return{added:v,removed:A,transferred:C,finalProducers:d}}findTapForGrip(l,r){for(const[u,o]of r.entries())if(o.has(l))return u}collectConsumers(l,r,u){for(const o of l.getDestinations().values())o.getGrips().has(r)&&u.add({destNode:o.getContextNode(),grip:r})}addProducer(l,r){var u,o,d,f;(u=r.onAttach)==null||u.call(r,l);const v=this.grok.ensureNode(l),A=v.getOrCreateProducerRecord(r,r.provides);try{r.producer=(o=r.producer)!=null?o:A,r.homeContext=(d=r.homeContext)!=null?d:l,r.engine=(f=r.engine)!=null?f:this.grok}catch{}for(const b of r.provides)v.recordProducer(b,A);const C=[v,...this.getDescendants(v)],p=new Set(r.provides);for(const b of C)for(const[g,N]of b.get_consumers())p.has(g)&&this.resolveConsumer(b,g)}removeProducer(l,r){const u=this.grok.ensureNode(l),o=u.getProducerRecord(r);if(!o)return;const d=[];for(const f of Array.from(o.getDestinations().values())){const v=f.getContextNode();for(const A of f.getGrips())d.push({destNode:v,grip:A})}for(const f of r.provides)u.get_producers().get(f)===o&&u.get_producers().delete(f);u._removeTap(r);for(const{destNode:f,grip:v}of d){const A=f.getResolvedProviders();A.get(v)===u&&A.delete(v),o.removeDestinationGripForContext(f,v),this.resolveConsumer(f,v)}}addParent(l,r){this.reevaluateDescendants(l)}unlinkParent(l,r){var u;(u=l.unlinkParent)==null||u.call(l,r),this.reevaluateDescendants(l)}reevaluateDescendants(l){const r=this.grok.ensureNode(l),u=[r,...this.getDescendants(r)];for(const o of u){const d=Array.from(o.get_consumers().keys());for(const f of d)this.resolveConsumer(o,f)}}resolveConsumer(l,r){var u,o;const d=l.getResolvedProviders().get(r),f=this.findProducerFor(l,r);if(d!==f)if(d&&this.unresolveConsumer(l,r),f){const v=f.get_producers().get(r);if(v){const A=f.get_context();A&&!v.tap.getHomeContext()&&((o=(u=v.tap).onAttach)==null||o.call(u,A)),v.addDestinationGrip(l,r),l.setResolvedProvider(r,f)}}else l.getResolvedProviders().delete(r),l.get_context()&&l.notifyConsumers(r,r.defaultValue)}unresolveConsumer(l,r){const u=l.getResolvedProviders(),o=u.get(r);o&&(o.removeDestinationForContext(r,l),u.delete(r))}findProducerFor(l,r){if(l.get_producers().has(r))return l;const u=[],o=new Set;for(u.push(l),o.add(l);u.length>0;){const d=u.shift();if(d.get_producers().has(r))return d;const f=d.get_parents_with_priority(),v=[],A=[];for(const{node:C}of f)o.has(C)||(C.isRoot()?A.push(C):v.push(C),o.add(C));u.push(...v,...A)}return null}getDescendants(l){const r=new Set,u=[...l.get_children_nodes()],o=new Set([l]);for(;u.length>0;){const d=u.shift();if(!o.has(d)){o.add(d),r.add(d);for(const f of d.get_children_nodes())o.has(f)||u.push(f)}}return Array.from(r)}resolveConsumerStage1(l,r,u,o,d){var f=this.grok.ensureNode(r),v=f.get_producers().get(u);if(v){const A=this.grok.ensureNode(l);return v.addDestinationGrip(A,u),A.setResolvedProvider(u,f),!0}for(const A of r.getParents()){const C=A.ctx;if(C.isRoot()){d.push(C);continue}if(!o.has(C)&&(o.add(C),this.resolveConsumerStage1(l,C,u,o,d)))return!0}return!1}resolveProducer(l,r,u){var o=u;if(r){const A=this.grok.ensureNode(r).get_producers();if(A.size>0){const C=Zv(o,A.keys());if(C.size>0&&(o=Iv(o,C),o.size===0))return}}else r=l;const d=this.grok.ensureNode(r),f=d.get_consumers();for(const[v,A]of f)o.has(v)&&this.resolveConsumer(d,v)}},Om=class{constructor(){this.partitions=new Set,this.itemToPartition=new Map,this.characteristicToPartition=new Map,this.itemToCharacteristics=new Map,this.dirtyPartitions=new Set}add(l,r){if(this.itemToPartition.has(l))return this.itemToPartition.get(l);this.itemToCharacteristics.set(l,new Set(r));const u=new Set;for(const d of r)this.characteristicToPartition.has(d)&&u.add(this.characteristicToPartition.get(d));let o;if(u.size===0)o={items:new Set([l])},this.partitions.add(o);else{const d=Array.from(u);o=d[0],o.items.add(l);for(let f=1;f<d.length;f++){const v=d[f];if(v!==o){for(const A of v.items)o.items.add(A),this.itemToPartition.set(A,o);this.updateCharacteristicMappings(v,o),this.partitions.delete(v)}}}this.itemToPartition.set(l,o);for(const d of r)this.characteristicToPartition.set(d,o);return o}updateCharacteristicMappings(l,r){for(const u of l.items){const o=this.itemToCharacteristics.get(u);if(o)for(const d of o)this.characteristicToPartition.get(d)===l&&this.characteristicToPartition.set(d,r)}}remove(l){const r=this.itemToPartition.get(l);return r?(r.items.delete(l),this.itemToPartition.delete(l),this.itemToCharacteristics.delete(l),r.items.size===0?(this.partitions.delete(r),this.dirtyPartitions.delete(r)):r.items.size>=2&&this.dirtyPartitions.add(r),r):null}getPartitionForItem(l){return this.itemToPartition.get(l)}repartitionDirtySets(){if(this.dirtyPartitions.size===0)return new Set;const l=new Set;for(const r of this.dirtyPartitions){for(const o of r.items){const d=this.itemToCharacteristics.get(o);if(d)for(const f of d)this.characteristicToPartition.get(f)===r&&this.characteristicToPartition.delete(f)}this.partitions.delete(r);const u=new Set;for(const o of r.items){this.itemToPartition.delete(o);const d=this.add(o,Array.from(this.itemToCharacteristics.get(o)||[]));u.add(d)}if(u.size>1)for(const o of u)l.add(o)}return this.dirtyPartitions.clear(),l}getPartitions(){return Array.from(this.partitions).map(l=>l.items)}},$v=class{constructor(){this.objectIds=new WeakMap,this.nextId=0}getId(l){return this.objectIds.has(l)||this.objectIds.set(l,this.nextId++),this.objectIds.get(l)}},Wv=new $v;function Lr(l){return l.map(r=>{const u=typeof r;if(r===null)return"N:";if(u==="undefined")return"U:";if(u==="object")return`O:${Wv.getId(r)}`;if(u==="string"){const d=r;return`s:${d.length}:${d}`}if(u==="number"){const d=r;return`n:${Number.isNaN(d)?"NaN":Object.is(d,-0)?"0":String(d)}`}if(u==="boolean")return`b:${r?"true":"false"}`;const o=String(r);return`x:${o.length}:${o}`}).join("|")}var im=class{constructor(){this.internalMap=new Map}set(l,r){return this.internalMap.set(Lr(l),{key:l,value:r}),this}get(l){var r;return(r=this.internalMap.get(Lr(l)))==null?void 0:r.value}delete(l){return this.internalMap.delete(Lr(l))}has(l){return this.internalMap.has(Lr(l))}clear(){this.internalMap.clear()}size(){return this.internalMap.size}*keys(){for(const l of this.internalMap.values())yield l.key}*values(){for(const l of this.internalMap.values())yield l.value}*entries(){for(const l of this.internalMap.values())yield[l.key,l.value]}forEach(l,r){this.internalMap.forEach((u,o)=>l.call(r,u.value,u.key,this))}[Symbol.iterator](){return this.entries()}},ty=class{constructor(){this.index=new Map}add(l){for(const r of l.conditions.keys())this.index.has(r)||this.index.set(r,new Set),this.index.get(r).add(l)}remove(l){for(const r of l.conditions.keys()){const u=this.index.get(r);u&&(u.delete(l),u.size===0&&this.index.delete(r))}}getAffectedQueries(l){const r=new Set;for(const u of l){const o=this.index.get(u);if(o)for(const d of o)r.add(d)}return r}},ey=class{attribute(l){const r=new Map,u=new Om;for(const o of l)u.add(o,Array.from(o.tap.provides));for(const o of u.getPartitions()){const d=Array.from(o).sort((v,A)=>A.score-v.score||v.bindingId.localeCompare(A.bindingId)),f=new Set;for(const v of d){const A=Array.from(v.tap.provides).filter(C=>!f.has(C));if(A.length>0){const C={producerTap:v.tap,score:v.score,bindingId:v.bindingId,attributedGrips:new Set(A)};r.set(v.tap,C),A.forEach(p=>f.add(p))}}}return r}},ny=class{constructor(l=[],r=1e3,u=!0,o=!0){this.bindings=new Map,this.invertedIndex=new ty,this.activeMatches=new Map,this.attributionUtility=new ey,this.inputGripRefCounts=new Map,this.lastAttributedResult=new Map,this.structurallyChangedQueries=new Set,this.queryPartitioner=new Om,this.precomputedMaps=new Map,this.runtimeEvaluationSets=new Set,this.cache=new im,this.queryToPartition=new Map,this.partitionToKeyGrips=new Map,this.precomputationThreshold=r,this.useHybridEvaluation=u,this.useCache=o,l.forEach(d=>this.addBinding(d))}getBinding(l){return this.bindings.get(l)}addBinding(l){const r=new Set;let u=new Set;this.bindings.has(l.id)&&(u=this.removeBinding(l.id).removedInputs),this.bindings.set(l.id,l),this.invertedIndex.add(l.query),this.structurallyChangedQueries.add(l.query),this.cache.clear();for(const o of l.query.conditions.keys()){const d=this.inputGripRefCounts.get(o)||0;d===0&&r.add(o),this.inputGripRefCounts.set(o,d+1)}if(this.useHybridEvaluation){const o=this.queryPartitioner.add(l.query,Array.from(l.query.conditions.keys()));this.updateHybridStateForPartition(o.items)}return{newInputs:r,removedInputs:u}}removeBinding(l){const r=new Set,u=this.bindings.get(l);if(u){this.bindings.delete(l),this.invertedIndex.remove(u.query),this.activeMatches.delete(l),this.structurallyChangedQueries.add(u.query),this.cache.clear();for(const o of u.query.conditions.keys()){const d=this.inputGripRefCounts.get(o);d&&(d===1?(this.inputGripRefCounts.delete(o),r.add(o)):this.inputGripRefCounts.set(o,d-1))}if(this.useHybridEvaluation){const o=this.queryPartitioner.remove(u.query);o&&(this.clearHybridStateForPartition(o.items),this.queryPartitioner.repartitionDirtySets().forEach(f=>this.updateHybridStateForPartition(f.items)))}}return{removedInputs:r}}getAllInputGrips(){return new Set(this.inputGripRefCounts.keys())}updateHybridStateForPartition(l){this.clearHybridStateForPartition(l),this.calculateComplexity(l)<=this.precomputationThreshold?this.precomputePartition(l):this.runtimeEvaluationSets.add(l),l.forEach(r=>this.queryToPartition.set(r,l))}clearHybridStateForPartition(l){this.precomputedMaps.delete(l),this.runtimeEvaluationSets.delete(l),this.partitionToKeyGrips.delete(l),l.forEach(r=>this.queryToPartition.delete(r))}calculateComplexity(l){const r=new Map;for(const o of l)for(const[d,f]of o.conditions.entries()){r.has(d)||r.set(d,new Set);const v=r.get(d);for(const A of f.keys())v.add(A)}let u=1;for(const o of r.values())if(u*=o.size,u>this.precomputationThreshold)return u;return u}precomputePartition(l){var r;const u=new im,o=new Set;for(const A of l)A.conditions.forEach((C,p)=>o.add(p));const d=Array.from(o).sort((A,C)=>A.key.localeCompare(C.key));this.partitionToKeyGrips.set(l,d);const f=new Map;for(const A of d){const C=new Set;for(const p of l)(r=p.conditions.get(A))==null||r.forEach((b,g)=>C.add(g));f.set(A,Array.from(C))}const v=(A,C)=>{if(A===d.length){const g={getValue:X=>new Map(C).get(X)},N=d.map(X=>g.getValue(X)),Y=this.evaluateQueries(l,g),I=this.attributionUtility.attribute(Array.from(Y.values()));u.set(N,I);return}const p=d[A],b=f.get(p)||[void 0];for(const g of b)C.push([p,g]),v(A+1,C),C.pop()};v(0,[]),this.precomputedMaps.set(l,u)}evaluateQueries(l,r){const u=new Map,o=[];for(const d of this.bindings.values())l.has(d.query)&&o.push(d);for(const d of o){let f=0;if(d.query.conditions.size===0)continue;let v=!0;for(const[A,C]of d.query.conditions.entries()){const p=r.getValue(A);if(p===void 0||!C.has(p)){v=!1;break}f+=C.get(p)}v&&u.set(d.id,{tap:d.tap,score:d.baseScore+f,bindingId:d.id})}return u}onGripsChanged(l,r){const u=this.invertedIndex.getAffectedQueries(l);for(const p of this.structurallyChangedQueries)u.add(p);this.structurallyChangedQueries.clear();const o=this.evaluateQueries(u,r);for(const p of u){const b=Array.from(this.bindings.values()).filter(g=>g.query===p);for(const g of b){const N=o.get(g.id);this.activeMatches.get(g.id)&&!N?this.activeMatches.delete(g.id):N&&this.activeMatches.set(g.id,N)}}const d=Array.from(this.activeMatches.values());let f;if(this.useCache){const p=this.getAllInputGrips(),b=Array.from(p).sort((g,N)=>g.key.localeCompare(N.key)).map(g=>r.getValue(g));this.cache.has(b)?f=this.cache.get(b):(f=this.attributionUtility.attribute(d),this.cache.set(b,f))}else f=this.attributionUtility.attribute(d);const v=new Map,A=new Map,C=new Set([...f.keys(),...this.lastAttributedResult.keys()]);for(const p of C){const b=f.get(p),g=this.lastAttributedResult.get(p);if(b&&!g)v.set(p,b);else if(!b&&g)A.set(p,g);else if(b&&g){const N=new Set;for(const I of b.attributedGrips)g.attributedGrips.has(I)||N.add(I);const Y=new Set;for(const I of g.attributedGrips)b.attributedGrips.has(I)||Y.add(I);N.size>0&&v.set(p,{...b,attributedGrips:N}),Y.size>0&&A.set(p,{...g,attributedGrips:Y})}}return this.lastAttributedResult=f,{added:v,removed:A}}},ay=class{constructor(l){this.valuesMap=new Map,this.changedGrips=new Set,this.dripSubscriptions=new Map,this.isFirstEvaluation=!0,this.container=l,this.evaluator=new ny}addBinding(l){const r=this.evaluator.addBinding(l);r.newInputs.forEach(u=>this._subscribeToGrip(u)),r.removedInputs.forEach(u=>this._unsubscribeFromGrip(u));for(const u of l.query.conditions.keys())this.changedGrips.add(u);this.container.getGripHomeContext().submitTask(()=>this._evaluate(),100)}removeBinding(l){const r=this.evaluator.getBinding(l);if(r)for(const o of r.query.conditions.keys())this.changedGrips.add(o);const u=this.evaluator.removeBinding(l);this.container.getGripHomeContext().submitTask(()=>this._evaluate(),100),u.removedInputs.forEach(o=>this._unsubscribeFromGrip(o))}_subscribeToGrip(l){if(this.dripSubscriptions.has(l))return;const u=this.container.getGripHomeContext().getOrCreateConsumer(l);this.isFirstEvaluation&&(this.valuesMap.set(l,u.get()),this.changedGrips.add(l));const o=u.subscribePriority(()=>{this._onGripChanged(l,u)});this.dripSubscriptions.set(l,o)}_unsubscribeFromGrip(l){const r=this.dripSubscriptions.get(l);r&&(r(),this.dripSubscriptions.delete(l),this.valuesMap.delete(l))}_onGripChanged(l,r){this.valuesMap.set(l,r.get()),this.changedGrips.add(l),this.container.getGripHomeContext().submitTask(()=>this._evaluate(),100)}_evaluate(){if(this.changedGrips.size===0&&!this.isFirstEvaluation)return;const l=this.changedGrips;this.changedGrips=new Set,this.isFirstEvaluation=!1;const r={getValue:o=>this.valuesMap.get(o)},u=this.evaluator.onGripsChanged(l,r);this.applyAttributionDelta(u)}applyAttributionDelta(l){this.container.getGrok().applyProducerDelta(this.container.getGripConsumerContext(),l)}},ly=class extends Rm{constructor(l,r){super(l,r),this.matcher=new ay(this)}addBinding(l){this.matcher.addBinding(l)}removeBinding(l){this.matcher.removeBinding(l)}},iy=class{constructor(l){this.graph=new Qv(this),this.taskQueue=new Fv,this.resolver=new Jv(this),this.registry=l,this.rootContext=new Gr(this,"root"),this.mainHomeContext=new Gr(this,"main-home").addParent(this.rootContext,0),this.mainPresentationContext=new Gr(this,"main-presentation").addParent(this.mainHomeContext,0),this.mainContext=new ly(this.mainHomeContext,this.mainPresentationContext)}getRegistry(){return this.registry}hasCycle(l){return this.graph.hasCycle(l)}submitTask(l,r,u){this.taskQueue.submit(l,r,u)}submitWeakTask(l,r){this.taskQueue.submitWeak(l,0,r)}getTaskQueue(){return this.taskQueue}flush(){this.taskQueue.flush()}ensureNode(l){return this.graph.ensureNode(l)}createContext(l,r=0,u){const o=new Gr(this,u);return(l??this.mainContext)&&o.addParent(l??this.mainContext,r),this.ensureNode(o),o}disposeContext(l){}createDualContext(l,r){const u=this.createContext(l,0),o=u.createChild();return this.ensureNode(o),new Rm(u,o)}registerTapAt(l,r){const u=l.getGripHomeContext();this.resolver.addProducer(u,r)}applyProducerDelta(l,r){this.resolver.applyProducerDelta(l,r)}registerTap(l){this.registerTapAt(this.mainContext,l)}unregisterTap(l){const r=l.getHomeContext();r&&this.resolver.removeProducer(r,l)}query(l,r){const u=r.getGripConsumerContext(),o=u.getGripConsumerContext()._getContextNode();var d=o.getLiveDripForGrip(l);return d?(o.getResolvedProviders().has(l)||this.resolver.addConsumer(u,l),d):(d=o.getOrCreateConsumer(l),this.resolver.addConsumer(u,l),d)}addBinding(l){this.mainContext.addBinding(l)}removeBinding(l){this.mainContext.removeBinding(l)}getGraph(){return this.graph.snapshot()}getGraphSanityCheck(){return this.graph.snapshotSanityCheck()}},Hm=class{constructor(l){if(this.kind="Tap",this.id=`tap_${Math.random().toString(36).substr(2,9)}`,this.paramDrips=new Map,this.paramDripsSubs=new Map,this.delayedUpdates=!0,this.paramUpdates=new Set,this.provides=l.provides,this.destinationParamGrips=l.destinationParamGrips,this.homeParamGrips=l.homeParamGrips,l.destinationParamGrips){for(const r of l.destinationParamGrips)if(this.provides.includes(r))throw new Error("Destination parameter grip is also provided by this tap")}}getHomeContext(){return this.homeContext}getParamsContext(){return this.paramsContext}onAttach(l){var r,u;if(l.getGripHomeContext){const f=l;r=f.getGripHomeContext(),u=f.getGripConsumerContext()}else r=l,u=r;this.homeContext=r,this.paramsContext=u;const o=this.homeContext._getContextNode();this.producer=o.getOrCreateProducerRecord(this,this.provides);for(const f of this.provides)o.recordProducer(f,this.producer);const d=r.getGrok();this.engine=d,this.subscribeToIncomingParams()}subscribeToIncomingParams(){if(!this.paramsContext||!this.homeParamGrips||this.homeParamGrips.length===0)return;this.delayedUpdates=!0;const l=this;for(const r of this.homeParamGrips){const u=this.paramsContext.getOrCreateConsumer(r),o=u.subscribe(()=>{l.inputParmsChanged(r)});this.paramDrips.set(r,u),this.paramDripsSubs.set(r,o)}}inputParmsChanged(l){this.paramUpdates.add(l),this.delayedUpdates||this.produceOnParams(l)}onDetach(){this.engine=void 0,this.homeContext=void 0,this.producer=void 0;for(const l of this.paramDripsSubs.values())try{l()}catch{}this.paramDripsSubs.clear(),this.paramDrips.clear()}getDestinationsForNode(l,r){const u=l.get_producers().get(r);if(!u)throw new Error("Grip not produced by this tap");return u.getDestinations().get(l)}onConnect(l,r){this.produce({destContext:l})}onDisconnect(l,r){const u=this.getDestination(l);if(!u)throw new Error("Destination not found for this tap");u.removeGrip(r)}getDestination(l){var r;return(r=this.producer)==null?void 0:r.getDestinations().get(l._getContextNode())}getDestParamValue(l,r){const u=this.getDestination(l);return u?.getDestinationParamValue(r)}getAllDestParamValues(l){const r=this.getDestination(l);return r?.getAllDestinationParamValues()}publish(l,r){if(!this.engine||!this.homeContext||!this.producer)return 0;var u=[];if(r){const d=r._getContextNode(),f=this.producer.getDestinations().get(d);if(!f)return 0;u.push(f)}else u=Array.from(this.producer.getDestinations().values());var o=0;for(const d of u){const f=d.getContext();if(f)for(const v of d.getGrips())l.has(v)&&(o+=f._getContextNode().notifyConsumers(v,l.get(v)))}return o}getDestinationParams(l){var r;return(r=this.producer)==null?void 0:r.getDestinationParams(l)}},ry=class extends Hm{constructor(l){super({provides:l.provides})}produceOnParams(l){throw new Error("Method not implemented.")}produceOnDestParams(l,r){throw new Error("Method not implemented.")}},sy=class extends ry{constructor(l,r,u){super({provides:u?.handleGrip?[l,u.handleGrip]:[l]}),this.listeners=new Set,this.valueGrip=l,this.handleGrip=u?.handleGrip,this.currentValue=r??l.defaultValue}produce(l){const r=new Map([[this.valueGrip,this.currentValue]]);this.handleGrip&&r.set(this.handleGrip,this),this.publish(r,l?.destContext)}get(){return this.currentValue}set(l){const r=l;this.currentValue!==r&&(this.currentValue=r,this.produce(),this.listeners.forEach(u=>u()))}update(l){this.set(l(this.currentValue))}subscribe(l){return this.listeners.add(l),()=>this.listeners.delete(l)}};function Wt(l,r){var u;return new sy(l,(u=r?.initial)!=null?u:l.defaultValue,r)}var uy=class extends Hm{constructor(l){var r;super({provides:l.handleGrip?[...l.provides,l.handleGrip]:l.provides,destinationParamGrips:l.destinationParamGrips,homeParamGrips:l.homeParamGrips}),this.state=new Map,this.homeParamUnsubs=[],this.computeFn=l.compute,this.handleGrip=l.handleGrip;const u=new Set((r=l.stateGrips)!=null?r:[]);if(l.initialState){const o=Array.isArray(l.initialState)?l.initialState:Array.from(l.initialState.keys()).map(d=>[d,void 0]);for(const[d]of o)u.add(d)}if(this.stateGripSet=u,l.initialState){const o=Array.isArray(l.initialState)?l.initialState:Array.from(l.initialState.entries());for(const[d,f]of o)this.state.set(d,f)}}getState(l){return this.state.get(l)}setState(l,r){this.state.get(l)!==r&&(this.state.set(l,r),this.produce())}onAttach(l){if(super.onAttach(l),this.homeParamGrips&&this.homeParamGrips.length>0)for(const r of this.homeParamGrips){const u=l.getOrCreateConsumer(r);l.getGrok().resolver.addConsumer(l,r);const o=u.subscribe(()=>{this.produce()});this.homeParamUnsubs.push(o)}}onDetach(){try{for(const l of this.homeParamUnsubs)l()}finally{this.homeParamUnsubs=[],super.onDetach()}}computeFor(l){const r=A=>{var C;return(C=this.homeContext)==null?void 0:C.getOrCreateConsumer(A).get()},u=(A,C)=>{var p,b;return(b=(p=C??l)!=null?p:this.homeContext)==null?void 0:b.getOrCreateConsumer(A).get()},o=A=>this.state.get(A),d=this.computeFn({dest:l,getHomeParam:r,getDestParam:u,getState:o}),f=new Map,v=[];for(const[A,C]of d){const p=A;this.stateGripSet.has(p)?v.push([p,C]):f.set(p,C)}if(v.length)for(const[A,C]of v)this.state.get(A)!==C&&this.state.set(A,C);return this.handleGrip&&f.set(this.handleGrip,this),f}produce(l){var r,u;if(l?.destContext){const d=this.computeFor(l.destContext);this.publish(d,l.destContext);return}const o=Array.from((u=(r=this.producer)==null?void 0:r.getDestinations().keys())!=null?u:[]);if(o.length!==0)for(const d of o){const f=d.get_context();if(!f)continue;const v=this.computeFor(f);this.publish(v,f)}}produceOnParams(){this.produce()}produceOnDestParams(l){this.produce({destContext:l})}};function Pr(l){return new uy(l)}jm();var Um=Lt.createContext(null);function oy(l){const r=l.context??l.grok.mainContext,u=Lt.useMemo(()=>({grok:l.grok,context:r}),[l.grok,r]);return m.jsx(Um.Provider,{value:u,children:l.children})}function cy(){const l=Lt.useContext(Um);if(!l)throw new Error("GripProvider missing");return l}function Ft(l,r){const{grok:u,context:o}=cy(),d=r&&r.getGripConsumerContext?r.getGripConsumerContext():r??o,f=Lt.useMemo(()=>u.query(l,d),[u,d,l]),v=Lt.useCallback(()=>f.get(),[f]),A=Lt.useCallback(C=>f.subscribe(()=>C()),[f]);return Lt.useSyncExternalStore(A,v,v)}function km(l,r){const u=Ft(l,r);return Lt.useCallback(o=>{u?u.set(o):console.warn(`useGripSetter: handle is undefined - no tap registered for: ${l.key}?`)},[u,l])}function Br(l,r,u){const{ctx:o,parse:d,format:f}={},v=Ft(l,o),A=km(r,o),C=(f?f(v):v)??"",p=Lt.useCallback(b=>{const g=b.target.value,N=d?d(g):g;N!==void 0&&A(N)},[A,d]);return{value:C,onChange:p}}function dy(l,r,u){const{ctx:o,emptyAs:d,clamp:f,parse:v,format:A}=u??{},C=Ft(l,o),p=km(r,o),b=Lt.useCallback(I=>{if(I==null)return I;let X=I;return f?.min!=null&&X<f.min&&(X=f.min),f?.max!=null&&X>f.max&&(X=f.max),X},[f?.min,f?.max]),g=Lt.useCallback(I=>{if(I==="")return d??void 0;const X=Number(I);return Number.isFinite(X)?X:d??void 0},[d]),N=A?A(C):C==null?"":String(C),Y=Lt.useCallback(I=>{const X=I.target.value,at=(v??g)(X),mt=b(at);mt!=null&&p(mt)},[p,v,g,b]);return{value:N,onChange:Y}}const Gm=new Lv,ct=Pv(Gm),Qo=new iy(Gm),fy=Qo.mainContext,Na={background:"#f6f8f7",borderWidth:0,borderColor:"#b7c2bc",wedgeStrokeWidth:1,wedgeStrokeColor:"#ffffff",collapseRedundant:!0,fontFamily:"sans-serif",fontSizePx:12,width:"fit",height:"fit",colorScheme:["#0f6b48","#2a9d8f","#e9c46a","#f4a261","#e76f51"]},Ci={format:"auto",delimiter:",",hasHeaderRow:!0,commentPrefix:"#",magnitudeField:"magnitude",pathFields:["level1","level2"],urlField:"url",descriptionField:"description",attributeFields:[]},Co=ct("AppView","selection"),hy=ct("AppView.Tap"),gi=ct("Projects",[]),my=ct("Projects.Tap"),vi=ct("ActiveProjectId",null),py=ct("ActiveProjectId.Tap"),rm=ct("ActiveProject",null),yi=ct("Datasets",[]),gy=ct("Datasets.Tap"),bi=ct("ActiveDatasetId",null),vy=ct("ActiveDatasetId.Tap"),Si=ct("ActiveDataset",null),To=ct("NewProjectName",""),Lm=ct("NewProjectName.Tap"),_o=ct("ImportSource",null),Pm=ct("ImportSource.Tap"),Eo=ct("ImportUrlInput",""),Bm=ct("ImportUrlInput.Tap"),No=ct("ImportParameters",Ci),qm=ct("ImportParameters.Tap"),sm=ct("ImportDetectedFormat",null),yy=ct("ImportDetectedFormat.Tap"),um=ct("ImportRows",[]),by=ct("ImportRows.Tap"),om=ct("ImportTree",null),Sy=ct("ImportTree.Tap"),wo=ct("ImportPreviewState",null),xy=ct("ImportPreviewState.Tap"),Mo=ct("ImportWarningsState",[]),Ay=ct("ImportWarningsState.Tap"),Do=ct("ImportFatalError",null),Cy=ct("ImportFatalError.Tap"),jo=ct("ImportLoading",!1),Ty=ct("ImportLoading.Tap"),Ro=ct("ImportCanApply",!1),_y=ct("ImportCanApply.Tap"),zo=ct("ImportDatasetName",""),Vm=ct("ImportDatasetName.Tap"),Oo=ct("PreviewFilter",""),Fm=ct("PreviewFilter.Tap"),Ho=ct("ImportPopoverOpen",!1),Ym=ct("ImportPopoverOpen.Tap"),gl=ct("ChartSettingsState",Na),Km=ct("ChartSettingsState.Tap"),xi=ct("ChartFocusPath",null),Ey=ct("ChartFocusPath.Tap"),Uo=ct("ChartSelectedPath",null),Ny=ct("ChartSelectedPath.Tap"),ko=ct("ChartHoverPath",null),wy=ct("ChartHoverPath.Tap"),vl=ct("ChartDepthLimit",6),Xm=ct("ChartDepthLimit.Tap"),Go=ct("ChartHistory",[]),My=ct("ChartHistory.Tap"),Lo=ct("ChartHistoryIndex",-1),Dy=ct("ChartHistoryIndex.Tap"),Fr=ct("ChartLayout",null),Xr=ct("JownaActions");function jy(l){const r=Oy({name:l.datasetName,tree:l.tree,depthLimit:l.depthLimit,chartSettings:l.chartSettings});return`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${zy(l.datasetName)}</title>
    <style>${Hy}</style>
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

    <script id="jowna-export-data" type="application/json">${r}<\/script>
    <script>${Uy}<\/script>
  </body>
</html>
`}function Ry(l){const r=l.trim().replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return`${r.length>0?r:"dataset-chart"}.html`}function zy(l){return l.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Oy(l){return JSON.stringify(l).replaceAll("<","\\u003c").replaceAll(">","\\u003e").replaceAll("&","\\u0026").replaceAll("\u2028","\\u2028").replaceAll("\u2029","\\u2029")}const Hy=`
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
`,Uy=`
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

      var innerRadius = radiusScale(node.depth - 1);
      var outerRadius = radiusScale(renderNode.outerDepth);
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
      var labelInnerRadius = radiusScale(labelNode.depth - 1);
      var labelOuterRadius = radiusScale(labelRenderNode.outerDepth);
      var label = createWedgeLabel(
        labelNode,
        labelInnerRadius,
        labelOuterRadius,
        maxDepth,
        labelRenderNode.outerDepth,
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
    centerDisc.setAttribute("r", String(radiusScale(0) + 42));
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
            outerDepth: node.depth,
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
            outerDepth: child.depth,
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
        var groupedColorPath = resolveGroupedColorPath(parentPath, first.path, visiblePathKeys);
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
          outerDepth: first.depth,
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
        return {
          node: entry.node,
          isGroupedHidden: entry.isGroupedHidden,
          hiddenCount: entry.hiddenCount,
          key: entry.key,
          colorPath: entry.colorPath,
          interactionPath: entry.interactionPath,
          outerDepth: parentKeys.has(pathKey(entry.node.path)) ? entry.node.depth : maxDepth,
        };
      }),
    };
  }

  function shouldGroupHiddenChild(child, radiusScale, minVisibleWidth) {
    var innerRadius = radiusScale(child.depth - 1);
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
`;class Qm{computeLayout(r){const u=qy(r.root,r.focusedPath),o=By(r.root,u)??r.root,d=u?u.slice(0,-1):[],f=Sl(o),v=r.settings.collapseRedundant!==!1,A=(r.root.children?.length??0)>1;return{nodes:Zm({node:o,pathPrefix:d,depth:0,startAngle:0,angleSpan:f>0?Math.PI*2:0,depthLimit:r.depthLimit,collapseRedundant:v,rootHasMultipleChildren:A}),totalMagnitude:f}}}function Zm(l){const r=[...l.pathPrefix,l.node.name],u=Sl(l.node),o=Math.max(0,l.angleSpan),f=[{path:r,name:l.node.name,depth:l.depth,magnitude:u,startAngle:l.startAngle,endAngle:l.startAngle+o}];if(!l.node.children||l.node.children.length===0||typeof l.depthLimit=="number"&&l.depth>=l.depthLimit)return f;const A=l.node.children.map(g=>{const N=Ly({node:g,collapseRedundant:l.collapseRedundant,rootHasMultipleChildren:l.rootHasMultipleChildren});return{child:N.node,pathSegments:N.pathSegments,magnitude:Sl(N.node)}}).filter(g=>g.magnitude>0).map(g=>({child:g.child,pathSegments:g.pathSegments,magnitude:g.magnitude,isUnclassified:!1})),C=A.reduce((g,N)=>g+N.magnitude,0),p=Math.max(0,u-C);p>1e-9&&A.push({child:null,pathSegments:[Gy(l.node.name)],magnitude:p,isUnclassified:!0});let b=l.startAngle;for(const g of A){const N=u===0?0:g.magnitude/u*o;g.isUnclassified||!g.child?f.push({path:r.concat(g.pathSegments),name:g.pathSegments[g.pathSegments.length-1]??"Unclassified",depth:l.depth+1,magnitude:g.magnitude,startAngle:b,endAngle:b+N}):f.push(...Zm({node:g.child,pathPrefix:r.concat(g.pathSegments.slice(0,-1)),depth:l.depth+1,startAngle:b,angleSpan:N,depthLimit:l.depthLimit,collapseRedundant:l.collapseRedundant,rootHasMultipleChildren:l.rootHasMultipleChildren})),b+=N}return f}function Sl(l){const r=ky(l.magnitude);if(!l.children||l.children.length===0)return r;const u=l.children.reduce((o,d)=>o+Sl(d),0);return Math.max(r,u)}function ky(l){return!Number.isFinite(l)||l<=0?0:l}function Gy(l){return`[other ${l}]`}function Ly(l){const r=[l.node.name];let u=l.node;if(!l.collapseRedundant)return{node:u,pathSegments:r};for(;Py(u,l.rootHasMultipleChildren);){const o=u.children?.[0];if(!o)break;u=o,r.push(o.name)}return{node:u,pathSegments:r}}function Py(l,r){const u=l.children??[];if(u.length!==1)return!1;const o=u[0],d=Sl(l),f=Sl(o);return Math.abs(d-f)>1e-9?!1:r||(o.children?.length??0)>0}function By(l,r){if(!r||r.length===0)return l;const[u,...o]=r;if(u!==l.name)return null;let d=l;for(const f of o){const v=d.children?.find(A=>A.name===f);if(!v)return null;d=v}return d}function qy(l,r){if(!r||r.length===0)return null;const u=r.map(o=>o.trim()).filter(o=>o.length>0);return u.length===0||u[0]!==l.name?null:u}const Im=270,Vy=10,Fy=.5,cm=.6,dm=.8,yl="rgb(220,220,220)",Yr=4,bo=[{label:"Krona (sans-serif)",value:"sans-serif"},{label:"Arial",value:"Arial"},{label:"Helvetica",value:"Helvetica"},{label:"Verdana",value:"Verdana"},{label:"IBM Plex Sans",value:"IBM Plex Sans"},{label:"System UI",value:"system-ui"},{label:"Times New Roman",value:"Times New Roman"},{label:"Courier New",value:"Courier New"},{label:"Monospace",value:"monospace"}];function Yy(){const l=Ft(Xr),r=Ft(Si),u=Ft(Fr),o=Ft(xi),d=Ft(Uo),f=Ft(ko),v=Ft(Go)??[],A=Ft(Lo)??-1,C=Ft(gl),p=Ft(Km),b=Ft(vl)??0,[g,N]=Lt.useState(!1),[Y,I]=Lt.useState(!1),[X,at]=Lt.useState(null),[mt,ot]=Lt.useState({width:"",height:""}),[gt,Ht]=Lt.useState(null),te=Lt.useRef(null),Et=dy(vl,Xm,{emptyAs:0,clamp:{min:0,max:12}}),k=C??Na,E={background:k.background,borderWidth:`${Math.max(0,k.borderWidth)}px`,borderColor:k.borderColor},w={width:typeof k.width=="number"?`${Math.max(240,k.width)}px`:void 0,height:typeof k.height=="number"?`${Math.max(240,k.height)}px`:void 0,overflow:"visible"},P=Math.max(Yr,k.fontSizePx),$=typeof k.width=="number"?"custom":"fit",J=typeof k.height=="number"?"custom":"fit",dt=gt==="width"?mt.width:typeof k.width=="number"?String(k.width):"",vt=gt==="height"?mt.height:typeof k.height=="number"?String(k.height):"",qt=Lt.useMemo(()=>{const H=k.fontFamily;return bo.some(et=>et.value===H)?bo:[{label:`Custom (${H})`,value:H},...bo]},[k.fontFamily]),O=Lt.useMemo(()=>r?new Qm().computeLayout({root:r.tree,settings:{...Na,collapseRedundant:k.collapseRedundant},focusedPath:null,depthLimit:null}):null,[r,k.collapseRedundant]),B=Lt.useMemo(()=>l0(O??u??null),[O,u]),K=r?o??[r.tree.name]:null,Z=f??d??K,rt=r?Iy(r.tree,Z):null,y=Z&&u?u.nodes.find(H=>hi(H.path,Z))??null:null,x=Z?De(Z):null,T=Object.entries(rt?.attributes??{}),R=d0(T),F=R?T.find(([H])=>H===R)?.[1]??"":"",Q=R?f0(F,R):[],lt=new Set(T.filter(([H,et])=>tp(H,et)).map(([H])=>H)),W="Unassigned Members",nt=T.filter(([H])=>!lt.has(H)&&!o0(H)),bt=!!(x&&X===x),ht=u?.totalMagnitude??0,xt=y?.magnitude??rt?.magnitude??0,Yt=ht>0?xt/ht*100:0,Nt=(u?.nodes.filter(H=>H.depth===1&&!bl(H.name))??[]).sort((H,et)=>et.magnitude!==H.magnitude?et.magnitude-H.magnitude:H.name.localeCompare(et.name)),Tt=Nt.slice(0,Vy),yt=Nt.length-Tt.length,se=Wm(u??null),_t=$y(se,b),wt=$m(_t,Im),Qt=Lt.useMemo(()=>Wy(u??null,_t,P),[u,P,_t]),ye=K&&K.length>1?K.slice(0,-1):null,xe=()=>{if(!r)return;const H=jy({datasetName:r.name,tree:r.tree,depthLimit:b,chartSettings:k});Ky(Ry(r.name),H)},sn=()=>{!r||!te.current||Xy(Zy(r.name),te.current)},Ut=()=>{x&&at(H=>H===x?null:x)},Ae=()=>{at(null)};Lt.useEffect(()=>{if(gt!=="width"){const H=typeof k.width=="number"?String(k.width):"";ot(et=>et.width===H?et:{...et,width:H})}if(gt!=="height"){const H=typeof k.height=="number"?String(k.height):"";ot(et=>et.height===H?et:{...et,height:H})}},[gt,k.height,k.width,ot]);const ee=H=>{const et={...H,colorScheme:Array.isArray(H.colorScheme)?[...H.colorScheme]:H.colorScheme};if(l?.setProjectChartSettings){l.setProjectChartSettings(et);return}p?.set(et)},zt=H=>{const et=p?.get()??k;ee({...et,...H})},ge=(H,et)=>{if(et==="fit"){Ht(ne=>ne===H?null:ne),ot(ne=>({...ne,[H]:""})),zt({[H]:"fit"});return}const kt=k[H],ie=H==="width"?620:640,Re=typeof kt=="number"&&Number.isFinite(kt)?Math.max(240,kt):ie;ot(ne=>({...ne,[H]:String(Re)})),zt({[H]:Re})},G=H=>et=>{ot(kt=>({...kt,[H]:et.target.value}))},st=H=>()=>{Ht(H)},tt=H=>et=>{Ht(Re=>Re===H?null:Re);const kt=Number.parseInt(et.target.value,10);if(!Number.isFinite(kt)){const Re=typeof k[H]=="number"?String(k[H]):"";ot(ne=>({...ne,[H]:Re}));return}const ie=Math.max(240,kt);ot(Re=>({...Re,[H]:String(ie)})),zt({[H]:ie})},Gt=()=>{I(H=>!H),at(null)};return m.jsxs("div",{className:"app-shell",children:[m.jsxs("div",{className:"app-frame chart-screen-frame",children:[m.jsxs("header",{className:"panel row",style:{justifyContent:"space-between"},children:[m.jsxs("div",{children:[m.jsx("h1",{style:{marginBottom:4},children:"Chart View"}),m.jsx("div",{className:"muted",children:r?.name??"No active dataset"})]}),m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:()=>N(!0),children:"Chart Settings"}),m.jsx("button",{className:"ghost",onClick:xe,disabled:!r,children:"Download HTML"}),m.jsx("button",{className:"ghost",onClick:sn,disabled:!r||!u,children:"Download SVG"}),m.jsx("button",{className:"ghost",onClick:()=>l?.backToSelection(),children:"Back to Selection"})]})]}),m.jsxs("div",{className:"panel row chart-toolbar",style:{justifyContent:"space-between"},children:[m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:()=>l?.goBack(),disabled:A<=0,children:"Back"}),m.jsx("button",{className:"ghost",onClick:()=>l?.goForward(),disabled:A>=v.length-1,children:"Forward"}),m.jsx("button",{className:"ghost",onClick:()=>ye&&l?.focusPath(ye),disabled:!ye,children:"Up"}),m.jsx("button",{className:"ghost",onClick:()=>l?.clearFocus(),children:"Reset"}),m.jsx("button",{className:"ghost",onClick:Gt,children:Y?"Show Details":"Hide Details"})]}),m.jsxs("div",{className:"row",style:{minWidth:220},children:[m.jsxs("label",{className:"row chart-collapse-wrap",children:[m.jsx("input",{type:"checkbox",checked:k.collapseRedundant,onChange:H=>zt({collapseRedundant:H.target.checked})}),m.jsx("span",{children:"Collapse"})]}),m.jsx("span",{className:"muted",children:"Depth"}),m.jsx("input",{type:"number",...Et,min:0,max:12})]})]}),K&&m.jsxs("div",{className:"panel chart-breadcrumbs",children:[m.jsx("span",{className:"muted",children:"Focus"}),K.map((H,et)=>{const kt=K.slice(0,et+1),ie=et===K.length-1;return m.jsx("button",{className:`crumb ${ie?"is-current":""}`,onClick:()=>l?.focusPath(kt),children:H},`${H}-${et}`)})]}),m.jsxs("div",{className:`chart-layout ${Y?"is-details-hidden":""}`,children:[m.jsx("section",{className:"chart-surface chart-surface-krona",style:E,children:!r||!u?m.jsx("div",{className:"muted",children:"No chart data yet. Import a dataset and open chart."}):m.jsxs(m.Fragment,{children:[m.jsxs("svg",{ref:te,className:"chart-canvas chart-canvas-krona",viewBox:"0 0 620 620",role:"img",style:w,children:[m.jsx("defs",{children:m.jsxs("pattern",{id:"chart-hidden-pattern",patternUnits:"userSpaceOnUse",x:"0",y:"0",width:"7",height:"7",children:[m.jsx("line",{x1:"0",y1:"0",x2:"3.5",y2:"3.5",stroke:"rgba(16,36,27,0.35)",strokeWidth:"0.8"}),m.jsx("line",{x1:"3.5",y1:"7",x2:"7",y2:"3.5",stroke:"rgba(16,36,27,0.35)",strokeWidth:"0.8"})]})}),m.jsxs("g",{transform:"translate(310 310)",style:{fontFamily:k.fontFamily},children:[Qt.visibleNodes.map(H=>{const et=H.node,kt=H.interactionPath,ie=wt(et.depth-1),Re=wt(H.outerDepth),ne=Jy(ie,Re,et.startAngle,et.endAngle);if(!ne)return null;const Qe=kt.length>0&&!bl(et.name),Ce=Qe&&Z?hi(kt,Z):!1,oa=Qe&&K?hi(kt,K):!1,Ma=bl(et.name)?yl:hm(B,[H.colorPath,kt,et.path],yl),gn=H.key,Da=H.isGroupedHidden?`${H.hiddenCount} more`:`${et.path.join(" / ")}: ${et.magnitude.toLocaleString()}`;return m.jsxs("g",{children:[m.jsx("path",{className:`chart-wedge ${Ce?"is-active":""} ${oa?"is-focus":""}`,d:ne,fill:Ma,stroke:Ce?"#062d1e":k.wedgeStrokeColor,strokeWidth:Ce?2.2:Math.max(.4,k.wedgeStrokeWidth),opacity:Qe&&f?Ce?1:.42:oa?1:.92,role:Qe?"button":void 0,tabIndex:Qe?0:void 0,onMouseEnter:Qe?()=>l?.hoverPath(kt):void 0,onMouseLeave:Qe?()=>l?.hoverPath(null):void 0,onClick:Qe?()=>l?.focusPath(kt):void 0,onKeyDown:Qe?vn=>{(vn.key==="Enter"||vn.key===" ")&&(vn.preventDefault(),l?.focusPath(kt))}:void 0,children:m.jsx("title",{children:Da})}),H.isGroupedHidden&&m.jsx("path",{d:ne,fill:"url(#chart-hidden-pattern)",stroke:"none",opacity:.65,pointerEvents:"none"})]},gn)}),Qt.visibleNodes.map(H=>{const et=H.node,kt=H.interactionPath,ie=wt(et.depth-1),Re=wt(H.outerDepth),ne=e0(et,ie,Re,_t,H.outerDepth,P);if(!ne)return null;const Ce=!!f&&hi(kt,f??[])&&ne.isTruncated?n0(ne,P):null;return m.jsxs("g",{children:[Ce&&m.jsxs("g",{className:"chart-label-tooltip",pointerEvents:"none",children:[m.jsx("rect",{className:"chart-label-tooltip-box",x:Ce.x,y:Ce.y,width:Ce.width,height:Ce.height,rx:7,ry:7,fill:"#ffffff",stroke:k.wedgeStrokeColor,strokeWidth:Math.max(.4,k.wedgeStrokeWidth)+.5}),m.jsx("text",{className:"chart-label-tooltip-text",x:Ce.textX,y:Ce.textY,textAnchor:"middle",dominantBaseline:"middle",style:{fontFamily:k.fontFamily,fontSize:`${P}px`},children:ne.fullText})]}),m.jsx("text",{className:"chart-wedge-label",x:ne.x,y:ne.y,textAnchor:ne.anchor,dominantBaseline:"middle",transform:`rotate(${ne.rotate} ${ne.x} ${ne.y})`,style:{fontFamily:k.fontFamily,fontSize:`${P}px`},children:ne.text})]},`label-${H.key}`)}),m.jsx("circle",{r:wt(0)+42,className:"chart-center-disc",onClick:()=>ye?l?.focusPath(ye):l?.clearFocus()}),m.jsx("text",{x:0,y:-18,textAnchor:"middle",className:"chart-center-title",children:rt?.name??K?.[K.length-1]??"Root"}),m.jsx("text",{x:0,y:2,textAnchor:"middle",className:"chart-center-metric",children:xt.toLocaleString()}),m.jsxs("text",{x:0,y:22,textAnchor:"middle",className:"chart-center-sub",children:[Yt.toFixed(1),"% of view"]})]})]}),m.jsx("div",{className:"chart-hint muted",children:"Click a segment to zoom. Hover to inspect. Click center to move up."})]})}),!Y&&m.jsxs("aside",{className:"panel stack chart-details",children:[m.jsx("h3",{children:f?"Hover Details":"Details"}),rt?m.jsxs("div",{className:"stack",children:[m.jsx("div",{children:m.jsx("strong",{children:rt.name})}),m.jsxs("div",{className:"muted",children:["path: ",(Z??[]).join(" / ")]}),m.jsxs("div",{className:"chart-stats",children:[m.jsxs("div",{className:"chart-stat",children:[m.jsx("span",{className:"muted",children:"Magnitude"}),m.jsx("strong",{children:xt.toLocaleString()})]}),m.jsxs("div",{className:"chart-stat",children:[m.jsx("span",{className:"muted",children:"Share"}),m.jsxs("strong",{children:[Yt.toFixed(1),"%"]})]}),m.jsxs("div",{className:"chart-stat",children:[m.jsx("span",{className:"muted",children:"Children"}),m.jsx("strong",{children:rt.children?.length??0})]})]}),rt.description&&m.jsx("div",{children:rt.description}),rt.url&&m.jsx("div",{children:m.jsx("a",{href:rt.url,target:"_blank",rel:"noreferrer",children:rt.url})}),m.jsxs("div",{className:"stack",children:[nt.map(([H,et])=>m.jsxs("div",{className:"muted",children:[m.jsxs("strong",{children:[H,":"]})," ",et]},H)),m.jsx("button",{className:"ghost members-popover-trigger",onClick:Ut,"aria-haspopup":"dialog","aria-expanded":bt,children:`${W} (${Q.length})`})]})]}):m.jsx("div",{className:"muted",children:"Hover or click a wedge to inspect node details."}),m.jsxs("div",{className:"stack",children:[m.jsx("h3",{children:"Top Segments"}),Tt.length===0?m.jsx("div",{className:"muted",children:"No segments in the current view."}):m.jsxs("div",{className:"stack",children:[Tt.map(H=>{const et=ht>0?H.magnitude/ht*100:0,kt=Z?hi(H.path,Z):!1;return m.jsxs("button",{className:`key-row ${kt?"is-active":""}`,onMouseEnter:()=>l?.hoverPath(H.path),onMouseLeave:()=>l?.hoverPath(null),onClick:()=>l?.focusPath(H.path),children:[m.jsx("span",{className:"legend-dot",style:{background:hm(B,[H.path],yl)}}),m.jsx("span",{className:"key-label",children:H.name}),m.jsxs("span",{className:"key-value",children:[et.toFixed(1),"%"]})]},`key-${H.path.join("/")}`)}),yt>0&&m.jsxs("div",{className:"muted",children:["+ ",yt," more in this level"]})]})]})]})]})]}),!Y&&bt&&m.jsx("div",{className:"members-popover-layer",children:m.jsxs("section",{className:"panel members-popover members-popover-floating",role:"dialog","aria-label":`${W} list`,children:[m.jsxs("header",{className:"members-popover-header",children:[m.jsx("strong",{children:`${W} (${Q.length})`}),m.jsx("button",{className:"ghost popover-x",onClick:Ae,"aria-label":"Close members list",children:"X"})]}),m.jsx("div",{className:"members-popover-list",children:Q.map((H,et)=>m.jsx("div",{className:"members-popover-item",children:H},`${H}-${et}`))}),m.jsx("footer",{className:"members-popover-footer",children:m.jsx("button",{className:"ghost",onClick:Ae,children:"Close"})})]})}),g&&m.jsx("div",{className:"chart-settings-popover-backdrop",onClick:()=>N(!1),children:m.jsxs("section",{className:"panel chart-settings-popover",role:"dialog","aria-modal":"true","aria-label":"Chart settings",onClick:H=>H.stopPropagation(),children:[m.jsxs("header",{className:"chart-settings-popover-header",children:[m.jsx("h2",{children:"Chart Settings"}),m.jsx("button",{className:"ghost popover-x",onClick:()=>N(!1),"aria-label":"Close chart settings",children:"X"})]}),m.jsx("div",{className:"chart-settings-popover-body",children:m.jsxs("div",{className:"chart-settings-grid",children:[m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Background"}),m.jsxs("div",{className:"row",children:[m.jsx("input",{className:"chart-color-input",type:"color",value:xo(k.background,"#f6f8f7"),onChange:H=>zt({background:H.target.value})}),m.jsx("input",{value:k.background,onChange:H=>zt({background:H.target.value})})]})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Border Color"}),m.jsxs("div",{className:"row",children:[m.jsx("input",{className:"chart-color-input",type:"color",value:xo(k.borderColor,"#b7c2bc"),onChange:H=>zt({borderColor:H.target.value})}),m.jsx("input",{value:k.borderColor,onChange:H=>zt({borderColor:H.target.value})})]})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Border Width"}),m.jsx("input",{type:"number",min:0,step:.2,value:k.borderWidth,onChange:H=>{const et=Number.parseFloat(H.target.value);Number.isFinite(et)&&zt({borderWidth:Math.max(0,et)})}})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Wedge Stroke Color"}),m.jsxs("div",{className:"row",children:[m.jsx("input",{className:"chart-color-input",type:"color",value:xo(k.wedgeStrokeColor,"#ffffff"),onChange:H=>zt({wedgeStrokeColor:H.target.value})}),m.jsx("input",{value:k.wedgeStrokeColor,onChange:H=>zt({wedgeStrokeColor:H.target.value})})]})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Wedge Stroke Width"}),m.jsx("input",{type:"number",min:.4,step:.2,value:k.wedgeStrokeWidth,onChange:H=>{const et=Number.parseFloat(H.target.value);Number.isFinite(et)&&zt({wedgeStrokeWidth:Math.max(.4,et)})}})]}),m.jsxs("label",{className:"row",style:{alignItems:"center"},children:[m.jsx("input",{type:"checkbox",style:{width:"auto"},checked:k.collapseRedundant,onChange:H=>zt({collapseRedundant:H.target.checked})}),m.jsx("span",{children:"Collapse redundant wedges"})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Font Family"}),m.jsx("select",{value:k.fontFamily,onChange:H=>zt({fontFamily:H.target.value}),children:qt.map(H=>m.jsx("option",{value:H.value,children:H.label},H.value))})]}),m.jsxs("label",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Font Size (px)"}),m.jsx("input",{type:"number",min:Yr,step:1,value:k.fontSizePx,onChange:H=>{const et=Number.parseFloat(H.target.value);Number.isFinite(et)&&zt({fontSizePx:Math.max(Yr,et)})}})]}),m.jsxs("div",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Chart Width"}),m.jsxs("div",{className:"row chart-dimension-row",children:[m.jsxs("select",{value:$,onChange:H=>ge("width",H.target.value),children:[m.jsx("option",{value:"fit",children:"Fit"}),m.jsx("option",{value:"custom",children:"Custom"})]}),m.jsx("input",{type:"number",min:240,step:10,value:dt,onChange:G("width"),onFocus:st("width"),onBlur:tt("width"),disabled:$==="fit"})]})]}),m.jsxs("div",{className:"stack",children:[m.jsx("span",{className:"muted",children:"Chart Height"}),m.jsxs("div",{className:"row chart-dimension-row",children:[m.jsxs("select",{value:J,onChange:H=>ge("height",H.target.value),children:[m.jsx("option",{value:"fit",children:"Fit"}),m.jsx("option",{value:"custom",children:"Custom"})]}),m.jsx("input",{type:"number",min:240,step:10,value:vt,onChange:G("height"),onFocus:st("height"),onBlur:tt("height"),disabled:J==="fit"})]})]})]})}),m.jsxs("footer",{className:"row chart-settings-popover-footer",children:[m.jsx("button",{className:"ghost",onClick:()=>ee({...Na}),children:"Reset Defaults"}),m.jsx("button",{className:"ghost",onClick:()=>N(!1),children:"Close"})]})]})})]})}function Ky(l,r){const u=new Blob([r],{type:"text/html;charset=utf-8"});Jm(l,u)}function Xy(l,r){const u=Qy(r),o=new Blob([u],{type:"image/svg+xml;charset=utf-8"});Jm(l,o)}function Jm(l,r){const u=URL.createObjectURL(r),o=document.createElement("a");o.href=u,o.download=l,o.rel="noopener",o.click(),URL.revokeObjectURL(u)}function Qy(l){const r=l.cloneNode(!0);r.setAttribute("xmlns","http://www.w3.org/2000/svg"),r.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");const u=r.getAttribute("viewBox");if(u){const d=u.trim().split(/\s+/).map(f=>Number.parseFloat(f));d.length===4&&d.every(f=>Number.isFinite(f))&&(r.setAttribute("width",String(d[2])),r.setAttribute("height",String(d[3])))}const o=document.createElementNS("http://www.w3.org/2000/svg","style");return o.textContent=`
    .chart-wedge-label{fill:#0e2b1f;font-weight:600}
    .chart-center-disc{fill:#f4faf7;stroke:#c4d8cc;stroke-width:1.4}
    .chart-center-title{font-size:13px;font-weight:700;fill:#102a1f}
    .chart-center-metric{font-size:15px;font-weight:700;fill:#174936}
    .chart-center-sub{font-size:11px;fill:#4f675d}
  `,r.insertBefore(o,r.firstChild),`<?xml version="1.0" encoding="UTF-8"?>
${r.outerHTML}`}function Zy(l){const r=l.trim().replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return`${r.length>0?r:"dataset-chart"}.svg`}function Iy(l,r){if(!r||r.length===0)return l;const[u,...o]=r;if(u!==l.name)return null;let d=l;for(const f of o){const v=d.children?.find(A=>A.name===f);if(!v)return null;d=v}return d}function Jy(l,r,u,o){if(o<=u)return"";const d=o-u>Math.PI?1:0,f=Ai(r,u),v=Ai(r,o);if(l<=0)return[`M ${f.x} ${f.y}`,`A ${r} ${r} 0 ${d} 1 ${v.x} ${v.y}`,"L 0 0","Z"].join(" ");const A=Ai(l,o),C=Ai(l,u);return[`M ${f.x} ${f.y}`,`A ${r} ${r} 0 ${d} 1 ${v.x} ${v.y}`,`L ${A.x} ${A.y}`,`A ${l} ${l} 0 ${d} 0 ${C.x} ${C.y}`,"Z"].join(" ")}function Ai(l,r){return{x:Math.cos(r+Math.PI/2)*l,y:Math.sin(r+Math.PI/2)*l}}function $m(l,r){return u=>{if(u<=0||l<=0)return 0;const o=u/l;return Math.pow(o,.86)*r}}function $y(l,r){return l<=0?0:r<=0?l:Math.min(r,l)}function Wy(l,r,u){if(!l||l.nodes.length===0)return{visibleNodes:[]};const o=l.nodes.filter(g=>g.depth>0);if(o.length===0||r<=0)return{visibleNodes:o.map(g=>({node:g,isGroupedHidden:!1,hiddenCount:0,key:De(g.path),colorPath:g.path,interactionPath:g.path,outerDepth:g.depth}))};const d=Math.max(Yr,u)*2.3,f=$m(r,Im),v=new Map,A=new Set(o.map(g=>De(g.path)));for(const g of o){const N=De(g.path.slice(0,-1)),Y=v.get(N);Y?Y.push(g):v.set(N,[g])}v.forEach(g=>{g.sort((N,Y)=>N.startAngle!==Y.startAngle?N.startAngle-Y.startAngle:N.endAngle-Y.endAngle)});const C=[];for(const[g,N]of v.entries()){let Y=0,I=0;for(;Y<N.length;){const X=N[Y];if(!fm(X,f,d)){C.push({node:X,isGroupedHidden:!1,hiddenCount:0,key:De(X.path),colorPath:X.path,interactionPath:X.path,outerDepth:X.depth}),Y+=1;continue}let at=Y;for(;at+1<N.length&&fm(N[at+1],f,d);)at+=1;const mt=N.slice(Y,at+1),ot=mt[0],gt=mt[mt.length-1],Ht=ot.path.slice(0,-1),te=Ht.length>0?Ht:ot.path,Et=t0(Ht,ot.path,A),k=mt.length,E=mt.reduce((w,P)=>w+P.magnitude,0);C.push({node:{path:ot.path.slice(0,-1).concat([`${k} more`]),name:`${k} more`,depth:ot.depth,magnitude:E,startAngle:ot.startAngle,endAngle:gt.endAngle},isGroupedHidden:!0,hiddenCount:k,key:`${g}/[${k}-more-${I}]`,colorPath:Et,interactionPath:te,outerDepth:ot.depth}),I+=1,Y=at+1}}const p=C.sort((g,N)=>g.node.depth!==N.node.depth?g.node.depth-N.node.depth:g.node.startAngle!==N.node.startAngle?g.node.startAngle-N.node.startAngle:g.node.endAngle!==N.node.endAngle?g.node.endAngle-N.node.endAngle:g.key.localeCompare(N.key)),b=new Set(p.map(g=>De(g.node.path.slice(0,-1))));return{visibleNodes:p.map(g=>({...g,outerDepth:b.has(De(g.node.path))?g.node.depth:r}))}}function fm(l,r,u){const o=r(l.depth-1),d=r(l.depth);return Math.max(0,l.endAngle-l.startAngle)*(o+d)<u}function t0(l,r,u){for(let o=l.length;o>=2;o-=1){const d=l.slice(0,o);if(u.has(De(d)))return d}return r}function e0(l,r,u,o,d,f){const v=o<=1||d>=o,A=l.endAngle-l.startAngle,C=u-r,p=r+C*(v?.6:.56),b=p*A,g=v?.007:.04,N=v?6:10,Y=v?2:10;if(A<g||C<N||b<Y)return null;const I=(l.startAngle+l.endAngle)/2,X=Ai(p,I),at=Math.max(4,f*.58),mt=v?Math.max(0,C-f*.45):Math.max(0,b-f*.35),ot=Math.max(v?4:6,Math.floor(mt/at)),gt=l.name.length>ot,Ht=a0(l.name,ot),te=v?I*180/Math.PI-90:I*180/Math.PI,Et=u0(te),k=Et>90||Et<-90,E=k?Et+180:Et;return{text:Ht,fullText:l.name,isTruncated:gt,x:X.x,y:X.y,rotate:E,anchor:v?k?"end":"start":"middle"}}function n0(l,r){const f=Math.max(20,l.fullText.length*r*.58)+18,v=r+10+2,A=l.x,C=l.y-r*1.2;return{x:A-f/2,y:C-v/2,width:f,height:v,textX:A,textY:C}}function a0(l,r){return l.length<=r?l:`${l.slice(0,Math.max(0,r-3))}...`}function l0(l){const r=new Map;if(!l||l.nodes.length===0)return r;const u=l.nodes.find(p=>p.depth===0)??l.nodes[0],o=new Set(l.nodes.map(p=>De(p.path))),d=new Map;for(const p of l.nodes){if(bl(p.name)){r.set(De(p.path),yl);continue}if(p.depth===0)continue;const b=De(i0(p.path.slice(0,-1),o)),g=d.get(b);g?g.push(p):d.set(b,[p])}d.forEach(p=>{p.sort((b,g)=>b.startAngle!==g.startAngle?b.startAngle-g.startAngle:b.endAngle-g.endAngle)});const f=Wm(l),v=f>8?8:Math.max(f,1),A=(dm-cm)/v,C=(p,b,g)=>{let N=g;if(N-b>1/12&&(N=b+1/12),p.depth>0)if(p.magnitude<=0||bl(p.name))r.set(De(p.path),yl);else{const I=Math.min(dm,cm+(p.depth-1)*A),X=s0(b,Fy,I);r.set(De(p.path),r0(X.r,X.g,X.b))}const Y=d.get(De(p.path))??[];if(Y.length!==0)for(let I=0;I<Y.length;I+=1){const X=Y[I];let at,mt;p.depth===0?Y.length>6?(at=(1-Math.pow(1-I/Y.length,1.4))*.95,mt=(1-Math.pow(1-(I+.55)/Y.length,1.4))*.95):(at=I/Y.length,mt=(I+.55)/Y.length):(at=mm(X.startAngle,p.startAngle,p.endAngle,b,N),mt=mm(X.startAngle+(X.endAngle-X.startAngle)*.99,p.startAngle,p.endAngle,b,N)),C(X,at,mt)}};return C(u,0,1),r}function hm(l,r,u=yl){for(const o of r)if(!(!o||o.length===0))for(let d=o.length;d>=1;d-=1){const f=l.get(De(o.slice(0,d)));if(typeof f=="string"&&f.length>0)return f}return u}function i0(l,r){for(let u=l.length;u>=0;u-=1){const o=l.slice(0,u);if(r.has(De(o)))return o}return[]}function mm(l,r,u,o,d){return u===r?o:o+(l-r)/(u-r)*(d-o)}function r0(l,r,u){return`rgb(${l},${r},${u})`}function s0(l,r,u){const o=u<=.5?u*(r+1):u+r-u*r,d=u*2-o;return{r:Math.floor(So(d,o,l+1/3)),g:Math.floor(So(d,o,l)),b:Math.floor(So(d,o,l-1/3))}}function So(l,r,u){let o=u;for(;o<0;)o+=1;for(;o>1;)o-=1;let d;return 6*o<1?d=l+(r-l)*o*6:2*o<1?d=r:3*o<2?d=l+(r-l)*(2/3-o)*6:d=l,d*255}function hi(l,r){return l.length===r.length&&l.every((u,o)=>u===r[o])}function De(l){return l.join("/")}function xo(l,r){const u=l.trim();return/^#[0-9a-fA-F]{6}$/.test(u)?u:/^#[0-9a-fA-F]{3}$/.test(u)?`#${u[1]}${u[1]}${u[2]}${u[2]}${u[3]}${u[3]}`:r}function u0(l){let r=l;for(;r<=-180;)r+=360;for(;r>180;)r-=360;return r}function bl(l){return l.trim().toLowerCase().startsWith("[other ")}function Wm(l){if(!l||l.nodes.length===0)return 0;let r=0;for(const u of l.nodes)u.depth<=0||bl(u.name)||u.depth>r&&(r=u.depth);return r>0?r:l.nodes.reduce((u,o)=>Math.max(u,o.depth),0)}function o0(l){const r=Wr(l);return/\bunassigned\b/.test(r)}function c0(l){const r=Wr(l);return/\bunassigned\b/.test(r)&&/\bmembers?\b/.test(r)}function tp(l,r){const u=Wr(l);return/\bmembers?\b/.test(u)?r.trim().length>0:!1}function d0(l){const r=l.find(([o])=>c0(o));return r?r[0]:l.find(([o,d])=>tp(o,d))?.[0]??null}function f0(l,r){const u=l.trim();if(u.length===0)return[];if(u.startsWith("[")&&u.endsWith("]")||u.startsWith("{")&&u.endsWith("}"))try{const f=JSON.parse(u);if(Array.isArray(f))return Array.from(new Set(f.map(v=>String(v).trim()).filter(v=>v.length>0)))}catch{}if((r?/\bmembers?\b/.test(Wr(r)):!1)&&!/[,\n;|]/.test(u)){const f=u.split(/\s+/).filter(v=>v.length>0);if(f.length>1&&f.every(v=>/^[\w./:-]+$/.test(v)))return Array.from(new Set(f))}const d=u.includes(`
`)?/\r?\n+/:u.includes(";")?/\s*;\s*/:u.includes("|")?/\s*\|\s*/:/\s*,\s*/;return Array.from(new Set(u.split(d).map(f=>f.trim()).filter(f=>f.length>0)))}function Wr(l){return l.replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").trim().toLowerCase()}function h0(){const r=Ft(Xr),u=Ft(gi)??[],o=Ft(vi),d=Ft(yi)??[],f=Ft(bi),v=Ft(_o),A=Ft(No)??Ci,C=Ft(qm),p=Ft(Pm),b=Ft(wo),g=Ft(Mo)??[],N=Ft(Do),Y=Ft(jo)??!1,I=Ft(Ro)??!1,X=Ft(Ho)??!1,at=Ft(Ym),mt=Br(To,Lm),ot=Br(zo,Vm),gt=Br(Oo,Fm),Ht=Br(Eo,Bm),[te,Et]=Lt.useState(null),[k,E]=Lt.useState(""),[w,P]=Lt.useState(null),[$,J]=Lt.useState(""),[dt,vt]=Lt.useState(null),[qt,O]=Lt.useState([]),[B,K]=Lt.useState(null),[Z,rt]=Lt.useState(""),y=Lt.useRef(null),x=(b?.rows??[]).filter(G=>{const st=gt.value.trim().toLowerCase();return st.length===0?!0:[String(G.sourceRow),String(G.magnitude),G.path.join(" / "),G.url??"",G.description??"",...Object.values(G.attributes)].join(" ").toLowerCase().includes(st)}),T=G=>{C?.update(st=>({...st??Ci,...G}))},R=()=>{at?.set(!0)},F=()=>{at?.set(!1)},Q=()=>{at?.set(!1)},lt=async G=>{r&&(await r.openProject(G),at?.set(!0))},W=async G=>{r&&await r.openProject(G)},nt=async(G,st)=>{if(r)try{await r.exportProjectArchive(G),vt(`Downloaded archive for '${st}'.`),O([])}catch(tt){console.warn("Failed exporting project archive",tt);const Gt=tt instanceof Error?tt.message:"Unknown export error.";vt(`Warning: ${Gt}`),O([])}},bt=()=>{y.current?.click()},ht=async G=>{const st=G.target.files?.[0]??null;if(G.target.value="",!(!st||!r))try{const tt=await r.importProjectArchive(st),Gt=tt.warnings.length,H=Gt>0?` with ${Gt} warning(s).`:".",et=tt.mode==="krona-html"?"Krona HTML project":"project archive";vt(`Imported ${et} '${tt.projectName}' (${tt.datasetCount} dataset(s))${H}`);const kt=tt.warnings.slice(0,120).map(p0);tt.warnings.length>120&&kt.push(`... ${tt.warnings.length-120} additional warning(s) not shown.`),O(kt)}catch(tt){console.warn("Failed importing project archive",tt);const Gt=tt instanceof Error?tt.message:"Unknown import error.";vt(`Warning: ${Gt}`),O([])}},xt=B!==null?u.find(G=>G.id===B)??null:null,Yt=Z.trim().toLowerCase()==="delete",Nt=G=>{K(G),rt("")},Tt=()=>{K(null),rt("")},yt=async()=>{if(!(!xt||!Yt||!r))try{await r.deleteProject(xt.id),vt(`Deleted project '${xt.name}'.`)}catch(G){console.warn("Failed deleting project",G);const st=G instanceof Error?G.message:"Unknown delete error.";vt(`Warning: ${st}`)}finally{Tt()}},se=G=>{try{const st={exportedAt:new Date().toISOString(),dataset:G};g0(m0(G.name),JSON.stringify(st,null,2),"application/json"),vt(`Downloaded dataset '${G.name}' JSON.`)}catch(st){console.warn("Failed exporting dataset JSON",st);const tt=st instanceof Error?st.message:"Unknown dataset export error.";vt(`Warning: ${tt}`)}},_t=(G,st)=>{Et(G),E(st)},wt=()=>{Et(null),E("")},Qt=async G=>{const st=u.find(H=>H.id===G),tt=k.trim(),Gt=tt.length>0?tt:st?.name??"";wt(),!(!r||!st||Gt.length===0||Gt===st.name)&&await r.renameProject(G,Gt)},ye=(G,st)=>{P(G),J(st)},xe=()=>{P(null),J("")},sn=async G=>{const st=d.find(H=>H.id===G),tt=$.trim(),Gt=tt.length>0?tt:st?.name??"";xe(),!(!r||!st||Gt.length===0||Gt===st.name)&&await r.renameDataset(G,Gt)},Ut=G=>{if(G.key==="Enter"){G.preventDefault(),G.currentTarget.blur();return}G.key==="Escape"&&(G.preventDefault(),xe())},Ae=G=>{if(G.key==="Enter"){G.preventDefault(),G.currentTarget.blur();return}G.key==="Escape"&&(G.preventDefault(),wt())},ee=()=>{!r||!f||(r.openChart(f),at?.set(!1))},zt=async G=>{const st=G.target.files?.[0];if(!st)return;const tt=await st.text();p?.set({kind:"file",name:st.name,content:tt})},ge=async()=>{const G=Ht.value.trim();if(G.length!==0)try{const tt=await(await fetch(G)).text(),Gt=G.split("/").pop()||"url-source";p?.set({kind:"url",name:Gt,content:tt})}catch(st){console.error("Failed loading URL source",st)}};return m.jsxs("div",{className:"app-shell",children:[m.jsxs("div",{className:"app-frame",children:[m.jsx("header",{className:"panel",children:m.jsx("h1",{children:m.jsx("a",{href:"https://github.com/owebeeone/jowna",target:"_blank",rel:"noreferrer",children:"Jowna - data visualizer"})})}),m.jsx("div",{className:"panel-grid",children:m.jsxs("section",{className:"panel stack",children:[m.jsx("h2",{children:"Projects"}),m.jsxs("div",{className:"row",children:[m.jsx("input",{placeholder:"New project name",value:mt.value,onChange:mt.onChange}),m.jsx("button",{onClick:()=>r?.createProject(mt.value),disabled:!r,children:"Create"})]}),m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:()=>r?.refreshProjects(),disabled:!r,children:"Refresh"}),m.jsx("button",{className:"ghost",onClick:R,children:"Import Tool"}),m.jsx("button",{className:"ghost",onClick:bt,disabled:!r,children:"Upload Project"}),m.jsx(pm,{onClick:()=>r?.openChart(f),disabled:!r||!f,label:"Open active chart"})]}),m.jsx("input",{ref:y,type:"file",accept:".jowna,.jowna-project,.krona.html,.html,.htm,application/json,text/json,text/html",style:{display:"none"},onChange:ht}),m.jsx("div",{className:"storage-warning",children:"Warning: project data is stored in your browser on this computer and may be removed by site-data/browser cleanup."}),dt&&m.jsx("div",{className:"muted",children:dt}),qt.length>0&&m.jsx("ul",{className:"warning-list",children:qt.map((G,st)=>m.jsx("li",{children:G},`${G}-${st}`))}),m.jsx("ul",{className:"project-list",children:u.map(G=>{const st=G.id===o;return m.jsxs("li",{className:`project-item${st?" active":""}`,role:"button",tabIndex:0,onClick:()=>{W(G.id)},onKeyDown:tt=>{tt.target===tt.currentTarget&&(tt.key==="Enter"||tt.key===" ")&&(tt.preventDefault(),W(G.id))},children:[m.jsx("div",{children:te===G.id?m.jsx("input",{className:"project-name-input",autoFocus:!0,value:k,onChange:tt=>E(tt.target.value),onClick:tt=>tt.stopPropagation(),onBlur:()=>{Qt(G.id)},onKeyDown:Ae}):m.jsx("button",{className:"project-name-button",onClick:tt=>{tt.stopPropagation(),_t(G.id,G.name)},children:G.name})}),m.jsxs("div",{className:"muted",children:["datasets: ",G.datasetIds.length]}),m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:tt=>{tt.stopPropagation(),lt(G.id)},children:"Import"}),m.jsx("button",{className:"ghost",onClick:tt=>{tt.stopPropagation(),r?.copyProject(G.id,`${G.name} Copy`)},children:"Copy"}),m.jsx("button",{className:"ghost",title:"Download the Jowna project file.",onClick:tt=>{tt.stopPropagation(),nt(G.id,G.name)},children:"Download Jowna"}),m.jsx("button",{className:"danger",onClick:tt=>{tt.stopPropagation(),Nt(G.id)},children:"Delete"})]}),st&&m.jsxs("div",{className:"project-datasets stack",onClick:tt=>tt.stopPropagation(),onKeyDown:tt=>tt.stopPropagation(),children:[m.jsx("h3",{children:"Datasets"}),d.length===0&&m.jsx("div",{className:"muted",children:"No datasets yet."}),d.map(tt=>m.jsxs("div",{className:"row",style:{justifyContent:"space-between"},children:[m.jsxs("div",{className:"dataset-name-wrap",children:[w===tt.id?m.jsx("input",{className:"dataset-name-input",autoFocus:!0,value:$,onChange:Gt=>J(Gt.target.value),onBlur:()=>{sn(tt.id)},onKeyDown:Ut}):m.jsx("button",{className:"dataset-name-button",onClick:()=>ye(tt.id,tt.name),children:tt.name}),tt.id===f&&m.jsx("span",{className:"muted",children:"(active)"})]}),m.jsxs("div",{className:"row",children:[m.jsx("button",{className:"ghost",onClick:()=>se(tt),children:"Download Dataset"}),m.jsx(pm,{className:"ghost",onClick:()=>r?.openChart(tt.id),disabled:!r,label:`Open chart for ${tt.name}`})]})]},tt.id))]})]},G.id)})})]})})]}),X&&m.jsx("div",{className:"import-popover-backdrop",onClick:F,children:m.jsxs("section",{className:"panel import-popover",role:"dialog","aria-modal":"true","aria-label":"Import Tool",onClick:G=>G.stopPropagation(),children:[m.jsxs("header",{className:"import-popover-header",children:[m.jsx("h2",{children:"Import Tool"}),m.jsx("button",{className:"ghost popover-x",onClick:Q,"aria-label":"Cancel import dialog",children:"X"})]}),m.jsxs("div",{className:"import-popover-body stack",children:[m.jsxs("div",{className:"stack",children:[m.jsxs("label",{children:[m.jsx("span",{className:"muted",children:"File Source"}),m.jsx("input",{type:"file",onChange:zt})]}),m.jsxs("div",{className:"row",children:[m.jsx("input",{placeholder:"https://example.com/data.tsv",value:Ht.value,onChange:Ht.onChange}),m.jsx("button",{className:"ghost",onClick:ge,children:"Load URL"})]}),m.jsxs("div",{className:"muted",children:["Source: ",m.jsx("strong",{children:v?.name??"none"})]})]}),m.jsxs("div",{className:"panel stack",style:{background:"#fafcfb"},children:[m.jsx("h3",{children:"Parse Parameters"}),m.jsxs("div",{className:"row",children:[m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Format"}),m.jsxs("select",{value:A.format,onChange:G=>T({format:G.target.value}),children:[m.jsx("option",{value:"auto",children:"Auto"}),m.jsx("option",{value:"tsv",children:"TSV"}),m.jsx("option",{value:"csv",children:"CSV"}),m.jsx("option",{value:"json-hierarchy",children:"JSON hierarchy"}),m.jsx("option",{value:"json-flat",children:"JSON flat rows"})]})]}),m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Delimiter"}),m.jsx("input",{value:A.delimiter,onChange:G=>T({delimiter:G.target.value})})]})]}),m.jsxs("label",{className:"row",style:{alignItems:"center"},children:[m.jsx("input",{type:"checkbox",style:{width:"auto"},checked:A.hasHeaderRow,onChange:G=>T({hasHeaderRow:G.target.checked})}),m.jsx("span",{children:"Header row"})]}),m.jsxs("div",{className:"row",children:[m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Comment Prefix"}),m.jsx("input",{value:A.commentPrefix,onChange:G=>T({commentPrefix:G.target.value})})]}),m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Magnitude Field"}),m.jsx("input",{value:A.magnitudeField,onChange:G=>T({magnitudeField:G.target.value})})]})]}),m.jsxs("label",{children:[m.jsx("span",{className:"muted",children:"Path Fields (comma-separated)"}),m.jsx("input",{value:A.pathFields.join(","),onChange:G=>T({pathFields:G.target.value.split(",").map(st=>st.trim()).filter(st=>st.length>0)})})]}),m.jsxs("div",{className:"row",children:[m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"URL Field"}),m.jsx("input",{value:A.urlField??"",onChange:G=>T({urlField:G.target.value.trim().length>0?G.target.value:null})})]}),m.jsxs("label",{style:{flex:1},children:[m.jsx("span",{className:"muted",children:"Description Field"}),m.jsx("input",{value:A.descriptionField??"",onChange:G=>T({descriptionField:G.target.value.trim().length>0?G.target.value:null})})]})]}),m.jsxs("label",{children:[m.jsx("span",{className:"muted",children:"Attribute Fields (comma-separated)"}),m.jsx("input",{value:A.attributeFields.join(","),onChange:G=>T({attributeFields:G.target.value.split(",").map(st=>st.trim()).filter(st=>st.length>0)})})]}),m.jsx("div",{className:"row",children:m.jsx("button",{onClick:()=>r?.parsePreview(),disabled:!r||Y,children:Y?"Parsing...":"Preview Parse"})})]}),m.jsxs("div",{className:"panel stack",style:{background:"#fafcfb"},children:[m.jsx("h3",{children:"Preview"}),N&&m.jsx("div",{style:{color:"#b23a2f"},children:N}),m.jsxs("div",{className:"muted",children:["Rows: ",b?.totalRows??0]}),m.jsxs("label",{children:[m.jsx("span",{className:"muted",children:"Filter Preview"}),m.jsx("input",{value:gt.value,onChange:gt.onChange})]}),m.jsx("div",{className:"preview-wrap",children:m.jsxs("table",{className:"preview-table",children:[m.jsx("thead",{children:m.jsxs("tr",{children:[m.jsx("th",{children:"row"}),m.jsx("th",{children:"magnitude"}),m.jsx("th",{children:"path"}),m.jsx("th",{children:"url"}),m.jsx("th",{children:"description"}),m.jsx("th",{children:"attributes"})]})}),m.jsxs("tbody",{children:[x.map(G=>m.jsxs("tr",{children:[m.jsx("td",{children:G.sourceRow}),m.jsx("td",{children:G.magnitude}),m.jsx("td",{children:G.path.join(" / ")}),m.jsx("td",{children:G.url??""}),m.jsx("td",{children:G.description??""}),m.jsx("td",{children:Object.entries(G.attributes).map(([st,tt])=>`${st}:${tt}`).join(" | ")})]},G.rowId)),x.length===0&&m.jsx("tr",{children:m.jsx("td",{colSpan:6,className:"muted",children:"No preview rows."})})]})]})}),m.jsxs("div",{children:[m.jsx("h4",{children:"Warnings"}),m.jsxs("ul",{className:"warning-list",children:[g.map((G,st)=>m.jsxs("li",{children:[m.jsx("strong",{children:G.code}),": ",G.message,G.row?` (row ${G.row})`:"",G.column?` [${G.column}]`:""]},`${G.code}-${G.row??0}-${st}`)),g.length===0&&m.jsx("li",{className:"muted",children:"No warnings."})]})]}),m.jsxs("div",{className:"row",children:[m.jsx("input",{placeholder:"Dataset name",value:ot.value,onChange:ot.onChange}),m.jsx("button",{onClick:()=>r?.applyImport(ot.value),disabled:!r||!I||!o,children:"Apply Import"})]})]})]}),m.jsxs("footer",{className:"import-popover-footer row",children:[m.jsx("button",{className:"ghost",onClick:Q,children:"Cancel"}),m.jsx("button",{className:"ghost",onClick:F,children:"Close"}),m.jsx("button",{onClick:ee,disabled:!r||!f,children:"View Chart"})]})]})}),xt&&m.jsx("div",{className:"delete-confirm-backdrop",onClick:Tt,children:m.jsxs("section",{className:"panel delete-confirm-dialog",role:"dialog","aria-modal":"true","aria-label":"Confirm project deletion",onClick:G=>G.stopPropagation(),children:[m.jsx("h3",{children:"Delete Project"}),m.jsxs("div",{children:["Type ",m.jsx("code",{children:"delete"})," to delete ",m.jsx("strong",{children:xt.name}),"."]}),m.jsx("input",{autoFocus:!0,value:Z,placeholder:"delete",onChange:G=>rt(G.target.value)}),m.jsxs("div",{className:"row delete-confirm-actions",children:[m.jsx("button",{className:"ghost",onClick:Tt,children:"Cancel"}),m.jsx("button",{className:"danger",onClick:yt,disabled:!Yt,children:"Delete"})]})]})})]})}function m0(l){const r=l.trim().replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return`${r.length>0?r:"dataset"}.json`}function p0(l){const r=l.row?` (row ${l.row})`:"",u=l.column?` [${l.column}]`:"";return`${l.code}: ${l.message}${r}${u}`}function g0(l,r,u){const o=new Blob([r],{type:u}),d=URL.createObjectURL(o),f=document.createElement("a");f.href=d,f.download=l,f.rel="noopener",f.click(),URL.revokeObjectURL(d)}function pm({className:l,disabled:r,label:u,onClick:o}){const d=l?`chart-icon-button ${l}`:"chart-icon-button";return m.jsx("button",{className:d,onClick:o,disabled:r,"aria-label":u,children:m.jsx(v0,{})})}function v0(){return m.jsxs("svg",{className:"chart-outline-icon",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",focusable:"false",children:[m.jsx("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor",strokeWidth:"1.6"}),m.jsx("circle",{cx:"12",cy:"12",r:"3.2",stroke:"currentColor",strokeWidth:"1.2"}),m.jsx("path",{d:"M12 3v6",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"}),m.jsx("path",{d:"M17.4 6.7l-3.8 4.8",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"}),m.jsx("path",{d:"M20.8 13l-6-0.4",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"}),m.jsx("path",{d:"M7 19.7l2.4-5.5",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]})}function y0(){return(Ft(Co)??"selection")==="chart"?m.jsx(Yy,{}):m.jsx(h0,{})}var Kr={exports:{}};var b0=Kr.exports,gm;function S0(){return gm||(gm=1,(function(l,r){((u,o)=>{l.exports=o()})(b0,function u(){var o=typeof self<"u"?self:typeof window<"u"?window:o!==void 0?o:{},d,f=!o.document&&!!o.postMessage,v=o.IS_PAPA_WORKER||!1,A={},C=0,p={};function b(E){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(w){var P=te(w);P.chunkSize=parseInt(P.chunkSize),w.step||w.chunk||(P.chunkSize=null),this._handle=new X(P),(this._handle.streamer=this)._config=P}).call(this,E),this.parseChunk=function(w,P){var $=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<$){let dt=this._config.newline;dt||(J=this._config.quoteChar||'"',dt=this._handle.guessLineEndings(w,J)),w=[...w.split(dt).slice($)].join(dt)}this.isFirstChunk&&k(this._config.beforeFirstChunk)&&(J=this._config.beforeFirstChunk(w))!==void 0&&(w=J),this.isFirstChunk=!1,this._halted=!1;var $=this._partialLine+w,J=(this._partialLine="",this._handle.parse($,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(w=J.meta.cursor,$=(this._finished||(this._partialLine=$.substring(w-this._baseIndex),this._baseIndex=w),J&&J.data&&(this._rowCount+=J.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),v)o.postMessage({results:J,workerId:p.WORKER_ID,finished:$});else if(k(this._config.chunk)&&!P){if(this._config.chunk(J,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=J=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(J.data),this._completeResults.errors=this._completeResults.errors.concat(J.errors),this._completeResults.meta=J.meta),this._completed||!$||!k(this._config.complete)||J&&J.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),$||J&&J.meta.paused||this._nextChunk(),J}this._halted=!0},this._sendError=function(w){k(this._config.error)?this._config.error(w):v&&this._config.error&&o.postMessage({workerId:p.WORKER_ID,error:w,finished:!1})}}function g(E){var w;(E=E||{}).chunkSize||(E.chunkSize=p.RemoteChunkSize),b.call(this,E),this._nextChunk=f?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(P){this._input=P,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(w=new XMLHttpRequest,this._config.withCredentials&&(w.withCredentials=this._config.withCredentials),f||(w.onload=Et(this._chunkLoaded,this),w.onerror=Et(this._chunkError,this)),w.open(this._config.downloadRequestBody?"POST":"GET",this._input,!f),this._config.downloadRequestHeaders){var P,$=this._config.downloadRequestHeaders;for(P in $)w.setRequestHeader(P,$[P])}var J;this._config.chunkSize&&(J=this._start+this._config.chunkSize-1,w.setRequestHeader("Range","bytes="+this._start+"-"+J));try{w.send(this._config.downloadRequestBody)}catch(dt){this._chunkError(dt.message)}f&&w.status===0&&this._chunkError()}},this._chunkLoaded=function(){w.readyState===4&&(w.status<200||400<=w.status?this._chunkError():(this._start+=this._config.chunkSize||w.responseText.length,this._finished=!this._config.chunkSize||this._start>=(P=>(P=P.getResponseHeader("Content-Range"))!==null?parseInt(P.substring(P.lastIndexOf("/")+1)):-1)(w),this.parseChunk(w.responseText)))},this._chunkError=function(P){P=w.statusText||P,this._sendError(new Error(P))}}function N(E){(E=E||{}).chunkSize||(E.chunkSize=p.LocalChunkSize),b.call(this,E);var w,P,$=typeof FileReader<"u";this.stream=function(J){this._input=J,P=J.slice||J.webkitSlice||J.mozSlice,$?((w=new FileReader).onload=Et(this._chunkLoaded,this),w.onerror=Et(this._chunkError,this)):w=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var J=this._input,dt=(this._config.chunkSize&&(dt=Math.min(this._start+this._config.chunkSize,this._input.size),J=P.call(J,this._start,dt)),w.readAsText(J,this._config.encoding));$||this._chunkLoaded({target:{result:dt}})},this._chunkLoaded=function(J){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(J.target.result)},this._chunkError=function(){this._sendError(w.error)}}function Y(E){var w;b.call(this,E=E||{}),this.stream=function(P){return w=P,this._nextChunk()},this._nextChunk=function(){var P,$;if(!this._finished)return P=this._config.chunkSize,w=P?($=w.substring(0,P),w.substring(P)):($=w,""),this._finished=!w,this.parseChunk($)}}function I(E){b.call(this,E=E||{});var w=[],P=!0,$=!1;this.pause=function(){b.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){b.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(J){this._input=J,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){$&&w.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),w.length?this.parseChunk(w.shift()):P=!0},this._streamData=Et(function(J){try{w.push(typeof J=="string"?J:J.toString(this._config.encoding)),P&&(P=!1,this._checkIsFinished(),this.parseChunk(w.shift()))}catch(dt){this._streamError(dt)}},this),this._streamError=Et(function(J){this._streamCleanUp(),this._sendError(J)},this),this._streamEnd=Et(function(){this._streamCleanUp(),$=!0,this._streamData("")},this),this._streamCleanUp=Et(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function X(E){var w,P,$,J,dt=Math.pow(2,53),vt=-dt,qt=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,O=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,B=this,K=0,Z=0,rt=!1,y=!1,x=[],T={data:[],errors:[],meta:{}};function R(W){return E.skipEmptyLines==="greedy"?W.join("").trim()==="":W.length===1&&W[0].length===0}function F(){if(T&&$&&(lt("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+p.DefaultDelimiter+"'"),$=!1),E.skipEmptyLines&&(T.data=T.data.filter(function(xt){return!R(xt)})),Q()){let xt=function(Yt,Nt){k(E.transformHeader)&&(Yt=E.transformHeader(Yt,Nt)),x.push(Yt)};var ht=xt;if(T)if(Array.isArray(T.data[0])){for(var W=0;Q()&&W<T.data.length;W++)T.data[W].forEach(xt);T.data.splice(0,1)}else T.data.forEach(xt)}function nt(xt,Yt){for(var Nt=E.header?{}:[],Tt=0;Tt<xt.length;Tt++){var yt=Tt,se=xt[Tt],se=((_t,wt)=>(Qt=>(E.dynamicTypingFunction&&E.dynamicTyping[Qt]===void 0&&(E.dynamicTyping[Qt]=E.dynamicTypingFunction(Qt)),(E.dynamicTyping[Qt]||E.dynamicTyping)===!0))(_t)?wt==="true"||wt==="TRUE"||wt!=="false"&&wt!=="FALSE"&&((Qt=>{if(qt.test(Qt)&&(Qt=parseFloat(Qt),vt<Qt&&Qt<dt))return 1})(wt)?parseFloat(wt):O.test(wt)?new Date(wt):wt===""?null:wt):wt)(yt=E.header?Tt>=x.length?"__parsed_extra":x[Tt]:yt,se=E.transform?E.transform(se,yt):se);yt==="__parsed_extra"?(Nt[yt]=Nt[yt]||[],Nt[yt].push(se)):Nt[yt]=se}return E.header&&(Tt>x.length?lt("FieldMismatch","TooManyFields","Too many fields: expected "+x.length+" fields but parsed "+Tt,Z+Yt):Tt<x.length&&lt("FieldMismatch","TooFewFields","Too few fields: expected "+x.length+" fields but parsed "+Tt,Z+Yt)),Nt}var bt;T&&(E.header||E.dynamicTyping||E.transform)&&(bt=1,!T.data.length||Array.isArray(T.data[0])?(T.data=T.data.map(nt),bt=T.data.length):T.data=nt(T.data,0),E.header&&T.meta&&(T.meta.fields=x),Z+=bt)}function Q(){return E.header&&x.length===0}function lt(W,nt,bt,ht){W={type:W,code:nt,message:bt},ht!==void 0&&(W.row=ht),T.errors.push(W)}k(E.step)&&(J=E.step,E.step=function(W){T=W,Q()?F():(F(),T.data.length!==0&&(K+=W.data.length,E.preview&&K>E.preview?P.abort():(T.data=T.data[0],J(T,B))))}),this.parse=function(W,nt,bt){var ht=E.quoteChar||'"',ht=(E.newline||(E.newline=this.guessLineEndings(W,ht)),$=!1,E.delimiter?k(E.delimiter)&&(E.delimiter=E.delimiter(W),T.meta.delimiter=E.delimiter):((ht=((xt,Yt,Nt,Tt,yt)=>{var se,_t,wt,Qt;yt=yt||[",","	","|",";",p.RECORD_SEP,p.UNIT_SEP];for(var ye=0;ye<yt.length;ye++){for(var xe,sn=yt[ye],Ut=0,Ae=0,ee=0,zt=(wt=void 0,new mt({comments:Tt,delimiter:sn,newline:Yt,preview:10}).parse(xt)),ge=0;ge<zt.data.length;ge++)Nt&&R(zt.data[ge])?ee++:(xe=zt.data[ge].length,Ae+=xe,wt===void 0?wt=xe:0<xe&&(Ut+=Math.abs(xe-wt),wt=xe));0<zt.data.length&&(Ae/=zt.data.length-ee),(_t===void 0||Ut<=_t)&&(Qt===void 0||Qt<Ae)&&1.99<Ae&&(_t=Ut,se=sn,Qt=Ae)}return{successful:!!(E.delimiter=se),bestDelimiter:se}})(W,E.newline,E.skipEmptyLines,E.comments,E.delimitersToGuess)).successful?E.delimiter=ht.bestDelimiter:($=!0,E.delimiter=p.DefaultDelimiter),T.meta.delimiter=E.delimiter),te(E));return E.preview&&E.header&&ht.preview++,w=W,P=new mt(ht),T=P.parse(w,nt,bt),F(),rt?{meta:{paused:!0}}:T||{meta:{paused:!1}}},this.paused=function(){return rt},this.pause=function(){rt=!0,P.abort(),w=k(E.chunk)?"":w.substring(P.getCharIndex())},this.resume=function(){B.streamer._halted?(rt=!1,B.streamer.parseChunk(w,!0)):setTimeout(B.resume,3)},this.aborted=function(){return y},this.abort=function(){y=!0,P.abort(),T.meta.aborted=!0,k(E.complete)&&E.complete(T),w=""},this.guessLineEndings=function(xt,ht){xt=xt.substring(0,1048576);var ht=new RegExp(at(ht)+"([^]*?)"+at(ht),"gm"),bt=(xt=xt.replace(ht,"")).split("\r"),ht=xt.split(`
`),xt=1<ht.length&&ht[0].length<bt[0].length;if(bt.length===1||xt)return`
`;for(var Yt=0,Nt=0;Nt<bt.length;Nt++)bt[Nt][0]===`
`&&Yt++;return Yt>=bt.length/2?`\r
`:"\r"}}function at(E){return E.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function mt(E){var w=(E=E||{}).delimiter,P=E.newline,$=E.comments,J=E.step,dt=E.preview,vt=E.fastMode,qt=null,O=!1,B=E.quoteChar==null?'"':E.quoteChar,K=B;if(E.escapeChar!==void 0&&(K=E.escapeChar),(typeof w!="string"||-1<p.BAD_DELIMITERS.indexOf(w))&&(w=","),$===w)throw new Error("Comment character same as delimiter");$===!0?$="#":(typeof $!="string"||-1<p.BAD_DELIMITERS.indexOf($))&&($=!1),P!==`
`&&P!=="\r"&&P!==`\r
`&&(P=`
`);var Z=0,rt=!1;this.parse=function(y,x,T){if(typeof y!="string")throw new Error("Input must be a string");var R=y.length,F=w.length,Q=P.length,lt=$.length,W=k(J),nt=[],bt=[],ht=[],xt=Z=0;if(!y)return Ut();if(vt||vt!==!1&&y.indexOf(B)===-1){for(var Yt=y.split(P),Nt=0;Nt<Yt.length;Nt++){if(ht=Yt[Nt],Z+=ht.length,Nt!==Yt.length-1)Z+=P.length;else if(T)return Ut();if(!$||ht.substring(0,lt)!==$){if(W){if(nt=[],Qt(ht.split(w)),Ae(),rt)return Ut()}else Qt(ht.split(w));if(dt&&dt<=Nt)return nt=nt.slice(0,dt),Ut(!0)}}return Ut()}for(var Tt=y.indexOf(w,Z),yt=y.indexOf(P,Z),se=new RegExp(at(K)+at(B),"g"),_t=y.indexOf(B,Z);;)if(y[Z]===B)for(_t=Z,Z++;;){if((_t=y.indexOf(B,_t+1))===-1)return T||bt.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:nt.length,index:Z}),xe();if(_t===R-1)return xe(y.substring(Z,_t).replace(se,B));if(B===K&&y[_t+1]===K)_t++;else if(B===K||_t===0||y[_t-1]!==K){Tt!==-1&&Tt<_t+1&&(Tt=y.indexOf(w,_t+1));var wt=ye((yt=yt!==-1&&yt<_t+1?y.indexOf(P,_t+1):yt)===-1?Tt:Math.min(Tt,yt));if(y.substr(_t+1+wt,F)===w){ht.push(y.substring(Z,_t).replace(se,B)),y[Z=_t+1+wt+F]!==B&&(_t=y.indexOf(B,Z)),Tt=y.indexOf(w,Z),yt=y.indexOf(P,Z);break}if(wt=ye(yt),y.substring(_t+1+wt,_t+1+wt+Q)===P){if(ht.push(y.substring(Z,_t).replace(se,B)),sn(_t+1+wt+Q),Tt=y.indexOf(w,Z),_t=y.indexOf(B,Z),W&&(Ae(),rt))return Ut();if(dt&&nt.length>=dt)return Ut(!0);break}bt.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:nt.length,index:Z}),_t++}}else if($&&ht.length===0&&y.substring(Z,Z+lt)===$){if(yt===-1)return Ut();Z=yt+Q,yt=y.indexOf(P,Z),Tt=y.indexOf(w,Z)}else if(Tt!==-1&&(Tt<yt||yt===-1))ht.push(y.substring(Z,Tt)),Z=Tt+F,Tt=y.indexOf(w,Z);else{if(yt===-1)break;if(ht.push(y.substring(Z,yt)),sn(yt+Q),W&&(Ae(),rt))return Ut();if(dt&&nt.length>=dt)return Ut(!0)}return xe();function Qt(ee){nt.push(ee),xt=Z}function ye(ee){var zt=0;return zt=ee!==-1&&(ee=y.substring(_t+1,ee))&&ee.trim()===""?ee.length:zt}function xe(ee){return T||(ee===void 0&&(ee=y.substring(Z)),ht.push(ee),Z=R,Qt(ht),W&&Ae()),Ut()}function sn(ee){Z=ee,Qt(ht),ht=[],yt=y.indexOf(P,Z)}function Ut(ee){if(E.header&&!x&&nt.length&&!O){var zt=nt[0],ge=Object.create(null),G=new Set(zt);let st=!1;for(let tt=0;tt<zt.length;tt++){let Gt=zt[tt];if(ge[Gt=k(E.transformHeader)?E.transformHeader(Gt,tt):Gt]){let H,et=ge[Gt];for(;H=Gt+"_"+et,et++,G.has(H););G.add(H),zt[tt]=H,ge[Gt]++,st=!0,(qt=qt===null?{}:qt)[H]=Gt}else ge[Gt]=1,zt[tt]=Gt;G.add(Gt)}st&&console.warn("Duplicate headers found and renamed."),O=!0}return{data:nt,errors:bt,meta:{delimiter:w,linebreak:P,aborted:rt,truncated:!!ee,cursor:xt+(x||0),renamedHeaders:qt}}}function Ae(){J(Ut()),nt=[],bt=[]}},this.abort=function(){rt=!0},this.getCharIndex=function(){return Z}}function ot(E){var w=E.data,P=A[w.workerId],$=!1;if(w.error)P.userError(w.error,w.file);else if(w.results&&w.results.data){var J={abort:function(){$=!0,gt(w.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:Ht,resume:Ht};if(k(P.userStep)){for(var dt=0;dt<w.results.data.length&&(P.userStep({data:w.results.data[dt],errors:w.results.errors,meta:w.results.meta},J),!$);dt++);delete w.results}else k(P.userChunk)&&(P.userChunk(w.results,J,w.file),delete w.results)}w.finished&&!$&&gt(w.workerId,w.results)}function gt(E,w){var P=A[E];k(P.userComplete)&&P.userComplete(w),P.terminate(),delete A[E]}function Ht(){throw new Error("Not implemented.")}function te(E){if(typeof E!="object"||E===null)return E;var w,P=Array.isArray(E)?[]:{};for(w in E)P[w]=te(E[w]);return P}function Et(E,w){return function(){E.apply(w,arguments)}}function k(E){return typeof E=="function"}return p.parse=function(E,w){var P=(w=w||{}).dynamicTyping||!1;if(k(P)&&(w.dynamicTypingFunction=P,P={}),w.dynamicTyping=P,w.transform=!!k(w.transform)&&w.transform,!w.worker||!p.WORKERS_SUPPORTED)return P=null,p.NODE_STREAM_INPUT,typeof E=="string"?(E=($=>$.charCodeAt(0)!==65279?$:$.slice(1))(E),P=new(w.download?g:Y)(w)):E.readable===!0&&k(E.read)&&k(E.on)?P=new I(w):(o.File&&E instanceof File||E instanceof Object)&&(P=new N(w)),P.stream(E);(P=(()=>{var $;return!!p.WORKERS_SUPPORTED&&($=(()=>{var J=o.URL||o.webkitURL||null,dt=u.toString();return p.BLOB_URL||(p.BLOB_URL=J.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",dt,")();"],{type:"text/javascript"})))})(),($=new o.Worker($)).onmessage=ot,$.id=C++,A[$.id]=$)})()).userStep=w.step,P.userChunk=w.chunk,P.userComplete=w.complete,P.userError=w.error,w.step=k(w.step),w.chunk=k(w.chunk),w.complete=k(w.complete),w.error=k(w.error),delete w.worker,P.postMessage({input:E,config:w,workerId:P.id})},p.unparse=function(E,w){var P=!1,$=!0,J=",",dt=`\r
`,vt='"',qt=vt+vt,O=!1,B=null,K=!1,Z=((()=>{if(typeof w=="object"){if(typeof w.delimiter!="string"||p.BAD_DELIMITERS.filter(function(x){return w.delimiter.indexOf(x)!==-1}).length||(J=w.delimiter),typeof w.quotes!="boolean"&&typeof w.quotes!="function"&&!Array.isArray(w.quotes)||(P=w.quotes),typeof w.skipEmptyLines!="boolean"&&typeof w.skipEmptyLines!="string"||(O=w.skipEmptyLines),typeof w.newline=="string"&&(dt=w.newline),typeof w.quoteChar=="string"&&(vt=w.quoteChar),typeof w.header=="boolean"&&($=w.header),Array.isArray(w.columns)){if(w.columns.length===0)throw new Error("Option columns is empty");B=w.columns}w.escapeChar!==void 0&&(qt=w.escapeChar+vt),w.escapeFormulae instanceof RegExp?K=w.escapeFormulae:typeof w.escapeFormulae=="boolean"&&w.escapeFormulae&&(K=/^[=+\-@\t\r].*$/)}})(),new RegExp(at(vt),"g"));if(typeof E=="string"&&(E=JSON.parse(E)),Array.isArray(E)){if(!E.length||Array.isArray(E[0]))return rt(null,E,O);if(typeof E[0]=="object")return rt(B||Object.keys(E[0]),E,O)}else if(typeof E=="object")return typeof E.data=="string"&&(E.data=JSON.parse(E.data)),Array.isArray(E.data)&&(E.fields||(E.fields=E.meta&&E.meta.fields||B),E.fields||(E.fields=Array.isArray(E.data[0])?E.fields:typeof E.data[0]=="object"?Object.keys(E.data[0]):[]),Array.isArray(E.data[0])||typeof E.data[0]=="object"||(E.data=[E.data])),rt(E.fields||[],E.data||[],O);throw new Error("Unable to serialize unrecognized input");function rt(x,T,R){var F="",Q=(typeof x=="string"&&(x=JSON.parse(x)),typeof T=="string"&&(T=JSON.parse(T)),Array.isArray(x)&&0<x.length),lt=!Array.isArray(T[0]);if(Q&&$){for(var W=0;W<x.length;W++)0<W&&(F+=J),F+=y(x[W],W);0<T.length&&(F+=dt)}for(var nt=0;nt<T.length;nt++){var bt=(Q?x:T[nt]).length,ht=!1,xt=Q?Object.keys(T[nt]).length===0:T[nt].length===0;if(R&&!Q&&(ht=R==="greedy"?T[nt].join("").trim()==="":T[nt].length===1&&T[nt][0].length===0),R==="greedy"&&Q){for(var Yt=[],Nt=0;Nt<bt;Nt++){var Tt=lt?x[Nt]:Nt;Yt.push(T[nt][Tt])}ht=Yt.join("").trim()===""}if(!ht){for(var yt=0;yt<bt;yt++){0<yt&&!xt&&(F+=J);var se=Q&&lt?x[yt]:yt;F+=y(T[nt][se],yt)}nt<T.length-1&&(!R||0<bt&&!xt)&&(F+=dt)}}return F}function y(x,T){var R,F;return x==null?"":x.constructor===Date?JSON.stringify(x).slice(1,25):(F=!1,K&&typeof x=="string"&&K.test(x)&&(x="'"+x,F=!0),R=x.toString().replace(Z,qt),(F=F||P===!0||typeof P=="function"&&P(x,T)||Array.isArray(P)&&P[T]||((Q,lt)=>{for(var W=0;W<lt.length;W++)if(-1<Q.indexOf(lt[W]))return!0;return!1})(R,p.BAD_DELIMITERS)||-1<R.indexOf(J)||R.charAt(0)===" "||R.charAt(R.length-1)===" ")?vt+R+vt:R)}},p.RECORD_SEP="",p.UNIT_SEP="",p.BYTE_ORDER_MARK="\uFEFF",p.BAD_DELIMITERS=["\r",`
`,'"',p.BYTE_ORDER_MARK],p.WORKERS_SUPPORTED=!f&&!!o.Worker,p.NODE_STREAM_INPUT=1,p.LocalChunkSize=10485760,p.RemoteChunkSize=5242880,p.DefaultDelimiter=",",p.Parser=mt,p.ParserHandle=X,p.NetworkStreamer=g,p.FileStreamer=N,p.StringStreamer=Y,p.ReadableStreamStreamer=I,o.jQuery&&((d=o.jQuery).fn.parse=function(E){var w=E.config||{},P=[];return this.each(function(dt){if(!(d(this).prop("tagName").toUpperCase()==="INPUT"&&d(this).attr("type").toLowerCase()==="file"&&o.FileReader)||!this.files||this.files.length===0)return!0;for(var vt=0;vt<this.files.length;vt++)P.push({file:this.files[vt],inputElem:this,instanceConfig:d.extend({},w)})}),$(),this;function $(){if(P.length===0)k(E.complete)&&E.complete();else{var dt,vt,qt,O,B=P[0];if(k(E.before)){var K=E.before(B.file,B.inputElem);if(typeof K=="object"){if(K.action==="abort")return dt="AbortError",vt=B.file,qt=B.inputElem,O=K.reason,void(k(E.error)&&E.error({name:dt},vt,qt,O));if(K.action==="skip")return void J();typeof K.config=="object"&&(B.instanceConfig=d.extend(B.instanceConfig,K.config))}else if(K==="skip")return void J()}var Z=B.instanceConfig.complete;B.instanceConfig.complete=function(rt){k(Z)&&Z(rt,B.file,B.inputElem),J()},p.parse(B.file,B.instanceConfig)}}function J(){P.splice(0,1),$()}}),v&&(o.onmessage=function(E){E=E.data,p.WORKER_ID===void 0&&E&&(p.WORKER_ID=E.workerId),typeof E.input=="string"?o.postMessage({workerId:p.WORKER_ID,results:p.parse(E.input,E.config),finished:!0}):(o.File&&E.input instanceof File||E.input instanceof Object)&&(E=p.parse(E.input,E.config))&&o.postMessage({workerId:p.WORKER_ID,results:E,finished:!0})}),(g.prototype=Object.create(b.prototype)).constructor=g,(N.prototype=Object.create(b.prototype)).constructor=N,(Y.prototype=Object.create(Y.prototype)).constructor=Y,(I.prototype=Object.create(b.prototype)).constructor=I,p})})(Kr)),Kr.exports}var x0=S0();const A0=wv(x0);function je(l){return{code:l.code,message:l.message,severity:"warning",row:l.row,column:l.column}}const Po="Root";function ep(l){const r=[],u=vm(Po);return l.forEach(d=>{let f=u;d.path.forEach(v=>{const A=v.trim();f.children.has(A)||f.children.set(A,vm(A)),f=f.children.get(A)}),f.magnitude+=d.magnitude,T0(f,d,r)}),{tree:np(u),warnings:r}}function C0(l){const r=[];if(Array.isArray(l)){const o=l.map((d,f)=>Bo(d,r,`root[${f}]`)).filter(d=>d!==null);return{tree:{name:Po,magnitude:o.reduce((d,f)=>d+f.magnitude,0),children:o},warnings:r}}return{tree:Bo(l,r,"root")??{name:Po,magnitude:0,children:[]},warnings:r}}function vm(l){return{name:l,magnitude:0,children:new Map,url:null,description:null,attributes:{}}}function T0(l,r,u){r.url&&(l.url&&l.url!==r.url?u.push(je({code:"CONFLICTING_URL",message:`Multiple URL values found for path '${r.path.join("/")}'. Keeping first value.`,row:r.sourceRow,column:"url"})):l.url=r.url),r.description&&(l.description&&l.description!==r.description?u.push(je({code:"CONFLICTING_DESCRIPTION",message:`Multiple description values found for path '${r.path.join("/")}'. Keeping first value.`,row:r.sourceRow,column:"description"})):l.description=r.description);for(const[o,d]of Object.entries(r.attributes)){if(o.length===0)continue;const f=l.attributes[o];if(f&&f!==d){u.push(je({code:"CONFLICTING_ATTRIBUTE",message:`Multiple values for attribute '${o}' found at path '${r.path.join("/")}'. Keeping first value.`,row:r.sourceRow,column:o}));continue}l.attributes[o]=d}}function np(l){const r=[...l.children.values()].map(f=>np(f)),u=r.length>0,o=r.reduce((f,v)=>f+v.magnitude,0),d=l.magnitude+o;return{name:l.name,magnitude:d,children:u?r:void 0,url:l.url,description:l.description,attributes:Object.keys(l.attributes).length>0?l.attributes:void 0}}function Bo(l,r,u){if(!l||typeof l!="object")return r.push(je({code:"INVALID_NODE",message:`Node at '${u}' is not an object and was skipped.`})),null;const o=l,d=String(o.name??"").trim(),f=d.length>0?d:"Unnamed";d.length===0&&r.push(je({code:"MISSING_NODE_NAME",message:`Node name missing at '${u}'. Using 'Unnamed'.`}));const A=(Array.isArray(o.children)?o.children:[]).map((g,N)=>Bo(g,r,`${u}.children[${N}]`)).filter(g=>g!==null),C=o.magnitude,p=typeof C=="number"&&Number.isFinite(C)?C:null;if(A.length===0)return p===null||p<0?(r.push(je({code:"INVALID_LEAF_MAGNITUDE",message:`Leaf node '${f}' at '${u}' has invalid magnitude and was skipped.`,column:"magnitude"})),null):{name:f,magnitude:p,url:qr(o.url),description:qr(o.description),attributes:ym(o)};const b=A.reduce((g,N)=>g+N.magnitude,0);return p!==null&&p!==b&&r.push(je({code:"PARENT_MAGNITUDE_MISMATCH",message:`Parent node '${f}' at '${u}' has explicit magnitude ${p} but children sum to ${b}.`,column:"magnitude"})),{name:f,magnitude:b,children:A,url:qr(o.url),description:qr(o.description),attributes:ym(o),explicitMagnitude:p}}function qr(l){if(typeof l!="string")return null;const r=l.trim();return r.length>0?r:null}function ym(l){const r=Object.fromEntries(Object.entries(l).filter(([u])=>!["name","magnitude","children","url","description"].includes(u)).filter(([,u])=>typeof u=="string"||typeof u=="number").map(([u,o])=>[u,String(o)]));return Object.keys(r).length>0?r:void 0}const bm=100,_0=["csv","tsv"];class E0{id="papaparse-delimited";supportedFormats=_0;async parse(r){const u=j0(r.parameters.format);return this.parseDelimited({...r,parameters:{...r.parameters,format:u}})}async parseDelimited(r){const u=[],o=N0(r.source.content,r.parameters.commentPrefix),d=R0(r.parameters),f=z0(o.content,d,r.parameters),{parsed:v,hasHeaderRow:A}=f;v.errors.forEach(N=>{u.push(je({code:"PARSE_ERROR",message:N.message,row:Zo(o.sourceRows,A,N.row??0)}))});const C=v.data.filter(N=>N!=null),p=A?w0(C,o.sourceRows,r.parameters):M0(C,o.sourceRows,r.parameters),b=ep(p.rows);u.push(...p.warnings,...b.warnings),p.rows.length===0&&u.length===0&&u.push(je({code:"EMPTY_INPUT",message:"No usable rows found."}));const g=["sourceRow","magnitude","path","url","description",...p.attributeKeys];return{detectedFormat:r.parameters.format,normalizedRows:p.rows,preview:D0(g,p.rows),tree:b.tree,warnings:u}}}function N0(l,r){if(!r){const f=l.split(/\r?\n/).map((v,A)=>A+1);return{content:l,sourceRows:f}}const u=l.split(/\r?\n/),o=[],d=[];return u.forEach((f,v)=>{f.trimStart().startsWith(r)||(o.push(f),d.push(v+1))}),{content:o.join(`
`),sourceRows:d}}function w0(l,r,u){const o=[],d=[],f=new Set(u.attributeFields);return l.forEach((v,A)=>{const C=Zo(r,!0,A),p=Object.keys(v),b=ap(p,u),g=wa(v,b),N=Number(g),Y=lp(v,p,u,b);if(!Number.isFinite(N)||N<0){d.push(je({code:"INVALID_MAGNITUDE",message:`Invalid magnitude '${g}'.`,row:C,column:b}));return}const I=Object.fromEntries(u.attributeFields.map(X=>[X,wa(v,X)]));o.push({rowId:`row-${C}`,sourceRow:C,magnitude:N,path:Y,url:Qr(v,u.urlField),description:Qr(v,u.descriptionField),attributes:I})}),{rows:o,warnings:d,attributeKeys:[...f]}}function M0(l,r,u){const o=[],d=[],f=l.reduce((C,p)=>Math.max(C,p.length),0),v=Array.from({length:f},(C,p)=>`col${p+1}`),A=new Set(u.attributeFields);return l.forEach((C,p)=>{const b=[...C];for(;b.length<f;)b.push("");const g=Zo(r,!1,p),N=Object.fromEntries(v.map((ot,gt)=>[ot,b[gt]??""])),Y=ap(v,u),I=wa(N,Y),X=Number(I),at=lp(N,v,u,Y);if(!Number.isFinite(X)||X<0){o.push(je({code:"INVALID_MAGNITUDE",message:`Invalid magnitude '${I}'.`,row:g,column:Y}));return}const mt=Object.fromEntries(u.attributeFields.map(ot=>[ot,wa(N,ot)]));d.push({rowId:`row-${g}`,sourceRow:g,magnitude:X,path:at,url:Qr(N,u.urlField),description:Qr(N,u.descriptionField),attributes:mt})}),{rows:d,warnings:o,attributeKeys:[...A]}}function D0(l,r){return{columns:l,rows:r.slice(0,bm),totalRows:r.length,truncated:r.length>bm}}function Zo(l,r,u){const o=r?u+1:u;return l[o]??u+1}function j0(l){return l==="tsv"?"tsv":"csv"}function R0(l){return l.delimiter.length>0?l.delimiter:l.format==="tsv"?"	":","}function z0(l,r,u){const o=Sm(l,r,u.hasHeaderRow);return u.hasHeaderRow&&O0(o,u)?{parsed:Sm(l,r,!1),hasHeaderRow:!1}:{parsed:o,hasHeaderRow:u.hasHeaderRow}}function Sm(l,r,u){return A0.parse(l,{delimiter:r,header:u,skipEmptyLines:!1,transformHeader:o=>o.trim()})}function O0(l,r){const u=l.meta.fields?.map(d=>d.trim())??[];if(u.length===0||u.includes(r.magnitudeField))return!1;const o=u[0]??"";return o.length>0&&Number.isFinite(Number(o))}function ap(l,r){return l.includes(r.magnitudeField)?r.magnitudeField:l.includes("col1")?"col1":l[0]??r.magnitudeField}function lp(l,r,u,o){const d=u.pathFields.map(v=>wa(l,v).trim()).filter(v=>v.length>0);return d.length>0?d:r.filter(v=>H0(v,u,o)).map(v=>wa(l,v).trim()).filter(v=>v.length>0)}function H0(l,r,u){return!(l.length===0||l===u||r.pathFields.includes(l)||r.attributeFields.includes(l)||r.urlField&&l===r.urlField||r.descriptionField&&l===r.descriptionField)}function wa(l,r){const u=l[r];return typeof u!="string"?"":u.trim()}function Qr(l,r){if(!r)return null;const u=wa(l,r);return u.length>0?u:null}const U0=["csv","tsv"],k0=["json-hierarchy","json-flat"];function G0(l){return l.parameters.format!=="auto"?l.parameters.format:l.formatHint&&l.formatHint!=="auto"?l.formatHint:L0(l.source)}function L0(l){const r=V0(l.name);return r?r==="json-hierarchy"?ip(l.content):r:F0(l.content)}function P0(l){return U0.includes(l)}function B0(l){return k0.includes(l)}function q0(l,r){const u=l.format==="auto";return r==="tsv"?{...l,delimiter:"	",format:r}:r==="csv"?{...l,delimiter:u||l.delimiter.length===0?",":l.delimiter,format:r}:{...l,format:r}}function V0(l){const r=l.toLowerCase();if(r.endsWith(".tsv"))return"tsv";if(r.endsWith(".csv"))return"csv";if(r.endsWith(".json"))return"json-hierarchy"}function F0(l){const r=l.trim();return r.startsWith("{")||r.startsWith("[")?ip(l):"csv"}function ip(l){try{const r=JSON.parse(l);if(Array.isArray(r)){if(r.length===0)return"json-flat";const u=r[0];return u&&typeof u=="object"&&"path"in u?"json-flat":"json-hierarchy"}return"json-hierarchy"}catch{return"json-hierarchy"}}const xm=100,Y0=["json-hierarchy","json-flat"];class K0{id="json-data-parser";supportedFormats=Y0;async parse(r){return r.parameters.format==="json-flat"?this.parseFlatRowsJson(r):this.parseHierarchyJson(r)}async parseHierarchyJson(r){const u=[],o=Am(r.source.content,u);if(o===null)return Tm("json-hierarchy",u);const d=C0(o);return u.push(...d.warnings),{detectedFormat:"json-hierarchy",normalizedRows:[],preview:{columns:[],rows:[],totalRows:0,truncated:!1},tree:d.tree,warnings:u}}async parseFlatRowsJson(r){const u=[],o=Am(r.source.content,u);if(!Array.isArray(o))return u.push(je({code:"INVALID_JSON_FLAT_ROWS",message:"JSON flat-row format requires an array of row objects."})),Tm("json-flat",u);const d=[],f=new Set;o.forEach((A,C)=>{const p=C+1;if(!A||typeof A!="object"){u.push(je({code:"INVALID_ROW",message:"Row is not an object and was skipped.",row:p}));return}const b=A,g=Number(b.magnitude),N=X0(b.path);if(!Number.isFinite(g)||g<0){u.push(je({code:"INVALID_MAGNITUDE",message:`Invalid magnitude '${String(b.magnitude)}'.`,row:p,column:"magnitude"}));return}if(N.length===0){u.push(je({code:"MISSING_PATH",message:"Path is missing or empty after normalization.",row:p,column:"path"}));return}const Y=Q0(b);Object.keys(Y).forEach(I=>f.add(I)),d.push({rowId:`row-${p}`,sourceRow:p,magnitude:g,path:N,url:Cm(b.url),description:Cm(b.description),attributes:Y})});const v=ep(d);return u.push(...v.warnings),{detectedFormat:"json-flat",normalizedRows:d,preview:Z0(d,f),tree:v.tree,warnings:u}}}function Am(l,r){try{return JSON.parse(l)}catch(u){return r.push(je({code:"INVALID_JSON",message:`Unable to parse JSON: ${u.message}`})),null}}function X0(l){return Array.isArray(l)?l.map(r=>String(r).trim()).filter(r=>r.length>0):[]}function Cm(l){if(typeof l!="string")return null;const r=l.trim();return r.length>0?r:null}function Q0(l){return Object.fromEntries(Object.entries(l).filter(([r])=>!["magnitude","path","url","description"].includes(r)).filter(([,r])=>typeof r=="string"||typeof r=="number").map(([r,u])=>[r,String(u)]))}function Z0(l,r){return{columns:["sourceRow","magnitude","path","url","description",...r],rows:l.slice(0,xm),totalRows:l.length,truncated:l.length>xm}}function Tm(l,r){return{detectedFormat:l,normalizedRows:[],preview:{columns:[],rows:[],totalRows:0,truncated:!1},tree:{name:"Root",magnitude:0,children:[]},warnings:r}}class I0{constructor(r){this.parsers=r}listParsers(){return this.parsers}getParser(r){return P0(r)?this.parsers.find(u=>u.supportedFormats.includes("csv")||u.supportedFormats.includes("tsv")):B0(r)?this.parsers.find(u=>u.supportedFormats.includes("json-hierarchy")||u.supportedFormats.includes("json-flat")):this.parsers.find(u=>u.supportedFormats.includes(r))}}function J0(){return new I0([new E0,new K0])}class $0{constructor(r){this.registry=r}async parse(r){const u=G0(r),o=this.registry.getParser(u);if(!o)throw new Error(`No parser registered for format '${u}'.`);return o.parse({...r,parameters:q0(r.parameters,u)})}}const W0="jowna",tb=1,pn="projects",rn="datasets",Zr="jowna/settings",Ir="jowna/recent";function eb(l={}){const r=ab(l.indexedDbFactory);if(!r)return nb(l);const u=rp(l.localStorageLike),o=l.now??(()=>new Date().toISOString()),d=l.createId??sp,f=ib(r,l.dbName??W0,l.dbVersion??tb),v={async listProjects(){const g=(await f).transaction(pn,"readonly"),N=g.objectStore(pn),Y=await mi(N.getAll());return await sa(g),Y},async getProject(b){const N=(await f).transaction(pn,"readonly"),Y=N.objectStore(pn),I=await mi(Y.get(b));return await sa(N),I},async saveProject(b){const N=(await f).transaction(pn,"readwrite");N.objectStore(pn).put(b),await sa(N)},async deleteProject(b){const N=(await f).transaction([pn,rn],"readwrite");N.objectStore(pn).delete(b);const Y=N.objectStore(rn);(await mi(Y.getAll())).filter(X=>X.projectId===b).forEach(X=>{Y.delete(X.id)}),await sa(N)},async copyProject(b,g){const N=await v.getProject(b);if(!N)throw new Error(`Project '${b}' does not exist.`);const Y=await A.listByProject(b),I=d("project"),X=o(),at=new Map;N.datasetIds.forEach(gt=>{at.set(gt,d("dataset"))}),Y.forEach(gt=>{at.has(gt.id)||at.set(gt.id,d("dataset"))});const mt=Y.map(gt=>({...gt,id:at.get(gt.id),projectId:I,createdAt:X,updatedAt:X}));for(const gt of mt)await A.saveDataset(gt);const ot={...N,id:I,name:g,createdAt:X,updatedAt:X,datasetIds:N.datasetIds.map(gt=>at.get(gt)),activeDatasetId:N.activeDatasetId?at.get(N.activeDatasetId)??null:null};return await v.saveProject(ot),ot}},A={async listByProject(b){const N=(await f).transaction(rn,"readonly"),Y=N.objectStore(rn),I=await mi(Y.getAll());return await sa(N),I.filter(X=>X.projectId===b)},async getDataset(b){const N=(await f).transaction(rn,"readonly"),Y=N.objectStore(rn),I=await mi(Y.get(b));return await sa(N),I},async saveDataset(b){const N=(await f).transaction(rn,"readwrite");N.objectStore(rn).put(b),await sa(N)},async deleteDataset(b){const N=(await f).transaction(rn,"readwrite");N.objectStore(rn).delete(b),await sa(N)}};return{projects:v,datasets:A,settings:{async loadSettings(){const b=u.getItem(Zr);if(b)try{return JSON.parse(b)}catch{return}},async saveSettings(b){u.setItem(Zr,JSON.stringify(b))}},recentProjects:{async listRecentProjectIds(){const b=u.getItem(Ir);if(!b)return[];try{return JSON.parse(b)}catch{return[]}},async saveRecentProjectIds(b){u.setItem(Ir,JSON.stringify(b))}}}}function nb(l){const r=new Map,u=new Map,o=rp(l.localStorageLike),d=l.now??(()=>new Date().toISOString()),f=l.createId??sp;return{projects:{async listProjects(){return[...r.values()]},async getProject(b){return r.get(b)},async saveProject(b){r.set(b.id,b)},async deleteProject(b){r.delete(b),[...u.values()].filter(g=>g.projectId===b).forEach(g=>u.delete(g.id))},async copyProject(b,g){const N=r.get(b);if(!N)throw new Error(`Project '${b}' does not exist.`);const Y=[...u.values()].filter(ot=>ot.projectId===b),I=f("project"),X=d(),at=new Map;N.datasetIds.forEach(ot=>{at.set(ot,f("dataset"))}),Y.forEach(ot=>{at.has(ot.id)||at.set(ot.id,f("dataset"))}),Y.forEach(ot=>{u.set(at.get(ot.id),{...ot,id:at.get(ot.id),projectId:I,createdAt:X,updatedAt:X})});const mt={...N,id:I,name:g,createdAt:X,updatedAt:X,datasetIds:N.datasetIds.map(ot=>at.get(ot)),activeDatasetId:N.activeDatasetId?at.get(N.activeDatasetId)??null:null};return r.set(mt.id,mt),mt}},datasets:{async listByProject(b){return[...u.values()].filter(g=>g.projectId===b)},async getDataset(b){return u.get(b)},async saveDataset(b){u.set(b.id,b)},async deleteDataset(b){u.delete(b)}},settings:{async loadSettings(){const b=o.getItem(Zr);if(b)try{return JSON.parse(b)}catch{return}},async saveSettings(b){o.setItem(Zr,JSON.stringify(b))}},recentProjects:{async listRecentProjectIds(){const b=o.getItem(Ir);if(!b)return[];try{return JSON.parse(b)}catch{return[]}},async saveRecentProjectIds(b){o.setItem(Ir,JSON.stringify(b))}}}}function ab(l){if(l)return l;if(typeof indexedDB<"u")return indexedDB}function rp(l){return l||(typeof localStorage<"u"?localStorage:lb())}function lb(){const l=new Map;return{getItem(r){return l.get(r)??null},setItem(r,u){l.set(r,u)}}}function sp(l){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?`${l}-${crypto.randomUUID()}`:`${l}-${Math.random().toString(36).slice(2,10)}`}function ib(l,r,u){return new Promise((o,d)=>{const f=l.open(r,u);f.onupgradeneeded=()=>{const v=f.result;v.objectStoreNames.contains(pn)||v.createObjectStore(pn,{keyPath:"id"}),v.objectStoreNames.contains(rn)||v.createObjectStore(rn,{keyPath:"id"})},f.onsuccess=()=>o(f.result),f.onerror=()=>d(f.error)})}function mi(l){return new Promise((r,u)=>{l.onsuccess=()=>r(l.result),l.onerror=()=>u(l.error)})}function sa(l){return new Promise((r,u)=>{l.oncomplete=()=>r(),l.onerror=()=>u(l.error),l.onabort=()=>u(l.error)})}const qo="Imported Krona Project",Vo="Dataset",_m=".krona";function rb(l){const r=ob(l.content),u=cb(r);if(u.name!=="krona")throw new Error("Krona HTML XML root element must be <krona>.");const o=[],d=fb(u,o),f=Un(u,"node");if(f.length===0)throw new Error("Krona HTML contains no <node> elements.");const v=hb(u),A=vb(f,d),C=Math.max(v.length,A,1),b=mb(v,C,o).map((N,Y)=>{const I=[],X=pb({nodes:f,datasetIndex:Y,magnitudeTag:d,warnings:I}),at=yb(X);return(X.children?.length??0)===0&&X.magnitude<=0&&I.push(Ti({code:"KRONA_EMPTY_DATASET",message:`Dataset '${N}' has no usable magnitudes.`})),{name:N,tree:X,flatTable:at,warnings:I}}),g=[...o,...b.flatMap(N=>N.warnings)];return{projectName:xb(l.name),sourceFileName:l.name,datasets:b,warnings:g}}function sb(l){const r=l.createId("project"),u=_i(l.nextProjectName??l.parsed.projectName,qo),o=l.parsed.datasets.map(v=>{const A=l.createId("dataset");return{id:A,projectId:r,name:_i(v.name,`${Vo} ${A}`),createdAt:l.nowIso,updatedAt:l.nowIso,tree:v.tree,sourceFileName:l.parsed.sourceFileName,flatTable:v.flatTable,importWarnings:v.warnings}}),d=o.map(v=>v.id);return{project:{id:r,name:u,createdAt:l.nowIso,updatedAt:l.nowIso,datasetIds:d,activeDatasetId:d[0]??null},datasets:o,warnings:l.parsed.warnings}}function ub(l,r){const u=l.trim().toLowerCase();return u.endsWith(".krona.html")?!0:u.endsWith(".html")||u.endsWith(".htm")?/<krona\b/i.test(r):/<krona\b/i.test(r)}function ob(l){const r=l.match(/<krona\b[\s\S]*?<\/krona>/i);if(!r)throw new Error("No <krona> XML section found in file.");return r[0]}function cb(l){const r={name:"#document",attributes:{},children:[]},u=[r];(l.match(/<[^>]+>|[^<]+/g)??[]).forEach(f=>{if(!f.startsWith("<")){const Y=f.trim();Y.length>0&&u[u.length-1]?.children.push(Io(Y));return}if(f.startsWith("<!--")||f.startsWith("<?")||f.startsWith("<!"))return;if(f.startsWith("</")){const Y=f.slice(2,-1).trim().toLowerCase();for(;u.length>1&&u.pop()?.name!==Y;);return}const v=f.endsWith("/>"),A=f.slice(1,v?-2:-1).trim(),C=A.match(/^([^\s/>]+)/);if(!C)return;const p=C[1].toLowerCase(),b=db(A.slice(C[1].length)),g={name:p,attributes:b,children:[]};u[u.length-1]?.children.push(g),v||u.push(g)});const d=r.children.find(f=>Ko(f));if(!d)throw new Error("Unable to parse Krona XML.");return d}function db(l){const r={},u=/([^\s=/>]+)\s*=\s*("([^"]*)"|'([^']*)')/g;let o=u.exec(l);for(;o;){const d=o[1]?.toLowerCase(),f=o[3]??o[4]??"";d&&(r[d]=Io(f)),o=u.exec(l)}return r}function fb(l,r){const o=Un(l,"attributes")[0]?.attributes.magnitude?.trim().toLowerCase();return o&&o.length>0?o:(r.push(Ti({code:"KRONA_MISSING_MAGNITUDE_ATTRIBUTE",message:"Missing attributes magnitude declaration. Falling back to 'magnitude'.",column:"attributes.magnitude"})),"magnitude")}function hb(l){const r=Un(l,"datasets")[0];return r?Un(r,"dataset").map(u=>Yo(u).trim()).filter(u=>u.length>0):[]}function mb(l,r,u){if(r<=0)return[];const o=[...l];for(;o.length<r;){const d=`${Vo} ${o.length+1}`;u.push(Ti({code:"KRONA_DATASET_NAME_MISSING",message:`Dataset name missing at index ${o.length}. Using '${d}'.`})),o.push(d)}return o.map((d,f)=>_i(d,`${Vo} ${f+1}`))}function pb(l){if(l.nodes.length===1)return Fo(l.nodes[0],l.datasetIndex,l.magnitudeTag,l.warnings,[]);const r=l.nodes.map(o=>Fo(o,l.datasetIndex,l.magnitudeTag,l.warnings,[]));return{name:"Root",magnitude:r.reduce((o,d)=>o+Jr(d.magnitude),0),children:r}}function Fo(l,r,u,o,d){const f=(l.attributes.name??"").trim(),v=_i(f,"Unnamed"),A=[...d,v];f.length===0&&o.push(Ti({code:"KRONA_MISSING_NODE_NAME",message:`Node name missing at path '${d.join("/")||"root"}'. Using 'Unnamed'.`}));const C=Un(l,"node").map(X=>Fo(X,r,u,o,A)),p=up(l,u,r),b=Sb(p),g=bb(b),N=C.reduce((X,at)=>X+Jr(at.magnitude),0);b!==null&&g===null&&o.push(Ti({code:"KRONA_INVALID_MAGNITUDE",message:`Invalid magnitude '${b}' at path '${A.join("/")}'.`,column:u}));const Y=gb(l,r,u);return{name:v,magnitude:Jr(g??N),children:C.length>0?C:void 0,attributes:Object.keys(Y).length>0?Y:void 0,explicitMagnitude:g}}function gb(l,r,u){const o={};return Un(l).forEach(d=>{if(d.name==="node"||d.name===u)return;const f=up(l,d.name,r);f===null||f.trim().length===0||(o[d.name]=f.trim())}),o}function vb(l,r){let u=0;const o=d=>{const f=op(d,r);u=Math.max(u,f.length),Un(d,"node").forEach(v=>o(v))};return l.forEach(d=>o(d)),u}function up(l,r,u){const o=op(l,r);return o.length===0?null:u<o.length?o[u]??null:o[o.length-1]??null}function op(l,r){const u=Un(l,r)[0];if(!u)return[];const o=Un(u,"val");if(o.length>0)return o.map(f=>Yo(f));const d=Yo(u);return d.length>0?[d]:[]}function yb(l){const r=[];let u=0;const o=(d,f)=>{const v=[...f,d.name],A=d.children??[];if(A.length===0){const C=Jr(d.magnitude);if(C<=0)return;u+=1,r.push({rowId:`row-${u}`,sourceRow:u,magnitude:C,path:v,url:null,description:null,attributes:d.attributes??{}});return}A.forEach(C=>o(C,v))};return o(l,[]),r}function Yo(l){const r=[],u=o=>{if(typeof o=="string"){r.push(o);return}o.children.forEach(d=>u(d))};return l.children.forEach(o=>u(o)),r.join(" ").replace(/\s+/g," ").trim()}function Un(l,r){if(!r)return l.children.filter(o=>Ko(o));const u=r.toLowerCase();return l.children.filter(o=>Ko(o)&&o.name===u)}function Ti(l){return{code:l.code,message:l.message,severity:"warning",row:l.row,column:l.column}}function Jr(l){return!Number.isFinite(l)||l<0?0:l}function bb(l){if(l===null)return null;const r=Number(l);return!Number.isFinite(r)||r<0?null:r}function Sb(l){if(l===null)return null;const r=l.trim();return r.length>0?r:null}function _i(l,r){const u=Io(l).trim();return u.length>0?u:r}function xb(l){const r=l.trim();if(r.length===0)return qo;const u=r.replace(/\.[^.]+$/,""),o=u.toLowerCase().endsWith(_m)?u.slice(0,-_m.length):u;return _i(o,qo)}function Ko(l){return typeof l!="string"}function Io(l){return l.replace(/&#x([0-9a-fA-F]+);/g,(r,u)=>Em(parseInt(u,16))).replace(/&#([0-9]+);/g,(r,u)=>Em(parseInt(u,10))).replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'")}function Em(l){if(!Number.isInteger(l)||l<0)return"";try{return String.fromCodePoint(l)}catch{return""}}const cp="jowna.project",dp=1,fp="1.0.0",Ab=".jowna",Cb="application/x-jowna+json";function Tb(l){return{format:cp,version:dp,schemaVersion:fp,exportedAt:l.exportedAt,project:l.project,datasets:l.datasets}}function _b(l){return JSON.stringify(l,null,2)}function Eb(l){let r;try{r=JSON.parse(l)}catch{throw new Error("Invalid project archive file.")}if(!jb(r))throw new Error("Invalid project archive file.");const u=r.version;if(u!==dp)throw new Error(`Unsupported project archive version '${u}'.`);return{...r,schemaVersion:r.schemaVersion&&typeof r.schemaVersion=="string"?r.schemaVersion:fp}}function Nb(l){const r=l.createId("project"),u=new Map,o=new Map(l.archive.datasets.map(g=>[g.id,g]));l.archive.project.datasetIds.forEach(g=>{u.has(g)||u.set(g,l.createId("dataset"))}),l.archive.datasets.forEach(g=>{u.has(g.id)||u.set(g.id,l.createId("dataset"))});const f=Db([...l.archive.project.datasetIds,...l.archive.datasets.map(g=>g.id)]).filter(g=>o.has(g)).map(g=>({...o.get(g),id:u.get(g),projectId:r,createdAt:l.nowIso,updatedAt:l.nowIso})),v=Mb(l.nextName??l.archive.project.name,"Imported Project"),A=f.map(g=>g.id),C=l.archive.project.activeDatasetId?u.get(l.archive.project.activeDatasetId)??null:null,p=C&&A.includes(C)?C:A[0]??null;return{project:{...l.archive.project,id:r,name:v,createdAt:l.nowIso,updatedAt:l.nowIso,datasetIds:A,activeDatasetId:p},datasets:f}}function wb(l){const r=l.trim().replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return`${r.length>0?r:"project"}${Ab}`}function Mb(l,r){const u=l.trim();return u.length>0?u:r}function Db(l){return[...new Set(l)]}function $r(l){return typeof l=="object"&&l!==null}function jb(l){return!$r(l)||l.format!==cp||typeof l.version!="number"||!Number.isInteger(l.version)||typeof l.exportedAt!="string"||!Rb(l.project)||!Array.isArray(l.datasets)?!1:l.datasets.every(r=>zb(r))}function Rb(l){return!(!$r(l)||typeof l.id!="string"||typeof l.name!="string"||typeof l.createdAt!="string"||typeof l.updatedAt!="string"||!Array.isArray(l.datasetIds)||!l.datasetIds.every(r=>typeof r=="string")||l.activeDatasetId!==null&&typeof l.activeDatasetId!="string")}function zb(l){return!(!$r(l)||typeof l.id!="string"||typeof l.projectId!="string"||typeof l.name!="string"||typeof l.createdAt!="string"||typeof l.updatedAt!="string"||!$r(l.tree)||typeof l.tree.name!="string"||typeof l.tree.magnitude!="number")}let Nm=!1;function Ob(){if(Nm)return;Nm=!0;const l=eb(),r=new $0(J0()),u=new Qm,o=Wt(Co,{initial:Co.defaultValue??"selection",handleGrip:hy}),d=Wt(gi,{initial:gi.defaultValue??[],handleGrip:my}),f=Wt(vi,{initial:vi.defaultValue??null,handleGrip:py}),v=Wt(yi,{initial:yi.defaultValue??[],handleGrip:gy}),A=Wt(bi,{initial:bi.defaultValue??null,handleGrip:vy}),C=Wt(_o,{initial:_o.defaultValue??null,handleGrip:Pm}),p=Wt(Eo,{initial:Eo.defaultValue??"",handleGrip:Bm}),b=Wt(No,{initial:No.defaultValue??Ci,handleGrip:qm}),g=Wt(sm,{initial:sm.defaultValue??null,handleGrip:yy}),N=Wt(um,{initial:um.defaultValue??[],handleGrip:by}),Y=Wt(om,{initial:om.defaultValue??null,handleGrip:Sy}),I=Wt(wo,{initial:wo.defaultValue??null,handleGrip:xy}),X=Wt(Mo,{initial:Mo.defaultValue??[],handleGrip:Ay}),at=Wt(Do,{initial:Do.defaultValue??null,handleGrip:Cy}),mt=Wt(jo,{initial:jo.defaultValue??!1,handleGrip:Ty}),ot=Wt(Ro,{initial:Ro.defaultValue??!1,handleGrip:_y}),gt=Wt(zo,{initial:zo.defaultValue??"",handleGrip:Vm}),Ht=Wt(Ho,{initial:Ho.defaultValue??!1,handleGrip:Ym}),te=Wt(Oo,{initial:Oo.defaultValue??"",handleGrip:Fm}),Et=Wt(To,{initial:To.defaultValue??"",handleGrip:Lm}),k=Wt(gl,{initial:gl.defaultValue??Na,handleGrip:Km});let E=ua(gl.defaultValue??Na);const w=Wt(xi,{initial:xi.defaultValue??null,handleGrip:Ey}),P=Wt(Uo,{initial:Uo.defaultValue??null,handleGrip:Ny}),$=Wt(ko,{initial:ko.defaultValue??null,handleGrip:wy}),J=Wt(vl,{initial:vl.defaultValue??6,handleGrip:Xm}),dt=Wt(Go,{initial:Go.defaultValue??[],handleGrip:My}),vt=Wt(Lo,{initial:Lo.defaultValue??-1,handleGrip:Dy});Ao([o,d,f,v,A,C,p,b,g,N,Y,I,X,at,mt,ot,gt,Ht,te,Et,k,w,P,$,J,dt,vt]);const qt=Pr({provides:[rm],homeParamGrips:[gi,vi],compute:({getHomeParam:x})=>{const T=x(gi)??[],R=x(vi)??null,F=T.find(Q=>Q.id===R)??null;return new Map([[rm,F]])}}),O=Pr({provides:[Si],homeParamGrips:[yi,bi],compute:({getHomeParam:x})=>{const T=x(yi)??[],R=x(bi)??null,F=T.find(Q=>Q.id===R)??null;return new Map([[Si,F]])}}),B=Pr({provides:[Fr],homeParamGrips:[Si,gl,xi,vl],compute:({getHomeParam:x})=>{const T=x(Si)??null,R=x(gl),F=x(xi)??null,Q=x(vl)??0;if(!T||!R)return new Map([[Fr,null]]);const lt=u.computeLayout({root:T.tree,settings:R,focusedPath:F,depthLimit:Q<=0?null:Q});return new Map([[Fr,lt]])}});Ao([qt,O,B]);const K={refreshProjects:async()=>{const x=Hb(await l.projects.listProjects());d.set(x);const T=f.get(),R=T&&x.some(F=>F.id===T)?T:x[0]?.id??null;f.set(R),R?await y(R):(v.set([]),A.set(null),k.set(ua(E)),Ht.set(!0))},createProject:async x=>{const T=pi(x,"Untitled Project"),R=pl(),F={id:Vr("project"),name:T,createdAt:R,updatedAt:R,datasetIds:[],activeDatasetId:null,chartSettings:ua(k.get()??E)};await l.projects.saveProject(F),await K.refreshProjects(),await K.openProject(F.id),Et.set("")},copyProject:async(x,T)=>{const R=await l.projects.getProject(x),F=pi(T??`${R?.name??"Project"} Copy`,"Project Copy"),Q=await l.projects.copyProject(x,F);await K.refreshProjects(),await K.openProject(Q.id)},deleteProject:async x=>{await l.projects.deleteProject(x),await K.refreshProjects()},renameProject:async(x,T)=>{const R=await l.projects.getProject(x);if(!R)throw new Error(`Project '${x}' no longer exists.`);const F=pi(T,R.name);F!==R.name&&(await l.projects.saveProject({...R,name:F}),await K.refreshProjects())},exportProjectArchive:async x=>{const T=await l.projects.getProject(x);if(!T)throw new Error(`Project '${x}' no longer exists.`);const R=await l.datasets.listByProject(x),F=new Map(R.map(bt=>[bt.id,bt])),lt=wm([...T.datasetIds,...R.map(bt=>bt.id)]).map(bt=>F.get(bt)).filter(bt=>!!bt),W=Tb({project:T,datasets:lt,exportedAt:pl()}),nt=_b(W);Lb(wb(T.name),nt,Cb)},importProjectArchive:async x=>{const T=await x.text(),R=async()=>{const Q=Eb(T),lt=pl(),W=Nb({archive:Q,nowIso:lt,createId:Vr});for(const nt of W.datasets)await l.datasets.saveDataset(nt);return await l.projects.saveProject(W.project),await K.refreshProjects(),await K.openProject(W.project.id),{mode:"archive",projectName:W.project.name,datasetCount:W.datasets.length,warnings:[]}},F=async()=>{const Q=rb({name:x.name,content:T}),lt=pl(),W=sb({parsed:Q,nowIso:lt,createId:Vr});for(const nt of W.datasets)await l.datasets.saveDataset(nt);return await l.projects.saveProject(W.project),await K.refreshProjects(),await K.openProject(W.project.id),{mode:"krona-html",projectName:W.project.name,datasetCount:W.datasets.length,warnings:W.warnings}};if(ub(x.name,T))try{return await F()}catch(Q){try{return await R()}catch{throw Q}}try{return await R()}catch(Q){try{return await F()}catch(lt){throw new Error(`Unsupported import file. Archive parse failed: ${Dm(Q)}. Krona HTML parse failed: ${Dm(lt)}.`)}}},renameDataset:async(x,T)=>{const R=await l.datasets.getDataset(x);if(!R)throw new Error(`Dataset '${x}' no longer exists.`);const F=pi(T,R.name);F!==R.name&&(await l.datasets.saveDataset({...R,name:F}),await K.refreshProjects())},openProject:async x=>{f.set(x),await y(x),o.set("selection")},parsePreview:async()=>{const x=C.get(),T=b.get()??Ci;if(!x||x.content.trim().length===0){at.set("Select a source file or URL before parsing."),I.set(null),X.set([]),ot.set(!1);return}mt.set(!0),at.set(null);try{const R=await r.parse({source:x,parameters:T});g.set(R.detectedFormat),N.set(R.normalizedRows),Y.set(R.tree),I.set(R.preview),X.set(R.warnings);const F=R.normalizedRows.length>0||R.tree.magnitude>0||(R.tree.children?.length??0)>0;ot.set(F),at.set(F?null:"No usable rows found.")}catch(R){g.set(null),N.set([]),Y.set(null),I.set(null),X.set([]),ot.set(!1),at.set(R.message)}finally{mt.set(!1)}},applyImport:async x=>{const T=f.get(),R=Y.get(),F=N.get()??[],Q=X.get()??[],lt=C.get(),W=g.get()??void 0;if(!T)throw new Error("Select or create a project before applying import.");if(!R)throw new Error("Parse preview before applying import.");const nt=pl(),bt=pi(x,"Imported Dataset"),ht={id:Vr("dataset"),projectId:T,name:bt,createdAt:nt,updatedAt:nt,tree:R,sourceFileName:lt?.name,sourceFormat:W,flatTable:F,importWarnings:Q};await l.datasets.saveDataset(ht);const xt=await l.projects.getProject(T);if(!xt)throw new Error(`Project '${T}' no longer exists.`);const Yt={...xt,datasetIds:wm([...xt.datasetIds,ht.id]),activeDatasetId:ht.id,updatedAt:nt};await l.projects.saveProject(Yt),await K.refreshProjects(),await K.openChart(ht.id),gt.set(bt),Ht.set(!1)},openChart:x=>{const T=x??A.get();if(T){A.set(T);const F=(v.get()??[]).find(Q=>Q.id===T)??null;F&&J.set(Gb(F.tree))}o.set("chart")},setProjectChartSettings:async x=>{const T=f.get();if(k.set(ua(x)),!T)return;const R=await l.projects.getProject(T);R&&(await l.projects.saveProject({...R,chartSettings:ua(x)}),d.update(F=>F.map(Q=>Q.id===T?{...Q,chartSettings:ua(x)}:Q)))},backToSelection:()=>{o.set("selection")},focusPath:x=>{const T=Mm(x);if(T.length===0)return;const R=A.get(),F=(v.get()??[]).find(nt=>nt.id===R)??null;if(F&&!kb(F.tree,T))return;w.set(T),P.set(T),$.set(null);const Q=dt.get()??[],lt=vt.get()??-1,W=[...Q.slice(0,lt+1),T];dt.set(W),vt.set(W.length-1)},hoverPath:x=>{$.set(x?Mm(x):null)},goBack:()=>{const x=dt.get()??[],T=vt.get()??-1;if(T<=0)return;const R=T-1;vt.set(R);const F=x[R]??null;w.set(F),P.set(F),$.set(null)},goForward:()=>{const x=dt.get()??[],T=vt.get()??-1;if(T>=x.length-1)return;const R=T+1;vt.set(R);const F=x[R]??null;w.set(F),P.set(F),$.set(null)},clearFocus:()=>{w.set(null),P.set(null),$.set(null),dt.set([]),vt.set(-1)}},Z=Pr({provides:[Xr],compute:()=>new Map([[Xr,K]])});Ao([Z]),rt();async function rt(){const x=await l.settings.loadSettings();x?.chart?(E=ua(x.chart),k.set(E)):await l.settings.saveSettings({chart:k.get()??Na,app:{defaultFormat:"tsv",autoSaveLastProject:!0,savedProjectSort:"updated-desc"}}),await K.refreshProjects()}async function y(x){const T=Ub(await l.datasets.listByProject(x));v.set(T),T.length===0&&Ht.set(!0);const R=await l.projects.getProject(x),F=R?.chartSettings??E;k.set(ua(F));const Q=R?.activeDatasetId??null,lt=Q&&T.some(W=>W.id===Q)?Q:T[0]?.id??null;A.set(lt),R&&R.activeDatasetId!==lt&&await l.projects.saveProject({...R,activeDatasetId:lt,updatedAt:pl()})}}function Ao(l){l.forEach(r=>{Qo.registerTap(r)})}function Vr(l){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?`${l}-${crypto.randomUUID()}`:`${l}-${Math.random().toString(36).slice(2,10)}`}function pl(){return new Date().toISOString()}function Hb(l){return[...l].sort((r,u)=>u.updatedAt.localeCompare(r.updatedAt))}function Ub(l){return[...l].sort((r,u)=>u.updatedAt.localeCompare(r.updatedAt))}function wm(l){return[...new Set(l)]}function pi(l,r){const u=l.trim();return u.length>0?u:r}function Mm(l){return l.map(r=>r.trim()).filter(r=>r.length>0)}function kb(l,r){if(r.length===0||r[0]!==l.name)return!1;let u=l;for(let o=1;o<r.length;o+=1){const d=u.children?.find(f=>f.name===r[o]);if(!d)return!1;u=d}return!0}function ua(l){return{...l,colorScheme:Array.isArray(l.colorScheme)?[...l.colorScheme]:l.colorScheme}}function Gb(l){return hp(l,0)}function hp(l,r){const u=l.children??[];if(u.length===0)return r;let o=r;for(const d of u){const f=hp(d,r+1);f>o&&(o=f)}return o}function Dm(l){return l instanceof Error&&l.message.trim().length>0?l.message:"Unknown error"}function Lb(l,r,u){const o=new Blob([r],{type:u}),d=URL.createObjectURL(o),f=document.createElement("a");f.href=d,f.download=l,f.rel="noopener",f.click(),URL.revokeObjectURL(d)}Ob();const mp=document.getElementById("root");if(!mp)throw new Error("Expected #root element for Jowna bootstrap.");kv.createRoot(mp).render(m.jsx(Lt.StrictMode,{children:m.jsx(oy,{grok:Qo,context:fy,children:m.jsx(y0,{})})}));
