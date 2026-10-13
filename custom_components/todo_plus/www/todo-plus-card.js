/* todo-plus-card — generated bundle. Edit sources in frontend/src, then `npm run build`. */
var _e,h,Qe,bo,z,Je,Ge,Ze,Se,ce,te,et,Ee,Pe,De,tt,ue={},pe=[],ko=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,oe=Array.isArray;function M(e,t){for(var o in t)e[o]=t[o];return e}function Ie(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function r(e,t,o){var n,i,a,s={};for(a in t)a=="key"?n=t[a]:a=="ref"?i=t[a]:s[a]=t[a];if(arguments.length>2&&(s.children=arguments.length>3?_e.call(arguments,2):o),typeof e=="function"&&e.defaultProps!=null)for(a in e.defaultProps)s[a]===void 0&&(s[a]=e.defaultProps[a]);return de(e,s,n,i,null)}function de(e,t,o,n,i){var a={type:e,props:t,key:o,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Qe,__i:-1,__u:0};return i==null&&h.vnode!=null&&h.vnode(a),a}function R(e){return e.children}function O(e,t){this.props=e,this.context=t}function X(e,t){if(t==null)return e.__?X(e.__,e.__i+1):null;for(var o;t<e.__k.length;t++)if((o=e.__k[t])!=null&&o.__e!=null)return o.__e;return typeof e.type=="function"?X(e):null}function xo(e){if(e.__P&&e.__d){var t=e.__v,o=t.__e,n=[],i=[],a=M({},t);a.__v=t.__v+1,h.vnode&&h.vnode(a),Le(e.__P,a,t,e.__n,e.__P.namespaceURI,32&t.__u?[o]:null,n,o??X(t),!!(32&t.__u),i),a.__v=t.__v,a.__.__k[a.__i]=a,at(n,a,i),t.__e=t.__=null,a.__e!=o&&ot(a)}}function ot(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),ot(e)}function Re(e){(!e.__d&&(e.__d=!0)&&z.push(e)&&!me.__r++||Je!=h.debounceRendering)&&((Je=h.debounceRendering)||Ge)(me)}function me(){try{for(var e,t=1;z.length;)z.length>t&&z.sort(Ze),e=z.shift(),t=z.length,xo(e)}finally{z.length=me.__r=0}}function nt(e,t,o,n,i,a,s,u,_,c,d){var g,l,f,C,D,T,x,m=n&&n.__k||pe,p=t.length;for(_=Co(o,t,m,_,p),g=0;g<p;g++)(f=o.__k[g])!=null&&(l=f.__i!=-1&&m[f.__i]||ue,f.__i=g,T=Le(e,f,l,i,a,s,u,_,c,d),C=f.__e,f.ref&&l.ref!=f.ref&&(l.ref&&Oe(l.ref,null,f),d.push(f.ref,f.__c||C,f)),D==null&&C!=null&&(D=C),(x=!!(4&f.__u))||l.__k===f.__k?(_=rt(f,_,e,x),x&&l.__e&&(l.__e=null)):typeof f.type=="function"&&T!==void 0?_=T:C&&(_=C.nextSibling),f.__u&=-7);return o.__e=D,_}function Co(e,t,o,n,i){var a,s,u,_,c,d=o.length,g=d,l=0;for(e.__k=new Array(i),a=0;a<i;a++)(s=t[a])!=null&&typeof s!="boolean"&&typeof s!="function"?(typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?s=e.__k[a]=de(null,s,null,null,null):oe(s)?s=e.__k[a]=de(R,{children:s},null,null,null):s.constructor===void 0&&s.__b>0?s=e.__k[a]=de(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):e.__k[a]=s,_=a+l,s.__=e,s.__b=e.__b+1,u=null,(c=s.__i=To(s,o,_,g))!=-1&&(g--,(u=o[c])&&(u.__u|=2)),u==null||u.__v==null?(c==-1&&(i>d?l--:i<d&&l++),typeof s.type!="function"&&(s.__u|=4)):c!=_&&(c==_-1?l--:c==_+1?l++:(c>_?l--:l++,s.__u|=4))):e.__k[a]=null;if(g)for(a=0;a<d;a++)(u=o[a])!=null&&!(2&u.__u)&&(u.__e==n&&(n=X(u)),lt(u,u));return n}function rt(e,t,o,n){var i,a;if(typeof e.type=="function"){for(i=e.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=e,t=rt(i[a],t,o,n));return t}e.__e!=t&&(n&&(t&&e.type&&!t.parentNode&&(t=X(e)),o.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function ne(e,t){return t=t||[],e==null||typeof e=="boolean"||(oe(e)?e.some(function(o){ne(o,t)}):t.push(e)),t}function To(e,t,o,n){var i,a,s,u=e.key,_=e.type,c=t[o],d=c!=null&&(2&c.__u)==0;if(c===null&&u==null||d&&u==c.key&&_==c.type)return o;if(n>(d?1:0)){for(i=o-1,a=o+1;i>=0||a<t.length;)if((c=t[s=i>=0?i--:a++])!=null&&!(2&c.__u)&&u==c.key&&_==c.type)return s}return-1}function Xe(e,t,o){t[0]=="-"?e.setProperty(t,o??""):e[t]=o==null?"":typeof o!="number"||ko.test(t)?o:o+"px"}function le(e,t,o,n,i){var a,s;e:if(t=="style")if(typeof o=="string")e.style.cssText=o;else{if(typeof n=="string"&&(e.style.cssText=n=""),n)for(t in n)o&&t in o||Xe(e.style,t,"");if(o)for(t in o)n&&o[t]==n[t]||Xe(e.style,t,o[t])}else if(t[0]=="o"&&t[1]=="n")a=t!=(t=t.replace(et,"$1")),s=t.toLowerCase(),t=s in e||t=="onFocusOut"||t=="onFocusIn"?s.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+a]=o,o?n?o[te]=n[te]:(o[te]=Ee,e.addEventListener(t,a?De:Pe,a)):e.removeEventListener(t,a?De:Pe,a);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=o??"";break e}catch{}typeof o=="function"||(o==null||o===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&o==1?"":o))}}function Ye(e){return function(t){if(this.l){var o=this.l[t.type+e];if(t[ce]==null)t[ce]=Ee++;else if(t[ce]<o[te])return;return o(h.event?h.event(t):t)}}}function Le(e,t,o,n,i,a,s,u,_,c){var d,g,l,f,C,D,T,x,m,p,v,S,I,ee,H,$,E=t.type;if(t.constructor!==void 0)return null;128&o.__u&&(_=!!(32&o.__u),a=[u=t.__e=o.__e]),(d=h.__b)&&d(t);e:if(typeof E=="function"){g=s.length;try{if(m=t.props,p=E.prototype&&E.prototype.render,v=(d=E.contextType)&&n[d.__c],S=d?v?v.props.value:d.__:n,o.__c?x=(l=t.__c=o.__c).__=l.__E:(p?t.__c=l=new E(m,S):(t.__c=l=new O(m,S),l.constructor=E,l.render=So),v&&v.sub(l),l.state||(l.state={}),l.__n=n,f=l.__d=!0,l.__h=[],l._sb=[]),p&&l.__s==null&&(l.__s=l.state),p&&E.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=M({},l.__s)),M(l.__s,E.getDerivedStateFromProps(m,l.__s))),C=l.props,D=l.state,l.__v=t,f)p&&E.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),p&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(p&&E.getDerivedStateFromProps==null&&m!==C&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(m,S),t.__v==o.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(m,l.__s,S)===!1){t.__v!=o.__v&&(l.props=m,l.state=l.__s,l.__d=!1),t.__e=o.__e,t.__k=o.__k,t.__k.some(function(B){B&&(B.__=t)}),pe.push.apply(l.__h,l._sb),l._sb=[],l.__h.length&&s.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(m,l.__s,S),p&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(C,D,T)})}if(l.context=S,l.props=m,l.__P=e,l.__e=!1,I=h.__r,ee=0,p)l.state=l.__s,l.__d=!1,I&&I(t),d=l.render(l.props,l.state,l.context),pe.push.apply(l.__h,l._sb),l._sb=[];else do l.__d=!1,I&&I(t),d=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++ee<25);l.state=l.__s,l.getChildContext!=null&&(n=M(M({},n),l.getChildContext())),p&&!f&&l.getSnapshotBeforeUpdate!=null&&(T=l.getSnapshotBeforeUpdate(C,D)),H=d!=null&&d.type===R&&d.key==null?st(d.props.children):d,u=nt(e,oe(H)?H:[H],t,o,n,i,a,s,u,_,c),l.base=t.__e,t.__u&=-161,l.__h.length&&s.push(l),x&&(l.__E=l.__=null)}catch(B){if(s.length=g,t.__v=null,_||a!=null){if(B.then){for(t.__u|=_?160:128;u&&u.nodeType==8&&u.nextSibling;)u=u.nextSibling;a!=null&&(a[a.indexOf(u)]=null),t.__e=u}else if(a!=null)for($=a.length;$--;)Ie(a[$])}else t.__e=o.__e;t.__k==null&&(t.__k=o.__k||[]),B.then||it(t),h.__e(B,t,o)}}else a==null&&t.__v==o.__v?(t.__k=o.__k,t.__e=o.__e):u=t.__e=wo(o.__e,t,o,n,i,a,s,_,c);return(d=h.diffed)&&d(t),128&t.__u?void 0:u}function it(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(it))}function at(e,t,o){for(var n=0;n<o.length;n++)Oe(o[n],o[++n],o[++n]);h.__c&&h.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(a){a.call(i)})}catch(a){h.__e(a,i.__v)}})}function st(e){return typeof e!="object"||e==null||e.__b>0?e:oe(e)?e.map(st):e.constructor!==void 0?null:M({},e)}function wo(e,t,o,n,i,a,s,u,_){var c,d,g,l,f,C,D,T=o.props||ue,x=t.props,m=t.type;if(m=="svg"?i="http://www.w3.org/2000/svg":m=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),a!=null){for(c=0;c<a.length;c++)if((f=a[c])&&"setAttribute"in f==!!m&&(m?f.localName==m:f.nodeType==3)){e=f,a[c]=null;break}}if(e==null){if(m==null)return document.createTextNode(x);e=document.createElementNS(i,m,x.is&&x),u&&(h.__m&&h.__m(t,a),u=!1),a=null}if(m==null)T===x||u&&e.data==x||(e.data=x);else{if(a=m=="textarea"&&x.defaultValue!=null?null:a&&_e.call(e.childNodes),!u&&a!=null)for(T={},c=0;c<e.attributes.length;c++)T[(f=e.attributes[c]).name]=f.value;for(c in T)f=T[c],c=="dangerouslySetInnerHTML"?g=f:c=="children"||c in x||c=="value"&&"defaultValue"in x||c=="checked"&&"defaultChecked"in x||le(e,c,null,f,i);for(c in x)f=x[c],c=="children"?l=f:c=="dangerouslySetInnerHTML"?d=f:c=="value"?C=f:c=="checked"?D=f:u&&typeof f!="function"||T[c]===f||le(e,c,f,T[c],i);if(d)u||g&&(d.__html==g.__html||d.__html==e.innerHTML)||(e.innerHTML=d.__html),t.__k=[];else if(g&&(e.innerHTML=""),nt(t.type=="template"?e.content:e,oe(l)?l:[l],t,o,n,m=="foreignObject"?"http://www.w3.org/1999/xhtml":i,a,s,a?a[0]:o.__k&&X(o,0),u,_),a!=null)for(c=a.length;c--;)Ie(a[c]);u&&m!="textarea"||(c="value",m=="progress"&&C==null?e.removeAttribute("value"):C!=null&&(C!==e[c]||m=="progress"&&!C||m=="option"&&C!=T[c])&&le(e,c,C,T[c],i),c="checked",D!=null&&D!=e[c]&&le(e,c,D,T[c],i))}return e}function Oe(e,t,o){try{if(typeof e=="function"){var n=typeof e.__u=="function";n&&e.__u(),n&&t==null||(e.__u=e(t))}else e.current=t}catch(i){h.__e(i,o)}}function lt(e,t,o){var n,i;if(h.unmount&&h.unmount(e),(n=e.ref)&&(n.current&&n.current!=e.__e||Oe(n,null,t)),(n=e.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(a){h.__e(a,t)}n.base=n.__P=n.__n=null}if(n=e.__k)for(i=0;i<n.length;i++)n[i]&&lt(n[i],t,o||typeof e.type!="function");o||Ie(e.__e),e.__c=e.__=e.__e=void 0}function So(e,t,o){return this.constructor(e,o)}function fe(e,t,o){var n,i,a,s;t==document&&(t=document.documentElement),h.__&&h.__(e,t),i=(n=typeof o=="function")?null:o&&o.__k||t.__k,a=[],s=[],Le(t,e=(!n&&o||t).__k=r(R,null,[e]),i||ue,ue,t.namespaceURI,!n&&o?[o]:i?null:t.firstChild?_e.call(t.childNodes):null,a,!n&&o?o:i?i.__e:t.firstChild,n,s),at(a,e,s),e.props.children=null}function A(e){function t(o){var n,i;return this.getChildContext||(n=new Set,(i={})[t.__c]=this,this.getChildContext=function(){return i},this.componentWillUnmount=function(){n=null},this.shouldComponentUpdate=function(a){this.props.value!=a.value&&n.forEach(function(s){s.__e=!0,Re(s)})},this.sub=function(a){n.add(a);var s=a.componentWillUnmount;a.componentWillUnmount=function(){n&&n.delete(a),s&&s.call(a)}}),o.children}return t.__c="__cC"+tt++,t.__=e,t.Provider=t.__l=(t.Consumer=function(o,n){return o.children(n)}).contextType=t,t}_e=pe.slice,h={__e:function(e,t,o,n){for(var i,a,s;t=t.__;)if((i=t.__c)&&!i.__)try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(e)),s=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,n||{}),s=i.__d),s)return i.__E=i}catch(u){e=u}throw e}},Qe=0,bo=function(e){return e!=null&&e.constructor===void 0},O.prototype.setState=function(e,t){var o;o=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=M({},this.state),typeof e=="function"&&(e=e(M({},o),this.props)),e&&M(o,e),e!=null&&this.__v&&(t&&this._sb.push(t),Re(this))},O.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Re(this))},O.prototype.render=R,z=[],Ge=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ze=function(e,t){return e.__v.__b-t.__v.__b},me.__r=0,Se=Math.random().toString(8),ce="__d"+Se,te="__a"+Se,et=/(PointerCapture)$|Capture$/i,Ee=0,Pe=Ye(!1),De=Ye(!0),tt=0;var ct=["days","weeks","months"],dt=["after_completion","fixed"],ut=["daily","weekly","monthly","yearly"],Y=["MO","TU","WE","TH","FR","SA","SU"],pt=["low","normal","high"],Ae={high:0,normal:1,low:2},mt=[{type:"header"},{type:"empty"},{type:"todo",title:null},{type:"quick_add"},{type:"spacer",height:24},{type:"completed",buttons:[{action:"clear_completed",text:null,variant:"subtle"}]},{type:"scheduled",buttons:[{action:"add_task",text:null,variant:"subtle"}]}];function _t(e,t){customElements.get(e)||customElements.define(e,t)}function ft({type:e,name:t,description:o}){window.customCards=window.customCards||[],window.customCards.some(n=>n.type===e)||window.customCards.push({type:e,name:t,description:o,preview:!1})}var V,w,Ne,yt,re=0,Tt=[],P=h,gt=P.__b,ht=P.__r,vt=P.diffed,bt=P.__c,kt=P.unmount,xt=P.__;function ie(e,t){P.__h&&P.__h(w,e,re||t),re=0;var o=w.__H||(w.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function N(e){return re=1,wt(St,e)}function wt(e,t,o){var n=ie(V++,2);if(n.t=e,!n.__c&&(n.__=[o?o(t):St(void 0,t),function(u){var _=n.__N?n.__N[0]:n.__[0],c=n.t(_,u);_!==c&&(n.__N=[c,n.__[1]],n.__c.setState({}))}],n.__c=w,!w.__f)){var i=function(u,_,c){if(!n.__c.__H)return!0;var d=!1,g=n.__c.props!==u;if(n.__c.__H.__.some(function(f){if(f.__N){d=!0;var C=f.__[0];f.__=f.__N,f.__N=void 0,C!==f.__[0]&&(g=!0)}}),a){var l=a.call(this,u,_,c);return d?l||g:l}return!d||g};w.__f=!0;var a=w.shouldComponentUpdate,s=w.componentWillUpdate;w.componentWillUpdate=function(u,_,c){if(this.__e){var d=a;a=void 0,i(u,_,c),a=d}s&&s.call(this,u,_,c)},w.shouldComponentUpdate=i}return n.__N||n.__}function ae(e,t){var o=ie(V++,3);!P.__s&&qe(o.__H,t)&&(o.__=e,o.u=t,w.__H.__h.push(o))}function Ue(e,t){var o=ie(V++,4);!P.__s&&qe(o.__H,t)&&(o.__=e,o.u=t,w.__h.push(o))}function K(e){return re=5,q(function(){return{current:e}},[])}function q(e,t){var o=ie(V++,7);return qe(o.__H,t)&&(o.__=e(),o.__H=t,o.__h=e),o.__}function Me(e,t){return re=8,q(function(){return e},t)}function F(e){var t=w.context[e.__c],o=ie(V++,9);return o.c=e,t?(o.__==null&&(o.__=!0,t.sub(w)),t.props.value):e.__}function Po(){for(var e;e=Tt.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(ye),t.__h.some(Fe),t.__h=[]}catch(o){t.__h=[],P.__e(o,e.__v)}}}P.__b=function(e){w=null,gt&&gt(e)},P.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),xt&&xt(e,t)},P.__r=function(e){ht&&ht(e),V=0;var t=(w=e.__c).__H;t&&(Ne===w?(t.__h=[],w.__h=[],t.__.some(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})):(t.__h.some(ye),t.__h.some(Fe),t.__h=[],V=0)),Ne=w},P.diffed=function(e){vt&&vt(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Tt.push(t)!==1&&yt===P.requestAnimationFrame||((yt=P.requestAnimationFrame)||Do)(Po)),t.__H.__.some(function(o){o.u&&(o.__H=o.u,o.u=void 0)})),Ne=w=null},P.__c=function(e,t){t.some(function(o){try{o.__h.some(ye),o.__h=o.__h.filter(function(n){return!n.__||Fe(n)})}catch(n){t.some(function(i){i.__h&&(i.__h=[])}),t=[],P.__e(n,o.__v)}}),bt&&bt(e,t)},P.unmount=function(e){kt&&kt(e);var t,o=e.__c;o&&o.__H&&(o.__H.__.some(function(n){try{ye(n)}catch(i){t=i}}),o.__H=void 0,t&&P.__e(t,o.__v))};var Ct=typeof requestAnimationFrame=="function";function Do(e){var t,o=function(){clearTimeout(n),Ct&&cancelAnimationFrame(t),setTimeout(e)},n=setTimeout(o,35);Ct&&(t=requestAnimationFrame(o))}function ye(e){var t=w,o=e.__c;typeof o=="function"&&(e.__c=void 0,o()),w=t}function Fe(e){var t=w;e.__c=e.__(),w=t}function qe(e,t){return!e||e.length!==t.length||t.some(function(o,n){return o!==e[n]})}function St(e,t){return typeof t=="function"?t(e):t}function Eo(e,t){for(var o in t)e[o]=t[o];return e}function Be(e,t){for(var o in e)if(o!=="__source"&&!(o in t))return!0;for(var n in t)if(n!=="__source"&&e[n]!==t[n])return!0;return!1}function Pt(e,t){this.props=e,this.context=t}function Nt(e,t){function o(i){var a=this.props.ref;return a!=i.ref&&a&&(typeof a=="function"?a(null):a.current=null),t?!t(this.props,i)||a!=i.ref:Be(this.props,i)}function n(i){return this.shouldComponentUpdate=o,r(e,i)}return n.displayName="Memo("+(e.displayName||e.name)+")",n.__f=n.prototype.isReactComponent=!0,n.type=e,n}(Pt.prototype=new O).isPureReactComponent=!0,Pt.prototype.shouldComponentUpdate=function(e,t){return Be(this.props,e)||Be(this.state,t)};var Dt=h.__b;h.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),Dt&&Dt(e)};var fn=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.forward_ref")||3911;var Io=h.__e;h.__e=function(e,t,o,n){if(e.then){for(var i,a=t;a=a.__;)if((i=a.__c)&&i.__c)return t.__e==null&&(t.__e=o.__e,t.__k=o.__k||[]),i.__c(e,t)}Io(e,t,o,n)};var Rt=h.unmount;function Ft(e,t,o){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach(function(n){typeof n.__c=="function"&&n.__c()}),e.__c.__H=null),(e=Eo({},e)).__c!=null&&(e.__c.__P===o&&(e.__c.__P=t),e.__c.__e=!0,e.__c=null),e.__k=e.__k&&e.__k.map(function(n){return Ft(n,t,o)})),e}function Ut(e,t,o){return e&&o&&(e.__v=null,e.__k=e.__k&&e.__k.map(function(n){return Ut(n,t,o)}),e.__c&&e.__c.__P===t&&(e.__e&&o.appendChild(e.__e),e.__c.__e=!0,e.__c.__P=o)),e}function He(){this.__u=0,this.o=null,this.__b=null}function Mt(e){var t=e.__&&e.__.__c;return t&&t.__a&&t.__a(e)}function ge(){this.i=null,this.l=null}h.unmount=function(e){var t=e.__c;t&&(t.__z=!0),t&&t.__R&&t.__R(),t&&32&e.__u&&(e.type=null),Rt&&Rt(e)},(He.prototype=new O).__c=function(e,t){var o=t.__c,n=this;n.o==null&&(n.o=[]),n.o.push(o);var i=Mt(n.__v),a=!1,s=function(){a||n.__z||(a=!0,o.__R=null,i?i(_):_())};o.__R=s;var u=o.__P;o.__P=null;var _=function(){if(!--n.__u){if(n.state.__a){var c=n.state.__a;n.__v.__k[0]=Ut(c,c.__c.__P,c.__c.__O)}var d;for(n.setState({__a:n.__b=null});d=n.o.pop();)d.__P=u,d.forceUpdate()}};n.__u++||32&t.__u||n.setState({__a:n.__b=n.__v.__k[0]}),e.then(s,s)},He.prototype.componentWillUnmount=function(){this.o=[]},He.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var o=document.createElement("div"),n=this.__v.__k[0].__c;this.__v.__k[0]=Ft(this.__b,o,n.__O=n.__P)}this.__b=null}var i=t.__a&&r(R,null,e.fallback);return i&&(i.__u&=-33),[r(R,null,t.__a?null:e.children),i]};var Et=function(e,t,o){if(++o[1]===o[0]&&e.l.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.l.size))for(o=e.i;o;){for(;o.length>3;)o.pop()();if(o[1]<o[0])break;e.i=o=o[2]}};(ge.prototype=new O).__a=function(e){var t=this,o=Mt(t.__v),n=t.l.get(e);return n[0]++,function(i){var a=function(){t.props.revealOrder?(n.push(i),Et(t,e,n)):i()};o?o(a):a()}},ge.prototype.render=function(e){this.i=null,this.l=new Map;var t=ne(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&t.reverse();for(var o=t.length;o--;)this.l.set(t[o],this.i=[1,0,this.i]);return e.children},ge.prototype.componentDidUpdate=ge.prototype.componentDidMount=function(){var e=this;this.l.forEach(function(t,o){Et(e,o,t)})};var Lo=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,Oo=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Ao=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,No=/[A-Z0-9]/g,Fo=typeof document<"u",Uo=function(e){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(e)};O.prototype.isReactComponent=!0,["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(O.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});var It=h.event;h.event=function(e){return It&&(e=It(e)),e.persist=function(){},e.isPropagationStopped=function(){return this.cancelBubble},e.isDefaultPrevented=function(){return this.defaultPrevented},e.nativeEvent=e};var qt,Mo={configurable:!0,get:function(){return this.class}},Lt=h.vnode;h.vnode=function(e){typeof e.type=="string"&&function(t){var o=t.props,n=t.type,i={},a=n.indexOf("-")==-1;for(var s in o){var u=o[s];if(!(s==="value"&&"defaultValue"in o&&u==null||Fo&&s==="children"&&n==="noscript"||s==="class"||s==="className")){var _=s.toLowerCase();s==="defaultValue"&&"value"in o&&o.value==null?s="value":s==="download"&&u===!0?u="":_==="translate"&&u==="no"?u=!1:_[0]==="o"&&_[1]==="n"?_==="ondoubleclick"?s="ondblclick":_!=="onchange"||n!=="input"&&n!=="textarea"||Uo(o.type)?_==="onfocus"?s="onfocusin":_==="onblur"?s="onfocusout":Ao.test(s)&&(s=_):_=s="oninput":a&&Oo.test(s)?s=s.replace(No,"-$&").toLowerCase():u===null&&(u=void 0),_==="oninput"&&i[s=_]&&(s="oninputCapture"),i[s]=u}}n=="select"&&(i.multiple&&Array.isArray(i.value)&&(i.value=ne(o.children).forEach(function(c){c.props.selected=i.value.indexOf(c.props.value)!=-1})),i.defaultValue!=null&&(i.value=ne(o.children).forEach(function(c){c.props.selected=i.multiple?i.defaultValue.indexOf(c.props.value)!=-1:i.defaultValue==c.props.value}))),o.class&&!o.className?(i.class=o.class,Object.defineProperty(i,"className",Mo)):o.className&&(i.class=i.className=o.className),t.props=i}(e),e.$$typeof=Lo,Lt&&Lt(e)};var Ot=h.__r;h.__r=function(e){Ot&&Ot(e),qt=e.__c};var At=h.diffed;h.diffed=function(e){At&&At(e);var t=e.props,o=e.__e;o!=null&&e.type==="textarea"&&"value"in t&&t.value!==o.value&&(o.value=t.value==null?"":t.value),qt=null};var Ht=[];function b(e){Ht.push(e)}function Bt({children:e}){return r(R,null,r("style",{lang:"css"},Ht.join(`
`)),e)}var zt=A({language:"en"});function Wt({locale:e,children:t}){return r(zt.Provider,{value:e},t)}function he(){return F(zt)}var $t=A([]);function Vt({persons:e,children:t}){return r($t.Provider,{value:e},t)}function ve(){return F($t)}function Kt(e,t){return e.find(o=>o.id===t)?.name??t}var jt=A(()=>Promise.resolve());function Jt({call:e,children:t}){return r(jt.Provider,{value:e},t)}function Xt(){return F(jt)}var Yt={card:{add_task:"Add task",quick_add_placeholder:"Add a task\u2026",new_task:"New task",edit_task:"Edit task",no_tasks:"No tasks yet.",section_todo:"To-do",section_scheduled:"Scheduled",section_completed:"Completed",name:"Name",description:"Description",due_date:"Due date",priority:"Priority",assignee:"Assignee",unassigned:"Unassigned",start_date:"Start date (hidden until then)",recurring:"Recurring task",every:"Every",unit:"Unit",mode:"Mode",hint:"Fixed schedule: recurs on an iCal RRULE calendar schedule anchored at the start date; missed periods stack. After completion: the next one appears the interval after you finish.",cancel:"Cancel",save:"Save",saving:"Saving\u2026",delete:"Delete",prio_low:"Low",prio_normal:"Normal",prio_high:"High",starts:"starts",rec_schedule:"schedule",rec_after:"after done",mode_after_completion:"After completion",mode_fixed:"Fixed schedule",freq_daily:"days",freq_weekly:"weeks",freq_monthly:"months",freq_yearly:"years",on:"On",by_monthday:"Day of the month",by_weekday:"Day of the week",day:"Day",day_last:"Last day",which:"Occurrence",weekday:"Weekday",month:"Month",pos_1:"First",pos_2:"Second",pos_3:"Third",pos_4:"Fourth",pos_last:"Last",ends:"Ends",ends_never:"Never",ends_after:"After",ends_on:"On date",occurrences:"occurrences",unit_days:"days",unit_weeks:"weeks",unit_months:"months",confirm_delete:'Delete "%s"?',clear_completed:"Clear completed",confirm_clear:"Clear %s completed task(s)?"},config:{step:{user:{title:"Add to-do list",description:"Create a new to-do list.",data:{name:"List name"}}}},services:{create_task:{name:"Create task",description:"Create a task in a to-do list. Keep it simple, or open Advanced options for a start date, priority and recurrence.",fields:{summary:{name:"Name",description:"The task name."},description:{name:"Description",description:"Optional longer description."},due_date:{name:"Due date",description:"Optional due date."},priority:{name:"Priority",description:"High sorts to the top, low to the bottom."},assignee:{name:"Assignee",description:"Optional person responsible (free text)."},start_date:{name:"Start date",description:"The task stays hidden until this date; also the schedule anchor for recurring tasks."},interval:{name:"Interval",description:"How many units between occurrences."},unit:{name:"Interval unit",description:"days, weeks or months."},mode:{name:"Recurrence mode",description:"'fixed' or 'after_completion'."}},sections:{advanced:{name:"Advanced options",description:"Start date, priority and recurrence."}}},set_recurrence:{name:"Set recurrence",description:"Turn an existing task into a recurring one.",fields:{item:{name:"Task",description:"The task name or uid."},uid:{name:"Task uid",description:"The uid of the task."},start_date:{name:"Start date",description:"The schedule anchor."},interval:{name:"Interval",description:"How many units between occurrences."},unit:{name:"Interval unit",description:"days, weeks or months."},mode:{name:"Recurrence mode",description:"'fixed' or 'after_completion'."}}},clear_recurrence:{name:"Clear recurrence",description:"Stop a task recurring.",fields:{item:{name:"Task",description:"The task name or uid."},uid:{name:"Task uid",description:"The uid of the task."}}},set_start_date:{name:"Set start date",description:"Set or clear the start date of a task.",fields:{item:{name:"Task",description:"The task name or uid."},uid:{name:"Task uid",description:"The uid of the task."},start_date:{name:"Start date",description:"Leave empty to clear."}}},set_priority:{name:"Set priority",description:"Set the priority of a task (low, normal or high).",fields:{item:{name:"Task",description:"The task name or uid."},uid:{name:"Task uid",description:"The uid of the task."},priority:{name:"Priority",description:"low, normal or high."}}},delete_task:{name:"Delete task",description:"Delete a task by name or uid.",fields:{item:{name:"Task",description:"The task name or uid."},uid:{name:"Task uid",description:"The uid of the task."}}},update_task:{name:"Update task",description:"Update a task's name, description, due date or status (works on hidden future-start tasks too).",fields:{item:{name:"Task",description:"The task name or uid."},uid:{name:"Task uid",description:"The uid of the task."},summary:{name:"Name",description:"New task name."},description:{name:"Description",description:"New description."},due_date:{name:"Due date",description:"New due date."},status:{name:"Status",description:"needs_action or completed."},assignee:{name:"Assignee",description:"Person responsible (free text). Leave empty to clear."}}},set_assignee:{name:"Set assignee",description:"Set or clear who a task is assigned to.",fields:{item:{name:"Task",description:"The task name or uid."},uid:{name:"Task uid",description:"The uid of the task."},assignee:{name:"Assignee",description:"Person responsible (free text). Leave empty to clear."}}},clear_completed:{name:"Clear completed",description:"Remove all completed tasks from a list."}}};var Qt={card:{add_task:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",quick_add_placeholder:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443\u2026",new_task:"\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430",edit_task:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443",no_tasks:"\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u0434\u0430\u0447.",section_todo:"\u041A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E",section_scheduled:"\u0417\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u044B",section_completed:"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u044B",name:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",description:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",due_date:"\u0421\u0440\u043E\u043A",priority:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",assignee:"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C",unassigned:"\u041D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D",start_date:"\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 (\u0441\u043A\u0440\u044B\u0442\u0430 \u0434\u043E \u043D\u0435\u0451)",recurring:"\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u044E\u0449\u0430\u044F\u0441\u044F \u0437\u0430\u0434\u0430\u0447\u0430",every:"\u041A\u0430\u0436\u0434\u044B\u0435",unit:"\u0415\u0434\u0438\u043D\u0438\u0446\u0430",mode:"\u0420\u0435\u0436\u0438\u043C",hint:"\u041F\u043E \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044E: \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0435\u0442\u0441\u044F \u043F\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044E iCal RRULE \u043E\u0442 \u0434\u0430\u0442\u044B \u043D\u0430\u0447\u0430\u043B\u0430; \u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0435 \u043F\u0435\u0440\u0438\u043E\u0434\u044B \u043D\u0430\u043A\u0430\u043F\u043B\u0438\u0432\u0430\u044E\u0442\u0441\u044F. \u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F: \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043F\u043E\u0441\u043B\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u0432\u044B \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0442\u0435\u043A\u0443\u0449\u0443\u044E.",cancel:"\u041E\u0442\u043C\u0435\u043D\u0430",save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",saving:"\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u2026",delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",prio_low:"\u041D\u0438\u0437\u043A\u0438\u0439",prio_normal:"\u041E\u0431\u044B\u0447\u043D\u044B\u0439",prio_high:"\u0412\u044B\u0441\u043E\u043A\u0438\u0439",starts:"\u0441",rec_schedule:"\u043F\u043E \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044E",rec_after:"\u043F\u043E\u0441\u043B\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",mode_after_completion:"\u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",mode_fixed:"\u041F\u043E \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044E",freq_daily:"\u0434\u043D\u0438",freq_weekly:"\u043D\u0435\u0434\u0435\u043B\u0438",freq_monthly:"\u043C\u0435\u0441\u044F\u0446\u044B",freq_yearly:"\u0433\u043E\u0434\u044B",on:"\u0412",by_monthday:"\u0414\u0435\u043D\u044C \u043C\u0435\u0441\u044F\u0446\u0430",by_weekday:"\u0414\u0435\u043D\u044C \u043D\u0435\u0434\u0435\u043B\u0438",day:"\u0414\u0435\u043D\u044C",day_last:"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0434\u0435\u043D\u044C",which:"\u041F\u043E\u0437\u0438\u0446\u0438\u044F",weekday:"\u0414\u0435\u043D\u044C \u043D\u0435\u0434\u0435\u043B\u0438",month:"\u041C\u0435\u0441\u044F\u0446",pos_1:"\u041F\u0435\u0440\u0432\u044B\u0439",pos_2:"\u0412\u0442\u043E\u0440\u043E\u0439",pos_3:"\u0422\u0440\u0435\u0442\u0438\u0439",pos_4:"\u0427\u0435\u0442\u0432\u0451\u0440\u0442\u044B\u0439",pos_last:"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439",ends:"\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435",ends_never:"\u041D\u0438\u043A\u043E\u0433\u0434\u0430",ends_after:"\u041F\u043E\u0441\u043B\u0435",ends_on:"\u0412 \u0434\u0430\u0442\u0443",occurrences:"\u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0439",unit_days:"\u0434\u043D\u0438",unit_weeks:"\u043D\u0435\u0434\u0435\u043B\u0438",unit_months:"\u043C\u0435\u0441\u044F\u0446\u044B",confirm_delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \xAB%s\xBB?",clear_completed:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435",confirm_clear:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 (%s)?"},config:{step:{user:{title:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0434\u0435\u043B",description:"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u0434\u0435\u043B.",data:{name:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430"}}}},services:{create_task:{name:"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443",description:"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435 \u0434\u0435\u043B. \u041C\u043E\u0436\u043D\u043E \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u0442\u044C\u0441\u044F \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435\u043C \u0438 \u0441\u0440\u043E\u043A\u043E\u043C, \u043B\u0438\u0431\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u044C \xAB\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\xBB \u0434\u043B\u044F \u0434\u0430\u0442\u044B \u043D\u0430\u0447\u0430\u043B\u0430, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u0430 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F.",fields:{summary:{name:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",description:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438."},description:{name:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",description:"\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435."},due_date:{name:"\u0421\u0440\u043E\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",description:"\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0441\u0440\u043E\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F."},priority:{name:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",description:"\u0412\u044B\u0441\u043E\u043A\u0438\u0439 \u043F\u043E\u0434\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F \u0432\u0432\u0435\u0440\u0445, \u043D\u0438\u0437\u043A\u0438\u0439 \u2014 \u0432\u043D\u0438\u0437."},assignee:{name:"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C",description:"\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0437\u0430 \u0437\u0430\u0434\u0430\u0447\u0443 (\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442)."},start_date:{name:"\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430",description:"\u0417\u0430\u0434\u0430\u0447\u0430 \u0441\u043A\u0440\u044B\u0442\u0430 \u0434\u043E \u044D\u0442\u043E\u0439 \u0434\u0430\u0442\u044B; \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u044E\u0449\u0438\u0445\u0441\u044F \u0437\u0430\u0434\u0430\u0447 \u044D\u0442\u043E \u0442\u0430\u043A\u0436\u0435 \u0442\u043E\u0447\u043A\u0430 \u043E\u0442\u0441\u0447\u0451\u0442\u0430 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F."},interval:{name:"\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B",description:"\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0435\u0434\u0438\u043D\u0438\u0446 \u043C\u0435\u0436\u0434\u0443 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F\u043C\u0438."},unit:{name:"\u0415\u0434\u0438\u043D\u0438\u0446\u0430 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u0430",description:"\u0434\u043D\u0438, \u043D\u0435\u0434\u0435\u043B\u0438 \u0438\u043B\u0438 \u043C\u0435\u0441\u044F\u0446\u044B."},mode:{name:"\u0420\u0435\u0436\u0438\u043C \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",description:"\xABfixed\xBB (\u043F\u043E \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044E) \u0438\u043B\u0438 \xABafter_completion\xBB (\u043F\u043E\u0441\u043B\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F)."}},sections:{advanced:{name:"\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E",description:"\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430, \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435."}}},set_recurrence:{name:"\u0417\u0430\u0434\u0430\u0442\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435",description:"\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u0437\u0430\u0434\u0430\u0447\u0443 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u044E\u0449\u0435\u0439\u0441\u044F.",fields:{item:{name:"\u0417\u0430\u0434\u0430\u0447\u0430",description:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u043B\u0438 \u0435\u0451 uid."},uid:{name:"Uid \u0437\u0430\u0434\u0430\u0447\u0438",description:"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0434\u0430\u0447\u0438."},start_date:{name:"\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430",description:"\u0422\u043E\u0447\u043A\u0430 \u043E\u0442\u0441\u0447\u0451\u0442\u0430 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F."},interval:{name:"\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B",description:"\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0435\u0434\u0438\u043D\u0438\u0446 \u043C\u0435\u0436\u0434\u0443 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F\u043C\u0438."},unit:{name:"\u0415\u0434\u0438\u043D\u0438\u0446\u0430 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u0430",description:"\u0434\u043D\u0438, \u043D\u0435\u0434\u0435\u043B\u0438 \u0438\u043B\u0438 \u043C\u0435\u0441\u044F\u0446\u044B."},mode:{name:"\u0420\u0435\u0436\u0438\u043C \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F",description:"\xABfixed\xBB \u0438\u043B\u0438 \xABafter_completion\xBB."}}},clear_recurrence:{name:"\u0423\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435",description:"\u041F\u0440\u0435\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438.",fields:{item:{name:"\u0417\u0430\u0434\u0430\u0447\u0430",description:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u043B\u0438 \u0435\u0451 uid."},uid:{name:"Uid \u0437\u0430\u0434\u0430\u0447\u0438",description:"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0434\u0430\u0447\u0438."}}},set_start_date:{name:"\u0417\u0430\u0434\u0430\u0442\u044C \u0434\u0430\u0442\u0443 \u043D\u0430\u0447\u0430\u043B\u0430",description:"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0434\u0430\u0442\u0443 \u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0434\u0430\u0447\u0438.",fields:{item:{name:"\u0417\u0430\u0434\u0430\u0447\u0430",description:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u043B\u0438 \u0435\u0451 uid."},uid:{name:"Uid \u0437\u0430\u0434\u0430\u0447\u0438",description:"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0434\u0430\u0447\u0438."},start_date:{name:"\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430",description:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u0443\u0441\u0442\u044B\u043C, \u0447\u0442\u043E\u0431\u044B \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C."}}},set_priority:{name:"\u0417\u0430\u0434\u0430\u0442\u044C \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",description:"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0438 (\u043D\u0438\u0437\u043A\u0438\u0439, \u043E\u0431\u044B\u0447\u043D\u044B\u0439 \u0438\u043B\u0438 \u0432\u044B\u0441\u043E\u043A\u0438\u0439).",fields:{item:{name:"\u0417\u0430\u0434\u0430\u0447\u0430",description:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u043B\u0438 \u0435\u0451 uid."},uid:{name:"Uid \u0437\u0430\u0434\u0430\u0447\u0438",description:"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0434\u0430\u0447\u0438."},priority:{name:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",description:"\u043D\u0438\u0437\u043A\u0438\u0439, \u043E\u0431\u044B\u0447\u043D\u044B\u0439 \u0438\u043B\u0438 \u0432\u044B\u0441\u043E\u043A\u0438\u0439."}}},delete_task:{name:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443",description:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443 \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E \u0438\u043B\u0438 uid.",fields:{item:{name:"\u0417\u0430\u0434\u0430\u0447\u0430",description:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u043B\u0438 \u0435\u0451 uid."},uid:{name:"Uid \u0437\u0430\u0434\u0430\u0447\u0438",description:"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0434\u0430\u0447\u0438."}}},update_task:{name:"\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443",description:"\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435, \u0441\u0440\u043E\u043A \u0438\u043B\u0438 \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u0434\u0430\u0447\u0438 (\u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438 \u0441\u043E \u0441\u043A\u0440\u044B\u0442\u044B\u043C\u0438 \u0437\u0430\u0434\u0430\u0447\u0430\u043C\u0438 \u0441 \u0431\u0443\u0434\u0443\u0449\u0435\u0439 \u0434\u0430\u0442\u043E\u0439 \u043D\u0430\u0447\u0430\u043B\u0430).",fields:{item:{name:"\u0417\u0430\u0434\u0430\u0447\u0430",description:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u043B\u0438 \u0435\u0451 uid."},uid:{name:"Uid \u0437\u0430\u0434\u0430\u0447\u0438",description:"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0434\u0430\u0447\u0438."},summary:{name:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",description:"\u041D\u043E\u0432\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438."},description:{name:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",description:"\u041D\u043E\u0432\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435."},due_date:{name:"\u0421\u0440\u043E\u043A",description:"\u041D\u043E\u0432\u044B\u0439 \u0441\u0440\u043E\u043A."},status:{name:"\u0421\u0442\u0430\u0442\u0443\u0441",description:"needs_action \u0438\u043B\u0438 completed."},assignee:{name:"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C",description:"\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 (\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442). \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u0443\u0441\u0442\u044B\u043C, \u0447\u0442\u043E\u0431\u044B \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C."}}},set_assignee:{name:"\u0417\u0430\u0434\u0430\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F",description:"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0437\u0430 \u0437\u0430\u0434\u0430\u0447\u0443.",fields:{item:{name:"\u0417\u0430\u0434\u0430\u0447\u0430",description:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u043B\u0438 \u0435\u0451 uid."},uid:{name:"Uid \u0437\u0430\u0434\u0430\u0447\u0438",description:"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0434\u0430\u0447\u0438."},assignee:{name:"\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C",description:"\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 (\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442). \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u0443\u0441\u0442\u044B\u043C, \u0447\u0442\u043E\u0431\u044B \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C."}}},clear_completed:{name:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435",description:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430."}}};var be={en:Yt,ru:Qt};function ze(e,t){let o=t;for(let n of e.split(".")){if(typeof o=="string")throw new Error(`Key "${e}" is not valid for the given dictionary.`);o=o[n]}return o}var We=A(be.en);function y({token:e}){let t=F(We);return ze(e,t)}function Q(){let e=F(We);return t=>ze(t,e)}function Gt({children:e,language:t}){return r(We.Provider,{value:be[t]??be.en},e)}function ke(e){let t=K(e);return t.current!==e&&JSON.stringify(t.current)!==JSON.stringify(e)&&(t.current=e),t.current}var k=String.raw;function xe({variant:e="secondary",type:t="button",disabled:o,onClick:n,children:i}){return r("button",{class:"button",type:t,"data-variant":e==="secondary"?void 0:e,disabled:o,onClick:n},i)}b(k`
  .button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font: inherit;
    border: none;
    border-radius: 18px;
    padding: 8px 16px;
    cursor: pointer;
    background: none;
    color: var(--primary-color);
  }
  .button[data-variant='primary'] {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }
  .button[data-variant='danger'] {
    color: var(--error-color);
  }
  .button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`);function Ce({checked:e,onChange:t}){return r("input",{class:"checkbox",type:"checkbox",checked:e,onChange:o=>t(o.currentTarget.checked)})}b(k`
  .checkbox {
    width: 20px;
    height: 20px;
    margin-top: 2px;
    flex: none;
    cursor: pointer;
    accent-color: var(--primary-color);
  }
`);function Bo(e){let t=K(null);return Ue(()=>{let o=t.current;o&&(o.style.height="auto",o.style.height=`${o.scrollHeight}px`)},[e.value]),r("textarea",{...e,ref:t,rows:1})}function j(e){if(e.as==="textarea"){let{as:n,...i}=e;return r(Bo,{...i,class:"control control-autogrow"})}if(e.as==="select"){let{as:n,children:i,...a}=e;return r("select",{...a,class:"control"},i)}let{as:t,...o}=e;return r("input",{...o,class:"control"})}b(k`
  .control {
    font: inherit;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid var(--divider-color);
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .control-autogrow {
    resize: none;
    overflow: hidden;
  }
`);function G({label:e,children:t}){return r("label",{class:"field"},r("span",{class:"field-label"},e),t)}b(k`
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }
  .field-label {
    font-size: 0.78rem;
    color: var(--secondary-text-color);
  }
`);function se({label:e,value:t,onChange:o}){return r(G,{label:e},r(j,{as:"input",type:"date",value:t,onInput:n=>o(n.currentTarget.value)}))}function Zt({heading:e,onClose:t,children:o,footer:n}){return ae(()=>{let i=a=>{a.key==="Escape"&&t()};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[t]),r("div",{class:"dialog-overlay",onMouseDown:i=>{i.target===i.currentTarget&&t()}},r("div",{class:"dialog",role:"dialog","aria-modal":"true"},r("h3",{class:"dialog-heading"},e),r("div",{class:"dialog-body"},o),n&&r("div",{class:"dialog-footer"},n)))}b(k`
  .dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(0, 0, 0, 0.45);
  }
  .dialog {
    width: 100%;
    max-width: 420px;
    max-height: 90vh;
    overflow: auto;
    padding: 18px;
    border-radius: 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  }
  .dialog-heading {
    margin: 0 0 12px;
    font-weight: 500;
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }
`);function L({label:e,value:t,options:o,onChange:n}){return r(G,{label:e},r(j,{as:"select",value:t,onChange:i=>n(i.currentTarget.value)},o.map(i=>r("option",{key:i.value,value:i.value},i.label))))}function eo({label:e,value:t,onChange:o}){let n=ve(),i=[{value:"",label:r(y,{token:"card.unassigned"})},...n.map(a=>({value:a.id,label:a.name}))];return t&&!n.some(a=>a.id===t)&&i.push({value:t,label:t}),r(L,{label:e,value:t,options:i,onChange:o})}function W({children:e}){return r("div",{class:"row"},e)}b(k`
  .row {
    display: flex;
    gap: 10px;
  }
  .row > * {
    flex: 1;
    min-width: 0;
  }
`);function Z({label:e,value:t,onChange:o,type:n="text",multiline:i,placeholder:a,required:s,min:u,max:_,autofocus:c}){return r(G,{label:e},i?r(j,{as:"textarea",value:t,placeholder:a,onInput:d=>o(d.currentTarget.value)}):r(j,{as:"input",type:n,value:t,placeholder:a,required:s,min:u,max:_,autofocus:c,onInput:d=>o(d.currentTarget.value)}))}function zo(){return{mode:"after_completion",interval:1,unit:"months",freq:"weekly",weekdays:[],monthlyMode:"day",monthday:1,setpos:1,weekday:"MO",month:1,end:"never",count:10,until:""}}function to(e){let t=zo();if(!e)return t;if(e.mode==="after_completion")return{...t,mode:"after_completion",interval:e.interval,unit:e.unit};let o={...t,mode:"fixed",freq:e.freq,interval:e.interval};return e.freq==="weekly"?o.weekdays=e.byday??[]:(e.freq==="monthly"||e.freq==="yearly")&&(e.bysetpos!=null?(o.monthlyMode="weekday",o.setpos=e.bysetpos,o.weekday=e.byday?.[0]??"MO"):e.bymonthday!=null&&(o.monthlyMode="day",o.monthday=e.bymonthday)),e.freq==="yearly"&&e.bymonth!=null&&(o.month=e.bymonth),e.count!=null?(o.end="count",o.count=e.count):e.until&&(o.end="until",o.until=e.until),o}function Te(e){if(e.mode==="after_completion")return{mode:"after_completion",interval:Math.max(1,e.interval),unit:e.unit};let t={mode:"fixed",freq:e.freq,interval:Math.max(1,e.interval),byday:null,bymonthday:null,bysetpos:null,bymonth:null,count:null,until:null};return e.freq==="weekly"?t.byday=e.weekdays.length?[...e.weekdays]:null:(e.freq==="monthly"||e.freq==="yearly")&&(e.monthlyMode==="weekday"?(t.byday=[e.weekday],t.bysetpos=e.setpos):t.bymonthday=e.monthday,e.freq==="yearly"&&(t.bymonth=e.month)),e.end==="count"?t.count=Math.max(1,e.count):e.end==="until"&&e.until&&(t.until=e.until),t}function $e(e){if(e.mode==="after_completion")return{mode:"after_completion",interval:e.interval,unit:e.unit};let t={mode:"fixed",freq:e.freq,interval:e.interval};return e.byday&&e.byday.length&&(t.byday=e.byday),e.bymonthday!=null&&(t.bymonthday=e.bymonthday),e.bysetpos!=null&&(t.bysetpos=e.bysetpos),e.bymonth!=null&&(t.bymonth=e.bymonth),e.count!=null&&(t.count=e.count),e.until&&(t.until=e.until),t}function oo({value:e,onPatch:t}){let{language:o}=he(),n=o==="system"?void 0:o,i=q(()=>{let m=new Intl.DateTimeFormat(n,{weekday:"short"});return Y.map((p,v)=>m.format(new Date(2024,0,1+v)))},[n]),a=q(()=>{let m=new Intl.DateTimeFormat(n,{weekday:"long"});return Y.map((p,v)=>m.format(new Date(2024,0,1+v)))},[n]),s=q(()=>{let m=new Intl.DateTimeFormat(n,{month:"long"});return Array.from({length:12},(p,v)=>m.format(new Date(2024,v,1)))},[n]),u=dt.map(m=>({value:m,label:r(y,{token:`card.mode_${m}`})})),_=ct.map(m=>({value:m,label:r(y,{token:`card.unit_${m}`})})),c=ut.map(m=>({value:m,label:r(y,{token:`card.freq_${m}`})})),d=[{value:"day",label:r(y,{token:"card.by_monthday"})},{value:"weekday",label:r(y,{token:"card.by_weekday"})}],g=[{value:"1",label:r(y,{token:"card.pos_1"})},{value:"2",label:r(y,{token:"card.pos_2"})},{value:"3",label:r(y,{token:"card.pos_3"})},{value:"4",label:r(y,{token:"card.pos_4"})},{value:"-1",label:r(y,{token:"card.pos_last"})}],l=Y.map((m,p)=>({value:m,label:a[p]})),f=s.map((m,p)=>({value:String(p+1),label:m})),C=[...Array.from({length:31},(m,p)=>({value:String(p+1),label:String(p+1)})),{value:"-1",label:r(y,{token:"card.day_last"})}],D=[{value:"never",label:r(y,{token:"card.ends_never"})},{value:"count",label:r(y,{token:"card.ends_after"})},{value:"until",label:r(y,{token:"card.ends_on"})}],T=m=>{let p=new Set(e.weekdays);p.has(m)?p.delete(m):p.add(m),t({weekdays:Y.filter(v=>p.has(v))})},x=r(Z,{label:r(y,{token:"card.every"}),type:"number",min:1,max:999,value:String(e.interval),onChange:m=>t({interval:parseInt(m,10)||1})});return r("div",{class:"recurrence"},r(L,{label:r(y,{token:"card.mode"}),value:e.mode,options:u,onChange:m=>t({mode:m})}),e.mode==="after_completion"?r(W,null,x,r(L,{label:r(y,{token:"card.unit"}),value:e.unit,options:_,onChange:m=>t({unit:m})})):r(R,null,r(W,null,x,r(L,{label:r(y,{token:"card.unit"}),value:e.freq,options:c,onChange:m=>t({freq:m})})),e.freq==="weekly"&&r("div",{class:"weekday-row",role:"group"},Y.map((m,p)=>r("button",{type:"button",key:m,class:"weekday","data-selected":e.weekdays.includes(m)||void 0,"aria-pressed":e.weekdays.includes(m),onClick:()=>T(m)},i[p]))),(e.freq==="monthly"||e.freq==="yearly")&&r(R,null,e.freq==="yearly"&&r(L,{label:r(y,{token:"card.month"}),value:String(e.month),options:f,onChange:m=>t({month:parseInt(m,10)})}),r(L,{label:r(y,{token:"card.on"}),value:e.monthlyMode,options:d,onChange:m=>t({monthlyMode:m})}),e.monthlyMode==="day"?r(L,{label:r(y,{token:"card.day"}),value:String(e.monthday),options:C,onChange:m=>t({monthday:parseInt(m,10)})}):r(W,null,r(L,{label:r(y,{token:"card.which"}),value:String(e.setpos),options:g,onChange:m=>t({setpos:parseInt(m,10)})}),r(L,{label:r(y,{token:"card.weekday"}),value:e.weekday,options:l,onChange:m=>t({weekday:m})}))),r(W,null,r(L,{label:r(y,{token:"card.ends"}),value:e.end,options:D,onChange:m=>t({end:m})}),e.end==="count"&&r(Z,{label:r(y,{token:"card.occurrences"}),type:"number",min:1,max:9999,value:String(e.count),onChange:m=>t({count:parseInt(m,10)||1})}),e.end==="until"&&r(se,{label:r(y,{token:"card.ends_on"}),value:e.until,onChange:m=>t({until:m})}))),r("p",{class:"recurrence-hint"},r(y,{token:"card.hint"})))}b(k`
  .recurrence {
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 12px;
  }
  .recurrence-hint {
    margin: 0;
    font-size: 0.74rem;
    color: var(--secondary-text-color);
  }
  .weekday-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }
  .weekday {
    min-width: 34px;
    padding: 6px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 16px;
    background: none;
    color: var(--primary-text-color);
    cursor: pointer;
    font: inherit;
    font-size: 0.82rem;
  }
  .weekday[data-selected] {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
`);function Ve(e){return{summary:e?.summary??"",description:e?.description??"",due:e?.due??"",start:e?.start??"",priority:e?.priority??"normal",assignee:e?.assignee??"",recurring:e?.recurrence!=null,recurrence:to(e?.recurrence)}}function no({task:e,onSubmit:t,onClose:o,onDelete:n}){let[i,a]=N(()=>Ve(e)),s=d=>a(g=>({...g,...d})),u=e!=null,_=i.summary.trim().length>0,c=pt.map(d=>({value:d,label:r(y,{token:`card.prio_${d}`})}));return r(Zt,{heading:r(y,{token:u?"card.edit_task":"card.new_task"}),onClose:o,footer:r(R,null,u&&n&&r(xe,{variant:"danger",onClick:n},r(y,{token:"card.delete"})),r(xe,{onClick:o},r(y,{token:"card.cancel"})),r(xe,{variant:"primary",disabled:!_,onClick:()=>t(i)},r(y,{token:"card.save"})))},r(Z,{label:r(y,{token:"card.name"}),value:i.summary,onChange:d=>s({summary:d}),required:!0,autofocus:!0}),r(Z,{label:r(y,{token:"card.description"}),value:i.description,onChange:d=>s({description:d}),multiline:!0}),r(W,null,r(L,{label:r(y,{token:"card.priority"}),value:i.priority,options:c,onChange:d=>s({priority:d})}),r(eo,{label:r(y,{token:"card.assignee"}),value:i.assignee,onChange:d=>s({assignee:d})})),r(W,null,r(se,{label:r(y,{token:"card.start_date"}),value:i.start,onChange:d=>s({start:d})}),r(se,{label:r(y,{token:"card.due_date"}),value:i.due,onChange:d=>s({due:d})})),r("label",{class:"recurrence-toggle"},r(Ce,{checked:i.recurring,onChange:d=>s({recurring:d})}),r(y,{token:"card.recurring"})),i.recurring&&r(oo,{value:i.recurrence,onPatch:d=>s({recurrence:{...i.recurrence,...d}})}))}b(k`
  .recurrence-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 0.9rem;
  }
`);function U({name:e,size:t}){let o=q(()=>t?{"--mdc-icon-size":`${t}px`}:void 0,[t]);return r("ha-icon",{icon:`mdi:${e}`,style:o})}var Wo={add_task:{label:"card.add_task",icon:"plus"},clear_completed:{label:"card.clear_completed",icon:"broom"}},$o={small:15,medium:18,large:22};function we({buttons:e,onAction:t,align:o,size:n="medium"}){let i=Q();return r("div",{class:"action-buttons","data-align":o},e.map((a,s)=>{let u=Wo[a.action],_=a.text===void 0?i(u.label):a.text||null,c=a.icon===void 0?u.icon:a.icon||null,d=a.size??n;return r("button",{key:s,class:"action-button","data-variant":a.variant,"data-size":d,onClick:()=>t(a.action),"aria-label":_?void 0:i(u.label)},c&&r(U,{name:c,size:$o[d]}),_&&r("span",null,_))}))}b(k`
  .action-buttons {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .action-buttons[data-align] {
    display: flex;
  }
  .action-buttons[data-align='left'] {
    justify-content: flex-start;
  }
  .action-buttons[data-align='right'] {
    justify-content: flex-end;
  }
  .action-buttons[data-align='center'] {
    justify-content: center;
  }
  .action-buttons[data-align='space_around'] {
    justify-content: space-around;
  }
  .action-buttons[data-align='space_between'] {
    justify-content: space-between;
  }
  .action-button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    /* Default (primary) fill; variants below map to the primary/accent family. */
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border: none;
    border-radius: 18px;
    padding: 6px 14px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .action-button[data-variant='dark'] {
    background: var(--dark-primary-color, var(--primary-color));
  }
  .action-button[data-variant='darker'] {
    background: var(--darker-primary-color, var(--primary-color));
  }
  .action-button[data-variant='light'] {
    background: var(--light-primary-color, var(--primary-color));
  }
  .action-button[data-variant='accent'] {
    background: var(--accent-color, var(--primary-color));
  }
  .action-button[data-variant='subtle'] {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    color: var(--primary-color);
  }
  .action-button[data-variant='subtle']:hover {
    background: color-mix(in srgb, var(--primary-color) 22%, transparent);
  }
  .action-button[data-size='small'] {
    gap: 3px;
    padding: 3px 10px;
    border-radius: 14px;
    font-size: 0.78rem;
  }
  .action-button[data-size='large'] {
    gap: 6px;
    padding: 8px 18px;
    border-radius: 22px;
    font-size: 1rem;
  }
`);function ro(){return r("hr",{class:"divider"})}b(k`
  .divider {
    margin: 8px 0;
    border: none;
    /* Full width, and heavier than the hairline between tasks. */
    border-top: 1px solid var(--secondary-text-color);
  }
`);function io({children:e}){return r("div",{class:"header"},e)}b(k`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 8px;
    gap: 8px;
  }
  .header h2 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }
`);function ao({height:e=12}){return r("div",{style:{height:`${e}px`}})}function lo(){let e=new Date,t=o=>String(o).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`}var so=new Map;function Vo(e){let t=e==="system"?"":e,o=so.get(t);return o||(o=new Intl.DateTimeFormat(t||void 0,{day:"numeric",month:"short"}),so.set(t,o)),o}function Ke(e,t){try{return Vo(t.language).format(new Date(`${e}T00:00:00`))}catch{return e}}function co(e){return e.slice().sort((t,o)=>{let n=t.status==="completed",i=o.status==="completed";if(n!==i)return n?1:-1;let a=Ae[t.priority]-Ae[o.priority];if(a)return a;let s=t.due??"9999",u=o.due??"9999";return s!==u?s<u?-1:1:t.summary.localeCompare(o.summary)})}function uo({onAdd:e,placeholder:t}){let[o,n]=N(""),i=Q(),a=()=>{let s=o.trim();s&&(e(s),n(""))};return r("form",{class:"quick-add",onSubmit:s=>{s.preventDefault(),a()}},r("input",{class:"quick-add-input",type:"text",enterKeyHint:"done",value:o,placeholder:t??i("card.quick_add_placeholder"),onInput:s=>n(s.currentTarget.value)}),r("button",{type:"submit",class:"quick-add-button","aria-label":i("card.add_task")},r(U,{name:"plus",size:20})))}b(k`
  .quick-add {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
  }
  .quick-add-input {
    flex: 1;
    min-width: 0;
    font: inherit;
    padding: 6px 0;
    border: none;
    border-bottom: 1px solid var(--divider-color);
    background: none;
    color: var(--primary-text-color);
  }
  .quick-add-input:focus {
    outline: none;
    border-bottom-color: var(--primary-color);
  }
  .quick-add-input::placeholder {
    color: var(--secondary-text-color);
  }
  .quick-add-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 4px;
    border: none;
    border-radius: 50%;
    background: none;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
  .quick-add-button:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
`);function J({overdue:e,pending:t,priority:o,children:n}){return r("span",{class:"badge","data-overdue":e?"":void 0,"data-pending":t?"":void 0,"data-priority":o},n)}b(k`
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    padding: 2px 7px;
    border-radius: 10px;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
    white-space: nowrap;
  }
  .badge[data-overdue],
  .badge[data-priority='high'] {
    background: var(--error-color);
    color: var(--text-primary-color, #fff);
  }
  .badge[data-pending] {
    opacity: 0.8;
    font-style: italic;
  }
  .badge[data-priority='low'] {
    opacity: 0.75;
  }
`);function po({task:e,today:t,onToggle:o,onEdit:n}){let i=e.status==="completed",a=!i&&e.start!=null&&e.start>t,s=!i&&e.due!=null&&e.due<t,u=ve(),_=he(),c=Q(),d=e.priority!=="normal"||a||e.due!=null||e.recurrence!=null||e.assignee!=null;return r("li",{class:"todo-list-item","data-completed":i?"":void 0,"data-pending":a?"":void 0},r(Ce,{checked:i,onChange:g=>o?.(g)}),r("div",{class:"content"},r("div",{class:"summary"},e.summary),e.description&&r("div",{class:"description"},e.description),d&&r("div",{class:"badges"},e.priority==="high"&&r(J,{priority:"high"},r(y,{token:"card.prio_high"})),e.priority==="low"&&r(J,{priority:"low"},r(y,{token:"card.prio_low"})),a&&e.start&&r(J,{pending:!0},r(U,{name:"calendar-clock",size:14})," ",r(y,{token:"card.starts"})," ",Ke(e.start,_)),e.due&&r(J,{overdue:s},r(U,{name:"calendar",size:14})," ",Ke(e.due,_)),e.recurrence&&r(J,null,r(U,{name:"repeat",size:14})),e.assignee&&r(J,null,r(U,{name:"account",size:14})," ",Kt(u,e.assignee)))),n&&r("div",{class:"actions"},r("button",{class:"todo-list-item-action","aria-label":c("card.edit_task"),onClick:n},r(U,{name:"pencil",size:20}))))}b(k`
  .todo-list-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 12px;
    border-top: 1px solid var(--divider-color);
  }
  .todo-list-item:first-child {
    border-top: none;
  }
  .todo-list-item[data-pending] {
    opacity: 0.6;
  }
  .todo-list-item .content {
    flex: 1;
    min-width: 0;
  }
  .todo-list-item .summary {
    color: var(--primary-text-color);
    font-size: 0.98rem;
    word-break: break-word;
  }
  .todo-list-item[data-completed] .summary {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }
  .todo-list-item .description {
    color: var(--secondary-text-color);
    font-size: 0.82rem;
    margin-top: 2px;
    word-break: break-word;
  }
  .todo-list-item .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 5px;
  }
  .todo-list-item .actions {
    flex: none;
  }
  .todo-list-item-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 4px;
    border: none;
    border-radius: 50%;
    background: none;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
  .todo-list-item-action:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
