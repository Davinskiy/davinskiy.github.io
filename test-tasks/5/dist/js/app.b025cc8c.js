(function(e){function t(t){for(var r,a,u=t[0],c=t[1],l=t[2],s=0,d=[];s<u.length;s++)a=u[s],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function u(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d215fa4":"13df1b9c","chunk-775735bc":"f930648a","chunk-2b559f8b":"fcae8457","chunk-4556d1bc":"24b5fa9f"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-775735bc":1,"chunk-4556d1bc":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d215fa4":"31d6cfe0","chunk-775735bc":"abd883af","chunk-2b559f8b":"31d6cfe0","chunk-4556d1bc":"724edbb7"}[e]+".css",o=c.p+r,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var l=i[u],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===r||s===o))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){l=d[u],s=l.getAttribute("data-href");if(s===r||s===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],f.parentNode.removeChild(f),n(i)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=u(e);var d=new Error;l=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire"}},[n("main-header",{attrs:{menu:e.getMenu}}),n("drawer",{attrs:{menu:e.getMenu}}),n("v-main",[n("router-view")],1),n("main-footer")],1)},o=[],i=(n("4de4"),n("5530")),u=n("2f62"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app-bar",{attrs:{app:"","clipped-right":"",color:"orange",dark:""}},[n("v-app-bar-nav-icon",{staticClass:"d-block  d-sm-none",on:{click:function(t){return t.stopPropagation(),e.drawerToggle(t)}}}),n("v-spacer"),n("v-toolbar-items",{staticClass:"d-none d-sm-flex"},e._l(e.menu,(function(t,r){return n("v-btn",{key:r,attrs:{to:t.url,text:""}},[n("v-icon",{staticClass:"mr-3"},[e._v(e._s(t.icon))]),e._v(" "+e._s(t.title)+" ")],1)})),1)],1)},l=[],s={name:"Header",props:{menu:{type:Array,default:function(){return[]}}},methods:{drawerToggle:function(){this.$root.$emit("drawer-toggle")}}},d=s,f=n("2877"),p=n("6544"),h=n.n(p),m=n("40dc"),v=n("5bc1"),g=n("8336"),b=n("132d"),y=n("2fa4"),w=n("2a7f"),_=Object(f["a"])(d,c,l,!1,null,null,null),k=_.exports;h()(_,{VAppBar:m["a"],VAppBarNavIcon:v["a"],VBtn:g["a"],VIcon:b["a"],VSpacer:y["a"],VToolbarItems:w["a"]});var A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-navigation-drawer",{attrs:{app:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",{attrs:{dense:""}},e._l(e.menu,(function(t,r){return n("v-list-item",{key:r,attrs:{to:t.url}},[n("v-list-item-action",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.title))])],1)],1)})),1)],1)},j=[],O={name:"Drawer",props:{menu:{type:Array,default:function(){return[]}}},data:function(){return{drawer:null}},mounted:function(){var e=this;this.$root.$on("drawer-toggle",(function(){e.drawer=!e.drawer}))}},x=O,E=n("8860"),V=n("da13"),S=n("1800"),L=n("5d23"),P=n("f774"),C=Object(f["a"])(x,A,j,!1,null,null,null),I=C.exports;h()(C,{VIcon:b["a"],VList:E["a"],VListItem:V["a"],VListItemAction:S["a"],VListItemContent:L["a"],VListItemTitle:L["b"],VNavigationDrawer:P["a"]});var T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-footer",{staticClass:"white--text  text-center",attrs:{app:"",color:"orange"}},[n("v-spacer"),n("span",[e._v(" © "+e._s(e.getWorkingYear)+" ")]),n("v-spacer")],1)},M=[],$={name:"Footer",computed:{getWorkingYear:function(){var e=2020,t=(new Date).getFullYear();return e>=t?e:"".concat(e,"-").concat(t)}}},N=$,R=n("553a"),D=Object(f["a"])(N,T,M,!1,null,null,null),B=D.exports;h()(D,{VFooter:R["a"],VSpacer:y["a"]});var H={name:"App",components:{MainHeader:k,Drawer:I,MainFooter:B},data:function(){return{menu:[{url:"/auth",icon:"mdi-login",title:"Авторизация",rule:"not-authed"},{url:"/analytics",icon:"mdi-google-analytics",title:"Аналитика",rule:"authed"},{url:"/logout",icon:"mdi-logout",title:"Выйти",rule:"authed"}]}},computed:Object(i["a"])(Object(i["a"])({},Object(u["b"])(["isAuthenticated"])),{},{getMenu:function(){return this.isAuthenticated?this.menu.filter((function(e){return"authed"===e.rule})):this.menu.filter((function(e){return"not-authed"===e.rule}))}})},F=H,Y=n("7496"),U=n("f6c4"),q=Object(f["a"])(F,a,o,!1,null,null,null),J=q.exports;h()(q,{VApp:Y["a"],VMain:U["a"]});var K=n("f309");r["a"].use(K["a"]);var W=new K["a"]({}),z=(n("96cf"),n("1da1")),G=(n("d3b7"),n("bc3a")),Z=n.n(G),Q=Z.a.create({baseURL:"https://track-api.leadhit.io/",headers:{Accept:"application/json","Api-Key":"5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo"}});Q.interceptors.response.use((function(e){return e}),(function(e){return 401===e.response.status&&re.getters.get_token&&re.commit("logout"),Promise.reject(e)}));var X=Q,ee={auth:function(e){return X.get("client/test_auth",{headers:{"Leadhit-Site-Id":e}})}},te={state:function(){return{leadhit_site_id:localStorage.getItem("leadhit-site-id")||""}},mutations:{login:function(e,t){e.leadhit_site_id=t,localStorage.setItem("leadhit-site-id",t)},logout:function(e){localStorage.removeItem("leadhit-site-id"),e.leadhit_site_id=""}},getters:{isAuthenticated:function(e){return!!e.leadhit_site_id}},actions:{AUTH:function(e,t){return Object(z["a"])(regeneratorRuntime.mark((function n(){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,ee.auth(t);case 3:a=n.sent,o=a.data,"ok"===o.message&&r("login",t);case 6:case"end":return n.stop()}}),n)})))()}}};r["a"].use(u["a"]);var ne=new u["a"].Store({modules:{auth:te},mutations:{HANDLE_ERROR:function(e,t){console.log(t)}},getters:{app:function(e){return e.app}}}),re=ne,ae=n("8c4f");n("b0c0");function oe(e,t,n){re.getters.isAuthenticated?n({name:"home"}):"auth"!==e.name?n({name:"auth"}):n()}function ie(e,t,n){re.getters.isAuthenticated?n():n({name:"auth"})}r["a"].use(ae["a"]);var ue=new ae["a"]({routes:[{path:"/",name:"home",redirect:"analytics"},{path:"/auth",name:"auth",component:function(){return Promise.all([n.e("chunk-775735bc"),n.e("chunk-4556d1bc")]).then(n.bind(null,"2fef"))},beforeEnter:oe},{path:"/analytics",name:"analytics",component:function(){return Promise.all([n.e("chunk-775735bc"),n.e("chunk-2b559f8b")]).then(n.bind(null,"41f2"))},beforeEnter:ie},{path:"/logout",name:"logout",component:function(){return n.e("chunk-2d215fa4").then(n.bind(null,"c100"))}}]});r["a"].config.productionTip=!1,new r["a"]({vuetify:W,router:ue,store:re,render:function(e){return e(J)}}).$mount("#app")}});
//# sourceMappingURL=app.b025cc8c.js.map