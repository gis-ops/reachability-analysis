(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{188:function(e,t,n){e.exports=n(336)},329:function(e,t,n){},336:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(37);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s=n(38),i=n(161),l=n(29),c=n(163),d=(n(197),n(177)),u=n(22),h="jKco7gLGf0WWlvS5n2fl",p="HQnCztY23zh2xiTPCFiTMA",m=n(20),g=function e(){Object(m.a)(this,e),this.userInput="",this.geocodeResults=[],this.isFetching=!1,this.isFetchingIsochrones=!1,this.settings={range:{min:1,max:600,step:1,value:60},interval:{min:1,max:60,step:1,value:10},mode:"car"}},v=function(e,t){if(e.Response&&e.Response.View.length>0){var n=[],o=!0,a=!1,r=void 0;try{for(var s,i=e.Response.View[0].Result[Symbol.iterator]();!(o=(s=i.next()).done);o=!0){var l=s.value;l.Location&&"point"===l.Location.LocationType&&n.push({title:l.Location.Address.Label,description:l.Location.Address.PostalCode,displayposition:{lat:t?t.lat:l.Location.DisplayPosition.Latitude,lng:t?t.lng:l.Location.DisplayPosition.Longitude},selected:!1})}}catch(c){a=!0,r=c}finally{try{o||null==i.return||i.return()}finally{if(a)throw r}}return n}return[]},f=function(e,t,n){return{type:"RECEIVE_REVERSE_GEOCODE_RESULTS",controlIndex:e,results:arguments.length>3&&void 0!==arguments[3]&&arguments[3]?[{title:[t.lat,t.lng].join(","),description:"",DisplayPosition:{lat:t.lat,lng:t.lng},selected:!0}]:v(t,n),receivedAt:Date.now(),reverse:!0}},E=function(e){return function(t){t(O(e.controlIndex));var n=new URL("https://geocoder.api.here.com/6.2/geocode.json"),o={app_id:h,app_code:p,searchtext:e.inputValue};return n.search=new URLSearchParams(o),fetch(n).then(function(e){return e.json()}).then(function(n){return t(function(e,t){return{type:"RECEIVE_GEOCODE_RESULTS",controlIndex:e,results:v(t),receivedAt:Date.now(),reverse:!1}}(e.controlIndex,n))})}},x=function(e){return function(t){console.log(!0,e),t(b(e.controlIndex))}},y=function(e){return function(t){t(f(e.isoIndex,{lat:e.lat,lng:e.lng},!0)),t(O(e.isoIndex));var n=new URL("https://reverse.geocoder.api.here.com/6.2/reversegeocode.json"),o={app_id:h,app_code:p,mode:"retrieveAddresses",maxresults:1,prox:[e.lat,e.lng,250].join(",")};return n.search=new URLSearchParams(o),fetch(n).then(function(e){return e.json()}).then(function(n){return t(f(e.isoIndex,n,{lat:e.lat,lng:e.lng}))}).then(function(n){return t(function(e,t){return function(n){n(w({controlIndex:e,inputValue:t.results[0].title})),n(I({controlIndex:e,inputValue:t.results[0].title}))}}(e.isoIndex,n))})}},b=function(e){return{type:"REQUEST_ISOCHRONES_RESULTS",controlIndex:e}},O=function(e){return{type:"REQUEST_GEOCODE_RESULTS",controlIndex:e}},C=function(){return{type:"ADD_ISOCHRONESCONTROL",payload:new g}},w=function(e){return{type:"UPDATE_TEXTINPUT",payload:e}},I=function(e){return{type:"UPDATE_SELECTED_ADDRESS",payload:e}},S={controls:[new g]},j=Object(s.combineReducers)({isochronesControls:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(console.log(t),t.type){case"ADD_ISOCHRONESCONTROL":return Object(u.a)({},e,{controls:[].concat(Object(d.a)(e.controls),[t.payload])});case"REMOVE_ISOCHRONES_CONTROL":return Object(u.a)({},e,{controls:e.controls.filter(function(e,n){return n!==t.payload.controlIndex})});case"UPDATE_TEXTINPUT":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.payload.controlIndex?Object(u.a)({},e,{userInput:t.payload.inputValue}):e})});case"REQUEST_ISOCHRONES_RESULTS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{isFetchingIsochrones:!0}):e})});case"REQUEST_GEOCODE_RESULTS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{isFetching:!0}):e})});case"RECEIVE_GEOCODE_RESULTS":case"RECEIVE_REVERSE_GEOCODE_RESULTS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{isFetching:!1,geocodeResults:t.results,reverse:t.reverse}):e})});case"UPDATE_SELECTED_ADDRESS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.payload.controlIndex?Object(u.a)({},e,{geocodeResults:e.geocodeResults.map(function(e){return e.title===t.payload.inputValue?Object(u.a)({},e,{selected:!0}):Object(u.a)({},e,{selected:!1})})}):e})});case"UPDATE_SETTINGS":return Object(u.a)({},e,{controls:e.controls.map(function(e,n){return n===t.controlIndex?Object(u.a)({},e,{settings:t.payload.settings}):e})});default:return e}}}),R=n(27),k=n(30),T=n(28),L=n(31),_=n(19),N=n.n(_),z={};z.Icon=_.Icon.extend({options:{iconSize:[35,45],iconAnchor:[17,42],popupAnchor:[1,-32],shadowAnchor:[10,12],shadowSize:[36,16],className:"",prefix:"",extraClasses:"",shape:"circle",icon:"",innerHTML:"",markerColor:"red",svgBorderColor:"#fff",svgOpacity:1,iconColor:"#fff",number:"",svg:!1},initialize:function(e){e=_.Util.setOptions(this,e)},createIcon:function(){var e=document.createElement("div"),t=this.options;return t.icon&&(e.innerHTML=this._createInner()),t.innerHTML&&(e.innerHTML=t.innerHTML),t.bgPos&&(e.style.backgroundPosition=-t.bgPos.x+"px "+-t.bgPos.y+"px"),t.svg?this._setIconStyles(e,"svg"):this._setIconStyles(e,t.shape+"-"+t.markerColor),e},_createInner:function(){var e="",t="",n=this.options;if(n.iconColor&&(e="style='color: "+n.iconColor+"' "),n.number&&(t="number='"+n.number+"' "),n.svg){var o='<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.529271 95.44922" style="fill:'+n.markerColor+";stroke:"+n.svgBorderColor+";fill-opacity:"+n.svgOpacity+';" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-139.52 -173.21)"><path d="m174.28 173.21c-19.199 0.00035-34.764 15.355-34.764 34.297 0.007 6.7035 1.5591 12.813 5.7461 18.854l0.0234 0.0371 28.979 42.262 28.754-42.107c3.1982-5.8558 5.9163-11.544 6.0275-19.045-0.0001-18.942-15.565-34.298-34.766-34.297z"/></g></svg>';return"square"===n.shape&&(o='<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.457038 96.523441" style="fill:'+n.markerColor+";stroke:"+n.svgBorderColor+";fill-opacity:"+n.svgOpacity+';" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-545.27 -658.39)"><path d="m545.27 658.39v65.301h22.248l12.48 31.223 12.676-31.223h22.053v-65.301h-69.457z"/></g></svg>'),"star"===n.shape&&(o='<svg style="top:0; fill:'+n.markerColor+";stroke:"+n.svgBorderColor+";fill-opacity:"+n.svgOpacity+';" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 77.690999 101.4702"><g transform="translate(-101.15 -162.97)"><g transform="matrix(1 0 0 1.0165 -65.712 -150.28)"><path d="m205.97 308.16-11.561 11.561h-16.346v16.346l-11.197 11.197 11.197 11.197v15.83h15.744l11.615 33.693 11.467-33.568 0.125-0.125h16.346v-16.346l11.197-11.197-11.197-11.197v-15.83h-15.83l-11.561-11.561z"/></g></g></svg>'),"penta"===n.shape&&(o='<svg style="fill:'+n.markerColor+";stroke:"+n.svgBorderColor+";fill-opacity:"+n.svgOpacity+';"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.550368 96.362438" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-367.08 -289.9)"><path d="m367.08 322.5 17.236-32.604h36.151l18.164 32.25-35.665 64.112z"/></g></svg>'),o+"<i "+t+e+"class='"+n.extraClasses+" "+n.prefix+" "+n.icon+"'></i>"}return"<i "+t+e+"class='"+n.extraClasses+" "+n.prefix+" "+n.icon+"'></i>"},_setIconStyles:function(e,t){var n,o,a=this.options,r=_.point(a["shadow"===t?"shadowSize":"iconSize"]);"shadow"===t?(n=_.point(a.shadowAnchor||a.iconAnchor),o="shadow"):(n=_.point(a.iconAnchor),o="icon"),!n&&r&&(n=r.divideBy(2,!0)),e.className="leaflet-marker-"+o+" extra-marker extra-marker-"+t+" "+a.className,n&&(e.style.marginLeft=-n.x+"px",e.style.marginTop=-n.y+"px"),r&&(e.style.width=r.x+"px",e.style.height=r.y+"px")},createShadow:function(){var e=document.createElement("div");return this._setIconStyles(e,"shadow"),e}}),z.icon=function(e){return new z.Icon(e)};var D=z,A={width:"100%",height:"100vh"},U=N.a.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains:"abcd",maxZoom:19}),V=N.a.layerGroup(),M={center:[40.655769,-73.938503],zoomControl:!1,zoom:13,layers:[V,U]},P=function(e){function t(){return Object(m.a)(this,t),Object(k.a)(this,Object(T.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(R.a)(t,[{key:"componentDidMount",value:function(){this.map=N.a.map("map",M),N.a.control.zoom({position:"topright"}).addTo(this.map);var e=N.a.control({position:"bottomright"});e.onAdd=function(e){var t=N.a.DomUtil.create("div","brand");return t.innerHTML='<a href="https://gis.ops.com" target="_blank"><div class="gis-ops-logo"></div></a>',t},this.map.addControl(e)}},{key:"componentDidUpdate",value:function(e,t){var n=this.props.isochronesMarkers,o=0,a=!0,r=!1,s=void 0;try{for(var i,l=n[Symbol.iterator]();!(a=(i=l.next()).done);a=!0){var c=i.value;if(c.geocodeResults.length>0){var d=!0,u=!1,h=void 0;try{for(var p,m=c.geocodeResults[Symbol.iterator]();!(d=(p=m.next()).done);d=!0){var g=p.value;g.selected&&(c.reverse||this.clearLayerByIndex(o),this.isMarkerPresent(o)?this.addIsochronesMarker(g,o,!0):this.addIsochronesMarker(g,o))}}catch(v){u=!0,h=v}finally{try{d||null==m.return||m.return()}finally{if(u)throw h}}}o+=1}}catch(v){r=!0,s=v}finally{try{a||null==l.return||l.return()}finally{if(r)throw s}}}},{key:"clearLayerByIndex",value:function(e){V.eachLayer(function(t){t.options.index===e&&V.removeLayer(t)})}},{key:"isMarkerPresent",value:function(e){var t=!1;return V.eachLayer(function(n){n.options.index===e&&(t=!0)}),t}},{key:"updatePosition",value:function(e){this.props.dispatch(y(Object(u.a)({isoIndex:e.isoIndex},e.latLng)))}},{key:"addIsochronesMarker",value:function(e,t){if(arguments.length>2&&void 0!==arguments[2]&&arguments[2])V.eachLayer(function(n){n.options.index===t&&n.setTooltipContent(e.title+", "+e.description)});else{var n=D.icon({icon:"fa-number",markerColor:"purple",shape:"star",prefix:"fa",number:(t+1).toString()}),o=this;N.a.marker(e.displayposition,{icon:n,draggable:!0,index:t}).addTo(V).bindTooltip(e.title+", "+e.description,{permanent:!1}).on("dragend",function(e){o.updatePosition({latLng:e.target.getLatLng(),isoIndex:e.target.options.index})})}}},{key:"render",value:function(){return a.a.createElement("div",{id:"map",style:A})}}]),t}(a.a.Component),H=Object(l.b)(function(e,t){return console.log(e,t),{isochronesMarkers:e.isochronesControls.controls}})(P),G=n(23),F=n(349),B=n(348),W=n(154),Q=n(347),Z=n(159),J=n(337),X=n(342),q=n(343),K={pedestrian:{name:"pedestrian",type:["fastest","shortest"],traffic:["enabled","disabled"]},car:{name:"car",type:["fastest","shortest","traffic"],traffic:["enabled","disabled"],consumptionModel:["default","standard"],customConsumptionDetails:{}},truck:{name:"truck",type:["fastest"],shippedHazardousGoods:[],limitedWeight:{},weightPerAxle:{},height:{},width:{},length:{},tunnelCategory:[],consumptionModel:["default","standard"],customConsumptionDetails:{}}},Y=function(e){function t(){return Object(m.a)(this,t),Object(k.a)(this,Object(T.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(R.a)(t,[{key:"updateSettings",value:function(){var e=this.props,t=e.controls,n=e.controlindex;(0,e.dispatch)({type:"UPDATE_SETTINGS",payload:{controlIndex:n,settings:t[n].settings}})}},{key:"handleClickMode",value:function(e){var t=this.props;t.controls[t.controlindex].settings.mode=e,this.updateSettings()}},{key:"handleRangeValueChange",value:function(e,t){var n=t.value,o=this.props;o.controls[o.controlindex].settings.range.value=n,this.updateSettings()}},{key:"handleIntervalValueChange",value:function(e,t){var n=t.value,o=this.props;o.controls[o.controlindex].settings.interval.value=n,this.updateSettings()}},{key:"render",value:function(){var e=this,t=this.props,n=t.controls,o=t.controlindex,r={settings:Object(u.a)({},n[o].settings.range,{start:n[o].settings.range.value,onChange:function(t){n[o].settings.range.value=t,n[o].settings.range.value<n[o].settings.interval.value&&(n[o].settings.interval.value=n[o].settings.range.value),n[o].settings.interval.max=n[o].settings.range.value,e.updateSettings()}})},s={settings:Object(u.a)({},n[o].settings.interval,{start:n[o].settings.interval.value,onChange:function(t){n[o].settings.interval.value=t,e.updateSettings()}})};return a.a.createElement("div",null,a.a.createElement("div",{className:"mb3"},a.a.createElement(J.a,{size:"small",color:"purple"},"Mode"),a.a.createElement("div",{className:"mt3"},a.a.createElement(Q.a.Group,{basic:!0,size:"small"},K&&Object.keys(K).map(function(t,r){return a.a.createElement(Q.a,{active:t===n[o].settings.mode,key:r,mode:t,onClick:function(){return e.handleClickMode(t)}},K[t].name)})))),a.a.createElement(X.a,null),a.a.createElement("div",{className:"mb3"},a.a.createElement(J.a,{size:"small",color:"purple"},"Range Type"),a.a.createElement("div",{className:"mt3"},a.a.createElement(Q.a.Group,{basic:!0,size:"small"},a.a.createElement(Q.a,null,"Distance"),a.a.createElement(Q.a,null,"Time")))),a.a.createElement(X.a,null),a.a.createElement("div",null,a.a.createElement(J.a,{size:"small",color:"purple"},"Range"),a.a.createElement("div",{className:"mt3"},a.a.createElement(Z.Slider,{discrete:!0,color:"grey",value:n[o].settings.range.value,inverted:!1,settings:r.settings}),a.a.createElement("div",{className:"mt2 flex justify-between items-center"},a.a.createElement(q.a,{size:"mini",placeholder:"Enter Value",onChange:this.handleRangeValueChange.bind(this)}),a.a.createElement(J.a,{className:"mt2",color:"grey",size:"mini"},n[o].settings.range.value+" minutes")))),a.a.createElement(X.a,null),a.a.createElement("div",null,a.a.createElement(J.a,{size:"small",color:"purple"},"Interval"),a.a.createElement("div",{className:"mt3"},a.a.createElement(Z.Slider,{discrete:!0,color:"grey",value:n[o].settings.interval.value,inverted:!1,settings:s.settings}),a.a.createElement("div",{className:"mt2 flex justify-between items-center"},a.a.createElement(q.a,{size:"mini",placeholder:"Enter Value",onChange:this.handleIntervalValueChange.bind(this)}),a.a.createElement(J.a,{className:"mt2",color:"grey",size:"mini"},n[o].settings.interval.value+" minutes")))))}}]),t}(a.a.Component),$=Object(l.b)(function(e){return{controls:e.isochronesControls.controls}})(Y),ee=n(344),te=n(346),ne=n(345),oe=n(170),ae=n.n(oe),re=n(171),se=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(k.a)(this,Object(T.a)(t).call(this,e))).handleClick=function(e,t){var o=t.index,a=n.state.activeIndex===o?-1:o;n.setState({activeIndex:a})},n.handleSearchChange=function(e){n.props.dispatch(w({inputValue:e.target.value,controlIndex:n.props.controlindex})),n.fetchGeocodeResults()},n.handleResultSelect=function(e,t){var o=t.result;n.props.dispatch(w({inputValue:o.title,controlIndex:n.props.controlindex})),n.props.dispatch(I({inputValue:o.title,controlIndex:n.props.controlindex}))},n.handleFetchIsochrones=function(){console.log("fetching..."),n.props.dispatch(x({controlIndex:n.props.controlindex}))},n.handleZoom=function(e){console.log("zoom")},n.dataChanged=n.dataChanged.bind(Object(G.a)(Object(G.a)(n))),n.state={isochronesTitle:"Isochrones -"+(e.controlindex+1),activeIndex:0},n.handleSearchChange=n.handleSearchChange.bind(Object(G.a)(Object(G.a)(n))),n.handleResultSelect=n.handleResultSelect.bind(Object(G.a)(Object(G.a)(n))),n.fetchGeocodeResults=Object(re.a)(1e3,n.fetchGeocodeResults),n}return Object(L.a)(t,e),Object(R.a)(t,[{key:"fetchGeocodeResults",value:function(){var e=this.props,t=e.dispatch,n=e.userTextInput;console.log(n),t(E({inputValue:n,controlIndex:this.props.controlindex}))}},{key:"customValidateText",value:function(e){return e.length>0&&e.length<64}},{key:"dataChanged",value:function(e){this.setState(Object(u.a)({},e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.isFetching,o=t.isFetchingIsochrones,r=t.userTextInput,s=t.results,i=t.controls,l=t.controlindex;return a.a.createElement(F.a,null,a.a.createElement(ee.a,{className:"mb2",textAlign:"left"},a.a.createElement(ae.a,{validate:this.customValidateText,activeClassName:"editing",text:this.state.isochronesTitle,paramName:"isochronesTitle",change:this.dataChanged,style:{minWidth:200,display:"inline-block",margin:"0 0 0 0",padding:0,fontWeight:"bold",fontSize:15,outline:"none",border:"none"}}),a.a.createElement(B.a,{trigger:a.a.createElement(W.a,{name:"remove",style:{float:"right"},onClick:function(){i.length>1&&e.props.dispatch({type:"REMOVE_ISOCHRONES_CONTROL",payload:{controlIndex:l}})}}),content:"Remove",size:"mini"}),a.a.createElement(B.a,{trigger:a.a.createElement(W.a,{name:"expand arrows alternate",style:{float:"right"},onClick:this.handleZoom}),content:"Zoom",size:"mini"})),a.a.createElement(X.a,{fitted:!0}),a.a.createElement("div",{className:"flex justify-between items-center mt3"},a.a.createElement(te.a,{onSearchChange:this.handleSearchChange,onResultSelect:this.handleResultSelect,type:"text",fluid:!0,input:{fluid:!0},loading:n,className:"flex-grow-1 mr2",results:s,value:r,placeholder:"Find Address ..."}),a.a.createElement(B.a,{trigger:a.a.createElement(Q.a,{circular:!0,loading:o,disabled:function(){var e=!0,t=!1,n=void 0;try{for(var o,a=s[Symbol.iterator]();!(e=(o=a.next()).done);e=!0)if(o.value.selected)return!1}catch(r){t=!0,n=r}finally{try{e||null==a.return||a.return()}finally{if(t)throw n}}return!0}(),color:"purple",icon:"globe",onClick:this.handleFetchIsochrones}),content:"Compute isochrones",size:"mini"})),a.a.createElement(ee.a,{className:"mt2"},a.a.createElement(ne.a,null,a.a.createElement(ne.a.Title,{active:0===this.state.activeIndex,index:0,onClick:this.handleClick},a.a.createElement(W.a,{name:"dropdown"}),"Settings"),a.a.createElement(ne.a.Content,{active:0===this.state.activeIndex},a.a.createElement($,{controlindex:l})))))}}]),t}(a.a.Component),ie=Object(l.b)(function(e,t){return{userTextInput:e.isochronesControls.controls[t.controlindex].userInput,results:e.isochronesControls.controls[t.controlindex].geocodeResults,isFetching:e.isochronesControls.controls[t.controlindex].isFetching,isFetchingIsochrones:e.isochronesControls.controls[t.controlindex].isFetchingIsochrones,controls:e.isochronesControls.controls}})(se),le={zIndex:999,position:"absolute",width:"400px",top:"0",left:"10px",maxHeight:"calc(100vh - 2vw)"},ce=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(k.a)(this,Object(T.a)(t).call(this,e))).handleAddIsochronesControl=function(){n.props.dispatch(C())},n.handleSettings=function(){console.log("open settings")},n.handleAddIsochronesControl=n.handleAddIsochronesControl.bind(Object(G.a)(Object(G.a)(n))),n}return Object(L.a)(t,e),Object(R.a)(t,[{key:"render",value:function(){var e=this.props.controls;return a.a.createElement(F.a,{className:"flex flex-column",style:le},a.a.createElement("div",{style:{height:"50px"},className:"flex justify-between items-center"},a.a.createElement("span",{className:"b f4"},"HERE Isolines App"),a.a.createElement(B.a,{trigger:a.a.createElement(W.a,{name:"setting",size:"large",color:"grey",onClick:this.handleSettings}),content:"Settings",size:"mini"})),a.a.createElement("div",null,a.a.createElement("div",{style:{flex:1,display:"flex",minHeight:"0px"}},a.a.createElement("div",{style:{flex:1,overflow:"auto"}},a.a.createElement("div",{style:{maxHeight:"calc(100vh - 10vw)",overflow:"auto"}},e&&e.map(function(e,t){return a.a.createElement(ie,{key:t,controlindex:t})}),a.a.createElement(B.a,{trigger:a.a.createElement(Q.a,{circular:!0,icon:"plus",onClick:this.handleAddIsochronesControl}),content:"Add",size:"mini"}))))))}}]),t}(a.a.Component),de=Object(l.b)(function(e){return{controls:e.isochronesControls.controls}})(ce),ue=function(e){function t(){return Object(m.a)(this,t),Object(k.a)(this,Object(T.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(R.a)(t,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement(H,null),a.a.createElement(de,{className:"isoControls"}))}}]),t}(a.a.Component),he=(n(329),[c.a]);var pe=Object(s.createStore)(j,Object(i.composeWithDevTools)(s.applyMiddleware.apply(void 0,he)));Object(r.render)(a.a.createElement(l.a,{store:pe}," ",a.a.createElement(ue,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[188,2,1]]]);
//# sourceMappingURL=main.ce7d911d.chunk.js.map