`);var Ko={todo:"card.section_todo",scheduled:"card.section_scheduled",completed:"card.section_completed"},jo=new Set;function Jo(e,t,o){return e.status==="completed"?o.has(e.uid)?"todo":"completed":e.start!=null&&e.start>t||e.due!=null&&e.due>t?"scheduled":"todo"}function mo({tasks:e,layout:t,title:o,lingering:n=jo,onEdit:i,onToggle:a,onAdd:s,onAddTask:u,onClearCompleted:_}){let c=lo(),d=e.some(p=>p.status==="completed"),g=Me(p=>{p==="add_task"?u?.():_?.()},[u,_]),l=p=>p.filter(v=>v.action!=="clear_completed"||v.persist||d),f=(p,v,S,I)=>{let ee=co(e.filter(E=>Jo(E,c,n)===p));if(ee.length===0)return null;let H=S===void 0?r(y,{token:Ko[p]}):S||null,$=l(I??[]);return r("section",{key:v,class:"todo-list-section"},(H||$.length>0)&&r("div",{class:"todo-list-section-header"},H?r("h3",{class:"todo-list-section-title"},H):r("span",null),$.length>0&&r(we,{buttons:$,onAction:g,size:"small"})),r("ul",{class:"todo-list"},ee.map(E=>r(po,{key:E.uid,task:E,today:c,onEdit:i?()=>i(E.uid):void 0,onToggle:a?B=>a(E.uid,B):void 0}))))},C=t.map((p,v)=>{switch(p.type){case"header":{let S=p.title===void 0?o:p.title,I=l(p.buttons??[]);return r(io,{key:v},S?r("h2",null,S):r("span",null),I.length>0&&r(we,{buttons:I,onAction:g}))}case"buttons":{let S=l(p.buttons);return S.length===0?null:r("div",{key:v,class:"layout-buttons"},r(we,{buttons:S,onAction:g,align:p.align??"left"}))}case"empty":return e.length===0?r("div",{key:v,class:"todo-list-empty"},p.text??r(y,{token:"card.no_tasks"})):null;case"divider":return r(ro,{key:v});case"spacer":return r(ao,{key:v,height:p.height});case"quick_add":return s?r(uo,{key:v,onAdd:s,placeholder:p.placeholder}):null;default:return f(p.type,v,p.title,p.buttons)}}),D=p=>p.type==="divider"||p.type==="spacer",T=p=>D(p)&&"persist"in p&&p.persist,x=t.map((p,v)=>D(p)?T(p):C[v]!==null),m=C.map((p,v)=>{let S=t[v];return D(S)&&!T(S)&&!(x.slice(0,v).some(Boolean)&&x.slice(v+1).some(Boolean))?null:p});return r(R,null,m)}b(k`
  .todo-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .todo-list-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 12px 12px 2px;
  }
  .todo-list-section-title {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--secondary-text-color);
  }
  .todo-list-empty {
    padding: 16px 12px;
    color: var(--secondary-text-color);
    text-align: center;
  }
  .layout-buttons {
    padding: 4px 12px;
  }
