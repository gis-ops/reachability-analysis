(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{304:function(e,t,n){e.exports=n(488)},481:function(e,t,n){},488:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(56);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(58),s=n(268),l=n(33),c=n(270),d=(n(313),n(299)),u=n(16),p=n(32),h=function e(){Object(p.a)(this,e),this.userInput="",this.geocodeResults=[],this.isochrones={receivedAt:null,results:[]},this.isFetching=!1,this.isFetchingIsochrones=!1,this.settings={range:{min:1,max:500,step:1,value:60},interval:{min:1,max:60,step:1,value:10},mode:"car",rangetype:"distance"}},m=function(e){return{type:"ZOOM_TO_ISOCHRONES",receivedAt:Date.now(),controlIndex:e}},g=function(e){return{type:"ZOOM_TO_POINT",receivedAt:Date.now(),latLng:e}},v=function(e,t){return function(n){var a=(new DOMParser).parseFromString(e,"application/xml");"InvalidCredentials"==a.getElementsByTagName("ns2:Error")[0].getAttribute("subtype")&&n(j({handlerCode:"INVALID_CREDENTIALS",handlerMessage:a.getElementsByTagName("Details")[0].innerHTML})),n(E(t,[]))}},f=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return function(r){var o=function(e,t){if(e.Response&&e.Response.View.length>0){var n=[],a=!0,r=!1,o=void 0;try{for(var i,s=e.Response.View[0].Result[Symbol.iterator]();!(a=(i=s.next()).done);a=!0){var l=i.value;l.Location&&"point"===l.Location.LocationType&&n.push({title:l.Location.Address.Label,description:l.Location.Address.PostalCode,displayposition:{lat:t?t.lat:l.Location.DisplayPosition.Latitude,lng:t?t.lng:l.Location.DisplayPosition.Longitude},selected:!1})}}catch(c){r=!0,o=c}finally{try{a||null==s.return||s.return()}finally{if(r)throw o}}return n}return[{title:"",description:"",displayposition:{lat:t.lat,lng:t.lng},selected:!1}]}(e,n);0==o[0].title.length&&r(j({handlerCode:"NO_GEOCODE_RESULTS"})),r(E(t,o,a)),a&&r(x(t,o))}},E=function(e,t,n){return{type:"RECEIVE_GEOCODE_RESULTS",controlIndex:e,results:t,receivedAt:Date.now(),reverse:n}},y=function(e,t){return{type:"RECEIVE_ISOCHRONES_RESULTS",controlIndex:e,results:t,receivedAt:Date.now(),reverse:!1}},x=function(e,t){return function(n){t[0]&&(n(_({controlIndex:e,inputValue:t[0]?t[0].title:""})),n(R({controlIndex:e,inputValue:t[0]?t[0].title:""})))}},b=function(e){var t=e.headers.get("content-type");if(t.includes("application/json"))return C(e);if(t.includes("application/xml;charset=utf-8"))return O(e);throw new Error("Sorry, content-type ".concat(t," not supported"))},C=function(e){return e.json().then(function(t){return e.ok?t:Promise.reject(Object.assign({},t,{status:e.status,statusText:e.statusText,err:t}))})},O=function(e){return e.text().then(function(t){return e.ok?t:Promise.reject({status:e.status,statusText:e.statusText,err:t})})},I=function(e){return function(t){t(S(e.controlIndex));var n=function(e,t){var n={};n.start=t.lat+","+t.lng,n.mode="fastest;"+e.mode,n.rangetype=e.rangetype;var a=[];if("time"===e.rangetype){for(var r=60*e.range.value,o=60*e.interval.value;r>0;)a.push(r),r-=o;n.range=a.join(",")}else if("distance"===e.rangetype){for(var i=1e3*e.range.value,s=1e3*e.interval.value;i>0;)a.push(i),i-=s;n.range=a.join(",")}return n}(e.settings,e.center),a=new URL("https://isoline.route.api.here.com/routing/7.2/calculateisoline.json"),r=Object(u.a)({app_id:e.hereConfig.appId,app_code:e.hereConfig.appCode},n);return a.search=new URLSearchParams(r),fetch(a).then(b).then(function(n){return t((a=n,r=e.controlIndex,function(e){var t=function(e){return e.response&&e.response.isoline.length>0?e.response.isoline.reverse():[]}(a);0==t.length&&e(j({handlerCode:"NO_ISOCHRONES_RESULTS"})),e(y(r,t)),t.length>0&&e(m(r))}));var a,r}).catch(function(n){return t((a=n.err,r=e.controlIndex,function(e){console.log(a.response),"InvalidInputData"==a.response.subtype&&e(j({handlerCode:"INVALID_CREDENTIALS",handlerMessage:a.response.details})),e(y(r,[]))}));var a,r})}},S=function(e){return{type:"REQUEST_ISOCHRONES_RESULTS",controlIndex:e}},T=function(e){return Object(u.a)({type:"REQUEST_GEOCODE_RESULTS"},e)},w=function(){return{type:"ADD_ISOCHRONESCONTROL",payload:new h}},_=function(e){return{type:"UPDATE_TEXTINPUT",payload:e}},R=function(e){return{type:"UPDATE_SELECTED_ADDRESS",payload:e}},j=function(e){return Object(u.a)({type:"RESULT_HANDLER",receivedAt:Date.now()},e)},k={event:null,controlIdx:null,receivedAt:null,latLng:null},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(console.log(t),t.type){case"ZOOM_TO_ISOCHRONES":return Object(u.a)({},e,{event:t.type,controlIndex:t.controlIndex,receivedAt:t.receivedAt});case"ZOOM_TO_POINT":return Object(u.a)({},e,{event:t.type,latLng:t.latLng,receivedAt:t.receivedAt});default:return e}},A={NO_GEOCODE_RESULTS:"Sorry, unfortunately no addresses can be found, please try a different location.",NO_ISOCHRONES_RESULTS:"Sorry, unfortunately no isochrones can be computed, please try a different location."},N={NO_GEOCODE_RESULTS:"Unable to find addresses here",NO_ISOCHRONES_RESULTS:"Unable to build isochrones here",INVALID_CREDENTIALS:"Sorry, your credentials seem to be invalid, please check again."},z={handlerCode:null,handlerMessage:null,handlerTopic:null,receivedAt:null},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(console.log(t),t.type){case"RESULT_HANDLER":return Object(u.a)({},e,{handlerCode:t.handlerCode,handlerTopic:N[t.handlerCode],handlerMessage:t.handlerMessage?t.handlerMessage:A[t.handlerCode],receivedAt:t.receivedAt});default:return e}},P=function(e){return{type:"SET_APP_ID",receivedAt:Date.now(),appId:e}},H=function(e){return{type:"SET_APP_CODE",receivedAt:Date.now(),appCode:e}},U={appId:"jKco7gLGf0WWlvS5n2fl",appCode:"HQnCztY23zh2xiTPCFiTMA"};console.log("SET_APP_ID","SET_APP_CODE");var B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(console.log(t),t.type){case"SET_APP_ID":return console.log(t.type,t),Object(u.a)({},e,{appId:t.appId,receivedAt:t.receivedAt});case"SET_APP_CODE":return Object(u.a)({},e,{appCode:t.appCode,receivedAt:t.receivedAt});default:return e}},M={controls:[new h]},V=Object(i.combineReducers)({isochronesControls:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(console.log(t),t.type){case"ADD_ISOCHRONESCONTROL":return Object(u.a)({},e,{controls:[].concat(Object(d.a)(e.controls),[t.payload])});case"REMOVE_ISOCHRONES_CONTROL":return Object(u.a)({},e,{controls:e.controls.filter(function(e,n){return n!==t.payload.controlIndex})});case"UPDATE_TEXTINPUT":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.payload.controlIndex?Object(u.a)({},e,{userInput:t.payload.inputValue}):e})});case"REQUEST_ISOCHRONES_RESULTS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{isFetchingIsochrones:!0}):e})});case"REQUEST_GEOCODE_RESULTS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{isFetching:!0,reverse:t.reverse}):e})});case"RECEIVE_GEOCODE_RESULTS":case"RECEIVE_REVERSE_GEOCODE_RESULTS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{isFetching:!1,geocodeResults:t.results,reverse:t.reverse}):e})});case"UPDATE_SELECTED_ADDRESS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.payload.controlIndex?Object(u.a)({},e,{geocodeResults:e.geocodeResults.map(function(e){return e.title===t.payload.inputValue&&e.title.length>0?Object(u.a)({},e,{selected:!0}):Object(u.a)({},e,{selected:!1})})}):e})});case"UPDATE_SETTINGS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{settings:t.payload.settings}):e})});case"RECEIVE_ISOCHRONES_RESULTS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{isFetchingIsochrones:!1,isochrones:{results:t.results,receivedAt:t.receivedAt}}):e})});default:return e}},mapEvents:L,resultHandler:D,hereConfig:B}),G=n(42),F=n(46),W=n(43),Z=n(47),Q=n(19),J=n.n(Q),K=n(271),X=n.n(K),Y={};Y.Icon=Q.Icon.extend({options:{iconSize:[35,45],iconAnchor:[17,42],popupAnchor:[1,-32],shadowAnchor:[10,12],shadowSize:[36,16],className:"",prefix:"",extraClasses:"",shape:"circle",icon:"",innerHTML:"",markerColor:"red",svgBorderColor:"#fff",svgOpacity:1,iconColor:"#fff",number:"",svg:!1},initialize:function(e){e=Q.Util.setOptions(this,e)},createIcon:function(){var e=document.createElement("div"),t=this.options;return t.icon&&(e.innerHTML=this._createInner()),t.innerHTML&&(e.innerHTML=t.innerHTML),t.bgPos&&(e.style.backgroundPosition=-t.bgPos.x+"px "+-t.bgPos.y+"px"),t.svg?this._setIconStyles(e,"svg"):this._setIconStyles(e,t.shape+"-"+t.markerColor),e},_createInner:function(){var e="",t="",n=this.options;if(n.iconColor&&(e="style='color: "+n.iconColor+"' "),n.number&&(t="number='"+n.number+"' "),n.svg){var a='<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.529271 95.44922" style="fill:'+n.markerColor+";stroke:"+n.svgBorderColor+";fill-opacity:"+n.svgOpacity+';" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-139.52 -173.21)"><path d="m174.28 173.21c-19.199 0.00035-34.764 15.355-34.764 34.297 0.007 6.7035 1.5591 12.813 5.7461 18.854l0.0234 0.0371 28.979 42.262 28.754-42.107c3.1982-5.8558 5.9163-11.544 6.0275-19.045-0.0001-18.942-15.565-34.298-34.766-34.297z"/></g></svg>';return"square"===n.shape&&(a='<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.457038 96.523441" style="fill:'+n.markerColor+";stroke:"+n.svgBorderColor+";fill-opacity:"+n.svgOpacity+';" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-545.27 -658.39)"><path d="m545.27 658.39v65.301h22.248l12.48 31.223 12.676-31.223h22.053v-65.301h-69.457z"/></g></svg>'),"star"===n.shape&&(a='<svg style="top:0; fill:'+n.markerColor+";stroke:"+n.svgBorderColor+";fill-opacity:"+n.svgOpacity+';" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 77.690999 101.4702"><g transform="translate(-101.15 -162.97)"><g transform="matrix(1 0 0 1.0165 -65.712 -150.28)"><path d="m205.97 308.16-11.561 11.561h-16.346v16.346l-11.197 11.197 11.197 11.197v15.83h15.744l11.615 33.693 11.467-33.568 0.125-0.125h16.346v-16.346l11.197-11.197-11.197-11.197v-15.83h-15.83l-11.561-11.561z"/></g></g></svg>'),"penta"===n.shape&&(a='<svg style="fill:'+n.markerColor+";stroke:"+n.svgBorderColor+";fill-opacity:"+n.svgOpacity+';"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.550368 96.362438" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-367.08 -289.9)"><path d="m367.08 322.5 17.236-32.604h36.151l18.164 32.25-35.665 64.112z"/></g></svg>'),a+"<i "+t+e+"class='"+n.extraClasses+" "+n.prefix+" "+n.icon+"'></i>"}return"<i "+t+e+"class='"+n.extraClasses+" "+n.prefix+" "+n.icon+"'></i>"},_setIconStyles:function(e,t){var n,a,r=this.options,o=Q.point(r["shadow"===t?"shadowSize":"iconSize"]);"shadow"===t?(n=Q.point(r.shadowAnchor||r.iconAnchor),a="shadow"):(n=Q.point(r.iconAnchor),a="icon"),!n&&o&&(n=o.divideBy(2,!0)),e.className="leaflet-marker-"+a+" extra-marker extra-marker-"+t+" "+r.className,n&&(e.style.marginLeft=-n.x+"px",e.style.marginTop=-n.y+"px"),o&&(e.style.width=o.x+"px",e.style.height=o.y+"px")},createShadow:function(){var e=document.createElement("div");return this._setIconStyles(e,"shadow"),e}}),Y.icon=function(e){return new Y.Icon(e)};var q=Y,$={};$.HERE=Q.TileLayer.extend({options:{subdomains:"1234",minZoom:2,maxZoom:18,scheme:"normal.day",resource:"maptile",mapId:"newest",format:"png8",appId:"",appCode:""},initialize:function(e){var t=(e=Q.setOptions(this,e)).scheme.split(".")[0];e.tileResolution=256,Q.Browser.retina&&(e.tileResolution=512);var n="base.maps.api.here.com";"satellite"!=t&&"terrain"!=t&&"hybrid"!=t||(n="aerial.maps.api.here.com"),-1!==e.scheme.indexOf(".traffic.")&&(n="traffic.maps.api.here.com");var a="https://{s}."+n+"/{resource}/2.1/{resource}/{mapId}/{scheme}/{z}/{x}/{y}/{tileResolution}/{format}?app_id={appId}&app_code={appCode}";this._attributionUrl=Q.Util.template("https://1."+n+"/maptile/2.1/copyright/{mapId}?app_id={appId}&app_code={appCode}",this.options),Q.TileLayer.prototype.initialize.call(this,a,e),this._attributionText=""},onAdd:function(e){Q.TileLayer.prototype.onAdd.call(this,e),this._attributionBBoxes||this._fetchAttributionBBoxes()},onRemove:function(e){Q.TileLayer.prototype.onRemove.call(this,e),this._map.attributionControl.removeAttribution(this._attributionText),this._map.off("moveend zoomend resetview",this._findCopyrightBBox,this)},_fetchAttributionBBoxes:function(){var e=new XMLHttpRequest;e.onreadystatechange=Q.bind(function(){4==e.readyState&&200==e.status&&this._parseAttributionBBoxes(JSON.parse(e.responseText))},this),e.open("GET",this._attributionUrl,!0),e.send()},_parseAttributionBBoxes:function(e){if(this._map){for(var t=e[this.options.scheme.split(".")[0]]||e.normal,n=0;n<t.length;n++)if(t[n].boxes)for(var a=0;a<t[n].boxes.length;a++){var r=t[n].boxes[a];t[n].boxes[a]=Q.latLngBounds([[r[0],r[1]],[r[2],r[3]]])}this._map.on("moveend zoomend resetview",this._findCopyrightBBox,this),this._attributionProviders=t,this._findCopyrightBBox()}},_findCopyrightBBox:function(){if(this._map){for(var e=this._attributionProviders,t=[],n=this._map.getZoom(),a=this._map.getBounds(),r=0;r<e.length;r++){if(e[r].minLevel<n&&e[r].maxLevel>n&&!e[r].boxes){t.push(e[r]);break}for(var o=0;o<e[r].boxes.length;o++){var i=e[r].boxes[o];if(a.overlaps(i)){t.push(e[r]);break}}}var s=['<a href="https://legal.here.com/terms/serviceterms/gb/">HERE maps</a>'];for(r=0;r<t.length;r++){var l=t[r];s.push('<abbr title="'+l.alt+'">'+l.label+"</abbr>")}var c="\xa9 "+s.join(", ")+". ";c!==this._attributionText&&(this._map.attributionControl.removeAttribution(this._attributionText),this._map.attributionControl.addAttribution(this._attributionText=c))}}}),$.here=function(e){return new $.HERE(e)};var ee=$,te={width:"100%",height:"100vh"},ne=ee.here({appId:"jKco7gLGf0WWlvS5n2fl",appCode:"HQnCztY23zh2xiTPCFiTMA",scheme:"reduced.day"}),ae=ee.here({appId:"jKco7gLGf0WWlvS5n2fl",appCode:"HQnCztY23zh2xiTPCFiTMA",scheme:"hybrid.grey.day"}),re=J.a.layerGroup(),oe=J.a.layerGroup(),ie=J.a.latLng(-90,-180),se=J.a.latLng(90,180),le={center:[25.95681,-35.729687],zoomControl:!1,maxBounds:J.a.latLngBounds(ie,se),zoom:2,layers:[re,oe,ne]},ce=function(e){function t(){return Object(p.a)(this,t),Object(F.a)(this,Object(W.a)(t).apply(this,arguments))}return Object(Z.a)(t,e),Object(G.a)(t,[{key:"componentDidMount",value:function(){this.map=J.a.map("map",le),this.map.createPane("isochronesPane").style.opacity=.9;var e={"HERE reduced.day":ne,"HERE hybrid.grey.day":ae};J.a.control.layers(e).addTo(this.map),J.a.control.zoom({position:"topright"}).addTo(this.map);var t=J.a.control({position:"bottomright"});t.onAdd=function(e){var t=J.a.DomUtil.create("div","brand");return t.innerHTML='<a href="https://gis.ops.com" target="_blank"><div class="gis-ops-logo"></div></a>',t},this.map.addControl(t)}},{key:"updateMarkers",value:function(){var e=this.props.isochronesControls,t=0,n=!0,a=!1,r=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var s=o.value;if(s.geocodeResults.length>0){var l=!0,c=!1,d=void 0;try{for(var u,p=s.geocodeResults[Symbol.iterator]();!(l=(u=p.next()).done);l=!0){var h=u.value;h.selected&&(s.reverse||this.clearLayerByIndex(t),this.addIsochronesMarker(h,t,this.isMarkerPresent(t)))}}catch(m){c=!0,d=m}finally{try{l||null==p.return||p.return()}finally{if(c)throw d}}}t+=1}}catch(m){a=!0,r=m}finally{try{n||null==i.return||i.return()}finally{if(a)throw r}}}},{key:"getTooltipContent",value:function(e,t){var n="car";"car"==e.mode?n="car":"truck"==e.mode?n="truck":"pedestrian"==e.mode&&(n="male");var a="arrows alternate horizontal";return"time"==e.rangetype&&(a="clock"),'<div class="ui list">\n        <div class="item">\n          <i class="'.concat(n,' icon"></i>\n          <div class="content">\n            ').concat(e.mode,'\n          </div>\n        </div>\n        <div class="item">\n          <i class="').concat(a,' icon"></i>\n          <div class="content">\n            ').concat("time"===e.rangetype?t.range/60+" minutes":t.range/1e3+" kilometers","\n          </div>\n        </div>\n      </div>")}},{key:"updateIsochrones",value:function(e){var t=this.props.isochronesControls;oe.clearLayers();for(var n=0;n<t.length;n++)if(t[n].isochrones.results.length>0){var a=0,r=t[n].isochrones.results,o=X.a.scale(["#f44242","#f4be41","#41f497"]).mode("hsl").colors(t[n].isochrones.results.length),i=t[n].settings,s=!0,l=!1,c=void 0;try{for(var d,u=r[Symbol.iterator]();!(s=(d=u.next()).done);s=!0){var p=d.value,h=!0,m=!1,g=void 0;try{for(var v,f=p.component[Symbol.iterator]();!(h=(v=f.next()).done);h=!0){var E=v.value;this.addIsochrones(E.shape,this.getTooltipContent(i,p),o[a],n)}}catch(y){m=!0,g=y}finally{try{h||null==f.return||f.return()}finally{if(m)throw g}}a+=1}}catch(y){l=!0,c=y}finally{try{s||null==u.return||u.return()}finally{if(l)throw c}}}}},{key:"updateMap",value:function(e){var t=this.props.mapEvents;if(t.receivedAt>e.mapEvents.receivedAt){var n=J.a.featureGroup();switch(t.event){case"ZOOM_TO_ISOCHRONES":oe.eachLayer(function(e){e.options.index===t.controlIndex&&n.addLayer(e)}),this.map.fitBounds(n.getBounds(),{paddingTopLeft:[100,100]});break;case"ZOOM_TO_POINT":this.map.flyTo(t.latLng,14)}}}},{key:"componentDidUpdate",value:function(e,t){this.updateMarkers(),this.updateIsochrones(e),this.updateMap(e)}},{key:"clearLayerByIndex",value:function(e){re.eachLayer(function(t){t.options.index===e&&re.removeLayer(t)})}},{key:"isMarkerPresent",value:function(e){var t=!1;return re.eachLayer(function(n){n.options.index===e&&(t=!0)}),t}},{key:"updatePosition",value:function(e){var t,n=this.props,a=n.dispatch,r=n.hereConfig;a((t=Object(u.a)({isoIndex:e.isoIndex,hereConfig:r},e.latLng),function(e){e(T({controlIndex:t.isoIndex,reverse:!0}));var n=new URL("https://reverse.geocoder.api.here.com/6.2/reversegeocode.json"),a={app_id:t.hereConfig.appId,app_code:t.hereConfig.appCode,mode:"retrieveAddresses",maxresults:1,prox:[t.lat,t.lng,250].join(",")};return n.search=new URLSearchParams(a),fetch(n).then(b).then(function(n){return e(f(n,t.isoIndex,{lat:t.lat,lng:t.lng},!0))}).catch(function(n){return e(v(n.err,t.controlIndex))})}))}},{key:"addIsochrones",value:function(e,t,n,a){J.a.polygon(e.map(function(e){return e.split(",")}),{fillColor:n,weight:2,opacity:1,color:"white",pane:"isochronesPane",index:a}).addTo(oe).bindTooltip(t,{permanent:!1,sticky:!0})}},{key:"addIsochronesMarker",value:function(e,t){if(arguments.length>2&&void 0!==arguments[2]&&arguments[2])re.eachLayer(function(n){n.options.index===t&&(e.title.length>0?n.getTooltip()?n.setTooltipContent(e.title+", "+e.description):n.bindTooltip(e.title+", "+e.description,{permanent:!1}).openTooltip():n.unbindTooltip())});else{var n=q.icon({icon:"fa-number",markerColor:"purple",shape:"star",prefix:"fa",number:(t+1).toString()}),a=this;J.a.marker(e.displayposition,{icon:n,draggable:!0,index:t}).addTo(re).bindTooltip(e.title+", "+e.description,{permanent:!1}).openTooltip().on("dragend",function(e){a.updatePosition({latLng:e.target.getLatLng(),isoIndex:e.target.options.index})})}}},{key:"render",value:function(){return r.a.createElement("div",{id:"map",style:te})}}]),t}(r.a.Component),de=Object(l.b)(function(e,t){return{isochronesControls:e.isochronesControls.controls,mapEvents:e.mapEvents,hereConfig:e.hereConfig}})(ce),ue=n(34),pe=n(145),he=n(234),me=n(141),ge=n(249),ve=n(136),fe=n(256),Ee=n(233),ye=n(232),xe=n(264),be=n(187),Ce=n(45),Oe=n(91),Ie={pedestrian:{type:["fastest","shortest"],traffic:["enabled","disabled"]},car:{type:["fastest","shortest","traffic"],traffic:["enabled","disabled"],consumptionModel:["default","standard"],customConsumptionDetails:{}},truck:{type:["fastest"],shippedHazardousGoods:[],limitedWeight:{},weightPerAxle:{},height:{},width:{},length:{},tunnelCategory:[],consumptionModel:["default","standard"],customConsumptionDetails:{}}},Se={distance:{},time:{}},Te=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(F.a)(this,Object(W.a)(t).call(this,e))).handleClickAccordion=function(e,t){var a=t.index,r=n.state.activeIndex===a?-1:a;n.setState({activeIndex:r})},n.state={activeIndex:0},n}return Object(Z.a)(t,e),Object(G.a)(t,[{key:"updateSettings",value:function(){var e=this.props,t=e.controls,n=e.controlindex;(0,e.dispatch)({type:"UPDATE_SETTINGS",payload:{controlIndex:n,settings:t[n].settings}})}},{key:"handleClickMode",value:function(e){var t=this.props;t.controls[t.controlindex].settings.mode=e,this.updateSettings()}},{key:"handleRangetype",value:function(e){var t=this.props;t.controls[t.controlindex].settings.rangetype=e,this.updateSettings()}},{key:"alignRangeInterval",value:function(){var e=this.props,t=e.controls,n=e.controlindex;(t[n].settings.range.value<t[n].settings.interval.value||""==t[n].settings.interval.value)&&(t[n].settings.interval.value=t[n].settings.range.value),t[n].settings.interval.max=t[n].settings.range.value}},{key:"handleRangeValueChange",value:function(e,t){var n=t.value,a=this.props;a.controls[a.controlindex].settings.range.value=n,this.alignRangeInterval(),this.updateSettings()}},{key:"handleIntervalValueChange",value:function(e,t){var n=t.value,a=this.props,r=a.controls,o=a.controlindex;n<=r[o].settings.range.value&&(r[o].settings.interval.value=n,this.updateSettings())}},{key:"render",value:function(){var e=this,t=this.props,n=t.controls,a=t.controlindex,o="time"===n[a].settings.rangetype?" minutes":" kilometers",i={settings:Object(u.a)({},n[a].settings.range,{start:n[a].settings.range.value,onChange:function(t){n[a].settings.range.value=t,e.alignRangeInterval(),e.updateSettings()}})},s={settings:Object(u.a)({},n[a].settings.interval,{start:n[a].settings.interval.value,onChange:function(t){n[a].settings.interval.value=t,e.updateSettings()}})};return r.a.createElement("div",null,r.a.createElement(be.a,null,r.a.createElement(be.a.Title,{active:1===this.state.activeIndex,index:1,onClick:this.handleClickAccordion},r.a.createElement(Ce.a,{name:"dropdown"}),r.a.createElement(Oe.a,{size:"small",color:"purple"},"Travel settings")),r.a.createElement(be.a.Content,{active:1===this.state.activeIndex},r.a.createElement("div",{className:"mt3"},r.a.createElement("div",null,r.a.createElement(me.a.Group,{basic:!0,size:"small"},Ie&&Object.keys(Ie).map(function(t,o){return r.a.createElement(me.a,{active:t===n[a].settings.mode,key:o,mode:t,onClick:function(){return e.handleClickMode(t)}},t)}))),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Start | destination")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Traffic")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Departure | arrival")),"truck"==n[a].settings.mode&&r.a.createElement("div",null,r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Trailers")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Hazardous Goods")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Height")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Weight")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Width")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Length")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Weight per axle")),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Tunnel category")),r.a.createElement(ye.a,null)))),r.a.createElement(be.a.Title,{active:0===this.state.activeIndex,index:0,onClick:this.handleClickAccordion},r.a.createElement(Ce.a,{name:"dropdown"}),r.a.createElement(Oe.a,{size:"small",color:"purple"},"Range settings")),r.a.createElement(be.a.Content,{active:0===this.state.activeIndex},r.a.createElement("div",{className:"mt3"},r.a.createElement("div",{className:"mt3"},r.a.createElement(Oe.a,{size:"small"},"Range type"),r.a.createElement("div",{className:"mt3"},r.a.createElement(me.a.Group,{basic:!0,size:"small"},Se&&Object.keys(Se).map(function(t,o){return r.a.createElement(me.a,{active:t===n[a].settings.rangetype,key:o,mode:t,onClick:function(){return e.handleRangetype(t)}},t)}))))),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Maximum range"),r.a.createElement("div",{className:"mt3"},r.a.createElement(xe.Slider,{discrete:!0,color:"grey",value:n[a].settings.range.value,inverted:!1,settings:i.settings}),r.a.createElement("div",{className:"mt2 flex justify-between items-center"},r.a.createElement(Ee.a,{size:"mini",placeholder:"Enter Value",onChange:this.handleRangeValueChange.bind(this)}),r.a.createElement(Oe.a,{className:"mt2",color:"grey",size:"mini"},n[a].settings.range.value+o)))),r.a.createElement(ye.a,null),r.a.createElement("div",null,r.a.createElement(Oe.a,{size:"small"},"Interval step"),r.a.createElement("div",{className:"mt3"},r.a.createElement(xe.Slider,{discrete:!0,color:"grey",value:n[a].settings.interval.value,inverted:!1,settings:s.settings}),r.a.createElement("div",{className:"mt2 flex justify-between items-center"},r.a.createElement(Ee.a,{size:"mini",placeholder:"Enter Value",onChange:this.handleIntervalValueChange.bind(this)}),r.a.createElement(Oe.a,{className:"mt2",color:"grey",size:"mini"},n[a].settings.interval.value+o)))))))}}]),t}(r.a.Component),we=Object(l.b)(function(e){return{controls:e.isochronesControls.controls}})(Te),_e=n(237),Re=n(248),je=n(274),ke=n.n(je),Le=n(275),Ae=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(F.a)(this,Object(W.a)(t).call(this,e))).handleSearchChange=function(e){var t=n.props,a=t.dispatch,r=t.controlindex;a(_({inputValue:e.target.value,controlIndex:r})),n.fetchGeocodeResults()},n.handleResultSelect=function(e,t){var a=t.result,r=n.props,o=r.dispatch,i=r.controlindex;o(_({inputValue:a.title,controlIndex:i})),o(R({inputValue:a.title,controlIndex:i})),o(g(a.displayposition))},n.handleFetchIsochrones=function(){var e,t=n.props,a=t.dispatch,r=t.controlindex,o=t.controls,i=t.hereConfig;console.log(i);var s=!0,l=!1,c=void 0;try{for(var d,u=o[r].geocodeResults[Symbol.iterator]();!(s=(d=u.next()).done);s=!0){var p=d.value;p.selected&&(e=p.displayposition)}}catch(h){l=!0,c=h}finally{try{s||null==u.return||u.return()}finally{if(l)throw c}}a(I({controlIndex:r,settings:o[r].settings,center:e,hereConfig:i}))},n.handleZoom=function(){var e=n.props,t=e.dispatch,a=e.controlindex;t(m(a))},n.dataChanged=n.dataChanged.bind(Object(ue.a)(Object(ue.a)(n))),n.state={isochronesTitle:"Isochrones -"+(e.controlindex+1)},n.handleSearchChange=n.handleSearchChange.bind(Object(ue.a)(Object(ue.a)(n))),n.handleResultSelect=n.handleResultSelect.bind(Object(ue.a)(Object(ue.a)(n))),n.fetchGeocodeResults=Object(Le.a)(1e3,n.fetchGeocodeResults),n}return Object(Z.a)(t,e),Object(G.a)(t,[{key:"fetchGeocodeResults",value:function(){var e,t=this.props,n=t.dispatch,a=t.userTextInput,r=t.controlindex,o=t.hereConfig;a.length>0&&n((e={inputValue:a,controlIndex:r,hereConfig:o},function(t){t(T({controlIndex:e.controlIndex}));var n=new URL("https://geocoder.api.here.com/6.2/geocode.json"),a={app_id:e.hereConfig.appId,app_code:e.hereConfig.appCode,searchtext:e.inputValue};return n.search=new URLSearchParams(a),fetch(n).then(b).then(function(n){return t(f(n,e.controlIndex))}).catch(function(n){return t(v(n.err,e.controlIndex))})}))}},{key:"customValidateText",value:function(e){return e.length>0&&e.length<64}},{key:"dataChanged",value:function(e){this.setState(Object(u.a)({},e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.isFetching,a=t.isFetchingIsochrones,o=t.userTextInput,i=t.results,s=t.controls,l=t.controlindex,c=t.isochronesResults;return r.a.createElement(pe.a,{style:{margin:"20px"}},r.a.createElement("div",{className:"mb2 justify-between flex flex-row items-center"},r.a.createElement("div",null,r.a.createElement(he.a,{trigger:r.a.createElement(Ce.a,{name:"pencil"}),content:"Edit name",size:"mini"}),r.a.createElement(ke.a,{validate:this.customValidateText,activeClassName:"editing",text:this.state.isochronesTitle,paramName:"isochronesTitle",change:this.dataChanged,style:{minWidth:150,display:"inline-block",margin:"0 0 0 0",padding:0,fontWeight:"bold",fontSize:15,outline:"none",border:"none"}})),c&&c.length>0&&r.a.createElement(he.a,{trigger:r.a.createElement(me.a,{circular:!0,size:"mini",icon:"unhide",style:{float:"right"},onClick:this.handleShow,className:"pr3"}),content:"Toggle on map",size:"mini"}),c&&c.length>0&&r.a.createElement(he.a,{trigger:r.a.createElement(me.a,{circular:!0,icon:"expand arrows alternate",style:{float:"right"},size:"mini",onClick:this.handleZoom,className:"pr4"}),content:"Zoom",size:"mini"}),r.a.createElement(he.a,{trigger:r.a.createElement(me.a,{circular:!0,size:"mini",icon:"remove",style:{float:"right"},onClick:function(){s.length>1&&e.props.dispatch({type:"REMOVE_ISOCHRONES_CONTROL",payload:{controlIndex:l}})}}),content:"Remove",size:"mini"})),r.a.createElement(ye.a,{fitted:!0}),r.a.createElement("div",{className:"flex justify-between items-center mt3"},r.a.createElement(_e.a,{onSearchChange:this.handleSearchChange,onResultSelect:this.handleResultSelect,type:"text",fluid:!0,input:{fluid:!0},loading:n,className:"flex-grow-1 mr2",results:i,value:o,placeholder:"Find Address ..."}),r.a.createElement(he.a,{trigger:r.a.createElement(me.a,{circular:!0,loading:a,disabled:function(){var e=!0,t=!1,n=void 0;try{for(var a,r=i[Symbol.iterator]();!(e=(a=r.next()).done);e=!0)if(a.value.selected)return!1}catch(o){t=!0,n=o}finally{try{e||null==r.return||r.return()}finally{if(t)throw n}}return!0}(),color:"purple",icon:"globe",onClick:this.handleFetchIsochrones}),content:"Compute isochrones",size:"mini"})),r.a.createElement(Re.a,{className:"mt2"},r.a.createElement(we,{controlindex:l})))}}]),t}(r.a.Component),Ne=Object(l.b)(function(e,t){var n=e.isochronesControls.controls[t.controlindex].userInput,a=e.isochronesControls.controls[t.controlindex].geocodeResults,r=e.isochronesControls.controls[t.controlindex].isochrones.results,o=e.isochronesControls.controls[t.controlindex].isFetching,i=e.isochronesControls.controls[t.controlindex].isFetchingIsochrones,s=e.isochronesControls.controls,l=e.hereConfig;return{userTextInput:n,results:a,isFetching:o,isFetchingIsochrones:i,controls:s,mapEvents:e.mapEvents,hereConfig:l,isochronesResults:r}})(Ae),ze={zIndex:999,position:"absolute",width:"400px",top:"10px",left:"10px",maxHeight:"calc(100vh)",padding:"0px"},De=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(F.a)(this,Object(W.a)(t).call(this,e))).openSettings=function(){return n.setState({settingsOpen:!0})},n.closeSettings=function(){return n.setState({settingsOpen:!1})},n.handleAddIsochronesControl=function(){n.props.dispatch(w())},n.handleAppIdChange=function(e){(0,n.props.dispatch)(P(e.target.value))},n.handleAppCodeChange=function(e){(0,n.props.dispatch)(H(e.target.value))},n.handleAddIsochronesControl=n.handleAddIsochronesControl.bind(Object(ue.a)(Object(ue.a)(n))),n.state={settingsOpen:!1},n}return Object(Z.a)(t,e),Object(G.a)(t,[{key:"render",value:function(){var e=this.props,t=e.controls,n=e.hereConfig;console.log(n);var a=this.state.settingsOpen;return r.a.createElement("div",null,r.a.createElement(pe.a,{className:"flex flex-column",style:ze},r.a.createElement("div",null,r.a.createElement("div",{style:{flex:1,display:"flex",minHeight:"0px"}},r.a.createElement("div",{style:{flex:1,overflow:"auto"}},r.a.createElement("div",{style:{maxHeight:"calc(100vh - 7vw)",overflow:"auto"}},t&&t.map(function(e,t){return r.a.createElement(Ne,{key:t,controlindex:t})}),r.a.createElement("div",{style:{marginLeft:"20px",marginBottom:"20px",marginTop:"0px"}},r.a.createElement(he.a,{trigger:r.a.createElement(me.a,{circular:!0,icon:"plus",className:"ma3",onClick:this.handleAddIsochronesControl}),content:"Add",size:"mini"}))))),r.a.createElement("div",{style:{height:"40px",boxShadow:"2px -5px 5px -5px #333",position:"relative"},className:"flex justify-between items-center pa3"},r.a.createElement("span",{className:"b f6"},"Reachability analysis application"),r.a.createElement(he.a,{trigger:r.a.createElement(me.a,{circular:!0,icon:"setting",size:"mini",onClick:this.openSettings}),content:"Settings",size:"mini"})))),r.a.createElement(ge.a,{size:"tiny",dimmer:"inverted",open:a,onClose:this.close},r.a.createElement(ge.a.Header,null,"Settings"),r.a.createElement(ge.a.Content,{image:!0},r.a.createElement(ve.a,{wrapped:!0,size:"small",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/HERE_logo.svg/527px-HERE_logo.svg.png"}),r.a.createElement(ge.a.Description,null,r.a.createElement(fe.a,null,"HERE credentials [*sign up"," ",r.a.createElement("a",{href:"https://developer.here.com/?create=Freemium-Basic&keepState=true&step=account",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("strong",null,"here")),"]"),r.a.createElement("div",null,n&&r.a.createElement(Ee.a,{fluid:!0,label:"app_code",labelPosition:"right",placeholder:"app_code",onChange:this.handleAppCodeChange,value:n.appCode})),r.a.createElement(ye.a,null),r.a.createElement("div",null,n&&r.a.createElement(Ee.a,{fluid:!0,label:"app_id",labelPosition:"right",placeholder:"app_id",onChange:this.handleAppIdChange,value:n.appId})))),r.a.createElement(ge.a.Actions,null,r.a.createElement(me.a,{color:"orange",content:"Close",onClick:this.closeSettings}))))}}]),t}(r.a.Component),Pe=Object(l.b)(function(e){return{controls:e.isochronesControls.controls,hereConfig:e.hereConfig}})(De),He=n(265),Ue=function(e){function t(){return Object(p.a)(this,t),Object(F.a)(this,Object(W.a)(t).apply(this,arguments))}return Object(Z.a)(t,e),Object(G.a)(t,[{key:"componentDidUpdate",value:function(e,t){var n=this.props.resultHandler;Object(He.toast)({type:"info",icon:"info",title:n.handlerTopic,description:n.handlerMessage,time:5e3})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(de,null),r.a.createElement(Pe,{className:"isoControls"}),r.a.createElement(He.SemanticToastContainer,{position:"bottom-center"}))}}]),t}(r.a.Component),Be=Object(l.b)(function(e){return{resultHandler:e.resultHandler}})(Ue),Me=(n(481),[c.a]);var Ve=Object(i.createStore)(V,Object(s.composeWithDevTools)(i.applyMiddleware.apply(void 0,Me)));Object(o.render)(r.a.createElement(l.a,{store:Ve}," ",r.a.createElement(Be,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[304,2,1]]]);
//# sourceMappingURL=main.83fbdf10.chunk.js.map