`);function Xo(e,t){let o=n=>n===null?"null":JSON.stringify(Object.keys(n).sort().map(i=>[i,n[i]]));return o(e)===o(t)}var _o=0;function Yo(){return _o+=1,`optimistic-${_o}`}function fo(e,t,o){return{uid:t,summary:e.summary,description:e.description||null,status:o,due:e.due||null,start:e.start||null,priority:e.priority,assignee:e.assignee||null,recurrence:e.recurring?Te(e.recurrence):null}}async function Qo(e,t){let o={summary:t.summary,priority:t.priority};t.description&&(o.description=t.description),t.due&&(o.due_date=t.due),t.start&&(o.start_date=t.start),t.assignee&&(o.assignee=t.assignee),t.recurring&&Object.assign(o,$e(Te(t.recurrence))),await e("create_task",o)}async function Go(e,t,o,n){let i={uid:t,summary:o.summary,description:o.description,assignee:o.assignee};o.due&&(i.due_date=o.due),await e("update_task",i),(n?.priority??"normal")!==o.priority&&await e("set_priority",{uid:t,priority:o.priority});let a=n?.recurrence??null,s=o.recurring?Te(o.recurrence):null,u=(n?.start??"")!==o.start;if(s){if(u||!Xo(a,s)){let _={uid:t,...$e(s)};o.start&&(_.start_date=o.start),await e("set_recurrence",_)}}else a&&await e("clear_recurrence",{uid:t}),u&&await e("set_start_date",o.start?{uid:t,start_date:o.start}:{uid:t})}function yo(e){let t=Xt(),[o,n]=N(null);return ae(()=>n(null),[e]),{tasks:o??e,addTask:async c=>{let d=fo(c,Yo(),"needs_action");n(g=>[...g??e,d]);try{await Qo(t,c)}catch(g){throw n(null),g}},updateTask:async(c,d)=>{let g=e.find(l=>l.uid===c);n(l=>(l??e).map(f=>f.uid===c?fo(d,c,f.status):f));try{await Go(t,c,d,g)}catch(l){throw n(null),l}},toggleTask:async(c,d)=>{let g=d?"completed":"needs_action";n(l=>(l??e).map(f=>f.uid===c?{...f,status:g}:f));try{await t("update_task",{uid:c,status:g})}catch(l){throw n(null),l}},deleteTask:async c=>{n(d=>(d??e).filter(g=>g.uid!==c));try{await t("delete_task",{uid:c})}catch(d){throw n(null),d}},clearCompleted:async()=>{n(c=>(c??e).filter(d=>d.status!=="completed"));try{await t("clear_completed",{})}catch(c){throw n(null),c}}}}function go({title:e,layout:t,tasks:o}){let{tasks:n,addTask:i,updateTask:a,toggleTask:s,deleteTask:u,clearCompleted:_}=yo(o),[c,d]=N(null),[g,l]=N(()=>new Set),f=K(null),C=t.find(p=>p.type==="todo"),T=(C?.type==="todo"?C.linger_completed!==!1:!0)&&!t.some(p=>p.type==="completed"),x=p=>{let v=`Todo Plus: ${p instanceof Error?p.message:String(p)}`;f.current?.dispatchEvent(new CustomEvent("hass-notification",{bubbles:!0,composed:!0,detail:{message:v}}))};return r("ha-card",{ref:f},r(mo,{tasks:n,layout:t,title:e,lingering:g,onEdit:d,onToggle:(p,v)=>{T&&l(S=>{let I=new Set(S);return v?I.add(p):I.delete(p),I}),s(p,v).catch(x)},onAdd:p=>i({...Ve(),summary:p}).catch(x),onAddTask:()=>d("new"),onClearCompleted:()=>_().catch(x)}),c!==null&&r(no,{task:c==="new"?void 0:n.find(p=>p.uid===c),onClose:()=>d(null),onSubmit:p=>{let v=c==="new"?i(p):a(c,p);d(null),v.catch(x)},onDelete:c==="new"?void 0:()=>{let p=u(c);d(null),p.catch(x)}}))}b(k`
  ha-card {
    padding: 12px 4px 8px;
    user-select: text;
  }
`);function ho(e){let t=ke(e.tasks),o=ke(e.persons),n=ke(e.locale);return r(Zo,{...e,tasks:t,persons:o,locale:n})}var Zo=Nt(function({title:t,layout:o,tasks:n,persons:i,locale:a,callService:s}){return r(Bt,null,r(Gt,{language:a.language},r(Wt,{locale:a},r(Vt,{persons:i},r(Jt,{call:s},r(go,{title:t,layout:o,tasks:n}))))))});var vo="person.";function en(e){return Object.keys(e.states).filter(t=>t.startsWith(vo)).map(t=>({id:t,name:e.states[t].attributes.friendly_name??t.slice(vo.length)})).sort((t,o)=>t.name.localeCompare(o.name))}var je=class extends HTMLElement{constructor(){super(...arguments);this.callService=(o,n={})=>!this._hass||!this._config?Promise.resolve():this._hass.callService("todo_plus",o,{entity_id:this._config.entity,...n}).then(()=>{})}set hass(o){this._hass=o,this.render()}setConfig(o){this._config=o,this.render()}connectedCallback(){this.render()}render(){if(!this._config||!this._hass)return;this._root||(this.shadowRoot?this._root=this.shadowRoot:this._root=this.attachShadow({mode:"open"}));let{entity:o,layout:n,title:i}=this._config;fe(r(ho,{title:i??this._hass.states[o].attributes.friendly_name??"TODO",layout:n??mt,tasks:this._hass.states[o].attributes.tasks??[],persons:en(this._hass),locale:this._hass.locale??{language:"en"},callService:this.callService}),this._root)}disconnectedCallback(){this._root&&(fe(null,this._root),this._root=void 0)}};_t("todo-plus-card",je);ft({type:"todo-plus-card",name:"Todo Plus Card",description:"Manage to-do tasks with start date, priority and recurrence."});console.info("%c todo-plus-card %c loaded ","background:#03a9f4;color:#fff","");
